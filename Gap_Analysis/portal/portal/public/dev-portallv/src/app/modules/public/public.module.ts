import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//external components
import { NgSelectModule } from '@ng-select/ng-select';

import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DataTablesModule } from 'angular-datatables';
import { ArchwizardModule } from 'ng2-archwizard';

//components
import { AdministrationService } from '../../services/public/administration.service';
import { ConfigurationsService } from '../../services/shared/configurations.service';

import { PublicLayoutComponent } from '../../views/public/public-layout/public-layout.component';
import { CenterPageComponent } from '../../views/public/center-page/center-page.component';
import { HomeComponent } from './../../views/public/home/home.component';
import { NavigationComponent } from './../../views/public/navigation/navigation.component';
import { FooterComponent } from './../../views/public/footer/footer.component';
import { TopSectionComponent } from './../../views/public/top-section/top-section.component';
import { CreateAccountComponent } from './../../views/public/create-account/create-account.component';
import { ForgotPasswordComponent } from './../../views/public/forgot-password/forgot-password.component';
import { ProhibitedProductsComponent } from '../../views/public/prohibited-products/prohibited-products.component';

//routes
import { PublicRouteModule } from './../../routes/public/public-route.module';
//modules
import { Countriesmdl } from '../../models/countriesmdl.model';
import { HttpModule } from '@angular/http';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { DxActionSheetModule,DxFileUploaderModule,DxDataGridModule,DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxTagBoxModule, DxTabPanelModule, DxFormModule, DxScrollViewModule } from 'devextreme-angular';
import { RegisteredProductsComponent } from '../../views/public/registered-products/registered-products.component';
import { RegisteredPremisesComponent } from '../../views/public/registered-premises/registered-premises.component';
import { GmpComplaintFacilitiesComponent } from '../../views/public/gmp-complaint-facilities/gmp-complaint-facilities.component';
import { ClinicalTrialsComponent } from '../../views/public/clinical-trials/clinical-trials.component';
import { UserManualComponent } from '../../views/public/user-manual/user-manual.component';
import { FeesChargesComponent } from '../../views/public/fees-charges/fees-charges.component';
import { RegistrationRegulationsComponent } from '../../views/public/registration-regulations/registration-regulations.component';
import { ComplaintsSubmissionComponent } from '../../views/public/complaints-submission/complaints-submission.component';
import { PasswordRecoverComponent } from '../../views/public/password-recover/password-recover.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { SafePipeModule } from 'src/app/safe-pipe/safe-pipe.module';
import { AdminLoginComponent } from 'src/app/views/public/admin-login/admin-login.component';

