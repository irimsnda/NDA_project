<?php


namespace Modules\Workflow\Entities;


use Illuminate\Database\Eloquent\Model;

class TrackingNoSerialTracker extends Model
{
    protected $table = 'trackingnoprocesses_serials';
    protected $guarded = [];
    const UPDATED_AT = 'dola';
    const CREATED_AT = 'created_on';
}