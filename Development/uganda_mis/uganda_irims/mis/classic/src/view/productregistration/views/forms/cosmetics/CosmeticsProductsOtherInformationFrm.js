
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.cosmetics.CosmeticsProductsOtherInformationFrm', {
    extend: 'Ext.tab.Panel',
    xtype: 'cosmeticsproductsotherinformationfrm',
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
                    storeId: 'cosmeticsproductingredientsstr',
    
                    proxy: {
                        url: 'productregistration/onLoadproductIngredients',
                    }
                },
                isLoad: true
            }
        }
    }, ,{
        xtype: 'productImagesUploadsGrid',
        title: 'Product Labels'
    } ,{
        xtype: 'foodproductpackaginggrid',
        hidden:true,
        title: 'Product Packaging details',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'drugproductPackagingdetailsstr',
                    proxy: {
                        url: 'productregistration/onLoadproductPackagingDetails',
                    }
                },
                isLoad: true
            }
        },
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
                        url: 'productregistration/onLoadproductManufacturer',
                    }
                },
                isLoad: true
            }
        },

    }, {
        xtype: 'productApiManuctureringGrid',
        title: 'Product API Manufacturer',  hidden:true,
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'productApiManuctureringStr',
                    proxy: {
                        url: 'productregistration/onLoadproductApiManufacturer',
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'productGmpInspectionDetailsGrid',
        title: 'GMP Inspection Details',  hidden:true,
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'gmpInspectionApplicationsDetailsStr',
                    proxy: {
                        url: 'productregistration/onLoadproductGmpInspectionDetailsStr',
                        
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'inspectioninothercountriesGrid',
        title: 'GMP Inspection In Other Countries'  ,hidden:true,
        
    },{
        xtype: 'productreginothercountriesGrid',
        title: 'Registration In Other Countries '  ,hidden:true,
        
    },{
        xtype: 'conductedproductclinicaltrialGrid',
        title: 'Undertaken Clinical Trials'  ,hidden:true,
        
    }]
});