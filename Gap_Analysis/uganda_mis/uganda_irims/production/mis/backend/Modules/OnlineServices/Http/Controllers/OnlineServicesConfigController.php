<?php

namespace Modules\OnlineServices\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Carbon;

class OnlineServicesConfigController extends Controller
{
   /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('onlineservices::index');
    }
    public function getOnlinePortalServicesDetails(){
        try {
            $data = array();
            $data = DB::table('tra_online_portalservices as t1')
                        ->join('modules as t2', 't1.module_id','=','t2.id')
                        ->join('sub_modules as t3', 't1.sub_module_id','=','t3.id')
                    ->select('t1.*', 't2.name as module_name','t3.name as sub_module_name')
                    ->get();

        $res = array('results'=>$data,
                     'success' => true,
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
    public function getApplicationprocessguidelines(){
        try {
            $data = array();
            $data = DB::table('par_webappprocess_guidelines as t1')
                        ->join('modules as t2', 't1.module_id','=','t2.id')
                        ->join('sub_modules as t3', 't1.sub_module_id','=','t3.id')
                    ->select('t1.*', 't2.name as module_name','t3.name as sub_module_name')
                    ->get();

        $res = array('results'=>$data,
                     'success' => true,
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


     public function getOnlineFormsParams(Request $request)
    {
        $table_name = $request->input('table_name');
        $sectionSelection = $request->input('sectionSelection');
        $strict_mode = $request->input('strict_mode');
        $is_config = $request->input('is_config');
        $filters = $request->input('filters');

        $con = $request->input('con');
        $db_con = 'mysql';
        if (isset($con) && $con != '') {
            $db_con = $con;
        }
        $filters = (array)json_decode($filters);
        $filters=array_filter($filters);
        try {
            $requestData = $request->all();
            unset($requestData['sectionSelection']);

            if($table_name == 'wb_app_formsdefination') {
                $qry = DB::connection($db_con)
                        ->table($table_name .' as t1')
                        ->Join('modules as t4','t1.module_id','=','t4.id')
                        ->Join('sub_modules as t5','t1.sub_module_id','=','t5.id')
                        ->leftJoin('par_sections as t6','t1.section_id','=','t6.id')
                        ->leftJoin('par_prodclass_categories as t7','t1.prodclass_category_id','=','t7.id')
                        
                        ->select('t1.*', 't4.name as module_name', 't5.name as sub_module_name', 't6.name as section_name', 't7.name as prodclass_category_name');

        }
        elseif($table_name == 'wb_formfields_definations') {
                 $qry = DB::connection($db_con)
                         ->table($table_name .' as t1')
                         ->Join('wb_app_formsdefination as t2','t1.app_formsdefination_id','=','t2.id')
                         ->Join('wb_form_fields as t3','t1.form_field_id','=','t3.id')
                        
                         ->select('t1.*', 't2.form_name', 't3.name as form_field');

         }
        else{
                $qry = DB::connection($db_con)->table($table_name.' as t1');
            }
            if($table_name == 'par_sections'){
                $qry =  $qry->whereNotIn('id',[5]);
                if($sectionSelection != ''){
                    $sectionsId = explode(',',$sectionSelection);
                    $qry =  $qry->whereIn('id', $sectionsId);
                }
            }
        //if($filter)
           $qry->where($filters);
           if(!validateIsnumeric($is_config)){
                $qry->where('t1.is_enabled', 1);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
            );
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
    }



    public function getApplicationdocumentdefination(Request $req){
        try {
            $data = array();
            $records = DB::connection('portal_db')->table('wb_applicable_appdocuments as t1')
                    ->join('wb_statuses as t2', 't1.status_id', '=', 't2.id')
                    ->select('t1.*', 't2.name as status_name');
            $module_id = $req->module_id;
            $section_id = $req->section_id;
            $sub_module_id = $req->sub_module_id;
            if(validateIsNumeric($module_id)){
                $records->where('t1.def_module_id', $module_id);
            }
            if(validateIsNumeric($sub_module_id)){
                $records->where('t1.def_sub_module_id', $sub_module_id);
            }
            if(validateIsNumeric($section_id)){
                $records->where('t1.def_section_id', $section_id);
            }
            $records = $records->get();

                    foreach($records as $rec){
                            $process_name = getSingleRecordColValue('wf_tfdaprocesses', array('id'=>$rec->process_id), 'name');
                            $document_type = getSingleRecordColValue('par_document_types', array('id'=>$rec->document_type_id), 'name');
                            $module_name = getSingleRecordColValue('modules', array('id'=>$rec->def_module_id), 'name');
                            $section_name = getSingleRecordColValue('par_sections', array('id'=>$rec->def_section_id), 'name');
                            $sub_module_name = getSingleRecordColValue('sub_modules', array('id'=>$rec->def_sub_module_id), 'name');
                            $data[] = array('id'=>$rec->id,
                                            'description'=>$rec->description,
                                            'process_name'=>$process_name,
                                            'process_id'=>$rec->process_id,
                                            'status_id'=>$rec->status_id,
                                            'status_name'=>$rec->status_name,
                                            'document_type_id'=>$rec->document_type_id,
                                            'document_type'=>$document_type,
                                            'def_sub_module_id'=>$rec->def_sub_module_id,
                                            'def_module_id'=>$rec->def_module_id,
                                            'def_section_id'=>$rec->def_section_id,
                                            'module_name'=>$module_name,
                                            'section_name'=>$section_name,
                                            'sub_module_name'=>$sub_module_name
                            );
                    }
        $res = array('results'=>$data,
                     'success' => true,
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
    
    public function getOnlineProcessTransitionsdetails(){
        try {
            $data = array();
            $records = DB::connection('portal_db')->table('wb_processstatus_transitions as t1')
                    ->join('wb_statuses as t2', 't1.current_status_id', '=', 't2.id')
                    ->join('wb_statuses as t3', 't1.next_status_id', '=', 't3.id')
                    ->select('t1.*', 't2.name as current_status','t3.name as next_status' )
                    ->get();
                    foreach($records as $rec){
                            $module_name = getSingleRecordColValue('modules', array('id'=>$rec->module_id), 'name');
                           $data[] = array('id'=>$rec->id,
                                            'description'=>$rec->description,
                                            'next_status_id'=>$rec->next_status_id,
                                            'current_status_id'=>$rec->current_status_id,
                                            'next_status'=>$rec->next_status,
                                            'current_status'=>$rec->current_status,
                                            'module_id'=>$rec->module_id,
                                            'module_name'=>$module_name
                            );
                    }
        $res = array('results'=>$data,
                     'success' => true,
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

    public function getOnlineProcesdetails(){
        try {
            $data = array();
            $records = DB::connection('portal_db')->table('wb_tfdaprocesses as t1')
                    ->join('wb_statuses as t2', 't1.status_id', '=', 't2.id')
                    ->select('t1.*','t2.name as status_name')
                    ->get();
                    foreach($records as $rec){
                           $module_name = getSingleRecordColValue('modules', array('id'=>$rec->module_id), 'name');
                           $section_name = getSingleRecordColValue('par_sections', array('id'=>$rec->section_id), 'name');
                           $sub_module_name = getSingleRecordColValue('sub_modules', array('id'=>$rec->sub_module_id), 'name');
                           $data[] = array('id'=>$rec->id,
                                            'sub_module_id' => $rec->sub_module_id,
                                            'module_id' => $rec->module_id,
                                            'status_id' => $rec->status_id,
                                            'section_id' => $rec->section_id,
                                            'name'=>$rec->name,
                                            'router_link'=>$rec->router_link,
                                            'is_enabled'=>$rec->is_enabled,
                                            'status_name'=>$rec->status_name,
                                            'section_name'=>$section_name,
                                            'sub_module_name'=>$sub_module_name,
                                            'module_name'=>$module_name
                            );
                    }
        $res = array('results'=>$data,
                     'success' => true,
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


    public function getapplicationstatusactions(Request $req){
            //the details 
        try {
                $rec = DB::connection('portal_db')->table('wb_processstatus_actions as t1')
                        ->select('t1.*', 't2.name as status_name', 't3.name as action_name')
                        ->join('wb_statuses as t2', 't1.status_id','=','t2.id')
                        ->join('wb_statuses_actions as t3', 't1.action_id','=','t3.id')
                        ->get();
            $res = array('results'=>$rec,
                            'success' => true,
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
    public function getapplicationstatus(Request $req){
        //the details 
    try {
            $rec = DB::connection('portal_db')->table('wb_statuses as t1')
                    ->select('t1.*', 't2.name as status_type')
                    ->join('wb_statuses_types as t2', 't1.status_type_id','=','t2.id')
                    
                    ->get();
        $res = array('results'=>$rec,
                        'success' => true,
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
    
    public function saveApplicationstatusactions(Request $req){
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $status_id = $post_data['status_id']; 
            $action_id = $post_data['action_id'];
            $id = $post_data['id'];
            $unsetData=$req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            if(isset($unsetData)){
                $unsetData= explode(",", $unsetData);
                $post_data=unsetArrayData($post_data,$unsetData);
            }
            $table_data = $post_data;
            //add extra params
            $where = array(
                'id' => $id
            );
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where,'portal_db')) {
                  
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where,'portal_db');
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }  
                    $previous_data = $previous_data['results'];
                   
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id,'portal_db');
                    
                }
            } else {
                    $table_data['created_on'] = Carbon::now();
                    $table_data['created_by'] = $user_id;
                    //the data
                    // save the repository
                    $where = array(
                        'action_id' => $action_id,
                        'status_id' => $status_id
                    );

                    if (!recordExists($table_name, $where,'portal_db')) {
                        $res = insertRecord($table_name, $table_data, $user_id,'portal_db');
                        //the details 
                        
                    }else{
                        $res = array(
                            'success' => false,
                            'message' => "Data Exists"
                        );
                    }
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
    
    public function saveOnlinePortalData(Request $req){
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['model'];
            $id = $post_data['id'];
            $name = $req->name;

            $unsetData=$req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            if(isset($unsetData)){
                $unsetData= explode(",", $unsetData);
                $post_data=unsetArrayData($post_data,$unsetData);
            }
            $table_data = $post_data;
            //add extra params
            
            $where = array(
                'id' => $id
            );
            $db_connect = 'portal_db';

            $where_insert = array(
                'name' => $name
            );
            if($table_name == 'tra_online_portalservices'){
                $db_connect = 'mysql';
                if(!isset($post_data['is_online'])){
                    $table_data['is_online'] =0;
                }
                $where_insert = $post_data;
            }
            else if($table_name == 'par_webappprocess_guidelines'){
                $db_connect = 'mysql';
            }
            else if($table_name == 'wb_navigation_items'){
                if(!isset($post_data['parent_id'])){
                    $table_data['parent_id'] =0;
                }
            }
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where, $db_connect)) {
                    
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where, $db_connect);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id, $db_connect);
                    
                }
            } else {
                    $table_data['created_on'] = Carbon::now();
                    $table_data['created_by'] = $user_id;
                    //the data
                    $where_insert = $post_data;
                    unset($where_insert['description']);
                    unset($where_insert['code']);
                    unset($where_insert['is_enabled']);
                    if (!recordExists($table_name, $where_insert, $db_connect)) {
                        $res = insertRecord($table_name, $table_data, $user_id, $db_connect);
                        //the details 
                        $record_id = $res['record_id'];
                        $dms_node_id = '';
                    }else{
                        $res = array(
                            'success' => false,
                            'message' => "Data Exists"
                        );
                    }
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
    public function saveUniformOnlinePortalData(Request $req){
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['model'];
            $id = $post_data['id'];
            $record_id = $post_data['id'];
            $unsetData=$req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            if(isset($unsetData)){
                $unsetData= explode(",", $unsetData);
                $post_data=unsetArrayData($post_data,$unsetData);
            }
            $table_data = $post_data;
            //add extra params
            
            $where = array(
                'id' => $id
            );
            if (isset($id) && $id != "") {
                if (recordExists($table_name, $where,'portal_db')) {
                    
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where,'portal_db');
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id,'portal_db');
                    
                }
            } else {
                     $where = $table_data;
                    $table_data['created_on'] = Carbon::now();
                    $table_data['created_by'] = $user_id;

                    if (!recordExists($table_name, $where,'portal_db')) {
                        $res = insertRecord($table_name, $table_data, $user_id,'portal_db');
                        //the details 
                        $record_id = $res['record_id'];
                       
                        $dms_node_id = '';
                    }else{
                        $res = array(
                            'success' => false,
                            'message' => "Data Exists"
                        );
                    }
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
   public function getOnlineMenuLevel0(Request $req){
            try {
                $navigation_type_id= $req->navigation_type_id;

                    $rec = DB::connection('portal_db')->table('wb_navigation_items as t1')
                            ->select('t1.*')
                            ->where(array('t1.navigation_type_id'=>$navigation_type_id, 'level'=>0) )
                            ->get();
                $res = array('results'=>$rec,
                                'success' => true,
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
   //navigations details 
   public function getSystemNavigationMenuItems(Request $request)
   {
       $row = $this->getSystemMenuItem(0, 0);
       $menus = '[';
       if (count($row)) {
           $menu_count = count($row);
           $menu_counter = 0;
           foreach ($row as $item) {
               $menu_counter++;
               $id = $item['id'];
               $name = $item['name'];
               $text = $name;
               $level = $item['level'];
               $parent_id = $item['parent_id'];
               $child_id = $item['parent_id'];
               $router_link = $item['router_link'];
               $iconCls = $item['iconCls'];
               $order_no = $item['order_no'];
               $is_online = $item['is_online'];
               $navigation_type = $item['navigation_type'];
               $navigation_type_id = $item['navigation_type_id'];

               
               $menus .= '{';
               $menus .= '"text": "' . $text . '",';
               $menus .= '"name": "' . $name . '",';
              // $menus .= '"iconCls": "' . $iconCls . '",';
               $menus .= '"menu_id": "' . $id . '",';
               $menus .= '"id": "' . $id . '",';
               //$menus .= '"access_level": "' . $access_level . '",';
               $menus .= '"router_link": "' . $router_link . '",';
               $menus .= '"level": "' . $level . '",';
               $menus .= '"navigation_type": "' . $navigation_type . '",';
               $menus .= '"order_no": "' . $order_no . '",';
               $menus .= '"navigation_type_id": "' . $navigation_type_id . '",';

               $menus .= '"is_online": "' . $is_online . '",';
               $children = $this->getSystemMenuItem(1, $id);
               if (count($children) > 0) {
                   $menus .= '"selectable": false,';
                   $children_count = count($children);
                   $children_counter = 0;
                   $menus .= '"children": [';
                   foreach ($children as $child) {
                       $children_counter++;
                       $child_id = $child['id'];
                       $child_name = $child['name'];
                       $child_text = $child_name;
                       $child_level = $child['level'];
                       $child_routerlink = $child['router_link'];
                       $child_iconCls = $child['iconCls'];
                       $child_order_no = $child['order_no'];
                       $child_is_online = $child['is_online'];
                       $child_parent_id = $child['parent_id'];
                       $child_navigation_type = $child['navigation_type'];
                       $child_type_id = $item['navigation_type_id'];

                      // $child_access_level = $this->getMenuAccessLevel($child_id);

                       $menus .= '{';
                       $menus .= '"text": "' . $child_text . '",';
                       $menus .= '"name": "' . $child_name . '",';
                       $menus .= '"iconCls": "' . $child_iconCls . '",';
                       $menus .= '"menu_id": "' . $child_id . '",';
                       $menus .= '"id": "' . $child_id . '",';
                       $menus .= '"router_link": "' . $child_routerlink . '",';
                       $menus .= '"level": "' . $child_level . '",';
                       $menus .= '"order_no": "' . $child_order_no . '",';
                       $menus .= '"is_online": "' . $child_is_online . '",';
                       $menus .= '"parent_id": ' . $child_parent_id . ',';
                       $menus .= '"navigation_type": "' . $child_navigation_type . '",';
                       $menus .= '"child_type_id": "' . $child_type_id . '",';
                        
                       $menus .= '"leaf": true';
                      
                       if ($children_counter == $children_count) {
                           $menus .= '}';
                       } else {
                           $menus .= '},';
                       }
                   }
                   $menus .= ']';
               } else {
                   $menus .= '"leaf": true';
               }
               if ($menu_counter == $menu_count) {
                   $menus .= '}';
               } else {
                   $menus .= '},';
               }
           }
       }
       $menus .= ']';
       echo $menus;
   }

   function getSystemMenuItem($level = 0, $parent_id = 0)
   {
       $where = array(
           'level' => $level,
           'parent_id'=>$parent_id
       );
      // $user_id = \Auth::user()->id;
      // $groups = getUserGroups($user_id);
     //  $belongsToSuperGroup = belongsToSuperGroup($groups);
       $qry = DB::connection('portal_db')
            ->table('wb_navigation_items as t1')
            ->join('wb_navigation_types  as t2', 't1.navigation_type_id','=','t2.id')
           ->distinct()
           ->select('t1.*', 't2.name as navigation_type')
           ->where($where);

       $menus = $qry->get();
       $menus = convertStdClassObjToArray($menus);

       return $menus;
   }

   function deleteSystemMenuItem(request $req){
       $qry=DB::connection('portal_db')
            ->table($req->table_name)
            ->where('id',$req->id)
            ->first();
        if($qry->level == 0){
           $res=DB::connection('portal_db')
            ->table($req->table_name)
            ->where('parent_id',$req->id)
            ->orWhere('id',$req->id)
            ->delete();
        }else{
         $res=DB::connection('portal_db')
            ->table($req->table_name)
            ->where('id',$req->id)
            ->delete();
        }

        $res=array(
            'message'=> 'Deleted Successfully',
            'success' => true,
            'results' => $res
        );
        return $res;
   }
  function deleteSystemProcess(request $req){
       $qry=DB::connection('portal_db')
            ->table($req->table_name)
            ->where('id',$req->id)
            ->delete();

        $res=array(
            'message'=> 'Deleted Successfully',
            'success' => true,
            'results' => $qry
        );
        return $res;
   }

}
