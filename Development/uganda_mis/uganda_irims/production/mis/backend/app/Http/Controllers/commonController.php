<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Modules\PremiseRegistration\Traits\PremiseRegistrationTrait;
use Modules\GmpApplications\Traits\GmpApplicationsTrait;
use Modules\ClinicalTrial\Traits\ClinicalTrialTrait;
use Modules\ProductRegistration\Traits\ProductsRegistrationTrait;

use Modules\PromotionMaterials\Traits\PromotionMaterialsTrait;
use Modules\ProductNotification\Traits\ProductsNotificationTrait;
use Modules\Importexportpermits\Traits\ImportexportpermitsTraits;

class CommonController extends Controller
{

    use PremiseRegistrationTrait;
    use GmpApplicationsTrait;
    use ClinicalTrialTrait;
    use ProductsRegistrationTrait;
    use PromotionMaterialsTrait;
    use ProductsNotificationTrait;
    use ImportexportpermitsTraits;
    protected $user_id;

    protected $base_url;
    protected $sign_url;
    protected $sign_file;

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
        $this->base_url = url('/');
       
    }

    public function deleteChecklistRaisedQuery(Request $req)
    {
        $query_id = $req->query_id;
        $user_id = $this->user_id;
        try{
            //delete the query items
            
            $check = DB::table('tra_application_query_reftracker')->where(array(
                'id' => $query_id
            ))
            ->first();
            if($check){
                if($check->status_id == 1){
                    $where = array(
                        'query_id' => $query_id,
                        'status' => 1
                    );
                    $previous_data = getPreviousRecords('checklistitems_queries', $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = deleteRecord('checklistitems_queries', $previous_data, $where, $user_id);
                    //delete the query tracker
                    $where = array(
                        'id' => $query_id,
                        'status_id' => 1
                    );
                    $previous_data = getPreviousRecords('tra_application_query_reftracker', $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = deleteRecord('tra_application_query_reftracker', $previous_data, $where, $user_id);
                    
                }
                else{
                    
                    $res = array('success'=>false, 'message'=>'You can only delete an open query, initiate another query is the query has been closed.');
                    
                }
                
                
                
            }
            

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }

        return \response()->json($res);
    }
    public function getCommonParamFromModel(Request $request)
    {
        $model_name = $request->input('model_name');
        try {
            $model = 'App\\Models\\' . $model_name;
            $results = $model::all()->toArray();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
        return response()->json($res);
    }   
    function validateInvoiceAmountsDetails($details, $paying_currency_id,$paying_exchange_rate,$is_fast_track){
             foreach ($details as $detail) {

                    $currency_id = $detail['currency_id'];
                    $exchange_rate = getExchangeRate($currency_id);
                    $cost = $detail['cost'];
                    $element_costs_id = $detail['element_costs_id'];
                    if($is_fast_track == 1){
                        if($sub_module_id == 7){
                            $quantity = 2;
                        }
                        else{
                            $quantity = 1;
                        }
                    
                    }
                    else{
                        $quantity = $detail['quantity'];
                    
                    }
    //fob
                    
                    
                    if($paying_currency_id != $currency_id){
                        if($paying_currency_id == 4 && $currency_id ==1){
                            $total_element_amount= $cost*$quantity*$exchange_rate;
                        }
                        else if($paying_currency_id == 1  && $currency_id ==4){
                            $total_element_amount= ($cost*$quantity)/$exchange_rate;
                        }
                        else{
                            if($paying_currency_id == 4){
                                $total_element_amount= $cost*$quantity*$exchange_rate;
                            }else if($paying_currency_id == 1){
                                $invoice_amount = $cost*$quantity*$exchange_rate;
                                 $total_element_amount= $invoice_amount/$exchange_rate;
                                
                            }
                        }
                    }else{
                        $total_element_amount= $cost*$quantity;
                    }
                    
                    if($total_element_amount ==0){
                            $res = array(
                                    'success' => false,
                                    'message' => 'Invoice Amount is 0(Zero), kindly contact the system admin for validation.'
                                );
                            return \response()->json($res);
                            exit();
                    }
                }
        
    }
    public function saveApplicationInvoicingDetails(Request $request)
    {


        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $reference_no = $request->input('reference_no');
        $invoice_id = $request->input('invoice_id');
        $module_id = $request->input('module_id');
        $applicant_id = $request->input('applicant_id');
        $paying_currency_id = $request->input('paying_currency_id');
        $isLocked = $request->input('isLocked');
        $isSubmission = $request->input('isSubmission');
        $is_fast_track = $request->input('is_fast_track');
        $application_feetype_id = $request->input('application_feetype_id');
        $fob = $request->fob;
        $details = $request->input();
        $user_id = $this->user_id;
        unset($details['_token']);
        unset($details['application_id']);
        unset($details['application_code']);
        unset($details['invoice_id']);
        unset($details['applicant_id']);
        unset($details['paying_currency_id']);
        unset($details['isLocked']);
        unset($details['isSubmission']);
        unset($details['is_fast_track']);
        unset($details['module_id']);
        unset($details['reference_no']);
        unset($details['application_feetype_id']);
        unset($details['section_id']);
        unset($details['sub_module_id']);
        unset($details['fob']);
        if (!is_numeric($isLocked) || $isLocked == '') {
            $isLocked = 0;
        }
        try {
            $res = array();

            DB::transaction(function () use (&$res, $reference_no, $is_fast_track, $module_id, $user_id, $isLocked, $isSubmission, $paying_currency_id, $applicant_id, $application_id, $application_code, $invoice_id, $details, $fob,$application_feetype_id) {
                $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
               $app_details =  DB::table($table_name)
                    ->where('id', $application_id)
                    ->first();
                $reference_no = $app_details->reference_no;
                $tracking_no = $app_details->tracking_no;
                $section_id = $app_details->section_id;
                $sub_module_id = $app_details->sub_module_id;
                $zone_id = $app_details->zone_id;
                $applicant_id = $app_details->applicant_id;
              //  print_r($app_details);
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
              // $this->validateInvoiceAmountsDetails($details, $paying_currency_id,$paying_exchange_rate,$is_fast_track);
                
                $due_date_counter = 30;
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
                    'zone_id'=>$zone_id,
                    'sub_module_id'=>$sub_module_id,
                    'tracking_no'=>$tracking_no,
                    'isLocked' => $isLocked,
                    'fob' => $fob,
                    'gepg_submission_status'=>2,
                    'application_feetype_id'=>$application_feetype_id,
                    'date_of_invoicing'=>$invoicing_date,
                    'payment_terms' => 'Due in ' . $due_date_counter . ' Days',
                    'created_on' => Carbon::now()
                );
                
                //if ($isLocked == 1 && $isSubmission < 1) {
                    
                    $invoice_params['prepared_by'] = $prepared_by;
                    $invoice_params['due_date'] = $due_date;
               // }

                //update application (is fast track) status
                DB::table($table_name)
                    ->where('id', $application_id)
                    ->update(array('is_fast_track' => $is_fast_track));


                if (isset($invoice_id) && $invoice_id != '') {
                    $invoice_no = getSingleRecordColValue('tra_application_invoices', array('id' => $invoice_id), 'invoice_no');
                    $previous_data = getPreviousRecords('tra_application_invoices', array('id' => $invoice_id));
                    if ($previous_data['success'] == false) {
                        return \response()->json($previous_data);
                    }
                    $previous_data = $previous_data['results'];
                   $res = updateRecord('tra_application_invoices', $previous_data, array('id' => $invoice_id), $invoice_params, $user_id);
                  $res = array('success'=>true);

                } else {
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
                }

                $params = array();
                $invoice_amount = 0;
               
                foreach ($details as $detail) {
                   
                    $currency_id = $detail['currency_id'];
                    $exchange_rate = getExchangeRate($currency_id);
                    $cost = $detail['cost'];
                    $element_costs_id = $detail['element_costs_id'];
                    if($is_fast_track == 1){
                        if($sub_module_id == 7){
                            $quantity = 2;
                        }
                        else{
                            $quantity = 1;
                        }
                    
                    }
                    else{
                        $quantity = $detail['quantity'];
                    
                    }
    //fob
    
                    $where_check = array(
                        'invoice_id' => $invoice_id,
                        'element_costs_id' => $element_costs_id
                    );

                    if($paying_currency_id != $currency_id){
                        if($paying_currency_id == 4 && $currency_id ==1){
                            $total_element_amount= $cost*$quantity*$exchange_rate;
                        }
                        else if($paying_currency_id == 1  && $currency_id ==4){
                            $total_element_amount= ($cost*$quantity)/$exchange_rate;
                        }
                        else{
                            if($paying_currency_id == 4){
                                $total_element_amount= $cost*$quantity*$exchange_rate;
                            }else if($paying_currency_id == 1){
                                $invoice_amount = $cost*$quantity*$exchange_rate;
                                 $total_element_amount= $invoice_amount/$exchange_rate;
                                
                            }else{
                              $total_element_amount= $cost*$quantity;  
                            }
                        }
                    }else{
                        $total_element_amount= $cost*$quantity;
                    }
                    
                    $element_costs_id = $detail['element_costs_id'];
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
                            'element_amount' => $detail['cost'],
                            'currency_id' => $detail['currency_id'],
                            'paying_currency_id'=>$paying_currency_id,
                            'exchange_rate' => $exchange_rate,
                            'quantity' => $detail['quantity'],
                            'paying_exchange_rate' => $paying_exchange_rate,
                            'total_element_amount'=>round($total_element_amount)
                        );
                    } else {

                    }
                   
                }
             
                $res = insertRecord('tra_invoice_details', $params, $user_id);
                DB::table('tra_invoice_details')->insert($params);
                    $vars = array(
                        '{reference_no}' => $reference_no,
                        '{invoice_no}' => $invoice_no,
                        '{invoice_date}' => $invoicing_date
                    );
                    $params = array(
                        'application_code' => $application_code,
                        'invoice_id' => $invoice_id
                    );
                    
                  
                    
                  //  $report = generateJasperReport('invoiceReport', 'invoice', 'pdf', $params);
//saveSingleInvoiceDetailstoIntergration($invoice_id,$application_code,$paying_currency_id,$paying_exchange_rate,$user_id,$zone_id);
                  //  applicationInvoiceEmail(5, $applicant_email, $vars, $report, 'invoice_' . $invoice_no);
              //  }
                    
                
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
        
        return \response()->json($res);
    }
    public function saveAppTcRecommendationDetails(Request $req){
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $selected_appcodes = $req->selected_appcodes;
            $application_code = $req->application_code;

            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $id = $post_data['id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            unset($post_data['selected_appcodes']);
            $unsetData = $req->input('unset_data');
            
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }

            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;

            if($selected_appcodes != ''){
                $selected_appcodes = json_decode($selected_appcodes);
               
                foreach ($selected_appcodes as $application_code) {
                    $res = array();
                    $where = array(
                        'application_code' => $application_code
                    );
                    $table_data['application_code'] = $application_code;
                    
                        if (recordExists($table_name, $where)) {
                            unset($table_data['created_on']);
                            unset($table_data['created_by']);
                            $table_data['dola'] = Carbon::now();
                            $table_data['altered_by'] = $user_id;
                            $previous_data = getPreviousRecords($table_name, $where);
                            if ($previous_data['success'] == false) {
                                return $previous_data;
                            }
                            $previous_data = $previous_data['results'];
                            $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                        }
                        else{
                            $res = insertRecord($table_name, $table_data, $user_id);
                        }
                
                }
              
            }
            else{
                $where = array(
                    'application_code' => $application_code
                );
    
                $res = array();
                    if (recordExists($table_name, $where)) {
                        unset($table_data['created_on']);
                        unset($table_data['created_by']);
                        $table_data['dola'] = Carbon::now();
                        $table_data['altered_by'] = $user_id;
                        $previous_data = getPreviousRecords($table_name, $where);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                        $previous_data = $previous_data['results'];
                        $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                    }
                    else{
                        $res = insertRecord($table_name, $table_data, $user_id);
                    }
               


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
        return response()->json($res);

    }

    public function saveApplicationApprovalDetails(Request $request)
    {
        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        $module_id = $request->input('module_id');
        $process_id = $request->input('process_id');
        $res = array();
/*
        $qry = DB::table('wf_tfdaprocesses')
            ->where('id', $process_id);
        $app_details = $qry->first();
*/
        $selected_appcodes = $request->input('selected_appcodes');
        if($selected_appcodes != ''){
                
            $selected_ids = json_decode($selected_appcodes);
            
            foreach ($selected_ids as $application_code) {
                $app_code = $application_code;
            }
            $qry = DB::table($table_name)
                ->where('application_code', $app_code);
            $app_details = $qry->first();
        }
        else{
            $qry = DB::table($table_name)
                ->where('id', $application_id);
            $app_details = $qry->first();
        }

        if (is_null($app_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while getting application details!!'
            );
            return response()->json($res);
        }
         $module_id = $app_details->module_id;
        $sub_module_id = $app_details->sub_module_id;

       
        if ($module_id == 1) {//Products
            $res = $this->saveProductApplicationApprovalDetails($request, $sub_module_id);
        } else if ($module_id == 2) {//Premises
            $res = $this->savePremiseApplicationApprovalDetails($request, $sub_module_id, $app_details);
        } else if ($module_id == 3) {//Gmp
            $res = $this->saveGmpApplicationApprovalDetails($request, $sub_module_id, $app_details);
        } else if ($module_id == 7) {//Clinical Trial
            $res = $this->saveClinicalTrialApplicationApprovalDetails($request, $sub_module_id, $app_details);
        } else if ($module_id == 14) {//promotion and advertisement
            $res = $this->savePromoAdvertsApplicationRecommendationDetails($request, $sub_module_id, $app_details);
        } else if ($module_id == 6) {//promotion and advertisement
            $res = $this->saveProductNotificationApprovalDetails($request, $sub_module_id, $app_details);
        } else if ($module_id == 4 || $module_id == 12) {//promotion and advertisement
            $res = $this->saveImpExpApplicationRecommendationDetails($request, $sub_module_id, $app_details);
        } else if ($module_id == 15) {//promotion and advertisement
            $res = $this->saveDisposalpApplicationRecommendationDetails($request, $sub_module_id, $app_details);
        }
        else if ($module_id == 20) {//promotion and advertisement
            $res = $this->saveImpExpApplicationRecommendationDetails($request, $sub_module_id, $app_details);
        }
        return \response()->json($res);
    }

    public function checkInvoicePaymentsLimit(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $currency_id = $request->input('currency_id');
        $amount = $request->input('amount');
        try {
            $where = array(
                'section_id' => $section_id,
                'module_id' => $module_id,
                'currency_id' => $currency_id
            );
            $limit_amount = DB::table('invoicespayments_limitsetup')
                ->where($where)
                ->value('limit_amount');
            if (is_numeric($limit_amount) && $limit_amount > 1) {
                if ($amount > $limit_amount) {
                    $res = array(
                        'status_code' => 2,//limit exceeded
                        'limit_amount' => $limit_amount
                    );
                } else {
                    $res = array(
                        'status_code' => 1,//limit not exceeded
                        'limit_amount' => $limit_amount
                    );
                }
            } else {
                $res = array(
                    'status_code' => 3,//limit not set
                    'limit_amount' => $limit_amount
                );
            }
        } catch (\Exception $exception) {
            $res = array(
                'status_code' => 4,//error
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'status_code' => 4,//error
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

    public function saveApplicationPaymentDetails(Request $request)
    {

        $user_id = $this->user_id;
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $amount = $request->input('amount_paid');
        $currency_id = $request->input('currency_id');
        $applicant_id = $request->input('applicant_id');
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $invoice_id = $request->input('invoice_id');
        $non_gepg_reason = $request->input('non_gepg_reason');
        $receipt_no = generateReceiptNo($user_id);
        $exchange_rate = getSingleRecordColValue('par_exchange_rates', array('currency_id' => $currency_id), 'exchange_rate');
        $params = array(
            'application_id' => $application_id,
            'application_code' => $application_code,
            'applicant_name' => $request->input('applicant_name'),
            'amount_paid' => $amount,
            'invoice_id' => $invoice_id,
            'receipt_no' => $receipt_no,
            'manual_receipt_no' => $request->input('manual_receipt_no'),
            'trans_date' => $request->input('trans_date'),
            'currency_id' => $currency_id,
            'applicant_id' => $applicant_id,
            'section_id' => $section_id,
            'module_id' => $module_id,
            
            'payment_type_id' => 1,
            'sub_module_id' => $sub_module_id,
            'receipt_type_id' => $request->input('receipt_type_id'),
            'payment_mode_id' => $request->input('payment_mode_id'),
            'trans_ref' => $request->input('trans_ref'),
            'bank_id' => $request->input('bank_id'),
            'drawer' => $request->input('drawer'),
            'exchange_rate' => $exchange_rate,
            'created_on' => Carbon::now(),
            'created_by' => $user_id,
            'non_gepg_reason' => $non_gepg_reason
        );

        try {
            $res = insertRecord('tra_payments', $params, $user_id);

           generatePaymentRefDistribution($invoice_id, $res['record_id'], $amount, $currency_id, $user_id);
            $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $invoice_id);
            $res['balance'] = $payment_details['running_balance'];
            $res['invoice_amount'] = $payment_details['invoice_amount'];
            
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message1'=>$res,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    public function submitQueriedOnlineApplication(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        try {
            $portal_db = DB::connection('portal_db');
            //get application details
            $app_details = $portal_db->table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.trader_id', '=', 't2.id')
                ->select('t1.tracking_no', 't2.email')
                ->where('t1.id', $application_id)
                ->first();
            if (is_null($app_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                return \response()->json($res);
            }
            $tracking_no = $app_details->tracking_no;
            $applicant_email = $app_details->email;
            $portal_db->table($table_name)
                ->where('id', $application_id)
                ->update(array('application_status_id' => 17));
            //send email
            $vars = array(
                '{tracking_no}' => $tracking_no
            );
            onlineApplicationNotificationMail(3, $applicant_email, $vars);
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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
        return \response()->json($res);
    }

    public function submitStructuredQueriedOnlineApplication(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $module_id = $request->input('module_id');
        $comment = $request->input('comment');
        $applicant_field = 'applicant_id';
        if ($module_id == 2) {
            $applicant_field = 'trader_id';
        }
        try {
            $table_name = getPortalApplicationsTable($module_id);
            $portal_db = DB::connection('portal_db');
            //get application details
            $app_details = $portal_db->table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.' . $applicant_field, '=', 't2.id')
                ->select('t1.tracking_no', 't2.email', 't1.module_id')
                ->where('t1.id', $application_id)
                ->first();
            if (is_null($app_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                return \response()->json($res);
            }

            $tracking_no = $app_details->tracking_no;
            //$module_id = $app_details->module_id;
            $applicant_email = $app_details->email;
            $portal_db->table($table_name)
                ->where('id', $application_id)
                ->update(array('application_status_id' => 6));

            updateApplicationQueryRef($application_id, $application_code, $tracking_no, $table_name, $this->user_id, $module_id, $comment);
            //send email
            $vars = array(
                '{tracking_no}' => $tracking_no
            );
            onlineApplicationNotificationMail(3, $applicant_email, $vars);
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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
        return \response()->json($res);
    }

    public function submitRejectedOnlineApplication(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        $reason_id = $request->input('reason_id');
        $comment = $request->input('comment');
        $rejection_params = array(
            'application_id' => $application_id,
            'application_code' => $application_code,
            'reason_id' => $reason_id,
            'remark' => $comment,
            'mis_created_by' => $this->user_id
        );
        try {
            $portal_db = DB::connection('portal_db');
            //get application details
            $app_details = $portal_db->table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.trader_id', '=', 't2.id')
                ->select('t1.tracking_no', 't2.email')
                ->where('t1.id', $application_id)
                ->first();
            if (is_null($app_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                return \response()->json($res);
            }
            $tracking_no = $app_details->tracking_no;
            $applicant_email = $app_details->email;
            $portal_db->table('wb_rejection_remarks')
                ->insert($rejection_params);
            $portal_db->table($table_name)
                ->where('id', $application_id)
                ->update(array('application_status_id' => 23));
            //send email
            $vars = array(
                '{tracking_no}' => $tracking_no
            );
            //onlineApplicationNotificationMail(4, $applicant_email, $vars);
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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
        return \response()->json($res);
    }

    public function funcsubmitRejectedApplication(Request $request)
    {
        $application_id = $request->input('application_id');

        $module_id = $request->input('module_id');
        $application_code = $request->input('application_code');
        $application_table = $request->input('table_name');
        $rejection_comment = $request->input('rejection_comment');

        $rejection_params = array(
            'application_id' => $application_id,
            'application_code' => $application_code,
            'remark' => $rejection_comment,
            'mis_created_by' => $this->user_id
        );
        try {

            $portal_db = DB::connection('portal_db');
            $portaltable_name = getPortalApplicationsTable($module_id);
            //get application details
            $app_details = DB::table($application_table . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->select('t1.tracking_no', 't2.email')
                ->where('t1.id', $application_id)
                ->first();

            if (is_null($app_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                return \response()->json($res);
            }
            $tracking_no = $app_details->tracking_no;
            $applicant_email = $app_details->email;

            $portal_db->table('wb_rejection_remarks')
                ->insert($rejection_params);
            $portal_db->table($portaltable_name)
                ->where('id', $application_id)
                ->update(array('application_status_id' => 23));

            DB::table($application_table)
                ->where('application_code', $application_code)
                ->update(array('is_dismissed' => 1));
            DB::table('tra_submissions')
                ->where('application_code', $application_code)
                ->update(array('is_dismissed' => 1));

            $res = array(
                'success' => true,
                'message' => 'Rejected Applications submitted successfully!!'
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
        return \response()->json($res);
    }

    public function onlineApplicationManagerRejectionAction(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        $comment = $request->input('comment');
        $application_status = $request->input('application_status');
        $update_params = array(
            'manager_rejection_remark' => $comment,
            'application_status_id' => $application_status
        );
        try {
            $portal_db = DB::connection('portal_db');
            $portal_db->table($table_name)
                ->where('id', $application_id)
                ->update($update_params);
            $res = array(
                'success' => true,
                'message' => 'Request executed successfully!!'
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
        return \response()->json($res);
    }

    public function getImporPermitApplicationApprovalDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $approval_table = $request->input('approval_table');
        $application_code = $request->input('application_code');
        if($approval_table == ''){
            $approval_table = 'tra_managerpermits_review';
        }
        try {
            $where = array(
                't1.application_id' => $application_id,
                't1.application_code' => $application_code
            );
            $qry = DB::table($approval_table.' as t1')
                ->select('t1.*', 't1.id as recommendation_id')
                ->where($where)
                ->orderBy('t1.id', 'DESC');
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return \response()->json($res);
    }

    public function getApplicationApprovalDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        try {
            $where = array(
                't1.application_id' => $application_id,
                't1.application_code' => $application_code
            );
            $qry = DB::table('tra_approval_recommendations as t1')
                ->select('t1.*', 't1.id as recommendation_id','reason_for_conditionalapproval','reason_for_rejection')
                ->leftJoin('tra_apprejprovisional_recommendation as t2', 't2.permit_id', '=', 't1.id')
                ->where($where)
                ->orderBy('t1.id', 'DESC');
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return \response()->json($res);
    }
    public function getInspectionApplicationApprovalDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        try {
            $where = array(
                't1.application_code' => $application_code
            );
            $qry = DB::table('tra_premiseinspection_applications as t1')
                ->select('t1.*', 't1.id as recommendation_id')
                ->where($where)
                ->orderBy('t1.id', 'DESC');
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return \response()->json($res);
    }
    
    public function removeInvoiceCostElement(Request $request)
    {
        $item_ids = $request->input();
        try {
            DB::table('tra_invoice_details')
                ->whereIn('id', $item_ids)
                ->delete();
            $res = array(
                'success' => true,
                'message' => 'Selected Invoice items removed successfully!!'
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
        return \response()->json($res);
    }

     public function getApplicationApplicantDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');

        try {
            $qry = DB::table('wb_trader_account as t1')
                ->leftJoin('par_countries as t2', 't1.country_id','t2.id')
                ->leftJoin('par_regions as t3', 't1.region_id','t3.id')
                ->leftJoin('par_districts as t5', 't1.district_id','t5.id')
                ->leftJoin($table_name.' as t4', 't1.id','t4.applicant_id')
                ->select('t1.id as applicant_id', 't1.name as applicant_name', 't1.contact_person', 't1.physical_address', 't1.postal_address', 't5.name as district_name', 't3.name as region_name', 't2.name as country_name', 't1.telephone_no')
                ->where('t4.id', $application_id);
                
                
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return \response()->json($res);
    }


    public function saveApplicationChecklistDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $screening_details = $request->input('screening_details');
        $screening_details = json_decode($screening_details);
        $table_name = 'checklistitems_responses';
        $user_id = $this->user_id;
        try {
            $insert_params = array();
            foreach ($screening_details as $screening_detail) {
                $auditor_comment = '';
                $auditorpass_status = '';
                $audit = '';
                $auditorpass_status = '';
                $audit_created_by = '';
                $audit_altered_by = '';
                $audit_altered_on = '';
                $audit_created_on = '';
                if (property_exists($screening_detail, 'auditor_comment')) {
                    $auditor_comment = $screening_detail->auditor_comment;
                    
                    $audit_created_on = Carbon::now();
                    
                    $audit_altered_by = $user_id;
                    $audit_altered_on = Carbon::now();
                }
                 if (property_exists($screening_detail, 'auditorpass_status')) {
                     
                    $auditorpass_status = $screening_detail->auditorpass_status;
                    $audit_altered_by = $user_id;
                    $audit_altered_on = Carbon::now();
                 }
                $item_resp_id = $screening_detail->item_resp_id;
                if (validateIsNumeric($item_resp_id)) {
                    $where = array(
                        'id' => $item_resp_id
                    );
                    $pass_status = $screening_detail->pass_status;
                    if (DB::table('checklistitems_queries')
                            ->where('item_resp_id', $item_resp_id)
                            ->where('status', '<>', 4)
                            ->count() > 0) {
                       // $pass_status = ;
                    }
                    
                    $update_params = array(
                        'pass_status' => $pass_status,
                        'comment' => $screening_detail->comment,
                        'observation' => $screening_detail->observation,
                        'auditorpass_status'=>$auditorpass_status,
                        'auditor_comment' => $auditor_comment,
                        'audit_altered_on' => $audit_altered_on,
                        'audit_altered_by' => $audit_altered_by,
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);
                    updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                } else {
                    $insert_params[] = array(
                        'application_id' => $application_id,
                        'application_code' => $application_code,
                        'checklist_item_id' => $screening_detail->checklist_item_id,
                        'pass_status' => $screening_detail->pass_status,
                        'comment' => $screening_detail->comment,
                        'auditorpass_status'=>$auditorpass_status,
                        'auditor_comment' => $auditor_comment,
                        'observation' => $screening_detail->observation,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id
                    );
                }
            }
            if (count($insert_params) > 0) {
                DB::table($table_name)
                    ->insert($insert_params);
            }
            $res = array(
                'success' => true,
                'message' => 'Screening details saved successfully!!'
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
        return \response()->json($res);
    }
    
    public function checkApprovalREcommendationDEtails(Request $req){
        try {
                $application_code = $req->application_code;
                $record = DB::table('tra_approval_recommendations')->where('application_code',$application_code)->first();
                if($record){
                    $res = array('success'=>true, 'message'=>'Approval Recommendation has been filled successfully');
                }
                else{
                    $res = array('success'=>false, 'message'=>'Manager Review Recommendation not filled successfully');
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
        return \response()->json($res);
    }
 public function validateDocumentsSubmissonRecRecommendation(Request $req){
        try {
                $application_code = $req->application_code;
                $record = DB::table('tra_documentsubmission_recommendations')->where('application_code',$application_code)->first();
                if($record){
                    $res = array('success'=>true, 'message'=>'Applications Documents Recommendations has been filled successfully');
                }
                else{
                    $res = array('success'=>false, 'message'=>'Manager Review Recommendation not filled successfully');
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
        return \response()->json($res);
    }

    
    function validateRequiredApplicationDetails($table_name, $application_code, $title){
        
        $record = DB::table($table_name)->where('application_code',$application_code)->first();
        if($record){
             $res = array('success'=>true, 'hasValidatedChecklist'=>true, 'message'=>'');
            
        }
        else{
            $res = array('success'=>false,'hasValidatedChecklist'=>false,  'message'=>$title);
        }
        return $res;
    }
    public function getApplicationComments(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $comment_type_id = $request->input('comment_type_id');
        try {
            $qry = DB::table('tra_applications_comments as t1')
                ->join('users as t2', 't1.created_by', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.workflow_stage_id', '=', 't3.id')
                ->leftJoin('par_evaluation_recommendations as t4', 't1.recommendation_id', '=', 't4.id')
                ->select(DB::raw("t1.*, CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as author, t3.name as stage_name, t4.name as recommendation"))
                ->where('t1.application_id', $application_id)
                ->where('t1.application_code', $application_code);

            //print_r( $qry->get());


            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
            }
            if (isset($comment_type_id) && $comment_type_id != '') {
                $qry->where('t1.comment_type_id', $comment_type_id);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return \response()->json($res);
    }

    public function saveCommonData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            $unsetData = $req->input('unset_data');
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
            if($table_name == 'tra_applications_comments'){
                $post_data['assessment_by'] = $user_id;
            }
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $res = array();
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where)) {
                    unset($table_data['created_on']);
                    unset($table_data['created_by']);
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
            } else {
                $res = insertRecord($table_name, $table_data, $user_id);
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
        return response()->json($res);
    }

    public function deleteCommonRecord(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = deleteRecord($table_name, $previous_data, $where, $user_id);
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
        return response()->json($res);
    }

    public function getApplicationInvoiceDetails(Request $request)
    {
        $invoice_id = $request->input('invoice_id');
        try {
             $qry = Db::table('tra_invoice_details as t1')
                ->leftJoin('tra_element_costs as t2', 't1.element_costs_id', 't2.id')
                ->leftJoin('par_cost_elements as t3', 't2.element_id', 't3.id')
                ->leftJoin('par_currencies as t5', 't1.paying_currency_id', 't5.id')
                ->leftJoin('par_cost_sub_categories as t6', 't2.sub_cat_id', 't6.id')
                ->leftJoin('par_cost_categories as t7', 't6.cost_category_id', 't7.id')
                ->select('t2.id', 't1.id as invoice_detail_id', 't1.paying_exchange_rate as exchange_rate', 't1.invoice_id', 't1.element_costs_id',
                    't1.element_amount as cost', 't5.id as currency_id', 't3.name as element', 't5.name as currency',
                    't6.name as sub_category', 't7.name as category', 't1.quantity', 't1.total_element_amount')
                ->where('t1.invoice_id', $invoice_id);
            $results = $qry->get();
            
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well!!'
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
        return \response()->json($res);
    }

    public function getElementCosts(Request $request)
    {
        $feeType = $request->input('fee_type');
        $costSubCat = $request->input('cost_subcategory');
        $where = array(
            't1.feetype_id' => $feeType,
            't1.sub_cat_id' => $costSubCat
        );
        try {
            
            $qry = DB::table('tra_element_costs as t1')
                ->join('par_cost_elements as t2', 't1.element_id', 't2.id')
                ->join('par_currencies as t4', 't1.currency_id', 't4.id')
                ->join('par_cost_sub_categories as t5', 't1.sub_cat_id', 't5.id')
                ->join('par_cost_categories as t6', 't5.cost_category_id', 't6.id')
                ->join('par_exchange_rates as t7', 't4.id', 't7.currency_id')
                ->select('t1.*', 't1.id as element_costs_id', 't4.id as currency_id', 't2.name as element', 
                    't4.name as currency', 't5.name as sub_category', 't6.name as category', 't7.exchange_rate')
                ->where($where);
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return \response()->json($res);
    }

    public function getApplicationPaymentDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $invoice_no = $request->input('invoice_no');
        $where = array(
         //  'application_id' => $application_id,
            't5.invoice_no' => $invoice_no
        );
        try {
            $qry = DB::table('tra_payments as t1')
                ->leftJoin('par_payment_modes as t2', 't1.payment_mode_id', '=', 't2.id')
                ->leftJoin('par_currencies as t3', 't1.currency_id', '=', 't3.id')
                ->leftJoin('par_receipt_types as t4', 't1.receipt_type_id', '=', 't4.id')
                ->leftJoin('tra_application_invoices as t5', 't1.invoice_id', '=', 't5.id')
                ->select(DB::raw("t1.*,t2.name as payment_mode,t3.name as currency,t4.name as receipt_type"))
                ->where($where);
            
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return \response()->json($res);
    }

    public function getOnlineApplicationRejections(Request $request)
    {
        try {
            $application_code = $request->input('application_code');
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_rejection_remarks as t1')
                ->join('par_onlineapps_rejectionreasons as t2', 't1.reason_id', '=', 't2.id')
                ->select('t1.*', 't2.name as rejection_reason')
                ->where('application_code', $application_code)
                ->orderBy('t1.id', 'DESC');
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $user = getTableData('users', array('id' => $result->mis_created_by));
                if (!is_null($user)) {
                    $results[$key]->user = aes_decrypt($user->first_name) . ' ' . aes_decrypt($user->last_name);
                }
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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
        return \response()->json($res);
    }

    public function prepareApplicationTCMeetingSchedulingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tc_meeting_applications as t2', function ($join) use ($application_code) {
                    $join->on('t1.application_code', '=', 't2.application_code');
                })
                ->join('tc_meeting_details as t3', 't2.meeting_id', '=', 't3.id')
                ->select(DB::raw("t3.*"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return \response()->json($res);
    }

    public function getApplicationWithdrawalReasons(Request $request)
    {
        $isOnline = $request->input('isOnline');//PORTAL
        try {
            if (validateIsNumeric($isOnline) && $isOnline == 1) {
                $results = $this->getOnlineApplicationWithdrawalReasons($request);
            } else {
                $results = $this->getMISApplicationWithdrawalReasons($request);
                if(count($results) ==0 ){
                    
                $results = $this->getOnlineApplicationWithdrawalReasons($request);
                }
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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
        return \response()->json($res);
    }

    public function getMISApplicationWithdrawalReasons(Request $request)
    {
        $application_code = $request->input('application_code');
        $qry = DB::table('tra_application_withdrawaldetails as t1')
            ->join('par_withdrawal_categories as t2', 't1.withdrawal_category_id', '=', 't2.id')
            ->select('t1.*', 't2.name as reason', 't2.module_id')
            ->where('t1.application_code', $application_code);
        $results = $qry->get();
        return $results;
    }

    public function getOnlineApplicationWithdrawalReasons(Request $request)
    {
        $application_code = $request->input('application_code');
        $portal_db = DB::Connection('portal_db');
        $qry = $portal_db->table('wb_application_withdrawaldetails as t1')
            ->select('t1.*')
            ->where('t1.application_code', $application_code);
        $results = $qry->get();
        foreach ($results as $key => $result) {
            $results[$key]->reason = getSingleRecordColValue('par_withdrawal_categories', array('id' => $result->withdrawal_category_id), 'name');
        }
        return $results;
    }

    public function saveApplicationWithdrawalReasons(Request $request)
    {
        try {
            $application_code = $request->input('application_code');
            $reason_id = $request->input('withdrawal_category_id');
            $remark = $request->input('reason_for_withdrawal');
            $id = $request->input('id');
            $user_id = $this->user_id;
            
            //chech for portal update 
            $where_portal = array(
                'application_code' => $application_code,
                'id' => $id
            );
            $record = DB::connection('portal_db')
                        ->table('wb_application_withdrawaldetails')
                        ->where($where_portal)
                        ->count();
            if($record >0){
                $params = array(
                        'application_code' => $application_code,
                        'withdrawal_category_id' => $reason_id,
                        'reason_for_withdrawal' => $remark
                    );
                DB::connection('portal_db')->table('wb_application_withdrawaldetails')->where($where_portal)->update($params);
                $res = array('success'=>true, 'message'=>'Saved successfully');
            }
            else{
                    $table_name = 'tra_application_withdrawaldetails';
                    $where1 = array(
                        'application_code' => $application_code,
                        'withdrawal_category_id' => $reason_id
                    );
                    $params = array(
                        'application_code' => $application_code,
                        'withdrawal_category_id' => $reason_id,
                        'reason_for_withdrawal' => $remark
                    );
                    if (validateIsNumeric($id)) {
                        $where2 = array(
                            'id' => $id
                        );
                        $params['dola'] = Carbon::now();
                        $params['altered_by'] = $user_id;
                        $previous_data = getPreviousRecords($table_name, $where2);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                        
                        $previous_data = $previous_data['results'];
                        $res = updateRecord($table_name, $previous_data, $where2, $params, $user_id);
                    } else {
                        if (recordExists('tra_application_withdrawaldetails', $where1)) {
                            $res = array(
                                'success' => false,
                                'message' => 'Already added!!'
                            );
                            return \response()->json($res);
                        }
                        $params['created_on'] = Carbon::now();
                        $params['date_added'] = Carbon::now();
                        $params['created_by'] = $user_id;
                        $res = insertRecord($table_name, $params, $user_id);
                    }
                
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
        return \response()->json($res);
    }
    
    public function saveApplicatioAppealReasons(Request $request)
    {
        try {
            $application_code = $request->input('application_code');
            $appeal_type_id = $request->input('appeal_type_id');
            $appeal_request = $request->input('appeal_request');
            $id = $request->input('id');
            $user_id = $this->user_id;

            $table_name = 'tra_application_appealdata';

            $where1 = array(
                'application_code' => $application_code,
                'appeal_type_id' => $appeal_type_id
            );
            $params = array(
                'application_code' => $application_code,
                'appeal_type_id' => $appeal_type_id,
                'appeal_request' => $appeal_request
            );
            if (validateIsNumeric($id)) {
                $where2 = array(
                    'id' => $id
                );
                $params['dola'] = Carbon::now();
                $params['altered_by'] = $user_id;
                $previous_data = getPreviousRecords($table_name, $where2);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $res = updateRecord($table_name, $previous_data, $where2, $params, $user_id);
            } else {
                if (recordExists($table_name, $where1)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Already added!!'
                    );
                    return \response()->json($res);
                }
                $params['created_on'] = Carbon::now();
                $params['date_added'] = Carbon::now();
                $params['created_by'] = $user_id;
                $res = insertRecord($table_name, $params, $user_id);
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
        return \response()->json($res);
    }
    public function saveApplicationWithdrawalReasons2(Request $request)
    {
        try {
            $application_code = $request->input('application_code');
            $reason_id = $request->input('withdrawal_category_id');
            $remark = $request->input('reason_for_withdrawal');
            $id = $request->input('id');
            $user_id = $this->user_id;
            $table_name = 'tra_application_withdrawaldetails';
            $where1 = array(
                'application_code' => $application_code,
                'withdrawal_category_id' => $reason_id
            );
            $params = array(
                'application_code' => $application_code,
                'withdrawal_category_id' => $reason_id,
                'reason_for_withdrawal' => $remark
            );
            if (validateIsNumeric($id)) {
                $where2 = array(
                    'id' => $id
                );
                $params['dola'] = Carbon::now();
                $params['altered_by'] = $user_id;
                $previous_data = getPreviousRecords($table_name, $where2);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $res = updateRecord($table_name, $previous_data, $where2, $params, $user_id);
            } else {
                if (recordExists('tra_application_withdrawaldetails', $where1)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Already added!!'
                    );
                    return \response()->json($res);
                }
                $params['created_on'] = Carbon::now();
                $params['date_added'] = Carbon::now();
                $params['created_by'] = $user_id;
                $res = insertRecord($table_name, $params, $user_id);
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
        return \response()->json($res);
    }
    public function getSystemNotifications(Request $request)
    {
        $from_module_id = $request->input('from_module_id');
        $to_module_id = $request->input('to_module_id');
        try {
            $qry = DB::table('tra_notifications as t1')
                ->join('modules as t2', 't1.from_module_id', '=', 't2.id')
                ->join('modules as t3', 't1.to_module_id', '=', 't3.id')
                ->join('par_notification_types as t4', 't1.notification_type_id', '=', 't4.id')
                ->join('par_notification_statuses as t5', 't1.status_id', '=', 't5.id')
                ->select(DB::raw("t1.*,t2.name as from_module,t3.name as to_module,t4.name as notification_type,t4.memo,
                    TOTAL_WEEKDAYS(t1.notification_date,now()) as time_span"));
            if (validateIsNumeric($from_module_id)) {
                $qry->where('t1.from_module_id', $from_module_id);
            }
            if (validateIsNumeric($to_module_id)) {
                $qry->where('t1.to_module_id', $to_module_id);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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
        return \response()->json($res);
    }
    public function getApplicationDataAmmendmentRequests(Request $request)
    {
      
        try {
            $application_code = $request->input('application_code');
            $qry = DB::table('tra_appsections_ammendments as t1')
                ->leftJoin('par_alteration_setup as t2', 't1.part_id', '=', 't2.id')
                ->leftJoin('par_ammendmentrequest_status as t3', 't1.status_id', '=', 't3.id')
                ->select('t1.*','t2.name as application_section','t3.name as status')
                ->where('t1.application_code', $application_code);
            $results = $qry->get();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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
        return \response()->json($res);
    }
    public function getApplicationDataAppealRequests(Request $request)
    {
      
        try {
            $application_code = $request->input('application_code');

            $qry = DB::table('tra_application_appealdata as t1')
                ->leftJoin('par_appeal_types as t2', 't1.appeal_type_id', '=', 't2.id')
                ->select('t1.*','t2.name as appeal_type')
                ->where('t1.application_code', $application_code);
            $results = $qry->get();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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
        return \response()->json($res);
    }
    
    public function getApplicationVariationRequests(Request $request)
    {
        $isOnline = $request->input('isOnline');//PORTAL
        try {
            $results = array();
            if (validateIsNumeric($isOnline) && $isOnline == 1) {
                $results = $this->getOnlineApplicationVariationRequests($request);
            } else {
                $results = $this->getMISApplicationVariationRequests($request);
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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
        return \response()->json($res);
    }

    public function getMISApplicationVariationRequests(Request $request)
    {
        $application_code = $request->input('application_code');
        $qry = DB::table('tra_application_variationsdata as t1')
            ->leftJoin('par_variations_categories as t2', 't1.variation_category_id', '=', 't2.id')
            ->leftJoin('par_typeof_variations as t3', 't1.variation_type_id', '=', 't3.id')
            ->leftJoin('tra_application_uploadeddocuments as t4', 't1.appuploaded_document_id','=','t4.id')
            ->select('t1.*', 't2.name as variation_category', 't3.name as variation_type', 't2.module_id', 't2.section_id', 't4.node_ref', 't4.initial_file_name')
            ->where('t1.application_code', $application_code);
        $results = $qry->get();
        return $results;
    }

    public function getOnlineApplicationVariationRequests(Request $request)
    {
        $application_code = $request->input('application_code');
        $portal_db = DB::Connection('portal_db');
        $qry = $portal_db->table('wb_application_variationsdata as t1')
            ->select('t1.*')
            ->where('t1.application_code', $application_code);
        $results = $qry->get();
        foreach ($results as $key => $result) {
            $appuploaded_document_id = $result->variation_category_id;

            $document_records = DB::table('tra_application_uploadeddocuments')
            ->where(array('application_code'=>$application_code, 'id'=>$appuploaded_document_id))
            ->first();

            if($document_records){
                $results[$key]->node_ref = $document_records->node_ref;
                $results[$key]->uploaded_on = $document_records->uploaded_on;
                $results[$key]->uploaded_by = $document_records->uploaded_by;
                $results[$key]->initial_file_name = $document_records->initial_file_name;
            }
            else{
                $results[$key]->node_ref = '';
            }
            $results[$key]->variation_category = getSingleRecordColValue('par_variations_categories', array('id' => $result->variation_category_id), 'name');
            $results[$key]->variation_type = getSingleRecordColValue('par_typeof_variations', array('id' => $result->variation_type_id), 'name');
        }
        return $result;
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
            ->select(DB::raw("id as portal_id,application_code,variation_type_id,variation_category_id,present_details,proposed_variation,
                        variation_background_information,status_id,$user_id as created_by"))
            ->get();
        $variations = convertStdClassObjToArray($variations);
        DB::table('tra_application_variationsdata')
            ->insert($variations);
    }
    
    public function checkSampleSubmisisonDetails(Request $request)
    {
        $application_code = $request->input('application_code');
     
        try {
           $counter = DB::table('tra_documentsubmission_recommendations')
            ->where(array('application_code'=>$application_code))
            ->count();
            if($counter > 0){
                $res = array(
                    'success' => true
                );

            }
            else{
                $res = array(
                    'success' => false
                );
            }
            
            $res = array(
                'success' => true
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
        return \response()->json($res);
    }
    public function checkGeneratedInvoiceDetails(Request $request){
        $application_code = $request->input('application_code');
        try {
            $invoiceIsGenerated = true;//revert to false on the deployment 
            $records = DB::table('tra_application_invoices')
                        ->where('application_code',$application_code)
                        ->get();
                if(count($records) > 0){
                    $invoiceIsGenerated = true;
                }
                
            $res = array(
                'success' => true,
                'invoiceIsGenerated' => $invoiceIsGenerated,
                'message' => 'All is well'
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
        return \response()->json($res);

   }

   public function validateApplicationChecklistDetails($request){
            $checklist_type = $request->input('checklist_type');
            $checklist_category_id = $request->input('checklist_category_id');
            $application_code = $request->input('application_code');
            $module_id = $request->input('module_id');
            $sub_module_id = $request->input('sub_module_id');
            $section_id = $request->input('section_id');
            $is_previous = $request->input('is_previous');
            $workflow_stage = $request->input('workflow_stage');
            if($module_id == 4){
                $sub_module_id = 12;
                $section_id = 1;
                
            }
            $where2 = array(
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id
            );
            
            $process_details = getTableData('wf_tfdaprocesses', $where2);
            $process_id = $process_details->id;
            $workflow_id = $process_details->workflow_id;
            $where3 = array(
                'workflow_id' => $workflow_id,
                'stage_status' => 1
            );

            $stage_details = getTableData('wf_workflow_stages', $where3);
          
            $where = array(
                'process_id' => $process_id,
                'stage_id' => $workflow_stage
            );
            if (!validateIsNumeric($workflow_stage)) {
                  $workflow_stage = $stage_details->id;
                $where['stage_id'] = $workflow_stage;
            }
            
            try {

                $where2 = array(
                   // 'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id
                );
                //get applicable checklist categories
                $qry1 = DB::table('tra_proc_applicable_checklists')
                    ->select('checklist_category_id')
                    ->where($where);

                $checklist_categories = $qry1->get();
                $checklist_categoriesdata = $qry1->get();
                
                
                $checklist_categories = convertStdClassObjToArray($checklist_categories);
                $checklist_categories = convertAssArrayToSimpleArray($checklist_categories, 'checklist_category_id');
                //get applicable checklist types
                $qry2 = DB::table('par_checklist_types as t1')
                    ->select('t1.id')
                    ->where($where2)
                    ->whereIn('checklist_category_id', $checklist_categories);
                $checklist_types = $qry2->get();
                
                $checklist_types = convertStdClassObjToArray($checklist_types);
                $checklist_types = convertAssArrayToSimpleArray($checklist_types, 'id');

                $qry = DB::table('par_checklist_items as t1')
                    ->join('checklistitems_responses as t2', function ($join) use ($application_code, $is_previous) {
                        $join->on('t2.checklist_item_id', '=', 't1.id')
                            ->where('t2.application_code', $application_code);
                    })
                    ->join('par_checklist_types as t3', 't1.checklist_type_id', '=', 't3.id')
                    ->select(DB::raw("t1.*,t2.id as item_resp_id,t2.pass_status,t2.comment,t2.observation,t2.auditor_comment,t3.name as checklist_type,
                                $module_id as module_id,$sub_module_id as sub_module_id,$section_id as section_id"));
                               
                if (isset($checklist_type) && $checklist_type != '') {
                    $qry->where('t1.checklist_type_id', $checklist_type);
                } else {
                    $qry->whereIn('t1.checklist_type_id', $checklist_types);
                }
                //check the responses 
                $results = $qry->get();
                
               // $records = DB::table('checklistitems_responses')->where(array('application_code'=>$application_code))->get();
                
                if(count($results) >0){
                    
                        $hasValidatedChecklist = true;
                        if (validateIsNumeric($checklist_category_id)) {
                                foreach($results as $rec){
                                    $item_resp_id = $rec->item_resp_id;
                                    if( $item_resp_id == ''){
                                        $hasValidatedChecklist = false;    
                                    }
                                }
                        }
                    //  $hasValidatedChecklist = true;  
                }
                else{
                        $hasValidatedChecklist = false;
                }
            
                $res = array(
                    'success' => true,
                    'hasValidatedChecklist' => $hasValidatedChecklist,
                    'message' => 'All is well'
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
    public function checkApplicationEvaluationOverralRecom(Request $request)
    {
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $comment_type_id = $request->input('comment_type_id');//whether structured or unstructured
        try {
           $record = DB::table('tra_applications_comments')->where(array('application_code'=>$application_code, 'comment_type_id'=>$comment_type_id))->count();

            if ($record >0) {
                $hasRecommendation = 1;
            } else {
                $hasRecommendation = 0;
            }
            $res = array(
                'success' => true,
                'hasRecommendation' => $hasRecommendation
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
        return \response()->json($res);
    }
   public function checkOnlineApplicationChecklistDetails(Request $request){
        //$res = $this->validateApplicationChecklistDetails($request);
        
            $checklist_type = $request->input('checklist_type');
            $checklist_category_id = $request->input('checklist_category_id');
            $application_code = $request->input('application_code');
            $module_id = $request->input('module_id');
            $sub_module_id = $request->input('sub_module_id');
            $section_id = $request->input('section_id');
            $is_previous = $request->input('is_previous');
            
            $where2 = array(
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id
            );
            
            $process_details = getTableData('wf_tfdaprocesses', $where2);
            $process_id = $process_details->id;
            $workflow_id = $process_details->workflow_id;
            $where3 = array(
                'workflow_id' => $workflow_id,
                'stage_status' => 1
            );

            $stage_details = getTableData('wf_workflow_stages', $where3);
            $workflow_stage = $stage_details->id;
            $where = array(
                'process_id' => $process_id,
                'stage_id' => $workflow_stage
            );
            if (validateIsNumeric($workflow_stage)) {
                $where['stage_id'] = $workflow_stage;
            }
            
            try {

                $where2 = array(
                   // 'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id
                );
                //get applicable checklist categories
                $qry1 = DB::table('tra_proc_applicable_checklists')
                    ->select('checklist_category_id')
                    ->where($where);

                $checklist_categories = $qry1->get();
                
                
                $checklist_categories = convertStdClassObjToArray($checklist_categories);
                $checklist_categories = convertAssArrayToSimpleArray($checklist_categories, 'checklist_category_id');
                //get applicable checklist types
                $qry2 = DB::table('par_checklist_types as t1')
                    ->select('t1.id')
                    ->where($where2)
                    ->whereIn('checklist_category_id', $checklist_categories);
                $checklist_types = $qry2->get();
                
                $checklist_types = convertStdClassObjToArray($checklist_types);
                $checklist_types = convertAssArrayToSimpleArray($checklist_types, 'id');

                $qry = DB::table('par_checklist_items as t1')
                    ->leftJoin('checklistitems_responses as t2', function ($join) use ($application_code, $is_previous) {
                        $join->on('t2.checklist_item_id', '=', 't1.id')
                            ->where('t2.application_code', $application_code);
                    })
                    ->join('par_checklist_types as t3', 't1.checklist_type_id', '=', 't3.id')
                    ->select(DB::raw("t1.*,t2.id as item_resp_id,t2.pass_status,t2.comment,t2.observation,t2.auditor_comment,t3.name as checklist_type,
                                $module_id as module_id,$sub_module_id as sub_module_id,$section_id as section_id"));
                               
                if (isset($checklist_type) && $checklist_type != '') {
                    $qry->where('t1.checklist_type_id', $checklist_type);
                } else {
                    $qry->whereIn('t1.checklist_type_id', $checklist_types);
                }
                //check the responses 
                $results = $qry->get();
                
               // $records = DB::table('checklistitems_responses')->where(array('application_code'=>$application_code))->get();
                
                if(count($results) >0){
                    
                        $hasValidatedChecklist = true;
                        if (validateIsNumeric($checklist_category_id)) {
                                foreach($results as $rec){
                                    $item_resp_id = $rec->item_resp_id;//$pass_status == 2 || 
                                    $pass_status = $rec->pass_status;
                                    if($item_resp_id == ''){
                                        $hasValidatedChecklist = false;    
                                    }
                                }
                        }
                        else{
                             foreach($results as $rec){
                                    $item_resp_id = $rec->item_resp_id;
                                    $pass_status = $rec->pass_status;//$pass_status == 2 || 
                                    if($item_resp_id == ''){
                                        $hasValidatedChecklist = false;    
                                    }
                                }
                            
                        }
                        // $hasValidatedChecklist = true;  
                }
                else{
                        $hasValidatedChecklist = false;
                }
             $hasValidatedChecklist = true;
                $res = array(
                    'success' => true,
                    'hasValidatedChecklist' => $hasValidatedChecklist,
                    'message' => 'All is well'
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
              //return \response()->json($res);

   }
   public function checkApplicationChecklistUploadDetails(Request $request){

    try {

        
            $res = $this->onValidateApplicationDocumentsUploads($request);
            
            if(!$res['hasValidatedChecklist']){
                //ceck the documents uploads 
                
                $res = $this->validateApplicationChecklistDetails($request);
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
    return \response()->json($res);


   }
   public function onValidateApplicationDocumentsUploads(Request $req)
   {
       $application_code = $req->input('application_code');
       $workflow_stage = $req->input('workflow_stage');
       $doc_type_id = $req->input('document_type_id');
       $portal_uploads = $req->input('portal_uploads');
       $portal_status_id = $req->input('portal_status_id');
       $section_id = $req->input('section_id');
       $module_id = $req->input('module_id');
       $sub_module_id = $req->input('sub_module_id');
       $prodclass_category_id = $req->input('prodclass_category_id');
       $hasValidatedChecklist = false;
       try {
           $where = array(
               'module_id' => $module_id,
               'sub_module_id' => $sub_module_id,
               'section_id' => $section_id
           );
           $process_id = getSingleRecordColValue('wf_tfdaprocesses', $where, 'id');
           //get applicable document types
           $qry1 = DB::table('tra_proc_applicable_doctypes')
               ->select('doctype_id');
           if (isset($process_id) && $process_id != '') {
               $qry1->where('process_id', $process_id);
           }
           if (isset($workflow_stage) && $workflow_stage != '') {
               $qry1->where('stage_id', $workflow_stage);
           }
           if (validateIsNumeric($doc_type_id)) {
               $qry1->where('doctype_id', $doc_type_id);
           }
           
                $hasValidatedChecklist = true;
           $docTypes = $qry1->get();
           $docTypes = convertStdClassObjToArray($docTypes);
           $docTypes = convertAssArrayToSimpleArray($docTypes, 'doctype_id');
           //get applicable document requirements
           $qry = DB::table('tra_documentupload_requirements as t1')
               ->join('par_document_types as t2', 't1.document_type_id', '=', 't2.id')
               ->select(DB::raw(" t1.id as document_requirement_id, t4.application_code,
                t2.name as document_type, t4.id, t1.module_id,t1.sub_module_id,t1.section_id,
               CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by,t1.is_mandatory,t4.id as document_id,
               t1.id as document_requirement_id, t1.document_type_id,t2.name as document_type, t1.name as document_requirement"))
               ->leftJoin('tra_application_documents as t4', function ($join) use ($application_code) {
                   $join->on("t1.id", "=", "t4.document_requirement_id")
                        ->where("t4.application_code", "=", $application_code);
               })
               ->leftJoin('users as t5', 't4.uploaded_by', '=', 't5.id')
               ->where($where);
               if (validateIsNumeric($prodclass_category_id)) {
                   $qry->where('t1.prodclass_category_id', $prodclass_category_id);
               }
               if (validateIsNumeric($doc_type_id)) {
                   $qry->where('t1.document_type_id', $doc_type_id);
               } //else if(count($docTypes) > 0) {
                   $qry->whereIn('t1.document_type_id', $docTypes);;
              // }
               
               if (isset($portal_uploads) && $portal_uploads == 1) {
                   $qry->where('t1.portal_uploadable', 1);
               }
               if (isset($portal_status_id) && $portal_status_id == 1) {
                   $qry->where('t1.portal_uploadable', 1);
               }
           $results = $qry->get();
 
           if(count($results) >0){
                $hasValidatedChecklist = true;
                           foreach($results as $rec){
                               $document_id = $rec->document_id;
                               if( $document_id == ''){
                                   $hasValidatedChecklist = false;    
                               }
                           }
                   
           }
           else{
                   $hasValidatedChecklist = true;
           } 
           $res = array(
                'success' => true,
                'hasValidatedChecklist' => $hasValidatedChecklist,
                'message' => 'All is well Documents'
            );
       } catch (\Exception $e) {
           $res = array(
               'success' => false,
               'message' => $e->getMessage()
           );
       } catch (\Throwable $throwable) {
           $res = array(
               'success' => false,
               'message' => $throwable->getMessage()
           );
       }
      return   $res;
   }
    public function checkApplicationRaisedQueries(Request $request)
    {
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $query_type = $request->input('query_type');//whether structured or unstructured
        try {
            $hasUnStructuredQueries = $this->checkUnstructuredApplicationRaisedQueries($application_code, array(1, 3));
            $hasStructuredQueries = $this->checkChecklistBasedApplicationRaisedQueries($application_code, array(1, 3));

            if ($hasUnStructuredQueries == 1 || $hasStructuredQueries == 1) {
                $hasQueries = 1;
                
            } else {
                $hasQueries = 0;
            }
            $res = array(
                'success' => true,
                'hasQueries' => $hasQueries
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
        return \response()->json($res);
    }

    public function checkApplicationRespondedUnclosedQueries(Request $request)
    {
        $application_code = $request->input('application_code');
        try {
            $hasUnStructuredQueries = $this->checkUnstructuredApplicationRaisedQueries($application_code, array(2));
            $hasStructuredQueries = $this->checkChecklistBasedApplicationRaisedQueries($application_code, array(2));
            if ($hasUnStructuredQueries == 1 || $hasStructuredQueries == 1) {
                $hasQueries = 1;
            } else {
                $hasQueries = 0;
            }
            $res = array(
                'success' => true,
                'hasQueries' => $hasQueries
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
        return \response()->json($res);
    }

    public function checkChecklistBasedApplicationRaisedQueries($application_code, $whereInArray = array(1, 3))
    {
        $hasQueries = 0;
        $qry = DB::table('checklistitems_responses as t1')
            ->join('checklistitems_queries as t2', 't1.id', '=', 't2.item_resp_id')
            ->where('t1.application_code', $application_code)
            ->where('pass_status',2)
            ->whereIn('t2.status', $whereInArray);
        $queriesCount = $qry->count();
        if ($queriesCount > 0) {
            $hasQueries = 1;
        }
        return $hasQueries;
    }

    public function checkUnstructuredApplicationRaisedQueries($application_code, $whereInArray = array(1, 3))
    {
        $hasQueries = 0;
        $qry = DB::table('checklistitems_queries as t1')
            ->where('t1.application_code', $application_code)
            ->whereIn('t1.status', $whereInArray);
        $queriesCount = $qry->count();
        if ($queriesCount > 0) {
            $hasQueries = 1;
        }
        return $hasQueries;
    }

    public function checkGMPApplicationRaisedQueries($application_code)
    {
        $hasQueries = 0;
        $qry = DB::table('tra_gmp_noncompliance_observations as t1')
            ->where('application_code', $application_code)
            ->whereIn('status', array(1, 3));
        $queriesCount = $qry->count();
        if ($queriesCount > 0) {
            $hasQueries = 1;
        }
        return $hasQueries;
    }

    public function getAllApplicationQueries(Request $request)
    {
        try {
            $application_code = $request->application_code;
            $results = array();
            if(validateIsNumeric($application_code)){
                  $structuredQueries = convertStdClassObjToArray($this->getAllApplicationStructuredQueries($request));
                $unStructuredQueries = convertStdClassObjToArray($this->getAllApplicationUnstructuredQueries($request));
                $results = array_merge($structuredQueries, $unStructuredQueries);
            }
          
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return response()->json($res);
    }

    public function getAllApplicationStructuredQueries(Request $request)
    {
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        $checklist_category = $request->input('checklist_category');
        $where = array(
            't1.application_code' => $application_code,
            't6.module_id' => $module_id,
            't6.sub_module_id' => $sub_module_id,
            't6.section_id' => $section_id
        );
        $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
        $query_ref_id = getSingleRecordColValue($table_name, array('application_code' => $application_code), 'last_query_ref_id');
        $qry = DB::table('checklistitems_responses as t1')
            ->join('checklistitems_queries as t2', 't1.id', '=', 't2.item_resp_id')
            ->leftJoin('checklistitems_queryresponses as t4', function ($query) {
                $query->on('t2.id', '=', 't4.query_id')
                    ->whereRaw('t4.id IN (select MAX(a2.id) from checklistitems_queryresponses as a2 join checklistitems_queries as u2 on u2.id = a2.query_id group by u2.id)');
            })
            ->join('par_checklist_items as t5', 't1.checklist_item_id', '=', 't5.id')
            ->join('par_checklist_types as t6', 't5.checklist_type_id', '=', 't6.id')
            //->select(DB::raw("t2.*,t5.id as checklist_item_id,t6.checklist_category_id,t2.query,t5.name as checklist_item_name,t4.response as last_response,t6.name as checklist_type"))
            ->leftJoin('users as t7', 't2.created_by', '=', 't7.id')
            ->leftJoin('par_query_guidelines_references as t8', 't2.reference_id', '=', 't8.id')
            ->join('par_query_statuses as t9', 't2.status', '=', 't9.id')
            ->select(DB::raw("t2.*,t5.id as checklist_item_id,t6.checklist_category_id,t2.query,t5.name as checklist_item_name,t4.response as last_response,t6.name as checklist_type,
                                CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as queried_by,t2.created_on as queried_on,t8.name as reference_details,t9.name as query_status,t2.status"))
            ->where($where)
            ->where('t2.status', '<>', 4);
        /* ->whereIn('t2.id', function ($query) use ($query_ref_id) {
             $query->select(DB::raw('query_id'))
                 ->from('tra_queries_referencing')
                 ->where('query_ref_id', $query_ref_id);
         });*/
        if (validateIsNumeric($checklist_category)) {
            $qry->where('t6.checklist_category_id', $checklist_category);
        }
        $results = $qry->get();
        return $results;
    }

    public function getAllApplicationUnstructuredQueries(Request $request)
    {
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        $checklist_category = $request->input('checklist_category');
        $where = array(
            't2.application_code' => $application_code,
           // 't6.module_id' => $module_id,
           // 't6.sub_module_id' => $sub_module_id,
           // 't6.section_id' => $section_id
        );
        $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
        $query_ref_id = getSingleRecordColValue($table_name, array('application_code' => $application_code), 'last_query_ref_id');
        $qry = DB::table('checklistitems_queries as t2')
            ->leftJoin('checklistitems_queryresponses as t4', function ($query) {
                $query->on('t2.id', '=', 't4.query_id')
                    ->whereRaw('t4.id IN (select MAX(a2.id) from checklistitems_queryresponses as a2 join checklistitems_queries as u2 on u2.id = a2.query_id group by u2.id)');
            })
            ->leftJoin('par_checklist_items as t5', 't2.checklist_item_id', '=', 't5.id')
            ->leftJoin('par_checklist_types as t6', 't5.checklist_type_id', '=', 't6.id')
            ->leftJoin('users as t7', 't2.created_by', '=', 't7.id')
            ->leftJoin('par_query_guidelines_references as t8', 't2.reference_id', '=', 't8.id')
            ->leftJoin('par_query_statuses as t9', 't2.status', '=', 't9.id')
            ->select(DB::raw("t2.*,t5.id as checklist_item_id,t6.checklist_category_id,t2.query,t5.name as checklist_item_name,t4.response as last_response,t6.name as checklist_type,
                                CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as queried_by,t2.created_on as queried_on,t8.name as reference_details,t9.name as query_status,t2.status"))
            ->where($where)
            ->where('t2.status', '<>', 4);
        /*->whereIn('t2.id', function ($query) use ($query_ref_id) {
            $query->select(DB::raw('query_id'))
                ->from('tra_queries_referencing')
                ->where('query_ref_id', $query_ref_id);
        });*/
        if (validateIsNumeric($checklist_category)) {
            $qry->where('t6.checklist_category_id', $checklist_category);
        }
        $results = $qry->get();
        return $results;
    }

    public function saveApplicationDismissalDetails(Request $request)
    {
        $module_id = $request->input('module_id');
        $application_code = $request->input('application_code');
        $workflow_stage_id = $request->input('workflow_stage_id');
        try {
            //check if dismissal is allowed
            $dismissalAllowed = DB::table('wf_workflow_stages')
                ->where(array('id' => $workflow_stage_id, 'appdismissal_allowed' => 1))
                ->first();
            if (is_null($dismissalAllowed)) {
                $res = array(
                    'success' => false,
                    'message' => 'Sorry dismissal of an application is not allowed at this stage!!'
                );
                return response()->json($res);
            }
            $application_table = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
            $params = array(
                'application_code' => $application_code,
                'application_id' => $request->input('application_id'),
                'module_id' => $module_id,
                'workflow_stage_id' => $workflow_stage_id,
                'sub_module_id' => $request->input('sub_module_id'),
                'section_id' => $request->input('section_id'),
                'dismissal_reason_id' => $request->input('dismissal_reason_id'),
                'dismissal_remarks' => $request->input('dismissal_remarks'),
                'dismissal_date' => Carbon::now(),
                'dismissal_by' => $this->user_id
            );
            DB::table('tra_dismissed_applications')->insert($params);
            DB::table($application_table)
                ->where('application_code', $application_code)
                ->update(array('is_dismissed' => 1));
            DB::table('tra_submissions')
                ->where('application_code', $application_code)
                ->update(array('is_dismissed' => 1));
            $res = array(
                'success' => true,
                'message' => 'Application dismissed successfully!!'
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
        return response()->json($res);
    }

    public function getApplicationChecklistQueries(Request $request)
    {
        $item_resp_id = $request->input('item_resp_id');
        $application_code = $request->input('application_code');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        try {
            $qry = DB::table('tra_application_query_reftracker as t1')
                    ->leftJoin('par_query_types as t2', 't1.query_type_id', 't2.id')
                    ->leftJoin('par_checklist_categories as t3', 't1.checklist_category_id', 't3.id')
                    ->select('t1.id as query_id', 't1.*', 't2.name as query_type', 't3.name as checklist_category', 't1.query_remark as comment')
                    ->groupBy('t1.id');
            if(validateIsNumeric($application_code)){
                $qry->where('t1.application_code', $application_code);
            }
            if(validateIsNumeric($process_id)){
                $qry->where('t1.process_id', $process_id);
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
        return response()->json($res);
    }
public function saveChecklistApplicationQuery(Request $req)
    {
        try{
            $user_id = $this->user_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;
            $application_code = $req->application_code;
            $workflow_stage_id = $req->workflow_stage_id;
            $process_id = $req->process_id;
            $query_id = $req->query_id;
            $query_remark = $req->comment;
            $is_structured = $req->is_structured;
            $query_txt = $req->query_txt;
            $queried_on = Carbon::now();
            $queried_by = $user_id;
            $queryref_status_id = 1;
            $query_type_id = $req->query_type_id;
            $query_processstage_id = $req->query_processstage_id;
            $table_name = $req->table_name;
            $table_name = returnTableNamefromModule('',$module_id);
        
           //process query
           //---------------------------------------------
            if(validateIsNumeric($query_id)){
                //update query
                $previous_data = getPreviousRecords('tra_application_query_reftracker', array('id' => $query_id));
                if ($previous_data['success'] == false) {
                    return \response()->json($previous_data);
                }
                $previous_data = $previous_data['results'];
                //update data 
                $update_data = array(
                    'query_remark' => $query_remark,
                    'is_structured'=>$req->is_structured,
                    'has_payment'=>$req->has_payment,
                    'reason_for_non_payment'=>$req->reason_for_non_payment,
                    'comments'=>$req->comments,
                    'query_type_id' => $query_type_id,
                    'query_txt' => $query_txt
                );

                $res = updateRecord('tra_application_query_reftracker', $previous_data, array('id' => $query_id), $update_data, $user_id);
                $res['checklist_category_id'] =  $previous_data[0]['checklist_category_id'];
            }else{
                //get query type from stage
                //check for open query 
                $records = DB::table('tra_application_query_reftracker')
                                ->where(array('application_code'=>$application_code, 'query_processstage_id'=>$query_processstage_id, 'status_id'=>1))
                                ->count();
                if($records >0){

                    $res = array('success'=>false, 'message'=>'There is an already Existing and open query, verify and close to proceed.');
                    return \response()->json($res);
                    exit();
                }
                $checklist_category_id = getStageQueryChecklistCategory($workflow_stage_id);
                /*if(!validateIsNumeric($checklist_category_id) && $is_structured ==1){
                    return \response()->json(array('success'=> false, 'message'=> 'No checklist category Found'));
                }
                */
                //generate Query Ref
                
                $query_ref = $this->generateApplicationQueryRefNo($application_code, $table_name,$query_processstage_id);
                
                $query_data = array(
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_code' => $application_code,
                    'query_remark' => $query_remark,
                    'query_txt' => $query_txt,
                    'query_ref' => $query_ref,
                    'query_processstage_id'=>$query_processstage_id,
                    'is_structured' => $is_structured,
                    'queried_on' => $queried_on,
                    'queried_by' => $queried_by,
                    'query_type_id' => $query_type_id,
                    'process_id' => $process_id,
                    'checklist_category_id' => $checklist_category_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'status_id'=>$queryref_status_id,
                    'queryref_status_id' => $queryref_status_id
                );
                
                $res = insertRecord('tra_application_query_reftracker', $query_data, $user_id);
                $res['checklist_category_id'] =  $checklist_category_id;
            }
        }catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }

        return \response()->json($res);
    }
    public function generateApplicationQueryRefNo($application_code, $table_name,$query_processstage_id){
                $counter = 1;
                $query_ref = '';
                $table_record = DB::table($table_name)
                                    ->where(array('application_code'=>$application_code))
                                    ->first();
                if($table_record){
                        $reference_no = $table_record->reference_no;
                        if($reference_no == ''){
                            $reference_no = $table_record->tracking_no;
                        }
                        $code = getSingleRecordColValue('par_query_processstages', array('id' => $query_processstage_id), 'code');

                        $counter = DB::table('tra_application_query_reftracker')
                                        ->where(array('application_code'=>$application_code, 'query_processstage_id'=>$query_processstage_id))
                                        ->count();
                        $counter = $counter +1;
                        
                        $query_ref = $reference_no.$code.'/Q'. $counter;

                }

                return $query_ref ;
    } public function checkApplicationChecklistDetails(Request $request){

        try {
                $res = $this->validateApplicationChecklistDetails($request);
            
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
        return \response()->json($res);
    
    
       }
   public function saveUnstructuredApplicationQuery(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $application_code = $post_data['application_code'];
            $checklist_querycategory_id = $post_data['checklist_querycategory_id'];
            $application_section_id = $post_data['application_section_id'];
            $query = $post_data['query'];
            $comment = $post_data['comment'];
            $query_id = $post_data['query_id'];
            $reference_id = $post_data['reference_id'];
            $reference_section = $post_data['reference_section'];
            $manager_query_comment = $post_data['manager_query_comment'];
            $manager_queryresp_comment = $post_data['manager_queryresp_comment'];

            $table_data = array(
                'application_code' => $application_code,
                'checklist_querycategory_id' => $checklist_querycategory_id,
                'application_section_id' => $application_section_id,
                'query' => $query,
                'query_id'=>$query_id,
                'comment' => $comment,
                'reference_id' => $reference_id,
                'reference_section' => $reference_section,
                'manager_query_comment' => $manager_query_comment,
                'manager_queryresp_comment' => $manager_queryresp_comment
            );
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $res = array();
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where)) {

                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
            } else {
                $table_data['created_on'] = Carbon::now();
                $table_data['created_by'] = $user_id;
                $res = insertRecord($table_name, $table_data, $user_id);
            }
            if ($res['success']) {
                $res = array(
                    'success' => true,
                    'message' => 'Query details Saved Successfully!!'
                );
            } else {
                $res = array(
                    'success' => false,
                    'message' => $res['message']
                );
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }

    public function getApplicationunstructuredqueries(Request $request)
    {
        $application_code = $request->input('application_code');
        $status = $request->input('status');
        if ($status != '') {
            $status = explode(',', $status);
        }
        try {
            $qry = DB::table('checklistitems_queries as t1')
                ->leftJoin('par_query_statuses as t2', 't1.status', '=', 't2.id')
                ->leftJoin('checklistitems_queryresponses as t3', 't1.id', '=', 't3.query_id')
                ->leftJoin('par_application_sections as t4', 't1.application_section_id', '=', 't4.id')
                ->select(DB::raw("t11.name as reference_details,t1.*,t1.created_on as queried_on, t2.name as query_status, t3.response as last_response,t4.application_section,t6.id as query_type_id, t6.name as query_type,t7.name as query_category,t5.name as queried_item, decrypt(t8.first_name) as queried_by, t10.query_ref as query_reference_no,t6.sub_module_id,t6.module_id,t6.section_id,t1.application_code, t12.response as query_response,t13.name as checklist_querycategory, t1.id as query_id"))
                ->leftJoin('par_checklist_items as t5', 't1.checklist_item_id', '=', 't5.id')
                ->leftJoin('par_checklist_types as t6', 't5.checklist_type_id', '=', 't6.id')
                ->leftJoin('par_checklist_categories as t7', 't6.checklist_category_id', '=', 't7.id')
                ->leftJoin('par_checklist_querycategories as t13', 't1.checklist_querycategory_id', '=', 't13.id')

                
                ->leftJoin('users as t8', 't1.created_by', '=', 't8.id')
                ->leftJoin('tra_queries_referencing as t9', 't1.id', '=', 't9.id')
                ->leftJoin('tra_application_query_reftracker as t10', 't9.query_ref_id', '=', 't10.id')
                ->leftJoin('par_query_guidelines_references as t11', 't1.reference_id', '=', 't11.id')
                ->leftJoin('checklistitems_queryresponses as t12', 't1.id', '=', 't12.query_id')
                ->where('t1.application_code', $application_code);
                
           // $qry->where(array('is_query' => 1));
            if (is_array($status) && count($status) > 0) {
                $qry->whereIn('status', $status);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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
        return response()->json($res);
    }

    public function checkApplicationUnstructuredQueries(Request $request)
    {
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        try {
            if ($module_id == 1) {
                $hasQueries = $this->checkChecklistBasedApplicationUnstructuredQueries($application_code);
            } else {
                $hasQueries = $this->checkChecklistBasedApplicationUnstructuredQueries($application_code);
            }
            $res = array(
                'success' => true,
                'hasQueries' => $hasQueries
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
        return \response()->json($res);
    }

    public function checkChecklistBasedApplicationUnstructuredQueries($application_code)
    {
        $hasQueries = 0;
        $qry = DB::table('checklistitems_queries as t3')
            ->where('application_code', $application_code)
            ->whereIn('t3.status', array(1, 3));

        $queriesCount = $qry->count();
        if ($queriesCount > 0) {
            $hasQueries = 1;
        }
        return $hasQueries;
    }

     public function closeApplicationQuery(Request $request)
    {
        $query_id = $request->input('query_id');
        $query_ref_id = $request->input('query_ref_id');
        $item_resp_id = $request->input('item_resp_id');
        $user_id = $this->user_id;
        $table_name = 'checklistitems_queries';
        
            $where = array(
                'id' => $query_id
            );

        
        $table_data = array(
            'status' => 4
        );
        try {
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == true) {
                $previous_data = $prev_data['results'];
                $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                //update the query ref tracker status
                if(validateIsNumeric(($query_ref_id))){
                    DB::table('tra_application_query_reftracker')
                    ->where('id', $query_id)
                    ->update(array('status_id' => 4));
                }
               
            } else {
                $res = $prev_data;
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    
    
    public function appDataAmmendmentStatusUpdate(Request $request)
    {
        $record_id = $request->input('record_id');
        $status_id = $request->input('status_id');
        $user_id = $this->user_id;
        $table_name = 'tra_appsections_ammendments';
        $where = array(
            'id' => $record_id
        );
        $table_data = array(
            'status_id' => $status_id
        );
        try {
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == true) {
                $previous_data = $prev_data['results'];
                $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
               
            } else {
                $res = $prev_data;
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
        return \response()->json($res);
    }
    public function saveApplicationReQueryDetails(Request $request)
    {
        $query_id = $request->input('id');
        $comment = $request->input('comment');
        $item_resp_id = $request->input('item_resp_id');
        $user_id = $this->user_id;
        $table_name = 'checklistitems_queries';
        $where = array(
            'id' => $query_id
        );
        $table_data = array(
            'status' => 3,
            'comment' => $comment
        );
        try {
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == true) {
                $previous_data = $prev_data['results'];
                $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                DB::table('checklistitems_responses')
                    ->where('id', $item_resp_id)
                    ->update(array('pass_status' => 2));
            } else {
                $res = $prev_data;
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
        return \response()->json($res);
    }
    public function getApplicationDetailsAlterationSetup(Request $req){
        $application_code  = $req->application_code;
        $appdata_ammendementrequest_id  = $req->appdata_ammendementrequest_id;
        $data = array();

        try {
            $records  = DB::table('tra_appsections_ammendments as t1')
                            ->join('par_alteration_setup as t2', 't1.part_id', 't2.id')
                            ->select('t1.*', 't2.panel_item_id')
                            ->where(array('t1.appdata_ammendementrequest_id'=>$appdata_ammendementrequest_id, 'application_code'=>$application_code))
                            ->get();

            $res = array('success'=>true, 
                         'ammendementrequests'=> $records,
                          'message'=>''
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
        return \response()->json($res);

    }
     public function checkPrecheckingrecommendation(Request $req){
        try {
                $application_code = $req->application_code;
                $record = DB::table('tra_prechecking_recommendations')->where('application_code',$application_code)->first();
                if($record){
                    $res = array('success'=>true, 'message'=>'Prechecking Recommendation has been filled successfully');
                }
                else{
                    $res = array('success'=>false, 'message'=>'Prechecking Recommendation not filled successfully');
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
        return \response()->json($res);
    }

    public function getPermitReleaseRecommendationDetails(Request $req){

            $application_code = $req->input('application_code');
            try {
            $where = array(
            't1.application_code' => $application_code
            );
            $qry = DB::table('tra_permitsrelease_recommendation as t1')
            ->select('t1.*', 't1.id as recommendation_id')
            ->where($where)
            ->orderBy('t1.id', 'DESC');
            $results = $qry->first();
            $res = array(
            'success' => true,
            'results' => $results,
            'message' => 'All is well'
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
            return \response()->json($res);


}
public function getUploadedApplicationPaymentDetails(Request $req){
        
        try {
            $application_code  = $req->application_code;
           $data = array();

            $records = DB::table('tra_uploadedpayments_details as t1')
                ->leftJoin('tra_application_uploadeddocuments as t2', 't1.document_upload_id','t2.id')
                ->leftJoin('par_currencies as t3', 't1.currency_id','t3.id')
                ->leftJoin('par_payment_modes as t4', 't1.payment_mode_id','t4.id')
                ->select('t1.*', 't2.*', 't3.name as currency', 't4.name as payment_mode')
                ->where(array('t1.application_code'=>$application_code))
                ->get();

            $res = array('success'=>true, 
                         'results'=> $records,
                          'message'=>''
                         );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);

    }

    public function checkReviewREcommendationDEtails(Request $req){
        try {
                
                $res = $this->validateRequiredApplicationDetails('tra_managerpermits_review', $req->application_code, 'Manager Review Recommendation not filled successfully');


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function checkIfHasGeneratedInvoiceDEtails(Request $req){
        try {
                $sub_module_id = $req->sub_module_id;
                $has_invoice_generation = 1;
                if(validateIsNumeric($sub_module_id)){
                    $has_invoice_generation = getSingleRecordColValue('sub_modules', array('id'=>$sub_module_id), 'has_invoice_generation');
           
                }
                if($has_invoice_generation ==1){
                    $res = $this->validateRequiredApplicationDetails('tra_application_invoices', $req->application_code, 'Generate Application invoice to proceed.');
                    if($res['success']){
                        $record = DB::table('tra_uploadedpayments_details')->where('application_code',$req->application_code)->first();
                        if($record){
                             $res = array('success'=>true, 'hasValidatedChecklist'=>true, 'message'=>'');
                            
                        }
                        else{
                            $res = array('success'=>true,'hasValidatedChecklist'=>true,  'message'=>'Upload the Proof of Payment');
                        }
                    }
                    return $res;
                }
                else{
                    $res = array('success'=>true, 'hasValidatedChecklist'=>true, 'message'=>'');
           
                }
                

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function validateHasImportExportProductDetils(Request $req){
        try {
                $res = $this->validateRequiredApplicationDetails('tra_permits_products', $req->application_code, 'Enter the Import/Export Product Details to proceed');


        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    public function validateHasUploadedDocumentsDetils(Request $req){
        try {
               
        $record = DB::table('tra_application_uploadeddocuments')->where('application_code',$req->application_code)->first();
        $title = "Upload the Required Documents";
        if($record){
            $res = array('success'=>true, 'hasValidatedChecklist'=>true, 'message'=>'');
           
        }
        else{
            if($req->sub_module_id ==71){
                 $res = array('success'=>true, 'hasValidatedChecklist'=>true, 'message'=>'');
            }
            else{
                
            $res = array('success'=>false, 'message'=>$title);
            }
        }
        
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    
}
