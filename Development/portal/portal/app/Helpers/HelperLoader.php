<?php

use App\Helpers\SecurityHelper;
use App\Helpers\AuthHelper;
use App\Helpers\UtilityHelper;
use App\Helpers\DbHelper;
use App\Helpers\DMSHelper;
use App\Helpers\ReportsHelper;
use App\Helpers\NotificationHelper;
use App\Helpers\ReferencingHelper;

if (!function_exists('aes_encrypt')) {
    function aes_encrypt($value)
    {
        return SecurityHelper::aes_encrypt($value);
    }
}
if (!function_exists('sys_error_handler')) {
    function sys_error_handler($error='', $level=1, $me=[], $class_array=[], $user_id)
    {
        return DbHelper::sys_error_handler($error, $level, $me, $class_array, $user_id);
    }
}if (!function_exists('generateInvoiceNo')) {
    function generateInvoiceNo($user_id)
    {
        return UtilityHelper::generateInvoiceNo($user_id);
    }
}
if (!function_exists('aes_encryptAll')) {
    function aes_encryptAll($value)
    {
        return SecurityHelper::aes_encryptAll($value);
    }
}
if (!function_exists('returnColumnParamFromArray')) {
    function returnColumnParamFromArray($dataArray,$dataValue,$col)
    {
        return UtilityHelper::returnColumnParamFromArray($dataArray,$dataValue,$col);
    }
}

if (!function_exists('aes_decrypt')) {
    function aes_decrypt($value)
    {
        return SecurityHelper::aes_decrypt($value);
    }
}
if (!function_exists('getEncryptionKey')) {
    function getEncryptionKey()
    {
        return SecurityHelper::getEncryptionKey();
    }
}

if (!function_exists('unsetPrimaryIDsInArray')) {
    function unsetPrimaryIDsInArray($array,$primary_key)
    {
        return DbHelper::unsetPrimaryIDsInArray($array,$primary_key);
    }
}
if (!function_exists('formatBytes')) {
    function formatBytes($size, $precision = 2)
    {
        return DMSHelper::formatBytes($size, $precision);
    }
}
if (!function_exists('encryptArray')) {
    function encryptArray($array, $skipArray)
    {
        return SecurityHelper::encryptArray($array, $skipArray);
    }
}



if (!function_exists('decryptArray')) {
    function decryptArray($array)
    {
        return SecurityHelper::decryptArray($array);
    }
}
//Auth Helpers
if (!function_exists('generateUniqID')) {
    function generateUniqID()
    {
        return AuthHelper::generateUniqID();
    }
}
if (!function_exists('generateApplicationCode')) {
    function generateApplicationCode($module_id, $table_name,$con='mysql')
    {
        return ReferencingHelper::generateApplicationCode($module_id, $table_name,$con);
    }
}
if (!function_exists('generatePwdSaltOnRegister')) {
    function generatePwdSaltOnRegister($username)
    {
        return AuthHelper::generatePwdSaltOnRegister($username);
    }
}

if (!function_exists('generatePwdSaltOnLogin')) {
    function generatePwdSaltOnLogin($username, $uuid)
    {
        return AuthHelper::generatePwdSaltOnLogin($username, $uuid);
    }
}

if (!function_exists('hashPwdOnRegister')) {
    function hashPwdOnRegister($username, $pwd)
    {
        return AuthHelper::hashPwdOnRegister($username, $pwd);
    }
}

if (!function_exists('hashPwd')) {
    function hashPwd($username, $uuid, $pwd)
    {
        return AuthHelper::hashPwd($username, $uuid, $pwd);
    }
}

if (!function_exists('hashPwdOnLogin')) {
    function hashPwdOnLogin($username, $uuid, $pwd)
    {
        return AuthHelper::hashPwdOnLogin($username, $uuid, $pwd);
    }
}

if (!function_exists('getTimeDiffHrs')) {
    function getTimeDiffHrs($time1, $time2)
    {
        return UtilityHelper::getTimeDiffHrs($time1, $time2);
    }
}
if (!function_exists('getApplicationGeneralFormsFields')) {
    function getApplicationGeneralFormsFields($req)
    {
        return UtilityHelper::getApplicationGeneralFormsFields($req);
    }
}

