<?php

namespace Modules\Registers\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use Exports\GridExport;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Excel;
use Modules\OpenOffice\Http\Controllers\OpenOfficeController;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Modules\Reports\Http\Controllers\ReportsController;
use Modules\Registers\Traits\RegistersTrait;
use PDF;
use Carbon\Carbon;

class RegistersController extends Controller
{
    use RegistersTrait;
  public function getProductRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $filter = $req->filter;
      $classification_category=$req->classification_category;
      $prodclass_category=$req->prodclass_category;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_product_information';
      $field='product_id';
      //date filter
      $datefilter=$this->DateFilter($req);

      $filterdata = [];
       if(validateIsNumeric($section_id)){
      
      $filterdata []="t1.section_id = ".$section_id;
      }
     if( validateIsNumeric($sub_module_id)){
      
      $filterdata[] ="t1.sub_module_id = ".$sub_module_id;
      }
      $filterdata=implode(' AND ',$filterdata );

      $subfilterdata = array();

      if(validateIsNumeric($classification_category)){
      
      $subfilterdata=array_merge($subfilterdata , ['t2.classification_id'=>$classification_category]);
      }
      if( validateIsNumeric($prodclass_category)){
      
      $subfilterdata =array_merge($subfilterdata , ['t2.prodclass_category_id'=>$prodclass_category]);
      }

