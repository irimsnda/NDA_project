import { Component, OnInit } from '@angular/core';
import { PromotionalAdvertdashComponent } from '../promotional-advertdash.component';

@Component({
  selector: 'app-renewalpromotional-advertdash',
  templateUrl: './renewalpromotional-advertdash.component.html',
  styleUrls: ['./renewalpromotional-advertdash.component.css']
})
export class RenewalpromotionalAdvertdashComponent extends PromotionalAdvertdashComponent implements OnInit {
  
  ngOnInit() {
    this.application_title = "Renewal's Promotion & Advertisement Requests"
    this.sub_module_id = '34';
    this.onLoadProductAppType();
    this.reloadPromotionAlderrApplication({sub_module_id:this.sub_module_id});
     this.onLoadApplicationCounterDetails();

  }
  onPromotionalappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Request for Renewal of Promotional Application',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcRenewalApplicationSelectcion.bind(this)

      }
    },{
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  funcRenewalApplicationSelectcion() {
      this.promotionapp_details = {module_id: 14, process_title: 'Promotional & Advertisments Renewal Requests', sub_module_id: this.sub_module_id, status_id: 1,status_name: 'New'};
      this.appService.setApplicationDetail(this.promotionapp_details);
      this.app_route = ['./online-services/approvedpromotionaladvertisements'];
      this.router.navigate(this.app_route);

  }
}
