import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ProductApplicationService } from 'src/app/services/product-applications/product-application.service';

@Component({
  selector: 'app-registered-productapps',
  templateUrl: './registered-productapps.component.html',
  styleUrls: ['./registered-productapps.component.css']
})
export class RegisteredProductappsComponent implements OnInit {

  //the menus 
  contextMenu:any; 

  registeredProductsData:any;
  productapp_details:any;
  module_id:number =1;
  validity_status:number;
  registration_status:number;
  process_title:number;
  status_id:number;
  status_name:number;
  productappTypeData:any;
  section_id:number;
  processData:any;
  title:string;
   router_link:string;
    productsapp_details:any;
                  app_route:any;
                  sub_module_id:number;
  constructor(private spinner: SpinnerVisibilityService,private config: ConfigurationsService,public toastr: ToastrService,public router: Router,public appService: ProductApplicationService) { }

  ngOnInit() {
    this.productapp_details = this.appService.getProductApplicationDetail();

    if (!this.productapp_details) {
      this.router.navigate(['./../online-services/productreg-dashboard']);
      return;
    }
    else {
      this.registration_status = this.productapp_details.registration_status;
      this.validity_status = this.productapp_details.validity_status;
      this.process_title = this.productapp_details.process_title;
     
    }
    //check logic for the possible actions 
    if(this.registration_status == 2){
      this.contextMenu = [{
          text: " Action",
          icon: 'menu',
          items: [
            { text: "Preview Application Details", action: 'preview',  icon: 'fa fa-print' },
            { text: "Product Renewal Request", action: 'renew',sub_module_id: 8, icon: 'fa fa-repeat' },
            { text: "Product Alteration Request", action: 'alteration',sub_module_id: 9, icon: 'fa fa-edit'},
            { text: "Product Widthdrawal Request", action: 'withdrawal', sub_module_id: 17,icon: 'fa fa-times'},
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


    this.onSearchRegisteredProductApplication();
  }
  prodApplicationActionColClick(e,data){
  
    var action_btn = e.itemData,
        action = action_btn.action;
    if(action === 'preview'){
      //this.funSelectRegisteredProdcustsApp(data.data);
    }
    else if(action == 'renew' || action == 'alteration' || action == 'withdrawal'){
      this.funSelectRegisteredProdcustsApp(data.data,action_btn.sub_module_id);
    }


}
funSelectRegisteredProdcustsApp(data,sub_module_id){
  let productdata = data;
  
  delete productdata.product_id;
  delete productdata.module_id;
  delete productdata.sub_module_id;
  
        this.section_id = productdata.section_id;
        console.log(productdata)
        this.config.getSectionUniformApplicationProces(sub_module_id, 1,this.section_id)
          .subscribe(
            data => {
              this.processData = data;
              this.spinner.hide();
              if (this.processData.success) {
                this.title = this.processData[0].name;
                this.router_link = this.processData[0].router_link;
                
                //this.productsapp_details = {module_id: this.module_id, process_title: , sub_module_id: this.sub_module_id, section_id: this.section_id,status_id: 1,status_name: 'New'};
                
                productdata.module_id = this.module_id;
                productdata.process_title = this.title;
                productdata.sub_module_id = this.sub_module_id;
                productdata.section_id = this.section_id;
                productdata.status_id = 1;

                productdata.status_name = 'New';


                this.appService.setProductApplicationDetail(productdata);

                this.app_route = ['./online-services/' + this.router_link];

                this.router.navigate(this.app_route);
              }
              else {
                this.toastr.error(this.processData.message, 'Alert!');

              }
            });
        return false;
 }
  onSearchRegisteredProductApplication(){
    this.appService.getProductsOtherDetails({registration_status:this.registration_status,validity_status:this.validity_status}, 'onSearchRegisteredProductApplication')
    .subscribe(
      data => {
        if (data.success) {
          this.registeredProductsData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  onProductsesappsToolbarPreparing(e) {
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
    this.onSearchRegisteredProductApplication();
  }
  
  
  
}
