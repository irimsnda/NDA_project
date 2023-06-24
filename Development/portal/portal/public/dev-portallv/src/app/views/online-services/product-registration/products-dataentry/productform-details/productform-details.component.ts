import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productform-details',
  templateUrl: './productform-details.component.html',
  styleUrls: ['./productform-details.component.css']
})
export class ProductformDetailsComponent implements OnInit {
  @Input() application_code: number;
  
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() product_id: number;

  @Input() productGeneraldetailsfrm: FormGroup;
  
  @Input() classificationData: any;
  @Input() commonNamesData: any;
  @Input() atcData: any;
  @Input() siUnitsData: any;
  @Input() distributionCategoryData: any;
  @Input() storageConditionData: any;
  @Input() dosageFormsData: any;
  @Input() routeOfAdministrationData: any;
  
  @Input() zonesData: any;
  @Input() assessmentProcedureData: any;
  @Input() productFormData: any;
  @Input() methodOfUseData: any;
  @Input() productSubCategoryData: any;
  @Input() productSpecialCategoryData: any;

  @Input() devicesTypeData: any;
  @Input() intendedUseData: any;
  @Input() intendedEndUserData: any;


  constructor() { 

  }

  ngOnInit() {

  }

}
