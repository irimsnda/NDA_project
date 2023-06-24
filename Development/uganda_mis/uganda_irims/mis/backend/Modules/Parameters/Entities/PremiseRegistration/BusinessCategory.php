<?php

namespace Modules\Parameters\Entities\PremiseRegistration;


use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class BusinessCategory extends AbstractParameter
{
    protected  $fillable = [
        "name",
        "description",
        "is_enabled",
        "created_by",
        "altered_by",
        "dola"
    ];

    protected $table = 'par_business_categories';

    use GetDataTrait;

}