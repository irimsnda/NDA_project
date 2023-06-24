
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionsOtherInformationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'promotionsotherinformationpnl',
    layout: {
        type: 'fit'
    },
    defaults:{
        margin: 3
    },
    height: '100%',
    autoScroll: true,
    items: [{
        xtype: 'promotiommaterialproductgrid',
        title: 'Product Particulars',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'promotiommaterialproductgridstr',
                    proxy: {
                        url: 'promotionmaterials/getPromotionMaterialsProductParticular',
                    }
                },
                isLoad: true
            }
        },
    }, {
        xtype: 'promotionmaterialdetailsgrid',
        title: 'Promotional Material',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'promotionmaterialdetailsgridstr',
                    proxy: {
                        url: 'promotionmaterials/getPromotionMaterialsDetails',
                    }
                },
                isLoad: true
            }
        },
    }]
});