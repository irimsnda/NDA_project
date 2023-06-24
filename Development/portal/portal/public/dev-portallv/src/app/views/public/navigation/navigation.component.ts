import { Component, OnInit } from '@angular/core';
import { NavigationItems } from './../../../models/sharedpublicmdl.model';
import { ConfigurationsService } from '../../../services/shared/configurations.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  navItems:NavigationItems;
  navResults:any;
  navigation_type_id: number;
  
  constructor(private configService:ConfigurationsService) { }

  ngOnInit() {
    this.navigation_type_id =1;
    this.onLoadNavigation(this.navigation_type_id);
   
  }
  //call a function to load menus
  onLoadNavigation(nav_type:number){
       this.configService.onLoadNavigation(nav_type)
      .subscribe(
        navItems => {
           this.navResults = navItems;
        },
        error => {
          console.log('No Results');
        });
  }

}
