<?php

namespace Modules\MobileApp\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
class MobileAppController extends Controller
{
 //global requests
   public function getFromTable(request $request){
    $table=$request->table_name;
    $filters=$request->filters;

 try{
    $all=DB::table($table);

    $filters = (array)json_decode($filters);
    if(isset($filters)){
        $all->where($filters);
    }

    $results=$all->get();
    $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
    return json_encode($res);

   }


    public function authenticateMisMobileUser(Request $request)
    {
        $username = $request->input('email');
        $password = $request->input('password');
        $username = aes_encrypt($username);
        
        if (is_null($this->mis_app_client)) {
            $res = array(
                'success' => false,
                'message' => 'MIS App user not found!!'
            );
            return response()->json($res);
        }
        $request->request->add([
            'grant_type' => 'password',
            'provider' => 'users',
            'client_id' => $this->mis_app_client->id,
            'client_secret' => $this->mis_app_client->secret,
            'username' => $username,
            'password' => $password
        ]);
        $tokenRequest = $request->create('/oauth/token', 'POST', $request->all());
        $token = \Route::dispatch($tokenRequest);
        
        $token_contents = $token->getContent();
        
        //TODO check if successfully
        $user_id = "";
        $status = false;
        $token_contents = json_decode($token_contents, TRUE);
        if (isset($token_contents['token_type'])) {
            //then, query user_id
            $qry = DB::table('users as t1')
                ->where('t1.email', $username);
            $user_id = $qry->value('id');
            $status = true;
        }
        $token_contents['user_id'] = $user_id;
        $token_contents['success'] = $status;
        $token_contents = json_encode($token_contents);
        return \response($token_contents, 200, ['Content-Type' => 'application/json; charset=UTF-8']);
    }

    public function getPremiseApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = explode(',',$request->input('sub_module_id'));
        $workflow_stage_id = explode(',',$request->input('workflow_stage_id'));
        
        //explode(',',$str,0)
        
        //$user_id = $this->user_id;
        $user_id = $request->input('user_id');
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            DB::enableQueryLog();
            $qry = DB::table('tra_premises_applications as t1')
            ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
            ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
            ->join('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
            ->join('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
            ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
            ->join('users as t8', 't7.usr_from', '=', 't8.id')
            ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
            ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as premise_name,
            t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
            t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
            t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
            t2.*, t1.*,
            CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user"))
            ->where('t1.is_dismissed', '<>', 1);
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->wherein('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->wherein('t1.workflow_stage_id', $workflow_stage_id);
            }
            $qry->where('t7.isDone', 0);
            $results = $qry->get();
            //print_r(DB::getQueryLog());
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = array(
            'success' => false,
            'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
        }
        return \response()->json($res);
    }

   public function saveToTable(request $request){

    $all=$request->all();
    $unique_key=$request->unique_key;
    $unique_key_value=$request->$unique_key;
    $table=$request->table_name;
    $user_id=$request->user_id;
    $poe_application_id=$request->poe_application_id;
    $all['created_on'] =new \DateTime();
    unset($all['table_name']);
    unset($all['unique_key']);
    unset($all['user_id']);
    unset($all['poe_application_id']);
     try {
        if(isset($unique_key)){
            $count=DB::table($table)->where($unique_key,$unique_key_value)->count();
        
            if($count<1){
                //$insert=DB::table($table)->insert($all);
                //$poe_application_id = DB::table($table)->insertGetId($all);
                
                $res = insertRecord($table, $all, $user_id);
                if($res['success']){
                    $poe_application_id = $res['record_id'];
                }
            }else{
                $insert=DB::table($table)
                    ->where($unique_key,$unique_key_value)
                    ->update($all);
            }
        }else{
            $insert=DB::table($table)->insert($all); 
        }

        $res=array(
            'success'=>true,
            'poe_application_id'=>$poe_application_id
        );
     }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
    return json_encode($res);
     
   }
    
    
    

    public function getCommonParamFromTable(Request $request)
    {
        $table_name = $request->input('table_name');
        $strict_mode = $request->input('strict_mode');
        $filters = $request->input('filters');
        $con = $request->input('con');
        $db_con = 'mysql';
        if (isset($con) && $con != '') {
            $db_con = $con;
        }

        $filters = (array)json_decode($filters);

        try {
            $qry = DB::connection($db_con)->table($table_name);
            if (count((array)$filters) > 0) {
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'table_name' => $table_name
            );
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }
    
    //check if poe inspection already exists
    public function checkPoeApplication(request $request){

        $filters=$request->filters;
        $application_code = $request->input('application_code');
        
            
        try {

            $qry=DB::table('tra_poe_applications')
            ->where(array('inspection_status_id' => 1, 'application_code' => $application_code));
            
            
            $results=$qry->first();
            
            if (is_null($results)) {
                $res = array(
                    'success' => true,
                    'is_ok' => true
                );
            }else{
                $res = array(
                    'success' => true,
                    'is_ok' => false
                );
            }
            
        }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return json_encode($res);
   }
   
    public function checkpremisdata(request $request){
        $filters=$request->filters;
        $poe_application_id = $request->input('poe_application_id');

        try {

            $qry=DB::table('tra_poe_permitsdata')
            ->where('poe_application_id',$poe_application_id);
            
            $results=$qry->first();
            
            if (is_null($results)) {
                $res = array(
                    'success' => true,
                    'is_empty' => true
                );
            }else{
                $res = array(
                    'success' => true,
                    'is_empty' => false
                );
            }
            
        }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return json_encode($res);
    }

    //submit the poe rcd
    function submitpoe(Request $request){
        $id = $request->input('rcd_id');
        $user_id = $request->input('user_id');
        $inspection_recommendation_id = $request->input('inspection_recommendation_id');
        $remarks = $request->input('remarks');
        $table_name = 'tra_poe_applications';
        try {
            $update_params = array(
                    'inspection_status_id' => 2,
                    'inspection_recommendation_id' => $inspection_recommendation_id,
                    'remarks' => $remarks
                );
            $where = array(
                     'id' => $id
                );
            $prev_data = getPreviousRecords($table_name, $where);
            $res = updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
            
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    //TODO - Save recommendations here
    public function saveInspectionRecommendation(Request $request)
    {
        $screening_details = $request->input('screening_details');
        $screening_details = json_decode($screening_details);
        $table_name = 'tra_premiseinspection_applications';
        $user_id = $request->input('user_id');
        $inspection_id = $request->input('inspection_id');
        try {
            $insert_params = array();
            foreach ($screening_details as $screening_detail) {
                //$item_resp_id = $screening_detail->item_resp_id;
                if (isset($screening_detail->item_resp_id) && $screening_detail->item_resp_id != '') {
                    $where = array(
                        'id' => $screening_detail->item_resp_id
                    );
                    //item_resp_id,actual_start_date, actual_end_date, inspection_type_id, remarks  - user_id -saveInspectionRecommendation
                    $update_params = array(
                        'actual_start_date' => $screening_detail->actual_start_date,
                        'actual_end_date' => $screening_detail->actual_end_date,
                        'inspection_type_id' => $screening_detail->inspection_type_id,
                        'remarks' => $screening_detail->remarks,
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);
                    updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                } else {
                    $insert_params[] = array(
                        'inspection_id'  => $inspection_id,
                        'application_code' => $screening_detail->application_code,
                        'actual_start_date' => $screening_detail->actual_start_date,
                        'actual_end_date' => $screening_detail->actual_end_date,
                        'inspection_type_id' => $screening_detail->inspection_type_id,
                        'remarks' => $screening_detail->remarks,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                }
            }
            if (count($insert_params) > 0) {
                DB::table($table_name)
                    ->insert($insert_params);
            }
            $res = array(
                'success' => true,
                'message' => 'Recommendation details saved successfully!!'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    //save premise products data to table tra_poe_permitsdata
    public function saveApplicationPoeProductDetails(Request $request)
    {
        //quantity
        $poe_application_id = $request->input('poe_application_id');
        $screening_details = $request->input('screening_details');
        $screening_details = json_decode($screening_details);
        $table_name = 'tra_poe_permitsdata';
        $user_id = $request->input('user_id');
        try {
            $insert_params = array();
            foreach ($screening_details as $screening_detail) {
                //$item_resp_id = $screening_detail->item_resp_id;
                if (isset($screening_detail->item_resp_id) && $screening_detail->item_resp_id != '') {
                    $where = array(
                        'id' => $screening_detail->item_resp_id
                        //'poe_application_id' => $poe_application_id,
                        //'permits_product_id' => $screening_detail->permits_product_id
                    );
                    //poe_application_id, item_resp_id, permits_product_id, poe_prod_quantity, packaging_unit_id
                    $update_params = array(
                        'poe_application_id' => $poe_application_id,
                        'permits_product_id' => $screening_detail->permits_product_id,
                        'poe_prod_quantity' => $screening_detail->poe_prod_quantity,
                        'packaging_unit_id' => $screening_detail->packaging_unit_id,
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);
                    updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                } else {
                    if(isset($screening_detail->poe_prod_quantity)){
                        $poe_prod_qua = $screening_detail->poe_prod_quantity;
                    }else{
                        $poe_prod_qua = 0;
                    }
                    $insert_params[] = array(
                        'poe_application_id' => $poe_application_id,
                        'permits_product_id' => $screening_detail->permits_product_id,
                        'poe_prod_quantity' => $poe_prod_qua,
                        'packaging_unit_id' => $screening_detail->packaging_unit_id,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                }
            }
            if (count($insert_params) > 0) {
                DB::table($table_name)
                    ->insert($insert_params);
            }
            $res = array(
                'success' => true,
                'message' => 'Screening details saved successfully!!'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }
    //actual_start_date, actual_end_date, inspection_type_id, remarks
    public function getInspectionDetails(Request $request)
    {
        $application_code = $request->input('application_code');
        try {
            //start_date, end_date, inspection_type_id, description
            $qry = DB::table('tra_premise_inspection_details as t1')
                ->join('par_inspection_types as t2', 't1.inspection_type_id', '=', 't2.id')
                ->select('t1.id',DB::raw('date_format(t1.start_date,"%m/%d/%Y") as actual_start_date'),DB::raw('date_format(t1.end_date,"%m/%d/%Y") as actual_end_date'), 't2.name as inspection_type_id', 't1.description as remarks')
                ->where(array('t1.application_code' => $application_code));
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }
    
    //actual_start_date, actual_end_date, inspection_type_id, remarks
    public function getInspectionRecommendations(Request $request)
    {
        $application_code = $request->input('application_code');
        try {
            $qry = DB::table('tra_premiseinspection_applications as t1')
                ->join('tra_premise_inspection_details as t2', 't1.inspection_id', '=', 't2.id')
                ->select('t1.id',DB::raw('date_format(t1.actual_start_date,"%m/%d/%Y") as actual_start_date'),DB::raw('date_format(t1.actual_end_date,"%m/%d/%Y") as actual_end_date'), 't1.inspection_type_id', 't1.remarks', 't1.id as record_id', 't2.*')
                ->where(array('t1.application_code' => $application_code, 't2.status' => 1));
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }
    
    public function getpremisesProd(request $request){
        $filters=$request->filters;
        $filters = (array)json_decode($filters);
        //par_currencies ,DB::raw('date_format(t1.inspected_on,"%m/%d/%Y") as inspected_on')
        try {
            if(isset($filters)){
                $qry=DB::table('tra_permits_products as t1')
                     ->leftJoin('tra_product_information as t2','t1.product_id','t2.id')
                     ->leftJoin('par_common_names as t5','t2.common_name_id','t5.id')
                     ->leftJoin('par_packaging_units as t6','t1.packaging_unit_id','t6.id')
                     ->leftJoin('par_currencies as t7','t1.currency_id','t7.id')
                     ->select(DB::raw('t1.quantity - COALESCE((SELECT SUM(q.poe_prod_quantity) FROM tra_poe_permitsdata q LEFT JOIN tra_poe_applications d ON q.poe_application_id=d.id WHERE q.permits_product_id = t1.id AND d.inspection_status_id>1),0) as balance'),'t7.name as currency','t6.name as packaging_units','t5.name as common_name','t2.brand_name','t1.id as permits_product_id','t1.quantity','t1.unit_price','t1.application_code','t1.packaging_unit_id','t1.total_weight','t1.weights_units_id');

                if(isset($filters)){
                    $qry->where($filters);
                }
                $results=$qry->get();
            }else{
                $results=[];
            }
            $res=array(
                 'success'=>true,
                 'results'=>$results,
                 'message'=>returnMessage($results)
            ); 
        }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return json_encode($res);
    }
    
    public function getpremisesProducts(request $request){
        $filters=$request->filters;
        $filters = (array)json_decode($filters);
        
        try {
            if(isset($filters)){
                //(tra_permits_products)-packaging_unit_id, (par_packaging_units)
                $qry=DB::table('tra_poe_permitsdata as t4')
                     ->leftJoin('tra_permits_products as t1','t4.permits_product_id','t1.id')
                     ->leftJoin('tra_product_information as t2','t1.product_id','t2.id')
                     ->leftJoin('par_common_names as t5','t2.common_name_id','t5.id')
                     ->leftJoin('par_packaging_units as t6','t1.packaging_unit_id','t6.id')
                     ->leftJoin('par_currencies as t7','t1.currency_id','t7.id')
                     ->leftJoin('tra_poe_applications as t3','t3.id','t4.poe_application_id')
                     ->select(DB::raw('t1.quantity - COALESCE((SELECT SUM(q.poe_prod_quantity) FROM tra_poe_permitsdata q LEFT JOIN tra_poe_applications d ON q.poe_application_id=d.id WHERE q.permits_product_id = t1.id AND d.inspection_status_id>1),0) as balance'),'t7.name as currency','t6.name as packaging_units','t5.name as common_name','t4.id as item_resp_id','t4.poe_prod_quantity','t4.poe_prod_quantity','t4.poe_application_id','t2.brand_name','t1.id as permits_product_id','t1.quantity','t1.unit_price','t1.application_code','t1.packaging_unit_id','t1.total_weight','t1.weights_units_id')
                     ->where($filters);
                
                $results=$qry->get();
            }else{
                $results=[];
            }
            $res=array(
                 'success'=>true,
                 'results'=>$results,
                 'message'=>returnMessage($results)
            ); 
        }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return json_encode($res);
    }

   //specific requests
   public function getAgentDetails(request $request){

        $filters=$request->filters;
        $filters = (array)json_decode($filters);
      try {

        $qry=DB::table('tra_poe_applications as t1')
             ->leftJoin('par_clearing_agents as t2','t1.clearing_agent_id','t2.id')
             ->leftJoin('par_ports_information as t3','t1.port_id','t3.id')
             ->leftJoin('tra_managerpermits_review as t4','t1.application_code','t4.application_code')
             ->select('t4.permit_no','t1.id as poe_application_id','t1.port_id','t1.application_code','t1.tra_reg_number as tra_registration_number','t1.inspection_status_id','t1.clearing_agent_id','t1.tansad_no',DB::raw('date_format(t1.inspected_on,"%m/%d/%Y") as inspected_on'),DB::raw('date_format(t1.tra_reg_date,"%m/%d/%Y") as tra_reg_date'),'t2.name as clearing_agent','t3.name as port_of_entry');

       
        if(isset($filters)){
            $qry->where($filters);
        }

        $results=$qry->get();
        
        $res=array(
             'success'=>true,
             'results'=>$results,
             'message'=>'All is well'
            );     

          
        }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return json_encode($res);
     
   }

    public function getImportPermitDetails(request $request){

        //$permit_no = $request->input('permit_no');
        
        $filters = $request->input('filters');
        $filters = (array)json_decode($filters);
    
        
      try {
        if(isset($filters)){
        $qry=DB::table('tra_managerpermits_review as t11')
             ->leftJoin('tra_importexport_applications as t1','t1.application_code','t11.application_code')
             ->leftJoin('wb_trader_account as t2','t1.applicant_id','t2.id')
             ->leftJoin('par_regions as t3','t2.region_id','t3.id')
             ->leftJoin('par_countries as t4','t2.country_id','t4.id')
             ->leftJoin('par_ports_information as t5','t1.port_id','t5.id')
             ->leftJoin('tra_payments as t6','t1.application_code','t6.application_code')
             ->leftJoin('tra_application_invoices as t7','t6.invoice_id','t7.id')
             ->leftJoin('tra_permitsenderreceiver_data as t8','t1.sender_receiver_id','t8.id')
             ->leftJoin('par_regions as t9','t8.region_id','t9.id')
             ->leftJoin('par_countries as t10','t8.country_id','t10.id')
             ->leftJoin('tra_poe_applications as t12','t1.application_code','t12.application_code')
             //->leftJoin('tra_managerpermits_review as t11','t1.application_code','t11.application_code')  tra_poe_applications
             ->select('t12.id as poe_application_id','t1.application_code','t11.permit_no','t2.name as importer_Company_name','t2.postal_address as importer_Company_postalAddr','t2.physical_address as importer_Company_physicalAddr','t3.name as importer_Company_region','t4.name as importer_Company_country','t2.contact_person as importer_Company_contact_person','t8.name as source_Company_name','t8.postal_address as source_Company_postalAddr','t8.physical_address as source_Company_physicalAddr','t9.name as source_Company_region','t10.name as source_Company_country','t8.contact_person as source_Company_contact_person','t5.name as port_of_entry',DB::raw('date_format(t6.trans_date,"%m/%d/%Y") as transaction_date'),'t6.receipt_no','t7.invoice_no');
             $qry->where($filters);
             //->where('t11.permit_no',$permit_no);
           $results=$qry->get();
        }else{
            $results=[];
        }
        
        $res=array(
             'success'=>true,
             'results'=>$results,
             'message'=>returnMessage($results)
        );     

      }catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
    return json_encode($res);
     
   }
   
}
