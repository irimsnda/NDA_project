/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.workflowmanagement.views.grids.ProcessWorkflowStagesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'processworkflowstagesgrid',
    cls: 'dashboard-todo-list',
    title: 'Stages',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    frame: true,
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    height: Ext.Element.getViewportHeight() - 196,
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
    requires: [
        'Ext.grid.*'
    ],
    tbar: [{
        xtype: 'exportbtn'
    }],
    export_title: 'Process workflow stages',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
            /* var grid=this.up('grid'),
                 store=this.getStore(),
                 panel=grid.up('processchecklistconfigpnl'),
                 workflow_id=panel.down('hiddenfield[name=workflow_id]').getValue();
             store.getProxy().extraParams={
                 workflow_id: workflow_id
             };*/
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setWorkflowGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'processworkflowstagesstr',
                proxy: {
                    url: 'workflow/getWorkflowStages'
                }
            },
            isLoad: true
        }
       // itemclick: 'onProcessStageClick'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }]
});
