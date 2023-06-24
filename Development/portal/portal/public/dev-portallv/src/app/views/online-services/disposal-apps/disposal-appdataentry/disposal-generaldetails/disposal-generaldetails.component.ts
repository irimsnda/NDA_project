import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DisposalSharedclassComponent } from '../../disposal-sharedclass/disposal-sharedclass.component';

@Component({
  selector: 'app-disposal-generaldetails',
  templateUrl: './disposal-generaldetails.component.html',
  styleUrls: ['./disposal-generaldetails.component.css']
})
export class DisposalGeneraldetailsComponent  extends DisposalSharedclassComponent  {
  @Input() dispapplicationGeneraldetailsfrm: FormGroup;

  @Input() isRegisteredProductsWinshow: boolean;
  @Input() registeredProductsData: any;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() application_code: number;
  isReadOnly:boolean;
  ispremisesSearchWinVisible:boolean;
  registered_premisesData:any;
  is_readonly:boolean;

  ngOnInit() {
  }

  onRegisteredPremisesSearch() {

    this.premappService.onLoadRegisteredPremises({})
      .subscribe(
        data_response => {
          this.ispremisesSearchWinVisible = true;
          this.registered_premisesData = data_response.data;
        },
        error => {
          return false
        });

  }
  funcSelectPremiseDetails(data) {
      this.dispapplicationGeneraldetailsfrm.get('premise_id').setValue(data.data.premise_id);
      this.dispapplicationGeneraldetailsfrm.get('premises_name').setValue(data.data.premises_name);
      this.ispremisesSearchWinVisible = false;
  
  }
}
