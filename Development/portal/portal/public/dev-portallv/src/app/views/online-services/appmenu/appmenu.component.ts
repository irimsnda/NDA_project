import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConfigurationsService } from '../../../services/shared/configurations.service';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit, AfterViewInit  {
  navigation_type_id:number;
  trader_no:number;
  navOnlineNav:any;
  assets_url:string = AppSettings.assets_url;
  constructor(private configService:ConfigurationsService ) { }

  ngOnInit() {
    this.navigation_type_id =2;
    this.trader_no = 2015;
    this.onLoadNavigation(this.navigation_type_id);

  }
  ngAfterViewInit(){
   
  }
  loadScripts(){
      let body = <HTMLDivElement> document.body;
      let script = document.createElement('script');
      script.innerHTML = '';
      script.src = this.assets_url+'js/pikeadmin.js',
      script.async = true;
      script.defer = true;
      body.appendChild(script);
  }
  onLoadNavigation(nav_type:number){
    this.configService.onLoadNavigation(nav_type)
   .subscribe(
     navItems => {
        this.navOnlineNav = navItems;
        //$.getScript('');
        this.loadScripts();
     },
     error => {
       console.log('No Results');
     });
}
}