      $qry=$this->getApprovedProductRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);
         $filter = $req->input('filter');
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
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'Classification' :
                                 $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'commonName' :
                                 $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'ProductForm' :
                                 $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
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
                            case 'ApplicantCountry' :
                                  $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
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
                            case 'AgentCountry' :
                                  $whereClauses[] = "t17.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'IssueFrom' :
                                  $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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
                                     
                            case 'ManufacturerCountry' :
                                  $whereClauses[] = "t28.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'ManufacturerEmail' :
                                  $whereClauses[] = "t27.email_address like '%" . ($filter->value) . "%'";
                                  break;
                            case 'product_strength' :
                                  $whereClauses[] = "t2.product_strength like '%" . ($filter->value) . "%'";
                                  break;
                            case 'active_api' :
                                  $whereClauses[] = "t32.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'validity_status' :
                                  $whereClauses[] = "t24.name like '%" . ($filter->value) . "%'";
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
      $type = $req->input('type');
      if(isset($type)){

      return $results;
      }else{
      return \response()->json($res);
      }
    }

 public function exportProductRegister(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $classification_category=$req->classification_category;
      $prodclass_category=$req->prodclass_category;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $heading='';
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_product_information';
      $field='product_id';

      //date filter
     $datefilter=$this->DateFilter($req);

     $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
     $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      //get section data
      $section_details=array();
      if(validateIsNumeric($section_id)){
          $section_details=array('id'=>$section_id);
      }
        //other  for loops
      $category_details=array();
      if(validateIsNumeric($prodclass_category)){
         $category_details=array('id'=>$prodclass_category);

      }
      $classification_details=array();
      if(validateIsNumeric($classification_category)){
         $classification_details=array('t1.id'=>$classification_category);
      }
    
      $heading="Product Register";
      $data = array();
      $filename="Product_Register.Xlsx";
      foreach ($sub_data as $submodule) {
        $section_data=DB::table('par_sections')
         ->whereIn('id',[2,4])->where($section_details)->get();

        foreach ($section_data as $section) {
              $category_data=DB::table('par_prodclass_categories')
                ->where($category_details)
               ->where('section_id',$section->id)->get();

              foreach ($category_data as $category) {
               $classfication_data=DB::table('par_classifications as t1')
                  ->leftJoin('par_prodcat_classifications as t2','t1.id', 't2.classification_id')
                   ->where($classification_details)
                   ->where('t2.prodclass_category_id', $category->id)
                    ->get();
                 foreach ($classfication_data as $classfication) {
                      $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                       $subfilterdata=array('t2.classification_id'=>$classfication->classification_id,'t2.prodclass_category_id'=>$category->id);
                      $qry=$this->getApprovedProductRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
                      $filter = $req->input('filter');
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
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'Classification' :
                                 $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'commonName' :
                                 $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'ProductForm' :
                                 $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
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
                            case 'ApplicantCountry' :
                                  $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
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
                            case 'AgentCountry' :
                                  $whereClauses[] = "t17.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'IssueFrom' :
                                  $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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
                                     
                            case 'ManufacturerCountry' :
                                  $whereClauses[] = "t28.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'ManufacturerEmail' :
                                  $whereClauses[] = "t27.email_address like '%" . ($filter->value) . "%'";
                                  break;
                            case 'product_strength' :
                                  $whereClauses[] = "t2.product_strength like '%" . ($filter->value) . "%'";
                                  break;
                            case 'active_api' :
                                  $whereClauses[] = "t32.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'validity_status' :
                                  $whereClauses[] = "t24.name like '%" . ($filter->value) . "%'";
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

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }
  
        foreach ($results as $results) {
             $data[] = [    'Sub Module'=>$submodule->name,
                            'Product Type'=>$section->name,
                            'Classification'=>$classfication->name,
                            'Reference Number'=>$results->reference_no,
                            'MA No'=>$results->certificate_no,
                            'Brand Name'=>$results->brand_name,
                            'Common Name'=>$results->commonName,
                            'Classification'=>$results->Classification,
                            'Product Strength'=>$results->product_strength,
                            'Active API'=>$results->active_api,
                            'Dosage Form'=>$results->ProductForm,
                            'MA Holder'=>$results->Applicant,
                            'MAH Physical Address'=>$results->ApplicantPhysicalA,
                            'MA Holder Email'=>$results->ApplicantEmail,
                            'MA Holder Country'=>$results->ApplicantCountry,
                            'Local Agent'=>$results->LocalAgent,
                            'Local Agent Physical Address'=>$results->LocalAgentPhysicalA,
                            'Local Agent Email'=>$results->LocalAgentEmail,
                            'Local Agent Country'=>$results->AgentCountry,
                            'Manufacturer'=>$results->Manufacturer,
                            'Manufacturer Physical Address'=>$results->ManufacturerPhysicalA,
                            'Manufacturer Email'=>$results->ManufacturerEmail,
                            'Manufacturer Country'=>$results->ManufacturerCountry,
                            'Issue From '=>$results->IssueFrom,
                            'Registration Status'=>$results->registration_status,
                            'Validity Status'=>$results->validity_status
                            
                           
                        ]; 
              }
           }
          }
        }
      }
      if(empty($data)){
         $response =  array(
           'status'=>'failure',
           'message' => 'Currently there is no data to Export! Make sure you have loaded data you want to export'
         );
 
       }else{
     
        $response=$this->generateExcell($data,$filename,$heading);  
      }
   
        return $response;
   }
   public function checkPrintProductGazzete(Request $req){
     
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $filter = $req->filter;
      $module_id=$req->module_id;
      $classification_category=$req->classification_category;
      $prodclass_category=$req->prodclass_category;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $data = array();
      $datefilter=$this->DateFilter($req);
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      //get section data
      $section_details=array();
      if(validateIsNumeric($section_id)){
          $section_details=array('id'=>$section_id);
      }
     
      //other filterdata for loops
      $category_details=array();
      if(validateIsNumeric($prodclass_category)){
          $category_details=array('id'=>$prodclass_category);

      }
      $classification_details=array();
      if(validateIsNumeric($classification_category)){
          $classification_details=array('t1.id'=>$classification_category);
      }

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_product_information';
      $field='product_id';
      //date filter
    

      $data = array();
      $i = 1;
      $filterdata= '1 ';
      if(validateIsNumeric($section_id)){
        $filterdata .= " AND t1.section_id = ".$section_id;

      }
      if(validateIsNumeric($sub_module_id)){
        $filterdata .= " AND t1.sub_module_id = ".$sub_module_id;

      }
      $subfilterdata= array();
      if(validateIsNumeric($prodclass_category)){
        $subfilterdata['t2.prodclass_category_id'] = $prodclass_category;
      }if(validateIsNumeric($classification_category)){
        $subfilterdata['t2.classification_id'] = $classification_category;
     }
     
            $qry=$this->getApprovedProductRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
            $filter = $req->input('filter');
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
                    case 'reference_no' :
                         $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                         break;  
                    case 'Classification' :
                         $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                         break;
                    case 'commonName' :
                         $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                         break;  
                    case 'ProductForm' :
                         $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
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
                    case 'ApplicantCountry' :
                          $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
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
                    case 'AgentCountry' :
                          $whereClauses[] = "t17.name like '%" . ($filter->value) . "%'";
                          break;
                    case 'IssueFrom' :
                          $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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
                             
                    case 'ManufacturerCountry' :
                          $whereClauses[] = "t28.name like '%" . ($filter->value) . "%'";
                          break;
                    case 'ManufacturerEmail' :
                          $whereClauses[] = "t27.email_address like '%" . ($filter->value) . "%'";
                          break;
                    case 'product_strength' :
                          $whereClauses[] = "t2.product_strength like '%" . ($filter->value) . "%'";
                          break;
                    case 'validity_status' :
                          $whereClauses[] = "t24.name like '%" . ($filter->value) . "%'";
                          break;
                    case 'active_api' :
                          $whereClauses[] = "t32.name like '%" . ($filter->value) . "%'";
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

         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
         if(empty(json_decode($results))){
             $response =  array(
               'status'=>'failure',
               'message' => 'Currently there is no data to Print! Make sure you have loaded data you want to Print'
             );
            }else{
            $response =  array(
               'status'=>'sucesss'
             );
            }
            return $response;
    } 

   public function printProductGazzete(Request $req){
      $title = 'Product Register';
      $w = 20; 
      $w_1 = 30;
      $w_2 = 30;
      $w_4 = 60;
      $h_1=12;
      $h = 5;
      $b=array(0,0,0,0);

      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      //filterdata
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $filter = $req->filter;
      $module_id=$req->module_id;
      $classification_category=$req->classification_category;
      $prodclass_category=$req->prodclass_category;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $data = array();
      $datefilter=$this->DateFilter($req);
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      //get section data
      $section_details=array();
      if(validateIsNumeric($section_id)){
          $section_details=array('id'=>$section_id);
      }
     
      //other filterdata for loops
      $category_details=array();
      if(validateIsNumeric($prodclass_category)){
          $category_details=array('id'=>$prodclass_category);

      }
      $classification_details=array();
      if(validateIsNumeric($classification_category)){
          $classification_details=array('t1.id'=>$classification_category);
      }

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_product_information';
      $field='product_id';
      //date filter
    

      $data = array();
      $i = 1;
      $filterdata= '1 ';
      if(validateIsNumeric($section_id)){
        $filterdata .= " AND t1.section_id = ".$section_id;

      }
      if(validateIsNumeric($sub_module_id)){
        $filterdata .= " AND t1.sub_module_id = ".$sub_module_id;

      }
      $subfilterdata= array();
      if(validateIsNumeric($prodclass_category)){
        $subfilterdata['t2.prodclass_category_id'] = $prodclass_category;
      }if(validateIsNumeric($classification_category)){
        $subfilterdata['t2.classification_id'] = $classification_category;
     }
     
            $qry=$this->getApprovedProductRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
            $filter = $req->input('filter');
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
                    case 'reference_no' :
                         $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                         break;  
                    case 'Classification' :
                         $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                         break;
                    case 'commonName' :
                         $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                         break;  
                    case 'ProductForm' :
                         $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
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
                    case 'ApplicantCountry' :
                          $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
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
                    case 'AgentCountry' :
                          $whereClauses[] = "t17.name like '%" . ($filter->value) . "%'";
                          break;
                    case 'IssueFrom' :
                          $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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
                             
                    case 'ManufacturerCountry' :
                          $whereClauses[] = "t28.name like '%" . ($filter->value) . "%'";
                          break;
                    case 'ManufacturerEmail' :
                          $whereClauses[] = "t27.email_address like '%" . ($filter->value) . "%'";
                          break;
                    case 'product_strength' :
                          $whereClauses[] = "t2.product_strength like '%" . ($filter->value) . "%'";
                          break;
                    case 'validity_status' :
                          $whereClauses[] = "t24.name like '%" . ($filter->value) . "%'";
                          break;
                    case 'active_api' :
                          $whereClauses[] = "t32.name like '%" . ($filter->value) . "%'";
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

         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
         $heading="Product Gazette";
         $data = array();

            PDF::MultiCell(8, $h_1, "No", 1,'C','',0);
            PDF::MultiCell($w_2, $h_1, "Reference Number", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Product Details", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "MAH  Details", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Manufacturer  Details", 1,'C','',0);
            PDF::MultiCell(0, $h_1, "Certificate Details", 1,'C','',1);
   
  
         foreach ($results as $results) {
             
              $rowcount = MAX(PDF::getNumLines("Brand Name:".$results->brand_name."\nCommon Name:".$results->commonName."\nSection:".$results->section_name."\nClassification:".$results->Classification."\nDosage Form:".$results->ProductForm."\nProduct Strength:".$results->product_strength,
                50),PDF::getNumLines("MA Holder:".$results->Applicant."\nEmail:".$results->ApplicantEmail."\nCountry:".$results->ApplicantCountry."\nLocal Agent:".$results->LocalAgent."\nLocal Agent Email:".$results->LocalAgentEmail."\nLocal Agent Country:".$results->AgentCountry,
                50),PDF::getNumLines("Manufacturer Name:".$results->Manufacturer."\nManufacturer Email:".$results->ManufacturerEmail."\nManufacturer Country:".$results->ManufacturerCountry,
                50),PDF::getNumLines("Registration Status:".$results->registration_status."\nValidity Status:".$results->validity_status."\nIssue From:".$results->IssueFrom,50));

             PDF::MultiCell(8, $rowcount *$h, $i,'1','','',0);
             PDF::MultiCell($w_2, $rowcount *$h,$results->reference_no,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Brand Name:".$results->brand_name."\nCommon Name:".$results->commonName."\nSection:".$results->section_name."\nClassification:".$results->Classification."\nDosage Form:".$results->ProductForm."\nProduct Strength:".$results->product_strength,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "MA Holder:".$results->Applicant."\nEmail:".$results->ApplicantEmail."\nCountry:".$results->ApplicantCountry."\nLocal Agent:".$results->LocalAgent."\nLocal Agent Email:".$results->LocalAgentEmail."\nLocal Agent Country:".$results->AgentCountry,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Manufacturer Name:".$results->Manufacturer."\nManufacturer Email:".$results->ManufacturerEmail."\nManufacturer Country:".$results->ManufacturerCountry,1,'L','',0);
             PDF::MultiCell(0, $rowcount *$h,"Certificate Number:".$results->certificate_no."\nRegistration Status:".$results->registration_status."\nValidity Status:".$results->validity_status."\nIssue From:".$results->IssueFrom,1,'L','',1);
             $i++; 

              
              }
           
           
         
         
       PDF::Output('Product Register.pdf','I');
   }  




   public function getPremiseRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $premise_type=$req->premise_type;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';
      //date filter
      $datefilter=$this->DateFilter($req);

      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
       if(validateIsNumeric($premise_type)){
          $subfilterdata=array('t3.premise_type_id'=>$premise_type);
      }
      $qry=$this->getApprovedPremiseRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
      $filter = $req->input('filter');
      $whereClauses = array();
                $filter_string = '';
                if (isset($filter)) {
                $filters = json_decode($filter);
                foreach ($filters as $filter) {
                          switch ($filter->property) {
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'name' :
                                 $whereClauses[] = "t3.email like '%" . ($filter->value) . "%'";
                                 break;
                            case 'email' :
                                 $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'postal_address' :
                                 $whereClauses[] = "t3.postal_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'physical_address' :
                                 $whereClauses[] = "t3.physical_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'Trader' :
                                 $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'TraderPhysicalA' :
                                  $whereClauses[] = "t8.physical_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'TraderEmail' :
                                  $whereClauses[] = "t8.email like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderCountry' :
                                  $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'CertIssueDate' :
                                  $whereClauses[] = "date_format(t15.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;
                            case 'CertExpiryDate' :
                                  $whereClauses[] = "date_format(t15.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;   
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
        $type = $req->input('type');
      if(isset($type)){

      return $results;
      }else{
      return \response()->json($res);
      }
    }


    public function exportPremiseRegister(request $req){
      $sub_module_id=$req->sub_module_id;
      $premise_type=$req->premise_type;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $heading='Premise Register';
      $filename='Premise Register.Xlsx';
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';


      //date filter
      $datefilter=$this->DateFilter($req);


      $subfilterdata = array();
       if(validateIsNumeric($premise_type)){
          $subfilterdata=array('t3.premise_type_id'=>$premise_type);
      }

      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
  

      $data = array();
      foreach ($sub_data as $submodule) {
               
                $filterdata="t1.sub_module_id = ".$submodule->id;
            
                $qry=$this->getApprovedPremiseRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);
                $filter = $req->input('filter');
                $whereClauses = array();
                $filter_string = '';
                if (isset($filter)) {
                $filters = json_decode($filter);
                foreach ($filters as $filter) {
                          switch ($filter->property) {
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'name' :
                                 $whereClauses[] = "t3.email like '%" . ($filter->value) . "%'";
                                 break;
                            case 'email' :
                                 $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'postal_address' :
                                 $whereClauses[] = "t3.postal_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'physical_address' :
                                 $whereClauses[] = "t3.physical_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'Trader' :
                                 $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'TraderPhysicalA' :
                                  $whereClauses[] = "t8.physical_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'TraderEmail' :
                                  $whereClauses[] = "t8.email like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderCountry' :
                                  $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'CertIssueDate' :
                                  $whereClauses[] = "date_format(t15.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;
                            case 'CertExpiryDate' :
                                  $whereClauses[] = "date_format(t15.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;   
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

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }

        foreach ($results as $results) {
             $data[] = [    'Sub Module'=>$submodule->name,
                            'Reference Number'=>$results->reference_no,
                            'Certificate Number'=>$results->certificate_no,
                            'Name'=>$results->name,
                            'Postal Address'=>$results->postal_address,
                            'Physical Address'=>$results->physical_address,
                            'Trader'=>$results->Trader,
                            'Trader Physical Address'=>$results->TraderPhysicalA,
                            'Trader Email'=>$results->TraderEmail,
                            'Trader Country'=>$results->TraderCountry,
                            'Certifiacate Issue Date'=>$results->CertIssueDate,
                            'Certificate Expiry Date'=>$results->CertExpiryDate
                            
                           
                        ]; 
              }
            }
         


        if(empty($data)){
        $response =  array(
           'status'=>'failure',
           'message' => 'Currently there is no data to Export! Make sure you have loaded data you want to export'
        );

       }else{
        $response=$this->generateExcell($data,$filename,$heading);  
       }
        return $response;
       }

    public function checkPrintPremisesRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $premise_type=$req->premise_type;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      
      $submodule_details=array();
    
       $premise_details=array();
     
      $data = array();
     

   $filterdata = '';
      if(validateIsNumeric($sub_module_id)){
        $filterdata="t1.sub_module_id = ".$sub_module_id;

    }
        $subfilterdata = array();
        if(validateIsNumeric($premise_type)){
            $subfilterdata  = array("premise_type_id"=>$premise_type);
        }
         $qry=$this->getApprovedPremiseRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
         $filter = $req->input('filter');
                $whereClauses = array();
                $filter_string = '';
                if (isset($filter)) {
                $filters = json_decode($filter);
                foreach ($filters as $filter) {
                          switch ($filter->property) {
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'name' :
                                 $whereClauses[] = "t3.email like '%" . ($filter->value) . "%'";
                                 break;
                            case 'email' :
                                 $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'postal_address' :
                                 $whereClauses[] = "t3.postal_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'physical_address' :
                                 $whereClauses[] = "t3.physical_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'Trader' :
                                 $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'TraderPhysicalA' :
                                  $whereClauses[] = "t8.physical_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'TraderEmail' :
                                  $whereClauses[] = "t8.email like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderCountry' :
                                  $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'CertIssueDate' :
                                  $whereClauses[] = "date_format(t15.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;
                            case 'CertExpiryDate' :
                                  $whereClauses[] = "date_format(t15.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;   
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
         if(empty(json_decode($results))){
             $response =  array(
               'status'=>'failure',
               'message' => 'Currently there is no data to Print! Make sure you have loaded data you want to Print'
             );
            }else{
            $response =  array(
               'status'=>'sucesss'
             );
            }
            return $response;
    } 

    public function printPremisesRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $premise_type=$req->premise_type;
      $approved_to=$req->approved_to;
      $heading='Premise Register';
      $filename='Premise Register.pdf';
      $title='Premise Register';
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      
      $submodule_details=array();
    
       $premise_details=array();
     
      $data = array();
      $w = 20; 
      $w_1 = 30;
      $w_2 = 35;
      $w_4 = 70;
      $h_1=12;
      $h = 5;
      $b=array(0,0,0,0);

      PDF::SetTitle($title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      
      $i = 1;
   $filterdata = '';
      if(validateIsNumeric($sub_module_id)){
        $filterdata="t1.sub_module_id = ".$sub_module_id;

    }
        $subfilterdata = array();
        if(validateIsNumeric($premise_type)){
            $subfilterdata  = array("premise_type_id"=>$premise_type);
        }
         $qry=$this->getApprovedPremiseRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
         $filter = $req->input('filter');
                $whereClauses = array();
                $filter_string = '';
                if (isset($filter)) {
                $filters = json_decode($filter);
                foreach ($filters as $filter) {
                          switch ($filter->property) {
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'name' :
                                 $whereClauses[] = "t3.email like '%" . ($filter->value) . "%'";
                                 break;
                            case 'email' :
                                 $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'postal_address' :
                                 $whereClauses[] = "t3.postal_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'physical_address' :
                                 $whereClauses[] = "t3.physical_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'Trader' :
                                 $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'TraderPhysicalA' :
                                  $whereClauses[] = "t8.physical_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'TraderEmail' :
                                  $whereClauses[] = "t8.email like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderCountry' :
                                  $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'CertIssueDate' :
                                  $whereClauses[] = "date_format(t15.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;
                            case 'CertExpiryDate' :
                                  $whereClauses[] = "date_format(t15.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;   
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
   
  
            PDF::MultiCell(8, $h_1, "No", 1,'C','',0);
            PDF::MultiCell($w_2, $h_1, "Reference Number", 1,'C','',0);
            PDF::MultiCell($w_1, $h_1, "Permit/License Number", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Premise  Details", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Applicant  Details", 1,'C','',0);
            PDF::MultiCell(0, $h_1, "Status", 1,'C','',1);
   
  
         foreach ($results as $results) {
             
              $rowcount = MAX(PDF::getNumLines( "Name:".$results->name."\nEmail:".$results->email."\nPhysical Address:".$results->physical_address,
                50),PDF::getNumLines("Certificate Issue Dates:".$results->CertIssueDate."\nCertificate Expiry Date:".$results->CertExpiryDate."\nRegistration Status:".$results->registration_status."\nValidity Status:".$results->validity_status,
                50),PDF::getNumLines("Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,50));

             PDF::MultiCell(8, $rowcount *$h, $i,'1','','',0);
             PDF::MultiCell($w_2, $rowcount *$h,$results->reference_no,1,'L','',0);
             PDF::MultiCell($w_1, $rowcount *$h, $results->certificate_no,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Name:".$results->name."\nEmail:".$results->email."\nPhysical Address:".$results->physical_address,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,1,'L','',0);
             PDF::MultiCell(0, $rowcount *$h,"Permit Issue Dates:".$results->CertIssueDate."\Permit Expiry Date:".$results->CertExpiryDate."\nRegistration Status:".$results->registration_status."\nValidity Status:".$results->validity_status,1,'L','',1);
             $i++; 

              
        }
            
       
                 // PDF::Ln();    
       PDF::Output($filename,'I');
   }  

 public function getGmpRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $gmp_location=$req->gmp_location;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='par_gmplocation_details';
      $field= 'gmp_type_id';
      //date filter
      $datefilter=$this->DateFilter($req);
        //printGmpRegister
      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
       if(validateIsNumeric($gmp_location)){
          $subfilterdata=array('t1.gmp_type_id'=>$gmp_location);
      }
      $qry=$this->getApprovedGmpRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
      $filter = $req->input('filter');
                $whereClauses = array();
                $filter_string = '';
                if (isset($filter)) {
                $filters = json_decode($filter);
                foreach ($filters as $filter) {
                          switch ($filter->property) {
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'manufacturer_name' :
                                 $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'manufacturing_site' :
                                 $whereClauses[] = "t33.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'premise_reg_no' :
                                 $whereClauses[] = "t33.premise_reg_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'physical_address' :
                                 $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'postal_address' :
                                 $whereClauses[] = "t44.postal_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'email_address' :
                                  $whereClauses[] = "t44.email_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'country' :
                                  $whereClauses[] = "t55.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'business_type' :
                                  $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'Trader' :
                                  $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderPhysicalA' :
                                  $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                  break;
                            case 'TraderPostalA' :
                                  $whereClauses[] = "t10.postal_address like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderEmail' :
                                  $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                  break;
                            case 'TraderCountry' :
                                  $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'IssueFrom' :
                                  $whereClauses[] = "date_format(t18.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;
                            case 'certificate_no' :
                                  $whereClauses[] = "t18.certificate_no like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'validity_status' :
                                  $whereClauses[] = "tv.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'approval_recommendation' :
                                  $whereClauses[] = "t21.name like '%" . ($filter->value) . "%'";
                                  break; 
                           
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
          $type = $req->input('type');
      if(isset($type)){

      return $results;
      }else{
      return \response()->json($res);
      }
    }
public function exportGmpRegister(request $req){
      $sub_module_id=$req->sub_module_id;
      $gmp_location=$req->gmp_location;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $heading='GMP Register';
      $filename='GMP Register.Xlsx';
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='par_gmplocation_details';
      $field= 'gmp_type_id';


      //date filter
      $datefilter=$this->DateFilter($req);


      $subfilterdata = array();
       if(validateIsNumeric($gmp_location)){
          $subfilterdata=array('t1.gmp_type_id'=>$gmp_location);
      }

      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
  

      $data = array();
      foreach ($sub_data as $submodule) {
               
                $filterdata="t1.sub_module_id = ".$submodule->id;
            
                $qry=$this->getApprovedGmpRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);
                $filter = $req->input('filter');
                $whereClauses = array();
                $filter_string = '';
                if (isset($filter)) {
                $filters = json_decode($filter);
                foreach ($filters as $filter) {
                          switch ($filter->property) {
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'manufacturer_name' :
                                 $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'manufacturing_site' :
                                 $whereClauses[] = "t33.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'premise_reg_no' :
                                 $whereClauses[] = "t33.premise_reg_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'physical_address' :
                                 $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'postal_address' :
                                 $whereClauses[] = "t44.postal_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'email_address' :
                                  $whereClauses[] = "t44.email_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'country' :
                                  $whereClauses[] = "t55.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'business_type' :
                                  $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'Trader' :
                                  $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderPhysicalA' :
                                  $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                  break;
                            case 'TraderPostalA' :
                                  $whereClauses[] = "t10.postal_address like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderEmail' :
                                  $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                  break;
                            case 'TraderCountry' :
                                  $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'IssueFrom' :
                                  $whereClauses[] = "date_format(t18.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;
                            case 'certificate_no' :
                                  $whereClauses[] = "t18.certificate_no like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'validity_status' :
                                  $whereClauses[] = "tv.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'approval_recommendation' :
                                  $whereClauses[] = "t21.name like '%" . ($filter->value) . "%'";
                                  break; 
                           
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

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }

        foreach ($results as $results) {
             $data[] = [    'Sub Module'=>$submodule->name,
                            'Reference Number'=>$results->reference_no,
                            'Certificate Number'=>$results->certificate_no,
                            'Manufacturer Name'=>$results->manufacturer_name,
                            'Manufacturing Site'=>$results->manufacturing_site,
                            'Manufacturer Country'=>$results->country,
                            'Manufacturer Email'=>$results->email_address,
                            'Manufacturer Postal Address'=>$results->postal_address,
                            'Manufacturer Physical Address'=>$results->physical_address,
                            'Bysines Type'=>$results->business_type,
                            'Premise Registration Number'=>$results->premise_reg_no,
                            'Applicant'=>$results->Trader,
                            'Applicant Postal Address'=>$results->TraderPostalA,
                            'Applicant Physical Address'=>$results->TraderPhysicalA,
                            'Applicant Email'=>$results->TraderEmail,
                            'Applicant County'=>$results->TraderCountry,
                            'Approved On'=>$results->IssueFrom,
                            'Approval Recommendation'=>$results->approval_recommendation,
                            'Validity Status'=>$results->validity_status
   
                        ]; 
              }

            }

          if(empty($data)){
        $response =  array(
           'status'=>'failure',
           'message' => 'Currently there is no data to Export! Make sure you have loaded data you want to export'
        );

       }else{
        $response=$this->generateExcell($data,$filename,$heading);  
       }
        return $response;
       }

    public function checkPrintGmpRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $gmp_location=$req->gmp_location;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='par_gmplocation_details';
      $field= 'gmp_type_id';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $gmplocation_details=array();
      if(validateIsNumeric($gmp_location)){
         $gmplocation_details=array('t1.id'=>$gmp_location);
      }
      $data = array();

         $filterdata = '';
         if(validateIsNumeric($sub_module_id)){
            $filterdata="t1.sub_module_id = ".$sub_module_id;
        }
        $subfilterdata = array();
         if(validateIsNumeric($gmp_location)){
            $subfilterdata=array('t1.gmp_type_id'=>$gmp_location);
        }
        
         $qry=$this->getApprovedGmpRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);
         $filter = $req->input('filter');
         $whereClauses = array();
                $filter_string = '';
                if (isset($filter)) {
                $filters = json_decode($filter);
                foreach ($filters as $filter) {
                          switch ($filter->property) {
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'manufacturer_name' :
                                 $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'manufacturing_site' :
                                 $whereClauses[] = "t33.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'premise_reg_no' :
                                 $whereClauses[] = "t33.premise_reg_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'physical_address' :
                                 $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'postal_address' :
                                 $whereClauses[] = "t44.postal_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'email_address' :
                                  $whereClauses[] = "t44.email_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'country' :
                                  $whereClauses[] = "t55.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'business_type' :
                                  $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'Trader' :
                                  $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderPhysicalA' :
                                  $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                  break;
                            case 'TraderPostalA' :
                                  $whereClauses[] = "t10.postal_address like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderEmail' :
                                  $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                  break;
                            case 'TraderCountry' :
                                  $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'IssueTo' :
                                  $whereClauses[] = "date_format(t18.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;
                            case 'certificate_no' :
                                  $whereClauses[] = "t18.certificate_no like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'validity_status' :
                                  $whereClauses[] = "tv.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'approval_recommendation' :
                                  $whereClauses[] = "t21.name like '%" . ($filter->value) . "%'";
                                  break; 
                           
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
         if(empty(json_decode($results))){
             $response =  array(
               'status'=>'failure',
               'message' => 'Currently there is no data to Print! Make sure you have loaded data you want to Print'
             );
            }else{
            $response =  array(
               'status'=>'sucesss'
             );
            }
            return $response;
    } 

   public function printGmpRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $gmp_location=$req->gmp_location;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
       $heading='GMP Register';
      $filename='GMP Register.pdf';
      $title='GMP Register';
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='par_gmplocation_details';
      $field= 'gmp_type_id';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $gmplocation_details=array();
      if(validateIsNumeric($gmp_location)){
         $gmplocation_details=array('t1.id'=>$gmp_location);
      }
      $data = array();
      $w = 20; 
      $w_1 = 40;
      $w_2 = 25;
      $w_3 = 90;
      $h_1=8;
      $h = 5;
      $b=array(0,0,0,0);

      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      
      $i = 1;
      //start loop
      

         $filterdata = '';
         if(validateIsNumeric($sub_module_id)){
            $filterdata="t1.sub_module_id = ".$sub_module_id;
        }
        $subfilterdata = array();
         if(validateIsNumeric($gmp_location)){
            $subfilterdata=array('t1.gmp_type_id'=>$gmp_location);
        }
        
         $qry=$this->getApprovedGmpRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);
         $filter = $req->input('filter');
         $whereClauses = array();
                $filter_string = '';
                if (isset($filter)) {
                $filters = json_decode($filter);
                foreach ($filters as $filter) {
                          switch ($filter->property) {
                            case 'reference_no' :
                                 $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'manufacturer_name' :
                                 $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                 break;
                            case 'manufacturing_site' :
                                 $whereClauses[] = "t33.name like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'premise_reg_no' :
                                 $whereClauses[] = "t33.premise_reg_no like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'physical_address' :
                                 $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'postal_address' :
                                 $whereClauses[] = "t44.postal_address like '%" . ($filter->value) . "%'";
                                 break;
                            case 'email_address' :
                                  $whereClauses[] = "t44.email_address like '%" . ($filter->value) . "%'";
                                 break;  
                            case 'country' :
                                  $whereClauses[] = "t55.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'business_type' :
                                  $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'Trader' :
                                  $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderPhysicalA' :
                                  $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                  break;
                            case 'TraderPostalA' :
                                  $whereClauses[] = "t10.postal_address like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'TraderEmail' :
                                  $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                  break;
                            case 'TraderCountry' :
                                  $whereClauses[] = "t14.name like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'IssueTo' :
                                  $whereClauses[] = "date_format(t18.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                  break;
                            case 'certificate_no' :
                                  $whereClauses[] = "t18.certificate_no like '%" . ($filter->value) . "%'";
                                  break;  
                            case 'validity_status' :
                                  $whereClauses[] = "tv.name like '%" . ($filter->value) . "%'";
                                  break;
                            case 'approval_recommendation' :
                                  $whereClauses[] = "t21.name like '%" . ($filter->value) . "%'";
                                  break; 
                           
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
            PDF::MultiCell(14, $h_1, "No", 1,'C','',0);
             PDF::MultiCell(40, $h_1, "Reference Number", 1,'C','',0);
             PDF::MultiCell($w_3, $h_1, "Munufacturer Details", 1,'C','',0);
             PDF::MultiCell($w_3, $h_1, "Applicant Details", 1,'C','',0);
             PDF::MultiCell(0, $h_1, "Status", 1,'C','',1);
   
  
         foreach ($results as $results) {
             
              $rowcount = MAX(PDF::getNumLines("Munufacturer Name:".$results->manufacturer_name."\nManufacturing Site:".$results->manufacturing_site."\nManufacturing Email:".$results->email_address."\nManufacturing Country:".$results->country,60),
              PDF::getNumLines("Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,
                60),PDF::getNumLines("Approval Reccomendation:".$results->approval_recommendation."\nValidity:".$results->validity_status,60));

             PDF::MultiCell(14, $rowcount *$h, $i,'1','','',0);
             PDF::MultiCell(40, $rowcount *$h,$results->reference_no,1,'L','',0);
             PDF::MultiCell($w_3, $rowcount *$h,"Munufacturer Name:".$results->manufacturer_name."\nManufacturing Site:".$results->manufacturing_site."\nManufacturing Email:".$results->email_address."\nManufacturing Country:".$results->country,1,'L','',0);
             PDF::MultiCell($w_3, $rowcount *$h, "Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,1,'L','',0);
             PDF::MultiCell(0, $rowcount *$h,"Approval Reccomendation:".$results->approval_recommendation."\nValidity:".$results->validity_status,1,'L','',1);
             $i++; 

              
             }
     
       
                 // PDF::Ln();    
       PDF::Output($filename,'I');
   }  


    public function getClinicalTrialRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='clinical_trial_products';
      $field='id';
      //date filter
      $datefilter=$this->DateFilter($req);

      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
    
      $qry=$this->getApprovedClinicalTrialRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
       $filter = $req->input('filter');
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
                                case 'investigator' :
                                    $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                    break;
                         
                                case 'Iphysical_address' :
                                    $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                  
                                case 'Iemail_address' :
                                    $whereClauses[] = "t44.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Icountry' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant' :
                                    $whereClauses[] = "t25.name like '%" . ($filter->value) . "%'";
                                    break;
                                  
                                case 'applicant_physical_address' :
                                    $whereClauses[] = "t25.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_email_address' :
                                    $whereClauses[] = "t25.email like '%" . ($filter->value) . "%'";
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

                    $type = $req->input('type');
                    if(isset($type)){

                      return $results;
                    }else{
                     return \response()->json($res);
                    }
    }

    public function exportClinicalTrialRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='clinical_trial_products';
      $field='id';
      $filename='Clinical_Trial_Register.Xlsx';
      $heading='Clinical Trial Register';

      //date filter
      $datefilter=$this->DateFilter($req);

      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
    
      $qry=$this->getApprovedClinicalTrialRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
       $filter = $req->input('filter');
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
                                case 'investigator' :
                                    $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                    break;
                         
                                case 'Iphysical_address' :
                                    $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                  
                                case 'Iemail_address' :
                                    $whereClauses[] = "t44.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Icountry' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant' :
                                    $whereClauses[] = "t25.name like '%" . ($filter->value) . "%'";
                                    break;
                                  
                                case 'applicant_physical_address' :
                                    $whereClauses[] = "t25.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_email_address' :
                                    $whereClauses[] = "t25.email like '%" . ($filter->value) . "%'";
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

      foreach ($results as $results) {
             $data[] = [  
                            'Reference Number'=>$results->reference_no,
                            'Study Title'=>$results->study_title,
                            'Protocol No'=>$results->protocol_no,
                            'Protocol Version'=>$results->protocol_no,
                            'Applicant'=>$results->applicant,
                            'Applicant Physical Address'=>$results->applicant_physical_address,
                            'Applicant Email'=>$results->applicant_email_address,
                            'Applicant County'=>$results->applicant_country,
                            'Investigator'=>$results->investigator,
                            'Investigator Physical Address'=>$results->Iphysical_address,
                            'Investigator Email'=>$results->Iemail_address,
                            'Investigator County'=>$results->Icountry,
                            'Registration Status'=>$results->registration_status,
                            'Validity Status'=>$results->validity_status
   
                        ]; 

            }
     
        if(empty($data)){
         $response =  array(
           'status'=>'failure',
           'message' => 'Currently there is no data to Export! Make sure you have loaded data you want to export'
         );
 
         }else{
          $response=$this->generateExcell($data,$filename,$heading);  
         }
          return $response;
      }


    public function checkPrintClinicalTrialRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $heading=$req->heading;
      $filename=$req->filename;
      $title=$req->title;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='clinical_trial_products';
      $field='id';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();


      
      foreach ($sub_data as $submodule) { 
        
           
         $filterdata = [];
         if( validateIsNumeric($submodule->id)){
      
          $filterdata[] ="t1.sub_module_id = ".$submodule->id;
          }
            
         $filterdata=implode(' AND ',$filterdata );
         $qry=$this->getApprovedClinicalTrialRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);
          $filter = $req->input('filter');
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
                                case 'investigator' :
                                    $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                    break;
                         
                                case 'Iphysical_address' :
                                    $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                  
                                case 'Iemail_address' :
                                    $whereClauses[] = "t44.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Icountry' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant' :
                                    $whereClauses[] = "t25.name like '%" . ($filter->value) . "%'";
                                    break;
                                  
                                case 'applicant_physical_address' :
                                    $whereClauses[] = "t25.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_email_address' :
                                    $whereClauses[] = "t25.email like '%" . ($filter->value) . "%'";
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
         if(empty(json_decode($results))){
             $response =  array(
               'status'=>'failure',
               'message' => 'Currently there is no data to Print! Make sure you have loaded data you want to Print'
             );
            }else{
            $response =  array(
               'status'=>'sucesss'
             );
            }
            return $response;
          } 
      }

      
     public function printClinicalTrialRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $heading=$req->heading;
      $filename=$req->filename;
      $title=$req->title;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='clinical_trial_products';
      $field='id';
      $filename='clinicalTrial_Register.pdf';
      $heading= 'Clinical Trial Register';
      $title='Clinical Trial Register';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();


      $data = array();
      $w = 20; 
      $w_1 = 40;
      $w_2 = 25;
      $w_3 = 50;
      $w_4 = 60;
      $h_1=8;
      $h = 5;
      $b=array(0,0,0,0);

      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      
      $i = 1;
      //start loop
      
      //foreach ($sub_data as $submodule) { 
         // PDF::SetFont('','B',11);
         // PDF::SetFillColor(249,249,249);
         // PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'fill','B');
           
         $filterdata = [];
         if( validateIsNumeric($sub_module_id)){
      
          $filterdata[] ="t1.sub_module_id = ".$sub_module_id;
          }
            
         $filterdata=implode(' AND ',$filterdata );
         $qry=$this->getApprovedClinicalTrialRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);
          $filter = $req->input('filter');
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
                                case 'investigator' :
                                    $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                    break;
                         
                                case 'Iphysical_address' :
                                    $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                  
                                case 'Iemail_address' :
                                    $whereClauses[] = "t44.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'Icountry' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant' :
                                    $whereClauses[] = "t25.name like '%" . ($filter->value) . "%'";
                                    break;
                                  
                                case 'applicant_physical_address' :
                                    $whereClauses[] = "t25.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'applicant_email_address' :
                                    $whereClauses[] = "t25.email like '%" . ($filter->value) . "%'";
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
                          
                            //}
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
            PDF::MultiCell(14, $h_1, "No", 1,'C','',0);
             PDF::MultiCell(35, $h_1, "Reference Number", 1,'C','',0);
             PDF::MultiCell($w_4, $h_1, "Study Title", 1,'C','',0);
             PDF::MultiCell($w_1, $h_1, "Protocal Details", 1,'C','',0);
             PDF::MultiCell($w_3, $h_1, "Applicant Details", 1,'C','',0);
             PDF::MultiCell($w_3, $h_1, "Investigator Details", 1,'C','',0);
             PDF::MultiCell(0, $h_1, "Status", 1,'C','',1);
   
  
         foreach ($results as $results) {
             
              $rowcount = MAX(PDF::getNumLines($results->study_title,
                47),PDF::getNumLines("protocol No:".$results->protocol_no."\nVersion:".$results->version_no, 47),
              PDF::getNumLines("Name:".$results->applicant."\nEmail:".$results->applicant_email_address."\nCountry:".$results->applicant_country,
                47),PDF::getNumLines("Registration Status:".$results->registration_status."\nValidity:".$results->validity_status,
                47),PDF::getNumLines("Name:".$results->investigator."\nEmail:".$results->Iemail_address."\nCountry:".$results->Icountry,47));

             PDF::MultiCell(14, $rowcount *$h, $i,'1','','',0);
             PDF::MultiCell(35, $rowcount *$h,$results->reference_no,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, $results->study_title,1,'L','',0);
             PDF::MultiCell($w_1, $rowcount *$h,"protocol No:".$results->protocol_no."\nVersion:".$results->version_no,1,'L','',0);
             PDF::MultiCell($w_3, $rowcount *$h, "Name:".$results->applicant."\nEmail:".$results->applicant_email_address."\nCountry:".$results->applicant_country,1,'L','',0);
             PDF::MultiCell($w_3, $rowcount *$h,"Name:".$results->investigator."\nEmail:".$results->Iemail_address."\nCountry:".$results->Icountry,1,'L','',0);
             PDF::MultiCell(0, $rowcount *$h,"Registration Status:".$results->registration_status."\nValidity:".$results->validity_status,1,'L','',1);
             $i++; 

              
             }
            
        }
       
                 // PDF::Ln();    
       PDF::Output($filename,'I');
   }  


 public function getDisposalRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilter($req);

      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
    
      $qry=$this->getApprovedDisposalRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
      $filter = $req->input('filter');
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
                                case 'market_value' :
                                    $whereClauses[] = "t1.market_value like '%" . ($filter->value) . "%'";
                                    break;
                              
                                case 'inspector_name' :
                                    $whereClauses[] = "t10.inspector_name like '%" . ($filter->value) . "%'";
                                    break;

                                case 'inpsector_title' :
                                    $whereClauses[] = "t11.name  like '%" . ($filter->value) . "%'";
                                    break;
                                     case 'inpsector_organisation' :
                                    $whereClauses[] = "t12.name  like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_name' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'trader_physical_address' :
                                    $whereClauses[] = "t13.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_email_address' :
                                    $whereClauses[] = "t13.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_country' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;
                    
                               
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t19.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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

    $res = array(
            'success' => true,
            'results' => $results,
            'message' => 'All is well',
            'totalResults'=>$total
               );

       $type = $req->input('type');
      if(isset($type)){

      return $results;
      }else{
        return \response()->json($res);
       }
     }

     public function exportDisposalRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $filename='Disposal_Register.Xlsx';
      $heading='Disposal Register';


      //date filter
      $datefilter=$this->DateFilter($req);

      $data = array();
      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
    
      $qry=$this->getApprovedDisposalRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
      $filter = $req->input('filter');
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
                                case 'market_value' :
                                    $whereClauses[] = "t1.market_value like '%" . ($filter->value) . "%'";
                                    break;
                              
                                case 'inspector_name' :
                                    $whereClauses[] = "t10.inspector_name like '%" . ($filter->value) . "%'";
                                    break;

                                case 'inpsector_title' :
                                    $whereClauses[] = "t11.name  like '%" . ($filter->value) . "%'";
                                    break;
                                     case 'inpsector_organisation' :
                                    $whereClauses[] = "t12.name  like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_name' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'trader_physical_address' :
                                    $whereClauses[] = "t13.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_email_address' :
                                    $whereClauses[] = "t13.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_country' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;
                    
                               
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t19.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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

     foreach ($results as $results) {
             $data[] = [  
                            'Reference Number'=>$results->reference_no,
                            'Certificate Number'=>$results->certificate_no,
                            'Destruction Site'=>$results->destruction_site,
                            'Destruction Method'=>$results->destruction_method,
                            'Reason for Disposal'=>$results->reason_for_disposal,
                            'Quantity'=>$results->quantity,
                            'Packaging Unit'=>$results->packaging_unit,
                            'Market Value'=>$results->market_value.' '.$results->currency,
                            'Applicant'=>$results->trader_name,
                            'Applicant Physical Address'=>$results->trader_physical_address,
                            'Applicant Email'=>$results->trader_email_address,
                            'Applicant County'=>$results->trader_country,
                            'Certificate Issue Date'=>($results->CertIssueDate ? date('Y-m-d', strtotime($results->CertIssueDate)) : ''),
                            'Certificate Expiry Date'=>($results->CertExpiryDate ? date('Y-m-d', strtotime($results->CertExpiryDate)) : '')
   
                        ]; 
              }

     
        if(empty($data)){
        $response =  array(
           'status'=>'failure',
           'message' => 'Currently there is no data to Export! Make sure you have loaded data you want to export'
        );

       }else{
        $response=$this->generateExcell($data,$filename,$heading);  
       }
        return $response;
       }

    public function checkPrintDisposalRegister(Request $req){

      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();


      $data = array();
     
      
      foreach ($sub_data as $submodule) { 
           
         $filterdata = [];
         if( validateIsNumeric($submodule->id)){
      
          $filterdata[] ="t1.sub_module_id = ".$submodule->id;
          }
            
         $filterdata=implode(' AND ',$filterdata );
         $qry=$this->getApprovedDisposalRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);

         $filter = $req->input('filter');
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
                                case 'market_value' :
                                    $whereClauses[] = "t1.market_value like '%" . ($filter->value) . "%'";
                                    break;
                              
                                case 'inspector_name' :
                                    $whereClauses[] = "t10.inspector_name like '%" . ($filter->value) . "%'";
                                    break;

                                case 'inpsector_title' :
                                    $whereClauses[] = "t11.name  like '%" . ($filter->value) . "%'";
                                    break;
                                     case 'inpsector_organisation' :
                                    $whereClauses[] = "t12.name  like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_name' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'trader_physical_address' :
                                    $whereClauses[] = "t13.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_email_address' :
                                    $whereClauses[] = "t13.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_country' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;
                    
                               
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t19.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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
              }

              if ($filter_string != '') {
                $qry->whereRAW($filter_string);
                      }

         
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
         if(empty(json_decode($results))){
             $response =  array(
               'status'=>'failure',
               'message' => 'Currently there is no data to Print! Make sure you have loaded data you want to Print'
             );
            }else{
            $response =  array(
               'status'=>'sucesss'
             );
            }
            return $response;

    } 
   

    public function printDisposalRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      $filename='Disposal_Register.pdf';
      $heading='Disposal Register';
      $title='Disposal Register';
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();


      $data = array();
      $w = 20; 
      $w_1 = 30;
      $w_2 = 52;
      $w_3 = 40;
      $w_4 = 75;
      $h_1=16;
      $h = 5;
      $b=array(0,0,0,0);

      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      
      $i = 1;
      //start loop
      
      foreach ($sub_data as $submodule) { 
         PDF::SetFont('','B',11);
         PDF::SetFillColor(249,249,249);
         PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'fill','B');
           
         $filterdata = [];
         if( validateIsNumeric($submodule->id)){
      
          $filterdata[] ="t1.sub_module_id = ".$submodule->id;
          }
            
         $filterdata=implode(' AND ',$filterdata );
         $qry=$this->getApprovedDisposalRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter);

         $filter = $req->input('filter');
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
                                case 'market_value' :
                                    $whereClauses[] = "t1.market_value like '%" . ($filter->value) . "%'";
                                    break;
                              
                                case 'inspector_name' :
                                    $whereClauses[] = "t10.inspector_name like '%" . ($filter->value) . "%'";
                                    break;

                                case 'inpsector_title' :
                                    $whereClauses[] = "t11.name  like '%" . ($filter->value) . "%'";
                                    break;
                                     case 'inpsector_organisation' :
                                    $whereClauses[] = "t12.name  like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_name' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'trader_physical_address' :
                                    $whereClauses[] = "t13.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_email_address' :
                                    $whereClauses[] = "t13.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'trader_country' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;
                    
                               
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t19.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t19.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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

         
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
            PDF::MultiCell(14, $h_1, "No", 1,'C','',0);
             PDF::MultiCell(35, $h_1, "Reference Number", 1,'C','',0);
              PDF::MultiCell($w_1, $h_1, "Certificate Number", 1,'C','',0);
             PDF::MultiCell($w_4, $h_1, "Disposal  Details", 1,'C','',0);
             PDF::MultiCell($w_2, $h_1, "Product  Details", 1,'C','',0);
             PDF::MultiCell($w_3, $h_1, "Inspector Details", 1,'C','',0);
             PDF::MultiCell(0, $h_1, "Certificate Issue Date", 1,'C','',1);
   
  
         foreach ($results as $results) {
             
              $rowcount = MAX(PDF::getNumLines($submodule->name,60),PDF::getNumLines("Quantity:".$results->quantity."\nPackaging Unit:".$results->packaging_unit."\nMarket Value:".$results->market_value.' '.$results->currency,
                60),PDF::getNumLines("Destruction Site:".$results->destruction_site."\nDestruction Method:".$results->destruction_method."\nReason for Disposal:".$results->reason_for_disposal,60));

             PDF::MultiCell(14, $rowcount *$h, $i,'1','','',0);
             PDF::MultiCell(35, $rowcount *$h,$results->reference_no,1,'L','',0);
             PDF::MultiCell($w_1, $rowcount *$h, $results->certificate_no,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h,"Destruction Site:".$results->destruction_site."\nDestruction Method:".$results->destruction_method."\nReason for Disposal:".$results->reason_for_disposal,1,'L','',0);
             PDF::MultiCell($w_2, $rowcount *$h,"Quantity:".$results->quantity."\nPackaging Unit:".$results->packaging_unit."\nMarket Value:".$results->market_value.' '.$results->currency,1,'L','',0);
             PDF::MultiCell($w_3, $rowcount *$h, "Name:".$results->trader_name."\nEmail:".$results->trader_email_address."\nCountry:".$results->trader_country,1,'L','',0);
             PDF::MultiCell(0, $rowcount *$h,$results->CertIssueDate,1,'L','',1);
             $i++; 

              
             }
            
        }
       
                 // PDF::Ln();    
       PDF::Output($filename,'I');
   }  


     
    public function getPromotionAdvertisementRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $advertisement_type_id=$req->advertisement_type_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilter($req);

      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
      if(validateIsNumeric($advertisement_type_id)){
        $subfilterdata=array('t1.advertisement_type_id'=>$advertisement_type_id);
      }
    
      $qry=$this->getApprovedPromotionAdvertisementRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
      $filter = $req->input('filter');
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
                                
                                case 'Trader' :
                                    $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderPhysicalA' :
                                    $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'TraderEmail' :
                                    $whereClauses[] = "t44.email like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'TraderCountry' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break;
                              
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t2.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t2.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                
                                case 'certificate_no' :
                                    $whereClauses[] = "t2.certificate_no like '%" . ($filter->value) . "%'";
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

      $type = $req->input('type');
      if(isset($type)){

      return $results;
      }else{
      return \response()->json($res);
      }
    }

     public function exportPromotionAdvertisementRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $advertisement_type_id=$req->advertisement_type_id;
      $module_id=$req->module_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $filename='Promotion_advertisement_Register.Xlsx';
      $heading='Promotion & Advertisement Register';
    

      //date filter
      $datefilter=$this->DateFilter($req);

      $data = array();

      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
      if(validateIsNumeric($advertisement_type_id)){
        $subfilterdata=array('t1.advertisement_type_id'=>$advertisement_type_id);
      }
    
      $qry=$this->getApprovedPromotionAdvertisementRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
      $filter = $req->input('filter');
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
                                
                                case 'Trader' :
                                    $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderPhysicalA' :
                                    $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'TraderEmail' :
                                    $whereClauses[] = "t44.email like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'TraderCountry' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break;
                              
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t2.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t2.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                
                                case 'certificate_no' :
                                    $whereClauses[] = "t2.certificate_no like '%" . ($filter->value) . "%'";
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

      if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
      }
      else{
        $results=$qry->get();
      }
        foreach ($results as $results) {
             $data[] = [
                            'Reference Number'=>$results->reference_no,
                            'Certificate Number'=>$results->certificate_no,
                            'Trader'=>$results->Trader,
                            'Trader Physical Address'=>$results->TraderPhysicalA,
                            'Trader Email'=>$results->TraderEmail,
                            'Trader Country'=>$results->TraderCountry,
                            'Registration Status'=>$results->registration_status,
                            'Validity Status'=>$results->validity_status
                            
                           
                        ]; 
              }

        if(empty($data)){
        $response =  array(
           'status'=>'failure',
           'message' => 'Currently there is no data to Export! Make sure you have loaded data you want to export'
        );

       }else{
        $response=$this->generateExcell($data,$filename,$heading);  
       }
        return $response;
       }

   public function checkPrintPromotionAdvertisementRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $advertisement_type_id=$req->advertisement_type_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $advertisement_details=array();
      if(validateIsNumeric($advertisement_type_id)){
         $advertisement_details=array('id'=>$advertisement_type_id);
      }
      
   
        $filterdata = '';
          if(validateIsNumeric($sub_module_id)){
             $filterdata="t1.sub_module_id = ".$sub_module_id;
         }
         $subfilterdata = array();
          if(validateIsNumeric($advertisement_type_id)){
             $subfilterdata=array('t1.advertisement_type_id'=>$advertisement_type_id);
         }
  
         $qry=$this->getApprovedPromotionAdvertisementRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
         $filter = $req->input('filter');
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
                                
                                case 'Trader' :
                                    $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderPhysicalA' :
                                    $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'TraderEmail' :
                                    $whereClauses[] = "t44.email like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'TraderCountry' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break;
                              
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t2.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t2.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                
                                case 'certificate_no' :
                                    $whereClauses[] = "t2.certificate_no like '%" . ($filter->value) . "%'";
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

         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
         if(empty(json_decode($results))){
             $response =  array(
               'status'=>'failure',
               'message' => 'Currently there is no data to Print! Make sure you have loaded data you want to Print'
             );
            }else{
            $response =  array(
               'status'=>'sucesss'
             );
            }
            return $response;
    } 
   

     
    public function printPromotionAdvertisementRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $advertisement_type_id=$req->advertisement_type_id;
      $approved_from=$req->approved_from;
      $approved_to=$req->approved_to;
      $filename='Promotion_advertisement_Register.Xlsx';
      $heading='Promotion & Advertisement Register';
      $title='Promotion & Advertisement Register';
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $advertisement_details=array();
      if(validateIsNumeric($advertisement_type_id)){
         $advertisement_details=array('id'=>$advertisement_type_id);
      }
      $data = array();
      $w = 20; 
      $w_1 = 40;
      $w_2 = 55;
      $w_4 = 110;
      $h_1=12;
      $h = 5;
      $b=array(0,0,0,0);

      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      
      $i = 1;
      //start loop
   
          $filterdata = '';
          if(validateIsNumeric($sub_module_id)){
             $filterdata="t1.sub_module_id = ".$sub_module_id;
         }
         $subfilterdata = array();
          if(validateIsNumeric($advertisement_type_id)){
             $subfilterdata=array('t1.advertisement_type_id'=>$advertisement_type_id);
         }
  
         $qry=$this->getApprovedPromotionAdvertisementRegister($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
         $filter = $req->input('filter');
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
                                
                                case 'Trader' :
                                    $whereClauses[] = "t44.name like '%" . ($filter->value) . "%'";
                                    break;
                                case 'TraderPhysicalA' :
                                    $whereClauses[] = "t44.physical_address like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'TraderEmail' :
                                    $whereClauses[] = "t44.email like '%" . ($filter->value) . "%'";
                                    break; 
                                case 'TraderCountry' :
                                    $whereClauses[] = "t6.name like '%" . ($filter->value) . "%'";
                                    break;
                              
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t2.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t2.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;
                                
                                case 'certificate_no' :
                                    $whereClauses[] = "t2.certificate_no like '%" . ($filter->value) . "%'";
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

         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
   
  
            PDF::MultiCell(14, $h_1, "No", 1,'C','',0);
            PDF::MultiCell($w_2, $h_1, "Reference Number", 1,'C','',0);
            PDF::MultiCell($w_1, $h_1, "MA Number", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Applicant  Details", 1,'C','',0);
            PDF::MultiCell(0, $h_1, "Status", 1,'C','',1);
   
  
         foreach ($results as $results) {
             
              $rowcount = MAX(PDF::getNumLines("Registration Status:".$results->registration_status."\nValidity Status:".$results->validity_status,
                50),PDF::getNumLines("Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,50));

             PDF::MultiCell(14, $rowcount *$h, $i,'1','','',0);
             PDF::MultiCell($w_2, $rowcount *$h,$results->reference_no,1,'L','',0);
             PDF::MultiCell($w_1, $rowcount *$h, $results->certificate_no,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,1,'L','',0);
             PDF::MultiCell(0, $rowcount *$h,"Registration Status:".$results->registration_status."\nValidity Status:".$results->validity_status,1,'L','',1);
             $i++; 

              
             }
            
      
                 // PDF::Ln();    
       PDF::Output($filename,'I');
   }  

    public function getImportExportRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $permit_type=$req->permit_type;
      $module_id=$req->module_id;
      $released_from=$req->released_from;
      $released_to=$req->released_to;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilterImportExport($req);


      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
       if(validateIsNumeric($permit_type)){
          $subfilterdata=array('t1.importexport_permittype_id'=>$permit_type);
      }
      $qry=$this->getImportExportPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
      $filter = $req->input('filter');
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
                                
                                case 'consignee' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'Cphysical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Cemail_address' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ccountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;  
                             ; 
                                case 'senderreceiver' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'SRphysical_address' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'SRemail_address' :
                                    $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRcountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Applicant' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;
                                 
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t18.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                    break;
                             
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'certificate_no' :
                                    $whereClauses[] = "t17.permit_no like '%" . ($filter->value) . "%'";
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

      $type = $req->input('type');
      if(isset($type)){

      return $results;
      }else{
      return \response()->json($res);
      }
    }


    public function exportImportExportRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $permit_type=$req->permit_type;
      $module_id=$req->module_id;
      $released_from=$req->released_from;
      $released_to=$req->released_to;
      $filter = $req->filter;
      $filename=$req->filename;
      $heading=$req->heading;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilterImportExport($req);
      $data = array();
     
      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
       if(validateIsNumeric($permit_type)){
          $subfilterdata=array('t1.importexport_permittype_id'=>$permit_type);
      }
      $qry=$this->getImportExportPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
      $filter = $req->input('filter');
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
                                
                                case 'consignee' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'Cphysical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Cemail_address' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ccountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;  
                             ; 
                                case 'senderreceiver' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'SRphysical_address' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'SRemail_address' :
                                    $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRcountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Applicant' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;
                                 
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t18.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                    break;
                             
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'certificate_no' :
                                    $whereClauses[] = "t17.permit_no like '%" . ($filter->value) . "%'";
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
      foreach ($results as $results) {
                  $data[] = [ 
                              'Reference Number'=>$results->reference_no,
                              'Permit Reason'=>$results->permitreason,
                              'consignee Name'=>$results->consignee,
                              'consignee Email'=>$results->Cemail_address,
                              'consignee Country'=>$results->Ccountry,
                              'consignee Physical Address'=>$results->Cphysical_address,
                              'Sender/Receiver'=>$results->senderreceiver,
                              'Sender/Receiver Physical Address'=>$results->SRphysical_address,
                              'Sender/Receiver Email'=>$results->SRemail_address,
                              'Sender/Receiver County'=>$results->SRcountry,
                              'Applicant'=>$results->Trader,
                              'Applicant Postal Address'=>$results->TraderPostalA,
                              'Applicant Physical Address'=>$results->TraderPhysicalA,
                              'Applicant Email'=>$results->TraderEmail,
                              'Applicant County'=>$results->TraderCountry,
                              'Certificate Issue Dates'=>($results->CertIssueDate ? date('Y-m-d', strtotime($results->CertIssueDate)) : ''),
                              'Certificate Expiry Date'=>($results->CertExpiryDate ? date('Y-m-d', strtotime($results->CertExpiryDate)) : '')
   
                        ]; 
              }

     
        if(empty($data)){
         $response =  array(
           'status'=>'failure',
           'message' => 'Currently there is no data to Export! Make sure you have loaded data you want to export'
         );
 
         }else{
          $response=$this->generateExcell($data,$filename,$heading);  
         }
          return $response;
      }
      public function checkPrintImportExportRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $permit_type=$req->permit_type;
      $approved_to=$req->approved_to;
      $heading=$req->heading;
      $filename=$req->filename;
      $title=$req->title;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilterImportExport($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }
      $data = array();
     
    $filterdata = "";
      if(validateIsNumeric($sub_module_id)){
        $filterdata="t1.sub_module_id = ".$sub_module_id;
   
    }
    $subfilterdata = array();
    if(validateIsNumeric($permit_type)){
        $subfilterdata=array('t1.importexport_permittype_id'=>$permit_type);

    }
  
         $qry=$this->getImportExportPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
         $filter = $req->input('filter');
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
                                
                                case 'consignee' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'Cphysical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Cemail_address' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ccountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;  
                             ; 
                                case 'senderreceiver' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'SRphysical_address' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'SRemail_address' :
                                    $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRcountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Applicant' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;
                                 
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t18.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                    break;
                             
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'certificate_no' :
                                    $whereClauses[] = "t17.permit_no like '%" . ($filter->value) . "%'";
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
         if(empty(json_decode($results))){
             $response =  array(
               'status'=>'failure',
               'message' => 'Currently there is no data to Print! Make sure you have loaded data you want to Print'
             );
            }else{
            $response =  array(
               'status'=>'sucesss'
             );
            }
            return $response;
    } 

  public function printImportExportRegister(){

    print_r('uuuu');
    exit();

      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $permit_type=$req->permit_type;
      $approved_to=$req->approved_to;
      $heading=$req->heading;
      $filename=$req->filename;
      $title=$req->title;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilterImportExport($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }
      $data = array();
      $w = 20; 
      $w_1 = 30;
      $w_2 = 30;
      $w_4 = 60;
      $h_1=12;
      $h = 5;
      $b=array(0,0,0,0);

      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      
      $i = 1;
    $filterdata = "";
      if(validateIsNumeric($sub_module_id)){
        $filterdata="t1.sub_module_id = ".$sub_module_id;
   
    }
    $subfilterdata = array();
    if(validateIsNumeric($permit_type)){
        $subfilterdata=array('t1.importexport_permittype_id'=>$permit_type);

    }
  
         $qry=$this->getImportExportPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
         $filter = $req->input('filter');
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
                                
                                case 'consignee' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'Cphysical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Cemail_address' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ccountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;  
                             ; 
                                case 'senderreceiver' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'SRphysical_address' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'SRemail_address' :
                                    $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRcountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Applicant' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;
                                 
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t18.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                    break;
                             
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'certificate_no' :
                                    $whereClauses[] = "t17.permit_no like '%" . ($filter->value) . "%'";
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
   
  
            PDF::MultiCell(8, $h_1, "No", 1,'C','',0);
            PDF::MultiCell($w_2, $h_1, "Reference Number", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Permit & Consignee Details", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Sender/Receiver  Details", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Applicant  Details", 1,'C','',0);
            PDF::MultiCell(0, $h_1, "Certificate Details", 1,'C','',1);
   
  
         foreach ($results as $results) {
             
              $rowcount = MAX(PDF::getNumLines("Name:".$results->senderreceiver."\nEmail:".$results->SRemail_address."\nCountry:".$results->SRcountry,
                50),PDF::getNumLines("Certificate Number:".$results->certificate_no."\nCertificate Issue Dates:".$results->CertIssueDate."\nCertificate Expiry Date:".$results->CertExpiryDate,
                50),PDF::getNumLines("Permit Reason:".$results->permitreason."\nConsignee:".$results->consignee."\nConsignee Email:".$results->Cemail_address."\nCountry:".$results->Ccountry,
                50),PDF::getNumLines("Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,50));

             PDF::MultiCell(8, $rowcount *$h, $i,'1','','',0);
             PDF::MultiCell($w_2, $rowcount *$h,$results->reference_no,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Permit Reason:".$results->permitreason."\nConsignee:".$results->consignee."\nConsignee Email:".$results->Cemail_address."\nCountry:".$results->Ccountry,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Name:".$results->senderreceiver."\nEmail:".$results->SRemail_address."\nCountry:".$results->SRcountry,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,1,'L','',0);
             PDF::MultiCell(0, $rowcount *$h,"Certificate Number:".$results->certificate_no."\nCertificate Issue Dates:".$results->CertIssueDate."\nCertificate Expiry Date:".$results->CertExpiryDate,1,'L','',1);
             $i++; 

              
             }
            
       
                 // PDF::Ln();    
       PDF::Output($filename,'I');
       }

    public function exportControlledDrugsRegister(request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $released_from=$req->released_from;
      $filter = $req->input('filter');
      $permit_reason = $req->input('permit_reason');
      $port = $req->input('port');
      $consignee_options= $req->input('consignee_options');
      $released_to=$req->released_to;
      $filename=$req->filename;
      $heading=$req->heading;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';


      //date filter
      $datefilter=$this->DateFilterImportExport($req);

      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }

      $subfilterdata=array();
      $qry=$this->getImportExportPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
        $filter = $req->input('filter');
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
                                
                                case 'consignee' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'Cphysical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Cemail_address' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ccountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;  
                             ; 
                                case 'senderreceiver' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'SRphysical_address' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'SRemail_address' :
                                    $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRcountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Applicant' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;
                                 
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t18.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                    break;
                             
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
   

      foreach ($results as $results) {
              $data[] = [ 
                              'Reference Number'=>$results->reference_no,
                              'Permit Reason'=>$results->permitreason,
                              'consignee Name'=>$results->consignee,
                              'consignee Email'=>$results->Cemail_address,
                              'consignee Country'=>$results->Ccountry,
                              'consignee Physical Address'=>$results->Cphysical_address,
                              'Sender/Receiver'=>$results->senderreceiver,
                              'Sender/Receiver Physical Address'=>$results->SRphysical_address,
                              'Sender/Receiver Email'=>$results->SRemail_address,
                              'Sender/Receiver County'=>$results->SRcountry,
                              'Applicant'=>$results->Trader,
                              'Applicant Postal Address'=>$results->TraderPostalA,
                              'Applicant Physical Address'=>$results->TraderPhysicalA,
                              'Applicant Email'=>$results->TraderEmail,
                              'Applicant County'=>$results->TraderCountry,
                              'Certificate Issue Dates'=>($results->CertIssueDate ? date('Y-m-d', strtotime($results->CertIssueDate)) : ''),
                              'Certificate Expiry Date'=>($results->CertExpiryDate ? date('Y-m-d', strtotime($results->CertExpiryDate)) : '')
   
                        ]; 
              }

     
        if(empty($data)){
         $response =  array(
           'status'=>'failure',
           'message' => 'Currently there is no data to Export! Make sure you have loaded data you want to export'
         );
 
         }else{
          $response=$this->generateExcell($data,$filename,$heading);  
         }
          return $response;
      } 

     public function checkPrintControlledDrugsRegister(Request $req){
        $sub_module_id=$req->sub_module_id;
        $module_id=$req->module_id;
        $approved_to=$req->approved_to;
        $heading=$req->heading;
        $filename=$req->filename;
        $title=$req->title;
        $filter = $req->filter;
        $start=$req->start;
        $limit=$req->limit;
        $data = array();
        $table=$this->getTableName($module_id);
        $table2='';
        $field='';
        //date filter
        $datefilter=$this->DateFilterImportExport($req);
        $subfilterdata = array();
        


        $submodule_details=array();
        if(validateIsNumeric($sub_module_id)){
            $submodule_details=array('id'=>$sub_module_id);
        }
      
        $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

        
           
           $filterdata="t1.sub_module_id = ".$sub_module_id;   
           $subfilterdata=array();

           $qry=$this->getImportExportPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
           $filter = $req->input('filter');
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
                                  
                                  case 'consignee' :
                                      $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                      break;
                                  
                                  case 'Cphysical_address' :
                                      $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                      break;
                                 
                                  case 'Cemail_address' :
                                      $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                      break;
                                  case 'Ccountry' :
                                      $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                      break;  
                               ; 
                                  case 'senderreceiver' :
                                      $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                      break;
                                 
                                  case 'SRphysical_address' :
                                      $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                      break;
                              
                                  case 'SRemail_address' :
                                      $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                      break;
                                  case 'SRcountry' :
                                      $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                      break;
                                 
                                  case 'Applicant' :
                                      $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                      break;
                                   
                                  case 'ApplicantPhysicalA' :
                                      $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                      break;
                              
                                  case 'ApplicantEmail' :
                                      $whereClauses[] = "t18.email like '%" . ($filter->value) . "%'";
                                      break;  
                                  case 'ApplicantCountry' :
                                      $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                      break;
                               
                                  case 'CertIssueDate' :
                                      $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                      break;  
                                  case 'CertExpiryDate' :
                                      $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                      break;  
                                  case 'certificate_no' :
                                      $whereClauses[] = "t17.certificate_no like '%" . ($filter->value) . "%'";
                                      break; 
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
           
           if(isset($start)&&isset($limit)){
              $results = $qry->skip($start)->take($limit)->get();
            }
            else{
              $results=$qry->get();
            }
             if(empty(json_decode($results))){
               $response =  array(
                 'status'=>'failure',
                 'message' => 'Currently there is no data to Print! Make sure you have loaded data you want to Print'
               );
              }else{
              $response =  array(
                 'status'=>1
               );
              }
              return $response;
        }
    } 


    public function printControlledDrugsRegister(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $approved_to=$req->approved_to;
      $heading=$req->heading;
      $filename=$req->filename;
      $title=$req->title;
      $filter = $req->filter;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      //date filter
      $datefilter=$this->DateFilterImportExport($req);
      $subfilterdata = array();
      


      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $data = array();
      $w = 20; 
      $w_1 = 30;
      $w_2 = 30;
      $w_4 = 60;
      $h_1=12;
      $h = 5;
      $b=array(0,0,0,0);

      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      
      $i = 1;
      //start loop
    
         
         $filterdata="t1.sub_module_id = ".$sub_module_id;   
         $subfilterdata=array();

         $qry=$this->getImportExportPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter); 
         $filter = $req->input('filter');
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
                                
                                case 'consignee' :
                                    $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'Cphysical_address' :
                                    $whereClauses[] = "t9.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Cemail_address' :
                                    $whereClauses[] = "t9.email_address like '%" . ($filter->value) . "%'";
                                    break;
                                case 'Ccountry' :
                                    $whereClauses[] = "t15.name like '%" . ($filter->value) . "%'";
                                    break;  
                             ; 
                                case 'senderreceiver' :
                                    $whereClauses[] = "t10.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'SRphysical_address' :
                                    $whereClauses[] = "t10.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'SRemail_address' :
                                    $whereClauses[] = "t10.email like '%" . ($filter->value) . "%'";
                                    break;
                                case 'SRcountry' :
                                    $whereClauses[] = "t13.name like '%" . ($filter->value) . "%'";
                                    break;
                               
                                case 'Applicant' :
                                    $whereClauses[] = "t18.name like '%" . ($filter->value) . "%'";
                                    break;
                                 
                                case 'ApplicantPhysicalA' :
                                    $whereClauses[] = "t18.physical_address like '%" . ($filter->value) . "%'";
                                    break;
                            
                                case 'ApplicantEmail' :
                                    $whereClauses[] = "t18.email like '%" . ($filter->value) . "%'";
                                    break;  
                                case 'ApplicantCountry' :
                                    $whereClauses[] = "t19.name like '%" . ($filter->value) . "%'";
                                    break;
                             
                                case 'CertIssueDate' :
                                    $whereClauses[] = "date_format(t17.certificate_issue_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
                                    break;  
                                case 'CertExpiryDate' :
                                    $whereClauses[] = "date_format(t17.expiry_date, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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

         if ($filter_string != '') {
         $qry->whereRAW($filter_string);
          }
         
         if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
          }
          else{
            $results=$qry->get();
         }
   
  
            PDF::MultiCell(8, $h_1, "No", 1,'C','',0);
            PDF::MultiCell($w_2, $h_1, "Reference Number", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Permit & Consignee Details", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Sender/Receiver  Details", 1,'C','',0);
            PDF::MultiCell($w_4, $h_1, "Applicant  Details", 1,'C','',0);
            PDF::MultiCell(0, $h_1, "Certificate Details", 1,'C','',1);
   
  
         foreach ($results as $results) {
             
              $rowcount = MAX(PDF::getNumLines("Name:".$results->senderreceiver."\nEmail:".$results->SRemail_address."\nCountry:".$results->SRcountry,
                50),PDF::getNumLines("Certificate Number:".$results->certificate_no."\nCertificate Issue Dates:".$results->CertIssueDate."\nCertificate Expiry Date:".$results->CertExpiryDate,
                50),PDF::getNumLines("Permit Reason:".$results->permitreason."\nConsignee:".$results->consignee."\nConsignee Email:".$results->Cemail_address."\nCountry:".$results->Ccountry,
                50),PDF::getNumLines("Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,50));

             PDF::MultiCell(8, $rowcount *$h, $i,'1','','',0);
             PDF::MultiCell($w_2, $rowcount *$h,$results->reference_no,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Permit Reason:".$results->permitreason."\nConsignee:".$results->consignee."\nConsignee Email:".$results->Cemail_address."\nCountry:".$results->Ccountry,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Name:".$results->senderreceiver."\nEmail:".$results->SRemail_address."\nCountry:".$results->SRcountry,1,'L','',0);
             PDF::MultiCell($w_4, $rowcount *$h, "Name:".$results->Trader."\nEmail:".$results->TraderEmail."\nCountry:".$results->TraderCountry,1,'L','',0);
             PDF::MultiCell(0, $rowcount *$h,"Certificate Number:".$results->certificate_no."\nCertificate Issue Dates:".$results->CertIssueDate."\nCertificate Expiry Date:".$results->CertExpiryDate,1,'L','',1);
             $i++; 

              
             }
            
       }
                 // PDF::Ln();    
       PDF::Output($filename,'I');
       }    

     public function exportallRegisters(request $request) {
        $RegisterSpreadsheet = new Spreadsheet();
        $sheet = $RegisterSpreadsheet->getActiveSheet();
        //  $ProductSpreadsheet->getActiveSheet()->setTitle($heading);
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

     //ad to request
      $request->request->add(['type' => 'report']);
     //dd($request);
      //get some variables
      $function = $request->input('function');
      $filename =$request->input('filename');
      $heading =$request->input('heading');
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
        $length=count($header); 
           $letter=$this->number_to_alpha($length,"");  
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
       $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
            ->setValue("Zambia Medicines Regulatory Authority (ZAMRA)\nP.O Box 31890 Lusaka, Off Kenneth Kaunda International Airport Road\nTel: +260 211 432 350, +260 211 432 351, +260 211 432 352.\nWebsite: www.zamra.co.zm Email: pharmacy@zamra.co.zm.\n".$heading."\t\t Exported on ".Carbon::now());
            $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
            $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);
            //headers 
            $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);


            //set autosize\wrap true for all columns
            $size=count($sortedData)+7;
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
            $header = str_replace("_"," ", $header);
               $header = array_map('ucwords', $header);
            //adding formats to header
            $sheet->fromArray($header, null, "A7");
            //loop data while writting
            //$sortedData = array_map('strval', $sortedData);
            $sheet->fromArray( $sortedData, null,  "A8");
            //create file
            $writer = new Xlsx($RegisterSpreadsheet);
             ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();


    
        $response =  array(
           'name' => $filename, //no extention needed
           'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
        );

   
        return $response;
   }


}
