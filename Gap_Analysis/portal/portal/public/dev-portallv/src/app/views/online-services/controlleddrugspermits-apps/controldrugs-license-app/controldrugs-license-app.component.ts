import { Component, OnInit } from '@angular/core';
import { SharedControldrugsPermitlicenseComponent } from '../shared-controldrugs-permitlicense/shared-controldrugs-permitlicense.component';

@Component({
  selector: 'app-controldrugs-license-app',
  templateUrl: './controldrugs-license-app.component.html',
  styleUrls: ['./controldrugs-license-app.component.css']
})
export class ControldrugsLicenseAppComponent extends SharedControldrugsPermitlicenseComponent implements OnInit {
  
  ngOnInit() {
    if (!this.application_details) {

      this.router.navigate(['./../online-services/controlleddrugscertificate-dashboard']);
     return
    }
  }

}
