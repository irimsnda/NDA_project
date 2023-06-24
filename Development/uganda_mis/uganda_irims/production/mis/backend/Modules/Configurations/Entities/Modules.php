<?php

namespace Modules\Configurations\Entities;

use Illuminate\Database\Eloquent\Model;

class Modules extends Model
{
    protected $table='modules';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}
