import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-interventions',
  templateUrl: './interventions.component.html',
  styleUrls: ['./interventions.component.css']
})
export class InterventionsComponent  extends CtrregistrySharedclassComponent {
 // interventionsFrm
 @Input() application_id: number;
  
 @Input() interventionsFrm: FormGroup;
 is_randomised:boolean=false;
 ngOnInit() {
    this.onLoadnatureofControlDataDta() ;
    this.onLoadinterventionTypesDataDta();
    this.reloadClinicalInterventions();
    console.log(this.application_id);
  }
}
