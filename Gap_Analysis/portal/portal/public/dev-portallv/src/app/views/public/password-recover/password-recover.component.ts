import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.css']
})
export class PasswordRecoverComponent implements OnInit {
  resetPasswordFrm:FormGroup;
  response:any;
  app_route:any;
  constructor(private router:Router, private authService:AuthService, private spinner:SpinnerVisibilityService, private toastr:ToastrService) { }

  ngOnInit() {
    this.resetPasswordFrm = new FormGroup({
      new_password: new FormControl('', Validators.compose([Validators.required])),
      confirm_password: new FormControl('', Validators.compose([Validators.required])),
      guid: new FormControl('', Validators.compose([Validators.required])),
      
    });

  }
  onFuncResetPassword(){
    if (this.resetPasswordFrm.invalid) {
      return;
    }
    let new_password = this.resetPasswordFrm.get('new_password').value;
    let confirm_password = this.resetPasswordFrm.get('confirm_password').value;
    //password conplexity
    if(!this.authService.pass_complexcheck(new_password)){
      this.toastr.error("Password doesn't conform the set guidelines", 'Alert');
      this.resetPasswordFrm.get('new_password').setValue('');
      this.resetPasswordFrm.get('confirm_password').setValue('');
      return;
    }
    if(new_password != confirm_password){
      this.toastr.error("Password Mistmatch", 'Alert');
      this.resetPasswordFrm.get('confirm_password').setValue('');
      return;
    }
    this.spinner.show();
    this.authService.onFuncChangePassword(this.resetPasswordFrm.value)
      .subscribe(
        data => {
          this.response = data;
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Response');
            //reload to login
            this.app_route = ['./'];

            this.router.navigate(this.app_route);
            
          } else {
            this.toastr.error(this.response.message, 'Alert');
          }
          this.spinner.hide();
        },
        error => {
            
        });
    return false;
  }

}
