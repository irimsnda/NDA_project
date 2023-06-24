<?php

namespace Modules\Reports\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{

    protected $user_id;

    public function __construct()
    {
        
    }

    public function index()
    {
        return view('reports::index');
    }

    public function generateApplicationInvoice(Request $req)
    {
        $table_name = $req->table_name;

        $application_code = $req->application_code;

        $data = DB::connection("mis_db")
                    ->table($table_name.' as t1')
                    ->join('tra_application_invoices as t2','t1.application_code','=','t2.application_code')
                    ->where('t1.application_code',$application_code)
                    ->select('t1.module_id', 't2.id as invoice_id', 't1.id as application_id')
                    ->first();
        if($data){

            $invoice_id = $data->invoice_id;
            $module_id = $data->module_id;
            $application_id = $data->application_id;
            
            $invoice_details = getInvoiceDetails($module_id, $application_id);
            $params = array(
                'invoice_id' => $invoice_id,
                'process_name' => $invoice_details['process_name'],
                'module_name' => $invoice_details['module_name'],
                'module_desc' => $invoice_details['module_desc'],
                'reference_no' => $invoice_details['reference_no']
            );
            
            $report = generateJasperReport('invoiceReport', 'invoice_'.time(), 'pdf', $params);
            
            return $report;
        }
        else{

            echo  "Application Details Not Found";
        }

    }
    public function generateRetentionStatements(Request $req){

        echo "Retention Invoices";
        
    }
    
    public function generateApplicationReceipts(Request $request)
    {

        $payment_id =$request->input('payment_id');
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
        $module_details = getTableData('modules',array('id'=>$module_id),'mis_db');
        $table_name = $module_details->table_name;
        $reference_no = getSingleRecordColValue($table_name, array('application_code' => $application_code), 'reference_no','mis_db');

        $params = array(
            'payment_id' => $payment_id,
            'reference_no' => $reference_no
        );

        $report = generateJasperReport('receiptReport', 'receipt_'.time(), 'pdf', $params);
        return $report;
    }

    public function generatePremiseCertificate(Request $request)
    {
        $premise_id =$request->input('premise_id');
        $params = array(
            'premise_id' => $premise_id
        );
        $report = generateJasperReport('certificateReport', 'certificate_'.time(), 'pdf', $params);
        return $report;
    }

    public function generatePremisePermit(Request $request)
    {
        $premise_id =$request->input('premise_id');
       
        $params = array(
            'premise_id' => $premise_id
        );
        $report = generateJasperReport('premisePermitReport', 'permit_'.time(), 'pdf', $params);
        return $report;
    }
    public function generateProductRegCertificate(Request $request)
    {
        //$product_id =$request->input('product_id');
        $product_id=130;
        $document_number='BVS/099/45';
        $certificate_name='FOOD CERTIFICATE';
        $params = array(
            'product_id' => $product_id,
            'document_number' => $document_number,
            'certificate_name' => $certificate_name,
            'certificate_regulation' => '(Made under Section 21(3) of the Tanzania Food, Drugs and Cosmetics Act, Cap 219)'
        );
        $report_name='drugsCertificateReport';
        // if($section_id == 1){

        //$report_name = 'foodCertificateReport';

        // }
        // else if($section_id == 2){
        //     $report_name = 'drugsCertificateReport';

        // }else if($section_id == 3){
        //     $report_name = 'cosmeticsCertificateReport';

        // }
        // else{

        //     $report_name = 'medicalDevCertificateReport';
        // }

        $report = generateJasperReport($report_name, 'permit_'.time(), 'pdf', $params);
        return $report;
    }
    public function generateProductsApplicationRpt(){
            echo "Application Details";


    }
    public function generateClinicalTrialApplicationRpt(){
            echo "Application Details";

    }
    
