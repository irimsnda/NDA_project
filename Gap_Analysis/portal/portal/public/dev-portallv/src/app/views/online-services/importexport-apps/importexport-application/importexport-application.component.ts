import { Component, OnInit } from '@angular/core';

import { SharedImportexportclassComponent } from '../shared-importexportclass/shared-importexportclass.component';
@Component({
  selector: 'app-importexport-application',
  templateUrl: './importexport-application.component.html',
  styleUrls: ['./importexport-application.component.css']
})
export class ImportexportApplicationComponent extends SharedImportexportclassComponent implements OnInit {
  //ImportexportService
  //dms 
 
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onCloseQueryMode(){

    this.isInitalQueryResponseFrmVisible = false;
  }
}
