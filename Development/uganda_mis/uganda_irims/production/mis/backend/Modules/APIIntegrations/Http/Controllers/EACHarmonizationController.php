<?php

namespace Modules\APIIntegrations\Http\Controllers;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;
use Modules\Auth\Http\Controllers\Auth;
use traderAccount;

class EACHarmonizationController extends Controller
{
     
    protected $base_url;
    protected $mis_app_id;
    protected $user_id;
    protected $sign_url;
        protected $sign_file;
        
    public function __construct(Request $req)
    {
        $mis_app_id = env('MIS_APP_CLIENT_ID');
            $this->mis_app_client = DB::table('oauth_clients')->where('id', $mis_app_id)->first();
            $this->base_url = url('/');
            $this->sign_file = getPermitSignatorySignature();
            $this->sign_url = $this->base_url . Config('constants.signs_path') . $this->sign_file;

    }

    //use Auth;
    public function getProductApplicationReferenceCodes($application_details)
    {
            

        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $class_code = getSingleRecordColValue('par_classifications', array('id' => $application_details->classification_id), 'code');
        $apptype_code = getSingleRecordColValue('par_product_types', array('id' => $application_details->product_type_id), 'code');
        $assessment_code = getSingleRecordColValue('par_assessment_procedures', array('id' => $application_details->assessment_procedure_id), 'code');
        $device_typecode = getSingleRecordColValue('par_device_types', array('id' => $application_details->device_type_id), 'code');

        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'class_code' => $class_code,
            'assessment_code' => $assessment_code, 
            'device_typecode'=>$device_typecode
        );  
              
