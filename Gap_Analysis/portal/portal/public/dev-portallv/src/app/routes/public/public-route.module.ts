import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PublicLayoutComponent } from './../../views/public/public-layout/public-layout.component';
import { HomeComponent } from './../../views/public/home/home.component';
import { CreateAccountComponent } from '../../views/public/create-account/create-account.component';
import { ForgotPasswordComponent } from '../../views/public/forgot-password/forgot-password.component';
import { ProhibitedProductsComponent } from '../../views/public/prohibited-products/prohibited-products.component';
import { RegisteredProductsComponent } from '../../views/public/registered-products/registered-products.component';
import { RegisteredPremisesComponent } from '../../views/public/registered-premises/registered-premises.component';
import { GmpComplaintFacilitiesComponent } from '../../views/public/gmp-complaint-facilities/gmp-complaint-facilities.component';
import { ComplaintsSubmissionComponent } from '../../views/public/complaints-submission/complaints-submission.component';
import { UserManualComponent } from '../../views/public/user-manual/user-manual.component';
import { FeesChargesComponent } from '../../views/public/fees-charges/fees-charges.component';
import { RegistrationRegulationsComponent } from '../../views/public/registration-regulations/registration-regulations.component';
import { ClinicalTrialsComponent } from '../../views/public/clinical-trials/clinical-trials.component';
import { PasswordRecoverComponent } from '../../views/public/password-recover/password-recover.component';
import { AdminLoginComponent } from 'src/app/views/public/admin-login/admin-login.component';
import { PreviewclinicaltrialComponent } from 'src/app/views/public/previewclinicaltrial/previewclinicaltrial.component';
import { EacRegionalintergrationComponent } from 'src/app/views/public/regional_integration/eac-regionalintergration/eac-regionalintergration.component';
import { SadcRegionalintergrationComponent } from 'src/app/views/public/regional_integration/sadc-regionalintergration/sadc-regionalintergration.component';
import { RegisteredMedicinesComponent } from 'src/app/views/public/registered-products/registered-medicines/registered-medicines.component';
import { RegisteredMedicaldevicesComponent } from 'src/app/views/public/registered-products/registered-medicaldevices/registered-medicaldevices.component';
import { MedicaldevicesNotificationComponent } from 'src/app/views/public/registered-products/medicaldevices-notification/medicaldevices-notification.component';
import { CutomerComplainsComponent } from 'src/app/views/public/cutomer-complains/cutomer-complains.component';
import { AuthorisedVeterinaryProductsComponent } from 'src/app/views/public/registered-products/authorised-veterinary-products/authorised-veterinary-products.component';
import { AuthorisedHumanmedicinesComponent } from 'src/app/views/public/registered-products/authorised-humanmedicines/authorised-humanmedicines.component';
import { AuthorisedCosmeticsproductsComponent } from 'src/app/views/public/registered-products/authorised-cosmeticsproducts/authorised-cosmeticsproducts.component';
import { AuthorisedMedicaldevicesComponent } from 'src/app/views/public/registered-products/authorised-medicaldevices/authorised-medicaldevices.component';
import { RegisteredCosmeticsproductsComponent } from 'src/app/views/public/registered-products/registered-cosmeticsproducts/registered-cosmeticsproducts.component';
import { RegisteredFoodproductsComponent } from 'src/app/views/public/registered-products/registered-foodproducts/registered-foodproducts.component';
import { RegisteredTobaccoproductsComponent } from 'src/app/views/public/registered-products/registered-tobaccoproducts/registered-tobaccoproducts.component';
import { RegisteredVeterinaryproductsComponent } from 'src/app/views/public/registered-products/registered-veterinaryproducts/registered-veterinaryproducts.component';
import { RegisteredVeterinarymedicaldevicesComponent } from 'src/app/views/public/registered-products/registered-veterinarymedicaldevices/registered-veterinarymedicaldevices.component';
import { RegisteredLabhouseholdchemicalsComponent } from 'src/app/views/public/registered-products/registered-labhouseholdchemicals/registered-labhouseholdchemicals.component';
import { RegisteredAnimalfeedsComponent } from 'src/app/views/public/registered-products/registered-animalfeeds/registered-animalfeeds.component';
import { MedicaldevicesPremisesComponent } from 'src/app/views/public/registered-premises/medicaldevices-premises/medicaldevices-premises.component';
import { CosmeticsPremisesComponent } from 'src/app/views/public/registered-premises/cosmetics-premises/cosmetics-premises.component';
import { PharmaceuticalPremisesComponent } from 'src/app/views/public/registered-premises/pharmaceutical-premises/pharmaceutical-premises.component';
import { FoodPremisesComponent } from 'src/app/views/public/registered-premises/food-premises/food-premises.component';
import { RegisteredFoodsupplementsComponent } from 'src/app/views/public/registered-products/registered-foodsupplements/registered-foodsupplements.component';
import { SafedisposalinspectionFeesComponent } from 'src/app/views/public/servicetariff-fees/safedisposalinspection-fees/safedisposalinspection-fees.component';
import { PromotionadvertisementFeesComponent } from 'src/app/views/public/servicetariff-fees/promotionadvertisement-fees/promotionadvertisement-fees.component';
import { ClinicaltrialFeesComponent } from 'src/app/views/public/servicetariff-fees/clinicaltrial-fees/clinicaltrial-fees.component';
import { GmpinspectionFeesComponent } from 'src/app/views/public/servicetariff-fees/gmpinspection-fees/gmpinspection-fees.component';
import { ImportexportFeesComponent } from 'src/app/views/public/servicetariff-fees/importexport-fees/importexport-fees.component';
import { PremisesinspectionFeesComponent } from 'src/app/views/public/servicetariff-fees/premisesinspection-fees/premisesinspection-fees.component';
import { ProductregistrationFeesComponent } from 'src/app/views/public/servicetariff-fees/productregistration-fees/productregistration-fees.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/public/app-home', pathMatch: 'full'
  },
  {
    path: 'public',
    component: PublicLayoutComponent,
    children:[{
      path: '', 
      component: HomeComponent
    },{
      path: 'app-home',
      component: HomeComponent
    },{
      path: 'create-account',
      component: CreateAccountComponent
    },{
      path: 'lost-password',
      component: ForgotPasswordComponent
    },{
      path: 'prohibited-products',
      component: ProhibitedProductsComponent
    },{
      path: 'registered-medicines',
      component: RegisteredMedicinesComponent
    },{
      path: 'registered-medicaldevices',
      component: RegisteredMedicaldevicesComponent
    },{
      path: 'registered-foodsupplements',
      component: RegisteredFoodsupplementsComponent
    },
    {
      path: 'notified-medicaldevices',
      component: MedicaldevicesNotificationComponent
    },
    
    {
      path: 'registered-premises',
      component: RegisteredPremisesComponent
    },{
      path: 'gmp-compliant-facilities',
      component: GmpComplaintFacilitiesComponent
    },{
      path: 'complaints-submission',
      component: ComplaintsSubmissionComponent
    },{
      path: 'process-guidelines/:module_id/:regulated_producttype_id',
      component: UserManualComponent
    },{
      path: 'fees-charges',
      component: FeesChargesComponent
    },{
      path: 'registration-regulations',
      component: RegistrationRegulationsComponent
    },{
      path: 'clinical-trials',
      component: ClinicalTrialsComponent
    },{
      path: 'reset-password',
      component: PasswordRecoverComponent
    },{
      path: 'admin-login',
      component: AdminLoginComponent
    },{
      path: 'previewclinical-trials',
      component: PreviewclinicaltrialComponent
    },{
      path: 'eac-regional-integration',
      component: EacRegionalintergrationComponent
    },{
      path: 'sadc-regional-integration',
      component: SadcRegionalintergrationComponent
    },{
      path: 'cutomer-complaints',
     component: CutomerComplainsComponent
    },{
      path: 'authorised-humanmedicines',
     component: AuthorisedHumanmedicinesComponent
    },{
      path: 'authorised-veterinary-products',
     component: AuthorisedVeterinaryProductsComponent
    },{
      path: 'authorised-cosmetics-products',
     component: AuthorisedCosmeticsproductsComponent
    },{
      path: 'authorised-medical-devices',
     component: AuthorisedMedicaldevicesComponent
    },{
      path: 'registered-cosmeticsproducts',
     component: RegisteredCosmeticsproductsComponent
    },{
      path: 'registered-foodproducts',
     component: RegisteredFoodproductsComponent
    },{
      path: 'registered-tobaccoproducts',
     component: RegisteredTobaccoproductsComponent
    },{
      path: 'registered-veterinarymedicines',
     component: RegisteredVeterinaryproductsComponent
    },{
      path: 'registered-animafeeds',
     component: RegisteredAnimalfeedsComponent
    },{
      path: 'registered-labhsechemicals',
     component: RegisteredLabhouseholdchemicalsComponent
    },{
      path: 'registered-veterinarydevices',
     component: RegisteredVeterinarymedicaldevicesComponent
    },{
      path: 'registered-foodpremises',
     component: FoodPremisesComponent
    },{
      path: 'registered-pharmapremises',
     component: PharmaceuticalPremisesComponent
    },{
      path: 'registered-cosmeticspremises',
     component: CosmeticsPremisesComponent
    },{
      path: 'registered-medicaldevicespremises',
     component: MedicaldevicesPremisesComponent
    },{
      path: 'productregistration-fees',
     component: ProductregistrationFeesComponent
    },{
      path: 'premisesinspection-fees',
     component: PremisesinspectionFeesComponent
    },{
      path: 'importexportlicense-fees',
     component: ImportexportFeesComponent
    },{
      path: 'gmpinspection-fees',
     component: GmpinspectionFeesComponent
    },{
      path: 'clinicaltrialapplication-fees',
     component: ClinicaltrialFeesComponent
    },{
      path: 'promotionaladvertisement-fees',
     component: PromotionadvertisementFeesComponent
    },{
      path: 'safedisposalinspection-fees',
     component: SafedisposalinspectionFeesComponent
    }]
  }
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
  declarations: []
})
export class PublicRouteModule { }