    public function generateProductRejectionLetter(){
        echo 'Letter of rejection';

    }
    public function generateRetentionInvoicesStatements(){
        echo 'Retetnion Statements';

    }
    public function generateRetentionPaymentsStatements(){
        echo 'Retetnion Statements';

    }
    function getOrganisationInfo(){
        $data = array('org_name'=>strtoupper('Tanzania Medicines and Medical Devices Authority'), 
                            'postal_address'=>'P.O. Box 1253,',
                            'region_name'=>'Dodoma, Tanzania',
                            'email'=>'info@tmda.go.tz',
                            'website'=>'www.tmda.go.tz',
                            'street'=>'Abdul Jumbe Avenue,',
                            'location'=>' Block ZZ Plot No. 191.',
                            'act'=>'(Made under Section 21(1) d of Tanzania Food, Drugs and Cosmetics Act, Cap 219)',
                            'fax'=>'+255 22 2450793',
                            'telephone'=>'+255 26 2961989, 2061,990',
                            'org_acynm'=>'TMDA',
                            'logo'=>'logo.jpg',
                            
                    );
        $org_info = (object)$data;
        return $org_info;
    }
    public function onExportRegisteredproducts(Request $req){
        $title = 'Registered Products';
            $rec = json_decode(rawurldecode($req->filters));
            $qry = DB::connection('mis_db')->table('tra_product_information as t2')
            ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
            ->leftJoin('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
            ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
            ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
            ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
            ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
            ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
            ->leftJoin('par_sections as t9', 't1.registration_status_id', '=','t9.id')
            ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
            ->leftJoin('wb_trader_account as t12', 't3.local_agent_id', '=','t12.id')
            ->leftJoin('par_dosage_forms as t13', 't2.dosage_form_id', '=','t13.id')
            ->leftJoin('par_countries as t14', 't10.country_id', '=','t14.id')
            ->leftJoin('tra_product_manufacturers as t15', function ($join) {
                $join->on('t15.product_id', '=', 't2.id')
                     ->where('t15.manufacturer_role_id', '=', 1);
            })
            ->leftJoin('par_man_sites as t16', 't15.man_site_id', '=','t16.id')
            ->leftJoin('par_countries as t17', 't16.country_id', '=','t17.id')
            ->select('t3.product_id','t10.name as registrant','t12.name as localtechnical_representative','t13.name as dosage_form','t4.certificate_issue_date', 't4.expiry_date as app_expiry_Date', 't1.id as reg_product_id','t4.certificate_no','t2.id as product_id','t2.*','t2.brand_name','t14.name as registrant_country' ,'t5.name as generic_name','t9.name as section_name', 't16.name as manufacturer', 't6.name as classification_name', 't7.name as validity_status', 't1.validity_status_id','t17.name as manufacturer_country','t8.name as registration_status');
                        
            if(validateIsNumeric($req->section_id)){
                 $qry->where('t1.section_id',$req->section_id);
            } 


            $filter_string = returnproductssFilters($rec);

            if ($filter_string != '') {
                 $qry->whereRAW($filter_string);
            }
            $data = $qry->get();
            $str="<table border='1' width='70%'>";
				
            $str.= $this->get_reportexport_header($str,12,$title);
            $print_time = date('d-m-Y H:i:s');
            
            $str.="<tr align='center' style='font-weight: bold; font-type: 'Bookman Old Style'; font-size:14;'><td colspan = '8'> Print Date/Time ".$print_time."</td></tr>";
           if($data){
                $str.="<tr style='font-family: 'Bookman Old Style';'><td>No</td>";
                $str.="<td>Product Category</td>";
                $str.="<td>Certificate Number</td>";
                $str.="<td>Brand Name</td>";
                $str.="<td>Classification</td>";
                $str.="<td>Generic Name</td>";
                $str.="<td>Dosage Form</td>";
                $str.="<td>Registrant</td>";
                $str.="<td>Registrant Country</td>";
                $str.="<td>Local Technical Represenatative</td>";
                $str.="<td>Manufacturer</td>";      
                $str.="<td>Manufacturing Country</td>";   
                $str.="<td>Registration Status</td></tr>";
                $i=1;
                foreach($data as $rec){
                
                    $str.="<tr style='font-family: 'Bookman Old Style';'><td>".$i."</td>";
                    $str.="<td>".$rec->section_name."</td>";
                    $str.="<td>".$rec->certificate_no."</td>";
                    $str.="<td>".$rec->brand_name."</td>";
                    $str.="<td>".$rec->classification_name."</td>";
                    $str.="<td>".$rec->generic_name."</td>";
                    $str.="<td>".$rec->dosage_form."</td>";
                    $str.="<td>".$rec->registrant."</td>";
                    $str.="<td>".$rec->registrant_country."</td>";
                    $str.="<td>".$rec->localtechnical_representative."</td>";
                    $str.="<td>".$rec->manufacturer."</td>";        
                    $str.="<td>".$rec->manufacturer_country."</td>"; 
                    $str.="<td>".$rec->registration_status."</td></tr>";
$i++;
                }

           }
			
           $str.="</table>";

           $headers = [
                'Content-type'        => 'application/octet-stream',
                'Content-Disposition' => 'attachment; filename="Registered Products.xls"',
            ];
        
            return \Response::make($str, 200, $headers);
          

    }
    function get_reportexport_header($str,$span_no,$title){
			
			$org_info = $this->getOrganisationInfo('','');
						$logo=getcwd()  . '/assets/images/logo.jpg';
						$str ="<tr><td colspan='$span_no' align='center'><b>MINISTRY OF HEALTH AND SOCIAL WELFARE</b></td></tr>";
						$str.="<tr><td colspan='$span_no' align='center'><b>".$org_info->org_name."</b></td></tr>";
						$str.="<tr><td colspan='$span_no' align='center'><b>".$org_info->postal_address.' '.$org_info->region_name."</b></td></tr>";
						$str.="<tr><td colspan='$span_no' align='center'><b>Tel: ".$org_info->telephone.", Fax: ".$org_info->fax."</b></td></tr>";
						$str.="<tr><td colspan='$span_no' align='center'><b>Website:".$org_info->website.", Email: ".$org_info->website."</b></td></tr>";
						$str.="<tr></tr>";
						$str.="<tr><td colspan='$span_no' align='center'><b>".$title."</b></td></tr>";
						return $str;
		}
    public function generateProductApplicationReport(Request $req){
            $filters = $req->filters;

            print_r($filters);

    }
    
    
    
}
