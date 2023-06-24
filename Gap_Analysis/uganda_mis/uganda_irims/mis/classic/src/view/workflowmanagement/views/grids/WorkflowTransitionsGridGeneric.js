/**
 * Created by Kip on 9/23/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.WorkflowTransitionsGridGeneric', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'workflowtransitionsgridgeneric',
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
    tbar: [ {
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
                wizardFrm = grid.up('workflowwizardfrmgeneric'),
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
                storeId: 'workflowtransitionsgenericstr',
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
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }
    ]
});
