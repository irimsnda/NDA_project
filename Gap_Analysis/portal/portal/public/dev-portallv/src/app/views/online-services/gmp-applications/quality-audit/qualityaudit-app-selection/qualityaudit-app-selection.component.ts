
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SharedDashboardclassComponent } from '../../shared-dashboardclass/shared-dashboardclass.component';
import { ModalDialogService } from 'ngx-modal-dialog';
import { Utilities } from 'src/app/services/common/utilities.service';


@Component({
  selector: 'app-qualityaudit-app-selection',
  templateUrl: './qualityaudit-app-selection.component.html',
  styleUrls: ['./qualityaudit-app-selection.component.css']
})
export class QualityauditAppSelectionComponent  extends SharedDashboardclassComponent  implements OnInit {

  //data table config
  
  constructor(public viewRef: ViewContainerRef, public modalServ: ModalDialogService, public spinner: SpinnerVisibilityService, public toastr: ToastrService, public router: Router, public configService: ConfigurationsService, public appService: GmpApplicationServicesService,public utilityService:Utilities) { 

    super(viewRef, modalServ, spinner, toastr, router, configService,  appService, utilityService)
    this.sectionSelection = '2';
    this.sectionsdata = '2';
  }
  ngOnInit() {

    this.onLoadSections();
    this.onLoadGmpAppType();
    this.onApplicationProcessGuidelines()
    this.onLoadgmpLocationData()
  }
  onGmpAppSelection() {
    if (this.GmpAppSelectionfrm.invalid) {
      return;
    }
    //this.spinner.show();
    this.sectionItem = this.GmpAppSelectionfrm.controls['section_id'];
    this.app_typeItem = this.GmpAppSelectionfrm.controls['sub_module_id'];
    this.gmp_locationItem = this.GmpAppSelectionfrm.controls['gmp_type_id'];
    this.section_id = this.sectionItem.value;
    this.sub_module_id = this.app_typeItem.value;
    this.gmp_type_id = this.gmp_locationItem.value;
  
        this.title = 'New GMP Application';
        
        this.Gmpapp_details = {module_id: this.module_id,gmp_type_id: this.gmp_type_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id, status_id: 1, status_name: 'New' };
        this.appService.setGmpApplicationDetail(this.Gmpapp_details);
        if(this.gmp_type_id == 1){
          this.router_link = 'new-qualityaudit-applications';
        }
        else{
          this.router_link = 'registeredmanufacturing_premises';
        }
        this.app_route = ['./online-services/' + this.router_link];
        this.router.navigate(this.app_route);
    //return false;
  }
  
  onGmpBackToDashboard() {
    this.app_route = ['./online-services/gmpapplications-dashboard'];
    this.router.navigate(this.app_route);
  }
}
