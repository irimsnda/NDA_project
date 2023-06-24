/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.InvoiceCancellationPnlGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'invoicecancellationpnlgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
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
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                storeId: 'invoicecancellationpnlgridstr',
                pageSize: 200, remoteFilter: true,
                totalProperty:'totals',
                groupField:'module_name',
                proxy: {
                    url: 'revenuemanagement/getReversedRequestsApplicationInvoices',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: true
        }, afterrender: function(grid){

            var store = grid.getStore();
                store.removeAll();
                store.load();
       },
       itemdblclick:'onViewApplicationDetails'
    }, 
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reason_for_cancellation',
        text: 'Reason for Cancellation',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
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
