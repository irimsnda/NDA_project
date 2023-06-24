<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;
use Modules\UserManagement\Entities\Title;

class Init extends Controller
{

    public function launch()
    {
        $host = $_SERVER['HTTP_HOST'];
        if ($host == '41.212.6.105:90') {
            die("<h4 style='text-align: center; color: red'>MIS VERSION 1 IS UNDER DEVELOPMENT AND IS NOT ACCESSIBLE AT THE MOMENT. KINDLY CONTACT SOFTCLANS!!</h4>
                 <p style='text-align: center; color: pink'></p>");
        }
        try {
            DB::connection()->getPdo();
            if (DB::connection()->getDatabaseName()) {
                // echo "Yes! Successfully connected to the DB: " . DB::connection()->getDatabaseName();
            }
        } catch (\Exception $e) {
            die("<h4 style='text-align: center; color: red'>Could not connect to the database.  Please check your configuration!!</h4>
                 <p style='text-align: center; color: pink'>" . $e->getMessage() . "</p>");
        } catch (\Throwable $throwable) {
            die("<h4 style='text-align: center; color: red'>Could not connect to the database.  Please check your configuration!!</h4>
                 <p style='text-align: center; color: pink'>" . $throwable->getMessage() . "</p>");
        }
        
        $base_url = url('/');
        
        if (\Auth::check() || \Auth::viaRemember()) {
            $loggedInUser = \Auth::user();
            $apiTokenResult = $loggedInUser->createToken('NDA MIS');
            
            /*$apiToken = $apiTokenResult->token;
            $apiToken->save();*/
            $access_token = $apiTokenResult->accessToken;

            $is_logged_in = true;
            $title_id = \Auth::user()->title_id;
            $title = '';
            if(validateIsNumeric($title_id)){
                $title = Title::findOrFail($title_id)->name;
            }
            
            $title = aes_decrypt($title);
            $user_id = \Auth::user()->id;
            $title_id = \Auth::user()->title_id;
            $gender_id = \Auth::user()->gender_id;
            $first_name = aes_decrypt(\Auth::user()->first_name);
            $last_name = aes_decrypt(\Auth::user()->last_name);
            $email = aes_decrypt(\Auth::user()->email);
            $phone = aes_decrypt(\Auth::user()->phone);
            $mobile = aes_decrypt(\Auth::user()->mobile);
            $profile_pic_url = 'resources/images/placeholder.png';
            $saved_name = DB::table('par_user_images')->where('user_id', \Auth::user()->id)->value('saved_name');
            if ($saved_name != '') {
                $profile_pic_url = $base_url . '/resources/images/user-profile/' . $saved_name;
            }
        
            $access_point = DB::table('par_access_points')->where('id', \Auth::user()->access_point_id)->value('name');
            $role = DB::table('par_user_roles')->where('id', \Auth::user()->user_role_id)->value('name');
        } else {
            $is_logged_in = false;
            $user_id = '';
            $title_id = '';
            $gender_id = '';
            $title = '';
            $first_name = '';
            $last_name = '';
            $email = '';
            $phone = '';
            $mobile = '';
            $profile_pic_url = 'resources/images/placeholder.png';
            $access_point = '';
            $role = '';
            $access_token = '';
        }
        
        $year = date('Y');
        $data['is_reset_pwd'] = false;
        $data['guid'] = '';
        $data['user_id'] = $user_id;
        $data['title_id'] = $title_id;
        $data['gender_id'] = $gender_id;
        $data['is_logged_in'] = $is_logged_in;
        $data['title'] = $title;
        $data['first_name'] = $first_name;
        $data['last_name'] = $last_name;
        $data['base_url'] = $base_url;
        $data['email'] = $email;
        $data['phone'] = $phone;
        $data['mobile'] = $mobile;
        $data['access_point'] = $access_point;
        $data['role'] = $role;
        $data['profile_pic_url'] = $profile_pic_url;
        $data['access_token'] = $access_token;
        $data['upload_directory'] = Config('constants.dms.upload_url');
        $data['year'] = $year;
        $data['system_name'] = Config('constants.sys.system_name');
        $data['organisation_name'] = Config('constants.sys.organisation_name');
        $data['org_name'] = Config('constants.sys.org_name');
        $data['iso_cert'] = Config('constants.sys.iso_cert');
        $data['ministry_name'] = Config('constants.sys.ministry_name');
        $data['system_version'] = Config('constants.sys.system_version');
        $data['system_version'] = Config('constants.sys.organisation_name');
        $data['approval_lag_days'] = Config('constants.approval_lag_days');

        $data['nonMenusArray'] = getAssignedProcesses($user_id);
        $user_dashboard = getUserSystemDashaboard($user_id);
        if($user_dashboard == ''){
            $user_dashboard = 'systemprocessdashboard';

        }
        $scheduledtcmeeting_counter = getUserScheduledtcmeetingCounter($user_id);
       
        $data['scheduledtcmeeting_counter'] = $scheduledtcmeeting_counter;
        $data['system_dashboard'] = $user_dashboard;
        
        return view('init', $data);
    }

}
