<?php

namespace Modules\UserManagement\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use App\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class UserManagementController extends Controller
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

    public function index()
    {
        return view('usermanagement::index');
    }

    public function getUserParamFromModel(Request $request)
    {
        $model_name = $request->input('model_name');
        $strict_mode = $request->input('strict_mode');
        try {
            $model = 'Modules\\UserManagement\\Entities\\' . $model_name;
            if (isset($strict_mode) && $strict_mode == 1) {
                $results = $model::where('is_enabled', 1)
                    ->get()
                    ->toArray();
            } else {
                $results = $model::all()
                    ->toArray();
            }
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
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

    public function saveUserCommonData(Request $req)
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
            $table_data = $post_data;
            //add extra params
            $table_data['created_at'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where)) {
                    unset($table_data['created_at']);
                    unset($table_data['created_by']);
                    $table_data['updated_at'] = Carbon::now();
                    $table_data['updated_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }else{
                    $res = array(
                        'success' => false,
                        'message' => "Application with that id is missing"
                    );
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

    public function deleteUserRecord(Request $req)
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

    public function softDeleteUserRecord(Request $req)
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
            $res = softDeleteRecord($table_name, $previous_data, $where, $user_id);
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

    public function undoUserSoftDeletes(Request $req)
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
            $res = undoSoftDeletes($table_name, $previous_data, $where, $user_id);
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

    public function getActiveSystemUsers(Request $request)
    {
        $group_id = $request->input('group_id');
        $department_id = $request->input('department_id');
        $directorate_id = $request->input('directorate_id');
        try {
            $qry = DB::table('users as t1')
                ->leftJoin('par_titles as t2', 't1.title_id', '=', 't2.id')
                ->leftJoin('par_user_images as t3', 't1.id', '=', 't3.user_id')
                ->leftJoin('par_departments as t4', 't1.department_id', '=', 't4.id')
                ->leftJoin('par_zones as t5', 't1.zone_id', '=', 't5.id')
                ->leftJoin('tra_blocked_accounts as t6', 't1.id', '=', 't6.account_id')
                ->leftJoin('tra_user_group as t7','t1.id','t7.user_id')
                ->select(DB::raw("t1.*,CONCAT_WS(' ',t2.name,decrypt(t1.first_name),decrypt(t1.last_name)) as fullnames,decrypt(t1.email) as email,
                                   t1.last_login_time,t3.saved_name,t4.name as department_name,t5.name as zone_name, t7.id as group_id"))
                ->whereNull('t6.id');
            if (isset($group_id) && $group_id != '') {
                $users = DB::table('tra_user_group')
                    ->select('user_id')
                    ->where('group_id', $group_id)
                    ->get();
                $users = convertStdClassObjToArray($users);
                $users = convertAssArrayToSimpleArray($users, 'user_id');
                $qry->whereIn('t1.id', $users);
            }

            if(validateIsNumeric($department_id)){
                $qry->where('t1.department_id',$department_id);
            }
            if(validateIsNumeric($directorate_id)){
                $qry->where('t1.directorate_id',$directorate_id);
            }
            $results = $qry->get();
            $results = convertStdClassObjToArray($results);
            $results = decryptArray($results);
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

    public
    function getBlockedSystemUsers()
    {
        try {
            $qry = DB::table('users as t1')
                ->join('tra_blocked_accounts as t2', 't1.id', '=', 't2.account_id')
                ->leftJoin('users as t3', 't3.id', '=', 't2.action_by')
                ->leftJoin('par_user_images as t4', 't1.id', '=', 't4.user_id')
                ->leftJoin('par_titles as t6', 't1.title_id', '=', 't6.id')
                ->leftJoin('par_departments as t7', 't1.department_id', '=', 't7.id')
                ->leftJoin('par_zones as t8', 't1.zone_id', '=', 't8.id')
                ->select(DB::raw("t1.*,CONCAT_WS(' ',t6.name,decrypt(t1.first_name),decrypt(t1.last_name)) as fullnames,decrypt(t1.email) as email,
                                   t1.last_login_time,t4.saved_name,t7.name as department_name,t8.name as zone_name,t2.date as blocked_on,
                                   t2.reason,t3.first_name as first_name2,t3.last_name as last_name2,t2.account_id"));
            $data = $qry->get();
            $data = convertStdClassObjToArray($data);
            $data = decryptArray($data);
            $res = array(
                'success' => true,
                'results' => $data,
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

    public
    function getUnblockedSystemUsers()
    {
        try {
            $qry = DB::table('users as t1')
                ->join('tra_unblocked_accounts as t2', 't1.id', '=', 't2.account_id')
                ->leftJoin('users as t3', 't3.id', '=', 't2.action_by')
                ->leftJoin('par_user_images as t4', 't1.id', '=', 't4.user_id')
                ->leftJoin('par_titles as t6', 't1.title_id', '=', 't6.id')
                ->leftJoin('par_departments as t7', 't1.department_id', '=', 't7.id')
                ->leftJoin('par_zones as t8', 't1.zone_id', '=', 't8.id')
                ->select(DB::raw("t1.*,CONCAT_WS(' ',t6.name,decrypt(t1.first_name),decrypt(t1.last_name)) as fullnames,decrypt(t1.email) as email,
                                   t1.last_login_time,t4.saved_name,t7.name as department_name,t8.name as zone_name,t2.date as blocked_on,
                                   t2.unblock_date,t2.reason,t3.first_name as first_name3,t3.last_name as last_name3,t2.account_id,t2.unblock_reason"));
            $data = $qry->get();
            $data = convertStdClassObjToArray($data);
            $data = decryptArray($data);
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

    public function uploadUserSignature(Request $request)
    {
        $usr_id = $request->input('user_id');
        $params = array(
            'user_id' => $usr_id
        );
        $table_name = 'tra_users_signature_uploads';
        $folder = Config('constants.signs_path');
        DB::table($table_name)->where('user_id', $usr_id)->delete();
        $user_id = $this->user_id;
        $res = uploadFile($request, $params, $table_name, $folder, $user_id);
        return \response()->json($res);
    }

    public function getUserSignatures()
    {
        try {
            $qry = DB::table('users as t1')
                ->leftJoin('tra_users_signature_uploads as t2', 't1.id', '=', 't2.user_id')
                ->select(DB::raw("t1.*,CONCAT_WS(' ',decrypt(t1.first_name),decrypt(t1.last_name)) as fullnames,decrypt(t1.email) as email,
                         t2.savedname"));
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
        return response()->json($res);
    }

    public function saveUserInformation(Request $req)
    {
        $res = array();
        DB::transaction(function () use ($req, &$res) {
            $user_id = \Auth::user()->id;

            $id = $req->input('id');
            $email = $req->input('email');
            $profile_url = $req->input('saved_name');
            $first_name = $req->input('first_name');
            $othernames = $req->input('last_name');

            $groups = $req->input('groups');
            $groups = json_decode($groups);
            $assigned_groups = array();

            $table_data = array(
                'first_name' => $first_name,
                'last_name' => $othernames,
                'gender_id' => $req->input('gender_id'),
                'mobile' => $req->input('mobile'),
                'phone' => $req->input('phone'),
                'title_id' => $req->input('title_id'),
                'directorate_id' => $req->input('directorate_id'),
                'department_id' => $req->input('department_id'),
                'user_category_id' => $req->input('user_category_id'),
                'externaluser_category_id' => $req->input('externaluser_category_id'),
                'institution' => $req->input('institution'),
                'zone_id' => $req->input('zone_id'),
                'active_from' => $req->input('active_from'),
                'active_to' => $req->input('active_to'),
                'has_expiry_exemption' => $req->input('has_expiry_exemption'),
                'expiry_exemption_remark' => $req->input('expiry_exemption_remark'),
                'has_dormant_exemption' => $req->input('has_dormant_exemption'),
                'dormant_exemption_remark' => $req->input('dormant_exemption_remark'),
                'has_password_change_exemption' => $req->input('has_password_change_exemption'),
                'password_change_exemption_remark' => $req->input('password_change_exemption_remark'),
                'has_account_timestamp' => $req->input('has_account_timestamp')
            );

            $skip = $req->input('skip');
            $skipArray = explode(",", $skip);
            $skipArray[] = 'user_category_id';
            $skipArray[] = 'user_category_id';
            $table_data = encryptArray($table_data, $skipArray);

            $where = array(
                'id' => $id
            );
            $table_name = 'users';
            try {
                if (isset($id) && $id != "") {
                    if (recordExists($table_name, $where)) {
                        $table_data['updated_at'] = Carbon::now();
                        $table_data['updated_by'] = $user_id;

                        $previous_data = getPreviousRecords($table_name, $where);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                        $previous_data = $previous_data['results'];
                        $encryptedEmail = aes_encrypt($email);
                        
                        //add extra params
                        $user_email = $previous_data[0]['email'];
                        $password = $previous_data[0]['username'];
                        $vars = array(
                                '{username}' => $email,
                                '{password}' => $password
                            );
                        if($user_email != $encryptedEmail){
                            
                            if($password == ''){
                                $password = str_random(8);
                            }
                            
                            $uuid = generateUniqID();//unique user ID
                            $pwd = hashPwd($encryptedEmail, $uuid, $password);
                            $table_data['email'] = $encryptedEmail;
                            $table_data['password'] = $pwd;
                            $table_data['uuid'] = $uuid;
                             
                            $email_res = accountRegistrationEmail(18, $email, $password, '', $vars);
                        }
                        else{
                            $email_res = accountRegistrationEmail(19, $email, $password, '', $vars);
                        }
                        
                        $success = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                        //check profile pic
                        if (recordExists('par_user_images', array('user_id' => $id))) {
                            if ($profile_url != '') {
                                DB::table('par_user_images')
                                    ->where(array('user_id' => $id))
                                    ->update(array('saved_name' => $profile_url));
                            }
                        }
                        if ($success['success'] === true) {
                            if (count($groups) > 0) {
                                foreach ($groups as $group_id) {
                                    $assigned_groups[] = array(
                                        'user_id' => $id,
                                        'group_id' => $group_id
                                    );
                                }
                                DB::table('tra_user_group')->where('user_id', $id)->delete();
                                DB::table('tra_user_group')->insert($assigned_groups);
                            }
                            //log change
                            $table_data['user_id'] = $id;
                            unset($table_data['id']);
                             DB::table('users_logs')->insert($table_data);

                            $res = array(
                                'success' => true,
                                'message' => 'Data updated Successfully!!'
                            );
                        } else {
                            $res = $success;
                        }
                    }
                } else {
                    //check if this email has been used before
                    $encryptedEmail = aes_encrypt($email);
                    $email_exists = DB::table('users')
                        ->where('email', $encryptedEmail)
                        ->first();
                    if (!is_null($email_exists)) {
                        $res = array(
                            'success' => false,
                            'message' => 'This Email Address (' . $email . ') is already registered. Please use a different Email Address!!'
                        );
                        return response()->json($res);
                    }

                    $password = str_random(8);
                    $uuid = generateUniqID();//unique user ID
                    $pwd = hashPwd($encryptedEmail, $uuid, $password);
                    //add extra params
                    $table_data['email'] = $encryptedEmail;
                    $table_data['password'] = $pwd;
                    $table_data['uuid'] = $uuid;

                    //first lets send this user an email with random password to avoid having a user in the db who hasn't receive pwd
                   if (is_connected()) {
                        //send the mail here
                        $link = url('/');
                        $vars = array(
                            '{username}' => $email,
                            '{password}' => $password
                        );
                        $email_res = accountRegistrationEmail(6, $email, $password, $link, $vars);
                        if ($email_res['success'] == false) {
                            $res = $email_res;
                        } else {
                            $table_data['created_at'] = Carbon::now();
                            $table_data['created_by'] = $user_id;
                            $results = insertRecord($table_name, $table_data, $user_id);
                            if ($results['success'] == true) {
                                $insertId = $results['record_id'];
                                if (count($groups) > 0) {
                                    foreach ($groups as $group_id) {
                                        $assigned_groups[] = array(
                                            'user_id' => $insertId,
                                            'group_id' => $group_id
                                        );
                                    }
                                    DB::table('tra_user_group')->insert($assigned_groups);
                                }
                                if ($profile_url != '') {
                                    DB::table('par_user_images')
                                        ->where(array('saved_name' => $profile_url))
                                        ->update(array('user_id' => $insertId));
                                }
                                $res = array(
                                    'success' => true,
                                    'message' => 'User added successfully. Further account login credentials have been send to ' . $email . '. The user should check his/her email for login details!'
                                );
                            } else {
                                $res = array(
                                    'success' => false,
                                    'message' => $results['message']
                                );
                            }
                        }
                    } else {
                        $res = array(
                            'success' => false,
                            'message' => 'Whoops!! There is no internet connection. Check your connection then try again!!'
                        );
                    }
                }
            } catch (\Exception $e) {
                $res = array(
                    'success' => false,
                    'message' => $e->getMessage()
                );
            }
        }, 5);
        return response()->json($res);
    }

    public function getOpenUserGroups(Request $request)
    {
        $user_id = $request->input('user_id');
        // $department_id = $request->input('department_id');
        // $zone_id = $request->input('zone_id');
        // $where = array(
        //     'department_id' => $department_id,
        //     'zone_id' => $zone_id
        // );
        try {
            $qry = DB::table('par_groups as t1');
              //  ->where($where);
            if (isset($user_id) && $user_id != '') {
                $qry->whereNotIn('t1.id', function ($query) use ($user_id) {
                    $query->select(DB::raw('t2.group_id'))
                        ->from('tra_user_group as t2')
                        ->whereRaw('t2.user_id=' . $user_id);
                });
            }
            $data = $qry->get();
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

    public function getAssignedUserGroups(Request $request)
    {
        $user_id = $request->input('user_id');
        try {
            $qry = DB::table('tra_user_group as t1')
                ->join('par_groups as t2', 't1.group_id', '=', 't2.id')
                ->select('t2.*')
                ->where('t1.user_id', $user_id);
            $data = $qry->get();
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

    public function getOpenUserRoles(Request $request)
    {
        $user_id = $request->input('user_id');
        //$access_point_id = $request->input('accessPointId');
        try {
            $qry = DB::table('par_user_roles as t1');
            //->where('group_owner_level', $access_point_id);
            if (isset($user_id) && $user_id != '') {
                $qry->whereNotIn('t1.id', function ($query) use ($user_id) {
                    $query->select(DB::raw('t2.role_id'))
                        ->from('tra_user_roles_assignment as t2')
                        ->whereRaw('t2.user_id=' . $user_id);
                });
            }
            $data = $qry->get();
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

    public function getAssignedUserRoles(Request $request)
    {
        $user_id = $request->input('user_id');
        try {
            $qry = DB::table('tra_user_roles_assignment as t1')
                ->join('par_user_roles as t2', 't1.role_id', '=', 't2.id')
                ->select('t2.*')
                ->where('t1.user_id', $user_id);
            $data = $qry->get();
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

    public function saveUserImage(Request $req)
    {
        $user_id = $req->input('id');
        $res = array();
        try {
            if ($req->hasFile('profile_photo')) {
                $ben_image = $req->file('profile_photo');
                $origImageName = $ben_image->getClientOriginalName();
                $extension = $ben_image->getClientOriginalExtension();
                $destination = getcwd() . '\resources\images\user-profile';
                $savedName = str_random(5) . time() . '.' . $extension;
                $ben_image->move($destination, $savedName);
                $where = array(
                    'user_id' => $user_id
                );
                if ($user_id != '') {
                    $recordExists = recordExists('par_user_images', $where);
                    if ($recordExists) {
                        $update_params = array(
                            'initial_name' => $origImageName,
                            'saved_name' => $savedName,
                            'updated_by' => \Auth::user()->id
                        );
                        DB::table('par_user_images')
                            ->where($where)
                            ->update($update_params);
                    } else {
                        $insert_params = array(
                            'user_id' => $user_id,
                            'initial_name' => $origImageName,
                            'saved_name' => $savedName,
                            'created_by' => \Auth::user()->id
                        );
                        DB::table('par_user_images')
                            ->insert($insert_params);
                    }
                } else {
                    $insert_params = array(
                        'user_id' => $user_id,
                        'initial_name' => $origImageName,
                        'saved_name' => $savedName,
                        'created_by' => \Auth::user()->id
                    );
                    DB::table('par_user_images')
                        ->insert($insert_params);
                }
                $res = array(
                    'success' => true,
                    'image_name' => $savedName,
                    'message' => 'Image uploaded successfully!!'
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
        return response()->json($res);
    }

    public
    function resetUserPassword(Request $req)
    {
        //i need his/her encrypted username and UUID
        $user_id = $req->input('id');
        $res = array();
        try {
            DB::transaction(function () use ($user_id, &$res) {
                $user = new User();
                $userData = $user->find($user_id);
                if ($userData) {
                    $encryptedEmail = $userData->email;
                    $dms_id = $userData->dms_id;
                    $decryptedEmail = aes_decrypt($encryptedEmail);
                    $uuid = $userData->uuid;
                    $prevPwd = $userData->password;
                    $newPassword = hashPwd($encryptedEmail, $uuid, $decryptedEmail);
                    $new_dms_pwd = md5($decryptedEmail);
                    $data = array(
                        'password' => $newPassword
                    );
                    $logData = array(
                        'account_id' => $user_id,
                        'prev_password' => $prevPwd,
                        'new_password' => $newPassword,
                        'action_by' => \Auth::user()->id,
                        'time' => Carbon::now()
                    );
                    $pwd_updated = User::find($user_id)->update($data);
                    if ($pwd_updated) {
                        DB::table('tra_password_reset_logs')->insert($logData);
                        DB::table('tra_failed_login_attempts')->where('account_id', $user_id)->delete();
                        //update dms password too
                        /*$dms_db = DB::connection('dms_db');
                        $dms_db->table('tblusers')
                            ->where('id', $dms_id)
                            ->update(array('pwd' => $new_dms_pwd));*/
                        $res = array(
                            'success' => true,
                            'message' => 'Password was reset successfully!!'
                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'message' => 'Problem encountered while resetting the password. Please try again!!'
                        );
                    }
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered while resetting the password-->User not found!!'
                    );
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

    function updateUserPassword(Request $req)
    {
        $res = array();
        try {
            DB::transaction(function () use ($req, &$res) {
                $user_id = $req->input('id');
                $newPassword = $req->input('new_pwd');
                $userData = User::find($user_id);
                if ($userData) {
                    $encryptedEmail = $userData->email;
                    $dms_id = $userData->dms_id;
                    $uuid = $userData->uuid;
                    $prevPwd = $userData->password;
                    $newPassword = hashPwd($encryptedEmail, $uuid, $newPassword);
                    $new_dms_pwd = md5($newPassword);
                    $data = array(
                        'password' => $newPassword
                    );
                    $logData = array(
                        'account_id' => $user_id,
                        'prev_password' => $prevPwd,
                        'new_password' => $newPassword,
                        'action_by' => \Auth::user()->id,
                        'time' => Carbon::now()
                    );
                    $pwd_updated = User::find($user_id)->update($data);
                    if ($pwd_updated) {
                        DB::table('tra_password_reset_logs')->insert($logData);
                        DB::table('tra_failed_login_attempts')->where('account_id', $user_id)->delete();
                        //update dms password too
                        /*  $dms_db = DB::connection('dms_db');
                          $dms_db->table('tblusers')
                              ->where('id', $dms_id)
                              ->update(array('pwd' => $new_dms_pwd));*/
                        $res = array(
                            'success' => true,
                            'message' => 'Password was reset successfully!!'
                        );
                    } else {
                        $res = array(
                            'success' => false,
                            'message' => 'Problem encountered while resetting the password. Please try again!!'
                        );
                    }
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered while resetting the password-->User not found!!'
                    );
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

    public function blockSystemUser(Request $req)
    {
        $user_id = $req->input('id');
        $email = $req->input('email');
        $reason = $req->input('reason');
        try {
            $params = array(
                'account_id' => $user_id,
                'email' => $email,
                'reason' => $reason,
                'action_by' => \Auth::user()->id,
                'date' => Carbon::now()
            );
            DB::table('tra_blocked_accounts')
                ->insert($params);
            $res = array(
                'success' => true,
                'message' => 'User blocked/deactivated successfully!!'
            );
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
        return response()->json($res);
    }

    public function unblockSystemUser(Request $req)
    {
        $user_id = $req->input('user_id');
        $reason = $req->input('reason');
        $res = array();
        try {
            DB::transaction(function () use ($user_id, $reason, &$res) {
                $blocking_details = DB::table('tra_blocked_accounts')
                    ->where('account_id', $user_id)
                    ->first();
                if (!is_null($blocking_details)) {
                    $unblock_details = array(
                        'account_id' => $blocking_details->account_id,
                        'email' => $blocking_details->email,
                        'date' => $blocking_details->date,
                        'action_by' => $blocking_details->action_by,
                        'reason' => $blocking_details->reason,
                        'unblock_reason' => $reason,
                        'unblock_by' => \Auth::user()->id,
                        'unblock_date' => Carbon::now()
                    );
                    DB::table('tra_unblocked_accounts')
                        ->insert($unblock_details);
                    DB::table('tra_blocked_accounts')
                        ->where('account_id', $user_id)
                        ->delete();
                    DB::table('tra_failed_login_attempts')
                        ->where('account_id', $user_id)
                        ->delete();
                    $res = array(
                        'success' => true,
                        'message' => 'User activated successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Anomaly encountered. Blocked user details not found!!'
                    );
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
//api users

    public function getApiSystemUsers(Request $request)
    {
        $group_id = $request->input('group_id');
        try {
            $qry = DB::table('apiusers as t1')
                ->leftJoin('par_apiuser_categories as t5', 't1.apiuser_category_id', '=', 't5.id')

                ->select(DB::raw("t1.*,decrypt(t1.email) as email,t1.last_login_time,t5.name as category_name"));
            if (isset($group_id) && $group_id != '') {
                $users = DB::table('tra_user_group')
                    ->select('user_id')
                    ->where('group_id', $group_id)
                    ->get();
                $users = convertStdClassObjToArray($users);
                $users = convertAssArrayToSimpleArray($users, 'user_id');
                $qry->whereIn('t1.id', $users);
            }
            $results = $qry->get();
            $results = convertStdClassObjToArray($results);
            $results = decryptArray($results);
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

    public function saveApiUserInformation(Request $req)
    {
        $res = array();
        DB::transaction(function () use ($req, &$res) {
            $user_id = \Auth::user()->id;

            $id = $req->input('id');
            $email = $req->input('email');

            $table_data = array(
                'mobile' => $req->input('mobile'),
                'phone' => $req->input('phone'),
                'apiuser_category_id' => $req->input('apiuser_category_id'),
            );

            $skip = $req->input('skip');
            $skipArray = explode(",", $skip);

            $table_data = encryptArray($table_data, $skipArray);

            $where = array(
                'id' => $id
            );
            $table_name = 'apiusers';
            try {
                if (isset($id) && $id != "") {
                    if (recordExists($table_name, $where)) {
                        $table_data['updated_at'] = Carbon::now();
                        $table_data['updated_by'] = $user_id;

                        $previous_data = getPreviousRecords($table_name, $where);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                        $previous_data = $previous_data['results'];
                        $success = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                       
                       
                        if ($success === true) {
                            $res = array(
                                'success' => true,
                                'message' => 'Data updated Successfully!!'
                            );
                        } else {
                            $res = $success;
                        }
                    }
                } else {
                    //check if this email has been used before
                    $encryptedEmail = aes_encrypt($email);
                    $email_exists = DB::table('apiusers')
                        ->where('email', $encryptedEmail)
                        ->first();
                    if (!is_null($email_exists)) {
                        $res = array(
                            'success' => false,
                            'message' => 'This Email Address (' . $email . ') is already registered. Please use a different Email Address!!'
                        );
                        return response()->json($res);
                    }

                    $password = 'gepg@1#';
                    $uuid = generateUniqID();//unique user ID
                    $pwd = hashPwd($encryptedEmail, $uuid, $password);
                    //add extra params
                    $table_data['email'] = $encryptedEmail;
                    $table_data['password'] = $pwd;
                    $table_data['uuid'] = $uuid;

                    //first lets send this user an email with random password to avoid having a user in the db who hasn't receive pwd
                    if (is_connected()) {
                        //send the mail here
                        $link = url('/');
                        $vars = array(
                            '{username}' => $email,
                            '{password}' => $password
                        );
                        $email_res = accountRegistrationEmail(6, $email, $password, $link, $vars);
                        if ($email_res['success'] == false) {
                            $res = $email_res;
                        } /* Mail::to($email)->send(new AccountActivation($email, $password, $link));
                        if (count(Mail::failures()) > 0) {
                            $res = array(
                                'success' => false,
                                'message' => 'Problem was encountered while sending email with account instructions. Please try again later!!'
                            );
                        } */ else {
                            $table_data['created_at'] = Carbon::now();
                            $table_data['created_by'] = $user_id;
                            $results = insertRecord($table_name, $table_data, $user_id);
                            if ($results['success'] == true) {
                                $insertId = $results['record_id'];
                                $res = array(
                                    'success' => true,
                                    'message' => 'User added successfully. Further account login credentials have been send to ' . $email . '. The user should check his/her email for login details!'
                                );
                            } else {
                                $res = array(
                                    'success' => false,
                                    'message' => $results['message']
                                );
                            }
                        }
                    } else {
                        $res = array(
                            'success' => false,
                            'message' => 'Whoops!! There is no internet connection. Check your connection then try again!!'
                        );
                    }
                }
            } catch (\Exception $e) {
                $res = array(
                    'success' => false,
                    'message' => $e->getMessage()
                );
            }
        }, 5);
        return response()->json($res);
    }
    function activateSystemApiUser(request $req){
        $user_id=$req->id;
        $where = array(
            'id' => $user_id
        );
        $previous_data = getPreviousRecords('apiusers', $where);
        $table_data=$previous_data;

        $previous_data=$previous_data['results'];
        $previous_data=$previous_data;

        unset($table_data['results'][0]['is_active']);
        $table_data['results'][0]['is_active']=1;
        $table_data=$table_data['results'];
        $table_data=$table_data[0];
        $success = updateRecord('apiusers', $previous_data, $where, $table_data, $user_id);

         if ($success === true) {
            $qry=DB::table('tra_blocked_accounts')
                        ->where('account_id', $user_id)
                        ->delete();
            $res = array(
                        'success' => true,
                        'message' => 'User activated successfully!!'
                    );
         }else{
             $res = array(
                        'success' => false,
                        'message' => $success
                    );
         }
        return response()->json($res);
    }
    public function blockSystemApiUser(Request $req)
    {
        $user_id = $req->input('id');
        $email = $req->input('email');
        $reason = $req->input('reason');
        try {
            $params = array(
                'account_id' => $user_id,
                'email' => $email,
                'reason' => $reason,
                'action_by' => \Auth::user()->id,
                'date' => Carbon::now()
            );
            DB::table('tra_blocked_accounts')
                ->insert($params);
            $res = array(
                'success' => true,
                'message' => 'User blocked/deactivated successfully!!'
            );

            DB::table('apiusers')
            ->where('id', $user_id)
            ->update(array('is_active' => 0));

        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
        return response()->json($res);
    }

//exteral users

public function getExternalSystemUsers(request $req){
    try {
        $qry = DB::table('users as t1')
            ->leftJoin('par_titles as t2', 't1.title_id', '=', 't2.id')
            ->leftJoin('par_user_images as t3', 't1.id', '=', 't3.user_id')
            ->leftJoin('par_departments as t4', 't1.department_id', '=', 't4.id')
            ->leftJoin('par_zones as t5', 't1.zone_id', '=', 't5.id')
            ->leftJoin('tra_blocked_accounts as t6', 't1.id', '=', 't6.account_id')
            ->select(DB::raw("t1.*,CONCAT_WS(' ',t2.name,decrypt(t1.first_name),decrypt(t1.last_name)) as fullnames,decrypt(t1.email) as email,
                            t1.last_login_time,t3.saved_name,t4.name as department_name,t5.name as zone_name"))
            ->where('t1.user_category_id',2);

      
            $results = $qry->get();
            $results = convertStdClassObjToArray($results);
            $results = decryptArray($results);

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
 public function saveExternalUserInformation(Request $req)
    {
        $res = array();
        DB::transaction(function () use ($req, &$res) {
            $user_id = \Auth::user()->id;

            $id = $req->input('id');
            $email = $req->input('email');

            $table_data = array(
                'mobile' => $req->input('mobile'),
                'phone' => $req->input('phone'),
                'externaluser_category_id' => $req->input('externaluser_category_id'),
            );

            $skip = $req->input('skip');
            $skipArray = explode(",", $skip);

            $table_data = encryptArray($table_data, $skipArray);

            $where = array(
                'id' => $id
            );
            $table_name = 'external_users';
            try {
                if (isset($id) && $id != "") {
                    if (recordExists($table_name, $where)) {
                        $table_data['updated_at'] = Carbon::now();
                        $table_data['updated_by'] = $user_id;

                        $previous_data = getPreviousRecords($table_name, $where);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                        $previous_data = $previous_data['results'];
                        $success = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                       
                       
                        if ($success === true) {
                            $res = array(
                                'success' => true,
                                'message' => 'Data updated Successfully!!'
                            );
                        } else {
                            $res = $success;
                        }
                    }
                } else {
                    //check if this email has been used before
                    $encryptedEmail = aes_encrypt($email);
                    $email_exists = DB::table('external_users')
                        ->where('email', $encryptedEmail)
                        ->first();
                    if (!is_null($email_exists)) {
                        $res = array(
                            'success' => false,
                            'message' => 'This Email Address (' . $email . ') is already registered. Please use a different Email Address!!'
                        );
                        return response()->json($res);
                    }

                    $password = str_random(8);
                    $uuid = generateUniqID();//unique user ID
                    $pwd = hashPwd($encryptedEmail, $uuid, $password);
                    //add extra params
                    $table_data['email'] = $encryptedEmail;
                    $table_data['password'] = $pwd;
                    $table_data['uuid'] = $uuid;

                    //first lets send this user an email with random password to avoid having a user in the db who hasn't receive pwd
                    if (is_connected()) {
                        //send the mail here
                        $link = url('/');
                        $vars = array(
                            '{username}' => $email,
                            '{password}' => $password
                        );
                        $email_res = accountRegistrationEmail(6, $email, $password, $link, $vars);
                        if ($email_res['success'] == false) {
                            $res = $email_res;
                        }  else {
                            $table_data['created_at'] = Carbon::now();
                            $table_data['created_by'] = $user_id;
                            $results = insertRecord($table_name, $table_data, $user_id);
                            if ($results['success'] == true) {
                                $insertId = $results['record_id'];
                                $res = array(
                                    'success' => true,
                                    'message' => 'User added successfully. Further account login credentials have been send to ' . $email . '. The user should check his/her email for login details!'
                                );
                            } else {
                                $res = array(
                                    'success' => false,
                                    'message' => $results['message']
                                );
                            }
                        }
                    } else {
                        $res = array(
                            'success' => false,
                            'message' => 'Whoops!! There is no internet connection. Check your connection then try again!!'
                        );
                    }
                }
            } catch (\Exception $e) {
                $res = array(
                    'success' => false,
                    'message' => $e->getMessage()
                );
            }
        }, 5);
        return response()->json($res);
    }
    public function saveExternalUsersDetails(Request $req){
        
            $res = array();
            DB::transaction(function () use ($req, &$res) {
                $user_id = \Auth::user()->id;
    
                $id = $req->input('id');
                $email = $req->input('email');
    
                $table_data = array(
                    'mobile' => $req->input('mobile'),
                    'phone' => $req->input('mobile'),
                    'email' => $req->input('email'),
                    'externaluser_category_id' => $req->input('externaluser_category_id'),
                    'fullnames' => $req->input('fullnames'),
                    'department' => $req->input('department'),
                    'institution' => $req->input('institution'),
                    'postal_address' => $req->input('postal_address'),
                    'country_id' => $req->input('country_id')
                );

                $auth_tabledata = array('email' => $req->input('email'),
                                'fullnames' => $req->input('fullnames'),
                                'is_account_accessed'=>0,
                                'country_id' => $req->input('country_id'),
                                'telephone_no' => $req->input('mobile')             
                  );
                  
                $skip = $req->input('skip');
                $skipArray = explode(",", $skip);
                
                $where = array(
                    'id' => $id
                );
                $table_name = 'tra_external_users';
                $portal_authorisationtable = 'wb_traderauthorised_users';

                try {
                    if (isset($id) && $id != "") {
                        if (recordExists($table_name, $where)) {
                            $table_data['dola'] = Carbon::now();
                            $table_data['updated_by'] = $user_id;
    
                            $previous_data = getPreviousRecords($table_name, $where);
                            if ($previous_data['success'] == false) {
                                return $previous_data;
                            }
                            $previous_data = $previous_data['results'];
                            $success = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                            
                            //update the authentication details too 
                            $auth_tabledata['dola'] = Carbon::now();
                            $auth_tabledata['updated_by'] = $user_id;
                            //
                            $where = array(
                                'email' => $email
                            );
                            $previous_data = getPreviousRecords($portal_authorisationtable, $where,'portal_db');
                            updateRecord($portal_authorisationtable, $previous_data, $where, $auth_tabledata, $user_id,'portal_db');

                            if ($success === true) {
                                $res = array(
                                    'success' => true,
                                    'message' => 'Data updated Successfully!!'
                                );
                            } else {
                                $res = $success;
                            }
                        }
                    } else {
                        $email_exists = DB::table($table_name)
                            ->where('email', $email)
                            ->first();
                            if (!is_null($email_exists)) {
                                $res = array(
                                    'success' => false,
                                    'message' => 'This Email Address (' . $email . ') is already registered. Please use a different Email Address!!'
                                );
                                return response()->json($res);
                            }
                            
                                $table_data['created_on'] = Carbon::now();
                                $table_data['created_by'] = $user_id;
                                $results = insertRecord($table_name, $table_data, $user_id);
                                if ($results['success'] == true) {

                                    $insertId = $results['record_id'];
                                    $auth_tabledata['mis_external_user_id'] = $insertId;
                                    $auth_tabledata['created_on'] = Carbon::now();
                                    $auth_tabledata['created_by'] = $user_id;
                                    $results = insertRecord($portal_authorisationtable, $auth_tabledata, $user_id,'portal_db');

                                    $res = array(
                                        'success' => true,
                                        'data'=>$results,
                                        'message' => 'User added successfully. User will receive Email Notification Upon assignement of applications.'
                                    );
                                } else {
                                    $res = array(
                                        'success' => false,
                                        'message' => $results['message']
                                    );
                                }
                    }
                } catch (\Exception $e) {
                    $res = array(
                        'success' => false,
                        'message' => $e->getMessage()
                    );
                }
            }, 5);
            return response()->json($res);


    }
    function activateSystemExternalUser(request $req){
        $user_id=$req->id;
        $where = array(
            'id' => $user_id
        );
        $previous_data = getPreviousRecords('external_users', $where);
        $table_data=$previous_data;

        $previous_data=$previous_data['results'];
        $previous_data=$previous_data;

        unset($table_data['results'][0]['is_active']);
        $table_data['results'][0]['is_active']=1;
        $table_data=$table_data['results'];
        $table_data=$table_data[0];
        $success = updateRecord('external_users', $previous_data, $where, $table_data, $user_id);

         if ($success === true) {
            $qry=DB::table('tra_blocked_accounts')
                        ->where('account_id', $user_id)
                        ->delete();
            $res = array(
                        'success' => true,
                        'message' => 'User activated successfully!!'
                    );
         }else{
             $res = array(
                        'success' => false,
                        'message' => $success
                    );
         }
        return response()->json($res);
    }
    public function blockSystemExternalUser(Request $req)
    {
        $user_id = $req->input('id');
        $email = $req->input('email');
        $reason = $req->input('reason');
        try {
            $params = array(
                'account_id' => $user_id,
                'email' => $email,
                'reason' => $reason,
                'action_by' => \Auth::user()->id,
                'date' => Carbon::now()
            );
            DB::table('tra_blocked_accounts')
                ->insert($params);
            $res = array(
                'success' => true,
                'message' => 'User blocked/deactivated successfully!!'
            );

            DB::table('external_users')
            ->where('id', $user_id)
            ->update(array('is_active' => 0));

        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
        return response()->json($res);
    }


public function getResubmissionApplications(Request $request)
    {
        $user_id = \Auth::user()->id;

        $whereClauses ='';
        $filter = $request->input('reference');
        if (isset($filter)) {
                $whereClauses = "t1.reference_no LIKE '%".$filter."%' OR t1.tracking_no LIKE '%".$filter."%'";
            }
        try {
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
                ->join('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('sub_modules as t6','t1.sub_module_id','t6.id')
                ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
                ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
                ->leftJoin('users as t88', 't1.released_by', '=', 't88.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->leftJoin('modules as t10', 't1.module_id', '=', 't10.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id,t3.workflow_id, t2.name as process_name, t3.name as previous_process, t4.name as current_process,t5.name as application_status,t6.name as sub_module_name,
                    CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user,CONCAT_WS(' ',decrypt(t88.first_name),decrypt(t88.last_name)) as submitted_by,
                    t9.name as applicant,t10.name as module_name, t1.id as submission_id"))
                ->where('t4.stage_status','<>',3);
            if($whereClauses != ''){
                $qry->whereRaw($whereClauses);
            }
            $qry->orderBy('t1.id', 'desc');
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
public function getTaskReassignmentApplications(Request $request)
    {
        $user_id = \Auth::user()->id;

        $whereClauses ='';
        $filter = $request->input('user_id');
        if (validateIsNumeric($filter)) {
                $whereClauses = "t1.usr_to = ".$filter;
            }
        try {
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->leftJoin('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
                ->leftJoin('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('sub_modules as t6','t1.sub_module_id','t6.id')
                ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->leftJoin('modules as t10', 't1.module_id', '=', 't10.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id,t2.name as process_name,t3.name as prev_stage, t4.name as current_stage,t6.name as sub_module_name,
                    CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as full_name, t8.username,
                    t9.name as applicant,t10.name as module_name"))
            
                //->where('usr_to', $user_id)
                ->where('isDone', 0);
            if($whereClauses != ''){
                $qry->whereRaw($whereClauses);
            }
            $qry->orderBy('t1.id', 'desc');
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
    function getUserList(Request $req){
        $qry=DB::table('users')
            ->select(DB::raw("id,CONCAT_WS(' ',decrypt(first_name),decrypt(last_name)) as name"))
            ->get();
            $res= array(
                'success'=> true,
                'results'=> $qry,
                'message'=> 'All is well'
            );
            return \response()->json($res);
    }
    function getActingUsersPositionDetails(Request $req){
        $filter = $req->input('filter');

        $date_from = $req->input('date_from');
        $date_to = $req->input('date_to');

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
                            case 'acting_reason' :
                                $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'group_name' :
                                $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'email_address' :
                                $whereClauses[] = "decrypt(t3.email) like '%" . ($filter->value) . "%'";
                                break;
                                case 'full_names' :
                                $whereClauses[] = "decrypt(t3.first_name) like '%" . ($filter->value) . "%'";
                                break;   
                                
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }

            }
        //'effected_by', 'requested_by','acting_date_to','acting_date_from',full_names ,email_address,group_name,acting_fromuser
        $qry=DB::table('tra_actingposition_management as t1')
                ->join('users as t2', 't1.actingfor_user_id','t2.id')
                ->join('users as t3', 't1.user_id','t3.id')
                ->join('users as t4', 't1.requested_by_id','t4.id')
                
                ->join('users as t7', 't1.created_by','t7.id')
                ->join('par_groups as t5', 't1.group_id','t5.id')
                ->join('par_acting_reasons as t6', 't1.acting_reason_id','t5.id')
                ->select(DB::raw("t1.*,t5.name as group_name, t6.name as acting_reason,decrypt(t3.email) as email_address, CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as requested_by,CONCAT_WS(' ',decrypt(t3.first_name),decrypt(t3.last_name)) as full_names, CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as acting_fromuser,  CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as effected_by"))
                ->orderBy('t1.id','desc');
                if ($filter_string != '') {
                    $qry->whereRAW($filter_string);
                }
                if($date_from != '' && $date_to != ''){
                    $qry->whereRAW(" (acting_date_from between '".$date_from."' and '".$date_to."') or (acting_date_to between '".$date_from."' and '".$date_to."')");
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
    function applicationResubmissionVisibleRequest(request $req){
        $submission_id = $req->submission_id;
        $reason = $req->reason;
        //$application_code = $req->application_code;
       // $module_id = $req->module_id;
        //$workflow_stage_id = $req->workflow_stage_id;
        $user_id = \Auth::user()->id;
        
        DB::beginTransaction();
        try {
            $submission_data = DB::table('tra_submissions')->where('id',$submission_id)->first();
            $submission_dataArray=(array)$submission_data;
            //create new record and update submission 
            $submission_dataArray['isRead']=0;
            $submission_dataArray['isDone']=0;

            $submission_dataArray['date_received']=Carbon::now();
            //unset primary key
            unset($submission_dataArray['id']);
            unset($submission_dataArray['altered_by']);
            unset($submission_dataArray['dola']);
            //insert
            $success=insertRecord('tra_submissions',$submission_dataArray, $user_id, 'mysql');
            $newSubmission_id=$success['record_id'];

            //get app table
            $application_table= $this->getTableName($submission_dataArray['module_id']);
            $where = array('application_code'=>$submission_dataArray['application_code']);
            if($success['success']){

                //get the existing table data and prepare for update
                $previous_data = getPreviousRecords($application_table, $where);
                $table_data=$previous_data;
                $previous_data=$previous_data['results'];
                $previous_data=$previous_data;

                //unset($table_data['results'][0]['workflow_stage_id']);
                $table_data['results'][0]['workflow_stage_id']=$submission_dataArray['current_stage'];
                $table_data=$table_data['results'];

                $table_data=$table_data[0];

                $success = updateRecord($application_table, $previous_data, $where, $table_data, $user_id);
                if($success){

                    //update the current submission record
                    $test=DB::table('tra_submissions')
                            ->where("application_code", $submission_dataArray['application_code']) 
                            ->where('id','!=',$newSubmission_id)
                            ->update(array("isDone"=>1));
                        
                    //log
                    DB::table('tra_applicationprocess_alterations')->insert(Array(
                        'submission_id'=>$newSubmission_id,
                        'effected_by'=>$user_id,
                        'task_type_id'=>1,
                        'effected_on'=>Carbon::now(),
                        'reason'=>$reason
                    ));
                    $res = array(
                        'success'=> true,
                        'message'=> 'Resubmitted Successfully!!!' 
                     );
                }else{
                   DB::rollBack();
                }

            }else{
                DB::rollBack();
                $res = array(
                        'success'=> false,
                        'results' => $success,
                        'message'=> 'Failed please try again'
                     );
            }

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
        DB::commit();
       return \response()->json($res);

    }

     function applicationResubmissionHideRequest(request $req){
        $submission_id = $req->submission_id;
       // $reason = $req->reason;
        // $application_code = $req->application_code;
        // $module_id = $req->module_id;
        // $workflow_stage_id = $req->workflow_stage_id;
        // $user_id = \Auth::user()->id;

        try {
            // $submission_data = DB::table('tra_submissions')->where('id',$submission_id)->first();
            // $submission_dataArray=(array)$submission_data;
            // //create new record and update submission 
            // $submission_dataArray['isRead']=1;
            // $submission_dataArray['isDone']=1;

            // $submission_dataArray['date_received']=Carbon::now();
            // //unset primary key
            // unset($submission_dataArray['id']);
            // //insert
            // $success=insertRecord('tra_submissions',$submission_dataArray, $user_id, 'mysql');
            // $newSubmission_id=$success['record_id'];

            // //get app table
            // $application_table= $this->getTableName($module_id);
            // $where = array('application_code'=>$application_code);
            // if($success['success']){
            //     //get the existing table data and prepare for update
            //     $previous_data = getPreviousRecords($application_table, $where);
            //     $table_data=$previous_data;
            //     $previous_data=$previous_data['results'];
            //     $previous_data=$previous_data;

            //     unset($table_data['results'][0]['workflow_stage_id']);
            //     $table_data['results'][0]['workflow_stage_id']=$workflow_stage_id;
            //     $table_data=$table_data['results'];
            //     $table_data=$table_data[0];
                // $success = updateRecord($application_table, $previous_data, $where, $table_data, $user_id);
                // if($success){
                    //update the current submission record
                    // DB::table('tra_submissions')->where(array('application_code'=>$application_code, 'current_stage <>'=>$current_stage))->update(array('isDone'=>1));
                    //log
                    // DB::table('tra_applicationprocess_alterations')->insert(Array(
                    //     'submission_id'=>$newSubmission_id,
                    //     'effected_by'=>$user_id,
                    //     'task_type_id'=>1,
                    //     'effected_on'=>Carbon::now(),
                    //     'reason'=>$reason
                    // ));

            $qry=DB::table('tra_submissions')->where('id',$submission_id)->update(['isDone'=>1]);

            if($qry){
                    $res = array(
                        'success'=> true,
                        'message'=> 'Resubmitted Successfully!!!' 
                     );
                }else{
                   $res = array(
                        'success'=> false,
                        'results' => $qry,
                        'message'=> 'Resubmitted Successfully!!!' 
                     );
                }

            // }else{
            //     $res = array(
            //             'success'=> false,
            //             'results' => $success,
            //             'message'=> 'Failed please try again'
            //          );
            // }

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

public function getOnlineResubmissionApplications(Request $request)
    {
        $user_id = \Auth::user()->id;

        $whereClauses ='';
        $filter = $request->input('reference');
        if (isset($filter)) {
                $whereClauses = "t1.reference_no LIKE '%".$filter."%' OR t1.tracking_no LIKE '%".$filter."%'";
            }

        try {
            
            $qry = DB::table('tra_onlinesubmissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->join('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('sub_modules as t6','t1.sub_module_id','t6.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->leftJoin('modules as t10', 't1.module_id', '=', 't10.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id,t2.name as process_name, t4.name as current_process,t5.name as application_status,t6.name as sub_module_name,
                    t9.name as applicant,t10.name as module_name"));
               
            if($whereClauses != ''){
                $qry->whereRaw($whereClauses);
            }
            $qry->orderBy('t1.id', 'desc');
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

public function onlineResubmissionRequest(Request $req){
        
        $submission_id = $req->submission_id;
        $reason = $req->reason;
        $status = $req->status;
        $status = 1;
        $user_id = \Auth::user()->id;
        DB::beginTransaction();
        try {

            $submission_dataArray = (array) DB::table('tra_onlinesubmissions')->where('id',$submission_id)->first();

            unset($submission_dataArray['id']);
            unset($submission_dataArray['created_by']);
            unset($submission_dataArray['date_released']);
            unset($submission_dataArray['date_submitted']);
            unset($submission_dataArray['altered_by']);
            unset($submission_dataArray['dola']);

            //create new record and update submission 
            $submission_dataArray['isRead']=0;
           // $submission_dataArray['isDone']=0;

            $submission_dataArray['date_submitted']=Carbon::now();
         
            //insert
            $success=insertRecord('tra_onlinesubmissions',$submission_dataArray, $user_id, 'mysql');
            $newSubmission_id=$success['record_id'];

            //get app table
            $application_table= $this->getTableName($submission_dataArray['module_id'], 1);
            $where = array('application_code'=>$submission_dataArray['application_code']);
            if($success['success']){

                //get the existing table data and prepare for update
                $previous_data = getPreviousRecords($application_table, $where, 'portal_db');

                $table_data=$previous_data;
                $previous_data=$previous_data['results'];
                $previous_data=$previous_data;

                //unset($table_data['results'][0]['workflow_stage_id']);
                $table_data['results'][0]['application_status_id']=$submission_dataArray['application_status_id'];
                $table_data=$table_data['results'];

                $table_data=$table_data[0];

                $success = updateRecord($application_table, $previous_data, $where, $table_data, $user_id, 'portal_db');
                if($success){

                    //update the current submission record
                    $test=DB::table('tra_onlinesubmissions')
                            ->where("application_code", $submission_dataArray['application_code']) 
                            ->where('id','!=',$newSubmission_id)
                            ->update(array("isDone"=>1));
                        
                    //log
                    DB::table('tra_applicationprocess_alterations')->insert(Array(
                        'submission_id'=>$newSubmission_id,
                        'effected_by'=>$user_id,
                        'task_type_id'=>1,
                        'effected_on'=>Carbon::now(),
                        'reason'=>$reason
                    ));
                    $res = array(
                        'success'=> true,
                        'message'=> 'Resubmitted Successfully!!!' 
                     );
                }else{
                   DB::rollBack();
                }

            }else{
                DB::rollBack();
                $res = array(
                        'success'=> false,
                        'results' => $success,
                        'message'=> 'Failed please try again'
                     );
            }

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
        DB::commit();
       return \response()->json($res);

    }
public function doReassignApplicationTask(request $req){
        $submission_id = $req->submission_id;
        $application_code = $req->application_code;
        $reason = $req->reassignment_reason;
        
        $module_id = $req->module_id;
        
        $workflow_stage_id = $req->workflow_stage_id;
        $submission_id = $req->id;

        $assaigned_user_id = $req->responsible_user_id;
        $user_id = \Auth::user()->id;

        try {
            $submission_data = DB::table('tra_submissions')->where('id',$submission_id)->first();
            $submission_dataArray=(array)$submission_data;
            //create new record and update submission 
            $submission_dataArray['usr_to']=$assaigned_user_id;
            //create new record and update submission 
            $submission_dataArray['isRead']=0;
            $submission_dataArray['isDone']=0;

            $submission_dataArray['date_received']=Carbon::now();
            //unset primary key
            unset($submission_dataArray['id']);
            //insert
            $success=insertRecord('tra_submissions',$submission_dataArray, $user_id, 'mysql');
            $newSubmission_id=$success['record_id'];
           if($success['success']){
            //update the current submission record
             DB::table('tra_submissions')->where(['id'=>$submission_id])->update(['isDone'=>1,'isRead'=>1]);
            //log
            DB::table('tra_applicationprocess_alterations')->insert(array(
                        'submission_id'=>$newSubmission_id,
                        'effected_by'=>$user_id,
                        'task_type_id'=>2,
                        'effected_on'=>Carbon::now(),
                        'reason'=>$reason
                    ));
                    $res = array(
                        'success'=> true,
                        'message'=> 'Reassigned Successfully!!!' 
                     );
                }else{
                    $res = array(
                            'success'=> false,
                            'results' => $success,
                            'message'=> 'Failed, please try again'
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

      function getTableName($module, $portal_db = 0){

          $qry=DB::table('modules')
                ->where('id',$module)->first();

        if($portal_db){
          $table=$qry->portaltable_name;
        }else{
          $table=$qry->table_name;
        }

        return $table;
   }
   public function getRegionalIntegrationUsers(Request $req)
   {
       $users = DB::table('tra_regional_integrationusers as t1')
            ->leftJoin('par_countries as t2','t1.country_id','t2.id')
            ->leftJoin('par_regional_authorities as t4','t1.country_id','t4.id')
            ->leftJoin('par_assessment_procedures as t3','t1.assessment_procedure_id','t3.id')
            ->leftJoin('par_gmp_assessment_types as t5','t1.gmpassessment_procedure_id','t5.id')
            ->select('t1.*','t2.name as country_name','t4.name as regional_authority','t3.name as assessment_procedure','t5.name as gmpassessment_procedure')
            ->get();
        
        return $users;
   }
 
   public function saveRegionalIntegrationUsers(Request $req){
     try{
            $id = $req->id;
            $user_id = '';
            $status_id = $req->status_id;
            $email =$req->email; 
            if(\Auth::user()){
                $user_id = \Auth::user()->id;
            }
            
            $table_name = 'tra_regional_integrationusers';
            $where = array('id'=>$id);
            $trader_data = $req->all();
               
            unset($trader_data['portal_id']);
            unset($trader_data['_token']);
            $res = array();
            unset($trader_data['id']);
            unset($trader_data['model']);

            if (validateIsNumeric($id)) {

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
                    $regional_integrationuser_id = $previous_data[0]['id'];
                    
                    //save account users details 
                    if($account_email != $email){
                        $where_user = array('regional_integrationuser_id'=>$regional_integrationuser_id, 'email'=>$account_email);
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
                            //send a notificaiton 
                           
                        }
                       
                        
                    }
                    
                    if($res['success']){
                        $res['message'] ='User Account details Updated Successfully';
                    }
                }
            }else{
                $trader_data['created_at'] = Carbon::now();
                $results = insertRecord($table_name, $trader_data, $user_id);
                 
                if ($results['success'] == true) {
                    $insertId = $results['record_id'];
                    $table_name = 'wb_traderauthorised_users';
                    $trader_data['fullnames'] = $trader_data['name'];
                    $trader_data['created_on'] = $trader_data['created_at'];
                    unset($trader_data['name']);
                    unset($trader_data['created_at']);
                    unset($trader_data['postal_address']);
                    unset($trader_data['assessment_procedure_id']);
                    unset($trader_data['gmpassessment_procedure_id']);
                    unset($trader_data['regional_authority_id']);
                    //password
                    $user_passwordData = str_random(8);
                    //had code for test
                    $password = str_random(8);
                   // $user_password = 'slams123';
                    $uuid = generateUniqID();//unique user ID
                    $user_password = hashPwd($email, $uuid, $user_passwordData);

                    $trader_data['password'] = $user_password;
                    $results = insertRecord($table_name, $trader_data, $user_id,'portal_db');
                    
                    if ($results['success'] == true) {
                           $res = array(
                               'success' => true,
                               'message'=>'all is well',
                               'record_id' =>$insertId 
                            );
                           //notification
                        if (is_connected()) {
                            //send the mail here
                            $link = url('/');
                            $vars = array(
                                '{username}' => $email,
                                '{password}' => $user_passwordData
                            );
                        //notification
                        sendTemplatedApplicationNotificationEmail(6, $email, $vars);


                     }
                    }else{
                        $res = array(
                               'success' => false,
                               'message1'=>'failed to save, try again',
                               'record_id' =>$insertId 
                            );
                    }
                }else{
                    $res = array(
                               'success' => false,
                               'message2'=>'failed to save, try again',
                               'record_id' =>'not set' 
                            );
                }
            }
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
   public function getPortalAppSubmissions(Request $request){
        $user_id = \Auth::user()->id;

        $whereClauses ='';
        $reference = $request->input('reference');
        if (isset($reference) && $reference != '') {
                $whereClauses = "t1.reference_no LIKE '%".$reference."%' OR t1.tracking_no LIKE '%".$reference."%'";
            }else{
                return array('success' => false,'message' => 'Please provide a reference_no/tracking_no' );
            }

        try {
            
            $qry = DB::Connection('portal_db')->table('wb_onlinesubmissions as t1')
                ->leftJoin('wb_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('wb_tfdaprocesses as t6','t1.process_id','t6.id')
                ->leftJoin('wb_trader_account as t9', 't1.trader_id', '=', 't9.id')
                ->leftJoin('wb_statuses_types as t10', 't1.status_type_id', '=', 't10.id')

                ->select(DB::raw("t1.*,t5.name as application_status,t6.name as process_name,
                    t9.name as applicant, t10.name as status_type"));
               
            if($whereClauses != ''){
                $qry->whereRaw($whereClauses);
            }
            $qry->orderBy('t1.id', 'desc');
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
   public function showHideonlineResubmissionRequest(Request $req){
        $submission_id = $req->submission_id;
        $action_type = $req->action_type;
        $user_id = \Auth::user()->id;
        $table_name = 'tra_onlinesubmissions';
        $where = array('id' => $submission_id);
        DB::beginTransaction();
        try{
            if(validateIsNumeric($action_type)){
                if($action_type == 1){
                    $previous_data = getPreviousRecords($table_name, $where);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                    $previous_data = $previous_data['results'];
                    $table_data = array('application_status_id' => 1);
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
                if($action_type == 2){
                    $previous_data = getPreviousRecords($table_name, $where);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                    $previous_data = $previous_data['results'];
                    $table_data = array('application_status_id' => 2);
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
            }
            else{
                 $res = array(
                    'success' => false,
                    'message' => 'Parameters not passed as expected'
                );
            }
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
        return \response()->json($res);
   }
   public function getUserPasswordResetLogs(Request $req){
        $user_id = $req->user_id;

        $qry = DB::table('tra_password_reset_logs as t1')
                ->join('users as t2', 't1.account_id', 't2.id')
                ->select(DB::raw("CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as reset_by,t1.time as reset_date, t1.id"));
        if(validateIsNumeric($user_id)){
            $qry->where('t1.account_id', $user_id);
        }
        $results = $qry->get();
         $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        return \response()->json($res);
   }
   public function getUserDetailsUpdateLogs(Request $request)
   {
      $user_id = $request->input('user_id');
        try {
            $qry = DB::table('users_logs as t1')
                ->leftJoin('par_titles as t2', 't1.title_id', '=', 't2.id')
                ->leftJoin('par_user_images as t3', 't1.id', '=', 't3.user_id')
                ->leftJoin('par_departments as t4', 't1.department_id', '=', 't4.id')
                ->leftJoin('par_zones as t5', 't1.zone_id', '=', 't5.id')
                ->leftJoin('tra_user_group as t7','t1.id','t7.user_id')
                ->leftJoin('users as t8','t1.updated_by','t8.updated_by')
                ->select(DB::raw("t1.*,CONCAT_WS(' ',t2.name,decrypt(t1.first_name),decrypt(t1.last_name)) as fullnames,decrypt(t1.email) as email,
                                   t1.last_login_time,t3.saved_name,t4.name as department_name,t5.name as zone_name, t7.id as group_id, CONCAT_WS(' ',t2.name,decrypt(t1.first_name),decrypt(t1.last_name)) as updated_by"));


            if(validateIsNumeric($user_id)){
                $qry->where('t1.user_id',$user_id);
            }

            $results = $qry->get();
            $results = convertStdClassObjToArray($results);
            $results = decryptArray($results);
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
}
