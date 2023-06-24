<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;

class SerialTracker extends Model
{
    
    protected $table='trackingnoprocesses_serials';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';

}
