<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 8/2/2017
 * Time: 7:23 PM
 */

namespace App\Helpers;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Carbon\Carbon;

class DbHelper
{
    public static function insertRecordNoTransaction($table_name, $table_data, $user_id,$con)
    {
        $record_id = DB::connection($con)->table($table_name)->insertGetId($table_data);
        
        $data = serialize($table_data);
        $audit_detail = array(
            'table_name' => $table_name,
            'table_action' => 'insert',
            'record_id' => $record_id,
            'current_tabledata' => $data,
            'ip_address' => self::getIPAddress(),
            'created_by' => $user_id,
            'created_at' => Carbon::now()
        );
        DB::connection('audit_db')->table('tra_portalaudit_trail')->insert($audit_detail);
      
        return $record_id;
    } 
    public static function getTableData($table_name, $where,$con)
    {
        $qry = DB::connection($con)->table($table_name)
            ->where($where);
        $results = $qry->first();
        return $results;
    }
    public static function updateApplicationCode($table_name,$application_code_no, $record_id){
        $where_data = array('id'=>$record_id);
        $data = array('application_code'=>$application_code_no, 'dola'=>Carbon::now());
        DB::table($table_name)->where($where_data)->update($data);

    }
    public static function getParameterItem($table_name,$record_id,$con){
       $record_name = '';
        $rec = DB::connection($con)->table($table_name)->where(array('id'=>$record_id))->value('name');
        if($rec){
            $record_name = $rec;
        }  
        return $record_name;   

    }
    static function sys_error_handler($error, $level, $me, $class_array, $user_id)
    {
        //defaults
            $function = "failed to fetch";
            //class
            if(isset($class_array[5])){
              $class = $class_array[5];
            }else{
              $class = "Failed to fetch";
            }
            //specifics
            if(isset($me[0]['function'])){
              $function = $me[0]['function'];
            }
            if(isset($me[0]['class'])){
              $class = $me[0]['class'];
            }
            $origin = "function-->".$function." class-->".$class;
        //log error
        DB::connection('mis_db')->table('wb_system_error_logs')->insert(['error'=>$error, 'error_level_id'=>$level, 'originated_from_user_id'=>$user_id, 'error_origin'=>$origin]);

        $res = array(
                'success' => false,
                'error'=>$error,
                'message' => "An Error occured please contact system admin"
            );
        return $res;
    }
    public static function getParameterItems($table_name,$filter,$con){
        $record_name = '';
         $rec = DB::connection($con)
                    ->table($table_name);

        if($filter != ''){
            $rec = $rec->where($filter);
        }
        $rec = $rec->get();
       
         return convertStdClassObjToArray($rec);
    }
    public static function updateRecordNoTransaction($table_name, $previous_data, $where_data, $current_data, $user_id,$con)
    {
        $affectedRows = DB::connection($con)->table($table_name)
            ->where($where_data)
            ->update($current_data);
            
        if ($affectedRows > 0) {
            $record_id = $previous_data['results'][0]['id'];
            $data_previous = serialize($previous_data);
            $data_current = serialize($current_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'update',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'current_tabledata' => $data_current,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => Carbon::now()
            );//511600
            DB::connection('audit_db')->table('tra_portalaudit_trail')->insert($audit_detail);
            return true;
        } else {
            return false;
        }
    }

