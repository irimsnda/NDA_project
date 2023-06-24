<?php


namespace Modules\Parameters\Entities;

trait GetDataTrait {
    public static function getData($start, $limit, $doRetrieveAll, $filter) {
        return parent::get($start, $limit, $doRetrieveAll,  __CLASS__, $filter);
    }
}