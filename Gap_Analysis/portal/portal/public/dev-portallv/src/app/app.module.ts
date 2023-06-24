import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { NgxCaptchaModule } from 'ngx-captcha';
import { AppComponent } from './app.component';
import { PublicModule } from './modules/public/public.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { OnlineServicesModule } from './modules/online-services/online-services.module';
import { DxActionSheetModule,DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule,DxRadioGroupModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxTagBoxModule, DxTreeListModule, DxScrollViewModule, DxProgressBarModule, DxTabsModule } from 'devextreme-angular';
import { RegisteredPremisesComponent } from './views/online-services/premises-registration/registered-premises/registered-premises.component';
import { ApprovedImportexportComponent } from './views/online-services/importexport-apps/approved-importexport/approved-importexport.component';
import { GmpCompliantComponent } from './views/online-services/gmp-applications/gmp/gmp-compliant/gmp-compliant.component';

import { OnlineAdminModule } from './modules/online-admin/online-admin/online-admin.module';
import { EncrDecrService } from './app-crypto';
import { ClinicalTrialregistryModule } from './modules/clinical-trialregistry/clinical-trialregistry.module';

import { ArchwizardModule } from 'ng2-archwizard';

import { PreviewclinicaltrialComponent } from './views/public/previewclinicaltrial/previewclinicaltrial.component';
import { SharedpublicShareclassComponent } from './views/public/sharedpublic-shareclass/sharedpublic-shareclass.component';

import { PreviewAssessmentmedicinesComponent } from './views/admin-services/application_details/preview-assessmentmedicines/preview-assessmentmedicines.component';
import { PreviewAssessmentgmpappsComponent } from './views/admin-services/application_details/preview-assessmentgmpapps/preview-assessmentgmpapps.component';
import { SharedModulesModule } from './modules/shared-modules/shared-modules.module';
import { AddproductApplicationdetailsComponent } from './views/online-services/product-registration/new-product-registration/addproduct-applicationdetails/addproduct-applicationdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisteredPremisesComponent,
    GmpCompliantComponent,
    SharedpublicShareclassComponent,
    PreviewclinicaltrialComponent,
    ApprovedImportexportComponent,
    PreviewAssessmentmedicinesComponent,
    PreviewAssessmentgmpappsComponent
    
    
    

  ],
  imports: [
   // NgWizardModule.forRoot(ngWizardConfig),
    BrowserModule,//Sytem defined module 
    PublicModule, //users 
     ArchwizardModule,SharedModulesModule,
    ClinicalTrialregistryModule,
    OnlineServicesModule,
    OnlineAdminModule,
    NgxSmartModalModule.forRoot(),
    NgxCaptchaModule,
    DxActionSheetModule,DxFileUploaderModule,DxNumberBoxModule , DxCheckBoxModule ,DxSelectBoxModule,DxTextAreaModule,DxContextMenuModule,DxMenuModule,DxTextBoxModule,DxTreeListModule,
    DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule,DxRadioGroupModule,DxTagBoxModule ,DxScrollViewModule,DxProgressBarModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }) 
  ],
  
  exports:[NgxSmartModalModule,ArchwizardModule],
  providers: [EncrDecrService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }


