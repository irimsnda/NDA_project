import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-study-design',
  templateUrl: './study-design.component.html',
  styleUrls: ['./study-design.component.css']
})
export class StudyDesignComponent  extends CtrregistrySharedclassComponent {
  @Input() ctrStudyDesingdetailsfrm: FormGroup;
  is_randomised:boolean=false; @Input() application_id: number;
  
  ngOnInit() {
    this.onLoadinterventionAssData() 
    this.onLoadinterventionAllDataData() 
    this.onLoadallocationSequenceDataData() 
    this.onLoadmaskingBindingDataData() 
    this.onLoadclinicalMaskingDetailsDta()
    this.onLoadsequenceGenerationDataData()

    
  }
  onInterventionAllocSelect($event){
    if($event.value == 2){
        this.is_randomised = true;
    }
    else{
      this.is_randomised = false;
    }
}
}
