import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, OnInit, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { ModalDialogService } from 'ngx-modal-dialog';
import { ToastrService } from 'ngx-toastr';
import { AppSettings } from 'src/app/app-settings';
import { Utilities } from 'src/app/services/common/utilities.service';
import { DocumentManagementService } from 'src/app/services/document-management/document-management.service';
import { ConfigurationsService } from 'src/app/services/shared/configurations.service';
import {iremboMakePayment} from 'src/app/irembojavascript.js'
//declare var s2bPayButtonLoad: any;
declare function s2bPayButtonLoad(buttonLoadStatus: any) : any;
@Component({
  selector: 'app-invoice-groupedappgeneration',
  templateUrl: './invoice-groupedappgeneration.component.html',
  styleUrls: ['./invoice-groupedappgeneration.component.css']
})
export class InvoiceGroupedappgenerationComponent implements OnInit {
  
  @Input() onApplicationSubmissionFrm: FormGroup;
  loadAPI: Promise<any>;
  @Inject(DOCUMENT) private document: Document;
 invoice_id: number;
  fasttrack_option_id:number;
  paying_currency_id:number;
  @Input() application_code: number;
  @Input() group_application_code: number;
  
  @Input() retentiongeration_request_id: number;

  @Input() app_routing: any;
  @Input() tracking_no: number;
  @Input() module_id: number;
  @Input() sub_module_id: number;
  @Input() status_id: number;  
  
  @Input() section_id: number;
  payment_resp:any;
  isInvoiceGenerationWin:boolean=false;
  invoice_no:number;
  has_generated_invoice:boolean;
  iremboInvoiceNumber:number;
  group_invoice_no:number;
  is_uploadpaymentdetailsopt:boolean=false;
  appInvoiceDeTailsData:any;
  
