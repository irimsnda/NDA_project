<?php

namespace Modules\ImportExportApp\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class ImportExportAppController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index()
    {
        return view('importexportapp::index');
    }
	public function saveControlledDrugsImptPermitApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $proforma_currency_id = $req->proforma_currency_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
			$device_type_id = $req->device_type_id;
            $section_id = 14;
            $application_code = $req->application_code;
            $license_application_code = $req->license_application_code;

            $app_data = array(
                                    'sub_module_id'=>$req->sub_module_id,
                                    'module_id'=>$req->module_id, 
                                    'section_id'=>$section_id,
                                    'approximate_dateof_arrival'=>$req->approximate_dateof_arrival,
                                    'license_application_code'=>$req->license_application_code,
                                    'controlled_drugslicense_no'=>$req->controlled_drugslicense_no,
                                    'permit_reason_id'=>$req->permit_reason_id,
                                    'otherpermit_reason'=>$req->otherpermit_reason,
                                    'port_id'=>$req->port_id,
									'has_registered_outlets'=>$req->has_registered_outlets,
                                    'reason_fornonregister_outlet'=>$req->reason_fornonregister_outlet,
									'mode_oftransport_id'=>$req->mode_oftransport_id,
                                    'proforma_invoice_no'=>$req->proforma_invoice_no,
                                    'proforma_invoice_date'=>formatDate($req->proforma_invoice_date),
                                    'paying_currency_id'=>$req->paying_currency_id,
                                    'proforma_currency_id'=>$req->proforma_currency_id,
                                    'sender_receiver_id'=>$req->sender_receiver_id,
                                    'importexport_permittype_id'=>$req->importexport_permittype_id,
                                    'has_apppliedctrdrugs_license'=>$req->has_apppliedctrdrugs_license, 'ordered_by'=>$req->ordered_by,
                                    'qualifications'=>$req->qualifications,
                                    'qualification_license_no'=>$req->qualification_license_no,
                                    'trader_id'=>$trader_id
                                );
                            
                        $table_name = 'wb_importexport_applications';
                        $sub_module_id = $req->sub_module_id;
                        if(validateIsNumeric($application_id)){
                               $where_app = array('id'=>$application_id);
                                if (recordExists('wb_importexport_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    $resp =   updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                  
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                $permittype_code = getSingleRecordColValue('par_importexport_permittypes', array('id' => $req->importexport_permittype_id), 'code','mis_db');
                                $ref_id = 0;
                                if($sub_module_id == 61){
                                    $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'importexport_permittype_id'=>$req->importexport_permittype_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');

                                }
                                else{
                                    $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                }
                               
                                $codes_array = array(
                                    'apptype_code'=>$apptype_code,
                                    'section_code'=>$section_code,
                                    'zone_code'=>$zone_code,
                                    'permittype_code'=>$permittype_code,
                                );
                                        
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                              
                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }
                               $app_data['tracking_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                               $app_data['process_id'] =   $process_id;
                                   
                               $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                              
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                     // initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                        saveApplicationSubmissionDetails($application_code,$table_name);  
                                }
                                //save Permits Import Products 
                                $res =$this->saveCOntrolDrugsImportPermitProducts($license_application_code,$application_code,$trader_email);
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Permit Application Saved Successfully, with Tracking No: '.$tracking_no); 
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Permit Application not saved, it this persists contact the system Administrator');
                         }

                               
                        
        } catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			
			 return response()->json($res, 200);  

    }
	public function getControlledImportPermitsApplicationLoading(Request $req){
        try{
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
            $sub_module_id = $req->sub_module_id;
            $application_status_ids = explode(',',  $application_status_id);
            
            $module_id = 12;
            $section_id = $req->section_id;
$is_orderlocal_supply = $req->is_orderlocal_supply;

            $data = array();

            $records = DB::table('wb_importexport_applications as t1')
                ->select('t1.*','t7.name as action_name','t7.iconCls','t7.action', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                    $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
                ->leftJoin('wb_processstatus_actions as t6',function($join){
                    $join->on('t1.application_status_id', '=', 't6.status_id')
                         ->on('t6.is_default_action', '=', DB::raw(1));
                })
                ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                ->where(array('t1.trader_id' => $trader_id))
                ->orderBy('t1.date_added','desc');
                
                if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                        
                    $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

                }if(validateIsNumeric($sub_module_id)){
                    $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }
                if(validateIsNumeric($module_id)){
                    $records =  $records->where(array('t1.module_id'=>$module_id));
                }
				if($is_orderlocal_supply == 1){
                    $records->whereIn('t1.sub_module_id', [71]);
                }
                else{
                    $records->whereNotIn('t1.sub_module_id', [71]);

                }
                
                //the ilters 
                $records = $records->get();
                $data = $this->getPermitApplications($records);
                $res =array('success'=>true,'data'=> $data);
        }
       catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);

    }

    
    public function getApprovedControlledLicensesApplicationLoading(Request $req){
        try{
            $mistrader_id = $req->mistrader_id;
            $application_status_id = $req->application_status_id;
            
            $application_status_ids = explode(',',  $application_status_id);
            $sub_module_id = $req->sub_module_id;
            $module_id = 12;
            $section_id = $req->section_id;

            $data = array();

            $records = DB::connection('mis_db')->table('tra_importexport_applications as t1')
                ->select(DB::raw("t1.*,t3.name as application_type,t4.name as permit_reason,t5.name as port_name,t6.name as sender_receiver,t7.permit_no as controlled_drugslicense_no,t7.application_code as license_application_code, t1.date_added,t7.approval_date as approved_on  "))
                ->leftJoin('sub_modules as t3', 't1.sub_module_id','=','t3.id')
                ->leftJoin('par_permit_reasons as t4', 't1.permit_reason_id','=','t4.id')
                ->leftJoin('par_ports_information as t5', 't1.port_id','=','t5.id')
                ->leftJoin('tra_permitsenderreceiver_data as t6', 't1.sender_receiver_id','=','t6.id')
                ->leftJoin('tra_managerpermits_review as t7', 't1.application_code','=','t7.application_code')
                ->where(array('t1.applicant_id' => $mistrader_id))
                ->orderBy('t1.date_added','desc');
                
                if(validateIsNumeric($sub_module_id)){
                    $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }
                   
                  
                //the ilters 
                $records = $records->get();

                //$data = $this->getPermitApplications($records);
                $res =array('success'=>true,'data'=> $records);
        }
       catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);

    }
	public function saveControlDrugsLicensedetails(Request $req){
    try{

        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_code = $req->application_code;
        $unit_price = $req->unit_price;
        $currency_id = $req->currency_id;
        $packaging_unit_id = $req->packaging_unit_id;
        $quantity = $req->quantity;
        $product_id = $req->product_id;
        $record_id = $req->id;
        
        $error_message = 'Error occurred, data not saved successfully';
        //check uniform currency 
        $section_id = 7;
       // $permit_prod =$this->getPermitBrandName($product_id);
      
        $table_name = 'wb_permits_products';
                $data = array('application_code'=>$application_code,
                           
                            'section_id'=>$section_id,
                            'quantity'=>$quantity,
                            'product_strength'=>$req->product_strength,
                            'product_registration_no'=>$req->product_registration_no,
                            'product_id'=>$product_id,
                            'conversion_unit'=>$req->conversion_unit,
                           
                            'is_registered_product'=>$req->is_registered_product,
                            'unitpack_unit_id'=>$req->unitpack_unit_id,
                            'dosage_form_id'=>$req->dosage_form_id,
                            'purpose_of_drugsuse'=>$req->purpose_of_drugsuse,
                            'controlleddrugs_type_id'=>$req->controlleddrugs_type_id,
                            'controlled_drugssubstances_id'=>$req->controlled_drugssubstances_id,
                            'controlleddrugs_basesalt_id'=>$req->controlleddrugs_basesalt_id,
                            'gramsbasesiunit_id'=>$req->gramsbasesiunit_id,
                            'drugs_content'=>$req->drugs_content,
                            'strength_asgrams'=>$req->strength_asgrams,
                            'controlleddrug_base'=>$req->controlleddrug_base,
                            'pack_unit'=>$req->pack_unit,
                            'unit_price'=>$req->unit_price,
                            'currency_id'=>$req->currency_id,
                            'drugspackaging_type_id'=>$req->drugspackaging_type_id,
                            );
							
                            $data['permitbrand_name'] = $req->brand_name;
               

                if(validateIsNumeric($record_id)){
                    $where = array('id'=>$record_id);
                    if (recordExists($table_name, $where)) {
                                    
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $trader_email;
    
                        $previous_data = getPreviousRecords($table_name, $where);
                        
                        $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                        
                    }if($resp['success']){
                        $res =  array('success'=>true,
                        'record_id'=>$record_id,
                        'message'=>'Saved Successfully');
        
                    }
                    else{
                        $res =  array('success'=>false,
                        'message'=>$error_message);
        
                    }
                }
                else{
                        
                        $data['created_by'] = $trader_email;
                        $data['created_on'] = Carbon::now();
                        $resp = insertRecord($table_name, $data, $trader_email);
                        $record_id = $resp['record_id'];     
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
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
}public function getApprovedControlledDrugsPermits(Request $req){
        try{    
            $mistrader_id = $req->mistrader_id;
            $sub_module_id =  $req->sub_module_id;

        }
       catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
    }
	public function getOnlineControlDrugsImpermitsproductsDetails(Request $req){
        try{
            $application_code = $req->application_code;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_permits_products as t1')
                ->join('wb_importexport_applications as t2', 't1.application_code','=','t2.application_code')
                ->select(DB::raw("t1.*,t2.sub_module_id, t2.section_id, '' as certificate_no"))
                ->where(array('t1.application_code' => $application_code))
                ->get();
			
                $data = $this->getControlledProductsPermitDetails($records);
                $res =array('success'=>true,'results'=> $data);
        }
        catch (\Exception $exception) {
            $res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);

        } catch (\Throwable $throwable) {
            $res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
        }
        return response()->json($res);
       }
	   public function getControlledProductsPermitDetails($records){
        $data = array();
    
        $currencyData = getParameterItems('par_currencies','');
       
        $packagingData = getParameterItems('par_packaging_units','','');
        $controlDrugsTypesData = getParameterItems('par_controlleddrugs_types','');
        $controlDrugsSubstanceData = getParameterItems('par_controlled_drugssubstances','');
        $controlDrugsSaltData = getParameterItems('par_controlleddrugs_basesalts','');
        $dosageFormData = getParameterItems('par_dosage_forms','');
        
        
        
        foreach ($records as $rec) {
            $packaging_type = returnParamFromArray($packagingData,$rec->drugspackaging_type_id);
            
           $data[] = array('application_code'=>$rec->application_code,
                           'product_id'=>$rec->product_id,
                           'quantity'=>$rec->quantity,
                           'drugspackaging_type_id'=>$rec->drugspackaging_type_id,
                           'pack_unit'=>$rec->pack_unit,
                           'controlleddrug_base'=>$rec->controlleddrug_base,
                           'strength_asgrams'=>$rec->strength_asgrams,
                           'drugs_content'=>$rec->drugs_content,
                           'gramsbasesiunit_id'=>$rec->gramsbasesiunit_id,
                           'controlleddrugs_basesalt_id'=>$rec->controlleddrugs_basesalt_id,
                           'controlleddrugs_type_id'=>$rec->controlleddrugs_type_id,
                           'controlled_drugssubstances_id'=>$rec->controlled_drugssubstances_id,
                           'is_registered_product'=>$rec->is_registered_product,
                           'purpose_of_drugsuse'=>$rec->purpose_of_drugsuse,
                           'country_oforigin_id'=>$rec->country_oforigin_id,
                           'product_registration_no'=>$rec->product_registration_no,
                           'pack_size'=>$rec->pack_size,
                           'pack_unit_id'=>$rec->pack_unit_id,
                           'conversion_unit'=>$rec->conversion_unit,
                           'unitpack_size'=>$rec->unitpack_size,
                           'unitpack_unit_id'=>$rec->unitpack_unit_id,
                           'product_strength'=>$rec->product_strength,
                           
                           'dosage_form_id'=>$rec->dosage_form_id,
                           'product_packaging'=>$rec->product_packaging,
    
                           'brand_name'=>$rec->permitbrand_name,
                           'permitbrand_name'=>$rec->permitbrand_name,
                           'id'=>$rec->id,
                           'packaging_units'=>$rec->pack_unit.' ml '. $packaging_type,
                           'controlleddrugs_type'=>returnParamFromArray($controlDrugsTypesData,$rec->controlleddrugs_type_id),'controlled_drugssubstances'=>returnParamFromArray($controlDrugsSubstanceData,$rec->controlled_drugssubstances_id),
                           'controlleddrugs_basesalt'=>returnParamFromArray($controlDrugsSaltData,$rec->controlleddrugs_basesalt_id),'dosage_form'=>returnParamFromArray($dosageFormData,$rec->dosage_form_id),
                           'pack_unitdetails'=>$rec->pack_unit.' ml '. $packaging_type,
                           'unit_price'=>$rec->unit_price,
                           'total_value'=>($rec->unit_price*$rec->quantity),
                       );
                
        }
        return $data;
       }
 public function getControlledDrugsLicensesProdDetails(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        $records = DB::table('wb_permits_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getControlledDrugsProductsDetails($records);

            $res =array('success'=>true,'data'=> $data);
    }
    catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
   }
   public function getControlledDrugsProductsDetails($records){
    $data = array();

    $currencyData = getParameterItems('par_currencies','','mis_db');
   
    $packagingData = getParameterItems('par_packaging_units','','mis_db');
    $controlDrugsTypesData = getParameterItems('par_controlleddrugs_types','','mis_db');
    $controlDrugsSubstanceData = getParameterItems('par_controlled_drugssubstances','','mis_db');
    $controlDrugsSaltData = getParameterItems('par_controlleddrugs_basesalts','','mis_db');
    $dosageFormData = getParameterItems('par_dosage_forms','','mis_db');
    
    $parDrugsPackagingTypeData = getParameterItems('par_drugspackaging_types','','mis_db');

    
    foreach ($records as $rec) {
        $packaging_type = returnParamFromArray($packagingData,$rec->drugspackaging_type_id);
        
       $data[] = array('application_code'=>$rec->application_code,
                       'product_id'=>$rec->product_id,
                       'quantity'=>$rec->quantity,
                       'drugspackaging_type_id'=>$rec->drugspackaging_type_id,
                       'pack_unit'=>$rec->pack_unit,
                       'controlleddrug_base'=>$rec->controlleddrug_base,
                       'strength_asgrams'=>$rec->strength_asgrams,
                       'drugs_content'=>$rec->drugs_content,
                       'gramsbasesiunit_id'=>$rec->gramsbasesiunit_id,
                       'controlleddrugs_basesalt_id'=>$rec->controlleddrugs_basesalt_id,
                       'controlleddrugs_type_id'=>$rec->controlleddrugs_type_id,
                       'controlled_drugssubstances_id'=>$rec->controlled_drugssubstances_id,
                       'is_registered_product'=>$rec->is_registered_product,
                       'purpose_of_drugsuse'=>$rec->purpose_of_drugsuse,
                       'country_oforigin_id'=>$rec->country_oforigin_id,
                       'product_registration_no'=>$rec->product_registration_no,
                       'pack_size'=>$rec->pack_size,
                       'pack_unit_id'=>$rec->pack_unit_id,
                       'conversion_unit'=>$rec->conversion_unit,
                       'unitpack_size'=>$rec->unitpack_size,
                       'unitpack_unit_id'=>$rec->unitpack_unit_id,
                       'product_strength'=>$rec->product_strength,
                       
                       'dosage_form_id'=>$rec->dosage_form_id,
                       'product_packaging'=>$rec->product_packaging,

                       'brand_name'=>$rec->permitbrand_name,
                       'permitbrand_name'=>$rec->permitbrand_name,
                       'id'=>$rec->id,
                       'packaging_units'=>$rec->pack_unit.' ml '. $packaging_type,
                       'controlleddrugs_type'=>returnParamFromArray($controlDrugsTypesData,$rec->controlleddrugs_type_id),'controlled_drugssubstances'=>returnParamFromArray($controlDrugsSubstanceData,$rec->controlled_drugssubstances_id),
                       'controlleddrugs_basesalt'=>returnParamFromArray($controlDrugsSaltData,$rec->controlleddrugs_basesalt_id),'dosage_form'=>returnParamFromArray($dosageFormData,$rec->dosage_form_id),
                       'pack_unitdetails'=>$rec->pack_unit.' ml '. $packaging_type,
                       'unit_price'=>$rec->unit_price,
                       'total_value'=>($rec->unit_price*$rec->quantity),
                   );
            
    }
    return $data;
   }
    public function saveCOntrolDrugsImportPermitProducts($license_application_code,$application_code,$trader_email){
            $record = DB::connection('mis_db')->table('tra_permits_products')->where(array('application_code'=>$license_application_code))->get();
            $res = '';
            foreach($record as $rec){
                    $app_data = array('ctrdrugslicense_permits_drugs_id'=>$rec->id,
                            'productphysical_description'=>$rec->productphysical_description,
                            'common_name_id'=>$rec->common_name_id,
                            'product_id'=>$rec->product_id,
                            'conversion_unit'=>$rec->conversion_unit,
                            'product_strength'=>$rec->product_strength,
                            'quantity'=>$rec->quantity,
                            'unit_price'=>$rec->unit_price,
                            'currency_id'=>$rec->currency_id,
                            'unitpack_size'=>$rec->unitpack_size,
                            'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'application_code'=>$application_code,
                            'product_packaging'=>$rec->product_packaging,'packaging_unit_id'=>$rec->packaging_unit_id,
                            'dosage_form_id'=>$rec->dosage_form_id,'pack_unit_id'=>$rec->pack_unit_id,
                            'permitbrand_name'=>$rec->permitbrand_name,
                            'permitcommon_name'=>$rec->permitcommon_name,
                            'product_registration_no'=>$rec->product_registration_no,
                            'country_oforigin_id'=>$rec->country_oforigin_id,
                            'is_registered_product'=>$rec->is_registered_product,
                            'purpose_of_drugsuse'=>$rec->purpose_of_drugsuse,
                            'controlleddrugs_type_id'=>$rec->controlleddrugs_type_id,
                            'controlled_drugssubstances_id'=>$rec->controlled_drugssubstances_id,
                            'controlleddrugs_basesalt_id'=>$rec->controlleddrugs_basesalt_id,
                            'gramsbasesiunit_id'=>$rec->gramsbasesiunit_id,
                            'drugs_content'=>$rec->drugs_content,
                            'strength_asgrams'=>$rec->strength_asgrams,
                            'controlleddrug_base'=>$rec->controlleddrug_base,
                            'drugspackaging_type_id'=>$rec->drugspackaging_type_id,
                            'created_by'=>$trader_email,
                            'created_on'=>Carbon::now()
                        );
               $res = insertRecord('wb_permits_products', $app_data, $trader_email);
                  
            }
    }
    public function saveImportExportApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = 4;
            $sub_module_id = $req->sub_module_id;
            $proforma_currency_id = $req->proforma_currency_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
			$device_type_id = $req->device_type_id;
            
            $application_code = $req->application_code;
            $import_typecategory_id = $req->import_typecategory_id;
            //dms get sub module flder getSubModuleNodereference() 731
            $where_app = array('application_code'=>$application_code);
							if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
							//	initializeApplicationDMS(7, $module_id, $sub_module_id, $application_code, 'Applicatio'.rand(0,1000), '');
							}
							$process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                               
            $app_data = array('section_id'=>$req->section_id,
                                    'sub_module_id'=>$req->sub_module_id,
                                    'module_id'=>$req->module_id,
									'process_id'=>$process_id,
                                    'permit_category_id'=>$req->permit_category_id,
                                    'import_typecategory_id'=>$req->import_typecategory_id,
                                    'permit_reason_id'=>$req->permit_reason_id,
                                    'has_registered_outlets'=>$req->has_registered_outlets,
                                    'reason_fornonregister_outlet'=>$req->reason_fornonregister_outlet,
                                    'mode_oftransport_id'=>$req->mode_oftransport_id,
										
									'eligible_importersdoctype_id' => $req->eligible_importersdoctype_id,
									'eligible_importerscategory_id' => $req->eligible_importerscategory_id,
									'document_upload_id' => $req->document_upload_id,
									  
                                    'port_id'=>$req->port_id,
                                    'proforma_invoice_no'=>$req->proforma_invoice_no,
                                    'proforma_invoice_date'=>formatDate($req->proforma_invoice_date),
                                    'paying_currency_id'=>$req->paying_currency_id,'proforma_currency_id'=>$req->proforma_currency_id,
                                    'consignee_options_id'=>$req->consignee_options_id,
                                    'consignee_id'=>$req->consignee_id,
                                    'sender_receiver_id'=>$req->sender_receiver_id,
                                    'permit_productscategory_id'=>$req->permit_productscategory_id,
                                    'premise_id'=>$req->premise_id,
                                    'zone_id'=>$req->zone_id,
                                    'trader_id'=>$trader_id
                                );
						 if($sub_module_id == 49){

                            $app_data['shipment_date'] = $req->shipment_date;
                            $app_data['proposed_inspection_date'] = $req->proposed_inspection_date;
                            $app_data['clearing_agent'] = $req->clearing_agent;
                            $app_data['custom_declaration_no'] = $req->custom_declaration_no;

                        }
						if($sub_module_id == 87){

                            $app_data['has_medical_prescription'] = $req->has_medical_prescription;
                            $app_data['patients_email_address'] = $req->patients_email_address;
                            $app_data['patients_fullnames'] = $req->patients_fullnames;
                            $app_data['patients_identification_no'] = $req->patients_identification_no;
                            $app_data['patients_phone_no'] = $req->patients_phone_no;
                            $app_data['patients_physical_address'] = $req->patients_physical_address;
                            $app_data['patientscountry_id'] = $req->patientscountry_id;
                            $app_data['patientsdistrict_id'] = $req->patientsdistrict_id;
                            $app_data['patientsregion_id'] = $req->patientsregion_id;
                            $app_data['hospital_address'] = $req->hospital_address;
                            $app_data['prescribing_doctor'] = $req->prescribing_doctor;
                            $app_data['prescribling_hospital'] = $req->prescribling_hospital;
                            $app_data['prescription_date'] = formatDate($req->prescription_date);
                            $app_data['prescription_no'] = $req->prescription_no;
                            $app_data['reason_for_authorisation'] = $req->reason_for_authorisation;

                        }
	
                        /** Already Saved */ 
                        $table_name = 'wb_importexport_applications';
                        $sub_module_id = $req->sub_module_id;
                  
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);

                                if (recordExists('wb_importexport_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                    $resp =   updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                   
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code','mis_db');
                                
                                
                                $deviceTypecode = getSingleRecordColValue('par_device_types', array('id' => $device_type_id), 'code','mis_db');
                                $ref_id = 0;
                                
                                if($section_id == 4){
                                       
                                        $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code,
                                            'apptype_code'=>$apptype_code,
                                            'device_typecode'=>$deviceTypecode,
                                            'app_typecategory'=>$apptype_categorycode
                                        );
                               }
                               else{
                                        $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code,
                                            'apptype_code'=>$apptype_code
                                        );
                               }
                             
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                             
                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
								
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }
                               $app_data['tracking_no'] =   $tracking_no; 
							   $app_data['reference_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                                    
                               $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                             
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                    //  initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                      //  saveApplicationSubmissionDetails($application_code,$table_name);  
                                }
                               
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Permit Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Permit Application not saved, it this persists contact the system Administrator');
                         }

                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,//'resp'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
				//'data'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   

    }
    
    public function saveDisposalApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
            
            $application_code = $req->application_code;
            $import_typecategory_id = $req->import_typecategory_id;
            //dms get sub module flder getSubModuleNodereference()
            
            $app_data = array('section_id'=>$req->section_id,
                                    'sub_module_id'=>$req->sub_module_id,
                                    'module_id'=>$req->module_id,
                                    'reason_for_disposal'=>$req->reason_for_disposal,
                                    'total_weight'=>$req->total_weight,
                                    'weights_units_id'=>$req->weights_units_id,
                                    'market_value'=>$req->market_value,
                                   'proposedmethod_of_disposal_id'=>$req->proposedmethod_of_disposal_id,
                                   'reason_of_destruction_id'=>$req->reason_of_destruction_id,
                                   'reason_for_disposal'=>$req->reason_for_disposal,
                                   'otherproposedmethod_of_disposal'=>$req->otherproposedmethod_of_disposal,
                                   'product_particulars_description'=>$req->product_particulars_description,
                                   'destructionsite_location'=>$req->destructionsite_location,
                                   'proposed_destructionsite'=>$req->proposed_destructionsite,
                                   'disposal_siteoption_id'=>$req->disposal_siteoption_id,
                                    'proposed_destructiondate'=>$req->proposed_destructiondate,
                                   
								   
								   
                                    'currency_id'=>$req->currency_id,
                                    'zone_id'=>$req->zone_id,
                                    'trader_id'=>$trader_id
                                );
                        /** Already Saved */ 
                        $table_name = 'wb_disposal_applications';
                        $sub_module_id = $req->sub_module_id;
                  
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);

                                if (recordExists('wb_disposal_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_disposal_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                    $resp =   updateRecord('wb_disposal_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                   
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $apptype_categorycode = getSingleRecordColValue('par_permit_typecategories', array('id' => $import_typecategory_id), 'code','mis_db');
                                
                                $ref_id = 0;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                $codes_array = array(
                                            'section_code' => $section_code,
                                            'zone_code' => $zone_code
                                );
                               
                                $application_code = generateApplicationCode($sub_module_id, 'wb_disposal_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                              
                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);

                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }

                               $app_data['tracking_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                                    
                               $resp = insertRecord('wb_disposal_applications', $app_data, $trader_email);
                                
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                    initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                    saveApplicationSubmissionDetails($application_code,$table_name);  
                               }
                               
                               
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Permit Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Permit Application not saved, it this persists contact the system Administrator');
                         }

                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'resp'=>$resp,
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
    public function checkPermitUniformCurrency($application_code,$currency_id){
        $record = DB::table('wb_permits_products')
                    ->where(array('application_code'=>$application_code))
                    ->whereNotIn('currency_id', [$currency_id])
                    ->get();
       
        if(count($record) > 0){
            $res = array(
                'success' => false,
                'message' => 'Mismatc product permits currency, confirm the previous currency and make sure currencies match'
            );
          //  echo json_encode($res);
            
            return response()->json($res);   
            exit();
            
        }

}

