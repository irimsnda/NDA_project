<?php

namespace Modules\Registers\Traits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithStrictNullComparison;
use App\Exports\GridExport;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Excel;
use Modules\OpenOffice\Http\Controllers\OpenOfficeController;
use Symfony\Component\HttpFoundation\StreamedResponse;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use Modules\Reports\Http\Controllers\ReportsController;
use PDF;

trait RegistersTrait
{

   public function DateFilter(request $req){
    $approved_from=$req->approved_from;
    $approved_to=$req->approved_to;
    $where_raw=array();

    if($approved_from != '' && $approved_to != ''){
       $where_raw[]="date_format(date_filter, '%Y%-%m-%d') BETWEEN '".formatDate($approved_from)."' AND '".formatDate($approved_to)."'";
      }
    
    $date_filter='';
    if (!empty($where_raw)) {
                     $date_filter = implode(' AND ', $where_raw);
                    }
     return $date_filter;

    }

public function DateFilterImportExport(request $req){
    $released_from=$req->released_from;
    $released_to=$req->released_to;
    $where_raw=array();

    if($released_from != '' && $released_to != ''){
       $where_raw[]="date_format(date_filter, '%Y%-%m-%d') BETWEEN '".formatDate($released_from)."' AND '".formatDate($released_to)."'";
      }
    
    $date_filter='';
    if (!empty($where_raw)) {
                     $date_filter = implode(' AND ', $where_raw);
                    }
     return $date_filter;

    }



  
   public function getTableName($module){

          $qry=DB::table('modules')
                ->where('id',$module)->first();

          $table=$qry->table_name;

          return $table;
     }



 
   

   public function getApprovedProductRegister($table, $table2,$field,$filterdata,$subfilterdata,$datefilter){

        $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t70','t1.application_code','t70.application_code')
           ->leftJoin($table2.' as t2','t1.'.$field,'t2.id')
           ->where($subfilterdata)
           ->where('t70.decision_id',1);
        //filter by submodule and section
        if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }
         //filter by date
        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t70.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
          $qry->LeftJoin('par_classifications as t3','t2.classification_id','t3.id')
              ->LeftJoin('par_common_names as t4','t2.common_name_id','t4.id')
              ->LeftJoin('par_storage_conditions as t8','t2.storage_condition_id','t8.id')
              ->LeftJoin('par_dosage_forms as t9','t2.dosage_form_id','t9.id')
              ->LeftJoin('par_zones as t11','t1.zone_id','t11.id')
              ->LeftJoin('par_product_origins as t12','t2.product_origin_id','t12.id')
              ->LeftJoin('wb_trader_account as t13','t1.applicant_id','t13.id')
              ->LeftJoin('wb_trader_account as t14','t1.local_agent_id','t14.id')
              ->LeftJoin('par_countries as t15','t13.country_id','t15.id')
              ->LeftJoin('par_regions as t16','t13.region_id','t16.id')
              ->LeftJoin('par_countries as t17','t14.country_id','t17.id')
              ->LeftJoin('par_regions as t18','t14.region_id','t18.id')
              ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
              ->LeftJoin('par_approval_decisions as t20','t19.decision_id','t20.id')
              ->LeftJoin('par_registration_statuses as t23','t19.appregistration_status_id','t23.id')
              ->LeftJoin('par_sections as t30','t1.section_id','t30.id')
              ->LeftJoin('par_validity_statuses as t24','t19.appvalidity_status_id','t24.id')
              ->LeftJoin('par_system_statuses as t25','t1.application_status_id','t25.id')
              ->LeftJoin('tra_product_manufacturers as t26', function ($join) {
           $join->on('t1.product_id', '=', 't26.product_id')
                ->where('t26.manufacturer_type_id', 1);
            })
                ->LeftJoin('tra_manufacturers_information as t27','t26.manufacturer_id','t27.id')
                ->LeftJoin('par_countries as t28','t27.country_id','t28.id')
                ->LeftJoin('par_regions as t29','t27.region_id','t29.id')
                 ->LeftJoin('tra_product_ingredients as t31','t1.product_id','t31.product_id')
                 ->LeftJoin('par_ingredients_details as t32','t31.ingredient_id','t32.id')
                

