import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrugsProductsdetailsComponent } from 'src/app/views/online-services/product-registration/product-generaldetails/drugs-productsdetails/drugs-productsdetails.component';
import { DxActionSheetModule, DxFileUploaderModule, DxDataGridModule, DxPopupModule, DxButtonModule, DxDateBoxModule, DxTextBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule, DxCheckBoxModule, DxNumberBoxModule, DxRadioGroupModule, DxScrollViewModule, DxDropDownBoxModule, DxHtmlEditorModule, DxTagBoxModule, DxTemplateModule, DxProgressBarModule } from 'devextreme-angular';
import { DataTablesModule } from 'angular-datatables';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrugsDataproductsComponent } from 'src/app/views/online-services/product-registration/products-dataentry/drugs-dataproducts/drugs-dataproducts.component';
import { MedicaldeviceDataproductsComponent } from 'src/app/views/online-services/product-registration/products-dataentry/medicaldevice-dataproducts/medicaldevice-dataproducts.component';
import { MedicaldevicesProductsdetailsComponent } from 'src/app/views/online-services/product-registration/product-generaldetails/medicaldevices-productsdetails/medicaldevices-productsdetails.component';
import { AntisepticProductdetailsComponent } from 'src/app/views/online-services/product-registration/product-generaldetails/antiseptic-productdetails/antiseptic-productdetails.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { ApplicationDocumentsComponent } from 'src/app/views/online-services/application-documents/application-documents.component';
import { PromotionalGeneralInfoComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdata/promotional-general-info/promotional-general-info.component';
import { PromotionalProductsParticularsComponent } from 'src/app/views/online-services/promotional-advert/promotional-advertdata/promotional-products-particulars/promotional-products-particulars.component';
import { DisposalGeneraldetailsComponent } from 'src/app/views/online-services/disposal-apps/disposal-appdataentry/disposal-generaldetails/disposal-generaldetails.component';
@NgModule({
  declarations: [DrugsProductsdetailsComponent, MedicaldeviceDataproductsComponent,
    DrugsDataproductsComponent,MedicaldevicesProductsdetailsComponent, AntisepticProductdetailsComponent,ApplicationDocumentsComponent,
    PromotionalGeneralInfoComponent,
    PromotionalProductsParticularsComponent,DisposalGeneraldetailsComponent,
  
    ],
  imports: [
    CommonModule,DataTablesModule,
    DxTextBoxModule,
    DxDateBoxModule,
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxFileUploaderModule,
    DxActionSheetModule,
    ModalDialogModule.forRoot(),
    DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule,DxScrollViewModule,
    DxHtmlEditorModule, DxTemplateModule,
    DxProgressBarModule,DxFileUploaderModule,
    DxDropDownBoxModule,DxTagBoxModule,
    DxRadioGroupModule,
    FormsModule,NgxSmartModalModule.forRoot(),
    ReactiveFormsModule
  ],
  exports:[
    DrugsProductsdetailsComponent,
    MedicaldeviceDataproductsComponent,
    DrugsDataproductsComponent,MedicaldevicesProductsdetailsComponent, AntisepticProductdetailsComponent,ApplicationDocumentsComponent,PromotionalGeneralInfoComponent,
    PromotionalProductsParticularsComponent,DisposalGeneraldetailsComponent,
    FormsModule,DxProgressBarModule,
    ReactiveFormsModule,
    DxFileUploaderModule, DxNumberBoxModule, DxCheckBoxModule, DxSelectBoxModule, DxTextAreaModule, DxContextMenuModule, DxMenuModule,DxScrollViewModule,
    DxHtmlEditorModule, DxTemplateModule,
    DxDropDownBoxModule,DxTagBoxModule,
    DxRadioGroupModule
  
  
  ]
})
export class SharedModulesModule { }
