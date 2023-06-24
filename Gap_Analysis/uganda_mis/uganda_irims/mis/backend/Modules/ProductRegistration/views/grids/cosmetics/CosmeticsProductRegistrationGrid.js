

Ext.define('Admin.view.productregistration.views.grids.cosmetics.CosmeticsProductRegistrationGrid', {
    extend: 'Admin.view.productregistration.views.grids.common_grids.ProductRegistrationGrid',
    controller: 'productregistrationvctr',
    xtype: 'cosmeticsproductregistrationgrid',
    itemId: 'cosmeticsproductregistrationgrid',
    store: 'cosmeticsproductregistrationstr',
    listeners:{
        beforerender:function(grid){
            grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'cosmeticsproductregistrationstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('cosmeticsproductregistrationgrid').fireEvent('refresh', this);

        }
    }],
});