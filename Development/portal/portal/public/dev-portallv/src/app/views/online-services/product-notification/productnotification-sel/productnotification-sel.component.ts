import { Component, OnInit } from '@angular/core';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-productnotification-sel',
  templateUrl: './productnotification-sel.component.html',
  styleUrls: ['./productnotification-sel.component.css']
})
export class ProductnotificationSelComponent implements OnInit {

  sectionsData: any;
  notificationsAppTypeData: any;
  dtAppsnProcessesData: any;
  notificationsAppSelectionfrm: FormGroup;
  premisesAppTypeData: any;
  sub_module_id: number;
  sectionItem: any;
  app_typeItem: any;
  section_id: number;
  processData: any;
  title: string;
  router_link: string;
  productnotificationapp_details: any;
  module_id: number;
  app_route: any;
  dtAppGuidelinesData :any;
  
  constructor(private spinner: SpinnerVisibilityService, public toastr: ToastrService, private configService: ConfigurationsService, private appService: ProductApplicationService, private router: Router, public modalService: NgxSmartModalService, private config: ConfigurationsService) {
    this.onLoadSections();
    this.onLoadNotificationsAppTypeData();
    this.onApplicationProcessGuidelines();
  }

  ngOnInit() {
    this.notificationsAppSelectionfrm = new FormGroup({
      section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.premisesAppTypeData, Validators.compose([Validators.required])),
    });
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
  } onLoadNotificationsAppTypeData() {
    var data = {
      table_name: 'sub_modules',
      module_id: 6
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.notificationsAppTypeData = data;
        });

  } onProductNotificationAppSelection() {

    if (this.notificationsAppSelectionfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.sectionItem = this.notificationsAppSelectionfrm.controls['section_id'];
    this.app_typeItem = this.notificationsAppSelectionfrm.controls['sub_module_id'];
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

            this.productnotificationapp_details = { module_id: this.module_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id, status_id: 1,status_name: 'New'};
            this.appService.setProductApplicationDetail(this.productnotificationapp_details);

            this.app_route = ['./online-services/' + this.router_link];

            this.router.navigate(this.app_route);
          }
          else {
            this.toastr.error(this.processData.message, 'Alert!');

          }
        });
    return false;
  }
  
  onApplicationProcessGuidelines() {
    var data = {
      table_name: 'par_sections',
      module_id: 2
    };
    this.config.onApplicationProcessGuidelines(data)
      .subscribe(
        data => {
          if(data.success){
             this.dtAppGuidelinesData = data.data;
          }
          
        });
  }

  onProductNotiBackToDashboard() {
    this.app_route = ['./online-services/productnotifications-dashboard'];
    this.router.navigate(this.app_route);
  }
  
}