                ->select(DB::raw("t1.reference_no,t30.name as section_name,t2.brand_name,t3.name as Classification, t4.name as commonName,t9.name as ProductForm,t13.name as Applicant,t13.physical_address as ApplicantPhysicalA,t13.email as ApplicantEmail,t14.name as LocalAgent,t14.physical_address as LocalAgentPhysicalA,t14.email as 
                      LocalAgentEmail,t15.name as ApplicantCountry,t17.name as AgentCountry,t19.certificate_issue_date as IssueFrom,t19.certificate_no, t23.name as registration_status, t24.name as validity_status, t25.name as application_status, t27.name as Manufacturer,t27.physical_address as ManufacturerPhysicalA,t28.name as ManufacturerCountry,t27.email_address as ManufacturerEmail, t32.name as active_api,t2.product_strength as product_strength"));
        $qry->groupBy('t1.application_code');
        return $qry;

        } 
        public function getApprovedPremiseRegister($table, $table2,$field,$filterdata,$subfilterdata,$datefilter){


        $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
        //filter by submodule and section
        if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }

        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
           $qry->LeftJoin('wb_trader_account as t8','t1.applicant_id','t8.id')
                 ->LeftJoin('tra_premises_otherdetails as t10','t3.id','t10.premise_id')
                 ->leftJoin('par_countries as t13','t8.country_id','t13.id')
                 ->leftJoin('tra_approval_recommendations as t15','t1.application_code','t15.application_code')
                 ->LeftJoin('par_registration_statuses as t23','t15.appregistration_status_id','t23.id')
                 ->LeftJoin('par_validity_statuses as t24','t15.appvalidity_status_id','t24.id')
                 ->LeftJoin('par_sections as t25','t1.section_id','t25.id')
                    
                    

                ->addselect('t1.reference_no','t3.name','t3.email','t3.postal_address','t3.physical_address','t8.name as Trader','t8.physical_address as TraderPhysicalA','t8.email as TraderEmail','t13.name as TraderCountry','t15.expiry_date as CertExpiryDate','t15.certificate_issue_date as CertIssueDate','t15.permit_no as certificate_no', 't23.name as registration_status', 't24.name as validity_status','t25.name as section_name')
                ->groupBy('t1.application_code');

        return $qry;

        } 
          public function getApprovedGmpRegister($table, $table2,$field,$filterdata,$subfilterdata,$datefilter){


        $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
        //filter by submodule and section
        if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }

        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
          $qry->LeftJoin('tra_manufacturing_sites as t33','t1.manufacturing_site_id','t33.id')
                   ->LeftJoin('tra_manufacturers_information as t44','t33.manufacturer_id','t44.id')
                   ->LeftJoin('par_countries as t55','t33.country_id','t55.id')
                   ->LeftJoin('par_business_types as t8','t33.business_type_id','t8.id')
                   ->LeftJoin('wb_trader_account as t10','t33.applicant_id','t10.id')
                   ->LeftJoin('wb_trader_account as t11','t33.ltr_id','t11.id')
                   ->LeftJoin('tra_manufacturing_sites_personnel as t12','t33.contact_person_id','t12.id')
                   ->LeftJoin('par_countries as t14','t10.country_id','t14.id')
                   ->LeftJoin('par_countries as t16','t11.country_id','t16.id')
                   ->LeftJoin('tra_approval_recommendations as t18','t1.application_code','t18.application_code')
                   ->LeftJoin('par_gmpapproval_decisions as t21','t18.decision_id','t21.id')
                   ->LeftJoin('par_validity_statuses as tv','t18.appvalidity_status_id','tv.id')
                   ->LeftJoin('par_registration_statuses as tr','t18.appregistration_status_id','tr.id')
                  ->LeftJoin('par_system_statuses as t25','t1.application_status_id','t25.id')

