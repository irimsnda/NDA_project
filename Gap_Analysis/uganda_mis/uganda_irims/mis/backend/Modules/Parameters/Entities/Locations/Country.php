<?php


namespace Modules\Parameters\Entities\Locations;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Parameters\Entities\AbstractParameter;
use Modules\Parameters\Entities\GetDataTrait;

class Country extends AbstractParameter
{
    protected  $fillable = [
        "name",
        "description",
        "is_enabled",
        "created_by",
        "altered_by",
        "dola"
    ];

    protected $table = 'par_countries';

    public function regions() {
        return $this -> hasMany("Region");
    }


    use GetDataTrait;
}