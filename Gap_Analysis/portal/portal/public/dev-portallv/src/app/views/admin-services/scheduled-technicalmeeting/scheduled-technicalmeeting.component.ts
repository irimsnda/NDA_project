import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';

@Component({
  selector: 'app-scheduled-technicalmeeting',
  templateUrl: './scheduled-technicalmeeting.component.html',
  styleUrls: ['./scheduled-technicalmeeting.component.css']
})
export class ScheduledTechnicalmeetingComponent implements OnInit {
  mis_external_user_id:number;
  filter_params:any;
  meetingInvitationsData:any;
  technical_meeting_invitations:number=10;
  constructor(public router:Router, private authService:AuthService, private utilityService:Utilities,public toastr: ToastrService,private spinner: SpinnerVisibilityService) { 

    let user = this.authService.getUserDetails();
    this.mis_external_user_id = user.mis_external_user_id;
  }

  ngOnInit() {
    this.onLoadMeetingInvitations();
  }
  onsToolbarPreparing(e) {
      e.toolbarOptions.items.unshift( {
          location: 'after',
          widget: 'dxButton',
          options: {
            icon: 'refresh',
            onClick: this.onLoadMeetingInvitations.bind(this)
          }
        });
  }onLoadMeetingInvitations() {
    this.spinner.show();
    this.filter_params = {mis_external_user_id:this.mis_external_user_id};

    this.utilityService.onLoadTraderApplicationProcessingData(this.filter_params, 'utilities/onLoadMeetingInvitations')
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.meetingInvitationsData =  resp_data.data;
          }
          else {

              this.toastr.error(resp_data.message, 'Alert!');

          }
          this.spinner.hide();
        });
  }
  singleApplicationActionColClick(){
        

  }
}
