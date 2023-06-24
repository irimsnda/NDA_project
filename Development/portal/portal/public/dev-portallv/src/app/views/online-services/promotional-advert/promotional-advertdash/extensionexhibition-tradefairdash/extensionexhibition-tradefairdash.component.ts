import { Component, OnInit } from '@angular/core';
import { PromotionalAdvertdashComponent } from '../promotional-advertdash.component';


@Component({
  selector: 'app-extensionexhibition-tradefairdash',
  templateUrl: './extensionexhibition-tradefairdash.component.html',
  styleUrls: ['./extensionexhibition-tradefairdash.component.css']
})
export class ExtensionexhibitionTradefairdashComponent extends PromotionalAdvertdashComponent implements OnInit {
  
  
  ngOnInit() {
    this.application_title = "Extension for Exhibition or Trade Fair(Regulated Products)"
    this.sub_module_id = '93';
    this.onLoadProductAppType();
    this.reloadPromotionAlderrApplication({sub_module_id:this.sub_module_id});
  }
  onPromotionalappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Request for Extension for Exhibition or Trade Fair(Regulated Products)',
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
