import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PromotionadvertService } from 'src/app/services/promotionadvert-app/promotionadvert.service';

@Component({
  selector: 'app-approvedpromotional-adverts',
  templateUrl: './approvedpromotional-adverts.component.html',
  styleUrls: ['./approvedpromotional-adverts.component.css']
})
export class ApprovedpromotionalAdvertsComponent  implements OnInit {

  //the menus 
  contextMenu:any; 

  registeredPromotionalAdvertData:any;
  promotionalapp_details:any;
  module_id:number =14;
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
  constructor(private spinner: SpinnerVisibilityService,private config: ConfigurationsService,public toastr: ToastrService,public router: Router,public appService: PromotionadvertService) { }

  ngOnInit() {
    this.promotionalapp_details = this.appService.getApplicationDetail();

    if (!this.promotionalapp_details) {
      this.router.navigate(['./../online-services/renewalpromotional-advertdash']);
      return;
    }
    else {
      this.registration_status = this.promotionalapp_details.registration_status;
      this.validity_status = this.promotionalapp_details.validity_status;
      this.process_title = this.promotionalapp_details.process_title;
     
    }
    //check logic for the possible actions 
    if(this.registration_status == 2){
      this.contextMenu = [{
          text: " Action",
          icon: 'menu',
          items: [
            { text: "Preview Application Details", action: 'preview',  icon: 'fa fa-print' },
            { text: "Renewal Request", action: 'renew',sub_module_id: 34, icon: 'fa fa-repeat' },
            { text: "Amendment Request", action: 'alteration',sub_module_id: 35, icon: 'fa fa-edit'},
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


    this.onSearchRegisteredPromotionalAdvertApplication();
  }
  prodApplicationActionColClick(e,data){
  
    var action_btn = e.itemData,
        action = action_btn.action;
    if(action === 'preview'){
      //this.funSelectRegisteredProdcustsApp(data.data);
    }
    else if(action == 'renew' || action == 'alteration'){
      this.funSelectRegisteredProdcustsApp(data.data,action_btn.sub_module_id);
    }


}
funSelectRegisteredProdcustsApp(data,sub_module_id){
  let app_data = data;
  
  delete app_data.module_id;
  delete app_data.sub_module_id;
  
        this.section_id = app_data.section_id;
       
        this.config.getSectionUniformApplicationProces(sub_module_id, 1,this.section_id)
          .subscribe(
            data => {
              this.processData = data;
              this.spinner.hide();
              if (this.processData.success) {
                this.title = this.processData[0].name;
                this.router_link = this.processData[0].router_link;
                
                //this.productsapp_details = {module_id: this.module_id, process_title: , sub_module_id: this.sub_module_id, section_id: this.section_id,status_id: 1,status_name: 'New'};
                
                app_data.module_id = this.module_id;
                app_data.process_title = this.title;
                app_data.sub_module_id = this.sub_module_id;
                app_data.section_id = this.section_id;
                app_data.status_id = 1;

                app_data.status_name = 'New';


                this.appService.setApplicationDetail(app_data);

                this.app_route = ['./online-services/' + this.router_link];

                this.router.navigate(this.app_route);
              }
              else {
                this.toastr.error(this.processData.message, 'Alert!');

              }
            });
        return false;
 }
 onSearchRegisteredPromotionalAdvertApplication(){
    this.appService.getPromotionalAppOtherDetails({registration_status:this.registration_status,validity_status:this.validity_status}, 'promotionadverts/onSearchRegisteredPromotionalAdvertApplication')
    .subscribe(
      data => {
        if (data.success) {
          this.registeredPromotionalAdvertData = data.data;
        }
        else {
          this.toastr.success(data.message, 'Alert');
        }
      },
      error => {
        return false
      });
  }
  onPromAdvsesappsToolbarPreparing(e) {
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
    this.onSearchRegisteredPromotionalAdvertApplication();
  }
  
  
  
}
