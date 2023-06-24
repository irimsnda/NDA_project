<?php

namespace Modules\ProductRegistration\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Excel;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class ProductRegistrationController extends Controller
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
    public function getProductApplicationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $class_code = getSingleRecordColValue('par_classifications', array('id' => $application_details->classification_id), 'code');
        $apptype_code = getSingleRecordColValue('par_product_types', array('id' => $application_details->product_origin_id), 'code');
        $assessment_code = getSingleRecordColValue('par_assessment_procedures', array('id' => $application_details->assessment_procedure_id), 'code');
        $device_typecode = getSingleRecordColValue('par_device_types', array('id' => $application_details->device_type_id), 'code');

        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'class_code' => $class_code,
            'assessment_code' => $assessment_code, 
            'device_typecode'=>$device_typecode
        );  
              
        return $codes_array;
    }
    public function getProductApplications(Request $request)
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

            $qry = DB::table('tra_product_applications as t1')
                ->join('tra_submissions as t7', function ($join) {
                    $join->on('t1.application_code', '=', 't7.application_code')
                        ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                })
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('users as t8', 't7.usr_from', '=', 't8.id')
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

                $qry->where('t7.current_stage', $workflow_stage_id);
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

    public function closeApplicationQuery(Request $request)
    {

        $query_id = $request->input('query_id');
        $item_resp_id = $request->input('item_resp_id');
        $application_code = $request->input('application_code');
        $user_id = $this->user_id;

        $table_name = 'checklistitems_queries';

        $where = array(
            'id' => $query_id
        );

        $table_data = array(
            'status' => 4
        );

        try {
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == true) {
                $previous_data = $prev_data['results'];
                $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                if (DB::table('checklistitems_queries')
                        ->where('item_resp_id', $item_resp_id)
                        ->where('status', '<>', 4)
                        ->count() == 0) {
                    DB::table('checklistitems_responses')
                        ->where('id', $item_resp_id)
                        ->update(array('pass_status' => 1));
                }
            } else {
                $res = $prev_data;
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

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function saveRenAltProductReceivingBaseDetails(Request $request)
    {
        try {
            $reg_product_id = $request->input('reg_product_id');
            $tra_product_id = $request->input('tra_product_id');
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

            $appeal_type_id = $request->input('appeal_type_id');
             $withdrawal_type_id = $request->input('withdrawal_type_id');

             $prod_data = $this->returnProductDataSets($request);
            
            
            $applications_table = 'tra_product_applications';

            $products_table = 'tra_product_information';
            if (validateIsNumeric($active_application_id)) {
                //update

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
            
                $res = updateRecord($products_table, $app_details, $where_product, $prod_data, $user_id);
                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;
                $res['active_application_code'] = $application_code;
                $res['product_id'] = $product_id;
                $res['ref_no'] = $ref_number;
                $doc_record = DB::table('tra_application_documentsdefination')->where('application_code',$application_code)->first();
                if(!$doc_record){
                    initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number.rand(10,100), $user_id);
                }

            } else {
                //check for previous applicaitons 
                //expiry dates check span
                $anyOngoingApps = checkForOngoingApplications($reg_product_id, $applications_table, 'reg_product_id', $process_id);
                if ($anyOngoingApps['exists'] == true) {
                    $res = array(
                        'success' => false,
                        'message' => 'There is an ongoing application pending approval with reference number ' . $anyOngoingApps['ref_no']
                    );
                    return \response()->json($res);
                }

               // $dms_node_details = getApplicationSubModuleNodeDetails($section_id, $module_id, $sub_module_id, $user_id);

               // if ($dms_node_details != '') {
                    $prod_data['created_by'] = \Auth::user()->id;
                    $prod_data['created_on'] = Carbon::now();

                    $res = insertRecord('tra_product_information', $prod_data, $user_id);

                    $record_id = $res['record_id'];
                    $product_id = $res['record_id'];
                    $applications_table = 'tra_product_applications';
                    //get the primary reference no
                    $application_code = generateApplicationCode($sub_module_id, $applications_table);
                    $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                    $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id');
                     $where_statement = array('sub_module_id' => 7, 't1.reg_product_id' => $reg_product_id);
                    $primary_reference_no = getProductPrimaryReferenceNo($where_statement, 'tra_product_applications');
                    $codes_array = array(
                        'ref_no' => $primary_reference_no
                    );
                    $ref_number = generateProductsSubRefNumber($reg_product_id, $applications_table, $ref_id, $codes_array, $sub_module_id, $user_id);
                                      
                    if (!validateIsNumeric($ref_id )) {
                        return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                    }
                    else if( $ref_number == ''){
                        return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                    }


                    $where_statement = array('tra_product_id' => $product_id);
                    //save other applications details 
                    $view_id = generateApplicationViewID();
                    //  'view_id'=>$view_id,
                    $app_data = array(
                        "process_id" => $request->input('process_id'),
                        'view_id' => $view_id,
                        "workflow_stage_id" => $request->input('workflow_stage_id'),
                        "application_status_id" => $application_status->status_id,
                        "application_code" => $application_code,
                        "reference_no" => $ref_number,
                        "tracking_no" => $ref_number,
                        "applicant_id" => $request->input('applicant_id'),
                        "sub_module_id" => $request->input('sub_module_id'),
                        "module_id" => $request->input('module_id'),
                        "section_id" => $request->input('section_id'),
                        "product_id" => $product_id,
                        "local_agent_id" => $request->input('local_applicant_id'),
                        "assessment_procedure_id" => $request->input('assessment_procedure_id'),
                        "date_added" => Carbon::now(),
                        'appeal_type_id' => $appeal_type_id,
                        'withdrawal_type_id' => $withdrawal_type_id,
                        'reg_product_id' => $reg_product_id,
                        "created_by" => \Auth::user()->id,
                        "created_on" => Carbon::now());

                    $res = insertRecord('tra_product_applications', $app_data, $user_id);
                    $active_application_id = $res['record_id'];

                    //add to submissions table
                    $submission_params = array(
                        'application_id' => $active_application_id,
                        'process_id' => $process_id,
                        'application_code' => $application_code,
                        'reference_no' => $ref_number,
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
                        'zone_id' => $zone_id,
                        'remarks' => 'Initial save of the application',
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );

                    insertRecord('tra_submissions', $submission_params, $user_id);
                    $res['active_application_id'] = $active_application_id;
                    $res['application_code'] = $application_code;
                    $res['active_application_code'] = $application_code;
                    $res['product_id'] = $product_id;
                    $res['ref_no'] = $ref_number;
                    //dms function

                    //dms function
                    initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number.rand(10,100), $user_id);
/*
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'DMS Repository for the selected Application hasn\'t been configured, contact the system administration.');
                }
*/

            }

        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'data'=>$res,
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
    function returnProductDataSets($request){
        $prod_data = array("dosage_form_id" => $request->input('dosage_form_id'),
                    "classification_id" => $request->input('classification_id'),
                    "brand_name" => $request->input('brand_name'),
                    "common_name_id" => $request->input('common_name_id'),
                    "product_strength" => $request->input('product_strength'),
                    "physical_description" => utf8_encode($request->input('physical_description')),
                    "si_unit_id" => $request->input('si_unit_id'),
                    "atc_code_id" => $request->input('atc_code_id'),
                    "product_form_id" => $request->input('product_form_id'),
                    "storage_condition_id" => $request->input('storage_condition_id'),
                    "storage_condition" => $request->input('storage_condition'),
                    "has_atc_application" => $request->input('has_atc_application'),
                    "storage_conditionafter_opening" => $request->input('storage_conditionafter_opening'),
                    "product_category_id" => $request->input('product_category_id'),
                    "distribution_category_id" => $request->input('distribution_category_id'),
                    "product_origin_id" => $request->input('product_origin_id'),
                    "indication" => $request->input('indication'),
                    "special_category_id" => $request->input('special_category_id'),
                    "product_subcategory_id" => $request->input('product_subcategory_id'),
                    "intended_enduser_id" => $request->input('intended_enduser_id'),
                    "intended_use_id" => $request->input('intended_use_id'),
                    "route_of_administration_id" => $request->input('route_of_administration_id'),
                    "method_ofuse_id" => $request->input('method_ofuse_id'),
                    "instructions_of_use" => $request->input('instructions_of_use'),
                    'prodclass_category_id'=>$request->prodclass_category_id,
                    "warnings" => $request->input('warnings'),
                    "gmdn_code" => $request->input('gmdn_code'),
                    "gmdn_term" => $request->input('gmdn_term'),
                    "gmdn_category" => $request->input('gmdn_category'),
                    "manufacturing_date" => $request->input('manufacturing_date'),
                    "expiry_date" => $request->input('expiry_date'),
                    "device_type_id" => $request->input('device_type_id'),
                    "contraindication" => $request->input('contraindication'),
                    "obtaining_appropriate_mrls" => $request->input('obtaining_appropriate_mrls'),
                    "has_maximum_residue_limits" => $request->input('has_maximum_residue_limits'),
                    "target_species_id" => $request->input('target_species_id'),

                    "therapeutic_group" => $request->input('therapeutic_group'),
                    "therapeutic_code" => $request->input('therapeutic_code'),
            'productrisk_category_id'=>$request->productrisk_category_id,

                                    
                                    'reagents_accessories'=>$request->reagents_accessories,
                                    'has_medical_family'=>$request->has_medical_family,
                                    'has_medical_systemmodel_series'=>$request->has_medical_systemmodel_series,
                                    'has_reagents_accessories'=>$request->has_reagents_accessories,

                    "shelf_lifeafter_opening" => $request->input('shelf_lifeafter_opening'),
                    "shelf_life" => $request->input('shelf_life'),
                    "shelf_lifeafter_dilution" => $request->input('shelf_lifeafter_dilution'),

                    "section_id" => $request->input('section_id'),
                    "specific_gravity" => $request->input('specific_gravity'),
                    "flashpoint_flame_extension" => $request->input('flashpoint_flame_extension'),
                    "has_childresistant_packaging" => $request->input('has_childresistant_packaging'),
                    "formulation_type_id" => $request->input('formulation_type_id'),
                    "product_applicationarea_id" => $request->input('product_applicationarea_id'),
                    "pesticide_type_id" => $request->input('pesticide_type_id'),
                    "who_hazard_class_id" => $request->input('who_hazard_class_id'),
                    "specific_density" => $request->input('specific_density'),
                
                    
                                    'tar_content'=>$request->tar_content,
                                    'nicotine_content'=>$request->nicotine_content,
                                    'tobacco_flavour_id'=>$request->tobacco_flavour_id,
                                    'gtin_number'=>$request->gtin_number,
                                    'glocation_number'=>$request->glocation_number,
                                    'has_maximum_residue_limit'=>$request->has_maximum_residue_limit,
                                    'maximum_residue_limit'=>$request->maximum_residue_limit,
                                    'who_class_id'=>$request->who_class_id,
                                    'pestcide_id'=>$request->pestcide_id,
                                    'applied_product_id'=>$request->applied_product_id,
                                    'formulation_id'=>$request->formulation_id,
                                    'flash_flame_form'=>$request->flash_flame_form,
                                    'require_child_resistant'=>$request->require_child_resistant,
                                    'solid_product_density'=>$request->solid_product_density,
                                    'liquid_gravity'=>$request->liquid_gravity,
                                    'product_usecategory_id'=>$request->product_usecategory_id
                    );

                    return $prod_data;
    }
    
    public function saveNewProductReceivingBaseDetails(Request $request)
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
$res = 'save'; 
           
            $prod_data = $this->returnProductDataSets($request);
            if (validateIsNumeric($active_application_id)) {
                //update
                $applications_table = 'tra_product_applications';

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
                $res['active_application_code'] = $application_code;
                $res['product_id'] = $product_id;
                $res['ref_no'] = $ref_number;

            } else {

               
                    $prod_data['created_by'] = \Auth::user()->id;
                    $prod_data['created_on'] = Carbon::now();

                    $res = insertRecord('tra_product_information', $prod_data, $user_id);
                    $record_id = $res['record_id'];
                    $product_id = $res['record_id'];
                    $applications_table = 'tra_product_applications';


                    $application_code = generateApplicationCode($sub_module_id, $applications_table);
                    $application_details = DB::table('tra_product_information as t1')->leftJoin('tra_product_applications as t2', 't1.id', 't2.product_id')->where('t1.id', $record_id)->first();
                    $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                    $codes_array = $this->getProductApplicationReferenceCodes($request);
                   
                   $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                    if ($tracking_details['success'] == false) {
                        return \response()->json($tracking_details);
                    }
                    $tracking_no = $tracking_details['tracking_no'];
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
                        "tracking_no" => $tracking_no,
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

                    $res = insertRecord('tra_product_applications', $app_data, $user_id);
                    $active_application_id = $res['record_id'];

                    //add to submissions table
                    $submission_params = array(
                        'application_id' => $active_application_id,
                        'process_id' => $process_id,
                        'application_code' => $application_code,
                        "tracking_no" => $tracking_no,
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
                        'zone_id' => $zone_id,
                        'remarks' => 'Initial save of the application',
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
 
                    insertRecord('tra_submissions', $submission_params, $user_id);
                    $res['active_application_id'] = $active_application_id;
                    $res['application_code'] = $application_code;
                    $res['active_application_code'] = $application_code;
                    $res['product_id'] = $product_id;
                    $res['ref_no'] = $tracking_no;
                    //dms function 
                    $nodetracking = str_replace("/", "-", $tracking_no);
                    
                     DB::commit();

                    // //dms function 
                     $nodetracking = str_replace("/", "-", $tracking_no);
                     
                     $node_details = array(
                         'name' => $nodetracking,
                         'nodeType' => 'cm:folder');

                    //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(10,100), $user_id);

            }

        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'res'=>$res,
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

    public function uploadApplicationFile(Request $req)
    {
        $application_id = $req->input('application_id');
        $description = $req->input('description');
        $user_id = $this->user_id;
        $res = array();
        try {
            $record = DB::table('tra_product_applications')
                ->where('id', $application_id)
                ->first();
            $application_code = $record->application_code;
            $workflow_stage_id = $record->workflow_stage_id;

            if ($req->hasFile('uploaded_doc')) {
                $file = $req->file('uploaded_doc');
                $origFileName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileSize = $file->getClientSize();
                $folder = '\resources\uploads';
                $destination = getcwd() . $folder;
                $savedName = str_random(5) . time() . '.' . $extension;
                $file->move($destination, $savedName);
                $params = array(
                    'application_id' => $application_id,
                    'application_code' => $application_code,
                    'workflow_stage_id' => $workflow_stage_id,
                    'initial_filename' => $origFileName,
                    'savedname' => $savedName,
                    'filesize' => formatBytes($fileSize),
                    'filetype' => $extension,
                    'server_filepath' => $destination,
                    'server_folder' => $folder,
                    'description' => $description,
                    'created_on' => Carbon::now(),
                    'created_by' => \Auth::user()->id
                );

                $res = insertRecord('tra_product_application_uploads', $params, $user_id);
                if ($res['success'] == true) {
                    $res = array(
                        'success' => true,
                        'message' => 'File uploaded successfully!!'
                    );
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

    public function getElementCosts(Request $request)
    {
        $feeType = $request->input('fee_type');
        $costSubCat = $request->input('cost_subcategory');
        $where = array(
            't1.feetype_id' => $feeType,
            't1.sub_cat_id' => $costSubCat
        );
        try {
            $qry = DB::table('element_costs as t1')
                ->join('cost_elements as t2', 't1.element_id', 't2.id')
                ->join('cost_sub_elements as t3', 't1.sub_element_id', 't3.id')
                ->join('par_currencies as t4', 't1.currency_id', 't4.id')
                ->join('par_cost_sub_categories as t5', 't1.sub_cat_id', 't5.id')
                ->join('par_cost_categories as t6', 't5.cost_category_id', 't6.id')
                ->join('par_exchange_rates as t7', 't4.id', 't7.currency_id')
                ->select('t1.*', 't1.id as element_costs_id', 't4.id as currency_id', 't2.name as element', 't3.name as sub_element',
                    't4.name as currency', 't5.name as sub_category', 't6.name as category', 't7.exchange_rate')
                ->where($where);
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

    public function saveApplicationInvoicingDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $invoice_id = $request->input('invoice_id');
        $details = $request->input();
        $user_id = $this->user_id;
        unset($details['_token']);
        unset($details['application_id']);
        unset($details['application_code']);
        unset($details['invoice_id']);
        try {
            if (isset($invoice_id) && $invoice_id != '') {
                $invoice_no = '';
            } else {
                $invoice_no = generateInvoiceNo($user_id);
                $invoice_params = array(
                    'invoice_no' => $invoice_no,
                    'application_id' => $application_id,
                    'application_code' => $application_code
                );
                $res = insertRecord('tra_application_invoices', $invoice_params, $user_id);
                if ($res['success'] == false) {
                    return \response()->json($res);
                }
                $invoice_id = $res['record_id'];
            }
            $params = array();
            foreach ($details as $detail) {
                //check
                $element_costs_id = $detail['element_costs_id'];
                $where_check = array(
                    'invoice_id' => $invoice_id,
                    'element_costs_id' => $element_costs_id
                );
                if (DB::table('tra_invoice_details')
                        ->where($where_check)
                        ->count() < 1) {
                    $params[] = array(
                        'invoice_id' => $invoice_id,
                        'element_costs_id' => $element_costs_id,
                        'element_amount' => $detail['cost'],
                        'currency_id' => $detail['currency_id'],
                        'exchange_rate' => $detail['exchange_rate']
                    );
                }
            }
            DB::table('tra_invoice_details')->insert($params);
            $res = array(
                'success' => true,
                'invoice_id' => $invoice_id,
                'invoice_no' => $invoice_no,
                'message' => 'Invoice details saved successfully!!'
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

     public function getManagerEvaluationApplications(Request $request)
    {

        $table_name = $request->input('table_name');
        
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_classifications as t7', 't2.classification_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't2.common_name_id', '=', 't8.id')
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                 ->leftJoin('tra_submissions as t9', 't1.application_code', '=', 't9.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('par_device_types as t11', 't2.device_type_id', '=', 't11.id')
                ->leftJoin('par_product_categories as t12', 't2.product_category_id', '=', 't12.id')
                ->select('t1.*', 't11.name as device_type','t7.name as classification_name', 't10.username as submitted_by', 't9.date_received as submitted_on', 't8.name as common_name', 't2.brand_name as product_name', 't3.name as applicant_name', 't4.name as application_status',
                    't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id', DB::raw("CONCAT_WS(': ',t7.name,t12.name) as product_category"))
                    
                ->where(array('t9.current_stage'=>$workflow_stage,'isDone'=>0));
if(validateIsNumeric($section_id)){
    $qry->where('t1.section_id',$section_id);
}
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
    public function getManagerProductDataAmmendApps(Request $request)
    {

        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('par_classifications as t7', 't2.classification_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't2.common_name_id', '=', 't8.id')
                ->leftJoin('tra_submissions as t9', 't1.application_code', '=', 't9.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('par_device_types as t11', 't2.device_type_id', '=', 't11.id')
                ->select('t1.*', 't11.name as device_type', 't7.name as classification_name', 't10.username as submitted_by', 't9.date_received as submitted_on', 't8.name as common_name', 't2.brand_name as product_name', 't3.name as applicant_name', 't4.name as application_status',
                  't1.id as active_application_id')
                  
                ->where('t9.current_stage', $workflow_stage);
            if(validateIsNumeric($section_id)){
                $qry->where('t1.section_id',$section_id);
            }
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
    
    

    public function getTcMeetingParticipants(Request $request)
    {
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table('tc_meeting_participants as t1')
                ->select('t1.*')
                ->where('t1.meeting_id', $meeting_id);
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

    public function getManagerAuditingApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_classifications as t7', 't2.classification_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't2.common_name_id', '=', 't8.id')
                
                ->leftJoin('tra_submissions as t9', 't9.application_code', '=', 't1.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('tra_applications_comments as t11', function ($join) {
                    $join->on('t1.application_code', '=', 't11.application_code')
                        ->where('t11.is_current', 1)
                        ->where('t11.comment_type_id', 2);
                })
                ->leftJoin('par_evaluation_recommendations as t12', 't11.recommendation_id', '=', 't12.id')
                ->leftJoin('tra_applications_comments as t13', function ($join) {
                    $join->on('t1.application_code', '=', 't13.application_code')
                        ->where('t13.is_current', 1)
                        ->where('t13.comment_type_id', 3);
                })
                ->leftJoin('par_evaluation_recommendations as t14', 't13.recommendation_id', '=', 't14.id')
               
                ->select('t1.*', 't12.name as evaluator_recommendation', 't14.name as auditor_recommendation', 't2.brand_name as product_name', 't7.name as classification_name', 't10.username as submitted_by', 't9.date_received as submitted_on', 't8.name as common_name', 't3.name as applicant_name', 't4.name as application_status','t2.classification_id','t2.prodclass_category_id',
                    't5.decision_id', 't1.id as active_application_id')
                ->where(array('t9.current_stage'=>$workflow_stage,'isDone'=>0) );

            $results = $qry->orderBy('t9.id','desc')->get();
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

    public function getGrantingDecisionApplications(Request $request)
    {
        $table_name = $request->input('table_name');
//        $workflow_stage = $request->input('workflow_stage_id');
        $wf = DB::table("wf_workflow_stages")->where('name', '=', 'Granting Decision')->first();
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_application_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id')
                        ->on('t1.process_id', '=', 't4.process_id');
                })
                ->select('t1.*', 't2.brand_name', 't3.name as applicant_name', 't4.name as application_status')
                ->where('t1.workflow_stage_id', $wf->id);
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

    public function saveMeeting(Request $request)
    {
        try {
            $meetingId = DB::transaction(function () use ($request) {
                $meetingId = insertRecordNoTransaction('tra_product_application_meetings',
                    [
                        "title" => $request->input('title'),
                        "description" => $request->input('dezcription'),
                        "date_requested" => Carbon::parse($request->input('date_requested')),
                        "physical_address" => $request->input('physical_address')
                    ], \Auth::user()->id);
                $members = $request->input('members');
                foreach ($members as $member) {
                    insertRecordNoTransaction('tra_product_application_meeting_members',
                        [
                            "product_application_meeting_id" => $meetingId,
                            "member_name" => $member
                        ]
                        , \Auth::user()->id);
                }

                return $meetingId;

            });

            $res = array(
                'success' => true,
                'meeting_id' => $meetingId,
                'message' => 'Meeting Saved!'
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

    public function getApplicationUploadedDocs(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $workflow_stage_id = $request->input('workflow_stage_id');
        try {
            $qry = DB::table('tra_product_application_uploads as t1')
                ->leftJoin('wf_workflow_stages as t2', 't1.workflow_stage_id', '=', 't2.id')
                ->select('t1.*', 't2.name as stage_name')
                ->where('t1.application_id', $application_id);
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
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
        return response()->json($res);
    }

    public function saveSample(Request $request)
    {
        try {
            $sampleRecord = array(
                'application_id' => $request->input('application_id'),
                'brand_name' => $request->input('brand_name'),
                'batch_number' => $request->input('batch_no'),
                'expiry_date' => Carbon::parse($request->input('expiry_date')),
                'submission_date' => carbon::parse($request->input('submission_date')),
                'storage_condition_id' => $request->input('storage_condition_id'),
                'shelf_life_months' => $request->input('shelf_life'),
                'shelf_life_after_opening' => $request->input('shelf_life_after_opening')
            );
            $res = insertRecord('tra_product_samples', $sampleRecord, \Auth::user()->id);
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

    public function onRegisteredProductsSearchdetails(Request $req)
    {

        $reg_product_id = $req->input('reg_product_id');
        $tra_product_id = $req->input('tra_product_id');
        $table_name = $req->input('table_name');

        try {
            $main_qry = DB::table('tra_product_applications as t1')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->where('t2.id', $tra_product_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select('t1.*', 't2.brand_name as brand_name', 't1.product_id as tra_product_id',
                    't3.name as applicant_name', 't3.contact_person','t1.id as active_application_id','t1.application_code as active_application_code',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*');

            $results = $qry1->first();
            $results->product_id = '';
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

    

    public function prepareOnlineProductReceivingStage(Request $req)
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
                ->select('t1.*', 'q.status_type_id','q.name as application_status', 't1.id as active_application_id', 't2.brand_name as brand_name',
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
        $atc_codedetails = getSingleRecord('par_atc_codes',array('id'=>$results->atc_code_id));
        if($atc_codedetails){
            $results->atc_code = $atc_codedetails->name;
            $results->atc_code_description = $atc_codedetails->description;
        }
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

    public function prepareProductsInvoicingStage(Request $request)
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
                ->select(DB::raw("t1.applicant_id,t1.product_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,t3.isLocked,t3.paying_currency_id,t1.is_fast_track,t1.paying_currency_id as apppaying_currency_id, t3.isLocked,
                t1.section_id,t1.module_id,CONCAT_WS(',',t4.brand_name,t4.physical_description) as product_details"))
                ->where('t1.id', $application_id);

            $results = $qry->first();
            if (!$results->invoice_id) {

                $results->paying_currency_id = $results->apppaying_currency_id;

            }
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
    public function prepareNewProductReceivingStage(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_product_applications as t1')
                ->leftJoin('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('par_atc_codes as t5', 't2.atc_code_id', '=', 't5.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->leftJoin('par_countries as t8', 't3.country_id', 't8.id')
                ->select('t1.*', 't5.name as atc_code', 't5.description as atc_code_description', 't1.id as active_application_id', 't2.brand_name as brand_name',
                    't3.name as applicant_name', 't3.contact_person','t8.is_local',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*');

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
    public function prepareNewProductAmmendMentReceivingStage(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_product_applications as t1')
                ->join('tra_product_information as t2', 't1.product_id', '=', 't2.id')

                ->leftJoin('par_atc_codes as t5', 't2.atc_code_id', '=', 't5.id')
                ->join('tra_appdata_ammendementrequests as t6', 't1.application_code','t6.application_code')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->select('t1.*','t6.id as appdata_ammendementrequest_id', 't5.name as atc_code', 't5.description as atc_code_description', 't1.id as active_application_id', 't2.brand_name as brand_name',
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
    
    public function prepareProductsUniformStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');

        try {
           
            $main_qry = DB::table('tra_product_applications as t1')
                ->leftjoin('tra_product_information as t2', 't1.product_id', '=', 't2.id')
                ->leftJoin('par_atc_codes as t5', 't2.atc_code_id', '=', 't5.id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select('t1.*', 't5.name as atc_code', 't5.description as atc_code_description', 't1.id as active_application_id', 't2.brand_name as brand_name',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*',DB::raw("CONCAT_WS(',',t3.name,t3.postal_address) as applicant_details,
                    t1.section_id,t1.module_id,CONCAT_WS(',',t2.brand_name,t2.physical_description) as product_details"));

            $results = $qry1->first();

            $qry2 = clone $main_qry;
            $qry2->leftJoin('wb_trader_account as t3', 't1.local_agent_id', '=', 't3.id')
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
    public function prepareNewProductPaymentStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->leftJoin('tra_product_information as t4', 't1.product_id', '=', 't4.id')
                ->select(DB::raw("t1.applicant_id,t1.product_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                t1.section_id,t1.module_id,CONCAT_WS(',',t4.brand_name,t4.physical_description) as product_details"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $results->invoice_id);
            $res = array(
                'success' => true,
                'results' => $results,
                'balance' => formatMoney($payment_details['running_balance']),
                'invoice_amount' => formatMoney($payment_details['invoice_amount']),
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
    public function savedocumentssubmissionrecommendation(Request $req){
        try {
            $resp = "";
            $user_id = $this->user_id;
            $application_id = $req->application_id;
            $application_code = $req->application_code;
            $document_status_id = $req->document_status_id;
            $remarks = $req->remarks;
            if(isset($remarks) && $remarks != null){
            $table_name = 'tra_documentsubmission_recommendations';

            $record_id = $req->id;
            $data = array('application_code'=>$application_code,
                        'application_id'=>$application_id,
                        'document_status_id'=>$document_status_id,
                        'remarks'=>$remarks);

            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_id);

                }
            } else {
                //insert
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();
                $data['submission_date'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $user_id);
                $app_data = array('submission_date'=>Carbon::now(), 'dola'=>Carbon::now());
                
                DB::table('tra_product_applications')
                        ->where(array('application_code'=>$application_code))
                        ->update($app_data);

            }
            if ($resp['success']) {
                $res = array('success' => true,
                    'message' => 'Saved Successfully');

            } else {
                $res = array('success' => false,
                    'message' => $resp['message']);

            }
            }else{
                 $res = array('success' => false,
                    'message' =>'remarks is required');
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
    public function getdocumentssubmissionrecommendation(Request $req){
        try {
           
            $application_id = $req->application_id;
            $application_code = $req->application_code;
            $table_name = 'tra_documentsubmission_recommendations';
            $record = DB::table('tra_documentsubmission_recommendations')
                        ->where('application_code',$application_code)
                        ->first();

            $res = array('results'=>$record, 'success'=>true);
                
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
    public function onSaveProductOtherDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;
            $data = $req->all();

            $table_name = $req->table_name;
            $record_id = $req->id;
            unset($data['table_name']);
            unset($data['model']);
            unset($data['_token']);
            unset($data['manufacturer_name']);
            unset($data['manufacturing_site']);
            unset($data['id']);
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {

                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_id);

                }
            } else {
                //insert
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $user_id);

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

    public function onSaveProductinformation(Request $req)
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
            unset($data['rule_description']);
            unset($data['reg_product_id']);
            unset($data['_token']);
            //unset($data['atc_code']);
           // unset($data['atc_code_description']);
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

    public function onLoadOnlineproductIngredients(Request $req)
    {
        try {
            $product_id = $req->product_id;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_product_ingredients as t1')
                ->select('t1.*')
                ->where(array('t1.product_id' => $product_id))
                ->get();
            //loop
            $speficification_typeData = getParameterItems('par_specification_types', '', '');
            $si_unitData = getParameterItems('par_si_units', '', '');
            $ingredientsData = getParameterItems('par_ingredients_details', '', '');
            $inclusion_reasonData = getParameterItems('par_inclusions_reasons', '', '');
            $ingredientTypeData = getParameterItems('par_ingredients_types', '', '');

            foreach ($records as $rec) {
                //get the array

                $data[] = array('product_id' => $rec->product_id,
                    'id' => $rec->id,
                    'ingredient_type_id' => $rec->ingredient_type_id,
                    'ingredient_id' => $rec->ingredient_id,
                    'specification_type_id' => $rec->specification_type_id,
                    'strength' => $rec->strength,
                    'proportion' => $rec->proportion,
                    'ingredientssi_unit_id' => $rec->ingredientssi_unit_id,
                    'inclusion_reason_id' => $rec->inclusion_reason_id,
                    'ingredient_name' => returnParamFromArray($ingredientsData, $rec->ingredient_id),
                    'ingredient_type' => returnParamFromArray($ingredientTypeData, $rec->ingredient_type_id),
                    'ingredient_specification' => returnParamFromArray($speficification_typeData, $rec->specification_type_id),
                    'si_unit' => returnParamFromArray($si_unitData, $rec->ingredientssi_unit_id),
                    'reason_for_inclusion' => returnParamFromArray($inclusion_reasonData, $rec->inclusion_reason_id),
                );

            }
            $res = array('success' => true, 'results' => $data);
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

    public function onLoadOnlineproductPackagingDetails(Request $req)
    {
        try {
            $product_id = $req->product_id;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_product_packaging as t1')
            ->select(DB::raw("t1.*, CONCAT_WS('X',retail_packaging_size,retail_packaging_size1,retail_packaging_size2,retail_packaging_size3,retail_packaging_size4) as retail_packaging"))
                   
                ->where(array('t1.product_id' => $product_id))
                ->get();
            //loop container_id
            $containersData = getParameterItems('par_containers', '', '');
            $containersMaterialsData = getParameterItems('par_containers_materials', '', '');
            $containersMaterialsData = getParameterItems('par_containers_materials', '', '');
            $containersClosuresData = getParameterItems('par_closure_materials', '', '');
            $containersSealData = getParameterItems('par_seal_types', '', '');
            $containersTypesData = getParameterItems('par_containers_types', '', '');
            $packagingUnitsData = getParameterItems('par_packaging_units', '', '');

            foreach ($records as $rec) {
                //get the array

                $data[] = array('product_id' => $rec->product_id,
                    'id' => $rec->id,
                    'container_id' => $rec->container_id,
                    'container_material_id' => $rec->container_material_id,
                    'container_type_id' => $rec->container_type_id,
                    'closure_material_id' => $rec->closure_material_id,
                    'seal_type_id' => $rec->seal_type_id,
                    'retail_packaging_size' => $rec->retail_packaging_size,
                    'retail_packaging' => $rec->retail_packaging,
                    'packaging_units_id' => $rec->packaging_units_id,
                    'unit_pack' => $rec->unit_pack,
                    'container_name' => returnParamFromArray($containersData, $rec->container_id),
                    'container_material' => returnParamFromArray($containersMaterialsData, $rec->container_material_id),
                    'container_type' => returnParamFromArray($containersTypesData, $rec->container_type_id),
                    'closure_materials' => returnParamFromArray($containersClosuresData, $rec->closure_material_id),
                    'seal_type' => returnParamFromArray($containersSealData, $rec->seal_type_id),
                    'packaging_units' => returnParamFromArray($packagingUnitsData, $rec->packaging_units_id)
                );

            }
            $res = array('success' => true, 'results' => $data);
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
    function getManufacturerRoles($product_manufacturer_id,$manufacturer_roleData){
            $man_roles = '';
                $records = DB::connection('portal_db')->table('wb_product_manufacturers_roles')
                        ->where(array('product_manufacturer_id'=>$product_manufacturer_id))
                        ->get();
                    foreach($records as $rec){
                        $manufacturer_role_id = $rec->manufacturer_role_id;
                                    
                        $manufacturing_role = returnParamFromArray($manufacturer_roleData,$manufacturer_role_id);
                                    
                        $man_roles .= $manufacturing_role.';';
                    }
    return $man_roles;
        }
    public function onLoadOnlineproductManufacturer(Request $req)
    {

        try {
            $data = array();
            $product_id = $req->product_id;
            $manufacturer_type_id = $req->manufacturer_type_id;
            $records = DB::connection('portal_db')->table('wb_product_manufacturers as t1')
                ->where(array('product_id' => $product_id, 'manufacturer_type_id' => 1))
                ->get();
            foreach ($records as $rec) {
                $manufacturer_id = $rec->manufacturer_id;
                $product_manufacturer_id = $rec->id;
                $man_site_id = $rec->man_site_id;
                $manufacturer_role_id = $rec->manufacturer_role_id;
                $manufacturer_roleData = getParameterItems('par_manufacturing_roles', '', '');
                $manufacturing_role = $this->getManufacturerRoles($product_manufacturer_id,$manufacturer_roleData);

                $man_data = DB::table('par_man_sites as t1')
                    ->select('t1.*', 't1.id as manufacturer_id', 't1.name as manufacturing_site', 't5.name as manufacturer_name', 't2.name as country', 't3.name as region', 't4.name as district')
                    ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                    ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                    ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                    ->leftJoin('tra_manufacturers_information as t5', 't1.manufacturer_id', '=', 't5.id')
                    ->where(array('t5.id' => $manufacturer_id, 't1.id' => $man_site_id))
                    ->first();
                if ($man_data) {
                    $data[] = array('id' => $rec->id,
                        'manufacturer_name' => $man_data->manufacturer_name,
                        'manufacturing_site' => $man_data->manufacturing_site,
                        'country_name' => $man_data->country,
                        'region_name' => $man_data->region,
                        'product_id' => $rec->product_id,
                        'physical_address' => $man_data->physical_address,
                        'postal_address' => $man_data->postal_address,
                        'manufacturing_role' => $manufacturing_role,
                        'email_address' => $man_data->email_address
                    );
                }

            }
            $res = array(
                'success' => true,
                'results' => $data
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


    public function onLoadOnlineproductApiManufacturer(Request $req)
    {

        try {
            $data = array();
            $product_id = $req->product_id;
            $manufacturer_type_id = 2;
            $records = DB::connection('portal_db')->table('wb_product_manufacturers as t1')
                ->select('t1.*', 't2.ingredient_id')
                ->join('wb_product_ingredients as t2', 't1.active_ingredient_id', '=', 't2.id')
                ->where(array('t1.product_id' => $product_id, 'manufacturer_type_id' => $manufacturer_type_id))
                ->get();
            foreach ($records as $rec) {
                $manufacturer_id = $rec->manufacturer_id;
                $ingredient_id = $rec->ingredient_id;
                //  print_r($rec);

                $manufacturer_role_id = $rec->manufacturer_role_id;
                $manufacturer_roleData = getParameterItems('par_manufacturing_roles', '', '');
                $manufacturing_role = returnParamFromArray($manufacturer_roleData, $manufacturer_role_id);

                $ingredients_Data = getParameterItems('par_ingredients_details', '', '');
                $active_ingredient = returnParamFromArray($ingredients_Data, $ingredient_id);

                $records = DB::table('tra_manufacturers_information as t1')
                    ->select('t1.*', 't1.id as manufacturer_id', 't1.name as manufacturer_name', 't2.name as country', 't3.name as region', 't4.name as district')
                    ->leftJoin('par_countries as t2', 't1.country_id', '=', 't2.id')
                    ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                    ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                    ->where(array('t1.id' => $manufacturer_id))
                    ->first();
                if($records){
                  
                    $data[] = array('id' => $rec->id,
                            'manufacturer_name' => $records->manufacturer_name,
                            'country_name' => $records->country,
                            'region_name' => $records->region,
                            'product_id' => $rec->product_id,
                            'physical_address' => $records->physical_address,
                            'postal_address' => $records->postal_address,
                            'manufacturing_role' => $manufacturing_role,
                            'ingredient_name' => $active_ingredient,
                            'email_address' => $records->email_address
                        );

                }
               
            }
            $res = array(
                'success' => true,
                'results' => $data
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

    public function onLoadOnlinegmpInspectionApplicationsDetails(Request $req)
    {

        try {
            $data = array();
            $product_id = $req->product_id;
            $manufacturer_type_id = 2;
            $records = DB::connection('portal_db')->table('wb_product_gmpinspectiondetails as t1')
                ->select('t1.*')
                ->where(array('t1.product_id' => $product_id))
                ->get();
            foreach ($records as $rec) {

                $reg_site_id = $rec->reg_site_id;
                $gmp_productline_id = $rec->gmp_productline_id;

                $product_linedetails = $this->getGMPProductLineDetails($gmp_productline_id);
                $records = DB::table('tra_manufacturing_sites as t1')
                    ->select('t5.id as reg_manufacturer_site_id', 't7.permit_no as gmp_certificate_no', 't6.reference_no as gmp_application_reference', 't8.name as registration_status', 't7.permit_no', 't1.physical_address', 't1.email as email_address', 't1.id as manufacturer_id', 't1.name as manufacturer_name', 't2.name as country_name', 't3.name as region_name', 't4.name as district')
                    ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                    ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                    ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                    ->join('registered_manufacturing_sites as t5', 't1.id', '=', 't5.tra_site_id')
                    ->join('tra_gmp_applications as t6', 't1.id', '=', 't6.manufacturing_site_id')
                    ->join('tra_approval_recommendations as t7', 't1.permit_id', '=', 't7.id')
                    ->join('par_system_statuses as t8', 't5.status_id', '=', 't8.id')
                    ->where(array('t5.id' => $reg_site_id))
                    ->first();

                $data[] = array('id' => $rec->id,
                    'product_id' => $rec->product_id,
                    'reg_site_id' => $reg_site_id,
                    'gmp_certificate_no' => $records->gmp_certificate_no,
                    'gmp_application_reference' => $records->gmp_application_reference,
                    'permit_no' => $records->permit_no,
                    'manufacturer_name' => $records->manufacturer_name,
                    'physical_address' => $records->physical_address,
                    'email_address' => $records->email_address,
                    'manufacturer_id' => $records->manufacturer_id,
                    'country' => $records->country_name,
                    'region' => $records->region_name,
                    'district' => $records->district,
                    'product_linedetails' => $product_linedetails
                );

            }
            $res = array(
                'success' => true,
                'results' => $data
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

    function getGMPProductLineDetails($product_line_id)
    {
        $records = DB::table('gmp_productline_details as t1')
            ->select('t1.*', 't2.name as product_line', 't1.id as product_id', 't3.name as product_category')
            ->join('gmp_product_lines as t2', 't1.product_line_id', '=', 't2.id')
            ->join('gmp_product_categories as t3', 't1.category_id', '=', 't3.id')
            ->join('gmp_product_descriptions as t4', 't1.prodline_description_id', '=', 't4.id')
            ->where(array('t1.id' => $product_line_id))
            ->first();
        if ($records) {
            return $records->product_line . ' ' . $records->product_category;

        }

    }

    public function onLoadproductIngredients(Request $req)
    {

        try {
            $product_id = $req->product_id;
            $data = array();
            //get the records
            $data = DB::table('tra_product_ingredients as t1')
                ->select('t1.*', 't6.name as reason_for_inclusion', 't2.name as ingredient_specification', 't3.name as si_unit', 't4.name as ingredient_name', 't5.name as ingredient_type','t7.name as excipient_name')
                ->leftJoin('par_specification_types as t2', 't1.specification_type_id', '=', 't2.id')
                ->leftJoin('par_si_units as t3', 't1.ingredientssi_unit_id', '=', 't3.id')
                ->leftJoin('par_ingredients_details as t4', 't1.ingredient_id', '=', 't4.id')
                ->leftJoin('par_ingredients_types as t5', 't1.ingredient_type_id', '=', 't5.id')
                ->leftJoin('par_inclusions_reasons as t6', 't1.inclusion_reason_id', '=', 't6.id')
                ->leftJoin('par_excipients_details as t7', 't1.excipient_id', '=', 't7.id')
                ->where(array('t1.product_id' => $product_id))
                ->get();
            $res = array('success' => true, 'results' => $data);
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

    public function onLoadproductNutrients(Request $req)
    {
        try {
            $product_id = $req->product_id;
            $data = array();
            //get the records
            $data = DB::table('tra_product_nutrients as t1')
                ->select('t1.*', 't2.name as nutrients_category', 't3.name as nutrients', 't4.name as si_unit')
                ->leftJoin('par_nutrients_category as t2', 't1.nutrients_category_id', '=', 't2.id')
                ->leftJoin('par_nutrients as t3', 't1.nutrients_id', '=', 't3.id')
                ->leftJoin('par_si_units as t4', 't1.units_id', '=', 't4.id')
                ->where(array('t1.product_id' => $product_id))
                ->get();
            $res = array('success' => true, 'results' => $data);
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

    public function getProductActiveIngredients(Request $req)
    {

        try {
            $filters = (array)json_decode($req->filters);
            $data = array();
            //get the records
            $filters['t3.is_active_reason'] = 1;
            $data = DB::table('tra_product_ingredients as t1')
                ->select('t1.id as active_ingredient_id', 't2.name as ingredient_name')
                ->join('par_ingredients_details as t2', 't1.ingredient_id', '=', 't2.id')
                ->join('par_inclusions_reasons as t3', 't1.inclusion_reason_id', '=', 't3.id')
                ->where($filters)
                ->get();
            if (count($data) > 0) {
                $res = array('success' => true, 'results' => $data);
            } else {
                $res = array('success' => false, 'message' => 'Active Pharmaceutical Ingredient not captured.');
            }

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

    public function getGMPproductLinesDetails(Request $req)
    {

        try {
            $manufacturing_site_id = $req->manufacturing_site_id;

            $data = array();
            //get the records
            $filters['t3.is_active_reason'] = 1;
            $data = DB::table('gmp_productline_details as t1')
                ->select('t1.id as gmp_productline_id', 't2.name as gmpproduct_line')
                ->join('gmp_product_lines as t2', 't1.product_line_id', '=', 't2.id')
                ->where(array('manufacturing_site_id' => $manufacturing_site_id))
            //  ->whereIn('prodline_inspectionstatus_id',[8,10])
                ->get();
            if (count($data) > 0) {
                $res = array('success' => true, 'results' => $data);
            } else {
                $res = array('success' => false, 'message' => 'GMP Product Line Details Not Found.');
            }

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
    
    public function onLoaddrugsMaximumResidueLimitsGrid(Request $req)
    {

        try {
            //
            $product_id = $req->product_id;
            $data = array();
            //get the records
            $data = DB::table('tra_drugs_maximum_residuelimits as t1')
                ->select(DB::raw("t1.*, t2.name as target_species"))
                ->leftJoin('par_target_species as t2', 't1.target_species_id', '=', 't2.id')
                
                ->where(array('t1.product_id' => $product_id))
                ->get();

            $res = array('success' => true, 'results' => $data);

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
    public function onLoadproductPackagingDetails(Request $req)
    {

        try {
            //
            $product_id = $req->product_id;
            $data = array();
            //get the records
            $data = DB::table('tra_product_packaging as t1')
                ->select(DB::raw("t1.*, t2.name as container_type, t3.name as container_name, t4.name as container_material, t5.name as closure_materials, t4.name as container_material, t5.name as closure_material, t6.name as seal_type, t7.name as packaging_units, retail_packaging_size as retail_packaging"))
                ->leftJoin('par_containers_types as t2', 't1.container_type_id', '=', 't2.id')
                ->leftJoin('par_containers as t3', 't1.container_id', '=', 't3.id')
                ->leftJoin('par_containers_materials as t4', 't1.container_material_id', '=', 't4.id')
                ->leftJoin('par_closure_materials as t5', 't1.closure_material_id', '=', 't5.id')
                ->leftJoin('par_seal_types as t6', 't1.seal_type_id', '=', 't6.id')
                ->leftJoin('par_packaging_units as t7', 't1.packaging_units_id', '=', 't7.id')
                ->where(array('t1.product_id' => $product_id))
                ->get();

            $res = array('success' => true, 'results' => $data);

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

    public function onLoadproductManufacturer(Request $req)
    {

        try {
            $product_id = $req->product_id;
            $records = array();
            //get the records
            $records = DB::table('tra_product_manufacturers as t1')
                ->select('t1.*', 't2.email_address', 't7.name as manufacturer_name', 't1.id as manufacturer_id', 't6.name as manufacturing_role', 't2.physical_address', 't2.name as manufacturing_site', 't3.name as country_name', 't4.name as region_name', 't5.name as district_name')
                ->leftJoin('par_man_sites as t2', 't1.man_site_id', '=', 't2.id')
                ->leftJoin('par_countries as t3', 't2.country_id', '=', 't3.id')
                ->leftJoin('par_regions as t4', 't2.region_id', '=', 't4.id')
                ->leftJoin('par_districts as t5', 't2.district_id', '=', 't5.id')
                ->leftJoin('par_manufacturing_roles as t6', 't1.manufacturer_role_id', '=', 't6.id')
                ->leftJoin('tra_manufacturers_information as t7', 't1.manufacturer_id', '=', 't7.id')
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

    public function onLoadproductApiManufacturer(Request $req)
    {

        try {
            $product_id = $req->product_id;
            $records = array();
            //get the records
            $records = DB::table('tra_product_manufacturers as t1')
                ->select('t1.*', 't2.email_address', 't2.id as manufacturer_id', 't7.name as ingredient_name', 't2.physical_address', 't2.name as manufacturer_name', 't3.name as country_name', 't4.name as region_name', 't5.name as district_name')
                ->join('tra_manufacturers_information as t2', 't1.manufacturer_id', '=', 't2.id')
                ->join('par_countries as t3', 't2.country_id', '=', 't3.id')
                ->join('par_regions as t4', 't2.region_id', '=', 't4.id')
                ->leftJoin('par_districts as t5', 't2.district_id', '=', 't5.id')
                ->join('tra_product_ingredients as t6', 't1.active_ingredient_id', '=', 't6.id')
                ->join('par_ingredients_details as t7', 't6.ingredient_id', '=', 't7.id')
                ->where(array('t1.product_id' => $product_id, 'manufacturer_type_id' => 2))
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

    public function getEValuationComments(Request $req)
    {
        $application_code = $req->input('application_code');
        $table_name = 'tra_evaluations_overralcomments';
        $res = $this->getEvalAuditComments($table_name, $application_code);
        return \response()->json($res);


    }

    public function getAuditingComments(Request $req)
    {
        $application_code = $req->input('application_code');
        $table_name = 'tra_auditing_overralcomments';
        $res = $this->getEvalAuditComments($table_name, $application_code);
        return \response()->json($res);

    }

    function getEvalAuditComments($table_name, $application_code)
    {

        try {
            $records = DB::table($table_name . ' as t1')
                ->where('application_code', $application_code)
                ->join('users as t2', 't1.created_by', '=', 't2.id')
                ->select('t1.*', 't2.username as author')
                ->get();

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
        return $res;


    }

    public function getProductApplicationMoreDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $applicant_id = $request->input('applicant_id');
        $product_id = $request->input('product_id');
        try {
            $app_details = DB::table('tra_product_applications')
                ->where('id', $application_id)
                ->select('zone_id', 'product_id')->first();
            $zone_id = $app_details->zone_id;
            $product_id = $app_details->product_id;
            $qryProducts = DB::table('tra_product_information as t1')
                ->join('tra_product_applications as t2', 't1.id', '=', 't2.product_id')
                ->select('t1.id as product_id', 't2.assessment_procedure_id', 't1.*')
                ->where('t1.id', $product_id);

            $product_details = $qryProducts->first();

            $res = array(
                'success' => true,
                //  'applicant_details' => $applicantDetails,
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


    //onLoadgmpInspectionApplicationsDetails
    public function onDeleteProductOtherDetails(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = deleteRecord($table_name, $previous_data, $where, $user_id);
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

    public function onLoadManufacturersDetails(Request $request)
    {
        $filter = $request->input('filter');
        $whereClauses = array();
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'manufacturer_name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'contact_person' :
                            $whereClauses[] = "t1.contact_person like '%" . ($filter->value) . "%'";
                            break;
                        case 'email_address' :
                            $whereClauses[] = "t1.email_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'physical_address' :
                            $whereClauses[] = "t1.physical_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'country_name' :
                            $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'region_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'website' :
                            $whereClauses[] = "t1.website like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            $qry = DB::table('tra_manufacturers_information as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->select(DB::raw("t1.physical_address, t1.email_address, t1.contact_person, t1.id as manufacturer_id,
                    t1.name as manufacturer_name, t2.name as country_name, t3.name as region_name, t4.name as district,
                    t1.country_id,t1.region_id,t1.website,t1.district_id,CONCAT(t1.name,' (',t2.name,')') as manufacturer_namecountry"));
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            $records = $qry->get();
            $res = array(
                'success' => true,
                'results' => $records
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

    public function onLoadManufacturingSitesDetails(Request $request)
    {
        $manufacturer_id = $request->input('manufacturer_id');
        $whereClauses = array();

        try {
            
            $qry = DB::table('par_man_sites as t5')
                ->join('tra_manufacturers_information as t1', 't5.manufacturer_id', '=', 't1.id')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->leftJoin('par_regions as t3', 't5.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't5.district_id', '=', 't4.id')
                ->select(DB::raw("t1.physical_address, t1.email_address, t1.contact_person,t5.manufacturer_id,
                t5.name as manufacturing_site,t5.id as man_site_id, t2.name as country_name, t3.name as region_name, t4.name as district,
                t5.country_id,t5.region_id,t5.district_id,CONCAT(t1.name,' (',t2.name,')') as manufacturer_namecountry"));

            if (validateisNumeric($manufacturer_id)) {
                $qry->where('manufacturer_id', $manufacturer_id);
            }
            $records = $qry->get();
            $res = array(
                'success' => true,
                'results' => $records
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


    public function onLoadproductGmpInspectionDetailsStr(Request $req)
    {
        try {
            $product_id = $req->product_id;
            $records = array();
            //get the records
            $records = DB::table('tra_manufacturing_sites as t1')
                ->select('t9.id', 't11.name as gmp_product_line', 't12.name as gmp_product_category', 't5.id as reg_manufacturer_site_id', 't7.permit_no as gmp_certificate_no', 't6.reference_no as gmp_application_reference', 't8.name as registration_status', 't7.permit_no', 't1.physical_address', 't1.email as email_address', 't1.id as manufacturing_site_id', 't9.product_id', 't13.reg_site_id', 't1.name as manufacturer_name', 't2.name as country_name', 't3.name as region_name', 't4.name as district')
                ->leftJoin('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->leftJoin('registered_manufacturing_sites as t5', 't1.id', '=', 't5.tra_site_id')
                ->leftJoin('tra_gmp_applications as t6', 't1.id', '=', 't6.manufacturing_site_id')
                ->leftJoin('tra_approval_recommendations as t7', 't1.permit_id', '=', 't7.id')
                ->leftJoin('par_system_statuses as t8', 't5.status_id', '=', 't8.id')
                ->leftJoin('tra_product_gmpinspectiondetails as t9', 't1.id', '=', 't9.manufacturing_site_id')
                ->leftJoin('gmp_productline_details as t10', 't9.gmp_productline_id', '=', 't10.id')
                ->leftJoin('gmp_product_lines as t11', 't10.product_line_id', '=', 't11.id')
                ->leftJoin('gmp_product_categories as t12', 't10.category_id', '=', 't12.id')
                ->leftJoin('tra_gmp_applications as t13', 't13.manufacturing_site_id', '=', 't1.id')
                ->where(array('t9.product_id' => $product_id))
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

    public function onLoadgmpInspectionApplicationsDetails(Request $req)
    {
        try {
            $product_id = $req->product_id;
            //get the manufatcuring sites details 
            $section_id = getSingleRecordColValue('tra_product_applications', array('product_id' => $product_id), 'section_id');
            //manufatcuring sites 
            
            $man_sites_ids = getRecordValFromWhere('tra_product_manufacturers', array('product_id' => $product_id), 'man_site_id');
            
            // tra_product_manufacturers

            $records = DB::table('tra_manufacturing_sites as t1')
                ->select('t5.id as reg_manufacturer_site_id', 't6.reg_site_id', 't7.permit_no as gmp_certificate_no', 't6.reference_no as gmp_application_reference', 't8.name as registration_status', 't7.permit_no', 't1.id as manufacturing_site_id', 't1.physical_address', 't1.email as email_address', 't1.id as manufacturer_id', 't1.name as manufacturer_name', 't2.name as country_name', 't3.name as region_name', 't4.name as district')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->leftJoin('registered_manufacturing_sites as t5', 't1.id', '=', 't5.tra_site_id')
                ->join('tra_gmp_applications as t6', 't1.id', '=', 't6.manufacturing_site_id')
                ->join('tra_payments as t9', 't6.application_code', '=', 't9.application_code')
                ->leftJoin('tra_approval_recommendations as t7', 't6.application_code', '=', 't7.application_code')
                ->leftJoin('par_system_statuses as t8', 't5.status_id', '=', 't8.id')
                ->where(array('t6.section_id' => $section_id));


            if (is_array($man_sites_ids)) {

               // $records = $records->whereIn('man_site_id', $man_sites_ids);

            }
            $records = $records->groupBy('t6.application_code')->get();
            $res = array('success' => true,
                'results' => $records
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

    public function getProductSampleDetails(Request $req)
    {
        try {
            $product_id = $req->product_id;
            $data = array();
            $records = DB::table('tra_sample_information as t1')
                ->select('t1.*','t1.batch_no as batchno', 't6.brand_name', 't1.expiry_date as expirydate', 't1.manufacturing_date as manufacturedate', 't1.pack_unit_id', 't1.pack_size', 't1.quantity_unit_id', 't1.quantity')
                ->join('tra_product_information as t6', 't1.product_id', '=', 't6.id')
                ->where(array('product_id' => $product_id))
                ->first();

            $res = array('success' => true,
                'results' => $records
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

    public function onLoadProductsSampledetails(Request $req)
    {
        try {
            $product_id = $req->product_id;
            $data = array();
            $records = DB::table('tra_sample_information as t1')
                ->select('t1.*', 't6.brand_name')
                ->join('tra_product_information as t6', 't1.product_id', '=', 't6.id')
                ->where(array('product_id' => $product_id))
                ->get();
            foreach ($records as $rec) {
                $pack_unit = getSingleRecordColValue('packaging_units', array('id' => $rec->pack_unit_id), 'name', 'mysql');
                $quantity_unit = getSingleRecordColValue('packaging_units', array('id' => $rec->quantity_unit_id), 'name', 'mysql');
                $sample_storage = getSingleRecordColValue('storage_conditions', array('id' => $rec->storage_id), 'name', 'mysql');
                $sample_status = getSingleRecordColValue('sample_status', array('id' => $rec->sample_status_id), 'name', 'mysql');

                $data[] = array('product_id' => $rec->product_id,
                    'section_id' => $rec->section_id,
                    'batch_no' => $rec->batch_no,
                    'brand_name' => $rec->brand_name,
                    'manufacturing_date' => $rec->manufacturing_date,
                    'submission_date' => $rec->submission_date,
                    'shelf_life' => $rec->shelf_life,
                    'shelf_life_afteropening' => $rec->shelf_life_afteropening,
                    'shelflifeduration_desc' => $rec->shelflifeduration_desc,
                    'quantity' => $rec->quantity,
                    'quantity_unit_id' => $rec->quantity_unit_id,
                    'pack_size' => $rec->pack_size,
                    'pack_unit_id' => $rec->pack_unit_id,
                    'sample_status_id' => $rec->sample_status_id,
                    'storage_id' => $rec->storage_id,
                    'quantity_unit' => $quantity_unit,
                    'pack_unit' => $pack_unit,
                    'sample_status' => $sample_status,
                    'sample_storage' => $sample_storage
                );

            }

            $res = array('success' => true,
                'results' => $data
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

    public function saveProductGmpApplicationDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;
            $product_id = $req->product_id;
            $reg_site_id = $req->reg_site_id;
            $table_name = 'tra_product_gmpinspectiondetails';
            $tra_site_id = $req->tra_site_id;
            $data = array('product_id' => $product_id,
                'reg_site_id' => $reg_site_id,
                'tra_site_id' => $tra_site_id,
                'status_id' => 1);

            $where = array('reg_site_id' => $reg_site_id,
                'product_id' => $product_id);
            if (!recordExists($table_name, $where)) {
                $data['created_by'] = $user_id;
                $data['created_on'] = Carbon::now();

                $resp = insertRecord($table_name, $data, $user_id);
                $manufacturer_id = $resp['record_id'];

            } else {
                $resp = array('success' => false, 'message' => 'The Product GMP Application inspection exists');
            }

            if ($resp['success']) {

                $res = array('success' => true,
                    'message' => 'The Product GMP Application inspection Saved Successfully');

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

    public function saveManufacturerDetails(Request $req)
    {
        try {
            $resp = "";
            $user_id = $this->user_id;
            $data = $req->all();
            $physical_address = $req->physical_address;
            $manufacturer_name = $req->name;
            $table_name = $req->model;
            $record_id = $req->id;
            unset($data['table_name']);
            unset($data['model']);
            if (validateIsNumeric($record_id)) {
                $where = array('id' => $record_id);
                if (recordExists($table_name, $where)) {
                    $manufacturer_id = $record_id;
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $user_id;

                    $previous_data = getPreviousRecords($table_name, $where);

                    $resp = updateRecord($table_name, $previous_data['results'], $where, $data, $user_id);

                }
            } else {
                //insert
                //check duplicate
                $where = array('name' => $manufacturer_name,
                    'physical_address' => $physical_address);
                if (!recordExists($table_name, $where)) {
                    $data['created_by'] = $user_id;
                    $data['created_on'] = Carbon::now();

                    $resp = insertRecord($table_name, $data, $user_id);
                    $manufacturer_id = $resp['record_id'];

                } else {
                    $resp = array('success' => false, 'message' => 'The Manufacturer details exists');
                }

            }
            if ($resp['success']) {

                $res = array('success' => true,
                    'manufacturer_id' => $manufacturer_id,
                    'manufacturer_name' => $manufacturer_name,
                    'physical_address' => $physical_address,
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

    //approvals
    public function getproductregistrationAppsApproval(Request $req)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {

            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', 't1.application_code', '=', 't5.application_code')
               
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('wf_tfdaprocesses as t7', 't1.process_id', '=', 't7.id')
                ->join('wf_workflow_stages as t8', 't1.workflow_stage_id', '=', 't8.id')
                ->join('tc_recommendations as t14', 't1.application_code', '=', 't14.application_code')
                ->join('par_tcmeeting_decisions as t15', 't14.decision_id', '=', 't15.id')
                ->select('t1.*', 't1.id as active_application_id', 't3.name as applicant_name', 't4.name as application_status', 't6.name as approval_status',
                    't7.name as process_name', 't8.name as workflow_stage', 't8.is_general', 't5.id as recommendation_id', 't6.name as recommendation',
                    't15.name as tc_recomm', 't14.decision_id', 't14.id as recomm_id', 't14.comments')
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

    //
    public function getProductTcReviewMeetingApplications(Request $req)
    {
        $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');
        $meeting_id = $req->input('meeting_id');

        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->leftJoin('tc_meeting_applications as t9', 't1.application_code', '=', 't9.application_code')
                ->leftJoin('tra_evaluation_recommendations as t10', 't1.application_code', '=', 't10.application_code')
                ->leftJoin('tra_auditing_recommendations as t11', 't1.application_code', '=', 't11.application_code')
                ->leftJoin('wf_workflow_actions as t12', 't10.recommendation_id', '=', 't12.id')
                ->leftJoin('wf_workflow_actions as t13', 't11.recommendation_id', '=', 't13.id')
                ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status',
                    't9.meeting_id', 't1.id as active_application_id', 't7.brand_name', 't8.name as common_name',
                    't12.name as evaluator_recommendation', 't13.name as auditor_recommendation', 't15.name as tc_recomm', 't14.decision_id', 't14.id as recomm_id', 't14.comments')
                ->leftJoin('tc_recommendations as t14', 't1.application_code', '=', 't14.application_code')
                ->leftJoin('par_tcmeeting_decisions as t15', 't14.decision_id', '=', 't15.id')
                ->where(array( 't9.meeting_id' => $meeting_id));

                if(validateIsNumeric($workflow_stage)){
                    $qry->where(array('t1.workflow_stage_id' => $workflow_stage));
                }
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

    public function getProductApprovalApplicationsNonTc(Request $req)
    {
        $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->join('par_classifications as t14', 't7.classification_id', '=', 't14.id')
                ->leftJoin('tra_applications_comments as t10', function ($join) {
                    $join->on('t1.application_code', '=', 't10.application_code')
                        
                        ->where('t10.comment_type_id', 2);
                })
                ->leftJoin('par_evaluation_recommendations as t11', 't10.recommendation_id', '=', 't11.id')
                ->leftJoin('tra_applications_comments as t12', function ($join) {
                    $join->on('t1.application_code', '=', 't12.application_code')
                    
                        ->where('t12.comment_type_id', 3);
                })
                ->leftJoin('par_evaluation_recommendations as t13', 't12.recommendation_id', '=', 't13.id')


                ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status', 't6.name as dg_recommendation', 't5.decision_id as recommendation_id',
                    't1.id as active_application_id', 't7.brand_name', 't8.name as common_name', 't14.name as classification_name','t5.certificate_no',
                    't11.name as evaluator_recommendation', 't13.name as auditor_recommendation')
                 ->leftJoin('tra_approval_recommendations as t5', 't1.application_code', '=', 't5.application_code')
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('tra_submissions as t9', 't1.application_code','t9.application_code')
                ->where(array('t9.current_stage' => $workflow_stage, 'isDone'=>0));

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
    public function getProductAppealApprovalApplications(Request $req)
    {

        $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');

        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->join('par_classifications as t14', 't7.classification_id', '=', 't14.id')
                ->join('par_appeal_types as t10', 't1.appeal_type_id', '=', 't10.id')
                ->select('t1.*', 't3.name as applicant_name','t10.name as type_of_appeal', 't4.name as application_status', 't6.name as dg_recommendation', 't5.decision_id as recommendation_id', 't1.id as active_application_id', 't7.brand_name', 't8.name as common_name', 't14.name as classification_name')
               
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('tra_submissions as t9', 't1.application_code','t9.application_code')
                ->where(array('t9.current_stage' => $workflow_stage, 'isDone'=>0));

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
    public function getProductApprovalApplications(Request $req)
    {
        $table_name = $req->input('table_name');
        $workflow_stage = $req->input('workflow_stage_id');
        $meeting_id = $req->input('meeting_id');
        try {

            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->leftJoin('tc_meeting_applications as t9', 't1.application_code', '=', 't9.application_code')
                ->leftJoin('tra_applications_comments as t10', function ($join) {
                    $join->on('t1.application_code', '=', 't10.application_code')
                       
                        ->where('t10.comment_type_id', 2);
                })
                ->leftJoin('par_evaluation_recommendations as t11', 't10.recommendation_id', '=', 't11.id')
                ->leftJoin('tra_applications_comments as t12', function ($join) {
                    $join->on('t1.application_code', '=', 't12.application_code')
                        
                        ->where('t12.comment_type_id', 3);
                })
                ->leftJoin('par_evaluation_recommendations as t13', 't12.recommendation_id', '=', 't13.id')

                ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status', 't6.name as dg_recommendation', 't5.decision_id as recommendation_id','t5.certificate_no',
                    't9.meeting_id', 't1.id as active_application_id', 't7.brand_name', 't8.name as common_name',
                    't11.name as evaluator_recommendation', 't13.name as auditor_recommendation','reason_for_conditionalapproval','reason_for_rejection', 't15.name as tc_recomm', 't14.decision_id', 't14.id as recomm_id', 't14.comments', 't7.classification_id','t7.prodclass_category_id' )
                ->leftJoin('tc_recommendations as t14', 't1.application_code', '=', 't14.application_code')
                ->leftJoin('par_tcmeeting_decisions as t15', 't14.decision_id', '=', 't15.id')
                
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_apprejprovisional_recommendation as t16', 't16.permit_id', '=', 't5.id')
                ->leftJoin('tra_submissions as t17', 't1.application_code','t17.application_code')
                ->where(array('t17.current_stage' => $workflow_stage, 'isDone'=>0,'t9.meeting_id' => $meeting_id));
              

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

    public function getRegisteredProductsAppsDetails(Request $req)
    {
        $limit = $req->input('limit');
        $page = $req->input('page');
        $start = $req->input('start');
        $section_id = $req->input('section_id');
        $man_site_id = $req->input('man_site_id');
        
        $filter = $req->input('filter');
        
        $search_value = $req->input('search_value');
       
        $status_id = $req->input('status_id');
        $registration_status_id =explode(',',$status_id);

        $search_field = $req->input('search_field');

        $filter = $req->input('filter');
        $whereClauses = array();
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'brand_name' :
                            $whereClauses[] = "t7.brand_name like '%" . ($filter->value) . "%'";
                            break;
                        case 'common_name' :
                            $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'certificate_no' :
                            $whereClauses[] = "t11.certificate_no like '%" . ($filter->value) . "%'";
                            break;
                             case 'reference_no' :
                            $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                            break;
                        
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        } 
        
        try {
            $qry_count = DB::table('tra_product_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->join('tra_approval_recommendations as t12', 't1.application_code', '=', 't12.application_code')
                ->select('DISTINCT t7.id');
                //DB::enableQueryLog();
            $qry = DB::table('tra_product_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.local_agent_id', '=', 't9.id')
                ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
                ->leftJoin('tra_approval_recommendations as t11', 't1.application_code', '=', 't11.application_code')
                ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
                ->leftJoin('par_validity_statuses as t4', 't12.validity_status_id', '=', 't4.id')
                ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
                ->leftJoin('tra_product_manufacturers as t14', function ($join) {
                    $join->on('t7.id', '=', 't14.product_id')
                        ->on('t14.manufacturer_type_id', '=', DB::raw(1));
                })
                ->leftJoin('par_dosage_forms as t15', 't7.dosage_form_id', '=', 't15.id')
                ->select(DB::raw("DISTINCT t7.id,t7.*, t1.*, t1.id as active_application_id, t1.reg_product_id, t3.name as applicant_name, t9.name as local_agent, t4.name as application_status,
                t13.name as storage_condition, t7.brand_name, t7.id as tra_product_id, t8.name as common_name, t10.name as classification_name, t11.certificate_no, t12.expiry_date,
                t7.brand_name as sample_name,t7.physical_description as product_description, t14.manufacturer_id, t15.name as dosage_form"));
            if (validateIsNumeric($section_id)) {
                $qry->where('t7.section_id', $section_id);
            }
            if (validateIsNumeric($man_site_id)) {
              //  $qry->where('t14.man_site_id', $man_site_id);
            }
            if ($search_value != '') {
                $qry = $qry->where($search_field, 'like', '%' . $search_value . '%');
            }
            
            
            if(count($registration_status_id) >0){
               //$qry->whereIn('t12.registration_status_id', $registration_status_id);
            }
            else{
                
            }
            $qry->where('t11.appregistration_status_id', 2);
                $qry_count->where('t12.appregistration_status_id', 2);
            if($filter_string != ''){
                $qry->whereRAW($filter_string);
            }
            
        $count = $qry_count->count();


          //  $results = $qry->orderBy('t11.expiry_date','desc')->groupBy('t7.id')->skip($start)->take($limit)->get();
           
            
          
            $results = $qry->groupBy('t12.id')->get()->slice($start)->take($limit);

            $res = array(
                'success' => true,
                'results' => $results,
                'total' => $count,
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

    public function getProductRegistrationMeetingApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->leftJoin('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                })
                ->leftJoin('tra_applications_comments as t10', function ($join) {
                    $join->on('t1.application_code', '=', 't10.application_code')
                      
                        ->where('t10.comment_type_id', 2);
                })
                ->leftJoin('par_evaluation_recommendations as t11', 't10.recommendation_id', '=', 't11.id')
                ->leftJoin('tra_applications_comments as t12', function ($join) {
                    $join->on('t1.application_code', '=', 't12.application_code')
                      
                        ->where('t12.comment_type_id', 3);
                })
                ->leftJoin('par_evaluation_recommendations as t13', 't12.recommendation_id', '=', 't13.id')

                ->leftJoin('tra_submissions as t14', 't1.application_code', '=', 't14.application_code')
                ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status',
                    't9.meeting_id', 't1.id as active_application_id', 't7.brand_name', 't8.name as common_name',
                    't11.name as evaluator_recommendation','t7.classification_id','t7.prodclass_category_id', 't13.name as auditor_recommendation')
                ->where(array('t14.current_stage'=>$workflow_stage, 'isDone'=>0) );
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

    public function saveTCMeetingDetails(Request $request)
    {
        $id = $request->input('id');
        $application_code = $request->input('application_code');
        $meeting_name = $request->input('meeting_name');
        $meeting_desc = $request->input('meeting_desc');
        $date_requested = $request->input('date_requested');
        
        $meeting_time = $request->input('meeting_time');
        
        $meeting_venue = $request->input('meeting_venue');
        $meeting_type_id = $request->input('meeting_type_id');
        $meeting_invitation_details = $request->input('meeting_invitation_details');
        
        $module_id = $request->input('module_id');
        
        $sub_module_id = $request->input('sub_module_id');
        
        $section_id = $request->input('section_id');
        $selected = $request->input('selected');
        $selected_codes = json_decode($selected);
        $user_id = $this->user_id;
        try {
            $params = array(
                'meeting_name' => $meeting_name,
                'meeting_desc' => $meeting_desc,
                'meeting_time' => $meeting_time,
                'meeting_type_id' => $meeting_type_id,
                'meeting_invitation_details' => $meeting_invitation_details,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'meeting_venue' => $meeting_venue,
                'date_requested' => $date_requested
            );
            if (isset($id) && $id != '') {
                $params['altered_by'] = $user_id;
                DB::table('tc_meeting_details')
                    ->where('id', $id)
                    ->update($params);
            } else {
                $params['created_by'] = $user_id;
                $insert_res = insertRecord('tc_meeting_details', $params, $user_id);
                $id = $insert_res['record_id'];
                $app_meeting = array(
                    'application_code' => $application_code,
                    'meeting_id' => $id,
                    'created_by' => $user_id
                );
                insertRecord('tc_meeting_applications', $app_meeting, $user_id);
            }
            $params2 = array();
            foreach ($selected_codes as $selected_code) {
                $params2[] = array(
                    'meeting_id' => $id,
                    'application_code' => $selected_code,
                    'created_by' => $this->user_id
                );
            }
            DB::table('tc_meeting_applications')
                ->where('meeting_id', $id)
                ->delete();
            DB::table('tc_meeting_applications')
                ->insert($params2);

            $res = array(
                'success' => true,
                'record_id' => $id,
                'message' => 'Details saved successfully!!'
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

    public function syncTcMeetingParticipants(Request $request)
    {
        $selected = $request->input('selected');
        $meeting_id = $request->input('meeting_id');
        $selected_users = json_decode($selected);
        $where = array(
            'meeting_id' => $meeting_id
        );
        try {
            DB::transaction(function () use ($selected_users, $meeting_id, $where) {
                $params = array();
                foreach ($selected_users as $selected_user) {
                    $check = array(
                        'user_id' => $selected_user->user_id,
                        'meeting_id' => $meeting_id
                    );
                    if (DB::table('tc_meeting_participants')
                            ->where($check)->count() == 0) {
                        $params[] = array(
                            'meeting_id' => $meeting_id,
                            'user_id' => $selected_user->user_id,
                            'participant_name' => $selected_user->participant_name,
                            'phone' => $selected_user->phone,
                            'email' => $selected_user->email,
                            'created_by' => $this->user_id
                        );
                    }
                }
                DB::table('tc_meeting_participants')
                    ->insert($params);
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Participants saved successfully!!'
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

    public function prepareProductsRegMeetingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $meeting_id = $request->input('meeting_id');
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $table_name = $request->input('table_name');
        if(validateIsNumeric($module_id)){
            $table_name = getSingleRecordColValue('modules', array('id'=>$module_id), 'table_name');
        }
        
        try {
            
            if(validateIsNumeric($meeting_id)){
                $qry = DB::table('tc_meeting_details as t3')
                ->select(DB::raw("t3.*"));
                $qry->where('t3.id', $meeting_id);
            }else{
                $qry = DB::table($table_name . ' as t1')
                ->join('tc_meeting_applications as t2', function ($join) use ($application_code) {
                    $join->on('t1.application_code', '=', 't2.application_code');
                })
                ->join('tc_meeting_details as t3', 't2.meeting_id', '=', 't3.id')
                ->select(DB::raw("t3.*"));
                $qry->where('t1.id', $application_id);
            }

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

    public function saveProductRegistrationComments(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            $unsetData = $req->input('unset_data');
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }

            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $res = array();
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where)) {
                    unset($table_data['created_on']);
                    unset($table_data['created_by']);
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
            } else {
                $res = insertRecord($table_name, $table_data, $user_id);
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
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('wb_statuses_types as t6', 't4.status_type_id', '=', 't4.id')
                ->join('wb_trader_account as t5', 't1.local_agent_id', '=', 't5.id')
                ->select('t1.*', 't1.id as active_application_id', 't1.application_code', 't2.brand_name',
                    't3.name as applicant_name', 't3.contact_person', 't5.name as local_agent',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't2.*', 't4.name as application_status', 't4.status_type_id', 't4.is_manager_query')
                ->whereIn('application_status_id', array(2, 13, 14, 15,16));

            $modulesData = getParameterItems('modules', '', '');
            $subModulesData = getParameterItems('sub_modules', '', '');
            $zoneData = getParameterItems('par_zones', '', '');
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
                    'assessment_procedure_id' => $rec->assessment_procedure_id,
                    'date_added' => $rec->date_added,
                    'submission_date' => $rec->submission_date,
                    'is_manager_query' => $rec->is_manager_query,
                    'status_type_id' => $rec->status_type_id,

                    'prodclass_category_id' => $rec->prodclass_category_id,
                    'productrisk_category_id' => $rec->productrisk_category_id,
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

    public function deleteUploadedProductImages(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if (!$previous_data['success']) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            //get the path to unlink the image s
            $product_img = $previous_data[0];
            $upload_url = env('UPLOAD_DIRECTORY');
            $original_image = $upload_url . '/' . $product_img['document_folder'] . '/' . $product_img['file_name'];
            if (file_exists($original_image)) {
                $thumbnail_img = $upload_url . '/' . $product_img['document_folder'] . '/' . $product_img['thumbnail_folder'] . '/' . $product_img['file_name'];

                unlink($original_image);
                unlink($thumbnail_img);
            }

            $res = deleteRecord($table_name, $previous_data, $where, $user_id);
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

    public function onLoadOnlineproductNutrients(Request $req)
    {
        try {
            $product_id = $req->product_id;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_product_nutrients as t1')
                ->select('t1.*')
                ->where(array('t1.product_id' => $product_id))
                ->get();
            //loop
            $nutrientsCategory = getParameterItems('par_nutrients_category', '', '');
            $si_unitData = getParameterItems('par_si_units', '', '');
            $nutrientsData = getParameterItems('par_nutrients', '', '');

            foreach ($records as $rec) {
                //get the array

                $data[] = array('product_id' => $rec->product_id,
                    'id' => $rec->id,
                    'nutrients_category_id' => $rec->nutrients_category_id,
                    'nutrients_id' => $rec->nutrients_id,
                    'proportion' => $rec->proportion,
                    'units_id' => $rec->units_id,
                    'nutrients' => returnParamFromArray($nutrientsData, $rec->nutrients_id),
                    'nutrients_category' => returnParamFromArray($nutrientsCategory, $rec->nutrients_category_id),
                    'si_unit' => returnParamFromArray($si_unitData, $rec->units_id),
                );

            }
            $res = array('success' => true, 'results' => $data);
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
    public function saveOnlineProductRegistrationReceiving(Request $req){
        try { 
            $application_code = $req->application_code;
            $product_id = $req->product_id;
            $user_id = $this->user_id;
            $product_infor = array('common_name_id'=>$req->common_name_id,
                                'atc_code_id'=>$req->atc_code_id,
                                'classification_id'=>$req->classification_id,
                                'brand_name'=>$req->brand_name,
                                'device_type_id'=>$req->device_type_id,
                                'physical_description'=>$req->physical_description,
                                'dosage_form_id'=>$req->dosage_form_id,
                                'product_form_id'=>$req->product_form_id,
                                'product_strength'=>$req->product_strength,
                                'si_unit_id'=>$req->si_unit_id,
                                'storage_condition_id'=>$req->storage_condition_id,
                                'indication'=>$req->indication,
                                'product_origin_id'=>$req->product_origin_id,
                                'product_category_id'=>$req->product_category_id,
                                'prodclass_category_id'=>$req->prodclass_category_id,
                                'product_subcategory_id'=>$req->product_subcategory_id,
                                'distribution_category_id'=>$req->distribution_category_id,
                                'special_category_id'=>$req->special_category_id,
                                'intended_enduser_id'=>$req->intended_enduser_id,
                                'intended_use_id'=>$req->intended_use_id,
                                'route_of_administration_id'=>$req->route_of_administration_id,
                                'method_ofuse_id'=>$req->method_ofuse_id,
                                'section_id'=>$req->section_id,
                                'contraindication'=>$req->contraindication,
                                'gmdn_code'=>$req->gmdn_code,
                                'gmdn_category'=>$req->gmdn_category,
                                'gmdn_term'=>$req->gmdn_term,
                                'shelf_lifeafter_opening'=>$req->shelf_lifeafter_opening,
                                'shelf_life'=>$req->shelf_life,
                                'instructions_of_use'=>$req->instructions_of_use,
                                'warnings'=>$req->warnings,
                                'intended_use'=>$req->intended_use,
                                'medical_systemmodel_series'=>$req->medical_systemmodel_series,
                                'medical_family'=>$req->medical_family,
                                'shelflifeduration_desc'=>$req->shelflifeduration_desc,
                                'shelflifeafteropeningduration_desc'=>$req->shelflifeafteropeningduration_desc,
                                'reason_for_classification_id'=>$req->reason_for_classification_id,
                                'prodclass_category_id'=>$req->prodclass_category_id,
                                'productrisk_category_id'=>$req->productrisk_category_id,

                                'has_medical_systemmodel_series'=>$req->has_medical_systemmodel_series,
                                'reagents_accessories'=>$req->reagents_accessories,
                                'has_reagents_accessories'=>$req->has_reagents_accessories,
                                'has_medical_family'=>$req->has_medical_family
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


    //export
    public function ExportMeetingReport(Request $req){
        $meeting_id=$req->id;
          
//product application details
        $ExportMeetingDetails = new Spreadsheet();
        $sheet = $ExportMeetingDetails->getActiveSheet();
        $ExportMeetingDetails->getActiveSheet()->setTitle('Meeting Export');
//get all data 
       $meetingDetails=DB::table('tc_meeting_details')
                        ->select('meeting_name','meeting_desc','date_requested')
                       ->where('id',$meeting_id)
                       ->get()->toArray();
      $meetingDetails=$this->prepareArrayOfArrays((array)$meetingDetails);

        $participantDetails=DB::table('tc_meeting_participants')
                            ->where('meeting_id',$meeting_id)
                            ->select('participant_name','phone','email')
                            ->get()->toArray();
      $participantDetails=$this->prepareArrayOfArrays((array)$participantDetails);
        
       $ApplicationDetails=DB::table('tc_meeting_applications as t1')
             ->leftJoin('tra_product_applications as t4','t1.application_code','t4.application_code')
             ->leftJoin('tra_product_information as t6','t4.product_id','t6.id')
             ->leftJoin('par_common_names as t7','t6.common_name_id','t7.id')
             ->leftJoin('wb_trader_account as t8','t4.applicant_id','t8.id')
             ->leftJoin('par_system_statuses as t9','t4.application_status_id','t9.id')
             ->select(DB::raw('DISTINCT t4.reference_no,t6.brand_name,t7.name as common_name,t8.name as applicant_name,t9.name as status'))
             ->where('t1.meeting_id',$meeting_id)
             ->get()->toArray();

             //reoder to pair
             $final_Array=[];
             $array=$this->prepareArrayOfArrays((array)$ApplicationDetails);
              foreach ($array as $key => $value) {
                      foreach ($value as $key => $value2) {
                          $final_Array[]=[$key,$value2];
                      }
                      $final_Array[]=['',''];
                  }
      
      $ApplicationDetails=$final_Array;
        

        $cell=2;
//Main heading style
        $styleArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
                    'rotation' => 90,
                    'startColor' => [
                        'argb' => 'FFA0A0A0',
                    ],
                    'endColor' => [
                        'argb' => 'FFFFFFFF',
                    ],
                ]
            ];

//Sub-Main heading style
        $SubstyleArray = [
              'fill' => [
                    'type' =>  \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E5E4E2']
                ],
             'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT,
                ],
             'font'  => [
                  'bold'  =>  true
                ]
        ];

 //first heading
        $sheet->mergeCells('A1:C1')
              ->getCell('A1')
              ->setValue('Meeting Details');
        $sheet->getStyle('A1:C1')->applyFromArray($styleArray);
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);
        $sheet->getColumnDimension('C')->setAutoSize(true);
        $sheet->getStyle('B1:B17')
                 ->getNumberFormat()
                ->setFormatCode('0');
//header
        $sheet->getCell('A2')->setValue('Name');
        $sheet->getCell('B2')->setValue('Description');
        $sheet->getCell('C2')->setValue('Date Requested');
        $sheet->getStyle('A2:C2')->applyFromArray($SubstyleArray);
        $cell++;

//loop data while writting
       $sheet->fromArray( $meetingDetails, null,  "A".$cell  );
//jump one row
        $cell=count($meetingDetails)+$cell+1;


 //second heading
        $sheet->mergeCells("A".$cell.":C".$cell)
              ->getCell("A".$cell)
              ->setValue('Perticipants');
        $sheet->getStyle("A".$cell.":C".$cell)->applyFromArray($styleArray);
            $cell++;

//header
        $sheet->getCell("A".$cell)->setValue('Name');
        $sheet->getCell("B".$cell)->setValue('Phone No');
        $sheet->getCell("C".$cell)->setValue('Email');
        $sheet->getStyle("A".$cell.":C".$cell)->applyFromArray($SubstyleArray);
        $cell++;
//write array data to sheet
        $sheet->fromArray( $participantDetails, null,  "A".$cell  );

//jump one row
        $cell=count($participantDetails)+$cell+1;


//third heading
        $sheet->mergeCells("A".$cell.":C".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Details');
        $sheet->getStyle("A".$cell.":C".$cell)->applyFromArray($styleArray);
            $cell++;
           $initialcell=$cell;
//write array data to sheet
        $sheet->fromArray( $ApplicationDetails, null,  "A".$cell  );

//jump one row
        $cell=count($ApplicationDetails)+$cell+1;
$sheet->getStyle("A".$initialcell.":A".$cell)->applyFromArray($SubstyleArray);


       



          $writer = new Xlsx($ExportMeetingDetails);

            ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();


    
$response =  array(
   'name' => "meeting.Xlsx", //no extention needed
   'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
);

        return $response;

        

    }

     public function prepareArrayOfArrays(array $array){
        $clean_Array=[];

        //ensure the inner array is array not collection 
      foreach ($array as $key => $value) {
          $clean_Array[]=(array)$value;
      }
    
       return $clean_Array;

    }
    public function saveProductEditionBaseDetails(Request $req){
        $table_data = $req->all();
        $applicant_id = $req->applicant_id;
        $zone_id = $req->zone_id;
        $local_agent_id = $req->local_agent_id;
        $product_id = $req->product_id;
        $application_code = '';
        if(validateIsNumeric($product_id)){
            unset($table_data['product_id']);
            unset($table_data['application_code']);
            unset($table_data['table_name']);
            unset($table_data['tra_product_id']);
            unset($table_data['reg_product_id']);
            //update record
            $app_data = array();
            $app_data['applicant_id'] = $table_data['applicant_id'];
            $app_data['zone_id'] = $table_data['zone_id'];
            $app_data['local_agent_id'] = $table_data['local_agent_id'];
            unset($table_data['applicant_id']);
            unset($table_data['zone_id']);
            unset($table_data['local_agent_id']);
            //app table update
            $app_table_name = 'tra_product_applications';
            $app_where = array(
                'product_id' => $product_id
            );
            $user_id = $this->user_id;
            
            $prev_appdata = getPreviousRecords($app_table_name, $app_where);
            
            if ($prev_appdata['success'] == true) {
                $previous_data = $prev_appdata['results'];
                $app_res = updateRecord($app_table_name, $previous_data, $app_where, $app_data, $user_id);
                if($app_res['success']){
                   $application_code = $previous_data[0]['application_code'];
                }else{
                    return $app_res;
                }
                
            }
            //update info table
            $table_name = 'tra_product_information';
            $where = array(
                'id' => $product_id
            );
            $prev_data = getPreviousRecords($table_name, $where);
            
            if ($prev_data['success'] == true) {
                $previous_data = $prev_data['results'];
                $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                if($res['success']){
                   $res['application_code'] = $application_code;
                }
                
            }
        }else{
            $res = array(
                'success'=>false,
                'message'=>'Product not submitted, please contact administrator'
            );
        }
        return \response()->json($res);
    }
    public function getAllProductsAppsDetails( Request $req)
    {
        $limit = $req->input('limit');
        $page = $req->input('page');
        $start = $req->input('start');
        $filter = $req->input('filter');
        $section_id = $req->section_id;
        $whereClauses = array();
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'brand_name' :
                            $whereClauses[] = "t7.brand_name like '%" . ($filter->value) . "%'";
                            break;
                        case 'common_name' :
                            $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'reference_no' :
                            $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'certificate_no' :
                            $whereClauses[] = "t11.certificate_no like '%" . ($filter->value) . "%'";
                            break;
                        
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        } 
        
        try {
            $qry_count = DB::table('tra_product_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->selectRaw('DISTINCT t7.id');
                DB::enableQueryLog();
            $qry = DB::table('tra_product_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.local_agent_id', '=', 't9.id')
                ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
                ->leftJoin('tra_approval_recommendations as t11', 't1.application_code', '=', 't11.application_code')
                ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
                ->leftJoin('par_validity_statuses as t4', 't12.validity_status_id', '=', 't4.id')
                ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
                ->leftJoin('tra_product_manufacturers as t14', function ($join) {
                    $join->on('t7.id', '=', 't14.product_id')
                       ->on('t14.manufacturer_type_id', '=', DB::raw(1));
                })
                ->leftJoin('par_dosage_forms as t15', 't7.dosage_form_id', '=', 't15.id')
                ->select(DB::raw("DISTINCT t7.id,t7.*, t1.*, t1.id as active_application_id, t1.reg_product_id, t3.name as applicant_name, t9.name as local_agent,
                t13.name as storage_condition, t7.brand_name, t7.id as tra_product_id, t8.name as common_name, t10.name as classification_name, t11.certificate_no, t11.expiry_date,
                t7.brand_name as sample_name, t14.manufacturer_id, t15.name as dosage_form"));
          
            
           
            if(validateIsNumeric($section_id)){
                //$qry->where('t1.section_id', $section_id);
                 $qry_count->where('t1.section_id', $section_id);
            }
            //dd($qry_count->toSql());
            //dd($qry->toSql());
            
 if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                
                $results = $qry->orderBy('t11.expiry_date','desc')->groupBy('t7.id')->skip($start)->take($limit)->get();
                $count = $qry_count->count();
            }
            else{
                $count = 0;
                $results = array();
            }
            $results = $qry->orderBy('t11.expiry_date','desc')->groupBy('t7.id')->skip($start)->take($limit)->get();
                $count = $qry_count->count();
            $res = array(
                'success' => true,
                'results' => $results,
                'total' => $count,
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
}
