<?php

namespace Modules\Systemadminprocess\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class SystemadminprocessController extends Controller
{
   protected $user_id;

    public function __construct(Request $req)
    {
        $is_mobile = $req->input('is_mobile');
        if (is_numeric($is_mobile) && $is_mobile > 0) {
            $this->user_id = $req->input('user_id');
        } else {
            $this->middleware(function ($request, $next) {
                if (!\Auth::check()) {
                    $res = array(
                        'success' => false,
                        'message' => '<p>NO SESSION, SERVICE NOT ALLOWED!!<br>PLEASE RELOAD THE SYSTEM!!</p>'
                    );
                    echo json_encode($res);
                    exit();
                }
                $this->user_id = \Auth::user()->id;
                return $next($request);
            });
        }
    }
    
    public function getChangeLocalTechnicalRepresentative(Request $req){

        try {
            $filter = $req->input('filter');
            $start = $req->input('start');
            $limit = $req->input('limit');
            $changed_fromdate = $req->input('changed_fromdate');
            $changed_todate = $req->input('changed_todate');
            $whereClauses = array();
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'tracking_no' :
                                $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'brand_name' :
                                $whereClauses[] = "t1.brand_name like '%" . ($filter->value) . "%'";
                                break;

                            
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
            $where_filterdates = '';
            if( $changed_fromdate != '' &&  $changed_todate != ''){
                $changed_fromdate = formatDate($changed_fromdate);
                $changed_todate = formatDate($changed_todate);
                $where_filterdates  = " changed_on BETWEEN '".$changed_fromdate."' and  '".$changed_todate."'";
            }//CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_by

            $qry = DB::table('tra_changelocal_techncialreprequest as t1')
                        ->join('tra_product_applications as t2','t1.application_code','=','t2.application_code')
                        ->join('tra_product_information as t3','t1.product_id','=','t3.id')
                        ->leftJoin('par_common_names as t4', 't3.common_name_id', '=','t4.id')
                        ->leftJoin('par_classifications as t5', 't3.classification_id','=','t5.id')
                        ->join('wb_trader_account as t6', 't1.previous_localagent_id','=','t6.id')
                        ->join('wb_trader_account as t7', 't1.current_localagent_id','=','t7.id')
                        ->join('users as t8','t1.change_by_id', '=','t8.id')
                        ->select(DB::raw("t1.*, t2.reference_no,t2.tracking_no, t3.brand_name, t4.name as common_name,t5.name as classification_name, t6.name as previous_local_agent, t7.name as current_local_agent,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as changed_by"));
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if ($where_filterdates != '') {
                $qry->whereRAW($where_filterdates);
            }
            $count = $qry->get()->count();
            $records = $qry->skip($start)->take($limit)->get();



            $res = array(
            'success' => true,
            'results' => $records,
            'totals' => $count,
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
    public function getChangemarketAuthorisationdetails(Request $req){


        try {
            $filter = $req->input('filter');
            $start = $req->input('start');
            $limit = $req->input('limit');
            $changed_fromdate = $req->input('changed_fromdate');
            $changed_todate = $req->input('changed_todate');
            $whereClauses = array();
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'tracking_no' :
                                $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'brand_name' :
                                $whereClauses[] = "t1.brand_name like '%" . ($filter->value) . "%'";
                                break;

                            
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
            $where_filterdates = '';
            if( $changed_fromdate != '' &&  $changed_todate != ''){
                $changed_fromdate = formatDate($changed_fromdate);
                $changed_todate = formatDate($changed_todate);
                $where_filterdates  = " changed_on BETWEEN '".$changed_fromdate."' and  '".$changed_todate."'";
            }//CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_by

            $qry = DB::table('tra_changemarket_authorisationrequest as t1')
                        ->join('tra_product_applications as t2','t1.application_code','=','t2.application_code')
                        ->join('tra_product_information as t3','t1.product_id','=','t3.id')
                        ->leftJoin('par_common_names as t4', 't3.common_name_id', '=','t4.id')
                        ->leftJoin('par_classifications as t5', 't3.classification_id','=','t5.id')
                        ->join('wb_trader_account as t6', 't1.previous_trader_id','=','t6.id')
                        ->join('wb_trader_account as t7', 't1.current_trader_id','=','t7.id')
                        ->join('users as t8','t1.change_by_id', '=','t8.id')
                        ->select(DB::raw("t1.*, t2.reference_no,t2.tracking_no, t3.brand_name, t4.name as common_name,t5.name as classification_name, t6.name as previous_trader, t7.name as current_trader,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as changed_by"));
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if ($where_filterdates != '') {
                $qry->whereRAW($where_filterdates);
            }
            $count = $qry->get()->count();
            $records = $qry->skip($start)->take($limit)->get();



            $res = array(
            'success' => true,
            'results' => $records,
            'totals' => $count,
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
    public function getMarketauthorisationProducts(Request $req){


        try {
            $trader_id = $req->input('trader_id');
            $whereClauses = array();
            $filter_string = '';
           
            $qry = DB::table('tra_product_applications as t2')
                        ->join('tra_product_information as t3','t2.product_id','=','t3.id')
                        ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                        ->leftJoin('par_common_names as t4', 't3.common_name_id', '=','t4.id')
                        ->leftJoin('par_classifications as t5', 't3.classification_id','=','t5.id')
                        ->join('wb_trader_account as t6', 't2.applicant_id','=','t6.id')
                        ->leftJoin("tra_approval_recommendations as t7",'t2.application_code','=','t7.application_code')
                        ->leftJoin('par_validity_statuses as t8', 't1.validity_status_id', '=','t8.id')
                        ->leftJoin('par_registration_statuses as t9', 't1.registration_status_id', '=','t9.id')
                        ->leftJoin('par_sections as t10', 't2.section_id', '=','t10.id')
                        ->leftJoin('wb_trader_account as t11', 't2.local_agent_id', '=','t11.id')
                        ->leftJoin('par_system_statuses as t12', 't2.application_status_id', '=','t12.id')
                        ->select(DB::raw("t1.*, t2.reference_no,t2.tracking_no, t3.brand_name, t4.name as common_name,t5.name as classification_name,t1.id as regproduct_id, t6.name as trader_name, t2.*,t8.name as validity_status,  t9.name as registration_status,t10.name as section_name,t11.name as local_agentname, t7.certificate_no, t12.name as application_status,t2.local_agent_id"))
                        ->where(array('applicant_id'=>$trader_id));
         
            $records = $qry->get();

            $res = array(
            'success' => true,
            'results' => $records,
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
    
    public function saveChangeLocalTechnicalRepresentative(Request $req){
        try {
            $remarks = $req->remarks;
            $trader_id = $req->trader_id;
            
            $reason = $req->reason;
            $local_agent_id = $req->local_agent_id;
            $selectedproductsapp = $req->selectedproductsapp;
            $table_name = 'tra_changelocal_techncialreprequest';
            $selectedproductsapp = json_decode($selectedproductsapp);
            $insert_params = array();
            foreach ($selectedproductsapp as $selected) {
                        
                        $reg_product_id = $selected->reg_product_id;
                        $product_id = $selected->product_id;
                        $application_code = $selected->application_code;
                        $module_id = $selected->module_id;
                        $sub_module_id = $selected->sub_module_id;
                        $section_id = $selected->section_id;
                        $previous_localagent_id = $selected->previous_localagent_id;
                        //Tables to update the appllicant details 
                        $app_tablename = 'tra_product_applications';
                        $where = array('application_code'=>$application_code);
                        $update_params = array('local_agent_id'=>$local_agent_id, 'altered_by' => $this->user_id, 'dola' => Carbon::now());

                         $prev_data = getPreviousRecords($app_tablename, $where);
                         if($prev_data['success']){

                            updateRecord($app_tablename, $prev_data['results'], $where, $update_params, $this->user_id);

                         }
                        
                        //update portal 
                       $identification_no = getSingleRecordColValue('wb_trader_account', array('id'=>$local_agent_id), 'identification_no');

                        $portal_localagent_id = getSingleRecordColValue('wb_trader_account', array('identification_no'=>$identification_no), 'id', 'portal_db');

                        $update_params = array('local_agent_id'=>$portal_localagent_id, 'altered_by' => $this->user_id, 'dola' => Carbon::now());
                        $prev_data = getPreviousRecords('wb_product_application', $where,'portal_db');
                        if($prev_data['success']){
                            updateRecord('wb_product_application', $prev_data['results'], $where, $update_params, $this->user_id,'portal_db');

                        }
                      
                       
                        $insert_params[] = array(
                            'reg_product_id' => $reg_product_id,
                            'product_id'=>$product_id,
                            'application_code' => $application_code,
                            'previous_localagent_id' => $previous_localagent_id,
                            'current_localagent_id' => $local_agent_id,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id'=>$section_id,
                            'reason'=>$reason,
                            'change_by_id'=>$this->user_id,
                            'changed_on'=>Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $this->user_id
                        );

              }

            if (count($insert_params) > 0) {
                DB::table($table_name)
                    ->insert($insert_params);
            }
            $res = array(
            'success' => true,
            'message' => 'Change of Local techncial Representative Details Updated Successfully'
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
    public function saveChangemarketAuthorisationdetails(Request $req){
        try {
            $remarks = $req->remarks;
            $previous_trader_id = $req->previous_trader_id;
            $current_trader_id = $req->current_trader_id;
            
            $reason = $req->reason;
            $selectedproductsapp = $req->selectedproductsapp;
            $table_name = 'tra_changemarket_authorisationrequest';
            $selectedproductsapp = json_decode($selectedproductsapp);
            $insert_params = array();
            foreach ($selectedproductsapp as $selected) {
                        
                        $reg_product_id = $selected->reg_product_id;
                        $product_id = $selected->product_id;
                        $application_code = $selected->application_code;
                        $module_id = $selected->module_id;
                        $sub_module_id = $selected->sub_module_id;
                        $section_id = $selected->section_id;
                        //Tables to update the appllicant details 
                        $app_tablename = 'tra_product_applications';
                        $sub_tablename = 'tra_submissions';
                        $where = array('application_code'=>$application_code);
                        $update_params = array('applicant_id'=>$current_trader_id, 'altered_by' => $this->user_id, 'dola' => Carbon::now());

                         $prev_data = getPreviousRecords($app_tablename, $where);
                         if($prev_data['success']){

                            updateRecord($app_tablename, $prev_data['results'], $where, $update_params, $this->user_id);

                         }
                        
                         $prev_data = getPreviousRecords($sub_tablename, $where);
                         if($prev_data['success']){

                            updateRecord($sub_tablename, $prev_data['results'], $where, $update_params, $this->user_id);
                         }
                        //update portal 
                       $identification_no = getSingleRecordColValue('wb_trader_account', array('id'=>$current_trader_id), 'identification_no');

                        $portal_trader_id = getSingleRecordColValue('wb_trader_account', array('identification_no'=>$identification_no), 'id', 'portal_db');

                        $update_params = array('trader_id'=>$portal_trader_id, 'altered_by' => $this->user_id, 'dola' => Carbon::now());
                        $prev_data = getPreviousRecords('wb_product_application', $where,'portal_db');
                        if($prev_data['success']){
                            updateRecord('wb_product_application', $prev_data['results'], $where, $update_params, $this->user_id,'portal_db');

                        }
                      
                       
                        $insert_params[] = array(
                            'reg_product_id' => $reg_product_id,
                            'product_id'=>$product_id,
                            'application_code' => $application_code,
                            'previous_trader_id' => $previous_trader_id,
                            'current_trader_id' => $current_trader_id,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id'=>$section_id,
                            'reason'=>$reason,
                            'change_by_id'=>$this->user_id,
                            'changed_on'=>Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $this->user_id
                        );

              }

            if (count($insert_params) > 0) {
                DB::table($table_name)
                    ->insert($insert_params);
            }
            $res = array(
            'success' => true,
            'message' => 'Change of Market Authorisation Details Updated Successfully'
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
    public function getApplicationOwnershipAmmendmentsdata(Request $req){
        try{

        $records = DB::table('tra_application_ownershipammends as t1')
                            ->leftJoin('wb_trader_account as t2', 't1.previous_applicant_id', 't2.id')
                            ->leftJoin('wb_trader_account as t3', 't1.current_applicant_id', 't3.id')
                            ->leftJoin('users as t4', 't1.changed_by','t4.id')
                            ->leftJoin('modules as t5', 't1.module_id','t5.id')
                            ->select(DB::raw("t1.*, t2.name as previous_applicant, t3.name as current_applicant, CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as  changed_byname ,t5.name as module_name"))
                            ->get();
            $res = array(
                'success' => true,
                'results'=>$records
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
    Public function saveApplicationownershipammendmentsDetails(Request $req){
            
            try{
                $module_id = $req->module_id;
                $reference_no = $req->reference_no;
                $requested_by = $req->requested_by;
                $reason = $req->reason;
                $current_applicant_id = $req->current_applicant_id;
                $ammendment_option_id = $req->ammendment_option_id;
                
                $table_name =  getSingleRecordColValue('modules', array('id'=>$module_id), 'table_name');
                $reg_column_id =  getSingleRecordColValue('modules', array('id'=>$module_id), 'reg_column_id');

                $record = DB::table($table_name.' as t1')
                            ->select(DB::raw("t1.*"))
                            ->where(function($query) use ($reference_no) {
                                $query->where('reference_no', '=', $reference_no)
                                ->orWhere('tracking_no', '=',$reference_no);
                              })
                              ->first();
                if($record){
                        $application_code = $record->application_code;
                        $data_record = (array)$record;
                       
                        $where = array('application_code'=>$application_code);
                        $data = array('applicant_id'=>$current_applicant_id,
                                    'dola'=>Carbon::now(),
                                    'altered_by'=> $this->user_id);
                        DB::table($table_name)->where($where)->update($data);
                        if($ammendment_option_id == 1){
                            DB::table('tra_payments')->where($where)->update($data); 
                            DB::table('tra_submissions')->where($where)->update($data); 
                            DB::table('tra_application_invoices')->where($where)->update($data);  
                            if(validateIsNumeric($reg_column_id)){
                                $reg_column_data =  $data_record[$reg_column_id];
                                $where_reg = array( $reg_column_id=>$reg_column_data);
                                DB::table($table_name)->where($where_reg)->update($data); 
                            }
                        }
                        $table_data = array('application_code'=>$application_code,
                                      'reference_no'=>$record->reference_no,
                                      'tracking_no'=>$record->tracking_no, 
                                      'previous_applicant_id'=>$record->applicant_id,
                                      'current_applicant_id'=>$current_applicant_id,
                                        'requested_by'=>$req->requested_by,
                                        'reason'=>$req->reason,
                                        'module_id'=>$req->module_id,
                                        'ammendment_option_id'=>$ammendment_option_id,
                                        'changed_by'=>$this->user_id,
                                        'changed_on'=>Carbon::now(),
                                        'created_by'=>$this->user_id,
                                        'created_on'=>Carbon::now(),
                                    );
                        $res = insertRecord('tra_application_ownershipammends', $table_data, $this->user_id);
                }
                else{
                    $res = array('success'=>false, 'message'=>'Application Not found, confirm the reference number for correctness.');
                }
            
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
}
