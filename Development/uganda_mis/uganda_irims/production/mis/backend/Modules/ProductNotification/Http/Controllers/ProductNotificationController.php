<?php

namespace Modules\ProductNotification\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;

class ProductNotificationController extends Controller
{
     protected $user_id;

    public function __construct(Request $req)
    {
        // $is_mobile = $req->input('is_mobile');
        // if (is_numeric($is_mobile) && $is_mobile > 0) {
        //     $this->user_id = $req->input('user_id');
        // } else {
        //     $this->middleware(function ($request, $next) {
        //         if (!\Auth::check()) {
        //             $res = array(
        //                 'success' => false,
        //                 'message' => '<p>NO SESSION, SERVICE NOT ALLOWED!!<br>PLEASE RELOAD THE SYSTEM!!</p>'
        //             );
        //             echo json_encode($res);
        //             exit();
        //         }
        //         $this->user_id = \Auth::user()->id;
        //         return $next($request);
        //     });
        // }
    }

     public function getOnlineApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $data = array();
            $portal_db = DB::connection('portal_db');
            //get process details
            $qry = $portal_db->table('wb_product_applications as t1')
                ->join('wb_product_information as t2', 't1.product_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->leftJoin('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('wb_trader_account as t5', 't1.local_agent_id', '=', 't5.id')
                ->select('t1.*', 't1.id as active_application_id', 't1.application_code', 't2.brand_name',
                    't3.name as applicant_name', 't3.contact_person', 't5.name as local_agent',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.name as application_status', 't4.is_manager_query')
                ->whereIn('application_status_id', array(2, 13, 15, 17))
                ->where('module_id',6);

            $modulesData = getParameterItems('modules', '', '');
            $subModulesData = getParameterItems('sub_modules', '', '');
            $zoneData = getParameterItems('par_zones', '', '');
            $deviceTypeData = getParameterItems('par_device_types', '', '');
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            $records = $qry->get();
            foreach ($records as $rec) {
                $data[] = array('active_application_id' => $rec->active_application_id,
                    'application_code' => $rec->application_code,
                    'brand_name' => $rec->brand_name,
                    'applicant_name' => $rec->applicant_name,
                    'contact_person' => $rec->contact_person,
                    'local_agent' => $rec->local_agent,
                    'app_physical_address' => $rec->app_physical_address,
                    'application_status' => $rec->application_status,
                    'module_id' => $rec->module_id,
                    'sub_module_id' => $rec->sub_module_id,
                    'reg_product_id' => $rec->reg_product_id,
                    'tracking_no' => $rec->tracking_no,
                    'applicant_id' => $rec->trader_id,
                    'local_agent_id' => $rec->local_agent_id,
                    'section_id' => $rec->section_id,
                    'product_id' => $rec->product_id,
                    'zone_id' => $rec->zone_id,
                    'date_added' => $rec->date_added,
                    'submission_date' => $rec->submission_date,

                    'device_type' => returnParamFromArray($deviceTypeData, $rec->device_type_id),
                    'module_name' => returnParamFromArray($modulesData, $rec->module_id),
                    'sub_module' => returnParamFromArray($subModulesData, $rec->sub_module_id),
                    'zone_name' => returnParamFromArray($zoneData, $rec->zone_id));


            }


            $res = array(
                'success' => true,
                'results' => $data,
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
    public function prepareOnlineProductNotReceivingStage(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::connection('portal_db')->table('wb_product_applications as t1')
                ->join('wb_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('wb_statuses as q', 't1.application_status_id', '=', 'q.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->select('t1.*', 'q.name as application_status', 't1.id as active_application_id', 't2.brand_name as brand_name',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*');

            $results = $qry1->first();

            $qry2 = clone $main_qry;
            $qry2->join('wb_trader_account as t3', 't1.local_agent_id', '=', 't3.id')
                ->select('t3.id as trader_id', 't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            $ltrDetails = $qry2->first();

            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $results->process_name = getSingleRecordColValue('wf_tfdaprocesses', $where, 'name');
            $res = array(
                'success' => true,
                'results' => $results,
                'ltrDetails' => $ltrDetails,
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
    public function onLoadOnlineproductNotificationManufacturer(Request $req){
         
        try{
            $data = array();
            $product_id = $req->product_id;
            $manufacturer_type_id = $req->manufacturer_type_id;
            $records = DB::connection('portal_db')->table('wb_product_manufacturers as t1')
                       ->where(array('product_id'=>$product_id,'manufacturer_type_id'=>1))   
                         ->get();
                         foreach ($records as $rec) {
                             
                                $manufacturer_id = $rec->manufacturer_id;
                              
                                $records = DB::connection('')
                                    ->table('tra_manufacturers_information as t1')
                                    ->select('t1.*', 't1.id as manufacturer_id', 't1.name as manufacturer_name', 't2.name as country', 't3.name as region', 't4.name as district')
                                    ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                                    ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                                    ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                                    ->where(array('t1.id' => $manufacturer_id))
                                    ->first();

                                $data[] = array('id' => $rec->id,
                                    'manufacturer_name' => $records->manufacturer_name,
                                    'country_name' => $records->country,
                                    'region_name' => $records->region,
                                    'product_id' => $rec->product_id,
                                    'physical_address' => $records->physical_address,
                                    'postal_address' => $records->postal_address,
                                    'email_address' => $records->email_address
                                );
                        }  
                        $res = array(
                            'success' => true,
                            'results' => $data
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
    public function getMedicalDevicesNotificationapps(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);

            $qry = DB::table('tra_product_notifications as t1')
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->join('users as t9', 't7.usr_to', '=', 't9.id')
                ->select(DB::raw("t7.date_received, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.brand_name as product_name,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t2.*, t1.*"));
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($workflow_stage_id)) {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
            $qry->where('t7.isDone', 0);
            $results = $qry->get();

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
    public function onLoadproductManufacturer(Request $req)
    {

        try {
            $product_id = $req->product_id;
            $records = array();
            //get the records
            $records = DB::table('tra_product_manufacturers as t1')
                ->select('t1.*', 't2.email_address','t1.id as manufacturer_id', 't2.physical_address', 't2.name as manufacturer_name', 't3.name as country_name', 't4.name as region_name', 't5.name as district_name')
                ->join('tra_manufacturers_information as t2', 't1.manufacturer_id', '=', 't2.id')
                ->join('par_countries as t3', 't2.country_id', '=', 't3.id')
                ->join('par_regions as t4', 't2.region_id', '=', 't4.id')
                ->leftJoin('par_districts as t5', 't2.district_id', '=', 't5.id')
                ->leftJoin('par_manufacturing_roles as t6', 't1.manufacturer_role_id', '=', 't6.id')
                ->where(array('t1.product_id' => $product_id, 'manufacturer_type_id' => 1))
                ->get();

            $res = array('success' => true, 'results' => $records);

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
    //
    public function getProductNotificationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $class_code = getSingleRecordColValue('par_classifications', array('id' => $application_details->classification_id), 'code');
        $device_typecode = getSingleRecordColValue('par_device_types', array('id' => $application_details->device_type_id), 'code');

        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'class_code' => $class_code,
            'device_typecode'=>$device_typecode
        );  
              
        return $codes_array;
    }
    public function saveProductNotificationReceivingBaseDetails(Request $request)
    {
        try {
            $active_application_id = $request->input('active_application_id');
            $applicant_id = $request->input('applicant_id');
            $process_id = $request->input('process_id');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $zone_id = $request->input('zone_id');
            $section_id = $request->input('section_id');
            $module_id = $request->input('module_id');
            $sub_module_id = $request->input('sub_module_id');
            $local_agent_id = $request->input('local_applicant_id');
            $user_id = $this->user_id;
            $product_id = $request->input('product_id');
            $classification_id = $request->input('classification_id');
            $assessment_procedure_id = $request->input('assessment_procedure_id');
            $device_type_id = $request->input('device_type_id');

            $prod_data = array("dosage_form_id" => $request->input('dosage_form_id'),
                "classification_id" => $request->input('classification_id'),
                "brand_name" => $request->input('brand_name'),
                "common_name_id" => $request->input('common_name_id'),
                "product_strength" => $request->input('product_strength'),
                "physical_description" => $request->input('physical_description'),
                "si_unit_id" => $request->input('si_unit_id'),
                "atc_code_id" => $request->input('atc_code_id'),
                "product_form_id" => $request->input('product_form_id'),
                "storage_condition_id" => $request->input('storage_condition_id'),
                "product_type_id" => $request->input('product_type_id'),
                "product_category_id" => $request->input('product_category_id'),
                "distribution_category_id" => $request->input('distribution_category_id'),
                "special_category_id" => $request->input('special_category_id'),
                "product_subcategory_id" => $request->input('product_subcategory_id'),
                "intended_enduser_id" => $request->input('intended_enduser_id'),
                "intended_use_id" => $request->input('intended_use_id'),
                "route_of_administration_id" => $request->input('route_of_administration_id'),
                "method_ofuse_id" => $request->input('method_ofuse_id'),
                "instructions_of_use" => $request->input('instructions_of_use'),

                "warnings" => $request->input('warnings'),
                "gmdn_code" => $request->input('gmdn_code'),
                "gmdn_term" => $request->input('gmdn_term'),
                "gmdn_category" => $request->input('gmdn_category'),
                "manufacturing_date" => $request->input('manufacturing_date'),
                "expiry_date" => $request->input('expiry_date'),
                "device_type_id" => $request->input('device_type_id'),


                "shelf_lifeafter_opening" => $request->input('shelf_lifeafter_opening'),
                "shelf_life" => $request->input('shelf_life'),

                "section_id" => $request->input('section_id'));

            if (validateIsNumeric($active_application_id)) {
                //update
                $applications_table = 'tra_product_notifications';

                $products_table = 'tra_product_information';
                //Application_edit
                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'local_agent_id' => $local_agent_id,
                    'zone_id' => $zone_id
                );
                $where_product = array(
                    'id' => $product_id
                );
                $where_app = array(
                    'id' => $active_application_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];


                    updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);

                }

                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $ref_number = $app_details[0]['reference_no'];//$app_details->reference_no;

                $where_product = array(
                    'id' => $product_id
                );
                //Premise_edit
                $prod_data['dola'] = Carbon::now();
                $prod_data['altered_by'] = $user_id;
                $previous_data = getPreviousRecords($products_table, $where_product);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }

                $previous_data = $previous_data['results'];
                $res = updateRecord($products_table, $previous_data, $where_product, $prod_data, $user_id);
                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;
                $res['product_id'] = $product_id;
                $res['ref_no'] = $ref_number;

            } else {

                $dms_node_details = getApplicationSubModuleNodeDetails($section_id, $module_id, $sub_module_id, $user_id);

                if ($dms_node_details != '') {
                    $prod_data['created_by'] = \Auth::user()->id;
                    $prod_data['created_on'] = Carbon::now();

                    $res = insertRecord('tra_product_information', $prod_data, $user_id);

                    $record_id = $res['record_id'];
                    $product_id = $res['record_id'];
                    $applications_table = 'tra_product_notifications';


                    $application_code = generateApplicationCode($sub_module_id, $applications_table);

                    $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                    $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                    $class_code = getSingleRecordColValue('par_classifications', array('id' => $classification_id), 'code');
                    $device_typecode = getSingleRecordColValue('par_device_types', array('id' => $device_type_id), 'code');
            
                    $codes_array = array(
                        'section_code' => $section_code,
                        'zone_code' => $zone_code,
                        'class_code' => $class_code,
                        'device_typecode'=>$device_typecode
                    );  
                          
                    $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                    if ($tracking_details['success'] == false) {
                        return \response()->json($tracking_details);
                    }
                    $tracking_no = $tracking_details['tracking_no'];
                    $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                    
                    $registration_data = array('tra_product_id' => $product_id,
                        'status_id' => $application_status,
                        'validity_status_id' => 1,
                        'registration_status_id' => 1
                    );
                    $where_statement = array('tra_product_id' => $product_id);
                    saveApplicationRegistrationDetails('tra_registered_products', $registration_data, $where_statement, $user_id);

                    $view_id = generateApplicationViewID();
                    //  'view_id'=>$view_id,
                    $app_data = array(
                        "process_id" => $request->input('process_id'),
                        "workflow_stage_id" => $request->input('workflow_stage_id'),
                        "application_status_id" => $application_status->status_id,
                        "application_code" => $application_code,
                        'tracking_no' => $tracking_no,
                        'view_id' => $view_id,
                        "applicant_id" => $request->input('applicant_id'),
                        "sub_module_id" => $request->input('sub_module_id'),
                        "module_id" => $request->input('module_id'),
                        "section_id" => $request->input('section_id'),
                        "product_id" => $product_id,
                        "local_agent_id" => $request->input('local_agent_id'),
                        "assessment_procedure_id" => $request->input('assessment_procedure_id'),
                        "date_added" => Carbon::now(),
                        "created_by" => \Auth::user()->id,
                        "created_on" => Carbon::now());

                    $res = insertRecord('tra_product_notifications', $app_data, $user_id);
                    $active_application_id = $res['record_id'];

                    //add to submissions table
                    $submission_params = array(
                        'application_id' => $active_application_id,
                        'process_id' => $process_id,
                        'application_code' => $application_code,
                       
                        'usr_from' => $user_id,
                        'usr_to' => $user_id,
                        'previous_stage' => $workflow_stage_id,
                        'current_stage' => $workflow_stage_id,
                        'module_id' => $module_id,
                        'sub_module_id' => $sub_module_id,
                        'section_id' => $section_id,
                        'application_status_id' => $application_status->status_id,
                        'urgency' => 1,
                        'applicant_id' => $applicant_id,
                        'remarks' => 'Initial save of the application',
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );

                    insertRecord('tra_submissions', $submission_params, $user_id);
                    $res['active_application_id'] = $active_application_id;
                    $res['application_code'] = $application_code;
                    $res['product_id'] = $product_id;
                    $res['ref_no'] = $ref_number;
                    //dms function 
                    $nodetracking = str_replace("/", "-", $ref_number);
                    $parentnode_ref = $dms_node_details->node_ref;

                    $node_details = array(
                        'name' => $nodetracking,
                        'nodeType' => 'cm:folder');

                   
                    if ($response['success']) {
                       initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $user_id);
                        //add to submissions table
                    } else {
                        $res = $response;
                    }

                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'DMS Repository for the selected Application asnt been configured, contact the system administration.');
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
        return \response()->json($res);
    }
    public function saveOnlineProductNotificationReceiving(Request $req){
        try { 
            $application_code = $req->application_code;
            $product_id = $req->product_id;
            $user_id = $this->user_id;
            $product_infor = array('common_name_id'=>$req->common_name_id,
                                'classification_id'=>$req->classification_id,
                                'brand_name'=>$req->brand_name,
                                'device_type_id'=>$req->device_type_id,
                                'physical_description'=>$req->physical_description,
                                'intended_enduser_id'=>$req->intended_enduser_id,
                                'intended_use_id'=>$req->intended_use_id,
                                'product_type_id'=>$req->product_type_id,
                                'gmdn_code'=>$req->gmdn_code,
                                'gmdn_category'=>$req->gmdn_category,
                                'gmdn_term'=>$req->gmdn_term,
                                'gmdn_term'=>$req->gmdn_term,
                                'shelf_lifeafter_opening'=>$req->shelf_lifeafter_opening,
                                'shelf_life'=>$req->shelf_life,
                                'instructions_of_use'=>$req->instructions_of_use,
                                'warnings'=>$req->warnings,
                                'intended_use'=>$req->intended_use,
                                'shelflifeduration_desc'=>$req->shelflifeduration_desc
                            );
                            $resp = '';
                        
                        if(validateIsNumeric($product_id)){
                                //update the record 
                                //product information
                                //date_added
                                $where = array('id'=>$product_id);
                                $where_app = array('product_id'=>$product_id);
                                if (recordExists('wb_product_information', $where, 'portal_db')) {
                                    
                                    $product_infor['dola'] = Carbon::now();
                                    $product_infor['altered_by'] = $user_id;
                                    $table_name = 'wb_product_information';
                                    $previous_data = getPreviousRecords($table_name, $where,'portal_db');
                                    $previous_data =  $previous_data['results'];
                                    $resp = updateRecord('wb_product_information', $previous_data, $where, $product_infor, $user_id,'portal_db');
                                    
                                }
                             
                        }
                        if($resp['success']){
                            $res = array(
                                 'success'=>true,
                                 'message'=>'Product Notification Updated Successfully');
                    
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'error'=>$resp['message'],
                            'message'=>'Error Occurred Product Notification not saved, it this persists contact the system Administrator');
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
    public function getManagerEvaluationApplications(Request $request)
    {

        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_classifications as t7', 't2.classification_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't2.common_name_id', '=', 't8.id')
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t9', function ($join) {
                    $join->on('t1.workflow_stage_id', '=', 't9.current_stage')
                        ->on('t1.application_code', '=', 't9.application_code');
                })
                ->join('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('par_device_types as t11', 't2.device_type_id', '=', 't11.id')
                ->select('t1.*', 't11.name as device_type','t7.name as classification_name', 't10.username as submitted_by', 't9.date_received as submitted_on', 't8.name as common_name', 't2.brand_name as product_name', 't3.name as applicant_name', 't4.name as application_status',
                    't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id')
                ->where('t1.workflow_stage_id', $workflow_stage);

            $results = $qry->get();
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
    public function prepareProductNotificationReceivingStage(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_product_notifications as t1')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->select('t1.*', 't1.id as active_application_id', 't2.brand_name as brand_name',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.id as invoice_id', 't4.invoice_no');

            $results = $qry1->first();

            $qry2 = clone $main_qry;
            $qry2->join('wb_trader_account as t3', 't1.local_agent_id', '=', 't3.id')
                ->select('t3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            $ltrDetails = $qry2->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'ltrDetails' => $ltrDetails,
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
    //
    public function getProductNotificationDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $applicant_id = $request->input('applicant_id');
        $product_id = $request->input('product_id');
        try {
            $zone_id = DB::table('tra_product_notifications')
                ->where('id', $application_id)
                ->value('zone_id');

            $qryProducts = DB::table('tra_product_information as t1')
                ->join('tra_product_notifications as t2', 't1.id', '=', 't2.product_id')
                ->select('t1.id as product_id',  't1.*')
                ->where('t1.id', $product_id);

            $product_details = $qryProducts->first();

            $res = array(
                'success' => true,
                'product_details' => $product_details,
                'zone_id' => $zone_id,
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
    public function prepareMedicaldevicesUniformStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->join('tra_product_information as t4', 't1.product_id', '=', 't4.id')
                ->select(DB::raw("t1.applicant_id,t1.product_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,t3.isLocked,
                t1.section_id,t1.module_id,CONCAT_WS(',',t4.brand_name,t4.physical_description) as product_details"))
                ->where('t1.id', $application_id);

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

    public function onSaveProductNotificationinformation(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;
            $data = $req->all();

            $table_name = $req->table_name;
            $record_id = $req->product_id;
            unset($data['table_name']);
            unset($data['model']);
            unset($data['manufacturer_name']);
            unset($data['product_id']);
            unset($data['application_id']);
            unset($data['assessment_procedure_id']);
            unset($data['zone_id']);

            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_id);

                }
            }

            if ($resp['success']) {
                $res = array('success' => true,
                    'message' => 'Saved Successfully');

            } else {
                $res = array('success' => false,
                    'message' => $resp['message']);

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

    public function getProductNotificationApprovalApplications(Request $req)
    {

        $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');
        try {

            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->join('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->join('par_classifications as t14', 't7.classification_id', '=', 't14.id')
                ->leftJoin('tra_evaluation_recommendations as t10', 't1.application_code', '=', 't10.application_code')
                ->leftJoin('wf_workflow_actions as t12', 't10.recommendation_id', '=', 't12.id')
                ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status', 't6.name as dg_recommendation', 't5.decision_id as recommendation_id',
                    't1.id as active_application_id', 't7.brand_name', 't8.name as common_name', 't14.name as classification_name',
                    't12.name as evaluator_recommendation')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->where(array('t1.workflow_stage_id' => $workflow_stage));

            $results = $qry->get();
            
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

    public function ScheduledExpiryNotificationScript(Request $req){

        //get all modules
        $modules = DB::table('modules')->where('is_application',1)->whereRAW('id IN (1,2,3,4,7,15)')->get();

        //loop through the modules 
        foreach ($modules as $module) {
            $table_name = $module->table_name;
            $module_id = $module->id;

            //get the days span for the module applications
            $days_spans = DB::table('par_expirynotification_timespan')->select('days_span')->where('module_id',$module_id)->first();
            $max_days = $days_spans->days_span;
            $today_date = formatDate(Carbon::now());            

            switch ($module_id) {
                case 1:
                    //get applicants with applications that meets the expiration date span
                        $applicants = DB::table($table_name. ' as t1')
                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                            ->groupBY('t1.applicant_id')
                            ->select('t1.applicant_id')
                            ->get();                    //email to the applicant on their products
                        foreach ($applicants as $applicant) {
                            $applicant_id = $applicant->applicant_id;
                            $getApplications = DB::table($table_name. ' as t1')
                                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                                            ->join('tra_product_information as t4','t1.product_id','t4.id')
                                            ->where('t1.applicant_id',2)
                                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                                            ->select('t4.brand_name as name','t1.reference_no','t2.certificate_no','t2.expiry_date')
                                            ->get();
                        //prepare result tables 
                            $app_list_html = $this->getStringTableResult($getApplications,"Brand Name");
                        //prepare email
                            $vars = array(
                                '{table}' => $app_list_html,
                                '{item}' => 'product(s)'
                            );
                            //applicant email
                           // $email = $this->getApplicantEmail($applicant_id);
                            $email = 'kunguonesmas@gmail.com';
                            $mailer = applicationExpiryNotificationMail(12,$email,$vars,2);
                        
                        }
                    break;
                case 2:
                    //get applicants with applications that meets the expiration date span
                        $applicants = DB::table($table_name. ' as t1')
                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                            ->groupBY('t1.applicant_id')
                            ->select('t1.applicant_id')
                            ->get();                    //email to the applicant on their products
                        foreach ($applicants as $applicant) {
                            $applicant_id = $applicant->applicant_id;
                            $getApplications = DB::table($table_name. ' as t1')
                                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                                            ->join('tra_premises as t4','t1.premise_id','t4.id')
                                            ->where('t1.applicant_id',2)
                                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                                            ->select('t4.name as name','t1.reference_no','t2.certificate_no','t2.expiry_date')
                                            ->get();
                        //prepare result tables 
                            $app_list_html = $this->getStringTableResult($getApplications,"Premise Name");
                        //prepare email
                            $vars = array(
                                '{table}' => $app_list_html,
                                '{item}' => 'premise(s)'
                            );
                            //applicant email
                          //  $email = $this->getApplicantEmail($applicant_id);
                            $email = 'kunguonesmas@gmail.com';
                            $mailer = applicationExpiryNotificationMail(12,$email,$vars,2);
                        
                        }
                    break;
                    case 3:
                    //get applicants with applications that meets the expiration date span
                        $applicants = DB::table($table_name. ' as t1')
                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                            ->groupBY('t1.applicant_id')
                            ->select('t1.applicant_id')
                            ->get();                    //email to the applicant on their products
                        foreach ($applicants as $applicant) {
                            $applicant_id = $applicant->applicant_id;
                            $getApplications = DB::table($table_name. ' as t1')
                                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                                            ->join('tra_manufacturing_sites as t4','t1.manufacturing_site_id','t4.id')
                                            ->where('t1.applicant_id',2)
                                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                                            ->select('t4.name as name','t1.reference_no','t2.certificate_no','t2.expiry_date')
                                            ->get();
                        //prepare result tables                       
                          $app_list_html = $this->getStringTableResult($getApplications,"Manufacturing Site");
                        //prepare email
                            $vars = array(
                                '{table}' => $app_list_html,
                                '{item}' => 'gmp application(s)'
                            );
                            //applicant email
                           // $email = $this->getApplicantEmail($applicant_id);
                            $email = 'kunguonesmas@gmail.com';
                            $mailer = applicationExpiryNotificationMail(12,$email,$vars,2);
                        
                        }
                    break;
                    case 4:
                    //get applicants with applications that meets the expiration date span
                        $applicants = DB::table($table_name. ' as t1')
                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                            ->groupBY('t1.applicant_id')
                            ->select('t1.applicant_id')
                            ->get();                    //email to the applicant on their products
                        foreach ($applicants as $applicant) {
                            $applicant_id = $applicant->applicant_id;
                            $getApplications = DB::table($table_name. ' as t1')
                                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                                            ->join('tra_product_applications as t3','t1.application_code','t3.application_code')
                                            ->join('tra_product_information as t4','t3.product_id','t4.id')
                                            ->where('t1.applicant_id',2)
                                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                                            ->select('t4.brand_name as name','t1.reference_no','t2.certificate_no','t2.expiry_date')
                                            ->get();
                        //prepare result tables 
                            $app_list_html = $this->getStringTableResult($getApplications,"Brand Name");
                        //prepare email
                            $vars = array(
                                '{table}' => $app_list_html,
                                '{item}' => 'Product(s)'
                            );
                            //applicant email
                           // $email = $this->getApplicantEmail($applicant_id);
                            $email = 'kunguonesmas@gmail.com';
                            $mailer = applicationExpiryNotificationMail(12,$email,$vars,2);
                        
                        }
                    break;
                    case 7:
                    //get applicants with applications that meets the expiration date span
                        $applicants = DB::table($table_name. ' as t1')
                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                            ->groupBY('t1.applicant_id')
                            ->select('t1.applicant_id')
                            ->get();                    //email to the applicant on their products
                        foreach ($applicants as $applicant) {
                            $applicant_id = $applicant->applicant_id;
                            $getApplications = DB::table($table_name. ' as t1')
                                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                                            ->where('t1.applicant_id',2)
                                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                                            ->select('t1.study_title as name','t1.reference_no','t2.certificate_no','t2.expiry_date')
                                            ->get();
                        //prepare result tables 
                            $app_list_html = $this->getStringTableResult($getApplications,"Study Title");
                        //prepare email
                            $vars = array(
                                '{table}' => $app_list_html,
                                '{item}' => 'Clinical Trial application(s)'
                            );
                            //applicant email
                            //$email = $this->getApplicantEmail($applicant_id);
                            $email = 'kunguonesmas@gmail.com';
                            $mailer = applicationExpiryNotificationMail(12,$email,$vars,2);
                        
                        }
                    break;
                    case 15:
                    //get applicants with applications that meets the expiration date span
                        $applicants = DB::table($table_name. ' as t1')
                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                            ->groupBY('t1.trader_id')
                            ->select('t1.trader_id')
                            ->get();                    //email to the applicant on their products
                        foreach ($applicants as $applicant) {
                            $trader_id = $applicant->trader_id;
                            $getApplications = DB::table($table_name. ' as t1')
                                            ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                                            ->join('tra_promotion_prod_particulars as t4','t1.id','t4.application_id')
                                            ->where('t1.trader_id',2)
                                            ->whereRaw("DATEDIFF(t2.expiry_date,'".$today_date."') <= ".$max_days)
                                            ->select('t4.brand_name as name','t1.reference_no','t2.certificate_no','t2.expiry_date')
                                            ->get();
                        //prepare result tables 
                            $app_list_html = $this->getStringTableResult($getApplications,"Brand Name");
                        //prepare email
                            $vars = array(
                                '{table}' => $app_list_html,
                                '{item}' => 'promotion and advertisement application(s)'
                            );
                            //applicant email
                            //$email = $this->getApplicantEmail($trader_id);
                            $email = 'kunguonesmas@gmail.com';
                            $mailer = applicationExpiryNotificationMail(12,$email,$vars,2);
                        
                        }
                    break;
                    
                default:
                    # code...
                    break;
            }

        }
        return 'Done';
    }

    public function getStringTableResult($collection,$name){
      //  dd($collection);
        $htmlTable = "<table style='width:100%' border=true>
                        <tr>
                           <td colspan=4 align=center> <H2> Due Applications </H2></td>
                        </tr>
                          <tr>
                            <th>".$name."</th>
                            <th>Reference No</th>
                            <th>Certificate No</th>
                            <th>Expiry Date</th>
                          </tr>";
        foreach ($collection as $col) {
            $htmlTable .= "<tr>
                            <td>".$col->name."</td>
                            <td>".$col->reference_no."</td>
                            <td>".$col->certificate_no."</td>
                            <td>".formatDate($col->expiry_date)."</td>
                           </tr>";
        }

    return $htmlTable;
  }
  public function getApplicantEmail($applicant_id){
    $applicant = DB::table('wb_trader_account')->select('email')->where('id',$applicant_id)->first();

    return $applicant->email;
  }
}
