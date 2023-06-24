<?php

namespace App\Helpers;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Carbon\Carbon;
use GuzzleHttp\Client as Client;
use GuzzleHttp\Psr7;
use GuzzleHttp\RequestOptions;
use GuzzleHttp\Exception\RequestException;
use \CurlFile;
use App\User;
use Illuminate\Http\Request;

class PaymentIntHelper
{

   static function authPaymentIntegration()
    {
		$rrapayment_url = Config('constants.rrapayment.rrapayment_url').'rra.ws.auth/api/login';
		$usr_name = aes_decrypt(Config('constants.rrapayment.rrapayment_username'));
        
		$usr_password = aes_decrypt(Config('constants.rrapayment.rrapayment_userpassword'));
		$payloadName = array();
		$additionalHeaders = '';
	
		$login = $usr_name;
		$password = $usr_password;
		$url = $rrapayment_url;
		
        try {
           $client = new Client([
				'base_uri' => Config('constants.rrapayment.rrapayment_url'),
				'headers' => [
					'Accept' => 'application/json',
					'Content-Type' => 'application/json',
					'username' => $login,
					'password' => $usr_password
				]
			]);
			
            $res = $client->request('GET', 'rra.ws.auth/api/login', ['exceptions' => false]);

            $success = false;
            $success = false;
			//self::saveRrapaymentApplicationResponses('authPaymentIntegration', $response, 0, 0,0);
            if ($res->getStatusCode() == 200) {

                $res->getBody()->rewind();

                $response = json_decode((string)$res->getBody());
			
				$MessageCode = $response->MessageCode;
				if($MessageCode ==0){
					$ResponseObject = $response->ResponseObject;
					$data = array('success' => false,
								  'message' => $ResponseObject->Error);

				}
				else{
					$ResponseObject = $response->ResponseObject;
					$data = array('success' => true, 
								  'message' => $response->MessageDescription,
								  'refresh_token' => $ResponseObject->RefreshToken,
								  'access_token' => $ResponseObject->AccessToken);
				}
                

            } else if ($res->getStatusCode() == 403) {
                $res->getBody()->rewind();

                $response = json_decode((string)$res->getBody());
				$MessageCode = $response->MessageCode;
				
				
				if($MessageCode ==0){
					
					$ResponseObject = $response->ResponseObject;
					$data = array('success' => $success, 'message' => $ResponseObject->Error);

				}
                
            } else {
                $response = json_decode((string)$res->getBody());

                $data = array('success' => false, 'user_id' => $response->MessageDescription);

            }
        } catch (RequestException $e) {

            if ($e->hasResponse()) {
                $response_msg = $e->getMessage();
                $response = json_encode($response_msg);
                $data = array('success' => false, 'message' => $response);
				
            } else {
				
                $data = array('success' => false, 'message' => 'Check Payment Integration Connection.');
            }
        }
			
        return $data;
		}
		
