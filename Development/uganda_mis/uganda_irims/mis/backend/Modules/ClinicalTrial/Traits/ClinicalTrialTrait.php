<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 1/23/2019
 * Time: 11:06 AM
 */

namespace Modules\ClinicalTrial\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait ClinicalTrialTrait
{

    public function getClinicalTrialApplicationReferenceCodes($application_details)
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

    public function processClinicalTrialApplicationsSubmission(Request $request)
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
        $portal_id = $application_details->portal_id;
        //todo get workflow action details
        $action_details = $this->getApplicationWorkflowActionDetails($action);
        $keep_status = $action_details->keep_status;
        $action_type = $action_details->action_type_id;

        if ($action_details->generate_refno == 1) {
            if ($refno_generated != 1) {
                $codes_array = $this->getClinicalTrialApplicationReferenceCodes($application_details);
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
                updatePortalParams('wb_clinical_trial_applications', $portal_params, $portal_where);
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
    public function processClinicalTrialManagersApplicationSubmission(Request $request)
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

    public function saveClinicalTrialApplicationApprovalDetails(Request $request, $sub_module_id, $app_details)
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
        $res = $this->saveClinicalTrialApplicationRecommendationDetails($request);
        $document_types = array(
            'certificate'
        );
		
        updateDocumentRegulatoryDetails($app_details, $document_types, $decision_id);
        return $res;
    }

    public function saveClinicalTrialApplicationRecommendationDetails(Request $request)
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
                            $certificate_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 13, 10);
                            $params['certificate_no'] = $certificate_no;
                        }
						$registration_status = 2;
						$validity_status = 2;
                    } else {
                        $qry->update(array('application_status_id' => 7));
                        $params['certificate_no'] = '';
                        $params['certificate_no'] = null;
						
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
                        $certificate_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 13, 10);
                        $params['certificate_no'] = $certificate_no;
                        $qry->update(array('application_status_id' => 6));
						$registration_status = 2;
						$validity_status = 2;
                    } else {
                        $premiseUpdateParams['premise_reg_no'] = null;
                        $qry->update(array('application_status_id' => 7));
                        $params['certificate_no'] = '';
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

    public function saveClinicalTrialOnlineApplicationDetails(Request $request)
    {
        $application_code = $request->input('application_code');
        $status_type_id = $request->input('status_type_id');
        $sub_module_id = $request->input('sub_module_id');
        $has_queries = $request->input('has_queries');//take care of initial pre checking queries
        $res = array();
        $app_status_id = '';

        
            $app_exists = recordExists('tra_clinical_trial_applications', array('application_code' => $application_code));
            if ($app_exists) {//update
             
                if ($status_type_id == 2) {//Pre checking query response
                    if ($this->hasUnclosedStructuredQueries($application_code)) {
                        $res = array(
                            'success' => false,
                            'message' => 'Please close all raised queries to proceed!!'
                        );
                    } else {
                        $res = $this->updateClinicalTrialOnlineApplicationDetailsOnMIS($request, 4);
                    }
                } else if ($status_type_id == 3) {//Manager query response
                    $res = $this->updateClinicalTrialOnlineApplicationDetailsOnMIS($request, 8);
                }else{
                      $res = $this->updateClinicalTrialOnlineApplicationDetailsOnMIS($request, $app_status_id,false);
                }
            } else {//insertion
                if ($has_queries == 1) {
                    $app_status_id = 2;
                }
                
                $res = $this->saveInitialClinicalTrialOnlineApplicationDetails($request, $app_status_id, false);
            }
    

       
        
        return $res;
    }
    public function saveClinicalOnlinereceiceinvoiceDetails(Request $request){
        $res = array();
            $app_status_id = '';
            $application_code = $request->input('application_code');
            $status_type_id = $request->input('status_type_id');
            $app_exists = recordExists('tra_clinical_trial_applications', array('application_code' => $application_code));
            if (!$app_exists) {
                $is_invoiceprocess = true;
                $res = $this->saveInitialClinicalTrialOnlineApplicationDetails($request,$app_status_id,true);
                
            }
        
        
        return   $res ; 
    }
    
   
    public function saveInitialClinicalTrialOnlineApplicationDetails(Request $request,$static_appstatus_id = '',$is_invoiceprocess = false)
    {
        $next_stage = $request->input('next_stage');
        $portal_application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;
        $portal_db = DB::connection('portal_db');
        DB::beginTransaction();
        $portal_db->beginTransaction();
        $next_stage = $request->input('curr_stage_id');

        try {
            $qry = $portal_db->table('wb_clinical_trial_applications as t1')
                ->where('id', $portal_application_id);
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
                $portal_db->rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                );
                return $res;
            }
            $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
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
                'reg_clinical_trial_id' => $results->reg_clinical_trial_id,
                'application_code' => $application_code,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'process_id' => $process_details->id,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'portal_id' => $portal_application_id,
                'date_received' => Carbon::now(),
                'sponsor_id' => $results->sponsor_id,
                'investigator_id' => $results->investigator_id,
                'study_title' => $results->study_title,
                'protocol_no' => $results->protocol_no,
                'version_no' => $results->version_no,
                'date_of_protocol' => $results->date_of_protocol,
                'clearance_no' => $results->clearance_no,
                'study_duration' => $results->study_duration,
                'duration_desc' => $results->duration_desc,
                'received_by' => $user_id,
                'paying_currency_id' => $results->paying_currency_id,
                'clinical_prodsection_id' => $results->clinical_prodsection_id,
                'phase_id' => $results->phase_id,
                'is_fast_track' => $results->is_fast_track

            );
            $application_insert = insertRecord('tra_clinical_trial_applications', $application_details, $user_id);
            if ($application_insert['success'] == false) {
                DB::rollBack();
                $portal_db->rollBack();
                return $application_insert;
            }
            $mis_application_id = $application_insert['record_id'];
            if ($sub_module_id == 10) {
                $reg_params = array(
                    'tra_clinical_trial_id' => $mis_application_id,
                    'registration_status' => 1,
                    'validity_status' => 1,
                    'created_by' => $user_id
                );
                //should apply only to new applications
                createInitialRegistrationRecord('registered_clinical_trials', 'tra_clinical_trial_applications', $reg_params, $mis_application_id, 'reg_clinical_trial_id');
            }
            //study sites details
            $site_details = $portal_db->table('wb_clinical_trial_sites')
                ->select(DB::raw("id as portal_id,$mis_application_id as application_id,study_site_id,approving_instution,responsible_ethics_committee,approval_date,application_reference_no,
                NOW() as created_on,$user_id as created_by"))
                ->where('application_id', $results->id)
                ->get();
            $site_details = convertStdClassObjToArray($site_details);
            $site_details = unsetPrimaryIDsInArray($site_details);
            DB::table('clinical_trial_sites')
                ->insert($site_details);
            //investigators
            $investigator_details = $portal_db->table('wb_clinical_trial_investigators')
                ->select(DB::raw("id as portal_id,$mis_application_id as application_id,category_id,investigator_id,
                study_site_id,NOW() as created_on,$user_id as created_by"))
                ->where('application_id', $results->id)
                ->get();
            $investigator_details = convertStdClassObjToArray($investigator_details);
            $investigator_details = unsetPrimaryIDsInArray($investigator_details);
            DB::table('clinical_trial_investigators')
                ->insert($investigator_details);
            //IMP products section_id
            //monitors
            $monitors_details = $portal_db->table('wb_clinical_trial_monitors')
            ->select(DB::raw("id as portal_id,$mis_application_id as application_id,monitor_id,
            NOW() as created_on,$user_id as created_by"))
            ->where('application_id', $results->id)
            ->get();
            $monitors_details = convertStdClassObjToArray($monitors_details);
            $monitors_details = unsetPrimaryIDsInArray($monitors_details);
            DB::table('tra_clinical_trial_monitors')
                ->insert($monitors_details);
            //end monitors

            $product_details = $portal_db->table('wb_clinical_trial_products')
                ->select(DB::raw("id as portal_id,$mis_application_id as application_id,product_category_id,brand_name
                registration_no,registration_date,identification_mark,product_desc,market_location_id,dosage_form_id,country_id,
                common_name_id,manufacturer_id,routes_of_admin_id,product_strength,si_unit_id,classification_id,gmdn_code,gmdn_term,device_type_id,investigationproduct_section_id,gmdn_category,
                NOW() as created_on,$user_id as created_by"))
                ->where('application_id', $results->id)
                ->get();
            $product_details = convertStdClassObjToArray($product_details);
            $product_details = unsetPrimaryIDsInArray($product_details);
            foreach ($product_details as $product_detail) {
                $mis_product_id = DB::table('clinical_trial_products')
                    ->insertGetId($product_detail);
                //product ingredients
                $ingredient_details = $portal_db->table('wb_impproduct_ingredients')
                    ->select(DB::raw("id as portal_id,$mis_product_id as product_id,ingredient_id,ingredient_type_id,specification_id,strength,si_unit_id,
                      inclusion_reason_id,NOW() as created_on,$user_id as created_by"))
                    ->where('product_id', $product_detail['portal_id'])
                    ->get();
                if(count($ingredient_details) > 0){
                        $ingredient_details = convertStdClassObjToArray($ingredient_details);
                        $ingredient_details = unsetPrimaryIDsInArray($ingredient_details);
                        DB::table('impproduct_ingredients')
                            ->insert($ingredient_details);
                }
               
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
            updatePortalParams('wb_clinical_trial_applications', $portal_params, $portal_where);
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
                'applicant_id' => $applicant_id
            );
            //submissions
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
                        'remarks' => $comment,
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id,
                        'is_fast_track'=>$results->is_fast_track
                    );
                    DB::table('tra_submissions')
                        ->insert($submission_params);
            }
            else{
                $res = $this->saveApplicationInvoicingDetails($request,$mis_application_id,$application_code,$tracking_no,$results->is_fast_track);

            }
            DB::commit();
            $portal_db->commit();
            $res = array(
                'success' => true,
                'details' => $details,
                'message' => 'Application saved successfully in the MIS!!'
            );
        } catch (\Exception $exception) {
            DB::rollBack();
            $portal_db->rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $portal_db->rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    public function updateClinicalTrialOnlineApplicationDetailsOnMIS(Request $request, $app_status_id)
    {
        $next_stage = $request->input('next_stage');
        $portal_application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;
        $portal_db = DB::connection('portal_db');
        DB::beginTransaction();
        $portal_db->beginTransaction();
        try {
            $qry = $portal_db->table('wb_clinical_trial_applications as t1')
                ->where('id', $portal_application_id);
            $results = $qry->first();
            if (is_null($results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                );
                return $res;
            }
			$sub_module_id = $results->sub_module_id;
            $portal_application_id = $results->id;
            $application_code = $results->application_code;
            //MIS results
            $mis_results = DB::table('tra_clinical_trial_applications')
                ->where('portal_id', $portal_application_id)
                ->first();
            if (is_null($mis_results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting MIS application details, consult System Admin!!'
                );
                return $res;
            }
            $mis_application_id = $mis_results->id;
            $view_id = $mis_results->view_id;
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
            }
            $tracking_no = $results->tracking_no;

            //applicant details
            $applicant_details = $portal_db->table('wb_trader_account')
                ->where('id', $results->applicant_id)
                ->first();
            if (is_null($applicant_details)) {
                DB::rollBack();
                $portal_db->rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting applicant details, consult System Admin!!'
                );
                return $res;
            }
            $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
            $application_details = array(
                'applicant_id' => $applicant_id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'process_id' => $process_details->id,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'portal_id' => $portal_application_id,
                'date_received' => Carbon::now(),
                'sponsor_id' => $results->sponsor_id,
                'investigator_id' => $results->investigator_id,
                'study_title' => $results->study_title,
                'protocol_no' => $results->protocol_no,
                'version_no' => $results->version_no,
                'date_of_protocol' => $results->date_of_protocol,
                'clearance_no' => $results->clearance_no,
                'study_duration' => $results->study_duration,
                'duration_desc' => $results->duration_desc,
                'received_by' => $user_id,
                'paying_currency_id' => $results->paying_currency_id,
                'is_fast_track' => $results->is_fast_track

            );
            DB::table('tra_clinical_trial_applications')
                ->where('id', $mis_application_id)
                ->update($application_details);
            //study sites details
            if($sub_module_id == 23){
                //insert the clinical trial reporting details 
                $ctr_reporting_data = $portal_db->table('wb_clinicaltrial_progressreports')
                ->select(DB::raw("id as portal_id,$mis_application_id as application_id,reporting_start_date,reporting_end_date,clinicalreport_type_id,actualstudy_date,screen_participants,target_sample_size,enrolled_participants,dateof_first_enrollment,number_of_dropouts,number_lost_tofollow_ups,inclusion_criteria,exclusion_criteria,number_of_saes,events_of_medialimportance,protocol_deviations,clinicalstudy_status_id,study_site_id
                NOW() as created_on,$user_id as created_by"))
                ->where('application_id', $results->id)
                ->get();

                $ctr_reporting_data = convertStdClassObjToArray($ctr_reporting_data);

                DB::table('tra_clinicaltrial_progressreports')
                    ->where('application_id', $mis_application_id)
                    ->delete();
                DB::table('tra_clinicaltrial_progressreports')
                    ->insert($ctr_reporting_data);

            }
            else{
                $site_details = $portal_db->table('wb_clinical_trial_sites')
                    ->select(DB::raw("id as portal_id,$mis_application_id as application_id,study_site_id,
                    NOW() as created_on,$user_id as created_by"))
                    ->where('application_id', $results->id)
                    ->get();
                $site_details = convertStdClassObjToArray($site_details);
                //$site_details = unsetPrimaryIDsInArray($site_details);
                DB::table('clinical_trial_sites')
                    ->where('application_id', $mis_application_id)
                    ->delete();
                DB::table('clinical_trial_sites')
                    ->insert($site_details);

            }
           
            //investigators
            $investigator_details = $portal_db->table('wb_clinical_trial_investigators')
                ->select(DB::raw("id as portal_id,$mis_application_id as application_id,category_id,investigator_id,
                study_site_id,NOW() as created_on,$user_id as created_by"))
                ->where('application_id', $results->id)
                ->get();
            $investigator_details = convertStdClassObjToArray($investigator_details);
            //$investigator_details = unsetPrimaryIDsInArray($investigator_details);
            DB::table('clinical_trial_investigators')
                ->where('application_id', $mis_application_id)
                ->delete();
            DB::table('clinical_trial_investigators')
                ->insert($investigator_details);
            //IMP products
            
            $product_details = $portal_db->table('wb_clinical_trial_products')
                ->select(DB::raw("id as portal_id,$mis_application_id as application_id,product_category_id,brand_name,
                registration_no,registration_date,identification_mark,product_desc,market_location_id,dosage_form_id,country_id,
                common_name_id,manufacturer_id,routes_of_admin_id,product_strength,si_unit_id,
                NOW() as created_on,$user_id as created_by"))
                ->where('application_id', $results->id)
                ->get();
            $product_details = convertStdClassObjToArray($product_details);
            //$product_details = unsetPrimaryIDsInArray($product_details);
            DB::table('clinical_trial_products')
                ->where('application_id', $mis_application_id)
                ->delete();
            foreach ($product_details as $product_detail) {
                $mis_product_id = DB::table('clinical_trial_products')
                    ->insertGetId($product_detail);
                //product ingredients
                $ingredient_details = $portal_db->table('wb_impproduct_ingredients')
                    ->select(DB::raw("id as portal_id,$mis_product_id as product_id,ingredient_id,ingredient_type_id,specification_id,strength,si_unit_id,
                      inclusion_reason_id,NOW() as created_on,$user_id as created_by"))
                    ->where('product_id', $product_detail['portal_id'])
                    ->get();
                $ingredient_details = convertStdClassObjToArray($ingredient_details);
                $ingredient_details = unsetPrimaryIDsInArray($ingredient_details);
                DB::table('impproduct_ingredients')
                    ->insert($ingredient_details);
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
            updatePortalParams('wb_clinical_trial_applications', $portal_params, $portal_where);
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
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
                'applicant_id' => $applicant_id
            );
            //submissions
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
                'remarks' => $comment,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id,
                'is_fast_track'=>$results->is_fast_track
            );
            DB::table('tra_submissions')
                ->insert($submission_params);
            DB::commit();
            $portal_db->commit();
            $res = array(
                'success' => true,
                'details' => $details,
                'message' => 'Application submitted successfully!!'
            );
        } catch (\Exception $exception) {
            DB::rollBack();
            $portal_db->rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $portal_db->rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return $res;
    }

    public function getClinicalTrialInvoiceDetails($application_code)
    {
		
        $qry = DB::table('tra_clinical_trial_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->join('tra_application_invoices as t6', 't1.application_code', '=', 't6.application_code')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT(t1.study_title,'(',CONCAT_WS(',',CONCAT('Protocol No:',t1.protocol_no),CONCAT('Version No:',t1.version_no)),')') as module_desc, t6.id as invoice_id
                     "))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        return $invoice_details;
    }

}