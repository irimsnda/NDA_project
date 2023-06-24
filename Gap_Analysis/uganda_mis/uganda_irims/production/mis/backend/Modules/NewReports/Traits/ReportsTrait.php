<?php


namespace Modules\NewReports\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
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

trait ReportsTrait
{
    //datefilter column
    private $date_filter_column = 'tp.trans_date';

    public function DateFilter(request $req){
    $from_date=$req->from_date;
    $to_date=$req->to_date;
    $where_raw=array();

    if($from_date != '' && $to_date != ''){
       $where_raw[]="date_format(date_filter, '%Y%-%m-%d') BETWEEN '".formatDate($from_date)."' AND '".formatDate($to_date)."'";
      }
    
    $date_filter='';
    if (!empty($where_raw)) {
                     $date_filter = implode(' AND ', $where_raw);
                    }
     return $date_filter;

    }


  
   public function getTableName($module){

          $qry=DB::table('modules')
                ->where('id',$module)->first();

          $table=$qry->table_name;

          return $table;
     }

 
   public function getTotalReceivedApplications($table, $table2,$field,$filterdata,$subfilterdata,$datefilter,$has_payment_processing = null, $is_detailed_report ){
          if($table2 == ''){
            $qry=DB::table($table." as t1")
                  ->leftJoin('tra_payments as tp','t1.application_code','tp.application_code')
                  ->orderBy('tp.id', 'DESC')
                  ->where($subfilterdata);
            
          }else{
            $qry=DB::table($table." as t1")
                  ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
                  ->leftJoin('tra_payments as tp','t1.application_code','tp.application_code')
                  ->orderBy('tp.id', 'DESC')
                  ->where($subfilterdata);
          }
          if($table == 'tra_promotion_adverts_applications'){
            $qry->leftJoin('tra_promotion_prod_particulars as tp3','t1.id','tp3.application_id');

          }
          //filter by submodule and section getBroughtForwardApplication
           if($filterdata!=''){
              $qry->whereRAW($filterdata);
            }
           //dd($subfilterdata);
          
          //chek if has payment 
          if($has_payment_processing != 1){
            //filter by date
           if($datefilter!=''){
              $datefilter = str_replace('date_filter','t1.date_added',$datefilter);
              $qry->whereRAW($datefilter);
             }

          }
          else{

            //filter by date
           if($datefilter!=''){
              $datefilter = str_replace('date_filter',$this->date_filter_column,$datefilter);
              $qry->whereRAW($datefilter);
             }
        }
         // dd($qry->toSql());
        if($is_detailed_report != 1){
        $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
             $data=$qry->first();
             
             return $data->counter;
          }
          else{
            $qry->groupBy('t1.application_code'); 

           //dd($datefilter); 
             return $qry;
          }

      }
    public function getBroughtForwardApplication($table, $table2,$field,$filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date,$module_id){
        if($table2 == ''){
         if($module_id==4 || $module_id==4){
            $qry=DB::table($table.' as t1')
                 ->leftJoin('tra_payments as tp','t1.application_code','tp.application_code')
                 ->leftJoin('tra_permitsrelease_recommendation as t5','t1.application_code','t5.application_code')
                 ->whereRaw("DATE_FORMAT($this->date_filter_column, '%Y-%m-%d') < '".formatDate($from_date)."' and (DATE_FORMAT(t5.approval_date, '%Y-%m-%d') > '".formatDate($from_date)."' or t5.id is null)");
         }else{
             $qry=DB::table($table.' as t1')
                 ->leftJoin('tra_payments as tp','t1.application_code','tp.application_code')
                 ->leftJoin('tra_approval_recommendations as t5','t1.application_code','t5.application_code')
                 ->whereRaw("DATE_FORMAT($this->date_filter_column, '%Y-%m-%d') < '".formatDate($from_date)."' and (DATE_FORMAT(t5.approval_date, '%Y-%m-%d') > '".formatDate($from_date)."' or t5.id is null)");
             }
               
              $qry->where($subfilterdata);
            
          }else{
            $qry=DB::table($table.' as t1')
                 ->join($table2.' as t3','t1.'.$field,'t3.id')
                 ->leftJoin('tra_payments as tp','t1.application_code','tp.application_code')
                 ->leftJoin('tra_approval_recommendations as t5','t1.application_code','t5.application_code')
                 ->whereRaw("DATE_FORMAT($this->date_filter_column, '%Y-%m-%d') < '".formatDate($from_date)."' and (DATE_FORMAT(t5.approval_date, '%Y-%m-%d') > '".formatDate($from_date)."' or t5.id is null)");
               
              $qry->where($subfilterdata);
          }

          if($table == 'tra_promotion_adverts_applications'){
            $qry->leftJoin('tra_promotion_prod_particulars as tp3','t1.id','tp3.application_id');

          }
            
         
            //filter by submodule and section
           if($filterdata!=''){
              $qry->whereRAW($filterdata);
            }
            //dd($qry->toSql());

          if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
          }
            
         }
         
          public function getCarriedForwardApplication($table, $table2,$field,$filterdata,$subfilterdata,$is_detailed_report,$from_date,$to_date){

            $qry=DB::table($table.' as t1')
                 ->join($table2.' as t3','t1.'.$field,'t3.id')
                 ->leftJoin('tra_payments as tp','t1.application_code','tp.application_code')
                 ->leftJoin('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
                 ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
                  ->whereRaw("DATE_FORMAT($this->date_filter_column, '%Y-%m-%d') <='".formatDate($to_date)."' ")
                 ->whereNull('t2.id');
               
               
              $qry->where($subfilterdata);

                
            //filter by submodule and section
           if($filterdata!=''){
              $qry->whereRAW($filterdata);
            }
        
          if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
             }
         }
