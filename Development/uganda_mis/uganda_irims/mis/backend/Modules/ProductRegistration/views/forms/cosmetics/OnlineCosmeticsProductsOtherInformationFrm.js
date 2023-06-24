
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.cosmetics.OnlineCosmeticsProductsOtherInformationFrm', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinecosmeticsproductsotherinformationfrm',
    layout: {
        // layout-specific configs go here
        type: 'fit'
    },
    defaults: {
        margin: 3
    },
    items: [{
        xtype: 'cosmeticsingredientsgrid',
        title: 'Product Ingredients',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'drugproductIngredientsstr',
                    proxy: {
                        url: 'productregistration/onLoadOnlineproductIngredients',
                    }
                },
                isLoad: true
            }
        }
    },  {
        xtype: 'foodproductpackaginggrid',
        title: 'Product Packaging details',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'drugproductPackagingdetailsstr',
                    proxy: {
                        url: 'productregistration/onLoadOnlineproductPackagingDetails',
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'productManuctureringGrid',
        title: 'Product Manufacturing Details',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'productManuctureringStr',
                    proxy: {
                        url: 'productregistration/onLoadOnlineproductManufacturer',
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'productApiManuctureringGrid',
        title: 'Product API Manufacturer',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'productApiManuctureringStr',
                    proxy: {
                        url: 'productregistration/onLoadOnlineproductApiManufacturer',
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'productGmpInspectionDetailsGrid',
        title: 'GMP Inspection Details',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'gmpInspectionApplicationsDetailsStr',
                    proxy: {
                        url: 'productregistration/onLoadOnlinegmpInspectionApplicationsDetails',
                        
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'productImagesUploadsGrid',
        title: 'Product Images'
    }]
});