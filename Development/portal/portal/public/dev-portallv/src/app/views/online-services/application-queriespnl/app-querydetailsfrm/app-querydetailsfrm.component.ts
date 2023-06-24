import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-app-querydetailsfrm',
  templateUrl: './app-querydetailsfrm.component.html',
  styleUrls: ['./app-querydetailsfrm.component.css']
})
export class AppQuerydetailsfrmComponent implements OnInit {

  @Input() initqueryresponsefrm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
