import { Component, OnInit } from '@angular/core';
import { ImportLicensevisashareclassComponent } from '../import-licensevisashareclass/import-licensevisashareclass.component';

@Component({
  selector: 'app-import-licensesappselection',
  templateUrl: './import-licensesappselection.component.html',
  styleUrls: ['./import-licensesappselection.component.css']
})
export class ImportLicensesappselectionComponent extends ImportLicensevisashareclassComponent implements OnInit {

 
  ngOnInit() {
    this. onLoadApplicationType();
    this.reloadPermitApplicationsApplications();
  }
  onLoadApplicationType() {
    var data = {
      table_name: 'sub_modules',
      permit_type_id: 2,
      module_id: 4
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });
  }
}
