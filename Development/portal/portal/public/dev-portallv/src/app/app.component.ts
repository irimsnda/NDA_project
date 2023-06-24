import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AppPage } from 'e2e/src/app.po';
import { QualityauditAppSelectionComponent } from './views/online-services/gmp-applications/quality-audit/qualityaudit-app-selection/qualityaudit-app-selection.component';
import { AppSettings } from './app-settings';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dev-portal';
  isLoggedIn = 0;
  message:string;
  success:boolean;
  isUserSessionExpired:boolean = false;
  isAdminUserSessionExpired:boolean = false;
  
  interval_checkenabled:any;
  signInFrm: FormGroup;
  adminSignInFrm:FormGroup;
  userDetails:any;
  trader_id:number;
  email_address:string;
  trader_no:number;
  timeoutInMiliseconds:number = AppSettings.session_timeoutcheck;
   timeoutId; 
   traderaccounts_status_id:number;

   isAdminLoggedIn:any;
   is_trader_accountupdate:boolean;
  constructor(private spinner: SpinnerVisibilityService,private authService:AuthService, private router: Router,public toastr: ToastrService,private formBuilder: FormBuilder){
    this.userDetails = this.authService.getUserDetails();
    if(this.userDetails){
      if(this.userDetails.trader_id){
            this.trader_id = this.userDetails.trader_id;
            this.trader_no = this.userDetails.trader_no;
          this.email_address = this.userDetails.email_address;
          this.traderaccounts_status_id = this.userDetails.traderaccounts_status_id;
          
         
      }
      this.isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');

    }
    
    this.signInFrm = this.formBuilder.group({
      trader_no: [this.trader_no, Validators.required],
      user_password: ['', Validators.required],
      email_address: [this.email_address, [Validators.required, Validators.email]],
     // recaptcha: ['', Validators.required]
    });
    this.adminSignInFrm = this.formBuilder.group({
      user_password: ['', Validators.required],
      email_address: [this.email_address, [Validators.required, Validators.email]],
     // recaptcha: ['', Validators.required]
    });
    
    
  }
  ngOnInit(){
    if(this.userDetails){
      this.funcInitializeInterval();
      this.setupTimers();
      //
    }
  
   this.funcOnInitialisation();
  }
  get f() { return this.signInFrm.controls; }
  get adminFrm() { return this.adminSignInFrm.controls; }
  funcOnInitialisation(){
    this.authService.onApplicationInitialisation();
  }
  funcInitializeInterval(){
    this.interval_checkenabled= setInterval(() => {
      this.checkUserActiveSession(); 
      }, 180000);

  }
  checkUserActiveSession(){

    if(this.userDetails){
      this.authService.onApplicationInitialisationCall()
      .subscribe(
        data=>{
            let response:any = <any>data;
            if(!response.success){
              this.funcExpiredUserSession();
                 clearInterval(this.interval_checkenabled);
                 this.signInFrm.patchValue({trader_no:this.trader_no, email_address:this.email_address})
            }
        },error => {

          this.funcExpiredUserSession();
          clearInterval(this.interval_checkenabled);
          this.signInFrm.patchValue({trader_no:this.trader_no, email_address:this.email_address})
        }
      );
    }
   
  }

  onSignIn() {
   
    const formData = new FormData();

    if (this.signInFrm.invalid) {
      return;
    }
    this.spinner.show();
    
    this.authService.login(this.f.trader_no.value, btoa(this.f.email_address.value), btoa(this.f.user_password.value))
      //.pipe(first())
      .subscribe(
          response => {
          let auth_response = response.json();
          this.message = auth_response.message;
          this.success = auth_response.success;
          if(this.success){
            localStorage.setItem('isLoggedIn', auth_response.isLoggedIn);
            localStorage.setItem('token', auth_response.access_token);
            localStorage.setItem('user',JSON.stringify(auth_response));
            this.toastr.info(this.message, 'Success!');
           
          this.isUserSessionExpired = false;
          this.funcInitializeInterval();

          }
          else{
           
             this.toastr.error(this.message, 'Alert!');
          }
          this.spinner.hide();
        });
    //this.router.navigate(['/online-services']);
  } onAdminSignIn() {
   
    const formData = new FormData();

    if (this.adminSignInFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.authService.onAdminlogin(this.adminFrm.email_address.value, this.adminFrm.user_password.value)
      //.pipe(first())
      .subscribe(
          response => {
          let auth_response = response.json();
          this.message = auth_response.message;
          this.success = auth_response.success;

          if(this.success){
            localStorage.setItem('isAdminLoggedIn', auth_response.isAdminLoggedIn);
            localStorage.setItem('token', auth_response.access_token);
            localStorage.setItem('user',JSON.stringify(auth_response));
            this.toastr.info(this.message, 'Success!');
           
            this.isUserSessionExpired = false;
            this.isAdminUserSessionExpired =false;
            this.funcInitializeInterval();

          }
          else{
           
             this.toastr.error(this.message, 'Alert!');
          }
          this.spinner.hide();
        });
    //this.router.navigate(['/online-services']);
  }
  funclogOut(){
   // this.funcExpiredUserSession();
    this.router.navigate(['/']);
    localStorage.removeItem("LoggedInUser");
    localStorage.clear();
    location.reload();
    clearInterval(this.interval_checkenabled);
  }

doInactive() {
  this.funcExpiredUserSession();
  if(this.isAdminLoggedIn){
    this.isAdminUserSessionExpired = true;
  }
  else{
    this.isUserSessionExpired = true;
  }
  console.log('Inazctive');
}
 
setupTimers () {
 
    document.addEventListener("mousemove", this.resetTimer, false);
    document.addEventListener("mousedown", this.resetTimer, false);
    document.addEventListener("keypress", this.resetTimer, false);
    document.addEventListener("touchmove", this.resetTimer, false);
    
    this.initialiseStartTimer();
}
resetTimer() { 
  
    window.clearTimeout(this.timeoutId);
    
    this.initialiseStartTimer;
    
}
initialiseStartTimer(){ 
  // window.setTimeout returns an Id that can be used to start and stop a timer
  
  //this.timeoutId = window.setTimeout(this.doInactive, this.timeoutInMiliseconds);
  this.timeoutId =  setTimeout(() => {
         this.funcExpiredUserSession();

        }, this.timeoutInMiliseconds);

}
funcExpiredUserSession(){
  if(this.isAdminLoggedIn){
    this.isAdminUserSessionExpired = true;
  }
  else{
    this.isUserSessionExpired = true;
  }
  
}
funcpopWidth(percentage_width) {
  return window.innerWidth * percentage_width/100;
}
}