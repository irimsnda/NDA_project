<?php

namespace Modules\MigrationScripts\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;

use Illuminate\Support\Carbon;

class MigrationScriptsController extends Controller
{
     protected $user_id;

    public function __construct(Request $req)
    {
      
    }
    function getTableColumnsDef($columns)
    {
        $column_defination = '';
        foreach ($columns as $col) {
            $column_defination .= $col . ',';
        }
        return $column_defination;
    }public function generateTraderNo($table_name){
        $trader_no = mt_rand(1000, 99999);
        //check if it exists 
        $where = array('identification_no'=>$trader_no);
        $check = recordExists($table_name, $where);
        if($check){
            return $this->generateTraderNo($table_name);
        }
        else{
            return $trader_no;
        }
    }

    public function initiatVetemigrateNewProductsDetails(Request $req){
    try{
        $res = 'Error occurred';
        $records_migrated =0;
        
        $table_name = "vet";
        $record_id = 505;// $req->record_id;
        
        $records = DB::table($table_name)->whereRaw("ProductBrandName is not null and ProductBrandName != ''")->get();
        //$records = DB::
        
                foreach($records as $rec){
                    

                     $RefNumber = $rec->RefNumber;
                    $sub_module_id = 7;
                    $module_id = 1;
                    $RECEIVED = formatDate($rec->DateofSubmission);
                    $ProductBrandName = $rec->ProductBrandName;
                    $ProductCommonName = $rec->ProductCommonName;
                  
                    $ProductStrength = $rec->ProductStrength;
                    $DOSAGE_FORM = $rec->ProductdosageForm;
                    $TherapeuticGroup = $rec->TherapeuticGroup;
                    $TherapeuticCode = $rec->TherapeuticCode;

                    $ManufacturerName = $rec->ManufacturerName;
                    $ManufacturesiteCountry = $rec->ManufacturesiteCountry;
                    $ManufacturesitePhysicalAddress = $rec->ManufacturesitePhysicalAddress;
                    $Manufacturesiteregion = $rec->Manufacturesiteregion;
                    $ManufacturerEmail = $rec->ManufacturerEmail;
                    
                    $ApplicantName = $rec->ApplicantName;
                    $ApplicantCountry = $rec->ApplicantCountry;
                    $ApplicantPhysicalAddress = $rec->ApplicantPhysicalAddress;
                    $ApplicantRegion = $rec->ApplicantRegion;
                    $ApplicantEmail = $rec->ApplicantEmail;
                    
                    $LocalTechnicalRepresentativeName = $rec->LocalTechnicalRepresentativeName;
                    $LTRCountry = $rec->LTRCountry;
                    $LTRPhysicalAddress = $rec->LTRPhysicalAddress;
                    $LTREMAIL = $rec->LTREMAIL;

                    $DateofScreening = $rec->DateofScreening;
                    $REGISTRATIONSTATUS = $rec->REGISTRATIONSTATUS;
                    $MarketAuthorizationCertificateNo = $rec->MarketAuthorizationCertificateNo;
                    $MAcertificateexpirydate = $rec->MAcertificateexpirydate;
                    $DateofMAcertificateissuedtoapplicant = $rec->DateofMAcertificateissuedtoapplicant;
                    
                    $product_origin_id = 2;
                    if($ManufacturesiteCountry == 'Rwanda'){
                        $product_origin_id = 1;

                    }
                $app_record = DB::table('tra_product_applications')->where(array('reference_no'=>$RefNumber))->first();
                if(!$app_record){
                   
                    $section_id = $rec->section_id;
                    $prodclass_category_id = $rec->prodclass_category_id;
                    
                    $classification_id = 5;
                    
                    $common_name_id = $this->saveProductDataEntry('par_common_names',array('section_id'=>$section_id, 'name'=>$ProductCommonName, 'description'=>$ProductCommonName),array('name'=>$ProductCommonName),'Common Names');
                   
                    $dosage_form_id = $this->saveProductDataEntry('par_dosage_forms',array('name'=>$DOSAGE_FORM, 'description'=>$DOSAGE_FORM),array('name'=>$DOSAGE_FORM),'DoSage form');
                   
                    $product_information = array('product_origin_id'=>$product_origin_id,
                                                 'common_name_id'=>$common_name_id,
                                                 'prodclass_category_id'=>$prodclass_category_id,
                                                 'classification_id'=>$classification_id,
                                                 'brand_name'=>$ProductBrandName,
                                                 'physical_description'=>$ProductBrandName,
                                                 'dosage_form_id'=>$dosage_form_id,
                                                 'product_strength'=>$ProductStrength,
                                                 'therapeutic_group'=>$TherapeuticGroup,
                                                 'therapeutic_code'=>$TherapeuticCode,
                                                // 'indications'=>$INDICATIONS_,
                                               //  'route_of_administration_id'=>$route_of_administration_id,
                                                 'section_id'=>$section_id,
                                              //   'shelf_life'=>$SHELF_LIFE_MONTHS,
                                                // 'shelflifeduration_desc'=>1
                                             );
                                           
                                             $product_information['created_by'] = '0';
                                             $product_information['created_on'] = Carbon::now();
                                             $resp =  insertRecord('tra_product_information', $product_information, 'Migration');
                                             
                                             if($resp['success']){
                                                 $product_id = $resp['record_id'];
                                             }
                                             else{
                                                    print_r($resp);
                                                    exit();
                                             }
                    //product_ingreidents
                    /*$ingredient_id = $this->saveProductDataEntry('par_ingredients_details',array('name'=>$ACTIVE_INGREDIENTS, 'description'=>$ACTIVE_INGREDIENTS),array('name'=>$ACTIVE_INGREDIENTS),'Ingredietns details');
                    $ingredients_data = array('product_id'=>$product_id, 
                                 'ingredient_id'=>$ingredient_id,
                                'inclusion_reason_id'=>9);
                    
                    DB::table('tra_product_ingredients')->insert($ingredients_data);
                    //save product manufacturing site details 
                     */
                   $mancountry_id = $this->saveProductDataEntry('par_countries',array('name'=>$ManufacturesiteCountry, 'description'=>$ManufacturesiteCountry),array('name'=>$ManufacturesiteCountry),'Country');
    
                   $manregion_id = $this->saveProductDataEntry('par_regions',array('name'=>$Manufacturesiteregion, 'description'=>$Manufacturesiteregion, 'country_id'=>$mancountry_id),array('name'=>$Manufacturesiteregion),'Region ');

                    $manufacturer_data = array('name'=>$ManufacturerName, 
                                               // 'telephone_no'=>$FPP_Telephone_NoOptional, 
                                                'physical_address'=>$ManufacturesitePhysicalAddress, 
                                            //    'postal_address'=>$MANUFACTURESMAILING_ADDRESS, 
                                                'email_address'=>$ManufacturerEmail, 
                                                'region_id'=>$manregion_id, 
                                                'country_id'=>$mancountry_id
                                            );
                    $manufacturer_id = $this->saveProductDataEntry('tra_manufacturers_information',$manufacturer_data,array('name'=>$ManufacturerName, 'country_id'=>$mancountry_id),'Manufacturer Id');       

                    $manufacturersite_data = array('name'=>$ManufacturerName, 
                                                // 'telephone_no'=>$FPP_Telephone_NoOptional, 
                                                'physical_address'=>$ManufacturesitePhysicalAddress, 
                                            //    'postal_address'=>$MANUFACTURESMAILING_ADDRESS, 
                                                'email_address'=>$ManufacturerEmail, 
                                                'region_id'=>$manregion_id, 
                                                'country_id'=>$mancountry_id,
                                                'manufacturer_id'=>$manufacturer_id
                                            );
                    $man_site_id = $this->saveProductDataEntry('par_man_sites',$manufacturersite_data,array('name'=>$ManufacturerName, 'manufacturer_id'=>$manufacturer_id),'Manufacturer Id');            
                    
                    $product_manufacturer = array('product_id'=>$product_id, 
                                                'manufacturer_id'=>$manufacturer_id, 
                                                'man_site_id'=>$man_site_id, 
                                                'manufacturer_role_id'=>1,
                                                'manufacturer_type_id'=>1
                                            );
                    DB::table('tra_product_manufacturers')->insert($product_manufacturer);
                    //save product applicant_details 
                   
                   $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
    
                   $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ApplicantRegion, 'country_id'=>$country_id),array('name'=>$ApplicantRegion),'Country ');
    
                   
                   $data = (object)array('name'=>$ApplicantName, 
                                'tpin_no'=>0, 
                                'contact_person'=>$ApplicantName,
                                'country_id'=>$country_id, 
                                'region_id'=>$region_id, 
                                'physical_address'=>$ApplicantPhysicalAddress, 
                                'postal_address'=>$ApplicantPhysicalAddress, 
                                'telephone_no'=>'', 
                                'email'=>$ApplicantEmail, 
                                'created_by'=>'Migration',
                                'created_on'=>Carbon::now(),
                                'status_id'=>1
                            );
                    $applicant_id = $this->saveTraderInformationDetails($data);
                     //save product local representative 
                     $local_agent_id = 0;
                     if($LocalTechnicalRepresentativeName != ''){
                        $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$LTRCountry, 'description'=>$LTRCountry),array('name'=>$LTRCountry),'Country ');
    
                        $region_id = 0;
                        $data = (object)array('name'=>$LocalTechnicalRepresentativeName, 
                                     'tpin_no'=>0, 
                                     'contact_person'=>$LocalTechnicalRepresentativeName,
                                     'country_id'=>$country_id, 
                                     'region_id'=>$region_id, 
                                     'physical_address'=> $LTRPhysicalAddress,
                                     'postal_address'=>$LTRPhysicalAddress, 
                                    // 'telephone_no'=>$REPRESENTATIVE_PHONE, 
                                     'email'=>$LTREMAIL, 
                                     'created_by'=>'Migration',
                                     'created_on'=>Carbon::now(),
                                     'status_id'=>1
                                 );
                         $local_agent_id = $this->saveTraderInformationDetails($data);
    
                     }
                    
                     $application_status_id = 5;
                     if($MarketAuthorizationCertificateNo != '' && $MarketAuthorizationCertificateNo != 'nan'){
                        $application_status_id = 6;
                     }
                     $process_id = 0;
                     $process_data = getSingleRecord('wf_tfdaprocesses', array('section_id'=>$section_id, 'sub_module_id'=>$sub_module_id));
                     if($process_data){
                         
                             $process_id = $process_data->id;
                       
                     }
                    //save product application details 
                   
