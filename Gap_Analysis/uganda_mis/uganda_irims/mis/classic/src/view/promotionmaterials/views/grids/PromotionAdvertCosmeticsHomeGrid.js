Ext.define('Admin.view.promotionmaterials.views.grids.PromotionAdvertCosmeticsHomeGrid', {
   	extend:'Admin.view.promotionmaterials.views.grids.common.PromotionAdvertsCosmeticsApplicationGrid',
    controller: 'promotionmaterialviewcontroller',
    xtype: 'promotionadvertcosmeticshomegrid',
    itemId: 'promotionadvertcosmeticshomegrid',
    store: 'promotionadvertscosmeticapplicationstr',
    listeners:{
        beforerender:function(grid){
            grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        
         store: 'promotionadvertscosmeticapplicationstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('promotionadvertcosmeticshomegrid').fireEvent('refresh', this);

        }
    }],
});