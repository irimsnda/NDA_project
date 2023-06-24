import { Component, OnInit } from '@angular/core';
import { ControlleddrugspermitsDashboardComponent } from '../controlleddrugspermits-dashboard.component';

@Component({
  selector: 'app-officialcertificate-dashboard',
  templateUrl: './officialcertificate-dashboard.component.html',
  styleUrls: ['./officialcertificate-dashboard.component.css']
})
export class OfficialcertificateDashboardComponent extends ControlleddrugspermitsDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.application_title = 'Official Certificate (Import of Controlled Drugs) Dashboard';
    this.sub_module_id = 60;
    this.onLoadProductAppType(12,this.sub_module_id);
    this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:0,sub_module_id:this.sub_module_id});
    this.onLoadApplicationCounterDetails(this.sub_module_id);
  }

}
