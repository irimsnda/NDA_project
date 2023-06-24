import { Component, OnInit } from '@angular/core';
import { ClinicalTrialdashComponent } from '../clinical-trialdash.component';

@Component({
  selector: 'app-newclinicaltrial-dashboard',
  templateUrl: './newclinicaltrial-dashboard.component.html',
  styleUrls: ['./newclinicaltrial-dashboard.component.css']
})
export class NewclinicaltrialDashboardComponent extends ClinicalTrialdashComponent implements OnInit {

  
  ngOnInit() {
    this.application_title = 'New Clinical Trial Applications';
    this.sub_module_id = 10;
    this.reloadClinicalApplications({sub_module_id: this.sub_module_id});
    this.onLoadApplicationstatuses();
    this.onLoadclincialtrialappType(this.sub_module_id);
    this.onLoadProductsCounterDetails();
  }

}
