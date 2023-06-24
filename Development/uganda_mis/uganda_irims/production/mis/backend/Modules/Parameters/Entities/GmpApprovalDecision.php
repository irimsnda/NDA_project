<?php

namespace Modules\Parameters\Entities;


use Illuminate\Database\Eloquent\Model;

class GmpApprovalDecision extends  Model
{
    protected $table = 'par_gmpapproval_decisions';
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}