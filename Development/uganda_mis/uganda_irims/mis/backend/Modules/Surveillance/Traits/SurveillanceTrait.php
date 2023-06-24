<?php


namespace Modules\Surveillance\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait SurveillanceTrait
{

    public function getPmsApplicationReferenceCodes($application_details)
    {
        $zone_id = $application_details->zone_id;
        $section_id = $application_details->section_id;
        $sub_module_id = $application_details->sub_module_id;
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
        $sub_module_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');

        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'sub_module_code' => $sub_module_code
        );
        return $codes_array;
    }

    public function processSurveillanceApplicationsSubmission(Request $request)
    {
        $action = $request->input('action');
        $application_id = $request->input('application_id');
        $sub_module_id = $request->input('sub_module_id');
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $user_id = $this->user_id;

        //todo: get application details
        $application_details = DB::table($table_name)
            ->where('id', $application_id)
            ->first();
        if (is_null($application_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while fetching application details!!'
            );
            echo json_encode($res);
            exit();
        }
        $zone_id = $application_details->zone_id;
        $refno_generated = $application_details->refno_generated;
        //todo get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;

        if ($action_details->generate_refno == 1) {
            if ($refno_generated != 1) {
                $codes_array = $this->getPmsApplicationReferenceCodes($application_details);
                $refno_details = generateApplicationRefNumber($application_id, $table_name, $sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                if ($refno_details['success'] == false) {
                    echo json_encode($refno_details);
                    exit();
                }
            }
        }
        if ($action_type == 2) {//initial query
            $this->processReceivingQueriedApplicationSubmission($request);
        } else if ($action_type == 3) {//initial rejection
            $this->processReceivingRejectedApplicationSubmission($request);
        } else if ($action_type == 6) {//recommendation submission
            $recommendation_table = $action_details->recommendation_table;
            $this->processRecommendationApplicationSubmission($request, $recommendation_table);
        } else if ($action_type == 7) {//PMS Sample Selection Submission
            $this->processApplicationSamplesSelectionSubmission($request);//processApplicationPIRSamplesSubmission($request);
        } else if ($action_type == 8) {//PMS Sample Batch Submission
            $this->processApplicationSamplesBatchSubmission($request);
        } else {
            $this->processNormalApplicationSubmission($request, $keep_status);
        }
    }

    public function processSurveillanceManagersApplicationSubmission1(Request $request)
    {
        $action = $request->input('action');
        $sub_module_id = $request->input('sub_module_id');
        //get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;
        $approval_submission = $action_details->is_approval_submission;

        if ($sub_module_id == 37) {//todo Non structured applications
            if ($approval_submission == 1) {
                $this->processNewApprovalApplicationSubmission($request, $keep_status);
            }
        } else if ($sub_module_id == 38) {//todo Structured Applications
            if ($approval_submission == 1) {
                $this->processSubsequentApprovalApplicationSubmission($request);
            }
        } else {
            $res = array(
                'success' => false,
                'message' => 'Unknown sub module selected!!'
            );
            echo json_encode($res);
            exit();
        }
        if ($action_type == 4) {//manager query to customer
            $this->submitApplicationFromManagerQueryToCustomer($request);
        } else if ($action_type == 5) {//manager query normal submission
            $this->processManagerQueryReturnApplicationSubmission($request);
        } else {
            $this->processNormalManagersApplicationSubmission($request, $keep_status);
        }
    }

    public function processSurveillanceManagersApplicationSubmission(Request $request)//samples
    {
        $action = $request->input('action');
        $sub_module_id = $request->input('sub_module_id');
        //get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;
        $approval_submission = $action_details->is_approval_submission;

        if ($sub_module_id == 37) {//todo Non structured applications
            if ($approval_submission == 1) {
                $this->processNewApprovalApplicationSubmission($request, $keep_status);
            }
        } else if ($sub_module_id == 38) {//todo Structured Applications
            if ($approval_submission == 1) {
                $this->processSubsequentApprovalApplicationSubmission($request);
            }
        } else {
            $res = array(
                'success' => false,
                'message' => 'Unknown sub module selected!!'
            );
            echo json_encode($res);
            exit();
        }
        if ($action_type == 4) {//manager query to customer
            $this->submitApplicationFromManagerQueryToCustomer($request);
        } else if ($action_type == 5) {//manager query normal submission
            $this->processManagerQueryReturnApplicationSubmission($request);
        } else {
            $this->processApplicationSamplesSubmission($request, $keep_status);
        }
    }

    public function processApplicationPIRSamplesSubmission(Request $request, $keep_status = false)
    {
        $process_id = $request->input('process_id');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $from_stage = $request->input('curr_stage_id');
        $action = $request->input('action');
        $to_stage = $request->input('next_stage');
        $responsible_user = $request->input('responsible_user');
        $remarks = $request->input('remarks');
        $directive_id = $request->input('directive_id');
        $urgency = $request->input('urgency');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            //check for PIR recommended samples
            $samples_qry = DB::table('tra_surveillance_sample_details as t1')
                ->join('tra_pmslabresult_recommendations as t2', function ($join) {
                    $join->on('t2.sample_id', '=', 't1.id')
                        ->where('t2.analysis_type_id', 1);
                })
                ->select('t1.*')
                ->where('application_id', $application_id);
            $recommended_samples_qry = clone $samples_qry;
            $recommended_samples_qry->where('decision_id', 1);
            $recommended_samples_count = $recommended_samples_qry->count();
            //if it has recommended samples
            if ($recommended_samples_count > 0) {
                $recommended_update = clone $recommended_samples_qry;
                $recommended_update->update(array('stage_id' => 2));
            } else {
                $to_stage = 353;//static stage for TCM
            }
            $unrecommended_samples_qry = clone $samples_qry;
            $unrecommended_samples_qry->where('decision_id', 2);
            $unrecommended_samples_count = $unrecommended_samples_qry->count();
            //if it has unrecommended samples
            if ($unrecommended_samples_count > 0) {
                $unrecommended_update = clone $unrecommended_samples_qry;
                $unrecommended_update->update(array('stage_id' => 3));
            }
            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            if ($keep_status == true) {//for approvals
                $application_status_id = $application_details->application_status_id;
            }
            $where = array(
                'id' => $application_id
            );
            $app_update = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id
            );
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == false) {
                echo json_encode($prev_data);
                exit();
            }
            $update_res = updateRecord($table_name, $prev_data['results'], $where, $app_update, $user_id);

            if ($update_res['success'] == false) {
                echo json_encode($update_res);
                exit();
            }
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            //transitions
            $transition_params = array(
                'application_id' => $application_details->id,
                'application_code' => $application_details->application_code,
                'application_status_id' => $application_status_id,
                'process_id' => $process_id,
                'from_stage' => $from_stage,
                'to_stage' => $to_stage,
                'author' => $user_id,
                'directive_id' => $directive_id,
                'remarks' => $remarks,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            //submissions
            $submission_params = array(
                'application_id' => $application_details->id,
                'view_id' => $application_details->view_id,
                'process_id' => $process_id,
                'application_code' => $application_details->application_code,
                'reference_no' => $application_details->reference_no,
                'tracking_no' => $application_details->tracking_no,
                'usr_from' => $user_id,
                'usr_to' => $responsible_user,
                'previous_stage' => $from_stage,
                'current_stage' => $to_stage,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'application_status_id' => $application_status_id,
                'urgency' => $urgency,
                'applicant_id' => $application_details->applicant_id,
                'remarks' => $remarks,
                'directive_id' => $directive_id,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
            );
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
        echo json_encode($res);
        exit();
    }

    public function processApplicationSamplesBatchSubmission(Request $request, $keep_status = false)
    {
        $process_id = $request->input('process_id');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $from_stage = $request->input('curr_stage_id');
        $action = $request->input('action');
        $to_stage = $request->input('next_stage');
        $responsible_user = $request->input('responsible_user');
        $remarks = $request->input('remarks');
        $directive_id = $request->input('directive_id');
        $urgency = $request->input('urgency');
        $analysis_type_id = $request->input('analysis_type_id');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            if ($keep_status == true) {//for approvals
                $application_status_id = $application_details->application_status_id;
            }
            $where = array(
                'id' => $application_id
            );
            //update sample details stage
            $analysis_details = getTableData('par_survsample_analysis_types', array('id' => $analysis_type_id));
            if (is_null($analysis_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem fetching data[Analysis Data], consult system admin!!'
                );
                echo json_encode($res);
                exit();
            }
            $samples_currstage = $analysis_details->samples_currstage_id;
            $samples_nextstage = $analysis_details->samples_nextstage_id;;//getSingleRecordColValue($decision_table, array('id' => $recommendation_id), 'samples_nextstage_id');
            $samples_update = array(
                't1.dola' => Carbon::now(),
                't1.altered_by' => $user_id
            );
			
            if(validateIsNumeric($samples_nextstage)){
                $samples_update['t1.stage_id'] =$samples_nextstage;
            }
            $samples_qry = DB::table('tra_surveillance_sample_details as t1')
                ->join('tra_pmslabresult_recommendations as t2', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't2.sample_id')
                        ->where('t2.analysis_type_id', $analysis_type_id);
                })
                ->where('t1.application_id', $application_id)
                ->where('t1.stage_id', $samples_currstage);
            $count_qry = clone $samples_qry;
            $samples_count = $count_qry->count();
            if ($samples_count < 1) {
                $res = array(
                    'success' => false,
                    'message' => 'No samples to submit!!'
                );
                echo json_encode($res);
                exit();
            } else {
                $update_qry = clone $samples_qry;
                $update_qry->update($samples_update);
            }
            //end
            $app_update = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id
            );
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == false) {
                echo json_encode($prev_data);
                exit();
            }
            $update_res = updateRecord($table_name, $prev_data['results'], $where, $app_update, $user_id);

            if ($update_res['success'] == false) {
                echo json_encode($update_res);
                exit();
            }
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            //transitions
            $transition_params = array(
                'application_id' => $application_details->id,
                'application_code' => $application_details->application_code,
                'application_status_id' => $application_status_id,
                'process_id' => $process_id,
                'from_stage' => $from_stage,
                'to_stage' => $to_stage,
                'author' => $user_id,
                'directive_id' => $directive_id,
                'remarks' => $remarks,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            //submissions
            $submission_params = array(
                'application_id' => $application_details->id,
                'view_id' => $application_details->view_id,
                'process_id' => $process_id,
                'application_code' => $application_details->application_code,
                'reference_no' => $application_details->reference_no,
                'tracking_no' => $application_details->tracking_no,
                'usr_from' => $user_id,
                'usr_to' => $responsible_user,
                'previous_stage' => $from_stage,
                'current_stage' => $to_stage,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'application_status_id' => $application_status_id,
                'urgency' => $urgency,
                'applicant_id' => $application_details->applicant_id,
                'remarks' => $remarks,
                'directive_id' => $directive_id,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
            );
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
        echo json_encode($res);
        exit();
    }

    public function processApplicationSamplesSelectionSubmission(Request $request, $keep_status = false)
    {
        $process_id = $request->input('process_id');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $from_stage = $request->input('curr_stage_id');
        $action = $request->input('action');
        $to_stage = $request->input('next_stage');
        $responsible_user = $request->input('responsible_user');
        $remarks = $request->input('remarks');
        $directive_id = $request->input('directive_id');
        $urgency = $request->input('urgency');
        $recommendation_id = $request->input('recommendation_id');
        $analysis_type_id = $request->input('analysis_type_id');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            if ($keep_status == true) {//for approvals
                $application_status_id = $application_details->application_status_id;
            }
            $where = array(
                'id' => $application_id
            );
            //update sample details stage
            $analysis_details = getTableData('par_survsample_analysis_types', array('id' => $analysis_type_id));
            if (is_null($analysis_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem fetching data[Analysis Data], consult system admin!!'
                );
                echo json_encode($res);
                exit();
            }
			
            $decision_table = $analysis_details->decisions_table;
            $samples_currstage = $analysis_details->samples_currstage_id;
            $samples_nextstage = getSingleRecordColValue($decision_table, array('recommendation_id' => $recommendation_id), 'samples_nextstage_id');

            //all samples must have been given recommendation
            $unrecommended_count = DB::table('tra_surveillance_sample_details as t1')
                ->leftJoin('tra_pmslabresult_recommendations as t2', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't2.sample_id')
                        ->where('t2.analysis_type_id', $analysis_type_id);
                })
                ->where('t1.application_id', $application_id)
                ->whereNull('t2.id')
                ->where('t1.stage_id', $samples_currstage)
                ->count();
            //end
			
            if ($unrecommended_count > 0) {
                $res = array(
                    'success' => false,
                    'message' => 'Please recommend all samples before individual batch submissions!!'
                );
                //echo json_encode($res);
               // exit();
            }
           
			 $samples_update = array(
                't1.dola' => Carbon::now(),
                't1.altered_by' => $user_id
            );
			
            if(validateIsNumeric($samples_nextstage)){
                $samples_update['t1.stage_id'] =$samples_nextstage;
            }
			if($analysis_type_id == 6){
				//reset for manager
				$analysis_type_id = 1;
			}
			
            DB::table('tra_surveillance_sample_details as t1')
                ->join('tra_pmslabresult_recommendations as t2', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't2.sample_id')
                        ->where('t2.analysis_type_id', $analysis_type_id);
                })
                ->where('t1.application_id', $application_id)
                ->where('t2.decision_id', $recommendation_id)
                ->update($samples_update);
            //end
            /**
             * todo check if there are other samples left for this application
             */
            $count = DB::table('tra_surveillance_sample_details as t1')
                ->join('tra_pmslabresult_recommendations as t2', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't2.sample_id')
                        ->where('t2.analysis_type_id', $analysis_type_id);
                })
                ->where('t1.application_id', $application_id)
                //->where('t2.decision_id', '<>', $recommendation_id)
                ->where('t1.stage_id', $samples_currstage)
                ->count();
            if ($count > 0) {//some left...dont change application workflow stage, generate view_id, lock direct access
                $view_id = generateApplicationViewID();
                $app_update = array(
                    'application_status_id' => $application_status_id
                    //'is_locked' => 1
                );
            } else {//none left...change application workflow stage, dont generate view_id
                $view_id = $application_details->view_id;
                $app_update = array(
                    'workflow_stage_id' => $to_stage,
                    'application_status_id' => $application_status_id
                    //'is_locked' => 1
                );
            }

            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == false) {
                echo json_encode($prev_data);
                exit();
            }
            $update_res = updateRecord($table_name, $prev_data['results'], $where, $app_update, $user_id);

            if ($update_res['success'] == false) {
                echo json_encode($update_res);
                exit();
            }
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            //transitions
            $transition_params = array(
                'application_id' => $application_details->id,
                'application_code' => $application_details->application_code,
                'application_status_id' => $application_status_id,
                'process_id' => $process_id,
                'from_stage' => $from_stage,
                'to_stage' => $to_stage,
                'author' => $user_id,
                'directive_id' => $directive_id,
                'remarks' => $remarks,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            //submissions
            $submission_params = array(
                'application_id' => $application_details->id,
                'view_id' => $view_id,
                'process_id' => $process_id,
                'application_code' => $application_details->application_code,
                'reference_no' => $application_details->reference_no,
                'tracking_no' => $application_details->tracking_no,
                'usr_from' => $user_id,
                'usr_to' => $responsible_user,
                'previous_stage' => $from_stage,
                'current_stage' => $to_stage,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'application_status_id' => $application_status_id,
                'urgency' => $urgency,
                'applicant_id' => $application_details->applicant_id,
                'remarks' => $remarks,
                'directive_id' => $directive_id,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
            );
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
        echo json_encode($res);
        exit();
    }

    public function processApplicationSamplesSubmission(Request $request, $keep_status = false)
    {
        $process_id = $request->input('process_id');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $from_stage = $request->input('curr_stage_id');
        $action = $request->input('action');
        $to_stage = $request->input('next_stage');
        $responsible_user = $request->input('responsible_user');
        $remarks = $request->input('remarks');
        $directive_id = $request->input('directive_id');
        $urgency = $request->input('urgency');
        $tcm_recommendation_id = $request->input('tcm_recommendation_id');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            if ($keep_status == true) {//for approvals
                $application_status_id = $application_details->application_status_id;
            }
            $where = array(
                'id' => $application_id
            );
            
			 $samples_update = array(
                'dola' => Carbon::now(),
                'altered_by' => $user_id
            );
            if(validateIsNumeric($tcm_recommendation_id)){
                $samples_update['stage_id'] =$tcm_recommendation_id;
            }
            DB::table('tra_surveillance_sample_details')
                ->whereIn('id', $selected_ids)
                ->update($samples_update);
            //end
            /**
             * todo check if there are other samples left for this application
             */
            $count = DB::table('tra_surveillance_sample_details as t1')
                ->join('tra_pmslabresult_recommendations as t2', function ($join) {
                    $join->on('t1.id', '=', 't2.sample_id')
                        ->where('t2.analysis_type_id', 3);
                })
                ->where('t1.application_id', $application_id)
                ->where('t2.decision_id', '<>', $tcm_recommendation_id)
                ->count();
            if ($count > 0) {//some left...dont change application workflow stage, generate view_id, lock direct access
                $view_id = generateApplicationViewID();
                $app_update = array(
                    'application_status_id' => $application_status_id,
                    'is_locked' => 1
                );
            } else {//none left...change application workflow stage, dont generate view_id
                $view_id = $application_details->view_id;
                $app_update = array(
                    'workflow_stage_id' => $to_stage,
                    'application_status_id' => $application_status_id
                );
            }

            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == false) {
                echo json_encode($prev_data);
                exit();
            }
            $update_res = updateRecord($table_name, $prev_data['results'], $where, $app_update, $user_id);

            if ($update_res['success'] == false) {
                echo json_encode($update_res);
                exit();
            }
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            //transitions
            $transition_params = array(
                'application_id' => $application_details->id,
                'application_code' => $application_details->application_code,
                'application_status_id' => $application_status_id,
                'process_id' => $process_id,
                'from_stage' => $from_stage,
                'to_stage' => $to_stage,
                'author' => $user_id,
                'directive_id' => $directive_id,
                'remarks' => $remarks,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            //submissions
            $submission_params = array(
                'application_id' => $application_details->id,
                'view_id' => $view_id,
                'process_id' => $process_id,
                'application_code' => $application_details->application_code,
                'reference_no' => $application_details->reference_no,
                'tracking_no' => $application_details->tracking_no,
                'usr_from' => $user_id,
                'usr_to' => $responsible_user,
                'previous_stage' => $from_stage,
                'current_stage' => $to_stage,
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'application_status_id' => $application_status_id,
                'urgency' => $urgency,
                'applicant_id' => $application_details->applicant_id,
                'remarks' => $remarks,
                'directive_id' => $directive_id,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
            );
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
        echo json_encode($res);
        exit();
    }

}