public function getEvaluatedInspectedApplications($table, $table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report,$module_id){
     if($table2 == ''){

             $qry=DB::table($table.' as t1')
           ->join('tra_applications_comments as t2','t1.application_code','t2.application_code')
           ->join('par_comment_types as t4','t2.comment_type_id','t4.id')
           ->where($subfilterdata);
            
          }else{
           $qry=DB::table($table.' as t1')
           ->join('tra_applications_comments as t2','t1.application_code','t2.application_code')
           ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
           ->join('par_comment_types as t4','t2.comment_type_id','t4.id')
           ->where($subfilterdata);
          }

          if(is_numeric($module_id) && $module_id==1 || $module_id===1){
              $qry->where('t2.comment_type_id',2);
          }

           if(is_numeric($module_id) && $module_id==2 || $module_id===2){
              $qry->where('t2.comment_type_id',1);
          }

            if(is_numeric($module_id) && $module_id==4 || $module_id===4){
              $qry->where('t2.comment_type_id',2);
          }
          if($table == 'tra_promotion_adverts_applications'){
            $qry->leftJoin('tra_promotion_prod_particulars as tp3','t1.id','tp3.application_id');

          }
            
             //filter by submodule and section
          if($filterdata!=''){
              $qry->whereRAW($filterdata);
          }
            //filter by date
          if($datefilter!=''){
             $datefilter = str_replace('date_filter','t2.assessment_end_date',$datefilter);
             $qry->whereRAW($datefilter);
          }
            
        if($is_detailed_report != 1){
        $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
             $data=$qry->first();
             
             return $data->counter;
          }
          else{
            $qry->groupBy('t1.application_code'); 

           //dd($datefilter); 
             return $qry;
          }
          }
