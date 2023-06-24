/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.grids.OnlineImpProductsGrid', {
    extend: 'Admin.view.clinicaltrial.views.grids.ImpProductsAbstractGrid',
    xtype: 'onlineimpproductsgrid',
    config: {
        isCompare: 0
    },
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [
        {
            xtype: 'hiddenfield',
            name: 'isReadOnly'
        }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                isCompare = grid.getIsCompare(1),
                pnlXtype = 'clinicaltrialonlinepreviewpnl';
            if (isCompare == 1 || isCompare === 1) {
                pnlXtype = 'clinicaltrialportalcomparepreviewpnl';
            }
            var pnl = grid.up(pnlXtype),
                application_id = pnl.down('hiddenfield[name=active_application_id]').getValue();
            store.getProxy().extraParams = {
                application_id: application_id
            };
        }
    }],
    listeners: {
        beforerender: {
            fn: 'setClinicalTrialGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'onlineimpproductsstr',
                proxy: {
                    url: 'clinicaltrial/getOnlineImpProducts'
                }
            },
            isLoad: true
        }
    },
    columns: [
        {
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
                        text: 'View Details',
                        iconCls: 'x-fa fa-edit',
                        handler: 'showImpProductDetailsFromWin',
                        winTitle: 'IMP Product',
                        winWidth: '90%',
                        isReadOnly: true,
                        childXtype: 'onlineimpproductspnl'
                    }
                    ]
                }
            }
        }
    ]
});