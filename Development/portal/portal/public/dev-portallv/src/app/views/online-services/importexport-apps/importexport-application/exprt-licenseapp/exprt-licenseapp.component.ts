import { Component, OnInit } from '@angular/core';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/shared-importexportclass.component';

@Component({
  selector: 'app-exprt-licenseapp',
  templateUrl: './exprt-licenseapp.component.html',
  styleUrls: ['./exprt-licenseapp.component.css']
})
export class ExprtLicenseappComponent extends SharedImportexportclassComponent implements OnInit {

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/exportlicense-dashboard']);
       return
     }
  }
 funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onCloseQueryMode(){

    this.isInitalQueryResponseFrmVisible = false;
  }
}
