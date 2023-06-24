/**
 * Created by softclans.
 */
Ext.define('Admin.view.commoninterfaces.grids.ApplicationPaymentsReceiptsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'applicationpaymentsreceiptsGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 118,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'invoice_no'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        // hidden: true,
        beforeLoad: function () {
            var grid = this.up('grid'),
                invoice_no = grid.down('hiddenfield[name=invoice_no]').getValue(),
                store = grid.getStore();
            store.getProxy().extraParams = {
                invoice_no: invoice_no
            }
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'applicationpaymentsreceiptsGridstr',
                proxy: {
                    url: 'api/getApplicationPaymentDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
    },{
        xtype: 'datecolumn',
        dataIndex: 'trans_date',
        text: 'Transaction Date',
        format: 'd/m/Y',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'payment_mode',
        text: 'Payment Mode',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'receipt_no',
        text: 'Receipt No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'drawer',
        text: 'Drawer',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'amount_paid',
        text: 'Amount',
        flex: 1,
        renderer: function (val) {
            return Ext.util.Format.number(val, '0,000.00');
        },
    }, {
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'equivalent_paid',
        text: 'Equivalent(Paying Currency)',
        flex: 1,
        renderer: function (val, meta) {
            meta.tdStyle = 'color:#005985';
            return Ext.util.Format.number(val, '0,000.00');
        }
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 100,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'button',
            iconCls: 'x-fa fa-print',
            ui: 'soft-green',
            text: 'Print Receipt',
            iconCls: 'x-fa fa-file-pdf-o',
            report_type: 'Receipt',
            handler: 'printColumnReceipt'
        }
    }]
});
