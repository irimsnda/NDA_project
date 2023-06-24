import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Http } from '@angular/http';
import { AppSettings } from 'src/app/app-settings';
import { map } from 'rxjs/operators';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-cutomer-complains',
  templateUrl: './cutomer-complains.component.html',
  styleUrls: ['./cutomer-complains.component.css']
})
export class CutomerComplainsComponent implements OnInit {
  customercomplainsfrm:FormGroup;
  countriesData:any;
  constructor(private config: ConfigurationsService,private http: Http) { }

  ngOnInit() {
    this.customercomplainsfrm = new FormGroup({
      fullname: new FormControl('', Validators.compose([Validators.required])),
      company: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required,Validators.email])),
      phone: new FormControl('', Validators.compose([Validators.required])),
      country: new FormControl('', Validators.compose([Validators.required])),
      physical_address: new FormControl('', Validators.compose([Validators.required])),
      complaintTitle: new FormControl('', Validators.compose([Validators.required])),
      complaintDescription: new FormControl('', Validators.compose([Validators.required])),
      complaintDescriptionFile: new FormControl('', Validators.compose([Validators.required])),
    });
this.onLoadcountriesData() ;
  }
  onLoadcountriesData() {
    var data = {
      table_name: 'par_countries',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.countriesData = data;
        });
  }
  onSubmitCustomerComplaints(){
    if (this.customercomplainsfrm.invalid) {
    return;
  }
  let formdata = this.customercomplainsfrm.value;
    this.onsaveData(formdata)
    .subscribe(
      data => {
       alert();
    });

  }
  onsaveData(data){
    
    var headers = new Headers({
      "Accept": "application/json"
    });
    return this.http.post(AppSettings.base_url + 'authentication/onUserLogin',data,
    )
     .pipe(map(user => {
        return user;
      }));
    /*
    this.appService.onSaveCustomerComplaints(this.customercomplainsfrm.value)
    .subscribe(
      response => {

      },
      error => {
       alert("Error occurred")
      });
      */

  }
}
