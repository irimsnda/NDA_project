import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AccountManagementService } from 'src/app/services/account_management/account-management.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-appsynchronisation-request',
  templateUrl: './appsynchronisation-request.component.html',
  styleUrls: ['./appsynchronisation-request.component.css']
})
export class AppsynchronisationRequestComponent implements OnInit {

  applicationInformationFrm:FormGroup;
  applicationTypesData:any;
  application_modalVisible:boolean=false;
  loading:boolean;
  account_resp:any;
  traderApplicationInformationDta:any;
  mistrader_id:number;
  constructor(private spinner: SpinnerVisibilityService,   public toastr: ToastrService,private router: Router, private formBuilder: FormBuilder, private accountManagementService: AccountManagementService, private config:ConfigurationsService,public authService:AuthService) { 
    let user = this.authService.getUserDetails();
    this.mistrader_id = user.mistrader_id;
    this.applicationInformationFrm = new FormGroup({
      module_id: new FormControl('', Validators.compose([Validators.required])),
      registration_no: new FormControl('', Validators.compose([])),
      reference_no: new FormControl('', Validators.compose([])),
      year_of_registration: new FormControl('', Validators.compose([])),
      remarks: new FormControl('', Validators.compose([])),
      
    });

  }

  ngOnInit() {
    this.onLoadtraderApplicationInformationDta();

    this.onLoadapplicationTypesData();

  }onLoadapplicationTypesData(){
    var data = {
      table_name: 'modules'
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypesData = data;
        },
        error => {
          return false;
        });

  } funcAddApplicationInformation(){
     
    this.application_modalVisible = true;
}
  functDataGridToolbar(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Refresh Applications',
        type: 'default',
        icon: 'fa fa-refresh',
        onClick:  this.onLoadtraderApplicationInformationDta.bind(this)

      }
    },{
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Application Information',
        type: 'default',
        icon: 'fa fa-plus',
        onClick:  this.funcAddApplicationInformation.bind(this)

      }
    });
  }
 
onSaveTradersApplicationInformation() {

  if (this.applicationInformationFrm.invalid){
    return;

  }
  
  this.loading = true;

  this.accountManagementService.onSaveTradersApplicationInformation(this.applicationInformationFrm.value,this.mistrader_id)
    //.pipe(first())
    .subscribe(
      response => {

          this.account_resp = response.json();
          //the details 
          if(this.account_resp.success){
           
           this.toastr.success(this.account_resp.message, 'Response');
           this.application_modalVisible = false;
           //reload the data
           this.onLoadtraderApplicationInformationDta()
          }else{
            this.toastr.error(this.account_resp.message, 'Alert');
          }
      },
      error => {
        this.loading = false;
      });
}
onLoadtraderApplicationInformationDta(){

  this.loading = true;

  this.accountManagementService.onLoadtraderApplicationInformation(this.mistrader_id)
    //.pipe(first())
    .subscribe(
      response => {

          this.account_resp = response;
          //the details 
          if(this.account_resp.success){
            this.traderApplicationInformationDta = this.account_resp.data;
           //reload the data
          }else{
            this.toastr.error(this.account_resp.message, 'Alert');
          }
      },
      error => {
        this.loading = false;
      });

}
}
