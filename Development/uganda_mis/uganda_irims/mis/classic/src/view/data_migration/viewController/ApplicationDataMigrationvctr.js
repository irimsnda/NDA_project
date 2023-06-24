Ext.define('Admin.view.applicationsammendment.viewcontrollers.ApplicationDataMigrationvctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.applicationdatmigrationvctr',

    /**
     * Called when the view is created
     */
    init: function () {

    },
	
    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },
    
    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },onChangeMarketAuthorisationRequest: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onChangeMarketAuthorisationRequest', application_type);
    },
     setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },
    onltrchangeRequest: function (btn) {
        var application_type = btn.app_type;
        this.fireEvent('onltrchangeRequest', application_type);
    },
    
    setConfigCombosSectionfilterStore: function (obj, options) {
        this.fireEvent('setConfigCombosStoreWithSectionFilter', obj, options);
    },

    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },
    showappdatamigrationrequestsfrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            grid = btn.up('grid'),
            module_id = grid.module_id,
            formWidget = btn.form,
            title = btn.winTitle,
            width = btn.winWidth,
            form = Ext.widget(formWidget),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.down('hiddenfield[name=module_id]').setValue(module_id)
        funcShowCustomizableWindow(title, width, form, 'customizablewindow');
        /*} else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }*/
    },
    showappdatamigrationrequestsfrmEdit: function (item) {
        // if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            formWidget = item.form,
            width = item.winWidth,
            winTitle = item.winTitle,
            record = btn.getWidgetRecord(),
            form = Ext.widget(formWidget),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, width, form, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },
    doUploadappdatamigrationrequest: function (btn) {
        this.fireEvent('doUploadappdatamigrationrequest', btn);
    },
    
    doSaveappdatamigrationrequest: function (btn) {
        this.fireEvent('doSaveappdatamigrationrequest', btn);
    },
    doDeleteWorkflowWidgetParam: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            id = record.get('id'),
            storeID = item.storeID,
            table_name = item.table_name,
            url = item.action_url;
        this.fireEvent('deleteRecord', id, table_name, storeID, url);
        /*  } else {
              toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
              return false;
          }*/
    },showappdatamigrationdataErrors: function (item) {
        //if (this.fireEvent('checkFullAccess')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            error_message = record.get('error_message');
        alert('The following errors have been detected: '+error_message);
        
    },
    
    showApplicationDataMigrationPanel: function (item) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            migration_request_id = record.get('id'),
            workflow_name = record.get('name'),
            module_id = record.get('module_id'),
            sub_module_id = record.get('sub_module_id'),
            grid = btn.up('grid'),
            panel = grid.up('panel'),
            containerPnl = Ext.widget('productappdatamigrationspnl');
            containerPnl.down('displayfield[name=migration_name]').setValue(workflow_name);
            containerPnl.down('hiddenfield[name=migration_request_id]').setValue(migration_request_id);
            containerPnl.down('hiddenfield[name=module_id]').setValue(module_id);
            containerPnl.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);
            grid.hide();
            panel.add(containerPnl);
            
    },
    //
    showappdatamigrationuploadfrm: function (btn) {
       
        var me = this,
            grid = btn.up('grid'),
            migration_request_id = grid.down('hiddenfield[name=migration_request_id]').getValue(),
            table_name = grid.down('hiddenfield[name=table_name]').getValue(),
            module_id = grid.down('hiddenfield[name=module_id]').getValue(),
            sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
            formWidget = btn.form,
            title = btn.winTitle,
            width = btn.winWidth,
            storeId = btn.storeId
            form = Ext.widget(formWidget),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.down('hiddenfield[name=migration_request_id]').setValue(migration_request_id);
        form.down('hiddenfield[name=table_name]').setValue(table_name);
        form.down('hiddenfield[name=module_id]').setValue(module_id);
        form.down('hiddenfield[name=sub_module_id]').setValue(sub_module_id);

        funcShowCustomizableWindow(title, width, form, 'customizablewindow');
      
    },
    downloadappdatamigrationuploadTemplate:function(btn){
            var grid = btn.up('grid'),
                module_id = grid.down('hiddenfield[name=module_id]').getValue();
                var action_url = 'migrationscripts/downloadappdatamigrationuploadTemplate?module_id=' + module_id;
                print_report(action_url);

    },showappdatamigrationdatafrmEdit:function(btn) {
        var grid = btn.up('grid'),
        migration_request_id = grid.down('hiddenfield[name=migration_request_id]').getValue();
        module_id = grid.down('hiddenfield[name=module_id]').getValue();
        Ext.getBody().mask('loading...');
        Ext.Ajax.request({
                          url: 'migrationscripts/getParameterFormColumnsConfig',
                          method: 'GET',
                          params: {
                            migration_request_id: migration_request_id,
                            module_id:module_id
                          },
                          headers: {
                              'Authorization': 'Bearer ' + access_token,
                              'X-CSRF-Token': token
                          },
                          success: function (response) {
  
                              var resp = Ext.JSON.decode(response.responseText),
                                  success = resp.success,
                                  message = resp.message,
                                  table_name = resp.table_name,
                                  main_fields = resp.main_fields;
                                
                              if (success == true || success === true) {
                                  var form = Ext.create('Ext.form.Panel',{
                                      controller: 'configurationsvctr',
                                      autoScroll: true,
                                      width: '80%',
                                      layout: {
                                        type: 'column'
                                    },
                                    
                                      frame: true,
                                      maxHeight: Ext.Element.getViewportHeight() - 118,
                                      bodyPadding: 8,
                                      defaults: {
                                            columnWidth: 0.33,
                                            margin: 5,
                                            labelAlign: 'top',
                                            allowBlank: false,
                                            
                                        },
                                        items: [{
                                              xtype: 'hiddenfield',
                                              margin: '0 20 20 0',
                                              name: 'table_name',
                                              value: table_name+'',
                                              allowBlank: true
                                          }, {
                                              xtype: 'hiddenfield',
                                              margin: '0 20 20 0',
                                              name: '_token',
                                              value: token,
                                              allowBlank: true
                                          }, {
                                              xtype: 'hiddenfield',
                                              fieldLabel: 'id',
                                              margin: '0 20 20 0',
                                              name: 'id',
                                              allowBlank: true
                                          }],
                                          dockedItems:[
                                          {
                                              xtype: 'toolbar',
                                              ui: 'footer',
                                              dock: 'bottom',
                                              items:[
                                                  '->',{
                                                      text: 'Save Details',
                                                      iconCls: 'x-fa fa-save',
                                                      action: 'save',
                                                      table_name: table_name,
                                                      storeID: table_name+'Str',
                                                      formBind: true,
                                                      ui: 'soft-purple',
                                                      action_url: 'configurations/saveConfigCommonData',
                                                      handler: 'doCreateConfigParamWin'
                                                  }
                                              ]
                                          }
                                      ]
                                  });
                              var counter = 1
                              for (var i = main_fields.length - 1; i >= 0; i--) {
  
                                      var field = Ext.create('Ext.form.TextField',{
                                          name: main_fields[i]['field'],
                                          fieldLabel: main_fields[i]['field'],
                                          allowBlank: main_fields[i]['null'],
                                      }); 
                                 
                                 
                                  counter++;
                                  form.insert(1,field);
  
                              }
                             
                              if(btn.action == 'edit'){
                                 var item = btn.up('button'),
                                     record = item.getWidgetRecord();
                                  form.loadRecord(record);
                              }
                              Ext.getBody().unmask();
                              funcShowCustomizableWindow(btn.winTitle, btn.winWidth, form, 'customizablewindow');
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
  
    renderAppDataMigrationsGridColumnsConfig: function(item) {
        //var navigationTreeList
        item.setLoading(true);
       var  btn = item.up('button'),
            record =  btn.getWidgetRecord(),
            table_name = item.table_name,
            title = item.title,
            storeID = item.storeID,
            migration_request_id = record.get('id');
            module_id = record.get('module_id');
            sub_module_id = record.get('sub_module_id');
            Ext.getBody().mask('Rendering the Migration Datasets...');
                Ext.Ajax.request({
                        url: 'migrationscripts/getAppDataMigrationsGridColumnsConfig',
                        method: 'GET',
                        params: {
                            table_name: table_name
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {

                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success,
                                message = resp.message,
                                result = resp.results;
                            if (success == true || success === true) {
                                
                                var panel = Ext.create('Ext.panel.Panel',{
                                    viewModel: 'configurationsvm',
                                    controller: 'applicationdatmigrationvctr',
                                    title: title,
                                    closable: true,
                                    userCls: 'big-100 small-100',
                                    height: Ext.Element.getViewportHeight() - 118,
                                    dockedItems: [
                                        {
                                            xtype: 'toolbar',
                                            dock: 'top',
                                            ui: 'footer',
                                            height: 35,
                                            layout: 'fit',
                                            items: [{
                                                xtype: 'displayfield',
                                                name: 'migration_name',
                                                labelAlign: 'right',
                                                fieldStyle: {
                                                    'color': 'green',
                                                    'font-weight': 'bold',
                                                    'font-size': '17px',
                                                    'text-align': 'center'
                                                }
                                            }
                                            ]
                                        }
                                    ],
                                    layout:{
                                        type: 'fit'
                                    },
                                    items: []
                                });
                                var grid = Ext.create('Ext.grid.Panel',{
                                                cls: 'dashboard-todo-list',
                                                autoScroll: true,
                                                autoHeight: true,
                                                width: '100%',
                                                //height: Ext.Element.getViewportHeight() - 118,
                                                viewConfig: {
                                                    deferEmptyText: false,
                                                    emptyText: 'Nothing to display',
                                                    getRowClass: function (record, rowIndex, rowParams, store) {
                                                        var is_enabled = record.get('has_error');
                                                        if (is_enabled == 1 || is_enabled === 1) {
                                                            return 'invalid-row';
                                                        }
                                                    }
                                                },
                                               
                                                selModel: {
                                                    selType: 'checkboxmodel',
                                                    mode: 'MULTI'
                                                },
                                                plugins: [{
                                                    ptype: 'gridexporter'
                                                }, {
                                                    ptype: 'cellediting',
                                                    clicksToEdit: 1,
                                                    editing: true
                                                },{
                                                    ptype: 'filterfield'
                                                }],
                                                tbar: [{
                                                    xtype: 'button',
                                                    text: 'Download Upload Template',
                                                    iconCls: 'x-fa fa-plus',
                                                    ui: 'soft-green',
                                                    winTitle: 'Download Upload Template',
                                                    winWidth: '35%',
                                                    handler: 'downloadappdatamigrationuploadTemplate',
                                                    stores: '[]'
                                                },{
                                                    xtype: 'button',
                                                    text: 'Upload Application Datasets',
                                                    iconCls: 'x-fa fa-plus',
                                                    
                                                    ui: 'soft-green',
                                                    winTitle: 'Upload Application Datasets',
                                                    winWidth: '35%',
                                                    form: 'appdatamigrationuploadfrm',
                                                    handler: 'showappdatamigrationuploadfrm',
                                                    stores: '[]'
                                                }, {
                                                    xtype:'hiddenfield',
                                                    name: 'module_id',
                                                    value:module_id                                            
                                                },{
                                                    xtype:'hiddenfield',
                                                    name: 'sub_module_id',
                                                    value:sub_module_id 
                                            
                                                },{
                                                    xtype:'hiddenfield',
                                                    name: 'migration_request_id',
                                                    value: migration_request_id
                                                },{
                                                    xtype:'hiddenfield',
                                                    value: table_name,
                                                    name: 'table_name'
                                                },{
                                                    xtype: 'hiddenfield',
                                                    name: 'db_con',
                                                    fieldLabel: 'db_con',
                                                    allowBlank: true
                                                }, {
                                                    xtype: 'exportbtn'
                                                }],
                                               
                                                export_title: title+'',
                                                bbar: [{
                                                    xtype: 'pagingtoolbar',
                                                    width: '40%',
                                                    displayInfo: true,
                                                    displayMsg: 'Showing {0} - {1} of {2} total records',
                                                    emptyMsg: 'No Records',
                                                    beforeLoad: function() {
                                                        var store = this.getStore(),
                                                        grid = this.up('grid'),
                                                        migration_request_id = grid.down('hiddenfield[name=migration_request_id]').getValue();
                                        
                                                        store.getProxy().extraParams = {
                                                            migration_request_id: migration_request_id
                                                        }
                                                        }
                                                },'->',{
                                                    text:'Delete Migrated (Selected) Application Datasets',
                                                    handler:'deleteApplicationMigratedDataSets',
                                                    iconCls: 'x-fa fa-plus',
                                                    ui: 'soft-red'
                                    
                                                },{
                                                    text:'Sychronise Migrated (Selected) Application Datasets',
                                                    handler:'synApplicationMigratedDataSets',
                                                    iconCls: 'x-fa fa-plus',
                                                    ui: 'soft-green'
                                    
                                                }],
                                                features: [{
                                                    ftype: 'searching',
                                                    minChars: 2,
                                                    mode: 'local'
                                                }],
                                                listeners: {
                                                    beforerender: {
                                                        fn: 'setConfigGridsStore',
                                                        config: {
                                                            storeId: table_name+'Str',
                                                            pageSize: 500, 
                                                            remoteFilter: false,
                                                            totalProperty:'totals',
                                                            proxy: {
                                                                url: 'migrationscripts/getProductAppdataMigrationDetails',
                                                                reader: {
                                                                    type: 'json',
                                                                    totalProperty: 'totals'
                                                                },
                                                            }
                                                        },
                                                        isLoad: true
                                                    }
                                                },
                                            
                                            columns:[{
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'has_error',
                                                    text: 'Has Error',
                                                    width: 180,
                                                    tdCls: 'wrap-text',
                                                    renderer: function (value, metaData) {
                                                        if (value !=1) {
                                                            metaData.tdStyle = 'color:white;background-color:green';
                                                            return "Validated";
                                                        }
                                                        metaData.tdStyle = 'color:white;background-color:red';
                                                        return "Has Errors";
                                                    },
                                                    filter: {
                                                        xtype: 'textfield'
                                                    }
                                                },{
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'is_synchronised',
                                                    text: 'IS Synchronised',
                                                    width: 180,
                                                    tdCls: 'wrap-text',
                                                    renderer: function (value, metaData) {
                                                        if (value==1) {
                                                            metaData.tdStyle = 'color:white;background-color:green';
                                                            return "True";
                                                        }
                                                        metaData.tdStyle = 'color:white;background-color:red';
                                                        return "False";
                                                    },
                                                    filter: {
                                                        xtype: 'textfield'
                                                    }
                                                },{
                                                text: 'Options',
                                                xtype: 'widgetcolumn',
                                                width: 90,
                                                widget: {
                                                    width: 75,
                                                    textAlign: 'left',
                                                    xtype: 'splitbutton',
                                                    iconCls: 'x-fa fa-th-list',
                                                    ui: 'gray',
                                                    menu: {
                                                        xtype: 'menu',
                                                        items: [{
                                                            text: 'View Errors',
                                                            iconCls: 'x-fa fa-edit',
                                                            tooltip: 'Edit Workflow',
                                                            action: 'edit',
                                                            winTitle: 'View Errors',
                                                            winWidth: '35%',
                                                            handler: 'showappdatamigrationdataErrors',
                                                            stores: '[]'
                                                        }, {
                                                            text: 'Edit Migration Request',
                                                            iconCls: 'x-fa fa-edit',
                                                            tooltip: 'Edit Workflow',
                                                            action: 'edit',storeID: storeID,
                                                            form: 'appdatamigrationrequestfrm',
                                                            winTitle: 'Product Application Migrations Details',
                                                            winWidth: '35%',
                                                            handler: 'showappdatamigrationdatafrmEdit',
                                                            stores: '[]'
                                                        }
                                                        ]
                                                    }
                                                }
                                            }]
                                            });
                                //add columns
                                for (var i = result.length - 1; i >= 0; i--) {
                                    var column = Ext.create('Ext.grid.column.Column', {
                                            text: result[i].toUpperCase()+'',
                                            dataIndex: result[i]+'',
                                            width: 180,
                                            tbCls: 'wrap',
                                            filter: {
                                                xtype: 'textfield'
                                            }
                                        });
                                     grid.headerCt.insert(
                                          grid.columns.length-3, 
                                          column);
                                  }
                                grid.down('hiddenfield[name=migration_request_id]').setValue(migration_request_id);

                                
                                panel.add(grid);

                                var main_panel =  Ext.ComponentQuery.query("#contentPanel")[0];
                                main_panel.add(panel);
                                item.setLoading(false);
                                main_panel.setActiveTab(main_panel.items.length-1);

                            } else {
                                item.setLoading(false);
                                toastr.error(message, 'Failure Response');
                            }
                            Ext.getBody().unmask();
                        },
                        failure: function (response) {
                             btn.setLoading(false);
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                             btn.setLoading(false);
                            toastr.error('Error: ' + errorThrown, 'Error Response');
                        }
            });
            
      
      
  },
  renderDataMigrationsReportsPanelConfig: function(pnl) {

   var  module_id = pnl.module_id,
        table_name = pnl.table_name;
        Ext.getBody().mask('Rendering the Migrated Datasets...');
            Ext.Ajax.request({
                    url: 'migrationscripts/getAppDataMigrationsGridColumnsConfig',
                    method: 'GET',
                    params: {
                        table_name: table_name
                    },
                    headers: {
                        'Authorization': 'Bearer ' + access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {

                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message,
                            result = resp.results,
                            storeID  = table_name+'Str';
                        if (success == true || success === true) {
                            
                            var grid = Ext.create('Ext.grid.Panel',{
                                            cls: 'dashboard-todo-list',
                                            autoScroll: true,
                                            autoHeight: true,
                                            width: '100%',
                                            viewModel: 'configurationsvm',
                                controller: 'applicationdatmigrationvctr',
                                title: 'Migrated Application Datasets',
                                            //height: Ext.Element.getViewportHeight() - 118,
                                            viewConfig: {
                                                deferEmptyText: false,
                                                emptyText: 'Nothing to display',
                                                getRowClass: function (record, rowIndex, rowParams, store) {
                                                    var is_enabled = record.get('has_error');
                                                    if (is_enabled == 1 || is_enabled === 1) {
                                                        return 'invalid-row';
                                                    }
                                                }
                                            },
                                            selModel: {
                                                selType: 'checkboxmodel',
                                                mode: 'MULTI'
                                            },
                                            plugins: [{
                                                ptype: 'gridexporter'
                                            }, {
                                                ptype: 'cellediting',
                                                clicksToEdit: 1,
                                                editing: true
                                            },{
                                                ptype: 'filterfield'
                                            }],
                                            tbar: [{
                                                xtype: 'button',
                                                text: 'Download Upload Template',
                                                iconCls: 'x-fa fa-plus',
                                                ui: 'soft-green',
                                                winTitle: 'Download Upload Template',
                                                winWidth: '35%',
                                                handler: 'downloadappdatamigrationuploadTemplate',
                                                stores: '[]'
                                            },{
                                                xtype: 'button',
                                                text: 'Upload Application Datasets',
                                                hidden: true,
                                                iconCls: 'x-fa fa-plus',
                                                
                                                ui: 'soft-green',
                                                winTitle: 'Upload Application Datasets',
                                                winWidth: '35%',
                                                form: 'appdatamigrationuploadfrm',
                                                handler: 'showappdatamigrationuploadfrm',
                                                stores: '[]'
                                            }, {
                                                xtype:'hiddenfield',
                                                name: 'module_id',
                                                value:module_id                                            
                                            },{
                                                xtype:'hiddenfield',
                                                value: table_name,
                                                name: 'table_name'
                                            },{
                                                xtype: 'combo',
                                                emptyText: 'Product Type',
                                                labelWidth: 80,
                                                width: 260,
                                                valueField: 'id',
                                                displayField: 'name',
                                                forceSelection: true,
                                                name: 'section_id',
                                                queryMode: 'local',
                                                fieldStyle: {
                                                    'color': 'green',
                                                    'font-weight': 'bold'
                                                },
                                                listeners: {
                                                    beforerender: {
                                                        fn: 'setOrgConfigCombosStore',
                                                        config: {
                                                            pageSize: 100,
                                                            proxy: {
                                                                extraParams: {
                                                                    model_name: 'Section'
                                                                }
                                                            }
                                                        },
                                                        isLoad: true
                                                    },
                                                    change: function (cmbo, newVal) {
                                                        var grid = cmbo.up('grid');
                                                        grid.getStore().load();
                                                    }
                                                },
                                                triggers: {
                                                    clear: {
                                                        type: 'clear',
                                                        hideWhenEmpty: true,
                                                        hideWhenMouseOut: false,
                                                        clearOnEscape: true
                                                    }
                                                }
                                            }, {
                                                xtype: 'combo',
                                                emptyText: 'SUB MODULE',
                                                labelWidth: 80,
                                                width: 260,
                                                valueField: 'id',
                                                displayField: 'name',
                                                forceSelection: true,
                                                name: 'sub_module_id',
                                                queryMode: 'local',
                                                fieldStyle: {
                                                    'color': 'green',
                                                    'font-weight': 'bold'
                                                },
                                                listeners: {
                                                    beforerender: {
                                                        fn: 'setWorkflowCombosStore',
                                                        config: {
                                                            pageSize: 1000,
                                                            proxy: {
                                                                url: 'workflow/getSystemSubModules',
                                                                extraParams: {
                                                                    model_name: 'SubModule'
                                                                }
                                                            }
                                                        },
                                                        isLoad: false
                                                    },
                                                    change: function (cmbo, newVal) {
                                                        var grid = cmbo.up('grid');
                                                        grid.getStore().load();
                                                    },
                                                    afterrender:function(cbo){
                                                        var grid = cbo.up('grid'),
                                                            module_id = grid.module_id,
                                                            sub_module_str = cbo.getStore();
                                                            sub_module_str.removeAll();
                                                            sub_module_str.load({params: {module_id: module_id}});
                                                            grid.getStore().load();
                                        
                                                    }
                                                },
                                                triggers: {
                                                    clear: {
                                                        type: 'clear',
                                                        hideWhenEmpty: true,
                                                        hideWhenMouseOut: false,
                                                        clearOnEscape: true
                                                    }
                                                }
                                            } ,{
                                                xtype: 'hiddenfield',
                                                name: 'db_con',
                                                fieldLabel: 'db_con',
                                                allowBlank: true
                                            }, {
                                                xtype: 'exportbtn'
                                            }],
                                           
                                            export_title: 'Data Migration',
                                            bbar: [{
                                                xtype: 'pagingtoolbar',
                                                width: '100%',
                                                displayInfo: true,
                                                displayMsg: 'Showing {0} - {1} of {2} total records',
                                                emptyMsg: 'No Records',
                                                beforeLoad: function() {
                                                    var store = this.getStore(),
                                                    grid = this.up('grid'),
                                                    table_name = grid.down('hiddenfield[name=table_name]').getValue(),
                                                    module_id = grid.down('hiddenfield[name=module_id]').getValue(),
                                                    sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
                                                    section_id = grid.down('combo[name=section_id]').getValue();
                                                    
                                                    store.getProxy().extraParams = {
                                                        sub_module_id: sub_module_id,
                                                        module_id:module_id,
                                                        table_name:table_name,
                                                        section_id: section_id
                                                    }
                                                    
                                                }
                                            }],
                                            features: [{
                                                ftype: 'searching',
                                                minChars: 2,
                                                mode: 'local'
                                            }],
                                            listeners: {
                                                beforerender: {
                                                    fn: 'setConfigGridsStore',
                                                    config: {
                                                        storeId: table_name+'Str',
                                                        pageSize: 500, 
                                                        remoteFilter: false,
                                                        totalProperty:'totals',
                                                        proxy: {
                                                            url: 'migrationscripts/getProductAppdataMigrationDetails',
                                                            reader: {
                                                                type: 'json',
                                                                totalProperty: 'totals'
                                                            },
                                                        }
                                                    },
                                                    isLoad: true
                                                }
                                            },
                                        
                                        columns:[{
                                                xtype: 'gridcolumn',
                                                dataIndex: 'has_error',
                                                text: 'Has Error',
                                                width: 180,
                                                tdCls: 'wrap-text',
                                                renderer: function (value, metaData) {
                                                    if (value !=1) {
                                                        metaData.tdStyle = 'color:white;background-color:green';
                                                        return "Validated";
                                                    }
                                                    metaData.tdStyle = 'color:white;background-color:red';
                                                    return "Has Errors";
                                                },
                                                filter: {
                                                    xtype: 'textfield'
                                                }
                                            },{
                                                xtype: 'gridcolumn',
                                                dataIndex: 'is_synchronised',
                                                text: 'IS Synchronised',
                                                width: 180,
                                                tdCls: 'wrap-text',
                                                renderer: function (value, metaData) {
                                                    if (value==1) {
                                                        metaData.tdStyle = 'color:white;background-color:green';
                                                        return "True";
                                                    }
                                                    metaData.tdStyle = 'color:white;background-color:red';
                                                    return "False";
                                                },
                                                filter: {
                                                    xtype: 'textfield'
                                                }
                                            },{
                                            text: 'Options',
                                            xtype: 'widgetcolumn',
                                            width: 90,
                                            widget: {
                                                width: 75,
                                                textAlign: 'left',
                                                xtype: 'splitbutton',
                                                iconCls: 'x-fa fa-th-list',
                                                ui: 'gray',
                                                menu: {
                                                    xtype: 'menu',
                                                    items: [{
                                                        text: 'View Errors',
                                                        iconCls: 'x-fa fa-edit',
                                                        tooltip: 'Edit Workflow',
                                                        action: 'edit',
                                                        winTitle: 'View Errors',
                                                        winWidth: '35%',
                                                        handler: 'showappdatamigrationdataErrors',
                                                        stores: '[]'
                                                    }, {
                                                        text: 'Edit Migration Request',
                                                        iconCls: 'x-fa fa-edit',
                                                        tooltip: 'Edit Workflow',
                                                        action: 'edit',storeID: table_name+'Str',
                                                        form: 'appdatamigrationrequestfrm',
                                                        winTitle: 'Product Application Migrations Details',
                                                        winWidth: '35%',
                                                        handler: 'showappdatamigrationdatafrmEdit',
                                                        stores: '[]'
                                                    }
                                                    ]
                                                }
                                            }
                                        }]
                                        });
                            //add columns
                            for (var i = result.length - 1; i >= 0; i--) {
                                var column = Ext.create('Ext.grid.column.Column', {
                                        text: result[i].toUpperCase()+'',
                                        dataIndex: result[i]+'',
                                        width: 180,
                                        tbCls: 'wrap',
                                        filter: {
                                            xtype: 'textfield'
                                        }
                                    });
                                 grid.headerCt.insert(
                                      grid.columns.length-3, 
                                      column);
                              }
                           
                            pnl.add(grid);
                              
                        } else {
                            item.setLoading(false);
                            toastr.error(message, 'Failure Response');
                        }
                        Ext.getBody().unmask();
                    },
                    failure: function (response) {
                         btn.setLoading(false);
                        var resp = Ext.JSON.decode(response.responseText),
                            message = resp.message;
                        toastr.error(message, 'Failure Response');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                         btn.setLoading(false);
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
        });
        
  
  
},
  deleteApplicationMigratedDataSets:function(btn){
    var form = btn.up('form'),
            applicationdatamigrationgrid = btn.up('grid');
            migration_request_id = applicationdatamigrationgrid.down('hiddenfield[name=migration_request_id]').getValue(),
            module_id = applicationdatamigrationgrid.down('hiddenfield[name=module_id]').getValue(),
            store = applicationdatamigrationgrid.getStore(),
            params = [];
            //get selected
            sm = applicationdatamigrationgrid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [];

            Ext.each(records, function (record) {
            
                record_id = record.get('id');
                var obj = {
                    record_id: record_id
                };
                params.push(obj);
            });

        if (params.length < 1) {
           
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        Ext.MessageBox.confirm('Delete Data Migration', 'Are you sure to perform this action?', function (btn) {
            if (btn === 'yes') {
                 Ext.getBody().mask('Removing Migrated Applications........');
                    params = JSON.stringify(params);
            
                    Ext.Ajax.request({
                        url: 'migrationscripts/deleteApplicationMigratedDataSets',
                        params: {
                            migration_request_id: migration_request_id,
                            module_id:module_id,
                            data_migration: params
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {
                            
                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success,
                                message = resp.message;
                            if (success == true || success === true) {
                                toastr.success(message, 'Success Response');
                                store.load();
                            } else {
                                toastr.error(message, 'Failure Response');
                            }
                            Ext.getBody().unmask();
                        },
                        failure: function (response) {
                    
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                            Ext.getBody().unmask();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                        
                            toastr.error('Error: ' + errorThrown, 'Error Response');
                            Ext.getBody().unmask();
                        }
                    });

            }
        }
        )
},
  
  synApplicationMigratedDataSets:function(btn){
    var form = btn.up('form'),
            applicationdatamigrationgrid = btn.up('grid');
            migration_request_id = applicationdatamigrationgrid.down('hiddenfield[name=migration_request_id]').getValue(),
            store = applicationdatamigrationgrid.getStore(),
            params = [];
            //get selected
            sm = applicationdatamigrationgrid.getSelectionModel(),
            records = sm.getSelection(),
            selected = [];

            Ext.each(records, function (record) {
            
                record_id = record.get('id');
                var obj = {
                    record_id: record_id
                };
                params.push(obj);
            });

        if (params.length < 1) {
            toastr.warning('No records to save!!', 'Warning Response');
            return false;
        }
        Ext.MessageBox.confirm('Data Synchonisation', 'Are you sure to perform this action?', function (btn) {
            if (btn === 'yes') {
                 Ext.getBody().mask('Sycnronising Migrated Applications........');
                    params = JSON.stringify(params);
            
                    Ext.Ajax.request({
                        url: 'migrationscripts/synApplicationMigratedDataSets',
                        params: {
                            migration_request_id: migration_request_id,
                            data_migration: params
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {
                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success,
                                message = resp.message;
                            if (success == true || success === true) {
                                toastr.success(message, 'Success Response');
                                store.load();
                            } else {
                                toastr.error(message, 'Failure Response');
                            }
                            Ext.getBody().unmask();
                        },
                        failure: function (response) {
                            var resp = Ext.JSON.decode(response.responseText),
                                message = resp.message;
                            toastr.error(message, 'Failure Response');
                            Ext.getBody().unmask();
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            toastr.error('Error: ' + errorThrown, 'Error Response');
                            Ext.getBody().unmask();
                        }
                    });

            }
        }
        )
        

},
});





