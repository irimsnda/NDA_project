<?php

namespace Modules\ProductRegistration\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait ProductsRegistrationTrait
{
    public function getProductApplicationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $class_code = getSingleRecordColValue('par_classifications', array('id' => $application_details->classification_id), 'code');
        $apptype_code = getSingleRecordColValue('par_product_origins', array('id' => $application_details->product_origin_id), 'code');
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
    public function processProductsApplicationSubmission(Request $request)
    {
        $user_id = $this->user_id;

        $directive_id = $request->input('directive_id');
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $application_code = $request->input('application_code');

        $keep_status = $request->input('keep_status');
        $module_id = $request->input('module_id');
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $process_id = $request->input('process_id');
        
        $data = DB::table('wf_workflow_actions')
                ->where(array('stage_id'=>$request->curr_stage_id,'id'=>$request->action))
                ->select('*')
                ->first();
if($table_name == ''){
				$table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
				$request->table_name = $table_name;
				
			}
			
			if($table_name == 'tra_product_notifications'){
				$table_name = 'tra_product_applications';
			}
			
			//print_r($data);
			//exit();
        if($data){
			
            $application_details = DB::table($table_name. ' as t1')
                    ->join('tra_product_information as t2', 't1.product_id', '=','t2.id')
                    ->select('t1.*', 't2.classification_id','t2.product_origin_id', 't2.device_type_id')
                    ->where('t1.id', $application_id)
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

                 $recommendation_table = $data->recommendation_table;
                 $update_portal_status = $data->update_portal_status;
                 $portal_status_id = $data->portal_status_id;

                 $has_email_notification = $data->has_email_notification;
                 $email_message_id = $data->email_message_id;
                 

                 $action_details = $this->getApplicationWorkflowActionDetails($action);
                 $keep_status = $action_details->keep_status;
                 $action_type = $action_details->action_type_id;
                 $sub_module_id = $application_details->sub_module_id;
                 $module_id = $application_details->module_id;
                 $reference_no = $application_details->reference_no;

                if($update_portal_status == 1){
                    $proceed = updatePortalApplicationStatusWithCode($application_code, 'wb_product_applications',$portal_status_id);
                    if ($proceed == false) {
                        echo json_encode($proceed);
                        exit();
                    }      
                }
                if ($action_details->generate_refno == 1) {
                      if ($refno_generated != 1 && ($reference_no == '' or is_null($reference_no))) {

                        $codes_array = $this->getProductApplicationReferenceCodes($application_details);
                       
                        $refno_details = generateApplicationRefNumber($application_id, $table_name, $sub_module_id,  1, $codes_array, $process_id, $zone_id, $user_id,$module_id,$section_id);

                        if ($refno_details['success'] == false) {
                            echo json_encode($refno_details);
                            exit();
                        }
                        
                        $portal_params = array(
                            'reference_no' => $refno_details['ref_no']
                        );
                        $portal_where = array(
                            'application_code' => $application_code
                        );
                        updatePortalParams('wb_product_applications', $portal_params, $portal_where);
                    }
                }
                if ($action_type == 2) {//initial query
                  
                    $this->processReceivingQueriedApplicationSubmission($request);

                } else if ($action_type == 3) {//initial rejection
                    $this->processReceivingRejectedApplicationSubmission($request);
                } else if ($action_type == 6) {//recommendation submission
                    $recommendation_table = $action_details->recommendation_table;
                    $this->processRecommendationApplicationSubmission($request, $recommendation_table);
                }else{
                    
                    $this->processNormalApplicationSubmission($request);
                }
                //must have set all variables
                if($has_email_notification == 1){


                }
        }
        else{
                 $this->processNormalApplicationSubmission($request);
        }

        
    }
    public function updateQueriedProductsApplicationPortal(Request $request, $application_details)
    {
        $user_id = $this->user_id;
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        //update portal status
        $portal_db = DB::connection('portal_db');
        $update = $portal_db->table('wb_product_applications')
            ->where('id', $application_details->portal_id)
            ->update(array('application_status_id' => 6, 'dola'=>Carbon::now()));
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

    public function processProductManagersApplicationSubmission($request)
    {
        
         //get workflow action details
         $action = $request->input('action');
         $action_details = $this->getApplicationWorkflowActionDetails($action);
         $keep_status = $action_details->keep_status;
         $action_type = $action_details->action_type_id;
         $approval_submission = $action_details->is_approval_submission;
			
         if ($approval_submission == 1) {
            $this->processNewApprovalApplicationSubmission($request, $keep_status);
        } else if ($action_type == 4) {//manager query to customer
            $this->submitApplicationFromManagerQueryToCustomer($request);
        } else if ($action_type == 5) {//manager query normal submission
            $this->processManagerQueryReturnApplicationSubmission($request);
        } else {
            
            $this->processNormalManagersApplicationSubmission($request, $keep_status);
        }

         
    }

    public function updateQueriedProductApplicationPortal(Request $request, $application_details)
    {
        $user_id = $this->user_id;
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        //update portal status
        $portal_db = DB::connection('portal_db');
        $update = $portal_db->table('wb_Products_applications')
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

    public function updateRejectedProductApplicationPortal(Request $request, $application_details)
    {
        $user_id = $this->user_id;
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        //update portal status
        $portal_db = DB::connection('portal_db');
        $update = $portal_db->table('wb_Products_applications')
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

    public function processProductReturnApplicationSubmissionsWithChecklists($request, $checklist_category)
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
                return false;
            }
            inValidateApplicationChecklist($application_details->module_id, $application_details->sub_module_id, $application_details->section_id, $checklist_category, array($application_details->application_code));
            $this->processNormalApplicationSubmission($request);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            return false;
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            return false;
        }
    }

    public function updateProductManagerQueryToCustomerPortal($portal_ids)
    {
        $portal_db = DB::connection('portal_db');
        //update portal status
        $update = $portal_db->table('wb_Products_applications')
            ->whereIn('id', $portal_ids)
            ->update(array('application_status_id' => 8));
        if ($update < 1) {
            return false;
        } else {
            return true;
        }
    }

    public function singleNewProductApplicationApprovalSubmission($request)
    {
        $application_code = $request->input('application_code');
        try {
            $valid = $this->validateProductApprovalApplication($application_code);
            if ($valid == false) {
                $res = array(
                    'success' => false,
                    'message' => 'Please capture recommendation details first!!'
                );
                echo json_encode($res);
                return false;
            }
            $this->processNormalApplicationSubmission($request, true);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            return false;
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            return false;
        }
    }

    public function batchProductApplicationApprovalSubmission(Request $request)
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
                return false;
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
                return false;
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
            //1. Basic Product info
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

