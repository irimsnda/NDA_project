<?php


namespace Modules\Parameters\Entities\ProductRegistration;

use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class DosageForm extends AbstractParameter
{
    protected $fillable = [
        "name",
        "description",
        "created_by",
        "created_at",
        "is_enabled",
        "dola",
        "altered_by"
    ];

    protected $table = "par_dosage_forms";

    use GetDataTrait;
}