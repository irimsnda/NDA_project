import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { PremisesApplicationsService } from '../../../../services/premises-applications/premises-applications.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-predrugshop-appselection',
  templateUrl: './predrugshop-appselection.component.html',
  styleUrls: ['./predrugshop-appselection.component.css']
})
export class PredrugshopAppselectionComponent implements OnInit {

   //data table config
  dtAppGuidelinesData: any = {};

  sectionsData: any;
  drugshopappTypeData: any;
  dtAppsnProcessesData: any;
  
  premisesAppSelectionfrm: FormGroup;
  processData: any;
  title: string;
  router_link: string;
  app_route: any;
  premisesapp_details: any;
  sectionItem: any;
  app_typeItem: any;
  section_id: number;
  sub_module_id: number =97;
  module_id:number = 29;
  constructor(private spinner: SpinnerVisibilityService, public toastr: ToastrService, private router: Router, private config: ConfigurationsService, private appService: PremisesApplicationsService) { }

  ngOnInit() {

    this.onLoadSections();
    this.onLoadDrugshopType();
    this.onApplicationProcessGuidelines()
    this.premisesAppSelectionfrm = new FormGroup({
      section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
    });

  }
  onPremisesAppSelection() {

    if (this.premisesAppSelectionfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.sectionItem = this.premisesAppSelectionfrm.controls['section_id'];
    this.app_typeItem = this.premisesAppSelectionfrm.controls['sub_module_id'];
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

            this.premisesapp_details = {module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id };
            this.appService.setPremisesApplicationDetail(this.premisesapp_details);

            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);

          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }


        });
    return false;
  }
  onLoadSections() {
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
      module_id: 30
    };
    this.config.onApplicationProcessGuidelines(data)
      .subscribe(
        data => {
          if(data.success){
             this.dtAppGuidelinesData = data.data;
          }
          
        });
  }
  onLoadDrugshopType() {
    var data = {
      table_name: 'sub_modules',
      module_id: 30
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.drugshopappTypeData = data;
        });
  }
  onPremisesBackToDashboard() {
    this.app_route = ['./online-services/pre-inspection-dashboard'];

    this.router.navigate(this.app_route);
  }
}
