<?php


namespace Modules\Parameters\Entities;


use Illuminate\Database\Eloquent\Model;

class TcRecommendationDecision extends Model
{
    protected $table = 'par_tcmeeting_decisions';
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}