<?php

namespace Modules\Parameters\Entities;

class PortalParameter extends AbstractParameter
{
    protected $fillable = [
        "name",
        "description",
        "created_by",
        "created_on"
    ];

    protected $table = "par_portal_parameters";

    use GetDataTrait;
}