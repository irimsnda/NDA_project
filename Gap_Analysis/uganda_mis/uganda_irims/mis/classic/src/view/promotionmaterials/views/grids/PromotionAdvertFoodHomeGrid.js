Ext.define('Admin.view.promotionmaterials.views.grids.PromotionAdvertFoodHomeGrid', {
   	extend:'Admin.view.promotionmaterials.views.grids.common.PromotionAdvertsCosmeticsApplicationGrid',
    controller: 'promotionmaterialviewcontroller',
    xtype: 'promotionadvertfoodhomegrid',
    itemId: 'promotionadvertfoodhomegrid',
    store: 'promotionadvertsfoodapplicationstr',
    listeners:{
        beforerender:function(grid){
            grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        
        store: 'promotionadvertsfoodapplicationstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('promotionadvertfoodhomegrid').fireEvent('refresh', this);

        }
    }],
});