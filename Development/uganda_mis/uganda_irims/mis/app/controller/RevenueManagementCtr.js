/**
 * Created by Kip on 2/25/2019.
 */
Ext.define('Admin.controller.RevenueManagementCtr', {
  extend: 'Ext.app.Controller',
  stores:[
      'Admin.store.workflowmanagement.RevProcessSubmissionNextStagesStr',
      'Admin.store.adhocinvoices.AdhocInvoicingProcessDashGridStr'
      
  ],
  config: {
      refs: [{
          ref: 'mainPanel',
          selector: 'maincontainerwrap'
      }, {
          ref: 'mainTabPanel',
          selector: '#contentPanel'
      }, {
          ref: 'retentionchargespnl',
          selector: '#retentionchargespnl'
      }, {
        ref: 'retentionchargespaymentpnl',
        selector: '#retentionchargespaymentpnl'
    },{
          ref: 'retentionchargespaymentpnl',
          selector: '#retentionchargespaymentpnl'
      },{
        ref: 'applicationgenerateinvoicespnl',
        selector: 'applicationgenerateinvoicespnl'
    }],

      control: {
          'gepgbillinvoicepostinggrid': {
              refresh: 'refreshgepgbillinvoicepostinggrid'
          },'gepgbillpaymentspostinggrid': {
              refresh: 'refreshgepgbillPaymentpostinggrid'
          },'retentionchargesinvoicesgrid': {
              refresh: 'refreshretentionchargesinvoicesgrid'
          } ,'linkretentioninvoicesgrid': {
            refresh: 'refreshLinkretentionchargesgrid'
        } ,
          
          'retentionsapplicantpaymentselectiongrid': {
              itemdblclick: 'onRetentionPaymentApplicantSelectionListDblClick'
          },'retentionchargespaymentsgrid': {
              refresh: 'refreshretentionchargespaymentsgrid'
          },'retentionsapplicantselectiongrid': {
              itemdblclick: 'onRetentionApplicantSelectionListDblClick'
          },'invoicecancellationpnlgrid': {
              refresh: 'refreshinvoicecancellationpnlgrid'
          },
          'retentionsapplicantselectiongrid button[name=addselected_applicants]': {
                click: 'onRetentionApplicantAddSelectedList'
            },
            'retentionsapplicantpaymentselectiongrid button[name=addselected_applicants]': {
                click: 'onRetentionPaymentApplicantAddSelectedList'
            },
            
          'revrequestpaymentdetailsgrid': {
              refresh: 'refreshrevrequestpaymentdetailsgrid'
          },'invoicecancellationtb button[name=invoicecancellationtbBtn]': {
              click: 'revenuemanagementUniformTbHome'
          },'applicationinvoicesgrid': {
              itemdblclick: 'applicationinvoicesgridDblClick'
          },'invoicereversalrequestpnl button[name=process_submission_btn]': {
              click: 'showInvoiceCancellationReqSubmissionWin'
          },
          'invoicecancellationprocess': {
              afterrender: 'prepareRevewnuCancellationREquestDetails'
          },'applicationsearchpaymentsgrid': {
              itemdblclick: 'applicationinvoicesgridDblClick'
          },'paymentreversalrequestpnl button[name=process_submission_btn]': {
              click: 'showInvoiceCancellationReqSubmissionWin'
          },'paymentreversalapproval': {
              afterrender: 'prepareRevewnuCancellationREquestDetails'
          },'paymentcancellationrequeststb button[name=paymentcancellationrequeststb]': {
              click: 'revenuemanagementUniformTbHome'
          },'wavepaymentmanagementdashgrid': {
              refresh: 'refreshinvoicecancellationpnlgrid'
          },'paymentcancellationrequeststb button[name=paymentcancellationrequeststb]': {
              click: 'revenuemanagementUniformTbHome'
          },
          'batchapplicationinvoicestb button[name=batchapplicationinvoicestb]': {
            click: 'revenuemanagementUniformTbHome'
        },
        'batchretentioninvoicestb button[name=batchretentioninvoicestb]': {
            click: 'revenuemanagementUniformTbHome'
        },
          
          'creditnoterequestpnl button[name=process_submission_btn]': {
              click: 'showCreditNoteRequestReqSubmissionWin'
          },'creditnoteapprovalpnl': {
              afterrender: 'prepareRevewnuCreditNoteREquestDetails'
          },'revenueimportexportspermitgrid': {
                itemdblclick: 'revenueimportexportspermitgridDblClick',
                
            },
            'premiinspimpextpermitsproductsgrid': {
                refresh: 'refreshpremiinspimpextpermitsproductsgrid'
            } ,'inspectionatownerpremreceivingpnl': {
                afterrender: 'prepareInspectionatownerpremreceivingpnl'
            }, 
            'adhocinvoicerequestpnl': {
                afterrender: 'prepareAdhocInvoiceRequestpnl'
            }, 
            'adhocinvoicingreceiptingpnl': {
                afterrender: 'prepareadhocinvoicingreceiptingpnl'
            },
            'linkapplicationinvoicesgrid button[name=btnlinkinvoices]': {
                click: 'funLinkBatchInvoiceDetails'
            },
            'linkretentioninvoicesgrid button[name=btnlinkinvoices]': {
                click: 'funLinkBatchInvoiceDetails'
            } , 'invoicingcostelementsgrid': {
                select: 'addInvoiceCostElement',
                beforeselect: 'beforeCostElementSelect'
            },
            'invoicingcostdetailsgrid': {
               // refresh: 'refreshInvoiceCostDetailsGrid',
                select: 'onInvoiceItemSelect',
                deselect: 'onInvoiceItemDeselect',
                beforeselect: 'beforeCostElementSelect',
                beforeedit: 'beforeCostElementEdit'
            },   'appinvoicemanualgenerationpnl toolbar button[name=remove_selected]': {
                click: 'deleteApplicationInvoice'
            }, 'appinvoicemanualgenerationpnl button[name=save_btn]': {
                click: 'saveApplicationInvoicingDetails'
            },
            

      }
  },
  listen: {
      controller: {
          '*': {
            onPaymentProcessRequest: 'onPaymentProcessRequest',
            onRevCancellationlViewApDetails:'onRevCancellationlViewApDetails',
            funcCancelGeneratedInvoice:'funcCancelGeneratedInvoice',
              onAdhocViewApplicationDetails:'onAdhocViewApplicationDetails',
              funcPrintRetentionPaymentsStatement:'funcPrintRetentionPaymentsStatement'
          }
      }
  },
  saveApplicationInvoicingDetails: function (btn) {
    var me = this,
        isLocked = btn.isLocked,
        isSubmission = btn.isSubmission,
        invoice_pnl = this.getApplicationgenerateinvoicespnl(),
       
        invoicingDetailsGrid = invoice_pnl.down('invoicingcostdetailsgrid'),
        invoicingDetailsStore = invoicingDetailsGrid.getStore(),
        save_btn = invoice_pnl.down('button[name=save_btn]'),
        application_id = invoice_pnl.down('hiddenfield[name=application_id]').getValue(),
        application_code = invoice_pnl.down('hiddenfield[name=application_code]').getValue(),

        isFastTrack_field = invoice_pnl.down('checkbox[name=is_fast_track]'),
        payingCurrency_field = invoice_pnl.down('combo[name=paying_currency_id]'),
        paying_currency_id = invoice_pnl.down('combo[name=paying_currency_id]').getValue();

    if (!application_id) {
        toastr.warning('Problem encountered, application id not set!!', 'Warning Response');
        return false;
    }
    if (invoicingDetailsStore.data.length < 1) {
        toastr.warning('No Cost Elements Selected For Invoicing!!', 'Warning Response');
        return false;
    }
    if (!paying_currency_id) {
        toastr.warning('Please select paying currency!!', 'Warning Response');
        return false;
    }
   
        Ext.MessageBox.confirm('Confirm', 'Are you sure to save invoice details?', function (button) {
            if (button === 'yes') {
                me.commitApplicationInvoicingDetails(btn);
            }
        });
   
},

commitApplicationInvoicingDetails: function (btn) {
    Ext.getBody().mask('Please wait...');
    var me = this,
        toaster = btn.toaster,
        isLocked = btn.isLocked,
        isSubmission = btn.isSubmission,
        win = btn.up('window'),
        invoice_pnl = this.getApplicationgenerateinvoicespnl(),
       
        invoicingDetailsGrid = invoice_pnl.down('invoicingcostdetailsgrid'),
        invoicingDetailsStore = invoicingDetailsGrid.getStore(),
        application_id = invoice_pnl.down('hiddenfield[name=application_id]').getValue(),
        application_code = invoice_pnl.down('hiddenfield[name=application_code]').getValue(),
        module_id = invoice_pnl.down('hiddenfield[name=module_id]').getValue(),
        section_id = invoice_pnl.down('hiddenfield[name=section_id]').getValue(),
        application_feetype_id = invoice_pnl.down('hiddenfield[name=application_feetype_id]').getValue(),
       
        paying_currency_id = invoice_pnl.down('combo[name=paying_currency_id]').getValue(),
        is_fast_track_fld = invoice_pnl.down('checkbox[name=is_fast_track]'),
        storeData = invoicingDetailsStore.getData().items,
        details = [],
        is_fast_track = 0;
        if (is_fast_track_fld.checked) {
            is_fast_track = 1;
        }

    Ext.each(storeData, function (item) {
        var element_costs_id = item.data.element_costs_id,
            cost = item.data.cost,
            currency_id = item.data.currency_id,
            exchange_rate = item.data.exchange_rate,
            quantity = item.data.quantity,
            obj = {
                element_costs_id: element_costs_id,
                cost: cost,
                currency_id: currency_id,
                exchange_rate: exchange_rate,
                quantity: quantity
            };
            details.push(obj);

    });
    Ext.getBody().mask('Saving Application Invoice Details...');
    Ext.Ajax.request({
        url: 'saveApplicationInvoicingDetails',
        jsonData: details,
        params: {
            application_id: application_id,
            application_code: application_code,
            application_feetype_id:application_feetype_id,
            paying_currency_id: paying_currency_id,
            sub_module_id: sub_module_id,
            section_id: section_id,
            module_id: module_id
        },
        headers: {
            'Authorization': 'Bearer ' + access_token,
            'X-CSRF-Token': token
        },
        success: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                success = resp.success,
                message = resp.message;
            if (success == true || success === true) {
                    if(Ext.getStore('paymentinvoicingcostdetailsgridStr')){
                        Ext.getStore('paymentinvoicingcostdetailsgridStr').load();
                    }
                    if(Ext.getStore('reinvoicingdetailsgridStr')){
                        Ext.getStore('reinvoicingdetailsgridStr').load();
                    }
                    toastr.success(message, 'Success Response');
                    if(resp.invoice_id >0){
                        me.fireEvent('funcgenerateApplicationInvoice',application_id, module_id, resp.invoice_id,application_code);
                       }
                    win.close();
            } else {
                toastr.error(message, 'Failure Response');
            }
        },
        failure: function (response) {
            Ext.getBody().unmask();
            var resp = Ext.JSON.decode(response.responseText),
                message = resp.message;
            toastr.error(message, 'Failure Response');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            Ext.getBody().unmask();
            toastr.error('Error: ' + errorThrown, 'Error Response');
        }
    });
},
  deleteApplicationInvoice:function(btn){
   var  panel = btn.up('#appinvoice_gen'),
        summary_grid = panel.down('invoicingcostdetailsgrid'),
        store = summary_grid.getStore();

        store.removeAll();
  },
  addInvoiceCostElement: function (sel, record) {
      var  panel = sel.view.grid.up('panel'),
           summary_grid = panel.down('invoicingcostdetailsgrid'),
          isFastTrack = panel.down('checkbox[name=is_fast_track]'),
          summary_store = summary_grid.getStore(),
          index = summary_store.indexOf(record),
          quantity = 1;
      if (isFastTrack.checked) {
          quantity = 2;
      }
      if (index < 0) {
          record.set('quantity', quantity);
          summary_store.add(record);
      }
  },

  beforeCostElementSelect: function (grid, record) {
      
  },

  beforeCostElementEdit: function (editor) {
      
  },

  onInvoiceItemSelect: function (sel, record, index, eOpts) {
      var grid = sel.view.grid,
            panel = grid.up('#appinvoice_gen'),
          selCount = grid.getSelectionModel().getCount();
      if (selCount > 0) {
        panel.down('button[name=remove_selected]').setDisabled(false);
      }
  },

  onInvoiceItemDeselect: function (sel, record, index, eOpts) {
      var grid = sel.view.grid,
        panel = grid.up('#appinvoice_gen'),
      
          selCount = grid.getSelectionModel().getCount();
      if (selCount < 1) {
        panel.down('button[name=remove_selected]').setDisabled(true);
      }
  },
funcCancelGeneratedInvoice: function (btn) {
    var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        grid = btn.up('grid'),
        store = grid.getStore(),
        record = btn.getWidgetRecord(),
        action_url = 'revenuemanagement/onCancelGeneratedApplicationInvoice'
        invoice_id = record.get('invoice_id');

        Ext.MessageBox.confirm('Proforma Invoice Cancellation', 'Do you want to cancel the generate Proforma Invoice?', function (button) {
            if (button === 'yes') {
                Ext.getBody().mask('Generating Invoice(s)');
                Ext.Ajax.request({
                   url: action_url,
                   method: 'POST',
                   waitMsg: 'Please wait...',
                   params:{
                       module_id: module_id,
                       invoice_id: invoice_id,
                        _token: token
                   },
                   headers: {
                       'Authorization': 'Bearer ' + access_token,
                       'X-CSRF-Token': token
                   },
                   success: function (response) {
                       Ext.getBody().unmask();
                       var resp = Ext.JSON.decode(response.responseText),
                           success = resp.success,
                           message = resp.message;
                       if (success == true || success === true) {
                           toastr.success(message, "Success Response");

                       } else {
                           toastr.error(message, 'Failure Response');
                       }
                       store.load();
                   },
                   failure: function (fm, action) {
                       var resp = Ext.JSON.decode(response.responseText);
                       Ext.getBody().unmask();
                       toastr.error(resp.message, 'Failure Response');
                   },
                   error: function (jqXHR, textStatus, errorThrown) {
                       Ext.getBody().unmask();
   
                       toastr.error('Error: ' + errorThrown, 'Error Response');
                   }
               });


            }
        })
     
    },   prepareadhocinvoicingreceiptingpnl: function () {
    
    Ext.getBody().mask('Please wait...');
    var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        invoice_id = activeTab.down('hiddenfield[name=invoice_id]'),
        invoice_no = activeTab.down('displayfield[name=invoice_no]'),
        running_balance = activeTab.down('displayfield[name=running_balance]'),
        invoiceSummaryGrid = activeTab.down('paymentinvoicingcostdetailsgrid'),
        invoiceSummaryStore = invoiceSummaryGrid.getStore(),
        paymentsGrid = activeTab.down('applicationpaymentsgrid'),
        paymentsStore = paymentsGrid.getStore(),
        otherDetailsFrm = activeTab.down('form'),
        applicant_details = otherDetailsFrm.down('displayfield[name=applicant_details]'),
        premise_details = otherDetailsFrm.down('displayfield[name=premise_details]'),
        application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();


    if (application_id) {
        paymentsStore.removeAll();
        paymentsStore.load({
            params: {
                application_id: application_id,
                application_code: application_code
            }
        });
        //funLinkBatchInvoiceDetails
        Ext.Ajax.request({
            method: 'GET',
            url: 'revenuemanagement/prepareadhocinvoicingreceiptingpnl',
            params: {
                application_id: application_id,
                application_code: application_code,
                table_name: 'tra_adhocinvoices_applications'
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    balance = resp.balance,
                    invoice_amount = resp.invoice_amount,
                    results = resp.results,
                    txt;
                if (success == true || success === true) {
                    var module_id = results.module_id;
                    activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                    if (Math.abs(parseFloat(balance)) == parseFloat(invoice_amount) || Math.abs(parseFloat(balance)) === parseFloat(invoice_amount)) {
                        txt = ' (Not Paid)';
                    } else if (parseFloat(balance) > 0) {
                        txt = ' (Over-Paid)';
                    } else if (parseFloat(balance) < 0) {
                        txt = ' (Under-Paid)';
                    } else {
                        txt = ' (Cleared)';
                    }
                    invoice_id.setValue(results.invoice_id);
                    invoice_no.setValue(results.invoice_no);
                    applicant_details.setValue(results.applicant_details);
                    running_balance.setValue(balance + txt);
                    invoiceSummaryStore.removeAll();
                    invoiceSummaryStore.load({
                        params: {
                            invoice_id: results.invoice_id
                        }
                    });
                   
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    } else {
        Ext.getBody().unmask();
        //It's a new application
    }
},
funLinkBatchInvoiceDetails:function(btn){
    var me = this,
        grid = btn.up('grid'),
        window = grid.up('window'),
        sm = grid.getSelectionModel(),
        selected_records = sm.getSelection(),
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        linkedinvoicesactiveTab = activeTab.down('grid'),
        batch_invoicestore = linkedinvoicesactiveTab.getStore();
        
        Ext.each(selected_records, function (item) {
            var record_id = item.data.invoice_id;
            batch_invoicestore.remove(batch_invoicestore.findRecord('invoice_id',record_id, 0, false, true, true));//
            batch_invoicestore.add(selected_records)
            
        });
        window.close();
},
onRevCancellationlViewApDetails: function (record) {
      Ext.getBody().mask('Please wait...');
      var me = this,
          mainTabPanel = me.getMainTabPanel(),
          process_id = record.get('process_id'),
          workflow_stage_id = record.get('workflow_stage_id'),
          workflow_stage = record.get('workflow_stage'),
          ref_no = record.get('reference_no'),
          tracking_no = record.get('tracking_no'),
          isGeneral = record.get('is_general'),
          cancellation_id = record.get('cancellation_id'),
          view_id = record.get('view_id'),
          title_suffix = ref_no,
          workflow_details = getAllWorkflowDetails(process_id, workflow_stage_id);
      if (!workflow_details || workflow_details.length < 1) {
          Ext.getBody().unmask();
          toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
          return false;
      }
      if (!ref_no || ref_no == '' || ref_no == null) {
          title_suffix = tracking_no;
      }

      var tab = mainTabPanel.getComponent(view_id),
          title = workflow_stage + '-' + title_suffix;
      if ((isGeneral) && (isGeneral == 1 || isGeneral === 1)) {
          title = workflow_stage;
          view_id = view_id + Math.floor(Math.random() * 100015);
      }
      if (!tab) {
          var newTab = Ext.widget(workflow_details.viewtype, {
              title: title,
              id: view_id,
              closable: true
          });
          me.prepareREvApplicationBaseDetails(newTab, record);
          mainTabPanel.add(newTab);
          var lastTab = mainTabPanel.items.length - 1;
          mainTabPanel.setActiveTab(lastTab);
      } else {
          mainTabPanel.setActiveTab(tab);
      }
    

  }, onAdhocViewApplicationDetails:function(record){
    Ext.getBody().mask('Please wait...');
    var me = this,
        mainTabPanel = me.getMainTabPanel(),
        process_id = record.get('process_id'),
        workflow_stage_id = record.get('workflow_stage_id'),
        workflow_stage = record.get('workflow_stage'),
        ref_no = record.get('reference_no'),
        tracking_no = record.get('tracking_no'),
        isGeneral = record.get('is_general'),
        cancellation_id = record.get('cancellation_id'),
        view_id = record.get('view_id'),
        title_suffix = ref_no,
        workflow_details = getAllWorkflowDetails(process_id, workflow_stage_id);
    if (!workflow_details || workflow_details.length < 1) {
        Ext.getBody().unmask();
        toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
        return false;
    }
    if (!ref_no || ref_no == '' || ref_no == null) {
        title_suffix = tracking_no;
    }
   
    var tab = mainTabPanel.getComponent(view_id),
        title = workflow_stage + '-' + title_suffix;
    if ((isGeneral) && (isGeneral == 1 || isGeneral === 1)) {
        title = workflow_stage;
        view_id = view_id + Math.floor(Math.random() * 100015);
    }
    if (!tab) {
        var newTab = Ext.widget(workflow_details.viewtype, {
            title: title,
            id: view_id,
            closable: true
        });
        var me = this,
        application_id = record.get('active_application_id'),
        application_code = record.get('application_code'),
        process_name = record.get('process_name'),
        workflow_stage = record.get('workflow_stage'),
        application_status = record.get('application_status'),
        tracking_no = record.get('tracking_no'),
        reference_no = record.get('reference_no'),
        process_id = record.get('process_id'),
        module_id = record.get('module_id'),
        sub_module_id = record.get('sub_module_id'),
        section_id = record.get('section_id'),
        workflow_stage_id = record.get('workflow_stage_id'),
        application_status_id = record.get('application_status_id'),
        
        permitapplication_code = record.get('permitapplication_code');

        newTab.down('hiddenfield[name=active_application_id]').setValue(application_id);
        newTab.down('hiddenfield[name=active_application_code]').setValue(application_code);
        newTab.down('hiddenfield[name=process_id]').setValue(process_id);
        newTab.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
        newTab.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
        newTab.down('hiddenfield[name=module_id]').setValue(module_id);
        newTab.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
        newTab.down('hiddenfield[name=section_id]').setValue(section_id);
        
        newTab.down('displayfield[name=process_name]').setValue(process_name);
        newTab.down('displayfield[name=workflow_stage]').setValue(workflow_stage);
        newTab.down('displayfield[name=application_status]').setValue(application_status);
        newTab.down('displayfield[name=tracking_no]').setValue(tracking_no);
        newTab.down('displayfield[name=reference_no]').setValue(reference_no);
        //other fields
        if(newTab.down('hiddenfield[name=permitapplication_code]')){
       
            newTab.down('hiddenfield[name=permitapplication_code]').setValue(permitapplication_code);
        }
        
        mainTabPanel.add(newTab);
        var lastTab = mainTabPanel.items.length - 1;
        mainTabPanel.setActiveTab(lastTab);
    } else {
        mainTabPanel.setActiveTab(tab);
    }
  
    Ext.getBody().unmask();

  },
  
  prepareREvApplicationBaseDetails: function (tab, record) {
      var me = this,
          application_id = record.get('active_application_id'),
          application_code = record.get('application_code'),
          process_name = record.get('process_name'),
          workflow_stage = record.get('workflow_stage'),
          application_status = record.get('application_status'),
          tracking_no = record.get('tracking_no'),
          reference_no = record.get('reference_no'),
          process_id = record.get('process_id'),
          module_id = record.get('module_id'),
          sub_module_id = record.get('sub_module_id'),
          section_id = record.get('section_id'),
          workflow_stage_id = record.get('workflow_stage_id'),
          application_status_id = record.get('application_status_id'),
          
          cancellation_id = record.get('cancellation_id');

      tab.down('hiddenfield[name=active_application_id]').setValue(application_id);
      tab.down('hiddenfield[name=active_application_code]').setValue(application_code);
      tab.down('hiddenfield[name=process_id]').setValue(process_id);
      tab.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_stage_id);
      tab.down('hiddenfield[name=application_status_id]').setValue(application_status_id);
      tab.down('hiddenfield[name=module_id]').setValue(module_id);
      tab.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
      tab.down('hiddenfield[name=section_id]').setValue(section_id);
      tab.down('hiddenfield[name=cancellation_id]').setValue(cancellation_id);
      tab.down('displayfield[name=process_name]').setValue(process_name);
      tab.down('displayfield[name=workflow_stage]').setValue(workflow_stage);
      tab.down('displayfield[name=application_status]').setValue(application_status);
      tab.down('displayfield[name=tracking_no]').setValue(tracking_no);
      tab.down('displayfield[name=reference_no]').setValue(reference_no);
  },prepareRevewnuCancellationREquestDetails: function () {
     
      Ext.getBody().mask('Please wait...');
      var me = this,
          mainTabPanel = me.getMainTabPanel(),
          activeTab = mainTabPanel.getActiveTab(),
          invoice_cancellationfrm = activeTab.down('form'),
          application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
          sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
          cancellation_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
          var action_url = 'revenuemanagement/prepareCancellationREquestDetails',
          table_name = 'tra_invoicecancellation_requests';
      if(sub_module_id == 42){
              table_name = 'tra_invoicecancellation_requests';
      }
      else if(sub_module_id == 43){
          table_name = 'tra_paymentreversal_requests';
          store = Ext.getStore('applicationpaymentsgridstr');
      }else if(sub_module_id == 44){
          table_name = 'tra_paymentcreditnote_requests';
          store = Ext.getStore('applicationpaymentsgridstr');
      }
     
      if (application_code) {
          Ext.Ajax.request({
              method: 'GET',
              url: action_url,
              params: {
                  application_code: application_code,
                  cancellation_id:cancellation_id,
                  table_name:table_name
              },
              headers: {
                  'Authorization': 'Bearer ' + access_token
              },
              success: function (response) {
                  Ext.getBody().unmask();
                  var resp = Ext.JSON.decode(response.responseText),
                      message = resp.message,
                      success = resp.success,
                      results = resp.results,
                     
                  model = Ext.create('Ext.data.Model', results);

                  if (success == true || success === true) {

                      invoice_cancellationfrm.loadRecord(model);

                      if(sub_module_id == 43 || sub_module_id == 44 ){
                          store = Ext.getStore('applicationpaymentsgridstr');
                          store.load({params:{receipt_id:results.receipt_id, invoice_id:results.invoice_id}})
                      }
                      else if(sub_module_id == 42){
                        store = Ext.getStore('revmanagementinvoicingcostdetailsgridstr');
                        store.load({params:{invoice_id:results.invoice_id}})

                      }                    
                  } else {
                      toastr.error(message, 'Failure Response');
                  }
              },
              failure: function (response) {
                  Ext.getBody().unmask();
                  var resp = Ext.JSON.decode(response.responseText),
                      message = resp.message,
                      success = resp.success;
                  toastr.error(message, 'Failure Response');
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  Ext.getBody().unmask();
                  toastr.error('Error: ' + errorThrown, 'Error Response');
              }
          });
      } else {
          Ext.getBody().unmask();
          //It's a new application
      }

  },
  prepareRevewnuCreditNoteREquestDetails: function () {
      Ext.getBody().mask('Please wait...');
      var me = this,
          mainTabPanel = me.getMainTabPanel(),
          activeTab = mainTabPanel.getActiveTab(),
          invoice_cancellationfrm = activeTab.down('form'),
          application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
          sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
          cancellation_id = activeTab.down('hiddenfield[name=cancellation_id]').getValue();
          var action_url = 'revenuemanagement/prepareCancellationREquestDetails';
      
          table_name = 'tra_paymentcreditnote_requests';
          store = Ext.getStore('applicationpaymentsgridstr');
          invoice_store = Ext.getStore('revmanagementinvoicingcostdetailsgridstr');

          Ext.Ajax.request({
              method: 'GET',
              url: action_url,
              params: {
                  application_code: application_code,
                  cancellation_id:cancellation_id,
                  table_name:table_name
              },
              headers: {
                  'Authorization': 'Bearer ' + access_token
              },
              success: function (response) {
                  Ext.getBody().unmask();
                  var resp = Ext.JSON.decode(response.responseText),
                      message = resp.message,
                      success = resp.success,
                      results = resp.results,
                     
                  model = Ext.create('Ext.data.Model', results);

                  if (success == true || success === true) {

                      invoice_cancellationfrm.loadRecord(model);

                      invoice_cancellationfrm.down('numberfield[name=total_amount]').setValue(results.credit_note_amount*results.exchange_rate);
                    
                         // store = Ext.getStore('applicationpaymentsgridstr');
                       //   store.load({params:{receipt_id:results.receipt_id, invoice_id:results.invoice_id}})
                          invoice_store.load({params:{ invoice_id:results.invoice_id}});
                  } else {
                      toastr.error(message, 'Failure Response');
                  }
              },
              failure: function (response) {
                  Ext.getBody().unmask();
                  var resp = Ext.JSON.decode(response.responseText),
                      message = resp.message,
                      success = resp.success;
                  toastr.error(message, 'Failure Response');
              },
              error: function (jqXHR, textStatus, errorThrown) {
                  Ext.getBody().unmask();
                  toastr.error('Error: ' + errorThrown, 'Error Response');
              }
          });
  },
 
  prepareAdhocInvoiceRequestpnl: function () {

    Ext.getBody().mask('Please wait...');
    var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        
        applicantFrm = activeTab.down('applicantdetailsfrm'),
        adhocinvoiceotherdetailsFrm = activeTab.down('adhocinvoiceotherdetailsFrm'),
        application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue();
   
    
    if (application_code) {
        Ext.Ajax.request({
            method: 'GET',
            url: 'revenuemanagement/prepareAdhocInvoiceRequestpnl',
            params: {
                application_code: application_code
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success,
                    results = resp.results;
                    model = Ext.create('Ext.data.Model', results);

                if (success == true || success === true) {

                    applicantFrm.loadRecord(model);
                    adhocinvoiceotherdetailsFrm.loadRecord(model);
                    
                } else {
                    toastr.error(message, 'Failure Response');
                }
            },
            failure: function (response) {
                Ext.getBody().unmask();
                var resp = Ext.JSON.decode(response.responseText),
                    message = resp.message,
                    success = resp.success;
                toastr.error(message, 'Failure Response');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Ext.getBody().unmask();
                toastr.error('Error: ' + errorThrown, 'Error Response');
            }
        });
    } else {
        Ext.getBody().unmask();
        //It's a new application
    }
},
  prepareInspectionatownerpremreceivingpnl: function () {
    Ext.getBody().mask('Please wait...');
    var me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        invoice_cancellationfrm = activeTab.down('form'),
        invoice_id = activeTab.down('hiddenfield[name=invoice_id]'),
            invoice_no = activeTab.down('displayfield[name=invoice_no]'),
            paying_currency = activeTab.down('combo[name=paying_currency_id]'),
            isFastTrack = activeTab.down('checkbox[name=is_fast_track]'),
            save_btn = activeTab.down('button[name=save_btn]'),
            commit_btn = activeTab.down('button[name=commit_btn]'),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
         action_url = 'revenuemanagement/prepareInspectionatownerpremreceiving';
         var invoiceSummaryGrid = activeTab.down('invoicingcostdetailsgrid'),
            invoiceSummaryStore = invoiceSummaryGrid.store;
        table_name = 'tra_adhocinvoices_applications';
       if(application_code){
            Ext.Ajax.request({
                method: 'GET',
                url: action_url,
                params: {
                    application_code: application_code,
                    table_name:table_name
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success,
                        
                        isLocked = resp.isLocked,
                        is_fast_track = resp.is_fast_track,
                        results = resp.results;
                    
                    model = Ext.create('Ext.data.Model', results);

                    if (success == true || success === true) {

                        invoice_cancellationfrm.loadRecord(model);
                        activeTab.down('combo[name=zone_id]').setValue(resp.results.zone_id);
                        activeTab.down('hiddenfield[name=applicant_id]').setValue(results.applicant_id);
                        

                        paying_currency.setValue(results.paying_currency_id);

                        invoice_id.setValue(results.invoice_id);
                        invoice_no.setValue(results.invoice_no);

                        invoiceSummaryStore.removeAll();
                        invoiceSummaryStore.load({
                            params: {
                                invoice_id: results.invoice_id
                            }
                        });

                        if (isLocked == 1 || isLocked === 1) {
                            paying_currency.setReadOnly(true);
                            isFastTrack.setReadOnly(true);
                            save_btn.setVisible(false);
                            commit_btn.setDisabled(true);
                        }
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (response) {
                    Ext.getBody().unmask();
                    var resp = Ext.JSON.decode(response.responseText),
                        message = resp.message,
                        success = resp.success;
                    toastr.error(message, 'Failure Response');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Ext.getBody().unmask();
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });

       }
        
},
  revenuemanagementUniformTbHome: function (btn) {
      var me = this,
          dashwrapper = btn.dashwrapper,
          mainTabPanel = me.getMainTabPanel(),
          sec_dashboard = btn.sec_dashboard,
          activeTab = mainTabPanel.getActiveTab(),
          dashboardWrapper = activeTab.down(dashwrapper);
      if (!dashboardWrapper.down(sec_dashboard)) {
          dashboardWrapper.removeAll();
          dashboardWrapper.add({xtype: sec_dashboard});
      }
  },
  showInvoiceCancellationReqSubmissionWin: function (btn) {
      Ext.getBody().mask('Please wait...');
      var mainTabPanel = this.getMainTabPanel(),
          winWidth = btn.winWidth,
          action_url = btn.action_url,
          activeTab = mainTabPanel.getActiveTab(),
          form = activeTab.down('form').getForm(),
          invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue(),
          reference_no = activeTab.down('textfield[name=reference_no]').getValue(),
          tracking_no = activeTab.down('textfield[name=tracking_no]').getValue(),
          application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
          module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
          process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
          sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
          workflow_stage_id  = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
          receipt_id  = activeTab.down('hiddenfield[name=receipt_id]').getValue(),
          valid = form.isValid(),
          reason_for_cancellation = activeTab.down('form').down('textarea[name=reason_for_cancellation]').getValue();
          
          extraParams = [{
              field_type: 'hiddenfield',
              field_name: 'reason_for_cancellation',
              value: reason_for_cancellation
          },{
              field_type: 'hiddenfield',
              field_name: 'invoice_id',
              value: invoice_id
          },{
              field_type: 'hiddenfield',
              field_name: 'receipt_id',
              value: receipt_id
          },{
              field_type: 'hiddenfield',
              field_name: 'reference_no',
              value: reference_no
          },{
              field_type: 'hiddenfield',
              field_name: 'tracking_no',
              value: tracking_no
          },{
              field_type: 'hiddenfield',
              field_name: 'module_id',
              value: module_id
          },{
              field_type: 'hiddenfield',
              field_name: 'sub_module_id',
              value: sub_module_id
          },{
              field_type: 'hiddenfield',
              field_name: 'process_id',
              value: process_id
          }];

      if (valid == true || valid === true) {
          showWorkflowSubmissionRevenueWin( application_code, workflow_stage_id, 'revenuerequestsubmissionsfrm', winWidth, extraParams);
      } else {
          Ext.getBody().unmask();
      }

  },
  showCreditNoteRequestReqSubmissionWin: function (btn) {
      Ext.getBody().mask('Please wait...');
      var mainTabPanel = this.getMainTabPanel(),
          winWidth = btn.winWidth,
          action_url = btn.action_url,
          activeTab = mainTabPanel.getActiveTab(),
          form = activeTab.down('form').getForm(),
          invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue(),
          reference_no = activeTab.down('textfield[name=reference_no]').getValue(),
          tracking_no = activeTab.down('textfield[name=tracking_no]').getValue(),
          application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
          module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
          process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
          sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
          workflow_stage_id  = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
          receipt_id  = activeTab.down('hiddenfield[name=receipt_id]').getValue(),
          
          exchange_rate  = activeTab.down('hiddenfield[name=exchange_rate]').getValue(),
          credit_note_amount  = activeTab.down('textfield[name=credit_note_amount]').getValue(),
        
          valid = form.isValid(),
          reason_for_request = activeTab.down('form').down('textarea[name=reason_for_request]').getValue();
          currency_id = '';
          if(activeTab.down('combo[name=currency_id]')){
              currency_id  = activeTab.down('textfield[name=currency_id]').getValue();
          }
          extraParams = [{
              field_type: 'hiddenfield',
              field_name: 'reason_for_request',
              value: reason_for_request
          },{
              field_type: 'hiddenfield',
              field_name: 'invoice_id',
              value: invoice_id
          },{
              field_type: 'hiddenfield',
              field_name: 'receipt_id',
              value: receipt_id
          },{
              field_type: 'hiddenfield',
              field_name: 'reference_no',
              value: reference_no
          },{
              field_type: 'hiddenfield',
              field_name: 'tracking_no',
              value: tracking_no
          },{
              field_type: 'hiddenfield',
              field_name: 'module_id',
              value: module_id
          },{
              field_type: 'hiddenfield',
              field_name: 'sub_module_id',
              value: sub_module_id
          },{
              field_type: 'hiddenfield',
              field_name: 'process_id',
              value: process_id
          },{
              field_type: 'hiddenfield',
              field_name: 'exchange_rate',
              value: exchange_rate
          },{
              field_type: 'hiddenfield',
              field_name: 'credit_note_amount',
              value: credit_note_amount
          },{
              field_type: 'hiddenfield',
              field_name: 'currency_id',
              value: currency_id
          }];

      if (valid == true || valid === true) {
          showWorkflowSubmissionRevenueWin( application_code, workflow_stage_id, 'revenuerequestsubmissionsfrm', winWidth, extraParams);
      } else {
          Ext.getBody().unmask();
      }

  },
 
  showCreditNoteRequestReqSubmissionWin: function (btn) {
    Ext.getBody().mask('Please wait...');
    var mainTabPanel = this.getMainTabPanel(),
        winWidth = btn.winWidth,
        action_url = btn.action_url,
        activeTab = mainTabPanel.getActiveTab(),
        form = activeTab.down('form').getForm(),
        invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue(),
        reference_no = activeTab.down('textfield[name=reference_no]').getValue(),
        tracking_no = activeTab.down('textfield[name=tracking_no]').getValue(),
        application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
        module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
        process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
        sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue(),
        workflow_stage_id  = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
        receipt_id  = activeTab.down('hiddenfield[name=receipt_id]').getValue(),
        
        exchange_rate  = activeTab.down('hiddenfield[name=exchange_rate]').getValue(),
        credit_note_amount  = activeTab.down('textfield[name=credit_note_amount]').getValue(),
      
        valid = form.isValid(),
        reason_for_request = activeTab.down('form').down('textarea[name=reason_for_request]').getValue();
        currency_id = '';
        if(activeTab.down('combo[name=currency_id]')){
            currency_id  = activeTab.down('textfield[name=currency_id]').getValue();
        }
        extraParams = [{
            field_type: 'hiddenfield',
            field_name: 'reason_for_request',
            value: reason_for_request
        },{
            field_type: 'hiddenfield',
            field_name: 'invoice_id',
            value: invoice_id
        },{
            field_type: 'hiddenfield',
            field_name: 'receipt_id',
            value: receipt_id
        },{
            field_type: 'hiddenfield',
            field_name: 'reference_no',
            value: reference_no
        },{
            field_type: 'hiddenfield',
            field_name: 'tracking_no',
            value: tracking_no
        },{
            field_type: 'hiddenfield',
            field_name: 'module_id',
            value: module_id
        },{
            field_type: 'hiddenfield',
            field_name: 'sub_module_id',
            value: sub_module_id
        },{
            field_type: 'hiddenfield',
            field_name: 'process_id',
            value: process_id
        },{
            field_type: 'hiddenfield',
            field_name: 'exchange_rate',
            value: exchange_rate
        },{
            field_type: 'hiddenfield',
            field_name: 'credit_note_amount',
            value: credit_note_amount
        },{
            field_type: 'hiddenfield',
            field_name: 'currency_id',
            value: currency_id
        }];

    if (valid == true || valid === true) {
        showWorkflowSubmissionRevenueWin( application_code, workflow_stage_id, 'revenuerequestsubmissionsfrm', winWidth, extraParams);
    } else {
        Ext.getBody().unmask();
    }

},

  onPaymentProcessRequest: function (sub_module_id,dashwrapper) {
      Ext.getBody().mask('Please wait...');
      var me = this,
          mainTabPanel = me.getMainTabPanel(),
          activeTab = mainTabPanel.getActiveTab(),
          dashboardWrapper = activeTab.down(dashwrapper),
          module_id = activeTab.down('hiddenfield[name=module_id]').getValue();
         workflow_details = getInitialWorkflowDetailsNoProcess(module_id,sub_module_id);

      if (!workflow_details) {
          Ext.getBody().unmask();
          toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
          return false;
      }
      dashboardWrapper.removeAll();
      var workflowContainer = Ext.widget(workflow_details.viewtype);
      workflowContainer.down('displayfield[name=process_name]').setValue(workflow_details.processName);
      workflowContainer.down('displayfield[name=workflow_stage]').setValue(workflow_details.initialStageName);
      workflowContainer.down('displayfield[name=application_status]').setValue(workflow_details.applicationStatus);
      workflowContainer.down('hiddenfield[name=process_id]').setValue(workflow_details.processId);
      workflowContainer.down('hiddenfield[name=workflow_stage_id]').setValue(workflow_details.initialStageId);
      workflowContainer.down('hiddenfield[name=module_id]').setValue(module_id);
      workflowContainer.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
      
      dashboardWrapper.add(workflowContainer);
      //reload Stores 
      
      Ext.Function.defer(function () {
          Ext.getBody().unmask();
      }, 300);

      //load the stores

  },
  
 
  
  refreshgepgbillinvoicepostinggrid:function(me){
      var store = me.getStore(),
          grid = me.up('grid'),
          invoice_from  = grid.down('datefield[name=invoice_from]').getValue(), 
          invoice_to  = grid.down('datefield[name=invoice_to]').getValue();

          store.getProxy().extraParams = {
              invoice_to: invoice_to,
              invoice_from: invoice_from
          };
  }, refreshinvoicecancellationpnlgrid:function(me){
      
      var store = me.getStore(), 
          me = this,
          mainTabPanel = me.getMainTabPanel(),
          activeTab = mainTabPanel.getActiveTab(),
          module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
          sub_module_id = activeTab.down('hiddenfield[name=sub_module_id]').getValue();

          store.getProxy().extraParams = {
              module_id: module_id,
              sub_module_id:sub_module_id
          };
  },
  refreshrevrequestpaymentdetailsgrid:function(me){
      
      var store = me.getStore(), 
          me = this,
          mainTabPanel = me.getMainTabPanel(),
          activeTab = mainTabPanel.getActiveTab(),
          receipt_id = activeTab.down('hiddenfield[name=receipt_id]').getValue();
          invoice_id = activeTab.down('hiddenfield[name=invoice_id]').getValue();

          store.getProxy().extraParams = {
              receipt_id: receipt_id,
              invoice_id:invoice_id
          };
  },
  
  refreshgepgbillPaymentpostinggrid:function(me){
      var store = me.getStore(), grid = me.up('grid'),
          paid_todate  = grid.down('datefield[name=paid_todate]').getValue(), 
          paid_fromdate  = grid.down('datefield[name=paid_fromdate]').getValue();

          store.getProxy().extraParams = {
              paid_fromdate: paid_fromdate,
              paid_todate: paid_todate
          };
  },
   getRetentionPaySelectedTradersDetails:function(){
      var   me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
           applicantselection = activeTab.down('grid[name=retentionapplicantsselectiongrd]');
          store = applicantselection.store,
          applicant_id = '';
          rawData = store.getRange();
          console.log(rawData);
          rawData.forEach(function(record) {
              applicant_id += record.get('applicant_id')+',';
          })
          return applicant_id;
  },
  getSelectedTradersDetails:function(){
    var pnl = this.getRetentionchargespnl(),
         applicantselection = pnl.down('grid[name=retentionapplicantsselectiongrd]');
        store = applicantselection.store,
        applicant_id = '';
        rawData = store.getRange();
        console.log(rawData);
        rawData.forEach(function(record) {
            applicant_id += record.get('applicant_id')+',';
        })
        return applicant_id;
},
  
  refreshLinkretentionchargesgrid:function(me){
    var store = me.getStore(), grid = me.up('grid'),
        retention_yearfrom  = grid.down('combo[name=retention_yearfrom]').getValue(), 
        retention_yearto  = grid.down('combo[name=retention_yearto]').getValue();
        section_id  = grid.down('combo[name=section_id]').getValue();
        trader_name  = grid.down('textfield[name=trader_name]').getValue();

        store.getProxy().extraParams = {
            retention_yearfrom: retention_yearfrom,
            retention_yearto: retention_yearto,
            section_id: section_id,
            trader_name:trader_name
        };
  },
  refreshretentionchargesinvoicesgrid:function(me){
      var store = me.getStore(), grid = me.up('grid'),
           retention_yearfrom  = grid.down('combo[name=retention_yearfrom]').getValue(), 
           retention_yearto  = grid.down('combo[name=retention_yearto]').getValue();
           section_id  = grid.down('combo[name=section_id]').getValue();
           retention_status_id  = grid.down('combo[name=retention_status_id]').getValue();
           trader_ids  = this.getSelectedTradersDetails();
      if(trader_ids != ''){
          store.getProxy().extraParams = {
              retention_yearfrom: retention_yearfrom,
              retention_yearto: retention_yearto,
              section_id: section_id,
              retention_status_id: retention_status_id,
              trader_ids:trader_ids
          };
      }
      else{
          toastr.warning('Please select applicant details!!', 'Warning Response');

          return;
      }
  },  refreshretentionchargespaymentsgrid:function(me){
      var store = me.getStore(), grid = me.up('grid'),
           retention_yearfrom  = grid.down('combo[name=retention_yearfrom]').getValue(), 
           retention_yearto  = grid.down('combo[name=retention_yearto]').getValue();
           trans_datefrom  = grid.down('datefield[name=trans_datefrom]').getValue();
           trans_dateto  = grid.down('datefield[name=trans_dateto]').getValue();
           trader_ids  = this.getRetentionPaySelectedTradersDetails();
      if(trader_ids != ''){
          store.getProxy().extraParams = {
              retention_yearfrom: retention_yearfrom,
              retention_yearto: retention_yearto,
              trans_dateto: trans_dateto,
              trans_datefrom: trans_datefrom,
              trader_ids:trader_ids
          };
      }
      else{
          toastr.warning('Please select applicant details!!', 'Warning Response');

          return;
      }
  },
  funcPrintRetentionPaymentsStatement:function(btn){
    var  me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab();   
    grid = activeTab.down('retentionchargespaymentsgrid'),
            retention_yearfrom  = grid.down('combo[name=retention_yearfrom]').getValue(), 
            retention_yearto  = grid.down('combo[name=retention_yearto]').getValue();
            trans_datefrom  = grid.down('datefield[name=trans_datefrom]').getValue();
            trans_dateto  = grid.down('datefield[name=trans_dateto]').getValue();
            trader_ids  = this.getRetentionPaySelectedTradersDetails();
            trans_datefrom = Ext.Date.format(trans_datefrom,'Y-m-d'),
            trans_dateto = Ext.Date.format(trans_dateto,'Y-m-d');

            redirect = 'reports/printRetentionPaymentsStatement?retention_yearfrom='+retention_yearfrom+'&retention_yearto='+retention_yearto+'&trans_datefrom='+trans_datefrom+'&trans_dateto='+trans_dateto+'&trader_ids='+trader_ids;
        print_report(redirect);
  },
  onRetentionApplicantAddSelectedList:function(btn){
    
    var pnl = this.getRetentionchargespnl(),
        grid = btn.up('grid'),
        win = grid.up('window'),//retentionapplicantsselectiongrd
        retentionapplicantsselectiongrd = pnl.down('grid[name=retentionapplicantsselectiongrd]'),
        appselstore = retentionapplicantsselectiongrd.store,
        sm = grid.getSelectionModel(),
        selected_records = sm.getSelection(),
        selected = [];
  
    Ext.each(selected_records, function (item) {

        var applicant_data = {
                    name: item.data.applicant_name,
                    applicant_id: item.data.applicant_id,
                    country_name: item.data.country_name,
                    identification_no: item.data.identification_no
        };
        appselstore.insert(0, applicant_data);
      //  selected.push(obj);
    });

        win.close();

       
},
onRetentionPaymentApplicantAddSelectedList:function(btn){
    
    var pnl = this.getRetentionchargespaymentpnl(),
        grid = btn.up('grid'),
        win = grid.up('window'),//retentionapplicantsselectiongrd
        retentionapplicantsselectiongrd = pnl.down('grid[name=retentionapplicantsselectiongrd]'),
        appselstore = retentionapplicantsselectiongrd.store,
        sm = grid.getSelectionModel(),
        selected_records = sm.getSelection(),
        selected = [];
  
    Ext.each(selected_records, function (item) {

        var applicant_data = {
                    name: item.data.applicant_name,
                    applicant_id: item.data.applicant_id,
                    country_name: item.data.country_name,
                    identification_no: item.data.identification_no
        };
        appselstore.insert(0, applicant_data);
      //  selected.push(obj);
    });

        win.close();

       
},
  onRetentionApplicantSelectionListDblClick:function(view, record, rr){
    
          var pnl = this.getRetentionchargespnl(),
              grid = view.grid,
              win = grid.up('window'),
          retentionapplicantsselectiongrd = pnl.down('grid[name=retentionapplicantsselectiongrd]'),
              appselstore = retentionapplicantsselectiongrd.store;
              var applicant_data = {
                          name: record.get('applicant_name'),
                          applicant_id: record.get('applicant_id'),
                          country_name: record.get('country_name'),
                          identification_no: record.get('identification_no')
              };
              appselstore.insert(0, applicant_data);
              win.close();

             
  },
  onRetentionPaymentApplicantSelectionListDblClick:function(view, record, rr){
    
          var pnl = this.getRetentionchargespaymentpnl(),
              grid = view.grid,
              win = grid.up('window'),
          retentionapplicantsselectiongrd = pnl.down('grid[name=retentionapplicantsselectiongrd]'),
              appselstore = retentionapplicantsselectiongrd.store;
              var applicant_data = {
                          name: record.get('applicant_name'),
                          applicant_id: record.get('applicant_id'),
                          country_name: record.get('country_name'),
                          identification_no: record.get('identification_no')
              };
              appselstore.insert(0, applicant_data);
              win.close();

             
  },
  applicationinvoicesgridDblClick:function(view, record){

          var pnl = this.getRetentionchargespnl(),
              grid = view.grid,
              win = grid.up('window'),
              me = this,
              mainTabPanel = me.getMainTabPanel(),
              activeTab = mainTabPanel.getActiveTab(),
              invoice_id = record.get('invoice_id'),
              form = activeTab.down('form'),
              grid =  activeTab.down('revmanagementinvoicingcostdetailsgrid'),
              store = grid.store;

              form.loadRecord(record);
              store.load({params:{invoice_id:invoice_id}})
              if(activeTab.down('revrequestpaymentdetailsgrid')){
                  grid =  activeTab.down('revrequestpaymentdetailsgrid'),
               store = grid.store;
                  store.load();
              }
              win.close();
  },

  revenueimportexportspermitgridDblClick:function(view, record){
                var me = this,
                    grid = view.grid,
                    win = grid.up('window'),
                    mainTabPanel = me.getMainTabPanel(),
                    activeTab = mainTabPanel.getActiveTab();
                    revenueapplicantdetailsfrm = activeTab.down('revenueapplicantdetailsfrm');

                    revenueapplicantdetailsfrm.getForm().loadRecord(record);
                    
                    activeTab.down('displayfield[name=impexport_permitno]').setValue(record.get('reference_no'));
                    activeTab.down('hiddenfield[name=permitapplication_code]').setValue(record.get('application_code'));
                    
                    activeTab.down('hiddenfield[name=section_id]').setValue(record.get('section_id'));
                    activeTab.down('hiddenfield[name=applicant_id]').setValue(record.get('applicant_id'));

                    if(Ext.getStore('premiinspimpextpermitsproductsstr')){
                        Ext.getStore('premiinspimpextpermitsproductsstr').load({param:{application_code:record.get('application_code')}});

                    }
                     win.close();

  },
  refreshpremiinspimpextpermitsproductsgrid:function(me){
      
    var store = me.getStore(), 
        me = this,
        mainTabPanel = me.getMainTabPanel(),
        activeTab = mainTabPanel.getActiveTab(),
        permitapplication_code = activeTab.down('hiddenfield[name=permitapplication_code]').getValue();

        store.getProxy().extraParams = {
            application_code: permitapplication_code
        };
}
});