                    $view_id = generateApplicationViewID();
                     $application_code = $application_code = generateApplicationCode(7, 'tra_product_applications');
                     $product_data = array('product_type_id'=>$product_origin_id, 
                     'application_code'=>$application_code, 
                     'reference_no'=>$RefNumber, 
                     'view_id'=>$view_id, 
                     'applicant_id'=>$applicant_id, 
                     'local_agent_id'=>$local_agent_id, 
                     'sub_module_id'=>$sub_module_id, 
                     'assessmentprocedure_type_id'=>1, 
                     'section_id'=>$section_id, 
                     'product_id'=>$product_id, 
                     'fasttrack_option_id'=>2, 
                     'process_id'=>$process_id, 
                     'module_id'=>$module_id, 
                     'prodclass_category_id'=>$prodclass_category_id, 
                     'date_added'=>formatDate($RECEIVED), 
                     'submission_date'=>formatDate($RECEIVED), 
                     'application_status_id'=>$application_status_id, 
                     'refno_generated'=>1, 
                     'created_on'=>Carbon::now(), 
                     'created_by'=>'Migration', 
                     
                    );
                    $resp =  insertRecord('tra_product_applications', $product_data, 'Migration');
                    if($resp['success']){
                        $application_id = $resp['record_id'];
                    }
                    else{
                           print_r($resp);
                           exit();
                    }
                    //save product approval details 
                    if($MarketAuthorizationCertificateNo != '' && $MarketAuthorizationCertificateNo != 'nan'){
                        $app_record = DB::table('tra_approval_recommendations')->where(array('certificate_no'=>$MarketAuthorizationCertificateNo))->first();
                        if(!$app_record){
                            $approval_data = array('application_code'=>$application_code,
                            'application_id'=>$application_id,
                            'decision_id'=>1,
                            'module_id'=>$module_id,
                            'certificate_no'=>$MarketAuthorizationCertificateNo,
                            'appvalidity_status_id'=>2,
                            'appregistration_status_id'=>2,
                            'comment'=>'Migration Approval Details',
                            'approval_date'=>formatDate($DateofMAcertificateissuedtoapplicant),
                            'certificate_issue_date'=>formatDate($DateofMAcertificateissuedtoapplicant),
                            'expiry_date'=>formatDate($MAcertificateexpirydate),
                            'approved_by'=>'Migration Data',
                            'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_approval_recommendations', $approval_data, 'Migration');
                            if($resp['success']){
                                $application_id = $resp['record_id'];
                            }
                            else{
                                   print_r($resp);
                                   exit();
                            }


                        }
                        
                        //register
                        $app_record = DB::table('tra_registered_products')->where(array('registration_no'=>$MarketAuthorizationCertificateNo))->first();
                        if(!$app_record){
                            $regdata = array('tra_product_id'=>$product_id,
                                    'validity_status_id'=>2,
                                    'registration_status_id'=>2,
                                    'registration_date'=>formatDate($DateofMAcertificateissuedtoapplicant),
                                    'registration_no'=>$MarketAuthorizationCertificateNo,
                                    'reg_applicant_id'=>$applicant_id,
                                    'reg_local_agent_id'=>$local_agent_id,
                                    'active_app_referenceno'=>$RefNumber,
                                    'active_application_code'=>$application_code,
                                    'expiry_date'=>formatDate($MAcertificateexpirydate),
                                    'approval_date'=>formatDate($DateofMAcertificateissuedtoapplicant),
                                    'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_registered_products', $regdata, 'Migration');
                            if($resp['success']){
                                $reg_id = $resp['record_id'];
                            }
                            else{
                                    print_r($resp);
                                    exit();
                            }
                            DB::table('tra_product_applications')
                            ->where(array('application_code'=>$application_code))
                            ->update(array('reg_product_id'=>$reg_id));
                        }
                    }
                    else{
                        $regdata = array('tra_product_id'=>$product_id,
                                'validity_status_id'=>1,
                                'registration_status_id'=>1,
                                
                                'reg_applicant_id'=>$applicant_id,
                                'reg_local_agent_id'=>$local_agent_id,
                                'active_app_referenceno'=>$RefNumber,
                                'active_application_code'=>$application_code,
                                'created_on'=>Carbon::now()
                        );
                        $resp =  insertRecord('tra_registered_products', $regdata, 'Migration');
                        if($resp['success']){
                            $reg_id = $resp['record_id'];
                        }
                        else{
                                print_r($resp);
                                exit();
                        }
                        DB::table('tra_product_applications')
                        ->where(array('application_code'=>$application_code))
                        ->update(array('reg_product_id'=>$reg_id));
    
                    }
                    //save product register
                    $res = "Application Migration Successfully Application No: ".$RefNumber.'</br>';
                   
                }
                else{
                    //update the records 
                    $product_id = $app_record->product_id;
                    $applicant_id = $app_record->applicant_id;
                    $application_code = $app_record->application_code;
                   
                    $section_id = $rec->section_id;
                    $prodclass_category_id = $rec->prodclass_category_id;
                    
                    $classification_id = 5;
                    
                    $common_name_id = $this->saveProductDataEntry('par_common_names',array('section_id'=>$section_id, 'name'=>$ProductCommonName, 'description'=>$ProductCommonName),array('name'=>$ProductCommonName),'Common Names');
                   
                    $dosage_form_id = $this->saveProductDataEntry('par_dosage_forms',array('name'=>$DOSAGE_FORM, 'description'=>$DOSAGE_FORM),array('name'=>$DOSAGE_FORM),'DoSage form');
                   
                    $product_information = array('product_origin_id'=>$product_origin_id,
                                                 'common_name_id'=>$common_name_id,
                                                 'prodclass_category_id'=>$prodclass_category_id,
                                                 'classification_id'=>$classification_id,
                                                 'brand_name'=>$ProductBrandName,
                                                 'physical_description'=>$ProductBrandName,
                                                 'dosage_form_id'=>$dosage_form_id,
                                                 'product_strength'=>$ProductStrength,
                                                 'therapeutic_group'=>$TherapeuticGroup,
                                                 'therapeutic_code'=>$TherapeuticCode,
                                                // 'indications'=>$INDICATIONS_,
                                               //  'route_of_administration_id'=>$route_of_administration_id,
                                                 'section_id'=>$section_id,
                                              //   'shelf_life'=>$SHELF_LIFE_MONTHS,
                                                // 'shelflifeduration_desc'=>1
                                             );
                                           
                    DB::table('tra_product_information')->where(array('id'=>$product_id))->update($product_information);

                  
                    $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
    
                   $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ApplicantRegion, 'country_id'=>$country_id),array('name'=>$ApplicantRegion),'Country ');
                                             
                   $trader_data = array('name'=>$ApplicantName, 
                                'tpin_no'=>0, 
                                'contact_person'=>$ApplicantName,
                                'country_id'=>$country_id, 
                                'region_id'=>$region_id, 
                                'physical_address'=>$ApplicantPhysicalAddress, 
                                'postal_address'=>$ApplicantPhysicalAddress, 
                                'telephone_no'=>'', 
                                'email'=>$ApplicantEmail, 
                                'created_by'=>'Migration',
                                'created_on'=>Carbon::now(),
                                'status_id'=>1
                            );
                    
                             DB::table('wb_trader_account')->where(array('id'=>$applicant_id))->update($trader_data);
                             DB::connection('portal_db')->table('wb_trader_account')->where(array('id'=>$applicant_id))->update($trader_data);

                    $res = "Application Already Migrated and Updated Successfully Application No: ".$RefNumber.'</br>';
                   
                }
                print_r($res);

                $records_migrated ++;
                
            }  
        
       //     $this->saveMigrationLogsData('initiatemigrateRenewalProductsDetails',$records_migrated=0);
    
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
    }
     print_r($res);

}
function saveProductDataEntry($table_name, $data,$where,$title){
    $record_id = 0;

    if($data['name'] != ''){
        $record = DB::table($table_name)->where($where)->first();
        if($record){
    
            $record_id = $record->id;
    
        }
        else{
            
            $data['created_on'] = Carbon::now();
            $data['created_by'] = 'Migration';
           
            $resp =  insertRecord($table_name, $data, 'Migration');
            
            if($resp['success']){
                $record_id = $resp['record_id'];
            }
            else{
                print_r($title.'</br>');
                print_r($resp);
                exit();
            }
        }
    }
   
   return $record_id;

}
function saveTraderInformationDetails($rec){
    if($rec->email != ''){
        $check = DB::table('wb_trader_account')->where('email',$rec->email)->first();

    }
    else{
        $check = DB::table('wb_trader_account')->where('name',$rec->name)->first();

    }
  
    if(!$check){
        
        $trader_no = $this->generateTraderNo('wb_trader_account');
        
        $uuid = generateUniqID();//unique user ID
        $user_passwordData = str_random(8);
        $user_password = hashPwd($rec->email, $uuid, $user_passwordData);
       // echo $rec->email;
        $user_data =  array('email'=> $rec->email,
                        'password'=>$user_password,
                        'uuid'=>$uuid,
                        'identification_no'=>$trader_no,
                        'status_id'=>5,//as actve
                        'account_roles_id'=>1,
                        'country_id'=>$rec->country_id,
                        'fullnames'=>$rec->name,
                        'created_by'=>'System',
                        'created_on'=>date('Y-m-d H:i:s')
                );
                $rec = (array)$rec;
                $resp =  insertRecord('wb_trader_account', $rec, 'Migration');
                if($resp['success']){
                    $trader_id = $resp['record_id'];
                }
                else{
                    print_r($resp);
                    exit();
                }
                $rec['id'] =  $trader_id;

                DB::connection('portal_db')->table('wb_trader_account')->insert($rec);
                DB::connection('portal_db')->table('wb_traderauthorised_users')->insert($user_data);

    }
    else{
      $trader_id = $check->id;
    }
   
    return $trader_id;
}
public function getProductApplicationReferenceCodes($application_details)
    {
         
        $section_code = getSingleRecordColValue('par_sections', array('id' => $application_details->section_id), 'code');
        $class_code = getSingleRecordColValue('par_classifications', array('id' => $application_details->classification_id), 'code');
       
        $codes_array = array(
            'section_code' => $section_code,
            'zone_code' => 00,
            'class_code' => $class_code,
           
        );  
              
        return $codes_array;
    }
