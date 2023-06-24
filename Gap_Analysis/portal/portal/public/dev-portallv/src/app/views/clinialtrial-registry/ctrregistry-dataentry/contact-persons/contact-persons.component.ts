import { Component, OnInit, Input } from '@angular/core';
import { CtrregistrySharedclassComponent } from '../../ctrregistry-sharedclass/ctrregistry-sharedclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact-persons',
  templateUrl: './contact-persons.component.html',
  styleUrls: ['./contact-persons.component.css']
})
export class ContactPersonsComponent  extends CtrregistrySharedclassComponent  {

  @Input() contactPersonFrm: FormGroup;
  @Input() application_id: number;
  
  ngOnInit() {
      this.onLoadCountries();
      this. onLoadcontactPersonRoles();
      this.reloadContactpersonaDetails();
  }

}
