import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//the imported components modules 
import { DataTableModule } from 'angular5-data-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DataTablesModule } from 'angular-datatables';
import { ArchwizardModule } from 'ng2-archwizard';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppLayoutComponent } from '../../views/online-services/app-layout/app-layout.component';
import { OnlineserviceRouteModule } from './../../routes/online-servises/onlineservice-route.module';
import { NotfoundComponent } from '../../views/online-services/notfound/notfound.component';
import { AppheaderComponent } from '../../views/online-services/appheader/appheader.component';
import { AppsettingsComponent } from '../../views/online-services/appsettings/appsettings.component';
import { AppfooterComponent } from '../../views/online-services/appfooter/appfooter.component';
import { AppmenuComponent } from '../../views/online-services/appmenu/appmenu.component';
import { AppdashboardComponent } from '../../views/online-services/appdashboard/appdashboard.component';
import { ProductRegDashboardComponent } from '../../views/online-services/product-registration/product-reg-dashboard/product-reg-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
//premsies NewDrugshopsRegistrationComponentdrugshop-reg-dashboard
import { DrugshopRegDashboardComponent } from '../../views/online-services/drugshop-registration/drugshop-reg-dashboard/drugshop-reg-dashboard.component';
import { PremisesRegDashboardComponent } from '../../views/online-services/premises-registration/premises-reg-dashboard/premises-reg-dashboard.component';

import { NewPremisesRegistrationComponent } from '../../views/online-services/premises-registration/new-premises-registration/new-premises-registration.component';
import { NewDrugshopsRegistrationComponent } from '../../views/online-services/drugshop-registration/new-drugshops-registration/new-drugshops-registration.component';

import { from } from 'rxjs';
import { ApplicationSelectionComponent } from '../../views/online-services/product-registration/application-selection/application-selection.component';
import { PremapplSelectionComponent } from '../../views/online-services/premises-registration/premappl-selection/premappl-selection.component';
import { PrepremsapplSelectionComponent } from '../../views/online-services/premises-registration/prepremsappl-selection/prepremsappl-selection.component';
import { PredrugshopAppselectionComponent } from '../../views/online-services/drugshop-registration/predrugshop-appselection/predrugshop-appselection.component';



import { DrugshopNearestlocationComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-dataentry/drugshop-nearestlocation/drugshop-nearestlocation.component';
import { DrugshopPersonneldetailsComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-dataentry/drugshop-personneldetails/drugshop-personneldetails.component';
import { DrugshopLicensedetailsComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-dataentry/drugshop-licensedetails/drugshop-licensedetails.component';

import { DxActionSheetModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxRadioGroupModule, DxScrollViewModule, DxDropDownBoxModule, DxHtmlEditorModule, DxTagBoxModule, DxTabsModule, DxTabPanelModule } from 'devextreme-angular';
import { ModalDialogModule } from 'ngx-modal-dialog';

import { RenewalBusinessPermitComponent } from '../../views/online-services/premises-registration/renewal-business-permit/renewal-business-permit.component';
import { TraderProfileComponent } from '../../views/online-services/trader-profile/trader-profile.component';
import { NotificationsComponent } from '../../views/online-services/notifications/notifications.component';
import { ArchivedPremisesComponent } from 'src/app/views/online-services/premises-registration/archived-premises/archived-premises.component';
import { ArchivedProductsappsComponent } from 'src/app/views/online-services/product-registration/archived-productsapps/archived-productsapps.component';
import { InitiateNewproductApplicationComponent } from 'src/app/views/online-services/product-registration/new-product-registration/initiate-newproduct-application/initiate-newproduct-application.component';
import { PremisesAlterationComponent } from 'src/app/views/online-services/premises-registration/premises-alteration/premises-alteration.component';

import { SharedProductregistrationclassComponent } from 'src/app/views/online-services/product-registration/shared-productregistrationclass/shared-productregistrationclass.component';

import { SharedDrugshopsregistrationclassComponent } from 'src/app/views/online-services/drugshop-registration/shared-drugshopsregistrationclass/shared-drugshopsregistrationclass.component';
import { SharedPremisesregistrationclassComponent } from 'src/app/views/online-services/premises-registration/shared-premisesregistrationclass/shared-premisesregistrationclass.component';
import { SharedGmpapplicationclassComponent } from 'src/app/views/online-services/gmp-applications/shared-gmpapplicationclass/shared-gmpapplicationclass.component';
import { PremisesRegPreviewComponent } from 'src/app/views/online-services/premises-registration/premises-reg-preview/premises-reg-preview.component';
import { MedicaldevicesNotificationsComponent } from 'src/app/views/online-services/product-notification/medicaldevices-notifications/medicaldevices-notifications.component';
import { ProductnotificationDashboardComponent } from 'src/app/views/online-services/product-notification/productnotification-dashboard/productnotification-dashboard.component';
import { ProductnotificationSelComponent } from 'src/app/views/online-services/product-notification/productnotification-sel/productnotification-sel.component';
import { ClinicalTrialdashComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/clinical-trialdash.component';
import { NewclinicalTrialComponent } from 'src/app/views/online-services/clinical-trials/newclinical-trial/newclinical-trial.component';
import { ClinicalTrialammendmentComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialammendment/clinical-trialammendment.component';
import { ImportexportDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importexport-dashboard.component';
import { ImportexportSelComponent } from 'src/app/views/online-services/importexport-apps/importexport-sel/importexport-sel.component';
import { ImportexportApplicationComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/importexport-application.component';
import { SharedClinicaltrialComponent } from 'src/app/views/online-services/clinical-trials/shared-clinicaltrial/shared-clinicaltrial.component';

import { PromotionalAdvertselComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertsel/promotional-advertsel.component';
import { SharedpromotionalAdvertComponent } from 'src/app/views/online-services/promotional-advert/sharedpromotional-advert/sharedpromotional-advert.component';
import { PromotionalAdvertarchiveComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertarchive/promotional-advertarchive.component';
import { PromotionalAdvertappComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertapp/promotional-advertapp.component';
import { PromotionalAdvertdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/promotional-advertdash.component';
import { TradefairpermitAppComponent } from 'src/app/views/online-services/promotional-advert/tradefairpermit-app/tradefairpermit-app.component';

import { ApplicationQueriesComponent } from 'src/app/views/online-services/application-queries/application-queries.component';
import { ProductRegappealComponent } from 'src/app/views/online-services/product-registration/product-regappeal/product-regappeal.component';
import { FoodDataproductsComponent } from 'src/app/views/online-services/product-registration/products-dataentry/food-dataproducts/food-dataproducts.component';
import { CosmeticsDataproductsComponent } from 'src/app/views/online-services/product-registration/products-dataentry/cosmetics-dataproducts/cosmetics-dataproducts.component';

import { ProdregistrantDetailsComponent } from 'src/app/views/online-services/product-registration/products-dataentry/prodregistrant-details/prodregistrant-details.component';
import {InitiateProductAlterationComponent} from 'src/app/views/online-services/product-registration/product-alteration/initiate-product-alteration/initiate-product-alteration.component';
import {InitiateRenewalproductApplicationComponent} from 'src/app/views/online-services/product-registration/renewal-product-registration/initiate-renewalproduct-application/initiate-renewalproduct-application.component';
import { ApplicationVariationDetailsComponent } from 'src/app/views/online-services/application-variation-details/application-variation-details.component';
import { InitiateProductWithdrawalComponent } from 'src/app/views/online-services/product-registration/product-withdrawal/initiate-product-withdrawal/initiate-product-withdrawal.component';

import { ApplicationWithdrawalDetailsComponent } from 'src/app/views/online-services/application-withdrawal-details/application-withdrawal-details.component';
import { SampledocumentsSubmissionsComponent } from 'src/app/views/online-services/product-registration/sampledocuments-submissions/sampledocuments-submissions.component';
import { ProductformDetailsComponent } from 'src/app/views/online-services/product-registration/products-dataentry/productform-details/productform-details.component';
import { ProductRegistrationselectionComponent } from 'src/app/views/online-services/product-registration/product-registrationselection/product-registrationselection.component';
import { RegisteredProductappsComponent } from 'src/app/views/online-services/product-registration/registered-productapps/registered-productapps.component';
import { RegisteredDrugshopappsComponent } from 'src/app/views/online-services/drugshop-registration/registered-drugshopapps/registered-drugshopapps.component';
import { RegisteredPremisesappsComponent } from 'src/app/views/online-services/premises-registration/registered-premisesapps/registered-premisesapps.component';
import { PremisesRegistrationselectionComponent } from 'src/app/views/online-services/premises-registration/premises-registrationselection/premises-registrationselection.component';
import { DrugshopsRegistrationselectionComponent } from 'src/app/views/online-services/drugshop-registration/drugshops-registrationselection/drugshops-registrationselection.component';
import { PremisesWithdrawalComponent } from 'src/app/views/online-services/premises-registration/premises-withdrawal/premises-withdrawal.component';
import { RegisteredGmpselectionComponent } from 'src/app/views/online-services/gmp-applications/gmp/registered-gmpselection/registered-gmpselection.component';
import { RegisteredGmpapplicationsComponent } from 'src/app/views/online-services/gmp-applications/gmp/registered-gmpapplications/registered-gmpapplications.component';
import { NewGmpApplicationComponent } from 'src/app/views/online-services/gmp-applications/gmp/new-gmp-application/new-gmp-application.component';
import { RenewalGmpApplicationComponent } from 'src/app/views/online-services/gmp-applications/gmp/renewal-gmp-application/renewal-gmp-application.component';
import { GmpRegDashboardComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-reg-dashboard/gmp-reg-dashboard.component';
import { GmpApplicationsSelectionComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-applications-selection/gmp-applications-selection.component';
import { GmpAppPreviewComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-app-preview/gmp-app-preview.component';
import { GmpWithdrawalappsrequestComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-withdrawalappsrequest/gmp-withdrawalappsrequest.component';
import { RegisteredManufacturingpremisesComponent } from 'src/app/views/online-services/gmp-applications/gmp/registered-manufacturingpremises/registered-manufacturingpremises.component';
import { GmpDocumentSubmissionComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-document-submission/gmp-document-submission.component';
import { GmpApplicationsAmendementsComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-applications-amendements/gmp-applications-amendements.component';

import { GmpApplicationsQueryrespComponent } from 'src/app/views/online-services/gmp-applications/gmp/gmp-applications-queryresp/gmp-applications-queryresp.component';
import { AppsdashboardSectionsComponent } from 'src/app/views/online-services/appsdashboard-sections/appsdashboard-sections.component';
import { QualityAuditDashboardComponent } from 'src/app/views/online-services/gmp-applications/quality-audit/quality-audit-dashboard/quality-audit-dashboard.component';
import { SharedDashboardclassComponent } from 'src/app/views/online-services/gmp-applications/shared-dashboardclass/shared-dashboardclass.component';
import { NewQualityauditApplicationComponent } from 'src/app/views/online-services/gmp-applications/quality-audit/new-qualityaudit-application/new-qualityaudit-application.component';
import { QualityauditAppSelectionComponent } from 'src/app/views/online-services/gmp-applications/quality-audit/qualityaudit-app-selection/qualityaudit-app-selection.component';
import { RegisteredQualityauditselectionComponent } from 'src/app/views/online-services/gmp-applications/quality-audit/registered-qualityauditselection/registered-qualityauditselection.component';
import { TraderaccountUsersComponent } from 'src/app/views/online-services/traderaccount-users/traderaccount-users.component';
import { PharmacistsaccountUserComponent } from 'src/app/views/online-services/pharmacistsaccount-user/pharmacistsaccount-user.component';

//import { SafePipe } from 'src/app/safe.pipe';
//import { DrugsProductsdetailsComponent } from 'src/app/views/online-services/product-registration/product-generaldetails/drugs-productsdetails/drugs-productsdetails.component';
import { FoodProductsdetailsComponent } from 'src/app/views/online-services/product-registration/product-generaldetails/food-productsdetails/food-productsdetails.component';
import { CosmeticsProductsdetailsComponent } from 'src/app/views/online-services/product-registration/product-generaldetails/cosmetics-productsdetails/cosmetics-productsdetails.component';
import { DrugshopGeneraldetailsComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-dataentry/drugshop-generaldetails/drugshop-generaldetails.component';
import { PremisesGeneraldetailsComponent } from 'src/app/views/online-services/premises-registration/premises-dataentry/premises-generaldetails/premises-generaldetails.component';
import { PremisesStaffdetailsComponent } from 'src/app/views/online-services/premises-registration/premises-dataentry/premises-staffdetails/premises-staffdetails.component';
import { DirectorsDetailsComponent } from 'src/app/views/online-services/premises-registration/premises-dataentry/directors-details/directors-details.component';

import { PremisesBusinessdetailsComponent } from 'src/app/views/online-services/premises-registration/premises-dataentry/premises-businessdetails/premises-businessdetails.component';
import { PremisesPersonneldetailsComponent } from 'src/app/views/online-services/premises-registration/premises-dataentry/premises-personneldetails/premises-personneldetails.component';
import { GmpPersonneldetailsComponent } from 'src/app/views/online-services/gmp-applications/gmp-dataentry/gmp-personneldetails/gmp-personneldetails.component';
import { GmpGeneraldetailsComponent } from 'src/app/views/online-services/gmp-applications/gmp-dataentry/gmp-generaldetails/gmp-generaldetails.component';
import { GmpBusinessdetailsComponent } from 'src/app/views/online-services/gmp-applications/gmp-dataentry/gmp-businessdetails/gmp-businessdetails.component';
import { GmpManufatcuringdetailsComponent } from 'src/app/views/online-services/gmp-applications/gmp-dataentry/gmp-manufatcuringdetails/gmp-manufatcuringdetails.component';
import { ImportexportGendetailsComponent } from 'src/app/views/online-services/importexport-apps/importexport-dataentry/importexport-gendetails/importexport-gendetails.component';
import { PermitProductsdetailsComponent } from 'src/app/views/online-services/importexport-apps/importexport-dataentry/permit-productsdetails/permit-productsdetails.component';
import { SharedImportexportclassComponent } from 'src/app/views/online-services/importexport-apps/shared-importexportclass/shared-importexportclass.component';
import { ClinicalGeneraldetailsComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial_dataentry/clinical-generaldetails/clinical-generaldetails.component';
import { ClinicalStudysitesComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial_dataentry/clinical-studysites/clinical-studysites.component';
import { ClinicalInvestigatorsComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial_dataentry/clinical-investigators/clinical-investigators.component';
import { ClinicalImpproductsComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial_dataentry/clinical-impproducts/clinical-impproducts.component';
import { MeddevGeneraldetailsComponent } from 'src/app/views/online-services/product-notification/meddev-notdataentry/meddev-generaldetails/meddev-generaldetails.component';
import { ProdnoficationSharedclassComponent } from 'src/app/views/online-services/product-notification/prodnofication-sharedclass/prodnofication-sharedclass.component';
import { ClinicaltrialDocumentsubmissionComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial-documentsubmission/clinicaltrial-documentsubmission.component';
import { RetentionChargesComponent } from 'src/app/views/online-services/productretention/retention-charges/retention-charges.component';
import { RetentionPaymentsComponent } from 'src/app/views/online-services/productretention/retention-payments/retention-payments.component';
import { RetentionSharedclassComponent } from 'src/app/views/online-services/productretention/retention-sharedclass/retention-sharedclass.component';
import { ProductsImagesdocumentsComponent } from 'src/app/views/online-services/product-registration/products-dataentry/products-imagesdocuments/products-imagesdocuments.component';
import { DisposalAppdashboardComponent } from 'src/app/views/online-services/disposal-apps/disposal-appdashboard/disposal-appdashboard.component';
import { DisposalPermitrequestsComponent } from 'src/app/views/online-services/disposal-apps/disposal-permitrequests/disposal-permitrequests.component';
import { DisposalSharedclassComponent } from 'src/app/views/online-services/disposal-apps/disposal-sharedclass/disposal-sharedclass.component';
import { BloodestablishementDashboardComponent } from 'src/app/views/online-services/blood-products/bloodestablishement/bloodestablishement-dashboard/bloodestablishement-dashboard.component';
import { GcpDashboardComponent } from 'src/app/views/online-services/clinical-trials/gcp/gcp-dashboard/gcp-dashboard.component';
import { GcpInspectionrequestComponent } from 'src/app/views/online-services/clinical-trials/gcp/gcp-inspectionrequest/gcp-inspectionrequest.component';
import { GcpDocumentsubmissionComponent } from 'src/app/views/online-services/clinical-trials/gcp/gcp-documentsubmission/gcp-documentsubmission.component';
import { GcpQueryprocessComponent } from 'src/app/views/online-services/clinical-trials/gcp/gcp-queryprocess/gcp-queryprocess.component';
import { BloodestablishmentApplicationsrequestComponent } from 'src/app/views/online-services/blood-products/bloodestablishement/bloodestablishment-applicationsrequest/bloodestablishment-applicationsrequest.component';
import { ProductlocalRepresentationComponent } from 'src/app/views/online-services/product-registration/productlocal-representation/productlocal-representation.component';
import { SafePipeModule } from 'src/app/safe-pipe/safe-pipe.module';
import { SharedProductdashboardComponent } from 'src/app/views/online-services/product-registration/shared-productdashboard/shared-productdashboard.component';


import { LargedocumentsUploadComponent } from 'src/app/views/online-services/documents-upload/largedocuments-upload/largedocuments-upload.component';
import { ClinicaltrialProgressreportingComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial-progressreporting/clinicaltrial-progressreporting.component';
import { ClinicalprogressrptGeneralComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial_dataentry/clinicalprogressrpt-general/clinicalprogressrpt-general.component';

import { AppsubmissionDashboardComponent } from 'src/app/views/online-services/appsubmission-dashboard/appsubmission-dashboard.component';

import { ApplicationPaymentsComponent } from 'src/app/views/online-services/application-payments/application-payments.component';
import { DrugsProductsdetailsComponent } from 'src/app/views/online-services/product-registration/product-generaldetails/drugs-productsdetails/drugs-productsdetails.component';
import { SharedModulesModule } from '../shared-modules/shared-modules.module';
import { AppsynchronisationRequestComponent } from 'src/app/views/online-services/appsynchronisation-request/appsynchronisation-request.component';
import { ControlleddrugspermitsDashboardComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugspermits-dashboard/controlleddrugspermits-dashboard.component';
import { ControldrugsLicenseAppComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controldrugs-license-app/controldrugs-license-app.component';
import { ControldrugsImportpermitAppComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controldrugs-importpermit-app/controldrugs-importpermit-app.component';
import { SharedControldrugsPermitlicenseComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/shared-controldrugs-permitlicense/shared-controldrugs-permitlicense.component';
import { ControlleddrugslicenseGendetailsComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugs-dataentry/controlleddrugslicense-gendetails/controlleddrugslicense-gendetails.component';
import { ControlleddrugslicenseProdsdetailsComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugs-dataentry/controlleddrugslicense-prodsdetails/controlleddrugslicense-prodsdetails.component';
import { ControlleddrugsimppermitsGendetailsComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugs-dataentry/controlleddrugsimppermits-gendetails/controlleddrugsimppermits-gendetails.component';
import { ControlleddrugsimppermitsProdsdetailsComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugs-dataentry/controlleddrugsimppermits-prodsdetails/controlleddrugsimppermits-prodsdetails.component';
import { ControlleddrugsSharedtaentryComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugs-dataentry/controlleddrugs-sharedtaentry/controlleddrugs-sharedtaentry.component';

import { ApplicationProcessguidelinesComponent} from 'src/app/views/online-services/guidelines/application-processguidelines/application-processguidelines.component';
import { ApplicantInformationComponent } from 'src/app/views/online-services/trader-profile/applicant-information/applicant-information.component';
import { ApplicantSharedclassComponent } from 'src/app/views/online-services/trader-profile/applicant-sharedclass/applicant-sharedclass.component';
import { ApplicationInvoicesComponent } from 'src/app/views/online-services/application-invoices/application-invoices.component';
import { InvoiceAppgenerationComponent } from 'src/app/views/online-services/invoice-appgeneration/invoice-appgeneration.component';
import { AppQuerydetailsfrmComponent } from 'src/app/views/online-services/application-queriespnl/app-querydetailsfrm/app-querydetailsfrm.component';
import { SharedControldrugsDashboardComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/shared-controldrugs-dashboard/shared-controldrugs-dashboard.component';
import { OrderSuppydangerousApplicationComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/order-suppydangerous-drugs/order-suppydangerous-application/order-suppydangerous-application.component';
import { OrderSuppydangerousGendetailsComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/order-suppydangerous-drugs/order-suppydangerous-dataentry/order-suppydangerous-gendetails/order-suppydangerous-gendetails.component';
import { OrderSuppydangerousDashComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/order-suppydangerous-drugs/order-suppydangerous-dash/order-suppydangerous-dash.component';
import { ApplicationDocumentsComponent } from 'src/app/views/online-services/application-documents/application-documents.component';
import { OrderSuppydangerousProductdetailsComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/order-suppydangerous-drugs/order-suppydangerous-dataentry/order-suppydangerous-product/order-suppydangerous-productdetails.component';
import { ProdretentionDashboardComponent } from 'src/app/views/online-services/productretention/product-retentionrequest/prodretention-dashboard/prodretention-dashboard.component';
import { ProdretentionRequestsappComponent } from 'src/app/views/online-services/productretention/product-retentionrequest/prodretention-requestsapp/prodretention-requestsapp.component';
import { ProductsappSubmissionsComponent } from 'src/app/views/online-services/product-registration/productsapp-submissions/productsapp-submissions.component';
import { ProductApplicationPreviewComponent } from 'src/app/views/online-services/product-registration/product-application-preview/product-application-preview.component';
import { ProductappQuerysubmissionComponent } from 'src/app/views/online-services/product-registration/productapp-querysubmission/productapp-querysubmission.component';
import { ImportLicensesappselectionComponent } from 'src/app/views/online-services/importexport-apps/import-licensesappselection/import-licensesappselection.component';
import { ImportLicensevisashareclassComponent } from 'src/app/views/online-services/importexport-apps/import-licensevisashareclass/import-licensevisashareclass.component';
import { ExportLicenseappselComponent } from 'src/app/views/online-services/importexport-apps/export-licenseappsel/export-licenseappsel.component';
import { ControldrugsInspectionbkdashComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugspermits-dashboard/controldrugs-inspectionbkdash/controldrugs-inspectionbkdash.component';
import { ControldrugsImplicensedashComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugspermits-dashboard/controldrugs-implicensedash/controldrugs-implicensedash.component';
import { OfficialcertificateDashboardComponent } from 'src/app/views/online-services/controlleddrugspermits-apps/controlleddrugspermits-dashboard/officialcertificate-dashboard/officialcertificate-dashboard.component';
import { InspectionbookingDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/inspectionbooking-dashboard/inspectionbooking-dashboard.component';
import { ImportlicenseDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importlicense-dashboard/importlicense-dashboard.component';
import { ImportvisaDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importvisa-dashboard/importvisa-dashboard.component';
import { ImportgeneralicenseDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/importgeneralicense-dashboard/importgeneralicense-dashboard.component';

import { ExportlicenseDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/exportlicense-dashboard/exportlicense-dashboard.component';
import { NewpremisesDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/newpremises-dashboard/newpremises-dashboard.component';
import { PreinspectionDashboardComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-reg-dashboard/preinspection-dashboard/preinspection-dashboard.component';

import { NewdrugshopDashboardComponent } from 'src/app/views/online-services/drugshop-registration/drugshop-reg-dashboard/newdrugshop-dashboard/newdrugshop-dashboard.component';
import { RenewalpremisesDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/renewalpremises-dashboard/renewalpremises-dashboard.component';
import { VariationpremisesDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/variationpremises-dashboard/variationpremises-dashboard.component';
import { WithdrawalpremisesDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/withdrawalpremises-dashboard/withdrawalpremises-dashboard.component';
import { InvoiceApppreviewComponent } from 'src/app/views/online-services/invoice-appgeneration/invoice-apppreview/invoice-apppreview.component';
import { InspectionBookingComponent } from 'src/app/views/online-services/importexport-apps/inspection-booking/inspection-booking.component';
import { InspProdbookingDetailsComponent } from 'src/app/views/online-services/importexport-apps/importexport-dataentry/insp-prodbooking-details/insp-prodbooking-details.component';
import { InspBookingdetailsComponent } from 'src/app/views/online-services/importexport-apps/importexport-dataentry/insp-bookingdetails/insp-bookingdetails.component';
import { NewprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/newprod-reg-dashboard/newprod-reg-dashboard.component';
import { RenewalprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/renewalprod-reg-dashboard/renewalprod-reg-dashboard.component';
import { VariationprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/variationprod-reg-dashboard/variationprod-reg-dashboard.component';
import { WithdrawalprodRegDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/withdrawalprod-reg-dashboard/withdrawalprod-reg-dashboard.component';
import { ProductNotificationsDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/product-notifications-dashboard/product-notifications-dashboard.component';
import { AppDocumentPreviewComponent } from 'src/app/views/online-services/app-document-preview/app-document-preview.component';
import { ImportVisaappComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/import-visaapp/import-visaapp.component';
import { ExprtLicenseappComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/exprt-licenseapp/exprt-licenseapp.component';
import { ImportLicenseappComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/import-licenseapp/import-licenseapp.component';
import { ImpexportamendDashboardComponent } from 'src/app/views/online-services/importexport-apps/importexport-dashboard/impexportamend-dashboard/impexportamend-dashboard.component';
import { ImportexportlicAmmendrequestComponent } from 'src/app/views/online-services/importexport-apps/importexport-application/importexportlic-ammendrequest/importexportlic-ammendrequest.component';
import { ImportexportApprovedappselComponent } from 'src/app/views/online-services/importexport-apps/importexport-approvedappsel/importexport-approvedappsel.component';
import { PersonnalisedimportDashboardComponent } from 'src/app/views/online-services/personalisedimport-apps/personnalisedimport-dashboard/personnalisedimport-dashboard.component';
import { OnceyearauthorisationDashboardComponent } from 'src/app/views/online-services/personalisedimport-apps/personnalisedimport-dashboard/onceyearauthorisation-dashboard/onceyearauthorisation-dashboard.component';
import { PersonalimportappDashboardComponent } from 'src/app/views/online-services/personalisedimport-apps/personnalisedimport-dashboard/personalimportapp-dashboard/personalimportapp-dashboard.component';
import { PersonnalisedimportApplicationComponent } from 'src/app/views/online-services/personalisedimport-apps/personnalisedimport-application/personnalisedimport-application.component';
import { OneyearauthorisationApplicationComponent } from 'src/app/views/online-services/personalisedimport-apps/oneyearauthorisation-application/oneyearauthorisation-application.component';
import { PerimportGeneraldetailsComponent } from 'src/app/views/online-services/personalisedimport-apps/personalisedimport-dataentry/perimport-generaldetails/perimport-generaldetails.component';
import { PerauthorisationGeneraldetailsComponent } from 'src/app/views/online-services/personalisedimport-apps/personalisedimport-dataentry/perauthorisation-generaldetails/perauthorisation-generaldetails.component';
import { PerimportProductsdetailsComponent } from 'src/app/views/online-services/personalisedimport-apps/personalisedimport-dataentry/perimport-productsdetails/perimport-productsdetails.component';
import { PerauthorisationProductsdetailsComponent } from 'src/app/views/online-services/personalisedimport-apps/personalisedimport-dataentry/perauthorisation-productsdetails/perauthorisation-productsdetails.component';
import { SharedpersonalisedimpApplicationComponent } from 'src/app/views/online-services/personalisedimport-apps/sharedpersonalisedimp-application/sharedpersonalisedimp-application.component';

import { RegisteredClinicaltrialComponent } from 'src/app/views/online-services/clinical-trials/registered-clinicaltrial/registered-clinicaltrial.component';
import { NewclinicaltrialDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/newclinicaltrial-dashboard/newclinicaltrial-dashboard.component';

import { RenewalclinicaltrialDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/renewalclinicaltrial-dashboard/renewalclinicaltrial-dashboard.component';
import { ClinicaltrialprogressrptDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/clinicaltrialprogressrpt-dashboard/clinicaltrialprogressrpt-dashboard.component';
import { GcpinspectionsDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/gcpinspections-dashboard/gcpinspections-dashboard.component';
import { ClinicaltriavariationsDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/clinicaltriavariations-dashboard/clinicaltriavariations-dashboard.component';
import { RegisteredFoodsupplementsComponent } from 'src/app/views/public/registered-products/registered-foodsupplements/registered-foodsupplements.component';
import { PremisesStoreslocationComponent } from 'src/app/views/online-services/premises-registration/premises-dataentry/premises-storeslocation/premises-storeslocation.component';
import { NewpromotionalAdvertdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/newpromotional-advertdash/newpromotional-advertdash.component';
import { RenewalpromotionalAdvertdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/renewalpromotional-advertdash/renewalpromotional-advertdash.component';
import { AmendmentpromotionalAdvertdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/amendmentpromotional-advertdash/amendmentpromotional-advertdash.component';
import { ApprovedpromotionalAdvertsComponent } from 'src/app/views/online-services/promotional-advert/approvedpromotional-adverts/approvedpromotional-adverts.component';
import { RenewalapppromotionalAdvertsComponent } from 'src/app/views/online-services/promotional-advert/renewalapppromotional-adverts/renewalapppromotional-adverts.component';
import { AmendmentapppromotionalAdvertsComponent } from 'src/app/views/online-services/promotional-advert/amendmentapppromotional-adverts/amendmentapppromotional-adverts.component';
import { RegisteredClinicaltrialSelectionComponent } from 'src/app/views/online-services/clinical-trials/registered-clinicaltrial-selection/registered-clinicaltrial-selection.component';
import { PreclinicaltrialDashboardComponent } from 'src/app/views/online-services/clinical-trials/clinical-trialdash/preclinicaltrial-dashboard/preclinicaltrial-dashboard.component';
import { PreclinicaltrialSubmissionappComponent } from 'src/app/views/online-services/clinical-trials/preclinicaltrial-submissionapp/preclinicaltrial-submissionapp.component';
import { RenewalclinicaltrialApplicationComponent } from 'src/app/views/online-services/clinical-trials/renewalclinicaltrial-application/renewalclinicaltrial-application.component';
import { PremsiteapprovalDashboardComponent } from 'src/app/views/online-services/premises-registration/premises-reg-dashboard/premsiteapproval-dashboard/premsiteapproval-dashboard.component';
import { PremsiteapprovalApplicationComponent } from 'src/app/views/online-services/premises-registration/premsiteapproval-application/premsiteapproval-application.component';
import { PreinspectionApplicationComponent } from 'src/app/views/online-services/drugshop-registration/preinspection-application/preinspection-application.component';
import { ClinicalComparatorproductsComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial_dataentry/clinical-impproducts/clinical-comparatorproducts/clinical-comparatorproducts.component';
import { ClinicalPlacabolproductsComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial_dataentry/clinical-impproducts/clinical-placabolproducts/clinical-placabolproducts.component';
import { ClinicalInvestigationalproductsComponent } from 'src/app/views/online-services/clinical-trials/clinicaltrial_dataentry/clinical-impproducts/clinical-investigationalproducts/clinical-investigationalproducts.component';
import { InitiateNewbatchApplicationComponent } from 'src/app/views/online-services/product-registration/new-product-registration/initiate-newbatch-application/initiate-newbatch-application.component';
import { InvoiceGroupedappgenerationComponent } from 'src/app/views/online-services/invoice-appgeneration/invoice-groupedappgeneration/invoice-groupedappgeneration.component';
import { InitiateNewproductListingComponent } from 'src/app/views/online-services/product-registration/new-product-registration/initiate-newproduct-listing/initiate-newproduct-listing.component';
import { ProdListingDashboardComponent } from 'src/app/views/online-services/product-registration/product-reg-dashboard/prod-listing-dashboard/prod-listing-dashboard.component';
import { NewexhibitionTradefairdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/newexhibition-tradefairdash/newexhibition-tradefairdash.component';
import { ExtensionexhibitionTradefairdashComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdash/extensionexhibition-tradefairdash/extensionexhibition-tradefairdash.component';
import { AddproductApplicationdetailsComponent } from 'src/app/views/online-services/product-registration/new-product-registration/addproduct-applicationdetails/addproduct-applicationdetails.component';

@NgModule({
  declarations: [
    AppLayoutComponent,
    AppheaderComponent,
    AppfooterComponent,
    AppmenuComponent,
    AppsettingsComponent,
    AppdashboardComponent,
    ApplicationProcessguidelinesComponent,
    ApplicantInformationComponent,
    ApplicantSharedclassComponent,
    
    ProductsappSubmissionsComponent,
    AppsubmissionDashboardComponent,
    NotfoundComponent,
    LargedocumentsUploadComponent,
    SharedProductdashboardComponent,
  //  DrugsProductsdetailsComponent,
    FoodProductsdetailsComponent,
    CosmeticsProductsdetailsComponent,
    AddproductApplicationdetailsComponent,
    InitiateNewproductApplicationComponent,
    InitiateNewbatchApplicationComponent,
    InitiateNewproductListingComponent,
    NewdrugshopDashboardComponent,

    ProdListingDashboardComponent,
   
    GmpPersonneldetailsComponent,
    GmpGeneraldetailsComponent,
    GmpBusinessdetailsComponent,   
    GmpManufatcuringdetailsComponent,
    //premises sections
    PremisesGeneraldetailsComponent,
    DrugshopGeneraldetailsComponent,
    PremisesStaffdetailsComponent,
    DirectorsDetailsComponent,
    PremisesBusinessdetailsComponent,
    PremisesPersonneldetailsComponent,
    PremisesStoreslocationComponent,
    PrepremsapplSelectionComponent,
    PredrugshopAppselectionComponent,
    //import eport 
    ImportexportGendetailsComponent,
    PermitProductsdetailsComponent,
    AppQuerydetailsfrmComponent,
    SharedImportexportclassComponent,
    ImportLicensevisashareclassComponent,
    SharedControldrugsDashboardComponent,OrderSuppydangerousApplicationComponent ,
    InvoiceAppgenerationComponent,
    InvoiceGroupedappgenerationComponent,
    ApplicationInvoicesComponent,
    ProductRegDashboardComponent,
    PremisesRegDashboardComponent,
    DrugshopRegDashboardComponent,
    DrugshopNearestlocationComponent,
    DrugshopPersonneldetailsComponent,
    DrugshopLicensedetailsComponent,
    NewpremisesDashboardComponent,
    PreinspectionDashboardComponent,
    RenewalpremisesDashboardComponent,
    VariationpremisesDashboardComponent,
    WithdrawalpremisesDashboardComponent,
    NewPremisesRegistrationComponent,
    NewDrugshopsRegistrationComponent,
    RenewalBusinessPermitComponent,
    PremisesAlterationComponent,
    SharedPremisesregistrationclassComponent,
    SharedDrugshopsregistrationclassComponent,
    PremisesRegPreviewComponent,
    ApplicationSelectionComponent,//product applicaiton selection
    PremapplSelectionComponent,
    
 
    TraderProfileComponent,
    NotificationsComponent,
    ArchivedPremisesComponent,
    ArchivedProductsappsComponent,
    SharedProductregistrationclassComponent,
    ProductlocalRepresentationComponent,
    ProductApplicationPreviewComponent,ProductappQuerysubmissionComponent,
    NewGmpApplicationComponent,
    RenewalGmpApplicationComponent,
    GmpRegDashboardComponent,
    GmpApplicationsSelectionComponent,
    SharedGmpapplicationclassComponent,
    GmpAppPreviewComponent,
//product notificaitons 
    MeddevGeneraldetailsComponent,
    ProdnoficationSharedclassComponent,
    MedicaldevicesNotificationsComponent,
    ProductnotificationDashboardComponent,

    ProductnotificationSelComponent,
    //clinical trial panel 
    ClinicalprogressrptGeneralComponent,
    ClinicalGeneraldetailsComponent,
    ClinicalStudysitesComponent,
    ClinicalInvestigatorsComponent,
    ClinicalImpproductsComponent,
    
    ClinicalComparatorproductsComponent,
    ClinicalPlacabolproductsComponent,
    ClinicalInvestigationalproductsComponent,
    ClinicalTrialdashComponent,
    PreclinicaltrialDashboardComponent,
    ClinicaltrialDocumentsubmissionComponent,
    NewclinicalTrialComponent,
    
    PreclinicaltrialSubmissionappComponent,
    RenewalclinicaltrialApplicationComponent,
    ClinicaltrialProgressreportingComponent,
    ClinicalTrialammendmentComponent,
    ImportexportDashboardComponent,
    ImportexportSelComponent,
    
    ImportvisaDashboardComponent,
    ImportgeneralicenseDashboardComponent,
    ImportlicenseDashboardComponent,
    ExportlicenseDashboardComponent,
    InspectionbookingDashboardComponent,
    OfficialcertificateDashboardComponent,
    ControldrugsImplicensedashComponent,
    ControldrugsInspectionbkdashComponent,

    ImportLicensesappselectionComponent,
    ExportLicenseappselComponent,
    ImportexportApplicationComponent,

    SharedClinicaltrialComponent,
   
    PromotionalAdvertselComponent,
    SharedpromotionalAdvertComponent,
    PromotionalAdvertarchiveComponent,
    PromotionalAdvertappComponent,
    PromotionalAdvertdashComponent,
    
    NewexhibitionTradefairdashComponent,
    ExtensionexhibitionTradefairdashComponent,
    TradefairpermitAppComponent,
    
    ApplicationQueriesComponent,
    
    ProductsImagesdocumentsComponent,
    ProductRegappealComponent,
    FoodDataproductsComponent,
    CosmeticsDataproductsComponent,


    ProdregistrantDetailsComponent,
    
    
    ApplicationVariationDetailsComponent,
    InitiateProductAlterationComponent,
    InitiateRenewalproductApplicationComponent,
    InitiateProductWithdrawalComponent,
    
    ApplicationWithdrawalDetailsComponent ,
    SampledocumentsSubmissionsComponent,
    
    ProductformDetailsComponent,
    ProductRegistrationselectionComponent,
    RegisteredProductappsComponent,
    RegisteredPremisesappsComponent,
    RegisteredDrugshopappsComponent,
    PremisesRegistrationselectionComponent,
    DrugshopsRegistrationselectionComponent,
    PremisesWithdrawalComponent,
    RegisteredGmpselectionComponent,
    RegisteredGmpapplicationsComponent,
    GmpWithdrawalappsrequestComponent,
    RegisteredManufacturingpremisesComponent,
    GmpDocumentSubmissionComponent,
    GmpApplicationsAmendementsComponent,
    RegisteredClinicaltrialSelectionComponent,
    RegisteredClinicaltrialComponent,
    NewclinicaltrialDashboardComponent,
    RenewalclinicaltrialDashboardComponent,
    ClinicaltrialprogressrptDashboardComponent,
    GcpinspectionsDashboardComponent,
    ClinicaltriavariationsDashboardComponent,

    GmpApplicationsQueryrespComponent,
    AppsdashboardSectionsComponent,

    QualityAuditDashboardComponent,
    SharedDashboardclassComponent,

    NewQualityauditApplicationComponent,
    QualityauditAppSelectionComponent,
    RegisteredQualityauditselectionComponent,
    TraderaccountUsersComponent,
    PharmacistsaccountUserComponent,
    //retention charges 
    RetentionSharedclassComponent,
    RetentionChargesComponent,
    RetentionPaymentsComponent,
    //disposal module 
    
    DisposalAppdashboardComponent,
    DisposalPermitrequestsComponent,
    DisposalSharedclassComponent,
    //
    GcpDashboardComponent,
    GcpInspectionrequestComponent,
    GcpDocumentsubmissionComponent,
    GcpQueryprocessComponent,
    //Disposal
    BloodestablishementDashboardComponent,
    BloodestablishmentApplicationsrequestComponent,
    ControlleddrugspermitsDashboardComponent, 
    ControldrugsLicenseAppComponent,
    ControldrugsImportpermitAppComponent,
    SharedControldrugsPermitlicenseComponent,
    ControlleddrugslicenseGendetailsComponent,
    ControlleddrugsSharedtaentryComponent,

    ControlleddrugslicenseProdsdetailsComponent,
    ControlleddrugsimppermitsGendetailsComponent,
    ControlleddrugsimppermitsProdsdetailsComponent,

    OrderSuppydangerousDashComponent,
    OrderSuppydangerousApplicationComponent,
    OrderSuppydangerousGendetailsComponent,
    OrderSuppydangerousProductdetailsComponent,
    
    ApplicationPaymentsComponent,
    InvoiceApppreviewComponent,
    InspectionBookingComponent,
    AppsynchronisationRequestComponent,

    InspBookingdetailsComponent,
    InspProdbookingDetailsComponent,
    ProdretentionDashboardComponent,
    ProdretentionRequestsappComponent,
    NewprodRegDashboardComponent,
    RenewalprodRegDashboardComponent,
    VariationprodRegDashboardComponent,
    WithdrawalprodRegDashboardComponent,
    ProductNotificationsDashboardComponent,
    AppDocumentPreviewComponent,
    ImportVisaappComponent,
    ExprtLicenseappComponent,
    ImportLicenseappComponent,

    ImpexportamendDashboardComponent,
    ImportexportlicAmmendrequestComponent,
    ImportexportApprovedappselComponent,
    PersonnalisedimportDashboardComponent,
    OnceyearauthorisationDashboardComponent,
    PersonalimportappDashboardComponent,
    PersonnalisedimportApplicationComponent,
    OneyearauthorisationApplicationComponent,
    PerimportGeneraldetailsComponent,
    PerauthorisationGeneraldetailsComponent,
    PerimportProductsdetailsComponent,
    PerauthorisationProductsdetailsComponent,
    SharedpersonalisedimpApplicationComponent,
    RegisteredFoodsupplementsComponent,
    
    NewpromotionalAdvertdashComponent,
    RenewalpromotionalAdvertdashComponent,
    AmendmentpromotionalAdvertdashComponent,
    ApprovedpromotionalAdvertsComponent,
    RenewalapppromotionalAdvertsComponent,
    AmendmentapppromotionalAdvertsComponent,
    PremsiteapprovalDashboardComponent,
    PremsiteapprovalApplicationComponent,
	PreinspectionApplicationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    OnlineserviceRouteModule,
    ArchwizardModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgHttpLoaderModule,
    NgSelectModule,
    NgxSmartModalModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    HttpModule, DataTableModule.forRoot(),
    //angular components
    
    SharedModulesModule,
    NgxDatatableModule,
    DataTablesModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxFileUploaderModule,
    DxActionSheetModule,
    ModalDialogModule.forRoot(),
    DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule,DxScrollViewModule,DxTabPanelModule,
    DxHtmlEditorModule,
    DxDropDownBoxModule,DxTagBoxModule,
    DxRadioGroupModule,
    SafePipeModule
  ],
  exports: [
    AppLayoutComponent,
    OnlineserviceRouteModule
  ]
})
export class OnlineServicesModule { }
