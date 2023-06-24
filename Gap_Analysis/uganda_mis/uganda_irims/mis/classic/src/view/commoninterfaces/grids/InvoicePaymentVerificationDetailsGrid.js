/**
 * Created by softclans
 */
Ext.define('Admin.view.commoninterfaces.grids.InvoicePaymentVerificationDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'invoicepaymentverificationdetailsGrid',
    height: Ext.Element.getViewportHeight() - 200,
    cls: 'dashboard-todo-list',
    autoScroll: true,
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
    dockedItems:[{
                xtype: 'toolbar',
                dock: 'bottom',
                //flex: 0.2,
                width: '100%',
                // height: 30,
                padding: '0 0 0 5',
                ui: 'footer',
                items: [{
                        xtype: 'displayfield',
                        //flex: 0.1,
                        labelWidth: 860,
                        margin: '0 0 0 42',
                        fieldLabel: 'RUNNING BALANCE',
                        labelStyle: 'font-weight:bold;color:red',
                        name: 'running_balance',
                        fieldStyle: {
                            'color': 'red'
                        }
            }]
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'invoicepaymentverificationdetailsGridStr',
                proxy: {
                    url: 'revenuemanagement/getApplicationRaisedInvoices'
                }
            },
            isLoad: true
        },
        select: function (sel) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                //logic
            }
        },
        deselect: function (sel) {
            var grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                //logic
            }
        }
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    columns: [{
        xtype: 'rownumberer',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        flex: 1,
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
        renderer: function (val, meta, record) {
            return Ext.util.Format.number(val, '0,000.00');
        },
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
        renderer: function (val,meta) {
            meta.tdStyle = 'color:#005985';
            return Ext.util.Format.number(val, '0,000.00');
        },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_type',
        text: 'Invoice Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'amount_paid',
        text: 'Amount Paid'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'balance',
        text: 'Balance'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_cleared',
        text: 'Payment Status',
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "Cleared";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "Pending";
        }
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
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
    },{
        text: 'Receive Payments',
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
                    text: 'Receive Payments',
                    iconCls: 'x-fa fa-money',
                    tooltip: 'receive Invoice Payment',
                    action: 'receive_payments',
                    handler: 'receiveInvoicePayment',
                    winTitle: 'Account Transactions',
                    winWidth: '60%',
                    name: 'receive_payments',
                    childXtype: 'paymentsreceptionfrm',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    stores: '["receipttypestr","paymentmodesstr","banksstr"]'
                },{
                    text: 'View Payments',
                    iconCls: 'x-fa fa-eye',
                    tooltip: 'View Payment Receipts',
                    action: 'view',
                    childXtype: 'cmnpaymentreceiptsGrid',
                    winWidth: '70%',
                    handler: 'showPaymentReceiptsWin',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    stores: '[]'
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var is_cleared = rec.get('is_cleared');
            if (is_cleared === 0 || is_cleared == 0) {
                widget.down('menu menuitem[action=receive_payments]').setDisabled(false);
            } else {
                widget.down('menu menuitem[action=receive_payments]').setDisabled(true);
            }
        }
    }]
});