public function initiatNewFoodProductsemigrateDetails(Request $req){
    try{
        $res = 'Error occurred';
        $records_migrated =0;
        
        $table_name = $req->table_name;
        $record_id = $req->record_id;
        
        $records = DB::table($table_name)->whereRaw("BrandName is not null and BrandName != ''")->get();
        //$records = DB::
        
                foreach($records as $rec){
                                         $ReferenceNo = trim($rec->ReferenceNo);
                                        
                                         $section_id = $rec->section_id;
                                         $prodclass_category_id = $rec->prodclass_category_id;
                                         
                    $sub_module_id = 7;
                    $module_id = 1;
                    $process_id = 0;
                    $process_data = getSingleRecord('wf_tfdaprocesses', array('section_id'=>$section_id, 'sub_module_id'=>$sub_module_id));
                    if($process_data){
                        
                            $process_id = $process_data->id;
                      
                    }
                    
                    if($rec->DateSubmitted != '' && $rec->DateSubmitted != null && $rec->DateSubmitted != ' '){
                     
                        $RECEIVED = formatDate($rec->DateSubmitted);
                    }
                    else{


                        $RECEIVED = Carbon::now();
                    }
                  
                    $BrandName = $rec->BrandName;
                    $CommonName = $rec->CommonName;
                    $ClassificationName = $rec->ClassificationName;
                    $ProductOrigin = $rec->ProductOrigin;

                    $PhysicalDescription = $rec->PhysicalDescription;
                  
                    $ProductStrength = $rec->ProductStrength;
                    $ProductForm = $rec->ProductForm;
                    $DosageForm = $rec->DosageForm;
                    $StorageConditions = $rec->StorageConditions;
                    $ProductCategory = $rec->ProductCategory;
                    $ProductSubCategory = $rec->ProductSubCategory;
                    $DistributionCategory = $rec->DistributionCategory;
                    $IntendedEndUser = $rec->IntendedEndUser;
                    $IntendedUse = $rec->IntendedUse;
                    $RouteOfAdministration = $rec->RouteOfAdministration;
                    $MethodOfUse = $rec->MethodOfUse;
                    $Contraindication = $rec->Contraindication;
                    $Indication = $rec->Indication;
                    $GmdnCategory = $rec->GmdnCategory;
                    $GmdnTerm = $rec->GmdnTerm;
                    $Warnings = $rec->Warnings;
                    $InstructionsOfUse = $rec->InstructionsOfUse;
                    $ShelfLife = $rec->ShelfLife;
                    $ShelfLifeafterOpening = $rec->ShelfLifeafterOpening;

                    $Ingredient = $rec->Ingredient;
                    $SpecificationType = $rec->SpecificationType;
                    $Strength = $rec->Strength;
                    $Proportionunit = $rec->Proportion; 
                    $IngredientsSiUnit = $rec->IngredientsSiUnit;
                    $InclusionReason = $rec->InclusionReason;

                    $Container = $rec->Container;
                    $ContainerMaterial = $rec->ContainerMaterial;
                    $RetailPackagingSize = $rec->RetailPackagingSize;
                    $PackagingUnits = $rec->PackagingUnits;


                    $ApplicantName = $rec->ApplicantName;
                    $ApplicantCountry = $rec->ApplicantCountry;
                    $ApplicantPhysicalAddress = $rec->ApplicantPhysicalAddress;
                    $ApplicantRegion = $rec->ApplicantRegion;
                    $ApplicantEmail = $rec->ApplicantEmail;
                    
                    
                    $ItrName = $rec->ItrName;
                    $ltrPhysicalAddress = $rec->ltrPhysicalAddress;
                    $ltrEmail = $rec->ltrEmail;
                    $ltrRegion = $rec->ltrRegion;
                    $ltrCountry = $rec->ltrCountry;
                   
                    $ManufacturingSiteName = $rec->ManufacturingSiteName;
                    $ManCountry = $rec->ManCountry;
                    $ManPhysicalAddress = $rec->ManPhysicalAddress;
                    $ManRegion = $rec->ManRegion;
                    $ManEmail = $rec->ManEmail;
                    
                    $ApprovalDecision = $rec->ApprovalDecision;
                    $RegistrationStatus = $rec->RegistrationStatus;
                    $Approvaldate = $rec->Approvaldate;
                    $ExpiryDate = $rec->ExpiryDate;
                    $CerificateNo = $rec->CerificateNo;
                    

                    $product_origin_id = 1;
                    if($ProductOrigin == 'Imported'){
                        $product_origin_id = 2;

                    }
                  
                    $classification_id = 2;
                    
                $app_record = DB::table('tra_product_applications')->where(array('reference_no'=>$ReferenceNo))->first();
                $common_name_id = $this->saveProductDataEntry('par_common_names',array('section_id'=>$section_id, 'name'=>$CommonName, 'description'=>$CommonName),array('name'=>$CommonName),'Common Names');
                   
                $classification_id = $this->saveProductDataEntry('par_classifications',array('name'=>$ClassificationName,'section_id'=>$section_id, 'description'=>$ClassificationName),array('name'=>$ClassificationName),'Classification');
               
                if($ReferenceNo == 0 || $ReferenceNo == 'N/A (Applied by email)'  || $ReferenceNo == 'Not specified'){

                    $app_details = (object)array('section_id'=>$section_id, 'classification_id'=>$classification_id);
                    $codes_array = $this->getProductApplicationReferenceCodes($app_details);
    
                    $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, '', '');
                    if ($tracking_details['success'] == false) {
                        return \response()->json($tracking_details);
                    }
                    $ReferenceNo = 'MGR-'.$tracking_details['tracking_no'];
                   
                }
               
                $dosage_form_id = $this->saveProductDataEntry('par_dosage_forms',array('name'=>$DosageForm,'section_id'=>$section_id, 'description'=>$DosageForm),array('name'=>$DosageForm),'DoSage form');
                $product_form_id = $this->saveProductDataEntry('par_product_forms',array('name'=>$ProductForm, 'section_id'=>$section_id,'description'=>$ProductForm),array('name'=>$ProductForm),'Product form');
                $storage_condition_id = $this->saveProductDataEntry('par_storage_conditions',array('name'=>$StorageConditions, 'section_id'=>$section_id,'description'=>$StorageConditions),array('name'=>$StorageConditions),'Product form');
                $product_category_id = $this->saveProductDataEntry('par_product_categories',array('name'=>$ProductCategory, 'section_id'=>$section_id,'description'=>$ProductCategory),array('name'=>$ProductCategory),'Product form');
                $product_subcategory_id = $this->saveProductDataEntry('par_subproduct_categories',array('name'=>$ProductSubCategory, 'product_category_id'=>$product_category_id, 'section_id'=>$section_id,'description'=>$ProductSubCategory),array('name'=>$ProductSubCategory),'Product form');

                $distribution_category_id = $this->saveProductDataEntry('par_distribution_categories',array('name'=>$DistributionCategory, 'section_id'=>$section_id,'description'=>$DistributionCategory),array('name'=>$DistributionCategory),'Product form');

                $intended_enduser_id = $this->saveProductDataEntry('par_intended_enduser',array('name'=>$IntendedEndUser, 'section_id'=>$section_id,'description'=>$IntendedEndUser),array('name'=>$IntendedEndUser),'Product form');
                $route_of_administration_id = $this->saveProductDataEntry('par_route_of_administration',array('name'=>$RouteOfAdministration, 'section_id'=>$section_id,'description'=>$RouteOfAdministration),array('name'=>$RouteOfAdministration),'Product form');

                $method_ofuse_id = $this->saveProductDataEntry('par_methodof_use',array('name'=>$MethodOfUse, 'section_id'=>$section_id,'description'=>$MethodOfUse),array('name'=>$MethodOfUse),'Product form');
                
                
                $product_information = array('product_origin_id'=>$product_origin_id,
                                             'common_name_id'=>$common_name_id,
                                             'product_form_id'=>$product_form_id,
                                             'prodclass_category_id'=>$prodclass_category_id,
                                             'classification_id'=>$classification_id,
                                             'brand_name'=>$BrandName,
                                             'physical_description'=>$PhysicalDescription,
                                             'dosage_form_id'=>$dosage_form_id,
                                             'product_strength'=>$ProductStrength,
                                             'storage_condition_id'=>$storage_condition_id,
                                             'product_category_id'=>$product_category_id,
                                             'product_subcategory_id'=>$product_subcategory_id,
                                             'distribution_category_id'=>$distribution_category_id,  'intended_enduser_id'=>$intended_enduser_id,
                                             'intended_use'=>$IntendedUse,
                                             'route_of_administration_id'=>$route_of_administration_id,
                                             'method_ofuse_id'=>$method_ofuse_id,
                                             'contraindication'=>$Contraindication,
                                             'indication'=>$Indication,
                                             'gmdn_category'=>$GmdnCategory,
                                             'gmdn_term'=>$GmdnTerm,
                                             'warnings'=>$Warnings,
                                             'shelf_lifeafter_opening'=>$ShelfLifeafterOpening,
                                             'shelf_life'=>$ShelfLife,
                                             'instructions_of_use'=>$InstructionsOfUse,

                                             
                                             'section_id'=>$section_id,
                                          
                                         );
                                         $ingredient_id = $this->saveProductDataEntry('par_ingredients_details',array('name'=>$Ingredient, 'section_id'=>$section_id,'description'=>$Ingredient),array('name'=>$Ingredient),'Product form');

                                         $inclusion_reason_id = $this->saveProductDataEntry('par_inclusions_reasons',array('name'=>$InclusionReason, 'section_id'=>$section_id,'description'=>$InclusionReason),array('name'=>$InclusionReason),'Product form');

                                         $specification_type_id = $this->saveProductDataEntry('par_specification_types',array('name'=>$SpecificationType,'section_id'=>$section_id,  'description'=>$Ingredient),array('name'=>$SpecificationType),'Ingredietns details');

                                         $ingredientssi_unit_id = $this->saveProductDataEntry('par_si_units',array('name'=>$IngredientsSiUnit, 'section_id'=>$section_id,'description'=>$IngredientsSiUnit),array('name'=>$IngredientsSiUnit),'Product form');

                                        
                                        
                                                     //packagind details 
                                        $container_id = $this->saveProductDataEntry('par_containers',array('name'=>$Container, 'section_id'=>$section_id,'description'=>$Container),array('name'=>$Container),'Product form');
                                        $container_material_id = $this->saveProductDataEntry('par_containers',array('name'=>$ContainerMaterial, 'section_id'=>$section_id,'description'=>$ContainerMaterial),array('name'=>$ContainerMaterial),'Product form');

                                        $packaging_units_id = $this->saveProductDataEntry('par_packaging_units',array('name'=>$PackagingUnits, 'section_id'=>$section_id,'description'=>$PackagingUnits),array('name'=>$PackagingUnits),'Product form');
                                        
                        if(!$app_record){
                   
                
                                             $product_information['created_by'] = '0';
                                             $product_information['created_on'] = Carbon::now();
                                             $resp =  insertRecord('tra_product_information', $product_information, 'Migration');
                                             
                                             if($resp['success']){
                                                 $product_id = $resp['record_id'];
                                             }
                                             else{
                                                    print_r($resp);
                                                    exit();
                                             }
                    //product_ingreidents
                   
                    $ingredients_data = array('product_id'=>$product_id, 
                                        'ingredient_id'=>$ingredient_id,
                                        'specification_type_id'=>$specification_type_id,
                                        'strength'=>$Strength,
                                        'proportion'=>$Proportionunit,
                                        'ingredientssi_unit_id'=>$ingredientssi_unit_id,
                                         'inclusion_reason_id'=>$inclusion_reason_id);

                    $packaging_data = array('container_id'=>$container_id, 
                                                'container_material_id'=>$container_material_id,
                                                'retail_packaging_size'=>$RetailPackagingSize,
                                                'packaging_units_id'=>$packaging_units_id,
                                                'product_id'=>$product_id
                                             );  
                    DB::table('tra_product_ingredients')->insert($ingredients_data);
                    DB::table('tra_product_packaging')->insert($packaging_data);
                    //save product manufacturing site details 
                  
                   $mancountry_id = $this->saveProductDataEntry('par_countries',array('name'=>$ManCountry, 'description'=>$ManCountry),array('name'=>$ManCountry),'Country');
    
                   $manregion_id = $this->saveProductDataEntry('par_regions',array('name'=>$ManRegion, 'description'=>$ManRegion, 'country_id'=>$mancountry_id),array('name'=>$ManRegion),'Region ');

                    $manufacturer_data = array('name'=>$ManufacturingSiteName, 
                                               // 'telephone_no'=>$FPP_Telephone_NoOptional, 
                                                'physical_address'=>$ManPhysicalAddress, 
                                            //    'postal_address'=>$MANUFACTURESMAILING_ADDRESS, 
                                                'email_address'=>$ManEmail, 
                                                'region_id'=>$manregion_id, 
                                                'country_id'=>$mancountry_id
                                            );
                    $manufacturer_id = $this->saveProductDataEntry('tra_manufacturers_information',$manufacturer_data,array('name'=>$ManufacturingSiteName, 'country_id'=>$mancountry_id),'Manufacturer Id');       

                    $manufacturersite_data = array('name'=>$ManufacturingSiteName, 
                                                // 'telephone_no'=>$FPP_Telephone_NoOptional, 
                                                'physical_address'=>$ManPhysicalAddress, 
                                            //    'postal_address'=>$MANUFACTURESMAILING_ADDRESS, 
                                                'email_address'=>$ManEmail, 
                                                'region_id'=>$manregion_id, 
                                                'country_id'=>$mancountry_id,
                                                'manufacturer_id'=>$manufacturer_id
                                            );
                    $man_site_id = $this->saveProductDataEntry('par_man_sites',$manufacturersite_data,array('name'=>$ManufacturingSiteName, 'manufacturer_id'=>$manufacturer_id),'Manufacturer Id');            
                    
                    $product_manufacturer = array('product_id'=>$product_id, 
                                                'manufacturer_id'=>$manufacturer_id, 
                                                'man_site_id'=>$man_site_id, 
                                                'manufacturer_role_id'=>1,
                                                'manufacturer_type_id'=>1
                                            );
                    DB::table('tra_product_manufacturers')->insert($product_manufacturer);
                    //save product applicant_details 
                   
                   $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
    
                   $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ApplicantRegion, 'country_id'=>$country_id),array('name'=>$ApplicantRegion),'Country ');
    
                   
                   $data = (object)array('name'=>$ApplicantName, 
                                'tpin_no'=>0, 
                                'contact_person'=>$ApplicantName,
                                'country_id'=>$country_id, 
                                'region_id'=>$region_id, 
                                'physical_address'=>$ApplicantPhysicalAddress, 
                                'postal_address'=>$ApplicantPhysicalAddress, 
                                'telephone_no'=>'', 
                                'email'=>$ApplicantEmail, 
                                'created_by'=>'Migration',
                                'created_on'=>Carbon::now(),
                                'status_id'=>1
                            );
                    $applicant_id = $this->saveTraderInformationDetails($data);
                     //save product local representative 
                     $local_agent_id = 0;
                     if($ItrName != ''){
                        $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ltrCountry, 'description'=>$ltrCountry),array('name'=>$ltrCountry),'Country ');
    
                        $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ltrRegion, 'country_id'=>$country_id),array('name'=>$ltrRegion),'Country ');

                        $data = (object)array('name'=>$ItrName, 
                                     'tpin_no'=>0, 
                                     'contact_person'=>$ItrName,
                                     'country_id'=>$country_id, 
                                     'region_id'=>$region_id, 
                                     'physical_address'=> $ltrPhysicalAddress,
                                     'postal_address'=>$ltrPhysicalAddress, 
                                    // 'telephone_no'=>$REPRESENTATIVE_PHONE, 
                                     'email'=>$ltrEmail, 
                                     'created_by'=>'Migration',
                                     'created_on'=>Carbon::now(),
                                     'status_id'=>1
                                 );
                         $local_agent_id = $this->saveTraderInformationDetails($data);
    
                     }
                    
                     $application_status_id = 5;
                     if($CerificateNo != '' && $CerificateNo != 'nan'){
                        $application_status_id = 6;
                     }
                     
                    //save product application details  RefNumber
                   
                    $view_id = generateApplicationViewID();
                     $application_code = $application_code = generateApplicationCode(7, 'tra_product_applications');
                     $product_data = array('product_type_id'=>$product_origin_id, 
                     'application_code'=>$application_code, 
                     'reference_no'=>$ReferenceNo, 
                     'view_id'=>$view_id, 
                     'applicant_id'=>$applicant_id, 
                     'local_agent_id'=>$local_agent_id, 
                     'sub_module_id'=>$sub_module_id, 
                     'assessmentprocedure_type_id'=>1, 
                     'section_id'=>$section_id, 
                     'product_id'=>$product_id, 
                     'fasttrack_option_id'=>2, 
                     'process_id'=>$process_id, 
                     'module_id'=>$module_id, 
                     'prodclass_category_id'=>$prodclass_category_id, 
                     'date_added'=>formatDate($RECEIVED), 
                     'submission_date'=>formatDate($RECEIVED), 
                     'application_status_id'=>$application_status_id, 
                     'refno_generated'=>1, 
                     'created_on'=>Carbon::now(), 
                     'created_by'=>'Migration', 
                     
                    );
                    $resp =  insertRecord('tra_product_applications', $product_data, 'Migration');
                    if($resp['success']){
                        $application_id = $resp['record_id'];
                    }
                    else{
                           print_r($resp);
                           exit();
                    }
                    //save product approval details 
                    if($CerificateNo != '' && $CerificateNo != 'nan'){
                        $app_record = DB::table('tra_approval_recommendations')->where(array('certificate_no'=>$CerificateNo))->first();
                        if(!$app_record){
                            $approval_data = array('application_code'=>$application_code,
                            'application_id'=>$application_id,
                            'decision_id'=>1,
                            'module_id'=>$module_id,
                            'certificate_no'=>$CerificateNo,
                            'appvalidity_status_id'=>2,
                            'appregistration_status_id'=>2,
                            'comment'=>'Migration Approval Details',
                            'approval_date'=>formatDate($Approvaldate),
                            'certificate_issue_date'=>formatDate($Approvaldate),
                            'expiry_date'=>formatDate($ExpiryDate),
                            'approved_by'=>'Migration Data',
                            'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_approval_recommendations', $approval_data, 'Migration');
                            if($resp['success']){
                                $application_id = $resp['record_id'];
                            }
                            else{
                                   print_r($resp);
                                   exit();
                            }


                        }
                        
                        //register
                        $app_record = DB::table('tra_registered_products')->where(array('registration_no'=>$CerificateNo))->first();
                        if(!$app_record){
                            $regdata = array('tra_product_id'=>$product_id,
                                    'validity_status_id'=>2,
                                    'registration_status_id'=>2,
                                    'registration_date'=>formatDate($Approvaldate),
                                    'registration_no'=>$CerificateNo,
                                    'reg_applicant_id'=>$applicant_id,
                                    'reg_local_agent_id'=>$local_agent_id,
                                    'active_app_referenceno'=>$ReferenceNo,
                                    'active_application_code'=>$application_code,
                                    'expiry_date'=>formatDate($ExpiryDate),
                                    'approval_date'=>formatDate($Approvaldate),
                                    'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_registered_products', $regdata, 'Migration');
                            if($resp['success']){
                                $reg_id = $resp['record_id'];
                            }
                            else{
                                    print_r($resp);
                                    exit();
                            }
                            DB::table('tra_product_applications')
                            ->where(array('application_code'=>$application_code))
                            ->update(array('reg_product_id'=>$reg_id));
                        }
                    }
                    else{
                        $regdata = array('tra_product_id'=>$product_id,
                                'validity_status_id'=>1,
                                'registration_status_id'=>1,
                                
                                'reg_applicant_id'=>$applicant_id,
                                'reg_local_agent_id'=>$local_agent_id,
                                'active_app_referenceno'=>$ReferenceNo,
                                'active_application_code'=>$application_code,
                                'created_on'=>Carbon::now()
                        );
                        $resp =  insertRecord('tra_registered_products', $regdata, 'Migration');
                        if($resp['success']){
                            $reg_id = $resp['record_id'];
                        }
                        else{
                                print_r($resp);
                                exit();
                        }
                        DB::table('tra_product_applications')
                        ->where(array('application_code'=>$application_code))
                        ->update(array('reg_product_id'=>$reg_id));
    
                    }
                    //save product register
                    $res = "Application Migration Successfully Application No: ".$ReferenceNo.'</br>';
                   
                }
                else{
                    
                    //update the records 
                    $product_id = $app_record->product_id;
                    $applicant_id = $app_record->applicant_id;
                    $application_code = $app_record->application_code;
                   
                    $section_id = $rec->section_id;
                    $prodclass_category_id = $rec->prodclass_category_id;
                    
                    $classification_id = 2;
                    
                   
                    DB::table('tra_product_information')->where(array('id'=>$product_id))->update($product_information);

                  
                    $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
    
                   $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ApplicantRegion, 'country_id'=>$country_id),array('name'=>$ApplicantRegion),'Country ');
                                             
                   $trader_data = array('name'=>$ApplicantName, 
                                'tpin_no'=>0, 
                                'contact_person'=>$ApplicantName,
                                'country_id'=>$country_id, 
                                'region_id'=>$region_id, 
                                'physical_address'=>$ApplicantPhysicalAddress, 
                                'postal_address'=>$ApplicantPhysicalAddress, 
                                'telephone_no'=>'', 
                                'email'=>$ApplicantEmail, 
                                'created_by'=>'Migration',
                                'created_on'=>Carbon::now(),
                                'status_id'=>1
                            );
                    
                             DB::table('wb_trader_account')->where(array('id'=>$applicant_id))->update($trader_data);
                             DB::connection('portal_db')->table('wb_trader_account')->where(array('id'=>$applicant_id))->update($trader_data);
  
                    $res = "Application Already Migrated and Updated Successfully Application No: ".$ReferenceNo.'</br>';
                 
                }
                print_r($res);

                $records_migrated ++;
                
            }  
        
       //     $this->saveMigrationLogsData('initiatemigrateRenewalProductsDetails',$records_migrated=0);
    
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
    }
     print_r($res);

}
public function initiatNewMedicinesProductsemigrateDetails(Request $req){
    try{
        $res = 'Error occurred';
        $records_migrated =0;
        
        $table_name = $req->table_name;
        $record_id = $req->record_id;
        
        $records = DB::table($table_name)->whereRaw("BrandName is not null and BrandName != ''")->get();
        //$records = DB::
        
                foreach($records as $rec){
                                         $ReferenceNo = $rec->ReferenceNo;
                    $sub_module_id = 7;
                    $module_id = 1;

                    $RECEIVED = formatDate($rec->DateSubmitted);
                    $BrandName = $rec->BrandName;
                    $CommonName = $rec->CommonName;
                    $ClassificationName = $rec->ClassificationName;
                    $ProductOrigin = $rec->ProductOrigin;

                    $PhysicalDescription = $rec->PhysicalDescription;
                  
                    $ProductStrength = $rec->ProductStrength;
                    $ProductForm = $rec->ProductForm;
                    $DosageForm = $rec->DosageForm;
                    $StorageConditions = $rec->StorageConditions;
                    $ProductCategory = $rec->ProductCategory;
                    $ProductSubCategory = $rec->ProductSubCategory;
                    $DistributionCategory = $rec->DistributionCategory;
                    $IntendedEndUser = $rec->IntendedEndUser;
                    $IntendedUse = $rec->IntendedUse;
                    $RouteOfAdministration = $rec->RouteOfAdministration;
                    $MethodOfUse = $rec->MethodOfUse;
                    $Contraindication = $rec->Contraindication;
                    $Indication = $rec->Indication;
                    $GmdnCategory = $rec->GmdnCategory;
                    $GmdnTerm = $rec->GmdnTerm;
                    $Warnings = $rec->Warnings;
                    $InstructionsOfUse = $rec->InstructionsOfUse;
                    $ShelfLife = $rec->ShelfLife;
                    $ShelfLifeafterOpening = $rec->ShelfLifeafterOpening;

                    $Ingredient = $rec->Ingredient;
                    $SpecificationType = $rec->SpecificationType;
                    $Strength = $rec->Strength;
                    $Proportionunit = $rec->Proportionunit; 
                    $IngredientsSiUnit = $rec->IngredientsSiUnit;
                    $InclusionReason = $rec->InclusionReason;

                    $Container = $rec->Container;
                    $ContainerMaterial = $rec->ContainerMaterial;
                    $RetailPackagingSize = $rec->RetailPackagingSize;
                    $PackagingUnits = $rec->PackagingUnits;


                    $ApplicantName = $rec->ApplicantName;
                    $ApplicantCountry = $rec->ApplicantCountry;
                    $ApplicantPhysicalAddress = $rec->ApplicantPhysicalAddress;
                    $ApplicantRegion = $rec->ApplicantRegion;
                    $ApplicantEmail = $rec->ApplicantEmail;
                    
                    
                    $ItrName = $rec->ItrName;
                    $ltrPhysicalAddress = $rec->ltrPhysicalAddress;
                    $ltrEmail = $rec->ltrEmail;
                    $ltrRegion = $rec->ltrRegion;
                    $ltrCountry = $rec->ltrCountry;
                   
                    $ManufacturingSiteName = $rec->ManufacturingSiteName;
                    $ManCountry = $rec->ManCountry;
                    $ManPhysicalAddress = $rec->ManPhysicalAddress;
                    $ManRegion = $rec->ManRegion;
                    $ManEmail = $rec->ManEmail;
                    
                    $ApprovalDecision = $rec->ApprovalDecision;
                    $RegistrationStatus = $rec->RegistrationStatus;
                    $Approvaldate = $rec->Approvaldate;
                    $ExpiryDate = $rec->ExpiryDate;
                    $CerificateNo = $rec->CerificateNo;
                    

                    $product_origin_id = 1;
                    if($ProductOrigin == 'Imported'){
                        $product_origin_id = 2;

                    }
                    $section_id = $rec->section_id;
                    $prodclass_category_id = $rec->prodclass_category_id;
                    
                    $classification_id = 2;
                    
                $app_record = DB::table('tra_product_applications')->where(array('reference_no'=>$ReferenceNo))->first();
                $common_name_id = $this->saveProductDataEntry('par_common_names',array('section_id'=>$section_id, 'name'=>$CommonName, 'description'=>$CommonName),array('name'=>$CommonName),'Common Names');
                   
                $dosage_form_id = $this->saveProductDataEntry('par_dosage_forms',array('name'=>$DosageForm,'section_id'=>$section_id, 'description'=>$DosageForm),array('name'=>$DosageForm),'DoSage form');
                $product_form_id = $this->saveProductDataEntry('par_product_forms',array('name'=>$ProductForm, 'section_id'=>$section_id,'description'=>$ProductForm),array('name'=>$ProductForm),'Product form');
                $storage_condition_id = $this->saveProductDataEntry('par_storage_conditions',array('name'=>$StorageConditions, 'section_id'=>$section_id,'description'=>$StorageConditions),array('name'=>$StorageConditions),'Product form');
                $product_category_id = $this->saveProductDataEntry('par_product_categories',array('name'=>$ProductCategory, 'section_id'=>$section_id,'description'=>$ProductCategory),array('name'=>$ProductCategory),'Product form');
                $product_subcategory_id = $this->saveProductDataEntry('par_subproduct_categories',array('name'=>$ProductSubCategory, 'product_category_id'=>$product_category_id, 'section_id'=>$section_id,'description'=>$ProductSubCategory),array('name'=>$ProductSubCategory),'Product form');

                $distribution_category_id = $this->saveProductDataEntry('par_distribution_categories',array('name'=>$DistributionCategory, 'section_id'=>$section_id,'description'=>$DistributionCategory),array('name'=>$DistributionCategory),'Product form');

                $intended_enduser_id = $this->saveProductDataEntry('par_intended_enduser',array('name'=>$IntendedEndUser, 'section_id'=>$section_id,'description'=>$IntendedEndUser),array('name'=>$IntendedEndUser),'Product form');
                $route_of_administration_id = $this->saveProductDataEntry('par_route_of_administration',array('name'=>$RouteOfAdministration, 'section_id'=>$section_id,'description'=>$RouteOfAdministration),array('name'=>$RouteOfAdministration),'Product form');

                $method_ofuse_id = $this->saveProductDataEntry('par_methodof_use',array('name'=>$MethodOfUse, 'section_id'=>$section_id,'description'=>$MethodOfUse),array('name'=>$MethodOfUse),'Product form');
                
                
                $product_information = array('product_origin_id'=>$product_origin_id,
                                             'common_name_id'=>$common_name_id,
                                             'product_form_id'=>$product_form_id,
                                             'prodclass_category_id'=>$prodclass_category_id,
                                             'classification_id'=>$classification_id,
                                             'brand_name'=>$BrandName,
                                             'physical_description'=>$PhysicalDescription,
                                             'dosage_form_id'=>$dosage_form_id,
                                             'product_strength'=>$ProductStrength,
                                             'storage_condition_id'=>$storage_condition_id,
                                             'product_category_id'=>$product_category_id,
                                             'product_subcategory_id'=>$product_subcategory_id,
                                             'distribution_category_id'=>$distribution_category_id,  'intended_enduser_id'=>$intended_enduser_id,
                                             'intended_use'=>$IntendedUse,
                                             'route_of_administration_id'=>$route_of_administration_id,
                                             'method_ofuse_id'=>$method_ofuse_id,
                                             'contraindication'=>$Contraindication,
                                             'indication'=>$Indication,
                                             'gmdn_category'=>$GmdnCategory,
                                             'gmdn_term'=>$GmdnTerm,
                                             'warnings'=>$Warnings,
                                             'shelf_lifeafter_opening'=>$ShelfLifeafterOpening,
                                             'shelf_life'=>$ShelfLife,
                                             'instructions_of_use'=>$InstructionsOfUse,

                                             
                                             'section_id'=>$section_id,
                                          
                                         );
                                         $ingredient_id = $this->saveProductDataEntry('par_ingredients_details',array('name'=>$Ingredient, 'section_id'=>$section_id,'description'=>$Ingredient),array('name'=>$Ingredient),'Product form');

                                         $inclusion_reason_id = $this->saveProductDataEntry('par_inclusions_reasons',array('name'=>$InclusionReason, 'section_id'=>$section_id,'description'=>$InclusionReason),array('name'=>$InclusionReason),'Product form');

                                         $specification_type_id = $this->saveProductDataEntry('par_specification_types',array('name'=>$SpecificationType,'section_id'=>$section_id,  'description'=>$Ingredient),array('name'=>$SpecificationType),'Ingredietns details');

                                         $ingredientssi_unit_id = $this->saveProductDataEntry('par_si_units',array('name'=>$IngredientsSiUnit, 'section_id'=>$section_id,'description'=>$IngredientsSiUnit),array('name'=>$IngredientsSiUnit),'Product form');

                                        
                                        
                                                     //packagind details 
                                        $container_id = $this->saveProductDataEntry('par_containers',array('name'=>$Container, 'section_id'=>$section_id,'description'=>$Container),array('name'=>$Container),'Product form');
                                        $container_material_id = $this->saveProductDataEntry('par_containers',array('name'=>$ContainerMaterial, 'section_id'=>$section_id,'description'=>$ContainerMaterial),array('name'=>$ContainerMaterial),'Product form');

                                        $packaging_units_id = $this->saveProductDataEntry('par_packaging_units',array('name'=>$PackagingUnits, 'section_id'=>$section_id,'description'=>$PackagingUnits),array('name'=>$PackagingUnits),'Product form');
                                        
                        if(!$app_record){
                   
                
                                             $product_information['created_by'] = '0';
                                             $product_information['created_on'] = Carbon::now();
                                             $resp =  insertRecord('tra_product_information', $product_information, 'Migration');
                                             
                                             if($resp['success']){
                                                 $product_id = $resp['record_id'];
                                             }
                                             else{
                                                    print_r($resp);
                                                    exit();
                                             }
                    //product_ingreidents
                   
                    $ingredients_data = array('product_id'=>$product_id, 
                                        'ingredient_id'=>$ingredient_id,
                                        'specification_type_id'=>$specification_type_id,
                                        'strength'=>$Strength,
                                        'proportion'=>$Proportionunit,
                                        'ingredientssi_unit_id'=>$ingredientssi_unit_id,
                                         'inclusion_reason_id'=>$inclusion_reason_id);

                    $packaging_data = array('container_id'=>$container_id, 
                                                'container_material_id'=>$container_material_id,
                                                'retail_packaging_size'=>$RetailPackagingSize,
                                                'packaging_units_id'=>$packaging_units_id,
                                                'product_id'=>$product_id
                                             );  
                    DB::table('tra_product_ingredients')->insert($ingredients_data);
                    DB::table('tra_product_packaging')->insert($packaging_data);
                    //save product manufacturing site details 
                  
                   $mancountry_id = $this->saveProductDataEntry('par_countries',array('name'=>$ManCountry, 'description'=>$ManCountry),array('name'=>$ManCountry),'Country');
    
                   $manregion_id = $this->saveProductDataEntry('par_regions',array('name'=>$ManRegion, 'description'=>$ManRegion, 'country_id'=>$mancountry_id),array('name'=>$ManRegion),'Region ');

                    $manufacturer_data = array('name'=>$ManufacturingSiteName, 
                                               // 'telephone_no'=>$FPP_Telephone_NoOptional, 
                                                'physical_address'=>$ManPhysicalAddress, 
                                            //    'postal_address'=>$MANUFACTURESMAILING_ADDRESS, 
                                                'email_address'=>$ManEmail, 
                                                'region_id'=>$manregion_id, 
                                                'country_id'=>$mancountry_id
                                            );
                    $manufacturer_id = $this->saveProductDataEntry('tra_manufacturers_information',$manufacturer_data,array('name'=>$ManufacturingSiteName, 'country_id'=>$mancountry_id),'Manufacturer Id');       

                    $manufacturersite_data = array('name'=>$ManufacturingSiteName, 
                                                // 'telephone_no'=>$FPP_Telephone_NoOptional, 
                                                'physical_address'=>$ManPhysicalAddress, 
                                            //    'postal_address'=>$MANUFACTURESMAILING_ADDRESS, 
                                                'email_address'=>$ManEmail, 
                                                'region_id'=>$manregion_id, 
                                                'country_id'=>$mancountry_id,
                                                'manufacturer_id'=>$manufacturer_id
                                            );
                    $man_site_id = $this->saveProductDataEntry('par_man_sites',$manufacturersite_data,array('name'=>$ManufacturingSiteName, 'manufacturer_id'=>$manufacturer_id),'Manufacturer Id');            
                    
                    $product_manufacturer = array('product_id'=>$product_id, 
                                                'manufacturer_id'=>$manufacturer_id, 
                                                'man_site_id'=>$man_site_id, 
                                                'manufacturer_role_id'=>1,
                                                'manufacturer_type_id'=>1
                                            );
                    DB::table('tra_product_manufacturers')->insert($product_manufacturer);
                    //save product applicant_details 
                   
                   $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
    
                   $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ApplicantRegion, 'country_id'=>$country_id),array('name'=>$ApplicantRegion),'Country ');
    
                   
                   $data = (object)array('name'=>$ApplicantName, 
                                'tpin_no'=>0, 
                                'contact_person'=>$ApplicantName,
                                'country_id'=>$country_id, 
                                'region_id'=>$region_id, 
                                'physical_address'=>$ApplicantPhysicalAddress, 
                                'postal_address'=>$ApplicantPhysicalAddress, 
                                'telephone_no'=>'', 
                                'email'=>$ApplicantEmail, 
                                'created_by'=>'Migration',
                                'created_on'=>Carbon::now(),
                                'status_id'=>1
                            );
                    $applicant_id = $this->saveTraderInformationDetails($data);
                     //save product local representative 
                     $local_agent_id = 0;
                     if($ItrName != ''){
                        $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ltrCountry, 'description'=>$ltrCountry),array('name'=>$ltrCountry),'Country ');
    
                        $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ltrRegion, 'country_id'=>$country_id),array('name'=>$ltrRegion),'Country ');

                        $data = (object)array('name'=>$ItrName, 
                                     'tpin_no'=>0, 
                                     'contact_person'=>$ItrName,
                                     'country_id'=>$country_id, 
                                     'region_id'=>$region_id, 
                                     'physical_address'=> $ltrPhysicalAddress,
                                     'postal_address'=>$ltrPhysicalAddress, 
                                    // 'telephone_no'=>$REPRESENTATIVE_PHONE, 
                                     'email'=>$ltrEmail, 
                                     'created_by'=>'Migration',
                                     'created_on'=>Carbon::now(),
                                     'status_id'=>1
                                 );
                         $local_agent_id = $this->saveTraderInformationDetails($data);
    
                     }
                    
                     $application_status_id = 5;
                     if($CerificateNo != '' && $CerificateNo != 'nan'){
                        $application_status_id = 6;
                     }
                     $process_id = 0;
                     $process_data = getSingleRecord('wf_tfdaprocesses', array('section_id'=>$section_id, 'sub_module_id'=>$sub_module_id));
                     if($process_data){
                         
                             $process_id = $process_data->id;
                       
                     }
                    //save product application details  RefNumber
                   
                    $view_id = generateApplicationViewID();
                     $application_code = $application_code = generateApplicationCode(7, 'tra_product_applications');
                     $product_data = array('product_type_id'=>$product_origin_id, 
                     'application_code'=>$application_code, 
                     'reference_no'=>$ReferenceNo, 
                     'view_id'=>$view_id, 
                     'applicant_id'=>$applicant_id, 
                     'local_agent_id'=>$local_agent_id, 
                     'sub_module_id'=>$sub_module_id, 
                     'assessmentprocedure_type_id'=>1, 
                     'section_id'=>$section_id, 
                     'product_id'=>$product_id, 
                     'fasttrack_option_id'=>2, 
                     'process_id'=>$process_id, 
                     'module_id'=>$module_id, 
                     'prodclass_category_id'=>$prodclass_category_id, 
                     'date_added'=>formatDate($RECEIVED), 
                     'submission_date'=>formatDate($RECEIVED), 
                     'application_status_id'=>$application_status_id, 
                     'refno_generated'=>1, 
                     'created_on'=>Carbon::now(), 
                     'created_by'=>'Migration', 
                     
                    );
                    $resp =  insertRecord('tra_product_applications', $product_data, 'Migration');
                    if($resp['success']){
                        $application_id = $resp['record_id'];
                    }
                    else{
                           print_r($resp);
                           exit();
                    }
                    //save product approval details 
                    if($CerificateNo != '' && $CerificateNo != 'nan'){
                        $app_record = DB::table('tra_approval_recommendations')->where(array('certificate_no'=>$CerificateNo))->first();
                        if(!$app_record){
                            $approval_data = array('application_code'=>$application_code,
                            'application_id'=>$application_id,
                            'decision_id'=>1,
                            'module_id'=>$module_id,
                            'certificate_no'=>$CerificateNo,
                            'appvalidity_status_id'=>2,
                            'appregistration_status_id'=>2,
                            'comment'=>'Migration Approval Details',
                            'approval_date'=>formatDate($Approvaldate),
                            'certificate_issue_date'=>formatDate($Approvaldate),
                            'expiry_date'=>formatDate($ExpiryDate),
                            'approved_by'=>'Migration Data',
                            'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_approval_recommendations', $approval_data, 'Migration');
                            if($resp['success']){
                                $application_id = $resp['record_id'];
                            }
                            else{
                                   print_r($resp);
                                   exit();
                            }


                        }
                        
                        //register
                        $app_record = DB::table('tra_registered_products')->where(array('registration_no'=>$CerificateNo))->first();
                        if(!$app_record){
                            $regdata = array('tra_product_id'=>$product_id,
                                    'validity_status_id'=>2,
                                    'registration_status_id'=>2,
                                    'registration_date'=>formatDate($Approvaldate),
                                    'registration_no'=>$CerificateNo,
                                    'reg_applicant_id'=>$applicant_id,
                                    'reg_local_agent_id'=>$local_agent_id,
                                    'active_app_referenceno'=>$ReferenceNo,
                                    'active_application_code'=>$application_code,
                                    'expiry_date'=>formatDate($ExpiryDate),
                                    'approval_date'=>formatDate($Approvaldate),
                                    'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_registered_products', $regdata, 'Migration');
                            if($resp['success']){
                                $reg_id = $resp['record_id'];
                            }
                            else{
                                    print_r($resp);
                                    exit();
                            }
                            DB::table('tra_product_applications')
                            ->where(array('application_code'=>$application_code))
                            ->update(array('reg_product_id'=>$reg_id));
                        }
                    }
                    else{
                        $regdata = array('tra_product_id'=>$product_id,
                                'validity_status_id'=>1,
                                'registration_status_id'=>1,
                                
                                'reg_applicant_id'=>$applicant_id,
                                'reg_local_agent_id'=>$local_agent_id,
                                'active_app_referenceno'=>$ReferenceNo,
                                'active_application_code'=>$application_code,
                                'created_on'=>Carbon::now()
                        );
                        $resp =  insertRecord('tra_registered_products', $regdata, 'Migration');
                        if($resp['success']){
                            $reg_id = $resp['record_id'];
                        }
                        else{
                                print_r($resp);
                                exit();
                        }
                        DB::table('tra_product_applications')
                        ->where(array('application_code'=>$application_code))
                        ->update(array('reg_product_id'=>$reg_id));
    
                    }
                    //save product register
                    $res = "Application Migration Successfully Application No: ".$ReferenceNo.'</br>';
                   
                }
                else{
                    
                    //update the records 
                    $product_id = $app_record->product_id;
                    $applicant_id = $app_record->applicant_id;
                    $application_code = $app_record->application_code;
                   
                    $section_id = $rec->section_id;
                    $prodclass_category_id = $rec->prodclass_category_id;
                    
                    $classification_id = 2;
                    
                   
                    DB::table('tra_product_information')->where(array('id'=>$product_id))->update($product_information);

                  
                    $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
    
                   $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ApplicantRegion, 'country_id'=>$country_id),array('name'=>$ApplicantRegion),'Country ');
                                             
                   $trader_data = array('name'=>$ApplicantName, 
                                'tpin_no'=>0, 
                                'contact_person'=>$ApplicantName,
                                'country_id'=>$country_id, 
                                'region_id'=>$region_id, 
                                'physical_address'=>$ApplicantPhysicalAddress, 
                                'postal_address'=>$ApplicantPhysicalAddress, 
                                'telephone_no'=>'', 
                                'email'=>$ApplicantEmail, 
                                'created_by'=>'Migration',
                                'created_on'=>Carbon::now(),
                                'status_id'=>1
                            );
                    
                             DB::table('wb_trader_account')->where(array('id'=>$applicant_id))->update($trader_data);
                             DB::connection('portal_db')->table('wb_trader_account')->where(array('id'=>$applicant_id))->update($trader_data);
  
                    $res = "Application Already Migrated and Updated Successfully Application No: ".$ReferenceNo.'</br>';
                 
                }
                print_r($res);

                $records_migrated ++;
                
            }  
        
       //     $this->saveMigrationLogsData('initiatemigrateRenewalProductsDetails',$records_migrated=0);
    
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
    }
     print_r($res);

}
public function testemail(){
        try{
            
                    $res = sendMailFromNotification('Hiram Maina', 'hiramwachira@gmail.com','Test','Tests','hiramwachira@gmail.com','hiramwachira@gmail.com');
                    
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
        }
         print_r($res);
    
    
}function saveMigrationLogsData($migration_description,$records_migrated=0,$records_updated=0,$records_failed=0 ){
    $data = array('migration_description'=>$migration_description, 'migration_on'=>Carbon::now(),
                         'records_migrated'=>$records_migrated,
                         'records_updated'=>$records_updated,
                         'records_failed'=>$records_failed,
                         'migration_on'=>Carbon::now(),
                         'created_on'=>Carbon::now(),
                         'created_by'=>'Migration'
                        
                        );
    DB::table('tra_migration_logs')->insert($data);
    
    
    
    
}


