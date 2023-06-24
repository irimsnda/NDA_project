<?php


namespace Modules\OrganisationConfig\Entities;

use Illuminate\Database\Eloquent\Model;
class Section extends  Model
{
    protected $guarded=[];
    protected $table='par_sections';
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}
