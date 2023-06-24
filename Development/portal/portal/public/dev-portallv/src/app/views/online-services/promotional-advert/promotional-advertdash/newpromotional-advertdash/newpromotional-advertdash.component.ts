import { Component, OnInit } from '@angular/core';
import { PromotionalAdvertdashComponent } from '../promotional-advertdash.component';

@Component({
  selector: 'app-newpromotional-advertdash',
  templateUrl: './newpromotional-advertdash.component.html',
  styleUrls: ['./newpromotional-advertdash.component.css']
})
export class NewpromotionalAdvertdashComponent extends PromotionalAdvertdashComponent implements OnInit {

  ngOnInit() {
    this.application_title = "New Promotion & Advertisement Applications"
    this.sub_module_id = '33';
    this.onLoadProductAppType();
    this.reloadPromotionAlderrApplication({sub_module_id:this.sub_module_id});
    this.onLoadApplicationCounterDetails()
  }
  onPromotionalappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Initiate New Application Processes',
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
