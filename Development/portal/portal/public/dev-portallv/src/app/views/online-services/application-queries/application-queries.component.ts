import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-application-queries',
  templateUrl: './application-queries.component.html',
  styleUrls: ['./application-queries.component.css']
})
export class ApplicationQueriesComponent implements OnInit {
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;

  
  applicationInitialQueriesData:any;
  isInitalQueryDataWinVisible:boolean = false;
  initqueryresponsefrm:FormGroup;
  businessTypesData: any;
  isInitalQueryFrmVisible:boolean = false;

  isInitalQueryResponseFrmVisible:boolean = false;
  premises_resp:any;
  constructor(public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService,  public router: Router, public formBuilder: FormBuilder, public toastr: ToastrService, public authService: AuthService,public utilityService:Utilities) { }

  ngOnInit() {
    this.initqueryresponsefrm = new FormGroup({
      queries_remarks: new FormControl(this.businessTypesData, Validators.compose([Validators.required])),
      response_txt: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([Validators.required]))
    });
    this.funcgetInitialQueriesData(this.application_code);

  }

  funcgetInitialQueriesData(application_code){
      
    this.utilityService.getApplicationPreQueriesDetails(application_code,'wb_product_applications', 'application_status_id','')
    .subscribe(
      data => {
        this.applicationInitialQueriesData = data.data;
        this.spinner.hide();
      });
}
onShowInitalQueriesWin(){

  this.isInitalQueryDataWinVisible = true;

}
onShowPrecheckingQueriesWin(){


} funcInitQueryResponse(data) {

  // this.premisesPersonnelDetailsfrm.patchValue({personnel_id:data.data.personnel_id,id:data.data.id,start_date:data.data.start_date,end_date:data.data.end_date, personnel_name:data.data.personnel_name})
  this.initqueryresponsefrm.patchValue(data.data);
  
  this.isInitalQueryResponseFrmVisible = true;

}
onSaveinitqueryresponse() {
  if (this.initqueryresponsefrm.invalid) {
    return;
  }
  //also get the premises ID onsaveApplicationCodeDetails(application_code, app_data, action_url)
  this.utilityService.onsaveApplicationCodeDetails(this.application_code, this.initqueryresponsefrm.value,'onSaveinitqueryresponse')
    .subscribe(
      response => {
        this.premises_resp = response.json();
        if (this.premises_resp.success) {
          this.toastr.success(this.premises_resp.message, 'Response');
          this.isInitalQueryResponseFrmVisible = false;
          this.funcgetInitialQueriesData(this.application_code)
        } else {
          this.toastr.error(this.premises_resp.message, 'Alert');
        }
      },
      error => {
        this.toastr.error('Error occurred!!', 'Alert');
      });
}
}
