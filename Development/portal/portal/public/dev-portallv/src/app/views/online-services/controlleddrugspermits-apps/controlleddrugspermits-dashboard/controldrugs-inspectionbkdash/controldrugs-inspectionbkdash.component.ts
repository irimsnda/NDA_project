import { Component, OnInit } from '@angular/core';
import { ControlleddrugspermitsDashboardComponent } from '../controlleddrugspermits-dashboard.component';

@Component({
  selector: 'app-controldrugs-inspectionbkdash',
  templateUrl: './controldrugs-inspectionbkdash.component.html',
  styleUrls: ['./controldrugs-inspectionbkdash.component.css']
})
export class ControldrugsInspectionbkdashComponent extends ControlleddrugspermitsDashboardComponent  implements OnInit {

  
  ngOnInit() {
    this.application_title = 'Controlled Drugs Inspection Booking';
    this.sub_module_id = 84;
    this.onLoadProductAppType(12,this.sub_module_id);
    this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:0,sub_module_id:this.sub_module_id});
    this.onLoadApplicationCounterDetails(this.sub_module_id);
    
  }

}
