import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CtrregistryDashboardComponent } from 'src/app/views/clinialtrial-registry/dashboard/ctrregistry-dashboard/ctrregistry-dashboard.component';
import { ClinicalTrialreg } from 'src/app/routes/clinicaltrial_registry/clinical-trialreg';
import { CtrregistryLayoutComponent } from 'src/app/views/clinialtrial-registry/layout/ctrregistry-layout/ctrregistry-layout.component';
//import { AppheaderComponent } from 'src/app/views/online-services/appheader/appheader.component';
//import { AppfooterComponent } from 'src/app/views/online-services/appfooter/appfooter.component';
import { ArchwizardModule } from 'ng2-archwizard';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { RouterModule } from '@angular/router';
import { CtrregistryNavigationComponent } from 'src/app/views/clinialtrial-registry/navigation/ctrregistry-navigation/ctrregistry-navigation.component';
import { CtrregistryHeaderComponent } from 'src/app/views/clinialtrial-registry/ctrregheader/ctrregistry-header/ctrregistry-header.component';
import { CtrregistryFooterComponent } from 'src/app/views/clinialtrial-registry/ctrregfooter/ctrregistry-footer/ctrregistry-footer.component';
import { DataTablesModule } from 'angular-datatables';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DxActionSheetModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxRadioGroupModule, DxScrollViewModule, DxDropDownBoxModule, DxHtmlEditorModule, DxTagBoxModule} from 'devextreme-angular';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { CtrtrialRegistrationComponent } from 'src/app/views/clinialtrial-registry/ctrregistration/ctrtrial-registration/ctrtrial-registration.component';
import { SecondaryIdentifiersComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/secondary-identifiers/secondary-identifiers.component';
import { StudyDesignComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/study-design/study-design.component';
import { InterventionsComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/interventions/interventions.component';
import { EligibilityCriteriaComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/eligibility-criteria/eligibility-criteria.component';
import { OutcomesComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/outcomes/outcomes.component';
import { RecruitmentCentresComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/recruitment-centres/recruitment-centres.component';
import { EthicsApprovalComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/ethics-approval/ethics-approval.component';
import { FundingSourcesComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/funding-sources/funding-sources.component';
import { SponsorsComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/sponsors/sponsors.component';
import { CollaboratorsComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/collaborators/collaborators.component';
import { ClinicaltriaregDocumentsComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/clinicaltriareg-documents/clinicaltriareg-documents.component';
import { ContactPersonsComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/contact-persons/contact-persons.component';
import { CtrregistrySharedclassComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { TrialDetailsComponent } from 'src/app/views/clinialtrial-registry/ctrregistry-dataentry/trial-details/trial-details.component';
import { ClinicalTrialpreviewComponent } from 'src/app/views/clinialtrial-registry/clinical-trialpreview/clinical-trialpreview.component';

@NgModule({
  declarations: [
    CtrregistryDashboardComponent,
    CtrregistryLayoutComponent,
    CtrregistryNavigationComponent,
    CtrregistryHeaderComponent,
    CtrregistryFooterComponent,
    CtrtrialRegistrationComponent,
    CtrregistrySharedclassComponent,
    TrialDetailsComponent,
    SecondaryIdentifiersComponent,
    StudyDesignComponent,
    InterventionsComponent,
    EligibilityCriteriaComponent,
    OutcomesComponent,
    RecruitmentCentresComponent,
    EthicsApprovalComponent,
    FundingSourcesComponent,
    SponsorsComponent,
    CollaboratorsComponent,
    ClinicaltriaregDocumentsComponent,
    ContactPersonsComponent,
    ClinicalTrialpreviewComponent
  ],
  imports: [
    CommonModule,
    ClinicalTrialreg,
    NgHttpLoaderModule,
    RouterModule,
    DataTablesModule,
    DxTextBoxModule,FormsModule, ReactiveFormsModule,
    DxDateBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,ArchwizardModule,
    DxFileUploaderModule,
    DxActionSheetModule,
    ModalDialogModule.forRoot(),
    DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule,DxScrollViewModule,
    DxHtmlEditorModule,
    DxDropDownBoxModule,
    DxRadioGroupModule,
    DxTagBoxModule
  ],
   exports: [
    CtrregistryLayoutComponent,
    ClinicalTrialreg
  ], schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ClinicalTrialregistryModule { }
