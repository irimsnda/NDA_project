<?php

namespace Modules\NewReports\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use App\Exports\GridExport;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Excel;
use Modules\OpenOffice\Http\Controllers\OpenOfficeController;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Modules\Reports\Http\Controllers\ReportsController;
use Modules\NewReports\Traits\ReportsTrait;
use PDF;
use Carbon\Carbon;

class NewReportsController extends Controller
{
    use ReportsTrait; 
    public function getProductSummaryReport(request $req){
      $classification_category=$req->classification_category;
      $sub_module_id=$req->sub_module_id;
      $prodclass_category=$req->prodclass_category;
      $product_origin_id=$req->product_origin_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
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
     
      //other  for loops
      $category_details=array();
      if(validateIsNumeric($prodclass_category)){
         $category_details=array('id'=>$prodclass_category);

      }
      $classification_details=array();
      if(validateIsNumeric($classification_category)){
         $classification_details=array('t1.id'=>$classification_category);
      }
      $origin_details=array();
      if(validateIsNumeric($product_origin_id)){
         $origin_details=array('id'=>$product_origin_id);
      }

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_product_information';
      $field='product_id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);

  
     //Looping
     foreach ($sub_data as $submodule) {
        $section_data=DB::table('par_sections')
         ->where('is_product_type',1)->where($section_details)->get();   
          foreach ($section_data as $section) {
              $category_data=DB::table('par_prodclass_categories')
                                ->where($category_details)
                                ->where('section_id',$section->id)->get();
              foreach ($category_data as $category) {
                 $classfication_data=DB::table('par_classifications as t1')
                  ->join('par_prodcat_classifications as t2', 't2.classification_id', 't1.id')
                   ->where($classification_details)
                  ->where('t2.prodclass_category_id', $category->id)
                  ->get();
                 foreach ($classfication_data as $classfication) {
                    $origin_data=DB::table('par_product_origins')->where($origin_details)->get();
                    foreach ($origin_data as $origin) {
                        
                         //section and submodule filter
                        $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;

                        $subfilterdata=array('t3.classification_id'=>$classfication->id,'t3.prodclass_category_id'=>$category->id,'t3.product_origin_id'=>$origin->id);
                      
                        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                        $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $total = $total_brought_forward+$total_received;

                        $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                        $carried_forward=$total-$total_approved-$total_rejected;
                        $data[] = array(
                            'SubModule'=>$submodule->name,
                            'section_name'=>$section->name,
                            'product_category_name'=>$category->name,
                            'graph_product_category_name'=>$category->name,
                            'product_class_name'=>$classfication->name,
                            'product_origin'=>$origin->name,
                            'received_applications'=>$total_received,
                            'brought_forward'=> $total_brought_forward,
                            'carried_forward'=>$carried_forward,
                            'total' => $total, 
                            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                            'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                            'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                            'approved_applications' => $total_approved,
                            'rejected_applications' => $total_rejected,
                            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                        ); 
                       }
                  }
               }
          }
       }
      
              $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
    
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }

   public function getProductSummaryCartesianReport(request $req){
      $classification_category=$req->classification_category;
      $sub_module_id=$req->sub_module_id;
      $prodclass_category=$req->prodclass_category;
      $product_origin_id=$req->product_origin_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
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

      $data = array();
      $table='tra_product_applications';
      $table2='tra_product_information';
      $field='product_id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);

      $subfilterdata = array();

      if(validateIsNumeric($classification_category)){
      
      $subfilterdata=array_merge($subfilterdata , ['t3.classification_id'=>$classification_category]);
      }
      if( validateIsNumeric($prodclass_category)){
      
      $subfilterdata =array_merge($subfilterdata , ['t3.prodclass_category_id'=>$prodclass_category]);
      }
      if( validateIsNumeric($product_origin_id)){
      
      $subfilterdata =array_merge($subfilterdata , ['t3.product_origin_id'=>$product_origin_id]);
      }
      if( validateIsNumeric($section_id)){
      
      $subfilterdata =array_merge($subfilterdata , ['t1.section_id'=>$section_id]);
      }


     //Looping
     foreach ($sub_data as $submodule) {

        //section and submodule filter
        $filterdata="t1.sub_module_id = ".$submodule->id;  
        $submodule_name = explode(" ", $submodule->name);

         $submodule_acronym = "";

          foreach ($submodule_name as $s) {
         $submodule_acronym .= mb_substr($s, 0, 1);
          }             
        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
        $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $total = $total_brought_forward+$total_received;

        $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
        $carried_forward=$total-$total_approved-$total_rejected;

        $data[] = array(
            'SubModule'=>wordwrap($submodule->name,8,"\n",false),
            //'SubModule'=>$submodule->acronym,
            'received_applications'=>$total_received,
            'brought_forward'=> $total_brought_forward,
            'carried_forward'=>$carried_forward,
            'total' => $total, 
            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
            'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'approved_applications' => $total_approved,
            'rejected_applications' => $total_rejected,
            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
             ); 
       }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
 
public function printProductSummaryReport(Request $req){
      $title = 'Product Summary Report';
      $w = 20; 
      $w_1 = 40;
      $w_2 = 25;
      $w_3 = 50;
      $h = 25;
      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      //filterdata
      $classification_category=$req->classification_category;
      $sub_module_id=$req->sub_module_id;
      $prodclass_category=$req->prodclass_category;
      $product_origin_id=$req->product_origin_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $data = array();
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
      $origin_details=array();
      if(validateIsNumeric($product_origin_id)){
          $origin_details=array('id'=>$product_origin_id);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_product_information';
      $field='product_id';
      //date filter
      $datefilter=$this->DateFilter($req);
      $is_detailed_report='';
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $sub_total = 0;
      $screened_sub_total = 0;
      $evaluated_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $approved_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;

      $data = array();
      $i = 1;
      //start loop
        PDF::MultiCell(10, 10, "No", 1,'','',0);
        PDF::MultiCell($w_1, 10, "Section", 1,'','',0);
        PDF::MultiCell($w, 10, "Brought Forward", 1,'','',0);
        PDF::MultiCell($w, 10, "Received", 1,'','',0);
        PDF::MultiCell($w, 10, "Total", 1,'','',0);
        PDF::MultiCell($w, 10, "Screened", 1,'','',0);
        PDF::MultiCell($w, 10, "Evaluated", 1,'','',0);
        PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
        PDF::MultiCell($w_1, 10, "Response of Requests", 1,'','',0);
        PDF::MultiCell($w, 10, "Approved", 1,'','',0);
        PDF::MultiCell($w, 10, "Rejected", 1,'','',0);
        PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);
        
       foreach ($sub_data as $submodule) { 
            PDF::SetFont('','B',11);
           PDF::SetFillColor(249,249,249);
           PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'fill','B');
             $section_data=DB::table('par_sections')
             ->where('is_product_type',1)->where($section_details)->get();   
          foreach ($section_data as $section) {
            $category_data=DB::table('par_prodclass_categories')
            ->where($category_details)
            ->where('section_id',$section->id)->get();
            foreach ($category_data as $category) {
              PDF::cell(0,7,"Product Category:".$category->name,1,1,'B');
              $classfication_data=DB::table('par_classifications as t1')
                  ->join('par_prodcat_classifications as t2', 't2.classification_id', 't1.id')
                   ->where($classification_details)
                  ->where('t2.prodclass_category_id', $category->id)
                  ->get();
           foreach ($classfication_data as $classfication) {
             PDF::cell(0,7,"Product Classification:".$classfication->name,1,1,'B');
             $origin_data=DB::table('par_product_types')->where($origin_details)->get();

             foreach ($origin_data as $origin) {
                PDF::cell(0,7,"Product Origin:".$origin->name,1,1,'B');
                 //section and submodule filter
                $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                 //Product classification,Product class category and Product origin filterdata

              
                $subfilterdata=array('t3.classification_id'=>$classfication->id,'t3.prodclass_category_id'=>$category->id,'t3.product_origin_id'=>$origin->id);
               $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total = $total_brought_forward+$total_received;

                $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$total_approved-$total_rejected;
                $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                $screened_applications =$this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $carried_forward=$total-$total_approved-$total_rejected;
                $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);

                   

              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $section->name,1,'','',0);
              PDF::MultiCell($w, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$screened_applications,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $evaluated_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_approved,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_rejected,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);
             $i++;    
                }
         
             PDF::SetFont('','B',9);
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $sub_total = $sub_total+$total;
              $screened_sub_total = $screened_sub_total+$screened_applications;
              $evaluated_sub_total = $evaluated_sub_total+$evaluated_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $approved_sub_total = $approved_sub_total+$total_approved;
              $rejected_sub_total = $rejected_sub_total+$total_rejected;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;

             }
            }
          }
        }
        PDF::SetFont('','B',9);
        PDF::SetFillColor(249,249,249); // Grey
        PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
        PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
        //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
        PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5,$screened_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $evaluated_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $approved_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
        PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();    
      PDF::Output('Product Summary Report.pdf','I');
  }
    public function generateReportsHeader($title) {
      $org_info = DB::table('tra_organisation_information')->first();
             PDF::setPrintHeader(false);
    
      $logo = getcwd() . '/resources/images/logo.jpg';
      PDF::SetFont('times', 'B', 12);
      PDF::Cell(0, 6, '', 0, 1);
      PDF::Image($logo, 130, 10, 35, 28);
      PDF::Cell(0, 24, '', 0, 2);
      //PDF::Cell(0,6,strtoupper($org_info->ministry),0,1,'C');
      PDF::Cell(0, 6, strtoupper($org_info->name), 0, 1, 'C');
      PDF::SetFont('times', 'B', 9);
      PDF::Cell(0, 6, $org_info->postal_address.','.'  '.$org_info->physical_address, 0, 1, 'C');
      PDF::Cell(0, 6, 'Tel:'.$org_info->telephone_nos.' Fax: '.$org_info->fax, 0, 1, 'C');
      PDF::Cell(0, 6, 'Website: '.$org_info->website.', Email: '.$org_info->email_address, 0, 1, 'C');
      PDF::SetFont('times', 'B', 11);
      PDF::Cell(0, 5,$title .' Generated on '.Carbon::now(), 0, 1, 'C');
      PDF::SetFont('times', 'B', 11);
   
  }   
 
public function productDetailedReportPreview(Request $req){
      $classification_category=$req->classification_category;
      $sub_module_id=$req->sub_module_id;
      $prodclass_category=$req->prodclass_category;
      $product_origin_id=$req->product_origin_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $start=$req->start;
      $limit=$req->limit;
      $has_payment_processing = 1;
      $process_class=$req->process_class;
      $module_id='1';
      $heading='';
      $data = array();
      $table='tra_product_applications';
      $table2='tra_product_information';
      $field='product_id';
      $is_detailed_report='1';
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
     //dd($filterdata);
      $subfilterdata = array();

      if(validateIsNumeric($classification_category)){
      
      $subfilterdata=array_merge($subfilterdata , ['t3.classification_id'=>$classification_category]);
      }
      if( validateIsNumeric($prodclass_category)){
      
      $subfilterdata =array_merge($subfilterdata , ['t3.prodclass_category_id'=>$prodclass_category]);
      }
      if( validateIsNumeric($product_origin_id)){
      
      $subfilterdata =array_merge($subfilterdata , ['t3.product_origin_id'=>$product_origin_id]);
      }

        
         if(validateIsNumeric($process_class)){
         switch ($process_class) {
           case 1:
             $qry= $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
             $heading='Product Brought Forward Applications Report';
             break;
           case 2:
          
                 $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             
             $heading='Product Received Applications Report';
             break;
            case 3:
             $qry= $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Product Screened Applications Report';
             break;
           case 4:
             $qry=$this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
            //dd($qry);
             $heading='Product Evaluated Applications Report';
             break;
             case 5:
             $qry=  $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Product Queried Applications Report';
             break; 
             case 6:
             $qry= $this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Responded Applications Report';
             break;

           case 7:
              $qry=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
              $heading='Product Approved Applications Report';
             break;
           case 8:
             $qry= $this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Product Rejected Applications Report';
             break;
           
           // case 7:
           //   $qry= $this-> getCarriedForwardApplicationsQuery($table_name,$table2,$field,$filters,$subFilters,$from_date,$to_date);
           //   $heading='Product Carried Forward Applications';
           //   break;
             
              
         }}else{
        
          $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             $heading='Report On All Products ';
         }
                
           $qry->LeftJoin('par_classifications as t33','t3.classification_id','t33.id')
                ->LeftJoin('par_common_names as t44','t3.common_name_id','t44.id')
                 ->LeftJoin('par_product_categories as t55','t3.product_category_id','t55.id')
                 ->LeftJoin('par_product_categories as t6','t3.product_category_id','t6.id')
                 ->LeftJoin('par_productspecial_categories as t7','t3.special_category_id','t7.id')
                 ->LeftJoin('par_storage_conditions as t8','t3.storage_condition_id','t8.id')
                 ->LeftJoin('par_product_forms as t9','t3.product_form_id','t9.id')
                 ->LeftJoin('par_intended_enduser as t10','t3.intended_enduser_id','t10.id')
                 ->LeftJoin('par_zones as t11','t1.zone_id','t11.id')
                 ->LeftJoin('par_product_types as t12','t3.product_origin_id','t12.id')
                 ->LeftJoin('wb_trader_account as t13','t1.applicant_id','t13.id')
                 ->LeftJoin('wb_trader_account as t14','t1.local_agent_id','t14.id')
                 ->LeftJoin('par_countries as t15','t13.country_id','t15.id')
                 ->LeftJoin('par_regions as t16','t13.region_id','t16.id')
                 ->LeftJoin('par_countries as t17','t14.country_id','t17.id')
                 ->LeftJoin('par_regions as t18','t14.region_id','t18.id')
                 ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
                 ->LeftJoin('par_approval_decisions as t20','t19.decision_id','t20.id')
                 ->LeftJoin('tra_registered_products as t21','t1.product_id','t21.tra_product_id')
                 ->LeftJoin('par_validity_statuses as t22','t19.appvalidity_status_id','t22.id')
                 ->LeftJoin('par_registration_statuses as t23','t19.appregistration_status_id','t23.id')
                 ->LeftJoin('par_application_statuses as t24','t1.application_status_id','t24.id')
                 ->LeftJoin('par_system_statuses as t25','t24.status_id','t25.id')
                 ->LeftJoin('par_assessment_procedures as t30','t1.assessment_procedure_id','t30.id')
                 ->LeftJoin('tra_product_retentions as t31','t1.application_code','t31.application_code')
                 ->LeftJoin('par_retention_statuses as t32','t31.retention_status_id','t32.id')
                 ->addSelect('t1.tracking_no','t1.reference_no','t1.submission_date','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo','t3.brand_name', 't3.warnings','t3.shelf_life','t3.shelf_lifeafter_opening','t3.instructions_of_use','t3.therapeutic_code','t3.therapeutic_group','t3.physical_description', 't33.name as Classification', 't44.name as commonName','t55.name as Category','t6.name as SubCategory','t7.name as SpecialCategory','t8.name as StorageCondition','t9.name as ProductForm','t10.name as IntendedUsers','t3.shelflifeduration_desc','t11.name as issueplace','t12.name as ProductType','t13.name as Trader','t13.postal_address as TraderPostalA','t13.physical_address as TraderPhysicalA','t13.email as TraderEmail','t13.telephone_no as TraderTell','t13.mobile_no as TraderMobile','t14.name as LocalAgent','t14.postal_address as LocalAgentPostalA','t14.physical_address as LocalAgentPhysicalA','t14.email as 
                    LocalAgentEmail','t14.telephone_no as LocalAgentTell','t14.mobile_no as AgentMobile','t15.name as TraderCountry','t16.name as TraderRegion','t17.name as AgentCountry','t18.name as AgentRegion','t19.certificate_issue_date as CertIssueDate','t19.expiry_date as CertExpiryDate','t19.certificate_issue_date as IssueFrom','t19.certificate_issue_date as IssueTo','t19.certificate_no','t23.name as registration_status', 't22.name as validity_status','t25.name as application_status', 't30.name as assessment_procedure', 't3.product_strength', 't32.name as retention_status')
                        ->groupBy('t1.application_code');

        $total=$qry->get()->count();

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }
        if($total == 0){
          $res=array(
            'success'=>false,
            'message'=>'There is Unavailable'. " "  .$heading
          );
        }else{
        $res = array(
            'success' => true,
            'results' => $results,
            'heading' => $heading,
            'message' => 'All is well',
            'totalResults'=>$total
            );
      }
        return $res;


    }
