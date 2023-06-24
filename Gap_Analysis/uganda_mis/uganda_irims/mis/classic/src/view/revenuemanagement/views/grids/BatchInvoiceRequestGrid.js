/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.BatchInvoiceRequestGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'batchinvoicerequestgrid',
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
                storeId: 'gepgbillinvoicepostinggridstr',
               
                totalProperty:'totals',
                proxy: {
                    url: 'revenuemanagement/getBatchApplicationInvoicesDetails',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: true
        },afterrender: function(grid){
            var store = grid.getStore();
            store.removeAll();
            store.load();
        },refresh: function () {
            var gridView = this,
                grid = gridView.grid;
            grid.fireEvent('moveRowTop', gridView);
        }, select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
            }
        },
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
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_of_invoicing',
        text: 'Date of Invoicing',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'PayCntrNum',
        text: 'PayCntrNum',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'exchange_rate',align:'right',
        style: 'text-align:left',
        text: 'Exchange Rate',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amount',align:'right',
        style: 'text-align:left',
        text: 'Invoice Amount',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',align:'right',
        style: 'text-align:left',
        text: 'Currency Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amounttshs',align:'right',
        style: 'text-align:left',
        text: 'Invoice Amount(Converted)',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        text: 'Unlink',
        widht: 150,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-cancel',
            ui: 'soft-green',
            text: 'Unlink Invoice',
            tooltip: '',
            handler: 'funcUnlinkBatchInvoice'
        }
    },{
        xtype: 'widgetcolumn',
        text: 'Print Invoice',
        widht: 150,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-print',
            ui: 'soft-green',
            text: 'Print Invoice',
            handler: 'funcPrintApplicationInvoice'
        }
    }],
    
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }]
});
