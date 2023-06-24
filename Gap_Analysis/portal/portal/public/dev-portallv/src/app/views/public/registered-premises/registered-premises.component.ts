import { Component, OnInit, Inject } from '@angular/core';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { PublicService } from 'src/app/services/public/public.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { HttpClient,  HttpParams, HttpHeaders } from "@angular/common/http";
import DataSource from "devextreme/data/data_source";
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { AppSettings } from 'src/app/app-settings';
import DataGrid from "devextreme/ui/data_grid";
import CustomStore from 'devextreme/data/custom_store';
@Component({
  selector: 'app-registered-premises',
  templateUrl: './registered-premises.component.html',
  styleUrls: ['./registered-premises.component.css']
})
export class RegisteredPremisesComponent implements OnInit {

  constructor(public httpClient: HttpClient,private authService:AuthService, private spinner:SpinnerVisibilityService, private publicService:PublicService, private toastr:ToastrService, private config:ConfigurationsService) { 

    this.registeredPremisessFrm = new FormGroup({
      registration_no: new FormControl('', Validators.compose([])),
      premises_name: new FormControl('', Validators.compose([])),
      business_type_id: new FormControl('', Validators.compose([])),
      business_typedetails_id: new FormControl('', Validators.compose([])),
      registrant: new FormControl('', Validators.compose([])),
      section_id: new FormControl(this.section_id, Validators.compose([])),
      
    });
    this.onLoadSections();
  
  }
  dataGridInstance: DataGrid;
  registeredPremisessFrm:FormGroup;
  section_id:number;
  registeredPremisesData:any = {};
  sectionsData:any;
  businessTypeData:any;
  businessTypeDetailsData:any;
  title:string = "Registered Premises";
  configData:any;
  headers = new HttpHeaders({
    "Accept": "application/json"
  });
  ngOnInit() {
   
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
  saveGridInstance (e) {
      this.dataGridInstance = e.component;
   
  }
  onSearchRegisteredpremises(){

    //this.onLoadRegisteredPremises();
    this.dataGridInstance.refresh();

  }
  onLoadRegisteredPremises(){
    
    this.spinner.show();
    let me = this;
        var headers = new HttpHeaders({
          "Accept": "application/json"
        });
        this.registeredPremisesData.store = new CustomStore({
          load: function (loadOptions: any) {
            let extra_params = me.registeredPremisessFrm.value;
            let extra_paramsdata = JSON.stringify(extra_params);
              var params = '?';
              params += 'skip=' + loadOptions.skip;
              params += '&take=' + loadOptions.take;
              params += '&extra_paramsdata=' + extra_paramsdata;
              return me.httpClient.get(AppSettings.base_url + 'publicaccess/onSearchPublicRegisteredpremises'+ params)
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
  onResetRegisteredpremises(){
    this.registeredPremisessFrm.reset();
    this.onSearchRegisteredpremises();
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
