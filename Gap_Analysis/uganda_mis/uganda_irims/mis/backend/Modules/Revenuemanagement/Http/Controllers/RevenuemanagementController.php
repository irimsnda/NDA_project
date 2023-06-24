<?php

namespace Modules\Revenuemanagement\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class RevenuemanagementController extends Controller
{
    protected $user_id;

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
        
    }
    public function getBatchApplicationInvoicesDetails (){
    $resp = array('success'=>true);
         return \response()->json($resp);
    
    }
    public function reportsInvoicesToGepg(Request $req){
        
        
        try{
            $invoice_no =$req->invoice_no;
            $record = DB::table('tra_application_invoices as t1')
                        ->join('tra_invoice_details as t2', 't1.id','t2.invoice_id')
                        ->select('t1.id', 't1.application_code','t2.paying_currency_id', 't2.paying_exchange_rate', 't1.zone_id')
                        ->where('t1.invoice_no',$invoice_no)
                        ->first();
            if($record){
                $invoice_id = $record->id;
                $application_code = $record->application_code;
                $paying_currency_id = $record->paying_currency_id;
                $paying_exchange_rate = $record->paying_exchange_rate;
                $user_id = 499;
                $zone_id = $record->zone_id;
                //check if it exists 
                $check_record= DB::connection('financial_db')
                                    ->table('sys_application_invoices')
                                    ->where('invoice_no',$invoice_no)
                                    ->count();
                            
                        if($check_record ==0){
                             $res =saveSingleInvoiceDetailstoIntergration($invoice_id,$application_code,$paying_currency_id,$paying_exchange_rate,$user_id,$zone_id);
                        }   
                        else {
                            $res = array(
                                            'success' => false,
                                            'message' => 'Invoice has been already submitted and mapped'
                                        );
                        }                       
                
                
            }
            else{
                $res = array(
                    'success' => false,
                    'message' => 'Invoice Not Found'
                );
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
    public function getApplicationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $submodule_code = getSingleRecordColValue('sub_modules', array('id' => $application_details->sub_module_id), 'code');
        
        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'submodule_code' => $submodule_code
        );  
              
        return $codes_array;
    }
    public function getGepgbillinvoicepostingdetails(Request $req)
    {
        try {
            $filter = $req->input('filter');
            $start = $req->input('start');
            $limit = $req->input('limit');
            $invoice_from = $req->input('invoice_from');
            $invoice_to = $req->input('invoice_to');
            $whereClauses = array();
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'invoice_no' :
                                $whereClauses[] = "t1.invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'tracking_no' :
                                $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'PayCntrNum' :
                                $whereClauses[] = "t1.PayCntrNum like '%" . ($filter->value) . "%'";
                                break;
                            
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
            $where_filterdates = '';
            if( $invoice_from != '' &&  $invoice_to != ''){
                $invoice_from = formatDate($invoice_from);
                $invoice_to = formatDate($invoice_to);
                $where_filterdates  = " date_of_invoicing BETWEEN '".$invoice_from."' and  '".$invoice_to."'";
            }
           $qry = DB::table('tra_application_invoices as t1')
                            ->join('tra_invoice_details as t2', 't1.id','=','t2.invoice_id')
                            ->select(DB::raw("t1.id as invoice_id,t1.module_id, invoice_no, SUM(t2.total_element_amount) AS invoice_amount,PayCntrNum,t1.paying_exchange_rate as  exchange_rate,t3.name AS  applicant_name,gepgsubmission_status_id , t4.name as gepg_submissionstatus,t1.date_of_invoicing, tracking_no, reference_no,application_id, application_code, (SUM(t2.total_element_amount) *t1.paying_exchange_rate) as invoice_amounttshs,t5.name as currency_name"))
                            ->join('wb_trader_account as t3', 't1.applicant_id', '=','t3.id')
                            ->leftJoin('par_gepg_submissionstatuses as t4', 't1.gepgsubmission_status_id', '=','t4.id')
                            ->leftJoin('par_currencies as t5', 't1.paying_currency_id', '=','t5.id')
                            ->orderBy('t1.id','desc')
                            ->groupBy('t1.id');

                            if ($filter_string != '') {
                                $qry->whereRAW($filter_string);
                            }
                            if ($where_filterdates != '') {
                                $qry->whereRAW($where_filterdates);
                            }
                            $count = $qry->get()->count();
                            $records = $qry->skip($start)->take($limit)->get();

                

            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
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
    
    public function getApplicationInvoicesDetails(Request $req)
    {
        try {
            $filter = $req->input('filter');
            $start = $req->input('start');
            $limit = $req->input('limit');
            $invoice_from = $req->input('invoice_from');
            $invoice_to = $req->input('invoice_to');
            $whereClauses = array();
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'invoice_no' :
                                $whereClauses[] = "t1.invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'tracking_no' :
                                $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'PayCntrNum' :
                                $whereClauses[] = "t1.PayCntrNum like '%" . ($filter->value) . "%'";
                                break;
                                 case 'applicant_name' :
                                $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                break;
                            
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
            $where_filterdates = '';
            if( $invoice_from != '' &&  $invoice_to != ''){
                $invoice_from = formatDate($invoice_from);
                $invoice_to = formatDate($invoice_to);
                $where_filterdates  = " date_of_invoicing BETWEEN '".$invoice_from."' and  '".$invoice_to."'";
            }
            DB::enableQueryLog();
             $qry_count = DB::table('tra_application_invoices as t1')
                        ->join('tra_invoice_details as t2', 't1.id','=','t2.invoice_id')
                        ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=','t3.id')
                        ->select(DB::raw("count(t1.id) as data_count"));
           $qry = DB::table('tra_application_invoices as t1')
                            ->join('tra_invoice_details as t2', 't1.id','=','t2.invoice_id')
                            ->select(DB::raw("t1.id as invoice_id,t1.module_id, t1.application_code as active_application_code, t1.module_id, t1.invoice_no, SUM(t2.total_element_amount) AS invoice_amount,PayCntrNum,t2.paying_exchange_rate as  exchange_rate,t3.name AS  applicant_name, t1.date_of_invoicing, tracking_no, reference_no,application_id, application_code, (SUM(t2.total_element_amount) *t2.paying_exchange_rate) as invoice_amounttshs,t5.name as currency_name, ((SUM(t2.total_element_amount) *t2.paying_exchange_rate) - (select IFNULL(sum(q.amount_paid * q.exchange_rate),0) from tra_payments q where q.application_code = t1.application_code)) as credit_note_amount"))
                            ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=','t3.id')
                            ->leftJoin('par_currencies as t5', 't1.paying_currency_id', '=','t5.id')
                            ->groupBy('t1.id')
                            ->orderBy('t1.id','desc');
                            
                            if ($filter_string != '') {
                                $qry->whereRAW($filter_string);
                                $qry_count->whereRAW($filter_string);
                            }
                           
                            $records = $qry->skip($start)->take($limit)->get();
                            
                             $count = $qry_count->first()->data_count;
                         
//invoice_no
                          
            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
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

    
    // Invoices
    
    public function getPaymentspostingdetails(Request $req)
    {
        try {
            $receipt_id = $req->input('receipt_id');
            $invoice_id = $req->input('invoice_id');
           
           $qry = DB::table('tra_payments as t1')
                            ->select(DB::raw("t6.name as module_name,t1.invoice_id, t1.application_code as active_application_code,t1.id as receipt_id,  t7.name as sub_modulename, t1.id as payment_id,t1.receipt_no,t4.invoice_no, t1.module_id, t4.invoice_no, t1.amount_paid,t1.PayCtrNum,t1.exchange_rate,t3.name AS  applicant_name,t1.trans_date, t1.tracking_no,t1.reference_no,t1.application_id, t1.application_code, (amount_paid *t1.exchange_rate) as amount_paidtshs,payment_ref_no, t5.name as currency_name"))
                            ->join('wb_trader_account as t3', 't1.applicant_id', '=','t3.id')
                            ->leftJoin('tra_application_invoices as t4', 't1.invoice_id', '=','t4.id')
                            ->leftJoin('par_currencies as t5', 't1.currency_id', '=','t5.id')
                            ->leftJoin('modules as t6', 't1.module_id', '=','t6.id')
                            ->leftJoin('sub_modules as t7', 't1.module_id', '=','t7.id')
                            ->where(array('t1.id'=>$receipt_id))
                            ->orWhere(array('t1.invoice_id'=>$invoice_id));
        $records = $qry->get();
            $res = array(
                'success' => true,
                'results' => $records,
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
    
    public function getGepgbillPaymentspostingdetails(Request $req)
    {
        try {
            $filter = $req->input('filter');
            $start = $req->input('start');
            $limit = $req->input('limit');
            $paid_fromdate  = $req->input('paid_fromdate');
            $paid_todate = $req->input('paid_todate');
            $whereClauses = array();
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'invoice_no' :
                                $whereClauses[] = "t1.invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'tracking_no' :
                                $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'PayCtrNum' :
                                $whereClauses[] = "t1.PayCtrNum like '%" . ($filter->value) . "%'";
                                break;
                                case 'receipt_no' :
                                $whereClauses[] = "t1.receipt_no like '%" . ($filter->value) . "%'";
                                break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
            $where_filterdates = '';
            if( $paid_fromdate != '' &&  $paid_todate != ''){
                $paid_fromdate = formatDate($paid_fromdate);
                $paid_todate = formatDate($paid_todate);
                $where_filterdates  = " trans_date BETWEEN '".$paid_fromdate."' and  '".$paid_todate."'";
            }if ($where_filterdates != '') {
                $qry->whereRAW($where_filterdates);
            }
           $qry = DB::table('tra_payments as t1')
                            ->select(DB::raw("t6.name as module_name,t1.invoice_id, t1.application_code as active_application_code,t1.id as receipt_id,  t7.name as sub_modulename, t1.id as payment_id,t1.receipt_no,t4.invoice_no, t1.module_id, t4.invoice_no, t1.amount_paid,t1.PayCtrNum,t1.exchange_rate,t3.name AS  applicant_name,t1.trans_date, t1.tracking_no,t1.reference_no,t1.application_id, t1.application_code, (amount_paid *t1.exchange_rate) as amount_paidtshs,payment_ref_no, t5.name as currency_name"))
                            ->join('wb_trader_account as t3', 't1.applicant_id', '=','t3.id')
                            ->leftJoin('tra_application_invoices as t4', 't1.invoice_id', '=','t4.id')
                            ->leftJoin('par_currencies as t5', 't1.currency_id', '=','t5.id')
                            ->leftJoin('modules as t6', 't1.module_id', '=','t6.id')
                            ->leftJoin('sub_modules as t7', 't1.module_id', '=','t7.id');

                            if ($filter_string != '') {
                                $qry->whereRAW($filter_string);
                            }
                            $count = $qry->get()->count();
                            $records = $qry->skip($start)->take($limit)->get();

                

            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
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
    
    
       public function getReversedRequestsApplicationInvoices(Request $request)
       {
           $module_id = $request->input('module_id');
           $user_id = $this->user_id;
           $assigned_groups = getUserGroups($user_id);
           $is_super = belongsToSuperGroup($assigned_groups);

           try {
               $assigned_stages = getAssignedProcessStages($user_id, $module_id);
               $qry = DB::table('tra_invoicecancellation_requests as t1')
                   ->join('tra_submissions as t7', function ($join) {
                        $join->on('t1.application_code', '=', 't7.application_code')
                            ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                    })
                   ->leftJoin('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                   ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                   ->join('users as t8', 't8.id', '=', 't1.requested_by_id')
                   ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                   ->select(DB::raw("t7.date_received,t7.tracking_no,t1.id as cancellation_id, t7.reference_no, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_by,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user, t7.process_id,  t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, 
                     t4.name as process_name, t5.name as workflow_stage, t5.is_general, 
                       t1.*"));

              $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);

               $qry->where('t7.isDone', 0);
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
       
       public function getPaymentsReversalRequestApplications(Request $request)
       {
           $module_id = $request->input('module_id');
           $user_id = $this->user_id;
           $assigned_groups = getUserGroups($user_id);
           $is_super = belongsToSuperGroup($assigned_groups);

           try {
               $assigned_stages = getAssignedProcessStages($user_id, $module_id);
               $qry = DB::table('tra_paymentreversal_requests as t1')
                   ->join('tra_submissions as t7', function ($join) {
                        $join->on('t1.application_code', '=', 't7.application_code')
                             ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                    })
                   ->leftJoin('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                   ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                   ->join('users as t8', 't8.id', '=', 't1.requested_by_id')
                   ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                   ->select(DB::raw("t7.date_received,t7.tracking_no,t1.id as cancellation_id, t7.reference_no, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_by,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user, t1.process_id,  t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, 
                     t4.name as process_name, t5.name as workflow_stage, t5.is_general, 
                       t1.*"));

              $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);

               $qry->where('t7.isDone', 0);
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
       
       public function getWavePaymentManagementDashDetails(Request $request)
       {
           $module_id = $request->input('module_id');
           $user_id = $this->user_id;
           $assigned_groups = getUserGroups($user_id);
           $is_super = belongsToSuperGroup($assigned_groups);

           try {
               $assigned_stages = getAssignedProcessStages($user_id, $module_id);
               $qry = DB::table('tra_paymentcreditnote_requests as t1')
                   ->join('tra_submissions as t7', function ($join) {
                        $join->on('t1.application_code', '=', 't7.application_code')
                             ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                    })
                   ->leftJoin('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                   ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                   ->join('users as t8', 't8.id', '=', 't1.requested_by_id')
                   ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                   ->select(DB::raw("t7.date_received,t7.tracking_no,t1.id as cancellation_id, t7.reference_no, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_by,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user, t1.process_id,  t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, 
                     t4.name as process_name, t5.name as workflow_stage, t5.is_general, 
                       t1.*"));

              $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);

               $qry->where('t7.isDone', 0);
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
    
        public function prepareCancellationREquestDetails(Request $request)
       {
        $application_code = $request->input('application_code');
           $cancellation_id = $request->input('cancellation_id');
           $table_name = $request->input('table_name');
           try {

               $qry = DB::table($table_name.' as t1')
                   ->leftJoin('users as t8', 't8.id', '=', 't1.requested_by_id')
                   ->select(DB::raw("t1.id as cancellation_id,  CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_by, t1.application_code, 
                       t1.*"))
                       ->where(array('t1.application_code'=>$application_code));

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
       public function prepareInspectionatownerpremreceiving(Request $request)
       {
           $application_code = $request->input('application_code');
           $table_name = $request->input('table_name');
           try {
               $qry = DB::table($table_name.' as t1')
                       ->leftJoin('par_system_statuses as q', 't1.application_status_id','=','q.id')
                       ->leftJoin('tra_application_invoices as t5', function ($join) use ($application_code) {
                            $join->on('t1.id', '=', 't5.application_id')
                                ->on('t5.application_code', '=','t1.application_code');
                        })
                       ->where('t1.application_code',$application_code);
                       $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                       ->select('t1.*','q.name as application_status', 't1.id as active_application_id',
                           't3.name as applicant_name', 't3.contact_person','t5.paying_currency_id', 't5.paying_currency_id as apppaying_currency_id', 't5.id as invoice_id', 't5.invoice_no','t5.isLocked',
                           't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                           't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website'
                           );
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
       
       public function approveInvoiceCancellationRequest(REquest $request){
        $cancellation_id = $request->input('cancellation_id');
        $application_code = $request->input('application_code');

        try {
            $rec = DB::table('tra_invoicecancellation_requests as t1')
                                   ->where(array('id'=>$cancellation_id,'application_code'=>$application_code))
                                   ->first();
            if($rec){
                    $invoice_id = $rec->invoice_id;
                    $where_invoice = array('id'=>$invoice_id,'application_code'=>$application_code);
                
                    $invoice_rec = DB::table('tra_application_invoices as t1')
                    ->select(DB::raw("id,invoice_no,prepared_by,tracking_no,reference_no,receipt_no,PayCntrNum,application_id,application_code,module_id,sub_module_id,section_id,date_of_invoicing,fob,invoice_amount,paying_exchange_rate,paying_currency_id"))
                    ->where($where_invoice)
                    ->first();
                    //check if there is any ayment made 
                    $where_payment = array('invoice_id'=>$invoice_id,'application_code'=>$application_code);
                
                    $payment_record = DB::table('tra_payments')->where($where_payment)->count();
                    if($payment_record >0){
                        $res = array('success'=>false,
                        'message'=>'Payment for the said Invoice has already been effected, cancell payments and then invoices');
                        
                         return \response()->json($res);
                    }
                    
                    $cancelled_invoicedata = convertStdClassObjToArray($invoice_rec);
                    
                    $insert_res = insertRecord('tra_application_invoicescancellation', $cancelled_invoicedata, $this->user_id);
                    
                    $previous_data = getPreviousRecords('tra_application_invoices',$where_invoice );
                    $previous_data = $previous_data['results'];
                    $res= deleteRecord('tra_application_invoices', $previous_data, $where_invoice, $this->user_id);
                    $where_invoice = array('invoice_id'=>$invoice_id);

                    // $previous_data = getPreviousRecords('tra_invoice_details',$where_invoice );
                     // $previous_data = $previous_data['results'];
                   // deleteRecord('tra_invoice_details', $previous_data, $where_invoice, $this->user_id);
                    
                    DB::table('tra_batch_invoiceapp_details')->where(array('batch_invoice_id'=>$invoice_id))->delete();
                    DB::table('tra_batch_invoices_records')->where(array('batch_invoice_id'=>$invoice_id))->delete();

                    // Update the cancellation details 
                    $data = array('approved_on'=>Carbon::now(),
                                'approved_by_id'=>$this->user_id,
                                'altered_by'=>$this->user_id,
                                'workflow_stage_id'=>0,
                                'dola'=>Carbon::now());
                    DB::table('tra_invoicecancellation_requests')->where(array('id'=>$cancellation_id,'application_code'=>$application_code))->update($data);
                    
                        //close and disable the invoices 
                        $where = array('application_id'=>$cancellation_id, 'application_code'=>$application_code);
                        $data = array('isDone'=>1,'date_released'=>Carbon::now(), 'altered_by'=>$this->user_id, 'dola'=>Carbon::now());
                        DB::table('tra_submissions')->where($where)->update($data );
                        $res = array('success'=>true,'message'=>'The Invoice Has been cancelled Successfully');

                    
            }
            else{

                $res = array('success'=>false,'message'=>'The Invoice Cancellation DEtails Not Found');

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
       public function approvePaymentCancellationRequest(REquest $request){
        $cancellation_id = $request->input('cancellation_id');
        $application_code = $request->input('application_code');
        $table_name = 'tra_paymentreversal_requests';
        try {
            $rec = DB::table($table_name .'  as t1')
                                   ->where(array('id'=>$cancellation_id,'application_code'=>$application_code))
                                   ->first();
            if($rec){
                    $receipt_id = $rec->receipt_id;
                    $where_payment = array('id'=>$receipt_id,'application_code'=>$application_code);

                    $payment_rec = DB::table('tra_payments as t1')
                                        ->where($where_payment)
                                        ->first();
                    $cancelled_paymentdata = convertStdClassObjToArray($payment_rec);
                    
                    $insert_res = insertRecord('tra_payments_reversals', $cancelled_paymentdata, $this->user_id);
                    //delete from payment 
                    $previous_data = getPreviousRecords('tra_payments',$where_payment );
                    $previous_data = $previous_data['results'];
                     deleteRecord('tra_payments', $previous_data, $where_payment, $this->user_id);

                    // Update the cancellation details 
                    $data = array('approved_on'=>Carbon::now(),
                                'approved_by_id'=>$this->user_id,
                                'altered_by'=>$this->user_id,
                                'workflow_stage_id'=>0,
                                'dola'=>Carbon::now());
                    DB::table($table_name )->where(array('id'=>$cancellation_id,'application_code'=>$application_code))->update($data);
                    
                    //close and disable the invoices 
                        $where = array('application_id'=>$cancellation_id, 'application_code'=>$application_code);
                        $data = array('isDone'=>1,'date_released'=>Carbon::now(), 'altered_by'=>$this->user_id, 'dola'=>Carbon::now());
                        DB::table('tra_submissions')->where($where)->update($data );
                    $res = array('success'=>true,'message'=>'The Payment Has been reversed Successfully');
            }
            else{

                $res = array('success'=>false,'message'=>'The Invoice Cancellation DEtails Not Found');

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
       public function approveCreditNoteRequest(Request $request){
        $cancellation_id = $request->input('cancellation_id');
        $application_code = $request->input('application_code');
        $table_name = 'tra_paymentcreditnote_requests';
        $user_id = $this->user_id;
        try {
            $rec = DB::table($table_name .'  as t1')
                ->join('tra_application_invoices as t2', 't1.invoice_id','=','t2.id')
                ->select('t1.*', 't2.*', 't1.currency_id as creditnote_currency_id','t1.exchange_rate as creditnote_exchange_rate')
                ->where(array('t1.application_code'=>$application_code))
                 ->first();
            if($rec){
                $invoice_id = $rec->invoice_id;

                $receipt_no = '102'.generateReceiptNo($user_id);
               if($rec->creditnote_currency_id == 4){
                   $exchange_rate = 1;
               }
               else{
                   $exchange_rate =  $rec->creditnote_exchange_rate;
               }
                $params = array(
                    'application_id' => $rec->application_id,
                    'application_code' => $rec->application_code,
                    'applicant_name' => $rec->applicant_name,
                    'amount_paid' => $rec->credit_note_amount,
                    'invoice_id' => $invoice_id,
                    'receipt_no' => $receipt_no,
                    'trans_date' => Carbon::now(),
                    'currency_id' => $rec->creditnote_currency_id,
                    'applicant_id' => $rec->applicant_id,
                    'section_id' => $rec->section_id,
                    'module_id' => $rec->module_id,
                    'payment_type_id'=>3,
                    'sub_module_id' => $rec->sub_module_id,
                    'exchange_rate' =>  $exchange_rate,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
        
                $res = insertRecord('tra_payments', $params, $user_id);
                $credit_note_id = $res['record_id'];

                $data = array('approved_on'=>Carbon::now(),
                            'approved_by_id'=>$this->user_id,
                            'altered_by'=>$this->user_id,
                            'credit_note_id'=>$credit_note_id,
                            'workflow_stage_id'=>0,
                            'dola'=>Carbon::now());
                DB::table($table_name )->where(array('id'=>$cancellation_id,'application_code'=>$application_code))->update($data);
                //close and disable the invoices 
                        $where = array('application_id'=>$cancellation_id, 'application_code'=>$application_code);
                        $data = array('isDone'=>1,'date_released'=>Carbon::now(), 'altered_by'=>$this->user_id, 'dola'=>Carbon::now());
                        DB::table('tra_submissions')->where($where)->update($data );
                $res = array('success'=>true,'message'=>'Credit Note Has been Raised Successfully');

            }else{

                $res  = array('success'=>false,'message'=> 'Credit Not Details Note Saved, contact the system admin!!!');
            }
           
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'data'=>$res,
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
       /*
       permitapplication_code: permitapplication_code,
       sub_module_id: sub_module_id,
       module_id: module_id,
       section_id: section_id,
       applicant_id: applicant_id

       */

     public function  saveInspectionAtOwnersPremises(Request $req){
        $data = array(
            'application_code' => $req->application_code,
            'permitapplication_code' => $req->permitapplication_code,
            'applicant_id' => $req->applicant_id,
            'sub_module_id' => $req->sub_module_id,
            'section_id' => $req->section_id,
            'zone_id' => $req->zone_id,
            'process_id' => $req->process_id,
            'module_id' => $req->module_id,
            'workflow_stage_id' => $req->workflow_stage_id,
            'date_added' => Carbon::now(),
            'application_status_id'=>1
        );
       
       $res = $this->funcSaveAdhocApplication($req,$data);
        return \response()->json($res);

     }
     function funcSaveAdhocApplication($req,$data){
        $table_name = 'tra_adhocinvoices_applications';
        $user_id = $this->user_id;
        try {
            $application_code = $req->input('application_code');
            $tracking_no = $req->input('tracking_no');
            $application_id = $req->active_application_id;
            $sub_module_id = $req->sub_module_id;
            $module_id = $req->module_id;
            $workflow_stage_id = $req->workflow_stage_id;
            $tracking_no = $req->tracking_no;
            
            $where = array('application_code'=>$application_code,'id'=>$application_id);

            $rec = DB::table($table_name .'  as t1')
                ->select('t1.*')
                ->where($where)
                 ->first();
                
            if($rec){
                $previous_data = getPreviousRecords($table_name, $where);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }

                $previous_data = $previous_data['results'];
                $res = updateRecord($table_name, $previous_data, $where, $data, $this->user_id);
                
            }else{
                $application_code = generateApplicationCode($sub_module_id, $table_name);
                $view_id = generateApplicationViewID();
                
                $codes_array = $this->getApplicationReferenceCodes($req);

                $zone_code = getSingleRecordColValue('par_zones', array('id' => $req->zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $req->section_id), 'code');
                $submodule_code = getSingleRecordColValue('sub_modules', array('id' => $req->sub_module_id), 'code');
                
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
                    'submodule_code' => $submodule_code
                );  
                $view_id = generateApplicationViewID();
                //$ref_number = generatePremiseRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
                $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $req->process_id, $req->zone_id, $user_id);

                if ($tracking_details['success'] == false) {
                    return \response()->json($tracking_details);
                }
                $tracking_no = $tracking_details['tracking_no'];

                $data['view_id'] = $view_id;
                $data['application_code'] = $application_code;
                $data['tracking_no'] = $tracking_no;
                $data['reference_no'] = $tracking_no;
                $data['refno_generated'] = 1;
                $data['workflow_stage_id'] = $workflow_stage_id;
                $res = insertRecord($table_name, $data, $this->user_id);
                //save the Submission datasets 
                $application_id = $res['record_id'];
                $submission_params = array(
                        'application_id' => $application_id,
                        'process_id' => $req->process_id,
                        'application_code' => $application_code,
                        'tracking_no' => $tracking_no,
                        'reference_no' => $tracking_no,
                        'usr_from' => $this->user_id,
                        'usr_to' => $this->user_id,
                        'previous_stage' => $workflow_stage_id,
                        'current_stage' => $workflow_stage_id,
                        'module_id' => $req->module_id,
                        'sub_module_id' => $req->sub_module_id,
                        'section_id' => $req->section_id,
                        'application_status_id' => 1,
                        'urgency' => 1,
                        'applicant_id' => $req->applicant_id,
                        'remarks' => 'Inital Submission',
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $this->user_id
                    );
                    DB::table('tra_submissions')
                    ->insert($submission_params);
                        
               

            }
            if($res['success']){
                    $res = array('success'=>true, 'message'=>'Adhoc Application Saved successfully', 'tracking_no'=>$tracking_no,'active_application_id'=>$application_id, 'application_code'=>$application_code);

            }
            else{

                $res = array('success'=>false, 'message'=>'Error Occured, application not saved successfully!!');
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
       
      public function funcOnFetchCurrencyExchangeRate(Request $req){
        try {
            $currency_id = $req->currency_id;

            $rec = DB::table('par_exchange_rates')
                                   ->where(array('currency_id'=>$currency_id))
                                   ->first();
            if($rec){
                $exchange_rate = $rec->exchange_rate;

                $res = array('success'=>true, 'exchange_rate'=>$exchange_rate);
            }else{
                $res = array('success'=>false, 'exchange_rate'=>'');
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
      //adhoc invoices 
      
      public function getAdhocInvoicingApplicationsDetails(Request $request)
      {
          $module_id = $request->input('module_id');
          $user_id = $this->user_id;
          $assigned_groups = getUserGroups($user_id);
          $is_super = belongsToSuperGroup($assigned_groups);

          try {
              $assigned_stages = getAssignedProcessStages($user_id, $module_id);

              $qry = DB::table('tra_adhocinvoices_applications as t1')
                  ->join('tra_submissions as t7', function ($join) {
                       $join->on('t1.application_code', '=', 't7.application_code')
                            ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                   })
                  ->leftJoin('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                  ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                  ->join('users as t8', 't8.id', '=', 't7.usr_from')
                  ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                  ->leftJoin('modules as t10', 't1.module_id', '=', 't10.id')
                  ->leftJoin('sub_modules as t11', 't1.sub_module_id', '=', 't11.id')
                  
                  ->select(DB::raw("t7.date_received,t7.tracking_no,t1.id as active_application_id, t7.reference_no, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_by,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user, t1.process_id,  t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, 
                    t4.name as process_name, t5.name as workflow_stage, t5.is_general, t10.name as module_name, t11.name as sub_module,
                      t1.*"));

             $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);

              $qry->where('t7.isDone', 0);
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

      
    public function prepareadhocinvoicingreceiptingpnl(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
                ->select(DB::raw("t1.applicant_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                t1.section_id,t1.module_id"))
                ->where('t1.id', $application_id);
                
            $results = $qry->first();
            $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $results->invoice_id);
            $res = array(
                'success' => true,
                'results' => $results,
                'balance' => formatMoney($payment_details['running_balance']),
                'invoice_amount' => formatMoney($payment_details['invoice_amount']),
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
    function getCostSubaegory($cost_category_id, $product_type,$fee_type_id){
            $rec = DB::table('par_cost_sub_categories as t1')
                        ->where(array('cost_category_id'=>$cost_category_id))
                        ->where('t1.name', 'like', '%' . $product_type . '%')
                        ->first();
            
        return $rec;
        
    }
    function getElementCosts($element_id, $cost_category_id,$cost_subcategory_id,$fee_type_id){
        $rec = DB::table('element_costs as t1')
                        ->where(array('element_id'=>$element_id,'sub_cat_id'=>$cost_subcategory_id,'feetype_id'=>$fee_type_id))
                        ->first();
        
        return $rec;
        
    }
    public function getApplicationInvoiceDetails(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        $has_queries = $request->input('has_queries');
        $status_type_id = $request->input('status_type_id');
        $application_code = $request->input('application_code');
        $where = array(
            't1.module_id' => $module_id,
            't1.sub_module_id' => $sub_module_id,
            't1.section_id' => $section_id
        );
        try {
            
            $qry = DB::table('wf_tfdaprocesses as t1');
        
                $qry->join('wf_workflow_stages as t2', function ($join) {
                    $join->on('t2.workflow_id', '=', 't1.workflow_id')
                        ->on('t2.is_portalapp_initialstage', '=', DB::raw(1));
                });
            
            $qry->select('t1.id as processId', 't2.id as currentStageId', 't1.name as processName', 't2.name as currentStageName',
                't1.module_id', 't1.sub_module_id', 't1.section_id')
                ->where($where);

            $results = $qry->first();


            $table_name = getPortalApplicationsTable($module_id);
            $app_data = getSingleRecord($table_name,array('application_code'=>$application_code),'portal_db');
            $is_fast_track = $app_data->is_fast_track;
            $paying_currency_id = $app_data->paying_currency_id;
            $section_id = $app_data->section_id;
            $cost_category_id = 0;
                    $cost_subcategory_id = 0;
                    $element_costs_id = 0;
                    $element_costs_id = 0;

                if($module_id == 1){
                    $rec = DB::connection('portal_db')->table($table_name. ' as t1')
                    ->join('wb_product_information as t2','t1.product_id', '=','t2.id')
                    ->select('t1.*', 't2.*')
                    ->where('application_code',$application_code)
                    ->first();
                    //variables
                    $product_type_id = $rec->product_type_id;
                    $section_id = $rec->section_id;
                    $product_category_id = $rec->product_category_id;
                    $sub_module_id = $rec->sub_module_id;
                    $classification_id = $rec->classification_id;
                    
                    $fee_type_id = 2;
                    if($section_id==2){
                        
                        $cost_category = getSingleRecord('par_product_categories',array('id'=>$product_category_id),'');
                       
                        if($cost_category){
                        //    $cost_category_id = $cost_category->cost_category_id;
                        $cost_category_id = 158;
                        }
                        else{
                            $cost_category_id = 158;
                        }
                        if($product_type_id == 1){
                            $product_type = 'Imported';
                            if($sub_module_id == 7){
                                $element_costs_id = 1996;
                            }
                            else{
                                $element_costs_id = 2782;
                            }
                            
                        }
                        else{
                            $product_type = 'Loc';
                            $element_costs_id = 1995;
                        }
                        //1994
                        $cost_element = getSingleRecord('par_classifications',array('id'=>$classification_id),'');
                        $element_id = $cost_element->id;
                        
                        $cost_subcategory = $this->getCostSubaegory($cost_category_id, $product_type,$fee_type_id);
                        
                        $cost_subcategory_id = $cost_subcategory->id;
                        
                        //$element_costs = $this->getElementCosts($element_id, $cost_category_id,$cost_subcategory_id,$fee_type_id);
                        
                        
                    }
                    else{
                        $cost_category = getSingleRecord('par_product_categories',array('id'=>$product_category_id),'');
                        if($cost_category){
                            $cost_category_id = $cost_category->cost_category_id;
                        
                        }
                        else{
                            $cost_category_id = 158;
                        }
                        if($product_type_id == 1){
                            $product_type = 'Imported';
                        }
                        else{
                            $product_type = 'Domestic';
                        }
                        
                        $cost_element = getSingleRecord('par_classifications',array('id'=>$classification_id),'');
                        if($cost_element){
                              $element_id = $cost_element->id;
                        }
                        else{
                            $element_id = 0;
                        }
                      
                        
                        $cost_subcategory = $this->getCostSubaegory($cost_category_id, $product_type,$fee_type_id);
                        if($cost_subcategory){
                             $cost_subcategory_id = $cost_subcategory->id;
                        
                        }
                        else{
                            $cost_subcategory_id = 0;
                        }
                        
                        //$element_costs = $this->getElementCosts($element_id, $cost_category_id,$cost_subcategory_id,$fee_type_id);
                        if($sub_module_id == 7){
                            $element_costs_id = 1996;
                        }
                        else{
                            $element_costs_id = 2783;
                        }
                    }
                }
                else if($module_id == 2){
                    $fee_type_id = 4;
                   /* $gmp_type_id = $app_data->gmp_type_id;
                    
                    if($section_id == 2){
                        $cost_category_id = 175;
                        if($gmp_type_id ==1){
                            $cost_subcategory_id = 390;
                        }
                        else{
                            $cost_subcategory_id = 389;
                            $element_costs_id = 2916;
                        }
                    }
                    else{


                    }
                    */
                }else if($module_id == 3){

                    $fee_type_id = 4;
                    
                }else if($module_id == 4){

                    $fee_type_id = 4;
                    
                }else if($module_id == 7){

                    $fee_type_id = 2;
                    
                }

            $data = array('fee_type_id'=>$fee_type_id, 
                        'currency_id'=>$paying_currency_id,
                        'cost_category_id'=>$cost_category_id,
                        'cost_subcategory_id'=>$cost_subcategory_id,
                        'element_costs_id'=>$element_costs_id,
                        'curr_stage_id'=>$results->currentStageId,
                        'next_stage'=>$results->currentStageId,
                        'paying_currency_id'=> $paying_currency_id);

            $res = array(
                'success' => true,
                'results' => $data,
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

    function getApplicationSerialNumber( $table_name)
    {
        $last_id = 01;
        $max_details = DB::table($table_name)
        ->select(DB::raw("MAX(id) as last_id"))
        ->first();
        if (!is_null($max_details)) {
        $last_id = $max_details->last_id + 1;
        }
        return $last_id;
    }
    public function saveBatchInvoiceDetails(Request $req){
        try{
                $currency_id = $req->currency_id;
                $requested_by = $req->requested_by;
                $exchange_rate = getExchangeRate($currency_id);
                $invoice_amount = 0;//zone_id

                $invoice_records = $req->input('invoice_records');
                $invoice_records = json_decode($invoice_records, false);
                $user = \Auth::user();
                $prepared_by = aes_decrypt($user->first_name) . ' ' . aes_decrypt($user->last_name);
                $invoicing_date = Carbon::now();
                $due_date_counter = Config('invoice_due_days');
                $date_today = Carbon::now();
                $due_date = $date_today->addDays($due_date_counter);
                //same currency 
                $invoice_data = DB::table('tra_application_invoices as t1')
                                    ->join('tra_invoice_details as t2','t1.id','t2.invoice_id')
                                    ->select(DB::raw("sum(total_element_amount*exchange_rate) as invoice_amountsum,sum(total_element_amount) as invoice_amount, t1.zone_id, t1.applicant_id, t1.applicant_name"))
                                    ->whereIn('t1.id',$invoice_records)
                                    ->where('t2.paying_currency_id', $currency_id)
                                    ->first();
                if($invoice_data){
                    
                     $invoice_amount = $invoice_data->invoice_amount;
                
                }
                $invoice_dataother = DB::table('tra_application_invoices as t1')
                                    ->join('tra_invoice_details as t2','t1.id','t2.invoice_id')
                                    ->select(DB::raw("sum(total_element_amount*exchange_rate) as invoice_amountsum,sum(total_element_amount*exchange_rate) as invoice_amount, t1.zone_id, t1.applicant_id, t1.applicant_name"))
                                    ->whereIn('t1.id',$invoice_records)
                                    ->where('t2.paying_currency_id','<>', $currency_id)
                                    ->first();
               //different currency
               if($invoice_dataother){
                   $invoice_amountother = $invoice_dataother->invoice_amountsum;
                    if($currency_id == 1){
                        $invoice_amountother = $invoice_amountother/$exchange_rate;
                    }
                    $invoice_amount = $invoice_amount + $invoice_amountother; 
               }
               
                
                $applicant_id = $invoice_data->applicant_id;
                $applicant_name = $invoice_data->applicant_name;
                $zone_id = $invoice_data->zone_id;
                $prefix = 402;
                $application_code = generateApplicationCode(42, 'tra_batch_invoiceapp_details');
                $registration_year = date('Y');
                $serial_no = $this->getApplicationSerialNumber('tra_batch_invoiceapp_details');
                $codes_array = array();

                $codes_array['serial_no'] = $serial_no;
                $codes_array['reg_year'] = $registration_year;
                $ref_number = generateRefNumber($codes_array, 50);
               
                $invoice_params = array(
                    'applicant_id' => $applicant_id,
                    'applicant_name' => $applicant_name,
                    'paying_currency_id' => $currency_id,
                    'paying_exchange_rate' => $exchange_rate,
                    'isLocked' =>1,
                    'date_of_invoicing'=>$invoicing_date,
                    'payment_terms' => 'Due in ' . $due_date_counter . ' Days',
                    'created_on' => Carbon::now(),
                    'created_by'=>$this->user_id
                );
                
                    $invoice_params['prepared_by'] = $prepared_by;
                    $invoice_params['due_date'] = $due_date;
                
                $invoice_no = generateInvoiceNo($this->user_id);
                    $invoice_params['invoice_no'] = $invoice_no;
                    $invoice_params['applicant_id'] = $applicant_id;
                     $invoice_params['gepg_submission_status'] = 2;
                     
                $invoice_params['reference_no'] = $ref_number;  
                    
                    $res = insertRecord('tra_application_invoices', $invoice_params, $this->user_id);
                    $batch_invoice_id = $res['record_id'];
                    //save the batch details 
                    $data = array('batch_invoice_id'=>$batch_invoice_id,
                                'created_on' => Carbon::now(),
                                'requested_by'=>$requested_by,
                                'created_by'=>$this->user_id
                    
                             );
                    $res = insertRecord('tra_batch_invoiceapp_details', $data, $this->user_id);
                    $params[] = array(
                        'invoice_id' => $batch_invoice_id,
                        'element_amount' => $invoice_amount,
                        'currency_id' => $currency_id,
                        'exchange_rate' => $exchange_rate,
                        'paying_currency_id' => $currency_id,
                        'paying_exchange_rate' => $exchange_rate,
                        'quantity' => 1,
                        'total_element_amount' => $invoice_amount
                    );
                    DB::table('tra_invoice_details')->insert($params);
                    $data = array();
                foreach ($invoice_records as $invoice_record) {
                       $batch_data[]= array('batch_invoice_id'=>$batch_invoice_id,
                                    'app_invoice_id'=>$invoice_record,
                                    'created_on' => Carbon::now(),
                                     'created_by'=>$this->user_id
                                  );

                }
                DB::table('tra_batch_invoices_records')->insert($batch_data);
                if($res['success']){
                    //saveSingleInvoiceDetailstoIntergration($batch_invoice_id,0,$currency_id,$exchange_rate,$this->user_id,$zone_id);
                
                    $res = array('batch_invoice_no'=>$invoice_no, 
                                    'batch_invoice_id'=>$batch_invoice_id,
                                    'total_amount'=>$invoice_amount,
                                    'message'=>'Batch Invoice Saved Successfully, generate invoice Statement',
                                    'success'=>true);

                }
                else{
                    $res = array('message'=>$res['message'],
                                'success'=>false);
                }

        }catch (\Exception $exception) {
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
    public function getBatchInvoiceApplications(Request $req){
        try{
            $records = DB::table('tra_batch_invoiceapp_details as t1')
                            ->leftJoin('tra_application_invoices as t2','t1.batch_invoice_id','t2.id')
                            ->join('tra_invoice_details as t3','t2.id', 't3.invoice_id')
                            ->join('par_currencies as t4', 't3.currency_id', 't4.id')
                            ->join('wb_trader_account as t5', 't2.applicant_id', 't5.id')
                            ->select(DB::raw("t2.*, t2.invoice_no as batch_invoice_no,t2.PayCntrNum as batch_control_number, t2.applicant_name, t3.total_element_amount as batch_invoice_amount, t4.name as currency_name, t2.prepared_by,t5.name as applicant_name "))
                            ->orderBy('t1.id','desc')
                            ->get();
                            $res = array(
                                'success' => true,
                                'results' => $records,
                                'message' => 'All is well'
                            );
        }catch (\Exception $exception) {
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
    public function getRetentionPendingInvoicesdetails(Request $req){
        try {
            $retention_yearfrom = $req->input('retention_yearfrom');
            $retention_yearto = $req->input('retention_yearto');
            $section_id = $req->input('section_id');
            $retention_status_id = $req->input('retention_status_id');
            $trader_name = $req->input('trader_name');
            $trader_ids = $req->input('trader_ids');
            $applicant_ids = explode(',',$trader_ids);
            $where_status = array(); 
            $where_section = array(); 
            $qry = DB::table("tra_product_retentions as t1")
                        ->select(DB::raw("t4.reference_no,t1.id as retention_id,t4.id as invoice_id, t2.registration_no as certificate_no,t5.paying_exchange_rate as exchange_rate, YEAR(t1.retention_year) AS retention_year, t3.brand_name,t4.invoice_no,t4.date_of_invoicing, t4.PayCntrNum, t7.name AS currency, SUM(t5.element_amount) AS invoice_amount, SUM(t5.total_element_amount*t5.paying_exchange_rate) AS  invoice_amounttshs, t8.name AS retention_status,t9.name as applicant_name, t4.applicant_id, t11.name as cost_element"))
                        ->join("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                        ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                        ->join("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                        ->join("tra_invoice_details as t5",'t4.id','=','t5.invoice_id')
                        ->join("par_currencies as t7",'t4.paying_currency_id','=','t7.id')
                        ->join("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                        ->join("wb_trader_account as t9",'t4.applicant_id','=','t9.id')
                        ->leftJoin("element_costs as t10",'t5.element_costs_id','=','t10.id')
                        ->leftJoin("par_cost_elements as t11",'t10.element_id','=','t11.id')
                        ->where(array('t1.retention_status_id'=>1))
                        ->groupBy('t1.invoice_id');
                        
            if($trader_name != ''){
                $qry->whereRAW(" t9.name like '%".$trader_name."%'");

            }
           
            if(validateIsNumeric($section_id)){
                $where_section = array('t3.section_id'=>$section_id);
            }
                $where_filterdates = '';
                if( $retention_yearfrom != '' &&  $retention_yearto != ''){
                    $where_filterdates  = " YEAR(t1.retention_year) BETWEEN '".$retention_yearfrom."' and  '".$retention_yearto."'";
                }
                $qry->where($where_section);
                
                if ($where_filterdates != '') {
                    $qry->whereRAW($where_filterdates);
                }
                $records = $qry->get();
    
            $res = array(
                'success' => true,
                'results' => $records,
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
    public function getBatchRetentionsInvoices(Request $req){
        try{
            $records = DB::table('tra_batch_invoiceapp_details as t1')
                            ->leftJoin('tra_application_invoices as t2','t1.batch_invoice_id','t2.id')
                            ->join('tra_invoice_details as t3','t2.id', 't3.invoice_id')
                            ->join('par_currencies as t4', 't3.currency_id', 't4.id')
                            ->join('wb_trader_account as t5', 't2.applicant_id', 't5.id')
                            ->join('tra_batch_invoices_records as t6', 't2.id','t6.batch_invoice_id')
                            ->join('tra_product_retentions as t7', 't6.app_invoice_id','t7.invoice_id')
                            ->select(DB::raw("t2.*, t2.invoice_no as batch_invoice_no,t2.PayCntrNum as batch_control_number, t2.applicant_name, t3.total_element_amount as batch_invoice_amount, t4.name as currency_name, t2.prepared_by,t5.name as applicant_name "))
                            ->orderBy('t1.id','desc')
                            ->get();
                            $res = array(
                                'success' => true,
                                'results' => $records,
                                'message' => 'All is well'
                            );
        }catch (\Exception $exception) {
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
    public function saveAdhocApplicationInvoiceDetails(Request $req){
        $data = array(
                'application_code' => $req->application_code,
                'applicant_id' => $req->applicant_id,
                'sub_module_id' => $req->sub_module_id,
                'section_id' => $req->section_id,
                'zone_id' => $req->zone_id,
                'process_id' => $req->process_id,
                'adhocapp_type_id' => $req->adhocapp_type_id,
                'application_description' => $req->application_description,
                'module_id' => $req->module_id,
                'workflow_stage_id' => $req->workflow_stage_id,
                'date_added' => Carbon::now(),
                'application_status_id'=>1
        );

        $res = $this->funcSaveAdhocApplication($req,$data);
        return \response()->json($res);

        }
        public function getApprovedInvoiceApplication(Request $req){
        $data = DB::table('tra_adhocinvoices_applications')
        ->get();
        return $data;
        }
        public function prepareAdhocInvoiceRequestpnl(Request $request){
        $application_code = $request->input('application_code');
        
        try {
            $qry = DB::table('tra_adhocinvoices_applications as t1')
                    ->leftJoin('par_system_statuses as q', 't1.application_status_id','=','q.id')
                    ->where('t1.application_code',$application_code);
                    $qry->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                    ->select('t1.*','q.name as application_status', 't1.id as active_application_id',
                        't3.name as applicant_name', 't3.contact_person',
                        't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                        't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website'
                        );
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
    public function getApplicationRaisedInvoices(Request $req)
    {
        try {
            $invoicing_data = array();
            $application_code = $req->application_code;
            if(validateIsNumeric($application_code)){
                $invoicing_data = DB::table('tra_application_invoices as t1')
                    ->join('tra_invoice_details as t2', 't1.id', 't2.invoice_id')
                    ->leftJoin('par_currencies as t3', 't2.paying_currency_id', 't3.id')
                    ->leftJoin('par_batchinvoice_types as t4', 't1.invoice_type_id', 't4.id')
                    ->select(DB::raw("SUM(t2.element_amount) as total_element_amount, SUM(t2.element_amount*t2.paying_exchange_rate) as equivalent_paid, t3.name as currency, t1.date_of_invoicing,t2.paying_exchange_rate as exchange_rate, t1.invoice_no, t1.id as invoice_id, t4.name as invoice_type, t2.paying_currency_id"))
                    ->groupBy('t2.invoice_id')
                    ->where('t1.application_code', $application_code)
                    ->get();

                    foreach ($invoicing_data as $invoice) {
                        $invoice_amt = getApplicationPaymentsRunningBalance($application_code,$invoice->invoice_id);
                        $invoice->balance = $invoice_amt['running_balance'];
                        $invoice->amount_paid = $invoice_amt['amount_paid'];
                        if($invoice_amt['running_balance'] > 0){
                            $invoice->is_cleared = 0;
                        }else{
                            $invoice->is_cleared = 1;
                        }
                    }
                
            }
            
            $res = array(
                'success'=>true,
                'results'=>$invoicing_data,
                'message'=>'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
           $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
      return \response()->json($res);
    }
    public function checkApplicationInvoiceBalance(Request $request){
        $application_code = $request->application_code;
        try{
            $payment_details = getApplicationPaymentsRunningBalance($application_code, null);
            $res = array(
                'success' => true,
                'balance' => formatMoney($payment_details['running_balance']),
                'invoice_amount' => formatMoney($payment_details['invoice_amount']),
                'message' => 'All is well'
            );
        }catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
           $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
      return \response()->json($res);
    }
    //element fees data
   function getInvoiceElementFeesData($module_id,$application_code,$application_feetype_id){
      $module_data = getTableData('modules', array('id'=>$module_id));
      $table_name = $module_data->table_name;
  
      $rec = DB::table($table_name.' as t1')
      ->select('t1.*')
      ->where('application_code',$application_code)
      ->first();
      $sub_module_id = $rec->sub_module_id;
      $module_id = $rec->module_id;
      $paying_currency_id = $rec->paying_currency_id;
      $fasttrack_option_id = $rec->fasttrack_option_id;
      $quantity = 1;
      if(!validateIsNumeric($application_feetype_id)){
        $application_feetype_id = 1;
      }
      if($application_feetype_id ==1){
           if($fasttrack_option_id == 1){
                $quantity = 2;
            }
        }
     
      $data_check = array('sub_module_id'=>$sub_module_id);
      if($module_id == 1){
            $data_check = array('module_id'=>$rec->module_id,
            'sub_module_id'=>$rec->sub_module_id,'section_id'=>$rec->section_id);
        }
        else{
            $data_check = array('module_id'=>$rec->module_id,
            'sub_module_id'=>$rec->sub_module_id);
        }
      $module_data = getTableData('tra_applicationinvoicedata_queries', $data_check);
      
      
      if($module_data){
          $data_query = $module_data->data_query;

          $query_data = DB::raw($data_query.' where t1.application_code= '.$application_code)->getValue(DB::connection()->getQueryGrammar());
 
       
              $invoice_feessql = DB::select($query_data);
            
              if(is_array($invoice_feessql) && count($invoice_feessql) >0){
                  $invoice_appfeearray = (array)$invoice_feessql[0];
                 
                  $invoice_appfeearray['t1.application_feetype_id'] = $application_feetype_id;
                  $invoice_appfeearray['sub_module_id'] = $sub_module_id;
                   
                  $fees_data = DB::table('tra_appmodules_feesconfigurations as t1')
                                      ->join('tra_element_costs as t2', 't1.element_costs_id', 't2.id')
                                      ->join('par_fee_types as t5', 't2.feetype_id', 't5.id')
                                      ->leftJoin('par_cost_categories as t6', 't2.cost_category_id', 't6.id')
                                      
                                      ->leftJoin('par_cost_sub_categories as t10', 't2.sub_cat_id', 't10.id')
                                      ->leftJoin('par_cost_elements as t7', 't2.element_id', 't7.id')
                                      ->leftJoin('par_currencies as t8', 't2.currency_id', 't8.id')
                                      ->leftJoin('par_applicationfee_types as t9', 't1.application_feetype_id', 't9.id')

                                      ->select(DB::raw("t1.id,'Quotation' as invoice_description,t10.name as sub_category, t9.name as cost_type,  '' as invoice_number,t5.name as fee_type,t6.name as cost_category,t7.name as element, concat(t5.name,'-', t6.name, '-', t7.name) as element_costs, (t2.cost*$quantity) as cost,t8.name as currency"))
                                      ->where($invoice_appfeearray)
                                      ->get();
                            ////check fot the rate data for te import 
                            
                            if($module_id ==4){
                               
                               $import_data =  $this->getImportInvoiceElementFeesData($module_id,$application_code,6);
                          
                               if($import_data['success']){
                                   $importfees_data = $import_data['results'];

                                    $fees_datas = $fees_data->merge($importfees_data);

                                    $fees_data = $fees_datas->all();
                                }
                                
                            }
                            
                            $res = array('success'=>true, 'results'=>$fees_data);
                            if (!$fees_data) {
                                $res = array(
                                'success' => false,
                                'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                                );
                            }
                }
                else{
                  $res = array(
                      'success' => false,
                      'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                    );
                }
        }
        else{
          $res = array(
              'success' => false,
              'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
          );
        }
     
      return $res;
    }
    //Import Invoice Element Fees Data
    function getImportInvoiceElementFeesData($module_id,$application_code,$application_feetype_id){
        $module_data = getTableData('modules', array('id'=>$module_id));
        $table_name = $module_data->table_name;
    
        $rec = DB::table($table_name.' as t1')
            ->join('tra_permits_products as t2', 't1.application_code', 't2.application_code')
            ->select(DB::raw("t1.*,t2.currency_id, sum(t2.unit_price*t2.quantity) as fob_value"))
            ->where('t1.application_code',$application_code)
            ->first();
            
        
      
        $sub_module_id = $rec->sub_module_id;
        $currency_id = $rec->currency_id;
        $fasttrack_option_id = 1;
        
        $fob_value = $rec->fob_value;
        
        $local_currency_id = getSingleRecordColValue('par_currencies', array('is_local_currency' => 1), 'id');
        $quantity = 1;
        if($fasttrack_option_id == 1){
          $quantity = 2;
        }
        
        $data_check = array('module_id'=>$rec->module_id,
        'sub_module_id'=>$rec->sub_module_id);

        
        $module_data = getTableData('tra_applicationinvoicedata_queries', $data_check);
        
   
       
        if($module_data && $rec->importexport_permittype_id != 4){
            if(!validateIsNumeric($fob_value)){
                $fob_value = 0;
            }
           $data_query = $module_data->data_query;
            $exchange_ratedata = getSingleRecordColValue('par_exchange_rates', array('currency_id' => $currency_id), 'exchange_rate');
            
            if(!validateIsNumeric($exchange_ratedata)){

                $res = array(
                    'success' => false,
                    'message' => 'Currency Exchange Rate has not been set, contact the finance Department for configuration'
                );
                echo json_encode($res);
                exit();
            }
                $invoice_feessql = DB::select(DB::raw($data_query.' where t1.application_code= '.$application_code));

                if(is_array($invoice_feessql) && count((array)$invoice_feessql) >0){
                    $invoice_appfeearray = (array)$invoice_feessql[0];
                    //currency_id
                    $invoice_appfeearray['t1.application_feetype_id'] = $application_feetype_id;
                    $invoice_appfeearray['sub_module_id'] = $sub_module_id;
                    
 


                    $fees_data = DB::table('tra_appmodules_feesconfigurations as t1')
                                        ->join('tra_element_costs as t2', 't1.element_costs_id', 't2.id')
                                        ->join('par_fee_types as t5', 't2.fee_type_id', 't5.id')
                                        ->leftJoin('par_cost_categories as t6', 't2.cost_category_id', 't6.id')
                                        
                                        ->leftJoin('par_cost_sub_categories as t10', 't2.sub_cat_id', 't10.id')
                                        ->leftJoin('par_cost_elements as t7', 't2.element_id', 't7.id')
                                        ->leftJoin('par_currencies as t8', 't2.currency_id', 't8.id')
                                        ->leftJoin('par_applicationfee_types as t9', 't1.application_feetype_id', 't9.id')

                                        ->select(DB::raw("t1.id,$local_currency_id as currency_id, 'Quotation' as invoice_description,t10.name as sub_category, t9.name as cost_type,  '' as invoice_number,t5.name as fee_type,t6.name as cost_category,t7.name as element,t2.id as element_costs_id, concat(t5.name,'-', t6.name, '-', t7.name) as element_costs, (t2.formula_rate/100*$fob_value*$exchange_ratedata) as cost,(t2.formula_rate/100*$fob_value*$exchange_ratedata) as costs ,formula_rate,$exchange_ratedata as exhange_rate, formula,$fob_value as fob,t8.name as currency,$currency_id as permit_currency_id"))
                                        ->where($invoice_appfeearray)
                                        ->get();
                                        
                                        $res = array('success'=>true, 'results'=>$fees_data);
                                        
                    if (!$fees_data) {
                        $res = array(
                            'success' => false,
                            'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                        );
                    }
            
            
                }
                else{
                    $res = array(
                        'success' => false,
                        'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                    );
                
                }
        }
        else{
            $res = array(
                'success' => false,
                'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
            );
        }
       
        return $res;
    }
    public function getImportFOBApplicationInvoiceDetails(Request $request){
      
        try {
            $invoice_id = $request->input('invoice_id');
            $application_code = $request->input('application_code');
           // $application_code = $request->input('application_code');
    
            $application_feetype_id = $request->input('application_feetype_id');
            
            $module_id = $request->input('module_id');
            $record = DB::table('tra_application_invoices')
                            ->where(array('id'=>$invoice_id))
                            ->first();
                            //dd($record);
            if($record){
                $qry = Db::table('tra_invoice_details as t1')
                ->leftJoin('tra_element_costs as t2', 't1.element_costs_id', 't2.id')
                ->leftJoin('tra_application_invoices as t22', 't1.invoice_id', 't22.id')
                ->leftJoin('par_cost_elements as t3', 't2.element_id', 't3.id')
                ->leftJoin('par_currencies as t5', 't2.currency_id', 't5.id')
                ->leftJoin('par_cost_sub_categories as t6', 't2.sub_cat_id', 't6.id')
                ->leftJoin('par_cost_categories as t7', 't2.cost_category_id', 't7.id')
                ->leftJoin('par_fee_types as t8', 't2.fee_type_id', 't8.id')
                ->leftJoin('par_applicationfee_types as t9', 't2.application_feetype_id', 't9.id')
                ->select('t1.id', 't1.id as invoice_detail_id', 't1.paying_exchange_rate as exchange_rate', 't1.invoice_id', 't1.element_costs_id',
                    't1.element_amount as cost','t7.name as cost_category', 't6.name as sub_category', 't5.id as currency_id', 't3.name as element', 't5.name as currency','t22.fob','t2.formula_rate',
                    't6.name as sub_category', 't7.name as category', 't1.quantity', 't1.total_element_amount', 't22.invoice_no', 't8.name as fee_type', 't9.name as cost_type', DB::raw("'Generated Invoice' as invoice_description"))
                ->where(array('t22.application_code'=> $application_code));
                
                if(validateIsNumeric($invoice_id)){
                $qry->where(array('t1.invoice_id'=>$invoice_id));
                }
                if(validateIsNumeric($application_feetype_id)){
                $qry->where(array('t22.application_feetype_id'=>$application_feetype_id));
                
                }
                $results = $qry->get();
                $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well!!'
                );
            }
            else{
                $res = $this->getImportInvoiceElementFeesData($module_id,$application_code,$application_feetype_id);

            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
     public function getRetentionChargesInvoicesdetails(Request $req){
        try {
            $retention_yearfrom = $req->input('retention_yearfrom');
            $retention_yearto = $req->input('retention_yearto');
            $section_id = $req->input('section_id');
            $retention_status_id = $req->input('retention_status_id');
            $trader_ids = $req->input('trader_ids');
            $applicant_ids = explode(',',$trader_ids);
            $where_status = array(); 
            $where_section = array(); 
            $qry = DB::table("tra_product_retentions as t1")
                    ->select(DB::raw("t4.reference_no,t1.id as retention_id, t2.registration_no as certificate_no, YEAR(t1.retention_year) AS retention_year, t3.brand_name,t4.invoice_no,t4.date_of_invoicing, t4.PayCntrNum, t7.name AS currency, SUM(t5.element_amount) AS invoice_amount, SUM(t5.element_amount*t5.exchange_rate) AS  invoice_amounttshs, t8.name AS retention_status,t9.name as applicant_name, t4.applicant_id"))
                    ->join("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                    ->leftjoin("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                    ->join("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                    ->join("tra_invoice_details as t5",'t4.id','=','t5.invoice_id')
                    ->join("par_currencies as t7",'t4.paying_currency_id','=','t7.id')
                    ->join("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                    ->Join("wb_trader_account as t9",'t4.applicant_id','=','t9.id')
                    ->groupBy('t1.invoice_id')
                    ->whereIn('t4.applicant_id',$applicant_ids );
            if(validateIsNumeric($retention_status_id)){
            $where_status = array('t1.retention_status_id'=>$retention_status_id);
            }
            if(validateIsNumeric($section_id)){
            $where_section = array('t3.section_id'=>$section_id);
            }
                $where_filterdates = '';
                if( $retention_yearfrom != '' &&  $retention_yearto != ''){
                $where_filterdates  = " YEAR(t1.retention_year) BETWEEN '".$retention_yearfrom."' and  '".$retention_yearto."'";
                }
                $qry->where($where_status);
                $qry->where($where_section);
            
                if ($where_filterdates != '') {
                $qry->whereRAW($where_filterdates);
                }
                $records = $qry->get();

            $res = array(
            'success' => true,
            'results' => $records,
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
    
    
    public function getNewInvoiceQuotation(Request $req){
      try{
          $application_code = $req->application_code;
          $module_id = $req->module_id;
          $application_feetype_id = $req->application_feetype_id;

          $res = $this->getInvoiceElementFeesData($module_id,$application_code,$application_feetype_id);

      }
      catch (\Exception $exception) {
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
public function getOnlineAppNewInvoiceQuotation(Request $req){
      try{
          $application_code = $req->application_code;
          $module_id = $req->module_id;
          $application_feetype_id = $req->application_feetype_id;

          $res = $this->getOnlineInvoiceElementFeesData($module_id,$application_code,$application_feetype_id);

      }
      catch (\Exception $exception) {
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
function getOnlineInvoiceElementFeesData($module_id,$application_code,$application_feetype_id){
      $module_data = getTableData('modules', array('id'=>$module_id));
      $table_name = $module_data->portaltable_name;
  
      $rec = DB::connection('portal_db')->table($table_name.' as t1')
                      ->select('t1.*')
                      ->where('application_code',$application_code)
                      ->first();
            if($rec){
                
                $sub_module_id = $rec->sub_module_id;
      $module_id = $rec->module_id;
      $paying_currency_id = $rec->paying_currency_id;
      $fasttrack_option_id = $rec->fasttrack_option_id;
      $quantity = 1;
      if(!validateIsNumeric($application_feetype_id)){
        $application_feetype_id = 1;
      }
      if($application_feetype_id ==1){
           if($fasttrack_option_id == 1){
                $quantity = 2;
            }
        }
     
      $data_check = array('sub_module_id'=>$sub_module_id);
      if($module_id == 1){
            $data_check = array('module_id'=>$rec->module_id,
            'sub_module_id'=>$rec->sub_module_id,'section_id'=>$rec->section_id);
        }
        else{
            $data_check = array('module_id'=>$rec->module_id,
            'sub_module_id'=>$rec->sub_module_id);
        }
      $module_data = getTableData('wb_applicationinvoicedata_queries', $data_check);
      
      
      if($module_data){
          $data_query = $module_data->data_query;

             $query_data = DB::raw($data_query.' where t1.application_code= '.$application_code)->getValue(DB::connection('portal_db')->getQueryGrammar());
                $invoice_feessql = DB::connection('portal_db')->select($query_data);  

              // $invoice_feessql = DB::connection('portal_db')->select(DB::raw($data_query.' where t1.application_code= '.$application_code));
            
              if(is_array($invoice_feessql) && count($invoice_feessql) >0){
                  $invoice_appfeearray = (array)$invoice_feessql[0];
                 
                  $invoice_appfeearray['t1.application_feetype_id'] = $application_feetype_id;
                  $invoice_appfeearray['sub_module_id'] = $sub_module_id;
                   
                  $fees_data = DB::table('tra_appmodules_feesconfigurations as t1')
                                      ->join('tra_element_costs as t2', 't1.element_costs_id', 't2.id')
                                      ->join('par_fee_types as t5', 't2.feetype_id', 't5.id')
                                      ->leftJoin('par_cost_categories as t6', 't2.cost_category_id', 't6.id')
                                      
                                      ->leftJoin('par_cost_sub_categories as t10', 't2.sub_cat_id', 't10.id')
                                      ->leftJoin('par_cost_elements as t7', 't2.element_id', 't7.id')
                                      ->leftJoin('par_currencies as t8', 't2.currency_id', 't8.id')
                                      ->leftJoin('par_applicationfee_types as t9', 't1.application_feetype_id', 't9.id')

                                      ->select(DB::raw("t1.id,'Quotation' as invoice_description,t10.name as sub_category, t9.name as cost_type,  '' as invoice_number,t5.name as fee_type,t6.name as cost_category,t7.name as element, concat(t5.name,'-', t6.name, '-', t7.name) as element_costs, (t2.cost*$quantity) as cost,t8.name as currency"))
                                      ->where($invoice_appfeearray)
                                      ->get();
                                   // dd($invoice_appfeearray);

                            ////check fot the rate data for te import 
                            
                            if($module_id ==4){
                               
                               $import_data =  $this->getImportInvoiceElementFeesData($module_id,$application_code,6);
                          
                               if($import_data['success']){
                                   $importfees_data = $import_data['results'];

                                    $fees_datas = $fees_data->merge($importfees_data);

                                    $fees_data = $fees_datas->all();
                                }
                                
                            }
                            
                            $res = array('success'=>true, 'results'=>$fees_data);
                            if (!$fees_data) {
                                $res = array(
                                'success' => false,
                                'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                                );
                            }
                }
                else{
                  $res = array(
                      'success' => false,
                      'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                    );
                }
        }
        else{
          $res = array(
              'success' => false,
              'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
          );
        }
     
                
            }
            else{
                 $res = array(
              'success' => false,
              'message' => 'The application details not found!!'
          );
            }
      
      return $res;
    }
public function saveonlineapplicationreceiceinvoiceDetails(Request $req){
                try{ 
                    $application_code = $req->application_code;
                    $module_id = $req->module_id;
                    $fasttrack_option_id = $req->fasttrack_option_id;
                    $trader_id = $req->trader_id; 
                    $module_data = getTableData('modules', array('id'=>$module_id));
                    $table_name = $module_data->portaltable_name;
                    $invoice_type_id = 1;
                    $application_feetype_id = $req->application_feetype_id;
                    $query_id = $req->query_id;
                    if(!validateIsNumeric($application_feetype_id)){
                        $application_feetype_id = 1;
                    }
                    $submodule_id = $req->submodule_id;
                    //check if invoice has been generated
                    $record = DB::table('tra_application_invoices as t1')
                                ->select('t1.*', 't1.id as invoice_id')           
                    ->where(array('application_code'=>$application_code, 'invoice_type_id'=>$invoice_type_id, 'application_feetype_id'=>$application_feetype_id))
                                ->first();
                    if($record){
                        $res = array(
                            'success' => true,
                            'invoice_data'=>$record,
                            'message' => 'Invoice Already Generated, print to proceed!!'
                        );
                        return response()->json($res);
                    }
                    
                    $rec = DB::connection('portal_db')->table($table_name.' as t1')
                                    ->join('wb_trader_account as t2', 't1.trader_id','t2.id')
                                    ->select('t1.*','t2.id as trader_id', 't2.name as applicant_name', 't2.identification_no','t2.email')
                                    ->where('application_code',$application_code)
                                    ->first();
                           
                    if($rec){

                        $applicant_id =  $rec->trader_id;
                        $email =  $rec->email;
                        $module_id = $rec->module_id;
                        if($module_id == 1){
                            $data_check = array('module_id'=>$rec->module_id,
                            'sub_module_id'=>$rec->sub_module_id,'section_id'=>$rec->section_id);
                    
                        }
                        else{
                            $data_check = array('module_id'=>$rec->module_id,
                            'sub_module_id'=>$rec->sub_module_id);
                    
                        }
                       
                        $module_data = getTableData('wb_applicationinvoicedata_queries', $data_check);
                        $data_query = $module_data->data_query;
                        
                       // $invoice_feessql = DB::connection('portal_db')->select(DB::raw($data_query.' where t1.application_code= '.$application_code));

                    $query_data = DB::raw($data_query.' where t1.application_code= '.$application_code)->getValue(DB::connection('portal_db')->getQueryGrammar());
                        $invoice_feessql = DB::connection('portal_db')->select($query_data);
                
                        if(is_array($invoice_feessql) && count($invoice_feessql) >0){
                           
                            $invoice_appfeearray = (array)$invoice_feessql[0];
                            $quantity = 1;
                            if($fasttrack_option_id == 1){
                                $quantity = 2;
                            }
                            $invoice_appfeearray['t1.application_feetype_id'] = $application_feetype_id;
                            $fees_data = DB::table('tra_appmodules_feesconfigurations as t1')
                                                ->join('tra_element_costs as t2', 't1.element_costs_id', 't2.id')
                                                ->select(DB::raw("t1.element_costs_id,t2.id, t2.*,(cost *$quantity)  as costs") )
                                                ->where($invoice_appfeearray)
                                                ->get();
                        
                            if ($fees_data->count() ==0) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                                );
                                return response()->json($res);
                            }
                            if($module_id ==4){
                               
                                $import_data =  $this->getImportInvoiceElementFeesData($module_id,$application_code,6);
                                if($import_data['success']){
                                    $importfees_data = $import_data['results'];
 
                                     $fees_datas = $fees_data->merge($importfees_data);
 
                                     $fees_data = $fees_datas->all();
 
                                }
                                 
                             }
          
                        $res = $this->saveNormalOnlineApplicationInvoice($table_name,$rec,$invoice_type_id,$fasttrack_option_id,$fees_data,$application_feetype_id,$query_id);

                        }
                        else{
                            $res = array(
                                'success' => false,
                                'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                            );
                            return response()->json($res);
                        }
                    }
            }
            catch (\Exception $exception) {
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
public function saveapplicationreceiceinvoiceDetails(Request $req){
                try{ 
                    $application_code = $req->application_code;
                    $module_id = $req->module_id;
                    $fasttrack_option_id = $req->fasttrack_option_id;
                    $trader_id = $req->trader_id; 
                    $module_data = getTableData('modules', array('id'=>$module_id));
                    $table_name = $module_data->table_name;
                    $invoice_type_id = 1;
                    $application_feetype_id = $req->application_feetype_id;
                    $query_id = $req->query_id;
                    if(!validateIsNumeric($application_feetype_id)){
                        $application_feetype_id = 1;
                    }
                    $submodule_id = $req->submodule_id;
                    //check if invoice has been generated
                    $record = DB::table('tra_application_invoices as t1')
                                ->select('t1.*', 't1.id as invoice_id')           
                    ->where(array('application_code'=>$application_code, 'invoice_type_id'=>$invoice_type_id, 'application_feetype_id'=>$application_feetype_id))
                                ->first();
                    if($record){
                        $res = array(
                            'success' => true,
                            'invoice_data'=>$record,
                            'message' => 'Invoice Already Generated, print to proceed!!'
                        );
                        return response()->json($res);
                    }
                    
                    $rec = DB::table($table_name.' as t1')
                                    ->join('wb_trader_account as t2', 't1.applicant_id','t2.id')
                                    ->select('t1.*','t2.id as trader_id', 't2.name as applicant_name', 't2.identification_no','t2.email')
                                    ->where('application_code',$application_code)
                                    ->first();
                           
                    if($rec){

                        $applicant_id =  $rec->trader_id;
                        $email =  $rec->email;
                        $module_id = $rec->module_id;
                        if($module_id == 1){
                            $data_check = array('module_id'=>$rec->module_id,
                            'sub_module_id'=>$rec->sub_module_id,'section_id'=>$rec->section_id);
                    
                        }
                        else{
                            $data_check = array('module_id'=>$rec->module_id,
                            'sub_module_id'=>$rec->sub_module_id);
                    
                        }
                       
                        $module_data = getTableData('tra_applicationinvoicedata_queries', $data_check);
                        $data_query = $module_data->data_query;
                        $query_data = DB::raw($data_query.' where t1.application_code= '.$application_code)->getValue(DB::connection()->getQueryGrammar());
                        
                        $invoice_feessql = DB::select($query_data);
                        if(is_array($invoice_feessql) && count($invoice_feessql) >0){
                           
                            $invoice_appfeearray = (array)$invoice_feessql[0];
                            $quantity = 1;
                            if($fasttrack_option_id == 1){
                                $quantity = 2;
                            }
                            $invoice_appfeearray['t1.application_feetype_id'] = $application_feetype_id;
                            $fees_data = DB::table('tra_appmodules_feesconfigurations as t1')
                                                ->join('tra_element_costs as t2', 't1.element_costs_id', 't2.id')
                                                ->select(DB::raw("t1.element_costs_id,t2.id, t2.*,(cost *$quantity)  as costs") )
                                                ->where($invoice_appfeearray)
                                                ->get();
                        
                            if ($fees_data->count() ==0) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                                );
                                return response()->json($res);
                            }
                            if($module_id ==4){
                               
                                $import_data =  $this->getImportInvoiceElementFeesData($module_id,$application_code,6);
                                if($import_data['success']){
                                    $importfees_data = $import_data['results'];
 
                                     $fees_datas = $fees_data->merge($importfees_data);
 
                                     $fees_data = $fees_datas->all();
 
                                }
                                 
                             }
          
                        $res = $this->saveNormalApplicationInvoice($table_name,$rec,$invoice_type_id,$fasttrack_option_id,$fees_data,$application_feetype_id,$query_id);

                        }
                        else{
                            $res = array(
                                'success' => false,
                                'message' => 'The application fees and charges have not been configured, contact the authority for action!!'
                            );
                            return response()->json($res);
                        }
                    }
            }
            catch (\Exception $exception) {
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
   
   function saveNormalOnlineApplicationInvoice($table_name,$app_details,$invoice_type_id,$fasttrack_option_id,$fees_data,$application_feetype_id=1, $query_id= null){
        //detail
         $reference_no = $app_details->reference_no;
         $tracking_no = $app_details->tracking_no;
         $sub_module_id = $app_details->sub_module_id;
         $module_id = $app_details->module_id;
         $applicant_id = $app_details->trader_id;
         $zone_id = $app_details->zone_id;
         $applicant_name = $app_details->applicant_name;
         $application_code = $app_details->application_code;
         $user_id = $applicant_name;
        
         DB::connection('portal_db')->table($table_name)
         ->where('application_code', $application_code)
         ->update(array('fasttrack_option_id' => $fasttrack_option_id));

         $due_date_counter = 90;
         $date_today = Carbon::now();
         $due_date = $date_today->addDays($due_date_counter);
         $invoicing_date = Carbon::now();
         $isLocked =0;
         $invoice_params = array(
             'applicant_id' => $applicant_id,
             'applicant_name' => $applicant_name,
             'reference_no'=>$reference_no,
             'module_id'=>$module_id,
             'zone_id'=>$zone_id,
             'sub_module_id'=>$sub_module_id,
             'tracking_no'=>$tracking_no,
             'isLocked' => $isLocked,
             'application_feetype_id'=>$application_feetype_id,
             'fasttrack_option_id'=>$fasttrack_option_id,
             'invoice_type_id'=>$invoice_type_id,
             'gepg_submission_status'=>2,
             'date_of_invoicing'=>$invoicing_date,
             'payment_terms' => 'Due in ' . $due_date_counter . ' Days',
             'created_on' => Carbon::now()
         );
        
         $invoice_params['prepared_by'] = $applicant_name;
         $invoice_params['due_date'] = $due_date;
      
             $invoice_no = generateInvoiceNo($user_id);
             $invoice_params['invoice_no'] = $invoice_no;

             $invoice_params['application_code'] = $application_code;
            
             $res = insertRecord('tra_application_invoices', $invoice_params, $user_id);
             
             if ($res['success'] == false) {
                 return \response()->json($res);
             }
             $invoice_id = $res['record_id'];
             $params = array();
             foreach ($fees_data as $fee) {
                 if(isset($permit_currency_id)){
                    $currency_id = $fee->permit_currency_id;
                    $paying_currency_id = 155;
                 
                 }
                 else{
                    $currency_id = $fee->currency_id;
                    $paying_currency_id = $fee->currency_id;
                 
                 }
                 
                 $exchange_ratedata = getTableData('par_exchange_rates', array('currency_id' => $currency_id));
                 $exchange_rate = $exchange_ratedata->exchange_rate;
                 $quantity = 1;
                 if($fasttrack_option_id == 1){
                     $quantity = 2;
                 }
               if(validateIsNumeric($fee->cost)){
                   $params[] = array(
                         'invoice_id' => $invoice_id,
                         'element_costs_id' => $fee->element_costs_id,
                         'element_amount' => $fee->cost,
                         'currency_id' => $currency_id,
                         'paying_currency_id'=>$currency_id,
                         'exchange_rate' => $exchange_rate,
                         'quantity' => $quantity,
                         'paying_exchange_rate' => $exchange_rate,
                         'total_element_amount'=>$fee->cost,
                         'created_on' => Carbon::now()
                     );
                   
               }
                 
             }
             if(count($params)){
                 DB::table('tra_invoice_details')->insert($params);
             }
             //update the invoice details 
             $invoice_data = array('paying_currency_id'=>$paying_currency_id, 'dola'=>Carbon::now());

             DB::table('tra_application_invoices')->where(array('id'=>$invoice_id))->update($invoice_data);
             /*---------------------------------------------
                Save invoice to pivot table if tied to a query
             -------------------------------------------------*/
             if(validateIsNumeric($query_id)){
                $log_details = array(
                    'query_id' => $query_id,
                    'invoice_id' => $invoice_id
                );
                $check = DB::table('tra_query_invoices')
                        ->where(array(
                            'query_id' => $query_id,
                            'invoice_id' => $invoice_id
                        ))->count();
                if($check < 1){
                    $res = insertRecord('tra_query_invoices', $log_details, $user_id);
                }
                
             }
             

             /*----------------------------------------------*/

          //   saveSingleInvoiceDetailstoIntergration($invoice_id,$application_code,$paying_currency_id,$paying_exchange_rate,$user_id,$zone_id);

             $res = array(
                 'success' => true,
                 'invoice_id' => $invoice_id,
                 'invoice_no' => $invoice_no,
                 'message' => 'Invoice details saved successfully!!'
             );
             return $res;
}
   function saveNormalApplicationInvoice($table_name,$app_details,$invoice_type_id,$fasttrack_option_id,$fees_data,$application_feetype_id=1, $query_id= null){
        //detail
         $reference_no = $app_details->reference_no;
         $tracking_no = $app_details->tracking_no;
         $sub_module_id = $app_details->sub_module_id;
         $module_id = $app_details->module_id;
         $applicant_id = $app_details->trader_id;
         $zone_id = $app_details->zone_id;
         $applicant_name = $app_details->applicant_name;
         $application_code = $app_details->application_code;
         $user_id = $this->user_id;
        
         DB::table($table_name)
         ->where('application_code', $application_code)
         ->update(array('fasttrack_option_id' => $fasttrack_option_id));

         $due_date_counter = 90;
         $date_today = Carbon::now();
         $due_date = $date_today->addDays($due_date_counter);
         $invoicing_date = Carbon::now();
         $isLocked =0;
         $invoice_params = array(
             'applicant_id' => $applicant_id,
             'applicant_name' => $applicant_name,
             'reference_no'=>$reference_no,
             'module_id'=>$module_id,
             'zone_id'=>$zone_id,
             'sub_module_id'=>$sub_module_id,
             'tracking_no'=>$tracking_no,
             'isLocked' => $isLocked,
             'application_feetype_id'=>$application_feetype_id,
             'fasttrack_option_id'=>$fasttrack_option_id,
             'invoice_type_id'=>$invoice_type_id,
             'gepg_submission_status'=>2,
             'date_of_invoicing'=>$invoicing_date,
             'payment_terms' => 'Due in ' . $due_date_counter . ' Days',
             'created_on' => Carbon::now()
         );
        
         $invoice_params['prepared_by'] = $applicant_name;
         $invoice_params['due_date'] = $due_date;
      
             $invoice_no = generateInvoiceNo($user_id);
             $invoice_params['invoice_no'] = $invoice_no;

             $invoice_params['application_code'] = $application_code;
            
             $res = insertRecord('tra_application_invoices', $invoice_params, $user_id);
             
             if ($res['success'] == false) {
                 return \response()->json($res);
             }
             $invoice_id = $res['record_id'];
             $params = array();
             foreach ($fees_data as $fee) {
                 if(isset($permit_currency_id)){
                    $currency_id = $fee->permit_currency_id;
                    $paying_currency_id = 155;
                 
                 }
                 else{
                    $currency_id = $fee->currency_id;
                    $paying_currency_id = $fee->currency_id;
                 
                 }
                 
                 $exchange_ratedata = getTableData('par_exchange_rates', array('currency_id' => $currency_id));
                 $exchange_rate = $exchange_ratedata->exchange_rate;
                 $quantity = 1;
                 if($fasttrack_option_id == 1){
                     $quantity = 2;
                 }
               if(validateIsNumeric($fee->cost)){
                   $params[] = array(
                         'invoice_id' => $invoice_id,
                         'element_costs_id' => $fee->element_costs_id,
                         'element_amount' => $fee->cost,
                         'currency_id' => $currency_id,
                         'paying_currency_id'=>$currency_id,
                         'exchange_rate' => $exchange_rate,
                         'quantity' => $quantity,
                         'paying_exchange_rate' => $exchange_rate,
                         'total_element_amount'=>$fee->cost,
                         'created_on' => Carbon::now()
                     );
                   
               }
                 
             }
             if(count($params)){
                 DB::table('tra_invoice_details')->insert($params);
             }
             //update the invoice details 
             $invoice_data = array('paying_currency_id'=>$paying_currency_id, 'dola'=>Carbon::now());

             DB::table('tra_application_invoices')->where(array('id'=>$invoice_id))->update($invoice_data);
             /*---------------------------------------------
                Save invoice to pivot table if tied to a query
             -------------------------------------------------*/
             if(validateIsNumeric($query_id)){
                $log_details = array(
                    'query_id' => $query_id,
                    'invoice_id' => $invoice_id
                );
                $check = DB::table('tra_query_invoices')
                        ->where(array(
                            'query_id' => $query_id,
                            'invoice_id' => $invoice_id
                        ))->count();
                if($check < 1){
                    $res = insertRecord('tra_query_invoices', $log_details, $user_id);
                }
                
             }
             

             /*----------------------------------------------*/

          //   saveSingleInvoiceDetailstoIntergration($invoice_id,$application_code,$paying_currency_id,$paying_exchange_rate,$user_id,$zone_id);

             $res = array(
                 'success' => true,
                 'invoice_id' => $invoice_id,
                 'invoice_no' => $invoice_no,
                 'message' => 'Invoice details saved successfully!!'
             );
             return $res;
}

public function onCancelGeneratedApplicationInvoice(Request $req){
    try{
        $application_code = $req->application_code;
        $invoice_id = $req->invoice_id;
       // tra_invoicecancellation_requests
       $user_id = $this->user_id;
        
       $trader_id = $req->trader_id;
       $trader_email = $req->trader_email;
                     $cancellation_request = array('application_code'=>$application_code,
                                      'invoice_id'=>$invoice_id,  
                                      'requested_on'=>Carbon::now(),  
                                      'requested_trader_id'=>$trader_id,  
                                      'reason_for_cancellation'=>'Cancellation Request',  
                                      'remarks'=>'Cancellation Request',  
                                      'created_on'=>Carbon::now()
                                 );
                     $insert_res = insertRecord('tra_invoicecancellation_requests', $cancellation_request, $user_id);
                    
                    $where_invoice = array('id'=>$invoice_id,'application_code'=>$application_code);
                
                    $invoice_rec = DB::table('tra_application_invoices as t1')
                    ->select(DB::raw("id,invoice_no,prepared_by,tracking_no,reference_no,receipt_no,PayCntrNum,application_id,application_code,module_id,sub_module_id,section_id,date_of_invoicing"))
                    ->where($where_invoice)
                    ->first();
                    //check if there is any ayment made  invoice_amount
                    $where_payment = array('invoice_id'=>$invoice_id,'application_code'=>$application_code);
                
                    $payment_record = DB::table('tra_payments')->where($where_payment)->count();
                    if($payment_record >0){
                        $res = array('success'=>false,
                        'message'=>'Payment for the said Invoice has already been effected, cancell payments and then invoices');
                        
                         return \response()->json($res);
                    }
                    
                    $cancelled_invoicedata = convertStdClassObjToArray($invoice_rec);
                    
                    $insert_res = insertRecord('tra_application_invoicescancellation', $cancelled_invoicedata, $user_id);
                    
                    $previous_data = getPreviousRecords('tra_application_invoices',$where_invoice);
                   // $previous_data = $previous_data['results'];
                    
                    $res= deleteRecordNoTransaction('tra_application_invoices', $previous_data, $where_invoice, $user_id);
                    
                    //send notificaitons 
                    $res = array('success'=>true,'message'=>'The Invoice Has been cancelled Successfully, regenerate the Proforma Invoice and proceed.');

    }
    catch (\Exception $exception) {
        $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

    } catch (\Throwable $throwable) {
        $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
    }
    return response()->json($res, 200);

}
}
