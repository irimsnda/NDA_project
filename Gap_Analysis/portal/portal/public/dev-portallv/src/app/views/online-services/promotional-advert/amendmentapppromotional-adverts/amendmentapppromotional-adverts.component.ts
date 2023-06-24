import { Component} from '@angular/core';

import { SharedpromotionalAdvertComponent } from '../sharedpromotional-advert/sharedpromotional-advert.component';
@Component({
  selector: 'app-amendmentapppromotional-adverts',
  templateUrl: './amendmentapppromotional-adverts.component.html',
  styleUrls: ['./amendmentapppromotional-adverts.component.css']
})
export class AmendmentapppromotionalAdvertsComponent extends SharedpromotionalAdvertComponent {
  
  ngOnInit() {
    if (!this.app_details) {
      this.router.navigate(['./../online-services/amendpromotional-advertdash']);
      return;
    }
    this.advertisement_type_id = 1;
    this.promotionalappGeneraldetailsfrm.get('advertisement_type_id').setValue(this.advertisement_type_id);
  }
  onSaveRenewalPromotionalApplication() {
   
    const invalid = [];
    const controls = this.promotionalappGeneraldetailsfrm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
          this.toastr.error('Fill In All Mandatory fields with (*), missing value on '+ name.replace('_id',''), 'Alert');
            return;
        }
    }
    if (this.promotionalappGeneraldetailsfrm.invalid) {
      return;
    }
    

  this.spinner.show();
  this.promotionalappGeneraldetailsfrm.patchValue({application_id:this.application_id});
    this.appService.onSavePromotionalAdvertapplication(this.promotionalappGeneraldetailsfrm.value, 'promotionadverts/onSaveRenewalPromotionalApplication')
      .subscribe(
        response => {
          this.app_resp = response.json();
          //the details
          this.tracking_no = this.app_resp.tracking_no;
          this.application_id = this.app_resp.application_id;
          this.tracking_no = this.app_resp.tracking_no;
          this.application_code = this.app_resp.application_code;
          if (this.app_resp.success) {
            this.toastr.success(this.app_resp.message, 'Response');
          } else {
            this.toastr.error(this.app_resp.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
          this.loading = false;
        });

  }

}
