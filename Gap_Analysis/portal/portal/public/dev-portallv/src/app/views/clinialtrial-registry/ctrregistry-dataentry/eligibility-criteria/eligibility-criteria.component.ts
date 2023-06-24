import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-eligibility-criteria',
  templateUrl: './eligibility-criteria.component.html',
  styleUrls: ['./eligibility-criteria.component.css']
})
export class EligibilityCriteriaComponent extends CtrregistrySharedclassComponent {

  @Input() application_id: number;
  
  @Input() ctrEligibilityCriteriaFrm: FormGroup;
  is_randomised:boolean=false;
  ngOnInit() {
    this.onLoadsexDataDta();
    this.onLoaddurationDescDataDta();
    this.onLoadageGroupDataDta();

    
  }

}
