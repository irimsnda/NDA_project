<?php

namespace Modules\AuditTrail\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use Maatwebsite\Excel\Concerns\FromCollection;
use App\Exports\GridExport;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Excel;
class AuditTrailController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function getPortalAuditTrail(Request $Request)
    {
       $con=DB::Connection('TRAILDB_CONNECTION');
       $qry=$con->table('wb_portalaudit_trail as t1')
            ->select(DB::raw('t1.id,t1.table_name,t1.table_action,t1.ip_address,t1.created_at,t1.created_by,t1.record_id'));
           
        //filters
            $table_name=$Request->table_name;
            $table_data=$Request->table_data;
            $created_by=$Request->created_by;
            $filters=$Request->filter;
            $id=$Request->id;
            $start=$Request->start;
            $limit=$Request->limit;
           
            if(isset($table_name)){
                $qry->where('table_name',$table_name);
            }
            if(isset($created_by)){
                $qry->where('t1.created_by',$created_by);
            }
             if(isset($table_data)){
                $qry->where("(t1.current_tabledata LIKE '%".$table_data."%' OR t1.prev_tabledata LIKE '%".$table_data."%')");
            }
            

            $filters = (array)json_decode($filters);
            $whereClauses=array();
            if($filters != ''){
                  foreach ($filters as $filter) {
                     switch ($filter->property) {
                          case 'table_action' :
                              $whereClauses[] = "t1.table_action like '%" . ($filter->value) . "%'";
                              break;
                          case 'record_id' :
                              $whereClauses[] = "t1.record_id like '%" . ($filter->value) . "%'";
                              break;
                          case 'created_at' :
                               $whereClauses[] = "date_format(t1.created_at, '%Y%-%m-%d')='" . formatDate($filter->value) . "'";
                              break;
                    }
                }
            }
            if (!empty($whereClauses)) {
                     $filter_string = implode(' AND ', $whereClauses);
                     $qry->whereRAW($filter_string);
                }

           //get total entries
           $total=$qry->count();

           //limit results
           if(isset($start)&&isset($limit)){
              $res=$qry->skip($start)->take($limit)->get();
            }else{
                $res=$qry->get();
            }
           
            $finalArray=array();
            //loop records to add user
            foreach ($res as $content) {
                $user=$this->getUsers($content->created_by,'wb_trader_account');
                $content->created_by=$user;
                $finalArray[]=$content;
                
            }
            $res=array(
               'success'=>true,
               'results'=>$finalArray,
               'message'=>'All is well',
               'total'=>$total
            );


       return $res;
    }
     
    public function getUsers($id,$table){
        $qry=DB::table($table)
             ->where('id',$id);
        if($table=='users'){
             $qry->select(DB::raw('CONCAT(decrypt(first_name),decrypt(last_name)) as name'));
         }else{
            $qry->select('name');
         }
         $res=$qry->get()->first();
         if($qry->count()==0){
            return 'null';
         }else{
         return $res->name;
     }
    }

    public function getAllUsers($table,$id=null){
        $qry=DB::table($table);

        if($id!=null){
            $qry->where('id',$id);
         }

        if($table=='users'){
             $qry->select(DB::raw('id,CONCAT(decrypt(first_name),decrypt(last_name)) as name'));
         }else{
            $qry->select('id','name');
         }
         $res=$qry->get();
         if($qry->count()==0){
            return 'null';
         }else{
         return $res;
     }
    }

    public function getMisAuditTrail(Request $Request)
     {
       $con=DB::Connection('TRAILDB_CONNECTION');
       $qry=$con->table('wb_misaudit_trail as t1')
            ->select(DB::raw('t1.id,t1.table_name,t1.table_action,t1.ip_address,t1.created_at,t1.created_by,t1.record_id'));
           
        //filters
            $table_name=$Request->table_name;
            $table_data=$Request->table_data;
            $created_by=$Request->created_by;
            $filters=$Request->filter;
            $start=$Request->start;
            $limit=$Request->limit;
           
            if(isset($table_name)){
                $qry->where('table_name',$table_name);
            }
            if(isset($created_by)){
               $qry->where('t1.created_by',$created_by);
            }
             if(isset($table_data)){
                $qry->whereRAW("(t1.current_tabledata LIKE '%".$table_data."%' OR t1.prev_tabledata LIKE '%".$table_data."%')");
            }
            

            $filters = (array)json_decode($filters);
            $whereClauses=array();
            if($filters != ''){
                  foreach ($filters as $filter) {
                     switch ($filter->property) {
                          case 'table_action' :
                              $whereClauses[] = "t1.table_action like '%" . ($filter->value) . "%'";
                              break;
                          case 'record_id' :
                              $whereClauses[] = "t1.record_id like '%" . ($filter->value) . "%'";
                              break;
                          case 'created_at' :
                               $whereClauses[] = "date_format(t1.created_at, '%Y%-%m-%d')='" . formatDate($filter->value) . "'";
                              break;
                    }
                }
            }
            if (!empty($whereClauses)) {
                     $filter_string = implode(' AND ', $whereClauses);
                     $qry->whereRAW($filter_string);
                }
          //get total entries
            $total=$qry->count();

           if(isset($start)&&isset($limit)){
              $res=$qry->skip($start)->take($limit)->get();
            }else{
                $res=$qry->get();
            }
           
           
            $finalArray=array();
            //loop records to add user
            foreach ($res as $content) {
                $user=$this->getUsers($content->created_by,'users');
                $content->created_by=$user;
                $finalArray[]=$content;
                
            }
           
  
            $res=array(
               'success'=>true,
               'results'=>$finalArray,
               'message'=>'All is well',
               'total'=>$total
            );


       return $res;
    }

   function getPortalAuditTableData(Request $Request){
    $id=$Request->id;
    $type=$Request->type;
    $con=DB::Connection('TRAILDB_CONNECTION');
       $qry=$con->table('wb_portalaudit_trail')
                ->where('id',$id);
    if($type == 'updated'){
        $qry->select('current_tabledata');
        $results=$qry->get()->first();
        $data=$results->current_tabledata;
    }else{
        $qry->select('prev_tabledata');
        $results=$qry->get()->first();
        $data=$results->prev_tabledata;
    }

       
     $data=(array)unserialize($data);

     $flaten_data=$this->mergeImpureArray($data);
   
     $res=array(
               'success'=>true,
               'results'=>$flaten_data,
               'message'=>'All is well'
            );
     return $res;
   }

  function getMISAuditTableData(Request $Request){
        $id=$Request->id;
        $type=$Request->type;
        $con=DB::Connection('TRAILDB_CONNECTION');
           $qry=$con->table('wb_misaudit_trail')
                    ->where('id',$id);
        if($type=='updated'){
            $qry->select('current_tabledata');
            $results=$qry->first();
            $data=$results->current_tabledata;

        }else{
            $qry->select('prev_tabledata');
            $results=$qry->first();
            $data=$results->prev_tabledata;
        }
           
         $data=(array)unserialize($data);
         $flaten_data=$this->mergeImpureArray($data);
         $res=array(
                   'success'=>true,
                   'results'=>$flaten_data,
                   'message'=>'All is well'
                );
         return $res;
       }

