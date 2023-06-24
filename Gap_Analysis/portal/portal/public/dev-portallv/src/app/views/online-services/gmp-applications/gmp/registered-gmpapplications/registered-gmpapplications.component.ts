import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registered-gmpapplications',
  templateUrl: './registered-gmpapplications.component.html',
  styleUrls: ['./registered-gmpapplications.component.css']
})
export class RegisteredGmpapplicationsComponent implements OnInit {
  section_id:number;
  processData:any;
  title:string;
  router_link:string;
  module_id:number;
  app_route:any;
  gmpapp_details:any;
  process_title:string;
  status_name:string;
  status_id:number;
  mistrader_id:number;
  registered_gmpApplicationData:any;
  registration_status:number;
  validity_status:number;
  contextMenu:any;
  Gmpapp_details:any;
  gmp_type_id:number;
  constructor(private config:ConfigurationsService, private spinner:SpinnerVisibilityService,private appService:GmpApplicationServicesService, public router: Router,public toastr: ToastrService,public authService: AuthService) { }

  ngOnInit() {
    
    this.gmpapp_details = this.appService.getGmpApplicationDetail();

    if (!this.gmpapp_details) {
      this.router.navigate(['./../online-services/gmpapplications-dashboard']);
      return;
    }
    else {
      this.registration_status = this.gmpapp_details.registration_status;
      this.validity_status = this.gmpapp_details.validity_status;
      this.process_title = this.gmpapp_details.process_title;
     this.gmp_type_id = this.gmpapp_details.gmp_type_id;
    }
    //check logic for the possible actions 
    if(this.registration_status == 2){
      this.contextMenu = [{
          text: " Action",
          icon: 'menu',
          items: [
            { text: "Preview Application Details", action: 'preview',  icon: 'fa fa-print' },
            { text: "GMP Renewal Request", action: 'renew',sub_module_id: 5, icon: 'fa fa-repeat' },
            { text: "GMP Widthdrawal Request", action: 'withdrawal', sub_module_id: 37,icon: 'fa fa-times'},
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
    this.onRegisteredGMPSearch();

  }
  onRegisteredGMPSearch() {
    //load the Premises Details 
    this.appService.getGMPDataDetails({ mistrader_id:this.mistrader_id}, 'gmpinspection/getTradersRegisteredGMPApplications')
    .subscribe(
      data => {
        if (data.success) {
          this.registered_gmpApplicationData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  gmpApplicationActionColClick(e,data){
    
      var action_btn = e.itemData,
          action = action_btn.action;
      if(action === 'preview'){
        //this.funSelectRegisteredProdcustsApp(data.data);
      }
      else if(action == 'renew' || action == 'alteration' || action == 'withdrawal'){
        this.onGmpAppSelection(data.data,action_btn.sub_module_id);
      }
  }
  onGmpAppSelection(data,sub_module_id) {

    this.spinner.show();
    let gmpdata = data;
  
    delete gmpdata.manufacturer_id;
    delete gmpdata.module_id;
    delete gmpdata.sub_module_id;
    
          this.section_id = gmpdata.section_id;
    this.config.getSectionUniformApplicationProces(sub_module_id, 3)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;
            
            gmpdata.module_id = this.module_id;
            gmpdata.process_title = this.title;
            gmpdata.sub_module_id = sub_module_id;
            gmpdata.section_id = this.section_id;
            gmpdata.status_id = 1;
            gmpdata.gmp_type_id = this.gmp_type_id;

            gmpdata.status_name = 'New';
            this.appService.setGmpApplicationDetail(gmpdata);

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
