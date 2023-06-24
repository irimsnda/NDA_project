
import { Component, OnInit } from '@angular/core';
import { ClinicalTrialdashComponent } from '../clinical-trialdash.component';


@Component({
  selector: 'app-gcpinspections-dashboard',
  templateUrl: './gcpinspections-dashboard.component.html',
  styleUrls: ['./gcpinspections-dashboard.component.css']
})
export class GcpinspectionsDashboardComponent  extends ClinicalTrialdashComponent implements OnInit {

  
  ngOnInit() {
    this.application_title = ' Good Clinical Practise Inspection';
    this.sub_module_id = 24;
    this.reloadClinicalApplications({sub_module_id: this.sub_module_id});
    this.onLoadApplicationstatuses();
    this.onLoadclincialtrialappType(this.sub_module_id);
    this.onLoadProductsCounterDetails();
  }

}
