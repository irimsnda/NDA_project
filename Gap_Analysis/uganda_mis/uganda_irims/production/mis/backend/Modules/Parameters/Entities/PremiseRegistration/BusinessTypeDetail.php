<?php


namespace Modules\Parameters\Entities\PremiseRegistration;

use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class BusinessTypeDetail extends AbstractParameter
{
    protected  $fillable = [
        "name",
        "business_type_id",
        "description",
        "is_enabled",
        "created_by",
        "altered_by",
        "dola"
    ];

    protected $table = 'par_business_type_details';

    public function businessType() {
        return $this->belongsTo("BusinessType");
    }

    use GetDataTrait;
}