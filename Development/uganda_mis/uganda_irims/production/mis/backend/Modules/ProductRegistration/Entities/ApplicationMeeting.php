<?php



namespace Modules\ProductRegistration\Entities;


use Illuminate\Database\Eloquent\Model;

class ApplicationMeeting extends Model
{
    protected $fillable = [
        "title",
        "description",
        "date_requested",
        "physical_address"
    ];

    public $table = "tra_product_application_meetings";

    public function meetingMembers() {
        return $this->hasMany("MeetingMember");
    }
}