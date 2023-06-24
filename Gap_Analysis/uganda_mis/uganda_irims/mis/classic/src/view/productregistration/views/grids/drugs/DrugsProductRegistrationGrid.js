
Ext.define('Admin.view.productregistration.views.grids.drugs.DrugsProductRegistrationGrid', {
    extend: 'Admin.view.productregistration.views.grids.common_grids.ProductRegistrationGrid',
    controller: 'productregistrationvctr',
    xtype: 'drugsproductregistrationgrid',
    itemId: 'drugsproductregistrationgrid',
    store: 'drugproductregistrationstr',
    listeners: {
        beforerender: function (grid) {
            grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        store: 'drugproductregistrationstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('drugsproductregistrationgrid').fireEvent('refresh', this);

        }
    }]
});