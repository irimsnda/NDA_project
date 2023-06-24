<?php

namespace Modules\TraderManagement\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Ixudra\Curl\Facades\Curl;
use JWTAuth;
use Carbon\Carbon;
class TraderManagementController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        echo "weclome";
    }
    public function onTestCurl(){
      
       // $response = Curl::to('http://www.foo.com/bar')
       // ->get();
    }

    public function onUpdateTraderAccountDetails(Request $req){
       
        $trader_data = json_decode($req->traderData_sub);
        $name = $trader_data->name;
        
        $trader_category_id = 1;
        DB::beginTransaction();
         try{
                $db_name = DB::connection('mis_db')->getDatabaseName();
                 $record_id = $trader_data->id;
                 $data = array(
                     'traderaccount_type_id'=>$trader_data->traderaccount_type_id,
                     'contact_person'=>$trader_data->contact_person,
                     'contact_person_email'=>$trader_data->contact_person_email,
                     'contact_person_telephone'=>$trader_data->contact_person_telephone,
                     'physical_address'=>$trader_data->physical_address,
                     'postal_address'=>$trader_data->postal_address,
                     'telephone_no'=>$trader_data->telephone_no,
                     'mobile_no'=>$trader_data->mobile_no
                 );  
                 $where_app = array('id'=>$record_id);
                 $count = DB::connection('mis_db')->table('wb_trader_account')
                     ->where($where_app)
                     ->count();
                 if($count){
                    $previous_data = getPreviousRecords('wb_trader_account', $where_app,'mis_db');
                    $trader_no = $previous_data['results'][0]['identification_no']; 
                    $email_address = $previous_data['results'][0]['email']; 
                    $resp=   updateRecord('wb_trader_account', $previous_data, $where_app, $data, '','mis_db');
                    if(!$resp['success']){
                         return \response()->json(array('success'=>false,'message'=>$resp['message'])); 
                    }

                    $previous_data = getPreviousRecords('wb_trader_account', $where_app);
                    $resp=   updateRecord('wb_trader_account', $previous_data, $where_app, $data, '');
                    if(!$resp['success']){
                         return \response()->json(array('success'=>false,'message'=>$resp['message'])); 
                    }
                    
                     $subject = 'UPDATE OF CUSTOMER SELF SERVICE PORTAL ACCOUNT ';
                     
                                 $email_content = "We wish to acknowledge update of your account application details</br>.";
                                
                                 $email_content .= " - Trader Account No: ".$trader_no .".<br/>";
                                 $email_content .= " - Account Email Address: ".$email_address .".<br/>";
                                 $email_content.="<p>For more information visit authorities Web Portal for a full account access guide</p>  ";
                                 
                  //   $res = sendMailNotification($trader_data->name, $email_address,$subject,$email_content);
                     
                     
                     $res = array('success'=>true,'trader_no'=> $trader_no,'message'=>'Account updated successfully, the account details have also been sent to your email '.$email_address);
                     
                 }
               
         } catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
     }
    public function onAccountRegistration(Request $req){
       
       $trader_data = json_decode($req->traderData_sub);
       $name = $trader_data->name;
       
       $trader_category_id = 1;
       DB::beginTransaction();
        try{

                //handler the document upload
                $file = $req->file('tin_certificate');
					$tin_no = '';
				if(isset( $trader_data->tin_no)){
					$tin_no = $trader_data->tin_no;
				}
                
                if ($req->hasFile('tin_certificate')) {
                        $origFileName = $file->getClientOriginalName();
                        $extension = $file->getClientOriginalExtension();
                        $fileSize = $file->getClientSize();

                        $origFileName = $file->getClientOriginalName();
                        $extension = $file->getClientOriginalExtension();
                        $fileSize = $file->getClientSize();
                        
                        $destination = getcwd() .'/public/resources/upload/';
                        $savedName = str_random(3) . time() . '.' . $extension;

                        $file->move($destination, $savedName);
                        $document_path = $destination.$savedName;
                       
                        $document_type_id = 18;// env('DMS_TRADERDOCTYPE');
                        $document_site_id =  1;//env('DMS_APPDOCSITEID');
                       
                        $destination_node = getNonStructuredDestinationNode($document_type_id,$document_site_id);
                     
                }
               
                $trader_no = generateTraderNo('wb_trader_account');
                $data = array('name'=>$trader_data->name,
                    'contact_person'=>$trader_data->contact_person,
                    'contact_person_email'=>$trader_data->contact_person_email,
                    'country_id'=>$trader_data->country_id,
                    'region_id'=>$trader_data->region_id,
                    'district_id'=>$trader_data->district_id,
                    'physical_address'=>$trader_data->physical_address,
                    'postal_address'=>$trader_data->postal_address,
                    'telephone_no'=>$trader_data->telephone_no,
                    'mobile_no'=>$trader_data->mobile_no,
                    'email'=>$trader_data->email_address,
                    'status_id'=>1,
                    'identification_no'=>$trader_no,
                    "trader_category_id"=>$trader_category_id
                );  
                if(isset($data['tin_no'])){
                                
                        $data['tin_no'] = $tin_no;
                }
                //check for another
                $count = DB::table('wb_trader_account')
                ->where(array('email'=>$trader_data->email_address))
                ->count();
                if($count == 0){
                   $email_address = $trader_data->email_address;
                   $resp = insertRecord('wb_trader_account', $data, 'Create Account');
                   
                   $user_passwordData = str_random(8);
                   //had code for test
                  
                  // $user_password = 'slams123';
                   $uuid = generateUniqID();//unique user ID
                   $user_password = hashPwd($email_address, $uuid, $user_passwordData);
                   $trader_id = $resp['record_id'];
                   
                   $user_data = array('email'=> $email_address,
                                 'trader_id'=>$trader_id,
                                 'password'=>$user_password,
                                 'country_id'=>$trader_data->country_id,
                                 'telephone_no'=>$trader_data->telephone_no,
                                 'uuid'=>$uuid,
                                 'is_verified'=>1,
                                 'status_id'=>1,//as actve
                                 'account_roles_id'=>1,
                                 'created_by'=>'System',
                                 'identification_no'=>$trader_no,
                                 'created_on'=>date('Y-m-d H:i:s')
                            );
                    //the details //tin_no
                    
                    $resp = insertRecord('wb_traderauthorised_users', $user_data, 'Create Trader Users');
                  
                    $usr_id = $resp['record_id'];
                    $verification_code = str_random(30);
                    DB::table('wb_user_verifications')->insert(['user_id'=>$usr_id,'token'=>$verification_code]);
                    $data['portal_id'] = $trader_id;
                    //insert in MIS DB $table_name, $table_data,$con
                    
                    //insert infot the trader users 
                    //send an emails 
                    $subject = 'TMDA CUSTOMER SELF SERVICE PORTAL ACCOUNT DETAILS';
                    
								$email_content = "We wish to acknowledge receipt of your account application details</br>.";
								$email_content.= "Thank you for registering at TMDA Self Service portal and below are the account registration information</br>.";
								$email_content .= " - Trader Account No: '".$trader_no ."'.<br/>";
                                $email_content .= " - Account Email Address: '".$email_address ."'.<br/>";
                                $email_content .= " - Account User Password: '".$user_passwordData ."'.<br/>";

                                $email_content.="<p>For more information visit TMDA Web Portal for a full account access guide</p>  ";
                                
                    $res = sendMailNotification($trader_data->name, $email_address,$subject,$email_content);
					if($res['success']){
						$res = insertRecordNoAudit('wb_trader_account', $data,'mis_db');
					}

                    //get upload the tin certificate 
                    if(isset($destination_node) && $destination_node != '' && $req->hasFile('tin_certificate')){
                            $node_ref = $destination_node->node_ref;
                            //create the trader document
                            $document_name = 'TIN CERTIFICATE'.$trader_no.'.'.$extension;

                            $response = dmsUploadNodeDocument($node_ref,$document_path, $document_name,'');
                          
                            if($response['nodeRef']){
                                $node_ref = $response['nodeRef'];

                                $document_data = array('trader_id'=>$trader_id,
                                                    'document_type_id'=>$document_type_id,
                                                    'uploaded_on'=>Carbon::now(),
                                                    'uploaded_by'=>$email_address,
                                                    'file_name'=>$document_name,
                                                    'initial_file_name'=>$origFileName,
                                                    'file_type'=>$extension,
                                                    'node_ref'=>$node_ref,
                                                    'dola'=>Carbon::now(),
                                                    'altered_by'=>$email_address,
                                                   );
                                  $res = insertRecord('tra_traderdocuments_uploads', $document_data, $email_address, 'mis_db');

                            }
                    }
                    $resp = array('success'=>true,'trader_no'=> $trader_no,'message'=>'Account created successfully, the account details have also been sent to your email '.$email_address);
                    
                }else{
                         $resp = array('success'=>false,'message'=>'Account Has Already been registered, confirm in your email account or contact TMDA Authority for further enquiry.');
                }
            if($resp['success']){
                DB::commit();
            }
            else{
                DB::rollBack(); 
            }
        } catch (\Exception $e) {
            DB::rollBack();
            $resp = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $resp = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($resp);
    }
    public function onAccountUsersRegistration(Request $req){
        try{
            $email_address = $req->email_address;
            $trader_id = $req->trader_id;
            $traderemail_address = $req->traderemail_address;
            $password = $req->password;
            $id = $req->id;

            $rec = DB::table('wb_trader_account')->where('id', $trader_id)->first();
            if($rec){
                    if(validateIsNumeric($id)){
                        $where_app = array('id'=>$id);

                        $user_passwordData = $password;
                        //had code for test
                        
                        // $user_password = 'slams123';
                        $uuid = generateUniqID();//unique user ID
                        $user_password = hashPwd($email_address, $uuid, $user_passwordData);
                        
                        $user_data = array('email'=> $email_address,
                                        'password'=>$user_password,
                                        'uuid'=>$uuid,
                                        'is_verified'=>1,
                                        'status_id'=>1,//as actve
                                        'account_roles_id'=>1,
                                        'altered_by'=>$traderemail_address,
                                        'dola'=>date('Y-m-d H:i:s')
                                    );
                            //the details 
                            $previous_data = getPreviousRecords('wb_traderauthorised_users', $where_app);
                           
                            $resp=   updateRecord('wb_traderauthorised_users', $previous_data, $where_app, $user_data, $traderemail_address);
                           

                    }
                    else{
                        $count = DB::table('wb_traderauthorised_users')
                        ->where(array('email'=>$email_address))
                        ->count();
                        if($count == 0){
                           
                            $user_passwordData = $password;
                            //had code for test
                            
                            // $user_password = 'slams123';
                            $uuid = generateUniqID();//unique user ID
                            $user_password = hashPwd($email_address, $uuid, $user_passwordData);
                            
                            $user_data = array('email'=> $email_address,
                                            'trader_id'=>$trader_id,
                                            'password'=>$user_password,
                                            'country_id'=>$rec->country_id,
                                            'telephone_no'=>$rec->telephone_no,
                                            'uuid'=>$uuid,
                                            'is_verified'=>1,
                                            'status_id'=>1,//as actve
                                            'account_roles_id'=>2,
                                            'created_by'=>$traderemail_address,
                                            'identification_no'=>$rec->identification_no,
                                            'created_on'=>date('Y-m-d H:i:s')
                                        );
                                //the details 
                                
                                $resp = insertRecord('wb_traderauthorised_users', $user_data, 'Create Trader Users');
                            
                                $usr_id = $resp['record_id'];
                                $verification_code = str_random(30);
                                DB::table('wb_user_verifications')->insert(['user_id'=>$usr_id,'token'=>$verification_code]);
                
                        }
                        else{
                            $resp = array('success'=>false, 'message'=>'Trader User Account exists!!'); 
                        }

                    }
                        

            }
            
           
        
            if($resp['success']){
                DB::commit();
                $resp = array('success'=>true, 'message'=>'Trader User Account has been added successfully');
            }
            else{
                DB::rollBack(); 
            }
        } catch (\Exception $e) {
            DB::rollBack();
            $resp = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $resp = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($resp);

    }
	public function onSaveTradersApplicationInformation(Request $req){
        try{
            $mistrader_id = $req->mistrader_id;
            $module_id = $req->module_id;
            $reference_no = str_replace(" ","",$req->reference_no);;
            $registration_no = str_replace(" ","",$req->registration_no);;
            $trader_id = $req->mistrader_id;
            $data = array('registration_no'=>$registration_no,
                        'reference_no'=>$reference_no,
                        'remarks'=>$req->remarks,
                        'module_id'=>$req->module_id,
                        'trader_id'=>$req->mistrader_id,
						'status_id'=>1,
						'date_submitted'=>Carbon::now(),
                        'year_of_registration'=>$req->year_of_registration);
            //tra_product_applications
            $sql = DB::connection('mis_db')->table('tra_trader_applications_synchronization')
                        ->where($data)
                        ->get();
            $table_name = getSingleRecordColValue('modules', array('id'=>$req->module_id), 'table_name','mis_db');

            if(count($sql) ==0){
                //insert 
                 $data['created_by'] = $mistrader_id;
                 $data['created_on'] = date('Y-m-d H:i:s');
                 
                $resp = insertRecord('tra_trader_applications_synchronization', $data, $mistrader_id,'mis_db');
                //run the synchronisation 
                $trader_data = DB::connection('mis_db')->table('wb_trader_account')->where('id',$trader_id)->select('email')->first();
                if($trader_data){
                    $trader_email = $trader_data->email;
                }else{
                    $trader_email = '';
                }

                if($resp['success']){
                    $record_id = $resp['record_id'];
                    if($module_id == 1){
                        $records=DB::connection('mis_db')->table($table_name.' as t1')
                        ->leftJoin('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                        ->whereRAW("(REPLACE(t1.reference_no, ' ','') = '".$reference_no."' OR REPLACE(t2.certificate_no, ' ','') = '".$registration_no."')")
                        ->select('t1.application_code', 't1.applicant_id','t2.certificate_no')
                        ->get(); 

                    }
                    else{
                        $records=DB::connection('mis_db')->table($table_name.' as t1')
                        ->leftJoin('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                        ->whereRAW("(REPLACE(t1.reference_no, ' ','') = '".$reference_no."' OR REPLACE(t2.certificate_no, ' ','') = '".$registration_no."' OR REPLACE(t2.permit_no, ' ','') = '".$registration_no."')")
                        ->select('t1.application_code', 't1.applicant_id','t2.certificate_no')
                        ->get(); 
                    }
                    
                    //REPLACE(`col_name`, ' ', '')
                            if($records->count() >0){
                                foreach($records as $app_data){
                                    
                                    $application_code=$app_data->application_code;
                                    $applicant_id=$app_data->applicant_id;
                                    //just incase it wasnt passed
                                    $registration_number = $app_data->certificate_no;

                                    if($applicant_id ==  $trader_id){
                                        
                                        DB::connection('mis_db')->table('tra_trader_applications_synchronization')->where(array('id'=>$record_id))->update(array('status_id'=>4, 'dola'=>Carbon::now()));

                                        $res = array(
                                                    'success' => true,
                                                    'message' => 'Application already merged'
                                                );
                                        
                                    }
                                    else{
                                        //update the application table
                                        DB::connection('mis_db')->table($table_name)->where('application_code',$application_code)->update(['applicant_id'=>$trader_id]);
                                        //update submission table
                                        DB::connection('mis_db')->table('tra_submissions')->where('application_code',$application_code)->update(['applicant_id'=>$trader_id]);
                                        //update payment table
                                        DB::connection('mis_db')->table('tra_payments')->where('application_code',$application_code)->update(['applicant_id'=>$trader_id]);
                                        //update invoices table
                                        DB::connection('mis_db')->table('tra_application_invoices')->where('application_code',$application_code)->update(['applicant_id'=>$trader_id]);
                                        DB::connection('mis_db')->table('tra_trader_applications_synchronization')->where(array('id'=>$record_id))->update(array('status_id'=>2, 'dola'=>Carbon::now()));

                                        if($trader_email != ''){ 
                                                $vars = array(
                                                    '{registration_no}' => $registration_no
                                                );
                                                sendTemplatedApplicationNotificationEmail( 13, $trader_email, $vars );
                                                $res = array(
                                                    'success' => true,
                                                    'message' => 'Application Details merged successfullly and email Notification submitted to the trader'
                                                );
                                            }else{
                                                $res = array(
                                                    'success' => true,
                                                    'message' => 'Application Details merged successfullly but no trader email found for sending the notification'
                                                );
                                            }
                                        
                                        
                                    }

                                    
                                }
                            
                                
                                

                            }
                            else{
                                DB::connection('mis_db')->table('tra_trader_applications_synchronization')->where(array('id'=>$record_id))->update(array('status_id'=>3, 'dola'=>Carbon::now()));
                                $res = array(
                                    'success' => false,
                                    'message' => 'Application not found, confirm the application reference details to effect the Merge'
                                );
                                //sendha an email notification
                            }


                }
            }
            else{
                $resp = array('success'=>false,'message'=>'Record Exists');

            }
        } catch (\Exception $e) {
            $resp = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $resp = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
      
        return response()->json($resp);


    }
    public function onLoadTradersApplicationInformation(Request $req){
        try{
            $data = array();
            $mistrader_id = $req->mistrader_id;
            $modulesData = getParameterItems('modules','','mis_db');
            $records = DB::connection('mis_db')->table('tra_trader_applications_synchronization as t1')
						->select('t2.name as application_type', 't1.*', 't3.name as sycnhronisation_status')
                        ->join('modules as t2', 't1.module_id','t2.id')
                        ->leftJoin('par_trader_applications_synchronization_status as t3', 't1.status_id','t3.id')
                        ->where(array('trader_id'=>$mistrader_id))
                        ->get();
                       
              $resp =array('success'=>true,'data'=> $records);
        } catch (\Exception $e) {
            $resp = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $resp = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($resp);

    }
   public function onValidateAccountEmail(Request $req){
    try{
        $data = array();
        $email_address = $req->email_address;
        //validate email address
        $records = DB::table('wb_trader_account')
                ->where(array('email'=>$email_address))
                ->first();
        if($records){
			$identification_no = $records->identification_no;
            $resp =array('success'=>false,'message'=> "Account with the same Email Address exists, Do you want to receive the Account details in your Email?");

        }
        else{
            
              $resp =array('success'=>true,'message'=> '');

        }
    } catch (\Exception $e) {
        $resp = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $resp = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($resp);

   }
   public function onValidateAdminAccess(Request $req){
    try{
        $data = array();
        $email_address = $req->email_address;
        //validate email address
        $record = DB::table('wb_traderauthorised_users')
                ->where(array('email'=>$email_address))
                ->first();
        if($record){
            //send the one time password 

            $id = $record->id;
            $is_account_accessed = $record->is_account_accessed;
            if($is_account_accessed == 1){
                $user_passwordData = str_random(8);
                $uuid = generateUniqID();//unique user ID
                $user_password = hashPwd($email_address, $uuid, $user_passwordData);
                 $subject = 'TMDA  SELF SERVICE PORTAL ACCOUNT DETAILS';
                             $email_content = "Thank you for accessing the Self Service portal and below is the ONE TIME PASSWORD</br>.";
                             $email_content .= " <p>- Account Email Address: ".$email_address .".<p/>";
                             $email_content .= " - <h2>One Time Password(OTP): ".$user_passwordData ."<br/></h2>";
    
                             $email_content.="<p>For more information visit TMDA Web Portal for a full account access guide</p>";
                $response=  sendMailNotification($record->fullnames, $email_address,$subject,$email_content);
                if($response['success']){
                    $where_app = array('id'=>$id);
                    $user_data = array('uuid'=>$uuid, 'password'=>$user_password,'is_account_accessed'=>0, 'altered_by'=>$email_address, 'dola'=>Carbon::now());
                    $previous_data = getPreviousRecords('wb_traderauthorised_users', $where_app);
                    updateRecord('wb_traderauthorised_users', $previous_data, $where_app, $user_data, $email_address);
                    $resp = array('success'=>true,'message'=>'Account successfully validated, the one time password has been sent to your email, Note: the password will expire after 24hrs '.$email_address);
                }
                else{
                    $resp = array('success'=>false,'message'=>"Email notification failed, try again or contact the authority");
                }

            }
            else{
                $resp = array('success'=>true,'message'=>'Account successfully validated, the one time password has already been sent check your email for the ONE TIME PASSWORD ');
            }
           
        }
        else{
           
          $resp =array('success'=>false,'message'=> 'Account not found, confirm your email address or contact TMDA authority for further guidelines.');

        }
    } catch (\Exception $e) {
        $resp = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $resp = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($resp);

   }
   
   public function getTraderInformation(Request $req){
    try{
        $data = array();
        $trader_id = $req->trader_id;
        //validate email address
        $records = DB::table('wb_trader_account')
                ->where(array('id'=>$trader_id))
                ->first();
       
              $resp =array('success'=>true,'data'=> $records);

    
    } catch (\Exception $e) {
        $resp = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $resp = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($resp);



   }
   public function gettraderUsersAccountsManagementDetails(Request $req){
    try{
           
            $trader_id = $req->trader_id;
            
            $data = DB::table('wb_trader_account as t1')
                        ->join('wb_traderauthorised_users as t2', 't1.id','=','t2.trader_id')
                        ->leftJoin('wb_account_roles as t3', 't2.account_roles_id','=','t3.id')
                        ->select(DB::raw("t2.email,t2.telephone_no,t3.name as account_role, t2.email as email_address,t1.identification_no, t2.created_on, t2.id,t2.last_login_time "))
                        ->where('t1.id',$trader_id)
                        ->get();
                      
            $res = array('success'=>true,  'data'=>$data);

            
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

}