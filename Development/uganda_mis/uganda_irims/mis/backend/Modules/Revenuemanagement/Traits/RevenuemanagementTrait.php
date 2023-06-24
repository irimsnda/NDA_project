<?php

namespace Modules\Revenuemanagement\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

trait RevenuemanagementTrait
{
    
    public function processRevenueApplicationSubmission(Request $request)
    {   

        $user_id = $this->user_id;
        $directive_id = $request->input('directive_id');
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        
        $next_stage = $request->input('next_stage');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $application_code = $request->input('application_code');

        $keep_status = $request->input('keep_status');
        $application_id = $request->input('application_id');
        $process_id = $request->input('process_id');
        try{
                $data = DB::table('wf_workflow_actions')
                        ->where(array('stage_id'=>$request->curr_stage_id,'id'=>$request->action))
                        ->select('*')
                        ->first();
                       
                if($data){
                    
                    $view_id = generateApplicationViewID();
                    if ($sub_module_id == 43) {
                        $table_name = 'tra_paymentreversal_requests';
                        $data = array('application_code'=>$request->application_code, 
                                        'receipt_id'=>$request->receipt_id,
                                        'requested_by_id'=>$this->user_id,
                                        'requested_on'=>Carbon::now(),
                                        'view_id'=>$view_id,'process_id' => $process_id,
                                        'reason_for_cancellation'=>$request->reason_for_cancellation,
                                        'created_on'=>Carbon::now(),
                                        'created_by'=>$this->user_id,
                                        'workflow_stage_id'=>$next_stage
                                );
                                $res = insertRecord($table_name, $data, $this->user_id);
                                $application_id = $res['record_id'];


                    }
                    else if ($sub_module_id == 42){
                        $table_name = 'tra_invoicecancellation_requests';
                        $data = array('application_code'=>$request->application_code, 
                                            'invoice_id'=>$request->invoice_id,
                                            'requested_by_id'=>$this->user_id,
                                            'requested_on'=>Carbon::now(),
                                            'view_id'=>$view_id,'process_id' => $process_id,
                                            'reason_for_cancellation'=>$request->reason_for_cancellation,
                                            'created_on'=>Carbon::now(),
                                            'created_by'=>$this->user_id,
                                            'workflow_stage_id'=>$next_stage
                                    );
                                    $res = insertRecord($table_name, $data, $this->user_id);
                                    $application_id = $res['record_id'];
                    }else if ($sub_module_id == 44){
                        $table_name = 'tra_paymentcreditnote_requests';
                         $data = array('application_code'=>$request->application_code, 
                                            'invoice_id'=>$request->invoice_id,
                                            'requested_by_id'=>$this->user_id,
                                            'requested_on'=>Carbon::now(),
                                            'view_id'=>$view_id,'process_id' => $process_id,
                                            'reason_for_request'=>$request->reason_for_request,
                                            'credit_note_amount'=>$request->credit_note_amount,
                                            'currency_id'=>$request->currency_id,
                                            'exchange_rate'=>$request->exchange_rate,
                                            'created_on'=>Carbon::now(),
                                            'created_by'=>$this->user_id,
                                            'workflow_stage_id'=>$next_stage
                                    );
                                    $res = insertRecord($table_name, $data, $this->user_id);
                                $application_id = $res['record_id'];
                    }else{
                        $table_name = 'tra_adhocinvoices_applications';
                    }
                        
                       
                        $from_stage = $request->input('curr_stage_id');
                        $to_stage = $request->input('next_stage');
                        $responsible_user = $request->input('responsible_user');
                        $remarks = $request->input('remarks');
                        $urgency = $request->input('urgency');
                        $directive_id = $request->input('directive_id');
                        //application details

                        $application_code = $request->application_code;
                        $ref_no = $request->reference_no;
                        $tracking_no = $request->tracking_no;
                        $applicant_id = $request->applicant_id;
                        //process other details
                        $module_id = $request->module_id;
                        $sub_module_id = $request->sub_module_id;
                        $section_id = $request->section_id;
                        $application_status_id = $request->application_status_id;

                        //transitions
                        $transition_params = array(
                            'application_id' => $application_id,
                            'application_code' => $application_code,
                            'application_status_id' => $application_status_id,
                            'process_id' => $process_id,
                            'from_stage' => $from_stage,
                            'to_stage' => $to_stage,
                            'author' => $user_id,
                            'remarks' => $remarks,
                            'directive_id' => $directive_id,
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id
                        );
                        
                        DB::table('tra_applications_transitions')
                            ->insert($transition_params);
                        //submissions
                        $submission_params = array(
                            'application_id' => $application_id,
                            'process_id' => $process_id,
                            'view_id' => $view_id,
                            'application_code' => $application_code,
                            'reference_no' => $ref_no,
                            'tracking_no' => $tracking_no,
                            'usr_from' => $user_id,
                            'usr_to' => $responsible_user,
                            'previous_stage' => $from_stage,
                            'current_stage' => $to_stage,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id' => $section_id,
                            'application_status_id' => $application_status_id,
                            'urgency' => $urgency,
                            'applicant_id' => $applicant_id,
                            'remarks' => $remarks,
                            'directive_id' => $directive_id,
                            'date_received' => Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id
                        );
                        DB::table('tra_submissions')
                            ->insert($submission_params);
                        updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id);
                        DB::commit();
                        
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
                        $res = array(
                            'success' => true,
                            'message' => 'Application Submitted Successfully!!'
                        );
                }
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
    public function getAdhocInvoiceDetails($application_id)
    {
        $qry = DB::table('tra_adhocinvoices_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     '' as module_desc"))
            ->where('t1.id', $application_id);
        $invoice_details = $qry->first();
        return $invoice_details;
        
    }
     public function saveAdhocInvoiceApplicationDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
      //  $reference_no = $request->input('reference_no');
      //  $invoice_id = $request->input('invoice_id');
        $module_id = $request->input('module_id');
       // $applicant_id = $request->input('applicant_id');
        $paying_currency_id = $request->input('paying_currency_id');
       // $isLocked =0;
       // $isSubmission = $request->input('isSubmission');
        $is_fast_track = 0;
        //$fob = $request->fob;
        $details = $request->input();
        $user_id = $this->user_id;
        unset($details['_token']);
        unset($details['application_id']);
        unset($details['application_code']);
        unset($details['paying_currency_id']);
        unset($details['module_id']);      
       
        try {
            $res = array();

            DB::transaction(function () use (&$res, $module_id, $user_id, $paying_currency_id, $application_id, $application_code, $details) {
                $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
               $app_details =  DB::table($table_name)
                    ->where('id', $application_id)
                    ->first();

                $reference_no = $app_details->reference_no;
                $tracking_no = $app_details->tracking_no;
                $section_id = $app_details->section_id;
                $applicant_id = $app_details->applicant_id;
                $sub_module_id = $app_details->sub_module_id;
                
                $applicant_details = getTableData('wb_trader_account', array('id' => $applicant_id));
                if (is_null($applicant_details)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered while getting applicant details!!'
                    );
                    return response()->json($res);
                }
                $applicant_name = $applicant_details->name;
                $applicant_email = $applicant_details->email;
                $applicant_name = strtoupper($applicant_name);
                $paying_exchange_rate = getExchangeRate($paying_currency_id);
                $due_date_counter = Config('invoice_due_days');
                $date_today = Carbon::now();
                $due_date = $date_today->addDays($due_date_counter);
                $user = \Auth::user();
                $prepared_by = aes_decrypt($user->first_name) . ' ' . aes_decrypt($user->last_name);
                $invoicing_date = Carbon::now();
                $invoice_params = array(
                    'applicant_id' => $applicant_id,
                    'applicant_name' => $applicant_name,
                    'paying_currency_id' => $paying_currency_id,
                    'paying_exchange_rate' => $paying_exchange_rate,
                    'reference_no'=>$reference_no,
                    'module_id'=>$module_id,
                    'section_id'=>$section_id,
                    'sub_module_id'=>$sub_module_id,
                    'tracking_no'=>$tracking_no,
                    'date_of_invoicing'=>$invoicing_date,
                    'payment_terms' => 'Due in ' . $due_date_counter . ' Days',
                    'created_on' => Carbon::now()
                );
                    $invoice_params['prepared_by'] = $prepared_by;
                    $invoice_params['due_date'] = $due_date;
               

                    $invoice_no = generateInvoiceNo($user_id);
                    $invoice_params['invoice_no'] = $invoice_no;
                    $invoice_params['application_id'] = $application_id;
                    $invoice_params['application_code'] = $application_code;
                    $invoice_params['applicant_id'] = $applicant_id;
                    $res = insertRecord('tra_application_invoices', $invoice_params, $user_id);
                    if ($res['success'] == false) {
                        return \response()->json($res);
                    }
                    $invoice_id = $res['record_id'];
                

                $params = array();
                $invoice_amount = 0;

                //check
                $element_costs_id = $details['element_costs_id'];
                $where_check = array(
                    'invoice_id' => $invoice_id,
                    'element_costs_id' => $element_costs_id
                );
                if (DB::table('tra_invoice_details')
                        ->where($where_check)
                        ->count() < 1) {
                    $params[] = array(
                        'invoice_id' => $invoice_id,
                        'element_costs_id' => $element_costs_id,
                        'element_amount' => $details['cost'],
                        'currency_id' => $details['currency_id'],
                        'exchange_rate' => $paying_exchange_rate,
                        'quantity' => 1,
                        'total_element_amount' => ($details['cost'])
                    );
                } else {
                    $update = array(
                        'quantity' => $details['quantity'],
                        'total_element_amount' => ($details['cost']),
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    DB::table('tra_invoice_details')
                        ->where($where_check)
                        ->update($update);
                }

                $res = array(
                    'success' => true,
                    'invoice_id' => $invoice_id,
                    'invoice_no' => $invoice_no,
                    'message' => 'Invoice details saved successfully!!'
                );
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