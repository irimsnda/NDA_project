<?php

namespace Modules\Surveillance\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;


class SurveillanceController extends Controller
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
        return view('surveillance::index');
    }
    
    
    
    public function saveSurveillanceCommonData(Request $req)
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
            unset($post_data['unset_data']);
            $unsetData = $req->input('unset_data');
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
            $res = array();
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

    public function deleteSurveillanceRecord(Request $req)
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
    public function saveSurveillancePlansDetailsCommonData(Request $req)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $req->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $district_ids = $post_data['district_ids'];
            $district_ids = json_decode($district_ids);
            $params = array();
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['district_ids']);
            
            unset($post_data['unset_data']);
            $unsetData = $req->input('unset_data');
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
            if (count($district_ids) > 0) {
                foreach ($district_ids as $district_id) {
                    
                    $table_data['district_id'] = $district_id;
                    $res = insertRecord($table_name, $table_data, $user_id);

                }
            }
            else{
                $res = array('success'=>false,'message'=>'Data Saved Successfully');
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
    public function savePmsProgramSamplingSite(Request $request)
    {
        
        $program_id = $request->input('program_id');
        $site_level_id = $request->input('site_level_id');

        $sampling_site_ids = $request->input('sampling_site_ids');
        
        $user_id = $this->user_id;
        $res = array();
        try {
            DB::transaction(function () use ($program_id, $sampling_site_ids,$site_level_id, &$res) {
                $sampling_site_ids = json_decode($sampling_site_ids);
                $params = array();
              
                if (count($sampling_site_ids) > 0) {
                    foreach ($sampling_site_ids as $sampling_site_id) {
                        $where = array(
                            'program_id' => $program_id,
                            'site_level_id'=>$site_level_id,
                            'sampling_site_id' => $sampling_site_id
                        );
                        $count = DB::table('pms_program_samplingsites')
                            ->where($where)
                            ->count();
                            if($count == 0){
                                $params[] = array(
                                    'program_id' => $program_id,
                                    'site_level_id'=>$site_level_id,
                                    'sampling_site_id' => $sampling_site_id,
                                    'created_on' => Carbon::now(),
                                    'created_by' => \Auth::user()->id
                                );
                            }
                      
                       
                    }
                    DB::table('pms_program_samplingsites')
                        ->insert($params);
                }
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Data saved successfully!!'
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
    public function savePmsProgramRegions(Request $request)
    {
        
        $program_id = $request->input('program_id');
       
        $region_ids = $request->input('region_ids');
        $user_id = $this->user_id;
        $res = array();
        try {
            DB::transaction(function () use ($program_id, $region_ids, &$res) {
                $region_ids = json_decode($region_ids);
                $params = array();
              
                if (count($region_ids) > 0) {
                    foreach ($region_ids as $region_id) {
                        $where = array(
                            'program_id' => $program_id,
                            'region_id' => $region_id
                        );
                        $count = DB::table('pms_program_regions')
                            ->where($where)
                            ->count();
                            if($count == 0){
                                $params[] = array(
                                    'program_id' => $program_id,
                                    'region_id' => $region_id,
                                    'created_on' => Carbon::now(),
                                    'created_by' => \Auth::user()->id
                                );
                            }
                      
                       
                    }
                    DB::table('pms_program_regions')
                        ->insert($params);
                }
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Data saved successfully!!'
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
    
    /*


    */
    public function savePmsProgramProducts(Request $request)
    {
        
        $program_id = $request->input('program_id');
        $product_ids = $request->input('product_ids');
        $user_id = $this->user_id;
        $res = array();
        try {
            DB::transaction(function () use ($program_id, $product_ids, &$res) {
                $product_ids = json_decode($product_ids);
                $params = array();
              
                if (count($product_ids) > 0) {
                    foreach ($product_ids as $product_id) {
                        $where = array(
                            'program_id' => $program_id,
                            'product_id' => $product_id
                        );
                        $count = DB::table('pms_program_products')
                            ->where($where)
                            ->count();
                            if($count == 0){
                                $params[] = array(
                                    'program_id' => $program_id,
                                    'product_id' => $product_id,
                                    'created_on' => Carbon::now(),
                                    'created_by' => \Auth::user()->id
                                );
                            }
                      
                       
                    }
                    DB::table('pms_program_products')
                        ->insert($params);
                }
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Data saved successfully!!'
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

    
    public function getPmsProgramSamplingSitesLevels(Request $request)
    {
        $program_id = $request->input('program_id');
        $site_level_id = $request->input('site_level_id');
        try {

            $qry = DB::table('pms_program_samplingsites as t1')
                ->join('par_site_levels as t3', 't1.site_level_id', '=', 't3.id')
                ->select('t1.*',  't3.name as site_level')
                ->where('t1.program_id', $program_id)
                ->groupBy('t3.id');
            
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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
    public function getPmsProgramSamplingSites(Request $request)
    {
        $program_id = $request->input('program_id');
        $site_level_id = $request->input('site_level_id');
        $filters = $request->input('filter');
        
        try {

            $qry = DB::table('pms_program_samplingsites as t1')
                ->join('par_business_types as t2', 't1.sampling_site_id', '=', 't2.id')
                ->leftJoin('par_site_levels as t3', 't1.site_level_id', '=', 't3.id')
                ->select('t1.*', 't2.name as sampling_site', 't3.name as site_level');

                if(validateIsNumeric($program_id)){
                    $qry->where('t1.program_id',$program_id);
                }
                
            if(validateIsNumeric($site_level_id)){
                $qry->where('site_level_id',$site_level_id);
            }
            
            if ($filters != '') {
                $filters = (array)json_decode($filters);
             
                $qry->where($filters);
                
            }
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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
    public function getPmsProgramRegions(Request $request)
    {
        $program_id = $request->input('program_id');
        try {
            $qry = DB::table('pms_program_regions as t1')
                ->join('par_regions as t2', 't1.region_id', '=', 't2.id')
                ->select('t1.*', 't2.name as region_name')
                ->where('t1.program_id', $program_id);
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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

    public function getPmsProgramProducts(Request $request)
    {
        $program_id = $request->input('program_id');
        try {
            $qry = DB::table('pms_program_products as t1')
                ->join('par_common_names as t2', 't1.product_id', '=', 't2.id')
                ->select('t1.*', 't2.name as product_name')
                ->where('t1.program_id', $program_id);
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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
    
    public function getPmsProgramsImplementationDetails(Request $request)
    {
        $program_id = $request->input('program_id');
        $program_implementation_id = $request->program_implementation_id;
        $zone_id = $request->zone_id;
        
        try {
            $qry = DB::table('pms_program_implementationplan as t12')
                ->join('pms_program_details as t13', 't12.program_id', '=', 't13.id')
                ->join('pms_program_plans as t1', 't1.program_implementation_id', '=', 't12.id')
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
                ->leftJoin('par_site_levels as t14', 't1.site_level_id', '=', 't14.id')
                ->select(DB::raw("t14.name as site_level, t12.*, t13.name as program_name,t13.description as program_description, t13.start_date, t13.end_date, t12.program_id,t12.id as program_implementation_id,  t12.program_id as pms_program_id,t1.*,t2.name as sampling_site,t3.name as product,t4.name as category_name,t5.name as dosage_form,t13.name as pms_program,
                t13.start_date,t13.end_date,CONCAT_WS(' of ',t7.name,CONCAT(t1.unit_pack,t8.name)) as pack,CONCAT(t1.strength,t6.name) as strength_txt,
                         t51.name as product_form,t52.name as device_type,(t1.number_of_brand*t1.number_of_batch*t1.number_of_unitpack) as total_samples,t1.id as pms_plan_id, t10.name as region_name, t11.name as district_name"));// t2
            if (validateIsNumeric($program_id)) {
                $qry->where('t1.program_id', $program_id);
            }
            if (validateIsNumeric($program_implementation_id)) {
                $qry->where('t12.id', $program_implementation_id);
            }
            if (validateIsNumeric($zone_id)) {
                $qry->where('t10.zone_id', $zone_id);
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
        return response()->json($res);
    }
    public function getPmsProgramsImplementation(Request $request)
    {
        $program_id = $request->input('program_id');
        $section_id = $request->section_id;
        try {
            $qry = DB::table('pms_program_implementationplan as t1')
                ->join('pms_program_details as t2', 't1.program_id', '=', 't2.id')
                ->select('t1.*', 't2.name as program_name','t2.description as program_description', 't2.start_date', 't2.end_date', 't1.program_id','t1.id as program_implementation_id',  't1.program_id as pms_program_id' );//
            if (isset($program_id) && is_numeric($program_id)) {
                $qry->where('t1.program_id', $program_id);
            }
            if (validateIsNumeric($section_id)) {
                $qry->where('t2.section_id', $section_id);
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
        return response()->json($res);
    }
    public function getPmsPrograms(Request $request)
    {
        $section_id = $request->input('section_id');
        try {
            $qry = DB::table('pms_program_details as t1')
                ->join('par_sections as t2', 't1.section_id', '=', 't2.id')
                ->select('t1.*', 't2.name as section_name', 't1.name as pms_program','t1.id as program_id',  't1.id as pms_program_id');//
            if (isset($section_id) && is_numeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
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
        return response()->json($res);
    }

    public function getPmsProgramPlans(Request $request)
    {
        $program_implementation_id = $request->input('program_implementation_id');
        $section_id = $request->input('section_id');
        try {
            $qry = DB::table('pms_program_plans as t1')
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
                ->select(DB::raw("t1.*,t2.name as sampling_site,t3.name as product,t4.name as category_name,t5.name as dosage_form,t9.name as pms_program,
                         t9.start_date,t9.end_date,CONCAT_WS(' of ',t7.name,CONCAT(t1.unit_pack,t8.name)) as pack,CONCAT(t1.strength,t6.name) as strength_txt,
                         t51.name as product_form,t52.name as device_type,(t1.number_of_brand*t1.number_of_batch*t1.number_of_unitpack) as total_samples,t1.id as pms_plan_id, t10.name as region_name, t11.name as district_name"));
            
            if (validateIsNumeric($program_implementation_id)) {
                $qry->where('t1.program_implementation_id', $program_implementation_id);
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

    public function getSurveillanceApplications(Request $request)
    {
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);
        try {
            $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            $qry = DB::table('tra_surveillance_applications as t1')
                ->join('tra_samplecollection_sites as t2', 't1.sample_site_id', '=', 't2.id')
                ->join('par_zones as t3', 't1.zone_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->join('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('par_directorates as t7', 't1.directorate_id', '=', 't7.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as premise_name,
                    t6.name as application_status, t3.name as zone, t7.name as directorate, t4.name as process_name, t5.name as workflow_stage, t5.is_general,
                    t2.*, t1.*,t2.name as sample_site"))
                ->where('t1.is_dismissed', '<>', 1);
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($workflow_stage_id) && $workflow_stage_id != '') {
                $qry->where('t1.workflow_stage_id', $workflow_stage_id);
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

    public function getDismissedSurveillanceApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $qry = DB::table('tra_dismissed_applications as t11')
                ->join('tra_surveillance_applications as t1', 't11.application_code', '=', 't1.application_code')
                ->join('tra_samplecollection_sites as t2', 't1.sample_site_id', '=', 't2.id')
                ->join('par_zones as t3', 't1.zone_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->join('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('par_directorates as t7', 't1.directorate_id', '=', 't7.id')
                ->join('users as t8', 't11.dismissal_by', '=', 't8.id')
                ->join('par_applicationdismissal_reasons as t9', 't11.dismissal_reason_id', '=', 't9.id')
                ->join('sub_modules as t10', 't1.sub_module_id', '=', 't10.id')
                ->select(DB::raw("t1.*, t2.name as sample_site, t3.name as zone, t6.name as application_status,t10.name as sub_module_name,
                    t7.name as directorate,t1.id as active_application_id,t5.name as workflow_stage,t9.name as dismissal_reason,
                    t11.dismissal_date,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as author"));
            if (validateIsNumeric($section_id)) {
                $qry->where('t11.section_id', $section_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t11.sub_module_id', $sub_module_id);
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

    public function getManagerApplicationsGeneric(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table('tra_surveillance_applications as t1')
                ->join('tra_samplecollection_sites as t2', 't1.sample_site_id', '=', 't2.id')
                ->join('par_zones as t3', 't1.zone_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't1.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't1.workflow_stage_id', '=', 't5.id')
                ->join('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('par_directorates as t7', 't1.directorate_id', '=', 't7.id')
                ->leftJoin('tra_approval_recommendations as t8', function ($join) {
                    $join->on('t1.id', '=', 't8.application_id')
                        ->on('t1.application_code', '=', 't8.application_code');
                })
                ->leftJoin('par_approval_decisions as t9', 't8.decision_id', '=', 't9.id')
                ->select(DB::raw("t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as premise_name,
                    t6.name as application_status, t3.name as zone, t7.name as directorate, t4.name as process_name, t5.name as workflow_stage, t5.is_general,
                    t2.*, t1.*,t2.name as sample_site,t9.name as approval_status, t8.decision_id"))
                ->where('t1.workflow_stage_id', $workflow_stage);
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

    public function saveNewReceivingBaseDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $sample_site_id = $request->input('sample_site_id');
        $process_id = $request->input('process_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $zone_id = $request->input('zone_id');
        $directorate_id = $request->input('directorate_id');
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $pms_plan_id = $request->input('pms_plan_id');

        $sampling_site_id = $request->input('sampling_site_id');
        $district_id = $request->input('district_id');
        $region_id = $request->input('region_id');
        $program_id = $request->input('program_id');

        $program_implementation_id = $request->input('program_implementation_id');

        $user_id = $this->user_id;
        $samplesite_params = array(
            'name' => $request->input('name'),
            'section_id' => $section_id,
            'country_id' => $request->input('country_id'),
            'region_id' => $request->input('region_id'),
            'district_id' => $request->input('district_id'),
            'street' => $request->input('street'),
            'telephone' => $request->input('telephone'),
            'fax' => $request->input('fax'),
            'email' => $request->input('email'),
            'website' => $request->input('website'),
            'physical_address' => $request->input('physical_address'),
            'postal_address' => $request->input('postal_address'),
            'business_scale_id' => $request->input('business_scale_id'),
            'longitude' => $request->input('longitude'),
            'latitude' => $request->input('latitude')
        );
        DB::beginTransaction();
        try {
            $samplesite_table = 'tra_samplecollection_sites';
            $applications_table = 'tra_surveillance_applications';

            $where_samplesite = array(
                'id' => $sample_site_id
            );
            $where_app = array(
                'id' => $application_id
            );
            if (validateIsNumeric($application_id)) {//Edit
                //Application_edit
                $application_params = array(
                    'zone_id' => $zone_id,
                    'directorate_id' => $directorate_id,
                    'region_id' => $region_id,
                    
                    'program_implementation_id' => $program_implementation_id,
                    'district_id' => $district_id,
                    'program_id' => $program_id,
                    'sampling_site_id' => $sampling_site_id,
                    'sample_site_id' => $sample_site_id
                );
                $app_details = array();
                if (recordExists($samplesite_table, $where_samplesite)) {
                    $samplesite_params['dola'] = Carbon::now();
                    $samplesite_params['altered_by'] = $user_id;
                    $previous_data = getPreviousRecords($samplesite_table, $where_samplesite);
                    if ($previous_data['success'] == false) {
                        return $previous_data;
                    }
                    $previous_data = $previous_data['results'];
                    $res = updateRecord($samplesite_table, $previous_data, $where_samplesite, $samplesite_params, $user_id);
                }
                else{
                    $samplesite_res = insertRecord($samplesite_table, $samplesite_params, $user_id);
                    if ($samplesite_res['success'] == false) {
                        return \response()->json($samplesite_res);
                    }
                    $sample_site_id = $samplesite_res['record_id'];

                    $application_params['sample_site_id'] = $sample_site_id;
                }
                if (recordExists($applications_table, $where_app)) {
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    $res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);
                    if ($res['success'] == false) {
                        return $res;
                    }
                }
                $application_code = $app_details[0]['application_code'];
                $ref_no = $app_details[0]['reference_no'];
                //Sample site_edit
               
              
            } else {//Create
                //Sample site_create
                $samplesite_res = insertRecord($samplesite_table, $samplesite_params, $user_id);
                if ($samplesite_res['success'] == false) {
                    return \response()->json($samplesite_res);
                }
                $sample_site_id = $samplesite_res['record_id'];
                //Application_create
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $sub_module_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code');
                $codes_array = array(
                    'section_code' => $section_code,
                    'zone_code' => $zone_code,
                    'sub_module_code' => $sub_module_code
                );
                $view_id = generateApplicationViewID();
                $reference_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id, $user_id, true);
                if ($reference_details['success'] == false) {
                    return \response()->json($reference_details);
                }
                $ref_no = $reference_details['tracking_no'];
                $application_code = generateApplicationCode($sub_module_id, $applications_table);
                $application_status = getApplicationInitialStatus($module_id, $sub_module_id);
                if ($application_status->status_id == '') {
                    $res = array(
                        'success' => false,
                        'message' => 'Please set initial application status of the application!!'
                    );
                    return \response()->json($res);
                }
                $application_params = array(
                    'module_id' => $module_id,
                    'view_id' => $view_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_code' => $application_code,
                    'zone_id' => $zone_id,
                    'sample_site_id' => $sample_site_id,
                    'directorate_id' => $directorate_id,
                    'process_id' => $process_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    'reference_no' => $ref_no,
                    'region_id' => $region_id,
                    'stage_id' => 1,
                    'program_implementation_id' => $program_implementation_id,
                    'district_id' => $district_id,
                    'program_id' => $program_id,
                    'sampling_site_id' => $sampling_site_id,
                    'application_status_id' => $application_status->status_id
                );
                $res = insertRecord($applications_table, $application_params, $user_id);
                if ($res['success'] == false) {
                    return $res;
                }
                $application_id = $res['record_id'];
                //insert registration table
                $reg_params = array(
                    'tra_surveillance_id' => $application_id,
                    'created_by' => $user_id
                );

                createInitialRegistrationRecord('registered_surveillance', $applications_table, $reg_params, $application_id, 'reg_surveillance_id');

                //DMS message
                //initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_no, $user_id);

                //add to submissions table
                $submission_params = array(
                    'application_id' => $application_id,
                    'view_id' => $view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_code,
                    'reference_no' => $ref_no,
                    'usr_from' => $user_id,
                    'usr_to' => $user_id,
                    'previous_stage' => $workflow_stage_id,
                    'current_stage' => $workflow_stage_id,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status->status_id,
                    'urgency' => 1,
                    'applicant_id' => 0,
                    'remarks' => 'Initial save of the application',
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                DB::table('tra_submissions')
                    ->insert($submission_params);
            }
            DB::commit();
            $res['record_id'] = $application_id;
            $res['application_code'] = $application_code;
            $res['sample_site_id'] = $sample_site_id;
            $res['reference_no'] = $ref_no;
        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    //prepare functions
    public function prepareStructuredPmsReceivingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $mainQry = DB::table('tra_surveillance_applications as t1')
                ->where('t1.id', $application_id);
            $pmsQry = clone $mainQry;
            $pmsQry->join('pms_program_implementationplan as t2', 't1.program_implementation_id', '=', 't2.id')
                ->join('pms_program_details as t3', 't2.program_id', '=', 't3.id')
                ->select('t2.*','t3.name as program_name','t3.description as program_description', 't3.*','t2.implementationstart_date', 't2.implementationend_date', 't2.program_implementation', 't3.id as pms_program_id', 't2.id as program_implementation_id', 't3.name as pms_program', 't1.sampling_site_id', 't1.district_id', 't1.region_id');
            $sampleSiteQry = clone $mainQry;
            $sampleSiteQry->leftJoin('tra_samplecollection_sites as t4', 't1.sample_site_id', '=', 't4.id');

            $mainResults = $mainQry->first();
            $pmsResults = $pmsQry->first();
            $sampleSiteResults = $sampleSiteQry->first();
            $res = array(
                'success' => true,
                'mainResults' => $mainResults,
                'pmsResults' => $pmsResults,
                'sampleSiteResults' => $sampleSiteResults,
                'message' => 'Records fetched successfully'
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

    public function prepareStructuredPmsTCMeetingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('tc_meeting_applications as t2', function ($join) {
                    $join->on('t1.application_code', '=', 't2.application_code');
                })
                ->join('tc_meeting_details as t3', 't2.meeting_id', '=', 't3.id')
                ->select(DB::raw("t3.*"))
                ->where('t1.id', $application_id);
            $results = $qry->first();
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

    public function saveSurveillanceSampleDetails(Request $request)
    {
        $sample_id = $request->input('sample_id');
        $application_id = $request->input('application_id');
        $post_data = $request->input();
        $user_id = $this->user_id;
        unset($post_data['section_id']);
        unset($post_data['sample_id']);
        unset($post_data['isReadOnly']);
        unset($post_data['sample_appcode']);
        $table_name = 'tra_surveillance_sample_details';
        try {
            if (isset($sample_id) && is_numeric($sample_id)) {
                $where = array('id' => $sample_id);
                $previous_data = getPreviousRecords($table_name, $where);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $res = updateRecord($table_name, $previous_data['results'], $where, $post_data, $user_id);
            } else {
                $application_details = getTableData('tra_surveillance_applications', array('id' => $application_id));
                if (is_null($application_details)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered getting application details, try again'
                    );
                    return \response()->json($res);
                }
                $group_ref_no = $application_details->reference_no;
                $serial_no = DB::table('tra_surveillance_sample_details')
                    ->where('application_id', $application_id)
                    ->count();
                $serial_no = $serial_no + 1;
                $codes_array = array(
                    'group_ref_no' => $group_ref_no,
                    'serial_no' => $serial_no,
                );
                $sample_appcode = $application_details->application_code . $serial_no;
                $sample_refno = generateRefNumber($codes_array, 23);
                $post_data['sample_refno'] = $sample_refno;
                $post_data['sample_appcode'] = $sample_appcode;
                $res = insertRecord($table_name, $post_data, $user_id);
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
        return \response()->json($res);
    }

    public function surveillanceApplicationSamplesQry()
    {
        $qry = DB::table('tra_surveillance_sample_details as t1')
            ->join('tra_surveillance_applications as t2', 't1.application_id', '=', 't2.id')
            ->leftJoin('tra_manufacturers_information as t5', 't1.manufacturer_id', '=', 't5.id')
            ->leftJoin('par_storage_conditions as t6', 't1.storage_condition_id', '=', 't6.id')
            ->leftJoin('par_seal_types as t7', 't1.seal_condition_id', '=', 't7.id')
            ->leftJoin('par_samplingreasons as t8', 't1.sampling_reason_id', '=', 't8.id')
            ->leftJoin('users as t9', 't1.sample_collector_id', '=', 't9.id')
            ->leftJoin('par_sample_application_types as t10', 't1.sample_application_id', '=', 't10.id')
            
            ->leftJoin('pms_program_plans as t11', 't1.pms_plan_id', '=', 't11.id')
            
            ->leftJoin('par_business_types as t12', 't11.sampling_site_id', '=', 't12.id')
            ->leftJoin('par_common_names as t13', 't11.product_id', '=', 't13.id')
            ->select(DB::raw("t1.*,t1.id as sample_id,  t12.name as sampling_site,t13.name as product,  t1.sample_name as brand_name,t5.name as manufacturer,t6.name as storage, 
                    t7.name as seal_condition,t8.name as sampling_reason,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as collector,t10.name as sample_type,
                    t2.section_id,t1.batch_no as batchno,t1.manufacturing_date as manufacturedate,t1.expiry_date as expirydate,t1.packaging_size as pack_size,t1.packaging_units_id as pack_unit_id, t11.*"));
        return $qry;
    }

    public function getPmsApplicationSamplesReceiving(Request $request)
    {
        $application_id = $request->input('application_id');
        $stage_id = $request->input('stage_id');
        try {
            $qry = $this->surveillanceApplicationSamplesQry()
                ->where('t1.application_id', $application_id);
            if (isset($stage_id) && is_numeric($stage_id)) {
                $qry->where('t1.stage_id', $stage_id);
            }
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->dosage_form = getSingleRecordColValue('par_dosage_forms', array('id' => $result->dosage_form_id), 'name', 'mysql');
                $results[$key]->product_form = getSingleRecordColValue('par_product_forms', array('id' => $result->product_form_id), 'name', 'mysql');
                $results[$key]->device_type = getSingleRecordColValue('medicaldevices_types', array('id' => $result->device_type_id), 'name', 'mysql');
                $results[$key]->class = getSingleRecordColValue('par_classifications', array('id' => $result->classification_id), 'name', 'mysql');
                $results[$key]->packaging_unit = getSingleRecordColValue('par_packaging_units', array('id' => $result->packaging_units_id), 'name', 'mysql');
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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

    public function getPmsApplicationSamplesLabStages(Request $request)
    {
        $application_id = $request->input('application_id');
        $analysis_type_id = $request->input('analysis_type_id');
        $recommendation_id = $request->input('recommendation_id');
        $stage_id = $request->input('stage_id');
        try {
            DB::enableQueryLog();
            $qry = $this->surveillanceApplicationSamplesQry()
                ->leftJoin('tra_pmslabresult_recommendations as t21', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't21.sample_id')
                        ->where('t21.analysis_type_id', $analysis_type_id);
                })
                ->leftJoin('tra_sampleanalysis_requests as t24', function ($join) use ($analysis_type_id) {
                    $join->on('t2.application_code', '=', 't24.application_code')
                        ->where('t24.analysis_type_id', $analysis_type_id);
                })
                ->leftJoin('par_sampleanalysis_status as t25', 't24.status_id', '=', 't25.id');

            if ($analysis_type_id == 1) {//PIR
                $qry->leftJoin('par_pmsevaluation_decisions as t22', 't21.decision_id', '=', 't22.id');
            } else if ($analysis_type_id == 2) {//Screening
                $qry->leftJoin('par_pmsscreening_decisions as t22', 't21.decision_id', '=', 't22.id');
            } else if ($analysis_type_id == 3) {//TC Meeting
                $qry->leftJoin('par_pmstcmeeting_decisions as t22', 't21.decision_id', '=', 't22.id');
            } else if ($analysis_type_id == 4) {//Conformatory
                $qry->leftJoin('par_pmsanalysis_decisions as t22', 't21.decision_id', '=', 't22.id');
            }else if ($analysis_type_id == 6) {//Conformatory
                $qry->leftJoin('par_pmsevaluation_decisions as t22', 't21.decision_id', '=', 't22.id');
            }
            $qry->addSelect('t21.id as recomm_id','t22.name as sample_analysis_status', 't21.decision_id', 't21.comments as results_comments', 't22.name as recommendation')
                ->where('t1.application_id', $application_id);
            if (validateIsNumeric($stage_id)) {
                $qry->where('t1.stage_id', $stage_id);
            }
            if (validateIsNumeric($recommendation_id)) {
                $qry->where('t22.id', $recommendation_id);
            }
            $results = $qry->get();
           // print_r(DB::getQueryLog());
            
            foreach ($results as $key => $result) {
                $results[$key]->dosage_form = getSingleRecordColValue('par_dosage_forms', array('id' => $result->dosage_form_id), 'name', 'mysql');
                $results[$key]->product_form = getSingleRecordColValue('par_product_forms', array('id' => $result->product_form_id), 'name', 'mysql');
                $results[$key]->device_type = getSingleRecordColValue('medicaldevices_types', array('id' => $result->device_type_id), 'name', 'mysql');
                $results[$key]->class = getSingleRecordColValue('par_classifications', array('id' => $result->classification_id), 'name', 'mysql');
                $results[$key]->packaging_unit = getSingleRecordColValue('par_packaging_units', array('id' => $result->packaging_units_id), 'name', 'mysql');
            }
            
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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

    public function getPmsApplicationSamplesApprovalStages(Request $request)
    {
        $application_id = $request->input('application_id');
        $analysis_type_id = $request->input('analysis_type_id');
        $recommendation_id = $request->input('recommendation_id');
        $stage_id = $request->input('stage_id');
        if($analysis_type_id == 1){
            $recomm_table = 't21';
        }
        else if($analysis_type_id == 2){
            $recomm_table = 't22';
        }
        else if($analysis_type_id == 3){
            $recomm_table = 't23';
        }
        else if($analysis_type_id == 4){
            $recomm_table = 't14';
        }
        else if($analysis_type_id == 5){
            $recomm_table = 't14';
        }
       
        try {
            $qry = $this->surveillanceApplicationSamplesQry()
                ->join('tra_pmslabresult_recommendations as t21', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't21.sample_id')
                        ->where('t21.analysis_type_id', 1);//PIR
                })
                ->leftJoin('tra_pmslabresult_recommendations as t22', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't22.sample_id')
                        ->where('t22.analysis_type_id', 2);//SCREENING
                })//left join to take care of samples that wont go through lab screening
                ->leftJoin('tra_pmslabresult_recommendations as t23', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't23.sample_id')
                        ->where('t23.analysis_type_id', 3);//TC MEETING
                })
                ->leftJoin('tra_pmslabresult_recommendations as t14', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't14.sample_id')
                        ->where('t14.analysis_type_id', 4);//CONFORMATORY
                })
                ->leftJoin('tra_pmslabresult_recommendations as t15', function ($join) use ($analysis_type_id) {
                    $join->on('t1.id', '=', 't15.sample_id')
                        ->where('t15.analysis_type_id', 5);//APPROVAL
                })
                ->join('par_pmsevaluation_decisions as t16', 't21.decision_id', '=', 't16.id')
                ->leftJoin('par_pmsscreening_decisions as t17', 't22.decision_id', '=', 't17.id')
                ->leftJoin('par_pmstcmeeting_decisions as t18', 't23.decision_id', '=', 't18.id')
                ->leftJoin('par_pmsanalysis_decisions as t19', 't14.decision_id', '=', 't19.id')
                ->leftJoin('par_pmsapproval_decisions as t20', 't15.decision_id', '=', 't20.id')
                ->addSelect('t16.name as pir_recomm', 't17.name as screening_recomm', 't18.name as tcm_recomm', 't19.name as analysis_recomm', 't20.name as approval_recomm',
                    't21.decision_id as pir_decision_id', 't21.comments as pir_comments',
                    't22.decision_id as screening_decision_id', 't22.comments as screening_comments',
                    't23.id as tc_recomm_id', 't23.decision_id as tcm_decision_id', 't23.comments as tcm_comments',
                    't14.decision_id as analysis_decision_id', 't14.comments as analysis_comments',
                    't15.id as recomm_id', 't15.decision_id as decision_id', 't15.comments as comments','t2.application_code','t2.id as application_id')
                ->where('t1.application_id', $application_id);
            if (isset($stage_id) && is_numeric($stage_id)) {
                $qry->where('t1.stage_id', $stage_id);
            }
            
            if (isset($recommendation_id) && is_numeric($recommendation_id)) {
                $qry->where($recomm_table . '.decision_id', $recommendation_id);
            }
            $results = $qry->get();
            foreach ($results as $key => $result) {
               $results[$key]->dosage_form = getSingleRecordColValue('par_dosage_forms', array('id' => $result->dosage_form_id), 'name', 'mysql');
                $results[$key]->product_form = getSingleRecordColValue('par_product_forms', array('id' => $result->product_form_id), 'name', 'mysql');
                $results[$key]->device_type = getSingleRecordColValue('medicaldevices_types', array('id' => $result->device_type_id), 'name', 'mysql');
                $results[$key]->class = getSingleRecordColValue('par_classifications', array('id' => $result->classification_id), 'name', 'mysql');
                $results[$key]->packaging_unit = getSingleRecordColValue('par_packaging_units', array('id' => $result->packaging_units_id), 'name', 'mysql');
            }
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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

    public function getSurveillanceApplicationSamples(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $qry = $this->surveillanceApplicationSamplesQry()
                ->where('t1.application_id', $application_id);
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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

    public function getSurveillanceSampleDetails(Request $request)
    {
        $sample_id = $request->input('sample_id');
        try {
            $qry = $this->surveillanceApplicationSamplesQry()
                ->where('t1.id', $sample_id);
            $results = $qry->first();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'Records fetched successfully'
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

    public function getPmsApplicationMoreDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        try {
            $mainQry = DB::table('tra_surveillance_applications as t1')
                ->where('t1.id', $application_id);
            $pmsQry = clone $mainQry;
            $pmsQry->join('pms_program_implementationplan as t2', 't1.program_implementation_id', '=', 't2.id')
                    ->join('pms_program_details as t3', 't2.program_id', '=', 't3.id')
                    ->select('t2.*','t3.name as program_name','t3.description as program_description', 't3.*','t2.implementationstart_date', 't2.implementationend_date', 't2.program_implementation', 't3.id as pms_program_id', 't2.id as program_implementation_id', 't3.name as pms_program', 't1.sampling_site_id', 't1.district_id', 't1.region_id');
                $sampleSiteQry = clone $mainQry;
                $sampleSiteQry->leftJoin('tra_samplecollection_sites as t4', 't1.sample_site_id', '=', 't4.id');
            /*
             $pmsQry->join('pms_program_implementationplan as t2', 't1.program_implementation_id', '=', 't2.id')
                ->join('pms_program_details as t3', 't2.program_id', '=', 't3.id')
                ->select('t2.*','t3.name as program_name','t3.description as program_description', 't3.*','t2.implementationstart_date', 't2.implementationend_date', 't2.program_implementation', 't3.id as pms_program_id', 't2.id as program_implementation_id', 't3.name as pms_program', 't1.sampling_site_id', 't1.district_id', 't1.region_id');
            $sampleSiteQry = clone $mainQry;
            $sampleSiteQry->leftJoin('tra_samplecollection_sites as t4', 't1.sample_site_id', '=', 't4.id');
            */


            $mainResults = $mainQry->first();
            $pmsResults = $pmsQry->first();
            $sampleSiteResults = $sampleSiteQry->first();
            $res = array(
                'success' => true,
                'mainResults' => $mainResults,
                'pmsResults' => $pmsResults,
                'sampleSiteResults' => $sampleSiteResults,
                'message' => 'Records fetched successfully'
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

    public function savePmsPIRRecommendation(Request $request)
    {
        $sample_id = $request->input('sample_id');
        $decision_id = $request->input('decision_id');
        $analysis_type_id = $request->input('analysis_type_id');
        $comments = $request->input('comments');
        $table_name = 'tra_pmslabresult_recommendations';
        $user_id = $this->user_id;
        $params = array(
            'decision_id' => $decision_id,
            'comments' => $comments
        );
        try {
            $where = array(
                'sample_id' => $sample_id,
                'analysis_type_id' => $analysis_type_id
            );
            if (recordExists($table_name, $where)) {
                $params['altered_by'] = $user_id;
                $params['dola'] = Carbon::now();
                $previous_data = getPreviousRecords($table_name, $where);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $res = updateRecord($table_name, $previous_data, $where, $params, $user_id);
            } else {
                $params['sample_id'] = $sample_id;
                $params['created_by'] = $user_id;
                $params['analysis_type_id'] = $analysis_type_id;
                $params['created_on'] = Carbon::now();
                $res = insertRecord($table_name, $params, $user_id);
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
        return \response()->json($res);
    }

    public function getPmsSampleIngredients(Request $request)
    {
        $sample_id = $request->input('sample_id');
        try {
            $qry = DB::table('tra_pmssample_ingredients as t1')
                ->join('inclusion_reason as t5', 't1.inclusion_reason_id', '=', 't5.id')
                
                ->leftJoin('par_specification_types as t6', 't1.specification_id', '=', 't6.id')
                
                ->leftJoin('par_si_units as t7', 't1.si_unit_id', '=', 't7.id')
                ->leftJoin('par_ingredients_details as t8', 't1.ingredient_id', '=', 't8.id')
                ->select(DB::raw("t1.*,t5.name as inclusion_reason, t6.name as specification, t7.name as strength_txt, t8.name as ingredient"))
                ->where('t1.sample_id', $sample_id);
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

    public function getSampleLabAnalysisResults(Request $request)
    {
        $sample_id = $request->input('sample_id');
        $analysis_type_id = $request->input('analysis_type_id');
        try {
            $qry = DB::table('tra_survsample_analysis_results as t1')
                ->join('cost_elements as t2', 't1.test_parameter_id', '=', 't2.id')
                ->select('t1.*', 't2.name as test_parameter')
                ->where('t1.sample_id', $sample_id);
            if (isset($analysis_type_id) && is_numeric($analysis_type_id)) {
                $qry->where('t1.analysis_type_id', $analysis_type_id);
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

    public function saveTCMeetingDetails(Request $request)
    {
        $id = $request->input('id');
        $application_code = $request->input('application_code');
        $meeting_name = $request->input('meeting_name');
        $meeting_desc = $request->input('meeting_desc');
        $date_requested = $request->input('date_requested');
        $meeting_time = $request->input('meeting_time');
        $meeting_venue = $request->input('meeting_venue');
        $user_id = $this->user_id;
        try {
            $params = array(
                'meeting_name' => $meeting_name,
                'meeting_desc' => $meeting_desc,
                'meeting_time' => $meeting_time,
                'meeting_venue' => $meeting_venue,
                'date_requested' => $date_requested
            );
            if (isset($id) && $id != '') {
                $params['altered_by'] = $user_id;
                DB::table('tc_meeting_details')
                    ->where('id', $id)
                    ->update($params);
            } else {
                $params['created_by'] = $user_id;
                $insert_res = insertRecord('tc_meeting_details', $params, $user_id);
                $id = $insert_res['record_id'];
                $app_meeting = array(
                    'application_code' => $application_code,
                    'meeting_id' => $id,
                    'created_by' => $user_id
                );
                insertRecord('tc_meeting_applications', $app_meeting, $user_id);
            }
            $res = array(
                'success' => true,
                'record_id' => $id,
                'message' => 'Details saved successfully!!'
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

    public function processReturnBackApplicationSubmission(Request $req){

        try{
            $user_id = $this->user_id;
            $application_id = $req->application_id;
            $sample_id = $req->sample_id;
            $stage_id = $req->sample_stage_id;
            $reason = $req->reason;
            //application details
            $application_details = DB::table('tra_surveillance_applications')->where('id',$application_id)->first();
            //submission details
            $submission_details = DB::table('tra_submissions')->where(array('application_id'=>$application_id,'current_stage'=>$application_details->workflow_stage_id,'isDone'=>0))->first();
            //update submission details
            $current_stage = $submission_details->current_stage;
            $previous_stage = $submission_details->previous_stage;
            unset($submission_details->id);
            unset($submission_details->altered_by);
            unset($submission_details->dola);
            unset($submission_details->released_by);
            unset($submission_details->date_released);
            unset($submission_details->date_submitted);
            unset($submission_details->isRead);
            unset($submission_details->isComplete);

            $submission_details->date_received = Carbon::now();
            $submission_details->created_by = $user_id;
            $submission_details->created_on = Carbon::now();
            $submission_details->remarks = $reason;
                   
              
            $submission_details->current_stage = $previous_stage;
            $submission_details->previous_stage = $current_stage;
            $res = insertRecord('tra_submissions', (array)$submission_details, $user_id);

            if($res['success']){
                DB::table('tra_surveillance_sample_details')
                    ->where('id',$sample_id)
                    ->update(array('stage_id'=>$stage_id));

            DB::commit();
            }else{
                  DB::rollBack();
                  $res = array(
                    'success' => false,
                    'message' => 'Updating submission table failed'
                );
                  exit();
            }

                $res = array(
                    'success' => true,
                    'message' => 'Submitted Back Successfully'
                ); 

        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        echo json_encode($res);
        exit();
    }
    public function getPmsPremisesList(Request $request)
        {
        $premise_id = $request->input('premise_id');
        $region_id = $request->input('region_id');
        $section_id = $request->input('section_id');
        $filter = $request->input('filter');
        $whereClauses = array();
        $start = $request->start;
                $limit = $request->limit;

        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'applicant_name' :
                            $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'premise_reg_no' :
                            $whereClauses[] = "t1.premise_reg_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'permit_no' :
                            $whereClauses[] = "t2.permit_no like '%" . ($filter->value) . "%'";
                            break;
                            case 'region_name' :
                            $whereClauses[] = "t4.name like '%" . ($filter->value) . "%'";
                            break;
                            case 'district_name' :
                            $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
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
            $qry = DB::table('tra_premises as t1')
                ->leftJoin('tra_approval_recommendations as t2', 't1.permit_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_regions as t4', 't1.region_id', '=', 't4.id')
                ->leftJoin('par_regions as t5', 't1.district_id', '=', 't5.id')
                ->select( 't1.id as premise_id','t1.name', 't1.id as manufacturing_site_id', 't1.*', 't2.permit_no', 't3.name as applicant_name',
                    't3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person', 't3.tin_no',
                    't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id',
                    't3.physical_address as app_physical_address', 't3.postal_address as app_postal_address','t4.name as region_name', 't5.name as district_name',
                    't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            if (validateIsNumeric($premise_id)) {
                $qry->where('t1.id', $premise_id);
            }if (validateIsNumeric($region_id)) {
                $qry->where('t1.region_id', $region_id);
            }
           // $results = $qry->get();

            $totalCount  = $qry->count();
                $records = $qry->skip($start*$limit)->take($limit)->get();
                $res = array('success'=>true, 
                                'results'=>$records,
                                'totalCount'=>$totalCount
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
    public function getGroupSampleAnalysisDetails(Request $req){


        
    }
}
