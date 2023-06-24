<?php


namespace Modules\PremiseRegistration\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait PremiseRegistrationTrait
{

    public function getPremiseApplicationReferenceCodes($application_details)
    {
        $zone_id = $application_details->zone_id;
        $section_id = $application_details->section_id;
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code
        );
        return $codes_array;
    }

    public function processPremiseApplicationSubmission(Request $request)
    {
        $directive_id = $request->input('directive_id');
        $action = $request->input('action');
        $sub_module_id = $request->input('sub_module_id');
        $application_id = $request->input('application_id');
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $from_stage = $request->input('curr_stage_id');
        $user_id = $this->user_id;

		if($table_name == ''){
			$table_name  = 'tra_premises_applications';
		}
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
        $reference_no = $application_details->reference_no;
        $portal_id = $application_details->portal_id;
        $application_code = $application_details->application_code;
        $tracking_no = $application_details->tracking_no;
        //todo: get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;
        if ($action_details->generate_refno == 1) {
            if ($refno_generated != 1 && ($reference_no == '' or is_null($reference_no))) {
                $codes_array = $this->getPremiseApplicationReferenceCodes($application_details);
                $refno_details = generateApplicationRefNumber($application_id, $table_name, $sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
                if ($refno_details['success'] == false) {
                    echo json_encode($refno_details);
                    exit();
                }
                $portal_params = array(
                    'reference_no' => $refno_details['ref_no']
                );
                $portal_where = array(
                    'id' => $portal_id
                );
                updatePortalParams('wb_premises_applications', $portal_params, $portal_where);
            }
        }
        if ($action_details->update_portal_status == 1) {
            $portal_status_id = $action_details->portal_status_id;
            $proceed = updatePortalApplicationStatus($application_id, $portal_status_id, $table_name, 'wb_premises_applications');
            if ($proceed['success'] == false) {
                echo json_encode($proceed);
                exit();
            }
        }
        if ($action_details->update_checklistref == 1) {
            $proceed = updateApplicationChecklistsRef($from_stage, $application_code, $tracking_no, $user_id, $table_name);
            if ($proceed['success'] == false) {
                echo json_encode($proceed);
                exit();
            }
        }
        if ($action_type == 2) {//initial query
            $this->processReceivingQueriedApplicationSubmission($request);
        } else if ($action_type == 3) {//initial rejection
            $this->processReceivingRejectedApplicationSubmission($request);
        } else if ($action_type == 6) {//recommendation submission
            $recommendation_table = $action_details->recommendation_table;
            $this->processRecommendationApplicationSubmission($request, $recommendation_table);
        } else if ($action_type == 9) {//directive return submission
            if ($directive_id == 2) {//redo inspection
                $this->processPremiseReturnApplicationSubmissionsWithChecklists($request, 3);
            } else if ($directive_id == 4) {//redo evaluation
                $this->processPremiseReturnApplicationSubmissionsWithChecklists($request, 2);
            } else {
                $this->processNormalApplicationSubmission($request);
            }
        } else {
            $this->processNormalApplicationSubmission($request, $keep_status);
        }
    }

    public function processPremiseManagersApplicationSubmission(Request $request)
    {
        $action = $request->input('action');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        $selected_appCodes = $request->input('selected_appCodes');
        $application_codes = json_decode($selected_appCodes);
        //get workflow action details inspection_id
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;
        $approval_submission = $action_details->is_approval_submission;
        $invalidate_checklists = $action_details->invalidate_checklistitems;
        $checklist_category = $action_details->invalidate_checklistcategory_id;
        if ($invalidate_checklists == 1) {
            inValidateApplicationChecklist($module_id, $sub_module_id, $section_id, $checklist_category, $application_codes);
        }
        if ($approval_submission == 1) {
            if ($sub_module_id == 1) {//todo New Applications
                $this->processNewApprovalApplicationSubmission($request, $keep_status);
            } else if ($sub_module_id == 2) {//todo Renewal Applications
                $this->processSubsequentApprovalApplicationSubmission($request);
            } else if ($sub_module_id == 3) {//todo Alteration Applications
                $this->batchPremiseAlterationApplicationApprovalSubmission($request);
            } else if ($sub_module_id == 4) {//todo Cancellation Applications
                $this->batchPremiseAlterationApplicationApprovalSubmission($request);
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Unknown module selected!!'
                );
                echo json_encode($res);
                exit();
            }
        } else if ($action_type == 4) {//manager query to customer
            $this->submitApplicationFromManagerQueryToCustomer($request);
        } else if ($action_type == 5) {//manager query normal submission
            $this->processManagerQueryReturnApplicationSubmission($request);
        } else {
            $this->processNormalManagersApplicationSubmission($request, $keep_status);
        }
    }

    public function updateQueriedPremiseApplicationPortal(Request $request, $application_details)
    {
        $user_id = $this->user_id;
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        //update portal status
        $portal_db = DB::connection('portal_db');
        $update = $portal_db->table('wb_premises_applications')
            ->where('id', $application_details->portal_id)
            ->update(array('application_status_id' => 6));
        $insert_remark = array(
            'application_id' => $application_details->portal_id,
            'remark' => $remarks,
            'urgency' => $urgency,
            'mis_created_by' => $user_id
        );
        $insert = $portal_db->table('wb_query_remarks')
            ->insert($insert_remark);
        if ($update > 0 && $insert > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function updateRejectedPremiseApplicationPortal(Request $request, $application_details)
    {
        $user_id = $this->user_id;
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        //update portal status
        $portal_db = DB::connection('portal_db');
        $update = $portal_db->table('wb_premises_applications')
            ->where('id', $application_details->portal_id)
            ->update(array('application_status_id' => 11));
        $insert_remark = array(
            'application_id' => $application_details->portal_id,
            'remark' => $remarks,
            'urgency' => $urgency,
            'mis_created_by' => $user_id
        );
        $insert = $portal_db->table('wb_rejection_remarks')
            ->insert($insert_remark);
        if ($update > 0 && $insert > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function processPremiseReturnApplicationSubmissionsWithChecklists($request, $checklist_category)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
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
            inValidateApplicationChecklist($application_details->module_id, $application_details->sub_module_id, $application_details->section_id, $checklist_category, array($application_details->application_code));
            $this->processNormalApplicationSubmission($request);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            exit();
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            exit();
        }
    }

    public function updatePremiseManagerQueryToCustomerPortal($portal_ids)
    {
        $portal_db = DB::connection('portal_db');
        //update portal status
        $update = $portal_db->table('wb_premises_applications')
            ->whereIn('id', $portal_ids)
            ->update(array('application_status_id' => 8));
        if ($update < 1) {
            return false;
        } else {
            return true;
        }
    }

    public function singleNewPremiseApplicationApprovalSubmission($request)
    {
        $application_code = $request->input('application_code');
        try {
            $valid = $this->validatePremiseApprovalApplication($application_code);
            if ($valid == false) {
                $res = array(
                    'success' => false,
                    'message' => 'Please capture recommendation details first!!'
                );
                echo json_encode($res);
                exit();
            }
            $this->processNormalApplicationSubmission($request, true);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            exit();
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            exit();
        }
    }

    public function batchPremiseApplicationApprovalSubmission(Request $request)
    {
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name . ' as t1')
                ->join('tra_approval_recommendations as t2', 't1.application_code', '=', 't2.application_code')
                ->select('t1.*', 't2.decision_id')
                ->whereIn('t1.id', $selected_ids)
                ->get();
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
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $directive_id = $request->input('directive_id');
            $urgency = $request->input('urgency');
            $transition_params = array();
            $submission_params = array();
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;

            //todo: check for allowed changes
            //1. Basic premise info
            $permit_id = 'permit_id';
            $formAmendmentDetails = DB::table('tra_process_form_auth as t1')
                ->join('par_key_form_fields as t2', 't1.field_id', '=', 't2.id')
                ->select(DB::raw("CONCAT_WS(',',GROUP_CONCAT(t2.field_name),'$permit_id') AS changed"))
                ->where('t1.process_id', $process_id)
                ->first();
            //2. Personnel(id 2) and Business(id 3) details
            $othersAmendmentDetails = DB::table('tra_process_otherparts_auth as t1')
                ->select('t1.part_id')
                ->where('t1.process_id', $process_id)
                ->get();
            //end
            $portal_table_name = getPortalApplicationsTable($module_id);
            //application details
            foreach ($application_details as $key => $application_detail) {
                $view_id = generateApplicationViewID();
                $application_status_id = $application_detail->application_status_id;
                if ($application_detail->decision_id == 1) {
                    $portal_status_id = 10;
                    $this->updateRegistrationTable($application_detail->reg_premise_id, $application_detail->premise_id, $module_id);
                    /*$response = $this->processRenewalPremiseApprovalApplicationSubmission($application_detail->id, $table_name, $formAmendmentDetails, $othersAmendmentDetails);
                    $success = $response['success'];
                    if ($success == false) {
                        DB::rollBack();
                        echo json_encode($response);
                        return false;
                    }*/
                } else {
                    $portal_status_id = 11;
                }
                updatePortalApplicationStatus($application_detail->id, $portal_status_id, $table_name, $portal_table_name);
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
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
                $submission_params[] = array(
                    'application_id' => $application_detail->id,
                    'view_id' => $application_detail->view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'zone_id' => $application_detail->zone_id,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'directive_id' => $directive_id,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id,
                    'is_fast_track' => $application_detail->is_fast_track
                );
                $application_codes[] = array($application_detail->application_code);
            }
            //application update
            $update_params = array(
                'workflow_stage_id' => $to_stage
                //'application_status_id' => $application_status_id
            );
            $app_update = DB::table($table_name . ' as t1')
                ->whereIn('id', $selected_ids)
                ->update($update_params);
            if ($app_update < 1) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while updating application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);
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
        return true;
    }

    public function singleRenewalPremiseApplicationApprovalSubmission(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $process_id = $request->input('process_id');
        try {
            $valid = $this->validatePremiseApprovalApplication($application_code);
            if ($valid == false) {
                $res = array(
                    'success' => false,
                    'message' => 'Please capture recommendation details first!!'
                );
                echo json_encode($res);
                exit();
            }
            //check decision
            $decision_id = DB::table('tra_approval_recommendations')
                ->where(array('application_id' => $application_id, 'application_code' => $application_code))
                ->value('decision_id');
            if ($decision_id == 1) {//granted

                //todo: check for allowed changes
                //1. Basic premise info
                $permit_id = 'permit_id';
                $formAmendmentDetails = DB::table('tra_process_form_auth as t1')
                    ->join('par_key_form_fields as t2', 't1.field_id', '=', 't2.id')
                    ->select(DB::raw("CONCAT_WS(',',GROUP_CONCAT(t2.field_name),'$permit_id') AS changed"))
                    ->where('t1.process_id', $process_id)
                    ->first();
                //2. Personnel(id 2) and Business(id 3) details
                $othersAmendmentDetails = DB::table('tra_process_otherparts_auth as t1')
                    ->select('t1.part_id')
                    ->where('t1.process_id', $process_id)
                    ->get();
                //end

                $response = $this->processRenewalPremiseApprovalApplicationSubmission($application_id, $table_name, $formAmendmentDetails, $othersAmendmentDetails);
                $success = $response['success'];
                if ($success == false) {
                    echo json_encode($response);
                    exit();
                }
            }
            $this->processNormalApplicationSubmission($request);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            exit();
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            exit();
        }
    }

    public function processRenewalPremiseApprovalApplicationSubmission($application_id, $table_name, $formAmendmentDetails, $othersAmendmentDetails)
    {
        $user_id = $this->user_id;
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
                return $res;
            }
            $premise_id = $application_details->premise_id;
            $temp_details = DB::table('tra_premises')
                ->where('id', $premise_id)
                ->first();
            if (is_null($temp_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (temp)premise details!!'
                );
                return $res;
            }
            $init_premise_id = $temp_details->init_premise_id;
            $current_permit_id = $temp_details->permit_id;
            //premise log data
            $log_data = DB::table('tra_premises as t1')
                ->select(DB::raw("t1.*,t1.id as premise_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_premise_id)
                ->first();
            //todo: update renewal changes
            //1. Basic premise info
            if ($formAmendmentDetails->changed == '') {
                //No changes on basic premise info
            } else {
                $this->updateAlterationBasicDetails($formAmendmentDetails, $premise_id, $init_premise_id, $log_data);
            }
            //2. Personnel(id 2) and Business(id 3) details
            if (count($othersAmendmentDetails) > 0) {
                foreach ($othersAmendmentDetails as $othersAmendmentDetail) {
                    if ($othersAmendmentDetail->part_id == 2) {
                        //update personnel details
                        $this->updateAlterationPersonnelDetails($premise_id, $init_premise_id);
                    }
                    if ($othersAmendmentDetail->part_id == 3) {
                        //update business details
                        $this->updateAlterationBusinessDetails($premise_id, $init_premise_id);
                    }
                }
            }
            updateRenewalPermitDetails($init_premise_id, $current_permit_id, 'tra_premises');

            $res = array(
                'success' => true,
                'message' => 'Assumed Success!!'
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

    public function batchPremiseAlterationApplicationApprovalSubmission(Request $request)
    {
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name . ' as t1')
                ->join('tra_approval_recommendations as t2', 't1.application_code', '=', 't2.application_code')
                ->select('t1.*', 't2.decision_id')
                ->whereIn('t1.id', $selected_ids)
                ->get();
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
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $directive_id = $request->input('directive_id');
            $urgency = $request->input('urgency');
            $transition_params = array();
            $submission_params = array();
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            //$application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            $portal_table_name = getPortalApplicationsTable($module_id);
            //application details
            foreach ($application_details as $key => $application_detail) {
                $application_status_id = $application_detail->application_status_id;
                if ($application_detail->decision_id == 1) {
                    $portal_status_id = 10;
                    $this->updatePremiseAlterationPermitDetails($application_detail->premise_id);
                    $this->updateRegTableRecordTraIDOnApproval($application_detail, $module_id);
                } else {
                    $portal_status_id = 11;
                }
                updatePortalApplicationStatus($application_detail->id, $portal_status_id, $table_name, $portal_table_name);
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
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
                $submission_params[] = array(
                    'application_id' => $application_detail->id,
                    'view_id' => $application_detail->view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'zone_id' => $application_detail->zone_id,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'directive_id' => $directive_id,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id,
                    'is_fast_track' => $application_detail->is_fast_track
                );
                $application_codes[] = array($application_detail->application_code);
            }
            //application update
            $update_params = array(
                'workflow_stage_id' => $to_stage
                //'application_status_id' => $application_status_id
            );
            $app_update = DB::table($table_name . ' as t1')
                ->whereIn('id', $selected_ids)
                ->update($update_params);
            if ($app_update < 1) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while updating application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);
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
        return true;
    }

    public function updatePremiseAlterationPermitDetails($premise_id)
    {
        $user_id = $this->user_id;
        try {
            //get application_details
            $current_details = DB::table('tra_premises')
                ->where('id', $premise_id)
                ->first();
            if (is_null($current_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (current)premise details!!'
                );
                return $res;
            }
            $init_premise_id = $current_details->init_premise_id;
            $current_permit_id = $current_details->permit_id;
            //premise log data
            $log_data = DB::table('tra_premises as t1')
                ->select(DB::raw("t1.*,t1.id as premise_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_premise_id)
                ->first();
            $init_permit_id = $log_data->permit_id;

            $initPermitDetails = DB::table('tra_approval_recommendations as t1')
                ->select('t1.permit_no', 't1.approval_date', 't1.expiry_date')
                ->where('t1.id', $init_permit_id)
                ->first();
            $initPermitDetails = convertStdClassObjToArray($initPermitDetails);

            DB::table('tra_approval_recommendations')
                ->where('id', $current_permit_id)
                ->update($initPermitDetails);

            $res = array(
                'success' => true,
                'message' => 'Assumed Success!!'
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

    public function processAlterationPremiseApprovalApplicationSubmission($application_id, $table_name)
    {
        $user_id = $this->user_id;
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
                return $res;
            }
            $premise_id = $application_details->premise_id;
            $application_code = $application_details->application_code;
            $temp_details = DB::table('tra_premises')
                ->where('id', $premise_id)
                ->first();
            if (is_null($temp_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (temp)premise details!!'
                );
                return $res;
            }
            $init_premise_id = $temp_details->init_premise_id;
            $temp_permit_id = $temp_details->permit_id;
            //premise log data
            $log_data = DB::table('tra_premises as t1')
                ->select(DB::raw("t1.*,t1.id as premise_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_premise_id)
                ->first();
            $init_permit_id = $log_data->permit_id;
            //todo get alteration requests
            //1. Basic premise info
            $formAmendmentDetails = DB::table('tra_alt_formparts_amendments as t1')
                ->join('par_key_form_fields as t2', 't1.field_id', '=', 't2.id')
                ->select(DB::raw("GROUP_CONCAT(t2.field_name) AS changed"))
                ->where('t1.application_code', $application_code)
                ->first();
            if ($formAmendmentDetails->changed == '') {
                //No changes on basic premise info
            } else {
                $this->updateAlterationBasicDetails($formAmendmentDetails, $premise_id, $init_premise_id, $log_data);
            }
            //2. Personnel(id 2) and Business(id 3) details
            $othersAmendmentDetails = DB::table('tra_alt_otherparts_amendments as t1')
                ->select('t1.part_id')
                ->where('t1.application_code', $application_code)
                ->get();
            if (count($othersAmendmentDetails) > 0) {
                foreach ($othersAmendmentDetails as $othersAmendmentDetail) {
                    if ($othersAmendmentDetail->part_id == 2) {
                        //update personnel details
                        $this->updateAlterationPersonnelDetails($premise_id, $init_premise_id);
                    }
                    if ($othersAmendmentDetail->part_id == 3) {
                        //update business details
                        $this->updateAlterationBusinessDetails($premise_id, $init_premise_id);
                    }
                }
            }
            //update permit details
            $this->updateAlterationPermitDetails($temp_permit_id, $init_permit_id);

            $res = array(
                'success' => true,
                'message' => 'Assumed Success!!'
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

    public function updateAlterationBasicDetails($formAmendmentDetails, $premise_id, $init_premise_id, $log_data)
    {
        unset($log_data->id);
        $log_data = convertStdClassObjToArray($log_data);
        DB::table('tra_premises_log')
            ->insert($log_data);

        $amended_premise_details = DB::table('tra_premises')
            ->select(DB::raw($formAmendmentDetails->changed))
            ->where('id', $premise_id)
            ->first();
        $amended_premise_details = convertStdClassObjToArray($amended_premise_details);
        DB::table('tra_premises')
            ->where('id', $init_premise_id)
            ->update($amended_premise_details);
    }

    public function updateAlterationPersonnelDetails($temp_premise_id, $init_premise_id)
    {
        $user_id = $this->user_id;
        //initial
        $init_qry = DB::table('tra_premises_personnel')
            ->where('premise_id', $init_premise_id);
        $init_details = $init_qry->select(DB::raw("tra_premises_personnel.*,$user_id as log_by,NOW() as log_date"))
            ->get();
        $init_details = convertStdClassObjToArray($init_details);
        $log_insert = DB::table('tra_premises_personnel_log')
            ->insert($init_details);
        $init_qry->delete();
        //Temp
        $temp_qry = DB::table('tra_premises_personnel as t2')
            ->select(DB::raw("t2.temp_premise_id,t2.init_premise_id,t2.personnel_id,t2.position_id,t2.personnel_qualification_id,
            t2.start_date,t2.end_date,t2.status_id,t2.created_by,t2.altered_by,t2.created_on,t2.dola,t2.portal_id,t2.is_temporal,$init_premise_id as premise_id"))
            ->where('premise_id', $temp_premise_id);
        $temp_details = $temp_qry->get();
        $temp_details = convertStdClassObjToArray($temp_details);
        $init_insert = DB::table('tra_premises_personnel')
            ->insert($temp_details);
    }

    public function updateAlterationBusinessDetails($temp_premise_id, $init_premise_id)
    {
        $user_id = $this->user_id;
        //initial
        $init_qry = DB::table('tra_premises_otherdetails')
            ->where('premise_id', $init_premise_id);
        $init_details = $init_qry->select(DB::raw("tra_premises_otherdetails.*,$user_id as log_by,NOW() as log_date"))
            ->get();
        $init_details = convertStdClassObjToArray($init_details);
        $log_insert = DB::table('tra_premises_otherdetails_log')
            ->insert($init_details);
        $init_qry->delete();
        //Temp
        $temp_qry = DB::table('tra_premises_otherdetails as t2')
            ->select(DB::raw("t2.temp_premise_id,t2.init_premise_id,t2.business_type_id,t2.business_type_detail_id,
            t2.created_by,t2.altered_by,t2.created_on,t2.dola,t2.portal_id,t2.is_temporal,$init_premise_id as premise_id"))
            ->where('premise_id', $temp_premise_id);
        $temp_details = $temp_qry->get();
        $temp_details = convertStdClassObjToArray($temp_details);
        $init_insert = DB::table('tra_premises_otherdetails')
            ->insert($temp_details);
    }

    public function updateAlterationPermitDetails($temp_permit_id, $init_permit_id)//deprecated
    {
        //1. update signatory details of the initial permit
        //2. update other details of the temporary permit..no need
        $initUpdateQry = DB::table('tra_approval_recommendations as t1')
            ->where('t1.id', $temp_permit_id);
        /*$tempUpdateQry=DB::table('tra_approval_recommendations as t2')
            ->where('t2.id', $init_permit_id);*/

        $initPermitUpdateParams = clone $initUpdateQry
            ->select('t1.dg_signatory', 't1.permit_signatory')
            ->first();
        $initPermitUpdateParams = convertStdClassObjToArray($initPermitUpdateParams);

        /*$tempPermitUpdateParams=$tempUpdateQry
            ->select('t2.permit_no', 't2.approval_date','t2.expiry_date')
            ->first();
        $tempPermitUpdateParams = convertStdClassObjToArray($tempPermitUpdateParams);*/

        DB::table('tra_approval_recommendations')
            ->where('id', $init_permit_id)
            ->update($initPermitUpdateParams);
        /* DB::table('tra_approval_recommendations')
             ->where('id', $temp_permit_id)
             ->update($tempPermitUpdateParams);*/
    }

    //VALIDATION FUNCTIONS
    public function validatePremiseReceivingQueriedApplication($application_id)
    {
        $return_val = true;
        //for queried there should be unclosed queries
        $unclosed_queries = DB::table('checklistitems_responses as t1')
            ->join('checklistitems_queries as t2', 't1.id', '=', 't2.item_resp_id')
            ->where('t1.application_id', $application_id)
            ->where('t2.status', '<>', 4)
            ->count();
        if ($unclosed_queries < 1) {
            $return_val = false;
        }
        return $return_val;
    }

    public function validatePremiseInspectionApplication($application_code)
    {
        $return_val = true;
        //check if inspection details were captured
        $qry = DB::table('inspection_details as t1')
            ->join('inspection_inspectors as t2', 't1.id', '=', 't2.inspection_id')
            ->where('t1.application_code', $application_code);
        $count = $qry->count();
        if ($count < 1) {
            $return_val = false;
        }
        return $return_val;
    }

    public function validatePremiseApprovalApplication($application_code)
    {
        $return_val = true;
        //check if approval/recommendation details were captured
        $qry = DB::table('tra_approval_recommendations as t1')
            ->where('t1.application_code', $application_code);
        $count = $qry->count();
        if ($count < 1) {
            $return_val = false;
        }
        return $return_val;
    }

    public function savePremiseApplicationApprovalDetails(Request $request, $sub_module_id, $app_details)
    {
        $document_types = array(
            'certificate',
            'permit'
        );
        $decision_id = $request->input('decision_id');
        if ($sub_module_id == 3 || $sub_module_id == 4) {//Alteration, Cancellation
            $res = $this->savePremiseApplicationAlterationRecommendationDetails($request,$document_types);
        }else if($sub_module_id == 50){
            $res = $this->savePremiseInspectionRecommendationDetails($request,$document_types);
        } else {
            $res = $this->savePremiseApplicationRecommendationDetails($request,$document_types);
        }
        
        return $res;
    }
    public function savePremiseInspectionRecommendationDetails(Request $request,$document_types){
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $qry = DB::table($table_name)
            ->where('id', $application_id);
        $app_details = $qry->first();
        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }

        $res = array();
        try {
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details, &$res) {
                $premiseUpdateParams = array();
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $approval_recommendation_id = $request->input('approval_recommendation_id');
                $approval_remarks = $request->input('approval_remarks');
                $approved_by = $request->input('approved_by');
                $approval_date = $request->input('approval_date');
               
                $user_id = $this->user_id;
               
                $params = array(
                    'application_code' => $application_code,
                    'approval_recommendation_id' => $approval_recommendation_id,
                    'approval_remarks' => $approval_remarks,
                    'approval_date' => $approval_date,
                    'approved_by' => $approved_by
                );
                $table_name = 'tra_premiseinspection_applications';
                if (isset($id) && $id != ''){
                    //update
                    $where = array(
                        'id' => $id
                    );
                    $params['dola'] = Carbon::now();
                    $params['altered_by'] = $user_id;
                    $prev_data = getPreviousRecords($table_name, $where);
                    if ($prev_data['success'] == false) {
                        return \response()->json($prev_data);
                    }
                    
                    $res = updateRecord($table_name, $prev_data['results'], $where, $params, $user_id);
                } 
                //update to the Portal 
                if($approval_recommendation_id == 1){
                    $portal_status_id = 10;
                }
                else{
                    $portal_status_id = 11; 
                }
                updatePortalApplicationStatusWithCode($application_code, 'wb_premises_applications',$portal_status_id);

                //updateDocumentRegulatoryDetails($app_details, $document_types, $decision_id);
            }, 5);
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
    public function savePremiseApplicationRecommendationDetails(Request $request,$document_types)
    {
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $qry = DB::table($table_name)
            ->where(array('application_code'=> $application_code));
        $app_details = $qry->first();
        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
        $res = array();

    

        try {
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details,$document_types, &$res) {
                $premiseUpdateParams = array();
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = $request->input('approval_date');
                $expiry_date = $request->input('expiry_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
                $user_id = $this->user_id;
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory($process_id);
                } else {
                    $permit_signatory = $signatory;
                }
				$sub_module_id = $app_details->sub_module_id;
				$module_id = $app_details->module_id;
				$section_id = $app_details->section_id;
				if($sub_module_id == 1){
					$ref_id = 43;
				}
				else{$ref_id = 5;
					
				}
				if($decision_id == 1){
					$expiry_date =   getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$section_id);
					
				}
                $params = array(
                    'application_id' => $application_id,
                    'application_code' => $application_code,
                    'workflow_stage_id' => $workflow_stage_id,
                    'decision_id' => $decision_id,
                    'comment' => $comment,
                    'approval_date' => $approval_date,
                    'expiry_date' => $expiry_date,
                    'approved_by' => $approved_by,
                    'dg_signatory' => $dg_signatory,
                    'permit_signatory' => $permit_signatory
                );
                $premiseUpdateParams['certificate_issue_date'] = $approval_date;
                if (isset($id) && $id != '') {
                    //update
                    $where = array(
                        'id' => $id
                    );
                    $params['dola'] = Carbon::now();
                    $params['altered_by'] = $user_id;
                    $prev_data = getPreviousRecords('tra_approval_recommendations', $where);
                    if ($prev_data['success'] == false) {
                        return \response()->json($prev_data);
                    }
                    $prev_data_results = $prev_data['results'];
                    $prev_decision_id = $prev_data_results[0]['decision_id'];
                    $prev_data_results[0]['record_id'] = $id;
                    $prev_data_results[0]['update_by'] = $user_id;
                    $prev_data_results[0]['recommendation_id'] = $prev_data_results[0]['id'];
                    unset($prev_data_results[0]['id']);
                    DB::table('tra_approval_recommendations_log')
                        ->insert($prev_data_results);
						$premise_reg_no = '';
                    if ($decision_id == 1) {
						if ($app_details->sub_module_id == 2) {
							$premise_reg_no = getSingleRecordColValue('registered_premises', array('id'=>$app_details->reg_premise_id), 'registration_no');
						}
						else{
							$premise_reg_no= $app_details->reference_no;
						}
                        $premiseUpdateParams['premise_reg_no'] = $premise_reg_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        $qry->update(array('application_status_id' => 6));
                        //permit
                        if ($prev_decision_id != 1) {
                            $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, $ref_id ,$sub_module_id);
                            $params['permit_no'] = $permit_no;
                        }
                    } else {
                        $premiseUpdateParams['premise_reg_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['permit_no'] = null;
                    }
                    $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);


                } else {
                    //insert
                    $params['created_on'] = Carbon::now();
                    $params['created_by'] = $user_id;
				$premise_reg_no = '';
                    if ($decision_id == 1) {
						if ($app_details->sub_module_id == 2) {
							$premise_reg_no = getSingleRecordColValue('registered_premises', array('id'=>$app_details->reg_premise_id), 'registration_no');
						}
						else{
							$premise_reg_no= $app_details->reference_no;
						}
						
                        $premiseUpdateParams['premise_reg_no'] = $premise_reg_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        //permits
                        $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, $ref_id ,$sub_module_id);
                        $params['permit_no'] = $permit_no;
                        $qry->update(array('application_status_id' => 6));
                    } else {
                        $premiseUpdateParams['premise_reg_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['expiry_date'] = null;
                    }
                    $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                    $id = $res['record_id'];
                }
                $premiseUpdateParams['permit_id'] = $id;
               
                if($decision_id == 1){
                    $portal_status_id = 10;
                }
                else{
                    $portal_status_id = 11; 
                }
                updatePortalApplicationStatusWithCode($application_code, 'wb_premises_applications',$portal_status_id);

                if ($app_details->sub_module_id == 1 || $app_details->sub_module_id == 2) {//we only update premise validity status on new applications
                    $updates = array(
                        'validity_status_id' => $validity_status_id,
                        'registration_status_id' => $registration_status_id,
                        'registration_no' => $premise_reg_no,
                        'registration_date' => Carbon::now(),
                        'approval_date' => Carbon::now()
                    );
                    DB::table('registered_premises')
                        ->where('id', $app_details->reg_premise_id)
                        ->update($updates);
                }
                DB::table('tra_premises')
                    ->where('id', $app_details->premise_id)
                    ->update($premiseUpdateParams);
                DB::table('tra_premises_applications')
                    ->where('id', $application_id)
                    ->update(array('permit_id' => $id));
                    
                updateDocumentRegulatoryDetails($app_details, $document_types, $decision_id);
            //log application Raw data to dump table
            // \App::call('Modules\AuditReport\Http\Controllers\AuditReportController@logPremiseApplicationDetails',[$application_id]);

            }, 5);

            
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

    public function savePremiseApplicationAlterationRecommendationDetails(Request $request)
    {
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $qry = DB::table($table_name)
            ->where('id', $application_id);
        $app_details = $qry->first();
        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
        $res = array();
        try {
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details, &$res) {
                //$premiseUpdateParams = array();
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = $request->input('approval_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
                $user_id = $this->user_id;
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory($process_id);
                } else {
                    $permit_signatory = $signatory;
                }
                $params = array(
                    'application_id' => $application_id,
                    'application_code' => $application_code,
                    'workflow_stage_id' => $workflow_stage_id,
                    'decision_id' => $decision_id,
                    'comment' => $comment,
                    'approval_date' => $approval_date,
                    'approved_by' => $approved_by,
                    'dg_signatory' => $dg_signatory,
                    'permit_signatory' => $permit_signatory
                );
                if (isset($id) && $id != '') {
                    //update
                    $where = array(
                        'id' => $id
                    );
                    $params['dola'] = Carbon::now();
                    $params['altered_by'] = $user_id;
                    $prev_data = getPreviousRecords('tra_approval_recommendations', $where);
                    if ($prev_data['success'] == false) {
                        return \response()->json($prev_data);
                    }
                    $prev_data_results = $prev_data['results'];
                    $prev_data_results[0]['record_id'] = $id;
                    $prev_data_results[0]['update_by'] = $user_id;
                    $prev_data_results[0]['recommendation_id'] = $prev_data_results[0]['id'];
                    unset($prev_data_results[0]['id']);
                    DB::table('tra_approval_recommendations_log')
                        ->insert($prev_data_results);
                    if ($decision_id == 1) {
                        $validity_status_id = 3;
                        $registration_status_id = 4;
                        $qry->update(array('application_status_id' => 6));
                    } else {
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        $qry->update(array('application_status_id' => 7));
                    }
                    $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                } else {
                    //insert
                    $params['created_on'] = Carbon::now();
                    $params['created_by'] = $user_id;
                    if ($decision_id == 1) {
                        $validity_status_id = 3;
                        $registration_status_id = 4;
                        $qry->update(array('application_status_id' => 6));
                    } else {
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        $qry->update(array('application_status_id' => 7));
                    }
                    $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                    $id = $res['record_id'];
                }
                if ($app_details->sub_module_id == 4) {//cancellation applications, change premise statuses
                    DB::table('registered_premises')
                        ->where('id', $app_details->reg_premise_id)
                        ->update(array('validity_status_id' => $validity_status_id, 'registration_status_id' => $registration_status_id));
                }
                if($decision_id == 1){
                    $portal_status_id = 10;
                }
                else{
                    $portal_status_id = 11; 
                }
                updatePortalApplicationStatusWithCode($application_code, 'wb_premises_applications',$portal_status_id);

                DB::table('tra_premises')
                    ->where('id', $app_details->premise_id)
                    ->update(array('permit_id' => $id));
            }, 5);
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
    public function savePremisesOnlinereceiceinvoiceDetails(Request $request){
        $res = array();
        $app_status_id = '';
		
        $application_code = $request->input('application_code');
        $status_type_id = $request->input('status_type_id');
        $app_exists = recordExists('tra_premises_applications', array('application_code' => $application_code));
        if (!$app_exists) {
            $is_invoiceprocess = true;
           
            $res = $this->saveInitialPremiseOnlineApplicationDetails($request, $app_status_id, true);
		
   
			$details = $res['details'];
			$application_id = $details['application_id'];
			$application_code = $details['application_code'];
			$tracking_no = $details['tracking_no'];
			$is_fast_track = $details['is_fast_track'];
            $res = $this->saveApplicationInvoicingDetails($request,$application_id,$application_code,$tracking_no,$is_fast_track);

            DB::commit();

        }else{
            //update the details 
            $is_portal_update = 0;
            $res = $this->updatePremiseOnlineApplicationDetailsOnMIS($request, 4,$is_portal_update); 
			
			$details = $res['details'];
			$application_id = $details['application_id'];
			$application_code = $details['application_code'];
			$tracking_no = $details['tracking_no'];
			$is_fast_track = $details['is_fast_track'];
            $res = $this->saveApplicationInvoicingDetails($request,$application_id,$application_code,$tracking_no,$is_fast_track);

            DB::commit();
        }
    
    return   $res ; 


    }
    public function savePremiseOnlineApplicationDetails(Request $request)
    {
        $application_code = $request->input('application_code');
        $status_type_id = $request->input('status_type_id');
        $has_queries = $request->input('has_queries');//take care of initial pre checking queries
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $res = array();
        $statusDetails = getPortalApplicationInitialStatus($module_id, $status_type_id);
        $app_status_id = $statusDetails->status_id;

        $app_exists = recordExists('tra_premises_applications', array('application_code' => $application_code));
        if ($app_exists) {//update
            if ($status_type_id == 2) {//Pre checking query response
               /* if ($this->hasUnclosedStructuredQueries($application_code)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Please close all raised queries to proceed!!'
                    );
                } else {
                   
                }
				*/
				 $res = $this->updatePremiseOnlineApplicationDetailsOnMIS($request, 4);
            } else if ($status_type_id == 3) {//Manager query response
                $res = $this->updatePremiseOnlineApplicationDetailsOnMIS($request, 8);
            }else{
                $res = $this->updatePremiseOnlineApplicationDetailsOnMIS($request, 4);
            }

        } else {//insertion
            if ($has_queries == 1) {
                $app_status_id = 2;
            }
            $res = $this->saveInitialPremiseOnlineApplicationDetails($request, $app_status_id, false);
        }
        return $res;
		
    }

    public function saveInitialPremiseOnlineApplicationDetails(Request $request, $static_appstatus_id = '',$is_invoiceprocess = false)
    {
        $next_stage = $request->input('curr_stage_id');
        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_premises_applications as t1')
                ->where('id', $application_id);
            $results = $qry->first();
            if (is_null($results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                );
                return $res;
            }
            $portal_application_id = $results->id;
            //process/workflow details
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $process_details = getTableData('wf_tfdaprocesses', $where);
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting process details, consult System Admin!!'
                );
                return $res;
            }
            $workflow_details = getTableData('wf_workflow_stages', array('id' => $next_stage));
            if (is_null($workflow_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                );
                return $res;
            }
            //$ref_no = $results->reference_no;
            $tracking_no = $results->tracking_no;
            $sub_module_id = $results->sub_module_id;
            $view_id = generateApplicationViewID();
            $application_code = $results->application_code;// generateApplicationCode($sub_module_id, 'tra_premises_applications');
            //applicant details
            $applicant_details = $portal_db->table('wb_trader_account')
                ->where('id', $results->trader_id)
                ->first();
            if (is_null($applicant_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                );
                return $res;
            }$identification_no = $applicant_details->identification_no;
                $has_queries = $request->input('has_queries');
            $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
            $applicant_email = $applicant_details->email;
            //premise main details
            $premise_details = $portal_db->table('wb_premises')
                ->where('id', $results->premise_id)
                ->first();
            if (is_null($premise_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting premise details, consult System Admin!!'
                );
                return $res;
            }
            $reg_premise_id = $premise_details->registered_id;
            $premise_details->portal_id = $results->premise_id;
            $premise_details->created_by = $this->user_id;
            $premise_details = convertStdClassObjToArray($premise_details);
            unset($premise_details['id']);
			unset($premise_details['applicant_id']);
            unset($premise_details['trader_id']);
            unset($premise_details['mis_dola']);
            unset($premise_details['mis_altered_by']);
            $prem_insert = insertRecord('tra_premises', $premise_details, $user_id);
            if ($prem_insert['success'] == false) {
                DB::rollBack();
                return $prem_insert;
            }
            $premise_id = $prem_insert['record_id'];
            //premise other details
            $premise_otherdetails = $portal_db->table('wb_premises_otherdetails')
                ->where('premise_id', $results->premise_id)
                ->select(DB::raw("id as portal_id,$premise_id as premise_id,business_type_id,business_type_detail_id,$user_id as created_by"))
                ->get();
            $premise_otherdetails = convertStdClassObjToArray($premise_otherdetails);
            $premise_otherdetails = unsetPrimaryIDsInArray($premise_otherdetails);
            DB::table('tra_premises_otherdetails')
                ->insert($premise_otherdetails);
            //premise personnel details
            $premise_personneldetails = $portal_db->table('wb_premises_personnel')
                ->where('premise_id', $results->premise_id)
                ->select(DB::raw("id as portal_id,$premise_id as premise_id,personnel_id,position_id,qualification_id,start_date,end_date,status_id,$user_id as created_by,
                         registration_no,study_field_id,institution"))
                ->get();
            $premise_personneldetails = convertStdClassObjToArray($premise_personneldetails);
            $premise_personneldetails = unsetPrimaryIDsInArray($premise_personneldetails);
            DB::table('tra_premises_personnel')
                ->insert($premise_personneldetails);
            if ($sub_module_id == 3) {//Alteration
                $this->syncApplicationOnlineVariationRequests($application_code);
            }
            if ($sub_module_id == 4) {//Withdrawal
                $this->syncApplicationOnlineWithdrawalReasons($application_code);
            }
            //application details
            if (validateIsNumeric($static_appstatus_id)) {
                $app_status_id = $static_appstatus_id;
            } else {
                $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                $app_status_id = $app_status->status_id;
            }
			$zone_id = $results->zone_id;
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
            $application_details = array(
                //'reference_no' => $ref_no,
                'tracking_no' => $tracking_no,
                'view_id' => $view_id,
                'applicant_id' => $applicant_id,
                'application_code' => $application_code,
                'premise_id' => $premise_id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'process_id' => $process_details->id,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'date_received' => Carbon::now(),
                'received_by' => $user_id,
                'portal_id' => $portal_application_id,
                'investment_capital'=>$results->investment_capital,
                'paying_currency_id' => $results->paying_currency_id,
                'is_fast_track' => $results->is_fast_track
            );
            
            $application_insert = insertRecord('tra_premises_applications', $application_details, $user_id);
            if ($application_insert['success'] == false) {
                DB::rollBack();
                return $application_insert;
            }
            $mis_application_id = $application_insert['record_id'];
            if ($sub_module_id == 1) {
                $reg_params = array(
                    'tra_premise_id' => $premise_id,
                    'registration_status_id' => 1,
                    'validity_status_id' => 1,
                    'created_by' => $user_id
                );
                //should apply only to new applications
                createInitialRegistrationRecord('registered_premises', 'tra_premises_applications', $reg_params, $mis_application_id, 'reg_premise_id');
            } else {
                DB::table('tra_premises_applications')
                    ->where('id', $mis_application_id)
                    ->update(array('reg_premise_id' => $reg_premise_id));
            }//action_id
			$portal_status_id = 3;
            $rec = DB::table('wf_workflow_transitions as t1')
                                        ->join('wf_workflow_actions as t2', 't1.action_id','t2.id')
										->join('wf_workflow_stages as t3', 't1.stage_id','t3.id')
                                        ->select('portal_status_id')
                                        ->where(array('t1.stage_id'=>$next_stage,'t3.stage_status'=>1) )
                                        ->first();
										 if($rec){
                                $portal_status_id = $rec->portal_status_id;
                            }
                           
			if($is_invoiceprocess){
				 $portal_status_id =4;
			}
			
                     
            $portal_where = array(
                'id' => $portal_application_id
            );
			$portal_params = array(
                'application_status_id' => $portal_status_id 
            );
            updatePortalParams('wb_premises_applications', $portal_params, $portal_where);
            $details = array(
                'application_id' => $application_insert['record_id'],
				'mis_application_id' => $application_insert['record_id'],
                'application_code' => $application_code,
                 'is_fast_track' => $results->is_fast_track,
                'tracking_no' => $tracking_no,
                'application_status' => $application_status,
                'process_id' => $process_details->id,
                'process_name' => $process_details->name,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'workflow_stage' => $workflow_details->name,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id,
                'premise_id' => $premise_id,
                'applicant_id' => $applicant_id
            );
            if($is_invoiceprocess == false){
                    $submission_params = array(
                            'application_id' => $application_insert['record_id'],
                            'view_id' => $view_id,
                            'process_id' => $process_details->id,
                            'application_code' => $application_code,
                            'tracking_no' => $tracking_no,
                            'usr_from' => $user_id,
                            'usr_to' => $responsible_user,
                            'previous_stage' => $workflow_details->id,
                            'current_stage' => $workflow_details->id,
                            'module_id' => $results->module_id,
                            'sub_module_id' => $results->sub_module_id,
                            'section_id' => $results->section_id,
                            'application_status_id' => $app_status_id,
                            'urgency' => $urgency,
                            'applicant_id' => $applicant_id,
                            'zone_id' => $zone_id,
                            'remarks' => $comment,
                            'date_received' => Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id,
                            'is_fast_track'=>$results->is_fast_track
                        );
                        DB::table('tra_submissions')
                            ->insert($submission_params);
							 $vars = array(
								'{tracking_no}' => $tracking_no
							);
							if($portal_status_id == 6 || $portal_status_id == 8){
								$vars = array(
									'{tracking_no}' => $tracking_no
								);
								onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
							}
							onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
                }
                else{
                    $res = $this->saveApplicationInvoicingDetails($request,$mis_application_id,$application_code,$tracking_no,$results->is_fast_track);
    
                }
            DB::commit();
            //send email
           
            $res = array(
                'success' => true,
                'details' => $details,
                'message' => 'Application saved successfully in the MIS!!'
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
        return $res;
    }

    public function updatePremiseOnlineApplicationDetailsOnMIS(Request $request, $app_status_id = 4,$is_portal_update= 1)
    {
        $next_stage = $request->input('curr_stage_id');
        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_premises_applications as t1')
                ->where('id', $application_id);
            $results = $qry->first();
            if (is_null($results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                );
                return $res;
            }
            $portal_application_id = $results->id;
            //MIS results
            $mis_results = DB::table('tra_premises_applications')
                ->where('portal_id', $application_id)
                ->first();
            if (is_null($mis_results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting MIS application details, consult System Admin!!'
                );
                return $res;
            }
            $mis_application_id = $mis_results->id;
            $mis_premise_id = $mis_results->premise_id;
            $ref_no = $mis_results->reference_no;
            //process/workflow details
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $process_details = getTableData('wf_tfdaprocesses', $where);
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting process details, consult System Admin!!'
                );
                return $res;
            }
            $workflow_details = getTableData('wf_workflow_stages', array('id' => $next_stage));
            if (is_null($workflow_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                );
               return $res;
				$workflow_stage_id = '';
            }
			else{
				
				$workflow_stage_id = $workflow_details->id;
			}
			
            $tracking_no = $results->tracking_no;
            $sub_module_id = $results->sub_module_id;
            $view_id = $mis_results->view_id;
            $application_code = $results->application_code;
            //applicant details
            $applicant_details = $portal_db->table('wb_trader_account')
                ->where('id', $results->trader_id)
                ->first();
            if (is_null($applicant_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                );
                return $res;
            }
			
            $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
            $applicant_email = $applicant_details->email;
            //premise main details
            $premise_details = $portal_db->table('wb_premises')
                ->where('id', $results->premise_id)
                ->first();
            if (is_null($premise_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting premise details, consult System Admin!!'
                );
                return $res;
            }

            $premise_details = convertStdClassObjToArray($premise_details);
           
            $premise_details['altered_by'] = $this->user_id;
            $premise_details['dola'] = Carbon::now();
            unset($premise_details['id']);
			unset($premise_details['applicant_id']);
            unset($premise_details['trader_id']);
            unset($premise_details['mis_dola']);
            unset($premise_details['mis_altered_by']);
            unset($premise_details['init_premise_id']);
            unset($premise_details['registered_id']);
            DB::table('tra_premises')
                ->where('id', $mis_premise_id)
                ->update($premise_details);
            $premise_id = $mis_premise_id;
            //premise other details...delete insert
            $premise_otherdetails = $portal_db->table('wb_premises_otherdetails')
                ->where('premise_id', $results->premise_id)
                ->select(DB::raw("id as portal_id,$premise_id as premise_id,business_type_id,business_type_detail_id,$user_id as created_by"))
                ->get();
            $premise_otherdetails = convertStdClassObjToArray($premise_otherdetails);
            $premise_otherdetails = unsetPrimaryIDsInArray($premise_otherdetails);
            DB::table('tra_premises_otherdetails')
                ->where('premise_id', $mis_premise_id)
                ->delete();
            DB::table('tra_premises_otherdetails')
                ->insert($premise_otherdetails);
            //premise personnel details...delete insert
            $premise_personneldetails = $portal_db->table('wb_premises_personnel')
                ->where('premise_id', $results->premise_id)
                ->select(DB::raw("id as portal_id,$premise_id as premise_id,personnel_id,position_id,qualification_id,start_date,end_date,status_id,$user_id as created_by,
                         registration_no,study_field_id,institution"))
                ->get();
            $premise_personneldetails = convertStdClassObjToArray($premise_personneldetails);
            $premise_personneldetails = unsetPrimaryIDsInArray($premise_personneldetails);
            DB::table('tra_premises_personnel')
                ->where('premise_id', $mis_premise_id)
                ->delete();
            DB::table('tra_premises_personnel')
                ->insert($premise_personneldetails);
            if ($sub_module_id == 3) {//Alteration
                // $this->syncApplicationOnlineVariationRequests($application_code);
            }
            if ($sub_module_id == 4) {//Withdrawal
                // $this->syncApplicationOnlineWithdrawalReasons($application_code);
            }
            //application details
            //$app_status_id = 4;//$app_status->status_id;
			$zone_id = $results->zone_id;
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
            $application_details = array(
                'applicant_id' => $applicant_id,
                'application_code' => $application_code,
                'premise_id' => $premise_id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'process_id' => $process_details->id,
                'workflow_stage_id' => $workflow_stage_id,
                'application_status_id' => $app_status_id,
                'portal_id' => $portal_application_id,
                'date_received' => Carbon::now(),
                'received_by' => $user_id,
                'paying_currency_id' => $results->paying_currency_id,
                'is_fast_track' => $results->is_fast_track
            );
            DB::table('tra_premises_applications')
                ->where('id', $mis_application_id)
                ->update($application_details);

          $rec = DB::table('wf_workflow_transitions as t1')
                                        ->join('wf_workflow_actions as t2', 't1.action_id','t2.id')
										->join('wf_workflow_stages as t3', 't1.stage_id','t3.id')
                                        ->select('portal_status_id')
                                        ->where(array('nextstage_id'=>$next_stage,'t3.stage_status'=>1) )
                                        ->first();
                            $portal_status_id = 3;
                            if($rec){
                                $portal_status_id = $rec->portal_status_id;
                            }
           
			$portal_params = array(
                'application_status_id' => $portal_status_id 
            );
            $portal_where = array(
                'id' => $portal_application_id
            );
			
            if($is_portal_update == 1){
                updatePortalParams('wb_premises_applications', $portal_params, $portal_where);
                $submission_params = array(
                    'application_id' => $mis_application_id,
                    'view_id' => $view_id,
                    'process_id' => $process_details->id,
                    'application_code' => $application_code,
                    'reference_no' => $ref_no,
                    'tracking_no' => $tracking_no,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $workflow_details->id,
                    'current_stage' => $workflow_details->id,
                    'module_id' => $results->module_id,
                    'sub_module_id' => $results->sub_module_id,
                    'section_id' => $results->section_id,
                    'application_status_id' => $app_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $applicant_id,
                    'zone_id' => $zone_id,
                    'remarks' => $comment,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id,
                    'is_fast_track' => $results->is_fast_track
                );
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            
            $details = array(
                'application_id' => $mis_application_id,
                'mis_application_id' => $mis_application_id,
                'application_code' => $application_code,
                    'is_fast_track' => $results->is_fast_track,
                'tracking_no' => $tracking_no,
                'application_status' => $application_status,
                'process_id' => $process_details->id,
                'process_name' => $process_details->name,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'workflow_stage' => $workflow_details->name,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id,
                'premise_id' => $premise_id,
                'applicant_id' => $applicant_id
            );
            //submissions
            
            DB::commit();
            //send email
            $vars = array(
                '{tracking_no}' => $tracking_no
            );
			
            onlineApplicationNotificationMail(2, $applicant_email, $vars);
            $res = array(
                'success' => true,
                'details' => $details,
                'message' => 'Application submitted successfully!!'
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
        return $res;
    }

    public function receiveApplicationManagerQueryResponse(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $module_id = $request->input('module_id');
        $to_stage = $request->input('next_stage');
        $responsible_user = $request->input('responsible_user');
        $comment = $request->input('comment');
        $urgency = $request->input('urgency');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('application_code', $application_code)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_status_id = 8;//Manager Query Response
            $where = array(
                'application_code' => $application_code
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
           $rec = DB::table('wf_workflow_transitions as t1')
                                        ->join('wf_workflow_actions as t2', 't1.action_id','t2.id')
										->join('wf_workflow_stages as t3', 't1.stage_id','t3.id')
                                        ->select('portal_status_id')
                                        ->where(array('nextstage_id'=>$next_stage,'t3.stage_status'=>1) )
                                        ->first();
                            $portal_status_id = 3;
                            if($rec){
                                $portal_status_id = $rec->portal_status_id;
                            }
           
			$portal_params = array(
                'application_status_id' => $portal_status_id 
            );
            $portal_where = array(
                'id' => $portal_application_id
            );
           
            $portal_table = getPortalApplicationsTable($module_id);
            updatePortalParams($portal_table, $portal_params, $portal_where);
            //transitions
            $transition_params = array(
                'application_id' => $application_details->id,
                'application_code' => $application_code,
                'application_status_id' => $application_status_id,
                'process_id' => $application_details->process_id,
                'from_stage' => $application_details->workflow_stage_id,
                'to_stage' => $to_stage,
                'author' => $user_id,
                'remarks' => $comment,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions
            $submission_params = array(
                'application_id' => $application_details->id,
                'view_id' => $application_details->view_id,
                'process_id' => $application_details->process_id,
                'application_code' => $application_code,
                'reference_no' => $application_details->reference_no,
                'tracking_no' => $application_details->tracking_no,
                'zone_id' => $application_details->zone_id,
                'usr_from' => $user_id,
                'usr_to' => $responsible_user,
                'previous_stage' => $application_details->workflow_stage_id,
                'current_stage' => $to_stage,
                'module_id' => $application_details->module_id,
                'sub_module_id' => $application_details->sub_module_id,
                'section_id' => $application_details->section_id,
                'application_status_id' => $application_status_id,
                'urgency' => $urgency,
                'applicant_id' => $application_details->applicant_id,
                'remarks' => $comment,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id,
                'is_fast_track' => $application_details->is_fast_track
            );
            DB::table('tra_submissions')
                ->insert($submission_params);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application sent successfully to the receiving officer!!'
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
        return $res;
    }

    public function getPremiseInvoiceDetails($application_code)
    {
        $qry = DB::table('tra_premises_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('tra_premises as t3', 't1.premise_id', '=', 't3.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            
            ->join('tra_application_invoices as t6', 't1.application_code', '=', 't6.application_code')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,t6.id as invoice_id,
                     CONCAT_WS(', ',t3.name,t3.physical_address) as module_desc"))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        return $invoice_details;
    }

}