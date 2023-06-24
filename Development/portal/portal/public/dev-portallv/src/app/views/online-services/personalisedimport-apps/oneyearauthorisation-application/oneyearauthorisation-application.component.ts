import { Component, OnInit } from '@angular/core';
import { SharedpersonalisedimpApplicationComponent } from '../sharedpersonalisedimp-application/sharedpersonalisedimp-application.component';

@Component({
  selector: 'app-oneyearauthorisation-application',
  templateUrl: './oneyearauthorisation-application.component.html',
  styleUrls: ['./oneyearauthorisation-application.component.css']
})
export class OneyearauthorisationApplicationComponent extends SharedpersonalisedimpApplicationComponent implements OnInit {

  
  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/oneyearauthorisation-dashboard']);
       return
     }
  }

}
