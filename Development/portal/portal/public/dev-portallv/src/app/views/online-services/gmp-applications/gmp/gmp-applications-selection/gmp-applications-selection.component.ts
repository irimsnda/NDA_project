import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { GmpApplicationServicesService } from 'src/app/services/gmp-applications/gmp-application-services.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-gmp-applications-selection',
  templateUrl: './gmp-applications-selection.component.html',
  styleUrls: ['./gmp-applications-selection.component.css']
})
export class GmpApplicationsSelectionComponent  implements OnInit {

  //data table config
  dtAppGuidelinesData: any = {};
  gmp_locationItem:any;

  gmp_type_id:number;
  sectionsData: any;
  GmpAppTypeData: any;
  dtAppsnProcessesData: any;
  
  GmpAppSelectionfrm: FormGroup;
  processData: any;
  title: string;
  router_link: string;
  app_route: any;
  Gmpapp_details: any;
  sectionItem: any;
  app_typeItem: any;
  section_id: number;
  sub_module_id: number = 5;
  module_id:number = 3;
  gmpLocationData:any;
  constructor(private spinner: SpinnerVisibilityService, public toastr: ToastrService, private router: Router, private config: ConfigurationsService, private appService: GmpApplicationServicesService) { }

  ngOnInit() {

    this.onLoadSections();
    this.onLoadGmpAppType();
    this.onApplicationProcessGuidelines()
    this.GmpAppSelectionfrm = new FormGroup({
     // section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
      gmp_type_id: new FormControl('', Validators.compose([Validators.required])),
    });
    this.onLoadgmpLocationData()
  }
  onGmpAppSelection() {
    if (this.GmpAppSelectionfrm.invalid) {
      return;
    }
    //this.spinner.show();
    //this.sectionItem = this.GmpAppSelectionfrm.controls['section_id'];
    this.app_typeItem = this.GmpAppSelectionfrm.controls['sub_module_id'];
    this.gmp_locationItem = this.GmpAppSelectionfrm.controls['gmp_type_id'];
   // this.section_id = this.sectionItem.value;
    this.sub_module_id = this.app_typeItem.value;
    this.gmp_type_id = this.gmp_locationItem.value;

        this.title = 'New GMP Application';
        
        this.Gmpapp_details = {module_id: this.module_id,gmp_type_id: this.gmp_type_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id, status_id: 1, status_name: 'New' };
        this.appService.setGmpApplicationDetail(this.Gmpapp_details);
        if(this.gmp_type_id == 1){
          this.router_link = 'new-gmp-applications';
        }
        else{
          this.router_link = 'registeredmanufacturing_premises';
        }
        this.app_route = ['./online-services/' + this.router_link];
        this.router.navigate(this.app_route);
    //return false;
  }
  onLoadgmpLocationData() {
    var data = {
      table_name: 'par_gmplocation_details',
    };

    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.gmpLocationData = data;
        });
  }
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
      sectionSelection: '1,5'
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
  onLoadGmpAppType() {
    var data = {
      table_name: 'sub_modules',
      module_id: 3
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.GmpAppTypeData = data;
        });
  }

  onGmpBackToDashboard() {
    this.app_route = ['./online-services/gmpapplications-dashboard'];
    this.router.navigate(this.app_route);
  }
}
