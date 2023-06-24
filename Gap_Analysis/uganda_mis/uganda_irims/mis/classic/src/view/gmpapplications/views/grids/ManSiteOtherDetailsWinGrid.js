/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ManSiteOtherDetailsWinGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ManSiteOtherDetailsGrid',
    xtype: 'mansiteotherdetailswingrid',
    config: {
        isOnline: 0,
        isCompare: 0
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    }, {
        xtype: 'hiddenfield',
        name: 'is_temporal',
        value: 0
    }, {
        xtype: 'button',
        text: 'Add Detail',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_details',
        action: 'add_details_win',
        winTitle: 'Manufacturing Site Details',
        childXtype: 'mansiteotherdetailsfrm',
        winWidth: '35%',
        stores: '[]',
        isManufacturer: 1
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