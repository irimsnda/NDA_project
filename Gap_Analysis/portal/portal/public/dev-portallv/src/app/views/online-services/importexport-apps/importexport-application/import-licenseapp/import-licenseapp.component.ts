import { Component, OnInit } from '@angular/core';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/shared-importexportclass.component';

@Component({
  selector: 'app-import-licenseapp',
  templateUrl: './import-licenseapp.component.html',
  styleUrls: ['./import-licenseapp.component.css']
})
export class ImportLicenseappComponent extends SharedImportexportclassComponent implements OnInit {

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/importlicense-dashboard']);
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
