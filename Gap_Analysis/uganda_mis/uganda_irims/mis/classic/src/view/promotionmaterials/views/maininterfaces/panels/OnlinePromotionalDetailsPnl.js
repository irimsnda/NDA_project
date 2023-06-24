/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.OnlinePromotionalDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinepromotionaldetailspnl',
    layout: {//
        type: 'fit'
    },autoScroll: true,
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
   
    items: [{
        xtype: 'promotionalappdetailsfrm',
        autoScroll: true,
        title: 'Product Particulars'
    }, {
        xtype: 'promotiommaterialproductgrid',
        title: 'Product Particulars',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'promotiommaterialproductgridstr',
                    proxy: {
                        url: 'promotionmaterials/getOnlinePromotionMaterialsProductParticular',
                    }
                },
                isLoad: true
            }
        },
    },  {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});