if (!function_exists('returnActionColumn')) {
    function returnActionColumn($status_id,$actionColumnData)
    {
        return UtilityHelper::returnActionColumn($status_id,$actionColumnData);
    }
    
}
if (!function_exists('saveApplicationSubmissionDetails')) {
    function saveApplicationSubmissionDetails($application_code,$table_name)
    {
        return UtilityHelper::saveApplicationSubmissionDetails($application_code,$table_name);
    }
    
}
if (!function_exists('returnFuncResponses')) {
    function returnFuncResponses($resp,$title,$return_field,$return_value)
    {
        return UtilityHelper::returnFuncResponses($resp,$title,$return_field,$return_value);
    }
}

if (!function_exists('is_connected')) {
    function is_connected()
    {
        return UtilityHelper::is_connected();
    }
}

if (!function_exists('convertStdClassObjToArray')) {
    function convertStdClassObjToArray($stdObjArray)
    {
        return DbHelper::convertStdClassObjToArray($stdObjArray);
    }
}
if (!function_exists('funcForeignexistValidation')) {
    function funcForeignexistValidation($foreign_key,$record_id,$check_foreigntable)
    {
        return DbHelper::funcForeignexistValidation($foreign_key,$record_id,$check_foreigntable);
       
    }
}

if (!function_exists('insertRecordNoTransaction')) {
    function insertRecordNoTransaction($table_name, $table_data, $user_id)
    {
        return DbHelper::insertRecordNoTransaction($table_name, $table_data, $user_id);
    }
}

if (!function_exists('insertRecord')) {
    function insertRecord($table_name, $table_data, $user_id,$con='mysql')
    {
        return DbHelper::insertRecord($table_name, $table_data, $user_id,$con);
    }
}

if (!function_exists('updateRecord')) {
    function updateRecord($table_name, $previous_data, $where, $table_data, $user_id,$con='mysql')
    {
        return DbHelper::updateRecord($table_name, $previous_data, $where, $table_data, $user_id,$con);
    }
}

if (!function_exists('updateRecordNoTransaction')) {
    function updateRecordNoTransaction($table_name, $previous_data, $where, $table_data, $user_id)
    {
        return DbHelper::updateRecordNoTransaction($table_name, $previous_data, $where, $table_data, $user_id);
    }
}

if (!function_exists('deleteRecord')) {
    function deleteRecord($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::deleteRecord($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('deleteRecordNoTransaction')) {
    function deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id,$con='mysql')
    {
        return DbHelper::deleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id,$con);
    }
}

