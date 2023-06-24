import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from '../../../../services/shared/configurations.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ProductApplicationService } from '../../../../services/product-applications/product-application.service';

@Component({
  selector: 'app-application-selection',
  templateUrl: './application-selection.component.html',
  styleUrls: ['./application-selection.component.css']
})
export class ApplicationSelectionComponent implements OnInit {
  sectionsData: any;
  prodClassCategoriesData:any;
  productappTypeData: any;
  app_route:any;
  productAppSelectionfrm: FormGroup;
  processData:any;
  productsapp_details: any;
  router_link:string;
   title:string;
   sectionItem: any;
  app_typeItem: any;
  section_id: number;
  sub_module_id: number=7;
  dtAppGuidelinesData: any = {};
  module_id:number= 1;
  prodClassCategoryItem:any;
  prodclass_category_id:number;
  constructor(private appService:ProductApplicationService,private spinner: SpinnerVisibilityService,private config: ConfigurationsService,public toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    this.onLoadSections();
    this.onLoadProductAppType();
    this.onApplicationProcessGuidelines();
    this.productAppSelectionfrm = new FormGroup({
      section_id: new FormControl(this.sectionsData, Validators.compose([Validators.required])),
      sub_module_id: new FormControl(this.sub_module_id, Validators.compose([Validators.required])),
      prodclass_category_id: new FormControl('', Validators.compose([Validators.required]))
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
  }

  funcChangeProductCategory($event) {
    this.productAppSelectionfrm.get('prodclass_category_id').setValue('');
    this.onLoadprodClassCategoriesData($event.value)
  }
  onLoadprodClassCategoriesData(section_id) {
    var data = {
      table_name: 'par_prodclass_categories',
      section_id:section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.prodClassCategoriesData = data;
        });
  }
  
  onApplicationProcessGuidelines() {
    var data = {
      table_name: 'par_sections',
      module_id: 1
    };
    this.config.onApplicationProcessGuidelines(data)
      .subscribe(
        data => {
          if(data.success){
             this.dtAppGuidelinesData = data.data;
          }
          
        });
  }
   onLoadProductAppType() {
    var data = {
      table_name: 'sub_modules',
      module_id: 1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.productappTypeData = data;
        });
  }
  onProductsBackToDashboard() {
    this.app_route = ['./online-services/productreg-dashboard'];

    this.router.navigate(this.app_route);
  }
 
  onProductAppSelection() {
    if (this.productAppSelectionfrm.invalid) {
      return;
    }
    this.spinner.show();
    this.sectionItem = this.productAppSelectionfrm.controls['section_id'];
    this.app_typeItem = this.productAppSelectionfrm.controls['sub_module_id'];
    this.prodClassCategoryItem = this.productAppSelectionfrm.controls['prodclass_category_id'];
    this.section_id = this.sectionItem.value;
    this.sub_module_id = this.app_typeItem.value;
    this.prodclass_category_id = this.prodClassCategoryItem.value;

    if(this.prodclass_category_id == 3){
         this.sub_module_id = 30;
    }

    this.config.getSectionUniformApplicationProces(this.sub_module_id, 1,this.section_id,this.prodclass_category_id)
      .subscribe(
        data => {
          this.processData = data;
          this.spinner.hide();
          if (this.processData.success) {
            this.title = this.processData[0].name;
            //console.log(processData);

            this.router_link = this.processData[0].router_link;

            this.productsapp_details = {module_id: this.module_id,prodclass_category_id: this.prodclass_category_id, process_title: this.title, sub_module_id: this.sub_module_id, section_id: this.section_id,status_id: 1,status_name: 'New', form_fields:this.processData.form_fields};
            this.appService.setProductApplicationDetail(this.productsapp_details);
            
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
