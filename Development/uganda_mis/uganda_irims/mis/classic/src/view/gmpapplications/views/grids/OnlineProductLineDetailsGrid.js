/**
 * Created by Kip on 1/9/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.OnlineProductLineDetailsGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ProductLineAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'onlineproductlinedetailsgrid',
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
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'button',
        text: 'Add Product Line',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_line',
        winTitle: 'GMP Product Line Details',
        childXtype: 'productlinedetailsfrm',
        winWidth: '35%',
        hidden: true,
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Product line Details',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        store: 'onlineproductlinedetailsstr',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store=this.getStore(),
                grid=this.up('grid'),
                site_id=grid.up('panel').down('hiddenfield[name=manufacturing_site_id]').getValue();
            store.getProxy().extraParams={
                site_id: site_id
            };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    store: 'onlineproductlinedetailsstr',
    columns:[]
});
