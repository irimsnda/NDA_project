<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 1/6/2019
 * Time: 10:51 AM
 */

namespace Modules\GmpApplications\Entities;


use Illuminate\Database\Eloquent\Model;

class GmpType extends  Model
{
    protected $table = 'par_gmplocation_details';
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}