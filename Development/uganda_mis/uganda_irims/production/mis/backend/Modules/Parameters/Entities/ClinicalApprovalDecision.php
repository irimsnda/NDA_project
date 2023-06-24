<?php


namespace Modules\Parameters\Entities;


use Illuminate\Database\Eloquent\Model;

class ClinicalApprovalDecision extends  Model
{
    protected $table = 'par_clinicalapproval_decisions';
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}