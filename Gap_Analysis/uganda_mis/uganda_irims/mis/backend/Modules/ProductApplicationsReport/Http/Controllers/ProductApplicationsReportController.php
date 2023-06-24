<?php

namespace Modules\ProductApplicationsReport\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use App\Exports\ProductGridExport;
use Excel;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class ProductApplicationsReportController extends Controller
{
    
    /**
     * Show the form for creating a new resource.
     * @return Response
     */
//connection defination

    private $pcon; //portal connection
    private $mcon; //mis connection

    public function __construct()
    {
        //blockio init
        $this->pcon = 'PORTAL_CONNECTION';
        $this->mcon = 'mysql'; 
    }

//product application
   public function getproductManufactureringData($product_id){
        

     if(validateIsNumeric($product_id)){
        try{
            $data = array();
            $manufacturer_type_id = 1;

            $con=DB::Connection($this->pcon);
            $records = $con->table('wb_product_manufacturers as t1')
                       ->where(array('product_id'=>$product_id,'manufacturer_type_id'=>$manufacturer_type_id))   
                         ->get();
                         foreach ($records as $rec) {
                             
                                $manufacturer_id = $rec->manufacturer_id;
                                $man_site_id = $rec->man_site_id;
                                $manufacturer_role_id = $rec->manufacturer_role_id;
                                $manufacturer_roleData = getParameterItems('par_manufacturing_roles','',$this->mcon);
                                $manufacturing_role = returnParamFromArray($manufacturer_roleData,$manufacturer_role_id);
                                
                                $man_data = DB::table('par_man_sites as t1')
                                    ->select('t1.*','t1.id as manufacturer_id', 't1.name as manufacturing_site', 't5.name as manufacturer_name', 't2.name as country', 't3.name as region','t4.name as district')
                                    ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                                    ->join('par_regions as t3', 't1.region_id', '=','t3.id')
                                    ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                                    ->leftJoin('tra_manufacturers_information as t5', 't1.manufacturer_id','=','t5.id' )
                                    ->where(array('t5.id'=>$manufacturer_id, 't1.id'=>$man_site_id))
                                    ->first();
                                  
                                if(!empty($man_data)){
                                    $data[] = array(
                                            'manufacturer_name'=>$man_data->manufacturer_name,
                                            'manufacturing_site'=>$man_data->manufacturing_site,
                                            'country'=>$man_data->country,
                                            'region'=>$man_data->region,
                                            'physical_address'=>$man_data->physical_address,
                                            'postal_address'=>$man_data->postal_address,
                                            'manufacturing_role'=>$manufacturing_role,
                                            'email_address'=>$man_data->email
                                        );
                                }
                               
                        } 
            //merge the arrays 
              if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          }else{
            return array();
         }            
    }

public function getApplicationUploadedDocs($application_code){
        

     if(validateIsNumeric($application_code)){
        try{
            $data = array();
            $manufacturer_type_id = 1;

            $con=DB::Connection($this->pcon);
            $records = $con->table('wb_application_uploadeddocuments as t1')
                       ->where('application_code',$application_code)  
                       ->select('t1.file_name','t1.initial_file_name','t1.created_on as Uploaded_On') 
                         ->get()->toArray();
            if($records){
             $records=(array)$records;
              $rec=$this->prepareArrayOfArrays($records);
                 return $rec;  
               }else{
                return array(['No records']);
               }
                


               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          }else{
            return array();
         }            
    }

     public function getProductsIngredients($product_id){

        if(validateIsNumeric($product_id)){
        try{
            
            $data = array();
            //get the records 
            $con=DB::Connection($this->pcon);
            $records =$con->table('wb_product_ingredients as t1')
                    ->select('t1.*')
                    ->where(array('t1.product_id' => $product_id))
                    ->get();
                     //loop
                     $speficification_typeData = getParameterItems('par_specification_types','',$this->mcon);
                     $si_unitData = getParameterItems('par_si_units','',$this->mcon);
                     $ingredientsData = getParameterItems('par_ingredients_details','',$this->mcon);
                     $inclusion_reasonData = getParameterItems('par_inclusions_reasons','',$this->mcon);
                     $ingredientTypeData = getParameterItems('par_ingredients_types','',$this->mcon);
                      
                     foreach ($records as $rec) {
                        //get the array 
                        
                        $data[] = array(
                                        'strength'=>$rec->strength,
                                        'proportion'=>$rec->proportion,
                                        'ingredient'=>returnParamFromArray($ingredientsData,$rec->ingredient_id),
                                        'ingredient_type'=>returnParamFromArray($ingredientTypeData,$rec->ingredient_type_id),
                                        'specification'=>returnParamFromArray($speficification_typeData,$rec->specification_type_id),
                                        'si_units'=>returnParamFromArray($si_unitData,$rec->ingredientssi_unit_id),
                                        'reason_of_inclusion'=>returnParamFromArray($inclusion_reasonData,$rec->inclusion_reason_id),
                                    );
                                    
                     }
                    
                if($data){
                     
                      $rec=$this->prepareArrayOfArrays($data);
                         return $rec;  
                       }else{
                        return array(['No records']);
                       }
                


               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          }else{
            return array();
         }            
    }


public function getProductsGMPInspectionDetails($product_id){

        if(validateIsNumeric($product_id)){
        try{
            $data = array();

            //get the records 
            $con=DB::Connection($this->pcon);
            $records = $con->table('wb_product_gmpinspectiondetails as t1')
                    ->select('t1.*')
                    ->where(array('t1.product_id' => $product_id))
                    ->get();
                    
                     foreach ($records as $rec) {
                        //get the array 
                        $reg_site_id = $rec->reg_site_id;
                        $gmp_productline_id = $rec->gmp_productline_id;
                          
                        $records =  DB::connection($this->mcon)->table('tra_manufacturing_sites as t1')
                                            ->select('t5.id as reg_manufacturer_site_id', 't7.permit_no as gmp_certificate_no', 't6.reference_no as gmp_application_reference', 't8.name as registration_status', 't7.permit_no', 't1.physical_address', 't1.email as email_address', 't1.id as manufacturer_id', 't1.name as manufacturer_name', 't2.name as country_name', 't3.name as region_name', 't4.name as district')
                                            ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                                            ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                                            ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                                            ->join('registered_manufacturing_sites as t5', 't1.id', '=', 't5.tra_site_id')
                                            ->join('tra_gmp_applications as t6', 't1.id', '=', 't6.manufacturing_site_id')
                                            ->join('tra_approval_recommendations as t7', 't1.permit_id', '=', 't7.id')
                                            ->join('par_system_statuses as t8', 't5.status_id', '=', 't8.id')
                                            ->where(array('t5.id' => $reg_site_id))
                                            ->first();
                                $product_linedetails = $this->getGMPProductLineDetails($gmp_productline_id);

                                if(!empty($records)){
                                    $data[] = array(
                                     'gmp_certificate_no'=>$records->gmp_certificate_no,
                                     'gmp_application_reference'=>$records->gmp_application_reference,
                                     'permit_no'=>$records->permit_no,
                                     'manufacturer_name'=>$records->manufacturer_name,
                                     'physical_address'=>$records->physical_address,
                                     'email_address'=>$records->email_address,
                                     'manufacturer_id'=>$records->manufacturer_id,
                                     'country'=>$records->country_name,
                                     'region'=>$records->region_name,
                                     'district'=>$records->district,
                                     'product_linedetails'=>$product_linedetails
                                  );
                                }
                               
                                    
                     }
                     if($data){
                     
                      $rec=$this->prepareArrayOfArrays($data);
                         return $rec;  
                       }else{
                        return array(['No records']);
                       }
                


               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          }else{
            return array();
         }            
    }

     public function getProductsDrugsPackaging($product_id){

        if(validateIsNumeric($product_id)){
        try{
            
            $con=DB::Connection($this->pcon);
            $data = array();
            //get the records 
            $records = $con->table('wb_product_packaging as t1')
                    ->select(DB::raw("t1.*, CONCAT_WS('X',retail_packaging_size,retail_packaging_size1,retail_packaging_size2,retail_packaging_size3,retail_packaging_size4) as retail_packaging"))
                  
                    ->where(array('t1.product_id' => $product_id))
                    ->get();
                     //loop container_id
                     $containersData = getParameterItems('par_containers','',$this->mcon);
                     $containersMaterialsData = getParameterItems('par_containers_materials','',$this->mcon);
                     $containersClosuresData = getParameterItems('par_closure_materials','',$this->mcon);
                     $containersSealData = getParameterItems('par_seal_types','',$this->mcon);
                     $containersTypesData = getParameterItems('par_containers_types','',$this->mcon);
                     $packagingUnitsData = getParameterItems('par_packaging_units','',$this->mcon);
                    
                     foreach ($records as $rec) {
                        //get the array 
                           
                        $data[] = array(
                                        'retail_packaging_size'=>$rec->retail_packaging_size,
                                        'retail_packaging_size1'=>$rec->retail_packaging_size1,
                                        'retail_packaging_size2'=>$rec->retail_packaging_size2,
                                        'retail_packaging_size3'=>$rec->retail_packaging_size3,
                                        'retail_packaging_size4'=>$rec->retail_packaging_size4,

                                        'retail_packaging'=>$rec->retail_packaging,
                                        'unit_pack'=>$rec->unit_pack,
                                        
                                        'unit_pack_name'=>returnParamFromArray($packagingUnitsData,$rec->unit_pack),
                                        'primary_container'=>returnParamFromArray($containersData,$rec->container_id),
                                        'container_materials'=>returnParamFromArray($containersMaterialsData,$rec->container_material_id),
                                        'container_type'=>returnParamFromArray($containersTypesData,$rec->container_type_id),
                                        'closure_material'=>returnParamFromArray($containersClosuresData,$rec->closure_material_id),
                                        'seal_type'=>returnParamFromArray($containersSealData,$rec->seal_type_id),
                                    );
                                    
                     }
                    if($data){
                     
                      $rec=$this->prepareArrayOfArrays($data);
                         return $rec;  
                       }else{
                        return array(['No records']);
                       }
                


               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          }else{
            return array();
         }            
    }

    public function getAPIproductManufactureringData($product_id){
         if(validateIsNumeric($product_id)){
        try{
            $data = array();
            $con=DB::Connection($this->pcon);
            $manufacturer_type_id = 2;
            $records = $con->table('wb_product_manufacturers as t1')
                        ->select('t1.*', 't2.ingredient_id')
                        ->join('wb_product_ingredients as t2', 't1.active_ingredient_id','=','t2.id')
                        ->where(array('t1.product_id'=>$product_id,'manufacturer_type_id'=>$manufacturer_type_id))   
                         ->get();
                         foreach ($records as $rec) {
                                $manufacturer_id = $rec->manufacturer_id;
                                $ingredient_id = $rec->ingredient_id;

                                $manufacturer_role_id = $rec->manufacturer_role_id;
                                $manufacturer_roleData = getParameterItems('par_manufacturing_roles','',$this->mcon);
                                $manufacturing_role = returnParamFromArray($manufacturer_roleData,$manufacturer_role_id);
                                
                                $ingredients_Data = getParameterItems('par_ingredients_details','',$this->mcon);
                                $active_ingredient = returnParamFromArray($ingredients_Data,$ingredient_id);
                                
                                $records = DB::connection($this->mcon)
                                    ->table('tra_manufacturers_information as t1')
                                    ->select('t1.*','t1.id as manufacturer_id', 't1.name as manufacturer_name', 't2.name as country', 't3.name as region','t4.name as district')
                                    ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                                    ->join('par_regions as t3', 't1.region_id', '=','t3.id')
                                    ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                                    ->where(array('t1.id'=>$manufacturer_id))
                                    ->first();
                            if(!empty($records)){
                                $data[] = array(
                                                 'manufacturer_name'=>$records->manufacturer_name,
                                                 'country'=>$records->country,
                                                 'region'=>$records->region,
                                                 'physical_address'=>$records->physical_address,
                                                 'postal_address'=>$records->postal_address,
                                                 'manufacturing_role'=>$manufacturing_role,
                                                 'active_ingredient'=>$active_ingredient,
                                                 'email_address'=>$records->email_address
                                              );
                            }
                        }  
                        if(!empty($data)){
                     
                      $rec=$this->prepareArrayOfArrays($data);
                         return $rec;  
                       }else{
                        return array(['No records']);
                       }
                


               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          }else{
            return array();
         }            
    }


    //mis
    public function getMedicineProductApplicationDetails(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
             $con=DB::Connection($this->pcon);
            //get the records 
            $records = $con->table('wb_product_applications as t1')
                    ->select(DB::raw("t1.application_code,t1.reference_no,t1.tracking_no,t1.zone_id,t1.paying_currency_id,t1.is_fast_track, t1.date_added, t1.submission_date, t1.created_by as Applicant,t1.assessment_procedure_id, t5.name as local_agent_name,t2.id as Product_id, t2.brand_name, t2.physical_description, t2.shelflifeduration_desc, t2.shelflifeafteropeningduration_desc, t2.intended_use, t2.manufacturing_date, t2.shelf_life, t2.shelf_lifeafter_opening, t2.classification_id, t2.distribution_category_id, t2.product_form_id, t2.common_name_id,t2.product_type_id,t2.storage_condition_id,t2.intended_enduser_id, t3.name as status_name"))

                    ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
                    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->leftJoin('wb_trader_account as t5', 't1.local_agent_id','=','t5.id')
                    ->where(array('t1.id' => $application_id))
                    ->first();

                   
                    $issue_place=$records->zone_id;
                    $paying_currency=$records->paying_currency_id;
                    $fast_track_Option=$records->is_fast_track;
                    $classification=$records->classification_id;
                    $assessment_procedure=$records->assessment_procedure_id;
                    $common_name=$records->common_name_id;
                    $distribution_category=$records->distribution_category_id;
                    $intended_enduser=$records->intended_enduser_id;
                    $product_form=$records->product_form_id;
                    $product_type=$records->product_type_id;

                    

                    
                    $issue_place = $this->getSingleRecordColValue('par_zones', array('id' => $issue_place), 'name');
                    $paying_currency = $this->getSingleRecordColValue('par_currencies', array('id' => $paying_currency), 'name');
                    $fast_track_Option = $this->getSingleRecordColValue('par_fasttrack_options', array('id' => $fast_track_Option), 'name');
                    $classification = $this->getSingleRecordColValue('par_classifications', array('id' => $classification), 'name');
                    $assessment_procedure = $this->getSingleRecordColValue('par_assessment_procedures', array('id' => $assessment_procedure), 'name');
                    $common_name = $this->getSingleRecordColValue('common_names', array('id' => $common_name), 'name');
                    $distribution_category = $this->getSingleRecordColValue('par_distribution_categories', array('id' => $distribution_category), 'name');
                    $intended_enduser = $this->getSingleRecordColValue('par_intended_enduser', array('id' => $intended_enduser), 'name');
                    $product_form = $this->getSingleRecordColValue('par_product_forms', array('id' => $product_form), 'name');
                    $product_type = $this->getSingleRecordColValue('par_product_types', array('id' => $product_type), 'name');

                      //par_man_sites
                     
                      $records->{"issue_place"} = $issue_place;
                      $records->{"paying_currency"} = $paying_currency;
                      $records->{"fast_track_Option"} = $fast_track_Option;
                      $records->{"classification"} = $classification;
                      $records->{"Assessment_Procedure"} = $assessment_procedure;
                      $records->{"common_name"} = $common_name;
                      $records->{"product_type"} = $product_type;
                      $records->{"intended_enduser"} = $intended_enduser;
                      $records->{"distribution_category"} = $distribution_category;
                      $records->{"product_form"} = $product_form;
                     
                      
                      unset($records->{"zone_id"});
                      unset($records->{"paying_currency_id"});
                      unset($records->{"is_fast_track"});
                      unset($records->{"classification_id"});
                      unset($records->{"product_form_id"});
                      unset($records->{"common_name_id"});
                      unset($records->{"product_type_id"});
                      unset($records->{"intended_enduser_id"});
                      unset($records->{"assessment_procedure_id"});
                      unset($records->{"distribution_category_id"});

                     $res =$records;
        }
        catch (\Exception $e) {
           print_r($e->getMessage());
            exit();
        } catch (\Throwable $throwable) {
            print_r($e->getMessage());
            exit();
            
        }
        return (array)$res;
    }

    public function getApplicationUploadedLabels($portal_product_id){
        

     if(validateIsNumeric($portal_product_id)){
        try{
            $records = DB::table('tra_uploadedproduct_images as t1')
                       ->leftJoin('par_document_types as t2','t1.document_type_id','t2.id')
                       ->select('t2.name as Label_Type','t1.file_name','t1.initial_file_name','t1.uploaded_on')
                      ->where('portal_product_id',$portal_product_id)  
                       ->get()->toArray();
          
            if($records){
             $records=(array)$records;
              $rec=$this->prepareArrayOfArrays($records);
                 return $rec;  
               }else{
                
                return array(['No records']);
               }
                


               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($throwable->getMessage());
                     exit();  
              }
          }else{
            return array();
         }            
    }

    public function getProductApplicationDetails(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
             $con=DB::Connection($this->pcon);
            //get the records 
            $records = $con->table('wb_product_applications as t1')
                    ->select(DB::raw("t1.application_code,t1.reference_no,t1.tracking_no,t1.zone_id,t1.paying_currency_id,t1.is_fast_track, t1.date_added, t1.submission_date, t1.created_by as Applicant, t5.name as local_agent_name,t2.id as Product_id, t2.brand_name, t2.physical_description, t2.contraindication, t2.gmdn_code,  t2.gmdn_category,t2.gmdn_term, t2.shelflifeduration_desc, t2.shelflifeafteropeningduration_desc, t2.intended_use, t2.manufacturing_date, t2.shelf_life, t2.shelf_lifeafter_opening, t2.classification_id, t2.device_type_id, t2.reason_for_classification, t2.common_name_id,t2.product_type_id,t2.intended_enduser_id, t3.name as status_name"))

                    ->join('wb_product_information as t2', 't1.product_id','=','t2.id')
                    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->leftJoin('wb_trader_account as t5', 't1.local_agent_id','=','t5.id')
                    ->where(array('t1.id' => $application_id))
                    ->first();

                    $issue_place=$records->zone_id;
                    $paying_currency=$records->paying_currency_id;
                    $fast_track_Option=$records->is_fast_track;
                    $classification=$records->classification_id;
                    $device_type=$records->device_type_id;
                    $common_name=$records->common_name_id;
                    $product_type=$records->product_type_id;
                    $intended_enduser=$records->intended_enduser_id;

                    

                    
                    $issue_place = $this->getSingleRecordColValue('par_zones', array('id' => $issue_place), 'name');
                    $paying_currency = $this->getSingleRecordColValue('par_currencies', array('id' => $paying_currency), 'name');
                    $fast_track_Option = $this->getSingleRecordColValue('par_fasttrack_options', array('id' => $fast_track_Option), 'name');
                    $classification = $this->getSingleRecordColValue('par_classifications', array('id' => $classification), 'name');
                    $device_type = $this->getSingleRecordColValue('par_device_types', array('id' => $device_type), 'name');
                    $common_name = $this->getSingleRecordColValue('common_names', array('id' => $common_name), 'name');
                    $product_type = $this->getSingleRecordColValue('par_product_types', array('id' => $product_type), 'name');
                    $intended_enduser = $this->getSingleRecordColValue('par_intended_enduser', array('id' => $intended_enduser), 'name');

                      //par_man_sites
                     
                      $records->{"issue_place"} = $issue_place;
                      $records->{"paying_currency"} = $paying_currency;
                      $records->{"fast_track_Option"} = $fast_track_Option;
                      $records->{"classification"} = $classification;
                      $records->{"device_type"} = $device_type;
                      $records->{"common_name"} = $common_name;
                      $records->{"product_type"} = $product_type;
                      $records->{"intended_enduser"} = $intended_enduser;
                     
                      
                      unset($records->{"zone_id"});
                      unset($records->{"paying_currency_id"});
                      unset($records->{"is_fast_track"});
                      unset($records->{"classification_id"});
                      unset($records->{"device_type_id"});
                      unset($records->{"common_name_id"});
                      unset($records->{"product_type_id"});
                      unset($records->{"intended_enduser_id"});

                     $res =$records;
        }
        catch (\Exception $e) {
           print_r($e->getMessage());
            exit();
        } catch (\Throwable $throwable) {
            print_r($e->getMessage());
            exit();
            
        }
        return (array)$res;
    }


    public function ExportProductApplicationDetails(request $req)
    {
//product application details
        $productDetails = new Spreadsheet();
        $sheet = $productDetails->getActiveSheet();
        $productDetails->getActiveSheet()->setTitle('Product Application Details');
//check section
     $section_id=getSingleRecordColValue('wb_product_applications',array('id'=>$req->application_id),'section_id',$this->pcon); 
  
//get all data depending on section
        $App_data='';
        $product_ingre_data='';
        $product_pack_data='';
        $man_data='';
        $ApiMan_data='';
        $doc_data='';
        $gmp_inspec_data='';
        $label_data='';

     if($section_id==2){
        $App_data=$this->getMedicineProductApplicationDetails($req);
        $product_id=$App_data['Product_id'];
        $application_code=$App_data["application_code"];
        unset($App_data['Product_id']);
        $product_ingre_data=$this->getProductsIngredients($product_id);
        $product_pack_data=$this->getProductsDrugsPackaging($product_id);
        $man_data=$this->getproductManufactureringData($product_id);
        $ApiMan_data=$this->getAPIproductManufactureringData($product_id);
        $doc_data=$this->getApplicationUploadedDocs($application_code);
        $gmp_inspec_data=$this->getProductsGMPInspectionDetails($product_id);
        $label_data=$this->getApplicationUploadedLabels($product_id);
     }else{
        $App_data=$this->getProductApplicationDetails($req);
        $product_id=$App_data['Product_id'];
        $application_code=$App_data["application_code"];
        unset($App_data['Product_id']);
        $man_data=$this->getproductManufactureringData($product_id);
        $doc_data=$this->getApplicationUploadedDocs($application_code);
        $label_data=$this->getApplicationUploadedLabels($product_id);
     }

        $cell=2;
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

//Sub-Main heading style
        $SubstyleArray = [
              'fill' => [
                    'type' =>  \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E5E4E2']
                ],
             'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
             'font'  => [
                  'bold'  =>  true
                ]
        ];

 //first heading
        $sheet->mergeCells('A1:B1')
              ->getCell('A1')
              ->setValue('Product Application Details');
        $sheet->getStyle('A1:B1')->applyFromArray($styleArray);
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);

//loop data while writting
        foreach ($App_data as $key => $value) {
            $sheet->getCell("A".$cell)->setValue($key);
            $sheet->getCell("B".$cell)->setValue($value);
            $sheet->getStyle("B".$cell)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
            $cell++;
        }

//second heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Product Infomation');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
              //jump row
              $cell=$cell+2;
//sub heading
        if($product_ingre_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Product ingredient Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $product_ingre_data, null,  "A".$cell  );
//jump one row
        $cell=count($product_ingre_data)+$cell+1;
         }
     if($product_pack_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Product Packaging Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $product_pack_data, null,  "A".$cell  );
//jump one row
        $cell=count($product_pack_data)+$cell+1;
         }
     if($man_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Product Finished Product Manufacturer');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $man_data, null,  "A".$cell  );
//jump one row
        $cell=count($man_data)+$cell+1;
         }
     if($ApiMan_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Product API Manufacturer Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $ApiMan_data, null,  "A".$cell  );
//jump one row
        $cell=count($ApiMan_data)+$cell+1;
         }
     if($gmp_inspec_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Product GMP Inspection Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $gmp_inspec_data, null,  "A".$cell  );
//jump one row
        $cell=count($gmp_inspec_data)+$cell+1;
         }

    
//third heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Uploaded Documents');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $doc_data, null,  "A".$cell  );

//jump one row
        $cell=count($doc_data)+$cell+1;


//fourth heading
    if($label_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Product Labels');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $label_data, null,  "A".$cell  );
    }
       



          $writer = new Xlsx($productDetails);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.ms-excel');
        $response->headers->set('Content-Disposition', 'attachment;filename="ProductApplicationExport.Xlsx"');
        $response->headers->set('Cache-Control','max-age=0');


        return $response;

        

    }


    //premise application
    function getPremisesApplications($records){
         $data = [];
         $subModuleData = getParameterItems('sub_modules','',$this->mcon);
         $sectionsData = getParameterItems('par_sections','',$this->mcon);
         $countriesData = getParameterItems('par_countries','',$this->mcon);
         $regionsData = getParameterItems('par_regions','',$this->mcon);
         $districtsData = getParameterItems('par_districts','',$this->mcon);
         $countriesData = getParameterItems('par_countries','',$this->mcon);
         
         foreach ($records as $rec) {
            $section = returnParamFromArray($sectionsData,$rec->section_id);
            $data = ['reference_no'=>$rec->reference_no,
                            'trader'=> getSingleRecordColValue('wb_trader_account', array('id' =>$rec->trader_id ), 'name', $this->pcon),
                            'premise_id'=>$rec->premise_id,
                            'premises_name'=>$rec->name,
                            'application_code'=>$rec->application_code,
                            'application_id'=>$rec->application_id,
                            'id'=>$rec->application_id,
                            'date_added'=>$rec->date_added,
                            'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Premises Application',
                            'created_by'=>$rec->created_by,
                            'submission_date'=>$rec->submission_date,
                            'country_name'=>returnParamFromArray($countriesData,$rec->country_id),
                            'region_name'=>returnParamFromArray($regionsData,$rec->region_id),
                            'district_name'=>returnParamFromArray($districtsData,$rec->district_id),
                            'Issue_Place'=>getSingleRecordColValue('par_zones', array('id' =>$rec->zone_id ), 'name', $this->mcon),
                            'business_scale'=>getSingleRecordColValue('par_business_scales', array('id' =>$rec->business_scale_id), 'name', $this->mcon),
                            'longitude'=>$rec->longitude,
                            'latitude'=>$rec->latitude,
                            'business_category'=>getSingleRecordColValue('par_business_categories', array('id' =>$rec->business_category_id), 'name', $this->mcon),
                            'section_name'=>$section,
                            'physical_address'=>$rec->physical_address,
                            'status'=>$rec->status_name,
                            'premise_target_id'=>$rec->premise_target_id,
                            'added_by'=>$rec->created_by,
                            'tracking_no'=>$rec->tracking_no
                        ];
                        
         }

         return $data;


    }

    public function getPremisesApplicationInfo(Request $req){
       
            try{
                
                $premise_id = $req->premise_id;
                $data = array();
                $con=DB::Connection($this->pcon);
                //get the records 
                $records = $con->table('wb_premises_applications as t1')
                    ->select(DB::raw('t1.application_code, t1.module_id,t1.created_by,t1.zone_id,t2.target_id as premise_target_id,t1.premise_id, t1.tracking_no, t1.id as application_id,t3.name as status_name,t1.section_id,t2.*, t1.date_added, t1.submission_date,t1.premise_id, t1.sub_module_id,t1.section_id, t1.trader_id, t1.reference_no, t1.application_status_id'))
                    ->leftJoin('wb_premises as t2', 't1.premise_id','=','t2.id')
                    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->where('t1.premise_id',$premise_id);
                    $records = $records->get();

                    $data = $this->getPremisesApplications($records);
           if($data){
                  return $data;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }            
    }

    public function getPremiseBusinnessInfo($premise_id){
        $data=[];
        try{
        $con=DB::Connection($this->pcon);
        $records=$con->table("wb_premises_otherdetails")
                     ->select('business_type_id','business_type_detail_id')
                     ->where('premise_id',$premise_id)
                     ->get();
        foreach ($records as $rec) {
            $data[]=array(
                 "Business_Type"=>getSingleRecordColValue('par_business_types', array('id' =>$rec->business_type_id), 'name', $this->mcon),
                 "par_business_type_detail"=>getSingleRecordColValue('par_business_type_details', array('id' =>$rec->business_type_detail_id), 'name', $this->mcon),
            );
        }

          if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }

    }

public function getPremisesPersonnelDetails($premise_id){
    
        try{
            $data = array();
            $con=DB::Connection($this->pcon);
            //get the records 
            $records = $con->table('wb_premises_personnel as t1')
                    ->where(array('t1.premise_id' => $premise_id))
                     ->get();
                     foreach ($records as $rec) {
                        $qualification_id = $rec->qualification_id;
                        $registration_no = $rec->registration_no;
                        

                       $study_field = getParameterItem('par_personnel_studyfield',$rec->study_field_id,$this->mcon);
                       $qualification = getParameterItem('par_personnel_qualifications',$rec->qualification_id,$this->mcon);
                        $per_records = DB::connection($this->mcon)->table('tra_personnel_information as t1')
                                ->select(DB::raw('t1.name as personnel,t1.*'))
                                
                                ->where(array('t1.id' => $rec->personnel_id))
                                ->first();
                                
                        if($per_records){
                            $data[] = array(
                                        'personnel_name'=>$per_records->personnel,
                                        'name'=>$per_records->personnel,
                                        'qualification'=>$qualification,
                                        'registration_no'=>$rec->registration_no,
                                        'institution'=>$rec->institution,
                                        'study_field'=>$study_field,
                                        'postal_address'=>$per_records->postal_address,
                                        'telephone_no'=>$per_records->telephone_no,
                                        'email_address'=>$per_records->email_address,
                                        'start_date'=>formatDate($rec->start_date),
                                        'end_date'=>formatDate($rec->end_date),
                                        'position_name'=> getParameterItem('par_personnel_positions',$rec->position_id,$this->mcon)
                                    );
                        }
                     }
                      if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }

}

    public function ExportPremiseApplicationDetails(request $req)
    {
//product application details
        $premiseDetails = new Spreadsheet();
        $sheet = $premiseDetails->getActiveSheet();
        $premiseDetails->getActiveSheet()->setTitle('Premise Application Details');
  
//get all data 
        $App_data=$this->getPremisesApplicationInfo($req);
        //dd($App_data);
        $premise_id=$App_data['premise_id'];
        $application_code=$App_data["application_code"];
        unset($App_data['premise_id']);
        $Bsn_Info_data=$this->getPremiseBusinnessInfo($premise_id);
        $doc_data=$this->getApplicationUploadedDocs($application_code);
        $personnel_data=$this->getPremisesPersonnelDetails($premise_id);

        $cell=2;
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

//Sub-Main heading style
        $SubstyleArray = [
              'fill' => [
                    'type' =>  \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E5E4E2']
                ],
             'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
             'font'  => [
                  'bold'  =>  true
                ]
        ];

 //first heading
        $sheet->mergeCells('A1:B1')
              ->getCell('A1')
              ->setValue('Premise Application Details');
        $sheet->getStyle('A1:B1')->applyFromArray($styleArray);
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);

//loop data while writting
        foreach ($App_data as $key => $value) {
            $sheet->getCell("A".$cell)->setValue($key);
            $sheet->getCell("B".$cell)->setValue($value);
            $sheet->getStyle("B".$cell)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
            $cell++;
        }
//second heading
     if($Bsn_Info_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Premise Business Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $Bsn_Info_data, null,  "A".$cell  );
//jump one row
        $cell=count($Bsn_Info_data)+$cell+1;
         }

