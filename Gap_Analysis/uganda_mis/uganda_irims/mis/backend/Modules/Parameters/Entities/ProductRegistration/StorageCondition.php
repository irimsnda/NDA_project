<?php

namespace Modules\Parameters\Entities\ProductRegistration;

use Modules\Parameters\Entities\AbstractParameter;

class StorageCondition extends AbstractParameter
{
    protected $fillable = [
        "name",
        "description",
        "is_enabled",
        "created_by",
        "created_at",
        "altered_by",
        "dola"
    ];

    public function products() {
        return $this->hasMany("ProductInformation");
    }

    protected $table = "par_storage_conditions";
}