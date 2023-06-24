<?php

namespace Modules\SampleAnalysis\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SampleAnalysisRptController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function __construct(Request $req)
    {
       
    }
    function getSystemMasterDetails() {
        $data = array();
        
        $data =  DB::connection('lims_db')->table('system_master_details')->first();
        
        return $data;
      
    }
    function getReportheader($title) {
        $data = $this->getSystemMasterDetails();
        PDF::AddPage();

        $logo = getcwd() . '/resources/img/logo.jpg';
        PDF::SetFont('', 'B', 12);
    
        PDF::Cell(0, 5, $data->organisation_name, 0, 1, 'C');
        
        PDF::SetFont('', 'B', 9);
        //PDF::Cell(0,5,'',0,2);
        PDF::Cell(0, 5, 'P.O. Box '.$data->postal_address, 0, 1, 'C');
        PDF::Cell(0, 5, 'Tel: '.$data->telephone_nos.', Fax: '.$data->organisation_fax, 0, 1, 'C');
        PDF::Cell(0, 5, 'Website: '.$data->organisation_website.', Email: '.$data->organisation_email, 0, 1, 'C');
        PDF::Cell(0, 5, '', 0, 2);
        PDF::Image($logo, 86, 32, 35, 14);
        PDF::Cell(0, 13, '', 0, 2);
        PDF::SetFont('', 'B', 11);
        PDF::Cell(0, 5, $title, 0, 1, 'C');
        PDF::SetFont('', 'B', 11);
    }
    function get_reviewRecommendation($sample_id) {
        $sql_query =  DB::connection('lims_db')->select( DB::raw("select t1.*,t2.FullName as review_by from sample_review_recommendation t1 inner join users t2 on t1.reviewed_by = t2.usr_id where sample_id = '".$sample_id."'"));
        if ($sql_query) {
            $row = $sql_query;
            $data = array('reviewed_on'=>$row->reviewed_on,'review_by'=>$row->review_by,'recommendation_id' => $row -> recommendation_id, 'comments' => $row -> comments);

        } else {
            $data = array('reviewed_on'=>'','review_by'=>'','recommendation_id' => '', 'comments' => '');

        }
        return $data;
    }
    function getProcess_manager($section_id, $sample_id) {
        $ci = &get_instance();
        $row = array();
        $laboratory_id = '';
        $ci -> db = $ci -> load -> database('default', TRUE);
        $sql_query = $ci -> db -> query("select t3.laboratory_id,t2.section_id from sample_applications t3 inner join sample_test_request t1 on t1.sample_id = t3.sample_id inner join testparameters t2 on t1.test_parameter_id = t2.id where t1.sample_id = '" . $sample_id . "' and t1.pass_status = 1 group by t2.section_id order by t2.section_id asc");
        if ($sql_query -> num_rows() > 0) {
            $row = $sql_query -> row();
            $section_id = $row -> section_id;
            $laboratory_id = $row -> laboratory_id;
            //take the parameter signatory
        }
        
        $where_lab = '';// 
        if(is_numeric($laboratory_id) && $laboratory_id != 0){
            
            $where_lab = " and t2.laboratory_id = '".$laboratory_id."'";
        }
        $sql_query = $ci -> db -> query("select t2.usr_id,t3.FullName from departments_process t1 inner join departmental_signatory t2 on t1.department_id = t2.department_id inner join users t3 on t2.usr_id = t3.usr_id where t1.process_id = '" . $section_id . "' $where_lab");
        $FullName = '';
        if ($sql_query -> num_rows() > 0) {
            $row = $sql_query -> row();
            $FullName = $row -> FullName;
        }
        return $FullName;
    }
