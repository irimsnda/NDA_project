<?php

namespace Modules\APIIntegrations\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use traderAccount;
use Modules\Auth\Http\Controllers\Auth;
use Illuminate\Support\Carbon;

class PaymentsIntegrationController extends Controller
{
   
    protected $mis_app_id;
    protected $mis_app_client;
    protected $external_api_client;

    protected $systemid;
    protected $spcode;
    protected $subspcode;
    protected $gepgurl;
    protected $gepg_port;

    public function __construct(Request $req)
    {
        
            $mis_app_id = Config('constants.api.mis_app_client_id');
            $this->mis_app_client = DB::table('oauth_clients')->where('id', $mis_app_id)->first();
            $external_api_id = Config('constants.api.external_api_client_id');
            $this->external_api_client = DB::table('oauth_clients')->where('id', $external_api_id)->first();

            $this->systemid = Config('constants.gepg.systemid'); 
            $this->spcode = Config('constants.gepg.spcode'); 
            $this->subspcode = Config('constants.gepg.subspcode'); 
            $this->gepgurl = Config('constants.gepg.gepgurl'); 
            $this->gepg_port = Config('constants.gepg.gepg_port'); 
            

    }
    function generateUniqueNo(){
                //use the php mt_rand ( int $min , int $max ) function 
                $identification_no = mt_rand(10000000,999999999);
                return $identification_no;
        
        
    }
    public function gepgReconcResp(Request $req){
    try{
        $res = '';
                        $username = $req->username;
                        $password = $req->password;
                        $reconciliation_date = $req->reconciliation_date;
                        
                        $access_token = $this->authenticateApiUser($username,$password,$req);
                        if($access_token != ''){
                                            
                                $dataPOST = trim(file_get_contents('php://input'));
                                $dataPOST= preg_replace('/(<\?xml[^?]+?)utf-16/i','$1utf-8',$dataPOST);
                                
                                $xmlData = simplexml_load_string($dataPOST);
                                //print_r('data');
                                $cert_store = $file_path."gepgclientprivatekey.pfx";
                                if (!file_exists($cert_store) || !file_get_contents($cert_store)) {
                                    
                                    echo "Error: Unable to read the cert file\n";
                                    exit;
                                    
                                     
                                }   
                                if(!empty($xmlData)){
                                                $signature = $xmlData->gepgSignature;
                                                $SpReconcReqId = $xmlData->ReconcBatchInfo->SpReconcReqId;
                                                //$xmlData = $xmlData->ReconcTrans;
                                                //var_dump($xmlData->gepgSpReconcResp->ReconcTrans);
                                                
                                                foreach($xmlData->gepgSpReconcResp->ReconcTrans->ReconcTrxInf as $ReconcTrxInf)
                                                {
                                                    $data = array('SpBillId'=> $ReconcTrxInf->SpBillId,
                                                                 'BillCtrNum'=> $ReconcTrxInf->BillCtrNum,
                                                                 'pspTrxId'=> $ReconcTrxInf->pspTrxId,
                                                                 'PaidAmt'=> $ReconcTrxInf->PaidAmt,
                                                                 'CCy'=> $ReconcTrxInf->CCy,
                                                                 'PayRefId'=> $ReconcTrxInf->PayRefId,
                                                                 'TrxDtTm'=> $ReconcTrxInf->TrxDtTm,
                                                                 'CtrAccNum'=> $ReconcTrxInf->CtrAccNum,
                                                                 'UsdPayChnl'=> $ReconcTrxInf->UsdPayChnl,
                                                                 'PspName'=> $ReconcTrxInf->PspName,
                                                                 'PspCode'=> $ReconcTrxInf->PspCode,
                                                                 'DptCellNum'=> $ReconcTrxInf->DptCellNum,
                                                                 'DptName'=> $ReconcTrxInf->DptName,
                                                                 'DptEmailAddr'=> $ReconcTrxInf->DptEmailAddr,
                                                                 'Remarks'=>$ReconcTrxInf->Remarks,
                                                                 'SpReconcReqId'=>$SpReconcReqId
                                                                 );
                                                    
                                                    DB::table('tra_gepg_payment_reconciliation')->insert($data);
                            
                            
                                                }
                            
                            $xml_data = '<gepgSpReconcRespAck>'.
                                            '<ReconcStsCode>7101</ReconcStsCode>'.                                  
                                        '</gepgSpReconcRespAck>';
                                                                                        
                                        $cert_store = file_get_contents($cert_store);
                                        if (openssl_pkcs12_read($cert_store, $cert_info, "tfda!@2018keys"))   
                                        {
                                            openssl_sign($xml_data, $signature, $cert_info['pkey'], "sha1WithRSAEncryption");
                                                
                                            //output crypted data base64 encoded
                                            $signature = base64_encode($signature);         
                                            
                                        } //xml_data
                                        $xml_data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                        //$data_string = $xml_data;
                                        echo $xml_data;
                            
                            
                            }
                        }
    }catch(\Exception $e){
                    $res = $e;
        }catch(\Throwable $throwable){
                $res = $throwable;
        
        }
    
    
}
    public function gepgReconcReq(Request $req){
            try{
                        $res = '';
                        $username = $req->username;
                        $password = $req->password;
                        $reconciliation_date = $req->reconciliation_date;
                        
                        $access_token = $this->authenticateApiUser($username,$password,$req);
                        if($access_token != ''){
                            $systemId = $this->systemid;
                            $SpCode= $this->spcode;
                            $SubSpCode = $this->subspcode;
                            $GePGURL = $this->gepgurl;
                            $gepg_port =  $this->gepg_port;
                            
                            $url = $this->gepgurl.'/api/reconciliations/sig_sp_qrequest';   
                            $file_path = getcwd().'/backend/resources/gepg_keys/';
    
                            $cert_store = $file_path."gepgclientprivatekey.pfx";
                            if (!file_exists($cert_store) || !file_get_contents($cert_store)) {
                                
                                echo "Error: Unable to read the cert file\n";
                                exit;
                                
                                 
                            }   
                            $cert_store = file_get_contents($cert_store);
                                
                            $SpReconcReqId = $this->generateUniqueNo();
                                 $xml_data ='<gepgSpReconcReq>'.
                                        '<SpReconcReqId>'.$SpReconcReqId.'</SpReconcReqId>'.
                                        '<SpCode>'.$SpCode.'</SpCode>'.
                                        '<SpSysId>'.$systemId.'</SpSysId>'.
                                        '<TnxDt>'.formatDate($reconciliation_date).'</TnxDt>'.
                                        '<ReconcOpt>1</ReconcOpt>'.
                                 '</gepgSpReconcReq>';
                                 $date = formatDate($reconciliation_date);
                                 $data = array('SpReconcReqId'=>$SpReconcReqId, 'TnxDt'=>$date, 'ReconcOpt'=>1);
                                 DB::table('tragepg_payment_reconciliation_requests')->insert($data);
                                            
                                
                                if (openssl_pkcs12_read($cert_store, $cert_info, "tfda!@2018keys"))   
                                {
                                    
                                    openssl_sign($xml_data, $signature, $cert_info['pkey'], "sha1WithRSAEncryption");
                                    
                                    //output crypted data base64 encoded
                                    $signature = base64_encode($signature);         
                                    $data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                    
                                    $resultCurlPost = "";
            
                                    $data_string = $data;
                                    
                                    $ch = curl_init($url);
                                    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);  
                                    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                                    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
                                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                                    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                                                        'Content-Type:application/xml',
                                                        'Gepg-Com:default.sp.in',
                                                        'Gepg-Code:SP166',
                                                        'Content-Length:'.strlen($data_string))
                                               );
                                               
                                    curl_setopt($ch, CURLOPT_TIMEOUT, 200);
                                    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 200);

