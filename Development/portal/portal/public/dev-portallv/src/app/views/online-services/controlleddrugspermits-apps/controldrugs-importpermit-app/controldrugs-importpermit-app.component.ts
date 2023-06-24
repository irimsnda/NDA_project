import { Component, OnInit } from '@angular/core';
import { SharedControldrugsPermitlicenseComponent } from '../shared-controldrugs-permitlicense/shared-controldrugs-permitlicense.component';

@Component({
  selector: 'app-controldrugs-importpermit-app',
  templateUrl: './controldrugs-importpermit-app.component.html',
  styleUrls: ['./controldrugs-importpermit-app.component.css']
})
export class ControldrugsImportpermitAppComponent extends SharedControldrugsPermitlicenseComponent implements OnInit {
  
  ngOnInit() {
    if (!this.application_details) {

       this.router.navigate(['./../online-services/controlleddrugsimplicense-dashboard']);
      return
     }
  }

}
