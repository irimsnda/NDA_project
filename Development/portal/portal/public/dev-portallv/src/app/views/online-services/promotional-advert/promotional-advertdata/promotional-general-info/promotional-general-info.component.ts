import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedpromotionalAdvertComponent } from '../../sharedpromotional-advert/sharedpromotional-advert.component';

@Component({
  selector: 'app-promotional-general-info',
  templateUrl: './promotional-general-info.component.html',
  styleUrls: ['./promotional-general-info.component.css']
})
export class PromotionalGeneralInfoComponent extends SharedpromotionalAdvertComponent  {
  @Output() advertisementProducts = new EventEmitter();
  
  @Input() promotionalappGeneraldetailsfrm: FormGroup;
  @Input() promProductParticularsData: any;
  @Input() isRegisteredProductsWinshow: boolean;
  @Input() registeredProductsData: any;
  @Input() section_id: number;
  @Input() module_id: number;
  @Input() status_id: number;
  @Input() sub_module_id: number;
  @Input() application_code: number;
  isReadOnly:boolean;
  is_readonly:boolean;

  onAdvertisementProductsCboSelect($event) {
    
    this.section_id = $event.value;
    this.advertisementProducts.emit(this.section_id);


  }

}