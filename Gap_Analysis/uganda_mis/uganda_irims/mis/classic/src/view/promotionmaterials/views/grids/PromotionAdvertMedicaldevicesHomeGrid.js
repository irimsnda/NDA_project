Ext.define('Admin.view.promotionmaterials.views.grids.PromotionAdvertMedicaldevicesHomeGrid', {
   	extend:'Admin.view.promotionmaterials.views.grids.common.PromotionAdvertsMedicalDevicesApplicationGrid',
    controller: 'promotionmaterialviewcontroller',
    xtype: 'promotionadvertmedicaldeviceshomegrid',
    itemId: 'promotionadvertmedicaldeviceshomegrid',
    store: 'promotionadvertsmedicaldevicesapplicationsstr',
    listeners:{
        beforerender:function(grid){
            grid.store.load();
        }
    },
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        
    store: 'promotionadvertsmedicaldevicesapplicationsstr',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {

            this.up('promotionadvertmedicaldeviceshomegrid').fireEvent('refresh', this);

        }
    }],
});