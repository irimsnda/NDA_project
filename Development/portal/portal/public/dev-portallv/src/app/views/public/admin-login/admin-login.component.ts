import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AccountManagementService } from 'src/app/services/account_management/account-management.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  onAdminAccessFrm: FormGroup;
  isReadOnly:boolean = true;
  email_address:string;
  account_resp:any;
  loading:boolean;
  message:string;
  success:boolean;
  isAdminLoggedIn:boolean;
  isLoggedIn:string;
  constructor(private spinner: SpinnerVisibilityService, private accountManagementService: AccountManagementService,public toastr: ToastrService,private authService: AuthService,private router: Router) { 
    //if the isAdminLogg
    if(localStorage.length >0){
      this.isLoggedIn = localStorage.getItem('isAdminLoggedIn');
      if(this.isLoggedIn){
          this.router.navigate(["/online-admin"]);
      }
      
    }
    this.onAdminAccessFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required,Validators.email])),  
      user_password: new FormControl('', Validators.compose([Validators.required]))
    });
  }

  ngOnInit() {
  }
 
  handleSuccess($event){

  } get f() { return this.onAdminAccessFrm.controls; }
  onAdminAccessLoginKeyPress($event){
    if (this.onAdminAccessFrm.invalid) {
      return;
    }
    this.loading = true;
    this.spinner.show();
   
    this.authService.onAdminlogin(btoa(this.f.email_address.value), btoa(this.f.user_password.value))
      //.pipe(first())
      .subscribe(
          response => {
          let auth_response = response.json();
          this.message = auth_response.message;
          this.success = auth_response.success;
          if(this.success){

            if(auth_response.access_token != '' && auth_response.isAdminLoggedIn){
              localStorage.setItem('isAdminLoggedIn', auth_response.isAdminLoggedIn);
              localStorage.setItem('mis_external_user_id', auth_response.mis_external_user_id);
              
              localStorage.setItem('token', auth_response.access_token);
              localStorage.setItem('user',JSON.stringify(auth_response));
              this.toastr.info(this.message, 'Success!');
              this.isAdminLoggedIn = auth_response.isAdminLoggedIn;
              this.router.navigate(['/online-admin']);


            }
            else{

              this.toastr.error('In Valid User Login and System Access, kindly relogin with the correct credentails to proceed or Contact the system Admin', 'Alert!');

            }
            
           // location.reload();
           this.spinner.hide();
          }
          else{
           
             this.toastr.error(this.message, 'Alert!');
          }
          this.spinner.hide();
        });
  }
  onValidateAdminAccess($event){
    this.email_address = this.f.email_address.value;

    if(this.email_address == ''){
      return;
    }
    this.spinner.show();
    
    this.accountManagementService.onValidateAccountEmail(this.email_address,'onValidateAdminAccess')
        //.pipe(first())
        .subscribe(
          response => {
              this.account_resp = response;
              //the details 
              if(this.account_resp.success){
                this.toastr.info(this.account_resp.message, 'Response');
                 this.isReadOnly = false;
              }else{
                this.toastr.error(this.account_resp.message, 'Alert');
                this.isReadOnly = true;
              }
             this.spinner.hide();
          },
          error => {
            this.loading = false;
            this.spinner.hide();
          });
}
}
