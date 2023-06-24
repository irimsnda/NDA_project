<?php

namespace Modules\Reports\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
use PDF;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use \Mpdf\Mpdf as mPDF;

use Modules\Reports\Providers\PdfProvider;
use Modules\Reports\Providers\PdfLettersProvider;
use Modules\Reports\Traits\ReportsTrait;

class ReportsController extends Controller
{
      protected $user_id;
    protected $base_url;
    protected $sign_url;
    protected $sign_file;
use ReportsTrait;

    public function __construct()
    {
        $this->base_url = url('/');
        $this->sign_file = getPermitSignatorySignature();
        $this->sign_url = $this->base_url . Config('constants.signs_path') . $this->sign_file;

       
    }

    public function index()
    {
        return view('reports::index');
    }

public function generateApplicationInvoice(Request $request)
    {
        $invoice_id = $request->input('invoice_id');
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $module_id = $request->input('module_id');
         $sub_module_id = $request->input('sub_module_id');
         if(!validateIsNumeric($module_id)){
             $module_details = getTableData('sub_modules', array('id' => $sub_module_id));
             if($module_details){
                  $module_id = $module_details->module_id;
        
             }
         
         }

        if(!validateIsNumeric($invoice_id)){
            $invoice_record = DB::table('tra_application_invoices')->where('application_code',$application_code)->first();
            if($invoice_record){
                    $invoice_id = $invoice_record->id;
            }
         }
          $invoice_details = getInvoiceDetails($module_id, $application_id,$application_code);
         $app_description= '';
        if(isset($invoice_details)){
            $app_description = $invoice_details['module_desc'];
        }
        //check the paymetn Control Number 
        $rec = DB::table('tra_application_invoices as t1')
                    ->join('wb_trader_account as t2','t1.applicant_id', 't2.id')
                    ->leftJoin('par_countries as t3', 't2.country_id','t3.id')
                    ->leftJoin('par_regions as t4', 't2.region_id','t4.id')
                    ->leftJoin('modules as t5', 't1.module_id','t5.id')
                    ->leftJoin('sub_modules as t6', 't1.sub_module_id','t6.id')
                    ->select('t1.*','t2.identification_no','t2.name as applicant_name','t2.postal_address', 't2.email','t3.name as country_name','t4.name as region_name', 't5.name as module_name', 't6.name as sub_module')
                    ->where(array('t1.id'=>$invoice_id))->first();
        if($rec){
            $PayCntrNum = $rec->PayCntrNum;
            
                    $params = array(
                        'invoice_id' => $invoice_id,
                        'application_code'=>$application_code
                    );
                    
                $org_info = $this->getOrganisationInfo();
                $pdf = new PdfLettersProvider();
                $pdf->AddPage();
                $template_url = base_path('/');
                $pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
                                                                        // import page 1
                $tplId = $pdf->importPage(1);   
                $pdf->useTemplate($tplId,0,0);
                $pdf->setPageMark();
                            
                            
                $pdf->SetFont('times','B',9);
                $pdf->Cell(0,1,'',0,1);
                $pdf->setPrintHeader(false);
                $pdf->setPrintFooter(false);
                
                $org_rec = getSingleRecord('tra_organisation_information', array('id'=>1));
                $logo = getcwd() . '/resources/images/org-logo.jpg';
                $pdf->SetFont('times', 'B', 12);

                $this->returnInvoiceReportHeader($pdf,$org_rec,$rec, 'PROFORMA INVOICE');
            

                $pdf->Cell(0,7,'To:',0,1);
                $pdf->SetFont('times', '', 11);
                $pdf->Cell(0,7,'Customer No:'. $rec->identification_no,0,1);
                $pdf->Cell(0,7,$rec->applicant_name,0,1);
                $pdf->Cell(0,7,$rec->postal_address.', '.$rec->region_name.', '.$rec->country_name,0,1);
                $pdf->Cell(0,7,$rec->email,0,1);
                $pdf->SetFont('times', 'B', 11);
                
                $pdf->Cell(0,7,'Invoice Details for '.$rec->module_name.' ('.$rec->sub_module.') '.$app_description,0,1,'');
                $pdf->SetFont('times', 'B', 11);
               
                $pdf->SetLineWidth(0.1);
                //invoice details 
                $pdf->Cell(15,10,'QTY',1,0);
                $pdf->Cell(100,10,'IN RESPECT OF',1,0,'C');
                $pdf->Cell(40,10,'RATE',1,0,'C');
                $pdf->Cell(0,10,'AMOUNT',1,1,'C');
                $inv_rec = DB::table('tra_invoice_details as t1')
                                ->leftJoin('par_currencies as t2','t1.paying_currency_id','t2.id')
                                ->leftJoin('tra_element_costs as t3','t1.element_costs_id','t3.id')
                                ->leftJoin('par_cost_elements as t4','t3.element_id','t4.id')
                                ->leftJoin('par_fee_types as t5','t3.feetype_id','t5.id')
                                ->leftJoin('par_cost_categories as t6','t3.cost_category_id','t6.id')
                                ->select(DB::raw(" t4.name AS cost_element, t5.name AS fee_type, t6.name AS cost_category, t1.total_element_amount AS invoice_amount, t1.paying_currency_id,t2.name as currency_name"))
                                ->where(array('t1.invoice_id'=>$invoice_id))
                                ->get();
                if($inv_rec){
                    
                    
                    $i = 1;
                    $total_amount = 0;
                    $currency_name = '';
                    $paying_currency_id = '';
                    $pdf->SetFont('times', '', 11);
                    foreach($inv_rec as $inv){

                        $currency_name = $inv->currency_name;
                        $cost_item = $inv->fee_type." ".$inv->cost_category." ".$inv->cost_element;
                        $paying_currency_id = $inv->paying_currency_id;
                            $rowcount = max($pdf->getNumLines($cost_item, 92),$pdf->getNumLines($inv->invoice_amount, 40));
                        $pdf->MultiCell(15,7*$rowcount,$i,1,'',0,0);
                        $pdf->MultiCell(100,7*$rowcount,$cost_item,1,'',0,0);
                        $pdf->MultiCell(40,7*$rowcount,formatMoney($inv->invoice_amount),1,'R',0,0);
                        $pdf->MultiCell(0,7*$rowcount,formatMoney($inv->invoice_amount),1,'R',0,1);
                        $total_amount = $total_amount+$inv->invoice_amount;
                        
                        $i++;
                    }
                    
                    $pdf->MultiCell(155,10,'Sub-Total('.$currency_name.')',1,'R',0,0);
                    $pdf->MultiCell(0,10,formatMoney($total_amount),1,'R',0,1);
                        
                    $pdf->MultiCell(155,10,'Total('.$currency_name.')',1,'R',0,0);
                    $pdf->MultiCell(0,10,formatMoney($total_amount),1,'R',0,1);
                        
                }

                
                //get the Bank Details based on the paying currency
                
                $bank_rec = DB::table('tra_orgbank_accounts as t1')
                                ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                                ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                                ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                                ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                                //->where(array('t1.currency_id'=>$paying_currency_id))
                                ->get();
                    if($bank_rec){
                        $pdf->ln();
                        $pdf->SetFont('times',' ',11); 
                        $pdf->MultiCell(0,7,'Total Due in words **'.ucwords(convert_number_to_words($total_amount)).'('.$currency_name.')'.' Only **',0,'',0,1); 
                        $pdf->SetFont('times','i',11); 
                        $pdf->MultiCell(0,7,'The amount above is now due:',0,'',0,1);  
                        $pdf->SetFont('times', 'B', 11);
                        $i = 1;
                    foreach($bank_rec as $bank){

                    $pdf->MultiCell(130,7,$i.'.'.$bank->currency_name." "."A/C No.".$bank->account_no. '-'.$bank->account_name,0,'',0,1);   
                       $i++;        
                    }
                }  
                //$pdf->ln();
                $pdf->SetFont('times', '', 11);
                $pdf->MultiCell(0,7,'Payments to National Drug Authority (NDA) must be net invoice figures',0,'',0,1); 
                $pdf->MultiCell(0,7,'All Bank Charges shall be met by the payee',0,'',0,1);   

                $pdf->SetFont('','',11);
                $print_date = date('F d\\, Y',strtotime(Carbon::now()));  
                           
                $pdf->ln();
                                        
                $startY = $pdf->GetY();
                $startX = $pdf->GetX();
                $pdf->SetFont('times', 'B', 12);
                $pdf->Cell(0,8,'System Generated Report',0,1,'C');    
                $pdf->SetFont('','',11);                                  
                $pdf->Cell(0,8,'Printed On: '.$print_date,0,1,'C');  
                                                
                // $signiture = getcwd() . '/backend/resources/templates/signatures_uploads/VK3SE1678341493.png';
                // $pdf->Image($signiture,$startX+85,$startY-7,30,12);
                // $pdf->SetFont('','',11);
                // $pdf->Cell(0,8,'Signature ............................................',0,1,'C'); 
                                                    
                // $pdf->Cell(0,8,'Printed On: '.$print_date,0,1,'C');                  
                                
                $pdf->Output('Proforma Invoice.pdf');
                
                
                
        }
        else{
            echo "<h4>Invoice details Not Found</h4>";
        }
       
    }

function returnInvoiceReportHeader($pdf,$org_rec,$rec,$title){
               $pdf->Cell(0,25,'',0,1);
              
               $pdf->SetFont('times', 'B', 9);
                // Left column content
                $pdf->MultiCell(80, 10, "$org_rec->postal_address,\n$org_rec->physical_address,\n$org_rec->region_name , $org_rec->republic\nPhone No: $org_rec->telephone_nos\nHome Page: $org_rec->website\nTIN No: $org_rec->tin_no", 0, 'L', false, 0, '', '', true);
 
                // Center column content
                $pdf->SetX(90);
                 $pdf->SetFont('times', 'B', 12);
                $pdf->MultiCell(60, 10, "\n\n\n".strtoupper($title), 0, 'L', false, 0, '', '', true);

                // Right column content
                $pdf->SetX(150);
                $pdf->SetFont('times', 'B', 9);
                $date_of_invoicing = date('F d\\, Y',strtotime($rec->date_of_invoicing));
                $invoice_no='Invoice No: '.$rec->invoice_no;
                $ref_no='Ref No: '.$rec->tracking_no.' '.$rec->reference_no;
                $invoice_date='Invoice Date: '.$date_of_invoicing;
                $pdf->MultiCell(60, 10,"\n\n\n$invoice_no\n$ref_no\n$invoice_date", 0, 'L', false, 1, '', '', true);

               $pdf->SetFont('times', 'B', 13);
               if(isset($rec->invoice_no)){
                       $data = '{"invoice_no":'.$rec->invoice_no.',"module_id":'.$rec->module_id.',"application_code":'.$rec->application_code.'}';
               }
               else{
                       $data = '{"receipt_no":'.$rec->receipt_no.',"module_id":'.$rec->module_id.',"application_code":'.$rec->application_code.'}';
                   
               }
        

                $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
                                                                                            
                $pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
                $pdf->SetFont('times', 'B', 11);
        
    }

    public function generateApplicationReceipt(Request $request)
    {
         $table_name = $request->input('table_name');
        $application_code = $request->input('application_code');
        $payment_id = $request->input('payment_id');
        $application_id = $request->input('application_id');
        $module_id = $request->input('module_id');
        if(validateIsNumeric($module_id)){
            $module_details = getTableData('modules', array('id' => $module_id));
            $table_name = $module_details->table_name;
        }
        
        if(validateIsNumeric($application_code)){
            $reference_no = getSingleRecordColValue($table_name, array('application_code' => $application_code), 'reference_no');
           // $payment_id = getSingleRecordColValue('tra_payments', array('application_code' => $application_code), 'id');
        }
        else{
            
            $reference_no = getSingleRecordColValue($table_name, array('id' => $application_id), 'reference_no');
            
        }
        $payment_receivedby = '';
        
        //check the paymetn Control Number 
        $rec = DB::table('tra_payments as t1')
                    ->join('wb_trader_account as t2','t1.applicant_id', 't2.id')
                    ->leftJoin('par_countries as t3', 't2.country_id','t3.id')
                    ->leftJoin('par_regions as t4', 't2.region_id','t4.id')
                    ->leftJoin('modules as t5', 't1.module_id','t5.id')
                    ->leftJoin('sub_modules as t6', 't1.sub_module_id','t6.id')
                    ->leftJoin('par_currencies as t7', 't1.currency_id','t7.id')
                    ->leftJoin('par_payment_modes as t8', 't1.payment_mode_id','t8.id')
                    ->leftJoin('users as t9', 't1.usr_id','t9.id')
                    ->select('t1.*','t2.name as applicant_name','t8.name as payment_mode', 't7.name as currency_name', 't2.postal_address', 't2.email','t3.name as country_name','t4.name as region_name', 't5.name as module_name', 't6.name as sub_module', DB::raw(" CONCAT_WS(' ',decrypt(t9.first_name),decrypt(t9.last_name)) as payment_receivedby"))
                    ->where(array('t1.id'=>$payment_id))->first();
        if($rec){
            $payment_type_id = $rec->payment_type_id;
            $payment_receivedby = $rec->payment_receivedby;
            if($payment_type_id == 3){
                $this->funcGenerateCreditNote($payment_id);
                
            }
            else{
                $pdf = new PdfLettersProvider();
                $pdf->AddPage('');
                $template_url = base_path('/');
                $pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
                                                                        // import page 1
                $tplId = $pdf->importPage(1);   
                $pdf->useTemplate($tplId,0,0);
                $pdf->setPageMark();
                            
                $pdf->setPrintHeader(false);
                $pdf->setPrintFooter(false);
                $org_rec = getSingleRecord('tra_organisation_information', array('id'=>1));
                $logo = getcwd() . '/resources/images/zamra-logo.png';
                $org_rec = getSingleRecord('tra_organisation_information', array('id'=>1));
                $logo = getcwd() . '/resources/images/zamra-logo.png';
                $pdf->SetFont('times', 'B', 12);
                $this->returnReportHeader($pdf,$org_rec,$rec,'RECEIPT');
                
                
                
                $pdf->SetFont('times','B',11);
                $pdf->Cell(70,7,strtoupper('Account Payee(From)'),0,0); 
                $pdf->Cell(0,7,strtoupper('Receipt Details'),0,1,'R');
                $pdf->SetFont('times', '', 11);
                $pdf->Cell(70,7,strtoupper($rec->applicant_name),0,0);
                $pdf->Cell(0,7,strtoupper('Payment Date:'.$rec->trans_date),0,1, 'R');
                $pdf->Cell(70,7,strtoupper($rec->postal_address.', '.$rec->region_name.', '.$rec->country_name),0,0);
                $pdf->Cell(0,7,strtoupper('Receipt Number: '.$rec->receipt_no),0,1,'R');
                $pdf->Cell(70,7,strtoupper($rec->email),0,0);
                $pdf->Cell(0,7,strtoupper('Payment Mode: '.$rec->payment_mode),0,1, 'R');
                
                $pdf->SetFont('times', 'b', 11);
                
                $pdf->Cell(0,7,strtoupper('Ref No:'. $rec->tracking_no .' '.$rec->reference_no),0,1, 'R');
                
                $pdf->ln();
                
                $pdf->SetFont('times', 'b', 11);
                
                $pdf->SetFont('times','',11);
                
                        $pdf->SetFont('times','B',11);
                $pdf->Cell(0,7,'Receipt/Payments Details for '.$rec->module_name.' ('.$rec->sub_module.')',0,1,'');
            
                //invoice details 
                $pdf->SetLineWidth(0.1);
                $pdf->SetFont('times','B',11);
                $pdf->Cell(15,10,'Sn',1,0);
                $pdf->Cell(140,10,'Being Payment for: ',1,0,'C');
                $pdf->Cell(0,10,'Total',1,1,'C');
                $inv_rec = DB::table('payments_references as t1')
                                ->leftJoin('par_currencies as t2','t1.currency_id','t2.id')
                                ->leftJoin('tra_element_costs as t3','t1.element_costs_id','t3.id')
                                ->leftJoin('par_cost_elements as t4','t3.element_id','t4.id')
                                ->leftJoin('par_fee_types as t5','t3.feetype_id','t5.id')
                                ->leftJoin('par_cost_categories as t6','t3.cost_category_id','t6.id')
                                ->select(DB::raw(" t4.name AS cost_element, t5.name AS fee_type, t6.name AS cost_category, t1.amount_paid, t1.currency_id,t2.name as currency_name"))
                                ->where(array('t1.receipt_id'=>$payment_id))
                                ->get();
                                
                if($inv_rec){
                    $i = 1;
                    $total_amount = 0;
                    $currency_name = '';
                    $currency_id = '';$pdf->SetLineWidth(0.1);
                    foreach($inv_rec as $inv){
                        $currency_name = $inv->currency_name;
                        $cost_item = $inv->fee_type." ".$inv->cost_category." ".$inv->cost_element;
                        $pdf->SetFont('times','',11);
                            $rowcount = max($pdf->getNumLines($cost_item, 92),$pdf->getNumLines($inv->amount_paid, 40));
                        $pdf->MultiCell(15,7*$rowcount,$i,1,'',0,0);
                        $pdf->MultiCell(140,7*$rowcount,$cost_item,1,'',0,0);
                        $pdf->MultiCell(0,7*$rowcount,formatMoney($inv->amount_paid),1,'R',0,1);
                        $total_amount = $total_amount+$inv->amount_paid;
                        
                        $i++;
                    }
                    $pdf->SetFont('times','B',11);
                    $pdf->MultiCell(155,10,'Sub-Total('.$currency_name.')',1,'R',0,0);
                    $pdf->MultiCell(0,10,formatMoney($total_amount),1,'R',0,1);
                        
                    $pdf->MultiCell(155,10,'Received with thanks Total Amount('.$currency_name.')',1,'R',0,0);
                    $pdf->MultiCell(0,10,formatMoney($total_amount),1,'R',0,1);
                        
                }
                $pdf->SetFont('times','i',11);
                $pdf->MultiCell(0,7,'Amount in words '.ucwords(convert_number_to_words($rec->amount_paid)).'('.$currency_name.')'.' Only',1,'',0,1);
                $pdf->MultiCell(100,7,'Received By: Uganda Drugs  Authority',1,'',0,0);
                $pdf->MultiCell(0,7,'Print Date: '.Carbon::now(),1,'',0,1);
                    
                $pdf->Output('Receipt'); 
                
            
            }
            
        }
        else{
            echo "<h4>Receipt details Not Found</h4>";
        }
       
    }

    public function printSampleSubmissionReport(Request $request)
    {

        $table_name = $request->input('table_name');
        $application_code = $request->input('application_code');
        
        $params = array(
            'application_code' => $application_code,
             'base_url' => $this->base_url,
            'base_Url' => $this->base_url
        );
        
       $report = generateJasperReport('sampleReport', 'sampleSubmissionAck_' . time(), 'pdf', $params);
       
        return $report;
    }

    
  
