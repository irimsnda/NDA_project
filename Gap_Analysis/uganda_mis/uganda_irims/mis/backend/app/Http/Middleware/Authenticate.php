<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
      //if (!$request->isMethod('get') && !$request->expectsJson()) {
       if (!$request->expectsJson()) {
            abort(response()->json(['error' => 'Request is not Type Json.'], 401));
            // return route('login');
        }
    }
}
