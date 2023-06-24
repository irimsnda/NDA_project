<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class DocumentSynchronisation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'documentsynchronisation:synchronisation';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'DMS Documents Synchronisation';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

   
	public function handle(){
			try{
				//get the documetn definations 
				$data = array('name'=>'Test Data');
				DB::connection('mis_db')->table('schedule_test')->insert($data);
				exit();
				$table_name = 'tra_application_uploadeddocuments';
	
				$records = DB::connection('mis_db')->table($table_name)->where('is_sync',0)->get();
				if(count($records) >0){
						foreach($records as $req){
								$record_id = $req->id;
								//to avoid 
								DB::connection('mis_db')
										->table($table_name)
										->where(array('id'=>$record_id))
										->update(array('is_synched'=>1));
								$application_code = $req->application_code;
								$module_id = $req->module_id;
								
								$node_ref = $req->node_ref;
								$sub_module_id = $req->sub_module_id;
								$document_requirement_id = $req->document_requirement_id;
								
								$initial_file_name = $req->initial_file_name;
								$initial_file_name = $req->initial_file_name;
								
								$file_type = $req->file_type;
								$upload_folder = $req->upload_folder;
								$file_namepath = $upload_folder.'/'.$initial_file_name;
								if(file_exists($file_namepath)){

											$document_type_id = getSingleRecordColValue('tra_documentupload_requirements', array('id'=>$document_requirement_id), 'document_type_id','mis_db');
											$app_rootnode = getApplicationRootNode($application_code,$module_id,$sub_module_id);
											
											$app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id,$application_code,$document_type_id,'');
											
											if($app_rootnode){
												if ($req->hasFile('file')) {
																$origFileName = initial_file_name;
																$extension = $file_type;
													
																$document_rootupload =  Config('constants.dms.doc_rootupload') ;
								
																$destination = getcwd() .$document_rootupload;
																$savedName = str_random(3) . time() . '.' . $extension;
													
																$document_requirement = getParameterItem('tra_documentupload_requirements',$document_requirement_id,'mis_db');
															
																//get the application root folder 
								
																$uploadfile_name =  $document_requirement.str_random(5).'.'.$extension;
																$destination_node = $app_rootnode->node_ref;
								
														if(validateIsNumeric($record_id)){
								
															$response = dmsUploadNodeDocument($destination_node,$file_namepath, $uploadfile_name,$node_ref);
															$node_ref = $response['nodeRef'];
															$document_data = array('application_code'=>$application_code,
																				'document_requirement_id'=>$document_requirement_id,
																				'uploaded_on'=>Carbon::now(),
																				'uploaded_by'=>$trader_id,
																				'file_name'=>$uploadfile_name,
																				'initial_file_name'=>$origFileName,
																				'file_type'=>$extension,
																				'fileSize'=>$fileSize,
																				'node_ref'=>$node_ref,
																				'dola'=>Carbon::now(),
																				'altered_by'=>$trader_id,
																				'module_id'=>$module_id,
																				'sub_module_id'=>$sub_module_id,
																				'is_synched'=>1
																	);


																$where = array('id'=>$record_id);
																$previous_data = getPreviousRecords('tra_application_uploadeddocuments', $where,'mis_db');
																
																$resp =updateRecord('tra_application_uploadeddocuments', $previous_data, $where, $document_data, $trader_email,'mis_db');
																
														}
														
												}
												else{
													$res = array(
														'success' => false,
														'message' => 'No document attachement for upload'
													);
												}
												
											}


								}
								else{
									
								}

								

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
			
			
		}
}
