/**
 * Created by Kip on 5/29/2019.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.ProductDataAppealRequestsGrid', {
    extend: 'Admin.view.commoninterfaces.grids.AppDataAppealRequestsAbstractGrid',
    xtype: 'productdataappealrequestsgrid',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            this.up('grid').fireEvent('refresh', this);
        }
    }],
  
    columns: []
});