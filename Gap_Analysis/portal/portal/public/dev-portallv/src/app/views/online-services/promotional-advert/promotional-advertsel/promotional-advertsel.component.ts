import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PromotionadvertService } from 'src/app/services/promotionadvert-app/promotionadvert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promotional-advertsel',
  templateUrl: './promotional-advertsel.component.html',
  styleUrls: ['./promotional-advertsel.component.css']
})
export class PromotionalAdvertselComponent implements OnInit {
//data table config
dtAppGuidelinesData: any = {};

sectionsData: any;
appTypeData: any;
dtAppsnProcessesData: any;

appSelectionfrm: FormGroup;
processData: any;
title: string;
router_link: string;
app_route: any;
premisesapp_details: any;
sectionItem: any;
app_typeItem: any;
section_id: number;
sub_module_id: number;
module_id:number = 14;
constructor(private spinner: SpinnerVisibilityService, public toastr: ToastrService, private router: Router, private config: ConfigurationsService, private appService: PromotionadvertService) { }

ngOnInit() {

  this.onLoadSections();
  this.onLoadPremisesAppType();
  this.onApplicationProcessGuidelines()
  this.appSelectionfrm = new FormGroup({
    section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
    sub_module_id: new FormControl(this.appTypeData, Validators.compose([Validators.required])),

  });

}onLoadSections() {
  var data = {
    table_name: 'par_sections',
  };
  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.sectionsData = data;
      });
}

onApplicationProcessGuidelines() {
  var data = {
    table_name: 'par_sections',
    module_id: 14
  };
  this.config.onApplicationProcessGuidelines(data)
    .subscribe(
      data => {
        if(data.success){
           this.dtAppGuidelinesData = data.data;
        }
        
      });
}
onLoadPremisesAppType() {
  var data = {
    table_name: 'sub_modules',
    module_id: 14
  };
  this.config.onLoadConfigurationData(data)
    .subscribe(
      data => {
        this.appTypeData = data;
      });
}
  onBackToDashboard() {
    this.app_route = ['./online-services/promotional-advertdash'];

    this.router.navigate(this.app_route);
  }
  
  onAppSelection() {

    if (this.appSelectionfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.sectionItem = this.appSelectionfrm.controls['section_id'];
    this.app_typeItem = this.appSelectionfrm.controls['sub_module_id'];
    this.section_id = this.sectionItem.value;
    this.sub_module_id = this.app_typeItem.value;

    this.config.getSectionUniformApplicationProces(this.sub_module_id, 1)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            this.router_link = this.processData[0].router_link;

            this.premisesapp_details = {module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id,status_id: 1,status_name: 'New'};
            this.appService.setApplicationDetail(this.premisesapp_details);

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
