Ext.define('Admin.view.commoninterfaces.grids.ReinvoicingDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'commoninterfacesVctr',
    xtype: 'reinvoicingdetailsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.store,
                grid = this.up('grid'),
                container = grid.up('#contentPanel'),
                active_application_code = container.down('hiddenfield[name=active_application_code]').getValue(),
                module_id = container.down('hiddenfield[name=module_id]').getValue();

            store.getProxy().extraParams = {
                application_code: active_application_code,
                module_id: module_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'reinvoicingdetailsgridStr',
                proxy: {
                    url: 'revenuemanagement/getRaisedApplicationReinvoices'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer',
        text: 'S/N'
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice Number',
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
    }
    // ,{
    //     xtype: 'gridcolumn',
    //     dataIndex: 'equivalent_paid',
    //     text: 'Equivalent(Paying Curreny)',
    //     flex: 1,
    //     summaryType: 'sum',
    //     renderer: function (val,meta) {
    //         meta.tdStyle = 'color:#005985';
    //         return Ext.util.Format.number(val, '0,000.00');
    //     },
    //     summaryRenderer: function (val) {
    //         val = Ext.util.Format.number(val, '0,000.00');
    //         return '<b>' + val + '</b>';
    //     }
    // }
    , {
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