public function exportDetailedReport(request $req){
       
        $function=$req->function;
        $header=$req->header;

        $response=$this->$function($req,1);
        $data = $response['results'];
        $heading = $response['heading'];
        $data_array = json_decode(json_encode($data), true);
        //product application details
        $ProductSpreadsheet = new Spreadsheet();
        $sheet = $ProductSpreadsheet->getActiveSheet();
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

    
    
        $sortedData=array();
        $i=0;
        $k=0;
        $temp=[];
        if(!empty($header)){
              $header=  json_decode($header, true); 
            }else{
              $header=array();
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
             foreach ($data as $udata)
                  {
                             for($v=0;$v<$total-1;$v++){
                             $temp1=$temp[$v];
                             $sortedData[$k][]=$udata->$temp1;
                      }
                     
                      $k++;  
                 }
                //first heading
                $sheet->mergeCells('A1:'.$letter.'6')
                      ->getCell('A1')
                        ->setValue("RWANDA FOOD & DRUGS AUTHORITY\nP.O Box 384 Kigali\nTel: +250 789 193 529; \nFax: 0\nWebsite: www.rwandafda.gov.rw  Email: info@rwandafda.gov.rw.\n".$heading."\t\t exported on ".Carbon::now());
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
               $sheet->fromArray( $sortedData, null,  "A8");
               //create file
               $writer = new Xlsx($ProductSpreadsheet);
               ob_start();
               $writer->save('php://output');
               $excelOutput = ob_get_clean();


    
               $response =  array(
                  'name' => $req->filename, //no extention needed
                  'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
                );
         
         return $response;
       
        }
  public function exportProductSummaryReport(request $req){
      $classification_category=$req->classification_category;
      $sub_module_id=$req->sub_module_id;
      $prodclass_category=$req->prodclass_category;
      $product_origin_id=$req->product_origin_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
    

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
      $origin_details=array();
      if(validateIsNumeric($product_origin_id)){
         $origin_details=array('id'=>$product_origin_id);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_product_information';
      $field='product_id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
       $heading="Product Summary Report";
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

     //Looping
     foreach ($sub_data as $submodule) {
      $section_data=DB::table('par_sections')
         ->where('is_product_type',1)->where($section_details)->get();   
          foreach ($section_data as $section) {
              $category_data=DB::table('par_prodclass_categories')
                                ->where($category_details)
                                ->where('section_id',$section->id)->get();
              foreach ($category_data as $category) {
                 $classfication_data=DB::table('par_classifications as t1')
                  ->join('par_prodcat_classifications as t2', 't2.classification_id', 't1.id')
                   ->where($classification_details)
                  ->where('t2.prodclass_category_id', $category->id)
                  ->get();
                 foreach ($classfication_data as $classfication) {

                    $origin_data=DB::table('par_product_types')->where($origin_details)


                     ->get();

                    foreach ($origin_data as $origin) {
                         //section and submodule filter
                        $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                          //Product classification,Product class category and Product origin filterdata
                        
                        $subfilterdata=array('t3.classification_id'=>$classfication->id,'t3.prodclass_category_id'=>$category->id,'t3.product_origin_id'=>$origin->id);


                         $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                        $requested_for_additional_information=$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $evaluated_applications=$this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                        $screened_applications=$this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $total = $total_brought_forward+$total_received;

                        $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                        $carried_forward=$total-$total_approved-$total_rejected;
                        $data[] = [
                            'SubModule'=>$submodule->name,
                            'section_name'=>$section->name,
                            'product_category_name'=>$category->name,
                            'product_class_name'=>$classfication->name,
                            'product_origin'=>$origin->name,
                            'brought_forward'=>strval($total_brought_forward),
                            'received_applications'=>strval($total_received),
                            'total' => strval($total),
                            'screened_applications' =>strval($screened_applications),
                            'evaluated_applications' => strval($evaluated_applications),
                             'requested_for_additional_information' =>strval($requested_for_additional_information),
                            'query_responses'=>strval($query_responses),
                            'approved_applications' => strval($total_approved),
                            'rejected_applications' => strval($total_rejected),
                            'carried_forward'=>strval($carried_forward)
                           
                        ]; 
                       }
                  }
               }
          }
       }
       $header=$this->getArrayColumns($data);
       $org_info = DB::table('tra_organisation_information')->first();
       //product application details
        $ProductSpreadsheet = new Spreadsheet();
        $sheet = $ProductSpreadsheet->getActiveSheet();
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

    
    
        $sortedData=array();
        $i=0;
        $k=0;
        $temp=[];
        if(!empty($header)){
              $header=   $header; 
            }else{
              $header=array();
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
             foreach ($data as $udata)
                  {
                    for($v=0;$v<$total;$v++){
                        $temp1=$temp[$v];
                        $sortedData[$k][]=$udata[$temp1];
                    }
                     
                    $k++;  
                 }
            //first heading
            $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
            ->setValue(strtoupper($org_info->name)."\n".$org_info->postal_address."  , ".$org_info->physical_address."."."\nTel: ".$org_info->telephone_nos.", Website: ".$org_info->website." Email: ".$org_info->email_address."."."\n".$heading."\t\t Exported on ".Carbon::now());
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
            $writer = new Xlsx($ProductSpreadsheet);
             ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();


    
        $response =  array(
           'name' => 'productsummaryreport.Xlsx', //no extention needed
           'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
        );

   
        return $response;
   }
 
public function getPremiseSummaryReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $business_type_details=$req->business_type_details;
      $module_id=$req->module_id;
      $section_id=$req->section_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $section_details=array();
      if(validateIsNumeric($section_id)){
          $section_details=array('id'=>$section_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $business_details=array();
      if(validateIsNumeric($business_type_details)){
         $business_details=array('t1.id'=>$business_type_details);
      }

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
  
     //Looping
     foreach ($sub_data as $submodule) {
        $section_data = DB::table('par_sections')
        ->where($section_details)->get();
        foreach($section_data as $section){
             $business_data=DB::table('par_business_types as t1')
                ->where('t1.section_id',$section->id)
                ->where($business_details)
                ->select('t1.*')
                ->get(); 
          foreach ($business_data as $businesstype) {
                        $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                        $subfilterdata=array('t3.business_type_id'=>$businesstype->id);
                        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                        $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $total = $total_brought_forward+$total_received;

                        $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                        $carried_forward=$total-$total_approved-$total_rejected;
                        $data[] = array(
                            'SubModule'=>$submodule->name,
                            'section_name'=>$section->name,
                            'business_name'=>$businesstype->name,
                            'received_applications'=>$total_received,
                            'brought_forward'=> $total_brought_forward,
                            'carried_forward'=>$carried_forward,
                            'total' => $total, 
                            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                            'inspected_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                            'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                            'approved_applications' => $total_approved,
                            'rejected_applications' => $total_rejected,
                            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                        ); 
        }       }
       }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
   public function getPremiseSummaryCartesianReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id = $req->section_id;
      $business_type_details=$req->business_type_details;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $has_payment_processing = 1;

      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
     
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);

      $subfilterdata = array();
      if(validateIsNumeric($business_type_details)){
         $subfilterdata=array('t3.business_type_id'=>$business_type_details);
      }

  
     //Looping
    foreach ($sub_data as $submodule) {
         $filterdata = [];
         if(validateIsNumeric($section_id)){
        
        $filterdata []="t1.section_id = ".$section_id;
        }
        if( validateIsNumeric($submodule->id)){
        
        $filterdata[] ="t1.sub_module_id = ".$submodule->id;
        }
        $filterdata=implode(' AND ',$filterdata );
        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
        $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $total = $total_brought_forward+$total_received;

        $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);

        $carried_forward=$total-$total_approved-$total_rejected;
        $data[] = array(
            'submodule'=>wordwrap($submodule->name,8,"\n",false),
            'received_applications'=>$total_received,
            'brought_forward'=> $total_brought_forward,
            'carried_forward'=>$carried_forward,
            'total' => $total, 
            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'inspected_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
            'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'approved_applications' => $total_approved,
            'rejected_applications' => $total_rejected,
            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
            ); 
         }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }

   public function printPremiseSummaryReport(Request $req){

    $title = 'Premise Applications Summary Report';
        $w = 20; 
        $w_1 = 40;
        $w_2 = 25;
        $w_3 = 50;
        $h = 25;
        PDF::SetTitle( $title );
        PDF::AddPage("L");
       
        $this->generateReportsHeader( $title);
         
        PDF::Ln();
     //filterdata
      $sub_module_id=$req->sub_module_id;
      $business_type_details=$req->business_type_details;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $data = array();
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $section_details= array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $business_details=array();
      if(validateIsNumeric($business_type_details)){
         $business_details=array('id'=>$business_type_details);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';
      $sub_total = 0;
      $cummulative_total = 0;
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $screened_sub_total = 0;
      $inspected_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $approved_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;
    
     

      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $is_detailed_report='';

      $data = array();
      $i = 1;
      //start loop
       
       foreach ($sub_data as $submodule) {
            PDF::SetFont('','B',11);
           PDF::SetFillColor(249,249,249);
           PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'fill','B');
             $section_data=DB::table('par_sections')
           
             ->where('is_product_type',1)->where($section_details)->get();  

          foreach ($section_data as $section  ){
             PDF::cell(0,7,"Section:".$section->name,1,1,'B');
             $business_data=DB::table('par_business_types')
                ->where($business_details)
                ->where('section_id',$section->id)
                ->get();

            foreach ($business_data as $businesstype) {

                PDF::cell(0,7,"Business Type:".$businesstype->name,1,1,'B');
                         //section and submodule filter
                $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                $subfilterdata=array('t3.business_type_id'=>$businesstype->id);
               $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total = $total_brought_forward+$total_received;

                $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$total_approved-$total_rejected;
                $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $inspected_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                $screened_applications =$this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $carried_forward=$total-$total_approved-$total_rejected;
                $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);

                //start loop

              PDF::MultiCell(10, 10, "No", 1,'','',0);
              //PDF::MultiCell($w_1, 10, "Permit Type", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Brought Forward", 1,'','',0);
              PDF::MultiCell($w, 10, "Received", 1,'','',0);
              PDF::MultiCell($w, 10, "Total", 1,'','',0);
              PDF::MultiCell($w, 10, "Screened", 1,'','',0);
              PDF::MultiCell($w, 10, "Inspected", 1,'','',0);
              PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Response of Requests", 1,'','',0);
              PDF::MultiCell($w, 10, "Approved", 1,'','',0);
              PDF::MultiCell($w, 10, "Rejected", 1,'','',0);
              PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);   
          
              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$screened_applications,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $inspected_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_approved,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_rejected,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);

              $sub_total = $sub_total+$total;
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $screened_sub_total = $screened_sub_total+$screened_applications;
              $inspected_sub_total = $inspected_sub_total+$inspected_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $approved_sub_total = $approved_sub_total+$total_approved;
              $rejected_sub_total = $rejected_sub_total+$total_rejected;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;
             
             $i++;    
                }
              }    
            }
             PDF::SetFont('','B',9);
             PDF::SetFillColor(249,249,249); // Grey
             PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
              PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
              //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5,$screened_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $inspected_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $approved_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
              PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();
    
      PDF::Output('Premise Summary Report.pdf','I');
  }
    public function exportPremiseSummaryReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id = $req->section_id;
      $business_type_details=$req->business_type_details;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $section_details=array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
    
      $business_details=array();
      if(validateIsNumeric($business_type_details)){
         $business_details=array('id'=>$business_type_details);
      }

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $heading="Premise Summary Report";
      $filename = 'premisesummaryreport.Xlsx';
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

     //Looping
     foreach ($sub_data as $submodule) {
        $section_data=DB::table('par_sections')
        ->where('is_product_type',1)->where($section_details)->get();  
        foreach($section_data as $section){
          $business_data=DB::table('par_business_types')
          ->where($business_details)
          ->where('section_id',$section->id)
          ->get();
          foreach ($business_data as $businesstype) {
                         //section and submodule filter
                        $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                          //Product classification,Product class category and Product origin filterdata
                       $subfilterdata=array('t3.business_type_id'=>$businesstype->id);
                       $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                       $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                       $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                       $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                       $total = $total_brought_forward+$total_received;

                        $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                       $carried_forward=$total-$total_approved-$total_rejected;
                      $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $inspected_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                     $screened_applications =$this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                     $carried_forward=$total-$total_approved-$total_rejected;
                     $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        $data[] = [
                            'SubModule'=>$submodule->name,
                            'Section'=>$section->name,
                            'business_name'=>$businesstype->name,
                            'brought_forward'=>strval($total_brought_forward),
                            'received_applications'=>strval($total_received),
                            'total' => strval($total),
                            'screened_applications' =>strval($screened_applications),
                            'evaluated_applications' => strval($inspected_applications),
                             'requested_for_additional_information' =>strval($requested_for_additional_information),
                            'query_responses'=>strval($query_responses),
                            'approved_applications' => strval($total_approved),
                            'rejected_applications' => strval($total_rejected),
                            'carried_forward'=>strval($carried_forward)
                           
                        ]; 
          }
        }
       }
      $response = $this->exportExcel($data, $filename, $heading);
   
        return $response;
   }
