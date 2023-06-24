import { Component, OnInit } from '@angular/core';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';
import { SafePipe } from 'src/app/safe.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-manual',
  templateUrl: './user-manual.component.html',
  styleUrls: ['./user-manual.component.css']
})
export class UserManualComponent implements OnInit {
  printiframeUrl:string;
  printReportTitle:string;
  module_id:string;
  regulated_producttype_id:string;
  constructor(private configService: ConfigurationsService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.module_id = paramMap.get('module_id');
      this.regulated_producttype_id = paramMap.get('regulated_producttype_id');

  })
    this.module_id = this.route.snapshot.paramMap.get('module_id')
    this.regulated_producttype_id = this.route.snapshot.paramMap.get('regulated_producttype_id')
    
    let report_url = AppSettings.base_url+"public/system_manual/system_manual.html";
    
    this.printiframeUrl =  this.configService.returnReportIframeFill(report_url);
       
  }
 
}
