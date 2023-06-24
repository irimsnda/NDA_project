import { Component, OnInit } from '@angular/core';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { RouterLink, Router } from '@angular/router';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registered-manufacturingpremises',
  templateUrl: './registered-manufacturingpremises.component.html',
  styleUrls: ['./registered-manufacturingpremises.component.css']
})
export class RegisteredManufacturingpremisesComponent implements OnInit {
  registeredPremisesData:any;
  section_id:number;
  sub_module_id:number = 5;
  processData:any;
  title:string;
  module_id:number;
  router_link:string;
  app_route:any;
  gmp_location_id:number = 2;
  process_title:string;
  constructor(public router:Router, public premService:PremisesApplicationsService, private config:ConfigurationsService, private spinner:SpinnerVisibilityService, private appService:GmpApplicationServicesService, public toastr:ToastrService) { }

  ngOnInit() {


    this.onRegisteredPremisesSearch();

  }
  onRegisteredPremisesSearch() {
    
    //load the Premises Details 
    this.premService.onLoadRegisteredPremises({})
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
funSelectRegisteredPremisessApp(data){
  let gmpdata = data.data;
   
  delete gmpdata.premise_id;
  delete gmpdata.module_id;
  delete gmpdata.sub_module_id;
  delete gmpdata.application_status_id;

  delete gmpdata.status_id;
  this.section_id = gmpdata.section_id;
        this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
          .subscribe(
            data => {
              this.processData = data;
              this.spinner.hide();
              if (this.processData.success) {
                this.title = this.processData[0].name;
                this.router_link = this.processData[0].router_link;
                gmpdata.module_id = this.module_id;
                gmpdata.process_title = this.title;
                gmpdata.sub_module_id = this.sub_module_id;
                gmpdata.section_id = this.section_id;
                gmpdata.status_id = 1;
                gmpdata.gmp_location_id = this.gmp_location_id;
                
                gmpdata.gmp_type_id = this.gmp_location_id;
                
                gmpdata.gmp_location_id = this.gmp_location_id;
                
                gmpdata.status_name = 'New';

                this.appService.setGmpApplicationDetail(gmpdata);
                if(gmpdata.section_id == 2){
                  this.router_link = 'new-qualityaudit-applications';
                }
                
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
