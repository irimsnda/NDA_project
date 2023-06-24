import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';

@Component({
  selector: 'app-premises-registrationselection',
  templateUrl: './premises-registrationselection.component.html',
  styleUrls: ['./premises-registrationselection.component.css']
})
export class PremisesRegistrationselectionComponent implements OnInit {
  registered_premisesData: any;
  contextMenu:any;
  registeredPremisesData:any;
  registration_status:any;
  premisesapp_details:any;
  validity_status:number;
  process_title:string;
  section_id:number;
  processData:any;
  title:string;
  router_link:any;
  app_route:any;
  module_id:number;
  sub_module_id:number;
  status_name:string;
  status_id:string;
  constructor(public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) { }

  ngOnInit() {

    this.premisesapp_details = this.appService.getPremisesApplicationDetail();

    console.log( this.premisesapp_details);
    if (!this.premisesapp_details) {
      this.router.navigate(['./../online-services/premisesrenewal-dashboard']);
      return;
    }
    else {
      this.sub_module_id = this.premisesapp_details.sub_module_id;
      
      this.module_id = this.premisesapp_details.module_id;
      this.process_title = this.premisesapp_details.process_title;
     
      this.status_name = this.premisesapp_details.status_name;
      this.status_id = this.premisesapp_details.status_id;
    }
    this.onRegisteredPremisesSearch();
    
  }
  funSelectRegisteredPremisessApp(data){
    let premisesdata = data.data;
     
    delete premisesdata.premise_id;
    delete premisesdata.module_id;
    delete premisesdata.sub_module_id;
    delete premisesdata.application_status_id;
  
         delete premisesdata.status_id;
         this.section_id = premisesdata.section_id;
          this.sub_module_id =  this.sub_module_id;

          this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
            .subscribe(
              data => {
                this.processData = data;
                this.spinner.hide();
                if (this.processData.success) {
                  this.title = this.processData[0].name;
                  this.router_link = this.processData[0].router_link;
                  premisesdata.module_id = this.module_id;
                  premisesdata.process_title = this.title;
                  premisesdata.sub_module_id = this.sub_module_id;
                  premisesdata.section_id = this.section_id;
                  premisesdata.status_id = 1;

                  premisesdata.status_name = 'New';


                  this.appService.setPremisesApplicationDetail(premisesdata);

                  this.app_route = ['./online-services/' + this.router_link];

                  this.router.navigate(this.app_route);
                }
                else {
                  this.toastr.error(this.processData.message, 'Alert!');

                }
              });
          return false;
   }
  
   onRegisteredPremisesSearch() {
    
      //load the Premises Details 
      this.appService.onLoadRegisteredPremises({})
        .subscribe(
          data_response => {
            this.registeredPremisesData = data_response.data;
          },
          error => {
            return false
          });
  }
  onPremisesappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  refreshDataGrid() {
    this.onRegisteredPremisesSearch();
  }
}