function getsamplemisDirectorate($section_id) {

        $sql_query = DB::connection('lims_db')->select( DB::raw("select t1.name as sample_source from directorates t1 inner join directorates_process t2 on t1.id= t2.directorate_id
        where t2.section_id = '" . $section_id . "'"));
        $sample_source = '';
        if ($sql_query) {
            $row = $sql_query;

            $sample_source = $row -> sample_source;
        }
        return $sample_source;

    }
    public function printSampleTestRequestReview(Request $req){
        try {
            $sample_id = $req->sample_id;
            $title = "TEST REQUEST FORM";
            $this->getReportheader($title);
        $record = DB::connection('lims_db')->select( DB::raw("select t3.can_subcontract,t12.name as `quantity_units`, t2.pack_size, t11.name as pack_units, mis_process_id,t10.name as dosage_form, t9.name as classification_name, t3.section_id,t3.sample_id,laboratory_no, t5.physicaladdress as man_address,t5.country_id as man_country_id,t5.region_id as man_region_id, t8.name as product_form,t7.name as common_name,t1.name, t1.postal_address,t1.region_id,t1.country_id,t2.brand_name,t2.product_desc,t5.name as manufacturer,t2.quantity,t2.batchno,t2.expirydate,t2.manufacturedate,t3.reference_no,t3.code_ref_no,t3.sub_contracting,t4.name as Analysisreasons,t3.submission_date,t3.applicant_id,t3.sample_id,t3.`contact_person` from companies t1 inner join sample_applications t3 on t1.id = t3.applicant_id inner join samples t2 on t2.id = t3.sample_id left join analysisreason t4 on t4.id = t3.reason_for_analysis left join manufacturer t5 on t5.id = t2.manufacturer_id left join common_names t7 on t2.common_name = t7.id left join productform t8 on t2.product_form = t8.id left join classification t9 on t2.`classification` = t9.id  left join dosageform t10 on t2.dosage_form = t10.id left join packaging_units t11 on t2.pack_unit_id = t11.id left join packaging_units t12 on t2.quantity_unit_id = t12.id where t3.sample_id = '" . $sample_id . "'"));
        
        if ($record) {
            $rows = $record[0];
            $code_ref_no = $rows -> code_ref_no;
            $reference_no = $rows -> reference_no;
            $sample_id = $rows -> sample_id;
            $applicant_name = $rows -> name;
            $section_id = $rows -> section_id;
            $postal_address = $rows -> postal_address;
            $classification_name = $rows -> classification_name;
            $dosage_form = $rows -> dosage_form;
            $mis_process_id = $rows -> mis_process_id;
            //
            $region_name = getSingleRecordColValue('par_regions', array('id'=>$rows->region_id), 'name');
         
            $country_name = getSingleRecordColValue('par_countries', array('id'=>$rows->country_id), 'name');
            
            $man_region = getSingleRecordColValue('par_regions', array('id'=>$rows->man_region_id), 'name');
         
            $man_country = getSingleRecordColValue('par_countries', array('id'=>$rows->man_country_id), 'name');
            
            $man_address = $rows -> man_address;
            //$man_address $man_country $man_region

            $quantity = $rows -> quantity;
            $quantity_units = $rows -> quantity_units;

            $pack_size = $rows -> pack_size;
            $pack_units = $rows -> pack_units;

            $sample_name = $rows -> brand_name;
            $common_name = $rows -> common_name;
            $product_form = $rows -> product_form;
            $submission_date = formatDaterpt($rows -> submission_date);
            $manufacturer = $rows -> manufacturer;
            $reason_for_analysis = $rows -> Analysisreasons;
            $manudate = formatDaterpt($rows -> manufacturedate);
            $expirydate = formatDaterpt($rows -> expirydate);
            $batch = $rows -> batchno;
            $contact = $rows -> contact_person;
            $product_desc = $rows -> product_desc;
            $subcontracting = $rows -> sub_contracting;
            $can_subcontract = $rows -> can_subcontract;
            $laboratory_no = $rows -> laboratory_no;

            PDF::SetFont('', 'B', 9);

            PDF::Cell(35, 6, 'Reference number:', 0, 0);
            PDF::SetFont('', '', 9);
            PDF::Cell(55, 6, $reference_no, 0, 0);
            PDF::SetFont('', 'B', 9);
            PDF::Cell(45, 6, 'Laboratory code number:', 0, 0);
            PDF::SetFont('', '', 9);
            PDF::Cell(0, 6, $laboratory_no, 0, 1);
            PDF::SetFont('', '', 9);
            if (is_numeric($mis_process_id) && $mis_process_id != 0) {
                
                $sample_source = $this->getsamplemisDirectorate($mis_process_id);
                
                PDF::SetFont('', 'B', 9);
                
                PDF::Cell(35, 6, 'Customers Details', 0, 0);
                PDF::SetFont('', '', 11);
                PDF::Cell(0, 6, $sample_source, 0, 1);
            } else {
                
                PDF::SetFont('', 'B', 9);
                
                PDF::Cell(35, 6, 'Customers Details', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(60, 6, $applicant_name.' '.$postal_address . ' ' . $region_name . ', ' . $country_name, 0, 1);

            }
            PDF::SetFont('', 'B', 9);

            PDF::Cell(35, 6, 'Customer code:', 0, 0);

            PDF::SetFont('', '', 11);
            PDF::Cell(0, 6, $code_ref_no, 0, 1);

            PDF::SetFont('', '', 11);
            
            PDF::SetFont('', 'B', 10);
            PDF::Cell(0, 10, 'Sample Information', 0, 1, 'L');
            PDF::SetFont('', '', 9);
            
            if ($section_id == 2) {
                PDF::SetFont('', 'B', 9);
                
                $dimensions = PDF::getPageDimensions();
                $rowcount = max(PDF::getNumLines($sample_name, 95), PDF::getNumLines($common_name, 40));
            
                //PDF::Cell(30, 6, 'Product name:', 0, 0);
                PDF::MultiCell(30, $rowcount * 5, 'Product name:', 0, '', 0, 0);                
                
                PDF::SetFont('', '', 9);
                //PDF::Cell(80, 6, $sample_name, 0, 0);
                PDF::MultiCell(95, $rowcount * 5, $sample_name, 0, '', 0, 0);               
                
                PDF::SetFont('', 'B', 9);
                //PDF::Cell(30, 6, 'Common Name:', 0, 0);
                PDF::MultiCell(25, $rowcount * 5,'Dosage Form:', 0, '', 0, 0);              
                
                PDF::SetFont('', '', 9);
                //PDF::Cell(30, 6, $common_name, 0, 1);
                PDF::MultiCell(40, $rowcount * 5,$dosage_form, 0, '', 0, 1);                
                

            } else if ($section_id == 1 || $section_id == 3) {
                PDF::SetFont('', 'B', 9);
                
                $dimensions = PDF::getPageDimensions();
                $rowcount = max(PDF::getNumLines($sample_name, 80), PDF::getNumLines($common_name, 30));

                //PDF::Cell(30, 6, 'Product name:', 0, 0);
                PDF::MultiCell(30, $rowcount * 5, 'Product name:', 0, '', 0, 0);                
                
                PDF::SetFont('', '', 9);
                //PDF::Cell(80, 6, $sample_name, 0, 0);
                PDF::MultiCell(80, $rowcount * 5, $sample_name, 0, '', 0, 0);               
                
                PDF::SetFont('', 'B', 9);
                //PDF::Cell(30, 6, 'Common Name:', 0, 0);
                PDF::MultiCell(30, $rowcount * 5,'Common Name:', 0, '', 0, 0);              
                
                PDF::SetFont('', '', 9);
                //PDF::Cell(30, 6, $common_name, 0, 1);
                PDF::MultiCell(40, $rowcount * 5,$common_name, 0, '', 0, 1);                
                
                PDF::SetFont('', 'B', 9);
                    
                PDF::Cell(30, 6, 'Product Form:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(0, 6, $product_form, 0, 1);
                
            } else {PDF::SetFont('', 'B', 9);
                
                PDF::Cell(30, 6, 'Product name:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(60, 6, $sample_name, 0, 0);
                PDF::SetFont('', 'B', 9);
                PDF::Cell(35, 6, 'Classification Name:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(0, 6, $classification_name, 0, 1);
            
            }
            PDF::SetFont('', 'B', 9);
        
            PDF::Cell(80, 6, 'Description (appearance of container & contents):', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(0, 6, $product_desc, 0, 1);
        
            if ($section_id == 2 || $section_id == 5) {
                $ex_date = explode('-', $rows -> expirydate);
                //yyyy-mm-dd
                $expiry_year = $ex_date[0];
                //yyyy
                $expiry_month = $ex_date[1];
                //mm
                $expirydate = $expiry_month . '-' . $expiry_year;
                $manu_date = explode('-', $rows -> manufacturedate);
                $manu_year = $manu_date[0];
                //yyyy
                $manu_month = $manu_date[1];
                $manudate = $manu_month . '-' . $manu_year;

            }
          PDF::SetFont('', 'B', 9);
    
            PDF::Cell(30, 6, 'Batch number:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(40, 6, $batch, 0, 0);
                PDF::SetFont('', 'B', 9);
                PDF::Cell(25, 6, 'Expiry date:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(30, 6, $expirydate, 0, 0);
                PDF::SetFont('', 'B', 9);
                
                PDF::Cell(35, 6, 'Manufacturing date:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(0, 6, $manudate, 0, 1);
            PDF::SetFont('', 'B', 9);
            
                PDF::Cell(30, 6, 'Manufacturer', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(60, 6, $manufacturer.' '.$man_region . ', ' . $man_country, 0, 1);
                
            $quantity = $rows -> quantity;
            $quantity_units = $rows -> quantity_units;

            $pack_size = $rows -> pack_size;
            $pack_units = $rows -> pack_units;

            PDF::SetFont('', 'B', 9);
            
                PDF::Cell(30, 6, 'Sample size:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(40, 6, $quantity .' '. $quantity_units , 0, 0);
                PDF::SetFont('', 'B', 9);
                PDF::Cell(25, 6, 'Packaging:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(30, 6,  $pack_size .' '. $pack_units , 0, 0);
                PDF::SetFont('', 'B', 9);
                
                PDF::Cell(30, 6, 'Submission date:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(0, 6, $submission_date, 0, 1);
            PDF::SetFont('', 'B', 9);
            
            PDF::Cell(60, 7, 'Reason(s) for requesting the analysis:', 0, 0);
                PDF::SetFont('', '', 9);
                PDF::Cell(0, 7, $reason_for_analysis, 0, 1);
    
            PDF::SetFont('', 'B', 11);
            PDF::Cell(0, 5, 'Sample Test Requests', 0, 1);
            PDF::SetFont('', 'B', 9);
            $sql_query =  DB::connection('lims_db')->select( DB::raw("select t3.id as parameter_costs_id,t2.id as parameter_id, t1.sample_id,t2.name as test_parameter, t1.parameter_cost as cost,t3.currency_id,t4.name as fee_type from sample_test_request t1 inner join testparameters t2 on t1.test_parameter_id = t2.id inner join parameter_costs t3 on t1.parameter_costs_id = t3.id left join fee_types t4 on t3.feetype_id = t4.id where t1.sample_id = '" . $sample_id . "' and pass_status = 1"));
            //$header = array('S/N', 'Test requested', 'Cost', 'Currency');
            PDF::Cell(0, 1, '', 0, 1);
            PDF::Cell(10,7,'S/N',1,0);
            PDF::Cell(60,7,'Test requested',1,0);
            PDF::Cell(25,7,'Cost (USD)',1,0);
            
            PDF::Cell(10,7,'S/N',1,0);
            PDF::Cell(60,7,'Test requested',1,0);
            PDF::Cell(25,7,'Cost (USD)',1,1);
            $i = 1;
            $totals = 0;
            PDF::SetFont('', '', 9);
            if($sql_query){
                        $total_rows = count($sql_query);
                        foreach($sql_query as $rows){
                                if(is_int($i/2)){
                        
                                        $is_break = 1;              
                                }
                                else{
                                    $is_break = 0;  
                                }
                                
                                        PDF::Cell(10,7,$i.'.',1,0,'C');
                                        PDF::Cell(60,7,$rows->test_parameter,1,0);
                                        PDF::Cell(25,7,formatMoney($rows->cost),1,$is_break,'R');
                                        $totals = $totals + $rows->cost;
                                if($total_rows == $i && !is_int($i/2)){
                                        PDF::Cell(10,7,'',1,0,'C');
                                        PDF::Cell(60,7,'',1,0);
                                        PDF::Cell(25,7,'',1,$is_break,'R'); 
                                    
                                }
                                    $i++;   
                        }
                        
                    }
            $review_recommendation = $this -> get_reviewRecommendation($sample_id);
                    $recommendation_id = $review_recommendation['recommendation_id'];
                    $comments = $review_recommendation['comments'];
                    $review_by =  $review_recommendation['review_by'];
                    $review_by =  $review_recommendation['review_by'];
                    $reviewed_on =  $review_recommendation['reviewed_on'];
                    
            PDF::SetFont('', 'B', 9);
            PDF::Cell(0,6,'',0,1);
            PDF::Cell(75, 7, 'Any other customer request: N/A', 0, 1, 'L');
            PDF::SetFont('', '', 9);
            PDF::SetFont('', 'B', 9);
            PDF::Cell(75, 7, 'Analysis fees and charges:', 0, 0, 'L');
            PDF::SetFont('', '', 9);
            PDF::Cell(0, 7, formatMoney($totals), 0, 1, 'L');
            PDF::Ln(2);
            if ($contact == '') {
                $contact = $applicant_name;
            }
            PDF::SetFont('', 'B', 9);
            PDF::Cell(30, 7, 'Customer name: ', 0, 0, 'L');
            PDF::SetFont('', '', 9);
            PDF::Cell(75, 7, $contact, 0, 0, 'L');
            PDF::SetFont('', '', 9);
            
            //PDF::Cell(70, 7, 'Signature: .......................................', 0, 0, 'L');
            PDF::Cell(0, 7, 'Date: ' . date('d-m-Y',strtotime($reviewed_on)), 0, 1, 'R');
            
            
            if ($recommendation_id == 1) {
                $recom = 'accept';
                $remarks = $comments;
            } else if ($recommendation_id == 2) {
                $recom = 'reject';
                $remarks = $comments;
            } else {
                $recom = 'accept/reject';
                $remarks = '';

            }
            $text = '';
            $manager = getProcess_manager($section_id,$sample_id);
            //echo $manager;
            if ($manager == $review_by) {
                
                $manager = $review_by;

            } else if ($manager == '') {

                $manager = $review_by;

            } else if ($manager != $review_by) {
                $text = 'Ag. ';
                $manager = $review_by;

            }
            PDF::SetFont('', '', 9);
            PDF::Cell(0, 7, 'I ' . $recom . ' to carry out tests specified above', 0, 1, 'L');

            PDF::Cell(30, 7, $text . 'LM : ', 0, 0, 'L');
            PDF::SetFont('', '', 9);
            PDF::Cell(70, 7, $manager, 0, 0, 'L');
            PDF::SetFont('', '', 9);
            
            PDF::Cell(0, 7, 'Date: ' . date('d-m-Y',strtotime($reviewed_on)), 0, 1, 'R');
            PDF::Cell(70);
            PDF::SetFont('', '', 9);
            
            
PDF::SetFont('', 'B', 9);
            
            PDF::Ln(1);
            PDF::Cell(75, 7, 'Sub-contracting', 0, 1, 'L');
            
            PDF::SetFont('', 'B', 9);
            $html = "Agreement for sub-contracting work <b>:".strtoupper($can_subcontract)."</b>";
PDF::SetFont('', '', 9);
            
            PDF::WriteHTML($html, true, 0, true, true, 'J');
            PDF::Ln(1);
            if($subcontracting != ''){
                $subcontracting = "Reason (s) <b>" . $subcontracting . "</b>";
            
            }
            
            PDF::WriteHTML($subcontracting, true, 0, true, true, 'J');
        
            PDF::SetFont('', '', 9);

            PDF::Cell(0, 7, 'Date: ............................................', 0, 1, 'L');

PDF::Ln(2);
            PDF::SetFont('', '', 9);
            //get ammended Test requests
            $test_ammend = $this->getAmmendedtestrequest($sample_id);
            
            $data = array('test_request'=>'','ammendements_date'=>'');
            
            PDF::MultiCell(0, 7,'Test request deviation or amendment/ additional test(s) (when applicable): '.$test_ammend['test_request'], 0, '', 0, 1);   
            PDF::SetFont('', '', 9);

            if($test_ammend['ammendements_date'] != ''){
                PDF::Cell(70, 7, 'Date: '.$test_ammend['ammendements_date'], 0, 0, 'L');
            }
            else{
                PDF::Cell(0, 7, 'Date: ............................................', 0, 1, 'L');
            }
            
            PDF::Cell(70);
           
        
        }
        
        PDF::Output('Test Request Review'. date('Y') . date('m') . date('d') . date('i') . date('s') . '.pdf', 'I');
        exit();



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
   
}