	static function saveRrapaymentApplicationResponses($func_name, $func_responses, $invoice_no, $invoice_id,$application_code){
				$func_responses = serialize($func_responses);
			$data = array('func_name'=>$func_name, 
						 'func_responses'=>$func_responses, 
						 'invoice_no'=>$invoice_no, 
						 'invoice_id'=>$invoice_id, 
						 'application_code'=>$application_code,
						 'created_on'=>Carbon::now());
			DB::table('rrapayment_application_responses')->insert($data);
		
	}
	static function checkrraPaymentGatewayGetPayments($DocumentNumber,$invoice_id,$rrapayment_appinvoice_id,$application_code){
		
		try{
			$auth_resp = self::authPaymentIntegration();
			
			if($auth_resp['success']){
				
				$client = new Client([
						'base_uri' => Config('constants.rrapayment.rrapayment_url'),
							'headers' => [
								'Accept' => 'application/json',
								'Content-Type' => 'application/json',
								'Authorization'=>'Bearer '. $access_token
							]
						]);
						$table_data = (object)array('DocumentNumber'=>$DocumentNumber);
						
						$response = $client->request('GET','rra.ws.uni/webservices/nfr/checkPayment',
							['json' => $table_data]
						);
						
						$func_reresponse = json_decode((string)$response->getBody());
			
						self::saveRrapaymentApplicationResponses('checkrraPaymentGatewayGetPayments', $func_reresponse, $invoice_id, $rrapayment_appinvoice_id,$application_code);
						$success = false;
						
						if ($response->getStatusCode() == 200) {

							$response->getBody()->rewind();

							$response = json_decode((string)$response->getBody());
							
							$MessageCode = $response->MessageCode;
							if($MessageCode ==0){
								$ResponseObject = $response->Errors;
								$data = array('success' => false,
											  'message' => serialize($ResponseObject));

							}
							else{
								
								$ResponseObject = $response->ResponseObject;
								$DocumentNumber = $ResponseObject->DocumentNumber;
								
								$update_data = array('rra_submission_status'=>3,
													'dola'=>Carbon::now());
								DB::table('rrapayment_application_invoices as t1')
								->where($where_state)
								->update($update_data);
								
								DB::table('tra_application_invoices')
								->where(array('application_code'=>$application_code,'id'=>$invoice_id))
								->update($update_data);
								
								$data = array('success' => true, 'message' => $response->MessageDescription);

								
							}
							
						} else if ($res->getStatusCode() == 403) {
							$res->getBody()->rewind();

							$response = json_decode((string)$res->getBody());
							$MessageCode = $response->MessageCode;
							
								$data = array('success' => false, 'message' => $response->MessageDescription);

							
						}else if($res->getStatusCode() == 500){
							
							$res->getBody()->rewind();

							$response = json_decode((string)$res->getBody());
							
							$MessageCode = $response->MessageCode;
							
								$data = array('success' => false, 'message' => $response->MessageDescription);

						}
		
		}
		else{
			
		}
			
	
		}catch (RequestException $e) {
			
            if ($e->hasResponse()) {
                $response_msg = $e->getMessage();
                $response = json_encode($response_msg);

                $data = array('success' => false, 'message' => $response);

            } else {
                $data = array('success' => false, 'message' => 'Check Payment Integration Connection.');

            }
        }
		print_r($data);
		exit();
		return $data;
		
	}
	static function postInvoiceDetailsonDocumentNo($rrapayment_appinvoice_id,$invoice_id,$application_code){
		
		try{
			$auth_resp = self::authPaymentIntegration();
			
			if($auth_resp['success']){
				$access_token = $auth_resp['access_token'];
				$where_state = array('t1.id'=>$rrapayment_appinvoice_id, 'application_code'=>$application_code);
				
				$record = DB::table('rrapayment_application_invoices as t1')
							->leftJoin('modules as t2', 't1.module_id', 't2.id')
							->where($where_state)
							->where(array('rra_submission_status'=>2))
							->first();
					
				if($record){
					$invoice_id = $record->invoice_id;
						$rrwpayment_service_id = $record->rrwpayment_service_id;
						$table_data = array('ServiceId'=>$rrwpayment_service_id,
                            'Amount'=>$record->Amount,
                            'CurrencyId'=>$record->CurrencyId,
                            'Tin'=>$record->Tin,
                            'Name'=>$record->Name,
                            'ResidenceCountry'=>$record->ResidenceCountry,
                            'OriginCountry'=>$record->OriginCountry,
                            'LocationNo'=>128,
                            'Dob'=>'',
                            'Phone'=>$record->Phone,
                            'Email'=>$record->Email,
                            'Date'=>date('d-m-Y',strtotime($record->Date)),
                            'Type'=>2
                        );
						$client = new Client([
							'base_uri' => Config('constants.rrapayment.rrapayment_url'),
							'headers' => [
								'Accept' => 'application/json',
								'Content-Type' => 'application/json',
								'Authorization'=>'Bearer '. $access_token
							]
						]);
						
						$response = $client->request('POST','rra.ws.uni/webservices/nfr/getDocument',
							['json' => $table_data]
						);
						
						$func_reresponse = json_decode((string)$response->getBody());
			
						self::saveRrapaymentApplicationResponses('postInvoiceDetailsonDocumentNo', $func_reresponse, $record->invoice_id, $record->id,$record->application_code);
						$success = false;
						
						if ($response->getStatusCode() == 200) {

							$response->getBody()->rewind();

							$response = json_decode((string)$response->getBody());
							
							$MessageCode = $response->MessageCode;
							if($MessageCode ==0){
								$ResponseObject = $response->Errors;
								$data = array('success' => false,
											  'message' => serialize($ResponseObject));

							}
							else{
								$ResponseObject = $response->ResponseObject;
								$DocumentNumber = $ResponseObject->DocumentNumber;
								
								$update_data = array('rra_submission_status'=>1,
													'DocumentNumber'=>$DocumentNumber,
													'dola'=>Carbon::now());
								DB::table('rrapayment_application_invoices as t1')
								->where($where_state)
								->update($update_data);
								
								DB::table('tra_application_invoices')
								->where(array('application_code'=>$application_code,'id'=>$invoice_id))
								->update($update_data);
								
								$data = array('success' => true, 'message' => $response->MessageDescription);

								
							}
							
						} else if ($res->getStatusCode() == 403) {
							$res->getBody()->rewind();

							$response = json_decode((string)$res->getBody());
							$MessageCode = $response->MessageCode;
							if($MessageCode ==0){
								$data = array('success' => false, 'message' => $response->MessageDescription);

							}
							
						}else if($res->getStatusCode() == 500){
							
							$res->getBody()->rewind();

							$response = json_decode((string)$res->getBody());
							
							$MessageCode = $response->MessageCode;
							if($MessageCode ==0){
								$data = array('success' => false, 'message' => $response->MessageDescription);

							}
						}
					
				}
				else{
					
					$data = array('success' => false, 'message' => 'No Invoice details Found');
				}
			}
			else{
				
				 $data = $auth_resp;

			}
		}catch (RequestException $e) {
			
            if ($e->hasResponse()) {
                $response_msg = $e->getMessage();
                $response = json_encode($response_msg);

                $data = array('success' => false, 'message' => $response);

            } else {
                $data = array('success' => false, 'message' => 'Check Payment Integration Connection.');

            }
        }
		//print_r($table_data);
		print_r($data);
						exit();
		return $data;
	}
	