            //application details
            foreach ($application_details as $key => $application_detail) {
                $application_status_id = $application_detail->application_status_id;
                if ($application_detail->decision_id == 1 || $application_detail->decision_id == 2) {
                    $this->updateRegistrationTable($application_detail->reg_Product_id, $application_detail->Product_id, $module_id);
                    /*$response = $this->processRenewalProductApprovalApplicationSubmission($application_detail->id, $table_name, $formAmendmentDetails, $othersAmendmentDetails);
                    $success = $response['success'];
                    if ($success == false) {
                        DB::rollBack();
                        echo json_encode($response);
                        return false;
                    }*/
                }
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
                    'created_by' => $user_id
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
                return false;
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

    public function singleRenewalProductApplicationApprovalSubmission(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $process_id = $request->input('process_id');
        try {
            $valid = $this->validateProductApprovalApplication($application_code);
            if ($valid == false) {
                $res = array(
                    'success' => false,
                    'message' => 'Please capture recommendation details first!!'
                );
                echo json_encode($res);
                return false;
            }
            //check decision
            $decision_id = DB::table('tra_approval_recommendations')
                ->where(array('application_id' => $application_id, 'application_code' => $application_code))
                ->value('decision_id');
            if ($decision_id == 1 || $decision_id == 2) {//granted

                //todo: check for allowed changes
                //1. Basic Product info
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

                $response = $this->processRenewalProductApprovalApplicationSubmission($application_id, $table_name, $formAmendmentDetails, $othersAmendmentDetails);
                $success = $response['success'];
                if ($success == false) {
                    echo json_encode($response);
                    return false;
                }
            }
            $this->processNormalApplicationSubmission($request);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            return false;
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            return false;
        }
    }

    public function processRenewalProductApprovalApplicationSubmission($application_id, $table_name, $formAmendmentDetails, $othersAmendmentDetails)
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
            $Product_id = $application_details->Product_id;
            $temp_details = DB::table('tra_Products')
                ->where('id', $Product_id)
                ->first();
            if (is_null($temp_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (temp)Product details!!'
                );
                return $res;
            }
            $init_Product_id = $temp_details->init_Product_id;
            $current_permit_id = $temp_details->permit_id;
            //Product log data
            $log_data = DB::table('tra_Products as t1')
                ->select(DB::raw("t1.*,t1.id as Product_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_Product_id)
                ->first();
            //todo: update renewal changes
            //1. Basic Product info
            if ($formAmendmentDetails->changed == '') {
                //No changes on basic Product info
            } else {
                $this->updateAlterationBasicDetails($formAmendmentDetails, $Product_id, $init_Product_id, $log_data);
            }
            //2. Personnel(id 2) and Business(id 3) details
            if (count($othersAmendmentDetails) > 0) {
                foreach ($othersAmendmentDetails as $othersAmendmentDetail) {
                    if ($othersAmendmentDetail->part_id == 2) {
                        //update personnel details
                        $this->updateAlterationPersonnelDetails($Product_id, $init_Product_id);
                    }
                    if ($othersAmendmentDetail->part_id == 3) {
                        //update business details
                        $this->updateAlterationBusinessDetails($Product_id, $init_Product_id);
                    }
                }
            }
            updateRenewalPermitDetails($init_Product_id, $current_permit_id, 'tra_Products');

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

    public function batchProductAlterationApplicationApprovalSubmission($request)
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
                return false;
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
                return false;
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
            //application details
            foreach ($application_details as $key => $application_detail) {
                $application_status_id = $application_detail->application_status_id;
                if ($application_detail->decision_id == 1 || $application_detail->decision_id == 2) {
                    $this->updateProductAlterationPermitDetails($application_detail->Product_id);
                    $this->updateRegistrationTable($application_detail->reg_Product_id, $application_detail->Product_id, $module_id);
                    /* $response = $this->processAlterationProductApprovalApplicationSubmission($application_detail->id, $table_name);
                     $success = $response['success'];
                     if ($success == false) {
                         DB::rollBack();
                         echo json_encode($response);
                         return false;
                     }*/
                }
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
                    'created_by' => $user_id
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
                return false;
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

    public function updateProductAlterationPermitDetails($Product_id)
    {
        $user_id = $this->user_id;
        try {
            //get application_details
            $current_details = DB::table('tra_Products')
                ->where('id', $Product_id)
                ->first();
            if (is_null($current_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (current)Product details!!'
                );
                return $res;
            }
            $init_Product_id = $current_details->init_Product_id;
            $current_permit_id = $current_details->permit_id;
            //Product log data
            $log_data = DB::table('tra_Products as t1')
                ->select(DB::raw("t1.*,t1.id as Product_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_Product_id)
                ->first();
            $init_permit_id = $log_data->permit_id;

            $initPermitDetails = DB::table('tra_approval_recommendations as t1')
                ->select('t1.certificate_no', 't1.approval_date', 't1.expiry_date','t1.appvalidity_status_id','t1.appregistration_status_id')
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

    public function processAlterationProductApprovalApplicationSubmission($application_id, $table_name)
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
            $Product_id = $application_details->Product_id;
            $application_code = $application_details->application_code;
            $temp_details = DB::table('tra_Products')
                ->where('id', $Product_id)
                ->first();
            if (is_null($temp_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching (temp)Product details!!'
                );
                return $res;
            }
            $init_Product_id = $temp_details->init_Product_id;
            $temp_permit_id = $temp_details->permit_id;
            //Product log data
            $log_data = DB::table('tra_Products as t1')
                ->select(DB::raw("t1.*,t1.id as Product_id,$user_id as log_by,NOW() as log_date"))
                ->where('id', $init_Product_id)
                ->first();
            $init_permit_id = $log_data->permit_id;
            //todo get alteration requests
            //1. Basic Product info
            $formAmendmentDetails = DB::table('tra_alt_formparts_amendments as t1')
                ->join('par_key_form_fields as t2', 't1.field_id', '=', 't2.id')
                ->select(DB::raw("GROUP_CONCAT(t2.field_name) AS changed"))
                ->where('t1.application_code', $application_code)
                ->first();
            if ($formAmendmentDetails->changed == '') {
                //No changes on basic Product info
            } else {
                $this->updateAlterationBasicDetails($formAmendmentDetails, $Product_id, $init_Product_id, $log_data);
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
                        $this->updateAlterationPersonnelDetails($Product_id, $init_Product_id);
                    }
                    if ($othersAmendmentDetail->part_id == 3) {
                        //update business details
                        $this->updateAlterationBusinessDetails($Product_id, $init_Product_id);
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


    //VALIDATION FUNCTIONS
    public function validateProductReceivingQueriedApplication($application_id)
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

    public function validateProductInspectionApplication($application_code)
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
    
    public function validateProductApprovalApplication($application_code)
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

    public function saveProductApplicationApprovalDetails(Request $request, $sub_module_id)
    {
   
        if ($sub_module_id == 7) {
            $res = $this->saveProductApplicationRecommendationDetails($request);
        }else if ($sub_module_id == 8) {
            $res = $this->saveRenewalProductApplicationRecommendationDetails($request);
        }else if ($sub_module_id == 9) {
            $res = $this->saveProductApplicationAlterationRecommendationDetails($request);
        }else if ($sub_module_id == 30) {
            $res = $this->saveProductApplicationRecommendationDetails($request);
        }else if($sub_module_id == 17){
			 $res = $this->saveProductApplicationWithdrawalRecommendationDetails($request);
		}else if($sub_module_id == 20){
          $res = $this->saveProductApplicationWithdrawalReversalRecommendationDetails($request);
        }

		else {
          $res = $this->saveProductApplicationAlterationRecommendationDetails($request);
        }
        return $res;
    }
	 public function saveRenewalProductApplicationRecommendationDetails(Request $request)
    {
        
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        
        $selected_appcodes = $request->input('selected_appcodes');
      
        $res = array();
        
        try {
            if($selected_appcodes != ''){
                
                $selected_ids = json_decode($selected_appcodes);
               
                foreach ($selected_ids as $application_code) {
                   
                    $res = $this->saveProductApplicationRenewalRecommendationDetails($application_id, $application_code, $table_name, $request, $res);
                

                }
               
            }
            else{
                     $res = $this->saveProductApplicationRenewalRecommendationDetails($application_id, $application_code, $table_name, $request, $res);

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
        return $res;
    }
	
    public function saveProductApplicationRecommendationDetails(Request $request)
    {
        
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        
        $selected_appcodes = $request->input('selected_appcodes');
      
        $res = array();
        
        try {
            if($selected_appcodes != ''){
                
                $selected_ids = json_decode($selected_appcodes);
               
                foreach ($selected_ids as $application_code) {
                   
                    $res = $this->saveNewProductApprovalRecommendation($application_id, $application_code, $table_name, $request, $res);
                

                }
               
            }
            else{
                     $res = $this->saveNewProductApprovalRecommendation($application_id, $application_code, $table_name, $request, $res);

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
        return $res;
    }
    //renewal 
    public function saveNewProductApprovalRecommendation($application_id, $application_code, $table_name, $request,  &$res){

        DB::transaction(function () use ($application_id, $application_code, $table_name, $request,  &$res) {
            $qry = DB::table($table_name. ' as t1')
                     ->where('t1.application_code', $application_code);

            $ProductUpdateParams = array();
            $app_details = DB::table($table_name. ' as t1')
                                    ->join('tra_product_information as t2', 't1.product_id', '=','t2.id')
                                    ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=','t3.id')
									
									->leftJoin('tra_approval_recommendations as t4', 't1.application_code', 't4.application_code')
                                    ->select('t1.*','t2.brand_name', 't2.classification_id','t3.name as applicant_name','t3.email as applicant_email', 't2.device_type_id', 't2.product_origin_id','t4.id as recommendation_id')
                                    ->where('t1.application_code', $application_code)
                                    ->first();
                                    if (is_null($app_details)) {
                                        $res = array(
                                            'success' => false,
                                            'message' => 'Problem encountered while getting application details!!'
                                        );
                                        return $res;
                                    }
									
                    $zone_id = $app_details->zone_id;
                    $process_id = $request->input('process_id');
                    $workflow_stage_id = $request->input('workflow_stage_id');
                    $decision_id = $request->input('decision_id');
                    $comment = $request->input('comment');
                    $approved_by = $request->input('approved_by');
                    $approval_date = formatDate($request->input('approval_date'));
                    $expiry_date = $request->input('expiry_date');
                    $dg_signatory = $request->input('dg_signatory');
                    $signatory = $request->input('permit_signatory');
                    $user_id = $this->user_id;
                    $classification_id = $app_details->classification_id;
                    $applicant_id = $app_details->applicant_id;
                    $local_agent_id = $app_details->local_agent_id;
                    $section_id = $app_details->section_id;
                    $device_type_id = $app_details->device_type_id;
                    $sub_module_id = $app_details->sub_module_id;
                    $application_id = $app_details->id;
                    $module_id = $app_details->module_id;
                    $section_id = $app_details->section_id;
                    $reference_no = $app_details->reference_no;
                    $id = $app_details->recommendation_id;
					
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
                        'certificate_issue_date' => $approval_date,
                        'approved_by' => $approved_by,
                        'dg_signatory' => $dg_signatory,
                        'permit_signatory' => $permit_signatory
                    );

                    
                    if($decision_id == 1){

                        $expiry_date = getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$section_id);
						$params['expiry_date'] =$expiry_date ;
                    }
                    else if($decision_id == 2){
                        $params['expiry_date'] = $expiry_date;

                    }
                    else{
                        $params['expiry_date'] = '';
                    }
                     $codes_array = $this->getProductApplicationReferenceCodes($app_details);
                
//zone_id
                    $ProductUpdateParams['certificate_issue_date'] = $approval_date;
                    if (validateIsNumeric($id)) {
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
                        $certificate_no = $prev_data_results[0]['decision_id'];
                        $prev_data_results[0]['record_id'] = $id;
                        $prev_data_results[0]['update_by'] = $user_id;
                        $prev_data_results[0]['recommendation_id'] = $prev_data_results[0]['id'];
                        unset($prev_data_results[0]['id']);
    
                        //permits no formats ref id 
                       
                        DB::table('tra_approval_recommendations_log')
                            ->insert($prev_data_results);
                        if ($decision_id == 1 || $decision_id == 2) {
                            $product_status_id = 6;
                            $portal_status_id = 10;
                            $application_status_id = 6;
                            $qry->update(array('application_status_id' => 6));
                            //permit
                            if ($prev_decision_id != 1) {
                                
								
                                 $certificate_data = generateApplicationCertificateNumber($application_id, $table_name, $sub_module_id,  2, $codes_array, $process_id, $zone_id, $user_id,$module_id,$section_id);
								if ($certificate_data['success'] == false) {
									echo json_encode($certificate_data);
									exit();
								}
								
								$certificate_no = $certificate_data['certificate_no'];

							   $params['certificate_no'] = $certificate_no;

                            }
							$params['appvalidity_status_id'] = 2;
                            $params['appregistration_status_id'] = 2;
                            
							$registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>6,
                                                        'validity_status_id'=>2,
                                                        'registration_status_id'=>2,
                                                        'registration_date'=>$approval_date,
                                                        'approval_date'=>$approval_date,
                                                        'expiry_date'=>$expiry_date,
                                                        'registration_no'=>$certificate_no,
														'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id,
                                                        'active_application_code'=>$application_code,
                                                        'active_app_referenceno'=>$reference_no,
                                                        'registration_ref_no'=>$reference_no,
                                                    );
                        } else {
                            $product_status_id = 3;
                            $portal_status_id = 11;
                            $application_status_id = 3;
                            $qry->update(array('application_status_id' => 7));
                            $params['certificate_no'] = null;
                            $params['appvalidity_status_id'] = 3;
                            $params['appregistration_status_id'] = 3;
                        
							 $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                    'status_id'=>7,
                                                    'validity_status_id'=>3,
                                                    'registration_status_id'=>3,
                                                    'approval_date'=>$approval_date,
													'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id,
													'active_application_code'=>$application_code,
                                                     'active_app_referenceno'=>$reference_no,
                                                     'registration_ref_no'=>$reference_no
                                                );
                        }
                        $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                        
                    } else {
                        //insert
                    
                        $params['created_on'] = Carbon::now();
                        $params['created_by'] = $user_id;
                        if ($decision_id == 1 || $decision_id == 2) {
                            $portal_status_id = 10;
                            $product_status_id = 6;
                            //permits
                            $application_status_id = 6;
                            $certificate_data = generateApplicationCertificateNumber($application_id, $table_name, $sub_module_id,  2, $codes_array, $process_id, $zone_id, $user_id,$module_id,$section_id);
                            if ($certificate_data['success'] == false) {
                                echo json_encode($certificate_data);
                                exit();
                            }
                            
                            $certificate_no = $certificate_data['certificate_no'];

                           $params['certificate_no'] = $certificate_no;
                           if($decision_id == 1){//set the expiration date as defined by the system configurations
                                $expiry_date = getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$section_id);
                                $params['expiry_date'] = $expiry_date ;
                            }//else{//get the expiration date as specified by the manager
                                //$params['expiry_date'] = $expiry_date ;
                            //}
                            $params['appvalidity_status_id'] = 2;
                            $params['appregistration_status_id'] = 2;
                            $qry->update(array('application_status_id' => 6));
                            $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>6,
                                                        'validity_status_id'=>2,
                                                        'registration_status_id'=>2,
                                                        'registration_date'=>$approval_date,
                                                        'approval_date'=>$approval_date,
                                                        'expiry_date'=>$expiry_date,
                                                        'registration_no'=>$certificate_no,
                                                        'active_application_code'=>$application_code,
                                                        'active_app_referenceno'=>$reference_no,
                                                        'registration_ref_no'=>$reference_no,
                                                    );

                        } else {
                            $portal_status_id = 11;
                            $product_status_id = 6;
                            $application_status_id = 7;
                            $qry->update(array('application_status_id' => 7));
                            $params['certificate_no'] = '';
                            $params['expiry_date'] = null;
							 $params['appvalidity_status_id'] = 3;
                            $params['appregistration_status_id'] = 3;
                            $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                    'status_id'=>7,
                                                    'validity_status_id'=>3,
                                                    'registration_status_id'=>3,
                                                    'approval_date'=>$approval_date,
													'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id,
													'active_application_code'=>$application_code,
                                                     'active_app_referenceno'=>$reference_no,
                                                     'registration_ref_no'=>$reference_no
                                                );
                            
                        }
                        
                        $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                    
                        $id = $res['record_id'];

                    }
                    //save the provisional or reject details 
                    $permit_id = $id;
                    if($decision_id == 2 || $decision_id == 3){
                        funcSaveProvisionalRejectionDetails($request,$permit_id,$decision_id,$application_id, $application_code,$user_id);

                    }
                   

                    $where_statement = array('tra_product_id'=>$app_details->product_id);
                        
                    $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,$where_statement,$user_id);
                    
                    //update Portal Status
                    updatePortalApplicationStatusWithCode($application_code, 'wb_product_applications',$portal_status_id);
						if($decision_id == 1  || $decision_id == 2){
								$message = $this->getProductApprovalTemplate($app_details->section_id,$app_details->brand_name,$app_details->sub_module_id,$app_details->reference_no,$certificate_no,$approval_date,$application_code);
								 //sendMailNotification($app_details->applicant_name, $app_details->applicant_email,'Approval Recommendation',$message);

							}
                    //finally update the reqistered products details
                    if($res['success']){

                        $app_data =  array('permit_id' => $id, 
                                            'reg_product_id' => $res['record_id'], 
                                            'application_status_id'=>$application_status_id,
                                            'dola' => Carbon::now(),
                                            'altered_by' => $user_id);

                        $app_where = array('id'=>$application_id);

                        $appprev_data = getPreviousRecords('tra_product_applications', $app_where);

                         $res = updateRecord('tra_product_applications', $appprev_data['results'], $app_where,$app_data, $user_id);

                        //update applicaiton registration statuses
                        
                    }
                    
        }, 5);
        return $res;

    }
	//public function 
    public function saveProductApplicationRenewalRecommendationDetails($application_id, $application_code, $table_name, $request, $res)
    {
     //   $table_name = $request->input('table_name');
       // $application_id = $request->input('application_id');
      //  $application_code = $request->input('application_code');
        $reg_product_id = $request->input('reg_product_id');
        
        $qry = DB::table($table_name.'  as t1')
            ->join('tra_product_information as t2','t1.product_id','=','t2.id')
			->leftJoin('wb_trader_account as t3', 't1.applicant_id', 't3.id')
			->leftJoin('tra_approval_recommendations as t4', 't1.application_code', 't4.application_code')
			->select('t1.*', 't3.*','t2.brand_name', 't3.name as applicant_name','t4.id as recommendation_id', 't3.email as applicant_email', 't1.id as application_id')
            ->where('t1.application_code', $application_code);
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
            
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details,$reg_product_id, &$res) {
                $ProductUpdateParams = array();
              //  $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id =  $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = formatDate($request->input('approval_date'));
                $expiry_date = $request->input('expiry_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
 
                $prev_product_id= $request->input('prev_product_id');
               $product_id =  $app_details->product_id;
               $reference_no =  $app_details->reference_no;
               $reg_product_id =  $app_details->reg_product_id;
               $id =  $app_details->recommendation_id;
               $application_id =  $app_details->application_id;
               $applicant_id =  $app_details->applicant_id;
               $local_agent_id =  $app_details->local_agent_id;

                $user_id = $this->user_id;

                $sub_module_id = $app_details->sub_module_id;
                $module_id = $app_details->module_id;
                $section_id = $app_details->section_id;
        
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory($process_id);
                } else {
                    $permit_signatory = $signatory;
                }
                //get the previous produt registration
                
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
              
                if(validateIsNumeric($id)) {
                            //update prev_data_results
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
                            
                            //permits no formats ref id 
                        
                            DB::table('tra_approval_recommendations_log')
                                ->insert($prev_data_results);
                              
                            if($decision_id == 1 || $decision_id == 2){
                                $product_status_id = 6;
                                $application_status_id = 6;
                                //permit
                                if ($prev_decision_id != 1) {
                                 //   need to get the prev data
                                    
                                    $where_statement = array('t1.tra_product_id'=>$product_id); 
                                 
                                    $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');
                                   
                                    $prev_product_id = $prev_productreg->prev_product_id;

                                    $prev_productexpirydate =  $prev_productreg->expiry_date;
                                   
                                    $product_expirydate = getApplicationExpiryDate($prev_productexpirydate,$sub_module_id,$module_id,$section_id);
                                   $expiry_date = getApplicationExpiryDate($prev_productexpirydate,$sub_module_id,$module_id,$section_id);
                                    $params['expiry_date'] =  $expiry_date;

                                    $params['certificate_issue_date'] = $prev_productexpirydate;

                                    $params['certificate_no'] = $prev_productreg->certificate_no;
                                    $certificate_no = $prev_productreg->certificate_no;
                                     $params['appvalidity_status_id'] = 2;
									$params['appregistration_status_id'] = 2;
							
                                    $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                                'status_id'=>$prev_productreg->status_id,
                                                                'validity_status_id'=>$prev_productreg->validity_status_id,
                                                                'registration_status_id'=>$prev_productreg->registration_status_id,
                                                                'prev_product_id'=>$prev_product_id,
                                                                'registration_date'=>$prev_productreg->approval_date,
																'approval_date'=>$approval_date,
																'expiry_date'=>$expiry_date,
																'registration_no'=>$prev_productreg->certificate_no,
																'active_application_code'=>$application_code,
																'active_app_referenceno'=>$reference_no,
																'registration_ref_no'=>$reference_no,
																'reg_applicant_id' => $applicant_id,
																'reg_local_agent_id' => $local_agent_id,
                                                            );
                                    $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                             
                                }
                               
                            } else {
                               
                                $application_status_id = 7;
                                $params['certificate_no'] = null;
								   $params['appvalidity_status_id'] = 3;
									$params['appregistration_status_id'] = 3;
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>7,
                                                        'validity_status_id'=>3,
                                                        'registration_status_id'=>3,
                                                        'approval_date'=>$approval_date,
														'active_application_code'=>$application_code,
                                                        'active_app_referenceno'=>$reference_no,
														'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id,
                                                    );
                                 $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                             
                            }
                                 
                            $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                            
                        } else {
                            //insert
                          
                            $application_status_id = 6;
                            $where_statement = array('t1.id'=>$reg_product_id);
                            $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');
						
                            $prev_product_id = $prev_productreg->prev_product_id;
						
                            if($decision_id == 1 || $decision_id == 2){

                                $prev_productexpirydate =  $prev_productreg->expiry_date;
                                $expiry_date = getApplicationExpiryDate($prev_productexpirydate,$sub_module_id,$module_id,$section_id);
                                $params['expiry_date'] = date('Y-m-d H:i:s', strtotime($expiry_date));

                                $params['certificate_issue_date'] = $prev_productexpirydate;
                                $params['certificate_no'] = $prev_productreg->certificate_no;
                                $certificate_no = $prev_productreg->certificate_no;
                                  $params['appvalidity_status_id'] =2;
									$params['appregistration_status_id'] = 2;
                            
                                        $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>$prev_productreg->status_id,
                                                        'validity_status_id'=>2,
                                                        'registration_status_id'=>2,
                                                        'registration_date'=>$approval_date,
                                                        'approval_date'=>$prev_productreg->approval_date,
                                                        'expiry_date'=>$expiry_date,
                                                        'registration_no'=>$prev_productreg->certificate_no,
                                                        'active_application_code'=>$application_code,
                                                        'active_app_referenceno'=>$reference_no,
														'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id,
                                                      //  'registration_ref_no'=>$prev_productreg->registration_ref_no
                                                    );
										
										
                            }else {

                                $application_status_id = 7;
                                $params['certificate_no'] = '';
                                $params['expiry_date'] = null;
								$params['appvalidity_status_id'] =3;
								$params['appregistration_status_id'] = 3;
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>7,
                                                        'validity_status_id'=>3,
                                                        'registration_status_id'=>3,
                                                        'prev_product_id'=>$prev_product_id,
														 'approval_date'=>$approval_date,
													'active_application_code'=>$application_code,
                                                     'active_app_referenceno'=>$reference_no,'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id,
                                                 
                                                    );

                            }
                            $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                            
                            $params['created_on'] = Carbon::now();
                            $params['created_by'] = $user_id;
                            $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                      
                            $id = $res['record_id'];
                            $app_data =  array('permit_id' => $id, 
                                               'application_status_id'=>$application_status_id,
                                               'dola' => Carbon::now(),
                                               'altered_by' => $user_id);
                            $app_where = array('id'=>$application_id);
                            $appprev_data = getPreviousRecords('tra_product_applications', $app_where);
                            $res = updateRecord('tra_product_applications', $appprev_data['results'], $app_where,$app_data, $user_id);
                            if($decision_id == 1  || $decision_id == 2){
								$message = $this->getProductApprovalTemplate($app_details->section_id,$app_details->brand_name,$app_details->sub_module_id,$app_details->reference_no,$certificate_no,$approval_date,$application_code);
								 sendMailNotification($app_details->applicant_name, $app_details->applicant_email,'Approval Recommendation',$message);

							}
							
                        }
						if($decision_id == 1  || $decision_id == 2){
								$portal_params = array(
									'application_status_id' => 10,
									//'reference_no' => $ref_no
								);
							}
							else{
								$portal_params = array(
									'application_status_id' => 11,
									//'reference_no' => $ref_no
								);
							}
							
							$portal_where = array(
								'application_code' => $application_code
							);
							
						updatePortalParams('wb_product_applications', $portal_params, $portal_where);
						   
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
	public function saveProductApplicationWithdrawalReversalRecommendationDetails(Request $request){
		
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $reg_product_id = $request->input('reg_product_id');
       
        $qry = DB::table($table_name.'  as t1')
            ->join('tra_product_information as t2','t1.product_id','=','t2.id')
            ->where('t1.id', $application_id);
        $app_details = $qry->first();
        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
        $qry = DB::table($table_name.'  as t1')
            ->join('tra_product_information as t2','t1.product_id','=','t2.id')
			->leftJoin('wb_trader_account as t3', 't1.applicant_id','=','t3.id')
			->select('t1.*', 't2.*','t3.name as applicant_name', 't3.email as applicant_email')
            ->where('t1.id', $application_id);
        $res = array();
        try {
           
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details,$reg_product_id, &$res) {
                $ProductUpdateParams = array();
				$application_details = $qry->first();
				
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = formatDate($request->input('approval_date'));
                $expiry_date = $request->input('expiry_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
				$reference_no = $app_details->reference_no;
				$applicant_id = $app_details->applicant_id;
				$local_agent_id = $app_details->local_agent_id;
                $user_id = $this->user_id;
                $certificate_no = '';
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory($process_id);
                } else {
                    $permit_signatory = $signatory;
                }
                //get the previous produt registration

               
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
                
                        if (validateIsNumeric($id)) {
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
                            
                            //permits no formats ref id 
                        
                            DB::table('tra_approval_recommendations_log')
                                ->insert($prev_data_results);
                           
                                $product_status_id = 18;
                                $application_status_id = 18;
                                //permit
                                if ($prev_decision_id != 1) {
                                    $where_statement = array('t1.id'=>$reg_product_id);
                                    $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');
                                    $prev_product_id = $prev_productreg->prev_product_id;
                                    
                                    $params['expiry_date'] = $prev_productreg->expiry_date;
                                    $params['certificate_issue_date'] = $prev_productreg->certificate_issue_date;
                                    $params['certificate_no'] = $prev_productreg->certificate_no;
                                    $certificate_no = $prev_productreg->certificate_no;
									 $params['appvalidity_status_id'] =$prev_productreg->validity_status_id;
									$params['appregistration_status_id'] = $prev_productreg->registration_status_id;
									
                                    $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                                'status_id'=>$prev_productreg->status_id,
                                                                'validity_status_id'=>2,
                                                                'registration_status_id'=>2,
                                                                'prev_product_id'=>$prev_product_id,
                                                                'registration_date'=>$prev_productreg->approval_date,
																 'active_application_code'=>$application_code,
																'active_app_referenceno'=>$reference_no,
																'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id
                                                            );
                                    $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                                   
                                }
                           
                            
                            $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                            
                        } else {
                            //insert
                           $product_status_id = 18;
                                $application_status_id = 18;
                            $where_statement = array('t1.id'=>$reg_product_id);
                            $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');
                            $prev_product_id = $prev_productreg->prev_product_id;
                           
                            if($decision_id == 1  || $decision_id == 2){
								$certificate_no = $prev_productreg->certificate_no;
                                $params['expiry_date'] = $prev_productreg->expiry_date;
                                $params['certificate_issue_date'] = $prev_productreg->certificate_issue_date;
                                $params['certificate_no'] = $prev_productreg->certificate_no;
                                 
									
									 $params['appvalidity_status_id'] =$prev_productreg->validity_status_id;
									$params['appregistration_status_id'] = $prev_productreg->registration_status_id;
									
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                            'status_id'=>$prev_productreg->status_id,
                                                            'validity_status_id'=>2,
                                                                'registration_status_id'=>2,
                                                            'prev_product_id'=>$prev_product_id,
                                                            'registration_date'=>$prev_productreg->approval_date,
															'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id
															//'active_application_code'=>$prev_productreg->active_application_code,
														//		'active_app_referenceno'=>$prev_productreg->active_app_referenceno
                                                        );
                                $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                                //finally update the reqistered products details
                                               
                            }else {

                                $application_status_id = 7;
                                $params['certificate_no'] = '';
                                $params['expiry_date'] = null;
$params['appvalidity_status_id'] =3;
									$params['appregistration_status_id'] = 3;
									
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>7,'validity_status_id'=>3,
                                                                'registration_status_id'=>4,
                                                        'approval_date'=>$approval_date,
														
															'active_application_code'=>$prev_productreg->active_application_code,
																'active_app_referenceno'=>$prev_productreg->active_app_referenceno
                                                    );

                                //no update on the registration statuses 

                            }

                            $params['created_on'] = Carbon::now();
                            $params['created_by'] = $user_id;
                            $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                            $id = $res['record_id'];
                            $app_data =  array('permit_id' => $id, 
                                               'application_status_id'=>$application_status_id,
                                               'dola' => Carbon::now(),
                                               'altered_by' => $user_id);
                            $app_where = array('id'=>$application_id);
                            $appprev_data = getPreviousRecords('tra_product_applications', $app_where);
                            $res = updateRecord('tra_product_applications', $appprev_data['results'], $app_where,$app_data, $user_id);
							//send notifications 
							// applicant_name', 't3.email as applicant_email
							if($decision_id == 1  || $decision_id == 2){
								$message = $this->getProductApprovalTemplate($application_details->section_id,$application_details->brand_name,$application_details->sub_module_id,$application_details->reference_no,$certificate_no,$approval_date,$application_code);
								 sendMailNotification($application_details->applicant_name, $application_details->applicant_email,'Approval Recommendation',$message);

							}
                         
                        }
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
	public function saveProductApplicationWithdrawalRecommendationDetails(Request $request){
		
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $reg_product_id = $request->input('reg_product_id');
       
        $qry = DB::table($table_name.'  as t1')
            ->join('tra_product_information as t2','t1.product_id','=','t2.id')
            ->where('t1.id', $application_id);
        $app_details = $qry->first();
		//applicant_id
        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
        $qry = DB::table($table_name.'  as t1')
            ->join('tra_product_information as t2','t1.product_id','=','t2.id')
			->leftJoin('wb_trader_account as t3', 't1.applicant_id','t3.id')
			->select('t1.*', 't2.*','t3.name as applicant_name', 't3.email as applicant_email')
            ->where('t1.id', $application_id);
        $res = array();
        try {
           
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details,$reg_product_id, &$res) {
                $ProductUpdateParams = array();
				$application_details = $qry->first();
				
                $id = $request->input('recommendation_id');
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = formatDate($request->input('approval_date'));
                $expiry_date = $request->input('expiry_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
				$reference_no = $app_details->reference_no;
				$applicant_id = $app_details->applicant_id;
                $user_id = $this->user_id;
$certificate_no = '';
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory($process_id);
                } else {
                    $permit_signatory = $signatory;
                }
                //get the previous produt registration

               
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
                
                        if (validateIsNumeric($id)) {
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
                            
                            //permits no formats ref id 
                        
                            DB::table('tra_approval_recommendations_log')
                                ->insert($prev_data_results);
                           
                                $product_status_id = 18;
                                $application_status_id = 18;
                                //permit
                                if ($prev_decision_id != 1) {
                                    $where_statement = array('t1.id'=>$reg_product_id);
                                    $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');
                                    $prev_product_id = $prev_productreg->prev_product_id;
                                    
                                    $params['expiry_date'] = $prev_productreg->expiry_date;
                                    $params['certificate_issue_date'] = $prev_productreg->certificate_issue_date;
                                    $params['certificate_no'] = $prev_productreg->certificate_no;
                                    $certificate_no = $prev_productreg->certificate_no;
                                    $applicant_id = $prev_productreg->reg_applicant_id;
                                    $local_agent_id = $prev_productreg->reg_local_agent_id;//reg_local_agent_id
                                    
									 $params['appvalidity_status_id'] =3;
									$params['appregistration_status_id'] = 4;
									
                                    $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                                'status_id'=>$prev_productreg->status_id,
                                                                'validity_status_id'=>3,
                                                                'registration_status_id'=>4,
                                                                'prev_product_id'=>$prev_product_id,
                                                                'registration_date'=>$prev_productreg->approval_date,
																 'active_application_code'=>$application_code,
																'active_app_referenceno'=>$reference_no,
																'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id
                                                            );
                                    $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                                   
                                }
                           
                            
                            $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                            
                        } else {
                            //insert
                           $product_status_id = 18;
                                $application_status_id = 18;
                            $where_statement = array('t1.id'=>$reg_product_id);
                            $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');
                            $prev_product_id = $prev_productreg->prev_product_id;
                            $local_agent_id = $prev_productreg->reg_local_agent_id;//reg_local_agent_id
                           
                            if($decision_id == 1  || $decision_id == 2){
								$certificate_no = $prev_productreg->certificate_no;
                                $params['expiry_date'] = $prev_productreg->expiry_date;
                                $params['certificate_issue_date'] = $prev_productreg->certificate_issue_date;
                                $params['certificate_no'] = $prev_productreg->certificate_no;
                                 
									
									 $params['appvalidity_status_id'] =3;
									$params['appregistration_status_id'] = 4;
									
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                            'status_id'=>$prev_productreg->status_id,
                                                            'validity_status_id'=>3,
                                                                'registration_status_id'=>4,
                                                            'prev_product_id'=>$prev_product_id,
                                                            'registration_date'=>$prev_productreg->approval_date,
															'reg_applicant_id' => $applicant_id,
                                                            'reg_local_agent_id' => (isset($local_agent_id))?$local_agent_id:null
															//'active_application_code'=>$prev_productreg->active_application_code,
														//		'active_app_referenceno'=>$prev_productreg->active_app_referenceno
														
                                                        );
                                $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                                //finally update the reqistered products details
                                               
                            }else {

                                $application_status_id = 7;
                                $params['certificate_no'] = '';
                                $params['expiry_date'] = null;
$params['appvalidity_status_id'] =3;
									$params['appregistration_status_id'] = 4;
									
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>7,'validity_status_id'=>3,
                                                                'registration_status_id'=>4,
                                                        'approval_date'=>$approval_date,
														
															'active_application_code'=>$prev_productreg->active_application_code,
																'active_app_referenceno'=>$prev_productreg->active_app_referenceno
                                                    );

                                //no update on the registration statuses 

                            }

                            $params['created_on'] = Carbon::now();
                            $params['created_by'] = $user_id;
                            $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                            $id = $res['record_id'];
                            $app_data =  array('permit_id' => $id, 
                                               'application_status_id'=>$application_status_id,
                                               'dola' => Carbon::now(),
                                               'altered_by' => $user_id);
                            $app_where = array('id'=>$application_id);
                            $appprev_data = getPreviousRecords('tra_product_applications', $app_where);
                            $res = updateRecord('tra_product_applications', $appprev_data['results'], $app_where,$app_data, $user_id);
							//send notifications 
							// applicant_name', 't3.email as applicant_email
							if($decision_id == 1  || $decision_id == 2){
								if(validateIsNumeric($reg_product_id)){
									//update all the other applications 
									$update_data = array('validity_status_id'=>3,
                                                         'registration_status_id'=>4,
													     'dola'=>Carbon::now());
														
									DB::table('tra_product_applications as t1')
										->join('tra_approval_recommendations as t2','t1.application_code', 't2.application_code')
										->where(array('t1.reg_product_id'=>$reg_product_id))
										->update($update_data);
										
								}
								$message = $this->getProductApprovalTemplate($application_details->section_id,$application_details->brand_name,$application_details->sub_module_id,$application_details->reference_no,$certificate_no,$approval_date,$application_code);
								 sendMailNotification($application_details->applicant_name, $application_details->applicant_email,'Approval Recommendation',$message);
								//update all the rest of the applications 
							}
                         
                        }
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
    //alteration
	public function saveProductApplicationAlterationRecommendationDetails(Request $request)
    {
        
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        
        $selected_appcodes = $request->input('selected_appcodes');
      
        $res = array();
        
        try {
            if($selected_appcodes != ''){
                
                $selected_ids = json_decode($selected_appcodes);
              
                foreach ($selected_ids as $application_code) {
                 
                    $res = $this->saveProductAppsAmmendmentRecommendationDetails($application_id, $application_code, $table_name, $request, $res);
                

                }
               
            }
            else{
                     $res = $this->saveProductAppsAmmendmentRecommendationDetails($application_id, $application_code, $table_name, $request, $res);

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
        return $res;
    }
	
    public function saveProductAppsAmmendmentRecommendationDetails($application_id, $application_code, $table_name, $request, $res)
    {
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $reg_product_id = $request->input('reg_product_id');
       
        //application_id
        $qry = DB::table($table_name.'  as t1')
            ->join('tra_product_information as t2','t1.product_id','=','t2.id')
			->leftJoin('wb_trader_account as t3', 't1.applicant_id', 't3.id')
			->leftJoin('tra_approval_recommendations as t4', 't1.application_code', 't4.application_code')
			->select('t1.*', 't3.*','t2.brand_name', 't3.name as applicant_name', 't1.id as application_id','t4.id as recommendation_id', 't3.email as applicant_email')
            ->where('t1.application_code', $application_code);
        $app_details = $qry->first();
        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
      
        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return $res;
        }
        $qry = DB::table($table_name.'  as t1')
            ->join('tra_product_information as t2','t1.product_id','=','t2.id')
			->leftJoin('wb_trader_account as t3', 't1.applicant_id','t3.id')
			->select('t1.*', 't2.*','t3.name as applicant_name', 't3.email as applicant_email', 't1.id as application_id')
            ->where('t1.application_code', $application_code);
        $res = array();
        try {
           
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details,$reg_product_id, &$res) {
                $ProductUpdateParams = array();
				$application_details = $qry->first();
				
                $process_id = $request->input('process_id');
                $workflow_stage_id = $request->input('workflow_stage_id');
                $decision_id = $request->input('decision_id');
                $comment = $request->input('comment');
                $approved_by = $request->input('approved_by');
                $approval_date = formatDate($request->input('approval_date'));
                $expiry_date = $request->input('expiry_date');
                $dg_signatory = $request->input('dg_signatory');
                $signatory = $request->input('permit_signatory');
				$reference_no = $app_details->reference_no;
				$id = $app_details->recommendation_id;
				$reg_product_id = $app_details->reg_product_id;
				$application_id = $app_details->application_id;
				$applicant_id = $app_details->applicant_id;
				$local_agent_id = $app_details->local_agent_id;
                $user_id = $this->user_id;
$certificate_no = '';
                if ($dg_signatory == 1) {
                    $permit_signatory = getPermitSignatory($process_id);
                } else {
                    $permit_signatory = $signatory;
                }
                //get the previous produt registration

               
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
                
                        if (validateIsNumeric($id)) {
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
                            
                            //permits no formats ref id 
                        
                            DB::table('tra_approval_recommendations_log')
                                ->insert($prev_data_results);
                               
                            if($decision_id == 1  || $decision_id == 2){
                                
                              
                                $product_status_id = 6;
                                $application_status_id = 6;
                                //permit
                                if ($prev_decision_id != 1) {
                                    $where_statement = array('t1.id'=>$reg_product_id);
                                    $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');
                                    $prev_product_id = $prev_productreg->prev_product_id;
                                    
                                    $params['expiry_date'] = $prev_productreg->expiry_date;
                                    $params['certificate_issue_date'] = $prev_productreg->certificate_issue_date;
                                    $params['certificate_no'] = $prev_productreg->certificate_no;
                                    $certificate_no = $prev_productreg->certificate_no;
									 $params['appvalidity_status_id'] =$prev_productreg->validity_status_id;
									$params['appregistration_status_id'] = $prev_productreg->registration_status_id;
									
                                    $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                                'status_id'=>$prev_productreg->status_id,
                                                                'validity_status_id'=>$prev_productreg->validity_status_id,
                                                                'registration_status_id'=>$prev_productreg->registration_status_id,
                                                                'prev_product_id'=>$prev_product_id,
                                                                'registration_date'=>$prev_productreg->approval_date,
																 'active_application_code'=>$application_code,
																'active_app_referenceno'=>$reference_no,
																'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id
                                                            );
                                    $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                                   
                                }
                               
                            } else {
                                
                                if ($prev_decision_id == 1) {
                                      //rollback option save prev
                                      $where_statement = array('t1.id'=>$reg_product_id, 'tra_product_id'=>$app_details->product_id);
                                      $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');

                                      $registration_data = array('tra_product_id'=>$prev_productreg->regprev_product_id, 
                                                                'status_id'=>$prev_productreg->status_id,
                                                                'validity_status_id'=>$prev_productreg->validity_status_id,
                                                                'registration_status_id'=>$prev_productreg->registration_status_id,
                                                                'prev_product_id'=>0,
                                                                'registration_date'=>$prev_productreg->approval_date,
																 'active_application_code'=>$prev_productreg->application_code,
																'active_app_referenceno'=>$prev_productreg->active_app_referenceno,
																'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id
                                                            );

                                    $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                                    

                                }
                                $application_status_id = 7;
                                $params['certificate_no'] = null;
								 $params['appvalidity_status_id'] =3;
									$params['appregistration_status_id'] = 3;
									
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>7,
                                                        'validity_status_id'=>3,
                                                        'registration_status_id'=>3,
                                                        'registration_date'=>$approval_date
                                                    );
                            }
                            
                            $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                            
                        } else {
                            //insert
                           
                            $application_status_id = 6;
                            $where_statement = array('t1.id'=>$reg_product_id);
                            $prev_productreg = getPreviousProductRegistrationDetails($where_statement, 'tra_registered_products');
                            $prev_product_id = $prev_productreg->prev_product_id;
                           
                            if($decision_id == 1  || $decision_id == 2){
								$certificate_no = $prev_productreg->certificate_no;
                                $params['expiry_date'] = $prev_productreg->expiry_date;
                                $params['certificate_issue_date'] = $prev_productreg->certificate_issue_date;
                                $params['certificate_no'] = $prev_productreg->certificate_no;
                                 
									
									 $params['appvalidity_status_id'] =$prev_productreg->validity_status_id;
									$params['appregistration_status_id'] = $prev_productreg->registration_status_id;
									
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                            'status_id'=>$prev_productreg->status_id,
                                                            'validity_status_id'=>$prev_productreg->validity_status_id,
                                                            'registration_status_id'=>$prev_productreg->registration_status_id,
                                                            'prev_product_id'=>$prev_product_id,
                                                            'registration_date'=>$prev_productreg->approval_date,
															'active_application_code'=>$prev_productreg->active_application_code,
																'active_app_referenceno'=>$prev_productreg->active_app_referenceno,
																'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => $local_agent_id
                                                        );
                                $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,array('id'=>$reg_product_id),$user_id);
                                //finally update the reqistered products details
                                               
                            }else {

                                $application_status_id = 7;
                                $params['certificate_no'] = '';
                                $params['expiry_date'] = null;
$params['appvalidity_status_id'] =3;
									$params['appregistration_status_id'] = 3;
									
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>7,
                                                        'validity_status_id'=>3,
                                                        'registration_status_id'=>3,
                                                        'approval_date'=>$approval_date,
														
															'active_application_code'=>$prev_productreg->active_application_code,
																'active_app_referenceno'=>$prev_productreg->active_app_referenceno
                                                    );

