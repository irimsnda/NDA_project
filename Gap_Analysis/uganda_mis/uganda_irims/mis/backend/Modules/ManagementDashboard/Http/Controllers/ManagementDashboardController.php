<?php

namespace Modules\ManagementDashboard\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class ManagementDashboardController extends Controller
{
    public function getApplicationsCartesianDasboardReport(request $req){
  //filters
      $zone_id = $req->zone_id;
      $section_id=$req->section_id;
      $module_id=$req->module_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      //get data

       //zone data
      $where_zone='';
      if(validateIsNumeric($zone_id)){
          $where_zone='t1.zone_id = '.$zone_id;
      }

      //section data
     $where_sec = array();
        if(validateIsNumeric($section_id)){
            $where_sec=array("id"=>$section_id);
           }
      $sec_data=DB::table('par_sections')->where($where_sec)->get();
        

      
      $data = array();
      $table=$this->getTableName($module_id);

        foreach($sec_data as $sec){
        //filters for this loop
        if(validateIsNumeric($zone_id)){
            $filters="t1.section_id = ".$sec->id." AND t1.zone_id = ".$zone_id;
        }else{
            $filters="t1.section_id = ".$sec->id;
        }
        $approved_applications = $this->funcGetApprovedReportApplications($table,$filters,$from_date,$to_date);
        

        $data[] = array(
            'section_name'=>$sec->name, 
            'received_applications'=>$this->funcGetReceivedReportApplications($table,$filters,$from_date,$to_date),
            'rejected'=> $approved_applications['rejected'],
            'approved'=> $approved_applications['approved']
              );
          }
            $res = array(
                          'success' => true,
                          'results' => $data,
                          'message' => 'All is well'
                          
                      );
         return \response()->json($res);
        }


