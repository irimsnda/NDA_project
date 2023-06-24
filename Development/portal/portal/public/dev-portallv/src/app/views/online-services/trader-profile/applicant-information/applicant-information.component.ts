import { Component, OnInit } from '@angular/core';
import { ApplicantSharedclassComponent } from '../applicant-sharedclass/applicant-sharedclass.component';

@Component({
  selector: 'app-applicant-information',
  templateUrl: './applicant-information.component.html',
  styleUrls: ['./applicant-information.component.css']
})
export class ApplicantInformationComponent extends ApplicantSharedclassComponent implements OnInit {


  ngOnInit() {
  }

}
