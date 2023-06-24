/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.document_management.views.grids.Docdefinationrequirementgrid', {
    extend: 'Ext.grid.Panel',
    controller: 'documentsManagementvctr',
    xtype: 'docdefinationrequirementgrid',
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
        childXtype: 'docdefinationrequirementfrm',
        winTitle: 'Documents requirements Defination',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    },{
        xtype: 'combo',
        fieldLabel: 'Module',
        name: 'module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'Module'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid'),
                    subModuleStore = grid.down('combo[name=sub_module_id]').getStore();
                    subModuleStore.removeAll();
                    subModuleStore.load({params: {module_id: newVal}});

                var store = this.up('grid').getStore();
                store.reload();                 
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        name: 'sub_module_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
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
               var store = this.up('grid').getStore();
                store.reload();
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Section',
        name: 'section_id',
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        allowBlank: false,
        queryMode: 'local',
        listeners: {
            afterrender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'Section'
                        }
                    }
                },
                isLoad: true
            },change: function (cmbo, newVal) {
               var store = this.up('grid').getStore();
                store.reload();
            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Documents Definations',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                store= grid.getStore(),
                module_id = grid.down('combo[name=module_id]').getValue(),
                sub_module_id = grid.down('combo[name=sub_module_id]').getValue(),
                section_id = grid.down('combo[name=section_id]').getValue();

                store.removeAll();
                store.getProxy().extraParams = {
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    section_id: section_id
                };
            
        },
    }, {
        xtype: 'exportbtn'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Module Name: {[values.rows[0].data.module_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'docdefinationrequirementstr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('module_id');
                    }
                },
                proxy: {
                   url: 'documentmanagement/getdocdefinationrequirementDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Document Requirement',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'document_type',
        text: 'Document Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        text: 'Sub Module Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'prodclass_category',
        text: 'Product Class Category',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        text: 'Premises Type',
        flex: 1
    },
    
    {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'allowed_extensions',
        text: 'Allowed Extensions',
        tdCls:'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_mandatory',
        text: 'Is Mandatory',
        flex: 0.5,
		renderer: function (value, metaData) {
                if(value) {
                    metaData.tdStyle = 'color:white;background-color:red';
                    return "Mandatory";
                }
                metaData.tdStyle = 'color:white;background-color:green';
                return "Optional";
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'has_document_template',
        text: 'Has Document Template',
        flex: 0.5,
		renderer: function (value, metaData) {
                if(value == 1) {
                    metaData.tdStyle = 'color:white;background-color:green';
                    return "Has Template";
                }
                metaData.tdStyle = 'color:white;background-color:red';
                return "No Template";
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'portal_uploadable',
        text: 'Portal Uploadable',
        flex: 0.5,
        renderer: function (value, metaData) {
            if(value==1||value===1) {
                return "YES";
            }
            return "NO";
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
                    childXtype: 'docdefinationrequirementfrm',
                    winTitle: 'Dcouments requirements Defination',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: 'Delete Record',
                    table_name: 'tra_documentupload_requirements',
                    storeID: 'docdefinationrequirementstr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_documentupload_requirements',
                    storeID: 'docdefinationrequirementstr',
                    action_url: 'configurations/deleteConfigRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'tra_documentupload_requirements',
                    storeID: 'docdefinationrequirementstr',
                    action_url: 'configurations/undoWorkflowSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Download Template',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Download Template',
                    table_name: 'tra_documentupload_requirements',
                    action_url: 'configurations/undoWorkflowSoftDeletes',
                    handler: 'downloadDocumentRequirementTemplate'
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
