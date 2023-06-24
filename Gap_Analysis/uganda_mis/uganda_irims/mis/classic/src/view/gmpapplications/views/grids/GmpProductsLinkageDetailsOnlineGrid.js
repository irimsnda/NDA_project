/**
 * Created by Kip on 4/9/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.GmpProductsLinkageDetailsOnlineGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.GmpProductsLinkageDetailsAbstractGrid',
    controller: 'gmpapplicationsvctr',
    xtype: 'gmpproductslinkagedetailsonlinegrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    config: {
        isCompare: 0
    },
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
        xtype: 'exportbtn'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                isCompare = grid.getIsCompare(),
                win = grid.up('window'),
                site_id;
            if (isCompare == 1 || isCompare === 1) {
                site_id = win.down('gmpportalcomparepreviewpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
            } else {
                site_id = win.down('hiddenfield[name=manufacturing_site_id]').getValue();
            }
            store.getProxy().extraParams = {
                site_id: site_id
            };
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setGmpApplicationGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'gmpproductslinkagedetailsstr',
                proxy: {
                    url: 'gmpapplications/getGmpProductInfoLinkageOnline'
                }
            },
            isLoad: false
        },
    },
    columns: []
});
