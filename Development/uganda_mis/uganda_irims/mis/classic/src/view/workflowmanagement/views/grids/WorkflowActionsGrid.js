/**
 * Created by Kip on 9/11/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.WorkflowActionsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'workflowactionsgrid',
    cls: 'dashboard-todo-list',
    header: false,
    frame: true,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    height: Ext.Element.getViewportHeight() - 280,
    tbar: [{
        xtype: 'button',
        text: 'Add Action',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'workflowactionsfrm',
        handler: 'showAddWorkflowActionForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
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
            var store = this.store,
                grid = this.up('grid'),
                tabPnl = grid.up('tabpanel'),
                form = tabPnl.down('workflowstagesfrm'),
                stage_id = form.down('hiddenfield[name=id]').getValue();
            store.getProxy().extraParams = {
                stage_id: stage_id
            };
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
                storeId: 'workflowactionsstr',
                proxy: {
                    url: 'workflow/getWorkflowActions',
                    extraParams: {
                        model_name: 'WorkflowAction'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'ID',
        width: 50,
        hidden: true
    },{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'action_type',
        text: 'Action Type',
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
                    handler: 'showEditWorkflowActionForm'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'wf_workflow_actions',
                    storeID: 'workflowactionsstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteWorkflowWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'wf_workflow_actions',
                    storeID: 'workflowactionsstr',
                    action_url: 'workflow/deleteWorkflowRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteWorkflowWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'wf_workflow_actions',
                    storeID: 'workflowactionsstr',
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
