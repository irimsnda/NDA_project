<?php

namespace Modules\Reports\Traits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;


use \Mpdf\Mpdf as mPDF;

use PDF;

use Modules\Reports\Providers\PdfProvider;
use Modules\Reports\Providers\PdfLettersProvider;
use Modules\Reports\Providers\PdfPlainLettersProvider;

trait ReportsTrait
{

   public function generatePremisePermit($premise_id)
    {
        $params = array(
            'premise_id' => $premise_id,
            'document_type' => 'permit'
        );
        $report = generateJasperReport('premisePermitReport', 'permit_' . time(), 'pdf', $params);
        return $report;
    }

    public function generatePremiseCertificate($premise_id)
    {
        $params = array(
            'premise_id' => $premise_id,
            'document_type' => 'certificate'
        );
        $report = generateJasperReport('certificateReport', 'certificate_' . time(), 'pdf', $params);
        return $report;
    }
	function getCertificateHeader($pdf,$code){
										// add a page
										$pdf->AddPage();
										$pdf->SetLineWidth(0.4);
										//$pdf->Rect(3,3,204,290);
										$pdf->SetLineWidth(1.2);
										//$pdf->Rect(5,5,200,285);
										$pdf->SetLineWidth(0.4);
									//	$pdf->Rect(7,7,195,280);
										$pdf->setMargins(20,25,20,true);
										$template_url = base_path('/');
										$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
										// import page 1
										$tplId = $pdf->importPage(1);	
									
										// use the imported page and place it at point 10,10 with a width of 100 mm
										$pdf->useTemplate($tplId,0,0);
										$pdf->setPageMark();
										$pdf->SetLineWidth(0.4);
										$pdf->Rect(5,5,200,280);
										$pdf->Rect(3,3,204,285);
			
	}
	function funcGenerateQrCode($row,$pdf){
		
								$data = url('/').'/api/permitValidation?application_code='.$row->application_code.'&module_id='.$row->module_id;

								//$data = "application_code:".$row->certificate_no."; Brand Name:".$row->brandName.";Expiry Date:".formatDate($row->expiry_date);
								 $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
								// QRCODE,H : QR-CODE Best error correction
								$template_url = getcwd();
								$qrc_code = $template_url . '/resources/images/qrc_code.jpg';
								$width = 16;
								$height = 16;
								
								$qr_codex = 178;
								$qr_codey = 28;
								$pdf->write2DBarcode($data, 'QRCODE,H', $qr_codex,$qr_codey , $width, $height);
							   //$pdf->Image($qrc_code,$qr_codex+$width-4,$qr_codey,$width-3,$height-4);
								
		
	}
	function funcAppGenerateQrCode($row,$pdf){
		
								$data = url('/').'/api/permitValidation?application_code='.$row->application_code.'&module_id='.$row->module_id;

								//$data = "application_code:".$row->certificate_no."; Brand Name:".$row->brandName.";Expiry Date:".formatDate($row->expiry_date);
								 $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
								// QRCODE,H : QR-CODE Best error correction
								$template_url = getcwd();
								$qrc_code = $template_url . '/resources/images/qrc_code.jpg';
								$width = 16;
								$height = 16;
								
								$qr_codex = 178;
								$qr_codey = 28;
								$pdf->write2DBarcode($data, 'QRCODE,H', $qr_codex,$qr_codey , $width, $height);
							   //$pdf->Image($qrc_code,$qr_codex+$width-4,$qr_codey,$width-3,$height-4);
								
		
	}
	public function foodProductRegistrationCertificate($application_code,$row){
		try{
			
						
						$is_provisional =0;
						
						if($row){
							if($row->recommendation_id == 2){
								$is_provisional =1;
							}
							$org_info = $this->getOrganisationInfo();
								
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf, 'DAR/FMT/042');
								
								$logo = getcwd() . '/resources/images/org-logo.jpg';
								$pdf->SetFont('times','B',9);
								$pdf->Cell(0,1,'',0,1);
								
								
								$pdf->Cell(0,21,'',0,1);
								
								$pdf->Cell(0,5,'REGISTRATION CERTIFICATE OF FOOD PRODUCT',0,1,'C');
								$pdf->SetFont('times','',10);
								$pdf->ln();
								$act_statement = "Made under Law No. 003/2018 of 09/02/2018 establishing the Uganda NDA and determining its mission, organization and functioning in his article 3 and article 8 and regulation No. CBD/TRG/010. The Authority here issues.\n";
								
								$pdf->MultiCell(0,5,$act_statement,0,'J',0,1);
							
								$pdf->SetFont('times','B',10);
								$pdf->Cell(0,3,'',0,1);
								
								$pdf->SetFont('times','',10);
									
                                if( $is_provisional == 1){
                                   // $pdf->Cell(70,8,0,0);
									$pdf->MultiCell(70,8,'Provisional registration number of the medicine',0,'',0,0);
                                }
                                else{
                                    $pdf->Cell(70,8,'Registration number:',0,0);
								
                                }
								
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,8,$row->certificate_no,0,1);
								//$pdf->Cell(0,1,'',0,2);
								$pdf->SetFont('times','',10);
								
								//Brand NameUganda NDA
								$pdf->MultiCell(0,8,"This is to certify that the medicine described below has been registered in Uganda subject to conditions indicated at the back of the this certificate:\n",0,'J',0,1);
							
								$pdf->SetFont('times','',10);
									
								$pdf->MultiCell(70,8,'Brand Name:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								
								$pdf->MultiCell(0,8,strtoupper($row->brandName),0,'',0,1);
								$pdf->SetFont('times','',10);
								
								$pdf->MultiCell(70,8,'Common Name:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								
								$pdf->MultiCell(0,8,strtoupper($row->common_names),0,'',0,1);
								
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(69,10,'Pack size and Packaging type:',0,'',0,0);
								//$pdf->Cell(70,5,'',0,0,'L');
								
								$pdf->SetFont('times','B',10);
								$packaging = '';
											$container_name = '';
											$retail_packaging_size = '';
								$packaging_data = DB::table('tra_product_packaging as t1')
											->select(DB::raw("t1.*, t2.name as container_type, t3.name as container_name, t4.name as container_material, t5.name as closure_materials, t4.name as container_material, t5.name as closure_material, t6.name as seal_type, t7.name as packaging_units, CONCAT_WS('X',retail_packaging_size,retail_packaging_size1,retail_packaging_size2,retail_packaging_size3,retail_packaging_size4) as retail_packaging"))
											->leftJoin('par_containers_types as t2', 't1.container_type_id', '=', 't2.id')
											->leftJoin('par_containers as t3', 't1.container_id', '=', 't3.id')
											->leftJoin('par_containers_materials as t4', 't1.container_material_id', '=', 't4.id')
											->leftJoin('par_closure_materials as t5', 't1.closure_material_id', '=', 't5.id')
											->leftJoin('par_seal_types as t6', 't1.seal_type_id', '=', 't6.id')
											->leftJoin('par_packaging_units as t7', 't1.packaging_units_id', '=', 't7.id')
											->where(array('t1.product_id' => $row->product_id))
											->get();
								
								if($packaging_data->count() >0){
								$i = 1;
									foreach($packaging_data as $packaging_rec){
										
											$container_material = $packaging_rec->container_material;
											$container_name = $packaging_rec->container_name;
											
											$retail_packaging_size = $packaging_rec->retail_packaging;
											
											$product_unit = $packaging_rec->unit_pack;		
											if($i != 1){
												$pdf->Cell(69,5,'',0,0);
											}									
											if($product_unit == ''){
											
													$pdf->MultiCell(0,5,strtoupper($container_material).' '.strtoupper($container_name) .' OF '.strtoupper($retail_packaging_size),0,'',0,1);
											}
											else{
												
													$pdf->MultiCell(0,5,strtoupper($container_material).' '.strtoupper($container_name) .' OF '.strtoupper($retail_packaging_size).' X '.strtoupper($product_unit),0,'',0,1);													
																							
											}
											
											$i++;									
									}
											
								
								}
								else{
											$pdf->MultiCell(0,10,'',0,'',0,1);
											
								}
								
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(70,8,'Shelf life of medicine in months and Storage statement:',0,'',0,0); ;
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(100,8,strtoupper($row->shelf_life).', '.strtoupper(html_entity_decode(($row->storage_condition))),0,'',0,1); ;
								
								$pdf->SetFont('times','B',10);
								
								
								$pdf->MultiCell(70,10,'Name of Marketing authorization holder:',0,'',0,0);
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,10,strtoupper($row->trader_name),0,'',0,1);
								//$pdf->Cell(100,12,ucwords($applicantName),0,1,'L'); 
								//$pdf->Cell(0,1,'',0,1);
								//Manufacturer
								 $manrow = DB::table('tra_product_manufacturers as t1')
									->select('t1.*', 't2.email_address','t1.id as manufacturer_id', 't2.physical_address', 't2.name as manufacturer_name','t2.postal_address', 't3.name as country_name', 't4.name as region_name', 't5.name as district_name')
									->join('tra_manufacturers_information as t2', 't1.manufacturer_id', '=', 't2.id')
									->join('par_countries as t3', 't2.country_id', '=', 't3.id')
									->leftJoin('par_regions as t4', 't2.region_id', '=', 't4.id')
									->leftJoin('par_districts as t5', 't2.district_id', '=', 't5.id')
									->leftJoin('par_manufacturing_roles as t6', 't1.manufacturer_role_id', '=', 't6.id')
									->where(array('t1.product_id' => $row->product_id, 'manufacturer_type_id' => 1))
									->first();
									
									$manufacturer_name='';
									$man_postal_address='';
									$man_physical_address='';
									$man_countryName='';
									$man_districtName='';
									$man_regionName = '';
									
								if($manrow){
									$manufacturer_name=$manrow->manufacturer_name;
									$man_postal_address=$manrow->postal_address;
									$man_physical_address=$manrow->physical_address;
									
									$man_countryName= $manrow->country_name;
									$man_regionName = $manrow->region_name;
								}
								
								//Manufacturer sql 
								$pdf->SetFont('times','',10);
								
								$pdf->MultiCell(70,10,'Name and Address of the Manufacturer:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($manufacturer_name),0,'',0,1);
								
								$pdf->SetFont('times','',10);
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($man_postal_address),0,'',0,1);
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($man_physical_address),0,'L');
								
								if($man_regionName!=''){
									$pdf->Cell(70,5,'',0,0,'L');
									$pdf->SetFont('times','B',10);
									$pdf->Cell(100,5,strtoupper($man_regionName),0,1,'L'); 
								}
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,5,strtoupper($man_countryName),0,1,'L'); 
								 
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(70,8,'Name of Local Technical Representative:',0,'',0,0);
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,8,strtoupper($row->localAgentName),0,'',0,1);
								
								$pdf->SetFont('times','',10);
								$pdf->Cell(70,8,'Valid From:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(35,8,ucwords(date('F d, Y ',strtotime($row->certificate_issue_date))),0,0,'L'); 
								
								
								$pdf->SetFont('times','',10);
								$pdf->Cell(30,8,'To:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(0,8,ucwords(date('F d, Y ',strtotime($row->expiry_date))),0,1,'L'); 
								
								
								$pdf->Cell(0,2,'',0,1);
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
								$this->funcGenerateQrCode($row,$pdf);
								
								$this->getCertificateSignatoryDetail($row,$pdf);
								
								$pdf->AddPage();
								$pdf->SetFont('times','B',9);
								
								
								$pdf->Cell(0,5,'Conditions of Registration:',0,1);
								$pdf->SetFont('times','',11);
								$pdf->Cell(0,2,'',0,1);
								
								$this->getCertificateRegistrationConditions($row,$pdf);
								
								$pdf->Output();
						}	
							
								
			
			
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
			exit();
        return response()->json($res);
		
	}
	function printPremisesCertificateLetter($request,$approvalGrant){
		try{
			$application_code = $request->application_code;

			$record = DB::table('tra_premises_applications as t1')
												->leftjoin('tra_premises as t2', 't1.premise_id','t2.id')
												->leftjoin('par_countries as t3', 't2.country_id', 't3.id')
												->leftJoin('par_regions as t4', 't2.region_id','t4.id')
												->leftJoin('par_districts as t5', 't2.district_id', 't5.id')
												->leftjoin('wb_trader_account as t6', 't1.applicant_id', 't6.id')
												->leftjoin('par_countries as t7', 't6.country_id', 't7.id')
												->leftJoin('par_regions as t8', 't6.region_id','t8.id')
												->leftJoin('par_districts as t9', 't6.district_id', 't9.id')
												->leftJoin('par_business_types as t11', 't2.business_type_id', 't11.id')
												->leftjoin('tra_approval_recommendations as t10','t1.application_code','t10.application_code')
												->leftJoin('users as t17', 't10.permit_signatory', '=', 't17.id')
							
												->select(DB::raw("t1.reference_no,t1.application_code,t1.*,concat(decrypt(t17.first_name),' ',decrypt(t17.last_name)) as permit_signatoryname, t2.*, t10.permit_signatory,t1.premise_id,  t2.postal_address as premise_poastal_address,t11.name as premises_type, t2.physical_address as premise_physical_address, t4.name as premise_region_name,t5.name as premise_district_name,t7.name as premise_country,t1.date_added as date_registered, t10.expiry_date,t10.approval_date as permit_issue_date,t10.permit_no,t2.psu_reg_no as registration,t2.tpin_no as tin,t2.first_name as supervisor,t2.premise_reg_no,t2.name as premise_name,t6.name as applicant_name,t6.physical_address,t6.postal_address,t6.telephone_no as telephone,t6.email,t9.name as districtName,t8.name as regionName,t7.name as countryName"))
												->where(array('t1.application_code'=>$application_code))
												->first();
												//dd($record);

        if(!empty($approvalGrant) && $approvalGrant->decision_id == 1){
											$org_info = $this->getOrganisationInfo();
											
											$pdf = new PdfProvider();
											$this->getCertificateHeader($pdf, '');
											
											$this->funcGenerateQrCode($record,$pdf);
												 
											$logo = getcwd() . '/resources/images/org-logo.jpg';
											$pdf->SetFont('times','B',9);
											$pdf->Cell(0,1,'',0,1);
											
											
											$pdf->Cell(0,15,'',0,1);
											
											$pdf->ln();
															
											if($record){
												
												$row=$record;
												$applicantName=$row->applicant_name;
												$premise_name=$row->premise_name;
												$permit_no=$row->permit_no;
												$reference_no=$row->reference_no;
												$tin=$row->tin;
												$registration=$row->registration;
												$supervisor=$row->supervisor;				
												$date_added=$row->date_registered;
												$postal_address=$row->postal_address;
												$physical_address=$row->physical_address;
												$countryName=$row->countryName;
												$regionName=$row->regionName;
												$districtName=$row->districtName;
												$premiseID=$row->premise_id;
												$premise_reg_no=$row->premise_reg_no;
												$premises_id = $row->premise_id;
												$permit_issue_date = $row->permit_issue_date;
												$locationDesc ='';
												$org_info = $this->getOrganisationInfo();

												$premise_name = $row->premise_name;
												$premise_poastal_address = $row->premise_poastal_address;
												$premise_physical_address = $row->premise_physical_address;
												$premise_region_name = $row->premise_region_name;
												$premise_country = $row->premise_country;
												$premise_district_name = $row->premise_district_name;
												
											
												//$pdf->Cell(0,5,'Ref No: '.$record->permit_no,0,1);
												$pdf->ln();
												$pdf->Cell(0,5,'LICENSE TO OPERATE '.strtoupper($record->premises_type),0,1,'C');
												$pdf->ln();
												$pdf->SetFont('times','i',10);
												
												$premises_statement1 = "Issued Under Section 37(2) of the Act and Regulation 16(1) of the National Drugs Policy and Authority(Licensing)
												Regulations 2014\n";
												$pdf->MultiCell(0,8,$premises_statement1,0,'C',0,1);
												$pdf->SetFont('times','',10);

												//$pdf->WriteHTML($premises_statement1, true, false, true, true, 'J');
												$pdf->ln();
												$premises_statement2 = "This is to certify that <b>".$record->premise_name."</b>, is licensed to operate as an <b>".$record->premises_type."</b> at the Physical location <b>".$record->premise_region_name."<b/>,Postal Address <b>" .$org_info->postal_address.' '.$org_info->region_name;
												
												//dd($record);
												$pdf->WriteHTML($premises_statement2, true, false, true, true, 'J');
												$pdf->ln();
												$pdf->Cell(50,5,'TIN ',0,0);
												$pdf->Cell(0,5,$record->tin,0,1);
												
												$pdf->Cell(50,5,'with Supervising Pharmacist ',0,0);
												$pdf->Cell(0,5,$record->supervisor,0,1);

												$pdf->Cell(50,5,'having Registration No ',0,0);
												$pdf->Cell(0,5,$record->registration,0,1);

												$pdf->Cell(50,5,'Premise No ',0,0);
												$pdf->Cell(0,5,$record->reference_no,0,1);
												$pdf->SetFont('times','B',10);
												$pdf->ln();
												$pdf->Cell(0,5,'Validity: This license if valid for one (1) year renewble from the date of its Issuance.',0,1);
												$pdf->ln();
												$pdf->Cell(0,5,'NB: ',0,1);
												$pdf->SetFont('times','I',10);
												$pdf->ln();
												$this->getCertificateRegistrationConditions($record,$pdf);
												$pdf->ln();
												
												$permit_signitory = '';
												$title= 'ACTING';
												$title= '';
												$approved_by = '';
												
												$this->getCertificateSignatoryDetail($record,$pdf);
												
												$pdf->Output();
												$i= 1;
												$l =1;
												
												 
											}
												
        }else{
            return "Set rejection letter";
        }
        
				
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
			exit();
        return response()->json($res);
		
		
		
		
	}
	public function printDisposalCertificate($application_code){
									
					$logo=getcwd().'/assets/images/logo.jpg';
					
					
					$records = DB::table('tra_disposal_applications as t1')
										->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
										->leftJoin('par_districts as t7', 't7.id', 't2.district_id')
										->leftJoin('par_regions as t3', 't2.region_id', 't3.id')
										->leftJoin('par_currencies as t4', 't1.currency_id', 't4.id')
										->leftJoin('par_weights_units as t5', 't1.weights_units_id', 't5.id')
										->leftJoin('par_currencies as t8', 't8.id', 't1.currency_id')
										->join('tra_approval_recommendations as t6', 't1.application_code', 't6.application_code')
										->leftJoin('users as t17', 't6.permit_signatory', '=', 't17.id')
										->select(DB::raw("t4.name as currency,total_weight,t8.name as currency_name, t6.permit_signatory,concat(decrypt(t17.first_name),' ',decrypt(t17.last_name)) as permit_signatoryname, market_value, t5.name as weights_units ,t2.name as applicant,t7.name as district_name, t2.physical_address, t3.name as region_name,t6.approval_date, t2.postal_address, t1.*, t6.decision_id"))
										->where(array('t1.application_code'=>$application_code))
										->first();
				
					if($records){
						$row = $records;
						if($row->decision_id == 1){
								$record = $records;
								$org_info = $this->getOrganisationInfo();
												
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf, '');
											
								$this->funcGenerateQrCode($record,$pdf);
												
											
											$logo = getcwd() . '/resources/images/org-logo.jpg';
											$pdf->SetFont('times','B',9);
											$pdf->Cell(0,1,'',0,1);
											$pdf->Image($logo, 86, 18, 40, 35);
											
											
											$pdf->Cell(0,21,'',0,1);
											$pdf->Cell(0,5,'P.O. Box '.$org_info->postal_address.' '.$org_info->region_name,0,1);
											$pdf->Cell(0,5,$org_info->email_address,0,1);
											$pdf->Cell(0,5,$org_info->website,0,1);
											$pdf->ln();
										
								$reference_no  = $records->tracking_no ;
								$applicant_name   = $records->applicant ;
								$district_name  = $records->district_name ;
								$region_name  = $records->region_name ;
								$physical_address  = $records->physical_address ;
								$pdf->Cell(0,5,'',0,1,'C');
								$pdf->SetFont('','BI',10);
								$pdf->Cell(40,5,'Ref No: '.$reference_no,0,0);
								$pdf->Cell(0,5,'Date: '.date('jS F, Y',strtotime($row->approval_date)),0,1,'R');
								$pdf->ln();$pdf->SetFont('','B',12);
								
								$pdf->MultiCell(0,5,'CERTIFICATE OF SAFE DISPOSAL OF SUBSTANDARD, FALSIFIED AND EXPIRED REGULATED PRODUCTS',0,'C',0,1);
								
								$pdf->ln();$pdf->SetFont('','',10);
								$destruction_startdate = formatDaterpt($row->destruction_startdate);
								$destruction_enddate = formatDaterpt($row->destruction_enddate);
								if($destruction_startdate == $destruction_enddate){
									$date_of_destruction =  date('jS F, Y',strtotime($row->destruction_enddate));
								}
								else{
									$date_of_destruction =   date('jS F, Y',strtotime($row->destruction_startdate)).' to '.  date('jS F, Y',strtotime($row->destruction_enddate));
								}
								$text= "Reference is made to the Law Nº 003/2018 of 09/02/2018 establishing Uganda National Drug Authority and determining its mission, organization and functioning especially in its article 8; and considering the provisions of the Law No 47/2012 of 14/01/2013 relating to the regulation and inspection of food and pharmaceutical products especially in its article 38;.\n";
								$pdf->setCellHeightRatio(2);
								$pdf->writeHTML($text, true, false, false, false, 'J');
		
								$methodsof_destructionsdata = DB::table('tra_methodsof_destructions as t1')
																		->join('par_destruction_methods as t2', 't1.destructionmethod_id', 't2.id')
																		->select('t2.name as disposal_method')

																		->where(array('application_code'=>$application_code));
										$methods = '';								
								if($methodsof_destructionsdata->get()){
									$i = 1;
									$totals = $methodsof_destructionsdata->count();
										$results =$methodsof_destructionsdata->get();
									
									foreach($results as $rows){
										
										if($totals == $i && $i != 1){
											$methods .= ' and '.$rows->disposal_method;
										}
										else{
											if(($i+1) == $totals ){
												$methods .= $rows->disposal_method;
											}
											else{
												
												$methods .= $rows->disposal_method.',';
											}
											
										}
										$i++;
									}
									
								}
							$destruction_sites = DB::table('tra_destruction_exercisesites as t1')
																		->join('par_disposaldestruction_sites as t2', 't1.destruction_site_id', 't2.id')
																		->select('t2.name as destruction_site')

																		->where(array('application_code'=>$application_code));
										$destruction_site  = '';								
								if($destruction_sites->get()){
									$i = 1;
									$totals = $destruction_sites->count();
										$results =$destruction_sites->get();
									
									foreach($results as $rows){
										
										if($totals == $i && $i != 1){
											$destruction_site .= ' and '.$rows->destruction_site;
										}
										else{
											if(($i+1) == $totals ){
												$destruction_site .= $rows->destruction_site;
											}
											else{
												
												$destruction_site .= $rows->destruction_site.',';
											}
											
										}
										$i++;
									}
									
								}
							
								$records = DB::table('tra_disposal_inspectors as t1')
								->join('par_disposal_inspectors_titles as t2', 't1.inspectors_title_id', '=', 't2.id')
								->select(DB::raw("count(t1.id) as counter, t2.name as title"))
								->where(array('t1.application_code' => $application_code))
								->groupBy('t2.id');
		$witness = '';
								if(	$records->get()){
									$i = 1;
									
									
									$totals = $records->count();
									$records = $records->get();
									foreach($records as $rows){
										$counter = '';
										if($rows->counter > 1){
											$counter = $rows->counter.' ';
										}
										
										if($totals == $i && $i != 1){
											$witness .= ' and '.$counter.$rows->title;
										}
										else{
											if(($i+1) == $totals ){
												$witness .= $counter.$rows->title;
											}else{
												$witness .= $counter.$rows->title.', ';
											}
										}
										$i++;
									}
									
								}//destruction_site
								$weight_consignement = $row->total_weight.' '. $row->weights_units;
								$market_value = formatMoney($row->market_value).' '. $row->currency_name;
 
								$pdf->Cell(0,2,'',0,1);
								$text2 = "Uganda NDA, hereby certifies the disposal of substandard/ falsified/ expired products being the property of the company named <b>".$applicant_name."</b>.located in <b>".$region_name."</b/> Province, <b>".$district_name."</b> District, <b>".$physical_address."</b> which took place on <b>".$date_of_destruction."</b>.\n";
								$pdf->writeHTML($text2, true, false, false, false, 'J');
								$pdf->Cell(0,2,'',0,1);
								$text3 = "The annexed consignment was destroyed by <b>".$methods ."</b>(method) at <b>".$destruction_site."</b>(location/site) under the witness and supervision of (Uganda NDA Inspectors, and others if any) as specified in the attached disposal form. The weight of the consignment disposed was <b>".$weight_consignement."</b> and its market value was <b>".$market_value."</b>.\n";
								$pdf->writeHTML($text3, true, false, false, false, 'J');
								$pdf->SetFont('','B',10);
								$pdf->ln();
								$pdf->Cell(0,5,'Done at Kigali on : '.formatDateRpt($record->approval_date),0,1);
												
								
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
												
								$this->getCertificateSignatoryDetail($record,$pdf);
																

						}else{

						}
					}
						$pdf->Output('Disposal Certificate.pdf');


		
		
		
		
	}
	public function generateLetterOfREjection($application_code,$req,$module_id)
{
	try{

																	$application_code = $req->application_code;
																	
																	$query_id = $req->query_id;
																	$module_data = getTableData('modules', ['id'=>$module_id]);
																	if(!isset($module_data->table_name)){
																		return "Module details not found";
																	}
																	$app_data = DB::table($module_data->table_name.' as t1')
																				->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
																				->leftJoin('par_countries as t3', 't2.country_id', 't3.id')
																				->leftJoin('par_regions as t4', 't2.region_id', 't4.id')
																				->leftJoin('sub_modules as t5', 't1.sub_module_id', 't5.id')
																				->leftJoin('tra_apprejprovisional_recommendation as t7', 't1.application_code', 't7.application_code')
																				->where('t1.application_code', $application_code);
																	
																	if($module_id ==1){
																		$app_data->join('tra_product_information as t6', 't1.product_id','t6.id')->select('t7.created_on as approval_date', 't7.reason_for_rejection','t1.applicant_id','t5.title as application_title','t1.reference_no', 't1.tracking_no', 't2.*', 't3.name as country_name', 't4.name as region_name', 't6.brand_name');
																	}
																	else{
																		$app_data->select('t7.created_on as approval_date', 't7.reason_for_rejection','t1.applicant_id','t5.title as application_title','t1.reference_no', 't1.tracking_no', 't2.*', 't3.name as country_name', 't4.name as region_name');
																	}
																	$app_data = $app_data->first();
																
																	if(!$app_data){
																		return "Application details not found";
																	}
																	
																	$org_info = $this->getOrganisationInfo();
																	$pdf = new PdfLettersProvider();
																	$pdf->AddPage();
																	//$pdf->SetLineWidth(0.4);
																	//$pdf->Rect(3,3,204,285);
																		$template_url = base_path('/');
																		$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
																		// import page 1
																		$tplId = $pdf->importPage(1);	
																	
																		// use the imported page and place it at point 10,10 with a width of 100 mm
																		$pdf->useTemplate($tplId,0,0);
																		$pdf->setPageMark();
																	//use template 
																	
																	$logo = getcwd() . '/resources/images/logo.png';
																	$pdf->Image($logo, 86, 18, 40, 35);
																	
																	$pdf->SetFont('times','B',9);
																	
																	
																	$pdf->Cell(0,4,'FORM II',0,1,'R');
																	$pdf->Cell(0,4,'(Regulation 3)',0,1,'R');
																	$pdf->SetFont('times','B',13);
																	$pdf->Cell(0,25,'',0,1);
																	$pdf->Cell(0,15,'',0,1);
																	$pdf->Cell(0,4,$org_info->name,0,1,'C');
																	$pdf->SetFont('times','B',11);
																	$pdf->Cell(0,4,'The Medicines and Allied Substances Act, 2013',0,1,'C');
																	
																	
																	$pdf->Cell(0,4,'(Act No. 3 of 2013)',0,1,'C');
																	$pdf->SetFont('times','B',12);
																	$pdf->Cell(0,8,'The Medicines and Allied Substances',0,1,'C');
																	$pdf->SetFont('times','B',11);
																	if($module_id == 4){
																			$regulation_title = "The Medicines and Allied Substances (Importation and Exportaion) Regulations, 2017";
																			
																	}
																	else if($module_id == 1){
																		$regulation_title = "(Marketing Authorisation of Medicines) Regulations, 2019";
																	
																	}
																	$pdf->Cell(0,4,$regulation_title,0,1,'C');

																	$pdf->Cell(0,5,'',0,1);
																	$pdf->SetFont('times','B',13);
																	//application_title
																	$title = "NOTICE OF REJECTION OF ".$app_data->application_title;

																	$pdf->Cell(0,5,strtoupper($title),0,1,'C');
																	$pdf->SetFont('times','B',10);
																	
																	$application_no = '';

																	if($app_data->tracking_no != ''){

																		$application_no = 	$app_data->tracking_no;
																	}
																	if($app_data->reference_no != ''){

																		$application_no = 	$app_data->reference_no;
																	}
																	$pdf->Cell(0,10,'Application No:'.$application_no,0,1, 'R');
																		// $pdf->MultiCell(0,10,'Application Reference:<u>'.$app_data->tracking_no.'</u>',0,'R',0,1,'','',true,0,true);
																	$data = '{"tracking_no":'.$app_data->tracking_no.',"module_id":'.$module_id.',"application_code":'.$application_code.'}';

																	$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
																	// QRCODE,H : QR-CODE Best error correction
																	$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
																	$pdf->SetFont('times','',12);
																	//Letter heading 
																	$pdf->Cell(0,8,'To:',0,1);
																	$pdf->Cell(0,8,$app_data->name.',',0,1);
																	
																	$pdf->Cell(0,8,$app_data->physical_address.',',0,1);
																	$pdf->Cell(0,8,$app_data->postal_address.',',0,1);
																	$pdf->Cell(0,8,$app_data->region_name." ".$app_data->country_name,0,1);
																	
																	$pdf->SetFont('times','',11);
																	$pdf->ln();
																		
																	if($module_id ==1){

																		$template = "IN THE MATTER OF ".$application_no.' '.$app_data->brand_name." you are notified that your application for (3) a marketing authorisation/renewal of a marketing authorisation has been rejected by the Authority on the following grounds:";
																
																	}
																	else{
																		$template = "IN THE MATTER OF ".$application_no." you are notified that your application for ".$app_data->application_title." has been rejected by the Authority on the following grounds:";
																

																	}
																	$reason_for_rejection = $app_data->reason_for_rejection;
																	if($reason_for_rejection == ''){
																		$data = DB::connection('portal_db')->table('wb_rejection_remarks')->where('application_code',$application_code)->first();
																		$reason_for_rejection = $data->remark;
																		$pdf->setCellHeightRatio(2);
																		$pdf->WriteHTML($template, true, false, true, true);
																		$pdf->WriteHTML($reason_for_rejection, true, false, true, true);
																		$pdf->SetFont('times','B',12);
																	}else{
																		
																		$pdf->setCellHeightRatio(2);
																		$pdf->WriteHTML($template, true, false, true, true);
																		$pdf->WriteHTML($reason_for_rejection, true, false, true, true);
																		$pdf->SetFont('times','B',12);
																		
																		$dt =strtotime($app_data->approval_date); //gets dates instance
																		$year = date("Y", $dt);
																		$month = date("m", $dt);
																		$day = date("d", $dt);
																		
																			$pdf->Cell(0, 0,'Dated this '.$day.' day of '.$month.', '.$year, 0, 1, '', 0, '', 3);

																				$startY = $pdf->GetY();
																				$startX =$pdf->GetX();
																				$signiture = getcwd() . '/backend/resources/templates/signatures_uploads/dg_sinatory.png';
																				$pdf->Image($signiture,$startX+75,$startY-7,30,12);
																				$pdf->Cell(0, 0, '___________________________',0,1,'C');
																				$pdf->Cell(0, 0, 'AG. Director-General',0,1,'C');
																	}
																	
																	
																			$pdf->Output('Letter of Rejection '.$application_no.'.pdf');
																			
																}catch (\Exception $exception) {
																	$res = sys_error_handler($exception->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
											
															} catch (\Throwable $throwable) {
																	$res = sys_error_handler($throwable->getMessage(), 2, debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 1),explode('\\', __CLASS__), \Auth::user()->id);
															}
															return response()->json($res);									
																	
}
	function getCertificateRegistrationConditions($row,$pdf){
		$module_id = $row->module_id;
		$section_id = $row->section_id;
		
		$where = array('module_id'=>$module_id, 'section_id'=>$section_id);
		
		$records = DB::table('par_certificate_conditions')->where($where)->orderBy('order_no')->get();
			
		if($records){
			
			foreach($records as $rec){
				
					$pdf->Cell(8,2,$rec->order_no.'. ',0,0);
					$pdf->MultiCell(0,5,$rec->certificate_conditions." .\n",0,'J',0,1);
				
			}
			
		}
	}
	function getCertificateSignatoryDetail($record ,$pdf){
		
			$pdf->ln();
								$startY = $pdf->GetY();
								$startX =$pdf->GetX();
								
								
								$director_details = getPermitSignatoryDetails();
										$dg_signatory = $director_details->director_id;
										$director = $director_details->director;
										$is_acting_director = $director_details->is_acting_director;
										
										$approved_by = $record->permit_signatory;
										$permit_signatoryname = $record->permit_signatoryname;
										
										if($dg_signatory != $approved_by){
											$signatory = $approved_by;
										}
										else{
											$signatory = $dg_signatory;
										}
										//permit_approval permit_signatory 
										$signature = getUserSignatureDetails($signatory);
										
										$signature = getcwd() . '/backend/resources/templates/signatures_uploads/'.$signature;
										$pdf->Image($signature,$startX+6,$startY-8,30,12);
										
										 $pdf->Cell(0,8,'...............................................................', 0,1,'');
									
										$title = "Director-General";
										if($dg_signatory != $approved_by){
											$title = 'Acting '.$title;
										}else{
											$permit_signatoryname = $director;
											if($is_acting_director ==1){
												$title = 'Acting '.$title;
											}
											
										}
										$pdf->Cell(0,8,'SIGNATURE', 0,1,'');
										$pdf->Cell(0,8,strtoupper($permit_signatoryname), 0,1,'');
										 $pdf->Cell(0,8,$title, 0,0,'');

		
	}
	
