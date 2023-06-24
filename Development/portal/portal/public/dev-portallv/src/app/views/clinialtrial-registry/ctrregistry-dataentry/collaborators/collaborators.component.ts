import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent  extends CtrregistrySharedclassComponent {

  @Input() application_id: number;
  
  has_collaborators:boolean;
    @Input() collaboratorsFrm: FormGroup;
    ngOnInit() {

      this.onLoadConfirmationsData();
      this.onLoadCountries();

  }
  
  onIsHasCollaboratorySelect($event){
   
    if( $event.selectedItem.id == 1){
        this.has_collaborators = true;
    }
    else{
      this.has_collaborators = false;
    }
}
}
