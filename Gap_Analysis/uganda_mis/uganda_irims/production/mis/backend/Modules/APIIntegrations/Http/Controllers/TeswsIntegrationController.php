<?php

namespace Modules\APIIntegrations\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Tesws;
use Carbon\Carbon;
use Tesws\HTTPSignature;
use Illuminate\Support\Arr;
use Tesws\Model\LpcoApplication;
use Tesws\ObjectXmlDeserializer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Modules\APIIntegrations\Tesws\Converters\ApplicationConverter;
use DateTime;
use Tesws\Model\ApplicationResponse;

class TeswsIntegrationController extends Controller
{
   //const KEY_ID = 'rsa-sha256-pss';
    const KEY_ID = '17b97e48-11d8-4a11-9239-d00d5b2928ba ';
    public function getImportExpApplicationReferenceCodes($application_details)
    {
         
        $zone_code = getSingleRecordColValue('par_zones', array('id' => $application_details->zone_id), 'zone_code');
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $submodule_code = getSingleRecordColValue('sub_modules', array('id' => $application_details->sub_module_id), 'code');

        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => $zone_code,
            'apptype_code' => $submodule_code
        );  
        return $codes_array;
        
    }//
    public function receivePermitInspectionSchedule(Request $request, HTTPSignature $signature){
        try {
            $logFile = 'laravel.log';
            $message = "Details";
            $submitted_datasets = simplexml_load_string($request->getContent());
            
            $json = json_encode($submitted_datasets);
            $initialContent = json_decode($json, true);
             $responseHeaders = [
                    'content-type' => 'application/xml'
                ];
            $ack = new Tesws\Model\Acknowledgement([
                    'message' => 'Application Response',
                    'status' => '7201'
                ]);        
                $res = Tesws\Xml::buildXmlFromArray($ack->getXmlArray());   
                
            if(!$initialContent){ 
            
            $message =  'Application details Not submitted/Passed';         
                $ack = new Tesws\Model\Acknowledgement([
                    'message' => $message,
                    'status' => '7201'
                ]);        
                $res = Tesws\Xml::buildXmlFromArray($ack->getXmlArray());        
                $responseHeaders = [
                    'content-type' => 'application/xml'
                ];
                
                $signature->signResponse($responseHeaders, $res,  self::KEY_ID);        
                return response($res, 201, $responseHeaders)->send();
            }else{
                
                $tansadNo = $initialContent['tansadNo'];
                $datasets = array('teswsrespaction_type_id'=>3,
                                 'full_tesws_dataset'=>serialize($json),
                                 'created_on'=>Carbon::now(),
                                 'application_reference'=>$tansadNo);
                                
                    $res = insertRecord('tesws_permitdeclarationdatasets', $datasets, '');
                
                $record = DB::table('tesws_permitsgeneral_information')->where('tansadNumber',$tansadNo)->first();
                
                if($record){
                    $application_code = $record->application_code;
                    $permit_declaration_id = $record->id;
                    $applicationInfo = array(
                        'application_code' => $application_code,
                        'permit_declaration_id' => $permit_declaration_id,
                        'tansadNo' => $initialContent['tansadNo'],
                        'bookingId' => $initialContent['bookingId'],
                        'containerCount' => $initialContent['containerCount'],
                        'containerList' => $initialContent['containerList'],
                        'confimedBookedDate' => formatDate($initialContent['confimedBookedDate']),
                        'cargoKeeper' => $initialContent['cargoKeeper'],
                        'station' => $initialContent['station'],
                        'created_at' => Carbon::now(),
                        'inspectionbooking_status_id'=>1,
                        'table_name'=>'tesws_inspection_bookings'
                    );
                    $wherebooking = array('application_code'=>$application_code,'bookingId' => $initialContent['bookingId']);
                    $count = DB::table('tesws_inspection_bookings')
                                    ->where($wherebooking)
                                    ->count();
                    if($count == 0){
                        $saveResponse = $this->savePermitApplicationDetails($applicationInfo);
                    
                    }
                    
                    $teswspermitsubmission_statuse_id = 12;
                        DB::table('tesws_permitsgeneral_information')
                        ->where(array('id'=>$permit_declaration_id))
                        ->update(array('permitsubmission_status_id'=>$teswspermitsubmission_statuse_id));
                        
                    $message =  'Application has been received successfully';
                    $ack = new Tesws\Model\Acknowledgement([
                        'message' => 'Application has been received successfully',
                        'status' => '7101'
                    ]);
                    
                }
                else{
                    $message =  'Application details Not submitted/Passed';         
                    $ack = new Tesws\Model\Acknowledgement([
                        'message' => $message,
                        'status' => '7201'
                    ]);   
                    
                }
                
                $res = Tesws\Xml::buildXmlFromArray($ack->getXmlArray());
                $responseHeaders = [
                    'content-type' => 'application/xml'
                ];
                
                $signature->signResponse($responseHeaders, $res,  self::KEY_ID);
                 return response($res, 200, $responseHeaders)->send();
            }
        } catch (\Exception $exception) {
            $status = '7201';
            $message = $exception->getMessage();
            
        } catch (\Throwable $throwable) {
            $status = '7201';
            $message = $throwable->getMessage();
            
        }
        
        $ack = new Tesws\Model\Acknowledgement([
                   'message' => $message,
                    'status' => 7201
                ]);
                $res = Tesws\Xml::buildXmlFromArray($ack->getXmlArray());
                $responseHeaders = [
                    'content-type' => 'application/xml'
                ];
                $signature->signResponse($responseHeaders, $res,  self::KEY_ID);
        
        return response($res, 201, $responseHeaders)->send();
        
        
        
        
    }
   public function receivePermitApplication(Request $request, HTTPSignature $signature){
  //  public function processDeclaredImportExportapps(Request $request){
        try {
            $logFile = 'laravel.log';
            $message = "Details";
            $submitted_datasets = simplexml_load_string($request->getContent());
            
            
            $json = json_encode($submitted_datasets);
            $initialContent = json_decode($json, true);

             $responseHeaders = [
                    'content-type' => 'application/xml'
                ];
            $ack = new Tesws\Model\Acknowledgement([
                    'message' => 'Application Response',
                    'status' => '7201'
                ]);        
                $res = Tesws\Xml::buildXmlFromArray($ack->getXmlArray());   
                
            if(!$initialContent){ 
            
            $message =  'Application details Not submitted/Passed';         
                $ack = new Tesws\Model\Acknowledgement([
                    'message' => 'Application Response',
                    'status' => '7201'
                ]); 
                //TESWS Response Codes        
                //7201// error 
                //7101 
                $res = Tesws\Xml::buildXmlFromArray($ack->getXmlArray());        
                $responseHeaders = [
                    'content-type' => 'application/xml'
                ];
                
                $signature->signResponse($responseHeaders, $res,  self::KEY_ID);        
                return response($res, 201, $responseHeaders)->send();
            }else{
                
                $application_reference = $initialContent['applicationReference'];

                $datasets = array('teswsrespaction_type_id'=>1,
                                 'full_tesws_dataset'=>serialize($json),//we can easily extract information from 
                                 'created_on'=>Carbon::now(),
                                 'application_reference'=>$application_reference);
                                
                    $res = insertRecord('tesws_permitdeclarationdatasets', $datasets, '');

                //arrivalDate
                $applicationInfo = array(
                    'referenceNumber' => $initialContent['referenceNumber'],
                    'applicationReference' =>$application_reference ,
                    'applicationStatus' => $initialContent['applicationStatus'],
                                 
                    'consignmentCountryCode' => $initialContent['consignmentCountryCode'],
                    'currencyCode' => $initialContent['currencyCode'],
                    'destinationCountryCode' => $initialContent['destinationCountryCode'],
                    'documentCode' => $initialContent['documentCode'],
                    'documentType' => $initialContent['documentType'],
                    'entryOfficeCode' => $initialContent['entryOfficeCode'],
                    'exportCountryCode' => $initialContent['exportCountryCode'],
                   //'invoiceDate' => $initialContent['invoiceDate'],
                   // 'invoiceNumber' => $initialContent['invoiceNumber'],
                    'regimeCode' => $initialContent['regimeCode'],
                    'tansadNumber' => $initialContent['tansadNumber'],
                    'permitsubmission_status_id' => 1,
                    'table_name' => 'tesws_permitsgeneral_information'
                );
                if(isset($initialContent['arrivalDate'])){
                    $applicationInfo['arrivalDate'] = $initialContent['arrivalDate'];
                     
                }
                if(isset($initialContent['invoiceNumber'])){
                    $applicationInfo['invoiceNumber'] = $initialContent['invoiceNumber'];
                     
                }
                if(isset($initialContent['invoiceDate'])){
                    $applicationInfo['invoiceDate'] = $initialContent['invoiceDate'];
                     
                }
                if(isset($initialContent['additionalFields']['permitNo'])){
                        
                     $applicationInfo['previous_permit_no'] = $initialContent['additionalFields']['permitNo'];
                     
                     
                }
                if(isset($initialContent['additionalFields']['prevPaycntrnum'])){
                    $applicationInfo['prev_paycntrnum'] = $initialContent['additionalFields']['prevPaycntrnum'];
                    
                    
                }
                if(isset($initialContent['additionalFields']['permitReason'])){
                     $applicationInfo['permitReason'] = $initialContent['additionalFields']['permitReason'];
                    
                    
                }
                if(isset($initialContent['additionalFields']['amendmentResponse'])){
                     $applicationInfo['amendmentResponse'] = $initialContent['additionalFields']['amendmentResponse'];
                     
                    
                }
                if(isset($initialContent['additionalFields']['permitType'])){
                    $applicationInfo['permitType'] = $initialContent['additionalFields']['permitType'];
                    
                }
                $attachmentsInfo = array(
                    'attachments' => $initialContent['attachments']['attachment'],
                    'table_name' => 'tesws_attachments'
                );
                $clearingAgentsInfo = array(
                    'address' => $initialContent['clearingAgent']['address'],
                    'countryCode' => $initialContent['clearingAgent']['countryCode'],
                    'name' => $initialContent['clearingAgent']['name'],
                    'tin' => $initialContent['clearingAgent']['tin'],
                    'table_name' => 'tesws_clearingagents'
                );
                $exportersInfo = array(
                    'address' => $initialContent['exporter']['address'],
                    'countryCode' => $initialContent['exporter']['countryCode'],
                    'name' => $initialContent['exporter']['name'],
                   // 'tin' => $initialContent['exporter']['tin'],
                    'table_name' => 'tesws_exporters'
                );
                $importersInfo = array(
                    'address' => $initialContent['importer']['address'],
                    'countryCode' => $initialContent['importer']['countryCode'],
                    'name' => $initialContent['importer']['name'],
                    //'tin' => $initialContent['importer']['tin'],
                    'table_name' => 'tesws_importers'
                );
                $agentResponse = $this->savePermitApplicationDetails($clearingAgentsInfo);
                
                $exportersResponse = $this->savePermitApplicationDetails($exportersInfo);
                $importersResponse = $this->savePermitApplicationDetails($importersInfo);
                $applicationInfo['importers'] = $importersResponse['itemId'];
                $applicationInfo['exporters'] = $exportersResponse['itemId'];
                $applicationInfo['clearingAgents'] = $agentResponse['itemId'];
                $saveResponse = $this->savePermitApplicationDetails($applicationInfo);
                
                $savedApplicationId = $saveResponse['itemId'];
                
                $attachmentsInfo['general_info_id'] = $savedApplicationId;
                //clear documents if exists
                $attachment_record = DB::table('tesws_attachments')->where('general_info_id',$savedApplicationId)->get();
                if($attachment_record){
                    DB::table('tesws_attachments')->where('general_info_id',$savedApplicationId)->delete();
                }
                $saveResponse = $this->saveAttachmentDetails($attachmentsInfo);

                $itemsInfo = array(
                    'items' => $initialContent['items']['item'],
                    'general_info_id' => $savedApplicationId
                );
                //clear products if exists
                $prod_record = DB::table('tesws_permitsgeneral_products')->where('general_info_id',$savedApplicationId)->get();
                if($prod_record){
                    DB::table('tesws_permitsgeneral_products')->where('general_info_id',$savedApplicationId)->delete();
                }
                $saveResponse = $this->receivePermitProductDetails($itemsInfo);
                
                $message =  'Application has been received successfully';
                $ack = new Tesws\Model\Acknowledgement([
                    'message' => 'Application has been received successfully',
                    'status' => '7101'
                ]);
                $res = Tesws\Xml::buildXmlFromArray($ack->getXmlArray());
                $responseHeaders = [
                    'content-type' => 'application/xml'
                ];
                
                $signature->signResponse($responseHeaders, $res,  self::KEY_ID);
                return response($res, 200, $responseHeaders)->send();
            }
        } catch (\Exception $exception) {
            $status = '7201';
            $message = $exception->getMessage();
            //error logs for single window
        } catch (\Throwable $throwable) {
            $status = '7201';
            $message = $throwable->getMessage();
            
        }
        
        $ack = new Tesws\Model\Acknowledgement([
                   'message' => $message,
                    'status' => 7201
                ]);
                $res = Tesws\Xml::buildXmlFromArray($ack->getXmlArray());
                $responseHeaders = [
                    'content-type' => 'application/xml'
                ];
                $signature->signResponse($responseHeaders, $res,  self::KEY_ID);
        
        return response($res, 201, $responseHeaders)->send();
        
    }
    function saveConsigneeData($record_id,$table_name){
        $rec = DB::table($table_name)->where('id',$record_id)->first();
        $consignee_id = 0;
        
        if($rec){
             $country_id = getSingleRecordColValue('par_countries', array('code' => $rec->countryCode), 'id');
                            
            $data = array('name'=>$rec->name,
                        'postal_address'=>$rec->address,
                        'tin_no'=>$rec->tin,
                        'country_id'=>$country_id
                    );
            $where = array('name'=>$rec->name,
                        'tin_no'=>$rec->tin,
                        'country_id'=>$country_id
                    );
                    
            $rec = DB::table('tra_consignee_data')->where($where)->first();
            if(!$rec){
                $consignee_id = DB::table('tra_consignee_data')->insertGetId($data);
                    
            }
            else{
                $consignee_id = $rec->id;
                
            }
            
        }
        
        return $consignee_id;
        
    }
    function saveSenderReceiver($record_id,$table_name){
        
        $rec = DB::table($table_name)->where('id',$record_id)->first();
        $sender_receiver_id = 0;
        
        if($rec){
             $country_id = getSingleRecordColValue('par_countries', array('code' => $rec->countryCode), 'id');
                            
            $data = array('name'=>$rec->name,
                        'postal_address'=>$rec->address,
                        'tin_no'=>$rec->tin,
                        'country_id'=>$country_id
                    );
            $where = array('name'=>$rec->name,
                        'tin_no'=>$rec->tin,
                        'country_id'=>$country_id
                    );
                    
            $rec = DB::table('tra_permitsenderreceiver_data')->where($where)->first();
            if(!$rec){
                $sender_receiver_id = DB::table('tra_permitsenderreceiver_data')->insertGetId($data);
                    
            }
            else{
                $sender_receiver_id = $rec->id;
                
            }
            
        }
        
        return $sender_receiver_id;
        
    }
    function saveApplicantDetails($agent_id){
        $rec = DB::table('tesws_clearingagents')->where('id',$agent_id)->first();
        $applicant_id = 0;
        if($rec){
            
            $data = array('name'=>$rec->name,
                        'postal_address'=>$rec->address,
                        'tin_no'=>$rec->tin,
                        'country_id'=>36
                    );
            $where = array('name'=>$rec->name,
                //      'postal_address'=>$rec->address, comment the porta address for duplicatfunction rece
                
                        'tin_no'=>$rec->tin,
                        'country_id'=>36
                    );
            $rec = DB::table('wb_trader_account')->where($where)->first();
            if(!$rec){
                $identification_no = generateTraderNo('wb_trader_account');
                $data['identification_no'] = $identification_no;
                DB::connection('portal_db')->table('wb_trader_account')->insert($data);
                $applicant_id = DB::table('wb_trader_account')->insertGetId($data);
                    
            }
            else{
                $applicant_id = $rec->id;
                
            }
            
        }
        return $applicant_id;
    }
    function updateQueryResponse($application_code, $amendmentResponse){
        $record = DB::table('checklistitems_responses as t1')
                        ->join('checklistitems_queries as t15','t1.id','t15.item_resp_id')
                        ->select('t15.id as query_id')
                        ->where(array('t1.application_code'=>$application_code, 't15.status'=>1))
                        ->first();
        if($record){
            $query_id = $record->query_id;
            
            $data = array('response'=>$amendmentResponse, 'query_id'=>$query_id);
            DB::table('checklistitems_queryresponses')->insert($data);
            
            DB::table('checklistitems_queries')
                ->where(array('application_code'=>$application_code, 'status'=>1))
                ->update(array('status'=>2,'comment'=>'Single Window Query response'));
                
        }
    }
    public function processDeclaredImportExportapps(Request $req){
        try{
            $res= '';
            $module_id = 20;
            $user_id = 585;
            $permit_declaration_id = $req->permit_declaration_id;
            $application_code = $req->application_code;
            
            $declared_record = DB::table('tesws_permitsgeneral_information');
            if(validateIsNumeric($permit_declaration_id)){
                $declared_record->where(array('id'=>$permit_declaration_id));
                
            }
            else{
                $declared_record->where(array('permitsubmission_status_id'=>1));
            }
            
            if(validateIsNumeric($application_code)){
                $declared_record->where(array('application_code'=>$application_code));
                
            }
            $declared_record = $declared_record->get();
            
            if($declared_record){
            
                    foreach($declared_record as $rec){
                        $teswsapplication_id =$rec->id; 
                        $application_code =$rec->application_code; 
                        $applicationStatus =$rec->applicationStatus; 
                        $amendmentResponse =$rec->amendmentResponse; 
                        $tansadNumber = $rec->tansadNumber;
                        //check if the application exists 13 currencyCode
                        $section_id  = getSingleRecordColValue('par_teswspermit_sections', array('code' => $rec->documentCode), 'section_id');
                        if(!validateIsNumeric($section_id)){
                            $section_id = 2;//by default
                        }
                        if($applicationStatus == 'submitted'){
                            $current_status_id = 2;
                            $application_status_id = 1;
                        }
                        else{
                            $current_status_id = 13;
                            $application_status_id = 8;
                        }
                        //update the queries 
                        $this->updateQueryResponse($application_code, $amendmentResponse);
                        
                        $app_records = DB::table('tra_importexport_applications')->where('application_code',$application_code)->first();
                        $port_id = 0;
                             $port_id = getSingleRecordColValue('par_ports_information', array('tesws_portcode' => $rec->entryOfficeCode), 'id');
                              $curency_id = getSingleRecordColValue('par_currencies', array('code' => $rec->currencyCode), 'id');
                             if(!validateIsNumeric($curency_id)){
                                $data = array('name'=>$rec->currencyCode, 'description'=>$rec->currencyCode,'created_on'=>Carbon::now(),'code'=>$rec->currencyCode, 'created_by'=>$user_id);
                                 $resp = insertRecord('par_currencies', $data, $user_id);
                              
                              $curency_id = $resp['record_id']; 
                              
                            }
                        if($app_records && validateIsNumeric($application_code)){
                            //update the records 
                            $tracking_no =$app_records->tracking_no; 
                            $view_id =$app_records->view_id; 
                            $reference_no =$app_records->reference_no; 
                            
                            if($rec->regimeCode == 'IM' && $rec->destinationCountryCode != 'TZ' ){
                                $sub_module_id = 65;
                            }
                            else{
                                $sub_module_id = 66;
                            }
                            $consignee_id = 0;
                            if( $rec->destinationCountryCode != 'TZ'){
                                $sender_receiver_id = $this->saveSenderReceiver($rec->exporters,'tesws_exporters');
                                $consignee_id = $this->saveConsigneeData($rec->importers,'tesws_importers');
                            }
                            else{
                                $sender_receiver_id = $this->saveSenderReceiver($rec->exporters,'tesws_importers');
                                $consignee_id = $this->saveConsigneeData($rec->importers,'tesws_exporters');
                            }
                            
                            $applicant_id = $this->saveApplicantDetails($rec->clearingAgents);
                            
                            
                             $permit_reason_id = getSingleRecordColValue('par_permit_reasons', array('tesws_code_id' => $rec->permitReason), 'id');
                            
                            $permit_type_id = getSingleRecordColValue('par_teswspermit_types', array('code' => $rec->permitType), 'id');
                            
                              $app_data = array('section_id'=>$section_id,
                                    'sub_module_id'=>$sub_module_id,
                                    'module_id'=>$module_id,
                                    'permit_type_id'=>$permit_type_id,
                                    'section_id'=>$section_id,
                                    'permit_category_id'=>0,
                                    'permit_reason_id'=>$permit_reason_id,
                                    'port_id'=>$port_id,
                                    'application_status_id'=>$application_status_id,
                                    'view_id'=>$view_id,
                                    'proforma_invoice_no'=>$rec->invoiceNumber,
                                    'tansadNumber'=>$rec->tansadNumber,
                                    'proforma_invoice_date'=>formatDate($rec->invoiceDate),
                                    'proforma_currency_id'=>$curency_id,
                                    'consignee_options_id'=>2,
                                    'sender_receiver_id'=>$sender_receiver_id,
                                    'previous_permit_no'=>$rec->previous_permit_no,
                                    'prev_paycntrnum'=>$rec->prev_paycntrnum,
                                    'consignee_id'=>$consignee_id,
                                    'zone_id'=>2,
                                    'applicant_id'=>$applicant_id
                                );
                            $zone_id = 2;
                            
                            $where = array(
                                't1.module_id' => $module_id,
                                't1.sub_module_id' => $sub_module_id,
                                't1.section_id' => $section_id
                            );
//table_name
                            $rec = DB::table('wf_tfdaprocesses as t1')
                                            ->join('wf_workflow_stages as t2', 't1.workflow_id','=','t2.workflow_id')
                                            ->where($where)
                                            ->select('t2.id as current_stage','t1.id as process_id')
                                            ->where('stage_status',1)
                                            ->first();
                            $process_id =$rec->process_id;
                            
                            $application_details = (object)array('zone_id'=>2,
                                                         'section_id'=>$section_id,
                                                         'sub_module_id'=>$sub_module_id
                                                        );
                            
                            $app_data['application_code'] = $application_code;
                            $app_data['tracking_no'] = $tracking_no;
                            //details 
                            $app_data['created_by'] = $user_id;
                            $app_data['created_on'] = Carbon::now();
        
                             $app_where = array('application_code'=>$application_code);
                              $appprev_data = getPreviousRecords('tra_importexport_applications', $app_where);
                              
                              $res = updateRecord('tra_importexport_applications', $appprev_data['results'], $app_where,$app_data, $user_id);
                            
                            $active_application_id = $res['record_id'];
                            
                            //save permits products 
                            $attachment_record = DB::table('tra_permits_products')->where('application_code',$application_code)->get();
                            if($attachment_record){
                                DB::table('tra_permits_products')->where('application_code',$application_code)->delete();
                            }
                            $this->savePermitsProductDetails($application_code,$teswsapplication_id,$curency_id,$user_id );
                            $attachment_record = DB::table('tra_application_uploadeddocuments')->where('application_code',$application_code)->get();
                            if($attachment_record){
                                DB::table('tra_application_uploadeddocuments')->where('application_code',$application_code)->delete();
                            }
                            $this->savePermitsuploadedDocuments($application_code,$teswsapplication_id,$user_id);
                            
                            
                            $onlinesubmission_data  = array('application_code'=>$application_code,
                                    'tracking_no'=>$tracking_no,
                                    'reference_no'=>$reference_no,
                                    'application_id'=>$active_application_id,
                                    'prodclass_category_id'=>0,
                                    'view_id'=>$view_id,
                                    'process_id'=>$rec->process_id,
                                    'current_stage'=>$rec->current_stage,
                                    'module_id'=>$module_id,
                                    'sub_module_id'=>$sub_module_id,
                                    'section_id'=>$section_id,
                                    'application_status_id'=>$current_status_id,
                                    'remarks'=>'Tesws Integration Permit Submission',
                                    'applicant_id'=>$applicant_id,
                                    'is_notified'=>0,
                                    'status_type_id'=>1,
                                    'tansadNumber'=>$tansadNumber,
                                    'onlinesubmission_status_id'=>1,
                                    'zone_id'=>$zone_id,
                                    'date_submitted'=>Carbon::now(),
                                    'created_on'=>Carbon::now(),
                                    'created_by'=>$user_id
                            );
                               
                           
                            $resp =  insertRecord('tra_onlinesubmissions', $onlinesubmission_data, $user_id);
                            
                            $res['active_application_id'] = $active_application_id;
                            $res['application_code'] = $application_code;
                            $res['tracking_no'] = $tracking_no;
                            $res = array('success'=>true, 
                                'message'=>'Sapplication Saved Successfully'
                            );
                            $data = array('permitsubmission_status_id'=>2, 'application_code'=>$application_code);
                            $where = array('id'=>$teswsapplication_id);
                            DB::table('tesws_permitsgeneral_information')->where($where)->update($data);
                            
                        }
                        else{
                             
                            if($rec->regimeCode == 'IM' && $rec->destinationCountryCode != 'TZ' ){
                                $sub_module_id = 65;
                            }
                            else{
                                $sub_module_id = 66;
                            }
                            $consignee_id = 0;
                            if( $rec->destinationCountryCode != 'TZ'){
                                $sender_receiver_id = $this->saveSenderReceiver($rec->exporters,'tesws_exporters');
                                $consignee_id = $this->saveConsigneeData($rec->importers,'tesws_importers');
                            }
                            else{
                                $sender_receiver_id = $this->saveSenderReceiver($rec->exporters,'tesws_importers');
                                $consignee_id = $this->saveConsigneeData($rec->importers,'tesws_exporters');
                            }
                            
                            $applicant_id = $this->saveApplicantDetails($rec->clearingAgents);
                            //$section_id = 2;
                            
                             $view_id = generateApplicationViewID(); 
                              $permit_reason_id = getSingleRecordColValue('par_permit_reasons', array('tesws_code_id' => $rec->permitReason), 'id');
                            
                            $permit_type_id = getSingleRecordColValue('par_teswspermit_types', array('code' => $rec->permitType), 'id');
                            
                            
                            
                              $app_data = array('section_id'=>$section_id,
                                    'sub_module_id'=>$sub_module_id,
                                    'module_id'=>$module_id,
                                    'section_id'=>$section_id,
                                    'permit_category_id'=>0,
                                    'permit_type_id'=>$permit_type_id,
                                    'permit_reason_id'=>$permit_reason_id,
                                    'port_id'=>$port_id,
                                    'view_id'=>$view_id,
                                    'application_status_id'=>$application_status_id,
                                    'tansadNumber'=>$rec->tansadNumber,
                                    'previous_permit_no'=>$rec->previous_permit_no,
                                    'proforma_invoice_no'=>$rec->invoiceNumber,
                                    'proforma_invoice_date'=>formatDate($rec->invoiceDate),
                                    'proforma_currency_id'=>$curency_id,
                                    'consignee_options_id'=>2,
                                     'previous_permit_no'=>$rec->previous_permit_no,
                                    'prev_paycntrnum'=>$rec->prev_paycntrnum,
                                    
                                    'sender_receiver_id'=>$sender_receiver_id,
                                    'consignee_id'=>$consignee_id,
                                    'zone_id'=>2,
                                    'applicant_id'=>$applicant_id
                                );
                            $zone_id = 2;
                            
                            $where = array(
                                't1.sub_module_id' => $sub_module_id,
                                't1.section_id' => $section_id
                            );
//table_name
                            $rec = DB::table('wf_tfdaprocesses as t1')
                                            ->join('wf_workflow_stages as t2', 't1.workflow_id','=','t2.workflow_id')
                                            ->where($where)
                                            ->select('t2.id as current_stage','t1.id as process_id')
                                            ->where('stage_status',1)
                                            ->first();
                            $process_id =$rec->process_id;
                            
                            
                            $application_code = generateApplicationCode($sub_module_id, 'tra_importexport_applications');
                            
                            $application_details = (object)array('zone_id'=>2,
                                                         'section_id'=>$section_id,
                                                         'sub_module_id'=>$sub_module_id
                                                        );
                            $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id');
                            $codes_array = $this->getImportExpApplicationReferenceCodes($application_details);
                            $tracking_details = generateApplicationTrackingNumber($sub_module_id, $ref_id, $codes_array, $process_id, $zone_id, $user_id);
                            if ($tracking_details['success'] == false) {
                                    $tracking_no = '';
                            }
                            else{
                                $tracking_no = $tracking_details['tracking_no'];
                            }
                            
                            
                            $app_data['application_code'] = $application_code;
                            $app_data['tracking_no'] = $tracking_no;
                            //details 
                            $app_data['created_by'] = $user_id;
                            $app_data['created_on'] = Carbon::now();
        
                            
                            $res = insertRecord('tra_importexport_applications', $app_data, $user_id);
                           
                            $active_application_id = $res['record_id'];
                            
                            generateApplicationRefNumber($active_application_id, 'tra_importexport_applications', $sub_module_id,  1, $codes_array, $process_id, 2, $user_id,$module_id,$section_id);
                            //save permits products 
                            
                            $this->savePermitsProductDetails($application_code,$teswsapplication_id,$curency_id,$user_id );
                            $this->savePermitsuploadedDocuments($application_code,$teswsapplication_id,$user_id);
                            //add to submissions table
                            
                            //ensure its set
                         $reference_no = getSingleRecordColValue('tra_importexport_applications', array('id' => $active_application_id), 'reference_no');
                            $current_status_id = 2;
                            
                            DB::table('tra_importexport_applications')
                            ->where(array('application_code'=>$application_code))
                            ->update(array('tracking_no'=>$reference_no));
                            
                            $onlinesubmission_data  = array('application_code'=>$application_code,
                                    'tracking_no'=>$reference_no,
                                    'reference_no'=>$reference_no,
                                    'application_id'=>$active_application_id,
                                    'prodclass_category_id'=>0,
                                    'view_id'=>$view_id,
                                    'process_id'=>$rec->process_id,
                                    'current_stage'=>$rec->current_stage,
                                    'module_id'=>$module_id,
                                    'sub_module_id'=>$sub_module_id,
                                    'section_id'=>$section_id,
                                    'application_status_id'=>$current_status_id,
                                    'remarks'=>'Single Window Integration Permit Declaration',
                                    'applicant_id'=>$applicant_id,
                                    'is_notified'=>0,
                                    'status_type_id'=>1,'tansadNumber'=>$tansadNumber,
                                    'onlinesubmission_status_id'=>1,
                                    'zone_id'=>$zone_id,
                                    'date_submitted'=>Carbon::now(),
                                    'created_on'=>Carbon::now(),
                                    'created_by'=>$user_id
                            );
                               
                           
                            $resp =  insertRecord('tra_onlinesubmissions', $onlinesubmission_data, $user_id);
                            
                            $res['active_application_id'] = $active_application_id;
                            $res['application_code'] = $application_code;
                            $res['tracking_no'] = $tracking_no;
                            $res = array('success'=>true, 
                                'message'=>'Sapplication Saved Successfully'
                            );
                            $data = array('permitsubmission_status_id'=>2, 'application_code'=>$application_code);
                            $where = array('id'=>$teswsapplication_id);
                            DB::table('tesws_permitsgeneral_information')->where($where)->update($data);
                            
                        }
                        
                    }
                $res = array('success'=>true, 
                            'message'=>'Application pushed for processing successfully'
                            );
            }
            else{
                $res = array('success'=>false, 
                            'message'=>'Not Application Found'
                            );
            }
            
        } catch (\Exception $exception) {
            $status = '7201';
            $message = $exception->getMessage();
            $res = array('success'=>false, 
                            'message'=>$message,
                            //'res'=>$res,
                            );
        } catch (\Throwable $throwable) {
            $status = '7201';
            $message = $throwable->getMessage();
            $res = array('success'=>false, 
                            'message'=>$message,
                            'res'=>$res
                            );
            
        }
             return response()->json($res);
        
        
    }
    
    function savePermitsProductDetails($application_code,$teswsapplication_id,$currency_id,$user_id){
            $records = DB::table("tesws_permitsgeneral_products")
                        ->where('general_info_id',$teswsapplication_id)
                        ->get();

            if($records){
                foreach($records as $rec){
                    $packaging_unit_id = getSingleRecordColValue('par_packaging_units', array('name' => $rec->quantityUnitCode), 'id');
                    if(!validateIsNumeric($packaging_unit_id)){
                        $data = array('name'=>$rec->quantityUnitCode, 'description'=>$rec->quantityUnitCode,'created_on'=>Carbon::now(), 'created_by'=>$user_id);
                         $resp = insertRecord('par_packaging_units', $data, $user_id);
                      
                      $packaging_unit_id = $resp['record_id']; 
                      
                    }
                    
                    $data = array('quantity'=>$rec->quantity,
                                  'unit_price'=>$rec->unitPrice, 
                                  'currency_id'=>$currency_id,
                                  'application_code'=>$application_code,
                                  'packaging_unit_id'=>$packaging_unit_id,
                                  'permitbrand_name'=>$rec->brandName,
                                  'permitcommon_name'=>$rec->goods1HsDescription,
                                  'producths_code'=>$rec->hsCode,
                      );
                      
                      
                      $attachment_record = DB::table('tra_permits_products')->where($data)->count();
                    
                            if($attachment_record < 1){
                                $data['created_by'] = $user_id;
                                  $data['created_on'] = Carbon::now();
                                  $resp = insertRecord('tra_permits_products', $data, $user_id);
                                  
                                  $record_id = $resp['record_id'];
                            }
                       
                      
                }
            }

    }
  
    function savePermitsuploadedDocuments($application_code,$teswsapplication_id,$user_id){
        $records = DB::table("tesws_attachments")
                    ->where('general_info_id',$teswsapplication_id)
                    ->get();
        if($records){
            foreach($records as $rec){
                $document_code = substr($rec->name, 0, 3);
                $document_name = getSingleRecordColValue('tesws_documents_codes', array('code' => $document_code), 'name');
                $document_extension = getfile_extension($rec->name);
                if($document_name != ''){
                    $file_name = $document_name.'.'.$document_extension;
                
                }
                else{
                    $file_name = $rec->name;
                }
                $data = array('document_external_url'=>$rec->url,
                              'uploaded_on'=> Carbon::now(), 
                              'uploaded_by'=>$user_id,
                              'application_code'=>$application_code,
                              'file_name'=>$file_name,
                              'initial_file_name'=>$rec->name,
                              'fileSize'=>$rec->size,
                              'file_type'=>$rec->filetype
                  );//0705202101 
                 
                  $record = DB::table('tra_application_uploadeddocuments')->where($data)->first();
                  if(!$record){
                        $data['created_by'] = $user_id;
                        $data['created_on'] = Carbon::now();
                        $resp = insertRecord('tra_application_uploadeddocuments', $data, $user_id);
                        $record_id = $resp['record_id'];
                  }
                    
            }
        }
        
}
    public function savePermitApplicationDetails($applicationData){
        try {
            $table_name = $applicationData['table_name'];
            unset($applicationData['table_name']);
            if($table_name === 'tesws_importers' || $table_name === 'tesws_exporters' || 
                $table_name === 'tesws_clearingagents' || $table_name === 'tesws_inspection_bookings'){      
                $itemId = $this->saveReceivedData($table_name, $applicationData);
            }else{
                $itemId = $this->saveReceivedData($table_name, $applicationData);
            }
            
            $res = array(
                'success' => true,
                'itemId' => $itemId['itemId']
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
    
    public function saveAttachmentDetails($applicationData){
        try {
            
            $table_name = $applicationData['table_name'];
            unset($applicationData['table_name']);
            $general_info_id = $applicationData['general_info_id'];
            unset($applicationData['general_info_id']);
            
            for ($i=0; $i < count($applicationData['attachments']); $i++) {
            
                if(count($applicationData['attachments']) ==1){
                     $attachmentsInfo = array(
                        'name' => $applicationData['attachments']['name'],
                        'url' => $applicationData['attachments']['url'],
                        'general_info_id' => $general_info_id,
                        'created_at' => Carbon::now()
                    );
                        
                }
                
                else if(isset($applicationData['attachments']['name'])){
                    $attachmentsInfo = array(
                            'name' => $applicationData['attachments']['name'],
                            'url' => $applicationData['attachments']['url'],
                            'general_info_id' => $general_info_id,
                            'created_at' => Carbon::now()
                        );
                    
                }
                else {
                
                     $attachmentsInfo = array(
                            'name' => $applicationData['attachments'][$i]['name'],
                            'url' => $applicationData['attachments'][$i]['url'],
                            'general_info_id' => $general_info_id,
                            'created_at' => Carbon::now()
                        );
                        
                }
               
                $itemId = $this->saveReceivedData($table_name, $attachmentsInfo);
            }
            $res = array(
                'success' => true,
                'itemId' => $itemId['itemId']
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
    public function requestPermitsBillCancellation(Request $req,Tesws\Api $api ){
        try{
            
            $records = DB::table('tesws_permitsgeneral_information as t1')
                            ->join('tra_importexport_applications as t2','t1.application_code','t2.application_code')
                            ->join('tra_application_invoices as t4','t1.application_code','t4.application_code')
                            ->select(DB::raw("t4.id as bill_id,t1.applicationReference as application_reference, t4.PayCntrNum"));//
                            
            $permit_declaration_id = $req->permit_declaration_id;
            if(validateIsNumeric($permit_declaration_id)){
                $records->where(array('t1.id'=>$permit_declaration_id));
            }
            $application_code = $req->application_code;
            if(validateIsNumeric($application_code)){
                $records->where(array('t2.application_code'=>$application_code));
            }
            $tansadNumber = $req->tansadNumber;
            if($tansadNumber != ''){
                $records->where(array('t1.tansadNumber'=>$tansadNumber));
            }
            $records = $records->get();
            
            
                //Expected address or apiErrorResponse
                if($records){
                    foreach($records as $rec){
                        
                        $results = $api->billing()->paymentNotice(new Tesws\Model\CancelBill([
                                'application_reference' => $application_reference,
                                'attachment_url' => '',
                                'bill_id' => $rec->bill_id,
                                'description' => 'Bill Cancellation on wrong generation',
                                'pay_ctr_num' => $rec->PayCntrNum
                        ]));
                        
                        
                        if (!$result->success) {
                            Log::error($result);
                            
                        }
                        
                        $res = $result;
                        $responses_data = array('application_code'=>$application_code, 
                                                'responses'=>$results, 
                                                'created_on'=>Carbon::now());
                        insertRecord('tesws_approval_notificationsresponses', $responses_data, '');
                        //insertRecord('tesws_approval_notificationsresponses', $results, '');
                        return response()->send($result);
                        exit();
                        
                    }
                }else{
                    $res = array('success'=>false, 'message'=>'Application Not found');
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
            print_r($res);
            
        
        
    }
    public function confirmInspectionBookings(Request $req){
        try{
            $application_code = $req->application_code;
            $inspectionbooking_id = $req->inspectionbooking_id;
            $app_where = array('id'=>$inspectionbooking_id,'application_code'=>$application_code);
            $user_id =0;
            $record = DB::table('tesws_inspection_bookings')
                        ->where($app_where)
                        ->first();
            if($record){
                $app_data = array('inspectionbooking_status_id'=>2,'bookingconfirmedon'=>Carbon::now(), 'dola'=> Carbon::now());
                 $appprev_data = getPreviousRecords('tesws_inspection_bookings', $app_where);
                              
                $res = updateRecord('tesws_inspection_bookings', $appprev_data['results'], $app_where,$app_data, $user_id);
                
            }
            else{
                $res = array('success'=>true,'message'=>'Inspection Booking details not found');
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
    public function submitPermitInspectionRecommentations(Request $req,Tesws\Api $api ){
        try{
            
            $records = DB::table('tesws_permitsgeneral_information as t1')
                            ->join('tra_importexport_applications as t2','t1.application_code','t2.application_code')
                            ->join('tesws_inspection_bookings as t4','t1.application_code','t4.application_code')
                            ->leftJoin('users as t3','t2.permitverified_by','t3.id')
                            ->select(DB::raw("t1.id,t1.application_code, t2.permit_verificationstatus_id, CONCAT_WS(' ',decrypt(t3.first_name),decrypt(t3.last_name)) as  inspectedBy, t4.bookingId,t2.verification_remarks, t2.permit_verified_on"))
                            ->where('permitsubmission_status_id','!=',5);//
                            
            $permit_declaration_id = $req->permit_declaration_id;
            if(validateIsNumeric($permit_declaration_id)){
                $records->where(array('t1.id'=>$permit_declaration_id));
                
            }
            $application_code = $req->application_code;
            if(validateIsNumeric($application_code)){
                $records->where(array('t2.application_code'=>$application_code));
                
            }
                $tansadNumber = $req->tansadNumber;
            if($tansadNumber != ''){
                $records->where(array('t1.tansadNumber'=>$tansadNumber));
            }
            
            $records = $records->get();
                //Expected address or apiErrorResponse
                if($records){
                    foreach($records as $rec){
                        $permit_verificationstatus_id = $rec->permit_verificationstatus_id;
                        if(validateIsNumeric($permit_verificationstatus_id)){
                            if($permit_verificationstatus_id == 1 || $permit_verificationstatus_id == 2){
                                $conformity = 'CONFORMED';
                            }
                            else{
                                $conformity = 'NON_CONFORMED';
                                
                            }
                        
                        //$generated_date =  DateTime::createFromFormat(DateTime::ISO8601,date('Y-m-d\TH:i:s\Z',strtotime($rec->generated_date))); 
                
                        $permit_verified_on = DateTime::createFromFormat(DateTime::ISO8601,date('Y-m-d\TH:i:s\Z',strtotime($rec->permit_verified_on)) );
                    
                        $inspection_response = new Tesws\Model\InspectionResult([
                            'conformity' => $conformity,
                            'remarks' => $rec->verification_remarks,
                            //'resultDocumentURL' => '',
                            'bill_of_lading' =>'',
                            'booking_id' => $rec->bookingId,
                            'approved_by' => $rec->inspectedBy,
                            'approved_date' => $permit_verified_on,
                            'inspected_by' => $rec->inspectedBy,
                            'comments' => $rec->verification_remarks
                        ]);
                        
                        
                        $results = $api->inspectionResult()->submit(
                                $inspection_response
                        );
                        if (!$results->success) {
                            Log::error($results);
                            
                        }else{
                            $teswspermitsubmission_statuse_id = 5;
                            DB::table('tesws_permitsgeneral_information')
                            ->where(array('id'=>$rec->id))
                            ->update(array('permitsubmission_status_id'=>$teswspermitsubmission_statuse_id));
                            DB::table('tesws_inspection_bookings')
                            ->where(array('application_code'=>$rec->application_code))
                            ->update(array('inspectionbooking_status_id'=>3));
                            
                            $res = $results;
                            $responses_data = array('application_code'=>$rec->application_code, 
                                                    'responses'=>$results, 
                                                    'created_on'=>Carbon::now());
                            insertRecord('tesws_approval_notificationsresponses', $responses_data, '');
                            
                        }
                        
                        return response()->send($results);
                        //exit();
                            
                        }
                        else{
                            
                            print_r('Permit Inspection not verified, verify on the POE to proceed');
                            $res = array('success'=>false, 'message'=>'Permit Inspection not verified, verify on the POE to proceed');
                        }
                        
                        
                    }
                }else{
                    $res = array('success'=>false, 'message'=>'Application Not found');
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
            print_r($res);
            
    }
    public function permitApprovalNotification(Request $req,Tesws\Api $api)
    {
    $res = "No Application found";
        try {
            $records = DB::table('tesws_permitsgeneral_information as t1')
                            ->join('tra_importexport_applications as t2','t1.application_code','t2.application_code')
                            ->leftJoin('tra_managerpermits_review as t3','t1.application_code','t3.application_code')
                            ->leftJoin('users as t4','t3.approved_by','t4.id')
                            ->leftJoin('tra_application_invoices as t5','t1.application_code','t5.application_code')
                            ->leftJoin('tra_invoice_details as t6', 't5.id','t6.invoice_id')
                            ->leftJoin('element_costs as t7', 't6.element_costs_id', 't7.id')
                            ->leftJoin('cost_elements as t8', 't7.element_id', 't8.id')
                            ->leftJoin('par_gl_accounts as t9', 't7.gl_code_id', 't9.id')
                            ->leftJoin('tra_payments as t10','t1.application_code','t10.application_code')
                            ->leftJoin('par_currencies as t11','t6.paying_currency_id','t11.id')
                            ->leftJoin('par_banks as t12','t10.bank_id','t12.id')
                            ->leftJoin('wb_trader_account as t13','t5.applicant_id','t13.id')
                            ->leftJoin('checklistitems_responses as t14','t1.application_code','t14.application_code')
                            ->leftJoin('checklistitems_queries as t15','t14.id','t15.item_resp_id')
                            ->select(DB::raw("t1.*,t1.id as teswsapp_id,CONCAT_WS(' ',decrypt(t4.first_name),decrypt(t4.last_name)) as  approved_by,t5.date_of_invoicing as generated_date, t5.prepared_by as  generated_by,t8.name as cost_element, (t6.total_element_amount*t6.paying_exchange_rate) as total_element_amount, t6.id as bill_id, t9.tfda_code as gfs_code, sum(t10.amount_paid*t10.exchange_rate) as ammount_paid,t11.name as currency_name,  t5.PayCntrNum as control_number,t2.application_status_id, t3.approval_date,t10.trans_date as date_paid, t10.receipt_no, t3.decision_id, t3.comment as approval_comments,t3.comment,t10.transaction_id,t10.applicant_name,t10.payment_ref_no , t12.name as bank_name,t13.email as applicant_email, t13.telephone_no, group_concat(t15.query SEPARATOR ';') as queries_data "))
                            //->where(array('permitsubmission_status_id'=>2))
                            ->whereIn('permitsubmission_status_id', [2,7,8,3,9])
                            //->take(1)
                            ->where(function($query) {
                                $query->whereIn('t2.application_status_id', [2,10,11,14,16, 20,21])
                                ->orWhere('t3.decision_id', '=',2);
                              })->groupBy('t1.application_code');//6,
                $permit_declaration_id = $req->permit_declaration_id;
            if(validateIsNumeric($permit_declaration_id)){
                $records->where(array('t1.id'=>$permit_declaration_id));
                
            }
                
                $application_code = $req->application_code;
            if(validateIsNumeric($application_code)){
                $records->where(array('t2.application_code'=>$application_code));
                
            }
                $tansadNumber = $req->tansadNumber;
            if($tansadNumber != ''){
                $records->where(array('t1.tansadNumber'=>$tansadNumber));
            }
            
            $records = $records->orderBy('t3.id','desc')->get();
            
            if($records){
                
                foreach($records as $rec){
                    
                
                $today = date(DATE_RFC1123);//iso8601
                 $today =new DateTime();//DateTime::createFromFormat(DateTime::ISO8601, '2016-07-27T19:30:00Z');
                 $generated_date =  DateTime::createFromFormat(DateTime::ISO8601,date('Y-m-d\TH:i:s\Z',strtotime($rec->generated_date))); 
                 $approval_date = DateTime::createFromFormat(DateTime::ISO8601,date('Y-m-d\TH:i:s\Z',strtotime($rec->approval_date)) ); 
                
                 $date_paid = DateTime::createFromFormat(DateTime::ISO8601, date('Y-m-d\TH:i:s\Z',strtotime($rec->date_paid)));
                $application_status_id = $rec->application_status_id;                
                $decision_id = $rec->decision_id;                
                $comment = $rec->comment;                
                $teswsapp_id = $rec->teswsapp_id;                
                $application_code = $rec->application_code;              
                 if($decision_id == 1){
                     if($application_status_id == 10){
                         $teswspermitsubmission_statuse_id = 7;
                         $approval_response = new Tesws\Model\ApplicationResponse([
                                'application_reference' => $rec->applicationReference,
                                'attachment_url' => '',
                                'bill' => new Tesws\Model\Bill([
                                    'approved_by' => $rec->approved_by,
                                    'approved_date' => $approval_date,
                                    'description' => $rec->comment,
                                    'generated_by' => $rec->generated_by,
                                    'generated_date' => $generated_date,
                                    'items' => new Tesws\Model\BillItemsWrapper([
                                        'item' => [
                                            new Tesws\Model\BillItem([
                                                'amount' => $rec->total_element_amount,
                                                'bill_id' => $rec->bill_id,
                                                'description' => $rec->cost_element,
                                                'gfs_code' => $rec->gfs_code
                                            ])
                                        ]
                                    ]),
                                    'payment' => new Tesws\Model\PaymentInfo([
                                        //'ammount_paid' => '',
                                        'control_number' => $rec->control_number,
                                        //'date_paid' => '',
                                        'payment_gateway' => Tesws\Model\PaymentInfo::PAYMENT_GATEWAY_GEPG,
                                        'payment_option' => Tesws\Model\PaymentInfo::PAYMENT_OPTION_FULL,
                                        //'receipt_number' =>''
                                    ]),
                                ]),
                                'operation' => 'inspect',
                                //'operation' => ApplicationResponse::OPERATION_APPROVED,
                                'comment_text' => $rec->approval_comments,
                                //'flagged_for_inspection' => true,
                                /*'officer_id' => $rec->,
                                'operation' => Tesws\Model\ApplicationResponse::OPERATION_APPROVED,
                                'reference_serial_no' => $rec->,
                                'reference_tin' => $rec->,
                                'reference_year' => $rec->,
                                'reference_year' => $rec->,*/
                                'tansad_number' => $rec->tansadNumber
                            ]);
                        
                     }
                     else if($application_status_id == 11 || $application_status_id == 20){
                         $teswspermitsubmission_statuse_id = 8;
                        $approval_response = $api->billing()->paymentNotice(new Tesws\Model\PaymentNotice([
                            'bill_amt' => $rec->total_element_amount,
                            'bill_id' => $rec->bill_id,
                            'ccy' =>$rec->currency_name,
                            'ctr_acc_num' => $rec->control_number,
                            'paid_amt' => $rec->ammount_paid,
                            'pay_ctr_num' => $rec->control_number,
                            'pay_ref_id' => $rec->payment_ref_no,
                            'psp_name' => $rec->bank_name,
                            'psp_receipt_number' => $rec->receipt_no,
                            'pyr_cell_num' => $rec->telephone_no,
                            'pyr_email' => $rec->applicant_email,
                            'pyr_name' => $rec->applicant_name,
                            'trx_dt_tm' => $date_paid,
                            'trx_id' => $rec->transaction_id,
                            'usd_pay_chnl' => 'getUsdPayChnl'
                        ]));
                        
                         
                     }
                     else if($application_status_id == 14 || $application_status_id == 6){
                         
                         $teswspermitsubmission_statuse_id = 4;
                         $approval_response = new Tesws\Model\ApplicationResponse([
                                'application_reference' => $rec->applicationReference,
                                'attachment_url' => '',
                                
                                
                                'operation' => 'inspect' ,
                                'flagged_for_inspection' => true,
                                'comment_text' => $rec->approval_comments,
                                
                                'tansad_number' => $rec->tansadNumber
                            ]);
                         
                         
                     }else{
                         
                         $teswspermitsubmission_statuse_id = 5;
                         $approval_response = new Tesws\Model\ApplicationResponse([
                                'application_reference' => $rec->applicationReference,
                                'attachment_url' => '',
                                'bill' => new Tesws\Model\Bill([
                                    'approved_by' => $rec->approved_by,
                                    'approved_date' => $approval_date,
                                    'description' => $rec->comment,
                                    'generated_by' => $rec->generated_by,
                                    'generated_date' => $generated_date,
                                    'items' => new Tesws\Model\BillItemsWrapper([
                                        'item' => [
                                            new Tesws\Model\BillItem([
                                                'amount' => $rec->total_element_amount,
                                                'bill_id' => $rec->bill_id,
                                                'description' => $rec->cost_element,
                                                'gfs_code' => $rec->gfs_code
                                            ])
                                        ]
                                    ]),
                                    'payment' => new Tesws\Model\PaymentInfo([
                                        'ammount_paid' => $rec->ammount_paid,
                                        'control_number' => $rec->control_number,
                                        'date_paid' => $date_paid,
                                        'payment_gateway' => Tesws\Model\PaymentInfo::PAYMENT_GATEWAY_GEPG,
                                        'payment_option' => Tesws\Model\PaymentInfo::PAYMENT_OPTION_FULL,
                                        'receipt_number' => $rec->receipt_no
                                    ]),
                                ]),
                                'operation' => 'inspect' ,
                                //'operation' => ApplicationResponse::OPERATION_APPROVED,
                                'comment_text' => $rec->approval_comments,
                                //'flagged_for_inspection' => true,
                                /*'officer_id' => $rec->,
                                'operation' => Tesws\Model\ApplicationResponse::OPERATION_APPROVED,
                                'reference_serial_no' => $rec->,
                                'reference_tin' => $rec->,
                                'reference_year' => $rec->,
                                'reference_year' => $rec->,*/
                                'tansad_number' => $rec->tansadNumber
                            ]);
                         
                     }
                            
                 }
                 else if($decision_id == 2){
                        $teswspermitsubmission_statuse_id = 10;
                        $approval_response = new Tesws\Model\ApplicationResponse([
                                'application_reference' => $rec->applicationReference,
                                'attachment_url' => '',
                                'operation' =>ApplicationResponse::OPERATION_REJECT,
                                'comment_text' => $rec->approval_comments,
                                /*'bl_number' => $rec->,
                                'clearing_agent_id' => $rec->,
                                'comment_text' => $rec->,
                                'doc_ref_number' => $rec->,
                                'flagged_for_inspection' => true,
                                'officer_id' => $rec->,
                                
                                'reference_serial_no' => $rec->,
                                'reference_tin' => $rec->,
                                'reference_year' => $rec->,'reference_year' => $rec->,*/
                                'tansad_number' => $rec->tansadNumber
                            ]);
                            
                 }
                 else if($decision_id == 4){
                     
                        $teswspermitsubmission_statuse_id = 11;
                        $approval_response = new Tesws\Model\ApplicationResponse([
                                'application_reference' => $rec->applicationReference,
                                //'attachment_url' => '',
                                'operation' =>ApplicationResponse::OPERATION_NULLIFY,
                                'comment_text' =>'Application Nullification '. $rec->approval_comments,
                                'tansad_number' => $rec->tansadNumber
                            ]);
                        
                 }
                 else if($application_status_id == 2){
                    
                     $teswspermitsubmission_statuse_id = 9;
                        $approval_response = new Tesws\Model\ApplicationResponse([
                                'application_reference' => $rec->applicationReference,
                                'attachment_url' => '',
                                'operation' =>ApplicationResponse::OPERATION_INVALIDATE,
                                
                                 'comment_text' => strip_tags($rec->queries_data),
                                'tansad_number' => $rec->tansadNumber
                            ]);
                            
                     
                 }
                //approvedDate
                
                                 
                if($teswspermitsubmission_statuse_id ==8){
                    $results =$approval_response;
                }else{
                        //print_r($approval_response);
                        // exit();
                    $results = $api->applicationResponse()->submit(
                                $approval_response
                        );
                        
                        
                }
                print_r($results);
                
            
                //Expected address or apiErrorResponse
                
                    if (!$results->success) {
                        
                        Log::error($results);
                        $responses_data = array('application_code'=>$application_code, 
                                                'responses'=>$results, 
                                                'created_on'=>Carbon::now());
                        insertRecord('tesws_approval_notificationsresponses', $responses_data, '');
                        return;
                    }
                    else{
                        $responses_data = array('application_code'=>$application_code, 
                                                'responses'=>$results, 
                                                'created_on'=>Carbon::now());
                        insertRecord('tesws_approval_notificationsresponses', $responses_data, '');
                    }
                        
                    $res = array('success'=>true, 'message'=>'Application approval notification sent Successfully');
                    //return response()->send($results);
                    DB::table('tesws_permitsgeneral_information')
                            ->where(array('id'=>$teswsapp_id))
                            ->update(array('permitsubmission_status_id'=>$teswspermitsubmission_statuse_id));
                        
                    
                }
            }else{
                $res = array('success'=>false, 'message'=>'Application Not found');
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
            print_r($res);
    }
   public function receivePermitProductDetails($applicationData){
        try {
            $itemTable = 'tesws_permitsgeneral_products';
            $modelTable = 'tesws_models';
            $general_info_id = $applicationData['general_info_id'];
            unset($applicationData['general_info_id']);
            
            if(isset($applicationData['items']['itemModels']['model'])){
                for ($i=0; $i < count($applicationData['items']); $i++) {
                
                if(isset($applicationData['items']['models'])){
                
                    if(isset($applicationData['items']['models']['models']['specification'])){
                            
                        $itemsInfo = array(
                            'brandName' => $applicationData['items']['models']['models']['specification'],
                            'countryOfOrigin' => $applicationData['items']['countryOfOrigin'],
                            'customValue' => $applicationData['items']['customValue'],
                            'goods1HsDescription' => $applicationData['items']['goods1HsDescription'],
                            'grossWeight' => $applicationData['items']['grossWeight'],
                            'hs4Code' => $applicationData['items']['hs4Code'],
                            'hs8Code' => $applicationData['items']['hs8Code'],
                            'hsCode' => $applicationData['items']['hsCode'],
                            'itemId' => $applicationData['items']['itemId'],
                            'netWeight' => $applicationData['items']['netWeight'],
                            'number' => $applicationData['items']['number'],
                            'quantityUnitCode' => $applicationData['items']['models']['models']['quantityUnitCode'],
                            'quantity' => $applicationData['items']['models']['models']['quantity'],
                            'unitPrice' => $applicationData['items']['models']['models']['unitPrice'],
                            'general_info_id' => $general_info_id
                        );
                        
                        $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                            
                    }
                    else{
                            
                        for ($k=0; $k < count($applicationData['items']['models']['models']); $k++) {
                            
                            $itemsInfo = array(
                                'brandName' => $applicationData['items']['models']['models'][$k]['specification'],
                                'countryOfOrigin' => $applicationData['items']['countryOfOrigin'],
                                'customValue' => $applicationData['items']['customValue'],
                                'goods1HsDescription' => $applicationData['items']['goods1HsDescription'],
                                'grossWeight' => $applicationData['items']['grossWeight'],
                                'hs4Code' => $applicationData['items']['hs4Code'],
                                'hs8Code' => $applicationData['items']['hs8Code'],
                                'hsCode' => $applicationData['items']['hsCode'],
                                'itemId' => $applicationData['items']['itemId'],
                                'netWeight' => $applicationData['items']['netWeight'],
                                'number' => $applicationData['items']['number'],
                                //'packageMarksAndNumbers1' => $applicationData['items'][$i]['packageMarksAndNumbers1'],
                                'quantityUnitCode' => $applicationData['items']['models']['models'][$k]['quantityUnitCode'],
                                'quantity' => $applicationData['items']['models']['models'][$k]['quantity'],
                                'unitPrice' => $applicationData['items']['models']['models'][$k]['unitPrice'],
                                'general_info_id' => $general_info_id
                            );
                            $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                            
                        }
                    }
                    
            
                }
                else{
                    
                    if(isset($applicationData['items'][$i]['models']['models']['specification'])){
                            
                            $itemsInfo = array(
                                'brandName' => $applicationData['items'][$i]['models']['models']['specification'],
                                'countryOfOrigin' => $applicationData['items'][$i]['countryOfOrigin'],
                                'customValue' => $applicationData['items'][$i]['customValue'],
                                'goods1HsDescription' => $applicationData['items'][$i]['goods1HsDescription'],
                                'grossWeight' => $applicationData['items'][$i]['grossWeight'],
                                'hs4Code' => $applicationData['items'][$i]['hs4Code'],
                                'hs8Code' => $applicationData['items'][$i]['hs8Code'],
                                'hsCode' => $applicationData['items'][$i]['hsCode'],
                                'itemId' => $applicationData['items'][$i]['itemId'],
                                'netWeight' => $applicationData['items'][$i]['netWeight'],
                                'number' => $applicationData['items'][$i]['number'],
                                //'packageMarksAndNumbers1' => $applicationData['items'][$i]['packageMarksAndNumbers1'],
                                'quantityUnitCode' => $applicationData['items'][$i]['models']['models']['quantityUnitCode'],
                                'quantity' => $applicationData['items'][$i]['models']['models']['quantity'],
                                'unitPrice' => $applicationData['items'][$i]['models']['models']['unitPrice'],
                                'general_info_id' => $general_info_id
                            );
                            $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                        
                    }
                    else{
                        
                        for ($k=0; $k < count($applicationData['items'][$i]['models']['models']); $k++) {
                            
                        if(isset($applicationData['items'][$i]['models']['models']['specification'])){
                            $itemsInfo = array(
                                'brandName' => $applicationData['items'][$i]['models']['models']['specification'],
                                'countryOfOrigin' => $applicationData['items']['countryOfOrigin'],
                                'customValue' => $applicationData['items'][$i]['customValue'],
                                'goods1HsDescription' => $applicationData['items'][$i]['goods1HsDescription'],
                                'grossWeight' => $applicationData['items'][$i]['grossWeight'],
                                'hs4Code' => $applicationData['items'][$i]['hs4Code'],
                                'hs8Code' => $applicationData['items'][$i]['hs8Code'],
                                'hsCode' => $applicationData['items'][$i]['hsCode'],
                                'itemId' => $applicationData['items'][$i]['itemId'],
                                'netWeight' => $applicationData['items'][$i]['netWeight'],
                                'number' => $applicationData['items'][$i]['number'],
                                //'packageMarksAndNumbers1' => $applicationData['items'][$i]['packageMarksAndNumbers1'],
                                'quantityUnitCode' => $applicationData['items'][$i]['models']['models']['quantityUnitCode'],
                                'quantity' => $applicationData['items'][$i]['models']['models']['quantity'],
                                'unitPrice' => $applicationData['items'][$i]['models']['models']['unitPrice'],
                                'general_info_id' => $general_info_id
                            );
                            $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                
                        }
                        else{
                            
                            $itemsInfo = array(
                                'brandName' => $applicationData['items'][$i]['models']['models'][$k]['specification'],
                                'countryOfOrigin' => $applicationData['items'][$i]['countryOfOrigin'],
                                'customValue' => $applicationData['items'][$i]['customValue'],
                                'goods1HsDescription' => $applicationData['items'][$i]['goods1HsDescription'],
                                'grossWeight' => $applicationData['items'][$i]['grossWeight'],
                                'hs4Code' => $applicationData['items'][$i]['hs4Code'],
                                'hs8Code' => $applicationData['items'][$i]['hs8Code'],
                                'hsCode' => $applicationData['items'][$i]['hsCode'],
                                'itemId' => $applicationData['items'][$i]['itemId'],
                                'netWeight' => $applicationData['items'][$i]['netWeight'],
                                'number' => $applicationData['items'][$i]['number'],
                                //'packageMarksAndNumbers1' => $applicationData['items'][$i]['packageMarksAndNumbers1'],
                                'quantityUnitCode' => $applicationData['items'][$i]['models']['models'][$k]['quantityUnitCode'],
                                'quantity' => $applicationData['items'][$i]['models']['models'][$k]['quantity'],
                                'unitPrice' => $applicationData['items'][$i]['models']['models'][$k]['unitPrice'],
                                'general_info_id' => $general_info_id
                            );
                            $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                
                        }
                        
                    }
                        
                    }
                    
                        
                    
                    
                }
                
            } 
            
                
                
            }
            else{
                for ($i=0; $i < count($applicationData['items']); $i++) {
                
                if(isset($applicationData['items']['models'])){
                
                    if(isset($applicationData['items']['models']['models']['specification'])){
                            
                        $itemsInfo = array(
                            'brandName' => $applicationData['items']['models']['models']['specification'],
                            'countryOfOrigin' => $applicationData['items']['countryOfOrigin'],
                            'customValue' => $applicationData['items']['customValue'],
                            'goods1HsDescription' => $applicationData['items']['goods1HsDescription'],
                            'grossWeight' => $applicationData['items']['grossWeight'],
                            'hs4Code' => $applicationData['items']['hs4Code'],
                            'hs8Code' => $applicationData['items']['hs8Code'],
                            'hsCode' => $applicationData['items']['hsCode'],
                            'itemId' => $applicationData['items']['itemId'],
                            'netWeight' => $applicationData['items']['netWeight'],
                            'number' => $applicationData['items']['number'],
                            'quantityUnitCode' => $applicationData['items']['models']['models']['quantityUnitCode'],
                            'quantity' => $applicationData['items']['models']['models']['quantity'],
                            'unitPrice' => $applicationData['items']['models']['models']['unitPrice'],
                            'general_info_id' => $general_info_id
                        );
                        
                        $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                            
                    }
                    else{
                            
                        for ($k=0; $k < count($applicationData['items']['models']['models']); $k++) {
                            
                            $itemsInfo = array(
                                'brandName' => $applicationData['items']['models']['models'][$k]['specification'],
                                'countryOfOrigin' => $applicationData['items']['countryOfOrigin'],
                                'customValue' => $applicationData['items']['customValue'],
                                'goods1HsDescription' => $applicationData['items']['goods1HsDescription'],
                                'grossWeight' => $applicationData['items']['grossWeight'],
                                'hs4Code' => $applicationData['items']['hs4Code'],
                                'hs8Code' => $applicationData['items']['hs8Code'],
                                'hsCode' => $applicationData['items']['hsCode'],
                                'itemId' => $applicationData['items']['itemId'],
                                'netWeight' => $applicationData['items']['netWeight'],
                                'number' => $applicationData['items']['number'],
                                //'packageMarksAndNumbers1' => $applicationData['items'][$i]['packageMarksAndNumbers1'],
                                'quantityUnitCode' => $applicationData['items']['models']['models'][$k]['quantityUnitCode'],
                                'quantity' => $applicationData['items']['models']['models'][$k]['quantity'],
                                'unitPrice' => $applicationData['items']['models']['models'][$k]['unitPrice'],
                                'general_info_id' => $general_info_id
                            );
                            $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                            
                        }
                    }
                    
            
                }
                else{
                    
                    if(isset($applicationData['items'][$i]['models']['models']['specification'])){
                            
                            $itemsInfo = array(
                                'brandName' => $applicationData['items'][$i]['models']['models']['specification'],
                                'countryOfOrigin' => $applicationData['items'][$i]['countryOfOrigin'],
                                'customValue' => $applicationData['items'][$i]['customValue'],
                                'goods1HsDescription' => $applicationData['items'][$i]['goods1HsDescription'],
                                'grossWeight' => $applicationData['items'][$i]['grossWeight'],
                                'hs4Code' => $applicationData['items'][$i]['hs4Code'],
                                'hs8Code' => $applicationData['items'][$i]['hs8Code'],
                                'hsCode' => $applicationData['items'][$i]['hsCode'],
                                'itemId' => $applicationData['items'][$i]['itemId'],
                                'netWeight' => $applicationData['items'][$i]['netWeight'],
                                'number' => $applicationData['items'][$i]['number'],
                                //'packageMarksAndNumbers1' => $applicationData['items'][$i]['packageMarksAndNumbers1'],
                                'quantityUnitCode' => $applicationData['items'][$i]['models']['models']['quantityUnitCode'],
                                'quantity' => $applicationData['items'][$i]['models']['models']['quantity'],
                                'unitPrice' => $applicationData['items'][$i]['models']['models']['unitPrice'],
                                'general_info_id' => $general_info_id
                            );
                            $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                        
                    }
                    else{
                        
                        for ($k=0; $k < count($applicationData['items'][$i]['models']['models']); $k++) {
                            
                        if(isset($applicationData['items'][$i]['models']['models']['specification'])){
                            $itemsInfo = array(
                                'brandName' => $applicationData['items'][$i]['models']['models']['specification'],
                                'countryOfOrigin' => $applicationData['items']['countryOfOrigin'],
                                'customValue' => $applicationData['items'][$i]['customValue'],
                                'goods1HsDescription' => $applicationData['items'][$i]['goods1HsDescription'],
                                'grossWeight' => $applicationData['items'][$i]['grossWeight'],
                                'hs4Code' => $applicationData['items'][$i]['hs4Code'],
                                'hs8Code' => $applicationData['items'][$i]['hs8Code'],
                                'hsCode' => $applicationData['items'][$i]['hsCode'],
                                'itemId' => $applicationData['items'][$i]['itemId'],
                                'netWeight' => $applicationData['items'][$i]['netWeight'],
                                'number' => $applicationData['items'][$i]['number'],
                                //'packageMarksAndNumbers1' => $applicationData['items'][$i]['packageMarksAndNumbers1'],
                                'quantityUnitCode' => $applicationData['items'][$i]['models']['models']['quantityUnitCode'],
                                'quantity' => $applicationData['items'][$i]['models']['models']['quantity'],
                                'unitPrice' => $applicationData['items'][$i]['models']['models']['unitPrice'],
                                'general_info_id' => $general_info_id
                            );
                            $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                
                        }
                        else{
                            
                            $itemsInfo = array(
                                'brandName' => $applicationData['items'][$i]['models']['models'][$k]['specification'],
                                'countryOfOrigin' => $applicationData['items'][$i]['countryOfOrigin'],
                                'customValue' => $applicationData['items'][$i]['customValue'],
                                'goods1HsDescription' => $applicationData['items'][$i]['goods1HsDescription'],
                                'grossWeight' => $applicationData['items'][$i]['grossWeight'],
                                'hs4Code' => $applicationData['items'][$i]['hs4Code'],
                                'hs8Code' => $applicationData['items'][$i]['hs8Code'],
                                'hsCode' => $applicationData['items'][$i]['hsCode'],
                                'itemId' => $applicationData['items'][$i]['itemId'],
                                'netWeight' => $applicationData['items'][$i]['netWeight'],
                                'number' => $applicationData['items'][$i]['number'],
                                //'packageMarksAndNumbers1' => $applicationData['items'][$i]['packageMarksAndNumbers1'],
                                'quantityUnitCode' => $applicationData['items'][$i]['models']['models'][$k]['quantityUnitCode'],
                                'quantity' => $applicationData['items'][$i]['models']['models'][$k]['quantity'],
                                'unitPrice' => $applicationData['items'][$i]['models']['models'][$k]['unitPrice'],
                                'general_info_id' => $general_info_id
                            );
                            $itemId = $this->saveReceivedData($itemTable, $itemsInfo);
                
                        }
                        
                    }
                        
                    }
                    
                }
                
            } 
            
                
            }
            
            $res = array(
                'success' => true,
                'message'=>'Permits Products Saved Successfully'
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

    public function saveInspectionConfirm(Request $request){
        try {
            $json = json_encode(simplexml_load_string($request->getContent()));
            $initialContent = json_decode($json, true);
            $table_name = 'tesws_inspection_confirmationdto';              
            $inspectionInfo = array(
                'applicationReference' => $initialContent['applicationReference'],
                'cargoKeeper' => $initialContent['cargoKeeper'],
                'confimedBookedDate' => $initialContent['confimedBookedDate'],
                'containerCount' => $initialContent['containerCount'],
                'containerList' => $initialContent['containerList'],
                'station' => $initialContent['station'],
                'tansadNo' => $initialContent['tansadNo'],
                'created_by' => 6,
                'created_at' => Carbon::now()
            );
            $itemId = $this->saveReceivedData($table_name, $inspectionInfo);
            $res = array(
                'success' => true,
                'itemId' => $itemId
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
    
    public function saveInspectionResult(Request $request){
        try {
            $json = json_encode(simplexml_load_string($request->getContent()));
            $initialContent = json_decode($json, true);
            $table_name = 'tesws_inspection_results';              
            $inspectionResultInfo = array(
                'approvedBy' => $initialContent['approvedBy'],
                'approvedDate' => $initialContent['approvedDate'],
                'billOfLading' => $initialContent['billOfLading'],
                'bookingId' => $initialContent['bookingId'],
                'comments' => $initialContent['comments'],
                'conformity' => $initialContent['conformity'],
                'inspectedBy' => $initialContent['inspectedBy'],
                'remarks' => $initialContent['remarks'],
                'resultDocumentURL' => $initialContent['resultDocumentURL'],
                'created_by' => 6,
                'created_at' => Carbon::now()
            );
            $itemId = $this->saveReceivedData($table_name, $inspection_id);            
            for ($i=0; $i < count($initialContent['documents']); $i++) {
                $documentsInfo = array(                
                    'name' => $initialContent['documents']['document'][$i]['name'],
                    'url' => $initialContent['documents']['document'][$i]['url'],
                    'inspection_id' => $inspection_id,
                    'created_by' => 6,
                    'created_at' => Carbon::now()
                );
                $itemId = $this->saveReceivedData($table_name, $documentsInfo);
            }
            $res = array(
                'success' => true,
                'itemId' => $itemId
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
    
    public function saveReceivedData($table_name, $applicationData){
        try {
            if($table_name === 'tesws_importers' || $table_name === 'tesws_exporters' || 
                $table_name === 'tesws_clearingagents'){
                //where data
                $where_data = array(
                  //  'tin' => $applicationData['tin'],
                    'name' => $applicationData['name'],
                    'countryCode' => $applicationData['countryCode']
                );
                if (recordExists($table_name, $where_data)) {
                    $applicationData['updated_by'] = 6;
                    $applicationData['updated_at'] = Carbon::now();
                    DB::table($table_name)->where($where_data)->update($applicationData);
                    $record = DB::table($table_name)->select('id')->where($where_data)->first();
                    $itemId = $record->id;
                    $res = array(
                        'success' => true,
                        'itemId' => $itemId
                    );
                } else {
                    $applicationData['created_by'] = 6;                
                    $applicationData['created_at'] = Carbon::now();                
                    $itemId = DB::table($table_name)->insertGetId($applicationData);
                    
                    $res = array(
                        'success' => true,
                        'itemId' => $itemId
                    );
                }
            }else if($table_name == 'tesws_permitsgeneral_products'){
                 $where_data =$applicationData;
                 if (recordExists($table_name, $where_data)) {
                         $record = DB::table($table_name)->select('id')->where($where_data)->first();
                        $itemId = $record->id;
                        $applicationData['updated_by'] = 6;
                        $applicationData['updated_at'] = Carbon::now();
                        //Update new details
                        DB::table($table_name)->where(array('id'=>$itemId))->update($applicationData);
                       
                        $res = array(
                            'success' => true,
                            'itemId' => $itemId
                        );
                    } else {
                        $applicationData['created_by'] = 6;
                        $applicationData['created_at'] = Carbon::now();
                        $itemId = DB::table($table_name)->insertGetId($applicationData);
                        $res = array(
                            'success' => true,
                            'itemId' => $itemId
                        );
                    }
                
            }else if($table_name == 'tesws_inspection_bookings'){
                 $where_data =$applicationData;
                 if (recordExists($table_name, $where_data)) {
                         $record = DB::table($table_name)->select('id')->where($where_data)->first();
                        $itemId = $record->id;
                        $applicationData['updated_by'] = 6;
                        $applicationData['updated_at'] = Carbon::now();
                        //Update new details
                        DB::table($table_name)->where(array('id'=>$itemId))->update($applicationData);
                       
                        $res = array(
                            'success' => true,
                            'itemId' => $itemId
                        );
                    } else {
                        $applicationData['created_by'] = 6;
                        $applicationData['created_at'] = Carbon::now();
                        $itemId = DB::table($table_name)->insertGetId($applicationData);
                        $res = array(
                            'success' => true,
                            'itemId' => $itemId
                        );
                    }
                
            } else{
                $where_data = array();
                if(isset($applicationData['applicationReference'])){
                    //where data
                    $where_data = array(
                        'applicationReference' => $applicationData['applicationReference']
                    );
                } else if(isset($applicationData['general_info_id'])){
                    //where data
                    
                    $where_data =$applicationData;
                } else {          
                    $applicationData['created_by'] = 6;
                    $applicationData['created_at'] = Carbon::now();
                    $itemId = DB::table($table_name)->insertGetId($applicationData);
                    $res = array(
                        'success' => true,
                        'itemId' => $itemId
                    );
                }
                if(count($where_data) > 0){
                    if (recordExists($table_name, $where_data)) {
                         $record = DB::table($table_name)->select('id')->where($where_data)->first();
                        $itemId = $record->id;
                        $applicationData['updated_by'] = 6;
                        $applicationData['updated_at'] = Carbon::now();
                        //Update new details
                        DB::table($table_name)->where(array('id'=>$itemId))->update($applicationData);
                       
                        $res = array(
                            'success' => true,
                            'itemId' => $itemId
                        );
                    } else {
                        $applicationData['created_by'] = 6;
                        $applicationData['created_at'] = Carbon::now();
                        $itemId = DB::table($table_name)->insertGetId($applicationData);
                        $res = array(
                            'success' => true,
                            'itemId' => $itemId
                        );
                    }
                    
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

}