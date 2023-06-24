import { Component, OnInit } from '@angular/core';
import { ControlleddrugspermitsDashboardComponent } from '../controlleddrugspermits-dashboard.component';

@Component({
  selector: 'app-controldrugs-implicensedash',
  templateUrl: './controldrugs-implicensedash.component.html',
  styleUrls: ['./controldrugs-implicensedash.component.css']
})
export class ControldrugsImplicensedashComponent  extends ControlleddrugspermitsDashboardComponent implements OnInit {

  
  ngOnInit() {
    this.application_title = 'Controlled Drugs Import License(s) Application';
    this.sub_module_id = 61;
    this.onLoadProductAppType(12,this.sub_module_id);
    this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
    this.reloadPermitApplicationsApplications({is_orderlocal_supply:0,sub_module_id:this.sub_module_id});
    this.onLoadApplicationCounterDetails(this.sub_module_id);
    
  }

}
