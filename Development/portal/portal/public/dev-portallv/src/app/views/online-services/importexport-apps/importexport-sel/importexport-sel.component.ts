import { Component, OnInit, ViewChild } from '@angular/core';


import { ImportLicensevisashareclassComponent } from '../import-licensevisashareclass/import-licensevisashareclass.component';
@Component({
  selector: 'app-importexport-sel',
  templateUrl: './importexport-sel.component.html',
  styleUrls: ['./importexport-sel.component.css']
})
export class ImportexportSelComponent extends ImportLicensevisashareclassComponent implements OnInit {

  ngOnInit() {
    this. onLoadApplicationType();
  }
  onLoadApplicationType() {
    var data = {
      table_name: 'sub_modules',
      permit_type_id: 1,
      module_id: 4
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.applicationTypeData = data;
        });
  }
}
