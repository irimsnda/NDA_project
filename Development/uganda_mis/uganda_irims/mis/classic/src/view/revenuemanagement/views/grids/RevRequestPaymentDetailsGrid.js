/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.RevRequestPaymentDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'revrequestpaymentdetailsgrid',
    cls: 'dashboard-todo-list',
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
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel'
    },
    plugins: [{
        ptype: 'gridexporter'
    }],
    
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 200, remoteFilter: true,
                storeId: 'applicationpaymentsgridstr',
                proxy: {
                    url: 'revenuemanagement/getPaymentspostingdetails',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: false
        },afterrender: function(grid){
            var store = grid.getStore();
            store.removeAll();
            store.load();
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'receipt_no',
        text: 'Receipt No',
        flex: 1,
       
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1,
      
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'trans_date',
        text: 'Trans Date',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'PayCntrNum',
        text: 'PayCntrNum',
        flex: 1,
        
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'exchange_rate',align:'right',
        style: 'text-align:left',
        text: 'Exchange Rate',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paid',align:'right',
        style: 'text-align:left',
        text: 'Amount Paid',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',align:'right',
        style: 'text-align:left',
        text: 'Currency Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paidtshs',align:'right',
        style: 'text-align:left',
        text: 'Amount Paid(Converted)',
        flex: 1
    }, {
        text: 'Print Receipt',
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
                    text: 'Print Receipt',
                    iconCls: 'x-fa fa-print',
                    handler: 'funcPrintApplicationREceipts'
                }]
            }
        }
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
