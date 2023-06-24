<?php


namespace Modules\Parameters\Entities\ProductRegistration;

use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class AtcCode extends AbstractParameter
{
    protected $fillable = [
        "atc_code",
        "description",
        "is_enabled",
        "created_by",
        "altered_by",
        "dola"
    ];

    public function atcCommonNames() {
        return $this->hasMany("AtcCommonName");
    }

    protected $table = "par_atc_codes";

    use GetDataTrait;
}