public function initiatemappingClincialTrialRegistrationSubmission(Request $req){
        try{
            $section_id = $req->section_id;
            
            $records_migrated =0;
                $records = DB::table('tra_clinical_trial_applications as t1')
                                ->leftJoin('tra_approval_recommendations as t3', 't1.application_code', 't3.application_code')
                                ->select('t1.*',  't1.id as application_id')
                                ->whereNull('t3.id')
                                ->get();
                if($records){
                    foreach($records as $rec){
                       
                           $destination_process = 149;
                        
                        $sub_rec = DB::table('tra_submissions')->where(array('application_code'=>$rec->application_code,'current_stage'=>$destination_process,'isDone'=>0))->first();

                        if(!$sub_rec){
                            $submission_data = array(
                                'application_id'=>$rec->application_id,
                                'applicant_id'=>$rec->applicant_id,
                                'application_code'=>$rec->application_code,
                                'reference_no'=>$rec->reference_no,
                                'tracking_no'=>$rec->tracking_no,
                                'view_id'=>$rec->view_id,
                                'process_id'=>$rec->process_id,
                                'previous_stage'=>$destination_process,
                                'current_stage'=>$destination_process,
                                'module_id'=>$rec->module_id,
                                'sub_module_id'=>$rec->sub_module_id,
                                'directive_id'=>1,
                                'application_status_id'=>$rec->application_status_id,
                                'section_id'=>$rec->section_id,
                                'urgency'=>1,
                                'remarks'=>'Migrated Renewal Applications',
                                'isRead'=>0,
                                'isDone'=>0,
                                'isComplete'=>0,
                                'date_received'=>Carbon::now(),
                                'created_on'=>Carbon::now(),
                                'created_by'=>'Migrated By'
                            
                        );
        
                        DB::table('tra_submissions')->insert($submission_data);
                        $res = 'Applications Have been mapped on the submission table successsfully Application No'.$rec->reference_no;
                        print_r('Applications Have been mapped on the submission table successsfully Application No'.$rec->reference_no);

                        } else{

                      //print_r($rec);
                           $res = 'Applications already been mapped on the submission table successsfully Application No'.$rec->reference_no;

                            $records_migrated++;
                    }  
                    }


                }
                else{

                    $res = "No application found";
                }
                $this->saveMigrationLogsData('initiatemappingProductRegistrationSubmission',$records_migrated);
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
        }
         print_r($res);


}
public function initiatemappingProductRegistrationSubmission(Request $req){
        try{
            $section_id = $req->section_id;
            
            $records_migrated =0;
                $records = DB::table('tra_product_applications as t1')
                                ->join('tra_product_information as t2','t1.product_id', 't2.id')
                                ->leftJoin('tra_approval_recommendations as t3', 't1.application_code', 't3.application_code')
                                ->select('t1.*', 't2.*', 't1.id as application_id')
                                ->where('t1.section_id',$section_id)
                                ->whereNull('t3.id')
                                ->get();
                if($records){
                    foreach($records as $rec){
                        if($rec->section_id == 3){
                            $destination_process = 191;
                        }else if($rec->section_id == 4){
                            $destination_process = 204;
                        }
                        else if($rec->section_id == 1){
                            $destination_process = 217;
                        }
                        else if($rec->section_id == 2){
                            $destination_process = 178;
                        }else if($rec->section_id == 7){
                            $destination_process = 1013;
                        }else if($rec->section_id == 8){
                            $destination_process = 1038;
                        }else if($rec->section_id == 9){
                            $destination_process = 988;
                        }
                        else{
                            $destination_process = 5;
                        }
                        $sub_rec = DB::table('tra_submissions')->where(array('application_code'=>$rec->application_code,'current_stage'=>$destination_process,'isDone'=>0))->first();

                        if(!$sub_rec){
                            $submission_data = array('prodclass_category_id'=>$rec->prodclass_category_id,
                                'application_id'=>$rec->application_id,
                                'applicant_id'=>$rec->applicant_id,
                                'application_code'=>$rec->application_code,
                                'reference_no'=>$rec->reference_no,
                                'tracking_no'=>$rec->tracking_no,
                                'view_id'=>$rec->view_id,
                                'process_id'=>$rec->process_id,
                                'previous_stage'=>$destination_process,
                                'current_stage'=>$destination_process,
                                'module_id'=>$rec->module_id,
                                'sub_module_id'=>$rec->sub_module_id,
                                'directive_id'=>1,
                                'application_status_id'=>$rec->application_status_id,
                                'section_id'=>$rec->section_id,
                                'urgency'=>1,
                                'remarks'=>'Migrated Renewal Applications',
                                'isRead'=>0,
                                'isDone'=>0,
                                'isComplete'=>0,
                                'date_received'=>Carbon::now(),
                                'created_on'=>Carbon::now(),
                                'created_by'=>'Migrated By'
                            
                        );
        
                        DB::table('tra_submissions')->insert($submission_data);
                        $res = 'Applications Have been mapped on the submission table successsfully Application No'.$rec->reference_no;
                        print_r('Applications Have been mapped on the submission table successsfully Application No'.$rec->reference_no);

                        } else{

                      //print_r($rec);
                           $res = 'Applications already been mapped on the submission table successsfully Application No'.$rec->reference_no;

                            $records_migrated++;
                    }  
                    }


                }
                else{

                    $res = "No application found";
                }
                $this->saveMigrationLogsData('initiatemappingProductRegistrationSubmission',$records_migrated);
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
        }
         print_r($res);


}
public function initiatNewCosmeticsProductsemigrateDetails(Request $req){
    try{
        $res = 'Error occurred';
        $records_migrated =0;
        
        $table_name = $req->table_name;
        $record_id = $req->record_id;
        
        $records = DB::table($table_name)->whereRaw("BrandName is not null and BrandName != ''")->get();
        //$records = DB::
        
                foreach($records as $rec){
                                         $ReferenceNo = $rec->RefNumber;
                    $sub_module_id = 7;
                    $module_id = 1;

                    $RECEIVED = formatDate($rec->DateSubmitted);
                    $BrandName = $rec->BrandName;
                    $CommonName = $rec->Activeingredient;
                    $ClassificationName = $rec->Classificationname;
                    $ProductOrigin = $rec->Productorigin;

                    $PhysicalDescription = $rec->Physicaldescription;
                  
                    $ProductStrength = $rec->ProductStrength;
                    $ProductForm = $rec->ProductForm;
                    $DosageForm = $rec->Dosageform;
                    $StorageConditions = $rec->Storageconditions;
                    $ProductCategory = $rec->Productcategory;
                    $ProductSubCategory = $rec->Productsubcategory;
                    $DistributionCategory = $rec->Distributioncategory;
                    $IntendedEndUser = $rec->IntendedEndUser;
                    $IntendedUse = $rec->Intendeduse;
                    $RouteOfAdministration = $rec->Routeofadministration;
                    $MethodOfUse = $rec->Methodofuse;
                    $Contraindication = $rec->Contraindication;
                    $Indication = $rec->Indication;
                    $GmdnCategory = $rec->GmdnCategory;
                    $GmdnTerm = $rec->GmdnTerm;
                    $GmdnCode = $rec->GmdnCode;
                    $Warnings = $rec->Warnings;
                    $InstructionsOfUse = $rec->InstructionsOfUse;
                    $ShelfLife = $rec->ShelfLife;
                    $ShelfLifeafterOpening = $rec->ShelfLifeafterOpening;
                    
                    $Ingredient = $rec->Ingredient;
                    $SpecificationType = $rec->SpecificationType;
                    $Strength = $rec->Strength;
                    $Proportionunit = $rec->Proportion; 
                    $IngredientsSiUnit = $rec->IngredientsSiUnit;
                    $InclusionReason = $rec->InclusionReason;

                    $Container = $rec->Container;
                    $ContainerMaterial = $rec->ContainerMaterial;
                    $RetailPackagingSize = $rec->RetailPackagingSize;
                    $PackagingUnits = $rec->PackagingUnits;


                    $ApplicantName = $rec->ApplicantName;
                    $ApplicantCountry = $rec->Applicantcountry;
                    $ApplicantPhysicalAddress = $rec->Apllicantphysicaladress;
                    $ApplicantRegion = $rec->Applicantregion;
                    $ApplicantEmail = $rec->Emailaddress;
                    
                    
                    $ItrName = $rec->LocalTechnicalRepresentative;
                    $ltrPhysicalAddress = $rec->LTRphysicaladress;
                    $ltrEmail = $rec->LTREmailaddress;
                    $ltrRegion = $rec->LTRregion;
                    $ltrCountry = $rec->LTRcountry;
                   
                    $ManufacturingSiteName = $rec->ManufacturerName;
                    $ManCountry = $rec->Manufacturercountry;
                    $ManPhysicalAddress = $rec->Manufacturerphysicaladress;
                    $ManRegion = $rec->Manufacturerregion;
                    $ManEmail = $rec->ManufacturerEmailaddress;
                    
                    $ApprovalDecision = $rec->ApprovalDecision;
                    $RegistrationStatus = $rec->RegistrationStatus;
                    $Approvaldate = $rec->Approvaldate;
                    $ExpiryDate = $rec->ExpiryDate;
                    $CerificateNo = $rec->CerificateNo;
                    

                    $product_origin_id = 1;
                    if($ProductOrigin == 'Imported'){
                        $product_origin_id = 2;

                    }
                    $section_id = $rec->section_id;
                    $prodclass_category_id = $rec->prodclass_category_id;
                    
                    $classification_id =  $rec->classification_id;;
                    
                $app_record = DB::table('tra_product_applications')->where(array('reference_no'=>$ReferenceNo))->first();
                $common_name_id = $this->saveProductDataEntry('par_common_names',array('section_id'=>$section_id, 'name'=>$CommonName, 'description'=>$CommonName),array('name'=>$CommonName),'Common Names');
                   
                $dosage_form_id = $this->saveProductDataEntry('par_dosage_forms',array('name'=>$DosageForm,'section_id'=>$section_id, 'description'=>$DosageForm),array('name'=>$DosageForm),'DoSage form');
                $product_form_id = $this->saveProductDataEntry('par_product_forms',array('name'=>$ProductForm, 'section_id'=>$section_id,'description'=>$ProductForm),array('name'=>$ProductForm),'Product form');
                $storage_condition_id = $this->saveProductDataEntry('par_storage_conditions',array('name'=>$StorageConditions, 'section_id'=>$section_id,'description'=>$StorageConditions),array('name'=>$StorageConditions),'Product form');
                $product_category_id = $this->saveProductDataEntry('par_product_categories',array('name'=>$ProductCategory, 'section_id'=>$section_id,'description'=>$ProductCategory),array('name'=>$ProductCategory),'Product form');
                $product_subcategory_id = $this->saveProductDataEntry('par_subproduct_categories',array('name'=>$ProductSubCategory, 'product_category_id'=>$product_category_id, 'section_id'=>$section_id,'description'=>$ProductSubCategory),array('name'=>$ProductSubCategory),'Product form');

                $distribution_category_id = $this->saveProductDataEntry('par_distribution_categories',array('name'=>$DistributionCategory, 'section_id'=>$section_id,'description'=>$DistributionCategory),array('name'=>$DistributionCategory),'Product form');

                $intended_enduser_id = $this->saveProductDataEntry('par_intended_enduser',array('name'=>$IntendedEndUser, 'section_id'=>$section_id,'description'=>$IntendedEndUser),array('name'=>$IntendedEndUser),'Product form');
                $route_of_administration_id = $this->saveProductDataEntry('par_route_of_administration',array('name'=>$RouteOfAdministration, 'section_id'=>$section_id,'description'=>$RouteOfAdministration),array('name'=>$RouteOfAdministration),'Product form');

                $method_ofuse_id = $this->saveProductDataEntry('par_methodof_use',array('name'=>$MethodOfUse, 'section_id'=>$section_id,'description'=>$MethodOfUse),array('name'=>$MethodOfUse),'Product form');
                
                
                $product_information = array('product_origin_id'=>$product_origin_id,
                                             'common_name_id'=>$common_name_id,
                                             'product_form_id'=>$product_form_id,
                                             'prodclass_category_id'=>$prodclass_category_id,
                                             'classification_id'=>$classification_id,
                                             'brand_name'=>$BrandName,
                                             'physical_description'=>$PhysicalDescription,
                                             'dosage_form_id'=>$dosage_form_id,
                                             'product_strength'=>$ProductStrength,
                                             'storage_condition_id'=>$storage_condition_id,
                                             'product_category_id'=>$product_category_id,
                                             'product_subcategory_id'=>$product_subcategory_id,
                                             'distribution_category_id'=>$distribution_category_id,  'intended_enduser_id'=>$intended_enduser_id,
                                             'intended_use'=>$IntendedUse,
                                             'route_of_administration_id'=>$route_of_administration_id,
                                             'method_ofuse_id'=>$method_ofuse_id,
                                             'contraindication'=>$Contraindication,
                                             'indication'=>$Indication,
                                             'gmdn_category'=>$GmdnCategory,
                                             'gmdn_term'=>$GmdnTerm,
                                             'warnings'=>$Warnings,
                                             'shelf_lifeafter_opening'=>$ShelfLifeafterOpening,
                                             'shelf_life'=>$ShelfLife,
                                             'instructions_of_use'=>$InstructionsOfUse,

                                             
                                             'section_id'=>$section_id,
                                          
                                         );
                                         $ingredient_id = $this->saveProductDataEntry('par_ingredients_details',array('name'=>$Ingredient, 'section_id'=>$section_id,'description'=>$Ingredient),array('name'=>$Ingredient),'Product form');

                                         $inclusion_reason_id = $this->saveProductDataEntry('par_inclusions_reasons',array('name'=>$InclusionReason, 'section_id'=>$section_id,'description'=>$InclusionReason),array('name'=>$InclusionReason),'Product form');

                                         $specification_type_id = $this->saveProductDataEntry('par_specification_types',array('name'=>$SpecificationType,'section_id'=>$section_id,  'description'=>$Ingredient),array('name'=>$SpecificationType),'Ingredietns details');

                                         $ingredientssi_unit_id = $this->saveProductDataEntry('par_si_units',array('name'=>$IngredientsSiUnit, 'section_id'=>$section_id,'description'=>$IngredientsSiUnit),array('name'=>$IngredientsSiUnit),'Product form');

                                        
                                        
                                                     //packagind details 
                                        $container_id = $this->saveProductDataEntry('par_containers',array('name'=>$Container, 'section_id'=>$section_id,'description'=>$Container),array('name'=>$Container),'Product form');
                                        $container_material_id = $this->saveProductDataEntry('par_containers',array('name'=>$ContainerMaterial, 'section_id'=>$section_id,'description'=>$ContainerMaterial),array('name'=>$ContainerMaterial),'Product form');

                                        $packaging_units_id = $this->saveProductDataEntry('par_packaging_units',array('name'=>$PackagingUnits, 'section_id'=>$section_id,'description'=>$PackagingUnits),array('name'=>$PackagingUnits),'Product form');
                                        
                        if(!$app_record){
                   
                
                                             $product_information['created_by'] = '0';
                                             $product_information['created_on'] = Carbon::now();
                                             $resp =  insertRecord('tra_product_information', $product_information, 'Migration');
                                             
                                             if($resp['success']){
                                                 $product_id = $resp['record_id'];
                                             }
                                             else{
                                                    print_r($resp);
                                                    exit();
                                             }
                    //product_ingreidents
                   
                    $ingredients_data = array('product_id'=>$product_id, 
                                        'ingredient_id'=>$ingredient_id,
                                        'specification_type_id'=>$specification_type_id,
                                        'strength'=>$Strength,
                                        'proportion'=>$Proportionunit,
                                        'ingredientssi_unit_id'=>$ingredientssi_unit_id,
                                         'inclusion_reason_id'=>$inclusion_reason_id);

                    $packaging_data = array('container_id'=>$container_id, 
                                                'container_material_id'=>$container_material_id,
                                                'retail_packaging_size'=>$RetailPackagingSize,
                                                'packaging_units_id'=>$packaging_units_id,
                                                'product_id'=>$product_id
                                             );  
                    DB::table('tra_product_ingredients')->insert($ingredients_data);
                    DB::table('tra_product_packaging')->insert($packaging_data);
                    //save product manufacturing site details 
                  
                   $mancountry_id = $this->saveProductDataEntry('par_countries',array('name'=>$ManCountry, 'description'=>$ManCountry),array('name'=>$ManCountry),'Country');
    
                   $manregion_id = $this->saveProductDataEntry('par_regions',array('name'=>$ManRegion, 'description'=>$ManRegion, 'country_id'=>$mancountry_id),array('name'=>$ManRegion),'Region ');

                    $manufacturer_data = array('name'=>$ManufacturingSiteName, 
                                               // 'telephone_no'=>$FPP_Telephone_NoOptional, 
                                                'physical_address'=>$ManPhysicalAddress, 
                                            //    'postal_address'=>$MANUFACTURESMAILING_ADDRESS, 
                                                'email_address'=>$ManEmail, 
                                                'region_id'=>$manregion_id, 
                                                'country_id'=>$mancountry_id
                                            );
                    $manufacturer_id = $this->saveProductDataEntry('tra_manufacturers_information',$manufacturer_data,array('name'=>$ManufacturingSiteName, 'country_id'=>$mancountry_id),'Manufacturer Id');       

                    $manufacturersite_data = array('name'=>$ManufacturingSiteName, 
                                                // 'telephone_no'=>$FPP_Telephone_NoOptional, 
                                                'physical_address'=>$ManPhysicalAddress, 
                                            //    'postal_address'=>$MANUFACTURESMAILING_ADDRESS, 
                                                'email_address'=>$ManEmail, 
                                                'region_id'=>$manregion_id, 
                                                'country_id'=>$mancountry_id,
                                                'manufacturer_id'=>$manufacturer_id
                                            );
                    $man_site_id = $this->saveProductDataEntry('par_man_sites',$manufacturersite_data,array('name'=>$ManufacturingSiteName, 'manufacturer_id'=>$manufacturer_id),'Manufacturer Id');            
                    
                    $product_manufacturer = array('product_id'=>$product_id, 
                                                'manufacturer_id'=>$manufacturer_id, 
                                                'man_site_id'=>$man_site_id, 
                                                'manufacturer_role_id'=>1,
                                                'manufacturer_type_id'=>1
                                            );
                    DB::table('tra_product_manufacturers')->insert($product_manufacturer);
                    //save product applicant_details 
                   
                   $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
    
                   $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ApplicantRegion, 'country_id'=>$country_id),array('name'=>$ApplicantRegion),'Country ');
    
                   
                   $data = (object)array('name'=>$ApplicantName, 
                                'tpin_no'=>0, 
                                'contact_person'=>$ApplicantName,
                                'country_id'=>$country_id, 
                                'region_id'=>$region_id, 
                                'physical_address'=>$ApplicantPhysicalAddress, 
                                'postal_address'=>$ApplicantPhysicalAddress, 
                                'telephone_no'=>'', 
                                'email'=>$ApplicantEmail, 
                                'created_by'=>'Migration',
                                'created_on'=>Carbon::now(),
                                'status_id'=>1
                            );
                    $applicant_id = $this->saveTraderInformationDetails($data);
                     //save product local representative 
                     $local_agent_id = 0;
                     if($ItrName != ''){
                        $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ltrCountry, 'description'=>$ltrCountry),array('name'=>$ltrCountry),'Country ');
    
                        $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ltrRegion, 'country_id'=>$country_id),array('name'=>$ltrRegion),'Country ');

                        $data = (object)array('name'=>$ItrName, 
                                     'tpin_no'=>0, 
                                     'contact_person'=>$ItrName,
                                     'country_id'=>$country_id, 
                                     'region_id'=>$region_id, 
                                     'physical_address'=> $ltrPhysicalAddress,
                                     'postal_address'=>$ltrPhysicalAddress, 
                                    // 'telephone_no'=>$REPRESENTATIVE_PHONE, 
                                     'email'=>$ltrEmail, 
                                     'created_by'=>'Migration',
                                     'created_on'=>Carbon::now(),
                                     'status_id'=>1
                                 );
                         $local_agent_id = $this->saveTraderInformationDetails($data);
    
                     }
                    
                     $application_status_id = 5;
                     if($CerificateNo != '' && $CerificateNo != 'nan'){
                        $application_status_id = 6;
                     }
                     $process_id = 0;
                     $process_data = getSingleRecord('wf_tfdaprocesses', array('section_id'=>$section_id, 'sub_module_id'=>$sub_module_id));
                     if($process_data){
                         
                             $process_id = $process_data->id;
                       
                     }
                    //save product application details  RefNumber
                   
                    $view_id = generateApplicationViewID();
                     $application_code = $application_code = generateApplicationCode(7, 'tra_product_applications');
                     $product_data = array('product_type_id'=>$product_origin_id, 
                     'application_code'=>$application_code, 
                     'reference_no'=>$ReferenceNo, 
                     'view_id'=>$view_id, 
                     'applicant_id'=>$applicant_id, 
                     'local_agent_id'=>$local_agent_id, 
                     'sub_module_id'=>$sub_module_id, 
                     'assessmentprocedure_type_id'=>1, 
                     'section_id'=>$section_id, 
                     'product_id'=>$product_id, 
                     'fasttrack_option_id'=>2, 
                     'process_id'=>$process_id, 
                     'module_id'=>$module_id, 
                     'prodclass_category_id'=>$prodclass_category_id, 
                     'date_added'=>formatDate($RECEIVED), 
                     'submission_date'=>formatDate($RECEIVED), 
                     'application_status_id'=>$application_status_id, 
                     'refno_generated'=>1, 
                     'created_on'=>Carbon::now(), 
                     'created_by'=>'Migration', 
                     
                    );
                    $resp =  insertRecord('tra_product_applications', $product_data, 'Migration');
                    if($resp['success']){
                        $application_id = $resp['record_id'];
                    }
                    else{
                           print_r($resp);
                           exit();
                    }
                    //save product approval details 
                    if($CerificateNo != '' && $CerificateNo != 'nan'){
                        $app_record = DB::table('tra_approval_recommendations')->where(array('certificate_no'=>$CerificateNo))->first();
                        if(!$app_record){
                            $approval_data = array('application_code'=>$application_code,
                            'application_id'=>$application_id,
                            'decision_id'=>1,
                            'module_id'=>$module_id,
                            'certificate_no'=>$CerificateNo,
                            'appvalidity_status_id'=>2,
                            'appregistration_status_id'=>2,
                            'comment'=>'Migration Approval Details',
                            'approval_date'=>formatDate($Approvaldate),
                            'certificate_issue_date'=>formatDate($Approvaldate),
                            'expiry_date'=>formatDate($ExpiryDate),
                            'approved_by'=>'Migration Data',
                            'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_approval_recommendations', $approval_data, 'Migration');
                            if($resp['success']){
                                $application_id = $resp['record_id'];
                            }
                            else{
                                   print_r($resp);
                                   exit();
                            }


                        }
                        
                        //register
                        $app_record = DB::table('tra_registered_products')->where(array('registration_no'=>$CerificateNo))->first();
                        if(!$app_record){
                            $regdata = array('tra_product_id'=>$product_id,
                                    'validity_status_id'=>2,
                                    'registration_status_id'=>2,
                                    'registration_date'=>formatDate($Approvaldate),
                                    'registration_no'=>$CerificateNo,
                                    'reg_applicant_id'=>$applicant_id,
                                    'reg_local_agent_id'=>$local_agent_id,
                                    'active_app_referenceno'=>$ReferenceNo,
                                    'active_application_code'=>$application_code,
                                    'expiry_date'=>formatDate($ExpiryDate),
                                    'approval_date'=>formatDate($Approvaldate),
                                    'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_registered_products', $regdata, 'Migration');
                            if($resp['success']){
                                $reg_id = $resp['record_id'];
                            }
                            else{
                                    print_r($resp);
                                    exit();
                            }
                            DB::table('tra_product_applications')
                            ->where(array('application_code'=>$application_code))
                            ->update(array('reg_product_id'=>$reg_id));
                        }
                    }
                    else{
                        $regdata = array('tra_product_id'=>$product_id,
                                'validity_status_id'=>1,
                                'registration_status_id'=>1,
                                
                                'reg_applicant_id'=>$applicant_id,
                                'reg_local_agent_id'=>$local_agent_id,
                                'active_app_referenceno'=>$ReferenceNo,
                                'active_application_code'=>$application_code,
                                'created_on'=>Carbon::now()
                        );
                        $resp =  insertRecord('tra_registered_products', $regdata, 'Migration');
                        if($resp['success']){
                            $reg_id = $resp['record_id'];
                        }
                        else{
                                print_r($resp);
                                exit();
                        }
                        DB::table('tra_product_applications')
                        ->where(array('application_code'=>$application_code))
                        ->update(array('reg_product_id'=>$reg_id));
    
                    }
                    //save product register
                    $res = "Application Migration Successfully Application No: ".$ReferenceNo.'</br>';
                   
                }
                else{
                    
                    //update the records 
                    $product_id = $app_record->product_id;
                    $applicant_id = $app_record->applicant_id;
                    $application_code = $app_record->application_code;
                   
                    $section_id = $rec->section_id;
                    $prodclass_category_id = $rec->prodclass_category_id;
                    
                    $classification_id = 2;
                    
                   $app_data = array('prodclass_category_id'=>$prodclass_category_id);
                    DB::table('tra_product_information')->where(array('id'=>$product_id))->update($product_information);
                        DB::table('tra_product_applications')->where(array('application_code'=>$application_code))->update($app_data);

                  
                    $country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
    
                   $region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion, 'description'=>$ApplicantRegion, 'country_id'=>$country_id),array('name'=>$ApplicantRegion),'Country ');
                                             
                   $trader_data = array('name'=>$ApplicantName, 
                                'tpin_no'=>0, 
                                'contact_person'=>$ApplicantName,
                                'country_id'=>$country_id, 
                                'region_id'=>$region_id, 
                                'physical_address'=>$ApplicantPhysicalAddress, 
                                'postal_address'=>$ApplicantPhysicalAddress, 
                                'telephone_no'=>'', 
                                'email'=>$ApplicantEmail, 
                                'created_by'=>'Migration',
                                'created_on'=>Carbon::now(),
                                'status_id'=>1
                            );
                    
                             DB::table('wb_trader_account')->where(array('id'=>$applicant_id))->update($trader_data);
                             DB::connection('portal_db')->table('wb_trader_account')->where(array('id'=>$applicant_id))->update($trader_data);
  
                    $res = "Application Already Migrated and Updated Successfully Application No: ".$ReferenceNo.'</br>';
                 
                }
                print_r($res);

                $records_migrated ++;
                
            }  
        
       //     $this->saveMigrationLogsData('initiatemigrateRenewalProductsDetails',$records_migrated=0);
    
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
    }
     print_r($res);

}public function initiatemigrateClinicalTrialDatasets(Request $req){
    
    try{
        $records = DB::table('clinical_trial')->get();
        if($records){
                foreach($records as $rec){
                    //clinical trial details 
                     $id = $rec->Id;
                     $Date_of_Clinical_Trial_Application = $rec->SubmittedOn;
                    $sub_module_id = 10;
                //     $Date_of_Issue_of_Clinical_Trial_Certificate = $rec->Date_of_Issue_of_Clinical_Trial_Certificate;
                  //   $Expiry_Date = $rec->Expiry_Date;

                     $Clinical_Trial_Title = $rec->PublicTitle;
                     $ReferenceNo = $rec->ReferenceNo;
                     $process_id = 0;
                     $process_data = getSingleRecord('wf_tfdaprocesses', array( 'sub_module_id'=>$sub_module_id));
                     if($process_data){
                         
                         $process_id = $process_data->id;
                       
                     }
                     if($ReferenceNo == ''){

                        $codes_array = array('section_code'=>'CTR', 'zone_code'=>00);
        
                        $tracking_details = generateApplicationTrackingNumber($sub_module_id, 1, $codes_array, $process_id, '', '');
                        if ($tracking_details['success'] == false) {
                            return \response()->json($tracking_details);
                        }
                        $ReferenceNo = 'MGR-'.$tracking_details['tracking_no'];
                       
                    }
                    
                    $ProtocolNo = $rec->ProtocolNo;
                    $VersionNo = $rec->VersionNo;
                    $DateOfProtocol = $rec->DateOfProtocol;

                    $Study_Design = $rec->TrialDesign;
                  //  $Study_Phase = $rec->Study_Phase;
                    $PurposeOfTrial = $rec->PurposeOfTrial;
                    $PublicationUrl = $rec->PublicationUrl;
                    $PublicTitle = $rec->PublicTitle;
                    $ClinicalTrialDescription = $rec->ClinicalTrialDescription;
                    $PhaseId = $rec->PhaseId;
                    $IP_ProdSection = $rec->IP_ProdSection;

                    
                    $StudyStartDate = $rec->StudyStartDate;
                    $StudyEndDate = $rec->StudyEndDate;
                    $EthicsClearanceNo = $rec->EthicsClearanceNo;

                    
                    $StudyDuration = $rec->StudyDuration;
                   
                   
                    $InvestigationProductSection = $rec->InvestigationProductSection;
                    $InvestigationProductBrand = $rec->InvestigationProductBrand;
                    $InvestigatorProductClassification = $rec->InvestigatorProductClassification;
                    $DosageForm = $rec->DosageForm;
                    $CommonName = $rec->CommonName;
                    $ActiveIngredients = $rec->ActiveIngredients;
                    //manufactrer
                    $ManufacturerName = $rec->ManufacturerName;
                    $ManufacturerPhysicalAddress = $rec->ManufacturerPhysicalAddress;
                    $ManufacturerPhysicalRegion = $rec->ManufacturerPhysicalRegion;
                    $ManufacturerPhysicalCountry = $rec->ManufacturerPhysicalCountry;
                   //applicant details 
                   
                    //comparator product
                  //  $Name_of_Comparator = $rec->Name_of_Comparator;
                     //Applicant Details
                     $ApplicantName = $rec->ApplicantName;
                     $ApplicantPhysicalAddress = $rec->ApplicantPhysicalAddress;
                     $ApplicantEmail = $rec->ApplicantEmail;
                     $ApplicantRegion = $rec->ApplicantRegion;
                     $ApplicantCountry = $rec->ApplicantCountry;
                 
                    //prncipal investigators
                    $principalInvName = $rec->principalInvName;
                    $principalInvPhysicalAddress = $rec->principalInvPhysicalAddress;
                    $PrincipalInvEmail = $rec->PrincipalInvEmail;
                    $PrincipalInvRegion = $rec->PrincipalInvRegion;
                    $PrincipalInvCountry = $rec->PrincipalInvCountry;
                    //sponsor details 
                    $SponsorName = $rec->SponsorName;
                    $SponsorPhysicalAddress = $rec->SponsorPhysicalAddress;
                    $SponsorEmail = $rec->SponsorEmail;
                    $SponsorRegion = $rec->SponsorRegion;
                    $SponsorCountry = $rec->SponsorCountry;
                   
                    $status ='';
                    //study site details
                    $StudySiteName = $rec->StudySiteName;
                    $StudySiteCountry = $rec->StudySiteCountry;
                    $StudySiteRegion = $rec->StudySiteRegion;
                    $StudySiteCountry1 = $rec->StudySiteCountry1;
                    $StudyPhysicalAddress = $rec->StudyPhysicalAddress;
                    $StudyTelephone = $rec->StudyTelephone;
                    $StudyEmailAddress = $rec->StudyEmailAddress;

                     //other investigators
                     $OtherInvestigatorsName = $rec->OtherInvestigatorsName;
                     $OtherInvestigatorsPhysicalAddress = $rec->OtherInvestigatorsPhysicalAddress;
                     $OtherInvestigatorsEmail = $rec->OtherInvestigatorsEmail;
                     $OtherInvestigatorsRegion = $rec->OtherInvestigatorsRegion;
                     $OtherInvestigatorsCountry = $rec->OtherInvestigatorsCountry;
                     $OtherInvestigatorsCategory = $rec->OtherInvestigatorsCategory;

                   
                    //IP
                    
                   //applicant
                   $applicant_country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ApplicantCountry, 'description'=>$ApplicantCountry),array('name'=>$ApplicantCountry),'Country');
                
                   $applicant_regionid = $this->saveProductDataEntry('par_regions',array('name'=>$ApplicantRegion,'country_id'=>$applicant_country_id, 'description'=>$ApplicantRegion),array('name'=>$ApplicantRegion),'Region Details');
                   
                   $data = (object)array('name'=>$ApplicantName, 
                        'tpin_no'=>0, 
                        'contact_person'=>$ApplicantName,
                        'country_id'=>$applicant_country_id, 
                        'region_id'=>$applicant_regionid, 
                        'physical_address'=>$ApplicantPhysicalAddress, 
                        'postal_address'=>$principalInvPhysicalAddress, 
                      //  'telephone_no'=>$PrincContact_Details_Telephone_1, 
                        'email'=>$ApplicantEmail, 
                        'created_by'=>'Migration',
                        'created_on'=>Carbon::now(),
                        'status_id'=>1
                    );
                    
                    $applicant_id = $this->saveTraderInformationDetails($data);
                  
                    //save investigator
                    $pi_country_id = $this->saveProductDataEntry('par_countries',array('name'=>$PrincipalInvCountry, 'description'=>$PrincipalInvCountry),array('name'=>$PrincipalInvCountry),'Country');
                
                    $pi_regionid = $this->saveProductDataEntry('par_regions',array('name'=>$PrincipalInvRegion,'country_id'=>$pi_country_id, 'description'=>$PrincipalInvRegion),array('name'=>$PrincipalInvRegion),'Region Details'); 
                    $investigator_data = array('name'=>$principalInvName, 
                        'country_id'=>$pi_country_id, 
                        'region_id'=>$pi_regionid, 
                        'physical_address'=>$principalInvPhysicalAddress, 
                        'postal_address'=>$principalInvPhysicalAddress, 
                      //  'telephone'=>$PrincContact_Details_Telephone_1, 
                        'email'=>$PrincipalInvEmail, 
                        'created_by'=>'Migration',
                        'created_on'=>Carbon::now()
                    );
                   
                    $investigator_id = $this->saveProductDataEntry('clinical_trial_personnel',$investigator_data,array('name'=>$principalInvName, 'country_id'=>$pi_country_id),'Investigator Details  Id');    
                    //save sponsor 
              
                    $sponscountry_id = $this->saveProductDataEntry('par_countries',array('name'=>$SponsorCountry, 'description'=>$SponsorCountry),array('name'=>$SponsorCountry),'Country');
                    $sponsregionid = $this->saveProductDataEntry('par_regions',array('name'=>$SponsorRegion,'country_id'=>$sponscountry_id, 'description'=>$SponsorRegion),array('name'=>$SponsorRegion),'Region Details');
                    
                    $sponsor_data = array('name'=>$SponsorName, 
                                                'physical_address'=>$SponsorPhysicalAddress, 
                                                'postal_address'=>$SponsorPhysicalAddress, 
                                                'email'=>$SponsorEmail, 
                                                //'telephone'=>$SponsorContact_Details_telephone_2, 
                                                'region_id'=>$sponsregionid, 
                                                'country_id'=>$sponscountry_id
                                            );
                                                       
                    $sponsor_id = $this->saveProductDataEntry('clinical_trial_personnel',$sponsor_data,array('name'=>$SponsorName, 'country_id'=>$sponscountry_id),'Sponsor Details  Id');            
                    //save clincial study site
                    
                    $study_country_id = $this->saveProductDataEntry('par_countries',array('name'=>$StudySiteCountry1, 'description'=>$StudySiteCountry1),array('name'=>$StudySiteCountry1),'Country');
                    $study_region_id = $this->saveProductDataEntry('par_regions',array('name'=>$StudySiteRegion,'country_id'=>$study_country_id, 'description'=>$StudySiteRegion),array('name'=>$StudySiteRegion),'Region Details');

                    $study_sitedata = array('name'=>$StudySiteName, 
                                                'physical_address'=>$StudyPhysicalAddress, 
                                                'postal_address'=>$StudyPhysicalAddress, 
                                                'email_address'=>$StudyEmailAddress, 
                                            
                                                'region_id'=>$study_region_id, 
                                                'telephone'=>$StudyTelephone,
                                                'country_id'=>$study_country_id
                                            );
                    $study_site_id = $this->saveProductDataEntry('study_sites',$study_sitedata,array('name'=>$StudySiteName, 'region_id'=>$study_region_id),'Study Site Details  Id');            
                    $PhaseIdData = array('name'=>$PhaseId, 'description'=>$PhaseId, 'is_enabled'=>1);
                    $phase_id = $this->saveProductDataEntry('par_clinical_phases',$PhaseIdData,array('name'=>$PhaseId, 'description'=>$PhaseId),'Study Site Details  Id');   
                    $module_id = 7;
                    $sub_module_id = 10;
                    $section_id  = 5;
                    
                    $view_id = generateApplicationViewID();
                    $application_code =  generateApplicationCode(7, 'tra_clinical_trial_applications');
                    if($status == 'Active' || $status == 'Closed' || $status == 'Approved'){


                        $application_status_id = 6;
                    }
                    else{
                        $application_status_id = 5;

                    }
                    $application_data = array(
                                    'application_code'=>$application_code, 
                                    'reference_no'=>$ReferenceNo, 
                                    'view_id'=>$view_id, 
                                    'applicant_id'=>$applicant_id, 
                                    'sub_module_id'=>$sub_module_id, 
                                    'section_id'=>$section_id, 
                                    'fasttrack_option_id'=>2, 
                                    'process_id'=>$process_id, 
                                    'module_id'=>$module_id, 
                                    'trial_design'=>$Study_Design, 
                                    'clinical_prodsection_id'=>2,
                                    'public_title'=>$PublicTitle, 
                                    'clinicaltrial_description'=>$ClinicalTrialDescription,
                                    'purpose_of_trial'=>$PurposeOfTrial,
                                    'proposed_start_date'=>formatDate($StudyStartDate), 
                                    'phase_id'=>$phase_id, 
                                    'sponsor_id'=>$sponsor_id, 
                                    'investigator_id'=>$investigator_id, 
                                    'study_title'=>$Clinical_Trial_Title, 
                                    'protocol_no'=>$ProtocolNo, 
                                    'version_no'=>$VersionNo,  
                                    'date_of_protocol'=>$DateOfProtocol,
                                    'publication_url'=>$PublicationUrl,
                                    'clearance_no'=>$EthicsClearanceNo,
                                    'study_duration'=>$StudyDuration,
                                    'study_end_date'=>formatDate($StudyEndDate),  

                                    'date_added'=>formatDate($Date_of_Clinical_Trial_Application), 
                                    'submission_date'=>formatDate($Date_of_Clinical_Trial_Application), 
                                    'application_status_id'=>$application_status_id, 
                                    'refno_generated'=>1, 
                                    'created_on'=>Carbon::now(), 
                                    'created_by'=>'Migration', 
                    
                   );
                 
                    $resp =  insertRecord('tra_clinical_trial_applications', $application_data, 'Migration');
                    if($resp['success']){
                        $application_id = $resp['record_id'];
                    }
                    else{
                           print_r($resp);
                           exit();
                    }
                    $site_data = array('application_id'=>$application_id,
                                    'study_site_id'=>$study_site_id,
                                    'created_on'=>Carbon::now(), 
                                    'created_by'=>'Migration', 
                                );

                    
                    $resp =  insertRecord('clinical_trial_sites', $site_data, 'Migration');
                    //investigation product 
                    $investigationproduct_section_id = 2;
                   
                    $investigationprod_classification_id = 2;
                    $product_category_id = 2;
                    if($InvestigationProductSection == 'Medical Devices'){

                        $investigationproduct_section_id =4;
                    }
                    else  if($InvestigationProductSection == 'Medicines'){

                        $investigationproduct_section_id =2;

                    } else  if($InvestigationProductSection == 'Food'){


                        $investigationproduct_section_id =1;
                    }
                    $commonnameData = array('name'=>$CommonName, 'description'=>$CommonName, 'is_enabled'=>1, 'section_id'=>$investigationproduct_section_id);
                    $common_name_id = $this->saveProductDataEntry('par_common_names',$commonnameData,array('name'=>$CommonName, 'section_id'=>$investigationproduct_section_id),'Common Name'); 

                    $dosageData = array('name'=>$DosageForm, 'description'=>$DosageForm, 'is_enabled'=>1, 'section_id'=>$investigationproduct_section_id);

                    $common_name_id = $this->saveProductDataEntry('par_dosage_forms',$dosageData,array('name'=>$DosageForm, 'section_id'=>$investigationproduct_section_id),'Dosage'); 
                    $classData = array('name'=>$DosageForm, 'description'=>$DosageForm, 'is_enabled'=>1, 'section_id'=>$investigationproduct_section_id);

                    $classification_id = $this->saveProductDataEntry('par_classifications',$classData,array('name'=>$InvestigatorProductClassification, 'section_id'=>$investigationproduct_section_id),'Dosage');

                    
                    $man_country_id = $this->saveProductDataEntry('par_countries',array('name'=>$ManufacturerPhysicalCountry, 'description'=>$ManufacturerPhysicalCountry),array('name'=>$ManufacturerPhysicalCountry),'Country');

                    $man_region_id = $this->saveProductDataEntry('par_regions',array('name'=>$ManufacturerPhysicalRegion,'country_id'=>$man_country_id, 'description'=>$ManufacturerPhysicalRegion),array('name'=>$ManufacturerPhysicalRegion),'Region Details');

                    $man_sitedata = array('name'=>$ManufacturerName, 
                                                'physical_address'=>$ManufacturerPhysicalAddress, 
                                                'postal_address'=>$ManufacturerPhysicalAddress, 
                                                'email_address'=>$StudyEmailAddress, 
                                            
                                                'region_id'=>$man_region_id, 
                                                'country_id'=>$man_country_id
                                            );
                    $manufacturer_id = $this->saveProductDataEntry('tra_manufacturers_information',$man_sitedata,array('name'=>$ManufacturerName, 'country_id'=>$man_country_id),'Manufacturer');    

                    $ip_product_data = array('investigationproduct_section_id'=>$investigationproduct_section_id, 
                                            'investigationprod_classification_id'=>$investigationprod_classification_id,  
                                            'common_name_id'=>$common_name_id, 
                                            'product_desc'=>$ActiveIngredients, 
                                            'brand_name'=>$InvestigationProductBrand,
                                            'product_category_id'=>2,
                                            'manufacturer_id'=>$manufacturer_id
                                );
                    $resp =  insertRecord('clinical_trial_products', $ip_product_data, 'Migration');
                    $category_id =7;
                    if($OtherInvestigatorsCategory == 'Co Invesigator'){
                        $category_id =    1; 

                    }
                    else if($OtherInvestigatorsCategory == 'Principal investigator'){

                        $category_id = 7;
                    }
                     $pi_country_id = $this->saveProductDataEntry('par_countries',array('name'=>$OtherInvestigatorsCountry, 'description'=>$OtherInvestigatorsCountry),array('name'=>$OtherInvestigatorsCountry),'Country');
                
                     $pi_regionid = $this->saveProductDataEntry('par_regions',array('name'=>$OtherInvestigatorsRegion,'country_id'=>$pi_country_id, 'description'=>$OtherInvestigatorsRegion),array('name'=>$OtherInvestigatorsRegion),'Region Details'); 
                     $otherinvestigator_data = array('name'=>$OtherInvestigatorsName, 
                         'country_id'=>$pi_country_id, 
                         'region_id'=>$pi_regionid, 
                         'physical_address'=>$OtherInvestigatorsPhysicalAddress, 
                         'postal_address'=>$principalInvPhysicalAddress, 
                       //  'telephone'=>$PrincContact_Details_Telephone_1, 
                         'email'=>$OtherInvestigatorsEmail, 
                         'created_by'=>'Migration',
                         'created_on'=>Carbon::now()
                     );
                    
                     $investigator_id = $this->saveProductDataEntry('clinical_trial_personnel',$otherinvestigator_data,array('name'=>$OtherInvestigatorsName, 'country_id'=>$pi_country_id),'Investigator Details  Id');    
                     $otherinvestigator_data = array('category_id'=>$category_id, 
                                'investigator_id'=>$investigator_id,  
                                'application_id'=>$application_id, 
                                'application_reference_no'=>$ReferenceNo
                    );
                     $resp =  insertRecord('clinical_trial_investigators', $otherinvestigator_data, 'Migration');
                     
                    //approval infrmation  ReferenceNo
                    if($status == 'Active' || $status == 'Closed' || $status == 'Approved'){
                        $app_record = DB::table('tra_approval_recommendations')->where(array('certificate_no'=>$ReferenceNo, 'module_id'=>$module_id))->first();
                        if(!$app_record){
                            $approval_data = array('application_code'=>$application_code,
                                                'application_id'=>$application_id,
                                                'decision_id'=>1,
                                                'module_id'=>$module_id,
                                                'certificate_no'=>$ReferenceNo,
                                                'appvalidity_status_id'=>2,
                                                'appregistration_status_id'=>2,
                                                'comment'=>'Migration Approval Details',
                                                //'approval_date'=>$certificate_approval_date,
                                                //'certificate_issue_date'=>formatDate($certificate_approval_date),
                                                //'expiry_date'=>formatDate($certificate_expiry_date),
                                                'approved_by'=>'Migration Data',
                                                'created_on'=>Carbon::now()
                            );
                            $resp =  insertRecord('tra_approval_recommendations', $approval_data, 'Migration');
                            if($resp['success']){
                                $application_id = $resp['record_id'];
                            }
                            else{
                                   print_r($resp);
                                   exit();
                            }
                            $app_record = DB::table('registered_clinical_trials')->where(array('registration_no'=>$ReferenceNo))->first();
                            if(!$app_record){
                                $regdata = array('tra_clinical_trial_id'=>$application_id,
                                        'validity_status_id'=>2,
                                        'registration_status_id'=>2,
                                        'registration_no'=>$ReferenceNo,
                                        'active_application_code'=>$application_code,
                                        'created_on'=>Carbon::now()
                                );
                                $resp =  insertRecord('registered_clinical_trials', $regdata, 'Migration');
                                if($resp['success']){
                                    $reg_id = $resp['record_id'];
                                }
                                else{
                                        print_r($resp);
                                        exit();
                                }
                                DB::table('tra_clinical_trial_applications')
                                ->where(array('application_code'=>$application_code))
                                ->update(array('reg_clinical_trial_id'=>$reg_id));
                            }
                        }
                        $res = array('success'=>true, 'message'=>'Application Migrated Successfully');
                        print_r("Application has been migrated successfully ".$ReferenceNo.'</br>');
                    }else{
                        $res = array('success'=>true, 'message'=>'Application Migrated Successfully');
                        print_r("Application already migrated  ".$ReferenceNo.'</br>');

                    }
                    DB::table('clinical_trial')->where('id',$id)->update(array('ReferenceNo'=>$ReferenceNo));
                    
                }
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
    }
    print_r($res);
}
}