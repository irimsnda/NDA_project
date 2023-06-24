/**
 * Created by Kip on 9/13/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.WorkflowStagesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'workflowstagesgrid',
    cls: 'dashboard-todo-list',
    header: false,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled'),
                stage_status = record.get('stage_status');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
            if ((stage_status == 1 || stage_status === 1) || (stage_status == 3 || stage_status === 3)) {
                return 'valid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add Stage/State',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        handler: 'showAddWorkFlowStageForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 50
    }, {
        xtype: 'displayfield',
        value: 'Expand to view responsible group(s)',
        fieldStyle: {
            'color': 'green'
        }
    }],
    plugins: [{
        ptype: 'gridexporter'
    }, {
        ptype: 'rowexpander',
        rowBodyTpl: new Ext.XTemplate(
            '<p><b>Responsible Group(s):</b> {groups_string}</p>'
        )
    }],
    export_title: 'Workflow Stages',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
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
    }],
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 100,
                storeId: 'workflowstagesstr',
                proxy: {
                    url: 'workflow/getWorkflowStages'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Stage Id',
        width: 70
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'stage_status_name',
        text: 'Stage/State Status',
        flex: 1,
        renderer: function (val, meta) {
            if ((val == 1 || val === 1) || (val == 3 || val === 3)) {
                meta.tdCls = 'full-access-cell';
            }
            return val;
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'interface_name',
        text: 'Interface',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'order_no',
        text: 'Order No',
        width: 100,
        align: 'center'
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
                    tooltip: 'Edit',
                    action: 'edit',
                    handler: 'showEditWorkFlowStageForm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    tooltip: 'Disable Record',
                    table_name: 'wf_workflow_stages',
                    storeID: 'workflowstagesstr',
                    action_url: 'workflow/softDeleteWorkflowRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteWorkflowWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'wf_workflow_stages',
                    storeID: 'workflowstagesstr',
                    action_url: 'workflow/deleteWorkflowRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteWorkflowWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'wf_workflow_stages',
                    storeID: 'workflowstagesstr',
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
