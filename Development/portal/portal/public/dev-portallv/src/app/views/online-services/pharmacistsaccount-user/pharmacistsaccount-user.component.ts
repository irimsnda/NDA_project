import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from 'src/app/services/account_management/account-management.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader'

@Component({
  selector: 'app-pharmacistsaccount-user',
  templateUrl: './pharmacistsaccount-user.component.html',
  styleUrls: ['./pharmacistsaccount-user.component.css']
})
export class PharmacistsaccountUserComponent implements OnInit {
 dtaTraderaccountUsers:any={};
  traderUsersAccountFrm:FormGroup;
  password:string;
  confirm_password:string;
  account_resp:any;
  addTraderUsersAccountFrmWin:boolean = false;
  message:string;
  constructor(public appService:AccountManagementService,public toastr: ToastrService,public spinner: SpinnerVisibilityService) { 
    this.traderUsersAccountFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),
      id: new FormControl('', Validators.compose([]))
    });
  }

  ngOnInit() {
    this.onLoadTraderAccountUsers();
  }
  onTradersToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add User',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcAddTraderAccountUser.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  funcAddTraderAccountUser(){
    this.traderUsersAccountFrm.reset();
    this.addTraderUsersAccountFrmWin = true;
  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  refreshDataGrid() {
    this.onLoadTraderAccountUsers();
  }
  onLoadTraderAccountUsers() {

    this.appService.onLoadTraderAccountUsers()
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtaTraderaccountUsers =  resp_data.data;
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');
          }
        });
  }
  onSavetraderUsersAccountDetails(){
    
    if (this.traderUsersAccountFrm.invalid) {
      return;
    }
    this.password = this.traderUsersAccountFrm.controls['password'].value;
    this.confirm_password = this.traderUsersAccountFrm.controls['confirm_password'].value;
    
    if(this.password != this.confirm_password){
      this.toastr.error('Pasword MisMatch', 'Alert');
      return;
    }
    
    this.appService.onCreateUserAccount(this.traderUsersAccountFrm.value,'onAccountUsersRegistration')
      //.pipe(first())
      .subscribe(
        response => {
            this.account_resp = response.json();
            //the details 
            if(this.account_resp.success){
              this.onLoadTraderAccountUsers() 
              this.toastr.success(this.message, 'Response');
              this.addTraderUsersAccountFrmWin = false;
            }else{
              this.message = this.account_resp.message;
              this.toastr.error(this.message, 'Alert');
            }
            this.spinner.hide();
        },
        error => {
          
        });
  }
  funcUpdateTraderUserAccountDetails(data){
    
    this.addTraderUsersAccountFrmWin = true;
    this.traderUsersAccountFrm.patchValue(data.data);
    this.traderUsersAccountFrm.controls['password'].setValue('');
    this.traderUsersAccountFrm.controls['confirm_password'].setValue('');
    
  }
}