 public function getApplicationsGridDasboardReport(request $req){
  //filters
      $zone_id=$req->zone_id;
      $section_id=$req->section_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;
      $module_id = $req->module_id;

      //zone data
      $where_zone=array();
      if(validateIsNumeric($zone_id)){
          $where_zone=array('id'=>$zone_id);
      }
      $zones_data=DB::table('par_zones')->where($where_zone)->get();

      //section data
     $where_sec = array();
        if(validateIsNumeric($section_id)){
            $where_sec=array("id"=>$section_id);
           }
      $sec_data=DB::table('par_sections')->where($where_sec)->get();
        

      
      $data = array();
      $table=$this->getTableName($module_id);
//looping
     foreach($zones_data as $zone_data){
          foreach ($sec_data as $sec) {
                           $filters="t1.section_id = ".$sec->id." AND t1.zone_id = ".$zone_data->id;
                           
                           $approved_applications = $this->funcGetApprovedReportApplications($table,$filters,$from_date,$to_date);

                             $total_received = $this->funcGetReceivedReportApplications($table,$filters,$from_date,$to_date);

                            $data[] = array(
                                'zone_name'=>$zone_data->name,
                                'section_name'=>$sec->name,                              
                                'received_applications'=>$total_received,
                                'rejected'=> $approved_applications['rejected'],
                                'approved'=> $approved_applications['approved'],
                                  );
                    }
          
           }
          $res = array(
                    'success' => true,
                    'results' => $data,
                    'message' => 'All is well'
                        
                    );
      return \response()->json($res);
 }
   public function funcGetApprovedReportApplications($table_name,$filters,$from_date,$to_date){
        
        $qry=DB::table($table_name.' as t1')
             ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
             ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
             ->select(DB::raw('count(t1.id) as total,t4.id as ID'))
             ->groupBy('t4.id');

             if($from_date!=''){
              $qry->whereRAW("date_format(t2.approval_date, '%Y%-%m-%d') > '".formatDate($from_date)."' AND date_format(t2.approval_date, '%Y%-%m-%d') < '".formatDate($to_date)."'");
            }
           if($filters!=''){
              $qry->whereRAW($filters);
            }

             $all=$qry->get();
             
              $approved=0;
              $rejected=0;

              foreach($all as  $value) {
                $decision=$value->ID;
                $total=$value->total;
                if($decision==1){
                  $approved=$total;
                }else if($decision==2){
                  $rejected=$total;
                }
              }
            
            $data = array('approved'=>$approved,'rejected'=>$rejected);

            return $data;

            }
 public function ProductgetApplicationsDasboardReport(Request $req){
    //filters
      $zone_id=$req->zone_id;
      $section_id=$req->section_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;

    

      $module_data = DB::table('modules')->where('is_application',1)->get();
      $data = array();
      
      foreach ($module_data as $module) {
           //table
        $table=$this->getTableName($module->id);
             //filters for this loop
              //section data
            $where_sec = array();

              if(validateIsNumeric($section_id)){
                    if(validateIsNumeric($zone_id)){
                            $filters="t1.section_id = ".$section_id." AND t1.zone_id = ".$zone_id;
                        }else{
                            $filters="t1.section_id = ".$section_id;
                        }
                    $section_name = DB::table('par_sections')->where('id',$section_id)->first();

                    //$approved_applications = $this->funcGetApprovedReportApplications($table,$filters,$from_date,$to_date);
                    $data[] = array(
                        $section_name->name=>$this->funcGetReceivedReportApplications($table,$filters,$from_date,$to_date), 
                        'module_name' => $module->name
                        // 'received_applications'=>
                        // 'rejected'=> $approved_applications['rejected'],
                        // 'approved'=> $approved_applications['approved']
                          );
                      }else{
                        if(validateIsNumeric($zone_id)){
                          $total = $this->funcGetReceivedReportApplications($table,'t1.section_id = 2 AND t1.zone_id = '.$zone_id,$from_date,$to_date);
                        $data[] = array(
                          
                            'Medicine'=>$total,
                            'Medical Devices'=>$this->funcGetReceivedReportApplications($table,'t1.section_id =4 AND t1.zone_id = '.$zone_id,$from_date,$to_date), 
                            'Clinical Trial'=>$this->funcGetReceivedReportApplications($table,'t1.section_id = 5 AND t1.zone_id = '.$zone_id,$from_date,$to_date),
                            'module_name' => $module->name,
                            'total' => $total
                              );
                        }else{

                            $Medicine=$this->funcGetReceivedReportApplications($table,'t1.section_id = 2',$from_date,$to_date);
                            $MedicalDevices=$this->funcGetReceivedReportApplications($table,'t1.section_id = 4',$from_date,$to_date);
                            $ClinicalTrial=$this->funcGetReceivedReportApplications($table,'t1.section_id = 5',$from_date,$to_date);
                            $total = max([$Medicine,$MedicalDevices,$ClinicalTrial]);

                          $data[] = array(
                            'Medicines'=>$Medicine,
                            'Medical Devices'=>$MedicalDevices,
                            'Clinical Trial'=>$ClinicalTrial,
                            'module_name' => $module->name,
                            'total' => $total
                              );  
                        }
                      }
           }
                $res = array(
                              'success' => true,
                              'results' => $data,
                              'message' => 'All is well'
                              
                          );
      
      return \response()->json($res);
        
 }
 public function getSectionRevenueApplicationsDasboardReport(Request $req){
    //filters
      $zone_id=$req->zone_id;
      $section_id=$req->section_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;

     //section data
     $where_sec = array();
        if(validateIsNumeric($section_id)){
            $where_sec=array("id"=>$section_id);
           }
      $sec_data=DB::table('par_sections')->where($where_sec)->get();

      $data = array();
      
      foreach ($sec_data as $sec) {
        if(validateIsNumeric($zone_id)){
            $filters="section_id = ".$sec->id." AND zone_id = ".$zone_id;
        }else{
            $filters="section_id = ".$sec->id;
        }
        $product = $this->getRevenueReport($filters,$from_date,$to_date,1);
        $premise = $this->getRevenueReport($filters,$from_date,$to_date,2);
        $gmp = $this->getRevenueReport($filters,$from_date,$to_date,3);
        $importExport = $this->getRevenueReport($filters,$from_date,$to_date,4);
        $ClinicalTrial = $this->getRevenueReport($filters,$from_date,$to_date,7);
        $total = $product+$premise+$gmp+$ClinicalTrial+$importExport;

        $data[] = array(
            'section_name'=>$sec->name,
            'product'=>$product,
            'premise'=>$premise,
            'gmp'=>$gmp,
            'importexport'=>$importExport,
            'clinicaltrial'=>$ClinicalTrial,
            'total'=>$total
        );
    }
    $res = array(
              'success' => true,
              'results' => $data,
              'message' => 'All is well'
              
          );
      
      return \response()->json($res);
}
public function getZonalRevenueApplicationsDasboardReport(Request $req){
    //filters
      $zone_id=$req->zone_id;
      $section_id=$req->section_id;
      $from_date=$req->from_date;
      $to_date=$req->to_date;

     //section data
     $where_zone = array();
        if(validateIsNumeric($zone_id)){
            $where_zone=array("id"=>$zone_id);
           }
      $zone_data=DB::table('par_zones')->where($where_zone)->get();

      $data = array();
      
      foreach ($zone_data as $zones) {
        if(validateIsNumeric($section_id)){
            $filters="section_id = ".$section_id." AND zone_id = ".$zones->id;
        }else{
            $filters="zone_id = ".$zones->id;
        }
        $product = $this->getRevenueReport($filters,$from_date,$to_date,1);
        $premise = $this->getRevenueReport($filters,$from_date,$to_date,2);
        $gmp = $this->getRevenueReport($filters,$from_date,$to_date,3);
        $importExport = $this->getRevenueReport($filters,$from_date,$to_date,4);
        $ClinicalTrial = $this->getRevenueReport($filters,$from_date,$to_date,7);
        $total = $product+$premise+$gmp+$ClinicalTrial+$importExport;

        $data[] = array(
            'zone_name'=>$zones->name,
            'product'=>$product,
            'premise'=>$premise,
            'gmp'=>$gmp,
            'importexport'=>$importExport,
            'clinicaltrial'=>$ClinicalTrial,
            'total'=>$total
        );
    }
    $res = array(
              'success' => true,
              'results' => $data,
              'message' => 'All is well'
              
          );
      
      return \response()->json($res);
}
public function getRevenueReport($filters,$from_date,$to_date,$module_id){
    $total=0;
    $results = DB::table('tra_payments')
            ->select(DB::raw('sum(amount_paid*exchange_rate) as total'))
            ->whereRAW($filters)
            ->where('module_id',$module_id)
            ->whereRAW("trans_date between '".$from_date."' AND '".$to_date."'")
            ->get();

        foreach ($results as $res) {
            $total .= $res->total;
        }

        return $total;
}
 public function funcGetReceivedReportApplications($table_name,$filters,$from_date,$to_date){
          $count=DB::table($table_name." as t1");
  
          if($filters!=''){
            $count->whereRAW($filters);
          }

       //dates
          if($from_date!='' && $to_date != ''){
            $count->whereRAW("t1.submission_date between '".$from_date."' AND '".$to_date."'");
          }

          $results=$count->get();
        $data=$results->count();

   return $data;

 }
 public function getTableName($module){

          $qry=DB::table('modules')
                ->where('id',$module)->first();

          $table=$qry->table_name;

        return $table;
   }
}
