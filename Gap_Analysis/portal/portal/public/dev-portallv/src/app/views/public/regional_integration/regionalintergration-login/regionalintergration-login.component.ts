import { Component, OnInit, Input } from '@angular/core';
import { SharedpublicShareclassComponent } from '../../sharedpublic-shareclass/sharedpublic-shareclass.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-regionalintergration-login',
  templateUrl: './regionalintergration-login.component.html',
  styleUrls: ['./regionalintergration-login.component.css']
})
export class RegionalintergrationLoginComponent extends SharedpublicShareclassComponent {
  @Input() onAdminAccessFrm:FormGroup;
  ngOnInit() {
    
  }

}
