<?php

namespace Modules\Reports\Providers;

use setasign\Fpdi\TcpdfFpdi;
class PdfPlainLettersProvider extends TcpdfFpdi
{
  public $params = array();
	public function __construct($qr_data=array()){
			parent::__construct();
		$this->params = $qr_data;
		
	}
  function Header(){
			$this->setMargins(5,25,5,true);
   

			/*$this->Cell(20,0,'',0,1);
		   $this->Cell(0,4,$org_info->org_name,0,1,'C');
		   $this->Cell(0,4,$org_info->location.',' .$org_info->street,0,1,'C');
		   $this->Cell(0,4,$org_info->postal_address.', '.$org_info->region_name,0,1,'C');
		   $this->Cell(0,4,$org_info->email.' : '.$org_info->website,0,1,'C');
		   $this->ln();
		   $this->Cell(0,4,'The Medicines and Allied Substances Act, 2013',0,1,'C');
		   */
				
	}
	function getOrganisationInfo(){
			$data = array('org_name'=>strtoupper('Zambia Medicines Regulatory Authority'), 
								'postal_address'=>'P.O. Box 31890,',
								'region_name'=>'Lusaka, Zambia',
								'email'=>'pharmacy@zamra.co.zm',
								'website'=>'www.zamra.co.zm',
								'street'=>'Off Kenneth Kaunda International Airport Road,',
								'location'=>' Plot No. 2350/M.',
								'act'=>'(The Medicines and Allied Substances Act, 2013)',
								'fax'=>'',
								'telephone'=>'+260 211 432 350, +260 211 432 351,+260 211 432 352',
								'org_acynm'=>'ZAMRA',
								'logo'=>'logo.jpg',
								
						);
			$org_info = (object)$data;
			return $org_info;
		}
  function Footer()
	{
		/*//Position at 1.5 cm from bottom
		$this->SetY(-15);
		//Arial italic 8
		$startY = $this->GetY();
								$startX = $this->GetX();
    $this->SetFont('times','',8);
     
    $this->SetLineWidth(0.3);
    $this->Line(0+30,$startY,180,$startY);
			
    $this->Cell(0,8,'Branches:Ndola, Chipata, Lvingstone, Chirundu, Nakonde, Solwezi, Kasama, Kenneth Kaunda International Airport(KKIA)',0,1,'C');
   
    
		 if ($this->page == 1) {
          $this->get_Docqrcode($this->params);
          $postion = $this->params['position'];
          $qr_code  = getcwd().'/assets/uploads/app_detail.png';
          $this->Image($qr_code,178,$postion,16);
		 }
     */
		 $this->SetY(-90);
		 
	}public function get_Docqrcode($params){
		$qr_code = new Ciqrcode($params);
		//get the details 
		
		$qr_code->generate($params); 
		
	 }

}