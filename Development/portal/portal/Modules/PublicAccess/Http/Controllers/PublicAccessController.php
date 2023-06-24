<?php

namespace Modules\PublicAccess\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
 
class PublicAccessController extends Controller
{
    /**
     * Display a listing of the resource.
     * @return Response
     */
     PRIVATE $connection;
    public function __construct(){
         $this->connection = DB::connection('mis_db');

    }
   
    function returnpremisesFilters($rec){
        $whereClauses = array();
        $filter_string = '';
        if($rec->registration_no != ''){
            $whereClauses[] = "t1.premise_reg_no like '%" . ($rec->registration_no) . "%'";

        }
        if($rec->premises_name != ''){
            $whereClauses[] = "t1.name like '%" . ($rec->premises_name) . "%'";
            
        }
        if($rec->registrant){

            $whereClauses[] = "t3.name like '%" . ($rec->registrant) . "%'";
        }
        if (!empty($whereClauses)) {
            $filter_string = implode(' AND ', $whereClauses);
        }
        
        return $filter_string;
    }
	
	
    
    function returnproductssFilters($rec){
        $whereClauses = array();
        $filter_string = '';
        if($rec->registration_no != ''){
            $whereClauses[] = "t4.certificate_no like '%" . ($rec->registration_no) . "%'";

        }
        if($rec->brand_name != ''){
            $whereClauses[] = "t2.brand_name like '%" . ($rec->brand_name) . "%'";
            
        }
        if($rec->market_authorisation_holder){

            $whereClauses[] = "t10.name like '%" . ($rec->market_authorisation_holder) . "%'";
        }if($rec->section_id){

            $whereClauses[] = "t3.section_id like '%" . ($rec->section_id) . "%'";
        }
        if (!empty($whereClauses)) {
            $filter_string = implode(' AND ', $whereClauses);
        }
        
        return $filter_string;
    }
	 function returngmpFilters($rec){
        $whereClauses = array();
        $filter_string = '';
        if($rec->registration_no != '' && $rec->registration_no != null){
            $whereClauses[] = "t7.permit_no like '%" . ($rec->registration_no) . "%'";

        }
        if($rec->premises_name != ''  && $rec->premises_name != null){
            $whereClauses[] = "t2.name like '%" . ($rec->premises_name) . "%'";
            
        }
        if($rec->registrant  && $rec->registrant != null){

            $whereClauses[] = "t6.name like '%" . ($rec->registrant) . "%'";
        }
        if (!empty($whereClauses)) {
            $filter_string = implode(' AND ', $whereClauses);
        }
        
        return $filter_string;
    }
    public function onSearchPublicGmpComplaints(Request $rec){
        try{

            $skip = $rec->skip;
            $take = $rec->take;
             $filter_records = '';
            $filter_records = '';
          //  $qry = $this->connection->table('vw_gmp_complaincedetails as t1');
			$qry = DB::connection('mis_db')->table('tra_gmp_applications as t1')
			->join('tra_manufacturing_sites as t2', 't1.manufacturing_site_id', 't2.id')
			->join('par_countries as t3', 't2.country_id', 't3.id')
			->leftJoin('par_regions as t4', 't2.region_id', 't4.id')
			->leftJoin('par_gmplocation_details as t5', 't1.gmp_type_id', 't5.id')
			->leftJoin('wb_trader_account as t6', 't1.applicant_id', 't6.id')
			->leftJoin('tra_approval_recommendations as t7', 't1.application_code', 't7.application_code')
			->leftJoin('par_districts as t8', 't2.district_id', 't8.id')
			->leftJoin('tra_mansite_otherdetails as t10', 't2.id', 't10.manufacturing_site_id')
			->leftJoin('par_business_type_details as t11', 't11.id', 't10.business_type_detail_id')
			->select(DB::raw("Distinct t2.id, t11.name as business_type_details, `t2`.`postal_address` AS `postal_address`,`t2`.`email` AS `email`,`t2`.`id` AS `id`,`t2`.`physical_address` AS `physical_address`,`t2`.`name` AS `gmp_facility_name`,`t8`.`name` AS `district_name`,`t7`.`permit_no` AS `certificate_no`,`t7`.`approval_date` AS `date_of_registration`,`t3`.`name` AS `country_name`,`t4`.`name` AS `region_name`,`t5`.`name` AS `gmp_location`,`t6`.`name` AS `registrant_name`"))
			->whereIn('decision_id',[1])
			->whereRaw("t7.expiry_date >= now()");
			
			
            if(validateIsNumeric($rec->section_id)){
                $qry->where('t1.section_id',$rec->section_id);
            }
    
            $filter_string = $this->returngmpFilters($rec);
    
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
    
            $total_rows = $qry->count();
            $data = $qry->get();
			//$data = $qry->groupBy('t2.id')->skip($skip)->take($take)->get();

			//$data = $qry->groupBy('t2.id')->skip($skip)->take($take)->get();

            $res = array('success'=>true, 'data'=>$data, 'totalCount'=>$total_rows);
    
         //   $res = array('success'=>true, 'data'=>$data);
    
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);

    }
    public function onSearchPublicRegisteredpremises(Request $rec){
        try{

           $skip = $rec->skip;
           $take = $rec->take;
            $filter_records = '';
            $qry = $this->connection->table('vw_registered_premisesdetails as t1');
    
            if(validateIsNumeric($rec->section_id)){
                $qry->where('t1.section_id',$section_id);
            }
            $extra_params = json_decode($rec->extra_paramsdata);

            $filter_string = $this->returnpremisesFilters($extra_params);
         
            if ($filter_string != '') {
                $qry->whereRAW($filter_string);
            }
            //$data = $qry->get();
            $total_rows = $qry->count();
            $data = $qry->skip($skip)->take($take)->get();

            $res = array('success'=>true, 'data'=>$data, 'totalCount'=>$total_rows);
    
        }
        catch (\Exception $e) {
            $res = array(
                'success' => false,
                'message' => $e->getMessage()
            );
        } catch (\Throwable $throwable) {
            $res = array(
                'success' => false,
                'message' => $throwable->getMessage()
            );
        }
        return response()->json($res);
}
public function onSearchPublicRegisteredproducts(Request $rec){
    try{
        $skip = $rec->skip;
           $take = $rec->take;
        $filter_records = '';
	
     //   $qry = $this->connection->table('vw_registered_productsdetails as t1');
        $qry = $this->connection->table('tra_product_information as t2')
                                ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                                ->join('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                                ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                                ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                                ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                                ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                                ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                                ->leftJoin('par_sections as t9', 't3.section_id', '=','t9.id')
                                ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                                ->leftJoin('wb_trader_account as t12', 't3.local_agent_id', '=','t12.id')
                                ->leftJoin('par_dosage_forms as t13', 't2.dosage_form_id', '=','t13.id')
                                ->leftJoin('par_countries as t14', 't10.country_id', '=','t14.id')
                                ->leftJoin('tra_product_manufacturers as t15', function ($join) {
                                    $join->on('t15.product_id', '=', 't2.id')
                                        ->where('t15.manufacturer_type_id', '=', 1);
                                })
								->leftJoin('tra_manufacturers_information as t16', 't15.manufacturer_id', '=', 't16.id')
                                ->leftJoin('par_countries as t17', 't16.country_id', '=','t17.id')
                                ->select(DB::raw("t3.product_id, t16.name as manufacturer, t17.name as manufacturer_country,t10.name as registrant,t12.name as localtechnical_representative,t13.name as dosage_form,max(t4.certificate_issue_date) as certificate_issue_date, max(t4.expiry_date) as app_expiry_Date, t1.id as reg_product_id,t4.certificate_no,t2.id as product_id,t2.*,t2.brand_name,t14.name as registrant_country ,t5.name as generic_name,t9.name as section_name, t6.name as classification_name, t7.name as validity_status, t1.validity_status_id,t8.name as registration_status"));
								
								$qry->where(array('validity_status_id'=>2, 'registration_status_id'=>2));
								
                $qrycount =  $this->connection->table('tra_product_information as t2')
                                ->leftJoin('tra_registered_products as t1', 't1.tra_product_id','=','t2.id')
                                ->join('tra_product_applications as t3', 't3.product_id', '=', 't2.id')
                                ->join('tra_approval_recommendations as t4', 't3.application_code', '=','t4.application_code')
                                ->leftJoin('par_common_names as t5', 't2.common_name_id', '=','t5.id')
                                ->leftJoin('par_classifications as t6', 't2.classification_id', '=','t6.id')
                                ->leftJoin('par_validity_statuses as t7', 't1.validity_status_id', '=','t7.id')
                                ->leftJoin('par_registration_statuses as t8', 't1.registration_status_id', '=','t8.id')
                                ->leftJoin('par_sections as t9', 't3.section_id', '=','t9.id')
                                ->leftJoin('wb_trader_account as t10', 't3.applicant_id', '=','t10.id')
                                ->leftJoin('wb_trader_account as t12', 't3.local_agent_id', '=','t12.id')
                                ->leftJoin('par_dosage_forms as t13', 't2.dosage_form_id', '=','t13.id')
                                ->leftJoin('par_countries as t14', 't10.country_id', '=','t14.id')
                                ->leftJoin('tra_product_manufacturers as t15', function ($join) {
                                  $join->on('t15.product_id', '=', 't2.id')
                                         ->where('t15.manufacturer_role_id', '=', 1);
                                })
								->leftJoin('tra_manufacturers_information as t16', 't15.manufacturer_id', '=', 't16.id')
                                ->leftJoin('par_countries as t17', 't16.country_id', '=','t17.id')
                                ->select('t3.product_id');
								
			$qrycount->where(array('validity_status_id'=>2, 'registration_status_id'=>2)) ;
			
			if($rec->sub_modulesin != ''){
				$sub_modulesin = explode(',',$rec->sub_modulesin);
				 $qry->whereIn('t3.sub_module_id',$sub_modulesin);
				 $qrycount->whereIn('t3.sub_module_id',$sub_modulesin);
		  
			}
        if(validateIsNumeric($rec->section_id)){
          
		   $qry->where('t3.section_id',$rec->section_id);
		    $qrycount->where('t3.section_id',$rec->section_id);
		  
		   
        } 
        
        $extra_params = json_decode($rec->extra_paramsdata);


       /* $filter_string = returnproductssFilters($extra_params);

        if ($filter_string != '') {
            $qry->whereRAW($filter_string);
			$qrycount->whereRAW($filter_string);
        }
        */
        $total_rows = $qrycount->count();
		
        $data = $qry->groupBy('t2.id')->skip($skip)->take($take)->get();

        $res = array('success'=>true, 'data'=>$data,'totalCount'=>$total_rows);

    }
    catch (\Exception $e) {
        $res = array(
            'success' => false,
            'message' => $e->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,
            'message' => $throwable->getMessage()
        );
    }
    return response()->json($res);
}

function returnClinicalTrailFilters($rec){
    $whereClauses = array();
    $filter_string = '';
    if($rec->registration_no != ''){
        $whereClauses[] = "t1.cerificate_no like '%" . ($rec->registration_no) . "%'";

    }
    if($rec->applicant_name != ''){
        $whereClauses[] = "t1.registrant_name like '%" . ($rec->applicant_name) . "%'";
        
    }
    if($rec->registrantcountry_id){

        $whereClauses[] = "t1.registrantcountry_id = '" . ($rec->registrantcountry_id) . "'";
    }
    if($rec->study_title){

        $whereClauses[] = "t1.study_title like '%" . ($rec->registrant) . "%'";
    }
    if($rec->study_site_id){

        $whereClauses[] = "t1.name like '%" . ($rec->registrant) . "%'";
    }
    if($rec->principal_investigator){

        $whereClauses[] = "t1.principal_investigator like '%" . ($rec->principal_investigator) . "%'";
    }
    if($rec->clinical_trial_sponsor){

        $whereClauses[] = "t1.clinical_trialsponsor like '%" . ($rec->clinical_trial_sponsor) . "%'";
    }
    if (!empty($whereClauses)) {
        $filter_string = implode(' AND ', $whereClauses);
    }
    
    return $filter_string;
}
public function onSearchPublicRegisteredclinicaltrials(Request $req){
    try{
        $search_value = $req->search_value;
        $mistrader_id = $req->mistrader_id;
        $sub_module_id = 56;
       // 'applicant_id'=>$mistrader_id,
         $filter_string = '';
		 $whereClauses = array();
       if($req->certificate_no != ''){
        $whereClauses[] = "(t1.tracking_no like '%" . ($req->certificate_no) . "%' or t1.reference_no like '%" . ($req->certificate_no) . "%')";

    }
    if($req->applicant_name != ''){
        $whereClauses[] = "t7.name like '%" . ($req->applicant_name) . "%'";
        
    }
    if(validateisNumeric($req->registrantcountry_id)){

        $whereClauses[] = "t7.country_id = '" . ($req->registrantcountry_id) . "'";
    }
    if($req->public_title !=''){

        $whereClauses[] = "t1.public_title like '%" . ($req->public_title) . "%'";
    }
	 if($req->study_title !=''){

        $whereClauses[] = "t1.study_title like '%" . ($req->study_title) . "%'";
    }
 if($req->purpose_of_trial !=''){

        $whereClauses[] = "t1.purpose_of_trial like '%" . ($req->study_title) . "%'";
    }
if($req->trial_design !=''){

        $whereClauses[] = "t1.trial_design like '%" . ($req->study_title) . "%'";
    }
    if (isset($whereClauses[0])) {
        $filter_string = implode(' AND ', $whereClauses);
    }
$where_statement = array();
       $where_statement= array('sub_module_id'=>$sub_module_id);

       if(validateIsNumeric($mistrader_id)){
            $where_statement['applicant_id'] = $mistrader_id;
       }
	    if(validateIsNumeric($req->phase_id)){
            $where_statement['phase_id'] = $req->phase_id;
       }
	     if(validateIsNumeric($req->recruitment_status_id)){
            $where_statement['recruitment_status_id'] = $req->recruitment_status_id;
       }
        $qry = DB::connection('mis_db')->table('tra_clinical_trial_applications as t1')
                    ->leftJoin('par_clinicaltrial_designs as t2', 't1.trial_design_id','t2.id')
                    ->leftJoin('par_clinical_phases as t3', 't1.phase_id','t3.id')
                    ->leftJoin('par_clinical_studypurposes as t4', 't1.purpose_of_trial','t4.id')
                    ->leftJoin('par_clinical_studypurposes as t5', 't1.recruitment_status_id','t5.id')
                    ->leftJoin('par_clinical_registrystatuses as t6', 't1.clinical_registrystatus_id','t6.id')
                    
                    ->leftJoin('wb_trader_account as t7', 't1.applicant_id','t7.id')
                    ->leftJoin('par_countries as t8', 't7.country_id','t8.id')
					->leftJoin('tra_approval_recommendations as t9', 't1.application_code','t9.application_code')
					->leftJoin('tra_clinicaltrial_contactpersons as t10',function($join){
                        $join->on('t10.application_id', '=', 't1.id');

                    })
					
                    ->leftJoin('par_countries as t11', 't10.country_id','t11.id')
                    ->select(DB::raw(" DISTINCT t1.id,t1.*,t2.name as trial_design, t10.name as registrant,t7.identification_no,  t3.name as clinical_study_phase,t4.name as purpose_of_trial, t5.name as recruitment_status, t11.name as registrant_country, if(t1.clinical_registrystatus_id >1,'Published','Clinical Trial Registered') as application_status, if(date_format(t1.completion_date, '%Y') >0, t1.completion_date, t1.study_end_date) as completion_date, if(t9.decision_id=1, 1,2) as is_ctrapp_registered"))
					->where(function($query) use ($sub_module_id) {
							$query->where('t9.decision_id', '=',1)
							->orWhere('t1.clinical_registrystatus_id', '=',4);
					})
                    ->where($where_statement);
					//
                if ($filter_string != '') {
                        $qry->whereRAW($filter_string);
                    }  
                $data = $qry->get();
                    $res =array('success'=>true,'data'=> $data);
                    
    } catch (\Exception $exception) {
        $res = array(
            'success' => false,
            'message' => $exception->getMessage()
        );
    } catch (\Throwable $throwable) {
        $res = array(
            'success' => false,'message1'=>$resp,
            'message' => $throwable->getMessage()
        );
    }

    return response()->json($res);
}
//other datasets 

}
