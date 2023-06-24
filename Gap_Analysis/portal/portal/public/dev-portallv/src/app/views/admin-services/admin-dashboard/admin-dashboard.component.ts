import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { PublicService } from 'src/app/services/public/public.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  
  assessment_title:string='Joint Assessment Procedure Dashboard';
  productappTypeData:any;
  sectionsData:any;
  asessmentProcedureProductsSubmissionDta:any;
  assignedApplicationsAssignmentsData:any;
  technical_meeting_invitations:number=0;
  assigned_tasks:number =0;
  online_submission:number=0;
  active_notifications:number=0;
  mis_external_user_id:number;
  filter_params:any;
  processData:any;
  title:string;
  router_link:string;
  app_route:any;
  router_data:any;
  tab_paneldata:any = [{
    "ID": 1,
    "icon":"fa fa-line-chart",
    "name": "Product Application",
}, {
    "ID": 2,
    "icon":'fa fa-retweet',
    "name": "GMP Inspection Applications",
}];
assessment_procedure_id:number;
country_id:number;
itemCount:any = this.tab_paneldata.length;
  constructor(public router:Router, private authService:AuthService, private utilityService:Utilities,public toastr: ToastrService,private spinner: SpinnerVisibilityService,public publicService: PublicService) { 

    let user = this.authService.getUserDetails();
    this.mis_external_user_id = user.mis_external_user_id;
    
    this.assessment_procedure_id = user.assessment_procedure_id;
    this.country_id = user.country_id;

  }

  ngOnInit() {

    this.onLoadApplicationsCounterDetails();
    this.onloadAsessmentProcedureProductsSubmissionDta();

  }

singleApplicationActionColClick(data){

    let routerdetails = this.funcReturnModuleAssessmentRouter(data.module_id);
    this.filter_params = {application_code:data.application_code, module_id: data.module_id};
    this.title = routerdetails.process_title;
    this.router_link = routerdetails.router_link;
    this.utilityService.setApplicationDetail(data);
    if(this.router_link != ''){
      this.app_route = ['./online-admin/'+this.router_link];
      this.router.navigate(this.app_route);
    }
    else{
          this.toastr.error("The application process route has not been mapped, contact SUpport Team!!", 'Alert!');
    }
   
}
funcReturnModuleAssessmentRouter(module_id){
      if(module_id == 1){
        this.router_data = {process_title:'Product Application Evaluation/Assessment', router_link:'productapp-assessment'}

      }
      else if(module_id == 7){
        this.router_data = {process_title:'Clinical Trial Application Evaluation/Assessment', router_link:'clinicaltrial-assessment'}
        
      }
return this.router_data;

}
subApplicationActionColClick($data){


}
funcPublicNavigation(router_link){
    
  this.app_route = ['./online-admin/' + router_link];
  this.router.navigate(this.app_route);

}
onTechnicalMeetingInvitation(){
  this.router.navigate(["/online-admin/scheduled-technical-meetings"]);
}
onLoadApplicationsCounterDetails(){

}onLoadAssignedApplicationsAssignments() {
    this.spinner.show();
    this.filter_params = {mis_external_user_id:this.mis_external_user_id};

    this.utilityService.onLoadTraderApplicationProcessingData(this.filter_params, 'utilities/onLoadAssignedApplicationsAssignments')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.assignedApplicationsAssignmentsData =  resp_data.data;
          }
          else {

              this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        });
  }
  //
  onProductAssessAppToolbarPreparing(e) {
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
    
    this.onloadAsessmentProcedureProductsSubmissionDta();
  }
  onloadAsessmentProcedureProductsSubmissionDta() {

    this.spinner.show();
    this.filter_params = {assessment_procedure_id:this.assessment_procedure_id,country_id:this.country_id};

    this.utilityService.onLoadTraderApplicationProcessingData(this.filter_params, 'utilities/onloadAsessmentProcedureProductsSubmissionDta')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.asessmentProcedureProductsSubmissionDta =  resp_data.data;
          }
          else {
              this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        });
  }

  funcpopWidth(percentage_width) {
    if(window.innerWidth > 800){
      return  window.innerWidth * percentage_width/100;
    }
    else{
      return  window.innerWidth-50;
    }
  
  }
  funcpopHeigt(percentage_width) {
    return  window.innerHeight * percentage_width/100;
  
  }
  previeweApplicationActionColClick(data){
    this.publicService.setApplicationDetail(data);
          this.app_route = ['./online-admin/preview-medicineproducts'];
          this.router.navigate(this.app_route);
  }
}
