<?php

namespace Modules\Configurations\Entities;

use Illuminate\Database\Eloquent\Model;

class IngredientSpecification extends Model
{
    protected $table='par_specification_types';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}