public function getScreenedApplications($table, $table2,$field,$filterdata, $subfilterdata,$datefilter,$is_detailed_report){
   
         if($table2 == ''){
             $qry=DB::table($table.' as t1')
             ->join('tra_sample_information as t2','t1.id','t2.product_id');
             //->where($subfilterdata);
               //filter by date
           if($datefilter!=''){
              $datefilter = str_replace('date_filter','t2.submission_date',$datefilter);
              $qry->whereRAW($datefilter);
            }
             }else{
                 $qry=DB::table($table.' as t1')
                 ->join('tra_sample_information as t2','t1.id','t2.product_id')
                 ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
                 ->where($subfilterdata);

           //filter by submodule and section
           if($filterdata!=''){
              $qry->whereRAW($filterdata);
            }
          
              
               //filter by date
           if($datefilter!=''){
              $datefilter = str_replace('date_filter','t2.submission_date',$datefilter);
              $qry->whereRAW($datefilter);
            }
          }
          if($table == 'tra_promotion_adverts_applications'){
            $qry->leftJoin('tra_promotion_prod_particulars as tp3','t1.id','tp3.application_id');

          }
        if($is_detailed_report != 1){
           //dd($qry->toSql());
        $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
             $data=$qry->first();
             
             return $data->counter;
          }
          else{
            $qry->groupBy('t1.application_code'); 


           //dd($datefilter); 
             return $qry;
          }
          }
  
     public function funcGetQueryResponseApplications($table, $table2,$field,$filterdata, $subfilterdata,$datefilter,$is_detailed_report){
   
         if($table2 == ''){
             $qry=DB::table($table.' as t1')
             ->join('tra_application_query_reftracker as t2','t1.application_code','t2.application_code')
             ->where($subfilterdata);
               //filter by date
           if($datefilter!=''){
              $datefilter = str_replace('date_filter','t2.response_received_on',$datefilter);
              $qry->whereRAW($datefilter);
            }
             }else{
                 $qry=DB::table($table.' as t1')
                 ->join('tra_application_query_reftracker as t2','t1.application_code','t2.application_code')
                 ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
                 ->where($subfilterdata);

           //filter by submodule and section
           if($filterdata!=''){
              $qry->whereRAW($filterdata);
            }

               //filter by date
           if($datefilter!=''){
              $datefilter = str_replace('date_filter','t2.response_received_on',$datefilter);
              $qry->whereRAW($datefilter);
            }
          }
            if($table == 'tra_promotion_adverts_applications'){
              $qry->leftJoin('tra_promotion_prod_particulars as tp3','t1.id','tp3.application_id');
  
            }
            if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
            }
            
          }

    public function getQueriedApplications($table, $table2,$field,$filterdata,$subfilterdata, $datefilter,$is_detailed_report){


        if($table2 == ''){
          $qry=DB::table($table.' as t1')
                 ->join('tra_application_query_reftracker as t2','t1.application_code','t2.application_code')
                 ->where($subfilterdata);
           }else{
            $qry=DB::table($table.' as t1')
                   ->join('tra_application_query_reftracker as t2','t1.application_code','t2.application_code')
                  ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
                   ->where($subfilterdata);
           }
          //filter by submodule and section
           if($filterdata!=''){
              $qry->whereRAW($filterdata);
            }

             //filter by date
           if($datefilter!=''){
              $datefilter = str_replace('date_filter','t2.queried_on',$datefilter);
              $qry->whereRAW($datefilter);
           }
           if($table == 'tra_promotion_adverts_applications'){
            $qry->leftJoin('tra_promotion_prod_particulars as tp3','t1.id','tp3.application_id');

          }
            if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
          }

            
    }
      

   public function getApprovedApplications($table, $table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report){
         if($table2 == ''){
            $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
          }else{
           $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
          }
    
        //filter by submodule and section
       if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }
         if($table == 'tra_promotion_adverts_applications'){
          $qry->leftJoin('tra_promotion_prod_particulars as tp3','t1.id','tp3.application_id');

        }
         //filter by date
        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
        if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
          }

        } 
        public function getRejectedApplications($table, $table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report){
            if($table2 == ''){
             $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',3);
          }else{
            $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',3);
          }
       
          if($table == 'tra_promotion_adverts_applications'){
            $qry->leftJoin('tra_promotion_prod_particulars as tp3','t1.id','tp3.application_id');

          }
        //filter by submodule and section
       if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }
         //filter by date
        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
         if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
          }
        } 
        public function getPermitReviewApplications($table, $table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report){
        $qry=DB::table($table.' as t1')
           ->join('tra_managerpermits_review as t2','t1.application_code','t2.application_code')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);

        //filter by submodule and section
       if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }
         //filter by date
        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
         if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
          }
        } 

         public function getPermitReleaseApplications($table, $table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report){
        $qry=DB::table($table.' as t1')
           ->join('tra_permitsrelease_recommendation as t2','t1.application_code','t2.application_code')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);

        //filter by submodule and section
       if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }
         //filter by date
        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.created_on',$datefilter);
          $qry->whereRAW($datefilter);
           }
         if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
          }
        } 
        public function getPermitRejectionApplications($table, $table2,$field,$filterdata,$subfilterdata,$datefilter,$is_detailed_report){
        $qry=DB::table($table.' as t1')
           ->join('tra_permitsrelease_recommendation as t2','t1.application_code','t2.application_code')
           ->where($subfilterdata)
           ->where('t2.decision_id',3);

        //filter by submodule and section
       if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }
         //filter by date
        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.created_on',$datefilter);
          $qry->whereRAW($datefilter);
           }
         if($is_detailed_report != 1){
               $qry->select(DB::raw('count(DISTINCT(t1.application_code)) as counter'));
               $data=$qry->first();
             
              return $data->counter;
          }
          else{
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
          }
        } 



function toAlpha($num){
    return chr(substr("000".($num+65),-3));
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
public function getArrayColumns($array){
  $temp=array();
  if(!empty($array[1])){
      foreach ($array[1] as $key=>$udata){
      //
        //  $temp[]=strtoupper(str_replace("_"," ",strtoupper($key)));
      $temp[] =$key;
          }
    }
  else if(!empty($array[0])){
    foreach ($array[0] as $key=>$udata){
        $temp[]=$key;
        }
    }
  
  return $temp;
   
   }

    public function exportExcel($data,$filename,$heading){
        $org_info = DB::table('tra_organisation_information')->first();
        $header=$this->getArrayColumns($data);
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
            $writer = new Xlsx($RegisterSpreadsheet);
             ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();


    
        $response =  array(
           'status'=>'sucesss',
           'name' => $filename, //no extention needed
           'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
        );

   
        return $response;
   }

    


}