                ->select('t1.reference_no','t33.name as manufacturing_site','t33.premise_reg_no','t44.name as manufacturer_name','t44.postal_address','t44.physical_address','t44.email_address','t55.name as country','t8.name as business_type','t10.name as Trader','t10.physical_address as TraderPhysicalA','t10.postal_address as TraderPostalA','t10.email as TraderEmail','t14.name as TraderCountry','t18.certificate_issue_date as IssueFrom','t18.certificate_no', 'tv.name as validity_status', 't21.name as approval_recommendation')
                     ->groupBy('t1.application_code');
        return $qry;

        } 
 public function getApprovedClinicalTrialRegister($table, $table2,$field,$filterdata,$subfilterdata,$datefilter){


        $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
        //filter by submodule and section
        if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }

        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
           $qry->LeftJoin('clinical_trial_duration_desc as t22','t1.duration_desc','t22.id')
           ->LeftJoin('clinical_trial_personnel as t33','t1.sponsor_id','t33.id')
           ->LeftJoin('clinical_trial_personnel as t44','t1.investigator_id','t44.id')
           ->leftJoin('tra_application_invoices as t55','t1.application_code','t55.application_code')
           ->LeftJoin('par_currencies as t6','t55.paying_currency_id','t6.id')
           ->LeftJoin('par_zones as t7', 't1.zone_id','t7.id')
           ->LeftJoin('par_countries as t8','t33.country_id','t8.id')
           ->LeftJoin('par_regions as t9','t33.region_id','t9.id')
           ->LeftJoin('par_countries as t10','t44.country_id','t10.id')
           ->LeftJoin('par_regions as t11','t44.region_id','t11.id')
           ->LeftJoin('tra_approval_recommendations as t12','t1.application_code','t12.application_code')
           ->LeftJoin('par_approval_decisions as t13','t12.decision_id','t13.id')
           ->LeftJoin('par_validity_statuses as tv','t12.appvalidity_status_id','tv.id')
           ->LeftJoin('par_registration_statuses as tr','t12.appregistration_status_id','tr.id')
           ->LeftJoin('wb_trader_account as t25','t1.applicant_id','t25.id')
           ->LeftJoin('par_regions as t26','t25.region_id','t26.id')
           ->LeftJoin('par_countries as t27','t25.country_id','t27.id')

           ->select('t1.study_title','t1.tracking_no','t1.reference_no','t1.protocol_no','t1.version_no','t1.study_start_date','t1.study_end_date','t1.date_of_protocol','t1.study_duration','t1.clearance_no','t22.name as duration_desc','t33.name as Sponsor','t33.postal_address as Spostal_address','t33.physical_address as Sphysical_address','t33.mobile_no as Smobile_no','t33.telephone as Stelephone_no','t33.email as Semail_address','t8.name as Scountry','t9.name as Sregion','t44.name as investigator','t44.postal_address as Ipostal_address','t44.physical_address as Iphysical_address','t44.mobile_no as Imobile_no','t44.telephone as Itelephone','t44.email as Iemail_address','t10.name as Icountry','t11.name as Iregion','t6.name as paying_currency','t7.name as CertIssuePlace','t12.certificate_issue_date as CertIssueDate','t12.expiry_date as CertExpiryDate','t12.certificate_issue_date as IssueFrom','t12.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo','t12.certificate_no','tv.name as validity_status', 'tr.name as registration_status', 't25.name as applicant','t25.postal_address as applicant_postal_address','t25.physical_address as applicant_physical_address','t25.email as applicant_email_address','t25.telephone_no as applicant_telephone','t25.mobile_no as applicant_mobile_no', 't26.name as applicant_region', 't27.name as applicant_country')
                ->groupBy('t1.application_code');
        return $qry;

        } 
        public function getApprovedDisposalRegister($table, $table2,$field,$filterdata,$subfilterdata,$datefilter){

         if($table2 == ''){
            $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
          }else{
           $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
          }
    
        //filter by submodule and section
        if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }

        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
           $qry->LeftJoin('tra_destruction_exercisesites as t22','t1.application_code','t22.application_code')
            ->LeftJoin('par_disposaldestruction_sites as t33','t22.destruction_site_id','t33.id')
            ->LeftJoin('tra_methodsof_destructions as t44','t1.application_code','t44.application_code')
             ->LeftJoin('par_destruction_methods as t55','t44.destructionmethod_id','t55.id')
             ->LeftJoin('par_packaging_units as t6','t1.packaging_unit_id','t6.id')
             ->LeftJoin('par_weights_units as t7','t1.weights_units_id','t7.id')
             ->LeftJoin('par_currencies as t8','t1.currency_id','t8.id')
             ->LeftJoin('tra_premises as t9','t1.premise_id','t9.id')
             ->LeftJoin('tra_disposal_inspectors as t10','t22.application_code','t10.application_code')
             ->LeftJoin('par_disposal_inspectors_titles as t11','t10.inspectors_title_id','t11.id')
             ->LeftJoin('par_organisations as t12','t10.organisation_id','t12.id')
             ->LeftJoin('wb_trader_account as t13','t1.trader_id','t13.id')
             ->LeftJoin('par_countries as t14','t9.country_id','t14.id')
             ->LeftJoin('par_countries as t15','t13.country_id','t15.id')
             ->LeftJoin('par_regions as t16','t13.region_id','t16.id')
             ->LeftJoin('par_zones as t17','t1.zone_id','t17.id')
             ->LeftJoin('par_sections as t18','t1.section_id','t18.id')
             ->LeftJoin('tra_approval_recommendations as t19','t1.application_code','t19.application_code')
            
              ->addselect('t1.tracking_no','t1.reference_no','t1.reason_for_disposal','t1.quantity','t1.total_weight','t1.market_value','t1.submission_date','t33.name as destruction_site', 't55.name as destruction_method','t6.name as packaging_unit','t7.name as weight_unit','t8.name as currency','t9.name as premise_name','t9.premise_reg_no','t9.email as premise_email','t9.telephone as premise_tell','t9.physical_address as premise_physical_address','t9.postal_address as premise_postal_address','t10.inspector_name as inspector_name','t11.name as inpsector_title','t12.name as inpsector_organisation','t13.name as trader_name','t13.postal_address as trader_postal_address','t13.physical_address as trader_physical_address','t13.email as trader_email_address','t13.telephone_no as trader_telephone','t13.mobile_no as trader_mobile_no','t14.name as premise_country','t15.name as trader_country','t16.name as trader_region','t17.name as CertIssuePlace','t18.name as product_type','t19.certificate_issue_date as CertIssueDate','t19.expiry_date as CertExpiryDate','t19.certificate_no')
                 ->groupBy('t1.application_code');

        return $qry;

        } 
               public function getApprovedPromotionAdvertisementRegister($table, $table2,$field,$filterdata,$subfilterdata,$datefilter){

         if($table2 == ''){
            $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
          }else{
           $qry=DB::table($table.' as t1')
           ->join('tra_approval_recommendations as t2','t1.application_code','t2.application_code')
           ->leftJoin($table2.' as t3','t1.'.$field,'t3.id')
           ->join('par_approval_decisions as t4','t2.decision_id','t4.id')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);
          }
    
        //filter by submodule and section
        if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }

        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }
           $qry->LeftJoin('wb_trader_account as t44','t1.applicant_id','t44.id')
           ->LeftJoin('par_regions as t55','t44.region_id','t55.id')
           ->LeftJoin('par_countries as t6','t44.country_id','t6.id')
           ->leftJoin('tra_promotionaladvert_personnel as t7','t1.sponsor_id','t7.id')
           ->LeftJoin('par_regions as t8','t7.region_id','t8.id')
           ->LeftJoin('par_countries as t9','t7.country_id','t9.id')
           ->LeftJoin('par_zones as t10','t1.zone_id','t10.id')
           ->LeftJoin('tra_approval_recommendations as t11','t1.application_code','t11.application_code')
           ->LeftJoin('par_approval_decisions as t12','t11.decision_id','t12.id')
           ->LeftJoin('par_validity_statuses as tv','t11.appvalidity_status_id','tv.id')
           ->LeftJoin('par_registration_statuses as tr','t11.appregistration_status_id','tr.id')


           ->addselect('t1.tracking_no','t1.reference_no','t44.name as Trader','t44.postal_address as TraderPostalA','t44.physical_address as TraderPhysicalA','t44.telephone_no as TraderTell','t44.mobile_no as TraderMobile','t44.email as TraderEmail','t55.name as TraderRegion','t6.name as TraderCountry','t7.name as Sponsor','t7.postal_address as SPostalA','t7.physical_address as SPhysicalA','t7.telephone_no as STell','t7.mobile_no as SMobile','t7.email as SEmail','t8.name as SRegion','t9.name as SCountry','t10.name as CertIssuePlace','t11.certificate_issue_date as CertIssueDate','t11.expiry_date as CertExpiryDate','t11.certificate_issue_date as IssueFrom','t11.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo', 't11.certificate_no', 'tv.name as validity_status', 'tr.name as registration_status')
               ->groupBy('t1.application_code');

        return $qry;

        } 
         public function getImportExportPermitReleaseApplications($table,$table2,$field, $filterdata,$subfilterdata,$datefilter){
            $is_detailed_report='';
       $qry=DB::table($table.' as t1')
           ->join('tra_permitsrelease_recommendation as t2','t1.application_code','t2.application_code')
           ->where($subfilterdata)
           ->where('t2.decision_id',1);

         //filter by submodule and section
        if($filterdata!=''){
             $qry->whereRAW($filterdata);
         }
         //filter by date
        if($datefilter!=''){
          $datefilter = str_replace('date_filter','t2.approval_date',$datefilter);
          $qry->whereRAW($datefilter);
           }

         $qry->LeftJoin('sub_modules as t22','t1.sub_module_id','t22.id')
           ->LeftJoin('par_permit_category as t33','t1.permit_category_id','t33.id')
           ->LeftJoin('par_permit_reasons as t55','t1.permit_reason_id','t55.id')
           ->LeftJoin('par_ports_information as t6','t1.port_id','t6.id')
           ->LeftJoin('par_currencies as t7','t1.paying_currency_id','t7.id')
           ->LeftJoin('par_consignee_options as t8','t1.consignee_options_id','t8.id')
           ->LeftJoin('tra_consignee_data as t9','t1.consignee_id','t9.id')
           ->LeftJoin('tra_permitsenderreceiver_data as t10','t1.sender_receiver_id','t10.id')
           ->LeftJoin('tra_premises as t11','t1.premise_id','t11.id')
           ->LeftJoin('par_zones as t12','t1.zone_id','t12.id')
           ->LeftJoin('par_countries as t13','t10.country_id','t13.id')
           ->LeftJoin('par_regions as t14','t10.region_id','t14.id')
           ->LeftJoin('par_countries as t15','t9.country_id','t15.id')
           ->LeftJoin('par_regions as t16','t9.region_id','t16.id')
           ->LeftJoin('tra_managerpermits_review as t17','t1.application_code','t17.application_code')
           ->leftJoin('wb_trader_account as t18','t1.applicant_id','t18.id')
           ->leftJoin('par_countries as t19','t18.country_id','t19.id')
           ->leftJoin('par_regions as t20','t18.region_id','t20.id')
           ->LeftJoin('par_approval_decisions as t21','t17.decision_id','t21.id')
           ->LeftJoin('par_sections as t23','t1.section_id','t23.id')
           ->select('t1.proforma_invoice_no','t1.tracking_no','t1.reference_no','t1.application_code','t1.proforma_invoice_date','t22.name as type','t33.name as category','t33.name as typecategory','t55.name as permitreason','t6.name as port','t7.name as currency','t8.name as consigneeoption','t9.name as consignee','t9.postal_address as Cpostal_address','t9.physical_address as Cphysical_address','t9.telephone_no as Ctelephone_no','t9.mobile_no as Cmobile_no','t9.email_address as Cemail_address','t15.name as Ccountry','t16.name as Cregion','t10.name as senderreceiver','t10.physical_address as SRphysical_address','t10.postal_address as SRpostal_address','t10.telephone_no as SRtelephone_no','t10.mobile_no as SRmobile_no','t10.email as SRemail_address','t13.name as SRcountry','t14.name as SRregion','t11.name as premisename','t11.postal_address as premisePostalA','t11.physical_address as premisePhysicalA','t11.telephone as premiseTell','t11.mobile_no as premiseMobile','t11.expiry_date as premiseExpiryDate','t12.name as issueplace','t17.expiry_date as CertExpiryDate','t17.certificate_issue_date as CertIssueDate','t18.name as Trader','t18.postal_address as TraderPostalA','t18.physical_address as TraderPhysicalA','t18.telephone_no as TraderTell','t18.mobile_no as TraderMobile','t18.email as TraderEmail','t19.name as TraderCountry','t20.name as TraderRegion','t17.certificate_issue_date as IssueFrom','t17.certificate_issue_date as IssueTo','t1.submission_date as ReceivedFrom','t1.submission_date as ReceivedTo','t17.permit_no as certificate_no','t17.appregistration_status_id as validity_status', 't17.appvalidity_status_id as registration_status','t23.name as section_name')
               ->groupBy('t1.application_code');
        
              $qry->groupBy('t1.application_code'); ; 
               return $qry;
          
        } 
        

 
    function toAlpha($num){
       return chr(substr("000".($num+65),-3));
     }

    function number_to_alpha($num,$code)
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

    public function getArrayColumns($array){
      $temp=array();
      if(!empty($array[1])){
          foreach ($array[1] as $key=>$udata){
          //
            //  $temp[]=strtoupper(str_replace("_"," ",strtoupper($key)));
          $temp[] =$key;
              }
        }
      else if(!empty($array[0])){
        foreach ($array[0] as $key=>$udata){
            $temp[]=$key;
            }
        }
      
      return $temp;
       
       }
  public function generateReportsHeader($title) {
      $org_info = DB::table('tra_organisation_information')->first();
             PDF::setPrintHeader(false);
    
      $logo = getcwd() . '/resources/images/logo.jpg';
      PDF::SetFont('times', 'B', 12);
      PDF::Cell(0, 6, '', 0, 1);
      PDF::Image($logo, 130, 10, 35, 28);
      PDF::Cell(0, 24, '', 0, 2);
      //PDF::Cell(0,6,strtoupper($org_info->ministry),0,1,'C');
      PDF::Cell(0, 6, strtoupper($org_info->name), 0, 1, 'C');
      PDF::SetFont('times', 'B', 9);
      PDF::Cell(0, 6, $org_info->postal_address.','.'  '.$org_info->physical_address, 0, 1, 'C');
      PDF::Cell(0, 6, 'Tel:'.$org_info->telephone_nos.' Fax: '.$org_info->fax, 0, 1, 'C');
      PDF::Cell(0, 6, 'Website: '.$org_info->website.', Email: '.$org_info->email_address, 0, 1, 'C');
      PDF::SetFont('times', 'B', 11);
      PDF::Cell(0, 5,$title .' Generated on '.Carbon::now(), 0, 1, 'C');
      PDF::SetFont('times', 'B', 11);
   
  }   

  public function generateExcell($data,$filename,$heading){
        $org_info = DB::table('tra_organisation_information')->first();
        $header=$this->getArrayColumns($data);
        $RegisterSpreadsheet = new Spreadsheet();
        $sheet = $RegisterSpreadsheet->getActiveSheet();
        //  $ProductSpreadsheet->getActiveSheet()->setTitle($heading);
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

    
    
        $sortedData=array();
        $i=0;
        $k=0;
        $temp=[];
        if(!empty($header)){
              $header=   $header; 
        }else{
              $header=array();
        }
        
          $length=count($header);

          $letter=$this->number_to_alpha($length,"");     
          
          //get the columns
            foreach ($header as $uheader){
                $temp[$i]=$uheader;
                $i++;
            }
           $total=count($temp);
         
           //match values
             foreach ($data as $udata)
                  {
                    for($v=0;$v<$total;$v++){
                        $temp1=$temp[$v];
                        $sortedData[$k][]=$udata[$temp1];
                    }
                     
                    $k++;  
                 }

            //first heading
            $sheet->mergeCells('A1:'.$letter.'6')
            ->getCell('A1')
            ->setValue(strtoupper($org_info->name)."\n".$org_info->postal_address."  , ".$org_info->physical_address."."."\nTel: ".$org_info->telephone_nos.",  Fax:".$org_info->fax.".\nWebsite: ".$org_info->website." Email: ".$org_info->email_address."."."\n".$heading."\t\t Exported on ".Carbon::now());
            $sheet->getStyle('A1:'.$letter.'6')->applyFromArray($styleArray);
            $sheet->getStyle('A1:'.$letter.'6')->getAlignment()->setWrapText(true);
            //headers 
            $sheet->getStyle('A7:'.$letter.'7')->applyFromArray($styleHeaderArray);


            //set autosize\wrap true for all columns
            $size=count($sortedData)+7;
            $cellRange = 'A7:'.$letter.''.$size;
            if($length > 11){
                $sheet->getStyle($cellRange)->getAlignment()->setWrapText(true);
            }
            else{
                if($length>26){
                  foreach(range('A','Z') as $column) {
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                  $remainder=27;
                  while ($remainder <= $length) {
                    $column=$this->number_to_alpha($remainder,"");
                    $sheet->getColumnDimension($column)->setAutoSize(true);
                    $remainder++;
                  }

                }else{

                  foreach(range('A',$letter) as $column) {
                    //dd(range('A',$letter) );
                          $sheet->getColumnDimension($column)->setAutoSize(true);
                      }

                }
            }
            $header = str_replace("_"," ", $header);
            $header = array_map('ucwords', $header);
            //adding formats to header
            $sheet->fromArray($header, null, "A7");
            //loop data while writting
            //$sortedData = array_map('strval', $sortedData);


            $sheet->fromArray( $sortedData, null,  "A8");
            //create file
            $writer = new Xlsx($RegisterSpreadsheet);
             ob_start();
            $writer->save('php://output');
            $excelOutput = ob_get_clean();


    
        $response =  array(
           'status'=>'sucesss',
           'name' => $filename, //no extention needed
           'file' => "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,".base64_encode($excelOutput) //mime type of used format
        );

   
        return $response;
   }

}