    public function getPremisesOtherDetails($premise_id,$section_id){
        $textBusiness ='';
        $business_type ='';
        $business_type_details ='';
        $rec = DB::table('tra_premises_otherdetails as t1')
                    ->leftJoin('par_business_types as t2','t1.business_type_id','t2.id')
                    ->leftJoin('par_business_type_details as t3','t1.business_type_detail_id','t3.id')
                    ->select(DB::raw("GROUP_CONCAT(CONCAT(t3.name)) as business_type_details, t2.name as business_type"))
                    ->where('t1.premise_id',$premise_id)
                    ->first();
            if($rec){
                $business_type = $rec->business_type;
                $business_type_details = $rec->business_type_details;
                            
            }
        if($section_id == 2){
                            $business_type = $rec->business_type;
                            $business_type_details = $rec->business_type_details;
                            
                             if(strpos(strtolower($business_type),'wholesale') !== false && strpos(strtolower($business_type),'importation') !== false){
                                    //$business_type = "a ".ucwords(strtolower($business_type))." for Importation and";
                                    $business_type = "a ".ucwords(strtolower("wholesale"))." for Importation and";
                                    $business_type_details = "Selling of ".ucwords(strtolower($business_type_details));
                                    $textBusiness = "</b> region, have been registered to be used as <b>".$business_type."</b> <b>".$business_type_details;
                                    //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                }else if(strpos(strtolower($business_type),'wholesale') !== false  && strpos(strtolower($business_type),'importation') == false){
                                    $business_type = "a ".ucwords(strtolower($business_type));
                                    $business_type_details = "of ".ucwords(strtolower($business_type_details));
                                    $textBusiness = "</b> region, have been registered to be used as <b>".$business_type."</b> <b>".$business_type_details;
                                    //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                }       
                                
                                
                                //comment
                                else if(strpos($business_type,'Warehouse') !== false){
                                    $business_type = "a ".ucwords(strtolower($business_type));
                                        if(strpos($business_type_details,'Raw') !== false){
                                            
                                            $business_type_details = "Storing ".ucwords(strtolower($business_type_details));
                                            
                                        }
                                        else{
                                            $business_type_details = "Storing Registered ".ucwords(strtolower($business_type_details));
                                        }
                                        
                                        $textBusiness = "</b> region, have been registered to be used as <b>".$business_type."</b> for <b>".$business_type_details;
                                        //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                }
                                else if(strpos(strtolower($business_type),'manufactur') !== false){
                                    
                                        $business_type = "to manufacture for sell <b>Registered ".ucwords(strtolower($business_type_details))."</b>";
                                        $textBusiness = "</b> region, have been registered ".$business_type;
                                        //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                        
                                }
                                else if(strpos(strtolower($business_type),'retail') !== false){

                                    $business_type_details = "</b> to operate <b>a business of retail Pharmacy for sale of ".ucwords(strtolower($business_type_details));
                                    $textBusiness = "</b> region, have been registered <b>".$business_type_details;
                                    //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                    
                                }else if(strpos(strtolower($business_type),'dldm') !== false){
                                    $business_type = "a ".ucwords(strtolower($business_type))." for Importation and";
                                    $business_type_details = "an Accredited Drug Dispensing Outlet for retail sale of ".ucwords(strtolower($business_type_details));
                                    $textBusiness = "</b> region, have been registered <b>".$business_type_details;
                                    //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                    
                                }
                                else if(strpos(strtolower($business_type),'distributor') !== false OR strpos(strtolower($business_type_details),'carrier') !== false){
                                    $premise_name = $applicantName ;
                                    
                                    
                                    if(strpos(strtolower($business_type_details),'carrier') !== false){

                                        $business_type = $business_type_details;
                                        $textBusiness = "</b> region, have been registered to be used as <b>".$business_type." ";
                                        //$textBusiness.= "</b> with registration number <b>$premise_reg_no</b>.";
                                    }
                                    else {
                                        $business_type = "a ".$business_type." for Importation and";
                                        $business_type .= "Selling ".$business_type_details;
                                        $textBusiness = "</b> region, have been registered to be used as <b>".$business_type." ";
                                    //  $textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                    }
                                
                                }
                                else{
                                    
                                    $business_type = "a ".ucwords(strtolower($business_type))." for Importation and";
                                    $business_type_details = "Selling ".ucwords(strtolower($business_type_details));
                                    $textBusiness = "</b> region, have been registered to be used as <b>".$business_type." ".$business_type_details;
                                    //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                
                                }
                                
                            }
                        
                            else if($section_id == 4){
                                if(strpos(strtolower($business_type),'warehouse') !== false){
                                    
                                        $business_type = "a ".ucwords(strtolower($business_type));
                                        $business_type_details = "Storing Registered ".ucwords(strtolower($business_type_details));
                                        $textBusiness = "</b> region, have been registered to be used as <b>".$business_type."</b> for <b>".$business_type_details;
                                        //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                }
                                else if(strpos(strtolower($business_type),'manufactur') !== false){
                                    
                                        $business_type = "to manufacture for sell <b> ".ucwords(strtolower($business_type_details))."</b>";
                                        $textBusiness = "</b> region, have been registered ".$business_type;
                                    //  $textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                        
                                }
                                else if(strpos(strtolower($business_type),'wholesale') !== false && strpos(strtolower($business_type),'importation') !== false){
                                    //$business_type = "a ".ucwords(strtolower($business_type))." for Importation and";
                                    $business_type = "a ".ucwords(strtolower("wholesale"))." for Importation and";
                                    $business_type_details = "Selling of ".ucwords(strtolower($business_type_details));
                                    $textBusiness = "</b> region, have been registered to be used as <b>".$business_type."</b> <b>".$business_type_details;
                                    //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                }else if(strpos(strtolower($business_type),'wholesale') !== false  && strpos(strtolower($business_type),'importation') == false){
                                    $business_type = "a ".ucwords(strtolower($business_type));
                                    $business_type_details = "of ".ucwords(strtolower($business_type_details));
                                    $textBusiness = "</b> region, have been registered to be used as <b>".$business_type."</b> <b>".$business_type_details;
                                    //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                }
                                else if(strpos(strtolower($business_type),'distributor') !== false OR strpos(strtolower($business_type_details),'carrier') !== false){
                                    $premise_name = $applicantName ;
                                    
                                    
                                    if(strpos(strtolower($business_type_details),'carrier') !== false){

                                        $business_type = $business_type_details;
                                        $textBusiness = "</b> region, have been registered to be used as <b>".$business_type." ";
                                        //$textBusiness.= "</b> with registration number <b>$premise_reg_no</b>.";
                                    }
                                    else {
                                        $business_type = "a ".$business_type." for Importation and";
                                        $business_type .= "Selling ".$business_type_details;
                                        $textBusiness = "</b> region, have been registered to be used as <b>".$business_type." ";
                                        //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                    }
                                
                                }
                                else if(strpos(strtolower($business_type),'retail') !== false){
                                    $textBusiness = "</b> to operate <b>a premises for dealing in ".ucwords(strtolower($business_type))." Selling of Registered ".ucwords(strtolower($business_type_details))."";
                                }
                                else{
                                    
                                    $business_type = "a ".ucwords(strtolower($business_type))." for Importation and";
                                    $business_type_details = "Selling Registered ".ucwords(strtolower($business_type_details));
                                    
                                    
                                    $textBusiness = "</b> region, have been registered to be used as <b>".$business_type."</b> <b>".ucwords(strtolower($business_type_details));
                                    //$textBusiness.= "</b> in premises with registration number <b>$premise_reg_no</b>.";
                                }
                                
                            }
                            
        return $textBusiness;

    }

       public function generatePremisePermit(Request $request)
    {
        $application_code = $request->input('application_code');
        if(validateIsNumeric($application_code)){
            //get the section id 
            $rec = DB::table('tra_premises_applications as t1')
            ->select('t1.*')
            ->where(array('t1.application_code'=>$application_code))
            ->first();
            $premise_id = $rec->premise_id;
            $section_id = $rec->section_id;
        }
        
         $approvalGrant = DB::table('tra_approval_recommendations')->where('application_code',$application_code)->first();
        if(!empty($approvalGrant) && $approvalGrant->decision_id == 1){
        /*   $textBusiness = $this->getPremisesOtherDetails($premise_id,$section_id);
            $params = array(
                'application_code' => $application_code,
                'textBusiness' => $textBusiness,
                'premise_id' => $premise_id,
                'document_type' => 'permit',
                'base_Url' => $this->base_url,
                'sign_Url' => $this->sign_url
            );
            $report = generateJasperReport('premisePermitReport', 'permit_' . time(), 'pdf', $params);
                return $report;
                */
            
            PDF::setPrintHeader(false);
            PDF::setPrintFooter(false);
            PDF::AddPage();
            PDF::SetFont('times','',13);
            PDF::Cell(0,10,'',0,1);
            PDF::SetMargins(20,10,20, true);
            PDF::SetFont('times','B',13);
            
            $usr_id = '';
        
            $logo=getcwd().'/assets/images/logo.jpg';
        
            PDF::setPrintHeader(false);
            
            
            PDF::SetFont('times','B',12);
            
            $record = DB::table('tra_premises_applications as t1')
                                    ->join('tra_premises as t2', 't1.premise_id','t2.id')
                                    ->join('par_countries as t3', 't2.country_id', 't3.id')
                                    ->leftJoin('par_regions as t4', 't2.region_id','t4.id')
                                    ->leftJoin('par_districts as t5', 't2.district_id', 't5.id')
                                    ->join('wb_trader_account as t6', 't1.applicant_id', 't6.id')
                                    ->join('par_countries as t7', 't6.country_id', 't7.id')
                                    ->leftJoin('par_regions as t8', 't6.region_id','t8.id')
                                    ->leftJoin('par_districts as t9', 't6.district_id', 't9.id')
                                    ->join('tra_approval_recommendations as t10','t1.application_code','t10.application_code')
                                    ->select(DB::raw("t1.reference_no, t1.premise_id,  t2.postal_address as premise_poastal_address,t2.physical_address as premise_physical_address, t4.name as premise_region_name,t5.name as premise_district_name,t7.name as premise_country, t10.expiry_date,t10.approval_date as permit_issue_date,t10.permit_no,t2.premise_reg_no,t2.name as premise_name,t6.name as applicant_name,t6.physical_address,t6.postal_address,t6.telephone_no as telephone,t6.email,t9.name as districtName,t8.name as regionName,t7.name as countryName"))
                                    ->where(array('t1.application_code'=>$application_code))
                                    ->first();

            $costs=array();
            $tot_inv=0;
                if($record){
                    $row=$record;
                        
                        $ref = $row->reference_no;
                        
                        $permit_issue_date = $row->permit_issue_date;
                        $expiry_date = $row->expiry_date;
                        $permit_no= $row->permit_no;
                        $premise_reg_no = $row->premise_reg_no;
                        $applicantName=$row->applicant_name;
                        $physical_address=$row->physical_address;
                        $postal_address=$row->postal_address;
                        $telephone=$row->telephone;
                        $email=$row->email;
                        $districtName=$row->districtName;
                        $regionName=$row->regionName;
                        $countryName=$row->countryName;
                        $premise_id=$row->premise_id;
                        
                        //premise details
                        $premise_name = $row->premise_name;
                        $premise_poastal_address = $row->premise_poastal_address;
                        $premise_physical_address = $row->premise_physical_address;
                        $premise_region_name = $row->premise_region_name;
                        $premise_country = $row->premise_country;
                        $premise_district_name = $row->premise_district_name;
                        
                        $permit_issue_date = $row->permit_issue_date;
                        
                        $org_info = $this->getOrganisationInfo();
            
                        $logo = getcwd() . '/resources/images/org-logo.jpg';
                        $permit_no= $row->permit_no;
                        $premise_reg_no = $row->premise_reg_no;
                        //onother category 
                        //$business_category_name = $row->business_category_name;
                        $locationDesc = '';
                        $data = "Premises Registration: Permit No:".$permit_no."; Premises Name:".$premise_name.";Issued Date:".$permit_issue_date;
                        $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
                        // QRCODE,H : QR-CODE Best error correction
                        PDF::write2DBarcode($data, 'QRCODE,H', 178, 37, 16, 16);
                        
                        PDF::SetFont('times','',13);
                        PDF::Cell(78);
                        PDF::SetMargins(14,10,14, true);
                        PDF::SetFont('times','B',13);
                        if($section_id ==2){
                            PDF::SetFont('times','I',10);
                                
                            PDF::Cell(0,4,$org_info->org_acynm.'/DMC/MCIE/P/002',0,1,'R');
                        }elseif($section_id ==3){
                            PDF::SetFont('times','I',10);
                                
                            PDF::Cell(0,4,$org_info->org_acynm.'/DMC/MDC/P/007',0,1,'R');
                        }else{
                            PDF::SetFont('times','I',10);
                                
                            PDF::Cell(0,4,$org_info->org_acynm.'/DMC/MDC/P/002',0,1,'R');
                        }
                        PDF::SetFont('times','B',12);
                        PDF::Cell(0,5,$org_info->org_name,0,2,'C');
                        PDF::Image($logo,86,32,39,16);
                        PDF::SetLineWidth(0.9);
                        PDF::Rect(11,11,186,270);
                        
                        PDF::SetLineWidth(0.4);
                        PDF::Rect(12,12,184,268);
                        //company_type
                        $business_type = '';
                            $business_type_details = '';
                            $i= 1;
                            $bus_records = DB::table('tra_premises_otherdetails as t1')
                            ->join('par_business_types as t2', 't1.business_type_id', '=', 't2.id')
                            ->join('par_business_type_details as t3', 't1.business_type_detail_id', '=', 't3.id')
                            ->select('t1.*', 't2.name as business_type', 't3.name as business_type_detail')
                            ->where('t1.premise_id', $premise_id)
                            ->get();
                            $l = 1;
                            if($bus_records){
                                foreach($bus_records as $rows){
                                            if($i == $l){
                                                $business_type = $rows->business_type;
                                                $business_type_details.= $rows->business_type_detail;
                                            }
                                            else{
                                                if($l == 2){
                                                    $business_type = $rows->business_type;
                                                    $business_type_details.= ucwords(strtoupper($rows->business_type_detail)).' and ';
                                                }
                                                else{
                                                    $business_type = $rows->business_type;
                                                    $business_type_details.= ucwords(strtoupper($rows->business_type_detail)).', ';
                                                }
                                                
                                            
                                            }
                                            
                                            $i++;
                                }
                            
                        }
                        if($locationDesc == '' || $locationDesc == null){
                                //  $locationDesc = 'Municipality';
                        }
                        $company_type = '';
                                
                       
                        if($section_id == 2){
                            PDF::Cell(0,20,'',0,1);
                                PDF::SetFont('times','B',11);
                                PDF::Cell(0,5,'BUSINESS PERMIT',0,1,'C');
                                PDF::Cell(77);
                                PDF::SetFont('times','BI',9);
                                PDF::Cell(0,4,'',0,1);
                                PDF::Cell(0,4,'Made under Section 21(1) & (2)b of the  UGANDA DRUGS  AUTHORITY Act, Cap 219',0,1,'C');
                                PDF::Cell(0,6,'',0,1);
                                PDF::SetFont('times','BI',11);
                                PDF::Cell(0,10,'Permit No.'.$permit_no,0,1,'C');
                                PDF::SetFont('','',11);
                                PDF::Cell(0,5,'',0,1);
                                    
                                if(strpos($premise_poastal_address,'Box') !== false){
                                    $premise_poastal_address = "</b><b> ".$premise_poastal_address." ";
                                }
                                else{
                                    $premise_poastal_address = "</b> of P.O. Box <b>".$premise_poastal_address." ";
                                }
                                if(strpos(strtolower($business_type),'wholesale') !== false  && strpos(strtolower($business_type),'importation') !== false){

                                    $textBusiness = "</b> to operate <b>a premises for dealing in ".ucwords(strtolower($business_type))." of ".ucwords(strtolower($business_type_details));
                                
                                }elseif(strpos(strtolower($business_type),'wholesale') !== false  && strpos(strtolower($business_type),'importation') == false){

                                    $textBusiness = "</b> to operate <b>a premises for dealing in ".ucwords(strtolower($business_type))." of ".ucwords(strtolower($business_type_details));
                                
                                }
                                else if(strpos(strtolower($business_type),'manufactur') !== false){
                                        $textBusiness = "</b> to manufacture for sell<b> Registered ".ucwords(strtolower($business_type_details));
                                
                                }
                                else if(strpos(strtolower($business_type),'warehouse') !== false){
                                    if(strpos($business_type_details,'Raw') !== false){
                                            
                                        $textBusiness = "</b> to operate <b>a premises for storing  ".ucwords(strtolower($business_type_details));
                                
                                    }
                                    else{
                                    $textBusiness = "</b> to operate <b>a premises for storing Registered ".ucwords(strtolower($business_type_details));
                                    
                                    }
                                    
                                }
                                else if(strpos(strtolower($business_type),'retail') !== false){
                                    
                                    $textBusiness = "</b> to operate <b>a business of retail Pharmacy for sale of ".ucwords(strtolower($business_type_details));    
                                    
                                }
                                else if(strpos(strtolower($business_type),'dldm') !== false){
                                    
                                    $textBusiness = "</b> to operate <b>a business of Accredited Drug Dispensing Outlet for retail sale of ".ucwords(strtolower($business_type_details));   
                                    
                                }
                                else if(strpos(strtolower($business_type),'distributor') !== false OR strpos(strtolower($business_type_details),'carrier') !== false){
                                    $premise_name = $applicantName ;
                                        
                                    if(strpos(strtolower($business_type_details),'carrier') !== false){
                                            $textBusiness = "</b> to operate <b>a ".$business_type_details;
                                        }
                                        else{
                                            $textBusiness = "</b> to operate <b>a premises for dealing in ".ucwords(strtolower($business_type))." relating to importation and selling ".$business_type_details;
                                    }
                                }
                                else{
                                
                                    $textBusiness = "</b> to operate <b>a premises for dealing in ".ucwords(strtolower($business_type))." relating to importation of ".ucwords(strtolower($business_type_details));
                                
                                }
                                
                                PDF::setCellHeightRatio(1.5);
                                
                                if(strpos(strtolower($business_type),'manufactur') !== false){
                                    PDF::WriteHTML("Permit is hereby granted to M/S <b>".strtoupper($premise_name).$premise_poastal_address.' '.ucwords(strtolower($premise_region_name)).$textBusiness."</b> at the premises situated at <b>".strtoupper($premise_physical_address)."</b> in <b>".ucwords(strtolower($premise_district_name))."</b> ". $locationDesc." in <b>".ucwords(strtolower($premise_region_name))."</b> Region with registration No. <b>".$premise_reg_no."</b>.", false, 0, false, false);
                                }
                                else{
                                    PDF::WriteHTML("Permit is hereby granted to M/S <b>".strtoupper($premise_name).$premise_poastal_address.' '.ucwords(strtolower($premise_region_name)).$textBusiness."</b> with registration No. <b>".$premise_reg_no."</b> situated at <b>".strtoupper($premise_physical_address)."</b> in <b>".ucwords(strtolower($premise_district_name))."</b> ". $locationDesc." in <b>".ucwords(strtolower($premise_region_name))."</b>.", false, 0, false, false);
                                
                                }
                                
                                 PDF::Cell(0,5,'',0,1);
                                ///temporary 
                                
                                $expiry_date = date('F d\\, Y',strtotime($expiry_date));
                                PDF::Cell(0,5,'',0,1);
                                PDF::setCellHeightRatio(1.5);
                                //PDF::MultiCell(0,8,"This Permit shall have and continue to effect from and including the day when it is issued until it ceases to have effect on ".$expiry_date,0,'',0,1);
                                PDF::WriteHTML("This Business Permit is valid until<b> ".$expiry_date, true, 0, true, true);
                                PDF::Cell(20,5,'',0,1);
                                PDF::Cell(30,5,'Issued on',0,0);
                                $permit_issue_date = date('F d\\, Y',strtotime($permit_issue_date));
                                PDF::Cell(20,5,$permit_issue_date,0,1);
                                //payments made 
                                PDF::Cell(20,5,'',0,1);
                                
                                
                                $payment_record = DB::table('tra_payments as t1')
                                ->join('par_currencies as t2','t1.currency_id', 't2.id')
                                ->select(DB::raw("receipt_no,amount_paid,trans_date,t2.name as currency_name"))
                                ->where('application_code',$application_code)
                                ->get();
                                
                                if($payment_record){
                                    PDF::Cell(20,5,'',0,1);
                                    foreach($payment_record as $row){
                                                $receipt_no = $row->receipt_no;
                                                $trans_date = $row->trans_date;
                                                $amount = $row->amount_paid;
                                                $currency_name = $row->currency_name;
                                                
                                            $trans_date = date('F d\\, Y',strtotime($trans_date));
                                            PDF::Cell(20,5,"Receipt No: ".$receipt_no.' of '.$trans_date,0,0);
                                            PDF::Cell(20,5,'',0,0);
                                            PDF::Cell(0,5,'Fees Paid: '.formatMoney($amount).' '.ucwords($currency_name),0,1,'R');
                                            PDF::Cell(20,2,'',0,1);
                                        
                                        }
                                }
                                
                                PDF::Cell(0,8,'',0,1);
                                
                                
                                
                        }
                            else if($section_id == 4){
                                
                                PDF::Cell(0,20,'',0,1);
                                PDF::SetFont('times','B',11);
                                PDF::Cell(0,5,'BUSINESS PERMIT',0,1,'C');
                                PDF::Cell(77);
                                PDF::SetFont('times','BI',9);
                                PDF::Cell(0,4,'',0,1);
                                PDF::Cell(0,4,'Made under Section 21(3) of the  UGANDA DRUGS  AUTHORITY Act, Cap 219',0,1,'C');
                                PDF::Cell(0,6,'',0,1);
                                PDF::SetFont('times','BI',11);
                                PDF::Cell(0,10,'Permit No.'.$permit_no,0,1,'C');
                                PDF::SetFont('','',11);
                                PDF::Cell(0,5,'',0,1);
                                if($company_type == ''){
                                
                                        $company_type = '';
                                }
                                if(strpos($premise_poastal_address,'Box') !== false){
                                    $premise_poastal_address  = "</b><b> of ".$premise_poastal_address.' ';
                                }
                                else{
                                    $premise_poastal_address = "</b> of P.O. Box <b>".$premise_poastal_address;
                                }
                                
                                if(strpos($business_type,'Wholesale') !== false && strpos($business_type,'importation') !== false){
                                    $textBusiness = "</b> to operate a <b>".$business_type." of ".$business_type_details;
                                
                                }elseif(strpos($business_type,'Wholesale') !== false && strpos($business_type,'importation') == false){
                                    $textBusiness = "</b> to operate <b>a premises for dealing in ".ucwords($business_type)." of ".ucwords($business_type_details);
                                
                                }
                                else if(strpos(strtolower($business_type),'manufactu') !== false){
                                        $textBusiness = "</b> to manufacture for sell<b> Registered ".ucwords(strtolower($business_type_details));
                                
                                }
                                else if(strpos(strtolower($business_type),'warehouse') !== false){
                                    $textBusiness = "</b> to operate <b>a premises for storing ".ucwords(strtolower($business_type_details));
                                
                                }
                                else if(strpos(strtolower($business_type),'retail') !== false){
                                    $textBusiness = "</b> to operate <b>a premises for dealing in ".ucwords(strtolower($business_type))." Selling of Registered ".ucwords(strtolower($business_type_details))."";
                                }
                                else{
                                
                                    $textBusiness = "</b> to operate <b>a premises for dealing in ".ucwords(strtolower($business_type))." relating to importation of ".ucwords(strtolower($business_type_details));
                                }
                                PDF::setCellHeightRatio(1.5);
                                if(strpos(strtolower($business_type),'manufactu') !== false){
                                        PDF::WriteHTML("Permit is hereby granted to M/S <b>".strtoupper($premise_name).$premise_poastal_address.', '.ucwords($premise_region_name).$textBusiness."</b> at the premises situated at <b>".strtoupper($premise_physical_address)."</b> in <b>".ucwords($premise_district_name)."</b> ". $locationDesc." in <b>".ucwords($premise_region_name)."</b> with registration No. <b>".$premise_reg_no."</b>.", true, 0, true, true);
                                
                                }
                                else{
                                        PDF::WriteHTML("Permit is hereby granted to M/S <b>".strtoupper($premise_name).$premise_poastal_address.', '.ucwords($premise_region_name).$textBusiness."</b> in the premises with registration No. <b>".$premise_reg_no."</b> situated at <b>".strtoupper($premise_physical_address)."</b> in <b>".ucwords($premise_district_name)."</b> ". $locationDesc." in <b>".ucwords($premise_region_name).'.', true, 0, true, true);
                                
                                }
                                
                                
                                PDF::Cell(0,5,'',0,1);
                                
                                $expiry_date = date('d<\s\u\p>S</\s\u\p\> F\\, Y',strtotime($expiry_date));;
                                
                                PDF::setCellHeightRatio(1.5);
                                PDF::WriteHTML("This Business Permit is valid until<b> ".$expiry_date, true, 0, true, true);
                                PDF::Cell(20,5,'',0,1);
                                PDF::Cell(30,5,'Issued on',0,0);
                                $permit_issue_date = date('F d\\, Y',strtotime($permit_issue_date));
                                PDF::Cell(20,5,$permit_issue_date,0,1);
                                
                                $payment_record = DB::table('tra_payments as t1')
                                ->join('par_currencies as t2','t1.currency_id', 't2.id')
                                ->select(DB::raw("receipt_no,amount_paid,trans_date,t2.name as currency_name"))
                                ->where('application_code',$application_code)
                                ->get();
                                
                                if($payment_record){
                                    PDF::Cell(20,5,'',0,1);
                                    foreach($payment_record as $row){
                                                $receipt_no = $row->receipt_no;
                                                $trans_date = $row->trans_date;
                                                $amount = $row->amount_paid;
                                                $currency_name = $row->currency_name;
                                                
                                            $trans_date = date('F d\\, Y',strtotime($trans_date));
                                            PDF::Cell(20,5,"Receipt No: ".$receipt_no.' of '.$trans_date,0,0);
                                            PDF::Cell(20,5,'',0,0);
                                            PDF::Cell(0,5,'Fees Paid: '.formatMoney($amount).' '.ucwords($currency_name),0,1,'R');
                                            PDF::Cell(20,2,'',0,1);
                                        
                                        }
                                }
                                
                                PDF::Cell(0,8,'',0,1);
                                
                        }
                        PDF::Cell(0,15,'',0,1);
                                
                                PDF::SetFont('times','B',10);
                                
                                //check for signitory
                                $permit_signitory = '';
                                $title= '';
                                $approved_by= '';
                                $startY = PDF::GetY();
                                $startX = PDF::GetX();
                                $signiture = getcwd() . '/resources/images/signatures/hi0kag.png';
                                PDF::Image($signiture,$startX,$startY-7,30,12);
                                PDF::SetFont('times','B',11);

                                PDF::SetFont('times','B',12);
                                PDF::Cell(0,8,'...................................................',0,1,'');
                                
                                //  PDF::Cell(0,8, ucwords(strtolower('A. M. Fimbo')),0,1,'');
                                    
                                    PDF::Cell(0,8,'DIRECTOR GENERAL',0,1,'');
                                
                                PDF::Cell(0,15,'',0,1);
                                PDF::SetFont('times','B',12);
                                PDF::Cell(0,5,'CONDITIONS',0,1,'C');
                                PDF::SetFont('','',11);
                                PDF::Cell(0,5,'',0,1);
                                PDF::Cell(5,0,'1. ',0,0);
                                PDF::setCellHeightRatio(1.5);
                                PDF::WriteHTML("This Permit does not authorize the holder to operate business in unregistered premises or during the period of suspension, revocation or cancellation of registration of the premises in respect of which it was issued.", true, true, true, true,'J');
                                PDF::Cell(0,5,'',0,1);
                                PDF::Cell(5,0,'2. ',0,0);
                                PDF::setCellHeightRatio(1.5);
                                PDF::WriteHTML("This Permit is not transferable without approval of the Authority", true, true, true, true,'J');
                                
            
                
                    PDF::Output($applicantName.date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
                
            }
            else{
                        PDF::SetFont('times','',10);
                        PDF::Cell(78);
                        PDF::Cell(20,0,'Check the premises Information and premises applicant details.',0,2,'C');
                            PDF::Output(date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
                        
                        exit();
                    
                    
            }
                    
        
            
            
        }
        else{
             return "setup reject letter";
             PDF::SetFont('times','',10);
             PDF::Cell(78);
             PDF::Cell(20,0,'The Application with reference no "'.$ref.'" has not been granted/not granted by the DG',0,2,'C');
                    PDF::Output(date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
             
        }
        
    }
  public function generatePremiseCertificate(Request $request)
    {
        
        $premise_id = $request->input('premise_id');
        $application_code = $request->input('application_code');
        if(validateIsNumeric($application_code)){
            //get the section id 
            $rec = DB::table('tra_premises_applications as t1')
            ->select('t1.*')
            ->where(array('t1.application_code'=>$application_code))
            ->first();
            $premise_id = $rec->premise_id;
            $section_id = $rec->section_id;
        }
        $approvalGrant = DB::table('tra_approval_recommendations as t1')
                        ->join('tra_premises_applications as t2', 't1.application_code', 't2.application_code')
                        ->where('t2.application_code', $application_code)
                        ->first();
        $this->printPremisesCertificateLetter($request,$approvalGrant);
        
        
    }
    public function genenerateImportExportPermit(Request $request)
    {
        $document_type_id = 25;
        $document_requirement_id = 254;
        
        $application_code = $request->input('application_code');
        $permit_watermark = $request->input('permit_watermark');
        $is_permitupdate = $request->input('is_permitupdate');
        
        $approvalGrant = DB::table('tra_managerpermits_review')->where('application_code',$application_code)->first();
        if(!empty($approvalGrant) && $approvalGrant->decision_id == 1){
            $record = DB::table('tra_importexport_applications as t1')
                        ->join('sub_modules as t2','t1.sub_module_id','t2.id')
                        ->select('t2.title', 't1.sub_module_id')
                        ->where('application_code',$application_code)->first();
                        $sub_module_id = $record->sub_module_id;
            if($sub_module_id == 78){

                $this->printImportExportLicense($application_code,$record,$permit_watermark);
            }
            else{
                
                $this->printImportExportvisa($application_code,$record,$permit_watermark);
            }
            
                        
        }else if(!empty($approvalGrant) && $approvalGrant->decision_id== 2){
            echo "The Application has been rejected ".$approvalGrant->comment;
            
            
        }else{
           echo "No approval recommendation, contact the system admin";
            
        }
        
    }
    
    function funcDownloadDMSReport($document_path){
        $file = file_get_contents($document_path);
                     return response($file)
                    ->header('Cache-Control', 'no-cache private')
                    ->header('Content-Description', 'File Transfer')
                    ->header('Content-Type', 'application/pdf')
                    ->header('Content-length', strlen($file))
                    ->header('Content-Disposition', 'inline; filename=Import/Export Permit.pdf')
                    ->header('Content-Transfer-Encoding', 'binary');
    }
   public function saveAppCertificateReupdateRequests(Request $req){
            
            try{
                $module_id = $req->module_id;
                $reference_no = $req->reference_no;
                $requested_by = $req->requested_by;
                $reason = $req->reason;
               
                $table_name =  getSingleRecordColValue('modules', array('id'=>$module_id), 'table_name');
                if($module_id == 4){
                      $approvaltable_name = "tra_managerpermits_review";
                }
                else{
                         $approvaltable_name = "tra_approval_recommendations"; 
                }
                 $record = DB::table($table_name.' as t1')
                            ->join($approvaltable_name.' as t2', 't1.application_code', 't2.application_code')
                            ->select(DB::raw("t1.*, t2.decision_id"))
                            ->where(function($query) use ($reference_no) {
                                $query->where('t1.reference_no', '=', $reference_no)
                                ->orWhere('t1.tracking_no', '=',$reference_no);
                              })
                              ->first();
                if($record){
                    if($decision_id == 1 || $decision_id ==2){
                        $application_code = $record->application_code;
                        $request = new Request([
                                      'application_code'   => $application_code,
                                      'is_permitupdate'   => 1
                                  ]);
                        $this->genenerateImportExportPermit($request);
                        $table_data = array('application_code'=>$application_code,
                                      'reference_no'=>$record->reference_no,
                                      'tracking_no'=>$record->tracking_no, 
                                        'requested_by'=>$req->requested_by,
                                        'reason'=>$req->reason,
                                        'module_id'=>$req->module_id,
                                        'requested_on'=>Carbon::now(),
                                        'created_by'=>$this->user_id,
                                        'created_on'=>Carbon::now(),
                                    );
                        $res = insertRecord('tra_appcertificate_reprintrequests', $table_data, $this->user_id);
                        
                    }
                    else{
                     $res = array('success'=>false, 'message'=>'Application was rejected, kinldy contact the system admin for clarification.'); 
                        
                    }
                        
                        
                }
                else{
                    $res = array('success'=>false, 'message'=>'Application Not found, confirm the reference number for correctness or check the approval details.');
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
            return \response()->json($res);

        
    }


    
    public function generateProductRegCertificate(Request $request)
    {
        $product_id = $request->input('product_id');
        $application_code =$request->application_code;
        
        if(validateIsNumeric($application_code)){

            //get the section id 
            $rec = DB::table('tra_product_information as t1')
            ->leftJoin('par_device_types as t2', 't1.device_type_id', '=','t2.id')
            ->join('tra_product_applications as t3', 't1.id','t3.product_id')
            ->select('t1.section_id','application_code', 't2.description as device_type', 't3.product_id')
            ->where(array('t3.application_code'=>$application_code))
            ->first();
           
        }
        else{
            //get the section id 
            $rec = DB::table('tra_product_information as t1')
            ->leftJoin('par_device_types as t2', 't1.device_type_id', '=','t2.id')
            ->select('t1.section_id', 't2.description as device_type', 't1.id as product_id')
            ->where(array('t1.id'=>$product_id))
            ->first();
        }
        
        $approvalGrant = DB::table('tra_approval_recommendations as t1')
                        ->join('tra_product_applications as t2','t1.application_code','t2.application_code')
                        ->where('t1.application_code', $application_code)
                        ->select('t2.product_id','t1.decision_id','t2.sub_module_id')
                        ->first();
        
        if(!empty($approvalGrant) &&  ($approvalGrant->decision_id == 1 || $approvalGrant->decision_id == 2)  ){
             $section_id = $rec->section_id;
             $device_type = $rec->device_type;
             $product_id = $rec->product_id;
             $sub_module_id = $approvalGrant->sub_module_id;
                 
            if($section_id == 2){
                $document_number = 'BVS/099/45';
                $certificate_name = 'DRUGS CERTIFICATE';
                $report_name = 'DrugsCertificateReport';

            }
            else{
               
                $document_number = 'BVS/099/45';
                $certificate_name = 'CERTIFICATE OF '.$device_type.' REGISTRATION';
                $report_name = 'medicalDevicesCertificate';

            }
            $params = array(
                'product_id' => $product_id,
                'application_code' => $application_code,
                'document_number' => $document_number,
                'certificate_name' => $certificate_name,
                'certificate_regulation' => '(Made under Section 21(3) of the  UGANDA, Drugs and Cosmetics Act, Cap 219)',
                'base_Url' => $this->base_url,
                'sign_Url' => $this->sign_url
            );
          
            //$report = generateJasperReport($report_name, 'permit_' . time(), 'pdf', $params);
            if($sub_module_id == 17){
                echo "Issue Letter of Withdrawal";
                return;
            }
           // return $report;
           $qry = DB::table('tra_product_applications as t1')
                            ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                            ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                            ->leftJoin('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                            ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                            ->leftJoin('par_classifications as t14', 't7.classification_id', '=', 't14.id')
                            ->select('t1.*','t18.name as dosage_form', 't3.name as trader_name','t3.physical_address as trader_address','t10.name as region_name' , 't9.name as country_name','t4.name as application_status', 't6.name as dg_recommendation', 't5.decision_id as recommendation_id','t7.gmdn_term as gmdn_name','t7.gmdn_code','t15.name as storage_condition','t7.physical_description','t7.shelf_life',
                                't1.id as active_application_id','t5.permit_signatory','t7.contraindication', 't7.brand_name as brandName', 't8.name as common_names', 't14.name as classification','t5.expiry_date','t11.name as localAgentName','t11.physical_address as local_agent_address', 't5.certificate_no', 't5.approval_date', 't13.name as manufacturer','t5.certificate_issue_date', 't16.name as distribution_category',
                                DB::raw("concat(decrypt(t17.first_name),' ',decrypt(t17.last_name)) as permit_signatoryname, t19.certificate_title"))
                            
                            ->leftJoin('tra_approval_recommendations as t5', 't1.application_code', '=', 't5.application_code')
                            ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                            ->leftJoin('par_regions as t10', 't3.region_id', '=', 't8.id')
                            ->leftJoin('par_countries as t9', 't3.country_id', '=', 't9.id')
                            ->leftJoin('wb_trader_account as t11', 't1.local_agent_id', '=', 't11.id')
                            ->leftJoin('tra_product_manufacturers as t12', 't1.product_id', '=', 't12.product_id')
                            ->leftJoin('tra_manufacturers_information as t13', 't12.manufacturer_id', '=', 't13.id')
                            ->leftJoin('par_storage_conditions as t15', 't7.storage_condition_id', '=', 't15.id')
                            ->leftJoin('par_distribution_categories as t16', 't7.distribution_category_id', '=', 't16.id')
                            ->leftJoin('par_dosage_forms as t18', 't7.dosage_form_id', '=', 't18.id')
                            ->leftJoin('par_sections as t19', 't1.section_id', '=', 't19.id')
                            ->leftJoin('users as t17', 't5.permit_signatory', '=', 't17.id')
                            
                            
                            ->where(array('t1.application_code' => $application_code));




                        $record = $qry->first();
                        
            if($section_id == 1 || $section_id == 1){
                $this->medicinesProductRegistration($application_code,$record);
            }else if($section_id == 8 || $section_id == 8 || $section_id == 9){
                $this->foodProductRegistrationCertificate($application_code,$record);
            }
            else{
                $this->medicalDevicesProductRegistration($application_code,$record);
            }
        }else if(!empty($approvalGrant) &&  ($approvalGrant->decision_id == 3)  ){
            
            $module_id = $approvalGrant->module_id;
                                        $res =$this->generateLetterOfREjection($application_code,$request,$module_id);
            
        }else{
            print_r("<center>Save the Approval Recommendation and print the Approval Document</center>");
                            
        }
             
    }
    
    
     public function generateGMPCertificate(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $section_id = $request->input('section_id');
       
        if(validateIsNumeric($application_code)){

            //get the section id 
            $rec = DB::table('tra_gmp_applications as t1')
            ->select('t1.*')
            ->where(array('t1.application_code'=>$application_code))
            ->first();
            $application_id = $rec->id;
            $section_id = $rec->section_id;
        }
        $approvalGrant = DB::table('tra_approval_recommendations as t2')
                        ->where('t2.application_id',$application_id)
                        ->first();
        if(!empty($approvalGrant) && $approvalGrant->decision_id == 1){
            /* $details = $this->getGMPProductLineTableDetails($section_id);
             if($section_id == 4){
                
                $title = 'CERTIFICATE OF COMPLIANCE TO QUALITY AUDIT';
            }
            else{
                $title = 'CERTIFICATE OF COMPLIANCE TO GOOD MANUFACTURING PRACTICES (GMP)';
            }
            //PDF::Cell(0,4,'(For Medical Devices and Diagnostics Manufacturing Facilities)',0,1,'C');"repo:gmp_subReport.jrxml"
            $params = array(
                'application_id' => $application_id,
                'certificate_name' => $title,
                'document_type' => 'certificate',
                'col1_name' => $details->col1_name,
                'col2_name' => $details->col2_name,
                'col3_name' => $details->col3_name,
                'base_Url' => $this->base_url,
                'sign_Url' => $this->sign_url,
                'Authority' => ' UGANDA Medicines & Medical Devices Authority'
            );
            $report = generateJasperReport('gmpCertificateReport', 'permit_' . time(), 'pdf', $params);
                        return $report;
                        */
                    $record =  $qry = DB::table('tra_gmp_applications as t1')
                                                    ->join('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                                                    ->join('par_countries as t3', 't2.country_id','t3.id')
                                                    ->leftJoin('par_regions as t4', 't2.region_id', 't4.id')
                                                    ->leftJoin('par_districts as t5','t2.district_id', 't5.id')
                                                    ->join('wb_trader_account as t6', 't1.applicant_id','t6.id')
                                                    ->leftJoin('par_regions as t7', 't6.region_id', 't7.id')
                                                    ->leftJoin('par_districts as t8','t6.district_id', 't8.id')
                                                    ->join('tra_approval_recommendations as t9', 't1.application_code','t9.application_code' )
                                                    ->select(DB::raw("t1.section_id,t9.certificate_issue_date,t9.expiry_date,t1.manufacturing_site_id as premiseID,t2.premise_reg_no,t2.name as premiseName,t2.physical_address as premise_phy_addr,t2.postal_address as premise_postal_addr,t1.date_added as date_registered,t9.permit_no,t6.name as applicantName, t5.name as premDistrictName,t4.name as premRegionName, t3.name as premCountryName, t6.postal_address,t6.physical_address, t6.name as countryName , t7.name as regionName, t8.name as districtName "))
                                                    ->where('t1.application_code',$application_code)
                                                    ->first();
                                                
                    if($record){
                        $row=$record;
                        $applicantName=$row->applicantName;
                        $premise_name=$row->premiseName;
                        $permit_no=$row->permit_no;
                        $date_added=$row->date_registered;
                        $postal_address=$row->postal_address;
                        $physical_address=$row->physical_address;
                        $countryName=$row->countryName;
                        $regionName=$row->regionName;
                        $districtName=$row->districtName;
                        $premiseID=$row->premiseID;
                        $premise_reg_no=$row->permit_no;
                        $expiry_date = $row->expiry_date;
                        $section_id = $row->section_id;
                        $registration_date = $row->certificate_issue_date;
                        $org_info = $this->getOrganisationInfo();
                        $manufacturing_site_id = $row->premiseID;
                        $premise_phy_addr=$row->premise_phy_addr;
                        $premise_postal_addr=$row->premise_postal_addr;
                        $premDistrictName=$row->premDistrictName;
                        $premCountryName=$row->premCountryName;
                        $premRegionName=$row->premRegionName;
                        //Get Premise Location
                        
                        $logo = getcwd() . '/resources/images/org-logo.jpg';
                        $inspection_rec =  DB::table('assigned_gmpinspections as t1')
                                                                        ->join('tra_gmp_applications as t2', 't1.application_code', '=', 't2.application_code')
                                                                        ->leftJoin('inspectionteam_details as t3', 't1.inspection_id', '=', 't3.id')
                                                                        ->where('t1.application_code', $application_code)
                                                                        ->first();
                    
                        if($inspection_rec){
                            $row = $inspection_rec;
                            $inspection_timeline = $row->inspection_timeline;
                            $actual_start_date = $row->actual_start_date;
                            $actual_end_date = $row->actual_end_date;

                            $inspection_start_date = $row->start_date;
                            $inspection_end_date = $row->start_date;
                            if($actual_start_date != '' && $actual_end_date !=''){
                                $inspection_end_date = date('d<\s\u\p>S</\s\u\p> F\\, Y',strtotime($row->actual_end_date));
                                $inspection_start_date = date('d<\s\u\p>S</\s\u\p>',strtotime($row->actual_start_date));
                                $date_of_inspection = $inspection_start_date.' - '.$inspection_end_date;

                            }
                            else if($inspection_timeline != '' && $inspection_timeline != 0){
                                $date_of_inspection = $inspection_timeline;
                                $date_of_inspection = preg_replace('/<br\\s*?\\/?>\\s*$/', '', $date_of_inspection);
                        
                            }else if($inspection_start_date == $inspection_end_date){
                                
                                $date_of_inspection = $inspection_start_date;
                                
                            }
                            else{
                                $inspection_end_date = date('d<\s\u\p>S</\s\u\p> F\\, Y',strtotime($row->inspection_end_date));
                                $inspection_start_date = date('d<\s\u\p>S</\s\u\p>',strtotime($row->inspection_start_date));
                                $date_of_inspection = $inspection_start_date.' - '.$inspection_end_date;
                                
                            }
                            
                        }
                        else{
                            $date_of_inspection = 'N/A';
                        }
                        
                        $data = " GMP Compliance: GMP Certificate No:".$premise_reg_no."; Manufacturing Site:".$premise_name.";Expiry Date:".$expiry_date;
                            
                            PDF::AddPage();
                            $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
                        // QRCODE,H : QR-CODE Best error correction
                        PDF::write2DBarcode($data, 'QRCODE,H', 178, 37, 16, 16);
                        
                        
                            PDF::SetMargins(13,5,13, true);
                            PDF::SetFont('','B',13);
                        
                            PDF::SetLineWidth(0.8);
                            PDF::Rect(10,10,190,274);
                            
                            PDF::SetLineWidth(0.3);
                            PDF::Rect(11,11,188,272);
                            PDF::Cell(0,5,'',0,1);
                            if($section_id == 1){
                                PDF::SetFont('','I',10);
                                
                                PDF::Cell(0,4,$org_info->org_acynm.'/DFS/FRE/CF/001',0,1,'R');
                                    
                            }
                            else if($section_id == 2){
                                PDF::SetFont('','I',10);
                                
                                PDF::Cell(0,4,$org_info->org_acynm.'/DMC/MCIE/CF/004',0,1,'R');
                                
                            }
                            else if($section_id == 3){
                                PDF::SetFont('','I',10);
                                
                                PDF::Cell(0,4,$org_info->org_acynm.'/DMC/MDC/CF/004',0,1,'R');
                                
                            }
                            else if($section_id == 4){
                                PDF::SetFont('','I',10);
                                
                                PDF::Cell(0,4,$org_info->org_acynm.'/DMC/MDC/CF/004',0,1,'R');
                                
                            }
                            PDF::SetFont('','B',14);
                            
                            PDF::Cell(0,7,$org_info->org_name,0,1,'C');
                            
                            PDF::Image($logo,85,30,43,19);
                            PDF::Cell(0,25,'',0,1);
                            PDF::SetFont('','B',12);
                                
                            if($section_id == 4){
                                PDF::Cell(0,7,'CERTIFICATE OF COMPLIANCE TO QUALITY AUDIT',0,1,'C');
                            }
                            else{
                                PDF::Cell(0,7,'CERTIFICATE OF COMPLIANCE TO GOOD MANUFACTURING PRACTICES (GMP)',0,1,'C');
                            }
                            
                            
                            if($section_id == 1){
                                PDF::SetFont('','BI',9);
                                
                                PDF::Cell(0,4,'(For Infant Formulae, Complementary foods and Food Supplements Manufacturing Facilities)',0,1,'C');
                                    
                            }
                            else if($section_id == 2){
                                PDF::SetFont('','BI',9);
                                
                                PDF::Cell(0,4,'(For Medicines Manufacturing Facilities)',0,1,'C');
                                
                                
                            }
                            else if($section_id == 3){
                                PDF::SetFont('','BI',9);
                                
                                PDF::Cell(0,4,'(For Cosmetics Manufacturing Facilities)',0,1,'C');
                                
                                
                            }
                            else if($section_id == 4){
                                PDF::SetFont('','BI',9);
                                
                                PDF::Cell(0,4,'(For Medical Devices and Diagnostics Manufacturing Facilities)',0,1,'C');
                                
                                
                            }
                            PDF::SetFont('','BI',9);
                            
                            PDF::Cell(0,4,'(Made under Section 20 (2a) of  UGANDA DRUGS  AUTHORITY Act, Cap 219)',0,1,'C');
                            PDF::Cell(10);
                            PDF::SetFont('','B',11);
                            PDF::Cell(0,5,'',0,1);
                            PDF::Cell(40,5,'GMP Certificate No.',0,0);
                            PDF::Cell(50,5,$premise_reg_no,0,1);
                            PDF::Cell(0,5,'',0,1);
                            $complaince_statement = '';
                         if($section_id == 2){
                                $complaince_statement = 'current Good Manufacturing Practice requirements for dosage forms and categories of medicines listed below:';
                            
                            }
                            
                            else{
                                $complaince_statement = ' ISO 13485 requirements and  UGANDA DRUGS  AUTHORITY (Control of Medical Devices) Regulations, 2015 for the following scope:';
                            
                            }PDF::SetFont('','',11);
                            PDF::WriteHTML("This is to certify that M/S ".strtoupper($premise_name)." located at ".strtoupper($premise_phy_addr.", ".$premCountryName)." has been found to comply with ".$complaince_statement , true, 0, true, true,'');
                                PDF::Cell(0,4,'',0,1);
                                //applicant details 
                                $qry = DB::table('gmp_productline_details as t1')
                                ->join('gmp_product_lines as t2', 't1.product_line_id', '=', 't2.id')
                                ->join('gmp_product_categories as t3', 't1.category_id', '=', 't3.id')
                                ->leftJoin('gmp_productlinestatus as t5', 't1.prodline_inspectionstatus_id', '=', 't5.id')
                                ->leftJoin('gmp_prodlinerecommenddesc as t6', 't1.product_line_status_id', '=', 't6.id')
                                ->where('t1.manufacturing_site_id', $manufacturing_site_id)
                                ->where('prodline_inspectionstatus_id',8)
                                ->select('t1.*', 't2.name as product_line', 't3.name as productline_categ', 't1.prodline_description as line_activity');
                        $results = $qry->get();
                            PDF::SetFont('','',11);
                            if($section_id == 2){
                                
                                PDF::SetLineWidth(0.09);
                                PDF::SetFont('','B',10);
                                PDF::MultiCell(10,7,'S/N',1,'','',0);
                                
                                PDF::MultiCell(45,7,'Dosage Form(s)',1,'','',0);
                                
                                PDF::MultiCell(45,7,'Categories of Medicines',1,'','',0);
                                
                                PDF::MultiCell(70,7,'Manufacturing operations',1,'','',1);
                                
                                PDF::SetFont('','',11);

                                if($results){
                                $i = 1;
                                    $dimensions = PDF::getPageDimensions();
                                        $hasborder = false;
                                        foreach($results as $rows){
                                            $rowcount = max(PDF::getNumLines($rows->product_line, 42),PDF::getNumLines($rows->productline_categ, 45),PDF::getNumLines($rows->line_activity, 68));
                                            
                                            PDF::MultiCell(10,$rowcount * 6,$i.'. ',1,'','',0);
                                            PDF::MultiCell(45,$rowcount * 6,$rows->product_line,1,'','',0);
                                            PDF::MultiCell(45,$rowcount * 6,$rows->productline_categ,1,'','',0);
                                            PDF::MultiCell(70,$rowcount * 6,$rows->line_activity,1,'','',1);
                                            $i++;
                                        }
                                    
                                }
                                
                                
                                
                            }
                        
                            else if($section_id == 4){
                                
                                $table = '<table style="border-collapse:collapse;border:1px solid black;width:630px;"><thead style="font-weight:bold"><tr>';
                                
                                $table .= '<td style="width:30px;border:1px solid black;font-weight:bold">S/N</td>';
                                
                                $table .= '<td style="border:1px solid black;font-weight:bold">Types of Medical Device(s)</td>';
                                
                                //PDF::MultiCell(45,9,'Class of Medical Devices',1,'','',0);
                                $table .= '<td style="border:1px solid black;font-weight:bold">Class of Medical Devices</td>';
                                
                                //PDF::MultiCell(70,9,'Manufacturing operations',1,'','',1);
                                $table .= '<td style="border:1px solid black;font-weight:bold">Manufacturing operations</td>';
                                
                                $table .= '</tr></thead><tbody>';
                                
                                if($results){
                                    $i = 1;
                                        $dimensions = PDF::getPageDimensions();
                                            $hasborder = false;
                                            foreach($results as $rows){
                                            
                                            $table .= '<tr><td style="width:30px;border:1px solid black;">'.$i.'.</td>';
                                        
                                            $table .= '<td style="border:1px solid black;">'.$rows->product_line.'</td>';
                                    
                                            $table .= '<td style="border:1px solid black;">'.ucfirst($rows->productline_categ).'</td>';
                                        
                                            $table .= '<td style="border:1px solid black;">'.$rows->line_activity.'</td></tr>';
                                                                                
                                            $i++;
                                        }
                                    
                                }
                                
                            
                                $table .= '</tbody></table>';   
                                PDF::WriteHTML($table, true, 0, true, true,'');
                                
                            }
                            PDF::Cell(0,4,'',0,1);
                            $gmpSection = '';
                            switch($section_id){
                                case 2: $gmpSection = "pharmaceutical";break;
                                case 4: $gmpSection = "medical devices";break;
                            }
                                PDF::WriteHTML('The responsibility for the quality of the individual batches of '.$gmpSection.' products manufactured lies with the manufacturer and /or local agent.', true, 0, true, true,'');
                                PDF::Cell(0,7,'',0,1);//expiry_date
                                
                        
                            $expiry_date = date('F d\\, Y',strtotime($expiry_date));//$section,$reference_no,$brandName,$certificate_no,$expiry_date
                            $registration_date = date('F d\\, Y',strtotime($registration_date));//$section,$reference_no,$brandName,$certificate_no,$expiry_date
                            
                            PDF::SetFont('','',11);
                            
                            $signatory= '';
                            $designation='';
                            PDF::Cell(0,8,'Issued On: '.$registration_date,0,1);
                            PDF::Cell(0,8,'Expires On: '.$expiry_date,0,1);
                            $permit_signitory = '';
                            $title= '';
                            PDF::ln();
                            
                            PDF::SetFont('','B',12);
                            $permit_signitory = '';
                                                    $title= ''; PDF::ln();
                                                    $approved_by= '';
                                                    $startY = PDF::GetY();
                                                    $startX = PDF::GetX();
                                                
                                                    $signiture = getcwd() . '/resources/images/signatures/hi0kag.png';
                                                    PDF::Image($signiture,$startX,$startY-7,30,12);
                                                    PDF::SetFont('','B',11);
                    
                                                    PDF::SetFont('','B',12);
                                                    PDF::Cell(0,8,'...................................................',0,1,'');
                                                    
                                                

//                                              PDF::Cell(0,8, ucwords(strtolower('A. M. Fimbo')),0,1,'');
                                                        
                                                        PDF::Cell(0,8,'DIRECTOR GENERAL',0,1,'');
                                                        
                            PDF::SetFont('','B',12);
                            
                            ($ref = "ZMR0020/GMP/D/D/0089")?'':PDF::Cell(0,10,'',0,1);
                            PDF::Cell(15,5,'Note:  ',0,0);
                            PDF::SetFont('','',12);
                                
                             if($section_id == 2){
                                
                                PDF::MultiCell(0,7,"This certificate shall be invalid if the forms and operations herewith are changed or if the site is no longer considered to be in compliance with current GMP requirements.\n",0,'J','',1);
                                
                                
                            }
                            else if($section_id == 4){
                                
                                PDF::MultiCell(0,7,"This certificate shall be invalid if the scope certified herewith has changed or if the site is no longer considered to be in complaince with applicable ISO standards and ZMR Medical Devices Regulations in-force.\n",0,'J','',1);
                                
                                
                            }
                            PDF::setPrintHeader(false);
                            
                                PDF::Output(date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
                    }else{
                        PDF::SetFont('','',10);
                        PDF::MultiCell(0,5,'Premise Data for application with reference no:  {'.$ref.'} was not found. Please contact your System administrator if the problem persists.',0,'L');
                            PDF::Output(date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
                    }
        }else{
            return "Setup rejection letter";
        }
        
    }
    function getGmpInspectionDates($application_code){
                    $inspection_rec =  DB::table('assigned_gmpinspections as t1')
                    ->join('tra_gmp_applications as t2', 't1.application_code', '=', 't2.application_code')
                    ->leftJoin('inspectionteam_details as t3', 't1.inspection_id', '=', 't3.id')
                    ->where('t1.application_code', $application_code)
                    ->first();

                if($inspection_rec){
                $row = $inspection_rec;
                $inspection_timeline = $row->inspection_timeline;
                $actual_start_date = $row->actual_start_date;
                $actual_end_date = $row->actual_end_date;

                $inspection_start_date = $row->start_date;
                $inspection_end_date = $row->start_date;
                if($actual_start_date != '' && $actual_end_date !=''){
                $inspection_end_date = date('d<\s\u\p>S</\s\u\p> F\\, Y',strtotime($row->actual_end_date));
                $inspection_start_date = date('d<\s\u\p>S</\s\u\p>',strtotime($row->actual_start_date));
                $date_of_inspection = $inspection_start_date.' - '.$inspection_end_date;

                }
                else if($inspection_timeline != '' && $inspection_timeline != 0){
                $date_of_inspection = $inspection_timeline;
                $date_of_inspection = preg_replace('/<br\\s*?\\/?>\\s*$/', '', $date_of_inspection);

                }else if($inspection_start_date == $inspection_end_date){

                $date_of_inspection = $inspection_start_date;

                }
                else{
                $inspection_end_date = date('d<\s\u\p>S</\s\u\p> F\\, Y',strtotime($row->inspection_end_date));
                $inspection_start_date = date('d<\s\u\p>S</\s\u\p>',strtotime($row->inspection_start_date));
                $date_of_inspection = $inspection_start_date.' - '.$inspection_end_date;

                }

                }
                else{
                        $date_of_inspection = 'N/A';
                }

                return $date_of_inspection;
}
    public function getGMPProductLineTableDetails($section_id)
    {
        $qry = DB::table('par_gmpcert_linetable_details')
            ->where('section_id', $section_id);
        $details = $qry->first();
        return $details;
    }

   public function generateGmpApprovalLetter(Request $request)
    {
        $application_code = $request->input('application_code');
        $application_id = $request->input('application_id');
        $section_id = $request->input('section_id');
        
                $record =  $qry = DB::table('tra_gmp_applications as t1')
                ->join('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', '=', 't2.id')
                ->join('par_countries as t3', 't2.country_id','t3.id')
                ->leftJoin('par_regions as t4', 't2.region_id', 't4.id')
                ->leftJoin('par_districts as t5','t2.district_id', 't5.id')
                ->join('wb_trader_account as t6', 't1.applicant_id','t6.id')
                ->leftJoin('par_regions as t7', 't6.region_id', 't7.id')
                ->leftJoin('par_districts as t8','t6.district_id', 't8.id')
                ->join('tra_approval_recommendations as t9', 't1.application_code','t9.application_code' )
                ->select(DB::raw("t1.section_id,t9.certificate_issue_date,t9.expiry_date,t1.manufacturing_site_id as premiseID,t2.premise_reg_no,t2.name as premiseName,t2.physical_address as premise_phy_addr,t2.postal_address as premise_postal_addr,t1.date_added as date_registered,t9.permit_no,t1.reference_no, t6.name as applicantName, t5.name as premDistrictName,t4.name as premRegionName, t3.name as premCountryName, t6.postal_address,t6.physical_address, t6.name as countryName ,t9.approval_date, t7.name as regionName,t9.decision_id, t8.name as districtName,t1.application_code "))
                ->where('t1.application_code',$application_code)
                ->first();
                if($record){
                    $application_code = $record->application_code;
                    
                    $inspection_date =$this->getGmpInspectionDates($application_code);
                    PDF::SetMargins(13,10,13, true);
                    PDF::AddPage();
                    PDF::Cell(0,50,'',0,1);
                    PDF::Cell(5);
                    PDF::SetMargins(21,10,21, true);
                    PDF::SetFont('','B',11);
                    PDF::Cell(60,5,$record->reference_no,0,0);
                    PDF::Cell(0,5,date('D M, Y'),0,1,'R');
                    PDF::Cell(0,3,'',0,1);
                    PDF::Cell(0,5,strtoupper($record->applicantName),0,1);
                    PDF::Cell(0,5,strtoupper($record->physical_address),0,1);
                    PDF::Cell(0,5,strtoupper($record->regionName),0,1);
                    PDF::Cell(0,5,strtoupper($record->countryName),0,1);
                    PDF::Cell(0,5,'',0,1);
                    if($record->section_id ==2){
                            $letter_title = 'RE: GOOD MANUFACTURING PRACTICE AUDIT OF '.strtoupper($record->premiseName);
                    }
                    else{
                        $letter_title = 'RE: QUALITY AUDIT AUDIT OF '.strtoupper($record->premiseName);
                    }
                        if($record->decision_id == 1){
                                
                            PDF::SetFont('','B',12);
                            //PDF::Cell(0,5,0,1);

                            PDF::MultiCell(0,5,$letter_title,0,'',0,1);
                            PDF::Cell(0,5,'',0,1);
                            PDF::SetFont('','',11);
                            
                            $text1 = "Reference is made to the above captioned subject and the audit which was conducted at your pharmaceutical plant on ".$inspection_date." by the  UGANDA Medicines & Medical Devices Authority (ZMR). The audit was conducted as a result of your application(s) for registration of pharmaceutical products in  UGANDA.\n";
                            $text2 = "Based on the audit findings, (production lines which were inspected and complied) have been found to comply with the minimum requirements of the  UGANDA Good Manufacturing Practice (GMP) Guidelines.\n ";
                            $text3 = "The basis for reaching this decision has also been enumerated in the summary of basis for classifying non conformances and the detailed audit report attached to this letter.\n";
                            
                            PDF::Cell(5,2,'1. ',0,0);
                            PDF::MultiCell(0,10,$text1,0,'J',0,1);
                            
                            PDF::Cell(0,5,'',0,1);
                            PDF::Cell(5,2,'2. ',0,0);
                            PDF::MultiCell(0,10,$text2,0,'J',0,1);
                            
                            PDF::Cell(0,5,'',0,1);
                            PDF::Cell(5,2,'3. ',0,0);
                            PDF::MultiCell(0,10,$text3,0,'J',0,1);
                            
                            PDF::Cell(0,10,'',0,1);
                            
                            PDF::Cell(0,5,'We anticipate your cooperation on this matter.',0,1);
                            PDF::Cell(0,7,'',0,1);
                            PDF::SetFont('','B',11);
                            PDF::Cell(0,5,'.........................................................',0,1);
                            PDF::Cell(0,3,'',0,1);
                            PDF::Cell(0,5,'For: DIRECTOR GENERAL',0,1);
                                PDF::Output(date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
                            
                
            }
            else if($record->decision_id == 2){

                PDF::SetFont('','B',12);
                PDF::MultiCell(0,5, $letter_title,0,'',0,1);
                PDF::Cell(0,5,'',0,1);
                PDF::SetFont('','',11);
                $text1 = "Reference is made to the above captioned subject and the audit which was conducted at your pharmaceutical plant on ".$inspection_date." by the  UGANDA Medicines & Medical Devices Authority (ZMR). The audit was conducted as a result of your application(s) for registration of pharmaceutical products in  UGANDA.\n";
                $text2 = "Based on the audit findings, your pharmaceutical plant did not comply with the minimum requirements of the  UGANDA Good Manufacturing Practice (GMP) Guidelines. \n";
                $text3 = "The basis for reaching this decision has also been enumerated in the summary of basis for classifying non compliances and the detailed audit report attached to this letter.\n";
                $text4 = "In view of the above, your products cannot be registered until such time when ZMR is satisfied with GMP status of your facility. If you wish to continue with the registration of your products in  UGANDA, you are required to rectify the non conformances stated in the report and pay GMP Inspection fee for re-auditing of the facility.\n";
                
                PDF::Cell(5,2,'1. ',0,0);
                PDF::MultiCell(0,10,$text1,0,'J',0,1);
                
                PDF::Cell(0,5,'',0,1);
                PDF::Cell(5,2,'2. ',0,0);
                PDF::MultiCell(0,10,$text2,0,'J',0,1);
                
                PDF::Cell(0,5,'',0,1);
                PDF::Cell(5,2,'3. ',0,0);
                PDF::MultiCell(0,10,$text3,0,'J',0,1);
                
                PDF::Cell(0,10,'',0,1);
                
                PDF::Cell(0,5,'We anticipate your cooperation on this matter.',0,1);
                
                
                PDF::Cell(0,7,'',0,1);
                PDF::SetFont('','B',11);
                PDF::Cell(0,5,'.........................................................',0,1);
                PDF::Cell(0,3,'',0,1);
                PDF::Cell(0,5,'For: DIRECTOR GENERAL',0,1);
                    PDF::Output(date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
                exit();
            }
            else if($record->decision_id == 3){
                
                    
                
                PDF::SetFont('','B',12);
                PDF::Cell(0,5,  $letter_title,0,1);
                PDF::Cell(0,5,'',0,1);
                PDF::SetFont('','',11);
                $text1 = "Reference is made to the above captioned subject and the audit which was conducted at your pharmaceutical plant on ".$inspection_date.", by the  UGANDA Medicines & Medical Devices Authority (ZMR). The audit was conducted as a result of your application(s) for registration of pharmaceutical products in  UGANDA.\n";
                $text2 = "Based on the audit findings, a decision on the compliance of your pharmaceutical plant with the minimum requirements of the  UGANDA Good Manufacturing Practice (GMP) Guidelines will be made after the submission of a compliance report for major and minor non conformances enumerated in the GMP audit report. The compliance report shall be verified by the Authority for compliance with GMP.\n";
                $text3 = "The basis for reaching this decision has also been enumerated in the summary of basis for classifying non conformances and the detailed audit report attached to this letter.\n";
                
                PDF::Cell(5,2,'1. ',0,0);
                PDF::MultiCell(0,10,$text1,0,'J',0,1);
                
                PDF::Cell(0,5,'',0,1);
                PDF::Cell(5,2,'2. ',0,0);
                PDF::MultiCell(0,10,$text2,0,'J',0,1);
                
                PDF::Cell(0,5,'',0,1);
                PDF::Cell(5,2,'3. ',0,0);
                PDF::MultiCell(0,10,$text3,0,'J',0,1);
                
                PDF::Cell(0,10,'',0,1);
                
                PDF::Cell(0,5,'We anticipate your cooperation on this matter.',0,1);
                
                
                PDF::Cell(0,7,'',0,1);
                PDF::SetFont('','B',11);
                PDF::Cell(0,5,'.........................................................',0,1);
                PDF::Cell(0,3,'',0,1);
                PDF::Cell(0,5,'For: DIRECTOR GENERAL',0,1);
                    PDF::Output(date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
                exit();

            }


                }
        
       
    }


     public function generateClinicalTrialCertificate(Request $request)
    {
        $application_id = $request->input('application_id');
        $application_code = $request->input('application_code');
        $this->printClinicalTrialCertificate($application_code,$application_id);
    }

   


   

    public function generateProductNotificationApprovalLetterDeplecated(Request $request)
    {
        $product_id = $request->input('product_id');
        $document_number = 'BVS/099/45';
        $certificate_name = 'MEDICAL DEVICES NOTIFICATION LETTER OF APPROVAL';
        $params = array(
            'product_id' => $product_id,
            'document_number' => $document_number,
            'certificate_name' => $certificate_name,
            'certificate_regulation' => '(Made under Section 21(3) of the  UGANDA, Drugs and Cosmetics Act, Cap 219)',
            'base_Url' => $this->base_url,
            'sign_Url' => $this->sign_url
        );
        $report_name = 'medicalDevicesNotificationApprovalLetterReport';
        $report = generateJasperReport($report_name, 'permit_' . time(), 'pdf', $params);
        return $report;

    }
    //rejection letter 
    
    public function generateProductRejectionLetter(Request $request)
    {
        $product_id = $request->input('product_id');
        $document_number = 'BVS/099/45';
        $title = 'REJECTION LETTER';
        $params = array(
            'product_id' => $product_id,
            'document_number' => $document_number,
            'title' => $title,
            'base_Url' => $this->base_url,
            'sign_Url' => $this->sign_url
        );
        $report_name = 'productRejectionLetter';
        $report = generateJasperReport($report_name, 'permit_' . time(), 'pdf', $params);
        return $report;
    }
  public function funcExportInspectedpermits(Request $req){
        $table_name = 'tra_premises_applications';
        $section_id = $req->input('section_id');
        $inspection_recommendation_id = $req->input('inspection_recommendation_id');
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');

        $inspected_from = $req->input('inspected_from');
        $inspected_to = $req->input('inspected_to');
        $inspection_type_id = $req->input('inspection_type_id');
        $approval_recommendation_id = $req->input('approval_recommendation_id');
        $section_id = $req->input('section_id');


        $approved_from_date = $req->input('approved_from_date');
        $approved_to_date = $req->input('approved_to_date');
        $type = $req->type;
        $inspection_status_id = $req->input('inspection_status_id');
        $port_id = $req->input('port_id');
        $whereClauses = array();
        try {
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'premise_name' :
                                $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'region_name' :
                                $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                break;
                                case 'district_name' :
                                $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                break;  
                                case 'physical_address' :
                                $whereClauses[] = "t2.physical_address like '%" . ($filter->value) . "%'";
                                break; 
                                case 'applicant_name' :
                                $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                break;
                                case 'proforma_invoice_no' :
                                $whereClauses[] = "proforma_invoice_no like '%" . ($filter->value) . "%'";
                                break;
                                case 'inspected_on' :
                                $whereClauses[] = "date_format(inspected_on,'%Y-%m-%d') = '" . ($filter->value) . "'";
                                break;
                                   case 'tra_reg_number' :
                                $whereClauses[] = "t2.tra_reg_number like '%" . ($filter->value) . "%'";
                                break;
                                  case 'inspection_status' :
                                $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                break;
                                case 'permit_section' :
                                    $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                    case 'permit_no' :
                                    $whereClauses[] = "t4.permit_no like '%" . ($filter->value) . "%'";
                                    break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
        if($type == 1){ //poe inpection type 2 and premise is 1
            $qry = DB::table($table_name . ' as t1')
            ->join('tra_premises as t2', 't1.premise_id', '=', 't2.id')
            ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
            ->join('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')

            ->join('tra_premiseinspection_applications as t7', 't7.application_code', '=', 't1.application_code')
            ->join('par_premiseinspection_recommendations as t6', 't7.approval_recommendation_id', '=', 't6.id')

            ->leftJoin('par_business_types as t10', 't2.business_type_id', '=', 't10.id')
            ->leftJoin('par_regions as t11', 't2.region_id', '=', 't11.id')

            ->leftJoin('par_districts as t12', 't2.district_id', '=', 't12.id')
            ->leftJoin('par_inspection_types as t14', 't7.inspection_type_id', '=', 't14.id')

            ->leftJoin('par_premiseinspection_recommendations as t15', 't7.recommendation_id', '=', 't15.id')
            ->select( DB::raw("t1.reference_no as Reference_no,t1.tracking_no as Tracking_no,t2.physical_address,t11.name as region_name,t12.name as district_name, t2.name as premise_name, t3.name as applicant_name, t4.name as application_status,t7.approval_remarks,
                t10.name as business_type,t14.name as inspection_type,t15.name as inspection_recommendation,  t6.name as approval_status,date_format(t7.actual_start_date,'%Y-%m-%d') as actual_start_date,date_format(t7.actual_end_date,'%Y-%m-%d') as actual_end_date"));
//

            if(validateIsNumeric($inspection_type_id)){
                    
                $qry->where(array('t7.inspection_type_id'=>$inspection_type_id));

            }if(validateIsNumeric($inspection_recommendation_id)){

                $qry->where(array('t7.recommendation_id'=>$inspection_recommendation_id));
            }if(validateIsNumeric($section_id)){

                $qry->where(array('t1.section_id'=>$section_id));
            }if(validateIsNumeric($approval_recommendation_id)){

                $qry->where(array('t7.approval_recommendation_id'=>$approval_recommendation_id));
            }
            // /the inspected
            if($inspected_from != '' || $inspected_to){
                $qry->whereRAW(" actual_start_date BETWEEN '".$inspected_from."' and '".$inspected_to."' ");
                $qry->whereRAW(" actual_end_date BETWEEN '".$inspected_from."' and '".$inspected_to."' ");
            }
            if($approved_from_date != ''){
                $qry->whereRAW(" approval_date >= '".$approved_from_date."' ");
            }if($approved_to_date != ''){
                $qry->whereRAW(" approval_date <= '".$approved_to_date."' ");
            }
            $heading='Inspected and Approved Premise Inspections';
            $filename="Inspected_approval_Premise_Inspections";
        }
        else{//t1
         $qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('tra_poe_applications as t2', 't1.application_code', '=','t2.application_code')
                ->leftJoin('par_poeinspection_statuses as t3', 't2.inspection_status_id','=','t3.id')
                ->join('tra_managerpermits_review as t4', 't1.application_code', '=', 't4.application_code')
                ->leftJoin('par_sections as t5', 't1.section_id', '=', 't5.id')
                ->leftJoin('par_ports_information as t6', 't1.port_id', '=', 't6.id')
                ->leftJoin('users as t7', 't2.inspected_by', '=', 't7.id')
                ->leftJoin('par_poeinspection_recommendation as t8', 't2.inspection_recommendation_id','=','t8.id')
                ->select(DB::raw("DISTINCT t2.tra_reg_number, t1.reference_no,t1.tracking_no, t4.permit_no,if(t2.inspection_status_id >0,t3.name, 'Not Inspected') as inspection_status, t1.proforma_invoice_no,t5.name as permit_section, t6.name as port_ofentryexit,CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as inspection_by, t8.name as inspection_recommendation,date_format(t2.created_on,'%Y-%m-%d') as Inspected_on,tansad_no,tra_reg_date,remarks"));
                //,
                if(validateIsNumeric($port_id)){
                    
                    $qry->where(array('t1.port_id'=>$port_id));

                }if(validateIsNumeric($inspection_recommendation_id)){
    
                    $qry->where(array('t2.inspection_recommendation_id'=>$inspection_recommendation_id));
                }if(validateIsNumeric($section_id)){
    
                    $qry->where(array('section_id'=>$section_id));
                }
                // /the inspected
                if($inspected_from != ''){
                    $qry->whereRAW(" inspected_on >= '".$inspected_from."' ");
                }if($inspected_to != ''){
                    $qry->whereRAW(" inspected_on <= '".$inspected_to."' ");
                }
             //report params
                $heading='Inspected and Approved POE Inspections';
                        $filename="Inspected_approval_POE_Inspections";
            }

            if ($filter_string != '') {

                $qry->whereRAW($filter_string);
            }
            if(validateIsNumeric( $section_id)){

                $qry->where('t1.section_id',$section_id);
            }      
                           
        $data=$qry->get();
        $data_array = json_decode(json_encode($data), true);
        //application details
        $ProductSpreadsheet = new Spreadsheet();
        $sheet = $ProductSpreadsheet->getActiveSheet();
        $cell=0;

        if(isset($data_array[0])){
            $header=array_keys($data_array[0]);
            $length=count($header);
        }else{
            $data_array=array();
            $header=array();
            $length=1;
            $sheet->getCell('B8')->setValue("No data");
       }
  
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

    
    
        $sortedData=array();
        $i=0;
        $k=0;
        $temp=[];
        $length++;
        $letter=number_to_alpha($length,"");     
          
            //get the columns
            foreach ($header as $uheader){
                             $temp[$i]=$uheader;
                          $i++;
                        }
           $total=count($temp);
           //match values
             foreach ($data as $udata)
                  {
                      $sortedData[$k][] = $k+1;
                      for($v=0;$v<$total;$v++){
                         $temp1=$temp[$v];
                         $sortedData[$k][]=$udata->$temp1;
                      }
                     
                      $k++;  
                 }
         //first heading
                $sheet->mergeCells('A1:'.$letter.'6')
                      ->getCell('A1')
                      ->setValue(" UGANDA MEDICINE AND MEDICAL DEVICES AGENCY\nP.O. Box 77150, Nelson Mandela Road,Mabibo External\nTell : +255 22 2450512/2450751/2452108 Fax : +255 28 2541484\nWebsite: www.ZMR.go.zmEmail: info@ZMR.go.zm\n".$heading);
                $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
                $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);
        //headers 
               $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);

        //set autosize\wrap true for all columns
            $size=count($sortedData)+7;
            $cellRange = 'A7:'.$letter.''.$size;
            if($length>26){
                  foreach(range('A','Z') as $column) {
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                  $remainder=27;
                  while ($remainder <= $length) {
                    $column=number_to_alpha($remainder,"");
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                    $remainder++;
                  }

                }else{

                  foreach(range('A',$letter) as $column) {
                    //dd(range('A',$letter) );
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                }

          //adding formats to header
                array_unshift($header, "S/N");
                $header = toUpperCase($header);
               $sheet->fromArray($header, null, "A7");
        //loop data while writting
               $sheet->fromArray( $sortedData, null,  "A8");
        //create file
            $writer = new Xlsx($ProductSpreadsheet);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', 'attachment;filename='.$filename.'.xlsx');
        $response->headers->set('Cache-Control','max-age=0');
       return $response;

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
 public function funcExportInspectedPermitsProducts(Request $req){
        $table_name = 'tra_importexport_applications';
        $section_id = $req->input('section_id');
        $inspection_recommendation_id = $req->input('inspection_recommendation_id');
        $filter = $req->input('filter');
        $start = $req->input('start');
        $limit = $req->input('limit');

        $inspected_from = $req->input('inspected_from');
        $inspected_to = $req->input('inspected_to');
        $inspection_type_id = $req->input('inspection_type_id');
        $approval_recommendation_id = $req->input('approval_recommendation_id');
        $section_id = $req->input('section_id');


        $approved_from_date = $req->input('approved_from_date');
        $approved_to_date = $req->input('approved_to_date');
        $type = $req->type;
        $inspection_status_id = $req->input('inspection_status_id');
        $port_id = $req->input('port_id');
        $whereClauses = array();
        try {
            $filter_string = '';
            if (isset($filter)) {
                $filters = json_decode($filter);
                if ($filters != NULL) {
                    foreach ($filters as $filter) {
                        switch ($filter->property) {
                            case 'reference_no' :
                                $whereClauses[] = "t1.reference_no like '%" . ($filter->value) . "%'";
                                break;
                            case 'premise_name' :
                                $whereClauses[] = "t2.name like '%" . ($filter->value) . "%'";
                                break;
                            case 'region_name' :
                                $whereClauses[] = "t11.name like '%" . ($filter->value) . "%'";
                                break;
                                case 'district_name' :
                                $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                break;  
                                case 'physical_address' :
                                $whereClauses[] = "t2.physical_address like '%" . ($filter->value) . "%'";
                                break; 
                                case 'applicant_name' :
                                $whereClauses[] = "t3.name like '%" . ($filter->value) . "%'";
                                break;
                                case 'proforma_invoice_no' :
                                $whereClauses[] = "proforma_invoice_no like '%" . ($filter->value) . "%'";
                                break;
                                case 'inspected_on' :
                                $whereClauses[] = "date_format(inspected_on,'%Y-%m-%d') = '" . ($filter->value) . "'";
                                break;
                                   case 'tra_reg_number' :
                                $whereClauses[] = "t2.tra_reg_number like '%" . ($filter->value) . "%'";
                                break;
                                  case 'inspection_status' :
                                $whereClauses[] = "t8.name like '%" . ($filter->value) . "%'";
                                break;
                                case 'permit_section' :
                                    $whereClauses[] = "t5.name like '%" . ($filter->value) . "%'";
                                    break;
                                
                                case 'tracking_no' :
                                    $whereClauses[] = "t1.tracking_no like '%" . ($filter->value) . "%'";
                                    break;
                                    case 'permit_no' :
                                    $whereClauses[] = "t4.permit_no like '%" . ($filter->value) . "%'";
                                    break;
                                    
                                 case 'brand_name' :
                                $whereClauses[] = "t11.brand_name like '%" . ($filter->value) . "%'";
                                break;
                                  case 'common_name' :
                                $whereClauses[] = "t12.name like '%" . ($filter->value) . "%'";
                                break;
                                  case 'prodcertificate_no' :
                                $whereClauses[] = "t9.prodcertificate_no like '%" . ($filter->value) . "%'";
                                break;
                                  case 'batch_numbers' :
                                $whereClauses[] = "t13.batch_numbers like '%" . ($filter->value) . "%'";
                                break;
                        }
                    }
                    $whereClauses = array_filter($whereClauses);
                }
                if (!empty($whereClauses)) {
                    $filter_string = implode(' AND ', $whereClauses);
                }
            }
     
         $qry = DB::table('tra_importexport_applications as t1')
                ->leftJoin('tra_poe_applications as t2', 't1.application_code', '=','t2.application_code')
                ->leftJoin('par_poeinspection_statuses as t3', 't2.inspection_status_id','=','t3.id')
                ->join('tra_managerpermits_review as t4', 't1.application_code', '=', 't4.application_code')
                ->leftJoin('par_sections as t5', 't1.section_id', '=', 't5.id')
                ->leftJoin('par_ports_information as t6', 't1.port_id', '=', 't6.id')
                ->leftJoin('users as t7', 't2.inspected_by', '=', 't7.id')
                ->leftJoin('par_poeinspection_recommendation as t8', 't2.inspection_recommendation_id','=','t8.id')
                ->join('tra_permits_products as t9', 't1.application_code','=','t9.application_code')
                ->join('tra_poe_permitsdata as t13', function ($join) {
                             $join->on('t13.poe_application_id', '=','t1.id')
                                ->on('t9.id', '=', 't13.permits_product_id');
                })
                 ->leftJoin('tra_product_information as t11', 't9.product_id','=','t11.id')
                ->leftJoin('par_common_names as t12', 't11.common_name_id','=','t12.id')
                ->leftJoin('par_packaging_units as t14', 't9.packaging_unit_id','=','t14.id')
                
                ->select(DB::raw("DISTINCT t2.tra_reg_number, t1.reference_no,t1.tracking_no, t4.permit_no,if(t2.inspection_status_id >0,t3.name, 'Not Inspected') as inspection_status, t1.proforma_invoice_no,t5.name as permit_section, t6.name as port_ofentryexit,CONCAT_WS(' ',decrypt(t7.first_name),decrypt(t7.last_name)) as inspection_by, t8.name as inspection_recommendation,date_format(t2.created_on,'%Y-%m-%d') as Inspected_on,tansad_no,tra_reg_date,t2.remarks as Inspected_permits_remarks, t9.quantity as permit_quantity , t13.poe_prod_quantity,t13.batch_numbers,t11.brand_name,t12.name as common_name, t9.prodcertificate_no, t14.name as packaging_units, t9.unit_price, (t9.unit_price * t9.quantity) as total_value,t13.remarks as Inspected_Products_Remarks "));
                //,
                if(validateIsNumeric($port_id)){
                    
                    $qry->where(array('t1.port_id'=>$port_id));

                }if(validateIsNumeric($inspection_recommendation_id)){
    
                    $qry->where(array('t2.inspection_recommendation_id'=>$inspection_recommendation_id));
                }if(validateIsNumeric($section_id)){
    
                    $qry->where(array('section_id'=>$section_id));
                }
                // /the inspected
                if($inspected_from != ''){
                    $qry->whereRAW(" inspected_on >= '".$inspected_from."' ");
                }if($inspected_to != ''){
                    $qry->whereRAW(" inspected_on <= '".$inspected_to."' ");
                }
             //report params
                $heading='Inspected and Approved POE Inspections';
                $filename="Inspected_approval_POE_Inspections";
            
            if ($filter_string != '') {

                $qry->whereRAW($filter_string);
            }
            if(validateIsNumeric( $section_id)){

                $qry->where('t1.section_id',$section_id);
            }      
                  dd($qry->toSql());         
        $data=$qry->get();
        $data_array = json_decode(json_encode($data), true);
        //application details
        $ProductSpreadsheet = new Spreadsheet();
        $sheet = $ProductSpreadsheet->getActiveSheet();
        $cell=0;

        if(isset($data_array[0])){
            $header=array_keys($data_array[0]);
            $length=count($header);
        }else{
            $data_array=array();
            $header=array();
            $length=1;
            $sheet->getCell('B8')->setValue("No data");
       }
  
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

    
    
        $sortedData=array();
        $i=0;
        $k=0;
        $temp=[];
        $length++;
        $letter=number_to_alpha($length,"");     
          
            //get the columns
            foreach ($header as $uheader){
                             $temp[$i]=$uheader;
                          $i++;
                        }
           $total=count($temp);
           //match values
             foreach ($data as $udata)
                  {
                      $sortedData[$k][] = $k+1;
                      for($v=0;$v<$total;$v++){
                         $temp1=$temp[$v];
                         $sortedData[$k][]=$udata->$temp1;
                      }
                     
                      $k++;  
                 }
         //first heading
                $sheet->mergeCells('A1:'.$letter.'6')
                      ->getCell('A1')
                      ->setValue(" UGANDA MEDICINE AND MEDICAL DEVICES AGENCY\nP.O. Box 77150, Nelson Mandela Road,Mabibo External\nTell : +255 22 2450512/2450751/2452108 Fax : +255 28 2541484\nWebsite: www.ZMR.go.zmEmail: info@ZMR.go.zm\n".$heading);
                $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
                $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);
        //headers 
               $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);

        //set autosize\wrap true for all columns
            $size=count($sortedData)+7;
            $cellRange = 'A7:'.$letter.''.$size;
            if($length>26){
                  foreach(range('A','Z') as $column) {
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                  $remainder=27;
                  while ($remainder <= $length) {
                    $column=number_to_alpha($remainder,"");
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                    $remainder++;
                  }

                }else{

                  foreach(range('A',$letter) as $column) {
                    //dd(range('A',$letter) );
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                }

          //adding formats to header
                array_unshift($header, "S/N");
                $header = toUpperCase($header);
               $sheet->fromArray($header, null, "A7");
        //loop data while writting
               $sheet->fromArray( $sortedData, null,  "A8");
        //create file
            $writer = new Xlsx($ProductSpreadsheet);
         

           $response =  new StreamedResponse(
            function () use ($writer) {
                $writer->save('php://output');
            }
        );
        $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        $response->headers->set('Content-Disposition', 'attachment;filename='.$filename.'.xlsx');
        $response->headers->set('Cache-Control','max-age=0');
       return $response;

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
    public function print_test_report(Request $req){
        
        $params = array(
            'username' => 1,
            'is_active' => 1
        );

        $report_name = 'ContractDetailsReport';
        $report = generateJasperReport($report_name, 'TestReport_' . time(), 'pdf', $params);
        return $report;
    } public function printProductInformationReport(Request $request)
    {

        $table_name = $request->input('table_name');
        $application_id = $request->input('application_id');
        
        $params = array(
            'application_id' => $application_id,
             'base_url' => $this->base_url,
            'base_Url' => $this->base_url
        );
        
       $report = generateJasperReport('pir_form', 'Product Information Review' . time(), 'pdf', $params);
       
        return $report;
    }
    public function generateProductEvaluationReport(Request $request)
    {

        $table_name = $request->input('table_name');
        $application_code = $request->input('application_code');
        
        $params = array(
            'application_code' => $application_code,
             'base_url' => $this->base_url,
            'base_Url' => $this->base_url
        );
        
       $report = generateJasperReport('productEvaluationReport', 'Product Evaluation Report' . time(), 'pdf', $params);
       
        return $report;
    }
    public function generateProductAuditReport(Request $request)
    {

        $table_name = $request->input('table_name');
        $application_code = $request->input('application_code');
        
        $params = array(
            'application_code' => $application_code,
             'base_url' => $this->base_url,
            'base_Url' => $this->base_url
        );
        
        
       $report = generateJasperReport('productAuditingReport', 'Product Auditing Report' . time(), 'pdf', $params);
       
        return $report;
    }
    
    function getReportsletterheader(){
            // $org_info = DB::table('tra_organisation_information')->first();
            
            $org_info = $this->getOrganisationInfo();
            PDF::SetFont('', 'B', 16);
            PDF::Cell(0, 6, $org_info->name, 0, 1, 'C');
            $logo = getcwd() . '/resources/images/org-logo.jpg';
            PDF::SetFont('', 'B', 10);
            PDF::Image($logo, 84, 18, 55, 18);
            PDF::SetFont('', '', 10);
            PDF::Cell(0, 10, '', 0, 1);
            PDF::Cell(20, 7, 'Email: ', 0, 0);
            PDF::Cell(128, 7, $org_info->email_address, 0, 0);
            PDF::Cell(0, 7, $org_info->street, 0, 1, 'l');
    
            PDF::Cell(20, 7, 'Tel: ', 0, 0);
            PDF::writeHTMLCell(128, 25, '', '', $org_info->telephone_nos, 0, 0, '', '', 'L');
            PDF::Cell(0, 7, $org_info->physical_address, 0, 1, '');
            PDF::Cell(40, 7, 'Toll Free: 0800 110 084 ', 0, 0);
            PDF::Cell(108);
            PDF::Cell(0, 7, 'P.O. Box 1253,', 0, 1, '');

            PDF::Cell(20, 7, 'Website: ', 0, 0);
            PDF::Cell(128, 7,$org_info->website, 0, 0);
            PDF::Cell(0, 7, $org_info->region_name, 0, 1, '');
            //PDF::Cell(148);
            $left_address = "All letters should be addressed to the Director General<br/>In reply please quote our Ref No:";

            PDF::writeHTMLCell(100, 5, '', '', $left_address, 0, 0, '', '', 'L');
            PDF::SetLineWidth(0.7);
            PDF::Line(0,67,350,67);
        }
        function getOrganisationInfo(){
            $org_info = DB::table('tra_organisation_information')->first();
            return $org_info;
        }
        function getReportheader($title) {
            $org_info = $this->getOrganisationInfo();
            
            $logo = getcwd() . '/resources/images/org-logo.jpg';
            PDF:: SetFont('times', 'B', 12);
            //PDF::Cell(0,6,strtoupper('Ministry of Health'),0,1,'C');
            PDF:: Cell(0, 6, strtoupper($org_info->name), 0, 1, 'C');
            //$logo=getcwd().'/assets/images/logo.jpg';
            PDF:: SetFont('times', 'B', 9);
            //PDF::Cell(0,5,'',0,2);
            PDF:: Cell(0, 6, $org_info->postal_address.' '.$org_info->region_name, 0, 1, 'C');
            PDF:: Cell(0, 6, 'Tel:       '.$org_info->telephone_nos.' Fax: '.$org_info->fax, 0, 1, 'C');
            PDF:: Cell(0, 6, 'Website: '.$org_info->website.', Email: '.$org_info->email_address, 0, 1, 'C');
            PDF:: Cell(0, 5, '', 0, 2);
            PDF:: Image($logo, 95, 33, 18, 20);
            PDF:: Cell(0, 15, '', 0, 2);
            PDF:: SetFont('times', 'B', 11);
            PDF:: Cell(0, 5, $title, 0, 1, 'C');
            PDF:: SetFont('times', 'B', 11);

        }
         public function generateProductNotificationCertificate(Request $request)
        {
                try{
                    $application_code = $request->input('application_code');
                    $document_number = 'BVS/099/45';
                    $certificate_name = 'MEDICAL DEVICES NOTIFICATION CERTIFICATE';
                    $qry = DB::table('tra_product_applications as t1')
                            ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                            ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                            ->leftJoin('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                            ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                            ->leftJoin('par_classifications as t14', 't7.classification_id', '=', 't14.id')
                            ->select('t1.*', 't3.name as trader_name','t3.physical_address as trader_address','t10.name as region_name' , 't9.name as country_name','t4.name as application_status', 't6.name as dg_recommendation', 't5.decision_id as recommendation_id','t7.gmdn_term as gmdn_name','t7.gmdn_code',
                                't1.id as active_application_id', 't7.brand_name', 't8.name as common_names', 't14.name as classification','t5.expiry_date','t11.name as localAgentName','t11.physical_address as local_agent_address', 't5.certificate_no', 't5.approval_date', 't13.name as manufacturer','t5.certificate_issue_date'
                                )
                            ->join('tra_approval_recommendations as t5', function ($join) {
                                $join->on('t1.id', '=', 't5.application_id')
                                    ->on('t1.application_code', '=', 't5.application_code');
                            })
                            
                            ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                            ->leftJoin('par_regions as t10', 't3.region_id', '=', 't8.id')
                            ->leftJoin('par_countries as t9', 't3.country_id', '=', 't9.id')
                            ->leftJoin('wb_trader_account as t11', 't1.local_agent_id', '=', 't11.id')
                            ->leftJoin('tra_product_manufacturers as t12', 't1.product_id', '=', 't12.product_id')
                            ->leftJoin('tra_manufacturers_information as t13', 't12.manufacturer_id', '=', 't13.id')
                            
                            ->where(array('t1.application_code' => $application_code));


                        $row = $qry->first();
                        
                    if(!empty($row) && $row->recommendation_id == 1){
                        $product_id =$row->product_id;
                        PDF::AddPage();
                    PDF::SetLineWidth(0.4);
                                PDF::Rect(3,3,204,285);
                                
                                $logo2=getcwd() . '/assets/images/shield.jpg';
                                $org_info = $this->getOrganisationInfo();
                        $logo = getcwd() . '/resources/images/org-logo.jpg';
                                PDF::Image($logo,80,15,55,18);
                                
                                PDF::SetFont('times','B',14);
                                PDF::Cell(0,28,'',0,1);
                                //PDF::Cell(78);
                                PDF::Cell(0,7,' UGANDA',0,1,'C');
                                PDF::Cell(0,7,'MINISTRY OF HEALTH AND SOCIAL WELFARE',0,1,'C');
                                PDF::Cell(0,7,$org_info->org_name,0,1,'C');
                                PDF::Cell(0,5,'',0,1);
                                PDF::Cell(0,7,'CERTIFICATE OF NOTIFICATION',0,1,'C');
                                PDF::SetFont('','',12);
                                
                                PDF::SetFont('times','B',10, true);
                                
                                PDF::MultiCell(0,7,'Made under Section 53(4) (iii) of the  UGANDA, Drugs and Cosmetics Act 2003)',0,'C');
                                
                                PDF::Cell(0,5,'',0,1);
                                
                                //reg No
                                PDF::SetFont('','',11);
                                //PDF::Cell(0,10,'',0,1);
                                PDF::Cell(2);
                                PDF::Cell(70,0,'Product registration number:',0,0,'L');
                                PDF::SetFont('','B',11);
                                //PDF::Cell(40);
                                PDF::Cell(0,0,$row->certificate_no,0,1,'L');
                                
                                PDF::SetFont('','',11);
                                PDF::Cell(0,5,'',0,1);
                                PDF::Cell(2);
                                PDF::MultiCell(0,5,'This is to certify that the medical device described below has been registered in  UGANDA.',0,'L');
                                //Brand Name
                                PDF::SetFont('','',11);
                                PDF::Cell(0,5,'',0,1);
                                PDF::Cell(2);
                                PDF::Cell(70,8,'Brand/Trade Name:',0,0,'L');
                                PDF::SetFont('','B',11);
                                
                                PDF::Cell(10,8,strtoupper($row->brand_name),0,1,'L');
                                //Common Name
                                PDF::SetFont('','',11);
                                //PDF::Cell(0,8,'',0,1);
                                PDF::Cell(2);
                                
                                PDF::MultiCell(70,8,'Common Name:',0,'',0,0);
                                PDF::SetFont('','B',11);
                                
                                PDF::MultiCell(0,8,strtoupper($row->common_names),0,'',0,1);
                                PDF::SetFont('','',11);
                                
                                //Classification
                                PDF::SetFont('','',11);
                                
                                PDF::Cell(2);
                                PDF::Cell(70,8,'Class of the device:',0,0,'L');
                                PDF::SetFont('','B',11);
                                //PDF::Cell(40);
                                PDF::Cell(20,8,strtoupper($row->classification),0,1,'L');
                                
                                //Classification
                                PDF::SetFont('','',11);
                                
                                PDF::Cell(2);
                                PDF::Cell(70,8,'GMDN Code and Term:',0,0,'L');
                                PDF::SetFont('','B',11);
                                $details = '-';
                                 $gmdn_name = $row->gmdn_name;
                                 $gmdn_code = $row->gmdn_code;
                                if($gmdn_name != '' and $gmdn_name != '-'){
                                    $details = $gmdn_name.' & '.$gmdn_code;
                                }
                                
                                
                                PDF::MultiCell(0,8,strtoupper($details),0,'',0,1);
                                //Classification
                                PDF::SetFont('','',11);
                                /*
                                PDF::Cell(2);
                                
                                PDF::MultiCell(70,8,'Commercial Presentation:',0,'',0,0);
                                PDF::SetFont('','B',11);
                                PDF::MultiCell(0,8,strtoupper($commercial_repre),0,'',0,1);
                                */
                                //Applicant Name
                                PDF::SetFont('','',11);
                                
                                PDF::Cell(2);
                                //PDF::Cell(70,8,'Name of Registrant:',0,0,'L');
                                PDF::MultiCell(70,8,'Name of Registrant:',0,'',0,0);
                                PDF::SetFont('','B',11);
                                //PDF::Cell(40);
                                $manufacturer_name='';
                                    $man_postal_address='';
                                    $man_physical_address='';
                                    $man_regionName='';
                                    $man_countryName='';
                                PDF::MultiCell(0,8,strtoupper($row->trader_name),0,'',0,1);
                                   $manrow = DB::table('tra_product_manufacturers as t1')
                                    ->select('t1.*', 't2.email_address','t1.id as manufacturer_id', 't2.physical_address', 't2.name as manufacturer_name','t2.postal_address', 't3.name as country_name', 't4.name as region_name', 't5.name as district_name')
                                    ->join('tra_manufacturers_information as t2', 't1.manufacturer_id', '=', 't2.id')
                                    ->join('par_countries as t3', 't2.country_id', '=', 't3.id')
                                    ->leftJoin('par_regions as t4', 't2.region_id', '=', 't4.id')
                                    ->leftJoin('par_districts as t5', 't2.district_id', '=', 't5.id')
                                    ->leftJoin('par_manufacturing_roles as t6', 't1.manufacturer_role_id', '=', 't6.id')
                                    ->where(array('t1.product_id' => $product_id, 'manufacturer_type_id' => 1))
                                    ->first();
                                if($manrow){
                                    $manufacturer_name=$manrow->manufacturer_name;
                                    $man_postal_address=$manrow->postal_address;
                                    $man_physical_address=$manrow->physical_address;
                                    $man_regionName=$manrow->region_name;
                                    $man_countryName=$manrow->country_name;
                                }
                                PDF::SetFont('','',11);
                                
                                //PDF::Cell(40);
                                PDF::Cell(2);
                                
                                PDF::MultiCell(70,8,'Manufacturer Name:',0,'',0,0);
                                PDF::SetFont('','B',11);
                                PDF::MultiCell(0,8,strtoupper($manufacturer_name),0,'',0,1);
                                
                                PDF::Cell(72);
                                PDF::MultiCell(0,8,strtoupper($man_physical_address),0,'L');
                                //PDF::Cell(0,5,'',0,2);
                                PDF::Cell(72);
                                PDF::Cell(0,8,strtoupper($man_postal_address),0,1,'L');
                                
                                PDF::Cell(72);
                                PDF::Cell(0,8,strtoupper($man_regionName  .'  '.$man_countryName),0,1,'L');
                                PDF::SetFont('','',11);
                                
                                PDF::Cell(2);
                                //PDF::Cell(70,8,'Local Responsible Person:',0,0,'L');
                                PDF::MultiCell(70,8,'Local Responsible Person:',0,'',0,0);
                                PDF::SetFont('','B',11);
                                //PDF::Cell(40);
                                
                                PDF::MultiCell(0,8,strtoupper($row->localAgentName),0,'',0,1);
                                //Reg Date
                                //$reg_date=date('F d\\, Y',strtotime($registration_date));  
                                $reg_date = ucwords(date('F d, Y ',strtotime($row->certificate_issue_date)));
                                PDF::SetFont('','',11);
                                
                                PDF::Cell(2);
                                PDF::Cell(70,8,'Issued on:',0,0,'L');
                                PDF::SetFont('','B',11);
                                //PDF::Cell(40);
                                $expiry_date=date('F d\\, Y',strtotime($row->expiry_date));
                                PDF::Cell(20,8,$reg_date,0,1,'L');
                                //expiry on 
                                
                                PDF::Cell(2);
                                PDF::SetFont('','',11);
                                PDF::Cell(70,8,'Expiry Date:',0,0,'L');
                                PDF::SetFont('','B',11);
                                //PDF::Cell(40);
                            
                                PDF::Cell(20,8,$expiry_date,0,1,'L');
                                //Name
                                PDF::SetFont('','',11);
                                
                                PDF::Cell(0,2,'',0,1);
                                
                                $signatory= '';
                                $designation='';
                                
                                PDF::SetFont('','B',11);
                                $title= 'ACTING';
                                $title= '';
                                $approved_by = '';
                                $startY = PDF::GetY();
                                $startX = PDF::GetX();
                                $signiture = getcwd() . '/resources/images/signatures/hi0kag.png';
                                PDF::Image($signiture,$startX,$startY-7,30,12);
                                PDF::SetFont('','B',11);
                                PDF::Cell(30,7,'................................',0,1,'L'); 
                                PDF::SetFont('','B',10);
                                //PDF::Cell(0,7, 'A. M. FIMBO',0,1);
                                //PDF::Cell(20,7,$title.' DIRECTOR GENERAL',0,1,'L');
                                PDF::ln();
                                PDF::SetFont('','',7);
                                PDF::MultiCell(0,3,'The certificate must be returned to the Authority if cancelled, invalidated or if registration of the medicine is withdrawn or when requested to do so by the Director General.',0,'C',0,1);
                                
                                PDF::AddPage();
                                //PDF::Cell(70);
                                
                                PDF::SetFont('','BI',11);
                                PDF::Cell(0,7,'Conditions of Registration',0,1,'L');
                                PDF::SetFont('','',10);
                                PDF::Cell(0,6,'',0,1);
                                PDF::Cell(10);
                                PDF::MultiCell(0,7,'1. Registrant and local Responsible Person shall retain records of the distribution of all medical devices registered. The distribution records for class B, class C and class D shall be retained for a minimum of 3 years.',0,'L');
                                
                                PDF::Cell(0,6,'',0,1);
                                PDF::Cell(10);
                                PDF::MultiCell(0,7,'2. The registrant shall ensure that the manufacturing facilities where a registered medical device is produced comply at all  with Quality Management System Requirements.',0,'L');
                                
                                PDF::Cell(0,6,'',0,1);
                                PDF::Cell(10);
                                PDF::MultiCell(0,7,'3. Registrant and Local Responsible Person shall ensure that a medical device within their control is stored and transported in accordance with the instructions and information provided by the manufacturer.',0,'L');
                                
                                PDF::Cell(0,6,'',0,1);
                                PDF::Cell(10);
                                PDF::MultiCell(0,7,'4. All changes with regard to a registered medical device should be notified to the Authority by the registrant for approval prior to to their implementation.',0,'L');
                                
                                PDF::Cell(0,6,'',0,1);
                                PDF::Cell(10);
                                PDF::MultiCell(0,7,'5. Registered device can not be advertised without prior approval from the Authority.',0,'L');
                                
                    
                    }else{
                        return "Setup rejection letter";
                    }
                PDF::Output();
                return;
            } catch (\Exception $exception) {
                //DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => $exception->getMessage()
                );
            } catch (\Throwable $throwable) {
                //DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            
        return response()->json($res);
        }
        
        public function generateProductNotificationApprovalLetter(Request $req){
            try{
                $application_code = $req->application_code;
            
                PDF::setPrintHeader(false);
                PDF::setPrintFooter(false);
                PDF::AddPage();
                $this->getReportsletterheader();
                
                PDF::Cell(0,20,'',0,1);
                $qry = DB::table('tra_product_applications as t1')
                ->join('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                ->leftJoin('tra_product_information as t7', 't1.product_id', '=', 't7.id')
                ->leftJoin('par_common_names as t8', 't7.common_name_id', '=', 't8.id')
                ->leftJoin('par_classifications as t14', 't7.classification_id', '=', 't14.id')
                ->select('t1.*', 't3.name as trader_name','t3.physical_address as trader_address','t10.name as region_name' , 't9.name as country_name','t4.name as application_status', 't6.name as dg_recommendation', 't5.decision_id as recommendation_id',
                    't1.id as active_application_id', 't7.brand_name', 't8.name as common_names', 't14.name as classification','t5.expiry_date','t11.name as local_agent','t11.physical_address as local_agent_address', 't5.certificate_no', 't5.approval_date', 't13.name as manufacturer'
                    )
                ->join('tra_approval_recommendations as t5', function ($join) {
                    $join->on('t1.id', '=', 't5.application_id')
                        ->on('t1.application_code', '=', 't5.application_code');
                })
                
                ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                ->leftJoin('par_regions as t10', 't3.region_id', '=', 't8.id')
                ->leftJoin('par_countries as t9', 't3.country_id', '=', 't9.id')
                ->leftJoin('wb_trader_account as t11', 't1.local_agent_id', '=', 't11.id')
                ->leftJoin('tra_product_manufacturers as t12', 't1.product_id', '=', 't12.product_id')
                ->leftJoin('tra_manufacturers_information as t13', 't12.manufacturer_id', '=', 't13.id')
                
                ->where(array('t1.application_code' => $application_code));


            $row = $qry->first();
            
                
                if($row){
                    
                     PDF::SetFont('','B',11);
                    PDF::Cell(45,7,'Ref. No: '.$row->reference_no,0,0);
                    PDF::Cell(0,7,'Date: '.date('F d, Y '),0,1,'R');
                    PDF::SetFont('','',11);
                    //PDF::Cell(45,10,'Address of the Applicant:',0,1);
                    PDF::Cell(0,7,strtoupper($row->trader_name),0,1);
                    PDF::Cell(0,7,$row->trader_address.', '.$row->region_name.', '.$row->country_name,0,1);
                    PDF::Cell(0,7,$row->country_name,0,1);
                    $recommendation_id = $row->recommendation_id;
                    if($recommendation_id == 1){
                        PDF::Cell(8,2,'',0,1);
                        
                        $expiry_date=date('F d\\, Y',strtotime($row->expiry_date));
                        PDF::SetFont('','B',11);
                        PDF::MultiCell(0,5,strtoupper('RE: APPROVAL OF NOTIFICATION TO  '.$row->brand_name.'('.$row->common_names.')'),0, '', 0, 1, '', '', true);
                        PDF::Cell(8,2,'',0,1);
                        PDF::SetFont('','',11);
                        PDF::Cell(8,5,'1. ',0,0);
                        PDF::MultiCell(0,10,"Reference is made to  your application for notification of the above product manufactured by  ".$row->manufacturer.". \n",0, 'J', 0, 1, '', '', true);
                        PDF::Cell(8,2,'',0,1);
                        
                        PDF::Cell(8,5,'2. ',0,0);
                        PDF::MultiCell(0,10,"The Authority would like to inform you that, the above mentioned product has been granted notification approval with effect from  ".date('F d\\, Y',strtotime($row->approval_date))."\n",0, '', 0, 1, '', '', true);
                        PDF::Cell(8,2,'',0,1);
                        
                        PDF::Cell(8,5,'3. ',0,0);                       
                        PDF::MultiCell(0,10,"The product has been assigned with notification number ".$row->certificate_no." and you are allowed to market and sale the product in  UGANDA for the period of three (3) years of which you will be required to submit an application for renewal of notification.\n",0, 'J', 0, 1, '', '', true);
                        PDF::Cell(8,2,'',0,1);
                        
                        PDF::Cell(8,5,'4. ',0,0);
                        PDF::MultiCell(0,10,"You are reminded to ensure that all aspects related to manufacture, use, storage and distribution of the product with regulation for control of medical devices in  UGANDA throughout the authorization period.\n",0, 'J', 0, 1, '', '', true);
                        PDF::Cell(8,2,'',0,1);
                        PDF::Cell(8,5,'5. ',0,0);
                        PDF::MultiCell(0,10,"We thank you for your cooperation.\n",0, 'J', 0, 1, '', '', true);
                        
                        PDF::Cell(8,2,'',0,1);
                        
                    }
                    else{
                        
                        
                    }
                }
                
                PDF::Output();
                return;
            } catch (\Exception $exception) {
                //DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => $exception->getMessage()
                );
            } catch (\Throwable $throwable) {
                //DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            
        return response()->json($res);
        }
public function generateProductsNotificationRpt(Request $req){
            try{
                $application_code = $req->application_code;
                
                PDF::setPrintHeader(false);
                PDF::setPrintFooter(false);
                PDF::AddPage();
                //get the products dteails manufacturer_id
                $record = DB::connection('portal_db')->table('wb_product_applications as t1')
                                ->join('wb_product_information as t2', 't1.product_id', 't2.id')
                                ->join('wb_statuses as t3', 't1.application_status_id', 't3.id')
                                ->join('wb_trader_account as t4', 't1.trader_id', 't4.id')
                                ->join('wb_trader_account as t5', 't1.local_agent_id', 't5.id')
                                ->leftJoin('wb_product_manufacturers as t6', 't1.product_id', 't6.product_id')
                                ->select(DB::raw("t1.tracking_no,t2.brand_name, t4.name as trader_name, t4.physical_address,t4.telephone_no, t4.email as traderemail_address,t5.name as local_agent,t5.physical_address as localagent_address,t5.email as  localagentemail, t6.manufacturer_id, t2.common_name_id, t2.classification_id,intended_enduser_id,intended_use,gmdn_code,gmdn_term"))
                                ->where('t1.application_code', $application_code)
                                ->first();
                if($record){
                    $this->getReportsletterheader();
                    PDF::Cell(0,10,'',0,1);
                PDF::SetFont('','B',13);
                PDF::ln();
                PDF::Cell(50,7,'IVD & MEDICAL DEVICES NOTIFICATION FORM',0,0);
                //the details
                PDF::ln(); 
                PDF::SetFont('','',8);
                PDF::Cell(50,7,'Tracking No: '.$record->tracking_no,0,0);
                PDF::Cell(0,7,'Print Date: '.date('Y-m-d H:i:s'),0,1,'R');
                
                PDF::SetFont('','',9);
                PDF::Cell(10,7,'1.',1,0);
                PDF::Cell(0,7,'Trader  Details',1,1);
                
                
                PDF::MultiCell(10,12,'1.2',1,'','',0);
                PDF::MultiCell(80,12,'Trader',1,'','',0);
                PDF::MultiCell(0,12,$record->trader_name,1,'','',1);
                
                PDF::MultiCell(10,12,'1.2',1,'','',0);
                PDF::MultiCell(80,12,'Full address and contact details (phone number, email address) of the applicant ',1,'','',0);
                PDF::MultiCell(0,12,$record->physical_address,1,'','',1);
                PDF::MultiCell(0,12,$record->telephone_no.' Email Address: '.$record->traderemail_address,1,'','',1);
                
                PDF::MultiCell(10,12,'1.3',1,'','',0);
                PDF::MultiCell(80,12,'Name of local responsible person (contact – phone, email)',1,'','',0);
                PDF::MultiCell(0,12,$record->local_agent.' Email Address: '.$record->localagentemail,1,'','',1);        
                
                
                PDF::Cell(10,7,'2.',1,0);
                PDF::Cell(0,7,'Details of the Manufacturer',1,1);
                
                PDF::MultiCell(10,9,'2.1',1,'','',0);
                PDF::MultiCell(80,9,'Name of the Manufacturer',1,'','',0);
                    
                $man_record = DB::connection('')
                                    ->table('tra_manufacturers_information as t1')
                                    ->select('t1.*', 't1.id as manufacturer_id', 't1.name as manufacturer_name', 't2.name as country', 't3.name as region', 't4.name as district')
                                    ->join('par_countries as t2', 't1.country_id', '=', 't2.id')
                                    ->join('par_regions as t3', 't1.region_id', '=', 't3.id')
                                    ->leftJoin('par_districts as t4', 't1.district_id', '=', 't4.id')
                                    ->where(array('t1.id' => $record->manufacturer_id))
                                    ->first();
                if($man_record){
                    PDF::MultiCell(0,9,$man_record->manufacturer_name,1,'','',1);
                    PDF::MultiCell(10,12,'2.2',1,'','',0);

                    PDF::MultiCell(80,12,'Full address and contact details (phone number, email address) of the manufacturer',1,'','',0);
                    PDF::MultiCell(0,12,$man_record->physical_address.' '.$man_record->country,1,'','',1);  
                    
                }
                else{
                    PDF::MultiCell(0,9,'',1,'','',1);
                    PDF::MultiCell(10,12,'2.2',1,'','',0);

                    PDF::MultiCell(80,12,'Full address and contact details (phone number, email address) of the manufacturer',1,'','',0);
                    PDF::MultiCell(0,12,'',1,'','',1);
                }
                
                PDF::Cell(10,7,'3.',1,0);
                PDF::Cell(0,7,'Details of the IVD Medical Device',1,1);
                
                PDF::MultiCell(10,9,'3.1',1,'','',0);
                PDF::MultiCell(80,9,'Brand name of the device',1,'','',0);
                PDF::MultiCell(0,9,$record->brand_name,1,'','',1);  
                
                PDF::MultiCell(10,9,'3.2',1,'','',0);
                PDF::MultiCell(80,9,'Common name or Preferred name ',1,'','',0);
                PDF::MultiCell(0,9,getSingleRecordColValue('par_common_names', array('id' => $record->common_name_id ), 'name'),1,'','',1); 
                
                PDF::MultiCell(10,9,'3.3',1,'','',0);
                PDF::MultiCell(80,9,'**Device class',1,'','',0);
                PDF::MultiCell(0,9,getSingleRecordColValue('par_common_names', array('id' => $record->classification_id ), 'name'),1,'','',1);  
                
                PDF::MultiCell(10,9,'3.4',1,'','',0);
                PDF::MultiCell(80,9,'GMDN Name',1,'','',0);
                PDF::MultiCell(0,9,$record->gmdn_term,1,'','',1);   
                
                PDF::MultiCell(10,9,'3.5',1,'','',0);
                PDF::MultiCell(80,9,'GMDN Code',1,'','',0);
                PDF::MultiCell(0,9,getSingleRecordColValue('par_intended_enduser', array('id' => $record->gmdn_code ), 'name'),1,'','',1);  
                
                PDF::MultiCell(10,9,'3.6',1,'','',0);
                PDF::MultiCell(80,9,'Intended use as stated by the manufacturer',1,'','',0);
                PDF::MultiCell(0,9,$record->intended_use,1,'','',1);    
                
                PDF::MultiCell(10,9,'3.6',1,'','',0);
                PDF::MultiCell(80,9,'Intended user of the IVD medical device',1,'','',0);
                PDF::MultiCell(0,9,getSingleRecordColValue('par_intended_enduser', array('id' => $record->intended_enduser_id ), 'name'),1,'','',1);    
                    
                PDF::ln();
                PDF::MultiCell(100,6,'Name of authorized person:'.$record->trader_name,0,'','',0);  
                PDF::MultiCell(40,6,'Signature:....................',0,'','',0);    
                PDF::MultiCell(0,6,'Date:..........................',0,'','',1);    
                //PDF::MultiCell(0,8,'Official Stamp:',0,'','',1);  
                //the signatory details 
                PDF::Cell(0,7,'CE: European Conformity',0,1);
                PDF::Cell(0,7,'**Device class: Classification as per GHTF Rules',0,1);
                PDF::Cell(0,7,'USFDA: United States Food and Drug Administration',0,1);
                PDF::Cell(0,7,'GMDN: Global Medical Device Nomenclature',0,1);
                PDF::Cell(0,7,'IFU: Instruction for Use',0,1);

                }
                PDF::Output();
                return;
            } catch (\Exception $exception) {
                //DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => $exception->getMessage()
                );
            } catch (\Throwable $throwable) {
                //DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            
        return response()->json($res);


        }
    function funcGenerateCreditNote($receipt_id){
        try{
            
            $record = DB::table('tra_payments as t1')
                                ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
                                ->join('par_currencies as t3', 't1.currency_id', 't3.id')
                                ->join('par_countries as t4', 't2.country_id', 't4.id')
                                ->join('par_regions as t5', 't2.region_id', 't5.id')
                                ->select('t1.*', 't2.name as applicant_name','t2.postal_address','t4.name as countryName','t5.name as regionName', 't3.name as currency_name')
                                ->where('t1.id',$receipt_id)
                                ->first();
            if($record){
                PDF::setPrintHeader(false);
                PDF::setPrintFooter(false);
                PDF::AddPage();
                $this->getReportheader('Credit Note');
                
                PDF::Cell(0,4,'',0,1);
                PDF::Cell(117);
                PDF::SetFont('times','',10);
                PDF::Cell(20,4,'Print Date: '.date('d/m/Y'),0,1);
                PDF::Cell(0,4,'',0,1);
                
                PDF::SetFont('times','B',10);
                PDF::Cell(30,1,'Received From: ',0,0,'L');
                PDF::SetFont('times','',10);
                //PDF::Cell(50);
                PDF::Cell(100,1,$record->applicant_name,0,0,'L');
                //PDF::Cell(120,0,'',0,0);
                PDF::SetFont('times','B',10);
                PDF::Cell(20,1,'Date: ',0,0,'L');
                //PDF::Cell(135,0,'',0,0);
                PDF::SetFont('times','',10);
                PDF::Cell(100,1,date('d-m-Y',strtotime($record->trans_date)),0,1,'L');
                
                PDF::Cell(0,3,'',0,1);
                //PDF::Cell(20,0,'',0,1);
                PDF::SetFont('times','B',10);
                PDF::Cell(30,1,'Address: ',0,0,'L');
                PDF::SetFont('times','',10);
                //PDF::Cell(20,0,'',0,0);
                PDF::Cell(100,1,$record->postal_address,0,0,'L');
                //PDF::Cell(120,0,'',0,0);
                PDF::SetFont('times','B',10);
                PDF::Cell(20,1,'Time: ',0,0,'L');
                //PDF::Cell(135,0,'',0,0);
                PDF::SetFont('times','',10);
                PDF::Cell(100,1,date('H:i:s',strtotime($record->trans_date)),0,1,'L');
                
                PDF::Cell(0,3,'',0,1);
                PDF::SetFont('times','B',10);
                PDF::Cell(30,1,'',0,0,'L');
                PDF::SetFont('times','',10);
                //PDF::Cell(20,0,'',0,0);
                PDF::Cell(100,1,$record->regionName,0,0,'L');
                //PDF::Cell(120,0,'',0,0);
                PDF::SetFont('times','B',10);
                PDF::Cell(20,1,' No: ',0,0,'L');
                //PDF::Cell(135,0,'',0,0);
                PDF::SetFont('times','',10);
                PDF::Cell(100,1,$record->receipt_no,0,1,'L');
                
                PDF::Cell(0,3,'',0,1);
                PDF::SetFont('times','B',10);
                PDF::Cell(30,1,'',0,0,'L');
                PDF::SetFont('times','',10);
                //PDF::Cell(20,0,'',0,0);
                PDF::Cell(100,1,$record->countryName,0,0,'L');
                //PDF::Cell(120,0,'',0,0);
                PDF::SetFont('times','B',10);
                
                //PDF::Cell(135,0,'',0,0);
                PDF::SetFont('times','',10);
                
                //PDF::Cell(100,1,$invoice_no,0,1,'L');
                
                PDF::Cell(0,15,'',0,1);
                PDF::Cell(0,4,'The sum of ',0,1,'L');
                PDF::SetFont('times','B',10);
                //PDF::Cell(60,0,'',0,0);
                PDF::Cell(0,4,$record->currency_name.' '.convert_number_to_words($record->amount_paid),0,1,'L'); 
                
                PDF::Cell(0,10,'',0,1);
                PDF::SetFont('times','B',10);
                PDF::Cell(0,0,'Remarks: PAYMENTS REVIEWS -'.$record->reference_no .' '.$record->tracking_no,0,1);
                PDF::SetFont('times','B',10);
                PDF::Cell(45,5,'',0,1);
                
                PDF::Cell(120,10,'Applicant Name',1,0);
                PDF::Cell(0,10,'Amount in '.$record->currency_name,1,1);
                PDF::SetFont('times','',10);
                PDF::Cell(120,7,$record->applicant_name,1,0,'L');
                PDF::Cell(0,7,formatMoney($record->amount_paid).' '.$record->currency_name.' ',1,1);
                PDF::SetFont('times','B',11);
                PDF::Cell(0,10,'',0,1);
                PDF::Cell(120,10,'Requested Received By',0,0);
                
                PDF::Cell(0,10,'For:  UGANDA Medicines & Medical Devices Authority',0,1,'R');
                
                PDF::Output();
                
                
            }
            
            
                return;
            } catch (\Exception $exception) {
                //DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => $exception->getMessage()
                );
            } catch (\Throwable $throwable) {
                //DB::rollBack();
                $res = array(
                    'success' => false,
                    'message' => $throwable->getMessage()
                );
            }
            print_r($res);

    }
    function getReportheaderLandscape($title) {
        
            $org_info = $this->getOrganisationInfo();
            PDF:: SetFont('times', 'B', 12);
            //PDF:: Cell(0,6,strtoupper('Ministry of Health,Community Development,Gender,Eldery & Children'),0,1,'C');
            PDF:: Cell(0, 6, $org_info->org_name, 0, 1, 'C');
            $logo = getcwd() . '/resources/images/org-logo.jpg';
            PDF:: SetFont('times', 'B', 9);
            //PDF::Cell(0,5,'',0,2);
            PDF:: Cell(0, 6, $org_info->postal_address.' '.$org_info->region_name, 0, 1, 'C');
            PDF:: Cell(0, 6, 'Tel:       '.$org_info->telephone.' Fax: '.$org_info->fax, 0, 1, 'C');
            PDF:: Cell(0, 6, 'Website: '.$org_info->website.', Email: '.$org_info->email, 0, 1, 'C');
            PDF:: Cell(0, 5, '', 0, 2);
            PDF:: Image($logo, 134, 34, 35, 14);
            PDF:: Cell(0, 10, '', 0, 2);
            PDF:: SetFont('times', 'B', 11);
            PDF:: Cell(0, 5, $title, 0, 1, 'C');
            PDF:: SetFont('times', 'B', 11);

        }
        public function generateSelectedRetentionInvoiceStatement(Request $req){
                    try{
                                            
                            $applicant_id = $req->applicant_id;
                            $section_id = $req->section_id;
                            $retention_yearfrom = $req->retention_yearfrom;
                            $retention_yearto = $req->retention_yearto;
                            $retention_ids = ltrim($req->retention_ids,',');//ltrim($str,"Hello");
                            
                            
                            
                            $applicant_record =DB::table('wb_trader_account as t1')
                                                                ->leftJoin('par_regions as t2', 't1.region_id', 't2.id')
                                                                ->leftJoin('par_countries as t3', 't1.country_id', 't3.id')
                                                                ->select('t1.name as applicant_name', 't2.name as region_name', 't3.name as country_name', 't1.postal_address')
                                                                ->where('t1.id',$applicant_id)
                                                                ->first();
                            $retention_invoices = DB::table("tra_product_retentions as t1")
                                                    ->select(DB::raw("t4.reference_no,t1.id as retention_id, t2.registration_no as certificate_no, YEAR(t1.retention_year) AS retention_year, t1.reg_product_id,t3.brand_name,t4.invoice_no,t4.date_of_invoicing,t5.element_costs_id, t4.PayCntrNum as payment_controlno, t7.name AS currency, SUM(t5.element_amount) AS invoice_amount,t11.name as costs_element, SUM(t5.element_amount*t5.exchange_rate) AS  amount_in_tsh , t8.name AS retention_status,t9.name as applicant_name,t5.exchange_rate , t4.applicant_id"))
                                                    ->join("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                                                    ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                                                    ->join("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                                                    ->join("tra_invoice_details as t5",'t4.id','=','t5.invoice_id')
                                                    ->join("par_currencies as t7",'t4.paying_currency_id','=','t7.id')
                                                    ->join("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                                                    ->leftJoin("wb_trader_account as t9",'t4.applicant_id','=','t9.id')
                                                    ->leftJoin("tra_element_costs as t10",'t5.element_costs_id','=','t10.id')
                                                    ->leftJoin("par_cost_elements as t11",'t10.element_id','=','t11.id')
                                                    ->where('t1.retention_status_id',1)
                                                    ->groupBy('t1.invoice_id');
                                                    
                                if($retention_ids != '' && !empty($retention_ids)){
                                    
                                    $retention_ids = explode(",",$retention_ids);
                            
                                    $retention_invoices->whereIn('t1.id',$retention_ids );
                                    
                                }
                                else {
                                    if(validateIsNumeric($applicant_id)){
                                        $retention_invoices->where('t4.applicant_id',$applicant_id );
                                    }
                                }
                                if(validateIsNumeric($section_id)){
                                    $retention_invoices->where('t3.section_id',$section_id );
                                }
                                if(validateIsNumeric($retention_yearto)){
                                    $retention_invoices->whereRaw(" YEAR(t1.retention_year) <= '".$retention_yearto."'");
                                    
                                }
                                if(validateIsNumeric($retention_yearfrom)){
                                    $retention_invoices->whereRaw(" YEAR(t1.retention_year) >= '".$retention_yearfrom."'");
                                    
                                }
                                
                                
$retention_invoices = $retention_invoices->get();
PDF::setPrintHeader(false);
                                            PDF::setPrintFooter(false);
                                            PDF::AddPage('L');
                            PDF::setPrintHeader(false);
                            PDF::setPrintFooter(false);
                            
                            PDF::SetFont('','B',11);
                            $this->getReportheaderlandscape('Retention Fee Proforma Invoice'); 
                            
                            PDF::Cell(0,2,'',0,1);
                            //PDF::Cell(117);
                            PDF::SetFont('','',11);
                            PDF::Cell(0,4,'Print Date: '.date('d/m/Y'),0,1,'R');
                            PDF::SetFont('','B',10);
                            //PDF::Cell(0,3,'',0,1);
                            
                            PDF::Cell(52,3,"Customer's Name: ",0,0,'L');
                            PDF::SetFont('','',10);
                            PDF::Cell(100,5,$applicant_record->applicant_name,0,1,'L');
                            PDF::SetFont('','B',10);
                        
                            PDF::Cell(52,3,"Address: ",0,0,'L');
                            PDF::SetFont('','',10);
                            
                            PDF::Cell(100,3,$applicant_record->postal_address.','.$applicant_record->region_name.', '.$applicant_record->country_name,0,1,'L');
                            
                        if($retention_invoices){
                            
                                    PDF::Cell(0,2,'',0,1,'L');
                                
                                    PDF::SetFont('','B',9);
                                    //PDF::Cell(10);
                                            
                                    $data=array();
                                    //reg_product_id 
                                    $tot_rec_inv=0;
                                    $tot_inv_usd=0;
                                    $tot_inv_tshs=0;
                                    //the headings 
                                    PDF::MultiCell(7, 8, 'No',1,'','',0);
                                                                        
                                                        PDF::MultiCell(50, 8, 'Brand Name',1,'','',0);
                                                                        
                                                        PDF::MultiCell(40, 8, 'Registration No',1,'','',0);
                                                        PDF::MultiCell(40, 8, 'Description',1,'','',0);
                                                        PDF::MultiCell(15, 8, 'Year',1,'','',0);
                                                        PDF::MultiCell(30, 8,'Invoice No',1,'','',0);
                                                        PDF::MultiCell(30, 8,'Payment Control No:',1,'','',0);
                                                        PDF::MultiCell(20, 8,'Amount',1,'','',0);
                                                        PDF::MultiCell(20, 8,'Currency',1,'','',0);
                                                        PDF::MultiCell(0, 8, 'Amount(tsh)',1,'','',1);
                                    
                                                                //50 45 30 25 35
                                                                
                                    $i = 1;
                                    $dimensions = PDF::getPageDimensions();
                        $hasborder = false;
                        
                        $currency_usd = '';
                        $currency_tshs = '';
                        
                                    foreach($retention_invoices as $retention_invoice){
                                        
                                    PDF::SetFont('','',9);
                                        $row = $retention_invoice;
                                        $reg_product_id = $retention_invoice->reg_product_id;
                                        $retention_id = $retention_invoice->retention_id;
                                                
                                                        
                                                            $reference_no = $row->reference_no;
                                                            $invoice_no = $row->invoice_no;
                                                            $date_of_invoicing = $row->date_of_invoicing;
                                                            $currency = $row->currency;
                                                            $exchange_rate = $row->exchange_rate;
                                                            $invoice_amount = $row->invoice_amount;
                                                            $amount_in_tsh = $row->amount_in_tsh;
                                                            $element_costs_id = $row->element_costs_id;
                                                            $payment_controlno = $row->payment_controlno;
                                                            //get invoice desription
                                                            
                                                            $retention_year = $row->retention_year;
                                                            $costs_element = $row->costs_element;
                                                            //get the product details 
                                                            $brand_name = $row->brand_name;
                                                            $certificate_no = $row->certificate_no;
                                                            
                                                            
                                                            $rowcount = 0;
                                                            
                                                            
                                                                $rowcount = 0;
                                                                    
                                                                    $rowcount = max(PDF::getNumLines($brand_name, 55),PDF::getNumLines($invoice_no, 35),PDF::getNumLines($amount_in_tsh, 30),PDF::getNumLines($certificate_no, 35),PDF::getNumLines($costs_element, 20),PDF::getNumLines($payment_controlno, 35));
                                                                    
                                                                    $startY = PDF::GetY();
                                                                    if (($startY + $rowcount * 5) + $dimensions['bm'] > ($dimensions['hk'])) {
                                                
                                                                        if ($hasborder) {
                                                                            $hasborder = false;
                                                                        }else {
                                                                            PDF::Ln();
                                                                            PDF::Cell(0,5,'','T'); 
                                                                            PDF::Ln();
                                                                        }
                                                                        $borders = 'LTR';
                                                                    } elseif ((ceil($startY) + $rowcount * 5) + $dimensions['bm'] == floor($dimensions['hk'])) {
                                                                        
                                                                        $borders = 'LRB';   
                                                                        $hasborder = true; 
                                                                    } else {
                                                                        //normal cell
                                                                        $borders = 'LR';
                                                                    }
                                                                
                                                                
                                                                PDF::MultiCell(7, $rowcount* 5, $i,1,'','',0);
                                                                
                                                                PDF::MultiCell(50, $rowcount* 5, $brand_name,1,'','',0);
                                                                
                                                                PDF::MultiCell(40, $rowcount* 5, $certificate_no,1,'','',0);
                                                                
                                                                PDF::MultiCell(40, $rowcount* 5, $costs_element,1,'','',0);
                                                                PDF::MultiCell(15,  $rowcount* 5, $retention_year,1,'','',0);
                                                                PDF::MultiCell(30, $rowcount* 5, $invoice_no,1,'','',0);
                                                                PDF::MultiCell(30, $rowcount* 5, $payment_controlno,1,'','',0);
                                                                PDF::MultiCell(20, $rowcount* 5, formatMoney($invoice_amount),1,'','',0);
                                                                PDF::MultiCell(20, $rowcount* 5, $currency,1,'','',0);
                                                                PDF::MultiCell(0, $rowcount* 5, formatMoney($amount_in_tsh),1,'','',1);
                                                        
                                                        $currency_tshs = 'Tsh';
                                                                $tot_inv_tshs = $tot_inv_tshs+$amount_in_tsh;
                                                                
                                                        $i = $i+1;
                                                
                                    }
                                    
                                    PDF::SetFont('','B',9);
                                    PDF::Cell(35);
                                                            PDF::Cell(20,3,'',0,0);
                                                            PDF::Cell(140);
                                                            PDF::Cell(35,5,'',0,0);
                                                            PDF::Cell(20,5,'Total Tshs',0,0);
                                                            PDF::Cell(5);
                                                            PDF::Cell(20,5,formatMoney($tot_inv_tshs),'T',0);
                                                            PDF::Cell(20,5,'',0,1);
                                    
                                    PDF::SetFont('','',10);
                                    PDF::Ln();
                                    //PDF::Cell(10);
                                    PDF::MultiCell(0,6,'1.We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct.',0,'L');
                                    PDF:: Cell(0, 4, 'All payments are based on the government payment platform using the Control Number Indicated on the Invoice Statement.', 0, 1);
                                    
                                    PDF::Cell(0,3,'',0,1);
                                    
                                    PDF::Cell(0,3,'',0,1);
                                
                                    PDF::Cell(0,6,'',0,1);
                                    
                            
                            
                        }
                        
                        PDF::Output('Retention Statement.pdf');
                            
                            
                            return;
                        } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                        } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                        }
                        print_r($res);
                    
                    
                }
    public function generateBatchInvoiceStatement(Request $req){
        try{
            $invoice_no = $req->invoice_no;
            $invoice_id = $req->invoice_id;
            $pdf = new PdfProvider();
                                $this->getCertificateHeader($pdf,'');
                                $pdf->SetLineWidth(0.4);
                                $pdf->Rect(3,3,204,285);
            $pdf->setPrintHeader(false);
                            $pdf->setPrintFooter(false);
                            
                            $pdf->SetFont('','B',11);
                            
                            
                        $row = DB::table('tra_batch_invoiceapp_details as t1')
                                    ->join('tra_application_invoices as t2', 't1.batch_invoice_id', 't2.id')
                                    ->join('tra_invoice_details as t3', 't2.id', 't3.invoice_id')
                                    ->join('par_currencies as t4', 't3.paying_currency_id', 't4.id')
                                    
                                    ->leftJoin('wb_trader_account as t5', 't2.applicant_id', 't5.id')
                                    ->leftJoin('par_regions as t6', 't5.region_id', 't6.id')
                                    ->leftJoin('par_countries as t7', 't5.country_id', 't7.id')
                                    ->select(DB::raw("t2.*,t3.paying_exchange_rate,t3.paying_currency_id as currency_id,t4.name as currency_name,t3.total_element_amount as invoice_total_amount, t5.name as applicant_name,t5.physical_address, t5.postal_address, t7.name as country_name, t6.name as region_name "))
                                    ->where(array('t1.batch_invoice_id'=>$invoice_id, 't2.id'=>$invoice_id))
                                    ->first();
                        
                        
                        if($row){
                            $this->funcAppGenerateQrCode($row,$pdf);
                                
                            $currency_name = $row->currency_name;
                            $payinginvoice_amount = $row->invoice_total_amount;
                            $invoicing_currency_id = $row->currency_id;
                            $exchange_rate = $row->paying_exchange_rate;
                            $pdf->Cell(0,23,'',0,1);
                            $pdf->SetFont('times','B',10);
                            $pdf->Cell(0,7,'BATCH PROFORMA INVOICE',0,1,'C');
                            $pdf->Cell(100,7,'Invoice No: '.$row->invoice_no,0,0,'');
                            $pdf->SetFont('','B',10);
                            $pdf->Cell(0,7,'Date of Invoicing: '.$row->date_of_invoicing,0,1,'R');
                            
                            $pdf->Cell(0,7,'Payment Control Number: '.$row->PayCntrNum,0,1,'');
                            
                            $pdf->SetFont('times','B',11);
                            
                            $pdf->SetFont('times','',11);
                            $pdf->Cell(0,7,$row->applicant_name,0,1,'');
                            //$pdf->Cell(0,7,$row->physical_address,0,1,''); logo
                            $pdf->MultiCell(0,7,$row->physical_address,0,'','',1);
                            $pdf->Cell(0,7,$row->region_name .' '.$row->country_name,0,1,'');
                            $pdf->Cell(0,7,$row->country_name,0,1,'');
                            $pdf->SetFont('times','B',11);
                            
                            $pdf->Cell(0,7,'Invoice Items',0,1,'');
                              $batch_invoices = DB::table("tra_application_invoices as t1")
                                                    ->select(DB::raw("t1.reference_no, t1.tracking_no,t5.paying_currency_id,t1.invoice_no,t1.date_of_invoicing,t5.element_costs_id, t1.PayCntrNum as payment_controlno, t7.name AS currency, SUM(t5.element_amount) AS invoice_amount,t11.name as costs_element, t5.total_element_amount, SUM(t5.total_element_amount*t5.paying_exchange_rate) AS  amount_in_tsh , t5.paying_exchange_rate , t1.applicant_id"))
                                            
                                                    ->join("tra_invoice_details as t5",'t1.id','=','t5.invoice_id')
                                                    ->join("par_currencies as t7",'t5.paying_currency_id','=','t7.id')
                                                    ->leftJoin("tra_element_costs as t10",'t5.element_costs_id','=','t10.id')
                                                    ->leftJoin("par_cost_elements as t11",'t10.element_id','=','t11.id')
                                                    ->leftJoin("tra_batch_invoices_records as t12",'t1.id','=','t12.app_invoice_id')
                                                    ->where('t12.batch_invoice_id',$invoice_id )
                                                    ->groupBy('t1.id')
                                                    ->get();
                                        
                            if($batch_invoices){
                                $i = 1;
                                $pdf->SetFont('times','B',8);
                                $total_amount = 0;
                                
                                $pdf->MultiCell(7,10,'Sn',1,'','',0);
                                    $pdf->MultiCell(55,10,'Reference No',1,'','',0);
                                    $pdf->MultiCell(35,10,'Invoice No',1,'','',0);
                                    $pdf->MultiCell(45,10,'Cost Description',1,'','',0);
                                    
                                    $pdf->MultiCell(0,10,'Invoice Amount',1,'','',1);
                                
                                foreach($batch_invoices as $rows){
                                    $pdf->SetFont('times','',8);
                                    $currency_id = $rows->paying_currency_id;
                                    $currency_id = $rows->paying_currency_id;
                                    $total_element_amount = $rows->total_element_amount;
                                    $amount_in_tsh = $rows->amount_in_tsh;

                                    $exchange_rate = $rows->paying_exchange_rate;
                                    $pdf->MultiCell(7,10,$i,1,'','',0);
                                    if($rows->reference_no != ''){
                                        $reference_no = $rows->reference_no;
                                    }
                                    else{
                                        $reference_no = $rows->tracking_no;
                                    }
                                    $pdf->MultiCell(55,10,$reference_no,1,'','',0);
                                    $pdf->MultiCell(35,10,$rows->invoice_no,1,'','',0);
                                    $pdf->MultiCell(45,10,$rows->costs_element,1,'','',0);
                                    
                                    if($invoicing_currency_id == $currency_id && $invoicing_currency_id ==4){
                                        $invoice_amount =$rows->total_element_amount;
                                        
                                    }
                                    else if($invoicing_currency_id == $currency_id){
                                        
                                        $invoice_amount =$rows->invoice_amount;
                                        
                                    }
                                    else if($currency_id == 4 && $invoicing_currency_id == 1){
                                        $invoice_amount =$rows->invoice_amount/$exchange_rate;  
                                    }
                                    else{
                                        $invoice_amount =$amount_in_tsh;
                                    }
                                    //if()
                                    $pdf->MultiCell(0,10,formatMoney($invoice_amount),1,'R','',1);
                                    
                                    $total_amount = $total_amount+$invoice_amount;
                                    $i++;
                                }


                                
                                
                                $pdf->SetFont('times','B',10);
                                $pdf->Cell(142,7,'Total Amount',1,0);
                                    $pdf->Cell(0,7,formatMoney($total_amount),1,1,'R');
                            }
                            $pdf->Ln();
                            $pdf->Cell(0,7,'Total Amount : '.formatMoney($payinginvoice_amount).' '.$currency_name,0,1,'R');
                            $pdf->SetFont('times','',11);
                        }
                            $pdf->SetFont('','',11);
                            $pdf->Ln();
                        $pdf-> MultiCell(0, 6, '1.We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct.', 0, 'L');
                                $pdf->Cell(0,1,'',0,1);
                                $pdf->MultiCell(0,6,'2.All Payments should be made to the accounts indicated on  Number shown in the Profoma Invoice.',0,'L');
                                $pdf->Cell(0,1,'',0,1);
                                $pdf->MultiCell(0,6,'3.Bank Accounts linked to Payments are:',0,'L');
                                $bank_rec = DB::table('tra_orgbank_accounts as t1')
                                ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                                ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                                ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                                ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                                ->get();
                            if($bank_rec){
                                $pdf->MultiCell(0,7,'The amount due must be remitted to the following account:',0,'',0,1);  
                                $i = 1;
                                        foreach($bank_rec as $bank){
                                            $pdf->MultiCell(100,7,$i.'. '.$bank->account_name.' '.$bank->bank_name." ".$bank->branch_name.' '.$bank->currency_name." Account: ".$bank->account_no. " Swift Code: ".$bank->swft_code,0,'',0,1);  
                                            
                                        }
                            }           


                                
                            $pdf->Ln();
                            
                                        
                            $pdf->Cell(0,8,'Prepared by: '.ucwords($row->prepared_by) ,0,1,'');

                            $pdf->Cell(0,8,'',0,1);
                            
                            $startY = $pdf->GetY();
                            $startX = $pdf->GetX();
                                
                                    $signiture = getcwd() . '/resources/images/signatures/ca_signature.jpg';
                                    $pdf->Image($signiture,$startX,$startY-7,30,12);
                                    $pdf->SetFont('','B',11);
    
                                    $pdf->SetFont('','B',12);
                                    
                                        
                            //$pdf->Cell(30,6,'Prepared By: ',0,0,'L');
                            $pdf->SetFont('','',11);
                            //$pdf->Cell(60,6,$row->preparedBy,0,0,'L');
                            
                            $pdf->Output('Batch Invoice requests Statement.pdf');
                            
                            
                            return;
                        } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                        } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                        }
                        print_r($res);
                    
                    
        
    }
    public function generateBatchPaymentsStatement(Request $req){
        try{
            $invoice_no = $req->invoice_no;
            $invoice_id = $req->invoice_id;
            $batch_control_number = $req->batch_control_number;
            PDF::setPrintHeader(false);
                            PDF::setPrintFooter(false);
                            
                            PDF::SetFont('','B',11);
                            
                            PDF::AddPage();
                        $this->getReportheader('BATCH INVOICE PAYMENT RECEIPT'); 
                            
                        $row = DB::table('tra_batch_invoiceapp_details as t1')
                                    ->join('tra_application_invoices as t2', 't1.batch_invoice_id', 't2.id')
                                    ->leftJoin('wb_trader_account as t5', 't2.applicant_id', 't5.id')
                                    ->leftJoin('par_regions as t6', 't5.region_id', 't6.id')
                                    ->leftJoin('par_countries as t7', 't5.country_id', 't7.id')
                                    ->select(DB::raw("t2.*, t5.name as applicant_name,t5.physical_address, t5.postal_address, t7.name as country_name, t6.name as region_name "))
                                    ->where(array('t1.batch_invoice_id'=>$invoice_id, 't2.id'=>$invoice_id))
                                    ->first();
                        
                        if($row){
                        $payment_controlno = $row->PayCntrNum;

                            PDF::SetFont('','B',10);
                            PDF::Cell(100,7,'Invoice No: '.$row->invoice_no,0,0,'');
                            PDF::SetFont('','B',10);
                            PDF::Cell(0,7,'Date of Invoicing: '.$row->date_of_invoicing,0,1,'R');
                            PDF::Cell(0,7,'Payment Control Number: '.$row->PayCntrNum,0,1,'');
                            
                            PDF::SetFont('','B',11);
                            
                            PDF::SetFont('','',11);
                            PDF::Cell(0,7,$row->applicant_name,0,1,'');
                            PDF::Cell(0,7,$row->physical_address,0,1,'');
                            PDF::Cell(0,7,$row->postal_address.','.$row->region_name .' '.$row->country_name,0,1,'');
                            PDF::Cell(0,7,$row->country_name,0,1,'');
                            PDF::SetFont('','B',11);
                            
                            PDF::Cell(0,7,'Payments Items',0,1,'');
                              $batch_payments = DB::table("tra_payments as t1")
                                                    ->select(DB::raw("t1.reference_no, t1.tracking_no,t1.currency_id,t1.module_id, t1.sub_module_id, t6.name as module_name, t8.name as sub_module, t1.receipt_no,t1.trans_date, t1.PayCtrNum as payment_controlno, t7.name AS currency_name , SUM(t1.amount_paid) AS amount_paid , SUM(t1.amount_paid*t1.exchange_rate) AS  amount_in_tsh , t1.applicant_id"))
                                            
                                                    ->join("modules as t6",'t1.module_id','=','t6.id')
                                                    ->join("sub_modules as t8",'t1.sub_module_id','=','t8.id')
                                                    ->join("par_currencies as t7",'t1.currency_id','=','t7.id')
                                                    ->where('t1.PayCtrNum',$payment_controlno )
                                                    ->groupBy('t1.id')
                                                    ->get();
                                        
                            if($batch_payments->count() >0){
                                $i = 1;
                                PDF::SetFont('','B',8);
                                $total_amount = 0;
                                $currency_name = 0;
                            PDF::MultiCell(7,10,'Sn',1,'','',0);
                                    PDF::MultiCell(65,10,'Reference No',1,'','',0);
                                    PDF::MultiCell(30,10,'Receipt No',1,'','',0);
                                    PDF::MultiCell(30,10,'Trans Date',1,'','',0);
                                    PDF::MultiCell(20,10,'Currency',1,'','',0);
                                    PDF::MultiCell(0,10,'Amount Paid',1,'','',1);
                            $check_module = 0;
                            
                                foreach($batch_payments as $rows){
                                    PDF::SetFont('','',8);
                                    $currency_id = $rows->currency_id;
                                    $currency_name = $rows->currency_name;
                                    $sub_module_id = $rows->sub_module_id;
                                    if($check_module != $sub_module_id){
                                        PDF::MultiCell(0,7,$rows->module_name.':'.$rows->sub_module ,1,'','',1);
                                    }
                                    PDF::MultiCell(7,10,$i,1,'','',0);
                                
                                    if($rows->reference_no != ''){
                                        $reference_no = $rows->reference_no;
                                    }
                                    else{
                                        $reference_no = $rows->tracking_no;
                                    }
                                    PDF::MultiCell(65,10,$reference_no,1,'','',0);
                                    PDF::MultiCell(30,10,$rows->receipt_no,1,'','',0);
                                    PDF::MultiCell(30,10,$rows->trans_date,1,'','',0);
                                    
                                        $amount_paid =$rows->amount_paid;
                                    
                                        PDF::MultiCell(20,10,$rows->currency_name,1,'','',0);
                                    PDF::MultiCell(0,10,formatMoney($amount_paid),1,'R','',1);
                                    $check_module = $sub_module_id;
                                    $total_amount = $total_amount+$amount_paid;
                                    $i++;
                                }
                                PDF::SetFont('','B',10);
                                PDF::Cell(152,7,'Total Amount',1,0);
                                    PDF::Cell(0,7,formatMoney($total_amount).' '.$currency_name,1,1,'R');
                            }
                            else{
                                PDF::Cell(152,7,'No Payment Remitted',0,1);
                            }
                            PDF::Ln();
                            
                        
                        }
                            PDF::SetFont('','',11);
                            PDF::Ln();
                        
                            PDF::Cell(0,8,'',0,1);
                            
                            $startY = PDF::GetY();
                            $startX = PDF::GetX();
                                
                                    $signiture = getcwd() . '/resources/images/signatures/ca_signature.jpg';
                                    PDF::Image($signiture,$startX,$startY-7,30,12);
                                    PDF::SetFont('','B',11);
    
                                    PDF::SetFont('','B',12);
                                    PDF::Cell(0,8,'...................................................',0,1,'');
                                    
                                        PDF::Cell(0,8, 'CPA: Paschal Makoye',0,1,'');
                                        
                                        PDF::Cell(0,8,'FOR: DIRECTOR GENERAL',0,1,'');
                            //PDF::Cell(30,6,'Prepared By: ',0,0,'L');
                            PDF::SetFont('','',11);
                            //PDF::Cell(60,6,$row->preparedBy,0,0,'L');
                            
                            PDF::Output('Batch Retention Payment Receipt.pdf');
                            
                            return;
                        } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                        } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                        }
                        print_r($res);
                    
    }
    public function generateRetentionBatchInvoiceStatement(Request $req){
        try{
            $invoice_no = $req->invoice_no;
            $invoice_id = $req->invoice_id;
            PDF::setPrintHeader(false);
                            PDF::setPrintFooter(false);
                            
                            PDF::SetFont('','B',11);
                            
                            PDF::AddPage();
                        $this->getReportheader('Invoice Statement'); 
                            
                        $row = DB::table('tra_batch_invoiceapp_details as t1')
                                    ->join('tra_application_invoices as t2', 't1.batch_invoice_id', 't2.id')
                                    ->join('tra_invoice_details as t3', 't2.id', 't3.invoice_id')
                                    ->join('par_currencies as t4', 't3.paying_currency_id', 't4.id')
                                    ->leftJoin('wb_trader_account as t5', 't2.applicant_id', 't5.id')
                                    ->leftJoin('par_regions as t6', 't5.region_id', 't6.id')
                                    ->leftJoin('par_countries as t7', 't5.country_id', 't7.id')
                                    ->select(DB::raw("t2.*,t3.paying_exchange_rate,t3.paying_currency_id as currency_id,t4.name as currency_name,t3.total_element_amount as invoice_total_amount, t5.name as applicant_name,t5.physical_address, t5.postal_address, t7.name as country_name, t6.name as region_name"))
                                    ->where(array('t1.batch_invoice_id'=>$invoice_id, 't2.id'=>$invoice_id))
                                    ->first();
                        
                        
                        if($row){
                            $currency_name = $row->currency_name;
                            $payinginvoice_amount = $row->invoice_total_amount;
                            $invoicing_currency_id = $row->currency_id;
                            $exchange_rate = $row->paying_exchange_rate;
                            PDF::SetFont('','B',10);
                            PDF::Cell(100,7,'Invoice No: '.$row->invoice_no,0,0,'');
                            PDF::SetFont('','B',10);
                            PDF::Cell(0,7,'Date of Invoicing: '.$row->date_of_invoicing,0,1,'R');
                            
                            PDF::Cell(0,7,'Payment Control Number: '.$row->PayCntrNum,0,1,'');
                            PDF::Cell(0,7,'Reference No: '.$row->reference_no,0,1,'');
                            
                            PDF::SetFont('','B',11);
                            
                            PDF::SetFont('','',11);
                            PDF::Cell(0,7,$row->applicant_name,0,1,'');
                            PDF::Cell(0,7,$row->physical_address,0,1,'');
                            PDF::Cell(0,7,$row->postal_address.','.$row->region_name .' '.$row->country_name,0,1,'');
                            PDF::Cell(0,7,$row->country_name,0,1,'');
                            PDF::SetFont('','B',11);
                            
                            PDF::Cell(0,7,'Invoice Items',0,1,'');
                            
                            $retention_invoices = DB::table("tra_product_retentions as t1")
                                                    ->select(DB::raw(" t4.reference_no,t1.id as retention_id, t2.registration_no as certificate_no, YEAR(t1.retention_year) AS retention_year, t4.paying_currency_id,t1.reg_product_id,t3.brand_name,t4.invoice_no,t4.date_of_invoicing,t5.element_costs_id, t4.PayCntrNum as payment_controlno, t7.name AS currency, SUM(t5.total_element_amount) AS invoice_amount,t11.name as costs_element, SUM(t5.total_element_amount*t5.paying_exchange_rate) AS  amount_in_tsh , t8.name AS retention_status,t5.exchange_rate , t4.applicant_id"))
                                                    ->leftJoin("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                                                    ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                                                    ->join("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                                                    ->join("tra_invoice_details as t5",'t4.id','=','t5.invoice_id')
                                                    ->leftJoin("par_currencies as t7",'t4.paying_currency_id','=','t7.id')
                                                    ->leftJoin("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                                                    ->leftJoin("tra_element_costs as t10",'t5.element_costs_id','=','t10.id')
                                                    ->leftJoin("par_cost_elements as t11",'t10.element_id','=','t11.id')
                                                    ->leftJoin("tra_batch_invoices_records as t12",'t1.invoice_id','=','t12.app_invoice_id')
                                                    ->where('t12.batch_invoice_id',$invoice_id )
                                                    ->groupBy('t1.id')
                                                
                                                    ->get();
                            
                            if($retention_invoices){
                                $i = 1;
                                PDF::SetFont('','B',8);
                                $total_amount = 0;
                                
                                PDF::MultiCell(7,10,'Sn',1,'','',0);
                                    PDF::MultiCell(40,10,'Brand Name',1,'','',0);
                                    PDF::MultiCell(35,10,'Registration No',1,'','',0);
                                    PDF::MultiCell(25,10,'Retention Year',1,'','',0);
                                    PDF::MultiCell(25,10,'Invoice No',1,'','',0);
                                    PDF::MultiCell(30,10,'Cost Description',1,'','',0);
                                    PDF::MultiCell(0,10,'Invoice Amount',1,'','',1);
                                foreach($retention_invoices as $rows){
                                    PDF::SetFont('','',8);
                                    $currency_id = $rows->paying_currency_id;
                                    $exchange_rate =$rows->exchange_rate;// getExchangeRate($currency_id) ;
                                    PDF::MultiCell(7,10,$i,1,'','',0);
                                    PDF::MultiCell(40,10,$rows->brand_name,1,'','',0);
                                    PDF::MultiCell(35,10,$rows->certificate_no,1,'','',0);
                                    PDF::MultiCell(25,10,$rows->retention_year,1,'','',0);
                                    PDF::MultiCell(25,10,$rows->invoice_no,1,'','',0);
                                    PDF::MultiCell(30,10,$rows->costs_element,1,'','',0);
                                    //PDF::MultiCell(20,10,$rows->currency,1,'','',0);
                                     if($invoicing_currency_id == $currency_id){
                                        $invoice_amount =$rows->invoice_amount;
                                    }
                                    else{
                                        $invoice_amount =$rows->invoice_amount*$exchange_rate;
                                    }
                                    
                                    PDF::MultiCell(0,10,formatMoney($invoice_amount),1,'','',1);
                                    
                                    $total_amount = $total_amount+$invoice_amount;
                                    $i++;
                                }
                                
                                PDF::SetFont('','B',10);
                                PDF::Cell(155,7,'Total AMount',1,0);
                                PDF::Cell(0,7,formatMoney($total_amount).' '.$currency_name,1,1,'R');
                            }
                            PDF::Ln();
                            PDF::Cell(0,7,'Total Amount : '.formatMoney($payinginvoice_amount).' '.$currency_name,0,1,'R');
                            PDF::SetFont('times','',11);
                        }
                            PDF::SetFont('','',11);
                            PDF::Ln();
                            PDF:: MultiCell(0, 6, '1.We declare that this invoice shows the actual price of the goods/services described and that all particulars are true and correct.', 0, 'L');
                                PDF::Cell(0,1,'',0,1);
                                PDF::MultiCell(0,6,'2.All Payments should be made to the accounts indicated on  Number shown in the Profoma Invoice.',0,'L');
                                PDF::Cell(0,1,'',0,1);
                                PDF::MultiCell(0,6,'3.Bank Accounts linked to Payments are:',0,'L');
                                $bank_rec = DB::table('tra_orgbank_accounts as t1')
                                ->leftJoin('par_banks as t2', 't1.bank_id', 't2.id')
                                ->leftJoin('par_bankbranches as t3', 't1.branch_id', 't3.id')
                                ->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
                                ->select(DB::raw("t4.name as currency_name, t1.account_name, t1.account_no, t1.swft_code, t2.name AS bank_name, t3.name AS branch_name"))
                                ->get();
                            if($bank_rec){
                                PDF::MultiCell(0,7,'The amount due must be remitted to the following account:',0,'',0,1);   
                                $i = 1;
                                        foreach($bank_rec as $bank){
                                            PDF::MultiCell(100,7,$i.'. '.$bank->account_name.' '.$bank->bank_name." ".$bank->branch_name.' '.$bank->currency_name." Account: ".$bank->account_no. " Swift Code: ".$bank->swft_code,0,'',0,1);   
                                            
                                        }
                            }           

                                
                            PDF::Ln();
                            PDF::Cell(0,8,'Prepared by: '.ucwords($row->prepared_by) ,0,1,'');

                            PDF::Cell(0,8,'',0,1);
                            
                            $startY = PDF::GetY();
                            $startX = PDF::GetX();
                                
                                    $signiture = getcwd() . '/resources/images/signatures/ca_signature.jpg';
                                    PDF::Image($signiture,$startX,$startY-7,30,12);
                                    PDF::SetFont('','B',11);
    
                                    PDF::SetFont('','B',12);
                                    PDF::Cell(0,8,'...................................................',0,1,'');
                                    
                                        PDF::Cell(0,8, 'CPA: Paschal Makoye',0,1,'');
                                        
                                        PDF::Cell(0,8,'FOR: DIRECTOR GENERAL',0,1,'');
                            //PDF::Cell(30,6,'Prepared By: ',0,0,'L');
                            PDF::SetFont('','',11);
                            //PDF::Cell(60,6,$row->preparedBy,0,0,'L');
                            
                            
                            PDF::Output('Batch payments  Receipt'.rand().'.pdf');
                            
                            return;
                        } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                        } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                        }
                        print_r($res);
                    
                    
        
        
    }
    public function generateRetentionBatchPaymentsStatement(Request $req){
        try{
            $invoice_no = $req->invoice_no;
            $invoice_id = $req->invoice_id;
            PDF::setPrintHeader(false);
                            PDF::setPrintFooter(false);
                            
                            PDF::SetFont('','B',11);
                            
                            PDF::AddPage();
                        $this->getReportheader('Retention Payments Receipt'); 
                            
                        $row = DB::table('tra_batch_invoiceapp_details as t1')
                                    ->join('tra_application_invoices as t2', 't1.batch_invoice_id', 't2.id')
                                    
                                    ->leftJoin('wb_trader_account as t5', 't2.applicant_id', 't5.id')
                                    ->leftJoin('par_regions as t6', 't5.region_id', 't6.id')
                                    ->leftJoin('par_countries as t7', 't5.country_id', 't7.id')
                                    ->select(DB::raw("t2.*, t5.name as applicant_name,t5.physical_address, t5.postal_address, t7.name as country_name, t6.name as region_name"))
                                    ->where(array('t1.batch_invoice_id'=>$invoice_id, 't2.id'=>$invoice_id))
                                    ->first();
                        
                        
                        if($row){
                            
                            $payment_controlno = $row->PayCntrNum;

                            PDF::SetFont('','B',10);
                            PDF::Cell(100,7,'Batch Invoice No: '.$row->invoice_no,0,0,'');
                            PDF::SetFont('','B',10);
                            PDF::Cell(0,7,'Date of Invoicing: '.$row->date_of_invoicing,0,1,'R');
                            
                            PDF::Cell(0,7,'Payment Control Number: '.$row->PayCntrNum,0,1,'');
                            PDF::Cell(0,7,'Reference No: '.$row->reference_no,0,1,'');
                            
                            PDF::SetFont('','B',11);
                            
                            PDF::SetFont('','',11);
                            PDF::Cell(0,7,$row->applicant_name,0,1,'');
                            PDF::Cell(0,7,$row->physical_address,0,1,'');
                            PDF::Cell(0,7,$row->postal_address.','.$row->region_name .' '.$row->country_name,0,1,'');
                            PDF::Cell(0,7,$row->country_name,0,1,'');
                            PDF::SetFont('','B',11);
                            
                            PDF::Cell(0,7,'Payments Items',0,1,'');
                            $retention_invoices = DB::table("tra_product_retentions as t1")
                                                    ->select(DB::raw(" t5.reference_no,t1.id as retention_id, t2.registration_no as certificate_no, YEAR(t1.retention_year) AS retention_year, t5.exchange_rate ,t5.currency_id,t1.reg_product_id,t3.brand_name,t5.receipt_no,t5.trans_date, t5.PayCtrNum as payment_controlno, t7.name AS currency_name , SUM(t5.amount_paid) AS amount_paid, t8.name AS retention_status,t5.applicant_id"))
                                                    ->leftJoin("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                                                    ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                                                    ->join("tra_product_retentionspayments as t4",'t1.id','=','t4.retention_id')
                                                    ->join("tra_payments as t5",'t4.retention_receipt_id','=','t5.id')
                                                    ->leftJoin("par_currencies as t7",'t5.currency_id','=','t7.id')
                                                    ->leftJoin("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                                                    ->where('t5.PayCtrNum',$payment_controlno )
                                                    ->groupBy('t5.id')
                                                    ->get();
                            
                            if($retention_invoices->count() >0){
                                $i = 1;
                                PDF::SetFont('','B',8);
                                $total_amount = 0;
                                $currency_name  = 0;
                                
                                PDF::MultiCell(7,10,'Sn',1,'','',0);
                                    PDF::MultiCell(40,10,'Brand Name',1,'','',0);
                                    PDF::MultiCell(35,10,'Registration No',1,'','',0);
                                    PDF::MultiCell(20,10,'Retention Year',1,'','',0);
                                    PDF::MultiCell(20,10,'Receipt No',1,'','',0);
                                    PDF::MultiCell(20,10,'Trans Date ',1,'','',0);
                                    PDF::MultiCell(20,10,'Currency',1,'','',0);
                                    PDF::MultiCell(0,10,' Amount',1,'','',1);
                                foreach($retention_invoices as $rows){
                                    PDF::SetFont('','',8);
                                    $currency_id = $rows->currency_id;
                                    $exchange_rate =$rows->exchange_rate;
                                    $currency_name = $rows->currency_name;
                                    PDF::MultiCell(7,10,$i,1,'','',0);
                                    PDF::MultiCell(40,10,$rows->brand_name,1,'','',0);
                                    PDF::MultiCell(35,10,$rows->certificate_no,1,'','',0);
                                    PDF::MultiCell(20,10,$rows->retention_year,1,'','',0);
                                    PDF::MultiCell(20,10,$rows->receipt_no,1,'','',0);
                                    PDF::MultiCell(20,10,$rows->trans_date,1,'','',0);
                                    PDF::MultiCell(20,10,$rows->currency_name,1,'','',0);
                                
                                        $amount_paid =$rows->amount_paid;
                                
                                    
                                    PDF::MultiCell(0,10,formatMoney($amount_paid),1,'R','',1);
                                    
                                    $total_amount = $total_amount+$amount_paid;
                                    $i++;
                                }
                                
                                PDF::SetFont('','B',10);
                                PDF::Cell(155,7,'Total AMount',1,0);
                                PDF::Cell(0,7,formatMoney($total_amount).' '.$currency_name,1,1,'R');
                            }
                            else{
                                PDF::Cell(152,7,'No Payment Remitted',0,1);
                            }
                            
                        
                        }
                            PDF::SetFont('','',11);
                            PDF::Ln();
                        
                            PDF::Cell(0,8,'',0,1);
                            
                            $startY = PDF::GetY();
                            $startX = PDF::GetX();
                                
                                    $signiture = getcwd() . '/resources/images/signatures/ca_signature.jpg';
                                    PDF::Image($signiture,$startX,$startY-7,30,12);
                                    PDF::SetFont('','B',11);
    
                                    PDF::SetFont('','B',12);
                                    PDF::Cell(0,8,'...................................................',0,1,'');
                                    
                                        PDF::Cell(0,8, 'CPA: Paschal Makoye',0,1,'');
                                        
                                        PDF::Cell(0,8,'FOR: DIRECTOR GENERAL',0,1,'');
                            //PDF::Cell(30,6,'Prepared By: ',0,0,'L');
                            PDF::SetFont('','',11);
                            //PDF::Cell(60,6,$row->preparedBy,0,0,'L');
                            
                            PDF::Output('Batch Retention payments  Receipt'.rand().'.pdf');
                            
                            
                            return;
                        } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                        } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                        }
                        print_r($res);
                    
                    
        
        
    }
    function getNarcorticPermheader($title, $reference_no){
        //court_of_arm
    
        PDF:: AddPage();
        
        PDF:: SetFont('', 'B', 9);
        PDF::Cell(0,3,'FORM A',0,1);
        PDF::Cell(0,3,'Import Certificate Issued',0,1);
        PDF::Cell(0,3,'by  UGANDA',0,1);
                         
        PDF::Cell(0,5,'Permit No: '.$reference_no,0,1,'R');
        
        PDF::ln();  PDF:: SetFont('', 'B', 12);
        $logo = getcwd() . '/resources/images/court_of_arm.png';
        PDF::Cell(0,6,strtoupper(' UGANDA'),0,1,'C');
        PDF::Cell(0,6,strtoupper('Ministry of Health,Community Development,Gender,Eldery'),0,1,'C');
        PDF::Cell(0,6,strtoupper('AND CHILDREN'),0,1,'C');
        PDF:: Image($logo, 86, 49, 25, 32);
        PDF::Cell(0,10,'',0,1);
        PDF:: SetFont('', '', 8);
        PDF::Cell(50,6,'E-mail:  Info@ZMR.or.zm',0,0,'L');
        PDF::Cell(0,6,' UGANDA DRUGS  AUTHORITY AUTHORITY',0,1,'R');
        
        PDF::Cell(50,6,'Telephone:  +255 22 2450793',0,0,'L');
        PDF::Cell(0,6,'P.O. Box 1253,',0,1,'R');
        PDF::Cell(50,6,'Fax No:       +255 22 2450793',0,0,'L');
        
        
        PDF::Cell(0,6,'DODOMA.',0,1,'R');
        PDF::Cell(0,6,'All letters should be addressed to ',0,1,'L');
        PDF::Cell(0,6,'The Director General In reply please quote: ',0,1,'L');
        PDF::ln();
        
}
 public function printHospitalNarcoticsPermit(Request $req)
    {
        try{
            $application_code = $req->application_code;
            $review_rec = DB::table('tra_managerpermits_review')->where('application_code',$application_code)->first();
            
            if($review_rec){
                $decision_id = $review_rec->decision_id;
                if($decision_id != 1){
                    echo "Application has been rejected, kinldy print the Rejected Letter";
                        exit();
                }
            }
            else{
                echo  "The is not recommendation for the following permit, return back for review";
                exit();
            }
            $record = DB::table('tra_importexport_applications as t1')
                                ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
                                ->leftJoin('par_countries as t5', 't2.country_id', 't5.id')
                                ->leftJoin('par_regions as t3', 't2.region_id', 't3.id')
                                ->join('tra_permitsenderreceiver_data as t4', 't1.sender_receiver_id', 't4.id')
                                ->leftJoin('par_countries as t6', 't4.country_id', 't6.id')
                                ->leftJoin('par_regions as t7', 't4.region_id', 't7.id')
                                ->leftJoin('par_modesof_transport as t8', 't1.modesof_transport_id', 't8.id')
                                ->leftJoin('par_ports_information as t9', 't1.port_id', 't9.id')
                                ->leftJoin('par_narcoticsdrug_types as t10', 't1.narcoticsdrug_type_id', 't10.id')
                                ->leftJoin('tra_managerpermits_review as t11', 't1.application_code', 't11.application_code')
                                ->select(DB::raw("t1.reference_no,t10.name as drug_type, t2.postal_address, t7.name as importer_region,t6.name as importer_country , t4.physical_address as imp_address, t4.postal_address as imp_postal  ,t8.name as transporationmode, date_format(t1.date_added,'%Y-%m-%d') as date_registered, date_format(t1.proforma_invoice_date,'%Y-%m-%d') as invoice_date, t2.telephone_no as tel, t1.*,date_format(t1.proforma_invoice_date,'%Y-%m-%d') as invoice_date,proforma_invoice_no as invoice_no,  t1.applicant_id, t2.name , t5.name as country, t3.name as  region, t2.physical_address as phyAddr, t2.email, t4.id as importer_id, t4.name as importer_name,t1.hospital_registration_no as registration_no,t1.pharmacists_registration_no, t1.pharmacists_in_charge as pharmacist_name, t9.name as port, t11.certificate_issue_date as permit_issue_date,t11.approval_date, t11.expiry_date as permit_expiry_date"))
                                ->where('t1.application_code',$application_code)
                                ->first();
                            
                                if($record){
                                    
                                    $reference_no = $record->reference_no;
                                    PDF::setPrintHeader(false);
                                    PDF::setPrintFooter(false);
                                    $data = (array)$record;
                                    $logo = getcwd() . '/resources/images/org-logo.jpg';
                                                            PDF::setPrintHeader(false);
                                    PDF::setPrintFooter(false);
                                    PDF::AddPage();
                                        $logo=getcwd().'/assets/images/logo.jpg';
                                        
                                    
                                    PDF::SetFont('','B',11);
                                    PDF::ln(45);
                                    //the details as a report
                                    PDF::SetFont('','B',10); 
                                    PDF::Cell(65,8,'Ref. No: '.$reference_no,0,0,'');
                                    PDF::Cell(0,8,'Date: '.formatDaterpt($data['approval_date']),0,1,'R');
                                    PDF::SetFont('','b',11); 
                                    PDF::ln();
                                    PDF::Cell(65,8,'HOSPITAL PERMIT FOR USE OF NARCOTIC DRUGS',0,1,'');
                                    PDF::SetFont('','',11); 
                                    PDF::Cell(65,8,'Name of the Institution:',0,0,'');
                                    PDF::SetFont('','b',11); 
                                    PDF::Cell(0,8,strtoupper($data['name']),0,1,'');
                                    PDF::SetFont('','',11); 
                                    PDF::Cell(65,8,'Address:',0,0,'');
                                    PDF::SetFont('','b',11); 
                                    PDF::Cell(0,8,strtoupper($data['postal_address']),0,1,'');
                                    PDF::SetFont('','',11); 
                                    PDF::Cell(65,8,'Hospital registration No::',0,0,'');
                                    PDF::SetFont('','b',11); 
                                    PDF::Cell(0,8,strtoupper($data['registration_no']),0,1,'');
                                    PDF::SetFont('','',11); 
                                    PDF::Cell(65,8,'Situated at:',0,0,'');
                                    PDF::SetFont('','B',11); 
                                    PDF::Cell(0,8,strtoupper($data['phyAddr']),0,1,'');
                                    PDF::SetFont('','',11); 
                                    PDF::Cell(65,8,'Name of pharmacist in-charge:',0,0,'');
                                    PDF::SetFont('','b',11); 
                                    PDF::MultiCell(0,8,strtoupper($data['pharmacist_name']).'(Pharmacists with Reg. No: '.strtoupper($data['pharmacists_registration_no']).')',0,'','',1);
                                    

                                    PDF::SetFont('','',11); 
                                    PDF::MultiCell(0,5,'Is heareby authorise to purchase the following medical Narcotic(s) from :'.strtoupper($data['importer_name']).' for hospital uses only.',0,'','',1);
                                    PDF::ln(3);
                                    $records = DB::table('tra_narcoticimport_products as t1')
                                            ->leftJoin('par_controlled_drugsdetails as t3', 't1.narcotics_product_id','=','t3.id')
                                            ->leftJoin('par_currencies as t5', 't1.currency_id','=','t5.id')
                                            ->leftJoin('par_packaging_units as t7', 't1.packaging_unit_id','=','t7.id')
                                            
                                            ->leftJoin('par_dosage_forms as t8', 't1.dosage_form_id','=','t8.id')
                                            
                                            ->leftJoin('par_specification_types as t9', 't1.specification_type_id','=','t9.id')
                                            ->leftJoin('par_common_names as t12', 't1.common_name_id','=','t12.id')
                                            ->leftJoin('par_currencies as t13', 't1.currency_id','=','t13.id')
                                            ->select(DB::raw("t1.*, t1.section_id,t3.name as brand_name,t12.name as common_name, t7.name as packaging_units, t5.name as currency_name, t8.name as dosage_formname,t13.name as currency,  t9.name as specification_type_name, (unit_price*quantity) as  total_value"))
                                            ->where(array('t1.application_code' => $application_code))
                                            ->get();
                                    if($records){
                                        $i = 1;PDF::SetFont('','B',11); 
                                        PDF::MultiCell(10,10,'Sn',1,'','',0);
                                        PDF::MultiCell(55,10,'Name, Dosage Form & Strength',1,'','',0);
                                        PDF::MultiCell(35,10,'Unit of Measure',1,'','',0);
                                        PDF::MultiCell(45,10,'Quantity Authorised for this year '.date('Y',strtotime($data['permit_expiry_date'])),1,'','',0);
                                        PDF::MultiCell(0,10,'Authorised quantity for this permit',1,'','',1);PDF::SetFont('','',11); 
                                        foreach($records as $rows){
                                            
                                                $dimensions = PDF::getPageDimensions();

                                                $sample_name = $rows->brand_name.' '.$rows->dosage_formname.' '.$rows->strength;
                                                $rowcount = max(PDF::getNumLines($sample_name, 42),PDF::getNumLines($rows->authority_yearlyquantity, 35),PDF::getNumLines($rows->packaging_units, 35));
                                                                                
                                                PDF::MultiCell(10,6*$rowcount,$i,1,'','',0);
                                                PDF::MultiCell(55,6*$rowcount,$sample_name,1,'','',0);
                                                PDF::MultiCell(35,6*$rowcount,$rows->packaging_units,1,'','',0);
                                                PDF::MultiCell(45,6*$rowcount,$rows->authority_yearlyquantity,1,'','',0);
                                                PDF::MultiCell(0,6*$rowcount,$rows->quantity,1,'','',1);
                                                $i++;

                                        }
                                    }
                                    PDF::SetFont('','',11); 
                                    $permit_expiry = date('d-F-Y',strtotime($data['permit_expiry_date']));
                                    PDF::Cell(70,8,'The validity of this permit expires on :',0,0,'');
                                    PDF::SetFont('','B',11); 
                                    PDF::Cell(0,8,$permit_expiry,0,1,'');
                                    PDF::SetFont('','',11); 
                                    
                                    PDF::ln(5);PDF::SetFont('','B',11); 
                                    PDF::Cell(110,6,date('d\ F, Y'),0,0,'');
                                    $title= 'ACTING';
                                    PDF::ln();
                                    PDF::ln();
                                    $title= '';
                                    $approved_by = '';
                                    
                                    $startY = PDF::GetY();
                                    $startX = PDF::GetX();
                                    $signiture = getcwd() . '/resources/images/signatures/hi0kag.png';
                                    PDF::Image($signiture,$startX,$startY-7,30,12);
                                    PDF::SetFont('','B',11);
                                    PDF::Cell(30,7,'................................',0,1,'L'); 
                                    PDF::SetFont('','B',10);
                                    PDF::Cell(0,7, 'A. M. FIMBO',0,1);
                                    PDF::Cell(20,7,$title.' DIRECTOR GENERAL',0,1,'L');
                                    
                                    
                                    PDF::ln();
                                    PDF::SetFont('','BI',11); 
                                    PDF::Cell(0,8,'Note: ',0,1,'');

                                    PDF::MultiCell(0,5,'The quarterly report of Narcotic Consumption should be submitted to the Director General  UGANDA Medcines and Medical Devices Authority. Annual consumption estimates should be submitted before the end of April every year.',0,'','',1);
                                    
                                    
                                    PDF::Output('Narcotic Drug Permit.pdf');
                                    
                                    
                                }
            
                            
                            
                            return;
                        } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                        } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                        }
                        print_r($res);
       

    }

    public function printNarcoticImportPermit(Request $req){
            try{
            $application_code = $req->application_code;
            $review_rec = DB::table('tra_managerpermits_review')->where('application_code',$application_code)->first();
            
            if($review_rec){
                $decision_id = $review_rec->decision_id;
                if($decision_id != 1){
                    echo "Application has been rejected, kinldy print the Rejected Letter";
                        exit();
                }
            }
            else{
                echo  "The is not recommendation for the following permit, return back for review";
                exit();
            }
            $record = DB::table('tra_importexport_applications as t1')
                                ->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
                                ->leftJoin('par_countries as t5', 't2.country_id', 't5.id')
                                ->leftJoin('par_regions as t3', 't2.region_id', 't3.id')
                                ->join('tra_permitsenderreceiver_data as t4', 't1.sender_receiver_id', 't4.id')
                                ->leftJoin('par_countries as t6', 't4.country_id', 't6.id')
                                ->leftJoin('par_regions as t7', 't4.region_id', 't7.id')
                                ->leftJoin('par_modesof_transport as t8', 't1.modesof_transport_id', 't8.id')
                                ->leftJoin('par_ports_information as t9', 't1.port_id', 't9.id')
                                ->leftJoin('par_narcoticsdrug_types as t10', 't1.narcoticsdrug_type_id', 't10.id')
                                ->leftJoin('tra_managerpermits_review as t11', 't1.application_code', 't11.application_code')
                                ->select(DB::raw("t1.reference_no,t10.name as drug_type, t2.postal_address, t7.name as importer_region,t6.name as importer_country , t4.physical_address as imp_address, t4.postal_address as imp_postal  ,t8.name as transporationmode, date_format(t1.date_added,'%Y-%m-%d') as date_registered, date_format(t1.proforma_invoice_date,'%Y-%m-%d') as invoice_date, t2.telephone_no as tel, t1.*,date_format(t1.proforma_invoice_date,'%Y-%m-%d') as invoice_date,proforma_invoice_no as invoice_no,  t1.applicant_id, t2.name , t5.name as country, t3.name as  region, t2.physical_address as phyAddr, t2.email, t4.id as importer_id, t4.name as importer_name, t9.name as port, t11.certificate_issue_date as permit_issue_date, t11.expiry_date"))
                                ->where('t1.application_code',$application_code)
                                ->first();
                            
                                if($record){
                                    $reference_no = $record->reference_no;
                                    PDF::setPrintHeader(false);
                                    PDF::setPrintFooter(false);
                                    //PDF::AddPage();
                                    $data = (array)$record;
            $logo = getcwd() . '/resources/images/org-logo.jpg';
                                    $this->getNarcorticPermheader('Narcotic Drugs Permit Details',$reference_no);
                                    PDF:: SetFont('', 'B', 12);
                                    PDF::Cell(0,6,'Certificate of Official Approval of Import',0,1,'C');
                                    PDF:: SetFont('', 'I', 10);
                                    PDF::Cell(0,6,'(Section 78 (1) Food Drug and Cosmetic Act, 2003)',0,1,'C');
                                    PDF:: SetFont('', '', 10);
                                    PDF::Cell(0,2,'',0,1);
                                    PDF::MultiCell(0,5,'I, being the person with the administration of the law relating to '.$data['drug_type'].' to which the International Convention on Precursors apply, hereby certify that I have approved the importation by: -',0,'','',1);
                                    
                                    PDF::Cell(0,2,'',0,1);
                                    PDF::Cell(15);
                                    PDF:: SetFont('', 'B', 10);
                                    
                                    PDF::MultiCell(0,5,$data['name'].', '.$data['phyAddr'].', '.$data['postal_address'].', '.$data['region'].', '.$data['country'] ,0,'','',1);
                                    PDF:: SetFont('', '', 10);
                                    PDF::Cell(5);PDF::Cell(0,6,'Of:',0,1);
                                    PDF:: SetFont('', 'B', 11);
                                    $records = DB::table('tra_narcoticimport_products as t1')
                                            ->leftJoin('par_controlled_drugsdetails as t3', 't1.narcotics_product_id','=','t3.id')
                                            ->leftJoin('par_currencies as t5', 't1.currency_id','=','t5.id')
                                            ->leftJoin('par_packaging_units as t7', 't1.packaging_unit_id','=','t7.id')
                                            
                                            ->leftJoin('par_dosage_forms as t8', 't1.dosage_form_id','=','t8.id')
                                            
                                            ->leftJoin('par_specification_types as t9', 't1.specification_type_id','=','t9.id')
                                            ->leftJoin('par_common_names as t12', 't1.common_name_id','=','t12.id')
                                            ->leftJoin('par_currencies as t13', 't1.currency_id','=','t13.id')
                                            ->select(DB::raw("t1.*, t1.section_id,t3.name as brand_name,t12.name as common_name, t7.name as packaging_units, t5.name as currency_name, t8.name as dosage_formname,t13.name as currency,  t9.name as specification_type_name, (unit_price*quantity) as  total_value"))
                                            ->where(array('t1.application_code' => $application_code))
                                            ->get();
                                    
                                    if($records){
                                        
                                        $i = 1;
                                        foreach($records as $rows){
                                            PDF::Cell(15);
                                            if($rows->product_strength == ''){
                                                $imp_data = $i.'. '.$rows->brand_name.' '.$rows->dosage_formname .' '.$rows->strength.' in '.$rows->packaging_size.' '.$rows->packaging_units.' ('.$rows->common_name.') * '.$rows->quantity; 
                                            
                                            }
                                            else{
                                                $imp_data = $i.'. '.$rows->brand_name.' '.$rows->dosage_formname .' '.$rows->product_strength; 
                                            
                                            }
                                            PDF::MultiCell(0,6,$imp_data,0,'','',1);
                                            
                                            $i++;
                                        }
                                    }
                                
                                    PDF::Cell(15);
                                    PDF::MultiCell(0,5,'As per the Invoice number '.$data['invoice_no'].' dated '.date('d/m/Y',strtotime($data['invoice_date'])),0,'','',1);
                                    PDF::Cell(0,2,'',0,1);
                                    PDF:: SetFont('', '', 11);
                                    PDF::Cell(15,6,'From:',0,0);
                                    PDF:: SetFont('', 'B', 11);
                                    PDF::MultiCell(0,5,$data['importer_name'].', '.$data['imp_address'].', '.$data['imp_postal'].', '.$data['importer_region'].', '.$data['importer_country'] ,0,'','',1);
                                         PDF:: SetFont('', '', 11);
                                    PDF::Cell(0,2,'',0,1);
                                    PDF::Cell(30,5,'Subject to conditions that: -',0,0);
                                    PDF::ln();
                                    PDF::Cell(10);
                                    $permit_issue_date = $data['permit_issue_date'];
                                    $to_date = date('M d, Y', strtotime("$permit_issue_date +6 month"));
                                                
                                    PDF::Cell(0,8,'i.    The consignment shall be imported before the: '.$to_date,0,1);
                                    PDF::Cell(10);
                                    PDF::MultiCell(0,8,'ii. The consignment shall be imported by '.$data['transporationmode'].' through '.$data['port'] ,0,'','',1);
                                    
                                    PDF::ln();
                                    $for_state = ' ';//4450 - 6050 2k 
                                    PDF::Cell(125,6,'................................................',0,0);
                                    
                                    
                                      PDF:: SetFont('', 'B', 11);
                                    PDF::Cell(0,6,'...................................................',0,1,'C');
                                      PDF:: SetFont('', '', 11);
                                      PDF::Cell(35,6,'Date',0,0,'C');   
                                    PDF::Cell(85);
                                    PDF::Cell(0,6,'Signature and Stamp',0,1,'C');   
                                    PDF::Cell(125);
                                    PDF::Cell(0,6,$for_state.'Director General,  UGANDA Medicines ',0,1,'C');    PDF::Cell(125);
                                    PDF::Cell(0,6,'and Medical Devices Authority',0,1,'C');
                                    
                                    PDF::ln();
                                    PDF::ln();
                                    PDF:: SetFont('', 'B', 9);
                                    PDF::MultiCell(0,8,'This document is solely for production to the Government of the country from which the substances are proposed to be obtained.' ,0,'','',1);
                                    
                                    PDF::Output('Narcotic Drug Permit.pdf');
                                    
                                    
                                }
            
                            
                            
                            return;
                        } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                        } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                        }
                        print_r($res);
        }
    
            public function printRetentionPaymentsStatement(Request $req){
            try{
                PDF::setPrintHeader(false);
                PDF::setPrintFooter(false);
                PDF::AddPage('L');
                $applicant_id = $req->applicant_id;
                $section_id = $req->section_id;
                $retention_yearfrom = $req->retention_yearfrom;
                $retention_yearto = $req->retention_yearto;
                
                $trans_datefrom = $req->trans_datefrom;
                $trans_dateto = $req->trans_dateto;
                
                $trader_ids = $req->input('trader_ids');
        $applicant_ids = explode(',',$trader_ids);
$applicant_record =DB::table('wb_trader_account as t1')
                                    ->leftJoin('par_regions as t2', 't1.region_id', 't2.id')
                                    ->leftJoin('par_countries as t3', 't1.country_id', 't3.id')
                                    ->select('t1.name as applicant_name', 't2.name as region_name', 't3.name as country_name', 't1.postal_address')
                                    ->whereIn('t1.id',$applicant_ids)
                                    ->first();

                                    $retention_payments = DB::table("tra_product_retentions as t1")
                                    ->select(DB::raw("t4.reference_no,t1.id as retention_id,t2.id as reg_product_id , t2.registration_no as certificate_no, YEAR(t1.retention_year) AS retention_year,t5.PayCtrNum as payment_controlno, t3.brand_name,t4.invoice_no,t5.trans_date,t5.receipt_no , t4.PayCntrNum, t7.name AS currency, (t5.amount_paid) AS amount_paid,t5.exchange_rate , SUM(t5.amount_paid*t5.exchange_rate) AS amount_paidths, t8.name AS retention_status,t9.name as applicant_name, t4.applicant_id"))
                                    ->join("tra_registered_products as t2",'t1.reg_product_id','=','t2.id')
                                    ->join("tra_product_information as t3",'t2.tra_product_id','=','t3.id')
                                    ->join("tra_application_invoices as t4",'t1.invoice_id','=','t4.id')
                                    ->join("tra_product_retentionspayments as t10",'t1.invoice_id','=','t10.retentioninvoice_id')
                                    ->join("tra_payments as t5",'t10.retention_receipt_id','=','t5.id')
                                    ->join("par_currencies as t7",'t5.currency_id','=','t7.id')
                                    ->join("par_retention_statuses as t8",'t1.retention_status_id','=','t8.id')
                                    ->leftJoin("wb_trader_account as t9",'t4.applicant_id','=','t9.id')
                                     ->groupBy('t5.invoice_id')
                                    ->whereIn('t4.applicant_id',$applicant_ids);
                        
/*
    if(validateIsNumeric($retention_yearto)){
        $retention_payments->whereRaw(" YEAR(t1.retention_year) <= '".$retention_yearto."'");
        
    }
    if(validateIsNumeric($retention_yearfrom)){
        $retention_payments->whereRaw(" YEAR(t1.retention_year) >= '".$retention_yearfrom."'");
        
    }
    */
     if( $retention_yearfrom != '' &&  $retention_yearto != ''){
                $where_filterdates  = " YEAR(t1.retention_year) BETWEEN '".$retention_yearfrom."' and  '".$retention_yearto."'";
            }
    if(validateIsNumeric($applicant_id)){
        $retention_payments->where('t4.applicant_id',$applicant_id );
    }
    $where_filterdates = '';
    if( $trans_dateto != '' &&  $trans_datefrom != ''){
            $where_filterdates  = " date_format(t5.trans_date, '%Y-%m-%d') BETWEEN '".$trans_datefrom."' and  '".$trans_dateto."'";
    }
    if ($where_filterdates != '') {
        $retention_payments->whereRAW($where_filterdates);
}
$retention_payments = $retention_payments->get();
PDF::setPrintHeader(false);
PDF::setPrintFooter(false);

PDF::SetFont('','B',11);
$this->getReportheaderlandscape('Retention Payment Receipt'); 

PDF::Cell(0,2,'',0,1);
//PDF::Cell(117);
PDF::SetFont('','',11);
PDF::Cell(0,4,'Print Date: '.date('d/m/Y'),0,1,'R');
PDF::SetFont('','B',10);
//PDF::Cell(0,3,'',0,1);

PDF::Cell(52,3,"Customer's Name: ",0,0,'L');
PDF::SetFont('','',10);
PDF::Cell(100,5,$applicant_record->applicant_name,0,1,'L');
PDF::SetFont('','B',10);

PDF::Cell(52,3,"Address: ",0,0,'L');
PDF::SetFont('','',10);

PDF::Cell(100,3,$applicant_record->postal_address.','.$applicant_record->region_name.', '.$applicant_record->country_name,0,1,'L');

if($retention_payments){

        PDF::Cell(0,2,'',0,1,'L');
    
        PDF::SetFont('','B',9);
        //PDF::Cell(10);
                
        $data=array();
        //reg_product_id 
        $tot_rec_inv=0;
        $tot_inv_usd=0;
        $tot_inv_tshs=0;
        //the headings retention_invoices 
        PDF::MultiCell(7, 8, 'No',1,'','',0);
                            PDF::MultiCell(35, 8, 'Reference No',1,'','',0);    
                            
                            PDF::MultiCell(35, 8, 'Registration No',1,'','',0);
                            PDF::MultiCell(40, 8, 'Brand Name',1,'','',0);
                            PDF::MultiCell(25, 8, 'Invoice No',1,'','',0);
                            PDF::MultiCell(20, 8,'Receipt No',1,'','',0);
                            PDF::MultiCell(25, 8,'Trans Date:',1,'','',0);
                            PDF::MultiCell(30, 8,'Payment Control Number:',1,'','',0);
                            PDF::MultiCell(20, 8,'Currency',1,'','',0);
                            PDF::MultiCell(0, 8,'Amount',1,'','',1);
                            //PDF::MultiCell(0, 8, 'Amount(tsh)',1,'','',1);

                                    $i = 1;
                                    $dimensions = PDF::getPageDimensions();
                            $hasborder = false;

                            $currency_usd = '';
                            $currency_tshs = '';

                                    foreach($retention_payments as $retention_invoice){
                                        
                                    PDF::SetFont('','',9);
                                        $row = $retention_invoice;
                                        $reg_product_id = $retention_invoice->reg_product_id;
                                        $retention_id = $retention_invoice->retention_id;

                                                            $reference_no = $retention_invoice->reference_no;
                                                            $invoice_no = $retention_invoice->invoice_no;
                                                            $trans_date = $retention_invoice->trans_date;
                                                            $currency = $retention_invoice->currency;
                                                            $exchange_rate = $retention_invoice->exchange_rate;
                                                            $amount_paid = $retention_invoice->amount_paid;
                                                            $amount_in_tsh = $retention_invoice->amount_paidths;
                                                            $payment_controlno = $retention_invoice->payment_controlno;
                                                            //get invoice desription
                                                            
                                                            $receipt_no = $retention_invoice->receipt_no;
                                                            $retention_year =$retention_invoice->retention_year;
                                                            //get the product details 
                                                            $brand_name = $retention_invoice->brand_name;
                                                            $certificate_no = $retention_invoice->certificate_no;
                                                            
                                                            $rowcount = 0;
                                                            
                                                                $rowcount = 0;
                                                                    
                                                                    $rowcount = max(PDF::getNumLines($brand_name, 45),PDF::getNumLines($invoice_no, 35),PDF::getNumLines($amount_in_tsh, 30),PDF::getNumLines($certificate_no, 35),PDF::getNumLines($receipt_no, 20),PDF::getNumLines($payment_controlno, 35));
                                                                    
                                                                    $startY = PDF::GetY();
                                                                    if (($startY + $rowcount * 5) + $dimensions['bm'] > ($dimensions['hk'])) {
                                                
                                                                        if ($hasborder) {
                                                                            $hasborder = false;
                                                                        }else {
                                                                            PDF::Ln();
                                                                            PDF::Cell(0,5,'','T'); 
                                                                            PDF::Ln();
                                                                        }
                                                                        $borders = 'LTR';
                                                                    } elseif ((ceil($startY) + $rowcount * 5) + $dimensions['bm'] == floor($dimensions['hk'])) {
                                                                        
                                                                        $borders = 'LRB';   
                                                                        $hasborder = true; 
                                                                    } else {
                                                                        //normal cell
                                                                        $borders = 'LR';
                                                                    }


                                                                PDF::MultiCell(7, $rowcount* 5, $i,1,'','',0);
                                                                PDF::MultiCell(35, $rowcount* 5, $reference_no,1,'','',0);
                                                                PDF::MultiCell(35, $rowcount* 5, $certificate_no,1,'','',0);
                                                                PDF::MultiCell(40, $rowcount* 5, $brand_name,1,'','',0);
                                                                
                                                                PDF::MultiCell(25, $rowcount* 5, $invoice_no,1,'','',0);
                                                                PDF::MultiCell(20,  $rowcount* 5, $receipt_no,1,'','',0);
                                                                PDF::MultiCell(25, $rowcount* 5, formatDate($trans_date),1,'','',0);
                                                                PDF::MultiCell(30, $rowcount* 5, $payment_controlno,1,'','',0);
                                                                PDF::MultiCell(20, $rowcount* 5,  $currency,1,'','',0);
                                                                PDF::MultiCell(0, $rowcount* 5,formatMoney($amount_paid) ,1,'','',1);
                                                                //PDF::MultiCell(0, $rowcount* 5, formatMoney($amount_in_tsh),1,'','',1);
                                                        
                                                        $currency_tshs = $currency;
                                                                $tot_inv_tshs = $tot_inv_tshs+$amount_paid;
                                                                
                                                        $i = $i+1;
                                                
                                    }
                                    
                                    PDF::SetFont('','B',9);
                                    PDF::Cell(35);
                                                            
                                                            PDF::Cell(187);
                                                            PDF::Cell(25,5,'Total: '.$currency_tshs,0,0);
                                                            PDF::Cell(5);
                                                            PDF::Cell(20,5,formatMoney($tot_inv_tshs),'T',0);
                                                            PDF::Cell(0,5,'',0,1);
                                    
                                    PDF::SetFont('','',10);
                                    PDF::Ln();
                                    //PDF::Cell(10);
                                    PDF::MultiCell(0,6,'1.We declare that this payments shows the actual details for the Paid Product retention Invoices.',0,'L');
                                
                                    
                                    PDF::Cell(0,3,'',0,1);
                                    
                                    PDF::Cell(0,3,'',0,1);
                                
                                    PDF::Cell(0,6,'',0,1);
                                    


                            }

                            PDF::Output('Retention Payment Receipt.pdf');


                            return;
                            } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                            } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                            }
                            print_r($res);

        }
        public function printPremisesInspectionSchedules(Request  $req){
            
                            try{
                                $inspection_id = $req->inspection_id;
                                PDF::setPrintHeader(false);
                                PDF::setPrintFooter(false);
                                PDF::AddPage('L');
                                PDF::setPrintHeader(false);
                                PDF::setPrintFooter(false);
                                
                                PDF::SetFont('','B',11);
                                $this->getReportheaderlandscape('Premises Inspection Report'); 
                                
                                PDF::Cell(0,2,'',0,1);
                                //PDF::Cell(117);
                                PDF::SetFont('','',11);
                                PDF::Cell(0,4,'Print Date: '.date('d/m/Y'),0,1,'R');
                                PDF::SetFont('','B',10);
                                //PDF::Cell(0,3,'',0,1);
                                $qry = DB::table('tra_premise_inspection_details')->where('id',$inspection_id);
                                $results = $qry->first();
                                if($results){
                                    PDF::Cell(60,7,"Inspection Ref: ",0,0,'L');
                                    PDF::SetFont('','',10);
                                    PDF::Cell(0,7,$results->inspection_reference_no,0,1,'L');
                                    PDF::SetFont('','B',10);
                                    
                                    PDF::Cell(60,5,"Inspection Description/Remarks: ",0,0,'L');
                                    PDF::SetFont('','',10);
                                
                                    PDF::MultiCell(0,7 ,$results->description,0,'','',1);
                                    PDF::SetFont('','B',10);
                                    
                                    PDF::Cell(52,7,"Date Of Inspection: ",0,0,'L');
                                    PDF::SetFont('','',10);
                                    PDF::Cell(0,7,formatDaterpt($results->start_date).'-'.formatDaterpt($results->end_date),0,1,'L');
                                    PDF::SetFont('','B',10);
                                    //inspectioned premises
                                    PDF::SetFont('','B',10);
                                    PDF::Cell(10,6,"Sn ",1,0,'L');
                                    PDF::Cell(40,6,"Premises Name ",1,0,'L');
                                    PDF::Cell(25,6,"Region Name ",1,0,'L');
                                    PDF::Cell(25,6,"District ",1,0,'L');
                                    PDF::Cell(40,6,"Physical Address ",1,0,'L');
                                    PDF::Cell(30,6,"Inspection Dates",1,0,'L');
                                    PDF::Cell(30,6,"Inspection Type ",1,0,'L');
                                    PDF::Cell(0,6,"Recommendation ",1,1,'L');
                                    $records = DB::table('tra_premises as t2')
                                        ->leftJoin('tra_premises_applications as t1', 't1.premise_id', '=', 't2.id')
                                        ->leftJoin('wb_trader_account as t3', 't1.applicant_id', '=', 't3.id')
                                        ->leftJoin('par_system_statuses as t4', 't1.application_status_id', '=', 't4.id')
                                        ->leftJoin('tra_approval_recommendations as t5', function ($join) {
                                            $join->on('t1.id', '=', 't5.application_id')
                                                ->on('t1.application_code', '=', 't5.application_code');
                                        })
                                        ->leftJoin('par_approval_decisions as t6', 't5.decision_id', '=', 't6.id')
                                        ->leftJoin('tra_premiseinspection_applications as t7', function ($join) use ($inspection_id) {
                                            $join->on('t1.application_code', '=', 't7.application_code');
                                        })
                                        ->leftJoin('par_business_types as t10', 't2.business_type_id', '=', 't10.id')
                                        ->leftJoin('par_regions as t11', 't2.region_id', '=', 't11.id')
                                        
                                        ->leftJoin('par_districts as t12', 't2.district_id', '=', 't12.id')
                                        ->leftJoin('par_inspection_types as t14', 't7.inspection_type_id', '=', 't14.id')
                                        
                                        ->leftJoin('par_premiseinspection_recommendations as t15', 't7.recommendation_id', '=', 't15.id')
                                        ->leftJoin('tra_premlegalityofstocked_products as t16', 't16.application_id', '=', 't1.id')
                                        ->select('t1.*','t2.physical_address','t11.name as region_name','t12.name as district_name', 't2.name as premise_name', 't2.business_type_id', 't3.name as applicant_name', 't4.name as application_status','t7.actual_start_date','t7.actual_end_date','t16.has_illegal_stock','t16.legalitystock_remarks',
                                            't10.name as business_type','t7.id as app_inspection_id', 't7.inspection_id','t7.recommendation_id','t14.name as inspection_type','t15.name as inspection_recommendation',  't6.name as approval_status', 't5.decision_id', 't1.id as active_application_id')
                                        ->where(array('t7.inspection_id'=>$inspection_id))
                                        ->groupBy('t1.id')
                                        ->get();
                                    if($records){
                                        PDF::SetFont('','',10);
                                        $i = 1;
                                            foreach($records as $rows){
                                                $rowcount = max(PDF::getNumLines($rows->premise_name, 40),PDF::getNumLines($rows->physical_address, 40),PDF::getNumLines($rows->inspection_type, 30));
                                            
                                                PDF::MultiCell(10,$rowcount * 6,$i.'. ',1,'','',0);
                                                PDF::MultiCell(40,$rowcount * 6,$rows->premise_name,1,'','',0);
                                                PDF::MultiCell(25,$rowcount * 6,$rows->region_name,1,'','',0);
                                                PDF::MultiCell(25,$rowcount * 6,$rows->district_name,1,'','',0);
                                                PDF::MultiCell(40,$rowcount * 6,$rows->physical_address,1,'','',0);
                                                PDF::MultiCell(30,$rowcount * 6,formatDaterpt($rows->actual_start_date).'-'.formatDaterpt($rows->actual_end_date),1,'','',0);
                                                PDF::MultiCell(30,$rowcount * 6,$rows->inspection_type,1,'','',0);
                                                PDF::MultiCell(0,$rowcount * 6,$rows->inspection_recommendation,1,'','',1);
                                                
                                                $i++;
                                                
                                            }
                                        //$premise_name 
                                    }
                                }
                                
                                PDF::OutPut('Premises Inspection Report');
                            return;
                                            
                            
                            
                            } catch (\Exception $exception) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $exception->getMessage()
                            );
                            } catch (\Throwable $throwable) {
                            //DB::rollBack();
                            $res = array(
                                'success' => false,
                                'message' => $throwable->getMessage()
                            );
                            }
                            print_r($res);
        }
        public function generateDisposalpermit(Request $req){
            try {

                    $application_code = $req->application_code;
                    $this->printDisposalCertificate($application_code);
                        return;
                        } catch (\Exception $exception) {
                        //DB::rollBack();
                        $res = array(
                            'success' => false,
                            'message' => $exception->getMessage()
                        );
                        } catch (\Throwable $throwable) {
                        //DB::rollBack();
                        $res = array(
                            'success' => false,
                            'message' => $throwable->getMessage()
                        );
                        }
                        print_r($res);
}
public function generatePromotionalRegCertificate(Request $req){
                    try{ 



                        $application_code = $req->application_code;
                                $logo=getcwd().'/assets/images/logo.jpg';
                                
                                PDF::setPrintHeader(false);
                                PDF::AddPage();
                                
                                PDF::setPrintHeader(false);
                                PDF::setPrintFooter(false);
                                
                                PDF::SetFont('','',13);
                                
                                PDF::SetFont('','B',13);
                                        
                                        PDF::SetFont('','B',14);
                                        PDF::setPrintHeader(false);
                                        PDF::setPrintFooter(false);
                                $this->getReportsletterheader();

                                
                                $records = DB::table('tra_promotion_adverts_applications as t1')
                                                        ->leftJoin('par_system_statuses as q', 't1.application_status_id', '=', 'q.id')
                                                        ->leftJoin('tra_approval_recommendations as t2','t1.application_code', 't2.application_code')
                                                        ->join('wb_trader_account as t3', 't1.applicant_id', 't3.id')
                                                        ->leftJoin('par_countries as t4', 't3.country_id', 't4.id')
                                                        ->leftJoin('par_regions as t5', 't3.region_id', 't5.id')
                                                        ->leftJoin('par_sections as t6', 't1.section_id', 't6.id')
                                                        ->select(DB::raw("t2.decision_id as recommendation_id, t1.*, t3.name as applicant_name, t3.physical_address, t3.postal_address, t4.name as country_name, t5.name as region_name,t6.name as section_name, t1.id as application_id, t2.expiry_date "))
                                                        ->where('t1.application_code',$application_code)
                                                        ->first();

                                                                                       if($records){
                                    $row = $records;
                                    $recommendation_id = $row->recommendation_id;
                                    $ref = $row->reference_no;
                                    $applicant_name = $row->applicant_name;
                                    $physical_address = $row->physical_address;
                                    $postal_address = $row->postal_address;
                                    $region_name = $row->region_name;
                                    $country_name = $row->country_name;
                                    $section_id = $row->section_id;
                                    $section_name = $row->section_name;
                                    $expiry_date = $row->expiry_date;
                                    //$intended_user = $row->intended_user;
                                    $application_id = $row->application_id;


                                
                                    PDF::SetFont('','',11);
                                        PDF::Cell(0,20,'',0,1);
                                        PDF::Cell(60,5,'Ref.:'.$ref,0,0);
                                        PDF::Cell(0,5,'Date.:'.date('Y-m-d'),0,1,'R');
                                            PDF::ln();
                                            PDF::Cell(0,5,$applicant_name,0,1);
                                            PDF::Cell(7,5,'',0,0);
                                            PDF::Cell(0,5,$physical_address,0,1);
                                            PDF::Cell(7,5,'',0,0);
                                            PDF::Cell(0,5,$postal_address,0,1);
                                            PDF::Cell(7,5,'',0,0);
                                            PDF::Cell(0,5,$row->region_name.','.$row->country_name,0,1);
                                        //local agent
                                        PDF::ln();
                                        if($section_id == 2){
                                            $section_name = 'medicines';
                                        }
                                        PDF::SetLineWidth(3);
                                            PDF::SetFont('','B',11);
                                            if($recommendation_id == 1){
                                                
                                                PDF::Cell(7,7,'RE: APPLICATION FOR APPROVAL OF PROMOTIONAL MATERIAL FOR '.strtoupper($section_name),0,0);
                                            }
                                            else{
                                                PDF::Cell(7,7,'RE: REFUSAL OF APPLICATION FOR PROMOTIONAL MATERIAL FOR '.strtoupper($section_name),0,0);
                                            
                                            }
                                            PDF::SetFont('','',11);
                                            PDF::ln();
                                            PDF::ln();
                                            PDF::MultiCell(0,5,'1. This is in reference to your application with reference number '.$ref.' for approval of promotional material for medicinal product(s)'.".\n" ,0, 'J', 0, 1, '', '', true);
                                            PDF::Cell(7,5,'',0,1);
                                        $material_rec = DB::table('tra_promotion_materials_details as t1')
             
                                                ->join('par_promotion_material_items  as t2','t1.material_id','=','t2.id')
                                                ->select(DB::raw("group_concat(concat(t2.name) separator ' / ') as promotion_material")) 
                                                ->where('t1.application_id',$application_id)
                                                ->first();
                                        
                                            $promotion_material = '';
                                            if($material_rec){
                                                $promotion_material = $material_rec->promotion_material;
                                                
                                            }
                                           
                                            PDF::MultiCell(0,5,'2. We would like to inform you that information presented in the '.$promotion_material.' intended for promotion of  your product(s) as summarized in the table below has been assessed and found to comply with legal requirements for conducting medicines promotional  activities in the country as prescribed in the  UGANDA DRUGS  AUTHORITY (Control of Drugs and Herbal Drugs Promotion) Regulations, 2010'.".\n" ,0, 'J', 0, 1, '', '', true);
                                            PDF::Cell(7,5,'',0,1);
                                            
                                            $adverttype_rec =DB::table('tra_promotion_prod_particulars as t1')
                                                    ->leftJoin('par_common_names as t2','t1.common_name','=','t2.id')
                                                    ->leftJoin('par_product_categories as t3','t1.product_category_id','=','t3.id')
                                                    ->leftJoin('par_subproduct_categories as t4','t1.product_subcategory_id','=','t4.id')
                                                    ->leftJoin('par_advertisement_types as t5','t1.type_of_advertisement_id','=','t5.id')
                                                    ->select(DB::raw('t1.*,t3.name as product_category_name,t4.name as product_subcategory_name,t5.name as type_of_advertisement, t2.name as common_name'))
                                                    ->where('t1.application_id',$application_id)
                                                    ->get();
                                                $tbl = '
                                                <table width="100%" cellspacing="0" cellpadding="1" border = "0.4" >
                                                    <tr style="font-weight:bold;" >
                                                        <td width="5%">S/n</td>
                                                        <td width="30%">Brand Name</td>
                                                        <td width="31%">Generic Name</td>
                                                        <td width="19%" >Advertisement Type</td>
                                                        <td width="14%">Registration Number</td>
                                                    </tr>';
                                                    $i= 1;
                                            if($adverttype_rec){
                                                foreach($adverttype_rec as $rows1){
                                                    $tbl .= '<tr style="font-weight:normal;" >
                                                            <td width="5%">'.$i.'</td>
                                                            <td width="30%" stype="">'.$rows1->brand_name.'</td>
                                                            <td width="31%">'.$rows1->common_name.'</td>
                                                            <td width="19%">'.$rows1->type_of_advertisement.'</td>
                                                            <td width="14%">'.$rows1->registration_no.'</td>
                                                        </tr>';
                                                    $i++;
                                                }
                                                
                                            }
                                            $tbl .= "</table>
                                            ";
                                            PDF::writeHTML($tbl, true, false, false, false, '');
                                            
                                    if($recommendation_id == 1){
                                        //the data 
                                            
                                            PDF::MultiCell(0,5,'3. Approval is hereby granted for use of promotion of your product(s), as long as the product(s) continue to comply with registration requirements as prescribed in the  UGANDA DRUGS  AUTHORITY Act, Cap 219. Validity of this permit expires on '.date('d-m-Y', strtotime($expiry_date)).".\n" ,0, 'J', 0, 1, '', '', true);
                                            PDF::Cell(7,5,'',0,1);
                                            
                                    }
                                    else{
                                            PDF::MultiCell(0,5,"3.  The advert has not been approved due to the following reason(s):-.\n" ,0, 'J', 0, 1, '', '', true);
                                            PDF::Cell(7,5,'',0,1);
                                            PDF::MultiCell(0,5,"4.  Note that the material should neither be imported nor used in the country for promotional purposes.\n" ,0, 'J', 0, 1, '', '', true);
                                            
                                    }
                                    PDF::Cell(0,5,'We thank you for your cooperation',0,1);
                                    PDF::ln();
                                    $permit_signitory = '';
                                                        $title= ''; PDF::ln();
                                                        $approved_by= '';
                                                        $startY = PDF::GetY();
                                                        $startX = PDF::GetX();
                                                    
                                                        $signiture = getcwd() . '/resources/images/signatures/hi0kag.png';
                                                        PDF::Image($signiture,$startX,$startY-7,30,12);
                                                        PDF::SetFont('','B',11);
                        
                                                        PDF::SetFont('','B',12);
                                                        PDF::Cell(0,8,'...................................................',0,1,'');
                                                        
                                                            //PDF::Cell(0,8, ucwords(strtolower('A. M. Fimbo')),0,1,'');
                                                            
                                                            PDF::Cell(0,8,'DIRECTOR GENERAL',0,1,'');
                                                
                                }
                                    PDF::Output("Promotional Advertisement.pdf");
    
                        return;
                        } catch (\Exception $exception) {
                                //PDF::rollBack();
                                $res = array(
                                    'success' => false,
                                    'message' => $exception->getMessage()
                                );
                        } catch (\Throwable $throwable) {
                                //PDF::rollBack();
                                $res = array(
                                    'success' => false,
                                    'message' => $throwable->getMessage()
                                );
                        }
                        print_r($res);



}
public function getServiceCharterReportDetails(Request $req){
        try{
            $data = array();
                $module_id = $req->module_id;
                $service_type_id  = $req->service_type_id;
                $section_id = $req->section_id;
                $zone_id = $req->zone_id;
                $received_from = $req->received_from;
                $received_to = $req->received_to;
                $service_charterdata = array();
                $records = DB::table('par_servicecharter_configurations as t1')
                                        ->leftJoin('par_service_types as t2', 't1.service_type_id', 't2.id')
                                        ->leftJoin('modules as t3', 't1.module_id', 't3.id')
                                        ->select('t1.*', 't3.name as module_name','t1.standard_of_delivery as standard_servicedelivery', 't2.name as servicetype_details');
                    
                if(validateIsNumeric($module_id)){
                    $records->where('t1.module_id',$module_id);

                }
                if(validateIsNumeric($service_type_id)){
                    $records->where('service_type_id',$service_type_id);
                    
                }   
                $records = $records->where('t1.is_enabled',1)->get();
                            
                if($records){
                        foreach($records as $rec){
                            $sections_details = $rec->service_sections;
                            $service_type_id = $rec->service_type_id;
                            $received_app = $this->getApplicationqueryapps($req,$service_type_id,$section_id,$received_from,$received_to,1);
                            
                            
                            if(!is_numeric($received_app)){
                                    $received_app = $this->returnappCounter($received_app);
                            }
                            //queried with no response sections_details

                            $queriednoresponse_apps = (int)$this->getApplicationqueryapps($req,$service_type_id,$section_id,$received_from,$received_to,3,$rec->standard_servicedelivery);
                            if(!is_numeric($queriednoresponse_apps) && $queriednoresponse_apps != ''){
                                $queriednoresponse_apps = $this->returnappCounter($queriednoresponse_apps);
                            
                            }
                            
                            $complied_apps = $this->getApplicationqueryapps($req,$service_type_id,$section_id,$received_from,$received_to,2,$rec->standard_servicedelivery);
                            if(!is_numeric($complied_apps)){
                                    
                                    $complied_apps = $this->returnappCounter($complied_apps);
                                
                            }
                            
                            $rate_of_complaice = 0;
                            $noncomplied_apps = ($received_app)-$complied_apps;
                            if($received_app != 0 && $complied_apps != 0){
                                                            $divide_by= ($received_app);
                                                            if($divide_by != 0){
                                                                    $rate_of_complaice = round(($complied_apps/$divide_by) * 100,2);//($complied_apps/$received_apps) * 100;
                            
                                                            }
                                
                            }
                            $data[] = array('standard_servicedelivery'=>$rec->standard_servicedelivery,
                                             'module_name'=>$rec->module_name,
                                             'servicetype_details'=>$rec->servicetype_details,
                                             'received_samples'=>$received_app,
                                             'complied_applications'=>$complied_apps,
                                             'queried_no_response'=>$queriednoresponse_apps,
                                             'non_complience_apps'=>$noncomplied_apps,
                                             'rate_of_complaince'=>$rate_of_complaice
                                             );
                            


                        }

                }
                $res = array(
                    'success' => true,
                    'results' => $data,
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
function returnappCounter($sql_statement){
    $count = 00;
    if(!validateIsNumeric($sql_statement)){
        $records = DB::select($sql_statement);

        if($records){
                $count = $records[0]->counter;
        }   
        
        
    }
    
    return $count;
}
function getApplicationqueryapps($req,$servicetype_details_id,$section_id,$received_from,$received_to,$option_id,$delivery_timeline = null,$min_value = null,$max_value = null){
    //for all the applciaitons as per their query and selected filter options //$option_id 1 for received, 2 for compiled
    $case_id ='';
    $$servicetype_details_id =''; 
    
    $zone_id = $req->zone_id;
    $where_zone = '';
    if(validateisNumeric($zone_id)){
        $where_zone = " and t1.zone_id = '".$zone_id."'";
        
    }
    $where_section = '';
    if(validateisNumeric($section_id)){
        $where_section = " and t1.section_id = '".$section_id."'";
        
    }
    switch($servicetype_details_id) {
        case 1:{
            //New of business permits for manufacturing medicines and medical devices 
            $table_name= 'tra_premises_applications'; 
            $grant_table = 'tra_approval_recommendations'; 
            $grant_datefield = 't2.approval_date'; 
            $where_business = " and t5.is_manufacturer = 1 and t1.sub_module_id =1";
                $sql_statement = 0;
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code inner join tra_premises_otherdetails t4 on t1.premise_id = t4.premise_id inner join par_business_types t5 on t4.business_type_id = t5.id where t2.trans_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone $where_business";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code inner join tra_premises_otherdetails t4 on t1.premise_id = t4.premise_id inner join par_business_types t5 on t4.business_type_id = t5.id where t3.trans_date BETWEEN '".$received_from."' AND '".$received_to."'  and TOTAL_WEEKDAYS(trans_date, $grant_datefield) <= $delivery_timeline  $where_section $where_zone  $where_business";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code inner join tra_premises_otherdetails t4 on t1.premise_id = t4.premise_id inner join par_business_types t5 on t4.business_type_id = t5.id where t3.trans_date BETWEEN '".$received_from."' AND '".$received_to."'  $check_timeline  $where_section $where_zone  $where_business";
                    
                }
                
                return $sql_statement;
                break;
        }
        case 2:{
            //New of business permits for manufacturing medicines and medical devices 
            $table_name= 'tra_premises_applications'; 
            $grant_table = 'tra_approval_recommendations'; 
            $grant_datefield = 't2.approval_date'; 
            $where_business = " and t5.is_manufacturer != 1 and t1.sub_module_id =1";
                $sql_statement = 0;
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code inner join tra_premises_otherdetails t4 on t1.premise_id = t4.premise_id inner join par_business_types t5 on t4.business_type_id = t5.id where t2.trans_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone $where_business";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code inner join tra_premises_otherdetails t4 on t1.premise_id = t4.premise_id inner join par_business_types t5 on t4.business_type_id = t5.id where t3.trans_date BETWEEN '".$received_from."' AND '".$received_to."'  and TOTAL_WEEKDAYS(trans_date, $grant_datefield) <= $delivery_timeline  $where_section $where_zone  $where_business";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code inner join tra_premises_otherdetails t4 on t1.premise_id = t4.premise_id inner join par_business_types t5 on t4.business_type_id = t5.id where t3.trans_date BETWEEN '".$received_from."' AND '".$received_to."'  $check_timeline  $where_section $where_zone  $where_business";
                    
                }
                
                return $sql_statement;
                break;
        }
        
        case 33:{
                $table_name= 'tra_premises_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 't2.approval_date'; 
                
                $submission_date = 'trans_date'; 
                $sql_statement = 0;
                if($option_id == 1){
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                }
                else if($option_id == 2){
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS(trans_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline $where_section $where_zone ";
                }
                return $sql_statement;
                break;
        }
        case 34:{
                $table_name= 'tra_gmp_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 't2.approval_date'; 
                
                $submission_date = 'trans_date'; 
                $sql_statement = 0;
                
                if($option_id == 1){
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                }
                else if($option_id == 2){
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS(trans_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline $where_section $where_zone ";
                }
                return $sql_statement;
                break;
        }
        case 35:{
            $table_name= 'tra_premises_applications'; 
            $grant_table = 'tra_approval_recommendations'; 
            $grant_datefield = 't2.approval_date'; 
            
                $sql_statement = 0;
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  where trans_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone and t1.sub_module_id = 2";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code  where trans_date BETWEEN '".$received_from."' AND '".$received_to."'  and TOTAL_WEEKDAYS(trans_date, $grant_datefield) <= $delivery_timeline  $where_section $where_zone  and t1.sub_module_id = 2";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code inner join tra_payments t3 on t1.application_code = t3.application_code where trans_date BETWEEN '".$received_from."' AND '".$received_to."'  $check_timeline  $where_section $where_zone  and t1.sub_module_id = 2";
                    
                }
                return $sql_statement;
                break;
        }
        
    
        case 7:{
                //Registration of medicinal products from domestic manufacturers. 
                $table_name= 'tra_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                $submission_date = 'trans_date';
                if($option_id == 1){
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  inner join tra_product_applications t3 on t1.product_id = t3.product_id where t3.product_type_id = 1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                
                }
                else if($option_id == 2){
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                
                }
                else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline $where_section $where_zone ";
                
                }
                else{
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  inner join tra_product_applications t3 on t1.product_id = t3.product_id where t3.product_type_id = 1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  $where_section $where_zone ";
                
                    
                }
                return $sql_statement;
            break;
                            }
        case 8:{
            //Registration of imported medicinal products.
                $table_name= 'tra_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                
                $submission_date = 'trans_date';
                if($option_id == 1){
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 2 and t1.section_id = 2  and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                
                }
                else if($option_id == 2){
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 2 and t1.section_id = 2  and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                
                }
                else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 2 and t1.section_id = 2  and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline $where_section $where_zone ";
                
                    
                }
                else{
                    $sql_statement=  "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 2 and t1.section_id = 2  and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                return $sql_statement;
            break;
                            }
        case 9:{
            //Registration of priority medicines
                $table_name= 'tra_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                
                $submission_date = 'trans_date';
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code   where t1.is_fast_track =1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code   where t1.is_fast_track =1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                
                } else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code   where t1.is_fast_track =1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline  $where_section $where_zone ";
                }
                else{
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  where t1.is_fast_track =1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone";
                
                }
                return $sql_statement;
            break;}
        case 10:{
                //Registration of complementary medicines
                $table_name= 'tra_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                $submission_date = 'trans_date';
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.classification_id in (1,383) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id where t3.classification_id in (1,383) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_zone ";
                
                }
                else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id where t3.classification_id in (1,383) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $check_timeline $where_zone ";
                
                }
                else{
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id where t3.classification_id in (1,383) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                return $sql_statement;
            break;
        }
        case 12:{
                //Registration of Class A medical devices
                $table_name= 'tra_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                $submission_date = 'trans_date';
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id  where t3.classification_id = 365 and $submission_date  BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id inner join payments t4 on t1.reference_no = t4.reference_no where t3.classification_id = 365 and $submission_date  BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date , $grant_datefield) <= $delivery_timeline  $where_section $where_zone ";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id  inner join tra_payments t4 on t1.application_code = t4.application_code where t3.classification_id = 365 and $submission_date  BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline  $where_section $where_zone ";
                    
                }
                else{
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id  inner join payments t4 on t1.reference_no = t4.reference_no where t3.classification_id = 365 and $submission_date  BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                return $sql_statement;
            break;}
        case 13:{
                //Registration of Class B, C and D medical devices
                $table_name= 'tr_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                $submission_date = 'trans_date';
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id  where t3.classification_id in (366,367,368) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id  inner join tra_payments t4 on t1.application_code = t4.application_code where t3.classification_id in (366,367,368) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline  $where_section $where_zone ";
                
                }
                else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id  inner join payments t4 on t1.application_code = t4.application_code where t3.classification_id in (366,367,368) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline  $where_section $where_zone ";
                
                    
                }
                else{
                    
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id  inner join payments t4 on t1.application_code = t4.application_code where t3.classification_id in (366,367,368) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  $where_section $where_zone ";
                
                }
                return $sql_statement;
            break;
        }
        
        case 16:{//renewal Medicinal products from domestic manufacturers. 
                $table_name= 'tra_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                $submission_date = 'submission_date';
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  inner join tra_product_applications t3 on t1.product_id = t3.product_id where t3.product_type_id = 1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_applications t3 on t1.product_id = t3.product_id where t3.product_type_id = 1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_applications t3 on t1.product_id = t3.product_id where t3.product_type_id = 1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline  $where_section $where_zone ";
                }
                else{
                 $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  inner join tra_product_applications t3 on t1.product_id = t3.product_id where t3.product_type_id = 1 and t1.section_id = 2 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                    
                    
                }
                return $sql_statement;
                break;
                
                }
        case 17:{//imported products
                $table_name= 'product_renewals'; 
                 $grant_table = 'evaluator_recommendations'; 
                $grant_datefield = 'added_on'; 
                
                
                $submission_date = 'submission_date';
                 if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 2 and t1.section_id = 2  and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 1 and t1.section_id = 2  and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 1 and t1.section_id = 2  and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline $where_section $where_zone ";
                
                    
                }
                else{
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  inner join tra_product_information t3 on t1.product_id = t3.id where t3.product_type_id = 1 and t1.section_id = 2  and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                return $sql_statement;
                 break;
                }
        case 18:{//renewal Complementary medicines (herbal medicines, antiseptics and disinfectants). 
                $table_name= 'tra_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                $submission_date = 'trans_date';
                 if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id where t1.sub_module_id = 8 and t3.classification_id in (1,383) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id where  t1.sub_module_id = 8 and t3.classification_id in (1,383) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id where  t1.sub_module_id = 8 and t3.classification_id in (1,383) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  $check_timeline $where_section $where_zone ";
                
                        
                }
                else{
                    
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  inner join products t3 on t1.product_id = t3.id where  t1.sub_module_id = 8 and t3.classification_id in (1,383) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                return $sql_statement;
                break;}
    
        case 20:{//renewal medical devices
                $table_name= 'tra_product_applications'; 
                $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                $submission_date = 'trans_date';
                 if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  where  t1.sub_module_id = 8 and t1.section_id = 4 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  where  t1.sub_module_id = 8 and t1.section_id = 4 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline  $where_section $where_zone ";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  where t1.section_id = 4 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  $check_timeline  $where_section $where_zone ";
                    
                }
                else{
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  where t1.section_id = 4 and $submission_date BETWEEN '".$received_from."' AND '".$received_to."'   $where_section $where_zone ";
                
                    
                }
                 return $sql_statement;

                break;
                 
                 }
        case 21:{//Issuance of clinical trial permits 
            $table_name= 'tra_clinical_trial_applications';
             $grant_table = 'granting_recommendations'; 
                $grant_datefield = 'approval_date'; 
                $submission_date = 'trans_date'; 
                if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline $where_section $where_zone ";
                    
                }
                else{
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code where $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                 return $sql_statement;
            
        break;}
        
        case 23:{//Variation of a registered medicine, cosmetics and medical devices 
                $table_name= 'tra_product_applications'; 
                    $grant_table = 'tra_approval_recommendations'; 
                $grant_datefield = 'approval_date'; 
                
                $submission_date = 'trans_date';
                 if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_payments t2 on t1.application_code = t2.application_code  where sub_module_id = 9 and t1.section_id in (2,3,4) and $submission_date  BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  where sub_module_id = 9 and t1.section_id in (2,4) and $submission_date  BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date , $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  where sub_module_id = 9 and t1.section_id in (2,4) and $submission_date  BETWEEN '".$received_from."' AND '".$received_to."'$check_timeline $where_section $where_zone ";
                }
                else{
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join tra_application_query_reftracker t2 on t1.application_code = t2.application_code  where  sub_module_id = 9 and t1.section_id in (2,4) and $submission_date  BETWEEN '".$received_from."' AND '".$received_to."' $where_section and t2.finished !=1 $where_zone ";
                
                }
                 return $sql_statement; 
                break;
        }
        case 24:{//Import and export permits of registered food, medicines, cosmetics and medical devices
                $table_name= 'tra_importexport_applications'; 
                $grant_table = 'tra_managerpermits_review'; 
                $grant_datefield = 'approval_date';
                $submission_date = 'submission_date';
                $sql_statement = '';
                 if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1  where  sub_module_id in (12,16) and  $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                    
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code   where sub_module_id in (12,16) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' and TOTAL_WEEKDAYS($submission_date , $grant_datefield) <= $delivery_timeline  $where_section $where_zone ";
                
                    
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code   where    sub_module_id in (12,16) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $check_timeline  $where_section $where_zone ";
                
                }
                
                return $sql_statement; 
                break;
        }
        case 25:{//Import and export permits of non-registrable products after receiving pre-shipment sample
            $table_name= 'tra_importexport_applications'; 
                $grant_table = 'tra_managerpermits_review'; 
                $grant_datefield = 'approval_date';
                $submission_date = 'submission_date';
                
                $sql_statement = '';
                 if($option_id == 1){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1  where sub_module_id in (13,14,15) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
                
                }
                else if($option_id == 2){
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  where sub_module_id in (13,14,15) and  $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
                
                }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement= "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.application_code = t2.application_code  where sub_module_id in (13,14,15) and $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  $check_timeline $where_section $where_zone ";
                
                }
                
                return $sql_statement; 
                break;
            }
        case 29:{//laboratory_samples
            $table_name= 'sample_applications'; 
            $grant_table = 'sample_compliance_recommendation'; 
                $grant_datefield = 'recommendation_date';
                
                $submission_date = 'reviewed_on';
                $sql_statement = '';
                $counter = '';
            if($option_id == 1){
                $sql_statement = "select count(DISTINCT t1.id) as counter from $table_name t1  where laboratory_no != '' and $submission_date BETWEEN '".$received_from."' AND '".$received_to."' $where_section $where_zone ";
            
            }
            else if($option_id == 2){
                
                $sql_statement = "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.sample_id = t2.sample_id  where  $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  and TOTAL_WEEKDAYS($submission_date, $grant_datefield) <= $delivery_timeline $where_section $where_zone ";
            
            }else if($option_id == 4){
                    $check_timeline = '';
                    if($max_value == 0){
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) >= $min_value";
                    }
                    else{
                        $check_timeline = " and TOTAL_WEEKDAYS($submission_date, $grant_datefield) BETWEEN $min_value AND $max_value";
                    }
                    $sql_statement = "select count(DISTINCT t1.id) as counter from $table_name t1 inner join $grant_table t2 on t1.sample_id = t2.sample_id  where  $submission_date BETWEEN '".$received_from."' AND '".$received_to."'  $check_timeline $where_section $where_zone ";
                    
                }
            if($sql_statement != ''){
                $sql_query = DB::connection('lims_db')->select($sql_statement);
                $counter = 0;
                if($sql_query){
                    $counter = $sql_query->counter;
                }
                
            }
        
            return $counter;
            break;
            }   
    }


}
public function funcPrintServiceCharterSectionsSummaryRpt(Request $req){
    try{
        PDF::setPrintHeader(false);
        PDF::setPrintFooter(false);
        PDF::AddPage('L');
        PDF::SetFont('times','B',13);
        
        $this->getReportheaderLandscape('SERVICE STANDARDS'); 
        $module_id = $req->module_id;
        $servicetype_details_id = $req->servicetype_details_id;
        $service_type_id = $req->service_type_id;
        $section_id = $req->section_id;
        $received_from = $req->received_from;
        $received_to = $req->received_to;
        PDF::Cell(0,2,'',0,1);
        //PDF::Cell(117);
        PDF::SetFont('times','',10);
        PDF::Cell(0,4,'Report for the Period: '.$received_from.' - '.$received_to,0,0,'');
        PDF::Cell(0,4,'Print Date: '.date('d/m/Y h:i:s a'),0,1,'R');
        PDF::ln();
        //get the table details 
        $records = DB::table('par_servicecharter_configurations as t1')
                                    ->leftJoin('par_service_types as t2', 't1.service_type_id', 't2.id')
                                    ->leftJoin('modules as t3', 't1.module_id', 't3.id')
                                    ->select('t1.*', 't3.name as module_name','t1.standard_of_delivery as standard_servicedelivery', 't2.name as servicetype_details');
                
            if(validateIsNumeric($module_id)){
                $records->where('t1.module_id',$module_id);

            }
            if(validateIsNumeric($service_type_id)){
                $records->where('service_type_id',$service_type_id);
                
            }   
            $records = $records->where('t1.is_enabled',1)->get();
                        
        $data = array();
        if($records){
                                    //columns
                                    PDF::Cell(10,5,'No.',1,0);
                                    PDF::Cell(80,5,'Type of services',1,0);
                                    PDF::Cell(52,5,'Stand. of Ser. Delivery',1,0);
                                    PDF::Cell(26,5,'Received',1,0);
                                    PDF::Cell(32,5,'Queried.(Non Resp)',1,0);
                                    PDF::Cell(28,5,'Complied',1,0);
                                    PDF::Cell(32,5,'Non-Complaince',1,0);
                                    PDF::Cell(0,5,'%',1,1);
                                    $check_rec = '';
                                    $check_servicetype = '';
                                    $i = 1;
                                    $dimensions = PDF::getPageDimensions();
                                                    $hasBorder = false;
                                    foreach($records as $rows){
                                            $module_name = $rows->module_name;
                                            $sections_details = $rows->service_sections;
                                            $servicetype_details = $rows->servicetype_details;
                                        //  $servicetype_details_id = $rows->servicetype_details_id;
                                            $service_type_id = $rows->service_type_id;
                                            if($module_name != $check_rec ){
                                                    
                                                    PDF::SetFont('times','B',10);
                                                    PDF::Cell(10,5,$i,1,0);
                                                    PDF::Cell(0,5,$module_name,1,1);
                                                    $i++;
                                                    
                                            }
                                            
                                            //check the service type details 
                                            if($servicetype_details != $check_servicetype ){
                                                    
                                                    PDF::SetFont('times','B',10);
                                                    PDF::Cell(10,5,'',1,0);
                                                    PDF::Cell(0,5,$servicetype_details,1,1);
                                                    $i++;
                                                    
                                            }
                                            //view the sections 
                                            $sections = explode(',',$sections_details);
                                            $section_rec = DB::table('par_sections')->whereIn('id',$sections);
                                            
                                            if(validateisNumeric($section_id)){
                                                    $section_rec ->where(array('id'=>$section_id));
                                            }
                                            $section_rec =  $section_rec->get();
                                            
                                            foreach($section_rec as $section_row){
                                                    $section_name = $section_row->name;
                                                    $section_id = $section_row->id;
                                                
                                                    $rowcount = max(PDF::getNumLines($section_name, 80),PDF::getNumLines($rows->standard_servicedelivery, 35));
                                                    ///
                                                    $received_app = $this->getApplicationqueryapps($req,$servicetype_details_id,$section_id,$received_from,$received_to,1);
                                                            if(!is_numeric($received_app)){
                                                                    
                                                                            $received_app = $this->returnappCounter($received_app);
                                                                    
                                                            }
                                                            $complied_apps = $this->getApplicationqueryapps($req,$servicetype_details_id,$section_id,$received_from,$received_to,2,$rows->standard_servicedelivery);
                                                            if(!is_numeric($complied_apps)){
                                                                            
                                                                            $complied_apps = $this->returnappCounter($complied_apps);
                                                                    
                                                            }
                                                            //queried with no response 
                                                            $queriednoresponse_apps = $this->getApplicationqueryapps($req,$servicetype_details_id,$section_id,$received_from,$received_to,3,$rows->standard_servicedelivery);
                                                            if(!is_numeric($queriednoresponse_apps) && $queriednoresponse_apps != ''){
                                                                    $queriednoresponse_apps = $this->returnappCounter($queriednoresponse_apps);
                                                                    //echo $queriednoresponse_apps.';';
                                                            //exit();
                                                            }
                                                            $rate_of_complaice = 0;
                                                         // $noncomplied_apps = ($received_app-$queriednoresponse_apps) -$complied_apps;
                                                            $noncomplied_apps = ($received_app) -$complied_apps;

                                                            if($received_app != 0 && $complied_apps != 0){
                                //$divided_by = $received_app-$queriednoresponse_apps;
                                $divided_by = $received_app;
                                if($divided_by != 0){
                                                                         $rate_of_complaice = round((($complied_apps)/$divided_by) * 100,2);//($complied_apps/$received_apps) * 100;
                                                         
                                }
                                                            }

                                                            PDF::SetFont('times','',10);
                                                            PDF::MultiCell(10,$rowcount*5,'',1,'','',0);
                                                            PDF::MultiCell(80,$rowcount*5,$section_name,1,'','',0,'');
                                                            PDF::MultiCell(52,$rowcount*5,$rows->standard_servicedelivery.' days',1,'','',0);
                                                            PDF::MultiCell(26,$rowcount*5,$received_app,1,'','',0);
                                                            PDF::MultiCell(32,$rowcount*5,$queriednoresponse_apps,1,'','',0);
                                                            PDF::MultiCell(28,$rowcount*5,$complied_apps,1,'','',0);
                                                            PDF::MultiCell(32,$rowcount*5,$noncomplied_apps,1,'','',0);
                                                            PDF::MultiCell(0,$rowcount*5,$rate_of_complaice.' %',1,'','',1);
                                                        
                                            }//b
                                             $check_rec = $rows->module_name;
                                             $check_servicetype = $servicetype_details;
                                    }
                
                                    PDF::output('Service Charter Report'.rand(0,100).'.pdf');
                                    exit();
        }

    }
catch (\Exception $exception) {
                    $res = array(
                            'success' => false,
                            'message' => $exception->getMessage()
                    );
            } catch (\Throwable $throwable) {
                    $res = array(
                            'success' => false,
                            'message' => $throwable->getMessage()
                    );
            } return \response()->json($res);
}
public function funcExportServiceCharterSummaryRpt(Request $req){
    try{

    }
catch (\Exception $exception) {
                    $res = array(
                            'success' => false,
                            'message' => $exception->getMessage()
                    );
            } catch (\Throwable $throwable) {
                    $res = array(
                            'success' => false,
                            'message' => $throwable->getMessage()
                    );
            } return \response()->json($res);
}

public function funcPrintServiceCharterSummaryRpt(Request $req){
    try{
        PDF::setPrintHeader(false);
        PDF::setPrintFooter(false);
        PDF::AddPage('L');
        PDF::SetFont('times','B',13);
        
        $this->getReportheaderLandscape('SERVICE STANDARDS'); 
        $module_id = $req->module_id;
        $servicetype_details_id = $req->servicetype_details_id;
        $service_type_id = $req->service_type_id;
        $section_id = $req->section_id;
        $received_from = $req->received_from;
        $received_to = $req->received_to;
        PDF::Cell(0,2,'',0,1);
        //PDF::Cell(117);
        PDF::SetFont('times','',10);
        PDF::Cell(0,4,'Report for the Period: '.$received_from.' - '.$received_to,0,0,'');
        PDF::Cell(0,4,'Print Date: '.date('d/m/Y h:i:s a'),0,1,'R');
        PDF::ln();
        //get the table details 
        $records = DB::table('par_servicecharter_configurations as t1')
                                    ->leftJoin('par_service_types as t2', 't1.service_type_id', 't2.id')
                                    ->leftJoin('modules as t3', 't1.module_id', 't3.id')
                                    ->select('t1.*', 't3.name as module_name','t1.standard_of_delivery as standard_servicedelivery', 't2.name as servicetype_details');
                
            if(validateIsNumeric($module_id)){
                $records->where('t1.module_id',$module_id);

            }
            if(validateIsNumeric($service_type_id)){
                $records->where('service_type_id',$service_type_id);
                
            }   
            $records = $records->where('t1.is_enabled',1)->get();
                        
        $data = array();
        if($records){
                                    //columns
                                    PDF::Cell(10,5,'No.',1,0);
                                    PDF::Cell(80,5,'Type of services',1,0);
                                    PDF::Cell(52,5,'Standards of Service Delivery',1,0);
                                    PDF::Cell(26,5,'Received',1,0);
                                    PDF::Cell(32,5,'Queried. Non Resp',1,0);
                                    PDF::Cell(28,5,'Complied',1,0);
                                    PDF::Cell(32,5,'Non-Complaince',1,0);
                                    PDF::Cell(0,5,'%',1,1);
                                    $check_rec = '';
                                    $check_servicetype = '';
                                    $i = 1;
                                    $dimensions = PDF::getPageDimensions();
                                                    $hasBorder = false;
                                    foreach($records as $rows){
                                        $module_name = $rows->module_name;
                                        
                                        if($module_name != $check_rec ){
                                            PDF::SetFont('times','B',10);
                                            PDF::Cell(10,5,$i,1,0);
                                            PDF::Cell(0,5,$module_name,1,1);
                                            $i++;
                                        }
                                        $rowcount = max(PDF::getNumLines($rows->servicetype_details, 80),PDF::getNumLines($rows->standard_servicedelivery, 35));
                                        ///PDF::MultiCell(10,$rowcount*5,'',1,'','',0);
                                        $servicetype_details_id = $rows->service_type_id;
                                        $received_app = $this->getApplicationqueryapps($req,$servicetype_details_id,$section_id,$received_from,$received_to,1);
                                            if(!is_numeric($received_app)){
                                                
                                                    $received_app = $this->returnappCounter($received_app);
                                                
                                            }
                                            $complied_apps = $this->getApplicationqueryapps($req,$servicetype_details_id,$section_id,$received_from,$received_to,2,$rows->standard_servicedelivery);
                                            if(!is_numeric($complied_apps)){
                                                    
                                                    $complied_apps = $this->returnappCounter($complied_apps);
                                                
                                            }
                                            //queried with no response 
                                            $queriednoresponse_apps = $this->getApplicationqueryapps($req,$servicetype_details_id,$section_id,$received_from,$received_to,3,$rows->standard_servicedelivery);
                                            if(!is_numeric($queriednoresponse_apps) && $queriednoresponse_apps != ''){
                                                $queriednoresponse_apps = $this->returnappCounter($queriednoresponse_apps);
                                                //echo $queriednoresponse_apps.';';
                                            //exit();
                                            }
                                            $rate_of_complaice = 0;
                                            //$noncomplied_apps = ($received_app-$queriednoresponse_apps) -$complied_apps;
                                            $noncomplied_apps = ($received_app) -$complied_apps;
                                            if($received_app != 0 && $complied_apps != 0){
                                                $divide_by= ($received_app);
                                                                            if($divide_by != 0){
                                                                                    
                                                                                    $rate_of_complaice = round(($complied_apps/$divide_by) * 100,2);//($complied_apps/$received_apps) * 100;
                                                                            }
                                            }
                                            PDF::SetFont('times','',10);
                                                                    PDF::MultiCell(10,$rowcount*6,'',1,'','',0);
                                                                    PDF::MultiCell(80,$rowcount*6,$rows->servicetype_details,1,'','',0,'');
                                                                    PDF::MultiCell(52,$rowcount*6,$rows->standard_servicedelivery.' days',1,'','',0);
                                                                    PDF::MultiCell(26,$rowcount*6,$received_app,1,'','',0);
                                                                    PDF::MultiCell(32,$rowcount*6,$queriednoresponse_apps,1,'','',0);
                                                                    PDF::MultiCell(28,$rowcount*6,$complied_apps,1,'','',0);
                                                                    PDF::MultiCell(32,$rowcount*6,$noncomplied_apps,1,'','',0);
                                                                    PDF::MultiCell(0,$rowcount*6,$rate_of_complaice.' %',1,'','',1);
                                                                    $check_rec = $rows->module_name;
                                    }
                
                                    PDF::output('Service Charter Report'.rand(0,100).'.pdf');
                                    exit();
        }

    }
catch (\Exception $exception) {
                    $res = array(
                            'success' => false,
                            'message' => $exception->getMessage()
                    );
            } catch (\Throwable $throwable) {
                    $res = array(
                            'success' => false,
                            'message' => $throwable->getMessage()
                    );
            } return \response()->json($res);


}
function returnReportHeader($pdf,$org_rec,$rec,$title){
        $pdf->Cell(0,25,'',0,1);
               $pdf->Cell(0, 6, strtoupper($org_rec->name), 0, 1, 'C');
              $pdf->SetFont('times', 'B', 9);
               $pdf->Cell(0, 4, $org_rec->postal_address.', '.$org_rec->region_name.', '.$org_rec->republic, 0, 1, 'C');
               $pdf->Cell(0, 4, 'Tel: '.$org_rec->telephone_nos.' Fax: '.$org_rec->fax, 0, 1, 'C');
               $pdf->Cell(0,4, $org_rec->physical_address, 0, 1, 'C');
               $pdf->Cell(0, 4, 'Website: '.$org_rec->website.', Email: '.$org_rec->email_address, 0, 1, 'C');
               $pdf->Cell(0, 4, '', 0, 2);
             //  $pdf->Image($logo, 86, 40, 35, 14);
               $pdf->SetFont('times', 'B', 13);
               if(isset($rec->invoice_no)){
                       $data = '{"invoice_no":'.$rec->invoice_no.',"module_id":'.$rec->module_id.',"application_code":'.$rec->application_code.'}';
               }
               else{
                       $data = '{"receipt_no":'.$rec->receipt_no.',"module_id":'.$rec->module_id.',"application_code":'.$rec->application_code.'}';
                   
               }
        

                $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
                                                                                            
                $pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
               $pdf->Cell(0, 7, strtoupper($title), 0, 2, 'C');
                $pdf->SetFont('times', 'B', 11);
        
    }
public function printSpecialRequestScreeningfrm(Request $req){
    try{
        PDF::setPrintHeader(false);
        PDF::setPrintFooter(false);
        PDF::AddPage('');
        PDF::SetFont('times','B',13);
        $application_code = $req->application_code;
        $this->getReportheader('SPECIAL REQUEST SCREENING FORM'); 
        PDF::SetFont('','',9);
        PDF::Cell(0,4,'Print Date: '.date('d/m/Y h:i:s a'),0,1,'R');
        PDF::ln();
        
        PDF::Cell(50,8,'APPLICATION NUMBER: ',0,0);
        $rec = DB::table('tra_importexport_applications as t1')
                ->leftJoin('par_system_statuses as q', 't1.application_status_id','=','q.id')
                ->leftJoin('tra_approval_recommendations as t4', 't1.application_code','t4.application_code')
                ->leftJoin('tra_prechecking_recommendations as t5', 't1.application_code','t5.application_code')
                ->leftJoin('tra_managerpermits_review as t6', 't1.application_code','t6.application_code')
                ->leftJoin('wb_trader_account as t7', 't1.applicant_id','t7.id')
                ->leftJoin('par_countries as t8', 't7.country_id','t8.id')
                ->leftJoin('par_regions as t9', 't7.region_id','t9.id')
                ->leftJoin('par_evaluation_recommendations as t10', 't5.recommendation_id','t10.id')
                ->leftJoin('par_permits_reviewrecommendations as t11', 't6.decision_id','t11.id')
                ->leftJoin('par_permits_reviewrecommendations as t12', 't4.decision_id','t12.id')
                ->leftJoin('users as t13', 't4.created_by', 't13.id')
                ->leftJoin('users as t14', 't6.prepared_by_id', 't14.id')
                ->leftJoin('users as t15', 't5.screened_by', 't15.id')
                ->leftJoin('par_permit_category as t17', 't1.permit_category_id', 't17.id')
                ->select(DB::raw("t1.*,t17.name as permit_category, CONCAT_WS(' ',decrypt(t13.first_name),decrypt(t13.last_name)) as approved_by, CONCAT_WS(' ',decrypt(t14.first_name),decrypt(t14.last_name)) as reviewed_by,CONCAT_WS(' ',decrypt(t15.first_name),decrypt(t15.last_name)) as screened_byname, t1.reference_no,t5.created_on as screened_on, t5.remarks as screening_remarks,t10.name as screening_recom, t4.comment as approval_comment, t6.comment as review_comment,t6.approval_date as review_date, t4.approval_date,t12.name as approval_recommendation, t11.name as review_recommendation, t7.name as request_from,t8.name as country_name, t9.name as region_name, t7.physical_address, t7.postal_address"))
                ->where('t1.application_code', $application_code)
        //dd($rec->toSql());
                ->first();
        if($rec){
            PDF::SetFont('','',11);
                PDF::Cell(0,8,'Ref No: '.$rec->tracking_no.' '.$rec->reference_no,0,1);
                
                PDF::SetFont('','B',11);
                PDF::Cell(45,8,'REQUEST FROM: ',0,1);
                PDF::SetFont('','',11);
                PDF::Cell(0,8,$rec->request_from,0,1);
                
                PDF::Cell(0,8,$rec->physical_address,0,1);
                PDF::Cell(0,8,$rec->postal_address.', '.$rec->region_name.', '.$rec->country_name,0,1);
                
                PDF::Cell(45,8,'1. Reasons for Special Applications: '.$rec->permit_category,0,1);
            
                if($rec->section_id == 2){
                    $section_title = "Medicines Registration";
                }
                else{
                    $section_title = 'Medical Devices and Diagnostics Registration';
                }
                PDF::SetFont('','B',11);
                PDF::Cell(0,8,'2. Assessment and recommendations from '.($section_title).' officer',0,1);
                PDF::SetFont('','',11);
                PDF::MultiCell(0,8,'Recommendation: '.$rec->screening_recom,0,'','',1);
                PDF::Cell(45,8,'Remarks:',0,1);
            
                PDF::MultiCell(0,10,$rec->screening_remarks,0,'','',1);

                PDF::Cell(45,8,'Name of Officer: '.strtoupper($rec->screened_byname),0,0);
                
                PDF::Cell(0,8,'Date: '.formatDate($rec->screened_on),0,1,'R');
                PDF::SetFont('','B',11);
                PDF::Cell(0,8,'3. Recommendation from Manager '.($section_title),0,1);
                PDF::SetFont('','',11);
                PDF::MultiCell(0,8,'Recommendation: '.$rec->review_recommendation,0,'','',1);
                PDF::Cell(45,8,'Remarks:',0,1);
            
                PDF::MultiCell(0,10,$rec->review_comment,0,'','',1);

                PDF::Cell(45,8,'Name of Manager :'.strtoupper($rec->reviewed_by),0,0);
                
                PDF::Cell(0,8,'Date: '.formatDate($rec->review_date),0,1,'R');
                PDF::SetFont('','B',11);
                PDF::Cell(0,8,'4. Director of Medicines and Complementaty Products',0,1);
                PDF::SetFont('','',11);
                PDF::Cell(45,8,'Recommendation: '.$rec->approval_recommendation,0,1);
                PDF::Cell(45,8,'Comments:',0,1);
            
                PDF::MultiCell(0,10,$rec->approval_comment,0,'','',1);
                PDF::Cell(45,8,'Name:'.$rec->approved_by,0,0);
                
                PDF::Cell(0,8,'Date: '.formatDate($rec->approval_date),0,1,'R');
                
                PDF::OutPut();
                return;
            
        }
        else{
            $res = array('success'=>false, 'message'=>"Application Not Found");
        }
    }
catch (\Exception $exception) {
                    $res = array(
                            'success' => false,
                            'message' => $exception->getMessage()
                    );
            } catch (\Throwable $throwable) {
                    $res = array(
                            'success' => false,
                            'message' => $throwable->getMessage()
                    );
            } return \response()->json($res);


    
}public function printRequestForAdditionalInformation(Request $req)
{
    //application details
    
    $this->generateRequestForAdditionalInformation($req);
                                                        
}
public function onDownloadunfitProductstemplate(){
        //download an excel form 
        $data = array();

                $val=date('Y').date('m').date('d').date('h').date('i').date('s');
                $data[] = array('Brand_Name'=>'************',
                                            'Generic_Name'=>'************',
                                            'Product_Strength'=>'..',
                                            'Dosage_Form'=>'************',
                                            'Pack_Size'=>'************',
                                            'Quantity'=>'************',
                                            'Batch_Nos'=>'************',
                                            'Estimated_Value'=>'************',
                                            'currency_name'=>'************',
                                            'Reason_for_unfitness'=>'************'
                                        );
                $data_array = json_decode(json_encode($data), true);

        $dataSpreadsheet = new Spreadsheet();
        $sheet = $dataSpreadsheet->getActiveSheet();
      
        $cell=0;

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

       $sheet->insertNewColumnBefore('A', 1);

       $sheet->fromArray($header, null, "A1");

       $sheet->fromArray( $data_array, null,  "A2");

       for($i=8; $i <= $size; $i++){
          $sheet->getCell('A'.$i)->setValue($i-7);
       }
        $length = $length+1; //add one for the new column added 
        $letter=number_to_alpha($length,"");
             
        $cellRange = 'A7:'.$letter.''.$size;
        $sheet->getStyle($cellRange)->getAlignment()->setWrapText(true);
        $sheet->getColumnDimension('A')->setAutoSize(true);

       $writer = new Xlsx($dataSpreadsheet);
         

      $response =  new StreamedResponse(
          function () use ($writer) {
              $writer->save('php://output');
          }
      );
            $filename ='FORM FOR UNFIT PHARMACEUTICAL PRODUCTS';

      $response->headers->set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      $response->headers->set('Content-Disposition', 'attachment;filename='.$filename.'.xlsx');
      $response->headers->set('Cache-Control','max-age=0');
     return $response;

}
}