<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 7/25/2017
 * Time: 11:46 AM
 */

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport; 
use App\Auth\CustomUserProvider;
//use Illuminate\Support\ServiceProvider;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
class CustomAuthProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    protected $policies = [
 
        'App\Model' => 'App\Policies\ModelPolicy',
  
    ];
  
    public function boot()
    {
        $this->registerPolicies();
        
       // Passport::routes();

        Passport::tokensExpireIn(now()->addDays(15));

        Passport::refreshTokensExpireIn(now()->addDays(30));

        \Auth::provider('custom', function ($app, array $config) {
            // Return an instance of Illuminate\Contracts\Auth\UserProvider...
            return new CustomUserProvider();
        });
    }
    
    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }
}

