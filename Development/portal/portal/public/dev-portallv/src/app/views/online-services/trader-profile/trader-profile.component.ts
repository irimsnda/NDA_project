import { Component, OnInit } from '@angular/core';
import { ApplicantSharedclassComponent } from './applicant-sharedclass/applicant-sharedclass.component';

@Component({
  selector: 'app-trader-profile',
  templateUrl: './trader-profile.component.html',
  styleUrls: ['./trader-profile.component.css']
})
export class TraderProfileComponent extends ApplicantSharedclassComponent implements OnInit  {
 
  ngOnInit() {

  }
}
