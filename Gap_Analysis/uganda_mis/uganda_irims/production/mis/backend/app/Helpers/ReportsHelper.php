<?php


namespace App\Helpers;


use Illuminate\Support\Facades\DB;
use Jaspersoft\Client\Client;
use Modules\ProductRegistration\Traits\ProductsRegistrationTrait;
use Modules\PremiseRegistration\Traits\PremiseRegistrationTrait;
use Modules\GmpApplications\Traits\GmpApplicationsTrait;
use Modules\ClinicalTrial\Traits\ClinicalTrialTrait;
use Modules\Importexportpermits\Traits\ImportexportpermitsTraits;
use Modules\Revenuemanagement\Traits\RevenuemanagementTrait;
use Modules\PromotionMaterials\Traits\PromotionMaterialsTrait;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Illuminate\Support\Carbon;

class ReportsHelper
{
    public $client = '';
    public $jasper_server_url = '';
    public $jasper_server_username = '';
    public $jasper_server_password = '';
    use ProductsRegistrationTrait;
    use PremiseRegistrationTrait;
    use GmpApplicationsTrait;
    use ClinicalTrialTrait;
    use ImportexportpermitsTraits;
    use RevenuemanagementTrait;

    public function __construct()
    {
        $this->jasper_server_url = Config('constants.jasper.jasper_server_url');
        $this->jasper_server_username = Config('constants.jasper.jasper_server_username');
        $this->jasper_server_password = Config('constants.jasper.jasper_server_password');
        
        $this->client = new Client(
            $this->jasper_server_url,
            $this->jasper_server_username,
            $this->jasper_server_password
        );
    }

