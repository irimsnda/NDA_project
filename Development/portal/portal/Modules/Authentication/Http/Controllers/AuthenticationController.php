<?php

namespace Modules\Authentication\Http\Controllers;


use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\User;
use Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgotPassword;
use NoProtocol\Encryption\MySQL\AES\Crypter;

class AuthenticationController extends Controller
{
    
    public function checkApproval_status($status_id){
        $res = array('success'=>true);
        if($status_id == 5){
            $res = array(
                'success' => false,
                'message' => 'Trader Account has not been approved, TFDA authority if processing the registration information for the approval process!!'
            );
          
        }else if($status_id != 1){
            $res = array(
                'success' => false,
                'message' => 'The trader acocunt is not active, contact TFDA Authority for activition process, !!'
            );
        
        } 
         return $res;
    }
    function cryptoJsAesDecrypt($passphrase, $jsonString){
        $jsondata = json_decode($jsonString, true);
        try {
            $salt = hex2bin($jsondata["key"]);
            $iv  = hex2bin($jsondata["iv"]);
        } catch(Exception $e) { return null; }

        $ct = base64_decode($jsondata["ciphertext"]);
        $concatedPassphrase = $passphrase.$salt;
        $md5 = array();
        $md5[0] = md5($concatedPassphrase, true);
        $result = $md5[0];
        for ($i = 1; $i < 3; $i++) {
            $md5[$i] = md5($md5[$i - 1].$concatedPassphrase, true);
            $result .= $md5[$i];
        }
        $key = substr($result, 0, 32);
        $data = openssl_decrypt($ct, 'aes-256-cbc', $key, true, $iv);
        print_r($ct);
        print_r($key);
        exit();
        return json_decode($data, true);
    }
    public function onUserLogin(Request $req)
        {
            try {
                $trader_no = ($req->trader_no);
                $email_address = base64_decode($req->email_address);

                $user_password = base64_decode($req->user_password);
                

                $user = DB::table('wb_traderauthorised_users as t1')
                        ->select(DB::raw('t1.*,t2.country_id, t2.name,t2.id as trader_id, t2.identification_no, t1.uuid, t1.status_id, t1.is_approved'))
                        ->join('wb_trader_account as t2','t1.trader_id','=','t2.id')
                        ->where(array('t2.identification_no'=>$trader_no,'t1.email'=>$email_address))
                        ->first();
                if(!empty($user) || !is_null($user)){
                    $uuid = $user->uuid;
                    $user_id = $user->id;
                    $is_approved = $user->is_approved;
                    //pendign approval
                    $status_id = $user->status_id;
                    $trader_id = $user->trader_id;
                    $company_name = $user->name;
                    $country_id = $user->country_id;
                    $identification_no = $user->identification_no;
                    $trader_user_id = $user->id;
                    $account_role_id = $user->account_roles_id;

                    //implementation of verification
                    $approval_response = $this->checkApproval_status($status_id);
                    if($approval_response['success']){
                            $is_account_blocked = DB::table('wb_blocked_accounts')->where('account_id', $user_id)->first();
                            if (!empty($is_account_blocked)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Authentication Failed...This account is blocked from accessing the system!!'
                                );
                                
                                return response()->json($res, 200);
                                
                            }
                            else{
                                //get the details 
                                $authParams = array(
                                    'email' => strtolower($email_address),
                                    'password' => $user_password,
									'id' => $user_id,
                                    'uuid' => $uuid
                                );
                                // attempt to verify the credentials and create a token for the user
                                if (!Auth::guard('web')->attempt($authParams)) {
                                    
                                        return response()->json(['success' => false, 'message' => $company_name.'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 200);
                                }
                                else{
                                    $user = Auth::guard('web')->user();
                                    $token_results = $user->createToken('System Access');
                                                    
                                    $access_token =  $token_results-> accessToken; 
                                    $token =  $token_results-> token; 
                                    $token->expires_at = Carbon::now()->addMinutes(env('PASSPORT_TOKEN_EXPIRY_MINUTES'));
                                    $token->save();
        
                                    $mistrader_id = 0;
                                    $mis_trader = $this->getMisTraderInformation($identification_no);
                            
                                    if($mis_trader){
                                        $mistrader_id = $mis_trader->id;
                                    }
                                    $is_local =  getSingleRecordColValue('par_countries',array('id'=>$country_id),'is_local','mis_db');
                                    $resp = array('success' => true,
                                                'message' => 'Successfully Authenticated',
                                                'access_token'=>$access_token,
                                                'trader_no'=>$trader_no,
                                                'email_address'=>$email_address,
                                                'company_name'=>$company_name,
                                                'isLoggedIn'=>true,
                                                'trader_id'=>$trader_id,
                                                'trader_user_id'=>$trader_user_id,
                                                'account_role_id'=>$account_role_id,
                                                'is_confirmed'=>$user->is_confirmed,
                                                'is_local'=>$is_local,
                                                'mistrader_id'=>$mistrader_id,
                                                'country_id'=>$country_id,
                                                'token_type' => 'Bearer',
                                                'expires_at' => Carbon::parse(
                                                    $token_results->token->expires_at
                                                )->toDateTimeString());
                                                
                                    return response()->json($resp, 200);
                                
                                }
                            }

                    }
                    else{
                        $res = $approval_response;
                        return response()->json($res, 200);
        

                    }
                    
                }
                else{
                    $res = array(
                        'success' => false,
                        'message' => 'Authentication Failed...User Not found!!'
                    );
                    return response()->json($res, 200);
       
                }
                
            } catch (AuthException $e) {
                // something went wrong whilst attempting to encode the token
                return response()->json(['success' => false, 'error' => 'Failed to login, please try again.'], 500);
            }
            // all good so return the token
         }
         
         public function onAdminlogin(Request $req)
        {
            try {
                $trader_no = $req->trader_no;
                $email_address = base64_decode($req->email_address);
                $user_password = base64_decode($req->user_password);
                
                $user = DB::table('wb_traderauthorised_users as t1')
                        ->select(DB::raw('t1.*, t1.uuid, t1.status_id, t1.is_approved'))
                        ->where(array('t1.email'=>$email_address))
                        ->first();
                if(!empty($user) || !is_null($user)){
                    $uuid = $user->uuid;
                    $user_id = $user->id;
                    $is_approved = $user->is_approved;
                    //pendign approval
                    $status_id = $user->status_id;
                  
                    $mis_external_user_id = $user->mis_external_user_id;
                    $regional_integrationuser_id = $user->regional_integrationuser_id;
                    $country_id = $user->country_id;
                            $is_account_blocked = DB::table('wb_blocked_accounts')->where('account_id', $user_id)->first();
                            if (!empty($is_account_blocked)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Authentication Failed...This account is blocked from accessing the system!!'
                                );
                                
                                return response()->json($res, 200);
                            }
                            else{
                                //get the details 
                                $authParams = array(
                                    'email' => $email_address,
                                    'id' => $user_id,
                                    'password' => $user_password,
                                    'uuid' => $uuid
                                );
                                
                                // attempt to verify the credentials and create a token for the user
                                if (!Auth::guard('web')->attempt($authParams)) {
                                    
                                        return response()->json(['success' => false, 'message' => 'We cant find an account with this credentials. Please make sure you entered the right information and you have verified your email address.'], 200);
                                }
                                else{
                                    $user = Auth::guard('web')->user();
                                    $token_results = $user->createToken('System Access');
                                                    
                                    $access_token =  $token_results-> accessToken; 
                                    $token =  $token_results-> token; 
                                    $token->expires_at = Carbon::now()->addMinutes(env('PASSPORT_TOKEN_EXPIRY_MINUTES'));
                                    $token->save();
                                    //get trader details 
                                    $assessment_procedure_id = $is_local =  getSingleRecordColValue('par_assessment_procedures_countries',array('country_id'=>$country_id),'assessment_procedure_id','mis_db');
                                    $assessment_procedure = $is_local =  getSingleRecordColValue('par_assessment_procedures',array('id'=>$assessment_procedure_id),'name','mis_db');


                                    $resp = array('success' => true,
                                                'message' => 'Successfully Authenticated',
                                                'access_token'=>$access_token,
                                                'mis_external_user_id'=>$mis_external_user_id,
                                                'regional_integrationuser_id'=>$regional_integrationuser_id,
                                                'country_id'=>$country_id,
                                                'assessment_procedure_id'=>$assessment_procedure_id,
                                                'assessment_procedure'=>$assessment_procedure,
                                                'email_address'=>$email_address,
                                                'isAdminLoggedIn'=>true,
                                                'token_type' => 'Bearer',
                                                'trader_user_id'=>$user_id,
                                                'expires_at' => Carbon::parse(
                                                    $token_results->token->expires_at
                                                )->toDateTimeString());
                                    //update the record 

                                    $data = array('is_account_accessed'=>1);
                                    DB::table('wb_traderauthorised_users')->where(array('id'=>$user_id) )->update($data);
                                    return response()->json($resp, 200);
                                }
                            }
                }
                else{
                    $res = array(
                        'success' => false,
                        'message' => 'Authentication Failed...User Not found!!'
                    );
                    return response()->json($res, 200);
       
                }
                
            } catch (AuthException $e) {
                // something went wrong whilst attempting to encode the token
                return response()->json(['success' => false, 'error' => 'Failed to login, please try again.'], 500);
            }
            // all good so return the token
         }
    public function getMisTraderInformation($identification_no){
            $data = DB::connection('mis_db')->table('wb_trader_account')
                            ->where(array('identification_no'=>$identification_no))
                            ->first();
            
             return $data;

    }
    public function verifyUser($verification_code)
    {
        $check = DB::table('user_verifications')->where('token',$verification_code)->first();
        if(!is_null($check)){
            $user = User::find($check->user_id);
            if($user->is_verified == 1){
                return response()->json([
                    'success'=> true,
                    'message'=> 'Account already verified..'
                ]);
            }
            $user->update(['is_verified' => 1]);
            DB::table('user_verifications')->where('token',$verification_code)->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'You have successfully verified your email address.'
            ]);
        }
        return response()->json(['success'=> false, 'error'=> "Verification code is invalid."]);
    }
    
    /**
     * Recover Password
     */
    public function recover(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            $error_message = "Your email address was not found.";
            return response()->json(['success' => false, 'error' => ['email'=> $error_message]], 401);
        }
        try {
            Password::sendResetLink($request->only('email'), function (Message $message) {
                $message->subject('Your Password Reset Link');
            });
        } catch (\Exception $e) {
            //Return with error
            $error_message = $e->getMessage();
            return response()->json(['success' => false, 'error' => $error_message], 401);
        }
        return response()->json([
            'success' => true, 'data'=> ['message'=> 'A reset email has been sent! Please check your email.']
        ]);
    }
    public function onRecoverAccountPassword(Request $req){
       
        $res = array();
        try {
            DB::transaction(function () use (&$res, $req) {
                $guid = $req->input('guid');
                $newPassword = $req->input('new_password');
                //check if guid exists
                $guid_exists = DB::table('wb_password_reset')->where('guid', $guid)->first();
                if (is_null($guid_exists) || empty($guid_exists)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Your password reset token is invalid. Try again requesting for password reset!!'
                    );
                } else {
                    //check for time validity of the reset token
                    $time1 = Carbon::now();
                    $time2 = $guid_exists->date_generated;
                    $user_id = $guid_exists->user_id;
                    $time_diff = getTimeDiffHrs($time1, $time2);
                    if ($time_diff > 24) {
                        //the token has expired...delete
                        DB::table('wb_password_reset')->where('guid', $guid)->delete();
                        $res = array(
                            'success' => false,
                            'message' => 'Your password reset token has expired. Try again requesting for password reset!!'
                        );
                    } else {
                        //all is well..allow for password reset
                        //check if the fetched user id really exists in users table
                        $user_exists = User::find($user_id);
                        if ($user_exists->count() > 0) {
                            $username = $user_exists->email;
                            $uuid = $user_exists->uuid;
                            
                            $hashedPassword = hashPwd($username, $uuid, $newPassword);
                            $user_exists->password = $hashedPassword;
                            if ($user_exists->save()) {
                               
                                DB::table('wb_password_reset')->where('guid', $guid)->delete();
                                //also delete any tokens associated with this user
                                DB::table('wb_password_reset')->where('user_id', $user_id)->delete();
                                $res = array(
                                    'success' => true,
                                    'message' => 'Your password was reset successfully!!'
                                );
                            } else {
                                $res = array(
                                    'success' => false,
                                    'message' => 'Sorry problem was encountered while saving your new password. Please try again!!'
                                );
                            }
                        } else {
                            $res = array(
                                'success' => false,
                                'message' => 'Your request couldn\'t be authenticated...User not found!!'
                            );
                        }
                    }
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
        return response()->json($res);
        
    }
    public function onFuncChangePassword(Request $req)
    {
        try {
            $trader_user_id = $req->input('trader_user_id');
            $email_address = $req->input('email_address');
            $current_password = $req->input('current_password');
            $new_password = $req->input('new_password');
           
            //the users details 
            $data = DB::table('wb_traderauthorised_users')
                        ->where(array('email'=>$email_address,'id'=>$trader_user_id))
                        ->first();
            if($data){
                $table_name = 'wb_traderauthorised_users';
                    $uuid = $data->uuid;
                    $password = $data->password;
                    
                    $trader_id = $data->trader_id;
                    $encryptedNewPwd = hashPwd($email_address, $uuid, $new_password);
                    //check if the provided old password is correct
                    $encryptedcurrent_password = hashPwd($email_address, $uuid, $current_password);
                    
                    if ($encryptedcurrent_password == $password) {
                        //update the details
                        $data  = array('password'=>$encryptedNewPwd,
                                        'altered_by'=>$email_address,
                                        'is_confirmed'=>1,
                                        'updated_at'=>date('Y-m-d H:i:s'));
                        $where = array('email'=>$email_address,'trader_id'=>$trader_id);
                        $previous_data = getPreviousRecords($table_name, $where,'mysql');
                       // print_r($previous_data);
                        $resp = updateRecord('wb_traderauthorised_users', $previous_data, $where, $data, $email_address);
                       //send email
                        if($resp){
                            $resp = array(
                                'success' => true,
                                'message' => 'Password updated successfully!!'
                            ); 
                        }
                       // wb_password_reset_logs
    
                    } else {
                        $resp = array(
                            'success' => false,
                            'message' => 'Your old password is wrong. Try again!!'
                        );
                    }
    
            }
            else{
                $resp = array(
                    'success' => false,
                    'message' => 'User Not Found!!'
                );
            }
        } catch (\Exception $exception) {
            $resp = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $resp = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($resp);
    }
    public function onFuncRecoverPasswordRequest(Request $req)
    {
        $res = array();
		//guid
        try {
            DB::transaction(function () use (&$res, $req) {
                $email_address = $req->input('email_address');
                $identification_no = $req->input('identification_no');
                
                $record = DB::table('wb_traderauthorised_users as t1')
                            ->join('wb_trader_account as t2','t1.trader_id', 't2.id')
                            ->select('t1.*', 't2.identification_no')
                            ->where(array('t1.email'=>$email_address, 't2.identification_no'=>$identification_no))
                            ->first();
                            
                if (is_null($record)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Request Failed...This email address is not registered in the system!!'
                    );
                } else {
                    $user_id = $record->id;
                    $user_passwordData = str_random(8);
                    $uuid = generateUniqID();//unique user ID
                    $user_password = hashPwd(strtolower($email_address), $uuid, $user_passwordData);
                     $subject = 'TMDA SELF SERVICE PORTAL :Password Recovery';
                                 $email_content = "Thank you for accessing the Self Service portal and below is the reset Account Password</br>.";
                                 $email_content .= " <p>- Account Tarder No: ".$identification_no .".<p/>";
                                 $email_content .= " <p>- Account Email Address: ".$email_address .".<p/>";
                                 $email_content .= " - <h2>One Time Password(OTP): ".$user_passwordData ."<br/></h2>";
        
                                 $email_content.="<p>For more information visit TMDA Web Portal for a full account access guide</p>";
                                 
                  $response=  sendMailNotification($record->fullnames, $email_address,$subject,$email_content);

                    $where_app = array('id'=>$user_id);
                        $user_data = array('uuid'=>$uuid,'email'=>strtolower($email_address), 'password'=>$user_password,'is_account_accessed'=>0, 'altered_by'=>$email_address, 'dola'=>Carbon::now());
                        $previous_data = getPreviousRecords('wb_traderauthorised_users', $where_app);
                        $resp = updateRecord('wb_traderauthorised_users', $previous_data, $where_app, $user_data, $email_address);
                        
                    if($response['success']){
                        $where_app = array('id'=>$user_id);
                        $user_data = array('uuid'=>$uuid,'email'=>strtolower($email_address), 'password'=>$user_password,'is_account_accessed'=>0, 'altered_by'=>$email_address, 'dola'=>Carbon::now());
                        $previous_data = getPreviousRecords('wb_traderauthorised_users', $where_app);
                        $resp = updateRecord('wb_traderauthorised_users', $previous_data, $where_app, $user_data, $email_address);
						
                        $pwdResetParams = array(
                            'user_id' => $user_id,
                            'email_address' => $email_address,
                            'guid' => $uuid,
                            'date_generated' => Carbon::now()
                        );
                        DB::table('wb_password_reset')->insert($pwdResetParams);
                        $res = array(
                            'success' => true,
                            'message' => 'Password reset instructions sent to your email address!!'
                        );
                    }
                    else{
                        $res = array('success'=>false,'message'=>"Email notification failed, try again or contact the authority");
                    }
                   
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
        return response()->json($res);
    }
}
