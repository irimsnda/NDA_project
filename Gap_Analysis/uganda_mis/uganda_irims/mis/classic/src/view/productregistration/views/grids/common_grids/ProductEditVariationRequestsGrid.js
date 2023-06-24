/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductEditVariationRequestsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.VariationRequestsAbstractGrid',
    xtype: 'producteditvariationrequestsgrid',
    config: {
        isOnline: 0
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () { 
            var grid=this.up('grid'),
                wrapper = grid.up('panel'),
                store = grid.getStore(),
                application_code = wrapper.down('hiddenfield[name=active_application_code]').getValue(),
                application_id = wrapper.down('hiddenfield[name=active_application_id]').getValue();
            grid.down('hiddenfield[name=application_code]').setValue(application_code);
            grid.down('hiddenfield[name=application_id]').setValue(application_id);
            store.getProxy().extraParams = {
                    application_code:application_code,
                    application_id: application_id
                }
        }
    }],
    columns: []
});