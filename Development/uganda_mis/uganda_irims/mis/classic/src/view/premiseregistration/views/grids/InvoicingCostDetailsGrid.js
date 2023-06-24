/**
 * Created by Kip on 10/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.InvoicingCostDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'premiseregistrationvctr',
    xtype: 'invoicingcostdetailsgrid',
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
    /*  tools: [{
          type: 'refresh',
          tooltip: 'Refresh',
          handler: function () {
              var me = this,
                  grid = me.up('grid'),
                  store = grid.store,
                  progressPnl = grid.up('userprogresspanel'),
                  user_id = progressPnl.down('hiddenfield[name=id]').getValue(),
                  accessPoint = progressPnl.down('combo[name=access_point_id]').getValue();
              store.load({params: {user_id: user_id, accessPointId: accessPoint}});
          }
      }],*/
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 10000,
                proxy: {
                    url: 'api/getApplicationInvoiceDetails'
                }
            },
            isLoad: false
        },
        beforeedit: function (editor, context, eOpts) {
            var me = this,
                grid = context.grid,
                isFastTrack = grid.up('invoicingpanel').down('checkbox[name=is_fast_track]').getValue();
            if (isFastTrack == 1 || isFastTrack === 1) {
                context.cancel = true;
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'category',
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
        dataIndex: 'quantity',
        text: 'Quantity',
        flex: 1,
        editor: {
            xtype: 'numberfield',
            minValue: 1,
            value: 1
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'cost',
        text: 'Unit Cost',
        flex: 1,
        //summaryType: 'sum',
        renderer: function (val) {
            return Ext.util.Format.number(val, '0,000.00');
        }
        /*  summaryRenderer: function (val) {
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
            /*    var qty = record.get('quantity'),
                    unitCost = record.get('cost');
                val = qty * unitCost;*/
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
    }]
});