public function medicinesProductRegistration($application_code,$row){
		try{
			        


						$is_provisional =0;
						$strength='';
						
						if($row){
							if($row->recommendation_id == 2){
								$is_provisional =1;
							}
							$org_info = $this->getOrganisationInfo();
								
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf,'');
								$pdf->SetLineWidth(0.4);
								$pdf->Rect(3,3,204,285);
								$logo = getcwd() . '/resources/images/cert-logo.png';
								$pdf->SetFont('times','B',9);
								$pdf->Cell(0,1,'',0,1);
								
								
								$pdf->Cell(0,21,'',0,1);
								$pdf->MultiCell(0,5,$row->certificate_title,0,'C',0,1);
								$pdf->ln();

								$pdf->SetFont('times','B',9);
								
								$pdf->Cell(0,5,'NATIONAL DRUG POLICY AND AUTHORITY ACT, CAP 206',0,1,'C');

								$pdf->SetFont('times','B',10);
								$pdf->ln();

								$act_statement = "Issued under section Regulation 14(1), National Drug Policy and Authority (Registration) Regulations, 2014\n";
								
								$pdf->MultiCell(0,5,$act_statement,0,'J',0,1);
							
								$pdf->SetFont('times','B',10);
								$pdf->Cell(0,3,'',0,1);
								
								$pdf->SetFont('times','',10);
									
                                if( $is_provisional == 1){
                                   // $pdf->Cell(70,8,0,0);
									$pdf->MultiCell(70,8,'Provisional registration number of the medicine',0,'',0,0);
                                }
                                else{
                                	$pdf->SetFont('times','',11);
                                    $pdf->Cell(70,8,'Registration number:',0,0);
								
                                }
								$data = "Product Registration: Certificate No:".$row->certificate_no."; Brand Name:".$row->brandName.";Expiry Date:".formatDate($row->expiry_date);
								 $styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
								// QRCODE,H : QR-CODE Best error correction
								$pdf->SetFont('times','',11);
								$pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);
								// $pdf->SetFont('times','B',10);
								$pdf->Cell(100,7,$row->certificate_no,0,1);
								//$pdf->Cell(0,1,'',0,2);
								$pdf->SetFont('times','',11);
								 $pdf->Cell(70,7,'Date of registration:',0,0);
								   //$pdf->SetFont('times','B',10);
								 $pdf->Cell(100,5,$row->approval_date,0,1);
                                 //$pdf->SetFont('times','',10);
                                 $pdf->SetFont('times','',11);
								 $pdf->Cell(70,8,'Expiry date of registration:',0,0);
								   //$pdf->SetFont('times','B',10);
								 $pdf->Cell(100,5,$row->expiry_date,0,1);

								$pdf->SetFont('times','B',12);

								 $pdf->ln();
								//Brand Name
								$pdf->MultiCell(0,8,"1.	Product information:\n",0,'J',0,1);
							   
								$pdf->SetFont('times','',10);
								
								//$pdf->Cell(70,10,0,0,'L');
								$pdf->MultiCell(70,8,'Proprietary (trade) name:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								
								$pdf->MultiCell(0,8,strtoupper($row->brandName),0,'',0,1);
								//$pdf->Cell(100,8,strtoupper($brandName),0,1,'L'); //Todo: Add Dosage Form
								
								$pdf->SetFont('times','',10);
								
								// $pdf->MultiCell(70,12,'Name of the Active immunogenic ingredient(s) and Strength:',0,'',0,0);
								
								 $ingred_rows = DB::table('tra_product_ingredients as t1')
									->select('t1.*', 't6.name as reason_for_inclusion', 't2.name as ingredient_specification', 't3.name as si_unit', 't4.name as ingredient_name', 't5.name as ingredient_type')
									->leftJoin('par_specification_types as t2', 't1.specification_type_id', '=', 't2.id')
									->leftJoin('par_si_units as t3', 't1.ingredientssi_unit_id', '=', 't3.id')
									->leftJoin('par_ingredients_details as t4', 't1.ingredient_id', '=', 't4.id')
									->leftJoin('par_ingredients_types as t5', 't1.ingredient_type_id', '=', 't5.id')
									->leftJoin('par_inclusions_reasons as t6', 't1.inclusion_reason_id', '=', 't6.id')
									->where(array('t1.product_id' => $row->product_id, 'is_active_reason'=>1))
									->get();			
								
								if($ingred_rows){
									$pdf->SetFont('times','I',10);
									foreach($ingred_rows as $ingred_row){
										
										$ingr_name=$ingred_row->ingredient_name;
										//$strength=$ingred_row->strength;
										$pdf->SetFont('times','B',10);
										// $pdf->MultiCell(0,5,strtoupper($ingr_name).'  '.strtoupper($strength).' '.strtoupper($ingred_row->si_unit),0,'',0,1);
										$pdf->Cell(70,5,'',0,0,'L');
										
									}
									
								}else{
									$ingr_name='';
									$proportion='';
									$strength='';
									$specification_id=0;
								}
								
								$pdf->ln();
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(70,8,'Indication:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								
									$pdf->MultiCell(0,8,strtoupper($row->contraindication),0,'J',0,1);
								$pdf->SetFont('times','',10);
								
								$pdf->MultiCell(70,8,'Dosage form:',0,'',0,0);
								$pdf->SetFont('times','B',10);
						
								$pdf->MultiCell(0,12,strtoupper($row->dosage_form).' '.strtoupper($row->physical_description),0,'J',0,1);
								$pdf->SetFont('times','',10);
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(69,10,'Pack size and Packaging type:',0,'',0,0);
								//$pdf->Cell(70,5,'',0,0,'L');
								
								$pdf->SetFont('times','B',10);
								$packaging = '';
											$container_name = '';
											$retail_packaging_size = '';
								$packaging_data = DB::table('tra_product_packaging as t1')
											->select(DB::raw("t1.*, t2.name as container_type, t3.name as container_name, t4.name as container_material, t5.name as closure_materials, t4.name as container_material, t5.name as closure_material, t6.name as seal_type, t7.name as packaging_units, CONCAT_WS('X',retail_packaging_size,retail_packaging_size1,retail_packaging_size2,retail_packaging_size3,retail_packaging_size4) as retail_packaging"))
											->leftJoin('par_containers_types as t2', 't1.container_type_id', '=', 't2.id')
											->leftJoin('par_containers as t3', 't1.container_id', '=', 't3.id')
											->leftJoin('par_containers_materials as t4', 't1.container_material_id', '=', 't4.id')
											->leftJoin('par_closure_materials as t5', 't1.closure_material_id', '=', 't5.id')
											->leftJoin('par_seal_types as t6', 't1.seal_type_id', '=', 't6.id')
											->leftJoin('par_packaging_units as t7', 't1.packaging_units_id', '=', 't7.id')
											->where(array('t1.product_id' => $row->product_id))
											->get();
								
								if($packaging_data->count() >0){
								$i = 1;
									foreach($packaging_data as $packaging_rec){
										
											$container_material = $packaging_rec->container_material;
											$container_name = $packaging_rec->container_name;
											
											$retail_packaging_size = $packaging_rec->retail_packaging;
											
											$product_unit = $packaging_rec->unit_pack;		
											if($i != 1){
												$pdf->Cell(69,5,'',0,0);
											}									
											if($product_unit == ''){
											
													$pdf->MultiCell(0,5,strtoupper($container_material).' '.strtoupper($container_name) .' OF '.strtoupper($retail_packaging_size),0,'',0,1);
											}
											else{
												
													$pdf->MultiCell(0,5,strtoupper($container_material).' '.strtoupper($container_name) .' OF '.strtoupper($retail_packaging_size).' X '.strtoupper($product_unit),0,'',0,1);													
																							
											}
											
											$i++;		
									
									}
											
								
								}
								else{
									
											$pdf->MultiCell(0,10,'',0,'',0,1);
											
								}
								$pdf->SetFont('times','',10);
								$pdf->SetFont('times','',10);
								$pdf->MultiCell(70,8,'Shelf life of medicine in months and Storage statement:',0,'',0,0); ;
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,8,strtoupper($row->shelf_life).', '.strtoupper(html_entity_decode(($row->storage_condition))),0,'',0,1); ;
								
								
								$pdf->SetFont('times','',10);
								$pdf->Cell(70,8,'Distribution category:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,8,strtoupper($row->distribution_category),0,1,'L'); 
								
								$pdf->SetFont('times','',10);
								//$pdf->Cell(0,1,'',0,1);
								
								$pdf->MultiCell(70,10,'Name of marketing authorization holder:',0,'',0,0);
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,10,strtoupper($row->trader_name),0,'',0,1);
								//$pdf->Cell(100,12,ucwords($applicantName),0,1,'L'); 
								//$pdf->Cell(0,1,'',0,1);
								//Manufacturer
								 $manrow = DB::table('tra_product_manufacturers as t1')
									->select('t1.*', 't2.email_address','t1.id as manufacturer_id', 't2.physical_address', 't2.name as manufacturer_name','t2.postal_address', 't3.name as country_name', 't4.name as region_name', 't5.name as district_name')
									->join('tra_manufacturers_information as t2', 't1.manufacturer_id', '=', 't2.id')
									->join('par_countries as t3', 't2.country_id', '=', 't3.id')
									->leftJoin('par_regions as t4', 't2.region_id', '=', 't4.id')
									->leftJoin('par_districts as t5', 't2.district_id', '=', 't5.id')
									->leftJoin('par_manufacturing_roles as t6', 't1.manufacturer_role_id', '=', 't6.id')
									->where(array('t1.product_id' => $row->product_id, 'manufacturer_type_id' => 1))
									->first();
									
									$manufacturer_name='';
									$man_postal_address='';
									$man_physical_address='';
									$man_countryName='';
									$man_districtName='';
									$man_regionName = '';
									
								if($manrow){
									$manufacturer_name=$manrow->manufacturer_name;
									$man_postal_address=$manrow->postal_address;
									$man_physical_address=$manrow->physical_address;
									
									$man_countryName= $manrow->country_name;
									$man_regionName = $manrow->region_name;
								}
								
								//Manufacturer sql 
								$pdf->SetFont('times','',10);
								
								$pdf->MultiCell(70,10,'Name and Address of the Manufacturer:',0,'',0,0);
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($manufacturer_name),0,'',0,1);
								
								$pdf->SetFont('times','',10);
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($man_postal_address),0,'',0,1);
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,5,strtoupper($man_physical_address),0,'L');
								
								if($man_regionName!=''){
									$pdf->Cell(70,5,'',0,0,'L');
									$pdf->SetFont('times','B',10);
									$pdf->Cell(100,5,strtoupper($man_regionName),0,1,'L'); 
								}
								$pdf->Cell(70,5,'',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,5,strtoupper($man_countryName),0,1,'L'); 
								 
								$pdf->SetFont('times','',10);$pdf->MultiCell(70,8,'Name of Local Technical Representative:',0,'',0,0);
								
								
								$pdf->SetFont('times','B',10);
								$pdf->MultiCell(0,8,strtoupper($row->localAgentName),0,'',0,1);
								//$pdf->Cell(100,8,strtoupper($localAgentName),0,1,'L'); 
								
								$pdf->SetFont('times','',10);
								//$pdf->Cell(0,1,'',0,1);
								$pdf->Cell(70,8,'Issued on:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,8,ucwords(date('F d, Y ',strtotime($row->certificate_issue_date))),0,1,'L'); 
								
								
								$pdf->SetFont('times','',10);
								//$pdf->Cell(0,1,'',0,1);
								$pdf->Cell(70,8,'Expires on:',0,0,'L');
								$pdf->SetFont('times','B',10);
								$pdf->Cell(100,8,ucwords(date('F d, Y ',strtotime($row->expiry_date))),0,1,'L'); 
								//$pdf->Cell(0,1,'',0,1);
								$pdf->Cell(0,2,'',0,1);
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
								
								
								
								$pdf->Cell(0,2,'',0,1);
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
								
								$this->getCertificateSignatoryDetail($row,$pdf);
								
								// $pdf->AddPage();
								// $pdf->SetFont('times','B',9);
								
								
								// $pdf->Cell(0,5,'Conditions of Registration:',0,1);
								// $pdf->SetFont('times','',11);
								// $pdf->Cell(0,2,'',0,1);
								
								//$this->getCertificateRegistrationConditions($row,$pdf);
								
								$pdf->Output();
						}	
							
								
			
			
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
        return response()->json($res);
		
	}
	public function printClinicalTrialCertificate($application_code,$application_id){
		
		try{
				$approvalGrant = DB::table('tra_approval_recommendations')->where('application_code', $application_code)->first();
			if(!$approvalGrant){
				echo "The application has not been approved, contact the system administration.";
				exit();
			}
			if($approvalGrant->decision_id == 1){
			 
							$record = DB::table('tra_clinical_trial_applications as t2')
					->join('wb_trader_account as t3', 't2.applicant_id', '=', 't3.id')
					->leftJoin('clinical_trial_personnel as t4', 't2.sponsor_id', '=', 't4.id')
					->leftJoin('clinical_trial_personnel as t5', 't2.investigator_id', '=', 't5.id')
									->join('tra_approval_recommendations as t6', 't2.application_code', '=', 't6.application_code')
									->leftJoin('par_countries as t7', 't4.country_id', '=', 't7.id')
									->leftJoin('par_regions as t8', 't4.region_id', '=', 't7.id')
									->leftJoin('users as t17', 't6.permit_signatory', '=', 't17.id')
					->select(DB::raw("t2.*,t2.id as previous_id,concat(decrypt(t17.first_name),' ',decrypt(t17.last_name)) as permit_signatoryname,	 t6.permit_signatory,t6.permit_no,t3.name as applicant_name,t4.name as sponsor,t5.name as investigator,
						t3.id as applicant_id, t3.name as applicant_name, t3.contact_person, t3.tin_no,t2.reference_no,t2.*,t6.expiry_date as regexpiry_date,t6.approval_date as regcertificate_issue_date, t6.certificate_no as registration_no,t7.name as sponsor_country, t7.name as sponsor_region,
						t3.country_id as app_country_id, t3.region_id as app_region_id, t3.district_id as app_district_id,t2.id as application_id,
						t3.physical_address as app_physical_address, t3.postal_address as app_postal_address,t4.postal_address as sponsor_address ,
											t3.telephone_no as app_telephone,t3.fax as app_fax, t3.email as app_email, t3.website as app_website"))
											->where('t2.application_code',$application_code)
											->first();
							if($record){
								$row = $record;
								$principal_investigator= $row->investigator;
								$principal_investigator= $row->investigator;
								$application_id = $row->application_id;
								$reference_no = $row->reference_no;	$protocol_no = $row->protocol_no;
								$data = "Clincial Trial Authorisation: Permit No:".$row->registration_no."; Protocol No:".$row->protocol_no.";Issued Date:".formatDate($row->regcertificate_issue_date);
								$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
							
											$org_info = $this->getOrganisationInfo();
												
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf, '');
											
								$this->funcGenerateQrCode($record,$pdf);
												
											
											$logo = getcwd() . '/resources/images/org-logo.jpg';
											$pdf->SetFont('times','B',9);
											$pdf->Cell(0,1,'',0,1);
											$pdf->Image($logo, 91, 15, 31, 36);
											
										
										$pdf->Cell(0,25,'',0,1);
											
										$pdf->SetFont('','B',12);
									
										$pdf->Cell(0,5,'CLINICAL TRIAL APPROVAL CERTIFICATE',0,1,'C');
										$pdf->SetFont('','BI',9);
										$pdf->Cell(0,5,'(Made under section 61(2)(b)(ii) of Uganda National Drug AUTHORITY Act, Cap 219)',0,1,'C');
										$pdf->MultiCell(0,5,'(Made under law No. 003/2018 of 09/02/2018 establishing the Uganda NDA and determining its mission, organization, and functioning in its article 8, paragraph 7and article 9, paragraph 2)',0,'C',0,1);
								
										$pdf->Cell(0,5,'',0,1);
										$pdf->SetFont('','B',11);
										$pdf->Cell(0,5,'Clinical Trial Approval Certificate No:'.strtoupper($row->registration_no),0,1,'');
										$pdf->Cell(0,5,'',0,1);
									$pdf->SetFont('','',11);
										$pdf->MultiCell(0,5,"This is to certify that the clinical trial described below has been approved in Uganda subject to conditions indicated in this certificate.:\n",0,'J',0,1);
												
										$pdf->SetFont('','',11);
										$pdf->SetLineWidth(0.2);
										//get Study sites 
										$study_siterec = DB::table('study_sites as t1')
										->join('par_countries as t2', 't1.country_id', '=', 't2.id')
										->leftJoin('par_regions as t3', 't1.region_id', '=', 't3.id')
										->join('clinical_trial_sites as t4', 't1.id', '=', 't4.study_site_id')
									
										->select('t1.*','t1.name as study_site_name', 't2.name as country_name', 't3.name as region_name')
										->where('t4.application_id',$application_id);
										$total_record = $study_siterec->count();
										$study_siterec = 	$study_siterec->get();
										$study_sites= '';
															
															$i = 1;
															if($study_siterec){
																
																foreach($study_siterec as $rows){
																	if( $total_record == 1){
																		$study_sites.= $rows->study_site_name." ".$rows->physical_address." ".$rows->region_name." "; 
																
																	}
																	else if($i == $total_record){
																		$study_sites.= " and ".$rows->study_site_name." ".$rows->physical_address." ".$rows->region_name." "; 
																
																	}
																	else if(($i+1) == $total_record){
																		$study_sites.=$rows->study_site_name." ".$rows->physical_address." ".$rows->region_name." "; 
																
																	}
																	else{
																		$study_sites.= $rows->study_site_name." ".$rows->physical_address." ".$rows->region_name.", "; 
																
																	}
																			$i++;
																}
															
															}
										
										$pdf->Cell(0,5,'',0,1);
										$pdf->SetFont('','',11);
										$pdf->Cell(60,5,'Protocol Title: ',0,0);
										$pdf->SetFont('','B',11);
										$pdf->MultiCell(0,5,strtoupper($row->study_title),0,'L');
										$pdf->Cell(0,5,'',0,1);
										$pdf->SetFont('','',11);
										$pdf->setCellHeightRatio(1.8);
										//$date_of_protocol = date('jS F, Y',strtotime($pdf->date_of_protocol));
										$pdf->Cell(60,5,'Protocol Number and version: ',0,0);
										$pdf->WriteHTML('<span style="text-align:justify;"><b>'.strtoupper($row->protocol_no).'</b> <b>'.strtoupper($row->version_no).'</b></span>', true, 0, true, true,'');
									
										$pdf->SetFont('','',11);
										
										$pdf->Cell(60,7,'Name of the Investigational product (s):',0,1);
										$pdf->MultiCell(90,6,'Investigational Product(s)/Intervention (s)',1,'',0,0);
										
										$pdf->MultiCell(0,6,'Comparator (s)',1,'',0,1);
										
										$prod_records = DB::table("clinical_trial_products")
																->select("*")
																->where(array('application_id'=>$application_id))
																->get();
										$comparator_products = '';							
										$investigational_products = '';							
										if($prod_records){
												foreach($prod_records as $prod_record){
														$brand_name = $prod_record->brand_name;
														$product_category_id = $prod_record->product_category_id;
														if($product_category_id == 1){
															$comparator_products = $brand_name.', ';
														}else if($product_category_id == 2){
															$investigational_products = $brand_name.', ';
														}
														
													
												}
										}
										$pdf->SetFont('','B',11);
										$pdf->MultiCell(90,6,strtoupper(trim($investigational_products, ', ')),1,'',0,0);
										
										$pdf->MultiCell(0,6,strtoupper(trim($comparator_products ,', ')),1,'',0,1);
										
										$pdf->SetFont('','',11);
										$pdf->Cell(60,5,'Study site(s):',0,0);
										$pdf->SetFont('','B',11);
										$pdf->MultiCell(0,5,strtoupper($study_sites),0,'',0,1);
										
										
										$pdf->SetFont('','',11);
										$pdf->Cell(60,5,'Name of the Principal Investigator(s).',0,0);
										$pdf->SetFont('','B',11);
										$pdf->MultiCell(0,5,strtoupper($principal_investigator),0,'',0,1);
										$pdf->SetFont('','',11);
										$pdf->MultiCell(60,5,'Sponsor’s name:  ',0,'',0,0);
										$pdf->MultiCell(0,5,strtoupper($row->sponsor),0,'',0,1);
										$pdf->SetFont('','',11);
										$pdf->Cell(60,5,'Issued on:',0,0);
										$pdf->SetFont('','B',11);
										
										$approval_date = date('j\<\s\u\p\>S\<\/\s\u\p\> F Y', strtotime($row->regcertificate_issue_date));
										
										$pdf->SetFont('','',11);
										
										$pdf->WriteHTML('<b>'.strtoupper($approval_date),true,0,true,true);
										
										$expiry_date = date('j\<\s\u\p\>S\<\/\s\u\p\> F Y', strtotime($row->regexpiry_date));
										
										$pdf->SetFont('','',11);
										$pdf->Cell(60,5,'Expires on:',0,0);
										$pdf->WriteHTML('<b>'.strtoupper($expiry_date),true,0,true,true);
										$pdf->ln();
										$permit_signitory = '';
										$title= 'ACTING';
										$title= '';
										$approved_by = '';
														
										$this->getCertificateSignatoryDetail($record,$pdf);
										
										$pdf->AddPage();
										
												$pdf->SetFont('','BU',13);
												$pdf->Cell(0,5,'Key Conditions for compliance ',0,1);
															
										$pdf->SetFont('times','',11);
										
										$this->getCertificateRegistrationConditions($row,$pdf);
										
										
							}
							else{
									$pdf->SetFont('','B',12);
									$pdf->Cell(0,5,'No Record Found',0,1);
							
							}
								 $pdf->Output('Clinical trial Certificate '.date('Y').date('m').date('d').date('i').date('s').'.pdf','I');
							
	
			}else{
				return "Setup rejection letter";
			}
			
			
		}catch (\Exception $exception) {
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
        return response()->json($res);
		
		
	}
	public function printImportExportLicense($application_code,$record,$permit_watermark){
		try{
				$record = DB::table('tra_importexport_applications as t1')
						->join('sub_modules as t2','t1.sub_module_id','t2.id')
						->leftJoin('wb_trader_account as t3','t1.applicant_id', 't3.id')
						->join('par_countries as t4', 't3.country_id', 't4.id')
						->leftJoin('par_regions as t5', 't3.region_id', 't5.id')
						->leftJoin('par_ports_information as t6', 't1.port_id', 't6.id')
						->leftJoin('tra_permitsrelease_recommendation as t7', 't1.application_code', 't7.application_code')
						->leftJoin('users as t8', 't7.permit_signatory', 't8.id')
						->leftJoin('tra_permitsenderreceiver_data as t9','t1.sender_receiver_id', 't9.id')
						->leftJoin('par_countries as t10', 't9.country_id', 't10.id')
						->leftJoin('par_regions as t11', 't9.region_id', 't11.id')
						->leftJoin('par_modesof_transport as t12', 't1.mode_oftransport_id', 't12.id')
						->leftJoin('tra_managerpermits_review as t13', 't1.application_code', 't13.id')
						->leftJoin('tra_consignee_data as t14', 't1.consignee_id', 't14.id')
						->leftJoin('par_permitsproduct_categories as t15', 't1.permit_productscategory_id', 't15.id')
						->select('t2.title','t15.name  as product_category' ,'t2.title as permit_title','t13.permit_no','t14.name as consignee_name', 't1.sub_module_id', 't1.*','t3.name as applicant_name','t2.action_title','t6.name as port_entry', 't3.*', 't4.name as country_name', 't5.name as region_name','t7.permit_signatory', 't7.approval_date', DB::raw("concat(decrypt(t8.first_name),' ',decrypt(t8.last_name)) as permit_signatoryname, t9.name as suppler_name, t9.physical_address as suppler_address, t10.name as supplier_country, t11.name as supplier_region, t9.postal_address as supplier_postal_address, t12.name as mode_of_transport"))
						->where('t1.application_code',$application_code)->first();

						$sub_module_id = $record->sub_module_id;
						$permit_title = $record->permit_title;
						$action_title = $record->action_title;
						$consignee_name  = $record->consignee_name ;
						$approval_date = '';
						if($record->approval_date != ''){
								$approval_date = $record->approval_date;
						}
						if($record){
							$org_info = $this->getOrganisationInfo();
												
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf, '');
											
								$this->funcGenerateQrCode($record,$pdf);
								$logo = getcwd() . '/resources/images/org-logo.jpg';
								$pdf->SetFont('times','B',9);
								$pdf->Cell(0,1,'',0,1);
									$pdf->ln();
									$pdf->Image($logo, 89, 15, 33, 35);
											
											
								$pdf->Cell(40,10,'',0,1);
								$pdf->ln();
							   
								$pdf->SetFont('','B',13);
								$pdf->MultiCell(0,5,strtoupper($permit_title),0,'C',0,1);
								
								$pdf->SetFont('','B',10);
								$pdf->Cell(40,7,'Visa No: '.$record->permit_no,0,1);
								//$pdf->ln(); 
								$pdf->SetFont('','',10);
								$pdf->setCellHeightRatio(1.8);
								$pdf->WriteHTML("This is to certify the (Name of permit holder)<b> ".strtoupper($record->applicant_name)."</b> of (Physical Address) <b>".strtoupper($record->physical_address.", ".$record->postal_address.", ".$record->region_name.", ".$record->country_name).$consignee_name."</b> is authorised to <b>".$action_title."</b> Uganda NDA regulated products specified in Proforma Invoice number <b>".$record->proforma_invoice_no."  for the following products categories : ".$record->product_category, true, 0, true, true,'J');
								
								$pdf->MultiCell(0,6,'Total Product Value',0,'',0,1);
								
								
							//	$pdf->Cell(0,5,'Date: '.date('jS F, Y',strtotime($approval_date)),0,1,'R');
								$pdf->SetFont('','B',10);
								
								$pdf->Cell(10,7,'No',1,0);
								$pdf->Cell(45,7,'Product',1,0);
								$pdf->Cell(30,7,'Batch Details',1,0);
								$pdf->Cell(30,7,'Quantity',1,0);
								$pdf->Cell(25,7,'Unit Value',1,0);
								$pdf->Cell(0,7,'Total Value',1,1);
								$pdf->SetFont('','',10);
							$prod_rec = DB::table('tra_permits_products as t1')
																		->leftJoin('tra_product_information as t2', 't1.product_id', 't2.id')
																		->leftJoin('par_dosage_forms as t3', 't1.dosage_form_id', 't3.id')
																		->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
																		->leftJoin('par_common_names as t5', 't1.common_name_id', 't5.id')
																		->leftJoin('par_si_units as t6', 't1.unitpack_unit_id', 't6.id')
																		->leftJoin('par_currencies as t7', 't1.currency_id', 't7.id')
																		->select('t1.*','t7.name as currency_name', 't4.name as packaging_unit','t1.product_strength','t5.name as generic_name', 't2.brand_name', 't3.name as dosage_form', 't6.name as si_unit', 't1.unitpack_size')
																		->where(array('application_code'=>$record->application_code))
																		->get();
											$prod_counter = $prod_rec->count();						
								if($prod_counter >0){
											$i=1;
											$total_amount = 0;
									foreach($prod_rec as $rec){
										if($rec->permitbrand_name != ''){
												$permit_brandname = $rec->permitbrand_name.' '.$rec->generic_name;
										}
										else{
											$permit_brandname = $rec->brand_name.' '.$rec->generic_name;

										}			
										$amount = ($rec->unit_price*$rec->quantity);
										$batch_details = "Batch No: ".$rec->product_batch_no." Batch Qty- ".$rec->quantity." Expiry Date -".formatDateRpt($rec->product_expiry_date);
										$packaging_data = $rec->unitpack_size.' '.$rec->si_unit;
											$rowcount = max(PDF::getNumLines($permit_brandname, 120),PDF::getNumLines($batch_details, 25));
											$pdf->MultiCell(10,5*$rowcount,$i,1,'',0,0);
											$pdf->MultiCell(45,5*$rowcount,$permit_brandname,1,'',0,0);
											$pdf->MultiCell(30,5*$rowcount,$batch_details,1,'',0,0);
											$pdf->MultiCell(30,5*$rowcount,$rec->quantity.' '.$rec->packaging_unit,1,'',0,0);
											$pdf->MultiCell(25,5*$rowcount,formatMoney($rec->unit_price).' ',1,'',0,0);
											$pdf->MultiCell(0,5*$rowcount,formatMoney($amount).$rec->currency_name,1,'R',0,1);	
											$currency_name = $rec->currency_name;
											$total_amount = $total_amount+$amount;
									}
										$pdf->Cell(140,7,'Total Value:',1,0, 'C');
										$pdf->Cell(0,7,formatMoney($total_amount).' '.$rec->currency_name,1,1, 'R');
								}   $pdf->SetFont('','',10);
								$pdf->ln();
								$pdf->WriteHTML("Name of Supplier / Exporter / Consignee :<b> ".strtoupper($record->suppler_name)."</b> of (Physical Address) <b>".strtoupper($record->suppler_address.", ".$record->supplier_region.", ".$record->supplier_country).'</b>.', true, 0, true, true,'J');
								
								
								$pdf->Cell(0,5,'This Special Case Import Visa is valid for only 3 months from the issue date',0,1);
								
								$pdf->ln();
								$pdf->Cell(0,5,'Done at Kigali on : '.formatDateRpt($record->approval_date),0,1);
												
								
								$pdf->ln();
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
												
								$this->getCertificateSignatoryDetail($record,$pdf);
									$pdf->Output($permit_title.'.pdf');

						}
					
										
					
		}catch (\Exception $exception) {
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
        return response()->json($res);
		
		
		
		
	}
	public function printImportExportvisa($application_code,$record,$permit_watermark){
		try{
				$record = DB::table('tra_importexport_applications as t1')
						->join('sub_modules as t2','t1.sub_module_id','t2.id')
						->leftJoin('wb_trader_account as t3','t1.applicant_id', 't3.id')
						->join('par_countries as t4', 't3.country_id', 't4.id')
						->leftJoin('par_regions as t5', 't3.region_id', 't5.id')
						->leftJoin('par_ports_information as t6', 't1.port_id', 't6.id')
						->leftJoin('tra_permitsrelease_recommendation as t7', 't1.application_code', 't7.application_code')
						->leftJoin('users as t8', 't7.permit_signatory', 't8.id')
						->leftJoin('tra_permitsenderreceiver_data as t9','t1.sender_receiver_id', 't9.id')
						->leftJoin('par_countries as t10', 't9.country_id', 't10.id')
						->leftJoin('par_regions as t11', 't9.region_id', 't11.id')
						->leftJoin('par_modesof_transport as t12', 't1.mode_oftransport_id', 't12.id')
						->leftJoin('tra_managerpermits_review as t13', 't1.application_code', 't13.id')
						->leftJoin('tra_consignee_data as t14', 't1.consignee_id', 't14.id')
						->leftJoin('par_permitsproduct_categories as t15', 't1.permit_productscategory_id', 't15.id')
						->select('t2.title','t15.name  as product_category' ,'t2.title as permit_title','t13.permit_no','t14.name as consignee_name', 't1.sub_module_id', 't1.*','t3.name as applicant_name','t2.action_title','t6.name as port_entry', 't3.*', 't4.name as country_name', 't5.name as region_name','t7.permit_signatory', 't7.approval_date', DB::raw("concat(decrypt(t8.first_name),' ',decrypt(t8.last_name)) as permit_signatoryname, t9.name as suppler_name, t9.physical_address as suppler_address, t10.name as supplier_country, t11.name as supplier_region, t9.postal_address as supplier_postal_address, t12.name as mode_of_transport"))
						->where('t1.application_code',$application_code)->first();

						$sub_module_id = $record->sub_module_id;
						$permit_title = $record->permit_title;
						$action_title = $record->action_title;
						$consignee_name  = $record->consignee_name ;
						$approval_date = '';
						if($record->approval_date != ''){
								$approval_date = $record->approval_date;
						}
						if($record){
							$org_info = $this->getOrganisationInfo();
												
								$pdf = new PdfProvider();
								$this->getCertificateHeader($pdf, '');
											
								$this->funcGenerateQrCode($record,$pdf);
								$logo = getcwd() . '/resources/images/org-logo.jpg';
								$pdf->SetFont('times','B',9);
								$pdf->Cell(0,1,'',0,1);
									$pdf->ln();
									$pdf->Image($logo, 89, 15, 33, 35);
											
											
								$pdf->Cell(40,10,'',0,1);
								$pdf->ln();
							   
								$pdf->SetFont('','B',13);
								$pdf->MultiCell(0,5,strtoupper($permit_title),0,'C',0,1);
								
								$pdf->SetFont('','B',10);
								$pdf->Cell(40,7,'Visa No: '.$record->permit_no,0,1);
								//$pdf->ln(); 
								$pdf->SetFont('','',10);
								$pdf->setCellHeightRatio(1.8);
								$pdf->WriteHTML("This is to certify the (Name of permit holder)<b> ".strtoupper($record->applicant_name)."</b> of (Physical Address) <b>".strtoupper($record->physical_address.", ".$record->postal_address.", ".$record->region_name.", ".$record->country_name).$consignee_name."</b> is authorised to <b>".$action_title."</b> Uganda NDA regulated products specified in Proforma Invoice number <b>".$record->proforma_invoice_no."  for the following products categories : ".$record->product_category, true, 0, true, true,'J');
								
								$pdf->MultiCell(0,6,'Total Product Value',0,'',0,1);
								
								
							//	$pdf->Cell(0,5,'Date: '.date('jS F, Y',strtotime($approval_date)),0,1,'R');
								$pdf->SetFont('','B',10);
								
								$pdf->Cell(10,7,'No',1,0);
								$pdf->Cell(45,7,'Product',1,0);
								$pdf->Cell(30,7,'Pack Size',1,0);
								$pdf->Cell(30,7,'Quantity',1,0);
								$pdf->Cell(25,7,'Unit Value',1,0);
								$pdf->Cell(0,7,'Total Value',1,1);$pdf->SetFont('','',10);
							$prod_rec = DB::table('tra_permits_products as t1')
																		->leftJoin('tra_product_information as t2', 't1.product_id', 't2.id')
																		->leftJoin('par_dosage_forms as t3', 't1.dosage_form_id', 't3.id')
																		->leftJoin('par_packaging_units as t4', 't1.packaging_unit_id', 't4.id')
																		->leftJoin('par_common_names as t5', 't1.common_name_id', 't5.id')
																		->leftJoin('par_si_units as t6', 't1.unitpack_unit_id', 't6.id')
																		->leftJoin('par_currencies as t7', 't1.currency_id', 't7.id')
																		->select('t1.*','t7.name as currency_name', 't4.name as packaging_unit','t1.product_strength','t5.name as generic_name', 't2.brand_name', 't3.name as dosage_form', 't6.name as si_unit', 't1.unitpack_size')
																		->where(array('application_code'=>$record->application_code))
																		->get();
											$prod_counter = $prod_rec->count();		
								$currency_name = '';											
								$total_amount = 0;											
								if($prod_counter >0){
											$i=1;
									foreach($prod_rec as $rec){
										if($rec->permitbrand_name != ''){
												$permit_brandname = $rec->permitbrand_name.' '.$rec->generic_name;
										}
										else{
											$permit_brandname = $rec->brand_name.' '.$rec->generic_name;

										}		
										$amount = $rec->unit_price*$rec->quantity;										
										$packaging_data = $rec->unitpack_size.' '.$rec->si_unit;
											$rowcount = max(PDF::getNumLines($permit_brandname, 120),PDF::getNumLines($packaging_data, 40));
											$pdf->MultiCell(10,5*$rowcount,$i,1,'',0,0);
											$pdf->MultiCell(45,5*$rowcount,$permit_brandname,1,'',0,0);
											$pdf->MultiCell(30,5*$rowcount,$rec->unitpack_size.' '.$rec->si_unit,1,'',0,0);
											$pdf->MultiCell(30,5*$rowcount,$rec->quantity.' '.$rec->packaging_unit,1,'',0,0);
											$pdf->MultiCell(25,5*$rowcount,($rec->unit_price).' ',1,'',0,0);
											$pdf->MultiCell(0,5*$rowcount,($amount).' '.$rec->currency_name,1,'R',0,1);	
													
											$currency_name = $rec->currency_name;
											$total_amount = $total_amount+$amount;
									} 
									$pdf->Cell(140,7,'Total Value:',1,0, 'C');
										$pdf->Cell(0,7,($total_amount).' '.$currency_name,1,1, 'R');
								}   $pdf->SetFont('','',10);
								$pdf->ln();
								$pdf->WriteHTML("Name of Supplier / Exporter / Consignee :<b> ".strtoupper($record->suppler_name)."</b> of (Physical Address) <b>".strtoupper($record->suppler_address.", ".$record->supplier_region.", ".$record->supplier_country).'</b>.', true, 0, true, true,'J');
								
								
								$pdf->Cell(0,5,'This Special Case Import Visa is valid for only 3 months from the issue date',0,1);
								
								$pdf->ln();
								$pdf->Cell(0,5,'Done at Kigali on : '.formatDateRpt($record->approval_date),0,1);
												
								
								$pdf->ln();
								$permit_signitory = '';
								$title= 'ACTING';
								$title= '';
								$approved_by = '';
												
								$this->getCertificateSignatoryDetail($record,$pdf);
									$pdf->Output($permit_title.'.pdf');

						}
					
										
					
		}catch (\Exception $exception) {
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
        return response()->json($res);
		
		
		
	}public function printImportExportLetterofRejection($application_code,$record,$permit_watermark){
		
		try{
			
				
					
		}catch (\Exception $exception) {
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
        return response()->json($res);
		
		
	}function generateRequestForAdditionalInformation($req){
		
		$application_code = $req->application_code;
		$module_id = $req->module_id;
		$query_id = $req->query_id;
		if(!validateIsNumeric($module_id)){
			$app_data = DB::table('tra_submissions')
            ->select('module_id')
			->where(array('application_code'=>$application_code))
            ->first();
			if($app_data){
						$module_id = $app_data->module_id;
					}
			}
			
			
			
			$module_data = getTableData('modules', ['id'=>$module_id]);
			
			$requestadditionalinfo_timespan =getTableData('par_requestadditionalinfo_timespan', ['module_id'=>$module_id]);
			if(!isset($requestadditionalinfo_timespan->time_span)){
				$time_span =23;
			}else{
				
				$time_span =$requestadditionalinfo_timespan->time_span ;
				
			}
					if(!isset($module_data->table_name)){
						return "Module details not found";
					}
			 $invoice_details = getInvoiceDetails($module_id, '',$application_code);
			 $app_description= '';
			if(isset($invoice_details)){
				$app_description = $invoice_details['module_desc'];
			}
			$app_data = DB::table($module_data->table_name.' as t1')
						->join('wb_trader_account as t2', 't1.applicant_id', 't2.id')
						->leftJoin('par_countries as t3', 't2.country_id', 't3.id')
						->leftJoin('par_regions as t4', 't2.region_id', 't4.id')
						->where('application_code', $application_code)
						->select('t1.applicant_id','t1.reference_no', 't1.tracking_no', 't2.*', 't3.name as country_name', 't4.name as region_name')
						->first();
			if(!$app_data){
				return "Application details not found";
			}

			$org_info = $this->getOrganisationInfo();
			$pdf = new mPDF( [
					'mode' => 'utf-8',
					'format' => 'A4',
					'margin_header' => '3',
					'margin_top' => '20',
					'margin_bottom' => '20',
					'margin_footer' => '2',
					'tempDir'=> '/xampp2/htdocs/nda/mis/backend/public/resources'
				]); 
			// $pdf = new PdfLettersProvider();
			$pdf->setMargins(5,25,5,true);
			$pdf->AddPage();
				$template_url = base_path('/');
				$pdf->setSourceFile($template_url."resources/templates/certificate_template.pdf");
				// import page 1
				$tplId = $pdf->importPage(1);	
				$pdf->useTemplate($tplId,0,0);
				$logo = getcwd() . '/resources/images/logo.png';
				$pdf->Image($logo,90,15,34,30);
				//$pdf->setPageMark();

			// $pdf->SetFont('times','B',9);
			// $pdf->Cell(0,1,'',0,1);

			$pdf->Cell(0,4,'',0,1,'R');
			// $pdf->Cell(0,4,'',0,1,'R');
			$pdf->SetFont('times','B',12);
			// $pdf->Cell(0,15,'',0,1);
			$pdf->Cell(0,4,$org_info->name,0,1,'C');
			$pdf->Cell(0,4,'The Medicines and Allied Substances Act, 2013',0,1,'C');

			$pdf->SetFont('times','B',12);
			$pdf->Cell(0,4,'(Act No. 3 of 2013)',0,1,'C');
			//$pdf->Cell(0,30,'',0,1);


			 $pdf->Cell(0,3,'',0,1);
				$startY = $pdf->y;
			$startX = $pdf->x;
			$pdf->SetLineWidth(0.3);
			$pdf->Line(0+55,$startY,160,$startY);
				$pdf->Cell(0,3,'',0,1);
			if($module_id == 4){
					$regulation_title = "The Medicines and Allied Substances (Importation and Exportaion) Regulations, 2017";
					$pdf->Cell(0,4,$regulation_title,0,1,'C');

			}
			else if($module_id == 2){
				//get the premises types 
				$record = DB::table('tra_premises_applications as t1')
								->join('tra_premises as t2', 't1.premise_id', 't2.id')
								->leftJoin('par_premises_types	 as t7', 't2.premise_type_id', 't7.id')
								->select('t7.act_name as premises_type')
								->where('application_code',$application_code)
								->first();
					if($record){
						$premise_type = $record->premises_type;
						
					$regulation_title = $premise_type;
					}else{
						
					$regulation_title = "The Medicines and Allied Substances (Certificate of Registration) Regulations, 2017";
					}
					$pdf->Cell(0,4,$regulation_title,0,1,'C');

			}
			else{
				$regulation_title = "The Medicines and Allied Substances";
				$pdf->Cell(0,4,$regulation_title,0,1,'C');
				$regulation_title = "(Marketing Authorisation of Medicines) Regulations, 2019";
				
				$pdf->Cell(0,4,$regulation_title,0,1,'C');
			}
			

			$pdf->Cell(0,5,'',0,1);
			$pdf->SetFont('times','B',12);
			
			$pdf->WriteHTML('REQUEST FOR ADDITIONAL INFORMATION FOR '.strtoupper($app_description)); 
			$pdf->SetFont('times','B',10);

			$pdf->SetFont('times','',10);
			$application_no = '';

			if($app_data->tracking_no != ''){
				
				$application_no = 	$app_data->tracking_no;
				
			}
			if($app_data->reference_no != ''){

				$application_no .= 	' '.$app_data->reference_no;
			}
			$pdf->Cell(0,10,'Application Reference:'.$application_no,0,1, 'R');
				// $pdf->MultiCell(0,10,'Application Reference:<u>'.$app_data->tracking_no.'</u>',0,'R',0,1,'','',true,0,true);
			$data = '{"tracking_no":'.$app_data->tracking_no.',"module_id":'.$module_id.',"application_code":'.$application_code.'}';

			$styleQR = array('border' => false, 'padding' => 0, 'fgcolor' => array(0, 0, 0), 'bgcolor' => false);
			// QRCODE,H : QR-CODE Best error correction
			// $pdf->write2DBarcode($data, 'QRCODE,H', 178, 28, 16, 16);

			// $barcode = "<barcode code='".$data."' type='CODE11' height='0.66' text='1' />";
			//$pdf->writeBarcode('111111111',0, 178, 28);
			$pdf->SetFont('times','',12);
			//Letter heading 
			$pdf->Cell(0,8,'To:',0,1);
			$pdf->Cell(0,8,$app_data->name.',',0,1);
			if($app_data->physical_address != ''){
					$pdf->Cell(0,8,$app_data->physical_address.',',0,1);

				}		
				if(($app_data->physical_address !=  $app_data->postal_address)){
					
						$pdf->Cell(0,8,$app_data->postal_address.',',0,1);
				}
			//$pdf->Cell(0,8,$app_data->physical_address.',',0,1);
			//$pdf->Cell(0,8,$app_data->postal_address.',',0,1);
			$pdf->Cell(0,8,$app_data->region_name." ".$app_data->country_name,0,1);

			$pdf->SetFont('times','',11);
			//$pdf->ln();

			//add query header tag
			$template = "You are requested to furnish, the following information or documents in request of your application for ".$module_data->name." within ".$time_span." days of this request.";

			$pdf->WriteHTML($template);
			$pdf->SetFont('times','B',12);
			//add query items
			//loop through requests
			//$pdf->ln();

			$pdf->Cell(0,5,'',0,1);
			$request_data = DB::table('checklistitems_queries as t1')
							->join('tra_application_query_reftracker as t2', 't1.query_id', 't2.id')
							->leftJoin('par_checklist_items as t3', 't1.checklist_item_id', 't3.id')
							->select('t1.query', 't1.comment', 't2.queried_on', 't2.is_live_signature','t3.name as checklist_item', 't2.sign_file')
							->where('t2.id', $query_id)
							->get();

			$pdf->SetFont('times','',11);

			$counter = 1;
			$is_live_signature=0;
			$sign_data='';
			$query_date = Carbon::now();
			
			
				
			foreach ($request_data as $data){
				$pdf->SetTextColor(0,0,0);
					//$query_data = $data->checklist_item.': '.$data->query;
					$query_data = $data->query;
					$pdf->Cell(12,5,$counter.'. ',0,0);

					// $pdf->WriteHTML($query_data, true, false, true, true);
					if($query_data != ''){
						$pdf->WriteHTML($query_data); 
						$pdf->ln();
					}
					

				$counter++;
			}//setPageMark

			$pdf->cell(10,3,'',0,1);
			$template = "<p  align='justify'>If you fail to furnish the requested information within the stipulated period, your application will be treated as invalid and be rejected</b></p>";
			$pdf->WriteHTML($template); 
			$pdf->ln();

			$dt =strtotime($query_date); //gets dates instance
			$year = date("Y", $dt);
			$month = date("F", $dt);
			$day = date("d", $dt);

				$pdf->Cell(0, 0,'Dated this '.$day.' day of '.$month.', '.$year, 0, 1, '', 0, '', 3);
			$pdf->cell(0,8,'',0,1);
					$startY = $pdf->y;
			$startX =$pdf->x;
			$signiture = getcwd() . '/backend/resources/templates/signatures_uploads/dg_sinatory.png';
			//$pdf->Image($signiture,$startX+75,$startY-7,30,12);
					//$pdf->Cell(0, 0, '___________________________',0,1,'C');
					$pdf->Cell(0, 0, 'On behalf of NDA',0,1,'');
			return response($pdf->Output('Request for Additional Information('.$application_no.').pdf',"I"),200)->header('Content-Type','application/pdf');
																			
						
		
		
	}
}