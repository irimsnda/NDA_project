<?php

namespace Modules\Workflow\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

use Modules\PromotionMaterials\Traits;
use Modules\PremiseRegistration\Traits\PremiseRegistrationTrait;
use Modules\GmpApplications\Traits\GmpApplicationsTrait;
use Modules\ProductRegistration\Traits\ProductsRegistrationTrait;
use Modules\ClinicalTrial\Traits\ClinicalTrialTrait;
use Modules\Surveillance\Traits\SurveillanceTrait;
use Modules\Importexportpermits\Traits\ImportexportpermitsTraits;
use Modules\Reports\Traits\ReportsTrait;
use Modules\PromotionMaterials\Traits\PromotionMaterialsTrait;
use Modules\ProductNotification\Traits\ProductsNotificationTrait;

use Modules\Revenuemanagement\Traits\RevenuemanagementTrait;
use Illuminate\Support\Arr;

class WorkflowController extends Controller
{
   protected $user_id;
    use PremiseRegistrationTrait;
    use GmpApplicationsTrait;
    use ProductsRegistrationTrait;
    use ClinicalTrialTrait;
    use SurveillanceTrait;
    use ImportexportpermitsTraits;
    use ReportsTrait;
    use PromotionMaterialsTrait;
    use ProductsNotificationTrait;
    use RevenuemanagementTrait;
    
    protected $base_url;
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
        
