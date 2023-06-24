<?php

namespace Modules\ClinicalTrial\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;


class ClinicalTrialController extends Controller
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

    public function index()
    {
        return view('clinicaltrial::index');
    }

    public function saveClinicalTrialCommonData(Request $req)
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

    public function getClinicalTrialParamFromModel(Request $request)
    {
        $model_name = $request->input('model_name');
        $strict_mode = $request->input('strict_mode');
        try {
            $model = 'Modules\\ClinicalTrial\\Entities\\' . $model_name;
            if (isset($strict_mode) && $strict_mode == 1) {
                $results = $model::where('is_enabled', 1)
                    ->get()
                    ->toArray();
            } else {
                $results = $model::all()
                    ->toArray();
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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

    public function deleteClinicalTrialRecord(Request $req)
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

    public function softDeleteClinicalTrialRecord(Request $req)
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
            $res = softDeleteRecord($table_name, $previous_data, $where, $user_id);
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

    public function undoClinicalTrialSoftDeletes(Request $req)
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
            $res = undoSoftDeletes($table_name, $previous_data, $where, $user_id);
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

    public function getClinicalTrialApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_clinical_trial_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->join('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t1.*,
                    CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user"));
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($workflow_stage_id)) {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
             if (validateIsNumeric($module_id)) {
                $qry->where('t1.module_id', $module_id);
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

    public function getDismissedClinicalTrialApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $qry = DB::table('tra_dismissed_applications as t11')
                ->join('tra_clinical_trial_applications as t1', 't11.application_code', '=', 't1.application_code')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->join('par_applicationdismissal_reasons as t6', 't11.dismissal_reason_id', '=', 't6.id')
                ->join('sub_modules as t7', 't1.sub_module_id', '=', 't7.id')
                ->join('users as t8', 't11.dismissal_by', '=', 't8.id')
                ->select(DB::raw("t1.*, t3.name as applicant_name, t4.name as application_status,
                    t7.name as sub_module_name,t1.id as active_application_id,t5.name as workflow_stage,t6.name as dismissal_reason,
                    t11.dismissal_date,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as author"));
            if (validateIsNumeric($section_id)) {
                $qry->where('t11.section_id', $section_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t11.sub_module_id', $sub_module_id);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getClinicalTrialsList(Request $request)
    {
        $filter = $request->input('filter');
        $whereClauses = array();
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'reference_no' :
                            $whereClauses[] = "t2.reference_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no' :
                            $whereClauses[] = "t6.permit_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'study_title' :
                            $whereClauses[] = "t2.study_title like '%" . ($filter->value) . "%'";
                            break;
                        case 'protocol_no' :
                            $whereClauses[] = "t2.protocol_no=" . ($filter->value) . "";
                            break;
                        case 'version_no' :
                            $whereClauses[] = "t2.version_no=" . ($filter->value) . "";
                            break;
                        case 'sponsor' :
                            $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'investigator' :
                            $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
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
            $qry = DB::table('registered_clinical_trials as t1')
                ->join('tra_clinical_trial_applications as t2', 't1.tra_clinical_trial_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't2.applicant_id', '=', 't3.id')
                ->join('clinical_trial_personnel as t4', 't2.sponsor_id', '=', 't4.id')
                ->join('clinical_trial_personnel as t5', 't2.investigator_id', '=', 't5.id')
                ->join('tra_approval_recommendations as t6', 't2.permit_id', '=', 't6.id')
                ->select(DB::raw("t1.id as registered_id,t2.*,t2.id as previous_id,t6.permit_no,t3.name as applicant_name,t4.name as sponsor,t5.name as investigator,
                    t3.id as applicant_id, t3.name as applicant_name, t3.contact_person, t3.tin_no,
                    t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,
                    t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,
                    t3.telephone_no as app_telephone,t3.fax as app_fax, t3.email as app_email, t3.website as app_website"));
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
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

    public function getStudySitesList(Request $request)
    {
        $study_site_id = $request->input('study_site_id');
        $application_id = $request->input('application_id');
        $filter = $request->input('filter');
        $whereClauses = array();
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'premise_reg_no' :
                            $whereClauses[] = "t1.premise_reg_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no' :
                            $whereClauses[] = "t2.permit_no like '%" . ($filter->value) . "%'";
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
            $qry = DB::table('study_sites as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('clinical_trial_sites as t4', function ($join) use ($application_id) {
                    $join->on('t1.id', '=', 't4.study_site_id')
                        ->where('t4.application_id', '=', $application_id);
                })
                ->select('t1.*', 't2.name as country_name', 't3.name as region_name');
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (isset($study_site_id) && $study_site_id != '') {
                $qry->where('ta.id', $study_site_id);
            }
            if (isset($application_id) && $application_id != '') {
                $qry->whereNull('t4.id');
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
    

    public function saveProgressReportingBaseDetails(Request $req)
    {
        $application_id = $req->input('application_id');
        $applicant_id = $req->input('applicant_id');
        $process_id = $req->input('process_id');
        $workflow_stage_id = $req->input('workflow_stage_id');
        $zone_id = $req->input('zone_id');
        $section_id = $req->input('section_id');
        $module_id = $req->input('module_id');
        $sub_module_id = $req->input('sub_module_id');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            $applications_table = 'tra_clinicaltrial_progressreports';

            $where_app = array(
                'application_id' => $application_id
            );
            $application_params = array(
                'reporting_start_date' => $req->reporting_start_date,
                'reporting_end_date' => $req->reporting_end_date,
                'clinicalreport_type_id' => $req->clinicalreport_type_id,
                'actualstudy_date' => $req->actualstudy_date,
                'screen_participants' => $req->screen_participants,
                'dateof_first_screening' => $req->ateof_first_screening,
                'target_sample_size' => $req->target_sample_size,
                'enrolled_participants' => $req->enrolled_participants,
                'dateof_first_enrollment' => $req->dateof_first_enrollment,
                'number_of_dropouts' => $req->number_of_dropouts,
                'number_lost_tofollow_ups' => $req->number_lost_tofollow_ups,
                'inclusion_criteria' => $req->inclusion_criteria,
                'exclusion_criteria' => $req->exclusion_criteria,
                'number_of_saes' => $req->number_of_saes,
                'events_of_medialimportance' => $req->events_of_medialimportance,
                'clinicalstudy_status_id' => $req->clinicalstudy_status_id,
                'study_site_id' => $req->study_site_id
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
                    $app_details = $app_details['results'];
                    $res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                    if ($res['success'] == false) {
                        return $res;
                    }
                }
                
            } 
            else{

                $application_params['application_id'] = $application_id;
                $res = insertRecord($applications_table, $application_params, $user_id);

            }

            DB::commit();
           
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
    public function saveNewReceivingBaseDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $applicant_id = $request->input('applicant_id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $zone_id = $request->input('zone_id');
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $user_id = $this->user_id;
        $reference_no = '';
        DB::beginTransaction();
        try {
            $applications_table = 'tra_clinical_trial_applications';

            $where_app = array(
                'id' => $application_id
            );
            $application_params = array(
               
               
            );
            
            $application_params = array(
                'study_title' => $request->study_title,
                'protocol_no' => $request->protocol_no,
                'primary_endpoints' => $request->primary_endpoints,
                'secondary_endpoints' => $request->secondary_endpoints,
                'version_no' => $request->version_no,
                'date_of_protocol' => $request->date_of_protocol,
                'sponsor_id' => $request->sponsor_id,
                'applicant_id'=>$applicant_id,
                'investigator_id' => $request->investigator_id,
                'study_duration' => $request->study_duration,
                'study_start_date' => $request->study_start_date,
                'duration_desc' => $request->duration_desc,
                'clearance_no' => $request->clearance_no,
                'clinical_prodsection_id' => $request->clinical_prodsection_id,
                'phase_id' => $request->phase_id,
                'altered_by' => $user_id,
                 'clinicaltrial_registry_id' => $request->clinicaltrial_registry_id,
                'clinicaltrial_identification_no' => $request->clinicaltrial_identification_no,
                'short_study_title' => $request->short_study_title,
                'ctrethics_committee_id' => $request->ctrethics_committee_id,
                'trial_design' => $request->trial_design,
                'clinicaltrialprimary_objective' => $request->clinicaltrialprimary_objective,
                'clinicaltrialsecondary_objective' => $request->clinicaltrialsecondary_objective,
                'exclusion_criteria' => $request->exclusion_criteria,
                'inclusion_criteria' => $request->inclusion_criteria,
                'purpose_of_trial' => $request->purpose_of_trial,
                'clinicaltrial_description' => $request->clinicaltrial_description,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'zone_id' => $zone_id,
                'process_id' => $process_id,
                'workflow_stage_id' => $workflow_stage_id,
            );
            if (validateIsNumeric($application_id)) {
                
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    $res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                    if ($res['success'] == false) {
                        return $res;
                    }
                }
                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $reference_no = $app_details[0]['reference_no'];
                $tracking_no = $app_details[0]['tracking_no'];

            } else {//Create
                //Application_create
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code
                );
                $view_id = generateApplicationViewID();
               
                $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                if ($tracking_details['success'] == false) {
                    return \response()->json($tracking_details);
                }
                $tracking_no = $tracking_details['tracking_no'];

                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                $application_params['view_id'] = $view_id;
                $application_params['application_code'] = $application_code;
                $application_params['view_id'] = $view_id;
                $application_params['tracking_no'] = $tracking_no;
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

                createInitialRegistrationRecord('registered_clinical_trials', $applications_table, $reg_params, $application_id, 'reg_clinical_trial_id');
                //DMS
              //  initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number, $user_id);
                //add to submissions table
                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    'tracking_no' => $tracking_no,
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
            $res['ref_no'] = $reference_no;
            $res['tracking_no'] = $tracking_no;
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

    public function saveAmendmentReceivingBaseDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $previous_id = $request->input('previous_id');
        $applicant_id = $request->input('applicant_id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $zone_id = $request->input('zone_id');
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $user_id = $this->user_id;
        DB::beginTransaction();
        
        try {
            $applications_table = 'tra_clinical_trial_applications';

            $where_app = array(
                'id' => $application_id
            );
            if (validateIsNumeric($application_id)) {//Edit
                //Application_edit
                $application_params = array(
                    'applicant_id' => $applicant_id,
                    'zone_id' => $zone_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //$app_details = getTableData($applications_table, $where_app);
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    $res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                    if ($res['success'] == false) {
                        return $res;
                    }
                }
                $application_code = $app_details[0]['application_code'];
                $ref_number = $app_details[0]['reference_no'];
            } else {//Create
                //Application_create
                //prev details
               
                $previous_details = DB::table($applications_table)
                    ->where('id', $previous_id)
                    ->first();
                if (is_null($previous_details)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered fetching previous application details!!'
                    );
                    return \response()->json($res);
                }
                $registered_id = $previous_details->reg_clinical_trial_id;
               /* $anyOngoingApps = checkForOngoingApplications($registered_id, $applications_table, 'reg_clinical_trial_id', $process_id);
                
                if ($anyOngoingApps['exists'] == true) {
                    $res = array(
                        'success' => false,
                        'message' => 'There is an ongoing application of the same nature on the selected Application with reference number ' . $anyOngoingApps['ref_no'] .' Tracking No'. $anyOngoingApps['tracking_no']
                    );
                    return \response()->json($res);
                }
                */
                $initial_ref_no = DB::table($applications_table)
                    ->where('reg_clinical_trial_id', $registered_id)
                    ->where('sub_module_id', 10)
                    ->value('reference_no');
                $alt_counter = DB::table($applications_table)
                    ->where('reg_clinical_trial_id', $registered_id)
                    ->where('sub_module_id', 11)
                    ->count();
                $alt_count = $alt_counter + 1;
                $codes_array = array(
                    'prev_refno' => $initial_ref_no,
                    'alt_count' => $alt_count
                );
                $view_id = generateApplicationViewID();
                //$ref_number = generatePremiseRefNumber(14, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                $application_params = convertStdClassObjToArray($previous_details);
                $application_params['sub_module_id'] = $sub_module_id;
                $application_params['application_code'] = $application_code;
                $application_params['zone_id'] = $zone_id;
                $application_params['process_id'] = $process_id;
                $application_params['workflow_stage_id'] = $workflow_stage_id;
                $application_params['reference_no'] = $ref_number;
                $application_params['view_id'] = $view_id;
                $application_params['application_status_id'] = $application_status->status_id;
                $application_params['permit_id'] = null;
                unset($application_params['id']);

                $res = insertRecord($applications_table, $application_params, $user_id);
                if ($res['success'] == false) {
                    DB::rollBack();
                    return \response()->json($res);
                }
             
                  
                $application_id = $res['record_id'];
                //prev study sites
                $prev_sites = DB::table('clinical_trial_sites as t1')
                    ->select(DB::raw("t1.*,$application_id as application_id"))
                    ->where('application_id', $previous_id)
                    ->get();
                $prev_sites = convertStdClassObjToArray($prev_sites);
                $prev_sites = unsetPrimaryIDsInArray($prev_sites);
                //prev other investigators
                $prev_investigators = DB::table('clinical_trial_investigators as t1')
                    ->select(DB::raw("t1.*,$application_id as application_id"))
                    ->where('application_id', $previous_id)
                    ->get();
                $prev_investigators = convertStdClassObjToArray($prev_investigators);
                $prev_investigators = unsetPrimaryIDsInArray($prev_investigators);
                //prev Imp Products
                $prev_products = DB::table('clinical_trial_products as t2')
                    ->select(DB::raw("t2.*,$application_id as application_id"))
                    ->where('application_id', $previous_id)
                    ->get();
                $prev_products = convertStdClassObjToArray($prev_products);
                $prev_products = unsetPrimaryIDsInArray($prev_products);

                DB::table('clinical_trial_sites')->insert($prev_sites);
                DB::table('clinical_trial_investigators')->insert($prev_investigators);
                DB::table('clinical_trial_products')->insert($prev_products);
                //DMS
                initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number, $user_id);
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

   

    public function saveNewApplicationClinicalTrialOtherDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $study_duration = $request->input('study_duration');
        $duration_desc = $request->input('duration_desc');
        $clearance_no = $request->input('clearance_no');
        $user_id = $this->user_id;
        $table_name = 'tra_clinical_trial_applications';
        $where = array(
            'id' => $application_id
        );
        try {
            $params = array(
                'study_duration' => $study_duration,
                'duration_desc' => $duration_desc,
                'clearance_no' => $clearance_no,
                'altered_by' => $user_id
            );
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == false) {
                return $prev_data;
            }
            $prev_data = $prev_data['results'];
            $res = updateRecord($table_name, $prev_data, $where, $params, $user_id);
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

    public function prepareOnlineClinicalTrialPreview(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_clinical_trial_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->select('t1.*', 't1.id as active_application_id',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website', 't4.name as app_status')
                ->where('t1.id', $application_id);
            $results = $qry->first();

            $sponsorQry = DB::table('clinical_trial_personnel')
                ->where('id', $results->sponsor_id);
            $sponsorDetails = $sponsorQry->first();

            $investigatorQry = DB::table('clinical_trial_personnel')
                ->where('id', $results->investigator_id);
            $investigatorDetails = $investigatorQry->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'sponsorDetails' => $sponsorDetails,
                'investigatorDetails' => $investigatorDetails,
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
    //start gistry
     
    public function prepareOnlineClinicalTrialRegistryPreview(Request $req){
        try{
            $search_value = $req->search_value;
            $application_id = $req->application_id;
            $sub_module_id = 53;
            $return_datasets = array();
           // 'applicant_id'=>$mistrader_id,
            $data = DB::table('tra_clinical_trial_applications as t1')
                 ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->select('t1.*', 't1.id as application_id','t3.name as applicant_name', 't3.contact_person','t3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address','t3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website', 't4.name as app_status')
                        ->where(array('t1.id'=>$application_id))
                        ->first();
                $data = (array)$data;
                $data['disease_being_studied'] = $this->getClinicalTrialdiseases( $data['application_id']);
                //get the other datasets 
                $return_datasets['trial_details'] = $data;
                $return_datasets['clinicaltrial_secondaryids'] = $this->getClinicalSecondaryIds( $data['application_id']);
                $return_datasets['clinicaltrial_studydesign'] = $this->getClinicalStudyDesign( $data['application_id']);
                $return_datasets['eligibilitycriteria'] = $this->getClinicalEligibilities( $data['application_id']);
               
                $return_datasets['fundingsource'] = $this->getClinicalFundingSource( $data['application_id']);
                $return_datasets['collaborators'] = $this->getClinicalCollaborators( $data['application_id']);
    
               
                $res = array(
                    'success' => true,
                    'results' => $return_datasets,
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
   function getClinicalTrialdiseases($application_id){
       
        $disease_dta = array();
            $disease_dta = DB::table('tra_clinicaltrial_studydiseases')
            ->select('disease_being_studied')
            ->where(array('application_id'=>$application_id))
            ->get();
            
            
         $disease_dta = convertStdClassObjToArray($disease_dta);
                $disease_dta = convertAssArrayToSimpleArray($disease_dta, 'disease_being_studied');
              return $disease_dta;
           
    }function getClinicalSecondaryIds($application_id){
        $disease_dta = array();
            $data = DB::table('tra_clinicaltrial_secondaryids')->where('application_id',$application_id)
            ->select('*')
            ->first();
           return $data;
    }function getClinicalStudyDesign($application_id){
        $disease_dta = array();
            $data = DB::table('tra_clinicaltrial_studydesign')->where('application_id',$application_id)
            ->select('*')
            ->first();
            if( $data){
                $data->masking_used_id =  $this->getClinicalMaskingUsed($application_id,$data->id);
            }
           
           return $data;
    }
    function getClinicalMaskingUsed($application_id,$design_id){
        $disease_dta = array();
            $data = DB::table('tra_studydesign_maskingused')->where(array('application_id'=>$application_id,'studydesign_id'=>$design_id))
            ->select('masking_used_id')
            ->get();
            $data = convertStdClassObjToArray($data);
                $data = convertAssArrayToSimpleArray($data, 'masking_used_id');
              return $data;
    }
    function getClinicalEligibilities($application_id){
    
            $data = DB::table('tra_clinicaltrial_eligibilitycriteria')->where('application_id',$application_id)
            ->select('*')
            ->first();
            if($data){
                  $data->age_groups = $this->getClinicalAgeGroups($application_id,$data->id);
    
            }
          
           return $data;
           
    }function getClinicalFundingSource($application_id){
    
        $data = DB::table('tra_clinicaltrial_fundingsource')->where('application_id',$application_id)
        ->select('*')
        ->first();
        
       return $data;
       
    }
    function getClinicalCollaborators($application_id){
    
        $data = DB::table('tra_clinicaltrial_collaborators')->where('application_id',$application_id)
        ->select('*')
        ->first();
        
       return $data;
       
    }
    //
    
    function getClinicalAgeGroups($application_id,$eligibilitycriteria_id){
        $disease_dta = array();
            $data = DB::table('tra_eligibilitycriteria_agegroup')->where(array('application_id'=>$application_id,'eligibilitycriteria_id'=>$eligibilitycriteria_id))
            ->select('age_group_id as id')
            ->get();
            if( count($data) >0){
               foreach($data as $rec){
                    $disease_dta[] = $rec->id;
    
               }
              return $disease_dta;
            }else{
              //  return "";
            }
    }

    //end
    public function prepareOnlineClinicalTrialProgressRptPreview(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_clinical_trial_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('wb_clinicaltrial_progressreports as t5', 't1.id', '=', 't5.application_id')
                ->select('t1.*', 't1.id as active_application_id',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website', 't4.name as app_status', 't5.*')
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
    public function getClinicalTrialCompareDetails(Request $request)//kip here
    {
        $portal_application_id = $request->input('portal_application_id');
        $mis_application_id = $request->input('mis_application_id');
        try {
            $portalDetails = $this->getPortalClinicalTrialDetails($portal_application_id);
            $misDetails = $this->getMisClinicalTrialDetails($mis_application_id);
            $res = array(
                'success' => true,
                'portalResults' => $portalDetails['results'],
                'portalSponsorDetails' => $portalDetails['sponsorDetails'],
                'portalInvestigatorDetails' => $portalDetails['investigatorDetails'],
                'misResults' => $misDetails['results'],
                'misSponsorDetails' => $misDetails['sponsorDetails'],
                'misInvestigatorDetails' => $misDetails['investigatorDetails'],
                'message' => 'Details fetched successfully!!'
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

    public function getPortalClinicalTrialDetails($application_id)
    {
        $portal_db = DB::connection('portal_db');
        $qry = $portal_db->table('wb_clinical_trial_applications as t1')
            ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
            ->select('t1.*', 't1.id as active_application_id',
                't3.name as applicant_name', 't3.contact_person',
                't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website', 't4.name as app_status')
            ->where('t1.id', $application_id);
        $results = $qry->first();

        $sponsorQry = DB::table('clinical_trial_personnel')
            ->where('id', $results->sponsor_id);
        $sponsorDetails = $sponsorQry->first();

        $investigatorQry = DB::table('clinical_trial_personnel')
            ->where('id', $results->investigator_id);
        $investigatorDetails = $investigatorQry->first();

        $res = array(
            'results' => $results,
            'sponsorDetails' => $sponsorDetails,
            'investigatorDetails' => $investigatorDetails
        );
        return $res;
    }

    public function getMisClinicalTrialDetails($application_id)
    {
        $sharedQry = DB::table('tra_clinical_trial_applications as t1')
            ->where('t1.id', $application_id);

        $qry = clone $sharedQry;
        $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->select('t1.*', 't3.name as applicant_name', 't3.contact_person', 't1.applicant_id',
                't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
        $results = $qry->first();

        $sponsorQry = clone $sharedQry;
        $sponsorQry->join('clinical_trial_personnel as t2', 't1.sponsor_id', '=', 't2.id')
            ->select('t2.*');
        $sponsorDetails = $sponsorQry->first();

        $investigatorQry = clone $sharedQry;
        $investigatorQry->join('clinical_trial_personnel as t2', 't1.investigator_id', '=', 't2.id')
            ->select('t2.*');
        $investigatorDetails = $investigatorQry->first();

        $res = array(
            'results' => $results,
            'sponsorDetails' => $sponsorDetails,
            'investigatorDetails' => $investigatorDetails
        );
        return $res;
    }

   

    public function prepareNewClinicalTrialInvoicingStage(Request $request)
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
                ->select(DB::raw("t1.applicant_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                t1.section_id,t1.module_id,t1.is_fast_track,t1.paying_currency_id as app_paying_currency_id,t3.paying_currency_id,
                CONCAT(t1.study_title,'(',CONCAT_WS(',',CONCAT('Protocol No:',t1.protocol_no),CONCAT('Version No:',t1.version_no)),')') as trial_details"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            if (!validateIsNumeric($results->paying_currency_id)) {
                $results->paying_currency_id = $results->app_paying_currency_id;
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

    public function prepareNewClinicalTrialPaymentStage(Request $request)
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
                ->select(DB::raw("t1.applicant_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                t1.section_id,t1.module_id,
                CONCAT(t1.study_title,'(',CONCAT_WS(',',CONCAT('Protocol No:',t1.protocol_no),CONCAT('Version No:',t1.version_no)),')') as trial_details"))
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
    public function prepareNewClinicalTrialReceivingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $qry = DB::table('tra_clinical_trial_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->select('t1.*', 't1.id as active_application_id',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't4.id as invoice_id', 't4.invoice_no')
                ->where('t1.id', $application_id);
            $results = $qry->first();

            $sponsorQry = DB::table('tra_clinical_trial_applications as t1')
                ->join('clinical_trial_personnel as t2', 't1.sponsor_id', '=', 't2.id')
                ->select('t2.*')
                ->where('t1.id', $application_id);
            $sponsorDetails = $sponsorQry->first();

            $investigatorQry = DB::table('tra_clinical_trial_applications as t1')
                ->join('clinical_trial_personnel as t2', 't1.investigator_id', '=', 't2.id')
                ->select('t2.*')
                ->where('t1.id', $application_id);
            $investigatorDetails = $investigatorQry->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'sponsorDetails' => $sponsorDetails,
                'investigatorDetails' => $investigatorDetails,
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
    public function prepareNewClinicalTrialAssessmentStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table('tra_clinical_trial_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
              
                ->select(DB::raw("t1.*, t1.id as active_application_id,
                t3.name as applicant_name, t3.contact_person,CONCAT_WS(',',t3.name,t3.postal_address) as applicant_details,
                t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                CONCAT(t1.study_title,'(',CONCAT_WS(',',CONCAT('Protocol No:',t1.protocol_no),CONCAT('Version No:',t1.version_no)),')') as trial_details"))
                ->where('t1.id', $application_id);
            $results = $qry->first();

            $sponsorQry = DB::table('tra_clinical_trial_applications as t1')
                ->join('clinical_trial_personnel as t2', 't1.sponsor_id', '=', 't2.id')
                ->select('t2.*')
                ->where('t1.id', $application_id);
            $sponsorDetails = $sponsorQry->first();

            $investigatorQry = DB::table('tra_clinical_trial_applications as t1')
                ->join('clinical_trial_personnel as t2', 't1.investigator_id', '=', 't2.id')
                ->select('t2.*')
                ->where('t1.id', $application_id);
            $investigatorDetails = $investigatorQry->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'sponsorDetails' => $sponsorDetails,
                'investigatorDetails' => $investigatorDetails,
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
    public function prepareCtrProgressReportAssessment(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table('tra_clinical_trial_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_clinicaltrial_progressreports as t4', 't1.id', '=', 't4.application_id')
              
                ->select(DB::raw("t1.*,t4.*, t1.id as active_application_id,
                t3.name as applicant_name, t3.contact_person,CONCAT_WS(',',t3.name,t3.postal_address) as applicant_details,
                t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                CONCAT(t1.study_title,'(',CONCAT_WS(',',CONCAT('Protocol No:',t1.protocol_no),CONCAT('Version No:',t1.version_no)),')') as trial_details"))
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

    
    public function prepareNewClinicalTrialManagerMeetingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tc_meeting_applications as t2', function ($join) use ($application_code) {
                    $join->on('t1.application_code', '=', 't2.application_code');
                })
                ->join('tc_meeting_details as t3', 't2.meeting_id', '=', 't3.id')
                ->select(DB::raw("t3.*"))
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

    public function addClinicalStudySite(Request $req)
    {
        $application_id = $req->input('application_id');
        $study_site_id = $req->input('study_site_id');
        $id = $req->input('id');
        $user_id = $this->user_id;
        try {

            $params = array(
                'study_site_id' => $study_site_id,
                'application_id' => $req->application_id,
                'approving_instution' => $req->approving_instution,
                'responsible_ethics_committee' => $req->responsible_ethics_committee,
                'application_reference_no' => $req->application_reference_no,
                'approval_date' => $req->approval_date
            );
            if(validateIsNumeric($id)){
                $params['altered_by'] = $user_id;
                $params['dola'] = Carbon::now();
                $where_app = array('id'=>$id);
                $app_details = getPreviousRecords('clinical_trial_sites', $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    $res = updateRecord('clinical_trial_sites', $app_details, $where_app, $params, $user_id);

            }
            else{
                $params['created_by'] = $user_id;
                $params['created_on'] = Carbon::now();
                
                $res = insertRecord('clinical_trial_sites', $params, $user_id);
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

    public function getClinicalStudySites(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $results= array();
            if(validateIsNumeric($application_id)){
            
            $qry = DB::table('clinical_trial_sites as t1')
                ->join('study_sites as t2', 't1.study_site_id', '=', 't2.id')
                ->join('par_countries as t3', 't2.country_id', '=', 't3.id')
                ->join('par_regions as t4', 't2.region_id', '=', 't4.id')
                ->select('t2.*', 't1.id', 't1.study_site_id','t1.*', 't3.name as country_name', 't4.name as region_name')
                ->where('t1.application_id', $application_id);
            $results = $qry->get();
                
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

    public function getOnlineClinicalStudySites(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_clinical_trial_sites as t1')
                ->where('t1.application_id', $application_id);
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $site_details = getTableData('study_sites', array('id' => $result->study_site_id));
                $results[$key]->country_name = getSingleRecordColValue('par_countries', array('id' => $site_details->country_id), 'name');
                $results[$key]->region_name = getSingleRecordColValue('par_regions', array('id' => $site_details->region_id), 'name');
                $results[$key]->name = $site_details->name;
                $results[$key]->physical_address = $site_details->physical_address;
                $results[$key]->postal_address = $site_details->postal_address;
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

    public function getClinicalTrialPersonnelList(Request $request)
    {
        $application_id = $request->input('application_id');
        $personnel_type = $request->input('personnel_type');
        try {
            $qry = DB::table('clinical_trial_personnel as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->select('t1.*', 't2.name as country_name', 't3.name as region_name');
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
    
    public function getClinicalTrialMonitors(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $qry = DB::table('tra_clinical_trial_monitors as t1')
                ->join('clinical_trial_personnel as t2', 't1.monitor_id', '=', 't2.id')
                ->join('par_countries as t3', 't2.country_id', '=', 't3.id')
                ->join('par_regions as t4', 't2.region_id', '=', 't4.id')
               
                ->select('t2.*', 't1.*', 't3.name as country_name', 't4.name as region_name');
            //if (isset($application_id) && $application_id != '') {
            $qry->where('t1.application_id', $application_id);
            //}
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
    public function getClinicalTrialOtherInvestigators(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $results = array();
            if(validateIsNumeric($application_id)){
                $qry = DB::table('clinical_trial_investigators as t1')
                    ->join('clinical_trial_personnel as t2', 't1.investigator_id', '=', 't2.id')
                    ->join('par_countries as t3', 't2.country_id', '=', 't3.id')
                    ->join('par_regions as t4', 't2.region_id', '=', 't4.id')
                    ->join('clinical_investigator_cat as t5', 't1.category_id', '=', 't5.id')
                    ->leftJoin('study_sites as t6', 't1.study_site_id', '=', 't6.id')
                    ->select('t2.*', 't1.*', 't3.name as country_name', 't4.name as region_name',
                        't5.category_name as category', 't6.name as study_site');
                //if (isset($application_id) && $application_id != '') {
                $qry->where('t1.application_id', $application_id);
                //}
                $results = $qry->get();
                
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

    public function getOnlineClinicalTrialOtherInvestigators(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_clinical_trial_investigators as t1')
                ->where('t1.application_id', $application_id);
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $personnel_details = getTableData('clinical_trial_personnel', array('id' => $result->investigator_id));
                if($personnel_details ){
                    $results[$key]->name = $personnel_details->name;
                    $results[$key]->contact_person = $personnel_details->contact_person;
                    $results[$key]->tin_no = $personnel_details->tin_no;
                    $results[$key]->telephone = $personnel_details->telephone;
                    $results[$key]->physical_address = $personnel_details->physical_address;
                    $results[$key]->postal_address = $personnel_details->postal_address;
                    $results[$key]->country_name = getSingleRecordColValue('par_countries', array('id' => $personnel_details->country_id), 'name');
                    $results[$key]->region_name = getSingleRecordColValue('par_regions', array('id' => $personnel_details->region_id), 'name');
                    $results[$key]->category = getSingleRecordColValue('clinical_investigator_cat', array('id' => $result->category_id), 'category_name');
                    $results[$key]->study_site = getSingleRecordColValue('study_sites', array('id' => $result->study_site_id), 'name');

                }
           
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

    public function getOnlineClinicalTrialMonitors(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_clinical_trial_monitors as t1')
                ->where('t1.application_id', $application_id);
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $personnel_details = getTableData('clinical_trial_personnel', array('id' => $result->monitor_id));
                $results[$key]->name = $personnel_details->name;
                $results[$key]->contact_person = $personnel_details->contact_person;
                $results[$key]->tin_no = $personnel_details->tin_no;
                $results[$key]->telephone = $personnel_details->telephone;
                $results[$key]->physical_address = $personnel_details->physical_address;
                $results[$key]->postal_address = $personnel_details->postal_address;
                $results[$key]->country_name = getSingleRecordColValue('par_countries', array('id' => $personnel_details->country_id), 'name');
                $results[$key]->region_name = getSingleRecordColValue('par_regions', array('id' => $personnel_details->region_id), 'name');
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
    
    public function addApplicationOtherInvestigators(Request $request)
    {
        $application_id = $request->input('application_id');
        $category_id = $request->input('category_id');
        $study_site_id = $request->input('study_site_id');
        $investigator_id = $request->input('personnel_id');
        $user_id = $this->user_id;
        $table_name = 'clinical_trial_investigators';
        try {
            $params = array(
                'category_id' => $category_id,
                'investigator_id' => $investigator_id,
                'application_id' => $application_id,
                'study_site_id' => $study_site_id,
                'created_by' => $user_id
            );
            $where = array(
                'category_id' => $category_id,
                'investigator_id' => $investigator_id,
                'application_id' => $application_id,
                'study_site_id' => $study_site_id
            );
            if (DB::table($table_name)
                    ->where($where)
                    ->count() > 0) {
                $res = array(
                    'success' => false,
                    'message' => 'The combination has been added!!'
                );
                return \response()->json($res);
            }
            $res = insertRecord($table_name, $params, $user_id);
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

    public function getImpProducts(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $results = array();
            if(validateIsNumeric($application_id)){
                  $qry = DB::table('clinical_trial_products as t1')
                        ->leftJoin('par_investigationproduct_sections as t2', 't1.investigationproduct_section_id', '=', 't2.id')
                        ->leftJoin('par_common_names as t3', 't1.common_name_id', '=', 't3.id')
                        ->leftJoin('par_dosage_forms as t4', 't1.dosage_form_id', '=', 't4.id')
                        ->leftJoin('par_route_of_administration as t5', 't1.routes_of_admin_id', '=', 't5.id')
                        ->leftJoin('par_si_units as t6', 't1.si_unit_id', '=', 't6.id')
                        ->leftJoin('par_countries as t7', 't1.country_id', '=', 't7.id')
                        ->leftJoin('imp_sources as t8', 't1.market_location_id', '=', 't8.id')
                        ->leftJoin('par_classifications as t9', 't1.classification_id', '=', 't9.id')
                        ->select(DB::raw('t1.*,CONCAT(t1.product_strength,t6.name) as product_strength_txt,t2.name as category_name,t3.name as common_name,t4.name as dosage_form,t5.name as admin_route,t8.name as market_location,t9.name as classification_name'))
                        ->where('t1.application_id', $application_id);
                    $results = $qry->get();
                
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

    public function getOnlineImpProducts(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_clinical_trial_products as t1')
                ->where('t1.application_id', $application_id);
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->product_strength_txt = $result->product_strength . getSingleRecordColValue('par_si_units', array('id' => $result->si_unit_id), 'name');
                $results[$key]->category_name = getSingleRecordColValue('par_clinical_product_categories', array('id' => $result->product_category_id), 'category_name');
                $results[$key]->common_name = getSingleRecordColValue('par_common_names', array('id' => $result->common_name_id), 'name');
                $results[$key]->dosage_form = getSingleRecordColValue('par_dosage_forms', array('id' => $result->dosage_form_id), 'name');
                $results[$key]->admin_route = getSingleRecordColValue('par_route_of_administration', array('id' => $result->routes_of_admin_id), 'name');
                $results[$key]->market_location = getSingleRecordColValue('imp_sources', array('id' => $result->market_location_id), 'name');

                $results[$key]->classification_name = getSingleRecordColValue('par_classifications', array('id' => $result->classification_id), 'name');

                
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

    public function getImpProductIngredients(Request $request)
    {
        $product_id = $request->input('product_id');
        try {
            $qry = DB::table('impproduct_ingredients as t1')
                ->join('master_ingredients as t2', 't1.ingredient_id', '=', 't2.id')
                ->join('product_specifications as t3', 't1.specification_id', '=', 't3.id')
                ->join('par_si_units as t4', 't1.si_unit_id', '=', 't4.id')
                ->join('inclusion_reason as t5', 't1.inclusion_reason_id', '=', 't5.id')
                ->select(DB::raw("t1.*,t2.name as ingredient,t3.name as specification,t5.name as inclusion_reason,
                CONCAT(t1.strength,t4.name) as strength_txt"))
                ->where('t1.product_id', $product_id);
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

    public function getOnlineImpProductIngredients(Request $request)
    {
        $product_id = $request->input('product_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_impproduct_ingredients as t1')
                ->where('t1.product_id', $product_id);
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->ingredient = getSingleRecordColValue('master_ingredients', array('id' => $result->ingredient_id), 'name');
                $results[$key]->specification = getSingleRecordColValue('product_specifications', array('id' => $result->specification_id), 'name');;
                $results[$key]->inclusion_reason = getSingleRecordColValue('inclusion_reason', array('id' => $result->inclusion_reason_id), 'name');;
                $results[$key]->strength_txt = $result->strength . getSingleRecordColValue('si_units', array('id' => $result->si_unit_id), 'name');;
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

    public function getClinicalTrialManagerApplicationsGeneric(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $meeting_id = $request->input('meeting_id');
        $strict_mode = $request->input('strict_mode');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('clinical_trial_personnel as t7', 't1.sponsor_id', '=', 't7.id')
                ->leftJoin('clinical_trial_personnel as t8', 't1.investigator_id', '=', 't8.id')
                ->leftJoin('tra_submissions as t10', 't1.application_code', '=', 't10.application_code');
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
            $qry->select('t1.*', 't3.name as applicant_name', 't4.name as application_status',
                't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id',
                't7.name as sponsor', 't8.name as investigator')
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
    public function getstrProgressReportingManagerApplicationsGeneric(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $meeting_id = $request->input('meeting_id');
        $strict_mode = $request->input('strict_mode');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', function ($join) {
                    $join->on('t1.application_status_id', '=', 't4.id');
                })
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('clinical_trial_personnel as t7', 't1.sponsor_id', '=', 't7.id')
                ->leftJoin('clinical_trial_personnel as t8', 't1.investigator_id', '=', 't8.id')
                ->leftJoin('tra_clinicaltrial_progressreports as t9', 't1.id', '=', 't9.application_id')
                ->leftJoin('tra_evaluation_recommendations as t11', function ($join) {
                    $join->on('t1.id', '=', 't11.application_id')
                        ->on('t1.application_code', '=', 't11.application_code');
                })
                ->leftJoin('wf_workflow_actions as t12', 't11.recommendation_id', '=', 't12.id');

            $qry->select('t1.*','reporting_start_date','reporting_end_date','actualstudy_date', 't3.name as applicant_name', 't12.name as evaluation_recommendation',  't4.name as application_status',
                't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id',
                't7.name as sponsor', 't8.name as investigator')
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
    

    public function getClinicalTrialManagerMeetingApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('clinical_trial_personnel as t7', 't1.sponsor_id', '=', 't7.id')
                ->join('clinical_trial_personnel as t8', 't1.investigator_id', '=', 't8.id')
                ->leftJoin('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                })
                ->join('tra_assessment_recommendations as t10', 't1.application_code', '=', 't10.application_code')
                ->join('tra_auditing_recommendations as t11', 't1.application_code', '=', 't11.application_code')
                ->join('wf_workflow_actions as t12', 't10.recommendation_id', '=', 't12.id')
                ->join('wf_workflow_actions as t13', 't11.recommendation_id', '=', 't13.id')
                ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status',
                    't9.meeting_id', 't1.id as active_application_id', 't7.name as sponsor', 't8.name as investigator',
                    't12.name as assessment_recomm', 't13.name as audit_recomm')
                ->where('t1.workflow_stage_id', $workflow_stage)
                ->whereNotIn('t1.application_code', function ($query) use ($table_name, $workflow_stage, $meeting_id) {
                    $query->select(DB::raw('t8.application_code'))
                        ->from('tc_meeting_applications as t8')
                        ->join($table_name . ' as t9', 't8.application_code', '=', 't9.application_code')
                        ->where('t9.workflow_stage_id', $workflow_stage)
                        ->where('t8.meeting_id', '<>', $meeting_id);
                });
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

    public function getClinicalTrialRecommReviewApplications(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                })
                ->join('tra_assessment_recommendations as t10', 't1.application_code', '=', 't10.application_code')
                ->join('tra_auditing_recommendations as t11', 't1.application_code', '=', 't11.application_code')
                ->join('wf_workflow_actions as t12', 't10.recommendation_id', '=', 't12.id')
                ->join('wf_workflow_actions as t13', 't11.recommendation_id', '=', 't13.id')
                ->leftJoin('tc_recommendations as t14', 't1.application_code', '=', 't14.application_code')
                ->leftJoin('par_tcmeeting_decisions as t15', 't14.decision_id', '=', 't15.id')
                ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status',
                    't9.meeting_id', 't1.id as active_application_id', 't12.name as assessment_recomm', 't13.name as audit_recomm',
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

    public function getClinicalTrialApplicationsAtApproval(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->join('wf_tfdaprocesses as t7', 't1.process_id', '=', 't7.id')
                ->join('wf_workflow_stages as t8', 't1.workflow_stage_id', '=', 't8.id')
                ->join('tc_recommendations as t14', 't1.application_code', '=', 't14.application_code')
                ->join('par_tcmeeting_decisions as t15', 't14.decision_id', '=', 't15.id')
                ->join('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                })
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
    
     
    public function saveTCMeetingDetails(Request $request)
    {
        $id = $request->input('id');
        $application_code = $request->input('application_code');
        $meeting_name = $request->input('meeting_name');
        $meeting_desc = $request->input('meeting_desc');
        
        $meeting_venue = $request->input('meeting_venue');
        $meeting_time = $request->input('meeting_time');
        $date_requested = $request->input('date_requested');
        $selected = $request->input('selected');
        $selected_codes = json_decode($selected);
        $user_id = $this->user_id;
        try {
            $params = array(
                'meeting_name' => $meeting_name,
                'meeting_desc' => $meeting_desc,
                'meeting_venue' => $meeting_venue,
                'meeting_time' => $meeting_time,
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
                /*$app_meeting = array(
                    'application_code' => $application_code,
                    'meeting_id' => $id,
                    'created_by' => $user_id
                );
                insertRecord('tc_meeting_applications', $app_meeting, $user_id);*/
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
    }public function getTcMeetingAgendas(Request $request)
    {
        $meeting_id = $request->input('meeting_id');
        try {
            $qry = DB::table('tc_meeting_agendas as t1')
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

    

    public function getExternalAssessorDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $qry = DB::table('clinical_external_assessors')
                ->where('application_id', $application_id);
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

    public function getTcMeetingDetails(Request $request)
    {
        $application_code = $request->input('application_code');
        try {
            $qry = DB::table('tc_meeting_applications as t1')
                ->join('tc_meeting_details as t2', 't1.meeting_id', '=', 't2.id')
                ->select('t2.*')
                ->where('t1.application_code', $application_code);
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

    public function getClinicalTrialApplicationMoreDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $sharedQry = DB::table('tra_clinical_trial_applications as t1')
                ->where('t1.id', $application_id);

            $applicantQry = clone $sharedQry;
            $applicantQry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select('t3.name as applicant_name', 't3.contact_person', 't1.applicant_id',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            $applicantDetails = $applicantQry->first();

            $appQry = clone $sharedQry;
            $appDetails = $appQry->first();

            $sponsorQry = clone $sharedQry;
            $sponsorQry->join('clinical_trial_personnel as t2', 't1.sponsor_id', '=', 't2.id')
                ->select('t2.*');
            $sponsorDetails = $sponsorQry->first();

            $investigatorQry = clone $sharedQry;
            $investigatorQry->join('clinical_trial_personnel as t2', 't1.investigator_id', '=', 't2.id')
                ->select('t2.*');
            $investigatorDetails = $investigatorQry->first();

            $res = array(
                'success' => true,
                'app_details' => $appDetails,
                'applicant_details' => $applicantDetails,
                'sponsor_details' => $sponsorDetails,
                'investigator_details' => $investigatorDetails,
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

    public function getOnlineApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_clinical_trial_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->select('t1.*', 't1.id as active_application_id', 't1.application_code',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't4.status_type_id', 't4.name as application_status', 't4.is_manager_query')
                ->whereIn('application_status_id', array(2, 13, 15, 17));
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            $results = $qry->get();
            $subModulesData = getParameterItems('sub_modules', '', '');
            foreach ($results as $key => $result) {
                $results[$key]->sub_module_name = returnParamFromArray($subModulesData, $result->sub_module_id);
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
    function getGCPInspectionScheduleingDetails($req,$where,$table_name){

        try {
            $workflow_stage = $req->input('workflow_stage_id');
            $inspection_id = $req->input('inspection_id');
           
            $qry = DB::table($table_name . ' as t1')
                        ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                        ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                        ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                            $join->on('t1.id', '=', 't5.application_id')
                                ->on('t1.application_code', '=', 't5.application_code');
                        })
                        ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                        ->leftJoin('tra_ctrgcp_inspection_appdetails as t7', function ($join) use ($inspection_id) {
                            $join->on('t1.application_code', '=', 't7.application_code');
                        })
                        ->leftJoin('par_inspection_types as t14', 't7.inspection_type_id', '=', 't14.id')
                        ->leftJoin('par_gcpinspection_recommendations  as t15', 't7.recommendation_id', '=', 't15.id')                        
                        ->leftJoin('tra_premiseinspection_inspectors as t16', 't7.id', '=', 't16.inspection_id')
                                              
                        ->leftJoin('par_gmpapproval_decisions as t17', 't7.approval_recommendation_id', '=', 't17.id')
                        ->select(DB::raw(" DISTINCT t1.*, t3.name as applicant_name, t4.name as application_status,t7.actual_start_date,t7.actual_end_date,
                        t7.id as app_inspection_id, t7.inspection_id,t7.recommendation_id,t14.name as inspection_type,t15.name as inspection_recommendation,  t6.name as approval_status, t5.decision_id, t1.id as active_application_id, t7.approval_recommendation_id, t17.name as approval_recommendation,(SELECT group_concat(concat(`p`.`name`) separator ',') FROM tra_ctrgcp_inspectedsites q INNER JOIN clinical_trial_sites s ON q.study_site_id = s.id  left JOIN study_sites p ON s.study_site_id = p.id WHERE q.application_code = t1.application_code) as study_sites "))
                        ->where($where);

                        $results = $qry->get();
                        $res = array(
                            'success' => true,
                            'results' => $results,
                            'message' => 'All is well'
                        );
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
       return $res;
    }
    public function getClinicalTrialCtrgcpInspectionDetails(Request $req){
        $table_name = 'tra_clinical_trial_applications';
        $workflow_stage = $req->input('workflow_stage_id');
        $inspection_id = $req->input('inspection_id');
        $user_id = $this->user_id;
      
            $where = array('t7.inspection_id'=>$inspection_id,'t1.workflow_stage_id'=>$workflow_stage);
          $res=  $this->getGCPInspectionScheduleingDetails($req,$where,$table_name);
            return \response()->json($res);


    }
    public function getClinicalTrialCtrgcpInspectionscheduleDetails(Request $req){
        $table_name = 'tra_clinical_trial_applications';
        $workflow_stage = $req->input('workflow_stage_id');
        $inspection_id = $req->input('inspection_id');
        $where = array('t7.inspection_id'=>$inspection_id,'t1.workflow_stage_id'=>$workflow_stage);
          
       $res = $this->getGCPInspectionScheduleingDetails($req,$where,$table_name);
       return \response()->json($res);

    }
    public function saveGcpClinicalApplicationdetails(Request $request){

            try{
                DB::beginTransaction();
        
                $applications_table = 'tra_clinical_trial_applications';
                $user_id = $this->user_id;
                    $reg_clinical_trial_id = $request->reg_clinical_trial_id;
                    $sub_module_id = $request->sub_module_id;
                    $process_id = $request->process_id;
                    $workflow_stage_id = $request->workflow_stage_id;

                    $module_id = $request->module_id;
                    $id = $request->id;
                    $application_code = $request->application_code;
                    $study_sites_id = $request->study_sites_id;
                    $inspection_id = $request->inspection_id;
                   
                
                    //confirm the 
                    if(!validateIsNumeric($id)){
                            $record = DB::table($applications_table)->select('*')
                                                ->where(array('application_code'=>$application_code))
                                                ->first();
                            if($record){
                                $previous_details = $record;
                                $application_params = convertStdClassObjToArray($record);
                                $previous_id = $record->id;
                                $zone_id = $record->zone_id;
                                $module_id = $record->module_id;
                                
                                $applicant_id = $record->applicant_id;
                                $section_id = $record->section_id;

                                $initial_ref_no = DB::table($applications_table)
                                    ->where('reg_clinical_trial_id', $record->reg_clinical_trial_id)
                                    ->where('sub_module_id', 10)
                                    ->value('reference_no');
                                $alt_counter = DB::table($applications_table)
                                    ->where('reg_clinical_trial_id', $reg_clinical_trial_id)
                                    ->where('sub_module_id', $sub_module_id)
                                    ->count();
                                $alt_count = $alt_counter + 1;
                                $codes_array = array(
                                    'prev_refno' => $initial_ref_no,
                                    'alt_count' => $alt_count
                                ); 
                                $view_id = generateApplicationViewID();
                                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                                
                                $ref_number = generatePremiseRefNumber(14, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                               
                                $application_params = convertStdClassObjToArray($previous_details);
                                $application_params['sub_module_id'] = $sub_module_id;
                                $application_params['application_code'] = $application_code;
                                $application_params['zone_id'] = $zone_id;
                                $application_params['process_id'] = $process_id;
                                $application_params['workflow_stage_id'] = $workflow_stage_id;
                                $application_params['reference_no'] = $ref_number;
                                $application_params['view_id'] = $view_id;
                                $application_params['application_status_id'] = $application_status->status_id;
                                initializeApplicationDMS($record->section_id, $record->module_id, $sub_module_id, $application_code, $ref_number, $user_id);
                                $application_params['permit_id'] = null;
                                unset($application_params['id']);
                
                                $res = insertRecord($applications_table, $application_params, $user_id);
                                
                                if ($res['success'] == false) {
                                    DB::rollBack();
                                    return \response()->json($res);
                                }
                               
                                $application_id = $res['record_id'];
                                //prev study sites
                                $prev_sites = DB::table('clinical_trial_sites as t1')
                                    ->select(DB::raw("t1.*,$application_id as application_id"))
                                    ->where('application_id', $previous_id)
                                    ->get();
                                $prev_sites = convertStdClassObjToArray($prev_sites);
                                $prev_sites = unsetPrimaryIDsInArray($prev_sites);
                                //prev other investigators
                                $prev_investigators = DB::table('clinical_trial_investigators as t1')
                                    ->select(DB::raw("t1.*,$application_id as application_id"))
                                    ->where('application_id', $previous_id)
                                    ->get();

                                $prev_investigators = convertStdClassObjToArray($prev_investigators);
                                $prev_investigators = unsetPrimaryIDsInArray($prev_investigators);
                                //prev Imp Products
                                $prev_products = DB::table('clinical_trial_products as t2')
                                    ->select(DB::raw("t2.*,$application_id as application_id"))
                                    ->where('application_id', $previous_id)
                                    ->get();
                                
                                $prev_products = convertStdClassObjToArray($prev_products);
                                $prev_products = unsetPrimaryIDsInArray($prev_products);
                                DB::table('clinical_trial_sites')->insert($prev_sites);
                                DB::table('clinical_trial_investigators')->insert($prev_investigators);
                                DB::table('clinical_trial_products')->insert($prev_products);

                                //save the inspection detals message
                                //tra_ctrgcp_inspection_appdetails

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
                                            //save inspection details 
                                $app_inspectiodetails = array('inspection_id'=>$inspection_id, 
                                                        'application_code'=>$application_code, 
                                                        'created_on' => Carbon::now(),
                                                        'created_by' => $user_id
                                            );
                                 insertRecord('tra_ctrgcp_inspection_appdetails', $app_inspectiodetails, $user_id);
                                
                            }

                    }
                    //save the gcp details 
                    $study_sites_id = json_decode($study_sites_id);

                    if (count($study_sites_id) > 0) {
                        $params = array();
                        foreach ($study_sites_id as $study_site_id) {
                           $where = array(
                                'application_code' => $application_code,
                                'study_site_id' => $study_site_id,
                                'inspection_id'=>$inspection_id
                            );
                            $check = DB::table('tra_ctrgcp_inspectedsites')
                                    ->where($where)
                                    ->first();
                            if(!$check){
                                $params[] = array(
                                    'application_code' => $application_code,
                                    'study_site_id' => $study_site_id,
                                    'inspection_id'=>$inspection_id,
                                    'created_on' => Carbon::now(),
                                    'created_by' => \Auth::user()->id
                                );
                            }
                        }
                        DB::table('tra_ctrgcp_inspectedsites')
                            ->insert($params);

                    }
                    
            DB::commit();
            }catch (\Exception $exception) {
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
    public function prepareClinicalTrialGCPInspectionStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tra_ctrgcp_inspection_appdetails as t2', 't1.application_code', '=', 't2.application_code')
                ->join('tra_gcp_inspection_details as t3', 't2.inspection_id', '=', 't3.id')
                ->select(DB::raw("t3.*"))
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
    }public function saveGcpScheduleInspectionDetails(Request $request){
        
        $id = $request->input('id');
        $start_date = $request->input('start_date');
        $end_date = $request->input('end_date');
        $inspection_type = $request->input('inspection_type_id');
        $inspection_desc = $request->input('description');
        $table_name = 'tra_gcp_inspection_details';
        $user_id = $this->user_id;
        try {
            $params = array(
                'start_date' => $start_date,
                'end_date' => $end_date,
                'inspection_type_id' => $inspection_type,
                'description' => $inspection_desc
            );
            if (isset($id) && $id != '') {
                $params['altered_by'] = $user_id;
                DB::table($table_name)
                    ->where('id', $id)
                    ->update($params);
            } else {
                $params['created_by'] = $user_id;
                $insert_res = insertRecord($table_name, $params, $user_id);
                $id = $insert_res['record_id'];
            }
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
    public function getGCPInspectionRecommendationDetails(Request $request)
    {
        $table_name = 'tra_ctrgcp_inspection_appdetails';
        $app_inspection_id = $request->input('app_inspection_id');
        $application_code = $request->input('application_code');
        try {
            $qry = DB::table($table_name . ' as t1')->select('t1.*','t1.id as record_id')
                ->where(array('inspection_id'=>$app_inspection_id,'application_code'=>$application_code));

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
    //
    public function saveGcpInspectionApproval(Request $request){
        try {
            $application_id = $request->application_id;
            $apptable_name = $request->model;

            $record_id = $request->input('record_id');

            $approval_recommendation_id = $request->input('approval_recommendation_id');
            $approval_remarks = $request->input('approval_remarks');

            $table_name = 'tra_ctrgcp_inspection_appdetails';

            $record = DB::table($apptable_name.' as t1')
                    ->join('tra_ctrgcp_inspection_appdetails as t2', 't1.application_code','t2.application_code')
                    ->select('*')
                    ->where(array('t2.id'=>$record_id))
                    ->first();

            if($record){
                $application_code = $record->application_code;
                $inspection_id = $record->inspection_id;
                $where = array(
                    'id' => $record_id
                );
                $params = array(
                    'approval_remarks'=>$approval_remarks,
                    'approval_recommendation_id'=>$approval_recommendation_id
                );
                DB::table($table_name)
                    ->where($where)
                    ->update($params);

                $res = array(
                    'success' => true,
                    'message' => 'Details saved successfully!!'
                );

            }else{
                $res = array(
                    'success' => false,
                    'message' => 'Details not saved successfully!!'
                );
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
    public function saveGcpInspectionRecommendation(Request $request)
    {
        try {
            $application_id = $request->application_id;
            $apptable_name = $request->model;

            $record_id = $request->input('record_id');
            $study_sites_id = $request->input('study_sites_id');

            $table_name = 'tra_ctrgcp_inspection_appdetails';

            $record = DB::table($apptable_name.' as t1')
                    ->join('tra_ctrgcp_inspection_appdetails as t2', 't1.application_code','t2.application_code')
                    ->select('*')
                    ->where(array('t2.id'=>$record_id))
                    ->first();

            if($record){
                $application_code = $record->application_code;
                $inspection_id = $record->inspection_id;
                $where = array(
                    'id' => $record_id
                );
                $params = array(
                    'application_code' => $application_code,
                    'study_status_id' => $request->input('study_status_id'),
                    'target_sample_size' => $request->input('target_sample_size'),
                    'enrolled_participants' => $request->input('enrolled_participants'),
                    'actual_start_date' => $request->input('actual_start_date'),
                    'actual_end_date' => $request->input('actual_end_date'),
                    'recommendation_id' => $request->input('recommendation_id'),
                    'inspection_type_id' => $request->input('inspection_type_id'),

                    
                    'phase_id' => $request->input('phase_id'),
                    'investigation_product_id' => $request->input('investigation_product_id'),
                    'target_sample_size' => $request->input('target_sample_size'),
                    'number_of_participants' => $request->input('number_of_participants'),
                    'remarks' => $request->input('remarks')
                );
                DB::table($table_name)
                    ->where($where)
                    ->update($params);

                    $study_sites_id = json_decode($study_sites_id);

                    if (count($study_sites_id) > 0) {
                        $params = array();
                        foreach ($study_sites_id as $study_site_id) {
                           $where = array(
                                'application_code' => $application_code,
                                'study_site_id' => $study_site_id,
                                'inspection_id'=>$inspection_id
                            );
                            $check = DB::table('tra_ctrgcp_inspectedsites')
                                    ->where($where)
                                    ->first();
                            if(!$check){

                                $params[] = array(
                                    'application_code' => $application_code,
                                    'study_site_id' => $study_site_id,
                                    'inspection_id'=>$inspection_id,
                                    'created_on' => Carbon::now(),
                                    'created_by' => \Auth::user()->id
                                );
                            }
                        }
                        DB::table('tra_ctrgcp_inspectedsites')
                            ->insert($params);

                    }
                $res = array(
                    'success' => true,
                    'message' => 'Details saved successfully!!'
                );

            }else{
                $res = array(
                    'success' => false,
                    'message' => 'Details not saved successfully!!'
                );
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
    public function printApplicationMeetingDetails(Request $req)
    {

        $records = json_decode($req->selected);
        $workflow_stage = $req->workflow_stage_id;
        $table_name = 'tra_clinical_trial_applications';
        $application_codes = array();
        $meeting_id = null;
        $heading = "Application Meeting Details";
        foreach ($records as $record) {
            $application_codes[] = $record->application_code;
            $meeting_id = $record->meeting_id;
        }

        $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->join('clinical_trial_personnel as t7', 't1.sponsor_id', '=', 't7.id')
                ->join('clinical_trial_personnel as t8', 't1.investigator_id', '=', 't8.id')
                ->leftJoin('tc_meeting_applications as t9', function ($join) use ($meeting_id) {
                    $join->on('t1.application_code', '=', 't9.application_code')
                        ->where('t9.meeting_id', $meeting_id);
                })
                ->join('tra_assessment_recommendations as t10', 't1.application_code', '=', 't10.application_code')
                ->join('tra_auditing_recommendations as t11', 't1.application_code', '=', 't11.application_code')
                ->join('wf_workflow_actions as t12', 't10.recommendation_id', '=', 't12.id')
                ->join('wf_workflow_actions as t13', 't11.recommendation_id', '=', 't13.id')
                ->select('t1.tracking_no as Tracking_No','t1.reference_no as Reference_No', 't3.name as Applicant_Name', 't4.name as Application_Status','t7.name as Sponsor', 't8.name as Investigator',
                    't12.name as Assessment_Recommendation', 't13.name as Audit_Recommendation')
                ->where('t1.workflow_stage_id', $workflow_stage)
                ->whereNotIn('t1.application_code', function ($query) use ($table_name, $workflow_stage, $meeting_id) {
                    $query->select(DB::raw('t8.application_code'))
                        ->from('tc_meeting_applications as t8')
                        ->join($table_name . ' as t9', 't8.application_code', '=', 't9.application_code')
                        ->where('t9.workflow_stage_id', $workflow_stage)
                        ->where('t8.meeting_id', '<>', $meeting_id);
                })
                ->whereIn('t1.application_code',$application_codes)
                ->groupBy('t1.application_code');

            $Applications_data = $qry->get();

            $participants_qry = DB::table('tc_meeting_participants as t1')
                ->select('t1.participant_name as Participant_Name','t1.phone as Phone_No','t1.email as Email_Address')
                ->where('t1.meeting_id', $meeting_id);

            $participants_data = $participants_qry->get();

            $meeting_qry = DB::table('tc_meeting_details as t1')
                        ->leftJoin('par_meeting_statuses as t2','t1.meeting_status_id','t2.id')
                         ->select(DB::raw("t1.meeting_name as Meeting_Name, t1.meeting_desc as Meeting_Desc, t1.meeting_identifier as Meeting_Identifier, t1.meeting_time as Meeting_Time, t1.meeting_venue as Meeting_Venue, t1.date_requested as Date_Requested, t2.name as Meeting_Status"))
                         ->where('t1.id', $meeting_id);

            $meeting_data = $meeting_qry->first();
            //prepare data
            $data_array = convertStdClassObjToArray($Applications_data);
            $participants_data = convertStdClassObjToArray($participants_data);
            $meeting_data = convertStdClassObjToArray($meeting_data);
            //product application details
         
        $meetingSpreadheet = new Spreadsheet();
         
        $sheet = $meetingSpreadheet->getActiveSheet();
       // $ProductSpreadsheet->getActiveSheet()->setTitle($heading);
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
        $styleHeaderArray = [
              'fill' => [
                    'type' =>  \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E5E4E2']
                ],
             'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
             'font'  => [
                  'bold'  =>  true
                ]
        ];
           $styleSideHeaderArray = [
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
        if(isset($data_array[0])){
        $header=array_keys($data_array[0]);
        $length=count($header);

       }else{
        $data_array=array();
        $header=array();
        $length=1;
        $sheet->getCell('A2')->setValue("No data");
       }

        $letter=$this->number_to_alpha($length,"");
        
         //first heading
                 $sheet->mergeCells('A1:'.$letter.'6')
                      ->getCell('A1')
                      ->setValue("TANZANIAN MEDICINE AND MEDICAL DEVICES AGENCY\nP.O. Box 77150, Nelson Mandela Road,Mabibo External\nTell : +255 22 2450512/2450751/2452108 Fax : +255 28 2541484\nWebsite: www.tfda.go.tzEmail: info@tfda.go.tz\n".$heading);
                $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
                $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);
        //headers 
               $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);
        //set autosize true for all columns
           $size=count($data_array)+7;
            $cellRange = 'A7:'.$letter.''.$size;
            if($length > 11){
                $sheet->getStyle($cellRange)->getAlignment()->setWrapText(true);
            }
            else{
                if($length>26){
                  foreach(range('A','Z') as $column) {
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                  $remainder=27;
                  while ($remainder <= $length) {
                    $column=$this->number_to_alpha($remainder,"");
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                    $remainder++;
                  }

                }else{

                  foreach(range('A',$letter) as $column) {
                    //dd(range('A',$letter) );
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                }
              }

          //adding formats to header
              $count = 8;
             $sheet->getStyle('A'.$count.':'.$letter.$count)->applyFromArray($styleArray);
               $sheet->mergeCells('A'.$count.':'.$letter.''.$count);
               $sheet->getCell('A'.$count)->setValue("Meeting Details");
               $count = 9;
               foreach ($meeting_data as $key => $value) {
                   $sheet->getCell('A'.$count)->setValue($key);
                   $sheet->getCell('B'.$count)->setValue($value);
                   $count++; 
               }
               $sheet->getStyle('A9:A'.$count)->applyFromArray($styleSideHeaderArray);
        //second heading
        //headers 
               $count = $count+2;
               $sheet->getStyle('A'.$count.':'.$letter.$count)->applyFromArray($styleArray);
               $sheet->mergeCells('A'.$count.':'.$letter.''.$count);
               $sheet->getCell('A'.$count)->setValue("Meeting Participants");
               $count++;
               $participants_headers = array_keys($participants_data[0]);
               $sheet->getStyle('A'.$count.':'.$letter.$count)->applyFromArray($styleHeaderArray);
               $sheet->fromArray( $participants_headers, null,  "A".$count);
        //loop data while writting
               $count++;
               $sheet->fromArray( $participants_data, null,  "A".$count);

        //third heading
        //headers 
               $count=count($data_array)+$count;
               $count = $count+2;
               $sheet->getStyle('A'.$count.':'.$letter.$count)->applyFromArray($styleArray);
               $sheet->mergeCells('A'.$count.':'.$letter.''.$count);
               $sheet->getCell('A'.$count)->setValue("Application Details");
               $count++;
               $app_headers = array_keys($data_array[0]);
               $sheet->getStyle('A'.$count.':'.$letter.$count)->applyFromArray($styleHeaderArray);
               $sheet->fromArray( $app_headers, null,  "A".$count);
        //loop data while writting
               $count++;
               $sheet->fromArray( $data_array, null,  "A".$count);
//complete file
        $writer = new Xlsx($meetingSpreadheet);
         
        $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', 'attachment;filename=MeetingSpreadheet.xlsx');
        $response->headers->set('Cache-Control','max-age=0');


       return $response;
    }
    //helpers
    function number_to_alpha($num,$code)
        {   
            $alphabets = array('', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

            $division = floor($num / 26);
            $remainder = $num % 26; 

            if($remainder == 0)
            {
                $division = $division - 1;
                $code .= 'Z';
            }
            else
                $code .= $alphabets[$remainder];

            if($division > 26)
                return number_to_alpha($division, $code);   
            else
                $code .= $alphabets[$division];     

            return strrev($code);
        }
        public function getCtrRegistryInterventions(Request $req){
            try{
                $application_id = $req->application_id;
                $records = DB::table('tra_clinicaltrial_interventions as t1')
                ->join('par_clinical_intervention_types as t2', 't1.intervention_type_id','t2.id')
                ->join('par_clinical_natureofcontrols as t3', 't1.nature_ofcontrol_id','t3.id')
                ->select('t1.*','t2.name as intervention_type', 't3.name as control_name')
                ->where(array('application_id'=>$application_id))
                ->get();
                
                $res = array('success'=>true, 'results'=>$records);
        
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
        public function getClinicalOutcomesDetails(Request $req){
            try{
                $application_id = $req->application_id;
                $records = DB::table('tra_clinicaltrial_outcomes as t1')
                ->join('par_clinicaloutcome_types as t2', 't1.outcome_type_id','t2.id')
                ->select('t1.*','t2.name as outcome_type')
                ->where(array('application_id'=>$application_id))
                ->get();
                
                $res = array('success'=>true, 'results'=>$records);
        
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
        public function getClinicalRecruiptmentDetails(Request $req){
            try{
                $application_id = $req->application_id;
                $records = DB::table('tra_clinicaltrial_recruitmentcenters as t1')
                ->join('par_countries as t2', 't1.country_id','t2.id')
                ->join('par_regions as t3', 't1.region_id','t3.id')
                ->select('t1.*','t1.name as recruitment_centre', 't1.physical_address as street_address', 't2.name as country','t2.name as region', 't1.postal_address as postal_code')
                ->where(array('application_id'=>$application_id))
                ->get();
                
                $res = array('success'=>true, 'results'=>$records);
        
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
        public function getClinicalEthicsApprovalDetails(Request $req){
            try{
                $application_id = $req->application_id;
                $records = DB::table('tra_clinicaltrial_ethic_approvals as t1')
                ->join('par_countries as t2', 't1.country_id','t2.id')
                ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
                ->select('t1.*', 't1.physical_address as street_address', 't2.name as country','t2.name as city', 't1.postal_address as postal_code')
                ->where(array('application_id'=>$application_id))
                ->get();
                
                $res = array('success'=>true, 'results'=>$records);
        
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
        
        }public function getClinicaltrailSponsorsData(Request $req){
            try{
                $application_id = $req->application_id;
                $records = DB::table('tra_clinicaltrialregistry_sponsors as t1')
                ->leftJoin('clinical_trial_personnel as t4', 't1.sponsor_id','t4.id')
                ->leftJoin('par_countries as t2', 't4.country_id','t2.id')
                ->leftJoin('par_regions as t3', 't4.region_id','t3.id')
                
                ->leftJoin('par_sponsors_nature as t5', 't1.sponsor_nature_id','t5.id')
                ->leftJoin('par_sponsors_levels as t6', 't1.sponsor_level_id','t6.id')
                ->select('t1.*', 't4.physical_address', 't2.name as country','t2.name as region', 't4.postal_address','t6.name as sponsor_level','t5.name as nature_of_sponsor','t4.name as sponsor_name')
                ->where(array('application_id'=>$application_id))
                ->get();
                
                $res = array('success'=>true, 'results'=>$records);
        
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
        public function getClinicalContactPersonsDetails(Request $req){
            try{
                $application_id = $req->application_id;
                $records = DB::table('tra_clinicaltrial_contactpersons as t1')
                ->join('par_countries as t2', 't1.country_id','t2.id')
                ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
                ->join('par_clinicaltrialpersons_roles as t4', 't1.contactperson_role_id','t4.id')
                ->select('t1.*', 't2.name as country','t2.name as city', 't1.postal_address as postal_code', 't4.name as role')
                ->where(array('application_id'=>$application_id))
                ->get();
                
                $res = array('success'=>true, 'results'=>$records);
        
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
        function getClincialTrialFilterData($req){
            $filter = $req->input('filter');
                      $whereClauses = array();
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'version_no' :
                                $whereClauses[] = "t1.version_no like '%" . ($filter->value) . "%'";
                                break;
                                  case 'protocol_no' :
                                $whereClauses[] = "t1.protocol_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'study_title' :
                                $whereClauses[] = "t1.study_title like '%" . ($filter->value) . "%'";
                                break;
                            case 'applicant_name' :
                                $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                break;
                                case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;   
                                case 'tin_no' :
                                $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
            return  $filter_string;
        }
    public function getApprovedClinicalTrialApplications(Request $req){

        $start = $req->start;
        $limit = $req->limit;

         $qry = DB::table('tra_clinical_trial_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('tra_approval_recommendations as t7', 't1.application_code','t7.application_code')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t1.*"))
                    ->where('t7.decision_id',1);
            $filter_string = $this->getClincialTrialFilterData($req);

                    if ($filter_string != '') {
                        $qry->whereRAW($filter_string);
                    }
        $count = $qry->count();
        if(validateIsNumeric($start) && validateIsNumeric($limit)){
            $results = $qry->skip($start)->take($limit)->get();
        }else{
            $results = $qry->get();
        }
        
        $res = array(
                'success' => true,
                'results' => $results,
                'total' => $count,
                'message' => 'All is well'
            );
        return \response()->json($res);


    }
    public function getAllClinicalTrialApplications(Request $req)
    {
        $start = $req->start;
        $limit = $req->limit;
         $qry = DB::table('tra_clinical_trial_applications as t1')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t1.*"));
                    $filter_string = $this->getClincialTrialFilterData($req);

                    if ($filter_string != '') {
                        $qry->whereRAW($filter_string);
                    }
        $count = $qry->count();
        if(validateIsNumeric($start) && validateIsNumeric($limit)){
            $results = $qry->skip($start)->take($limit)->get();
        }else{
            $results = $qry->get();
        }
        
        $res = array(
                'success' => true,
                'results' => $results,
                'total' => $count,
                'message' => 'All is well'
            );
        return \response()->json($res);
    }
    public function saveEditAppBaseDetails(Request $request)
    {
        $application_id = $req->input('application_id');
        //$applicant_id = $req->input('applicant_id');
        $process_id = $req->input('process_id');
        $workflow_stage_id = $req->input('workflow_stage_id');
        $zone_id = $req->input('zone_id');
        $section_id = $req->input('section_id');
        $module_id = $req->input('module_id');
        $sub_module_id = $req->input('sub_module_id');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            $applications_table = 'tra_clinicaltrial_progressreports';

            $where_app = array(
                'application_id' => $application_id
            );
            $application_params = array(
                'reporting_start_date' => $req->reporting_start_date,
                'reporting_end_date' => $req->reporting_end_date,
                'clinicalreport_type_id' => $req->clinicalreport_type_id,
                'actualstudy_date' => $req->actualstudy_date,
                'screen_participants' => $req->screen_participants,
                'dateof_first_screening' => $req->ateof_first_screening,
                'target_sample_size' => $req->target_sample_size,
                'enrolled_participants' => $req->enrolled_participants,
                'dateof_first_enrollment' => $req->dateof_first_enrollment,
                'number_of_dropouts' => $req->number_of_dropouts,
                'number_lost_tofollow_ups' => $req->number_lost_tofollow_ups,
                'inclusion_criteria' => $req->inclusion_criteria,
                'exclusion_criteria' => $req->exclusion_criteria,
                'number_of_saes' => $req->number_of_saes,
                'events_of_medialimportance' => $req->events_of_medialimportance,
                'clinicalstudy_status_id' => $req->clinicalstudy_status_id,
                'study_site_id' => $req->study_site_id
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
                    $app_details = $app_details['results'];
                    $res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                    if ($res['success'] == false) {
                        return $res;
                    }
                }
                
            } 
            DB::commit();
           
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
    //clinitry trie edit option s
    public function  save_clinicalregdetails(Request $req){
        try {
            $resp= array();
            $application_id = $req->id;
            $trader_id = $req->trader_id;
            $applicant_id = $req->applicant_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->appmodule_id;
            $sub_module_id = $req->sub_module_id;
    
            $protocol_no = $req->protocol_no;
            $tracking_no = $req->tracking_no;
            $phase_id = $req->phase_id;
            $disease_being_studied = $req->disease_being_studied;
            $application_code = $req->application_code;
           $application_id = $req->application_id;
            $app_data = array(
                                    'phase_id'=>$phase_id,
                                     'is_ctrapp_registered'=>$req->is_ctrapp_registered,
                                      'protocol_no'=>$protocol_no,
                                    'ctrregistered_tracking_no'=>$req->ctrregistered_tracking_no,
                                    'acronym'=>$req->acronym,
                                    'actualtrial_start_date'=>$req->actualtrial_start_date,
                                    'anticipatedfollow_uplast_date'=>$req->anticipatedfollow_uplast_date,
                                    'clinicaltrial_description'=>$req->clinicaltrial_description,
                                    'completion_date'=>formatDate($req->completion_date),
                                    'study_start_date'=>formatDate($req->study_start_date),
                                    'final_participants'=>$req->final_participants,
                                    'other_obstetrics_disease'=>$req->other_obstetrics_disease,
                                    'proposed_start_date'=>$req->proposed_start_date,
                                    'study_title'=>$req->study_title,
                                    'public_title'=>$req->public_title,
                                    
                                    'publication_url'=>$req->publication_url,
                                    'purpose_of_trial'=>$req->purpose_of_trial,
                                    'recruitment_status_id'=>$req->recruitment_status_id,
                                    'target_participants'=>$req->target_participants,
                                    'version_no'=>$req->version_no,
                                    'trial_design_id'=>$req->trial_design_id,
                                    'applicant_id'=>$applicant_id,
                                );
                          
                        
                        $table_name = 'tra_clinical_trial_applications';
                        if(validateIsNumeric($application_id)){
                               $where_app = array('id'=>$application_id);
    
                                if (recordExists('tra_clinical_trial_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('tra_clinical_trial_applications', $where_app);
                                    $application_code = $previous_data['results'][0]['application_code'];
    
                                    $tracking_no = $previous_data['results'][0]['tracking_no'];
                                    $previous_data = $previous_data['results'];
                                    $resp =   updateRecord('tra_clinical_trial_applications', $previous_data, $where_app, $app_data, $trader_email);
                                    
                            }
                            
                        }
                        $disease_beingdata = array();
                        //save the diseases
                        DB::table('tra_clinicaltrial_studydiseases')->where(array('application_id'=>$application_id))->delete();//
                        $disease_being_studied = json_decode($disease_being_studied);
                        if(is_array($disease_being_studied)){
                            foreach($disease_being_studied as $disease_id){
                                                        
                                    $disease_beingdata[] = array('disease_being_studied'=>$disease_id, 
                                                    'application_id'=>$application_id, 
                                                    'created_by'=>$trader_email, 
                                                    'created_on'=>Carbon::now());
    
                            }
    
                        }
                        
                        
                        DB::table('tra_clinicaltrial_studydiseases')->insert($disease_beingdata);
                        if($resp['success']){
                            $res = array('success'=>true,
                            'disease_being_studied'=>$disease_beingdata,
                                         'message'=>'Clinical trial Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'resp'=>$previous_data,
                            'message'=>'Error Occurred Clinical trial Application not saved, it this persists contact the system Administrator');
                         }
    
                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message1'=>$resp,'resp'=>$previous_data,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,'message1'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);
    } 
    
public function save_clinicalstudyDesign(Request $req){
    
    $resp ="";
    $trader_id = $req->trader_id;
     $user_id =  $this->user_id;
   
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_studydesign';

    $masking_used_id = $req->masking_used_id;

    $data = array('intervention_assignment_id'=>$req->intervention_assignment_id,
            'intervention_allocation_id'=>$req->intervention_allocation_id,
            'allocation_sequence_id'=>$req->allocation_sequence_id,
            'masking_id'=>$req->masking_id,
            'application_id'=>$application_id);
        //insert 
        $where = array('application_id'=>$application_id);
        $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$data,$where,true,$application_id,'tra_studydesign_maskingused',$masking_used_id);
        

return response()->json($res);
}
//
public function save_clinicalseconaryids(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
     $user_id =  $this->user_id;
   
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_secondaryids';

    $app_data = array('is_secondaryid_applicable'=>$req->is_secondaryid_applicable,
            'secondary_id'=>$req->secondary_id,
            'issuing_authority'=>$req->issuing_authority,
            'application_id'=>$application_id);
  
        //insert 
        $where = array('application_id'=>$application_id);
       
        $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);


return response()->json($res);
}
public function onSaveInterventionDetails(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
     $user_id =  $this->user_id;
   
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_interventions';

    $app_data = array('intervention_type_id'=>$req->intervention_type_id,
            'intervention_name'=>$req->intervention_name,
            'intervention_dose'=>$req->intervention_dose,
            'intervention_duration'=>$req->intervention_duration,
            'intervention_description'=>$req->intervention_description,
            'group_size'=>$req->group_size,'nature_ofcontrol_id'=>$req->nature_ofcontrol_id,
            'application_id'=>$application_id);
  
        //insert 
        $where = array('id'=>$id);
       
        $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
        


return response()->json($res);
}
public function onSaveOutcomesDetails(Request $req){

$resp ="";
$trader_id = $req->trader_id;
 $user_id =  $this->user_id;
$age_groups = $req->age_groups;
$id = $req->id;
$application_id = $req->application_id;
$error_message = 'Error occurred, data not saved successfully';

$table_name = 'tra_clinicaltrial_outcomes';

$app_data = array('outcome_type_id'=>$req->outcome_type_id,
        'time_point'=>$req->time_point,
        'outcome'=>$req->outcome,
        'application_id'=>$application_id);

    //insert 
    $where = array('id'=>$id);
   $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
    

  return response()->json($res);
}

public function onSaverecruitmentCenter(Request $req){

$resp ="";
$trader_id = $req->trader_id;
 $user_id =  $this->user_id;
$age_groups = $req->age_groups;
$id = $req->id;
$application_id = $req->application_id;
$error_message = 'Error occurred, data not saved successfully';

$table_name = 'tra_clinicaltrial_recruitmentcenters';

$app_data = array('name'=>$req->name,
        'physical_address'=>$req->physical_address,
        'country_id'=>$req->country_id,
        'region_id'=>$req->region_id,
        'postal_address'=>$req->postal_address,
        'application_id'=>$application_id);

    //insert 
    $where = array('id'=>$id);
   $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
    

  return response()->json($res);
}
public function onSaveethicsApproval(Request $req){

$resp ="";
$trader_id = $req->trader_id;
 $user_id =  $this->user_id;
$age_groups = $req->age_groups;
$id = $req->id;
$application_id = $req->application_id;
$error_message = 'Error occurred, data not saved successfully';

$table_name = 'tra_clinicaltrial_ethic_approvals';

$app_data = array('submission_date'=>formatDate($req->submission_date),
'approval_date'=>formatDate($req->approval_date),
        'committee_name'=>$req->committee_name,
        'phone_no'=>$req->phone_no,
        'email_address'=>$req-> email_address,
        'physical_address'=>$req->physical_address,
        'country_id'=>$req->country_id,
        'region_id'=>$req->region_id,
        'postal_address'=>$req->postal_address,
       
        'application_id'=>$application_id);

    //insert 
    $where = array('id'=>$id);
   $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
    

  return response()->json($res);
}


public function save_clinicalcollaborators(Request $req){

$resp ="";
$trader_id = $req->trader_id;
 $user_id =  $this->user_id;
$age_groups = $req->age_groups;
$id = $req->id;
$application_id = $req->application_id;
$error_message = 'Error occurred, data not saved successfully';

$table_name = 'tra_clinicaltrial_collaborators';

$app_data = array( 'has_collaborators'=>$req->has_collaborators,
        'name'=>$req->name,
        'physical_address'=>$req->physical_address,
        'country_id'=>$req->country_id,
        'region_id'=>$req->region_id,
        'postal_address'=>$req->postal_address,
        'application_id'=>$application_id);

    //insert 
    $where = array('application_id'=>$application_id);
   $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
    

  return response()->json($res);
}
public function onSaveContactPersonDetails(Request $req){

$resp ="";
$trader_id = $req->trader_id;
 $user_id =  $this->user_id;
$age_groups = $req->age_groups;
$id = $req->id;
$application_id = $req->application_id;
$error_message = 'Error occurred, data not saved successfully';

$table_name = 'tra_clinicaltrial_contactpersons';

$app_data = array( 'contactperson_role_id'=>$req->contactperson_role_id,
        'name'=>$req->name,
        'physical_address'=>$req->physical_address,
        'country_id'=>$req->country_id,
        'region_id'=>$req->region_id,
        'postal_address'=>$req->postal_address,
        'email_address'=>$req->email_address,
        'phone_no'=>$req-> phone_no,'contact_personposition'=>$req-> contact_personposition,
        'application_id'=>$application_id);

    //insert 
    $where = array('application_id'=>$application_id);
   $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
    

  return response()->json($res);
}

public function save_clinicalfundingsource(Request $req){

$resp ="";
$trader_id = $req->trader_id;
 $user_id =  $this->user_id;
$age_groups = $req->age_groups;
$id = $req->id;
$application_id = $req->application_id;
$error_message = 'Error occurred, data not saved successfully';

$table_name = 'tra_clinicaltrial_fundingsource';

$app_data = array( 'is_funding_receivied'=>$req->is_funding_receivied,
        'fundsource_type_id'=>$req->fundsource_type_id,
        'name'=>$req->name,
        'physical_address'=>$req->physical_address,
        'country_id'=>$req->country_id,
        'region_id'=>$req->region_id,
        'postal_address'=>$req->postal_address,
        'application_id'=>$application_id);

    //insert 
    $where = array('application_id'=>$application_id);
   $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
    

  return response()->json($res);
}

public function onsaveclinicaltSponsorDetails(Request $req){

$resp ="";
$trader_id = $req->trader_id;
 $user_id =  $this->user_id;
$age_groups = $req->age_groups;
$id = $req->id;
$application_id = $req->application_id;
$error_message = 'Error occurred, data not saved successfully';

$table_name = 'tra_clinicaltrialregistry_sponsors';

$app_data = array( 'sponsor_id'=>$req->sponsor_id,
        'sponsor_level_id'=>$req->sponsor_level_id,
        'sponsor_nature_id'=>$req->sponsor_nature_id,
       
        'application_id'=>$application_id);

    //insert 
    $where = $app_data;
   $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where);
    

  return response()->json($res);
}


public function save_clinicaleligibilitycriteria(Request $req){

    $resp ="";
    $trader_id = $req->trader_id;
     $user_id =  $this->user_id;
    $age_groups = $req->age_groups;
    $id = $req->id;
    $application_id = $req->application_id;
    $error_message = 'Error occurred, data not saved successfully';

    $table_name = 'tra_clinicaltrial_eligibilitycriteria';
   
    $app_data = array('inclusion_criteria'=>$req->inclusion_criteria,
            'exclusion_criteria'=>$req->exclusion_criteria,
            'minimum_age'=>$req->minimum_age,
            'sex_id'=>$req->sex_id,
            'minage_duration_desc'=>$req->minage_duration_desc,
            'maximum_age'=>$req->maximum_age,'maxage_duration_desc'=>$req->maxage_duration_desc,
            'application_id'=>$application_id);
  
        //insert 
        $where = array('application_id'=>$application_id);
       $res = $this->onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where,true,$application_id,'tra_eligibilitycriteria_agegroup',$age_groups);
        

      return response()->json($res);
}
function onSaveClinicalRegistryUniformDetails($req,$table_name,$app_data,$where,$has_foreigndata=false,$application_id = null,$foreign_datatype=null,$foreign_data=null ){
    $resp='';
     $user_id = $req->trader_email;
    try{
        if (recordExists($table_name, $where)) {
                $app_data['altered_by'] =  $user_id;
                $app_data['dola'] = Carbon::now();
            
                $previous_data = getPreviousRecords($table_name, $where);
                $record_id = $previous_data['results'][0]['id'];
                $previous_data = $previous_data['results'];
                $resp =   updateRecord($table_name, $previous_data, $where, $app_data,  $user_id);
            }
            else{
                $app_data['created_by'] =  $user_id;
                $app_data['created_on'] = Carbon::now();
                
                $resp = insertRecord($table_name, $app_data,  $user_id);
            
                $record_id = $resp['record_id'];    
                
            }
            if($has_foreigndata){

                    if($foreign_datatype =='tra_studydesign_maskingused'){
                        DB::table('tra_studydesign_maskingused')->where(array('application_id'=>$application_id))->delete();
                      
                        if(is_array($foreign_data)){
                            $masking_useddata = array();
                            foreach($foreign_data as $used_id){
                                                        
                                    $masking_useddata[] = array('masking_used_id'=>$used_id, 
                                                    'application_id'=>$application_id, 
                                                    'studydesign_id'=>$record_id,
                                                    'created_by'=> $user_id, 
                                                    'created_on'=>Carbon::now());
            
                            }
                            DB::table('tra_studydesign_maskingused')->insert($masking_useddata);
                        }
                    }
                    else if($foreign_datatype == 'tra_eligibilitycriteria_agegroup'){
                        DB::table('tra_eligibilitycriteria_agegroup')->where(array('application_id'=>$application_id))->delete();
                        $foreign_data = json_decode($foreign_data);
                        if(is_array($foreign_data)){
                            $masking_useddata = array();
                            foreach($foreign_data as $age_group_id){
                                                        
                                    $masking_useddata[] = array('age_group_id'=>$age_group_id, 
                                                    'application_id'=>$application_id, 
                                                    'eligibilitycriteria_id'=>$record_id,
                                                    'created_by'=> $user_id, 
                                                    'created_on'=>Carbon::now());
            
                            }
                            DB::table('tra_eligibilitycriteria_agegroup')->insert($masking_useddata);
                        }

                    }

            }
           
        if($resp['success']){
            $res =  array('success'=>true,
        
            'message'=>'Saved Successfully');

        }
        else{
            $res =  array('success'=>false,
            'message'=>$error_message);
        }

            
    } catch (\Exception $exception) {
        $res = array(
            'success' => false,
            'respose'=>$resp,
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
}
