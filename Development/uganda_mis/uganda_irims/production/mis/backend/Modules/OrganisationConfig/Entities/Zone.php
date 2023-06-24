<?php


namespace Modules\OrganisationConfig\Entities;

use Illuminate\Database\Eloquent\Model;
class Zone extends Model
{
    protected $guarded=[];
    protected $table='par_zones';
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}
