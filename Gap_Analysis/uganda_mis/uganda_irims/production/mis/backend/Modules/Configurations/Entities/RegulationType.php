<?php

namespace Modules\Configurations\Entities;

use Illuminate\Database\Eloquent\Model;

class RegulationType extends Model
{
    protected $table='tra_registration_regulations';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}