                                    $resultCurlPost = curl_exec($ch);
                                    curl_close($ch);
                                    //2214 11 3 8 22 11
                                    //var_dump($resultCurlPost);
                                    if(!empty($resultCurlPost)){
                                        $xml = simplexml_load_string($resultCurlPost);
                                        $signature = $xml->gepgSignature;
                                        $xml = $xml->gepgSpReconcReqAck;
                                        $response_code =  (int)$xml->ReconcStsCode;
                                        
                                        //Tags used in substring response content
                                        $datatag = "gepgSpReconcReqAck";
                                        $sigtag = "gepgSignature";
                                
                                        //Get data and signature from response
                                        $vdata = getDataString($resultCurlPost,$datatag);
                                        $vsignature = getSignatureString($resultCurlPost,$sigtag);
                                        
                                        $xml_data = '<gepgSpReconcReqAck>'.
                                                '<ReconcStsCode>'.$response_code.'</ReconcStsCode>'.                                    
                                            '</gepgSpReconcReqAck>';
                                            
                                        if (!file_get_contents($cert_store)) {
                                            
                                            echo "Error: Unable to read the cert file\n";
                                            exit;
                                        }
                                        
                                        //echo $response;
                                        $signature = base64_encode($signature);
                                        
                                        if (openssl_pkcs12_read($cert_store, $cert_info, "tfda!@2018keys"))   
                                        {
                                            openssl_sign($xml_data, $signature, $cert_info['pkey'], "sha1WithRSAEncryption");
                                                
                                            //output crypted data base64 encoded
                                            $signature = base64_encode($signature);         
                                            
                                        } //xml_data
                                        $xml_data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                    //$data_string = $xml_data;
                                        echo $xml_data;
                                        
                                    }
                                    else
                                    {
                                        echo "No result Returned"."\n";
                                    }
                                }
                                else{
                                    
                                    echo "In-correct Certificate File";
                                }
                            
                        }
            }catch(\Exception $e){
                        echo  $exception;
            }catch(\Throwable $throwable){
                        echo $throwable;
                
            }   
            
        }
        public function postBillSubmissionRequest(Request $req){
            
                    try{
                        $res = '';
                        $username = $req->username;
                        $password = $req->password;
                    
                        $access_token = $this->authenticateApiUser($username,$password,$req);
                        
                        if(isset($access_token->error)){
                            
                            //  echo $access_token->error_description;
                                //exit;
                            
                            
                        }
                        
                        if($access_token){
                            $file_path = getcwd().'/backend/resources/gepg_keys/';
    
                            $url = $this->gepgurl.'/api/bill/sigqrequest';
                            $cert_store = $file_path."gepgclientprivatekey.pfx";

                            if (!file_exists($cert_store) || !file_get_contents($cert_store)) {
                    
                                echo "Error: Unable to read the cert file\n";
                                exit;
                            }
                            $cert_store = file_get_contents($cert_store);
                            
                            $where_date =   " date_format(t1.date_of_invoicing, '%Y-%m-%d') >= '2018-08-19'";
                            $sql = DB::table('tra_application_invoices as t1')
                                                ->select(DB::raw("t1.invoice_no,t1.invoice_amount AS inv_amount,t1.date_of_invoicing, 'System Invoice' as created_by,SUM(t2.total_element_amount) AS  invoice_amount,PayCntrNum,t1.paying_exchange_rate as exchange_rate,t1.paying_currency_id as currency_id,t1.applicant_id,t3.name AS  applicant_name,gepgsubmission_status_id,t3.email as email_address ,t3.telephone_no"))
                                                ->join('tra_invoice_details as t2', 't1.id','=','t2.invoice_id')
                                                ->join('wb_trader_account as t3', 't1.applicant_id','=','t3.id')
                                                ->where(array('t1.gepgsubmission_status_id'=>1))
                                                ->whereRAW($where_date)
                                                ->whereIn('t1.id',[54652,54651,54650,54649,54648])
                                                ->groupBy('t1.id')
                                                ->get();
                                        
                                if($sql){
                                        foreach($sql as $rows){
                                            
                                                $bill_expiry_date = date("Y-m-d\TH:i:s", strtotime(date("Y-m-d", strtotime($rows->date_of_invoicing)) . " + 1 year"));
                                                $prepared_on = date('Y-m-d\TH:i:s', strtotime($rows->date_of_invoicing));
                                                $invoice_no = $rows->invoice_no;
                                                $invoice_amount = $rows->invoice_amount;
                                                $applicant_id = $rows->applicant_id;
                                                $currency_id = $rows->currency_id;
                                                $exchange_rate = $rows->exchange_rate;
                                                $email_address = $rows->email_address;
                                                $telephone_no = $rows->telephone_no;
                                                $applicant_name = $rows->applicant_name;
                                                

                                                if($currency_id == 1){
                                                        $currency = 'USD';
                                                        $BillPayOpt=2;
                                                }
                                                else{
                                                        $currency = 'TZS';
                                                        $BillPayOpt=3;
                                                }
                                                
                                                $equivalent_amount = ($invoice_amount*$exchange_rate);
                                                $applicant_name = htmlentities($applicant_name,ENT_QUOTES,'UTF-8');
                                                
                                                $email_address = $this->validateEmail($email_address);
                                                $telephone_no = $this->validatePhoneNo($telephone_no);
                                                //xml data 
                                                $xml_data ='<gepgBillSubReq>'.
                                                            '<BillHdr>'.
                                                                '<SpCode>'.$this->spcode.'</SpCode>'.
                                                                '<RtrRespFlg>true</RtrRespFlg>'.
                                                            '</BillHdr>'.
                                                            '<BillTrxInf>'.
                                                                    '<BillId>'.$rows->invoice_no.'</BillId>'.
                                                                    '<SubSpCode>'.$this->subspcode.'</SubSpCode>'.
                                                                    '<SpSysId>'.$this->systemid.'</SpSysId>'.
                                                                    '<BillAmt>'. $invoice_amount.'</BillAmt>'.
                                                                    '<MiscAmt>0</MiscAmt>'.
                                                                    '<BillExprDt>'.$bill_expiry_date.'</BillExprDt>'.
                                                                    '<PyrId>'.$applicant_id.'</PyrId>'.
                                                                    '<PyrName>'.$applicant_name.'</PyrName>'.
                                                                    '<BillDesc>TFDA Application Invoice</BillDesc>'.
                                                                    '<BillGenDt>'.$prepared_on.'</BillGenDt>'.
                                                                    '<BillGenBy>'.$rows->created_by.'</BillGenBy>'.
                                                                    '<BillApprBy>'.$rows->created_by.'</BillApprBy>'.
                                                                    '<PyrCellNum>'.$telephone_no.'</PyrCellNum>'.
                                                                    '<PyrEmail>'.$email_address.'</PyrEmail>'.
                                                                    '<Ccy>'.$currency.'</Ccy>'.
                                                                    '<BillEqvAmt>'.$equivalent_amount.'</BillEqvAmt>'.
                                                                    '<RemFlag>true</RemFlag>'.
                                                                    '<BillPayOpt>'.$BillPayOpt.'</BillPayOpt>'.
                                                                '<BillItems>'.
                                                                    '<BillItem>'.
                                                                        '<BillItemRef>'.$rows->invoice_no.'</BillItemRef>'.
                                                                        '<UseItemRefOnPay>N</UseItemRefOnPay>'.
                                                                        '<BillItemAmt>'.$invoice_amount.'</BillItemAmt>'.
                                                                        '<BillItemEqvAmt>'.$equivalent_amount.'</BillItemEqvAmt>'.
                                                                        '<BillItemMiscAmt>0</BillItemMiscAmt>'.
                                                                        '<GfsCode>140396</GfsCode>'.
                                                                    '</BillItem>'.
                                                                '</BillItems>'.
                                                                '</BillTrxInf>'.  
                                                        '</gepgBillSubReq>';
            echo "<br/>processing of ".$invoice_no;
                                                        if (openssl_pkcs12_read($cert_store, $cert_info, "tfda!@2018keys"))   
                                                        {
                                                                                    
                                                                                openssl_sign($xml_data, $signature, $cert_info['pkey'], "sha1WithRSAEncryption");
                                                                                    
                                                                                $signature = base64_encode($signature);  
                                                                                $data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                                                                
                                                                                $resultCurlPost = "";
                                                        
                                                                                $data_string = $data;
                                                                                
                                                                                $ch = curl_init($url);
                                                                                curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);  
                                                                                curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                                                                                curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
                                                                                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                                                                                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                                                                                                    'Content-Type:application/xml',
                                                                                                    'Gepg-Com:default.sp.in',
                                                                                                    'Gepg-Code:'.$this->spcode,
                                                                                                    'Content-Length:'.strlen($data_string))
                                                                                            );
                                                                                            
                                                                                curl_setopt($ch, CURLOPT_TIMEOUT, 200);
                                                                                curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 200);

                                                                                $resultCurlPost = curl_exec($ch);
                                                                                curl_close($ch);
                                                                                $xml = simplexml_load_string($resultCurlPost);
                                                                                
                                                                                if(!empty($resultCurlPost)){
                                                                                                    $response_code =  (int)$xml->gepgBillSubReqAck->TrxStsCode;
                                                                                                    $BillId =  (int)$xml->gepgBillSubReqAck->BillId;
                                                                                                                        
                                                                                                    if($response_code == 7101){
                                                                                                                $res = "Success - Bill Content Successfully submitted".$invoice_no;
                                                                                                    }
                                                                                                    else if($response_code == 7242){
                                                                                                                $res = "Failed - Bill Content Irregular".$invoice_no;
                                                                                                    }
                                                                                                    else{ 
                                                                                                                $res = "Failed - General Error";
                                                                                                    }
                                                                                                    //Tags used in substring response content
                                                                                                    $datatag = "gepgBillSubReqAck";
                                                                                                    $sigtag = "gepgSignature";
                                                                                                    
                                                                                                    $xml_data = '<gepgBillSubReqAck>'.
                                                                                                            '<TrxStsCode>'.$response_code.'</TrxStsCode>'.                                  
                                                                                                        '</gepgBillSubReqAck>';
                                                                                                    $url = $this->gepgurl.'/api/bill/sigqrequest';
                                                                                                    if (!file_exists($cert_store) || !file_get_contents($cert_store)) {
                        
                                                                                                            echo "Error: Unable to read the cert file\n";
                                                                                                            exit;
                                                                                                    }
                                                                                                    
                                                                                                    $cert_store = file_get_contents($cert_store);
                                                                                                    $signature = base64_encode($signature);
                                                                                                    $xml_data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                                                                                
                                                                                                    echo $xml_data;
                                                                                                    
                                                                                                    if($response_code != 7101){

                                                                                                                                        $created_on = date('Y-m-d H:i:s');
                                                                                                                                        $inv_data = array('gepgsubmission_status_id'=>3, 'dola'=> Carbon::now);
                                                                                                                                        DB::table('tra_application_invoices')->where(array('invoice_no'=>$invoice_no))->update($inv_data);

                                                                                                                                        $data = array('invoice_no'=>$invoice_no, 
                                                                                                                                                                    'error_response'=>$xml,
                                                                                                                                                                    'response_code'=>$response_code, 
                                                                                                                                                                    'created_on'=>Carbon::now());
                                                                                                                                        DB::table('gepg_failed_billsresponses')
                                                                                                                                                ->insert($data);

                                                                                                    }
                                                                                                    else{
                                                                                                        
                                                                                                                        $created_on = date('Y-m-d H:i:s');
                                                                                                                        $inv_data = array('gepgsubmission_status_id'=>2, 'dola'=> Carbon::now);
                                                                                                                        DB::table('tra_application_invoices')
                                                                                                                                ->where(array('invoice_no'=>$invoice_no))
                                                                                                                                ->update($inv_data);


                                                                                                    }
                                                                                                    
                                                                                                    continue;
                                                                                    
                                                                                    
                                                                                }
                                                                                else
                                                                                {
                                                                                    echo "No result Returned"."\n";
                                                                                }
                                                        }else{
                                                            echo "In-correct Certificate File";
                                                        }

                                        }
                                }

                        }
                        else{

                            $res = "Authentication Failed";

                        }
                        
                    }catch(\Exception $exception){
                                $res = $exception;
                    }catch(\Throwable $throwable){
                            $res = $throwable;
                    
                    }
                    echo $res;

        }
        //gepgRetentionBillCanclResp
        
        public function gepgBillCanclResp(Request $req){
                    try{
                        $res = '';
                        $username = $req->username;
                        $password = $req->password;
                        $access_token = $this->authenticateApiUser($username,$password,$req);
                        if($access_token != ''){
                                $sql = DB::table('tra_application_invoicescancellation as t1')->where(array('is_reversed !='=>1));
                                if($sql){
                                        foreach($sql as $rows){
                                            $invoice_no = $row->invoice_no;
                                            $payment_controlno = $row->PayCtrNum;
                                            $reference_no = $row->reference_no;
                                            $xml_data ='<gepgBillCanclReq>'.
                                                        '<SpCode>'.$this->spcode.'</SpCode>'.
                                                        '<SpSysId>'.$this->systemid.'</SpSysId>'.
                                                        '<BillId>'.$invoice_no.'</BillId>'.
                                                '</gepgBillCanclReq>';
                                                $file_path = getcwd().'/backend/resources/gepg_keys/';
                                                $cert_store = $file_path."gepgclientprivatekey.pfx";
                                                if (openssl_pkcs12_read($cert_store, $cert_info, "tfda!@2018keys"))   
                                                    {
                                                        
                                                        openssl_sign($xml_data, $signature, $cert_info['pkey'], "sha1WithRSAEncryption");
                                                        
                                                        //output crypted data base64 encoded
                                                        $signature = base64_encode($signature);         
                                                        $data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                                        
                                                        $resultCurlPost = "";
                                
                                                        $data_string = $data;
                                                        
                                                        $ch = curl_init($url);
                                                        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);  
                                                        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
                                                        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
                                                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                                                        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                                                                            'Content-Type:application/xml',
                                                                            'Gepg-Com:default.sp.in',
                                                                            'Gepg-Code:'.$this->spcode,
                                                                            'Content-Length:'.strlen($data_string))
                                                                    );
                                                                    
                                                        curl_setopt($ch, CURLOPT_TIMEOUT, 200);
                                                        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 200);

                                                        $resultCurlPost = curl_exec($ch);
                                                        curl_close($ch);
                                                        $xml = simplexml_load_string($resultCurlPost);
                                                        //2214 11 3 8 22 11
                                            
                                                        if(!empty($resultCurlPost)){
                                                            $signature = $xml->gepgSignature;
                                                            $xml = $xml->gepgBillCanclResp;
                                                                                                    $response_code =  (int)$xml->BillCanclTrxDt->TrxStsCode;
                                                                                                    $TrxSts =  $xml->BillCanclTrxDt->TrxSts;
                                                                                                    $TxnStsCode =  (int)$xml->BillCanclTrxDt->TxnStsCode;
                                                                                                    $BillId =  (int)$xml->BillCanclTrxDt->BillId;
                                                            
                                                            //Tags used in substring response content
                                                            $datatag = "gepgBillSubReqAck";
                                                            $sigtag = "gepgSignature";
                                                            
                                                            //Get data and signature from response
                                                            $vdata = getDataString($resultCurlPost,$datatag);
                                                            $vsignature = getSignatureString($resultCurlPost,$sigtag);
                                                            if($response_code == 7283){
                                                                        
                                                                                                                            $inv_data = array('is_reversed'=>1, 'dola'=> Carbon::now);
                                                                                                                            DB::table('tra_application_invoicescancellation')
                                                                                                                                    ->where(array('invoice_no'=>$invoice_no))
                                                                                                                                    ->update($inv_data);
                                                                        $response = "Success - Bill Content Successfully cancelled";
                                                                        
                                                            }
                                                            else if($response_code == 7242){
                                                                        $response = "Failed - Bill Content Irregular";
                                                            }//7102
                                                            else{ 
                                                                        $response = "Failed - General Error";
                                                            }
                                                            $xml_data = '<gepgBillCanclRespAck>'.
                                                                    '<TrxStsCode>'.$response_code.'</TrxStsCode>'.                                  
                                                                '</gepgBillCanclRespAck>';
                                                            $url = $this->gepgurl.'/api/bill/sigqrequest';
                                                            if (!file_exists($cert_store) || !file_get_contents($cert_store)) {
                        
                                                                echo "Error: Unable to read the cert file\n";
                                                                exit;
                                                            }
                                                            
                                                        
                                                            $signature = base64_encode($signature);
                                                            
                                                            if (openssl_pkcs12_read($cert_store, $cert_info, "tfda!@2018keys"))   
                                                            {
                                                                openssl_sign($xml_data, $signature, $cert_info['pkey'], "sha1WithRSAEncryption");
                                                                    
                                                                $signature = base64_encode($signature);         
                                                                
                                                            } //xml_data
                                                            $xml_data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                                            
                                                            echo $xml_data;
                                                            
                                                        }
                                                        else
                                                        {
                                                            echo "No result Returned"."\n";
                                                        }
                                                    }
                                                    else{
                                                        
                                                        echo "In-correct Certificate File";
                                                    }
                                
                                            

                                        }
                                }
                        }else{

                            $res = "Authentication Failed";

                        }
                }catch(\Exception $e){
                            $res = $exception;
                }catch(\Throwable $throwable){
                        $res = $throwable;
                
                }
                echo $res;

        }
        public function gepgBillSubResp(Request $req){
            try{

                $res = '';
                $username = $req->username;
                $password = $req->password;
                $dataPOST = $req->all();
                $file_path = getcwd().'/backend/resources/gepg_keys/';

                $access_token = $this->authenticateApiUser($username,$password,$req);
                
                if($access_token != ''){
                        $dataPOST = trim(file_get_contents('php://input'));
                        $dataPOST= preg_replace('/(<\?xml[^?]+?)utf-16/i','$1utf-8',$dataPOST);
                        $xmlData = simplexml_load_string($dataPOST);
                        $cert_store = $file_path."gepgclientprivatekey.pfx";
                        if(!empty($xmlData)){
                
                                        $signature = $xmlData->gepgSignature;
                                        $xmlData = $xmlData->gepgBillSubResp;
                                        $response_code =  (int)$xmlData->BillTrxInf->TrxStsCode;
                                        $TrxSts =  $xmlData->BillTrxInf->TrxSts;
                                        $PayCntrNum =  (int)$xmlData->BillTrxInf->PayCntrNum;
                                         $invoice_no =  (int)$xmlData->BillTrxInf->BillId;
                                            
                                                if($PayCntrNum != ''){
                                                     $inv_counter = DB::table('tra_application_invoices')
                                                                 ->where(array('PayCntrNum'=>$PayCntrNum))
                                                                 ->count();
                                                                
                                                            if($inv_counter ==0){
                                                                $inv_data = array('gepgsubmission_status_id'=>1, 'PayCntrNum'=> $PayCntrNum,'dola'=>Carbon::now());
                                                                DB::table('tra_application_invoices')
                                                                        ->where(array('invoice_no'=>$invoice_no))
                                                                        ->update($inv_data);

                                                                        $inv_data = array('PayCntrNum'=> $PayCntrNum,'dola'=>Carbon::now());
                                                                        DB::connection('db_lims')->table('sample_invoicing_details')
                                                                                ->where(array('invoice_no'=>$invoice_no))
                                                                                ->update($inv_data);
                                                                        
                                                                        $inv_data = array('PayCntrNum'=> $PayCntrNum,'dola'=>Carbon::now());
                                                                        DB::connection('db_lims')->table('applicaton_invoices')
                                                                                        ->where(array('invoice_no'=>$invoice_no))
                                                                                        ->update($inv_data);
                                                                                        
                                                                    $response = "Success - Bill Content Successfully received";

                                                            }
                                                            else{
                                                                $response_code = '7226';
                                                                $response = "Success - Control No already Exists";
                                                                
                                                            }
                                                            
                                                }
                                                else{
                                                                    $created_on = date('Y/m/d H:i:s');
                                                                    $inv_data = array('gepgsubmission_status_id'=>3, 'PayCntrNum'=> $PayCntrNum,'dola'=>Carbon::now());
                                                                    DB::table('tra_application_invoices')
                                                                            ->where(array('invoice_no'=>$invoice_no))
                                                                            ->update($inv_data);
                                                                    
                                                                            $data = array('invoice_no'=>$invoice_no, 
                                                                                                                                                                    'error_response'=>$xml,
                                                                                                                                                                    'response_code'=>$response_code, 
                                                                                                                                                                    'created_on'=>Carbon::now());
                                                                                                                                        DB::table('gepg_failed_billsresponses')
                                                                                                                                                ->insert($data);
                                                                    
                                                
                                                }
                                                $response_code = 7101;
                                                $response = "Success - Bill Content Successfully received";
                                                                                        
                                                $xml_data = '<gepgBillSubRespAck>'.
                                                                                                    '<TrxStsCode>'.$response_code.'</TrxStsCode>'.                                  
                                                                                                '</gepgBillSubRespAck>';
                                                
                                                if (openssl_pkcs12_read($cert_store, $cert_info, "tfda!@2018keys"))   
                                                {
                                                    openssl_sign($xml_data, $signature, $cert_info['pkey'], "sha1WithRSAEncryption");
                                                    $signature = base64_encode($signature);         
                                                    
                                                } 
                                                $xml_data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                                echo $xml_data;
                            }

                }else{

                    $res = "Authentication Failed";

                }
        }catch(\Exception $e){
                    $res = $exception;
        }catch(\Throwable $throwable){
                $res = $throwable;
        
        }
}

