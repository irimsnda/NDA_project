/**
 * Created by Kip on 5/14/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ManSiteBlockDetailsWinGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ManSiteBlockDetailsGrid',
    xtype: 'mansiteblockdetailswingrid',
    config: {
        isOnline: 0,
        isCompare: 0
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                isOnline = grid.getIsOnline(),
                isCompare = grid.getIsCompare(),
                win = grid.up('window'),
                site_id;
            if (isCompare == 1 || isCompare === 1) {
                if (isOnline == 1 || isOnline === 1) {
                    site_id = grid.up('window').down('gmpportalcomparepreviewpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
                } else {
                    site_id = grid.up('window').down('gmpmiscomparepreviewpnl').down('hiddenfield[name=manufacturing_site_id]').getValue();
                }
            } else {
                site_id = win.down('mansitedetailsfrm').down('hiddenfield[name=manufacturing_site_id]').getValue();
            }
            store.getProxy().extraParams = {
                manufacturing_site_id: site_id,
                isOnline: isOnline
            };
        }
    }]
});