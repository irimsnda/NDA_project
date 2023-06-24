<?php

namespace Modules\Systemnotifications\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SystemnotificationsController extends Controller
{
     /**
     * Display a listing of the resource.
     * @return Response
     */
    protected $base_url;
    public function __construct(Request $req)
    {
        $this->base_url = url('/');
       
    }

    /**
     * Show the form for creating a new resource.
     * @return Response
     */
    public function submitInvoiceNotifications()
    {
        try {
            //the invoices details 
            $notificationstart_date = date('2020-08-10');
            $invoices_records = DB::table('tra_application_invoices as t1')
                                    ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
                                    ->select('t2.email','t2.name as trader_name', 't1.module_id', 't1.applicant_id','t1.id as invoice_id', 't1.application_code','t1.application_id','t1.invoice_no', 'PayCntrNum', 't1.*')
                                    ->whereRaw("(PayCntrNum != '' and PayCntrNum is not null) and date_format(date_of_invoicing, '%Y-%m-%d') >= '".$notificationstart_date."'")
                                    ->where('t1.id',126867)
                                    ->where('notification_status_id',1)
                                    ->get();
            foreach($invoices_records as $rec){
                
                $invoice_id = $rec->invoice_id;
                $applicant_email = 'hiramwachira@gmail.com';//$rec->email;
                $invoice_no = $rec->invoice_no;

                $invoice_details = getInvoiceDetails($rec->module_id, $rec->application_id,$rec->application_code);
                $params = array(
                    'invoice_id' => $invoice_id,
                    'process_name' => $invoice_details['process_name'],
                    'module_name' => $invoice_details['module_name'],
                    'module_desc' => $invoice_details['module_desc'],
                    'reference_no' => $invoice_details['reference_no'],
                    'base_url' => $this->base_url
                );
                
                $report = generateJasperReport('invoiceReport', 'invoice', 'pdf', $params);
                 $vars = array(
                        '{reference_no}' => $rec->reference_no,
                        '{invoice_no}' => $rec->invoice_no,
                        '{invoice_date}' => $rec->date_of_invoicing
                    );
                //check if the payment has been made 
                $payment_rec = DB::table('tra_payments')->where('invoice_id',$invoice_id)->first();
                if(!$payment_rec){
                         $email_notification = applicationInvoiceEmail(5, $applicant_email, $vars, $report, 'invoice_' . $invoice_no);
                        if(!$email_notification){
                            $data = array('invoice_no'=>$rec->invoice_no, 
                                    'PayCntrNum'=>$rec->PayCntrNum,
                                    'application_code'=>$rec->application_code,
                                    'trader_name'=>$rec->trader_name,
                                    'notification_sent_on'=>Carbon::now(),
                                    'notification_sent_to'=>$applicant_email,
                                    'notification_status_id'=>2,
                                    'created_on'=>Carbon::now()
                                );
                           
                            DB::table('tra_paymentinvoices_notifications')->insert($data);

                            $where = array('id'=>$invoice_id);
                            $data_update = array('notification_status_id'=>2, 'dola'=>Carbon::now());
                            DB::table('tra_application_invoices as t')->where($where)->update($data_update);
                echo "Successfully sent";
                        }
                        else{
                            $data = array('invoice_no'=>$rec->invoice_no, 
                                    'PayCntrNum'=>$rec->PayCntrNum,
                                    'application_code'=>$rec->application_code,
                                    'trader_name'=>$rec->trader_name,
                                    'notification_sent_on'=>Carbon::now(),
                                    'notification_sent_to'=>$applicant_email,
                                    'notification_status_id'=>1,
                                    'created_on'=>Carbon::now()
                                );
                        
                            DB::table('tra_paymentinvoices_notifications')->insert($data);
                            echo "Successfully sent";
                        }
                    
                }
                else{
                     $data = array('invoice_no'=>$rec->invoice_no, 
                            'PayCntrNum'=>$rec->PayCntrNum,
                            'application_code'=>$rec->application_code,
                            'trader_name'=>$rec->trader_name,
                            'notification_sent_on'=>Carbon::now(),
                            'notification_sent_to'=>$applicant_email,
                            'notification_status_id'=>3,
                            'created_on'=>Carbon::now()
                        );
                   
                    DB::table('tra_paymentinvoices_notifications')->insert($data);

                    $where = array('id'=>$invoice_id);
                    $data_update = array('notification_status_id'=>3, 'dola'=>Carbon::now());
                    DB::table('tra_application_invoices')->where($where)->update($data_update);
                echo "Successfully sent";
                }
               
            }$res = array(
                'success' => true,
                'message' => 'sent successfully'
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
    //payments 
    public function submitReceiptNotifications()
    {
        try {
            //the invoices details 
            $notificationstart_date = date('2020-08-10');
            $payments_records = DB::table('tra_payments as t1')
                                    ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
                                    ->select('t2.email','t2.name as trader_name', 't1.module_id', 't1.applicant_id','t1.id as receipt_id', 't1.application_code','t1.application_id','t1.invoice_id', 't1.*')
                                   // ->whereRaw(" date_format(trans_date, '%Y-%m-%d') >= '".$notificationstart_date."'")
                                   ->where('t1.id',302383)
                                    ->where('notification_status_id',1)
                                    ->get();
            foreach($payments_records as $rec){
                
                $payment_id = $rec->payment_id;
                $receipt_no = $rec->receipt_no;
                $applicant_email = 'hiramwachira@gmail.com';//$rec->email;
                $invoice_no = $rec->invoice_id;

                $params = array(
                    'paymnent_id' => $payment_id,
                    'receipt_id' => $payment_id,
                    'reference_no' => $reference_no,
                    'base_Url' => $this->base_url,
                     'base_url' => $this->base_url,
                    'sign_url' => $this->sign_url
                );  
                 $report = generateJasperReport('receiptReport', 'receipt_' . time(), 'pdf', $params);
                
                $email_notification = applicationInvoiceEmail(20, $applicant_email, $vars, $report, 'receipt' . $receipt_no);
                        if(!$email_notification){

                            $data = array('receipt_no'=>$rec->receipt_no, 
                                    'application_code'=>$rec->application_code,
                                    'trader_name'=>$rec->trader_name,
                                    'notification_sent_on'=>Carbon::now(),
                                    'notification_sent_to'=>$applicant_email,
                                    'notification_status_id'=>2,
                                    'created_on'=>Carbon::now()
                                );
                           
                            DB::table('tra_paymentinvoices_notifications')->insert($data);

                            $where = array('id'=>$payment_id);
                            $data_update = array('notification_status_id'=>2, 'dola'=>Carbon::now());
                            DB::table('tra_payments as t')->where($where)->update($data_update);
                echo "Successfully sent";
                        }
                        else{
                            $data = array('invoice_no'=>$rec->invoice_no, 
                                    'PayCntrNum'=>$rec->PayCntrNum,
                                    'application_code'=>$rec->application_code,
                                    'trader_name'=>$rec->trader_name,
                                    'notification_sent_on'=>Carbon::now(),
                                    'notification_sent_to'=>$applicant_email,
                                    'notification_status_id'=>1,
                                    'created_on'=>Carbon::now()
                                );
                        
                            DB::table('tra_paymentinvoices_notifications')->insert($data);
                            echo "Successfully sent";
                        }
                
               
            }$res = array(
                'success' => true,
                'message' => 'sent successfully'
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
    public function submitProductExpiryDueNotification(Request $req){
        try{


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

}
