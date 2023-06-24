import { Component, OnInit, ViewChild } from '@angular/core';


import { ImportLicensevisashareclassComponent } from '../import-licensevisashareclass/import-licensevisashareclass.component';
@Component({
  selector: 'app-export-licenseappsel',
  templateUrl: './export-licenseappsel.component.html',
  styleUrls: ['./export-licenseappsel.component.css']
})
export class ExportLicenseappselComponent extends ImportLicensevisashareclassComponent implements OnInit {

  ngOnInit() {
    this. onLoadApplicationType();
  }
  onLoadApplicationType() {
    var data = {
      table_name: 'sub_modules',
      permit_type_id: 3,
      module_id: 4
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });
  }
}