	static function saveSingleInvoiceDetailstoIntergration($invoice_id,$application_code,$paying_currency_id,$paying_exchange_rate,$user_id,$zone_id){
            $res = array('success'=>false,'message'=>'Error Occurred');
			
			$where_statement = array('t1.id'=>$invoice_id);
			if(validateIsNumeric($application_code)){
				$where_statement = array('t1.id'=>$invoice_id, 't1.application_code'=>$application_code);
			}
			$invoice_no = getSingleRecordColValue('tra_application_invoices',array('id'=>$invoice_id, 'application_code'=>$application_code), 'invoice_no');
			
            $record = DB::table('tra_application_invoices as t1')
            ->select(DB::raw("t1.invoice_no,t1.tracking_no,t1.reference_no, t1.invoice_amount AS inv_amount,t1.date_of_invoicing, 'System Invoice' as created_by,SUM(t2.total_element_amount) AS  invoice_amount,PayCntrNum,t1.paying_exchange_rate as exchange_rate,t1.paying_currency_id as currency_id,t1.applicant_id,t3.name AS  applicant_name, t3.email,t1.gepg_submission_status,t3.email as email_address ,t3.telephone_no,t3.tin_no,t5.rrwpayment_service_id, t4.rracountries_map_id"))
            ->join('tra_invoice_details as t2', 't1.id','=','t2.invoice_id')
            ->leftJoin('wb_trader_account as t3', 't1.applicant_id','=','t3.id')
            ->leftJoin('par_countries as t4', 't3.country_id','=','t4.id')
			->leftJoin('modules as t5', 't1.module_id', 't5.id')
            ->where($where_statement)
            ->groupBy('t1.id')
            ->first();
            if($record){
                    $data = array();
					$reference_no = $record->tracking_no;
					$invoice_id = $record->invoice_id;
					if($reference_no == '' || $reference_no == 0){
						
						$reference_no = $record->reference_no;
					}
                    $table_data = array('ServiceId'=>$record->rrwpayment_service_id,
                            'Amount'=>$record->invoice_amount,
                            'invoice_id'=>$record->invoice_id,
                            'reference_no'=>$reference_no,
                            'CurrencyId'=>$record->currency_id,
                            'exchange_rate'=>$record->exchange_rate,
                            'Tin'=>$record->tin_no,
                            'Name'=>$record->applicant_name,
                            'ResidenceCountry'=>$record->rracountries_map_id,
                            'OriginCountry'=>$record->rracountries_map_id,
                            'LocationNo'=>128,
                            'Dob'=>'',
                            'Phone'=>$record->telephone_no,
                            'Email'=>$record->email,
                            'Date'=>date('d-m-Y',$record->date_of_invoicing),
                            'Type'=>2,
                            'rra_submission_status'=>2,
                            'application_code'=>$record->application_code,
                            'module-id'=>$record->module_id,
                            'sub_module_id'=>$record->sub_module_id,
                            'applicant_id'=>$record->applicant_id,
                            'created_by'=>$user_id,
                            'created_on'=>Carbon::NOW()
                        );
                       
                       $res =  insertRecord('rrapayment_application_invoices', $table_data, $user_id);
						if($res['success']){
							$rrapayment_appinvoice_id = $res['record_id'];
							self::postInvoiceDetailsonDocumentNo($rrapayment_appinvoice_id,$invoice_id,$application_code);
						}
            }
			
            return $res;
   }
   static function funccheckPaymentREmittances(){
			
	   
	   
   }
   static function funccheckBatchPaymentRemittances(){
		
	   
	   
   }
}