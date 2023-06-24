<?php

namespace Modules\Configurations\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class ConfigurationsController extends Controller
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

    public function index()
    {
    
        return view('configurations::index');
    }

    public function saveConfigCommonData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->post();
            if (!isset($post_data['model'])) {
                $table_name = $post_data['table_name'];
            } else {
                $table_name = $post_data['model'];

            }
            if($table_name == 'element_costs'){
                
                unset($post_data['section_id']);
            }
            $id = $post_data['id'];
            $unsetData = $req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            unset($post_data['db_con']);
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            
            if (validateIsNumeric($id)) {
               
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
                }else{
                    $res = "Update record not found";
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

     public function getCountryRegions(Request $request)
        {
            $application_code = $request->input('application_code');
            $module_id = $request->input('module_id');
            $query_type = $request->input('query_type');//whether structured or unstructured
            try {
                $regions = DB::table('par_countries as t1')
                        ->leftJoin('par_regions as t2', 't1.id', 't2.country_id')
                        ->where('t1.is_local', 1)
                        ->get();
                $res = array(
                    'success' => true,
                    'results' => $regions,
                    'message' => 'All is well'
                );
            } catch (\Exception $exception) {
                $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
            } catch (\Throwable $throwable) {
                $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
            }
            return \response()->json($res);
        }

    public function saveEditedConfigCommonData(Request $request){
        $request->request->remove('ruleField');
        return $this->saveConfigCommonData($request);

    }
    public function saveDocDefinationrequirement(Request $req){
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->post();
            $table_name = $post_data['table_name'];
            $file = $req->file('document_template');
            
        $document_extension_ids = $req->input('document_extension_ids');
        $document_extension_ids = json_decode($document_extension_ids);
            $id = $post_data['id'];
            $unsetData = $req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['document_template']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']); unset($post_data['document_extension_ids']);
            unset($post_data['unset_data']);
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            $table_data = $this->uploadDocumentRequirementTemplate($req,$table_data);

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
               
                $id = $res['record_id'];

            }
            //save the documetn extension types 
            DB::table('tra_docupload_reqextensions')
                    ->where('documentupload_requirement_id', $id)
                    ->delete();
                if (count($document_extension_ids) > 0) {
                    foreach ($document_extension_ids as $document_extension_id) {
                        $params[] = array(
                            'documentupload_requirement_id' => $id,
                            'document_extensionstype_id' => $document_extension_id,
                            'created_on' => Carbon::now(),
                            'created_by' => \Auth::user()->id
                        );
                    }
                    DB::table('tra_docupload_reqextensions')
                        ->insert($params);
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
        //
        


        //

    }
    function uploadDocumentRequirementTemplate($req,$params){
        $file = $req->file('document_template');
        $user_id = $this->user_id;
        if ($req->hasFile('document_template')) {

            $origFileName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $fileSize = $file->getClientSize();
            
            $origFileName = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $fileSize = $file->getClientSize();
            //$folder = '\resources\uploads';
            $document_root = $_SERVER['DOCUMENT_ROOT'];

            $upload_directory =     $document_root.'/'.Config('constants.dms.system_uploaddirectory');

            $folder = 'document_requirements';
           
            $destination = $upload_directory.$folder;
        
            $savedName = str_random(5) . time() . '.' . $extension;
            
            if($file->move($destination, $savedName)){
                    $document_root = $_SERVER['DOCUMENT_ROOT'];
                    // resize image to fixed size
                    
                    $params['initial_file_name'] = $origFileName;
                    $params['file_name'] = $savedName;
                    $params['file_size'] = formatBytes($fileSize);
                    $params['filetype'] = $extension;
                    $params['document_folder'] = $folder;
                    $params['created_on'] = Carbon::now();
                    $params['created_by'] = $user_id;
                    $params['uploaded_on'] = Carbon::now();
                    $params['uploaded_by'] = $user_id;
                 
            }
           
    }
    return $params;
}
    public function saveSystemModuleData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->post();
            $table_name = 'modules';
            $id = $post_data['id'];
            $unsetData = $req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);

            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
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

    public function getConfigParamFromModel(Request $request)
    {
        $model_name = $request->input('model_name');
        $strict_mode = $request->input('strict_mode');
        try {
            $model = 'Modules\\Configurations\\Entities\\' . $model_name;
            if (isset($strict_mode) && $strict_mode == 1) {
                $results = $model::where('is_enabled', 1)
                    ->get()
                    ->toArray();
            } else {
                $results = $model::all()
                    ->toArray();
            }
            //$results = decryptArray($results);
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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

    public function getChecklistTypes(Request $request)
    {
        $checklist_category = $request->input('checklist_category');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        try {
            $qry = DB::table('par_checklist_types as t1')
                ->join('par_checklist_categories as t2', 't1.checklist_category_id', '=', 't2.id')
                ->join('modules as t3', 't1.module_id', '=', 't3.id')
                ->join('sub_modules as t4', 't1.sub_module_id', '=', 't4.id')
                ->join('par_sections as t5', 't1.section_id', '=', 't5.id')
                ->leftJoin('par_device_types as t6', 't1.device_type_id', '=', 't6.id')
                ->select('t1.*', 't2.name as category_name', 't3.name as module', 't4.name as sub_module', 't5.name as section', 't6.name as device_type_name');
            if (isset($checklist_category) && $checklist_category != '') {
                $qry->where('t1.checklist_category_id', $checklist_category);
            }
            if (isset($module_id) && $module_id != '') {
                $qry->where('t1.module_id', $module_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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

    public function getChecklistItems(Request $request)
    {
        $checklist_type = $request->input('checklist_type');
        try {
            $qry = DB::table('par_checklist_items as t1')
                ->join('par_checklist_types as t2', 't1.checklist_type_id', '=', 't2.id')
                ->select('t1.*', 't2.name as type_name','t2.checklist_category_id');
            if (isset($checklist_type) && $checklist_type != '') {
                $qry->where('t1.checklist_type_id', $checklist_type);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
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

    public function deleteConfigRecord(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = deleteRecord($table_name, $previous_data, $where, $user_id);
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

    public function softDeleteConfigRecord(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = softDeleteRecord($table_name, $previous_data, $where, $user_id);
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

    public function undoConfigSoftDeletes(Request $req)
    {
        try {
            $record_id = $req->input('id');
            $table_name = $req->input('table_name');
            $user_id = \Auth::user()->id;
            $where = array(
                'id' => $record_id
            );
            $previous_data = getPreviousRecords($table_name, $where);
            if ($previous_data['success'] == false) {
                return $previous_data;
            }
            $previous_data = $previous_data['results'];
            $res = undoSoftDeletes($table_name, $previous_data, $where, $user_id);
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

    public function getAllApplicationStatuses(Request $request)
    {
        $module_id = $request->input('module_id');
        try {
            $qry = DB::table('par_application_statuses as t1')
                ->join('modules as t2', 't1.module_id', '=', 't2.id')
                ->leftJoin('sub_modules as t3', 't1.sub_module_id', '=', 't3.id')
                ->leftJoin('par_confirmations as t4', 't1.status', '=', 't4.id')
                ->leftjoin('par_system_statuses as t5', 't1.status_id', '=', 't5.id')
                ->select('t1.*', 't5.name as status_name', 't2.name as module_name', 't4.name as is_initial','t3.name as sub_module_name');
            if (validateIsNumeric($module_id)) {
                $qry->where('t1.module_id', $module_id);
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getPortalAppsInitialStatuses(Request $request)
    {
        $module_id = $request->input('module_id');
        try {
            $qry = DB::table('par_portalapps_initialmis_statuses as t1')
                ->join('modules as t2', 't1.module_id', '=', 't2.id')
                //->leftJoin('sub_modules as t3', 't1.sub_module_id', '=', 't3.id')
                ->join('par_system_statuses as t5', 't1.status_id', '=', 't5.id')
                ->select('t1.*', 't5.name as status_name', 't2.name as module_name');
            if (validateIsNumeric($module_id)) {
                $qry->where('t1.module_id', $module_id);
            }
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->portal_status_type = getSingleRecordColValue('wb_statuses_types', array('id' => $result->portal_statustype_id), 'name', 'portal_db');
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
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

    public function getAlterationParameters()
    {
        try {
            $qry = DB::table('par_alteration_setup as t1')
                ->join('par_confirmations as t2', 't1.is_form_tied', '=', 't2.id')
                ->leftJoin('par_key_forms as t3', 't1.form_id', '=', 't3.id')
                ->join('modules as t4', 't1.module_id', '=', 't4.id')
                ->select('t1.*', 't2.name as form_specific', 't3.name as form_name', 't4.name as module_name');
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
    public function getNonrefParameter(Request $req)
    {
        try {

            $table_name = $req->table_name . ' as t1';
            
            $qry = DB::table($table_name)
                ->select('t1.*');

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


    public function getPayingCurrency(Request $req)
    {
        try {

            $table_name = $req->table_name . ' as t1';

            $qry = DB::table($table_name)
                ->select('t1.*')
                ->where('is_paying_currency', 1);

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

    //function to fetch the registration conditions details
    public function getRegistrationApplicationParameters(Request $req)
    {
        try {

            $filters = $req->input('filters');
            $table_name = $req->table_name . ' as t1';
      
            if($req->table_name == 'par_product_classificationrules'){
                
                
                $qry = DB::table($table_name);

                $qry->join('par_classification_rules as t2', 't1.class_rule_id','=','t2.id')
                                    ->select('t1.*', 't2.name as class_rule', 't2.description as rule_description');
                                    if ($filters != '') {
                                        $filters = (array)json_decode($filters);
                                        $device_type_id = $filters['device_type_id'];
                                        unset($filters['device_type_id']);
                                        $results = $qry->where($filters)->where('t1.device_type_id',$device_type_id);
                                        
                                    }
            }
            else{
                $qry = DB::table($table_name)
                             ->select('t1.*');
                             if ($filters != '') {
                                $filters = (array)json_decode($filters);
                                $results = $qry->where($filters);
                               
                            }
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

    //function to retrieve the certification conditions
    public function getCertificateConditionsApplicationParameters(Request $req)
    {
        try {

            $filters = $req->input('filters');
            $table_name = $req->table_name . ' as t1';

            $qry = DB::table($table_name)
                ->join('par_sections as t2', 't1.section_id', '=', 't2.id')
                ->join('sub_modules as t3', 'sub_module_id', '=', 't3.id')
                ->join('modules as t4', 't1.module_id', '=', 't4.id')
                ->join('par_document_types as t5', 't1.document_type_id', '=', 't5.id')
                ->join('tra_registration_regulations as t6', 't1.regulation_id', '=', 't6.id')
                ->select('t1.*', 't2.name as section_name', 't3.NAME as sub_module_name', 't4.NAME as module_name', 't5.NAME as document_name', 't6.name as regulation_name');

            if ($filters != '') {
                $filters = (array)json_decode($filters);
                $results = $qry->where($filters);
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

    public function getGenericNamesAtcCodes(Request $req)
    {
        try {
            $filters = $req->filters;
            $common_name_id = $req->common_name_id;

            $qry = DB::table('par_atc_codes as t1')
                ->select('t1.*')
                ->where('common_name_id', $common_name_id);


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

     public function getproductApplicationParameters(Request $req)
    {
        try {
            $filters = $req->filters;
            $table_name = $req->table_name . ' as t1';

            if ($req->table_name == 'par_common_names') {
                $qry = DB::table($table_name)
                    ->leftJoin('par_sections as t2', 't1.section_id', '=', 't2.id')
                    ->leftJoin('par_atc_codes as t3', 't1.atc_code_id', '=', 't3.id')
                    ->select('t1.*', 't2.name as section_name', 't3.name as atc_code', 't3.description as atc_code_description');


            } else if ($req->table_name == 'par_classifications') {
                
                $qry = DB::table($table_name)
                    ->leftJoin('par_sections as t2', 't1.section_id', '=', 't2.id')
                    
                    ->leftJoin('par_prodcat_classifications as t5','t1.id','t5.classification_id')
                    ->leftJoin('par_prodclass_categories as t3', 't5.prodclass_category_id', '=', 't3.id')
                    ->select('t1.*', 't2.name as section_name', 't3.name as product_class_category_name');

                    
            }
            else if ($req->table_name == 'par_atc_codes') {
                
                $qry = DB::table($table_name)
                    ->leftJoin('par_common_names as t2', 't1.common_name_id', '=', 't2.id')
                    ->select(DB::raw("t1.id,t1.name, CONCAT_WS(' ' ,t1.name,t2.name) as name"));

                  
            }

              else if ($req->table_name == 'par_confirmations') {
                
                $qry = DB::table($table_name)
                    ->select(DB::raw("t1.*"));

                  
            }

            else if ($req->table_name == 'par_business_types') {
                $qry = DB::table($table_name)
                    ->leftJoin('par_sections as t2', 't1.section_id', '=', 't2.id')
                    ->leftJoin('par_businesstype_categories as t3', 't1.business_typecategory_id', '=', 't3.id')
                    ->select('t1.*', 't2.name as section_name', 't3.name as business_typecategory_name');
            }
             else {

                $qry = DB::table($table_name)
                    ->leftJoin('par_sections as t2', 't1.section_id', '=', 't2.id')
                    ->select('t1.*', 't2.name as section_name');


            }
            if($req->table_name == 'par_common_names'){
                if ($filters != '') {
                    $filters = (array)json_decode($filters);
                    if($filters['section_id']){
                        
                        $section_id = $filters['section_id'];
                       // unset($filters['section_id']);
                       // $filters['t1.section_id'] =  $section_id;

                    }
                    unset($filters['section_id']);
                        $filters['t1.section_id'] =  $section_id;
                    $results = $qry->where($filters);
                }
            } 
            else  if ($filters != '') {
                $filters = (array)json_decode($filters);
                $results = $qry->where($filters);
            }
            //check if section_id is set 
            if(validateIsNumeric($req->section_id)){
                
                $qry->where(array('t1.section_id'=>$req->section_id));
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
public function getConfigParamFromTable(Request $req)
    {
        try {
            $filters = $req->filters;
            $is_config = $req->is_config;
            $table_name = $req->table_name;


            $qry = DB::table($table_name. ' as t1');

            if ($filters != '') {
                $filters = (array)json_decode($filters);
                $filters = array_filter($filters);
                $results = $qry->where($filters);
                if($table_name == 'par_product_subcategories' && isset($filters['prodclass_category_id'])){
                    $qry->leftJoin('par_prodclass_subcategories as t2','t1.id', 't2.product_subcategory_id')
                        ->select('t1.*')
                        ->where('t2.prodclass_category_id', $filters['prodclass_category_id']);
                }else if($table_name == 'par_classifications' && isset($filters['prodclass_category_id'])){
                    $qry->leftJoin('par_prodcat_classifications as t2','t1.id', 't2.classification_id')
                        ->select('t1.*')
                        ->where('t2.prodclass_category_id', $filters['prodclass_category_id']);
                }else if($table_name == 'par_process_classifications' && isset($filters['module_id'])){
                    $qry->leftJoin('par_module_process as t2','t1.id', 't2.process_classification_id')
                        ->select('t1.*')
                        ->where('t2.module_id', $filters['module_id']);
                }else{
                    $results = $qry->where($filters);
                }
            }
            
            if($table_name == 'par_default_currencies'){
                $qry->join('par_currencies as t2','t1.currency_id', 't2.id')
                    ->select('t2.*', 't2.id as currency_id');
            }
        
            if(!validateIsnumeric($is_config)){
                $qry->where('t1.is_enabled', 1);
            }
            $results = $qry->get();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);
    }
    
    public function getproductGeneraicNameParameters(Request $req)
    {
        try {
            $filters = $req->filters;


            $table_name = $req->table_name . ' as t1';

            $qry = DB::table($table_name)
                ->join('par_sections as t2', 't1.section_id', '=', 't2.id')
                ->leftJoin('par_atc_codes as t3', 't1.atc_code_id', '=', 't3.id')
                ->select('t1.*', 't3.name as atc_code', 't3.description as atc_code_description', 't2.name as section_name');

            if ($filters != '') {
                $filters = (array)json_decode($filters);
                $section_id = $filters['section_id'];

                $results = $qry->where(array('t1.section_id' => $section_id));
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

    public function getVariationCategoriesParameters(Request $req)
    {

        try {
            $filters = $req->filters;

            $variation_type_id = $req->variation_type_id;
            $table_name = $req->table_name . ' as t1';

            $qry = DB::table($table_name)
                ->join('par_typeof_variations as t2', 't1.variation_type_id', '=', 't2.id')
                ->join('modules as t3', 't1.module_id', '=', 't3.id')
                ->join('sub_modules as t4', 't1.sub_module_id', '=', 't4.id')
                ->join('par_sections as t5', 't1.section_id', '=', 't5.id')
                ->select('t1.*', 't2.name as type_of_variation', 't3.name as module_name', 't4.name as sub_module_name', 't5.name as section_name');

            if (validateIsNumeric($variation_type_id)) {
                $results = $qry->where(array('t1.variation_type_id' => $variation_type_id));
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

    public function getsystemSubModules(Request $req)
    {
        try {
            $filters = $req->input('filters');
            $module_id = $req->input('module_id');
            $table_name = $req->input('table_name') . ' as t1';

            $qry = DB::table($table_name)
                ->join('modules as t2', 't1.module_id', '=', 't2.id')
                ->select(DB::raw("t1.*,t2.name as module_name"));

            if ($filters != '') {
                $filters = (array)json_decode($filters);
                $module_id = $filters['module_id'];
                $qry->where(array('t1.module_id' => $module_id));
            }
            if (validateIsnumeric($module_id)) {
                $qry->where(array('t1.module_id' => $module_id));
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

    public function getRefnumbersformats(Request $req)
    {
        try {
            $table_name = 'refnumbers_formats as t1';
            $qry = DB::table($table_name)
                ->leftJoin('referencenumbers_types as t2', 't1.refnumbers_type_id', '=', 't2.id')
                ->select('t1.*', 't2.name as refnumbers_type_name');
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

    public function getregistrationexpirytime_span(Request $req)
    {
        try {
            $filters = $req->input('filters');
            $table_name = 'par_registration_expirytime_span as t1';

            $qry = DB::table($table_name)
                ->leftJoin('modules as t2', 't1.module_id', '=', 't2.id')
                ->leftJoin('sub_modules as t3', 't1.sub_module_id', '=', 't3.id')
                ->leftJoin('par_sections as t4', 't1.section_id', '=', 't4.id')
                ->leftJoin('par_timespan_defination as t5', 't1.timespan_defination_id', '=', 't5.id')
                ->select('t1.*', 't2.name as module_name', 't3.name as sub_module_name', 't4.name as section_name', 't5.name as timespan_defination');
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

    public function getsystemModules(Request $req)
    {
        try {
            $filters = $req->filters;

            $table_name = $req->table_name . ' as t1';

            $qry = DB::table($table_name)
                ->select('t1.*');

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

    public function getproductSubCategoryParameters(Request $req)
    {
        try {
            $table_name = $req->table_name . ' as t1';

            $qry = DB::table($table_name)
                ->join('par_sections as t2', 't1.section_id', '=', 't2.id')
                ->join('par_product_categories as t3', 't1.product_category_id', '=', 't3.id')
                ->select('t1.*', 't2.name as section_name', 't3.name as product_category');
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

    public function getSubmoduleRefFormats(Request $request)
    {
        try {
            $sub_module_id = $request->input('sub_module_id');
            $qry = DB::table('tra_submodule_referenceformats as t1')
                ->join('sub_modules as t2', 't1.sub_module_id', '=', 't2.id')
                ->join('referencenumbers_types as t3', 't1.reference_type_id', '=', 't3.id')
                ->join('refnumbers_formats as t4', 't1.reference_format_id', '=', 't4.id')
                ->join('modules as t5', 't1.module_id', '=', 't5.id')
                ->select(DB::raw("t1.*,t2.name as sub_module,t3.name as reference_type,t5.name as module,
                                 CONCAT(t4.name,' (',t4.ref_format,')') as ref_format"));
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

    public function getApplicationSections(Request $request)
    {
        try {
            $qry = DB::table('par_application_sections as t1')
                ->join('sub_modules as t2', 't1.sub_module_id', '=', 't2.id')
                ->join('modules as t3', 't1.module_id', '=', 't3.id')
                ->leftJoin('par_sections as t4', 't1.section_id', '=', 't4.id')
                ->select(DB::raw("t1.*,t2.name as sub_module,t3.name as module,t4.name as section_name"));
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

    public function getUnstructuredQueryChecklistItem(Request $request)
    {

        $filters = $request->input('filters');
        $filters = (array)json_decode($filters);

        try {

            $qry = DB::table('par_checklist_items as t1')
                ->join('par_checklist_types as t2', 't1.checklist_type_id', '=', 't2.id')
                ->join('par_checklist_categories as t3', 't2.checklist_category_id', '=', 't3.id')
                ->select(DB::raw(" t1.*, t2.name as checklist_type, t3.name as checklist_category"));
            if (count((array)$filters) > 0) {
                $qry->where($filters);
            }

            $qry->where(array('is_query' => 1));
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

    public function getUnstructuredQueryChecklistTypes(Request $request)
    {

        $filters = $request->input('filters');
        $filters = (array)json_decode($filters);

        try {

            $qry = DB::table('par_checklist_types as t2')
                ->join('par_checklist_categories as t3', 't2.checklist_category_id', '=', 't3.id')
                ->select(DB::raw(" t2.*"));
            if (count((array)$filters) > 0) {
                $qry->where($filters);
            }

            $qry->where(array('is_query' => 1));
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

    public function getPersonnelDetails(Request $request)
    {
        $table_name = $request->table_name;
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('par_countries as t2', 't1.country_id', 't2.id')
                ->join('par_regions as t3', 't1.region_id', 't3.id')
                ->leftJoin('par_districts as t4', 't1.district_id', 't4.id')
                ->select(DB::raw("t1.*,t2.name as country,t3.name as region,t4.name as district"));

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

    public function getProductClassRules(Request $request)
    {
        try {
            $qry = DB::table('par_product_classificationrules as t1')
                ->join('par_classifications as t2', 't1.classification_id', 't2.id')
                ->leftJoin('par_classification_rules as t3','t1.class_rule_id','t3.id')
                ->leftJoin('par_sections as t5','t1.section_id','t5.id')
                ->leftjoin('par_device_types as t6','t1.device_type_id','t6.id')
                ->select('t1.*', 't2.name as classification_name','t3.name as class_rule_name','t5.name as section_name','t6.name as device_type_name');

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
 public function getClassRulesParameters(Request $request)
    {
        try {
            $qry = DB::table('par_classification_rules as t1')
                ->join('par_device_types as t2', 't1.device_type_id', 't2.id')
                ->select('t1.*', 't2.name as device_type_name');

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
public function getManRolesParameters(Request $request)
    {
        try {
            $qry = DB::table('par_manufacturing_roles as t1')
                ->join('par_sections as t2', 't1.section_id', 't2.id')
                ->select('t1.*', 't2.name as section_name');

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
 public function getApplicationAmmendment(request $req)
   {
    try {
            $qry = DB::table('par_application_ammendment as t1')
                ->join('modules as t2', 't1.module_id', 't2.id')
                ->join('sub_modules as t3', 't1.sub_module_id', 't3.id')
                ->select('t1.*', 't2.name as module_name','t3.name as sub_module_name');

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

    function getConfigDirectors(request $req){
        try {
            if($req->table_name=='tra_directorate_directors'){
                $qry=DB::table('tra_directorate_directors as t1')
                    ->leftJoin('users as t2','t1.user_id','t2.id')
                    ->leftJoin('par_directorates as t3','t1.directorate_id','t3.id')
                    ->select(DB::raw("t1.*,CONCAT(decrypt(t2.first_name),' ',decrypt(t2.last_name)) as user_name,t3.name as directorate_name"));
               }else{
                $qry=DB::table('authority_directors as t1')
                    ->Join('tra_directorate_directors as t2','t1.director_id','t2.id')
                    ->leftJoin('users as t3','t2.user_id','t3.id')
                    ->leftJoin('par_directorates as t4','t2.directorate_id','t4.id')
                    ->select(DB::raw("t1.*,CONCAT(decrypt(t3.first_name),' ',decrypt(t3.last_name)) as user_name,t4.name as directorate_name"));
                  }
              
                $results = $qry->get();
                $results = convertStdClassObjToArray($results);
                $results = decryptArray($results);
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
        public function getDirectoratesUnits(Request $request)
        {
            try {
                $directorate_id = $request->directorate_id;
                $results = DB::table('par_directorates_units as t1')
                    ->select('t1.*', 't2.name as directorate')
                    ->join('par_directorates as t2', 't1.directorate_id', '=', 't2.id');
                
                   if(validateIsNumeric($directorate_id)){
                        $results->where('t1.directorate_id',$directorate_id);
                   }
                    $results =$results->get();
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

    public function getRetentionChargesConfig(Request $req){
        $filters = (array)json_decode($req->filters);
        $filters=array_filter($filters);
        try{
                $qry = DB::table('tra_retentioncharge_config as t1')
                        ->leftJoin('par_sections as t3','t1.section_id','=','t3.id')
                        ->leftJoin('par_prodclass_categories as t4','t1.prodclass_category_id','=','t4.id')
                        ->leftJoin('par_classifications as t5','t1.classification_id','=','t5.id')
                        ->leftJoin('par_product_types as t6','t1.product_type_id','=','t6.id')
                        ->leftJoin('par_fee_types as t7','t1.fee_type_id','=','t7.id')
                        ->leftJoin('element_costs as t8','t1.element_costs_id','=','t8.id')
                        ->leftJoin('cost_elements as t9','t8.element_id','=','t9.id')
                        ->leftJoin('par_currencies as t10','t8.currency_id','=','t10.id')
                        ->select('t1.*','t3.name as section_name','t4.name as prodclass_category_name', 't5.name as classification_name','t6.name as product_type_name','t7.name as fee_type_name','t9.name as element_cost_name', DB::raw("CONCAT(t8.cost,' ',t10.name) as cost_amount"));

            if (count((array)$filters) > 0) {

                    $qry->where($filters);
                }


    
            $qry->where('t1.is_enabled',1);
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

public function getProductInvoiceChargesConfig(Request $req){
        $filters = (array)json_decode($req->filters);
        $filters=array_filter($filters);
        try{
                $qry = DB::table('tra_productregcharge_config as t1')
                        ->leftJoin('par_sections as t3','t1.section_id','=','t3.id')
                        ->leftJoin('par_prodclass_categories as t4','t1.prodclass_category_id','=','t4.id')
                        ->leftJoin('par_classifications as t5','t1.classification_id','=','t5.id')
                        ->leftJoin('par_product_types as t6','t1.product_type_id','=','t6.id')
                        ->leftJoin('par_fee_types as t7','t1.fee_type_id','=','t7.id')
                        ->leftJoin('element_costs as t8','t1.element_costs_id','=','t8.id')
                        ->leftJoin('cost_elements as t9','t8.element_id','=','t9.id')
                        ->leftJoin('par_currencies as t10','t8.currency_id','=','t10.id')
                        ->leftJoin('modules as t11','t1.module_id','=','t11.id')
                        ->leftJoin('sub_modules as t12','t1.sub_module_id','=','t12.id')

                        ->select('t1.*','t3.name as section_name','t4.name as prodclass_category_name', 't5.name as classification_name','t6.name as product_type_name','t7.name as fee_type_name','t9.name as element_cost_name','t11.name as module_name','t12.name as sub_module_name',DB::raw("CONCAT(t8.cost,' ',t10.name) as cost_amount"));

            if (count((array)$filters) > 0) {

                    $qry->where($filters);
                }


    
            $qry->where('t1.is_enabled',1);
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

    public function getPremiseInvoiceChargesConfig(Request $req){
       $filters = (array)json_decode($req->filters);
        $filters=array_filter($filters);
        try{
                $qry = DB::table('tra_premiseregcharge_config as t1')
                        ->leftJoin('par_sections as t3','t1.section_id','=','t3.id')
                        ->leftJoin('par_fee_types as t7','t1.fee_type_id','=','t7.id')
                        ->leftJoin('element_costs as t8','t1.element_costs_id','=','t8.id')
                        ->leftJoin('cost_elements as t9','t8.element_id','=','t9.id')
                        ->leftJoin('par_currencies as t10','t8.currency_id','=','t10.id')
                        ->leftJoin('sub_modules as t12','t1.sub_module_id','=','t12.id')

                        ->select('t1.*','t3.name as section_name','t7.name as fee_type_name','t9.name as element_cost_name','t12.name as sub_module_name',DB::raw("CONCAT(t8.cost,' ',t10.name) as cost_amount"));

            if (count((array)$filters) > 0) {

                    $qry->where($filters);
                }


    
            $qry->where('t1.is_enabled',1);
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

    public function getElementCostWithCurrency(Request $req){
        $filters = (array)json_decode($req->filters);
        $filters=array_filter($filters);
        try{
            $qry = DB::table('element_costs as t1')
                    ->leftjoin('par_currencies as t2','t1.currency_id','t2.id')
                    ->select('t1.*','t2.name as currency_name');
                    
       if (count((array)$filters) > 0) {

                    $qry->where($filters);
                }


    
            $qry->where('t1.is_enabled',1);
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
    public function saveDocumentMasterListConfig(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->post();
            if (!isset($post_data['model'])) {
                $table_name = $post_data['table_name'];

            } else {
                $table_name = $post_data['model'];

            }
            
            $id = $post_data['id'];
            $unsetData = $req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            //generate Code
            $ref_id = $table_data['ref_format_id'];
            $controldocument_type_id = $table_data['controldocument_type_id'];
            $directorate_unit_id = $table_data['directorate_unit_id'];
            $directorate_id = $table_data['directorate_id'];
            //TMDA|/|doc_type_code|/|directorate_code|/|directorate_unit_code|/|doc_serial_number
            $doc_type = DB::table('par_controldocument_types')->where('id',$controldocument_type_id)->select('code')->first();
            $directorate_unit = DB::table('par_directorate_units')->where('id',$directorate_unit_id)->select('code')->first();
            $directorate = DB::table('par_directorates')->where('id',$directorate_id)->select('code')->first();
            $codes_array['doc_type_code'] = $doc_type->code;
            $codes_array['directorate_unit_code'] = $directorate_unit->code;
            $codes_array['directorate_code'] = $directorate->code;
            $codes_array['serial_no'] = $table_data['doc_serial_number'];

            $code = generateRefNumber($codes_array, $ref_id);

            $table_data['code']=$code;
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
                }else{
                    dd('hew');
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

public function getParameterGridColumnsConfig(Request $req)
   {
    $def_id = $req->def_id;
    $param = DB::table('par_parameter_definations')->where('id',$def_id)->first();
    $param_joins = DB::table('par_parameter_join_tables')->where('param_id',$param->id)->get();
    $labels = array();
    foreach ($param_joins as $param_join) {
        $labels[] = $param_join->table_label;
    }
    $param_columns = DB::getSchemaBuilder()->getColumnListing($param->table_name);
    $join_columns = DB::table('par_parameter_join_tables')->select('param_column_name')->where('param_id',$param->id)->get();
   $col_diff = array();
   foreach ($join_columns as $column) {
       $col_diff[] = $column->param_column_name;
   }

    $results = array_merge( $param_columns, $labels);
    
   foreach ($results as $key => $value) {
       if($value == 'is_enabled'){
            unset($results[$key]);
       }
       if($value == 'created_on'){
            unset($results[$key]);
       }
       if($value == 'created_by'){
            unset($results[$key]);
       }
       if($value == 'dola'){
            unset($results[$key]);
       }
       if($value == 'altered_by'){
            unset($results[$key]);
       }
       if($value == 'id'){
            unset($results[$key]);
       }
       if($value == 'altered_on'){
            unset($results[$key]);
       }
       if(in_array($value, $col_diff)){
          unset($results[$key]);
       }
   }
    
    $pure_array = array();
    foreach ($results as $result) {
        $pure_array[] = $result;
    }
     $res = array(
                'success' => true,
                'results' => $pure_array,
                'title' => $param->param_title,
                'table_name'=>$param->table_name,
                'message' => 'All is well'
            );
         return response()->json($res);
   }
public function getParameterGridConfig(Request $req){
    $def_id = $req->def_id;
    $param = DB::table('par_parameter_definations')->where('id',$def_id)->first();
    $param_joins = DB::table('par_parameter_join_tables')->where('param_id',$param->id)->get();

    $qry = DB::table($param->table_name.' as t1')->select('t1.*');
    $join_columns = DB::table('par_parameter_join_tables')->select('param_column_name')->where('param_id',$param->id)->get();
    $col_diff = array();
    foreach ($join_columns as $column) {
       $col_diff[] = $column->param_column_name;
    }
    $t = 2;

    foreach ($param_joins as $joins) {
       if($joins->join_type_id == 1){
         $qry->join($joins->join_table_name.' as t'.$t,'t1.'.$joins->param_column_name,'t'.$t.'.'.$joins->join_column_name);
     }else{
        $qry->leftJoin($joins->join_table_name.' as t'.$t,'t1.'.$joins->param_column_name,'t'.$t.'.'.$joins->join_column_name);
     }
        $qry->addSelect("t".$t.".".$joins->join_disp_column_name." as ".$joins->table_label);
        $t++;
    }
    $results = $qry->get();
   
    
    $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
       return $res; 
   }
public function getParameterFormColumnsConfig(Request $req)
   {
    $def_id = $req->def_id;
    $param = DB::table('par_parameter_definations')->where('id',$def_id)->first();
    $param_joins = DB::table('par_parameter_join_tables')->where('param_id',$param->id)->orderBy('id','ASC')->get();
    $labels = array();
    $child = true;
    $param_column_name=''; 
    $link_column_name = '';
    foreach ($param_joins as $param_join) {
        if($param_join->is_parent == 1){
            $labels[] = array('table'=>$param_join->join_table_name, 'column'=>$param_join->join_column_name,'label'=>$param_join->table_label,'join_disp_column_name'=>$param_join->join_disp_column_name,'param_column_name'=>$param_join->param_column_name,'is_child'=>0);
            $param_column_name = $param_join->param_column_name;
            $link_column_name = $param_join->link_column_name;
        }
        else if($param_join->is_child == 1){
            $labels[] = array('table'=>$param_join->join_table_name, 'column'=>$param_join->join_column_name,'label'=>$param_join->table_label,'join_disp_column_name'=>$param_join->join_disp_column_name,'param_column_name'=>$param_join->param_column_name,'is_child'=>1,'parent_combo_name'=> $param_column_name, 'link_column_name'=>$link_column_name);
            $param_column_name = '';
            $link_column_name = '';
        }else{
             $labels[] = array('table'=>$param_join->join_table_name, 'column'=>$param_join->join_column_name,'label'=>$param_join->table_label,'join_disp_column_name'=>$param_join->join_disp_column_name,'param_column_name'=>$param_join->param_column_name,'is_child'=>0);
        }
    }
    $colums = DB::select('SHOW COLUMNS FROM '.$param->table_name);
    $fields = array();
    foreach ($colums as $column) {
        if($column->Null == 'YES'){
            $fields[] = ['field'=>$column->Field,'null'=>true];
        }else{
            $fields[] = ['field'=>$column->Field,'null'=>false];
        }
        
    }
    //dd($fields);
    $param_columns = $fields;//DB::getSchemaBuilder()->getColumnListing($param->table_name);
    $join_columns = DB::table('par_parameter_join_tables')->select('param_column_name')->where('param_id',$param->id)->get();
    $col_diff = array();
    foreach ($join_columns as $column) {
       $col_diff[] = $column->param_column_name;
    }

    foreach ($param_columns as $key => $value) {
       if($value['field'] == 'is_enabled'){
            unset($param_columns[$key]);
       }
       if($value['field'] == 'created_on'){
            unset($param_columns[$key]);
       }
       if($value['field'] == 'created_by'){
            unset($param_columns[$key]);
       }
       if($value['field'] == 'dola'){
            unset($param_columns[$key]);
       }
       if($value['field'] == 'altered_by'){
            unset($param_columns[$key]);
       }
       if($value['field'] == 'id'){
            unset($param_columns[$key]);
       }
       if($value['field'] == 'altered_on'){
            unset($param_columns[$key]);
       }
       if(in_array($value['field'], $col_diff)){
          unset($param_columns[$key]);
       }
   }
  

    $pure_array = array();
    foreach ($param_columns as $result) {
        $pure_array[] = $result;
    }
$labels = array_reverse($labels);
    $res = array(
                'success' => true,
                'main_fields' => $pure_array,
                'join_fields' => $labels,
                'table_name'=>$param->table_name,
                'message' => 'All is well'
            );
      
         return response()->json($res);
   }
   public function getCountryMappedProcedures(Request $req){
        $assessment_procedure_id = $req->assessment_procedure_id;
        $category = $req->category;
        if(validateIsNumeric($assessment_procedure_id)){
        if(validateIsNumeric($category) && $category == 1){
        $Countries = DB::table('par_countries as t1')
                    ->leftjoin('par_assessment_procedures_countries as t2',function ($join) use ($assessment_procedure_id) {
                        $join->on('t1.id','t2.country_id')
                             ->where('t2.assessment_procedure_id',$assessment_procedure_id);
                        })
                    ->select('t1.id as country_id','t1.name as country_name', 't2.id as is_mapped');
        }else if(validateIsNumeric($category) && $category == 2){
         $Countries = DB::table('par_countries as t1')
                ->leftjoin('par_gmpassessmentprocedure_countries as t2',function ($join) use ($assessment_procedure_id) {
                    $join->on('t1.id','t2.country_id')
                         ->where('t2.gmp_assessment_id',$assessment_procedure_id);
                    })
                ->select('t1.id as country_id','t1.name as country_name', 't2.id as is_mapped');
            }else{
               return array(
                    'success' => false,
                    'message' => 'Assessment category not set either product/gmp'
                );
            }
       
         $result = $Countries->get();
         $res = array(
                    'success'=>true,
                    'message'=>'all is well',
                    'results'=>$result
                );
     }else{
        $res = array(
                    'success'=>false,
                    'message'=>'Please provide an assessment procedure'
                );
     }
    return json_encode($res);
   }
   public function mapProcedureToCountry(Request $req){
        $selected = $req->input('selected');
        $assessment_procedure_id = $req->input('assessment_procedure_id');
        $category = $req->input('category');
        $user = $this->user_id;
        $country_idArray = json_decode($selected);

        DB::beginTransaction();
        try{
            if(validateIsNumeric($category) && $category == 1){
                DB::table('par_assessment_procedures_countries')
                    ->where('assessment_procedure_id',$assessment_procedure_id)
                    ->delete();
                foreach ($country_idArray as $country_id) {
                           
                             $res = insertRecord('par_assessment_procedures_countries', ['assessment_procedure_id'=>$assessment_procedure_id, 'country_id'=>$country_id], $user);
                   
                    }
            }
            else if(validateIsNumeric($category) && $category == 2){
                DB::table('par_gmpassessmentprocedure_countries')
                    ->where('gmp_assessment_id',$assessment_procedure_id)
                    ->delete();
                foreach ($country_idArray as $country_id) {
                           
                             $res = insertRecord('par_gmpassessmentprocedure_countries', ['gmp_assessment_id'=>$assessment_procedure_id, 'country_id'=>$country_id], $user);
                   
                    }  
            }else{
                 DB::rollBack();
                return array(
                    'success' => false,
                    'message' => 'Assessment category not set either product/gmp'
                );
            }
            

            $res = array(
                    'success' => true,
                    'message' => 'Countries Mapped to Procedure(s) successfully'
                );
        DB::commit();
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } 
        catch (\Throwable $throwable) {
               $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    
   }
   public function getOnlineApplicationStatus(Request $req)
   {
       try {
                $results = DB::Connection('portal_db')->table('wb_statuses as t1')->where('has_receiving', 1);
                
                   
                $results =$results->get();
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
   public function saveConfigPortalCommonData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->post();
            if (!isset($post_data['model'])) {
                $table_name = $post_data['table_name'];

            } else {
                $table_name = $post_data['model'];

            }
            $id = $post_data['id'];
            $unsetData = $req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
            $table_data = $post_data;
            //add extra params
            $table_data['created_on'] = Carbon::now();
            $table_data['created_by'] = $user_id;
            $where = array(
                'id' => $id
            );
            
            if (validateIsNumeric($id)) {
               
                if (recordExists($table_name, $where, 'portal_db')) {
                    unset($table_data['created_on']);
                    unset($table_data['created_by']);
                    $table_data['dola'] = Carbon::now();
                    $table_data['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($table_name, $where, 'portal_db');
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id, 'portal_db');
                }else{
                    $res = "Update record not found";
                }
            } else {
               
                $res = insertRecord($table_name, $table_data, $user_id, 'portal_db');
            }
            
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } 
        catch (\Throwable $throwable) {
               $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }
    public function getConfigParamFromPortalTable(Request $req)
    {
        try {
            $filters = $req->filters;
            $table_name = $req->table_name . ' as t1';


            $qry = DB::Connection('portal_db')->table($table_name)
               // ->where('is_enabled',1)
                ->select('t1.*');

            if ($filters != '') {
                $filters = (array)json_decode($filters);
                $filters = array_filter($filters);
                $results = $qry->where($filters);
            }
            
            $results = $qry->get();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } 
        catch (\Throwable $throwable) {
               $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }
    public function saveModuleFeeConfigCommonData(Request $req)
    {
        try{
            $user_id = \Auth::user()->id;
            $post_data = $req->post();
            $db_con = 'mysql';
            $table_name = $post_data['model'];
            if (isset($post_data['db_con']) && $post_data['db_con'] != '') {
                $db_con = $post_data['db_con'];
            }
            unset($post_data['db_con']);
            $id = $post_data['id'];
            $unsetData = $req->input('unset_data');
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['unset_data']);
            if (isset($unsetData)) {
                $unsetData = explode(",", $unsetData);
                $post_data = unsetArrayData($post_data, $unsetData);
            }
            $table_data = $post_data;
            //get mapped element cost 
            $element_where = array(
                'feetype_id' => $table_data['feetype_id'],
                'cost_category_id' => $table_data['cost_category_id'],
                'sub_cat_id' => $table_data['sub_cat_id'],
                'element_id' => $table_data['element_id'],
                'applicationfee_types_id' => $table_data['application_feetype_id'],
                'currency_id' => $table_data['currency_id'],
                'formula' => $table_data['formula']
            );
            
                //unset cost element items
                unset($table_data['feetype_id']);
                unset($table_data['cost_category_id']);
                unset($table_data['sub_cat_id']);
                unset($table_data['element_id']);
                unset($table_data['formula']);
                unset($table_data['is_fast_track']);
                unset($table_data['currency_id']);
                unset($table_data['cost']);
                unset($table_data['costs']);

                unset($table_data['formula_rate']);
                
                //add extra params
                $table_data['created_on'] = Carbon::now();
                $table_data['created_on'] = Carbon::now();
                $table_data['element_costs_id'] = $req->element_costs_id;
                $where = array(
                    'id' => $id
                );
                
                if (validateIsNumeric($id)) {
                   
                    if (recordExists($table_name, $where)) {
                        unset($table_data['created_on']);
                        unset($table_data['created_by']);
                        $table_data['dola'] = Carbon::now();
                        $table_data['altered_by'] = $user_id;
                        $previous_data = getPreviousRecords($table_name, $where, $db_con);
                        if ($previous_data['success'] == false) {
                            return $previous_data;
                        }
                        $previous_data = $previous_data['results'];
                        $res = updateRecord($table_name, $previous_data, $where, $table_data, $user_id, $db_con);
                    }else{
                        $res = "Update record not found";
                    }
                } else {
                    $res = insertRecord($table_name, $table_data, $user_id, $db_con);
                }
            
        }catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } 
        catch (\Throwable $throwable) {
               $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }public function getAppModuleFeeConfig(Request $req)
    {
        $user_id = \Auth::user()->id;
        $module_id = $req->module_id;
        try{
            $qry = DB::table('tra_appmodules_feesconfigurations as t1')
                ->leftJoin('modules as t2', 't1.module_id', 't2.id')
                ->leftJoin('sub_modules as t3', 't1.sub_module_id', 't3.id')
                ->leftJoin('par_sections as t4', 't1.section_id', 't4.id')
                ->leftJoin('par_assessmentprocedure_types as t5', 't1.assessmentprocedure_type_id', 't5.id')
                ->leftJoin('par_prodclass_categories as t6', 't1.prodclass_category_id', 't6.id')
                ->leftJoin('par_product_subcategories as t7', 't1.product_subcategory_id', 't7.id')
                ->leftJoin('par_product_origins as t9', 't1.product_origin_id', 't9.id')
                ->leftJoin('par_applicationfee_types as t10', 't1.application_feetype_id', 't10.id')
                ->leftJoin('par_classifications as t11', 't1.classification_id', 't11.id')
                ->leftJoin('tra_element_costs as t12', 't1.element_costs_id', 't12.id')
                ->leftJoin('par_currencies as t14', 't12.currency_id', 't14.id')
                ->leftJoin('par_fee_types as t15', 't12.feetype_id', 't15.id')
                ->leftJoin('par_cost_categories as t16', 't12.cost_category_id', 't16.id')
                ->leftJoin('par_cost_sub_categories as t17', 't12.sub_cat_id', 't17.id')
                ->leftJoin('par_cost_elements as t18', 't12.element_id', 't18.id')
                ->leftJoin('par_premises_types as t20', 't1.premise_type_id', 't20.id')
                ->leftJoin('par_gmplocation_details as t21', 't1.gmp_type_id', 't21.id')
                ->leftJoin('par_importexport_permittypes as t22', 't1.importexport_permittype_id', 't22.id')
                ->leftJoin('par_advertisement_types as t23', 't1.advertisement_type_id', 't23.id')
                ->leftJoin('par_investigationprod_classifications as t24', 't1.investigationprod_classification_id', 't24.id')
                ->leftJoin('par_product_categories as t25', 't1.product_category_id', 't25.id')
                ->select('t12.*', 't2.name as module','t25.name as product_category', 't3.name as sub_module', 't4.name as section','t12.cost as costs',
                't5.name as assessment_proceduretype', 't6.name as prodclass_category','t24.name as investigationprod_classification', 't18.name as cost_element', 't7.name as product_subcategory', 't9.name as product_origin', 't10.name as applicationfeetype', 't1.*', 't11.name as classification_name','t15.name as fee_type','t16.name as cost_category','t17.name as cost_sub_category', DB::raw("CONCAT(t12.cost,' (',t14.name,')') as element_cost"),'t20.name as premise_type', 't21.name as gmp_type','t23.name as advertisement_type', 't22.name as importexport_permittype');
            if(validateIsNumeric($module_id)){
                $qry->where('t1.module_id', $module_id);
            }
            
            $results = $qry->get();
            $res = array(
                'success'=>true,
                'message'=>'All is well',
                'results'=>$results
            );
        }
        catch (\Exception $exception) {
                $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
            } 
        catch (\Throwable $throwable) {
                   $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
            }
        return response()->json($res);
    }
   public function getNewInvoiceQuotation(Request $req){
        $module_id = $req->module_id;
        $sub_module_id = $req->sub_module_id;
        $section_id = $req->section_id;
        $assessment_procedure_id = $req->assessment_procedure_id;
        $classification_id = $req->classification_id;
        $prodclass_category_id = $req->prodclass_category_id;
        $prodclass_subcategory_id = $req->prodclass_subcategory_id;
        $product_origin_id = $req->product_origin_id;
        $applicationfeetype = $req->applicationfeetype;
        $element_data = DB::table('tra_element_costs')->first();
        //where
        $res = array('success'=>true, 'results'=>$element_data, 'message'=>'all is well');
        return response()->json($res);
   }
}
