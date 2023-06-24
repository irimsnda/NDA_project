/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductVariationRequestsOnlineGrid', {
    extend: 'Admin.view.commoninterfaces.grids.VariationRequestsAbstractGrid',
    xtype: 'productvariationrequestsonlinegrid',
    config: {
        isOnline: 1
    },
    tbar: [],
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
                win = grid.up('window'),
                
                application_id = win.down('hiddenfield[name=active_application_id]').getValue(),
                application_code = win.down('hiddenfield[name=active_application_code]').getValue();

                store.getProxy().extraParams = {
                    application_id: application_id,
                    application_code: application_code,
                    isOnline: isOnline//1
                }
        }
    }],
    columns: []
});