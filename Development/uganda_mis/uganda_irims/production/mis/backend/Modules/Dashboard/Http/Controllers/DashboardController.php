<?php

namespace Modules\Dashboard\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use Modules\Dashboard\Entities\SystemGuideline;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
   protected $user_id;

    public function __construct(Request $req)
    {
        $is_mobile = $req->input('is_mobile');
        if (is_numeric($is_mobile) && $is_mobile > 0) {
            $this->user_id = $req->input('user_id');
        } else {
            $this->middleware(function ($request, $next) {
                if (!\Auth::check()) {
                    $res = array(
                        'success' => false,
                        'message' => '<p>NO SESSION, SERVICE NOT ALLOWED!!<br>PLEASE RELOAD THE SYSTEM!!</p>'
                    );
                    echo json_encode($res);
                    exit();
                }
                $this->user_id = \Auth::user()->id;
                return $next($request);
            });
        }
    }

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('dashboard::index');
    }
    public function checkFastTrackApplications(){
        try {
            $has_fasttrack_applications = 0;
            $user_id = $this->user_id;
            $qry = DB::table('tra_submissions as t1')
                ->select("t1.id")
                ->where('fasttrack_option_id',1)
                ->where('isDone', 0);
           
                    $assigned_groups = getUserGroups($user_id);
                    $is_super = belongsToSuperGroup($assigned_groups);
                    $assigned_stages = getAssignedProcessStages($user_id, 1);
                    if ($is_super) {
                        $qry->whereRaw('1=1');
                        $qry->limit(100);
                    } else {
                            
                            //`$qry->where('t4.usr_to','=',$user_id);
                            $qry->where(function ($query) use ($user_id, $assigned_stages) {
                                
                            $assigned_stages = $this->convertArrayToString($assigned_stages);
                            $assigned_stages =rtrim($assigned_stages, ",");
                                $query->where('usr_to', $user_id)
                                        ->orWhereRaw("(t1.current_stage in ($assigned_stages) and t4.needs_responsible_user = 2)");
                            });
                        }
            $qry = $qry->get();
            if($qry->count()){
                $has_fasttrack_applications = 1;
            }
            $res = array(
                'success' => true,
                'has_fasttrack_applications'=>$has_fasttrack_applications,
                'message'=>''
            );

        } 
        catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return $res;
    }
    public function getAssignedFasttrackApplications(){
        try{
            $user_id = $this->user_id;
            $qry = DB::table('tra_submissions as t1')
            ->join('wf_processes as t2', 't1.process_id', '=', 't2.id')
            ->leftJoin('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
            ->leftJoin('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
            ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
            ->leftJoin('par_submission_urgencies as t6', 't1.urgency', '=', 't6.id')
            ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
            ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
            ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
            ->leftJoin('par_zones as t10', 't1.zone_id', '=', 't10.id')
            ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id,t1.zone_id, t1.application_id as active_application_id, t2.name as process_name,t10.name as zone_name,t1.application_status_id,
                t3.name as prev_stage, t4.name as workflow_stage,t4.is_general,t5.name as application_status,t6.name as urgencyName,t6.name as urgency_name,if(fasttrack_option_id =1,'Fast Track Application', t6.name) as urgency_name,
                    CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user,
                t9.name as applicant_name, '' as sample_analysis_status"))
            ->where('t4.stage_status','<>',3)
            ->where('fasttrack_option_id',1)
            ->where('isDone', 0);
    
                $assigned_groups = getUserGroups($user_id);
                $is_super = belongsToSuperGroup($assigned_groups);
                  $assigned_stages = getAssignedProcessStages($user_id, 0);
                if ($is_super) {
                    $qry->whereRaw('1=1');
                    $qry->limit(100);
               } else {
                    
                    //`$qry->where('t4.usr_to','=',$user_id);
                    $qry->where(function ($query) use ($user_id, $assigned_stages) {
                        
                       $assigned_stages = $this->convertArrayToString($assigned_stages);
                       $assigned_stages =rtrim($assigned_stages, ",");
                        $query->where('usr_to', $user_id)
                                ->orWhereRaw("(t1.current_stage in ($assigned_stages) and t4.needs_responsible_user = 2)");
                    });
                }
          
            
                $total = $qry->count();
            $results=$qry->get();
        
      
        $res = array(
            'success' => true,
            'results' => $results,
            'message' => 'All is well',
            'total' => $total
        );
        } 
        catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return $res;

    }
    
    public function saveDashCommonData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where)) {
                    unset($table_data['created_on']);
                    unset($table_data['created_by']);
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id);
                }
            } else {
                $res = insertRecord($table_name, $table_data, $user_id);
            }
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

    public function getInTrayItems(Request $request)
    {
          $res  =$this->getUserIntrayDashboard($request,true);
          return \response()->json($res);
    }
