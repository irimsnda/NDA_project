import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { PublicService } from 'src/app/services/public/public.service';

@Component({
  selector: 'app-assigned-assessmentsapps',
  templateUrl: './assigned-assessmentsapps.component.html',
  styleUrls: ['./assigned-assessmentsapps.component.css']
})
export class AssignedAssessmentsappsComponent implements OnInit {
  filter_params:any;
  processData:any;
  title:string;
  router_link:string;
  app_route:any;
  router_data:any;
  regional_integrationuser_id:number;
  assessment_procedure_id:number;
  country_id:number;
  assignedApplicationsAssignmentsData:any;
  constructor(public router:Router, private authService:AuthService, private utilityService:Utilities,public toastr: ToastrService,private spinner: SpinnerVisibilityService,public publicService: PublicService) { }

  ngOnInit() {
    let user = this.authService.getUserDetails();
    this.regional_integrationuser_id = user.regional_integrationuser_id;
    
    this.assessment_procedure_id = user.assessment_procedure_id;
    this.country_id = user.country_id;
    this.onLoadAssignedApplicationsAssignments();
  }
  onProductsesappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift( {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.onLoadAssignedApplicationsAssignments.bind(this)
        }
      });
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
onLoadAssignedApplicationsAssignments() {
  this.spinner.show();
  this.filter_params = {regional_integrationuser_id:this.regional_integrationuser_id};

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
}