    public static function deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id,$con)
    {
        $affectedRows = DB::connection($con)->table($table_name)->where($where_data)->delete();
        if ($affectedRows) {
            $record_id = $previous_data['results'][0]['id'];
            $data_previous = serialize($previous_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'delete',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => date('Y-m-d H:i:s')
            );
            DB::connection('audit_db')->table('tra_portalaudit_trail')->insert($audit_detail);
            return true;
        } else {
            return false;
        }
    }

    public static function softDeleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id)
    {
        $deletion_update = array(
            'is_enabled' => 0
        );
        $affectedRows = DB::table($table_name)->where($where_data)->update($deletion_update);
        if ($affectedRows > 0) {
            $current_data=$previous_data;
            $current_data[0]['is_enabled']=0;
            $record_id = $previous_data[0]['id'];
            $data_previous = serialize($previous_data);
            $data_current = serialize($current_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'softdelete',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'current_tabledata' => $data_current,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => Carbon::now()
            );
            DB::connection('audit_db')->table('tra_portalaudit_trail')->insert($audit_detail);
            return true;
        } else {
            return false;
        }
    }

    public static function undoSoftDeletesNoTransaction($table_name, $previous_data, $where_data, $user_id)
    {
        $deletion_update = array(
            'is_enabled' => 1
        );
        $affectedRows = DB::table($table_name)->where($where_data)->update($deletion_update);
        if ($affectedRows > 0) {
            $current_data=$previous_data;
            $current_data[0]['is_enabled']=1;
            $record_id = $previous_data[0]['id'];
            $data_previous = serialize($previous_data);
            $data_current = serialize($current_data);
            $audit_detail = array(
                'table_name' => $table_name,
                'table_action' => 'undosoftdelete',
                'record_id' => $record_id,
                'prev_tabledata' => $data_previous,
                'current_tabledata' => $data_current,
                'ip_address' => self::getIPAddress(),
                'created_by' => $user_id,
                'created_at' => Carbon::now()
            );
            DB::connection('audit_db')->table('tra_portalaudit_trail')->insert($audit_detail);
            return true;
        } else {
            return false;
        }
    }

    static function insertRecord($table_name, $table_data, $user_id,$con)
    {
        $res = array();
        try {
            DB::transaction(function () use ($table_name, $table_data, $user_id, &$res,$con) {
                $res = array(
                    'success' => true,
                    'record_id' => self::insertRecordNoTransaction($table_name, $table_data, $user_id,$con),
                    'message' => 'Data Saved Successfully!!'
                );
            }, 5);
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

    static function insertRecordNoAudit($table_name, $table_data,$con)
    {
        $res = array();
        try {
            DB::transaction(function () use ($table_name, $table_data, &$res,$con) {

                //the data 
                DB::connection($con)->table($table_name)->insert($table_data);
                $res = array(
                    'success' => true,
                    'message' => 'Data Saved Successfully!!'
                );
            }, 5);
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

    static function updateRecord($table_name, $previous_data, $where_data, $current_data, $user_id,$con)
    {
        $res = array();
        try {
                DB::transaction(function () use ($table_name, $previous_data, $where_data, $current_data, $user_id, &$res,$con) {
                    if(self::updateRecordNoTransaction($table_name, $previous_data, $where_data, $current_data, $user_id,$con)) {
                        
                    } else {
                        
                    }
                    $res = array(
                        'success' => true,
                        'message' => 'Data updated Successfully!!'
                    );
                }, 5);
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

    static function deleteRecord($table_name, $previous_data, $where_data, $user_id)
    {
        $res = array();
        try {
            DB::transaction(function () use ($table_name, $previous_data, $where_data, $user_id, &$res) {
                if(self::deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id)) {
                    $res = array(
                        'success' => true,
                        'message' => 'Delete request executed successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Zero number of rows affected. No record affected by the delete request!!'
                    );
                }
            }, 5);
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

    static function softDeleteRecord($table_name, $previous_data, $where_data, $user_id)
    {
        $res = array();
        try {
            DB::transaction(function () use ($table_name, $previous_data, $where_data, $user_id, &$res) {
                if(self::softDeleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id)) {
                    $res = array(
                        'success' => true,
                        'message' => 'Delete request executed successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Zero number of rows affected. No record affected by the delete request!!'
                    );
                }
            }, 5);
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

    static function undoSoftDeletes($table_name, $previous_data, $where_data, $user_id)
    {
        $res = array();

        try {
            DB::transaction(function () use ($table_name, $previous_data, $where_data, $user_id, &$res) {
                if(self::undoSoftDeletesNoTransaction($table_name, $previous_data, $where_data, $user_id)) {
                    $res = array(
                        'success' => true,
                        'message' => 'Delete request executed successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Zero number of rows affected. No record affected by the delete request!!'
                    );
                }
            }, 5);
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

    static function deleteRecordNoAudit($table_name, $where_data)
    {
        $res = array();
        try {
            DB::transaction(function () use ($table_name, $where_data, &$res) {
                $affectedRows = DB::table($table_name)->where($where_data)->delete();
                if ($affectedRows) {
                    $res = array(
                        'success' => true,
                        'message' => 'Delete request executed successfully!!'
                    );
                } else {
                    $res = array(
                        'success' => false,
                        'message' => 'Zero number of rows affected. No record affected by the delete request!!'
                    );
                }
            }, 5);
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

    static function recordExists($table_name, $where,$con)
    {
        $recordExist = DB::connection($con)->table($table_name)->where($where)->get();
        if ($recordExist && count($recordExist) > 0) {
            return true;
        }
        return false;
    }

    static function getPreviousRecords($table_name, $where,$con)
    {
        try {
            $prev_records = DB::connection($con)->table($table_name)->where($where)->get();
            if ($prev_records && count($prev_records) > 0) {
                $prev_records = self::convertStdClassObjToArray($prev_records);
            }
            $res = array(
                'success' => true,
                'results' => $prev_records,
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
        return $res;
    }

    static function auditTrail($table_name, $table_action, $prev_tabledata, $table_data, $user_id)
    {
        $ip_address = self::getIPAddress();
        switch ($table_action) {
            case "insert":
                //get serialised data $row_array = $sql_query->result_array();
                $data = $table_data;
                $audit_detail = array(
                    'table_name' => $table_name,
                    'table_action' => $table_action,
                    'current_tabledata' => $data,
                    'ip_address' => $ip_address,
                    'created_by' => $user_id,
                    'created_at' => date('Y-m-d H:i:s')
                );
                DB::connection('audit_db')->table('tra_portalaudit_trail')->insert($audit_detail);
                $res = true;
                break;
            case "update":
                //get serialised data $row_array = $sql_query->result_array();
                $data_previous = serialize($prev_tabledata);
                $data_current = serialize($table_data);
                $audit_detail = array(
                    'table_name' => $table_name,
                    'table_action' => 'update',
                    'prev_tabledata' => $data_previous,
                    'current_tabledata' => $data_current,
                    'ip_address' => $ip_address,
                    'created_by' => $user_id,
                    'created_at' => date('Y-m-d H:i:s')
                );
                DB::connection('audit_db')->table('tra_portalaudit_trail')->insert($audit_detail);
                $res = true;
                break;
            case "delete":
                //get serialised data $row_array = $sql_query->result_array();
                $data_previous = serialize($prev_tabledata);
                $audit_detail = array(
                    'table_name' => $table_name,
                    'table_action' => 'delete',
                    'prev_tabledata' => $data_previous,
                    'ip_address' => $ip_address,
                    'created_by' => $user_id,
                    'created_at' => date('Y-m-d H:i:s')
                );
                DB::connection('audit_db')->table('tra_portalaudit_trail')->insert($audit_detail);
                $res = true;
                break;
            default:
                $res = false;
        }
        return $res;
    }

    static function getRecordValFromWhere($table_name, $where, $col)
    {
        try {
            $record = DB::table($table_name)
                ->select($col)
                ->where($where)->get();
            return self::convertStdClassObjToArray($record);
        } catch (QueryException $exception) {
            echo $exception->getMessage();
            return false;
        }
    }

    //without auditing
    static function insertReturnID($table_name, $table_data)
    {
        $insert_id = '';
        DB::transaction(function () use ($table_name, $table_data, &$insert_id) {
            try {
                $insert_id = DB::table($table_name)->insertGetId($table_data);
            } catch (QueryException $exception) {
                echo $exception->getMessage();
                $insert_id = '';
            }
        }, 5);
        return $insert_id;
    }

    static function convertStdClassObjToArray($stdObj)
    {
        return json_decode(json_encode($stdObj), true);
    }

    static function convertAssArrayToSimpleArray($assArray, $targetField)
    {
        $simpleArray = array();
        foreach ($assArray as $key => $array) {
            $simpleArray[] = $array[$targetField];
        }
        return $simpleArray;
    }

    static function getIPAddress()
    {

        if (isset($_SERVER)) {
            if (isset($_SERVER["HTTP_X_FORWARDED_FOR"])) {
                $ip = $_SERVER["HTTP_X_FORWARDED_FOR"];
                if (strpos($ip, ",")) {
                    $exp_ip = explode(",", $ip);
                    $ip = $exp_ip[0];
                }
            } else if (isset($_SERVER["HTTP_CLIENT_IP"])) {
                $ip = $_SERVER["HTTP_CLIENT_IP"];
            } else {
                $ip = $_SERVER["REMOTE_ADDR"];
            }
        } else {
            if (getenv('HTTP_X_FORWARDED_FOR')) {
                $ip = getenv('HTTP_X_FORWARDED_FOR');
                if (strpos($ip, ",")) {
                    $exp_ip = explode(",", $ip);
                    $ip = $exp_ip[0];
                }
            } else if (getenv('HTTP_CLIENT_IP')) {
                $ip = getenv('HTTP_CLIENT_IP');
            } else {
                $ip = getenv('REMOTE_ADDR');
            }
        }
        return $ip;
    }

    static function getUserGroups($user_id)
    {
        $groups = DB::table('tra_user_group')->where('user_id', $user_id)->get();
        $groupsSimpleArray = self::convertStdClassObjToArray($groups);
        $groupsSimpleArray = self::convertAssArrayToSimpleArray($groupsSimpleArray, 'id');
        return $groupsSimpleArray;
    }

    static function getSuperUserGroupIds()
    {
        $super_groups_obj = DB::table('par_groups')
            ->where('is_super_group', 1)
            ->get();
        $super_groups_ass = self::convertStdClassObjToArray($super_groups_obj);
        $super_groups_simp = self::convertAssArrayToSimpleArray($super_groups_ass, 'id');
        return $super_groups_simp;
    }

    static function belongsToSuperGroup($user_groups)
    {
        $superUserIDs = self::getSuperUserGroupIds();
        $arr_intersect = array_intersect($superUserIDs, $user_groups);
        if (count($arr_intersect) > 0) {
            return true;
        } else {
            return false;
        }
    }
    static function getRecordsWithIds($table_name,$checkValues,$col,$con){
        //get values
        $qry = DB::connection($con)->table($table_name)
            ->select($col)
            ->whereIn('id', $checkValues);
        $results = $qry->get();
        return self::convertStdClassObjToArray($results);
        //return $results;
    }
    static function getAssignedProcesses($user_id)
    {
        $user_groups = self::getUserGroups($user_id);
        $isSuperUser = self::belongsToSuperGroup($user_groups);
        if ($isSuperUser === true) {
            //return array();
        }
        //get keys
        $qry = DB::table('tra_processes_permissions as t1')
            ->join('par_menuitems_processes as t2', 't1.process_id', '=', 't2.id')
            ->select(DB::raw('t2.identifier as process_identifier,MAX(t1.accesslevel_id) as accessibility'))
            ->whereIn('t1.group_id', $user_groups)
            ->groupBy('t2.identifier');
        $results = $qry->get();
        $results=self::convertStdClassObjToArray($results);
        $keys=self::convertAssArrayToSimpleArray($results,'process_identifier');
        //get values
        $qry = DB::table('tra_processes_permissions as t1')
            ->join('par_menuitems_processes as t2', 't1.process_id', '=', 't2.id')
            ->select(DB::raw('t2.identifier as process_identifier,MAX(t1.accesslevel_id) as accessibility'))
            ->whereIn('t1.group_id', $user_groups)
            ->groupBy('t2.identifier');
        $results = $qry->get();
        $results=self::convertStdClassObjToArray($results);
        $values=self::convertAssArrayToSimpleArray($results,'accessibility');
        $combined=array_combine($keys,$values);
        return $combined;
    }

    static function getSingleRecord($table, $where,$con)
    {
        $record = DB::connection($con)->table($table)->where($where)->first();
        return $record;
    }

    static function getSingleRecordColValue($table, $where, $col,$con)
    {
        $val = DB::connection($con)->table($table)->where($where)->value($col);
        return $val;
    }
    
    
    static function unsetPrimaryIDsInArray($array,$primary_key)
    {
        
        foreach ($array as $key => $item) {
          
            unset($item[$primary_key]);
             unset($item['portal_id']);
            $array[$key] = $item;
        }
        return $array;

    }
    static function getEmailTemplateInfo($template_id, $vars)
	{
			$template_info = DB::connection('mis_db')->table('email_messages_templates')
					->where('id', $template_id)
					->first();
			if (is_null($template_info)) {
					$template_info = (object)array(
							'subject' => 'Error',
							'body' => 'Sorry this email was delivered wrongly, kindly ignore.'
					);
			}
			$template_info->subject = strtr($template_info->subject, $vars);
			$template_info->body = strtr($template_info->body, $vars);
			return $template_info;
	}
}