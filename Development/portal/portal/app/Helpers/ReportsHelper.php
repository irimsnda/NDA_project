<?php
/**
 * Created by PhpStorm.
 * User: Kip
 * Date: 7/24/2018
 * Time: 12:38 PM
 */

namespace App\Helpers;

use Jaspersoft\Client\Client;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\QueryException;
use Carbon\Carbon;
class ReportsHelper
{
    public $client = '';
    public $jasper_server_url = '';
    public $jasper_server_username = '';
    public $jasper_server_password = '';
   
    public function __construct()
    {
        $this->jasper_server_url = env('JASPER_SERVER_URL', 'http://localhost:8080/jasperserver');
        $this->jasper_server_username = env('JASPER_SERVER_USERNAME', 'jasperadmin');
        $this->jasper_server_password = env('JASPER_SERVER_PASSWORD', 'jasperadmin');

        $this->client = new Client(
            $this->jasper_server_url,
            $this->jasper_server_username,
            $this->jasper_server_password
        );
    }

    public function generateJasperReport($input_filename, $output_filename, $mode, $controls)
    {
        $report = $this->client->reportService()->runReport('/reports/Tfda_v2/' . $input_filename, $mode, null, null, $controls);
        return response($report)
            ->header('Cache-Control', 'no-cache private')
            ->header('Content-Description', 'File Transfer')
            ->header('Content-Type', 'application/pdf')
            ->header('Content-length', strlen($report))
            ->header('Content-Disposition', 'inline; filename=' . $output_filename . '.' . $mode)
            ->header('Content-Transfer-Encoding', 'binary');
    }
   
    public function getPremiseInvoiceDetails($application_code,$table_name)
    {
        $qry = DB::connection('mis_db')->table('tra_premises_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('tra_premises as t3', 't1.premise_id', '=', 't3.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT_WS(', ',t3.name,t3.physical_address) as module_desc"))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        return $invoice_details;
    }
    public function getProductInvoiceDetails($application_id)
    {
        $qry = DB::connection('mis_db')->table('tra_product_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('tra_product_information as t3', 't1.product_id', '=', 't3.id')
            ->leftJoin('par_common_names as t5', 't3.common_name_id', '=', 't5.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT_WS(', ',t3.brand_name,t5.name) as module_desc"))
            ->where('t1.id', $application_id);
        $invoice_details = $qry->first();
        return $invoice_details;
        
    }
   
    public function getGmpInvoiceDetails($application_id)
    {
        $qry = DB::connection('mis_db')->table('tra_gmp_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('tra_manufacturing_sites as t3', 't1.manufacturing_site_id', '=', 't3.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT_WS(', ',t3.name,t3.physical_address) as module_desc"))
            ->where('t1.id', $application_id);
        $invoice_details = $qry->first();
        return $invoice_details;
    }
    public function getImporExportInvoiceDetails($application_id)
    {
        $qry = DB::connection('mis_db')->table('tra_importexport_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     'Import/Export Permit Invoice' as module_desc"))
            ->where('t1.id', $application_id);
        $invoice_details = $qry->first();
        
        return $invoice_details;
        
    }
    public function getClinicalTrialInvoiceDetails($application_id)
    {
        $qry = DB::connection('mis_db')->table('tra_clinical_trial_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT(t1.study_title,'(',CONCAT_WS(',',CONCAT('Protocol No:',t1.protocol_no),CONCAT('Version No:',t1.version_no)),')') as module_desc
                     "))
            ->where('t1.id', $application_id);
        $invoice_details = $qry->first();
        return $invoice_details;
    }
    public function getInvoiceDetails($module_id, $application_code)
    {
        $res = array(
            'reference_no' => 'N/A',
            'process_name' => 'N/A',
            'module_name' => 'N/A',
            'module_desc' => 'N/A'
        );
        $invoice_details=array();
        
        if ($module_id == 1) {//Product Registration
            $invoice_details = self::getProductInvoiceDetails($application_code,'mis_db');
        } else if ($module_id == 2) {//Premise Registration
            $invoice_details = self::getPremiseInvoiceDetails($application_code,'mis_db');
        } else if ($module_id == 3) {//GMP Applications
            $invoice_details = self::getGmpInvoiceDetails($application_code,'mis_db');
        } else if ($module_id == 4) {//Import & Export
                
            $invoice_details = self::getImporExportInvoiceDetails($application_id);
        } else if ($module_id == 5) {//PMS Module

        } else if ($module_id == 6) {//Product Notification

        } else if ($module_id == 7) {//Clinical Trial
            $invoice_details = self::getClinicalTrialInvoiceDetails($application_code,'mis_db');
        } else if ($module_id == 8) {//QMS Module

        } else if ($module_id == 9) {//Surveillance Applications

        } else if ($module_id == 10) {//Disposal Module

        } else if ($module_id == 12) {//Narcotic Permit Applications

        } else if ($module_id == 14) {//Promotional & Advertisements

        }
        if (!is_null($invoice_details)) {
            $res = array(
                'reference_no' => $invoice_details->reference_no,
                'process_name' => $invoice_details->process_name,
                'module_name' => $invoice_details->module_name,
                'module_desc' => $invoice_details->module_desc
            );
        }
        
        return $res;
    }

}