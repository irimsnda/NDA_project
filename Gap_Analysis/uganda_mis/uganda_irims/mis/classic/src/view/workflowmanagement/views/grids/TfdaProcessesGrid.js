/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.TfdaProcessesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'tfdaprocessesgrid',
    cls: 'dashboard-todo-list',
    header: false,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
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
        xtype: 'exportbtn'
    }, {
        xtype: 'button',
        text: 'Add Process',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'tfdaprocessesfrm',
        handler: 'showSimpleWorkflowModuleGridForm',
        stores: '[]'
    }, {
        xtype: 'combo',
        emptyText: 'SECTION',
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
        emptyText: 'MODULE',
        labelWidth: 80,
        width: 260,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'module_id',
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
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'TFDA Processes',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                section_id = grid.down('combo[name=section_id]').getValue(),
                module_id = grid.down('combo[name=module_id]').getValue(),
                sub_module_id = grid.down('combo[name=sub_module_id]').getValue();
            store.getProxy().extraParams = {
                section_id: section_id,
                module_id: module_id,
                sub_module_id: sub_module_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }, {
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Module: {[values.rows[0].data.module]} [{rows.length} {[values.rows.length > 1 ? "Processes" : "Process"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'module_id',
                storeId: 'tfdaprocessesstr',
                proxy: {
                    url: 'workflow/getTfdaSystemProcesses'
                }
            },
            isLoad: true
        }
    },
    columns: [{
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
                    form: 'tfdaprocessesfrm',
                    handler: 'showEditWorkflowParamGridFrm',
                    stores: '[]'
                }, {
                    text: 'Checklists Config',
                    iconCls: 'x-fa fa-check',
                    pnlXtype: 'processchecklistconfigpnl',
                    handler: 'showProcessApplicablePartsConfig'
                }, {
                    text: 'Documents Config',
                    iconCls: 'x-fa fa-folder',
                    pnlXtype: 'processdocumentsconfigpnl',
                    handler: 'showProcessApplicablePartsConfig'
                }, {
                    text: 'Amendments Config',
                    iconCls: 'x-fa fa-th',
                    handler: 'showProcessFormsConfig'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    tooltip: 'Delete Record',
                    table_name: 'wf_tfdaprocesses',
                    storeID: 'tfdaprocessesstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteWorkflowWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'wf_tfdaprocesses',
                    storeID: 'tfdaprocessesstr',
                    action_url: 'workflow/deleteWorkflowRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteWorkflowWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'wf_tfdaprocesses',
                    storeID: 'tfdaprocessesstr',
                    action_url: 'workflow/undoWorkflowSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteWorkflowWidgetParam'
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'module',
        text: 'Module',
        hidden: true,
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'submodule',
        text: 'Sub Module',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'section',
        text: 'Section',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'workflow',
        text: 'Workflow',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1,
        hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'check_if_exists',
        text: 'If_exist',
        flex: 1,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
    }]
});
