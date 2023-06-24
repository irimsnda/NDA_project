import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-outcomes',
  templateUrl: './outcomes.component.html',
  styleUrls: ['./outcomes.component.css']
})
export class OutcomesComponent  extends CtrregistrySharedclassComponent {
  @Input() application_id: number;
  
  @Input() outcomesFrm: FormGroup;
 is_randomised:boolean=false;
 ngOnInit() {
    this.onLoadoutcomeTypesData();
    this.reloadClinicalOutcomes();
    
  }

}
