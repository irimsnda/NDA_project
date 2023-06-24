<?php

namespace Modules\Parameters\Entities;


class Zone
{
    protected $fillable = [
        "name",
        "code",
        "description",
        "created_by",
        "created_at",
        "is_enabled",
        "dola",
        "altered_by"
    ];

    protected $table = 'par_zones';

    use GetDataTrait;
}