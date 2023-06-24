import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  
  constructor(private configService:ConfigurationsService,private router:Router, private toastr:ToastrService, private spinner: SpinnerVisibilityService,private authService:AuthService,) { }
  forgotPasswordFrm: FormGroup;
  response:any;
  app_route:any;
  servicesDataset:any;
  ngOnInit() {
    this.forgotPasswordFrm = new FormGroup({
      email_address: new FormControl('', Validators.compose([Validators.required])),
      identification_no:new FormControl('', Validators.compose([Validators.required]))
    });
    this.onLoadServicesDataset();
  }onFuncRecoverPasswordRequest(){
    if (this.forgotPasswordFrm.invalid) {
      return;
    }
    this.spinner.show();
    this.authService.onFuncRecoverPasswordRequest(this.forgotPasswordFrm.value)
      .subscribe(
        data => {
          this.response = data.json();;
         
          if (this.response.success) {
            this.toastr.success(this.response.message, 'Response');
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
  onLoadServicesDataset(){
    this.configService.onLoadServicesDataset('')
   .subscribe(
     data => {
      this.servicesDataset = data;
       

     },
     error => {
       console.log('No Results');
     });
}
}