    public function generateJasperReport($input_filename, $output_filename, $mode, $controls)
    {
      
       $reports_baseurl = Config('constants.jasper.reports_baseurl');
        $report = $this->client->reportService()->runReport($reports_baseurl . $input_filename, $mode, null, null, $controls);

        if(isset($report['success']) && !$report['success']){
           return $report;
        }
        else{
            return response($report)
            ->header('Cache-Control', 'no-cache private')
            ->header('Content-Description', 'File Transfer')
            ->header('Content-Type', 'application/pdf')
            ->header('Content-length', strlen($report))
            ->header('Content-Disposition', 'inline; filename=' . $output_filename . '.' . $mode)
            ->header('Content-Transfer-Encoding', 'binary');
        }
        
      
    }
	static function getProductInvoiceDetails($application_code)
    {
        $where = array('t1.application_code'=>$application_code);
        
        $qry = DB::table('tra_product_applications as t1')
            ->leftJoin('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->leftJoin('tra_product_information as t3', 't1.product_id', '=', 't3.id')
            ->leftJoin('par_common_names as t5', 't3.common_name_id', '=', 't5.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->leftJoin('tra_registered_products as t6', 't1.reg_product_id', '=', 't6.id')
            ->select(DB::raw("t1.reference_no,t1.tracking_no ,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT_WS(', ',t3.brand_name,t3.product_strength, t6.registration_no) as module_desc"))
            ->where($where);
        $invoice_details = $qry->first();
       if(!$invoice_details){
		    
	   }
	   
        return $invoice_details;
        
    }
	static function getPremiseInvoiceDetails($application_code)
    {
        $qry = DB::table('tra_premises_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('tra_premises as t3', 't1.premise_id', '=', 't3.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT_WS(', ',t3.name,t3.physical_address) as module_desc"))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        return $invoice_details;
    }
	static function getGmpInvoiceDetails($application_code)
    {
        $qry = DB::table('tra_gmp_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('tra_manufacturing_sites as t3', 't1.manufacturing_site_id', '=', 't3.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no, t1.tracking_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT_WS(', ',t3.name,t3.physical_address) as module_desc"))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        return $invoice_details;
    }
	 static function getImporExportInvoiceDetails($application_code)
    {
        $qry = DB::table('tra_importexport_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no, t1.tracking_no,t2.name as process_name,t4.invoice_desc as module_name,
                     t1.proforma_invoice_no as module_desc"))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        
        return $invoice_details;
        
    } 
	static function getClinicalTrialInvoiceDetails($application_code)
    {
		
        $qry = DB::table('tra_clinical_trial_applications as t1')
            ->join('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->join('modules as t4', 't1.module_id', '=', 't4.id')
            ->select(DB::raw("t1.reference_no, t1.tracking_no,t2.name as process_name,t4.invoice_desc as module_name,
                     CONCAT(t1.study_title,'(',CONCAT_WS(',',CONCAT('Protocol No:',t1.protocol_no),CONCAT('Version No:',t1.version_no)),')') as module_desc
                     "))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        return $invoice_details;
    }

    public function getInvoiceDetails($module_id, $application_id,$application_code)
    {
        $res = array(
            'reference_no' => 'N/A',
            'process_name' => 'N/A',
            'module_name' => 'N/A',
            'module_desc' => 'N/A'
        );
        $invoice_details = array();
        if ($module_id == 1) {//Product Registration
            $invoice_details = self::getProductInvoiceDetails($application_code);
        } else if ($module_id == 2) {//Premise Registration
            $invoice_details = self::getPremiseInvoiceDetails($application_code);
        } else if ($module_id == 3) {//GMP Applications
            $invoice_details = self::getGmpInvoiceDetails($application_code);
        } else if ($module_id == 4) {//Import & Export
            $invoice_details = self::getImporExportInvoiceDetails($application_code);
        } else if ($module_id == 5) {//PMS Module

        } else if ($module_id == 6) {//Product Notification

        } else if ($module_id == 7) {//Clinical Trial
            $invoice_details = self::getClinicalTrialInvoiceDetails($application_code);
        } else if ($module_id == 8) {//QMS Module

        } else if ($module_id == 9) {//Surveillance Applications

        } else if ($module_id == 10) {//Disposal Module

        } else if ($module_id == 12) {//Narcotic Permit Applications

        } else if ($module_id == 14) {//Promotional & Advertisements

            $invoice_details = self::getPromotionalInvoiceDetails($application_code);
        }else if ($module_id == 17) {
            $invoice_details = $this->getAdhocInvoiceDetails($application_code);
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
    function getPromotionalInvoiceDetails($application_code)
    {
        $qry = DB::table('tra_promotion_adverts_applications as t1')
            ->leftJoin('wf_tfdaprocesses as t2', 't1.process_id', '=', 't2.id')
            ->leftJoin('modules as t4', 't1.module_id', '=', 't4.id')
            
            ->join('tra_application_invoices as t6', 't1.application_code', '=', 't6.application_code')
            ->select(DB::raw("t1.reference_no,t2.name as process_name,t4.invoice_desc as module_name,t6.id as invoice_id,
                     'Promotional Application Invoice' as module_desc"))
            ->where('t1.application_code', $application_code);
        $invoice_details = $qry->first();
        
        return $invoice_details;
        
    } 
   static function exportDatatoExcel($data, $heading, $filename){
        
  //data capture
        // $function=$req->function;
        // $response=$this->$function($req,1);
        // $data=$response['results'];
        // $heading=$response['heading'];
        $data_array = json_decode(json_encode($data), true);

//product application details
        $dataSpreadsheet = new Spreadsheet();
        $sheet = $dataSpreadsheet->getActiveSheet();
       // $ProductSpreadsheet->getActiveSheet()->setTitle($heading);
        $cell=0;


        
//Main heading style
        $styleArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ],
                'fill' => [
                    'fillType' => \PhpOffice\PhpSpreadsheet\Style\Fill::FILL_GRADIENT_LINEAR,
                    'rotation' => 90,
                    'startColor' => [
                        'argb' => 'FFA0A0A0',
                    ],
                    'endColor' => [
                        'argb' => 'FFFFFFFF',
                    ],
                ]
            ];
          $styleHeaderArray = [
                'font' => [
                    'bold' => true,
                ],
                'alignment' => [
                    'horizontal' => \PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER,
                ],
                'borders' => [
                    'top' => [
                        'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
                    ],
                ]
            ];

      if(isset($data_array[0])){
          $header=array_keys($data_array[0]);
          $length=count($header);
       }
       else{
          $data_array=array();
          $header=array();
          $length=1;
          $sheet->getCell('A2')->setValue("No data");
       }

       $size=count($data_array)+7;

  //add sn column
       $sheet->insertNewColumnBefore('A', 1);

  //adding formats to header
       array_unshift($header,"S/N");
       $sheet->fromArray($header, null, "A7");

  //loop data while writting
       $sheet->fromArray( $data_array, null,  "B8");

  //add S/N counter 
       for($i=8; $i <= $size; $i++){
          $sheet->getCell('A'.$i)->setValue($i-7);
       }
        $length = $length+1; //add one for the new column added 
        $letter=self::number_to_alpha($length,"");
      
  //set cell text wrap true for all columns
        $cellRange = 'A7:'.$letter.''.$size;
        $sheet->getStyle($cellRange)->getAlignment()->setWrapText(true);
        $sheet->getColumnDimension('A')->setAutoSize(true);

  //add heading title
        $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
            ->setValue("TANZANIAN MEDICINE AND MEDICAL DEVICES AGENCY\nP.O. Box 77150, Nelson Mandela Road,Mabibo External\nTell : +255 22 2450512/2450751/2452108 Fax : +255 28 2541484\nWebsite: www.tfda.go.tzEmail: info@tfda.go.tz\n".$heading."\t\t printed on ".Carbon::now());
        $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
        $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);

      //format row headers 
       $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);

      //create file
       $writer = new Xlsx($dataSpreadsheet);
         

      $response =  new StreamedResponse(
          function () use ($writer) {
              $writer->save('php://output');
          }
      );
      $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $response->headers->set('Content-Disposition', 'attachment;filename='.$filename.'.xlsx');
      $response->headers->set('Cache-Control','max-age=0');


     return $response;
            }
   static function number_to_alpha($num,$code)
        {   
            $alphabets = array('', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');

            $division = floor($num / 26);
            $remainder = $num % 26; 

            if($remainder == 0)
            {
                $division = $division - 1;
                $code .= 'Z';
            }
            else
                $code .= $alphabets[$remainder];

            if($division > 26)
                return number_to_alpha($division, $code);   
            else
                $code .= $alphabets[$division];     

            return strrev($code);
        }
}