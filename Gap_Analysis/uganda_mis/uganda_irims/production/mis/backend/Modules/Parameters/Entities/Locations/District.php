<?php


namespace Modules\Parameters\Entities\Locations;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Parameters\Entities\AbstractParameter;

class District extends AbstractParameter
{
    protected $fillable = [
        "name",
        "description",
        "is_enabled",
        "created_by",
        "altered_by",
        "dola"
    ];

    protected $table = 'par_districts';

    public function region() {
        return $this -> belongsTo("Region");
    }

    public static function getData($start, $limit, $doRetrieveAll, $filters) {
        $rawSql = "par_districts.*, par_regions.name as region_name, par_countries.name as country_name";
        $db = DB::table("par_districts")
            ->leftJoin("par_regions", "par_districts.region_id", '=', "par_regions.id")
            ->leftJoin("par_countries", "par_regions.country_id", '=', "par_countries.id")
            ->select(DB::raw($rawSql));

        return self::getFk($start, $limit, $doRetrieveAll, __CLASS__, $db, $filters);
    }
}