                                //no update on the registration statuses 

                            }

                            $params['created_on'] = Carbon::now();
                            $params['created_by'] = $user_id;
                            $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                            $id = $res['record_id'];
                            $app_data =  array('permit_id' => $id, 
                                               'application_status_id'=>$application_status_id,
                                               'dola' => Carbon::now(),
                                               'altered_by' => $user_id);
                            $app_where = array('id'=>$application_id);
                            $appprev_data = getPreviousRecords('tra_product_applications', $app_where);
                            $res = updateRecord('tra_product_applications', $appprev_data['results'], $app_where,$app_data, $user_id);
							//send notifications 
							// applicant_name', 't3.email as applicant_email
							if($decision_id == 1  || $decision_id == 2){
								$message = $this->getProductApprovalTemplate($application_details->section_id,$application_details->brand_name,$application_details->sub_module_id,$application_details->reference_no,$certificate_no,$approval_date,$application_code);
								//sendMailNotification($application_details->applicant_name, $application_details->applicant_email,'Approval Recommendation',$message);
                                
                                if($application_details->sub_module_id == 9){
                                    $file_path = public_path('/resources/uploads/ammendement_approval_letter.pdf');
                                    generateAmmendementApprovalletter($reference_no, true, $file_path);                             
                                    sendMailNotification($application_details->applicant_name, $application_details->applicant_email,'Approval Recommendation',$message,'','', $file_path,'Letter of approval for product ammendment','', array());
                                    
                                    }
                                    else{
                                    sendMailNotification($application_details->applicant_name, $application_details->applicant_email,'Approval Recommendation',$message);
                                    
                                    }
							}
                         
                        }
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
	public function getProductApprovalTemplate($section_id,$brand_name,$sub_module_id,$reference_no,$certificate_no,$registration_date,$application_code){
			$template = "<div style='font-size:14px;font-weight: normal;text-align:justify;'>";
						$brand_name = strtoupper($brand_name);
						if($sub_module_id == 7){
							$template .= "<p style= 'font-size:18px;font-weight: bold;font-style:underline;'>NOTICE OF APPROVAL OF YOUR APPLICATION FOR REGISTRATION OF ".$brand_name."</b></p>";
							$template .= "<p>";
							$template .= "Reference is made to the application for registration of the above mentioned product in Tanzania.";
							$template .= "<p>";
							$template .= "TMDA wishes to notify you that, your application with reference number ".$reference_no." has been granted registration with effect from ".$registration_date.". <br>";
							$template .= "<p>";
							$template .= "The product registration number is ".$certificate_no;
							$template .= "<p>";
							$template .= "The product particulars contained in the attachment to this notification, should be confirmed to TMDA within seven (7) days from the date of this notification.";
							$template .= "<p>";
							$template .= "Thereafter, registration certificate can be collected from TMDA offices within thirty (30) days from the date of this notification.";
							
							if($section_id == 2){
								$template .= "<p>";
								$template .= "Note that you are required to comply with the terms and conditions of registration as indicated in the certificate of drug registration.";
								$template .= "<p>";
								$template .= "You are further reminded to ensure that registration number is printed on the container label (outer packaging or, where there is no outer packaging, on the immediate packaging) prior to marketing of the product; pursuant to regulation number 25 (5) of the Tanzania Medicines and Medical Devices (Registration of Medicinal Products) Regulations, 2015.";
								$template .= "<p>";
							}
							else{
								$template .= "<p>";
								$template .= "Note that you are required to comply with the terms and conditions of registration as indicated in the certificate of Medical Devices registration.";
								$template .= "<p>";
							}
							
							
						}
						else if($sub_module_id == 8){
							$template .= "<p style= 'font-size:18px;font-weight: bold;font-style:underline;'>NOTICE OF APPROVAL OF YOUR APPLICATION FOR RENEWAL OF REGISTRATION OF ".$brand_name;
							$template .= "<p>";
							$template .= "Reference is made to the application for renewal of the above mentioned product in Tanzania.";
							$template .= "<p>";
							$template .= "TMDA wishes to notify you that, your application with reference number ".$reference_no." has been granted renewal with effect from ".$registration_date.". <br>";
							$template .= "<p>";
							$template .= "The product registration number is ".$certificate_no;
							$template .= "<p>";
							$template .= "The product particulars contained in the attachment to this notification, should be confirmed to TMDA within seven (7) days from the date of this notification.";
							$template .= "<p>";
							$template .= "Thereafter, registration certificate can be collected from TMDA offices within thirty (30) days from the date of this notification.";
							$template .= "<p>";
							
							if($section_id == 2){
								$template .= "Note that you are required to comply with the terms and conditions of registration as indicated in the certificate of drug registration.";
							$template .= "<p>";
								$template .= "You are further reminded to ensure that registration number is printed on the container label (outer packaging or, where there is no outer packaging, on the immediate packaging) prior to marketing of the product; pursuant to regulation number 25 (5) of the Tanzania Medicines and Medical Devices (Registration of Medicinal Products) Regulations, 2015.";
								$template .= "<p>";
							}
							
							else{
								$template .= "Note that you are required to comply with the terms and conditions of registration as indicated in the certificate of Medical Devices registration.";
							$template .= "<p>";
							}
						
						}
						else if($sub_module_id == 9){
							$template .= "<p style= 'font-size:18px;font-weight: bold;font-style:underline;'>ACCEPTANCE OF CHANGE(S) TO ".$brand_name." OF CERTIFICATE NO ".$certificate_no;
							
							$template .= "<p>";
							$template .= "This is in reference to your application to implement a change to the above named registered medicinal product. .";
							$template .= "<p>";
							$template .= "We are happy to inform you that the following requests have been accepted:";
							$template .= "<p>";
							$record = DB::table('tra_application_variationsdata as t1')
							->select('t1.*')
							->where(array('application_code'=>$application_code))
							->get();
							if($record ){
								$i = 1;
								foreach($record  as $rows){
									$template .= $i.". ".$rows->proposed_variation;
									$i++;
								}
							}
							$template .= "<p>";
							
						}else if($sub_module_id == 17){
							$template .= "<p style= 'font-size:18px;font-weight: bold;font-style:underline;'>WITHDRAWAL  OF  ".$brand_name." OF CERTIFICATE NO ".$certificate_no." FROM THE LIST OF REGISTERED PRODUCTS";
							
							$template .= "<p>";
							$template .= "This is in reference to the request of the following named registered medicinal product. .";
							$template .= "<p>";
							$template .= "We are regret to inform you that the following product has been withdrawn from our register.";
							$template .= "<p>";
							
							$template .= "<p>";
							
						}else if($sub_module_id == 20){
							$template .= "<p style= 'font-size:18px;font-weight: bold;font-style:underline;'>REVERSAL OF THE WITHDRAWAL  OF  ".$brand_name." OF CERTIFICATE NO ".$certificate_no." FROM THE LIST OF REGISTERED PRODUCTS";
							
							$template .= "<p>";
							$template .= "This is in reference to the request of the following named registered medicinal product.";
							$template .= "<p>";
							$template .= "We are happy to inform you reversal of the withdrawal the above mentioned product.";
							$template .= "<p>";
							
							$template .= "<p>";
							
						}
						$template .= "Thank you for your co-operation.";
						return $template;
			
			
		}
    public function saveProductsonlineapplicationreceiceinvoiceDetails(Request $request){
        DB::beginTransaction();
        try {

            $res = $this->saveInitialNonSubmissionProdDetails($request);
            
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
        
        return   $res ; 
    }
    
    public function saveInitialNonSubmissionProdDetails($request)
    {
        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $status_type_id = $request->input('status_type_id');
        $application_code = $request->input('application_code');
        $sub_module_id = $request->input('sub_module_id');
		
        $next_stage = $request->input('curr_stage_id');

        $user_id = $this->user_id;
        
        $applications_table = 'tra_product_applications';
       
                $portal_db = DB::connection('portal_db');
                            $qry = $portal_db->table('wb_product_applications as t1')
                            ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
                            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                                ->where('t1.id', $application_id);

                            $results = $qry->first();
                
                            if (is_null($results)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                                );
                                return $res;
                            }
                         
                            $application_code = $results->application_code;
                    
                    $app_previousdata = DB::table($applications_table)
                                        ->where('application_code',$application_code)
                                        ->first();
                     $results = $qry->first();

                    if(!$app_previousdata){

                        $user_id = $this->user_id;
                        $portal_db = DB::connection('portal_db');

                        $qry = $portal_db->table('wb_product_applications as t1')
                            ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
                            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                                ->where('t1.id', $application_id);

                           
                            if (is_null($results)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                                );
                                return $res;
                            }
                            $tracking_no = $results->tracking_no;
                            $sub_module_id = $results->sub_module_id;
                            $module_id = $results->module_id;
                            $zone_id = $results->zone_id;
                            $section_id = $results->section_id;
                            $classification_id = $results->classification_id;
                            
                            $assessment_procedure_id = $results->assessment_procedure_id;
                            
                            $portal_application_id = $results->id;
                            $reg_product_id = $results->reg_product_id;
                            $portal_product_id = $results->product_id;
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
                            $process_id = $process_details->id;

                            
                            $workflow_details = getTableData('wf_workflow_stages', array('id' => $next_stage));
                        
                            if (is_null($workflow_details)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                                );
                                return $res;
                            }

                            //$ref_no = $results->reference_no;
                        
                            $application_code = $results->application_code;;
                            $is_fast_track = $results->is_fast_track;;
                            $paying_currency_id = $results->paying_currency_id;;

                            $applicant_details = $portal_db->table('wb_trader_account')
                                ->where('id', $results->trader_id)
                                ->first();
                            
                                $localgent_details = $portal_db->table('wb_trader_account')
                                ->where('id', $results->local_agent_id)
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
                            if (!is_null($localgent_details)) {
                                $local_agent_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $localgent_details->identification_no), 'id');
                            }
                            $applicant_email = $applicant_details->email;
                            if (!is_null($localgent_details)) {
                                $localagent_email = $localgent_details->email;
                            }
                            //premise main details
                            $product_details = $portal_db->table('wb_product_information')
                                ->where('id', $results->product_id)
                                ->first();

                            if (is_null($product_details)) {
                                DB::rollBack();
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting application details, consult System Admin!!'
                                );
                                return $res;
                            }
                            $product_details->portal_id = $results->product_id;
                            $product_details->created_by = $this->user_id;
                            $product_details = convertStdClassObjToArray($product_details);

                            unset($product_details['id']);
                            $product_details['created_on'] = Carbon::now();
                            $product_details['created_by'] = $user_id;
                            
                            $prod_insert = insertRecord('tra_product_information', $product_details, $user_id);
                            
                            if ($prod_insert['success'] == false) {
                                DB::rollBack();
                                return $prod_insert;
                            }
                            $product_id = $prod_insert['record_id'];
                            //product other information other details
                            //ingredients
                            
                            $app_status_id = 5;
                            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');

                            $registration_data = array('tra_product_id' => $product_id,
                                    'status_id' => $app_status_id,
                                    'validity_status_id' => 1,
                                    'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => (isset($local_agent_id))?$local_agent_id:null,
                                    'registration_status_id' => 1
                                );
                            if($sub_module_id == 7){
                                $where_statement = array('tra_product_id' => $product_id);
                                $product_regresp = saveApplicationRegistrationDetails('tra_registered_products', $registration_data, $where_statement, $user_id);
                                
                                if( $product_regresp['success']){
                    
                                    $reg_product_id = $product_regresp['record_id'];
                                }   

                            }
                            
                            funcSaveOnlineProductOtherdetails($portal_product_id, $product_id,$reg_product_id, $user_id);
                        
                            $view_id = generateApplicationViewID();
                            $application_details = array(
                                //'reference_no' => $ref_no,
                                'tracking_no' => $tracking_no,
                                'applicant_id' => $applicant_id, 
                                'local_agent_id' => (isset($local_agent_id))?$local_agent_id:null,
                                'application_code' => $application_code,
                                'product_id' => $product_id,
                                'module_id' => $results->module_id,
                                'sub_module_id' => $results->sub_module_id,
                                'zone_id' => $results->zone_id,
                                'section_id' => $results->section_id,
                                'date_added'=>Carbon::now(),
                                'view_id'=>$view_id,
                                'reg_product_id'=>$reg_product_id,
                                'assessment_procedure_id'=>$assessment_procedure_id ,
                                'process_id' => $process_details->id,
                                'workflow_stage_id' => $workflow_details->id,
                                'application_status_id' => $app_status_id,
                                'paying_currency_id'=>$paying_currency_id,
                                'is_fast_track'=>$is_fast_track,
                                'portal_id' => $portal_application_id,
                                'dola' =>  Carbon::now(),
                                'altered_by'=>$user_id
                            );
							if($sub_module_id != 7){
								$application_details['reference_no'] = $tracking_no;
								$application_details['refno_generated'] =1;
							}
                            $application_insert = insertRecord('tra_product_applications', $application_details, $user_id);
                            if ($application_insert['success'] == false) {
                                DB::rollBack();
                                return $application_insert;
                            }
                            
                            $mis_application_id = $application_insert['record_id'];
                        
                            
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
                            
                            DB::commit();
                            //send email
                            $vars = array(
                                '{tracking_no}' => $tracking_no
                            );
                            if ($sub_module_id == 9) {//Alteration
                                $this->syncApplicationOnlineVariationRequests($application_code);
                            }
                            if ($sub_module_id == 17) {//Withdrawal
                                $this->syncApplicationOnlineWithdrawalReasons($application_code);
                            }
                        
                            onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
							if($portal_status_id == 6 || $portal_status_id == 8){
								$vars = array(
									'{tracking_no}' => $tracking_no
								);
								onlineApplicationNotificationMail(3, $applicant_email, $vars,$identification_no);
							}
                            DB::commit();

                            $res = $this->saveApplicationInvoicingDetails($request,$mis_application_id,$application_code,$tracking_no,$is_fast_track);

                            
                    }
                    else{
                       
                        $tracking_no = $results->tracking_no;
                        $application_code = $results->application_code;
                        $is_fast_track = $results->is_fast_track;
                        $details = $this->updateOnlineProductDetails($results,$request,$app_previousdata,$is_portalupdate=0);
                        $mis_application_id = $details['application_id'];
                        $res = $this->saveApplicationInvoicingDetails($request,$mis_application_id,$application_code,$tracking_no,$is_fast_track);

                    }
                   
                    
                     return $res;
    }
    public function saveProductOnlineApplicationDetails(Request $request)
    {
        DB::beginTransaction();
        try {

            $status_type_id = $request->input('status_type_id');
            $res = $this->saveInitialProductOnlineApplicationDetails($request);
            
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
        
        return   $res ;
    }
    //the details 
    //save
    

    //the details 
    public function receiveProductEvaluationQueryResponse(Request $request)
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
        $table_name = "tra_product_applications";
        $application_status_id = 8;
        DB::beginTransaction();
        try {
            $portal_db = DB::connection('portal_db');
                            $qry = $portal_db->table('wb_product_applications as t1')
                            ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
                            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                                ->where('t1.id', $application_id);
                            $results = $qry->first();
                
                            if (is_null($results)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                                );
                                return $res;
                            }
                         
                            $application_code = $results->application_code;
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
            $last_query_ref_id = $application_details->lastquery_ref_id;
            $where_querydata = array('application_code'=>$application_code, 'id'=>$last_query_ref_id);

            $query_app = DB::table('tra_application_query_reftracker as t1')
                              ->where($where_querydata)
                              ->first();

             if (is_null($query_app)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while fetching application query details!!'
                                );
                                echo json_encode($res);
                                exit();
             }

             //update details 
             $query_data = array('response_received_on'=>Carbon::now(),
                'response_received_by'=>$user_id,
                'dola' => Carbon::now(),
                'altered_by' => $user_id
            );
            if (recordExists('tra_application_query_reftracker', $where_querydata)) {
                //$app_details = getTableData($applications_table, $where_app);
                $query_table = 'tra_application_query_reftracker';
                $app_details = getPreviousRecords('tra_application_query_reftracker', $where_querydata);
                if ($app_details['success'] == false) {
                    return $app_details;
                }
                $app_details = $app_details['results'];
                updateRecord($query_table, $app_details, $where_querydata, $query_data, $user_id);
            }

            $where = array(
                'application_code' => $application_code
            );

            $app_update = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => 8
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

            $portal_params = array(
                'application_status_id' => 5
            );

            $portal_where = array(
                'application_code' => $application_code
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
                'created_by' => $user_id
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
    public function getInitialStatus($stage_id){

           // $rec = DB::table('wf_workflow_transitions')->where(array('nextstage_id'=>$stage_id))->first();


    }
    public function saveInitialDetails($request){

        $user_id = $this->user_id;
        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $status_type_id = $request->input('status_type_id');
        
        $next_stage = $request->input('next_stage');
        $portal_db = DB::connection('portal_db');

        $qry = $portal_db->table('wb_product_applications as t1')
            ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                ->where('t1.id', $application_id);

            $results = $qry->first();

            if (is_null($results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                );
                return $res;
            }
            $tracking_no = $results->tracking_no;
            $sub_module_id = $results->sub_module_id;
            $module_id = $results->module_id;
            $zone_id = $results->zone_id;
            $section_id = $results->section_id;
            $classification_id = $results->classification_id;
            
            $assessment_procedure_id = $results->assessment_procedure_id;
            
            $portal_application_id = $results->id;
            $reg_product_id = $results->reg_product_id;
            $portal_product_id = $results->product_id;
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
            $process_id = $process_details->id;

            
            $workflow_details = getTableData('wf_workflow_stages', array('id' => $next_stage));
           
            if (is_null($workflow_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                );
                return $res;
            }

            //$ref_no = $results->reference_no;
        
            $application_code = $results->application_code;;
            $is_fast_track = $results->is_fast_track;;
            $paying_currency_id = $results->paying_currency_id;;

            $applicant_details = $portal_db->table('wb_trader_account')
                ->where('id', $results->trader_id)
                ->first();
            
                $localgent_details = $portal_db->table('wb_trader_account')
                ->where('id', $results->local_agent_id)
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
            if (!is_null($localgent_details)) {
                $local_agent_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $localgent_details->identification_no), 'id');
            }            

            $applicant_email = $applicant_details->email;
            if (isset($localgent_details)){
                $localagent_email = $localgent_details->email;
            }
            
            //premise main details
            $product_details = $portal_db->table('wb_product_information')
                ->where('id', $results->product_id)
                ->first();

            if (is_null($product_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting application details, consult System Admin!!'
                );
                return $res;
            }
            $product_details->portal_id = $results->product_id;
            $product_details->created_by = $this->user_id;
            $product_details = convertStdClassObjToArray($product_details);

            unset($product_details['id']);
			unset($product_details['product_type_id']);
            $product_details['created_on'] = Carbon::now();
            $product_details['created_by'] = $user_id;
            
            
            $prod_insert = insertRecord('tra_product_information', $product_details, $user_id);
            
            if ($prod_insert['success'] == false) {
                DB::rollBack();
                return $prod_insert;
            }
            $product_id = $prod_insert['record_id'];
            //product other information other details
            //ingredients
            
            $app_status_id = 5;
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');

            $registration_data = array('tra_product_id' => $product_id,
                    'status_id' => $app_status_id,
                    'validity_status_id' => 1,
					'reg_applicant_id' => $applicant_id,
                                    'reg_local_agent_id' => (isset($local_agent_id))?$local_agent_id:null,
                    'registration_status_id' => 1
                );
            if($sub_module_id == 7){
                $where_statement = array('tra_product_id' => $product_id);
                $product_regresp = saveApplicationRegistrationDetails('tra_registered_products', $registration_data, $where_statement, $user_id);
                
                if( $product_regresp['success']){
    
                    $reg_product_id = $product_regresp['record_id'];
                }   

            }
            
            funcSaveOnlineProductOtherdetails($portal_product_id, $product_id,$reg_product_id, $user_id);
         $zone_id = $results->zone_id;
            $view_id = generateApplicationViewID();
            $application_details = array(
                //'reference_no' => $ref_no,
                'tracking_no' => $tracking_no,
                'applicant_id' => $applicant_id, 
                'local_agent_id' => (isset($local_agent_id))?$local_agent_id:null,
                'application_code' => $application_code,
                'product_id' => $product_id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'date_added'=>Carbon::now(),
                'view_id'=>$view_id,
                'reg_product_id'=>$reg_product_id,
                'assessment_procedure_id'=>$assessment_procedure_id ,
                'process_id' => $process_details->id,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'paying_currency_id'=>$paying_currency_id,
                'is_fast_track'=>$is_fast_track,
                'portal_id' => $portal_application_id,
                'dola' =>  Carbon::now(),
                'altered_by'=>$user_id
            );
            $application_insert = insertRecord('tra_product_applications', $application_details, $user_id);
            if ($application_insert['success'] == false) {
                DB::rollBack();
                return $application_insert;
            }
            
            $mis_application_id = $application_insert['record_id'];
        
            $portal_params = array(
                'application_status_id' => 3,
                //'reference_no' => $ref_no
            );
            $portal_where = array(
                'application_code' => $application_code
            );
            
       
            $res = updatePortalParams('wb_product_applications', $portal_params, $portal_where);
           
            $details = array(
                'application_id' => $application_insert['record_id'],
                'application_code' => $application_code,
                //'reference_no' => $ref_no,
                'application_status' => $application_status,
                'process_id' => $process_details->id,
                'process_name' => $process_details->name,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'workflow_stage' => $workflow_details->name,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id,
                'product_id' => $product_id,
                'applicant_id' => $applicant_id
            );
            //submissions
			$where = array(
                                't1.module_id' => $results->module_id,
                                't1.sub_module_id' => $results->sub_module_id,
                                't1.section_id' => $results->section_id
                            );

                            $rec = DB::table('wf_tfdaprocesses as t1')
                                            ->join('wf_workflow_stages as t2', 't1.workflow_id','=','t2.workflow_id')
                                            ->where($where)
                                            ->select('t2.id as current_stage','t1.id as process_id')
                                            ->where('stage_status',1)
                                            ->first();
            $submission_params = array(
                'application_id' => $application_insert['record_id'],
                'process_id' => $process_details->id,
                'application_code' => $application_code,
            //  'reference_no' => $ref_no,
                'tracking_no' => $tracking_no,
                'usr_from' => $user_id,
                'usr_to' => $responsible_user,
                'previous_stage' => $rec->current_stage,
                'current_stage' => $workflow_details->id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id,
                'application_status_id' => $app_status_id,
                'urgency' => $urgency,
                'view_id'=>$view_id,
                'applicant_id' => $applicant_id,
                'zone_id' => $zone_id,
                'remarks' => $comment,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            DB::table('tra_submissions')
                ->insert($submission_params);
            DB::commit();
            //send email
            $vars = array(
                '{tracking_no}' => $tracking_no
            );
            if ($sub_module_id == 9) {//Alteration
                $this->syncApplicationOnlineVariationRequests($application_code);
            }
            if ($sub_module_id == 17) {//Withdrawal
                $this->syncApplicationOnlineWithdrawalReasons($application_code);
            }
           
            onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
          
        return $details;
    }
    public function syncApplicationOnlineWithdrawalReasons($application_code)
    {
        $user_id = $this->user_id;
        $portal_db = DB::connection('portal_db');
        $reasons = $portal_db->table('wb_application_withdrawaldetails')
            ->where('application_code', $application_code)
            ->select(DB::raw("id as portal_id,application_code,withdrawal_category_id,reason_for_withdrawal,status_id,
                        $user_id as created_by"))
            ->get();
        $reasons = convertStdClassObjToArray($reasons);
        DB::table('tra_application_withdrawaldetails')
            ->insert($reasons);
    }

    public function syncApplicationOnlineVariationRequests($application_code)
    {
        $user_id = $this->user_id;
        $portal_db = DB::connection('portal_db');
        $variations = $portal_db->table('wb_application_variationsdata')
            ->where('application_code', $application_code)
            ->select(DB::raw("id as portal_id,appuploaded_document_id,application_code,variation_type_id,variation_category_id,present_details,proposed_variation,
                        variation_background_information,status_id,$user_id as created_by"))
            ->get();
        $variations = convertStdClassObjToArray($variations);
        DB::table('tra_application_variationsdata')
            ->insert($variations);
            
    }
    public function updateOnlineProductDetails($results,$request,$app_previousdata,$is_portalupdate=1){
        $user_id = $this->user_id;
        $curr_stage_id = $request->input('curr_stage_id');
		$responsible_user = $request->input('responsible_user');
        $comment = $request->input('comment');  $urgency = $request->input('urgency');
        $portal_db = DB::connection('portal_db');
        $next_stage = $request->input('next_stage');$applications_table = 'tra_product_applications';
    
							$product_id = $app_previousdata->product_id;
                            $tracking_no = $results->tracking_no;
                            $sub_module_id = $results->sub_module_id;
                            $module_id = $results->module_id;
                            $zone_id = $results->zone_id;
                            $section_id = $results->section_id;
                            $classification_id = $results->classification_id;
                            
                            $assessment_procedure_id = $results->assessment_procedure_id;
                            
                            $portal_application_id = $results->id;
                            $reg_product_id = $results->reg_product_id;
                            $portal_product_id = $results->product_id;
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

                            $process_id = $process_details->id;
                            $workflow_details = getTableData('wf_workflow_stages', array('id' => $curr_stage_id));
                            $rec = DB::table('wf_workflow_transitions as t1')
                                        ->join('wf_workflow_actions as t2', 't1.action_id','t2.id')
										->join('wf_workflow_stages as t3', 't1.stage_id','t3.id')
                                        ->select('portal_status_id','t1.application_status_id as app_status_id')
										->where(array('nextstage_id'=>$curr_stage_id,'stage_status'=>1) )
                                       ->first();
								
                            $portal_status_id = 3;
                            $app_status_id = 1;
                            if($rec){
                                $portal_status_id = $rec->portal_status_id;
                                $app_status_id = $rec->app_status_id;
                            }
                            if (is_null($workflow_details)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting workflow details, consult System Admin!!'
                                );
                                return $res;
                            }
                
                            //$ref_no = $results->reference_no;
                          
                            $application_code = $results->application_code;;
                
                            $applicant_details = $portal_db->table('wb_trader_account')
                                ->where('id', $results->trader_id)
                                ->first();
                            
                                $localgent_details = $portal_db->table('wb_trader_account')
                                ->where('id', $results->local_agent_id)
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
                            if (!is_null($localgent_details)) {
                                $local_agent_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $localgent_details->identification_no), 'id');
                            }
                            $applicant_email = $applicant_details->email;
                            if (!is_null($localgent_details)) {
                                $localagent_email = $localgent_details->email;
                            }
                            //premise main details
                            $product_details = $portal_db->table('wb_product_information')
                                ->where('id', $results->product_id)
                                ->first();
                
                            if (is_null($product_details)) {
                                DB::rollBack();
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting application details, consult System Admin!!'
                                );
                                return $res;
                            }
                        
                            $product_portal_id = $results->product_id;
                            $product_details->portal_id = $results->product_id;
                            $product_details->created_by = $this->user_id;
                            $product_details = convertStdClassObjToArray($product_details);
                
                            unset($product_details['id']);
                            $product_details['created_on'] = Carbon::now();
                            $product_details['created_by'] = $user_id;
                           
                            $whereproduct_data = array('id'=>$product_id);

                            $product_table = 'tra_product_information';
                            $where = array('');
                            $product_previousdata = getPreviousRecords($product_table, $whereproduct_data);
                            $product_previousdata = $product_previousdata['results'];
							
                            $prod_update = updateRecord($product_table, $product_previousdata, $whereproduct_data, $product_details, $user_id, '');
                           
                            if ($prod_update['success'] == false) {
                                DB::rollBack();
                                return $prod_update;
                            }
                           
                            $product_id = $prod_update['record_id'];
                            $where = array(
                                't1.module_id' => $results->module_id,
                                't1.sub_module_id' => $results->sub_module_id,
                                't1.section_id' => $results->section_id
                            );

                            $rec = DB::table('wf_tfdaprocesses as t1')
                                            ->join('wf_workflow_stages as t2', 't1.workflow_id','=','t2.workflow_id')
                                            ->where($where)
                                            ->select('t2.id as current_stage','t1.id as process_id')
                                            ->where('stage_status',1)
                                            ->first();
									
                            $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                           // $app_status_id = $app_status->status_id;

                            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
                           
                            $reg_product_id =  $app_previousdata->reg_product_id;
                            
                            funcSaveOnlineProductOtherdetails($portal_product_id, $product_id,$reg_product_id, $user_id);
                           
                            $view_id = generateApplicationViewID();
                           $zone_id = $results->zone_id;
                            $application_details = array(
                                //'reference_no' => $ref_no,
                                'tracking_no' => $tracking_no,
                                'applicant_id' => $applicant_id, 
                                'local_agent_id' => (isset($local_agent_id))?$local_agent_id:null,
                                'application_code' => $application_code,
                                'product_id' => $product_id,
                                'module_id' => $results->module_id,
                                'sub_module_id' => $results->sub_module_id,
                                'zone_id' => $results->zone_id,
                                'section_id' => $results->section_id,
                                'date_added'=>Carbon::now(),
                                'view_id'=>$view_id,
                                'reg_product_id'=>$reg_product_id,
                                'assessment_procedure_id'=>$assessment_procedure_id ,
                                'process_id' => $process_details->id,
                                'workflow_stage_id' => $workflow_details->id,
                                'application_status_id' => $app_status_id,
                                'portal_id' => $portal_application_id,
                                'dola' =>  Carbon::now(),
                                'altered_by'=>$user_id
                            );
                            //update the details 
                            if($sub_module_id != 7){

                                $application_details['reference_no'] = $tracking_no;

                            }
                            $where_data = array('application_code'=>$application_code);
                           
                             $app_previousdata = getPreviousRecords($applications_table, $where_data);
                             $app_previousdata = $app_previousdata['results'];
                            $application_update =  updateRecord($applications_table, $app_previousdata, $where_data, $application_details, $user_id, '');
                          
                            if ($application_update['success'] == false) {
                                DB::rollBack();
                                return $application_update;
                            }
                          
                            $mis_application_id = $application_update['record_id'];
                           
                            $portal_params = array(
                                'application_status_id' => $portal_status_id,
                                //'reference_no' => $ref_no
                            );
                            if($sub_module_id != 7){

                                $portal_params['reference_no'] = $tracking_no;
                                
                            }
                            $portal_where = array(
                                'application_code' => $application_code
                            );
                            if($is_portalupdate ==1){
                                updatePortalParams('wb_product_applications', $portal_params, $portal_where);
								
                            }

                            $details = array(
                                'application_id' => $application_update['record_id'],
                                'application_code' => $application_code,
                                //'reference_no' => $ref_no,
                                'application_status' => $application_status,
                                'process_id' => $process_details->id,
                                'process_name' => $process_details->name,
                                'workflow_stage_id' => $workflow_details->id,
                                'application_status_id' => $app_status_id,
                                'workflow_stage' => $workflow_details->name,
                                'module_id' => $results->module_id,
                                'sub_module_id' => $results->sub_module_id,
                                'section_id' => $results->section_id,
                                'product_id' => $product_id,
                                'applicant_id' => $applicant_id,
                                'localagent_email' => (isset($localagent_email))?$localagent_email:null,
                                'identification_no' => $identification_no,
                                'applicant_email'=>$applicant_email
                            );
                            //submissions
							
                            $submission_params = array(
                                'application_id' => $application_update['record_id'],
                                'process_id' => $process_details->id,
                                'application_code' => $application_code,
                                'tracking_no' => $tracking_no,
                                'usr_from' => $user_id,
                                //'released_by' => $user_id,
                                'usr_to' => $responsible_user,
                                'previous_stage' => $rec->current_stage,
                                'current_stage' => $workflow_details->id,
                                'module_id' => $results->module_id,
                                'sub_module_id' => $results->sub_module_id,
                                'section_id' => $results->section_id,
                                'application_status_id' => $app_status_id,
                                'urgency' => $urgency,
                                'view_id'=>$view_id,
                                'applicant_id' => $applicant_id,
                                'zone_id' => $zone_id,
                                'remarks' => $comment,
                                'date_received' => Carbon::now(),
                                
                                'created_on' => Carbon::now(),
                                'created_by' => $user_id
                            );

                            if($sub_module_id != 7){

                                $submission_params['reference_no'] = $tracking_no;
                                
                            }
                            if($is_portalupdate ==1){
                                    DB::table('tra_submissions')
                                    ->insert($submission_params);
                            }
			$vars = array(
                '{tracking_no}' => $tracking_no
            );
            onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
            //email 4 localagent_email
			if($portal_status_id == 6 || $portal_status_id == 8){
								$vars = array(
									'{tracking_no}' => $tracking_no
								);
								onlineApplicationNotificationMail(3, $applicant_email, $vars,$identification_no);
							}
                           
                            DB::commit();
                            return  $details;


    }
    public function saveInitialProductOnlineApplicationDetails($request)
    {

        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $status_type_id = $request->input('status_type_id');
        $application_code = $request->input('application_code');
        $sub_module_id = $request->input('sub_module_id');
		
        $curr_stage_id = $request->input('curr_stage_id');

        $next_stage = $request->input('next_stage');
        $user_id = $this->user_id;
        
        $applications_table = 'tra_product_applications';
       
                $portal_db = DB::connection('portal_db');
                            $qry = $portal_db->table('wb_product_applications as t1')
                            ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
                            ->select('t1.*','t1.reg_product_id', 't2.classification_id','t1.assessment_procedure_id')
                                ->where('t1.id', $application_id);
                            $results = $qry->first();
                
                            if (is_null($results)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
                                );
                                return $res;
                            }
                         
                            $application_code = $results->application_code;
                    
                    $app_previousdata = DB::table($applications_table)
                                        ->where('application_code',$application_code)
                                        ->first();
                    if($app_previousdata){
                        $tracking_no = $app_previousdata->tracking_no;

                            $details = $this->updateOnlineProductDetails($results,$request,$app_previousdata);
                            //send email
                            $identification_no = $details['identification_no'];
                            $localagent_email = $details['localagent_email'];
                            $applicant_email = $details['applicant_email'];
                            $vars = array(
                                '{tracking_no}' => $tracking_no,
                                'identification_no'=>$identification_no,
                                'localagent_email'=>$localagent_email
                            );
                            onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
                           
                    }
                    else{
                       
                        $details = $this->saveInitialDetails($request);

                    }

       //email 4 localagent_email
            $res = array(
                'success' => true,
                'details' => $details,
                'message' => 'Application saved successfully in the MIS!!'
            );
			return $res;
    }
    public function getProductInvoiceDetails($application_id,$application_code)
    {
        $where = array('t1.application_code'=>$application_code);
        
        $qry = DB::table('tra_product_applications as t1')
            ->leftJoin('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->leftJoin('tra_product_information as t3', 't1.product_id', '=', 't3.id')
            ->leftJoin('par_common_names as t5', 't3.common_name_id', '=', 't5.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->join('tra_application_invoices as t6', 't1.application_code', '=', 't6.application_code')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,t6.id as invoice_id,
                     CONCAT_WS(', ',t3.brand_name,t5.name) as module_desc"))
            ->where($where);
        $invoice_details = $qry->first();
       
        return $invoice_details;
        
    }
}