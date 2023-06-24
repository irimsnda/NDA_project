Ext.define('Admin.view.promotionmaterials.views.grids.PromotionMaterialHomeGrid', {
    //extend: 'Admin.view.productregistration.views.grids.common_grids.ProductRegistrationGrid',
	extend:'Admin.view.view.promotionmaterials.views.grids.common.PromotionMaterialApplicationGrid',
    controller: 'promotionmaterialviewcontroller',
    xtype: 'promotionmaterialhomegrid',
    itemId: 'promotionmaterialhomegrid',
    store: 'promotionmaterialapplicationstr',
    listeners:{
        beforerender:function(grid){
            grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        
    store: 'promotionmaterialapplicationstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('promotionmaterialhomegrid').fireEvent('refresh', this);

        }
    }],
});