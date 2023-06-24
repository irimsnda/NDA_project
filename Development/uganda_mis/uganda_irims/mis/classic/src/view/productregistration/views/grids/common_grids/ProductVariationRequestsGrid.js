/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductVariationRequestsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.VariationRequestsAbstractGrid',
    xtype: 'productvariationrequestsgrid',
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
            var grid=this.up('grid');
                 grid.fireEvent('refresh', grid);
        }
    }],
    columns: []
});