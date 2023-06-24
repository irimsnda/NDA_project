
Ext.define('Admin.view.configurations.viewcontrollers.ConfigurationsVctr', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.configurationsvctr',

    /**
     * Called when the view is created
     */
    init: function() {

    },

    setConfigGridsStore: function (obj, options) {
        this.fireEvent('setConfigGridsStore', obj, options);
    },
    setParamCombosStore: function (obj, options) {
        this.fireEvent('setParamCombosStore', obj, options);
    },
    setConfigCombosStore: function (obj, options) {
        this.fireEvent('setConfigCombosStore', obj, options);
    },

    setOrgConfigCombosStore: function (obj, options) {
        this.fireEvent('setOrgConfigCombosStore', obj, options);
    },

    setWorkflowCombosStore: function (obj, options) {
        this.fireEvent('setWorkflowCombosStore', obj, options);
    },

    setAdminCombosStore: function (obj, options) {
        this.fireEvent('setAdminCombosStore', obj, options);
    },
    funcSyncMigrationSetup:function(btn){
           var grid = btn.up('grid'),
                store = grid.getStore(),
                params = [];
            for (var i = 0; i < store.data.items.length; i++) {
                var record = store.data.items [i],
                    v2_mistable = record.get('v2_mistable'),
                    v1_mistable = record.get('v1_mistable'),
                    column_defination = record.get('column_defination'),
                    record_id = record.get('record_id'),
                    description = record.get('description'),
                    migration_data_type_id = record.get('migration_data_type_id');
                var obj = {
                    v2_mistable: v2_mistable,
                    v1_mistable: v1_mistable,
                    column_defination: column_defination,
                    record_id: record_id,
                    description: description,
                    migration_data_type_id: migration_data_type_id
                };
                if (record.dirty) {
                    params.push(obj);
                }
            }
            if (params.length < 1) {
                btn.setLoading(false);
                toastr.warning('No records to save!!', 'Warning Response');
                return false;
            }
            params = JSON.stringify(params);
            Ext.Ajax.request({
                url: 'migrationscripts/syncMigrationSetupDatasets',
                params: {
                    migration_data: params
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token,
                    'X-CSRF-Token': token
                },
                success: function (response) {
                    btn.setLoading(false);
                    var resp = Ext.JSON.decode(response.responseText),
                        success = resp.success,
                        message = resp.message;
                    if (success == true || success === true) {
                        toastr.success(message, 'Success Response');
                        store.load();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
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
   
    showSimpleConfigModuleGridForm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            formWidget = btn.form,
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            form = Ext.widget(formWidget),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        grid.hide();
        parentPanel.add(form);
        /*} else {
            toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
            return false;
        }*/
    },
     showAddChecklistItemConfigParamWinFrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            grid = btn.up('grid'),
            checklist_type_id = grid.down('hiddenfield[name=checklist_type_id]').getValue(),
            checklist_category_id = grid.down('hiddenfield[name=checklist_category_id]').getValue(),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        child.down('combo[name=checklist_type_id]').setValue(checklist_type_id);
        child.down('combo[name=checklist_category_id]').setValue(checklist_category_id);
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },
    showAddConfigParamWinFrm: function (btn) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    }, showEditConfigParamWinFrm: function (item) {
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            record = btn.getWidgetRecord(),
            childXtype = item.childXtype,
            winTitle=item.winTitle,
            winWidth=item.winWidth,
            form = Ext.widget(childXtype),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        funcShowCustomizableWindow(winTitle, winWidth, form, 'customizablewindow');
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

    showEditConfigParamGridFrm: function (item) {//for tree panels
        //if (this.fireEvent('checkFullAccess') || this.fireEvent('checkWriteUpdate')) {
        var me = this,
            btn = item.up('button'),
            grid = btn.up('grid'),
            parentPanel = grid.up('panel'),
            record = btn.getWidgetRecord(),
            formWidget = item.form,
            form = Ext.widget(formWidget),
            storeArray = eval(item.stores),
            arrayLength = storeArray.length;
        form.reset();
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        form.loadRecord(record);
        grid.hide();
        parentPanel.add(form);
        /* } else {
             toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
             return false;
         }*/
    },

   

    configBackToDashboard: function (btn) {
        var currentPnl = btn.up('form'),
            containerPnlXtype = btn.containerPnlXtype,
            hiddenCompXtype = btn.hiddenCompXtype,
            containerPnl = btn.up(containerPnlXtype),
            grid = containerPnl.down(hiddenCompXtype);
        containerPnl.remove(currentPnl);
        grid.show();
    },

    doCreateConfigParam: function (btn) {
        var me = this,
            action_url = btn.action_url,
            form = btn.up('form'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Please wait...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.removeAll();
                        store.load();
                        me.configBackToDashboard(btn);
                        toastr.success(message, "Success Response");
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },

    doCreateConfigParamWin: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form_xtype = btn.up('form'),
            win = form_xtype.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID);

        var frm = form_xtype.getForm();
            
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        if(form_xtype.down('hiddenfield[name=common_name_id]')){

                            store.load({params:{common_name_id: form_xtype.down('hiddenfield[name=common_name_id]').getValue()}});
                        }
                        else if(form_xtype.down('hiddenfield[name=product_category_id]')){
                            var product_category_id = form_xtype.down('hiddenfield[name=product_category_id]').getValue();
                            store.load({params:{product_category_id: product_category_id}});
                            
                        }
                        else if(form_xtype.down('hiddenfield[name=section_id]')){
                            var section_id = form_xtype.down('hiddenfield[name=section_id]').getValue();
                            store.load({params:{section_id: section_id}});
                        }
                        else{

                            store.load();
                        }
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },

    doCreateSystemModules: function (btn) {
        var me = this,
            url = btn.action_url,
            table = btn.table_name,
            form = btn.up('form'),
            win = form.up('window'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: url,
                params: {model: table},
                waitMsg: 'Please wait...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        store.removeAll();
                        store.load();
                        win.close();
                    } else {
                        toastr.error(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                }
            });
        }
    },
    doDeleteConfigWidgetParam: function (item) {
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
    },

    //  doUnlinkConfigWidgetParam: function (item) {
    //     //if (this.fireEvent('checkFullAccess')) {
    //     var me = this,
    //         btn = item.up('button'),
    //         record = btn.getWidgetRecord(),
    //         id = record.get('id'),
    //         storeID = item.storeID,
    //         table_name = item.table_name,
    //         column_array = item.column_array,
    //         url = item.action_url;
    //     this.fireEvent('unlinkRecord', id, table_name, storeID, url, column_array);
    //     /*  } else {
    //           toastr.warning('Sorry you don\'t have permission to perform this action!!', 'Warning Response');
    //           return false;
    //       }*/
    // },
    funcInitiate_migrationsetups:function(btn){
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to initiate the Migration Process?', function (button) {
            if (button === 'yes') {
                var url = 'migrationscripts/initiateMigrationProcess';

                print_report(url);

            }
        });
       
    },
    loadRule:function(combo) {
        var str=combo.getStore(),
            frm=combo.up('form'),
            idx=str.find('id',combo.getValue()),
            ruleField=frm.down('htmleditor[name=ruleField]');

        if(idx>-1){
           var desc=str.getAt(idx).data.description;
            ruleField.setValue(desc);
        }
        
        
    },
    loadDepartments: function(combo,newValue,oldvalue,eopts) {
       var form=combo.up('form'),
            depComboStr=form.down('combo[name=department_id]').getStore(),
            otherData= combo.displayTplData[0],
            filters=JSON.stringify({'directorate_id':otherData['directorate_id']});

       depComboStr.load({params:{filters:filters}});
       
       
    },
    loadDirectorateSectionsandEmails:function(combo,newValue,oldvalue,eopts) {
       var form=combo.up('form'),
            SecComboStr=form.down('combo[name=section_id]').getStore(),
            emailStr=form.down('tagfield[name=email_addresses]').getStore(),
            filters=JSON.stringify({'directorate_id':newValue});

       SecComboStr.load({params:{filters:filters}});
       emailStr.load({params:{filters:filters}});
        
    },
    loadGroups:function(combo,newValue,oldvalue,eopts) {
        var form=combo.up('form'),
            grpComboStr=form.down('tagfield[name=group_ids]').getStore(),
            filters=JSON.stringify({'department_id':newValue});

       grpComboStr.load({params:{filters:filters}});
    },

    //dynamic parameters views
    renderParameterGrid: function(btn) {
        //var navigationTreeList
        btn.setLoading(true);
       var record =  btn.getWidgetRecord(),
           def_id = record.get('id');
        
                Ext.Ajax.request({
                        url: 'configurations/getParameterGridColumnsConfig',
                        method: 'GET',
                        params: {
                            def_id: def_id
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
                                title = resp.title;
                                table_name = resp.table_name;
                            if (success == true || success === true) {
                                
                                var panel = Ext.create('Ext.panel.Panel',{
                                    viewModel: 'configurationsvm',
                                    controller: 'configurationsvctr',
                                    title: title,
                                    closable: true,
                                    userCls: 'big-100 small-100',
                                    height: Ext.Element.getViewportHeight() - 118,
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
                                                        var is_enabled = record.get('is_enabled');
                                                        if (is_enabled == 0 || is_enabled === 0) {
                                                            return 'invalid-row';
                                                        }
                                                    }
                                                },
                                                tbar: [{
                                                    xtype: 'button',
                                                    text: 'Add',
                                                    iconCls: 'x-fa fa-plus',
                                                    action: 'add',
                                                    ui: 'soft-green',
                                                    //childXtype: 'actingreasonFrm',
                                                    winTitle: title+'',
                                                    winWidth: '40%',
                                                    handler: 'renderParameterForm',
                                                    stores: '[]'
                                                },{
                                                    xtype: 'hiddenfield',
                                                    name: 'def_id',
                                                    fieldLabel: 'def_id',
                                                    allowBlank: true
                                                }, {
                                                    xtype: 'exportbtn'
                                                }],
                                                plugins: [
                                                    {
                                                        ptype: 'gridexporter'
                                                    }
                                                ],
                                                export_title: title+'',
                                                bbar: [{
                                                    xtype: 'pagingtoolbar',
                                                    width: '100%',
                                                    displayInfo: true,
                                                    displayMsg: 'Showing {0} - {1} of {2} total records',
                                                    emptyMsg: 'No Records',
                                                    beforeLoad: function() {
                                                        var grid=this.up('grid'),
                                                            store = grid.getStore(),
                                                            def_id=grid.down('hiddenfield[name=def_id]').getValue();

                                                         var store=this.getStore();
                                                         store.getProxy().extraParams = {
                                                                def_id:def_id
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
                                                            pageSize: 1000,
                                                            storeId: table_name+'Str',
                                                            proxy: {
                                                                url: 'configurations/getParameterGridConfig',
                                                            }
                                                        },
                                                        isLoad: true
                                                    }
                                                },
                                            
                                            columns:[{
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'id',
                                                    text: 'Ref ID'
                                                },{
                                                    xtype: 'gridcolumn',
                                                    dataIndex: 'is_enabled',
                                                    text: 'Enable',
                                                    flex: 1,
                                                    renderer: function (value, metaData) {
                                                        if (value) {
                                                            metaData.tdStyle = 'color:white;background-color:green';
                                                            return "True";
                                                        }

                                                        metaData.tdStyle = 'color:white;background-color:red';
                                                        return "False";
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
                                                            text: 'Edit',
                                                            iconCls: 'x-fa fa-edit',
                                                            tooltip: 'Edit Record',
                                                            action: 'edit',
                                                            //childXtype: 'actingreasonFrm',
                                                            winTitle: title+'',
                                                            winWidth: '40%',
                                                            handler: 'renderParameterForm',
                                                            stores: '[]'
                                                        }, {
                                                            text: 'Disable',
                                                            iconCls: 'x-fa fa-repeat',
                                                            table_name: table_name,
                                                            storeID: table_name+'Str',
                                                            action_url: 'configurations/softDeleteConfigRecord',
                                                            action: 'soft_delete',
                                                            handler: 'doDeleteConfigWidgetParam'
                                                        }, {
                                                            text: 'Delete',
                                                            iconCls: 'x-fa fa-trash',
                                                            tooltip: 'Delete Record',
                                                            table_name: table_name,
                                                            storeID: table_name+'Str',
                                                            action_url: 'configurations/deleteConfigRecord',  
                                                            action: 'actual_delete',
                                                            handler: 'doDeleteConfigWidgetParam',
                                                            hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                                                        }, {
                                                            text: 'Enable',
                                                            iconCls: 'x-fa fa-undo',
                                                            tooltip: 'Enable Record',
                                                            table_name: table_name,
                                                            storeID: table_name+'Str',
                                                            action_url: 'configurations/undoConfigSoftDeletes',
                                                            action: 'enable',
                                                            disabled: true,
                                                            handler: 'doDeleteConfigWidgetParam'
                                                        }
                                                        ]
                                                    }
                                                }, onWidgetAttach: function (col, widget, rec) {
                                                    var is_enabled = rec.get('is_enabled');
                                                    if (is_enabled === 0 || is_enabled == 0) {
                                                        widget.down('menu menuitem[action=enable]').setDisabled(false);
                                                        widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
                                                    } else {
                                                        widget.down('menu menuitem[action=enable]').setDisabled(true);
                                                        widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
                                                    }
                                                }
                                            }]
                                            });
                                //add columns
                                for (var i = result.length - 1; i >= 0; i--) {
                                    var column = Ext.create('Ext.grid.column.Column', {
                                            text: result[i].toUpperCase()+'',
                                            dataIndex: result[i]+'',
                                            width: 150,
                                            tbCls: 'wrap'
                                        });
                                     grid.headerCt.insert(
                                          grid.columns.length-2, 
                                          column);
                                  }
                                grid.down('hiddenfield[name=def_id]').setValue(def_id);
                                panel.add(grid);

                                var main_panel =  Ext.ComponentQuery.query("#contentPanel")[0];
                                main_panel.add(panel);
                                 btn.setLoading(false);
                                main_panel.setActiveTab(main_panel.items.length-1);

                            } else {
                                 btn.setLoading(false);
                                toastr.error(message, 'Failure Response');
                            }
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
  renderParameterForm:function(btn) {
      var grid = btn.up('grid'),
          def_id = grid.down('hiddenfield[name=def_id]').getValue();
      Ext.getBody().mask('loading...');
      Ext.Ajax.request({
                        url: 'configurations/getParameterFormColumnsConfig',
                        method: 'GET',
                        params: {
                            def_id: def_id
                        },
                        headers: {
                            'Authorization': 'Bearer ' + access_token,
                            'X-CSRF-Token': token
                        },
                        success: function (response) {

                            var resp = Ext.JSON.decode(response.responseText),
                                success = resp.success,
                                message = resp.message,
                                join_fields = resp.join_fields,
                                table_name = resp.table_name,
                                main_fields = resp.main_fields;
                               // console.log(main_fields);
                                //console.log(main_fields[0]['field']);
                            if (success == true || success === true) {
                                var form = Ext.create('Ext.form.Panel',{
                                    controller: 'configurationsvctr',
                                    autoScroll: true,
                                    layout: 'form',
                                    frame: true,
                                    maxHeight: Ext.Element.getViewportHeight() - 118,
                                    bodyPadding: 8,
                                    defaults: {
                                        labelAlign: 'top',
                                        allowBlank: false
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
                                        },{
                                            xtype: 'checkbox',
                                            inputValue: 1,
                                            uncheckedValue: 0,
                                            fieldLabel: 'Is Enabled',
                                            margin: '0 20 20 0',
                                            name: 'is_enabled',
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

                                if(main_fields[i]['field'] == 'table_name'){
                                    var field = Ext.create('Ext.form.ComboBox',{
                                        name: 'table_name',
                                        fieldLabel: 'Table Name',
                                        allowBlank:  main_fields[i]['null'],
                                        valueField: 'table_name',
                                        displayField: 'table_name',
                                        forceSelection: main_fields[i]['null'],
                                        queryMode: 'local',
                                        listeners: {
                                            beforerender: {
                                                fn: 'setConfigCombosStore',
                                                config: {
                                                    pageSize: 1000,
                                                    proxy: {
                                                            url: 'audittrail/getTableslist',
                                                            extraParams:{
                                                                in_db:'mis'
                                                            }
                                                        }
                                                },
                                                isLoad: true
                                            }
                                           
                                        }
                                    });
                                }else{
                                    var field = Ext.create('Ext.form.TextField',{
                                        name: main_fields[i]['field'],
                                        fieldLabel: main_fields[i]['field'],
                                        allowBlank: main_fields[i]['null'],
                                    }); 
                                }
                               
                                counter++;
                                form.insert(1,field);

                            }
                            for (var i = join_fields.length - 1; i >= 0; i--) {
                                if(join_fields[i].is_child != 1){
                                var combo = Ext.create('Ext.form.ComboBox',{
                                    name: join_fields[i].param_column_name,
                                    fieldLabel: join_fields[i].label,
                                    allowBlank: join_fields[i].null,
                                    valueField: 'id',
                                    displayField: join_fields[i].join_disp_column_name,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    listeners: {
                                        beforerender: {
                                            fn: 'setConfigCombosStore',
                                            config: {
                                                pageSize: 1000,
                                                proxy: {
                                                    url: 'commonparam/getCommonParamFromTable',
                                                    extraParams: {
                                                        table_name: join_fields[i].table
                                                    }
                                                }
                                            },
                                            isLoad: true
                                        }
                                       
                                    }
                                });
                            }else{
                               var combo = Ext.create('Ext.form.ComboBox',{
                                    name: join_fields[i].param_column_name,
                                    fieldLabel: join_fields[i].label,
                                    allowBlank: join_fields[i].null,
                                    valueField: 'id',
                                    displayField: join_fields[i].join_disp_column_name,
                                    forceSelection: true,
                                    queryMode: 'local',
                                    listeners: {
                                        beforerender: {
                                            fn: 'setConfigCombosStore',
                                            config: {
                                                pageSize: 1000,
                                                proxy: {
                                                    url: 'commonparam/getCommonParamFromTable',
                                                    extraParams: {
                                                        table_name: join_fields[i].table
                                                    }
                                                }
                                            },
                                            isLoad: false
                                        }
                                       
                                    }
                                }); 

                             var parent_combo = form.down('combo[name='+join_fields[i].parent_combo_name+']'),
                                 param_column_name = join_fields[i].param_column_name,
                                 link_column_name = join_fields[i].link_column_name;
                             parent_combo.addListener('change',function(combo, newVal, oldvalue, eopts) {
                                 var obj = {};
                                    obj[link_column_name] = newVal;
                                    console.log(obj);
                                 var frm = combo.up('form'),
                                     comboStr = frm.down('combo[name='+param_column_name+']').getStore(),
                                     filters = JSON.stringify(obj);
                                comboStr.removeAll();
                                comboStr.load({params:{filters:filters}});
                                 
                             }); 
                            }
                            form.insert(counter, combo);
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

  //defination
  loadParameterConfig: function(chk, newVal, oldVal, eopts) {
       var form = chk.up('form'),
           id = form.down('hiddenfield[name=id]').getValue();
          
       
       if(newVal == 1){
            Ext.getBody().mask('loading.....');
            Ext.Ajax.request({
                    url: 'administration/checkParamMenuDefination',
                    method: 'GET',
                    params: {
                        menu_id: id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            Ext.getBody().unmask();
                             if(resp.is_defined){
                               var btn = Ext.create('Ext.Button', {
                                  iconCls: 'fa fa-cog',
                                  action: 'view',
                                  name: 'config_btn',
                                  text: 'View Parameter Config',
                                  handler: 'setConfigForm'
                                }); 
                               form.add(btn); 
                           }else{
                              var btn = Ext.create('Ext.Button', {
                                  text: 'Configure Parameter',
                                  iconCls: 'fa fa-cog',
                                  action: 'add',
                                  name: 'config_btn',
                                  handler: 'setConfigForm' 
                                });
                                form.add(btn);   
                           }
                        } else {
                             Ext.getBody().unmask();
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                         Ext.getBody().unmask();
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                         Ext.getBody().unmask();
                    }
                });
       }else{
           var btn = form.down('button[name=config_btn]');
           btn.destroy();
       }
   },
   setConfigForm:function(btn) {
   var me = this;

    if(btn.action == 'view'){
        edit = 1;
        var grid = btn.up('grid'),
            record = btn.getWidgetRecord(),
            def_id = record.get('id');
        Ext.getBody().mask('Loading...');

        Ext.Ajax.request({
                    url: 'administration/getParameterConfig',
                    method: 'GET',
                    params: {
                        def_id: def_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                            results = resp.results;
                        if (success || success == true || success === true) {
                           var form = Ext.widget('parameterformfieldsfrm');
                           var def_id =resp.def_id;
                           if(def_id != 0){
                               form.down('hiddenfield[name=def_id]').setValue(def_id);
                               form.down('numberfield[name=no_joins]').setValue(resp.no_joins);
                               form.down('textfield[name=param_title]').setValue(results['param_title']);
                               form.down('textfield[name=param_name]').setValue(results['param_name']);
                               form.down('textfield[name=table_name]').setValue(results['table_name']);
                               var btn = form.down('button[name = add_tables]');
                               me.addTableJoinsDefination(btn);
                              
                               model = Ext.create('Ext.data.Model', results);
                               form.loadRecord(model);
                               funcShowCustomizableWindow("Config Parameter", '80%', form, 'customizablewindow');

                           }
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
        }else{
            var form = Ext.widget('parameterformfieldsfrm');
            funcShowCustomizableWindow("Config Parameter", '80%', form, 'customizablewindow');
        }
       
       
   },
   addTableJoinsDefination: function(btn) {
       var form = btn.up('form'),
           fieldset = form.down('fieldset[name=joins_fs]'),
           no_field = form.down('numberfield[name=no_joins]'),
           no = no_field.getValue(),
           save_btn = form.down('button[action=save]'),
           joins_fieldsets = form.down('fieldset[name=joins_fieldsets]'),
           frm = form.getForm();
      
      if(frm.isValid()){
          
            no_field.setReadOnly(true);
           btn.setDisabled(true);
       
        for (var i = no-1; i >= 0; i--) {
            var join_type_id = 'join_type_id'+i,
                join_table_name = 'join_table_name'+i,
                join_column_name = 'join_column_name'+i,
                join_disp_column_name = 'join_disp_column_name'+i,
                link_column_name = 'link_column_name'+i,
                param_column_name = 'param_column_name'+i;

            var fieldset = Ext.create('Ext.form.FieldSet' , {
                layout: 'column',
                title: 'Join table',
                name: 'joins_definations',
                defaults: {
                    labelAlign: 'top',
                    margin: '0 20 0 0',
                    allowBlank: false
                },
                items :[{
                        xtype: 'combobox',
                        queryMode: 'local',
                        fieldLabel: 'Join Type',
                        displayField: 'name',
                        valueField: 'id',
                        name: join_type_id+'',
                        columnWidth: 0.2,
                        listeners:
                         {
                             beforerender: {
                                fn: 'setAdminCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                        url: 'commonparam/getCommonParamFromTable',
                                    extraParams:{
                                            table_name: 'par_join_types'
                                        }
                                    }
                                },
                                isLoad: true
                            }
                             
                         }
                
                      },{
                        xtype: 'combobox',
                        queryMode: 'local',
                        fieldLabel: 'Join Table',
                        displayField: 'table_name',
                        valueField: 'table_name',
                        name: join_table_name+'',
                        columnWidth: 0.25,
                        listeners:
                         {
                             beforerender: {
                                fn: 'setAdminCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                        url: 'audittrail/getTableslist'
                                    }
                                },
                                isLoad: true
                            },
                            change: function(combo, newVal, oldVal, eOpts) {
                               
                                var form = combo.up('fieldset'),
                                    join_column_nameStr = form.down("combo[action=column_name]").getStore();
                                    join_column_dispStr = form.down("combo[action=disp_column_name]").getStore();
                                   // link_column_dispStr = form.down("combo[action=param_column_name]").getStore();

                                join_column_nameStr.removeAll();
                                join_column_nameStr.load({params:{'table_name':newVal}});
                                join_column_dispStr.removeAll();
                                join_column_dispStr.load({params:{'table_name':newVal}});
                                //link_column_dispStr.removeAll();
                                //link_column_dispStr.load({params:{'table_name':newVal}});
                                //main table
                                var main_form = combo.up('form'),
                                    param_table = main_form.down('combo[name=table_name]').getValue(),
                                    param_column_Str = form.down('combo[action=param_column_name]').getStore();
                                    
                                 param_column_Str.removeAll();
                                 param_column_Str.load({params:{'table_name':param_table}});


                            },
                             
                         }
                
                      },{
                        xtype: 'combobox',
                        queryMode: 'local',
                        fieldLabel: 'Join Column',
                        displayField: 'column_name',
                        valueField: 'column_name',
                        action: 'column_name',
                        name: join_column_name+'',
                        columnWidth: 0.2,
                        listeners:
                         {
                             beforerender: {
                                fn: 'setAdminCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                        url: 'administration/getTablescolumns'
                                    }
                                },
                                isLoad: false
                            }   
                             
                         }
                
                      },{
                        xtype: 'combobox',
                        queryMode: 'local',
                        fieldLabel: 'Display Column',
                        displayField: 'column_name',
                        valueField: 'column_name',
                        action: 'disp_column_name',
                        name: join_disp_column_name+'',
                        columnWidth: 0.2,
                        listeners:
                         {
                             beforerender: {
                                fn: 'setAdminCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                        url: 'administration/getTablescolumns'
                                    }
                                },
                                isLoad: false
                            }   
                             
                         }
                
                      },{
                        xtype: 'combobox',
                        queryMode: 'local',
                        fieldLabel: 'Param Column',
                        displayField: 'column_name',
                        valueField: 'column_name',
                        action: 'param_column_name',
                        name: param_column_name+'',
                        columnWidth: 0.2,
                        listeners:
                         {
                             beforerender: {
                                fn: 'setAdminCombosStore',
                                config: {
                                    pageSize: 10000,
                                    proxy: {
                                        url: 'administration/getTablescolumns'
                                    }
                                },
                                isLoad: false
                            },
                            afterRender: function(me,eopts) {
                                var form = me.up('form'),
                                    param_table = form.down('combo[name=table_name]').getValue()
                                    store = me.getStore();
                                store.removeAll();
                                store.load({params:{table_name:param_table}});
                            }, 
                             
                         }
                
                      },{
                          xtype: 'textfield',
                          name: 'table_label'+i,
                          fieldLabel: 'Label',
                          columnWidth: 0.15
                      },{
                        xtype: 'checkbox',
                        inputValue: 1,
                        uncheckedValue: 2,
                        fieldLabel: 'Is Linked to below',
                        margin: '0 20 20 0',
                        name: 'is_parent'+i,
                        allowBlank: true,
                        listeners: {
                            change: function(checkbox, newValue, oldValue, eOpts) {
                                var fieldset = checkbox.up('fieldset'),
                                    chk = fieldset.down('textfield[action=link_column_name]');
                                if (newValue == 1) {
                                    chk.show();
                                } else {
                                    chk.hide();
                                }
                            }
                        }
                    },{
                        xtype: 'textfield',
                        allowBlank: true,
                        fieldLabel: 'Link Column',
                        name: link_column_name+'',
                        hidden: true,
                        action: 'link_column_name',
                        columnWidth: 0.3,
                      },{
                          xtype: 'numberfield',
                          name: 'level',
                          hidden: true,
                          value: i
                      }]
            });
        joins_fieldsets.add(fieldset);
        }
       }else{
          toastr.warning("Please Fill all the Initial Parameter Details", 'Failure Response!!'); 
       }
                              

   },
  saveMenuItem: function(btn, edit) {
      var me = this,
            action_url = btn.action_url,
            menu_form = btn.up('form'),
            storeID = btn.storeID,
            store = Ext.getStore(storeID),
            frm = menu_form.getForm();
        if (frm.isValid()) {
            frm.submit({
                url: action_url,
                waitMsg: 'Saving Menu First...',
                success: function (fm, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        store.removeAll();
                        store.load();

                        if(edit == 0){
                             var form = Ext.widget('parameterformfieldsfrm');
                             var menu_id =response.record_id;
                               if(menu_id != 0){
                                   form.down('hiddenfield[name=menu_id]').setValue(menu_id);

                                   funcShowCustomizableWindow("Config Parameter", '80%', form, 'customizablewindow');  
                                   }
                                else{
                                    toastr.error("Failed to get Menu", 'Failure Response');
                                }

                          }else{
                              menu_form.down('hiddenfield[name=id]').setValue(menu_id);
                          }
                        
                      
                       // toastr.success(message, "Success Response");
                    } else {
                        toastr.error(message, 'Failure Response');
                    
                    }
                },
                failure: function (form, action) {
                    var resp = action.result;
                    toastr.error(resp.message, 'Failure Response');
                   
                }
            });
        }
  },
  saveParameterConfig: function(btn) {
      var form =  Ext.ComponentQuery.query("#systemmenusfrmId")[0],
          me = this,
          save_btn = form.down('button[action=save]'); 
      me.adminBackToDashboard(save_btn);
      me.doCreateAdminParamWin(btn);
  },
  removeTableJoinsDefination: function(btn) {
      var fieldset = btn.up('fieldset'),
          no = fieldset.down('numberfield[name=no_joins]').getValue(),
          form = fieldset.up('form');
      
             form.down('fieldset[name=joins_fieldsets]').removeAll();
       
      
      form.down('numberfield[name=no_joins]').setReadOnly(false);
      form.down('button[name=add_tables]').setDisabled(false);
  },
   removeSelectedUsersFromDirective: function (button) {
        var me = this,
            grid = button.up('grid'),
            tabPnl = grid.up('tabpanel'),
            docdirective_id = tabPnl.down('hiddenfield[name=docdirective_id]').getValue(),
            store = grid.getStore(),
            sm = grid.getSelectionModel(),
            selected_records = sm.getSelection(),
            selected = [];
        if (!sm.hasSelection()) {
            toastr.warning('No record selected. Please select a record(s) to remove!!', 'Warning Response');
            return;
        }
        Ext.MessageBox.confirm('Confirm', 'Are you sure you want to remove selected user(s)?', function (btn) {
            if (btn === 'yes') {
                Ext.getBody().mask('Please wait...');
                Ext.each(selected_records, function (item) {
                    selected.push(item.data.id);
                });
                Ext.Ajax.request({
                    url: 'controldocumentsmng/removeSelectedUsersFromUnits',
                    params: {
                        docdirective_id: docdirective_id,
                        selected: JSON.stringify(selected)
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            sm.deselectAll();
                            toastr.success(message, 'Success Response!!');
                            store.load();
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });
            }
        });
    },
    sysncUserDirective: function(btn) {
        var userGrid = btn.up('grid'),
            store = userGrid.getStore(),
            store2 = Ext.getStore('docdistributiondirectivestr'),
            win = userGrid.up('window'),
            sm =userGrid.getSelectionModel(),
            docdirective_id = userGrid.down('hiddenfield[name=docdirective_id]').getValue(),
            selected = [];

        if (sm.hasSelection()) {
            Ext.getBody().mask('Please wait...');
           var row = sm.getSelection();

           Ext.each(row, function(ob){
                 selected.push(ob.get('id'));
            });


             Ext.Ajax.request({
                    url: 'controldocumentsmng/addSelectedUserstoUnit',
                    params: {
                        selected: JSON.stringify(selected),
                        docdirective_id: docdirective_id
                    },
                    headers: {
                        'Authorization':'Bearer '+access_token,
                        'X-CSRF-Token': token
                    },
                    success: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        if (success || success == true || success === true) {
                            sm.deselectAll();
                            toastr.success(message, 'Success Response!!');
                            store.load();
                            store2.reload();
                            win.close();
                        } else {
                            toastr.error(message, 'Failure Response!!');
                        }
                    },
                    failure: function (response) {
                        Ext.getBody().unmask();
                        var resp = Ext.JSON.decode(response.responseText),
                            success = resp.success,
                            message = resp.message;
                        toastr.warning(message, 'Failure Response!!');
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        Ext.getBody().unmask();
                        toastr.error('Error: ' + errorThrown, 'Error Response');
                    }
                });

        }else{
            Ext.getBody().unmask();
            toastr.warning('Please select atleast one user', 'No selection');
        }
    
        
    },
    showAddDirectiveUsersWinFrm: function (btn) {
        var me = this,
            childXtype = btn.childXtype,
            winTitle=btn.winTitle,
            winWidth=btn.winWidth,
            grid = btn.up('grid'),
            child = Ext.widget(childXtype),
            storeArray = eval(btn.stores),
            arrayLength = storeArray.length;
        if (arrayLength > 0) {
            me.fireEvent('refreshStores', storeArray);
        }
        child.down('hiddenfield[name=docdirective_id]').setValue(grid.down('hiddenfield[name=docdirective_id]').getValue());
        funcShowCustomizableWindow(winTitle, winWidth, child, 'customizablewindow');
       
    }
});