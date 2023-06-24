import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-ethics-approval',
  templateUrl: './ethics-approval.component.html',
  styleUrls: ['./ethics-approval.component.css']
})
export class EthicsApprovalComponent extends CtrregistrySharedclassComponent {

  @Input() application_id: number;
  
  @Input() ethicsApprovalFrm: FormGroup;
  is_randomised:boolean=false;
  ngOnInit() {

    this.reloadEthicsApprovalData();
    this.onLoadCountries();
  }

}
