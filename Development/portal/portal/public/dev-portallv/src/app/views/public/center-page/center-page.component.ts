import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-center-page',
  templateUrl: './center-page.component.html',
  styleUrls: ['./center-page.component.css']
})
export class CenterPageComponent implements OnInit {
  assets_url:string = AppSettings.assets_url;
  constructor() { }

  ngOnInit() {
    
  }

}
