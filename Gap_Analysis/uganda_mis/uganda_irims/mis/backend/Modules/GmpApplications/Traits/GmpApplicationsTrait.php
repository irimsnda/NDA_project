<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 12/19/2018
 * Time: 3:24 PM
 */

namespace Modules\GmpApplications\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait GmpApplicationsTrait
{

    public function getGmpApplicationTrackingCodes($sub_module_id, $appCodeDetails, $table_name)
    {
        if ($sub_module_id == 6) {//renewal
            $initial_ref_no = DB::table($table_name)
                ->where('reg_site_id', $appCodeDetails->reg_site_id)
                ->where('sub_module_id', 5)
                ->value('reference_no');
            $alt_counter = DB::table($table_name)
                ->where('reg_site_id', $appCodeDetails->reg_site_id)
                ->where('sub_module_id', 6)
                ->count();
            $alt_count = $alt_counter + 1;
            $codes_array = array(
                'prev_refno' => $initial_ref_no,
                'alt_count' => $alt_count
            );
        } else {
            $zone_id = $appCodeDetails->zone_id;
            $gmp_type_id = $appCodeDetails->gmp_type_id;
            $section_id = $appCodeDetails->section_id;
            //reference number codes
            $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
            $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
            $gmp_code = getSingleRecordColValue('par_gmplocation_details', array('id' => $gmp_type_id), 'location_code');
            $codes_array = array(
                'section_code' => $section_code,
                'zone_code' => $zone_code,
                'gmp_type' => $gmp_code
            );
        }
        return $codes_array;
    }

    public function getGmpApplicationReferenceCodes($sub_module_id, $application_details, $table_name)
    {
        if ($sub_module_id == 6) {//renewal
            $initial_ref_no = DB::table($table_name)
                ->where('reg_site_id', $application_details->reg_site_id)
                ->where('sub_module_id', 5)
                ->value('reference_no');
            $alt_counter = DB::table($table_name)
                ->where('reg_site_id', $application_details->reg_site_id)
                ->where('id', '<>', $application_details->id)
                ->where('sub_module_id', 6)
                ->count();
            $alt_count = $alt_counter + 1;
            $codes_array = array(
                'prev_refno' => $initial_ref_no,
                'alt_count' => $alt_count
            );
        } else {
            $zone_id = $application_details->zone_id;
            $gmp_type_id = $application_details->gmp_type_id;
            $section_id = $application_details->section_id;
            //reference number codes
            $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
            $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
            $gmp_code = getSingleRecordColValue('par_gmplocation_details', array('id' => $gmp_type_id), 'location_code');
            $codes_array = array(
                'section_code' => $section_code,
                'zone_code' => $zone_code,
                'gmp_type' => $gmp_code
            );
        }
        return $codes_array;
    }

