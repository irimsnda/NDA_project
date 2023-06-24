import { Component, OnInit } from '@angular/core';
import { ClinicalTrialdashComponent } from '../clinical-trialdash.component';

@Component({
  selector: 'app-renewalclinicaltrial-dashboard',
  templateUrl: './renewalclinicaltrial-dashboard.component.html',
  styleUrls: ['./renewalclinicaltrial-dashboard.component.css']
})
export class RenewalclinicaltrialDashboardComponent  extends ClinicalTrialdashComponent implements OnInit {
  
  ngOnInit() {
    this.application_title = 'Renewal Clinical Trial Applications';
    this.sub_module_id = 11;
    this.reloadClinicalApplications({sub_module_id: this.sub_module_id});
    this.onLoadApplicationstatuses();
    this.onLoadclincialtrialappType(this.sub_module_id);
this.onLoadProductsCounterDetails();
  }

}