public function premiseDetailedReportPreview(Request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id = $req->section_id;
      $business_type_details=$req->business_type_details;
      $process_class=$req->process_class;
      $module_id='2';
      $has_payment_processing = 1;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $start=$req->start;
      $limit=$req->limit;
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='tra_premises';
      $field='premise_id';
      $is_detailed_report='1';
      //date filter
      $datefilter=$this->DateFilter($req);
       $filterdata = '';
      if(validateIsNumeric($section_id)){
        $filterdata="t1.section_id".$section_id;
      }
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }

     $subfilterdata = array();
      if(validateIsNumeric($business_type_details)){
         $subfilterdata=array('t3.business_type_id'=>$business_type_details);
      }

  
  
      //dd($datefilter);

        
         if(validateIsNumeric($process_class)){
         switch ($process_class) {
            case 1:
             $qry= $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
             $heading='Brought Forward Applications Report (Premises)';
             break;
            case 2:
          
                 $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             
             $heading='Received Applications Report (Premises)';
             break;
            case 3:
             $qry= $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Screened Applications Report (Premises)';
             break;
          
            case 5:
             $qry=  $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Queried Applications Report (Premises)';
             break; 
            case 6:
             $qry= $this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Responded Applications Report (Premises)';
             break;
            case 7:
              $qry=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
              $heading='Approved Applications Report (Premises)';
             break;
            case 8:
             $qry= $this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Rejected Applications Report (Premises)';
             break;
            case 9:
             $qry=$this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
            //dd($qry);
             $heading='Inspected Applications Report (Premises)';
             break;

             //  case 7:
             // $qry= $this-> getCarriedForwardApplicationsQuery($table_name,$table2,$field,$filters,$subFilters,$from_date,$to_date);
             // $heading='Carried Forward Applications (Premises)';
             // break;
              
         }}else{
        
          $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             $heading='Report On All Premises  Applications';
         }

          $qry->LeftJoin('par_countries as t22','t3.country_id','t22.id')
                 ->LeftJoin('par_regions as t33','t3.region_id','t33.id')
                 ->LeftJoin('par_districts as t44','t3.district_id','t44.id')
                 ->LeftJoin('par_business_types as t55','t3.business_type_id','t55.id')
                ->LeftJoin('par_premises_types as t100','t3.premise_type_id','t100.id')
                 ->LeftJoin('par_business_scales as t6','t3.business_scale_id','t6.id')
                 ->LeftJoin('par_business_categories as t7','t3.business_category_id','t7.id')
                 ->LeftJoin('wb_trader_account as t8','t1.applicant_id','t8.id')
                 ->LeftJoin('tra_personnel_information as t9','t3.contact_person_id','t9.id')
                 ->LeftJoin('tra_premises_otherdetails as t10','t3.id','t10.premise_id')
                 ->LeftJoin('par_business_type_details as t11','t10.business_type_detail_id','t11.id')
                 ->LeftJoin('par_zones as t12','t1.zone_id','t12.id')
                 ->leftJoin('par_countries as t13','t8.country_id','t13.id')
                 ->leftJoin('par_regions as t14','t8.region_id','t14.id')
                 ->leftJoin('tra_approval_recommendations as t15','t1.application_code','t15.application_code')
                 
                 ->LeftJoin('par_approval_decisions as t17','t15.decision_id','t17.id')
                 ->LeftJoin('par_registration_statuses as t23','t15.appregistration_status_id','t23.id')
                 ->LeftJoin('par_validity_statuses as t24','t15.appvalidity_status_id','t24.id')
                    

                ->addselect('t1.tracking_no','t1.reference_no','t3.name','t100.name as PremiseCategory','t3.email','t3.postal_address','t3.physical_address','t3.telephone','t3.mobile_no','t3.contact_person_startdate','t3.contact_person_enddate','t3.gps_coordinate','t22.name as Precountry','t33.name as PreRegion','t44.name as PreDistrict','t55.name as BsnType','t7.name as BsnCategory','t6.name as BsnScale','t8.name as Trader','t8.postal_address as TraderPostalA','t8.physical_address as TraderPhysicalA','t8.email as TraderEmail','t8.telephone_no as TraderTell','t8.mobile_no as TraderMobile','t9.name as ContactPerson','t9.telephone_no as ContactTell','t9.email_address as ContactEmail','t11.name as BsnTypeDetails','t12.name as issueplace','t13.name as TraderCountry','t14.name as TraderRegion','t15.expiry_date as CertExpiryDate','t15.certificate_issue_date as CertIssueDate','t15.certificate_issue_date as IssueFrom','t15.certificate_issue_date as IssueTo','t1.date_added as ReceivedFrom','t1.date_added as ReceivedTo', 't15.certificate_no', 't23.name as registration_status', 't24.name as validity_status')
                ->groupBy('t1.application_code');

        $total=$qry->get()->count();

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }
        if($total == 0){
          $res=array(
            'success'=>false,
            'message'=>'There is Unavailable'. " "  .$heading
          );
        }else{
        $res = array(
            'success' => true,
            'results' => $results,
            'heading' => $heading,
            'message' => 'All is well',
            'totalResults'=>$total
            );
      }

        return $res;


    }
public function getImportExportSummaryReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $permit_category=$req->permit_category;
      $permit_type=$req->permit_type;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sections_details=array();
      if(validateIsNumeric($section_id)){
          $sections_details=array('id'=>$section_id);
      }
      
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
    
      $permitcategory_details=array();
      if(validateIsNumeric($permit_category)){
         $permitcategory_details=array('t1.id'=>$permit_category);
      }
      $permitype_details=array();
      if(validateIsNumeric($permit_type)){
         $permitype_details=array('t1.id'=>$permit_type);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field= '';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      //Looping
      foreach ($sub_data as $submodule) {
          $section_data=DB::table('par_sections')->where($sections_details)->get();
    
        foreach($section_data as $sec){
            $section_id = $sec->id;
            $permit_data=DB::table('par_importexport_permittypes as t1')
            ->where($permitype_details)
             ->get();
            foreach ($permit_data as $permittype) {
              $permitcategory_data=DB::table('par_permit_category as t1')
              ->where($permitcategory_details)
               ->get();
              foreach ($permitcategory_data as $permitcategory) {
                    $filterdata="t1.sub_module_id = ".$submodule->id." and t1.section_id = ".$section_id;
                    $subfilterdata=array('t1.permit_type_id'=>$permittype->id
                      ,'t1.permit_category_id'=>$permitcategory->id);
                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;
                    $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$permit_release-$permit_rejection;
                        $data[] = array(
                            'SubModule'=>$submodule->name,
                            'permit_name'=>$permittype->name,
                            'permit_category'=>$permitcategory->name,
                            'section_name'=>$sec->name,
                            'received_applications'=>$total_received,
                            'brought_forward'=> $total_brought_forward,
                            'carried_forward'=>$carried_forward,
                            'total' => $total, 
                            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                            'screened_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                            'permit_reviewed' => $permit_reviewed,
                            'permit_release' => $permit_release,
                            'permit_rejection' => $permit_rejection,
                            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                        ); 
                  }
                }

            }

       }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
   public function getImportExportSummaryCartesianReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $permit_type=$req->permit_type;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $has_payment_processing = 1;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $section_details=array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }
      $permit_data=DB::table('par_importexport_permittypes as t1')
        ->leftJoin('par_modulesimpexp_permittypes as t2','t1.id', 't2.importexport_permittype_id')
        ->where($permit_details)
        ->get();

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field= '';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $filterdata = [];
       if(validateIsNumeric($sub_module_id)){
          $filterdata[]="t1.sub_module_id = ".$sub_module_id;
      }
        if(validateIsNumeric($section_id)){
          $filterdata[] = "t1.section_id = ".$section_id;
        }
        $filterdata=implode(' AND ',$filterdata);
    foreach ($permit_data as $permittype) {
                      
        $subfilterdata=array('t1.importexport_permittype_id'=>$permittype->importexport_permittype_id);

        $permit_name = explode(" ", $permittype->name);
         $permit_acronym = "";

          foreach ($permit_name as $p) {
         $permit_acronym .= mb_substr($p, 0, 1);
          } 

        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
        $total = $total_brought_forward+$total_received;
        $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
        $carried_forward=$total-$permit_release-$permit_rejection;
        $data[] = array(
            'Permit_name'=>wordwrap($permittype->name,15,"\n",false),
            'received_applications'=>$total_received,
            'brought_forward'=> $total_brought_forward,
            'carried_forward'=>$carried_forward,
            'total' => $total, 
            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'screened_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
            'permit_reviewed' => $permit_reviewed,
            'permit_release' => $permit_release,
            'permit_rejection' => $permit_rejection,
            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
            ); 
         }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
    public function printImportExportSummaryReport(Request $req){

    $title = 'Import & Export Summary Report';
        $w = 20; 
        $w_1 = 40;
        $w_2 = 25;
        $w_3 = 50;
        $h = 25;
        PDF::SetTitle( $title );
        PDF::AddPage("L");
       
        $this->generateReportsHeader( $title);
         
        PDF::Ln();
     //filterdata
      $sub_module_id=$req->sub_module_id;
      $permit_type=$req->permit_type;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $data = array();
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $section_details=array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      $sub_total = 0;
      $cummulative_total = 0;
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $reviewed_sub_total = 0;
      $inspected_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $reviewed_sub_total = 0;
      $released_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;
      //date filter
      $datefilter=$this->DateFilter($req);
      $is_detailed_report='';
      $data = array();
       foreach ($sub_data as $submodule) {
          $section_data=DB::table('par_sections')
          ->whereNotIn('id',[5,6,8,9,10,14])
          ->where($section_details)
          ->get();
            PDF::SetFont('','B',11);
            PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'B');
          foreach($section_data as $section){
           $permit_data=DB::table('par_importexport_permittypes as t1')
            ->leftJoin('par_modulesimpexp_permittypes as t2','t1.id', 't2.importexport_permittype_id')
            ->where($permit_details)
            ->where('t2.sub_module_id', $submodule->id)
            ->get();
            PDF::SetFont('','B',11);
            PDF::cell(0,7,"Section:".$section->name,1,1,'B');
           foreach ($permit_data as $permittype) {
               PDF::cell(0,7,"Permit Type:".$permittype->name,1,1,'B');
                         //section and submodule filter
                $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
               $subfilterdata=array('t1.importexport_permittype_id'=>$permittype->importexport_permittype_id);
                $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                 $inspected_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                $total = $total_brought_forward+$total_received;
                $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$permit_release-$permit_rejection;
                     
               $i = 1;
              //start loop
              PDF::MultiCell(10, 10, "No", 1,'','',0);
              //PDF::MultiCell($w_1, 10, "Permit Type", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Brought Forward", 1,'','',0);
              PDF::MultiCell($w, 10, "Received", 1,'','',0);
              PDF::MultiCell($w, 10, "Total", 1,'','',0);
              PDF::MultiCell($w, 10, "Screened", 1,'','',0);
              PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Query Response", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Reviewed", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Released", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Rejected", 1,'','',0);
              PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);

                   

              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              //PDF::MultiCell($w_1, $rowcount *5, $permittype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$inspected_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_reviewed,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_release,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_rejection,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);

                  
                }
              }
              $sub_total = $sub_total+$total;
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $inspected_sub_total = $inspected_sub_total+$inspected_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $reviewed_sub_total = $reviewed_sub_total+$permit_reviewed;
              $released_sub_total = $released_sub_total+$permit_release;
              $rejected_sub_total = $rejected_sub_total+$permit_rejection;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;
             $i++;

            }
            PDF::SetFont('','B',9);
             PDF::SetFillColor(249,249,249); // Grey
             PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
              PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
              //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5,$inspected_applications,1,'C','Fill',0);
              PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $reviewed_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $reviewed_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
              PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();
    
      PDF::Output('Import & Export Summary Report.pdf','I');
  }
public function importExportSummaryReportExport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $permit_type=$req->permit_type;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $section_details=array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $heading="Import & Export Summary Report";
      $filename="Import & Export summaryreport.Xlsx";
  
     //Looping
    foreach ($sub_data as $submodule) {
      $section_data = DB::table('par_sections')
            ->whereNotIn('id',[5,6,8,9,10,14])
            ->where($section_details)
            ->get();
        foreach($section_data as $section){    
            $permit_data=DB::table('par_importexport_permittypes as t1')
            ->leftJoin('par_modulesimpexp_permittypes as t2','t1.id', 't2.importexport_permittype_id')
            ->where($permit_details)
            ->where('t2.sub_module_id', $submodule->id)
            ->get(); 
            foreach ($permit_data as $permittype) {
                         //section and submodule filter
                       $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                      $subfilterdata=array('t1.importexport_permittype_id'=>$permittype->importexport_permittype_id);
                        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                       $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                       $total = $total_brought_forward+$total_received;

                      $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $inspected_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                      $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                       $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                       $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                      $carried_forward=$total-$permit_release-$permit_rejection;
                     

                        $data[] = [
                            'SubModule'=>$submodule->name,
                            'Section'=>$section->name,
                            'Permit_Type'=>$permittype->name,
                            'brought_forward'=>strval($total_brought_forward),
                            'received_applications'=>strval($total_received),
                            'total' => strval($total),
                            'screened_applications' =>strval($inspected_applications),
                             'queried' =>strval($requested_for_additional_information),
                            'query_responses'=>strval($query_responses),
                            'permit_reviewed' => strval($permit_reviewed),
                            'permit_released' => strval($permit_release),
                            'permit_rejected' => strval($permit_rejection),
                            'carried_forward'=>strval($carried_forward)
                           
                        ]; 

         }
        }
       }    

       $response=$this->exportExcel($data, $filename, $heading);
        return $response;
   }
public function importExportDetailedReportPreview(Request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $permit_type=$req->permit_type;
      $process_class=$req->process_class;
      $module_id='4';
      $has_payment_processing = 1;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $start=$req->start;
      $limit=$req->limit;
  
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='1';
      //date filter
      $datefilter=$this->DateFilter($req);
      $filterdata = [];
       if(validateIsNumeric($section_id)){
      
      $filterdata[]="t1.section_id = ".$section_id;
      }
     if( validateIsNumeric($sub_module_id)){
      
      $filterdata[] ="t1.sub_module_id = ".$sub_module_id;
      }
      $filterdata=implode(' AND ',$filterdata );
      $subfilterdata = array();
       if(validateIsNumeric($permit_type)){
          $subfilterdata=array('t1.importexport_permittype_id'=>$permit_type);
      }
         if(validateIsNumeric($process_class)){
         switch ($process_class) {
           case 1:
             $qry=$this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
             $heading='Import and Export Brought Forward Applications Report';
             break;
           case 2:
          
             $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             
             $heading='Import and Export Received Applications Report';
             break;
          case 3:
             $qry= $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
             $heading='Import & Export Screened Applications Report';
             break;
          
          case 5:
             $qry=  $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Import & Export Queried Applications Report';
             break;
          case 6:
             $qry= $this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Import & Export Responded Applications Report';
             break;
          case 10:
             $qry=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
            //dd($qry);
             $heading='Import & Export Permit Reviewed Applications Report';
             break;
           case 11:
              $qry=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
              $heading='Import & Export Permit Released Report';
             break;
           case 12:
             $qry= $this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Import & Export Permit Rejected Report';
             break; 
           // case 9:
           //   $qry= $this-> getCarriedForwardApplicationsQuery($table_name,$table2,$field,$filters,$subFilters,$from_date,$to_date);
           //   $heading='Import & Export Carried Forward Applications';
           //   break;
         }}else{
        
          $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
          $heading='Report On All Import & Export Applications';
         }
         
           $qry->LeftJoin('sub_modules as t22','t1.sub_module_id','t22.id')
           ->LeftJoin('par_permit_category as t33','t1.permit_category_id','t33.id')
          ->LeftJoin('par_importexport_permittypes as t3','t1.importexport_permittype_id','t3.id')
           ->LeftJoin('par_permit_reasons as t55','t1.permit_reason_id','t55.id')
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
        


          ->select('t1.proforma_invoice_no','t1.tracking_no','t3.name as permittype','t1.reference_no','t1.application_code','t1.proforma_invoice_date','t22.name as applicationtype','t33.name as permitcategory','t55.name as permitreason','t6.name as port','t7.name as currency','t8.name as consigneeoption','t9.name as consignee','t9.postal_address as Cpostal_address','t9.physical_address as Cphysical_address','t9.telephone_no as Ctelephone_no','t9.mobile_no as Cmobile_no','t9.email_address as Cemail_address','t15.name as Ccountry','t16.name as Cregion','t10.name as senderreceiver','t10.physical_address as SRphysical_address','t10.postal_address as SRpostal_address','t10.telephone_no as SRtelephone_no','t10.mobile_no as SRmobile_no','t10.email as SRemail_address','t13.name as SRcountry','t14.name as SRregion','t11.name as premisename','t11.postal_address as premisePostalA','t11.physical_address as premisePhysicalA','t11.telephone as premiseTell','t11.mobile_no as premiseMobile','t11.expiry_date as premiseExpiryDate','t12.name as issueplace','t17.expiry_date as CertExpiryDate','t17.certificate_issue_date as CertIssueDate','t18.name as Trader','t18.postal_address as TraderPostalA','t18.physical_address as TraderPhysicalA','t18.telephone_no as TraderTell','t18.mobile_no as TraderMobile','t18.email as TraderEmail','t19.name as TraderCountry','t20.name as TraderRegion','t17.certificate_issue_date as IssueFrom','t17.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo','t17.permit_no as certificate_no','t17.appregistration_status_id as validity_status', 't17.appvalidity_status_id as registration_status')
               ->groupBy('t1.application_code');

        $total=$qry->get()->count();

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }

        if($total == 0){
          $res=array(
            'success'=>false,
            'message'=>'There is Unavailable'. " "  .$heading
          );
        }else{
        $res = array(
            'success' => true,
            'results' => $results,
            'heading' => $heading,
            'message' => 'All is well',
            'totalResults'=>$total
            );
      }
        return $res;


    }

