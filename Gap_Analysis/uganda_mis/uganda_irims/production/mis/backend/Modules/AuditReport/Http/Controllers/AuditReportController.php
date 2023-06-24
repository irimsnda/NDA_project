<?php

namespace Modules\AuditReport\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Excel;
use Modules\OpenOffice\Http\Controllers\OpenOfficeController;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class AuditReportController extends Controller
{
     
    public function generateReportData(Request $req)
    {
      $def_id = $req->def_id;
      $search_column = $req->search_column;
      $search_value = $req->search_value;
      $date_from = $req->date_from;
      $date_to = $req->date_to;
      $module_id = $req->module_id;
      $start = $req->start;
      $limit = $req->limit;

      if(validateIsNumeric($def_id)){
           $record = DB::table('par_auditreport_config')->where('id',$def_id)->first();
            
            if($record->is_support_table){
                   $sql = $record->data_query;
                    $results = DB::select($sql);
                   if($search_column != '' || $search_column != null){
                       
                       $results = array_filter($results, function ($item) use($search_column,$search_value){
                          return preg_match("/$search_value/i",$item->$search_column);
                       });
                       //to be deplicated later with a cheaper option
                       $defineArray = array();
                       foreach ($results as $result) {
                           $defineArray[]=$result;
                       }
                      $results = $defineArray;

                     }
                     if(isset($date_to) != null && isset($date_from) != null){
                      $results = array_filter($results, function ($item) use($date_from,$date_to){
                            return ( formatDate($item->action_date) >= formatDate($date_from) && formatDate($item->action_date) <= formatDate($date_to) );
                       });
                    }
                   
                   $total = count($results);
                    $results = array_slice($results,$start,$limit);
                }
                else{
                    $table_name = $record->audit_table_name;
                    $results = DB::table($table_name ." as t1");
                    if($search_column != '' || $search_column != null){
                        $results->whereRaw($search_column." LIKE '%".$search_value."%'");
                    }
                    if(isset($date_to) != null && isset($date_from) != null){
                      $results->whereRAW("date_format(action_date, '%Y%-%m-%d') BETWEEN '" . formatDate($date_from) . "' AND '".formatDate($date_to)."'");
                    }
                    $total = $results->count();
                    $results = $results->skip($start)->take($limit)->select('t1.*','t1.audit_id as id','t1.id as Record_id')->get();
                }

           $res = array(
                'success' => true,
                'results' => $results,
                'total' => $total,
                'message'=> 'all is well'
              );

        }else{
              $configs = DB::table('par_auditreport_config')->where('module_id',$module_id)->orderBy('is_support_table')->get();
              $results = array();
              foreach ($configs as $config) {
                 if($config->is_support_table){
                    $results[] = array(
                        'title'=>$config->report_title,
                        'def_id'=>$config->id,
                        'is_main'=>false
                    );
                 }
                 else{
                    $results[] = array(
                        'title'=>$config->report_title,
                        'def_id'=>$config->id,
                        'is_main'=>true
                    );
                 }
              }
              $res = array(
                'success' => true,
                'results' => $results,
                'total_definations' => count($results),
                'message'=> 'all is well'
              );
        }

      
      return json_encode($res);
    }

    public function saveAuditDefinationConfigParam(Request $req){
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            //hold necessary data
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];

            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);

            //definations
            $primary_tablename = $req->primary_table;
            $event_time = $req->event_time;
            $table_event = $req->table_event;

            //create a audit table if not exist
            $check_table = DB::table('par_audit_definations')->where('primary_table',$primary_tablename)->where('table_event',$table_event)->count();

            if($check_table > 0){
                $res = array(
                    'success' => false,
                    'message' => "selected table is already being watched"
                );
              return response()->json($res);
            }else{
                
                $audit_table_name = $primary_tablename."_audit";

                $TblExist = DB::getSchemaBuilder()->hasTable($audit_table_name);
                
                if(!$TblExist){
                    $createTbl = DB::select("CREATE TABLE IF NOT EXISTS ".$audit_table_name." AS (SELECT t1.*,t2.action_type,t2.action_by,t2.action_date,t2.id as audit_id from ".$primary_tablename." t1 JOIN def_audit_template t2 ON 1=1)");
                    
                    DB::unprepared("ALTER TABLE ".$audit_table_name." MODIFY audit_id INT AUTO_INCREMENT PRIMARY KEY");
                }
                //define table data 
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $table_data['audit_table'] = $audit_table_name;
            //insert record
            $res = insertRecord($table_name, $table_data, $user_id);
            }

            //create a trigger
            $triggerSql = DB::unprepared(
                "CREATE TRIGGER ".$table_event."_trig_".$primary_tablename." ".$event_time." ".$table_event." ON ".$primary_tablename." FOR EACH ROW BEGIN insert into ".$audit_table_name." (select t1.*,'".$table_event."' as action_type, CURRENT_USER as action_by, now() as action_date,'' as audit_id from ".$primary_tablename." t1 where id = OLD.id);
                        END");
               
            

        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }

   public function dropAuditDefinationParam(Request $req){
    $record_id = $req->record_id;
    try {
        if(validateIsNumeric($record_id)){
            $primary_tablename = $req->primary_table;
            $table_event = $req->table_event;
            $user_id = \Auth::user()->id;

            //regenerating definations
            $audit_table_name = $primary_tablename."_audit";
            $trigger_name = $table_event."_trig_".$primary_tablename;

            //drop trigger
            $res = DB::unprepared("DROP TRIGGER ".$trigger_name);

            //check if table exist
            //rename audit table
            $now = carbon::now()->format('YmdHis');
            $newAuditTblName = $now."_old_".$audit_table_name;

            $res = DB::unprepared("Rename table ".$audit_table_name." TO ".$newAuditTblName);
            //get the table create statement
            $TblCreateStmpt = DB::select('SHOW CREATE TABLE '.$newAuditTblName);
            $statement = convertStdClassObjToArray($TblCreateStmpt);
            $qry = $statement[0]['Create Table'];

            //current table data
            $data = DB::table($newAuditTblName)->get();
            $dataArray = convertStdClassObjToArray($data);

            //create the table in audit database
            $trail_con = DB::connection('audit_db');
            $trail_con->unprepared($qry);
            $trail_con->table($newAuditTblName)->insert($dataArray);

            //drop the table from mis db
            DB::statement("DROP table ".$newAuditTblName);

            //delete defination 
            $where = array('id'=>$record_id);
            $previous_data = getPreviousRecords('par_audit_definations', $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = deleteRecord('par_audit_definations', $previous_data, $where, $user_id);
            if(!$res){
               return response()->json($res);
            }
        }else{
            $res = array(
                'success' => false,
                'message' => "No record sent for deletion"
                );
        }
      }
     catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
                );
     } catch (\Throwable $throwable) {
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
    return response()->json($res);
    }

    public function exportAuditLogs(Request $req){
        $audit_table = $req->audit_table;
        $table_event = $req->table_event;
        $heading = $audit_table." logs";
        $filename = $audit_table."_logs";
        //audit spreadsheet
        $AuditSpreadsheet = new Spreadsheet();
        $sheet = $AuditSpreadsheet->getActiveSheet();
        $cell=0;


        
//Main heading style
        $styleArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
                    'rotation' => 90,
                    'startColor' => [
                        'argb' => 'FFA0A0A0',
                    ],
                    'endColor' => [
                        'argb' => 'FFFFFFFF',
                    ],
                ]
            ];
        $styleHeaderArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ]
            ];
      $data = DB::table($audit_table)->get();
      $data_array = json_decode(json_encode($data), true); 

      if(isset($data_array[0])){
        $header=array_keys($data_array[0]);
        $length=count($header);
       }else{
        $data_array=array();
        $header=array();
        $length=1;
        $sheet->getCell('A2')->setValue("No data");
       }

        $letter=$this->number_to_alpha($length,"");
        
         //first heading
                 $sheet->mergeCells('A1:'.$letter.'6')
                      ->getCell('A1')
                      ->setValue("TANZANIAN MEDICINE AND MEDICAL DEVICES AGENCY\nP.O. Box 77150, Nelson Mandela Road,Mabibo External\nTell : +255 22 2450512/2450751/2452108 Fax : +255 28 2541484\nWebsite: www.tfda.go.tzEmail: info@tfda.go.tz\n".$heading);
                $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
                $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);
        //headers 
               $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);
        //set autosize true for all columns
           $size=count($data_array)+7;
            $cellRange = 'A7:'.$letter.''.$size;
            if($length > 11){
                $sheet->getStyle($cellRange)->getAlignment()->setWrapText(true);
            }
            else{
                if($length>26){
                  foreach(range('A','Z') as $column) {
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                  $remainder=27;
                  while ($remainder <= $length) {
                    $column=$this->number_to_alpha($remainder,"");
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                    $remainder++;
                  }

                }else{

                  foreach(range('A',$letter) as $column) {
                    //dd(range('A',$letter) );
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                }
              }

          //adding formats to header
               $sheet->fromArray($header, null, "A7");
        //loop data while writting
               $sheet->fromArray( $data_array, null,  "A8");
        //create file
            $writer = new Xlsx($AuditSpreadsheet);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', 'attachment;filename='.$filename.'.xlsx');
        $response->headers->set('Cache-Control','max-age=0');


       return $response;
    }

    //helpers
    function number_to_alpha($num,$code)
        {   
            $alphabets = array('', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

            $division = floor($num / 26);
            $remainder = $num % 26; 

            if($remainder == 0)
            {
                $division = $division - 1;
                $code .= 'Z';
            }
            else
                $code .= $alphabets[$remainder];

            if($division > 26)
                return number_to_alpha($division, $code);   
            else
                $code .= $alphabets[$division];     

            return strrev($code);
        }


//application logs dump
    //product application
    public function logProductApplicationDetails($record_id){
      $defaults = DB::table('tra_product_applications')->select('product_id','application_code')->where('id',$record_id)->first();
      $application_code = $defaults->application_code;
      $product_id = $defaults->product_id;

      $application_data = DB::table('tra_product_applications as t1')
                ->LeftJoin('tra_product_information as t2','t1.product_id','t2.id')
                ->LeftJoin('par_classifications as t3','t2.classification_id','t3.id')
                ->LeftJoin('par_common_names as t4','t2.common_name_id','t4.id')
                 ->LeftJoin('par_product_categories as t5','t2.product_category_id','t5.id')
                 ->LeftJoin('par_subproduct_categories as t6','t2.product_subcategory_id','t6.id')
                 ->LeftJoin('par_productspecial_categories as t7','t2.special_category_id','t7.id')
                 ->LeftJoin('par_storage_conditions as t8','t2.storage_condition_id','t8.id')
                 ->LeftJoin('par_product_forms as t9','t2.product_form_id','t9.id')
                 ->LeftJoin('par_intended_enduser as t10','t2.intended_enduser_id','t10.id')
                 ->LeftJoin('par_zones as t11','t1.zone_id','t11.id')
                 ->LeftJoin('par_product_types as t12','t2.product_type_id','t12.id')
                 ->LeftJoin('wb_trader_account as t13','t1.applicant_id','t13.id')
                 ->LeftJoin('wb_trader_account as t14','t1.local_agent_id','t14.id')
                 ->LeftJoin('par_countries as t15','t13.country_id','t15.id')
                 ->LeftJoin('par_regions as t16','t13.region_id','t16.id')
                 ->LeftJoin('par_countries as t17','t14.country_id','t17.id')
                 ->LeftJoin('par_regions as t18','t14.region_id','t18.id')
                 ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
                 ->LeftJoin('par_approval_decisions as t20','t19.decision_id','t20.id')
                 ->LeftJoin('users as t21','t19.approved_by','t21.id')
                 ->LeftJoin('users as t22','t19.dg_signatory','t22.id')
                 ->LeftJoin('users as t23','t19.permit_signatory','t23.id')
                 ->LeftJoin('par_assessment_procedures as t24','t1.assessment_procedure_id','t24.id')
                 ->LeftJoin('par_sections as t25','t1.section_id','t25.id')
                 ->LeftJoin('par_zones as t26','t1.zone_id','t26.id')
                 
      



                 
                  ->select('t1.application_code','t1.module_id','t1.sub_module_id','t1.reference_no','t1.tracking_no','t1.submission_date','t2.brand_name', 't2.warnings','t2.shelf_life','t2.shelf_lifeafter_opening','t2.instructions_of_use','t2.physical_description', 't3.name as classification', 't4.name as common_name','t5.name as category','t6.name as sub_category','t7.name as special_category','t8.name as storage_condition','t9.name as product_form','t10.name as intended_users','t2.shelflifeduration_desc','t11.name as issueplace','t12.name as product_type','t13.name as applicant','t13.postal_address as applicant_postal_address','t13.physical_address as applicant_physical_address','t13.email_address as applicant_email','t13.telephone_no as applicant_tell','t13.telephone_no as applicant_tell','t14.name as local_agent','t14.postal_address as local_agent_postal_address','t14.physical_address as local_agent_physical_address','t14.email_address as 
                    local_agent_email','t14.telephone_no as local_agent_tell','t15.name as applicant_country','t16.name as applicant_region','t17.name as local_agent_country','t18.name as local_agent_region','t19.expiry_date','t19.certificate_issue_date','t19.id as recommendation_id','t19.certificate_no','t19.permit_no','t19.approval_date as approved_on',DB::raw('CONCAT(decrypt(t21.first_name),decrypt(t21.last_name)) as approved_by,CONCAT(decrypt(t22.first_name),decrypt(t22.last_name)) as dg_signatory, CONCAT(decrypt(t23.first_name),decrypt(t23.last_name)) as permit_signatory'),'t20.name as approval_decision','t24.name as assessment_procedure','t25.name as section','t26.name as zone')
              ->where('t1.id',$record_id)
              ->get();

        $ingredient_details = DB::table('tra_product_ingredients as t1')
                ->LeftJoin('par_ingredients_details as t2','t1.ingredient_id','t2.id')
                ->LeftJoin('par_ingredients_types as t3','t1.ingredient_type_id','t3.id')
                ->LeftJoin('par_inclusions_reasons as t4','t1.inclusion_reason_id','t4.id')
                ->LeftJoin('par_specification_types as t5','t1.specification_type_id','t5.id')
                ->LeftJoin('par_si_units as t6','t1.ingredientssi_unit_id','t6.id')
                
                 
                  ->select('t1.proportion','t1.strength','t2.name as ingredient', 't3.name as ingredient_type','t4.name as inclusion_reason','t5.name as specification_type','t6.name as ingredientssi_unit',DB::raw($application_code.' as application_code'))
                  ->where('t1.product_id',$product_id)
                  ->get();

        $product_packaging = DB::table('tra_product_packaging as t1')
                ->LeftJoin('par_containers_types as t2','t1.container_type_id','t2.id')
                ->LeftJoin('par_containers as t3','t1.container_id','t3.id')
                ->LeftJoin('par_containers_materials as t4','t1.container_material_id','t4.id')
                 ->LeftJoin('par_closure_materials as t5','t1.closure_material_id','t5.id')
                 ->LeftJoin('par_seal_types as t6','t1.seal_type_id','t6.id')
                 ->LeftJoin('par_packaging_units as t7','t1.packaging_units_id','t7.id')

                  ->select('t1.retail_packaging_size','t2.name as container_type', 't3.name as container','t4.name as container_material','t5.name as closure_material','t6.name as seal_type','t7.name as packaging_units','t1.unit_pack',DB::raw($application_code.' as application_code'))
                  ->where('product_id',$product_id)
                  ->get();

        $product_manufacturer = DB::table('tra_product_manufacturers as t1')
                ->LeftJoin('tra_manufacturers_information as t2','t1.manufacturer_id','t2.id')
                ->LeftJoin('tra_manufacturing_sites as t3','t1.man_site_id','t3.id')
                ->LeftJoin('par_manufacturing_roles as t4','t1.manufacturer_role_id','t4.id')
                 ->LeftJoin('par_countries as t5','t2.country_id','t5.id')
                 ->LeftJoin('par_regions as t6','t2.region_id','t6.id')
                 ->LeftJoin('par_manufacturing_types as t7','t1.manufacturer_type_id','t7.id')
                 ->LeftJoin('master_ingredients as t8','t1.active_ingredient_id','t8.id')


                  ->select('t2.physical_address','t2.postal_address','t2.email_address as email','t2.name as manufacturer','t2.telephone_no','t2.mobile_no', 't3.name as man_site','t4.name as manufacturer_role','t5.name as manufacturer_country','t6.name as manufacturer_region','t7.name as manufacturer_type','t8.name as active_ingredient',DB::raw($application_code.' as application_code'))
                  ->where('t1.product_id',$product_id)
                  ->get();


 $gmpInspection = DB::table('tra_product_gmpinspectiondetails  as t1')
                ->select('t11.name as product_line', 't7.permit_no as certificate_no', 't9.physical_address','t9.postal_address', 't9.email', 't9.name as manufacturer', 't2.name as manufacturer_country', 't3.name as manufacturer_region',DB::raw($application_code.' as application_code'))

                ->leftjoin('tra_manufacturing_sites as t9', 't1.manufacturing_site_id', '=', 't9.id')
                ->leftjoin('par_countries as t2', 't9.country_id', '=', 't2.id')
                ->join('tra_approval_recommendations as t7', 't9.permit_id', '=', 't7.id')
                ->leftjoin('par_regions as t3', 't9.region_id', '=', 't3.id')
                ->leftJoin('gmp_productline_details as t10', 't1.gmp_productline_id', '=', 't10.id')
                ->leftJoin('gmp_product_lines as t11', 't10.product_line_id', '=', 't11.id')
                ->where('t1.product_id',$product_id)
                ->get();


    //application
    $application_data_array = convertStdClassObjToArray($application_data);
    DB::table('appr_application_details')->insert($application_data_array);
    //ingridients
    $ingredient_details_array = convertStdClassObjToArray($ingredient_details);
    DB::table('appr_application_ingredients')->insert($ingredient_details_array);
     //product_packaging
    $product_packaging_array = convertStdClassObjToArray($product_packaging);
    DB::table('appr_application_packaging')->insert($product_packaging_array);
    //product_manufacturer
    $product_manufacturer_array = convertStdClassObjToArray($product_manufacturer);
    DB::table('appr_product_manufacturers')->insert($product_manufacturer_array);
    //product_manufacturer
    $gmpInspection_array = convertStdClassObjToArray($gmpInspection);
    DB::table('appr_gmpinspection_details')->insert($gmpInspection_array);
   }

 //premise Registration
  public function logPremiseApplicationDetails($record_id)
    {
      $defaults = DB::table('tra_premises_applications')->select('premise_id','application_code')->where('id',$record_id)->first();
      $application_code = $defaults->application_code;
      $premise_id = $defaults->premise_id;

    $application_data = DB::table('tra_premises_applications as t1')
           ->LeftJoin('tra_premises as t1b','t1.premise_id','t1b.id')
           ->LeftJoin('par_countries as t2','t1b.country_id','t2.id')
           ->LeftJoin('par_regions as t3','t1b.region_id','t3.id')
           ->LeftJoin('par_districts as t4','t1b.district_id','t4.id')
           ->LeftJoin('par_business_types as t5','t1b.business_type_id','t5.id')
           ->LeftJoin('par_business_scales as t6','t1b.business_scale_id','t6.id')
           ->LeftJoin('par_business_categories as t7','t1b.business_category_id','t7.id')
           ->LeftJoin('wb_trader_account as t8','t1.applicant_id','t8.id')
           ->LeftJoin('tra_personnel_information as t9','t1b.contact_person_id','t9.id')
           ->LeftJoin('tra_premises_otherdetails as t10','t1b.id','t10.premise_id')
           ->LeftJoin('par_business_type_details as t11','t10.business_type_detail_id','t11.id')
           ->LeftJoin('par_zones as t12','t1.zone_id','t12.id')
           ->leftJoin('par_countries as t13','t8.country_id','t13.id')
           ->leftJoin('par_regions as t14','t8.region_id','t14.id')
           ->leftJoin('tra_approval_recommendations as t15','t1.application_code','t15.application_code')
           ->leftJoin('par_premise_types as t16','t1b.premise_type_id','t16.id')
           ->LeftJoin('par_approval_decisions as t17','t15.decision_id','t17.id')
           ->LeftJoin('par_approval_decisions as t20','t15.decision_id','t20.id')
           ->LeftJoin('users as t21','t15.approved_by','t21.id')
           ->LeftJoin('users as t22','t15.dg_signatory','t22.id')
           ->LeftJoin('users as t23','t15.permit_signatory','t23.id')


          ->select('t1.application_code','t1.module_id','t1.section_id','t1.sub_module_id','t1.reference_no','t1.tracking_no','t1b.name as premise_name','t1b.email as premise_email','t1b.postal_address as premise_postal_address','t1b.physical_address as premise_physical_address','t1b.telephone as premise_tell','t1b.mobile_no as premise_mobile','t1b.contact_person_startdate','t1b.contact_person_enddate','t1b.gps_coordinate','t2.name as premise_country','t3.name as premise_region','t4.name as premise_district','t5.name as business_type','t7.name as premise_category','t6.name as business_scale','t8.name as applicant','t8.postal_address as applicant_postal_address','t8.physical_address as applicant_physical_address','t8.email_address as applicant_email','t8.telephone_no as applicant_tell','t8.mobile_no as applicant_mobile','t9.name as contact_person','t9.telephone_no as contact_person_tell','t9.email_address as contact_email','t11.name as business_type_detail','t12.name as zone','t13.name as applicant_country','t14.name as applicant_region','t15.expiry_date','t15.certificate_issue_date','t16.name as premise_type','t1.date_added','t15.id as recommendation_id','t15.certificate_no','t15.permit_no','t15.approval_date as approved_on',DB::raw('CONCAT(decrypt(t21.first_name),decrypt(t21.last_name)) as approved_by,CONCAT(decrypt(t22.first_name),decrypt(t22.last_name)) as dg_signatory, CONCAT(decrypt(t23.first_name),decrypt(t23.last_name)) as permit_signatory'),'t17.name as approval_decision')
          ->where('t1.id',$record_id)
          ->get();

    $premise_business_details = DB::table('tra_premises_otherdetails as t1')
           ->LeftJoin('par_business_types as t2','t1.business_type_id','t2.id')
           ->LeftJoin('par_business_type_details as t3','t1.business_type_detail_id','t3.id')
           ->select('t2.name as business_type','t3.name as business_type_details',DB::raw($application_code.' as application_code'))
           ->where('t1.premise_id',$premise_id)
           ->get();

    $premise_personnel_details = DB::table('tra_premises_personnel as t1')
           ->LeftJoin('tra_personnel_information as t2','t1.personnel_id','t2.id')
           ->LeftJoin('par_personnel_qualifications as t3','t1.qualification_id','t3.id')
           ->LeftJoin('par_personnel_studyfield as t4','t1.study_field_id','t4.id')

          ->select('t1.start_date','t1.end_date','t2.name as personnel_name','t3.name as personnel_qualifications','t4.name as study_field',DB::raw($application_code.' as application_code'))
          ->where('t1.premise_id',$premise_id)
          ->get();

    //application

    $application_data_array = convertStdClassObjToArray($application_data);
    DB::table('appr_application_details')->insert($application_data_array);
    //ingridients
    $premise_business_details_array = convertStdClassObjToArray($premise_business_details);
    DB::table('appr_premises_otherdetails')->insert($premise_business_details_array);
     //product_packaging
    $premise_personnel_details_array = convertStdClassObjToArray($premise_personnel_details);
    DB::table('appr_premises_personnel')->insert($premise_personnel_details_array);

  }

//gmp logs
  public function logGMPApplicationDetails($record_id)
  {
    $defaults = DB::table('tra_gmp_applications as t1')
                ->join('tra_manufacturing_sites as t2','t1.manufacturing_site_id','t2.id')
                ->select('t1.manufacturing_site_id','t1.application_code','t2.premise_id')
                ->where('t1.id',$record_id)
                ->first();

      $application_code = $defaults->application_code;
      $manufacturing_site_id = $defaults->manufacturing_site_id;
      $premise_id = $defaults->premise_id;

    $gmp_application = DB::table('tra_gmp_applications as t1')
               ->LeftJoin('par_gmp_assessment_types as t2','t1.assessment_type_id','t2.id')
               ->LeftJoin('tra_manufacturing_sites as t3','t1.manufacturing_site_id','t3.id')
               ->LeftJoin('tra_manufacturers_information as t4','t3.manufacturer_id','t4.id')
               ->LeftJoin('par_countries as t5','t3.country_id','t5.id')
               ->LeftJoin('par_regions as t6','t3.region_id','t6.id')
               ->LeftJoin('par_districts as t7','t3.district_id','t7.id')
               ->LeftJoin('par_business_types as t8','t3.business_type_id','t8.id')
               ->LeftJoin('par_zones as t9','t1.zone_id','t9.id')
               ->LeftJoin('wb_trader_account as t10','t3.applicant_id','t10.id')
               ->LeftJoin('wb_trader_account as t11','t3.ltr_id','t11.id')
               ->LeftJoin('tra_manufacturing_sites_personnel as t12','t3.contact_person_id','t12.id')
               ->LeftJoin('par_facility_location as t13','t1.gmp_type_id','t13.id')
               ->LeftJoin('par_countries as t14','t10.country_id','t14.id')
               ->LeftJoin('par_regions as t15','t10.region_id','t15.id')
               ->LeftJoin('par_countries as t16','t11.country_id','t16.id')
               ->LeftJoin('par_regions as t17','t11.region_id','t17.id')
               ->LeftJoin('tra_approval_recommendations as t18','t1.application_code','t18.application_code')
               ->LeftJoin('par_device_types as t19','t1.device_type_id','t18.id')
               ->LeftJoin('par_business_type_details as t20','t8.id','t20.business_type_id')
               ->LeftJoin('par_approval_decisions as t21','t18.decision_id','t21.id')
               ->LeftJoin('users as t24','t18.approved_by','t24.id')
               ->LeftJoin('users as t22','t18.dg_signatory','t22.id')
               ->LeftJoin('users as t23','t18.permit_signatory','t23.id')


            ->select('t1.reference_no','t1.module_id','t1.section_id','t1.sub_module_id','t1.application_code','t1.tracking_no','t2.name as assessment_procedure','t3.name as manufacturing_site','t3.gps_coordinate','t3.premise_reg_no','t4.name as manufacturer_name','t4.postal_address as man_postal_address','t4.physical_address as man_physical_address','t4.email_address as man_email_address','t4.mobile_no as man_mobile_no','t4.telephone_no as man_telephone_no','t5.name as man_country','t6.name as man_region','t7.name as man_district','t8.name as business_type','t20.name as business_type_details','t9.name as zone','t10.name as applicant','t10.physical_address as applicant_physical_address','t10.postal_address as applicant_postal_address','t10.telephone_no as applicant_tell','t10.mobile_no as applicant_mobile','t10.email_address as applicant_email','t14.name as applicant_country','t15.name as applicant_region','t11.name as local_agent','t11.postal_address as local_agent_postal_address','t11.physical_address as local_agent_physical_address','t11.telephone_no as local_agent_tell','t11.mobile_no as local_agent_mobile','t11.email_address as local_agent_email','t16.name as local_agent_country','t17.name as local_agent_region','t12.name as contact_person','t12.postal_address as contact_person_postal_address','t12.telephone as contact_person_tell','t13.name as facility_location','t18.expiry_date','t18.certificate_issue_date','t19.name as device_type','t18.id as recommendation_id','t18.certificate_no','t18.permit_no','t18.approval_date as approved_on',DB::raw('CONCAT(decrypt(t24.first_name),decrypt(t24.last_name)) as approved_by,CONCAT(decrypt(t22.first_name),decrypt(t22.last_name)) as dg_signatory, CONCAT(decrypt(t23.first_name),decrypt(t23.last_name)) as permit_signatory'),'t21.name as approval_decision')

            ->where('t1.id',$record_id)
            ->get();

  $business_details = DB::table('tra_manufacturing_sites as t1')
            ->leftJoin('par_business_type_details as t2','t1.business_type_id','t2.business_type_id')
            ->leftJoin('par_business_types as t3','t1.business_type_id','t3.id')
            ->select('t3.name as business_type','t2.name as business_type_details',DB::raw($application_code.' as application_code'))
            ->where('t1.premise_id',$premise_id)
            ->get();

  $business_block = DB::table('tra_manufacturingsite_blocks as t1')
          ->select('t1.name as block_name','t1.activities as block_activities',DB::raw($application_code.' as application_code'))
          ->where('t1.manufacturing_site_id',$manufacturing_site_id)
          ->get();

  $product_line_details = DB::table('gmp_productline_details as t1')
           ->LeftJoin('gmp_product_lines as t2','t1.product_line_id','t2.id')
           ->LeftJoin('gmp_product_categories as t3','t1.category_id','t3.id')
           ->LeftJoin('gmp_product_descriptions as t4','t1.prodline_description_id','t4.id')
           ->LeftJoin('tra_manufacturing_sites_blocks as t5','t1.manufacturingsite_block_id','t5.id')
          ->select('t2.name as product_line','t3.name as category','t4.name as product_line_description','t5.name as man_site_block',DB::raw($application_code.' as application_code'))
          ->where('t1.manufacturing_site_id',$manufacturing_site_id)
          ->get();

  $product_applied = DB::table('tra_product_gmpinspectiondetails as t1')
           ->LeftJoin('tra_product_information as t2','t1.product_id','t2.id')
           ->LeftJoin('par_common_names as t3','t2.common_name_id','t3.id')
           ->LeftJoin('par_classifications as t4','t2.classification_id','t4.id')
           ->LeftJoin('tra_product_applications as t5','t2.id','t5.product_id')
           ->leftJoin('wb_trader_account as t6','t5.applicant_id','t6.id')
           ->leftJoin('gmp_product_lines as t7','t1.gmp_productline_id','t7.id')

          ->select('t2.brand_name','t3.name as common_name','t4.name as classification','t5.reference_no','t6.name as applicant','t6.postal_address','t6.telephone_no','t7.name as product_line',DB::raw($application_code.' as application_code'))
          ->where('t1.manufacturing_site_id',$manufacturing_site_id)
          ->get();

   //application
    $application_data_array = convertStdClassObjToArray($gmp_application);
    DB::table('appr_application_details')->insert($application_data_array);
    //bsn details
    $business_details_array = convertStdClassObjToArray($business_details);
    DB::table('appr_product_manufacturers')->insert($business_details_array);
     //bsn block
    $business_block_array = convertStdClassObjToArray($business_block);
    DB::table('appr_manufacturingsite_blocks')->insert($business_block_array);
      //product_line_details
    $product_line_details_array = convertStdClassObjToArray($product_line_details);
    DB::table('appr_gmp_productline_details')->insert($product_line_details_array);
      //product_applied
    $product_applied_array = convertStdClassObjToArray($product_applied);
    DB::table('appr_gmpinspection_details')->insert($product_applied_array);

  }
   public function logImportExportApplications($record_id){

        $defaults = DB::table('tra_importexport_applications')->select('application_code')->where('id',$record_id)->first();
        
          $application_code = $defaults->application_code;
          //$premise_id = $defaults->premise_id;
           $application_data = DB::table('tra_importexport_applications as t1')
           ->LeftJoin('sub_modules as t2','t1.sub_module_id','t2.id')
           ->LeftJoin('par_permit_category as t3','t1.permit_category_id','t3.id')
           ->LeftJoin('par_permit_typecategories as t4','t1.import_typecategory_id','t4.id')
           ->LeftJoin('par_permit_reasons as t5','t1.permit_reason_id','t5.id')
           ->LeftJoin('par_ports_information as t6','t1.port_id','t6.id')
           ->LeftJoin('par_currencies as t7','t1.paying_currency_id','t7.id')
           ->LeftJoin('par_consignee_options as t8','t1.consignee_options_id','t8.id')
           ->LeftJoin('tra_consignee_data as t9','t1.consignee_id','t9.id')
           ->LeftJoin('tra_permitsenderreceiver_data as t10','t1.sender_receiver_id','t10.id')
           ->LeftJoin('tra_premises as t11','t1.premise_id','t11.id')
           ->LeftJoin('par_zones as t12','t1.zone_id','t12.id')
           ->LeftJoin('par_countries as t13','t10.country_id','t13.id')
           ->LeftJoin('par_regions as t14','t10.region_id','t14.id')
           ->LeftJoin('par_countries as t15','t9.country_id','t15.id')
           ->LeftJoin('par_regions as t16','t9.region_id','t16.id')
           ->LeftJoin('tra_approval_recommendations as t17','t1.application_code','t17.application_code')
           ->leftJoin('wb_trader_account as t18','t1.applicant_id','t18.id')
           ->leftJoin('par_countries as t19','t18.country_id','t19.id')
           ->leftJoin('par_regions as t20','t18.region_id','t20.id')
           ->LeftJoin('par_approval_decisions as t21','t17.decision_id','t21.id')
           ->LeftJoin('users as t24','t17.approved_by','t24.id')
           ->LeftJoin('users as t22','t17.dg_signatory','t22.id')
           ->LeftJoin('users as t23','t17.permit_signatory','t23.id')



          ->select('t1.proforma_invoice_no','t1.module_id','t1.sub_module_id','t1.reference_no','t1.tracking_no','t1.application_code','t1.proforma_invoice_date','t2.name as importexport_type','t3.name as permit_category','t4.name as permit_type_category','t5.name as permit_reason','t6.name as port','t7.name as currency','t8.name as consignee_option','t9.name as consignee','t9.postal_address as consignee_postal_address','t9.physical_address as consignee_physical_address','t9.telephone_no as consignee_telephone_no','t9.mobile_no as consignee_mobile_no','t9.email_address as consignee_email_address','t15.name as consignee_country','t16.name as consignee_region','t10.name as senderreceiver','t10.physical_address as senderreceiver_physical_address','t10.postal_address as senderreceiver_postal_address','t10.telephone_no as senderreceiver_telephone_no','t10.mobile_no as senderreceiver_mobile_no','t10.email as senderreceiver_email_address','t13.name as senderreceiver_country','t14.name as senderreceiver_region','t11.name as premise_name','t11.postal_address as premise_postal_address','t11.physical_address as premise_physical_address','t11.telephone as premise_tell','t11.mobile_no as premise_mobile','t12.name as zone','t17.expiry_date','t17.certificate_issue_date','t18.name as applicant','t18.postal_address as applicant_postal_address','t18.physical_address as applicant_physical_address','t18.telephone_no as applicant_tell','t18.mobile_no as applicant_mobile','t18.email_address as applicant_email','t19.name as applicant_country','t20.name as applicant_region','t1.submission_date','t17.approval_date as approved_on',DB::raw('CONCAT(decrypt(t24.first_name),decrypt(t24.last_name)) as approved_by,CONCAT(decrypt(t22.first_name),decrypt(t22.last_name)) as dg_signatory, CONCAT(decrypt(t23.first_name),decrypt(t23.last_name)) as permit_signatory'),'t21.name as approval_decision')
          ->where('t1.id',$record_id)
          ->get();

      $import_product= DB::table('tra_permits_products as t1')
           ->LeftJoin('tra_product_information as t2','t1.product_id','t2.id')
           ->LeftJoin('par_packaging_units as t3','t1.packaging_unit_id','t3.id')
           ->LeftJoin('par_weights_units as t4','t1.weights_units_id','t4.id')
           ->LeftJoin('par_currencies as t5','t1.currency_id','t5.id')
           ->LeftJoin('par_device_types as t6','t1.device_type_id','t6.id')

          ->select(DB::raw('t1.quantity*t1.unit_price as total_value,t1.quantity,t1.total_weight,t1.unit_price,t2.brand_name,t3.name as packaging_unit,t4.name as weights_units,t5.name as currency,t6.name as device_type, t1.application_code'))
          ->where('t1.application_code',$application_code)
          ->get();

      $import_poe = DB::table('tra_poe_applications as t1')
                     ->leftJoin('par_clearing_agents as t2','t1.clearing_agent_id','t2.id')
                     ->leftJoin('par_ports_information as t3','t1.port_id','t3.id')
                     ->leftJoin('users as t4','t1.inspected_by','t4.id')
                     ->leftJoin('par_ports_information as t5','t1.icd_port_id','t5.id')
                     ->leftJoin('users as t6','t1.recommendation_by','t6.id')
                     ->select('t1.tra_reg_number','t1.tansad_no','t1.inspected_on','t1.tra_reg_date','t2.name as clearing_agent','t3.name as port','t5.name as icd_port','t1.date_received','t1.remarks',DB::raw('decrypt(t4.username) as inspected_by, decrypt(t6.username) as recommendation_by, t1.application_code'))
                     ->where('t1.application_code',$application_code)
                     ->get();
      //application
    $application_data_array = convertStdClassObjToArray($application_data);
    DB::table('appr_application_details')->insert($application_data_array);
    //bsn details
    $import_product_array = convertStdClassObjToArray($import_product);
    DB::table('appr_permits_products')->insert($import_product_array);
     //bsn block
    $import_poe_array = convertStdClassObjToArray($import_poe);
    DB::table('appr_poe_applications')->insert($import_poe_array);

    }
    public function logClinicalTrialApplication($record_id){
      $defaults = DB::table('tra_importexport_applications')->select('application_code')->where('id',$record_id)->first();
        
          $application_code = $defaults->application_code;

      $application_data =DB::table('tra_clinical_trial_applications as t1')
           ->LeftJoin('clinical_trial_duration_desc as t2','t1.duration_desc','t2.id')
           ->LeftJoin('clinical_trial_personnel as t3','t1.sponsor_id','t3.id')
           ->LeftJoin('clinical_trial_personnel as t4','t1.investigator_id','t4.id')
           ->leftJoin('tra_application_invoices as t5','t1.application_code','t5.application_code')
           ->LeftJoin('par_currencies as t6','t5.paying_currency_id','t6.id')
           ->LeftJoin('par_zones as t7', 't1.zone_id','t7.id')
           ->LeftJoin('par_countries as t8','t3.country_id','t8.id')
           ->LeftJoin('par_regions as t9','t3.region_id','t9.id')
           ->LeftJoin('par_countries as t10','t4.country_id','t10.id')
           ->LeftJoin('par_regions as t11','t4.region_id','t11.id')
           ->LeftJoin('tra_approval_recommendations as t12','t1.application_code','t12.application_code')
           ->LeftJoin('par_approval_decisions as t13','t12.decision_id','t13.id')
            ->LeftJoin('users as t24','12.approved_by','t24.id')
           ->LeftJoin('users as t22','12.dg_signatory','t22.id')
           ->LeftJoin('users as t23','12.permit_signatory','t23.id')

           ->select('t1.study_title','t1.application_code','t1.module_id','t1.section_id','t1.sub_module_id','t1.reference_no','t1.tracking_no','t1.id','t1.protocol_no','t1.version_no','t1.study_start_date','t1.study_end_date','t1.date_of_protocol','t1.study_duration','t1.clearance_no','t2.name as duration_desc','t3.name as sponsor','t3.postal_address as sponsor_postal_address','t3.physical_address as sponsor_physical_address','t3.mobile_no as sponsor_mobile_no','t3.telephone as sponsor_telephone_no','t3.email as sponsor_email_address','t8.name as sponsor_country','t9.name as sponsor_region','t4.name as investigator','t4.postal_address as investigator_postal_address','t4.physical_address as investigator_physical_address','t4.mobile_no as investigator_mobile_no','t4.telephone as investigator_telephone','t4.email as investigator_email_address','t10.name as investigator_country','t11.name as investigator_region','t6.name as currency','t7.name as CertIssuePlace','t12.certificate_issue_date','t12.expiry_date',DB::raw('CONCAT(decrypt(t24.first_name),decrypt(t24.last_name)) as approved_by,CONCAT(decrypt(t22.first_name),decrypt(t22.last_name)) as dg_signatory, CONCAT(decrypt(t23.first_name),decrypt(t23.last_name)) as permit_signatory'),'t13.name as approval_decision')
           ->where('t1.id',$record_id)
           ->get();

       $study_Sites =DB::table('clinical_trial_sites as t1')
           ->leftJoin('study_sites as t2','t1.study_site_id','t2.id')
           ->leftJoin('par_countries as t3','t2.country_id','t3.id')
           ->leftJoin('par_regions as t4','t2.region_id','t4.id')

           ->select('t1.application_id','t2.name as site','t2.postal_address','t2.physical_address','t2.telephone','t3.name as country','t4.name as region')
           ->where('t1.application_id', $record_id)
           ->get();

       $investigator_info = DB::table('clinical_trial_investigators as t1')
           ->leftJoin('study_sites as t2','t1.study_site_id','t2.id')
           ->leftJoin('clinical_trial_personnel as t3','t1.investigator_id','t3.id')
           ->leftJoin('clinical_investigator_cat as t4','t1.category_id','t4.id')
           ->leftJoin('par_countries as t5','t3.country_id','t5.id')
           ->leftJoin('par_regions as t6','t3.region_id','t6.id')

           ->select('t1.application_id','t2.name as site','t3.name as investigator','t3.postal_address','t3.physical_address','t3.telephone','t4.category_name as category','t5.name as country','t6.name as region')
           ->where('t1.application_id',$record_id)
           ->get();
          
       $Import_products_info = DB::table('clinical_trial_products as t1')
           ->leftJoin('par_clinical_product_categories as t2','t1.product_category_id','t2.id')
           ->leftJoin('par_common_names as t3','t1.common_name_id','t3.id')
           ->leftJoin('par_dosage_forms as t4','t1.dosage_form_id','t4.id')
           ->leftJoin('par_route_of_administration as t5','t1.routes_of_admin_id','t5.id')
           ->leftJoin('par_si_units as t6','t1.si_unit_id','t6.id')

           ->select('t1.application_id','t1.brand_name','t1.product_strength','t1.registration_no','t1.identification_mark','t1.product_desc','t1.gmdn_term','t1.estimated_quantity','t1.product_strength','t2.category_name','t3.name as generic_name','t4.name as dosage_form','t5.name as adminRoute','t6.name as Units')
           ->where('t1.application_id',$record_id)
           ->get();

   //application
    $application_data_array = convertStdClassObjToArray($application_data);
    DB::table('appr_application_details')->insert($application_data_array);
    //bsn details
    $study_Sites_array = convertStdClassObjToArray($study_Sites);
    DB::table('appr_clinical_trial_investigators')->insert($study_Sites_array);
     //bsn block
    $Import_products_info_array = convertStdClassObjToArray($Import_products_info);
    DB::table('appr_clinical_trial_investigators')->insert($Import_products_info_array);

    }
    public function logProductNotificationApplication($record_id)
    {
       $application_data=DB::table('tra_product_notifications as t1')
           ->LeftJoin('tra_product_information as t2','t1.reg_product_id','t2.id')
           ->LeftJoin('par_device_types as t3','t2.device_type_id','t3.id')
           ->LeftJoin('par_classifications as t4','t2.classification_id','t4.id')
           ->leftJoin('par_common_names as t5','t2.common_name_id','t5.id')
           ->LeftJoin('par_intendedend_use as t6','t2.intended_use_id','t6.id')
           ->LeftJoin('par_intended_enduser as t7', 't2.intended_enduser_id','t7.id')
           ->LeftJoin('wb_trader_account as t8','t1.applicant_id','t8.id')
           ->LeftJoin('par_regions as t9','t8.region_id','t9.id')
           ->LeftJoin('par_countries as t10','t8.country_id','t10.id')
           ->LeftJoin('wb_trader_account as t11','t1.local_agent_id','t11.id')
           ->LeftJoin('par_regions as t12','t11.region_id','t12.id')
           ->LeftJoin('par_countries as t13','t11.country_id','t13.id')
           ->LeftJoin('tra_product_manufacturers as t14','t2.id','t14.product_id')
           ->leftJoin('par_man_sites as t15','t14.man_site_id','t15.id')
           ->LeftJoin('par_regions as t16','t15.region_id','t16.id')
           ->LeftJoin('par_countries as t17','t15.country_id','t17.id')
           ->LeftJoin('par_zones as t18','t1.zone_id','t18.id')
           ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
           ->LeftJoin('par_approval_decisions as t20','t19.decision_id','t20.id')
            ->LeftJoin('users as t24','t19.approved_by','t24.id')
           ->LeftJoin('users as t22','t19.dg_signatory','t22.id')
           ->LeftJoin('users as t23','t19.permit_signatory','t23.id')



           ->select('t2.brand_name','t1.application_code','t1.module_id','t1.section_id','t1.sub_module_id','t1.reference_no','t1.tracking_no','t2.gmdn_code','t2.gmdn_term','t2.gmdn_category','t2.manufacturing_date','t2.shelf_life','t2.shelf_lifeafter_opening','t2.physical_description','t3.name as device_type','t4.name as classification','t5.name as common_name','t6.name as intended_use','t7.name as intended_user','t8.name as applicant','t8.postal_address as applicant_postal_address','t8.physical_address as applicant_physical_address','t8.telephone_no as applicant_tell','t8.mobile_no as applicant_mobile','t8.email_address as applicant_email','t9.name as applicant_region','t10.name as applicant_country','t11.name as local_agent','t11.postal_address as local_agent_postal_address','t11.physical_address as local_agent_physical_address','t11.telephone_no as local_agent_tell','t11.mobile_no as local_agent_mobile','t11.email_address as local_agent_email','t12.name as local_agent_region','t13.name as local_agent_country','t15.name as manufacturing_site','t15.postal_address as man_postal_address','t15.physical_address as man_physical_address','t15.telephone_no as man_telephone_no','t15.mobile_no as man_mobile_no','t15.email_address as man_email_address','t16.name as man_region','t17.name as man_country','t18.name as zone','t19.certificate_issue_date','t19.expiry_date',DB::raw('CONCAT(decrypt(t24.first_name),decrypt(t24.last_name)) as approved_by,CONCAT(decrypt(t22.first_name),decrypt(t22.last_name)) as dg_signatory, CONCAT(decrypt(t23.first_name),decrypt(t23.last_name)) as permit_signatory'),'t20.name as approval_decision')

            ->groupBy('t1.application_code')
            ->where('t1.id',$record_id)
            ->get();

    //application
    $application_data_array = convertStdClassObjToArray($application_data);
    DB::table('appr_application_details')->insert($application_data_array);
    }

    public function logDisposalApplication($record_id)
    {
      $defaults = DB::table('tra_disposal_applications')->select('application_code')->where('id',$record_id)->first();
        
          $application_code = $defaults->application_code;

       $application_data = DB::table('tra_disposal_applications as t1')
                ->LeftJoin('tra_destruction_exercisesites as t2','t1.application_code','t2.application_code')
                ->LeftJoin('par_disposaldestruction_sites as t3','t2.destruction_site_id','t3.id')
                ->LeftJoin('tra_methodsof_destructions as t4','t1.application_code','t4.application_code')
                 ->LeftJoin('par_destruction_methods as t5','t4.destructionmethod_id','t5.id')
                 ->LeftJoin('par_packaging_units as t6','t1.packaging_unit_id','t6.id')
                 ->LeftJoin('par_weights_units as t7','t1.weights_units_id','t7.id')
                 ->LeftJoin('par_currencies as t8','t1.currency_id','t8.id')
                 ->LeftJoin('tra_premises as t9','t1.premises_id','t9.id')
                 ->LeftJoin('tra_disposal_inspectors as t10','t2.application_code','t10.application_code')
                 ->LeftJoin('par_disposal_inspectors_titles as t11','t10.inspectors_title_id','t11.id')
                 ->LeftJoin('par_organisations as t12','t10.organisation_id','t12.id')
                 ->LeftJoin('wb_trader_account as t13','t1.trader_id','t13.id')
                 ->LeftJoin('par_countries as t14','t9.country_id','t14.id')
                 ->LeftJoin('par_countries as t15','t13.country_id','t15.id')
                 ->LeftJoin('par_regions as t16','t13.region_id','t16.id')
                 ->LeftJoin('par_zones as t17','t1.zone_id','t17.id')
                 ->LeftJoin('par_sections as t18','t1.section_id','t18.id')
                 ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
                 ->LeftJoin('par_approval_decisions as t20','t19.decision_id','t20.id')
                  ->LeftJoin('users as t24','t19.approved_by','t24.id')
                 ->LeftJoin('users as t22','t19.dg_signatory','t22.id')
                 ->LeftJoin('users as t23','t19.permit_signatory','t23.id')
                
                 
                  ->select('t1.module_id','t1.section_id','t1.sub_module_id','t1.application_code','t1.reference_no','t1.tracking_no','t1.reason_for_disposal','t1.quantity as disposal_quantity','t1.total_weight','t1.market_value','t3.name as destruction_site', 't5.name as destruction_method','t6.name as packaging_unit','t7.name as weight_unit','t8.name as currency','t9.name as premise_name','t9.premise_reg_no','t9.email as premise_email','t9.telephone as premise_tell','t9.physical_address as premise_physical_address','t9.postal_address as premise_postal_address','t10.inspector_name as inspector_name','t11.name as inpsector_title','t12.name as inpsector_organisation','t13.name as applicant','t13.postal_address as applicant_postal_address','t13.physical_address as applicant_physical_address','t13.email_address as applicant_email','t13.telephone_no as applicant_tell','t13.mobile_no as applicant_mobile','t14.name as premise_country','t15.name as applicant_country','t16.name as applicant_region','t17.name as zone','t18.name as product_type','t19.certificate_issue_date','t19.expiry_date',DB::raw('CONCAT(decrypt(t24.first_name),decrypt(t24.last_name)) as approved_by,CONCAT(decrypt(t22.first_name),decrypt(t22.last_name)) as dg_signatory, CONCAT(decrypt(t23.first_name),decrypt(t23.last_name)) as permit_signatory'),'t20.name as approval_decision')

                    ->groupBy('t1.application_code')
                    ->where('t1.id',$record_id)
                    ->get();

      $disposal_products = DB::table('tra_disposal_products as t1')
                ->LeftJoin('tra_product_information as t2','t1.product_id','t2.id')
                ->LeftJoin('par_packaging_units as t3','t1.packaging_unit_id','t3.id')
                ->LeftJoin('par_currencies as t4','t1.currency_id','t4.id')
                
                 
                  ->select('t1.application_code','t1.product_description','t1.estimated_value', 't2.brand_name','t1.quantity','t3.name as packaging_unit','t4.name as currency')
                ->where('t1.application_code',$application_code)
                ->get();
      //application
    $application_data_array = convertStdClassObjToArray($application_data);
    DB::table('appr_application_details')->insert($application_data_array);
    //bsn details
    $disposal_products_array = convertStdClassObjToArray($disposal_products);
    DB::table('appr_disposal_products')->insert($disposal_products_array);
                   
    }
    public function logPromotionAndAdvertisementApplication($record_id)
    {
      $defaults = DB::table('tra_promotion_adverts_applications')->select('application_code')->where('id',$record_id)->first();
        
          $application_code = $defaults->application_code;

       $application_data=DB::table('tra_promotion_adverts_applications as t1')
           ->LeftJoin('par_classifications as t2','t1.classification_id','t2.id')
           ->LeftJoin('par_product_types as t3','t1.product_type_id','t3.id')
           ->LeftJoin('wb_trader_account as t4','t1.applicant_id','t4.id')
           ->LeftJoin('par_regions as t5','t4.region_id','t5.id')
           ->LeftJoin('par_countries as t6','t4.country_id','t6.id')
           ->leftJoin('tra_promotionaladvert_personnel as t7','t1.sponsor_id','t7.id')
           ->LeftJoin('par_regions as t8','t7.region_id','t8.id')
           ->LeftJoin('par_countries as t9','t7.country_id','t9.id')
           ->LeftJoin('par_zones as t10','t1.zone_id','t10.id')
           ->LeftJoin('tra_approval_recommendations as t11','t1.application_code','t11.application_code')
           ->LeftJoin('par_approval_decisions as t12','t11.decision_id','t12.id')
                 ->LeftJoin('users as t24','t11.approved_by','t24.id')
                 ->LeftJoin('users as t22','t11.dg_signatory','t22.id')
                 ->LeftJoin('users as t23','t11.permit_signatory','t23.id')

           ->select('t1.application_code','t2.name as classification','t1.reference_no','t1.tracking_no','t3.name as product_type','t4.name as applicant','t4.postal_address as applicant_postal_address','t4.physical_address as applicant_physical_address','t4.telephone_no as applicant_tell','t4.mobile_no as applicant_mobile','t4.email_address as applicant_email','t5.name as applicant_region','t6.name as applicant_country','t7.name as sponsor','t7.postal_address as sponsor_postal_address','t7.physical_address as sponsor_physical_address','t7.telephone_no as sponsor_telephone_no','t7.mobile_no as sponsor_mobile_no','t7.email as sponsor_email_address','t8.name as sponsor_region','t9.name as sponsor_country','t10.name as zone','t11.certificate_issue_date','t11.expiry_date',DB::raw('CONCAT(decrypt(t24.first_name),decrypt(t24.last_name)) as approved_by,CONCAT(decrypt(t22.first_name),decrypt(t22.last_name)) as dg_signatory, CONCAT(decrypt(t23.first_name),decrypt(t23.last_name)) as permit_signatory'),'t12.name as approval_decision')

            ->groupBy('t1.application_code')
            ->where('t1.id',$record_id)
            ->get();

       $product_particulars = DB::table('tra_promotion_prod_particulars as t1')
            ->LeftJoin('par_product_categories as t3','t1.product_category_id','=','t3.id')
            ->LeftJoin('par_subproduct_categories as t4','t1.product_subcategory_id','=','t4.id')
            ->LeftJoin('par_advertisement_types as t5','t1.type_of_advertisement_id','=','t5.id')
            ->select('t1.brand_name','t1.common_name','t1.other_details','t1.registrant_name','t3.name as product_category','t4.name as product_subcategory','t5.name as type_of_advertisement',DB::raw($application_code.' as application_code'))

            ->where('t1.application_id',$record_id)//confirm this
            ->get();
       $promotion_materials = DB::table('tra_promotion_materials_details as t1')
            ->LeftJoin('par_promotion_material_items as t2','t1.material_id','=','t2.id')
            ->select('t1.remarks','t2.name as material',DB::raw($application_code.' as application_code'))
            ->where('t1.application_id',$record_id)
            ->get();

      //application
    $application_data_array = convertStdClassObjToArray($application_data);
    DB::table('appr_application_details')->insert($application_data_array);
    //bsn details
    $product_particulars_array = convertStdClassObjToArray($product_particulars);
    DB::table('appr_promotion_prod_particulars')->insert($product_particulars_array);
     //bsn block
    $promotion_materials_array = convertStdClassObjToArray($promotion_materials);
    DB::table('appr_promotion_materials_details')->insert($promotion_materials_array);
    }
    public function logSurvellianceApplication($record_id){

    }
}