import { Component, OnInit } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { PublicService } from 'src/app/services/public/public.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

import CustomStore from 'devextreme/data/custom_store';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-gmp-complaint-facilities',
  templateUrl: './gmp-complaint-facilities.component.html',

  styleUrls: ['./gmp-complaint-facilities.component.css']
})
export class GmpComplaintFacilitiesComponent implements OnInit {
  //variable declarations and assignments 
  registeredGmpFrm:FormGroup;
  registeredGMPData:any ={};
  sectionsData:any;
  businessTypeData:any;
  businessTypeDetailsData:any;
  constructor(private spinner:SpinnerVisibilityService, private publicService:PublicService, private toastr:ToastrService, private config:ConfigurationsService,public httpClient: HttpClient) {
    
    this.onLoadRegisteredGMP();

   }

  
  title:string = "GMP Complaint Facilities";
  ngOnInit() {
    this.registeredGmpFrm = new FormGroup({
      registration_no: new FormControl('', Validators.compose([Validators.required])),
      manufacturer_name: new FormControl('', Validators.compose([])),
      registrant: new FormControl('', Validators.compose([])),
      section_id: new FormControl('', Validators.compose([])),
      
    });
    this.onLoadSections();
  }
  onLoadSections() {
    var data = {
      table_name: 'par_sections',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.sectionsData = data;
        });
  }
  
  onSearchRegisteredgmp(){
    this.onLoadRegisteredGMP();
   /* this.spinner.show();
    this.publicService.OnSearchRegistrationDataSets(this.registeredGmpFrm.value,'onSearchPublicGmpComplaints')
      .subscribe(
        data => {
          if (data.success) {
              this.registeredGMPData = data.data;
          } else {
            this.toastr.error(data.message, 'Alert');
          }
        });
        */
  }
  onLoadRegisteredGMP(){
    
    this.spinner.show();
    let me = this;
        var headers = new HttpHeaders({
          "Accept": "application/json"
        });
        this.registeredGMPData.store = new CustomStore({
          load: function (loadOptions: any) {
            let extra_params = me.registeredGmpFrm.value;
            let extra_paramsdata = JSON.stringify(extra_params);
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;
              params += '&extra_paramsdata=' + extra_paramsdata;
              return me.httpClient.get(AppSettings.base_url + 'publicaccess/onSearchPublicGmpComplaints'+ params)
                  .toPromise()
                  .then((data: any) => {
                      return {
                          data: data.data,
                          totalCount: data.totalCount
                      }
                  })
                  .catch(error => { throw 'Data Loading Error' });
          }
      });
        
  }
  onLoadRegisteredGMP12(){
   

        this.spinner.show();
        let me = this;
            var headers = new HttpHeaders({
              "Accept": "application/json"
            });
            this.registeredGMPData.store = new CustomStore({
              load: function (loadOptions: any) {
                let extra_params = me.registeredGmpFrm.value;
                let extra_paramsdata = JSON.stringify(extra_params);
                  var params = '?';
                  params += 'skip=' + loadOptions.skip;
                  params += '&take=' + loadOptions.take;
                  params += '&extra_paramsdata=' + extra_paramsdata;
                  return me.httpClient.get(AppSettings.base_url + 'publicaccess/onSearchPublicGmpComplaints'+ params)
                      .toPromise()
                      .then((data: any) => {
                          return {
                              data: data.data,
                              totalCount: data.totalCount
                          }
                      })
                      .catch(error => { throw 'Data Loading Error' });
              }
          });
            

  }
  onResetRegisteredGMP(){
    this.registeredGmpFrm.reset();
    this.onLoadRegisteredGMP()
  }

  onSectionsCboSelect($event) {
    this.onBusinessTypesLoad($event.value);
  }
  onBusinessTypeCboSelect($event) {
    this.onBusinessTypesDetailsLoad($event.value);
  }
  onBusinessTypesLoad(section_id) {

    var data = {
      table_name: 'par_business_types',
      section_id: section_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypeData = data;
        },
        error => {
          return false
        });
  }
  onBusinessTypesDetailsLoad(business_type_id) {

    var data = {
      table_name: 'par_business_types',
      business_type_id: business_type_id
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.businessTypeDetailsData = data;
        },
        error => {
          return false
        });
  }

  
}
