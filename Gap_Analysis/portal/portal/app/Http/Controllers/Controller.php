<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
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
            $table_name = $req->table_name;
            $resp = false;
            $where_state = array('id' => $application_id, 'tracking_no'=>$tracking_no);
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
}
