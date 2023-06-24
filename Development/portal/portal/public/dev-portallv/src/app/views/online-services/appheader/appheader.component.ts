import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})

export class AppheaderComponent implements OnInit {
  trader_no:number;
  isLoggedIn:any;
  company_name:string;
  email_address:string;
  is_confirmedUser:number;
  changePasswordFrm:FormGroup;
  response:any;
  ischangePasswordModal: boolean=false;
  checkPasswordChangeOption: boolean=true;
  assets_url = AppSettings.assets_url;


  constructor(private cdr: ChangeDetectorRef,private toastr:ToastrService, private spinner: SpinnerVisibilityService,private authService:AuthService,public modalService: NgxSmartModalService,) { }
  
  ngOnInit() {
    //the modal form
    this.changePasswordFrm = new FormGroup({
      current_password: new FormControl('', Validators.compose([Validators.required])),
      new_password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),
    });

    if(localStorage.length >0){
      this.isLoggedIn = localStorage.getItem('isLoggedIn');
      let userDetails = JSON.parse(localStorage.getItem('user'));
      this.trader_no = userDetails.trader_no;
      this.company_name = userDetails.company_name;
      this.email_address = userDetails.email_address;
      this.is_confirmedUser = userDetails.is_confirmed;
      
    }
    
  }
  
  ngAfterViewInit(){
    //check if the passwrd needs to be changed 
    if(this.is_confirmedUser < 1){
        this.ischangePasswordModal = true;
        this.checkPasswordChangeOption = false;

    }this.cdr.detectChanges();
  }
  onFuncChangePassword(){
    if (this.changePasswordFrm.invalid) {
      return;
    }
    let new_password = this.changePasswordFrm.get('new_password').value;
    let confirm_password = this.changePasswordFrm.get('confirm_password').value;
    //password conplexity
    if(!this.authService.pass_complexcheck(new_password)){
      this.toastr.error("Password doesn't conform the set guidelines", 'Alert');
      this.changePasswordFrm.get('new_password').setValue('');
      this.changePasswordFrm.get('confirm_password').setValue('');
      return;
    }
    if(new_password != confirm_password){
      this.toastr.error("Password Mistmatch", 'Alert');
      this.changePasswordFrm.get('confirm_password').setValue('');
      return;
    }
    this.spinner.show();
    this.authService.onFuncChangePassword(this.changePasswordFrm.value)
      .subscribe(
        data => {
          this.response = data.json();
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Response');
            this.ischangePasswordModal = false;
            let userDetailsData = JSON.parse(localStorage.getItem('user'));

            userDetailsData.is_confirmed = 1;

            localStorage.setItem('user', JSON.stringify(userDetailsData));


          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
            
        });
    return false;
  }
  funclogOut(){
    
    this.authService.logout();
  }
  funcChangePasswordModal(){
      this.ischangePasswordModal = true; 
  }
 
}
