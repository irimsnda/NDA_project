import { Component, OnInit, ViewChild } from '@angular/core';
import { WizardComponent } from 'ng2-archwizard';
import { DxDataGridComponent } from 'devextreme-angular';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';

@Component({
  selector: 'app-ctrtrial-registration',
  templateUrl: './ctrtrial-registration.component.html',
  styleUrls: ['./ctrtrial-registration.component.css']
})
export class CtrtrialRegistrationComponent  extends CtrregistrySharedclassComponent{
  navBarLocation:string='top';
  navBarLayout:string='small';
  ngOnInit() {
    
    if(window.innerWidth < 800){
      this.navBarLocation='left';
      this.navBarLayout='large-empty-symbols';
    }
  }
  finishFunction(){
    
  }
  enterSecondStep(event){
    
    
  }
 
}