        $this->base_url = url('/');
    }

    public function index()
    {
        return view('workflow::index');
    }

    public function saveWorkflowCommonData(Request $req)
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
                    $res['record_id'] = $id;
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

    public function getWorkflowParamFromModel(Request $request)
    {
        $model_name = $request->input('model_name');
        $strict_mode = $request->input('strict_mode');
        $filters = $request->input('filter');
        $filters = (array)json_decode($filters);
        try {
            $model = 'Modules\\Workflow\\Entities\\' . $model_name;
            if (count((array)$filters) > 0) {
                $results = $model::where($filters)
                    ->get()
                    ->toArray();
            } else {
                $results = $model::all()
                    ->toArray();
            }
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

    public function getSystemSubModules(Request $request)
    {
        $module_id = $request->input('module_id');
        try {
            $qry = Db::table('sub_modules as t1');
            if (isset($module_id) && $module_id != '') {
                $qry->where('module_id', $module_id);
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

    public function getTfdaSystemProcesses(Request $request)
    {
        $section_id = $request->input('section_id');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $qry = DB::table('wf_tfdaprocesses as t1')
                ->join('modules as t2', 't1.module_id', '=', 't2.id')
                ->leftJoin('sub_modules as t3', 't1.sub_module_id', '=', 't3.id')
                ->leftJoin('par_sections as t4', 't1.section_id', '=', 't4.id')
                ->leftJoin('wf_workflows as t5', 't1.workflow_id', '=', 't5.id')
                ->select('t1.*', 't2.name as module', 't3.name as submodule', 't4.name as section', 't5.name as workflow');
                
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
            if (validateIsNumeric($module_id)) {
                $qry->where('t1.module_id', $module_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
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

    public function softDeleteWorkflowRecord(Request $req)
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

    public function undoWorkflowSoftDeletes(Request $req)
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

    public function deleteWorkflowRecord(Request $req)
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

    public function getWorkflowStages(Request $request)
    {
        $workflow_id = $request->input('workflow_id');
        try {
            $qry = DB::table('wf_workflow_stages as t1')
                ->join('wf_workflowstages_statuses as t3', 't1.stage_status', '=', 't3.id')
                ->leftJoin('wf_workflow_interfaces as t4', 't1.interface_id', '=', 't4.id')
                ->select('t1.*', 't3.name as stage_status_name', 't4.name as interface_name')
                ->where('workflow_id', $workflow_id)
                ->orderBy('t1.order_no');
            $results = $qry->get();
            foreach ($results as $key => $result) {
                $results[$key]->groups_string = $this->getStageGroupsString($result->id);
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

    public function getStageGroupsString($stage_id)
    {
        $str = '<ul>';
        $qry = DB::table('wf_stages_groups as t1')
            ->join('par_groups as t2', 't1.group_id', '=', 't2.id')
            ->select('t1.id', 't2.name')
            //->select(DB::raw("GROUP_CONCAT(t2.name) as groups_string"))
            ->where('stage_id', $stage_id);
        $results = $qry->get();
        foreach ($results as $result) {
            $str .= '<li>' . $result->name . '</li>';
        }
        $str .= '</ul>';
        return $str;
        //return $results[0]->groups_string;
    }

    public function getStageGroupsArray($stage_id)
    {
        $qry = DB::table('wf_stages_groups as t1')
            ->select('t1.group_id')
            ->where('stage_id', $stage_id);
        $results = $qry->get();
        $results = convertStdClassObjToArray($results);
        $results = convertAssArrayToSimpleArray($results, 'group_id');
        return $results;
    }

    public function getWorkflowAssociatedMenus(Request $request)
    {
        $workflow_id = $request->input('workflow_id');
        try {
            $qry = DB::table('wf_menu_workflows as t1')
                ->join('par_menus as t2', 't1.menu_id', '=', 't2.id')
                ->select('t1.*', 't2.name', 't2.viewType')
                ->where('t1.workflow_id', $workflow_id);
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

    public function getSubmissionWorkflowStages(Request $request)
    {
        $process_id = $request->input('process_id');
        try {
            $qry = DB::table('wf_tfdaprocesses as t1')
                ->join('wf_workflows as t2', 't1.workflow_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't2.id', '=', 't3.workflow_id')
                ->select('t3.*')
                ->where('t1.id', $process_id);
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
    
    public function getRevProcessSubmissionWorkflowStages(Request $request)
    {
        $curr_stage_id = $request->input('curr_stage_id');

        try {
            $qry = DB::table('wf_workflow_transitions as t1')
                ->join('wf_workflow_stages as t3', 't1.nextstage_id', '=', 't3.id')
                ->select('t3.*')
                ->where('t1.stage_id', $curr_stage_id);

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

    public function getWorkflowActions(Request $request)
    {
        $stage_id = $request->input('stage_id');
        $application_status_id = $request->input('application_status_id');
        $is_status_tied = $request->input('is_status_tied');
        $pms_recommendation_id = $request->input('pms_recommendation_id');
        $pms_analysis_type_id = $request->input('pms_analysis_type_id');
        $gmpinspection_type_id = $request->input('gmpinspection_type_id');
        $premiseinspection_recomm_id = $request->input('premiseinspection_recomm_id');
        $workflowaction_type_id = $request->input('workflowaction_type_id');
        $has_queries = $request->input('has_queries');
        $is_submission = $request->input('is_submission');

        try {
            $qry = DB::table('wf_workflow_actions as t1')
                ->leftJoin('wf_workflow_stages as t2', 't1.stage_id', '=', 't2.id')
                ->leftJoin('wf_workflowaction_types as t3', 't1.action_type_id', '=', 't3.id')
                ->select('t1.*', 't2.name as stage_name', 't3.name as action_type')
                ->where('stage_id', $stage_id);
            if (isset($is_status_tied) && $is_status_tied == 1) {
                $qry->where('application_status_id', $application_status_id)
                    ->where('is_status_tied', '=', 1);
            } else {
                /*   $qry->where(function ($query) {
                       $query->whereNull('is_status_tied')
                           ->orWhere('is_status_tied', '=', 2);
                   });*/
            }
            if (validateIsNumeric($pms_analysis_type_id)) {
                $where = array(
                    't1.pms_analysis_type_id' => $pms_analysis_type_id,
                    't1.pms_recommendation_id' => $pms_recommendation_id
                );
                $qry->where($where);
            }
            if (validateIsNumeric($workflowaction_type_id)) {
                $where = array(
                    't1.action_type_id' => $workflowaction_type_id
                );
                $qry->where($where);
            }
            if (isset($gmpinspection_type_id) && $gmpinspection_type_id != '') {
                $where = array(
                    't1.gmp_inspection_type_id' => $gmpinspection_type_id
                );
               
                    $inspection_type_id = explode(',',$gmpinspection_type_id);
               
                $qry->where(function ($query) use ($inspection_type_id) {
                    $query->whereIn('t1.gmp_inspection_type_id', $inspection_type_id);
                       // ->orWhere('t1.gmp_inspection_type_id', '=', 0)
                        //->orWhereNull('t1.gmp_inspection_type_id');


                });
            }
            if (validateIsNumeric($premiseinspection_recomm_id)) {
                $where = array(
                    't1.preminspection_recomm_id' => $premiseinspection_recomm_id
                );
                $qry->where(function ($query) use ($where) {
                    $query->where($where)
                        ->orWhere('t1.preminspection_recomm_id', '=', 0)
                        ->orWhereNull('t1.preminspection_recomm_id');
                });
            }
            if (validateIsNumeric($has_queries)) {
                $qry->where('t1.query_raised_submission', 1);
            } else {
                if (validateIsNumeric($is_submission) && $is_submission == 1) {
                  $qry->where(function ($query) {
                       $query->where('t1.query_raised_submission', 2)
                            ->orWhereNull('t1.query_raised_submission');
                    });
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
        return response()->json($res);
    }

    public function getWorkflowTransitions(Request $request)
    {
        $workflow_id = $request->input('workflow_id');
        try {
            $qry = DB::table('wf_workflow_transitions as t1')
                ->join('wf_workflow_stages as t2', 't1.stage_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.nextstage_id', '=', 't3.id')
                ->join('wf_workflow_actions as t4', 't1.action_id', '=', 't4.id')
                ->leftJoin('par_system_statuses as t5', 't1.application_status_id', '=', 't5.id')
                ->select('t1.*', 't2.name as stage_name', 't3.name as nextstage_name', 't4.name as action_name', 't5.name as application_status')
                ->where('t1.workflow_id', $workflow_id)
                ->orderBy('t2.order_no');
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

    public function getProcessWorkflowStages(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        try {
            //get workflow id
            $where = array(
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id
            );
            $workflow_id = DB::table('wf_tfdaprocesses')
                ->where($where)
                ->value('workflow_id');
            $qry = DB::table('wf_workflow_stages as t1')
                //->join('wf_workflow_statuses as t2', 't1.application_status', '=', 't2.id')
                ->join('wf_workflowstages_statuses as t3', 't1.stage_status', '=', 't3.id')
                ->select('t1.*', 't3.name as stage_status_name')
                ->where('workflow_id', $workflow_id);
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

    public function getBasicWorkflowDetails(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        try {
            //get workflow id
            $where = array(
                't1.module_id' => $module_id,
                't1.sub_module_id' => $sub_module_id,
                't1.section_id' => $section_id
            );
            $qry = DB::table('wf_tfdaprocesses as t1')
                ->join('wf_workflows as t2', 't1.workflow_id', '=', 't2.id')
                ->select('t1.workflow_id', 't2.name')
                ->where($where);
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
        return response()->json($res);
    }

    public function getInitialWorkflowDetails(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        $is_dataammendment_request = $request->input('is_dataammendment_request');
        try {
            //get workflow id
            $where = array(
                't1.module_id' => $module_id,
                't1.sub_module_id' => $sub_module_id
            );
            if(validateIsNumeric($is_dataammendment_request)){
               
                $where['t1.is_dataammendment_request'] = $is_dataammendment_request; 
            }
           
            if(validateIsNumeric($section_id)){
                $where['t1.section_id'] = $section_id; 
            }
            $qry = DB::table('wf_tfdaprocesses as t1')
                ->join('wf_workflows as t2', 't1.workflow_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', function ($join) {
                    $join->on('t2.id', '=', 't3.workflow_id')
                        ->on('t3.stage_status', '=', DB::raw(1));
                })
                ->join('wf_workflow_interfaces as t4', 't3.interface_id', '=', 't4.id')
                ->select('t4.viewtype', 't1.id as processId', 't1.name as processName', 't3.name as initialStageName', 't3.id as initialStageId');

            $qry->where($where);
            $results = $qry->first();
            //initial status details
            $statusDetails = getApplicationInitialStatus($module_id, $sub_module_id);
            $results->initialAppStatus = $statusDetails->name;
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
    
    public function getInitialWorkflowDetailsNoProcess(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            //get workflow id
            $where = array(
                't1.sub_module_id'=>$sub_module_id
            );
            $qry = DB::table('wf_tfdaprocesses as t1')
                ->join('wf_workflows as t2', 't1.workflow_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', function ($join) {
                    $join->on('t2.id', '=', 't3.workflow_id')
                        ->on('t3.stage_status', '=', DB::raw(1));
                })
                ->join('wf_workflow_interfaces as t4', 't3.interface_id', '=', 't4.id')
                ->select('t4.viewtype', 't1.id as processId', 't1.name as processName', 't3.name as initialStageName', 't3.id as initialStageId');
            $qry->where($where);
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
        return response()->json($res);
    }
    
    public function getAllWorkflowDetails(Request $request)
    {
        $process_id = $request->input('process_id');
        $stage_id = $request->input('workflow_stage');
        try {
            //get workflow id
            $where = array(
                't1.id' => $process_id,
                't3.id' => $stage_id
            );
            $qry = DB::table('wf_tfdaprocesses as t1')
                ->leftJoin('wf_workflows as t2', 't1.workflow_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't3.workflow_id', '=', 't2.id')
                ->leftJoin('wf_workflow_interfaces as t4', 't3.interface_id', '=', 't4.id')
                ->select('t1.workflow_id', 't2.name', 't4.viewtype', 't1.id as processId', 't1.name as processName', 't3.name as initialStageName', 't3.id as initialStageId');
            $qry->where($where);
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
        return response()->json($res);
    }
    public function getRevenueApplicationSubmissionDetails(Request $request)
    {
        $application_id = $request->input('application');
        $workflow_stage_id = $request->input('workflow_stage_id');
        try {
            $qry = DB::table('wf_workflow_stages as t1')
                ->select('t1.id as currentStageId',  't1.name as currentStageName')
                ->where('t1.id', $workflow_stage_id);
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
        return response()->json($res);
    }
    public function getApplicationSubmissionDetails(Request $request)
    {
        $application_id = $request->input('application_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $stage_status = $request->input('stage_status');
        
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            if(validateIsNumeric($workflow_stage_id)){
                if($table_name != ''){
                    
                      $qry = DB::table('tra_submissions as t1')
                        ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                        ->join('wf_workflow_stages as t3', 't1.current_stage', 't3.id')
                        ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                        ->leftJoin($table_name.' as t5', 't1.application_code','=','t5.application_code')
                        ->select('t1.id', 't1.tracking_no', 't1.reference_no', 't1.process_id as processId', 't1.current_stage as currentStageId','t3.is_manager_submission', 't2.name as processName', 't3.name as currentStageName',
                            't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't5.sub_module_id', 't5.section_id')
                            
                        ->where(array('t1.application_id'=>$application_id, 'current_stage'=>$workflow_stage_id,'isDone'=>0,));
                }
                else if(validateIsNumeric($application_id)){
                    
                      $qry = DB::table('tra_submissions as t1')
                        ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                        ->join('wf_workflow_stages as t3', 't1.current_stage', 't3.id')
                        ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                        ->select('t1.id', 't1.tracking_no', 't1.reference_no', 't1.process_id as processId', 't1.current_stage as currentStageId','t3.is_manager_submission', 't2.name as processName', 't3.name as currentStageName',
                            't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't1.sub_module_id', 't1.section_id')
                            
                        ->where(array('t1.application_id'=>$application_id, 'current_stage'=>$workflow_stage_id,'isDone'=>0));
                }
                else{
                    
                      $qry = DB::table('tra_submissions as t1')
                        ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                        ->join('wf_workflow_stages as t3', 't1.current_stage', 't3.id')
                        ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                        ->select('t1.id', 't1.tracking_no', 't1.reference_no', 't1.process_id as processId', 't1.current_stage as currentStageId','t3.is_manager_submission', 't2.name as processName', 't3.name as currentStageName',
                            't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't1.sub_module_id', 't1.section_id')
                            
                        ->where(array('t1.application_code'=>$application_code, 'current_stage'=>$workflow_stage_id,'isDone'=>0));
                }
              
            }
            else if(validateIsNumeric($stage_status)){
                
                $qry = DB::table($table_name . ' as t1')
                    ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                    ->join('wf_workflows as t6', 't2.workflow_id', '=', 't6.id')
                    ->join('wf_workflow_stages as t3', 't6.id', 't3.workflow_id')
                    ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                    ->select('t1.id', 't1.tracking_no', 't1.reference_no', 't1.process_id as processId', 't3.id as  currentStageId','t3.is_manager_submission', 't2.name as processName', 't3.name as currentStageName',
                        't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't2.sub_module_id', 't2.section_id')
                    ->where(array('t1.id'=> $application_id,'t3.stage_status'=>$stage_status));
            }
            else{
              /*  $qry = DB::table($table_name . ' as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->leftJoin('wf_workflow_stages as t3', 't1.workflow_stage_id', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                ->select('t1.id', 't1.tracking_no', 't1.reference_no', 't1.process_id as processId', 't1.workflow_stage_id as currentStageId','t3.is_manager_submission', 't2.name as processName', 't3.name as currentStageName',
                    't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't2.sub_module_id', 't2.section_id')
                ->where('t1.application_code', $application_code);
                */
                $where = array('t5.id'=>$application_id,'isDOne'=>0,'is_revenuesubprocessfinal_stage'=>0 );
                if(validateIsNumeric($application_code)){
                    $where = array('t5.application_code'=>$application_code,'isDone'=>0,'is_revenuesubprocessfinal_stage'=>0 );
                }
                if($table_name != ''){
                     $qry = DB::table('tra_submissions as t1')
                        ->leftJoin('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                        ->leftJoin('wf_workflow_stages as t3', 't1.current_stage', 't3.id')
                        ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                        ->join($table_name.' as t5', 't1.application_code','=','t5.application_code')
                        ->select('t1.id', 't1.tracking_no', 't1.reference_no', 't1.process_id as processId', 't1.current_stage as currentStageId','t3.is_manager_submission', 't2.name as processName', 't3.name as currentStageName',
                            't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't5.sub_module_id', 't5.section_id')
                        ->where('t3.stage_status','<>',3)   
                        ->whereNotIn('t3.stage_status',[3,4])
                        ->where($where);
                        //handle the query responses 
                        if(!$qry->first()){
                            $qry = DB::table($table_name . ' as t1')
                            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                            ->join('wf_workflows as t6', 't2.workflow_id', '=', 't6.id')
                            ->join('wf_workflow_stages as t3', 't6.id', 't3.workflow_id')
                            ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                            ->select('t1.id', 't1.tracking_no', 't1.reference_no', 't1.process_id as processId', 't3.id as  currentStageId','t3.is_manager_submission', 't2.name as processName', 't3.name as currentStageName',
                                't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't2.sub_module_id', 't2.section_id')
                            ->where(array('t1.id'=> $application_id,'t3.stage_status'=>1));
                            
                        }
                    
                    
                }
                else{
                     $qry = DB::table('tra_submissions as t1')
                        ->leftJoin('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                        ->leftJoin('wf_workflow_stages as t3', 't1.current_stage', 't3.id')
                        ->leftJoin('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                        ->select('t1.id', 't1.tracking_no', 't1.reference_no', 't1.process_id as processId', 't1.current_stage as currentStageId','t3.is_manager_submission', 't2.name as processName', 't3.name as currentStageName',
                            't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't1.sub_module_id', 't1.section_id')
                        ->where('t3.stage_status','<>',3)   
                        ->where($where);
                        //handle the query responses 
                        
                    
                }
                
                
                
            }
           
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
        return response()->json($res);
    }

    public function getApplicationSubmissionDetailsFromSubmissionsTable(Request $request)
    {
        $application_code = $request->input('application_code');
        $current_stage_id = $request->input('current_stage_id');
        try {
            $submission_id = $this->getSubmissionID($application_code, $current_stage_id);
            if (!is_numeric($submission_id)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered getting submission ID'
                );
                return response()->json($res);
            }
            $qry = DB::table('tra_submissions as t1')
                ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.current_stage', 't3.id')
                ->join('par_system_statuses as t4', 't1.application_status_id', 't4.id')
                ->select('t1.id', 't1.reference_no', 't1.process_id as processId', 't1.current_stage as currentStageId', 't2.name as processName', 't3.name as currentStageName',
                    't4.name as applicationStatus', 't4.id as applicationStatusId', 't2.module_id', 't2.sub_module_id', 't2.section_id')
                ->where('t1.id', $submission_id);
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
        return response()->json($res);
    }

    public function getSubmissionID($application_code, $stage_id)
    {
        $where = array(
            'application_code' => $application_code,
            'current_stage' => $stage_id
        );
        $id = DB::table('tra_submissions')
            ->where($where)
            ->value('id');
        return $id;
    }

     public function getOnlineApplicationSubmissionDetails(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        $has_queries = $request->input('has_queries');
        $status_type_id = $request->input('status_type_id');
        $application_code = $request->input('application_code');
        $action_type = $request->action_type;
        $where = array(
            't1.module_id' => $module_id,
            't1.sub_module_id' => $sub_module_id,
            't1.section_id' => $section_id
        );
        try {
            if ($status_type_id == 2) {
               /* if ($this->hasUnclosedStructuredQueries($application_code)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Please close all raised queries to proceed!!'
                    );
                    return \response()->json($res);
                }
                */
            }
            $qry = DB::table('wf_tfdaprocesses as t1');
            if (isset($status_type_id) && ($status_type_id == 3)) {//manager query response
                $qry->join('wf_workflow_stages as t2', function ($join) {
                    $join->on('t2.workflow_id', '=', 't1.workflow_id')
                        ->on('t2.is_manager_query_response', '=', DB::raw(1));
                });
            }else if (isset($status_type_id) && ($status_type_id == 2) && $has_queries ==0) {//manager query response
                $qry->join('wf_workflow_stages as t2', function ($join) {
                     $join->on('t2.workflow_id', '=', 't1.workflow_id')
                        ->on('t2.is_portalapp_initialstage', '=', DB::raw(1));
                });
            } else if (isset($has_queries) && $has_queries == 1) {
                $qry->join('wf_workflow_stages as t2', function ($join) {
                    $join->on('t2.workflow_id', '=', 't1.workflow_id')
                        ->on('t2.is_manager_precheckingquery', '=', DB::raw(1));
                });
            } else if(validateIsNumeric($action_type)){
                $qry->join('wf_workflow_stages as t3', function ($join) {
                    $join->on('t3.workflow_id', '=', 't1.workflow_id')
                        ->on('t3.stage_status', '=', DB::raw(1));
                    })
                    ->join('wf_workflow_transitions as t4','t3.id','t4.stage_id' )
                    ->join('wf_workflow_stages as t2','t4.nextstage_id','t2.id')
                    ->join('wf_workflow_actions as t5','t4.action_id','t5.id')
                    ->where(array('t5.action_type_id' => $action_type ));
            }else {
                $qry->join('wf_workflow_stages as t2', function ($join) {
                    $join->on('t2.workflow_id', '=', 't1.workflow_id')
                        ->on('t2.is_portalapp_initialstage', '=', DB::raw(1));
                });
            }

            $qry->select('t1.id as processId', 't2.id as currentStageId', 't1.name as processName', 't2.name as currentStageName','t2.needs_responsible_user',
                't1.module_id', 't1.sub_module_id', 't1.section_id')
                ->where($where);
                //dd($qry->toSql());
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
        return response()->json($res);
    }
    
    public function saveWorkflowStage(Request $request)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $request->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            //unset unnecessary values
            unset($post_data['_token']);
            unset($post_data['table_name']);
            unset($post_data['model']);
            unset($post_data['id']);
            unset($post_data['groups']);
            unset($post_data['module_id']);
            unset($post_data['sub_module_id']);
            //unset($post_data['is_inspection']);
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
                    $res['record_id'] = $id;
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

    public function saveWorkflowTransition(Request $request)
    {
        try {
            $user_id = \Auth::user()->id;
            $post_data = $request->all();
            $table_name = $post_data['table_name'];
            $id = $post_data['id'];
            $workflow_id = $post_data['workflow_id'];
            $stage = $post_data['stage_id'];
            $action = $post_data['action_id'];
            $nextstage = $post_data['nextstage_id'];
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
                    $res['record_id'] = $id;
                }
            } else {
                $dup_check = array(
                    'workflow_id' => $workflow_id,
                    'stage_id' => $stage,
                    'action_id' => $action
                    //'nextstage_id' => $nextstage
                );
                $count = DB::table('wf_workflow_transitions')
                    ->where($dup_check)
                    ->count();
                if ($count > 0) {
                    $res = array(
                        'success' => false,
                        'message' => 'This transition has been added already, please edit!!'
                    );
                    return response()->json($res);
                }
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

    public function getProcessApplicableChecklistCategories(Request $request)
    {
        $process_id = $request->input('process_id');
        $workflow_stage = $request->input('workflow_stage');
        try {
            $qry = DB::table('par_checklist_categories as t1')
                ->leftJoin('tra_proc_applicable_checklists as t2', function ($join) use ($process_id, $workflow_stage) {
                    $join->on('t2.checklist_category_id', '=', 't1.id')
                        ->on('t2.process_id', '=', DB::raw($process_id))
                        ->on('t2.stage_id', '=', DB::raw($workflow_stage));
                })
                ->select('t1.*', 't2.id as applicable_checklist');
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

    public function getProcessApplicableDocumentTypes(Request $request)
    {
        $process_id = $request->input('process_id');
        $workflow_stage = $request->input('workflow_stage');
        try {
            $qry = DB::table('par_document_types as t1')
                ->leftJoin('tra_proc_applicable_doctypes as t2', function ($join) use ($process_id, $workflow_stage) {
                    $join->on('t2.doctype_id', '=', 't1.id')
                        ->on('t2.process_id', '=', DB::raw($process_id))
                        ->on('t2.stage_id', '=', DB::raw($workflow_stage));
                })
                ->select('t1.*', 't2.id as applicable_doctype');
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

    public function getProcessEditableFormFields(Request $request)
    {
        $process_id = $request->input('process_id');
        $form_id = $request->input('form_id');
        try {
            $qry = DB::table('par_key_form_fields as t1')
                ->join('par_form_field_types as t2', 't1.field_type_id', '=', 't2.id')
                ->leftJoin('tra_process_form_auth as t3', function ($join) use ($process_id) {
                    $join->on('t3.field_id', '=', 't1.id')
                        ->on('t3.process_id', '=', DB::raw($process_id));
                })
                ->select('t1.*', 't2.name as field_type', 't3.id as isEditable')
                ->where('t1.form_id', $form_id);
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

    public function getProcessEditableOtherParts(Request $request)
    {
        $process_id = $request->input('process_id');
        $module_id = $request->input('module_id');
        try {
            $qry = DB::table('par_alteration_setup as t1')
                ->leftJoin('tra_process_otherparts_auth as t2', function ($join) use ($process_id) {
                    $join->on('t1.id', '=', 't2.part_id')
                        ->where('t2.process_id', '=', $process_id);
                })
                ->select('t1.*', 't2.id as isEditable')
                ->where('t1.is_form_tied', '=', 2)
                ->where('t1.module_id', $module_id);
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

    public function getProcessApplicableChecklistTypes(Request $request)
    {
        $process_id = $request->input('process_id');
        $workflow_stage = $request->input('workflow_stage');
        $is_approval = $request->input('is_approval');
        $target_stage = $request->input('target_stage');
        if (isset($is_approval) && $is_approval == 1) {
            $workflow_stage = $target_stage;
        }
        $where = array(
            'process_id' => $process_id,
            'stage_id' => $workflow_stage
        );
        try {
            //module_id, sub_module_id and section_id
            $where2 = DB::table('wf_tfdaprocesses')
                ->select('module_id', 'sub_module_id', 'section_id')
                ->where('id', $process_id)
                ->get();
            $where2 = convertStdClassObjToArray($where2);
            //get applicable checklist categories
            $qry1 = DB::table('tra_proc_applicable_checklists')
                ->select('checklist_category_id')
                ->where($where);
            $checklist_categories = $qry1->get();
            $checklist_categories = convertStdClassObjToArray($checklist_categories);
            $checklist_categories = convertAssArrayToSimpleArray($checklist_categories, 'checklist_category_id');
            //get applicable checklist types

            $qry2 = DB::table('par_checklist_types as t1')
                ->where($where2[0])
                ->whereIn('checklist_category_id', $checklist_categories);
            $results = $qry2->get();

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

    public function getOnlineProcessApplicableChecklistTypes(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
       
        if($module_id == 4){
                $where2 = array(
                    'module_id' => $module_id,
                    'sub_module_id' => 12,
                    'section_id' => 2
                );
            }
            else{
                $where2 = array(
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id
                );
            }
        
        $process_details = getTableData('wf_tfdaprocesses', $where2);
        $process_id = $process_details->id;
        $workflow_id = $process_details->workflow_id;
        $where3 = array(
            'workflow_id' => $workflow_id,
            'stage_status' => 1
        );
        $stage_details = getTableData('wf_workflow_stages', $where3);
        $workflow_stage = $stage_details->id;
        $where = array(
            'process_id' => $process_id,
            'stage_id' => $workflow_stage
        );
        try {
            $qry2 = DB::table('par_checklist_types as t1')
                ->where($where2)
                ->whereIn('t1.checklist_category_id', function ($query) use ($where) {
                    $query->select(DB::raw('t2.checklist_category_id'))
                        ->from('tra_proc_applicable_checklists as t2')
                        ->where($where);
                });
            $results = $qry2->get();

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

    

public function getProcessApplicableChecklistItems(Request $request)
    {
        $checklist_type = $request->input('checklist_type');
        $checklist_category_id = $request->input('checklist_category_id');
        $application_code = $request->input('application_code');
        $is_previous = $request->input('is_previous');
        $process_id = $request->input('process_id');
        $workflow_stage = $request->input('workflow_stage');
        $module_id = $request->input('module_id');
        $query_id = $request->input('query_id');
        $pass_status = $request->pass_status;
        $is_auditor = $request->is_auditor;
        $is_structured = $request->is_structured;
        $filter = $request->input('filter');
        $submission_id = 0;
        //check for previously added checklist query_id 117
    
        if(validateIsNumeric($query_id)){
            $query_data = DB::table('tra_application_query_reftracker')->where('id', $query_id)->first();
            $checklist_category_id = $query_data->checklist_category_id;
            $application_code = $query_data->application_code;
            $workflow_stage = $query_data->workflow_stage_id;
            $process_id = $query_data->process_id;
        }
        $submission_details = getLastApplicationSubmissionDetails($application_code);
        if($submission_details['success']){
            $submission_details = $submission_details['results'];
            $submission_id = $submission_details->id;
        }
        $where = array(
            'process_id' => $process_id
            //'stage_id' => $workflow_stage
        );
        if (validateIsNumeric($workflow_stage)) {
            $where['stage_id'] = $workflow_stage;
        }
        
        $whereClauses = array();
        $filter_string = '';
        if (isset($filter)) {
            $filters = json_decode($filter);
            if ($filters != NULL) {
                foreach ($filters as $filter) {
                    switch ($filter->property) {
                        case 'name' :
                            $whereClauses[] = "t1.name like '%" . ($filter->value) . "%'";
                            break;
                        case 'pass_status' :
                            $whereClauses[] = "t2.pass_status = '" . ($filter->value) . "'";
                            break;
                    }
                }
                $whereClauses = array_filter($whereClauses);
            }
            if (!empty($whereClauses)) {
                $filter_string = implode(' AND ', $whereClauses);
            }
        }
        if(validateIsNumeric($pass_status)){
            $whereClauses[] = "t2.pass_status = '" . ($pass_status) . "'";
        }
        
        try {
            //module_id, sub_module_id and section_id
            $where2 = DB::table('wf_tfdaprocesses')
                ->select('module_id', 'sub_module_id', 'section_id')
                ->where('id', $process_id)
                ->first();
            $where2 = convertStdClassObjToArray($where2);
            $module_id = $where2['module_id'];
            
                $module_id = $where2['module_id'];
                $sub_module_id = $where2['sub_module_id'];
                $section_id = $where2['section_id'];
            
           
            //get applicable checklist categories
            
            $qry1 = DB::table('tra_proc_applicable_checklists')
                ->select('checklist_category_id')
                ->where($where);
            
            $checklist_categories = $qry1->get();
            $checklist_categories = convertStdClassObjToArray($checklist_categories);
            $checklist_categories = convertAssArrayToSimpleArray($checklist_categories, 'checklist_category_id');
            //get applicable checklist types
            $qry2 = DB::table('par_checklist_types as t1')
                ->select('t1.id')
                ->where($where2)
                ->whereIn('checklist_category_id', $checklist_categories);
            $checklist_types = $qry2->get();
            $checklist_types = convertStdClassObjToArray($checklist_types);
            $checklist_types = convertAssArrayToSimpleArray($checklist_types, 'id');
           if(validateIsNumeric($query_id)){
                $qry = DB::table('checklistitems_queries as t4')
                ->leftJoin('par_checklist_items as t1','t4.checklist_item_id', '=', 't1.id')
                ->leftJoin('checklistitems_responses as t2', function ($join) use ($application_code, $query_id, $submission_id, $is_auditor) {
                    
                    if (validateIsNumeric($query_id)) {
                        $join->on('t2.checklist_item_id', '=', 't1.id')
                            ->where('t2.application_code', $application_code);
                    } else if(validateIsNumeric($is_auditor)){
                         $join->on('t2.checklist_item_id', '=', 't1.id')
                            ->where('t2.application_code', $application_code);
                    } else {
                        $join->on('t2.checklist_item_id', '=', 't1.id')
                            ->where('t2.submission_id', $submission_id)
                            ->where('t2.application_code', $application_code);
                    }
                })
                ->leftJoin('par_checklist_types as t3', 't1.checklist_type_id', '=', 't3.id')
                
                ->leftJoin('par_checklist_categories as t5', 't3.checklist_category_id', '=', 't5.id')
                ->leftJoin('checklistitems_queryresponses as t6', 't6.query_id', '=', 't4.id')
                ->join('users as t8', 't2.responses_by', '=', 't8.id')
                ->select(DB::raw("t1.name,t4.id, t1.id as checklist_item_id,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as screened_by , t2.id as item_resp_id,t2.pass_status,t6.response as query_response, t2.comment,t2.observation, t2.auditor_comment, t3.name as checklist_type, t2.auditorpass_status, $module_id as module_id, $sub_module_id as sub_module_id,  t4.query"));
          
               
               
           }
           else{
                $qry = DB::table('par_checklist_items as t1')
                ->leftJoin('checklistitems_responses as t2', function ($join) use ($application_code, $query_id, $submission_id, $is_auditor) {
                    
                    if (validateIsNumeric($query_id)) {
                        $join->on('t2.checklist_item_id', '=', 't1.id')
                            ->where('t2.application_code', $application_code);
                    } else if(validateIsNumeric($is_auditor)){
                         $join->on('t2.checklist_item_id', '=', 't1.id')
                            ->where('t2.application_code', $application_code);
                    } else {
                        $join->on('t2.checklist_item_id', '=', 't1.id')
                           // ->where('t2.submission_id', $submission_id)
                            ->where('t2.application_code', $application_code);
                    }
                })
                ->leftJoin('checklistitems_queries as t4', function ($join) use ($query_id) {
                    $join->on('t4.checklist_item_id', '=', 't1.id')
                        ->where('t4.query_id', $query_id);
                })
                ->leftJoin('par_checklist_types as t3', 't1.checklist_type_id', '=', 't3.id')
                
                ->leftJoin('par_checklist_categories as t5', 't3.checklist_category_id', '=', 't5.id')
                ->leftJoin('checklistitems_queryresponses as t6', 't6.query_id', '=', 't4.id')
                ->join('users as t8', 't2.responses_by', '=', 't8.id')
                ->select(DB::raw("t1.name,t1.id, t1.id as checklist_item_id,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as screened_by ,t2.id as item_resp_id,t2.pass_status,t6.response as query_response, t2.comment,t2.observation, t2.auditor_comment, t3.name as checklist_type, t2.auditorpass_status, $module_id as module_id, $sub_module_id as sub_module_id,  t4.query"));
          
               
               
           }
           
          
          
           /*----------------------------------------------------
                For unstructured queries they adopt 
                1. checklist type 102 t4.*,
           ------------------------------------------------------*/
           if (validateIsNumeric($query_id)) {
                $qry->where('t4.query_id', $query_id);
            }else{
                
                if(validateIsNumeric($is_structured) && $is_structured == 1){
                    $qry->where('t5.is_query', 1);
                }
                else{
                    if (validateIsNumeric($checklist_type)) {
                        $qry->where('t1.checklist_type_id', $checklist_type);
                    } else {
                        $qry->whereIn('t1.checklist_type_id', $checklist_types);
                    }
                    if(validateIsNumeric($pass_status)){
                        $qry->where('t2.pass_status', $pass_status);
                    }
                }
                
                
                
            }
            $results = $qry->get();
            
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
            );
        } catch (\Exception $exception) {
            $res = array(
                'success' => true,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => true,
                'message' => $throwable->getMessage()
            );
        }
        return \response()->json($res);
    }

    public function getApplicableChecklistItemsHistory(Request $request)
    {
        try {
            $application_code = $request->input('application_code');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $qry = DB::table('checklistitems_responses as t1')
                ->join('par_checklist_items as t2', 't1.checklist_item_id', '=', 't2.id')
                ->join('tra_application_checklists_reftracker as t3', 't1.checklist_ref_id', '=', 't3.id')
                ->leftJoin('users as t4', 't1.created_by', '=', 't4.id')
                ->leftJoin('users as t5', 't3.submission_by', '=', 't5.id')
                ->select(DB::raw("t2.*,t1.*,t1.id as item_resp_id,t1.created_on,CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as captured_by,t3.checklist_ref,t3.submission_date,
                        decrypt(t5.first_name) as submitted_by"))
                ->where('t1.application_code', $application_code);
            if (validateIsNumeric($workflow_stage_id)) {
                $qry->where('t3.workflow_stage_id', $workflow_stage_id);
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

    public function getOnlineProcessApplicableChecklistItems(Request $request)
    {
        $checklist_type = $request->input('checklist_type');
        $checklist_category_id = $request->input('checklist_category_id');
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        $section_id = $request->input('section_id');
        $is_previous = $request->input('is_previous');
        
        $where2 = array(
            'module_id' => $module_id,
            'sub_module_id' => $sub_module_id,
            'section_id' => $section_id
        );
        $process_details = getTableData('wf_tfdaprocesses', $where2);
        if($module_id == 4){
             $process_id = 38;
        }
        else{
            
        }
        $process_id = $process_details->id;
        $workflow_id = $process_details->workflow_id;

        $where3 = array(
            'workflow_id' => $workflow_id,
            'stage_status' => 1
        );
       
        $stage_details = getTableData('wf_workflow_stages', $where3);

        $workflow_stage = $stage_details->id;
        $where = array(
            'process_id' => $process_id
        );
        if (validateIsNumeric($workflow_stage) && $module_id !=4) {
            $where['stage_id'] = $workflow_stage;
        }
        
        try {
           
            $where2 = array(
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id
                );
            //get applicable checklist categories
            $qry1 = DB::table('tra_proc_applicable_checklists')
                ->select('checklist_category_id')
                ->where($where);
            $checklist_categories = $qry1->get();
            $checklist_categories = convertStdClassObjToArray($checklist_categories);
            $checklist_categories = convertAssArrayToSimpleArray($checklist_categories, 'checklist_category_id');
            //get applicable checklist types
            $qry2 = DB::table('par_checklist_types as t1')
                ->select('t1.id')
                ->where($where2)
                ->whereIn('checklist_category_id', $checklist_categories);
            $checklist_types = $qry2->get();
            $checklist_types = convertStdClassObjToArray($checklist_types);
            $checklist_types = convertAssArrayToSimpleArray($checklist_types, 'id');


            $qry = DB::table('par_checklist_items as t1')
                ->leftJoin('checklistitems_responses as t2', function ($join) use ($application_code, $is_previous) {
                    $join->on('t2.checklist_item_id', '=', 't1.id')
                        ->where('t2.application_code', $application_code);
                    if (isset($is_previous) && $is_previous != '') {
                        $join->where('t2.status', 0);
                    } else {
                        $join->where('t2.status', 1);
                    }
                })
                ->join('par_checklist_types as t3', 't1.checklist_type_id', '=', 't3.id')
                ->select(DB::raw("t1.*,t2.id as item_resp_id,t2.pass_status,t2.comment,t2.observation,t2.auditor_comment,t3.name as checklist_type,
                            $module_id as module_id,$sub_module_id as sub_module_id,$section_id as section_id"));
            if (validateIsNumeric($checklist_category_id)) {
                $qry->where('t3.checklist_category_id', $checklist_category_id);
            }
            if (isset($checklist_type) && $checklist_type != '') {
                $qry->where('t1.checklist_type_id', $checklist_type);
            } else {
                $qry->whereIn('t1.checklist_type_id', $checklist_types);
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

    public function syncProcessApplicableChecklistCategories(Request $request)
    {
        $selected = $request->input('selected');
        $process_id = $request->input('process_id');
        $stage_id = $request->input('stage_id');
        $selected_ids = json_decode($selected);
        $where = array(
            'process_id' => $process_id,
            'stage_id' => $stage_id
        );
        try {
            DB::transaction(function () use ($selected_ids, $process_id, $stage_id, $where) {
                $params = array();
                foreach ($selected_ids as $selected_id) {
                    $params[] = array(
                        'process_id' => $process_id,
                        'stage_id' => $stage_id,
                        'checklist_category_id' => $selected_id,
                        'created_by' => $this->user_id
                    );
                }
                DB::table('tra_proc_applicable_checklists')
                    ->where($where)
                    ->delete();
                DB::table('tra_proc_applicable_checklists')
                    ->insert($params);
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Changes synced successfully!!'
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

    public function syncProcessApplicableDocumentTypes(Request $request)
    {
        $selected = $request->input('selected');
        $process_id = $request->input('process_id');
        $stage_id = $request->input('stage_id');
        $selected_ids = json_decode($selected);
        $where = array(
            'process_id' => $process_id,
            'stage_id' => $stage_id
        );
        try {
            DB::transaction(function () use ($selected_ids, $process_id, $stage_id, $where) {
                $params = array();
                foreach ($selected_ids as $selected_id) {
                    $params[] = array(
                        'process_id' => $process_id,
                        'stage_id' => $stage_id,
                        'doctype_id' => $selected_id,
                        'created_by' => $this->user_id
                    );
                }
                DB::table('tra_proc_applicable_doctypes')
                    ->where($where)
                    ->delete();
                DB::table('tra_proc_applicable_doctypes')
                    ->insert($params);
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Changes synced successfully!!'
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

    public function syncProcessAmendableParts(Request $request)
    {
        $selected = $request->input('selected');
        $selected_parts = $request->input('selected_parts');
        $process_id = $request->input('process_id');
        $form_id = $request->input('form_id');
        $selected_ids = json_decode($selected);
        $selected_part_ids = json_decode($selected_parts);
        $where = array(
            'process_id' => $process_id,
            'form_id' => $form_id
        );
        try {
            DB::transaction(function () use ($selected_ids, $selected_part_ids, $process_id, $form_id, $where) {
                $params = array();
                $params2 = array();
                if (count($selected_ids) > 0) {
                    foreach ($selected_ids as $selected_id) {
                        $params[] = array(
                            'process_id' => $process_id,
                            'form_id' => $form_id,
                            'field_id' => $selected_id,
                            'created_by' => $this->user_id
                        );
                    }
                }
                if (count($selected_part_ids) > 0) {
                    foreach ($selected_part_ids as $selected_part_id) {
                        $params2[] = array(
                            'process_id' => $process_id,
                            'part_id' => $selected_part_id,
                            'created_by' => $this->user_id
                        );
                    }
                }
                //todo form parts
                DB::table('tra_process_form_auth')
                    ->where($where)
                    ->delete();
                DB::table('tra_process_form_auth')
                    ->insert($params);
                //todo other parts
                DB::table('tra_process_otherparts_auth')
                    ->where('process_id', $process_id)
                    ->delete();
                DB::table('tra_process_otherparts_auth')
                    ->insert($params2);
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Changes synced successfully!!'
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

    public function syncWorkflowStageResponsibleGroups(Request $request)
    {
        $selected = $request->input('selected');
        $stage_id = $request->input('stage_id');
        $selected_ids = json_decode($selected);
        $where = array(
            'stage_id' => $stage_id
        );
        try {
            DB::transaction(function () use ($selected_ids, $stage_id, $where) {
                $params = array();
                foreach ($selected_ids as $selected_id) {
                    $params[] = array(
                        'stage_id' => $stage_id,
                        'group_id' => $selected_id,
                        'created_by' => $this->user_id
                    );
                }
                DB::table('wf_stages_groups')
                    ->where($where)
                    ->delete();
                DB::table('wf_stages_groups')
                    ->insert($params);
            }, 5);
            $res = array(
                'success' => true,
                'message' => 'Changes synced successfully!!'
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

    public function getMenuWorkflowLinkages(Request $request)
    {
        $menu_id = $request->input('menu_id');
        $workflow_id = $request->input('workflow_id');
        try {
            $qry = DB::table('wf_menus_stages')
                ->where('menu_id', $menu_id)
                ->select('stage_id');
            $results = $qry->get();
            $results = convertStdClassObjToArray($results);
            $results = convertAssArrayToSimpleArray($results, 'stage_id');
            $data = array(
                'menu_id' => $menu_id,
                'workflow_id' => $workflow_id,
                'workflow_stages' => $results
            );
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
        return response()->json($res);
    }

    public function getMenuWorkFlowsLinkages(Request $request)
    {
        $menu_id = $request->input('menu_id');
        try {
            $qry = DB::table('wf_menu_workflows')
                ->where('menu_id', $menu_id)
                ->select('workflow_id');
            $results = $qry->get();
            $results = convertStdClassObjToArray($results);
            $results = convertAssArrayToSimpleArray($results, 'workflow_id');
            $data = array(
                'menu_id' => $menu_id,
                'workflow_ids' => $results
            );
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
        return response()->json($res);
    }

    public function saveMenuWorkflowLinkage(Request $request)
    {
        $menu_id = $request->input('menu_id');
        $workflow_id = $request->input('workflow_id');
        $workflow_stages = $request->input('workflow_stages');
        $res = array();
        try {
            DB::transaction(function () use ($menu_id, $workflow_id, $workflow_stages, &$res) {
                $workflow_stages = json_decode($workflow_stages);
                $params = array();
                DB::table('wf_menus_stages')
                    ->where('menu_id', $menu_id)
                    ->delete();
                if (isset($workflow_stages) > 0) {
                    foreach ($workflow_stages as $workflow_stage) {
                        $params[] = array(
                            'menu_id' => $menu_id,
                            'stage_id' => $workflow_stage,
                            'created_on' => Carbon::now(),
                            'created_by' => \Auth::user()->id
                        );
                    }
                    DB::table('wf_menus_stages')
                        ->insert($params);
                }
                DB::table('par_menus')
                    ->where('id', $menu_id)
                    ->update(array('workflow_id' => $workflow_id));
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

    public function saveMenuWorkFlowsLinkage(Request $request)
    {
        $menu_id = $request->input('menu_id');
        $workflow_ids = $request->input('workflow_ids');
        $res = array();
        try {
            DB::transaction(function () use ($menu_id, $workflow_ids, &$res) {
                $workflow_ids = json_decode($workflow_ids);
                $params = array();
                DB::table('wf_menu_workflows')
                    ->where('menu_id', $menu_id)
                    ->delete();
                if (count($workflow_ids) > 0) {
                    foreach ($workflow_ids as $workflow_id) {
                        $params[] = array(
                            'menu_id' => $menu_id,
                            'workflow_id' => $workflow_id,
                            'created_on' => Carbon::now(),
                            'created_by' => \Auth::user()->id
                        );
                    }
                    DB::table('wf_menu_workflows')
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

    public function deleteMenuWorkflowLinkage(Request $request)
    {
        $menu_id = $request->input('menu_id');
        try {
            DB::table('wf_menus_stages')
                ->where('menu_id', $menu_id)
                ->delete();
            DB::table('par_menus')
                ->where('id', $menu_id)
                ->update(array('workflow_id' => null));
            $res = array(
                'success' => true,
                'message' => 'Workflow data deleted successfully!!'
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

    public function deleteMenuWorkFlowsLinkage(Request $request)
    {
        $menu_id = $request->input('menu_id');
        try {
            DB::table('wf_menu_workflows')
                ->where('menu_id', $menu_id)
                ->delete();
            $res = array(
                'success' => true,
                'message' => 'Workflow setup data deleted successfully!!'
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

    public function getWorkflowStageResponsibleGroups(Request $request)//deprecated
    {
        $workflow_id = $request->input('workflow_id');
        try {
            //get associated menus
            $qry1 = DB::table('wf_menu_workflows')
                ->select('menu_id')
                ->where('workflow_id', $workflow_id);
            $menus = $qry1->get();
            $menus = convertStdClassObjToArray($menus);
            $menus = convertAssArrayToSimpleArray($menus, 'menu_id');
            //get groups assigned to these menus
            $qry2 = DB::table('par_groups as t1')
                ->select('t1.*')
                ->whereIn('t1.id', function ($query) use ($menus) {
                    $query->select(DB::raw('t2.group_id'))
                        ->from('tra_permissions as t2')
                        ->whereIn('t2.menu_id', $menus);
                });
            $results = $qry2->get();
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

    public function getWorkflowStagePossibleResponsibleGroups(Request $request)
    {
        $stage_id = $request->input('stage_id');
        $directorate_id = $request->input('directorate_id');
        $department_id = $request->input('department_id');
        $zone_id = $request->input('zone_id');
        $workflow_id = $request->input('workflow_id');
        try {
            //get associated menus
            $qry1 = DB::table('wf_menu_workflows')
                ->select('menu_id')
                ->where('workflow_id', $workflow_id);
            $menus = $qry1->get();
            $menus = convertStdClassObjToArray($menus);
            $menus = convertAssArrayToSimpleArray($menus, 'menu_id');

            $qry = DB::table('par_groups as t1')
                ->leftJoin('par_directorates as t2', 't1.directorate_id', '=', 't2.id')
                ->leftJoin('par_departments as t3', 't1.department_id', '=', 't3.id')
                ->leftJoin('par_zones as t4', 't1.zone_id', '=', 't4.id')
                ->leftJoin('wf_stages_groups as t5', function ($join) use ($stage_id) {
                    $join->on('t1.id', '=', 't5.group_id')
                        ->on('t5.stage_id', '=', DB::raw($stage_id));
                })
                ->select('t1.*', 't2.name as directorate', 't3.name as department', 't4.name as zone', 't5.id as stage_group_id')
                ->whereIn('t1.id', function ($query) use ($menus) {
                    $query->select(DB::raw('t2.group_id'))
                        ->from('tra_permissions as t2')
                        ->where('t2.accesslevel_id', '<>', 1)
                        ->whereIn('t2.menu_id', $menus);
                });
            if (isset($directorate_id) && $directorate_id != '') {
                $qry->where('t1.directorate_id', $directorate_id);
            }
            if (isset($department_id) && $department_id != '') {
                $qry->where('t1.department_id', $department_id);
            }
            if (isset($zone_id) && $zone_id != '') {
                $qry->where('t1.zone_id', $zone_id);
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
    function getMultiStageAssignment($workflow_id,$assessment_stage_id){
        $stage_id = 0;
        $record = DB::table('wf_workflow_stages')
                    ->where(array('workflow_id'=>$workflow_id, 'assessment_stage_id'=>$assessment_stage_id))
                    ->first();
        if($record){
              $stage_id = $record->id;  

        }

        return $stage_id; 
    }
    public function getSubmissionNextStageDetails(Request $request)
    {
        $current_stage = $request->input('current_stage');
        $action = $request->input('action');
        $application_code = $request->input('application_code');
        $where = array(
            't1.stage_id' => $current_stage,
            't1.action_id' => $action

        );
        try {
            $qry = DB::table('wf_workflow_transitions as t1')
                ->join('wf_workflow_actions as t2', 't1.action_id', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.nextstage_id', 't3.id')
                ->leftJoin('tra_appmultiassessment_userassignment as t4', function ($join) use ($application_code) {
                    $join->on('t3.id', '=', 't4.workflow_stage_id')
                        ->where('t4.application_code', '=', $application_code);
                })
                ->select('t1.*','t3.workflow_id','t4.responsible_user_id', 't2.has_multistage_assignment', 't2.is_to_portal', 't2.is_external_usersubmission', 't3.needs_responsible_user', 't2.is_inspection_submission')
                ->where($where);
            $results = $qry->first();
            //get the details 

            if (!is_null($results)) {
            $has_multistage_assignment = $results->has_multistage_assignment;
            $workflow_id = $results->workflow_id;
            if($has_multistage_assignment == 1){
                $results->screening_stage_id = $this->getMultiStageAssignment($workflow_id,1);
                $results->inspection_schedulingstage_id = $this->getMultiStageAssignment($workflow_id,2);
                $results->firstassessment_stage_id = $this->getMultiStageAssignment($workflow_id,3);
                $results->secondassessment_stage_id = $this->getMultiStageAssignment($workflow_id,4);
                $results->assessmentreport_reviewstage_id = $this->getMultiStageAssignment($workflow_id,5);
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

    public function getSubmissionResponsibleUsers(Request $request)
    {
        $next_stage = $request->input('next_stage');
        //added
        $is_inspection = $request->input('is_inspection');
        $inspection_id = $request->input('inspection_id');
        $module_id = $request->input('module_id');
        //end
        try {
            if ($is_inspection == 1) {
                $results = $this->getInspectionSubmissionResponsibleUsers($inspection_id, $module_id);
            } else {
                //query 1
                $qry1 = DB::table('wf_stages_groups as t1')
                    ->select('t1.group_id')
                    ->where('stage_id', $next_stage);
                $stage_groups = $qry1->get();
                $stage_groups = convertStdClassObjToArray($stage_groups);
                $stage_groups = convertAssArrayToSimpleArray($stage_groups, 'group_id');
                //query 2
                
                $qry2 = DB::table('users as t2')
                    ->select(DB::raw("t2.id,CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as name"))
                    ->whereIn('t2.id', function ($query) use ($stage_groups) {
                        $query->select(DB::raw('t3.user_id'))
                            ->from('tra_user_group as t3')
                            ->whereIn('t3.group_id', $stage_groups);
                    })
                     ->orWhereIn('t2.id', function ($query) use ($stage_groups) {
                          $date_today = Carbon::now();
                        $query->select(DB::raw('t4.user_id'))
                            ->from('tra_actingposition_management as t4')
                               ->whereRaw("acting_date_to >= '".formatDate($date_today)."' ")
                            ->whereIn('t4.group_id', $stage_groups);
                    });
                $results = $qry2->get();
            }
            //return
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

    public function getInspectionSubmissionResponsibleUsers($inspection_id, $module_id)
    {
        if ($module_id == 3) {//GMP
            $table_name = 'gmp_inspectorsdetails';
        } else {
            $table_name = 'tra_premiseinspection_inspectors';
        }
        $qry2 = DB::table($table_name . ' as t1')
            ->join('users as t2', 't1.inspector_id', '=', 't2.id')
            ->select(DB::raw("t1.role_id,t2.id,CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as name"))
            ->where('t1.inspection_id', $inspection_id);
        $results = $qry2->get();
        return $results;
    }

    public function showWorkflowDiagram(Request $request)
    {
        try {
            $data = array();
            $workflow_id = $request->input('workflow_id');
            $states = DB::table('wf_workflow_stages')
                ->select(DB::raw("id,name as text,stage_status as status"))
                ->where('workflow_id', $workflow_id)
                ->get();
            $transitions = DB::table('wf_workflow_transitions as t1')
                ->join('wf_workflow_actions as t2', 't1.action_id', '=', 't2.id')
                ->select(DB::raw("t1.stage_id as 'from',t1.nextstage_id as 'to',t2.name as text"))
                ->where('t1.workflow_id', $workflow_id)
                ->get();
            $diagramDataArray = array(
                "nodeKeyProperty" => "id",
                'nodeDataArray' => $states,
                'linkDataArray' => $transitions
            );
            $data['workflowData'] = $diagramDataArray;
        } catch (\Exception $exception) {

        } catch (\Throwable $throwable) {

        }
        return view('workflow::workflow', $data);
    }
    public function handleRevenueRequestApplicationSubmission(Request $request){
        $this->processRevenueApplicationSubmission($request);
       
    }

    public function handleApplicationSubmission(Request $request)
    {
        $module_id = $request->input('module_id');
        $table_name = $request->input('table_name');
            if($table_name == ''){
                $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
                $request->table_name = $table_name;
                
            }
        $module_id = $request->input('module_id');
        if ($module_id == 1) {//PRODUCT REGISTRATION
            $this->processProductsApplicationSubmission($request);
        } else if ($module_id == 2) {//PREMISE REGISTRATION
            $this->processPremiseApplicationSubmission($request);
        } else if ($module_id == 3) {//GMP APPLICATIONS
            $this->processGmpApplicationsSubmission($request);
        } else if ($module_id == 7) {//CLINICAL TRIAL
            $this->processClinicalTrialApplicationsSubmission($request);
        } else if ($module_id == 5) {//SURVEILLANCE
            $this->processSurveillanceApplicationsSubmission($request);
        } else if ($module_id == 14) {
            $this->processNormalApplicationSubmissionForPromoAndAdverts($request);

        } else if ($module_id == 6) {
            $this->processProductsNotificationSubmission($request);

        }
        else if ($module_id == 4 || $module_id == 12) {//PRODUCT REGISTRATION
            $this->processImportExportApplicationSubmission($request);
        } else if ($module_id == 15) {//PRODUCT REGISTRATION
            $this->processDisposalApplicationSubmission($request);
        } else if ($module_id == 17) {//PRODUCT REGISTRATION
            $this->processRevenueApplicationSubmission($request);
        }else if ($module_id == 18) {//inventory REGISTRATION
            $this->processNormalApplicationSubmission($request);
        } else if ($module_id == 20) {//PRODUCT REGISTRATION
            $this->processImportExportApplicationSubmission($request);
        }else {
           echo "module not set";
        }
    }

    public function handleManagersApplicationSubmissions(Request $request)
    {
        $module_id = $request->input('module_id');
        if ($module_id == 1) {//PRODUCT REGISTRATION
            $this->processProductManagersApplicationSubmission($request);
        } else if ($module_id == 2) {//PREMISE REGISTRATION
            $this->processPremiseManagersApplicationSubmission($request);
        } else if ($module_id == 3) { //GMP APPLICATIONS
            $this->processGmpManagersApplicationSubmission($request);
        } else if ($module_id == 7) {//CLINICAL TRIAL
            $this->processClinicalTrialManagersApplicationSubmission($request);
        } else if ($module_id == 5) {//SURVEILLANCE
            $this->processSurveillanceManagersApplicationSubmission($request);
        } else if ($module_id == 14) {//PROMOTION MATERIALS
            $this->processPromotionMaterialManagersApplicationSubmission($request);
        } else if ($module_id == 6) {//PROMOTION MATERIALS
            $this->processProductNotificationManagersSubmission($request);
        } else if ($module_id == 4 || $module_id == 20 || $module_id == 12) {//PROMOTION MATERIALS
            $this->processImportExportManagersApplicationSubmission($request);
        }else if ($module_id == 15) {//PROMOTION MATERIALS
            $this->processImportExportManagersApplicationSubmission($request);
        }  else {
            //unknown module
            echo "module not set";
        }
    }
    public function receiveOnlineApplicationDetails(Request $request)
    {
        $module_id = $request->input('module_id');
        $res = array();
        if ($module_id == 1) {//PRODUCT REGISTRATION
            $res = $this->saveProductOnlineApplicationDetails($request);
        } else if ($module_id == 2) {//PREMISE REGISTRATION
            $res = $this->savePremiseOnlineApplicationDetails($request);
        } else if ($module_id == 3) { //GMP APPLICATIONS
            $res = $this->saveGmpOnlineApplicationDetails($request);
        } else if ($module_id == 7) { //CLINICAL TRIAL
            $res = $this->saveClinicalTrialOnlineApplicationDetails($request);
        } else if ($module_id == 4  || $module_id == 12) { //IMPORT & EXPORT
            $res = $this->saveImportExportOnlineApplicationDetails($request);
        } else if ($module_id == 14) { //PROMOTION MATERIALS
            $res = $this->receivePromoAdvertsOnlineApplicationDetails($request);
        } else if ($module_id == 6) { //PRODUCT NOTIFICATION
            $res = $this->saveMedicalNotificationOnlineApplicationDetails($request);

        } else if ($module_id == 15) { //IMPORT & EXPORT
            $res = $this->saveDisposalOnlineApplicationDetails($request);
        }  else if ($module_id == 20) { //IMPORT & EXPORT
            $res = $this->saveDeclaredImportExportApplicationDetails($request);
        }else {
            //unknown module

        }
        if($res['success']){
            //remove record in the online submissions 
            $application_code = $request->application_code;
            $user_id = \Auth::user()->id;
            $where = array(
                'application_code' => $application_code
            );
            $previous_data = getPreviousRecords('tra_onlinesubmissions', $where);
            if ($previous_data['success']) {
                $previous_data = $previous_data['results'];
                //update 
                $onlinesubmission_status_id = 2;
                $update_data = array('onlinesubmission_status_id'=>$onlinesubmission_status_id,'date_received'=>Carbon::now(),'altered_by'=>$user_id, 'dola'=>Carbon::now());
                updateRecord('tra_onlinesubmissions', $previous_data, $where, $update_data, $user_id);
               // deleteRecord('tra_onlinesubmissions', $previous_data, $where, $user_id);

            }
           

        }
        return \response()->json($res);
    }
    public function receiveMultipleOnlineApplicationDetails(Request $request)
    {
        $selected = $request->input('selected');
        $module_id = $request->input('module_id');
        $selected_appCodes = $request->input('selected_appCodes');
        $selected_appCodes = json_decode($selected_appCodes);
        $selected_ids = json_decode($selected);

        $res = array();
        if ($module_id == 4  || $module_id == 12) { //IMPORT & EXPORT
            $res = $this->saveMultiImportExportOnlineApplicationDetails($request);
        } 

        if($res['success']){
            
                foreach( $selected_appCodes as  $application_code){
                
                    $user_id = \Auth::user()->id;
                    $where = array(
                        'application_code' => $application_code
                    );
                    $previous_data = getPreviousRecords('tra_onlinesubmissions', $where);
                    if ($previous_data['success']) {
                        $previous_data = $previous_data['results'];
                        //update 
                        $onlinesubmission_status_id = 2;
                        $update_data = array('onlinesubmission_status_id'=>$onlinesubmission_status_id,'date_received'=>Carbon::now(),'altered_by'=>$user_id, 'dola'=>Carbon::now());
                        updateRecord('tra_onlinesubmissions', $previous_data, $where, $update_data, $user_id);
                        
                    }
            }
        }
        return \response()->json($res);
    }

    
    public function saveonlineapplicationreceiceinvoiceDetails(Request $request)
    {
        
        $module_id = $request->input('module_id');
        $res = array();
        if ($module_id == 1) {//PRODUCT REGISTRATION
            $res = $this->saveProductsOnlineapplicationreceiceinvoiceDetails($request);
        } else if ($module_id == 2) {//PREMISE REGISTRATION
            $res = $this->savePremisesOnlinereceiceinvoiceDetails($request);
        } else if ($module_id == 3) { //GMP APPLICATIONS
            $res = $this->saveGmpOnlinereceiceinvoiceDetails($request);
        } else if ($module_id == 7) { //CLINICAL TRIAL
            $res = $this->saveClinicalOnlinereceiceinvoiceDetails($request);
        } else if ($module_id == 4  || $module_id == 12) { //IMPORT & EXPORT
            $res = $this->saveImportExportOnlineApplicationDetails($request);
        } else if ($module_id == 14) { //PROMOTION MATERIALS
            $res = $this->receivePromoAdvertsOnlineApplicationDetails($request);
        } else if ($module_id == 6) { //PRODUCT NOTIFICATION
            $res = $this->saveMedicalNotificationOnlineApplicationDetails($request);

        } else if ($module_id == 15) { //IMPORT & EXPORT
            $res = $this->saveDisposalOnlineApplicationDetails($request);
        } else if ($module_id == 17) { //adhoc
            $res = $this->saveAdhocInvoiceApplicationDetails($request);
        } else {
            //unknown module

        }
        return \response()->json($res);
    }
    
    public function processNormalApplicationSubmission(Request $request, $keep_status = false)
    {
        $application_id = $request->input('application_id');
        $table_name = $request->input('table_name');
        $module_id = $request->input('module_id');
        $prev_stage = $request->input('curr_stage_id');
        $action = $request->input('action');
        $to_stage = $request->input('next_stage');
        
        $is_dataammendment_request = $request->input('is_dataammendment_request');
        $is_inspection_submission = $request->input('is_inspection_submission');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            
        $module_id = $request->input('module_id');
            if($table_name == ''){
                $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
            }
            if($table_name == 'tra_product_notifications'){
                $table_name = 'tra_product_applications';
            }
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
           
            $application_status_id = getApplicationTransitionStatus($prev_stage, $action, $to_stage); 
            if ($keep_status == true) {//for approvals
                $application_status_id = $application_details->application_status_id;
            }
            $where = array(
                'id' => $application_id
            );
            if($is_dataammendment_request != 1){
                $app_update = array(
                    'workflow_stage_id' => $to_stage,
                    'application_status_id' => $application_status_id
                );
                $prev_data = getPreviousRecords($table_name, $where);
                if ($prev_data['success'] == false) {
                    echo json_encode($prev_data);
                    exit();
                }
                $update_res = updateRecord($table_name, $prev_data['results'], $where, $app_update, $user_id);
    
                if ($update_res['success'] == false) {
                    echo json_encode($update_res);
                    exit();
                }
            }
            //check the surveillace 
            if($module_id == 5){
                if($to_stage == 364){
                    $samples_nextstage = 1;
                    DB::table('tra_surveillance_sample_details as t1')
                        ->where('t1.application_id', $application_id)
                         ->where('t1.stage_id','<>', $samples_nextstage)
                         ->update(array('stage_id'=>$samples_nextstage));
                }
                else if($to_stage == 365){
                    $samples_nextstage = 2;
                    DB::table('tra_surveillance_sample_details as t1')
                        ->where('t1.application_id', $application_id)
                         ->where('t1.stage_id','<>', $samples_nextstage)
                         ->update(array('stage_id'=>$samples_nextstage));
                }
                
            }
            
            $this->updateApplicationSubmission($request, $application_details, $application_status_id);
           
 
        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            exit();
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            exit();
        }
    }

    public function processNormalManagersApplicationSubmission(Request $request, $keep_status = false,$action_type= 0)
    {
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $selected_appCodes = $request->input('selected_appCodes');
        $selected_appCodes = json_decode($selected_appCodes);
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
if($table_name == ''){
                $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
                $request->table_name = $table_name;
                
            }
        try {
            //get application_details
            if(count($selected_appCodes) >0){
                $application_details = DB::table($table_name)
                        ->whereIn('application_code', $selected_appCodes)
                        ->get();
            }
            else{
                $application_details = DB::table($table_name)
                            ->whereIn('id', $selected_ids)
                            ->get();
            }
            
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            // DB::transaction(function () use ($request, $selected_ids, &$res, $table_name, $user_id, $application_id, $process_id, $application_details, $process_details) {
            $application_codes = array();
            $is_manager_submission = $request->input('is_manager_submission');
            $expected_start_date = $request->input('expected_start_date');
            $expected_end_date = $request->input('expected_end_date');
            $external_user_id = $request->input('external_user_id');
            $is_dataammendment_request = $request->input('is_dataammendment_request');
            
             
            $from_stage = $request->input('curr_stage_id');
            $action = $request->input('action');
            $to_stage = $request->input('next_stage');
           
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $directive_id = $request->input('directive_id');
            $urgency = $request->input('urgency');
            $transition_params = array();
            $submission_params = array();
            $multisubmission_params = array();
            $multiassignment_params = array();
            //process other details

            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);

            //todo get workflow action details
            $action_details = $this->getApplicationWorkflowActionDetails($action);
            $keep_status = $action_details->keep_status;
            $has_process_defination = $action_details->has_process_defination;
            $appprocess_defination_id = $action_details->appprocess_defination_id;
            //meeting inivitation
            $has_technicalmeeting_notification = $action_details->has_technicalmeeting_notification;
            $technicalmeetinemail_msg_id = $action_details->technicalmeetinemail_msg_id;
            
            $has_preminsp_notification = $action_details->has_preminsp_notification;
            $preminspmail_msg_id = $action_details->preminspmail_msg_id;
            $has_email_notification = $action_details->has_email_notification;
            $email_message_id = $action_details->email_message_id;

            $has_appdate_defination = $action_details->has_appdate_defination;
            $appdate_defination_id = $action_details->appdate_defination_id;
             $is_inspection_submission = 0;
            if(isset($action_details->is_inspection_submission)){
                 $is_inspection_submission = $action_details->is_inspection_submission;
            }
           
            $appdate_defination = getSingleRecordColValue('par_appprocess_definations', array('id'=>$appdate_defination_id),'code');
            
            $processtransition_data = $this->getActionTransitionDetails($action);
            $is_multi_submission = $processtransition_data->is_multi_submission;
            $multinextstage_id = $processtransition_data->multinextstage_id;
            
            $portal_table = getPortalApplicationsTable($module_id);
            
            $application_processdefdata = array();
            $multisubmission_params = array();
            $inspectors = array();
            //application details
            foreach ($application_details as $key => $application_detail) {
                
                if ($keep_status == true) {
                    $application_status_id = $application_detail->application_status_id;
                }
                if ($action_details->update_portal_status == 1) {
                    $portal_status_id = $action_details->portal_status_id;
                    $proceed = updatePortalApplicationStatus($application_detail->id, $portal_status_id, $table_name, $portal_table);
                    
                    if ($proceed == false) {
                        echo json_encode($proceed);
                        exit();
                    }
                }
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
                    'application_status_id' => $application_status_id,
                    'process_id' => $process_id,
                    'from_stage' => $from_stage,
                    'to_stage' => $to_stage,
                    'author' => $user_id,
                    'directive_id' => $directive_id,
                    'remarks' => $remarks,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                //submissions
                if($action_type == 11){
                    $responsible_user = $this->getApplicationInspEvaUsers($application_detail->application_code);
                }
                $application_code = $application_detail->application_code;
                
                $submission_data = array(
                    'application_id' => $application_detail->id,
                    'view_id' => $application_detail->view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'zone_id' => $application_detail->zone_id,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $application_detail->sub_module_id,
                    'zone_id' => $application_detail->zone_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'directive_id' => $directive_id,
                    'external_user_id' => $external_user_id,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                if(validateIsNumeric($request->screening_stage_id)){

                    $multiassignment_params[] = $this->funcReturnMultiAsignment($request->screening_stage_id,$request->screening_respuser_id,$application_detail,$user_id); 
                }
               
                if(validateIsNumeric($request->inspection_schedulingstage_id)){
                    $multiassignment_params[] = $this->funcReturnMultiAsignment($request->inspection_schedulingstage_id,$request->inspectionscheduling_respuser_id,$application_detail,$user_id); 
                    
                  
                }if(validateIsNumeric($request->inspection_stage_id)){
                    $multiassignment_params[] = $this->funcReturnMultiAsignment($request->inspection_stage_id,$request->inspection_respuser_id,$application_detail,$user_id); 

                }if(validateIsNumeric($request->firstassessment_stage_id)){
                    $multiassignment_params[] = $this->funcReturnMultiAsignment($request->firstassessment_stage_id,$request->firstassessment_respuser_id,$application_detail,$user_id); 

                }if(validateIsNumeric($request->secondassessment_stage_id)){
                    $multiassignment_params[] = $this->funcReturnMultiAsignment($request->secondassessment_stage_id,$request->secondassessment_respuser_id,$application_detail,$user_id); 

                }if(validateIsNumeric($request->assessmentreport_reviewstage_id)){
                    $multiassignment_params[] = $this->funcReturnMultiAsignment($request->assessmentreport_reviewstage_id,$request->assessmentreportreview_respuser_id,$application_detail,$user_id); 

                }
              
                if(validateIsNumeric($external_user_id)){
                    $submission_data['usr_to'] = $external_user_id;
                    //send and email to the Extrenal user
                    $module_name = getSingleRecordColValue('modules', array('id'=>$module_id), 'name');
                    $process_name = getSingleRecordColValue('wf_tfdaprocesses', array('id'=>$process_id), 'name');
                    $process_stage = getSingleRecordColValue('wf_workflow_stages', array('id'=>$to_stage), 'name');
                    $email_address = aes_decrypt(getSingleRecordColValue('users', array('id'=>$external_user_id), 'email'));
                    $vars = array(
                        '{module_name}' => $module_name,
                        '{process_name}' => $process_name,
                        '{process_stage}' => $process_stage,
                     );
                    sendTemplatedApplicationNotificationEmail(16, $email_address,$vars);
                    //send an email to the rest of the users 

                }
                if($is_manager_submission == 1){
                    $submission_data['expected_start_date'] = $expected_start_date;
                    $submission_data['expected_end_date'] = $expected_end_date;
                }
                if($has_appdate_defination == 1){
                         $application_processdefdata[] =   array('application_code'=>$application_code,
                                                        'appprocess_defination_id'=>$appprocess_defination_id, 
                                                        'process_date'=>Carbon::NOW(), 
                                                        'created_by'=>$user_id, 
                                                        'created_on'=>Carbon::NOW());
                }
                

                $submission_params[] = $submission_data;
                $application_codes[] = array($application_detail->application_code);
               
                if($is_multi_submission == 1){
                    $submission_data['current_stage'] =  $multinextstage_id;
                    $submission_data['usr_to'] =  '';
                    $multisubmission_params[] = $submission_data;
                }

                if($is_inspection_submission == 1){
                  //get Inspectors
                  $inspectors[] = $this->getInspectorsIDList($module_id, $application_detail->application_code);
                }

                //check if Application is from inspection Submission
                $this->setIsDoneIFInspectionApplicationSubmission($application_detail->application_code, $from_stage);
            }
          
            //application update
            $update_params = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id,
                'dola'=>Carbon::now()
            );
            if($has_appdate_defination == 1){

                $appdate_defination = array($appdate_defination=>Carbon::now(),'dola'=>Carbon::now());
               /* $app_update = DB::table($table_name . ' as t1')
                                ->whereIn('application_code', $selected_appCodes)
                                ->update($appdate_defination);
                                */
            }
            if(count($application_processdefdata) >0){

                DB::table('tra_applications_processdefinations')
                         ->insert($application_processdefdata);

            }
            if($is_dataammendment_request != 1){
                if(count($selected_appCodes) >0){
                        
                            $app_update = DB::table($table_name . ' as t1')
                    ->whereIn('application_code', $selected_appCodes)
                    ->update($update_params);

                }
                else{
                    
                    $app_update = DB::table($table_name . ' as t1')
                    ->whereIn('id', $selected_ids)
                    ->update($update_params);

                }
             
            }
            
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            if($is_inspection_submission == 1){
                //loop through while updating submissions data
                 foreach ($inspectors as $inspector_array) {
                    foreach ($inspector_array as $inspector) {
                        foreach ($submission_params as $submission_param) {
                            //change usr_to
                            $submission_param['usr_to'] = $inspector->inspector_id;
                            //update submissions
                            DB::table('tra_submissions')->insert($submission_param);
                        }
                    } 
                 }
             } else {

                    DB::table('tra_submissions')
                        ->insert($submission_params);
             }

            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);

            if(count($multisubmission_params) >0){
               
                DB::table('tra_submissions')->insert($multisubmission_params);
                //print_r(($multisubmission_params));
            
            }
            if(count($multiassignment_params) >0){
               
                DB::table('tra_appmultiassessment_userassignment')->insert($multiassignment_params);
               
            }
            //for the email notification and more so the meeting details 
          //  $has_technicalmeeting_notification $has_email_notification $email_message_id
          
          if($has_preminsp_notification == 1){
                 $application_code = $application_detail->application_code;
                //get the inspectors email
                $inspection_details = $this->getPremisesInspectionDetails($application_code);
                $inspectors_email = $this->getPremInspectorsEmail($application_code);

                $vars = array(
                    '{start_date}'=>$inspection_details->start_date,
                    '{end_date}'=>$inspection_details->end_date,
                    '{description}'=>$inspection_details->description,
                    '{lead_inspector}'=>$inspection_details->lead_inspector
                );
                sendTemplatedApplicationNotificationEmail($preminspmail_msg_id, $inspectors_email,$vars);

          }
          if($has_technicalmeeting_notification == 1){
              //get the emails 

             //meeting participants emails 
             if(validateIsNumeric($application_detail->application_code)){
                    $app_description = '';
                    $application_code = $application_detail->application_code;
                    //var_dump($application_detail);
                    $meeting_details = $this->getMeetingDetails($application_code);
                    
                    //var_dump($meeting_details);exit;
                    $meeting_attendantsemail = $this->getMeetingAttendantsEmails($application_code);
                    $directorate_details = $this->getDirectorateInformation($section_id);
                    if($directorate_details){
                        $meeting_id = $meeting_details->id;
                        //->select(DB::raw("t2.name as directorate_name, CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as director_name"))
                        $directorate_name = $directorate_details->directorate_name;
                        $director_name = $directorate_details->director_name;
                        $section_name = $directorate_details->section_name;
                    } else {
                        $meeting_id ="" ;
                        $directorate_name ="";
                        $director_name ="" ;
                        $section_name = "";
                    }
                    
                    $module_name = getSingleRecordColValue('modules', array('id'=>$module_id), 'name');
                   
                    $vars = array(
                        '{meeting_name}' => $meeting_details->meeting_name,
                        '{app_description}' => $app_description,
                        '{meeting_time}' => $meeting_details->meeting_time,
                        '{date_requested}' => $meeting_details->date_requested,
                        '{meeting_venue}' => $meeting_details->meeting_venue,
                        '{directorate_name}' => $directorate_name,
                        '{director_name}' => $director_name,
                        '{section_name}' => $section_name,
                        '{module_name}' => $module_name
                     );
                     
                      //check for the external users and 
                    //sendTemplatedApplicationNotificationEmail($technicalmeetinemail_msg_id, $meeting_attendantsemail,$vars);
                    /*$participantEmails = explode(';',$meeting_attendantsemail);
                    foreach($participantEmails as $participantEmail){
                        sendTemplatedApplicationNotificationEmail($technicalmeetinemail_msg_id, $participantEmail,$vars);
                   }*/
                    //send an email to the rest of the users 
                    $records = DB::table('tc_meeting_participants')
                                    ->select('*')
                                    ->where(array('meeting_id'=>$meeting_id))
                                    ->get();
                                    

                    if($records){
                        
                        foreach ($records as $rec) {
                            
                            $user_id = $rec->user_id;
                            $email_address = $rec->email;
                            $participant_id = $rec->id;
                            //print_r($user_id);

                            /*if(!validateIsNumeric($user_id)){
                                
                                $participant_id = $rec->id;
                                //users details 
                                $table_data = array(
                                    'first_name' => $rec->participant_name,
                                    'mobile' => $rec->phone,
                                    'phone' => $rec->phone,
                                    'user_category_id' => 2
                                );
                                $this->createExternalUserAccountDetails($table_data,$email_address,$participant_id,$vars);
                            }*///endif

                            $table_data = array(
                                'first_name' => $rec->participant_name,
                                'mobile' => $rec->phone,
                                'phone' => $rec->phone,
                                'user_category_id' => 2
                            );
                            $this->createExternalUserAccountDetails($table_data,$email_address,$participant_id,$vars);


                        }//endforeach
                    }//endif

             }
            

          }
          


            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
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
    function funcReturnMultiAsignment($workflow_stage_id,$respuser_id,$application_detail,$user_id){
        $multisubmission_params = array('workflow_stage_id'=>$workflow_stage_id, 
                'application_code'=>$application_detail->application_code, 
                'application_id'=> $application_detail->id, 
                'responsible_user_id'=>$respuser_id,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
        );
        return $multisubmission_params;
    }
    public function createExternalUserAccountDetails($table_data,$email_address,$participant_id,$vars){
        $skipArray = array('user_category_id');
        $table_data = encryptArray($table_data, $skipArray);
        
        $encryptedEmail = aes_encrypt($email_address);
        $email_exists = DB::table('users')
            ->where('email', $encryptedEmail)
            ->first();


        if (!$email_exists){
            
            $password = str_random(8);
            $uuid = generateUniqID();//unique user ID
            $pwd = hashPwd($encryptedEmail, $uuid, $password);
            //add extra params
            $table_data['email'] = $encryptedEmail;
            $table_data['password'] = $pwd;
            $table_data['uuid'] = $uuid;

            $base_url = url('/');
            $vars['email_address'] = $email_address;
            $vars['user_password'] = $password;
            $vars['base_url'] = $base_url;
            
            $email_res = sendTemplatedApplicationNotificationEmail(15,$email_address ,$vars);
            
                $results = insertRecord('users', $table_data, $this->user_id);
                if ($results['success'] == true) {
                    $insertId = $results['record_id'];
                    DB::table('tc_meeting_participants')->where(array('id'=>$participant_id))->update(array('user_id'=>$insertId));
                }//endif            
        }//endif
        else{
            
            $base_url = url('/');
            $vars['email_address'] = $email_address;
            $vars['user_password'] = "Please use your current password, If forgotten or do not know, please request a new password to be sent through your email by using the (Forgot password) option";
            $vars['base_url'] = $base_url;
            
            $email_res = sendTemplatedApplicationNotificationEmail(15,$email_address ,$vars);
        }//endelse

    }//endfunction
    
    public function getPremisesInspectionDetails($application_code){
        $records = DB::table('tra_premiseinspection_applications as t1')
                ->join('tra_premise_inspection_details as t2', 't1.inspection_id', 't2.id')
                ->select('t2.*')
                ->where(array('t1.application_code'=>$application_code))
                ->groupBy('t2.id')
                ->first();
        return $records;
    }

    public function getMeetingDetails($application_code){
        $records = DB::table('tc_meeting_applications as t1')
                ->join('tc_meeting_details as t2', 't1.meeting_id', 't2.id')
                ->select('t2.*')
                ->where(array('t1.application_code'=>$application_code))
                ->groupBy('t2.id')
                ->first();
        return $records;
    }
    public function getDirectorateInformation($section_id){
            $record = DB::table('par_sections as t1')
                            ->join('par_directorates as t2', 't1.directorate_id','t2.id')
                            ->join('tra_directorate_directors as t3', 't2.id', 't3.directorate_id')
                            ->join('users as t4','t3.user_id','t4.id')
                            ->select(DB::raw("t2.name as directorate_name, CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as director_name, t1.name as section_name"))
                            ->where('t1.id', $section_id)
                            ->first();
             return $record;
    }
    
    public function getPremInspectorsEmail($application_code){
        $inspectors_email = array();
            $records = DB::table('tra_premiseinspection_applications as t1')
                            ->join('tra_premise_inspection_details as t2', 't1.inspection_id', 't2.id')
                            ->join('tra_premiseinspection_inspectors as t3', 't2.id','t3.inspection_id')
                            ->join('users as t4', 't3.inspector_id','t4.id')
                            ->select(DB::raw("decrypt(t4.email) as email") )
                            ->where(array('t1.application_code'=>$application_code))
                            ->groupBy('t3.id')
                            ->get();
            if($records){
                foreach ($records as $rec) {
                    $inspectors_email[] = $rec->email;
                }
            }
            $inspectors_email=implode(';',$inspectors_email);
            return $inspectors_email;

    }
    public function getMeetingAttendantsEmails($application_code){
        $meeting_attendantsemail = array();
            $records = DB::table('tc_meeting_applications as t1')
                            ->join('tc_meeting_details as t2', 't1.meeting_id', 't2.id')
                            ->join('tc_meeting_participants as t3', 't2.id','t3.meeting_id')
                            ->select('t3.email')
                            ->where(array('t1.application_code'=>$application_code))
                            ->groupBy('t3.id')
                            ->get();
            if($records){
                foreach ($records as $rec) {
                    $meeting_attendantsemail[] = $rec->email;
                }
            }
            $meeting_attendantsemail=implode(';',$meeting_attendantsemail);
            return $meeting_attendantsemail;

    }
public function getApplicationInspEvaUsers($application_code){
    $record = DB::table('tra_submissions as t1')
                    ->join('wf_workflow_stages as t2', 't1.current_stage', 't2.id')
                ->where(array('t1.application_code'=>$application_code, 'is_inspassessment_stage'=>1))
                ->orderBy('t1.id', 'desc')
                ->select('t1.usr_to')
                ->first();
    $user_to =$record->usr_to;
return $user_to;
}
    public function processNewApprovalApplicationSubmission(Request $request, $keep_status = false)
    {
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details id
            $application_details = DB::table($table_name)
                ->whereIn('id', $selected_ids)
                ->get();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $action = $request->input('action');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $directive_id = $request->input('directive_id');
            $is_dataammendment_request = $request->input('is_dataammendment_request');
            
            $urgency = $request->input('urgency');
            $transition_params = array();
            $submission_params = array();
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            $portal_table_name = getPortalApplicationsTable($module_id);
            //application details
            $action_details = $this->getApplicationWorkflowActionDetails($action);
            $keep_status = $action_details->keep_status;
            $has_process_defination = $action_details->has_process_defination;
            $appprocess_defination_id = $action_details->appprocess_defination_id;

            $has_appdate_defination = $action_details->has_appdate_defination;
            $appdate_defination_id = $action_details->appdate_defination_id;
            $appdate_defination = getSingleRecordColValue('par_appprocess_definations', array('id'=>$appdate_defination_id),'code');
            $application_processdefdata = array();
            foreach ($application_details as $key => $application_detail) {
                if ($keep_status == true) {
                    $application_status_id = $application_detail->application_status_id;
                }
                //update registration table
                if ($application_detail->application_status_id == 6) {//approved
                    $reg_status_id = 2;
                    $validity_id = 2;
                    $portal_status_id = 10;

                    /* $vars = array(
                         '{reference_no}' => $application_detail->reference_no,
                     );
                     $applicant_email = getSingleRecordColValue('wb_trader_account', array('id' => $application_detail->applicant_id), 'email');
                     $permit_report = $this->generatePremisePermit($application_detail->premise_id);
                     $certificate_report = $this->generatePremiseCertificate($application_detail->premise_id);
                     applicationPermitEmail(7, $applicant_email, $vars, $permit_report,$certificate_report);*/
                } else {
                    $reg_status_id = 3;
                    $validity_id = 3;
                    $portal_status_id = 11;
                }
                $application_code=  $application_detail->application_code;
                //$this->updateRegTableRecordStatusOnApproval($application_detail, $module_id, $reg_status_id);
                updatePortalApplicationStatus($application_detail->id, $portal_status_id, $table_name, $portal_table_name);
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
                    'application_status_id' => $application_status_id,
                    'process_id' => $process_id,
                    'from_stage' => $from_stage,
                    'to_stage' => $to_stage,
                    'author' => $user_id,
                    'directive_id' => $directive_id,
                    'remarks' => $remarks,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                //submissions
                $submission_params[] = array(
                    'application_id' => $application_detail->id,
                    'view_id' => $application_detail->view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'zone_id' => $application_detail->zone_id,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'directive_id' => $directive_id,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                $application_codes[] = array($application_detail->application_code);
                if($has_appdate_defination == 1){
                            $application_processdefdata[] =   array('application_code'=>$application_code,
                                                        'appprocess_defination_id'=>$appprocess_defination_id, 
                                                        'process_date'=>Carbon::NOW(), 
                                                        'created_by'=>$user_id, 
                                                        'created_on'=>Carbon::NOW());
                }

            }
            
            if($has_appdate_defination == 1){

                $appdate_defination = array($appdate_defination=>Carbon::now(),'dola'=>Carbon::now());
         /*       $app_update = DB::table($table_name . ' as t1')
                                ->whereIn('id', $selected_ids)
                                ->update($appdate_defination);
                                */
            }
            if(count($application_processdefdata) >0){

                DB::table('tra_applications_processdefinations')
                         ->insert($application_processdefdata);

            }
            //application update
            if($is_dataammendment_request != 1){
                $update_params = array(
                    'workflow_stage_id' => $to_stage,
                    'application_status_id' => $application_status_id
                );
                $app_update = DB::table($table_name . ' as t1')
                    ->whereIn('id', $selected_ids)
                    ->update($update_params);
             /*   if ($app_update < 1) {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered while updating application details!!'
                    );
                    echo json_encode($res);
                    exit();
                }
                */
            }
           
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
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
        //return response()->json($res);
        echo json_encode($res);
        exit();
    }

    public function processSubsequentApprovalApplicationSubmission(Request $request)
    {//after New...(Renewals,Alterations/Amendments,Withdrawals, etc)
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name . ' as t1')
                ->join('tra_approval_recommendations as t2', 't1.application_code', '=', 't2.application_code')
                ->select('t1.*', 't2.decision_id')
                ->whereIn('t1.id', $selected_ids)
                ->get();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $action = $request->input('action');
            $directive_id = $request->input('directive_id');
            $urgency = $request->input('urgency');
            $transition_params = array();
            $submission_params = array();
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;

            $portal_table_name = getPortalApplicationsTable($module_id);
            //get is is mutlubmisison 

            //has process defination 

            //has date defination .. update on the application date 
            $action_details = $this->getApplicationWorkflowActionDetails($action);
            $keep_status = $action_details->keep_status;
            $has_process_defination = $action_details->has_process_defination;
            $appprocess_defination_id = $action_details->appprocess_defination_id;

            $has_appdate_defination = $action_details->has_appdate_defination;
            $appdate_defination_id = $action_details->appdate_defination_id;
            $appdate_defination = getSingleRecordColValue('par_appprocess_definations', array('id'=>$appdate_defination_id),'code');
            $application_processdefdata = array();
            //application details
            foreach ($application_details as $key => $application_detail) {
                $application_status_id = $application_detail->application_status_id;
                if ($application_detail->decision_id == 1) {
                    $portal_status_id = 10;
                    $this->updateRegTableRecordTraIDOnApproval($application_detail, $module_id);
                    //$this->updateRegTableRecordStatusOnApproval($application_detail, $module_id, 2);
                } else {
                    $portal_status_id = 11;
                }
                updatePortalApplicationStatus($application_detail->id, $portal_status_id, $table_name, $portal_table_name);
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
                    'application_status_id' => $application_status_id,
                    'process_id' => $process_id,
                    'from_stage' => $from_stage,
                    'to_stage' => $to_stage,
                    'author' => $user_id,
                    'directive_id' => $directive_id,
                    'remarks' => $remarks,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                //submissions
                $application_code = $application_detail->application_code;
                $submission_params[] = array(
                    'application_id' => $application_detail->id,
                    'view_id' => $application_detail->view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'zone_id' => $application_detail->zone_id,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'directive_id' => $directive_id,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                $application_codes[] = array($application_detail->application_code);
                if($has_appdate_defination == 1){
                            $application_processdefdata[] =   array('application_code'=>$application_code,
                                                        'appprocess_defination_id'=>$appprocess_defination_id, 
                                                        'process_date'=>Carbon::NOW(), 
                                                        'created_by'=>$user_id, 
                                                        'created_on'=>Carbon::NOW());
                }

            }
            if($has_appdate_defination == 1){

                $appdate_defination = array($appdate_defination=>Carbon::now(),'dola'=>Carbon::now());
               /* $app_update = DB::table($table_name . ' as t1')
                                ->whereIn('id', $selected_ids)
                                ->update($appdate_defination);
                            */  
            }
            if(count($application_processdefdata) >0){

                DB::table('tra_applications_processdefinations')
                         ->insert($application_processdefdata);

            }
            
            //application update
            $update_params = array(
                'workflow_stage_id' => $to_stage,
                'dola' => Carbon::now()
            );
            $app_update = DB::table($table_name . ' as t1')
                ->whereIn('id', $selected_ids)
                ->update($update_params);
          /*  if ($app_update < 1) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while updating application details!!'
                );
                echo json_encode($res);
                exit();
            }
            */
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);

            
            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
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
        return true;
    }

    public function insertIntoRegistrationTable($application_detail, $module_id, $application_table)
    {
        $user_id = $this->user_id;
        $application_id = $application_detail->id;
        $reg_table = '';
        $reg_column = '';
        $reg_params = array(
            'registration_date' => Carbon::now(),
            'created_by' => $user_id,
            'status_id' => 2
        );
        if ($module_id == 1) {//Products
            $reg_table = 'registered_products';
            $reg_column = 'reg_product_id';
        } else if ($module_id == 2) {//Premises
            $reg_table = 'registered_premises';
            $reg_column = 'reg_premise_id';
            $reg_params['tra_premise_id'] = $application_detail->premise_id;
        } else if ($module_id == 3) {//GMP
            $reg_table = 'registered_manufacturing_sites';
            $reg_column = 'reg_site_id';
            $reg_params['tra_site_id'] = $application_detail->manufacturing_site_id;
        } else {
            //unknown module
        }
        $reg_id = DB::table($reg_table)
            ->insertGetId($reg_params);
        DB::table($application_table)
            ->where('id', $application_id)
            ->update(array($reg_column => $reg_id));
    }

    public function updateRegistrationTable($registered_id, $current_id, $module_id)
    {
        $table_name = '';
        $table_column = '';
        if ($module_id == 1) {//Products
            $table_name = '';
            $table_column = '';
        } else if ($module_id == 2) {//Premises
            $table_name = 'registered_premises';
            $table_column = 'tra_premise_id';
        } else if ($module_id == 3) {//GMP
            $table_name = 'registered_manufacturing_sites';
            $table_column = 'tra_site_id';
        }
        $params = array(
            $table_column => $current_id,
            'altered_by' => $this->user_id
        );
        DB::table($table_name)
            ->where('id', $registered_id)
            ->update($params);
    }

    public function updateRegTableRecordStatusOnApproval($application_detail, $module_id, $status_id)
    {//New Applications
        $reg_table = '';
        $app_reg_column = '';
        $reg_params = array(
            'approval_date' => Carbon::now()
        );
        if ($module_id == 1) {//Products
            $reg_table = 'registered_products';
            $app_reg_column = 'reg_product_id';
        } else if ($module_id == 2) {//Premises
            $reg_table = 'registered_premises';
            $app_reg_column = 'reg_premise_id';
        } else if ($module_id == 3) {//GMP
            $reg_table = 'registered_manufacturing_sites';
            $app_reg_column = 'reg_site_id';
        } else if ($module_id == 7) {//Clinical Trial
            $reg_table = 'registered_clinical_trials';
            $app_reg_column = 'reg_clinical_trial_id';
        } else {
            //unknown module
        }
        $reg_id = $application_detail->$app_reg_column;
        DB::table($reg_table)
            ->where('id', $reg_id)
            ->update($reg_params);
    }

    public function updateRegTableRecordTraIDOnApproval($application_detail, $module_id)
    {//Subsequent Applications (Renewal,Alterations/Amendments, etc)
        $table_name = '';
        $tra_table_column = '';
        $reg_id_column = '';
        $current_id_column = '';
        if ($module_id == 1) {//Products
            $table_name = '';
            $tra_table_column = '';
            $reg_id_column = '';
            $current_id_column = '';
        } else if ($module_id == 2) {//Premises
            $table_name = 'registered_premises';
            $tra_table_column = 'tra_premise_id';
            $reg_id_column = 'reg_premise_id';
            $current_id_column = 'premise_id';
        } else if ($module_id == 3) {//GMP
            $table_name = 'registered_manufacturing_sites';
            $tra_table_column = 'tra_site_id';
            $reg_id_column = 'reg_site_id';
            $current_id_column = 'manufacturing_site_id';
        } else if ($module_id == 7) {//Clinical Trial
            $table_name = 'registered_clinical_trials';
            $tra_table_column = 'tra_clinical_trial_id';
            $reg_id_column = 'reg_clinical_trial_id';
            $current_id_column = 'id';
        }
        $registered_id = $application_detail->$reg_id_column;
        $current_id = $application_detail->$current_id_column;
        $params = array(
            $tra_table_column => $current_id,
            'altered_by' => $this->user_id
        );
        DB::table($table_name)
            ->where('id', $registered_id)
            ->update($params);
    }

    public function processReceivingQueriedApplicationSubmission(Request $request)
    {
        $application_id = $request->input('application_id');
        $module_id = $request->input('module_id');
        $table_name = $request->input('table_name');
        $to_stage = $request->input('next_stage');
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        $user_id = $this->user_id;

        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //todo: get workflow action details
            $action_details = $this->getApplicationWorkflowActionDetails($action);

            if ($action_details->update_portal_status == 1) {
                $portal_status_id = $action_details->portal_status_id;
                $portal_table = getPortalApplicationsTable($module_id);
                $proceed = updatePortalApplicationStatus($application_id, $portal_status_id, $table_name, $portal_table);
                if ($proceed == false) {
                    echo json_encode($proceed);
                    exit();
                }
            }
            $application_code = $application_details->application_code;
            $tracking_no = $application_details->tracking_no;
            //must have unclosed queries since it has been queried
            $continue = $this->validateReceivingQueriedApplication($application_code);
            if ($continue == false) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'The action you selected is not applicable for an application without unclosed queries!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_status_id = getApplicationTransitionStatus($prev_stage, $action, $to_stage);
            $where = array(
                'id' => $application_id
            );
            $app_update = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id
            );
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == false) {
                DB::rollBack();
                echo json_encode($prev_data);
                exit();
            }
            $update_res = updateRecord($table_name, $prev_data['results'], $where, $app_update, $user_id);
            if ($update_res['success'] == false) {
                DB::rollBack();
                echo json_encode($update_res);
                exit();
            }
            updateApplicationQueryRef($application_id, $application_code, $tracking_no, $table_name, $user_id, $module_id, $remarks);
            $this->updateApplicationSubmission($request, $application_details, $application_status_id);
            DB::commit();
        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            exit();
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            exit();
        }
    }

    public function validateReceivingQueriedApplication($application_code)
    {
        $return_val = true;
        //for queried there should be unclosed queries
        $unclosed_queries = DB::table('checklistitems_responses as t1')
            ->join('checklistitems_queries as t2', 't1.id', '=', 't2.item_resp_id')
            ->where('t1.application_code', $application_code)
            ->where('t2.status', '<>', 4)
            ->count();
        if ($unclosed_queries < 1) {
            $return_val = false;
        }
        return $return_val;
    }

    public function processReceivingRejectedApplicationSubmission(Request $request)
    {
        $application_id = $request->input('application_id');
        $module_id = $request->input('module_id');
        $table_name = $request->input('table_name');
        $to_stage = $request->input('next_stage');
        $action = $request->input('action');
        $prev_stage = $request->input('curr_stage_id');
        $remarks = $request->input('remarks');
        $urgency = $request->input('urgency');
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->where('id', $application_id)
                ->first();
            if (is_null($application_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_status_id = getApplicationTransitionStatus($prev_stage, $action, $to_stage);
            $where = array(
                'id' => $application_id
            );
            $app_update = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id
            );
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == false) {
                DB::rollBack();
                echo json_encode($prev_data);
                exit();
            }
            $update_res = updateRecord($table_name, $prev_data['results'], $where, $app_update, $user_id);
            if ($update_res['success'] == false) {
                DB::rollBack();
                echo json_encode($update_res);
                exit();
            }
            $portal_update = false;
            if ($module_id == 1) {

            } else if ($module_id == 2) {
                $portal_update = $this->updateRejectedPremiseApplicationPortal($request, $application_details);
            } else if ($module_id == 3) {
                $portal_update = true;
            }
            if ($portal_update == false) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while updating portal data, consult System Admin!!'
                );
                echo json_encode($res);
                exit();
            }
            //select insert
            $data = DB::table($table_name . ' as t1')
                ->select(DB::raw("t1.*,$user_id as rejected_by,NOW() as rejected_on"))
                ->where('id', $application_id)
                ->first();
            $data->rejection_reason = $remarks;
            $data = convertStdClassObjToArray($data);
            $mis_insert_res = insertRecord('tra_rejected_premises_applications', $data, $user_id);
            if ($mis_insert_res['success'] == false) {
                DB::rollBack();
                echo json_encode($mis_insert_res);
                exit();
            }
            $prev_data = getPreviousRecords($table_name, $where);
            if ($prev_data['success'] == false) {
                DB::rollBack();
                echo json_encode($prev_data);
                exit();
            }
            $delete_res = deleteRecord($table_name, $prev_data['results'], $where, $user_id);
            if ($delete_res['success'] == false) {
                DB::rollBack();
                echo json_encode($delete_res);
                exit();
            }
            $this->updateApplicationSubmission($request, $application_details, $application_status_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application submitted successfully!!'
            );
            echo json_encode($res);
            exit();
        } catch (\Exception $exception) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            exit();
        } catch (\Throwable $throwable) {
            DB::rollBack();
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            exit();
        }
    }

    public function submitApplicationFromManagerQueryToCustomer(Request $request)
    {
        $process_id = $request->input('process_id');
        $table_name = $request->input('table_name');
        $directive_id = $request->input('directive_id');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->whereIn('id', $selected_ids)
                ->get();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $action = $request->input('action');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $urgency = $request->input('urgency');
            $insert_remarks = array();
            $portal_ids = array();
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;

            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            $portal_db = DB::connection('portal_db');
            //todo: get workflow action details
            $action_details = $this->getApplicationWorkflowActionDetails($action);
            $portal_table = getPortalApplicationsTable($module_id);
            //application details
            foreach ($application_details as $key => $application_detail) {
                $insert_remarks[] = array(
                    'application_id' => $application_detail->portal_id,
                    'remark' => $remarks,
                    'urgency' => $urgency,
                    'mis_created_by' => $user_id
                );
                $portal_ids[] = array($application_detail->portal_id);
                $application_codes[] = array($application_detail->application_code);
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
                    'application_status_id' => $application_status_id,
                    'process_id' => $process_id,
                    'from_stage' => $from_stage,
                    'to_stage' => $to_stage,
                    'directive_id' => $directive_id,
                    'author' => $user_id,
                    'remarks' => $remarks,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                //submissions
                $submission_params[] = array(
                    'application_id' => $application_detail->id,
                    'view_id' => $application_detail->view_id,
                    'process_id' => $process_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'zone_id' => $application_detail->zone_id,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'directive_id' => $directive_id,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                if ($action_details->update_portal_status == 1) {
                    $portal_status_id = $action_details->portal_status_id;
                    $proceed = updatePortalApplicationStatus($application_detail->id, $portal_status_id, $table_name, $portal_table);
                    if ($proceed == false) {
                        echo json_encode($proceed);
                        exit();
                    }
                }
                updateApplicationQueryRef($application_detail->id, $application_detail->application_code, $application_detail->reference_no, $table_name, $user_id, $module_id);
                
                //submit queryLetter to the client 
                sendQueryNotification($application_detail->application_code, $application_detail->module_id);
            }
            //application update
            $update_params = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id,
                'dola' => Carbon::now()
            );
            $app_update = DB::table($table_name . ' as t1')
                ->whereIn('id', $selected_ids)
                ->update($update_params);
           /* if ($app_update < 1) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while updating application details!!'
                );
                echo json_encode($res);
                exit();
            }
            */
            //updatePortalApplicationStatus($application_detail->id, $portal_status_id, $table_name, $portal_table_name);
            /* $portal_update = false;
             if ($module_id == 1) {

             } else if ($module_id == 2) {
                 $portal_update = $this->updatePremiseManagerQueryToCustomerPortal($portal_ids);
             } else if ($module_id == 3) {
                 $portal_update = true;
             }
             if ($portal_update == false) {
                 DB::rollBack();
                 $res = array(
                     'success' => false,
                     'message' => 'Problem encountered while updating portal details!!'
                 );
                 echo json_encode($res);
                 exit();
             }*/
            $portal_db->table('wb_manager_query_remarks')
                ->insert($insert_remarks);
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
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
        return true;
    }

    public function getActionChecklistCategory($action_id)
    {
        $qry = DB::table('wf_workflow_actions')
            ->where('id', $action_id);
        $checklist_category = $qry->value('checklist_category_id');
        if (is_numeric($checklist_category) && $checklist_category > 0) {
            return $checklist_category;
        } else {
            return false;
        }
    }

    public function processManagerQueryReturnApplicationSubmission(Request $request)
    {
        $process_id = $request->input('process_id');
        $action = $request->input('action');
        $table_name = $request->input('table_name');
        $directive_id = $request->input('directive_id');
        $selected = $request->input('selected');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        $invalidate_checklist = false;
        $application_code = '';
        $checklist_category = $this->getActionChecklistCategory($action);
        if ($checklist_category == false) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered while fetching action checklist category!!'
            );
            echo json_encode($res);
            exit();
        }
        if ($directive_id == 2 || $directive_id == 4) {//redo inspection(2),evaluation(4)
            $invalidate_checklist = true;
        }
        DB::beginTransaction();
        try {
            //get application_details
            $application_details = DB::table($table_name)
                ->whereIn('id', $selected_ids)
                ->get();
            if (is_null($application_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching application details!!'
                );
                echo json_encode($res);
                exit();
            }
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            $application_codes = array();
            $from_stage = $request->input('curr_stage_id');
            $action = $request->input('action');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $urgency = $request->input('urgency');
            $transition_params = array();
            $submission_params = array();
            //process other details
            $module_id = $process_details->module_id;
            $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            $application_status_id = getApplicationTransitionStatus($from_stage, $action, $to_stage);
            //application details
            $action_details = $this->getApplicationWorkflowActionDetails($action);
            $keep_status = $action_details->keep_status;
            $has_process_defination = $action_details->has_process_defination;
            $appprocess_defination_id = $action_details->appprocess_defination_id;

            $has_appdate_defination = $action_details->has_appdate_defination;
            $appdate_defination_id = $action_details->appdate_defination_id;
            $appdate_defination = getSingleRecordColValue('par_appprocess_definations', array('id'=>$appdate_defination_id),'code');
$application_processdefdata = array();

            foreach ($application_details as $key => $application_detail) {
                //transitions
                $transition_params[] = array(
                    'application_id' => $application_detail->id,
                    'application_code' => $application_detail->application_code,
                    'application_status_id' => $application_status_id,
                    'process_id' => $process_id,
                    'from_stage' => $from_stage,
                    'to_stage' => $to_stage,
                    'directive_id' => $directive_id,
                    'author' => $user_id,
                    'remarks' => $remarks,
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                //submissions
                $submission_params[] = array(
                    'application_id' => $application_detail->id,
                    'process_id' => $process_id,
                    'view_id' => $application_detail->view_id,
                    'application_code' => $application_detail->application_code,
                    'reference_no' => $application_detail->reference_no,
                    'tracking_no' => $application_detail->tracking_no,
                    'zone_id' => $application_detail->zone_id,
                    'usr_from' => $user_id,
                    'usr_to' => $responsible_user,
                    'previous_stage' => $from_stage,
                    'current_stage' => $to_stage,
                    'module_id' => $module_id,
                    'sub_module_id' => $sub_module_id,
                    'section_id' => $section_id,
                    'application_status_id' => $application_status_id,
                    'urgency' => $urgency,
                    'directive_id' => $directive_id,
                    'applicant_id' => $application_detail->applicant_id,
                    'remarks' => $remarks,
                    'date_received' => Carbon::now(),
                    'created_on' => Carbon::now(),
                    'created_by' => $user_id
                );
                $application_codes[] = array($application_detail->application_code);
                if($has_appdate_defination == 1){
                            $application_processdefdata[] =   array('application_code'=>$application_code,
                                                        'appprocess_defination_id'=>$appprocess_defination_id, 
                                                        'process_date'=>Carbon::NOW(), 
                                                        'created_by'=>$user_id, 
                                                        'created_on'=>Carbon::NOW());
                }
            }
            //application update
            if($has_appdate_defination == 1){

                $appdate_defination = array($appdate_defination=>Carbon::now(),'dola'=>Carbon::now());
              /*  $app_update = DB::table($table_name . ' as t1')
                                ->whereIn('application_code', $selected_appCodes)
                                ->update($appdate_defination);
                                */
            }
            if(count($application_processdefdata) >0){

                DB::table('tra_applications_processdefinations')
                         ->insert($application_processdefdata);

            }
            $update_params = array(
                'workflow_stage_id' => $to_stage,
                'application_status_id' => $application_status_id,
                 'dola' => Carbon::now()
            );
            $app_update = DB::table($table_name . ' as t1')
                ->whereIn('id', $selected_ids)
                ->update($update_params);
            /*if ($app_update < 1) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while updating application details!!'
                );
                echo json_encode($res);
                exit();
            }
            */
            if ($invalidate_checklist === true) {
                inValidateApplicationChecklist($module_id, $sub_module_id, $section_id, $checklist_category, $application_codes);
            }
            //transitions update
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions update
            DB::table('tra_submissions')
                ->insert($submission_params);
            updateInTraySubmissionsBatch($selected_ids, $application_codes, $from_stage, $user_id);
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
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
        return true;
    }

    public function processRecommendationApplicationSubmission(Request $request, $recommendation_table)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $process_id = $request->input('process_id');
        $recommendation_id = $request->input('action');
        $remarks = $request->input('remarks');
        $table_name = $request->input('table_name');
        $user_id = $this->user_id;
        try {
            $data = array(
                'application_id' => $application_id,
                'application_code' => $application_code,
                'process_id' => $process_id,
                'table_name' => $table_name,
                'recommendation_id' => $recommendation_id,
                'remarks' => $remarks,
                'created_by' => $user_id
            );
            $res = insertRecord($recommendation_table, $data, $user_id);
            if ($res['success'] == false) {
                echo json_encode($res);
                exit();
            }
            $this->processNormalApplicationSubmission($request);
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            echo json_encode($res);
            exit();
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
            echo json_encode($res);
            exit();
        }
    }

    public function updateApplicationSubmission($request, $application_details, $application_status_id)
    {
       
        $application_id = $request->input('application_id');
        $process_id = $request->input('process_id');
        $action = $request->input('action');
        $table_name = $request->input('table_name');
        $external_user_id= $request->input('external_user_id');
        
        $sub_module_id= $request->input('sub_module_id');
        $user_id = $this->user_id;
        try {
            //get process other details
            $process_details = DB::table('wf_tfdaprocesses')
                ->where('id', $process_id)
                ->first();
            if (is_null($process_details)) {
                DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while fetching process details!!'
                );
                echo json_encode($res);
                exit();
            }
            $from_stage = $request->input('curr_stage_id');
            $to_stage = $request->input('next_stage');
            $responsible_user = $request->input('responsible_user');
            $remarks = $request->input('remarks');
            $urgency = $request->input('urgency');
            $directive_id = $request->input('directive_id');
            //application details
            $application_code = $application_details->application_code;
            $ref_no = $application_details->reference_no;
            $view_id = $application_details->view_id;
            $tracking_no = $application_details->tracking_no;
            $applicant_id = $application_details->applicant_id;
            $zone_id = (isset($application_details->zone_id) && $process_details->module_id == 18)?$application_details->zone_id:2;
            $sub_module_id = $application_details->sub_module_id;
            //process other details
            $module_id = $process_details->module_id;
           // $sub_module_id = $process_details->sub_module_id;
            $section_id = $process_details->section_id;
            
            //transitions
            //process inforamtion 
            $action_details = $this->getApplicationWorkflowActionDetails($action);
            $keep_status = $action_details->keep_status;
            $has_process_defination = $action_details->has_process_defination;
            $appprocess_defination_id = $action_details->appprocess_defination_id;

            $has_appdate_defination = $action_details->has_appdate_defination;
            $appdate_defination_id = $action_details->appdate_defination_id;
            //for inspection submissions
            $is_inspection_submission = 0;
           if(isset($action_details->is_inspection_submission)){
                 $is_inspection_submission = $action_details->is_inspection_submission;
            }
            $appdate_defination = getSingleRecordColValue('par_appprocess_definations', array('id'=>$appdate_defination_id),'code');
            $application_processdefdata = array();
            if($has_appdate_defination == 1){
                        $application_processdefdata =   array('application_code'=>$application_code,
                                                    'appprocess_defination_id'=>$appprocess_defination_id, 
                                                    'process_date'=>Carbon::NOW(), 
                                                    'created_by'=>$user_id, 
                                                    'created_on'=>Carbon::NOW());
            }
            $processtransition_data = $this->getActionTransitionDetails($action);
            $is_multi_submission = $processtransition_data->is_multi_submission;
            $multinextstage_id = $processtransition_data->multinextstage_id;

            //end 
            $transition_params = array(
                'application_id' => $application_id,
                'application_code' => $application_code,
                'application_status_id' => $application_status_id,
                'process_id' => $process_id,
                'from_stage' => $from_stage,
                'to_stage' => $to_stage,
                'author' => $user_id,
                'remarks' => $remarks,
                'directive_id' => $directive_id,
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            
            DB::table('tra_applications_transitions')
                ->insert($transition_params);
            //submissions
            $submission_params = array(
                'application_id' => $application_id,
                'process_id' => $process_id,
                'view_id' => $view_id,
                'application_code' => $application_code,
                'reference_no' => $ref_no,
                'tracking_no' => $tracking_no,
                'usr_from' => $user_id,
                'usr_to' => $responsible_user,
                'previous_stage' => $from_stage,
                'current_stage' => $to_stage,
                'module_id' => $module_id,
                'external_user_id'=>$external_user_id,
                'sub_module_id' => $sub_module_id,
                'section_id' => $section_id,
                'application_status_id' => $application_status_id,
                'urgency' => $urgency,
                'applicant_id' => $applicant_id,
                'zone_id' => $zone_id,
                'remarks' => $remarks,
                'directive_id' => $directive_id,
                'date_received' => Carbon::now(),
                'created_on' => Carbon::now(),
                'created_by' => $user_id
            );
            
            if(validateIsNumeric($external_user_id)){
                $submission_params['usr_to'] = $external_user_id;
                //send and email to the Extrenal user
                $module_name = getSingleRecordColValue('modules', array('id'=>$module_id), 'name');
                $process_name = getSingleRecordColValue('wf_tfdaprocesses', array('id'=>$process_id), 'name');
                $process_stage = getSingleRecordColValue('wf_workflow_stages', array('id'=>$to_stage), 'name');
                $email_address = aes_decrypt(getSingleRecordColValue('users', array('id'=>$external_user_id), 'email'));
                $vars = array(
                    '{module_name}' => $module_name,
                    '{process_name}' => $process_name,
                    '{process_stage}' => $process_stage,
                 );
                sendTemplatedApplicationNotificationEmail(16, $email_address,$vars);
                //send an email to the rest of the users 

            }
            if($is_inspection_submission == 1){
                
                  $inspectors = $this->getInspectorsIDList($module_id, $application_code);
               
                //loop through while updating submissions data
                 foreach ($inspectors as $inspector) {
                    //change usr_to
                    $submission_params['usr_to'] = $inspector->inspector_id;
                    //update submissions
                    DB::table('tra_submissions')->insert($submission_params);
                 }
             } else {
            
                    DB::table('tra_submissions')
                        ->insert($submission_params);
             }
          if ($action_details->update_portal_status == 1) {
                    $portal_status_id = $action_details->portal_status_id;
                    $table_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');
                $portal_table = getPortalApplicationsTable($module_id);
         
                    $proceed = updatePortalApplicationStatus($application_id, $portal_status_id, $table_name, $portal_table);
                    
                }
                if($has_appdate_defination == 1){

                    $appdate_defination = array($appdate_defination=>Carbon::now(),'dola'=>Carbon::now());
                   /* $app_update = DB::table($table_name . ' as t1')
                                    ->where('application_code', $application_code)
                                    ->update($appdate_defination);
                                    */
                }
                if(count($application_processdefdata) >0){
    
                    DB::table('tra_applications_processdefinations')
                             ->insert($application_processdefdata);
    
                }
                
            //check if Application is from inspection Submission
             $this->setIsDoneIFInspectionApplicationSubmission($application_code, $from_stage);
             
            updateInTraySubmissions($application_id, $application_code, $from_stage, $user_id);

            if($is_multi_submission == 1){
                $submission_params['current_stage'] =  $multinextstage_id;
                $submission_params['usr_to'] =  '';
                DB::table('tra_submissions')->insert($submission_params);
            }
            DB::commit();
            $res = array(
                'success' => true,
                'message' => 'Application Submitted Successfully!!'
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
        return true;
    }

    public function updateInTrayReading(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $current_stage = $request->input('current_stage');
        $user_id = $this->user_id;
        $res = updateInTrayReading($application_id, $application_code, $current_stage, $user_id);
        return \response()->json($res);
    }

    public function getSubmissionRecommendations(Request $request)
    {
        $stage_id = $request->input('stage_id');
        $recommendation_type = $request->input('recommendation_type');
        try {
            $qry = DB::table('par_application_recommendations');
            if (isset($stage_id) && $stage_id != '') {
                $qry->where('stage_id', $stage_id);
            }
            if (isset($recommendation_type) && $recommendation_type != '') {
                $qry->where('recommendation_type_id', $recommendation_type);
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
   // has_appdate_defination
    public function getActionTransitionDetails($action_id){
        $rec = DB::table('wf_workflow_transitions as t1')
                ->select('t1.*')
                ->where(array('action_id'=>$action_id))
                ->first();
        return $rec;
    }

    public function getApplicationStatuses(Request $request)
    {
        $workflow_id = $request->input('workflow_id');
        try {//assumptions no workflow has null module_id
            $qry1 = DB::table('wf_workflows')
                ->select('module_id', 'sub_module_id')
                ->where('id', $workflow_id);
            $data = $qry1->first();
            if (is_null($data)) {
                $where = array();
            } else {
                $where = array(
                    'module_id' => $data->module_id
                    //'sub_module_id' => $data->sub_module_id
                );
            }
            $qry2 = DB::table('par_system_statuses as t1')
                ->leftJoin('par_application_statuses as t2', 't2.status_id', '=', 't1.id')
                ->select('t1.*');
                //->where($where);
            $results = $qry2->get();
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

    public function getApplicationReturnDirectives(Request $request)
    {
        $category_id = $request->input('category_id');
        try {
            $qry = DB::table('par_application_return_directives');
            if (isset($category_id) && $category_id != '') {
                $qry->whereIn('category_id', array(1, $category_id));
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

    public function getApplicationTransitioning(Request $req)
    {
        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $where = array(
            'application_id' => $application_id,
            'application_code' => $application_code
        );
        try {
            $qry = DB::table('tra_applications_transitions as t1')
                ->leftJoin('users as t2', 't1.author', '=', 't2.id')
                ->join('wf_workflow_stages as t3', 't1.from_stage', '=', 't3.id')
                ->join('wf_workflow_stages as t4', 't1.to_stage', '=', 't4.id')
                ->leftJoin('par_application_return_directives as t5', 't1.directive_id', '=', 't5.id')
                ->select(DB::raw("t3.name as from_stage_name,t4.name as to_stage_name,t1.remarks,t1.created_on as changes_date,
                t5.name as directive,CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as author"))
                ->where($where)
                ->orderBy('t1.id');
            $data = $qry->get();
            $res = array(
                'success' => true,
                'results' => $data,
                'message' => 'All is well'
            );
        } catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        }
        return response()->json($res);
    }

    public function getFormFieldsAuth(Request $request)
    {
        $process_id = $request->input('process_id');
        $form_id = $request->input('form_id');
        try {
            $qry = DB::table('tra_process_form_auth as t1')
                ->join('par_key_form_fields as t2', 't1.field_id', '=', 't2.id')
                ->join('par_form_field_types as t3', 't2.field_type_id', '=', 't3.id')
                ->where('t1.process_id', $process_id)
                ->where('t1.form_id', $form_id)
                ->select('t1.id', 't2.field_name', 't3.name as field_type');
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

    public function getProcessOtherPartsAuth(Request $request)
    {
        $process_id = $request->input('process_id');
        try {
            $qry = DB::table('tra_process_otherparts_auth as t1')
                ->where('t1.process_id', $process_id)
                ->select('t1.id', 't1.part_id');
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

    public function getAlterationFormFieldsAuth(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $where = array(
            'application_id' => $application_id,
            'application_code' => $application_code
        );
        try {
            $qry = DB::table('tra_alt_formparts_amendments as t1')
                ->join('par_key_form_fields as t2', 't1.field_id', '=', 't2.id')
                ->join('par_form_field_types as t3', 't2.field_type_id', '=', 't3.id')
                ->where($where)
                ->select('t1.id', 't2.field_name', 't3.name as field_type');
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

    public function getAlterationOtherPartsAuth(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $where = array(
            'application_id' => $application_id,
            'application_code' => $application_code
        );
        try {
            $qry = DB::table('tra_alt_otherparts_amendments as t1')
                ->where($where);
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

    public function getApplicationAlterationFormFields(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $form_id = $request->input('form_id');
        try {
            $qry = DB::table('par_key_form_fields as t1')
                ->leftJoin('tra_alt_formparts_amendments as t2', function ($join) use ($application_id, $application_code) {
                    $join->on('t1.id', '=', 't2.field_id')
                        //->on('t2.application_code', '=', DB::raw($application_code));
                        ->where('t2.application_code', '=', $application_code);
                })
                ->select('t1.*', 't2.id as is_editable')
                ->where('t1.form_id', '=', $form_id);
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

    public function getApplicationAlterationOtherParams(Request $request)
    {
        $module_id = $request->input('module_id');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        try {
            $qry = DB::table('par_alteration_setup as t1')
                ->leftJoin('tra_alt_otherparts_amendments as t2', function ($join) use ($application_id, $application_code) {
                    $join->on('t1.id', '=', 't2.part_id')
                        ->where('t2.application_code', '=', $application_code);
                })
                ->where('t1.is_form_tied', 2)
                ->where('t1.module_id', $module_id)
                ->select('t1.*', 't2.id as is_editable');
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

    public function getApplicationAlterationForms(Request $request)
    {
        $module_id = $request->input('module_id');
        try {
            $qry = DB::table('par_alteration_setup as t1')
                ->where('t1.is_form_tied', 1);
            if (isset($module_id) && $module_id != '') {
                $qry->where('module_id', $module_id);
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

    public function getPortalApplicationStatuses()
    {
        try {
            $portal_db = DB::connection('portal_db');
            $qry = $portal_db->table('wb_statuses');
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

    public function getApplicationWorkflowActionDetails($action_id)
    {
        $transition_details = DB::table('wf_workflow_actions')
            ->where('id', $action_id)
            ->first();
        if (is_null($transition_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered getting action details!!'
            );
            echo json_encode($res);
            exit();
        }
        return $transition_details;
    }

    public function getPortalApplicationStatusDetails($status_id)
    {
        $portal_db = DB::connection('portal_db');
        $status_details = $portal_db->table('wb_statuses')
            ->where('id', $status_id)
            ->first();
        if (is_null($status_details)) {
            $res = array(
                'success' => false,
                'message' => 'Problem encountered getting portal status details!!'
            );
            echo json_encode($res);
            exit();
        }
        return $status_details;
    }

    public function getWorkflowDetails(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $qry = DB::table('wf_workflows as t1')
                ->leftJoin('sub_modules as t4', 't1.sub_module_id', '=', 't4.id')
                ->leftJoin('modules as t3', 't1.module_id', '=', 't3.id')
                ->leftJoin('par_sections as t5', 't1.section_id', '=', 't5.id')
                ->select('t1.*', 't3.name as module_name', 't4.name as sub_module', 't5.name as section_name');
            if (validateIsNumeric($module_id)) {
                $qry->where('t1.module_id', $module_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
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
        return response()->json($res);
    }

    public function getWorkflowInterfacedetails(Request $request)
    {
        $module_id = $request->input('module_id');
        $sub_module_id = $request->input('sub_module_id');
        try {
            $qry = DB::table('wf_workflow_interfaces as t1')
                ->leftJoin('sub_modules as t4', 't1.sub_module_id', '=', 't4.id')
                ->leftJoin('modules as t3', 't1.module_id', '=', 't3.id')
                ->leftJoin('par_sections as t5', 't1.section_id', '=', 't5.id')
                ->select('t1.*', 't3.name as module_name', 't4.name as sub_module', 't5.name as section_name');
            if (validateIsNumeric($module_id)) {
                $qry->where('t1.module_id', $module_id);
            }
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
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
        return response()->json($res);
    }

    public function hasUnclosedStructuredQueries($application_code)
    {
        $return_val = false;
        $count = DB::table('checklistitems_responses as t1')
            ->join('checklistitems_queries as t2', 't1.id', 't2.item_resp_id')
            ->where('t1.application_code', $application_code)
            ->where('t2.status', '<>', 4)
            ->count();
        if ($count > 0) {
            $return_val = true;
        }
        return $return_val;
    }
    //the details 
    
   public function saveApplicationInvoicingDetails($request,$application_id,$application_code,$tracking_no,$is_fast_track)
    {
        $element_costs_id = $request->input('element_costs_id');
        $paying_currency_id = $request->input('paying_currency_id');
        $currency_id = $request->input('currency_id');
        $table_name = $request->input('table_name');
        $cost = $request->input('cost');
        
        $user_id = $this->user_id;
        
        try {
            //check if invoice has been generated 
                 $inv_details =  DB::table('tra_application_invoices')
                        ->where('application_code', $application_code)
                        ->first();
            if(!$inv_details){
                 $app_details =  DB::table($table_name)
                    ->where('id', $application_id)
                    ->first();
 
                $reference_no = $app_details->reference_no;
                $tracking_no = $app_details->tracking_no;
                $section_id = $app_details->section_id;
                $sub_module_id = $app_details->sub_module_id;
                $module_id = $app_details->module_id;
                $applicant_id = $app_details->applicant_id;
                $zone_id = $app_details->zone_id;
                $quantity = 1;
                if($is_fast_track == 1 && $sub_module_id == 7){
                    $quantity = 2;
                }
                $isLocked = 1;
                $applicant_details = getTableData('wb_trader_account', array('id' => $applicant_id));
                if (is_null($applicant_details)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered while getting applicant details!!'
                    );
                    return response()->json($res);
                }
                $applicant_name = $applicant_details->name;
                $applicant_email = $applicant_details->email;
                $applicant_name = strtoupper($applicant_name);
                $paying_exchange_rate = getExchangeRate($paying_currency_id);
                $due_date_counter = Config('invoice_due_days');
                $date_today = Carbon::now();
                $due_date = $date_today->addDays($due_date_counter);
                $user = \Auth::user();
                $prepared_by = aes_decrypt($user->first_name) . ' ' . aes_decrypt($user->last_name);
                $invoicing_date = Carbon::now();
                $invoice_params = array(
                    'applicant_id' => $applicant_id,
                    'applicant_name' => $applicant_name,
                    'paying_currency_id' => $paying_currency_id,
                    'paying_exchange_rate' => $paying_exchange_rate,
                    'reference_no'=>$reference_no,
                    'module_id'=>$module_id,
                    'zone_id'=>$zone_id,
                    'section_id'=>$section_id,
                    'sub_module_id'=>$sub_module_id,
                    'tracking_no'=>$tracking_no,
                    'isLocked' => $isLocked,
                    'date_of_invoicing'=>$invoicing_date,
                    'gepg_submission_status'=>2,
                    'payment_terms' => 'Due in ' . $due_date_counter . ' Days',
                    'created_on' => Carbon::now()
                );
                
                 $invoice_params['prepared_by'] = $prepared_by;
                    $invoice_params['due_date'] = $due_date;
        $exchange_rate = getSingleRecordColValue('par_exchange_rates', array('currency_id' => $currency_id), 'exchange_rate');

               
                    $invoice_no = generateInvoiceNo($user_id);
                    $invoice_params['invoice_no'] = $invoice_no;
                    $invoice_params['application_id'] = $application_id;
                    $invoice_params['application_code'] = $application_code;
                    $invoice_params['applicant_id'] = $applicant_id;
                    $res = insertRecord('tra_application_invoices', $invoice_params, $user_id);
                if ($res['success'] == false) {
                    return \response()->json($res);
                }
                $invoice_id = $res['record_id'];
            
                $params = array();
                $total_element_amount= $cost*$quantity;
                if($paying_currency_id != $currency_id){

                    if($paying_currency_id == 4 && $currency_id ==1){
                        $total_element_amount= $cost*$quantity*$exchange_rate;
                    }
                    
                    else if($paying_currency_id == 1  && $currency_id ==4){
                        $total_element_amount= ($cost*$quantity)/$paying_exchange_rate;
                    }
                }
                else{
                    $total_element_amount= $cost*$quantity;
                }
                
                $params = array(
                    'invoice_id' => $invoice_id,
                    'element_costs_id' => $element_costs_id,
                    'element_amount' => $cost,
                    'quantity' => $quantity,
                    'paying_currency_id'=>$paying_currency_id,
                    'total_element_amount'=>round($total_element_amount, 2),
                    'paying_exchange_rate'=>$paying_exchange_rate,
                    'currency_id' => $currency_id,
                    'exchange_rate' => $exchange_rate
                );

                $res = insertRecord('tra_invoice_details', $params, $user_id);
                 $invoice_details = getInvoiceDetails($module_id, $application_id);
                    $params = array(
                        'invoice_id' => $invoice_id,
                        'process_name' => $invoice_details['process_name'],
                        'module_name' => $invoice_details['module_name'],
                        'module_desc' => $invoice_details['module_desc'],
                        'reference_no' => $invoice_details['reference_no'],
                        'base_url' => $this->base_url
                    );
                    $report = generateJasperReport('invoiceReport', 'invoice', 'pdf', $params);
                    $applicant_details = getTableData('wb_trader_account', array('id' => $applicant_id));
                if (is_null($applicant_details)) {
                    $res = array(
                        'success' => false,
                        'message' => 'Problem encountered while getting applicant details!!'
                    );
                    return response()->json($res);
                }
                $applicant_name = $applicant_details->name;
                $applicant_email = $applicant_details->email;
                $applicant_name = strtoupper($applicant_name);
                $vars = array(
                        '{reference_no}' => $reference_no,
                        '{invoice_no}' => $invoice_no,
                        '{invoice_date}' => $invoicing_date
                    );
                saveSingleInvoiceDetailstoIntergration($invoice_id,$application_code,$paying_currency_id,$paying_exchange_rate,$user_id,$zone_id);
                
             //   applicationInvoiceEmail(5, $applicant_email, $vars, $report, 'invoice_' . $invoice_no);
                
            }else{
                $invoice_id = $inv_details->id;
                $invoice_no = $inv_details->invoice_no;
                
            }
           
                $res = array(
                    'success' => true,
                    'invoice_id' => $invoice_id,
                    'invoice_no' => $invoice_no,
                    'message' => 'Invoice details saved successfully!!'
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
    }public function saveApplicationDataAmmendmentRequest(Request $request){
        try {
            $module_id = $request->module_id;
            $application_code = $request->application_code;
            $application_id = $request->active_application_id;
            $appdata_ammendementrequest_id = $request->appdata_ammendementrequest_id;
            $workflow_stage_id = $request->workflow_stage_id;
            $process_id = $request->process_id;
            $user_id = $this->user_id;
            $table_name = 'tra_appdata_ammendementrequests';
            $app_table_name = getSingleRecordColValue('modules', array('id'=>$module_id), 'table_name');
            $app_details = getSingleRecord($app_table_name, array('application_code'=>$application_code, 'id'=>$application_id));
            if (is_null($app_details)) {
                $res = array(
                    'success' => false,
                    'message' => 'Problem encountered while getting application details!!'
                );
                return response()->json($res);
            }
            
            $ammendment_requestdata = array('application_code'=>$application_code, 
                                            'application_id'=>$application_id,
                                            'requested_by'=>$user_id, 
                                              );
            if(validateIsNumeric($appdata_ammendementrequest_id)){
                $where_app = array('id'=>$appdata_ammendementrequest_id);
                $ammendment_requestdata['dola'] = Carbon::now();
                $ammendment_requestdata['altered_by'] = $user_id;
                if (recordExists($table_name, $where_app)) {
                    $app_details = getPreviousRecords($table_name, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];

                    $res = updateRecord($table_name, $app_details, $where_app, $ammendment_requestdata, $user_id);

                }
                
            }
            else{
                    $ammendment_requestdata['requested_on'] = Carbon::now();
                    $ammendment_requestdata['created_on'] = Carbon::now();
                    $ammendment_requestdata['created_by'] = $user_id;
                    
                    $res = insertRecord($table_name, $ammendment_requestdata, $user_id);
                    $appdata_ammendementrequest_id = $res['record_id'];
                    $submission_params = array(
                        'application_id' => $application_id,
                        'process_id' => $process_id,
                        'view_id'=>$app_details->view_id,
                        'application_code' => $application_code,
                        "tracking_no" => $app_details->tracking_no,
                        "reference_no" => $app_details->reference_no,
                        "zone_id" => $app_details->zone_id,
                        'usr_from' => $user_id,
                        'usr_to' => $user_id,
                        'previous_stage' => $workflow_stage_id,
                        'current_stage' => $workflow_stage_id,
                        'module_id' => $app_details->module_id,
                        'sub_module_id' => $app_details->sub_module_id,
                        'section_id' => $app_details->section_id,
                        'application_status_id' =>1,
                        'urgency' => 1,
                        'applicant_id' => $app_details->applicant_id,
                        'remarks' => 'Initial save of the application',
                        'date_received' => Carbon::now(),
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id,
                        'appdata_ammendementrequest_id'=>$appdata_ammendementrequest_id
                    );

                   $sub_res  =insertRecord('tra_submissions', $submission_params, $user_id);
            }
           
            if($res['success']){
                $res = array('success'=>true,
                             'message'=>'Application Ammendment Request Saved Successfully',
                             'appdata_ammendementrequest_id'=>$appdata_ammendementrequest_id             
                             );
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

    // public function getAllWorkflow(Request $req){
    //     $module_id = $req->module_id;
    //     $sub_module_id = $req->submodule_id;
    //     $group_id = $req->group_id;

    //     // $qry = DB::table('wf_workflow_stages as t1')
    //     //         ->join('wf_workflows as t2','t1.workflow_id','t2.id')
    //     //         ->join('wf_stages_groups t3','t1.id','t3.stage_id')
    //     //         ->select('t2.name as workflow','t1.name as stage','t1.id');

    //     $qry = DB::table('tra_permissions as t1')
    //             ->join('wf_menu_workflows as t2','t1.menu_id','t2.menu_id')
    //             ->join('wf_workflows as t3','t2.workflow_id','t3.id')
    //             ->where('t1.accesslevel_id','!=',1)
    //             ->groupBy('t3.id')
    //             ->select('t3.name as workflow','t3.id');


    //     if(validateIsNumeric($module_id)){
    //         $qry->where('t3.module_id',$module_id);
    //     }
    //     if(validateIsNumeric($sub_module_id)){
    //         $qry->where('t3.sub_module_id',$sub_module_id);
    //     }
    //      if(validateIsNumeric($group_id)){
    //         $qry->where('t1.group_id',$group_id);
    //     }

    //     $result = $qry->get();
    //      $res = array(
    //                 'success'=>true,
    //                 'message'=>'all is well',
    //                 'results'=>$result
    //             );
    // return json_encode($res);
    // }
public function getGroupMappedWorkflowStages(Request $req){
        $workflow_id = $req->workflow_id;
        $group_id = $req->group_id;
        $caller = $req->caller;
        $module_id = $req->module_id;

        $wf_stages = DB::table('tra_permissions as t1')
                    ->join('wf_menu_workflows as t2','t1.menu_id','t2.menu_id')
                    ->join('wf_workflow_stages as t3', 't2.workflow_id', 't3.workflow_id')
                    ->leftjoin('wf_stages_groups as t4',function ($join) {
                        $join->on('t1.group_id','t4.group_id')
                             ->on('t3.id', 't4.stage_id');
                        })
                    ->join('wf_workflows as t5','t3.workflow_id','t5.id')
                    ->select('t2.workflow_id','t5.name as workflow_name', 't3.name as stage_name','t3.id as stage_id', 't4.id as has_access');
                    


        if(validateIsNumeric($workflow_id)){
            $wf_stages->where('t2.workflow_id',$workflow_id);
        }
         if(validateIsNumeric($group_id)){
            $wf_stages->where('t1.group_id',$group_id);
        }
        if(validateIsNumeric($module_id)){
            $wf_stages->where('t5.module_id',$module_id);
        }
        if($caller == 1){ //from workflow for distinct workflows
            $wf_stages->groupBy('t3.workflow_id'); 
        }else{ //for distinct stages
            $wf_stages->groupBy('t3.id'); 
        }

        $result = $wf_stages->get();
         $res = array(
                    'success'=>true,
                    'message'=>'all is well',
                    'results'=>$result
                );
    return json_encode($res);
    }

    public function getInspectorsIDList($module_id, $application_code){
        switch ($module_id) {
            case 1:
                return [];
                break;
            case 2:
                 $inspectors = DB::table('tra_premiseinspection_applications as t1')
                            ->join('tra_premiseinspection_inspectors as t2','t1.inspection_id','t2.inspection_id')
                            ->where('t1.application_code',$application_code)
                            ->select('t2.inspector_id')
                            ->get();
                return $inspectors;
                break;
            case 3:
                $inspectors = DB::table('assigned_gmpinspections as t1')
                            ->join('gmp_inspectorsdetails as t2','t1.inspection_id','t2.inspection_id')
                            ->where('t1.application_code',$application_code)
                            ->select('t2.inspector_id')
                            ->get();
                return $inspectors;
                break;
            case 4:
                return [];
                break;
            case 5:
                return [];
                break;
            case 6:
                return [];
                break;
            case 7:
                 $inspectors = DB::table('tra_ctrgcp_inspectedsites as t1')
                            ->join('tra_premiseinspection_inspectors as t2','t1.inspection_id','t2.inspection_id')
                            ->where('t1.application_code',$application_code)
                            ->select('t2.inspector_id')
                            ->get();
                return $inspectors;
                break;
            default:
                return [];
                break;
        }
    }

    public function setIsDoneIFInspectionApplicationSubmission($application_code, $pre_stage)
    {
        $pre_prev_stage = DB::table('tra_submissions')
                        ->where('application_code',$application_code)
                        ->where('current_stage',$pre_stage)
                        ->orderBy('id','DESC')
                        ->select('previous_stage')
                        ->first();
                if($pre_prev_stage){
                            $actions = DB::table('wf_workflow_stages as t1')
                            ->join('wf_workflow_actions as t2', 't1.id', '=', 't2.stage_id')
                            ->where('t1.id',$pre_prev_stage->previous_stage)
                            ->select('t2.is_inspection_submission')
                            ->first();
                        $latest_entry = DB::table('tra_submissions')
                                    ->where('application_code',$application_code)
                                    ->orderBy('id','DESC')
                                    ->select('id')
                                    ->first();

                       $is_inspection_submission = 0;
           if(isset($action_details->is_inspection_submission)){
                 //$is_inspection_submission = $action_details->is_inspection_submission;
            }
                        if($is_inspection_submission == 1){
                        $update = DB::table('tra_submissions')
                                    ->where('application_code', $application_code)
                                    ->where('id','<',$latest_entry->id)
                                    ->update(array('isDone'=> 1));
                        }

                }
                        
    }public function saveRegistrationCancellationRequest(Request $req){
        $reference_no = $req->reference_no;
        $module_id = $req->module_id;
        $requested_by = $req->requested_by;
        $requested_on = $req->requested_on;
        $cancellation_reason_id = $req->cancellation_reason_id;
        $user_id = $this->user_id;
        $remarks = $req->remarks;
        DB::beginTransaction();
        try{
        if(validateIsNumeric($module_id) && $reference_no != ''){
        $table_names = DB::table('modules')->where('id', $module_id)->select('table_name','cancellation_table_name')->first();
        if(isset($table_names->table_name) && isset($table_names->cancellation_table_name)){
        $table_name = $table_names->table_name;
        $cancellation_table_name = $table_names->cancellation_table_name;
        $table_data = DB::table($table_name)->where('reference_no', $reference_no)->first();
        
        if(!empty($table_data)){
        $table_data->app_id = $table_data->id;
        unset($table_data->id);
        $table_data = (array)$table_data;
        $res = insertRecord($cancellation_table_name,$table_data, $user_id);
        if(!$res['success']){
        DB::rollBack();
        return $res;
        }
        $cancellation_request_data = array(
        'reference_no' => $reference_no,
        'app_id' => $table_data['app_id'],
        'tracking_no' => $table_data['tracking_no'],
        'module_id' => $module_id,
        'requested_by' => $requested_by,
        'requested_on' => $req->requested_on,
        'cancellation_reason_id' => $cancellation_reason_id,
        'approved_by_id' => $user_id,
        'approved_on' => Carbon::now(),
        'remarks' => $remarks,
        'cancellation_status_id' => 1
        );
        $res = insertRecord('tra_registrationcancellation_requests',$cancellation_request_data, $user_id);
        
        if(!$res['success']){
        DB::rollBack();
        return $res;
        }
        //delete from main table
        $del = DB::table($table_name)->where('reference_no', $reference_no)->delete();
        if($del){
        //flag off submissions
        DB::table('tra_submissions')->where('reference_no', $reference_no)->orWhere('tracking_no', $table_data['tracking_no'])->update(['isDone'=>1]);
        $res = array('message'=>'Application cancelled successfully','success'=>true);
        //email trader
        //trader details
        
        $applicant = DB::table($table_name.' as t1')
        ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
        ->where('reference_no', $reference_no)
        ->orWhere('tracking_no', $table_data['tracking_no'])
        ->first();
        
        $template_id = 19; //email template id
        //$email = $applicant->email;
        $vars = array(
        '{reference_no}'=>$reference_no,
        '{cancellation_reason}'=>getSingleRecordColValue('par_cancellation_reasons', array('id' => $cancellation_reason_id), 'name'),
        '{requested_by}'=>$requested_by,
        '{cancellation_date}'=>Carbon::now()
        );
        //sendTemplatedApplicationNotificationEmail($template_id, $email, $vars);
        DB::commit();
        }else{
        DB::rollBack();
        $res = array('message'=>'Failed to cancel application from main table','success'=>false);
        
        }
        }else{
        DB::rollBack();
        $res = array('success'=>false, 'message'=>'The provided reference has no entries');
        }
        
        
        }else{
        DB::rollBack();
        $res = array('success'=>false, 'message'=>'Missing transaction/cancellation table name from the selected modules');
        }
        }else{
        DB::rollBack();
        $res = array('success'=>false, 'message'=>'Module or Reference_no was not submitted');
        }
        }catch (\Exception $exception) {
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
  /*public function saveRegistrationCancellationRequest(Request $req){
        $reference_no = $req->reference_no;
        $module_id = $req->module_id;
        $requested_by = $req->requested_by;
        $requested_on = $req->requested_on;
        $cancellation_reason_id = $req->cancellation_reason_id;
        $user_id = $this->user_id;
        $remarks = $req->remarks;
        DB::beginTransaction();
        try{
            if(validateIsNumeric($module_id) && $reference_no != ''){
                $table_names = DB::table('modules')->where('id', $module_id)->select('table_name','cancellation_table_name')->first();
                if(isset($table_names->table_name) && isset($table_names->cancellation_table_name)){
                    $table_name = $table_names->table_name;
                    $cancellation_table_name = $table_names->cancellation_table_name;
                    $table_data = DB::table($table_name)->where('reference_no', $reference_no)->first();
                    
                    if(!empty($table_data)){
                        $table_data->app_id = $table_data->id;
                        unset($table_data->id);
                        $table_data =  (array)$table_data;
                        $res = insertRecord($cancellation_table_name,$table_data, $user_id);
                        if(!$res['success']){
                            DB::rollBack();
                            return $res;
                        }
                        $cancellation_request_data = array(
                            'reference_no' => $reference_no,
                            'app_id' => $table_data['app_id'],
                            'tracking_no' => $table_data['tracking_no'],
                            'module_id' => $module_id,
                            'requested_by' => $requested_by,
                            'requested_on' => $req->requested_on,
                            'cancellation_reason_id' => $cancellation_reason_id,
                            'approved_by_id' => $user_id,
                            'approved_on' => Carbon::now(),
                            'remarks' => $remarks,
                            'cancellation_status_id' => 1
                        );
                        $res = insertRecord('tra_registrationcancellation_requests',$cancellation_request_data, $user_id);

                        if(!$res['success']){
                            DB::rollBack();
                            return $res;
                        }
                        //delete from main table
                        $del = DB::table($table_name)->where('reference_no', $reference_no)->delete();
                        if($del){
                           $res = array('message'=>'Application cancelled successfully','success'=>true); 
                           DB::commit();
                        }else{
                             DB::rollBack();
                           $res = array('message'=>'Failed to cancel application from main table','success'=>false); 

                        }
                    }else{
                         DB::rollBack();
                        $res = array('success'=>false, 'message'=>'The provided reference has no entries');
                    }
                    
                    
                }else{
                     DB::rollBack();
                  $res = array('success'=>false, 'message'=>'Missing transaction/cancellation table name from the selected modules');  
                }
            }else{
                 DB::rollBack();
                $res = array('success'=>false, 'message'=>'Module or Reference_no was not submitted');
            }
        }catch (\Exception $exception) {
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
    }*/
    public function getCancelledRegistrationApplications(Request $req){
        $start = $req->start;
        $limit = $req->limit;
        $filters = $req->filter;
        $module_id = $req->module_id;
        $requested_by_id = $req->requested_by_id;
        $approved_by_id = $req->approved_by_id;
        $status_id = $req->status_id;
        $qry = DB::table('tra_registrationcancellation_requests as t1')
               ->leftjoin('par_cancellation_reasons as t2','t1.cancellation_reason_id', 't2.id')
               ->leftjoin('users as t4','t1.approved_by_id', 't4.id')
               ->leftjoin('modules as t5','t1.module_id', 't5.id')
               ->leftjoin('par_cancellation_statuses as t6','t1.cancellation_status_id', 't6.id')
               ->select('t1.*','t2.name as cancellation_reason','t1.requested_by','t5.name as module_name','t6.name as cancellation_status', DB::raw("CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as approved_by"));
        if(validateIsNumeric($module_id)){
            $qry->where('t1.module_id', $module_id);
        }
        if(validateIsNumeric($requested_by_id)){
            $qry->where('t1.requested_by_id', $requested_by_id);
        }
        if(validateIsNumeric($approved_by_id)){
            $qry->where('t1.approved_by_id', $approved_by_id);
        }
        if(validateIsNumeric($status_id)){
            $qry->where('t1.cancellation_status_id', $status_id);
        }
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
                        case 'tracking_no' :
                            $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                            break;
                        case 'requested_on' :
                            $whereClauses[] = "date_format(t1.requested_on, '%Y%-%m-%d')= '" . formatDate($filter->value) . "'";
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
        $count = $qry->count();
        $records = $qry->skip($start)->take($limit)->get();
    
        $res = array(
            'success' => true,
            'results' => $records,
            'totals' => $count,
            'message' => 'All is well'
          );
        return \response()->json($res);
    }
    public function getCancelledRegistrationApplicationDetails(Request $req){
        $can_id = $req->can_id;
        if(validateIsNumeric($can_id)){
            $can_data = DB::table('tra_registrationcancellation_requests')->where('id', $can_id)->first();
            if(isset($can_data->module_id) && isset($can_data->app_id)){
                    $module_id = $can_data->module_id;
                    $app_id = $can_data->app_id;
                     $table_names = DB::table('modules')->where('id', $module_id)->select('cancellation_table_name')->first();
                     if(isset($table_names->cancellation_table_name)){
                        $cancellation_table_name = $table_names->cancellation_table_name;
                        
                        $data = DB::table($cancellation_table_name)->where('app_id', $app_id)->get();
                        $res = array(
                            'success' => true,
                            'results' => $data,
                            'message' => 'All is well'
                          );
                     }else{
                        $res = array('success'=>false, 'message'=>'no cancellation table is set for the Module');
                     }
                     
                }else{
                    $res = array('success'=>false, 'message'=>'Record not found');
                }
            }else{
                 $res = array('success'=>false, 'message'=>'Record id was not passed during request');
            }
            return \response()->json($res);
        }    
    public function RevertRegistrationCancellation(Request $req){
        $can_id = $req->can_id;
        $user_id = $this->user_id;
        try{
        if(validateIsNumeric($can_id)){
            DB::beginTransaction();
            $can_data = DB::table('tra_registrationcancellation_requests')->where('id', $can_id)->first();
            if(isset($can_data->module_id) && isset($can_data->app_id)){
                    $module_id = $can_data->module_id;
                    $app_id = $can_data->app_id;
                     $table_names = DB::table('modules')->where('id', $module_id)->select('cancellation_table_name','table_name')->first();
                     if(isset($table_names->cancellation_table_name) && isset($table_names->table_name)){
                        $cancellation_table_name = $table_names->cancellation_table_name;
                        $table_name = $table_names->table_name;
                        
                        $data = DB::table($cancellation_table_name)->where('app_id', $app_id)->first();
                        if(empty($data)){
                            return array(
                                'success' => false,
                                'message' => 'Application details not found from cancellation table'
                              );
                        }
                        $data->id = $data->app_id;
                        unset($data->app_id);
                        $table_data =  (array)$data;
                        $res = insertRecord($table_name, $table_data, $user_id);
                        if(!$res['success']){
                            DB::rollBack();
                            return $res;
                        }
                        //delete from main table
                        $del = DB::table($cancellation_table_name)->where('app_id', $app_id)->delete();
                        if($del){
                            DB::table('tra_registrationcancellation_requests')->where('id', $can_id)->update(['cancellation_status_id'=>2]);
                            $res = array(
                                'success' => true,
                                'message' => 'Application Reverted back successfully'
                              );
                           DB::commit();
                        }else{
                             DB::rollBack();
                           $res = array('message'=>'Failed to cancel application from cancellation table','success'=>false); 

                        }
                       
                     }else{
                        DB::rollBack();
                        $res = array('success'=>false, 'message'=>'no cancellation table is set for the Module');
                     }
                     
                }else{
                    DB::rollBack();
                    $res = array('success'=>false, 'message'=>'Record not found');
                }
            }else{
                 $res = array('success'=>false, 'message'=>'Record id was not passed during request');
            }
        }catch (\Exception $exception) {
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
public function getChecklistQueriesApplicableChecklistItems(Request $request){
            try{
                
                $query_id = $request->input('query_id');
                $checklist_type = $request->input('checklist_type');
                $checklist_category_id = $request->input('checklist_category_id');
                $application_code = $request->input('application_code');
                $is_previous = $request->input('is_previous');
                $process_id = $request->input('process_id');
                $workflow_stage = $request->input('workflow_stage');
                $query_id = $request->input('query_id');
                $pass_status = $request->pass_status;
                $is_auditor = $request->is_auditor;
                $is_structured = $request->is_structured;
                $filter = $request->input('filter');
                if(validateIsNumeric($query_id)){
                    $query_data = DB::table('tra_application_query_reftracker')->where('id', $query_id)->first();
                    $checklist_category_id = $query_data->checklist_category_id;
                    $application_code = $query_data->application_code;
                    $workflow_stage = $query_data->workflow_stage_id;
                    $process_id = $query_data->process_id;
                }
                $submission_details = getLastApplicationSubmissionDetails($application_code);
                if($submission_details['success']){
                    $submission_details = $submission_details['results'];
                    $submission_id = $submission_details->id;
                }
                $where = array(
                    'process_id' => $process_id
                    //'stage_id' => $workflow_stage
                );
                if (validateIsNumeric($workflow_stage)) {
                    $where['stage_id'] = $workflow_stage;
                }
        
                $whereClauses = array();
                $filter_string = '';
                
                    //module_id, sub_module_id and section_id
                    $where2 = DB::table('wf_tfdaprocesses')
                        ->select('module_id', 'sub_module_id', 'section_id')
                        ->where('id', $process_id)
                        ->first();
                      
                    $where2 = convertStdClassObjToArray($where2);
                    $module_id = $where2['module_id'];
                    if($module_id == 4){
                        $module_id = $where2['module_id'];
                        $sub_module_id = $where2['sub_module_id'];
                        $section_id = $where2['section_id'];
                        $where2 = array('module_id'=>$module_id);
                    }
                    
                    else{
                        $module_id = $where2['module_id'];
                        $sub_module_id = $where2['sub_module_id'];
                        $section_id = $where2['section_id'];
                    }
                   
                    $qry1 = DB::table('tra_proc_applicable_checklists')
                        ->select('checklist_category_id')
                        ->where($where);
                    
                    $checklist_categories = $qry1->get();
                    $checklist_categories = convertStdClassObjToArray($checklist_categories);
                    $checklist_categories = convertAssArrayToSimpleArray($checklist_categories, 'checklist_category_id');
                    //get applicable checklist types
                    
                    $qry2 = DB::table('par_checklist_types as t1')
                        ->select('t1.id')
                        ->where($where2)
                        ->whereIn('checklist_category_id', $checklist_categories);
                    $checklist_types = $qry2->get();
                    $checklist_types = convertStdClassObjToArray($checklist_types);
                    $checklist_types = convertAssArrayToSimpleArray($checklist_types, 'id');
                   
                    $qry = DB::table('par_checklist_items as t1')
                        ->leftJoin('checklistitems_responses as t2', function ($join) use ($application_code, $query_id, $submission_id, $is_auditor) {
                            
                            if (isset($query_id) && $query_id != '') {
                                $join->on('t2.checklist_item_id', '=', 't1.id')
                                    ->where('t2.application_code', $application_code);
                            } else if(validateIsNumeric($is_auditor)){
                                 $join->on('t2.checklist_item_id', '=', 't1.id')
                                    ->where('t2.application_code', $application_code);
                            } else {
                                $join->on('t2.checklist_item_id', '=', 't1.id')
                                    ->where('t2.submission_id', $submission_id)
                                    ->where('t2.application_code', $application_code);
                            }
                        })
                        ->leftJoin('checklistitems_queries as t4', function ($join) use ($query_id) {
                            $join->on('t4.checklist_item_id', '=', 't1.id')
                                ->where('t4.query_id', $query_id);
                        })
                        ->join('par_checklist_types as t3', 't1.checklist_type_id', '=', 't3.id')
                        ->join('par_checklist_categories as t5', 't3.checklist_category_id', '=', 't5.id')
                        ->select(DB::raw("t1.*"));
                  
                   /*----------------------------------------------------
                        For unstructured queries they adopt 
                        1. checklist type 102
                   ------------------------------------------------------*/
                    if(validateIsNumeric($is_structured) && $is_structured == 2){
                        $qry->where('t5.is_query', 1);
                    }
                    else{
                        if (validateIsNumeric($checklist_type)) {
                            $qry->where('t1.checklist_type_id', $checklist_type);
                        } else {
                            $qry->whereIn('t1.checklist_type_id', $checklist_types);
                        }
                        if(validateIsNumeric($pass_status)){
                            $qry->where('t2.pass_status', $pass_status);
                        }
                    }
                    
        
                    $results = $qry->get();
                    
                    
                    $res = array(
                        'success' => true,
                        'results' => $results,
                        'message' => returnMessage($results)
                    );

            }catch (\Exception $exception) {
                $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

            } catch (\Throwable $throwable) {
                $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
            }
            return \response()->json($res);


    }
    public function getChecklistRevisionLogs(Request $request)
    {
        try {
            $application_code = $request->input('application_code');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $is_auditor = $request->is_auditor;
            //get logs
            $logs = DB::table('tra_applicationchecklist_logs')->where(['application_code'=>$application_code, 'workflow_stage_id'=>$workflow_stage_id])->get();
            $submission_ids = array();
            foreach ($logs as $log) {
                $submission_ids[] = $log->submission_id;
            }
            if(empty($submission_ids)){
                $res = array('success'=>true, 'message'=>'all is well', 'results'=>array());
                return \response()->json($res);
            }
            //get checklist per user
            $qry = DB::table('checklistitems_responses as t1')
                ->join('par_checklist_items as t2', 't1.checklist_item_id', '=', 't2.id')
                ->join('tra_applicationchecklist_logs as t3', 't1.submission_id', '=', 't3.submission_id')
                ->leftJoin('users as t4', 't1.created_by', '=', 't4.id')
                ->leftJoin('users as t5', 't3.user_id', '=', 't5.id');

            //switch between auditor history and evaluators 
            if(validateIsNumeric($is_auditor)){
                $qry->select(DB::raw("t2.*,t1.*,t1.auditorpass_status as pass_status, t1.auditor_comment as comment, t1.id as item_resp_id,t1.created_on,CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as captured_by, t3.created_on as submission_date"))
                ->whereIn('t1.submission_id', $submission_ids);
            }else{
                $qry->select(DB::raw("t2.*,t1.*,t1.id as item_resp_id,t1.created_on,CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as captured_by, t3.created_on as submission_date"))
                ->whereIn('t1.submission_id', $submission_ids);
            }
                
            
            $results = $qry->get();
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => returnMessage($results)
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
           $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
            }
            return \response()->json($res);
    }
    public function getApplicationNextStageActionDetails(Request $req){
        try{
            $workflow_stage_id = $req->workflow_stage_id;
            $workflowaction_type_id = $req->workflowaction_type_id;
            $record = DB::table('wf_workflow_transitions as t1')
                ->join('wf_workflow_actions as t2', 't1.action_id', 't2.id')
                ->select('t1.*')
                ->where(array('t2.stage_id' => $workflow_stage_id, 'action_type_id' => $workflowaction_type_id))
                ->first();
            $res = array(
                'success' => true,
                'results' => $record
            );

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        } catch (\Throwable $throwable) {
           $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return \response()->json($res);


    }
}