    public function processGmpApplicationsSubmission(Request $request)
    {
        $action = $request->input('action');
        $application_id = $request->input('application_id');
        $sub_module_id = $request->input('sub_module_id');
        $module_id = $request->input('module_id');
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $user_id = $this->user_id;
        $table_name = $request->input('table_name');
        
			if($table_name == ''){
				$table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
				$table_name = $table_name;
				
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
        $portal_id = $application_details->portal_id;
        $reference_no = $application_details->reference_no;
        //todo get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;
        if ($action_details->generate_refno == 1) {
           if ($refno_generated != 1 && ($reference_no == '' or is_null($reference_no))) {

                $codes_array = $this->getGmpApplicationReferenceCodes($sub_module_id, $application_details, $table_name);
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
            $proceed = updatePortalApplicationStatus($application_id, $portal_status_id, $table_name, 'wb_gmp_applications');
            if ($proceed == false) {
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
        } else {
            $this->processNormalApplicationSubmission($request, $keep_status);
        }
    }

    public function processGmpManagersApplicationSubmission(Request $request)
    {
        $action = $request->input('action');
        $sub_module_id = $request->input('sub_module_id');
        //get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;
        $approval_submission = $action_details->is_approval_submission;
        if ($approval_submission == 1) {
            if ($sub_module_id == 5) {//todo New Applications
                $this->processNewApprovalApplicationSubmission($request, $keep_status);
            } else if ($sub_module_id == 6) {//todo Renewal Applications
                $this->processSubsequentApprovalApplicationSubmission($request);
                //$this->batchGmpApplicationApprovalSubmission($request);
            } else if ($sub_module_id == 40) {//todo Alteration Applications
                $this->processSubsequentApprovalApplicationSubmission($request);
                //$this->batchGmpApplicationApprovalSubmission($request);
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
        } else if ($action_type == 10) {//Lead Inspectors TCM Recommendation
            $this->processTCMSchedulingToLeadInspectorsApplicationSubmission($request);
        } else {
            $this->processNormalManagersApplicationSubmission($request, $keep_status,$action_type);
        }
    }

    public function processTCMSchedulingToLeadInspectorsApplicationSubmission($request, $keep_status = false)
    {
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->whereIn('id', $selected_ids)
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
            // DB::transaction(function () use ($request, $selected_ids, &$res, $table_name, $user_id, $application_id, $process_id, $application_details, $process_details) {
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $action = $request->input('action');
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
            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            //application details
            foreach ($application_details as $key => $application_detail) {
                if ($keep_status == true) {
                    $application_status_id = $application_detail->application_status_id;
                }
                $lead_inspector = $this->_getLeadInspector($application_detail->application_code);
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
                    'usr_from' => $user_id,
                    'usr_to' => $lead_inspector,
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
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id
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
        exit();
    }

    function _getLeadInspector($application_code)
    {
        $lead_inspector = 0;
        $qry = DB::table('assigned_gmpinspections as t1')
            ->join('gmp_inspectorsdetails as t2', 't1.inspection_id', '=', 't2.inspection_id')
            ->where('t2.role_id', '=', 2)
            ->where('t1.application_code', $application_code);
        $results = $qry->first();
        if ($results) {
            $lead_inspector = $results->inspector_id;
        }
        return $lead_inspector;
    }

    public function saveGmpApplicationApprovalDetails(Request $request, $sub_module_id, $app_details)
    {
        $decision_id = $request->input('decision_id');
        if ($sub_module_id == 39 || $sub_module_id == 40) {//Withdrawal, Alteration
            $res = $this->saveGmpApplicationAlterationRecommendationDetails($request);
        } else {
            $res = $this->saveGmpApplicationRecommendationDetails($request);
        }
        $document_types = array(
            'certificate'
        );
        updateDocumentRegulatoryDetails($app_details, $document_types, $decision_id);
        return $res;
    }

    public function saveGmpApplicationRecommendationDetails(Request $request)
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
                $siteUpdateParams = array();
                $permit_no = '';
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = $request->input('approval_date');
                //$expiry_date = $request->input('expiry_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
                $user_id = $this->user_id;
                $expiry_date = '';
                if ($decision_id == 1) {
                    $expiry_date = getApplicationExpiryDate($approval_date, $app_details->sub_module_id, $app_details->module_id, $app_details->section_id);
                    if ($expiry_date == '') {
                        $res = array(
                            'success' => false,
                            'message' => 'Expiry date not set, contact system administrator!!'
                        );
                        return $res;
                    }
                }
               
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory();
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
                    'expiry_date' => $expiry_date,
                    'approved_by' => $approved_by,
                    'dg_signatory' => $dg_signatory,
                    'permit_signatory' => $permit_signatory
                );
                //$siteUpdateParams['certificate_issue_date'] = $approval_date;
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
						$sub_module_id = $app_details->sub_module_id;
						if($sub_module_id == 1){
							$ref_id = 43;
						}
						else{$ref_id = 5;
							
						}
                    if ($decision_id == 1) {
                        //$siteUpdateParams['premise_reg_no'] = $app_details->reference_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        $qry->update(array('application_status_id' => 6));
                        //permit
                        if ($prev_decision_id != 1) {
                            //$permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 10,$sub_module_id);
							$permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 10 ,$app_details->sub_module_id);
                            $params['permit_no'] = $permit_no;
                        }
                    } else {
                        //$siteUpdateParams['premise_reg_no'] = null;
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
                    if ($decision_id == 1) {
                        //$siteUpdateParams['premise_reg_no'] = $app_details->reference_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        //permits
                        $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 10,$app_details->sub_module_id);
                        $params['permit_no'] = $permit_no;
                        $qry->update(array('application_status_id' => 6));
                    } else {
                        //$siteUpdateParams['premise_reg_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['expiry_date'] = null;
                    }
                    $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                    $id = $res['record_id'];
                }
                $siteUpdateParams['permit_id'] = $id;
                //$prev_records = getPreviousRecords('tra_premises', array('id' => $app_details->premise_id));
                $sub_module_id = $app_details->sub_module_id;
                if (  $sub_module_id == 5 || $sub_module_id == 6) {//we only update site validity status on new applications
                    $updates = array(
                        'validity_status_id' => $validity_status_id,
                        'registration_status_id' => $registration_status_id,
                        'registration_no' => $permit_no,
                        'expiry_date' => $expiry_date,
                        'approval_date' => $approval_date
                    );
                    if($decision_id == 1){
                        $updates['registration_date'] = $approval_date;
                    }
                    DB::table('registered_manufacturing_sites')
                        ->where('id', $app_details->reg_site_id)
                        ->update($updates);
                }
                if($decision_id == 1){
                    $portal_status_id = 10;
                }
                else{
                    $portal_status_id = 11; 
                }
                updatePortalApplicationStatusWithCode($application_code, 'wb_gmp_applications',$portal_status_id);

                DB::table('tra_manufacturing_sites')
                    ->where('id', $app_details->manufacturing_site_id)
                    ->update($siteUpdateParams);
                DB::table('tra_gmp_applications')
                    ->where('id', $application_id)
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

    public function saveGmpApplicationAlterationRecommendationDetails(Request $request)
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
                    if ($app_details->sub_module_id == 39) {
                        if ($decision_id == 1) {
                            saveNotification($application_id, 1, $app_details->module_id, 1, $app_details->section_id, '', $user_id);
                        } else {
                            deleteNotification($application_id, 1, $app_details->module_id, 1);
                        }
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
                if($decision_id == 1){
                    $portal_status_id = 10;
                }
                else{
                    $portal_status_id = 11; 
                }
                updatePortalApplicationStatusWithCode($application_code, 'wb_gmp_applications',$portal_status_id);

                if ($app_details->sub_module_id == 39) {//withdrawal applications, change site statuses
                    DB::table('registered_manufacturing_sites')
                        ->where('id', $app_details->reg_site_id)
                        ->update(array('validity_status' => $validity_status_id, 'registration_status' => $registration_status_id));
                    if ($decision_id == 1) {
                        saveNotification($application_id, 1, $app_details->module_id, 1, $app_details->section_id, '', $user_id);
                    }
                }
                DB::table('tra_manufacturing_sites')
                    ->where('id', $app_details->manufacturing_site_id)
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

    public function batchGmpApplicationApprovalSubmission(Request $request)
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
                $application_status_id = $application_detail->application_status_id;
                if ($application_detail->decision_id == 1) {
                    $portal_status_id = 10;
                    $this->updateRegistrationTable($application_detail->reg_site_id, $application_detail->manufacturing_site_id, $module_id);
                    /*$response = $this->processRenewalGmpApprovalApplicationSubmission($application_detail->id, $table_name, $formAmendmentDetails, $othersAmendmentDetails, $gmp_type_id);
                    $success = $response['success'];
                    if ($success == false) {
                        DB::rollBack();
                        echo json_encode($response);
                        exit();
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

    public function processRenewalGmpApprovalApplicationSubmission($application_id, $table_name, $formAmendmentDetails, $othersAmendmentDetails, $gmp_type_id)
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
            $site_id = $application_details->manufacturing_site_id;
            $temp_details = DB::table('tra_manufacturing_sites')
                ->where('id', $site_id)
                ->first();
            if (is_null($temp_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (temp)site details!!'
                );
                return $res;
            }
            $init_site_id = $temp_details->init_site_id;
            $current_permit_id = $temp_details->permit_id;
            //site log data
            $log_data = DB::table('tra_manufacturing_sites as t1')
                ->select(DB::raw("t1.*,t1.id as manufacturing_site_id_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_site_id)
                ->first();
            //todo: update renewal changes
            //1. Basic premise info
            if ($gmp_type_id == 1) {
                if ($formAmendmentDetails->changed == '') {
                    //No changes on basic premise info
                } else {
                    $this->updateGmpAlterationBasicDetails($formAmendmentDetails, $site_id, $init_site_id, $log_data);
                }
            }
            //2. Personnel(id 5) and Business(id 6) details
            if (count($othersAmendmentDetails) > 0) {
                foreach ($othersAmendmentDetails as $othersAmendmentDetail) {
                    if ($othersAmendmentDetail->part_id == 5) {
                        //update personnel details
                        $this->updateGmpAlterationPersonnelDetails($site_id, $init_site_id);
                    }
                    if ($othersAmendmentDetail->part_id == 6) {
                        //update business details
                        $this->updateGmpAlterationBusinessDetails($site_id, $init_site_id);
                    }
                }
            }
            updateRenewalPermitDetails($init_site_id, $current_permit_id, 'tra_manufacturing_sites');

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

    public function updateGmpProductLineDetails($site_id, $init_site_id)
    {
        $mainQry = DB::table('gmp_product_details');

        $currentQry = clone $mainQry;
        $currentQry->where('manufacturing_site_id', $site_id);

        $initialQry = clone $mainQry;
        $initialQry->where('manufacturing_site_id', $init_site_id);
        $backup_records = clone $initialQry;
        $backup_records = $backup_records->get();
        $backup_records = convertStdClassObjToArray($backup_records);
        $delete_init = clone $initialQry;

    }

    public function updateGmpAlterationBasicDetails($formAmendmentDetails, $site_id, $init_site_id, $log_data)
    {
        unset($log_data->id);
        $log_data = convertStdClassObjToArray($log_data);
        DB::table('tra_manufacturing_sites_log')
            ->insert($log_data);

        $amended_premise_details = DB::table('tra_manufacturing_sites')
            ->select(DB::raw($formAmendmentDetails->changed))
            ->where('id', $site_id)
            ->first();
        $amended_premise_details = convertStdClassObjToArray($amended_premise_details);
        DB::table('tra_manufacturing_sites')
            ->where('id', $init_site_id)
            ->update($amended_premise_details);
    }

    public function updateGmpAlterationPersonnelDetails($temp_site_id, $init_site_id)
    {
        $user_id = $this->user_id;
        //initial
        $init_qry = DB::table('tra_manufacturing_sites_personnel')
            ->where('manufacturing_site_id', $init_site_id);
        $init_details = $init_qry->select(DB::raw("tra_manufacturing_sites_personnel.*,$user_id as log_by,NOW() as log_date"))
            ->get();
        $init_details = convertStdClassObjToArray($init_details);
        $log_insert = DB::table('tra_mansites_personnel_log')
            ->insert($init_details);
        $init_qry->delete();
        //Temp
        $temp_qry = DB::table('tra_manufacturing_sites_personnel as t2')
            ->select(DB::raw("t2.init_site_id,t2.name,t2.telephone,t2.position_id,t2.status_id,t2.email_address,t2.postal_address,
            t2.fax,t2.created_by,t2.altered_by,t2.created_on,t2.dola,$init_site_id as manufacturing_site_id"))
            ->where('manufacturing_site_id', $temp_site_id);
        $temp_details = $temp_qry->get();
        $temp_details = convertStdClassObjToArray($temp_details);
        $init_insert = DB::table('tra_manufacturing_sites_personnel')
            ->insert($temp_details);
    }

    public function updateGmpAlterationBusinessDetails($temp_site_id, $init_site_id)
    {
        $user_id = $this->user_id;
        //initial
        $init_qry = DB::table('tra_mansite_otherdetails')
            ->where('manufacturing_site_id', $init_site_id);
        $init_details = $init_qry->select(DB::raw("tra_mansite_otherdetails.*,$user_id as log_by,NOW() as log_date"))
            ->get();
        $init_details = convertStdClassObjToArray($init_details);
        $log_insert = DB::table('tra_mansite_otherdetails_log')
            ->insert($init_details);
        $init_qry->delete();
        //Temp
        $temp_qry = DB::table('tra_mansite_otherdetails as t2')
            ->select(DB::raw("t2.init_site_id,t2.business_type_id,t2.business_type_detail_id,
            t2.created_by,t2.altered_by,t2.created_on,t2.dola,t2.portal_id,$init_site_id as manufacturing_site_id"))
            ->where('manufacturing_site_id', $temp_site_id);
        $temp_details = $temp_qry->get();
        $temp_details = convertStdClassObjToArray($temp_details);
        $init_insert = DB::table('tra_mansite_otherdetails')
            ->insert($temp_details);
    }
    public function saveGmpOnlinereceiceinvoiceDetails(Request $request)
    {
        $application_code = $request->input('application_code');
        $status_type_id = $request->input('status_type_id');
        $has_queries = $request->input('has_queries');//take care of initial pre checking queries
        $res = array();
        $app_status_id = '';
       

        $is_portalupdate = 0;
        $app_exists = recordExists('tra_gmp_applications', array('application_code' => $application_code));
        if ($app_exists) {//update
            $res = $this->updateGmpOnlineApplicationDetailsOnMIS($request, 1, $is_portalupdate);
			$rec = DB::table('tra_gmp_applications')->where(array('application_code'=>$application_code))->first();
            if($rec){
                $mis_application_id = $rec->id;
                $tracking_no = $rec->tracking_no;
                $is_fast_track = $rec->is_fast_track;
                $res = $this->saveApplicationInvoicingDetails($request,$mis_application_id,$application_code,$tracking_no,$is_fast_track);
            
            }
        } else {//insertion
            if ($has_queries == 1) {
                $app_status_id = 2;
            }
            $res = $this->saveInitialGmpOnlineApplicationDetails($request, $app_status_id,$is_portalupdate,true);
		
            $rec = DB::table('tra_gmp_applications')->where(array('application_code'=>$application_code))->first();
            if($rec){
                $mis_application_id = $rec->id;
                $tracking_no = $rec->tracking_no;
                $is_fast_track = $rec->is_fast_track;
                $res = $this->saveApplicationInvoicingDetails($request,$mis_application_id,$application_code,$tracking_no,$is_fast_track);
              
            }
        }

		DB::commit();
        return $res;
    }
   

    public function saveGmpOnlineApplicationDetails(Request $request)
    {
        $application_code = $request->input('application_code');
        $status_type_id = $request->input('status_type_id');
        $has_queries = $request->input('has_queries');//take care of initial pre checking queries
        $res = array();
        $app_status_id = '';
        $app_exists = recordExists('tra_gmp_applications', array('application_code' => $application_code));
        if ($app_exists) {//update
            if ($status_type_id == 2) {//Pre checking query response
                if ($this->hasUnclosedStructuredQueries($application_code)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Please close all raised queries to proceed!!'
                    );
                } else {
                    $res = $this->updateGmpOnlineApplicationDetailsOnMIS($request, 4);
                }
            } else{
                $res = $this->updateGmpOnlineApplicationDetailsOnMIS($request, 1);
            }
        } else {//insertion
            if ($has_queries == 1) {
                $app_status_id = 2;
            }
            $res = $this->saveInitialGmpOnlineApplicationDetails($request, $app_status_id);
			DB::commit();
        }

        return $res;
    }

    public function saveInitialGmpOnlineApplicationDetails(Request $request, $static_appstatus_id = '', $is_portalupdate = 1,$is_invoiceprocess= false)
    {
        $next_stage = $request->input('next_stage');
        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;
        $next_stage = $request->input('curr_stage_id');

        DB::beginTransaction();
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_gmp_applications as t1')
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
            $sub_module_id = $results->sub_module_id;
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
            $tracking_no = $results->tracking_no;
            $view_id = generateApplicationViewID();
            $application_code = $results->application_code;
            //applicant details
            $applicant_details = $portal_db->table('wb_trader_account')
                ->where('id', $results->applicant_id)
                ->first();
            if (is_null($applicant_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                );
                return $res;
            }
            $identification_no = $applicant_details->identification_no;
            $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
            $applicant_email = $applicant_details->email;
            //site main details
            $site_details = $portal_db->table('wb_manufacturing_sites')
                ->where('id', $results->manufacturing_site_id)
                ->first();
            if (is_null($site_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting site details, consult System Admin!!'
                );
                return $res;
            }
            $reg_site_id = $site_details->registered_id;
            $ltr_details = $portal_db->table('wb_trader_account')
                ->where('id', $site_details->ltr_id)
                ->first();
            if (is_null($ltr_details)) {
               	$ltr_id =0;
            }
			else{
				$ltr_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $ltr_details->identification_no), 'id');
			}
			
            

            $site_details->portal_id = $results->manufacturing_site_id;
            $site_details->applicant_id = $applicant_id;
            $site_details->ltr_id = $ltr_id;
            $site_details->created_by = $this->user_id;
            $site_details = convertStdClassObjToArray($site_details);
            unset($site_details['id']);
            unset($site_details['premise_id']);
            unset($site_details['mis_dola']);
            unset($site_details['mis_altered_by']);
            $site_insert = insertRecord('tra_manufacturing_sites', $site_details, $user_id);
            if ($site_insert['success'] == false) {
                DB::rollBack();
                return $site_insert;
            }
            $site_id = $site_insert['record_id'];
            //site other details
            $site_otherdetails = $portal_db->table('wb_mansite_otherdetails')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,business_type_id,business_type_detail_id,$user_id as created_by"))
                ->get();
            $site_otherdetails = convertStdClassObjToArray($site_otherdetails);
            DB::table('tra_mansite_otherdetails')
                ->insert($site_otherdetails);
            //site personnel details
            $site_personneldetails = $portal_db->table('wb_manufacturing_sites_personnel')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,personnel_id,position_id,qualification_id,start_date,end_date,status_id,$user_id as created_by,
                         registration_no,study_field_id,institution"))
                ->get();
            $site_personneldetails = convertStdClassObjToArray($site_personneldetails);
            DB::table('tra_manufacturing_sites_personnel')
                ->insert($site_personneldetails);
            //site block details
            $site_blockdetails = $portal_db->table('wb_manufacturingsite_blocks')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,name,activities,$user_id as created_by"))
                ->get();
            $site_blockdetails = convertStdClassObjToArray($site_blockdetails);
            DB::table('tra_manufacturing_sites_blocks')
                ->insert($site_blockdetails);
            //product line details
            $site_productdetails = $portal_db->table('wb_gmp_productline_details')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,manufacturingsite_block_id,product_line_id,category_id,prodline_description,$user_id as created_by"))
                ->get();
            foreach ($site_productdetails as $key => $site_productdetail) {
                $site_productdetails[$key]->manufacturingsite_block_id = getSingleRecordColValue('tra_manufacturing_sites_blocks', array('portal_id' => $site_productdetail->manufacturingsite_block_id), 'id');
            }
            $site_productdetails = convertStdClassObjToArray($site_productdetails);
            DB::table('gmp_productline_details')
                ->insert($site_productdetails);
            //GMP product details
            /* $gmp_productdetails = $portal_db->table('wb_product_gmpinspectiondetails')
                 ->where('manufacturing_site_id', $results->manufacturing_site_id)
                 ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,product_id,reg_product_id,reg_site_id,gmp_productline_id,
                     $user_id as created_by,NOW() as created_on"))
                 ->get();
             foreach ($gmp_productdetails as $key => $gmp_productdetail) {
                 $gmp_productdetails[$key]->gmp_productline_id = getSingleRecordColValue('gmp_productline_details', array('portal_id' => $gmp_productdetail->gmp_productline_id), 'id');
             }
             $gmp_productdetails = convertStdClassObjToArray($gmp_productdetails);
             DB::table('tra_product_gmpinspectiondetails')
                 ->insert($gmp_productdetails);*/

            if ($sub_module_id == 39) {//Withdrawal
                $this->syncApplicationOnlineWithdrawalReasons($application_code);
            }
            if ($sub_module_id == 40) {//Alteration
                $this->syncApplicationOnlineVariationRequests($application_code);
            }
            //application details
            if (validateIsNumeric($static_appstatus_id)) {
                $app_status_id = $static_appstatus_id;
            } else {
                $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                $app_status_id = $app_status->status_id;
            }
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
            $application_details = array(
                'view_id' => $view_id,
                'tracking_no' => $tracking_no,
                'applicant_id' => $applicant_id,
                'application_code' => $application_code,
                'manufacturing_site_id' => $site_id,
                'gmp_type_id' => $results->gmp_type_id,
                'assessment_type_id' => $results->assessment_type_id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'process_id' => $process_details->id,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'portal_id' => $portal_application_id,
                'date_received' => Carbon::now(),
                'received_by' => $user_id,
                'paying_currency_id' => $results->paying_currency_id,
                'is_fast_track' => $results->is_fast_track
            );
            $application_insert = insertRecord('tra_gmp_applications', $application_details, $user_id);
            if ($application_insert['success'] == false) {
                DB::rollBack();
                return $application_insert;
            }
			
            $mis_application_id = $application_insert['record_id'];
            if ($sub_module_id == 5) {
                $reg_params = array(
                    'tra_site_id' => $site_id,
                    'registration_status_id' => 1,
                    'validity_status_id' => 1,
                    'created_by' => $user_id
                );
                //should apply only to new applications
                $reg_site_id = createInitialRegistrationRecord('registered_manufacturing_sites', 'tra_gmp_applications', $reg_params, $mis_application_id, 'reg_site_id');
            } else {
                DB::table('tra_gmp_applications')
                    ->where('id', $mis_application_id)
                    ->update(array('reg_site_id' => $reg_site_id));
            }
            //GMP product details
            $gmp_productdetails = $portal_db->table('wb_product_gmpinspectiondetails')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,product_id,reg_product_id,$reg_site_id as reg_site_id,gmp_productline_id,
                    $user_id as created_by,NOW() as created_on"))
                ->get();
            foreach ($gmp_productdetails as $key => $gmp_productdetail) {
                $gmp_productdetails[$key]->gmp_productline_id = getSingleRecordColValue('gmp_productline_details', array('portal_id' => $gmp_productdetail->gmp_productline_id), 'id');
            }
            $gmp_productdetails = convertStdClassObjToArray($gmp_productdetails);
            DB::table('tra_product_gmpinspectiondetails')
                ->insert($gmp_productdetails);
            //end
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
							if($is_invoiceprocess){
				 $portal_status_id =4;
			}
			else{
				 $portal_status_id = 3;
			}
                 
			$portal_params = array(
                'application_status_id' => $portal_status_id 
            );
            
            $portal_where = array(
                'id' => $portal_application_id
            );
           
            $details = array(
                'application_id' => $application_insert['record_id'],
                'application_code' => $application_code,
                'application_status' => $application_status,
                'process_id' => $process_details->id,
                'process_name' => $process_details->name,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'workflow_stage' => $workflow_details->name,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id,
                'premise_id' => $site_id,
                'manufacturing_id' => $site_id,
                'applicant_id' => $applicant_id
            );
            //submissions
            if($is_portalupdate == 1){
                     updatePortalParams('wb_gmp_applications', $portal_params, $portal_where);
                    $submission_params = array(
                        'application_id' => $application_insert['record_id'],
                        'view_id' => $view_id,
                        'process_id' => $process_details->id,
                        'application_code' => $application_code,
                        //'reference_no' => $ref_no,
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
                        'remarks' => $comment,
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id,
                        'is_fast_track' => $results->is_fast_track
                    );
                    DB::table('tra_submissions')
                        ->insert($submission_params);
                    
                    //send email
                    $vars = array(
                        '{tracking_no}' => $tracking_no
                    );
                    onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
            }
           
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

    public function updateGmpOnlineApplicationDetailsOnMIS(Request $request, $app_status_id = 4,$is_portalupdate=1)
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
            $qry = $portal_db->table('wb_gmp_applications as t1')
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
            $sub_module_id = $results->sub_module_id;
            //MIS results
            $mis_results = DB::table('tra_gmp_applications')
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
            $mis_site_id = $mis_results->manufacturing_site_id;
            $reg_site_id = $mis_results->reg_site_id;
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
            $tracking_no = $results->tracking_no;
            $view_id = $mis_results->view_id;
            $application_code = $results->application_code;
            //applicant details
            $applicant_details = $portal_db->table('wb_trader_account')
                ->where('id', $results->applicant_id)
                ->first();
            if (is_null($applicant_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                );
                return $res;
            }
            $identification_no =$applicant_details->identification_no;
            $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
            $applicant_email = $applicant_details->email;
            //site main details
            $site_details = $portal_db->table('wb_manufacturing_sites')
                ->where('id', $results->manufacturing_site_id)
                ->first();
            if (is_null($site_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting site details, consult System Admin!!'
                );
                return $res;
            }
            $ltr_details = $portal_db->table('wb_trader_account')
                ->where('id', $results->local_agent_id)
                ->first();
            if (is_null($ltr_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting LTR details, consult System Admin!!'
                );
                return $res;
            }
			
            $ltr_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $ltr_details->identification_no), 'id');

            $site_details->portal_id = $results->manufacturing_site_id;
            $site_details->applicant_id = $applicant_id;
            $site_details->ltr_id = $ltr_id;
            $site_details->created_by = $this->user_id;
            $site_details = convertStdClassObjToArray($site_details);
            unset($site_details['id']);
            unset($site_details['premise_id']);
            unset($site_details['mis_dola']);
            unset($site_details['mis_altered_by']);

            DB::table('tra_manufacturing_sites')
                ->where('id', $mis_site_id)
                ->update($site_details);
            $site_id = $mis_site_id;
            //site other details..delete insert
            $site_otherdetails = $portal_db->table('wb_mansite_otherdetails')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,business_type_id,business_type_detail_id,$user_id as created_by"))
                ->get();
            $site_otherdetails = convertStdClassObjToArray($site_otherdetails);
            DB::table('tra_mansite_otherdetails')
                ->where('manufacturing_site_id', $mis_site_id)
                ->delete();
            DB::table('tra_mansite_otherdetails')
                ->insert($site_otherdetails);
            //site block details
            $site_blockdetails = $portal_db->table('wb_manufacturingsite_blocks')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,name,activities,$user_id as created_by"))
                ->get();
            $site_blockdetails = convertStdClassObjToArray($site_blockdetails);
            DB::table('tra_manufacturing_sites_blocks')
                ->where('manufacturing_site_id', $mis_site_id)
                ->delete();
            DB::table('tra_manufacturing_sites_blocks')
                ->insert($site_blockdetails);
            //site personnel details
            $site_personneldetails = $portal_db->table('wb_manufacturing_sites_personnel')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,personnel_id,position_id,qualification_id,start_date,end_date,status_id,$user_id as created_by,
                         registration_no,study_field_id,institution"))
                ->get();
            $site_personneldetails = convertStdClassObjToArray($site_personneldetails);
            DB::table('tra_manufacturing_sites_personnel')
                ->where('manufacturing_site_id', $mis_site_id)
                ->delete();
            DB::table('tra_manufacturing_sites_personnel')
                ->insert($site_personneldetails);
            //product line details
            $site_productdetails = $portal_db->table('wb_gmp_productline_details')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,manufacturingsite_block_id,product_line_id,category_id,prodline_description,$user_id as created_by"))
                ->get();
            foreach ($site_productdetails as $key => $site_productdetail) {
                $site_productdetails[$key]->manufacturingsite_block_id = getSingleRecordColValue('tra_manufacturing_sites_blocks', array('portal_id' => $site_productdetail->manufacturingsite_block_id), 'id');
            }
            $site_productdetails = convertStdClassObjToArray($site_productdetails);
            DB::table('gmp_productline_details')
                ->where('manufacturing_site_id', $mis_site_id)
                ->delete();
            DB::table('gmp_productline_details')
                ->insert($site_productdetails);
            //GMP product details
		
            $gmp_productdetails = $portal_db->table('wb_product_gmpinspectiondetails')
                ->where('manufacturing_site_id', $results->manufacturing_site_id)
                ->select(DB::raw("id as portal_id,$site_id as manufacturing_site_id,product_id,reg_product_id,$reg_site_id as reg_site_id,gmp_productline_id,
                    $user_id as created_by,NOW() as created_on"))
                ->get();
            foreach ($gmp_productdetails as $key => $gmp_productdetail) {
                $gmp_productdetails[$key]->gmp_productline_id = getSingleRecordColValue('gmp_productline_details', array('portal_id' => $gmp_productdetail->gmp_productline_id), 'id');
            }
            $gmp_productdetails = convertStdClassObjToArray($gmp_productdetails);
            DB::table('tra_product_gmpinspectiondetails')
                ->where('manufacturing_site_id', $mis_site_id)
                ->delete();
            DB::table('tra_product_gmpinspectiondetails')
                ->insert($gmp_productdetails);
            if ($sub_module_id == 39) {//Withdrawal
                //$this->syncApplicationOnlineWithdrawalReasons($application_code);
            }
            if ($sub_module_id == 40) {//Alteration
                //$this->syncApplicationOnlineVariationRequests($application_code);
            }
            //application details
            //$app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
            //$app_status_id = $app_status->status_id;
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
				
            $application_details = array(
                'applicant_id' => $applicant_id,
                'application_code' => $application_code,
                'manufacturing_site_id' => $site_id,
                'gmp_type_id' => $results->gmp_type_id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'process_id' => $process_details->id,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'portal_id' => $portal_application_id,
                'date_received' => Carbon::now(),
                'received_by' => $user_id,
                'paying_currency_id' => $results->paying_currency_id,
                'is_fast_track' => $results->is_fast_track
            );
            DB::table('tra_gmp_applications')
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
			
          
		
            $details = array(
                'application_id' => $mis_application_id,
                'application_code' => $application_code,
                'application_status' => $application_status,
                'process_id' => $process_details->id,
                'process_name' => $process_details->name,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'workflow_stage' => $workflow_details->name,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id,
                'premise_id' => $site_id,
                'manufacturing_id' => $site_id,
                'applicant_id' => $applicant_id
            );
            //submissions
            if($is_portalupdate == 1){
                updatePortalParams('wb_gmp_applications', $portal_params, $portal_where);
                $submission_params = array(
                    'application_id' => $mis_application_id,
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
                    'remarks' => $comment,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id,
                    'is_fast_track' => $results->is_fast_track
                );
                DB::table('tra_submissions')
                    ->insert($submission_params);
                    $vars = array(
                        '{tracking_no}' => $tracking_no
                    );
                    onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
            }
           
            DB::commit();
            //send email
            
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

    public function getGmpInvoiceDetails($application_code)
    {
        $qry = DB::table('tra_gmp_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('tra_manufacturing_sites as t3', 't1.manufacturing_site_id', '=', 't3.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            
            ->join('tra_application_invoices as t6', 't1.application_code', '=', 't6.application_code')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,t6.id as invoice_id,
                     CONCAT_WS(', ',t3.name,t3.physical_address) as module_desc"))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        return $invoice_details;
    }

}