<?php


namespace Modules\Parameters\Entities\ProductRegistration;

use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class AtcCommonName extends AbstractParameter
{
    protected $fillable = [
        "common_name_id",
        "atc_code_id"
    ];

    public function commonName() {
        return $this->belongsTo("CommonName");
    }

    public function atcCode() {
        return $this->belongsTo("AtcCode");
    }

    protected $table = "par_atc_code_common_name";

    use GetDataTrait;
}