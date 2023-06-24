/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.AdhocInvoicingProcessDashGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'adhocinvoicingprocessdashgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    store:'adhocinvoicingprocessdashgridstr',
    features:[{
        ftype: 'searching'
    }],
    plugins: [{
            ptype: 'gridexporter'
        },{
            ptype: 'filterfield'
        }
    ],
    export_title: 'Invoice Cancellation',
    
    listeners: {
        afterrender: function(grid){

            var store = grid.getStore();
                store.removeAll();
                store.load();
       },
       itemdblclick:'onAdhocViewApplicationDetails'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        text: 'Sub-Module Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'workflow_stage',
        text: 'Workflow Stage',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'requested_on',
        text: 'Requested On',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_by',
        text: 'Requested_by',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'date_received',
        text: 'Date Received',
        flex: 1
    }],
    bbar: [{
            xtype: 'pagingtoolbar',
            width: '100%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad:function(){
                this.up('grid').fireEvent('refresh', this);
            }
        }]
});