public function getApplicationSummaryOverDueTrayItems(Request $request){

        $user_id = $this->user_id;
        //$limsusr_id = getLimsUserId($user_id);
        
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $zone_id = $request->input('zone_id');
        $application_status_id = $request->input('application_status_id');
        $is_management_dashboard = $request->input('is_management_dashboard');
        $start = $request->input('start');
        $limit = $request->input('limit');

        $whereClauses = array();
        $filter = $request->input('filter');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'tracking_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' OR t1.reference_no like '%" . ($filter->value) . "%' )";
                            break;
                        case 'reference_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' OR t1.reference_no like '%" . ($filter->value) . "%' )";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "(t9.name like '%" . ($filter->value) . "%' or t12.name like '%" . ($filter->value) . "%' )";
                            break;
                             case 'premises_name' :
                            $whereClauses[] = "( t12.name like '%" . ($filter->value) . "%' )";
                            break;
                            
                            
                        
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            //DB::enableQueryLog();TOTAL_WEEKDAYS(now(), date_received) as time_span,
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->leftJoin('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
                ->leftJoin('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('par_submission_urgencies as t6', 't1.urgency', '=', 't6.id')
                ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
                ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->leftJoin('par_zones as t10', 't1.zone_id', '=', 't10.id')
                ->leftJoin('sub_modules as t13', 't1.sub_module_id', '=', 't13.id')
                ->select(DB::raw("t1.sub_module_id, t1.process_id, t1.current_stage as workflow_stage_id,t13.name as sub_module, t1.zone_id, t1.application_id as active_application_id, t2.name as process_name,t10.name as zone_name,t4.is_receipting_stage,t1.application_status_id,
                    t3.name as prev_stage, if(t4.is_receipting_stage=1,concat(t4.name,' :',t5.name), t4.name ) as workflow_stage,
                    CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user, count(t1.id) as number_of_applications"))
                ->whereRaw("(t4.servicedelivery_timeline <= TOTAL_WEEKDAYS(now(), t1.date_received))")
                ->groupBy('t1.current_stage','t1.usr_to', 't2.id')
                ->where('isDone', 0);
                    $assigned_groups = getUserGroups($user_id);
                    $is_super = belongsToSuperGroup($assigned_groups);
                      $assigned_stages = getAssignedProcessStages($user_id, $module_id);
                    if ($is_super) {
                        $qry->whereRaw('1=1');
                        $qry->limit(100);
                   } else {
                        
                        //`$qry->where('t4.usr_to','=',$user_id);
                        $qry->where(function ($query) use ($user_id, $assigned_stages) {
                            
                           $assigned_stages = $this->convertArrayToString($assigned_stages);
                           $assigned_stages =rtrim($assigned_stages, ",");
                           if($assigned_stages !=''){
                                $query->where('usr_to', $user_id)
                                    ->orWhereRaw("(t1.current_stage in ($assigned_stages) and t4.needs_responsible_user = 2)");
                           }
                           else{
                                $query->where('usr_to', $user_id);
                           }
                           
                        });
                    }
               
            // $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($module_id) && $module_id != '') {
                $qry->where('t1.module_id', $module_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.current_stage', $workflow_stage_id);
            }
            
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }else if(!validateIsNumeric($application_status_id) || !validateIsNumeric($module_id) || !validateIsNumeric($zone_id)){
              //  $qry->whereRAW(" if(t4.is_receipting_stage=1, t1.application_status_id = 11,1)");
            }
            $qry->orderBy('t4.order_no', 'asc');
            $qry2 = clone $qry;
            $total = $qry2->count();
            if(isset($start)&&isset($limit)){
                $results = $qry->skip($start)->take($limit)->get();
            }
            else{
                $results=$qry->get();
            }
            //LIMS records 
           

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'total' => $total
            );
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
    public function getOverDueTrayItems(Request $request)
    {
          $res  =$this->getUserOverDuetrayDashboard($request,true);
          return \response()->json($res);
    } function getUserOverDuetrayDashboard($request,$is_internaluser){
        
        $user_id = $this->user_id;
        //$limsusr_id = getLimsUserId($user_id);
        
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $zone_id = $request->input('zone_id');
        $application_status_id = $request->input('application_status_id');
        $is_management_dashboard = $request->input('is_management_dashboard');
        $start = $request->input('start');
        $limit = $request->input('limit');

        $whereClauses = array();
        $filter = $request->input('filter');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'tracking_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' OR t1.reference_no like '%" . ($filter->value) . "%' )";
                            break;
                        case 'reference_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' OR t1.reference_no like '%" . ($filter->value) . "%' )";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "(t9.name like '%" . ($filter->value) . "%' or t12.name like '%" . ($filter->value) . "%' )";
                            break;
                             case 'premises_name' :
                            $whereClauses[] = "( t12.name like '%" . ($filter->value) . "%' )";
                            break;
                            
                            
                        
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            //DB::enableQueryLog();TOTAL_WEEKDAYS(now(), date_received) as time_span,
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->leftJoin('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
                ->leftJoin('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('par_submission_urgencies as t6', 't1.urgency', '=', 't6.id')
                ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
                ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->leftJoin('par_zones as t10', 't1.zone_id', '=', 't10.id')
                ->leftJoin('tra_premises_applications as t11', 't1.application_code', '=', 't11.application_code')
                ->leftJoin('tra_premises as t12', 't11.premise_id', '=', 't12.id')
                ->leftJoin('sub_modules as t13', 't1.sub_module_id', '=', 't13.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id,t13.name as sub_module, t1.zone_id, t1.application_id as active_application_id, t2.name as process_name,t10.name as zone_name,t4.is_receipting_stage,t1.application_status_id,
                    t3.name as prev_stage, if(t4.is_receipting_stage=1,concat(t4.name,' :',t5.name), t4.name ) as workflow_stage,t4.is_general,t5.name as application_status,t6.name as urgencyName,t6.name as urgency_name,
                    CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user,t4.servicedelivery_timeline,  TOTAL_WEEKDAYS(now(), t1.date_received) as time_span,(t4.servicedelivery_timeline -TOTAL_WEEKDAYS(now(), t1.date_received)) as deliverytimeline_reminder,
                    if(t1.module_id= 2, t12.name , t9.name) as applicant_name,t12.name as premises_name, '' as sample_analysis_status"))
                ->whereRaw("(t4.servicedelivery_timeline <= TOTAL_WEEKDAYS(now(), t1.date_received))")
                ->where('isDone', 0);
//->where('t4.stage_status','<>',3)
                if($is_internaluser){
                    $assigned_groups = getUserGroups($user_id);
                    $is_super = belongsToSuperGroup($assigned_groups);
                      $assigned_stages = getAssignedProcessStages($user_id, $module_id);
                    if ($is_super) {
                        $qry->whereRaw('1=1');
                        $qry->limit(100);
                   } else {
                        
                        //`$qry->where('t4.usr_to','=',$user_id);
                        $qry->where(function ($query) use ($user_id, $assigned_stages) {
                            
                           $assigned_stages = $this->convertArrayToString($assigned_stages);
                           $assigned_stages =rtrim($assigned_stages, ",");
                           if($assigned_stages !=''){
                                $query->where('usr_to', $user_id)
                                    ->orWhereRaw("(t1.current_stage in ($assigned_stages) and t4.needs_responsible_user = 2)");
                           }
                           else{
                                $query->where('usr_to', $user_id);
                           }
                           
                        });
                    }
                }
                else{
                      $qry->where('t1.external_user_id', $user_id);
                }
            // $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($module_id) && $module_id != '') {
                $qry->where('t1.module_id', $module_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.current_stage', $workflow_stage_id);
            }
            if (isset($zone_id) && $zone_id != '') {
                $qry->where('t1.zone_id', $zone_id);
            }
            if (isset($application_status_id) && $application_status_id != '') {
                $qry->where('t1.application_status_id', $application_status_id);
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }else if(!validateIsNumeric($application_status_id) || !validateIsNumeric($module_id) || !validateIsNumeric($zone_id)){
              //  $qry->whereRAW(" if(t4.is_receipting_stage=1, t1.application_status_id = 11,1)");
            }
            $qry->orderBy('t4.order_no', 'asc');
            $qry2 = clone $qry;
            $total = $qry2->count();
            if(isset($start)&&isset($limit)){
                $results = $qry->skip($start)->take($limit)->get();
            }
            else{
                $results=$qry->get();
            }
            //LIMS records 
           

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'total' => $total
            );
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
        return $res;

    }
    
    public function getExternalUserInTrayItems(Request $request)
    {
            $res  =$this->getUserIntrayDashboard($request,false);
          return \response()->json($res);
    }
    function getLimsUserId($user_id){
        $limsusr_id =0;
        $record = DB::table("users")
                    ->select(DB::raw("decrypt(t1.email) as email"))
                    ->where('id',$usr_id)
                    ->first();
        $email = $record->email;
        $lims_record = DB::connection('lims_db')
                                        ->table('users as t2')
                                        ->select('id as usr_id')
                                        ->where(array('usr_email'=>$email))
                                        ->first();
        if($lims_record){
            $limsusr_id = $lims_record->id;
        }
        return $limsusr_id;
        
    }
   
    function getUserIntrayDashboard($request,$is_internaluser){
        
        $user_id = $this->user_id;
        //$limsusr_id = getLimsUserId($user_id);
        
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $zone_id = $request->input('zone_id');
        $application_status_id = $request->input('application_status_id');
        $is_management_dashboard = $request->input('is_management_dashboard');
        $start = $request->input('start');
        $limit = $request->input('limit');

        $whereClauses = array();
        $filter = $request->input('filter');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'tracking_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' OR t1.reference_no like '%" . ($filter->value) . "%' )";
                            break;
                        case 'reference_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' OR t1.reference_no like '%" . ($filter->value) . "%' )";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "(t9.name like '%" . ($filter->value) . "%' or t12.name like '%" . ($filter->value) . "%' )";
                            break;
                             case 'premises_name' :
                            $whereClauses[] = "( t12.name like '%" . ($filter->value) . "%' )";
                            break;
                            
                            
                        
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        try {
            //DB::enableQueryLog();TOTAL_WEEKDAYS(now(), date_received) as time_span,
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->leftJoin('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
                ->leftJoin('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('par_submission_urgencies as t6', 't1.urgency', '=', 't6.id')
                ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
                ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->leftJoin('par_zones as t10', 't1.zone_id', '=', 't10.id')
                ->leftJoin('tra_premises_applications as t11', 't1.application_code', '=', 't11.application_code')
                ->leftJoin('tra_premises as t12', 't11.premise_id', '=', 't12.id')
                ->leftJoin('sub_modules as t13', 't1.sub_module_id', '=', 't13.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id,t13.name as sub_module, t1.zone_id, t1.application_id as active_application_id, t2.name as process_name,t10.name as zone_name,t4.is_receipting_stage,t1.application_status_id,
                    t3.name as prev_stage, if(t4.is_receipting_stage=1,concat(t4.name,' :',t5.name), t4.name ) as workflow_stage,t4.is_general,t5.name as application_status,t6.name as urgencyName,t6.name as urgency_name,
                    CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user,t4.servicedelivery_timeline,  TOTAL_WEEKDAYS(now(), t1.date_received) as time_span,(t4.servicedelivery_timeline -TOTAL_WEEKDAYS(now(), t1.date_received)) as deliverytimeline_reminder,
                    if(t1.module_id= 2, t12.name , t9.name) as applicant_name,t12.name as premises_name, '' as sample_analysis_status"))
                
                ->where('isDone', 0);
//->where('t4.stage_status','<>',3)
                if($is_internaluser){
                    $assigned_groups = getUserGroups($user_id);
                    $is_super = belongsToSuperGroup($assigned_groups);
                      $assigned_stages = getAssignedProcessStages($user_id, $module_id);
                    if ($is_super) {
                        $qry->whereRaw('1=1');
                        $qry->limit(100);
                   } else {
                        
                        //`$qry->where('t4.usr_to','=',$user_id);
                        $qry->where(function ($query) use ($user_id, $assigned_stages) {
                            
                           $assigned_stages = $this->convertArrayToString($assigned_stages);
                           $assigned_stages =rtrim($assigned_stages, ",");
                           if($assigned_stages !=''){
                                $query->where('usr_to', $user_id)
                                    ->orWhereRaw("(t1.current_stage in ($assigned_stages) and t4.needs_responsible_user = 2)");
                           }
                           else{
                                $query->where('usr_to', $user_id);
                           }
                           
                        });
                    }
                }
                else{
                      $qry->where('t1.external_user_id', $user_id);
                }
            // $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($module_id) && $module_id != '') {
                $qry->where('t1.module_id', $module_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.current_stage', $workflow_stage_id);
            }
            if (isset($zone_id) && $zone_id != '') {
                $qry->where('t1.zone_id', $zone_id);
            }
            if (isset($application_status_id) && $application_status_id != '') {
                $qry->where('t1.application_status_id', $application_status_id);
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }else if(!validateIsNumeric($application_status_id) || !validateIsNumeric($module_id) || !validateIsNumeric($zone_id)){
              //  $qry->whereRAW(" if(t4.is_receipting_stage=1, t1.application_status_id = 11,1)");
            }
            $qry->orderBy('t4.order_no', 'asc');
            $qry2 = clone $qry;
            $total = $qry2->count();
            if(isset($start)&&isset($limit)){
                $results = $qry->skip($start)->take($limit)->get();
            }
            else{
                $results=$qry->get();
            }
            //LIMS records 
           

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'total' => $total
            );
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
        return $res;

    }
     function getLimsUserDetails($usr_id){
         $record = DB::table("users")
                    ->select(DB::raw("decrypt(email) as email"))
                    ->where('id',$usr_id)
                    ->first();
        $limsusr_email = $record->email;
        $lims_group_id =0;
            $record = DB::connection('lims_db')->table('users')->where('usr_email',$limsusr_email)->first();
          
            if($record){
                
                $lims_group_id = $record->lims_group_id;
            }
            return $lims_group_id;

    }
    function convertArrayToString($array){
        $string = '';
            if(is_array($array)){
                $string='';
                foreach($array as $row){
                    $string = $row .','.$string;
                }

            }
return $string;
    }
      public function getOnlineApplicationDashboard(Request $request)
    {
        $user_id = $this->user_id;
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $zone_id = $request->input('zone_id');
        $online_status_id = $request->input('online_status_id');
        $is_management_dashboard = $request->input('is_management_dashboard');
        
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);

        $whereClauses = array();
        $filter = $request->input('filter');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'tracking_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' or t1.reference_no like '%" . ($filter->value) . "%')";
                            break;
                        case 'reference_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' or t1.reference_no like '%" . ($filter->value) . "%')";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'time_span' :
                            $whereClauses[] = "TOTAL_WEEKDAYS(now(),date_submitted) > " . ($filter->value);
                            break;
                            
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        $portal_db = DB::connection('portal_db')->getDatabaseName();
        try {
            //TOTAL_WEEKDAYS(now(),date_submitted) as time_span,
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_onlinesubmissions as t1')
                ->leftJoin('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->leftJoin('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin($portal_db.'.wb_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('par_zones as t6', 't1.zone_id', '=', 't6.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id, t1.application_id as active_application_id, t2.name as process_name,
                     t4.name as workflow_stage,t4.is_general,t5.name as application_status,
                    t9.name as applicant_name, t6.name as zone_name"));
            if ($is_super || $is_management_dashboard ==1) {
                $qry->whereRaw('1=1');
            } else {
                $qry->where(function ($query) use ($user_id, $assigned_stages) {
                    $query->where('usr_to', $user_id)
                        ->orWhereIn('t1.current_stage', $assigned_stages);
                });
                
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if (validateIsNumeric($module_id)) {
                $qry->where('t1.module_id', $module_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (validateIsNumeric($zone_id)) {
                $qry->where('t1.zone_id', $zone_id);
            }
            if (validateIsNumeric($online_status_id)) {
                $qry->where('t5.id', $online_status_id);
            }
            $qry->orderBy('t1.id', 'desc');
            $qry->where('onlinesubmission_status_id', 1);
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
    public function getOnlineImportExportManagerReviewApplications(Request $request){
        $user_id = $this->user_id;
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $zone_id = $request->input('zone_id');
        $application_status_id = $request->input('application_status_id');
        $process_id = $request->input('process_id');
       
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);

        $whereClauses = array();
        $filter = $request->input('filter');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'tracking_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' or t1.reference_no like '%" . ($filter->value) . "%')";
                            break;
                        case 'reference_no' :
                            $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' or t1.reference_no like '%" . ($filter->value) . "%')";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'time_span' :
                            $whereClauses[] = "TOTAL_WEEKDAYS(now(),date_submitted) > " . ($filter->value);
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        $portal_db = DB::connection('portal_db')->getDatabaseName();
        try {
            
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_onlinesubmissions as t1')
                ->leftJoin('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->leftJoin('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin($portal_db.'.wb_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('par_zones as t6', 't1.zone_id', '=', 't6.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id, t1.application_id as active_application_id, t2.name as process_name,
                     t4.name as workflow_stage,t4.is_general,t5.name as application_status,
                    t9.name as applicant_name, t6.name as zone_name"));
            
                    if ($is_super) {
                        $qry->whereRaw('1=1');
                    } else {
                        $qry->where(function ($query) use ($user_id, $assigned_stages) {
                            $query->where('usr_to', $user_id)
                                ->orWhereIn('t1.current_stage', $assigned_stages);
                        });
                        
                    }
            
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (validateIsNumeric($process_id)) {
                $qry->where('t1.process_id', $process_id);
            }
            
            if (validateIsNumeric($application_status_id)) {
                $qry->where('t5.id', $application_status_id);
            }
            $qry->orderBy('t1.id', 'desc');
            $qry->where('onlinesubmission_status_id', 1);
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
   public function getOnlineAppsSubmissionCounter(Request $request){
    $user_id = $this->user_id;
    $section_id = $request->input('section_id');
    $module_id = $request->input('module_id');
    $sub_module_id = $request->input('sub_module_id');
    
    $assigned_groups = getUserGroups($user_id);
    $is_super = belongsToSuperGroup($assigned_groups);

    $whereClauses = array();
   
    try {
        $assigned_stages = getAssignedProcessStages($user_id, $module_id);
        $qry = DB::table('tra_onlinesubmissions as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('modules as t3', 't1.module_id', '=', 't3.id')
            ->join('sub_modules as t4', 't1.sub_module_id', '=', 't4.id')
            ->join('par_sections as t5', 't1.section_id', '=', 't5.id')
            ->join('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
            ->select(DB::raw("t2.name as process_name, t3.name as module_name, t4.name as sub_module_name, t6.name as application_status, t5.name as section_name, count(t1.id) as application_counter"));
            
        if ($is_super) {
            $qry->whereRaw('1=1');
        } else {
            $qry->where(function ($query) use ($user_id, $assigned_stages) {
                $query->where('usr_to', $user_id)
                    ->orWhereIn('t1.current_stage', $assigned_stages);
            });
        }
        
        if (isset($section_id) && $section_id != '') {
            $qry->where('t1.section_id', $section_id);
        }
        if (isset($module_id) && $module_id != '') {
            $qry->where('t1.module_id', $module_id);
        }
        if (isset($sub_module_id) && $sub_module_id != '') {
            $qry->where('t1.sub_module_id', $sub_module_id);
        }
        
        $qry->groupBy('t1.module_id','t1.sub_module_id', 't1.section_id', 't1.application_status_id');

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
   //getExternalOutTrayItems
    public function getOutTrayItems(Request $request)
    {
        $res = $this->getOutTrayUserDetails($request,true);
        return \response()->json($res);
    }
    public function getExternalOutTrayItems(Request $request)
    {
        $res = $this->getOutTrayUserDetails($request,false);
        return \response()->json($res);
    }
    public function getOutTrayUserDetails($request,$is_internaluser){

        $user_id = $this->user_id;
        try {
            
        $whereClauses = array();
        $filter = $request->input('filter');
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
                        case 'applicant_name' :
                            $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
                ->join('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('par_submission_urgencies as t6', 't1.urgency', '=', 't6.id')
                ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
                ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id, t1.application_id as active_application_id, t2.name as process_name,
                    t3.name as prev_stage, t4.name as workflow_stage,t5.name as application_status,t6.name as urgencyName,t6.name as urgency_name,
                    CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user,
                    t9.name as applicant_name"))
                ->where('isComplete', 0);
            if($is_internaluser){
                $qry->where('usr_from',$user_id);
               
            }
            else{

                $qry->where('external_user_id',$user_id);
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($module_id) && $module_id != '') {
                $qry->where('t1.module_id', $module_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.current_stage', $workflow_stage_id);
            }
            $qry->orderBy('t1.id', 'desc');
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
        return $res;

    }
    public function getSystemGuidelines(Request $request)
    {
        $menu_id = $request->input('menu_id');
        try {
            $qry = SystemGuideline::where('menu_id', $menu_id);
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
    public function getDashApplicationSummaryDetails(Request $request){
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        
        $date_from = $request->input('date_from');
        $date_to = $request->input('date_to');
        $results = array();
        try {
            $module_data = DB::table('modules')->where("is_application",1);

            if(validateIsNumeric($module_id)){
               $module_data->where('id',$module_id);

            }
            $module_data = $module_data->get();

            foreach($module_data as $module){
                    $table_name = $module->table_name;
                    $module_id = $module->id;
                    $module = $module->name;
                    $submodule_data = DB::table('sub_modules');

                    if(validateIsNumeric($sub_module_id)){
                        $submodule_data->where('id',$sub_module_id);
        
                    }
                    $submodule_data->where('module_id',$module_id);

                    $submodule_data = $submodule_data->get();
     
                    foreach($submodule_data as $sub_module){
                            $appsub_module_id = $sub_module->id;
                            $submodule = $sub_module->name;
                            //then get the records 

                           
                             $section_data = DB::table('par_sections');

                            if(validateIsNumeric($section_id)){
                                $section_data->where('id',$section_id);
                
                            }
                            //remove the other sections 
                            $section_data->whereIn('id', [2,4,5]);
                            $section_data = $section_data->get();
                            foreach($section_data as $sections){
                                $appsection_id = $sections->id;
                                $received_applications= $this->getReceivedApplications($table_name,'submission_date',$module_id,$appsub_module_id,$date_from,$date_to,$appsection_id);
                                $approved_applications= $this->getApplicationsRecommendationSummaryRpt($table_name,'approval_date',$module_id,$appsub_module_id,$date_from,$date_to,[1,2],$appsection_id);
                                $rejected_applications= $this->getApplicationsRecommendationSummaryRpt($table_name,'approval_date',$module_id,$appsub_module_id,$date_from,$date_to,[3],$appsection_id);

                                $results[] = array('module'=>$module,
                                        'sub_module'=>$submodule,
                                        'section'=>$sections->name,'module_id'=>$module_id,'appsub_module_id'=>$appsub_module_id,
                                        'received'=>$received_applications,
                                        'approved'=>$approved_applications,
                                        'rejected'=>$rejected_applications);

                            }
                          
                                     
                    }
                   
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
        return \response()->json($res);

    }
    public function getReceivedApplications($table_name,$date_option,$module_id, $sub_module_id,$date_from,$date_to,$appsection_id=null){

            $counter = DB::table($table_name.' as t1');

            if($date_from != '' && $date_to != ''){
                $counter->whereRAW("$date_option between '".$date_from."' and '".$date_to."'");
            }
            if(validateIsnumeric($sub_module_id)){
             
                $counter->where('t1.sub_module_id',$sub_module_id);
            } 
            if(validateIsnumeric($module_id)){
                $counter->where('t1.module_id',$module_id);
            } 
            if(validateIsnumeric($appsection_id)){
                $counter->where('t1.section_id',$appsection_id);
            } 
       
            return $counter->count();

    }
    public function getApplicationsRecommendationSummaryRpt($table_name,$date_option,$module_id, $sub_module_id,$date_from,$date_to,$decision_id,$appsection_id=null){
        $counter = DB::table($table_name .' as t1')
                    ->join('tra_approval_recommendations as t2', 't1.application_code','t2.application_code')
                    ->whereIn('decision_id',$decision_id);
                  
     if($date_from != '' && $date_to != ''){
        $counter->whereRAW("$date_option between '".$date_from."' and '".$date_to."'");
     }
     if(validateIsnumeric($sub_module_id)){
        $counter->where('t1.sub_module_id',$sub_module_id);
    } 
    if(validateIsnumeric($appsection_id)){
        $counter->where('t1.section_id',$appsection_id);
    } 
    if(validateIsnumeric($module_id)){
        $counter->where('t1.module_id',$module_id);
    } 
        return $counter->count();

}
public function getDashApplicationGraphSummaryDetails(Request $request){
    $section_id = $request->input('section_id');
    $module_id = $request->input('module_id');
    $sub_module_id = $request->input('sub_module_id');
    
    $date_from = $request->input('date_from');
    $date_to = $request->input('date_to');
    $results = array();
    try {
        $module_data = DB::table('modules')->where("is_application",1);

        if(validateIsNumeric($module_id)){
           $module_data->where('id',$module_id);

        }
        $module_data = $module_data->get();

        foreach($module_data as $module){
                $table_name = $module->table_name;
                $module_id = $module->id;
                $module = $module->name;
                
                $received_applications= $this->getReceivedApplications($table_name,'submission_date',$module_id,'',$date_from,$date_to);
                $approved_applications= $this->getApplicationsRecommendationSummaryRpt($table_name,'approval_date',$module_id,'',$date_from,$date_to,[1,2]);
                $rejected_applications= $this->getApplicationsRecommendationSummaryRpt($table_name,'approval_date',$module_id,'',$date_from,$date_to,[3]);
                
                $results[] = array('name'=>$module,
                            'received'=>$received_applications,
                            'approved'=>$approved_applications,
                            'rejected'=>$rejected_applications);
               
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
    return \response()->json($res);

}
public function getDashRevenueGraphSummaryDetails(Request $request){

    $section_id = $request->input('section_id');
    $module_id = $request->input('module_id');
    $sub_module_id = $request->input('sub_module_id');
    
    $date_from = $request->input('date_from');
    $date_to = $request->input('date_to');
    $results = array();
    try {
        $module_data = DB::table('modules')->where("is_application",1);

        if(validateIsNumeric($module_id)){
           $module_data->where('id',$module_id);

        }
        $module_data = $module_data->get();
        $medicines_rev =0;
        $medical_devicerev=0;
        $clinical_rev=0;
        foreach($module_data as $module){
                $table_name = 'tra_';
                $medicines_rev =0;
                $medical_devicerev=0;
                $clinical_rev=0;
                $module_id = $module->id;
                $module = $module->name;
                    if( $section_id== 2){
                        $medicines_rev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,2,$date_from,$date_to);
                    }
                    else if($section_id == 4){

                        $medical_devicerev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,4,$date_from,$date_to);
                    }
                    else if($section_id == 5){
                        $clinical_rev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,5,$date_from,$date_to);

                    }else{
                        $medicines_rev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,2,$date_from,$date_to);
                        $medical_devicerev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,4,$date_from,$date_to);
                        $clinical_rev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,5,$date_from,$date_to);
                    }
                   
                    $results[] = array('name'=>$module,
                            'module_id'=>$module_id,
                            '2'=>$medicines_rev,
                            '4'=>$medical_devicerev,
                            '5'=>$clinical_rev);
              
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
    return \response()->json($res);


}
public function getApplicationRevenueSummary($table_name,$date_option,$module_id, $appsection_id,$date_from,$date_to,$sub_module_id = null){

    $revenue_qry = DB::table('tra_payments as t1');

    if($date_from != '' && $date_to != ''){
        $revenue_qry->whereRAW("$date_option between '".$date_from."' and '".$date_to."'");
    }
    if(validateIsnumeric($sub_module_id)){
     
        $revenue_qry->where('t1.sub_module_id',$sub_module_id);
    } 
    if(validateIsnumeric($module_id)){
        $revenue_qry->where('t1.module_id',$module_id);
    } 
    if(validateIsnumeric($appsection_id)){
        $revenue_qry->where('t1.section_id',$appsection_id);
    } 
    //where payment_type as 1
    $revenue_qry->where('payment_type_id', 1);
    $amount_paid = $revenue_qry->select(DB::raw("sum(t1.amount_paid*t1.exchange_rate) as amount_paid"))->first()->amount_paid;
    if(!validateIsNumeric($amount_paid)){
        $amount_paid = 0;
    }
    return   $amount_paid;

}
public function getDashRevenueSummaryDetails(Request $request){
    $section_id = $request->input('section_id');
    $module_id = $request->input('module_id');
    $sub_module_id = $request->input('sub_module_id');
    
    $date_from = $request->input('date_from');
    $date_to = $request->input('date_to');
    $results = array();
    try {
        $module_data = DB::table('modules')->where(array('modhas_payment_processing'=>1));

        if(validateIsNumeric($module_id)){
           $module_data->where('id',$module_id);

        }
        $module_data = $module_data->get();

        foreach($module_data as $module){
                $table_name = $module->table_name;
                $module_id = $module->id;
                $module = $module->name;
                $submodule_data = DB::table('sub_modules');

                if(validateIsNumeric($sub_module_id)){
                    $submodule_data->where('id',$sub_module_id);
    
                }
                $submodule_data->where('module_id',$module_id);
                $submodule_data->where('has_payment_processing',1);
                $submodule_data = $submodule_data->get();
 
                foreach($submodule_data as $sub_module){
                        $appsub_module_id = $sub_module->id;
                        $submodule = $sub_module->name;
                        //then get the records 
                        $medicines_rev =0;
                        $medical_devicerev=0;
                        $clinical_rev=0;

                        if( $section_id== 2){
                            $medicines_rev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,2,$date_from,$date_to,$appsub_module_id);
                        }
                        else if($section_id == 4){
    
                            $medical_devicerev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,4,$date_from,$date_to,$appsub_module_id);
                        }
                        else if($section_id == 5){
                            $clinical_rev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,5,$date_from,$date_to,$appsub_module_id);
    
                        }else{
                            $medicines_rev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,2,$date_from,$date_to,$appsub_module_id);
                            $medical_devicerev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,4,$date_from,$date_to,$appsub_module_id);
                            $clinical_rev = $this->getApplicationRevenueSummary($table_name,'trans_date',$module_id,5,$date_from,$date_to,$appsub_module_id);
                        }
                       
                        $results[] = array('module'=>$module,
                                'module_id'=>$module_id,'sub_module'=>$submodule,
                                '2'=>$medicines_rev,
                                '4'=>$medical_devicerev,
                                '5'=>$clinical_rev);
                      
                                 
                }
               
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
    return \response()->json($res);


}
public function getScheduledTcMeetingDetails(Request $req){
    try{
        
        $data_today = formatDate(Carbon::now());
        $user_id = $this->user_id;
        $results = DB::table('tc_meeting_details as t1')
                        ->join('tc_meeting_participants as t2', 't1.id', 't2.meeting_id')
                        ->leftJoin('modules as t3', 't1.module_id', 't3.id')
                        ->leftJoin('sub_modules as t4', 't1.sub_module_id', 't4.id')
                        ->select(DB::raw("t1.*, t3.name as process, t4.name as sub_process, (select count(id) from tc_meeting_applications q where q.meeting_id = t1.id) as no_of_applications")) 
                        ->where(array('user_id'=>$user_id))
                        //->whereRaw(" date_format(date_requested, '%Y-%m-%d') >= '".$data_today."'")
                        ->groupBy('t1.id')
                        ->get();


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
public function checkAssignmentDefination(Request $req){
    $user_id = $this->user_id;
    $group_qry = DB::table('tra_user_group')->where('user_id',$user_id)->select('group_id')->get();
    $group_idArray = array();
    foreach ($group_qry as $group) {
        $group_idArray[] = $group->group_id;
    }
    $check_defination = DB::table('par_application_assignment_setup')->whereIn('group_id',$group_idArray)->count();
    if($check_defination > 0){
        $res = array(
            'success' => true,
            'has_defination' => true,
            'message' => 'All is well'
        );
    }else{
        $res = array(
            'success' => true,
            'has_defination' => false,
            'message' => 'No defination'
        );
    }
    return \response()->json($res);
     
}
public function getApplicationAssaignmentRecords(Request $request){
        $user_id = $this->user_id;
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        

        $whereClauses = array();
        $filter = $request->input('filter');
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'applicant_name' :
                            $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        $group_qry = DB::table('tra_user_group')->where('user_id',$user_id)->select('group_id')->get();
       
        $group_idArray = array();
        foreach ($group_qry as $group) {
            $group_idArray[] = $group->group_id;
        }
        $assigned_processes = DB::table('par_application_assignment_setup')->select('process_id')->whereIn('group_id',$group_idArray)->get();

        $process_array = array();
        foreach ($assigned_processes as $assigned_process) {
           
            $process_array[] = $assigned_process->process_id;
        }
     
        try {
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
                ->join('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->join('par_submission_urgencies as t6', 't1.urgency', '=', 't6.id')
                ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
                ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->select(DB::raw("t1.*, t1.current_stage as workflow_stage_id, t1.application_id as active_application_id, t2.name as process_name,
                    t3.name as prev_stage, t4.name as workflow_stage,t4.is_general,t5.name as application_status,t6.name as urgencyName,t6.name as urgency_name,
                    CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user, TOTAL_WEEKDAYS(now(), date_received) as time_span, 
                    t9.name as applicant_name"));
           
                $qry->WhereIn('t1.process_id', $process_array);
             
            
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($module_id) && $module_id != '') {
                $qry->where('t1.module_id', $module_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            
            $qry->orderBy('t1.id', 'desc');
            $total = $qry->count();
            //pagination
            $limit = $request->input('limit');
            $start = $request->input('start');
            if(isset($start)&&isset($limit)){
                $results = $qry->skip($start)->take($limit)->get();
             }else{
                $results=$qry->get();
             }

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well',
                'total'=>$total
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
public function getApplicationAssaignmentCount(Request $request){
        $user_id = $this->user_id;
        $process_id = $request->input('process_id');
        $module_id = $request->input('module_id');
        

        $whereClauses = array();
        $filter = $request->input('filter');
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
                        case 'applicant_name' :
                            $whereClauses[] = "t9.name like '%" . ($filter->value) . "%'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        $group_qry = DB::table('tra_user_group')->where('user_id',$user_id)->select('group_id')->get();

        $group_idArray = array();
        foreach ($group_qry as $group) {
            $group_idArray[] = $group->group_id;
        }
        $assigned_processes = DB::table('par_application_assignment_setup')->select('process_id')->whereIn('group_id',$group_idArray)->get();

        $process_array = array();
        foreach ($assigned_processes as $assigned_process) {
           
            $process_array[] = $assigned_process->process_id;
        }
     
        try {
           $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->join('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->join('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->leftJoin('users as t9', 't1.usr_to', '=', 't9.id')
                ->select(DB::raw("t2.name as process_name, t4.name as stage_name, CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as user_name, t5.name as application_status, count(t1.id) as application_counter, t1.usr_to as user_id, t1.process_id, t1.current_stage as stage_id"));
           
                $qry->WhereIn('t1.process_id', $process_array);
             
            
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (isset($process_id) && $process_id != '') {
                $qry->where('t1.process_id', $process_id);
            }
            if (isset($module_id) && $module_id != '') {
                $qry->where('t1.module_id', $module_id);
            }
            
            $qry->groupBy('t1.usr_to', 't1.current_stage','t1.process_id');
            $results = $qry->where('t1.isDone',0)->get();
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
public function getAssaignmentApplications(Request $request){
        $user_id = $this->user_id;
        $stage_id = $request->input('stage_id');
        $process_id = $request->input('process_id');
        $user_id = $request->input('user_id');

        try {
           
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
                ->join('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->join('par_submission_urgencies as t6', 't1.urgency', '=', 't6.id')
                ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
                ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
                ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
                ->select(DB::raw("t1.*, t2.name as process_name,
                    t3.name as prev_stage, t4.name as workflow_stage,t4.is_general,t5.name as application_status,t6.name as urgencyName,t6.name as urgency_name,
                    CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user, TOTAL_WEEKDAYS(now(), date_received) as time_span, 
                    t9.name as applicant_name"));

            
          
            if (isset($stage_id) && $stage_id != '') {
                $qry->where('t1.current_stage', $stage_id);
            }
            if (isset($process_id) && $process_id != '') {
                $qry->where('t1.process_id', $process_id);
            }
            if (isset($user_id) && $user_id != '') {
                $qry->where('t1.usr_to', $user_id);
            }

            $qry->where('isDone',0)->orderBy('t1.id', 'desc');
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
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
        return $res;
}
public function exportDashboard(Request $req){
    $type = $req->type; //1=intray 2=outray
    $is_internaluser = $req->is_internaluser;
    if(validateIsnumeric($type)){
        if($type == 1){ //intray
           $results = $this->getUserIntrayDashboard($req, $is_internaluser);
           $user_cipher = getTableData('users',array('id'=>$this->user_id));
           $user_data = decryptArray(array(['first_name'=>$user_cipher->first_name, 'last_name'=>$user_cipher->last_name]));
           $data = $results['results'];
           foreach ($data as $value) {
                unset($value->mis_application_id);
                unset($value->id);
                unset($value->application_code);
                unset($value->view_id);
                unset($value->process_id);
                unset($value->usr_from);
                unset($value->usr_to);
                unset($value->external_user_id);
                unset($value->released_by);
                unset($value->previous_stage);
                unset($value->current_stage);
                unset($value->module_id);
                unset($value->directive_id);
                unset($value->sub_module_id);
                unset($value->section_id);
                unset($value->zone_id);
                unset($value->application_status_id);
                unset($value->appdata_ammendementrequest_id);
                unset($value->urgency);
                unset($value->applicant_id);
                unset($value->isDone);
                unset($value->isComplete);
                unset($value->is_notified);
                unset($value->created_by);
                unset($value->altered_by);
                unset($value->is_dismissed);
                unset($value->workflow_stage_id);
                unset($value->active_application_id);
                unset($value->is_receipting_stage);
                unset($value->is_general);
           }
           $heading = $user_data[0]['first_name']." ".$user_data[0]['last_name']." Intray Records";
           $filename = "Intray_Records";
           return exportDatatoExcel($data, $heading, $filename);
        }else if($type == 2){ //outray
           $results = $this->getOutTrayUserDetails($req, $is_internaluser);
           $user_cipher = getTableData('users',array('id'=>$this->user_id));
           $user_data = decryptArray(array(['first_name'=>$user_cipher->first_name, 'last_name'=>$user_cipher->last_name]));
           $data = $results['results'];
           foreach ($data as $value) {
                unset($value->mis_application_id);
                unset($value->id);
                unset($value->application_code);
                unset($value->view_id);
                unset($value->process_id);
                unset($value->usr_from);
                unset($value->usr_to);
                unset($value->external_user_id);
                unset($value->released_by);
                unset($value->previous_stage);
                unset($value->current_stage);
                unset($value->module_id);
                unset($value->directive_id);
                unset($value->sub_module_id);
                unset($value->section_id);
                unset($value->zone_id);
                unset($value->application_status_id);
                unset($value->appdata_ammendementrequest_id);
                unset($value->urgency);
                unset($value->applicant_id);
                unset($value->isDone);
                unset($value->isComplete);
                unset($value->is_notified);
                unset($value->created_by);
                unset($value->altered_by);
                unset($value->is_dismissed);
                unset($value->workflow_stage_id);
                unset($value->active_application_id);
                unset($value->is_receipting_stage);
                unset($value->is_general);
           }
           $heading = $user_data[0]['first_name']." ".$user_data[0]['last_name']." OutTray Records";
           $filename = "OutTray_Records";
           return exportDatatoExcel($data, $heading, $filename);
            
        }else{ //not set
            return "Not Mapped";
        }
    }
}

public function getApplicationSummaryIntrayItems(Request $request){

    $user_id = $this->user_id;
    //$limsusr_id = getLimsUserId($user_id);
    
    $section_id = $request->input('section_id');
    $module_id = $request->input('module_id');
    $sub_module_id = $request->input('sub_module_id');
    $workflow_stage_id = $request->input('workflow_stage_id');
    $zone_id = $request->input('zone_id');
    $application_status_id = $request->input('application_status_id');
    $is_management_dashboard = $request->input('is_management_dashboard');
    $start = $request->input('start');
    $limit = $request->input('limit');

    $whereClauses = array();
    $filter = $request->input('filter');
    $filter_string = '';
    if (isset($filter)) {
        $filters = json_decode($filter);
        if ($filters != NULL) {
            foreach ($filters as $filter) {
                switch ($filter->property) {
                    case 'tracking_no' :
                        $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' OR t1.reference_no like '%" . ($filter->value) . "%' )";
                        break;
                    case 'reference_no' :
                        $whereClauses[] = "(t1.tracking_no like '%" . ($filter->value) . "%' OR t1.reference_no like '%" . ($filter->value) . "%' )";
                        break;
                    case 'applicant_name' :
                        $whereClauses[] = "(t9.name like '%" . ($filter->value) . "%' or t12.name like '%" . ($filter->value) . "%' )";
                        break;
                         case 'premises_name' :
                        $whereClauses[] = "( t12.name like '%" . ($filter->value) . "%' )";
                        break;
                        
                        
                    
                }
            }
            $whereClauses = array_filter($whereClauses);
        }
        if (!empty($whereClauses)) {
            $filter_string = implode(' AND ', $whereClauses);
        }
    }
    try {
        //DB::enableQueryLog();TOTAL_WEEKDAYS(now(), date_received) as time_span,
        $qry = DB::table('tra_submissions as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->leftJoin('wf_workflow_stages as t3', 't1.previous_stage', '=', 't3.id')
            ->leftJoin('wf_workflow_stages as t4', 't1.current_stage', '=', 't4.id')
            ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
            ->leftJoin('par_submission_urgencies as t6', 't1.urgency', '=', 't6.id')
            ->leftJoin('users as t7', 't1.usr_from', '=', 't7.id')
            ->leftJoin('users as t8', 't1.usr_to', '=', 't8.id')
            ->leftJoin('wb_trader_account as t9', 't1.applicant_id', '=', 't9.id')
            ->leftJoin('par_zones as t10', 't1.zone_id', '=', 't10.id')
            ->leftJoin('sub_modules as t13', 't1.sub_module_id', '=', 't13.id')
            ->select(DB::raw("t1.sub_module_id, t1.process_id, t1.current_stage as workflow_stage_id,t13.name as sub_module, t1.zone_id, t1.application_id as active_application_id, t2.name as process_name,t10.name as zone_name,t4.is_receipting_stage,t1.application_status_id,
                t3.name as prev_stage, if(t4.is_receipting_stage=1,concat(t4.name,' :',t5.name), t4.name ) as workflow_stage,
                CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as from_user,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as to_user, count(t1.id) as number_of_applications"))
            ->groupBy('t1.current_stage','t2.id')
            ->where('isDone', 0);
                $assigned_groups = getUserGroups($user_id);
                $is_super = belongsToSuperGroup($assigned_groups);
                  $assigned_stages = getAssignedProcessStages($user_id, $module_id);
                if ($is_super) {
                    $qry->whereRaw('1=1');
                    $qry->limit(100);
               } else {
                    
                    //`$qry->where('t4.usr_to','=',$user_id);
                    $qry->where(function ($query) use ($user_id, $assigned_stages) {
                        
                       $assigned_stages = $this->convertArrayToString($assigned_stages);
                       $assigned_stages =rtrim($assigned_stages, ",");
                       if($assigned_stages !=''){
                            $query->where('usr_to', $user_id)
                                ->orWhereRaw("(t1.current_stage in ($assigned_stages) and t4.needs_responsible_user = 2)");
                       }
                       else{
                            $query->where('usr_to', $user_id);
                       }
                       
                    });
                }
           
        // $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
        
        if (isset($section_id) && $section_id != '') {
            $qry->where('t1.section_id', $section_id);
        }
        if (isset($module_id) && $module_id != '') {
            $qry->where('t1.module_id', $module_id);
        }
        if (isset($sub_module_id) && $sub_module_id != '') {
            $qry->where('t1.sub_module_id', $sub_module_id);
        }
        if (isset($workflow_stage_id) && $workflow_stage_id != '') {
            $qry->where('t1.current_stage', $workflow_stage_id);
        }
        
        if ($filter_string != '') {
            $qry->whereRAW($filter_string);
        }else if(!validateIsNumeric($application_status_id) || !validateIsNumeric($module_id) || !validateIsNumeric($zone_id)){
          //  $qry->whereRAW(" if(t4.is_receipting_stage=1, t1.application_status_id = 11,1)");
        }
        $qry->orderBy('t4.order_no', 'asc');
        $qry2 = clone $qry;
        $total = $qry2->count();
        if(isset($start)&&isset($limit)){
            $results = $qry->skip($start)->take($limit)->get();
        }
        else{
            $results=$qry->get();
        }
        //LIMS records 
       

        $res = array(
            'success' => true,
            'results' => $results,
            'message' => 'All is well',
            'total' => $total
        );
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

}
