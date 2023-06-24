<?php

namespace Modules\OpenOffice\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Concerns\FromCollection;
use App\Exports\GridExport;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Excel;

class OpenOfficeController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    //to be migrate to the front office controller
  public function test()
  {
     \App::call('Modules\AuditReport\Http\Controllers\AuditReportController@logPromotionAndAdvertisementApplication',[4]);
    
  }
        public function getProductsApplicationColumns(request $request){
        try{
            $is_product_registered = false;
              $qry = DB::table('tra_product_applications as t1')
                ->LeftJoin('tra_product_information as t2','t1.product_id','t2.id')
                ->LeftJoin('par_classifications as t3','t2.classification_id','t3.id')
                ->LeftJoin('par_common_names as t4','t2.common_name_id','t4.id')
                 ->LeftJoin('par_product_categories as t5','t2.product_category_id','t5.id')
                 ->LeftJoin('par_subproduct_categories as t6','t2.product_subcategory_id','t6.id')
                 ->LeftJoin('par_productspecial_categories as t7','t2.special_category_id','t7.id')
                 ->LeftJoin('par_storage_conditions as t8','t2.storage_condition_id','t8.id')
                 ->LeftJoin('par_dosage_forms as t9','t2.dosage_form_id','t9.id')
                 ->LeftJoin('par_intended_enduser as t10','t2.intended_enduser_id','t10.id')
                 ->LeftJoin('par_zones as t11','t1.zone_id','t11.id')
                 ->LeftJoin('par_product_origins as t12','t2.product_origin_id','t12.id')
                 ->LeftJoin('wb_trader_account as t13','t1.applicant_id','t13.id')
                 ->LeftJoin('wb_trader_account as t14','t1.local_agent_id','t14.id')
                 ->LeftJoin('par_countries as t15','t13.country_id','t15.id')
                 ->LeftJoin('par_regions as t16','t13.region_id','t16.id')
                 ->LeftJoin('par_countries as t17','t14.country_id','t17.id')
                 ->LeftJoin('par_regions as t18','t14.region_id','t18.id')
                 ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
                 ->LeftJoin('par_approval_decisions as t20','t19.decision_id','t20.id')
                 ->LeftJoin('par_registration_statuses as t23','t19.appregistration_status_id','t23.id')
                 ->LeftJoin('par_validity_statuses as t24','t19.appvalidity_status_id','t24.id')
                 ->LeftJoin('par_system_statuses as t25','t1.application_status_id','t25.id')
                 ->LeftJoin('tra_product_manufacturers as t26', function ($join) {
                    $join->on('t1.product_id', '=', 't26.product_id')
                        ->where('t26.manufacturer_type_id', 1);
                  })
                 ->LeftJoin('tra_manufacturers_information as t27','t26.manufacturer_id','t27.id')
                 ->LeftJoin('par_countries as t28','t27.country_id','t28.id')
                 ->LeftJoin('par_regions as t29','t27.region_id','t29.id')
                 ->LeftJoin('par_assessment_procedures as t30','t1.assessment_procedure_id','t30.id')
                  ->LeftJoin('par_atc_codes as t31','t4.atc_code_id','t31.id')
                  ->LeftJoin('tra_product_retentions as t32','t1.application_code','t32.application_code')
                 ->LeftJoin('par_retention_statuses as t33','t32.retention_status_id','t33.id')

                  ->select(DB::raw("t1.application_code,t1.product_id,t1.reference_no,t1.tracking_no,t1.submission_date,t1.submission_date as ReceivedFrom,t1.submission_date as ReceivedTo,t1.section_id,t2.brand_name, t2.warnings,t2.shelf_life,t2.shelf_lifeafter_opening,t2.instructions_of_use,t2.physical_description, t3.name as Classification, t4.name as commonName,t5.name as Category,t6.name as SubCategory,t7.name as SpecialCategory,t8.name as StorageCondition,t9.name as ProductForm,t10.name as IntendedUsers,t2.shelflifeduration_desc,t11.name as issueplace,t12.name as ProductType,t13.name as Applicant,t13.postal_address as ApplicantPostalA,t13.physical_address as ApplicantPhysicalA,t13.email_address as ApplicantEmail,t13.telephone_no as ApplicantTell,t13.mobile_no as ApplicantMobile,t14.name as LocalAgent,t14.postal_address as LocalAgentPostalA,t14.physical_address as LocalAgentPhysicalA,t14.email_address as 
                    LocalAgentEmail,t14.telephone_no as LocalAgentTell,t14.mobile_no as AgentMobile,t15.name as ApplicantCountry,t16.name as ApplicantRegion,t17.name as AgentCountry,t18.name as AgentRegion,t19.certificate_issue_date as CertIssueDate,t19.expiry_date as CertExpiryDate,t19.certificate_issue_date as IssueFrom,t19.certificate_issue_date as IssueTo,t19.certificate_no, t23.name as registration_status, t24.name as validity_status, t25.name as application_status, t27.name as Manufacturer,t27.postal_address as ManufacturerPostalA,t27.physical_address as ManufacturerPhysicalA,t27.telephone_no as ManufacturerTell,t27.mobile_no as ManufacturerMobile,t28.name as ManufacturerCountry,t29.name as ManufacturerRegion,t27.email_address as ManufacturerEmail, t30.name as assessment_procedure, t2.product_strength,t31.name as atc_code,t31.description as atc_code_defination,t33.name as retention_status"));

                  $qry->groupBy('t1.application_code');
           // dd($qry->toSql());      
                  $filters = $request->input('filters');
                   $Classification = $request->input('Classification');
                   $Category = $request->input('Category');
                   $ProductForm = $request->input('ProductForm');
                   $ProductType = $request->input('ProductType');
                   $SpecialCategory = $request->input('SpecialCategory');
                   $SubCategory = $request->input('SubCategory');
                   $issueplace = $request->input('issueplace');
                   $decision_id=$request->input('decision');
                   $registration_status=$request->input('registration_status');
                   $validity_status=$request->input('validity_status');
                   $application_status=$request->input('application_status');
                   $assessment_procedure_id=$request->input('assessment_procedure_id');
                   $retention_status=$request->input('retention_status');


                   //filters
                   $IssueFrom = $request->input('IssueFrom');
                   $IssueTo = $request->input('IssueTo');
                   $ReceivedFrom = $request->input('ReceivedFrom');
                   $ReceivedTo = $request->input('ReceivedTo');
         

                   $limit = $request->input('limit');
                   $start = $request->input('start');
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                              
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                     $qry->where('t1.section_id',$value);


                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                       if($value == 103){
                                           $is_product_registered = true;
                                           $qry->select(DB::raw("DISTINCT t40.id as register_id,t1.application_code,t1.product_id,t1.reference_no,t1.tracking_no,t1.submission_date,t1.submission_date as ReceivedFrom,t1.submission_date as ReceivedTo,t1.section_id,t2.brand_name, t2.warnings,t2.shelf_life,t2.shelf_lifeafter_opening,t2.instructions_of_use,t2.physical_description, t3.name as Classification, t4.name as commonName,t5.name as Category,t6.name as SubCategory,t7.name as SpecialCategory,t8.name as StorageCondition,t9.name as ProductForm,t10.name as IntendedUsers,t2.shelflifeduration_desc,t11.name as issueplace,t12.name as ProductType,t13.name as Applicant,t13.postal_address as ApplicantPostalA,t13.physical_address as ApplicantPhysicalA,t13.email_address as ApplicantEmail,t13.telephone_no as ApplicantTell,t13.mobile_no as ApplicantMobile,t14.name as LocalAgent,t14.postal_address as LocalAgentPostalA,t14.physical_address as LocalAgentPhysicalA,t14.email_address as 
                    LocalAgentEmail,t14.telephone_no as LocalAgentTell,t14.mobile_no as AgentMobile,t15.name as ApplicantCountry,t16.name as ApplicantRegion,t17.name as AgentCountry,t18.name as AgentRegion,max(t19.certificate_issue_date) as CertIssueDate,t40.expiry_date as CertExpiryDate,t19.certificate_issue_date as IssueFrom,max(t19.certificate_issue_date) as IssueTo,t19.certificate_no, t23.name as registration_status, t24.name as validity_status, t25.name as application_status, t27.name as Manufacturer,t27.postal_address as ManufacturerPostalA,t27.physical_address as ManufacturerPhysicalA,t27.telephone_no as ManufacturerTell,t27.mobile_no as ManufacturerMobile,t28.name as ManufacturerCountry,t29.name as ManufacturerRegion,t27.email_address as ManufacturerEmail, t30.name as assessment_procedure, t2.product_strength,t31.name as atc_code,t31.description as atc_code_defination"));
                                           $qry->leftJoin('tra_registered_products as t40', 't40.tra_product_id','=','t1.product_id');
                    $qry->where(array('validity_status_id'=>2, 'registration_status_id'=>2));
                                                                           
                                       }
                                       else{
                                           $qry->where('t1.sub_module_id',$value);
                                       }
                                      
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value != ''){
                                    if($value==1){
                                        $value='date_added';
                                     }else if($value==3){
                                       $value='submission_date';
                                     }
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t19.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t19.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                
                                }
                                  
                            }
                    
                     }

                 if(validateIsNumeric($decision_id) && $decision_id != ''){
                      $qry->where('t19.decision_id' , $decision_id);
                     }

                if(validateIsNumeric($Classification) && $Classification != ''){
                      $qry->where('t2.classification_id' , $Classification);
                     }
                if(validateIsNumeric($Category) && $Category != ''){
                      $qry->where('t2.product_category_id' , $Category);
                     }
                if(validateIsNumeric($ProductForm) && $ProductForm != ''){
                      $qry->where('t2.product_form_id' , $ProductForm);
                     }
                if(validateIsNumeric($ProductType) && $ProductType != ''){
                      $qry->where('t2.product_type_id' , $ProductType);
                     }
                if(validateIsNumeric($SpecialCategory) && $SpecialCategory != ''){
                      $qry->where('t2.special_category_id' , $SpecialCategory);
                     }
                if(validateIsNumeric($SubCategory) && $SubCategory != ''){
                      $qry->where('t2.product_subcategory_id' , $SubCategory);
                     }
                if(validateIsNumeric($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
                if(validateIsNumeric($registration_status)){
                      $qry->where('t19.appregistration_status_id' , $registration_status);
                     }
                if(validateIsNumeric($validity_status)){
                      $qry->where('t19.appvalidity_status_id' , $validity_status);
                     }
                if(validateIsNumeric($application_status)){
                      $qry->where('t1.application_status_id' , $application_status);
                     }
                if(validateIsNumeric($assessment_procedure_id)){
                      $qry->where('t1.assessment_procedure_id' , $assessment_procedure_id);
                     }
                if(validateIsNumeric($retention_status)){
                      $qry->where('t32.retention_status_id' , $retention_status);
                     }
              



               $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';

                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'brand_name' :
                                    $whereClauses[] = "t2.brand_name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'warnings' :
                                    $whereClauses[] = "t2.warnings like '%" . ($filter->value) . "%'";
                                    break;
                                case 'shelf_life' :
                                    $whereClauses[] = "t2.shelf_life like '%" . ($filter->value) . "%'";
                                    break;
                                case 'shelf_lifeafter_opening' :
                                    $whereClauses[] = "t2.shelf_lifeafter_opening like '%" . ($filter->value) . "%'";
                                    break;
                                case 'instructions_of_use' :
                                    $whereClauses[] = "t2.instructions_of_use like '%" . ($filter->value) . "%'";
                                    break;
                                case 'physical_description' :
                                    $whereClauses[] = "t2.physical_description like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'Classification' :
                                    $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'commonName' :
                                    $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Category' :
                                    $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SubCategory' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'SpecialCategory' :
                                    $whereClauses[] = "t7.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'StorageCondition' :
                                    $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ProductForm' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'IntendedUsers' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'shelflifeduration_desc' :
                                    $whereClauses[] = "t2.shelflifeduration_desc like '%" . ($filter->value) . "%'";
                                    break;
                                case 'issueplace' :
                                    $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ProductType' :
                                    $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Applicant' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantPostalA' :
                                    $whereClauses[] = "t13.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t13.physical_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t13.email_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'ApplicantTell' :
                                    $whereClauses[] = "t13.telephone_no like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'ApplicantMobile' :
                                    $whereClauses[] = "t13.mobile_no like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantRegion' :
                                    $whereClauses[] = "t16.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'LocalAgent' :
                                    $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'LocalAgentPostalA' :
                                    $whereClauses[] = "t14.postal_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'LocalAgentPhysicalA' :
                                    $whereClauses[] = "t14.physical_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'LocalAgentEmail' :
                                    $whereClauses[] = "t14.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'LocalAgentTell' :
                                    $whereClauses[] = "t14.telephone_no like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'AgentMobile' :
                                    $whereClauses[] = "t14.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'AgentCountry' :
                                    $whereClauses[] = "t17.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'AgentRegion' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t19.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                                case 'submission_date' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d') ='" . formatDate($filter->value) . "'";
                                    break;
                                case 'certificate_no' :
                                    $whereClauses[] = "t19.certificate_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Manufacturer' :
                                    $whereClauses[] = "t27.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ManufacturerPostalA' :
                                    $whereClauses[] = "t27.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ManufacturerPhysicalA' :
                                    $whereClauses[] = "t27.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ManufacturerTell' :
                                    $whereClauses[] = "t27.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ManufacturerMobile' :
                                    $whereClauses[] = "t27.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ManufacturerCountry' :
                                    $whereClauses[] = "t28.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ManufacturerRegion' :
                                    $whereClauses[] = "t29.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ManufacturerEmail' :
                                    $whereClauses[] = "t27.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'product_strength' :
                                    $whereClauses[] = "t2.product_strength like '%" . ($filter->value) . "%'";
                                    break;
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }
              //  sub_module_id
              if ($filter_string != '') {
                   $qry->whereRAW($filter_string);
               }

              $total=$qry->get()->count();
                if($is_product_registered){
                    $qry->groupBy('t1.id');
                }
                
              if(isset($start)&&isset($limit)){
                      $results = $qry->skip($start)->take($limit)->get();
                                 }
                                 else{
                                  $results=$qry->get();
                                 }
//end if
            

                      $res = array(
                          'success' => true,
                          'results' => $results,
                          'message' => 'All is well',
                          'totalResults'=>$total
                      );

                  }catch (\Exception $exception) {
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
                    $type = $request->input('type');
                    if(isset($type)){

                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    } 

 /*public function getProductIngredients(request $request){
        try{
           $filters = $request->input('filters');
              $qry = DB::table('tra_product_ingredients as t1')
                ->LeftJoin('par_ingredients_details as t2','t1.ingredient_id','t2.id')
                ->LeftJoin('par_ingredients_types as t3','t1.ingredient_type_id','t3.id')
                ->LeftJoin('par_inclusions_reasons as t4','t1.inclusion_reason_id','t4.id')
                
                 
                  ->select('t1.proportion','t2.name as Ingredient', 't3.name as IngredientType','t4.name as InclutionReason');
              
                $filters = (array)json_decode($filters);
                if(isset($filters)){
                $qry->where($filters);
            }
             
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
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
          return \response()->json($res);
    } */
 public function getProductIngredients(request $request){
        try{
           $filters = $request->input('filters');
              $qry = DB::table('tra_product_ingredients as t1')
                ->LeftJoin('par_ingredients_details as t2','t1.ingredient_id','t2.id')
                ->LeftJoin('par_ingredients_types as t3','t1.ingredient_type_id','t3.id')
                ->LeftJoin('par_inclusions_reasons as t4','t1.inclusion_reason_id','t4.id')
                
                 
                  ->select('t1.proportion','t2.name as Ingredient', 't3.name as IngredientType','t4.name as InclutionReason');
              
                $filters = (array)json_decode($filters);
                if(isset($filters)){
                $qry->where($filters);
            }
             
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
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
          return \response()->json($res);
    } 


public function getProductNutrients(request $request){
        try{
           $filters = $request->input('filters');
              $qry = DB::table('tra_product_nutrients as t1')
                ->LeftJoin('par_nutrients_category as t2','t1.nutrients_category_id','t2.id')
                ->LeftJoin('par_nutrients as t3','t1.nutrients_id','t3.id')
                ->LeftJoin('par_si_units as t4','t1.units_id','t4.id')
                
                 
                  ->select('t1.proportion','t2.name as Category', 't3.name as Nutrients','t4.name as siUnit');
              
                $filters = (array)json_decode($filters);
                if(isset($filters)){
                $qry->where($filters);
            }
             
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
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
          return \response()->json($res);
    } 
    public function getProductPackaging(request $request){
        try{
           $filters = $request->input('filters');
              $qry = DB::table('tra_product_packaging as t1')
                ->LeftJoin('par_containers_types as t2','t1.container_type_id','t2.id')
                ->LeftJoin('par_containers as t3','t1.container_id','t3.id')
                ->LeftJoin('par_containers_materials as t4','t1.container_material_id','t4.id')
                 ->LeftJoin('par_closure_materials as t5','t1.closure_material_id','t5.id')
                 ->LeftJoin('par_seal_types as t6','t1.seal_type_id','t6.id')
                 ->LeftJoin('par_packaging_units as t7','t1.packaging_units_id','t7.id')

                  ->select('t1.retail_packaging_size','t2.name as Type', 't3.name as Container','t4.name as ContainerMaterial','t5.name as ClosureMaterial','t6.name as SealType','t7.name as PackagingUnits');
              
                $filters = (array)json_decode($filters);
                if(isset($filters)){
                $qry->where($filters);
            }
             
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
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
          return \response()->json($res);
    }
     public function getManInfo(request $request){
        try{
           $filters = $request->input('filters');
              $qry = DB::table('tra_product_manufacturers as t1')
                ->LeftJoin('tra_manufacturers_information as t2','t1.manufacturer_id','t2.id')
                ->LeftJoin('tra_manufacturing_sites as t3','t1.man_site_id','t3.id')
                ->LeftJoin('par_manufacturing_types as t4','t1.manufacturer_type_id','t4.id')
                 ->LeftJoin('par_countries as t5','t2.country_id','t5.id')
                 ->LeftJoin('par_regions as t6','t2.region_id','t6.id')

                  ->select('t2.physical_address','t2.postal_address','t2.email_address','t2.name as Manufacturer','t2.telephone_no as PhoneNo','t2.mobile_no as MobileNo', 't3.name as Site','t4.name as Role','t5.name as Country','t6.name as Region');
              
                $filters = (array)json_decode($filters);
                if(isset($filters)){
                $qry->where($filters);
            }
             
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
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
          return \response()->json($res);
    }
    public function getInspectionInfo(request $request){
        try{
           $filters = $request->input('filters');
              $qry = DB::table('tra_manufacturing_sites as t1')
                ->select('t9.id', 't11.name as gmp_product_line', 't12.name as gmp_product_category', 't5.id as reg_manufacturer_site_id', 't7.permit_no as gmp_certificate_no', 't6.reference_no as gmp_application_reference', 't8.name as registration_status', 't7.permit_no', 't1.physical_address', 't1.email as email_address', 't1.id as manufacturing_site_id','t9.product_id', 't13.reg_site_id', 't1.name as manufacturer_name', 't2.name as country_name', 't3.name as region_name', 't4.name as district')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->join('registered_manufacturing_sites as t5', 't1.id', '=', 't5.tra_site_id')
                ->join('tra_gmp_applications as t6', 't1.id', '=', 't6.manufacturing_site_id')
                ->join('tra_approval_recommendations as t7', 't1.permit_id', '=', 't7.id')
                ->join('par_system_statuses as t8', 't5.status_id', '=', 't8.id')
                ->join('tra_product_gmpinspectiondetails as t9', 't1.id', '=', 't9.manufacturing_site_id')
                ->leftJoin('gmp_productline_details as t10', 't9.gmp_productline_id', '=', 't10.id')
                ->leftJoin('gmp_product_lines as t11', 't10.product_line_id', '=', 't11.id')
                ->leftJoin('gmp_product_categories as t12', 't10.category_id', '=', 't12.id')
                ->leftJoin('tra_gmp_applications as t13', 't13.manufacturing_site_id', '=', 't1.id');
              
                $filters = (array)json_decode($filters);
                if(isset($filters)){
                $qry->where($filters);
            }
             
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
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
          return \response()->json($res);
    }
    public function getproductimage(request $request){
       try{
           $filters = $request->input('filters');
           $qry= DB::table('tra_uploadedproduct_images as t1')
           ->select ('t1.initial_file_name', 't1.thumbnail_folder', 't1.document_folder', 't1.file_name', 't1.filetype', 't1.remarks');

             $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    
    }
     public function getSampleInfo(request $request){
        try{
           $filters = $request->input('filters');
           $qry= DB::table('tra_sample_information as t1');
             $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    
    }

     
//premise spreadsheet
     public function getPremiseApplicationColumns(request $request){
        try{
           $filters = $request->input('filters');
           $BsnCategory = $request->input('BsnCategory');
           $BsnType = $request->input('BsnType');
           $Category = $request->input('Category');
           $BsnScale = $request->input('BsnScale');
           $decision_id=$request->input('decision');
           $validity_status = $request->validity_status;
           $registration_status = $request->registration_status;
           $limit = $request->input('limit');
           $start = $request->input('start');

           $issueplace = $request->input('issueplace');
           $qry= DB::table('tra_premises_applications as t1')
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
           ->LeftJoin('par_registration_statuses as t23','t15.appregistration_status_id','t23.id')
            ->LeftJoin('par_validity_statuses as t24','t15.appvalidity_status_id','t24.id')


          ->select('t1.application_code','t1b.id as premise_id','t1.reference_no','t1.tracking_no','t1b.name','t1b.email','t1b.postal_address','t1b.physical_address','t1b.telephone','t1b.mobile_no','t1b.contact_person_startdate','t1b.contact_person_enddate','t1b.gps_coordinate','t2.name as Precountry','t3.name as PreRegion','t4.name as PreDistrict','t5.name as BsnType','t7.name as BsnCategory','t6.name as BsnScale','t8.name as Trader','t8.postal_address as TraderPostalA','t8.physical_address as TraderPhysicalA','t8.email_address as TraderEmail','t8.telephone_no as TraderTell','t8.mobile_no as TraderMobile','t9.name as ContactPerson','t9.telephone_no as ContactTell','t9.email_address as ContactEmail','t11.name as BsnTypeDetails','t12.name as issueplace','t13.name as TraderCountry','t14.name as TraderRegion','t15.expiry_date as CertExpiryDate','t15.certificate_issue_date as CertIssueDate','t16.name as PremiseCategory','t15.certificate_issue_date as IssueFrom','t15.certificate_issue_date as IssueTo','t1.date_added as ReceivedFrom','t1.date_added as ReceivedTo','t15.permit_no as certificate_no','t23.name as registration_status', 't24.name as validity_status');

          $qry->groupBy('t1.application_code');

          //filers for combo
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                       $qry->where('t1.section_id',$value);
                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                      $qry->where('t1.sub_module_id',$value);
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value != ''){
                                     if($value==1){
                                        $value='date_added';
                                     }else if($value==3){
                                       $value='submission_date';
                                     }

                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t15.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t15.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }

                                }
                                  
                            }
                    
                     }
                 if(validateIsNumeric($decision_id)){
                      $qry->where('t15.decision_id' , $decision_id);
                     }
                if(validateIsNumeric($BsnCategory)){
                      $qry->where('t1b.business_category_id' , $BsnCategory);
                     }
                if(validateIsNumeric($BsnType)){
                      $qry->where('t1b.business_type_id' , $BsnType);
                     }
                if(validateIsNumeric($Category)){
                      $qry->where('t1b.premise_type_id' , $Category);
                     }
                if(validateIsNumeric($BsnScale)){
                      $qry->where('t1b.business_scale_id' , $BsnScale);
                     }
                if(validateIsNumeric($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
                if(validateIsNumeric($validity_status)){
                      $qry->where('t15.appvalidity_status_id' , $validity_status);
                     }
                if(validateIsNumeric($registration_status)){
                      $qry->where('t15.appregistration_status_id' , $registration_status);
                     }


               $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';
                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'name' :
                                    $whereClauses[] = "t1b.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'email' :
                                    $whereClauses[] = "t1b.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'postal_address' :
                                    $whereClauses[] = "t1b.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'physical_address' :
                                    $whereClauses[] = "t1b.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'telephone' :
                                    $whereClauses[] = "t1b.telephone like '%" . ($filter->value) . "%'";
                                    break;
                                case 'mobile_no' :
                                    $whereClauses[] = "t1b.mobile_no like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'contact_person_startdate' :
                                    $whereClauses[] = "t1b.contact_person_startdate like '%" . ($filter->value) . "%'";
                                    break;
                                case 'contact_person_enddate' :
                                    $whereClauses[] = "date_format(t1b.contact_person_enddate, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'gps_coordinate' :
                                    $whereClauses[] = "t1b.gps_coordinate like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Precountry' :
                                    $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'PreRegion' :
                                    $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'PreDistrict' :
                                    $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'BsnType' :
                                    $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'BsnCategory' :
                                    $whereClauses[] = "t7.name like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'BsnScale' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Trader' :
                                    $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderPostalA' :
                                    $whereClauses[] = "t8.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderPhysicalA' :
                                    $whereClauses[] = "t8.physical_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'TraderEmail' :
                                    $whereClauses[] = "t8.email_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'TraderTell' :
                                    $whereClauses[] = "t8.telephone_no like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'TraderMobile' :
                                    $whereClauses[] = "t8.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderCountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'TraderRegion' :
                                    $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ContactPerson' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'ContactTell' :
                                    $whereClauses[] = "t9.telephone_no like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'ContactEmail' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'BsnTypeDetails' :
                                    $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'issueplace' :
                                    $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'certificate_no' :
                                    $whereClauses[] = "t15.certificate_no like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t15.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t15.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.date_added, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.date_added, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t15.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t15.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

                      $total=$qry->get()->count();

                      if(isset($start)&&isset($limit)){
                      $results = $qry->skip($start)->take($limit)->get();
                                 }
                                 else{
                                  $results=$qry->get();
                                 }


                      $res = array(
                          'success' => true,
                          'results' => $results,
                          'message' => 'All is well',
                          'totalResults'=>$total
                      );

                  }catch (\Exception $exception) {
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

                    $type = $request->input('type');
                    if(isset($type)){
                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    } 

     public function getPremisebsnInfo(request $request){
        try{
           $filters = $request->input('filters');
           $qry= DB::table('tra_premises_otherdetails as t1')
        
           ->LeftJoin('par_business_types as t2','t1.business_type_id','t2.id')
           ->LeftJoin('par_business_type_details as t3','t1.business_type_detail_id','t3.id')

          ->select('t2.name as Type','t3.name as details');

       
             $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }
     public function getPremisePersonnelInfo(request $request){
        try{
           $filters = $request->input('filters');
           $qry= DB::table('tra_premises_personnel as t1')
        
           ->LeftJoin('tra_personnel_information as t2','t1.personnel_id','t2.id')
           ->LeftJoin('par_personnel_qualifications as t3','t1.qualification_id','t3.id')
           ->LeftJoin('par_personnel_studyfield as t4','t1.study_field_id','t4.id')

          ->select('t1.start_date','t1.end_date','t2.name as Name','t3.name as Qualifications','t4.name as StudyField');

       
             $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }
     public function getGmpSpreadSheet(request $request){
    try{
           $filters = $request->input('filters');
           $assessment_type = $request->input('assessment_type');
           $facility = $request->input('gmp_type');
           $business_type_id = $request->input('business_type_id');
           $issueplace = $request->input('issueplace');
           $decision_id=$request->input('decision');
           $device_type_id = $request->input('device_type_id');
           $start = $request->input('start');
           $limit = $request->input('limit');
           $validity_status = $request->validity_status;
           $registration_status = $request->registration_status;
           $application_status = $request->application_status;
           $approval_recommendation = $request->approval_recommendation;

         $qry= DB::table('tra_gmp_applications as t1')
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
               ->LeftJoin('par_gmpapproval_decisions as t21','t18.decision_id','t21.id')
              ->LeftJoin('par_registration_statuses as t23','t18.appregistration_status_id','t23.id')
              ->LeftJoin('par_validity_statuses as t24','t18.appvalidity_status_id','t24.id')
              ->LeftJoin('par_system_statuses as t25','t1.application_status_id','t25.id')
            ->select('t1.manufacturing_site_id','t1.reference_no','t1.application_code','t1.tracking_no','t2.name as assessment_procedure','t3.name as manufacturing_site','t3.gps_coordinate','t3.premise_reg_no','t4.name as manufacturer_name','t4.postal_address','t4.physical_address','t4.email_address','t4.mobile_no','t4.telephone_no','t5.name as country','t6.name as region','t7.name as district','t8.name as business_type', DB::raw("(select GROUP_CONCAT(' ', d.name) as BsnTypeDetails from par_business_type_details d inner join tra_mansite_otherdetails site on d.id = site.business_type_detail_id where site.manufacturing_site_id = t3.id) as BsnTypeDetails"),'t9.name as issueplace','t10.name as Applicant','t10.physical_address as ApplicantPhysicalA','t10.postal_address as ApplicantPostalA','t10.telephone_no as ApplicantTell','t10.mobile_no as ApplicantMobile','t10.email_address as ApplicantEmail','t14.name as ApplicantCountry','t15.name as ApplicantRegion','t11.name as LocalAgent','t11.postal_address as LocalAgentPostalA','t11.physical_address as LocalAgentPhysicalA','t11.telephone_no as LocalAgentTell','t11.mobile_no as AgentMobile','t11.email_address as LocalAgentEmail','t16.name as AgentCountry','t17.name as AgentRegion','t12.name as contact_person','t12.postal_address as contact_personPostalA','t12.telephone as contact_personTell','t13.name as FacilityLocation','t18.expiry_date as CertExpiryDate','t18.certificate_issue_date as CertIssueDate','t19.name as DeviceType','t18.certificate_issue_date as IssueFrom','t18.certificate_issue_date as IssueTo','t1.date_added as ReceivedFrom','t1.date_added as ReceivedTo', 't18.certificate_no', 't23.name as registration_status','t24.name as validity_status', 't21.name as approval_recommendation', 't25.name as application_status');

              $qry->groupBy('t1.application_code');
            //filers for combo
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                       $qry->where('t1.section_id',$value);
                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                      $qry->where('t1.sub_module_id',$value);
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value != ''){
                                    if($value==1){
                                        $value='date_added';
                                     }else if($value==3){
                                       $value='submission_date';
                                     }
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t18.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t18.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }

                                  
                                }
                                  
                            }
                    
                     }
                 if(validateIsNumeric($decision_id)){
                      $qry->where('t18.decision_id' , $decision_id);
                     }
                if(validateIsNumeric($assessment_type)){
                      $qry->where('t1.assessment_type_id' , $assessment_type);
                     }
                if(validateIsNumeric($facility)){
                      $qry->where('t1.gmp_type_id' , $facility);
                     }
                if(validateIsNumeric($business_type_id)){
                      $qry->where('t3.business_type_id' , $business_type_id);
                     }
                if(validateIsNumeric($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
                if(validateIsNumeric($device_type_id)){
                      $qry->where('t1.device_type_id' , $device_type_id);
                     }
                if(validateIsNumeric($device_type_id)){
                      $qry->where('t1.device_type_id' , $device_type_id);
                     }
                if(validateIsNumeric($validity_status)){
                      $qry->where('t18.appvalidity_status_id' , $validity_status);
                     }
                if(validateIsNumeric($registration_status)){
                      $qry->where('t18.appregistration_status_id' , $registration_status);
                     }
                if(validateIsNumeric($application_status)){
                      $qry->where('t1.application_status_id' , $application_status);
                     }
                if(validateIsNumeric($approval_recommendation)){
                      $qry->where('t18.decision_id' , $approval_recommendation);
                     }
                $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';
                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'assessment_procedure' :
                                    $whereClauses[] = "t1b.assessment_procedure like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'manufacturer_name' :
                                    $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'BsnTypeDetails' :
                                    $whereClauses[] = "t20.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'manufacturing_site' :
                                    $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'country' :
                                    $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'region' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'district' :
                                    $whereClauses[] = "t7.name like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'email_address' :
                                    $whereClauses[] = "t4.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'postal_address' :
                                    $whereClauses[] = "t4.postal_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'physical_address' :
                                    $whereClauses[] = "t4.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'telephone_no' :
                                    $whereClauses[] = "t4.telephone_no like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'mobile_no' :
                                    $whereClauses[] = "t4.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'gps_coordinate' :
                                    $whereClauses[] = "t3.gps_coordinate like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'premise_reg_no' :
                                    $whereClauses[] = "t3.premise_reg_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Applicant' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'ApplicantPostalA' :
                                    $whereClauses[] = "t10.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantTell' :
                                    $whereClauses[] = "t10.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantMobile' :
                                    $whereClauses[] = "t10.mobile_no like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t10.email_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'ApplicantRegion' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'LocalAgent' :
                                    $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'LocalAgentPostalA' :
                                    $whereClauses[] = "t11.postal_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'LocalAgentPhysicalA' :
                                    $whereClauses[] = "t11.physical_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'LocalAgentTell' :
                                    $whereClauses[] = "t11.telephone_no like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'AgentMobile' :
                                    $whereClauses[] = "t11.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'LocalAgentEmail' :
                                    $whereClauses[] = "t11.email_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'AgentCountry' :
                                    $whereClauses[] = "t16.name like '%" . ($filter->value) . "%'";
                                    break;
                                 case 'AgentRegion' :
                                    $whereClauses[] = "t17.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'contact_person' :
                                    $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'contact_personPostalA' :
                                    $whereClauses[] = "t12.postal_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'contact_personTell' :
                                    $whereClauses[] = "t12.telephone like '%" . ($filter->value) . "%'";
                                    break;
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t18.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t18.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.date_added, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.date_added, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t18.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t18.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                                case 'certificate_no' :
                                    $whereClauses[] = "t18.certificate_no like '%" . ($filter->value) . "%'";
                                    break; 
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

                $total=$qry->get()->count();

                      if(isset($start)&&isset($limit)){
                      $results = $qry->skip($start)->take($limit)->get();
                                 }
                                 else{
                                  $results=$qry->get();
                                 }

          $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'totalResults' => $total
            );
    }catch(\Exception $exception){
       $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
    }catch(\Throwable $throwable){
        $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
       }
     $type = $request->input('type');
                    if(isset($type)){
                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    }
     public function getGMPInspectionTeam(Request $req){
      $application_code = $req->application_code;
      try{
          $qry = DB::table('tra_gmp_applications as t1')
                ->join('assigned_gmpinspections as t9','t1.application_code', 't9.application_code')
                ->leftJoin('par_gmp_inspection_types as t8', 't1.inspection_type_id', '=', 't8.id')
                ->leftJoin('inspectionteam_details as t10', 't9.inspection_id', '=', 't10.id')
                ->select(DB::raw("t9.id, t10.inspectioncountry_list, t10.inspectionteam_name, t8.name as inspection_type, DATE_FORMAT(t10.start_date,'%d/%m/%Y') as start_date,DATE_FORMAT(t10.end_date, '%d/%m/%Y') as end_date"))
                ->where('t1.application_code', $application_code);
          $results =$qry->get();
          $res = array(
                    'success' => true,
                    'results' => $results,
                    'message' => 'All is well',
                );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }

    public function getGmpBsnDetails(request $request){
       $filters = $request->input('filters');
        $filters = (array)json_decode($filters);

       try{
       $qry=DB::table('tra_manufacturing_sites as t1')
            ->leftJoin('par_business_type_details as t2','t1.business_type_id','t2.business_type_id')
            ->leftJoin('par_business_types as t3','t1.business_type_id','t3.id')
            ->select('t2.name as details','t3.name as BsnType');

            if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }

    

    public function getgmpmanblock(request $request){
        try{
           $filters = $request->input('filters');
           $qry= DB::table('tra_manufacturingsite_blocks as t1')
          ->select('t1.name','t1.activities');
       
             $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }

      public function getGmpManLine(request $request){
        try{
           $filters = $request->input('filters');
           $qry= DB::table('gmp_productline_details as t1')
           ->LeftJoin('gmp_product_lines as t2','t1.product_line_id','t2.id')
           ->LeftJoin('gmp_product_categories as t3','t1.category_id','t3.id')
           ->LeftJoin('gmp_product_descriptions as t4','t1.prodline_description_id','t4.id')
           ->LeftJoin('tra_manufacturing_sites_blocks as t5','t1.manufacturingsite_block_id','t5.id')
          ->select('t2.name as productline','t3.name as category','t4.name as productlinedescription','t5.name as mansiteblock');
       
             $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }
    
     public function getGmpManSite(request $request){
        try{
           $filters = $request->input('filters');
           $qry= DB::table('tra_product_gmpinspectiondetails as t1')
           ->LeftJoin('tra_product_information as t2','t1.product_id','t2.id')
           ->LeftJoin('par_common_names as t3','t2.common_name_id','t3.id')
           ->LeftJoin('par_classifications as t4','t2.classification_id','t4.id')
           ->LeftJoin('tra_product_applications as t5','t2.id','t5.product_id')
           ->leftJoin('wb_trader_account as t6','t5.applicant_id','t6.id')
           ->leftJoin('gmp_product_lines as t7','t1.gmp_productline_id','t7.id')

          ->select('t2.brand_name','t3.name as common_name','t4.name as classification','t5.reference_no','t6.name as Trader','t6.postal_address as TraderPostalA','t6.telephone_no as TraderTell','t7.name as product_line');
       
             $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }

    public function getIESpreadSheet(request $request){
        try{
           $qry= DB::table('tra_importexport_applications as t1')
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
           ->LeftJoin('tra_managerpermits_review as t17','t1.application_code','t17.application_code')
           ->leftJoin('wb_trader_account as t18','t1.applicant_id','t18.id')
           ->leftJoin('par_countries as t19','t18.country_id','t19.id')
           ->leftJoin('par_regions as t20','t18.region_id','t20.id')
           ->LeftJoin('par_approval_decisions as t21','t17.decision_id','t21.id')
           ->LeftJoin('par_registration_statuses as t23','t17.appregistration_status_id','t23.id')
           ->LeftJoin('par_validity_statuses as t24','t17.appvalidity_status_id','t24.id')



          ->select('t1.proforma_invoice_no','t1.reference_no','t1.tracking_no','t1.application_code','t1.proforma_invoice_date','t2.name as type','t3.name as category','t4.name as typecategory','t5.name as permitreason','t6.name as port','t7.name as currency','t8.name as consigneeoption','t9.name as consignee','t9.postal_address as Cpostal_address','t9.physical_address as Cphysical_address','t9.telephone_no as Ctelephone_no','t9.mobile_no as Cmobile_no','t9.email_address as Cemail_address','t15.name as Ccountry','t16.name as Cregion','t10.name as senderreceiver','t10.physical_address as SRphysical_address','t10.postal_address as SRpostal_address','t10.telephone_no as SRtelephone_no','t10.mobile_no as SRmobile_no','t10.email as SRemail_address','t13.name as SRcountry','t14.name as SRregion','t11.name as premisename','t11.postal_address as premisePostalA','t11.physical_address as premisePhysicalA','t11.telephone as premiseTell','t11.mobile_no as premiseMobile','t11.expiry_date as premiseExpiryDate','t12.name as issueplace','t17.expiry_date as CertExpiryDate','t17.certificate_issue_date as CertIssueDate','t18.name as Applicant','t18.postal_address as ApplicantPostalA','t18.physical_address as ApplicantPhysicalA','t18.telephone_no as ApplicantTell','t18.mobile_no as ApplicantMobile','t18.email_address as ApplicantEmail','t19.name as ApplicantCountry','t20.name as ApplicantRegion','t17.certificate_issue_date as IssueFrom','t17.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo','t17.certificate_no', 't23.name as registration_status', 't24.name as validity_status');

            $qry->groupBy('t1.application_code');
  //if part
       if(!isset($request->IDs)){
           $filters = $request->input('filters');
           $permit_category = $request->input('permit_category');
           $import_typecategory = $request->input('import_typecategory');
           $permit_reason = $request->input('permit_reason');
           $port = $request->input('port');
           $currency = $request->input('currency');
           $issueplace = $request->input('issueplace');
           $consignee_options= $request->input('consignee_options');
           $decision_id=$request->input('decision');
           $validity_status = $request->validity_status;
           $registration_status = $request->registration_status;
           
       //filers for combo
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                       $qry->where('t1.section_id',$value);
                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                      $qry->where('t1.sub_module_id',$value);
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value != ''){
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t17.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t17.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  
                                }
                                  
                            }
                    
                     }
                 if(validateIsNumeric($decision_id)){
                      $qry->where('t17.decision_id' , $decision_id);
                     }
                if(validateIsNumeric($permit_category)){
                      $qry->where('t1.permit_category_id' , $permit_category);
                     }
                if(validateIsNumeric($import_typecategory)){
                      $qry->where('t1.import_typecategory_id' , $import_typecategory);
                     }
                if(validateIsNumeric($permit_reason)){
                      $qry->where('t1.permit_reason_id' , $permit_reason);
                     }
                if(validateIsNumeric($port)){
                      $qry->where('t1.port_id' , $port);
                     }
                if(validateIsNumeric($currency)){
                      $qry->where('t1.paying_currency_id' , $currency);
                     }
                if(validateIsNumeric($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
                if(validateIsNumeric($consignee_options)){
                      $qry->where('t1.consignee_options_id' , $consignee_options);
                     }
                if(validateIsNumeric($validity_status)){
                      $qry->where('t17.appvalidity_status_id' , $validity_status);
                     }
                if(validateIsNumeric($registration_status)){
                      $qry->where('t17.appregistration_status_id' , $registration_status);
                     }

             $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';
                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'premisename' :
                                    $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premisePostalA' :
                                    $whereClauses[] = "t11.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premisePhysicalA' :
                                    $whereClauses[] = "t11.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premiseTell' :
                                    $whereClauses[] = "t11.telephone like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premiseMobile' :
                                    $whereClauses[] = "t11.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premiseExpiryDate' :
                                    $whereClauses[] = "date_format(t11.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'consignee' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Cpostal_address' :
                                    $whereClauses[] = "t9.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Cphysical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ctelephone_no' :
                                    $whereClauses[] = "t9.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Cmobile_no' :
                                    $whereClauses[] = "t9.mobile_no like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'Cemail_address' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ccountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Cregion' :
                                    $whereClauses[] = "t16.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'senderreceiver' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRpostal_address' :
                                    $whereClauses[] = "t10.postal_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'SRphysical_address' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRtelephone_no' :
                                    $whereClauses[] = "t10.telephone_no like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'SRmobile_no' :
                                    $whereClauses[] = "t10.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRemail_address' :
                                    $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRcountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRregion' :
                                    $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Applicant' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantPostalA' :
                                    $whereClauses[] = "t18.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantTell' :
                                    $whereClauses[] = "t18.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantMobile' :
                                    $whereClauses[] = "t18.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t18.email_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantRegion' :
                                    $whereClauses[] = "t20.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'proforma_invoice_no' :
                                    $whereClauses[] = "t1.proforma_invoice_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'proforma_invoice_date' :
                                    $whereClauses[] = "date_format(t1.proforma_invoice_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break; 
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                                case 'certificate_no' :
                                    $whereClauses[] = "t17.certificate_no like '%" . ($filter->value) . "%'";
                                    break; 
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

                      $total=$qry->get()->count();

                      if(isset($start)&&isset($limit)){
                      $results = $qry->skip($start)->take($limit)->get();
                                 }
                                 else{
                                  $results=$qry->get();
                                 }

  //else part                       
          }else{
            $results=$qry->where('t1.id IN('.$request->IDs.')')->get();
          }

          $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'totalResults' => $total
            );
    }catch(\Exception $exception){
       $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
    }catch(\Throwable $throwable){
        $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
       }
            $type = $request->input('type');
                    if(isset($type)){
                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    }
    public function getIEproducts(request $request){
        try{
           $filters = $request->input('filters');
           $qry= DB::table('tra_permits_products as t1')
           ->LeftJoin('tra_product_information as t2','t1.product_id','t2.id')
           ->LeftJoin('par_packaging_units as t3','t1.packaging_unit_id','t3.id')
           ->LeftJoin('par_weights_units as t4','t1.weights_units_id','t4.id')
           ->LeftJoin('par_currencies as t5','t1.currency_id','t5.id')
           


          ->select(DB::raw('t1.quantity*t1.unit_price as total,t1.quantity,t1.total_weight,t1.unit_price,t2.brand_name,t3.name as packageunit,t4.name as weightunit,t5.name as currency'));
       
             $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }
     public function getIESections(request $request){
        try{
           $type = $request->input('type');
           $qry= DB::table('sub_modules as t1')
        
          ->select('t1.name','t1.id');
            
                
                $qry->where('module_id',4);
            
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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

        $type = $request->input('type');
        if(isset($type)){
          return $results;
        }else{
           return \response()->json($res);
               }
        
    }
         public function getPoeApplicationDetails(request $request){
        try{
           $filters = $request->input('filters');
              $qry = DB::table('tra_poe_applications as t1')
                     ->leftJoin('par_clearing_agents as t2','t1.clearing_agent_id','t2.id')
                     ->leftJoin('par_ports_information as t3','t1.port_id','t3.id')
                     ->leftJoin('users as t4','t1.inspected_by','t4.id')
                     ->select('t1.tra_reg_number as tra_registration_number','t1.tansad_no','t1.inspected_on as date_inspected','t1.tra_reg_date as tra_registration_date','t2.name as clearing_agent','t3.name as port_of_entry',DB::raw('decrypt(username) as inspected_by'));
              
                $filters = (array)json_decode($filters);
                if(isset($filters)){
                $qry->where($filters);
            }
             
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
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
          return \response()->json($res);
    }

 public function getIEPermitSpreadSheet(request $request){
        try{
            
           $qry= DB::table('tra_permits_products as t1a')
           ->join('tra_product_information as t2a','t1a.product_id','t2a.id')
           ->LeftJoin('par_packaging_units as t3a','t1a.packaging_unit_id','t3a.id')
           ->LeftJoin('par_weights_units as t4a','t1a.weights_units_id','t4a.id')
           ->LeftJoin('par_currencies as t5a','t1a.currency_id','t5a.id')
           ->join('tra_importexport_applications as t1','t1a.application_code','t1.application_code')
           ->LeftJoin('sub_modules as t2','t1.sub_module_id','t2.id')
           ->LeftJoin('par_permit_category as t3','t1.permit_category_id','t3.id')
           ->LeftJoin('par_permit_typecategories as t4','t1.import_typecategory_id','t4.id')
           ->LeftJoin('par_permit_reasons as t5','t1.permit_reason_id','t5.id')
           ->LeftJoin('par_ports_information as t6','t1.port_id','t6.id')
           ->LeftJoin('par_consignee_options as t8','t1.consignee_options_id','t8.id')
           ->LeftJoin('tra_consignee_data as t9','t1.consignee_id','t9.id')
           ->LeftJoin('tra_permitsenderreceiver_data as t10','t1.sender_receiver_id','t10.id')
           ->LeftJoin('tra_premises as t11','t1.premise_id','t11.id')
           ->LeftJoin('par_zones as t12','t1.zone_id','t12.id')
           ->LeftJoin('par_countries as t13','t10.country_id','t13.id')
           ->LeftJoin('par_regions as t14','t10.region_id','t14.id')
           ->LeftJoin('par_countries as t15','t9.country_id','t15.id')
           ->LeftJoin('par_regions as t16','t9.region_id','t16.id')
           ->LeftJoin('tra_managerpermits_review as t17','t1.application_code','t17.application_code')
           ->leftJoin('wb_trader_account as t18','t1.applicant_id','t18.id')
           ->leftJoin('par_countries as t19','t18.country_id','t19.id')
           ->leftJoin('par_regions as t20','t18.region_id','t20.id')
           ->LeftJoin('par_approval_decisions as t21','t17.decision_id','t21.id')

         //  ->LeftJoin('par_registration_statuses as t23','t17.appregistration_status_id','t23.id')
         //  ->LeftJoin('par_validity_statuses as t24','t17.appvalidity_status_id','t24.id')
         
          ->select(DB::raw('DISTINCT t1a.id,t1a.quantity*t1a.unit_price as total, t1.reference_no, t1.tracking_no, t1a.quantity,t1a.total_weight as weight, t1a.unit_price,t2a.brand_name,t3a.name as packageunit,t4a.name as weight_unit,t5a.name as currency'),'t1.proforma_invoice_no','t1.application_code','t1.proforma_invoice_date','t2.name as type','t3.name as category','t4.name as typecategory','t5.name as permitreason','t6.name as port','t8.name as consigneeoption','t9.name as consignee','t9.postal_address as Cpostal_address','t9.physical_address as Cphysical_address','t9.telephone_no as Ctelephone_no','t9.mobile_no as Cmobile_no','t9.email_address as Cemail_address','t15.name as Ccountry','t16.name as Cregion','t10.name as senderreceiver','t10.physical_address as SRphysical_address','t10.postal_address as SRpostal_address','t10.telephone_no as SRtelephone_no','t10.mobile_no as SRmobile_no','t10.email as SRemail_address','t13.name as SRcountry','t14.name as SRregion','t11.name as premisename','t11.postal_address as premisePostalA','t11.physical_address as premisePhysicalA','t11.telephone as premiseTell','t11.mobile_no as premiseMobile','t11.expiry_date as premiseExpiryDate','t12.name as issueplace','t17.expiry_date as CertExpiryDate','t17.certificate_issue_date as CertIssueDate','t18.name as Applicant','t18.postal_address as ApplicantPostalA','t18.physical_address as ApplicantPhysicalA','t18.telephone_no as ApplicantTell','t18.mobile_no as ApplicantMobile','t18.email_address as ApplicantEmail','t19.name as ApplicantCountry','t20.name as ApplicantRegion','t17.certificate_issue_date as IssueFrom','t17.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo','t17.permit_no as certificate_no','t17.appregistration_status_id as registration_status', 't17.appregistration_status_id as validity_status');

           // $qry->groupBy('t1a.id');
            //dd($qry->toSql());
           $filters = $request->input('filters');
           $permit_category = $request->input('permit_category');
           $import_typecategory = $request->input('import_typecategory');
           $permit_reason = $request->input('permit_reason');
           $port = $request->input('port');
           $currency = $request->input('currency');
           $weight_unit = $request->input('weight_unit');
           $issueplace = $request->input('issueplace');
           $consignee_options= $request->input('consignee_options');
           $decision_id=$request->input('decision');
           $validity_status = $request->validity_status;
           $registration_status = $request->registration_status;
           $consigneeoption = $request->consigneeoption;
           
           $start = $request->input('start');
           $limit = $request->input('limit');



       //filers for combo
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                       $qry->where('t1.section_id',$value);
                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                      $qry->where('t1.sub_module_id',$value);
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value = ''){
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t17.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t17.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                }
                                  
                            }
                    
                     }
                 if(validateIsNumeric($decision_id)){
                      $qry->where('t17.decision_id' , $decision_id);
                     }
                if(validateIsNumeric($permit_category)){
                      $qry->where('t1.permit_category_id' , $permit_category);
                     }
                if(validateIsNumeric($import_typecategory)){
                      $qry->where('t1.import_typecategory_id' , $import_typecategory);
                     }
                if(validateIsNumeric($permit_reason)){
                      $qry->where('t1.permit_reason_id' , $permit_reason);
                     }
                if(validateIsNumeric($port)){
                      $qry->where('t1.port_id' , $port);
                     }
                if(validateIsNumeric($currency)){
                      $qry->where('t1a.currency_id' , $currency);
                     }
                 if(validateIsNumeric($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
                 if(validateIsNumeric($consigneeoption)){
                      $qry->where('t1.consignee_options_id' , $consigneeoption);
                     }
                if(validateIsNumeric($weight_unit)){
                      $qry->where('t1a.weights_units_id' , $weight_unit);
                     }
                if(validateIsNumeric($validity_status)){
                      $qry->where('t17.appvalidity_status_id' , $validity_status);
                     }
                if(validateIsNumeric($registration_status)){
                      $qry->where('t17.appregistration_status_id' , $registration_status);
                     }

             $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';
                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            
                            switch ($filter->property) {
                                case 'brand_name' :
                                    $whereClauses[] = "t2a.brand_name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'quantity' :
                                    $whereClauses[] = "t1a.quantity like '%" . ($filter->value) . "%'";
                                    break;
                                case 'total_weight' :
                                    $whereClauses[] = "t1a.total_weight like '%" . ($filter->value) . "%'";
                                    break;
                                case 'unit_price' :
                                    $whereClauses[] = "t1a.unit_price like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premisename' :
                                    $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premisePostalA' :
                                    $whereClauses[] = "t11.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premisePhysicalA' :
                                    $whereClauses[] = "t11.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premiseTell' :
                                    $whereClauses[] = "t11.telephone like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premiseMobile' :
                                    $whereClauses[] = "t11.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premiseExpiryDate' :
                                    $whereClauses[] = "date_format(t11.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'consignee' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Cpostal_address' :
                                    $whereClauses[] = "t9.postal_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Cphysical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ctelephone_no' :
                                    $whereClauses[] = "t9.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Cmobile_no' :
                                    $whereClauses[] = "t9.mobile_no like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'Cemail_address' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ccountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Cregion' :
                                    $whereClauses[] = "t16.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'senderreceiver' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRpostal_address' :
                                    $whereClauses[] = "t10.postal_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'SRphysical_address' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRtelephone_no' :
                                    $whereClauses[] = "t10.telephone_no like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'SRmobile_no' :
                                    $whereClauses[] = "t10.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRemail_address' :
                                    $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRcountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRregion' :
                                    $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Applicant' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantPostalA' :
                                    $whereClauses[] = "t18.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantTell' :
                                    $whereClauses[] = "t18.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantMobile' :
                                    $whereClauses[] = "t18.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t18.email_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'TraderCountry' :
                                    $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderRegion' :
                                    $whereClauses[] = "t20.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'proforma_invoice_no' :
                                    $whereClauses[] = "t1.proforma_invoice_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'proforma_invoice_date' :
                                    $whereClauses[] = "date_format(t1.proforma_invoice_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break; 
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                                case 'certificate_no' :
                                    $whereClauses[] = "date_format(t17.certificate_no, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }

          if ($filter_string != '') {
              
                $qry->whereRAW($filter_string);
           }

          $total=$qry->count();

          if(isset($start)&&isset($limit)){
              $results = $qry->skip($start)->take($limit)->get();
          }
          else{
                $results=$qry->get();
          }

          $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'totalResults' => $total
            );
    }catch(\Exception $exception){
       $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
    }catch(\Throwable $throwable){
        $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
       }
            $type = $request->input('type');
                    if(isset($type)){
                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    }



public function getClinicalTrialsSpreadsheet(request $request){
      $filters = $request->input('filters');
      $currency = $request->input('currency_id');
      $duration_desc = $request->input('duration_desc');
      $decision_id=$request->input('decision');
      $issueplace = $request->input('issueplace');
      $start = $request->input('start');
      $limit = $request->input('limit');
      $validity_status = $request->validity_status;
      $registration_status = $request->registration_status;

try{
      $qry=DB::table('tra_clinical_trial_applications as t1')
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
           ->LeftJoin('par_registration_statuses as t23','t12.appregistration_status_id','t23.id')
           ->LeftJoin('par_validity_statuses as t24','t12.appvalidity_status_id','t24.id')
           ->LeftJoin('wb_trader_account as t25','t1.applicant_id','t25.id')
           ->LeftJoin('par_regions as t26','t25.region_id','t26.id')
           ->LeftJoin('par_countries as t27','t25.country_id','t27.id')



           ->select('t1.study_title','t1.application_code','t1.reference_no','t1.tracking_no','t1.id','t1.protocol_no','t1.version_no','t1.study_start_date','t1.study_end_date','t1.date_of_protocol','t1.study_duration','t1.clearance_no','t2.name as duration_desc','t3.name as Sponsor','t3.postal_address as Spostal_address','t3.physical_address as Sphysical_address','t3.mobile_no as Smobile_no','t3.telephone as Stelephone_no','t3.email as Semail_address','t8.name as Scountry','t9.name as Sregion','t4.name as investigator','t4.postal_address as Ipostal_address','t4.physical_address as Iphysical_address','t4.mobile_no as Imobile_no','t4.telephone as Itelephone','t4.email as Iemail_address','t10.name as Icountry','t11.name as Iregion','t6.name as paying_currency','t7.name as CertIssuePlace','t12.certificate_issue_date as CertIssueDate','t12.expiry_date as CertExpiryDate','t12.certificate_issue_date as IssueFrom','t12.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo', 't12.certificate_no', 't23.name as registration_status','t24.name as validity_status', 't25.name as applicant','t25.postal_address as applicant_postal_address','t25.physical_address as applicant_physical_address','t25.email_address as applicant_email_address','t25.telephone_no as applicant_telephone','t25.mobile_no as applicant_mobile_no', 't26.name as applicant_region', 't27.name as applicant_country');

             $qry->groupBy('t1.application_code');
           //filers for combo
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                       $qry->where('t1.section_id',$value);
                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                      $qry->where('t1.sub_module_id',$value);
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value != ''){
                                     if($value==1){
                                        $value='date_added';
                                     }else if($value==3){
                                       $value='submission_date';
                                     }
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t12.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t12.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                            
                               
                                }
                                  
                            }
                    
                     }
                 if(validateIsNumeric($decision_id)){
                      $qry->where('t12.decision_id' , $decision_id);
                     }
                if(validateIsNumeric($currency)){
                      $qry->where('t5.paying_currency_id' , $currency);
                     }
                if(validateIsNumeric($duration_desc)){
                      $qry->where('t1.duration_desc' , $duration_desc);
                     }
                if(validateIsNumeric($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
                if(validateIsNumeric($validity_status)){
                      $qry->where('t12.appvalidity_status_id' , $validity_status);
                     }
                if(validateIsNumeric($registration_status)){
                      $qry->where('t12.appregistration_status_id' , $registration_status);
                     }

             $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';
                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'study_title' :
                                    $whereClauses[] = "t1.study_title like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'protocol_no' :
                                    $whereClauses[] = "t1.protocol_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'version_no' :
                                    $whereClauses[] = "t1.version_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'study_start_date' :
                                    $whereClauses[] = "date_format(t1.study_start_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'study_end_date' :
                                    $whereClauses[] = "date_format(t1.study_end_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'date_of_protocol' :
                                    $whereClauses[] = "date_format(t1.date_of_protocol, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'study_duration' :
                                    $whereClauses[] = "t1.study_duration like '%" . ($filter->value) . "%'";
                                    break;
                                case 'clearance_no' :
                                    $whereClauses[] = "t1.clearance_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Sponsor' :
                                    $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Spostal_address' :
                                    $whereClauses[] = "t3.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'Sphysical_address' :
                                    $whereClauses[] = "t3.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Stelephone_no' :
                                    $whereClauses[] = "t3.telephone like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Smobile_no' :
                                    $whereClauses[] = "t3.mobile_no like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'Semail_address' :
                                    $whereClauses[] = "t3.email like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'Scountry' :
                                    $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Sregion' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'investigator' :
                                    $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ipostal_address' :
                                    $whereClauses[] = "t4.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'Iphysical_address' :
                                    $whereClauses[] = "t4.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Itelephone' :
                                    $whereClauses[] = "t4.telephone like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Imobile_no' :
                                    $whereClauses[] = "t4.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Iemail_address' :
                                    $whereClauses[] = "t4.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Icountry' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Iregion' :
                                    $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'applicant' :
                                    $whereClauses[] = "t25.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_postal_address' :
                                    $whereClauses[] = "t25.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'applicant_physical_address' :
                                    $whereClauses[] = "t25.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_email_address' :
                                    $whereClauses[] = "t25.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_telephone' :
                                    $whereClauses[] = "t25.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_mobile_no' :
                                    $whereClauses[] = "t25.mobile_no like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'applicant_region' :
                                    $whereClauses[] = "t26.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_country' :
                                    $whereClauses[] = "t27.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t12.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t12.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break; 
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t12.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t12.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                                case 'certificate_no' :
                                    $whereClauses[] = "date_format(t12.certificate_no, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break; 
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

                      $total=$qry->get()->count();

                      if(isset($start)&&isset($limit)){
                      $results = $qry->skip($start)->take($limit)->get();
                                 }
                                 else{
                                  $results=$qry->get();
                                 }

          $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'totalResults' => $total
            );
    }catch(\Exception $exception){
       $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
    }catch(\Throwable $throwable){
        $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
       }
            $type = $request->input('type');
                    if(isset($type)){
                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    }
    public function getClinicalTrialsStudySite(request $request){
       $filters = $request->input('filters');
  try{
      $qry=DB::table('clinical_trial_sites as t1')
           ->leftJoin('study_sites as t2','t1.study_site_id','t2.id')
           ->leftJoin('par_countries as t3','t2.country_id','t3.id')
           ->leftJoin('par_regions as t4','t2.region_id','t4.id')

           ->select('t2.name as site','t2.postal_address','t2.physical_address','t2.telephone','t3.name as country','t4.name as region');

           $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }

    public function getClinicalTrialsInvestigators(request $request){
       $filters = $request->input('filters');
  try{
      $qry=DB::table('clinical_trial_investigators as t1')
           ->leftJoin('study_sites as t2','t1.study_site_id','t2.id')
           ->leftJoin('clinical_trial_personnel as t3','t1.investigator_id','t3.id')
           ->leftJoin('clinical_investigator_cat as t4','t1.category_id','t4.id')
           ->leftJoin('par_countries as t5','t3.country_id','t5.id')
           ->leftJoin('par_regions as t6','t3.region_id','t6.id')

           ->select('t2.name as site','t3.name as investigator','t3.postal_address','t3.physical_address','t3.telephone','t4.category_name as category','t5.name as country','t6.name as region');

           $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }

    public function getClinicalTrialsIMPProducts(request $request){
       $filters = $request->input('filters');
  try{
      $qry=DB::table('clinical_trial_products as t1')
           ->leftJoin('par_clinical_product_categories as t2','t1.product_category_id','t2.id')
           ->leftJoin('par_common_names as t3','t1.common_name_id','t3.id')
           ->leftJoin('par_dosage_forms as t4','t1.dosage_form_id','t4.id')
           ->leftJoin('par_route_of_administration as t5','t1.routes_of_admin_id','t5.id')
           ->leftJoin('par_si_units as t6','t1.si_unit_id','t6.id')
//no market location enquire
           ->select('t1.brand_name','t1.product_strength','t1.registration_no','t1.identification_mark','t1.product_desc','t2.category_name as category','t3.name as generic_name','t4.name as dosage_form','t5.name as adminRoute','t6.name as Units');

           $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    }


   
    //product notification
    public function getDeviceNotificationSpreadsheet(request $request){
      $filters = $request->input('filters');
      $gmdn_category = $request->input('gmdn_category');
      $duration_desc = $request->input('duration_desc');
      $issueplace = $request->input('issueplace');
      $device_type = $request->input('device_type_id');
      $classification = $request->input('classification_id');
      $decision_id=$request->input('decision');
      $start = $request->input('start');
      $limit = $request->input('limit');


try{
      $qry=DB::table('tra_product_notifications as t1')
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



           ->select('t2.brand_name as devicename','t1.application_code','t1.reference_no','t1.tracking_no','t2.gmdn_code','t2.gmdn_term','t2.gmdn_category','t2.manufacturing_date','t2.expiry_date','t2.shelf_life','t2.shelf_lifeafter_opening','t2.physical_description','t3.name as devicetype','t4.name as classification','t5.name as commonname','t6.name as intendeduse','t7.name as intendeduser','t8.name as Trader','t8.postal_address as TraderPostalA','t8.physical_address as TraderPhysicalA','t8.telephone_no as TraderTell','t8.mobile_no as TraderMobile','t8.email_address as TraderEmail','t9.name as TraderRegion','t10.name as TraderCountry','t11.name as Agent','t11.postal_address as AgentPostalA','t11.physical_address as AgentPhysicalA','t11.telephone_no as AgentTell','t11.mobile_no as AgentMobile','t11.email_address as AgentEmail','t12.name as AgentRegion','t13.name as AgentCountry','t15.name as site','t15.postal_address as sitePostalA','t15.physical_address as sitePhysicalA','t15.telephone_no as siteTell','t15.mobile_no as siteMobile','t15.email_address as siteEmail','t16.name as siteRegion','t17.name as siteCountry','t18.name as CertIssuePlace','t19.certificate_issue_date as CertIssueDate','t19.expiry_date as CertExpiryDate','t19.certificate_issue_date as IssueFrom','t19.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo');

            $qry->groupBy('t1.application_code');
           //filers for combo
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                       $qry->where('t1.section_id',$value);
                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                      $qry->where('t1.sub_module_id',$value);
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value != ''){
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t19.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t19.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                }
                                  
                            }
                    
                     }
                if(validateIsNumeric($decision_id)){
                      $qry->where('t19.decision_id' , $decision_id);
                     }
                if(validateIsNumeric($gmdn_category)){
                      $qry->where('t2.gmdn_category' , $gmdn_category);
                     }
                if(validateIsNumeric($duration_desc)){
                      $qry->where('t2.shelflifeduration_desc' , $duration_desc);
                     }
                if(validateIsNumeric($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
                if(validateIsNumeric($device_type)){
                      $qry->where('t2.device_type_id', $device_type);
                     }
                if(validateIsNumeric($classification)){
                      $qry->where('t2.classification_id', $device_type);
                     }

             $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';
                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'devicename' :
                                    $whereClauses[] = "t2.brand_name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'gmdn_code' :
                                    $whereClauses[] = "t2.gmdn_code like '%" . ($filter->value) . "%'";
                                    break;
                                case 'gmdn_term' :
                                    $whereClauses[] = "t2.gmdn_term like '%" . ($filter->value) . "%'";
                                    break;
                                case 'manufacturing_date' :
                                    $whereClauses[] = "date_format(t2.manufacturing_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'gmdn_category' :
                                    $whereClauses[] = "t2.gmdn_category like '%" . ($filter->value) . "%'";
                                    break;
                                case 'expiry_date' :
                                    $whereClauses[] = "date_format(t2.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'shelf_life' :
                                    $whereClauses[] = "t2.shelf_life like '%" . ($filter->value) . "%'";
                                    break;
                                case 'shelf_lifeafter_opening' :
                                    $whereClauses[] = "t2.shelf_lifeafter_opening like '%" . ($filter->value) . "%'";
                                    break;
                                case 'physical_description' :
                                    $whereClauses[] = "t2.physical_description like '%" . ($filter->value) . "%'";
                                    break;
                                case 'commonname' :
                                    $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'classification' :
                                    $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'intendeduse' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'intendeduser' :
                                    $whereClauses[] = "t7.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Trader' :
                                    $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderPostalA' :
                                    $whereClauses[] = "t8.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'TraderPhysicalA' :
                                    $whereClauses[] = "t8.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderTell' :
                                    $whereClauses[] = "t8.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderMobile' :
                                    $whereClauses[] = "t8.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderEmail' :
                                    $whereClauses[] = "t8.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'TraderCountry' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderRegion' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break; 
                                 case 'Agent' :
                                    $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'AgentPostalA' :
                                    $whereClauses[] = "t11.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'AgentPhysicalA' :
                                    $whereClauses[] = "t11.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'AgentTell' :
                                    $whereClauses[] = "t11.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'AgentMobile' :
                                    $whereClauses[] = "t11.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'AgentEmail' :
                                    $whereClauses[] = "t11.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'AgentCountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'AgentRegion' :
                                    $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'site' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'sitePostalA' :
                                    $whereClauses[] = "t15.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'sitePhysicalA' :
                                    $whereClauses[] = "t15.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'siteTell' :
                                    $whereClauses[] = "t15.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'siteMobile' :
                                    $whereClauses[] = "t15.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'siteEmail' :
                                    $whereClauses[] = "t15.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'siteCountry' :
                                    $whereClauses[] = "t17.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'siteRegion' :
                                    $whereClauses[] = "t16.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t19.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break; 
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

                      $total=$qry->get()->count();

                      if(isset($start)&&isset($limit)){
                      $results = $qry->skip($start)->take($limit)->get();
                                 }
                                 else{
                                  $results=$qry->get();
                                 }

          $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'totalResults' => $total
            );
    }catch(\Exception $exception){
       $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
    }catch(\Throwable $throwable){
        $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
       }
            $type = $request->input('type');
                    if(isset($type)){
                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    }


    //notification and advertisement
    
   //notification and advertisement
    public function getPromAdvertSpreadsheet(request $request){
      $filters = $request->input('filters');
      $classification_id = $request->input('classification');
      $decision_id = $request->input('decision');
      $type = $request->input('type_id');
      $issueplace = $request->input('issueplace');
      $start = $request->input('start');
      $limit = $request->input('limit');
      $validity_status = $request->validity_status;
      $registration_status = $request->registration_status;
try{
      $qry=DB::table('tra_promotion_adverts_applications as t1')
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

           ->LeftJoin('par_registration_statuses as t23','t11.appregistration_status_id','t23.id')
           ->LeftJoin('par_validity_statuses as t24','t11.appvalidity_status_id','t24.id')

           ->select('t1.id','t1.application_code','t2.name as classification','t1.reference_no','t1.tracking_no','t3.name as type','t4.name as Trader','t4.postal_address as TraderPostalA','t4.physical_address as TraderPhysicalA','t4.telephone_no as TraderTell','t4.mobile_no as TraderMobile','t4.email_address as TraderEmail','t5.name as TraderRegion','t6.name as TraderCountry','t7.name as Sponsor','t7.postal_address as SPostalA','t7.physical_address as SPhysicalA','t7.telephone_no as STell','t7.mobile_no as SMobile','t7.email as SEmail','t8.name as SRegion','t9.name as SCountry','t10.name as CertIssuePlace','t11.certificate_issue_date as CertIssueDate','t11.expiry_date as CertExpiryDate','t11.certificate_issue_date as IssueFrom','t11.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo', 't11.certificate_no', 't23.name as registration_status', 't24.name as validity_status');

            $qry->groupBy('t1.application_code');
           //filers for combo
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                       $qry->where('t1.section_id',$value);
                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                      $qry->where('t1.sub_module_id',$value);
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value != ''){
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t11.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t11.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                }
                                  
                            }
                    
                     }
                if(validateIsNumeric($classification_id)){
                      $qry->where('t1.classification_id' , $classification_id);
                     }
                if(validateIsNumeric($decision_id)){
                      $qry->where('t11.decision_id' , $decision_id);
                     }
                if(validateIsNumeric($type)){
                      $qry->where('t1.product_type_id' , $type);
                     }
                if(isset($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
                if(isset($validity_status)){
                      $qry->where('t11.appvalidity_status_id' , $validity_status);
                     }
                if(isset($registration_status)){
                      $qry->where('t11.appregistration_status_id' , $registration_status);
                     }
             $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';
                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'Trader' :
                                    $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderPostalA' :
                                    $whereClauses[] = "t4.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'TraderPhysicalA' :
                                    $whereClauses[] = "t4.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderTell' :
                                    $whereClauses[] = "t4.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderMobile' :
                                    $whereClauses[] = "t4.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderEmail' :
                                    $whereClauses[] = "t4.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'TraderCountry' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderRegion' :
                                    $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                    break; 
                                 case 'Sponsor' :
                                    $whereClauses[] = "t7.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SPostalA' :
                                    $whereClauses[] = "t7.postal_address like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'SPhysicalA' :
                                    $whereClauses[] = "t7.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'STell' :
                                    $whereClauses[] = "t7.telephone_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SMobile' :
                                    $whereClauses[] = "t7.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SEmail' :
                                    $whereClauses[] = "t7.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'SCountry' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRegion' :
                                    $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t11.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t11.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break; 
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.date_received, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.date_received, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t11.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t11.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                                case 'certificate_no' :
                                    $whereClauses[] = "t11.certificate_no like '%" . ($filter->value) . "%'";
                                    break;
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

                      $total=$qry->get()->count();

                      if(isset($start)&&isset($limit)){
                      $results = $qry->skip($start)->take($limit)->get();
                                 }
                                 else{
                                  $results=$qry->get();
                                 }

          $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'totalResults' => $total
            );
    }catch(\Exception $exception){
       $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
    }catch(\Throwable $throwable){
        $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
       }
            $type = $request->input('type');
                    if(isset($type)){
                      return $results;
                      
                    }else{
                     return \response()->json($res);
                    }
    }


    function getProductPaticulars(request $request){
       $filters = $request->input('filters');
    try{
     $qry= DB::table('tra_promotion_prod_particulars as t1')
      ->LeftJoin('par_product_categories as t3','t1.product_category_id','=','t3.id')
      ->LeftJoin('par_subproduct_categories as t4','t1.product_subcategory_id','=','t4.id')
      ->LeftJoin('par_advertisement_types as t5','t1.type_of_advertisement_id','=','t5.id')
      ->select('t1.brand_name','t1.common_name','t1.registration_no','t1.registrant_name','t3.name as product_category_name','t4.name as product_subcategory_name','t5.name as type_of_advertisement_name');

           $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    

    }
    function getPromotionMaterialDetails(request $request){
       $filters = $request->input('filters');
    try{
     $qry= DB::table('tra_promotion_materials_details as t1')
      ->LeftJoin('par_promotion_material_items as t2','t1.material_id','=','t2.id')
      ->select('t1.remarks','t2.name as material');

           $filters = (array)json_decode($filters);
            
                if(isset($filters)){
                $qry->where($filters);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    

    }

    //disposal applications
      public function getDisposalSpreadsheetColumns(request $request){
        try{
              $qry = DB::table('tra_disposal_applications as t1')
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
                 ->LeftJoin('par_registration_statuses as t23','t19.appregistration_status_id','t23.id')
                 ->LeftJoin('par_validity_statuses as t24','t19.appvalidity_status_id','t24.id')
                
                 
                  ->select('t1.application_code','t1.reference_no','t1.tracking_no','t1.reason_for_disposal','t1.quantity','t1.total_weight','t1.market_value','t1.submission_date as ReceivedTo','t1.section_id','t3.name as destruction_site', 't5.name as destruction_method','t6.name as packaging_unit','t7.name as weight_unit','t8.name as currency','t9.name as premise_name','t9.premise_reg_no','t9.email as premise_email','t9.telephone as premise_tell','t9.physical_address as premise_physical_address','t9.postal_address as premise_postal_address','t10.inspector_name as inspector_name','t11.name as inpsector_title','t12.name as inpsector_organisation','t13.name as trader_name','t13.postal_address as trader_postal_address','t13.physical_address as trader_physical_address','t13.email_address as trader_email_address','t13.telephone_no as trader_telephone','t13.mobile_no as trader_mobile_no','t14.name as premise_country','t15.name as trader_country','t16.name as trader_region','t17.name as CertIssuePlace','t18.name as product_type','t19.certificate_issue_date as CertIssueDate','t19.expiry_date as CertExpiryDate','t19.certificate_issue_date as IssueFrom','t19.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom', 't19.certificate_no', 't23.name as registration_status', 't24.name as validity_status');

                    $qry->groupBy('t1.application_code');
//start filter if
                  $filters = $request->input('filters');
                   $inpsector_title = $request->input('inpsector_title');
                   $weight_unit = $request->input('weight_unit');
                   $currency_id = $request->input('currency_id');
                   $destruction_site = $request->input('destruction_site');
                   $destruction_method = $request->input('destruction_method');
                   $product_type = $request->input('product_type');
                   $packaging_unit = $request->input('packaging_unit');
                   $issueplace = $request->input('issueplace');
                   $start = $request->input('start');
                   $limit = $request->input('limit');
                   $registration_status = $request->input('registration_status');
                   $validity_status = $request->input('validity_status');

                 //  $decision_id=$request->input('decision');

                   //filters
                   $IssueFrom = $request->input('IssueFrom');
                   $IssueTo = $request->input('IssueTo');
                   $ReceivedFrom = $request->input('ReceivedFrom');
                   $ReceivedTo = $request->input('ReceivedTo');
         

                   $limit = $request->input('limit');
                   $start = $request->input('start');
                $filters = (array)json_decode($filters);

                if(isset($filters)){
                      

                            foreach($filters as $key => $value) {
                            
                                  if($key=='t1.section_id' && validateIsNumeric($value)){
                                       $qry->where('t1.section_id',$value);
                                  }
                                   if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                                      $qry->where('t1.sub_module_id',$value);
                                  }
                                  //dates
                                  if(isset($filters['to_date'])!=null && $filters['from_date']!=null){
                                       $to_date=$filters['to_date'];
                                       $from_date=$filters['from_date'];
                          
                                  if($key=='receivedOpt' && $value != ''){
                                    if($value==1){
                                        $value='date_added';
                                     }else if($value==3){
                                       $value='submission_date';
                                     }
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                      $qry->whereRAW("date_format(t1.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                  if($key=='approvalOpt' && $value != ''){
                                     $qry->whereRAW("date_format(t19.".$value.", '%Y%-%m-%d')>= '" . formatDate($from_date) . "'");
                                     $qry->whereRAW("date_format(t19.".$value.", '%Y%-%m-%d')<= '" . formatDate($to_date) . "'");
                                  }
                                }
                                  
                            }
                    
                     }
                 if(validateIsNumeric($inpsector_title)){
                      $qry->where('t10.inspectors_title_id' , $inpsector_title);
                     }

                if(validateIsNumeric($weight_unit)){
                      $qry->where('t1.weights_units_id' , $weight_unit);
                     }
                if(validateIsNumeric($currency_id)){
                      $qry->where('t1.currency_id' , $currency_id);
                     }
                if(validateIsNumeric($destruction_site)){
                      $qry->where('t2.destruction_site_id' , $destruction_site);
                     }
                if(validateIsNumeric($destruction_method)){
                      $qry->where('t4.destructionmethod_id' , $destruction_method);
                     }
                if(validateIsNumeric($product_type)){
                      $qry->where('t1.section_id' , $product_type);
                     }
                if(validateIsNumeric($packaging_unit)){
                      $qry->where('t1.packaging_unit_id' , $packaging_unit);
                     }
                if(validateIsNumeric($issueplace)){
                      $qry->where('t1.zone_id' , $issueplace);
                     }
              if(validateIsNumeric($validity_status)){
                      $qry->where('t19.appvalidity_status_id' , $validity_status);
                     }
                if(validateIsNumeric($registration_status)){
                      $qry->where('t19.appregistration_status_id' , $registration_status);
                     }



                $filter = $request->input('filter');
               $whereClauses = array();
               $filter_string = '';
                if (isset($filter)) {
                    $filters = json_decode($filter);
                    if ($filters != NULL) {
                        foreach ($filters as $filter) {
                            switch ($filter->property) {
                                case 'reason_for_disposal' :
                                    $whereClauses[] = "t1.reason_for_disposal like '%" . ($filter->value) . "%'";
                                    break;
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'reference_no' :
                                    $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'quantity' :
                                    $whereClauses[] = "t1.quantity like '%" . ($filter->value) . "%'";
                                    break;
                                case 'total_weight' :
                                    $whereClauses[] = "t1.total_weight like '%" . ($filter->value) . "%'";
                                    break;
                                case 'market_value' :
                                    $whereClauses[] = "t1.market_value like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premise_name' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premise_reg_no' :
                                    $whereClauses[] = "t9.premise_reg_no like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'premise_email' :
                                    $whereClauses[] = "t9.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premise_tell' :
                                    $whereClauses[] = "t9.telephone like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'premise_physical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'premise_postal_address' :
                                    $whereClauses[] = "t9.postal_address like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'inpsector_name' :
                                    $whereClauses[] = "t10.inspector_name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_name' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_postal_address' :
                                    $whereClauses[] = "t13.postal_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'trader_physical_address' :
                                    $whereClauses[] = "t13.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_telephone' :
                                    $whereClauses[] = "t13.telephone_no like '%" . ($filter->value) . "%'";
                                    break;   
                                case 'trader_mobile_no' :
                                    $whereClauses[] = "t13.mobile_no like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_email_address' :
                                    $whereClauses[] = "t13.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_country' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_region' :
                                    $whereClauses[] = "t16.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'issueplace' :
                                    $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t19.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                case 'ReceivedFrom' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'ReceivedTo' :
                                    $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueFrom' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                                    break;  
                                case 'IssueTo' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                                    break;
                                case 'certificate_no' :
                                    $whereClauses[] = "t19.certificate_no like '%" . ($filter->value) . "%'";
                                    break;
                            }
                        }
                        $whereClauses = array_filter($whereClauses);
                    }
                    if (!empty($whereClauses)) {
                        $filter_string = implode(' AND ', $whereClauses);
                    }
                }

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

                      $total=$qry->get()->count();

                      if(isset($start)&&isset($limit)){
                      $results = $qry->skip($start)->take($limit)->get();
                                 }
                                 else{
                                  $results=$qry->get();
                                 }
//end if
            

                      $res = array(
                          'success' => true,
                          'results' => $results,
                          'message' => 'All is well',
                          'totalResults'=>$total
                      );

                  }catch (\Exception $exception) {
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

                    $type = $request->input('type');
                    if(isset($type)){
                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    } 
 public function getDisposalProductDetails(request $request){
        try{
           $filters = $request->input('filters');
              $qry = DB::table('tra_disposal_products as t1')
                ->LeftJoin('tra_product_information as t2','t1.product_id','t2.id')
                ->LeftJoin('par_packaging_units as t3','t1.packaging_unit_id','t3.id')
                ->LeftJoin('par_currencies as t4','t1.currency_id','t4.id')
                
                 
                  ->select('t1.product_description','t1.estimated_value', 't2.brand_name','t1.quantity','t4.name as currency');
              
                $filters = (array)json_decode($filters);
                if(isset($filters)){
                $qry->where($filters);
            }
             
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );

        }catch (\Exception $exception) {
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
          return \response()->json($res);
    } 

//export spreadsheet

 public function exportall(request $request) {
     //ad to request
      $request->request->add(['type' => 'report']);
     
      //get some variables
      $function = $request->input('function');
      $filename =$request->input('filename');
      $heading =$request->input('headingText');
      //send request to function
      $products=$this->$function($request);

      //get set headers and encode them to an array
      $header = $request->input('header');
      $sortedData=array();
      $i=0;
      $k=0;
      $temp=[];

      if(!empty($header)){
        $header=  json_decode($header, true); 
      }else{
        $oneRecord=$products->toArray();
        if(isset($oneRecord[0])){
            $array = json_decode(json_encode($oneRecord[0]), true);
            $header=array_keys($array);
       }else{
           $header=array();
       }
        
        }
      //get the columns
      foreach ($header as $uheader){
                       $temp[$i]=$uheader;
                    $i++;
                  }
     $total=count($temp);
   
     //match values
     
       foreach ($products as $udata)
            {
                       for($v=0;$v<$total-1;$v++){
                       $temp1=$temp[$v];

                       $sortedData[$k][]=$udata->$temp1;
                }
               
                $k++;  
           }
      $export = new GridExport($sortedData,$header,$heading);
      $file=Excel::raw($export, \Maatwebsite\Excel\Excel::XLSX);
$response =  array(
   'name' => $filename.".xlsx", //no extention needed
   'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($file) //mime type of used format
);
return response()->json($response);
          }

  public function getEnquiries(request $request){
    $reference=$request->reference;
    $start=$request->start;
    $limit=$request->limit;
   try{
    $qry=DB::table('tra_submissions as t1')
        ->leftJoin('users as t2','t1.usr_from','t2.id')
        ->leftJoin('users as t3','t1.usr_to','t3.id')
        ->leftJoin('users as t4','t1.released_by','t4.id')
        ->leftJoin('wb_trader_account as t5','t1.applicant_id','t5.id')
        ->leftJoin('wf_workflow_stages as t6','t1.previous_stage','t6.id')
        ->leftJoin('wf_workflow_stages as t7','t1.current_stage','t7.id')
        ->leftJoin('wf_tfdaprocesses as t8','t1.process_id','t8.id')
        ->select(DB::raw("t1.reference_no,t1.tracking_no,t1.date_released,t1.date_received,t1.date_submitted,t1.isDone,t1.isRead,CONCAT(decrypt(t2.first_name),decrypt(t2.last_name)) as from_user,CONCAT(decrypt(t3.first_name),decrypt(t3.last_name)) as to_user,CONCAT(decrypt(t4.first_name),decrypt(t4.last_name)) as submitted_by,t5.name as applicant,t6.name as previous_process,t7.name as current_process,t8.name as Process,TOTAL_WEEKDAYS(t1.date_received,t1.date_released) as total_days"));

     if(isset($reference)){
          $qry->where('t1.reference_no', '=',$reference)
               ->orWhere('t1.tracking_no','=',$reference);
     }

        $total=$qry->count();

         if(isset($start)&&isset($limit)){
                $results = $qry->skip($start)->take($limit)->get();
             }
            else{
                $results=$qry->get();
             }

                    
            $res = array(
                'success' => true,
                'results' => $results,
                'total'=>$total,
                'message' => 'All is well',
    
            );

           }catch (\Exception $exception) {
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
          return \response()->json($res);
    

    }

     public function getSectionsByDirectorate($directorate_id){
        $qry=DB::table('par_sections')->where('directorate_id',$directorate_id)->select('id')->get();
        $secArray=array();
        
              foreach ($qry as $section) {
                  $secArray[]=$section->id;
              }

              if(!empty($secArray)){
                   $sub=implode(",",$secArray);
               }
               else{
                    $sub='';
               }
             //  dd($sub);
   return $sub;
  }


//Online Submission Enquiries Functions
  public function getSubmissionEnquiriesApplications(request $req){
    $sub_module_id = $req->sub_module_id;
    $module_id = $req->module_id;
    $filter = $req->filter;
    $status_id = $req->status_id;
    $section_id = $req->section_id;
    if(validateIsNumeric($module_id)){
    $table_name = $this->getTableName($module_id);
    $con=DB::Connection('portal_db');
    $qry=$con->table($table_name.' as t1')
          ->leftJoin('wb_trader_account as t2','t1.trader_id','t2.id')
          ->leftJoin('wb_statuses as t3','t1.application_status_id','t3.id')
          
          ->select(DB::raw("t1.reference_no as Reference_No, t1.tracking_no as Tracking_No,date_format(t1.created_on, '%Y%/%m/%d') as Date_Added, t1.submission_date as Date_Submitted, t2.name as Applicant_Name, t2.postal_address as Applicant_Postal_Address, t2.email as Applicant_Email,t2.contact_person as Contact_Person, t2.telephone_no as Applicant_Telephone, t3.name as Current_Status"));

    if(validateIsNumeric($section_id)){
      $qry->where('t1.section_id',$section_id);
    }
    if(validateIsNumeric($sub_module_id)){
      $qry->where('t1.sub_module_id',$sub_module_id);
    }
    if(validateIsNumeric($status_id)){
      $qry->where('t1.application_status_id',$status_id);
    }

   $whereClauses = array();
   $filter_string = '';
    if (isset($filter)) {
        $filters = json_decode($filter);
        if ($filters != NULL) {
            foreach ($filters as $filter) {
                switch ($filter->property) {
                    case 'reference_no' :
                        $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                        break;
                    case 'tracking_no' :
                        $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                        break;
                    case 'submission_date' :
                        $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d') = '" . formatDate($filter->value) . "'";
                        break;
                    case 'applicant_name' :
                        $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                        break;
            }
          }
        }

       $whereClauses = array_filter($whereClauses);
     }
    if (!empty($whereClauses)) {
          $filter_string = implode(' AND ', $whereClauses);
         }

    if ($filter_string != '') {
      $qry->whereRAW($filter_string);
            }

    

     //distinct fields for different modules
    switch ($module_id) {
      case 1:
        $qry->addSelect('t1.product_id');
        $results=$qry->get();

        foreach ($results as $result) {
          $getDetails = (array) $this->getProductDetailsFromTable($result->product_id);

          $result->Brand_Name = $getDetails['Brand_Name'];
          $result->Product_Strength = $getDetails['Product_Strength'];
          $result->Common_Name = $getDetails['Common_Name'];
          $result->Product_Form = $getDetails['Product_Form'];

          unset($result->product_id);
        }
        break;
      case 2:
        $qry->addSelect('t1.premise_id');
        $results=$qry->get();

        foreach ($results as $result) {
          $getDetails = (array) $this->getPremiseDetailsFromTable($result->premise_id);

          $result->Premise_Name = $getDetails['Premise_Name'];
          $result->Country = $getDetails['Country'];
          $result->Region = $getDetails['Region'];
          $result->Business_Type = $getDetails['Business_Type'];
          $result->Business_Scale = $getDetails['Business_Scale'];

          unset($result->premise_id);
        }
        break;
      case 3:
        $qry->addSelect('t1.assessment_type_id','t1.manufacturing_site_id');
        $results=$qry->get();

        foreach ($results as $result) {
          $getDetails = (array) $this->getGmpDetailsFromTable($result->manufacturing_site_id, $result->assessment_type_id);

          $result->Assessment_procedure = $getDetails['assessment_procedure'];
          $result->Manufacturing_site = $getDetails['manufacturing_site'];
          $result->Premise_reg_no = $getDetails['premise_reg_no'];
          $result->Manufacturer_name = $getDetails['manufacturer_name'];
          $result->Country = $getDetails['country'];

          unset($result->assessment_type_id);
          unset($result->manufacturing_site_id);
        }
        break;
      case 4:
        $qry->addSelect('t1.sub_module_id','t1.permit_category_id','t1.import_typecategory_id','t1.permit_reason_id', 't1.port_id');
        $results=$qry->get();

        foreach ($results as $result) {
          $getDetails = (array) $this->getIEDetailsFromTable($result->sub_module_id,$result->permit_category_id,$result->import_typecategory_id,$result->permit_reason_id, $result->port_id);

          $result->Application_Type = $getDetails['type'];
          $result->Permit_Category = $getDetails['category'];
          $result->Permit_Type_Category = $getDetails['typecategory'];
          $result->Permit_Reason = $getDetails['permitreason'];
          $result->Port = $getDetails['port'];

          unset($result->sub_module_id);
          unset($result->permit_category_id);
          unset($result->import_typecategory_id);
          unset($result->permit_reason_id);
          unset($result->port_id);
        }
        break;
      case 7:
        $qry->addSelect('t1.duration_desc','t1.sponsor_id','t1.investigator_id','t1.study_title as Study_Title');
        $results=$qry->get();

        foreach ($results as $result) {
          $getDetails = (array) $this->getClinicalTrialDetailsFromTable($result->duration_desc,$result->sponsor_id,$result->investigator_id);

          $result->Duration_Desc = $getDetails['duration_desc'];
          $result->Sponsor = $getDetails['Sponsor'];
          $result->Sponsor_Email = $getDetails['Semail_address'];
          $result->Investigator = $getDetails['investigator'];
          $result->Investigator_Email = $getDetails['Iemail_address'];

          unset($result->duration_desc);
          unset($result->sponsor_id);
          unset($result->investigator_id);
        }
        break;
      case 14:
        $qry->addSelect('t1.classification_id','t1.sponsor_id','t1.product_type_id');
        $results=$qry->get();

        foreach ($results as $result) {
          $getDetails = (array) $this->getPromAdvertDetailsFromTable($result->classification_id,$result->sponsor_id,$result->product_type_id);

          $result->Classification = $getDetails['Classification'];
          $result->Sponsor = $getDetails['Sponsor'];
          $result->Sponsor_Email = $getDetails['Semail_address'];
          $result->Product_Type = $getDetails['Product_Type'];

          unset($result->classification_id);
          unset($result->sponsor_id);
          unset($result->product_type_id);
        }
        break;
      case 15:
        $qry->addSelect('t1.quantity as Disposal_Quantity','t1.total_weight as Disposal_Weight','t1.market_value as Market_Value','t1.application_code','t1.packaging_unit_id','t1.weights_units_id');
        $results=$qry->get();

        foreach ($results as $result) {
          $getDetails = (array) $this->getDisposalDetailsFromTable($result->application_code,$result->packaging_unit_id,$result->weights_units_id);

          $result->Destruction_Site = $getDetails['destruction_site'];
          $result->Destruction_Method = $getDetails['destruction_method'];
          $result->Packaging_Unit = $getDetails['packaging_unit'];
          $result->Weight_Unit = $getDetails['weight_unit'];
          $result->Inspector_Name = $getDetails['inspector_name'];
          $result->Inspector_Title = $getDetails['inspector_title'];

          unset($result->application_code);
          unset($result->packaging_unit_id);
          unset($result->weights_units_id);
        }
        break;
    }


    $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
    
            );

    }else{
       $res = array(
                  'success' => true,
                  'message' => 'No Module defined',
      
              );
   }
  return \response()->json($res);
  }

  public function getProductDetailsFromTable($product_id){
    $data = DB::table('tra_product_information as t4')
             ->leftJoin('par_common_names as t5','t4.common_name_id','t5.id')
             ->leftJoin('par_product_forms as t6','t4.product_form_id','t6.id')
             ->where('t4.id',$product_id)
             ->select('t4.brand_name as Brand_Name','t4.product_strength as Product_Strength','t5.name as Common_Name','t6.name as Product_Form')
             ->first();
    if(empty($data)){
      $data = array(
        'Brand_Name' => 'Not set',
        'Product_Strength' => 'Not set',
        'Common_Name' => 'Not set',
        'Product_Form' => 'Not set'
      );
    }
    return $data;
  }
 public function getPremiseDetailsFromTable($premise_id){
    $data= DB::table('tra_premises as t1b')
           ->LeftJoin('par_countries as t2','t1b.country_id','t2.id')
           ->LeftJoin('par_regions as t3','t1b.region_id','t3.id')
           ->LeftJoin('par_business_types as t5','t1b.business_type_id','t5.id')
           ->LeftJoin('par_business_scales as t6','t1b.business_scale_id','t6.id')
           ->where('t1b.id',$premise_id)
           ->select('t1b.name as Premise_Name','t2.name as Country','t3.name as Region','t5.name as Business_Type','t6.name as Business_Scale')
             ->first();

    if(empty($data)){
      $data = array(
        'Premise_Name' => 'Not set',
        'Country' => 'Not set',
        'Region' => 'Not set',
        'Business_Type' => 'Not set',
        'Business_Scale'=> 'Not Set'
      );
    }
    return $data;
  }
 public function getGmpDetailsFromTable($manufacturing_site_id,$assessment_type_id){
    $data= DB::table('tra_manufacturing_sites as t1')
           ->rightJoin('par_gmp_assessment_types as t2',function($join) use ($assessment_type_id){
            $join->where('t2.id',$assessment_type_id);
           })
           ->LeftJoin('tra_manufacturers_information as t4','t1.manufacturer_id','t4.id')
           ->LeftJoin('par_countries as t5','t1.country_id','t5.id')
           ->where('t1.id',$manufacturing_site_id)

           ->select('t2.name as assessment_procedure','t1.name as manufacturing_site','t1.premise_reg_no','t4.name as manufacturer_name','t5.name as country')
             ->first();

    if(empty($data)){
      $data = array(
        'assessment_procedure' => 'Not set',
        'manufacturing_site' => 'Not set',
        'premise_reg_no' => 'Not set',
        'manufacturer_name' => 'Not set',
        'country'=> 'Not Set'
      );
    }
    return $data;
  }
  public function getIEDetailsFromTable($sub_module_id,$permit_category_id,$import_typecategory_id,$permit_reason_id, $port_id){

    $data= DB::table('sub_modules as t2')
           ->LeftJoin('par_permit_category as t3',function($join) use($permit_category_id){
              $join->where('t3.id',$permit_category_id);
           })
           ->LeftJoin('par_permit_typecategories as t4',function($join) use($import_typecategory_id){
              $join->where('t4.id',$import_typecategory_id);
           })
           ->LeftJoin('par_permit_reasons as t5',function($join) use($permit_reason_id){
              $join->where('t5.id',$permit_reason_id);
           })
           ->LeftJoin('par_ports_information as t6',function($join) use($port_id){
              $join->where('t6.id',$port_id);
           })
           ->where('t2.id',$sub_module_id)

           ->select('t2.name as type','t3.name as category','t4.name as typecategory','t5.name as permitreason','t6.name as port')
             ->first();

    if(empty($data)){
      $data = array(
        'type' => 'Not set',
        'category' => 'Not set',
        'typecategory' => 'Not set',
        'permitreason' => 'Not set',
        'port'=> 'Not Set'
      );
    }
    return $data;
  }

  public function getClinicalTrialDetailsFromTable($duration_desc,$sponsor_id,$investigator_id){

    $data= DB::table('clinical_trial_duration_desc as t2')
           ->LeftJoin('clinical_trial_personnel as t3',function($join) use($sponsor_id){
              $join->where('t3.id',$sponsor_id);
           })
           ->LeftJoin('clinical_trial_personnel as t4',function($join) use($investigator_id){
              $join->where('t4.id',$investigator_id);
           })
           ->where('t2.id',$duration_desc)

           ->select('t2.name as duration_desc','t3.name as Sponsor','t3.email as Semail_address','t4.name as investigator','t4.email as Iemail_address')
             ->first();

    if(empty($data)){
      $data = array(
        'duration_desc' => 'Not set',
        'Sponsor' => 'Not set',
        'Semail_address' => 'Not set',
        'investigator' => 'Not set',
        'Iemail_address'=> 'Not Set'
      );
    }
    return $data;
  }

  public function getPromAdvertDetailsFromTable($classification_id,$sponsor_id,$product_type_id){

    $data= DB::table('par_classifications as t2')
           ->LeftJoin('tra_promotionaladvert_personnel as t3',function($join) use($sponsor_id){
              $join->where('t3.id',$sponsor_id);
           })
           ->LeftJoin('par_product_types as t4',function($join) use($product_type_id){
              $join->where('t4.id',$product_type_id);
           })
           ->where('t2.id',$classification_id)

           ->select('t2.name as Classification','t3.name as Sponsor','t3.email as Semail_address','t4.name as Product_Type')
             ->first();

    if(empty($data)){
      $data = array(
        'Classification' => 'Not set',
        'Sponsor' => 'Not set',
        'Semail_address' => 'Not set',
        'Product_Type' => 'Not set'
      );
    }
    return $data;
  }

  public function getDisposalDetailsFromTable($application_code,$packaging_unit_id,$weights_units_id){

    $data= DB::table('tra_destruction_exercisesites as t2')
           ->LeftJoin('par_disposaldestruction_sites as t3','t2.destruction_site_id','t3.id')
           ->LeftJoin('tra_methodsof_destructions as t4','t2.application_code','t4.application_code')
           ->LeftJoin('par_destruction_methods as t5','t4.destructionmethod_id','t5.id')
           ->LeftJoin('par_packaging_units as t6', function($join) use($packaging_unit_id){
             $join->where('t6.id',$packaging_unit_id);
           })
           ->LeftJoin('par_weights_units as t7', function($join) use($weights_units_id){
             $join->where('t7.id',$weights_units_id);
           })
           ->LeftJoin('tra_disposal_inspectors as t10','t2.application_code','t10.application_code')
           ->LeftJoin('par_disposal_inspectors_titles as t11','t10.inspectors_title_id','t11.id')
           ->where('t2.application_code',$application_code)

           ->select('t3.name as destruction_site', 't5.name as destruction_method','t6.name as packaging_unit','t7.name as weight_unit','t10.inspector_name','t11.name as inspector_title')
             ->first();

    if(empty($data)){
      $data = array(
        'destruction_site' => 'Not set',
        'destruction_method' => 'Not set',
        'packaging_unit' => 'Not set',
        'weight_unit' => 'Not set',
        'inspector_name' => 'Not set',
        'inspector_title' => 'Not set'
      );
    }
    return $data;
  }

         
   
//end of enquiries online submission functions


  public function getOnlineSubmissionStatuses(request $req){
  
    $con=DB::Connection('portal_db');
    $results=$con->table('wb_statuses as t1')->get();

    return \response()->json($results);
  }

public function getTableName($module){

          $qry=DB::table('modules')
                ->where('id',$module)->first();

          $table=$qry->portaltable_name;

        return $table;
   }
   
public function getUploadedDocumentPerApplication(request $request){
       $start=$request->start;
       $limit=$request->limit;
       $doc_type=$request->doc_type;
       $application_code=$request->application_code;
       
       if(isset($application_code)){
       $qry=DB::table('tra_application_uploadeddocuments as t2')
             ->leftJoin('tra_documentupload_requirements as t3','t2.document_requirement_id','t3.id')
             ->leftJoin('wb_trader_account as t4','t2.uploaded_by','t4.id')
             ->leftJoin('par_document_types as t5','t3.document_type_id','t5.id')
             ->where('t2.application_code',$application_code)
             ->select('t2.file_name','t2.initial_file_name','t2.file_type','t2.remarks','t2.uploaded_on','t5.name as document_type','t4.name as uploaded_by');

       if(validateIsNumeric($doc_type)){
         $qry->where("t3.document_type_id", $doc_type); 

        }
            $results = $qry->get();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        }else{
          $res=array(
              'success'=>false,
              'results'=>null,
              'message'=>'Application Code is not set'
          );
        }
  return \response()->json($res);
}
public function getSurvellianceSpreadsheetApplications(Request $request)
{
  try{
  $qry = DB::table('tra_surveillance_applications as t1')
        ->leftJoin('pms_program_implementationplan as t2','t1.program_implementation_id','t2.id')
        ->leftJoin('pms_program_details as t3', 't2.program_id', '=', 't3.id')
        ->join('tra_samplecollection_sites as t4', 't1.sample_site_id', '=', 't4.id')
        ->leftJoin('pms_program_samplingsites as t5', 't1.sampling_site_id', '=', 't5.id')
        ->leftJoin('par_business_types as t6', 't5.sampling_site_id', '=', 't6.id')
        ->leftJoin('par_regions as t7', 't1.region_id', '=', 't7.id')
        ->leftJoin('par_districts as t8', 't1.district_id', '=', 't8.id')
        ->leftJoin('par_countries as t9', 't4.country_id', '=', 't9.id')
        ->leftJoin('par_regions as t10', 't4.region_id', '=', 't10.id')
        ->leftJoin('par_districts as t11', 't4.district_id', '=', 't11.id')
        ->leftJoin('par_business_scales as t12', 't4.business_scale_id', '=', 't12.id')
        ->LeftJoin('wb_trader_account as t13','t1.applicant_id','t13.id')
        ->LeftJoin('par_countries as t14','t13.country_id','t14.id')
        ->LeftJoin('par_regions as t15','t13.region_id','t15.id')
        ->LeftJoin('par_zones as t16','t1.zone_id','t16.id')
        ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
        ->LeftJoin('par_approval_decisions as t20','t19.decision_id','t20.id')

        ->select('t1.id as application_id','t1.reference_no','t1.tracking_no','t1.program_implementation_id','t1.application_code','t2.program_implementation as annual_plan_implementation','t3.name as program_name','t3.description as program_description','t2.implementationstart_date as implementation_start_date','t2.implementationend_date as implementation_end_date','t6.name as sampling_site_category','t7.name as region_name ','t8.name as district','t4.name as site_name','t9.name as site_country','t10.name as site_region_name','t11.name as site_district','t4.email as email_address','t4.postal_address','t4.physical_address','t4.telephone as telephone_no','t4.fax','t4.website','t4.street','t12.name as business_scale','t4.gps_coordinate','t13.name as Trader','t13.postal_address as TraderPostalA','t13.physical_address as TraderPhysicalA','t13.telephone_no as TraderTell','t13.mobile_no as TraderMobile','t13.email_address as TraderEmail','t14.name as TraderCountry','t15.name as TraderRegion','t19.expiry_date as CertExpiryDate','t19.certificate_issue_date as CertIssueDate','t16.name as issueplace','t19.certificate_issue_date as IssueFrom','t19.certificate_issue_date as IssueTo','t1.date_received as ReceivedFrom','t1.date_received as ReceivedTo', 't20.name as registration_status')
        ->groupBy('t1.application_code');

         $filters = $request->input('filters');
         $region_id = $request->input('region_id');
         $district_id = $request->input('district_id');
         $site_country_id = $request->input('site_country_id');
         $site_region_id = $request->input('site_region_id');
         $site_district_id = $request->input('site_district_id');
         $business_scale_id = $request->input('business_scale_id');
         $issueplace = $request->input('issueplace');
         //$decision_id=$request->input('decision');
         $decision_id=$request->input('registration_status');

         //filters
         $IssueFrom = $request->input('IssueFrom');
         $IssueTo = $request->input('IssueTo');
         $ReceivedFrom = $request->input('ReceivedFrom');
         $ReceivedTo = $request->input('ReceivedTo');


         $limit = $request->input('pageSize');
         $start = $request->input('start');
         $filters = (array)json_decode($filters);

        if(isset($filters)){
              

                    foreach($filters as $key => $value) {
                    
                          if($key=='t1.section_id' && validateIsNumeric($value)){
                               $qry->where('t1.section_id',$value);
                          }
                           if($key=='t1.sub_module_id' && validateIsNumeric($value)){
                              $qry->where('t1.sub_module_id',$value);
                          } 
                    }
            
             }
        if(isset($decision_id) && $decision_id != ''){
              $qry->where('t19.decision_id' , $decision_id);
             }

        if(isset($district_id) && $district_id != ''){
              $qry->where('t1.district_id' , $district_id);
             }
        if(isset($region_id) && $region_id != ''){
              $qry->where('t1.region_id' , $region_id);
             }
        if(isset($site_country_id) && $site_country_id != ''){
              $qry->where('t4.country_id' , $site_country_id);
             }
        if(isset($site_region_id) && $site_region_id != ''){
              $qry->where('t4.region_id' , $site_region_id);
             }
        if(isset($site_district_id) && $site_district_id != ''){
              $qry->where('t4.district_id' , $site_district_id);
             }
        if(isset($business_scale_id) && $business_scale_id != ''){
              $qry->where('t4.business_scale_id' , $business_scale_id);
             }
        if(isset($issueplace) && validateIsNumeric($issueplace)){
              $qry->where('t1.zone_id' , $issueplace);
             }
      



       $filter = $request->input('filter');
       $whereClauses = array();
       $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'annual_plan_implementation' :
                            $whereClauses[] = "t2.program_implementation like '%" . ($filter->value) . "%'";
                            break;
                        case 'program_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'program_description' :
                            $whereClauses[] = "t3.description like '%" . ($filter->value) . "%'";
                            break;
                        case 'implementation_start_date' :
                            $whereClauses[] = "date_format(t2.implementationstart_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;
                        case 'implementation_end_date' :
                            $whereClauses[] = "date_format(t2.implementationend_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;
                        case 'email_address' :
                            $whereClauses[] = "t4.email like '%" . ($filter->value) . "%'";
                            break;
                        case 'postal_address' :
                            $whereClauses[] = "t4.postal_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'physical_address' :
                            $whereClauses[] = "t4.physical_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'telephone_no' :
                            $whereClauses[] = "t4.telephone like '%" . ($filter->value) . "%'";
                            break;   
                        case 'fax' :
                            $whereClauses[] = "t4.fax like '%" . ($filter->value) . "%'";
                            break;
                        case 'website' :
                            $whereClauses[] = "t4.website like '%" . ($filter->value) . "%'";
                            break;  
                        case 'street' :
                            $whereClauses[] = "t4.street like '%" . ($filter->value) . "%'";
                            break;
                        case 'sampling_site_category' :
                            $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                            break; 
                        case 'gps_coordinate' :
                            $whereClauses[] = "t4.gps_coordinate like '%" . ($filter->value) . "%'";
                            break; 
                        case 'Trader' :
                            $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'TraderPostalA' :
                            $whereClauses[] = "t13.postal_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'TraderPhysicalA' :
                            $whereClauses[] = "t13.physical_address like '%" . ($filter->value) . "%'";
                            break;  
                        case 'TraderEmail' :
                            $whereClauses[] = "t13.email_address like '%" . ($filter->value) . "%'";
                            break; 
                        case 'TraderTell' :
                            $whereClauses[] = "t13.telephone_no like '%" . ($filter->value) . "%'";
                            break; 
                        case 'TraderMobile' :
                            $whereClauses[] = "t13.mobile_no like '%" . ($filter->value) . "%'";
                            break; 
                        case 'TraderCountry' :
                            $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'TraderRegion' :
                            $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                            break; 
                        case 'CertIssueDate' :
                            $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;  
                        case 'CertExpiryDate' :
                            $whereClauses[] = "date_format(t19.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;
                        case 'ReceivedFrom' :
                            $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')>= '" . formatDate($filter->value) . "'";
                            break;  
                        case 'ReceivedTo' :
                            $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d')<= '" . formatDate($filter->value) . "'";
                            break;  
                        case 'IssueFrom' :
                            $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')>='" . formatDate($filter->value) . "'";
                            break;  
                        case 'IssueTo' :
                            $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')<='" . formatDate($filter->value) . "'";
                            break;
                        case 'submission_date' :
                            $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d') ='" . formatDate($filter->value) . "'";
                            break;
                    }
                }

                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }

      if ($filter_string != '') {

        $qry->whereRAW($filter_string);
              }

              $total=$qry->get()->count();

             if(isset($start)&&isset($limit)){
              $results = $qry->skip(0)->take($limit)->get();
                        }
                        else{
                         $results=$qry->get();
                        }
  //end if
    
              $res = array(
                  'success' => true,
                  'results' => $results,
                  'message' => 'All is well',
                  'totalResults'=>$total
              );

          }catch (\Exception $exception) {
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

            $type = $request->input('type');
            if(isset($type)){
              return $results;
            }else{
             return \response()->json($res);
            }
    }
  public function getSurvellianceSampleandProductDetails(Request $req)
  {
    try{
          $application_id = $req->application_id;

          $qry = DB::table('tra_surveillance_sample_details as t')
                ->join('pms_program_plans as t1','t.pms_plan_id','t1.id')
                ->join('pms_program_details as t9', 't1.program_id', '=', 't9.id')
                ->leftJoin('par_business_types as t2', 't1.sampling_site_id', '=', 't2.id')
                ->leftJoin('par_common_names as t3', 't1.product_id', '=', 't3.id')
                ->leftJoin('par_product_categories as t4', 't1.product_category_id', '=', 't4.id')
                ->leftJoin('par_dosage_forms as t5', 't1.dosage_form_id', '=', 't5.id')
                ->leftJoin('par_product_forms as t51', 't1.product_form_id', '=', 't51.id')
                ->leftJoin('par_device_types as t52', 't1.device_type_id', '=', 't52.id')
                ->leftJoin('par_si_units as t6', 't1.si_unit_id', '=', 't6.id')
                ->leftJoin('par_containers as t7', 't1.container_id', '=', 't7.id')
                ->leftJoin('par_packaging_units as t8', 't1.packaging_unit_id', '=', 't8.id')
                
                ->leftJoin('par_regions as t10', 't1.region_id', '=', 't10.id')
                
                ->leftJoin('par_districts as t11', 't1.district_id', '=', 't11.id')
                ->select(DB::raw("t1.*,t1.id as sample_id,t2.name as sampling_site,t3.name as product,t4.name as category_name,t5.name as dosage_form,t9.name as pms_program,
                         t9.start_date,t9.end_date,CONCAT_WS(' of ',t7.name,CONCAT(t1.unit_pack,t8.name)) as unit_pack,CONCAT(t1.strength,t6.name) as strength,
                         t51.name as product_form,t52.name as device_type,t1.number_of_brand as brand_collected,t1.number_of_batch as batch_per_brand,t1.number_of_unitpack as unit_pack_per_batch,(t1.number_of_brand*t1.number_of_batch*t1.number_of_unitpack) as total_samples"));
            
            if (validateIsNumeric($application_id)) {
                $qry->where('t.application_id', $application_id);
                $results = $qry->get();
            }
            else{
                $results = array();
            }
          
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
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
    public function getSampleDetails(Request $req){
        try {
         

          $sample_id = $req->sample_id;
          $result = DB::table('tra_surveillance_sample_details as t1')
                  ->leftJoin('par_manufacturers_information as t2','t1.manufacturer_id','t2.id')
                  ->leftJoin('par_storage_conditions as t3','t1.storage_condition_id','t3.id')
                  ->leftJoin('par_seal_types as t4','t1.seal_condition_id','t4.id')
                  ->leftJoin('par_samplingreasons as t5','t1.sampling_reason_id','t5.id')
                  ->leftJoin('wb_trader_account as t6','t1.sample_collector_id','t6.id')
                  ->leftJoin('par_sample_application_types as t7','t1.sample_application_id','t7.id')
                  ->leftJoin('par_packaging_units as t8','t1.packaging_units_id','t8.id')
                  ->leftJoin('par_classifications as t9','t1.classification_id','t9.id')

                  ->select('t1.batch_no','t1.id as sample_id','t1.sample_name','t1.sample_code','t1.certificate_no as registration_no','t1.manufacturing_date','t1.remarks','t1.expiry_date','t1.packaging_size','t1.shelf_life','t1.date_collected as collection_date','t9.name as classification','t1.collected_samples','t1.shelf_lifeafter_opening','t1.product_description','t1.collectionsite_storage_condition as site_storage_condition','t2.name as manufacturer','t3.name as product_storage_condition','t4.name as seal_pack_condition','t5.name as sampling_reason','t6.name as sample_collector','t7.name as sample_application_type','t8.name as packaging_unit')
                  ->where('t1.id',$sample_id)
                  ->get();

            $res = array(
                'success' => true,
                'results' => $result,
                'message' => 'All is well'
            );

          
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
public function getSurvellianceSampleSpreadsheetApplications(Request $request){
  try{
    $qry = DB::table('tra_surveillance_applications as t1')
                //implementation
                ->leftJoin('pms_program_implementationplan as tpi', 't1.program_implementation_id', '=', 'tpi.id')
                ->leftJoin('pms_program_details as tpd', 'tpi.program_id', '=', 'tpd.id')
                //sampling site
                ->leftJoin('tra_samplecollection_sites as tss', 't1.sample_site_id', 'tss.id')
                ->leftJoin('par_business_scales as tssb', 'tss.business_scale_id', 'tssb.id')
                ->leftJoin('wb_trader_account as tta', 'tss.applicant_id', '=', 'tta.id')
                ->leftJoin('par_regions as ttar', 'tta.region_id', '=', 'ttar.id')
                ->leftJoin('par_countries as ttac', 'tta.country_id', '=', 'ttac.id')
                ->leftJoin('par_regions as tsr', 'tss.region_id', '=', 'tsr.id')
                ->leftJoin('par_regions as tsd', 'tss.district_id', '=', 'tsd.id')
                ->leftJoin('par_regions as tsdc', 'tss.country_id', '=', 'tsdc.id')
                //implementation plan product
                ->leftJoin('pms_program_plans as tpp', 'tpp.program_implementation_id', '=', 't1.program_implementation_id')
                ->leftJoin('par_business_types as tbt', 'tpp.sampling_site_id', '=', 'tbt.id')
                ->leftJoin('par_common_names as tcn', 'tpp.product_id', '=', 'tcn.id')
                ->leftJoin('par_product_categories as tpc', 'tpp.product_category_id', '=', 'tpc.id')
                ->leftJoin('par_dosage_forms as tdc', 'tpp.dosage_form_id', '=', 'tdc.id')
                ->leftJoin('par_product_forms as tpf', 'tpp.product_form_id', '=', 'tpf.id')
                ->leftJoin('par_device_types as tdt', 'tpp.device_type_id', '=', 'tdt.id')
                ->leftJoin('par_si_units as tsu', 'tpp.si_unit_id', '=', 'tsu.id')
                ->leftJoin('par_containers as tc', 'tpp.container_id', '=', 'tc.id')
                ->leftJoin('par_packaging_units as tpu', 'tpp.packaging_unit_id', '=', 'tpu.id')

                //sample details
                ->leftjoin('tra_surveillance_sample_details as tssd', 't1.id','tssd.application_id')
                ->leftJoin('par_samplingreasons as tsreason', 'tssd.sampling_reason_id', 'tsreason.id')
                ->leftjoin('tra_manufacturers_information as tmi', 'tssd.manufacturer_id', 'tmi.id')
                ->leftjoin('users as users', 'tssd.sample_collector_id', 'users.id')
                ->leftJoin('par_classifications as t9','tssd.classification_id','t9.id')
                ->leftJoin('par_packaging_units as t10','tssd.packaging_units_id','t10.id')
                ->leftJoin('par_storage_conditions as t11','tssd.storage_condition_id','t11.id')
                ->leftJoin('par_seal_types as t12','tssd.seal_condition_id','t12.id')
                ->leftJoin('par_sample_application_types as t13','tssd.sample_application_id','t13.id')
                ->leftJoin('pms_program_samplingsites as t14', 't1.program_id', '=', 't14.program_id')
                ->leftJoin('par_site_levels as t15', 't14.site_level_id', '=', 't15.id')
                ->leftJoin('par_zones as t16', 't1.zone_id', '=', 't16.id')
                ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
                ->leftJoin('par_approval_decisions as t20','t19.decision_id','t20.id')
                ->leftJoin('tra_pmslabresult_recommendations as t21','tssd.id','t21.sample_id')
                ->leftJoin('par_pmsevaluation_decisions as t22','t21.decision_id','t22.id')
                ->leftJoin('par_pmsscreening_decisions as t23', 't21.decision_id', '=', 't23.id')
                ->leftJoin('par_pmsanalysis_decisions as t24', 't21.decision_id', '=', 't24.id')
                ->leftJoin('tra_sampleanalysis_requests as t25', 't1.application_code', '=', 't25.application_code')
                ->leftJoin('par_sampleanalysis_status as t26', 't25.status_id', '=', 't26.id')
                ->leftJoin('users as t27', 't25.requested_by', '=', 't27.id')
                ->leftJoin('par_survsample_analysis_types as t28', 't25.analysis_type_id', '=', 't28.id')

                ->select('t1.application_code','t1.reference_no','t1.tracking_no','t1.id as application_id','t1.program_implementation_id','tssd.sample_refno' , 'tssd.sample_name' , 'tssd.sample_code' , 'tdc.name as dosage_form', 'tpf.name as product_form' , 'tdt.name as device_type' ,
                  'tssd.date_collected' , 't9.name as classification' , 'tssd.packaging_size' , 't10.name as packaging_unit' , 'tssd.collected_samples' , 'tssd.batch_no' , 'tmi.name as manufacturer' , 'tssd.manufacturing_date' , 'tssd.expiry_date' , 't11.name as storage' , 'tssd.collectionsite_storage_condition' , 't12.name as seal_condition' , 'tssd.shelf_life' , 'tssd.shelf_lifeafter_opening' , 'tsreason.name as sampling_reason' ,DB::raw("'' as Classification, '' as common_name, CONCAT_WS(' ', decrypt(users.first_name), decrypt(users.last_name) ) as collector") , 't13.name as sample_type' , 'tpd.name as program_name' , 'tpd.start_date as program_start_date' , 'tpd.end_date as program_end_date' , 'tpd.description as program_description' , 'tcn.name as product_name' , 'tsr.name as pms_region_name' , 'tsd.name as pms_district' , 'tbt.name as site_name' , 'tssb.name as sampling_site_category' , 'tss.email as site_email' , 'tsdc.name as site_country' , 'tsr.name as site_region_name' , 'tsd.name as site_district' , 'tss.email as email_address' , 'tss.postal_address as postal_address' , 'tss.physical_address as physical_address' , 'tss.telephone as telephone_no' , 'tss.fax' , 'tss.website' , 'tss.street' , 'tpi.program_implementation as implementation_identity' , 'tpi.year_of_implementation as implementation_year' , 'tpi.implementationstart_date as implementation_start_date' , 'tpi.implementationend_date as implementation_end_date' , 'tta.name as Trader' , 'tta.postal_address as TraderPostalA' , 'tta.physical_address as TraderPhysicalA' , 'tta.telephone_no as TraderTell' , 'tta.mobile_no as TraderMobile' , 'tta.email as TraderEmail' , 'ttac.name as TraderCountry' , 'ttar.name as TraderRegion' ,'t15.name as site_level','t19.expiry_date as CertExpiryDate','t19.certificate_issue_date as CertIssueDate','t16.name as issueplace','t19.certificate_issue_date as IssueFrom','t19.certificate_issue_date as IssueTo','t1.date_received as ReceivedFrom','t1.date_received as ReceivedTo','t20.name as registration_status', 't22.name as pir_recommendation','t21.comments as pir_comment', 't21.created_on as pir_date', 't23.name as screening_recommendation','t24.name as conformatory_recommendation', 't25.limsreference_no','t25.requested_on', DB::raw("CONCAT_WS(' ', decrypt(t27.first_name), decrypt(t27.last_name)) as request_by"), 't28.name as analysis_type', 't26.name as sample_analysis_status' )
                ->groupBy('t1.application_code');
        $filters = $request->input('filters');
         $pms_region_name = $request->input('pms_region_name');
         $district_id = $request->input('district_id');
         $site_country_id = $request->input('site_country_id');
         $site_region_id = $request->input('site_region_id');
         $site_district_id = $request->input('site_district_id');
         $business_scale_id = $request->input('business_scale_id');
         $issueplace = $request->input('issueplace');
         $decision_id=$request->input('decision');
         $pir_recommendation_id=$request->input('pir_recommendation_id');
         $screening_recommendation_id=$request->input('screening_recommendation_id');
         $conformatory_recommendation_id=$request->input('conformatory_recommendation_id');
         $analysis_type_id=$request->input('analysis_type_id');
         $sample_analysis_status_id=$request->input('sample_analysis_status_id');

         //filters
         $IssueFrom = $request->input('IssueFrom');
         $IssueTo = $request->input('IssueTo');
         $ReceivedFrom = $request->input('ReceivedFrom');
         $ReceivedTo = $request->input('ReceivedTo');


         $limit = $request->input('pageSize');
         $start = $request->input('start');
         $filters = (array)json_decode($filters);

        if(isset($filters)){
              

                    foreach($filters as $key => $value) {
                    
                          if($key=='section_id' && validateIsNumeric($value)){
                               $qry->where('t1.section_id',$value);
                          }
                           if($key=='sub_module_id' && validateIsNumeric($value)){
                              $qry->where('t1.sub_module_id',$value);
                          } 
                    }
            
             }
        if(isset($decision_id) && $decision_id != ''){
              $qry->where('t19.decision_id' , $decision_id);
             }

        if(isset($district_id) && $district_id != ''){
              $qry->where('tss.district_id' , $district_id);
             }
        if(isset($pms_region_name) && $pms_region_name != ''){
              $qry->where('tss.region_id' , $pms_region_name);
             }
        if(isset($site_country_id) && $site_country_id != ''){
              $qry->where('tss.country_id' , $site_country_id);
             }
        if(isset($site_region_id) && $site_region_id != ''){
              $qry->where('tss.region_id' , $site_region_id);
             }
        if(isset($site_district_id) && $site_district_id != ''){
              $qry->where('tss.district_id' , $site_district_id);
             }
        if(isset($business_scale_id) && $business_scale_id != ''){
              $qry->where('tss.business_scale_id' , $business_scale_id);
             }
        if(isset($issueplace) && validateIsNumeric($issueplace)){
              $qry->where('t16.zone_id' , $issueplace);
             }
        if(isset($pir_recommendation_id) && validateIsNumeric($pir_recommendation_id)){
              $qry->where('t22.id' , $pir_recommendation_id);
             }
        if(isset($screening_recommendation_id) && validateIsNumeric($screening_recommendation_id)){
              $qry->where('t23.id' , $screening_recommendation_id);
             }
        if(isset($conformatory_recommendation_id) && validateIsNumeric($conformatory_recommendation_id)){
              $qry->where('t24.id' , $conformatory_recommendation_id);
             }
        if(isset($analysis_type_id) && validateIsNumeric($analysis_type_id)){
              $qry->where('t25.analysis_type_id' , $analysis_type_id);
             }
        if(isset($sample_analysis_status_id) && validateIsNumeric($sample_analysis_status_id)){
              $qry->where('t25.status_id' , $sample_analysis_status_id);
             }
      



       $filter = $request->input('filter');
       $whereClauses = array();
       $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                    
                        case 'tracking_no' :
                            $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'reference_no' :
                            $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'product_name' :
                            $whereClauses[] = "tcn.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'sample_name' :
                            $whereClauses[] = "tssd.sample_name like '%" . ($filter->value) . "%'";
                            break;
                        case 'sample_code' :
                            $whereClauses[] = "tssd.sample_code like '%" . ($filter->value) . "%'";
                            break;
                        case 'date_collected' :
                            $whereClauses[] = "date_format(tssd.date_collected, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;
                        case 'batch_no' :
                            $whereClauses[] = "tssd.batch_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'site_name' :
                            $whereClauses[] = "tbt.name like '%" . ($filter->value) . "%'";
                        case 'site_email' :
                            $whereClauses[] = "tss.email like '%" . ($filter->value) . "%'";
                            break;
                        case 'manufacturer' :
                            $whereClauses[] = "tmi.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'implementation_identity' :
                            $whereClauses[] = "tpi.program_implementation like '%" . ($filter->value) . "%'";
                            break;
                        case 'program_name' :
                            $whereClauses[] = "tpd.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'program_start_date' :
                            $whereClauses[] = "date_format(tpd.start_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;
                        case 'program_end_date' :
                            $whereClauses[] = "date_format(tpd.end_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;
                        case 'program_description' :
                            $whereClauses[] = "tpd.description like '%" . ($filter->value) . "%'";
                            break;
                        case 'implementation_start_date' :
                            $whereClauses[] = "date_format(tpi.implementationstart_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;
                        case 'implementation_year' :
                            $whereClauses[] = "tpi.year_of_implementation like '%" . ($filter->value) . "%'";
                            break;
                        case 'implementation_end_date' :
                            $whereClauses[] = "date_format(tpi.implementationend_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                            break;
                        case 'email_address' :
                            $whereClauses[] = "tss.email like '%" . ($filter->value) . "%'";
                            break;
                        case 'postal_address' :
                            $whereClauses[] = "tss.postal_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'physical_address' :
                            $whereClauses[] = "tss.physical_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'telephone_no' :
                            $whereClauses[] = "tss.telephone like '%" . ($filter->value) . "%'";
                            break;   
                        case 'fax' :
                            $whereClauses[] = "tss.fax like '%" . ($filter->value) . "%'";
                            break;
                        case 'website' :
                            $whereClauses[] = "tss.website like '%" . ($filter->value) . "%'";
                            break;  
                        case 'street' :
                            $whereClauses[] = "tss.street like '%" . ($filter->value) . "%'";
                            break;
                        case 'sampling_site_category' :
                            $whereClauses[] = "tssb.name like '%" . ($filter->value) . "%'";
                            break; 
                        case 'site_level' :
                            $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                            break;
                        
                        case 'Trader' :
                            $whereClauses[] = "tta.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'TraderPostalA' :
                            $whereClauses[] = "tta.postal_address like '%" . ($filter->value) . "%'";
                            break;
                        case 'TraderPhysicalA' :
                            $whereClauses[] = "tta.physical_address like '%" . ($filter->value) . "%'";
                            break;  
                        case 'TraderEmail' :
                            $whereClauses[] = "tta.email_address like '%" . ($filter->value) . "%'";
                            break; 
                        case 'TraderTell' :
                            $whereClauses[] = "tta.telephone_no like '%" . ($filter->value) . "%'";
                            break; 
                        case 'TraderMobile' :
                            $whereClauses[] = "tta.mobile_no like '%" . ($filter->value) . "%'";
                            break; 
                        case 'TraderCountry' :
                            $whereClauses[] = "ttac.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'TraderRegion' :
                            $whereClauses[] = "ttar.name like '%" . ($filter->value) . "%'";
                            break; 
                       
                        case 'submission_date' :
                            $whereClauses[] = "date_format(t1.submission_date, '%Y%-%m-%d') ='" . formatDate($filter->value) . "'";
                            break;
                        case 'pir_date' :
                            $whereClauses[] = "date_format(t21.created_on, '%Y%-%m-%d') ='" . formatDate($filter->value) . "'";
                            break;
                        case 'requested_on' :
                            $whereClauses[] = "date_format(t25.requested_on, '%Y%-%m-%d') ='" . formatDate($filter->value) . "'";
                            break;
                        case 'limsreference_no' :
                            $whereClauses[] = "t25.limsreference_no like '%" . ($filter->value) . "%'";
                            break; 
                        case 'request_by' :
                            $whereClauses[] = "CONCAT_WS(' ',decrypt(t27.first_name),decrypt(t27.last_name)) like '%" . ($filter->value) . "%'";
                            break; 
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }

      if ($filter_string != '') {
        $qry->whereRAW($filter_string);
              }

              $total=$qry->get()->count();

              if(isset($start)&&isset($limit)){
              $results = $qry->skip($start)->take($limit)->get();
                         }
                         else{
                          $results=$qry->get();
                         }
  //end if
   

              $res = array(
                  'success' => true,
                  'results' => $results,
                  'message' => 'All is well',
                  'totalResults'=>$total
              );
          $type = $request->input('type');
          if(isset($type)){
              return $results;
            }
          }catch (\Exception $exception) {
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
        return \response()->json($res);
        
      }
    public function assignUsertoEnquiryApplication(Request $req){
    $submission_id = $req->submission_id;
    $to_usr = $req->to_user;
    $current_stage = $req->current_stage;
    $user_id = \Auth::user()->id;
    $res = array();
    try{
    if(validateIsNumeric($user_id)){
        //update
         DB::table('tra_submissions')->where(['id'=>$submission_id])->update(array('usr_to'=>$to_usr,'isRead'=>0));
      //log
              DB::table('tra_applicationprocess_alterations')->insert(array(
                          'submission_id'=>$submission_id,
                          'effected_by'=>$user_id,
                          'task_type_id'=>0,
                          'effected_on'=>Carbon::now(),
                          'reason'=>"Assaigned to a user from enquiry"
                      ));
              $res = array(
                  'success' => true,
                  'message' => "Saved successfully"
              );
          }
        if(validateIsNumeric($current_stage)){
          DB::table('tra_submissions')->where(['id'=>$submission_id])->update(['current_stage'=>$current_stage]);
    //log
            DB::table('tra_applicationprocess_alterations')->insert(array(
                        'submission_id'=>$submission_id,
                        'effected_by'=>$user_id,
                        'task_type_id'=>0,
                        'effected_on'=>Carbon::now(),
                        'reason'=>"Assaigned to a stage from enquiry"
                    ));
            $res = array(
                'success' => true,
                'message' => "Saved successfully"
            );
          }
      if(empty($res)){ 
        $res = array(
                'success' => true,
                'message' => "No changes were requested"
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

       return \response()->json($res);
}
 //export functions 
   public function exportData(request $req){
        $req->request->add(['type' => 'report']);
        //data
        $function=$req->function;
        $response=$this->$function($req);
        //$data=$response['results'];
        //$heading=$response['headingText'];
        $heading =$req->input('headingText');
        $data_array = json_decode(json_encode($response), true);
        //$data_array = $data->toArray();
        $filename =$req->input('filename');
//product application details
        $ApplicationSpreadsheet = new Spreadsheet();
        $sheet = $ApplicationSpreadsheet->getActiveSheet();
       // $ProductSpreadsheet->getActiveSheet()->setTitle($heading);
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
      //get set headers and encode them to an array
      $header = $req->input('header');
      $header=  json_decode($header, true);
      $sortedData=array();
      $i=0;
      $k=0;
      $temp=[];
      if(empty($header)){
        if(isset($data_array[0])){
          $header=array_keys($data_array[0]);
          $length=count($header);
         }else{
          $data_array=array();
          $header=array();
          $length=1;
          $sheet->getCell('A2')->setValue("No data");
         }
       }else{
        
        $length=count($header);
       }
        
        //get the columns
      foreach ($header as $uheader){
                       $temp[$i]=$uheader;
                    $i++;
                  }
     $total=count($temp);
     
     foreach ($response as $udata)
          {
              //$sortedData[$k][] = $k+1;
              for($v=0;$v<$total-1;$v++){
                   $temp1=$temp[$v];
                   if(strpos($temp1, '_id') === false){
                        $sortedData[$k][]=$udata->$temp1;
                    }
              }
             
              $k++;  
         }


       $letter=$this->number_to_alpha($length,"");
       $size=count($sortedData)+7;
       $org_size = $size-7;
            
          //add sn column
       //add sn column
       $sheet->insertNewColumnBefore('A', 1);

  //adding formats to header
       array_unshift($header,"S/N");
       $sheet->fromArray($header, null, "A7");

  //loop data while writting
       $sheet->fromArray( $sortedData, null,  "B8");

  //add S/N counter 
       for($i=8; $i <= $size; $i++){
          $sheet->getCell('A'.$i)->setValue($i-7);
       }
        $length = $length+1; //add one for the new column added 
        $letter=$this->number_to_alpha($length,"");
      
  //set cell text wrap true for all columns
        $cellRange = 'A7:'.$letter.''.$size;
        $sheet->getStyle($cellRange)->getAlignment()->setWrapText(true);
        $sheet->getColumnDimension('A')->setAutoSize(true);

          
          //add heading title
        $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
            ->setValue("TANZANIAN MEDICINE AND MEDICAL DEVICES AGENCY\nP.O. Box 77150, Nelson Mandela Road,Mabibo External\nTell : +255 22 2450512/2450751/2452108 Fax : +255 28 2541484\nWebsite: www.tfda.go.tzEmail: info@tfda.go.tz\n".$heading);
        $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
        $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);

      //format row headers 
       $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray); 
        //create file
            $writer = new Xlsx($ApplicationSpreadsheet);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', 'attachment;filename='.$req->filename.'.xlsx');
        $response->headers->set('Cache-Control','max-age=0');


       return $response;

            }
      public function getProductManufacturers(Request $req)
{
$qry = DB::table('tra_product_manufacturers as t1')
->join('tra_product_information as t2', 't1.product_id', 't2.id')
->join('tra_product_applications as t3', 't1.product_id', 't3.product_id')
->leftJoin('tra_manufacturers_information as t4', 't1.manufacturer_id', 't4.id')
->leftJoin('par_manufacturing_roles as t5', 't1.manufacturer_role_id', 't5.id')
->leftJoin('par_common_names as t6', 't2.common_name_id', 't6.id')
->select('t3.reference_no as Reference_No','t2.brand_name as Brand_Name', 't6.name as common_name as Common_Name',DB::raw("GROUP_CONCAT(t4.name) as Manufacturer"))
->groupBy('t1.product_id')
->get();
//export prepare
$temp = array();
$filename = "Product Manufacturers";
$i = 0;
$k = 0;
$heading = "Export For Product Manufacturers";
$oneRecord=$qry->toArray();

if(isset($oneRecord[0])){
$array = json_decode(json_encode($oneRecord[0]), true);
$header=array_keys($array);
}else{
$header=array();
}

//get the columns
foreach ($header as $uheader){
$temp[$i]=$uheader;
$i++;
}
$total=count($temp);

//match values

foreach ($qry as $udata)
{
for($v=0;$v<$total;$v++){
$temp1=$temp[$v];

$sortedData[$k][]=$udata->$temp1;

}

$k++;
}
$export = new GridExport($sortedData,$header,$heading);
$file=Excel::raw($export, \Maatwebsite\Excel\Excel::XLSX);


$filename = 'product_manufacturers.xlsx';
return response()->streamDownload(function () use ($file) {
echo $file;
}, $filename);
}
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
 }