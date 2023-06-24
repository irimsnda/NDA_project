
import { Component, OnInit, ViewChild, ViewContainerRef, Inject, ChangeDetectorRef } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { SharedPremisesregistrationclassComponent } from '../shared-premisesregistrationclass/shared-premisesregistrationclass.component';

@Component({
  selector: 'app-premsiteapproval-application',
  templateUrl: './premsiteapproval-application.component.html',
  styleUrls: ['./premsiteapproval-application.component.css']
})
export class PremsiteapprovalApplicationComponent extends SharedPremisesregistrationclassComponent implements OnInit {

  premisesrenGeneraldetailsfrm: FormGroup;
  app_routing:any;
  

  ngOnInit() {
    this.premisesapp_details = this.appService.getPremisesApplicationDetail();

    if (!this.premisesapp_details) {
      this.router.navigate(['./../online-services/preinspection-dashboard']);
      return;
    }
    else {
      this.sub_module_id = this.premisesapp_details.sub_module_id;
      this.process_title = this.premisesapp_details.process_title;
      this.section_id = this.premisesapp_details.section_id;
      this.premise_id = this.premisesapp_details.premise_id;

      this.tracking_no = this.premisesapp_details.tracking_no;
      this.country_id = this.premisesapp_details.country_id;
      this.region_id = this.premisesapp_details.region_id;

      this.status_name = this.premisesapp_details.status_name;
      this.status_id = this.premisesapp_details.status_id;
      this.module_id = this.premisesapp_details.module_id;

    }
    
    if(this.status_id < 1 || !this.status_id){
      this.status_name = "New"
      this.status_id = 1;
    }
    
  }
  onProductDashboard() {
    //check for unsaved changes 
    this.router.navigate(['./../online-services/preinspection-dashboard']);
   
  }
}
