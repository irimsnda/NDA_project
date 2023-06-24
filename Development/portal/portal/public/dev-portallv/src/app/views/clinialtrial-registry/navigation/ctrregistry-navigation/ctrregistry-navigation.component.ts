import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-ctrregistry-navigation',
  templateUrl: './ctrregistry-navigation.component.html',
  styleUrls: ['./ctrregistry-navigation.component.css']
})
export class CtrregistryNavigationComponent  implements OnInit, AfterViewInit  {
  navigation_type_id:number;
  trader_no:number;
  navOnlineNav:any;
  assets_url:string = AppSettings.assets_url;
  constructor(private configService:ConfigurationsService ) { }

  ngOnInit() {
    this.navigation_type_id =4;
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
