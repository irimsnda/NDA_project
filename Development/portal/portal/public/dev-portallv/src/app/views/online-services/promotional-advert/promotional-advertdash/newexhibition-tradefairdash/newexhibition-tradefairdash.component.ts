import { Component, OnInit } from '@angular/core';
import { PromotionalAdvertdashComponent } from '../promotional-advertdash.component';

@Component({
  selector: 'app-newexhibition-tradefairdash',
  templateUrl: './newexhibition-tradefairdash.component.html',
  styleUrls: ['./newexhibition-tradefairdash.component.css']
})
export class NewexhibitionTradefairdashComponent extends PromotionalAdvertdashComponent implements OnInit {

  ngOnInit() {
    this.application_title = "Approval Exhibition or Trade Fair(Regulated Products)"
    this.sub_module_id = '92';
    this.onLoadProductAppType();
    this.reloadPromotionAlderrApplication({sub_module_id:this.sub_module_id});
    this.onLoadApplicationCounterDetails()
  }
  onPromotionalappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Initiate Application Approval Exhibition or Trade Fair',
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
