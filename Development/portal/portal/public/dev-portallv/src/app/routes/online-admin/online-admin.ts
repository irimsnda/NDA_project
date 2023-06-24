import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "src/app/views/admin-services/admin-layout/admin-layout.component";
import { AdminDashboardComponent } from "src/app/views/admin-services/admin-dashboard/admin-dashboard.component";
import { AuthAdminGuard } from "src/app/guards/authadmin.guard";
import { ScheduledTechnicalmeetingComponent } from "src/app/views/admin-services/scheduled-technicalmeeting/scheduled-technicalmeeting.component";
import { ProductEvaluationComponent } from "src/app/views/admin-services/product-assessment/product-evaluation/product-evaluation.component";
import { ClinicaltrialAssessmentComponent } from "src/app/views/admin-services/product-assessment/clinicaltrial-assessment/clinicaltrial-assessment.component";
import { PreviewAssessmentmedicinesComponent } from "src/app/views/admin-services/application_details/preview-assessmentmedicines/preview-assessmentmedicines.component";
import { AssignedAssessmentsappsComponent } from "src/app/views/admin-services/assigned-assessmentsapps/assigned-assessmentsapps.component";

const appRoutes: Routes = [
  {
    path: 'online-admin',
    component: AdminLayoutComponent,
    canActivate: [AuthAdminGuard],
    children: [{
      path: '',
      redirectTo: 'admin-dashboard', pathMatch: 'full'
    },{
      path: 'admin-dashboard',
      component: AdminDashboardComponent
    },{
      path: 'scheduled-technical-meetings',
      component: ScheduledTechnicalmeetingComponent
    },{
      path: 'productapp-assessment',
      component: ProductEvaluationComponent
    },{
      path: 'clinicaltrial-assessment',
      component: ClinicaltrialAssessmentComponent
    },{
      path: 'preview-medicineproducts',
      component: PreviewAssessmentmedicinesComponent
    },{
      path: 'assigned-assessments',
      component: AssignedAssessmentsappsComponent
    }
  ]
}]
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes, { useHash: true })],
  declarations: []
})
export class OnlineAdmin {
}
