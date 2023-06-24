<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 7/26/2017
 * Time: 1:46 PM
 */

namespace App\Helpers;

use PHPJasper as JasperPHP;
use PDF;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
class UtilityHelper
{

    static function getTimeDiffHrs($time1, $time2)
    {
        $t1 = StrToTime($time1);
        $t2 = StrToTime($time2);
        $diff = $t1 - $t2;
        $hours = $diff / (60 * 60);
        return $hours;
    }static function returnColumnParamFromArray($dataArray,$dataValue,$col){
        $dataPrint = array_filter($dataArray, function ($var) use ($dataValue) {
            return ($var['id'] == $dataValue);
        });
        $data = array();
        foreach($dataPrint as $rec){
            $data = array('name'=>$rec[$col],
                        'id'=>$rec['id']
                        );
        }
        if(!empty($data)){
            return $data['name'];
        }else{
            return '';
        }
        
    } 
    static function checkForOngoingApplications($registered_id, $table_name, $reg_column, $process_id,$sub_module_id)
    {
    	if($sub_module_id==9){
    	   $res = array(
            'exists' => false,
            'ref_no' => ''
        );
        return $res;
    	}
		
		  
         $qry = DB::connection('mis_db')->table($table_name . ' as t1')
             ->leftJoin('tra_approval_recommendations as t2', 't1.application_code', '=', 't2.application_code')
             ->where('t1.' . $reg_column, $registered_id)
             ->where(array('t1.process_id'=>$process_id))
             //->whereIn('t1.application_status_id',[1,2,6,8]);
             ->whereIn('t1.application_status_id',[1,2,8]);
            if(validateIsNumeric($sub_module_id)){
              $qry->where(array('t1.sub_module_id'=>$sub_module_id));
			  
            }
          
         $app_details = $qry->first();
		 
		
        
        // //the portal details too
        if (is_null($app_details) || !validateIsNumeric($registered_id) ) {
                    $res = array(
               'exists' => false,
                'ref_no' => ''
            );
        } else {
             $res = array(
                'exists' => true,
                 'ref_no' => $app_details->reference_no
            );
         }

     
        return $res;
    }
    static function checkForPortalOngoingApplications($registered_id, $table_name, $reg_column, $process_id,$sub_module_id)
    {
    	
        $qry = DB::table($table_name . ' as t1')
            ->where('t1.' . $reg_column, $registered_id)
            //->where(array('t1.process_id'=>$process_id))
            ->whereIn('t1.application_status_id',[1,2,6,8]);
            if(validateIsNumeric($sub_module_id)){
              $qry->where(array('t1.sub_module_id'=>$sub_module_id));
            }
            
        $app_details = $qry->first();
		
		
      
        //the portal details too
        if (is_null($app_details) || !validateIsNumeric($registered_id)) {
            $res = array(
                'exists' => false,
                'ref_no' => ''
            );
        } else {
            $res = array(
                'exists' => true,
                'ref_no' => $app_details->tracking_no
            );
        }
        

        return $res;
    }

    static function is_connected()
    {
        $connected = @fsockopen("www.google.com", 80);
        //website, port  (try 80 or 443)
        if ($connected) {
            $is_conn = true; //action when connected
            // fclose($connected);
        } else {
            $is_conn = false; //action in connection failure
        }
        return $is_conn;

    }
    static function formatMoney($money)
    {
        if ($money == '' || $money == 0) {
            $money = '00';
        }
        return is_numeric($money) ? number_format((round($money)), 2, '.', ',') : round($money);
    }

    static function converter1($date)
    {
        $date = str_replace('/', '-', $date);
        $dateConverted = date('Y-m-d H:i:s', strtotime($date));
        return $dateConverted;
    }

    static function converter2($date)
    {
        $date = date_create($date);
        $dateConverted = date_format($date, "d/m/Y H:i:s");
        return $dateConverted;
    }

    static function converter11($date)
    {
        $date = str_replace('/', '-', $date);
        $dateConverted = date('Y-m-d', strtotime($date));
        return $dateConverted;
    }

    static function converter22($date)
    {
        $date = date_create($date);
        $dateConverted = date_format($date, "d/m/Y");
        return $dateConverted;
    }

    static function json_output($data = array(), $content_type = 'json')
    {

        if ($content_type == 'html') {
            header('Content-Type: text/html; charset=utf-8');
        } else {
            header('Content-type: text/plain');
        }

        $data = utf8ize($data);
        echo json_encode($data);

    }

