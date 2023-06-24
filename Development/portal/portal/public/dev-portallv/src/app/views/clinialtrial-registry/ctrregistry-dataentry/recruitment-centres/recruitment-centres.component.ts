import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recruitment-centres',
  templateUrl: './recruitment-centres.component.html',
  styleUrls: ['./recruitment-centres.component.css']
})
export class RecruitmentCentresComponent  extends CtrregistrySharedclassComponent  {
  @Input() application_id: number;
  
  @Input() recruitmentCenterFrm: FormGroup;
  ngOnInit() {
      this.reloadRecruitmentCenters();
      this.onLoadCountries();
  }

}
