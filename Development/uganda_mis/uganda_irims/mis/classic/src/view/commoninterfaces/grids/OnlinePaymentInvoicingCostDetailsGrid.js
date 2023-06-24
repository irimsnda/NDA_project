/**
 * Created by softclans
 */
Ext.define('Admin.view.commoninterfaces.grids.OnlinePaymentInvoicingCostDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'onlinepaymentinvoicingcostdetailsgrid',
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
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
       // hidden: true,
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'paymentinvoicingcostdetailsgridStr',
                proxy: {
                    url: 'revenuemanagement/getApplicationRaisedInvoices'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        flex: 1
    },{
        xtype: 'datecolumn',
        dataIndex: 'date_of_invoicing',
        text: 'Invoice Date',
        format: 'Y-m-d',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'total_element_amount',
        text: 'Total Cost',
        flex: 1,
        summaryType: 'sum',
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return '<b>' + val + '</b>';
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        text: 'Currency',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'exchange_rate',
        text: 'Exchange Rate(Current)',
        flex: 1,
        renderer: function (val) {
            return Ext.util.Format.number(val, '0,000.00');
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'equivalent_paid',
        text: 'Equivalent(Paying Curreny)',
        flex: 1,
        summaryType: 'sum',
        renderer: function (val,meta) {
            meta.tdStyle = 'color:#005985';
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return '<b>' + val + '</b>';
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_type',
        text: 'Invoice Type',
        flex: 1
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 150,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'button',
            iconCls: 'x-fa fa-print',
            ui: 'soft-green',
            name:'print_invoice',
            text: 'Print Invoice',
            report_type: 'Invoice',
            handler: 'printInvoice'
        }
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 150,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'button',
            iconCls: 'x-fa fa-print',
            ui: 'soft-green',
            name:'cancel_invoice',
            text: 'Cancel Generate P-Invoice',
            handler: 'funcCancelGeneratedInvoice'
        }
    }]
});
