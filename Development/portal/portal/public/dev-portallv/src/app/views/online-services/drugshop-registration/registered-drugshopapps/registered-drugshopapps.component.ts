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
  selector: 'app-registered-drugshopapps',
  templateUrl: './registered-drugshopapps.component.html',
  styleUrls: ['./registered-drugshopapps.component.css']
})
export class RegisteredDrugshopappsComponent implements OnInit {
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
  constructor(public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: PremisesApplicationsService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) { }

  ngOnInit() {
    this.premisesapp_details = this.appService.getPremisesApplicationDetail();

    if (!this.premisesapp_details) {
      this.router.navigate(['./../online-services/premisesreg-dashboard']);
      return;
    }
    else {
      this.registration_status = this.premisesapp_details.registration_status;
      this.validity_status = this.premisesapp_details.validity_status;
      this.process_title = this.premisesapp_details.process_title;
    }
    if(this.registration_status == 2){
      this.contextMenu = [{
          text: " Action",
          icon: 'menu',
          items: [
            { text: "Preview Application Details", action: 'preview',  icon: 'fa fa-print' },
            { text: "Premises Renewal Request", action: 'renew',sub_module_id: 2, icon: 'fa fa-repeat' },
            { text: "Premises Alteration Request", action: 'alteration',sub_module_id: 3, icon: 'fa fa-edit'},
            { text: "Product Widthdrawal Request", action: 'withdrawal', sub_module_id: 4,icon: 'fa fa-times'},
          ]
        }
      ];
    }
    else{
      this.contextMenu = [{
          text: " Action",
          icon: 'menu',
          items: [
            { text: "Preview Application Details", action: 'preview', icon: 'fa fa-edit', },
            
          ]
        }
      ];
    }
    this.onRegisteredPremisesSearch();

  }
  onRegisteredPremisesSearch() {
   
      //load the Premises Details 
      this.appService.onLoadRegisteredPremises({registration_status:this.registration_status,validity_status:this.validity_status})
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
  premisesApplicationActionColClick(e,data){
  
    var action_btn = e.itemData,
        action = action_btn.action;
    if(action === 'preview'){
      //this.funSelectRegisteredProdcustsApp(data.data);
    }
    else if(action == 'renew' || action == 'alteration' || action == 'withdrawal'){
      this.funSelectRegisteredPremisessApp(data.data,action_btn.sub_module_id);
    }


}
funSelectRegisteredPremisessApp(data,sub_module_id){
  let premisesdata = data;
  
  delete premisesdata.premise_id;
  delete premisesdata.module_id;
  delete premisesdata.sub_module_id;
  
        this.section_id = premisesdata.section_id;
        this.config.getSectionUniformApplicationProces(sub_module_id, 1,this.section_id)
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
}
