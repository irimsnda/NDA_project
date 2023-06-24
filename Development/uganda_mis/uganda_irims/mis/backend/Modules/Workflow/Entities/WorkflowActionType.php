<?php

namespace Modules\Workflow\Entities;


use Illuminate\Database\Eloquent\Model;

class WorkflowActionType extends Model
{
    protected $table='wf_workflowaction_types';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}