<?php

namespace Modules\PharmacovigilanceReporting\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait PharmacovigilanceReportingTraits
{

    public function getPharmacovigilanceReportingApplicationReferenceCodes($application_details)
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

    public function processPharmacovigilanceReportingApplicationsSubmission(Request $request)
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
        $zone_id = 2;
        $refno_generated = $application_details->refno_generated;
        $portal_id = $application_details->portal_id;
        //todo get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;

        if ($action_details->generate_refno == 1) {
            if ($refno_generated != 1) {
                $codes_array = $this->getPharmacovigilanceReportingApplicationReferenceCodes($application_details);
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
            }
        }
        if ($action_details->update_portal_status == 1) {
            $portal_status_id = $action_details->portal_status_id;
            $proceed = updatePortalApplicationStatus($application_id, $portal_status_id, $table_name, 'wb_clinical_trial_applications');
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
    public function processPharmacovigilanceReportingManagersApplicationSubmission(Request $request)
    {
        $action = $request->input('action');
        $sub_module_id = $request->input('sub_module_id');
        //get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;
        $approval_submission = $action_details->is_approval_submission;
     
        if ($approval_submission == 1) {
            if ($sub_module_id == 10) {//todo New Applications
                $this->processNewApprovalApplicationSubmission($request, $keep_status);
            } else if ($sub_module_id == 11) {//todo Amendment Applications
                $this->processSubsequentApprovalApplicationSubmission($request);
            } else {
                $res = array(
                    'success' => false,
                    'message' => 'Unknown sub module selected!!'
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

    public function savePharmacovigilanceReportingApplicationApprovalDetails(Request $request, $sub_module_id, $app_details)
    {
		
        $application_id = $request->input('application_id');
		$table_name = $request->input('table_name');
		$qry = DB::table($table_name)
            ->where('id', $application_id);
        $app_details = $qry->first();

        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return response()->json($res);
        }
        $decision_id = $request->input('decision_id');
        $res = $this->savePharmacovigilanceReportingApplicationRecommendationDetails($request);
        $document_types = array(
            'certificate'
        );
		
        updateDocumentRegulatoryDetails($app_details, $document_types, $decision_id);
        return $res;
    }

    public function savePharmacovigilanceReportingApplicationRecommendationDetails(Request $request)
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
				$reg_clinical_trial_id = $app_details->reg_clinical_trial_id;
                $expiry_date = getPermitExpiryDate($approval_date, $app_details->study_duration, $app_details->duration_desc);
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
                    'expiry_date' => $expiry_date,
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
                    $prev_decision_id = $prev_data_results[0]['decision_id'];
                    $prev_data_results[0]['update_by'] = $user_id;
                    $prev_data_results[0]['recommendation_id'] = $prev_data_results[0]['id'];
                    unset($prev_data_results[0]['id']);
                    DB::table('tra_approval_recommendations_log')
                        ->insert($prev_data_results);

                    if ($decision_id == 1) {
                        $qry->update(array('application_status_id' => 6));
                        //permit
                        if ($prev_decision_id != 1) {
                            $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 13, 10);
                            $params['permit_no'] = $permit_no;
                        }
						$registration_status = 2;
						$validity_status = 2;
                    } else {
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['permit_no'] = null;
						
						$registration_status = 3;
						$validity_status = 3;
                    }

                    $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                } else {
                    //insert
                    $params['created_on'] = Carbon::now();
                    $params['created_by'] = $user_id;
                    if ($decision_id == 1) {
                        //permits
                        $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 13, 10);
                        $params['permit_no'] = $permit_no;
                        $qry->update(array('application_status_id' => 6));
						$registration_status = 2;
						$validity_status = 2;
                    } else {
                        $premiseUpdateParams['premise_reg_no'] = null;
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['expiry_date'] = null;
						$registration_status = 3;
						$validity_status = 3;
                    }
                    $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                    $id = $res['record_id'];
                }
				$where_statement= array('id'=>$reg_clinical_trial_id);
                //save the registered application details 
				 $registration_data = array(
                    'registration_status' => $registration_status,
                    'validity_status' => $validity_status,
					'tra_clinical_trial_id'=>$app_details->id,
                    'created_by' => $user_id
                );
                $res = saveApplicationRegistrationDetails('registered_clinical_trials',$registration_data,$where_statement,$user_id);
                if($decision_id == 1){
                    $portal_status_id = 10;
                }
                else{
                    $portal_status_id = 11; 
                }
                updatePortalApplicationStatusWithCode($application_code, 'wb_clinical_trial_applications',$portal_status_id);

                DB::table('tra_clinical_trial_applications')
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

   

}