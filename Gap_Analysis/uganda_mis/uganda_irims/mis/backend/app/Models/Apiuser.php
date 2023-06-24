<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable,
    Illuminate\Foundation\Auth\User as Authenticatable,
    Laravel\Passport\HasApiTokens,
    SMartins\PassportMultiauth\HasMultiAuthApiTokens;

class Apiuser extends Authenticatable
{
    use Notifiable, HasMultiAuthApiTokens;// HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
