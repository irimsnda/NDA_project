<?php

namespace Modules\ControlDocumentsMng\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ControlDocumentsMngController extends Controller
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
    public function getApplicationReferenceCodes($application_details)
    {
         
        $codes_array = array(
           // 'zone_code' => $zone_code
           
        );     
        return $codes_array;
    }
    public function saveNewControlDocumentDetails(Request $request)
    {      
        $res = $this->saveControlDocumentApplicationDetails($request,false);

     
        return \response()->json($res);
    }
   public function saveReviewedControlDocumentDetails(Request $request){
        $res = $this->saveControlDocumentApplicationDetails($request,true);

        return \response()->json($res);


   }
   function saveControlDocumentApplicationDetails($request,$is_docreview){
       try{
            
            $reg_doccontrolreview_id = $request->input('reg_doccontrolreview_id');
            $process_id = $request->input('process_id');
            $workflow_stage_id = $request->input('workflow_stage_id');
            $module_id = $request->input('module_id');
            $sub_module_id = $request->input('sub_module_id');
            $section_id = $request->input('section_id');


            $active_application_id = $request->input('active_application_id');
            $document_no = $request->input('document_no');
            $controldoc_master_id = $request->input('controldoc_master_id');
        
            $version_no = $request->input('version_no');
            $requested_by = $request->input('requested_by');
        
            $doc_application_date = $request->input('doc_application_date');
            $approved_by = $request->input('approved_by');
            $approval_date = $request->input('approval_date');
            $effective_date_from = $request->input('effective_date_from');
            $next_review_date = $request->input('next_review_date');
            $remarks = $request->input('remarks');

            $user_id = $this->user_id;

            if (validateIsNumeric($active_application_id)) {
                //update
                $applications_table = 'tra_doccontrolreview_management';
                $application_params = array(
                    'process_id' => $process_id,
                    'section_id'=>$section_id,
                    'workflow_stage_id' => $workflow_stage_id,
                    "sub_module_id" => $request->input('sub_module_id'),
                    "module_id" => $request->input('module_id'),
                    "controldoc_master_id" => $controldoc_master_id,
                    "document_no" => $document_no,
                    "version_no" => $version_no,
                    'reg_doccontrolreview_id'=>$reg_doccontrolreview_id,
                    "requested_by" => $requested_by,
                    "doc_application_date" => $doc_application_date,
                    "approved_by" => $approved_by,
                    "approval_date" => $approval_date,
                    "effective_date_from" => $effective_date_from,
                    "next_review_date" => $next_review_date,
                    "remarks" => $document_no
                );
                
                $where_app = array(
                    'id' => $active_application_id
                );
                $app_details = array();
                if (recordExists($applications_table, $where_app)) {
                    $app_details = getPreviousRecords($applications_table, $where_app);
                    if ($app_details['success'] == false) {
                        return $app_details;
                    }
                    $app_details = $app_details['results'];
                    $application_params['altered_by'] = \Auth::user()->id;
                    $application_params['dola'] = Carbon::now();

                    $res = updateRecord($applications_table, $app_details, $where_app, $application_params, $user_id);

                }

                $application_code = $app_details[0]['application_code'];
                $ref_number = $app_details[0]['reference_no'];

                $res['active_application_id'] = $active_application_id;
                $res['application_code'] = $application_code;
                $res['ref_no'] = $ref_number;
                $record = DB::table('tra_application_documentsdefination')->where('application_code',$application_code)->first();
                if(!$record){
                    initializeApplicationDMS(5, $module_id, $sub_module_id, $application_code, $ref_number.rand(0,1000), $user_id);
                }
                  

            } else {

                    $applications_table = 'tra_doccontrolreview_management';

                    $application_code = generateApplicationCode($sub_module_id, $applications_table);

                    $application_status = getApplicationInitialStatus($module_id, $sub_module_id);

                    $reference_no = $document_no.' #'. $version_no;
                    //check eixitence
                    $where_statement = array('controldoc_master_id' => $controldoc_master_id);
                    $valid= $this->validateControlDocumentApp($reference_no,$controldoc_master_id,$applications_table,$is_docreview);
                    if($valid['success']){
                        $registration_data = array('controldoc_master_id' => $controldoc_master_id,
                                'application_code'=>$application_code,
                                'document_status_id' => $application_status->status_id,
                                'validity_status_id' => 1
                            );
                        
                        $res= saveApplicationRegistrationDetails('reg_doccontrolreview_management', $registration_data, $where_statement, $user_id);

                            $view_id = generateApplicationViewID();
                            $reg_doccontrolreview_id = $res['record_id'];
                            $app_data = array(
                                "process_id" => $request->input('process_id'),
                                "workflow_stage_id" => $request->input('workflow_stage_id'),
                                "application_status_id" => $application_status->status_id,'section_id'=>$section_id,
                                "application_code" => $application_code,
                                "reference_no" => $reference_no,
                                "reg_doccontrolreview_id"=>$reg_doccontrolreview_id,
                                'view_id' => $view_id,
                                "sub_module_id" => $request->input('sub_module_id'),
                                "module_id" => $request->input('module_id'),
                                "controldoc_master_id" => $controldoc_master_id,
                                "document_no" => $document_no,
                                "version_no" => $version_no,
                                "requested_by" => $requested_by,'reg_doccontrolreview_id'=>$reg_doccontrolreview_id,
                                "doc_application_date" => $doc_application_date,
                                "approved_by" => $approved_by,
                                "approval_date" => $approval_date,
                                "effective_date_from" => $effective_date_from,
                                "next_review_date" => $next_review_date,
                                "remarks" => $document_no,
                                "date_added" => Carbon::now(),
                                "created_by" => \Auth::user()->id,
                                "created_on" => Carbon::now());

                            $res = insertRecord('tra_doccontrolreview_management', $app_data, $user_id);
                            
                            $active_application_id = $res['record_id'];
                            $view_id = generateApplicationViewID();
                            //add to submissions table
                            $submission_params = array(
                                'application_id' => $active_application_id,
                                'process_id' => $process_id,
                                'application_code' => $application_code,
                                "reference_no" => $reference_no,
                                'usr_from' => $user_id,
                                'usr_to' => $user_id,
                                'previous_stage' => $workflow_stage_id,
                                'current_stage' => $workflow_stage_id,
                                'module_id' => $module_id,
                                'sub_module_id' => $sub_module_id,
                                'section_id' => '',
                                'application_status_id' => $application_status->status_id,
                                'urgency' => 1, 'view_id' => $view_id,
                                'remarks' => 'Initial save of the application',
                                'date_received' => Carbon::now(),
                                'created_on' => Carbon::now(),
                                'created_by' => $user_id
                            );

                            insertRecord('tra_submissions', $submission_params, $user_id);
                            $res['active_application_id'] = $active_application_id;
                            $res['application_code'] = $application_code;
                        
                            $res['ref_no'] = $reference_no;
                            

                         initializeApplicationDMS(5, $module_id, $sub_module_id, $application_code, $reference_no.rand(0,1000), $user_id);
                    }else{
                        $res = $valid;
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
        return $res;
   }
   public function saveControlDocumentsAccessDetails(Request $req){
            try{
                $id = $req->id;$user_id = $this->user_id;
                $application_id = $req->application_id;
                $directorate_id = $req->directorate_id;
                $directorate_unit_id = $req->directorate_unit_id;
                $remarks = $req->remarks;
                $data= array('application_id'=>$application_id, 
                            'directorate_id'=>$directorate_id,
                             'directorate_unit_id'=>$directorate_unit_id);
                             $where_app = array(
                                'id' => $id
                            );
                            $applications_table = 'tra_doccontrolaccess_management';

                            $app_details = array();
                            if (recordExists($applications_table, $where_app)) {
                                $app_details = getPreviousRecords($applications_table, $where_app);
                                if ($app_details['success'] == false) {
                                    return $app_details;
                                }
                                $app_details = $app_details['results'];
                                $data['altered_by'] = \Auth::user()->id;
                                $data['dola'] = Carbon::now();
                                $data['remarks'] = $remarks;

                                $res = updateRecord($applications_table, $app_details, $where_app, $data, $user_id);

                            }
                            else{
                                $data['created_by'] = \Auth::user()->id;
                                $data['created_on'] = Carbon::now();
                                $data['remarks'] = $remarks;
                                $res = insertRecord($applications_table, $data, $user_id);
                            }
                    if($res['success']){
                        $res = array('success'=>true, 'message'=>'Control Document Management Access saved successfully');

                    }
                    
            }catch (\Exception $exception) {
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
   public function validateControlDocumentApp($reference_no,$controldoc_master_id,$applications_table,$is_docreview){
            $doc_record = DB::table($applications_table)
                ->where(array('reference_no'=>$reference_no))
                ->count();
                $res = array('success'=>true);
            if ($doc_record >0) {
                $res = array(
                    'success' => false,
                    'message' => 'A document with the same Document Number has already been submitted, Document #: ' . $reference_no
                );
            }else if(!$is_docreview){
                $doc_record = DB::table('reg_doccontrolreview_management')
                ->where(array('controldoc_master_id'=>$controldoc_master_id))
                ->count();

                if ($doc_record >0) {
                    $res = array(
                        'success' => false,
                        'message' => 'The control Document has already been submitted, Kindly submit the reviewed document!!'
                    );
                   
                }
            }

            return $res;
            //check the 

   }
    public function getControlDocumentApplications(Request $request)
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

            $qry = DB::table('tra_doccontrolreview_management as t1')
                ->join('tra_submissions as t7', function ($join) {
                    $join->on('t1.application_code', '=', 't7.application_code')
                        ->on('t1.workflow_stage_id', '=', 't7.current_stage');
                })
                ->join('par_controldocument_masterlist as t2', 't1.controldoc_master_id', '=', 't2.id')
                ->leftJoin('par_controldocument_types as t3', 't2.controldocument_type_id', '=', 't3.id')
                ->leftJoin('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('users as t8', 't1.requested_by', '=', 't8.id')
                ->join('users as t9', 't1.approved_by', '=', 't9.id')
                ->select(DB::raw("t7.date_received, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_byname,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as approved_byname,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as document_type,
                    t6.name as application_status, t3.name as document_type, t4.name as process_name,t1.* , t5.name as workflow_stage"));
            $is_super ? $qry->whereRaw('1=1') : $qry->whereIn('t1.workflow_stage_id', $assigned_stages);
            
            if (validateIsNumeric($sub_module_id)) {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }


            if (validateIsNumeric($workflow_stage_id)) {

                $qry->where('t7.current_stage', $workflow_stage_id);
            }

            $qry->where('t7.isDone', 0);
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
    public function getPreviousControlDocumentVersions(Request $request)
    {
       
        $reg_doccontrolreview_id = $request->input('reg_doccontrolreview_id');
        
          try {

               $qry = DB::table('tra_doccontrolreview_management as t1')
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->join('par_controldocument_masterlist as t2', 't1.controldoc_master_id', '=', 't2.id')
                ->leftJoin('par_controldocument_types as t3', 't2.controldocument_type_id', '=', 't3.id')
                ->leftJoin('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('users as t8', 't1.requested_by', '=', 't8.id')
                ->join('users as t9', 't1.approved_by', '=', 't9.id')
                ->join('par_directorates as t10', 't2.directorate_id', '=', 't10.id')
                ->join('par_directorate_units as t11', 't2.directorate_unit_id', '=', 't11.id')
                ->leftJoin('tra_application_uploadeddocuments as t12','t1.application_code','=','t12.application_code')
                ->join('reg_doccontrolreview_management as t13', 't1.reg_doccontrolreview_id','=','t13.reg_doccontrolreview_id')
                ->select(DB::raw("t7.date_received, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_byname,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as approved_byname,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as document_type,t11.name as directorate_unit, t10.name as directorate_name,
                    t6.name as application_status, t3.name as document_type, t4.name as process_name,t1.* , t5.name as workflow_stage, t12.file_name, t12.node_ref, t13.id as reg_doccontrolreview_id"));
            $qry->where('t5.stage_status', 3);
            $qry->where('t13.application_code','!=', t1.application_code);
            $qry->where('t1.reg_doccontrolreview_id', $reg_doccontrolreview_id);
            
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
    public function getApprovedControlDocumentRelease(Request $request)
    {
       
        $user_id = $this->user_id;
          try {

            $filter = $request->input('filter');
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'version_no' :
                                $whereClauses[] = "t1.version_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'directorate_name' :
                                $whereClauses[] = "t10.id = '" . ($filter->value) . "'";
                                break;
                                case 'directorate_unit' :
                                    $whereClauses[] = "t11.id = '" . ($filter->value) . "'";
                                break;
                                case 'document_type' :
                                    $whereClauses[] = "t3.id = '" . ($filter->value) . "'";
                                break;
                                case 'approved_byname' :
                                    $whereClauses[] = "t9.id = '" . ($filter->value) . "'";
                                break;
                                case 'document_status' :
                                    $whereClauses[] = "t9.id = '" . ($filter->value) . "'";
                                break;
                                case 'is_controlled_document' :
                                    $whereClauses[] = "t3.is_controlled_document = '" . ($filter->value) . "'";
                                break;

                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
               $qry = DB::table('tra_doccontrolreview_management as t1')
                ->join('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                ->join('par_controldocument_masterlist as t2', 't1.controldoc_master_id', '=', 't2.id')
                ->leftJoin('par_controldocument_types as t3', 't2.controldocument_type_id', '=', 't3.id')
                ->leftJoin('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->leftJoin('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('users as t8', 't1.requested_by', '=', 't8.id')
                ->join('users as t9', 't1.approved_by', '=', 't9.id')
                ->join('par_directorates as t10', 't2.directorate_id', '=', 't10.id')
                ->join('par_directorate_units as t11', 't2.directorate_unit_id', '=', 't11.id')
                ->leftJoin('tra_application_uploadeddocuments as t12','t1.application_code','=','t12.application_code')
                ->join('reg_doccontrolreview_management as t13', 't1.application_code','=','t13.application_code')
                ->select(DB::raw("t7.date_received, CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_byname,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as approved_byname,  t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, t2.name as document_type,t11.name as directorate_unit, t10.name as directorate_name,
                    t6.name as application_status, t3.name as document_type, t4.name as process_name,t1.* , t5.name as workflow_stage, t12.file_name, t12.node_ref, t13.id as reg_doccontrolreview_id, t12.id as uploadeddocuments_id, t12.application_code"));
            $qry->where('t5.stage_status', 3);
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
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
    
    public function prepareNewControlDocumentRequest(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        try {
            $main_qry = DB::table('tra_doccontrolreview_management as t1')
                    ->join('par_controldocument_masterlist as t2', 't1.controldoc_master_id', '=', 't2.id')
                    ->leftJoin('par_controldocument_types as t3', 't2.controldocument_type_id', '=', 't3.id')
                    ->select(DB::raw("t1.*, t3.name as control_document_name, t2.controldocument_type_id"))
                ->where('t1.id', $application_id);
                $results = $main_qry->first();

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
    public function validateDocumentUploadExists(Request $req){
        $applications_table = $req->application_code;
        $doc_record = DB::table('tra_application_uploadeddocuments')
                        ->where(array('application_code'=>$applications_table))
                        ->count();
        if($doc_record >0){

            $res = array('success'=>true, 'message'=>'Document Uploaded');
        }
        else{
            $res = array('success'=>false, 'message'=>'Upload document to proceed!!'); 
        }
        return \response()->json($res);
    }
    public function getControlDocumentsreglist(Request $req){
        try{
            $sql = DB::table('reg_doccontrolreview_management as t1')
                            ->join('tra_doccontrolreview_management as t2', 't1.application_code','=','t2.application_code')
                            ->join('par_controldocument_masterlist as t3', 't1.controldoc_master_id','=','t3.id')
                            ->leftJoin('par_controldocument_types as t4','t3.controldocument_type_id','=','t4.id')
                            ->leftJoin('par_directorates as t5','t3.directorate_id','=','t5.id')
                            ->leftJoin('par_directorate_units as t6','t3.directorate_unit_id','=','t6.id')
                            ->join('users as t8', 't2.requested_by', '=', 't8.id')
                            ->join('users as t9', 't2.approved_by', '=', 't9.id')
                            ->select(DB::raw("t3.*,t2.*, t4.name as controldocument_type_name,t1.id as controldoc_master_id,t3.name as control_document_name, t3.code as document_no,t5.name as directorate_name,t6.name as directorate_unit_name,CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as requested_byname,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as approved_byname,t4.name as document_type"));
                           $results = $sql->get(); 
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
    public function getControlDocumentsAccessDetails(Request $req){
            try{

                $application_id = $req->application_id;
                $data = DB::table('tra_doccontrolaccess_management as t1')
                            ->join('par_directorates as t2', 't1.directorate_id','=','t2.id')
                            ->join('par_directorate_units as t3','t1.directorate_unit_id','=','t3.id')
                            ->select('t1.*', 't2.name as directorate_name', 't3.name as directorate_unitname')
                            ->where(array('application_id'=>$application_id))
                            ->get();
                            $res = array(
                                'success' => true,
                                'results' => $data,
                                'message' => 'All is well'
                            ); 
            }catch (\Exception $exception) {
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
  public function getDocDirectiveBasedUsersList(Request $request)
    {
        $docdirective_id = $request->input('docdirective_id');
        try {
            $qry = DB::table('users as t1')
                ->leftJoin('par_titles as t2', 't1.title_id', '=', 't2.id')
                ->leftJoin('par_user_images as t3', 't1.id', '=', 't3.user_id')
                ->leftJoin('par_departments as t4', 't1.department_id', '=', 't4.id')
                ->leftJoin('par_zones as t5', 't1.zone_id', '=', 't5.id')
                ->leftJoin('tra_blocked_accounts as t6', 't1.id', '=', 't6.account_id')
                ->leftJoin('tra_user_group as t7','t1.id','t7.user_id')
                ->leftJoin('par_distdirective_users as t8','t1.id','t8.user_id')
                ->select(DB::raw("t1.*,CONCAT_WS(' ',t2.name,decrypt(t1.first_name),decrypt(t1.last_name)) as fullnames,decrypt(t1.email) as email,
                                   t1.last_login_time,t3.saved_name,t4.name as department_name,t5.name as zone_name, t8.id as docdirective_id"))
                ->whereNull('t6.id');
           
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
     public function addSelectedUserstoUnit(Request $request)
    {
        $selected = $request->input('selected');
        $docdirective_id = $request->input('docdirective_id');
        $selected_ids = json_decode($selected);
        $user = $this->user_id;
        try {
            $set_users = DB::table('par_distdirective_users as t1')
                    ->where('docdirective_id', $docdirective_id)
                    ->whereIn('user_id', $selected_ids)
                    ->select('user_id')
                    ->get();

            $mapped_users[] = Arr::pluck($set_users, 'user_id');
            $userArray = call_user_func_array('array_merge',$mapped_users);

            foreach ($selected_ids as $id) {


                 if(!in_array( $id, $userArray )){
                    $res = insertRecord('par_distdirective_users', ['user_id'=>$id, 'docdirective_id'=>$docdirective_id], $user);
                 }
            }

            $res = array(
                'success' => true,
                'message' => 'Users added successfully!!'
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
    
    public function getDocDirectiveUsers(Request $request)
    {
        $docdirective_id = $request->input('docdirective_id');
        try {
            $qry = DB::table('users as t1')
                ->leftJoin('par_titles as t2', 't1.title_id', '=', 't2.id')
                ->leftJoin('par_user_images as t3', 't1.id', '=', 't3.user_id')
                ->leftJoin('par_departments as t4', 't1.department_id', '=', 't4.id')
                ->leftJoin('par_zones as t5', 't1.zone_id', '=', 't5.id')
                ->leftJoin('tra_blocked_accounts as t6', 't1.id', '=', 't6.account_id')
                ->leftJoin('tra_user_group as t7','t1.id','t7.user_id')
                ->leftJoin('par_distdirective_users as t8','t1.id','t8.user_id')
                ->select(DB::raw("t1.*,CONCAT_WS(' ',t2.name,decrypt(t1.first_name),decrypt(t1.last_name)) as name,decrypt(t1.email) as email,
                                   t1.last_login_time,t3.saved_name,t4.name as department_name,t5.name as zone_name, t8.id as docdirective_id"))
                ->whereNull('t6.id');
           if(validateIsNumeric($docdirective_id)){
                $qry->where('t8.docdirective_id', $docdirective_id);
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
    public function removeSelectedUsersFromUnits(Request $request)
    {
        $selected = $request->input('selected');
        $docdirective_id = $request->input('docdirective_id');
        $selected_ids = json_decode($selected);
        $user_id = $this->user_id;
        try {
            $params = DB::table('par_distdirective_users as t1')
                ->select(DB::raw("t1.*,$user_id as deletion_by"))
                ->where('docdirective_id', $docdirective_id)
                ->whereIn('user_id', $selected_ids)
                ->get();
            $params = convertStdClassObjToArray($params);
            DB::table('par_distdirective_users_log')
                ->insert($params);
            DB::table('par_distdirective_users')
                ->where('docdirective_id', $docdirective_id)
                ->whereIn('user_id', $selected_ids)
                ->delete();
            $res = array(
                'success' => true,
                'message' => 'Users removed successfully!!'
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
    public function saveDocumentDistributionUserList(Request $req)
    {
        $application_id = $req->application_id;
        $user_ids = json_decode($req->user_id);
        $user_id = $this->user_id;
        $res = array('success'=>true, 'message'=>'Distribution list details saved successfully');
        
        if(validateIsNumeric($application_id)){
             DB::beginTransaction();
            foreach ($user_ids as $key => $value) {
                $data = ['application_id' => $application_id, 'user_id' => $value, 'created_by'=> $this->user_id, 'created_on'=>Carbon::now()];
                $rec = DB::table('tra_documentdistribution_users')->where($data)->count();
                if($rec ==0){
                    $res = insertRecord('tra_documentdistribution_users', $data, $user_id);
                    if(!$res['success']){
                        DB::rollBack();
                        return $res;
                    }
                }
                

            }
            DB::commit();
            
        }else{
            $res = array('success'=>false, 'message'=>'Failed to capture application Id');
        }
        return response()->json($res);
    }
    public function getDocumentDistributionUsersList(Request $req)
    {
        $application_id = $req->application_id;

        if(validateIsNumeric($application_id)){
            $res = DB::table('tra_documentdistribution_users as t1')
                    ->leftJoin('users as t2', 't1.user_id', 't2.id')
                    ->select(DB::raw("CONCAT_WS(' ',decrypt(t2.first_name),decrypt(t2.last_name)) as user_name, t1.id"))
                    ->where('t1.application_id', $application_id)
                    ->get();
        }else{
            $res = array('success'=>false, 'message'=>'Failed to capture application Id');
        }
        return response()->json($res);
    }
    public function revokeDistributionUserList(Request $req)
    {
        $application_id = $req->application_id;
        $record_id = $req->record_id;

        if(validateIsNumeric($application_id)){
            if(validateIsNumeric($record_id)){
                DB::table('tra_documentdistribution_users')
                    ->where('id', $record_id)
                    ->delete();
                }else{
                DB::table('tra_documentdistribution_users')
                    ->where('application_id', $application_id)
                    ->delete();
                }
            $res = array('success'=>true, 'message'=>"revoked successfully");
        }else{
            $res = array('success'=>false, 'message'=>'Failed to capture application Id');
        }
        return response()->json($res);
    }
    public function getAccessControlDetails(Request $req)
    {
        $application_id = $req->application_id;
        $res = [];
        if(validateIsNumeric($application_id)){
             $data = DB::table('tra_doccontrolaccess_management')->where('application_id', $application_id)->get();
             $res = array(
                'success' => true,
                'results' => $data,
                'message' => 'All is well'
            );
        }
        return response()->json($res);
    }
}
