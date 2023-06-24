<?php

namespace Modules\Bloodproductsapps\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class BloodproductsappsController extends Controller
{
    
    public function getBloodEstabishmentApplicationsLoading(Request $req){
        try{
            $trader_id = $req->trader_id;
            $application_status_id = $req->application_status_id;
            
            $application_status_ids = explode(',',  $application_status_id);
            $sub_module_id = $req->sub_module_id;
            $section_id = $req->section_id;

            $data = array();
            //get the records 
            $records = DB::table('wb_bloodestablishment_applications as t1')
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

                $data = $this->getBloodEstablishmentPermitApplications($records);
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
    function getBloodEstablishmentPermitApplications($records){
        
        $actionColumnData = returnContextMenuActions();
        $data = array();

        $subModuleData = getParameterItems('sub_modules','','mis_db');
        $sectionsData = getParameterItems('par_sections','','mis_db');
        
        foreach ($records as $rec) {
           $section = returnParamFromArray($sectionsData,$rec->section_id);
            
           $data[] = array('reference_no'=>$rec->reference_no,
                           'trader_id'=>$rec->trader_id,
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
                           'section_name'=>$section,
                           'zone_id'=>$rec->zone_id,
                           'added_by'=>$rec->created_by,
                           'tracking_no'=>$rec->tracking_no,
                           'status_name'=>$rec->status_name,
                           'router_link'=>$rec->router_link,
                           'process_title'=>$rec->process_title,
                           'name_of_establishement'=>$rec->name_of_establishement,
                           'establishment_description'=>$rec->establishment_description,
                           'application_code'=>$rec->application_code,
                           'contextMenu'=>returnActionColumn($rec->application_status_id,$actionColumnData)
                       );
        }
        return $data;


   }
}
