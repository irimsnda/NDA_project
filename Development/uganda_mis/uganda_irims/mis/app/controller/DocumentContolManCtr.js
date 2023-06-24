Ext.define('Admin.controller.DocumentContolManCtr', {
  extend: 'Ext.app.Controller',
  stores: [
     'Admin.store.controldocumentman.ControlDocumentManagementdashstr',
     'Admin.store.controldocumentman.ControllledDocumentsAccessStr'
  ],
  config: {
      refs: [{
          ref: 'mainPanel',
          selector: 'maincontainerwrap'
      }, {
          ref: 'mainTabPanel',
          selector: '#contentPanel'
      }],
      control: {
          'onlineimportexportappsgrid': {
             // refresh: 'refreshonlineimportexportappsgrid'
          },
          'newdocumentcontrolrequest': {
            afterrender: 'prepareNewControlDocumentRequest'
        }, 'reviewdocumentcontrolrequest': {
            afterrender: 'prepareNewControlDocumentRequest'
        }, 'approvalnewdocumentcontrolrequest': {
            afterrender: 'prepareNewControlDocumentRequest'
        },

          'controldocpreviewmasterlistgrid':{
                itemdblclick: 'onControlDocPreviewMasterDblClick'
          }, 'controldocumentsreglistgrid':{
                itemdblclick: 'onControlDocPreviewMasterDblClick'
        },
          
          'controldocument_managementtb button[name=permithome_btn]': {
                click: 'funcCOntrolDocumentOnHome'
            },
            'controldocument_managementdashgrid': {
                refresh: 'refreshControlDocumentMainGrids'
            },'controldocumentsaccessmanagementgrid': {
                refresh: 'refreshControldocumentsaccessmanagementgrid'
            },
            'previouscontrollleddocumentsaccessgrid': {
                refresh: 'refreshpreviouscontrollleddocumentsaccessgrid'
            },
            
            'newdocumentcontrolrequest button[name=process_submission_btn]': {
                click: 'showControlDocumetnReceivinSubmissionWin'
            },'reviewdocumentcontrolrequestfrm button[name=process_submission_btn]': {
                click: 'showControlDocumetnReceivinSubmissionWin'
            },
            'approvalnewdoccontrolrequestpnl button[name=process_submission_btn]': {
                click: 'showControlDocumetnReceivinSubmissionWin'
            },
            
            
        }
      },
      //onViewControlDocumentApplication
      listen: {
        controller: {
            '*': {
              showControlDocumentProcessWorkflow:'showControlDocumentProcessWorkflow',
               showControlDocumentApplication:'showControlDocumentApplication',
                     
            }
        }
    }, 
    
    showControlDocumetnReceivinSubmissionWin: function (btn) {
        Ext.getBody().mask('Please wait...');
        
        var mainTabPanel = this.getMainTabPanel(),
            storeID = btn.storeID,
            table_name = btn.table_name,
            winWidth = btn.winWidth,
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            application_code = activeTab.down('hiddenfield[name=active_application_code]').getValue(),
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            storeID = 'controldocumentmanagementdashstr';
            
        valid = this.validateNewControlDocumentSubmission(application_code);
        if (valid) {
            Ext.Ajax.request({
                method: 'GET',
                async: true,
                url: 'controldocumentsmng/validateDocumentUploadExists',
                params: {
                    application_code: application_code
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success;
                        Ext.getBody().unmask();
                       
                    if (!success) {
                        results = resp.results;
                        toastr.warning('Please Upload the required Control Document Details!!', 'Warning Response');
                        return false;
                    }
                    else{
                        showWorkflowSubmissionWin(application_id, application_code, table_name, 'workflowsubmissionsreceivingfrm', winWidth, storeID,'','','',workflow_stage_id);
                      
                    }
                   
                }
            });
            
          
        } else {
            Ext.getBody().unmask();
            toastr.warning('Please Enter All the required Document Details!!', 'Warning Response');
            return;
        }
    },
    validateNewControlDocumentSubmission: function (application_code) {
        var mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            newdocumentcontrolrequestfrm = activeTab.down('#documentcontrolrequestfrm');

        if (!newdocumentcontrolrequestfrm.isValid()) {
            toastr.warning('Please Enter All the required Control Document Details!!', 'Warning Response');
            return false;
        }
        
        return true;
    },
    
    prepareNewControlDocumentRequest: function () {

        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_status_id = activeTab.down('hiddenfield[name=application_status_id]').getValue(),

            app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore(),
            newdocumentcontrolrequestfrm = activeTab.down('#documentcontrolrequestfrm'),
            is_readonly = newdocumentcontrolrequestfrm.is_readonly,
            
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue(),
            process_id = activeTab.down('hiddenfield[name=process_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
           
            workflow_stage_id = activeTab.down('hiddenfield[name=workflow_stage_id]').getValue();

            activeTab.down('#documentcontrolrequestfrm').getViewModel().set('isReadOnly', is_readonly);
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: process_id,
                workflow_stage: workflow_stage_id
            }
        });

        
        if (application_id) {
            Ext.Ajax.request({
                method: 'GET',
                url: 'controldocumentsmng/prepareNewControlDocumentRequest',
                params: {
                    application_id: application_id
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

                        newdocumentcontrolrequestfrm.loadRecord(model);
                       
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
    refreshControlDocumentMainGrids: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = (grid.down('combo[name=sub_module_id]')) ? grid.down('combo[name=sub_module_id]').getValue() : null,
            workflow_stage_id = (grid.down('combo[name=workflow_stage_id]')) ? grid.down('combo[name=workflow_stage_id]').getValue() : null;

            store.getProxy().extraParams = {
                module_id: module_id,
                sub_module_id: sub_module_id,
                workflow_stage_id: workflow_stage_id
            };

    },
    refreshControldocumentsaccessmanagementgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            mainTabPanel = this.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            application_id = activeTab.down('hiddenfield[name=active_application_id]').getValue();
            
            store.getProxy().extraParams = {
                application_id: application_id
            };

    },refreshpreviouscontrollleddocumentsaccessgrid: function (me) {
        var store = me.store,
            grid = me.up('grid'),
            reg_doccontrolreview_id = grid.down('hiddenfield[name=reg_doccontrolreview_id]').getValue();
            alert();
            store.getProxy().extraParams = {
                reg_doccontrolreview_id: reg_doccontrolreview_id
            };

    },
    
    funcCOntrolDocumentOnHome: function (btn) {
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            sec_dashboard = btn.sec_dashboard,
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#controldocument_managementdashwrapper');
        if (!dashboardWrapper.down(sec_dashboard)) {
            dashboardWrapper.removeAll();
            dashboardWrapper.add({ xtype: sec_dashboard });
        }
    },
    onControlDocPreviewMasterDblClick:function(grid, record){
        var me = this,
            win = grid.up('window'),
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            form = activeTab.down('#documentcontrolrequestfrm'),
            controlDocfrm = activeTab.down('#documentcontrolrequestfrm').getForm();
            win.close();
            controlDocfrm.loadRecord(record);
            
    },
    showControlDocumentApplication: function (sub_module_id,btn) {
        Ext.getBody().mask('Please wait...');
        var me = this,
            mainTabPanel = me.getMainTabPanel(),
            activeTab = mainTabPanel.getActiveTab(),
            dashboardWrapper = activeTab.down('#controldocument_managementdashwrapper'),
            module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
            section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
            filter = {section_id: section_id};
            workflow_details = getInitialWorkflowDetails(module_id, '', sub_module_id);

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
       // workflowContainer.down('hiddenfield[name=section_id]').setValue(section_id);
        dashboardWrapper.add(workflowContainer);
        //reload Stores 
        var app_doc_types_store = activeTab.down('combo[name=applicable_documents]').getStore();
        app_doc_types_store.removeAll();
        app_doc_types_store.load({
            params: {
                process_id: workflow_details.processId,
                workflow_stage: workflow_details.initialStageId
            }
        });
        Ext.Function.defer(function () {
            Ext.getBody().unmask();
        }, 300);

        //load the stores

    },
    showControlDocumentProcessWorkflow: function (sub_module_id) {
      Ext.getBody().mask('Please wait...');
      var me = this,
          mainTabPanel = me.getMainTabPanel(),
          activeTab = mainTabPanel.getActiveTab(),
          dashboardWrapper = activeTab.down('#dashboardWrapper'),
          module_id = activeTab.down('hiddenfield[name=module_id]').getValue(),
          section_id = activeTab.down('hiddenfield[name=section_id]').getValue(),
          workflow_details = getBasicWorkflowDetails(module_id, section_id, sub_module_id);
      if (!workflow_details) {
          Ext.getBody().unmask();
          toastr.warning('Problem encountered while fetching workflow details-->Possibly workflow not set!!', 'Warning Response');
          return false;
      }
      dashboardWrapper.removeAll();
      var workflowContainer = Ext.widget('workflowcontainerpnlgeneric');
      workflowContainer.down('displayfield[name=workflow_name]').setValue(workflow_details.name);
      workflowContainer.down('hiddenfield[name=active_workflow_id]').setValue(workflow_details.workflow_id);
      dashboardWrapper.add(workflowContainer);
      Ext.Function.defer(function () {
          Ext.getBody().unmask();
      }, 300);
  },
    })