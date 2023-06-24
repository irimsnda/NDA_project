<?php

namespace Modules\Tradermanagement\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controller;

class TradermanagementController extends Controller
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
  public function saveTraderInformation(Request $req){
        //save the data
        try{
            $res = array('success'=>false,'message'=>'Account Has Already been registered, confirm in your email account or contact Authority for further enquiry.');
            $id = $req->id;
            $user_id = '';
            $identification_no =$req->identification_no; 
            $status_id = $req->status_id;
            $email =$req->email; 
            if(\Auth::user()){
                $user_id = \Auth::user()->id;
            }
            
            $table_name = 'wb_trader_account';
            $where = array('identification_no'=>$identification_no);
            $trader_data = $req->all();

            unset($trader_data['_token']);
            unset($trader_data['portal_id']);
            $res = array();

            unset($trader_data['id']);
            if (validateIsNumeric($identification_no)){
                if (recordExists($table_name, $where)) {

                    $trader_data['dola'] = Carbon::now();
                    $trader_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    
                    $previous_data = $previous_data['results'];
                    
                    //dms function call with validation 
                    $account_email = $previous_data[0]['email'];
                    $res = updateRecord($table_name, $previous_data, $where, $trader_data, $user_id);
                    $previous_data = getPreviousRecords($table_name, $where, 'portal_db');
                    $previous_data = $previous_data['results'];
                    $trader_d = $previous_data[0]['id'];
                    
                    $res = updateRecord($table_name, $previous_data, $where, $trader_data, $user_id,'portal_db');
                    
                    if($account_email != $email){
                        $where_user = array('trader_id'=>$trader_d, 'email'=>$account_email);
                        $user_passwordData = str_random(8);
                        //had code for test
                        $password = str_random(8);
                       // $user_password = 'slams123';
                        $uuid = generateUniqID();//unique user ID
                        $user_password = hashPwd($email, $uuid, $user_passwordData);
                       
                        $user_data = array('email'=> $email,
                                      'password'=>$user_password,
                                      'uuid'=>$uuid,
                                      'status_id'=>1,//as actve
                                      'account_roles_id'=>1,
                                      'created_by'=>'System',
                                      'created_on'=>date('Y-m-d H:i:s')
                                 );
                                 $previous_data = getPreviousRecords('wb_traderauthorised_users', $where_user, 'portal_db');
                        if($previous_data['success']){
                            $previous_data = $previous_data['results'];
                            updateRecord('wb_traderauthorised_users', $previous_data, $where_user, $user_data, $user_id,'portal_db');
                            
                        }
                       
                    }
                    
                    if($res['success']){
                        $res['message'] ='Trader Account details Updated Successfully';
                    }
                }
            }
            else{
                
                $trader_no = generateTraderNo('wb_trader_account','mis_db');
                
                $trader_data['identification_no'] = $trader_no;
                $trader_data['status_id'] = 1;
                
                if(isset($trader_data['tpn_no'])){
                                
                        $trader_data['tpn_no'] = $tpn_no;
                }
                if(isset($trader_data['pacra_no'])){
                                
                        $trader_data['pacra_no'] = $pacra_no;
                }
                //check for another
                $count = DB::table('wb_trader_account')
                    ->where(array('email'=>$trader_data['email']))
                    ->count();
                if($count == 0){
                   $email_address = $trader_data['email'];
                   $resp = insertRecord('wb_trader_account', $trader_data, 'Create Account');
                   if(!$resp['success']){
                        return \response()->json(array('success'=>false,'message'=>$resp['message'])); 
                   }
                  
                   $trader_id = $resp['record_id'];
                   $trader_data['id'] = $trader_id;
                   $res = insertRecord('wb_trader_account', $trader_data, 'Create Account','portal_db');
                   
                   if(!$res['success']){
                            DB::connection('mis_db')->rollBack();
                            return \response()->json(array('success'=>false,'message'=>$resp['message'])); 
                    }
                   
                   $user_passwordData = str_random(8);
                  
                   $uuid = generateUniqID();//unique user ID
                   $user_password = hashPwd($email_address, $uuid, $user_passwordData);
                  
                  
                   $user_data = array('email'=> $email_address,
                                 'trader_id'=>$trader_id,
                                 'password'=>$user_password,
                                 'country_id'=>$trader_data['country_id'],
                                 'telephone_no'=>$trader_data['telephone_no'],
                                 'uuid'=>$uuid,
                                 'is_verified'=>1,
                                 'status_id'=>1,//as actve
                                 'account_roles_id'=>1,
                                 'created_by'=>'System',
                                 'identification_no'=>$trader_no,
                                 'created_on'=>date('Y-m-d H:i:s')
                            );
                            
                    $resp = insertRecord('wb_traderauthorised_users', $user_data, 'Create Trader Users','portal_db');
                  
                    $usr_id = $resp['record_id'];
                    $verification_code = str_random(30);
                    DB::connection('portal_db')->table('wb_user_verifications')->insert(['user_id'=>$usr_id,'token'=>$verification_code]);
                    $data['portal_id'] = $trader_id;
                    
                    $subject = 'CUSTOMER SELF SERVICE PORTAL ACCOUNT DETAILS';
                    
                                $email_content = "We wish to acknowledge receipt of your account application details</br>.";
                                $email_content.= "Thank you for registering at Self Service portal and below are the account registration information</br>.";
                                $email_content .= " - Trader Account No: '".$trader_no ."'.<br/>";
                                $email_content .= " - Account Email Address: '".$email_address ."'.<br/>";
                                $email_content .= " - Account User Password: '".$user_passwordData ."'.<br/>";
                                $email_content.="<p>For more information visit Web Portal for a full account access guide</p>  ";
                   // $res = sendMailNotification($trader_data['name'], $email_address,$subject,$email_content);
                   //  if($res['success']){

                        $res = array('success'=>true,'trader_no'=> $trader_no,'message'=>'Account created successfully, the account details have also been sent to your email '.$email_address);
                    //} 
                    
                    
                }else{
                         $res = array('success'=>false,'message'=>'Account Has Already been registered, confirm in your email account or contact Authority for further enquiry.');
                }
                
   
            }
        
            //update the details on the Online portal too
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
            //  'message1'=>$previous_data,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,//'message1'=>$previous_data,
                'message' => $throwable->getMessage()
            );
        }
    return response()->json($res);


    }

    public function updateAccountApprovalStatus(Request $req){
        //save the data
        try{
            $id = $req->id;
            
            $identification_no =$req->identification_no; 
            $status_id = $req->status_id;
            $remarks = $req->remarks;
            
            $email =$req->email; 
            $user_id = \Auth::user()->id;
            $table_name = 'wb_trader_account';
            $where = array('identification_no'=>$identification_no);
           $trader_data = array('status_id'=>$status_id);
            if (validateIsNumeric($identification_no)) {
                if (recordExists($table_name, $where)) {

                    $trader_data['dola'] = Carbon::now();
                    $trader_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    //dms function call with validation 
                   
                    $portal_id = $previous_data[0]['portal_id'];
                   
                    $res = updateRecord($table_name, $previous_data, $where, $trader_data, $user_id);
                    
                    $res = updateRecord($table_name, $previous_data, $where, $trader_data, $user_id,'portal_db');
                    
                    $where = array('trader_id'=>$portal_id);

                    $res = updateRecord('wb_traderauthorised_users', $previous_data, $where, $trader_data, $user_id,'portal_db');
                    if($res['success']){
                        $approval_data = array('identification_no'=>$identification_no, 
                                              'status_id'=>$status_id,
                                              'remarks'=>$remarks,
                                              'approval_by'=>$user_id);
                        $approval_data['created_on'] = Carbon::now();
                         $approval_data['created_by'] = $user_id;               
                        $res = insertRecord('wb_trader_accountapprovals', $approval_data, $user_id);
  
                        $res['message'] ='Trader Account Status Update saved successfully';
                    }
                }
            }
            //update the details on the Online portal too
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
    //saveTraderAccountUsers
   public function saveTraderAccountUsers(Request $req){
        try{
            $email_address = $req->email;
            $trader_id = $req->trader_id;
            $traderemail_address = $req->traderemail_address;
            $password = str_random(8);;
            $identification_no = getSingleRecordColValue('wb_trader_account', array('id' => $trader_id), 'identification_no');
            $web_trader_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $identification_no), 'id','portal_db');
            
            $id = $req->id;


            $rec = DB::table('wb_trader_account')->where('id', $trader_id)->first();
            if($rec){
                $identification_no = $rec->identification_no;
                
                    if(validateIsNumeric($id)){
                        $where_app = array('id'=>$id);

                        $user_passwordData = $password;
                            //had code for test
                            
                            // $user_password = 'slams123';
                            $uuid = generateUniqID();//unique user ID
                            $user_password = hashPwd($email_address, $uuid, $user_passwordData);
                            
                        $user_data = array('email'=> $email_address,
                                        'account_roles_id'=>2,
                                            'country_id'=>$req->country_id,
                                            'telephone_no'=>$req->telephone_no,
                                            'password'=>$user_password,
                                            'uuid'=>$uuid,
                                        'altered_by'=>$traderemail_address,
                                        'dola'=>date('Y-m-d H:i:s')
                                    );
                            //the details 
                            $previous_data = getPreviousRecords('wb_traderauthorised_users', $where_app,'portal_db');
                           $previous_data = $previous_data['results'];
                            $resp=   updateRecord('wb_traderauthorised_users', $previous_data, $where_app, $user_data, $email_address, 'portal_db');
                           

                                $subject = 'TMDA CUSTOMER SELF SERVICE PORTAL ACCOUNT DETAILS';
                    
                                $email_content = "We wish to notify you that the account details have been successfully updated</br>.";
                                $email_content.= "The Account Information are indicated below</br>.";
                                $email_content .= " - Trader Account No: '".$identification_no ."'.<br/>";
                                $email_content .= " - Account Email Address: '".$email_address ."'.<br/>";
                                $email_content .= " - Account User Password: '".$user_passwordData ."'.<br/>";

                                $email_content.="<p>For more information visit TMDA Web Portal for a full account access guide</p>  ";
                                
                                 sendMailNotification($email_address, $email_address,$subject,$email_content);

                    }
                    else{
                        $count = DB::connection('portal_db')->table('wb_traderauthorised_users')
                        ->where(array('email'=>$email_address, 'trader_id'=>$web_trader_id))
                        ->count();
                        if($count == 0){
                           
                            $user_passwordData = $password;
                            //had code for test
                            
                            // $user_password = 'slams123';
                            $uuid = generateUniqID();//unique user ID
                            $user_password = hashPwd($email_address, $uuid, $user_passwordData);
                            
                            $user_data = array('email'=> $email_address,
                                            'trader_id'=>$web_trader_id,
                                            'password'=>$user_password,
                                            'country_id'=>$rec->country_id,
                                            'telephone_no'=>$rec->telephone_no,
                                            'uuid'=>$uuid,
                                            'is_verified'=>1,
                                            'status_id'=>1,//as actve
                                            'account_roles_id'=>2,
                                            'created_by'=>$web_trader_id,
                                            'identification_no'=>$identification_no,
                                            'created_on'=>date('Y-m-d H:i:s')
                                        );
                                //the details 
                                
                                $resp = insertRecord('wb_traderauthorised_users', $user_data, 'Create Trader Users','portal_db');
                           
                                $usr_id = $resp['record_id'];
                                $verification_code = str_random(30);
                                DB::connection('portal_db')->table('wb_user_verifications')->insert(['user_id'=>$usr_id,'token'=>$verification_code]);


                                $subject = 'TMDA CUSTOMER SELF SERVICE PORTAL ACCOUNT DETAILS';
                    
                                $email_content = "We wish to acknowledge receipt of your account application details</br>.";
                                $email_content.= "Thank you for registering at TMDA Self Service portal and below are the Trader User registration information</br>.";
                                $email_content .= " - Trader Account No: '".$identification_no ."'.<br/>";
                                $email_content .= " - Account Email Address: '".$email_address ."'.<br/>";
                                $email_content .= " - Account User Password: '".$user_passwordData ."'.<br/>";

                                $email_content.="<p>For more information visit TMDA Web Portal for a full account access guide</p>  ";
                                
                                 sendMailNotification($email_address, $email_address,$subject,$email_content);

                
                        }
                        else{
                            $resp = array('success'=>false, 'message'=>'Trader User Account exists!!'); 
                        }

                    }
                        

            }
            else{
                 $resp = array('success'=>false, 'message'=>'Trader Account Not found!!'); 
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
    public function saveAuthorisedtradersdetails(Request $req){
        //save the data
        try{
            $id = $req->id;
            $trader_id = $req->trader_id;
            
            $status_id = $req->status_id;
            $remarks = $req->remarks;
            
            $email =$req->email; 
            $table_name = 'tra_trader_authorization';
            $where = array('traderidentification_no'=>$req->traderidentification_no,'authorisedidentification_no'=>$req->authorisedidentification_no);
            
           $trader_data = array('traderidentification_no'=>$req->traderidentification_no,
                                'authorisedidentification_no'=>$req->authorisedidentification_no,
                                'authorisation_status_id'=>$req->authorisation_status_id,
                                'remarks'=>$req->remarks,
                                'authorised_from'=>$req->authorised_from,
                                'authorised_to'=>$req->authorised_to);


                if (!recordExists($table_name, $where)) { 
                    $trader_data['created_on'] = Carbon::now();
                         $trader_data['created_by'] = $this->user_id;               
                        $res = insertRecord($table_name, $trader_data, $this->user_id);
  
                }else{
                    $res = array('success'=>false,'message'=>'The authorised details have already been entered!!');
                }
            
            //update the details on the Online portal too
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
    public function gettraderAccountsManagementDetails(Request $req){
                try{
                        $start = $req->start;
                        $limit = $req->limit;

                        $status_id = $req->status_id;
                        $search_field = $req->search_field;
                        $search_value = $req->search_value;
                        $limit = $req->limit;
                        $filter = $req->input('filter');
                        $whereClauses = array();
                        $filter_string = '';
                        if (isset($filter)) {
                            $filters = json_decode($filter);
                            if ($filters != NULL) {
                                foreach ($filters as $filter) {
                                    switch ($filter->property) {
                                            case 'identification_no' :
                                                     $whereClauses[] = "t1.identification_no like '%" . ($filter->value) . "%'";
                                            break;
                                            case 'name' :
                                                 $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                                            break;
                                             case 'contact_person' :
                                                    $whereClauses[] = "t1.contact_person like '%" . ($filter->value) . "%'";
                                            break;
                                             case 'email' :
                                                     $whereClauses[] = "t1.email like '%" . ($filter->value) . "%'";
                                            break;
                                            case 'country_name' :
                                                    $whereClauses[] = "t1.country_name like '%" . ($filter->value) . "%'";
                                            break;
                                            case 'account_status' :
                                                 $whereClauses[] = "t1.country_name like '%" . ($filter->value) . "%'";
                                            break;
                                            case 'physical_address' :
                                                 $whereClauses[] = "t1.physical_address like '%" . ($filter->value) . "%'";
                                            break;
                                    }
                                }
                                $whereClauses = array_filter($whereClauses);
                            }
                            if (!empty($whereClauses)) {
                                $filter_string = implode(' AND ', $whereClauses);
                            }
                        }
                        $sql = DB::table('wb_trader_account as t1')
                                    ->leftJoin('par_trader_categories as t2', 't1.trader_category_id','=','t2.id')
                                    ->leftJoin('par_account_statuses as t3', 't1.status_id','=','t3.id')
                                    ->leftJoin('par_countries as t4', 't1.country_id','=', 't4.id')
                                    ->leftJoin('par_regions as t5', 't1.region_id','=', 't5.id');
                                    
                                    if(validateIsNumeric($status_id)){
                                        $sql = $sql->where(array('status_id'=>$status_id));
                                       
                                    }
                                    $where_like = '';
                                    if($search_field != '' && $search_value != ''){
                                        $sql = $sql->where($search_field,'like','%'.$search_value.'%');
                                       
                                    }
                                    if ($filter_string != '') {
                                        $sql->whereRAW($filter_string);
                                    }
                        $total_rows =  $sql->select('t1.id')->count();
                            
                        $data =  $sql->select(DB::raw("t1.*, t2.name as trader_category, t3.name as account_status, t4.name as country_name,t5.name as region_name "))
                                        ->offset($start*$limit)
                                        ->limit($limit)
                                        ->get();


                        $res = array('success'=>true, 'totals'=>$total_rows, 'results'=>$data);

                        
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
    public function getAuthorisedTradersDetailsinformation(Request $req){
        try{
                $trader_no = $req->trader_no;
               
                $sql = DB::table('wb_trader_account as t1')
                            ->leftJoin('par_trader_categories as t2', 't1.trader_category_id','=','t2.id')
                            ->leftJoin('par_account_statuses as t3', 't1.status_id','=','t3.id')
                            ->leftJoin('par_countries as t4', 't1.country_id','=', 't4.id')
                            ->leftJoin('par_regions as t5', 't1.region_id','=', 't5.id')
                            ->join('tra_trader_authorization as t6', 't1.identification_no','=','t6.authorisedidentification_no')
                            ->leftJoin("par_authorisation_statuses as t7", 't6.authorisation_status_id', '=', 't7.id')
                            ->leftJoin("users as t8", 't6.created_by', '=', 't8.id')
                            ->where(array('t6.traderidentification_no'=>$trader_no));

                $data =  $sql->select(DB::raw("t1.*,t6.traderidentification_no,t6.authorisedidentification_no,  CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as effected_by, t6.created_on as effected_on, t2.name as trader_category, t3.name as account_status, t4.name as country_name,t5.name as region_name, t6.authorised_from,t6.authorised_to, t7.name as authorisation_status"))
                                ->get();

                $res = array('success'=>true,  'results'=>$data);

                
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
    
      
    public function gettraderUsersAccountsManagementDetails(Request $req){
        try{
               
                $trader_id = $req->trader_id;
                //get the identifiaiton no 
                            $identification_no = getSingleRecordColValue('wb_trader_account', array('id' => $trader_id), 'identification_no');
                            $web_trader_id = getSingleRecordColValue('wb_trader_account', array('identification_no' => $identification_no), 'id','portal_db');
                            
                $data = DB::connection('portal_db')->table('wb_trader_account as t1')
                            ->join('wb_traderauthorised_users as t2', 't1.id','=','t2.trader_id')
                            ->select(DB::raw("t2.email,t2.telephone_no, t1.identification_no, t2.created_on,t2.id, t2.last_login_time, $trader_id as  trader_id"))
                            ->where('t1.id',$web_trader_id)
                            ->get();
                          
                $res = array('success'=>true,  'results'=>$data);

                
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
    public function getTraderStatusesCounter(){
        try{
            
            $data = array('pending_approval'=>$this->returnStatuscounter(5),
                         'registered_traders'=>$this->returnStatuscounter(1),
                         'rejected_traders'=>$this->returnStatuscounter(4),
                         'dormant_account'=>$this->returnStatuscounter(2));
            $res = array('success'=>true, 'results'=>$data);

            
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
    function returnStatuscounter($status_id){
        $counter = 0;

        $counter = DB::table('wb_trader_account as t1')
                ->join('par_account_statuses as t3', 't1.status_id','=','t3.id')
                ->where(array('status_id'=>$status_id))
                ->count();
        
         return  $counter;  
    }
    public function getDownloadTinCertificateUrl(Request $req){
        try{
               
                $trader_id = $req->trader_id;
                
                $data = DB::table('tra_traderdocuments_uploads as t1')
                            ->select(DB::raw("t1.*"))
                            ->where('t1.trader_id',$trader_id)
                            ->first();
                if($data){
                    $auth_response = authDms('');
                    $ticket = $auth_response['ticket'];
                    $node_ref = $data->node_ref;
                    $url = downloadDocumentUrl($ticket,$node_ref,'');
                    $res = array('success'=>true, 'message'=>'Document  found', 'document_url'=>$url);
                }
                else{
                    $res = array('success'=>false, 'message'=>'Document not found');
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
    public function getTradersProductsDetailsinformation(Request $req){
        try{
               
                $trader_id = $req->trader_id;
                $traderidentification_no = $req->traderidentification_no;
                $authorisedidentification_no = $req->authorisedidentification_no;

                $records = DB::table('tra_registered_products as t1')
                                ->join('tra_product_information as t2','t1.tra_product_id', '=', 't2.id')
                                ->join('tra_product_applications as t3','t2.id', '=','t3.product_id')
                                ->leftJoin('par_registration_statuses as t4', 't1.registration_status_id', '=', 't4.id')
                                ->leftJoin('par_validity_statuses as t10', 't1.validity_status_id', '=', 't10.id')
                                ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                                ->join('tra_approval_recommendations as t6', 't3.application_code', '=', 't6.application_code')
                                ->leftJoin('wb_trader_account as t7', 't3.applicant_id', '=', 't7.id')
                                ->leftJoin('tra_trader_productauthorization as t8', function ($join) use ($authorisedidentification_no)  {
                                    $join->on('t1.id', '=', 't8.reg_product_id')
                                            ->where('t8.authorisedidentification_no', $authorisedidentification_no);
                                })
                                ->leftJoin('par_prodappoval_status as t9','t8.status_id','=','t9.id')
                                ->select(DB::raw("t8.*,t8.id as authorisation_id, t1.id as authreg_product_id, t2.brand_name,t4.name as registration_status,t10.name as validity_status, t5.name as common_name, t6.certificate_no, t9.name as prodappoval_status"))
                               ->where('t7.identification_no',$traderidentification_no)
                               ->groupBy('t1.id')
                                ->get();
            
                $res = array('results'=>$records,'success'=>true);

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
    public function updateTraderProductAuthorisation(Request $req){
        try{
            
            $status_id = 3;
            $user_id = $this->user_id;
            $authorisation_id = $req->authorisation_id;
            $reg_product_id = $req->reg_product_id;
            $traderidentification_no = $req->traderidentification_no;
            $authorisedidentification_no = $req->authorisedidentification_no;
            $table_name = 'tra_trader_productauthorization';
            $where_statement = array('id'=>$authorisation_id);
            $rec = Db::table($table_name)
                        ->where($where_statement)
                        ->first();
            if($rec){
                $data = array( 'status_id'=>$status_id,
                                'dola' => Carbon::now(),
                                'altered_by' => $user_id 
                        );
                        $prev_data = getPreviousRecords($table_name, $where_statement);
                       $res = updateRecord($table_name, $prev_data['results'], $where_statement, $data, $user_id);
            }
            if($res['success']){


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
    public function saveTraderProductAuthorisation(Request $request)
    {
        $traderidentification_no = $request->input('traderidentification_no');
        $authorisedidentification_no = $request->input('authorisedidentification_no');
        $status_id = 2;
        $authorisation_data = $request->input('selected');
        $authorisation_data = json_decode($authorisation_data);
        $table_name = 'tra_trader_productauthorization';
        $user_id = $this->user_id;
        try {
            $insert_params = array();
            foreach ($authorisation_data as $auth_data) {
                
                $reg_product_id = $auth_data->reg_product_id;
                $authorisation_id = $auth_data->authorisation_id;
                if (validateIsNumeric($authorisation_id)) {
                    $where = array(
                        'id' => $authorisation_id
                    );
                   
                    $update_params = array(
                        'reg_product_id' => $reg_product_id,
                        'status_id'=>$status_id,
                        'traderidentification_no' => $traderidentification_no,
                        'authorisedidentification_no' => $authorisedidentification_no,
                        'dola' => Carbon::now(),
                        'altered_by' => $user_id
                    );
                    $prev_data = getPreviousRecords($table_name, $where);
                    updateRecord($table_name, $prev_data['results'], $where, $update_params, $user_id);
                } else {
                    $insert_params[] = array(
                        'reg_product_id' => $reg_product_id,
                        'status_id'=>$status_id,
                        'traderidentification_no' => $traderidentification_no,
                        'authorisedidentification_no' => $authorisedidentification_no,
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
                'message' => 'Product Authorisation details saved successfully!!'
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
    } public function getApplicantsList(Request $req)
    {
        $applicant_id = $req->input('applicant_id');
        $applicantType = $req->input('applicantType');
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
                ->select('t1.id as applicant_id', 't1.name as applicant_name', 't1.contact_person', 't1.tin_no','t1.identification_no',
                    't1.country_id as app_country_id', 't1.region_id as app_region_id', 't1.district_id as app_district_id',
                    't1.physical_address as app_physical_address', 't1.postal_address as app_postal_address', 't1.telephone_no as app_telephone','t2.is_local',
                    't1.fax as app_fax', 't1.email as app_email', 't1.website as app_website', 't2.name as country_name', 't3.name as region_name', 't4.name as district_name',
                    't1.id as ltr_id', 't1.name as ltr_name', 't1.country_id as ltr_country_id', 't1.region_id as ltr_region_id', 't1.district_id as ltr_district_id',
                    't1.physical_address as ltr_physical_address', 't1.postal_address as ltr_postal_address',
                    't1.telephone_no as ltr_telephone', 't1.fax as ltr_fax','t1.*', 't1.email as ltr_email', 't1.website as ltr_website');

            if (isset($applicant_id) && $applicant_id != '') {
                $qry->where('t1.id', $applicant_id);
            }
            
            if ($applicantType !='' && $applicantType == 'local') {
                $qry->where('t2.is_local', 1);
            }

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

    public function gettraderSyncApplicationsRequestCounters(Request $req){
        $trader_data=DB::table('tra_trader_applications_synchronization as t1')
            ->join('wb_trader_account as t2','t1.trader_id','t2.id')
            ->select('t2.id','t2.name')
            ->groupBy('t1.trader_id')
            ->get();
        $result=array();
            foreach ($trader_data as $trader) {
                $totals_request=DB::table('tra_trader_applications_synchronization')->where('trader_id',$trader->id)->count();
                 $totals_pending_merge=DB::table('tra_trader_applications_synchronization')->where('trader_id',$trader->id)->where('status_id',1)->count();
                 $totals_merged=DB::table('tra_trader_applications_synchronization')->where('trader_id',$trader->id)->where('status_id',2)->count();
                 $totals_unprocessed=DB::table('tra_trader_applications_synchronization')->where('trader_id',$trader->id)->where('status_id',3)->count();
                 $result[]=array(
                    'id'=>$trader->id,
                    'trader_name'=>$trader->name,
                    'total_request'=>$totals_request,
                    'total_pending_merge'=>$totals_pending_merge,
                    'total_merged'=>$totals_merged,
                    'total_rejected'=>$totals_unprocessed
                );
            }
        $res = array(
                    'success' => true,
                    'results' => $result,
                    'message' => 'All is well'
            );
        return \response()->json($res);
    }

    public function gettraderSyncApplicationsDetails(Request $req){
        $trader_id=$req->trader_id;

        if(validateIsNumeric($trader_id)){
            $results=DB::table('tra_trader_applications_synchronization as t1')
                        ->leftJoin('modules as t2','t1.module_id','t2.id')
                        ->leftJoin('par_trader_applications_synchronization_status as t3','t1.status_id','t3.id')
                        ->select('t1.id as main_id','t1.*', 't1.reference_no','t2.name as module_name','t3.name as status_name', 't1.registration_no')
                        ->where('trader_id',$trader_id)
                        ->get();

            $final_records=array();

            foreach ($results as $key=>$result) {
                $kkk=convertStdClassObjToArray($result);
                $refs=explode(';', $result->reference_no);
            
                //$a=clone $result;
                for($i=0;$i<count($refs);$i++){
                    $kkk['reference_no']=$refs[$i];
                    //$kkk['id']=$refs[$i].$result->main_id;
                    $final_records[]=$kkk;
                }   
            }
       
            //dd($temp);
                
        $res = array(
                    'success' => true,
                    'results' => $final_records,
                    'message' => 'All is well'
            );
            }else{
                $res = array(
                    'success' => false,
                    'results' => [],
                    'message' => 'Trader_id Not set'
            ); 
            }


        return \response()->json($res);
          
        
    }


    //to be moved to migration script
   public function mergeTraderSyncApplications(Request $req){
        try{

        
        $record_id=$req->record_id;
        $reference_no=$req->reference_no;
        $registration_no= str_replace(' ', '', $req->registration_no);
        $trader_id=$req->trader_id;

        $sync_data=DB::table('tra_trader_applications_synchronization as t1')->where('id',$record_id)->first();

        $trader_data = DB::table('wb_trader_account')->where('id',$trader_id)->select('email')->first();
        if($trader_data){
            $trader_email = $trader_data->email;
        }else{
            $trader_email = '';
        }

        //table_name
        $table_name=$this->getTableName($sync_data->module_id);
        //select the application data
   
            if(  $registration_no != ''){
                     $records=DB::table($table_name.' as t1')
                ->leftJoin('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                ->whereRAW("(REPLACE(t2.certificate_no, ' ','') = '".$registration_no."' OR t2.permit_no = '".$registration_no."')")
                ->select('t1.application_code', 't1.applicant_id','t2.certificate_no')
                ->get(); 
            }
            else{
                     $records=DB::table($table_name.' as t1')
                ->leftJoin('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                ->whereRAW("(t1.reference_no = '".$reference_no."')")
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
                    
                    DB::table('tra_trader_applications_synchronization')->where(array('id'=>$record_id))->update(array('status_id'=>4, 'dola'=>Carbon::now()));

                     $res = array(
                                'success' => true,
                                'message' => 'Application already merged'
                            );
                    
                }
                else{
                    //update the application table
                    DB::table($table_name)->where('application_code',$application_code)->update(['applicant_id'=>$trader_id]);
                    //update submission table
                     DB::table('tra_submissions')->where('application_code',$application_code)->update(['applicant_id'=>$trader_id]);
                    //update payment table
                     DB::table('tra_payments')->where('application_code',$application_code)->update(['applicant_id'=>$trader_id]);
                     //update invoices table
                     DB::table('tra_application_invoices')->where('application_code',$application_code)->update(['applicant_id'=>$trader_id]);
                     DB::table('tra_trader_applications_synchronization')->where(array('id'=>$record_id))->update(array('status_id'=>2, 'dola'=>Carbon::now()));


                     if($trader_email != ''){ 
                             $vars = array(
                                '{registration_no}' => $registration_number
                             );
                           //sendTemplatedApplicationNotificationEmail( 13, $trader_email, $vars );
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
             DB::table('tra_trader_applications_synchronization')->where(array('id'=>$record_id))->update(array('status_id'=>3, 'dola'=>Carbon::now()));
            $res = array(
                'success' => false,
                'message' => 'Application not found, confirm the application reference details to effect the Merge'
            );
            //sendha an email notification
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

    public function getTableName($module){

          $qry=DB::table('modules')
                ->where('id',$module)->first();

          $table=$qry->table_name;

        return $table;
   }
    public function  getTraderAuthorisedProducts(Request $req){
            try{
                $records= array();
                $trader_id = $req->trader_id;
                if(validateIsNumeric($trader_id)){
                    $qry= DB::table('tra_product_applications as t1')
                        ->Join('tra_product_information as t2','t1.product_id','t2.id')
                        ->leftJoin('par_classifications as t3','t2.classification_id','t3.id')
                        ->leftJoin('par_common_names as t4','t2.common_name_id','t4.name')
                        ->leftJoin('sub_modules as t5','t1.module_id','t5.id')
                        ->leftJoin('par_sections as t6','t1.section_id','t6.id')
                        ->join('tra_approval_recommendations as t7','t1.application_code','t7.application_code')
                        ->join('tra_registered_products as t8','t8.tra_product_id','t1.product_id')
                        ->join('par_validity_statuses as t9','t8.validity_status_id','t9.id')
                        ->join('par_registration_statuses as t10','t8.registration_status_id','t10.id')
                        
                        ->join('wb_trader_account as t11','t1.applicant_id','t11.id')
                        ->join('wb_trader_account as t12','t1.local_agent_id','t12.id')
                         
                        ->select('t1.reference_no','t1.tracking_no','t2.brand_name','t3.name as classification_name','t4.name as common_name','t1.date_added as registration_date','t5.name as sub_module_name','t6.name as section_name','t7.certificate_no', 't9.name as validity_status', 't10.name as registration_status', 't11.name as registrant', 't12.name as local_agent')
                        ->where(function ($query) use ($trader_id) {
                            return $query->where('applicant_id', '=', $trader_id)
                                         ->orWhere('local_agent_id', '=', $trader_id);
                                         
                        })
                        ->orderBy('t7.expiry_date', 'desc')
                        ->groupBy('t8.id');

                        $qry2= DB::table('tra_product_applications as t1')
                        ->Join('tra_product_information as t2','t1.product_id','t2.id')
                        ->leftJoin('par_classifications as t3','t2.classification_id','t3.id')
                        ->leftJoin('par_common_names as t4','t2.common_name_id','t4.name')
                        ->leftJoin('sub_modules as t5','t1.module_id','t5.id')
                        ->leftJoin('par_sections as t6','t1.section_id','t6.id')
                        ->join('tra_approval_recommendations as t7','t1.application_code','t7.application_code')->join('tra_registered_products as t8','t8.tra_product_id','t1.product_id')
                        ->join('par_validity_statuses as t9','t8.validity_status_id','t9.id')
                        ->join('par_registration_statuses as t10','t8.registration_status_id','t10.id')
                        
                        ->join('wb_trader_account as t11','t1.applicant_id','t11.id')
                        ->join('wb_trader_account as t12','t1.local_agent_id','t12.id')
                        ->join('tra_trader_productauthorization as t13', function ($join) {
                            $join->on('t1.id', '=', 't13.reg_product_id')
                                ->on('t13.traderidentification_no','t11.identification_no')
                                 ->where('t13.status_id', '=', 2);
                        })
                        
                        ->join('wb_trader_account as t14','t13.traderidentification_no','t14.identification_no')
                        ->select('t1.reference_no','t1.tracking_no','t2.brand_name','t3.name as classification_name','t4.name as common_name','t1.date_added as registration_date','t5.name as sub_module_name','t6.name as section_name','t7.certificate_no', 't9.name as validity_status', 't10.name as registration_status', 't11.name as registrant', 't12.name as local_agent')
                        ->where(function ($query) use ($trader_id) {
                            return $query->where('t14.id', '=', $trader_id);
                                         
                        })
                        ->orderBy('t7.expiry_date', 'desc')
                        ->groupBy('t8.id');


                        $qry->union($qry2);
                        $records = $qry->get();
                }

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
   public function getTraderRegisteredProductsDetails(request $req){
    $trader_id = $req->trader_id;

    if(validateIsNumeric($trader_id)){
    $qry= DB::table('tra_product_applications as t1')
        ->Join('tra_product_information as t2','t1.product_id','t2.id')
        ->leftJoin('par_classifications as t3','t2.classification_id','t3.id')
        ->leftJoin('par_common_names as t4','t2.common_name_id','t4.name')
        ->leftJoin('sub_modules as t5','t1.module_id','t5.id')
        ->leftJoin('par_sections as t6','t1.section_id','t6.id')
        ->leftJoin('tra_approval_recommendations as t7','t1.application_code','t7.application_code')
         ->where('t1.applicant_id',$trader_id)
        ->select('t1.reference_no','t1.tracking_no','t2.brand_name','t3.name as classification_name','t4.name as common_name','t1.date_added as registration_date','t5.name as sub_module_name','t6.name as section_name','t7.certificate_no')
        ->get();
        $res = array(
                    'success' => true,
                    'results' => $qry,
                    'message' => 'All is well'
            );
            }else{
                $res = array(
                    'success' => false,
                    'results' => [],
                    'message' => 'Trader_id Not set'
            ); 
            }


        return \response()->json($res);
   }
   public function getTraderRegisteredPremisesDetails(request $req){
    $trader_id = $req->trader_id;

    if(validateIsNumeric($trader_id)){
    $qry= DB::table('tra_premises_applications as t1')
        ->Join('tra_premises as t2','t1.premise_id','t2.id')
        ->leftJoin('tra_premises_otherdetails as t4','t1.premise_id','t4.premise_id')
        ->leftJoin('par_business_types as t5','t4.business_type_id','t5.name')
        ->leftJoin('sub_modules as t6','t1.module_id','t6.id')
        ->leftJoin('par_sections as t7','t1.section_id','t7.id')
        ->leftJoin('tra_approval_recommendations as t8','t1.application_code','t8.application_code')
        ->where('t1.applicant_id',$trader_id)
        ->select('t1.reference_no','t1.tracking_no','t2.name as premise_name','t5.name as business_type','t1.date_added as registration_date','t6.name as sub_module_name','t7.name as section_name','t8.certificate_no')
        ->get();
        $res = array(
                    'success' => true,
                    'results' => $qry,
                    'message' => 'All is well'
            );
            }else{
                $res = array(
                    'success' => false,
                    'results' => [],
                    'message' => 'Trader_id Not set'
            ); 
            }


        return \response()->json($res);
   }

   public function getTraderApprovedGmpDetails(request $req){
    $trader_id = $req->trader_id;

    if(validateIsNumeric($trader_id)){
    $qry= DB::table('tra_gmp_applications as t1')
        ->leftJoin('par_facility_location as t2','t1.gmp_type_id','t2.id')
        ->leftJoin('par_man_sites as t3','t1.reg_site_id','t3.id')
        ->leftJoin('sub_modules as t5','t1.module_id','t5.id')
        ->leftJoin('par_sections as t6','t1.section_id','t6.id')
        ->leftJoin('tra_approval_recommendations as t7','t1.application_code','t7.application_code')
         ->where('t1.applicant_id',$trader_id)
        ->select('t1.reference_no','t1.tracking_no','t2.name as gmp_type','t3.name as site_name','t1.date_added as registration_date','t5.name as sub_module_name','t6.name as section_name','t7.certificate_no')
        ->get();
        $res = array(
                    'success' => true,
                    'results' => $qry,
                    'message' => 'All is well'
            );
            }else{
                $res = array(
                    'success' => false,
                    'results' => [],
                    'message' => 'Trader_id Not set'
            ); 
            }


        return \response()->json($res);
   }

   public function SendTraderNotificationEmail(request $req){
        $user_id = $this->user_id;
        //get data
        $data = $req->all();
        $to = $data['email_to'];
        $subject = $data['email_subject'];
        $email_content = $data['email_body'];
        $cc = $data['email_cc'];
        $bcc = '';

        //sender data for the email
        $sender_data = DB::table('wb_trader_account')->where('id',$user_id)->first();
       
        if(isset($sender_data->email)){

           
            //insert log
            $insert = DB::table('tra_tradernotification_emails')->insert(
                array(
                'trader_id' => $sender_data->id,
                'email' => $to,
                'subject' => $subject,
                'message' => $email_content,
                'email_cc' => $cc,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            ));
            
            
            //send main mail
            return sendMailFromNotification("User", $to,$subject,$email_content,$cc,$sender_data->email);

        }
        else{
            $res = array(
                'success'=>false,
                'message'=>'No email is linked to your account details'
             ); 
            return $res;
        }
   }

   public function GetTraderEmailNotifications(request $req){

        $email = $req->email;

        $qry = DB::table('tra_tradernotification_emails as t1')
                ->join('wb_trader_account as t2','t1.trader_id','t2.id')
                ->select('t1.*','t2.name');
                
        if(isset($email)){
           $qry->where('t1.email',$email);
        }
     

        $res = array(
            'success' => true,
            'results' => $qry->get(),
            'message' => 'all is well'
        );

        return $res;
   }
   public function DeleteTraderNotificationMail(Request $req){
        $id = $req->id;

        $res = DB::table('tra_tradernotification_emails')->where('id',$id)->delete();

        if($res){
            $res = array(
            'success' => true,
            'results' => 'Deleted Successfully',
            'message' => 'Deleted Successfully'
        );
        }else{
            $res = array(
            'success' => false,
            'results' => $qry,
            'message' => 'Something went Wrong'
        );
        }

        return $res;
   }

}
