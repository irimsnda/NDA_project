<?php


namespace Modules\Parameters\Entities\ProductRegistration;

use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class CommonName extends AbstractParameter
{
    protected $fillable = [
        "name",
        "description",
        "section_id",
        "created_by",
        "created_at",
        "is_enabled",
        "dola",
        "altered_by"
    ];

    public function atcCommonNames() {
        return $this->hasMany("AtcCommonName");
    }

    protected $table = "par_common_names";

    use GetDataTrait;
}