<?php


namespace Modules\Workflow\Entities;


use Illuminate\Database\Eloquent\Model;

class RecommTable extends Model
{
    protected $table='par_recommendation_tables';
    protected $guarded=[];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}