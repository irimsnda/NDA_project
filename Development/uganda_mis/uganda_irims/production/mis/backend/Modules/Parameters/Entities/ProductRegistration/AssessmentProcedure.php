<?php


namespace Modules\Parameters\Entities\ProductRegistration;

use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class AssessmentProcedure extends AbstractParameter
{
    protected $fillable = [
        "name",
        "code",
        "description",
        "created_by",
        "created_at",
        "dola",
        "altered_by",
        "is_enabled"
    ];

    protected $table = "assessment_procedures";

    public function productApplications() {
        return $this->hasMany("ProductApplication");
    }

    use GetDataTrait;
}