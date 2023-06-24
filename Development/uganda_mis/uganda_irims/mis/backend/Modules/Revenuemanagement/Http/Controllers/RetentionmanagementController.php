<?php

namespace Modules\Revenuemanagement\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Symfony\Component\HttpFoundation\StreamedResponse;

class RetentionmanagementController extends Controller
{
    protected $user_id;

    public function __construct(Request $req)
    {
        /*
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
        */

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
                    ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                    ->join("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                    ->join("tra_invoice_details as t5",'t4.id','=','t5.invoice_id')
                    ->join("par_currencies as t7",'t4.paying_currency_id','=','t7.id')
                    ->join("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                    ->leftJoin("wb_trader_account as t9",'t4.applicant_id','=','t9.id')
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
    public function getRetentionChargesPaymentsdetails(Request $req){
    try {
        

        $retention_yearfrom = $req->input('retention_yearfrom');
        $retention_yearto = $req->input('retention_yearto');
        $trans_dateto = formatDate($req->input('trans_dateto'));
        $trans_datefrom = formatDate($req->input('trans_datefrom'));

        $section_id = $req->input('section_id');
        $retention_status_id = $req->input('retention_status_id');
        $trader_ids = $req->input('trader_ids');
        $applicant_ids = explode(',',$trader_ids);
        $where_status = array(); 
        $where_section = array(); 
        $qry = DB::table("tra_product_retentions as t1")
                    ->select(DB::raw("t4.reference_no,t1.id as retention_id, t2.registration_no as certificate_no, YEAR(t1.retention_year) AS retention_year, t3.brand_name,t4.invoice_no,t5.receipt_no, t5.PayCtrNum as PayCntrNum, t5.trans_date,  t7.name AS currency, SUM(t5.amount_paid) AS amount_paid, SUM(t5.amount_paid*t5.exchange_rate) AS amount_paidths, t8.name AS retention_status,t9.name as applicant_name, t4.applicant_id"))
                    ->join("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                    ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                    ->join("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                    ->join("tra_product_retentionspayments as t10",'t1.invoice_id','=','t10.retentioninvoice_id')
                    ->join("tra_payments as t5",'t10.retention_receipt_id','=','t5.id')
                    ->join("par_currencies as t7",'t5.currency_id','=','t7.id')
                    ->join("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                    ->leftJoin("wb_trader_account as t9",'t4.applicant_id','=','t9.id')
                    ->groupBy('t1.invoice_id')
                    ->whereIn('t5.applicant_id',$applicant_ids );

            $where_filterdates = '';
            if( $retention_yearfrom != '' &&  $retention_yearto != ''){
                $where_filterdates  = " YEAR(t1.retention_year) BETWEEN '".$retention_yearfrom."' and  '".$retention_yearto."'";
            }
            if( $trans_dateto != '' &&  $trans_datefrom != ''){
                $where_filterdates  = " date_format(t5.trans_date, '%Y-%m-%d') BETWEEN '".$trans_datefrom."' and  '".$trans_dateto."'";
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
  
   public function getRetentionAplicantsDetails(Request $req)
    {
        $filter = $req->input('filter');
            $start = $req->input('start');
            $limit = $req->input('limit');

        try {
            $whereClauses = array();
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'name' :
                                $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                                break;
                                  case 'applicant_name' :
                                $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'identification_no' :
                                $whereClauses[] = "t1.identification_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'app_physical_address' :
                                $whereClauses[] = "t1.physical_address like '%" . ($filter->value) . "%'";
                                break;
                                case 'contact_person' :
                                $whereClauses[] = "t1.contact_person like '%" . ($filter->value) . "%'";
                                break;   
                                case 'tin_no' :
                                $whereClauses[] = "t1.tin_no like '%" . ($filter->value) . "%'";
                                break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
            $qry = DB::table('wb_trader_account as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                //->join('tra_product_applications as t5', 't1.id', '=', 't5.applicant_id')
               // ->join('tra_registered_products as t6', 't5.product_id', '=', 't6.tra_product_id')
              //  ->join('tra_product_retentions as t7', 't6.id', '=', 't7.reg_product_id')
                ->select('t1.id as applicant_id','t1.identification_no', 't1.name as applicant_name', 't1.contact_person', 't1.tin_no',
                    't1.country_id as app_country_id', 't1.region_id as app_region_id', 't1.district_id as app_district_id',
                    't1.physical_address as app_physical_address', 't1.postal_address as app_postal_address', 't1.telephone_no as app_telephone',
                    't1.fax as app_fax', 't1.email as app_email', 't1.website as app_website', 't2.name as country_name', 't3.name as region_name', 't4.name as district_name',
                    't1.id as ltr_id', 't1.name as ltr_name', 't1.country_id as ltr_country_id', 't1.region_id as ltr_region_id', 't1.district_id as ltr_district_id',
                    't1.physical_address as ltr_physical_address', 't1.postal_address as ltr_postal_address',
                    't1.telephone_no as ltr_telephone', 't1.fax as ltr_fax', 't1.email as ltr_email', 't1.website as ltr_website');

            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            $count = $qry->count();
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
   
    public function generateProductRetentionCharges(Request $req){
            try{
             
                  $user_id = 499;
                $retention_year = $req->retention_year;

                $usr_id = 499;
                $expiry_date = '01';
                $expiry_month = '01';
                if(!validateIsNumeric($retention_year)){
                    $retention_year= date('Y');
                }
               
                $retention_year = strtotime($retention_year .'-'. $expiry_month.'-'.$expiry_date);
                        
                $retention_yearCheck = date("Y-m-d",$retention_year);
                        
                $retention_year = date("Y-m-d",strtotime(date("Y-m-d", strtotime($retention_yearCheck)) . "+1 year"));
                        //next retention year
                $next_retention_year = date("Y-m-d",strtotime(date("Y-m-d", strtotime($retention_year)) . "+1 year"));
                $reg_product_id = $req->reg_product_id;
                $where = array();
                if(validateIsNumeric($reg_product_id)){
                    $where = array('id'=>$reg_product_id);
                }
                
                $where['t3.product_type_id'] = 2;
                $where['registration_status_id'] = 2;

                $records= DB::table('tra_registered_products as t1')
                                ->join('tra_product_applications as t2', 't1.tra_product_id','t2.product_id')
                                ->join('tra_product_information as t3', 't1.tra_product_id','t3.id')
                                ->leftJoin('wb_trader_account as t4', 't2.applicant_id','t4.id')
                                ->select('t2.reference_no','t3.device_type_id', 't2.product_id', 't1.id as reg_product_id', 't2.applicant_id', 't2.section_id', 't3.product_type_id', 'classification_id','prodclass_category_id', 't4.name as trader_name', 't2.id as application_id', 't2.module_id','t2.sub_module_id', 't2.tracking_no', 't2.application_code')
                                ->where($where)
                                //->take(1)
                                ->get();

                $data = array('retention_year'=>$retention_year,
                                'generated_on'=> Carbon::now(),
                              'generated_by'=>$user_id,
                              'created_by'=>$user_id,
                              'created_on'=>Carbon::now() );
                $res = insertRecord('tra_retentionregeration', $data, $user_id);
                if($res['success']){
                    $retentionregeration_id = $res['record_id'];

                }
                $retentionregeration_log = array();
             
               
                $current_month = date('m');
                if($records){//registration_status_id
                        foreach($records as $rows){
                            $reg_product_id = $rows->reg_product_id;
                            $applicant_id =  $rows->applicant_id;
                            $applicant_name = $rows->trader_name;
                            $module_id = $rows->module_id;
                            $section_id = $rows->section_id;
                            $sub_module_id = $rows->sub_module_id;
                            $tracking_no = $rows->tracking_no;
                            $isLocked = 1;
                            $invoicing_date = date('Y-m-d H:i:s');
                            $due_date_counter = Config('invoice_due_days');
                            
                            $reference_no = $rows->reference_no;
                            
                            $application_code =  $rows->application_code;
                            $application_id = $rows->application_id;

                            $product_type_id =  $rows->product_type_id;
                            $prodclass_category_id = $rows->prodclass_category_id;
                            $classification_id = $rows->classification_id;
                            
                            if($classification_id == 9 || $classification_id == 10 || $classification_id == 541  || $classification_id == 383  || $classification_id == 387 || $classification_id == 388){
                                $classification_id = 8;
                            }
                            else if($classification_id == 285){
                                $classification_id = 5;
                            }
                            $device_type_id = $rows->device_type_id;
                            if(!validateIsNumeric($prodclass_category_id)){
                                $prodclass_category_id = getSingleRecordColValue('par_classifications', array('id' => $classification_id), 'prodclass_category_id');
                            }
                            if(!validateIsNumeric($product_type_id)){
                                $product_type_id =2;
                            }
                            if($section_id == 4){
                                if(!validateIsNumeric($device_type_id)){
                                    $device_type_id = 2;
                                }
                                
                            }
                            $where_retention = array('reg_product_id'=>$reg_product_id,'retention_year'=>$retention_year);

                            $check_qry = DB::table('tra_product_retentions')
                                        ->where(array('reg_product_id'=>$reg_product_id))
                                        ->whereRaw("date_format(retention_year,'%Y-%m-%d') = '".$retention_year."'")
                                        ->count();
                                        
                          if(!$check_qry){
                            $retention_charges = $this->getRetentionCharges($section_id,$product_type_id,$prodclass_category_id,$classification_id,$device_type_id);
                            if (is_null($retention_charges)) {
                                $datacheck = array('section_id'=>$section_id, 'product_type_id'=>$product_type_id,  'classification_id'=>$classification_id, 'device_type_id'=>$device_type_id);
                                
                                $res = array(
                                    'success' => false,
                                    'dataset'=>$datacheck,
                                    'message' => 'The Retention Costs have not been configured correctly!!'
                                );
                                return response()->json($res);
                            } 
                                  $currency_id = $retention_charges->currency_id;  
                                  $cost = $retention_charges->cost;
                                  $element_costs_id = $retention_charges->element_costs_id;
                                
                            $invoice_no = generateInvoiceNo($user_id);
                            
                            
                            $exchange_rate = getSingleRecordColValue('par_exchange_rates', array('currency_id' => $currency_id), 'exchange_rate');
                            //the save setup 
                            $invoice_params = array(
                                'applicant_id' => $applicant_id,
                                'application_id' => $application_id,
                                'invoice_no' => $invoice_no,
                                'application_code' => $application_code,
'zone_id'=>2,
                                'applicant_name' => $applicant_name,
                                'paying_currency_id' => $currency_id,
                                'paying_exchange_rate' => $exchange_rate,
                                'reference_no'=>$reference_no,
                                'module_id'=>$module_id,
                                'section_id'=>$section_id,
                                'sub_module_id'=>$sub_module_id,
                                'tracking_no'=>$tracking_no,
                                'isLocked' => $isLocked,
                                'date_of_invoicing'=>$invoicing_date,
                                'payment_terms' => 'Due in ' . $due_date_counter . ' Days',
                                'created_on' => Carbon::now()
                            );
                            
                            $res = insertRecord('tra_application_invoices', $invoice_params, $user_id);
                            
                            $invoice_id = $res['record_id'];
                            $params = array(
                                'invoice_id' => $invoice_id,
                                'element_costs_id' => $element_costs_id,
                                'element_amount' => $cost,
                                'currency_id' => $currency_id,
                                'exchange_rate' => $exchange_rate,
                                'paying_exchange_rate' => $exchange_rate,
                                'paying_currency_id' => $currency_id,
                                'quantity' => 1,
                                'total_element_amount' => ($cost * 1),
                                'created_by'=>$user_id,
                                'created_on'=>Carbon::now()
                            );
                            $res = insertRecord('tra_invoice_details', $params, $user_id);
                            $retention_data = array(
                                'application_code'=>$application_code, 
                                'reg_product_id'=>$reg_product_id,
                                'retention_year'=>$retention_year,
                                'next_retention_year'=>$next_retention_year,
                                'invoice_id'=>$invoice_id,
                                'retention_status_id'=>1,
                                'created_by'=>$user_id,
                                'created_on'=>Carbon::now());
                            $res = insertRecord('tra_product_retentions', $retention_data, $user_id);
                            $retentionregeration_log[] = array('retentionregeration_id'=>$retentionregeration_id,
                                                                'reg_product_id'=>$reg_product_id,
                                                                'created_by'=>$user_id,
                                                                'retentionregeration_status_id'=>1,
                                                                'created_on'=>Carbon::now()
                                                                );
                          }
                          else{
                            $retentionregeration_log[] = array('retentionregeration_id'=>$retentionregeration_id,
                                'reg_product_id'=>$reg_product_id,
                                'created_by'=>$user_id,
                                'retentionregeration_status_id'=>2,
                                'created_on'=>Carbon::now()
                                );
                              $res = array('success'=>true,'message'=>'Retention has already been generated');

                          }
                           
                        }
                        $res = array('success'=>true, 'message'=>'Retention Generated successfully');

                }
                else{
                    $res = array('success'=>true, 'message'=>'No active product application found!!');
                }
                $size= 500;
                $chunks = array_chunk($retentionregeration_log, $size);
                foreach ($chunks as $chunk) {
                        DB::table('tra_retentionregeration_logs')->insert($chunk);
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
    function getRetentionCharges($section_id,$product_type_id,$prodclass_category_id,$classification_id,$device_type_id){
        if($section_id ==2){
             $where_state = array('section_id'=>$section_id, 'product_type_id'=>$product_type_id,  'classification_id'=>$classification_id);
        }
        else{
             $where_state = array('section_id'=>$section_id, 'product_type_id'=>$product_type_id,  'classification_id'=>$classification_id, 'device_type_id'=>$device_type_id);
        }
       
        
            $record = DB::table('tra_retentioncharge_config as t1')
                            ->join('element_costs as t2', 't1.element_costs_id', 't2.id')
                            ->where($where_state)
                            ->select('t2.*', 't2.id as element_costs_id')
                            ->first();
                         
            return $record;
    }
   function getRetentionpenaltyFees($section_id){
            $where_state = array('section_id'=>$section_id);
                
            $record = DB::table('element_costs as t1')
                            ->join("cost_elements as t2", 't1.element_id', 't2.id')
                            ->where($where_state)
                            ->whereRaw("t2.name like '%retention%' and formula=1")
                            ->select('t2.*', 't1.id as element_costs_id')
                            ->first();
                        
            return $record;

   }
  

    function generateProductRetentionPenalty(Request $req){
        try{
            $retention_year = $req->retention_year;
            if(!validateIsNumeric($retention_year)){
                $retention_year= date('Y');
            }
            
             $retentionregeration_log = array();
            $reg_product_id = $req->reg_product_id;
                $where = array();
                if(validateIsNumeric($reg_product_id)){
                    $where = array('t2.id'=>$reg_product_id);
                }
            $retention_charges = DB::table('tra_product_retentions as t1')
                                    ->join('tra_registered_products as t2', 't1.reg_product_id','t2.id')
                                    ->join('tra_application_invoices as t3', 't1.invoice_id', 't3.id')
                                    ->join('tra_invoice_details as t4', 't3.id', 't4.invoice_id')
                                    ->select(DB::raw("t1.retention_year,t1.next_retention_year,t3.applicant_id,t3.section_id,t3.reference_no,t3.module_id, t3.sub_module_id, t1.reg_product_id,t1.invoice_id,t3.date_of_invoicing,t4.total_element_amount as invoice_amount,t4.currency_id, t3.applicant_name,t3.application_code, t3.application_id, t1.invoice_id"))
                                    ->whereRaw("(t1.receipt_id is null or t1.receipt_id ='' or t1.receipt_id =0) and (date_format(retention_year,'%Y') = '".$retention_year."')")
                                    ->where($where)
                                    ->get();
                       print_r(DB::getQueryLog());             
            if($retention_charges){
                print_r($retention_charges);
                        exit();
                    foreach($retention_charges as $rows){
                        
                        //check if the penalty has been genreated 
                        $sql_query2 = mysql_query("select id from retention_penalty_applications where product_id = '$product_id' and YEAR(date_of_penalty) = '$retention_year'");
                        $penalty_rec = DB::table('tra_product_retentionspenalty')
                                            ->whereRaw("date_format(retention_year,'%Y') = '".$retention_year."'")
                                            ->where(array('reg_product_id'=>$reg_product_id))
                                            ->count();
                        if($penalty_rec == 0){
                            $usr_id = 499;
                            $section_id = $rows->section_id;
                            $table_name = $rows->table_name;
                            $currency_id = $rows->currency_id;
                            $ret_invoice_amount = $rows->invoice_amount;
                            $reference_no = $rows->reference_no;
                            $product_id = $rows->product_id;
                            $retention_invoice_no = $rows->invoice_no;
                            $applicant_id = $rows->applicant_id;
                            
                            $retention_year = $rows->retention_year;
                            $next_retention_year = $rows->next_retention_year;
                            $retention_invoice_id = $rows->invoice_id;
                            $application_code = $rows->application_code;
                            $application_id = $rows->application_id;
                            $module_id = $rows->module_id;$sub_module_id = $rows->sub_module_id;$section_id = $rows->section_id;
                            $applicant_name = $rows->applicant_name;
                            //get the retention panelaty charges 
                            $penalty_fees = $this->getRetentionpenaltyFees($section_id);

                            $element_costs_id = $penalty_fees->element_costs_id;
                                    
                            if (is_null($penalty_fees)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'The Retention Costs have not been configured correctly!!'
                                );
                                return response()->json($res);
                            } 
                            $cost = $penalty_fees->cost;
                            $invoice_amount = $cost/100 * $ret_invoice_amount;
                            $invoice_no = generateInvoiceNo($user_id);
                                
                            
                            $exchange_rate = getSingleRecordColValue('par_exchange_rates', array('currency_id' => $currency_id), 'exchange_rate');
                            //the save setup 
                            $invoice_params = array(
                                'applicant_id' => $applicant_id,
                                'application_id' => $application_id,
                                'invoice_no' => $invoice_no,
                                'application_code' => $application_code,

                                'applicant_name' => $applicant_name,
                                'paying_currency_id' => $currency_id,
                                'paying_exchange_rate' => $exchange_rate,
                                'reference_no'=>$reference_no,
                                'module_id'=>$module_id,
                                'section_id'=>$section_id,
                                'sub_module_id'=>$sub_module_id,
                                'tracking_no'=>$reference_no,
                                'isLocked' => 1,
                                'date_of_invoicing'=>Carbon::now(),
                                'payment_terms' => 'Due in  Days',
                                'created_on' => Carbon::now()
                            );
                            
                            $res = insertRecord('tra_application_invoices', $invoice_params, $user_id);
                            
                            $invoice_id = $res['record_id'];
                            $params = array(
                                'invoice_id' => $invoice_id,
                                'element_costs_id' => $element_costs_id,
                                'element_amount' => $invoice_amount,
                                'currency_id' => $currency_id,
                                'exchange_rate' => $exchange_rate,
                                'quantity' => 1,
                                'total_element_amount' => ($invoice_amount * 1),
                                'created_by'=>$user_id,
                                'created_on'=>Carbon::now()
                            );
                            $res = insertRecord('tra_invoice_details', $params, $user_id);
                            $retention_data = array(
                                'application_code'=>$application_code, 
                                'reg_product_id'=>$reg_product_id,
                                'retention_year'=>$retention_year,
                                'next_retention_year'=>$next_retention_year,
                                'invoice_id'=>$invoice_id,
                                'retention_status_id'=>1,
                                'created_by'=>$user_id,
                                'created_on'=>Carbon::now());
                            $res = insertRecord('tra_product_retentions', $retention_data, $user_id);
                            //retention penalty
                            $retention_data = array(
                                'application_code'=>$application_code, 
                                'reg_product_id'=>$reg_product_id,
                                'date_of_penalty'=>Carbon::now(),
                                'penalty_invoice_id'=>$invoice_id,
                                'retention_invoice_id'=>$retention_invoice_id,
                                'created_by'=>$user_id,
                                'created_on'=>Carbon::now());
                            $res = insertRecord('tra_product_retentionspenalty', $retention_data, $user_id);

                            $retentionregeration_log[] = array('retentionregeration_id'=>$retentionregeration_id,
                                                                'reg_product_id'=>$reg_product_id,
                                                                'created_by'=>$user_id,
                                                                'retentionregeration_status_id'=>1,
                                                                'created_on'=>Carbon::now()
                                                                );

                        }
                }
                $res = array('success'=>true, 'message'=>'Retention Generated successfully');

            }
            else{
                $res = array('success'=>true, 'message'=>'No active product application or pending retention paymetns!!');

            }
            
            DB::table('tra_retentionregeration_logs')->insert($retentionregeration_log);
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
    public function getRetentionReport(Request $req, $inCall=0){
     try {
        $retention_yearfrom = $req->input('retention_yearfrom');
        $retention_yearto = $req->input('retention_yearto');
        $section_id = $req->input('section_id');
        $retention_status_id = $req->input('retention_status_id');
        $where_status = array(); 
        $where_section = array(); 
         $start = $req->input('start');
            $limit = $req->input('limit');
        $qry = DB::table("tra_product_retentions as t1")
                    ->join("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                    ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                    ->leftJoin("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                    ->leftJoin("tra_invoice_details as t5",'t4.id','=','t5.invoice_id')
                    ->leftJoin("par_currencies as t7",'t4.paying_currency_id','=','t7.id')
                    ->leftJoin("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                    ->leftJoin("wb_trader_account as t9",'t4.applicant_id','=','t9.id')
                    ->leftJoin("par_common_names as t10",'t3.common_name_id','=','t10.id')
                    ->leftJoin("tra_product_retentionspayments as t11",'t1.id','=','t11.retention_id')
                    ->leftJoin("tra_payments as t12",'t11.retention_receipt_id','=','t12.id')
                     ->select(DB::raw("t1.id, t4.reference_no,t1.id as retention_id, t2.registration_no as certificate_no, YEAR(t1.retention_year) AS retention_year, YEAR(t1.next_retention_year) AS nextretention_year, t3.brand_name,t4.invoice_no,t4.date_of_invoicing, t4.PayCntrNum, t7.name AS currency, (t5.total_element_amount) AS invoice_amount, (t5.total_element_amount*t5.paying_exchange_rate) AS  invoice_amounttshs, t8.name AS retention_status,t9.name as trader_name,t9.identification_no, t9.email, t9.postal_address, t9.physical_address, t9.telephone_no, t10.name as common_name, (t12.amount_paid*t12.exchange_rate) as paid_amounttshs"));

        if(validateIsNumeric($retention_status_id)){
            $where_status = array('t1.retention_status_id'=>$retention_status_id);
        }
        if(validateIsNumeric($section_id)){
            $where_section = array('t3.section_id'=>$section_id);
        }
            $where_filterdates = '';
            if( validateIsNumeric($retention_yearto) && validateIsNumeric($retention_yearfrom)){
                $where_filterdates  = " YEAR(t1.retention_year) BETWEEN '".$retention_yearfrom."' and  '".$retention_yearto."'";
            }
            else if(validateIsNumeric($retention_yearfrom)){
                $where_filterdates  = " YEAR(t1.retention_year) >= '".$retention_yearfrom."'";
                
            }else if(validateIsNumeric($retention_yearto)){
                
                $where_filterdates  = " YEAR(t1.retention_year) <= '".$retention_yearto."'";
                
            }
            $qry->where($where_status);
            $qry->where($where_section);
            
            if ($where_filterdates != '') {
                $qry->whereRAW($where_filterdates);
            }
           $filter = $req->input('filter');
           $whereClauses = array();
           $filter_string = '';

            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'brand_name' :
                                $whereClauses[] = "t3.brand_name like '%" . ($filter->value) . "%'";
                                break;
                            case 'reference_no' :
                                $whereClauses[] = "t4.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'certificate_no' :
                                $whereClauses[] = "t2.registration_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'invoice_no' :
                                $whereClauses[] = "t4.invoice_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'trader_name' :
                                $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                break;
                                 case 'identification_no' :
                                $whereClauses[] = "t9.identification_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'common_name' :
                                $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                break;
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                     if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }
                if ($filter_string != '') {
                   $qry->whereRAW($filter_string);
               }
            
            $count = $qry->count();
            if(isset($start)&&isset($limit)){
                $records = $qry->groupBy('t4.id')->skip($start)->take($limit)->get();
            }else{
                $records = $qry->groupBy('t4.id')->get();
            }
            //$records = $qry->get();
            
            $res = array(
                'success' => true,
                'results' => $records,
                'totals' => $count,
                'message' => 'All is well'
            );

    if($inCall == 1){
        return array('results'=>$records, 'heading'=>'Retention Report('.Carbon::now().')');
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
   public function sendProductRetentionChargesNotifications(Request $req){
    try{
            $retention_year = $req->retention_year;
            $trader_id = $req->trader_id;
            //the details 
            $where = array();
            $where_filterdates = '';
            if(validateIsNumeric($trader_id)){
                $where['applicant_id'] = $trader_id;
            }
           
            $records = DB::table('tra_product_retentions as t1')
                        ->join('tra_application_invoices as t2', 't1.invoice_id', 't2.id')
                        ->join('wb_trader_account as t3', 't2.applicant_id', 't3.id')
                        ->leftJoin('par_regions as t4', 't3.region_id', 't4.id')
                        ->leftJoin('par_countries as t5', 't3.country_id', 't5.id')
                        ->select("t3.id as applicant_id", "t3.email as trader_email",'t3.name as applicant_name', 't4.name as region_name', 't5.name as country_name', 't3.postal_address')
                        ->take(1)
                        ->where($where);
                        if(validateIsNumeric($retention_year)){
                            $where_filterdates  = " YEAR(t1.retention_year) = '".$retention_year."'";
                            
                        }
                        if ($where_filterdates != '') {
                            $qry->whereRAW($where_filterdates);
                        }
                        $data = array();
                        $records= $records->groupBy('t3.id')->get();
            foreach($records as $rec){
                    $email_address = $rec->trader_email;
                    $applicant_id = $rec->applicant_id;
                    
                    $applicant_name = $rec->applicant_name;
                    
                    //get the documetns and submits
                    $retention_statement = $this->generateRetentionInvoiceStatement($req, $applicant_id,$rec);

                   $notification= sendMailNotification($applicant_name, $email_address,'Product Retention Invoice Statement',$email_content,'','',$retention_statement,'Product Retention Invoice Statement',$template_id, $vars);
                    
                   
    
                   if($notification['success']){
                        $data[] = array('applicant_id'=>$applicant_id, 
                            'retention_year'=>$retention_year,
                            'applicant_email'=>$email_address,
                            'retention_statement'=>$retention_statement,
                            'notification_sent'=>1,
                            'notified_on'=>Carbon::now(),
                            'created_on'=>Carbon::now(),
                            'created_by'=>$user_id
                        );
                   }
                   else{
                        $data[] = array('applicant_id'=>$applicant_id, 
                            'retention_year'=>$retention_year,
                            'applicant_email'=>$email_address,
                            'retention_statement'=>$retention_statement,
                            'notification_sent'=>0,
                            'notified_on'=>Carbon::now(),
                            'created_on'=>Carbon::now(),
                            'created_by'=>$user_id
                        );
                   }
                   echo "Retention Notification Sent successfully";
                    //save the
            }
            $size= 500;
                $chunks = array_chunk($retentionregeration_log, $size);
                foreach ($chunks as $chunk) {
                        DB::table('tra_retentionregeration_logs')->insert($chunk);
                }
                echo "Retention Notification Completed successfully";
                
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
    return \response()->json($res);


}
public function generateRetentionInvoiceStatement($req, $applicant_id,$applicant_record){
                    try{
                                            PDF::setPrintHeader(false);
                                            PDF::setPrintFooter(false);
                                            PDF::AddPage('L');
                            $applicant_id = $req->applicant_id;
                            $section_id = $req->section_id;
                            $retention_year = $req->retention_year;
                            
                            
                            $retention_invoices = DB::table("tra_product_retentions as t1")
                                                    ->select(DB::raw("t4.reference_no,t1.id as retention_id, t2.registration_no as certificate_no, YEAR(t1.retention_year) AS retention_year, t1.reg_product_id,t3.brand_name,t4.invoice_no,t4.date_of_invoicing,t5.element_costs_id, t4.PayCntrNum as payment_controlno, t7.name AS currency, SUM(t5.element_amount) AS invoice_amount,t11.name as costs_element, SUM(t5.element_amount*t5.exchange_rate) AS  amount_in_tsh , t8.name AS retention_status,t9.name as applicant_name,t5.exchange_rate , t4.applicant_id"))
                                                    ->join("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                                                    ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                                                    ->join("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                                                    ->join("tra_invoice_details as t5",'t4.id','=','t5.invoice_id')
                                                    ->join("par_currencies as t7",'t4.paying_currency_id','=','t7.id')
                                                    ->join("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                                                    ->leftJoin("wb_trader_account as t9",'t4.applicant_id','=','t9.id')
                                                    ->leftJoin("element_costs as t10",'t5.element_costs_id','=','t10.id')
                                                    ->leftJoin("cost_elements as t11",'t10.element_id','=','t11.id')
                                                    ->where('t1.retention_status_id',1)
                                                    ->groupBy('t1.invoice_id');
                                
                                if(validateIsNumeric($section_id)){
                                    $retention_invoices->where('t3.section_id',$section_id );
                                }
                                $retention_period = '';
                                if(validateIsNumeric($retention_year)){
                                    $retention_invoices->whereRaw(" YEAR(t1.retention_year) <= '".$retention_year."'");
                                    $retention_period = 'for the year '.$retention_year;    
                                }
                                
                                if(validateIsNumeric($applicant_id)){
                                    $retention_invoices->where('t4.applicant_id',$applicant_id );
                                }
                                
                            $retention_invoices = $retention_invoices->get();
                            PDF::setPrintHeader(false);
                            PDF::setPrintFooter(false);
                            
                            PDF::SetFont('bookantiqua','B',11);
                            $this->getReportheaderlandscape('Retention Fee Proforma Invoice '.$retention_period); 
                            
                            PDF::Cell(0,2,'',0,1);
                            //PDF::Cell(117);
                            PDF::SetFont('bookantiqua','',11);
                            PDF::Cell(0,4,'Print Date: '.date('d/m/Y'),0,1,'R');
                            PDF::SetFont('bookantiqua','B',10);
                            //PDF::Cell(0,3,'',0,1);
                            
                            PDF::Cell(52,3,"Customer's Name: ",0,0,'L');
                            PDF::SetFont('bookantiqua','',10);
                            PDF::Cell(100,5,$applicant_record->applicant_name,0,1,'L');
                            PDF::SetFont('bookantiqua','B',10);
                        
                            PDF::Cell(52,3,"Address: ",0,0,'L');
                            PDF::SetFont('bookantiqua','',10);
                            
                            PDF::Cell(100,3,$applicant_record->postal_address.','.$applicant_record->region_name.', '.$applicant_record->country_name,0,1,'L');
                            
                        if($retention_invoices){
                            
                                    PDF::Cell(0,2,'',0,1,'L');
                                
                                    PDF::SetFont('bookantiqua','B',9);
                                    //PDF::Cell(10);
                                            
                                    $data=array();
                                    //reg_product_id 
                                    $tot_rec_inv=0;
                                    $tot_inv_usd=0;
                                    $tot_inv_tshs=0;
                                    //the headings 
                                    PDF::MultiCell(7, 8, 'No',1,'','',0);
                                                                        
                                                        PDF::MultiCell(50, 8, 'Brand Name',1,'','',0);
                                                                        
                                                        PDF::MultiCell(40, 8, 'Registration No',1,'','',0);
                                                        PDF::MultiCell(40, 8, 'Description',1,'','',0);
                                                        PDF::MultiCell(15, 8, 'Year',1,'','',0);
                                                        PDF::MultiCell(30, 8,'Invoice No',1,'','',0);
                                                        PDF::MultiCell(30, 8,'Payment Control No:',1,'','',0);
                                                        PDF::MultiCell(20, 8,'Amount',1,'','',0);
                                                        PDF::MultiCell(20, 8,'Currency',1,'','',0);
                                                        PDF::MultiCell(0, 8, 'Amount(tsh)',1,'','',1);
                                    
                                                                //50 45 30 25 35
                                                                
                                    $i = 1;
                                    $dimensions = PDF::getPageDimensions();
                        $hasborder = false;
                        
                        $currency_usd = '';
                        $currency_tshs = '';
                        
                                    foreach($retention_invoices as $retention_invoice){
                                        
                                    PDF::SetFont('bookantiqua','',9);
                                        $row = $retention_invoice;
                                        $reg_product_id = $retention_invoice->reg_product_id;
                                        $retention_id = $retention_invoice->retention_id;
                                                
                                                        
                                                            $reference_no = $row->reference_no;
                                                            $invoice_no = $row->invoice_no;
                                                            $date_of_invoicing = $row->date_of_invoicing;
                                                            $currency = $row->currency;
                                                            $exchange_rate = $row->exchange_rate;
                                                            $invoice_amount = $row->invoice_amount;
                                                            $amount_in_tsh = $row->amount_in_tsh;
                                                            $element_costs_id = $row->element_costs_id;
                                                            $payment_controlno = $row->payment_controlno;
                                                            //get invoice desription
                                                            
                                                            $retention_year = $row->retention_year;
                                                            $costs_element = $row->costs_element;
                                                            //get the product details 
                                                            $brand_name = $row->brand_name;
                                                            $certificate_no = $row->certificate_no;
                                                            
                                                            
                                                            $rowcount = 0;
                                                            
                                                            
                                                                $rowcount = 0;
                                                                    
                                                                    $rowcount = max(PDF::getNumLines($brand_name, 55),PDF::getNumLines($invoice_no, 35),PDF::getNumLines($amount_in_tsh, 30),PDF::getNumLines($certificate_no, 35),PDF::getNumLines($costs_element, 20),PDF::getNumLines($payment_controlno, 35));
                                                                    
                                                                    $startY = PDF::GetY();
                                                                    if (($startY + $rowcount * 5) + $dimensions['bm'] > ($dimensions['hk'])) {
                                                
                                                                        if ($hasborder) {
                                                                            $hasborder = false;
                                                                        }else {
                                                                            PDF::Ln();
                                                                            PDF::Cell(0,5,'','T'); 
                                                                            PDF::Ln();
                                                                        }
                                                                        $borders = 'LTR';
                                                                    } elseif ((ceil($startY) + $rowcount * 5) + $dimensions['bm'] == floor($dimensions['hk'])) {
                                                                        
                                                                        $borders = 'LRB';   
                                                                        $hasborder = true; 
                                                                    } else {
                                                                        //normal cell
                                                                        $borders = 'LR';
                                                                    }
                                                                
                                                                
                                                                PDF::MultiCell(7, $rowcount* 5, $i,1,'','',0);
                                                                
                                                                PDF::MultiCell(50, $rowcount* 5, $brand_name,1,'','',0);
                                                                
                                                                PDF::MultiCell(40, $rowcount* 5, $certificate_no,1,'','',0);
                                                                
                                                                PDF::MultiCell(40, $rowcount* 5, $costs_element,1,'','',0);
                                                                PDF::MultiCell(15,  $rowcount* 5, $retention_year,1,'','',0);
                                                                PDF::MultiCell(30, $rowcount* 5, $invoice_no,1,'','',0);
                                                                PDF::MultiCell(30, $rowcount* 5, $payment_controlno,1,'','',0);
                                                                PDF::MultiCell(20, $rowcount* 5, formatMoney($invoice_amount),1,'','',0);
                                                                PDF::MultiCell(20, $rowcount* 5, $currency,1,'','',0);
                                                                PDF::MultiCell(0, $rowcount* 5, formatMoney($amount_in_tsh),1,'','',1);
                                                        
                                                        $currency_tshs = 'Tsh';
                                                                $tot_inv_tshs = $tot_inv_tshs+$amount_in_tsh;
                                                                
                                                        $i = $i+1;
                                                
                                    }
                                    
                                    PDF::SetFont('bookantiqua','B',9);
                                    PDF::Cell(35);
                                                            PDF::Cell(20,3,'',0,0);
                                                            PDF::Cell(140);
                                                            PDF::Cell(35,5,'',0,0);
                                                            PDF::Cell(20,5,'Total Tshs',0,0);
                                                            PDF::Cell(5);
                                                            PDF::Cell(20,5,formatMoney($tot_inv_tshs),'T',0);
                                                            PDF::Cell(20,5,'',0,1);
                                    
                                    PDF::SetFont('bookantiqua','',10);
                                    PDF::Ln();
                                    //PDF::Cell(10);
                                    PDF::MultiCell(0,6,'1.We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct.',0,'L');
                                    PDF:: Cell(0, 4, 'All payments are based on the government payment platform using the Control Number Indicated on the Invoice Statement.', 0, 1);
                                    
                                    PDF::Cell(0,3,'',0,1);
                                    
                                    PDF::Cell(0,3,'',0,1);
                                
                                    PDF::Cell(0,6,'',0,1);
                                    
                            
                            
                        }
                        
                        $report = PDF::Output('Retention Statement.pdf','S');
                            
                        $res = array('success'=>true, 'report'=>$report);
                        } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                        } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                        }
                    
                    return $res;
                    
                }
   public function exportRevenueReportsData(request $req){//getRetentionReport
        
  //data capture
        $function=$req->function;
        $response=$this->$function($req,1);
        $data=$response['results'];
        $heading=$response['heading'];
        $data_array = json_decode(json_encode($data), true);

//product application details
        $ProductSpreadsheet = new Spreadsheet();
        $sheet = $ProductSpreadsheet->getActiveSheet();
       // $ProductSpreadsheet->getActiveSheet()->setTitle($heading);
        $cell=0;


        
//Main heading style
        $styleArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
                    'rotation' => 90,
                    'startColor' => [
                        'argb' => 'FFA0A0A0',
                    ],
                    'endColor' => [
                        'argb' => 'FFFFFFFF',
                    ],
                ]
            ];
          $styleHeaderArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ]
            ];

      if(isset($data_array[0])){
          $header=array_keys($data_array[0]);
          $length=count($header);
       }
       else{
          $data_array=array();
          $header=array();
          $length=1;
          $sheet->getCell('A2')->setValue("No data");
       }

       $size=count($data_array)+7;

  //add sn column
       $sheet->insertNewColumnBefore('A', 1);

  //adding formats to header
       array_unshift($header,"S/N");
       $sheet->fromArray($header, null, "A7");

  //loop data while writting
       $sheet->fromArray( $data_array, null,  "B8");

  //add S/N counter 
       for($i=8; $i <= $size; $i++){
          $sheet->getCell('A'.$i)->setValue($i-7);
       }
        $length = $length+1; //add one for the new column added 
        $letter=number_to_alpha($length,"");
      
  //set cell text wrap true for all columns
        $cellRange = 'A7:'.$letter.''.$size;
        $sheet->getStyle($cellRange)->getAlignment()->setWrapText(true);
        $sheet->getColumnDimension('A')->setAutoSize(true);

  //add heading title
        $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
            ->setValue("TANZANIAN MEDICINE AND MEDICAL DEVICES AGENCY\nP.O. Box 77150, Nelson Mandela Road,Mabibo External\nTell : +255 22 2450512/2450751/2452108 Fax : +255 28 2541484\nWebsite: www.tfda.go.tzEmail: info@tfda.go.tz\n".$heading);
        $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
        $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);

      //format row headers 
       $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);

      //create file
       $writer = new Xlsx($ProductSpreadsheet);
         

      $response =  new StreamedResponse(
          function () use ($writer) {
              $writer->save('php://output');
          }
      );
      $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $response->headers->set('Content-Disposition', 'attachment;filename='.$req->filename.Carbon::now()->format('Y_m_d').'.xlsx');
      $response->headers->set('Cache-Control','max-age=0');


     return $response;
    }
}

