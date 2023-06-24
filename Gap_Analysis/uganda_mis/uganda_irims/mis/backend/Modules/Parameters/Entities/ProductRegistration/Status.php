<?php


namespace Modules\Parameters\Entities\ProductRegistration;

use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class Status extends AbstractParameter
{
    protected $fillable = [
        "name",
        "description",
        "code",
        "created_by",
        "created_at",
        "dola",
        "altered_by",
        "is_enabled"
    ];

    protected $table = "par_statuses";

    public function productApplication() {
        return $this->hasMany("ProductApplication");
    }

    use GetDataTrait;
}