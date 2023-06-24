import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent  extends CtrregistrySharedclassComponent  {

  @Input() clinicalSponsorsFrm: FormGroup;
  @Input() sponsorInvestigatorFrm: FormGroup;
  @Input() application_id: number;
  
  ngOnInit() {
    this.onLoadsponsorNatureData() 
    this.onLoadsponsorsLevelData();
    this.onLoadCountries();
    this.reloadclinicaltrailSponsorsData();
  }

}
