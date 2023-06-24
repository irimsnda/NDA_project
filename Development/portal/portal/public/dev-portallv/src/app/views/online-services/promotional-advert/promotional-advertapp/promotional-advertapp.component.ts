import { Component} from '@angular/core';

import { SharedpromotionalAdvertComponent } from '../sharedpromotional-advert/sharedpromotional-advert.component';
@Component({
  selector: 'app-promotional-advertapp',
  templateUrl: './promotional-advertapp.component.html',
  styleUrls: ['./promotional-advertapp.component.css']
})
export class PromotionalAdvertappComponent extends SharedpromotionalAdvertComponent {
  
  ngOnInit() {
    if (!this.app_details) {
      this.router.navigate(['./../online-services/newpromotional-advertdash']);
      return;
    }
    this.advertisement_type_id = 1;
    this.promotionalappGeneraldetailsfrm.get('advertisement_type_id').setValue(this.advertisement_type_id);
  }
  
  onApplicationDashboard() {
    this.app_route = ['./online-services/newpromotional-advertdash'];

    this.router.navigate(this.app_route);
  }
  onProductApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = ['./online-services/newpromotional-advertdash'];
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no,'wb_promotion_adverts_applications', this.app_route,this.onApplicationSubmissionFrm.value)
  }
}
