import { Component, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';

@Component({
  selector: 'app-drugshop-nearestlocation',
  templateUrl: './drugshop-nearestlocation.component.html',
  styleUrls: ['./drugshop-nearestlocation.component.css']
})
export class DrugshopNearestlocationComponent implements OnInit {
  @Input() countries: any;
  @Input() regions: any;
  @Input() districts: any;
  @Input() is_readonly: boolean;
  @Input() premisesStoreslocationFrm: FormGroup;
  country_id:number;
  sectorsData:any;
  cellsData:any;
  filesToUpload: Array<File> = [];  
  region_id:number;
  district_id:number;
  sector_id:number;
  
  @Input() premise_id: number;
  premisesStoreLocationDetailsData:any;
  isStoreLocationPopupVisible:boolean=false;
  premises_resp:any;
  loading:any;
  constructor(public config: ConfigurationsService,public modalServ: ModalDialogService,public viewRef: ViewContainerRef,public appService: PremisesApplicationsService,public toastr: ToastrService) { }

  ngOnInit() {
    this.onLoadPremisesStoreLocationDetails();

  }
  onLoadPremisesStoreLocationDetails(){
    this.appService.onLoadPremisesStoreLocationDetails(this.premise_id)
      //.pipe(first())
      .subscribe(
        data => {//dtpremPersonnelDetailsData
          this.premisesStoreLocationDetailsData = data;
        },
        error => {
          return false
        });
  } 
   onFileChange(event) {

    if (event.target.files.length > 0) {
      let file = event.target.files[0];

      this.premisesStoreslocationFrm.get('file').setValue(file);
    }
  }
onCoutryCboSelect($event) {

    this.country_id = $event.selectedItem.id;

    this.onLoadRegions(this.country_id);

  }
  onLoadRegions(country_id) {

    var data = {
      table_name: 'par_regions',
      country_id: country_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.regions = data;
        },
        error => {
          return false
        });
  }
  
  onLoadDistricts(region_id) {
    var data = {
      table_name: 'par_districts',
      region_id: region_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.districts = data
        },
        error => {
          return false;
        });
  }
  onLoadSectors(district_id) {
    var data = {
      table_name: 'par_sectors',
      district_id: district_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.sectorsData = data
        },
        error => {
          return false;
        });
  }
  onLoadCells(sector_id) {
    var data = {
      table_name: 'par_cells',
      sector_id: sector_id
    };
    this.config.onLoadConfigurationData(data)
      //.pipe(first())
      .subscribe(
        data => {
          this.cellsData = data
        },
        error => {
          return false;
        });
  }
  
  onRegionsCboSelect($event) {
    this.region_id = $event.selectedItem.id;

    this.onLoadDistricts(this.region_id);

  }
  
  oDistrictsCboSelect($event) {
    this.district_id = $event.selectedItem.id;

    this.onLoadSectors(this.district_id);

  }
  oSectorsCboSelect($event) {
    this.sector_id = $event.selectedItem.id;

    this.onLoadCells(this.sector_id);

  }
  funcEditLocationDetails(data) {

    this.premisesStoreslocationFrm.patchValue(data.data);

    this.isStoreLocationPopupVisible = true;
   
  }
  funcDeleteLocationDetails(data) {
    //func_delete records 
    let record_id = data.data.id;
    let apppremises_id = data.data.premise_id;
    let table_name = 'wb_premises_storelocation';
    this.funcDeleteDetailhelper(record_id, apppremises_id, table_name, 'busines_personnel', 'Premises Store Location');

  }
  funcDeleteDetailhelper(record_id, apppremises_id, table_name, reload_type, title) {
    this.modalServ.openDialog(this.viewRef, {
      title: 'Are You sure You want to delete ' + title + '?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [
        {
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {
            this.appService.onDeletePremisesDetails(record_id, table_name, apppremises_id, 'Premises Other Details')
              //.pipe(first())
              .subscribe(
                data_response => {
                  let resp = data_response.json();

                  if (resp.success) {
                    
                      this.onLoadPremisesStoreLocationDetails();

                    this.toastr.success(resp.message, 'Response');
                  }
                  else {
                    this.toastr.error(resp.message, 'Alert');
                  }
                },
                error => {
                  return false
                });
            resolve();
          })
        },
        {
          text: 'no',
          buttonClass: 'btn btn-default',
          onAction: () => new Promise((resolve: any) => {

            resolve();

          })
        }
      ]
    });
  }

  onPremisesStoreLocationToolbar(e,is_readonly) {

    this.functDataGridToolbar(e, this.funAddPremisesStreLocationDetails, 'Premises Nearest Location',is_readonly);

  }
 funAddPremisesStreLocationDetails() {
  
    this.premisesStoreslocationFrm.reset();

    this.isStoreLocationPopupVisible = true;

  }
  functDataGridToolbar(e, funcBtn, btn_title,is_readonly= false) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: btn_title,
        type: 'default',
        disabled: is_readonly,
        icon: 'fa fa-plus',
        onClick: funcBtn.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
         // onClick: this.refreshDataGrid.bind(this)
        }
      });
  } 
  //
  onSavePremisesStoreLocationDetails() {
    if (this.premisesStoreslocationFrm.invalid) {
      return;
    }
    //also get the premises ID
    this.appService.onSavePremisesStoreLocationDetails(this.premisesStoreslocationFrm.value, this.premise_id)
      .subscribe(
        response => {
          this.premises_resp = response.json();
          if (this.premises_resp.success) {
            this.toastr.success(this.premises_resp.message, 'Response');
            this.isStoreLocationPopupVisible = false;
            this.onLoadPremisesStoreLocationDetails();
          } else {
            this.toastr.error(this.premises_resp.message, 'Alert');
          }
        },
        error => {
          this.loading = false;
        });
  }funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
}