public function getGmpSummaryReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $gmp_location=$req->gmp_location;
      $module_id=$req->module_id;
      $section_id=$req->section_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
    
      $gmplocation_details=array();
      if(validateIsNumeric($gmp_location)){
         $gmplocation_details=array('t1.id'=>$gmp_location);
      }
      $sections_details=array();
      if(validateIsNumeric($section_id)){
         $sections_details=array('id'=>$section_id);
      }
      
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='par_gmplocation_details';
      $field= 'gmp_type_id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      //Looping
      foreach ($sub_data as $submodule) {
        $sections_data=DB::table('par_sections')->where($sections_details)->get();
    
          foreach($sections_data as $sec){
              
            $gmplocation_data=DB::table('par_gmplocation_details as t1')
            ->where($gmplocation_details)
            ->get();

            foreach ($gmplocation_data as $gmplocation) {

                      $filterdata="t1.sub_module_id = ".$submodule->id." and t1.section_id = ".$sec->id;
                    
                      $subfilterdata=array('t1.gmp_type_id'=>$gmplocation->id);

                      $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                      $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                      $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $total = $total_brought_forward+$total_received;

                      $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                      $carried_forward=$total-$total_approved-$total_rejected;

                      $data[] = array(
                          'SubModule'=>$submodule->name,
                          'gmp_location'=>$gmplocation->name,'section_name'=>$sec->name,
                          'received_applications'=>$total_received,
                          'brought_forward'=> $total_brought_forward,
                          'carried_forward'=>$carried_forward,
                          'total' => $total, 
                         'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                          'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                          'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                          'approved_applications' => $total_approved,
                          'rejected_applications' => $total_rejected,
                          'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                      ); 
                }

          }
       }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
public function getGmpSummaryCartesianReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $gmp_location=$req->gmp_location;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $has_payment_processing ='1';
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $section_details=array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
      $gmplocation_details=array();
      if(validateIsNumeric($gmp_location)){
         $gmplocation_details=array('t1.id'=>$gmp_location);
      }
      $gmplocation_data=DB::table('par_gmplocation_details as t1')
                  ->where($gmplocation_details)
                  ->get();
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='par_gmplocation_details';
      $field= 'gmp_type_id';
      $is_detailed_report='';
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
    foreach ($gmplocation_data as $gmplocation) {
                      
        $subfilterdata=array('t1.gmp_type_id'=>$gmplocation->id);

         $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
         $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
         $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
         $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
         $total = $total_brought_forward+$total_received;

         $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
         $carried_forward=$total-$total_approved-$total_rejected;
         $data[] = array(
            //'location_name'=>$gmplocation->name,
            'location_name'=>wordwrap($gmplocation->name,15,"\n",false),
            'received_applications'=>$total_received,
            'brought_forward'=> $total_brought_forward,
            'carried_forward'=>$carried_forward,
            'total' => $total, 
            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
            'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'approved_applications' => $total_approved,
            'rejected_applications' => $total_rejected,
            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
            ); 
         }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
    public function printGmpSummaryReport(Request $req){

    $title = 'GMP Applications Summary Report';
        $w = 20; 
        $w_1 = 40;
        $w_2 = 25;
        $w_3 = 50;
        $h = 25;
        PDF::SetTitle( $title );
        PDF::AddPage("L");
       
        $this->generateReportsHeader( $title);
         
        PDF::Ln();
     //filterdata
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $gmp_location=$req->gmp_location;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $section_details=array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
      $gmplocation_details=array();
      if(validateIsNumeric($gmp_location)){
         $gmplocation_details=array('t1.id'=>$gmp_location);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='par_gmplocation_details';
      $field= 'gmp_type_id';
      $is_detailed_report='';
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $sub_total = 0;
      $screened_sub_total = 0;
      $evaluated_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $approved_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;
      //date filter
      $datefilter=$this->DateFilter($req);

     foreach ($sub_data as $submodule) {
          $section_data=DB::table('par_sections')
          ->where('is_product_type',1)->where($section_details)->get();   

          
           PDF::SetFont('','B',11);
           PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'B');
        foreach($section_data as $section){ 
           $gmplocation_data=DB::table('par_gmplocation_details as t1')
           ->where($gmplocation_details)
           ->get(); 
            PDF::SetFont('','B',11);
           PDF::cell(0,7,"Section:".$section->name,1,1,'B'); 
           foreach ($gmplocation_data as $gmplocation) {
                PDF::cell(0,7,"Facility Location:".$gmplocation->name,1,1,'B');

                $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;                      
                $subfilterdata=array('t1.gmp_type_id'=>$gmplocation->id);
                $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                $total = $total_brought_forward+$total_received;

                $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                $screened_applications = $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$total_approved-$total_rejected;
                     
               $i = 1;
              //start loop
              PDF::MultiCell(10, 10, "No", 1,'','',0);
              //PDF::MultiCell($w_1, 10, "Permit Type", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Brought Forward", 1,'','',0);
              PDF::MultiCell($w, 10, "Received", 1,'','',0);
              PDF::MultiCell($w, 10, "Total", 1,'','',0);
              PDF::MultiCell($w, 10, "Screened", 1,'','',0);
               PDF::MultiCell($w, 10, "Evaluated", 1,'','',0);
              PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Query Response", 1,'','',0);
              PDF::MultiCell($w, 10, "Approved", 1,'','',0);
              PDF::MultiCell($w, 10, "Rejected", 1,'','',0);
              PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);

                   

              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              //PDF::MultiCell($w_1, $rowcount *5, $permittype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$screened_applications,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $evaluated_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_approved,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_rejected,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);
             $i++;    
            }
          }
              PDF::SetFont('','B',9);
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $sub_total = $sub_total+$total;
              $screened_sub_total = $screened_sub_total+$screened_applications;
              $evaluated_sub_total = $evaluated_sub_total+$evaluated_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $approved_sub_total = $approved_sub_total+$total_approved;
              $rejected_sub_total = $rejected_sub_total+$total_rejected;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;

      }
        PDF::SetFont('','B',9);
        PDF::SetFillColor(249,249,249); // Grey
        PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
        PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
        //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
        PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5,$screened_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $evaluated_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $approved_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
        PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();
    
       PDF::Output('GMP Summary Report.pdf','I');
  }
 public function gmpSummaryReportExport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id = $req->section_id;
      $gmp_location=$req->gmp_location;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $section_details=array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
      $gmplocation_details=array();
      if(validateIsNumeric($gmp_location)){
         $gmplocation_details=array('t1.id'=>$gmp_location);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='par_gmplocation_details';
      $field= 'gmp_type_id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $heading="GMP Summary Report";
      $filename="Gmp summaryreport.Xlsx";
  
     //Looping
      foreach ($sub_data as $submodule) {
        $section_data = DB::table('par_sections')
        ->where('is_product_type',1)->where($section_details)->get();   


        foreach($section_data as $section){
        $gmplocation_data=DB::table('par_gmplocation_details as t1')
        ->where($gmplocation_details)
        ->get();
          foreach ($gmplocation_data as $gmplocation) {
                $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id; 
                $subfilterdata=array('t1.gmp_type_id'=>$gmplocation->id);
                $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                       $total = $total_brought_forward+$total_received;

                $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                $screened_applications = $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$total_approved-$total_rejected;

                $data[] = [
                    'SubModule'=>$submodule->name,
                    'Section'=>$section->name,
                    'Facility Location'=>$gmplocation->name,
                    'brought_forward'=>strval($total_brought_forward),
                    'received_applications'=>strval($total_received),
                    'total' => strval($total),
                    'screened_applications' =>strval($screened_applications),
                    'Evaluted Applications' => strval($evaluated_applications),
                    'queried' =>strval($requested_for_additional_information),
                    'query_responses'=>strval($query_responses),
                    'approved_applications' => strval($total_approved),
                    'rejected_applications' => strval($total_rejected),
                    'carried_forward'=>strval($carried_forward)          
                ]; 
          }
        }
       }

       $response = $this->exportExcel($data, $filename, $heading);
   
        return $response;
   }
   public function gmpDetailedReportPreview(Request $req){
          $sub_module_id=$req->sub_module_id;
          $section_id=$req->section_id;
          $gmp_location=$req->gmp_location;
          $process_class=$req->process_class;
          $module_id='3';
          $has_payment_processing = '1';
          $from_date=$req->from_date;
          $to_date=$req->to_date;
          $start=$req->start;
          $limit=$req->limit;
          $data = array();
          $table=$this->getTableName($module_id);
          $table2='';
          $table2='par_gmplocation_details';
          $field= 'gmp_type_id';
          $is_detailed_report='1';
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
           if(validateIsNumeric($gmp_location)){
              $subfilterdata=array('t1.gmp_type_id'=>$gmp_location);
          }
      
             if(validateIsNumeric($process_class)){
             switch ($process_class) {
                 case 1:
                  $qry=$this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                  $heading='GMP Brought Forward Applications Report';
                 break;
                 case 2:
              
                  $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
                   $heading='GMP Received Applications Report';
                  break;
                 case 3:
                 $qry= $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                 $heading='GMP Screened Applications Report';
                 break;
                 case 4:
                 $qry=$this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                //dd($qry);
                 $heading='GMP Evaluated Applications Report';
                 break;
                 case 5:
                 $qry=  $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                 $heading='GMP Queried Applications Report';
                 break; 
                 case 6:
                 $qry= $this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                 $heading='GMP Responded Applications Report';
                 break;

                 case 7:
                  $qry=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                  $heading='GMP Approved Applications Report';
                  break;
                 case 8:
                   $qry= $this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                   $heading='GMP Rejected Applications Report';
                  break;
                 // case 9:
                  //   $qry= $this-> getCarriedForwardApplicationsQuery($table_name,$table2,$field,$filters,$subFilters,$from_date,$to_date);
                  //   $heading='Carried Forward Applications';
                     //   break;
             }}else{
            
              $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
                 $heading='Report On All GMP Applications';
             }
             $qry->LeftJoin('par_gmp_assessment_types as t22','t1.assessment_type_id','t22.id')
                   ->LeftJoin('tra_manufacturing_sites as t33','t1.manufacturing_site_id','t33.id')
                   ->LeftJoin('tra_manufacturers_information as t44','t33.manufacturer_id','t44.id')
                   ->LeftJoin('par_countries as t55','t33.country_id','t55.id')
                   ->LeftJoin('par_regions as t6','t33.region_id','t6.id')
                   ->LeftJoin('par_districts as t7','t33.district_id','t7.id')
                   ->LeftJoin('par_business_types as t8','t33.business_type_id','t8.id')
                   ->LeftJoin('par_zones as t9','t1.zone_id','t9.id')
                   ->LeftJoin('wb_trader_account as t10','t33.applicant_id','t10.id')
                   ->LeftJoin('wb_trader_account as t11','t33.ltr_id','t11.id')
                   ->LeftJoin('tra_manufacturing_sites_personnel as t12','t33.contact_person_id','t12.id')
                   ->LeftJoin('par_countries as t14','t10.country_id','t14.id')
                   ->LeftJoin('par_regions as t15','t10.region_id','t15.id')
                   ->LeftJoin('par_countries as t16','t11.country_id','t16.id')
                   ->LeftJoin('par_regions as t17','t11.region_id','t17.id')
                   ->LeftJoin('tra_approval_recommendations as t18','t1.application_code','t18.application_code')
                   ->LeftJoin('par_device_types as t19','t1.device_type_id','t18.id')
                   ->LeftJoin('par_gmpapproval_decisions as t21','t18.decision_id','t21.id')
                   ->LeftJoin('par_validity_statuses as tv','t18.appvalidity_status_id','tv.id')
                   ->LeftJoin('par_registration_statuses as tr','t18.appregistration_status_id','tr.id')
                  ->LeftJoin('par_system_statuses as t25','t1.application_status_id','t25.id')

                ->select('t1.tracking_no','t1.reference_no','t22.name as assessment_procedure','t33.name as manufacturing_site','t33.gps_coordinate','t33.premise_reg_no','t44.name as manufacturer_name','t44.postal_address','t44.physical_address','t44.email_address','t44.mobile_no','t44.telephone_no','t55.name as country','t6.name as region','t7.name as district','t8.name as business_type',DB::raw("(select GROUP_CONCAT(' ', d.name) as BsnTypeDetails from par_business_type_details d inner join tra_mansite_otherdetails site on d.id = site.business_type_detail_id where site.manufacturing_site_id = t33.id) as BsnTypeDetails"),'t9.name as issueplace','t10.name as Trader','t10.physical_address as TraderPhysicalA','t10.postal_address as TraderPostalA','t10.telephone_no as TraderTell','t10.mobile_no as TraderMobile','t10.email as TraderEmail','t14.name as TraderCountry','t15.name as TraderRegion','t11.name as LocalAgent','t11.postal_address as LocalAgentPostalA','t11.physical_address as LocalAgentPhysicalA','t11.telephone_no as LocalAgentTell','t11.mobile_no as AgentMobile','t11.email as LocalAgentEmail','t16.name as AgentCountry','t17.name as AgentRegion','t12.name as contact_person','t12.postal_address as contact_personPostalA','t12.telephone as contact_personTell','t3.name as FacilityLocation','t18.expiry_date as CertExpiryDate','t18.certificate_issue_date as CertIssueDate','t19.name as DeviceType','t18.certificate_issue_date as IssueFrom','t18.certificate_issue_date as IssueTo','t1.date_added as ReceivedFrom','t1.date_added as ReceivedTo', 't18.certificate_no', 'tv.name as validity_status','tr.name as registration_status', 't21.name as approval_recommendation', 't25.name as application_status')
                     ->groupBy('t1.application_code');

        $total=$qry->get()->count();

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }

        if($total == 0){
          $res=array(
            'success'=>false,
            'message'=>'There is Unavailable'. " "  .$heading
          );
        }else{
        $res = array(
            'success' => true,
            'results' => $results,
            'heading' => $heading,
            'message' => 'All is well',
            'totalResults'=>$total
            );
      }
        return $res;


    }
     public function getClinicalTrialSummaryReport(request $req){
          $sub_module_id=$req->sub_module_id;
          $module_id=$req->module_id;
          $from_date=$req->from_date;
          $to_date=$req->to_date;
          //get sub-module data
          $submodule_details=array();
          if(validateIsNumeric($sub_module_id)){
              $submodule_details=array('id'=>$sub_module_id);
          }
          $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
        
          $data = array();
          $table=$this->getTableName($module_id);
          $table2='clinical_trial_products';
          $field='id';
          $is_detailed_report='';
          //date filter
          $datefilter=$this->DateFilter($req);
          //Looping
          foreach ($sub_data as $submodule) {

                $filterdata="t1.sub_module_id = ".$submodule->id;
                          
                $subfilterdata=array();
                $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);

                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total = $total_brought_forward+$total_received;

                $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$total_approved-$total_rejected;

                $data[] = array(
                        'SubModule'=>$submodule->name,
                        'received_applications'=>$total_received,
                        'brought_forward'=> $total_brought_forward,
                        'carried_forward'=>$carried_forward,
                        'total' => $total, 
                        'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                        'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                        'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                        'approved_applications' => $total_approved,
                        'rejected_applications' => $total_rejected,
                        'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                        ); 
                }
          $res = array(
                        'success' => true,
                        'results' => $data,
                        'message' => 'All is well'
                            
                        );
         if(validateIsNumeric($req->type)){
            return $res;
         }

         return \response()->json($res);
       }
  public function getClinicalTrialSummaryCartesianReport(request $req){
          $sub_module_id=$req->sub_module_id;
          $module_id=$req->module_id;
          $from_date=$req->from_date;
          $to_date=$req->to_date;
          //get sub-module data
          $submodule_details=array();
          if(validateIsNumeric($sub_module_id)){
              $submodule_details=array('id'=>$sub_module_id);
          }
          $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
          $data = array();
          $table=$this->getTableName($module_id);
          $table2='clinical_trial_products';
          $field='id';
          $is_detailed_report='';
          //date filter
          $datefilter=$this->DateFilter($req);
          //Looping
          foreach ($sub_data as $submodule) {

                $filterdata="t1.sub_module_id = ".$submodule->id;
                          
                $subfilterdata=array();
                $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $total = $total_brought_forward+$total_received;

                $carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$total_approved-$total_rejected;

                $data[] = array(
                        'submodule'=>wordwrap($submodule->name,15,"\n",false),
                        'received_applications'=>$total_received,
                        'brought_forward'=> $total_brought_forward,
                        'carried_forward'=>$carried_forward,
                        'total' => $total, 
                        'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                        'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                        'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                        'approved_applications' => $total_approved,
                        'rejected_applications' => $total_rejected,
                        'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                        );  
         }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
public function printClinicalTrialSummaryReport(Request $req){

      $title = 'Clinical Trial Applications Summary Report';
      $w = 20; 
      $w_1 = 40;
      $w_2 = 25;
      $w_3 = 50;
      $h = 25;
      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      //filterdata
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
    
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='clinical_trial_products';
      $field='id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $sub_total = 0;
      $screened_sub_total = 0;
      $evaluated_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $approved_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;

    foreach ($sub_data as $submodule) {
        
           PDF::SetFont('','B',11);
           PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'B');

                    $filterdata="t1.sub_module_id = ".$submodule->id;    
                    $subfilterdata=array();
                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;

                    $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                    $screened_applications = $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$total_approved-$total_rejected;
                     
               $i = 1;
              //start loop
              PDF::MultiCell(10, 10, "No", 1,'','',0);
              //PDF::MultiCell($w_1, 10, "Permit Type", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Brought Forward", 1,'','',0);
              PDF::MultiCell($w, 10, "Received", 1,'','',0);
              PDF::MultiCell($w, 10, "Total", 1,'','',0);
              PDF::MultiCell($w, 10, "Screened", 1,'','',0);
               PDF::MultiCell($w, 10, "Evaluated", 1,'','',0);
              PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Query Response", 1,'','',0);
              PDF::MultiCell($w, 10, "Approved", 1,'','',0);
              PDF::MultiCell($w, 10, "Rejected", 1,'','',0);
              PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);

                   

              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              //PDF::MultiCell($w_1, $rowcount *5, $permittype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$screened_applications,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $evaluated_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_approved,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_rejected,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);
             $i++;    
              PDF::SetFont('','B',9);
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $sub_total = $sub_total+$total;
              $screened_sub_total = $screened_sub_total+$screened_applications;
              $evaluated_sub_total = $evaluated_sub_total+$evaluated_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $approved_sub_total = $approved_sub_total+$total_approved;
              $rejected_sub_total = $rejected_sub_total+$total_rejected;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;

            }
        PDF::SetFont('','B',9);
        PDF::SetFillColor(249,249,249); // Grey
        PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
        PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
        //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
        PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5,$screened_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $evaluated_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $approved_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
        PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();
        PDF::Output('Clinical Trial Summary Report.pdf','I');
  }
  public function clinicalTrialSummaryReportExport(request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
    
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='clinical_trial_products';
      $field='id';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $heading="Clinical Trial Summary Report";
  
     //Looping
      foreach ($sub_data as $submodule) {

                    $filterdata="t1.sub_module_id = ".$submodule->id;
                      
                    $subfilterdata=array();
                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;

                    $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                    $screened_applications = $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$total_approved-$total_rejected;
                     

                    $data[] = [
                            'SubModule'=>$submodule->name,
                            'brought_forward'=>strval($total_brought_forward),
                            'received_applications'=>strval($total_received),
                            'total' => strval($total),
                            'screened_applications' =>strval($screened_applications),
                            'Evaluted Applications' => strval($evaluated_applications),
                             'queried' =>strval($requested_for_additional_information),
                            'query_responses'=>strval($query_responses),
                            'approved_applications' => strval($total_approved),
                            'rejected_applications' => strval($total_rejected),
                            'carried_forward'=>strval($carried_forward)
                           
                        ]; 
          }
        $header=$this->getArrayColumns($data);
        $org_info = DB::table('tra_organisation_information')->first();

       //product application details
        $clinicaltrialSpreadsheet = new Spreadsheet();
        $sheet = $clinicaltrialSpreadsheet->getActiveSheet();
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

    
    
        $sortedData=array();
        $i=0;
        $k=0;
        $temp=[];
        if(!empty($header)){
              $header=   $header; 
            }else{
              $header=array();
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
             foreach ($data as $udata)
                  {
                             for($v=0;$v<$total;$v++){
                             $temp1=$temp[$v];
                             $sortedData[$k][]=$udata[$temp1];
                      }
                     
                      $k++;  
                 }
            //first heading
            $sheet->mergeCells('A1:'.$letter.'6')
                      ->getCell('A1')
                        ->setValue(strtoupper($org_info->name)."\n".$org_info->postal_address."  , ".$org_info->physical_address."."."\nTel: ".$org_info->telephone_nos.",  Fax:".$org_info->fax.".\nWebsite: ".$org_info->website." Email: ".$org_info->email_address."."."\n".$heading."\t\t Exported on ".Carbon::now());
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
            $writer = new Xlsx($clinicaltrialSpreadsheet);
             ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();


    
             $response =  array(
                    'name' => 'ClinicalTrialsummaryreport.Xlsx', //no extention needed
                    'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
        );

   
        return $response;
   }
public function clinicalTrialDetailedReportPreview(Request $req){
        $sub_module_id=$req->sub_module_id;
        $process_class=$req->process_class;
        $module_id='7';
        $has_payment_processing = '';
        $from_date=$req->from_date;
        $to_date=$req->to_date;
        $start=$req->start;
        $limit=$req->limit;
      
         $data = array();
         $table=$this->getTableName($module_id);
         $table2='clinical_trial_products';
         $field='id';
         $is_detailed_report='1';
        //date filter
         $datefilter=$this->DateFilter($req);
         $filterdata = '';
         if(validateIsNumeric($sub_module_id)){
           $filterdata="t1.sub_module_id = ".$sub_module_id;
           }
         $subfilterdata = array();
        
         if(validateIsNumeric($process_class)){
         switch ($process_class) {
           case 1:
             $qry=$this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
             $heading='Clinical Trial Brought Forward Applications Report';
             break;
           case 2:
          
                 $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             
             $heading='Clinical Trial Received Applications Report';
             break;
           case 3:
             $qry= $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Clinical Trial Screened Applications Report';
             break;
           case 4:
             $qry=$this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
            //dd($qry);
             $heading='Clinical Trial Evaluated Applications Report';
             break;
             case 5:
             $qry=  $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Clinical Trial Queried Applications Report';
             break; 
             case 6:
             $qry= $this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Clinical Trial Responded Applications Report';
             break;

           case 7:
              $qry=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
              $heading='Clinical Trial Approved Applications Report';
             break;
           case 8:
             $qry= $this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Clinical Trial Rejected Applications Report';
             break;
           // case 9:
           //   $qry= $this-> getCarriedForwardApplicationsQuery($table_name,$table2,$field,$filters,$subFilters,$from_date,$to_date);
           //   $heading=' Carried Forward Applications';
           //   break;
         }}else{
        
          $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             $heading='Report On All Clinical Trial Applications';
         }
         $qry->LeftJoin('clinical_trial_duration_desc as t22','t1.duration_desc','t22.id')
           ->LeftJoin('clinical_trial_personnel as t33','t1.sponsor_id','t33.id')
           ->LeftJoin('clinical_trial_personnel as t44','t1.investigator_id','t44.id')
           ->leftJoin('tra_application_invoices as t55','t1.application_code','t55.application_code')
           ->LeftJoin('par_currencies as t6','t55.paying_currency_id','t6.id')
           ->LeftJoin('par_zones as t7', 't1.zone_id','t7.id')
           ->LeftJoin('par_countries as t8','t33.country_id','t8.id')
           ->LeftJoin('par_regions as t9','t33.region_id','t9.id')
           ->LeftJoin('par_countries as t10','t44.country_id','t10.id')
           ->LeftJoin('par_regions as t11','t44.region_id','t11.id')
           ->LeftJoin('tra_approval_recommendations as t12','t1.application_code','t12.application_code')
           ->LeftJoin('par_approval_decisions as t13','t12.decision_id','t13.id')
           ->LeftJoin('par_validity_statuses as tv','t12.appvalidity_status_id','tv.id')
           ->LeftJoin('par_registration_statuses as tr','t12.appregistration_status_id','tr.id')
           ->LeftJoin('wb_trader_account as t25','t1.applicant_id','t25.id')
           ->LeftJoin('par_regions as t26','t25.region_id','t26.id')
           ->LeftJoin('par_countries as t27','t25.country_id','t27.id')

           ->select('t1.study_title','t1.tracking_no','t1.reference_no','t1.protocol_no','t1.version_no','t1.study_start_date','t1.study_end_date','t1.date_of_protocol','t1.study_duration','t1.clearance_no','t22.name as duration_desc','t33.name as Sponsor','t33.postal_address as Spostal_address','t33.physical_address as Sphysical_address','t33.mobile_no as Smobile_no','t33.telephone as Stelephone_no','t33.email as Semail_address','t8.name as Scountry','t9.name as Sregion','t44.name as investigator','t44.postal_address as Ipostal_address','t44.physical_address as Iphysical_address','t44.mobile_no as Imobile_no','t44.telephone as Itelephone','t44.email as Iemail_address','t10.name as Icountry','t11.name as Iregion','t6.name as paying_currency','t7.name as CertIssuePlace','t12.certificate_issue_date as CertIssueDate','t12.expiry_date as CertExpiryDate','t12.certificate_issue_date as IssueFrom','t12.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo','t12.certificate_no','tv.name as validity_status', 'tr.name as registration_status', 't25.name as applicant','t25.postal_address as applicant_postal_address','t25.physical_address as applicant_physical_address','t25.email as applicant_email_address','t25.telephone_no as applicant_telephone','t25.mobile_no as applicant_mobile_no', 't26.name as applicant_region', 't27.name as applicant_country')
                ->groupBy('t1.application_code');

        $total=$qry->get()->count();

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }
        if($total == 0){
          $res=array(
            'success'=>false,
            'message'=>'Warning! There is Unavailable'. " "  .$heading
          );
        }else{
        $res = array(
            'success' => true,
            'results' => $results,
            'heading' => $heading,
            'message' => 'All is well',
            'totalResults'=>$total
            );
      }
        return $res;


    }
public function getPromotionAdvertisementSummaryReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $advertisement_type_id=$req->advertisement_type_id;
      $section_id=$req->section_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where('is_enabled', 1)->where($submodule_details)->where('module_id',$module_id)->get();


      $advertisement_details=array();
      if(validateIsNumeric($advertisement_type_id)){
         $advertisement_details=array('id'=>$advertisement_type_id);
      }
      $sections_details=array();
      if(validateIsNumeric($section_id)){
         $sections_details=array('id'=>$section_id);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
  
     //Looping
     foreach ($sub_data as $submodule) {
        $sections_data=DB::table('par_sections')
        ->where('is_product_type',1)->where($sections_details)->get();  
 
        foreach($sections_data as $section_data){
          $adevertisement_data=DB::table('par_advertisement_types')->where('is_enabled', 1)->where($advertisement_details)->get(); 

        foreach ($adevertisement_data as $advertisement) {
                      $filterdata= "t1.sub_module_id = ".$submodule->id." and t1.section_id = ".$section_id;
                      $subfilterdata=array('tp3.type_of_advertisement_id'=>$advertisement->id);

                      $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                      $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                     $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                     $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $total = $total_brought_forward+$total_received;

                      //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                      $carried_forward=$total-$total_approved-$total_rejected;

                      $data[] = array(
                          'SubModule'=>$submodule->name,'section_name'=>$section_data->name,
                          'advertisement_type'=>$advertisement->name,
                          'received_applications'=>$total_received,
                          'brought_forward'=> $total_brought_forward,
                          'carried_forward'=>$carried_forward,
                          'total' => $total, 
                          'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                          'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                          'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                          'approved_applications' => $total_approved,
                          'rejected_applications' => $total_rejected,
                          'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                      ); 
          }


          }
        }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }

   public function getPromotionAdvertisementSummaryCartesianReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $advertisement_type_id=$req->advertisement_type_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);

      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $filterdata =[];
      if(validateIsNumeric($sub_module_id)){
        $filterdata[]="t1.sub_module_id = ".$sub_module_id;
      }
      if(validateIsNumeric($sub_module_id)){
        $filterdata[]="t1.section_id = ".$section_id;
      }
      $filterdata = implode(' AND ',$filterdata);
       $subfilterdata = array();
      if(validateIsNumeric($advertisement_type_id)){
        $subfilterdata=array('t1.advertisement_type_id'=>$advertisement_type_id);
      }
      

     //Looping
     foreach ($sub_data as $submodule) {

        //section and submodule filter
        $filterdata="t1.sub_module_id = ".$submodule->id;              
        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
        $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $total = $total_brought_forward+$total_received;

        //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
        $carried_forward=$total-$total_approved-$total_rejected;

        $data[] = array(
            //'SubModule'=>$submodule->name,
            'SubModule'=>$submodule->name,
            'received_applications'=>$total_received,
            'brought_forward'=> $total_brought_forward,
            'carried_forward'=>$carried_forward,
            'total' => $total, 
            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
            'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'approved_applications' => $total_approved,
            'rejected_applications' => $total_rejected,
            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
             ); 
       }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
   public function printPromotionAdvertisementSummaryReport(Request $req){

      $title = 'Promotion & Advertisement Applications Summary Report';
      $w = 20; 
      $w_1 = 40;
      $w_2 = 25;
      $w_3 = 50;
      $h = 25;
      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      //filterdata
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $advertisement_type_id=$req->advertisement_type_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $data = array();
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $section_details=array();
      if(validateIsNumeric($section_id)){
        $section_details=array('id'=>$section_id);
      }
     $advertisement_details=array();
      if(validateIsNumeric($advertisement_type_id)){
         $advertisement_details=array('id'=>$advertisement_type_id);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $is_detailed_report='';
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $sub_total = 0;
      $screened_sub_total = 0;
      $evaluated_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $approved_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;

      $data = array();
      $i = 1;
      //start loop
       foreach ($sub_data as $submodule) {
          $section_data = DB::table('par_sections')
          ->whereNotIn('id',[5,6,8,9,10,14])
          ->where($section_details)
          ->get();
          PDF::SetFont('','B',11);
          PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'B');
         foreach($section_data as $section){  
          PDF::SetFont('','B',11);
           PDF::cell(0,7,"Section:".$section->name,1,1,'B');
           $adevertisement_data=DB::table('par_advertisement_types')->where($advertisement_details)->get(); 
          foreach ($adevertisement_data as $advertisement) {
                PDF::cell(0,7,"Advertisement Type:".$advertisement->name,1,1,'B');
                         //section and submodule filter
                $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                  
                $subfilterdata=array('t1.advertisement_type_id'=>$advertisement->id);

                //start loop
                 $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;

                    $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                    $screened_applications = $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$total_approved-$total_rejected;
                     
               $i = 1;
              //start loop
              PDF::MultiCell(10, 10, "No", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Brought Forward", 1,'','',0);
              PDF::MultiCell($w, 10, "Received", 1,'','',0);
              PDF::MultiCell($w, 10, "Total", 1,'','',0);
              PDF::MultiCell($w, 10, "Screened", 1,'','',0);
               PDF::MultiCell($w, 10, "Evaluated", 1,'','',0);
              PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Query Response", 1,'','',0);
              PDF::MultiCell($w, 10, "Approved", 1,'','',0);
              PDF::MultiCell($w, 10, "Rejected", 1,'','',0);
              PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);

                   

              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              //PDF::MultiCell($w_1, $rowcount *5, $permittype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$screened_applications,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $evaluated_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_approved,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_rejected,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);
             $i++;  
             }  
           }
              PDF::SetFont('','B',9);
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $sub_total = $sub_total+$total;
              $screened_sub_total = $screened_sub_total+$screened_applications;
              $evaluated_sub_total = $evaluated_sub_total+$evaluated_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $approved_sub_total = $approved_sub_total+$total_approved;
              $rejected_sub_total = $rejected_sub_total+$total_rejected;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;

            }
        PDF::SetFont('','B',9);
        PDF::SetFillColor(249,249,249); // Grey
        PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
        PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
        //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
        PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5,$screened_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $evaluated_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $approved_sub_total,1,'C','Fill',0);
        PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
        PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();    
      PDF::Output('Promotion & Advertisement Summary Report.pdf','I');
  }
  public function promotionAdvertisementSummaryReportExport(request $req){
     $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $section_id=$req->section_id;
      $advertisement_type_id=$req->advertisement_type_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $section_details=array();
      if(validateIsNumeric($section_id)){
          $section_details=array('id'=>$section_id);
      }
      $advertisement_details=array();
      if(validateIsNumeric($advertisement_type_id)){
         $advertisement_details=array('id'=>$advertisement_type_id);
      }

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $heading="Promotion & Advertisement Summary Report";
      $filename ="Promotion & Advertisement Application Summaryreport.Xlsx";
  
     //Looping
     foreach ($sub_data as $submodule) {
        $section_data=DB::table('par_sections')
        ->whereNotIn('id',[5,6,8,9,10,14])
        ->where($section_details)
        ->get();
        foreach($section_data as $section){ 
          $adevertisement_data=DB::table('par_advertisement_types')->where($advertisement_details)->get();
          foreach ($adevertisement_data as $advertisement) {
                    $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                    $subfilterdata=array('t1.advertisement_type_id'=>$advertisement->id);
                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;

                    $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                    $screened_applications = $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$total_approved-$total_rejected;
                     

                    $data[] = [
                            'SubModule'=>$submodule->name,
                            'Section'=>$section->name,
                            'advertisement_type'=>$advertisement->name,
                            'brought_forward'=>strval($total_brought_forward),
                            'received_applications'=>strval($total_received),
                            'total' => strval($total),
                            'screened_applications' =>strval($screened_applications),
                            'Evaluted Applications' => strval($evaluated_applications),
                             'queried' =>strval($requested_for_additional_information),
                            'query_responses'=>strval($query_responses),
                            'approved_applications' => strval($total_approved),
                            'rejected_applications' => strval($total_rejected),
                            'carried_forward'=>strval($carried_forward)
                           
                       ]; 
             }
           }
          }
 
      $response = $this->exportExcel($data, $filename, $heading);

        return $response;
   }
   public function promotionAdvertisementDetailedReportPreview(Request $req){
        $sub_module_id=$req->sub_module_id;
        $section_id=$req->section_id;
        $process_class=$req->process_class;
        $advertisement_type_id=$req->advertisement_type_id;
        $module_id='14';
        $has_payment_processing = '1';
        $from_date=$req->from_date;
        $to_date=$req->to_date;
        $start=$req->start;
        $limit=$req->limit;
      
         $data = array();
         $table=$this->getTableName($module_id);
         $table2='';
         $field='';
         $is_detailed_report='1';
        //date filter
         $datefilter=$this->DateFilter($req);
         $filterdata = [];
         if(validateIsNumeric($sub_module_id)){
           $filterdata[]="t1.sub_module_id = ".$sub_module_id;
           }
          if(validateIsNumeric($section_id)){
           $filterdata[]="t1.section_id = ".$section_id;
           }
           $filterdata=implode(' AND ',$filterdata);
         $subfilterdata = array();
          if(validateIsNumeric($advertisement_type_id)){
            $subfilterdata=array('t1.advertisement_type_id'=>$advertisement_type_id);
           }
         if(validateIsNumeric($process_class)){
         switch ($process_class) {
           case 1:
             $qry=$this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
             $heading='Promotion & Advertisement Brought Forward Applications Report';
             break;
           case 2:
          
                 $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             
             $heading='Promotion & Advertisement Received Applications Report';
             break;
           case 3:
             $qry= $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Promotion & Advertisement Screened Applications Report';
             break;
           case 4:
             $qry=$this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
            //dd($qry);
             $heading='Promotion & Advertisement Evaluated Applications Report';
             break;
             case 5:
             $qry=  $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Promotion & Advertisement Queried Applications Report';
             break; 
             case 6:
             $qry= $this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Promotion & Advertisement Responded Applications Report';
             break;

           case 7:
              $qry=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
              $heading='Promotion & Advertisement Approved Applications Report';
             break;
           case 8:
             $qry= $this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Promotion & Advertisement Rejected Applications Report';
             break;
           // case 9:
           //   $qry= $this-> getCarriedForwardApplicationsQuery($table_name,$table2,$field,$filters,$subFilters,$from_date,$to_date);
           //   $heading=' Carried Forward Applications';
           //   break;
         }}else{
        
          $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             $heading='Report On All Promotion & Advertisement Applications';
         }
         $qry->LeftJoin('wb_trader_account as t44','t1.applicant_id','t44.id')
           ->LeftJoin('par_regions as t55','t44.region_id','t55.id')
           ->LeftJoin('par_countries as t6','t44.country_id','t6.id')
           ->leftJoin('tra_promotionaladvert_personnel as t7','t1.sponsor_id','t7.id')
           ->LeftJoin('par_regions as t8','t7.region_id','t8.id')
           ->LeftJoin('par_countries as t9','t7.country_id','t9.id')
           ->LeftJoin('par_zones as t10','t1.zone_id','t10.id')
           ->LeftJoin('tra_approval_recommendations as t11','t1.application_code','t11.application_code')
           ->LeftJoin('par_approval_decisions as t12','t11.decision_id','t12.id')
           ->LeftJoin('par_validity_statuses as tv','t11.appvalidity_status_id','tv.id')
           ->LeftJoin('par_registration_statuses as tr','t11.appregistration_status_id','tr.id')


           ->addselect('t1.tracking_no','t1.reference_no','t44.name as Trader','t44.postal_address as TraderPostalA','t44.physical_address as TraderPhysicalA','t44.telephone_no as TraderTell','t44.mobile_no as TraderMobile','t44.email as TraderEmail','t55.name as TraderRegion','t6.name as TraderCountry','t7.name as Sponsor','t7.postal_address as SPostalA','t7.physical_address as SPhysicalA','t7.telephone_no as STell','t7.mobile_no as SMobile','t7.email as SEmail','t8.name as SRegion','t9.name as SCountry','t10.name as CertIssuePlace','t11.certificate_issue_date as CertIssueDate','t11.expiry_date as CertExpiryDate','t11.certificate_issue_date as IssueFrom','t11.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo', 't11.certificate_no', 'tv.name as validity_status', 'tr.name as registration_status')
               ->groupBy('t1.application_code');

        $total=$qry->get()->count();

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }
        if($total == 0){
          $res=array(
            'success'=>false,
            'message'=>'There is Unavailable'. " "  .$heading
          );
        }else{
        $res = array(
            'success' => true,
            'results' => $results,
            'heading' => $heading,
            'message' => 'All is well',
            'totalResults'=>$total
            );
      }
        return $res;


    }

    public function getDisposalSummaryReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $section_id=$req->section_id;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $section_details=array();
      if(validateIsNumeric($section_id)){
          $section_details=array('id'=>$section_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();



      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
  
     //Looping
     foreach ($sub_data as $submodule) {
             $sections_data=DB::table('par_sections')->where($section_details)->where('is_enabled',1)->get();


              foreach ($sections_data as $section_data) {

                    $filterdata="t1.sub_module_id = ".$submodule->id." and t1.section_id = ".$section_data->id ;
                    $subfilterdata=array();

                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                  $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                  $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total = $total_brought_forward+$total_received;

                    //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$total_approved-$total_rejected;

                    $data[] = array(
                        'SubModule'=>$submodule->name,
                        'section_name'=>$section_data->name,
                        'received_applications'=>$total_received,
                        'brought_forward'=> $total_brought_forward,
                        'carried_forward'=>$carried_forward,
                        'total' => $total, 
                        'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                        'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                        'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                        'approved_applications' => $total_approved,
                        'rejected_applications' => $total_rejected,
                        'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                    ); 



              }
                        
        }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }

   public function getDisposalSummaryCartesianReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $section_id =$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);

       $subfilterdata = array();
     $filterdata=[];
     if(validateIsNumeric($sub_module_id)){
      $filterdata[]="t1.sub_module_id = ".$sub_module_id;
     }
      if(validateIsNumeric($section_id)){
        $filterdata[]="t1.section_id = ".$section_id;
      }
      $filterdata = implode(' AND ',$filterdata);
     //Looping
     foreach ($sub_data as $submodule) {

        //section and submodule filter
        $filterdata="t1.sub_module_id = ".$submodule->id;              
        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
        $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $total = $total_brought_forward+$total_received;

        //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
        $carried_forward=$total-$total_approved-$total_rejected;

        $data[] = array(
            //'SubModule'=>$submodule->name,
            'SubModule'=>wordwrap($submodule->name,15,"\n",false),
            'received_applications'=>$total_received,
            'brought_forward'=> $total_brought_forward,
            'carried_forward'=>$carried_forward,
            'total' => $total, 
            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'evaluated_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
            'screened_applications' => $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'approved_applications' => $total_approved,
            'rejected_applications' => $total_rejected,
            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
             ); 
       }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
   public function printDisposalSummaryReport(Request $req){

      $title = 'Disposal Applications Summary Report';
      $w = 20; 
      $w_1 = 40;
      $w_2 = 25;
      $w_3 = 50;
      $h = 25;
      PDF::SetTitle( $title );
      PDF::AddPage("L");
       
      $this->generateReportsHeader( $title);
         
      PDF::Ln();
      //filterdata
      $sub_module_id=$req->sub_module_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data

      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $is_detailed_report='';
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $sub_total = 0;
      $screened_sub_total = 0;
      $evaluated_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $approved_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;
      $data = array();
        $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

     $section_details=array();
      if(validateIsNumeric($section_id)){
         $section_details=array('id'=>$section_id);
      }
      $i = 1;
      //start loop
       foreach ($sub_data as $submodule) {
        $section_data= DB::table('par_sections')
        ->whereNotIn('id',[5,6,8,9,10,14])
        ->where($section_details)
        ->get();
           PDF::SetFont('','B',11);
           PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'B');
        foreach($section_data as $section){
           PDF::SetFont('','B',11);
           PDF::cell(0,7,"Section:".$section->name,1,1,'B');
                $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                $subfilterdata=array();

                //start loop
                 $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;

                    $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                    $screened_applications = $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$total_approved-$total_rejected;
                     
               $i = 1;
              //start loop
              PDF::MultiCell(10, 10, "No", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Brought Forward", 1,'','',0);
              PDF::MultiCell($w, 10, "Received", 1,'','',0);
              PDF::MultiCell($w, 10, "Total", 1,'','',0);
              PDF::MultiCell($w, 10, "Screened", 1,'','',0);
               PDF::MultiCell($w, 10, "Evaluated", 1,'','',0);
              PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Query Response", 1,'','',0);
              PDF::MultiCell($w, 10, "Approved", 1,'','',0);
              PDF::MultiCell($w, 10, "Rejected", 1,'','',0);
              PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);

                   

              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              //PDF::MultiCell($w_1, $rowcount *5, $permittype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$screened_applications,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $evaluated_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_approved,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_rejected,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);
             $i++;  
              PDF::SetFont('','B',9);
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $sub_total = $sub_total+$total;
              $screened_sub_total = $screened_sub_total+$screened_applications;
              $evaluated_sub_total = $evaluated_sub_total+$evaluated_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $approved_sub_total = $approved_sub_total+$total_approved;
              $rejected_sub_total = $rejected_sub_total+$total_rejected;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;

            }
          }
             PDF::SetFont('','B',9);
             PDF::SetFillColor(249,249,249); // Grey
             PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
              PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
              //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5,$screened_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $evaluated_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $approved_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
              PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();
    
      PDF::Output('Disposal Summary Report.pdf','I');
  }
  public function DisposalSummaryReportExport(request $req){
     $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $section_id=$req->section_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $section_details=array();
      if(validateIsNumeric($section_id)){
          $section_details=array('id'=>$section_id);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $heading="Disposal Summary Report";
      $filename="Disposal Summary Report.Xlsx";
  
     //Looping
          foreach ($sub_data as $submodule) {
            $section_data=DB::table('par_sections')
            ->whereNotIn('id',[5,6,8,9,10,14])
            ->where($section_details)
            ->get();
            foreach($section_data as $section){

                    $filterdata="t1.sub_module_id = ".$submodule->id." AND t1.section_id = ".$section->id;
                    $subfilterdata=array();
                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field,$filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;

                    $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $evaluated_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                    $screened_applications = $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_approved=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $total_rejected=$this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$total_approved-$total_rejected;
                     

                    $data[] = [
                            'SubModule'=>$submodule->name,
                            'Section'=>$section->name,
                            'brought_forward'=>strval($total_brought_forward),
                            'received_applications'=>strval($total_received),
                            'total' => strval($total),
                            'screened_applications' =>strval($screened_applications),
                            'Evaluted Applications' => strval($evaluated_applications),
                             'queried' =>strval($requested_for_additional_information),
                            'query_responses'=>strval($query_responses),
                            'approved_applications' => strval($total_approved),
                            'rejected_applications' => strval($total_rejected),
                            'carried_forward'=>strval($carried_forward)
           
                 ]; }
          }
      $response =$this->exportExcel($data, $filename, $heading);
   
        return $response;
   }
   public function disposalDetailedReportPreview(Request $req){
        $sub_module_id=$req->sub_module_id;
        $section_id=$req->section_id;
        $process_class=$req->process_class;
        $module_id='15';
        $has_payment_processing = '1';
        $from_date=$req->from_date;
        $to_date=$req->to_date;
        $start=$req->start;
        $limit=$req->limit;
      
         $data = array();
         $table=$this->getTableName($module_id);

         $table2='';
         $field='';
         $is_detailed_report='1';
        //date filter
         $datefilter=$this->DateFilter($req);
         $filterdata = [];
         if(validateIsNumeric($sub_module_id)){
           $filterdata[]="t1.sub_module_id = ".$sub_module_id;
           }
          if(validateIsNumeric($section_id)){
           $filterdata[]="t1.section_id = ".$section_id;
           }
           $filterdata=implode(' AND ',$filterdata);
         $subfilterdata = array();
          
         if(validateIsNumeric($process_class)){
         switch ($process_class) {
           case 1:
             $qry=$this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
             $heading='Disposal Brought Forward Applications Report';
             break;
           case 2:
          
                 $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             
             $heading='DisposalReceived Applications Report';
             break;
           case 3:
             $qry= $this->getScreenedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Disposal Screened Applications Report';
             break;
           case 4:
             $qry=$this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
            //dd($qry);
             $heading='Disposal Evaluated Applications Report';
             break;
             case 5:
             $qry=  $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Disposal Queried Applications Report';
             break; 
             case 6:
             $qry= $this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Disposal Responded Applications Report';
             break;

           case 7:
              $qry=$this->getApprovedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
              $heading='Disposal Approved Applications Report';
             break;
           case 8:
             $qry= $this->getRejectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Disposal Rejected Applications Report';
             break;
           // case 9:
           //   $qry= $this-> getCarriedForwardApplicationsQuery($table_name,$table2,$field,$filters,$subFilters,$from_date,$to_date);
           //   $heading=' Carried Forward Applications';
           //   break;
         }}else{
        
          $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             $heading='Report On All Disposal Applications';
         }
          $qry->LeftJoin('tra_destruction_exercisesites as t22','t1.application_code','t22.application_code')
            ->LeftJoin('par_disposaldestruction_sites as t33','t22.destruction_site_id','t33.id')
            ->LeftJoin('tra_methodsof_destructions as t44','t1.application_code','t44.application_code')
             ->LeftJoin('par_destruction_methods as t55','t44.destructionmethod_id','t55.id')
             ->LeftJoin('par_packaging_units as t6','t1.packaging_unit_id','t6.id')
             ->LeftJoin('par_weights_units as t7','t1.weights_units_id','t7.id')
             ->LeftJoin('par_currencies as t8','t1.currency_id','t8.id')
             ->LeftJoin('tra_premises as t9','t1.premise_id','t9.id')
             ->LeftJoin('tra_disposal_inspectors as t10','t22.application_code','t10.application_code')
             ->LeftJoin('par_disposal_inspectors_titles as t11','t10.inspectors_title_id','t11.id')
             ->LeftJoin('par_organisations as t12','t10.organisation_id','t12.id')
             ->LeftJoin('wb_trader_account as t13','t1.trader_id','t13.id')
             ->LeftJoin('par_countries as t14','t9.country_id','t14.id')
             ->LeftJoin('par_countries as t15','t13.country_id','t15.id')
             ->LeftJoin('par_regions as t16','t13.region_id','t16.id')
             ->LeftJoin('par_zones as t17','t1.zone_id','t17.id')
             ->LeftJoin('par_sections as t18','t1.section_id','t18.id')
             ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
            
             
              ->addselect('t1.tracking_no','t1.reference_no','t1.reason_for_disposal','t1.quantity','t1.total_weight','t1.market_value','t1.submission_date','t33.name as destruction_site', 't55.name as destruction_method','t6.name as packaging_unit','t7.name as weight_unit','t8.name as currency','t9.name as premise_name','t9.premise_reg_no','t9.email as premise_email','t9.telephone as premise_tell','t9.physical_address as premise_physical_address','t9.postal_address as premise_postal_address','t10.inspector_name as inspector_name','t11.name as inpsector_title','t12.name as inpsector_organisation','t13.name as trader_name','t13.postal_address as trader_postal_address','t13.physical_address as trader_physical_address','t13.email as trader_email_address','t13.telephone_no as trader_telephone','t13.mobile_no as trader_mobile_no','t14.name as premise_country','t15.name as trader_country','t16.name as trader_region','t17.name as CertIssuePlace','t18.name as product_type','t19.certificate_issue_date as CertIssueDate','t19.expiry_date as CertExpiryDate','t19.certificate_no')
                 ->groupBy('t1.application_code');

        $total=$qry->get()->count();

        if(isset($start)&&isset($limit)){
        $results = $qry->skip($start)->take($limit)->get();
        }
        else{
        $results=$qry->get();
        }
        if($total == 0){
          $res=array(
            'success'=>false,
            'message'=>'There is Unavailable'. " "  .$heading
          );
        }else{
        $res = array(
            'success' => true,
            'results' => $results,
            'heading' => $heading,
            'message' => 'All is well',
            'totalResults'=>$total
            );
      }
        return $res;


    }
    public function getControlledDrugsSubModules(Request $request)
    {
        $module_id = $request->input('module_id');
        $is_importpermit = $request->input('is_importpermit');
        $is_certificate = $request->input('is_certificate');
        $is_order = $request->input('is_order');
        $qry = Db::table('sub_modules as t1');
        if (isset($module_id) && $module_id != '') {
            if (isset($is_order) && $is_order==1) {
                $qry->where('module_id', $module_id)
                ->whereIn('id',[71]);
             }
             elseif (isset($is_certificate) && $is_certificate==1) {
                $qry->where('module_id', $module_id)
                ->whereIn('id',[60]);
             }
              elseif (isset($is_importpermit) && $is_importpermit==1) {
                $qry->where('module_id', $module_id)
                ->whereIn('id',[61,75]);
             }
            }
            $results = $qry->get();
        $res = array(
             'success' => true,
             'results' => $results,
             'message' => 'All is well'
            );
        return $res;
  }
  public function getControlledDrugsPermitType(Request $request)
    {
        $table_name = $request->table_name;
        $qry = DB::table($table_name. ' as t1')
        ->leftJoin('par_modulesimpexp_permittypes as t2','t1.id', 't2.importexport_permittype_id')
        ->whereIn('t2.sub_module_id',[61])
        ->select('t1.*');

        $results = $qry->get();
        $res = array(
             'success' => true,
             'results' => $results,
             'message' => 'All is well'
            );
        return $res;
  }

  public function getControlledDrugsImportPermitSummaryReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $permit_type=$req->permit_type;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
    
      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field= '';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      //Looping
      foreach ($sub_data as $submodule) {
            $permit_data=DB::table('par_importexport_permittypes as t1')
            ->leftJoin('par_modulesimpexp_permittypes as t2','t1.id', 't2.importexport_permittype_id')
            ->where($permit_details)
            ->where('t2.sub_module_id', $submodule->id)
            ->whereIn('t2.sub_module_id',[61])
            ->get();

            foreach ($permit_data as $permittype) {
                    $filterdata="t1.sub_module_id = ".$submodule->id;
                      
                    $subfilterdata=array('t1.importexport_permittype_id'=>$permittype->importexport_permittype_id);
                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;
                    $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$permit_release-$permit_rejection;
                        $data[] = array(
                            'SubModule'=>$submodule->name,
                            'Permit_name'=>$permittype->name,
                            'Permit_name_graph'=>$permittype->graph_abr,
                            'received_applications'=>$total_received,
                            'brought_forward'=> $total_brought_forward,
                            'carried_forward'=>$carried_forward,
                            'total' => $total, 
                            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                            'screened_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                            'permit_reviewed' => $permit_reviewed,
                            'permit_release' => $permit_release,
                            'permit_rejection' => $permit_rejection,
                            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                        ); 
                  }
       }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
   public function getControlledDrugsImportPermitSummaryCartesianReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $permit_type=$req->permit_type;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $has_payment_processing = 1;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }
      $permit_data=DB::table('par_importexport_permittypes as t1')
        ->leftJoin('par_modulesimpexp_permittypes as t2','t1.id', 't2.importexport_permittype_id')
        ->where($permit_details)
        ->whereIn('t2.sub_module_id',[61])
        ->get();

    
     
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field= '';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $filterdata = '';
       if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
        
    foreach ($permit_data as $permittype) {
                      
        $subfilterdata=array('t1.importexport_permittype_id'=>$permittype->importexport_permittype_id);

       

        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
        $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
        $total = $total_brought_forward+$total_received;
        $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
        $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
        $carried_forward=$total-$permit_release-$permit_rejection;
        $data[] = array(
            'Permit_name'=>wordwrap($permittype->name,15,"\n",false),
            'received_applications'=>$total_received,
            'brought_forward'=> $total_brought_forward,
            'carried_forward'=>$carried_forward,
            'total' => $total, 
            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'screened_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
            'permit_reviewed' => $permit_reviewed,
            'permit_release' => $permit_release,
            'permit_rejection' => $permit_rejection,
            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
            ); 
         }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
    public function printControlledDrugsImportPermitSummaryReport(Request $req){

    $title = 'Controlled Drugs Import Permit Application(s) Summary Report';
        $w = 20; 
        $w_1 = 40;
        $w_2 = 25;
        $w_3 = 50;
        $h = 25;
        PDF::SetTitle( $title );
        PDF::AddPage("L");
       
        $this->generateReportsHeader( $title);
         
        PDF::Ln();
     //filterdata
      $sub_module_id=$req->sub_module_id;
      $permit_type=$req->permit_type;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $data = array();
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $is_detailed_report='';
      $sub_total = 0;
      $cummulative_total = 0;
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $reviewed_sub_total = 0;
      $inspected_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $reviewed_sub_total = 0;
      $released_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;

      $data = array();
       foreach ($sub_data as $submodule) {
           $permit_data=DB::table('par_importexport_permittypes as t1')
            ->leftJoin('par_modulesimpexp_permittypes as t2','t1.id', 't2.importexport_permittype_id')
              ->where($permit_details)
               ->whereIn('t2.sub_module_id',[61])
              ->get();
     
            PDF::SetFont('','B',11);
            PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'B');

           foreach ($permit_data as $permittype) {
               PDF::cell(0,7,"Permit Type:".$permittype->name,1,1,'B');
                         //section and submodule filter
                $filterdata="t1.sub_module_id = ".$submodule->id;
                $subfilterdata=array('t1.importexport_permittype_id'=>$permittype->importexport_permittype_id);

                $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                 $inspected_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                $total = $total_brought_forward+$total_received;
                $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$permit_release-$permit_rejection;
                     
               $i = 1;
              //start loop
              PDF::MultiCell(10, 10, "No", 1,'','',0);
              //PDF::MultiCell($w_1, 10, "Permit Type", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Brought Forward", 1,'','',0);
              PDF::MultiCell($w, 10, "Received", 1,'','',0);
              PDF::MultiCell($w, 10, "Total", 1,'','',0);
              PDF::MultiCell($w, 10, "Screened", 1,'','',0);
              PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Query Response", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Reviewed", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Released", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Rejected", 1,'','',0);
              PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);

                   

              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              //PDF::MultiCell($w_1, $rowcount *5, $permittype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$inspected_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_reviewed,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_release,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_rejection,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);

              $sub_total = $sub_total+$total;
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $inspected_sub_total = $inspected_sub_total+$inspected_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $reviewed_sub_total = $reviewed_sub_total+$permit_reviewed;
              $released_sub_total = $released_sub_total+$permit_release;
              $rejected_sub_total = $rejected_sub_total+$permit_rejection;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;
             $i++;    
                }
               PDF::SetFont('','B',9);
             PDF::SetFillColor(249,249,249); // Grey
             PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
              PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
              //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5,$inspected_applications,1,'C','Fill',0);
              PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $reviewed_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $reviewed_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
              PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();

            }
    
      PDF::Output('Controlled Drugs Import Permit Application Summary Report.pdf','I');
  }
