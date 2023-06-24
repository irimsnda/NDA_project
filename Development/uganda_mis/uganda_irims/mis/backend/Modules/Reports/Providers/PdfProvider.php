<?php

namespace Modules\Reports\Providers;

use setasign\Fpdi\TcpdfFpdi;
class PdfProvider extends TcpdfFpdi
{
  public $params = array();
	public function __construct($qr_data=array()){
			parent::__construct();
		$this->params = $qr_data;
		
	}
  function Header(){
   $this->setMargins(7,25,10,true);
  
		if ($this->PageNo() ==1) {
						$org_info = $this->getOrganisationInfo();
				$logo = getcwd() . '/resources/images/org-logo.jpg';
			$this->Image($logo,90,10,33,33);
		 
		}
	}
  function Footer()
	{
		//Position at 1.5 cm from bottom
		$this->SetY(-23);
		//Arial italic 8
    $this->SetFont('times','',8);
    $this->Cell(0,4,'Uganda Tel: +256 [0]417 788 100; Kampala, Uganda, Kampala, Uganda Website: www.nda.or.ug, Email: ndaug@nda.or.ug',0,1,'C');
    
    /*
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
function getOrganisationInfo(){
			
						$org_info = getSingleRecord('tra_organisation_information', array('id'=>1));
			
			return $org_info;
		}
}