function mergeImpureArray($array){
    $finalArray=array();
    $temp='';
    foreach ($array as $key => $value) {

        if(is_array($value)){
          $finalArray=array_merge($finalArray,$value);
        }else{
            $finalArray[$key]=$value;
        }

    }
    if(array_key_exists(0, $finalArray)){
            return $finalArray[0];
        }
    
    return $finalArray;
    
}
 function revertAuditRecord(Request $req){
    $id=$req->id;
    $type=$req->type;
    $Audit_table='';
    if($type=='mis'){
        $Audit_table='wb_misaudit_trail';
    }else{
        $Audit_table='wb_portalaudit_trail';
    }
     $con=DB::Connection('TRAILDB_CONNECTION');
     $qry=$con->table($Audit_table)
              ->where('id',$id);
       $res=$qry->get()->first();
       $multi_array_current_tabledata=unserialize($res->current_tabledata);
       $multi_array_prev_tabledata=unserialize($res->prev_tabledata);
       $record_id=$res->record_id;
       $table_name=$res->table_name;

    if($multi_array_prev_tabledata!=false){
      // $current_tabledata=$this->mergeImpureArray($multi_array_current_tabledata);
       $prev_tabledata=$this->mergeImpureArray($multi_array_prev_tabledata);

         $updateTbl=DB::table($table_name)
                          ->where('id', $record_id)
                          ->update($prev_tabledata);
        
         $updateprev=$con->table($Audit_table)
                          ->insert([
                               'current_tabledata'=>$res->prev_tabledata,
                               'record_id'=>$res->record_id,
                               'table_name'=>$res->table_name,
                               'table_action'=>'update',
                               'created_at'=>date('Y-m-d H:i:s')
                           ]);

    if($updateTbl&&$updateprev){
        $res=array(
           'results'=>'Update successfull',
           'success'=>true,
           'message'=>'All is well'
        );
        return $res;
    }else{
        $res=array(
           'results'=>'Some updates failed try Again',
           'success'=>true,
           'message'=>'All is well'
        );
        return $res;
    }
    }else{
        $res=array(
           'results'=>'No previous records Found',
           'success'=>true,
           'message'=>'All is well'
        );
        return $res;
    }   

    }
   

   public function getTableslist(Request $Request){
        $in_db=$Request->in_db;
    
        if($in_db == 'portal'){
          $tables = DB::connection('portal_db')->getDoctrineSchemaManager()->listTableNames();
        }else{
          $tables = DB::connection()->getDoctrineSchemaManager()->listTableNames();
        }
        try {
    
          
            foreach ($tables as $table) {
              
                    $data[] = array('table_name'=>$table);
                

            }
            $res = array(
                'success' => true,
                'results' => $data,
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

function dataUnserialization($data,$keyPrefix){
     $un_data=unserialize($data);
     $flaten_data=$this->mergeImpureArray($un_data);
     $withKeys=array();
     foreach ($flaten_data as $key => $value) {
          $withKeys[$keyPrefix.'_'.$key]=$value;
         }
        
      return $withKeys;
     
     }

function getAllAuditTrans(Request $Request){
    $con=DB::Connection('TRAILDB_CONNECTION');
    //get type
    $record_id=$Request->record_id;
    $table_name=$Request->table_name;
    $type=$Request->type;

    $Audit_table='';
    $user_table='';
    if($type=='mis'){
        $Audit_table='wb_misaudit_trail';
        $user_table='users';
    }else{
        $Audit_table='wb_portalaudit_trail';
        $user_table='wb_trader_account';
    }

    $qry=$con->table($Audit_table)
             ->where('record_id',$record_id)
             ->where('table_name',$table_name);
    $res=$qry->get();
    $final_data=array();
    foreach ($res as $Entry) {
         $data= array(
                'table_action'=>$Entry->table_action,
                'action_by'=>$this->getUsers($Entry->created_by,$user_table),
                'record_id'=>$Entry->record_id,
                'created_at'=>$Entry->created_at
           );

         if($Entry->current_tabledata!=''){
               $curent_records=$this->dataUnserialization($Entry->current_tabledata,'current');
          }else{
            $curent_records=array();
          }

          if($Entry->prev_tabledata!=null){
               $prev_records=$this->dataUnserialization($Entry->prev_tabledata,'prev');
          }else{
               $prev_records=array();
          }
          $final_data[]=array_merge($data,$prev_records,$curent_records);
          rsort($final_data);
    }
    return  $final_data;
}

public function getArrayColumns($array){
  $temp=array();
  if(!empty($array[0])){
  foreach ($array[0] as $key=>$udata){
      $temp[]=$key;
      }
    }
  return $temp;
   
   }

public function exportAudit(request $request) {
     
      $type = $request->type;
      if($type=='mis'){
        $function='getMisAuditTrail';
      }else{
        $function='getPortalAuditTrail';
      }
      //send request to function
      $records=$this->$function($request);
      $flaten_data=$records['results'];
       
       $header=$this->getArrayColumns($flaten_data); 
      $k=0;
      $sortedData=array();
      $total=count($header);
      //convert to allowed format
      foreach ($records['results'] as $udata)
            {
                       for($v=0;$v<$total;$v++){
                       $temp1=$header[$v];
                       $sortedData[$k][]=$udata->$temp1;

                }
               
                $k++;  
           }
     
     $heading="Audit Trail Records";
      $export = new GridExport($sortedData,$header,$heading);

      $file=Excel::raw($export, \Maatwebsite\Excel\Excel::XLSX);
     
$response =  array(
   'success'=>true,
   'name' => "AuditTrail.xlsx", //no extention needed
   'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($file) //mime type of used format
);
return response()->json($response);
  
        }

public function getloginLogs(Request $req){

      $directorate_id = $req->directorate_id;
      $department_id = $req->department_id;
      $day = $req->day;
      $user_id = $req->user_id;
      $filters  = $req->filters;

      $qry = DB::table('tra_login_logs as t1')
             ->join('users as t2','t1.account_id','t2.id')
             ->leftJoin('par_departments as t3','t2.department_id','t3.id')
             ->leftJoin('par_directorates as t4','t2.directorate_id','t4.id')
             ->select('t1.ip_address','t1.user_agent','t1.time as loging_time','t2.username',DB::raw('CONCAT(decrypt(t2.first_name),decrypt(t2.last_name)) as name, decrypt(t2.email) as email, decrypt(t2.mobile) as mobile_no, decrypt(t2.phone) as phone_no'));

      //filters
      if(validateIsNumeric($directorate_id)){
        $qry->where('t2.directorate_id',$directorate_id);
      }
      if(validateIsNumeric($department_id)){
        $qry->where('t2.directorate_id',$department_id);
      }
      if(validateIsNumeric($user_id)){
        $qry->where('t2.id',$user_id);
      }
      if(isset($day)){
        $qry->whereRAW("date_format(t1.time, '%Y%-%m-%d')='" . formatDate($day) . "'");
      }



     $filter = $req->input('filter');
     $whereClauses = array();
     $filter_string = '';
      if (isset($filter)) {
          $filters = json_decode($filter);
          if ($filters != NULL) {
              foreach ($filters as $filter) {
                  switch ($filter->property) {
                      case 'email' :
                          $whereClauses[] = "decrypt(t2.email) like '%" . ($filter->value) . "%'";
                          break;
                       case 'username' :
                          $whereClauses[] = "decrypt(t2.username) like '%" . ($filter->value) . "%'";
                          break;
                       case 'loging_time' :
                          $whereClauses[] = "DATE_FORMAT(t1.time, '%H:%i:%s') like '%" . ($filter->value) . "%'";
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

    $results = $qry->get();

    return response()->json($results);
  }

public function getloginAttemptsLogs(Request $req){

      $directorate_id = $req->directorate_id;
      $department_id = $req->department_id;
      $day = $req->day;
      $user_id = $req->user_id;
      $filters  = $req->filters;

      $qry = DB::table('tra_failed_login_attempts as t1')
             ->join('users as t2','t1.account_id','t2.id')
             ->leftJoin('par_departments as t3','t2.department_id','t3.id')
             ->leftJoin('par_directorates as t4','t2.directorate_id','t4.id')
             ->select('t1.ip_address','t1.user_agent','t1.time as last_Attempt_time','t2.username',DB::raw('CONCAT(decrypt(t2.first_name),decrypt(t2.last_name)) as name, decrypt(t2.email) as email, decrypt(t2.mobile) as mobile_no, decrypt(t2.phone) as phone_no'));

      //filters
      if(validateIsNumeric($directorate_id)){
        $qry->where('t2.directorate_id',$directorate_id);
      }
      if(validateIsNumeric($department_id)){
        $qry->where('t2.directorate_id',$department_id);
      }
      if(validateIsNumeric($user_id)){
        $qry->where('t2.id',$user_id);
      }
      if(isset($day)){
        $qry->whereRAW("date_format(t1.time, '%Y%-%m-%d')='" . formatDate($day) . "'");
      }



     $filter = $req->input('filter');
     $whereClauses = array();
     $filter_string = '';
      if (isset($filter)) {
          $filters = json_decode($filter);
          if ($filters != NULL) {
              foreach ($filters as $filter) {
                  switch ($filter->property) {
                      case 'email' :
                          $whereClauses[] = "decrypt(t2.email) like '%" . ($filter->value) . "%'";
                          break;
                       case 'username' :
                          $whereClauses[] = "decrypt(t2.username) like '%" . ($filter->value) . "%'";
                          break;
                       case 'loging_time' :
                          $whereClauses[] = "DATE_FORMAT(t1.time, '%H:%i:%s') like '%" . ($filter->value) . "%'";
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

    $results = $qry->get();

    return response()->json($results);
  }

}
