<?php

namespace Modules\Configurations\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Input;
class ConfigurationsController extends Controller
{
	
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        echo "Welcome to MIS PORTAL";
    }
    /**
        Get Navigation Items
    */
    public function getNavigationItems(Request $req){

        $navigation_type_id = $req->navigation_type_id;
        $is_local = $req->is_local;
        
        $navData = array();
        $data = DB::table('wb_navigation_items')
                    ->where(array('navigation_type_id'=>$navigation_type_id, 'is_online'=>1, 'is_disabled'=>0,'level'=>0))
                    ->orderBy('order_no');
                    
        
        $data = $data->get();
                    $res = array($data);
        foreach ($data as $rec) {
            $parent_id = $rec->id;

             $navData[] =$this->returnNavigationItems($rec,$navigation_type_id);
            
                 
        }  
        //loop to get the second level
        return response()->json($navData);
    }
    public function getOrganisationServices(Request $req){
        try {
//concat(t3.name,' ',service_description)
            $upload_url =  Config('constants.dms.system_uploadurl');
            $data = array();
           $module_id = $req->module_id;
                    $sql = DB::connection('mis_db')->table('tra_online_portalservices as t1')
                    ->join('modules as t2', 't1.module_id','=','t2.id')
                    ->leftJoin('sub_modules as t3', 't1.sub_module_id','=','t3.id')
                    ->select(DB::raw("t1.*,t2.description, t2.name as module_name,t2.icons, concat(document_folder,'/',file_name ) as servicedocuments,  t3.name as service_description"))
                    ->where(array('is_online'=>1));
                    
            if(validateIsNumeric($module_id)){
                $sql->where('t1.module_id',$module_id);
                $res = $sql->get();
            }
            else{
                $res = $sql->groupBy('t1.module_id')->get();
            }
               
           

    }catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);

    }
    
    function returnNavigationChilds($navigation_type_id,$parent_id){
        $nav_children = array();
        $data = DB::table('wb_navigation_items')
                    ->where(array('navigation_type_id'=>$navigation_type_id, 'is_online'=>1,'is_disabled'=>0,'parent_id'=>$parent_id))
					->orderBy('order_no')
                    ->get();
                    
                    if(count($data) >0){

                        foreach ($data as $rec) {
                            $parent_id = $rec->id;
                            $child_data= $this->returnNavigationItems($rec,$navigation_type_id); 
                            //get the grandchildren 
                            $grandchildData = $this->returnNavigationChilds($navigation_type_id,$parent_id);
                            if (!empty($grandchildData)) {
                                $child_data['grandchildren'] = $grandchildData;
                            }
                            $nav_children[] = $child_data;
                        }
                    }
                    return $nav_children;
    }
    function returnNavigationItems($rec,$navigation_type_id){
       
        $parent_id = $rec->id;
        $data = array('name'=>$rec->name, 
                    'id'=>$rec->id,
                    'navigation_type_id'=>$rec->navigation_type_id,
                    'router_link'=>$rec->router_link,
                    'iconCls'=>$rec->iconCls,
                    'level'=>$rec->level,
                    'parent_id'=>$rec->parent_id,
                    'is_disabled'=>$rec->is_disabled,
                    'order_no'=>$rec->order_no
                );
                //checking the details 
                $childData = $this->returnNavigationChilds($navigation_type_id,$parent_id);
                
                if (!empty($childData)) {
                    $data['children'] = $childData;
                }
               
                return $data;
    }


    public function getCommonMisParams(Request $req){
        try{ 
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
             $table_name = base64_decode($table_name);
        
            $sectionSelection = $req->sectionSelection;
            unset($requestData['table_name']);
            unset($requestData['sectionSelection']);
			unset($requestData['zone_notin']);
			$zone_notin = $req->zone_notin;
			//check for exempted data or tables from system 
			 $check_exempt = DB::connection('mis_db')->table('tra_exemptedpublic_tables')->where(array('table_name'=>$table_name))->count();
			if($check_exempt>0 || $table_name == null || $table_name == ''){
				 $res = array('success'=> false, 'message'=>'Table has been blocked for access');
				 return response()->json($res);
			 }
            $sql = DB::connection('mis_db')
                    ->table($table_name.' as t1');
					if(isset($requestData['zone_notin'])){
					
					}
             
			  //
        
            if($table_name == 'sub_modules'){
                    //check the current allow services 
                    //filter for sub_module
                    $module_id = $req->module_id;
                    unset($requestData['module_id']);
                    $sql =  $sql->join('tra_online_portalservices as t2', 't1.id', '=', 't2.sub_module_id')->where(array('is_online'=>1,'t1.module_id'=>$module_id));

            }
            if($table_name == 'par_sections'){
                $sql =  $sql->whereNotIn('id',[3,4]);
                if($sectionSelection != ''){
                   // dd($sectionSelection);
                    $sectionsId = explode(',',$sectionSelection);
                    $sql =  $sql->whereIn('id', $sectionsId);
                  
                }
            }
            if($table_name == 'par_classifications'){
                $prodclass_category_id = $req->prodclass_category_id;
                $sql->join('par_prodcat_classifications as t2', 't1.id', '=', 't2.classification_id')->where(array('t2.prodclass_category_id'=>$prodclass_category_id));
            }if($table_name == 'par_eligible_importerscategories'){
                $section_id = $req->section_id;
				
                    unset($requestData['section_id']);
                $sql->join('par_productseligible_importers as t2', 't1.id', '=', 't2.eligible_importerscategory_id')->where(array('t2.section_id'=>$section_id));
            }
			
			//
			if($table_name == 'par_permitsproduct_categories'){
				
                $permit_category_id = $req->permit_category_id;
                $section_id = $req->section_id;
				
				unset($requestData['permit_category_id']);
				unset($requestData['section_id']);
				 
                $sql->where(array('permit_category_id'=>$permit_category_id));
                 $sql =  $sql->whereNotIn('id',[1,2,8,9,15,17,18,19,13]);
                $sql->where(function ($query) use ($section_id) {
					$query->where('section_id', '=', 0)
						  ->orWhere('section_id', '=', $section_id);
				});
				
				
            }
			if($table_name == 'par_permit_category'){
				
                $sub_module_id = $req->sub_module_id;
				
				unset($requestData['sub_module_id']);
				 if($sub_module_id == 81){
					$sql->where('sub_module_id', '=', $sub_module_id);
				 }
				else{
					$sql->where('sub_module_id', '=', 0);
					
				}
                
				
				
            }
			if($table_name == 'par_product_classificationrules'){
				if(!empty( $requestData)){
					$device_type_id = $requestData['device_type_id'];
					 unset($requestData['device_type_id']);
					$sql = $sql->where($requestData)->where(array('t1.device_type_id'=>$device_type_id));
				}
			}
			
            if($table_name == 'wb_formfields_definations'){
                    
                $module_id = $req->module_id;
                unset($requestData['module_id']);
                $sql->join('wb_form_fields as t2', 't1.form_field_id', '=', 't2.id')
                ->join('wb_app_formsdefination as t3', 't1.app_formsdefination_id', '=', 't3.id')
                  ->where(array('t3.module_id'=>$module_id));
				$sql = $sql->where($requestData);
			}
			else if($table_name == 'par_zones'){
				
				 if($zone_notin != ''){
					$zone_notin = explode(',',$zone_notin);  
					$sql->whereNotIn('id',$zone_notin);
				}
				
			}
			else{
				if(!empty( $requestData)){
					$sql = $sql->where($requestData);
				}
			}
            
            if($table_name == 'par_common_names'){
                
                $sql =  $sql->leftJoin('par_atc_codes as t2', 't1.atc_code_id', '=', 't2.id');
                $res = $sql->select('t1.*', 't2.name as atc_code', 't2.description as atc_code_description');
            
            }else  if($table_name == 'par_product_classificationrules'){
                
                $sql =  $sql->leftJoin('par_classification_rules as t2', 't1.class_rule_id', '=', 't2.id');
                $res = $sql->select('t1.*', 't2.name as classification_rule', 't2.description as rule_description');
            
            }else if($table_name == 'wb_formfields_definations'){
                $res = $sql->select('t1.*', 't2.field_name');
                
            }else{
                 
                 $res = $sql->select('t1.*');
            
            }
			
			
            if($table_name == 'sub_modules' || $table_name =='par_traderaccount_types'){

                $res = $sql->where('t1.is_enabled',1)->get();
            }
			else if($table_name == 'par_sections' || $table_name == 'par_business_types'){
				
				  $res = $sql->where('t1.is_enabled',1)->orderBy('order_no')->get();
			}
            else{
	
                $res = $sql->where('t1.is_enabled',1)->orderBy('id','desc')->get();
            }
        }  catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
        
    }
    public function getPortalCommonMisParams(Request $req){
        try{
            $requestData = $req->all();
            $filter = $req->filter;
            $table_name = $req->table_name;
            unset($requestData['table_name']);
            $sql = DB::table($table_name.' as t1');
           
            if(!empty( $requestData)){
                $sql = $sql->where($requestData);
            }
            $res = $sql->select('t1.*')->get();
            
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
    
   public function getonApplicationProcessGuidelines(Request $req){
        try{
            $requestData = $req->all();
            $filter = $req->filter;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $sub_module_ids = explode(',',$req->sub_module_id);
            $sql = DB::connection('mis_db')
                    ->table('par_webappprocess_guidelines as t1')
                    ->select(DB::raw("t1.id as ID, t2.name as module_name, t3.name as application_type, t1.step, t1.guideline, other_details"))
                    ->leftJoin('modules as t2','t1.module_id','=','t2.id')
                    ->leftJoin('sub_modules as t3','t1.sub_module_id','=','t3.id');

            if(validateIsNumeric($module_id)){
                $sql->where(array('t1.module_id' => $module_id));
            } if(validateIsNumeric($sub_module_id)){
                $sql->where(array('t1.sub_module_id' => $sub_module_id));
            }
           
            if(is_array($sub_module_ids)){
                $sql->whereIn('t1.sub_module_id',$sub_module_ids);
               
            }
            $data = $sql->get();
            $res = array(
                'success' => true,
                'data' => $data
            ); 
        } catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
        

    }
	public function sendNotification(){
		
		$resp = sendMailNotification('Hiram Wachira', 'hiramwachira@gmail.com','Application Notification','Nofification');
        
    }
    public function getProhibitedProducts(){
        $data = array();
       // $data[] = array( );
                
        return response()->json($data);
    }
    public function getApplicationProcess(Request $req){
        $section_id = $req->section_id;
        $sub_module_id = $req->sub_module_id;
        //get from MIS
        $data = DB::table('wb_tfdaprocesses')
            ->where(array('section_id'=>$section_id,'sub_module_id'=>$sub_module_id))
            ->get();
        return response()->json($data);
    }
    public function getUniformSectionApplicationProcess(Request $req){
        $status_id = $req->status_id;
        $sub_module_id = $req->sub_module_id;
        $section_id = $req->section_id;
        $prodclass_category_id = $req->prodclass_category_id;
        $appsubmissions_type_id = $req->appsubmissions_type_id;
        

        
        $filter = array('sub_module_id'=>$sub_module_id,'status_id'=>$status_id);
        if(validateIsNumeric($section_id)){
          //  $filter['section_id'] = $section_id;

        }
        if(validateIsNumeric($appsubmissions_type_id)){
            $filter['appsubmissions_type_id'] = $appsubmissions_type_id;
  
          }
        $data = DB::table('wb_tfdaprocesses')
            ->where($filter)
            ->get();

        if(count($data)>0 ){
            $form_fields = getApplicationGeneralFormsFields($req);

            $data['form_fields'] = $form_fields;
            $data['success'] = true;
        }
        else{
            $data = array('success'=>false, 'message'=>'The specified Module Not Mapped');
        }
        return response()->json($data);
    }
  
    public function getSectionUniformApplicationProcesWithValidation(Request $req){
        $status_id = $req->status_id;
        $sub_module_id = $req->sub_module_id;
        $section_id = $req->section_id;
        $prodclass_category_id = $req->prodclass_category_id;
        $reg_iddefination = $req->reg_iddefination;
        $reg_product_id = $req->reg_id;
        $filter = array('sub_module_id'=>$sub_module_id,'status_id'=>$status_id);
        if(validateIsNumeric($section_id)){
           $filter['section_id'] = $section_id;

        }

        if(validateIsNumeric($prodclass_category_id)){
            $filter['prodclass_category_id'] = $prodclass_category_id;

        }
        $submodule_data = getTableData('sub_modules', array('id'=>$sub_module_id),'mis_db');
        $module_id = $submodule_data->module_id;

        $module_data = getTableData('modules', array('id'=>$module_id),'mis_db');
        $process_data = getTableData('wf_tfdaprocesses', array('sub_module_id'=>$sub_module_id,'section_id'=>$section_id),'mis_db');
        $check_if_exists = true;
        $check_if_exists = true;
        if($process_data){
            $process_id = $process_data->id;
            $check_if_exists = $process_data->check_if_exists;
        }
        $anyOngoingApps = checkForOngoingApplications($reg_product_id, $module_data->table_name, $reg_iddefination,$process_id);
        $anyOngoingPortalApps = checkForPortalOngoingApplications($reg_product_id, $module_data->portaltable_name, $reg_iddefination, $process_id);
		
		 if(!$check_if_exists){
                //get from MIS
                $data = DB::table('wb_tfdaprocesses')

                //'status_id'=>$status_id, ->where(array('section_id'=>$section_id,'sub_module_id'=>$sub_module_id))
                ->where($filter)
                ->get();
                if(count($data)>0 ){
                
                $data['success'] = true;
                }
                else{
                $data = array('success'=>false, 'message'=>'The specified Module Not Mapped');
                }

        }
        
       else if(!$anyOngoingApps['exists'] && !$anyOngoingPortalApps['exists'] && $check_if_exists){

                //get from MIS
                $data = DB::table('wb_tfdaprocesses')
                //'status_id'=>$status_id, ->where(array('section_id'=>$section_id,'sub_module_id'=>$sub_module_id))
                ->where($filter)
                ->get();




                if(count($data)>0 ){
                
                $data['success'] = true;
                }
                else{
                $data = array('success'=>false, 'message'=>'The specified Module Not Mapped');
                }

        }
        else{
                $data = array('success'=>false, 'message'=>"There is an application pending approval with reference no ".$anyOngoingApps['ref_no'].' '.$anyOngoingPortalApps['ref_no'].", check on the application dashboard or contact system administrator for clasification.");

        }
      if($module_id === 1){
        $records = (object)array(
                        'module_id'=>$module_id,
                        'prodclass_category_id'=>$prodclass_category_id,
                        'section_id'=>$section_id,
                        'sub_module_id'=>$sub_module_id);

            $data["form_fields"]= getApplicationGeneralFormsFields($records);


        
      }

        return response()->json($data);
    }
    
    public function getContactdetails(Request $req){
        
        $data = array();
        $records = DB::table('wb_contact_details')
                ->get();
                $rec_data = array();
                foreach ($records as $rec) {
                        $rec_data[] = array('id'=>$rec->id,
                                        'telephone_no'=>$rec->telephone_no,
                                    'email_address'=>$rec->email_address,
                                'section_name'=>getParameterItem('par_sections',$rec->section_id,'mis_db')
                            );

                }
        $data['data']= $rec_data;
        if(count($data)>0){
            
            $data['success'] = true;
        }
        else{
            $data = array('success'=>false, 'message'=>'The specified Module Not Mapped');
        }
        return response()->json($data);
    }
    public function getAppSubmissionGuidelines(Request $req){
        
            $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;
           // ->where(array('sub_module_id'=>$sub_module_id,'section_id'=>$section_id))
            $data = DB::table('wb_appsubmission_termscondition')
            ->orderBy('order_no')
            ->get();  

        $res = array('data'=>$data,'success'=>true);

        return response()->json($res);
    }
    public function uploadDMSDocument(Request $req){
    
        $file = $req->file('file');
        $origFileName = $file->getClientOriginalName();
     
        if ($req->hasFile('file')) {

                $origFileName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileSize = $file->getClientSize();

                $origFileName = $file->getClientOriginalName();
                $extension = $file->getClientOriginalExtension();
                $fileSize = $file->getClientSize();
                
                $destination = getcwd() .'/public/resources/upload/';
                $savedName = str_random(3) . time() . '.' . $extension;

                $file->move($destination, $savedName);
                
                $document_path = $destination.$savedName;

        }
        
        $auth_resp  = authDms('');
        $auth_ticket = $auth_resp['ticket'];
        
        $response =dmsGetAppSiteRoot();
        $site_id = $response['root_site']->shortName;
        $destination_node = 'workspace://SpacesStore/44ff613d-08be-4f7f-b51e-95c3c5185593';
        $response = dmsUploadNodeDocument($auth_ticket,$destination_node,$document_path, $origFileName,'');
        return response()->json($response);

        //$response  = dmsGetAppSiteContainer($site_id,$auth_ticket,'documentLibrary');
       // $response  = dmsGetAppSiteContainerNodes($site_id,$auth_ticket,'documentLibrary');
        $response = dmsGetAppRootNodes($auth_ticket,'dbf9aa2e-7004-4281-a0c2-06ffe1618723K');
        $response = dmsGetAppRootNodesChildren($auth_ticket,'ad7ab3c5-c542-4c35-9f70-91ec088db8f7');

    }
    public function dmsFunctioncall(){
        $auth_resp  = authDms('');

        $auth_ticket = $auth_resp['ticket'];

        $site_details = array('id'=>'tfda-repository12',
                             'description'=>'Syste repository',
                             'title'=>'Syste repository12', 
                             "shortName"=>"DMS Respository repository12",
                             "sitePreset"=>"site-dashboard",
                             'properties'=>'dashboard',
                             'visibility'=>'PUBLIC');
                            
       // $response = dmsCreateAppSiteRoot($auth_ticket,$site_details);
        $response = dmsGetAppSiteRoot();
        return response()->json($response);

        exit();
            
        $response = dmsGetNodePreviousVersions($auth_ticket,'b4cff62a-664d-4d45-9302-98723eac1319');
      //  return response()->json($response);
        $download_path = downloadDocumentUrl($auth_ticket,'38b0e4a7-326e-4fc3-bfc3-97a314026c5d', '1.1');
        print_r($download_path);
         exit();
       
        
       
        $node_details =array('name'=>'My Folder','nodeType'=> "cm:folder");
        
        $download_path = dmsCreateAppRootNodesChildren($auth_ticket,'44ff613d-08be-4f7f-b51e-95c3c5185593',$node_details);
        
        exit();
        //$resp = authDms('');
       /* $email_address = 'hiramwachira11212211212121212@gmail.com';
            $firstName =  'Hiram1122212121122';
            $lastName =  'MM1212121122112212';
            $password =  'admin123112121211112122';
            
        $data = array('email'=>$email_address,
                    'firstName'=>$firstName,
                    'lastName'=>$lastName,
                    "userName"=>$firstName,
                    'groups'=>['GROUP_ALFRESCO_ADMINISTRATORS'],
                    'password'=>$password);
        //
        $response  = authDms('');
        if($response['success']){
            $ticket = $response['ticket'];
            $response = logoutDMS($ticket);
                                $data = array('filedata'  =>  $filedata,
                                            'filename'  => $filename,
                                            'uploaddirectory'=> '',
                                            'contenttype'=> 'cm:content',
                                            'updatenoderef'=> $updatenoderef,
                                            'majorversion'=> true,
                                            'siteid'=> $siteid,
                                            'containerid'=> $containerid);

            
        }*/
        $email_address = 'hiramwachira@gmail.com';
            $firstName =  'Wachira';
            $lastName =  'Hiram';
            $password =  'admin2018';
        $data = array('email'=>$email_address,
                    'firstName'=>$firstName,
                    'lastName'=>$lastName,
                    'groups'=>['GROUP_ALFRESCO_ADMINISTRATORS'],
                    'password'=>$password);

        $auth_resp  = authDms('');
        $auth_ticket = $auth_resp['ticket'];
        
       $response =dmsGetAppSiteRoot();
       $site_id = $response['root_site']->shortName;
       
        //$response  = dmsGetAppSiteContainer($site_id,$auth_ticket,'documentLibrary');
       // $response  = dmsGetAppSiteContainerNodes($site_id,$auth_ticket,'documentLibrary');
        $response = dmsGetAppRootNodes($auth_ticket,'dbf9aa2e-7004-4281-a0c2-06ffe1618723');
        $response = dmsGetAppRootNodesChildren($auth_ticket,'ad7ab3c5-c542-4c35-9f70-91ec088db8f7');

        $node_details =array('name'=>'My Folder','nodeType'=> "cm:folder");
        
         $response =  dmsCreateAppRootNodesChildren($ticket,'44ff613d-08be-4f7f-b51e-95c3c5185593',$node_details);
         return response()->json($response);

        $node_details = array('name'=>"New Document details");
        
       // $response = dmsGetAppRootNodesContents($auth_ticket,'dbf9aa2e-7004-4281-a0c2-06ffe1618723');

        
    }

}
