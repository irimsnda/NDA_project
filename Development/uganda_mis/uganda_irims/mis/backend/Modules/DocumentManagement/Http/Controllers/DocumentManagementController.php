<?php

namespace Modules\DocumentManagement\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
// use Pion\Laravel\ChunkUpload\Config\AbstractConfig;
// use Pion\Laravel\ChunkUpload\Exceptions\UploadFailedException;
// use Pion\Laravel\ChunkUpload\Handler\AbstractHandler;
// use Pion\Laravel\ChunkUpload\Save\AbstractSave;
// use Pion\Laravel\ChunkUpload\Save\ChunkSave;
// use Pion\Laravel\ChunkUpload\Save\SingleSave;
// use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
// use Illuminate\Http\File;
use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
use ZanySoft\Zip\Zip;
use File;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\UploadedFile;
use ZipArchive;

class DocumentManagementController extends Controller
{
   /**
     * Display a listing of the resource.
     * @return Response
     */
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

    public function getProcessApplicableDocTypes(Request $req)
    {
        $process_id = $req->input('process_id');
        $workflow_stage = $req->input('workflow_stage');
        $section_id = $req->input('section_id');
        $module_id = $req->input('module_id');
        $sub_module_id = $req->input('sub_module_id');
        $document_type_id = $req->input('document_type_id');
        $query_id = $req->input('query_id');
        $where = array(
            'section_id' => $section_id,
            'module_id' => $module_id,
            'sub_module_id' => $sub_module_id
        );
        try {
            if(validateIsNumeric($process_id)){
                $process_id = getSingleRecordColValue('wf_tfdaprocesses', $where, 'id');
            }
            $qry = DB::table('tra_proc_applicable_doctypes as t1')
                ->join('par_document_types as t2', 't1.doctype_id', '=', 't2.id')
                ->join('tra_documentupload_requirements as t3', 't2.id', '=', 't3.document_type_id')
                ->select('t2.id', 't2.name', 't2.is_assessment_doc');
            /*-------------------------------------------------------
                For Document originating from query window identified by
                query id rewrite the query not tied to process
                Document Type : 39
            --------------------------------------------------------*/
            if(validateIsNumeric($query_id)){
                $qry = DB::table('par_document_types as t2')
                        ->select('t2.id', 't2.name', 't2.is_assessment_doc');
                $qry->where('t2.id', 39);
            }else{
                if (isset($process_id) && $process_id != '') {
                     $qry->where('t1.process_id', $process_id);
                }
                if (isset($workflow_stage) && $workflow_stage != '') {
                    $qry->where('t1.stage_id', $workflow_stage);
                }
                if(validateIsNumeric($document_type_id)){
                    $qry->where('t1.id', $document_type_id);
                }
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
        return response()->json($res);
    }

    public function getProcessApplicableDocRequirements(Request $req)
    {
        $docType_id = $req->input('docType_id');
        $process_id = $req->input('process_id');
        $prodclass_category_id = $req->input('prodclass_category_id');
        $section_id = $req->input('section_id');
        $module_id = $req->input('module_id');
        $sub_module_id = $req->input('sub_module_id');
        $where = array(
            //'t1.section_id' => $section_id,
            't1.module_id' => $module_id,
            't1.sub_module_id' => $sub_module_id
        );
        try {
            $qry = DB::table('tra_documentupload_requirements as t1')
                ->join('wf_tfdaprocesses as t2', function ($join) {
                    $join->on("t1.module_id", "=", "t2.module_id")
                        ->on("t1.sub_module_id", "=", "t2.sub_module_id");
                })
                ->select('t1.id', 't1.name', 't2.id as process','t1.prodclass_category_id')
                ->where('t1.document_type_id', $docType_id)
                ->whereRaw("(select count(a.id) from tra_documentupload_requirements a where a.docparent_id = t1.id) = 0")
               ->where($where);

            if(validateIsNumeric($process_id)){
                $qry->where('t2.id', $process_id);
            }
            if(validateIsNumeric($prodclass_category_id)){
                $qry->where('t1.prodclass_category_id', $prodclass_category_id);
            }
if(validateIsNumeric($section_id)){
                $qry->where('t1.section_id', $section_id);
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
        return response()->json($res);
    }

    public function onLoadApplicationDocumentsRequirements(Request $req)
    {
        try {
            $application_code = $req->input('application_code');
            $table_name = $req->input('table_name');
            $process_id = $req->input('process_id');
              $module_id = getSingleRecordColValue('wf_tfdaprocesses', array('id' => $process_id), 'module_id');
            $workflow_stage = $req->input('workflow_stage');
            $where = array(
                'process_id' => $process_id,
                'stage_id' => $workflow_stage
            );
            //get applicable document types
            $qry1 = DB::table('tra_proc_applicable_doctypes')
                ->select('doctype_id')
                ->where($where);
            $docTypes = $qry1->get();
            $docTypes = convertStdClassObjToArray($docTypes);
            $docTypes = convertAssArrayToSimpleArray($docTypes, 'doctype_id');
            //get applicable document requirements
            $qry = DB::table('tra_documentupload_requirements as t1')
                ->leftJoin('par_document_types as t2', 't1.document_type_id', '=', 't2.id')
                ->select('t1.id', 't1.name')
                
                ->where(array('t3.application_code' => $application_code))//, 't1.document_type_id' => $document_type_id))
                ->whereIn('t1.document_type_id', $docTypes);

                if($module_id == 4  || $module_id == 12){
                    $qry->join($table_name . ' as t3', function ($join) {
                        $join->on("t1.sub_module_id", "=", "t3.sub_module_id");
                    });
                }
                else{
                    
                    $qry->join($table_name . ' as t3', function ($join) {
                        $join->on("t1.section_id", "=", "t3.section_id")
                            ->on("t1.sub_module_id", "=", "t3.sub_module_id");
                    });
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
        return response()->json($res);
    }


    public function onLoadUnstructureApplicationDocumentsUploads(Request $req)
    {
        try {
            $reference_record_id = $req->input('reference_record_id');
            $table_name = $req->input('table_name');

            $document_type_id = $req->input('document_type_id');

            $qry = DB::table('tra_nonstructured_docdefination as t1')
                ->join('par_document_types as t2', 't1.document_type_id', '=', 't2.id')
                ->select(DB::raw("t4.remarks,
                t4.node_ref, t2.name as document_type, t4.id,t4.initial_file_name,t4.file_name, reference_record_id,
                t4.file_type,t4.uploaded_on,CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by,
                t1.document_type_id"))
                ->leftJoin($table_name.' as t4', function ($join) use ($reference_record_id) {
                    $join->on("t1.document_type_id", "=", "t4.document_type_id")
                         ->where("t4.reference_record_id", "=", $reference_record_id);
                })
                ->leftJoin('users as t5', 't4.uploaded_by', '=', 't5.id');
                $qry->where('t1.document_type_id', $document_type_id);

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
        return response()->json($res);
    }
    function getApplicationDocumentsUploads($req){
        
            $application_code =  $req->input('application_code');//20412100
            $workflow_stage = $req->input('workflow_stage');
            $doc_type_id = $req->input('document_type_id');
            $portal_uploads = $req->input('portal_uploads');
            $portal_status_id = $req->input('portal_status_id');
            $section_id = $req->input('section_id');
            $module_id = $req->input('module_id');
            $sub_module_id = $req->input('sub_module_id');
            $isvalidate_uploaded_by = $req->input('isvalidate_uploaded_by');
            $prodclass_category_id = $req->input('prodclass_category_id');
            $product_id = $req->input('product_id');
            $parent_id = $req->input('node');
            $process_id = $req->input('process_id');
            $uploaded_by = $this->user_id;
            $documentreg_serialno = $req->documentreg_serialno;
              if(!validateIsNumeric($isvalidate_uploaded_by)){
                $isvalidate_uploaded_by =0;
        }
            $results=collect();
         $where = array(
                'module_id' => $module_id,
                'sub_module_id' => $sub_module_id
            );
            if (validateIsNumeric($prodclass_category_id)) {
                $where['prodclass_category_id'] = $prodclass_category_id;
            }
            if(validateIsNumeric($section_id)){
                $where['section_id'] = $section_id;
            }
            
            if(!validateIsNumeric($process_id)){
                $process_id = getSingleRecordColValue('wf_tfdaprocesses', $where, 'id');
            }
if($module_id ==4 || $module_id ==12){
                unset($where['section_id']);
            }

            //get applicable document types
            $qry1 = DB::table('tra_proc_applicable_doctypes')
                ->select('*');
            if (validateIsNumeric($process_id)) {
                
            }
            if (validateIsNumeric($workflow_stage)) {
              //  $qry1->where('stage_id', $workflow_stage);
            }
            if (validateIsNumeric($doc_type_id)) {
                $qry1->where('doctype_id', $doc_type_id);
            }
           // $procesS_id = 67;
                $qry1->where('process_id', $process_id);
            $docTypes = $qry1->get();

            $docTypes = convertStdClassObjToArray($docTypes);
            $docTypes = convertAssArrayToSimpleArray($docTypes, 'doctype_id');
    
            if (validateIsNumeric($doc_type_id)) {
               // $where['t1.document_type_id'] = $doc_type_id;
            }
           
            if(validateIsNumeric($parent_id)){
                $qry = DB::table('tra_application_uploadeddocuments as t1')
                    ->leftJoin('tra_application_documents as t2', 't1.application_document_id', 't2.id')
                    ->leftJoin('tra_documentupload_requirements as t4', 't2.document_requirement_id', 't4.id')
                    ->leftJoin('par_document_types as t3', 't4.document_type_id', 't3.id')
                    ->leftJoin('users as t5', 't2.uploaded_by', '=', 't5.id')
                    ->select(DB::raw("t2.*, t1.*,t1.initial_file_name as file_name, t2.remarks, t4.module_id, t4.sub_module_id,t4.section_id,t1.file_type, t2.uploaded_on,CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by,t4.is_mandatory, t4.document_type_id,t3.name as document_type, t4.name as document_requirement, case when (select count(id) from tra_application_uploadeddocuments q where q.parent_id = t1.id) = 0 then false else true end leaf"))
                    ->where('t1.parent_id', $parent_id)
                    ->where('t4.is_enabled', 1);
                $results = $qry->get();
            }else{
                $doc_requirments = DB::table('tra_documentupload_requirements as t1')
                                ->where($where)
                                ->whereIn('document_type_id', $docTypes)
                                ->get();
                foreach ($doc_requirments as $doc_req) {
                    $qry = DB::table('tra_application_documents as t1')
                        ->join('tra_documentupload_requirements as t2', 't1.document_requirement_id', 't2.id')
                        ->join('par_document_types as t3', 't2.document_type_id', 't3.id')
                        ->leftJoin('tra_application_uploadeddocuments as t4', function ($join) use ($application_code,$isvalidate_uploaded_by,$uploaded_by, $documentreg_serialno) {
                            if(validateIsNumeric($documentreg_serialno)){
                                $join->on("t1.id", "=", "t4.application_document_id")
                                 ->where("t4.documentreg_serialno", $documentreg_serialno)
                                 ->whereRaw("CASE WHEN $isvalidate_uploaded_by =1  THEN t1.uploaded_by = $uploaded_by ELSE 1 = 1 END");
                            }else{
                                $join->on("t1.id", "=", "t4.application_document_id")
                                 ->whereRaw("CASE WHEN $isvalidate_uploaded_by =1  THEN t1.uploaded_by = $uploaded_by ELSE 1 = 1 END");
                            }

                        })
                        ->leftJoin('users as t5', 't1.uploaded_by', '=', 't5.id')
                        ->select(DB::raw("t1.*,t4.remarks,t4.application_document_id,
                        t4.node_ref,t4.initial_file_name,t4.file_name,t4.initial_file_name as file_name, t2.module_id,t2.sub_module_id,t2.section_id,t4.file_type,t1.uploaded_on,CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by,t2.is_mandatory,
                         t2.document_type_id,t3.name as document_type, t2.name as document_requirement, t4.id,t4.is_directory, case when (select count(id) from tra_application_uploadeddocuments q where q.parent_id = t4.id) = 0 then false else true end leaf"))
                        ->where([ 't1.application_code'=>$application_code]);
                       // ->where('t4.parent_id', 0);

                    $res = $qry->get();
                    if($res->isEmpty()){
                        $res = DB::table('tra_documentupload_requirements as t1')
                                ->join('par_document_types as t3', 't1.document_type_id', 't3.id')
                                ->where('t1.id', $doc_req->id)
                                ->selectRaw("t1.name as file_name, true as leaf, t1.name as document_requirement, t3.name as document_type")
                                ->get();
                    }
                    $results = $results->merge($res);

                }
            }




            return $results; 

    }
    public function onLoadApplicationPrevDocumentsUploads(Request $req){
            
        try {
            
            $results = $this->getApplicationDocumentsUploads($req);
            
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        
           
           
        } catch (\Exception $exception) {
            $results = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $results = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($results);
        
        
    }
     public function onLoadApplicationDocumentsUploads(Request $req)
    {
        
        //$uploaded_by = 25;
      
        try {
            
            $results = $this->getApplicationDocumentsUploads($req);
            
            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        
           
           
        } catch (\Exception $exception) {
            $results = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $results = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($results);
    }
    public function LoadAllApplicationUploadedDocuments(Request $req)
    {
        $application_code = $req->input('application_code');
        // $workflow_stage = $req->input('workflow_stage');
        $doc_type_id = $req->input('document_type_id');
        // $portal_uploads = $req->input('portal_uploads');
        // $portal_status_id = $req->input('portal_status_id');
        // $section_id = $req->input('section_id');
        $module_id = $req->input('module_id');
        // $sub_module_id = $req->input('sub_module_id');
        $isvalidate_uploaded_by = 0;
        $is_original_dossier = $req->is_original_dossier;
        // $prodclass_category_id = $req->input('prodclass_category_id');
        $parent_id = $req->input('node');
        $uploaded_by = $this->user_id;
        $documentreg_serialno=0;
        //$uploaded_by = 25;
        if(validateIsNumeric($is_original_dossier)){
            //original
            $table_name = getTableName($module_id);
            $documentreg_serialno = getSingleRecordColValue($table_name, ['application_code'=>$application_code], 'documentreg_serialno');
        }
        try {
            if(validateIsNumeric($parent_id)){
            //get applicable document requirements
            $qry = DB::table('tra_application_uploadeddocuments as t1')
                    ->leftJoin('tra_application_documents as t2', 't1.application_document_id', 't2.id')
                    ->leftJoin('tra_documentupload_requirements as t4', 't2.document_requirement_id', 't4.id')
                    ->leftJoin('par_document_types as t3', 't4.document_type_id', 't3.id')
                    ->leftJoin('users as t5', 't2.uploaded_by', '=', 't5.id')
                    ->select(DB::raw("t1.*,t2.remarks, t4.module_id, t4.sub_module_id,t4.section_id,t1.file_type, t2.uploaded_on, CONCAT(decryptval(t5.first_name,".getDecryptFunParams()."),' ',decryptval(t5.last_name,".getDecryptFunParams().")) as uploaded_by,t4.is_mandatory, t2.document_type_id,t3.name as document_type, t4.name as document_requirement, case when (select count(id) from tra_application_uploadeddocuments q where q.parent_id = t1.id) = 0 then true else false end leaf"))
                    ->where('t1.parent_id', $parent_id);

               if(validateIsNumeric($is_original_dossier)){
                     $qry->where('t3.is_assessment_doc', '!=', 1);
                   }
            }else{
                 $qry = DB::table('tra_application_documents as t1')
                        ->join('tra_documentupload_requirements as t2', 't1.document_requirement_id', 't2.id')
                        ->join('par_document_types as t3', 't2.document_type_id', 't3.id')
                        ->leftJoin('tra_application_uploadeddocuments as t4', function ($join) use ($application_code,$isvalidate_uploaded_by,$uploaded_by) {

                                $join->on("t1.id", "=", "t4.application_document_id")
                                 ->whereRaw("CASE WHEN $isvalidate_uploaded_by =1  THEN t1.uploaded_by = $uploaded_by ELSE 1 = 1 END");

                        })
                        ->leftJoin('users as t5', 't1.uploaded_by', '=', 't5.id')
                        ->select(DB::raw("t1.*, t1.id as application_document_id, t4.remarks,
                        t4.node_ref,t4.initial_file_name,t4.file_name,t2.module_id,t2.sub_module_id,t2.section_id,t4.file_type,t1.uploaded_on,CONCAT(decryptval(t5.first_name,".getDecryptFunParams()."),' ',decryptval(t5.last_name,".getDecryptFunParams().")) as uploaded_by,t2.is_mandatory,
                         t2.document_type_id,t3.name as document_type, t2.name as document_requirement, t4.id, case when (select count(id) from tra_application_uploadeddocuments q where q.parent_id = t4.id) = 0 then true else false end leaf"))
                        //->where('t1.application_code', $application_code)
                        ->where('t4.parent_id', 0);

                if(validateIsNumeric($documentreg_serialno)){
                     $qry->where('t1.documentreg_serialno', $documentreg_serialno);
                }else{
                    $qry->where('t1.application_code', $application_code);
                }

                if(validateIsNumeric($is_original_dossier)){
                     $qry->where('t3.is_assessment_doc', '!=', 1);
                   }
                 if(validateIsNumeric($doc_type_id)){
                     $qry->where('t2.document_type_id',$doc_type_id);
                   }
            }

            $results = $qry->get();

            $res = array(
                'success' => true,
                'results' => $results,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $results = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $results = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($results);
    }
    public function onLoadProductImagesUploads(Request $req)
    {
        $product_id = $req->input('product_id');
        try {
            $data = array();
            If(isset($product_id) && validateIsNumeric($product_id)){

            $products_details = getTableData('tra_product_applications',array('product_id'=>$product_id));
              $sub_module_id = $products_details->sub_module_id;
            $section_id = $products_details->section_id;
            $document_type_id = $req->input('document_type_id');
            $upload_url =  Config('constants.dms.system_uploadurl'); //get applicable document requirements

                $qry = DB::table('par_document_types as t1')
                ->join('tra_documentupload_requirements as t2','t1.id','=','t2.document_type_id')
                ->select(DB::raw("t4.remarks, t1.id as document_type_id, t4.product_id, t2.id as document_requirement_id,
                 t1.name as document_type,t2.name as document_requirement, t4.id,t4.initial_file_name,t4.file_name,t4.document_folder,thumbnail_folder,
                t4.filetype,t4.uploaded_on,CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by"))
                ->leftJoin('tra_uploadedproduct_images as t4', function ($join) use ($product_id) {
                        $join->on("t2.id", "=", "t4.document_requirement_id")
                                 ->where("t4.product_id", "=", $product_id);
                })
                ->leftJoin('users as t5', 't4.uploaded_by', '=', 't5.id')
                ->where(array('t1.id'=>$document_type_id,'sub_module_id'=>$sub_module_id,'section_id'=>$section_id));

            $results = $qry->get();

            foreach($results  as $res){

                $data[] = array('remarks'=>$res->remarks,
                        'document_type_id'=>$res->document_type_id,
                        'product_id'=>$res->product_id,
                        'document_type'=>$res->document_type,
                        'document_requirement_id'=>$res->document_requirement_id,
                        'document_requirement'=>$res->document_requirement,
                        'id'=>$res->id,
                        'initial_file_name'=>$res->initial_file_name,
                        'file_name'=>$res->file_name,
                        'filetype'=>$res->filetype,
                        'uploaded_on'=>$res->uploaded_on,
                        'uploaded_image'=>$upload_url.'/'.$res->document_folder.'/'.$res->thumbnail_folder.'/'.$res->file_name,
                        'originaluploaded_image'=>$upload_url.'/'.$res->document_folder.'/'.$res->file_name,
                        'uploaded_by'=>$res->uploaded_by
                );

                }
            } 
            $res = array(
                'success' => true,
                'results' => $data,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }
    public function onLoadOnlineProductImagesUploads(Request $req){
        $product_id = $req->input('product_id');
        try {
            $data = array();
            $upload_url =  Config('constants.dms.system_uploadurl');
           $qry = DB::table('par_document_types as t1')
                        ->join('tra_documentupload_requirements as t2','t1.id','=','t2.document_type_id')
                        ->select(DB::raw("t4.remarks, t1.id as document_type_id, t4.product_id, t2.id as document_requirement_id,
                         t1.name as document_type,t2.name as document_requirement, t4.id,t4.initial_file_name,t4.file_name,t4.document_folder,thumbnail_folder,
                        t4.filetype,t4.uploaded_on,CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by"))
                        ->join('tra_uploadedproduct_images as t4', function ($join) use ($product_id) {
                                $join->on("t2.id", "=", "t4.document_requirement_id")
                                         ->where("t4.portal_product_id", "=", $product_id);
                        })
                        ->leftJoin('users as t5', 't4.uploaded_by', '=', 't5.id');

                $results = $qry->get();
                foreach($results  as $res){

                                $data[] = array('remarks'=>$res->remarks,
                                        'document_type_id'=>$res->document_type_id,
                                        'product_id'=>$res->product_id,
                                        'document_type'=>$res->document_type,
                                        'document_requirement_id'=>$res->document_requirement_id,
                                        'document_requirement'=>$res->document_requirement,
                                        'id'=>$res->id,
                                        'initial_file_name'=>$res->initial_file_name,
                                        'file_name'=>$res->file_name,
                                        'filetype'=>$res->filetype,
                                        'uploaded_on'=>$res->uploaded_on,
                                        'uploaded_image'=>$upload_url.'/'.$res->document_folder.'/'.$res->thumbnail_folder.'/'.$res->file_name,
                                        'originaluploaded_image'=>$upload_url.'/'.$res->document_folder.'/'.$res->file_name,
                                        'uploaded_by'=>$res->uploaded_by
                                );
                }
            $res = array(
                'success' => true,
                'results' => $data,
                'message' => 'All is well'
            );
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);

    }
    function validateDocumentExtension($extension,$document_requirement_id){
            //get all the file types under the said requiredment

            $records = DB::table('tra_docupload_reqextensions as t1')
                                            ->join('par_document_extensionstypes as t2', 't1.document_extensionstype_id', 't2.id')
                                            ->where(array('documentupload_requirement_id'=>$document_requirement_id, 'extension'=>$extension))
                                            ->first();
            if($records){
                $response = array('is_allowedextension'=>true);
            }
            else{
                $record = DB::select("(select group_concat(concat(`j`.`name`, '.',`j`.`extension`) separator ' ,') as allowed_filetypes FROM tra_docupload_reqextensions t INNER JOIN par_document_extensionstypes j ON t.document_extensionstype_id = j.id WHERE t.documentupload_requirement_id = $document_requirement_id) limit 1");
                $allowed_filetypes = $record[0]->allowed_filetypes;

                if(isset($record[0]) &&  $allowed_filetypes != ''){
                    $response = array('is_allowedextension'=>false,'allowed_filetypes'=>$allowed_filetypes);
                }
                else{
                    $response = array('is_allowedextension'=>false, 'allowed_filetypes'=>'');
                }
            }

            return $response;
    }
    public function uploadMultipleFiles(Request $req, $file=''){
        try{
            //get file and application details
            $user_id = $this->user_id;
            $application_code = $req->application_code;         
            $module_id = $req->module_id;
            $record_id = $req->id;
            $node_ref = '';//$req->node_ref;
            $sub_module_id = $req->sub_module_id;
            $document_type_id = $req->document_type_id;
            if(!validateIsNumeric($document_type_id)){
                $document_type_id = $req->docType_id;
            }
            $document_requirement_id = $req->document_requirement_id;
            $assessment_start_date = $req->assessment_start_date;
            $assessment_end_date = $req->assessment_end_date;
            $assessment_by = $req->assessment_by;
            $query_ref_id = $req->query_ref_id;
            $view_module_id = $req->view_module_id;
            $zipFolderName = '';
            $parent_id = 0;
            if($file == ''){
                $file = $req->file('uploaded_doc');
            }

            DB::beginTransaction();
               $apptable_name = getSingleRecordColValue('modules', array('id' => $module_id), 'table_name');

            $app_record = Db::table($apptable_name)->where('application_code',$application_code)->first();

            if($app_record){
                $section_id = $app_record->section_id;
                $ref_number = $app_record->reference_no;

                $doc_record = Db::table('tra_application_documentsdefination')->where('application_code',$application_code)->first();

                if(!$doc_record){
                    $res = initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number.rand(0,100), $user_id);
                }
            }
            $app_rootnode = getApplicationRootNode($application_code);
            $app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id, $application_code, $document_type_id, $user_id);
            $table_name = 'tra_application_uploadeddocuments';
            $mis_application_id = 0;
            $documentreg_serialno = 0;
            
            //for products add product id
            if(validateIsNumeric($module_id)){
                $app_table = getTableName($module_id);
                $documentreg_serialno = getSingleRecordColValue($app_table, ['application_code'=>$application_code], 'documentreg_serialno');
            }else if(validateIsNumeric($view_module_id)){
                $app_table = getTableName($view_module_id);
                $documentreg_serialno = getSingleRecordColValue($app_table, ['application_code'=>$application_code], 'documentreg_serialno');
            }
            if ($app_rootnode) {
                if ($file) {
                    $origFileName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $docextension_check = $this->validateDocumentExtension($extension,$document_requirement_id);
                    $is_allowedextension = $docextension_check['is_allowedextension'];

                    if(!$is_allowedextension){
                            $allowed_filetypes = $docextension_check['allowed_filetypes'];
                            $res = array('success'=>false, 'message'=>'Upload the allowed file types or contact the authority for further guidelines. Allowed File Types extensions:.'.$allowed_filetypes);

                    }

                    //save application document details
                    $doc_app_details = array(
                        'application_code' => $application_code,
                        'document_requirement_id' => $document_requirement_id,
                        'document_type_id' => $document_type_id,
                        'uploaded_on' => Carbon::now(),
                        'uploaded_by' => $user_id,
                        'query_ref_id' => $query_ref_id,
                        'created_on' => Carbon::now(),
                        'created_by' => $user_id,
                        'assessment_start_date' => $assessment_start_date,
                        'assessment_end_date' => $assessment_end_date,
                        'assessment_by'=>$assessment_by,
                        'documentreg_serialno' => $documentreg_serialno
                    );
                    $where = array('id'=>$record_id);
                    $table_name = 'tra_application_documents';

                    if (recordExists('tra_application_uploadeddocuments', $where)) {
                        //dump revision
                        $prev_file_data = DB::table('tra_application_uploadeddocuments')->where($where)->first();
                        //delete the old copy
                        deleteRecord('tra_application_uploadeddocuments', $where);
                        //insert revision
                        $pre_file = (array)$prev_file_data;
                        //unset uneeded copy data
                        $original_file_id = $pre_file['id'];
                        unset($pre_file['id']);
                        //count total versions
                        $count = DB::table('tra_documents_prevversions')->where('original_file_id', $original_file_id)->count();
                        $version = $count+1;
                        $pre_file['original_file_id'] = $original_file_id;
                        $pre_file['version'] = $version;
                        $pre_file['application_code'] = $application_code;

                        //set parent id for update
                        $parent_id = $pre_file['parent_id'];

                        $rr = insertRecord('tra_documents_prevversions', $pre_file);
                        //dd($rr);
                        $where = array('id'=>$prev_file_data->application_document_id);
                        $res = updateRecord($table_name, $where, $doc_app_details);
                    }else{
                        $res = insertRecord($table_name, $doc_app_details);
                    }

                    if(isset($res['success']) && $res['success']==true){
                        $application_document_id = $res['record_id'];
                    }else{
                        return response($res, 409);
                        exit();
                    }

                    //confirm file type
                    if($extension == 'zip'){
                        //create a deafult folder name
                        $zipFolderName = str_replace(' ','',Carbon::now()->format('Y-m-d H-i-s')).str_random(3);
                        //loop folder zip
                        $res = $this->uploadZipDocuments($file, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref, $zipFolderName);
                    }else{
                        //upload doc
                        $res = $this->uploadDocument($file, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref);
                    }

                }else {
                    $res = array(
                        'success' => false,
                        'message' => 'No document attachement for upload'
                    );
                }
            }else {
                $res = array(
                    'success' => false,
                    'message' => 'DMS Document Type Node not configured, contact the system Admin'
                );

            }
            //delete zip and chunk directory
            if($zipFolderName != ''){
                Storage::deleteDirectory(''.$zipFolderName);
            }

            if($res['success']){
                DB::commit();
            }else{
                DB::rollback();
            }
            //if folder/zip loop
            //save document and add doc table entry
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);

    }
    public function uploadZipDocuments($file, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref, $default_folder){
        try{
            $extension = $file->getClientOriginalExtension();
            $path = $file->getPathname();
            $zipFolderName = str_replace(' ','',Carbon::now()->format('Y-m-d H-i-s').'_zip').str_random(3);
            $fileName = $file->getClientOriginalName();
            $uncompressedpath = Storage::disk('local')->path(''.$default_folder.'/'.$zipFolderName);
            $res = array('success' => true, 'message' => 'default response');
            //public_path() . '/'.$zipFolderName;
            // dd(Storage::disk('local')->path(''.$zipFolderName));

            if($extension == 'zip'){
                $zip = Zip::open($path);
                $zip->extract($uncompressedpath);
                //delete zip
                $zip->close();
                //delete parent
                unlink($file->getPathname());
                //----------------------------------------
                $res = $this->iterateDirectories($uncompressedpath, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref, $default_folder);

            }else{
                $res = array('message'=>'Unsurported compression format please use zip archives', 'success'=>false);
            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return $res;
    }
    public function iterateDirectories($uncompressedpath, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref, $default_folder){
        $user_id = $this->user_id;
        try{
            $result = scandir($uncompressedpath);
            $files = array_diff($result, array('.', '..'));
            if(count($files) > 0){
                foreach($files as $singlefile){
                    if(is_file("$uncompressedpath/$singlefile")){
                        $uploadedFile = $this->pathToUploadedFile("$uncompressedpath/$singlefile");
                        //check if its zip
                        $extension = $uploadedFile->getClientOriginalExtension();
                        if($extension == 'zip'){
                            //create a directory and get parent
                            $folder_rec = array(
                                'parent_id' => $parent_id,
                                'application_document_id' => $application_document_id,
                                'file_name' => $singlefile,
                                'filesize' => 0,
                                'initial_file_name' => $singlefile,
                                'file_type' => 'Directory',
                                'is_directory' => 1,
                                'document_requirement_id' => $document_requirement_id,
                                'node_ref' => '',
                                'created_on' => Carbon::now(),
                                'created_by' => $user_id,
                                'dola' => Carbon::now(),
                                'altered_by' => $user_id
                            );
                            $results = insertRecord('tra_application_uploadeddocuments', $folder_rec);
                            if(!isset($results['record_id'])){
                                DB::rollback();
                                //delete directory
                                Storage::deleteDirectory(''.$default_folder);
                                return $results;
                                exit();
                            }
                            $res = $this->uploadZipDocuments($uploadedFile, $results['record_id'], $application_document_id, $document_requirement_id, $app_rootnode, $node_ref, $default_folder);
                        }else{
                           $res = $this->uploadDocument($uploadedFile, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref);
                           //if upload is false terminate
                           if(!$res['success']){
                                //delete directory
                                Storage::deleteDirectory(''.$default_folder);
                                //return failure
                                echo json_encode($res);
                                exit();

                           }
                       }
                    }
                    else if(is_dir("$uncompressedpath/$singlefile")){
                        //insert entry to uploaded document as a folder
                        $folder_rec = array(
                            'parent_id' => $parent_id,
                            'application_document_id' => $application_document_id,
                            'file_name' => $singlefile,
                            'filesize' => 0,
                            'initial_file_name' => $singlefile,
                            'file_type' => 'Directory',
                            'is_directory' => 1,
                            'document_requirement_id' => $document_requirement_id,
                            'node_ref' => '',
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id,
                            'dola' => Carbon::now(),
                            'altered_by' => $user_id
                        );
                        $results = insertRecord('tra_application_uploadeddocuments', $folder_rec);
                        if(!isset($results['record_id'])){
                            DB::rollback();
                            //delete directory
                            Storage::deleteDirectory(''.$default_folder);
                            //return
                            echo json_encode($results);
                            exit();
                        }
                        // Recursively call the function if directories found
                        $res = $this->iterateDirectories("$uncompressedpath/$singlefile", $results['record_id'], $application_document_id, $document_requirement_id, $app_rootnode, $node_ref, $default_folder);
                    }
                }
                //delete folder
                // rmdir($uncompressedpath);

            }else{
                $res = array('success'=>true, 'message'=>'Successfully uploaded but some folders were empty');
            }

            // if($res['success']){
            //     DB::commit();
            // }else{
            //     DB::rollback();
            //     return response($res, 409);
            //     exit();

            // }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return $res;
    }
    //get file object from path
    public function pathToUploadedFile( $path, $test = true ) {
        $filesystem = new Filesystem;

        $name = $filesystem->name( $path );
        $extension = $filesystem->extension( $path );
        $originalName = $name . '.' . $extension;
        $mimeType = $filesystem->mimeType( $path );
        $error = null;

        return new UploadedFile( $path, $originalName, $mimeType, $error, $test );
    }

    public function uploadDocument($file, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref){
        $origFileName = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $fileSize = $file->getSize();
        $file_path = $file->getPathName();
        $document_rootupload =  Config('constants.dms.doc_rootupload');
        $user_id = $this->user_id;
        $destination = getcwd() . $document_rootupload;
        $savedName = str_random(3) . time() . '.' . $extension;

        //confirm extension if allowed
        $docextension_check = $this->validateDocumentExtension($extension, $document_requirement_id);
        $is_allowedextension = $docextension_check['is_allowedextension'];

        if(!$is_allowedextension){
                $allowed_filetypes = $docextension_check['allowed_filetypes'];
                $res = array('success'=>false, 'message'=>'Uploaded file should only contain the following allowed file formats :.'.$allowed_filetypes);
                DB::rollback();
        }else{
            //$file->move($destination, $savedName);
        $document_path = $destination . $savedName;
        //check if tje dpcument type has been mapped and not autoCreate the folder
        $document_requirement = getParameterItem('tra_documentupload_requirements', $document_requirement_id);

        //get the application root folder

        $uploadfile_name = $document_requirement . str_random(5) . '.' . $extension;
        $destination_node = $app_rootnode->node_ref;
        //upload to dms
        $response = dmsUploadNodeDocument($destination_node, $file_path, $uploadfile_name, $node_ref);

        //check if upload was successfull
        if(!isset($response['nodeRef'])){
            DB::rollback();
            return array('success'=>false, 'message'=>$response);
        }
        //log document details
        $node_ref = $response['nodeRef'];
        $document_data = array(
            'parent_id' => $parent_id,
            'application_document_id' => $application_document_id,
            'document_requirement_id' => $document_requirement_id,
            'file_name' => $uploadfile_name,
            'filesize' => $fileSize,
            'initial_file_name' => $origFileName,
            'file_type' => $extension,
            'is_directory' => 2,
            'node_ref' => $node_ref,
            'created_on' => Carbon::now(),
            'created_by' => $user_id,
            'dola' => Carbon::now(),
            'altered_by' => $user_id
        );
        $res = insertRecord('tra_application_uploadeddocuments', $document_data, $user_id);


        }

        return $res;

    }

    public function uploadApplicationDocumentFile(Request $req, $file='')
    {
        try {
            $user_id = $this->user_id;
            //get the documetn definations
            $application_code = $req->application_code;
            $module_id = $req->module_id;
            $record_id = $req->id;
            $node_ref = $req->node_ref;
            $sub_module_id = $req->sub_module_id;
            $document_type_id = $req->document_type_id;
            $document_requirement_id = $req->document_requirement_id;
            $assessment_start_date = $req->assessment_start_date;
            $assessment_end_date = $req->assessment_end_date;
            $assessment_by = $req->assessment_by;
            $query_ref_id = $req->query_ref_id;
            $view_module_id = $req->view_module_id;

            if($file == ''){
                $file = $req->file('uploaded_doc');
            }


            $app_rootnode = getApplicationRootNode($application_code);
            $app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id, $application_code, $document_type_id, $user_id);
            $table_name = 'tra_application_uploadeddocuments';
            $mis_application_id = 0;
            $documentreg_serialno = 0;
            //for products add product id
            if(validateIsNumeric($module_id)){
                $app_table = getTableName($module_id);
                $documentreg_serialno = getSingleRecordColValue($app_table, ['application_code'=>$application_code], 'documentreg_serialno');
            }else if(validateIsNumeric($view_module_id)){
                $app_table = getTableName($view_module_id);
                $documentreg_serialno = getSingleRecordColValue($app_table, ['application_code'=>$application_code], 'documentreg_serialno');
            }
            if ($app_rootnode) {
                if ($file) {
                    $origFileName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $docextension_check = $this->validateDocumentExtension($extension,$document_requirement_id);
                    $is_allowedextension = $docextension_check['is_allowedextension'];

                    if(!$is_allowedextension){
                            $allowed_filetypes = $docextension_check['allowed_filetypes'];
                            $res = array('success'=>false, 'message'=>'Upload the allowed file types or contact the authority for further guidelines. Allowed File Types extensions:.'.$allowed_filetypes);

                    }
                    else{

                            $fileSize = $file->getSize();
                            $file_path = $file->getPathName();
                            $document_rootupload =  Config('constants.dms.doc_rootupload');

                            $destination = getcwd() . $document_rootupload;
                            $savedName = str_random(3) . time() . '.' . $extension;

                            //$file->move($destination, $savedName);
                            $document_path = $destination . $savedName;
                            //check if tje dpcument type has been mapped and not autoCreate the folder
                            $document_requirement = getParameterItem('tra_documentupload_requirements', $document_requirement_id);

                            //get the application root folder

                            $uploadfile_name = $document_requirement . str_random(5) . '.' . $extension;
                            $destination_node = $app_rootnode->node_ref;

                            if (validateIsNumeric($record_id)) {

                                $response = dmsUploadNodeDocument($destination_node, $file_path, $uploadfile_name, $node_ref);

                                $node_ref = $response['nodeRef'];
                                $document_data = array('application_code' => $application_code,
                                    'document_requirement_id' => $document_requirement_id,
                                    'uploaded_on' => Carbon::now(),
                                    'uploaded_by' => $user_id,
                                    'file_name' => $uploadfile_name,
                                    'initial_file_name' => $origFileName,
                                    'file_type' => $extension,
                                    'node_ref' => $node_ref,
                                    'query_ref_id' => $query_ref_id,
                                    'dola' => Carbon::now(),
                                    'altered_by' => $user_id,
                                    'assessment_start_date' => $assessment_start_date,
                                    'assessment_end_date' => $assessment_end_date,
                                    'assessment_by'=>$assessment_by,
                                    'documentreg_serialno' => $documentreg_serialno
                                );

                                $where = array('id' => $record_id);

                                if (recordExists($table_name, $where)) {

                                    $previous_data = getPreviousRecords('tra_application_uploadeddocuments', $where);
                                    $previous_data = $previous_data['results'];
                                    $res = updateRecord('tra_application_uploadeddocuments', $where, $document_data, $user_id);

                                    $previous_data = $previous_data[0];
                                    $document_upload_id = $previous_data['id'];
                                    unset($previous_data['id']);
                                    $previous_data['document_upload_id'] = $document_upload_id;
                                    $re = insertRecord('tra_documents_prevversions', $previous_data, $user_id);

                                }
                            } else {
                                $response = dmsUploadNodeDocument($destination_node, $file_path, $uploadfile_name, '');

                                $node_ref = $response['nodeRef'];
                                $document_data = array('application_code' => $application_code,
                                    'document_requirement_id' => $document_requirement_id,
                                    'document_type_id' => $document_type_id,
                                    'uploaded_on' => Carbon::now(),
                                    'uploaded_by' => $user_id,
                                    'file_name' => $uploadfile_name,
                                    'initial_file_name' => $origFileName,
                                    'file_type' => $extension,
                                    'node_ref' => $node_ref,
                                    'query_ref_id' => $query_ref_id,
                                    'created_on' => Carbon::now(),
                                    'created_by' => $user_id,
                                    'assessment_start_date' => $assessment_start_date,
                                    'assessment_end_date' => $assessment_end_date,
                                    'assessment_by'=>$assessment_by,
                                    'documentreg_serialno' => $documentreg_serialno
                                );
                                $res = insertRecord('tra_application_uploadeddocuments', $document_data, $user_id);

                                if ($res['success']) {

                                    $res['message'] = 'Document Uploaded Successfully';

                                } else {
                                    $res['message'] = 'Document Upload failed, try again or contact the system admin';

                                }


                            }

                    }

                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'No document attachement for upload'
                    );
                }

            } else {
                $res = array(
                    'success' => false,
                    'message' => 'DMS Document Type Node not configured, contact the system Admin'
                );

            }
            unlink($file->getPathname());

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        // return response()->json($res, 202,
        //     [
        //         'Content-Type' => 'application/json',
        //         'Charset' => 'utf-8'
        //     ], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        // return $res;
        // $res = array('success'=>true,'message'=>'all is well');
        // dd($res);
        return response()->json($res);

    }



    public function uploadunstructureddocumentuploads(Request $req)
    {
        try {

            $user_id = $this->user_id;
            //get the documetn definations
            $reference_record_id = $req->reference_record_id;
            $document_type_id = $req->document_type_id;
            $record_id = $req->id;
            $node_ref = $req->node_ref;
            $table_name = $req->table_name;
            $reference_table_name = $req->reference_table_name;

            $file = $req->file('uploaded_doc');
          //tra_nonstructured_docdefination
            $rootnode_ref = getSingleRecordColValue('tra_nonstructured_docdefination', array('document_type_id'=>$document_type_id), 'node_ref');

            $app_rootnode = getNonStructuredDocApplicationRootNode($rootnode_ref,$reference_record_id,$reference_table_name,$document_type_id,$user_id);

            if ($app_rootnode) {

                if ($req->hasFile('uploaded_doc')) {
                    $origFileName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $fileSize = $file->getSize();
                    $document_rootupload =  Config('constants.dms.doc_rootupload');;

                    $destination = getcwd() . $document_rootupload;
                    $savedName = str_random(3) . time() . '.' . $extension;

                    $file->move($destination, $savedName);

                    $document_path = $destination . $savedName;
                    //check if tje dpcument type has been mapped and not autoCreate the folder
                     $document_type = getParameterItem('par_document_types', $document_type_id, 'pgsql');
                    $uploadfile_name = $document_type . str_random(5) . '.' . $extension;
                    $destination_node = $app_rootnode->node_ref;
                    if (validateIsNumeric($record_id)) {

                        $response = dmsUploadNodeDocument($destination_node, $document_path, $uploadfile_name, $node_ref);

                        $node_ref = $response['nodeRef'];

                        $document_data = array('reference_record_id' => $reference_record_id,
                            'document_type_id' => $document_type_id,
                            'uploaded_on' => Carbon::now(),
                            'uploaded_by' => $user_id,
                            'file_name' => $uploadfile_name,
                            'initial_file_name' => $origFileName,
                            'file_type' => $extension,
                            'node_ref' => $node_ref,
                            'dola' => Carbon::now(),
                            'altered_by' => $user_id
                        );

                        $where = array('id' => $record_id);

                        if (recordExists($table_name, $where)) {

                            $previous_data = getPreviousRecords( $table_name, $where);
                            $previous_data = $previous_data['results'];
                            $res = updateRecord( $table_name, $where, $document_data, $user_id);

                            $previous_data = $previous_data[0];
                            $document_upload_id = $previous_data['id'];

                        }

                    } else {

                        $response = dmsUploadNodeDocument($destination_node, $document_path, $uploadfile_name, '');
                        dd($response);
                        $node_ref = $response['nodeRef'];
                        dd($node_ref);
                         $document_data = array('reference_record_id' => $reference_record_id,
                            'document_type_id' => $document_type_id,
                            'uploaded_on' => Carbon::now(),
                            'uploaded_by' => $user_id,
                            'file_name' => $uploadfile_name,
                            'initial_file_name' => $origFileName,
                            'file_type' => $extension,
                            'node_ref' => $node_ref,
                            'dola' => Carbon::now(),
                            'altered_by' => $user_id,
                        );

                        $res = insertRecord($table_name, $document_data, $user_id);
                        if ($res['success']) {

                            $res['message'] = 'Document Uploaded Successfully';
                        } else {
                            $res['message'] = 'Document Upload failed, try again or contact the system admin';

                        }


                    }

                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'No document attachement for upload'
                    );
                }

            } else {
                $res = array(
                    'success' => false,
                    'message' => 'DMS Document Type Node not configured, contact the system Admin'
                );

            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }

        return response()->json($res);

    }
    public function uploadProductImages(Request $req){
        try {
            $user_id = $this->user_id;
            //get the documetn definations
            $application_code = $req->application_code;
            $module_id = $req->module_id;
            $record_id = $req->id;
            $node_ref = $req->node_ref;
            $sub_module_id = $req->sub_module_id;
            $document_type_id = $req->document_type_id;
            $product_id = $req->product_id;
            $file = $req->file('uploaded_doc');

            $table_name = 'tra_uploadedproduct_images';

                if ($req->hasFile('uploaded_doc')) {
                    $origFileName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $fileSize = $file->getSize();
                    $file = $req->file('uploaded_doc');

                    $origFileName = $file->getClientOriginalName();
                    $extension = $file->getClientOriginalExtension();
                    $fileSize = $file->getSize();
                    //$folder = '\resources\uploads';
                    $document_root = $_SERVER['DOCUMENT_ROOT'];

                    $upload_directory =     $document_root.'/'.Config('constants.dms.system_uploaddirectory');

                    $folder = 'product_images';
                    $thumbnail_folder = 'thumbnails';

                    $destination = $upload_directory.$folder;

                    $savedName = str_random(5) . time() . '.' . $extension;

                    if($file->move($destination, $savedName)){
                            $document_root = $_SERVER['DOCUMENT_ROOT'];

                            //more the thumb nail file
                            $thumb_dest = $upload_directory. $folder.'/'.$thumbnail_folder.'/';

                            $img = Image::make($destination.'/'.$savedName);

                            // resize image to fixed size
                            $img->resize(150, 150);
                            $img->save($thumb_dest.$savedName);

                            $params['initial_file_name'] = $origFileName;
                            $params['file_name'] = $savedName;
                            $params['file_size'] = formatBytes($fileSize);
                            $params['filetype'] = $extension;
                            $params['thumbnail_folder'] = $thumbnail_folder;
                            $params['document_folder'] = $folder;
                            $params['product_id'] = $product_id;
                            $params['created_on'] = Carbon::now();
                            $params['created_by'] = $user_id;

                            $params['uploaded_on'] = Carbon::now();
                            $params['uploaded_by'] = $user_id;

                            $params['document_type_id'] = $document_type_id;
                            $res = insertRecord($table_name, $params, $user_id);

                    }

                    else{
                        $res = array(
                            'success' => false,
                            'message' => 'Product Image Upload Failed'
                        );
                    }
                } else {
                    $res = array(
                        'success' => false,

                        'message' => 'No document attachement for upload'
                    );
                }


        } catch (\Exception $e) {
            $res = array(
                'success' => false,  'message1'=>  $thumb_dest,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }

        return response()->json($res);


    }
    public function getApplicationDocumentDownloadurl(Request $req)
    {   
        try {
            ini_set('memory_limit', '-1');
            $user_id = $this->user_id;
            $application_code = $req->application_code;
            $uploadeddocuments_id = $req->uploadeddocuments_id;
            $node_ref = $req->node_ref;
            $node_ref = $req->node_ref;
            $data= array('user_id'=>$user_id,
                    'application_code'=>$application_code,
                    'uploadeddocuments_id'=>$uploadeddocuments_id,
                    'node_ref'=>$node_ref,
                    'accessed_on'=>Carbon::now());
            
            if($node_ref == ''){
               
                $res = array(
                    'success' => false,
                    'message'=> 'Document Not Uploaded'
                );
            }
            
            else{
                //save the documetn access
                $data['created_on'] = Carbon::now();
                $data['created_by'] = $user_id;
                if(validateIsNumeric($uploadeddocuments_id)){
                    $record = DB::table('tra_application_uploadeddocuments')
                                ->select('*')
                                ->where('id',$uploadeddocuments_id)
                                ->first();
                }
                else{
                    $record = DB::table('tra_application_uploadeddocuments')
                                ->select('*')
                                ->where('node_ref',$node_ref)
                                ->first();
                    
                }
                
                if($record){
                    $initial_file_name = $record->initial_file_name;
                    
                    $res = insertRecord('tra_uploadeddocuments_useraccess', $data, $user_id); 
    
                    $document_versionid = $req->document_versionid;
                    $url = downloadDocumentUrl($node_ref, $document_versionid);
                    
                    
                    set_time_limit(0); 

                    $public_dir=public_path().'/resources/uploads';
                    $file = file_get_contents($url);
                    $filetopath=$public_dir.'/'.$initial_file_name;
                    
                    file_put_contents($filetopath, $file);
                    
                    $res = array(
                        'success' => true,
                        'document_url' => $url
                    );
                    
                    ini_set('memory_limit', '-1');
                    if(file_exists($filetopath)){
                       $file = file_get_contents($filetopath);
                        unlink($filetopath); 
                         $res = array(
                            'success' => true,
                            'message' => 'all is well',
                            'filename' => $initial_file_name,
                            'dms_url'=>$url,
                            'document_url' => "data:application/octet-stream;base64,".base64_encode($file)
                        );
                        return json_encode($res);
                    }
                    
                    /*
                    $res = array(
                            'success' => true,
                            'message' => 'all is well',
                            'filename' => $initial_file_name,
                            'document_url' => $url
                        );*/
                }
                else{
                    $res = array(
                    'success' => false,
                    'message'=> 'Document Not Uploaded'
                );
                    
                }
                

            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
    }
    public function getApplicationDocumentPreviousVersions(Request $req)
    {
        try {
            $table_name = $req->table_name;
            $original_file_id = $req->document_upload_id;
            $document_requirement_id = getSingleRecordColValue('tra_application_uploadeddocuments', ['id'=>$original_file_id], 'document_requirement_id');

            $application_document_id = getSingleRecordColValue('tra_application_uploadeddocuments', ['id'=>$original_file_id], 'application_document_id');

            $application_code = getSingleRecordColValue('tra_application_documents', ['id'=>$application_document_id], 'application_code');

            $doc_data = array();//original_file_id
            $i = 1;
            $doc_data = DB::table('tra_documents_prevversions as t1')
                    ->leftJoin('tra_documentupload_requirements as t2', 't1.document_requirement_id', 't2.id')
                     ->leftJoin('par_document_types as t3', 't2.document_type_id', '=', 't3.id')
                     ->leftJoin('users as t5', 't1.uploaded_by', '=', 't5.id')
                     ->select(DB::raw("t1.remarks,  t1.node_ref,t1.version as version_no, t2.name as document_type, t1.id,t1.initial_file_name,t1.file_name, t1.file_type,t1.uploaded_on,t5.email as uploaded_by ,t2.document_type_id,t3.name as document_type, t2.name as document_requirement"))
                    ->where('t1.application_code', $application_code)
                    ->where('t1.document_requirement_id', $document_requirement_id)
                    ->get();
            // $doc_data = DB::table('tra_documentupload_requirements as t1')
            //     ->leftJoin('par_document_types as t2', 't1.document_type_id', '=', 't2.id')
            //     ->select(DB::raw("t1.remarks,  t4.node_ref, t2.name as document_type, t4.id,t4.initial_file_name,t4.file_name, t4.file_type,t4.uploaded_on,t5.email as uploaded_by ,t1.is_mandatory ,t1.id as document_requirement_id, t1.document_type_id,t2.name as document_type, t1.name as document_requirement"))
            //     ->join('tra_documents_prevversions as t4', function ($join) {
            //         $join->on("orin", "=", "t4.document_requirement_id");
            //     })
            //     ->leftJoin('users as t5', 't4.uploaded_by', '=', 't5.id')
            //     ->where(array('document_upload_id' => $document_upload_id))
            //     ->get();

            $res = array('success' => true, 'results' => $doc_data);

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);

    }
    public function deleteSingleFile($file_id){
        $table_name = 'tra_application_uploadeddocuments';
        $where_file = array('id' => $file_id);
        $records = DB::table('tra_application_uploadeddocuments')
            ->where($where_file)
            ->first();
        $data = array();
        $resp = [];
        if (isset($records->id)) {
            $response = dmsDeleteAppRootNodesChildren($records->node_ref);
            
           
                //check existing other documents on the folder
                $where = array('application_document_id'=> $records->application_document_id);
                $check = DB::table('tra_application_uploadeddocuments')->where($where)->count();
                if($check == 1){
                    //delete folder entry since the entry remains one 
                    $table_name = 'tra_application_uploadeddocuments';
                    
                   // deleteRecord('tra_application_documents', ['id'=>$records->application_document_id]);
                    $previous_data = getPreviousRecords($table_name, $where);
                    $previous_data = $previous_data['results'];
                    DB::table('tra_application_uploadeddocuments_delete')->insert((array)$records);
                    deleteRecord('tra_application_uploadeddocuments', $previous_data, $where, $this->user_id);
                }
                //delete the file
                $previous_data = getPreviousRecords($table_name, $where_file);
                $previous_data = $previous_data['results'];
                $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_file, $this->user_id);
            
        }else{
            $resp = ['message'=> 'Document is missing', 'success'=>false];
        }
        return $resp;
    }
    public function deleteDirectoryFiles($file_id)
    {
        $resp = ['success'=>true, 'message'=>"Directory cleaned successfully"];
        $records = DB::table('tra_application_uploadeddocuments')
                ->where('parent_id', $file_id)
                ->get();
        //delete folder entry
        deleteRecord('tra_application_uploadeddocuments', ['id'=>$file_id]);
        foreach ($records as $rec) {
            if($rec->is_directory == 1){
               $resp = $this->deleteDirectoryFiles($rec->id);
            }else{
               $resp = $this->deleteSingleFile($rec->id);  
            }
        }
        return $resp;
    }
    public function onApplicationDocumentDelete(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $node_ref = $req->node_ref;
            $record_id = $req->record_id;
            $application_document_id = $req->application_document_id;
            $user_id = $this->user_id;
            $table_name = 'tra_application_uploadeddocuments';
            $data = array();
            //get the records
            $resp = false;
            $where_file = array('id' => $record_id);
            $records = DB::table('tra_application_uploadeddocuments')
                ->where($where_file)
                ->first();

            if (isset($records->id) ) {

                if($records->is_directory == 1){
                    $resp = $this->deleteDirectoryFiles($record_id);
                }else{
                    $resp = $this->deleteSingleFile($record_id);
                }
            }
            
           
            $res = array('success' => true, 'message' => 'Document deleted successfully');

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);

    }

    public function onDeleteProductImages(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $node_ref = $req->node_ref;
            $record_id = $req->record_id;
            $user_id = $this->user_id;
            $table_name = 'tra_uploadedproduct_images';
            $data = array();
            //get the records
            $resp = false;
            $where_state = array('id' => $record_id);
            $records = DB::table($table_name)
                ->where($where_state)
                ->get();
            if (count($records) > 0) {

                    $previous_data = getPreviousRecords($table_name, $where_state);
                    $previous_data = $previous_data['results'];
                    $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state, $user_id);

            }
            if ($resp['success']) {
                $res = array('success' => true, 'message' => 'Image deleted successfully');

            } else {
                $res = array('success' => false, 'message' => 'Image delete failed, contact the system admin if this persists');
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);

    }
    public function onDeleteNonStructureApplicationDocument(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $reference_record_id = $req->reference_record_id;
            $table_name = $req->table_name;
            $node_ref = $req->node_ref;
            $record_id = $req->record_id;
            $user_id = $this->user_id;
            $table_name = 'tra_application_uploadeddocuments';
            $data = array();
            //get the records
            $resp = false;
            $where_state = array('reference_record_id' => $reference_record_id, 'id' => $record_id);
            $records = DB::table($table_name)
                ->where($where_state)
                ->get();
            if (count($records) > 0) {

                $response = dmsDeleteAppRootNodesChildren($node_ref);
                if ($response['success']) {
                    $previous_data = getPreviousRecords($table_name, $where_state);
                    $previous_data = $previous_data['results'];
                    $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state, $user_id);

                }
            }
            if ($resp) {
                $res = array('success' => true, 'message' => 'Document deleted successfully');

            } else {
                $res = array('success' => false, 'message' => 'Document delete failed, contact the system admin if this persists');
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);

    }
    public function getDocumentArchive(Request $req)
    {
        try{
            $uploadeddocuments_id = $req->uploadeddocuments_id;
            $uploadeddocuments_id = $req->uploadeddocuments_id;

            //get all documents in the directory
            $directory_items = DB::table('tra_application_uploadeddocuments as t1')
                            ->join('tra_application_documents as t2', 't1.application_document_id', 't2.id')
                            ->select('t1.*','t2.application_code')
                            ->where('parent_id', $uploadeddocuments_id)
                            ->get();
            //check if directory is empty
            if($directory_items->isEmpty()){
                $res = array(
                        'success' => false,
                        'message' => 'The selected directory is empty'
                    );
                return json_encode($res);
            }
            //create a zip instance
            $zip = new ZipArchive;
            $counter = 0;
            $public_dir=Storage::disk('local')->path('downloads');
            //public_path().'/resources/uploads';
            $zipFileName = str_replace(' ','',Carbon::now()->format('Y-m-d H-i-s').'_documents_export.zip');
            //open or create zip for writting
            if ($zip->open($public_dir . '/' . $zipFileName, ZipArchive::CREATE) === TRUE) {
                //get dir items
                foreach ($directory_items as $item) {
                    $this->getFileContent($item, $zip);
                    // if($file['success']){
                    //     $zip->addFromString($file['file_name'], $file['file']);
                    // }
                }
                //close zip to mark completion of writting
                $zip->close();
            }
            //fetch created zip and return
            $filetopath=$public_dir.'/'.$zipFileName;
            if(file_exists($filetopath)){
               $file = file_get_contents($filetopath);
                unlink($filetopath);
                 $res = array(
                    'success' => true,
                    'message' => 'all is well',
                    'filename' => $zipFileName,
                    'document_url' => "data:application/octet-stream;base64,".base64_encode($file)
                );
                return json_encode($res);
            }else{
                $res = array('success' => false, 'message' => 'fetching selected document failed or selected directory was empty');
                 return json_encode($res);
            }
        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return json_encode($res);
        // $selected = $req->selected;
        // $selected_archives = json_decode($selected);
        // $doc_url = array();
        // foreach ($selected_archives as $selected_archive) {
        //     $node_ref = $selected_archive[0];
        //     $application_code = $selected_archive[1];
        //     $uploadeddocuments_id = $selected_archive[2];
        //     $file_name = $selected_archive[3];
        //     $request = new Request([
        //          'node_ref'   => $node_ref,
        //          'application_code'   => $application_code,
        //          'uploadeddocuments_id'   => $uploadeddocuments_id
        //      ]);
        //     $res = $this->getApplicationDocumentDownloadurl($request);
        //     $res = $res->getData();

        //     if($res->success){
        //         $doc_url[] = array('url' =>$res->document_url, 'file_name'=>$file_name);
        //     }
        //    }
        // //document
        // if(!empty($doc_url)){
        //     $zip = new ZipArchive;
        //     $counter = 0;
        //     $public_dir=public_path().'/resources/uploads';
        //     $zipFileName = str_replace(' ','',Carbon::now()->format('Y-m-d H-i-s').'_documents_export.zip');
        //     if ($zip->open($public_dir . '/' . $zipFileName, ZipArchive::CREATE) === TRUE) {
        //         foreach ($doc_url as $doc) {
        //             $file = file_get_contents($doc['url']);
        //             $zip->addFromString($doc['file_name'], $file);
        //             $counter++;
        //         }

        //         $zip->close();
        //     }

        //     $filetopath=$public_dir.'/'.$zipFileName;
        //     if(file_exists($filetopath)){
        //        $file = file_get_contents($filetopath);
        //         unlink($filetopath);
        //          $res = array(
        //             'success' => true,
        //             'message' => 'all is well',
        //             'filename' => $zipFileName,
        //             'document_url' => "data:application/octet-stream;base64,".base64_encode($file)
        //         );
        //         return json_encode($res);
        //     }else{
        //         $res = array('success' => false, 'message' => 'fetching selected document failed');
        //          return json_encode($res);
        //     }

        // }else{
        //     $res = array('success' => false, 'message' => 'fetching all selected document failed');
        //     return json_encode($res);
        // }
    }
    public function uploadLargeFiles(Request $request) {
    $receiver = new FileReceiver('file', $request, HandlerFactory::classFromRequest($request));

    if (!$receiver->isUploaded()) {
        // file not uploaded
    }

    $fileReceived = $receiver->receive(); // receive file
    //get handler class
    $handler = $fileReceived->handler();
    //check if its the first chunk
    $currentChunk = $handler->getCurrentChunk();

    if($currentChunk < 5){
        //check if allowed
        $docextension_check = $this->validateDocumentExtension($fileReceived->getClientOriginalExtension(), $request->document_requirement_id);
        $is_allowedextension = $docextension_check['is_allowedextension'];


        if(!$is_allowedextension){
                $allowed_filetypes = $docextension_check['allowed_filetypes'];
                $res = array('success'=>false, 'message'=>'Upload the allowed file types or contact the authority for further guidelines. Allowed File Types extensions:.'.$allowed_filetypes);
                return response($res, 409);

                exit();

        }


    }

    if ($fileReceived->isFinished()) { // file uploading is complete / all chunks are uploaded
        $file = $fileReceived->getFile(); 

        // get file
        // $extension = $file->getClientOriginalExtension();
        // $fileName = str_replace('.'.$extension, '', $file->getClientOriginalName()); //file name without extenstion
        // $fileName .= '.' . $extension; // a unique file name

        // $disk = Storage::disk('local');
        // $path = $disk->putFileAs('uploaded_files', $file, $fileName);
        // $final_file = Storage::get($path);
        //dd($file);


        //upload to alfresco
        //return $this->uploadApplicationDocumentFile($request, $file);
        return $this->uploadMultipleFiles($request, $file);
        // delete chunked file
        unlink($file->getPathname());
        // return [
        //     'path' => asset('storage/' . $path),
        //     'filename' => $fileName
        // ];
    }

    // otherwise return percentage information
    // $handler = $fileReceived->handler();
    return [
        'done' => $handler->getPercentageDone(),
        'status' => true
    ];
}
public function  getFileContent($item, $zip, $folder='')
{
    //check if directory
    if($item->is_directory == 1){
        //create directory 
        $zip->addEmptyDir($item->initial_file_name);
        //get all files in the dir
        //get all documents in the directory
        $directory_items = DB::table('tra_application_uploadeddocuments as t1')
            ->join('tra_application_documents as t2', 't1.application_document_id', 't2.id')
            ->select('t1.*','t2.application_code')
            ->where('parent_id', $item->id)
            ->get();
        //loop throgh dir
        if($folder != ''){
            $dir = $folder.'/'.$item->initial_file_name;
        }else{
            $dir = $item->initial_file_name;
        }
        foreach ($directory_items as $dir_item) {
           $this->getFileContent($dir_item, $zip, $dir);
        }

    }else{
        $node_ref = $item->node_ref;
        $application_code = $item->application_code;
        $id = $item->id;
        $request = new Request([
             'node_ref'=> $node_ref,
             'application_code'=> $application_code,
             'uploadeddocuments_id'=> $id
         ]);
        $res = $this->getApplicationDocumentDownloadurl($request);
        $res = $res->getData();
        if($res->success){
            $content =  file_get_contents($res->document_url);
            $file = array('success'=>true, 'file' =>$content, 'file_name'=>$item->initial_file_name);
            if($folder != ''){
               $zip->addFromString($folder.'/'.$file['file_name'], $file['file']);
            }
            else{
                $zip->addFromString($file['file_name'], $file['file']);
            }

        }else{
            $file = array('success'=>false, 'message'=>$res->message);
        }
        return $file;
    }
}

public function saveUploadedApplicationPayments(Request $req){
        try{
            $application_code = $req->application_code;
            $trans_date = $req->trans_date;
            $amount_paid = $req->amount_paid;
            $currency_id = $req->currency_id;
            $bank_name = $req->bank_name;
            $payment_mode_id = $req->payment_mode_id;
            $payment_reference = $req->payment_reference;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $payment_slip = $req->payment_slip;
            $document_requirement_id = 348;
            $file = $req->file('uploaded_doc');
            $where_app = array('application_code'=>$application_code);
                            if (!recordExists('tra_application_uploadeddocuments', $where_app)) {
                                //initializeApplicationDMS(7, $module_id, $sub_module_id, $application_code, 'Product Retention'.rand(0,1000), '');
                            }
                            
            if ($req->hasFile('uploaded_doc')) {
                        $document_type_id = getSingleRecordColValue('tra_documentupload_requirements', array('id'=>$document_requirement_id), 'document_type_id');
                        //$app_rootnode = getApplicationRootNode($application_code,$module_id,$sub_module_id);
                                                
                        $trader_email = $req->email_address;
                        $trader_id= $req->trader_id;
                        //$app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id,$application_code,$document_type_id,$trader_email);

                        $table_name = 'tra_application_uploadeddocuments';
                        //mis_db
                        
                        //if($app_rootnode){
                            $origFileName = $file->getClientOriginalName();
                            $extension = $file->getClientOriginalExtension();
                                                $file_path = $file->getPathName();
                                                $extension = $file->getClientOriginalExtension();
                                                $document_rootupload =  Config('constants.dms.doc_rootupload') ;

                                                $destination = getcwd() .$document_rootupload;
                                                $savedName = str_random(3) . time() . '.' . $extension;

                                            //  $file->move($destination, $savedName);
                                                $document_path = $destination.$savedName;
                                                //check if tje dpcument type has been mapped and not autoCreate the folder 
                                                $document_requirement = getParameterItem('tra_documentupload_requirements',$document_requirement_id);
                                            
                                                //get the application root folder 

                                                $uploadfile_name =  $document_requirement.str_random(5).'.'.$extension;
                                                
                                        /*$destination_node = $app_rootnode->node_ref;
                                                $response = dmsUploadNodeDocument($destination_node,$file_path, $uploadfile_name,'');
                                                $node_ref = $response['nodeRef'];
                                                $document_data = array('application_code'=>$application_code,
                                                                    'document_requirement_id'=>$document_requirement_id,
                                                                    'uploaded_on'=>Carbon::now(),
                                                                    'uploaded_by'=>$trader_id,
                                                                    'file_name'=>$uploadfile_name,
                                                                    'initial_file_name'=>$origFileName,
                                                                    'file_type'=>$extension,
                                                                    'node_ref'=>$node_ref,
                                                                    'created_on'=>Carbon::now(),
                                                                    'created_by'=>$trader_id,
                                                                    'dc_module_id'=>$module_id,
                                                                    'dc_sub_module_id'=>$sub_module_id, 
                                                                    'is_synched'=>1
                                                        );
                                                $res = insertRecord('tra_application_uploadeddocuments', $document_data, $trader_id);
                                                */
                                                $document_upload_id = 0;//$res['record_id'];
                                                $payment_data = array('application_code'=>$application_code,
                                                    'trans_date'=>formatDate($trans_date),
                                                    'amount_paid'=>$amount_paid,
                                                    'currency_id'=>$currency_id,
                                                    'bank_name'=>$bank_name,
                                                    'payment_mode_id'=>$payment_mode_id,
                                                    'payment_reference'=>$payment_reference,
                                                    'document_upload_id'=>$document_upload_id
                                                );
                                                
                                                $res = insertRecord('tra_uploadedpayments_details', $payment_data, $trader_id);
                                            
                                                if($res['success']){
                                                        $res['message'] = 'Payments Details Saved successfully';
                                                        $res['appuploaded_document_id'] = $res['record_id'];
                                                }
                                                else{
                                                    $res['message'] = $res;

                                                }
                            
/*
                    }else{
                        $res = array(
                            'success' => false,
                            'message' => 'DMS Document Type Node note configuration, contact the system Admin'
                        );

                    }
                    */
            }
            else{
                $res = array(
                    'success' => false,
                    'message' => 'No Payment Slip attachement.'
                );
            }

        } catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
        }
         return response()->json($res, 200);
    }
}