if (!function_exists('softDeleteRecord')) {
    function softDeleteRecord($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::softDeleteRecord($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('softDeleteRecordNoTransaction')) {
    function softDeleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::softDeleteRecordNoTransaction($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('undoSoftDeletes')) {
    function undoSoftDeletes($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::undoSoftDeletes($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('undoSoftDeletesNoTransaction')) {
    function undoSoftDeletesNoTransaction($table_name, $previous_data, $where_data, $user_id)
    {
        return DbHelper::undoSoftDeletesNoTransaction($table_name, $previous_data, $where_data, $user_id);
    }
}

if (!function_exists('deleteRecordNoAudit')) {
    function deleteRecordNoAudit($table_name, $where_data)
    {
        return DbHelper::deleteRecordNoAudit($table_name, $where_data);
    }
}

if (!function_exists('decryptSimpleArray')) {
    function decryptSimpleArray($array)
    {
        return SecurityHelper::decryptSimpleArray($array);
    }
}

if (!function_exists('recordExists')) {
    function recordExists($table_name, $where,$con='mysql')
    {
        return DbHelper::recordExists($table_name, $where,$con);
    }
}

if (!function_exists('getPreviousRecords')) {
    function getPreviousRecords($table_name, $where,$con="mysql")
    {
        return DbHelper::getPreviousRecords($table_name, $where,$con);
    }
}

if (!function_exists('getRecordValFromWhere')) {
    function getRecordValFromWhere($table_name, $where, $col)
    {
        return DbHelper::getRecordValFromWhere($table_name, $where, $col);
    }
}

if (!function_exists('convertAssArrayToSimpleArray')) {
    function convertAssArrayToSimpleArray($assArray, $targetField)
    {
        return DbHelper::convertAssArrayToSimpleArray($assArray, $targetField);
    }
}

if (!function_exists('getUserGroups')) {
    function getUserGroups($user_id)
    {
        return DbHelper::getUserGroups($user_id);
    }
}

if (!function_exists('getSuperUserGroupIds')) {
    function getSuperUserGroupIds()
    {
        return DbHelper::getSuperUserGroupIds();
    }
}

if (!function_exists('belongsToSuperGroup')) {
    function belongsToSuperGroup($user_groups)
    {
        return DbHelper::belongsToSuperGroup($user_groups);
    }
}
if (!function_exists('getParameterItem')) {
    function getParameterItem($table_name,$record_id,$con)
    {
        return DbHelper::getParameterItem($table_name,$record_id,$con);
    }
}
if (!function_exists('getParameterItems')) {
    function getParameterItems($table_name,$filter,$con)
    {
        return DbHelper::getParameterItems($table_name,$filter,$con);
    }
}
if (!function_exists('returnParamFromArray')) {
    function returnParamFromArray($dataArray,$dataValue)
    {
        return UtilityHelper::returnParamFromArray($dataArray,$dataValue);
    }
}


if (!function_exists('insertReturnID')) {
    function insertReturnID($table_name, $table_data)
    {
        return DbHelper::insertReturnID($table_name, $table_data);
    }
}

if (!function_exists('insertRecordNoAudit')) {
    function insertRecordNoAudit($table_name, $table_data,$con)
    {
        return DbHelper::insertRecordNoAudit($table_name, $table_data,$con);
    }
}

if (!function_exists('converter1')) {
    function converter1($date)
    {
        return UtilityHelper::converter1($date);
    }
}

if (!function_exists('converter2')) {
    function converter2($date)
    {
        return UtilityHelper::converter2($date);
    }
}

if (!function_exists('converter11')) {
    function converter11($date)
    {
        return UtilityHelper::converter11($date);
    }
}

if (!function_exists('converter22')) {
    function converter22($date)
    {
        return UtilityHelper::converter22($date);
    }
}

if (!function_exists('getSingleRecord')) {
    function getSingleRecord($table, $where, $con='mysql')
    {
        return DbHelper::getSingleRecord($table, $where,$con);
    }
}

if (!function_exists('getSingleRecordColValue')) {
    function getSingleRecordColValue($table, $where, $col,$con='mysql')
    {
        return DbHelper::getSingleRecordColValue($table, $where, $col,$con);
    }
}

if (!function_exists('formatMoney')) {
    function formatMoney($value)
    {
        return UtilityHelper::formatMoney($value);
    }
}
if (!function_exists('validateIsNumeric')) {
    function validateIsNumeric($value)
    {
        return UtilityHelper::validateIsNumeric($value);
    }
}
if (!function_exists('generateProductReferenceNo')) {
    function generateProductReferenceNo($section_id,$classification_id,$sub_module_id)
    {
        return ReferencingHelper::generateProductReferenceNo($section_id,$classification_id,$sub_module_id);
    }
}
if (!function_exists('generatePremisesReferenceNo')) {
    function generatePremisesReferenceNo($business_type_id,$sub_module_id)
    {
        return ReferencingHelper::generatePremisesReferenceNo($business_type_id,$sub_module_id);
    }
}
if (!function_exists('generateGMPReferenceNo')) {
    function generateGMPReferenceNo($section_id,$sub_module_id)
    {
        return ReferencingHelper::generateGMPReferenceNo($section_id,$sub_module_id);
    }
}

if (!function_exists('dms_createFolder')) {
    function dms_createFolder($parent_folder, $name, $comment, $user_email)
    {
        return DMSHelper::dms_createFolder($parent_folder, $name, $comment, $user_email);

    }
}
if (!function_exists('createDMSParentFolder')) {
    function createDMSParentFolder($parent_folder, $module_id, $name, $comment, $owner)
    {
        return DMSHelper::createDMSParentFolder($parent_folder, $module_id, $name, $comment, $owner);

    }
}

//start on the DMS func calls 
if (!function_exists('authDms')) {
    function authDms($usr_name)
    {
        return DMSHelper::authDms($usr_name);

    }
}
if (!function_exists('validateTicketDMS')) {
    function validateTicketDMS($ticket)
    {
        return DMSHelper::validateTicketDMS($ticket);

    }
}
if (!function_exists('logoutDMS')) {
    function logoutDMS($ticket)
    {
        return DMSHelper::logoutDMS($ticket);

    }
}

if (!function_exists('logoutDMS')) {
    function logoutDMS($ticket)
    {
        return DMSHelper::logoutDMS($ticket);

    }
}
if (!function_exists('dmsCreateAccount')) {
    function dmsCreateAccount($user_data)
    {
        return DMSHelper::dmsCreateAccount($user_data);

    }
}
if (!function_exists('dmsDeleteAccount')) {
    function dmsDeleteAccount($userName)
    {
        return DMSHelper::dmsDeleteAccount($userName);

    }
}
if (!function_exists('dmsGetAccount')) {
    function dmsGetAccount($userName)
    {
        return DMSHelper::dmsGetAccount($userName);

    }
}
if (!function_exists('dmsGetAllAccount')) {
    function dmsGetAllAccount()
    {
        return DMSHelper::dmsGetAllAccount();

    }
}

if (!function_exists('dmsUpdateAccount')) {
    function dmsUpdateAccount($userName,$userDetails)
    {
        return DMSHelper::dmsUpdateAccount($userName,$userDetails);

    }
}
if (!function_exists('dmsUpdateAccountPassword')) {
    function dmsUpdateAccountPassword($userName,$oldPassword,$newPassword)
    {
        return DMSHelper::dmsUpdateAccountPassword($userName,$oldPassword,$newPassword);

    }
}
if (!function_exists('dmsGetAppSiteRoot')) {
    function dmsGetAppSiteRoot($root_site = null)
    {
        return DMSHelper::dmsGetAppSiteRoot($root_site);

    }
}
if (!function_exists('dmsCreateAppSiteRoot')) {
    function dmsCreateAppSiteRoot($site_details)
    {
        return DMSHelper::dmsCreateAppSiteRoot($site_details);

    }
}

if (!function_exists('dmsGetAppSiteContainer')) {
    function dmsGetAppSiteContainer($site_id,$container=null)
    {
        return DMSHelper::dmsGetAppSiteContainer($site_id,$container);

    }
}
if (!function_exists('dmsGetAppSiteContainerNodes')) {
    function dmsGetAppSiteContainerNodes($site_id,$container)
    {
        return DMSHelper::dmsGetAppSiteContainerNodes($site_id,$container);

    }
}
if (!function_exists('dmsGetAppRootNodes')) {
    function dmsGetAppRootNodes($defination)
    {
        return DMSHelper::dmsGetAppRootNodes($defination);

    }
}
if (!function_exists('dmsGetAppRootNodesChildren')) {
    function dmsGetAppRootNodesChildren($parent_node)
    {
        return DMSHelper::dmsGetAppRootNodesChildren($parent_node);

    }
}
if (!function_exists('dmsGetAppRootNodesContents')) {
    function dmsGetAppRootNodesContents($parent_node)
    {
        return DMSHelper::dmsGetAppRootNodesContents($parent_node);

    }
}
if (!function_exists('dmsCreateAppRootNodesChildren')) {
    function dmsCreateAppRootNodesChildren($parent_node,$node_details)
    {
        return DMSHelper::dmsCreateAppRootNodesChildren($parent_node,$node_details);

    }
}
if (!function_exists('dmsUpdateAppRootNodesChildren')) {
    function dmsUpdateAppRootNodesChildren($node_id,$node_details)
    {
        return DMSHelper::dmsUpdateAppRootNodesChildren($node_id,$node_details);

    }
}if (!function_exists('dmsUploadNodeDocument')) {
    function dmsUploadNodeDocument($destination_node,$document_path, $origFileName,$update_noderef=null, $description=null)
    {
        return DMSHelper::dmsUploadNodeDocument($destination_node,$document_path, $origFileName,$update_noderef, $description);
    }
}
if (!function_exists('dmsDeleteAppRootNodesChildren')) {
    function dmsDeleteAppRootNodesChildren($node_id)
    {
        return DMSHelper::dmsDeleteAppRootNodesChildren($node_id);

    }
}
if (!function_exists('getNonStructuredDestinationNode')) {
    function getNonStructuredDestinationNode($document_type_id,$document_site_id)
    {
        return DMSHelper::getNonStructuredDestinationNode($document_type_id,$document_site_id);

    }
}


//get folder documents 
if (!function_exists('dms_FolderDocuments')) {
    function dms_FolderDocuments($folder_id, $user_email)
    {
        return DMSHelper::dms_FolderDocuments($folder_id, $user_email);

    }
}
//check folder documents
if (!function_exists('check_DmsFolderDocuments')) {
    function check_DmsFolderDocuments($folder_id, $user_email)
    {
        return DMSHelper::check_DmsFolderDocuments($folder_id, $user_email);

    }
}
if (!function_exists('downloadDocumentUrl')) {
    function downloadDocumentUrl($node_ref,$version_id = null)
    {
        return DMSHelper::downloadDocumentUrl($node_ref,$version_id);

    }
}
if (!function_exists('dmsGetNodePreviousVersions')) {
    function dmsGetNodePreviousVersions($node_ref,$version_ref=null)
    {
        return DMSHelper::dmsGetNodePreviousVersions($node_ref,$version_ref);

    }
}
if (!function_exists('getApplicationSubModuleNodeDetails')) {
    function getApplicationSubModuleNodeDetails($section_id,$module_id, $sub_module_id,$trader_id,$con='mis_db')
    {
        return DMSHelper::getApplicationSubModuleNodeDetails($section_id,$module_id, $sub_module_id,$trader_id,$con);

    }
}
if (!function_exists('getApplicationRootNode')) {
    function getApplicationRootNode($application_code,$module_id,$sub_module_id)
    {
        return DMSHelper::getApplicationRootNode($application_code,$module_id,$sub_module_id);

    }
}
if (!function_exists('getNonStructureDocumentRootNode')){

    function getNonStructureDocumentRootNode($document_type_id)
    {
        return DMSHelper::getNonStructureDocumentRootNode($document_type_id);

    }
    
}
if (!function_exists('getApplicationApplicableDocuments')){

    function getApplicationApplicableDocuments(	$section_id,$sub_module_id,	$status_id)
    {
        return DMSHelper::getApplicationApplicableDocuments($section_id,$sub_module_id,	$status_id);

    }
    
}


if (!function_exists('getDocumentTypeRootNode')) {
    function getDocumentTypeRootNode($parent_node_ref,$application_code,$document_type_id,$trader_email)
    {
        return DMSHelper::getDocumentTypeRootNode($parent_node_ref,$application_code,$document_type_id,$trader_email);

    }
}
if (!function_exists('saveApplicationDocumentNodedetails')) {
    function saveApplicationDocumentNodedetails($application_code,$tracking_no,$dms_node_id,$user,$con='mis_db')
    {
        return DMSHelper::saveApplicationDocumentNodedetails($application_code,$tracking_no,$dms_node_id,$user,$con);

    }
}
//initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number, $trader_id)
if (!function_exists('initializeApplicationDMS')) {
    function initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number, $trader_id)
    {
        return DMSHelper::initializeApplicationDMS($section_id, $module_id, $sub_module_id, $application_code, $ref_number, $trader_id);

    }
}
//end of the dms function call
if (!function_exists('utf8ize')) {
    function utf8ize($d)
    {
        return UtilityHelper::utf8ize($d);
    }

}

if (!function_exists('formatDate')) {
    function formatDate($date)
    {
        return UtilityHelper::formatDate($date);
    }
}

if (!function_exists('formatDaterpt')) {
    function formatDaterpt($date)
    {
        return UtilityHelper::formatDaterpt($date);
    }
}
    if (!function_exists('checkForOngoingApplications')) {
        function checkForOngoingApplications($registered_id, $table_name, $reg_column, $process_id)
        {
            return UtilityHelper::checkForOngoingApplications($registered_id, $table_name, $reg_column, $process_id);
        }
    }if (!function_exists('checkForPortalOngoingApplications')) {
        function checkForPortalOngoingApplications($registered_id, $table_name, $reg_column, $process_id)
        {
            return UtilityHelper::checkForPortalOngoingApplications($registered_id, $table_name, $reg_column, $process_id);
        }
    }
    
    if (!function_exists('getApplicationPrimaryReferenceNo')) {
        function getApplicationPrimaryReferenceNo($where_statement, $applications_table)
        {
            return UtilityHelper::getApplicationPrimaryReferenceNo($where_statement, $applications_table);
    
        }
    }
    if (!function_exists('generateApplicationSubRefNumber')) {
        function generateApplicationSubRefNumber($reg_product_id,$table_name,$ref_id, $codes_array, $sub_module_id, $user_id)
        {
            return UtilityHelper::generateApplicationSubRefNumber($reg_product_id,$table_name,$ref_id, $codes_array, $sub_module_id, $user_id);
        }
    }
    
if (!function_exists('createDMSModuleFolders')) {
    function createDMSModuleFolders($parent_id, $module_id, $owner)
    {
        return DMSHelper::createDMSModuleFolders($parent_id, $module_id, $owner);

    }
}

if (!function_exists('getSubModuleFolderID')) {
    function getSubModuleFolderID($parent_folder_id, $sub_module_id)
    {
        return DMSHelper::getSubModuleFolderID($parent_folder_id, $sub_module_id);
    }
}

if (!function_exists('getSubModuleFolderIDWithCreate')) {
    function getSubModuleFolderIDWithCreate($parent_folder_id, $sub_module_id, $owner)
    {
        return DMSHelper::getSubModuleFolderIDWithCreate($parent_folder_id, $sub_module_id, $owner);
    }
}

if (!function_exists('updateDocumentSequence')) {
    function updateDocumentSequence($parent, $order_no)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->updateDocumentSequence($parent, $order_no);
    }
}

if (!function_exists('saveRecordReturnId')) {
    function saveRecordReturnId($data, $table)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->saveRecordReturnId($data, $table);
    }
}

if (!function_exists('saveRecord')) {
    function saveRecord($data, $table)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->saveRecord($data, $table);
    }
}

if (!function_exists('getfile_extension')) {
    function getfile_extension($fileName)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->getfile_extension($fileName);
    }
}

