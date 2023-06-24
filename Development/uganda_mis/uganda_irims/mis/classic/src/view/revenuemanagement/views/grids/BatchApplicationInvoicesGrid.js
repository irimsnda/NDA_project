/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.BatchApplicationInvoicesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'batchapplicationinvoicesgrid',
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
    export_title: 'Batch Invoices',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                storeId: 'batchapplicationinvoicesgridstr',
                remoteFilter: true,
                groupField:'applicant_name',
                proxy: {
                    url: 'revenuemanagement/getBatchInvoiceApplications',
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
    //   itemdblclick:'onViewApplicationDetails'
    },
   
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'batch_invoice_no',
        text: 'Batch Invoice No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }

    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_control_number',
        text: 'Payment Control No',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_name',
        text: 'Applicant_name',
        flex: 1,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'batch_invoice_amount',
        text: 'Invoice Amount',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency_name',
        text: 'Paying Currency',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'prepared_by',
        text: 'Prepared By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_of_invoicing',
        text: 'Invoice Date',
        flex: 1
    },{
        xtype: 'widgetcolumn',
        text: 'Print Invoice Statement',
        flex: 1,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-print',
            ui: 'soft-green',
            text: 'Print Invoice Statement',
            handler: 'funcPrintInvoiceStatement'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'payment_control_no',
        text: 'Payment Status',
        flex: 0.5,
        renderer: function (value, metaData) {
            if (value >0) {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            else{
                metaData.tdStyle = 'color:white;background-color:red';
                return value;
            }
        },
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'widgetcolumn',
        text: 'Print Payment Statement',
        flex: 1,
        widget: {
            xtype: 'button',
            iconCls: 'x-fa fa-print',
            ui: 'soft-green',
            text: 'Print Payment Statement',
            handler: 'funcPrintBatchPaymentStatement'
        }
    }],
    bbar: [{
            xtype: 'pagingtoolbar',
            width: '100%',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad:function(){
              //  this.up('grid').fireEvent('refresh', this);
            }
        }]
});
