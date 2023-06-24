<?php

namespace Modules\Configurations\Entities;

use Illuminate\Database\Eloquent\Model;

class RefNumbersFormat extends Model
{
    protected $table='refnumbers_formats';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}
