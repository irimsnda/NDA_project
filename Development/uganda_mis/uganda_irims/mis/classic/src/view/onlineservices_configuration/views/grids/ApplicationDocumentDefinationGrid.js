/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.grids.ApplicationDocumentDefinationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'onlineservicesconfVctr',
    xtype: 'applicationdocumentdefinationgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
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
        childXtype: 'applicationdocumentdefinationfrm',
        winTitle: 'Application Documents',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    },'->',
    {
        fieldLabel: 'Module',
        xtype:'combo',
        labelAlign: 'left',
        margin: '0 20 0 0',
        valueField:'id',
        labelWidth: 'auto',
        displayField:'name',
        name: 'module_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'modules'
                    }
                   }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldVal, eopts) {
                var grid = combo.up('grid'),
                    sub_moduleStr = grid.down('combo[name=sub_module_id]').getStore(),
                    filter = JSON.stringify({'module_id': newVal});
                sub_moduleStr.removeAll();
                sub_moduleStr.load({params:{filters: filter}});
            },
            beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));    
                    }

        }
    },{
        fieldLabel: 'Sub Module',
        xtype:'combo',
        labelAlign: 'left',
        labelWidth: 'auto',
        margin: '0 20 0 0',
        valueField:'id',
        displayField:'name',
        name: 'sub_module_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'sub_modules'
                    }
                   }
                },
                isLoad: true
            },
            beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));    
                    }

        }
    },{
        fieldLabel: 'Section',
        xtype:'combo',
        labelAlign: 'left',
        labelWidth: 'auto',
        margin: '0 0 0 0',
        valueField:'id',
        displayField:'name',
        name: 'section_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 100,
                    proxy: {
                    url: 'configurations/getConfigParamFromTable',
                    extraParams: {
                        table_name: 'par_sections'
                    }
                   }
                },
                isLoad: true
            },
            beforequery: function() {
                var store=this.getStore();
                
                var all={name: 'All',id:0};
                  store.insert(0, all);
                },
            afterrender: function(combo) {
                        combo.select(combo.getStore().getAt(0));    
                    }

        }
    },{
        xtype: 'button',
        margin: '0 0 20 0',
        text: 'Filter',
        iconCls: 'x-fa fa-filter',
        ui: 'soft-green',
        handler: function() {
            var store = this.up('grid').getStore();
            store.removeAll();
            store.load();
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Document Defination',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
                    var store = this.getStore(),
                        grid=this.up('grid'),
                        module_id=grid.down('combo[name=module_id]').getValue(),
                        sub_module_id=grid.down('combo[name=sub_module_id]').getValue(),
                        section_id=grid.down('combo[name=section_id]').getValue();

                store.getProxy().extraParams = {
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id
                }
            }
    },'->',
     {
        xtype: 'exportbtn'
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
                storeId: 'applicationdocumentdefinationstr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('status_name');
                    }
                },
                proxy: {
                   url: 'onlineservices/getApplicationdocumentdefination'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Sub Module',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'process_name',
        text: 'Process Name ',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'status_name',
        text: 'Status Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        flex: 1
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
                    childXtype: 'applicationdocumentdefinationfrm', 
					winTitle: 'Application Document Defination',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                },  {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'wb_applicable_appdocuments',
                    storeID: 'applicationdocumentdefinationstr',
                    action_url: 'onlineservices/deleteConfigRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam'
				}]
            }
        }
    }]
});
