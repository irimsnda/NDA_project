import { Component, OnInit } from '@angular/core';
import { SharedpersonalisedimpApplicationComponent } from '../sharedpersonalisedimp-application/sharedpersonalisedimp-application.component';

@Component({
  selector: 'app-personnalisedimport-application',
  templateUrl: './personnalisedimport-application.component.html',
  styleUrls: ['./personnalisedimport-application.component.css']
})
export class PersonnalisedimportApplicationComponent  extends SharedpersonalisedimpApplicationComponent implements OnInit {

  
  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/personnalisedimport-dashboard']);
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
