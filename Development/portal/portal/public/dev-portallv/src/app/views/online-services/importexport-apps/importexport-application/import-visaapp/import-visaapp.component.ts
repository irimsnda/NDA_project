import { Component, OnInit } from '@angular/core';
import { SharedImportexportclassComponent } from '../../shared-importexportclass/shared-importexportclass.component';

@Component({
  selector: 'app-import-visaapp',
  templateUrl: './import-visaapp.component.html',
  styleUrls: ['./import-visaapp.component.css']
})
export class ImportVisaappComponent extends SharedImportexportclassComponent implements OnInit {

  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/importvc-dashboard']);
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
