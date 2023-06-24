import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-adminfooter',
  templateUrl: './adminfooter.component.html',
  styleUrls: ['./adminfooter.component.css']
})
export class AdminfooterComponent implements OnInit {

  system_title:string= AppSettings.system_title;
  system_website:string= AppSettings.system_website;
  system_version:string= AppSettings.system_version;

  
  constructor() { }

  ngOnInit() {
  }

}