public function controlledDrugsImportPermitSummaryReportExport(request $req){
      $sub_module_id=$req->sub_module_id;
      $permit_type=$req->permit_type;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $permit_details=array();
      if(validateIsNumeric($permit_type)){
         $permit_details=array('t1.id'=>$permit_type);
      }

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $heading="Import & Export Summary Report";
  
     //Looping
    foreach ($sub_data as $submodule) {
           $permit_data=DB::table('par_importexport_permittypes as t1')
            ->leftJoin('par_modulesimpexp_permittypes as t2','t1.id', 't2.importexport_permittype_id')
            ->where($permit_details)
            ->whereIn('t2.sub_module_id',[61])
            ->get(); 

            foreach ($permit_data as $permittype) {

                         //section and submodule filter
                       $filterdata="t1.sub_module_id = ".$submodule->id;
                       $subfilterdata=array('t1.importexport_permittype_id'=>$permittype->importexport_permittype_id);
                        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                       $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                       $total = $total_brought_forward+$total_received;

                      $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $inspected_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                      $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                       $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                       $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                      $carried_forward=$total-$permit_release-$permit_rejection;
                     

                        $data[] = [
                            'SubModule'=>$submodule->name,
                            'Permit_Type'=>$permittype->name,
                            'brought_forward'=>strval($total_brought_forward),
                            'received_applications'=>strval($total_received),
                            'total' => strval($total),
                            'screened_applications' =>strval($inspected_applications),
                             'queried' =>strval($requested_for_additional_information),
                            'query_responses'=>strval($query_responses),
                            'permit_reviewed' => strval($permit_reviewed),
                            'permit_released' => strval($permit_release),
                            'permit_rejected' => strval($permit_rejection),
                            'carried_forward'=>strval($carried_forward)
                           
                        ]; 
          }
       }
       $header=$this->getArrayColumns($data);
       $org_info = DB::table('tra_organisation_information')->first();

       //product application details
        $ImportExportSpreadsheet = new Spreadsheet();
        $sheet = $ImportExportSpreadsheet->getActiveSheet();
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

    
    
        $sortedData=array();
        $i=0;
        $k=0;
        $temp=[];
        if(!empty($header)){
              $header=   $header; 
            }else{
              $header=array();
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
         foreach ($data as $udata){
            
                    for($v=0;$v<$total;$v++){
                         $temp1=$temp[$v];
                        $sortedData[$k][]=$udata[$temp1];
                      }
                     
                      $k++;  
                 }
            //first heading
            $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
             ->setValue(strtoupper($org_info->name)."\n".$org_info->postal_address."  , ".$org_info->physical_address."."."\nTel: ".$org_info->telephone_nos.",  Fax:".$org_info->fax.".\nWebsite: ".$org_info->website." Email: ".$org_info->email_address."."."\n".$heading."\t\t Exported on ".Carbon::now());
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
            $writer = new Xlsx($ImportExportSpreadsheet);
             ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();


    
        $response =  array(
           'name' => 'Controlled Drugs Import Permit Application(s) summaryreport.Xlsx', //no extention needed
           'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
        );

   
        return $response;
   }
   public function getCertificateOrderSummaryReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
    
    
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field= '';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      //Looping
      foreach ($sub_data as $submodule) {

                    $filterdata="t1.sub_module_id = ".$submodule->id;
                      
                    $subfilterdata=array();
                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;
                    $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                    $carried_forward=$total-$permit_release-$permit_rejection;
                        $data[] = array(
                            'SubModule'=>$submodule->name,
                            'received_applications'=>$total_received,
                            'brought_forward'=> $total_brought_forward,
                            'carried_forward'=>$carried_forward,
                            'total' => $total, 
                            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
                            'screened_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
                            'permit_reviewed' => $permit_reviewed,
                            'permit_release' => $permit_release,
                            'permit_rejection' => $permit_rejection,
                            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
                        ); 
                  }

      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
   public function getCertificateOrderSummaryCartesianReport(request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
    
    
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field= '';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      //Looping
      foreach ($sub_data as $submodule) {

                    $filterdata="t1.sub_module_id = ".$submodule->id;
                      
                    $subfilterdata=array();
                    $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                    $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                    $total = $total_brought_forward+$total_received;
                    $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                    $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                        //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
        $carried_forward=$total-$permit_release-$permit_rejection;
        $data[] = array(
            'submodule'=>wordwrap($submodule->name,15,"\n",false),
            'received_applications'=>$total_received,
            'brought_forward'=> $total_brought_forward,
            'carried_forward'=>$carried_forward,
            'total' => $total, 
            'requested_for_additional_information' => $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report),
            'screened_applications' => $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id),
            'permit_reviewed' => $permit_reviewed,
            'permit_release' => $permit_release,
            'permit_rejection' => $permit_rejection,
            'query_responses'=>$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report)
            ); 
         }
      $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
     if(validateIsNumeric($req->type)){
        return $res;
     }

     return \response()->json($res);
   }
    public function printCertificateOrderSummaryReport(Request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $data = array();

      if(validateIsNumeric($sub_module_id) && $sub_module_id==71){
     $title = 'Order for Supply of Dangerous Drug Application(s) Summary Report';
      }

      if(validateIsNumeric($sub_module_id) && $sub_module_id==60){
      $title = 'Controlled Drugs Certificate of Approval Application(s) Summary Report';

      }

        $w = 20; 
        $w_1 = 40;
        $w_2 = 25;
        $w_3 = 50;
        $h = 25;
        PDF::SetTitle( $title );
        PDF::AddPage("L");
       
        $this->generateReportsHeader( $title);
         
        PDF::Ln();
     

      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();

      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
      $is_detailed_report='';
      $sub_total = 0;
      $cummulative_total = 0;
      $broughtforward_sub_total = 0;
      $received_sub_total = 0;
      $reviewed_sub_total = 0;
      $inspected_sub_total = 0;
      $queried_sub_total = 0;
      $responded_sub_total = 0;
      $reviewed_sub_total = 0;
      $released_sub_total = 0;
      $rejected_sub_total = 0;
      $carriedforward_sub_total = 0;


      $data = array();
       foreach ($sub_data as $submodule) {
     
            PDF::SetFont('','B',11);
            PDF::SetFillColor(249,249,249);
            PDF::cell(0,7,"Sub-module:".$submodule->name,1,1,'fill','B');

                         //section and submodule filter
                $filterdata="t1.sub_module_id = ".$submodule->id;
                $subfilterdata=array();

                $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                 $inspected_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                $total = $total_brought_forward+$total_received;
                $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                $carried_forward=$total-$permit_release-$permit_rejection;
                     
               $i = 1;
              //start loop
              PDF::MultiCell(10, 10, "No", 1,'','',0);
              //PDF::MultiCell($w_1, 10, "Permit Type", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Brought Forward", 1,'','',0);
              PDF::MultiCell($w, 10, "Received", 1,'','',0);
              PDF::MultiCell($w, 10, "Total", 1,'','',0);
              PDF::MultiCell($w, 10, "Screened", 1,'','',0);
              PDF::MultiCell($w_2, 10, "Queried", 1,'','',0);
              PDF::MultiCell($w_1, 10, "Query Response", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Reviewed", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Released", 1,'','',0);
              PDF::MultiCell($w, 10, "Permit Rejected", 1,'','',0);
              PDF::MultiCell(0, 10, "Carried Forward", 1,'','',1);

                   

              $rowcount = PDF::getNumLines($submodule->name,40);
              PDF::MultiCell(10, $rowcount *5, $i,1,'','',0);
              //PDF::MultiCell($w_1, $rowcount *5, $permittype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $total_brought_forward,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total_received,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $total,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5,$inspected_applications,1,'C','',0);
              PDF::MultiCell($w_2, $rowcount *5, $requested_for_additional_information,1,'C','',0);
              PDF::MultiCell($w_1, $rowcount *5, $query_responses,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_reviewed,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_release,1,'C','',0);
              PDF::MultiCell($w, $rowcount *5, $permit_rejection,1,'C','',0);
              PDF::MultiCell(0, $rowcount *5, $carried_forward,1,'C','',1);
         
             $sub_total = $sub_total+$total;
              $broughtforward_sub_total = $broughtforward_sub_total+$total_brought_forward;
              $received_sub_total = $received_sub_total+$total_received;
              $inspected_sub_total = $inspected_sub_total+$inspected_applications;
              $queried_sub_total = $queried_sub_total+$requested_for_additional_information;
              $responded_sub_total = $responded_sub_total+$query_responses;
              $reviewed_sub_total = $reviewed_sub_total+$permit_reviewed;
              $released_sub_total = $released_sub_total+$permit_release;
              $rejected_sub_total = $rejected_sub_total+$permit_rejection;
              $carriedforward_sub_total = $carriedforward_sub_total+$carried_forward;
             
             $i++;    
                }

             PDF::SetFont('','B',9);
             PDF::SetFillColor(249,249,249); // Grey
             PDF::cell(0,7,"Grand Total",1,1,'fill','B');
                //PDF::MultiCell(10, 10, "",0,'','',0);
              PDF::MultiCell(10, $rowcount *5, "Total",1,'','Fill',0);
              //PDF::MultiCell($w_1, $rowcount *5, $premisetype->name,1,'','',0);
              PDF::MultiCell($w_1, $rowcount *5, $broughtforward_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $received_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5,$inspected_applications,1,'C','Fill',0);
              PDF::MultiCell($w_2, $rowcount *5, $queried_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w_1, $rowcount *5, $responded_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $reviewed_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $reviewed_sub_total,1,'C','Fill',0);
              PDF::MultiCell($w, $rowcount *5, $rejected_sub_total,1,'C','Fill',0);
              PDF::MultiCell(0, $rowcount *5, $carriedforward_sub_total,1,'C','Fill',1);
                 // PDF::Ln();

            if(validateIsNumeric($sub_module_id) && $sub_module_id==71){
                   PDF::Output('Order for Supply of Dangerous Drug Application(s) Summary Report.pdf','I');
             
            }

           if(validateIsNumeric($sub_module_id) && $sub_module_id==60){

            PDF::Output('Controlled Drugs Certificate of Approval Application(s) Summary Report.pdf','I');
       }
   
  }
