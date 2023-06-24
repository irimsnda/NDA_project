import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import { PremisesApplicationsService } from 'src/app/services/premises-applications/premises-applications.service';
import { ToastrService } from 'ngx-toastr';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: 'app-archived-premises',
  templateUrl: './archived-premises.component.html',
  styleUrls: ['./archived-premises.component.css']
})
export class ArchivedPremisesComponent implements OnInit {
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dtPremisesApplicationData:any = [];
  constructor(public toastr: ToastrService,private configService: ConfigurationsService, private appService: PremisesApplicationsService) { }

  ngOnInit() {
    this.reloadPremisesApplications()
  }
  premActionColClick(e,data){
    var action_btn = e.itemData;

    console.log(action_btn)
    if(action_btn.action === 'edit'){
        
    }
    else if(action_btn.action == 'print'){

    }
    else if(action_btn.action == 'archive'){
      
    }
    
  }
  reloadPremisesApplications() {

    this.appService.onPremisesArchivedApplicationLoading()
      .subscribe(
        resp_data => {
          if (resp_data.success) {
            this.dtPremisesApplicationData =  resp_data.data;
            
          }
          else {
            this.toastr.error(resp_data.message, 'Alert!');

          }
        });
  }
}
