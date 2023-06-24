/**
 * Created by Kip on 9/24/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.WorkflowInterfacesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'workflowinterfacesgrid',
    cls: 'dashboard-todo-list',
    header: false,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    tbar: [{
        xtype: 'button',
        text: 'Add Interface',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'workflowinterfacesfrm',
        handler: 'showSimpleWorkflowModuleGridForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'combo',
        fieldLabel: 'Module',
        name: 'module_id',
        valueField: 'id',
        labelWidth: 80,
        width: 290,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        },
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
                    sub_module = grid.down('combo[name=sub_module_id]'),
                    sub_module_str = sub_module.getStore();
                sub_module_str.removeAll();
                sub_module_str.load({params: {module_id: newVal}});
                grid.getStore().load();
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        name: 'sub_module_id',
        labelWidth: 80,
        width: 290,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        },
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
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Workflow Actions',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                module_id = grid.down('combo[name=module_id]').getValue(),
                sub_module_id = grid.down('combo[name=sub_module_id]').getValue();
            store.getProxy().extraParams = {
                module_id: module_id,
                sub_module_id: sub_module_id
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
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 100,
                storeId: 'workflowinterfacesstr',
                proxy: {
                    url: 'workflow/getWorkflowInterfacedetails'
                }
            },
            isLoad: true
        }
    },
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'id',
            text: 'ID',
            width: 80
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'name',
            text: 'Name',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'viewtype',
            text: 'ViewType',
            tdCls: 'wrap',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'module_name',
            text: 'Module Name',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sub_module',
            text: 'Sub Module',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'section_name',
            text: 'Section Name',
            flex: 1
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'description',
            text: 'Description',
            flex: 1
        }, {
            xtype: 'widgetcolumn',
            text: 'Options',
            width: 90,
            widget: {
                textAlign: 'left',
                xtype: 'splitbutton',
                ui: 'gray',
                width: 75,
                iconCls: 'x-fa fa-th-list',
                menu: {
                    xtype: 'menu',
                    items: [{
                        text: 'Edit',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'Edit Record',
                        action: 'edit',
                        form: 'workflowinterfacesfrm',
                        handler: 'showEditWorkflowParamGridFrm',
                        stores: '[]'
                    }, {
                        text: 'Disable',
                        iconCls: 'x-fa fa-repeat',
                        table_name: 'wf_workflow_interfaces',
                        storeID: 'workflowinterfacesstr',
                        action_url: 'workflow/softDeleteWorkflowRecord',
                        action: 'soft_delete',
                        handler: 'doDeleteWorkflowWidgetParam'
                    }, {
                        text: 'Delete',
                        iconCls: 'x-fa fa-trash',
                        tooltip: 'Delete Record',
                        table_name: 'wf_workflow_interfaces',
                        storeID: 'workflowinterfacesstr',
                        action_url: 'workflow/deleteWorkflowRecord',
                        action: 'actual_delete',
                        handler: 'doDeleteWorkflowWidgetParam',
                        hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                    }, {
                        text: 'Enable',
                        iconCls: 'x-fa fa-undo',
                        tooltip: 'Enable Record',
                        table_name: 'wf_workflow_interfaces',
                        storeID: 'workflowinterfacesstr',
                        action_url: 'workflow/undoWorkflowSoftDeletes',
                        action: 'enable',
                        disabled: true,
                        handler: 'doDeleteWorkflowWidgetParam'
                    }
                    ]
                }
            }
        }]
});
