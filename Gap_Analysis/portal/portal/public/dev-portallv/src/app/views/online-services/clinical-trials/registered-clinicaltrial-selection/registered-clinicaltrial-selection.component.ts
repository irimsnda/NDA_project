import { Component, OnInit } from '@angular/core';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrConfig, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-clinicaltrial-selection',
  templateUrl: './registered-clinicaltrial-selection.component.html',
  styleUrls: ['./registered-clinicaltrial-selection.component.css']
})
export class RegisteredClinicaltrialSelectionComponent implements OnInit {

  dtRegClinicalTrialApplicationData:any;
  sub_module_id:number = 11;
  clinicaltrial_data:any;
  processData:any;
  title:string;
  router_link:any;
  app_route:any;
  module_id:number;
  section_id:number;

  application_code:any;
  mistrader_id:number;
  clincialapp_details:any;
  process_title:string;
  status_name:string;
  status_id:number;
  constructor(public router: Router,public authService: AuthService,public appService: ImportexportService,private config:ConfigurationsService, private spinner:SpinnerVisibilityService, private toastr:ToastrService) { }

  ngOnInit() {
    
  let user_details = this.authService.getUserDetails();
  this.mistrader_id =  user_details.mistrader_id;
  
  this.clincialapp_details = this.appService.getApplicationDetail();

  if (!this.clincialapp_details) {
   
    this.router.navigate(['./online-services/clinical-trialsdashboard']);
    return;
  }
  else {
    this.sub_module_id = this.clincialapp_details.sub_module_id;
    
    this.module_id = this.clincialapp_details.module_id;
    this.process_title = this.clincialapp_details.process_title;
   
    this.status_name = this.clincialapp_details.status_name;
    this.status_id = this.clincialapp_details.status_id;
  }

  this.onRegisteredClinicalTrialApplications();
  }
  funSelectRegisteredClinicalApp(data){
    let clinicaltrial_data = data.data;
     
    delete clinicaltrial_data.sub_module_id;
    delete clinicaltrial_data.application_status_id;
    delete clinicaltrial_data.application_code;
    
    
    delete clinicaltrial_data.status_id;
     this.clinicaltrial_data = clinicaltrial_data.clinicaltrial_data;
          this.sub_module_id =  this.sub_module_id;
  
          this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
            .subscribe(
              data => {
                this.processData = data;
                this.spinner.hide();
                if (this.processData.success) {
                  
                  this.title = this.processData[0].name;
                  this.router_link = this.processData[0].router_link;
                  clinicaltrial_data.module_id = this.module_id;
                  clinicaltrial_data.process_title = this.title;
                  clinicaltrial_data.sub_module_id = this.sub_module_id;
                  clinicaltrial_data.section_id = 5;
                  clinicaltrial_data.status_id = 1;
                  clinicaltrial_data.status_name = 'New';
                  this.appService.setApplicationDetail(clinicaltrial_data);
  
                  this.app_route = ['./online-services/' + this.router_link];
  
                  this.router.navigate(this.app_route);
  
                }
                else {
                  this.toastr.error(this.processData.message, 'Alert!');
  
                }
              });
          return false;
   }
   onRegisteredClinicalTrialApplications(){
   
    this.appService.getClinicalTrialOtherdetails({ }, 'getClinicalTrialsList')
    .subscribe(
      data => {
        if (data.success) {
          this.dtRegClinicalTrialApplicationData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
}
