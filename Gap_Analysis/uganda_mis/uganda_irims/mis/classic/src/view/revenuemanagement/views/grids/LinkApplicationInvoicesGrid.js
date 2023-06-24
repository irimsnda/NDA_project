/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.LinkApplicationInvoicesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'linkapplicationinvoicesgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height:550,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var batch_invoice_id = record.get('batch_invoice_id');
            if (batch_invoice_id >0) {
                return 'invalid-row';
            }
        },
        listeners: {
            refresh: function () {
                var gridView = this,
                    grid = gridView.grid;
                grid.fireEvent('moveRowTop', gridView);
            }, select: function (sel, record, index, eOpts) {
                var grid = sel.view.grid,
                    selCount = grid.getSelectionModel().getCount();
                if (selCount > 0) {
                    grid.down('button[name=btnlinkinvoices]').setDisabled(false);
                }
            },
            beforeselect: function (sel, record, index, eOpts) {
                var batch_invoice_id = record.get('batch_invoice_id'),
                    grid = sel.view.grid;
                if (batch_invoice_id > 0 ) {
                    
                        toastr.warning('The Invoice Has already Been Linked to another Batch!!', 'Warning Response');
                        return false;
                    
                } else {
                    return true;
                }
            },
            deselect: function (sel, record, index, eOpts) {
                var grid = sel.view.grid,
                    selCount = grid.getSelectionModel().getCount();
                if (selCount < 1) {
                    grid.down('button[name=btnlinkinvoices]').setDisabled(true);
                }
            },
        }
    },

    selModel: {
        selType: 'checkboxmodel'
    },
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    tbar:[{
        name:'btnlinkinvoices',
        text:'Link Invoices',
        disabled:true,
        storeId:'batchapplicationinvoicesgridstr',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 200, remoteFilter: true,
                storeId: 'linkapplicationinvoicesgridstr',
                totalProperty:'totals',
                proxy: {
                    url: 'revenuemanagement/getApplicationInvoicesDetails',
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
        }
    },
   
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        text: 'Tracking No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant Name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'date_of_invoicing',
        text: 'Date of Invoicing',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'PayCntrNum',
        text: 'PayCntrNum',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
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
                    text: 'Print Invoice',
                    iconCls: 'x-fa fa-print',
                    handler: 'funcPrintApplicationInvoice'
                }]
            }
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
