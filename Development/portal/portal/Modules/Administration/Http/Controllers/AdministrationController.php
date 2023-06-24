<?php

namespace Modules\Administration\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use App\User;
use Auth;

class AdministrationController extends Controller
{
    public function __construct(){
        if (!Auth::guard('api')->check()) {
                $res = array(
                    'success' => false,
                    'message' => 'Invalid Token or failed authentication, login to proceed!!'
                );
                return response()->json($res);
       
        }
         
    }
    public function onApplicationInitialisation(){
     
        if (!Auth::guard('api')->check()) {
            $res = array(
                'success' => false,
                'message' => '<p>NO SESSION, SERVICE NOT ALLOWED!!<br>PLEASE RELOAD THE SYSTEM!!</p>'
            );
            
        }
        else{
            $res = array('message' => 'On Application Initialisation',
                         'success'=> true);
        }
        return response()->json($res);
       
    }
    public function checkVerify_status($is_verified,$status_id){
        if($is_verified != 1){

        }
        if($status_id != 2){

        }

    }
    public function onUserLogOut(Request $request) {

        $request->user()->token()->revoke();

        return response()->json([
            'message' => 'Successfully logged out','success'=> true
        ]);
      
    }
   
}
