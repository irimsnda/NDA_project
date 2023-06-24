/**
 * Created by Kip on 12/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.grids.AmendedPremisePersonnelDetailsGrid', {
    extend: 'Admin.view.premiseregistration.views.grids.PremisePersonnelDetailsGrid',
    xtype: 'amendedpremisepersonneldetailsgrid',
    width: '',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var store = this.getStore(),
                grid = this.up('grid'),
                panel = grid.up('premisealterationcomparedetails'),
                premise_id = panel.down('amendedpremisedetailsfrm').down('hiddenfield[name=premise_id]').getValue();
            store.getProxy().extraParams = {
                premise_id: premise_id
            };
        }
    }]
});