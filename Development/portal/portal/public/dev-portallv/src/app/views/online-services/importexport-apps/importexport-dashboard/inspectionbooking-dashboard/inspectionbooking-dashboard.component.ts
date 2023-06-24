import { Component, OnInit } from '@angular/core';
import { ImportexportDashboardComponent } from '../importexport-dashboard.component';

@Component({
  selector: 'app-inspectionbooking-dashboard',
  templateUrl: './inspectionbooking-dashboard.component.html',
  styleUrls: ['./inspectionbooking-dashboard.component.css']
})
export class InspectionbookingDashboardComponent extends ImportexportDashboardComponent implements OnInit  {

  
  ngOnInit() {
    this.sub_module_id = '49';
    this.reloadPermitApplicationsApplications({'sub_module_id':this.sub_module_id});
    this.onLoadProductAppType(this.sub_module_id);
    this. onLoadApplicationCounterDetails(this.sub_module_id);
    this.FilterDetailsFrm.get('sub_module_id').setValue(this.sub_module_id);
    this.application_title = 'Import License Dashboard';  


    
  }
  onImportappsToolbarPreparing(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Help & Guidelines',
        type: 'normal', stylingMode: 'outlined',
        icon: 'fa fa-question-circle',
        width:150,
        onClick: this.onClickSubModulehelpGuidelines.bind(this)

      }
    }, {
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Intiate Inspection Booking',
        type: 'default',visible:false,
        icon: 'fa fa-pencil-square-o'
      }
    },{
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.refreshDataGrid.bind(this)
        }
      });
  }
  onCellPrepared(e) {
    
    if(e.rowType === "data" && e.column.dataField === "inspection_recommendation") {
      let application_status_id =e.data.permitinspectionstatus_id;

        if(application_status_id ==1){
          e.cellElement.style.color = '#fff';
          e.cellElement.style.backgroundColor = 'green';    
        }
        else if(application_status_id == 3){
          
          e.cellElement.style.color = 'white';
          e.cellElement.style.backgroundColor = 'yellow';  
      
        }
        else{
            e.cellElement.style.color = 'black';
            e.cellElement.style.backgroundColor = '#ccc';  
        

        }
          
    }
}
}
