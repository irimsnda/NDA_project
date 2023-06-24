<?php


namespace Modules\ProductNotification\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait ProductsNotificationTrait
{
    public function getProductNotificationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $class_code = getSingleRecordColValue('par_classifications', array('id' => $application_details->classification_id), 'code');
        $device_typecode = getSingleRecordColValue('par_device_types', array('id' => $application_details->device_type_id), 'code');

        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'class_code' => $class_code,
            'device_typecode'=>$device_typecode
        );  
              
        return $codes_array;
    }
    public function processProductsNotificationSubmission(Request $request)
    {
        $user_id = $this->user_id;

        $directive_id = $request->input('directive_id');
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $application_code = $request->input('application_code');

        $keep_status = $request->input('keep_status');
        $table_name = $request->input('table_name');
        
        $application_id = $request->input('application_id');
        $process_id = $request->input('process_id');
        
        $data = DB::table('wf_workflow_actions')
                ->where(array('stage_id'=>$request->curr_stage_id,'id'=>$request->action))
                ->select('*')
                ->first();
                
        if($data){
            $application_details = DB::table($table_name. ' as t1')
                    ->join('tra_product_information as t2', 't1.product_id', '=','t2.id')
                    ->select('t1.*', 't2.classification_id', 't2.device_type_id')
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

                 $action_details = $this->getApplicationWorkflowActionDetails($action);
                 $keep_status = $action_details->keep_status;
                 $action_type = $action_details->action_type_id;
                 $sub_module_id = $application_details->sub_module_id;
                 $module_id = $application_details->sub_module_id;
                 
                if($update_portal_status == 1){
                    $proceed = updatePortalApplicationStatusWithCode($application_code, 'wb_product_applications',$portal_status_id);
                    if ($proceed == false) {
                        echo json_encode($proceed);
                        exit();
                    }      
                }
                if ($action_details->generate_refno == 1) {
                    if ($refno_generated != 1) {

                        $codes_array = $this->getProductNotificationReferenceCodes($application_details);
                       
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

        }
        else{
                 $this->processNormalApplicationSubmission($request);
        }

        
    }

    public function processProductNotificationManagersSubmission($request)
    {
        $action = $request->input('action');
         $action_details = $this->getApplicationWorkflowActionDetails($action);
         $keep_status = $action_details->keep_status;
         $action_type = $action_details->action_type_id;
         $approval_submission = $action_details->is_approval_submission;

        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $keep_status = false;
        
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

    public function updateQueriedProductNotificationPortal(Request $request, $application_details)
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

    public function updateRejectedProductNotificationPortal(Request $request, $application_details)
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

    public function processProductReturnNotificationSubmissionsWithChecklists($request, $checklist_category)
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

    public function updateProductNotificationManagerQueryToCustomerPortal($portal_ids)
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

    public function singleNewProductNotificationApprovalSubmission($request)
    {
        $application_code = $request->input('application_code');
        try {
            $valid = $this->validateProductNotificationApprovalApplication($application_code);
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

    public function batchProductNotificationApprovalSubmission(Request $request)
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
                if ($application_detail->decision_id == 1) {
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

  

    //VALIDATION FUNCTIONS
    public function validateProductNotificationReceivingQueriedApplication($application_id)
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

   
    
    public function validateProductNotificationApprovalApplication($application_code)
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
    
    public function saveProductNotificationApprovalDetails(Request $request, $sub_module_id)
    {
     
        if ($sub_module_id == 30) {
            $res = $this->saveProductNotificationRecommendationDetails($request);
        }
        return $res;
    }

    public function saveProductNotificationRecommendationDetails(Request $request)
    {
        
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
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
            ->where('t1.id', $application_id);
        $res = array();
        try {
            DB::transaction(function () use ($qry, $application_id, $application_code, $table_name, $request, $app_details, &$res) {
                $ProductUpdateParams = array();
                $application_details = DB::table($table_name. ' as t1')
                                        ->join('tra_product_information as t2', 't1.product_id', '=','t2.id')
                                        ->select('t1.*', 't2.classification_id', 't2.device_type_id', 't2.product_type_id')
                                        ->where('t1.id', $application_id)
                                        ->first();
                    $zone_id = $application_details->zone_id;
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
                $user_id = $this->user_id;
                $classification_id = $app_details->classification_id;
                $section_id = $app_details->section_id;
                $product_type_id = $app_details->product_type_id;
                $device_type_id = $app_details->device_type_id;
                $sub_module_id = $app_details->sub_module_id;
                $module_id = $app_details->module_id;
                $section_id = $app_details->section_id;
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
                    'certificate_issue_date' => $approval_date,
                    'expiry_date' => $expiry_date,
                    'approved_by' => $approved_by,
                    'dg_signatory' => $dg_signatory,
                    'permit_signatory' => $permit_signatory
                );

                        if($decision_id == 1){

                            $params['expiry_date'] = getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$section_id);

                        }
                         $codes_array = $this->getProductNotificationReferenceCodes($application_details);
                       
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
                            $prev_data_results[0]['record_id'] = $id;
                            $prev_data_results[0]['update_by'] = $user_id;
                            $prev_data_results[0]['recommendation_id'] = $prev_data_results[0]['id'];
                            unset($prev_data_results[0]['id']);
        
                            //permits no formats ref id 
                            DB::table('tra_approval_recommendations_log')
                                ->insert($prev_data_results);
                            if ($decision_id == 1) {
                                $product_status_id = 6;
                                $portal_status_id = 10;
                                $application_status_id = 6;
                                $qry->update(array('application_status_id' => 6));
                                //permit
                                if ($prev_decision_id != 1) {
                                    
                                    $certificate_no = generateApplicationRefNumber($application_id, $table_name, $sub_module_id,  2, $codes_array, $process_id, $zone_id, $user_id,$module_id,$section_id);

                                    if ($refno_details['success'] == false) {
                                        echo json_encode($refno_details);
                                        exit();
                                    }

                                  
                                    $params['certificate_no'] = $certificate_no;
                                }
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>6,
                                                        'validity_status_id'=>2,
                                                        'registration_status_id'=>2,
                                                        'registration_date'=>$approval_date
                                                    );
                            } else {
                                $product_status_id = 3;
                                $portal_status_id = 11;
                                $application_status_id = 3;
                                $qry->update(array('application_status_id' => 7));
                                $params['certificate_no'] = null;
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
                        
                            $params['created_on'] = Carbon::now();
                            $params['created_by'] = $user_id;
                            if ($decision_id == 1) {
                                $portal_status_id = 10;
                                $product_status_id = 6;
                                //permits
                                $application_status_id = 6;
                                $certificate_data = generateApplicationRefNumber($application_id, $table_name, $sub_module_id,  2, $codes_array, $process_id, $zone_id, $user_id,$module_id,$section_id);
                                if ($certificate_data['success'] == false) {
                                    echo json_encode($certificate_data);
                                    exit();
                                }
                                
                                $certificate_no = $certificate_data['ref_no'];

                               $params['certificate_no'] = $certificate_no;
                               
                                $params['expiry_date'] = getApplicationExpiryDate($approval_date,$sub_module_id,$module_id,$section_id);

                                $qry->update(array('application_status_id' => 6));
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                            'status_id'=>6,
                                                            'validity_status_id'=>2,
                                                            'registration_status_id'=>2,
                                                            'registration_date'=>$approval_date
                                                        );

                            } else {
                                $portal_status_id = 11;
                                $product_status_id = 6;
                                $application_status_id = 7;
                                $qry->update(array('application_status_id' => 7));
                                $params['certificate_no'] = '';
                                $params['expiry_date'] = null;
                                $registration_data = array('tra_product_id'=>$app_details->product_id, 
                                                        'status_id'=>7,
                                                        'validity_status_id'=>3,
                                                        'registration_status_id'=>3,
                                                        'registration_date'=>$approval_date,
                                                        
                                                    );
                                
                            }
                            
                            $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                        
                            $id = $res['record_id'];

                        }
                        $where_statement = array('tra_product_id'=>$app_details->product_id);
                            
                        $res = saveApplicationRegistrationDetails('tra_registered_products',$registration_data,$where_statement,$user_id);
                        
                        //update Portal Status
                        updatePortalApplicationStatusWithCode($application_code, 'wb_product_applications',$portal_status_id);

                        //finally update the reqistered products details
                        if($res['success']){
                            $app_data =  array('permit_id' => $id, 
                                                'reg_product_id' => $res['record_id'], 
                                                'application_status_id'=>$application_status_id,
                                                'dola' => Carbon::now(),
                                                'altered_by' => $user_id);
                            $app_where = array('id'=>$application_id);
                            $appprev_data = getPreviousRecords('tra_product_notifications', $app_where);
                            $res = updateRecord('tra_product_notifications', $appprev_data['results'], $app_where,$app_data, $user_id);
                            //update applicaiton registration statuses
                            
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
   
    public function saveMedicalNotificationOnlineApplicationDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        $user_id = $this->user_id;
        
        $applications_table = 'tra_product_notifications';
        
        $next_stage = $request->input('next_stage');
        DB::beginTransaction();
        try {
          
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_product_applications as t1')
            ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
            ->select('t1.*','t1.reg_product_id', 't2.classification_id')
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
            $where2 = array(
                'workflow_id' => $process_details->workflow_id,
                'stage_status' => 1
            );
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
            
            $local_agent_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $localgent_details->identification_no), 'id');
            
            $applicant_email = $applicant_details->email;
            $localagent_email = $localgent_details->email;
            
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
            $reg_product_id = '';
            
            $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
            $app_status_id = $app_status->status_id;
            $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');

            $registration_data = array('tra_product_id' => $product_id,
                    'status_id' => $app_status_id,
                    'validity_status_id' => 1,
                    'registration_status_id' => 1
                );
            
            $where_statement = array('tra_product_id' => $product_id);
            $product_regresp = saveApplicationRegistrationDetails('tra_registered_products', $registration_data, $where_statement, $user_id);

            if( $product_regresp['success']){

                $reg_product_id = $product_regresp['record_id'];
            }
            funcSaveOnlineMedicalNotificationOtherdetails($portal_product_id, $product_id,$reg_product_id, $user_id);
            
            $view_id = generateApplicationViewID();

            $application_details = array(
                'tracking_no' => $tracking_no,
                'applicant_id' => $applicant_id, 
                'local_agent_id' => $local_agent_id,
                'application_code' => $application_code,
                'product_id' => $product_id,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'zone_id' => $results->zone_id,
                'section_id' => $results->section_id,
                'date_added'=>Carbon::now(),
                'view_id'=>$view_id,
                'reg_product_id'=>$reg_product_id,
                'process_id' => $process_details->id,
                'workflow_stage_id' => $workflow_details->id,
                'application_status_id' => $app_status_id,
                'portal_id' => $portal_application_id

            );
            $application_insert = insertRecord($applications_table, $application_details, $user_id);
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
                'id' => $portal_application_id
            );
            updatePortalParams('wb_product_applications', $portal_params, $portal_where);
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
            $submission_params = array(
                'application_id' => $application_insert['record_id'],
                'process_id' => $process_details->id,
                'application_code' => $application_code,
              //  'reference_no' => $ref_no,
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
                'view_id'=>$view_id,
                'applicant_id' => $applicant_id,
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
            onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
            //email 4 localagent_email
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

    public function getProductNotificationInvoiceDetails($application_id)
    {
        $qry = DB::table('tra_product_notifications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('tra_product_information as t3', 't1.product_id', '=', 't3.id')
            ->leftJoin('par_common_names as t5', 't3.common_name_id', '=', 't5.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT_WS(', ',t3.brand_name,t5.name) as module_desc"))
            ->where('t1.id', $application_id);
        $invoice_details = $qry->first();
        return $invoice_details;
        
    }
}