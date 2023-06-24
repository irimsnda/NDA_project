import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { Router } from '@angular/router';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { WizardComponent } from 'ng2-archwizard';
import { Utilities } from 'src/app/services/common/utilities.service';
import { AppSettings } from 'src/app/app-settings';

import CustomStore from 'devextreme/data/custom_store';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProdnoficationSharedclassComponent } from '../prodnofication-sharedclass/prodnofication-sharedclass.component';
@Component({
  selector: 'app-medicaldevices-notifications',
  templateUrl: './medicaldevices-notifications.component.html',
  styleUrls: ['./medicaldevices-notifications.component.css']
})
export class MedicaldevicesNotificationsComponent extends ProdnoficationSharedclassComponent implements OnInit {
 
  constructor(public viewRef: ViewContainerRef,  public configService:ConfigurationsService, public utilityService:Utilities, public spinner:SpinnerVisibilityService, public authService:AuthService, public appService:ProductApplicationService, public router:Router, public config:ConfigurationsService, public toastr: ToastrService,public httpClient: HttpClient) {
      super( viewRef,   configService,  utilityService,  spinner,  authService,  appService,  router,  config,  toastr, httpClient);
  }
  ngOnInit() {
    
  }
  funcCloseQueryWindow(){
    this.isInitalQueryResponseFrmVisible = false;
  }

}
