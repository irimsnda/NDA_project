<?php

namespace App\Imports;

use App\Models\HumanMedicinesScreening;
use Maatwebsite\Excel\Concerns\ToModel;

class HumanMedicinesScreeningImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new HumanMedicinesScreening([
            //
            ''
        ]);
    }
}