        return $codes_array;
    }


    

    public function getLTRTradersWithLimit(Request $request){
        
        
        $start=$request->input('start');
        $limit=$request->input('limit');
        
        $ltrName=$request->input('ltrName');
        $ltrNumber=$request->input('ltrNumber');
        
        try {
            
                $qry = DB::table('wb_trader_account as t1')
                      ->leftjoin('par_trader_categories as t2', 't1.trader_category_id', '=', 't2.id')
                       ->leftJoin('par_account_statuses as t3', 't1.status_id', '=', 't3.id')
                       ->leftJoin('par_countries as t4', 't1.country_id', '=', 't4.id')
                       ->leftJoin('par_regions as t5', 't1.region_id', '=', 't5.id')
                       ->leftJoin('par_districts as t6', 't1.district_id', '=', 't6.id')
                       ->select(DB::raw("t1.id,t1.identification_no as ltrNumber,t1.name as ltrName,t2.name as ltrCategory,CONCAT_WS(', ',t5.name,t1.physical_address) as ltrLocation,t4.name as Country,t5.name as Region,t6.name as District,t1.postal_address as PostalAddress,t1.physical_address,t3.name as ltrRegistrationStatus,t1.email as ltrEmailAddress,t1.telephone_no as ltrPhoneNumber "))
                ->where('t4.is_local',1);
                
           
                 if(isset($ltrName)){
                    $qry->where('t1.name','LIKE','%'.$ltrName.'%');
                }
                
                if(isset($ltrNumber)){
                    $qry->where('t1.identification_no','LIKE','%'.$ltrNumber.'%');
                }
                $totalCount =  $qry->count();
                
                if(is_numeric($start)&& is_numeric($limit))
                {
                    
                    $start=$start==0?0:$start-1;
                    $qry->offset($start*$limit)->limit($limit);
                }else{
                    
                        return response()->json([
                        'status'=>'FAILURE',
                        'message'=>'Wrong value for Limit or Start'
                    ],400);
                }
                $traders = $qry->get();
                
                return response()->json([
                    'success'=>true,
                    'data'=>$traders,
                    'totalCount'=>$totalCount
                ],200);
                
            }catch(\Exception $exception){
                
                    return response()->json([
                        'status'=>'FAILURE',
                        'message'=>'Server side error  please contact system admin!'
                    ],500);
                
            }catch(\Throwable $throwable){
                     return response()->json([
                        'status'=>'FAILURE',
                        'message'=> $e->getMessage()
                    ],500);
            }
            
    
    }
    //get traders per id
    public function showLTR($id){
        
        //$trader=DB::table('wb_trader_account')->where('id',$id)->first();
        
        try{
            
            $qry = DB::table('wb_trader_account as t1')
                      ->leftjoin('par_trader_categories as t2', 't1.trader_category_id', '=', 't2.id')
                       ->leftJoin('par_account_statuses as t3', 't1.status_id', '=', 't3.id')
                       ->leftJoin('par_countries as t4', 't1.country_id', '=', 't4.id')
                       ->leftJoin('par_regions as t5', 't1.region_id', '=', 't5.id')
                       ->leftJoin('par_districts as t6', 't1.district_id', '=', 't6.id')
                       ->select(DB::raw("t1.id,t1.identification_no as ltrNumber,t1.name as ltrName,t2.name as ltrCategory,CONCAT_WS(', ',t5.name,t1.physical_address) as ltrLocation,t4.name as Country,t5.name as Region,t6.name as District,t1.postal_address as PostalAddress,t1.physical_address,t3.name as ltrRegistrationStatus,t1.email as ltrEmailAddress,t1.telephone_no as ltrPhoneNumber "))
                ->where('t4.is_local',1);
                
        
                $totalCount =  $qry->count();
            
            
            if(is_numeric($id)){
                
                $qry->where('id',$id);
                
            }else{
                
                return response()->json([
                        'status'=>'FAILURE',
                        'message'=>'Wrong id value!'
                    ],400);
            }
            
            
            //$trader=DB::table('wb_trader_account')->find($id);
        
            return response()->json([
                    'success'=>true,
                    'data'=>$trader,
                    'totalCount'=>$totalCount 
                ]);
                
        }catch(\Exception $e){
                
                    return response()->json([
                        'status'=>'FAILURE',
                        'message'=>$exception//'Server side error  please contact system admin!'
                    ],500);
                
            }catch(\Throwable $throwable){
                     return response()->json([
                        'status'=>'FAILURE',
                        'message'=>$throwable// $e->getMessage()
                    ],500);
            }
        
    }
    
     //=========================================
    // End LTR Service 
    //=========================================
    //product applications services
    public function postDrugApplicationDetailsSrv(Request $req){
        DB::beginTransaction();
        try {
            
                $data = array('name'=>'name');
                $req = (object)$req->input();

                $applicationRef =   $req->applicationRef;
            
                $rec = DB::table('eac_product_application')
                                ->where(array('applicationRef'=>$req->applicationRef))
                                ->count();

                    if($rec== 0){
                            //get the datasets 
                            //save the classification details 
                        
                            $class_data = $req->classification;
                            
                            $classification_id = $this->saveApplicationParams($class_data,'par_classifications','eacCode');
                        
                            $atc_data = $req->whoATCCode;//
                            
                            $atc_code_id = $this->saveApplicationParams($atc_data,'par_atc_codes', 'code');
                            
                            $routeadmin_data = $req->routeOfAdmin;//
                        
                            $routeOfAdmin_id = $this->saveApplicationParams($routeadmin_data,'par_route_of_administration', 'eacCode');

                            $dosage_data = $req->dosageForm;//
                        
                            $dosageForm_id = $this->saveApplicationParams($dosage_data,'par_dosage_forms','eacCode');
                        
                            $app_datatype = $req->pharmaceuticalAppType;//
                        
                            $pharmaceuticalAppType_id = $this->saveApplicationParams($app_datatype,'eac_pharmaceuticalapptype','eacCode');
                            
                            $app_drugDistribution = $req->drugDistributionCategories[0];//
                            
                            $drugDistributionCategories_id = $this->saveApplicationParams($app_drugDistribution,'par_distribution_categories','eacCode');
                            
                            $drugSRAStatuses_datatype = $req->drugSRAStatuses[0];//
                        
                            $drugSRAStatuses_id = $this->saveApplicationParams($drugSRAStatuses_datatype,'eac_drugsra_statuses','eacCode');
                        
                            $countriesOfOrigin_dataset = $req->countriesOfOrigin[0];//
                    
                            $countriesOfOrigin_id = $this->saveApplicationParams($countriesOfOrigin_dataset,'par_countries','code');
                            
                            $applicant_id = 0;
                            if(isset($req->applicant)){
                                
                                    $applicant_datsets = $req->applicant;//
                                
                                    $applicant_data = $this->saveApplicantDetails($applicant_datsets,'eac_applicants','name');
                                    $trader_id = $applicant_data['trader_id'];
                                    $applicant_id = $applicant_data['applicant_id'];
                            }   
                        
                            $product_type_id = 2;
                            if($countriesOfOrigin_id  != 36){
                                $product_type_id = 1;
                            }
                            $module_id = 1;
                            $sub_module_id = 7;
                            $section_id = 2;
                            $zone_id = 2;
                            
                            $application_details = (object)array('zone_id'=>2,'section_id'=>2, 
                                                                                        'classification_id'=>$classification_id, 
                                                                                        'product_type_id'=>$product_type_id, 
                                                                                        'assessment_procedure_id'=>2,
                                                                                        'device_type_id'=>'');
                            $codes_array = $this->getProductApplicationReferenceCodes($application_details);
                            
                        
                            $where = array(
                                    'module_id' => $module_id,
                                    'sub_module_id' => $sub_module_id,
                                    'section_id' => $section_id
                            );
                            $process_details = getTableData('wf_tfdaprocesses', $where);
                            
                            $process_id = $process_details->id;
                            $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, $zone_id,'');
                            
                            $tracking_no = $tracking_details['tracking_no'];
                            $application_code = 103;
                            $application_code .=generateApplicationCode($sub_module_id, 'eac_product_application');

                            $local_agent_id = getSingleRecordColValue('wb_trader_account', array('identification_no'=>$req->ltrNumber), 'id', 'portal_db');

                            $product_data = array('applicationRef'=>$req->applicationRef,
                                                                        'applicationDate'=>$req->applicationDate,
                                                                        'ltrNumber'=>$req->ltrNumber,
                                                                        'tradeName'=>$req->tradeName,
                                                                        'physicalDescription'=>$req->physicalDescription,
                                                                        'classification_id'=>$classification_id,
                                                                        'whoATCCode'=>$atc_code_id,
                                                                        'tracking_no'=>$tracking_no,
                                                                        'application_code'=>$application_code,
                                                                        'routeOfAdmin_id'=>$routeOfAdmin_id,
                                                                        'dosageForm_id'=>$dosageForm_id,
                                                                        'pharmaceuticalAppType_id'=>$pharmaceuticalAppType_id,
                                                                        'drugSRAStatuses_id'=>$drugSRAStatuses_id,
                                                                        'indications'=>$req->indications,
                                                                        'drugDistributionCategories_id'=>$drugDistributionCategories_id,
                                                                        'countriesOfOrigin_id'=>$countriesOfOrigin_id,
                                                                        'application_status_id'=>1,
                                                                        'applicant_id'=>$applicant_id,
                                                                        'module_id'=>1,
                                                                        'sub_module_id'=>7,
                                                                        'section_id'=>$section_id,
                                                                        'assessment_procedure_id'=>2,
                                                                        'product_type_id'=>$product_type_id
                                                );
                                                
                            $res = insertRecord('eac_product_application', $product_data, '');

                            $product_infor = array(
                                                                        'classification_id'=>$classification_id,
                                                                        'brand_name'=>$req->tradeName,
                                                                        'physical_description'=>$req->physicalDescription,
                                                                        'dosage_form_id'=>$dosageForm_id,
                                                                        'product_type_id'=>$product_type_id,
                                                                        'distribution_category_id'=>$drugDistributionCategories_id,
                                                                        'route_of_administration_id'=>$routeOfAdmin_id,
                                                                        'section_id'=>2,
                                                                        'contraindication'=>$req->indications,
                                                                    //  'shelf_lifeafter_opening'=>$req->shelf_lifeafter_opening,
                                                                    //  'shelf_life'=>$req->shelf_life,
                                                                    //  'intended_use'=>$req->intended_use,
                                                                        'prodclass_category_id'=>1
                                                                );
                            //then insert in the portal 
                            
                            $res = insertRecord('wb_product_information', $product_infor, '','portal_db');
                            $product_id = $res['record_id'];
                        
                            $app_data = array('trader_id'=>$trader_id,
                                                            'local_agent_id'=>$local_agent_id,
                                                            'application_code'=>$application_code,
                                                            'module_id'=>1,
                                                            'sub_module_id'=>7,
                                                            'section_id'=>2,
                                                            'product_id'=>$product_id,
                                                            'zone_id'=>2,
                                                            'tracking_no'=>$tracking_no,
                                                            'assessment_procedure_id'=>2,
                                                            'is_fast_track'=>2,
                                                            'paying_currency_id'=>4,
                                                            'application_status_id'=>2
                                );
                            $res = insertRecord('wb_product_applications', $app_data, '','portal_db');
                            
                            $eac_prod_app_id = $res['record_id'];
                            $res['tracking_no'] = $tracking_no;
                        
                                //save the other details
                            $genericNames_data = $req->genericNames;
                            $this->savegenericNames_data($genericNames_data,'eac_genericnames',$product_id);
                            
                            $shelfLives_data = $req->shelfLives;
                            $this->saveshelfLives_data($shelfLives_data,'eac_shelflives',$product_id);
                        
                            $storageConditions_data = $req->storageConditions;
                            $this->savestorageConditions_data($storageConditions_data,'eac_storageconditions',$product_id);
                        
                            $packSizes_data = $req->packSizes;
                            
                            $this->savepackSizes_data($packSizes_data,'wb_product_packaging',$product_id);
                        
                            $drugComposition_data = $req->drugComposition;
                        
                            $this->savedrugComposition_data($drugComposition_data,'wb_product_ingredients',$product_id);
                        //  print_r($drugComposition_data);
//exit();
                        //  $drugPackagingMaterials_data = $req->drugPackagingMaterials;
                        //  $this->savedrugPackagingMaterials_data($drugPackagingMaterials_data,'eac_drugpackagingmaterials',$eac_prod_app_id);
                        
                            initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, 499);
                            $drugRegistrationStatus = $req->drugRegistrationStatus;
                            $this->saveeac_drugregistrationstatus($drugRegistrationStatus,'eac_drugregistrationstatus',$product_id);
                            $where = array(
                                    't1.module_id' => 1,
                                    't1.sub_module_id' => 7,
                                    't1.section_id' => 2
                            );

                            $rec = DB::table('wf_tfdaprocesses as t1')
                                                            ->join('wf_workflow_stages as t2', 't1.workflow_id','=','t2.workflow_id')
                                                            ->where($where)
                                                            ->select('t2.id as current_stage','t1.id as process_id')
                                                            ->where('stage_status',1)
                                                            ->first();
                                                            
                 $application_status_id = 1;
                                         
                            $view_id = generateApplicationViewID(); 
                            $applicant_data = getTableData('wb_trader_account', array('id'=>$trader_id),'portal_db');
                        
                            $applicantidentification_no = $applicant_data->identification_no;
                            $applicant  = getTableData('wb_trader_account', array('identification_no'=>$applicantidentification_no));
                            $applicant_id = $applicant->id;
                            $onlinesubmission_data  = array('application_code'=>$application_code,
                                    'tracking_no'=>$tracking_no,
                                    'application_id'=>$eac_prod_app_id,
                                    'prodclass_category_id'=>1,
                                    'view_id'=>$view_id,
                                    'process_id'=>$process_id,
                                    'current_stage'=>$rec->current_stage,
                                    'module_id'=>$module_id,
                                    'sub_module_id'=>$sub_module_id,
                                    'section_id'=>$section_id,
                                    'application_status_id'=>$application_status_id,
                                    'remarks'=>'EAC Integration Submission',
                                    'applicant_id'=>$applicant_id,
                                    'is_notified'=>0,
                                    'is_fast_track'=>1,
                                                                        'status_type_id'=>1,
                                    'date_submitted'=>Carbon::now(),
                                    'created_on'=>Carbon::now(),
                                    'created_by'=>$applicant_id
                                                        );
                                                        
                      $ressub =  insertRecord('tra_onlinesubmissions', $onlinesubmission_data, '');
                
                    }
                    else{

                        $res = array('status'=>'FAILURE', 'message'=>'Product Application has Already been sycned!!');

                    }
                    DB::commit();
                    if($res['success']){
                        
                            $res = array('status'=>'SUCCESS', 
                                                        'message'=>'Product Application Saved successfully');
                                                    
            
                    }
                    else{
                        $res = array('status'=>'FAILURE', 
                        'message'=>$res['message']);
                    
                    }
                    return response()->json($res,200);
                //
            }catch(\Exception $e){
            DB::rollback();
                    return response()->json([
                        'status'=>'FAILURE',
                        'message'=> $e->getMessage()
                    ],500);
                
            }catch(\Throwable $throwable){
            DB::rollback();
                    return response()->json([
                        'status'=>'FAILURE',
                        'message'=>$throwable->getMessage()
                    ],500);
            }
            
    }
    function saveApplicationParams($data,$table_name,$index_name){
        
            $name = $data[$index_name];
        
            $rec = DB::table($table_name)
                        ->where(array($index_name=>$name))
                        ->first();
                    
            if(!$rec){
                //  $data['created_on'] =  Carbon::now();
                $data['created_on'] = Carbon::now();
                if($table_name != 'par_countries'){
                    
                    $data['section_id'] = 2;
                }
                $data['is_enabled'] = 2;
                
                    $res = insertRecord($table_name, $data, '');
                    if($res['success']){

                                $record_id = $res['record_id'];
                    }
                    else{
                            return response()->json($res,500);
                            exit();
                    }
            }else{
            
                    $record_id = $rec->id;
            }
            return $record_id;
    }
    function saveApplicantDetails($data,$table_name){

                    $applicantRef = $data['applicantRef'];

                    $fileAttachments = $data['fileAttachments'];
                    $contactPersons_data = $data['contactPersons'];
                    $data['firstName'] = $contactPersons_data['firstName'];
                    $data['lastName'] = $contactPersons_data['lastName'];
                    $data['middleName'] = $contactPersons_data['middleName'];
                    
                    $countryCode = $data['countryCode'];
                    $countryCode = array('code'=>$countryCode);
                    $country_id = $this->saveApplicationParams($countryCode,'par_countries','code');
                    
                    unset($data['contactPersons']);
                    unset($data['fileAttachments']);
                    unset($data['emailAddresses']);
                    unset($data['phoneNumbers']);
                    unset($data['telephoneNumbers']);

                    $rec = DB::table($table_name)
                                ->where(array('applicantRef'=>$applicantRef))
                                ->first();
                            
                    if(!$rec){
                        
                            $data['created_on'] =  Carbon::now();
                            $res = insertRecord($table_name, $data, '');
            
                            if($res['success']){
                                        //save the details on the portal 
                                        $trader_id = $this->onAccountRegistration($data,$contactPersons_data,$country_id);
                                        $record_id = $res['record_id'];
                            }
                            else{
                                    $res = array('status'=>'FAILURE', 
                                                'message'=>'Applicants details not saved');
                                    
                                    return response()->json($res,500);
                                    exit();
                            }

                    }else{
                        $trader_id = $this->onAccountRegistration($data,$contactPersons_data,$country_id);
                            $record_id = $rec->id;
                    }

                    return array('applicant_id'=>$record_id, 'trader_id'=>$trader_id);

    }

    public function onAccountRegistration($data,$contactPersons_data,$country_id){
                            $trader_data = (object)$data;
                            $contactPersons_data = (object)$contactPersons_data;
                         $tin_no = '';
                         
                        $telephone_no = $contactPersons_data->phoneNumbers;

                         $trader_no = generateTraderNo('wb_trader_account');
                         $trader_name = $contactPersons_data->firstName.' '.$contactPersons_data->middleName.' '.$contactPersons_data->lastName;

                         $data = array('name'=> $trader_name ,
                                 'country_id'=>$country_id,
                                 'region_id'=>'',
                                 'district_id'=>'',
                                 'physical_address'=>$trader_data->physicalAddress,
                                 'postal_address'=>$trader_data->postalAddress,
                                 'telephone_no'=>'0',
                                 'mobile_no'=>'0',
                                 'email'=>$trader_data->emailAddress,
                                 'status_id'=>1,
                                 'identification_no'=>$trader_no
                         );  
                    
                         //check for another
                         $record = DB::connection('portal_db')->table('wb_trader_account')
                         ->where(array('email'=>$trader_data->emailAddress))
                         ->first();
                         if(!$record){
                                $email_address = $trader_data->emailAddress;
                                $resp = insertRecord('wb_trader_account', $data, 'Create Account','portal_db');
                                $password = mt_rand(1000, 99999);
                                $user_passwordData = $password;

                                $uuid = generateUniqID();//unique user ID
                                $user_password = hashPwd($email_address, $uuid, $user_passwordData);
                                $trader_id = $resp['record_id'];
                                
                                $user_data = array('email'=> $email_address,
                                                            'trader_id'=>$trader_id,
                                                            'password'=>$user_password,
                                                            'country_id'=>$country_id,
                                                            'telephone_no'=>0,
                                                            'uuid'=>$uuid,
                                                            'is_verified'=>1,
                                                            'status_id'=>1,//as actve
                                                            'account_roles_id'=>1,
                                                            'created_by'=>'System',
                                                            'identification_no'=>$trader_no,
                                                            'created_on'=>date('Y-m-d H:i:s')
                                                 );
                                 //the details //tin_no
                                 
                                 $resp = insertRecord('wb_traderauthorised_users', $user_data, 499,'portal_db');
                                
                                 $usr_id = $resp['record_id'];
                                 $verification_code = str_random(30);
                                 DB::connection('portal_db')->table('wb_user_verifications')->insert(['user_id'=>$usr_id,'token'=>$verification_code]);
                                 $data['portal_id'] = $trader_id;
                                 //insert in MIS DB $table_name, $table_data,$con
                                 $res = insertRecord('wb_trader_account', $data, '');
                                 
                                 $subject = 'TFDA CUSTOMER SELF SERVICE PORTAL ACCOUNT DETAILS';
                                 
                         $email_content = "We wish to acknowledge receipt of your account application details, we are reviewing the account details for approval process</br>.";
                         $email_content.= "Thank you for registering at TFDA Self Service portal and below are the account registration information</br>.";
                         $email_content .= " - Trader Account No: '".$trader_no ."'.<br/>";
                                                         $email_content .= " - Account Email Address: '".$email_address ."'.<br/>";
                                                         $email_content .= " - Account User Password: '".$user_passwordData ."'.<br/>";

                                                         $email_content.="<p>For more information visit TFDA Web Portal for a full account access guide</p>  ";
                                                         
                                 sendMailNotification($trader_name , $email_address,$subject,$email_content);
                                 
                         }else{
                                            $trader_id = $record->id;
                         }
                        return $trader_id;

 }
    function savegenericNames_data($data,$table_name,$eac_prod_app_id){
        $dataset = array();
                        foreach($data   as $rec){
                            $rec = (object)$rec;
                            
                                $dataset[] = array('name'=>$rec->name,
                                                                    'strength'=>$rec->strength,
                                                                    //'eacCode'=>$rec->eacCode,
                                                                    'eac_prod_app_id'=>$eac_prod_app_id
                                                            );

                        }
                        DB::table($table_name)
                                ->insert($dataset);
                        
    }
    function saveshelfLives_data($data,$table_name,$eac_prod_app_id){
        if($data){
                        foreach($data  as $rec){
                                                $rec = (object)$rec;
                                            
                                                            $shelfLifeType_id = $this->saveApplicationParams($rec->shelfLifeType,'eac_shelflifetype','name');
                                                            $packType_id = $this->saveApplicationParams($rec->packType,'eac_packtypes','name');
                                                                
                                                                $dataset[] = array('shelfLife'=>$rec->shelfLife,
                                                                                                    'timeUnit'=>$rec->timeUnit,
                                                                                                    'shelfLifeType_id'=>$shelfLifeType_id,
                                                                                                    'packType_id'=>$packType_id,
                                                                                                    'eac_prod_app_id'=>$eac_prod_app_id
                                                                                            );

                        }
                        DB::table($table_name)
                                ->insert($dataset);

        }
                    


    }

    function savestorageConditions_data($data,$table_name,$eac_prod_app_id){
    
        if($data){
                    foreach($data   as $rec){
                        
                        $rec = (object)$rec;
                                $storageConditionType_id = $this->saveApplicationParams($rec->storageConditionType,'eac_storageconditiontype','name');
                            
                                $packType_id = $this->saveApplicationParams($rec->packType,'eac_packtypes','name');

                                    $dataset[] = array('condition'=>$rec->condition,
                                                                        'storageConditionType_id'=>$storageConditionType_id,
                                                                        'packType_id'=>$packType_id,
                                                                        'eac_prod_app_id'=>$eac_prod_app_id
                                                                );
                                                            
                    }
                    DB::table($table_name)
                            ->insert($dataset);
                }
                
    }
    function savepackSizes_data($data,$table_name,$product_id){
    
        if($data){
                        foreach($data   as $rec){
                                        $rec = (object)$rec;
                                    
                                        $container_id = $this->saveApplicationParams($rec->packType,'par_containers','eacCode');
                                    
                                        $unit_id = $this->saveApplicationParams($rec->unit,'par_si_units','eacCode');
                                        
                                        $packagingType = array('eacCode'=>$rec->packagingType);
                                        $pack_type_id = $this->saveApplicationParams($packagingType,'par_containers_types','eacCode');

                                        $dataset[] = array('container_type_id'=>$pack_type_id,
                                                                            'retail_packaging_size'=>$rec->sizeA,
                                                                            'retail_packaging_size1'=>$rec->sizeB,
                                                                            'retail_packaging_size2'=>$rec->sizeC,
                                                                            //'retail_packaging_size3'=>$rec->sizeD,
                                                                            //'retail_packaging_size4'=>$rec->sizeE,
                                                                            'unit_pack'=>$unit_id,
                                                                            'container_id'=>$container_id,
                                                                            'container_material_id'=>'',
                                                                            'diluents'=>$rec->diluents,
                                                                            'product_id'=>$product_id
                                                                    );

                        }
                        DB::connection('portal_db')->table($table_name)
                                ->insert($dataset);

                    }
    }
    function savedrugComposition_data($data,$table_name,$product_id){
        if($data){
                    foreach($data   as $rec){
                        $rec = (object)$rec;
                        
                                $ingredient_data = array('name'=>$rec->ingredient['name'], 
                                                                                'eacCode'=>$rec->ingredient['eacCode']);
                                $ingredient_id = $this->saveApplicationParams($ingredient_data,'par_ingredients_details','eacCode');
                            
                                $manufacturer_id = $this->SaveApplicationManufacturer($rec->ingredient['manufacturer'],'eac_manufacturers','registrationNumber');
                                
                                $unit_id = $this->saveApplicationParams($rec->ingredient['unit'],'par_si_units','eacCode');

                                $monogramReference_id = $this->saveApplicationParams($rec->ingredient['monographReference'],'eac_monogramreferences','eacCode');
                            
                                $dataset = array('strength'=>$rec->ingredient['quantity'],
                                                                        'ingredientssi_unit_id'=>$unit_id,
                                                                        'ingredient_id'=>$ingredient_id,
                                                                        //'monogramReference_id'=>$monogramReference_id,
                                                                        'product_id'=>$product_id
                                                                );
                                //manufatcurer details 
                                $active_ingredient_id = DB::connection('portal_db')->table($table_name)
                                ->insertGetId($dataset);

                                $data = array('manufacturer_id'=>$manufacturer_id,'active_ingredient_id'=>$active_ingredient_id,'manufacturer_type_id'=>2, 'product_id'=>$product_id);
                                DB::connection('portal_db')->table('wb_product_manufacturers')
                                ->insertGetId($data);
                    }
                    
                            
                }

    }
    function savedrugPackagingMaterials_data($data,$table_name,$eac_prod_app_id){
        if($data){
                    foreach($data   as $rec){
                        $rec = (object)$rec;
                                $packType_id = $this->saveApplicationParams($rec->packType,'eac_packtypes','eacCode');
                                $primaryPackagingMaterial_id = $this->saveApplicationParams($rec->primaryPackagingMaterial,'par_containers_materials','eacCode');
                                
                                $secondaryPackagingMaterial_id = $this->saveApplicationParams($rec->secondaryPackagingMaterial,'par_containers_materials','eacCode');
                                $sealPackaging_id = $this->saveApplicationParams($rec->sealPackaging,'par_seal_types','eacCode');
                                
                                $dataset[] = array('packType_id'=>$packType_id,
                                                                        'primaryPackagingMaterial_id'=>$primaryPackagingMaterial_id,
                                                                        'secondaryPackagingMaterial_id'=>$secondaryPackagingMaterial_id,
                                                                        'sealPackaging_id'=>$sealPackaging_id,
                                                                        'eac_prod_app_id'=>$eac_prod_app_id
                                                                );

                    }
                    DB::table($table_name)
                            ->insert($dataset);
                }

    }
    function saveeac_drugregistrationstatus($data,$table_name,$eac_prod_app_id){
        if($data){
                                    foreach($data   as $rec){
                                                            $rec = (object)$rec;
                                                            
                                                                    $status_id = $this->saveApplicationParams($rec->status,'eac_drugsregstatuses','eacCode');
                                                                    
                                                                    $country_id = $this->saveApplicationParams($rec->country,'par_countries','code');
                                                                    
                                                                    $dataset[] = array('country_id'=>$country_id,
                                                                                                            'status_id'=>$status_id,
                                                                                                            'date'=>$rec->date,
                                                                                                            'eac_prod_app_id'=>$eac_prod_app_id
                                                                                                    );

                                                        }
                                                        DB::table($table_name)
                                                                ->insert($dataset);
                                                    }
    }

    
    function SaveApplicationManufacturer($data,$table_name,$index_name){
    
                $data = $data[0];
                $name = $data[$index_name];
                
                $rec = DB::table($table_name)
                            ->where(array('name'=>$name))
                            ->first();
                if(!$rec){
                        $data = (object)$data;
                    
                        $country_id = $this->saveApplicationParams($data->country,'par_countries','code');
                        
                        $manufacturingIndustry_id = $this->saveApplicationParams($data->manufacturingIndustry,'eac_manufacturingindustry','eacCode');   
                        $businessScale_id = $this->saveApplicationParams($data->businessScale,'eac_businessscale','eacCode');   
                    
                        $man_data = array('registrationNumber'=>$data->registrationNumber, 
                                                            'registrationDate'=>$data->registrationDate,
                                                            'name'=>$data->name,
                                                             'country_id'=>$country_id,
                                                            'manufacturingIndustry_id'=>$manufacturingIndustry_id,
                                                            'businessScale_id'=>$businessScale_id,
                                                            'physicalAddress'=>$data->physicalAddress,
                                                            'emailAddresses'=>$data->emailAddresses[0]['email']
                                                        );
                        $res = insertRecord($table_name, $man_data, '');

                        if($res['success']){

                                    $record_id = $res['record_id'];
                        }
                        else{
                                return response()->json($res,500);
                                exit();
                        }
                }else{
                        $record_id = $rec->id;
                }
                return $record_id;

    }
    public function getEACJointAssessmentMedicinesSubmissions(){
            $application_status_id = 2;
        try {

                    $records = DB::table('eac_product_application as t1')
                                        ->select('tracking_no', 't2.firstName as applicant_name', 't4.name as local_agent', 'tradeName as brand_name', 't3.name as application_status', 'applicationDate as submission_date', 't5.name as sub_module')
                                        ->leftJoin('eac_applicants  as t2', 't1.applicant_id', '=','t2.id')
                                        ->leftJoin('eac_applicationstatuses  as t3', 't1.application_status_id', '=','t3.id')
                                        ->leftJoin('wb_trader_account  as t4', 't1.ltrNumber', '=','t4.identification_no')
                                        ->leftJoin('sub_modules  as t5', 't1.sub_module_id', '=','t5.id')
                                        ->where('application_status_id',1)
                                        ->get();
                    $data = array('results'=>$records, 'success'=>true);

                    return response()->json($records,200);
            
            }catch(\Exception $e){
                    return response()->json([
                        'status'=>'FAILURE',
                        'message'=> $e->getMessage()
                    ],500);
                
            }catch(\Throwable $throwable){
                    return response()->json([
                        'status'=>'FAILURE',
                        'message'=>$throwable->getMessage()
                    ],500);
            }
    }
    public function funcCreateInvoiceService(Request $req){
            
            try {
                $applicationRef = $req->applicationRef;
                $licenseDuration = $req->licenseDuration;
                $licenseDurationTimeUnit = $req->licenseDurationTimeUnit;
                $medicineCategory = $req->medicineCategory;
                $medicineOrigin = $req->medicineOrigin;
                $ltrIdentifier = $req->ltrIdentifier;
                $medicineTradeName = $req->medicineTradeName;
                
                $record = DB::table('eac_product_application as t1')->select('t1.*')->where('applicationRef',$applicationRef)->first();
                if($record){
                    
                            $application_code = $record->application_code;
                            
                            $invrec = DB::table('tra_application_invoices as t1')->select('t1.*')->where('application_code',$application_code)->first();
                            if($invrec){
                                $invoice_no = $invrec->invoice_no;
                                    $res = array('status'=>'SUCCESS', 
                                                    'invoiceRef'=>$invoice_no,
                                                    'message'=>'Invoice Generated Successfully!!');
                                
                            }else{
                                $res = array('status'=>'FAILED', 'invoiceRef'=>'','message'=>'Product Application Invoice not found!!');
                            }
                            

                }
                else{
                    
                        $res = array('status'=>'FAILED', 'invoiceRef'=>'','message'=>'Product Application not found!!');

                }
                    return response()->json($res,200);
            
            }catch(\Exception $e){
                    return response()->json([
                        'success'=>'FAILED','invoiceRef'=>'',
                        'message'=> $e->getMessage()
                    ],500);
                
            }catch(\Throwable $throwable){
                    return response()->json([
                        'success'=>'FAILED','invoiceRef'=>'',
                        'message'=>$throwable->getMessage()
                    ],500);
            }

    }
    //the details 
    public function getPaymentStatus($invoice_id){
        $payment_status = 'NOT';
        $invrec = DB::table('tra_payments as t1')->select('t1.*')->where('invoice_id',$invoice_id)->first();
        if($invrec){
            
            $payment_status = 'PAID';

        }
        return $payment_status;
        
    }
    public function funcGetInvoiceService(Request $req){

        
            try {
                $invoiceRef = $req->invoiceRef;
            
                $invrec = DB::table('tra_application_invoices as t1')
                                    ->select(DB::raw("t1.*, t2.code as currency_code, sum(t3.total_element_amount) as total_invoice_amount"))
                                    ->join('par_currencies as t2', 't1.paying_currency_id', '=','t2.id')
                                    ->join('tra_invoice_details as t3', 't1.id','=','t3.invoice_id')
                                    ->where('invoice_no',$invoiceRef)
                                    ->first();
                            
                if($invrec){
                            $invoice_id = $invrec->id;
                            $invoice_no = $invrec->invoice_no;
                            $invoiceAmount = $invrec->total_invoice_amount;
                            $currency_code = $invrec->currency_code;
                            $paymentStatus = $this->getPaymentStatus($invoice_id);
                            $invoiceDate = formatDate($invrec->date_of_invoicing);
                            
                            $invoice_details = getInvoiceDetails($invrec->module_id, $invrec->application_id);
                    
                            $params = array(
                                    'invoice_id' => $invoice_id,
                                    'process_name' => $invoice_details['process_name'],
                                    'module_name' => $invoice_details['module_name'],
                                    'module_desc' => $invoice_details['module_desc'],
                                    'reference_no' => $invoice_details['reference_no'],
                                    'base_url' => $this->base_url,
                                    'sign_url' => null
                            );
                        $invoiceFile = '';
                    $report = generateJasperReport('invoiceReport', 'invoice', 'pdf', $params);

                            $invoiceFile = base64_encode($report);
                            //if(!$invoiceFile){
                                
                                //$invoiceFile = '';

                            //}
                            $invoiceLines = DB::table('tra_invoice_details as t1')
                                                                    ->join('element_costs as t2', 't1.element_costs_id', '=','t2.id')
                                                                    ->join('cost_elements as t3', 't2.element_id','=','t3.id')
                                                                    ->select('t1.id as lineNumber','t3.name as lineItem', 't3.name as itemDescription',  'total_element_amount as unitPrice', DB::raw("1 as quantity"))
                                                                    ->where('invoice_id',$invoice_id)
                                                                    ->get();
                                                        
                            $invoice_data = array('paymentStatus'=>$paymentStatus,
                                                                    'invoiceDate'=>$invoiceDate,
                                                                    'invoiceAmount'=>$invoiceAmount,
                                                                    'currencyCode'=>$currency_code,
                                                                    'invoiceLines'=>$invoiceLines,
                                                                    'invoiceFile'=>$invoiceFile
                                                                );
                            
                                                    $res = array('status'=>'SUCCESS', 
                                                    'invoiceRef'=>$invoice_no,
                                                    'data'=>$invoice_data,
                                                    'message'=>'Invoice Generated Successfully!!');

                }
                else{
                        $res = array('status'=>'INVALID_INVOICE_REFERENCE', 'message'=>'Application invoice not found, instatiate a request invoice call!!');
                }
                return response()->json($res,200);
            
            }catch(\Exception $e){
                    return response()->json([
                        'status'=>'FAILURE',
                        'message'=> $e->getMessage()
                    ],500);
                
            }catch(\Throwable $throwable){
                    return response()->json([
                        'status'=>'FAILURE',
                        'message'=>$throwable->getMessage()
                    ],500);
            }

    }
    public function funcGetPaymentService(Request $req){
        try {
            $invoiceRef = $req->invoiceRef;
            
            $invrec = DB::table('tra_application_invoices as t1')
                                ->select('t2.*', 't3.code as currency_code')
                                ->join('tra_payments as t2', 't1.id', '=', 't2.invoice_id')
                                ->join('par_currencies as t3', 't2.currency_id', '=','t3.id')
                                ->where('t1.invoice_no',$invoiceRef)
                                ->first();
            if($invrec){
                        $trans_ref = $invrec->trans_ref;
                        $receipt_no = $invrec->receipt_no;
                        $amount_paid = $invrec->amount_paid;
                        $currency_code = $invrec->currency_code;
                        $module_id = $invrec->module_id;
                        $trans_date = formatDate($invrec->trans_date);

                        $payment_id = $invrec->id;
                        $reference_no = $invrec->reference_no;

                        
                        $params = array(
                                'payment_id' => $payment_id,
                                'reference_no' => $reference_no,
                                'base_Url' => $this->base_url
                        );
                        $receiptFile = base64_encode(generateJasperReport('receiptReport', 'receipt_' . time(), 'pdf', $params));
                    
                    $paymentsData = array();
                        $paymentsData[] = array('amount'=>$amount_paid,
                                                                'currencyCode'=>$currency_code,
                                                                'paymentDate'=>$trans_date,
                                                                'referenceNumber'=>$trans_ref,
                                                                'remarks'=>'',
                                                                'paymentRef'=>$receipt_no,
                                                                'receiptFile'=>$receiptFile
                                                            );
                        
                        
                                                $res = array('status'=>'SUCCESS', 
                                                        'payments'=>$paymentsData,
                                                        'message'=>'Payments Details submission!!');

            }
            else{
                    $res = array('status'=>'FAILED', 'message'=>'Application payments not found!!');
            }
            return response()->json($res,200);
        
        }catch(\Exception $e){
                return response()->json([
                    'status'=>'FAILURE',
                    'message'=> $e->getMessage()
                ],500);
            
        }catch(\Throwable $throwable){
                return response()->json([
                    'status'=>'FAILURE',
                    'message'=>$throwable->getMessage()
                ],500);
        }

}   public function postSampleSubmissionService(Request $req){
    try {
        $applicationRef = $req->applicationRef;
        $samples = $req->samples;

        //the the objects 

        $rec = DB::table('eac_product_application')
                ->where(array('applicationRef'=>$req->applicationRef))
                ->first();

        if($rec){
            $table_name = 'tra_application_uploadeddocuments';
                    $application_code = $rec->application_code;
                    
                    foreach($samples as $sample){
                        $sampleRef = $sample['sampleRef'];
                        $fileAttachment = $sample['fileAttachment'];
                        
                    $this->saveEacFileAttachments($fileAttachment,$sampleRef,$table_name,$application_code);

                    }

                    $res = array('status'=>'SUCCESS', 'message'=>'Application, not found!!');
        }
        else{
            $res = array('status'=>'FAILURE', 'message'=>'Application, not found!!');
        }
        return response()->json($res,200);
    
    }catch(\Exception $e){
            return response()->json([
                'status'=>'FAILURE',
                'message'=> $e->getMessage()
            ],500);
        
    }catch(\Throwable $throwable){
            return response()->json([
                'status'=>'FAILURE',
                'message'=>$throwable->getMessage()
            ],500);
    }
}
function saveEacFileAttachments($fileAttachment,$sampleRef,$table_name,$application_code){
    $dataset = array();
    if($fileAttachment){
                                $document_requirement_id = 5;
                                $document_type_id = 3;
                                $rec = (object)$fileAttachment;

                                $fileAttachmentType = (object)$rec->fileAttachmentType;
                                $name = $fileAttachmentType->name;
                                $eacCode = $fileAttachmentType->eacCode;

                                $content = $rec->content;
                                $node_ref = '';
                                $fileName = $rec->fileName;
                                    
                                $fileExtension = getfile_extension($fileName);
                                        $dataset = array('application_code'=>$application_code,
                                                                                'document_requirement_id'=>$document_requirement_id,
                                                                                'document_type_id'=>$document_type_id,
                                                                                'uploaded_on'=>Carbon::now(),
                                                                                'uploaded_by'=>'',
                                                                                'initial_file_name'=>$name.'.'.$fileExtension,
                                                                                'file_type'=>$rec->mimeType,
                                                                                'node_ref'=>$node_ref,
                                                                                'sampleRef'=>$sampleRef,
                                                                                'path'=>$rec->path,
                                                                                'dmsURL'=>$rec->dmsURL,
                                                                                'containerUrl'=>$rec->containerUrl,
                                                                                'synchedWithDMS'=>$rec->synchedWithDMS
                                                                        );
                        
                            DB::table($table_name)
                                    ->insert($dataset);
                        }
}

