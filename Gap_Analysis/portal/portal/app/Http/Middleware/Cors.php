<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request)//Content-Type, 
               ->header('Access-Control-Allow-Origin','*')
               ->header('Access-Control-Allow-Headers','Origin,Content-type,Accept,X-Auth-Token,Authorisation, X-Request-With')
               ->header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
               ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization,x-xsrf-token')
              // ->header('Access-Control-Allow-Headers', 'Content-Type, x-xsrf-token')
               ->header('Access-Control-Allow-Credentials','true');
               
    }
}
