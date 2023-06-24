<?php

namespace Modules\PharmacovigilanceReporting\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PharmacovigilanceReportingController extends Controller
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

    public function saveReceivingSafetyAlertReportsDetails(Request $req)
    {
        $application_id = $req->input('application_id');
        $applicant_id = $req->input('applicant_id');
        $process_id = $req->input('process_id');
        $workflow_stage_id = $req->input('workflow_stage_id');
        $zone_id = 2;
        $section_id = $req->input('section_id');
        $module_id = $req->input('module_id');
        $sub_module_id = $req->input('sub_module_id');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            $applications_table = 'tra_pharmacovigilance_reporting';

            $where_app = array(
                'id' => $application_id
            );
            $application_params = array(
                'applicant_id' => $applicant_id,
               
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'process_id' => $process_id,
                'workflow_stage_id' => $workflow_stage_id,
                'sourceofsafety_alert_id' => $req->sourceofsafety_alert_id,
                'reporting_reference' => $req->reporting_reference,
                'reporting_period_from' => $req->reporting_period_from,
                'reporting_period_to' => $req->reporting_period_to,
                'international_birth_date' => $req->international_birth_date,
                'reported_safety_issues' => $req->reported_safety_issues,
                'origin_of_signal' => $req->origin_of_signal,
                'date_reported' => $req->date_reported,
                'report_received_date' => $req->report_received_date,
                'origin_safety_communication' => $req->origin_safety_communication,
                'is_registered_product' => $req->is_registered_product,
                'product_registration_no' => $req->product_registration_no,
                'brand_name' => $req->brand_name,
                'generic_name' => $req->generic_name,
                'dosage_form_id' => $req->dosage_form_id,
                'product_strength' => $req->product_strength,
                'marketing_authorisation_holder' => $req->marketing_authorisation_holder,  'marketing_authorisation_address' => $req->marketing_authorisation_address,  'local_technical_representative' => $req->local_technical_representative,  'manufacturer_id' => $req->manufacturer_id
                
            );
            if (isset($application_id) && $application_id != "") {//Edit
                //Application_edit
                
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $application_params['altered_by'] = $user_id;
                    $application_params['dola'] = Carbon::now();

                    $app_details = $app_details['results'];
                    $res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                    if ($res['success'] == false) {
                        return $res;
                    }
                }
                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $ref_number = $app_details[0]['reference_no'];//$app_details->reference_no;
            } else {//Create
                //Application_create
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id');
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code
                );
                $view_id = generateApplicationViewID();
                $ref_number = generatePremiseRefNumber(12, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                                   
                if (!validateIsNumeric($ref_id )) {
                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                }
                else if( $ref_number == ''){
                    return \response()->json(array('success'=>false,'tracking_no'=>$ref_number, 'message'=>$ref_number));
                }
                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                $application_params['created_by'] = $user_id;
                $application_params['created_on'] = Carbon::now();
                $application_params['view_id'] = $view_id;
                $application_params['application_code'] = $application_code;
                $application_params['tracking_no'] = $ref_number;
                $application_params['reference_no'] = $ref_number;
                $application_params['application_status_id'] = $application_status->status_id;
               
                 $res = insertRecord($applications_table, $application_params, $user_id);
                if ($res['success'] == false) {
                    DB::rollBack();
                    return \response()->json($res);
                }
                $application_id = $res['record_id'];

                //insert registration table
                $reg_params = array(
                    'tra_clinical_trial_id' => $application_id,
                    'registration_status' => 1,
                    'validity_status' => 1,
                    'created_by' => $user_id
                );

                //DMS
               // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number, $user_id);
                //add to submissions table
                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
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
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            DB::commit();
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['ref_no'] = $ref_number;
        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    public function getPharmacoVigilanceApps(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_pharmacovigilance_reporting as t1')
                ->leftJoin('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->leftJoin('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->leftJoin('sub_modules as t10', 't1.sub_module_id', '=', 't10.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,t10.name as sub_module,
                    t6.name as application_status,  t4.name as process_name, t5.name as workflow_stage, t5.is_general, 
                    t1.*,
                    CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user"));
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
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
        return \response()->json($res);
    }

    public function prepareReceivingSafetyAlertReportsStage(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $qry = DB::table('tra_pharmacovigilance_reporting as t1')

                ->select('t1.*', 't1.id as active_application_id')
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


    public function getPharmacoVigilancerRptManagerApplicationsGeneric(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $meeting_id = $request->input('meeting_id');
        $strict_mode = $request->input('strict_mode');
        try {
            $qry = DB::table('tra_pharmacovigilance_reporting as t1')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t10', 't1.application_code', '=', 't10.application_code')
                ->leftJoin('users as t8', 't10.usr_from', '=', 't8.id')
                ->leftJoin('users as t11', 't10.usr_to', '=', 't11.id');
            if (isset($strict_mode) && $strict_mode == 1) {
                $qry->join('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                });
            } else {
                $qry->leftJoin('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                });
            }
            $qry->select('t1.*', 't4.name as application_status', 't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id', DB::raw("CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t11.first_name),decrypt(t11.last_name)) as to_user"))
                ->where(array('t10.current_stage'=>$workflow_stage,'isDone'=>0));
                
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
    
    public function getSafetyAlertApplicationMoreDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $sharedQry = DB::table('tra_pharmacovigilance_reporting as t1')
                ->where('t1.id', $application_id);
            
            $appDetails = $sharedQry->first();
            
            $res = array(
                'success' => true,
                'app_details' => $appDetails,
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
    public function prepareSafetyalertreportsassessment(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table('tra_pharmacovigilance_reporting as t1')
               
                ->select(DB::raw("t1.*"))
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

}
