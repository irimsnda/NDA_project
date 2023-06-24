<?php
namespace Modules\DocumentManagement\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Image;
use Illuminate\Support\Facades\File;
use Dilab\Network\SimpleRequest;
use Dilab\Network\SimpleResponse;
use Dilab\Resumable;

use Pion\Laravel\ChunkUpload\Receiver\FileReceiver;
use Pion\Laravel\ChunkUpload\Handler\HandlerFactory;
class DocumentManagementController extends Controller
{
    public function __construct(){
     
		}
		public function uploadLargeApplicationDocument(Request $req){
			
				$data = $req->all();
				return view('resumableUpload',$data);

		}
		public function resumableuploadApplicationDocumentFile(Request $request) {
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
        $file = $fileReceived->getFile(); // get file
        
        return $this->uploadMultipleFiles($request, $file);
        unlink($file->getPathname());
      
    }
    return [
        'done' => $handler->getPercentageDone(),
        'status' => true
    ];
}
public function uploadMultipleFiles($req, $file=''){
	try{
				//get file and application details
				$user_id = $req->trader_email;
				
				$application_code = $req->application_code;
				$module_id = $req->module_id;
				$record_id = $req->id;
				$node_ref = $req->node_ref;
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
				$zipFolderName = '';
				$is_update = 0;
				if($file == ''){
						$file = $req->file('uploaded_doc');
				}

				DB::beginTransaction();
				$app_rootnode = getApplicationRootNode($application_code,$module_id,$sub_module_id);
										
				$app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id, $application_code, $document_type_id, $user_id);
				$table_name = 'tra_application_uploadeddocuments';
				$mis_application_id = 0;
				$reg_serial = 0;
				//for products add product id
				if(validateIsNumeric($module_id)){
						$app_table =  getSingleRecordColValue('modules', array('id'=>$module_id), 'portaltable_name','mis_db');
						$reg_serial = getSingleRecordColValue($app_table, ['application_code'=>$application_code], 'documentreg_serialno');
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
								$table_name = 'tra_application_uploadeddocuments';

								if (recordExists($table_name, $where, 'mis_db')) {
										//dump revision
										$prev_file_data = DB::connection('mis_db')->table('tra_application_uploadeddocuments')->where($where)->first();
										//delete the old copy hold -- no delete
										//deleteRecord('tra_application_uploadeddocuments', $where, 'mis_db');
										//insert revision
										$pre_file = (array)$prev_file_data;
										//unset uneeded copy data
										$document_upload_id = $pre_file['id'];
										unset($pre_file['id']);

										//count total versions
										$count = DB::table('tra_documents_prevversions')->where('document_upload_id', $document_upload_id)->count();
										$version = $count+1;
										$pre_file['document_upload_id'] = $document_upload_id;
										$pre_file['version'] = $version;
										$pre_file['application_code'] = $application_code;

										insertRecord('tra_documents_prevversions', $pre_file);

										$res = updateRecord('tra_application_documents', $where, $doc_app_details);


								}else{
										$res = insertRecord('tra_application_documents', $doc_app_details);
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
										$res = $this->uploadZipDocuments($file, 0, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref, $zipFolderName);
								}else{
										//upload doc
										$res = $this->uploadIteratedDocument($file, 0, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref);
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
		} catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

		} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
		}
		return response()->json($res);

	}
	public function uploadIteratedDocument($file, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref){
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
		$document_requirement = getParameterItem('tra_documentupload_requirements', $document_requirement_id, 'mis_db');

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
		$res = insertRecord('tra_application_uploadeddocuments', $document_data, $user_id, 'mis_db');


		}

		return $res;

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
											 $res = $this->uploadIteratedDocument($uploadedFile, $parent_id, $application_document_id, $document_requirement_id, $app_rootnode, $node_ref);
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

		function getfile_extension($fileName) {
				$fileName_arr = explode('.', $fileName);
				//count taken (if more than one . exist; files like abc.fff.2013.pdf
				$file_ext_count = count($fileName_arr);
				//minus 1 to make the offset correct
				$cnt = $file_ext_count - 1;
				// the variable will have a value pdf as per the sample file name mentioned above.
				$ext = $fileName_arr[$cnt];
				return $ext;
		}
		//sycnhonise uploaded documents 
	
	public function onApplicationDocumentDelete(Request $req){
		try{
			$application_code = $req->application_code;
			$node_ref = $req->node_ref;
			$record_id = $req->record_id;
			$email_address = $req->traderemail_address;
			$table_name = 'tra_application_uploadeddocuments';

			$data = array();
			//get the records 
			$resp = false;
			$where_state = array('application_code' => $application_code, 'id'=>$record_id);
			$records = DB::connection('mis_db')->table($table_name)
						->where($where_state)
						->first();
			if($records){
					//delete functionality
					//the details 
					$is_synched = $records->is_synched;
					
					if($is_synched == 0){
							//uplik 
							$upload_folder = $records->upload_folder;
							$initial_file_name = $records->initial_file_name;
							
							unlink($upload_folder.'/'.$initial_file_name);
							$previous_data = getPreviousRecords($table_name, $where_state,'mis_db');
							$resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state,  $email_address,'mis_db');
					}
					else{

						$response = dmsDeleteAppRootNodesChildren($node_ref);
						if($response['success']){
							$previous_data = getPreviousRecords($table_name, $where_state,'mis_db');
							$resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state,  $email_address,'mis_db');
						}
					}
				
			}
			if($resp){
				$res = array('success'=>true, 'message'=>'Document deleted successfully');

			}   
			else{
				$res = array('success'=>false, 'message'=>'Document delete failed, contact the system admin if this persists');
			}    
		}
		catch (\Exception $e) {
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
	public function getUnstructuredApplicationDocploads(Request $req){
		try{
			
		
			$document_type_id = $req->document_type_id;
			$table_name = $req->table_name;

			$column_name = $req->column_name;
			$record_id = $req->record_id;
			$document_type_id = $req->document_type_id;

			$doc_data = array();
			$i = 1;
			//get the requirements personnel_id, 'personnel_id','tra_prempersonnel_uploadeddocuments')
					$doc_req = DB::connection('mis_db')->table('tra_nonstructured_docdefination as t1')
						->leftJoin('par_document_types as t2','t1.document_type_id','=','t2.id')
						->select('t1.*','t2.name as document_type')
						->where(array('document_type_id'=>$document_type_id))
						->get();
						
						foreach ($doc_req as $rec) {

								//load the uploaded documents 
								$document_requirement_id = $rec->id;
								$document_type_id = $rec->document_type_id;
								$document_type = $rec->document_type;
								$is_mandatory = $rec->is_mandatory;
								if($is_mandatory == 1){
									$is_mandatory = 'Mandatory';
								}
								else{
									$is_mandatory = 'Not Mandatory';
								}
								 // wb_uploaded_documents

								 $document_records = DB::connection('mis_db')->table($table_name)
										->where(array($column_name=>$record_id))
										->get();
								if(count($document_records) >0) {

									foreach ($document_records as $doc_rec) {

										 $doc_data[] = array('document_type'=>$document_type,
															'uploaded_on'=>$doc_rec->uploaded_on,
															'uploaded_by'=>$doc_rec->uploaded_by,
															'initial_file_name'=>$doc_rec->initial_file_name,
															'file_name'=>$doc_rec->file_name,
															'file_type'=>$doc_rec->file_type,
															'id'=>$doc_rec->id,
															'sn'=>$i,
															'is_mandatory'=>$is_mandatory,
															'node_ref'=>$doc_rec->node_ref
										);
		
									}
								}
								else{

									$doc_data[] = array('document_type'=>$document_type,
														'uploaded_on'=>'',
														'uploaded_by'=>'',
														'id'=>$rec->id,
														'sn'=>$i,
														'is_mandatory'=>$is_mandatory,
														'initial_file_name'=>'',
														'file_type'=>'',
														'dms_node_id'=>'',
														'version_no'=>'',
											 );
								}
		$i++;
						}
					 
					$res = array('success'=>true, 'data'=>$doc_data);
		}
		catch (\Exception $e) {
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
	public function getProcessApplicationDocploads(Request $req){
		$application_code = $req->input('application_code');
		$workflow_stage = $req->input('workflow_stage');
		$doc_type_id = $req->input('document_type_id');
		$portal_uploads = $req->input('portal_uploads');
		$portal_status_id = $req->input('portal_status_id');
		$section_id = $req->input('section_id');
		$module_id = $req->input('module_id');
		$sub_module_id = $req->input('sub_module_id');
		$prodclass_category_id = $req->input('prodclass_category_id');

		try {
				$where = array(
						'sub_module_id' => $sub_module_id,
						'section_id' => $section_id
				);
				$process_id = getSingleRecordColValue('wf_tfdaprocesses', $where, 'id', 'mis_db');
				//get applicable document types
				$qry1 = DB::connection('mis_db')->table('tra_proc_applicable_doctypes')
						->select('doctype_id');
				if (isset($process_id) && $process_id != '') {
						$qry1->where('process_id', $process_id);
				}
				if (isset($workflow_stage) && $workflow_stage != '') {
						$qry1->where('stage_id', $workflow_stage);
				}
				if (validateIsNumeric($doc_type_id)) {
						$qry1->where('doctype_id', $doc_type_id);
				}
				$docTypes = $qry1->get();
				$docTypes = convertStdClassObjToArray($docTypes);
				$docTypes = convertAssArrayToSimpleArray($docTypes, 'doctype_id');
			//	print_r($docTypes);
				//get applicable document requirements
				$qry = DB::connection('mis_db')->table('tra_documentupload_requirements as t1')
						->join('par_document_types as t2', 't1.document_type_id', '=', 't2.id')
						->select(DB::raw("t4.remarks, t1.id as document_requirement_id, t4.application_code,
						t4.node_ref, t2.name as document_type, t4.id,t4.initial_file_name,t4.file_name, t1.module_id,t1.sub_module_id,t1.section_id,
						t4.file_type,t4.uploaded_on,CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by,t1.is_mandatory,
						t1.id as document_requirement_id, t1.document_type_id,t2.name as document_type, t1.name as document_requirement"))
						->leftJoin('tra_application_uploadeddocuments as t4', function ($join) use ($application_code) {
								$join->on("t1.id", "=", "t4.document_requirement_id")
										 ->where("t4.application_code", "=", $application_code);
						})
						->leftJoin('users as t5', 't4.uploaded_by', '=', 't5.id')
						->where($where);
						if (validateIsNumeric($prodclass_category_id)) {
								$qry->where('t1.prodclass_category_id', $prodclass_category_id);
						}
						if (validateIsNumeric($doc_type_id)) {
								$qry->where('t1.document_type_id', $doc_type_id);
						} //else if(count($docTypes) > 0) {
								$qry->whereIn('t1.document_type_id', $docTypes);;
					 // }
						
				$results = $qry->get();

				$res = array(
						'success' => true,
						'data' => $results,
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
	public function getUploadedApplicationDoc(Request $req){
		try{
			$premise_id = $req->premise_id;
			$application_code = $req->application_code;
			$section_id = $req->section_id;
			$sub_module_id = $req->sub_module_id;
		
			$document_type_id = $req->document_type_id;
			$query_ref_id = $req->query_ref_id;
			$prodclass_category_id = $req->prodclass_category_id;
			
			$portalapp_variationsdata_id = $req->portalapp_variationsdata_id;
			$status_id = $req->status_id;

			$document_typedata = getApplicationApplicableDocuments(	$section_id,$sub_module_id,	$status_id);
			
			$where_doctype = array();
			if(validateIsNumeric($document_type_id)){
				$where_doctype = array('document_type_id'=>$document_type_id);
				
			}
			$where_prodclass = array();
			if(validateIsNumeric($prodclass_category_id)){
				$where_prodclass = array('prodclass_category_id'=>$prodclass_category_id);
				
			}
			$where_variationdoc = array();
			if(validateIsNumeric($portalapp_variationsdata_id)){
				$where_variationdoc = array('portalapp_variationsdata_id'=>$portalapp_variationsdata_id);
				
			}
			$sections_id = explode(',',$section_id);

			$doc_data = array();
			$i = 1;
			//get the requirements 
					$doc_req = DB::connection('mis_db')->table('tra_documentupload_requirements as t1')
						->leftJoin('par_document_types as t2','t1.document_type_id','=','t2.id')
						->leftJoin('sub_modules as t4','t1.sub_module_id','=','t4.id')
						->leftJoin('modules as t3','t4.module_id','=','t3.id')
						->leftJoin('par_sections as t5','t1.section_id','=','t5.id')
						->select(DB::raw("t1.*,t2.name as document_type, (select group_concat(concat(`j`.`name`, '.',`j`.`extension`) separator ' ,') FROM tra_docupload_reqextensions t INNER JOIN par_document_extensionstypes j ON t.document_extensionstype_id = j.id WHERE t.documentupload_requirement_id = t1.id order by j.extension) as allowed_extensions"))
						->where(array('sub_module_id'=>$sub_module_id))
						->where($where_prodclass)
						->whereIn('document_type_id',$document_typedata)
						->whereIn('section_id',$sections_id);
			
						$doc_req = $doc_req->get();
						foreach ($doc_req as $rec) {

								//load the uploaded documents 
								$document_requirement_id = $rec->id;
								$document_type_id = $rec->document_type_id;
								$document_type = $rec->document_type;
								$document_requirement = $rec->name;
								$is_mandatory = $rec->is_mandatory;
								$allowed_extensions =$rec->allowed_extensions;
								if($is_mandatory == 1){
									$is_mandatory = 'Mandatory';
								}
								else{
									$is_mandatory = 'Not Mandatory';
								}
								 // wb_uploaded_documents
								 $where_queryref = array();
								 if(validateIsNumeric($query_ref_id)){
									$where_queryref = array('query_ref_id'=>$query_ref_id);
									
								}
								 $document_records = DB::connection('mis_db')->table('tra_application_uploadeddocuments')
										->where(array('application_code'=>$application_code, 'document_requirement_id'=>$document_requirement_id))
										->where($where_queryref)
										->where($where_variationdoc)
										->get();
								if(count($document_records) >0) {

									foreach ($document_records as $doc_rec) {

										 $doc_data[] = array('document_type'=>$document_type,
															'document_requirement'=>$document_requirement,
															'document_requirement_id'=>$document_requirement_id,
															'uploaded_on'=>$doc_rec->uploaded_on,
															'uploaded_by'=>$doc_rec->uploaded_by,
															'initial_file_name'=>$doc_rec->initial_file_name,
															'file_name'=>$doc_rec->file_name,
															'file_type'=>$doc_rec->file_type,
															'id'=>$doc_rec->id,
															'sn'=>$i,
															'is_mandatory'=>$is_mandatory,
															'allowed_extensions'=>$allowed_extensions,
															'node_ref'=>$doc_rec->node_ref
										);
		
									}
								}
								
							$i++;
						}
					 
					$res = array('success'=>true, 'data'=>$doc_data);
		}
		catch (\Exception $e) {
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
	public function getApplicationDocploads(Request $req){
	   
				try{
					$premise_id = $req->premise_id;
					$application_code = $req->application_code;
					$section_id = $req->section_id;
					$sub_module_id = $req->sub_module_id;
				$module_id =  getSingleRecordColValue('sub_modules', array('id'=>$sub_module_id), 'module_id','mis_db');
					$document_type_id = $req->document_type_id;
					$query_ref_id = $req->query_ref_id;
					$prodclass_category_id = $req->prodclass_category_id;
					
					$portalapp_variationsdata_id = $req->portalapp_variationsdata_id;
					$status_id = $req->status_id;
				$parent_id = $req->parent_id;

					$document_typedata = getApplicationApplicableDocuments(	$section_id,$sub_module_id,	$status_id);
					
					$where_doctype = array();
					if(validateIsNumeric($document_type_id)){
						$where_doctype = array('document_type_id'=>$document_type_id);
						
					}
					$where_prodclass = array();
					if(validateIsNumeric($prodclass_category_id)){
						$where_prodclass = array('prodclass_category_id'=>$prodclass_category_id);
						
					}
					$where_variationdoc = array();
					if(validateIsNumeric($portalapp_variationsdata_id)){
						$where_variationdoc = array('portalapp_variationsdata_id'=>$portalapp_variationsdata_id);
						
					}
					$documentreg_serialno = $req->documentreg_serialno;
					if(validateIsNumeric($section_id)){
$sections_id = explode(',',$section_id);


					}else{
$sections_id ='';
						$sections_id = '';
					}
					
					$doc_data = array();
					$i = 1;
					//get the requirements 
						if(validateIsNumeric($parent_id)){
								$qry = DB::connection('mis_db')->table('tra_application_uploadeddocuments as t1')
										->leftJoin('tra_application_documents as t2', 't1.application_document_id', 't2.id')
										->leftJoin('tra_documentupload_requirements as t4', 't2.document_requirement_id', 't4.id')
										->leftJoin('par_document_types as t3', 't4.document_type_id', 't3.id')
										->leftJoin('users as t5', 't2.uploaded_by', '=', 't5.id')
										->select(DB::raw("t1.*,t1.file_name as initial_file_name, t2.remarks, t4.module_id, t4.sub_module_id,t4.section_id,t1.file_type, t2.uploaded_on, '' as uploaded_by,t4.is_mandatory, t2.document_type_id,t3.name as document_type, t4.name as document_requirement, case when (select count(id) from tra_application_uploadeddocuments q where q.parent_id = t1.id) = 0 then true else false end leaf"))
										->where('t1.parent_id', $parent_id)
										->where('t4.is_enabled', 1);
								$results = $qry->get();
						}else{

							$doc_req = DB::connection('mis_db')->table('tra_documentupload_requirements as t1')
							->leftJoin('par_document_types as t2','t1.document_type_id','=','t2.id')
							->leftJoin('sub_modules as t4','t1.sub_module_id','=','t4.id')
							->leftJoin('modules as t3','t4.module_id','=','t3.id')
							->leftJoin('par_sections as t5','t1.section_id','=','t5.id')
							->select(DB::raw("t1.*,t2.name as document_type, (select group_concat(concat(`j`.`name`, '.',`j`.`extension`) separator ' ,') FROM tra_docupload_reqextensions t INNER JOIN par_document_extensionstypes j ON t.document_extensionstype_id = j.id WHERE t.documentupload_requirement_id = t1.id order by j.extension) as allowed_extensions"))
							->where(array('sub_module_id'=>$sub_module_id))
							//->where($where_doctype)
							->where($where_prodclass)
							->whereIn('document_type_id',$document_typedata);
							if($module_id != 2){
								if(is_array($sections_id)){
									$doc_req->whereIn('section_id',$sections_id);
											
								}
							}
							
						 
							$doc_req = $doc_req->get();
							foreach ($doc_req as $rec) {

									//load the uploaded documents 
									$document_requirement_id = $rec->id;
									$document_type_id = $rec->document_type_id;
									$document_type = $rec->document_type;
									$document_requirement = $rec->name;
									$is_mandatory = $rec->is_mandatory;
									$allowed_extensions =$rec->allowed_extensions;
									if($is_mandatory == 1){
										$is_mandatory = 'Mandatory';
									}
									else{
										$is_mandatory = 'Not Mandatory';
									}
									// wb_uploaded_documents
									$where_queryref = array();
									if(validateIsNumeric($query_ref_id)){
										$where_queryref = array('query_ref_id'=>$query_ref_id);
										
									}
									$document_records = DB::connection('mis_db')->table('tra_application_uploadeddocuments')
											->where(array('application_code'=>$application_code, 'document_requirement_id'=>$document_requirement_id))
											->where($where_queryref)
											->where($where_variationdoc)
											->get();

										$qry = DB::connection('mis_db')->table('tra_application_documents as t1')
											->join('tra_documentupload_requirements as t2', 't1.document_requirement_id', 't2.id')
											->join('par_document_types as t3', 't2.document_type_id', 't3.id')
											->leftJoin('tra_application_uploadeddocuments as t4', function ($join) use ($application_code, $documentreg_serialno) {
													if(validateIsNumeric($documentreg_serialno)){
															$join->on("t1.id", "=", "t4.application_document_id")
															 ->where("t4.documentreg_serialno", $documentreg_serialno);
													}else{
															$join->on("t1.id", "=", "t4.application_document_id");
													}

											})
											->leftJoin('users as t5', 't1.uploaded_by', '=', 't5.id')
											->select(DB::raw("t1.*,t4.remarks,
											t4.node_ref,t4.initial_file_name,t4.file_name,t4.initial_file_name as file_name, t2.module_id,t2.sub_module_id,t2.section_id,t4.file_type,t1.uploaded_on,'' as uploaded_by,t2.is_mandatory,
											 t2.document_type_id,t3.name as document_type, t2.name as document_requirement, t4.id, case when (select count(id) from tra_application_uploadeddocuments q where q.parent_id = t4.id) = 0 then true else false end leaf"))
											->where(['t1.document_requirement_id'=> $rec->id, 't1.application_code'=>$application_code])
											->where('t4.parent_id', 0);

									$document_records = $qry->get();
								
									if(count($document_records) >0) {

										foreach ($document_records as $doc_rec) {

											$doc_data[] = array('document_type'=>$document_type,
																'document_requirement'=>$document_requirement,
																'document_requirement_id'=>$document_requirement_id,
																'uploaded_on'=>$doc_rec->uploaded_on,
																'uploaded_by'=>$doc_rec->uploaded_by,
																'initial_file_name'=>$doc_rec->initial_file_name,
																'file_name'=>$doc_rec->file_name,
																'file_type'=>$doc_rec->file_type,
																'id'=>$doc_rec->id,
																'sn'=>$i,
																'is_mandatory'=>$is_mandatory,
																'allowed_extensions'=>$allowed_extensions,
																'node_ref'=>$doc_rec->node_ref
											);
			
										}
									}
									else{

										$doc_data[] = array('document_type'=>$document_type,
															'document_requirement'=>$document_requirement,
															'document_requirement_id'=>$document_requirement_id,
															'uploaded_on'=>'',
															'uploaded_by'=>'',
															'id'=>$rec->id,
															'sn'=>$i,
															'is_mandatory'=>$is_mandatory,
															'initial_file_name'=>'',
															'file_type'=>'',
															'dms_node_id'=>'',
															'allowed_extensions'=>$allowed_extensions,
															'version_no'=>'',
												);
									}
								$i++;
							}
						
						$res = array('success'=>true, 'data'=>$doc_data);


						}
									
				}
				catch (\Exception $e) {
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

	public function getDocumentRequirements(Request $req){
	   
		//get the uploaded documents 
		try{
			$application_code = $req->application_code;
			$section_id = $req->section_id;
			$sub_module_id = $req->sub_module_id;
		
			$prodclass_category_id =  $req->prodclass_category_id;
			$document_type_id =  $req->document_type_id;
			$status_id = $req->status_id;
			$where_prodclass = array();
			if(validateIsNumeric($prodclass_category_id)){
				$where_prodclass = array('prodclass_category_id'=>$prodclass_category_id);
				
			}
			if(!validateIsNumeric($status_id)){
				$status_id = 1;
			}
			$document_typedata = getApplicationApplicableDocuments($section_id,$sub_module_id,	$status_id);

			$where_doctype = array();
			$sections_id = explode(',',$section_id);

			if(validateIsNumeric($document_type_id)){
				$where_doctype = array('document_type_id'=>$document_type_id);
				
			}
			$doc_data = array();
			$i = 1;
			//get the requirements 
					$doc_req = DB::connection('mis_db')->table('tra_documentupload_requirements as t1')
						->leftJoin('par_document_types as t2','t1.document_type_id','=','t2.id')
						->leftJoin('sub_modules as t4','t1.sub_module_id','=','t4.id')
						->leftJoin('modules as t3','t4.module_id','=','t3.id')
						->leftJoin('par_sections as t5','t1.section_id','=','t5.id')
						->select('t1.*','t2.name as document_type')
						->where(array('sub_module_id'=>$sub_module_id))
						->where($where_doctype)
						->where($where_prodclass)
						->whereIn('document_type_id',$document_typedata)
						->whereIn('section_id',$sections_id)
						->get();
						
						foreach ($doc_req as $rec) {

								//load the uploaded documents 
								$document_requirement_id = $rec->id;
								$document_type_id = $rec->document_type_id;
								$document_type = $rec->document_type;
								$document_requirement = $rec->name;
								$is_mandatory = $rec->is_mandatory;
								if($is_mandatory == 1){
									$is_mandatory = 'Mandatory';
								}
								else{
									$is_mandatory = 'Not Mandatory';
								}
							   // wb_uploaded_documents

							   $doc_data[] = array('document_type'=>$document_type,
														'document_requirement'=>$document_requirement,
														'document_requirement_id'=>$document_requirement_id,
														'uploaded_on'=>'',
														'uploaded_by'=>'',
														'id'=>$rec->id,
														'sn'=>$i,
														'is_mandatory'=>$is_mandatory,
														'initial_file_name'=>'',
														'file_type'=>'',
														'dms_node_id'=>'',
														'version_no'=>'',
											 );
		$i++;
						}
					 
					$res = array('success'=>true, 'data'=>$doc_data);
		}
		catch (\Exception $e) {
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
	//uploaded Documents 
	public function uploadApplicationDMSDocument(Request $req){
		$res = $this->funcUploadDocumentHelper($req);
		return response()->json($res);

	}
	public function onsaveApplicationVariationsrequests(Request $req){
		try{
			$resp ="";
			$trader_id = $req->trader_id;
			$trader_email = $req->trader_email;
			$study_site_id = $req->study_site_id;
			$application_id = $req->application_id;
			$record_id = $req->id;
			$error_message = 'Error occurred, data not saved successfully';

			$table_name = 'wb_application_variationsdata';

			 $data = array('variation_type_id'=>$req->variation_type_id, 
											'variation_category_id'=>$req->variation_category_id,
											'present_details'=>$req->present_details,
											'proposed_variation'=>$req->proposed_variation,
											'variation_background_information'=>$req->variation_background_information,
											'status_id'=>1,
											'application_code'=>$req->application_code);
				 
			$res = $this->funcUploadDocumentHelper($req);
			if($res['success']){
					$appuploaded_document_id = $res['appuploaded_document_id'];
					$data['appuploaded_document_id'] = $appuploaded_document_id;
					if(validateIsNumeric($record_id)){
						$where = array('id'=>$record_id);
						if (recordExists($table_name, $where)) {
														
								$data['dola'] = Carbon::now();
								$data['altered_by'] = $trader_email;
								$previous_data = getPreviousRecords($table_name, $where);
								$resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);

						}
				}
				else{
						//insert 
						$where = $data;
						$data['created_by'] = $trader_email;
						$data['created_on'] = Carbon::now();
						$data['date_added'] = Carbon::now();
						if (!recordExists($table_name, $where)) {
								$resp = insertRecord($table_name, $data, $trader_email);
								$record_id = $resp['record_id'];           
						}
						else{
								$error_message = "The Variation Request has already been added!!";
								
						}
				} 
				if($resp['success']){
						$res =  array('success'=>true,
						'record_id'=>$record_id,
						'message'=>'Saved Successfully');
	
				}
				else{
						$res =  array('success'=>false,
						'message'=>$error_message);
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
	function validateDocumentExtension($extension,$document_requirement_id){
				//get all the file types under the said requiredment
				$records = DB::connection('mis_db')->table('tra_docupload_reqextensions as t1')
												->join('par_document_extensionstypes as t2', 't1.document_extensionstype_id', 't2.id')
												->where(array('documentupload_requirement_id'=>$document_requirement_id, 'extension'=>$extension))
												->first();
				if($records){
					$response = array('is_allowedextension'=>true);
				}
				else{
						$record = DB::connection('mis_db')->select("(select group_concat(concat(`j`.`name`, '.',`j`.`extension`) separator ' ,') as allowed_filetypes FROM tra_docupload_reqextensions t INNER JOIN par_document_extensionstypes j ON t.document_extensionstype_id = j.id WHERE t.documentupload_requirement_id = $document_requirement_id) limit 1");
					$allowed_filetypes = $record[0]->allowed_filetypes;

					if(isset($record[0]) &&  $allowed_filetypes != ''){
												
							$response = array('is_allowedextension'=>false,'allowed_filetypes'=>$allowed_filetypes);
					}
					else{
							$response = array('is_allowedextension'=>true);
					}
	
				}
				
				return $response;
	}
	public function funcUploadDocumentHelper($req){
		try{
			//get the documetn definations 
			$application_code = $req->application_code;
			$module_id = $req->module_id;
			$record_id = $req->id;
			$node_ref = $req->node_ref;
			$sub_module_id = $req->sub_module_id;
			$portalapp_variationsdata_id = $req->portalapp_variationsdata_id;
			$document_requirement_id = $req->document_requirement_id;
			//check if mutiple files have been submitted
			
			$files = $req->file('files');
			if(isset($files) && is_array($files)){
					foreach($files as $file){

						 $res = $this->funcUploadFile($file,$application_code,$module_id,$record_id,$node_ref,$sub_module_id,$portalapp_variationsdata_id,$document_requirement_id,$req);

					}
			}
			else{
					$file = $req->file('file');
					if ($req->hasFile('file')) {
						$res =  $this->funcUploadFile($file,$application_code,$module_id,$record_id,$node_ref,$sub_module_id,$portalapp_variationsdata_id,$document_requirement_id,$req);
					}
					else{
						$res = array(
							'success' => false,
							'message' => 'No document attachement for upload'
						);
					}

			}
		
				
		}
		catch (\Exception $e) {
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
		
		return $res;
	}
	function funcUploadFile($file,$application_code,$module_id,$record_id,$node_ref,$sub_module_id,$portalapp_variationsdata_id,$document_requirement_id,$req){

						$origFileName = $file->getClientOriginalName();
						$extension = $file->getClientOriginalExtension();
						//validate the extesion 
						$docextension_check = $this->validateDocumentExtension($extension,$document_requirement_id);
						$is_allowedextension = $docextension_check['is_allowedextension'];

						if(!$is_allowedextension){
								$allowed_filetypes = $docextension_check['allowed_filetypes'];
								$res = array('success'=>false, 'message'=>'Upload the allowed file types or contact the authority for further guidelines. Allowed File Types extensions:.'.$allowed_filetypes);

						}
						else{
									
										
										$file_size =		$file->getClientSize();
										$file_size = number_format($file_size / 1048576,2);

										if($file_size > 350){
											return \response()->json(array('success'=>false, 'message'=>'Allowed File size if 100 MB, split the file and upload as multiple documents under the same groud.'));
										}
										
										$document_type_id = getSingleRecordColValue('tra_documentupload_requirements', array('id'=>$document_requirement_id), 'document_type_id','mis_db');
										$app_rootnode = getApplicationRootNode($application_code,$module_id,$sub_module_id);
										
										$trader_email = $req->email_address;
										$trader_id= $req->trader_id;
										
										$app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id,$application_code,$document_type_id,$trader_email);
										$table_name = 'tra_application_uploadeddocuments';

										if($app_rootnode){
																$file_path = $file->getPathName();
																$document_rootupload =  Config('constants.dms.doc_rootupload') ;

																$destination = getcwd() .$document_rootupload;
																$savedName = str_random(3) . time() . '.' . $extension;

															//	$file->move($destination, $savedName);
																$document_path = $destination.$savedName;
																//check if tje dpcument type has been mapped and not autoCreate the folder 
																$document_requirement = getParameterItem('tra_documentupload_requirements',$document_requirement_id,'mis_db');
															
																//get the application root folder 

																$uploadfile_name =  $document_requirement.str_random(5).'.'.$extension;
																$destination_node = $app_rootnode->node_ref;

														if(validateIsNumeric($record_id)){

															$response = dmsUploadNodeDocument($destination_node,$file_path, $uploadfile_name,$node_ref);
															$node_ref = $response['nodeRef'];
															$document_data = array('application_code'=>$application_code,
																				'document_requirement_id'=>$document_requirement_id,
																				'uploaded_on'=>Carbon::now(),
																				'uploaded_by'=>$trader_id,
																				'file_name'=>$uploadfile_name,
																				'initial_file_name'=>$origFileName,
																				'file_type'=>$extension,
																				'fileSize'=>$file_size,
																				'node_ref'=>$node_ref,
																				'dola'=>Carbon::now(),
																				'altered_by'=>$trader_id,
																				'dc_module_id'=>$module_id,
																				'dc_sub_module_id'=>$sub_module_id,
																				'portalapp_variationsdata_id'=>$portalapp_variationsdata_id,
																				'is_synched'=>1
																	);
																$res = insertRecord('tra_application_uploadeddocuments', $document_data, $trader_id,'mis_db');
																$res['appuploaded_document_id'] = $record_id;
																$where = array('id'=>$record_id);
															
																if (recordExists($table_name, $where,'mis_db')) {
																
																	$previous_data = getPreviousRecords('tra_application_uploadeddocuments', $where,'mis_db');
																
																	$resp =updateRecord('tra_application_uploadeddocuments', $previous_data, $where, $document_data, $trader_email,'mis_db');
																	
																	$previous_data = $previous_data['results'][0];
																									$document_upload_id = $previous_data['id'];
																									unset($previous_data['id']);
																									$previous_data['document_upload_id'] = $document_upload_id;
																									insertRecord('tra_documents_prevversions', $previous_data, $trader_id,'mis_db');
																							
																}

														}
														else{

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
																					'dc_sub_module_id'=>$sub_module_id,	'portalapp_variationsdata_id'=>$portalapp_variationsdata_id,
																					'is_synched'=>1
																		);
																$res = insertRecord('tra_application_uploadeddocuments', $document_data, $trader_id,'mis_db');
																		
																if($res['success']){
																		$res['message'] = 'Document Uploaded Successfully';
																		$res['appuploaded_document_id'] = $res['record_id'];
																}
																else{
																	$res['message'] = $res;

																}
											}


									}else{
										$res = array(
											'success' => false,
											'message' => 'DMS Document Type Node note configuration, contact the system Admin'
										);
						
									}
								
						}
						
						
					return $res;

	}
	public function onLoadProductImagesRequirements(Request $req){
		$application_code = $req->application_code;
		$section_id = $req->section_id;
		$sub_module_id = $req->sub_module_id;
	
		$document_type_id =  $req->document_type_id;
		try {
			$data = array();
			$upload_url =  Config('constants.dms.upload_url');
			$qry = DB::connection('mis_db')->table('par_document_types as t1')
					->join('tra_documentupload_requirements as t2','t1.id','=','t2.document_type_id')
					->select(DB::raw("t2.id as document_requirement_id,
					 t1.name as document_type,t2.name as document_requirement"))
					
					->where(array('t1.id'=>$document_type_id,'sub_module_id'=>$sub_module_id,'section_id'=>$section_id));
					
			$data = $qry->get();
		
			$res = array(
					'success' => true,
					'data' => $data,
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
	public function onDeleteProductImages(Request $req)
    {
        try {
            $application_code = $req->application_code;
            $node_ref = $req->node_ref;
            $record_id = $req->record_id;
            $traderemail_address = $req->traderemail_address;
            $table_name = 'tra_uploadedproduct_images';
            $data = array();
            //get the records
            $resp = false;
            $where_state = array('id' => $record_id);
            $records = DB::connection('mis_db')->table($table_name)
                ->where($where_state)
                ->get();
            if (count($records) > 0) {

                    $previous_data = getPreviousRecords($table_name, $where_state,'mis_db');
							
                    $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state, $traderemail_address,'mis_db');

						}
						$res = array('success' => true, 'message' => 'Image deleted successfully');
						
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
	public function onLoadOnlineProductImagesUploads(Request $req){
		$application_code = $req->input('application_code');
		$sub_module_id = $req->sub_module_id;
		$section_id = $req->section_id;
		
		$product_id = '';
		$document_type_id = $req->input('document_type_id');
		try {
			$products_details = getTableData('wb_product_applications',array('application_code'=>$application_code));
			if(!$products_details){
				
				$products_details = getTableData('wb_product_notifications',array('application_code'=>$application_code));
			}
			if($products_details){
				$product_id = $products_details->product_id;
			}
				$data = array();
				$upload_url =  Config('constants.dms.system_uploadurl');
				$qry = DB::connection('mis_db')->table('par_document_types as t1')
						->join('tra_documentupload_requirements as t2','t1.id','=','t2.document_type_id')
						->select(DB::raw("t4.remarks, t1.id as document_type_id, t4.product_id, t2.id as document_requirement_id,
						 t1.name as document_type,t2.name as document_requirement, t4.id,t4.initial_file_name,t4.file_name,t4.document_folder,thumbnail_folder,
						t4.filetype,t4.uploaded_on,CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by"))
						->leftJoin('tra_uploadedproduct_images as t4', function ($join) use ($product_id) {
								$join->on("t2.id", "=", "t4.document_requirement_id")
										 ->where("t4.portal_product_id", "=", $product_id);
						})
						->leftJoin('users as t5', 't4.uploaded_by', '=', 't5.id')
						->where(array('t1.id'=>6,'sub_module_id'=>$sub_module_id,'section_id'=>$section_id));
						
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
						'data' => $data,
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
	public function uploadProductImages(Request $req){
		try {
			$application_code = $req->input('application_code');
			$products_details = getTableData('wb_product_applications',array('application_code'=>$application_code));
			//get the product notification details 
			if(!$products_details){
				
				$products_details = getTableData('wb_product_notifications',array('application_code'=>$application_code));
			}
			$product_id  = $products_details->product_id;
				$traderemail_address = $req->traderemail_address;
				$application_code = $req->application_code;
				$module_id = $req->module_id;
				$record_id = $req->id;
				$node_ref = $req->node_ref;
				$sub_module_id = $req->sub_module_id;
				$document_type_id = $req->document_type_id;
				$document_requirement_id = $req->document_requirement_id;

				$file = $req->file('file');
				
				$table_name = 'tra_uploadedproduct_images';

						if ($req->hasFile('file')) {
								$origFileName = $file->getClientOriginalName();
								$extension = $file->getClientOriginalExtension();
								$fileSize = $file->getClientSize();
								$file = $req->file('file');

								$origFileName = $file->getClientOriginalName();
								$extension = $file->getClientOriginalExtension();
								$fileSize = $file->getClientSize();
								$document_root = $_SERVER['DOCUMENT_ROOT'];

								$upload_directory =   	$document_root.'/'.Config('constants.dms.system_uploaddirectory');

								$folder = 'product_images';
								$thumbnail_folder = 'thumbnails';

								$destination = $upload_directory.'/'. $folder;
						
								$savedName = str_random(5) . time() . '.' . $extension;
								
								if($file->move($destination, $savedName)){
											
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
												$params['portal_product_id'] = $product_id;
												$params['created_on'] = Carbon::now();
												$params['created_by'] = $traderemail_address;

												$params['uploaded_on'] = Carbon::now();
												$params['uploaded_by'] = $traderemail_address;

												$params['document_type_id'] = $document_type_id;
												
												$params['document_requirement_id'] = $document_requirement_id;
												$res = insertRecord($table_name, $params, $traderemail_address,'mis_db'); 

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
	public function uploadApplicationDMSUnstructuredDocument(Request $req){

		try{
			$document_type_id = $req->document_type_id;
			$column_name = $req->column_name;
			$foreignkey_id = $req->foreignkey_id;

			$file = $req->file('file');
			
			$app_rootnode = getNonStructureDocumentRootNode($document_type_id);
			
			$trader_email = $req->email_address;

			$trader_id= $req->trader_id;
			$table_name = $req->table_name;
			$record_id = $req->id;
			
			if($app_rootnode){
				if ($req->hasFile('file')) {
								$origFileName = $file->getClientOriginalName();
								$extension = $file->getClientOriginalExtension();
								$fileSize = $file->getClientSize();
								$document_rootupload =  Config('constants.dms.doc_rootupload') ;

								$destination = getcwd() .$document_rootupload;
								$savedName = str_random(3) . time() . '.' . $extension;

								$file->move($destination, $savedName);
								$document_path = $destination.$savedName;
								//check if tje dpcument type has been mapped and not autoCreate the folder 
								$document_type = getParameterItem('par_document_types',$document_type_id,'mis_db');

								$uploadfile_name =  $document_type.str_random(5).'.'.$extension;
								$destination_node = $app_rootnode->node_ref;

						if(validateIsNumeric($record_id)){

							$response = dmsUploadNodeDocument($destination_node,$document_path, $uploadfile_name,$node_ref);

							$node_ref = $response['nodeRef'];
							$document_data = array($column_name=>$foreignkey_id,
												'document_type_id'=>$document_type_id,
												'uploaded_on'=>Carbon::now(),
												'uploaded_by'=>$trader_id,
												'file_name'=>$uploadfile_name,
												'initial_file_name'=>$origFileName,
												'file_type'=>$extension,
												'node_ref'=>$node_ref,
												'dola'=>Carbon::now(),
												'altered_by'=>$trader_id,
									);
							if($column_name == 'personnel_id'){
									$document_data['personnel_qualification_id'] = $personnel_qualification_id;
							}
								$where = array('id'=>$record_id);
							
								if (recordExists($table_name, $where,'mis_db')) {
								
									$previous_data = getPreviousRecords($table_name, $where);
								
									$resp =updateRecord($table_name, $previous_data, $where, $document_data, $trader_email);
									
									$previous_data = $previous_data['results'][0];
																	$document_upload_id = $previous_data['id'];
																
								}

						}
						else{
							
								
								$response = dmsUploadNodeDocument($destination_node,$document_path, $uploadfile_name,'');

								$node_ref = $response['nodeRef'];
								$document_data = array($column_name=>$foreignkey_id,
													'document_type_id'=>$document_type_id,
													'uploaded_on'=>Carbon::now(),
													'uploaded_by'=>$trader_id,
													'file_name'=>$uploadfile_name,
													'initial_file_name'=>$origFileName,
													'file_type'=>$extension,
													'node_ref'=>$node_ref,
													'created_on'=>Carbon::now(),
													'created_by'=>$trader_id,
										);
								$res = insertRecord($table_name, $document_data, $trader_id,'mis_db');
									
								if($res['success']){

										$res['message'] = 'Document Uploaded Successfully';
								}
								else{
									$res['message'] = 'Document Upload failed, try again or contact the system admin';

								}
				
				
						}
						
				}
				else{
					$res = array(
						'success' => false,
						'message' => 'No document attachement for upload'
					);
				}
				
		}
		else{
			$res = array(
				'success' => false,
				'message' => 'DMS Document Type Node note configuration, contact the system Admin'
			);

		}
		
	}
	catch (\Exception $e) {
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
	public function getApplicationDocumentDownloadurl(Request $req){
		  try{
				
				$node_ref = $req->node_ref;
				$document_id = $req->document_id;
				$table_name = 'tra_application_uploadeddocuments';
				$application_code = $req->application_code;
				$where_state = array('application_code' => $application_code, 'id'=>$document_id);
			$records = DB::connection('mis_db')->table($table_name)
						->where($where_state)
						->first();
			if($records){
					
					$is_synched = $records->is_synched;
					$node_ref = $records->node_ref;

						$url = downloadDocumentUrl($node_ref,'');
						$res = array(
							'success' => true,
							'document_url'=> $url
						);
					
				}
				else{
					$res = array(
						'success' => false,
						'message'=> 'Document Not Uploaded'
					);
				}
				
			}
			catch (\Exception $e) {
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
	public function getApplicationDocumentPreviousVersions(Request $req){
		try{
		  
			  $node_ref = $req->node_ref;
			  $document_version = dmsGetNodePreviousVersions($node_ref);
			  if($document_version['success']){
				$res = array(
					'success' => true,
					'data'=> $document_version['node_versions']
				);
			  }//node_versions
			  else{
				$res = array(
					'success' => true,
					'data'=> array()
				);
			  }
			  
		  }
		  catch (\Exception $e) {
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

	public function onunfitProductsUpload(Request $req){
				try{
					$data = array();
						$res = array();
						$trader_id = $req->trader_id;
						$file = $req->file('file');
						$application_code = $req->application_code;
						if ($req->hasFile('file')) {
								$path = $req->file('file')->getRealPath();
								$data = \Excel::load($path)->get();

								if($data->count()){
										$i = 0;
										foreach ($data as $key => $value) {
												if($i !== 0){
													$arr[] = array('brand_name'=>$value->Brand_Name,
															'common_name'=>$value->Generic_Name,
															'product_strength'=>$value->Product_Strength,
															'dosage_form'=>$value->Dosage_Form,
															'pack_size'=>$value->Pack_Size,
															'quantity'=>$value->Quantity,
															'batch_no'=>$value->Batch_Nos,
															'estimated_value'=>$value->Estimated_Value,
															'reason_for_disposal'=>$value->Reason_for_unfitness,
															'currency_name'=>$value->currency_name,
															'application_code'=>$application_code
														);
												}
											
												$i++;
										}
										if(!empty($arr)){
												$res = insertRecord('wb_disposal_products', $arr, $trader_id,'mis_db');
											
										}else{
											$res = array('success'=>false,'message'=>'No Records Found');
										}
								}
						}
						else{
							$res = array('success'=>false,'message'=>'Upload the Allowed Format or template');

						}
				}
				catch (\Exception $e) {
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

	public function onunInvoiceProductsUpload(Request $req){
		try{
			$data = array();
				$res = array();
				$trader_id = $req->trader_id;
				$file = $req->file('file');
				$application_code = $req->application_code;
				//
				$currency_id = $req->currency_id;

				if ($req->hasFile('file')) {
						$path = $req->file('file')->getRealPath();
						$data = \Excel::load($path)->get();

						if($data->count()){
								$i = 0;
								foreach ($data as $key => $value) {
										if($i !== 0){

											$arr[] = array('brand_name'=>$value->Brand_Name,
													'common_name'=>$value->Generic_Name,
													'product_strength'=>$value->Product_Strength,
													'dosage_form'=>$value->Dosage_Form,
													'pack_size'=>$value->Pack_Size,
													'quantity'=>$value->Quantity,
													'batch_no'=>$value->Batch_Nos,
													'estimated_value'=>$value->Estimated_Value,
													'reason_for_disposal'=>$value->Reason_for_unfitness,
													'currency_name'=>$value->currency_name,
													'application_code'=>$application_code
												);

										}
									
										$i++;
								}
								if(!empty($arr)){
										$res = insertRecord('wb_disposal_products', $arr, $trader_id,'mis_db');
									
								}else{
									$res = array('success'=>false,'message'=>'No Records Found');
								}
						}
				}
				else{
					$res = array('success'=>false,'message'=>'Upload the Allowed Format or template');

				}
		}
		catch (\Exception $e) {
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
}
?>