<?php

namespace Modules\Pv\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PvController extends Controller
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
    public function savePvReceivingBaseDetails(Request $req, $inCall = 0)
    {
        try {
            
            $active_application_id = $req->input('active_application_id');
            $process_id = $req->input('process_id');
            $workflow_stage_id = $req->input('workflow_stage_id');
            $section_id = $req->input('section_id');
            $module_id = $req->input('module_id');
            $sub_module_id = $req->input('sub_module_id');
            $applicant_id = $req->input('applicant_id');
            $user_id = $this->user_id;
            $pv_id = $req->input('pv_id');
            $reg_serial = $req->reg_serial;
            $data = $req->All();
            //unset data 
            unset($data['active_application_id']);
            unset($data['_token']);
            unset($data['pv_id']);
            unset($data['table_name']);
            
            //check submodule 
            if($sub_module_id == 77){ //variation/reevaluation
                return $this->saveReEvaluationApplication($req, $inCall);
                 DB::commit();
            }
            DB::beginTransaction();
            //data updates
            if (validateIsNumeric($active_application_id)) {
                //update
                $applications_table = 'tra_pv_applications';
                $where_app = array(
                    'id' => $active_application_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    //update data
                    updateRecord($applications_table, $where_app, $data, $user_id);
                }

                //get existing data
                $app_details = getPreviousRecords($applications_table, $where_app);
                if ($app_details['success'] == false) {
                    DB::rollBack();
                    return $app_details;
                }
                $app_details = $app_details['results'];

                $application_code = $app_details[0]['application_code'];//$app_details->application_code;
                $tracking_no = $app_details[0]['tracking_no'];
                $ref_number = $app_details[0]['reference_no'];//$app_details->reference_no;

                //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(10,100), $user_id);

                $res['active_application_id'] = $active_application_id;
                $res['active_application_code'] = $application_code;
                $res['ref_no'] = $tracking_no;
                $res['tracking_no'] = $tracking_no;
                $res['success'] = true;
                $res['message'] = 'All is well';
                DB::commit();
            } else {

                    $data['created_by'] = \Auth::user()->id;
                    $data['created_on'] = Carbon::now();
                    $applications_table = 'tra_pv_applications';

                    $application_code = generateApplicationCode($sub_module_id, $applications_table);
                    $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                    $codes_array = array(
                        'section_code' => getSingleRecordColValue('par_sections', array('id' => $section_id), 'code'),
                        'adr_type' => getSingleRecordColValue('par_adr_types', array('id' => $req->adr_type_id), 'code')
                    );
                   $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, 1, $user_id);
                    if ($tracking_details['success'] == false) {
                        DB::rollBack();
                        return \response()->json($tracking_details);
                    }
                    $tracking_no = $tracking_details['tracking_no'];
                    

                    //registration serial
                    if(!validateIsNumeric($reg_serial)){
                        $reg_serial = getRegistrationSerial($module_id);
                    }                    
                    $view_id = generateApplicationViewID();
                    
                    //add autogenerated data
                    $data['application_code'] = $application_code;
                    $data['tracking_no'] = $tracking_no;
                    $data['view_id'] = $view_id;
                    $data['reg_serial'] = $reg_serial;
                    $data['date_added'] = Carbon::now();
                    $data['application_status_id'] = $application_status->status_id;

                    //application details
                    $res = insertRecord('tra_pv_applications', $data, $user_id);
                    if ($res['success'] == false) {
                            DB::rollBack();
                            return $res;
                        }
                    //duplicate to portal
                    // insertRecord('wb_product_applications', $app_data, $user_id, 'portal_db');

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
                        'branch_id' => 1,
                        'remarks' => 'Initial save of the application',
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'is_fast_track' => 2,
                        'created_by' => $user_id
                    );

                    $sub_res = insertRecord('tra_submissions', $submission_params);
                    if(!$sub_res['success']){
                        return $sub_res;
                    }
                    $res['active_application_id'] = $active_application_id;
                    $res['active_application_code'] = $application_code;
                    $res['pv_id'] = $active_application_id;
                    $res['ref_no'] = $tracking_no;
                    $res['tracking_no'] = $tracking_no;

                    DB::commit();

                    // initialize function
                   //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no.rand(10,100), $user_id);
            }

        } catch (\Exception $exception) {
            DB::rollBack();
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            DB::rollBack();
           $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        if($inCall == 1){
            return $res;
        }
        return \response()->json($res);
    }
    public function onLoadSuspectedDrugs(Request $req){
        try{
            $application_code = $req->application_code;
            $is_other_drugs_used = $req->is_other_drugs_used;

            $qry = DB::table('tra_pv_suspected_drugs as t1')
                    ->where('t1.application_code', $application_code);
            if(validateIsNumeric($is_other_drugs_used)){
                $qry->where('is_other_drugs_used', $is_other_drugs_used);
            }else{
                $qry->whereNull('is_other_drugs_used');
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
           $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        }
        return \response()->json($res);
    }
     public function getDashboardApplications(Request $request)
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
            $qry = DB::table('tra_pv_applications as t1')
                ->join('tra_submissions as t7', function ($join) {
                    $join->on('t1.application_code', '=', 't7.application_code')
                        ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                })
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_processes as t4', 't7.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->leftJoin('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->select(DB::raw("t7.date_received, CONCAT(decryptval(t8.first_name,".getDecryptFunParams()."),' ',decryptval(t8.last_name,".getDecryptFunParams().")) as from_user,CONCAT(decryptval(t9.first_name,".getDecryptFunParams()."),' ',decryptval(t9.last_name,".getDecryptFunParams().")) as to_user,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id,
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tpin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    t1.*"))
                ->where('t5.stage_status','<>',3)
                ->where('is_done', 0);

            if(!$is_super){
                $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
                $qry->whereNull('t1.usr_to');
            }
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($workflow_stage_id)) {

                $qry->where('t7.current_stage', $workflow_stage_id);
            }

            $qry->where('t7.is_done', 0);
            $results = $qry->get();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);

    }
    public function prepareNewPvReceivingStage(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_pv_applications as t1')
                ->select('t1.*', 't1.id as pv_id')
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('tra_application_invoices as t4', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't4.application_id')
                        ->on('t4.application_code', '=', 't4.application_code');
                })
                ->select('t1.*','t1.id as pv_id', 't1.id as active_application_id',
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tpin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                    't4.id as invoice_id', 't4.invoice_no');

            $results = $qry1->first(); 

            // $qry2 = clone $main_qry;
            // $qry2->join('wb_trader_account as t3', 't1.local_agent_id', '=', 't3.id')
            //     ->select('t3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
            //         't3.tpin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
            //         't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            // $ltrDetails = $qry2->first();

            $res = array(
                'success' => true,
                'results' => $results,
                // 'ltrDetails' => $ltrDetails,
                'message' => 'All is well'
            );

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function getStagePvApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $workflow_stage = $request->input('workflow_stage_id');
        $table_name = getTableName($module_id);
        try {
            $qry = DB::table($table_name . ' as t1')
                ->leftJoin('par_adr_types as t2', 't1.adr_type_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', 't5.application_code', '=', 't1.application_code')
                ->leftJoin('par_gender as t6', 't1.gender_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t9', 't9.application_code', '=', 't1.application_code')
                ->leftJoin('users as t10', 't9.usr_from', '=', 't10.id')
                ->leftJoin('wf_workflow_stages as t12', 't9.current_stage', 't12.id')
                ->leftJoin('tra_evaluation_recommendations as t13', function ($join) use($workflow_stage) {
                    $join->on('t1.application_code', '=', 't13.application_code')
                        ->on('t12.stage_category_id', '=', 't13.stage_category_id')
                        ->where('t9.current_stage', $workflow_stage);
                })
                ->leftJoin('tra_approval_recommendations as t14', 't1.application_code', 't14.application_code')
               ->leftJoin('tra_pv_reporter_notification_logs as t15', 't1.application_code', 't15.application_code')
                ->select('t1.*', 't1.id as pv_id', DB::raw("CONCAT(decryptval(t10.first_name,".getDecryptFunParams()."),' ',decryptval(t10.last_name,".getDecryptFunParams().")) as submitted_by"), 't9.date_received as submitted_on', 't3.name as applicant_name', 't4.name as application_status','t2.name as adr_type','t6.name as gender',
                     't1.id as active_application_id', 't12.stage_category_id','t13.id as recommendation_record_id','t13.recommendation_id','t13.remarks','t14.decision_id as approval_decision_id', 't1.treatment as final_recommendation', 't15.id as response_id','t15.response', 't15.subject')
                ->where(array('t9.current_stage'=>$workflow_stage,'is_done'=>0) );
          
            $results = $qry->orderBy('t9.id','desc')->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function getPvApplicationMoreDetails(Request $request)
    {
        $application_code = $request->input('application_code');

        try {
            $qry = DB::table('tra_pv_applications as t1')
                ->select('t1.id as pv_id', 't1.*')
                ->where('t1.application_code', $application_code);

            $pv_details = $qry->first();

            $res = array(
                'success' => true,
                'pv_details' => $pv_details,
                'branch_id' => 1,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function sendReporterNotification(Request $request)
    {
        $application_code = $request->input('application_code');
        $subject = $request->input('subject');
        $response = $request->input('response');

        try {
            //send mail
            $applicant = DB::table('tra_pv_applications as t1')
                        ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
                        ->select('t2.name as applicant_name', 't2.email as applicant_email','t2.contact_person', 't2.contact_person_email')
                        ->where('application_code', $application_code)
                        ->first();

            if(isset($applicant->applicant_email)){
                //reporter and cc contact person
                sendMailFromNotification($applicant->contact_person, $applicant->applicant_email,$subject, $response,'pv@bomra.bw', [$applicant->contact_person_email]);
                // //their contact person
                // sendMailFromNotification($applicant->contact_person, $applicant->contact_person_email,$subject, $response,'pv@bomra.bw', '');
            }
            //update db
            $where = array(
                'application_code' => $application_code
            );
            $update = ['is_reporter_notified' => 1];
            $res = updateRecord('tra_pv_applications', $where, $update);
            //log notification
            if($res['success']){
                $data = array(
                    'application_code' => $application_code,
                    'subject' => $subject,
                    'response' => $response
                );
                insertRecord('tra_pv_reporter_notification_logs', $data);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function publishReport(Request $request)
    {
        $application_code = $request->input('application_code');

        try {
            //update registers


            //update db
            $where = array(
                'application_code' => $application_code
            );
            $update = ['is_published' => 1];
            $res = updateRecord('tra_pv_applications', $where, $update);

            //log publishing
            if($res['success']){
                $data = array(
                    'application_code' => $application_code,
                    'published_by' => $this->user_id,
                    'published_on' => Carbon::now()
                );
                insertRecord('tra_pv_published_logs', $data);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function exportAdrReport(Request $req)
    {
        $selected = json_decode($req->selected);
        $res = array('success'=>false, 'message'=>'No applications passed');
        try {
            //declare excel
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            //sample record from list
            $data = DB::table('tra_pv_applications as t1')->where('application_code', $selected[0])->first();
            $excel_config_filter = array(
                'module_id' => $data->module_id,
                'sub_module_id' => $data->sub_module_id,
                'section_id' => $data->section_id,
                'adr_type_id' => $data->adr_type_id
            );
            //export columns
            $columns = DB::table('par_exceluploads_config')->get();
            $header = [];
            $excel_header = [];
            foreach ($columns as $column) {
                $header[] = $column->table_column;
                $excel_header[] = $column->excelcolumnname;
            }
            //add excel headers
            $sheet->fromArray($excel_header, null, "A1");
            $row = 8;
            $k = 0;
            $sortedData=array();
            $total=count($header);
            //get data and populate
            foreach ($selected as $application_code) {
                $data = DB::table('tra_pv_applications as t1')->where('application_code', $application_code)->first();
                for($v=0;$v<$total;$v++){
                    $temp1=$header[$v];
                    $sortedData[$k][]=$data->$temp1;
                }
                $k++;  
                //update db
                $where = array(
                    'application_code' => $application_code
                );
                $update = ['is_exported' => 1];
                $res = updateRecord('tra_pv_applications', $where, $update);

                //log export
            }
            $sheet->fromArray( $sortedData, null, "A2");
            // future reference to lead from excel
            // $rv = [];
            // foreach ($sheet->getColumnIterator() as $column) {
            //     $column_letter =$column->getColumnIndex();
            // }
            $writer = new Xlsx($spreadsheet);
            $response =  new StreamedResponse(
                function () use ($writer) {
                  $writer->save('php://output');
                }
            );
          $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          $response->headers->set('Content-Disposition', 'attachment;filename=test.xlsx');
          $response->headers->set('Cache-Control','max-age=0');

        } catch (\Exception $exception) {
            $response = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $response = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return $response;
    }
    
    
}