  appUploadPaymentDeTailsData:any;
  base_url = AppSettings.base_url;
  mis_url = AppSettings.mis_url;
  is_uploadpaymentdetailsfrm:boolean=false;
  uploadpaymentdetailsfrm:FormGroup;
  invoice_resp :any;
  loading:any;
  printReportTitle:string;
  isPrintReportVisible:boolean = false;
  status_name:string;
  printiframeUrl:string;
  currenciesData:any;
  paymentModesData:any;
  filesToUpload: Array<File> = [];  
  document_previewurl: any;
  app_route:any;
  isDocumentPreviewDownloadwin: boolean = false;
  app_data:any;
  publicKey:string;
  constructor(public modalServ: ModalDialogService,public viewRef: ViewContainerRef,public spinner: SpinnerVisibilityService,public utilityService: Utilities,public toastr: ToastrService,public configService: ConfigurationsService,public dmsService: DocumentManagementService,public formBuilder: FormBuilder, public config: ConfigurationsService,private renderer: Renderer2) {
      //the details 
      this.app_data = this.utilityService.getApplicationDetail();
      if(this.app_data){
        this.application_code = this.app_data.application_code;
        this.group_application_code = this.app_data.group_application_code;
        this.app_routing = this.app_data.app_routing;
        this.tracking_no = this.app_data.tracking_no;
        this.module_id = this.app_data.module_id;
        this.sub_module_id = this.app_data.sub_module_id;
        this.status_id = this.app_data.application_status_id;
        this.section_id = this.app_data.section_id;
        this.status_name = this.app_data.status_name;
        this.app_routing = this.app_data.app_routing;
        this.onApplicationSubmissionFrm = this.app_data.onApplicationSubmissionFrm;
      }
    
      this.uploadpaymentdetailsfrm = this.formBuilder.group({
        file: null,
        trans_date: null,
        amount_paid: [null, Validators.required],
        currency_id: [null, Validators.required],
        bank_name: [null, Validators.required],
        payment_mode_id: [null, Validators.required],
        payment_reference: [null, Validators.required],
        payment_slip:null,
        group_application_code:null,
        invoice_id:null
      });

   }
  
    
   funcApplicationInvOnlinePayment(){
    if(this.iremboInvoiceNumber >0){
         iremboMakePayment(this.publicKey,this.iremboInvoiceNumber,this.spinner);
    }
    else{

     this.toastr.success('Error Ocurred on Generattion of the Irembo Payment Invoice Number, cancel the Generated Invoice and regenerate, if error persists contact the system Admin', 'Response');
    }
   
}
  ngOnInit() {
    this.onLoadpaymentModesData();
    this.onLoadcurrenciesData();
  }
  onLoadcurrenciesData() {
    var data = {
      table_name: 'par_currencies',
      is_paying_currency:1
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.currenciesData = data;
        });

  } onLoadpaymentModesData() {
    var data = {
      table_name: 'par_payment_modes',
    };
    this.config.onLoadConfigurationData(data)
      .subscribe(
        data => {
          this.paymentModesData = data;
        });

  }
  funcApplicationInvoice(){
    this.fasttrack_option_id = 2;
    this.paying_currency_id = this.onApplicationSubmissionFrm.get('paying_currency_id').value
    if(this.onApplicationSubmissionFrm.get('fasttrack_option_id')){
      this.fasttrack_option_id = this.onApplicationSubmissionFrm.get('fasttrack_option_id').value;

    }
    this.isInvoiceGenerationWin = true;
    this.funcLoadApplicationInvDetails();
   
  }fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
}
  private prepareSave(): any {
    let input = new FormData();
    const files: Array<File> = this.filesToUpload;
   // input.append('file', this.uploadpaymentdetailsfrm.get('file').value);
    for(let i =0; i < files.length; i++){
        input.append("file", files[i], files[i]['name']);
    }
    input.append('trans_date', this.uploadpaymentdetailsfrm.get('trans_date').value);
    input.append('amount_paid', this.uploadpaymentdetailsfrm.get('amount_paid').value);
    input.append('group_application_code', this.uploadpaymentdetailsfrm.get('group_application_code').value);

    
    input.append('currency_id', this.uploadpaymentdetailsfrm.get('currency_id').value);
    input.append('bank_name', this.uploadpaymentdetailsfrm.get('bank_name').value);
    input.append('payment_mode_id', this.uploadpaymentdetailsfrm.get('payment_mode_id').value);
    input.append('payment_reference', this.uploadpaymentdetailsfrm.get('payment_reference').value);
    input.append('invoice_id', this.uploadpaymentdetailsfrm.get('invoice_id').value);
    return input;
  }
  funcEditUploadedPayments(data){
    this.uploadpaymentdetailsfrm.patchValue(data);
    this.is_uploadpaymentdetailsfrm = true;


  }
  funcDownloadUploadedPayments(data) {
    this.spinner.show();
    if(data.node_ref == ''){
      this.toastr.success('Upload Document for you to download', 'Response');
      return;
    }
    this.dmsService.getApplicationDocumentDownloadurl(this.group_application_code, data.node_ref, data.id)
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response;
          if (response_data.success) {

            this.document_previewurl = this.configService.getSafeUrl(response_data.document_url);
            this.isDocumentPreviewDownloadwin = true;

          }
          else {

            this.toastr.success(response_data.message, 'Response');
          }
        },
        error => {
          this.loading = false;
        });
  }
  onFileChange(event) {
    
    if(event.target.files.length > 0){
  
      let file = event.target.files[0];
      this.uploadpaymentdetailsfrm.get('payment_slip').setValue(file);
    }

   
  }
  onuploadpaymentdetailsSubmit() {
    this.spinner.show();
    const uploadData = this.prepareSave();
    this.dmsService.uploadApplicationDMSDocument(uploadData,  this.module_id, this.sub_module_id, '',   this.group_application_code, '','onuploadpaymentdetailsSubmit')
      //.pipe(first())
      .subscribe(
        response => {
          this.spinner.hide();
          let response_data = response.json();
          if (response_data.success) {

            this.is_uploadpaymentdetailsfrm = false;
            this.onLoadappUploadPaymentDeTailsData();
            this.toastr.success(response_data.message, 'Response');

          }
          else {

            this.toastr.error(response_data.message, 'Response');

          }

        },
        error => {
          this.toastr.success('Error occurred', 'Response');

        });
  } 
  
  @HostListener('window:s2bPayButtonLoadFuncCall', ['$event']) 
  s2bPayButtonLoadFuncCall(buttonLoadStatus): void  {
    this.spinner.show();
    if (buttonLoadStatus.status === "fail") {
      this.toastr.error(buttonLoadStatus.statusmsg, 'Response');
      if(document.getElementById('s2bpay-button')){

        document.getElementById('s2bpay-button').remove();
  
      }
      this.spinner.hide();
    }
    this.spinner.hide();
  }
  @HostListener('window:s2bPayCloseFuncCall', ['$event']) 
  s2bPayCloseFuncCall(buttonLoadStatus): void  {
    this.spinner.show();
    if(document.getElementById('s2bpay-button')){

      document.getElementById('s2bpay-button').remove();

    }
    this.toastr.success('The Online Payment Option has been Closed, please try again to proceed with the payment process or contact Syste admin for further guide.', 'Response');

    this.spinner.hide();
  }
  
  @HostListener('window:s2bPayNotifyFuncCall', ['$event']) 
  s2bPayNotifyFuncCall(event): void  {
 
    var data = {
      application_code: this.application_code,
      group_application_code: this.group_application_code,
      invoice_id: this.invoice_id,
      status: event.detail.status,
      scbTxnId: event.detail.scbTxnId,
      corpref: event.detail.corpref,
      dateTime: event.detail.dateTime,
      hash: event.detail.hash
    };
    this.spinner.show();
    this.utilityService.getApplicationInvoiceDetails(data, 'utilities/s2bPayNotifyFuncCall')
    .subscribe(
      response => {
        this.invoice_resp = response;
        //the details 
        if(document.getElementById('s2bpay-button')){

          document.getElementById('s2bpay-button').remove();

        }
        if (this.invoice_resp.success) {
              this.toastr.success(this.invoice_resp.message, 'Response');

        } else {
          this.toastr.error(this.invoice_resp.message, 'Response');
        }
        this.spinner.hide();
      },
      error => {
        this.loading = false;
      });

  }
  
  funcCancelProformaInvoice(){
    this.modalServ.openDialog(this.viewRef, {
      title: 'Do you want to cancel the following grouped Invoice for regeneration?',
      childComponent: '',
      settings: {
        closeButtonClass: 'fa fa-close'
      },
      actionButtons: [{
        text: 'Yes',
        buttonClass: 'btn btn-danger',
        onAction: () => new Promise((resolve: any, reject: any) => {
          this.funcCancelGeneratedProformaInvoice(this.group_application_code);
          resolve();
        })
      }, {
        text: 'no',
        buttonClass: 'btn btn-default',
        onAction: () => new Promise((resolve: any) => {
          resolve();
        })
      }
      ]
    });
    
  }
  
  funcCancelGeneratedProformaInvoice(group_application_code){
    
    let app_params = {
        group_application_code:this.group_application_code
      }
      this.spinner.show();
    this.utilityService.getApplicationInvoiceDetails(app_params, 'utilities/onCancelGroupedGeneratedApplicationInvoice')
    .subscribe(
      response => {
        this.invoice_resp = response;
        //the details 
        if (this.invoice_resp.success) {
             this.funcLoadApplicationInvDetails();
        } else {
          this.toastr.error(this.invoice_resp.message, 'Response');
        }
        this.spinner.hide();
      },
      error => {
        this.loading = false;
      });

  }
  funcUploadApplicationPayment(){
    let app_params = {
      application_code:this.application_code,
      group_application_code:this.group_application_code,
    }
    this.spinner.show();
  this.utilityService.getApplicationInvoiceDetails(app_params, 'utilities/onCheckGeneratedApplicationInvoice')
  .subscribe(
    response => {
      this.invoice_resp = response;
      //the details 
      if (this.invoice_resp.success) {
        this.onLoadappUploadPaymentDeTailsData();
        
        this.is_uploadpaymentdetailsopt = true;
        
      } else {
        this.toastr.error(this.invoice_resp.message, 'Response');
      }
      this.spinner.hide();
    },
    error => {
      this.loading = false;
    });


  }
  funcUploadApplicationInvPayment(app_data){
    
    let app_params = {
        application_code:this.application_code,
        group_application_code:this.group_application_code,
        invoice_id:app_data.invoice_id
      }
      this.spinner.show();
    this.utilityService.getApplicationInvoiceDetails(app_params, 'utilities/onCheckGeneratedApplicationInvoice')
    .subscribe(
      response => {
        this.invoice_resp = response;
        //the details 
        if (this.invoice_resp.success) {
          this.onLoadappUploadPaymentDeTailsData();
          this.invoice_id = app_data.invoice_id;
          this.is_uploadpaymentdetailsopt = true;
          
        } else {
          this.toastr.error(this.invoice_resp.message, 'Response');
        }
        this.spinner.hide();
      },
      error => {
        this.loading = false;
      });

  }
  funcApplicationPaymentRemittanceCall(app_data){
        //et the invoice details 
        this.invoice_id = app_data.invoice_id;
        
        let app_params = {
          application_code:this.application_code,
          group_application_code:this.group_application_code,
          invoice_id: app_data.invoice_id
        }
        this.spinner.show();
        this.utilityService.getApplicationInvoiceDetails(app_params, 'utilities/onretrieveGeneratedApplicationInvoice')
        .subscribe(
          response => {
            this.invoice_resp = response;
            //the details 
            if (this.invoice_resp.success) {
              var invoice_details  = this.invoice_resp.invoice_details;
              if(document.getElementById('s2bpay-button')){

                document.getElementById('s2bpay-button').remove()
              }
              console.log(invoice_details)
              this.spinner.show();
               // this.funcRunPaymentIntegrationCall(invoice_details);
              this.isInvoiceGenerationWin = false;
             
            } else {
              this.toastr.error(this.invoice_resp.message, 'Response');
            }
            this.spinner.hide();
          },
          error => {
            this.loading = false;
          });
  }
 
  funcApplicationInvoiceGeneration(){
      //Generate Invoice 
      this.fasttrack_option_id = 2;
      this.paying_currency_id = this.onApplicationSubmissionFrm.get('paying_currency_id').value
      if(this.onApplicationSubmissionFrm.get('fasttrack_option_id')){
        this.fasttrack_option_id = this.onApplicationSubmissionFrm.get('fasttrack_option_id').value;
      
      }
      this.modalServ.openDialog(this.viewRef, {
        title: 'Do you want to Generate Application Invoice? (Note: The Invoice is based on the fees outlined on the Quotation)?',
        childComponent: '',
        settings: {
          closeButtonClass: 'fa fa-close'
        },
        actionButtons: [{
          text: 'Yes',
          buttonClass: 'btn btn-danger',
          onAction: () => new Promise((resolve: any, reject: any) => {

            if(this.status_id ==1 || this.status_id ==40  || this.status_id ==52){
              this.spinner.show();
              let app_params = {
                application_code:this.application_code,
                group_application_code:this.group_application_code,
                fasttrack_option_id:this.fasttrack_option_id,
                paying_currency_id:this.paying_currency_id,
                retentiongeration_request_id:this.retentiongeration_request_id,
                tracking_no:this.tracking_no,
                module_id:this.module_id,
                section_id: this.section_id,
                status_id:this.status_id
              }
              this.utilityService.onGroupedApplicationInvoiceGeneration(this.group_application_code, app_params, 'onGroupedApplicationInvoiceGeneration')
              .subscribe(
                response => {
                  this.invoice_resp = response.json();
                  //the details 
                  if (this.invoice_resp.success) {
                    this.isInvoiceGenerationWin = true;
                    this.toastr.success(this.invoice_resp.message, 'Response');
                    this.funcLoadApplicationInvDetails();
                   // this.funcPrintProformaInvoice(this.invoice_resp.invoice_data)
                  } else {
                    this.toastr.error(this.invoice_resp.message, 'Response');
      
                  }
                  this.spinner.hide();
                },
                error => {
                  this.spinner.show();
                  this.loading = false;
                });
            }
            else{
              this.isInvoiceGenerationWin = true;
              this.funcLoadApplicationInvDetails();
              //laod the invoice details 
      
            }

            resolve();
          })
        }, {
          text: 'no',
          buttonClass: 'btn btn-default',
          onAction: () => new Promise((resolve: any) => {
            resolve();
          })
        }
        ]
      });
      
  }
  funcGroupappRefreshforPaymentStatus(){
    this.spinner.show();
        let app_params = {
          group_application_code:this.group_application_code,
          group_invoice_no:this.group_invoice_no,
        }
        this.utilityService.onApplicationInvoicePaymentConfirmation(app_params, 'api/iremeboypay/onGroupApplicationInvoicePaymentConfirmation')
        .subscribe(
          response => {
            this.invoice_resp = response;
            //the details 
            if (this.invoice_resp.success) {
              this.toastr.success(this.invoice_resp.message, 'Response');
              this.funcLoadApplicationInvDetails();
            // this.funcPrintProformaInvoice(this.invoice_resp.invoice_data)
            } else {
              this.toastr.error(this.invoice_resp.message, 'Response');

            }
            this.spinner.hide();
          },
          error => {
            this.spinner.show();
            this.loading = false;
          });
  }
  funcLoadApplicationInvDetails(){
    //this.spinner.show();
    this.fasttrack_option_id = 2;
    this.paying_currency_id = this.onApplicationSubmissionFrm.get('paying_currency_id').value
    if(this.onApplicationSubmissionFrm.get('fasttrack_option_id')){
      this.fasttrack_option_id = this.onApplicationSubmissionFrm.get('fasttrack_option_id').value;
    
    }
    let app_params = {
        application_code:this.application_code,
        group_application_code:this.group_application_code,
        fasttrack_option_id:this.fasttrack_option_id,
        paying_currency_id:this.paying_currency_id,
        tracking_no:this.tracking_no,
        module_id:this.module_id,
        sub_module_id:this.sub_module_id,
        retentiongeration_request_id:this.retentiongeration_request_id,
        applicationfeetype_id:1,
        section_id: this.section_id,
        status_id:this.status_id
      }
    this.utilityService.getApplicationInvoiceDetails(app_params, 'utilities/onLoadGroupApplicationInvoice')
    .subscribe(
      response => {
        this.invoice_resp = response;
        //the details 
        if (this.invoice_resp.success) {
          this.publicKey =this.invoice_resp.publicKey;
          this.invoice_no = this.invoice_resp.invoice_no;
          this.has_generated_invoice = this.invoice_resp.has_generated_invoice;

          this.iremboInvoiceNumber = this.invoice_resp.iremboInvoiceNumber;
          this.group_invoice_no = this.invoice_resp.group_invoice_no;

          this.appInvoiceDeTailsData = this.invoice_resp.invoice_data;

          this.spinner.hide();
        } else {
          this.toastr.error(this.invoice_resp.message, 'Response');
        }
        this.spinner.hide();
      },
      error => {
        this.loading = false;
      });
  }
  onLoadappUploadPaymentDeTailsData(){
    //this.spinner.show();
    
    let app_params = {
        application_code:this.application_code,
        tracking_no:this.tracking_no,
        module_id:this.module_id,
        sub_module_id:this.sub_module_id
      }
    this.utilityService.getApplicationInvoiceDetails(app_params, 'utilities/onLoadGroupedappUploadPaymentDeTailsData')
    .subscribe(
      response => {
        this.payment_resp = response;
        //the details 
        if (this.invoice_resp.success) {
          this.appUploadPaymentDeTailsData = this.payment_resp.invoice_data;
          this.spinner.hide();
        } else {
          this.toastr.error(this.payment_resp.message, 'Response');
        }
        this.spinner.hide();
      },
      error => {
        this.loading = false;
      });

  }
 
  onUploadPaymentDetailsOpt(e) {
    e.toolbarOptions.items.unshift({
      location: 'before',
      widget: 'dxButton',
      options: {
        text: 'Add Payment Remittance DEtails',
        type: 'default',
        icon: 'fa fa-plus',
        onClick: this.funcAddPaymentsDetails.bind(this)

      }
    }, {
        location: 'after',
        widget: 'dxButton',
        options: {
          icon: 'refresh',
          onClick: this.onLoadappUploadPaymentDeTailsData.bind(this)
        }
      });
      
  }

  funcAddPaymentsDetails() {
    
    this.is_uploadpaymentdetailsfrm = true;
  }
 
  
  funcPrintProformaInvoice(){
    
      let report_url = this.mis_url+'reports/generateGroupedApplicationInvoice?group_application_code='+this.group_application_code;
      this.funcGenerateRrp(report_url,"Grouped Application Proforma Invoice Statement")
    
  
  }
  funcPrintPaymentReceipt(app_data){
    
    if(app_data.payment_id >0){
      let report_url = this.mis_url+'reports/generateApplicationReceipt?application_code='+app_data.application_code+"&invoice_id="+app_data.invoice_id+"&payment_id="+app_data.payment_id+"&module_id="+app_data.module_id;
      
      this.funcGenerateRrp(report_url,"Application Proforma Invoice")
    }
    else{
      this.toastr.error('Payments not received.', 'Response');
    }
  
  }
  funcPrintGroupAppPaymentReceipt(){
    
      let report_url = this.mis_url+'reports/generateGroupedApplicationReceipt?group_application_code='+this.group_application_code+"&module_id="+this.module_id+"&group_invoice_no="+this.group_invoice_no;
      this.funcGenerateRrp(report_url,"Application Proforma Invoice")
    
  }
  funcGenerateRrp(report_url,title){
    
    this.printiframeUrl =  this.configService.returnReportIframe(report_url);
    this.printReportTitle= title;
    this.isPrintReportVisible = true;

}
  funcpopWidth(percentage_width) {
    return window.innerWidth * percentage_width/100;
  }
  onPermitsApplicationSubmit() {
    
          this.app_route  = this.app_routing;
            if(this.app_route){
                this.utilityService.onPermitsApplicationSubmit(this.viewRef, this.application_code, this.tracking_no, 'wb_importexport_applications', this.app_route,this.onApplicationSubmissionFrm.value);
            }
  }  
onCellPrepared(e) {
    if(e.rowType === "data" && e.column.dataField === "payment_status") {
      let amount_paid =e.data.amount_paid;
      let invoice_no =e.data.invoice_no;

      if(amount_paid >0){
        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#64B0F2';  
        //e.column.dataField.value = 'Paid';
      }
      else if(invoice_no >0){

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#1BB99A';  
       // e.column.dataField = 'Not Paid';
      }else{

        e.cellElement.style.color = 'white';
        e.cellElement.style.backgroundColor = '#FF5D48';  
       // e.column.dataField = 'Pending Invoice';
      }
        
      }
}
}
