<?php
	
namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Modules\UserManagement\Models\Title;

class Init extends Controller
{

    public function index()
    {
        try {
            DB::connection()->getPdo();
            if (DB::connection('mis_db')->getDatabaseName()) {
					//echo "Yes! Successfully connected to the DB: " . DB::connection('mis_db')->getDatabaseName();
                    //exit();
            }
			//add second check for DMS 
			
        } catch (\Exception $e) {
            die("<h4 style='text-align: center; color: red'>Could not connect to the database.  Please check your configuration!!</h4>
                 <p style='text-align: center; color: pink'>".$e->getMessage()."</p>");
        }catch (\Throwable $throwable) {
            die("<h4 style='text-align: center; color: red'>Could not connect to the database.  Please check your configuration!!</h4>
                 <p style='text-align: center; color: pink'>".$throwable->getMessage()."</p>");
        }
        
		$year = date('Y');
        $data = array();
		//echo "welcom to TMDA self service portal";
		
       return view('init', $data);
        //global  variable passed to the front end view vew the controller ?
		//How to pass variables 
    }

}
