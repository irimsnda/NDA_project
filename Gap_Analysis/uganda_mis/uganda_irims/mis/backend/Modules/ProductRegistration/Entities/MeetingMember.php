<?php


namespace Modules\ProductRegistration\Entities;


use Illuminate\Database\Eloquent\Model;

class MeetingMember extends Model
{
    protected $fillable = [
        "product_application_meeting_id",
        "member_name"
    ];

    public $table = "tra_product_application_meeting_members";

    public function applicationMeeting() {
        return $this->belongsTo("ApplicationMeeting");
    }
}