<?php

namespace App\Http\Middleware;

use Closure;
use User;
class CheckApiToken
{
    
    public function handle($request, Closure $next)
    {
        if(!empty(trim($request->input('api_token')))){

            $is_exists = User::where('id', Auth::guard('api')->id())->exists();
            if($is_exists){
                return $next($request);
            }
        }
            return response()->json('Invalid Token');
    
    }
    
}