public function gepgPmtSpInfo(Request $req){
                        try{

                            $res = '';
                            $username = $req->username;
                            $password = $req->password;
                            $dataPOST = $req->all();
                        $file_path = getcwd().'/backend/resources/gepg_keys/';

                            $access_token = $this->authenticateApiUser($username,$password,$req);
                            
                        $cert_store = $file_path."gepgclientprivatekey.pfx";
                        
                            if($access_token != ''){
                                $postData = file_get_contents('php://input');
                                $postData= preg_replace('/(<\?xml[^?]+?)utf-16/i','$1utf-8',$postData);
                                
                                $xml = simplexml_load_string($postData);
                                $xml = $xml->gepgPmtSpInfo->PymtTrxInf;
                                $TrxId = $xml->TrxId;
                                $PayRefId =  $xml->PayRefId;
                                $invoice_no = $xml->BillId;
                                $PayCtrNum = $xml->PayCtrNum;
                                $BillAmt = $xml->BillAmt;
                                $PaidAmt = $xml->PaidAmt;
                                $BillPayOpt = $xml->BillPayOpt;
                                $CCy = $xml->CCy;
                                $TrxDtTm = $xml->TrxDtTm;
                                $UsdPayChnl = $xml->UsdPayChnl;
                                $PyrCellNum = $xml->PyrCellNum;
                                $PyrName = $xml->PyrName;
                                $PyrEmail = validateEmail($xml->PyrEmail);
                                $PspReceiptNumber = $xml->PspReceiptNumber;
                                $PspName = $xml->PspName;
                                $usr_id = '';
                                $rec = DB::table('tra_application_invoices')
                                                ->where(array('invoice_no'=>$invoice_no, 'PayCntrNum'=>$PayCtrNum))
                                                ->first();
                                $invoice_id = '';
                                if($rec){
                                            $invoice_id = $rec->id; 
                                }           //tra_payments
                                $count = DB::table('tra_payments')
                                                ->where(array('id'=>$invoice_id, 'PayCtrNum'=>$PayCtrNum,'amount_paid'=>$PaidAmt,'transaction_id'=>$PayRefId))
                                                ->count();
                                if($count == 0){
                                            $count = DB::table('gepg_goverment_paymentdetails')
                                                                ->where(array('PayCtrNum'=>$PayCtrNum))
                                                                ->count();
                                            if($count == 0){
                                                        $receipt_no = generateReceiptNo(499);
                                                        $data = array('receipt_no'=>$receipt_no,
                                                                                    'TrxId'=>$TrxId,
                                                                                    'PayRefId'=>$PayRefId,
                                                                                    'invoice_no'=>$invoice_no,
                                                                                    'PayCtrNum'=>$PayCtrNum,
                                                                                    'BillAmt'=>$BillAmt,
                                                                                    'PaidAmt'=>$PaidAmt,
                                                                                    'BillPayOpt'=>$BillPayOpt,
                                                                                    'CCy'=>$CCy,
                                                                                    'TrxDtTm'=>$TrxDtTm,
                                                                                    'UsdPayChnl'=>$UsdPayChnl,
                                                                                    'PyrCellNum'=>$PyrCellNum,
                                                                                    'PyrName'=>$PyrName,
                                                                                    'PyrEmail'=>$PyrEmail,
                                                                                    '$PspReceiptNumber'=>$PspReceiptNumber,
                                                                                    'PspName'=>$PspName,
                                                                                    'created_on'=>Carbon::now(),
                                                                                    'created_by'=>499
                                                                );
                                                                DB::table('gepg_goverment_paymentdetails')->insert($data);
                                                                $xml_data = '<gepgPmtSpInfoAck>'.
                                                                                                    '<TrxStsCode>7101</TrxStsCode>'.                                    
                                                                                                '</gepgPmtSpInfoAck>';
                                                                $receipt_response = $this->savePaymentsDetails($PspName,$CCy,$receipt_no,$invoice_id,$PayRefId,$PyrCellNum,$PspReceiptNumber,$PaidAmt,$PayCtrNum);
                                            }
                                }
                                else{
                                        $data = array('TrxId'=>$TrxId,
                                                        'PayRefId'=>$PayRefId,
                                                        'invoice_no'=>$invoice_no,
                                                        'PayCtrNum'=>$PayCtrNum,
                                                        'BillAmt'=>$BillAmt,
                                                        'PaidAmt'=>$PaidAmt,
                                                        'BillPayOpt'=>$BillPayOpt,
                                                        'CCy'=>$CCy,
                                                        'TrxDtTm'=>$TrxDtTm,
                                                        'UsdPayChnl'=>$UsdPayChnl,
                                                        'PyrCellNum'=>$PyrCellNum,
                                                        'PyrName'=>$PyrName,
                                                        'PyrEmail'=>$PyrEmail,
                                                        '$PspReceiptNumber'=>$PspReceiptNumber,
                                                        'PspName'=>$PspName,
                                                        'created_on'=>Carbon::now(),
                                                        'created_by'=>499
                                            );
                                    DB::table('gepg_goverment_paymentdetails')->insert($data);

                                }

                                                                                                $url = $this->gepgurl.'/api/bill/sigqrequest';
                                                                                                if (!file_exists($cert_store) || !file_get_contents($cert_store)) {
                        
                                                                                                    echo "Error: Unable to read the cert file\n";
                                                                                                    exit;
                                                                                                }
                                                                                                if (openssl_pkcs12_read($cert_store, $cert_info, "tfda!@2018keys"))   
                                                                                                {
                                                                                                    openssl_sign($xml_data, $signature, $cert_info['pkey'], "sha1WithRSAEncryption");
                                                                                                        
                                                                                                    //output crypted data base64 encoded
                                                                                                    $signature = base64_encode($signature);         
                                                                                                    
                                                                                                } //xml_data
                                                                                                $xml_data = '<Gepg>'.$xml_data.'<gepgSignature>'.$signature.'</gepgSignature></Gepg>';
                                                                                            //$data_string = $xml_data;
                                                                                                echo $xml_data;
                            }else{

                                $res = "Authentication Failed";

                            }

                    }catch(\Exception $e){
                                $res = $exception;
                    }catch(\Throwable $throwable){
                            $res = $throwable;
                    
                    }
                    echo $res;
    }

    function savePaymentsDetails($bank_name,$CCy,$receipt_no,$invoice_id,$transactionId,$phone_no,$payment_reference_no,$amount_paid,$PayCtrNum){
                        $usr_id = 418;//temporary
                        
                        $applicant_name = '';
                        $reference_no = '';
                        $zone_name = '';
                        $zone_id = '';
                        
                        
                        //new functionality batch management 
                        $batch_rec = DB::table('tra_batch_invoices_records as t1')
                                            ->join('tra_application_invoices as t2', 't1.app_invoice_id','t2.id')
                                            ->join('tra_invoice_details as t3', 't2.id','t3.invoice_id')
                                            ->select("t2.reference_no, t2.zone_id,t2.applicant_name,t2.invoice_no,t2.date_of_invoicing,t1.app_invoice_id, 'System Invoice' as created_by,SUM(t2.total_element_amount) AS  invoice_amount,PayCtrNum,t2.paying_exchange_rate as exchange_rate,t2.paying_currency_id as currency_id,t2.applicant_id")
                                            ->where(array('t1.batch_invoice_id'=>$invoice_id))
                                            ->groupBy('t2.id')
                                            ->get();
                        if($batch_rec){
                                $payment_balance = $amount_paid;
                                //update the
                                foreach($batch_rec as $brec){
                                        $app_invoice_id = $brec->app_invoice_id;
                                        $app_invoice_amount = $brec->invoice_amount;
                                        $app_currency_id = $brec->currency_id;
                                        $exchange_rate = $brec->exchange_rate;
                                        //check if payment received for the application 
                                        $payment_record = DB::table('tra_payments as t1')
                                                            ->where(array('app_invoice_id'=>$app_invoice_id))
                                                            ->first();
                                        if(!$payment_record){
                                                    if(($payment_balance >= $app_invoice_amount)){
                                                        $receipt_no = generateReceiptNo(499);
                                                        //update the 
                                                        $reference_no = $brec->reference_no;
                                                        $applicant_id = $brec->applicant_id;
                                                        $applicant_name = $brec->applicant_name;
                                                        $zone_id = $brec->zone_id;
                                                        $exchange_rate = $brec->exchange_rate;
                                                        if($inv_currency_id == $currency_id){
                                                            $invoice_amount = $app_invoice_amount;
                                                            
                                                        }
                                                        else{
                                                            if($inv_currency_id == 1 && $currency_id == 4){
                                                                $invoice_amount = $app_invoice_amount*$exchange_rate;
                                                                $exchange_rate = 1;
                                                            }
                                                            else{
                                                                
                                                                $invoice_amount =  $invoice_amount;
                                                            }
                                                            
                                                        }
                                                        $bank_id = getBankDetails($bank_name,$currency_id);
                                                        $rec = DB::table('tra_application_invoices as t1')
                                                            ->select(DB::raw("id as invoice_id,application_code,t1.*,application_id, invoice_no,applicant_id,applicant_name, zone_id,'' as zone_name, '' as group_no"))
                                                            ->where(array('id'=>$app_invoice_id))
                                                            ->first();
                                    $payment_data = array('application_code'=>$rec->application_code,
                                                                                'application_id'=>$rec->application_id,
                                                                                'reference_no'=>$rec->reference_no,
                                                                                'tracking_no'=>$rec->tracking_no,
                                                                                'amount_paid'=>$invoice_amount,
                                                                                '$applicant_name'=>$rec->applicant_name,
                                                                                'receipt_no'=>$receipt_no,
                                                                                'trans_date'=>Carbon::now(),
                                                                                'currency_id'=>$currency_id,
                                                                                'invoice_id'=>$rec->invoice_id,
                                                                                'applicant_id'=>$rec->applicant_id,
                                                                                'section_id'=>$rec->section_id,
                                                                                'module_id'=>$rec->module_id,
                                                                                'sub_module_id'=>$rec->sub_module_id,
                                                                                'receipt_type_id'=>1,
                                                                                'payment_mode_id'=>4,
                                                                                'trans_ref'=>$payment_reference_no,
                                                                                'bank_id'=>$bank_id,
                                                                                'PayCtrNum'=>$PayCtrNum,
                                                                                'payment_ref_no'=>$payment_reference_no,
                                                                                'transaction_id'=>$transactionId,
                                                                                'pay_phone_no'=>$phone_no,
                                                                                'zone_id'=>$zone_id,
                                                                                'payment_type_id'=>$payment_type_id,
                                                                                'exchange_rate'=>$exchange_rate,
                                                                                'created_on'=>Carbon::now(),
                                                                                'created_by'=>499
                                        );

                                        $result = insertRecord('tra_payments', $payment_data, $user_id);
                                        if($result['success']){
                                                    $receipt_id = $result['record_id'];
                                                    $check_retention  = DB::table('tra_product_retentions')
                                                                                                ->where(array('invoice_id'=>$invoice_id))
                                                                                                ->first();
                                                    if($check_retention){
                                                            $retention_data = array('receipt_id'=>$receipt_id,'retention_status_id'=>2, 'dola'=>Carbon::now());
                                                            DB::table('tra_product_retentions')
                                                                    ->where(array('invoice_id'=>$invoice_id))
                                                                    ->update($retention_data);

                                                    }
                                                    
                                                    $payment_data = array(
                                                                                    'reference_no'=>$rec->reference_no,
                                                                                    'tracking_no'=>$rec->tracking_no,
                                                                                    'amount_paid'=>$amount_paid,
                                                                                    '$applicant_name'=>$rec->applicant_name,
                                                                                    'receipt_no'=>$receipt_no,
                                                                                    'trans_date'=>Carbon::now(),
                                                                                    'currency_id'=>$currency_id,
                                                                                    'invoice_id'=>$rec->invoice_id,
                                                                                    'applicant_id'=>$rec->applicant_id,
                                                                                    'receipt_type_id'=>1,
                                                                                    'payment_mode_id'=>4,
                                                                                    'trans_ref'=>$payment_reference_no,
                                                                                    'bank_id'=>$bank_id,
                                                                                    'PayCtrNum'=>$PayCtrNum,
                                                                                    'payment_ref_no'=>$payment_reference_no,
                                                                                    'transaction_id'=>$transactionId,
                                                                                    'pay_phone_no'=>$phone_no,
                                                                                    'zone_id'=>$zone_id,
                                                                                    'exchange_rate'=>$exchange_rate,
                                                                                    'created_on'=>Carbon::now(),
                                                                                    'created_by'=>499
                                                                );
                                                                $check_lims  = DB::connection('lims_db')->table('applicaton_invoices')
                                                                                        ->where(array('invoice_no'=>$invoice_no))
                                                                                        ->first();
                                                                            if($check_lims){

                                                                                 insertRecord('payments', $payment_data, $user_id,'lims_db');

                                                                            }
                                                            //save payments reference details 
                                                            $this->funcSavePaymentreferenceno($amount_paid,$reference_no,$tracking_no,$receipt_id,$receipt_no,$invoice_no,$user_id,$currency_id,$exchange_rate);

                                                            return true;
                                                    }
                                            
                                        }
                                        else{
                                            //check if the control number macth
                                            $checkPayCtrNum = $payment_record->PayCtrNum;
                                            if($checkPayCtrNum != $PayCtrNum){
                                                
                                                
                                            }
                                            
                                        }
                                        
                                        
                                }
                            }
                        }
                        else{
                            $rec = DB::table('tra_application_invoices as t1')
                                            ->select(DB::raw("id as invoice_id,application_code,t1.*,application_id, invoice_no,applicant_id,applicant_name, zone_id,'' as zone_name, '' as group_no"))
                                            ->where(array('invoice_no'=>$invoice_no))
                                            ->first();
                
                                if($rec){
                                    $tracking_no = $rec->tracking_no;
                                    $reference_no = $rec->reference_no;
                                    $applicant_id = $rec->applicant_id;
                                    $applicant_name = $rec->applicant_name;
                                    $zone_id = $rec->zone_id;
                                    $exchange_rate = $rec->exchange_rate;
                                    $invoice_id = $rec->invoice_id;
                                    $payment_type_id = 1;
                                    $check_retention  = DB::table('tra_product_retentions')
                                                                                    ->where(array('invoice_id'=>$invoice_id))
                                                                                    ->first();
                                    if($check_retention){
                                        $payment_type_id = 2;
                                    }
                                    if($CCy == 'USD'){
                                        $currency_id = 1;
                                    }
                                    else{
                                        $currency_id = 4;
                                    }
                                    $bank_id = getBankDetails($bank_name,$currency_id);
                                    
                                    $payment_data = array('application_code'=>$rec->application_code,
                                                                                'application_id'=>$rec->application_id,
                                                                                'reference_no'=>$rec->reference_no,
                                                                                'tracking_no'=>$rec->tracking_no,
                                                                                'amount_paid'=>$amount_paid,
                                                                                '$applicant_name'=>$rec->applicant_name,
                                                                                'receipt_no'=>$receipt_no,
                                                                                'trans_date'=>Carbon::now(),
                                                                                'currency_id'=>$currency_id,
                                                                                'invoice_id'=>$rec->invoice_id,
                                                                                'applicant_id'=>$rec->applicant_id,
                                                                                'section_id'=>$rec->section_id,
                                                                                'module_id'=>$rec->module_id,
                                                                                'sub_module_id'=>$rec->sub_module_id,
                                                                                'receipt_type_id'=>1,
                                                                                'payment_mode_id'=>4,
                                                                                'trans_ref'=>$payment_reference_no,
                                                                                'bank_id'=>$bank_id,
                                                                                'PayCtrNum'=>$PayCtrNum,
                                                                                'payment_ref_no'=>$payment_reference_no,
                                                                                'transaction_id'=>$transactionId,
                                                                                'pay_phone_no'=>$phone_no,
                                                                                'zone_id'=>$zone_id,
                                                                                'payment_type_id'=>$payment_type_id,
                                                                                'exchange_rate'=>$exchange_rate,
                                                                                'created_on'=>Carbon::now(),
                                                                                'created_by'=>499
                                        );

                                        $result = insertRecord('tra_payments', $payment_data, $user_id);
                                        if($result['success']){
                                                    $receipt_id = $result['record_id'];
                                                    $check_retention  = DB::table('tra_product_retentions')
                                                                                                ->where(array('invoice_id'=>$invoice_id))
                                                                                                ->first();
                                                    if($check_retention){
                                                            $retention_data = array('receipt_id'=>$receipt_id,'retention_status_id'=>2, 'dola'=>Carbon::now());
                                                            DB::table('tra_product_retentions')
                                                                    ->where(array('invoice_id'=>$invoice_id))
                                                                    ->update($retention_data);

                                                    }
                                                    $payment_data = array(
                                                                                    'reference_no'=>$rec->reference_no,
                                                                                    'tracking_no'=>$rec->tracking_no,
                                                                                    'amount_paid'=>$amount_paid,
                                                                                    '$applicant_name'=>$rec->applicant_name,
                                                                                    'receipt_no'=>$receipt_no,
                                                                                    'trans_date'=>Carbon::now(),
                                                                                    'currency_id'=>$currency_id,
                                                                                    'invoice_id'=>$rec->invoice_id,
                                                                                    'applicant_id'=>$rec->applicant_id,
                                                                                    'receipt_type_id'=>1,
                                                                                    'payment_mode_id'=>4,
                                                                                    'trans_ref'=>$payment_reference_no,
                                                                                    'bank_id'=>$bank_id,
                                                                                    'PayCtrNum'=>$PayCtrNum,
                                                                                    'payment_ref_no'=>$payment_reference_no,
                                                                                    'transaction_id'=>$transactionId,
                                                                                    'pay_phone_no'=>$phone_no,
                                                                                    'zone_id'=>$zone_id,
                                                                                    'exchange_rate'=>$exchange_rate,
                                                                                    'created_on'=>Carbon::now(),
                                                                                    'created_by'=>499
                                                                );
                                                                $check_lims  = DB::connection('lims_db')->table('applicaton_invoices')
                                                                                        ->where(array('invoice_no'=>$invoice_no))
                                                                                        ->first();
                                                                            if($check_lims){

                                                                                 insertRecord('payments', $payment_data, $user_id,'lims_db');

                                                                            }
                                                            //save payments reference details 
                                                            $this->funcSavePaymentreferenceno($amount_paid,$reference_no,$tracking_no,$receipt_id,$receipt_no,$invoice_no,$user_id,$currency_id,$exchange_rate);

                                                            return true;
                                                }
                                                else{
                                                    return false;
                                                }

                                            }
                            
                        }
                        
}
function funcSavePaymentreferenceno($amount_paid,$reference_no,$tracking_no,$receipt_id,$receipt_no,$invoice_no,$user_id,$currency_id,$exchange_rate){
                    $currency_name = $this->getCurrencyname($currency_id);
                    //totalinvoice amount  
                    $total_invoiceamount =DB::table("tra_application as t1")
                                                                        ->table('tra_invoice_details as t2', 't1.id', '=','t2.invoice_id')
                                                                        ->select(DB::raw("SUM(t2.total_element_amount*t2.quantity) AS  totalinvoice_amount"))
                                                                        ->where(array('invoice_no'=>$invoice_no))
                                                                        ->first();
                    $sum_invoice = $total_invoiceamount->totalinvoice_amount;

                    if($sum_invoice >0){
                                        $records =DB::table("tra_application as t1")
                                                                                            ->table('tra_invoice_details as t2', 't1.id', '=','t2.invoice_id')
                                                                                            ->select(DB::raw("(t2.total_element_amount*t2.quantity) AS  invoice_amount,t2.element_costs_id, t1.*"))
                                                                                            ->where(array('invoice_no'=>$invoice_no))
                                                                                            ->get();

                                        foreach($records as $rec){
                                                    $invoice_amount = $rec->invoice_amount;
                                                    $cost_pecentage = ($invoice_amount/$sum_invoice);
                                                    $element_costs_id = $rec->element_costs_id;
                                                    $amount_paidinv =$amount_paid*$cost_pecentage;
                                                    $data = array('invoice_no'=>$invoice_no,
                                                                                'receipt_id'=>$receipt_id,
                                                                                'currency_id'=>$currency_id,
                                                                                'exchange_rate'=>$exchange_rate,
                                                                                'element_costs_id'=>$element_costs_id,
                                                                                'paid_on'=>Carbon::now(),
                                                                                'amount_paid'=>$amount_paidinv,
                                                                                'created_on'=>Carbon::now(),
                                                                                'created_by'=>$user_id
                                                                );
                                                    insertRecord('payments_references', $data, $user_id);
                                        }
                                        //the other integration details 
                                        $records =DB::table("tra_application as t1")
                                                                ->join('tra_invoice_details as t2', 't1.id', '=','t2.invoice_id')
                                                                ->join('element_costs as t3', 't2.element_costs_id', '=','t3.invoice_id')
                                                                ->leftJoin('par_gl_accounts as t4', 't3.gl_code_id', '=','t4.id')
                                                                ->leftJoin('par_zones as t5', 't1.zone_id', '=','t5.id')
                                                                ->select(DB::raw("sum(t2.total_element_amount*t2.quantity) AS  invoice_amount,t2.element_costs_id, t1.*, t5.name as zone_name,t4.description as cost_description, t5.epicor_code,t4.code as gl_account_code"))
                                                                ->where(array('invoice_no'=>$invoice_no))
                                                                ->groupBy('t4.id')
                                                                ->get();

                                        if($records){
                                                    foreach($records as $row){
                                                                $created_on = Carbon::now();
                                                                $cost_pecentage = ($row->invoice_amount/$sum_invoice);
                                                                $amount_paidinv =$amount_paid*$cost_pecentage;

                                                                $pay_record = $this->getPaymentDetails($receipt_no);

                                                                $data = array('receipt_no'=>$receipt_no,
                                                                                'invoice_no'=>$invoice_no,
                                                                                'reference_no'=>$reference_no,
                                                                                'tracking_no'=>$tracking_no,
                                                                                'applicant_id'=>$applicant_id,
                                                                                'payment_currency_id'=>$payment_currency_id,
                                                                                'payment_currency'=>$payment_currency,
                                                                                'exchange_rate'=>$exchange_rate,
                                                                                'trans_date'=>$payment_currency,
                                                                                'gl_account_code'=>$gl_account_code,
                                                                                'cost_description'=>$cost_description,
                                                                                'payment_amount'=>$amount_paidinv,
                                                                                'created_on'=>$created_on,
                                                                                'created_by'=>$user_id,
                                                                                'zone_name'=>$pay_record->zone_name,
                                                                                'zone_id'=>$pay_record->zone_id,
                                                                                'epicor_code'=>$pay_record->epicor_code,
                                                                                'payment_mode'=>$pay_record->payment_mode,
                                                                                'epicor_bank'=>$pay_record->epicor_bank,
                                                                                'trans_ref'=>$pay_record->trans_ref,
                                                                                'payment_ref_no'=>$pay_record->payment_ref_no,
                                                                                'created_on'=>Carbon::now(),
                                                                                'created_by'=>$user_id
                                                                );
                                                                insertRecord('epicor_payments_records', $data, $user_id);

                                                    }
                                        }
                    }


}

