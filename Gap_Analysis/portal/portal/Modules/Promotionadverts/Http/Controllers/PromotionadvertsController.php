<?php

namespace Modules\Promotionadverts\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Facades\Auth;
 
use Validator;

use App\User;
use Carbon\Carbon;

class PromotionadvertsController extends Controller
{
    
    public function __construct(){
        if (!Auth::guard('api')->check()) {
                $res = array(
                    'success' => false,
                    'message' => 'Invalid Token or failed authentication, login to proceed!!'
                );
                echo json_encode($res);
                exit();
        }
    }

    public function getPromotionalProductParticulars(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_promotion_prod_particulars as t1')
                            ->select(DB::raw("t1.*"))
                            ->where(array('t1.application_id' => $application_id))
                            ->get();

                   
                    $commonNamesData = getParameterItems('par_common_names','','mis_db');
                     
                    foreach ($records as $rec) {
                        if($rec->is_registered == 1){

                            $product_registered = "Registered";
                        }
                        else{
                            $product_registered = "Not Registered";

                        }
                            $data[] = array( 
                                'id'=>$rec->id,
                                'application_id'=>$rec->application_id,
                                'brand_name'=>$rec->brand_name,
                                'product_id'=>$rec->product_id,
                                'common_name_id'=>$rec->common_name_id,
                                'is_registered'=>$rec->is_registered,
                                'product_registered'=>$product_registered,
                                'registration_no'=>$rec->registration_no,
                                'other_details'=>$rec->other_details,
                                
                                'generic_name'=>returnParamFromArray($commonNamesData,$rec->common_name_id)
                        );
                    }
                     $res =array('success'=>true,'data'=> $data);
        }
        catch (\Exception $e) {
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
    
    public function getApppromMaterialsDetailData(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
            //get the records 
            $records = DB::table('wb_promotion_materials_details as t1')
                            ->select(DB::raw("t1.*"))
                            ->where(array('t1.application_id' => $application_id))
                            ->get();

                    $promotion_materialData = getParameterItems('par_promotion_material_items','','mis_db');
                    
                    foreach ($records as $rec) {
                       
                            $data[] = array( 
                                'id'=>$rec->id,
                                'application_id'=>$rec->application_id,
                                'remarks'=>$rec->remarks,
                                'material_id'=>$rec->material_id,
                                'promotion_materials'=>returnParamFromArray($promotion_materialData,$rec->material_id),
                                
                        );
                    }
                     $res =array('success'=>true,'data'=> $data);
        }
        catch (\Exception $e) {
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
    public function onSavepromotionalMaterialsDetails(Request $req){
        try {
            $record_id = $req->id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
           $application_id = $req->application_id;
           $table_name = 'wb_promotion_materials_details';
            $products_particulardata = array('application_id'=>$req->application_id,
                                         'material_id'=>$req->material_id,
                                         'remarks'=>$req->remarks
                                );
                        if(validateIsNumeric($record_id)){
                              
                                $where = array('id'=>$record_id);
                          
                                if (recordExists($table_name, $where)) {
                                    
                                    $products_particulardata['dola'] = Carbon::now();
                                    $products_particulardata['altered_by'] = $email_address;
                
                                    $previous_data = getPreviousRecords($table_name, $where);
                                    
                                    $resp =updateRecord($table_name, $previous_data, $where, $products_particulardata, $email_address);
                                    
                                }
                                $res = returnFuncResponses($resp,'Promotional Materials','application_id',$application_id);
                           
                            }
                        else{
                            //chenform if this exisit 
                           if(!recordExists($table_name, $products_particulardata)){
                                $products_particulardata['created_on'] = Carbon::now();
                                $products_particulardata['created_by'] = $email_address;
            
                                $resp = insertRecord($table_name, $products_particulardata, $email_address);
                                
                                $res = returnFuncResponses($resp,'Promotional Materials','application_id',$application_id);
                                
                            }
                           else{
                                $res = array(
                                    'success'=>false,
                                    'message'=>'Promotional Materials exists or already saved.');
                           }
                            
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
        
        return response()->json($res); 

    }
    public function OnSavePromotionalProductParticulars(Request $req){
        try {
            $record_id = $req->id;
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
           $application_id = $req->application_id;
           $table_name = 'wb_promotion_prod_particulars';
            $products_particulardata = array('application_id'=>$req->application_id,
                                         'brand_name'=>$req->brand_name,
                                         'product_id'=>$req->product_id,
                                         'common_name_id'=>$req->common_name_id,
                                         'is_registered'=>$req->is_registered,
                                         'registration_no'=>$req->registration_no,
                                         'registrant_name'=>$req->registrant_name,
                                         'other_details'=>$req->other_details
                                );  
                             
                        if(validateIsNumeric($record_id)){
                              
                                $where = array('id'=>$record_id);
                          
                                if (recordExists($table_name, $where)) {
                                    
                                    $products_particulardata['dola'] = Carbon::now();
                                    $products_particulardata['altered_by'] = $email_address;
                
                                    $previous_data = getPreviousRecords($table_name, $where);
                                    
                                    $resp =updateRecord($table_name, $previous_data, $where, $products_particulardata, $email_address);
                                    
                                }
                                $res = returnFuncResponses($resp,'Promotional Product Particulars','application_id',$application_id);
                           
                            }
                        else{
                            //chenform if this exisit 
                            $table_name = 'wb_promotion_prod_particulars';
                           if(!recordExists($table_name, $products_particulardata)){
                                $products_particulardata['created_on'] = Carbon::now();
                                $products_particulardata['created_by'] = $email_address;
            
                                $res = insertRecord($table_name, $products_particulardata, $email_address);
                                
                                //$res = returnFuncResponses($resp,'Promotional Product Particulars','application_id',$application_id);
                                
                            }
                           else{
                                $res = array(
                                    'success'=>false,
                                    'message'=>'Promotional Product Particulars exists or already saved.');

                           }
                            
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
        
        return response()->json($res); 

    }
    public function savePromotionalAdvertapplication(Request $req){
        try { 
            $trader_id = $req->trader_id;
            $email_address = $req->email_address;
            $applicant_as_sponsor = $req->applicant_as_sponsor;
            $sponsor_id = $req->sponsor_id;
            $classification_id = $req->classification_id;
            
            $product_type_id = $req->product_type_id;
            $section_id = $req->section_id;
            
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $zone_id = $req->zone_id;
            $tracking_no = $req->tracking_no;
            $application_code = $req->application_code;
            $application_id = $req->application_id;
            
            $module_id = getSingleRecordColValue('sub_modules', array('id' => $req->sub_module_id), 'module_id','mis_db');
            
                            $app_data = array('trader_id'=>$trader_id,
                                            'applicant_as_sponsor'=>$applicant_as_sponsor,
                                            'sponsor_id'=>$req->sponsor_id,
                                            'advertisement_type_id'=>$req->advertisement_type_id,
                                            'description_of_advert'=>$req->description_of_advert,
                                            'events_responsible_person'=>$req->events_responsible_person,
                                            'exhibition_end_date'=>$req->exhibition_end_date,
                                            'exhibition_start_date'=>$req->exhibition_start_date,
                                            'other_promotion_meetingtype'=>$req->other_promotion_meetingtype,
                                            'physicaladdress_of_exhibition'=>$req->physicaladdress_of_exhibition,
                                            'promotionameeting_other_information'=>$req->promotionameeting_other_information,
                                            'other_promotion_materialtypes'=>$req->other_promotion_materialtypes,
                                            'responsible_persons_contacts'=>$req->responsible_persons_contacts,
                                            'responsible_persons_physicaladdress'=>$req->responsible_persons_physicaladdress,
                                            'module_id'=>$module_id,
                                            'zone_id'=>$req->zone_id,
                                            'section_id'=>$req->section_id,
                                            'sub_module_id'=>$sub_module_id,
                                            'tracking_no'=>$tracking_no,
                            );
                            
                        /** Already Saved  */
                        if(validateIsNumeric($application_id)){
                                //update the record 
                                //product information
                                //
                                $where_app = array('id'=>$application_id);
                               
                                if (recordExists('wb_promotion_adverts_applications', $where_app)) {
                                    
                                    
                                    $previous_data = getPreviousRecords('wb_promotion_adverts_applications', $where_app);
                                    $tracking_no = $previous_data['results'][0]['tracking_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                   
                                    $resp=   updateRecord('wb_promotion_adverts_applications', $previous_data, $where_app, $app_data, $email_address);
                                    
                                }
                             
                                if($resp){
									// initializeApplicationDMS($req->section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,100), $trader_id);
                                    $res = array('tracking_no'=>$tracking_no,
                                         'application_id'=>$application_id,
                                         'application_code'=>$application_code,
                                         'success'=>true,
                                         'message'=>'Application Saved Successfully, with Tracking No: '.$tracking_no);
                            
                                 }
                                 else{
                                    $res = array(
                                    'success'=>false,
                                    'message'=>'Error Occurred Application not saved, it this persists contact the system Administrator');
                                 }
                        }
                        else{
                            $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');

                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $req->zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $req->section_id), 'code','mis_db');
                                $class_code = getSingleRecordColValue('par_classifications', array('id' => $req->classification_id), 'code','mis_db');
                                $device_typecode = getSingleRecordColValue('par_device_types', array('id' => $req->device_type_id), 'code','mis_db');
                        
                                $codes_array = array(
                                    'section_code' => $section_code,
                                    'zone_code' => $zone_code,
                                    'class_code' => $class_code,
                                    'device_typecode'=>$device_typecode
                                );  
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                               
                                    $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                    if (!validateIsNumeric($ref_id )) {
                                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                    }
                                    else if( $tracking_no == ''){
                                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                    }

                               // $tracking_no= generateProductReferenceNo($req->section_id,$req->classification_id,$req->sub_module_id);
                                $application_code = generateApplicationCode($sub_module_id, 'wb_promotion_adverts_applications');
                               
                                $app_data['created_by'] = $email_address;
                                $app_data['created_on'] = Carbon::now();
                                $app_data['tracking_no'] = $tracking_no;
                                
                                $app_data['added_on'] = Carbon::now();
                                $app_data['application_code'] = $application_code;
                                $app_data['application_status_id'] = 1;
                             
                            //    initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(0,100), $trader_id);
                                saveApplicationSubmissionDetails($application_code,'wb_promotion_adverts_applications');  
                                $resp = insertRecord('wb_promotion_adverts_applications', $app_data, $email_address);
                                if($resp['success']){
                                    $application_id = $resp['record_id'];

                                    $res = array('tracking_no'=>$tracking_no,
                                             'application_id'=>$application_id,
                                             'success'=>true,
                                             'message'=>'Application Saved Successfully, with Tracking No: '.$tracking_no);
                                    

                                }else{
                                    $res = $resp;
                            
                                }
                               
                         
   
                        }
                        //application codes 
                        if(validateIsNumeric($application_id)){

                          //    
                          $meeting_typedata = array();
                        $meeting_types_id = $req->meeting_types_id;
                          DB::table('wb_promotionmeetingtypes_details')->where(array('application_id'=>$application_id))->delete();
                          if(is_array($meeting_types_id)){
                              foreach($meeting_types_id as $meeting_type_id){
                                                          
                                      $meeting_typedata[] = array('meeting_type_id'=>$meeting_type_id, 
                                                      'application_id'=>$application_id, 
                                                      'created_by'=>$trader_id, 
                                                      'created_on'=>Carbon::now());
      
                              }
                              DB::table('wb_promotionmeetingtypes_details')->insert($meeting_typedata);
      
                          }
                          $promotions_material_id = $req->promotions_material_id;
                          DB::table('wb_promotion_materials_details')->where(array('application_id'=>$application_id))->delete();
                          $material_detailsdata = array();
                          if(is_array($meeting_types_id)){
                              foreach($promotions_material_id as $promotion_material_id){
                                                          
                                      $material_detailsdata[] = array('material_id'=>$promotion_material_id, 
                                                      'application_id'=>$application_id, 
                                                      'created_by'=>$trader_id, 
                                                      'created_on'=>Carbon::now());
      
                              }
                              DB::table('wb_promotion_materials_details')->insert($material_detailsdata);
      
                          }
                          
                       
                          
                        }
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'resp'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);
      
    }
    //
public function getApplicationsCounter(Request $req){
    //the statuses
    try{
        $trader_id = $req->trader_id;
        
        $data = array();
        //get the records 
        $resp = false;
        $table_name = 'wb_promotion_adverts_applications as t1';
        $where_state = array('trader_id' => $trader_id);
        $records = DB::table($table_name)
                ->select(DB::raw("count(application_status_id) as application_counter,t2.name as status_name, t2.id as status_id"))
                ->join('wb_statuses as t2','t1.application_status_id','=','t2.id')
                ->where($where_state)
                 ->groupBy('t2.id')
                 ->get();
        if(count($records) >0){
                //delete functionality
                $res = array('success'=>true, 'data'=>$records);
        }else{
            $res = array('success'=>true, 'data'=>$data);
        }
           
    }
    catch (\Exception $e) {
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

   public function getPromotionAlderrApplication(Request $req){

    try{
        $trader_id = $req->trader_id;
        $application_status_id = $req->application_status_id;
        $sub_module_id = $req->sub_module_id;
        $section_id = $req->section_id;


        $data = array();
        //get the records 
        $records = DB::table('wb_promotion_adverts_applications as t1')
                    ->select(DB::raw('t7.name as action_name,t7.iconCls,t7.action, t1.applicant_as_sponsor,t1.advertisement_type_id, t1.created_by, t1.id, t1.tracking_no,t1.reference_no, t1.section_id,t1.id as application_id, t4.name as applicant_name, t3.name as status_name,t1.application_status_id as status_id, t1.added_on, t1.submission_date,t1.sub_module_id, t1.trader_id,t1.trader_id as applicant_id,t1.*, t1.product_type_id,t1.sponsor_id,t1.application_status_id'))
                    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->leftJoin('wb_trader_account as t4', 't1.trader_id','=','t4.id')
                    ->leftJoin('wb_processstatus_actions as t6',function($join){
                        $join->on('t1.application_status_id', '=', 't6.status_id')
                             ->on('t6.is_default_action', '=', DB::raw(1));

                    })
                    ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                    ->where('trader_id', $trader_id);
                    if(validateIsNumeric($application_status_id)){
                        $records =  $records->where(array('t1.application_status_id'=>$application_status_id));
                    }if(validateIsNumeric($sub_module_id)){
                        $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                    }if(validateIsNumeric($section_id)){
                        $records =  $records->where(array('t1.section_id'=>$section_id));
                    }

                    $records = $records->get();

                    $actionColumnData = returnContextMenuActions();
                     $sectionsData = getParameterItems('par_sections','','mis_db');
                     $subModuleData = getParameterItems('sub_modules','','mis_db');
                     $sponsorData = getParameterItems('tra_promotionaladvert_personnel','','mis_db');
                     $advertTypeData = getParameterItems('par_advertisement_types','','mis_db');

                     
                 foreach ($records as $rec) {
                    //get the array 
                    if($rec->applicant_as_sponsor == 1){
                        $sponsor = "Sponsor As Applicant";
                    }
                    else{
                        $sponsor = returnParamFromArray($sponsorData,$rec->sponsor_id);
                    }
                  
                    $data[] = array('reference_no'=>$rec->reference_no,
                                    'id'=>$rec->id,
                                    'tracking_no'=>$rec->tracking_no,
                                    'application_id'=>$rec->application_id,
                                    'section_id'=>$rec->section_id,
                                    'date_added'=>$rec->added_on,
                                    'sub_module_id'=>$rec->sub_module_id,
                                    'applicant_name'=>$rec->applicant_name,
                                    'application_status_id'=>$rec->application_status_id,
                                    'created_by'=>$rec->created_by,
                                    'name_of_sponsor'=>$sponsor,
                                    'submission_date'=>$rec->submission_date,
                                    'section'=>returnParamFromArray($sectionsData,$rec->section_id),

                                    'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id) ,
                                    'advertisement_type'=>returnParamFromArray($advertTypeData,$rec->advertisement_type_id) ,
                                    'status'=>$rec->status_name,
                                    'action_name'=>$rec->action_name,
                                    'action'=>$rec->action,
                                    'iconCls'=>$rec->iconCls,
                                    'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                                            
                                );
                 }
                 $res = array(
                    'success' => true,
                    'data'=>$data
                );
    }
    catch (\Exception $e) {
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
   public function onSearchRegisteredProductApplication(Request $req){
    try {
       $mistrader_id = $req->mistrader_id;
       $section_id = $req->section_id;
       $validity_status = $req->validity_status;
       $registration_status = $req->registration_status;
       
       $take = $req->take;
        $skip = $req->skip;
        $searchValue = $req->searchValue;
        $search_value =  '';
        if($req->searchValue != 'undefined' && $req->searchValue != ''){
            $searchValue = explode(',',$searchValue);
            $search_value =  $searchValue[2];
        }
		$portalDb = \DB::getDatabaseName();
       $qry = DB::connection('mis_db')->table('tra_product_applications as t1')
       ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
       ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
       ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
       ->leftJoin('wb_trader_account as t9', 't1.local_agent_id', '=', 't9.id')
       ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
       ->leftJoin('tra_approval_recommendations as t11', 't1.permit_id', '=', 't11.id')
       ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
       
       ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
       ->leftJoin('par_validity_statuses as t4', 't12.validity_status_id', '=', 't4.id')
       ->leftJoin('par_registration_statuses as t15', 't12.validity_status_id', '=', 't15.id')
       ->join('par_sections as t16', 't1.section_id', '=', 't16.id')
       ->leftJoin('tra_product_manufacturers as t14', function ($join) {
           $join->on('t7.id', '=', 't14.product_id')
               ->on('t14.manufacturer_role_id', '=', DB::raw(1))
               ->on('t14.manufacturer_type_id', '=', DB::raw(1));
       })
	    ->leftJoin($portalDb.'.wb_trader_account as t17', 't9.identification_no', '=', 't17.identification_no')
       ->select('t7.*','t1.*', 't16.name as section_name', 't4.name as validity_status','t15.name as registration_status', 't1.id as active_application_id', 't1.reg_product_id', 't3.name as applicant_name', 't9.name as local_agent', 't12.id as registered_product_id','t1.product_id as tra_product_id',
           't13.name as storage_condition','t7.brand_name', 't12.tra_product_id', 't8.name as common_name', 't10.name as classification_name', 't11.certificate_no', 't11.expiry_date',
           't7.brand_name as sample_name','t14.manufacturer_id', 't17.id as local_agent_id')
       ->where(array('t12.registration_status_id' => 2))
	   ->groupBy('t7.id')->orderBy('t1.id', 'desc');//, 't7.section_id'=>$section_id
       
    if (isset($section_id) && is_numeric($section_id)) {
        $qry->where('t1.section_id', $section_id);
    }
    if (validateIsNumeric($validity_status)) {
        $qry->where('t12.validity_status_id', $validity_status);
    }
    if (validateIsNumeric($registration_status)) {
        $qry->where('t12.registration_status_id', $registration_status);
    }
    if (validateIsNumeric($mistrader_id)) {
        $qry->where('t1.applicant_id', $mistrader_id);
    }


    if($search_value != ''){
        $whereClauses = array();
        $whereClauses[] = "t8.name like '%" . ($search_value) . "%'";
        
        $whereClauses[] = "t7.brand_name  like '%" . ($search_value) . "%'";
        $whereClauses[] = "t11.certificate_no  like '%" . ($search_value) . "%'";
        $filter_string = implode(' OR ', $whereClauses);
        $qry->whereRAW($filter_string);
    }

    $totalCount = $qry->count();
    if(validateIsNumeric($take)){
        $records = $qry->skip($skip)->take($take)->get();
    }
    else{

        $records = $qry->get();
    }
    
        $res = array('success' => true,
            'data' => $records,'totalCount'=>$totalCount 
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

   public function getPromotionalAdvertDetails(Request $req){
    try{
        $application_id = $req->application_id;
        $data = array();
        //get the records 
        $records = DB::table('wb_promotion_adverts_applications as t1')
                ->select(DB::raw("t1.*,t1.id as application_id, t1.application_status_id as status_id, t3.name as status_name, t4.router_link,t1.trader_id as applicant_id, t4.name as process_title"))
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                    $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
                ->where(array('t1.id' => $application_id))
                ->first();
                
                 $res =array('success'=>true,'data'=> $records);
    }
    catch (\Exception $e) {
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
   
public function onDeleteOtherApplicationsDetails(Request $req){
    
    try{
        $record_id = $req->record_id;
        $application_id = $req->application_id;
        $table_name = $req->table_name;
        $title = $req->title;
        $email_address = $req->email_address;
        $data = array();
        //get the records 
        $resp = false;
        $where_state = array('application_id' => $application_id, 'id'=>$record_id);
        $records = DB::table($table_name)
                ->where($where_state)
                 ->get();
        if(count($records) >0){
                //delete functionality
                
                $previous_data = getPreviousRecords($table_name, $where_state);
                         
                $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state,  $email_address);
        }
        if($resp){
            $res = array('success'=>true, 'message'=>$title.' deleted successfully');

        }   
        else{
            $res = array('success'=>false, 'message'=>$title.' delete failed, contact the system admin if this persists');
        }    
    }
    catch (\Exception $e) {
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

}
