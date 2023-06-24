<?php

namespace Modules\APIIntegrations\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use Modules\Auth\Http\Controllers\Auth;
use App\APIUser;

class AuthenticationController extends Controller
{
    protected $mis_app_id;
    protected $mis_app_client;
    protected $external_api_client;

    public function __construct(Request $req)
    {
            $mis_app_id = Config('constants.api.mis_app_client_id');
            $this->mis_app_client = DB::table('oauth_clients')->where('id', $mis_app_id)->first();
            $external_api_id = Config('constants.api.external_api_client_id');
            $this->external_api_client = DB::table('oauth_clients')->where('id', $external_api_id)->first();
        }
    
    public function authenticateApiUser(Request $request)
    {
        $username = $request->input('username');//email address
        $password = $request->input('password');
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
        return \response($token->getContent(), 200, ['Content-Type' => 'application/json; charset=UTF-8']);
    }
    //
    public function logoutAPIUser(Request $request){    
                
        $mobile_user_id = $request->input('user_id');
        $mobile_user = APIUser::find($mobile_user_id);
        $tokenIdsArray = array();
        if (is_null($mobile_user)) {
            $res = array(
                'success' => false,
                'message' => 'Unknown user trying to logout!!'
            );
        } else {
            $mis_app_client_id = env('API_APP_CLIENT_ID');
            $userTokens = $mobile_user->tokens;
            foreach ($userTokens as $token) {
                if ($token->client_id == $mis_app_client_id) {
                    $tokenIdsArray[] = array($token->id);
                    $token->revoke();
                    $token->delete();
                }
            }
            DB::table('oauth_refresh_tokens')
                ->whereIn('access_token_id', $tokenIdsArray)
                ->delete();
            $res = array(
                'success' => true,
                'message' => 'Logged off successfully!!'
            );
        }
        return response()->json($res);
        }
}
