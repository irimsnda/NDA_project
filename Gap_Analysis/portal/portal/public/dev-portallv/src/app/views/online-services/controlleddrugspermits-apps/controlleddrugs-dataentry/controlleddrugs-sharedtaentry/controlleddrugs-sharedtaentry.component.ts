import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { AuthService } from 'src/app/services/auth.service';
import { Utilities } from 'src/app/services/common/utilities.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ImportexportService } from 'src/app/services/importexp-applications/importexport.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
@Component({
  selector: 'app-controlleddrugs-sharedtaentry',
  templateUrl: './controlleddrugs-sharedtaentry.component.html',
  styleUrls: ['./controlleddrugs-sharedtaentry.component.css']
})
export class ControlleddrugsSharedtaentryComponent implements OnInit {
  trader_id:number;
  mistrader_id:number;
  registeredProductsData:any;
  isRegisteredproductsPopupVisible:boolean=false;
  dosageFormsData:any;
  constructor(public utilityService:Utilities, public premappService: PremisesApplicationsService, public dmsService: DocumentManagementService, public fb: FormBuilder, public modalServ: ModalDialogService, public viewRef: ViewContainerRef, public spinner: SpinnerVisibilityService, public configService: ConfigurationsService, public appService: ImportexportService, public router: Router, public formBuilder: FormBuilder, public config: ConfigurationsService, public modalService: NgxSmartModalService, public toastr: ToastrService, public authService: AuthService,public httpClient: HttpClient) {
    let user = this.authService.getUserDetails();
    this.onLoaddosageForms();
    this.trader_id = user.trader_id;
    this.mistrader_id = user.mistrader_id;
  }
  ngOnInit() {
   
  }

  OnReloadPermitProducts(){

    let me = this;
            this.registeredProductsData.store = new CustomStore({
              load: function (loadOptions: any) {

                  var params = '?';
                  params += 'skip=' + loadOptions.skip;
                  params += '&take=' + loadOptions.take;//searchValue
                  var headers = new HttpHeaders({
                    "Accept": "application/json",
                    "Authorization": "Bearer " + me.authService.getAccessToken(),
                  });
                  
                  this.configData = {
                    headers: headers,
                    params: { skip: loadOptions.skip,take:loadOptions.take, searchValue:loadOptions.filter, table_name: 'registered_products',  trader_id:me.trader_id, mistrader_id:me.mistrader_id}
                  };
                  return me.httpClient.get(AppSettings.base_url + 'importexportapp/getRegisteredProducts',this.configData)
                            .toPromise()
                            .then((data: any) => {
                                return {
                                    data: data.data,
                                    totalCount: data.totalCount
                                }
                            })
                            .catch(error => {
                               throw 'Data Loading Error' 
                            });
              }
          });
      }
      onSearchRegisteredProducts(){
        this.OnReloadPermitProducts();
        this.isRegisteredproductsPopupVisible = true;
      }
      onLoaddosageForms() {
        var data = {
          table_name: 'par_dosage_forms'
        };
        this.config.onLoadConfigurationData(data)
          .subscribe(
            data => {
             // this.dosageFormsData = data;
              this.dosageFormsData = new DataSource({
                paginate: true,
                pageSize: 200,
                store: {
                  type: "array",
                    data: data,
                    key: "id"
                }
            });
            });
      }
}
