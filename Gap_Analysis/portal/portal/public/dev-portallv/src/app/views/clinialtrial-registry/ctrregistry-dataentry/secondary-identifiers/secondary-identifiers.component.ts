import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-secondary-identifiers',
  templateUrl: './secondary-identifiers.component.html',
  styleUrls: ['./secondary-identifiers.component.css']
})
export class SecondaryIdentifiersComponent extends CtrregistrySharedclassComponent {
  is_secondary_id:boolean=false;
  @Input() application_id: number;
  
  @Input() ctrSecondaryDetailsfrm: FormGroup;
  ngOnInit() {
    this.onLoadConfirmationsData();
   
  }
  onIsSecondaryIDSelect($event){
   
      if( $event.selectedItem.id == 1){
          this.is_secondary_id = true;
      }
      else{
        this.is_secondary_id = false;
      }
  }
}
