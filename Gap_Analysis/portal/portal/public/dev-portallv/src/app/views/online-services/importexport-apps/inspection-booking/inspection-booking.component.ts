import { Component, OnInit } from '@angular/core';
import { SharedImportexportclassComponent } from '../shared-importexportclass/shared-importexportclass.component';

@Component({
  selector: 'app-inspection-booking',
  templateUrl: './inspection-booking.component.html',
  styleUrls: ['./inspection-booking.component.css']
})
export class InspectionBookingComponent extends SharedImportexportclassComponent  implements OnInit {

  
  ngOnInit() {
    if (!this.application_details) {
      this.router.navigate(['./../online-services/inspectionbookin-dashboard']);
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
