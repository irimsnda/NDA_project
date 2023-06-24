<?php

namespace Modules\Configurations\Entities;

use Illuminate\Database\Eloquent\Model;

class SampleStatuses extends Model
{
    protected $table='par_sample_status';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}
