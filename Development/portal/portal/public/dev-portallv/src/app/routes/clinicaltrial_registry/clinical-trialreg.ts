

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { CtrregistryDashboardComponent } from "src/app/views/clinialtrial-registry/dashboard/ctrregistry-dashboard/ctrregistry-dashboard.component";
import { CtrregistryLayoutComponent } from "src/app/views/clinialtrial-registry/layout/ctrregistry-layout/ctrregistry-layout.component";
import { CtrtrialRegistrationComponent } from "src/app/views/clinialtrial-registry/ctrregistration/ctrtrial-registration/ctrtrial-registration.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { ClinicalTrialpreviewComponent } from "src/app/views/clinialtrial-registry/clinical-trialpreview/clinical-trialpreview.component";

const appRoutes: Routes = [
  {
    path: 'clinicaltrial-registry',
    component: CtrregistryLayoutComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      redirectTo: 'ctrregistry-dashboard', pathMatch: 'full'
    },{
      path: 'ctrregistry-dashboard',
      component: CtrregistryDashboardComponent
    },{
      path: 'clinicaltrialreg-registration',
      component: CtrtrialRegistrationComponent
    },{
      path: 'clinicaltrialreg-registration',
      component: CtrtrialRegistrationComponent
    },{
      path: 'clinicaltrialreg-preview',
      component: ClinicalTrialpreviewComponent
    }
  ]
}]
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(appRoutes, { useHash: true })],
  declarations: []
})
export class ClinicalTrialreg {

}
