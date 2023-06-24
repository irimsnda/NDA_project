import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-funding-sources',
  templateUrl: './funding-sources.component.html',
  styleUrls: ['./funding-sources.component.css']
})
export class FundingSourcesComponent  extends CtrregistrySharedclassComponent {
  @Input() application_id: number;
  
  is_funding_received:boolean;
    @Input() fundingSourceFrm: FormGroup;
    ngOnInit() {
    this.onLoadCountries();
    this.onLoadConfirmationsData();
    this.onLoadfundingSourceTypeData();
  }
  onIsFundingReceSelect($event){
   
    if( $event.selectedItem.id == 1){
        this.is_funding_received = true;
    }
    else{
      this.is_funding_received = false;
    }
}
}
