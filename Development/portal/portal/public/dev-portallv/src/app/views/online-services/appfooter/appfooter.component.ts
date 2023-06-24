import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-appfooter',
  templateUrl: './appfooter.component.html',
  styleUrls: ['./appfooter.component.css']
})
export class AppfooterComponent implements OnInit {

  system_title:string= AppSettings.system_title;
  system_website:string= AppSettings.system_website;
  system_version:string= AppSettings.system_version;

  
  constructor() { }

  ngOnInit() {
  }

}