public function saveDisposalPermitProductdetails(Request $req){
    try{

        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_code = $req->application_code;
        $product_description = $req->product_description;
        $estimated_value = $req->estimated_value;
        $currency_id = $req->currency_id;
        $packaging_unit_id = $req->packaging_unit_id;
        $quantity = $req->quantity;
        $product_id = $req->product_id;
        $record_id = $req->id;
        
        
        $error_message = 'Error occurred, data not saved successfully';
        //check uniform currency 
        
        
        $table_name = 'wb_disposal_products';
                $data = array('application_code'=>$application_code,
                            'product_description'=>$product_description,
                            'estimated_value'=>$estimated_value,
                            'currency_id'=>$currency_id,
                            'packaging_unit_id'=>$packaging_unit_id,
                            'quantity'=>$quantity,
                            'product_id'=>$product_id
                            );
                if(validateIsNumeric($record_id)){
                    $where = array('id'=>$record_id);
                    if (recordExists($table_name, $where)) {
                                    
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $trader_email;
    
                        $previous_data = getPreviousRecords($table_name, $where);
                        
                        $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                        
                    }if($resp['success']){
                        $res =  array('success'=>true,
                        'record_id'=>$record_id,
                        'message'=>'Saved Successfully');
        
                    }
                    else{
                        $res =  array('success'=>false,
                        'message'=>$error_message);
        
                    }
                }
                else{
                   
                        $data['created_by'] = $trader_email;
                        $data['created_on'] = Carbon::now();
                        $resp = insertRecord($table_name, $data, $trader_email);
                        
                        $record_id = $resp['record_id'];     
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

  public function onAddingNewProductDetails($req){
        $section_id = $req->section_id;
        $brand_name = $req->brand_name;
        $classification_id = $req->classification_id;
        $product_category_id = $req->product_category_id;
        $common_name_id = $req->common_name_id;
        $physical_description = $req->physical_description;
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'tra_product_information';
        $resp = false;
        $prod_data = array('brand_name' => $brand_name,
                           'section_id'=>$section_id,
                           'classification_id'=>$classification_id,
                           'product_category_id'=>$product_category_id,
                           'common_name_id'=>$common_name_id,
                           'physical_description'=>$physical_description
                        );
        $where_state = array('brand_name' => $brand_name,
                           'section_id'=>$section_id);
        $records = DB::connection('mis_db')
                    ->table($table_name)
                    ->where($where_state)
                    ->first();
        
        if(!$records){
                //delete functionality
                $prod_data['created_on'] =  Carbon::now();
                $prod_data['created_by'] = $trader_id;
                $resp = insertRecord( $table_name , $prod_data, $trader_id,'mis_db');
                if($resp['success']){
                    $product_id = $resp['record_id'];
                }   
                else{
                    $product_id = 0;
                }                
        }
        else{
           $product_id = $records->id;

        }
     return $product_id;
}
function getPermitBrandName($product_id){
	$record = DB::connection('mis_db')->table('tra_product_information as t1')
				->leftJoin('par_common_names as t2', 't1.common_name_id','t2.id')
				->select('t1.brand_name', 't2.name as common_name')
				->where('t1.id',$product_id)
				->first();
	return $record;
}
public function onUploadDocuments($req,$document_requirement_id){

        $application_code = $req->application_code;
        $module_id = $req->module_id;
        $sub_module_id = $req->sub_module_id;
        $document_requirement_id = 317;
        $file = $req->file('file');
            $document_upload_id = 0;
			$document_upload_id =0;
        $where_app = array('application_code'=>$application_code);
                       
        if ($req->hasFile('file')) {
			 if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
                            initializeApplicationDMS(7, $module_id, $sub_module_id, $application_code, 'Permits details'.rand(0,1000), '');
                        }
                        
						
                    $document_type_id = getSingleRecordColValue('tra_documentupload_requirements', array('id'=>$document_requirement_id), 'document_type_id','mis_db');
                    $app_rootnode = getApplicationRootNode($application_code,$module_id,$sub_module_id);
                                            
                    $trader_email = $req->email_address;
                    $trader_id= $req->trader_id;
                    $app_rootnode = getDocumentTypeRootNode($app_rootnode->dms_node_id,$application_code,$document_type_id,$trader_email);

                    $table_name = 'tra_application_uploadeddocuments';
                    
                    if($app_rootnode){
                        $origFileName = $file->getClientOriginalName();
                        $extension = $file->getClientOriginalExtension();
                                            $file_path = $file->getPathName();
                                            $extension = $file->getClientOriginalExtension();
                                            $document_rootupload =  Config('constants.dms.doc_rootupload') ;

                                            $destination = getcwd() .$document_rootupload;
                                            $savedName = str_random(3) . time() . '.' . $extension;

                                            $document_path = $destination.$savedName;
                                            //check if tje dpcument type has been mapped and not autoCreate the folder 
                                            $document_requirement = getParameterItem('tra_documentupload_requirements',$document_requirement_id,'mis_db');
                                        
                                            $uploadfile_name =  $document_requirement.str_random(5).'.'.$extension;
                                            $destination_node = $app_rootnode->node_ref;
                                    
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
                                            $res = insertRecord('tra_application_uploadeddocuments', $document_data, $trader_id,'mis_db');
                                            $document_upload_id = $res['record_id'];
                                            
                        

                }
        }
        return $document_upload_id;
        
}
    public function savePermitProductdetails(Request $req){
        try{

            $resp ="";
            $trader_id = $req->trader_id;
            $trader_email = $req->trader_email;
            $application_code = $req->application_code;
            $product_category_id = $req->product_category_id;
            $unit_price = $req->unit_price;
            $currency_id = $req->currency_id;
            $weights_units_id = $req->weights_units_id;
            $total_weight = $req->total_weight;
            $packaging_unit_id = $req->packaging_unit_id;
            $quantity = $req->quantity;
            $laboratory_no = $req->laboratory_no;
            $regulated_prodpermit_id = $req->regulated_prodpermit_id;
            $product_id = $req->product_id;
            $record_id = $req->id;
            $device_type_id = $req->device_type_id;
            
            $device_type_id = $req->device_type_id;
            $is_regulated_product = $req->is_regulated_product;
            
            $error_message = 'Error occurred, data not saved successfully';
            //check uniform currency  unitpack_unit_id unitpack_size unitpack_size
            if(!validateIsNumeric($product_id)){
				$product_id = $this->onAddingNewProductDetails($req);

			}
        $permit_prod =$this->getPermitBrandName($product_id);
		$document_requirement_id = 410;
         $document_upload_id = $this->onUploadDocuments($req,$document_requirement_id);

            $table_name = 'wb_permits_products';
			 $data = array('application_code'=>$application_code,
                            'unit_price'=>$unit_price,
                            'currency_id'=>$currency_id,
                            'section_id'=>$req->section_id,
                            'packaging_unit_id'=>$packaging_unit_id,
                            'manufacturer_id'=>$req->manufacturer_id,
                            'quantity'=>$quantity,
                            'permitbrand_name'=>$req->brand_name,
                            'product_registration_no'=>$req->product_registration_no,
                            'common_name_id'=>$req->common_name_id,
                            'productphysical_description'=>$req->productphysical_description,
                            'country_oforigin_id'=>$req->country_oforigin_id,
                            'product_strength'=>$req->product_strength,
                            'product_id'=>$product_id,
                            'document_upload_id'=>$document_upload_id,
                            'prodclass_category_id'=>$req->prodclass_category_id,
                            'unitpack_size'=>$req->unitpack_size,
							 'pack_size'=>$req->unitpack_size,
                            'unitpack_unit_id'=>$req->unitpack_unit_id,
                            'dosage_form_id'=>$req->dosage_form_id,
                            'prodcertificate_no'=>$req->prodcertificate_no,
                            'device_type_id'=>$req->device_type_id,
                            'product_batch_no'=>$req->product_batch_no,
                            'product_category_id'=>$req->product_category_id,
                            'product_expiry_date'=>formatDate($req->product_expiry_date),
							'consignment_quantity'=>$req->consignment_quantity,
                            'product_manufacturing_date'=>formatDate($req->product_manufacturing_date),
                            'consignment_quantity'=>$req->consignment_quantity,
                            'total_weight'=>$req->total_weight,
                            'weights_units_id'=>$req->weights_units_id
                    );

                   
					if($permit_prod){
						   
							$data['permitcommon_name'] = $permit_prod->common_name;
					}
					
					
                    if(validateIsNumeric($record_id)){
                        $where = array('id'=>$record_id);
                        if (recordExists($table_name, $where)) {
                                        
                            $data['dola'] = Carbon::now();
                            $data['altered_by'] = $trader_email;
        
                            $previous_data = getPreviousRecords($table_name, $where);
                            
                            $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                            
                        }if($resp['success']){
                            $res =  array('success'=>true,
                            'record_id'=>$record_id,
                            'message'=>'Saved Successfully');
            
                        }
                        else{
                            $res =  array('success'=>false,
                            'message'=>$error_message);
            
                        }
                    }
                    else{
                        //insert 
                        $record = DB::table('wb_permits_products')
                                ->where(array('application_code'=>$application_code))
                                ->whereNotIn('currency_id', [$currency_id])
                                ->get();
                
                        if(!count($record) > 0){
                            $data['created_by'] = $trader_email;
                            $data['created_on'] = Carbon::now();
                            $resp = insertRecord($table_name, $data, $trader_email);
                            $record_id = $resp['record_id'];     
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
                        else{

                            $res = array(
                                'success' => false,
                                'message' => 'Mis-Match Product permits currency, confirm the previous currency and make sure currencies match'
                            );
                    
                        }
                       
                    } 
					
                    
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'resp'=>$resp,
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
    
    public function getDisposalApplicationsLoading(Request $req){
        try{
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
            
            $application_status_ids = explode(',',  $application_status_id);
            $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;

            $data = array();
            //get the records 
            $records = DB::table('wb_disposal_applications as t1')
                ->select('t1.*', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                    $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
                ->where(array('t1.trader_id' => $trader_id))
                ->orderBy('t1.date_added','desc');
                
                if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                        
                    $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

                }if(validateIsNumeric($sub_module_id)){
                    $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }if(validateIsNumeric($section_id)){
                    $records =  $records->where(array('t1.section_id'=>$section_id));
                }

                //the ilters 
                $records = $records->get();

                $data = $this->getDisposalPermitApplications($records);
                $res =array('success'=>true,'data'=> $data);
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
    function getDisposalPermitApplications($records){
        
        $actionColumnData = returnContextMenuActions();
        $data = array();

        $subModuleData = getParameterItems('sub_modules','','mis_db');
        $sectionsData = getParameterItems('par_sections','','mis_db');
        
        foreach ($records as $rec) {
           $section = returnParamFromArray($sectionsData,$rec->section_id);
           $premises_name = getSingleRecordColValue('tra_premises', array('id' => $rec->premise_id), 'name','mis_db');
            
           $data[] = array('reference_no'=>$rec->reference_no,
                           'trader_id'=>$rec->trader_id,
                           'premise_id'=>$rec->premise_id,
                           'section_id'=>$rec->section_id,
                           'application_id'=>$rec->id,
                           'id'=>$rec->id,
                           'date_added'=>$rec->date_added,
                           'sub_module_id'=>$rec->sub_module_id,
                           'module_id'=>$rec->module_id,
                           'application_status_id'=>$rec->application_status_id,
                           'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                           'section'=>$section,
                           'created_by'=>$rec->created_by,
                           'submission_date'=>$rec->submission_date,
                           'premise_id'=>$rec->premise_id,
                           'premises_name'=>$premises_name,
                           'section_name'=>$section,
                           'zone_id'=>$rec->zone_id,
                           'added_by'=>$rec->created_by,
                           'tracking_no'=>$rec->tracking_no,
                           'status_name'=>$rec->status_name,
                           'router_link'=>$rec->router_link,
                           'process_title'=>$rec->process_title,
                           'reason_for_disposal'=>$rec->reason_for_disposal,
                           'total_weight'=>$rec->total_weight,
                           'market_value'=>$rec->market_value,
                           'quantity'=>$rec->quantity,'packaging_unit_id'=>$rec->packaging_unit_id,
                           'currency_id'=>$rec->currency_id,
                           'weights_units_id'=>$rec->weights_units_id,
                           'application_code'=>$rec->application_code,
                           'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                       );
        }
        return $data;


   }
    public function getImportExpPermitsApplicationLoading(Request $req){
        try{
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
            $sub_module_id = $req->sub_module_id;
            
            $application_status_ids = explode(',',  $application_status_id);
            $sub_module_ids = explode(',',  $sub_module_id);
          //  $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;
            $permit_type_id = $req->permit_type_id;

            $data = array();
            //get the records 
            $records = DB::table('wb_importexport_applications as t1')
                ->select('t1.*','t7.name as action_name','t7.iconCls','t7.action', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
                ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
                ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                    $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                    $join->on('t1.application_status_id', '=', 't4.status_id');
                })
                ->leftJoin('wb_processstatus_actions as t6',function($join){
                    $join->on('t1.application_status_id', '=', 't6.status_id')
                         ->on('t6.is_default_action', '=', DB::raw(1));

                })
                ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
                ->where(array('t1.trader_id' => $trader_id))
                ->orderBy('t1.date_added','desc');
                
                if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                        
                    $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

                }
				if(is_array($sub_module_ids) && count($sub_module_ids) >0 && $sub_module_id != ''){
                        
                    $records =  $records->whereIn('t1.sub_module_id', $sub_module_ids);

                }
				
				if(validateIsNumeric($sub_module_id)){
                    $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
                }if(validateIsNumeric($section_id)){
                    $records =  $records->where(array('t1.section_id'=>$section_id));
                }
				if(validateIsNumeric($permit_type_id)){
						$records->where(array('t1.sub_module_id'=>12));
				}
                //the ilters 
                $records = $records->groupBy('t1.application_code')->get();

                $data = $this->getPermitApplications($records);
                $res =array('success'=>true,'data'=> $data);
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
    
    
    function getPermitApplications($records){
        
        $actionColumnData = returnContextMenuActions();
        $data = array();

        $subModuleData = getParameterItems('sub_modules','','mis_db');
        $sectionsData = getParameterItems('par_sections','','mis_db');
        
        $permitCategoryData = getParameterItems('par_permit_category','','mis_db');

        $permitReasonData = getParameterItems('par_permit_reasons','','mis_db');
        
        foreach ($records as $rec) {
           $section = returnParamFromArray($sectionsData,$rec->section_id);
           $premises_name = getSingleRecordColValue('tra_premises', array('id' => $rec->premise_id), 'name','mis_db');
           $sender_receiver = getSingleRecordColValue('tra_permitsenderreceiver_data', array('id' => $rec->sender_receiver_id), 'name','mis_db');
           $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $rec->consignee_id), 'name','mis_db');
           
           $data[] = array('reference_no'=>$rec->reference_no,
                           'trader_id'=>$rec->trader_id,
                           'premise_id'=>$rec->premise_id,
                           'section_id'=>$rec->section_id,
                           'mode_oftransport_id'=>$rec->mode_oftransport_id,
                           'application_id'=>$rec->id,
                           'id'=>$rec->id,
                           'date_added'=>$rec->date_added,
                           'sub_module_id'=>$rec->sub_module_id,
                           'module_id'=>$rec->module_id,
                           'mode_oftransport_id'=>$rec->mode_oftransport_id,
                           'application_status_id'=>$rec->application_status_id,
                           'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                           'section'=>$section,
                           'created_by'=>$rec->created_by,
                           'submission_date'=>$rec->submission_date,
                           'permit_category'=>returnParamFromArray($permitCategoryData,$rec->permit_category_id),
                           'permit_reason'=>returnParamFromArray($permitReasonData,$rec->permit_reason_id),
							'has_registered_outlets'=>$rec->has_registered_outlets,
							
									'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
									'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
									'document_upload_id' => $rec->document_upload_id,
									    'custom_declaration_no'=>$rec->custom_declaration_no,
                           'clearing_agent'=>$rec->clearing_agent,
                           'proposed_inspection_date'=>$rec->proposed_inspection_date,
                           'shipment_date'=>$rec->shipment_date,
                                    'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
                           'proforma_currency_id'=>$rec->proforma_currency_id,
                            'permit_category_id'=>$rec->permit_category_id,
                           'product_category_id'=>$rec->product_category_id,
                           'import_typecategory_id'=>$rec->import_typecategory_id,
                           'permit_reason_id'=>$rec->permit_reason_id,
                           'proforma_invoice_no'=>$rec->proforma_invoice_no,
                           'proforma_invoice_date'=>$rec->proforma_invoice_date,
                           'premise_id'=>$rec->premise_id,
                           'premises_name'=>$premises_name,
                           'paying_currency_id'=>$rec->paying_currency_id,
                           'sender_receiver_id'=>$rec->sender_receiver_id,
                           'sender_receiver'=>$sender_receiver,
                           'section_name'=>$section,
                           'zone_id'=>$rec->zone_id,
                           'port_id'=>$rec->port_id,
                           'consignee_options_id'=>$rec->consignee_options_id,
                           'consignee_id'=>$rec->consignee_id,
                           'consignee_name'=>$consignee_name,
                           'pay_currency_id'=>$rec->pay_currency_id,
                           'added_by'=>$rec->created_by,
                           'tracking_no'=>$rec->tracking_no,
                           'status_name'=>$rec->status_name,
                           'router_link'=>$rec->router_link,
                           'process_title'=>$rec->process_title,
                           'action_name'=>$rec->action_name,
                           'action'=>$rec->action,
                           'iconCls'=>$rec->iconCls,
                           'application_code'=>$rec->application_code,
						   
						   'ordered_by'=>$rec->ordered_by,
                           'qualifications'=>$rec->qualifications,
                           'qualification_license_no'=>$rec->qualification_license_no,
                           
                           'has_apppliedctrdrugs_license'=>$rec->has_apppliedctrdrugs_license,
                           'permit_productscategory_id'=>$rec->permit_productscategory_id,

                           'license_application_code'=>$rec->license_application_code,
                           'controlled_drugslicense_no'=>$rec->controlled_drugslicense_no,

                           'approximate_dateof_arrival'=>$rec->approximate_dateof_arrival,
                           'patients_email_address'=>$rec->patients_email_address,
                           'has_medical_prescription'=>$rec->has_medical_prescription,
                           'patients_fullnames'=>$rec->patients_fullnames,
                           'patients_identification_no'=>$rec->patients_identification_no,
                           'patients_phone_no'=>$rec->patients_phone_no,
                           'patients_physical_address'=>$rec->patients_physical_address,
                           'patientscountry_id'=>$rec->patientscountry_id,
                           'patientsdistrict_id'=>$rec->patientsdistrict_id,
                           'patientsregion_id'=>$rec->patientsregion_id,
                           'hospital_address'=>$rec->hospital_address,
                           'prescribing_doctor'=>$rec->prescribing_doctor,
                           'prescribling_hospital'=>$rec->prescribling_hospital,
                           'prescription_date'=>formatDate($rec->prescription_date),
                           'prescription_no'=>$rec->prescription_no,
                           'reason_for_authorisation'=>$rec->reason_for_authorisation,
						   
                           'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                       );

        }
        return $data;


   }
   //the permit products details 
   public function getPermitProductsDetails(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_permits_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getProductsPermitDetails($records);
            $res =array('success'=>true,'data'=> $data);


  
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
   public function getPermitUploadedProductsDetails(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_uploadpermits_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getProductsPermitDetails($records);
            $res =array('success'=>true,'data'=> $data);
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
  
   
   public function getDisposalPermitProductsDetails(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_disposal_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getDisposalProductsPermitDetails($records);
            $res =array('success'=>true,'data'=> $data);
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
   
   public function getDisposalProductsPermitDetails($records){
    $data = array();

    $currencyData = getParameterItems('par_currencies','','mis_db');
    $packagingData = getParameterItems('par_packaging_units','','mis_db');

    $weightsData = getParameterItems('par_weights_units','','mis_db');
    
    foreach ($records as $rec) {

       $brand_name = getSingleRecordColValue('tra_product_information', array('id' => $rec->product_id), 'brand_name','mis_db');
       
       $data[] = array('application_code'=>$rec->application_code,
                       'product_id'=>$rec->product_id,
                       'quantity'=>$rec->quantity,
                       'currency_id'=>$rec->currency_id,
                       'packaging_unit_id'=>$rec->packaging_unit_id,
                       'brand_name'=>$brand_name,
                       'estimated_value'=>$rec->estimated_value,
                       'id'=>$rec->id,
                       'packaging_units'=>returnParamFromArray($packagingData,$rec->packaging_unit_id),
                       'currency_name'=>returnParamFromArray($currencyData,$rec->currency_id)
                   );
    }
    return $data;
   }
   
   public function getProductsPermitDetails($records){
    $data = array();

    $currencyData = getParameterItems('par_currencies','','mis_db');
    $weightsData = getParameterItems('par_weights_units','','mis_db');
    $siUnitsData = getParameterItems('par_si_units','','mis_db');
    $packagingData = getParameterItems('par_packaging_units','','mis_db');
    $permitReasonData = getParameterItems('par_permit_category','','mis_db');
    $permitprodrecommendationsData = getParameterItems('par_permitprod_recommendations','','mis_db');
    
    foreach ($records as $rec) {
		 $brand_name =  $rec->permitbrand_name;
		if(validateIsNumeric($rec->product_id)){
			 $brand_name = getSingleRecordColValue('tra_product_information', array('id' => $rec->product_id), 'brand_name','mis_db');
		}
		$country_oforigin_id = '';
		$manufacturer_name = '';
      if(validateIsNumeric($rec->manufacturer_id)){
		   $manufacturer_rec = getSingleRecord('tra_manufacturers_information', array('id' => $rec->manufacturer_id), 'mis_db');
		   $manufacturer_name = $manufacturer_rec->name;
		   $country_oforigin_id = $manufacturer_rec->country_id;
		   
	  }
      
	   $document_upload_id = 0;
	   $node_ref = '';
	   if(validateIsNumeric($rec->document_upload_id)){
		 $document_rec = getSingleRecord('tra_application_uploadeddocuments', array('id' => $rec->document_upload_id), 'mis_db');
         $node_ref = $document_rec->node_ref;
         $document_upload_id = $rec->document_upload_id;
	   }
      
       $data[] = array('application_code'=>$rec->application_code,
                      // 'device_type_id'=>$rec->device_type_id,
                       'product_id'=>$rec->product_id,
                       'quantity'=>$rec->quantity,
                       'document_upload_id'=>$document_upload_id,
                       'node_ref'=>$node_ref,
                       'currency_id'=>$rec->currency_id,
                       'permitprod_recommendation_id'=>$rec->permitprod_recommendation_id,
                       'packaging_unit_id'=>$rec->packaging_unit_id,
                       'total_weight'=>$rec->total_weight,
                       'pack_size'=>$rec->pack_size,
                       'unitpack_size'=>$rec->unitpack_size,
                       'unitpack_unit_id'=>$rec->unitpack_unit_id,
					   'pack_unit'=>returnParamFromArray($siUnitsData,$rec->unitpack_unit_id),
						'weights_units_id'=>$rec->weights_units_id,
						'visa_quantity'=>$rec->visa_quantity,
						'product_category_id'=>$rec->product_category_id,
						'common_name_id'=>$rec->common_name_id,
						'manufacturer_id'=>$rec->manufacturer_id,
						'country_oforigin_id'=>$country_oforigin_id,
						'manufacturer_name'=>$manufacturer_name,
                       'brand_name'=>$brand_name,
                       'id'=>$rec->id,
					   'record_id'=>$rec->id,
                       'packaging_units'=>returnParamFromArray($packagingData,$rec->packaging_unit_id),
                      'weight_units'=>returnParamFromArray($weightsData,$rec->weights_units_id),
                       'currency_name'=>returnParamFromArray($currencyData,$rec->currency_id),
                       'permitprod_recommendation'=>returnParamFromArray($permitprodrecommendationsData,$rec->permitprod_recommendation_id),
                       'unit_price'=>$rec->unit_price,
                    'dosage_form_id'=>$rec->dosage_form_id,
					'consignment_quantity'=>$rec->consignment_quantity,
                            'prodcertificate_no'=>$rec->prodcertificate_no,
                            'device_type_id'=>$rec->device_type_id,
                            'product_batch_no'=>$rec->product_batch_no,
                            'product_expiry_date'=>formatDate($rec->product_expiry_date),
                            'product_manufacturing_date'=>formatDate($rec->product_manufacturing_date),
                            'is_validated'=>$rec->is_validated,
                            //'errors_list'=>$rec->errors_list,
                       'total_value'=>($rec->unit_price*$rec->quantity),
                   );
    }
    return $data;
   }
   public function getApplicationCounterDetails(Request $req){
    try{
        $trader_id = $req->trader_id;
        
        $data = array();
        //get the records 
        $resp = false;
        $table_name = 'wb_importexport_applications as t1';
        $where_state = array('trader_id' => $trader_id);
        $records = DB::table($table_name)
                ->select(DB::raw("count(application_status_id) as application_counter,t2.name as status_name, t2.id as status_id"))
                ->join('wb_statuses as t2','t1.application_status_id','=','t2.id')
                ->where($where_state)
                 ->groupBy('t2.id')
                 ->get();
        if(count($records) >0){
                //delete functionality
                $res = array('success'=>true, 'data'=>$records);
        }else{
            $res = array('success'=>true, 'data'=>$data);
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
    
public function onPermitApplicationArchive(Request $req){
    try{
        $tracking_no = $req->tracking_no;
        $application_id = $req->application_id;
        $status_id = $req->status_id;
        $trader_id = $req->trader_id;
        $remarks = $req->remarks;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'wb_importexport_applications';
        $resp = false;
        $where_state = array('application_id' => $application_id, 'tracking_no'=>$tracking_no);
        $records = DB::table($table_name)
                    ->where($where_state)
                    ->first();
        if($records){
                //delete functionality
                $previous_status_id = $records->application_status_id;
                $current_status_id = 12;
                $premise_data = array('application_status_id'=>$current_status_id,
                                    'altered_by'=>$traderemail_address,
                                    'dola'=>Carbon::now(),
                                    'submission_date'=>Carbon::now(),
                                );
                $submission_data = array('tracking_no'=>$tracking_no,
                                        'application_code'=>$records->application_code,
                                        'trader_id'=>$trader_id,
                                        'remarks'=>$remarks,
                                        'previous_status_id'=>$previous_status_id,
                                        'current_status_id'=>$current_status_id,
                                        'submission_date'=>Carbon::now(),
                                        'created_by'=>$traderemail_address,
                                        'created_on'=>Carbon::now(),
                                    );
                
                $previous_data = getPreviousRecords($table_name, $where_state);
                $resp = updateRecord($table_name, $previous_data, $where_state, $premise_data, $traderemail_address,'mysql');
                
                $resp = insertRecord('wb_application_submissions', $submission_data, $traderemail_address,'mysql');
                                 
        }
        if($resp){
            $res = array('success'=>true, 'message'=>'Application has been archived successfully.');

        }   
        else{
            $res = array('success'=>false, 'message'=>' Application Submission failed, contact the system admin if this persists');
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
public function onAddNewProductinformation(Request $req){
    try{
        $section_id = $req->section_id;
        $brand_name = $req->brand_name;
        $classification_id = $req->classification_id;
        $product_category_id = $req->product_category_id;
        $common_name_id = $req->common_name_id;
        $physical_description = $req->physical_description;
        $trader_id = $req->trader_id;
        $traderemail_address = $req->traderemail_address;
        $data = array();
        //get the records 
        $table_name = 'tra_product_information';
        $resp = false;
        $prod_data = array('brand_name' => $brand_name,
                           'section_id'=>$section_id,
                           'classification_id'=>$classification_id,
                           'product_category_id'=>$product_category_id,
                           'common_name_id'=>$common_name_id,
                           'physical_description'=>$physical_description
                        );
        $where_state = array('brand_name' => $brand_name,
                 'section_id'=>$section_id);
        $records = DB::connection('mis_db')
                    ->table($table_name)
                    ->where($where_state)
                    ->get();
        
        if(count($records) === 0){
                //delete functionality
                $prod_data['created_on'] =  Carbon::now();
                $prod_data['created_by'] = $trader_id;
                $resp = insertRecord( $table_name , $prod_data, $trader_id,'mis_db');
                if($resp['success']){

                    $res = array('success'=>true, 'record_id'=>$resp['record_id'],
                                'message'=>'Product Details have been saved successsfully.');
        
                }   
                else{
                    $res = array('success'=>false,'data'=>$resp['message'], 'message'=>'Product Details have not been saved, try again or contact TFDA Authority');
                }                
        }
        else{
            $res = array('success'=>false, 'message'=>'Product Information Exists, search details to proceed.');


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
  
    public function getSenderreceiversDetails(Request $req){
        
        try{

            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
             $table_name = $req->table_name;
              $qry = DB::connection('mis_db')
                            ->table( $table_name.' as t1')
                            ->select('t1.*','t1.id', 't1.name', 't2.name as country', 't3.name as region','t4.name as district')
                            ->join('par_countries as t2', 't1.country_id', '=','t2.id')
                            ->leftJoin('par_regions as t3', 't1.region_id', '=','t3.id')
                            ->leftJoin('par_districts as t4', 't1.district_id', '=','t4.id')
                            ->orderBy('id', 'DESC');

                            if($search_value != ''){
                                $whereClauses = array();
                                $whereClauses[] = "t1.name like '%" . ($search_value) . "%'";
                                
                                $whereClauses[] = "t1.physical_address  like '%" . ($search_value) . "%'";
                                $filter_string = implode(' OR ', $whereClauses);
                                $qry->whereRAW($filter_string);
                            }
                        
                            $totalCount = $qry->count();
                            if(validateIsNumeric($take)){
                                $records = $qry->skip($skip)->take($take)->get();
                            }
                            else{
                        
                                $records = $qry->get();
                            }
                            
                                $res = array('success' => true,
                                    'data' => $records,'totalCount'=>$totalCount 
                                );
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
    public function onAddUniformApplicantDataset(Request $req){
        try{
            $resp ="";
            $trader_id = $req->trader_id;
            $traderemail_address = $req->traderemail_address;
            $email_address = $req->email_address;
            $email = $req->email;
            $error_message = 'Error occurred, data not saved successfully';

            $data = $req->all();
            $table_name = $req->table_name;
            $record_id = $req->id;
            $product_id = $req->product_id;
            unset($data['table_name']);
            unset($data['traderemail_address']);
           
			if(isset($data['trader_id'])){
				 unset($data['trader_id']);
			}
			if(isset($data['product_id'])){
				 unset($data['product_id']);
			}
            if(validateIsNumeric($record_id)){
                $where = array('id'=>$record_id);
                if (recordExists($table_name, $where,'mis_db')) {
                                
                    $data['dola'] = Carbon::now();
                    $data['altered_by'] = $traderemail_address;

                    $previous_data = getPreviousRecords($table_name, $where,'mis_db');
                    
                    $resp = updateRecord($table_name, $previous_data, $where, $data, $traderemail_address);
                    
                }
            }
            else{
                //insert 
                $data['created_by'] = $traderemail_address;
                $data['created_on'] = Carbon::now();
                
                    $resp = insertRecord($table_name, $data, $traderemail_address,'mis_db');
                   
                    $record_id = $resp['record_id'];           
               
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
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,
				'messa1'=>$resp,
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
    public function getAuthorisedProductsApplications(Request $req){
        try{
            $trader_id = $req->trader_id;
            $mistrader_id = $req->mistrader_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $mistrader_id = $req->mistrader_id;
            
            $identification_no = getSingleRecordColValue('wb_trader_account', array('id' => $mistrader_id), 'identification_no','mis_db');
            $section_id = $req->section_id;
            $search_value = $req->search_value;

            $qry = DB::connection('mis_db')
                    ->table('tra_product_information as t2')
                    ->join('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                    ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                    ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                    ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                    ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                    ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                    ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                    ->leftJoin('par_sections as t9', 't3.section_id', '=','t9.id')
                    ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                    ->leftJoin('wb_trader_account as t12', 't3.local_agent_id', '=','t12.id')
                    ->leftJoin('tra_trader_productauthorization as t11', function ($join) use($identification_no) {
                        $join->on('t1.id', '=', 't11.reg_product_id')
                             ->where('t11.status_id', '=', 1)
                             ->where('authorisedidentification_no', '=', $identification_no);
                    })
                    ->select('t3.product_id','t10.name as registrant','t12.name as localtechnical_representative',  't1.id as reg_product_id','t4.certificate_no as regcertificate_no','t2.id as product_id','t2.*','t2.brand_name', 't5.name as common_name','t9.name as section_name',  't6.name as classification_name', 't7.name as validity_status', 't1.validity_status_id')
                    ->where(function ($query) use ($trader_id,$mistrader_id) {
                        return $query->where('applicant_id', '=', $mistrader_id)
                                     ->orWhere('local_agent_id', '=', $mistrader_id);
                    })
                    ->where(array('t1.validity_status_id'=>2, 'registration_status_id'=>2));
                  
            if(validateIsNumeric($section_id)){

                $qry =  $qry->where('t3.section_id',$section_id);


            }
           
        
            $totalCount = $qry->count();
         
                $records = $qry->get();
           
            $dataset = array();
                foreach($records as $rec){
                        $retention_data = getProductRetentionStatus($rec->section_id,$rec->reg_product_id);

                        if($section_id == 2){

                        }
                        $dataset[] = array('product_id'=>$rec->product_id,
                                        'certificate_no'=>$rec->regcertificate_no,
                                        'section_name'=>$rec->section_name,
                                        'common_name'=>$rec->common_name,
                                        'brand_name'=>$rec->brand_name,
                                        'classification_name'=>$rec->classification_name,
                                        'registrant'=>$rec->registrant,
                                        'validity_status'=>$rec->validity_status,
                                        'retention_status'=>$retention_data['retention_status'],
                                        'retention_status_id'=>$retention_data['retention_status_id'],
                                        'validity_status_id'=>$rec->validity_status_id,
                                        'localtechnical_representative'=>$rec->localtechnical_representative
                                );

                }
                $res = array('success' => true,
                    'data' => $dataset,'totalCount'=>$totalCount 
                );
            
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
    public function getAllRegisteredNonRedProducts(Request $req){
        try{
            $trader_id = $req->trader_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $mistrader_id = $req->mistrader_id;
            
            
            $section_id = $req->section_id;
            $search_value = $req->search_value;
 
            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
			$total_qry = DB::connection('mis_db')
                            ->table('tra_product_information as t2')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
							
                            ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                           ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
							->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
							->select(DB::raw("count(t2.id) as total_rows"));
							DB::connection('mis_db')->enableQueryLog();
                $qry = DB::connection('mis_db')
                            ->table('tra_product_information as t2')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
							->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                           ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                            ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                            ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                            ->leftJoin('par_sections as t9', 't2.section_id', '=','t9.id') 
                            ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                            ->select(DB::raw("DISTINCT t3.product_id,t10.name as registrant, t4.certificate_no, t1.id as reg_product_id,t2.id as product_id,t2.*,t2.brand_name, t5.name as common_name, t9.name as section_name, t6.name as classification_name, t7.name as validity_status, t1.validity_status_id") );

           
            if(validateIsNumeric($section_id)){

                $qry->where('t2.section_id',$section_id);

              $total_qry->where('t2.section_id',$section_id);

            }
            if($search_value != ''){
                $whereClauses = array();
                $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
                
                $whereClauses[] = "t2.brand_name  like '%" . ($search_value) . "%'";
                $whereClauses[] = "t4.certificate_no  like '%" . ($search_value) . "%'";
                $filter_string = implode(' OR ', $whereClauses);
                //$qry->whereRAW($filter_string);
				$qry->where(function ($query) use ($filter_string) {
                        return $query->whereRAW($filter_string);
                });
				
				//$total_qry->whereRAW($filter_string);
				
				$total_qry->where(function ($query) use ($filter_string) {
                        return $query->whereRAW($filter_string);
                });
            }
        
            $totalCount = $total_qry->first()->total_rows;
            if(validateIsNumeric($take)){
                $records = $qry->skip($skip)->take($take)->get();
            }
            else{
                $records = $qry->get();
            }
			//print_r(DB::connection('mis_db')->getQueryLog());
            $dataset = array();
               
                $res = array('success' => true,
                    'data' => $records,'totalCount'=>$totalCount 
                );
            
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
    public function getRegisteredNonRegisteredProducts(Request $req){
 
        try{
            $trader_id = $req->trader_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $mistrader_id = $req->mistrader_id;
            
            
            $section_id = $req->section_id;
            $search_value = $req->search_value;
 
            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
           DB::connection('mis_db')->enableQueryLog();
            //seperate the registrable and non registrable 
           /* if($sub_module_id == 13 || $sub_module_id == 15 || $sub_module_id == 14){
$total_query =  DB::connection('mis_db')
                            ->table('tra_product_information as t2')
                            //->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                           // ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
							->select(DB::raw("count(t2.id) as total_acount"));
                $qry = DB::connection('mis_db')
                            ->table('tra_product_information as t2')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                            ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                            ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                            ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                            ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                            ->leftJoin('par_sections as t9', 't1.registration_status_id', '=','t9.id') 
                            ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                            ->select(DB::raw(" DISTINCT t2.id as product_id,t4.certificate_no,t10.name as registrant, t1.id as reg_product_id,t3.section_id, t2.id,t9.name as section_name, t5.name as common_name,t2.brand_name, t6.name as classification_name, t7.name as validity_status, t1.validity_status_id") );

            }
            else{
				*/
			if($sub_module_id == 78){
				$total_query =  DB::connection('mis_db')
                            ->table('tra_registered_products as t1')
                            ->join('tra_product_information as t2', 't1.tra_product_id','=','t2.id')
                            ->join('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                            ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
							->select(DB::raw("count(DISTINCT t1.id) as total_acount"));
							
                $qry = DB::connection('mis_db')
                            ->table('tra_product_applications as t3')
                            ->join('tra_product_information as t2', 't3.product_id','=','t2.id')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id', '=', 't2.id')
                            ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                            ->leftJoin('par_validity_statuses as t7', 't4.appvalidity_status_id', '=','t7.id')
                            ->leftJoin('par_registration_statuses as t8', 't4.appregistration_status_id', '=','t8.id')
                            ->leftJoin('par_sections as t9','t3.section_id', '=','t9.id')
                            ->leftJoin('tra_product_manufacturers as t11','t11.product_id', '=','t3.product_id')
                            ->leftJoin('tra_manufacturers_information as t12','t11.manufacturer_id' ,'=','t12.id')
                           
                            ->leftJoin('wb_trader_account as t10','t3.applicant_id', '=','t10.id')
                            ->select(DB::raw(" DISTINCT t3.product_id,t4.certificate_no,t10.name as registrant, t1.id as reg_product_id,t3.section_id, t2.id,t9.name as section_name, t5.name as common_name,t2.brand_name, t6.name as classification_name, t7.name as validity_status,t11.manufacturer_id, t12.name as manufacturer_name, t12.country_id as country_oforigin_id, t2.product_strength, t2.common_name_id, t2.product_category_id, t1.registration_status_id, t4.appvalidity_status_id as validity_status_id") )
							->groupBy('t3.product_id');
							
			}
			else{
				$total_query =  DB::connection('mis_db')
                            ->table('tra_registered_products as t1')
                            ->join('tra_product_information as t2', 't1.tra_product_id','=','t2.id')
                            ->join('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                            ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
							->select(DB::raw("count(DISTINCT t1.id) as total_acount"));
							
                $qry = DB::connection('mis_db')
                            ->table('tra_product_applications as t3')
                            ->join('tra_product_information as t2', 't3.product_id','=','t2.id')
                            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id', '=', 't2.id')
                            ->leftJoin('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                            ->leftJoin('par_validity_statuses as t7', 't4.appvalidity_status_id', '=','t7.id')
                            ->leftJoin('par_registration_statuses as t8', 't4.appregistration_status_id', '=','t8.id')
                            ->leftJoin('par_sections as t9','t3.section_id', '=','t9.id')
                            ->leftJoin('tra_product_manufacturers as t11','t11.product_id', '=','t3.product_id')
                            ->leftJoin('tra_manufacturers_information as t12','t11.manufacturer_id' ,'=','t12.id')
                           
                            ->leftJoin('wb_trader_account as t10','t3.applicant_id', '=','t10.id')
                            ->select(DB::raw(" DISTINCT t3.product_id,t4.certificate_no,t10.name as registrant, t1.id as reg_product_id,t3.section_id, t2.id,t9.name as section_name, t5.name as common_name,t2.brand_name, t6.name as classification_name, t7.name as validity_status,t11.manufacturer_id, t12.name as manufacturer_name, t12.country_id as country_oforigin_id, t2.product_strength, t2.common_name_id, t2.product_category_id, t1.registration_status_id, t4.appvalidity_status_id as validity_status_id") )
							->groupBy('t3.product_id');
				
			}
				
                          //  ->where(array('validity_status_id'=>2));
							/*
 ->where(function ($query) use ($trader_id,$mistrader_id) {
                                return $query->where('applicant_id', '=', $mistrader_id)
                                             ->orWhere('local_agent_id', '=', $mistrader_id);
                            })
							*/
          //  }

            
            if($search_value != ''){
                $whereClauses = array();
                $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
                
                $whereClauses[] = "t2.brand_name  like '%" . ($search_value) . "%'";
                $whereClauses[] = "t4.certificate_no  like '%" . ($search_value) . "%'";
                $filter_string = implode(' OR ', $whereClauses);
				
				$qry->where(function ($query) use ($filter_string) {
                                return $query->whereRAW($filter_string);
                            });
            }
			if(validateIsNumeric($section_id)){
				if($section_id == 1){
					
					   $qry->whereIn('t2.section_id',[1,7,8,9]);
					   $total_query->whereIn('t2.section_id',[1,7,8,9]);
				
						

				}
				else{
					    $qry->where('t2.section_id',$section_id);
						$total_query->where('t2.section_id',$section_id);

					
				}

            }
            $totalCount = $total_query->first()->total_acount;
            if(validateIsNumeric($take)){
                $records = $qry->skip($skip)->take($take)->get();
            }
            else{
        
                $records = $qry->get();
            }
            $dataset = array();
                foreach($records as $rec){
                        $retention_data = getProductRetentionStatus($rec->section_id,$rec->reg_product_id);

                        if($section_id == 2){

                        }
                        $dataset[] = array('product_id'=>$rec->product_id,
                                        'certificate_no'=>$rec->certificate_no,
                                        'section_name'=>$rec->section_name,
                                        'common_name'=>$rec->common_name,
                                        'brand_name'=>$rec->brand_name,
                                        'classification_name'=>$rec->classification_name,
                                        'registrant'=>$rec->registrant,
                                        'validity_status'=>$rec->validity_status,
                                        'retention_status'=>$retention_data['retention_status'],
                                        'retention_status_id'=>$retention_data['retention_status_id'],
                                        'validity_status_id'=>$rec->validity_status_id,
                                        'registration_status_id'=>$rec->registration_status_id,
                                        'product_category_id'=>$rec->product_category_id,
                                        'common_name_id'=>$rec->common_name_id,
                                        'product_strength'=>$rec->product_strength,
                                        'manufacturer_name'=>$rec->manufacturer_name,
										'country_oforigin_id'=>$rec->country_oforigin_id,
                                        'manufacturer_id'=>$rec->manufacturer_id
                                );
                }
                $res = array('success' => true,
                    'data' => $dataset,'totalCount'=>$totalCount 
                );
            
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
    public function getregulatedProductsPermitData(Request $req){
        try{
            $mistrader_id = $req->mistrader_id;

                $records = DB::connection('mis_db')->table('tra_trader_regulatedproducts as t1')
                            ->join('par_regulated_products  as t2', 't1.regulated_product_id', '=', 't2.id')
                            ->select('t2.bramd_name', 't1.authorised_permit_no', 't1.id as trader_regulatedproduct_id')
                            ->where(array('trader_id'=>$mistrader_id))
                            ->get();
                            $res = array(
                                'success' => false,
                                'data' => $records
                            );
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
    public function onDeletePermitdetails(Request $req){
            try{
                $record_id = $req->record_id;
                $application_code = $req->application_code;
                $application_id = $req->application_id;
                $table_name = $req->table_name;
                $title = $req->title;
                $email_address = $req->email_address;
                $data = array();
                //get the records 
                $resp = false;
                
                $where_state = array( 'id'=>$record_id);
                
                $records = DB::table($table_name)
                        ->where($where_state)
                        ->get();
                
                if(count($records) >0){
                        //delete functionality
                        $previous_data = getPreviousRecords($table_name, $where_state);
                        $resp = deleteRecordNoTransaction($table_name, $previous_data, $where_state,  $email_address);
                
                }
                if($resp){
                    $res = array('success'=>true, 'message'=>$title.' deleted successfully');
        
                }   
                else{
                    $res = array('success'=>false, 'message'=>$title.' delete failed, contact the system admin if this persists');
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
		
		public function funcControlledDrugsInitiateLicenseApplication(Request $req){
            try{
                    $application_code = $req->application_code;
                    $table_name = 'tra_importexport_applications';
                    $where = array('application_code'=>$application_code);
                    $sub_module_id = 61;
                    $application_status_id = 1;
                    $email = $req->email;
                    $trader_email = $req->trader_email;
                    $trader_id = $req->trader_id;
                    $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

                    if($rec){
                            
                            $section_id = $rec->section_id;
                            $reg_importexport_id = $rec->reg_importexport_id;

                            $record = DB::table('wb_importexport_applications')
                                          ->where(array('reg_importexport_id'=>$reg_importexport_id, 'sub_module_id'=>$sub_module_id))
                                          ->first();
												
                            if(!$record && $reg_importexport_id != 0){

                                $reference_no = $rec->reference_no;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id','mis_db');
                                $app_data = array('importexport_permittype_id'=>$rec->importexport_permittype_id,
                                        'sub_module_id'=>$sub_module_id,
                                        'reg_importexport_id'=>$rec->reg_importexport_id,
                                       
                                        'module_id'=>$rec->module_id, 
										'section_id'=>$rec->section_id,
                                        'permit_reason_id'=>$rec->permit_reason_id,
                                        'otherpermit_reason'=>$rec->otherpermit_reason,
										'has_registered_outlets'=>$rec->has_registered_outlets,
                                        'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
                                        'port_id'=>$rec->port_id,
                                        'process_id'=>$process_id,
                                        'mode_oftransport_id'=>$rec->mode_oftransport_id,
                                        'proforma_invoice_no'=>$rec->proforma_invoice_no,
                                        'proforma_invoice_date'=>formatDate($rec->proforma_invoice_date),
                                        'paying_currency_id'=>$rec->paying_currency_id,
										'proforma_currency_id'=>$rec->proforma_currency_id,
                                        'consignee_options_id'=>$rec->consignee_options_id,
                                        'consignee_id'=>$rec->consignee_id,
                                        'sender_receiver_id'=>$rec->sender_receiver_id,
                                        'premise_id'=>$rec->premise_id,
                                        'trader_id'=>$rec->applicant_id
                                    );
                                    if($rec->importexport_permittype_id == 4){
                                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                                        $app_data['hospital_address'] = $rec->hospital_address;
                                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                                        $app_data['prescription_no'] = $rec->prescription_no;
                                        
                                    }
                                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,'LIC');
    
                                    $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                                    $app_data['reference_no'] = $reference_no;
                                    $app_data['tracking_no'] = $reference_no;
                                    $app_data['application_code'] = $generateapplication_code;
                                    $app_data['application_status_id'] = $application_status_id;
                                    
                                    $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                                    if($resp['success']){
											$where_app = array('application_code'=>$generateapplication_code);
											if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
												initializeApplicationDMS(7, $module_id, $sub_module_id, $generateapplication_code, 'Application'.rand(0,1000), '');
											}
                                            saveApplicationSubmissionDetails($generateapplication_code,'wb_importexport_applications');  
                                            $res =$this->saveImportPermitProducts($generateapplication_code,$application_code,$trader_email);
											
                                            $res =$this->saveImportPermitDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id);
                                    }
                                    $app_data =  $this->getImportExportApplicationsDetails($generateapplication_code);
                                    
									
                                    $res = array('success'=>true, 
                                            'app_data'=>$app_data,
                                            'message'=>'Permit Application status updated successfully');


                            }
                            else{
                                        $res = array('success'=>false, 
                                        'message'=>'The Permit License Applicaton has already been initiated, check the dashboard and proceed, the tracking no is '.$record->tracking_no);
                            }

  
                    }else{

                        $res = array('success'=>false, 
                                      'message'=>'Permit Application do no exists, contact the authority for clarification');

                    }

            }
            catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
        }
        public function funcInitiateLicenseApplication(Request $req){
            try{
                    $application_code = $req->application_code;
                    $table_name = 'tra_importexport_applications';
                    $where = array('application_code'=>$application_code);
                    $sub_module_id = 82;
                    $application_status_id = 1;
                    $email = $req->email;
                    $trader_email = $req->trader_email;
                    $trader_id = $req->trader_id;
                    $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

                    if($rec){
                            
                            $section_id = $rec->section_id;
                            $reg_importexport_id = $rec->reg_importexport_id;

                            $record = DB::table('wb_importexport_applications')
                                          ->where(array('reg_importexport_id'=>$reg_importexport_id, 'sub_module_id'=>$sub_module_id))
										  ->where('application_status_id', 1)
                                          ->first();
											
                            if(!$record && $reg_importexport_id != 0){

                                $reference_no = $rec->reference_no;
                                $module_id = $rec->module_id;
								
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id','mis_db');
								
                                $app_data = array('importexport_permittype_id'=>$rec->importexport_permittype_id,
                                        'sub_module_id'=>$sub_module_id,
                                        'reg_importexport_id'=>$rec->reg_importexport_id,
                                       
                                        'module_id'=>$rec->module_id, 
										'section_id'=>$rec->section_id,
                                        'permit_reason_id'=>$rec->permit_reason_id,
                                        'otherpermit_reason'=>$rec->otherpermit_reason,
										'has_registered_outlets'=>$rec->has_registered_outlets,
                                        'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
										'permit_category_id'=>$rec->permit_category_id,
										'permit_productscategory_id'=>$rec->permit_productscategory_id,
										'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
										'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
										'document_upload_id' => $rec->document_upload_id,
									  
										'import_typecategory_id'=>$rec->import_typecategory_id,
                                        'port_id'=>$rec->port_id,
                                        'process_id'=>$process_id,
                                        'mode_oftransport_id'=>$rec->mode_oftransport_id,
                                       // 'proforma_invoice_no'=>$rec->proforma_invoice_no,
//'proforma_invoice_date'=>formatDate($rec->proforma_invoice_date),
                                        'paying_currency_id'=>$rec->paying_currency_id,
										'proforma_currency_id'=>$rec->proforma_currency_id,
                                        'consignee_options_id'=>$rec->consignee_options_id,
                                        'consignee_id'=>$rec->consignee_id,
                                        'sender_receiver_id'=>$rec->sender_receiver_id,
                                        'premise_id'=>$rec->premise_id,
                                        'trader_id'=>$rec->applicant_id
                                    );
                                    if($rec->importexport_permittype_id == 4){
                                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                                        $app_data['hospital_address'] = $rec->hospital_address;
                                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                                        $app_data['prescription_no'] = $rec->prescription_no;
                                        
                                    }
                                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,'LIC');
    
                                    $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                                    $app_data['reference_no'] = $reference_no;
                                    $app_data['tracking_no'] = $reference_no;
                                    $app_data['application_code'] = $generateapplication_code;
                                    $app_data['application_status_id'] = $application_status_id;
                                    
                                    $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                                    if($resp['success']){
											$where_app = array('application_code'=>$generateapplication_code);
											if (!recordExists('tra_application_documentsdefination', $where_app,'mis_db')) {
												initializeApplicationDMS(7, $module_id, $sub_module_id, $generateapplication_code, 'Application'.rand(0,1000), '');
											}
                                            saveApplicationSubmissionDetails($generateapplication_code,'wb_importexport_applications');  
                                            $res =$this->saveImportPermitProducts($generateapplication_code,$application_code,$trader_email);
											
                                            $res =$this->saveImportPermitDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id);
                                    }
                                    $app_data =  $this->getImportExportApplicationsDetails($generateapplication_code);
                                    
									
                                    $res = array('success'=>true, 
                                            'app_data'=>$app_data,
                                            'message'=>'Permit Application status updated successfully');


                            }
                            else{
                                        $res = array('success'=>false, 
                                        'message'=>'The Permit License Applicaton has already been initiated, check the dashboard and proceed, the tracking no is '.$record->tracking_no);
                            }

  
                    }else{

                        $res = array('success'=>false, 
                                      'message'=>'Permit Application do no exists, contact the authority for clarification');

                    }

            }
            catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
        }
        public function initiateRequestforPermitAmmendment(Request $req){
            try{
                    $application_code = $req->application_code;
                    $table_name = 'tra_importexport_applications';
                    $where = array('application_code'=>$application_code);
                    $sub_module_id = 79;
                    $application_status_id = 40;
                    $email = $req->email;
                    $trader_email = $req->trader_email;
                    $trader_id = $req->trader_id;
                    $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

                    if($rec){
                            
                            $section_id = $rec->section_id;
                            $reg_importexport_id = $rec->reg_importexport_id;

                            $record = DB::table('wb_importexport_applications')
                                                ->where(array('reg_importexport_id'=>$reg_importexport_id, 'application_status_id'=>$application_status_id))
                                                ->first();
												
                            if(!$record && $reg_importexport_id != 0){

                                $reference_no = $rec->reference_no;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id','mis_db');
                                $app_data = array('importexport_permittype_id'=>$rec->importexport_permittype_id,
                                        'sub_module_id'=>$sub_module_id,
                                        'reg_importexport_id'=>$rec->reg_importexport_id,
                                       
                                        'module_id'=>$rec->module_id, 'section_id'=>$rec->section_id,
                                        'permit_reason_id'=>$rec->permit_reason_id,
                                        'otherpermit_reason'=>$rec->otherpermit_reason,
										'has_registered_outlets'=>$rec->has_registered_outlets,
                                    'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
                                        'port_id'=>$rec->port_id,
                                        'process_id'=>$process_id,
                                        'mode_oftransport_id'=>$rec->mode_oftransport_id,
                                        'proforma_invoice_no'=>$rec->proforma_invoice_no,
                                        'proforma_invoice_date'=>formatDate($rec->proforma_invoice_date),
                                        'paying_currency_id'=>$rec->paying_currency_id,'proforma_currency_id'=>$rec->proforma_currency_id,
                                        'consignee_options_id'=>$rec->consignee_options_id,
                                        'consignee_id'=>$rec->consignee_id,
                                        'sender_receiver_id'=>$rec->sender_receiver_id,
                                        'premise_id'=>$rec->premise_id,
                                        'trader_id'=>$rec->applicant_id
                                    );
                                    if($rec->importexport_permittype_id == 4){
                                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                                        $app_data['hospital_address'] = $rec->hospital_address;
                                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                                        $app_data['prescription_no'] = $rec->prescription_no;
                                        
                                    }
                                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,'A');
    
                                    $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                                    $app_data['reference_no'] = $reference_no;
                                    $app_data['tracking_no'] = $reference_no;
                                    $app_data['application_code'] = $generateapplication_code;
                                    $app_data['application_status_id'] = $application_status_id;
                                    
                                    $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                                    if($resp['success']){

                                            saveApplicationSubmissionDetails($generateapplication_code,'wb_importexport_applications');  
                                            $res =$this->saveImportPermitProducts($generateapplication_code,$application_code,$trader_email);
											
                                            $res =$this->saveImportPermitDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id);
                                    }
                                    $app_data =  $this->getImportExportApplicationsDetails($generateapplication_code);
                                    
									
                                    $res = array('success'=>true, 
                                            'app_data'=>$app_data,
                                            'message'=>'Permit Application status updated successfully');


                            }
                            else{
                                        $res = array('success'=>false, 
                                        'message'=>'There is a Pending Request for Permit Amendment that has not been submitted, check the dashboard and proceed, the tracking no is '.$record->tracking_no);
                            }

  
                    }else{

                        $res = array('success'=>false, 
                                      'message'=>'Permit Application do no exists, contact the authority for clarification');

                    }

            }
            catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
        }
        function generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,$acronym){
            $where = array('reg_importexport_id'=>$reg_importexport_id,'sub_module_id'=>$sub_module_id);

            $count = DB::connection('mis_db')->table($table_name)->where($where)->count();
            if($count > 0){

                    $count =  $count+1;

            }else{

                $count =  1;
            }
            return $reference_no.'/'.$acronym.$count;

        }
			
		 public function saveImportInspectionPermitProducts($generateapplication_code,$application_code,$trader_email){
            $record = DB::connection('mis_db')->table('tra_permits_products')->where(array('application_code'=>$application_code))->get();
            $res = '';
			
            foreach($record as $rec){
                    $app_data = array('ctrdrugslicense_permits_drugs_id'=>$rec->id,
                            'productphysical_description'=>$rec->productphysical_description,
                            'common_name_id'=>$rec->common_name_id,
                            'product_id'=>$rec->product_id,
                            'conversion_unit'=>$rec->conversion_unit,
                            'product_strength'=>$rec->product_strength,
                            'quantity'=>$rec->quantity,
                            'consignment_quantity'=>$rec->consignment_quantity,
							 'document_upload_id'=>$rec->document_upload_id,
                            'visa_quantity'=>$rec->quantity,
                            'unit_price'=>$rec->unit_price,
                            'currency_id'=>$rec->currency_id,
                            'manufacturer_id'=>$rec->manufacturer_id,
                            'prodclass_category_id'=>$rec->prodclass_category_id,
                            'unitpack_size'=>$rec->unitpack_size,
                            'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'application_code'=>$generateapplication_code,
                            'section_id'=>$rec->section_id,
                            'pack_unit_id'=>$rec->pack_unit_id,
                            'permitbrand_name'=>$rec->permitbrand_name,
                            'permitcommon_name'=>$rec->permitcommon_name,
                            'product_batch_no'=>$rec->product_batch_no,
                            'product_manufacturing_date'=>$rec->product_manufacturing_date,
                            'product_expiry_date'=>$rec->product_expiry_date,
							
                            'product_registration_no'=>$rec->product_registration_no,
                            'country_oforigin_id'=>$rec->country_oforigin_id,
                            'created_by'=>0,
                            'created_on'=>Carbon::now()
                        );
               $res = insertRecord('wb_permits_products', $app_data, $trader_email);
				
            }
			return $res;
			
    }
		 
        public function saveImportPermitProducts($generateapplication_code,$application_code,$trader_email){
            $record = DB::connection('mis_db')->table('tra_permits_products')->where(array('application_code'=>$application_code))->get();
            $res = '';
			
            foreach($record as $rec){
                    $app_data = array('ctrdrugslicense_permits_drugs_id'=>$rec->id,
                            'productphysical_description'=>$rec->productphysical_description,
                            'common_name_id'=>$rec->common_name_id,
                            'product_id'=>$rec->product_id,
                            'conversion_unit'=>$rec->conversion_unit,
                            'product_strength'=>$rec->product_strength,
                            'quantity'=>$rec->quantity,
							 'document_upload_id'=>$rec->document_upload_id,
                            'visa_quantity'=>$rec->quantity,
                            'unit_price'=>$rec->unit_price,
                            'currency_id'=>$rec->currency_id,
                            'manufacturer_id'=>$rec->manufacturer_id,
                            'prodclass_category_id'=>$rec->prodclass_category_id,
                            'unitpack_size'=>$rec->unitpack_size,
                            'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'application_code'=>$generateapplication_code,
                            'section_id'=>$rec->section_id,
							 'product_batch_no'=>$rec->product_batch_no,
                            'product_manufacturing_date'=>$rec->product_manufacturing_date,
                            'product_expiry_date'=>$rec->product_expiry_date,
                            //'product_packaging'=>$rec->product_packaging,//'packaging_unit_id'=>$rec->packaging_unit_id,
                           // 'dosage_form_id'=>$rec->dosage_form_id,
                            'pack_unit_id'=>$rec->pack_unit_id,
                            'permitbrand_name'=>$rec->permitbrand_name,
                            'permitcommon_name'=>$rec->permitcommon_name,
                            'product_registration_no'=>$rec->product_registration_no,
                            'country_oforigin_id'=>$rec->country_oforigin_id,
                            'is_registered_product'=>$rec->is_registered_product,
                            'purpose_of_drugsuse'=>$rec->purpose_of_drugsuse,
                            'controlleddrugs_type_id'=>$rec->controlleddrugs_type_id,
                            'controlled_drugssubstances_id'=>$rec->controlled_drugssubstances_id,
                            'controlleddrugs_basesalt_id'=>$rec->controlleddrugs_basesalt_id,
                            'gramsbasesiunit_id'=>$rec->gramsbasesiunit_id,
                            'drugs_content'=>$rec->drugs_content,
                            'strength_asgrams'=>$rec->strength_asgrams,
                            'controlleddrug_base'=>$rec->controlleddrug_base, 
							'controlleddrug_baseunit_id'=>$rec->controlleddrug_baseunit_id,
                            'drugspackaging_type_id'=>$rec->drugspackaging_type_id,
                            'created_by'=>0,
                            'created_on'=>Carbon::now()
                        );
               $res = insertRecord('wb_permits_products', $app_data, $trader_email);
                  
            }
			return $res;
			
    }
    public function saveImportPermitDocuments($generateapplication_code,$application_code,$trader_email,$sub_module_id){
        $record = DB::connection('mis_db')->table('tra_application_uploadeddocuments')
                                ->where(array('application_code'=>$application_code))
                                ->get();
		$res = array();
        foreach($record as $rec){
                $document_data = array('application_code'=>$generateapplication_code,
                                'document_requirement_id'=>$rec->document_requirement_id,
                                'uploaded_on'=>Carbon::now(),
                                'file_name'=>$rec->file_name,
                                'initial_file_name'=>$rec->initial_file_name,
                                'file_type'=>$rec->file_type,
                                'fileSize'=>$rec->fileSize,
                                'node_ref'=>$rec->node_ref,
                                'dola'=>Carbon::now(),
                                'dc_module_id'=>$rec->dc_module_id,
                                'dc_sub_module_id'=>$rec->dc_sub_module_id,
                                'portalapp_variationsdata_id'=>$rec->portalapp_variationsdata_id,
                                'is_synched'=>1
                );
                $res = insertRecord('tra_application_uploadeddocuments', $document_data, 0,'mis_db');
                         
        }
		
}
public function getImportExportApplicationsDetails($application_code){
    $records = DB::table('wb_importexport_applications as t1')
    ->select('t1.*', 't7.name as action_name','t7.iconCls','t7.action', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
    ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
    ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
        $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
        $join->on('t1.importexport_permittype_id', '=', 't4.importexport_permittype_id');
        $join->on('t1.application_status_id', '=', 't4.status_id');
    })
    ->leftJoin('wb_processstatus_actions as t6',function($join){
        $join->on('t1.application_status_id', '=', 't6.status_id')
             ->on('t6.is_default_action', '=', DB::raw(1));
    })
    ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
    
    ->orderBy('t1.date_added','desc');
    $records =  $records->where(array('t1.application_code'=>$application_code));
    $data = $records->get();
    $data = $this->getSinglePermitApplications($data);

    return $data;
}
function getSinglePermitApplications($records){
		
    $actionColumnData = returnContextMenuActions();
    $data = array();

    $subModuleData = getParameterItems('sub_modules','','mis_db');
    $sectionsData = getParameterItems('par_sections','','mis_db');
    
    $permitCategoryData = getParameterItems('par_permit_category','','mis_db');
    $permitReasonData = getParameterItems('par_permit_reasons','','mis_db');
    $permitTypeData = getParameterItems('par_importexport_permittypes','','mis_db');
    $portData = getParameterItems('par_ports_information','','mis_db');
    
    foreach ($records as $rec) {
       $section = returnParamFromArray($sectionsData,$rec->section_id);
       $premises_name = getSingleRecordColValue('tra_premises', array('id' => $rec->premise_id), 'name','mis_db');
       $sender_receiver = getSingleRecordColValue('tra_permitsenderreceiver_data', array('id' => $rec->sender_receiver_id), 'name','mis_db');
       $consignee_name = getSingleRecordColValue('tra_consignee_data', array('id' => $rec->consignee_id), 'name','mis_db');
       
	  
	   
       $data = array('reference_no'=>$rec->reference_no,
                       'trader_id'=>$rec->trader_id,
                       'premise_id'=>$rec->premise_id,
                       'section_id'=>$rec->section_id,
                       'reg_importexport_id'=>$rec->reg_importexport_id,
                       'application_id'=>$rec->id,
                       'id'=>$rec->id,
					   
					   										'permit_productscategory_id'=>$rec->permit_productscategory_id,
										'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
										'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
										'document_upload_id' => $rec->document_upload_id,
									  
										'import_typecategory_id'=>$rec->import_typecategory_id,
					     'custom_declaration_no'=>$rec->custom_declaration_no,
                           'clearing_agent'=>$rec->clearing_agent,
                           'proposed_inspection_date'=>$rec->proposed_inspection_date,
                           'shipment_date'=>$rec->shipment_date,
                       'date_added'=>$rec->date_added,
                       'sub_module_id'=>$rec->sub_module_id,
                       'module_id'=>$rec->module_id,
                       'application_status_id'=>$rec->application_status_id,
                       'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).' Application',
                       'section'=>$section,
                       'created_by'=>$rec->created_by,
                       'submission_date'=>$rec->submission_date,
                        'otherpermit_reason'=>$rec->otherpermit_reason,
                        'importexport_permittype_id'=>$rec->importexport_permittype_id,
                       'permit_reason'=>returnParamFromArray($permitReasonData,$rec->permit_reason_id),
                       'importexport_permittype'=>returnParamFromArray($permitTypeData,$rec->importexport_permittype_id),
                       'proforma_currency_id'=>$rec->proforma_currency_id,
						'has_registered_outlets'=>$rec->has_registered_outlets,
                                    'reason_fornonregister_outlet'=>$rec->reason_fornonregister_outlet,
                       'permit_reason_id'=>$rec->permit_reason_id,
                       'proforma_invoice_no'=>$rec->proforma_invoice_no,
                       'proforma_invoice_date'=>$rec->proforma_invoice_date,
                       'has_nonregisteredprod_provision'=>returnColumnParamFromArray($permitTypeData,$rec->importexport_permittype_id,'has_nonregisteredprod_provision' ),   
                       	'permit_category_id'=>$rec->permit_category_id,
                       'premises_name'=>$premises_name,
                       'paying_currency_id'=>$rec->paying_currency_id,
                       'sender_receiver_id'=>$rec->sender_receiver_id,
                       'sender_receiver'=>$sender_receiver,
                       'section_name'=>$section,
                       'zone_id'=>$rec->zone_id,
                       'port_id'=>$rec->port_id,
                       'port_name'=>returnParamFromArray($portData,$rec->port_id),
                       'mode_oftransport_id'=>$rec->mode_oftransport_id,
                       'consignee_options_id'=>$rec->consignee_options_id,
                       'consignee_id'=>$rec->consignee_id,
                       'consignee_name'=>$consignee_name,
                       'pay_currency_id'=>$rec->pay_currency_id,
                       'added_by'=>$rec->created_by,
                       'tracking_no'=>$rec->tracking_no,
                       'status_name'=>$rec->status_name,
                       'router_link'=>$rec->router_link,
                       'process_title'=>$rec->process_title,
                       'action_name'=>$rec->action_name,
                       'action'=>$rec->action,
                       'iconCls'=>$rec->iconCls,

                       'has_apppliedctrdrugs_license'=>$rec->has_apppliedctrdrugs_license,

                       'license_application_code'=>$rec->license_application_code,
                       'controlled_drugslicense_no'=>$rec->controlled_drugslicense_no,

                       'approximate_dateof_arrival'=>$rec->approximate_dateof_arrival,
                       'application_code'=>$rec->application_code,
                       'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                   );
    }
    return $data;

    
}
 public function funcInitiateInspectionBooking(Request $req){
            try{
                    $application_code = $req->application_code;
                    $table_name = 'tra_importexport_applications';
                    $where = array('application_code'=>$application_code);
                    $sub_module_id = 49;
                    $application_status_id = 1;
                    $email = $req->email;
                    $trader_email = $req->trader_email;
                    $trader_id = $req->trader_id;
                    $rec = DB::connection('mis_db')->table($table_name)->where($where)->first();

                    if($rec){
                            
                            $section_id = $rec->section_id;
                            $reg_importexport_id = $rec->reg_importexport_id;

                            $record = DB::table('wb_importexport_applications')
                                                ->where(array('reg_importexport_id'=>$reg_importexport_id, 'sub_module_id'=>$sub_module_id))
                                                ->first();
												
                            if(!$record && $reg_importexport_id != 0){

                                $reference_no = $rec->reference_no;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses', array('sub_module_id' => $sub_module_id), 'id','mis_db');
                                $app_data = array('importexport_permittype_id'=>$rec->importexport_permittype_id,
                                        'sub_module_id'=>$sub_module_id,
                                        'reg_importexport_id'=>$rec->reg_importexport_id,
                                        'module_id'=>$rec->module_id, 'section_id'=>$rec->section_id,
                                        'permit_reason_id'=>$rec->permit_reason_id,
                                        'otherpermit_reason'=>$rec->otherpermit_reason,
										
										
                                        'permit_productscategory_id'=>$rec->permit_productscategory_id,
										'eligible_importersdoctype_id' => $rec->eligible_importersdoctype_id,
										'eligible_importerscategory_id' => $rec->eligible_importerscategory_id,
										'document_upload_id' => $rec->document_upload_id,
									  
										'import_typecategory_id'=>$rec->import_typecategory_id,
										'permit_category_id'=>$rec->permit_category_id,
										
                                        'port_id'=>$rec->port_id,
                                        'process_id'=>$process_id,
                                        'poeinspection_recommendation_id'=>1,
                                        'mode_oftransport_id'=>$rec->mode_oftransport_id,
                                        'proforma_invoice_no'=>$rec->proforma_invoice_no,
                                        'proforma_invoice_date'=>formatDate($rec->proforma_invoice_date),
                                        'paying_currency_id'=>$rec->paying_currency_id,'proforma_currency_id'=>$rec->proforma_currency_id,
                                        'consignee_options_id'=>$rec->consignee_options_id,
                                        'consignee_id'=>$rec->consignee_id,
                                        'sender_receiver_id'=>$rec->sender_receiver_id,
                                        'premise_id'=>$rec->premise_id,
                                        'trader_id'=>$rec->applicant_id
                                    );
                                    if($rec->importexport_permittype_id == 4){
                                        $app_data['has_medical_prescription'] = $rec->has_medical_prescription;
                                        $app_data['prescribling_hospital'] = $rec->prescribling_hospital;
                                        $app_data['hospital_address'] = $rec->hospital_address;
                                        $app_data['prescribing_doctor'] = $rec->prescribing_doctor;
                                        $app_data['prescription_no'] = $rec->prescription_no;
                                        
                                    }

                                    $reference_no = $this->generateImportPermitAmmendmentTrackingno($reference_no,$reg_importexport_id,$table_name,$sub_module_id,'INSP');
    
                                    $generateapplication_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');
                                    $app_data['reference_no'] = $reference_no;
                                    $app_data['tracking_no'] = $reference_no;
                                    $app_data['application_code'] = $generateapplication_code;
                                    $app_data['application_status_id'] = $application_status_id;
                                    
                                    $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                                    if($resp['success']){

                                            saveApplicationSubmissionDetails($generateapplication_code,'wb_importexport_applications');
                                            //check the porducts 

                                            $res = $this->saveImportInspectionPermitProducts($generateapplication_code,$application_code,$trader_email);

                                    }
                                    $app_data =  $this->getImportExportApplicationsDetails($generateapplication_code);
                                   
                                    $res = array('success'=>true, 
                                            'app_data'=>$app_data,
                                            'message'=>'Permit Application status updated successfully');


                            }
                            else{
                                        $res = array('success'=>false, 
                                        'message'=>'The Permit License Applicaton has already been initiated, check the dashboard and proceed, the tracking no is '.$record->tracking_no);
                            }

  
                    }else{

                        $res = array('success'=>false, 
                                      'message'=>'Permit Application do no exists, contact the authority for clarification');

                    }

            }
            catch (\Exception $exception) {
				$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');

			} catch (\Throwable $throwable) {
				$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), '');
			}
			 return response()->json($res, 200);
        }

   public function getPersonalOneYearImportAuthorisationapplication(Request $req){
    try{
        $trader_id = $req->trader_id;
        $application_status_id = $req->application_status_id;
        
        $application_status_ids = explode(',',  $application_status_id);
        $sub_module_id = $req->sub_module_id;
        $section_id = $req->section_id;

        $data = array();
        //get the records 
       
        $records = DB::table('wb_importexport_applications as t1')
            ->select('t1.*','t7.name as action_name','t7.iconCls','t7.action', 't3.name as status', 't3.name as status_name','t4.router_link','t4.name as process_title')
            ->leftJoin('wb_statuses as t3', 't1.application_status_id','=','t3.id')
            ->leftJoin('wb_tfdaprocesses as t4', function ($join) {
                $join->on('t1.sub_module_id', '=', 't4.sub_module_id');
                $join->on('t1.application_status_id', '=', 't4.status_id');
            })
            ->leftJoin('wb_processstatus_actions as t6',function($join){
                $join->on('t1.application_status_id', '=', 't6.status_id')
                     ->on('t6.is_default_action', '=', DB::raw(1));

            })
            ->leftJoin('wb_statuses_actions as t7', 't6.action_id','t7.id')
            ->where(array('t1.trader_id' => $trader_id))
            ->orderBy('t1.date_added','desc');
            
            if(is_array($application_status_ids) && count($application_status_ids) >0 && $application_status_id != ''){
                    
                $records =  $records->whereIn('t1.application_status_id', $application_status_ids);

            }if(validateIsNumeric($sub_module_id)){
                $records =  $records->where(array('t1.sub_module_id'=>$sub_module_id));
            }if(validateIsNumeric($section_id)){
                $records =  $records->where(array('t1.section_id'=>$section_id));
            }

            //the ilters 
            $records = $records->get();

            $data = $this->getPersonalOneYearImportAuthorisationdetails($records);
            $res =array('success'=>true,'data'=> $data);
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

    
function getPersonalOneYearImportAuthorisationdetails($records){
        
    $actionColumnData = returnContextMenuActions();
    $data = array();

    $subModuleData = getParameterItems('sub_modules','','mis_db');
    $sectionsData = getParameterItems('par_sections','','mis_db');
    
    foreach ($records as $rec) {
       $section = returnParamFromArray($sectionsData,$rec->section_id);
       $prem_record = getSingleRecord('tra_premises', array('id' => $rec->premise_id),'mis_db');
        
       $data[] = array('reference_no'=>$rec->reference_no,
                       'trader_id'=>$rec->trader_id,
                       'premise_id'=>$rec->premise_id,
                       'section_id'=>$rec->section_id,
                       'application_id'=>$rec->id,
                       'id'=>$rec->id,
                       'date_added'=>$rec->date_added,
                       'sub_module_id'=>$rec->sub_module_id,
                       'module_id'=>$rec->module_id,
                       'reason_for_authorisation'=>$rec->reason_for_authorisation,
                       'application_status_id'=>$rec->application_status_id,
                       'application_type'=>returnParamFromArray($subModuleData,$rec->sub_module_id).'   Application',
                       'section'=>$section,
                       'created_by'=>$rec->created_by,
                       'submission_date'=>$rec->submission_date,
                       'premises_name'=>$prem_record->name,
                       'premises_physical_address'=>$prem_record->physical_address,
                       'section_name'=>$section,
                       'zone_id'=>$rec->zone_id,
                       'added_by'=>$rec->created_by,
                       'tracking_no'=>$rec->tracking_no,
                       'status_name'=>$rec->status_name,
                       'router_link'=>$rec->router_link,
                       'process_title'=>$rec->process_title,
                       'action_name'=>$rec->action_name,
                       'action'=>$rec->action,
                       'iconCls'=>$rec->iconCls,
                       'application_code'=>$rec->application_code,
                       
                       'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                   );
    }
    
    return $data;


}

    public function saveOneYearAuthorisationApplication(Request $req){
        try {
            $application_id = $req->application_id;
            $trader_id = $req->trader_id;
            $email = $req->email;
            $trader_email = $req->trader_email;
            $section_id = $req->section_id;
            $module_id = $req->module_id;
            $sub_module_id = $req->sub_module_id;
            $proforma_currency_id = $req->proforma_currency_id;

            $tracking_no = $req->tracking_no;
            $zone_id = $req->zone_id;
            $application_code = $req->application_code;
            $app_data = array('section_id'=>$req->section_id,
                                    'sub_module_id'=>$req->sub_module_id,
                                    'module_id'=>$req->module_id,
                                    'reason_for_authorisation'=>$req->reason_for_authorisation,
                                    'premise_id'=>$req->premise_id,
                                    'zone_id'=>$req->zone_id,
                                    'trader_id'=>$trader_id
                                );
                      
                        /** Already Saved */ 
                        $table_name = 'wb_importexport_applications';
                        $sub_module_id = $req->sub_module_id;
                  
                        if(validateIsNumeric($application_id)){
                               
                               $where_app = array('id'=>$application_id);

                                if (recordExists('wb_importexport_applications', $where_app)) {
                                    
                                    $app_data['altered_by'] = $trader_email;
                                    $app_data['dola'] = Carbon::now();
                                   
                                    $previous_data = getPreviousRecords('wb_importexport_applications', $where_app);
                                    $reference_no = $previous_data['results'][0]['reference_no'];
                                    $application_code = $previous_data['results'][0]['application_code'];
                                    
                                    $resp =   updateRecord('wb_importexport_applications', $previous_data, $where_app, $app_data, $trader_email);
                                   
                                   
                            }
                        }
                        else{
                            $record = '';
                          
                                
                                $app_data['created_on'] = Carbon::now();
                                
                                $app_data['date_added'] = Carbon::now();
                                $app_data['created_by'] = $trader_email;
                                
                                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code','mis_db');
                                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code','mis_db');
                                
                                $apptype_code = getSingleRecordColValue('sub_modules', array('id' => $sub_module_id), 'code','mis_db');
                                
                                $ref_id = 0;
                                $process_id = getSingleRecordColValue('wf_tfdaprocesses',array('module_id'=>$module_id, 'section_id'=>$section_id,'sub_module_id'=>$sub_module_id), 'id','mis_db');
                                $codes_array = array(
                                    'section_code' => $section_code,
                                    'zone_code' => $zone_code,
                                    'apptype_code'=>$apptype_code
                                );
                                
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'reference_type_id' => 1), 'reference_format_id','mis_db');
                                $application_code = generateApplicationCode($sub_module_id, 'wb_importexport_applications');

                                $tracking_no = generateApplicationRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $trader_id);
                                if (!validateIsNumeric($ref_id )) {
                                    return \response()->json(array('success'=>false, 'message'=>'Reference No Format has not been set, contact the system administrator'));
                                }
                                else if( $tracking_no == ''){
                                    return \response()->json(array('success'=>false,'tracking_no'=>$tracking_no, 'message'=>$tracking_no));
                                }
                               $app_data['tracking_no'] =   $tracking_no;
                               $app_data['reference_no'] =   $tracking_no;
                               $app_data['application_status_id'] =   1;
                               $app_data['application_code'] =   $application_code;
                                    
                               $resp = insertRecord('wb_importexport_applications', $app_data, $trader_email);
                              
                               $record_id = $resp['record_id'];
                               $application_id = $record_id;
                               if($resp['success']){
                                     initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $tracking_no, $trader_id);
                                        saveApplicationSubmissionDetails($application_code,$table_name);  
                                }
                               
                        }
                        if($resp['success']){
                            $res = array('tracking_no'=>$tracking_no,
                                        'application_id'=>$application_id,
                                        'application_code'=>$application_code,
                                         'module_id'=>$module_id,
                                         'sub_module_id'=>$sub_module_id,
                                         'success'=>true,
                                         'message'=>'Application Saved Successfully, with Tracking No: '.$tracking_no);
                                        
                         }
                         else{
                            $res = array(
                            'success'=>false,
                            'message'=>'Error Occurred Application not saved, it this persists contact the system Administrator');
                         }

                               
                        
        } catch (\Exception $exception) {
            $res = array(
                'success' => false,'data'=>$resp,
                'message' => $exception->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
				//'data'=>$resp,
                'message' => $throwable->getMessage()
            );
        }
        
        return response()->json($res);   

    }
public function savepersonalAuthorisedProductsData(Request $req){
    try{

        $resp ="";
        $trader_id = $req->trader_id;
        $trader_email = $req->trader_email;
        $application_code = $req->application_code;
       
        $product_id = $req->product_id;
        $record_id = $req->id;
       
        $device_type_id = $req->device_type_id;
       
        $error_message = 'Error occurred, data not saved successfully';
        //check uniform currency 
        if(!validateIsNumeric($product_id)){
            $product_id = $this->onAddingNewProductDetails($req);

        }
        $document_requirement_id = 100;
        $document_upload_id = 0;// $this->onUploadDocuments($req,$document_requirement_id);

        $table_name = 'wb_personauthorised_products';
        $data = array('application_code'=>$application_code,
                        'section_id'=>$req->section_id,
                        'permitbrand_name'=>$req->brand_name,
                        'productphysical_description'=>$req->productphysical_description,
                        'manufacturer_id'=>$req->manufacturer_id,'country_oforigin_id'=>$req->country_oforigin_id,
                        'product_id'=>$product_id
                );

                if(validateIsNumeric($record_id)){
                    $where = array('id'=>$record_id);
                    if (recordExists($table_name, $where)) {
                                    
                        $data['dola'] = Carbon::now();
                        $data['altered_by'] = $trader_email;
    
                        $previous_data = getPreviousRecords($table_name, $where);
                        
                        $resp = updateRecord($table_name, $previous_data, $where, $data, $trader_email);
                        
                    }if($resp['success']){
                        $res =  array('success'=>true,
                        'record_id'=>$record_id,
                        'message'=>'Saved Successfully');
        
                    }
                    else{
                        $res =  array('success'=>false,
                        'message'=>$error_message);
        
                    }
                }
                else{
                    
                        $data['created_by'] = $trader_email;
                        $data['created_on'] = Carbon::now();
                        $resp = insertRecord($table_name, $data, $trader_email);
                        $record_id = $resp['record_id'];     
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
            'success' => false,'resp'=>$resp,
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
 public function getpersonalAuthorisedProductsData(Request $req){
    try{
        $application_code = $req->application_code;
        $data = array();
        //get the records 
        $records = DB::table('wb_personauthorised_products as t1')
            ->select('t1.*')
            ->where(array('t1.application_code' => $application_code))
            ->get();
            $data = $this->getpersonalAuthorisedProductsDetails($records);
            $res =array('success'=>true,'data'=> $data);
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
   
   public function getpersonalAuthorisedProductsDetails($records){
    $data = array();
    foreach ($records as $rec) {

       $prod_record = getSingleRecord('tra_product_information', array('id' => $rec->product_id),'mis_db');
       
       $common_name = getSingleRecordColValue('par_common_names', array('id' => $prod_record->common_name_id), 'name','mis_db');
       $classification_name = getSingleRecordColValue('par_classifications', array('id' => $prod_record->classification_id), 'name','mis_db');
       $product_category = getSingleRecordColValue('par_product_categories', array('id' => $prod_record->product_category_id), 'name','mis_db');
       $manufacturer_name = getSingleRecordColValue('tra_manufacturers_information', array('id' => $rec->manufacturer_id), 'name','mis_db');
       $data[] = array('application_code'=>$rec->application_code,
                      
                       'product_id'=>$rec->product_id,
                       'brand_name'=>$prod_record->brand_name,
                       'common_name'=>$common_name,
                       'classification_name'=>$classification_name,
                       'manufacturer_name'=>$manufacturer_name,
                       'product_category'=>$product_category,
                       'common_name_id'=>$prod_record->common_name_id,
                       'country_oforigin_id'=>$rec->country_oforigin_id,
                       'device_type_id'=>$prod_record->device_type_id,
                       'manufacturer_id'=>$rec->manufacturer_id,
                       'product_category_id'=>$prod_record->product_category_id,
                       'product_strength'=>$prod_record->product_strength,
                       'product_subcategory_id'=>$prod_record->product_subcategory_id,
                       'productdosage_id'=>$prod_record->dosage_form_id,
                       'productclassification_id'=>$prod_record->classification_id,
                       'productphysical_description'=>$rec->productphysical_description,
                       'id'=>$rec->id,
                       
                   );
    }
    return $data;
   }
  public function getPersonalisedApprovedAuthorisedProducts(Request $req){
 
        try{
           
            $mistrader_id = $req->mistrader_id;
            $section_id = $req->section_id;
            $search_value = $req->search_value;
 
            $take = $req->take;
            $skip = $req->skip;
            $searchValue = $req->searchValue;
            $search_value =  '';
            if($req->searchValue != 'undefined' && $req->searchValue != ''){
                $searchValue = explode(',',$searchValue);
                $search_value =  $searchValue[2];
            }
           DB::connection('mis_db')->enableQueryLog();
          
$total_query =  DB::connection('mis_db')
                            ->table('tra_importexport_applications as t1')
                            ->join('tra_personauthorised_products as t2', 't1.application_code','=','t2.application_code')
                            ->join('tra_product_information as t3', 't2.product_id', '=', 't3.id')
                            ->join('tra_managerpermits_review as t4', 't1.application_code', '=','t4.application_code')
							->select(DB::raw("count(DISTINCT t1.id) as total_acount"));
							
                $qry = DB::connection('mis_db')
                            ->table('tra_importexport_applications as t3')
                            ->join('tra_personauthorised_products as t2', 't3.application_code','=','t2.application_code')
                            ->leftJoin('tra_product_information as t1', 't2.product_id', '=', 't1.id')
                            ->leftJoin('tra_managerpermits_review as t4', 't3.application_code', '=','t4.application_code')
                            ->leftJoin('par_common_names as t5', 't1.common_name_id', '=','t5.id')
                            ->leftJoin('par_classifications as t6', 't1.classification_id', '=','t6.id')
                            ->leftJoin('par_sections as t9', 't2.section_id', '=','t9.id')
                            ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                            ->leftJoin('par_permitprod_recommendations as t11', 't2.permitprod_recommendation_id', '=','t11.id')
                            ->select(DB::raw(" DISTINCT t4.certificate_no,t10.name as registrant, t1.id as product_id,t3.section_id,t1.common_name_id, t2.id,t9.name as section_name, t5.name as common_name,t1.brand_name,t2.manufacturer_id,t2.permitprod_recommendation_id,t4.decision_id, t2.country_oforigin_id, t6.name as classification_name"));
                           // ->where(array('applicant_id'=>$mistrader_id));
                          //  ->where(array('t2.permitprod_recommendation_id'=>2))
                            //->where(array('t4.decision_id'=>1));


            if($search_value != ''){
                $whereClauses = array();
                $whereClauses[] = "t5.name like '%" . ($search_value) . "%'";
                $whereClauses[] = "t1.brand_name  like '%" . ($search_value) . "%'";
                $filter_string = implode(' OR ', $whereClauses);
				
				$qry->where(function ($query) use ($filter_string) {
                                return $query->whereRAW($filter_string);
                            });
            }
			if(validateIsNumeric($section_id)){

               // $qry->where('t1.section_id',$section_id);
				
			//	$total_query->where('t1.section_id',$section_id);

            }
            $totalCount = $total_query->first()->total_acount;
            if(validateIsNumeric($take)){
                $records = $qry->skip($skip)->take($take)->get();
            }
            else{
        
                $records = $qry->get();
            }
            $dataset = array();
                foreach($records as $rec){
                       
                        $dataset[] = array('product_id'=>$rec->product_id,
                                        'section_name'=>$rec->section_name,
                                        'common_name'=>$rec->common_name,
                                        'brand_name'=>$rec->brand_name,
                                        'permitprod_recommendation_id'=>$rec->permitprod_recommendation_id,
                                        'common_name_id'=>$rec->common_name_id,
                                        'manufacturer_id'=>$rec->manufacturer_id,
                                        'country_oforigin_id'=>$rec->country_oforigin_id,
                                        'classification_name'=>$rec->classification_name,
                                        'registrant'=>$rec->registrant
                                );

                }
                $res = array('success' => true,
                    'data' => $dataset,'totalCount'=>$totalCount 
                );
            
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
    public function getApprrovedVisaProducts(Request $req){
        try{
            $application_code = $req->application_code;
            $reg_importexport_id = getSingleRecordColValue('wb_importexport_applications', array('application_code' => $req->application_code), 'reg_importexport_id');
            
            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_permits_products as t1')
                    ->join('par_currencies as t2', 't1.currency_id', 't2.id')
                    ->leftJoin('par_weights_units as t3', 't1.weights_units_id', 't3.id')
                    ->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
                    ->leftJoin('par_permitprod_recommendations as t5', 't1.permitprod_recommendation_id', 't5.id')
                    ->leftJoin('tra_product_information as t6', 't1.product_id', 't6.id')
                    ->leftJoin('tra_manufacturers_information as t7', 't1.manufacturer_id', 't7.id')
                    ->leftJoin('tra_importexport_applications as t8', 't1.application_code', 't8.application_code')
                ->select('t1.*','t8.reg_importexport_id', 't1.id as approvedvisa_product_id', 't2.name as currency_name','t3.name as weight_name', 't4.name as packaging_unit', 't5.name as recommendation', 't6.brand_name', 't7.name as manufacture_name')
                ->where(array('t8.reg_importexport_id' => $reg_importexport_id, 'sub_module_id'=>12))
                ->get();
                $data = $this->getApprovedVisaProductsPermitDetails($records);
                $res =array('success'=>true,'data'=> $data);
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
       public function funcGetVisaProductQty($visa_quantity, $reg_importexport_id,$approvedvisa_product_id, $sub_module_id){
                $total_qty = 0;
                $license_qty = DB::table('wb_permits_products as t1')
                                    ->join('wb_importexport_applications as t2', 't1.application_code', 't2.application_code')
                                    
                                    ->select(DB::raw('sum(t1.quantity) as total_qty'))
                                    ->where(array('t2.reg_importexport_id'=>$reg_importexport_id, 't1.approvedvisa_product_id'=>$approvedvisa_product_id))
                                    ->where('t2.sub_module_id', '<>', $sub_module_id)
                                    ->first();
                    if($license_qty){
                        $total_qty = $license_qty->total_qty;

                    }

                return ($visa_quantity - $total_qty);
       }
       public function getApprovedVisaProductsPermitDetails($records){
        $data = array();
        
        foreach ($records as $rec) {
             $brand_name =  $rec->permitbrand_name;
            if(validateIsNumeric($rec->product_id)){
                 $brand_name = $rec->brand_name;
            }
            $country_oforigin_id = '';
            $manufacturer_name = '';
            $visabalance_quantity = $this->funcGetVisaProductQty($rec->quantity, $rec->reg_importexport_id,$rec->approvedvisa_product_id, 82);

           $data[] = array('application_code'=>$rec->application_code,
                           'product_id'=>$rec->product_id,
                           'quantity'=>$rec->quantity,
                           'currency_id'=>$rec->currency_id,
                           'permitprod_recommendation_id'=>$rec->permitprod_recommendation_id,
                           'permitprod_recommendation_remarks'=>$rec->permitprod_recommendation_remarks,
                           'packaging_unit_id'=>$rec->packaging_unit_id,
                           'total_weight'=>$rec->total_weight,
                           'pack_size'=>$rec->pack_size,
                           'unitpack_size'=>$rec->unitpack_size,
                           'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'weights_units_id'=>$rec->weights_units_id,
                            'visa_quantity'=>$rec->quantity,
                            'visabalance_quantity'=>$visabalance_quantity,
                            'product_category_id'=>$rec->product_category_id,
                            'common_name_id'=>$rec->common_name_id,
                            'manufacturer_id'=>$rec->manufacturer_id,
                            'country_oforigin_id'=>$country_oforigin_id,
                            'manufacturer_name'=>$manufacturer_name,
                           'brand_name'=>$brand_name,

                           'packaging_units'=>$rec->packaging_unit,
                            'weight_units'=>$rec->weight_name,
                           'currency_name'=>$rec->currency_name,
                           'permitprod_recommendation'=>$rec->recommendation,
                           'unit_price'=>$rec->unit_price,
                            'dosage_form_id'=>$rec->dosage_form_id,
                             'consignment_quantity'=>$rec->consignment_quantity,
                                'prodcertificate_no'=>$rec->prodcertificate_no,
                                'device_type_id'=>$rec->device_type_id,
                                'product_batch_no'=>$rec->product_batch_no,
                                'product_expiry_date'=>formatDate($rec->product_expiry_date),
                                'product_manufacturing_date'=>formatDate($rec->product_manufacturing_date),
                                'approvedvisa_product_id'=>$rec->approvedvisa_product_id,
                           'total_value'=>($rec->unit_price*$rec->quantity),
                       );
        }
        return $data;
       }

       
       public function getApprrovedLicensesProducts(Request $req){
        try{
            $application_code = $req->application_code;
            $reg_importexport_id = getSingleRecordColValue('wb_importexport_applications', array('application_code' => $req->application_code), 'reg_importexport_id');
            
            $data = array();
            //get the records 
            $records = DB::connection('mis_db')->table('tra_permits_products as t1')
                    ->join('par_currencies as t2', 't1.currency_id', 't2.id')
                    ->leftJoin('par_weights_units as t3', 't1.weights_units_id', 't3.id')
                    ->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
                    ->leftJoin('par_permitprod_recommendations as t5', 't1.permitprod_recommendation_id', 't5.id')
                    ->leftJoin('tra_product_information as t6', 't1.product_id', 't6.id')
                    ->leftJoin('tra_manufacturers_information as t7', 't1.manufacturer_id', 't7.id')
                    ->leftJoin('tra_importexport_applications as t8', 't1.application_code', 't8.application_code')
                ->select('t1.*','t8.reg_importexport_id', 't1.id as approvedlicense_product_id', 't2.name as currency_name','t3.name as weight_name', 't4.name as packaging_unit', 't5.name as recommendation', 't6.brand_name', 't7.name as manufacture_name')
                ->where(array('t8.reg_importexport_id' => $reg_importexport_id))
                ->whereIn('t8.sub_module_id', [78,81,82])
                ->get();
                //'sub_module_id'=>12
                $data = $this->getApprovedLicenseProductsPermitDetails($records);
                $res =array('success'=>true,'data'=> $data);
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
       public function getApprovedLicenseProductsPermitDetails($records){
        $data = array();
        
        foreach ($records as $rec) {
             $brand_name =  $rec->permitbrand_name;
            if(validateIsNumeric($rec->product_id)){
                 $brand_name = $rec->brand_name;
            }
            $country_oforigin_id = '';
            $manufacturer_name = '';
            $licensebalance_quantity = $this->funcGetLicensesProductQty($rec->quantity, $rec->reg_importexport_id,$rec->approvedlicense_product_id, 49);

           $data[] = array('application_code'=>$rec->application_code,
                           'product_id'=>$rec->product_id,
                           'quantity'=>$rec->quantity,
                           'currency_id'=>$rec->currency_id,
                           'permitprod_recommendation_id'=>$rec->permitprod_recommendation_id,
                           'permitprod_recommendation_remarks'=>$rec->permitprod_recommendation_remarks,
                           'packaging_unit_id'=>$rec->packaging_unit_id,
                           'total_weight'=>$rec->total_weight,
                           'pack_size'=>$rec->pack_size,
                           'unitpack_size'=>$rec->unitpack_size,
                           'unitpack_unit_id'=>$rec->unitpack_unit_id,
                            'weights_units_id'=>$rec->weights_units_id,
                            'visa_quantity'=>$rec->quantity,
                            'licensebalance_quantity'=>$licensebalance_quantity,
                            'product_category_id'=>$rec->product_category_id,
                            'common_name_id'=>$rec->common_name_id,
                            'manufacturer_id'=>$rec->manufacturer_id,
                            'country_oforigin_id'=>$country_oforigin_id,
                            'manufacturer_name'=>$manufacturer_name,
                           'brand_name'=>$brand_name,
                           'packaging_units'=>$rec->packaging_unit,
                            'weight_units'=>$rec->weight_name,
                           'currency_name'=>$rec->currency_name,
                           'permitprod_recommendation'=>$rec->recommendation,
                           'unit_price'=>$rec->unit_price,
                            'dosage_form_id'=>$rec->dosage_form_id,
                             'consignment_quantity'=>$rec->consignment_quantity,
                                'prodcertificate_no'=>$rec->prodcertificate_no,
                                'device_type_id'=>$rec->device_type_id,
                                'product_batch_no'=>$rec->product_batch_no,
                                'product_expiry_date'=>formatDate($rec->product_expiry_date),
                                'product_manufacturing_date'=>formatDate($rec->product_manufacturing_date),
                                'approvedvisa_product_id'=>$rec->approvedvisa_product_id,
                                'approvedlicense_product_id'=>$rec->approvedlicense_product_id,
                           'total_value'=>($rec->unit_price*$rec->quantity),
                       );
        }
        return $data;
       }
       public function funcGetLicensesProductQty($visa_quantity, $reg_importexport_id,$approvedlicense_product_id, $sub_module_id){
        $total_qty = 0;
        $license_qty = DB::table('wb_permits_products as t1')
                            ->join('wb_importexport_applications as t2', 't1.application_code', 't2.application_code')
                            
                            ->select(DB::raw('sum(t1.quantity) as total_qty'))
                            ->where(array('t2.reg_importexport_id'=>$reg_importexport_id, 't1.approvedlicense_product_id'=>$approvedlicense_product_id))
                            ->where('t2.sub_module_id', 49)
                            ->first();
            if($license_qty){
                $total_qty = $license_qty->total_qty;

            }

        return ($visa_quantity - $total_qty);
}
}