public function postAssessmentSchedulesNotification(){


    $res = array('status'=>'SUCCESS', 'message'=>'Assements has been scheduled!!');
    return response()->json($res,200);

}
function submitAssementReports($req,$workflow_stage,$document_type_id,$evaluationType,$comment_type_id){

        $applicationRef = $req->applicationRef;
        $rec = DB::table('eac_product_application')
                ->where(array('applicationRef'=>$req->applicationRef))
                ->first();

        if($rec){
                    //submit the 1st assessments 

                    $application_code = $rec->application_code;
                    //wofkwlow_stage 
                    //check if the revaluation has been done or assigned 179
                    $submission_rec = DB::table('tra_submissions as t1')
                                        ->join('users as t2', 't1.usr_to','=','t2.id')
                                        ->select(DB::raw("t1.*,t3.comment as overallComment, decrypt(t2.email) as emailAddress,decrypt(t2.phone) as phoneNumbers,decrypt(t2.first_name) as first_name, decrypt(t2.last_name) as last_name") )
                                        ->leftJoin('tra_applications_comments as t3', function ($join) use ($comment_type_id) {
                                            $join->on("t1.application_code", "=", "t3.application_code")
                                                    ->where("t3.comment_type_id", "=", $comment_type_id);
                                    })
                                        ->where(array('t1.application_code'=>$application_code, 'current_stage'=>$workflow_stage))
                                        ->first();
                    if($submission_rec){
                        $isDone = $submission_rec->isDone;
                        $fileName = '';
                        $mimeType ='';
                        $content = '';
                            if($isDone ==1 ){
                                $evaluationStatus = 'COMPLETED';
                                
                                $evaluationReport = array();
                                $document_data = $this->getUplodedDocumets($application_code, $document_type_id);
                                if($document_data){
                                    //file_get_contents($document_url); file_name  id, file_type  content 
                                    $fileName = $document_data['file_name'];
                                    $mimeType =$document_data['file_type'];
                                    $content = base64_encode($document_data['url']);
                                    $evaluationReport[] =  array('fileAttachmentRef'=>$document_data['id'],
                                                                                        'fileName'=>$document_data['file_name'],
                                                                                        'mimeType'=>$document_data['file_type'],
                                                                                        'content'=>base64_encode($document_data['url']),
                                                                                        );
                                }
                            }
                            else{
                                $evaluationStatus = 'STARTED';
                                $evaluationReport = array();
                            }
                            
                            $emailAddresses  = array();
                            $emailAddress[] = array('email'=>$submission_rec->emailAddress, 'type'=>'');
                            $phoneNumbers = array();
                            $phoneNumbers[] =  array('number'=>$submission_rec->phoneNumbers, 'type'=>'');
                            $evaluationAssignments = array();
                            $evaluationAssignments[] = array('contactPersonRef'=>rand(0,100),
                                                                                        'firstName'=>$submission_rec->first_name,
                                                                                        'lastName'=>$submission_rec->last_name,
                                                                                        'middleName'=>'N/A',
                                                                                        'emailAddresses'=>$emailAddress,
                                                                                        'phoneNumbers'=>$phoneNumbers
                                                                                    );
                        $fileAttachmentType = array('name'=>$evaluationType,'eacCode'=>'');
                        $reportFileAttachments = array();
                        $reportFileAttachments[] = array('fileAttachmentRef'=>rand(0,100), 
                                                                                'fileAttachmentType'=>$fileAttachmentType,
                                                                                'fileName'=>$fileName,
                                                                                'mimeType'=>$mimeType,
                                                                                'content'=>$content
                                                                                    );
                                    $reportDetails = array();                                           
                        $reportDetails[] = array('section'=>'N/A','comment'=>'N/A');
                        
                        $evaluationReport = array('reportFileAttachments'=>$reportFileAttachments,
                                                                            'reportDetails'=>$reportDetails);

                        $evaluation_data = array('applicationRef'=>$applicationRef,
                                                                        'evaluationType'=>$evaluationType,
                                                                        'evaluationStatus'=>$evaluationStatus,
                                                                        'scheduledStartDate'=>formatDate($submission_rec->date_received),
                                                                        'scheduledEndDate'=>formatDate($submission_rec->date_released),
                                                                        'evaluationAssignments'=>$evaluationAssignments,
                                                                        'evaluationReport'=>$evaluationReport,
                                                                        'overallComment'=>$submission_rec->overallComment,
                                                                        'approved'=>true
                                                                    );
                                                                     
                    }
                    else{
                        //evaluation not complete
                        $evaluation_data = array('evaluationStatus'=>'PENDING SCHEDULING', 'status'=>'SUCCESS',
                                                    'evaluationType'=>$evaluationType,
                                                    'message'=>'PENDING SCHEDULING!!');
                    }
                
        }
        return $evaluation_data;
                

}
function getUplodedDocumets($application_code, $document_type_id){
            $url = ''; 
                $rec = DB::table('tra_documentupload_requirements as t1')
                            ->join('par_document_types as t2', 't1.document_type_id', '=', 't2.id')
                            ->select(DB::raw("t4.remarks, t1.id as document_requirement_id, t4.application_code,
                            t4.node_ref, t2.name as document_type, t4.id,t4.initial_file_name,t4.file_name, t1.module_id,t1.sub_module_id,t1.section_id,
                            t4.file_type,t4.uploaded_on,CONCAT_WS(' ',decrypt(t5.first_name),decrypt(t5.last_name)) as uploaded_by,t1.is_mandatory,
                            t1.id as document_requirement_id, t1.document_type_id,t2.name as document_type, t1.name as document_requirement"))
                            ->join('tra_application_uploadeddocuments as t4', function ($join) use ($application_code) {
                                    $join->on("t1.id", "=", "t4.document_requirement_id")
                                            ->where("t4.application_code", "=", $application_code);
                            })
                            ->leftJoin('users as t5', 't4.uploaded_by', '=', 't5.id')
                            ->where('t1.document_type_id',$document_type_id)
                            ->first();
                    if($rec){
                        
                        $url = downloadDocumentUrl($rec->node_ref, '');
                        $rec = (array)$rec;

                        $rec['url'] = $url;

                    }
                    return $rec;

}
public function getSecondAssessmentReportPullService(Request $req){

    $this->submitAssementReports($req,180,9,'SECOND_EVALUATION', 3);

}
public function getFirstAssessmentReportPullService(Request $req){
    try {

    $applicationRef = $req->applicationRef;
        $rec = DB::table('eac_product_application')
                ->where(array('applicationRef'=>$req->applicationRef))
                ->first();

        if($rec){
            $evaluations = array();
            $evaluations[] =$this->submitAssementReports($req,178,8,'FIRST_EVALUATION',2);
            $evaluations[] =    $this->submitAssementReports($req,180,9,'SECOND_EVALUATION', 3);
            $res = array('status'=>'SUCCESS', 'message'=>'Success', 'evaluations'=>$evaluations);

        }
        else{
            $res = array('status'=>'FAILED', 'message'=>'Application, not found!!');
        }
    
        return response()->json($res,200);
        }catch(\Exception $e){
            return response()->json([
                'status'=>'FAILED',
                'message'=> $e->getMessage()
            ],500);
        
    }catch(\Throwable $throwable){
            return response()->json([
                'status'=>'FAILED',
                'message'=>$throwable->getMessage()
            ],500);
    }

}
public function getPlenaryReportService(Request $req){
    try {
        $applicationRef = $req->applicationRef;
        $rec = DB::table('eac_product_application')
                ->where(array('applicationRef'=>$req->applicationRef))
                ->first();

        if($rec){
        
                    $application_code = $rec->application_code;
                    $rec_count = DB::table('tra_productapp_plenaryreport')
                            ->where(array('application_code'=>$application_code))
                            ->count();
                    if($rec_count == 0){

                        $data = array('applicationRef'=>$applicationRef, 
                                'application_code'=>$application_code,
                                'applicationtStatus'=>$req->applicationtStatus, 
                                'reportFinding'=>$req->reportFinding,
                                'reportFilingDate'=>$req->reportFilingDate,
                                'created_by'=>'',
                                'created_on'=>Carbon::now());
                        $res = insertRecord('tra_productapp_plenaryreport', $data, '');

                }
                $res = array('status'=>'SUCCESS', 'message'=>'Report Saved Successfully');

                    return response()->json($res,200);
                    
        }
        else{
            $res = array('status'=>'FAILED', 'message'=>'Application, not found!!');
        }
                    return response()->json($res,200);
        }catch(\Exception $e){
            return response()->json([
                'status'=>'FAILED',
                'message'=> $e->getMessage()
            ],500);
        
    }catch(\Throwable $throwable){
            return response()->json([
                'status'=>'FAILED',
                'message'=>$throwable->getMessage()
            ],500);
    }
}
function getProductCertificate( $product_id){

        $rec = DB::table('tra_product_information as t1')
                        ->leftJoin('par_device_types as t2', 't1.device_type_id', '=','t2.id')
                        ->select('t1.section_id', 't2.description as device_type')
                        ->where(array('t1.id'=>$product_id))
                        ->first();
             $section_id = $rec->section_id;
             $device_type = $rec->device_type;
                   
        if($section_id == 2){
            $document_number = 'BVS/099/45';
            $certificate_name = 'DRUGS CERTIFICATE';
            $report_name = 'DrugsCertificateReport';

        }
        else{
           
            $document_number = 'BVS/099/45';
            $certificate_name = 'CERTIFICATE OF '.$device_type.' REGISTRATION';
            $report_name = 'medicalDevicesCertificate';

        }
        $params = array(
            'product_id' => $product_id,
            'document_number' => $document_number,
            'certificate_name' => $certificate_name,
            'certificate_regulation' => '(Made under Section 21(3) of the Tanzania Food, Drugs and Cosmetics Act, Cap 219)',
            'base_Url' => $this->base_url,
            'sign_Url' => $this->sign_url
        );
      
        $report = base64_encode(generateJasperReport($report_name, 'permit_' . time(), 'pdf', $params));
        return $report;
}

public function getMarketAuthorisationService(Request $req){
        try {
            $applicationRef = $req->applicationRef;
            $rec = DB::table('eac_product_application')
                    ->where(array('applicationRef'=>$req->applicationRef))
                    ->first();
                    $content = '';
                    $license = '';
            if($rec){
                $application_code = $rec->application_code;
                $prod_rec = DB::table('tra_product_applications as t1')
                                                ->join('tra_product_information as t2','t1.product_id','=','t2.id')
                                                ->join('tra_approval_recommendations as t3','t1.permit_id','=', 't3.id')
                                                ->leftJoin('par_dosage_forms as t4', 't2.dosage_form_id','=','t4.id')
                                                ->leftJoin('par_distribution_categories as t5', 't2.distribution_category_id','=','t5.id')
                                                ->leftJoin('par_atc_codes as t6', 't2.atc_code_id','=','t6.id')
                                                ->leftJoin('par_product_categories as t7', 't2.product_category_id','=','t7.id')
                                                ->select(DB::raw("t3.certicate_no as licenseNumber,t1.product_id ,drugCategory as drugCategory, t3.certificate_issue_date as issueDate, t3.expiry_date as expiryDate, t1.date_addedd as applicationDate, t2.brand_name as drugTradeName, t4.name as dosageForm,t7.name as drugCategory,t2.physical_description as drugDescription,t6.name as theraputicCategory, t2.contraindication as indication, t2.shelf_life as drugShelfLife, t5.name as distributionCategory "))
                                                ->first();
                                                $content = array();
                if($prod_rec){
                    $product_id = $prod_rec->product_id;
                    $license = array('licenseNumber'=>$prod_rec->licenseNumber,
                                                    'drugCategory'=>$prod_rec->drugCategory,
                                                    'issueDate'=>$prod_rec->issueDate,
                                                    'expiryDate'=>$prod_rec->expiryDate,
                                                    'applicationDate'=>$prod_rec->applicationDate,
                                                    'drugTradeName'=>$prod_rec->drugTradeName,
                                                    'dosageForm'=>$prod_rec->dosageForm,
                                                    'drugDescription'=>$prod_rec->drugDescription,
                                                    'theraputicCategory'=>$prod_rec->theraputicCategory,
                                                    'indication'=>$prod_rec->indication,
                                                    'drugShelfLife'=>$prod_rec->drugShelfLife,
                                                    'distributionCategory'=>$prod_rec->distributionCategory,
                                                    
                                                );
                            $content = $this->getProductCertificate($product_id);
                }
            
                $res = array('status'=>'SUCCESS',
                                    'content'=>$content,
                                    'license'=>$license);
                            
            }
            else{
                $res = array('status'=>'FAILED', 'message'=>'Application, not found!!');
            }
                        return response()->json($res,200);
            }catch(\Exception $e){
                return response()->json([
                    'status'=>'FAILED',
                    'message'=> $e->getMessage()
                ],500);
            
        }catch(\Throwable $throwable){
                return response()->json([
                    'status'=>'FAILED',
                    'message'=>$throwable->getMessage()
                ],500);
        }


}

public function getStatusChangeNotificationService(Request $req){
        $applicationRef = $req->applicationRef;
        try {
            $applicationRef = $req->applicationRef;
            $rec = DB::table('eac_product_application')
                    ->where(array('applicationRef'=>$req->applicationRef))
                    ->first();
    
            if($rec){
                        $res = array();
                        
                        return response()->json($res,200);
                        
            }
            else{
                $res = array('status'=>'FAILED', 'message'=>'Application, not found!!');
            }
                        return response()->json($res,200);
            }catch(\Exception $e){
                return response()->json([
                    'status'=>'FAILED',
                    'message'=> $e->getMessage()
                ],500);
            
        }catch(\Throwable $throwable){
                return response()->json([
                    'status'=>'FAILED',
                    'message'=>$throwable->getMessage()
                ],500);
        }

}


public function getMalInformationSharingSrv(Request $req){
        
    $start=$req->input('start');
    $limit=$req->input('limit');
        
        try {
        
            $qry = DB::table('tra_registered_products as t1')
                                    ->leftJoin('tra_product_information as t2', 't1.tra_product_id', 't2.id')
                                    ->leftJoin('tra_product_applications as t3', 't2.id', 't3.product_id')
                                    ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', 't4.application_code')
                                    ->leftJoin('par_classifications as t5', 't2.classification_id','t5.id')
                                    ->leftJoin('par_product_categories as t6', 't2.product_category_id','t6.id')
                                    ->leftJoin('wb_trader_account as t7', 't3.applicant_id','t7.id')
                                    ->leftJoin('par_countries as t8', 't7.country_id','t8.id')
                                    ->leftJoin('wb_trader_account as t9', 't3.local_agent_id','t9.id')
                                    ->leftJoin('par_common_names as t10', 't2.common_name_id','t10.id')
                                    ->leftJoin('tra_product_manufacturers as t11', function ($join) {
                    $join->on('t2.id', '=', 't11.product_id')
                        ->on('t11.manufacturer_role_id', '=', DB::raw(1))
                        ->on('t11.manufacturer_type_id', '=', DB::raw(1));
                })
                                ->leftJoin('par_man_sites as t12', 't11.man_site_id','t12.id')
                                ->leftJoin('par_countries as t13', 't12.country_id','t13.id')
                                ->leftJoin('par_route_of_administration as t14', 't2.route_of_administration_id','t14.id')
                                ->leftJoin('par_dosage_forms as t15', 't2.dosage_form_id','t15.id')
                                ->leftJoin('par_si_units as t16', 't2.si_unit_id','t16.id')
                                ->leftJoin('par_registration_statuses as t17', 't1.registration_status_id','t17.id')
                            ->select(DB::raw("t4.certificate_no as licenseNo,t5.name as classification, t6.name as productCategory,t7.name as licenseHolder, t8.name as licenseHolderCountry, t9.name as localTechnicalRepresentative, t2.brand_name as productNameandBrand,t10.name as  genericNames, '' as therapeuticGroup, t12.name as manufacturerNames,t13.name as productOrigin,t14.name as routeOfAdmin,t15.name as productForm,(SELECT group_concat(concat(`g`.`unit_pack`,' ',convert(`h`.`name` using utf8)) separator ',')  FROM tra_product_packaging g LEFT JOIN  par_packaging_units h  ON  g.packaging_units_id = h.id) as packSizeUnits , (SELECT group_concat(concat(`s`.`name`,' ',`q`.`strength`,' ',convert(`u`.`name` using utf8)) separator ',') FROM tra_product_ingredients q INNER JOIN par_ingredients_details s ON q.ingredient_id = s.id INNER JOIN par_si_units u ON q.ingredientssi_unit_id = u.id where q.product_id = t2.id) as productIngredients,concat(t2.product_strength,' ',t16.name) as strengths, t17.name as productStatus,t13.name as manufacturerCountry"))
                         ->where(array('t1.validity_status_id'=>2, 't1.registration_status_id'=>2, 't2.section_id'=>2));
            
            $qry_count = DB::table('tra_registered_products as t1') ->join('tra_product_information as t2', 't1.tra_product_id', 't2.id')->where(array('t1.validity_status_id'=>2, 't2.section_id'=>2));
            $totalCount =  $qry_count->count();
            
            if(is_numeric($start)&& is_numeric($limit))
            {
                
                $start=$start==0?0:$start-1;
                $qry->offset($start*$limit)->limit($limit);
            }else{
                
                    return response()->json([
                    'status'=>'FAILURE',
                    'message'=>'Wrong value for Limit or Start'
                ],400);
            }
            $records = $qry->get();
            
            return response()->json([
                'status'=>'SUCCESS',
                'data'=>$records,
                'totalCount'=>$totalCount
            ],200);
            
        }catch(\Exception $exception){
            
                return response()->json([
                    'status'=>'FAILURE',
                    'message'=> $exception->getMessage()
                    
                ],500);
            
        }catch(\Throwable $throwable){
                 return response()->json([
                    'status'=>'FAILURE',
                    'message'=>  $throwable->getMessage()
                ],500);
        }

        
}
public function getMalRecallInformationSharingSrv(Request $req){
    $start=$req->input('start');
    $limit=$req->input('limit');
        
        try {
        
            $qry = DB::table('tra_registered_products as t1')
                                    ->leftJoin('tra_product_information as t2', 't1.tra_product_id', 't2.id')
                                    ->leftJoin('tra_product_applications as t3', 't2.id', 't3.product_id')
                                    ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', 't4.application_code')
                                    ->leftJoin('par_classifications as t5', 't2.classification_id','t5.id')
                                    ->leftJoin('par_product_categories as t6', 't2.product_category_id','t6.id')
                                    ->leftJoin('wb_trader_account as t7', 't3.applicant_id','t7.id')
                                    ->leftJoin('par_countries as t8', 't7.country_id','t8.id')
                                    ->leftJoin('wb_trader_account as t9', 't3.local_agent_id','t9.id')
                                    ->leftJoin('par_common_names as t10', 't2.common_name_id','t10.id')
                                    ->leftJoin('tra_product_manufacturers as t11', function ($join) {
                    $join->on('t2.id', '=', 't11.product_id')
                        ->on('t11.manufacturer_role_id', '=', DB::raw(1))
                        ->on('t11.manufacturer_type_id', '=', DB::raw(1));
                })
                                ->leftJoin('par_man_sites as t12', 't11.man_site_id','t12.id')
                                ->leftJoin('par_countries as t13', 't12.country_id','t13.id')
                                ->leftJoin('par_route_of_administration as t14', 't2.route_of_administration_id','t14.id')
                                ->leftJoin('par_dosage_forms as t15', 't2.dosage_form_id','t15.id')
                                ->leftJoin('par_si_units as t16', 't2.si_unit_id','t16.id')
                                ->leftJoin('par_registration_statuses as t17', 't1.registration_status_id','t17.id')
                            ->select(DB::raw("t4.approval_date as dateOfRecall,  t2.brand_name as medicineName, t2.brand_name as brandName, t14.name as routeOfAdministration,t15.name as dosageForm, t12.name as manufacturereSite,'' as recallType, '' as batchNumber,'' as reason, '' as details, t4.certificate_no as registrationNumber"))
                         ->where(array('t1.registration_status_id'=>4, 't2.section_id'=>2));
            
            $qry_count = DB::table('tra_registered_products as t1') ->join('tra_product_information as t2', 't1.tra_product_id', 't2.id')->where(array('t1.registration_status_id'=>4, 't2.section_id'=>2));

            $totalCount =  $qry_count->count();
            
            if(is_numeric($start)&& is_numeric($limit))
            {
                
                $start=$start==0?0:$start-1;
                $qry->offset($start*$limit)->limit($limit);
            }else{
                
                    return response()->json([
                    'status'=>'FAILURE',
                    'message'=>'Wrong value for Limit or Start'
                ],400);
            }
            $records = $qry->get();
            
            return response()->json([
                'status'=>'SUCCESS',
                'data'=>$records,
                'totalCount'=>$totalCount
            ],200);
            
        }catch(\Exception $exception){
            
                return response()->json([
                    'status'=>'FAILURE',
                    'message'=> $exception->getMessage()
                    
                ],500);
            
        }catch(\Throwable $throwable){
                 return response()->json([
                    'status'=>'FAILURE',
                    'message'=>  $throwable->getMessage()
                ],500);
        }



}
public function getPremisesInformationSharingSrv(Request $req){
        
    $start=$req->input('start');
    $limit=$req->input('limit');
        
        try {
        
            $qry = DB::table('registered_premises as t1')
                                    ->join('tra_premises as t2', 't1.tra_premise_id', 't2.id')
                                    ->join('tra_premises_applications as t4', 't4.premise_id', 't2.id')
                                    ->join('par_business_types as t3', 't2.business_type_id', 't3.id')
                                    ->join('par_countries as t6', 't2.country_id', 't6.id')
                                    ->join('par_regions as t5', 't2.region_id', 't5.id')
                                    ->select(DB::raw("premise_reg_no as premiseNumber, t2.name as premiseName, t3.name as premiseType, concat(t2.physical_address,', ', t2.postal_address,' ,', t5.name ,', ', t6.name) as location"))
                                 ->where(array('t1.validity_status'=>2, 't1.registration_status'=>2, 't2.section_id'=>2));

            $qry_count =            DB::table('registered_premises as t1')
                    ->join('tra_premises as t2', 't1.tra_premise_id', 't2.id')          
                ->where(array('t1.validity_status'=>2, 't1.registration_status'=>2, 't2.section_id'=>2));
        
            $totalCount =  $qry_count->count();
            
            if(is_numeric($start)&& is_numeric($limit))
            {
                
                $start=$start==0?0:$start-1;
                $qry->offset($start*$limit)->limit($limit);
            }else{
                
                    return response()->json([
                    'status'=>'FAILURE',
                    'message'=>'Wrong value for Limit or Start'
                ],400);
            }
            $records = $qry->get();
            
            return response()->json([
                'status'=>'SUCCESS',
                'data'=>$records,
                'totalCount'=>$totalCount
            ],200);
            
        }catch(\Exception $exception){
            
                return response()->json([
                    'status'=>'FAILURE',
                    'message'=> $exception->getMessage()
                    
                ],500);
            
        }catch(\Throwable $throwable){
                 return response()->json([
                    'status'=>'FAILURE',
                    'message'=>  $throwable->getMessage()
                ],500);
        }
        
        
}
public function getGmpInformationSharingSrv(Request $req){
        
    $start=$req->input('start');
    $limit=$req->input('limit');
        try {

            $qry = DB::table('registered_manufacturing_sites as t1')
                                    ->leftJoin('tra_manufacturing_sites as t2', 't1.tra_site_id', 't2.id')
                                    ->leftJoin('tra_gmp_applications as t4', 't4.manufacturing_site_id', 't2.id')
                                    ->leftJoin('par_business_types as t3', 't2.business_type_id', 't3.id')
                                    ->leftJoin('par_countries as t6', 't2.country_id', 't6.id')
                                    ->leftJoin('par_regions as t5', 't2.region_id', 't5.id')
                                    ->leftJoin('tra_approval_recommendations as t7', 't4.application_code', 't7.application_code')
                                    ->select(DB::raw("premise_reg_no as gmpCertificateNumber, t2.name as gmpSiteName,t7.approval_date as applicationDate, t3.name as gmpSiteType, concat(t2.physical_address,', ', t2.postal_address,' ,', t5.name ,', ', t6.name) as location"))
                                 ->where(array('t1.validity_status'=>2, 't1.registration_status'=>2, 't2.section_id'=>2));

            $qry_count =            DB::table('registered_manufacturing_sites as t1')
                    ->leftJoin('tra_manufacturing_sites as t2', 't1.tra_site_id', 't2.id')      
                ->where(array('t1.validity_status'=>2, 't1.registration_status'=>2, 't2.section_id'=>2));
        
            $totalCount =  $qry_count->count();
            
            if(is_numeric($start)&& is_numeric($limit))
            {
                
                $start=$start==0?0:$start-1;
                $qry->offset($start*$limit)->limit($limit);
            }else{
                
                    return response()->json([
                    'status'=>'FAILURE',
                    'message'=>'Wrong value for Limit or Start'
                ],400);
            }
            $records = $qry->get();
            
            return response()->json([
                'status'=>'SUCCESS',
                'data'=>$records,
                'totalCount'=>$totalCount
            ],200);
            
        }catch(\Exception $exception){
            
                return response()->json([
                    'status'=>'FAILURE',
                    'message'=> $exception->getMessage()
                    
                ],500);
            
        }catch(\Throwable $throwable){
                 return response()->json([
                    'status'=>'FAILURE',
                    'message'=>  $throwable->getMessage()
                ],500);
        }
}
}