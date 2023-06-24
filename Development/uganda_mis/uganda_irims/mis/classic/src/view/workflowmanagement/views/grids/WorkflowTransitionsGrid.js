/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.WorkflowTransitionsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'workflowtransitionsgrid',
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
        text: 'Add Transition',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        handler: 'showAddWorkflowTransition',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Workflow Transitions',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                wizardFrm = grid.up('workflowwizardfrm'),
                workflow_id = wizardFrm.down('hiddenfield[name=active_workflow_id]').getValue();
            store.getProxy().extraParams = {
                workflow_id: workflow_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    },{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Stage: {[values.rows[0].data.stage_name]} [{rows.length} {[values.rows.length > 1 ? "Transitions" : "Transition"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 1000,
                groupField: 'stage_id',
                remoteSort: true,
                storeId: 'workflowtransitionsstr',
                proxy: {
                    url: 'workflow/getWorkflowTransitions'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'stage_name',
        text: 'Stage',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'action_name',
        text: 'Action',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'nextstage_name',
        text: 'Next Stage',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        text: 'Application Status',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'require_process_recommendation',
        text: 'Require Process Recommendation',
        flex: 0.5,
        renderer: function (value, metaData) {
            if(value== 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Yes";
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return "No";
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'recommendation_table_name',
        text: 'Recommendation Table Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'keep_status',
        text: 'Maintain(keep) Application Status',
        flex: 0.5,
        renderer: function (value, metaData) {
            if(value== 1) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Yes";
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return "No";
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }, {
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
                    tooltip: 'Edit Details',
                    form: 'workflowtransitionsfrm',
                    winTitle: 'Workflow Transition',
                    winWidth: '45%',
                    action: 'edit',
                    handler: 'showWorkflowEditWin',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    tooltip: 'Delete Record',
                    table_name: 'wf_workflow_transitions',
                    storeID: 'workflowtransitionsstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteWorkflowWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'wf_workflow_transitions',
                    storeID: 'workflowtransitionsstr',
                    action_url: 'workflow/deleteWorkflowRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteWorkflowWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'wf_workflow_transitions',
                    storeID: 'workflowtransitionsstr',
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
