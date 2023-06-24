/**
 * Created by softclans.
 */
Ext.define('Admin.view.commoninterfaces.views.grids.OnlineApplicationPaymentsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'onlineapplicationpaymentsgrid',
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
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    selModel: {
        selType: 'checkboxmodel'
    },
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'applicationpaymentsstr',
                proxy: {
                    url: 'api/getApplicationPaymentDetails'
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
               // grid.down('button[name=remove_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
               // grid.down('button[name=remove_selected]').setDisabled(true);
            }
        }
    },
    columns: [{
        xype: 'rownumberer'
    },{
        xtype: 'datecolumn',
        dataIndex: 'trans_date',
        text: 'Transaction Date',
        format: 'd/m/Y',
        flex: 1,
        summaryRenderer: function () {
            return '<b>TOTAL PAID:</b>';
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'payment_mode',
        text: 'Payment Mode',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'receipt_type',
        text: 'Receipt Type',
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
        summaryType: 'sum',
        renderer: function (val) {
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return '<b>' + val + '</b>';
        }
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
        summaryType: 'sum',
        renderer: function (val, meta) {
            meta.tdStyle = 'color:#005985';
            return Ext.util.Format.number(val, '0,000.00');
        },
        summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return '<b>' + val + '</b>';
        }
    },{
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
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
                    text: 'Print Receipt',
                    iconCls: 'x-fa fa-file-pdf-o',
                    report_type: 'Receipt',
                    handler: 'printReceipt'
                }, {
                    text: 'Download Receipt',
                    iconCls: 'x-fa fa-file-pdf-o',
                    report_type: 'Receipt',
                    handler: 'printReceipt',
                    hidden: true
                }
                ]
            }
        }
    }]
});