import { SharedpublicShareclassComponent } from 'src/app/views/public/sharedpublic-shareclass/sharedpublic-shareclass.component';
import { EacRegionalintergrationComponent } from 'src/app/views/public/regional_integration/eac-regionalintergration/eac-regionalintergration.component';
import { SadcRegionalintergrationComponent } from 'src/app/views/public/regional_integration/sadc-regionalintergration/sadc-regionalintergration.component';
import { RegionalintergrationLoginComponent } from 'src/app/views/public/regional_integration/regionalintergration-login/regionalintergration-login.component';
import { RegisteredMedicaldevicesComponent } from 'src/app/views/public/registered-products/registered-medicaldevices/registered-medicaldevices.component';
import { RegisteredMedicinesComponent } from 'src/app/views/public/registered-products/registered-medicines/registered-medicines.component';
import { MedicaldevicesNotificationComponent } from 'src/app/views/public/registered-products/medicaldevices-notification/medicaldevices-notification.component';
import { CutomerComplainsComponent } from 'src/app/views/public/cutomer-complains/cutomer-complains.component';
import { AuthorisedHumanmedicinesComponent } from 'src/app/views/public/registered-products/authorised-humanmedicines/authorised-humanmedicines.component';
import { AuthorisedVeterinaryProductsComponent } from 'src/app/views/public/registered-products/authorised-veterinary-products/authorised-veterinary-products.component';
import { AuthorisedCosmeticsproductsComponent } from 'src/app/views/public/registered-products/authorised-cosmeticsproducts/authorised-cosmeticsproducts.component';
import { AuthorisedMedicaldevicesComponent } from 'src/app/views/public/registered-products/authorised-medicaldevices/authorised-medicaldevices.component';
import { RegisteredCosmeticsproductsComponent } from 'src/app/views/public/registered-products/registered-cosmeticsproducts/registered-cosmeticsproducts.component';
import { RegisteredFoodproductsComponent } from 'src/app/views/public/registered-products/registered-foodproducts/registered-foodproducts.component';
import { RegisteredVeterinarymedicaldevicesComponent } from 'src/app/views/public/registered-products/registered-veterinarymedicaldevices/registered-veterinarymedicaldevices.component';
import { RegisteredAnimalfeedsComponent } from 'src/app/views/public/registered-products/registered-animalfeeds/registered-animalfeeds.component';
import { RegisteredTobaccoproductsComponent } from 'src/app/views/public/registered-products/registered-tobaccoproducts/registered-tobaccoproducts.component';
import { RegisteredVeterinaryproductsComponent } from 'src/app/views/public/registered-products/registered-veterinaryproducts/registered-veterinaryproducts.component';
import { RegisteredLabhouseholdchemicalsComponent } from 'src/app/views/public/registered-products/registered-labhouseholdchemicals/registered-labhouseholdchemicals.component';
import { PublicappDocumentsComponent } from 'src/app/views/public/publicapp-documents/publicapp-documents.component';
import { FoodPremisesComponent } from 'src/app/views/public/registered-premises/food-premises/food-premises.component';
import { PharmaceuticalPremisesComponent } from 'src/app/views/public/registered-premises/pharmaceutical-premises/pharmaceutical-premises.component';
import { CosmeticsPremisesComponent } from 'src/app/views/public/registered-premises/cosmetics-premises/cosmetics-premises.component';
import { MedicaldevicesPremisesComponent } from 'src/app/views/public/registered-premises/medicaldevices-premises/medicaldevices-premises.component';
import { ServicetariffFeesComponent } from 'src/app/views/public/servicetariff-fees/servicetariff-fees.component';
import { ProductregistrationFeesComponent } from 'src/app/views/public/servicetariff-fees/productregistration-fees/productregistration-fees.component';
import { PremisesinspectionFeesComponent } from 'src/app/views/public/servicetariff-fees/premisesinspection-fees/premisesinspection-fees.component';
import { ImportexportFeesComponent } from 'src/app/views/public/servicetariff-fees/importexport-fees/importexport-fees.component';
import { GmpinspectionFeesComponent } from 'src/app/views/public/servicetariff-fees/gmpinspection-fees/gmpinspection-fees.component';
import { ClinicaltrialFeesComponent } from 'src/app/views/public/servicetariff-fees/clinicaltrial-fees/clinicaltrial-fees.component';
import { PromotionadvertisementFeesComponent } from 'src/app/views/public/servicetariff-fees/promotionadvertisement-fees/promotionadvertisement-fees.component';
import { SafedisposalinspectionFeesComponent } from 'src/app/views/public/servicetariff-fees/safedisposalinspection-fees/safedisposalinspection-fees.component';
@NgModule({
  declarations: [
    CenterPageComponent,
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    TopSectionComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    PublicLayoutComponent,
    ProhibitedProductsComponent,
    RegisteredProductsComponent,
    RegisteredPremisesComponent,
    GmpComplaintFacilitiesComponent,
    ClinicalTrialsComponent,
    UserManualComponent,
    FeesChargesComponent,
    RegistrationRegulationsComponent,
    ComplaintsSubmissionComponent,
    PasswordRecoverComponent,
    AdminLoginComponent,    
    EacRegionalintergrationComponent,
    SadcRegionalintergrationComponent,
    RegionalintergrationLoginComponent,
    RegisteredMedicaldevicesComponent,
    RegisteredMedicinesComponent,
    MedicaldevicesNotificationComponent,
    CutomerComplainsComponent,
    AuthorisedHumanmedicinesComponent,
    AuthorisedVeterinaryProductsComponent,
    AuthorisedCosmeticsproductsComponent,
    AuthorisedMedicaldevicesComponent,
    RegisteredCosmeticsproductsComponent,
    RegisteredFoodproductsComponent,
    RegisteredTobaccoproductsComponent,
    RegisteredVeterinaryproductsComponent,
    RegisteredAnimalfeedsComponent,
    RegisteredLabhouseholdchemicalsComponent,
    RegisteredVeterinarymedicaldevicesComponent,
    PublicappDocumentsComponent,
    FoodPremisesComponent,
    PharmaceuticalPremisesComponent,
    CosmeticsPremisesComponent,
    MedicaldevicesPremisesComponent,
    ServicetariffFeesComponent,
    
    ProductregistrationFeesComponent,
    PremisesinspectionFeesComponent,
    ImportexportFeesComponent,
    GmpinspectionFeesComponent,
    ClinicaltrialFeesComponent,
    PromotionadvertisementFeesComponent,
    SafedisposalinspectionFeesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    PublicRouteModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,    
    NgxSmartModalModule.forRoot(),
    NgHttpLoaderModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ timeOut: 3500,
      positionClass: 'toast-top-right',
      preventDuplicates: true}),
      HttpModule,
      DataTablesModule,
      DxButtonModule,
      ArchwizardModule,NgxCaptchaModule,
      DxPopupModule, DxTextBoxModule ,DxDataGridModule,DxActionSheetModule,DxFileUploaderModule,DxNumberBoxModule , DxCheckBoxModule ,DxSelectBoxModule,DxTextAreaModule,DxContextMenuModule,DxMenuModule,DxTagBoxModule,
      SafePipeModule,DxDateBoxModule,DxTabPanelModule,DxFormModule,DxScrollViewModule
      
  
  ],
  exports: [
    HomeComponent,
    NavigationComponent,
    FooterComponent,
    TopSectionComponent,
    CreateAccountComponent,
    ForgotPasswordComponent,
    PublicRouteModule,
    CenterPageComponent,
    PublicLayoutComponent,
    ReactiveFormsModule,
    NgSelectModule
  ],
  providers: [
    AdministrationService,
    ConfigurationsService
  ]
})
// implements OnInit
export class PublicModule {
  
  
  constructor(private administrationService: AdministrationService, private configurationsService: ConfigurationsService) {
  
  }

}
