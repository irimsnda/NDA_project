/**
 * Created by Kip on 9/17/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.ApplicationStatusesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'applicationstatusesgrid',
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
        xtype: 'button',
        text: 'Add Status',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'applicationstatusesfrm',
        handler: 'showSimpleWorkflowModuleGridForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
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
        emptyMsg: 'No Records'
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
                storeId: 'applicationstatusesstr',
                proxy: {
                    extraParams:{
                        model_name: 'WorkflowStatus'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
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
                    form: 'applicationstatusesfrm',
                    handler: 'showEditWorkflowParamGridFrm',
                    stores: '[]'
                }, {
                    text: 'Delete (Soft)',
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: 'Delete Record',
                    table_name: 'wf_workflow_statuses',
                    storeID: 'applicationstatusesstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteWorkflowWidgetParam'
                }, {
                    text: 'Delete (Actual)',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'wf_workflow_statuses',
                    storeID: 'applicationstatusesstr',
                    action_url: 'workflow/deleteWorkflowRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteWorkflowWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'wf_workflow_statuses',
                    storeID: 'applicationstatusesstr',
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
    }]
});