function getPaymentDetails($receipt_no){
                $data = '';
                        $rec = DB::table('tra_payments as t1')
                                                    ->select('t4.epicor_code', 't4.name as zone_name', 't1.zone_id', 't3.name as payment_mode', 't2.name as bank_name','t2.epicor_bank', 't1.trans_ref', 't1.payment_ref_no')
                                                    ->leftJoin('par_banks as t2','t1.bank_id', '=', 't2.id')
                                                    ->leftJoin('par_payment_modes as t3','t1.payment_mode_id', '=', 't3.id')
                                                    ->leftJoin('par_zones as t4','t1.zone_id', '=', 't4.id')
                                                    ->where(array('receipt_no'=>$receipt_no))
                                                    ->first();
                                                    
                    
                return $rec;
}

function getCurrencyname($currency_id){
                $currency_name = '';
                $rec = DB::table('par_currencies')
                                            ->where(array('id'=>$currency_id))
                                            ->first();

                if($rec){
                            
                        $currency_name = $rec->name;
                                
                }
            return $currency_name;

}
function getBankDetails($bank_name,$currency_id){
            $bank_id = 0;
            $rec = DB::table('gepg_bank_mapping')
                            ->where(array('currency_id'=>$currency_id, 'gepg_bank_name'=>$bank_name))
                            ->first();
                            
                if($rec){
                            $bank_id = $rec->bank_id;
                }
                return $bank_id;
    
}
        function validateEmail($email_address){
            $email_address = preg_replace('/\s+/', '', $email_address);
            // Check the formatting is correct
            if(filter_var($email_address, FILTER_VALIDATE_EMAIL) === false){
                $email_address = '';
            }
            return $email_address;
            
        }function validatePhoneNo($telephone){
                //remove white spaces
                $telephone = preg_replace('/\s+/', '', $telephone);
                $tel_value = '';
                $telephone = trim($telephone);
                //echo $telephone;
                $firstCharacter = substr($telephone, 0, 1);
                $tel_value = '';
                if($firstCharacter == '0'){
                    //check the string size
                    if(strlen($telephone) == 10){
                        
                        $tel_value = $telephone;
                    }
                    
                }
                else if($firstCharacter == '+'){
                    
                    $telephone = ltrim ($telephone,'+');
                    if(strlen($telephone) == 12){
                        
                        $tel_value = $telephone;
                    }
                    
                }
                
                return $tel_value;
            
        }
        
        function authenticateApiUser($username,$password,$request)
    {
        $access_token = '';
        $username = aes_encrypt($username);
        if (is_null($this->external_api_client)) {
            $res = array(
                'success' => false,
                'message' => 'API user not found!!'
            );
            return response()->json($res);
        }
        $request->request->add([
            'grant_type' => 'password',
            'provider' => 'apiusers',
            'client_id' => $this->external_api_client->id,
            'client_secret' => $this->external_api_client->secret,
            'username' => $username,
            'password' => $password
        ]);
        $tokenRequest = $request->create('/oauth/token', 'POST', $request->all());
                $token = \Route::dispatch($tokenRequest);
                
                 $token_details =   json_decode($token->getContent());
                    
                 if(isset($access_token->error)){
                    echo    $access_token->error_description;
                    exit();
                }
                
                return $token_details;
        }
        
}
