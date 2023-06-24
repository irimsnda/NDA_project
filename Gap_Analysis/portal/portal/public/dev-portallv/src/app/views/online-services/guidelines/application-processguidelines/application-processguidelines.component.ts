import { Component, Input, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-application-processguidelines',
  templateUrl: './application-processguidelines.component.html',
  styleUrls: ['./application-processguidelines.component.css']
})
export class ApplicationProcessguidelinesComponent implements OnInit {
  @Input() module_id:number;
  @Input() sub_module_id:number;

  @Input() guidelines_title:string;
  @Input() is_popupguidelines:boolean;
  dtAppGuidelinesData: any = {};
  constructor(private config: ConfigurationsService,private spinner: SpinnerVisibilityService) { }

  ngOnInit() {
    this.onApplicationProcessGuidelines();
  }
  onApplicationProcessGuidelines() {
    this.spinner.show();
    var data = {
      module_id: this.module_id,
      sub_module_id:this.sub_module_id
    };
    this.config.onApplicationProcessGuidelines(data)
      .subscribe(
        data => {
          if(data.success){
             this.dtAppGuidelinesData = data.data;
          }
          this.spinner.hide();
        });
  }
  onApplicationGuidelinesDownload(){
    alert("Downloading Guidelines")
  }
  onAppGuidelinesToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'after',
      widget: 'dxButton',
      options: {
        text: 'Download Guidelines',
        type: 'danger', 
        icon: 'fa fa-download',
        onClick: this.onApplicationGuidelinesDownload.bind(this)
      }
    });
  }
}
