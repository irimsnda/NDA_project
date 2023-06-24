<?php
namespace Modules\PromotionMaterials\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait PromotionMaterialsTrait
{
	
	

	 public function processPromotionMaterialManagersApplicationSubmission($request)
    {
		
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $keep_status = false;
        $data = DB::table('wf_workflow_actions')
                    ->where(array('stage_id'=>$request->curr_stage_id,'id'=>$request->action))
                    ->select('*')
                    ->first();
        
        if($data){
                $keep_status = $data->keep_status;
                if($keep_status == 1){
                     $keep_status = true;
                }
        }
        
         $this->processNormalManagersApplicationSubmission($request, $keep_status);
    }
	 public function savePromoAdvertsApplicationRecommendationDetails(Request $request)
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
                $UpdateParams = array();
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
                $UpdateParams['permit_issue_date'] = $approval_date;
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
                    if ($decision_id == 1) {
                        //$premiseUpdateParams['premise_reg_no'] = $app_details->reference_no;
						$UpdateParams['reference_no'] = $app_details->reference_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        $qry->update(array('application_status_id' => 6));
                        //permit
                        if ($prev_decision_id != 1) {
                            $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 5);
                            $params['permit_no'] = $permit_no;
                        }
                    } else {
                        $UpdateParams['reference_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['permit_no'] = null;
                    }
                    $res = updateRecord('tra_approval_recommendations', $prev_data['results'], $where, $params, $user_id);
                } else {
                    //insert
					$expiry_date = getApplicationExpiryDate($approval_date,$app_details->sub_module_id,$app_details->module_id,$app_details->section_id);
                    $params['created_on'] = Carbon::now();
                    $params['created_by'] = $user_id;
                    $params['expiry_date'] = $expiry_date;
                    if ($decision_id == 1) {
                        $UpdateParams['reference_no'] = $app_details->reference_no;
                        $validity_status_id = 2;
                        $registration_status_id = 2;
                        //permits
                        $permit_no = generatePremisePermitNo($app_details->zone_id, $app_details->section_id, $table_name, $user_id, 5,$app_details->sub_module_id);
                        $params['permit_no'] = $permit_no;
                        $qry->update(array('application_status_id' => 6));
                    } else {
                        $UpdateParams['reference_no'] = null;
                        $validity_status_id = 3;
                        $registration_status_id = 3;
                        $qry->update(array('application_status_id' => 7));
                        $params['permit_no'] = '';
                        $params['expiry_date'] = null;
                    }
                    $res = insertRecord('tra_approval_recommendations', $params, $user_id);
                    $id = $res['record_id'];
                }
				
				$UpdateParams['validity_status'] = $validity_status_id;
				$UpdateParams['registration_status'] = $registration_status_id;
              
                /* if ($app_details->sub_module_id == 1) {//we only update premise validity status on new applications
                    $updates = array(
                        'validity_status' => $validity_status_id,
                        'registration_status' => $registration_status,
                        'registration_date' => Carbon::now(),
                        'approval_date' => Carbon::now()
                    );
                    DB::table('registered_premises')
                        ->where('id', $app_details->reg_premise_id)
                        ->update($updates);
                } 
                DB::table('tra_premises')
                    ->where('id', $app_details->premise_id)
                    ->update($UpdateParams);
				*/	
                DB::table('tra_promotion_adverts_applications')
                    ->where('id', $application_id)
                    ->update($UpdateParams);
                    if($decision_id == 1){
                        $portal_status_id = 10;
                    }
                    else{
                        $portal_status_id = 11; 
                    }
                    updatePortalApplicationStatusWithCode($application_code, 'wb_clinical_trial_applications',$portal_status_id);
    
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



 

    public function processNormalApplicationSubmissionForPromoAndAdverts($request, $keep_status = false)
    {
        $application_id = $request->input('application_id');
        $table_name = 'tra_promotion_adverts_applications' ;//$request->input('table_name');
        $prev_stage = $request->input('curr_stage_id');
        $action = $request->input('action');
        $to_stage = $request->input('next_stage');
        $user_id = $this->user_id;
		$sub_module_id = $request->input('sub_module_id');
		$process_id = $request->input('process_id');
		$section_id= $request->input('section_id');
		$created_on=Carbon::now();
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
			
			
			
			
	     $action_details = $this->getApplicationWorkflowActionDetails($action);
		
			
            $application_status_id = getApplicationTransitionStatus($prev_stage, $action, $to_stage);
            if ($keep_status == true) {//for approvals
                $application_status_id = $application_details->application_status_id;
            }
            $where = array(
                'id' => $application_id
            );
			
			
			
		
			// if has generate reference
			 if ($action_details->generate_refno == 1){

				 			 
				$zone_id = $application_details->zone_id;
			    //reference number codes
				$zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
				$section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
				 
				
				$codes_array = array(
					'section_code' => $section_code,
					'zone_code' => $zone_code
				);
				$refno_details = generateApplicationRefNumber($application_id, $table_name, $sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id);
				
				$app_update = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id,
				'reference_no'=>$refno_details['ref_no']
                ); 
			 }
			
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
            $this->updateApplicationSubmission($request, $application_details, $application_status_id);

        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            exit();
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            exit();
        }
    }

	  public function receivePromoAdvertsOnlineApplicationDetails(Request $request)
    {
        $next_stage = $request->input('curr_stage_id');

        $application_id = $request->input('application_id');
        $responsible_user = $request->input('responsible_user');
        $urgency = $request->input('urgency');
        $comment = $request->input('remarks');
        
        $application_code = $request->input('application_code');
        $user_id = $this->user_id;
		$created_on=Carbon::now();
		$applications_table = 'tra_promotion_adverts_applications';
        DB::beginTransaction();
        try {
            $view_id = generateApplicationViewID();
            $portal_db = DB::connection('portal_db');
            $portal_table = 'wb_promotion_adverts_applications';
            $qry = $portal_db->table('wb_promotion_adverts_applications as t1')              
                ->where('t1.id', $application_id);
            $results = $qry->first();
			
			
			
            if (is_null($results)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting portal application details, consult System Admin!!'
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
            $portal_application_id = $results->id;
            $application_code = $results->application_code;
            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
            $process_details = getTableData('wf_tfdaprocesses', $where);
            $app_previousdata = DB::table($applications_table)
                                ->where('application_code',$application_code)
                                ->first();
            if($app_previousdata){

                $results = $app_previousdata;
                $process_id = $app_previousdata->process_id;
                $process_name =$process_details->name;
                $workflow_id = $workflow_details->id;
                $workflowstage_name = $workflow_details->name;
                $applicant_id = $app_previousdata->applicant_id;
                $mis_application_id = $app_previousdata->id;
                $tracking_no = $app_previousdata->tracking_no;
                $app_status_id = $app_previousdata->application_status_id;
                
                $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');
            }
            else{
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
                    }
                    $identification_no =$applicant_details->identification_no;
                    $applicant_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $applicant_details->identification_no), 'id');
                    $applicant_email = $applicant_details->email;

                        
                        
                        
                    //application details
                    $app_status = getApplicationInitialStatus($results->module_id, $results->sub_module_id);
                    $app_status_id = $app_status->status_id;





                    $application_status = getSingleRecordColValue('par_system_statuses', array('id' => $app_status_id), 'name');



                    $application_details = array(
                        //'reference_no' => $ref_no,
                        'tracking_no' => $tracking_no,
                        'view_id' => $view_id,
                        'applicant_id' => $applicant_id,
                        'application_code' => $application_code,
                        'module_id' => $results->module_id,
                        'sub_module_id' => $results->sub_module_id,
                        'zone_id' => 2,
                        'section_id' => $results->section_id,
                        'process_id' => $process_details->id,
                        'workflow_stage_id' => $workflow_details->id,
                        'application_status_id' => $app_status_id,
                        'portal_id' => $portal_application_id,
                         'events_responsible_person'=>$results->events_responsible_person,
				  'advertisement_type_id'=>$results->advertisement_type_id,
                                            'exhibition_start_date'=>formatDate($results->exhibition_start_date),
                                            'exhibition_end_date'=>formatDate($results->exhibition_end_date),
                                            'venue_of_exhibition'=>$results->venue_of_exhibition,
											 'other_promotion_meetingtype'=>$results->other_promotion_meetingtype,
                                            'physicaladdress_of_exhibition'=>$results->physicaladdress_of_exhibition,
                                            'promotionameeting_other_information'=>$results->promotionameeting_other_information,
                                            'other_promotion_materialtypes'=>$results->other_promotion_materialtypes,
                                            'responsible_persons_contacts'=>$results->responsible_persons_contacts,
                                            'responsible_persons_physicaladdress'=>$results->responsible_persons_physicaladdress,
                        'sponsor_id'=>$results->sponsor_id,
                      
                        'applicant_as_sponsor'=>$results->applicant_as_sponsor,
                        'description_of_advert'=>$results->description_of_advert,
                                            'advertisement_type_id'=>$results->advertisement_type_id,
                                         
                                            'exhibition_start_date'=>$results->exhibition_start_date,
                                            'exhibition_end_date'=>$results->exhibition_end_date,
                                            'venue_of_exhibition'=>$results->venue_of_exhibition,
                        
                        'date_received' => $results->submission_date,//Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                    $application_insert = insertRecord('tra_promotion_adverts_applications', $application_details, $user_id);
                    if ($application_insert['success'] == false) {
                        DB::rollBack();
                        return $application_insert;
                    }

                    $record_id=$application_insert['record_id'];
                    //product particulars 

                    $promotion_product_particulars = $portal_db->table('wb_promotion_prod_particulars')
                        ->where('application_id', $application_id)
                        ->select(DB::raw(" id,$record_id as application_id,brand_name,common_name_id,is_registered,registration_no,registrant_name,other_details,$user_id as created_by"))
                        ->get();

                    foreach($promotion_product_particulars as $row){
                        
                        $portal_product_id=$row->id;
                        unset($row->id);
                        
                        
                        $promotion_product_particulars_insert = insertRecord('tra_promotion_prod_particulars', (Array)$row, $user_id);
                        if ($promotion_product_particulars_insert['success'] == false) {
                            DB::rollBack();
                            return $promotion_product_particulars_insert;
                        }
                        
                        
                        //ingridients and strength
                        
                        
                        $inserted_producrt_id=$promotion_product_particulars_insert['record_id'];
                        $product_ingridients_strength = $portal_db->table('wb_promoadvert_products_ingred_strth')
                        ->where('product_id', $portal_product_id)
                        ->select(DB::raw("$inserted_producrt_id as product_id,ingredient,strength,remarks,$user_id as created_by"))
                        ->get();
                        $product_ingridients_strength = convertStdClassObjToArray($product_ingridients_strength);
                        $product_ingridients_strength = unsetPrimaryIDsInArray($product_ingridients_strength);
                        DB::table('tra_promoadvert_products_ingred_strth')
                            ->insert($product_ingridients_strength);  
                        
                        
                    }



                                
                    //promotion material details

                    $promotion_materials_details = $portal_db->table('wb_promotion_materials_details')
                        ->where('application_id', $application_id)
                        ->select(DB::raw("$record_id as application_id,material_id,remarks ,$user_id as created_by"))
                        ->get();
                    $promotion_materials_details = convertStdClassObjToArray($promotion_materials_details);
                    $promotion_materials_details = unsetPrimaryIDsInArray($promotion_materials_details);
                    DB::table('tra_promotion_materials_details')
                        ->insert($promotion_materials_details); 


                    //N/A For Promotion Materials
                    // createInitialRegistrationRecord('registered_premises', 'tra_premises_applications', $reg_params, $mis_application_id, 'reg_premise_id');
                    $portal_params = array(
                        'application_status_id' => 3
                        //'reference_no' => $ref_no
                    );
                    $portal_where = array(
                        'id' => $portal_application_id
                    );
                    updatePortalParams('wb_promotion_adverts_applications', $portal_params, $portal_where);
                    $process_id = $process_details->id;
                    $process_name =$process_details->name;
                    $workflow_id = $workflow_details->id;
                   $workflowstage_name = $workflow_details->name;
                   $mis_application_id = $application_insert['record_id'];
				    //send email
					$vars = array(
						'{tracking_no}' => $tracking_no
					);
                   onlineApplicationNotificationMail(2, $applicant_email, $vars,$identification_no);
            }
           
            $details = array(
                'application_id' => $mis_application_id,
                'application_code' => $application_code,
                'application_status' => $application_status,
                'process_id' =>$process_id ,
                'process_name' => $process_name,
                'workflow_stage_id' => $workflow_id,
                'application_status_id' => $app_status_id,
                'workflow_stage' => $workflowstage_name,
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id,
                'applicant_id' => $applicant_id
            ); 
            //submissions
            $submission_params = array(
                'application_id' =>$mis_application_id,
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
                'created_by' => $user_id
            );
            DB::table('tra_submissions')
                ->insert($submission_params);
            DB::commit();
           
            $portal_params = array(
                'application_status_id' => 4
            );

            $portal_where = array(
                'id' => $portal_application_id
            );
         
            
            updatePortalParams($portal_table, $portal_params, $portal_where);
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

}