if (!function_exists('fileSize')) {
    function fileSize($file)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->fileSize($file);
    }
}

if (!function_exists('format_filesize')) {
    function format_filesize($size, $sizes = array('Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'))
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->format_filesize($size, $sizes);
    }
}

if (!function_exists('parse_filesize')) {
    function parse_filesize($str)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->parse_filesize($str);
    }
}

if (!function_exists('getParent')) {
    function getParent($folderId)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->getParent($folderId);
    }
}

if (!function_exists('getChecksum')) {
    function getChecksum($file)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->getChecksum($file);
    }
}

if (!function_exists('getPath')) {
    function getPath($folderId)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->getPath($folderId);
    }
}

if (!function_exists('addDocument')) {
    function addDocument($doc_name, $doc_comment, $file_name, $folder_id, $versioncomment = '', $is_array_return = false)
    {
        $dmsHelper = new DMSHelper();
        return $dmsHelper->addDocument($doc_name, $doc_comment, $file_name, $folder_id, $versioncomment, $is_array_return);
    }
}

if (!function_exists('getParentFolderID')) {
    function getParentFolderID($table, $parent_record_id)
    {
        return DMSHelper::getParentFolderID($table, $parent_record_id);
    }
}

if (!function_exists('createDMSParentFolder')) {
    function createDMSParentFolder($parent_folder, $module_id, $name, $comment, $owner)
    {
        return DMSHelper::createDMSParentFolder($parent_folder, $module_id, $name, $comment, $owner);
    }
}