//third heading
     if($personnel_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Premise Personnel Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $personnel_data, null,  "A".$cell  );
//jump one row
        $cell=count($personnel_data)+$cell+1;
         }

//fourth heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Uploaded Documents');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $doc_data, null,  "A".$cell  );

//jump one row
        $cell=count($doc_data)+$cell+1;

       



          $writer = new Xlsx($premiseDetails);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.ms-excel');
        $response->headers->set('Content-Disposition', 'attachment;filename="PremiseApplicationExport.Xlsx"');
        $response->headers->set('Cache-Control','max-age=0');


        return $response;
        

    }


//GMP Application
        function getGmpApplications($records){
        
         $data = array();
         $subModuleData = getParameterItems('sub_modules','',$this->mcon);
         $sectionsData = getParameterItems('par_sections','',$this->mcon);
         $countriesData = getParameterItems('par_countries','',$this->mcon);
         $regionsData = getParameterItems('par_regions','',$this->mcon);
         $districtsData = getParameterItems('par_districts','',$this->mcon);
         $countriesData = getParameterItems('par_countries','',$this->mcon);
       
         foreach ($records as $rec) {
            $section = returnParamFromArray($sectionsData,$rec->section_id);
            $data= array('reference_no'=>$rec->reference_no,
                            'application_initiator'=>getSingleRecordColValue('wb_trader_account', array('id' =>$rec->application_initiator_id), 'name', $this->pcon),
                            'registrant_option'=>getSingleRecordColValue('par_registrant_options', array('id' =>$rec->registrant_option_id), 'name', $this->mcon),
                            'local_agent(If Applicable)'=>getSingleRecordColValue('wb_trader_account', array('id' =>$rec->local_agent_id), 'name', $this->pcon),
                            'trader_aslocal_agent'=>$rec->trader_aslocal_agent,
                            'applicant_id'=>getSingleRecordColValue('wb_trader_account', array('id' =>$rec->applicant_id), 'name', $this->pcon),
                            'manufacturing_site_name'=>$rec->name,
                            'application_code'=>$rec->application_code,
                            'date_added'=>$rec->date_added,
                            'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                            'section'=>$section,
                            'created_by'=>$rec->created_by,
                            'submission_date'=>$rec->submission_date,
                            'country_name'=>returnParamFromArray($countriesData,$rec->country_id),
                            'region_name'=>returnParamFromArray($regionsData,$rec->region_id),
                            'district_name'=>returnParamFromArray($districtsData,$rec->district_id),
                            'Issue_Place'=>getSingleRecordColValue('par_zones', array('id' =>$rec->zone_id), 'name', $this->mcon),
                            'longitude'=>$rec->longitude,
                            'latitude'=>$rec->latitude,
                            'section_name'=>$section,
                            'physical_address'=>$rec->physical_address,
                            'status'=>$rec->status_name,
                            'added_by'=>$rec->created_by,
                            'tracking_no'=>$rec->tracking_no
                        );
                        
         }
         return $data;


    }
     public function getGmpApplicationInfo(Request $req){
       
            try{
                $application_id = $req->application_id;
                $data = array();
                //get the records 
                $con=DB::Connection($this->pcon);
                $records = $con->table('wb_gmp_applications as t1')
                    ->select(DB::raw('t1.module_id,t1.created_by,t1.zone_id,t1.manufacturing_site_id, t1.tracking_no,t1.application_code, t1.id as application_id,t3.name as status_name,t1.section_id,t2.*, t1.date_added, t1.submission_date,t1.manufacturing_site_id, t1.sub_module_id,t1.section_id, t1.applicant_id, registrant_option_id,trader_aslocal_agent,local_agent_id,application_initiator_id, t1.reference_no, t1.application_status_id'))
                    ->leftJoin('wb_manufacturing_sites as t2', 't1.manufacturing_site_id','=','t2.id')
                    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                    ->where('t1.id',$application_id);

                    $records = $records->get();


                    $data = $this->getGmpApplications($records);
                  if($data){
                  return $data;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }  
    }

    public function getGMPBusinessDetails($manufacturing_site_id){
       
        try{
            $data = array();
            //get the records 
            $con=DB::Connection($this->pcon);
            $records = $con->table('wb_mansite_otherdetails as t1')
                    ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                     ->get();
                     
                     foreach ($records as $rec) {
                      
                        $data[] = array(
                                        'business_type'=>getParameterItem('par_business_types',$rec->business_type_id,$this->mcon),
                                        'business_type_details'=>getParameterItem('par_business_type_details',$rec->business_type_detail_id,$this->mcon)
                                    );
                                    
                     }
                    
          if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }

}

public function getGmpAppProductLinedetails($manufacturing_site_id){
       
    try{
      
        $data = array();
        //get the records
        $con=DB::Connection($this->pcon); 
        $records = $con->table('wb_gmp_productline_details as t1')
                ->select('t1.*', 't2.*', 't1.id as record_id')
                ->leftJoin('wb_manufacturingsite_blocks as t2','t1.manufacturingsite_block_id','=','t2.id' )
                ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                 ->get();
                 
                 foreach ($records as $rec) {
                  
                    $data[] = array(
                                    'product_line'=>getParameterItem('gmp_product_lines',$rec->product_line_id,$this->mcon),
                                    'category'=>getParameterItem('gmp_product_categories',$rec->category_id,$this->mcon),
                                    'prodline_description'=>getParameterItem('gmp_product_descriptions',$rec->prodline_description_id,$this->mcon),
                                    'manufacturing_siteblock'=>$rec->name,
                                    'manufacturing_siteblockactivites'=>$rec->activities,
                                    'prodline_description'=>getSingleRecordColValue('gmp_product_descriptions', array('id' =>$rec->prodline_description_id), 'name', $this->mcon),
                                );
                                
                 }
                 if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
}
public function onLoadgmpManufacturingBlocksData($manufacturing_site_id){
    try{
        $data = array();
        //get the records 
        $con=DB::Connection($this->pcon);
        $records = $con->table('wb_manufacturingsite_blocks as t1')
                ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                ->select('t1.name','t1.activities')
                 ->get();
                 foreach ($records as $rec) {
                  
                    $data[] = array(
                                    'Name'=>$rec->name,
                                    'Activity'=>$rec->activities
                                );
                                
                 }
                 if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }

}
public function getGmpPersonnelDetails($manufacturing_site_id){
    
    try{
        $data = array();
        //get the records 
        $con=DB::Connection($this->pcon);
        $records = $con->table('wb_manufacturing_sites_personnel as t1')
                ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                 ->get();
                 foreach ($records as $rec) {
                    $qualification_id = $rec->qualification_id;
                    $registration_no = $rec->registration_no;
                    

                   $study_field = getParameterItem('par_personnel_studyfield',$rec->study_field_id,$this->mcon);
                   $qualification = getParameterItem('par_personnel_qualifications',$rec->qualification_id,$this->mcon);
                    $per_records = DB::connection($this->mcon)->table('tra_personnel_information as t1')
                            ->select(DB::raw('t1.name as personnel,t1.*'))
                            
                            ->where(array('t1.id' => $rec->personnel_id))
                            ->first();
                            
                    if($per_records){
                        $data[] = array(
                                    'personnel_name'=>$per_records->personnel,
                                    'name'=>$per_records->personnel,
                                    'qualification'=>$qualification,
                                    'registration_no'=>$rec->registration_no,
                                    'institution'=>$rec->institution,
                                    'study_field'=>$study_field,
                                    'postal_address'=>$per_records->postal_address,
                                    'telephone_no'=>$per_records->telephone_no,
                                    'email_address'=>$per_records->email_address,
                                    'start_date'=>formatDate($rec->start_date),
                                    'end_date'=>formatDate($rec->end_date),
                                    'position_name'=> getParameterItem('par_personnel_positions',$rec->position_id,$this->mcon)
                                );
                    }
                 }
                     if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
}

public function getgmpproductDetailsInformationData($manufacturing_site_id){
        try{
           
            $data = array();
            //get the records 
            $con=DB::Connection($this->pcon);
                $gmpproductDescriptionData = getParameterItems('gmp_product_descriptions','',$this->mcon);
                $gmpProductLineData = getParameterItems('gmp_product_lines','',$this->mcon);
            $records = $con->table('wb_product_gmpinspectiondetails as t1')
                    ->select('t1.*', 't2.prodline_description_id', 'product_line_id')
                    ->join('wb_gmp_productline_details as t2','t2.id' ,'=', 't1.gmp_productline_id')
                    ->where(array('t1.manufacturing_site_id' => $manufacturing_site_id))
                    ->get();
                if(count($records)>0 && validateisNumeric($manufacturing_site_id)){
                    foreach ($records as $rec) {
                        //get the array 
                        $reg_site_id = $rec->reg_site_id;
                        $prodline_description_id = $rec->prodline_description_id;
                        $product_line_id = $rec->product_line_id;
                        $reg_product_id = $rec->reg_product_id;
                        $product_id = $rec->product_id;
                          
                        $records = DB::connection($this->mcon)->table('tra_product_applications as t1')
                                    ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                                    ->join('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                                    ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                                    ->leftJoin('wb_trader_account as t9', 't1.local_agent_id', '=', 't9.id')
                                    ->leftJoin('par_classifications as t10', 't7.classification_id', '=', 't10.id')
                                    ->leftJoin('tra_approval_recommendations as t11', 't1.permit_id', '=', 't11.id')
                                    ->leftJoin('tra_registered_products as t12', 't12.tra_product_id', '=', 't7.id')
                                    ->leftJoin('par_storage_conditions as t13', 't7.storage_condition_id', '=', 't13.id')
                                    ->join('par_validity_statuses as t4', 't12.validity_status_id', '=', 't4.id')
                                    ->join('par_registration_statuses as t15', 't12.validity_status_id', '=', 't15.id')
                                    ->join('par_sections as t16', 't1.section_id', '=', 't16.id')
                                    ->leftJoin('par_dosage_forms as t17', 't7.dosage_form_id', '=', 't17.id')
                                    ->leftJoin('par_product_types as t18', 't1.product_type_id', '=', 't18.id')
                                    ->select('t7.*','t1.*', 't16.name as section_name', 't4.name as validity_status','t15.name as registration_status', 't1.id as active_application_id',  't3.name as applicant_name','t3.physical_address', 't17.name as dosage_form',   't9.name as local_agent', 't12.id as reg_product_id','t1.product_id as tra_product_id','t7.id as product_id',
                                        't13.name as storage_condition','t7.brand_name', 't12.tra_product_id', 't8.name as common_name', 't10.name as classification_name', 't11.certificate_no', 't11.expiry_date',
                                        't7.brand_name as sample_name') 
                                        ->where(array('t12.id'=>$reg_product_id, 't1.product_id'=>$product_id))
                                        ->first();//, 't7.section_id'=>$section_id
                            
                        $prodline_description = returnParamFromArray($gmpproductDescriptionData,$rec->prodline_description_id);
                        $product_line = returnParamFromArray($gmpProductLineData,$rec->product_line_id);
                                
                                $data[] = array(
                                                 'reference_no'=>$records->reference_no,
                                                 'brand_name'=>$records->brand_name,
                                                 'classification_name'=>$records->classification_name,
                                                 'common_name'=>$records->common_name,
                                                 'prodline_description'=>$prodline_description,
                                                 'product_line'=>$product_line,
                                                 
                                                // 'product_linedetails'=>$product_linedetails
                                              );
                                    
                     }

                }
                     
                    if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          }
    
    

    public function ExportGMPApplicationDetails(request $req)
    {
        $manufacturing_site_id = getSingleRecordColValue('wb_gmp_applications', array('id' =>$req->application_id), 'manufacturing_site_id', $this->pcon);
//product application details
        $GMPDetails = new Spreadsheet();
        $sheet = $GMPDetails->getActiveSheet();
        $GMPDetails->getActiveSheet()->setTitle('GMP Application Details');
  
//get all data 
        $App_data=$this->getGmpApplicationInfo($req);
        $application_code=$App_data["application_code"];
        $Bsn_Info_data=$this->getGMPBusinessDetails($manufacturing_site_id);
        $ManSite_Info_data=$this->getGmpAppProductLinedetails($manufacturing_site_id);
        $man_block_data=$this->onLoadgmpManufacturingBlocksData($manufacturing_site_id);
        $man_site_prod_details=$this->getgmpproductDetailsInformationData($manufacturing_site_id);
        $doc_data=$this->getApplicationUploadedDocs($application_code);
        $personnel_data=$this->getGmpPersonnelDetails($manufacturing_site_id);
        

        $cell=2;
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

//Sub-Main heading style
        $SubstyleArray = [
              'fill' => [
                    'type' =>  \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E5E4E2']
                ],
             'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
             'font'  => [
                  'bold'  =>  true
                ]
        ];

 //first heading
        $sheet->mergeCells('A1:B1')
              ->getCell('A1')
              ->setValue('GMP Application Details');
        $sheet->getStyle('A1:B1')->applyFromArray($styleArray);
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);

//loop data while writting
        foreach ($App_data as $key => $value) {
            $sheet->getCell("A".$cell)->setValue($key);
            $sheet->getCell("B".$cell)->setValue($value);
            $sheet->getStyle("B".$cell)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
            $cell++;
        }

//second heading
    if($Bsn_Info_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Product Labels');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $Bsn_Info_data, null,  "A".$cell  );
//jump one row
        $cell=count($Bsn_Info_data)+$cell+1;        
    }
           
//third heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Product Manufacturing Site Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
              //jump row
              $cell=$cell+2;
//sub heading
        if($man_block_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Manufacturing Block Information');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $man_block_data, null,  "A".$cell  );
//jump one row
        $cell=count($man_block_data)+$cell+1;
         }
     if($ManSite_Info_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Manufacturing Line Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $ManSite_Info_data, null,  "A".$cell  );
//jump one row
        $cell=count($ManSite_Info_data)+$cell+1;
         }
     if($man_site_prod_details!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Manufacturing Site Product Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $man_site_prod_details, null,  "A".$cell  );
//jump one row
        $cell=count($man_site_prod_details)+$cell+1;
         }

    
    
//fourth heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Uploaded Documents');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $doc_data, null,  "A".$cell  );

//jump one row
        $cell=count($doc_data)+$cell+1;



       



          $writer = new Xlsx($GMPDetails);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.ms-excel');
        $response->headers->set('Content-Disposition', 'attachment;filename="GMPApplicationExport.Xlsx"');
        $response->headers->set('Cache-Control','max-age=0');


        return $response;

        

    }

    //Clinical Trial
     public function getClinicalApplicationsDetails(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
            //get the records 
            $con=DB::Connection($this->pcon);
            $records = $con->table('wb_clinical_trial_applications as t1')
                ->select('t1.*', 't1.application_status_id as status_id','t3.name as status', 't3.name as status_name')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->where(array('t1.id' => $application_id));
                
                $records =  $records->get();

                $data = $this->getClincialTrialAppsData($records);

                      if($data){
                  $rec=$data;
                  return $rec;
                 }else{
                    return ['No records'];
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          


    }
    function getClincialTrialAppsData($records){
        
        $data = array();

        $subModuleData = getParameterItems('sub_modules','',$this->mcon);
        $sectionsData = getParameterItems('par_sections','',$this->mcon);
        
        $permitCategoryData = getParameterItems('par_permit_category','',$this->mcon);

        $permitReasonData = getParameterItems('par_permit_category','',$this->mcon);
        
        foreach ($records as $rec) {
           $section = returnParamFromArray($sectionsData,$rec->section_id);
           $clinical_trial_sponsor = getSingleRecordColValue('clinical_trial_personnel', array('id' => $rec->sponsor_id), 'name',$this->mcon);
           $principal_investigator = getSingleRecordColValue('clinical_trial_personnel', array('id' => $rec->investigator_id), 'name',$this->mcon);
           
           $data = array('application_code'=>$rec->application_code,
                           'reference_no'=>$rec->reference_no,
                           'tracking_no'=>$rec->tracking_no,
                           'date_received'=>$rec->date_received,
                           'date_added'=>$rec->date_added,
                           'trader'=>getSingleRecordColValue('wb_trader_account',array('id' =>$rec->applicant_id),'name',$this->pcon),
                           'Study_Phase'=>getSingleRecordColValue('par_clinical_phases',array('id' =>$rec->phase_id),'name',$this->mcon),
                           'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Clinical Trial Application',
                           'study_title'=>$rec->study_title,
                           'protocol_no'=>$rec->protocol_no,
                           'version_no'=>$rec->version_no,
                           'date_of_protocol'=>$rec->date_of_protocol,
                           'study_start_date'=>$rec->study_start_date,
                           'clearance_no'=>$rec->clearance_no,
                           'study_duration'=>$rec->study_duration,
                           'duration_desc'=>$rec->duration_desc,
                           'paying_currency'=>getSingleRecordColValue('par_currencies',array('id' =>$rec->paying_currency_id),'name',$this->mcon),
                           'section'=>$section,
                           'zone'=>getSingleRecordColValue('par_zones',array('id' =>$rec->zone_id),'name',$this->mcon),
                           'status_name'=>$rec->status_name,
                           'is_fast_track'=>$rec->is_fast_track,
                            'clinical_trial_sponsor'=>$clinical_trial_sponsor,
                            'principal_investigator'=>$principal_investigator
                       );
        }
        return $data;


   }

   public function getClinicalTrialSites($application_id){
        
    try{
        $data = array();
        $con=DB::Connection($this->pcon);
        $records = $con->table('wb_clinical_trial_sites as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
                    foreach ($records as $rec) {
                        $study_site_id = $rec->study_site_id;
                        $rec_data = DB::connection($this->mcon)
                                ->table('study_sites as t1')
                                ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                                ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                                ->join('par_regions as t3', 't1.region_id', '=','t3.id')
                                ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                                ->where(array('t1.id'=>$rec->study_site_id))
                                ->first();
                            if($rec_data){
                                $data[] = array(
                                'site_name'=>$rec_data->name,
                                 'country'=>$rec_data->country,
                                 'region'=>$rec_data->region,
                                 'district'=>$rec_data->district,
                                 'physical_address'=>$rec_data->physical_address,
                                 'postal_address'=>$rec_data->postal_address,
                                 'telephone'=>$rec_data->telephone);

                            }
                     
                    }

    
            if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
          


   }

    public function getClinicaltrailinvestigatorsData($application_id){
        
    try{
        $data = array();
        $con=DB::Connection($this->pcon);
        $records = $con->table('wb_clinical_trial_investigators as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
                    foreach ($records as $rec) {
                        $study_site_id = $rec->study_site_id;

                        $study_site = getSingleRecordColValue('study_sites', array('id' => $rec->study_site_id), 'name',$this->mcon);
                        $investigator_category = getSingleRecordColValue('clinical_investigator_cat', array('id' => $rec->category_id), 'category_name',$this->mcon);
           
                        $rec_data = DB::connection($this->mcon)
                                ->table('clinical_trial_personnel as t1')
                                ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                                ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                                ->join('par_regions as t3', 't1.region_id', '=','t3.id')
                                ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                                ->where(array('t1.id'=>$rec->investigator_id))
                                ->first();
                                if($rec_data){
                                    $data[] = array(
                                    'study_site'=>$study_site,
                                    'investigator_category'=>$investigator_category,
                                    'investigator'=>$rec_data->name,
                                    'country'=>$rec_data->country,
                                    'region'=>$rec_data->region,
                                    'district'=>$rec_data->district,
                                    'physical_address'=>$rec_data->physical_address,
                                    'postal_address'=>$rec_data->postal_address,
                                    'telephone'=>$rec_data->telephone);

                                }
                                                    

                    }

           if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
        
        
           }
   public function getClinicaltrailIMPProdData($application_id){

    try{
        $data = array();
        $con=DB::Connection($this->pcon);
        $records = $con->table('wb_clinical_trial_products as t1')
                    ->where(array('application_id'=>$application_id))
                    ->get();
                    foreach ($records as $rec) {
                      
                        $product_category = getSingleRecordColValue('par_clinical_product_categories', array('id' => $rec->product_category_id), 'category_name',$this->mcon);
                        $generic_name = getSingleRecordColValue('par_common_names', array('id' => $rec->common_name_id), 'name',$this->mcon);
                        $dosage_form = getSingleRecordColValue('par_dosage_forms', array('id' => $rec->dosage_form_id), 'name',$this->mcon);
                        $route_of_administration = getSingleRecordColValue('par_route_of_administration', array('id' => $rec->routes_of_admin_id), 'name',$this->mcon);
                        $si_units = getSingleRecordColValue('par_si_units', array('id' => $rec->si_unit_id), 'name',$this->mcon);
                        $market_location = getSingleRecordColValue('par_product_types', array('id' => $rec->market_location_id), 'name',$this->mcon);
                       
                        $classification_name = getSingleRecordColValue('par_classifications', array('id' => $rec->classification_id), 'name',$this->mcon);
                       
                        $data[] = array(
                                       'brand_name'=>$rec->brand_name,
                                       'registration_no'=>$rec->registration_no,
                                       'registration_date'=>$rec->registration_date,
                                       'identification_mark'=>$rec->identification_mark,
                                       'product_desc'=>$rec->product_desc,
                                       'product_strength'=>$rec->product_strength,

                                       'product_category'=>$product_category,
                                       'generic_name'=>$generic_name,
                                       'dosage_form'=>$dosage_form,
                                       'route_of_administration'=>$route_of_administration,
                                       'market_location'=>$market_location,
                                       'gmdn_category'=>$rec->gmdn_category,
                                       'gmdn_term'=>$rec->gmdn_term,
                                       'classification'=>$classification_name,
                                       'gmdn_code'=>$rec->gmdn_code,
                                       'market_location'=>$market_location,

                                    );

                    }

             if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($e->getMessage());
                     exit();  
              }
        
        
           }
public function getClinicalTrialMonitorsData($application_id){
    try{
        $data=[];
    $con=DB::Connection($this->pcon);
    $monitor_data=$con->table('wb_clinical_trial_monitors as t1')
                 ->select('monitor_id')
                 ->where('application_id',$application_id)
                 ->first();

    $records=DB::Connection($this->mcon)->table('clinical_trial_personnel as t1')
                                    ->leftJoin('par_countries as t2','t1.country_id','t2.id')
                                    ->leftJoin('par_regions as t3','t1.region_id','t3.id')
                                    ->leftJoin('par_districts as t4','t1.district_id','t4.id')
                                    ->select('t1.name as Monitor','t1.postal_address','t1.physical_address','t2.name as Country','t3.name as Region','t4.name as District')
                                    ->where('t1.id',$monitor_data->monitor_id)
                                    ->get();

                foreach ($records as $rec) {
                   $data[]=array(
                    'Monitor'=>$rec->Monitor,
                    'Country'=>$rec->Country,
                    'Region'=>$rec->Region,
                    'District'=>$rec->District,
                    'Physical Address'=>$rec->physical_address,
                    'Postal Address'=>$rec->postal_address
                   );
                }
                if($data){
                  $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($throwable->getMessage());
                     exit();  
              }
}
 public function ExportClinicalTrailApplicationDetails(request $req)
    {
//product application details
        $ClinicalTrialDetails = new Spreadsheet();
        $sheet = $ClinicalTrialDetails->getActiveSheet();
        $ClinicalTrialDetails->getActiveSheet()->setTitle('Clinical Trial');
  $application_id=$req->application_id;
//get all data 
        $App_data=$this->getClinicalApplicationsDetails($req);
        $application_code=$App_data["application_code"];
        $study_site_data=$this->getClinicalTrialSites($application_id);
        $ct_investigators_data=$this->getClinicaltrailinvestigatorsData($application_id);
        $ct_monitors_data=$this->getClinicalTrialMonitorsData($application_id);
        $prod_details=$this->getClinicaltrailIMPProdData($application_id);
        $doc_data=$this->getApplicationUploadedDocs($application_code);
        

        $cell=2;
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

//Sub-Main heading style
        $SubstyleArray = [
              'fill' => [
                    'type' =>  \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E5E4E2']
                ],
             'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
             'font'  => [
                  'bold'  =>  true
                ]
        ];

 //first heading
        $sheet->mergeCells('A1:B1')
              ->getCell('A1')
              ->setValue('Clinical Trial Application Details');
        $sheet->getStyle('A1:B1')->applyFromArray($styleArray);
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);

//loop data while writting
        foreach ($App_data as $key => $value) {
            $sheet->getCell("A".$cell)->setValue($key);
            $sheet->getCell("B".$cell)->setValue($value);
            $sheet->getStyle("B".$cell)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
            $cell++;
        }

//second heading
    if($study_site_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Clinical Study Sites');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $study_site_data, null,  "A".$cell  );
//jump one row
        $cell=count($study_site_data)+$cell+1;        
    }
           
//third heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Co/Sub investigators & Monitors');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
              //jump row
              $cell=$cell+2;
//sub heading
        if($ct_investigators_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('investigators Information');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $ct_investigators_data, null,  "A".$cell  );
//jump one row
        $cell=count($ct_investigators_data)+$cell+1;
         }
//subheading
     if($ct_monitors_data!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('Clinical Trail Monitor Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($SubstyleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $ct_monitors_data, null,  "A".$cell  );
//jump one row
        $cell=count($ct_monitors_data)+$cell+1;
         }

//fourth
     if($prod_details!=''){
        $sheet->mergeCells("A".$cell.":B".$cell)
             ->getCell("A".$cell)
             ->setValue('IMP Product Details');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray); 
        $cell++;
//loop data while writting 
        $sheet->fromArray( $prod_details, null,  "A".$cell  );
//jump one row
        $cell=count($prod_details)+$cell+1;
         }

    
    
//fifth heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Uploaded Documents');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $doc_data, null,  "A".$cell  );

//jump one row
        $cell=count($doc_data)+$cell+1;



       



          $writer = new Xlsx($ClinicalTrialDetails);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.ms-excel');
        $response->headers->set('Content-Disposition', 'attachment;filename="ClinicalTrialApplicationExport.Xlsx"');
        $response->headers->set('Cache-Control','max-age=0');


        return $response;

        

    }
//import export
    public function getImportExpPermitsApplicationLoading(Request $req){
        try{
            $application_code = $req->application_code;

            $data = array();
            //get the records 
            $con=DB::Connection($this->pcon);
            $records = $con->table('wb_importexport_applications as t1')
                ->select('t1.*', 't3.name as status', 't3.name as status_name')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->where(array('t1.application_code' => $application_code));

                //the ilters 
                $records = $records->get();

                $data = $this->getPermitApplications($records);
                if($data){
                  return $data;
                 }else{
                    return array(['No records']);
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($throwable->getMessage());
                     exit();  
              }
    }
    
    
    function getPermitApplications($records){
        
        $data = array();

        $subModuleData = getParameterItems('sub_modules','',$this->mcon);
        $sectionsData = getParameterItems('par_sections','',$this->mcon);
        
        $permitCategoryData = getParameterItems('par_permit_category','',$this->mcon);

        $permitReasonData = getParameterItems('par_permit_category','',$this->mcon);
        
        foreach ($records as $rec) {
           $section =returnParamFromArray($sectionsData,$rec->section_id);
           $premises_name = getSingleRecordColValue('tra_premises', array('id' => $rec->premise_id), 'name',$this->mcon);
           $sender_receiver = getSingleRecordColValue('tra_permitsenderreceiver_data', array('id' => $rec->sender_receiver_id), 'name',$this->mcon);
           $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $rec->consignee_id), 'name',$this->mcon);
          
           $data = array('reference_no'=>$rec->reference_no,
                           'trader'=>getSingleRecordColValue('wb_trader_account',array('id'=>$rec->trader_id),'name',$this->pcon),
                           'date_added'=>$rec->date_added,
                           'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                           'application_code'=>$rec->application_code,
                           'created_by'=>$rec->created_by,
                           'submission_date'=>$rec->submission_date,
                           'permit_category'=>returnParamFromArray($permitCategoryData,$rec->permit_category_id),
                           'permit_reason'=>returnParamFromArray($permitReasonData,$rec->permit_reason_id),
                           'product_category(if Applicable)'=>getSingleRecordColValue('par_product_categories',array('id'=>$rec->product_category_id),'name',$this->mcon),
                           'Permit_typecategory(if Applicable)'=>getSingleRecordColValue('par_permit_typecategories',array('id'=>$rec->import_typecategory_id),'name',$this->mcon),
                           'proforma_invoice_no'=>$rec->proforma_invoice_no,
                           'proforma_invoice_date'=>$rec->proforma_invoice_date,
                           'premises_name'=>$premises_name,
                           'sender_receiver'=>$sender_receiver,
                           'section_name'=>$section,
                           'port_id'=>$rec->port_id,
                           'consignee_options'=>getSingleRecordColValue('par_consignee_options',array('id'=>$rec->consignee_options_id),'name',$this->mcon),
                           'consignee_name'=>$consignee_name,
                           'pay_currency_id'=>getSingleRecordColValue('par_currencies',array('id'=>$rec->paying_currency_id),'name',$this->mcon),
                           'added_by'=>$rec->created_by,
                           'tracking_no'=>$rec->tracking_no
                       );
        }

        return $data;


   }
   public function getPermitProductsDetails($application_code){
    try{
        $data = array();
        //get the records 
        $con=DB::Connection($this->pcon);
        $records = $con->table('wb_permits_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();

            $data = $this->getProductsPermitDetails($records);
                if($data){
                    $rec=$this->prepareArrayOfArrays($data);
                  return $rec;
                 }else{
                    return ['No records'];
                 }
               } catch (\Exception $e) {
                     print_r($e->getMessage());
                     exit();
              } catch (\Throwable $throwable) {
                     print_r($throwable->getMessage());
                     exit();  
              }
    
   }
    public function getProductsPermitDetails($records){
        $data = array();
    
        $currencyData = getParameterItems('par_currencies','');
        $weightsData = getParameterItems('par_weights_units','');
        
        $packagingData = getParameterItems('par_packaging_units','');
    
        $permitReasonData = getParameterItems('par_permit_category','');

        $productCategoriesData = getParameterItems('par_product_categories','');
        $deviceData = getParameterItems('par_device_types','');
        
        foreach ($records as $rec) {
        
           $brand_name = getSingleRecordColValue('tra_product_information', array('id' => $rec->product_id), 'brand_name');
           
           $authorised_permit_no = getSingleRecordColValue('tra_trader_regulatedproducts', array('id' => $rec->regulated_prodpermit_id), 'authorised_permit_no');
            if(validateIsNumeric($rec->regulated_prodpermit_id)){

                $isregulated_product = 1;

            }
            else{

                $isregulated_product = 0;

            }
           $device_type = returnParamFromArray($deviceData,$rec->device_type_id);
           $data[] = array(
                           
                           'isregulated_product'=>$isregulated_product,
                           'quantity'=>$rec->quantity,
                           'total_weight'=>$rec->total_weight,
                           'brand_name'=>$brand_name,
                           'packaging_units'=>returnParamFromArray($packagingData,$rec->packaging_unit_id),
                           'weight_units'=>returnParamFromArray($weightsData,$rec->weights_units_id),
                           'currency_name'=>returnParamFromArray($currencyData,$rec->currency_id),
                           'product_category'=>returnParamFromArray($productCategoriesData,$rec->product_category_id),
                           'device_type'=>$device_type != ''?$device_type:'NA',
                           'product_category'=>returnParamFromArray($productCategoriesData,$rec->product_category_id),
                           'unit_price'=>$rec->unit_price,
                           'total_value'=>($rec->unit_price*$rec->quantity),
                       );
        
        }
        return $data;
       }

public function ExportImportExportApplicationDetails(request $req)
    {
//product application details
        $ImportExportDetails = new Spreadsheet();
        $sheet = $ImportExportDetails->getActiveSheet();
        $ImportExportDetails->getActiveSheet()->setTitle('Import Export');
//get all data 
        $App_data=$this->getImportExpPermitsApplicationLoading($req);
        $application_code=$App_data["application_code"];
        $prod_details=$this->getPermitProductsDetails($application_code);
        $doc_data=$this->getApplicationUploadedDocs($application_code);
        

        $cell=2;
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

//Sub-Main heading style
        $SubstyleArray = [
              'fill' => [
                    'type' =>  \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_SOLID,
                    'color' => ['rgb' => 'E5E4E2']
                ],
             'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
             'font'  => [
                  'bold'  =>  true
                ]
        ];

 //first heading
        $sheet->mergeCells('A1:B1')
              ->getCell('A1')
              ->setValue('Import Export Application Details');
        $sheet->getStyle('A1:B1')->applyFromArray($styleArray);
        $sheet->getColumnDimension('A')->setAutoSize(true);
        $sheet->getColumnDimension('B')->setAutoSize(true);

//loop data while writting
        foreach ($App_data as $key => $value) {
            $sheet->getCell("A".$cell)->setValue($key);
            $sheet->getCell("B".$cell)->setValue($value);
            $sheet->getStyle("B".$cell)->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_LEFT);
            $cell++;
        }
 //second heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Permit Product Information');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $prod_details, null,  "A".$cell  );

//jump one row
        $cell=count($prod_details)+$cell+1;


//third heading
        $sheet->mergeCells("A".$cell.":B".$cell)
              ->getCell("A".$cell)
              ->setValue('Application Uploaded Documents');
        $sheet->getStyle("A".$cell.":B".$cell)->applyFromArray($styleArray);
            $cell++;

//write array data to sheet
        $sheet->fromArray( $doc_data, null,  "A".$cell  );

//jump one row
        $cell=count($doc_data)+$cell+1;



       



          $writer = new Xlsx($ImportExportDetails);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.ms-excel');
        $response->headers->set('Content-Disposition', 'attachment;filename="ImportExportApplicationExport.Xlsx"');
        $response->headers->set('Cache-Control','max-age=0');


        return $response;

        

    }
    ///helper functions

    public function getSingleRecordColValue($table, $where, $col)
    {
        $val = DB::table($table)->where($where)->value($col);
        return $val;
    }

    public function prepareArrayOfArrays(array $array){
        $clean_Array=[];
        $final_Array=[];

        //ensure the inner array is array not collection 
      foreach ($array as $key => $value) {
          $clean_Array[]=(array)$value;
      }
      //group into two's for easy writting
      foreach ($clean_Array as $key => $value) {
          foreach ($value as $key => $value2) {
              $final_Array[]=[$key,$value2];
          }
          $final_Array[]=['',''];
      }
       return $final_Array;

    }
    function getGMPProductLineDetails($product_line_id){
        $records = DB::connection($this->mcon)->table('gmp_productline_details as t1')
                    ->select('t1.*', 't2.name as product_line', 't1.id as product_id', 't3.name as product_category')
                    ->join('gmp_product_lines as t2', 't1.product_line_id','=','t2.id')
                    ->join('gmp_product_categories as t3', 't1.category_id','=','t3.id')
                    ->join('gmp_product_descriptions as t4', 't1.prodline_description_id','=','t4.id')
                    ->where(array('t1.id' => $product_line_id))
                    ->first();
            if(  $records){
                return  $records->product_line.' '.$records->product_category;

            }
        
    }

    /**
     * Store a newly created resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
    }

    /**
     * Show the specified resource.
     * @return Response
     */
    public function show()
    {
        return view('productapplicationsreport::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @return Response
     */
    public function edit()
    {
        return view('productapplicationsreport::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param  Request $request
     * @return Response
     */
    public function update(Request $request)
    {
    }

    /**
     * Remove the specified resource from storage.
     * @return Response
     */
    public function destroy()
    {
    }
}
