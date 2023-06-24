/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.grids.ManSitePersonnelDetailsWinGrid', {
    extend: 'Admin.view.gmpapplications.views.grids.ManSitePersonnelDetailsGrid',
    xtype: 'mansitepersonneldetailswingrid',
    tbar: [{
        xtype: 'hiddenfield',
        name: 'isReadOnly'
    },{
        xtype: 'button',
        text: 'Add Personnel',
        iconCls: 'x-fa fa-plus',
        ui: 'soft-green',
        name: 'add_personnel',
        action: 'add_personnel_win',
        winTitle: 'Manufacturing Site Personnel Details',
        childXtype: 'premisesuperintendentfrm',
        winWidth: '65%',
        storeID: 'mansitepersonneldetailsstr',
        action_url: 'gmpapplications/saveManSitePersonnelLinkageDetails',
        stores: '[]'
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
            var store=this.getStore(),
                grid=this.up('grid'),
                win = grid.up('window'),
                site_id=win.down('mansitedetailsfrm').down('hiddenfield[name=manufacturing_site_id]').getValue();
            store.getProxy().extraParams={
                manufacturing_site_id: site_id
            };
        }
    }]
});