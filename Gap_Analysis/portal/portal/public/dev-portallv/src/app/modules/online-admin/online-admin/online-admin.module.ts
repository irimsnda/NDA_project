import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgHttpLoaderModule } from 'ng-http-loader';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//the imported components modules 
import { DataTableModule } from 'angular5-data-table';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { DataTablesModule } from 'angular-datatables';
import { ArchwizardModule } from 'ng2-archwizard';

import { NgSelectModule } from '@ng-select/ng-select';

import { ToastrModule } from 'ngx-toastr';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminLayoutComponent } from 'src/app/views/admin-services/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from 'src/app/views/admin-services/admin-dashboard/admin-dashboard.component';
import { OnlineAdmin } from 'src/app/routes/online-admin/online-admin';
import { SafePipeModule } from 'src/app/safe-pipe/safe-pipe.module';
import { AdminheaderComponent } from 'src/app/views/admin-services/adminheader/adminheader.component';
import { AdminmenuComponent } from 'src/app/views/admin-services/adminmenu/adminmenu.component';
import { AdminfooterComponent } from 'src/app/views/admin-services/adminfooter/adminfooter.component';
import { HttpClientModule } from '@angular/common/http';
import { DxActionSheetModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxRadioGroupModule, DxScrollViewModule, DxDropDownBoxModule, DxHtmlEditorModule, DxTagBoxModule, DxTabPanelModule } from 'devextreme-angular';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { ScheduledTechnicalmeetingComponent } from 'src/app/views/admin-services/scheduled-technicalmeeting/scheduled-technicalmeeting.component';import { SysdocumentUploadComponent } from 'src/app/views/admin-services/sysdocument-upload/sysdocument-upload.component';

import { ProductEvaluationComponent } from 'src/app/views/admin-services/product-assessment/product-evaluation/product-evaluation.component';
import { ApplicationQueriesComponent } from 'src/app/views/admin-services/product-assessment/application-queries/application-queries.component';
import { ClinicaltrialAssessmentComponent } from 'src/app/views/admin-services/product-assessment/clinicaltrial-assessment/clinicaltrial-assessment.component';
import { SharedassessmentClassComponent } from 'src/app/views/admin-services/product-assessment/sharedassessment-class/sharedassessment-class.component';
import { DrugsProductsdetailsComponent } from 'src/app/views/online-services/product-registration/product-generaldetails/drugs-productsdetails/drugs-productsdetails.component';
import { SharedModulesModule } from '../../shared-modules/shared-modules.module';
import { AssignedAssessmentsappsComponent } from 'src/app/views/admin-services/assigned-assessmentsapps/assigned-assessmentsapps.component';


@NgModule({
  declarations: [AdminLayoutComponent,
    AdminDashboardComponent,
    AdminheaderComponent,
    AdminmenuComponent,
    AdminfooterComponent,
    ScheduledTechnicalmeetingComponent,
    SysdocumentUploadComponent,
    ApplicationQueriesComponent,
    ProductEvaluationComponent,
    ClinicaltrialAssessmentComponent,
 //   DrugsProductsdetailsComponent,
    SharedassessmentClassComponent,
    AssignedAssessmentsappsComponent
  ],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      OnlineAdmin,
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
      SharedModulesModule,
      HttpModule, DataTableModule.forRoot(),
      //angular components
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
      DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule,DxScrollViewModule,
      DxHtmlEditorModule,DxTabPanelModule,
      DxDropDownBoxModule,DxTagBoxModule,
      DxRadioGroupModule,
      SafePipeModule
    ],
  exports: [
    AdminLayoutComponent,
    OnlineAdmin,

  ]
})
export class OnlineAdminModule { 




}