if (!function_exists('returnUniqueArray')) {
    function returnUniqueArray($array, $key)
    {
        return UtilityHelper::returnUniqueArray($array, $key);
    }
}
if (!function_exists('generateApplicationRefNumber')) {
    function generateApplicationRefNumber($ref_id, $codes_array, $year, $process_id, $zone_id, $user_id,$con='mis_db')
    {
        return ReferencingHelper::generateApplicationRefNumber($ref_id, $codes_array, $year, $process_id, $zone_id, $user_id,$con);
    }
}
if (!function_exists('getRecordCodeNo')) {
    function getRecordCodeNo($table_name,$record_id)
    {
        return ReferencingHelper::getRecordCodeNo($table_name,$record_id);
    }
}
if (!function_exists('generateTraderNo')) {
    function generateTraderNo($table_name)
    {
        return UtilityHelper::generateTraderNo($table_name);
    }
}
if (!function_exists('getAssignedProcesses')) {
    function getAssignedProcesses($user_id)
    {
        return DbHelper::getAssignedProcesses($user_id);
    }
}
if (!function_exists('updateApplicationCode')) {
    function updateApplicationCode($table_name,$application_code_no, $record_id)
    {
        return DbHelper::updateApplicationCode($table_name,$application_code_no, $record_id);
    }
}

