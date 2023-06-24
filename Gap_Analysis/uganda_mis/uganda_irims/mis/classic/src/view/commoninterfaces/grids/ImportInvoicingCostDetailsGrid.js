/**
 * Created by Softclans on 10/12/2018.
 */
Ext.define('Admin.view.commoninterfaces.grids.ImportInvoicingCostDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'importinvoicingcostdetailsgrid',
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
    selType: 'cellmodel',
    selModel: 'checkboxmodel',
    plugins: [
        {
            ptype: 'cellediting',
            clicksToEdit: 1
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        hidden: true,
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
                    url: 'revenuemanagement/getImportFOBApplicationInvoiceDetails'
                }
            },
            isLoad: false
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_description',
        text: 'Invoice Description',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cost_category',
        text: 'Category',
        flex: 1,
        summaryRenderer: function () {
            return '<b>TOTAL:</b>';
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'fob',
        text: 'FOB Value',
        flex: 1
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'formula_rate',
        text: 'Formuar Rate',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1,
        editor: {
            xtype: 'numberfield',
            minValue: 1,
            value: 1
        }
    },{
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
        dataIndex: 'cost',
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        text: 'Currency',
        hidden: true,
        flex: 1
    }]
});
