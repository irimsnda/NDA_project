/**
 * Created by Kip on 9/23/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.WorkflowStagesGridGeneric', {
    extend: 'Ext.grid.Panel',
    controller: 'workflowmanagementvctr',
    xtype: 'workflowstagesgridgeneric',
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
        xtype: 'exportbtn'
    },{
        xtype: 'tbspacer',
        width: 50
    },{
        xtype: 'displayfield',
        value: 'Expand to view responsible group(s)',
        fieldStyle: {
            'color':'green'
        }
    }],
    plugins: [ {
        ptype: 'gridexporter'
    },{
        ptype: 'rowexpander',
        rowBodyTpl : new Ext.XTemplate(
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
    }],
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 100,
                storeId: 'workflowstagesgenericstr',
                proxy: {
                    url: 'workflow/getWorkflowStages'
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
    }, /*{
        xtype: 'gridcolumn',
        dataIndex: 'app_status',
        text: 'Application Status',
        flex: 1
    },*/ {
        xtype: 'gridcolumn',
        dataIndex: 'stage_status_name',
        text: 'Stage/State Status?',
        flex: 1,
        renderer: function (val, meta) {
            if ((val == 1 || val === 1)||(val == 3 || val === 3)) {
                meta.tdCls = 'full-access-cell';
            }
            return val;
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'interface_name',
        text: 'Interface',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }
    ]
});