    static function utf8ize($d)
    {
        if (is_array($d))
            foreach ($d as $k => $v)
                $d[$k] = utf8ize($v);

        else if (is_object($d))
            foreach ($d as $k => $v)
                $d->$k = utf8ize($v);

        else
            return utf8_encode($d);

        return $d;
    }

    static function formatDate($date)
    {
        if ($date == '0000-00-00 00:00:00' || $date == '0000-00-00' || strstr($date, '1970-00') != false || strstr($date, '1970') != false) {
            return '';
        } else {
            return ($date == '' or $date == null) ? '0000-00-00' : date('Y-m-d', strtotime($date));
        }
    }

    static function formatDaterpt($date)
    {
        if ($date == '0000-00-00 00:00:00' || $date == '0000-00-00' || strstr($date, '1970-00') != false || strstr($date, '1970') != false) {
            return '';
        } else {
            return ($date == '' or $date == null) ? '' : date('d-m-Y', strtotime($date));
        }
    }

    static function returnUniqueArray($arr, $key)
    {
        $uniquekeys = array();
        $output = array();
        foreach ($arr as $item) {
            if (!in_array($item[$key], $uniquekeys)) {
                $uniquekeys[] = $item[$key];
                $output[] = $item;
            }
        }
        return $output;
    }
    static function generateTraderNo($table_name){
        $trader_no = mt_rand(1000, 99999);
        //check if it exists
        $where = array('identification_no'=>$trader_no);
        $check = recordExists($table_name, $where);
        if($check){
            return generateTraderNo($table_name);
        }
        else{
            return $trader_no;
        }
    }
    static function validateIsNumeric($value){
        if(is_numeric($value) && $value != 0){
            return true;
        }
        else{
            return false;
        }
    }
    static function returnFuncResponses($resp,$title,$return_field,$return_value){

        if($resp){
            $res = array('success'=>true,
                         'message'=>$title.' saved successfully.');

            $res[$return_field] = $return_value;
         }
         else{
            $res = array(
            'success'=>false,
            'message'=>$title.' not saved, it this persists contact the system Administrator');
         }
         return $res;
    }
    static function returnContextMenuActions(){
            //return records
            $records = DB::table('wb_processstatus_actions as t1')
                            ->select('t2.*', 't1.status_id', 't2.name as text', 't2.iconCls as icon')
                            ->join('wb_statuses_actions as t2', 't1.action_id','=','t2.id')
                            ->get();
            return convertStdClassObjToArray($records);
    }
    static function returnActionColumn($status_id,$actionColumnData){
            $data = array();

            $filterBy = $status_id; // or Finance etc.

            $dataPrint = array_filter($actionColumnData, function ($var) use ($filterBy) {
                return ($var['status_id'] == $filterBy);
            });

            foreach($dataPrint as $rec){
                $data[] = array('text'=>$rec['text'],
                            'icon'=>$rec['icon'],
                            'action'=>$rec['action'],
                            'status_id'=>$rec['status_id']
                            );
            }

            $action_data = array('items'=>array("text"=>'Action',
                                                "icon"=> "menu",
                                                "items"=>$data,
                                                "items2"=>$dataPrint
            ));

            return $action_data;
    }
    public static function returnParamFromArray($dataArray,$dataValue){
        $dataPrint = array_filter($dataArray, function ($var) use ($dataValue) {
            return ($var['id'] == $dataValue);
        });
        $data = array();
        foreach($dataPrint as $rec){
            $data = array('name'=>$rec['name'],
                        'id'=>$rec['id']
                        );
        }
        if(!empty($data)){
            return $data['name'];
        }else{
            return '';
        }

    } static function getApplicationPrimaryReferenceNo($where_statement, $applications_table){
        $sub_module_id = 7; //primary sub-module
        $primary_ref = DB::connection('mis_db')->table($applications_table.' as t1')
                        ->where($where_statement)
                        ->value('reference_no');

        return $primary_ref;
     }
     static function generateApplicationSubRefNumber($reg_product_id,$table_name,$ref_id, $codes_array, $sub_module_id, $user_id)
     {

         $app_counter = DB::connection('mis_db')->table($table_name)
                             ->where(array('reg_product_id'=>$reg_product_id,'sub_module_id'=>$sub_module_id))
                             ->count();
         $serial_no =  $app_counter+1;

         $codes_array['serial_no'] = $serial_no;
         $ref_number = self::generateRefNumber($codes_array, $ref_id);
         return $ref_number;
     }
     static function generateRefNumber($codes_array, $ref_id)
    {
        $serial_format = DB::connection('mis_db')->table('refnumbers_formats')
            ->where('id', $ref_id)
            ->value('ref_format');
        $arr = explode("|", $serial_format);
        $serial_variables = $serial_format = DB::connection('mis_db')->table('refnumbers_variables')
            ->select('identifier')
            ->get();
        $serial_variables = convertStdClassObjToArray($serial_variables);
        $serial_variables = convertAssArrayToSimpleArray($serial_variables, 'identifier');
        $ref = '';
        foreach ($arr as $code) {
            if (in_array($code, $serial_variables)) {
                isset($codes_array[$code]) ? $code = $codes_array[$code] : $code;
            }
            $ref = $ref . $code;
        }
        return $ref;
    }
    static function getProductPrimaryReferenceNo($where_statement, $applications_table){
        $sub_module_id = 7; //primary sub-module
		//check on the registered products
		$primary_ref ='';
		$reg_product_id = $where_statement['t1.reg_product_id'];
		$section_id = $where_statement['t1.section_id'];
		$record = DB::connection('mis_db')->table('tra_registered_products as t1')
                        ->where(array('id'=>$reg_product_id))
						->first();
		if($record){
			$primary_ref = $record->registration_ref_no;
		}
		if($primary_ref =='' || $primary_ref == null){
				 $primary_ref = DB::connection('mis_db')->table($applications_table.' as t1')
                        ->join('tra_product_information as t2', 't1.product_id','=','t2.id')
                        ->where($where_statement)
                        ->value('reference_no');
		}
       if($primary_ref =='' || $primary_ref == null){
		   $primary_ref = DB::connection('mis_db')->table($applications_table.' as t1')
                        ->join('tra_product_information as t2', 't1.product_id','=','t2.id')
                        ->where(array('reg_product_id'=>$reg_product_id, 'section_id'=>$section_id))
                        ->value('reference_no')
						->orderBy('t1.sub_module_id','desc');
	   }

        return $primary_ref;
     }
     static function generateSubRefNumber($where_statement,$table_name,$ref_id, $codes_array, $sub_module_id, $user_id)
     {
         $app_counter = DB::connection('mis_db')->table($table_name)
                             ->where($where_statement)
                             ->count();
         $serial_no =  $app_counter+1;

         $codes_array['serial_no'] = $serial_no;
         $ref_number = self::generateRefNumber($codes_array, $ref_id);
         return $ref_number;
     }



