import { Component} from '@angular/core';

import { SharedpromotionalAdvertComponent } from '../sharedpromotional-advert/sharedpromotional-advert.component';
@Component({
  selector: 'app-tradefairpermit-app',
  templateUrl: './tradefairpermit-app.component.html',
  styleUrls: ['./tradefairpermit-app.component.css']
})
export class TradefairpermitAppComponent extends SharedpromotionalAdvertComponent {
  
  ngOnInit() {
    if (!this.app_details) {
      this.router.navigate(['./../online-services/newexhibition-tradefairdash']);
      return;
    }
    this.advertisement_type_id = 2;
    this.promotionalappGeneraldetailsfrm.get('advertisement_type_id').setValue(this.advertisement_type_id);
  }
  
  onApplicationDashboard() {
    this.app_route = ['./online-services/newexhibition-tradefairdash'];

    this.router.navigate(this.app_route);
  }
  onProductApplicationSubmit() {
    if (this.onApplicationSubmissionFrm.invalid) {
      this.toastr.error('Fill in all the submission details to proceed!!', 'Alert');
      return;
    }
    this.app_route = ['./online-services/newexhibition-tradefairdash'];
    this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no,'wb_promotion_adverts_applications', this.app_route,this.onApplicationSubmissionFrm.value)
  }
}
