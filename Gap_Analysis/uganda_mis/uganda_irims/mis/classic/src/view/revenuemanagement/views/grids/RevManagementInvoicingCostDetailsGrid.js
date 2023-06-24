/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.grids.RevManagementInvoicingCostDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'revmanagementinvoicingcostdetailsgrid',
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
        hidden: true,
        
    }],
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 200, 
                storeId: 'revmanagementinvoicingcostdetailsgridstr',
                proxy: {
                    url: 'api/getApplicationInvoiceDetails',
                    reader: {
                        type: 'json',
                        totalProperty: 'totals'
                    },
                }
            },
            isLoad: false
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'category',
        text: 'Category',
        flex: 1,
        summaryRenderer: function () {
            return '<b>TOTAL Invoice Amount:</b>';
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
        text: 'Equivalent(Converted)',
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
    }]
});
