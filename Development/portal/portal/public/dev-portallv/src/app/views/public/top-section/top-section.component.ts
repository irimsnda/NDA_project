import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from '../../../services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-top-section',
  templateUrl: './top-section.component.html',
  styleUrls: ['./top-section.component.css']
})
export class TopSectionComponent implements OnInit {
  contact_details:any;
  constructor(private config:ConfigurationsService) { }
  
  assets_url:string = AppSettings.assets_url;
  system_title:string = AppSettings.system_title;

  ngOnInit() {
    this.funcGetContactdetails();
  }
  funcGetContactdetails(){
    this.config.onLoadContactdetails()
    .subscribe(
      data => {
        if (data.success) {
          this.contact_details = data.data;
        }
        
      });

  }
}