public function certificateOrderSummaryReportExport(request $req){
      $sub_module_id=$req->sub_module_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;

      if(validateIsNumeric($sub_module_id) && $sub_module_id==71){
     $heading = 'Order for Supply of Dangerous Drug Application(s) Summary Report';
      }

      if(validateIsNumeric($sub_module_id) && $sub_module_id==60){
      $heading = 'Controlled Drugs Certificate of Approval Application(s) Summary Report';

      }
      //get sub-module data
      $submodule_details=array();
      if(validateIsNumeric($sub_module_id)){
          $submodule_details=array('id'=>$sub_module_id);
      }
      $sub_data=DB::table('sub_modules')->where($submodule_details)->where('module_id',$module_id)->get();
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='';
      //date filter
      $datefilter=$this->DateFilter($req);
  
     //Looping
        foreach ($sub_data as $submodule) {
                         //section and submodule filter
                       $filterdata="t1.sub_module_id = ".$submodule->id;
                       $subfilterdata=array();
                        $total_received = $this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$submodule->has_payment_processing,$is_detailed_report);
                       $total_brought_forward = $this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
                       $total = $total_brought_forward+$total_received;

                      $requested_for_additional_information =$this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $inspected_applications = $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
                      $query_responses=$this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                       $permit_reviewed=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                       $permit_release=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      $permit_rejection=$this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
                      //$carried=$this->getCarriedForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date);
                      $carried_forward=$total-$permit_release-$permit_rejection;
                     

                        $data[] = [
                            'SubModule'=>$submodule->name,
                            'brought_forward'=>strval($total_brought_forward),
                            'received_applications'=>strval($total_received),
                            'total' => strval($total),
                            'screened_applications' =>strval($inspected_applications),
                             'queried' =>strval($requested_for_additional_information),
                            'query_responses'=>strval($query_responses),
                            'permit_reviewed' => strval($permit_reviewed),
                            'permit_released' => strval($permit_release),
                            'permit_rejected' => strval($permit_rejection),
                            'carried_forward'=>strval($carried_forward)
                           
                        ]; 
          }
       $header=$this->getArrayColumns($data);
       $org_info = DB::table('tra_organisation_information')->first();

       //product application details
        $ImportExportSpreadsheet = new Spreadsheet();
        $sheet = $ImportExportSpreadsheet->getActiveSheet();
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

    
    
        $sortedData=array();
        $i=0;
        $k=0;
        $temp=[];
        if(!empty($header)){
              $header=   $header; 
            }else{
              $header=array();
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
         foreach ($data as $udata){
            
                    for($v=0;$v<$total;$v++){
                         $temp1=$temp[$v];
                        $sortedData[$k][]=$udata[$temp1];
                      }
                     
                      $k++;  
                 }
            //first heading
            $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
             ->setValue(strtoupper($org_info->name)."\n".$org_info->postal_address."  , ".$org_info->physical_address."."."\nTel: ".$org_info->telephone_nos.",  Fax:".$org_info->fax.".\nWebsite: ".$org_info->website." Email: ".$org_info->email_address."."."\n".$heading."\t\t Exported on ".Carbon::now());
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
            $writer = new Xlsx($ImportExportSpreadsheet);
             ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();

           if(validateIsNumeric($sub_module_id) && $sub_module_id==71){
             $response =  array(
                 'name' => 'Order for Supply of Dangerous Drug Application(s) Summary Report.Xlsx', //no extention needed
                 'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
               );
            }

           if(validateIsNumeric($sub_module_id) && $sub_module_id==60){

            $response =  array(
                 'name' => 'Controlled Drugs Certificate of Approval Application(s) Summary Report.Xlsx', //no extention needed
                 'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
               );

              }

   
        return $response;
   }
   public function controlledDrugsDetailedReportPreview(Request $req){
      $sub_module_id=$req->sub_module_id;
      $process_class=$req->process_class;
      $permit_type=$req->permit_type;
      $module_id='12';
      $has_payment_processing ='';
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $start=$req->start;
      $limit=$req->limit;
  
      $data = array();
      $table=$this->getTableName($module_id);
      $table2='';
      $field='';
      $is_detailed_report='1';
      //date filter
      $datefilter=$this->DateFilter($req);
      $filterdata = '';
      if(validateIsNumeric($sub_module_id)){
          $filterdata="t1.sub_module_id = ".$sub_module_id;
      }
      $subfilterdata = array();
       if(validateIsNumeric($permit_type)){
          $subfilterdata=array('t1.importexport_permittype_id'=>$permit_type);
      }
        
         if(validateIsNumeric($process_class)){
         switch ($process_class) {
           case 1:
             $qry=$this->getBroughtForwardApplication($table,$table2,$field, $filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id);
             $heading='Brought Forward Applications Report';
             break;
           case 2:
          
             $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
             
             $heading='Received Applications Report';
             break;
          case 3:
             $qry= $this->getEvaluatedInspectedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id);
             $heading='Screened Applications Report';
             break;
          
          case 5:
             $qry=  $this->getQueriedApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Queried Applications Report';
             break;
          case 6:
             $qry= $this->funcGetQueryResponseApplications($table,$table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Responded Applications Report';
             break;
          case 10:
             $qry=$this->getPermitReviewApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
            //dd($qry);
             $heading='Permit Reviewed Applications Report';
             break;
           case 11:
              $qry=$this->getPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
              $heading='Permit Released Applications Report';
             break;
           case 12:
             $qry= $this->getPermitRejectionApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter,$is_detailed_report);
             $heading='Permit Rejected Applications Report';
             break; 
           // case 9:
           //   $qry= $this-> getCarriedForwardApplicationsQuery($table_name,$table2,$field,$filters,$subFilters,$from_date,$to_date);
           //   $heading='Import & Export Carried Forward Applications';
           //   break;
         }}else{
        
          $qry=$this->getTotalReceivedApplications($table,$table2,$field, $filterdata,$subfilterdata, $datefilter,$has_payment_processing,$is_detailed_report);
          $heading='Report On All Applications';
         }
         
           $qry->LeftJoin('sub_modules as t22','t1.sub_module_id','t22.id')
           ->LeftJoin('par_permit_category as t33','t1.permit_category_id','t33.id')
           ->LeftJoin('par_permit_reasons as t55','t1.permit_reason_id','t55.id')
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
        


          ->select('t1.proforma_invoice_no','t1.tracking_no','t1.reference_no','t1.application_code','t1.proforma_invoice_date','t22.name as type','t33.name as category','t33.name as typecategory','t55.name as permitreason','t6.name as port','t7.name as currency','t8.name as consigneeoption','t9.name as consignee','t9.postal_address as Cpostal_address','t9.physical_address as Cphysical_address','t9.telephone_no as Ctelephone_no','t9.mobile_no as Cmobile_no','t9.email_address as Cemail_address','t15.name as Ccountry','t16.name as Cregion','t10.name as senderreceiver','t10.physical_address as SRphysical_address','t10.postal_address as SRpostal_address','t10.telephone_no as SRtelephone_no','t10.mobile_no as SRmobile_no','t10.email as SRemail_address','t13.name as SRcountry','t14.name as SRregion','t11.name as premisename','t11.postal_address as premisePostalA','t11.physical_address as premisePhysicalA','t11.telephone as premiseTell','t11.mobile_no as premiseMobile','t11.expiry_date as premiseExpiryDate','t12.name as issueplace','t17.expiry_date as CertExpiryDate','t17.certificate_issue_date as CertIssueDate','t18.name as Trader','t18.postal_address as TraderPostalA','t18.physical_address as TraderPhysicalA','t18.telephone_no as TraderTell','t18.mobile_no as TraderMobile','t18.email as TraderEmail','t19.name as TraderCountry','t20.name as TraderRegion','t17.certificate_issue_date as IssueFrom','t17.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo','t17.permit_no as certificate_no','t17.appregistration_status_id as validity_status', 't17.appvalidity_status_id as registration_status')
            ->groupBy('t1.application_code');

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
             'heading' => $heading,
            'message' => 'All is well',
            'totalResults'=>$total
            );
        return $res;


    }
    public function getSectionParams(Request $req)
    {
        try {
            $filters = $req->filters;
            $table_name = $req->table_name . ' as t1';

            $qry = DB::table($table_name)
                ->join('modules as t2', 't1.id', '=', 't2.id')
                ->select('t1.*')
                ->whereNotIn('t1.id',[5,6,9,8,10,14]);
      
      
            $results = $qry->get();

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
        return \response()->json($res);
    }

    public function getbBusinessDetailsParams(Request $req)
    {
        try {
            $filters = $req->filters;
            $table_name = $req->table_name . ' as t1';

             $qry = DB::table($table_name)
                ->join('par_business_sections as t2', 't1.id', 't2.business_details_id')
                ->join('par_sections as t3', 't2.section_id', 't3.id')
                ->select('t1.*');

             if ($filters != '') {
             $filters = (array)json_decode($filters);
             $filters = array_filter($filters);
             $qry->where('t2.section_id',$filters['section_id']);
             }
                
            $results = $qry->get();

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
        return \response()->json($res);
    }
}