if (!function_exists('returnContextMenuActions')) {
    function returnContextMenuActions()
    {
        return UtilityHelper::returnContextMenuActions();
    }
}

if (!function_exists('generateJasperReport')) {
    function generateJasperReport($input_file_name, $output_filename, $file_type, $params = array())
    {
        $reportsHelper = new ReportsHelper();
        return $reportsHelper->generateJasperReport($input_file_name, $output_filename, $file_type, $params);
    }
}
if(!function_exists('sendMailNotification')){
	function sendMailNotification($trader_name, $to,$subject,$message,$cc=null,$bcc='',$attachment=null,$attachement_name=''){
		 return NotificationHelper::sendMailNotification($trader_name, $to,$subject,$message,$cc,$bcc,$attachment,$attachement_name);
	
	}
}

if(!function_exists('getEmailTemplateInfo')){
	function getEmailTemplateInfo($template_id, $vars){
		 return DbHelper::getEmailTemplateInfo($template_id, $vars);
	
	}
}
if (!function_exists('getProductPrimaryReferenceNo')) {
    function getProductPrimaryReferenceNo($where_statement, $applications_table)
    {
        return UtilityHelper::getProductPrimaryReferenceNo($where_statement, $applications_table);

    }
}
if (!function_exists('generateProductsSubRefNumber')) {
    function generateSubRefNumber($where_statement, $table_name, $ref_id, $codes_array, $sub_module_id, $user_id)
    {
        return UtilityHelper::generateSubRefNumber($where_statement, $table_name, $ref_id, $codes_array, $sub_module_id, $user_id);
    }
}
if (!function_exists('funcSaveRegisteredProductOtherdetails')) {
    function funcSaveRegisteredProductOtherdetails($tra_product_id, $online_product_id,$trader_id)
    {
        return UtilityHelper::funcSaveRegisteredProductOtherdetails($tra_product_id, $online_product_id,$trader_id);
    }
}if (!function_exists('getProductRetentionStatus')) {
    function getProductRetentionStatus($section_id,$reg_product_id)
    {
        return UtilityHelper::getProductRetentionStatus($section_id,$reg_product_id);
    }
}

if (!function_exists('getInvoiceDetails')) {
    function getInvoiceDetails($module_id, $application_id)
    {
        $reportsHelper = new ReportsHelper();
        return $reportsHelper->getInvoiceDetails($module_id, $application_id);
    }
}
if (!function_exists('getTableData')) {
    function getTableData($table_name, $where,$con='mysql')
    {
        return DbHelper::getTableData($table_name, $where,$con);
    }
}
if (!function_exists('getRecordsWithIds')) {
    function getRecordsWithIds($table_name,$checkValues,$col,$con='mysql')
    {
        return DbHelper::getRecordsWithIds($table_name,$checkValues,$col,$con);
    }
}

