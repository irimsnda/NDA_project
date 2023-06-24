<?php


namespace Modules\OrganisationConfig\Entities;

use Illuminate\Database\Eloquent\Model;
class Department extends  Model
{
    protected $guarded=[];
    protected $table='par_departments';
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}