     static function funcSaveRegisteredProductOtherdetails($tra_product_id, $online_product_id,$trader_id){
        $mis_db = DB::connection('mis_db');
        $previous_prodingredients = $mis_db->table('tra_product_ingredients as t2')
            ->select(DB::raw("$online_product_id as product_id, ingredient_type_id,ingredient_id,specification_type_id,strength,proportion,ingredientssi_unit_id,inclusion_reason_id,acceptance_id, $trader_id as created_by, now() as created_on"))
            ->where('product_id', $tra_product_id)
            ->get();
            $previous_prodingredients = convertStdClassObjToArray($previous_prodingredients);
            DB::table('wb_product_ingredients')
                ->insert($previous_prodingredients);
            //packaging
            $previous_prodpackaging = $mis_db->table('tra_product_packaging as t2')
                ->select(DB::raw("$online_product_id as product_id, container_type_id,container_id,container_material_id,closure_material_id,seal_type_id,retail_packaging_size,packaging_units_id,unit_pack,product_unit, $trader_id as created_by, now() as created_on"))
                ->where('product_id', $tra_product_id)
                ->get();
            $previous_prodpackaging = convertStdClassObjToArray($previous_prodpackaging);
            DB::table('wb_product_packaging')
                ->insert($previous_prodpackaging);
            //nutrients
            $previous_prodnutrients = $mis_db->table('tra_product_nutrients as t2')
                ->select(DB::raw("$online_product_id as product_id, nutrients_category_id,nutrients_id,units_id,proportion,$trader_id as created_by, now() as created_on"))
                ->where('product_id', $tra_product_id)
                ->get();
            $previous_prodnutrients = convertStdClassObjToArray($previous_prodnutrients);
            DB::table('wb_product_nutrients')
                ->insert($previous_prodnutrients);
            //nutrients
            $previous_prodmanufacturers = $mis_db->table('tra_product_manufacturers as t2')
                ->select(DB::raw("$online_product_id as product_id, manufacturer_id,manufacturer_role_id,manufacturer_status_id,manufacturer_type_id,active_ingredient_id,$trader_id as created_by, now() as created_on"))
                ->where('product_id', $tra_product_id)
                ->get();
            $previous_prodmanufacturers = convertStdClassObjToArray($previous_prodmanufacturers);

            DB::table('wb_product_manufacturers')
                ->insert($previous_prodmanufacturers);


            $previous_prodgmpinspection = $mis_db->table('tra_product_gmpinspectiondetails as t2')
                ->select(DB::raw("$online_product_id as product_id,reg_product_id, reg_site_id,manufacturing_site_id,gmp_productline_id,gmp_productline_id,status_id,$trader_id as created_by, now() as created_on"))
                ->where('product_id', $tra_product_id)
                ->get();
            $previous_prodgmpinspection = convertStdClassObjToArray($previous_prodgmpinspection);
            DB::table('wb_product_gmpinspectiondetails')
                ->insert($previous_prodgmpinspection);

       }
       static function  getProductRetentionStatus($section_id,$reg_product_id){
            //tra_product_retentions
            //check the retention staus

            $exemption_data = DB::connection('mis_db')->table('tra_retention_exemptions')
                                    ->where(array('section_id'=>$section_id,'is_exempted'=>1))
                                    ->whereDate('exemption_to', '>=', Carbon::now()->toDateString())
                                    ->whereDate('exemption_from', '<=', Carbon::now()->toDateString())
                                    ->count();

			if($exemption_data == 0){
			$retention_year = date('Y');
                $records = DB::connection('mis_db')->table('tra_product_retentions as t1')
						->leftJoin('tra_product_retentionspayments as t2', 't1.id','t2.retention_id')
						->select('t1.*', 't2.retention_receipt_id')
                        ->where(array('reg_product_id'=>$reg_product_id))
                        ->whereRaw("year(retention_year) > 2014 and year(retention_year) <= $retention_year")
						->where('t1.retention_status_id',1);
						$records = $records->get();

                    if($records->count() >1){
                                foreach($records as $rec){

                                    $retention_year = $rec->retention_year;
                                    $receipt_id = $rec->retention_receipt_id;
                                    $invoice_id = $rec->invoice_id;
                                    $retention_id = $rec->id;

                                    if($receipt_id > 0){
                                            //check payment
                                            $payment_data = DB::connection('mis_db')->table('tra_payments')
                                                                ->where(array('id'=>$receipt_id,'invoice_id'=>$invoice_id))
                                                                ->count();

                                            if($payment_data ==0){

                                                $res = array('retention_status'=>'Pending Retention Invoice', 'retention_status_id'=>2);

                                            }
                                            else{

                                                    $res = array('retention_status'=>'Exempted', 'retention_status_id'=>1);
                                            }
                                    }
                                    else{
                                        $exemption_rec = DB::connection('mis_db')->table('tra_retention_exemptions')
                                                            ->where(array('reg_product_id'=>$reg_product_id,'is_exempted'=>1))
                                                            ->where(DB::raw("year(retention_year) = '".date('Y')."'"))
                                                            ->count();
                                        if($exemption_rec  == 0){
                                            // checking payment

                                            $res = array('retention_status'=>'Pending Retention Invoice', 'retention_status_id'=>2);

                                        }
                                        else{

                                            $res = array('retention_status'=>'Exempted', 'retention_status_id'=>3);

                                        }


                                    }

                                }
                    }
                    else{

                        $res = array('retention_status'=>'No Pending Retention', 'retention_status_id'=>4);
                    }

            }
            else{
                    $res = array('retention_status'=>'Exempted', 'retention_status_id'=>3);

            }

            return $res;

        }
        static function  saveApplicationSubmissionDetails($application_code,$table_name){
                $rec = DB::table($table_name.' as t1')
                                 ->join('wb_statuses as t2', 't1.application_status_id', '=','t2.id')
                                ->select('t1.*', 't2.status_type_id')
                                ->where('application_code',$application_code)
                                ->first();
                if($rec){
                    $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('section_id' => $rec->section_id,'module_id' => $rec->module_id,'sub_module_id' => $rec->sub_module_id,), 'id','mis_db');
                    $data = array('application_code'=>$rec->application_code,
                                    'application_id'=>$rec->id,
                                    'reference_no'=>$rec->reference_no,
                                    'tracking_no'=>$rec->tracking_no,
                                    'process_id'=>$process_id,
                                    'module_id'=>$rec->module_id,
                                    'sub_module_id'=>$rec->sub_module_id,
                                    'trader_id'=>$rec->trader_id,
                                    'status_type_id'=>$rec->status_type_id,
                                    'section_id'=>$rec->section_id,
                                    'application_status_id'=>$rec->application_status_id,
                                    'date_submitted'=>Carbon::now(),
                                    'created_on'=>Carbon::now()
                                );
                                if($rec->module_id == 1){
                                    $prodclass_category_id = getSingleRecordColValue('wb_product_information', array('id' => $rec->product_id), 'prodclass_category_id');
                                    $data['prodclass_category_id'] = $prodclass_category_id;
                                }
                    $sub_data = DB::table('wb_onlinesubmissions')->where('application_code',$application_code)->count();
                    if($sub_data >0){
                            //update
                            DB::table('wb_onlinesubmissions')->where('application_code',$application_code)->update($data);
                    }
                    else{
                            DB::table('wb_onlinesubmissions')->insert($data);
                    }
                }
        }
		 static  function returnproductssFilters($rec){
            $whereClauses = array();
            $filter_string = '';
            if($rec->registration_no != ''){
                $whereClauses[] = "t4.certificate_no like '%" . ($rec->registration_no) . "%'";

            }
            if($rec->brand_name != ''){
                $whereClauses[] = "t2.brand_name like '%" . ($rec->brand_name) . "%'";

            }
			if($rec->classification_id != ''){
                $whereClauses[] = "t6.id = '" . ($rec->classification_id) . "'";

            }
			if($rec->common_name_id != ''){
				if(validateIsNumeric($rec->common_name_id)){
					$whereClauses[] = "t2.common_name_id = '" . ($rec->common_name_id) . "'";
				}
				else{
					$whereClauses[] = "t5.name like '%" . ($rec->common_name_id) . "%'";
				}


            }if($rec->product_form_id != ''){
                $whereClauses[] = "t2.dosage_form_id = '" . ($rec->product_form_id) . "'";

            }if($rec->country_id != ''){
                $whereClauses[] = "t10.country_id = '" . ($rec->country_id) . "'";

            }
            if($rec->market_authorisation_holder  != ''){

                $whereClauses[] = "t10.name like '%" . ($rec->market_authorisation_holder) . "%'";
            }
            if($rec->manufacturer_name  != ''){

                $whereClauses[] = "t16.name like '%" . ($rec->manufacturer_name) . "%'";
            }if($rec->man_country_id  != ''){

                $whereClauses[] = "t16.country_id = '" . ($rec->man_country_id) . "'";
            }if($rec->local_represenatative  != ''){

                $whereClauses[] = "t12.name like '%" . ($rec->local_represenatative) . "%'";
            }



            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }

            return $filter_string;
        }static function generateInvoiceNo($user_id)
        {
            $registration_year = date("Y");
            $prefix = 101;
            $qry = DB::connection('mis_db')->table('invoice_serials');
            $qry1 = $qry->where('registration_year', $registration_year);
            $last_serial = $qry->value('last_serial');
            if (is_numeric($last_serial) && $last_serial != '') {
                $serial_no = $last_serial + 1;
                $update_params = array(
                    'last_serial' => $serial_no,
                    'dola' => Carbon::now(),
                    'altered_by' => $user_id
                );
                $qry1->update($update_params);
            } else {
                $serial_no = 1;
                $insert_params = array(
                    'registration_year' => $registration_year,
                    'last_serial' => $serial_no,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                $qry->insert($insert_params);
            }
            $serial_no = $serial_no = str_pad($serial_no, 4, 0, STR_PAD_LEFT);
            $invoice_no = $prefix.$registration_year . $serial_no;
            return $invoice_no;
        }
    
        static function getApplicationGeneralFormsFields($req){
            $sub_module_id = $req->sub_module_id;
            $prodclass_category_id = $req->prodclass_category_id;
            $module_id = $req->module_id;
            if(!validateIsNumeric($module_id)){

                    $submodule_data = getTableData('sub_modules', array('id'=>$sub_module_id),'mis_db');
                    $module_id = $submodule_data->module_id;

            }
            
            $where = array('t3.module_id'=>$module_id,'sub_module_id'=>$sub_module_id, 'prodclass_category_id'=>$prodclass_category_id);

            $data = DB::connection('mis_db')->table('wb_formfields_definations as t1')
                             ->join('wb_form_fields as t2', 't1.form_field_id', '=', 't2.id')
                            ->join('wb_app_formsdefination as t3', 't1.app_formsdefination_id', '=', 't3.id')
                            ->select('t1.*', 't2.field_name')
                            ->where($where)
                            ->get();
    
                         return $data;
    
        }
}
