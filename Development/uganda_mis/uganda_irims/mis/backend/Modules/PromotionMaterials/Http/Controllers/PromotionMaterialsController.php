<?php

namespace Modules\PromotionMaterials\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Query\Builder;


class PromotionMaterialsController extends Controller
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
    
    
    
    
    public function getSponsorsList(Request $request)
    {
        $applicant_id = $request->input('applicant_id');
        $applicantType = $request->input('applicantType');
        try {
            $qry = DB::table('tra_promotionaladvert_personnel as t1')
                ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                ->join('par_districts as t4', 't1.district_id', '=', 't4.id')
                ->select('t1.id', 't1.id as sponsor_id','t1.name', 't1.name as sponsor_name', 't1.contact_person', 't1.tin_no',
                    't1.country_id', 't1.region_id', 't1.district_id','t1.physical_address', 't1.postal_address', 't1.telephone_no',
                    't1.fax', 't1.email', 't1.website', 't2.name as country_name', 't3.name as region_name', 't4.name as district_name'
                    
                    
                    );

            if (isset($applicant_id) && $applicant_id != '') {
                $qry->where('t1.id', $applicant_id);
            }
            if (isset($applicantType) && $applicantType != 'local') {
                $qry->where('t1.country_id', 36);
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
    
    
    
    public function saveApplicantDetails(Request $request)
    {
        try{
            
            $posted_array=$request->all();
            $active_application_id=$posted_array['active_application_id'];
            $module_id=$posted_array['module_id'];
            $sub_module_id=$posted_array['sub_module_id'];
            $process_id=$posted_array['process_id'];
            $section_id=$posted_array['section_id'];
            $promotion_material_table='tra_promotion_adverts_applications';
            $workflow_stage_id = $request->input('workflow_stage_id');
            $applicant_id=$request->input('applicant_id');
            $zone_id=$request->input('zone_id');
            
            $user_id = $this->user_id;
            
            $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id');
            //$ref_number = generateProductsRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
            
            $promotion_material_data=array(
                 
                 'applicant_id'=>$applicant_id,
                 'applicant_as_sponsor'=>$request->input('applicant_as_sponsor'),
                 'sponsor_id'=>$request->input('sponsor_id'),
                 'local_agent_id'=>$request->input('local_agent_id'),
                  'events_responsible_person'=>$request->events_responsible_person,
                  'advertisement_type_id'=>$request->advertisement_type_id,
                    'exhibition_start_date'=>formatDate($request->exhibition_start_date),
                 'exhibition_end_date'=>formatDate($request->exhibition_end_date),
                    'venue_of_exhibition'=>$request->venue_of_exhibition,
                 'other_promotion_meetingtype'=>$request->other_promotion_meetingtype,
                    'physicaladdress_of_exhibition'=>$request->physicaladdress_of_exhibition,
                     'promotionameeting_other_information'=>$request->promotionameeting_other_information,
                      'other_promotion_materialtypes'=>$request->other_promotion_materialtypes,
                      'responsible_persons_contacts'=>$request->responsible_persons_contacts,
                       'responsible_persons_physicaladdress'=>$request->responsible_persons_physicaladdress,
                       'target_audience_id'=>$request->target_audience_id,

                       
                 'description_of_advert'=>$request->input('description_of_advert'),
                 'section_id'=>$section_id,
                 'module_id'=>$module_id,
                 'sub_module_id'=>$sub_module_id,
                 'process_id'=>$process_id,
                 'zone_id'=>$zone_id,
                 'workflow_stage_id'=>$workflow_stage_id
                
                            
            );
            
            
        
            if(validateIsNumeric($active_application_id)){
                //update
                $promotion_material_data['dola'] = Carbon::now();
                $promotion_material_data['altered_by'] = $user_id;
                $where_app = array(
                    'id' => $active_application_id
                );
                $previous_data = getPreviousRecords($promotion_material_table, $where_app);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $tracking_no = $previous_data[0]['tracking_no'];
                
                $application_code = $previous_data[0]['application_code'];
                
                $promotion_material = updateRecord($promotion_material_table, $previous_data, $where_app, $promotion_material_data, $user_id);
                
            }else{
                
                //insert
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $codes_array = array(
                        'section_code' => $section_code,
                        'zone_code' => $zone_code
                    );
                
                $application_code = generateApplicationCode($sub_module_id, $promotion_material_table);
                $application_status_id = getApplicationInitialStatus($module_id, $sub_module_id)->status_id;
                
                $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1,$codes_array, $process_id, $zone_id, $user_id);
                
               $promotion_material_data['created_on'] = Carbon::now();
                $promotion_material_data['created_by'] = $user_id;
                $tracking_no = $tracking_details['tracking_no'];
                $view_id = generateApplicationViewID();
                
                $promotion_material_data['application_code'] = $application_code;
                $promotion_material_data['application_status_id'] = 1;
                $promotion_material_data['tracking_no'] = $tracking_no;
                $promotion_material_data['view_id'] = $view_id;
               $promotion_material =insertRecord($promotion_material_table, $promotion_material_data, $user_id);
             
                if ($promotion_material['success'] == false) {
                    return \response()->json($promotion_material);
                }
                
                //track  application
                $active_application_id=$promotion_material['record_id'];
                
                        //add to submissions table
                        $submission_params = array(
                            'application_id' => $active_application_id,
                            'process_id' => $process_id,
                            'application_code' => $application_code,
                            //'reference_no' => $ref_number,
                            'tracking_no'=>$tracking_no,
                            'usr_from' => $user_id,
                            'view_id'=>$view_id,
                            'usr_to' => $user_id,
                            'previous_stage' => $workflow_stage_id,
                            'current_stage' => $workflow_stage_id,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id' => $section_id,
                            'application_status_id' => $application_status_id,
                            'urgency' => 1,
                            'applicant_id' => $applicant_id,
                            'remarks' => 'Initial save of the application',
                            'date_received' => Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id
                        );
                        
                        

            insertRecord('tra_submissions', $submission_params, $user_id);
            
            
            
        }
         if(validateIsNumeric($active_application_id)){

                          //    
                          $meeting_typedata = array();
                        $meeting_types_id = json_decode($request->meeting_types_id);
                          DB::table('tra_promotionmeetingtypes_details')->where(array('application_id'=>$active_application_id))->delete();
                          
                          if(is_array($meeting_types_id)){
                             
                              foreach($meeting_types_id as $meeting_type_id){
                                                          
                                      $meeting_typedata[] = array('meeting_type_id'=>$meeting_type_id, 
                                                      'application_id'=>$active_application_id, 
                                                      'created_by'=>$user_id, 
                                                      'created_on'=>Carbon::now());
      
                              }
                              DB::table('tra_promotionmeetingtypes_details')->insert($meeting_typedata);
      
                          }
                          $promotions_material_id = json_decode($request->promotions_material_id);
                          DB::table('tra_promotion_materials_details')->where(array('application_id'=>$active_application_id))->delete();
                          $material_detailsdata = array();
                            
                          if(is_array($promotions_material_id)){
                              foreach($promotions_material_id as $promotion_material_id){
                                                          
                                      $material_detailsdata[] = array('material_id'=>$promotion_material_id, 
                                                      'application_id'=>$active_application_id, 
                                                      'created_by'=>$user_id, 
                                                      'created_on'=>Carbon::now());
      
                              }
                              DB::table('tra_promotion_materials_details')->insert($material_detailsdata);
      
                          }
                          $advertisement_channels_id = json_decode($request->advertisement_channels_id);
                          DB::table('tra_promotion_advertisement_channels')->where(array('application_id'=>$active_application_id))->delete();
                          $material_detailsdata = array();
                            
                          if(is_array($advertisement_channels_id)){
                              foreach($advertisement_channels_id as $advertisement_channel_id){
                                                          
                                      $material_detailsdata[] = array('advertisement_channel_id'=>$advertisement_channel_id, 
                                                      'application_id'=>$active_application_id, 
                                                      'created_by'=>$user_id, 
                                                      'created_on'=>Carbon::now());
      
                              }
                              DB::table('tra_promotion_advertisement_channels')->insert($material_detailsdata);
      
                          }
                         }
        
          $res['record_id'] = $active_application_id;
          $res['process_id'] = $process_id;
          $res['application_code'] = $application_code;
         
          $res['message'] = 'Application Saved Successfully';
          $res['tracking_no'] = $tracking_no;
          $res['success']=true;
        
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
    
    //online applications
       public function getPromoAdvertsOnlineApplications(Request $request)
    {
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $application_status = $request->input('application_status');
        try {
            $portal_db = DB::connection('portal_db');
            //get process details
            $qry = $portal_db->table('wb_promotion_adverts_applications as t1')
             //   ->join('wb_premises as t2', 't1.premise_id', '=', 't2.id')
                ->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->join('wb_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('wb_rejection_remarks as t5', function ($query) {
                    $query->on('t1.application_code', '=', 't5.application_code')
                        ->whereRaw('t5.id IN (select MAX(a2.id) from wb_rejection_remarks as a2 group by a2.id)');
                })
                ->leftJoin('par_onlineapps_rejectionreasons as t6', 't5.reason_id', '=', 't6.id')
                ->select('t1.*', 't1.id as active_application_id', 't1.application_code', 
                    't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website',
                     't4.name as application_status', 't4.is_manager_query', 't6.name as rejection_reason', 't5.remark as rejection_remark', 't5.created_on as rejection_date')
                ->whereIn('application_status_id', array(2, 13, 15, 17, 23, 24));
            if (isset($application_status) && is_numeric($application_status)) {
                $qry->where('application_status_id', $application_status);
            }
            if (isset($sub_module_id) && $sub_module_id != '') {
                $qry->where('t1.sub_module_id', $sub_module_id);
            }
            if (isset($section_id) && $section_id != '') {
                $qry->where('t1.section_id', $section_id);
            }
            $results = $qry->get();
            $subModulesData = getParameterItems('sub_modules', '', '');
            foreach ($results as $key => $result) {
                $results[$key]->sub_module_name = returnParamFromArray($subModulesData, $result->sub_module_id);
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


    
    public function getOnlinePromotionMaterialsDetails(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_promotion_materials_details as t1')
                            ->select(DB::raw("t1.*"))
                            ->where(array('t1.application_id' => $application_id))
                            ->get();

                    $promotion_materialData = getParameterItems('par_promotion_material_items','');
                    
                    foreach ($records as $rec) {
                       
                            $data[] = array( 
                                'id'=>$rec->id,
                                'application_id'=>$rec->application_id,
                                'remarks'=>$rec->remarks,
                                'material_id'=>$rec->material_id,
                                'promotion_material_name'=>returnParamFromArray($promotion_materialData,$rec->material_id),
                                
                        );
                    }
                     $res =array('success'=>true,'results'=> $data);
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
    function getPromotionalAppOtherDetails($table_name, $application_id, $column_name){
            $record = array();
            $records = DB::table($table_name)->where('application_id',$application_id)->select(DB::raw("$column_name as record_id"))->get();
            if($records){
                    foreach($records as $rec){
                            
                        $record[] = $rec->record_id;
                        
                    }
                
            }
            return $record;
            
        
        
    }
   public function preparePromotionalAppDetailsReceiving(Request $req){
        

    $application_id = $req->input('application_id');
    $application_code = $req->input('application_code');
    $table_name = $req->input('table_name');
    
    try {
        $main_qry = DB::table('tra_promotion_adverts_applications as t1')
              ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
             ->leftJoin('tra_promotionaladvert_personnel as t9', 't1.sponsor_id', '=', 'q.id')
              
            ->where('t1.id', $application_id);

        $qry1 = clone $main_qry;
        $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->select('t1.*','t3.id as applicant_id', 'q.name as application_status', 't1.id as active_application_id', 
                't3.name as applicant_name', 't3.contact_person','t9.name as applicant_sponsor_name',
                't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');

        $results = $qry1->first();
        $local_agent_id = $results->local_agent_id;
        
         $query = DB::table('wb_trader_account as t1')
                ->select('t1.*','t1.id as applicant_id',
                't1.name as applicant_name', 't1.contact_person',
                't1.tin_no', 't1.country_id as app_country_id', 't1.region_id as app_region_id', 't1.district_id as app_district_id', 't1.physical_address as app_physical_address',
                't1.postal_address as app_postal_address', 't1.telephone_no as app_telephone', 't1.fax as app_fax', 't1.email as app_email', 't1.website as app_website');

        $local_represults = $query->first();
        //get the meeting types and materials 
        $meeting_types_id = $this->getPromotionalAppOtherDetails('tra_promotionmeetingtypes_details', $application_id, 'meeting_type_id');
        $promotions_material_id = $this->getPromotionalAppOtherDetails('tra_promotion_materials_details' ,$application_id, 'material_id');
        
        $advertisement_channels_id = $this->getPromotionalAppOtherDetails('tra_promotion_advertisement_channels' ,$application_id, 'advertisement_channel_id');
        
        
        $results->meeting_types_id = $meeting_types_id;
        $results->promotions_material_id = $promotions_material_id;
        $results->advertisement_channels_id = $advertisement_channels_id;
        
        $res = array(
            'success' => true,
            'results' => $results,
            'local_represults' => $local_represults,
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
    public function prepareOnlinePromotionalAppReceiving(Request $req)
    {

        $application_id = $req->input('application_id');
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');
        $mis_db = DB::connection('mysql')->getDatabaseName(); 
        
        try {
            $main_qry = DB::connection('portal_db')->table('wb_promotion_adverts_applications as t1')
                  ->leftJoin('wb_statuses as q', 't1.application_status_id', '=', 'q.id')
                 ->leftJoin($mis_db.'.tra_promotionaladvert_personnel as t9', 't1.sponsor_id', '=', 'q.id')
                  
                ->where('t1.id', $application_id);

            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.trader_id', '=', 't3.id')
                ->select('t1.*', 'q.status_type_id','q.name as application_status', 't1.id as active_application_id', 
                    't3.name as applicant_name', 't3.contact_person','t9.name as applicant_sponsor_name',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');

            $results = $qry1->first();

            $where = array(
                'module_id' => $results->module_id,
                'sub_module_id' => $results->sub_module_id,
                'section_id' => $results->section_id
            );
                $results->process_name = getSingleRecordColValue('wf_tfdaprocesses', $where, 'name');
        
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
    public function getOnlinePromotionMaterialsProductParticular(Request $req){
        try{
            $application_id = $req->application_id;
            $data = array();
            //get the records 
            $records = DB::connection('portal_db')->table('wb_promotion_prod_particulars as t1')
                            ->select(DB::raw("t1.*"))
                            ->where(array('t1.application_id' => $application_id))
                            ->get();

                    $productCategoryData = getParameterItems('par_product_categories','');
                    $subproduct_categoriesData = getParameterItems('par_subproduct_categories','');
                    $type_of_advertisementData = getParameterItems('par_advertisement_types','');
                    $commonNamesData = getParameterItems('par_common_names','');
                     
                    foreach ($records as $rec) {
                        if($rec->is_registered == 1){

                            $product_registered = "Registered";
                        }
                        else{
                            $product_registered = "Not Registered";

                        }
                            $data[] = array( 
                                'id'=>$rec->id,
                                'application_id'=>$rec->application_id,
                                'product_category_id'=>$rec->product_category_id,
                                'product_subcategory_id'=>$rec->product_subcategory_id,
                                'brand_name'=>$rec->brand_name,
                                'product_id'=>$rec->product_id,
                                'common_name_id'=>$rec->common_name_id,
                                'is_registered'=>$rec->is_registered,
                                'product_registered'=>$product_registered,
                                'registration_no'=>$rec->registration_no,
                                'registrant_name'=>$rec->registrant_name,
                                'type_of_advertisement_id'=>$rec->type_of_advertisement_id,
                                'other_details'=>$rec->other_details,
                                'product_category_name'=>returnParamFromArray($productCategoryData,$rec->product_category_id),
                                'product_subcategory_name'=>returnParamFromArray($subproduct_categoriesData,$rec->product_subcategory_id),
                                'type_of_advertisement_name'=>returnParamFromArray($type_of_advertisementData,$rec->type_of_advertisement_id),
                                'common_name'=>returnParamFromArray($commonNamesData,$rec->common_name_id)
                        );
                    }
                     $res =array('success'=>true,'results'=> $data);
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
    public function getPromotionMaterialsProductParticular(Request $request)
    {
        $application_id=$request->input('active_application_id');
    
        if(validateIsNumeric($request->input('application_id'))){
            $application_id = $request->input('application_id');
        }
        try{
            
            $results=DB::table('tra_promotion_prod_particulars as t1')
            ->leftJoin('par_common_names as t2', 't1.common_name_id', 't2.id')
             ->select(DB::raw('t1.*,t2.name as common_name'))
            ->where('application_id',$application_id);
            
            
            $res = array(
                'success' => true,
                'results' => $results->get(),
                'message' => 'All is well'
            );
            
        }catch(\Exception $exception){
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            
        }catch(\Exception $throwable){
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        
        
        return \response()->json($res);
        
    }
        
    
    public function getPromotionMaterialsDetails(Request $request)
    {
        $application_id=$request->input('active_application_id');
        if(validateIsNumeric($request->input('application_id'))){
            $application_id = $request->input('application_id');
        }
        //print_r($request->all());
        
        try{
            
            $results=DB::table('tra_promotion_materials_details as t1')
             
             ->join('par_promotion_material_items  as t2','t1.material_id','=','t2.id')
             ->select(DB::raw('t1.*,t2.name as promotion_material_name')) 
            ->where('t1.application_id',$application_id);
            
            
            $res = array(
                'success' => true,
                'results' => $results->get(),
                'message' => 'All is well'
            );
            
        }catch(\Exception $exception){
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            
        }catch(\Exception $throwable){
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        
        
        return \response()->json($res);
        
    }
    public function getProductIngredientStrengthDetails(Request $request)
    {
        $product_id=$request->input('active_application_id');
        
        
        //print_r($request->all());
        
        try{
            
            $results=DB::table('tra_promoadvert_products_ingred_strth')
             ->select(DB::raw('*')) 
            ->where('product_id',$product_id);
            
            
            $res = array(
                'success' => true,
                'results' => $results->get(),
                'message' => 'All is well'
            );
            
        }catch(\Exception $exception){
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            
        }catch(\Exception $throwable){
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        
        
        return \response()->json($res);
        
    }
    function insertUpdateSponsorDetails(Request $request)
    {
        $id=$request->input('id');
        
        $data=$request->all();
        $user_id = $this->user_id;
        $table=$data['table_name'];
        unset($data['_token']);
        unset($data['table_name']);
        unset($data['application_id']);
        try{
            
            if(validateIsNumeric($id)){
                $where_app=array('id'=>$id);
                    
                $previous_data = getPreviousRecords($table, $where_app);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                unset($data['id']);
                
               $data['altered_by']=$user_id;  
              
                $res = updateRecord($table, $previous_data, $where_app, $data, $user_id);
            
            }else{
                
                $data['created_on']=Carbon::now();
                $data['created_by']=$user_id;  
                $res =insertRecord($table,$data , $user_id);
                if ($res['success'] == false) {
                    return \response()->json($res);
                }
                
                
            }
            
            
            $res = array(
                'success' => true,
                'message' => "All is well"
            );
            
            
        }catch(\Exception $exception){
            
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            
        }catch(\Exception $throwable){
            
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        }
        
        return \response()->json($res);
        
        
    }
    function insertUpdateProductParticulars(Request $request)
    {
        $id=$request->input('id');
        
        $data=$request->all();
        $user_id = $this->user_id;
        $table=$data['table_name'];
        unset($data['_token']);
        unset($data['table_name']);
        try{
            
            if(validateIsNumeric($id)){
                $where_app=array('id'=>$id);
                    
                $previous_data = getPreviousRecords($table, $where_app);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                unset($data['id']);
                $res = updateRecord($table, $previous_data, $where_app, $data, $user_id);
            
            }else{
                
                $res =insertRecord($table,$data , $user_id);
                if ($res['success'] == false) {
                    return \response()->json($res);
                }
                
                
            }
            
            
            $res = array(
                'success' => true,
                'message' => "All is well",
                'product_id'=>$res['record_id']
            );
            
            
        }catch(\Exception $exception){
            
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            
        }catch(\Exception $throwable){
            
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        }
        
        return \response()->json($res);
        
        
    }
    
    public function genericDeleteRecord(Request $req)
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
            if($table_name=='tra_promotion_prod_particulars'){
                $res=DB::table('tra_promoadvert_products_ingred_strth')->where('product_id',$record_id)->delete();
                //$previous_data = getPreviousRecords($table_name, $where);
                //$this->cascadeDel($record_id, $user_id);
                //$previous_data = getPreviousRecords('tra_promoadvert_products_ingred_strth', array('product_id'=>$record_id));
                //$res = deleteRecord('tra_promoadvert_products_ingred_strth', $previous_data, array('product_id'=>$record_id), $user_id);
            }
            
            $previous_data = $previous_data['results'];
            $res = deleteRecord($table_name, $previous_data, $where, $user_id);
            //
        
            
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
    
    function cascadeDel($product_id, $user_id)
    {
        $table_name='tra_promoadvert_products_ingred_strth';
        $results=DB::Table($table_name)->where('product_id',$product_id)->get();
        
        //print_r($results->toArray());
        foreach($results as $row){
            
             $previous_data = getPreviousRecords($table_name, array('id'=>$row->id));
             $res = deleteRecord($table_name, $previous_data, array('id'=>$row->id), $user_id);
/*           print_r($res);
             print_r($previous_data); */
            // print_r($row->id);
        }
        
    }
    
    function insertUpdateProductIngredinetsStrength(Request $request)
    {
        $id=$request->input('id');
        
        $data=$request->all();
        $user_id = $this->user_id;
        $table=$data['table_name'];
        $product_id=$data['application_id'];
        $data['product_id']=$data['application_id'];
        unset($data['_token']);
        unset($data['table_name']);
        unset($data['application_id']);
        try{
            
            if(validateIsNumeric($id)){
                $where_app=array('id'=>$id);
                    
                $previous_data = getPreviousRecords($table, $where_app);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                unset($data['id']);
                $res = updateRecord($table, $previous_data, $where_app, $data, $user_id);
            
            }else{
                
                $res =insertRecord($table,$data , $user_id);
                if ($res['success'] == false) {
                    return \response()->json($res);
                }
                
                
            }
            
            
            $res = array(
                'success' => true,
                'message' => "All is well"
            );
            
            
        }catch(\Exception $exception){
            
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            
        }catch(\Exception $throwable){
            
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        }
        
        return \response()->json($res);
        
        
    }
    
    
      public function preparePromotionAndAdvertPaymentStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
               // ->join('tra_product_information as t4', 't1.product_id', '=', 't4.id')
                ->select(DB::raw("t1.id as application_id,t1.applicant_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                t1.section_id,t1.module_id"))
                ->where('t1.id', $application_id);
    
            $results = $qry->first();
            $payment_details = getApplicationPaymentsRunningBalance($application_id, $application_code, $results->invoice_id);
            $res = array(
                'success' => true,
                'results' => $results,
                'balance' => formatMoney($payment_details['running_balance']),
                'invoice_amount' => formatMoney($payment_details['invoice_amount']),
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
    
    function getPromotionMaterialsApplications(Request $request)
    {
        
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $sub_module_id = $request->input('sub_module_id');
        $workflow_stage_id = $request->input('workflow_stage_id');
        $user_id = $this->user_id;
        $assigned_groups = getUserGroups($user_id);
        $is_super = belongsToSuperGroup($assigned_groups);

        try{
             $assigned_stages = getAssignedProcessStages($user_id, $module_id);
            
            $qry=DB::table('tra_promotion_adverts_applications as t1')
                ->join('tra_submissions as t7', 't1.view_id', '=', 't7.view_id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->join('wf_tfdaprocesses as t4', 't7.process_id', '=', 't4.id')
                ->join('wf_workflow_stages as t5', 't7.current_stage', '=', 't5.id')
                ->join('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
                ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->join('users as t9', 't7.usr_to', '=', 't9.id')
                ->leftJoin('tra_promotionaladvert_personnel as t12', 't1.sponsor_id', '=', 't12.id')
                ->select(DB::raw("t7.date_received,t7.current_stage as workflow_stage_id,t12.name as applicant_sponsor_name,
                    CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user, 
                    t1.id as active_application_id, t1.application_code, t4.module_id, t4.sub_module_id, t4.section_id, 
                    t6.name as application_status, t3.name as applicant_name, t4.name as process_name, t5.name as workflow_stage, t5.is_general, t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,
                    
                    if(t1.applicant_as_sponsor=1,t3.name,(select name from wb_trader_account where id=t1.sponsor_id)) as sponsor_name,t1.*"));
    
            
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
    
    public function getManagerApplicationsGeneric12(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        try {
            $qry = DB::table('tra_promotion_adverts_applications as t1')
                ->leftJoin('par_advertisement_types as t10', 't1.advertisement_type_id', '=', 't10.id')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                 ->join('users as t8', 't7.usr_from', '=', 't8.id')
                ->join('users as t9', 't7.usr_to', '=', 't9.id')
                ->leftJoin('tra_promotionaladvert_personnel as t12', 't1.sponsor_id', '=', 't12.id')
                 ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status',
                't10.name as advertisement_type',
                 't3.country_id as app_country_id','t3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone','t3.fax as app_fax','t3.email as app_email','t3.website as app_website',
                't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id', DB::raw("CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user,t12.name as applicant_sponsor_name"))
                ->where(array('t7.current_stage'=>$workflow_stage, 't7.isDone'=>0));
            if(validateIsNumeric($section_id)){
                
                $qry->where('t7.section_id',$section_id);
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



  public function prepareForPromotionAndAdvertsEvaluation(Request $request)
  {
       
       $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                //->join('tra_promotion_prod_particulars as t3', 't1.id', '=', 't3.application_id')
                ->select(DB::raw("t1.applicant_id,t1.id as application_id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details,
                t1.section_id,t1.module_id"))
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
   public function getManagerApplicationsGeneric(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        $section_id = $request->input('section_id');
        try {
            $qry = DB::table('tra_promotion_adverts_applications as t1')
                ->leftJoin('par_advertisement_types as t10', 't1.advertisement_type_id', '=', 't10.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('tra_submissions as t7', 't1.application_code', '=', 't7.application_code')
                 ->leftJoin('users as t8', 't7.usr_from', '=', 't8.id')
                ->leftJoin('users as t9', 't7.usr_to', '=', 't9.id')
                ->leftJoin('tra_promotionaladvert_personnel as t12', 't1.sponsor_id', '=', 't12.id')
                 ->select('t1.*', 't3.name as applicant_name', 't4.name as application_status',
                't10.name as advertisement_type',
                 't3.country_id as app_country_id','t3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone','t3.fax as app_fax','t3.email as app_email','t3.website as app_website',
                't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id', DB::raw("CONCAT_WS(' ',decrypt(t8.first_name),decrypt(t8.last_name)) as from_user,CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as to_user,t12.name as applicant_sponsor_name"))
                ->where(array('t7.current_stage'=>$workflow_stage, 't7.isDone'=>0));
            if(validateIsNumeric($section_id)){
                
                //$qry->where('t1.section_id',$section_id);
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


    public function getPromotionAndAdvertsApplicationsAtApproval(Request $request)
    {
        $table_name = $request->input('table_name');
        $workflow_stage = $request->input('workflow_stage_id');
        try {
            $qry = DB::table($table_name . ' as t1')
              //  ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
                ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('wb_trader_account as t9', 't9.id', '=', 't1.sponsor_id')
                
                ->leftJoin('tra_submissions as t10', 't1.application_code', '=', 't10.application_code')
                ->join('wf_tfdaprocesses as t7', 't10.process_id', '=', 't7.id')
                ->join('wf_workflow_stages as t8', 't10.current_stage', '=', 't8.id')
                 ->leftJoin('users as t11', 't10.usr_from', '=', 't11.id')
                ->leftJoin('users as t12', 't10.usr_to', '=', 't12.id')
                ->leftJoin('tra_promotionaladvert_personnel as t13', 't1.sponsor_id', '=', 't12.id')
                ->select('t1.*', 't1.id as active_application_id','t3.name as applicant_name','t3.contact_person',
                
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id','t3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address','t3.telephone_no as app_telephone','t3.fax as app_fax','t3.email as app_email','t3.website as app_website','t9.name as applicant_sponsor_name', 
                     't4.name as application_status', 't6.name as approval_status',
                     't7.name as process_name', 't8.name as workflow_stage', 't8.is_general', 't5.decision_id', 't5.id as recommendation_id', 't6.name as recommendation',  DB::raw("CONCAT_WS(' ',decrypt(t11.first_name),decrypt(t11.last_name)) as from_user,CONCAT_WS(' ',decrypt(t12.first_name),decrypt(t12.last_name)) as to_user,t13.name as applicant_sponsor_name"))
                ->where(array('t10.current_stage'=> $workflow_stage,'isDone'=>0));
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
    
    
     function insertUpdatePromoAdvertComments(Request $request)
    {
        $id=$request->input('id');
        
        $data=$request->all();
        
        
        $user_id = $this->user_id;
        $data['created_by']=$this->user_id;
        $table=$data['table_name'];
        unset($data['_token']);
        unset($data['table_name']);
        try{
            
            if(validateIsNumeric($id)){
                $where_app=array('id'=>$id);
                    
                $previous_data = getPreviousRecords($table, $where_app);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                unset($data['id']);
                $res = updateRecord($table, $previous_data, $where_app, $data, $user_id);
            
            }else{
                
                $res =insertRecord($table,$data , $user_id);
                if ($res['success'] == false) {
                    return \response()->json($res);
                }
                
                
            }
            
            
            $res = array(
                'success' => true,
                'message' => "All is well"
            );
            
            
        }catch(\Exception $exception){
            
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
            
        }catch(\Exception $throwable){
            
            $res = array(
                'success' => false,
                'message' => $exception->getMessage()
            );
        }
        
        return \response()->json($res);
        
        
    }
        public function preparePromotionAdvertInvoicingStage(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $table_name = $request->input('table_name');
        try {
            $qry = DB::table($table_name . ' as t1')
                ->join('wb_trader_account as t2', 't1.applicant_id', '=', 't2.id')
                ->leftJoin('tra_application_invoices as t3', function ($join) use ($application_code) {
                    $join->on('t1.id', '=', 't3.application_id')
                        ->on('t3.application_code', '=', DB::raw($application_code));
                })
               // ->join('tra_premises as t4', 't1.premise_id', '=', 't4.id')
                ->select(DB::raw("t1.applicant_id,t1.id,CONCAT_WS(',',t2.name,t2.postal_address) as applicant_details, t3.id as invoice_id, t3.invoice_no,
                    t3.isLocked,t3.paying_currency_id,t1.section_id,t1.module_id,t1.is_fast_track"))//CONCAT_WS(',',t4.name,t4.postal_address) as premise_details,
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
    
    
    public function savePromotionalApplicationRenewalsDetails(Request $request)
    {
        try{
            
            $posted_array=$request->all();
            $active_application_id=$posted_array['active_application_id'];
            $module_id=$posted_array['module_id'];
            $sub_module_id=$posted_array['sub_module_id'];
            $process_id=$posted_array['process_id'];
            $section_id=$posted_array['section_id'];
            $promotion_material_table='tra_promotion_adverts_applications';
            $workflow_stage_id = $request->input('workflow_stage_id');
            $applicant_id=$request->input('applicant_id');
            $zone_id=$request->input('zone_id');
            $registered_promotionalapp_id=$request->input('registered_promotionalapp_id');
            
            $reg_application_id=$request->input('reg_application_id');
            
            $user_id = $this->user_id;
            
            $ref_id = getSingleRecordColValue('tra_submodule_referenceformats', array('sub_module_id' => $sub_module_id, 'module_id' => $module_id, 'reference_type_id' => 1), 'reference_format_id');
            //$ref_number = generateProductsRefNumber($ref_id, $codes_array, date('Y'), $process_id, $zone_id, $user_id);
            
            $promotion_material_data=array(
                 
                 'registered_promotionalapp_id'=>$registered_promotionalapp_id,
                 'applicant_id'=>$applicant_id,
                 'applicant_as_sponsor'=>$request->input('applicant_as_sponsor'),
                 'sponsor_id'=>$request->input('sponsor_id'),
                 'local_agent_id'=>$request->input('local_agent_id'),
                 'advertisement_type_id'=>$request->input('advertisement_type_id'),
                 'exhibition_start_date'=>$request->input('exhibition_start_date'),
                 'exhibition_end_date'=>$request->input('exhibition_end_date'),
                 'venue_of_exhibition'=>$request->input('venue_of_exhibition'),
                 'description_of_advert'=>$request->input('description_of_advert'),
                 'section_id'=>$section_id,
                 'module_id'=>$module_id,
                 'sub_module_id'=>$sub_module_id,
                 'process_id'=>$process_id,
                 'zone_id'=>$zone_id,
                 'workflow_stage_id'=>$workflow_stage_id
                
                            
            );
        
            if(validateIsNumeric($active_application_id)){
                //update
                $promotion_material_data['dola'] = Carbon::now();
                $promotion_material_data['altered_by'] = $user_id;
                $where_app = array(
                    'id' => $active_application_id
                );
                $previous_data = getPreviousRecords($promotion_material_table, $where_app);
                if ($previous_data['success'] == false) {
                    return $previous_data;
                }
                $previous_data = $previous_data['results'];
                $tracking_no = $previous_data[0]['tracking_no'];
                
                $application_code = $previous_data[0]['application_code'];
                
                $promotion_material = updateRecord($promotion_material_table, $previous_data, $where_app, $promotion_material_data, $user_id);
                
            }else{
                $anyOngoingApps = checkForOngoingApplications($registered_promotionalapp_id, $promotion_material_table, 'registered_promotionalapp_id', $process_id);
                if ($anyOngoingApps['exists'] == true) {
                    $res = array(
                        'success' => false,
                        'message' => 'There is an ongoing application pending approval with reference number ' . $anyOngoingApps['ref_no']
                    );
                    return \response()->json($res);
                }

                //insert
                $zone_code = getSingleRecordColValue('par_zones', array('id' => $zone_id), 'zone_code');
                $section_code = getSingleRecordColValue('par_sections', array('id' => $section_id), 'code');
                $codes_array = array(
                        'section_code' => $section_code,
                        'zone_code' => $zone_code
                    );
                
                $application_code = generateApplicationCode($sub_module_id, $promotion_material_table);
                $application_status_id = getApplicationInitialStatus($module_id, $sub_module_id)->status_id;
                
                $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1,$codes_array, $process_id, $zone_id, $user_id);
                if ($tracking_details['success'] == false) {
                    return \response()->json($tracking_details);
                }
               $promotion_material_data['created_on'] = Carbon::now();
                $promotion_material_data['created_by'] = $user_id;
                $tracking_no = $tracking_details['tracking_no'];
                $view_id = generateApplicationViewID();
                
                $promotion_material_data['application_code'] = $application_code;
                $promotion_material_data['application_status_id'] = 1;
                $promotion_material_data['tracking_no'] = $tracking_no;
                $promotion_material_data['view_id'] = $view_id;
               $promotion_material =insertRecord($promotion_material_table, $promotion_material_data, $user_id);
             
                if ($promotion_material['success'] == false) {
                    return \response()->json($promotion_material);
                }
                
                //track  application
                $active_application_id=$promotion_material['record_id'];
                $this->savePromotionalAppOtherDetails($reg_application_id,$active_application_id,$user_id);

                        //add to submissions table
                        $submission_params = array(
                            'application_id' => $active_application_id,
                            'process_id' => $process_id,
                            'application_code' => $application_code,
                            //'reference_no' => $ref_number,
                            'tracking_no'=>$tracking_no,
                            'usr_from' => $user_id,
                            'view_id'=>$view_id,
                            'usr_to' => $user_id,
                            'previous_stage' => $workflow_stage_id,
                            'current_stage' => $workflow_stage_id,
                            'module_id' => $module_id,
                            'sub_module_id' => $sub_module_id,
                            'section_id' => $section_id,
                            'application_status_id' => $application_status_id,
                            'urgency' => 1,
                            'applicant_id' => $applicant_id,
                            'remarks' => 'Initial save of the application',
                            'date_received' => Carbon::now(),
                            'created_on' => Carbon::now(),
                            'created_by' => $user_id
                        );
                        
            insertRecord('tra_submissions', $submission_params, $user_id);
            
            
            
        }
        
        
          $res['record_id'] = $active_application_id;
          $res['process_id'] = $process_id;
          $res['application_code'] = $application_code;
         
          $res['message'] = 'Application Saved Successfully';
          $res['tracking_no'] = $tracking_no;
          $res['success']=true;
        
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
    public function onRegisteredPromotionalSearchdetails(Request $req)
    {
        $application_code = $req->input('application_code');
        $table_name = $req->input('table_name');

        try {
            $main_qry = DB::table('tra_promotion_adverts_applications as t1')
                ->where('t1.application_code', $application_code);
                
            $qry1 = clone $main_qry;
            $qry1->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->select('t1.*',
                    't3.name as applicant_name', 't3.contact_person','t1.id as reg_application_id',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');

            $results = $qry1->first();
            $results->product_id = '';
            $qry2 = clone $main_qry;
            $qry2->join('wb_trader_account as t3', 't1.local_agent_id', '=', 't3.id')
                ->select('t3.id as applicant_id', 't3.name as applicant_name', 't3.contact_person',
                    't3.tin_no', 't3.country_id as app_country_id', 't3.region_id as app_region_id', 't3.district_id as app_district_id', 't3.physical_address as app_physical_address',
                    't3.postal_address as app_postal_address', 't3.telephone_no as app_telephone', 't3.fax as app_fax', 't3.email as app_email', 't3.website as app_website');
            $ltrDetails = $qry2->first();

            $res = array(
                'success' => true,
                'results' => $results,
                'ltrDetails' => $ltrDetails,
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
    function getRegisteredPromotionMaterialsApps(Request $request)
    {
        
        $module_id = $request->input('module_id');
        $section_id = $request->input('section_id');
        $user_id = $this->user_id;
      
        try{
            
            $qry=DB::table('tra_promotion_adverts_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t6', 't1.application_status_id', '=', 't6.id')
               ->leftJoin('par_sections as t11', 't1.section_id', '=', 't11.id')
                ->leftJoin('tra_promotionaladvert_personnel as t12', 't1.sponsor_id', '=', 't12.id')
                ->join('tra_approval_recommendations as t13', 't1.application_code', '=', 't13.application_code')
                
                ->leftJoin('par_advertisement_types as t10', 't1.advertisement_type_id', '=', 't10.id')
                ->select(DB::raw("t12.name as applicant_sponsor_name,t13.certificate_no, t13.expiry_date,
            
                    t1.id as active_application_id, t1.application_code, t1.module_id, t1.sub_module_id, t1.section_id, 
                    t6.name as application_status, t3.name as applicant_name,  t3.contact_person,
                    t3.tin_no, t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id, t3.physical_address as app_physical_address,
                    t3.postal_address as app_postal_address, t3.telephone_no as app_telephone, t3.fax as app_fax, t3.email as app_email, t3.website as app_website,t10.name as advertisement_type,              
                    if(t1.applicant_as_sponsor=1,t3.name,(select name from wb_trader_account where id=t1.sponsor_id)) as sponsor_name, 
                    
                 t1.*"));
            
            if (validateIsNumeric($section_id)) {
                $qry->where('t1.section_id', $section_id);
            }
           $qry->where('t13.decision_id',1);
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
}
