import { Component, OnInit } from '@angular/core';
import { PromotionalAdvertdashComponent } from '../promotional-advertdash.component';

@Component({
  selector: 'app-amendmentpromotional-advertdash',
  templateUrl: './amendmentpromotional-advertdash.component.html',
  styleUrls: ['./amendmentpromotional-advertdash.component.css']
})
export class AmendmentpromotionalAdvertdashComponent extends PromotionalAdvertdashComponent implements OnInit {
  
  
  ngOnInit() {
    this.application_title = "Variations Promotion & Advertisement Requests"
    this.sub_module_id = '35';
    this.onLoadProductAppType();
    this.reloadPromotionAlderrApplication({sub_module_id:this.sub_module_id});
  }
  onPromotionalappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Request for Amendment of Promotional Application',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcApplicationSelectcion.bind(this)

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
}
