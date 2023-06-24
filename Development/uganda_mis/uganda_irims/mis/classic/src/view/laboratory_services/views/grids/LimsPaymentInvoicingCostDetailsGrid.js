/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.LimsPaymentInvoicingCostDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'laboratoryservicesvctr',
    xtype: 'limspaymentinvoicingcostdetailsgrid',
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
    tbar:[
        {
            xtype: 'displayfield',
            fieldLabel: 'Invoice No',
            name: 'invoice_no',
            labelWidth: 90,
            value: '****',
            labelStyle:'font-weight:bold',
            fieldStyle: {
                'color': 'green',
                'font-weight':'bold'
            }
        }
    ],
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
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'api/getApplicationInvoiceDetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'category',
        text: 'Category',
        flex: 1,
        summaryRenderer: function () {
            return '<b>TOTAL OWED:</b>';
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sub_category',
        text: 'Description',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'element',
        text: 'Detail',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'cost',
        text: 'Unit Cost',
        flex: 1,
        //summaryType: 'sum',
        renderer: function (val) {
            return Ext.util.Format.number(val, '0,000.00');
        }
        /*summaryRenderer: function (val) {
            val = Ext.util.Format.number(val, '0,000.00');
            return '<b>' + val + '</b>';
        }*/
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
        dataIndex: 'tshs_equivalent',
        text: 'Equivalent(Amount)',
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
    }]
});
