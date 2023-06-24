
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.OnlineDrugsProductsOtherInformationFrm', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinedrugsproductsotherinformationfrm',
    layout: {
        // layout-specific configs go here
        type: 'fit'
    },
    defaults:{
        margin: 3
    },
    height: '100%',
    autoScroll: true,
    items: [{
        xtype: 'drugsIngredientsGrid',
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
        },
    }, {
        xtype: 'drugsProductPackagingGrid',
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
        },
    },  {
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
        },
        
    }, {
        xtype: 'productImagesUploadsGrid',
        title: 'Products Labels & Images',
        listeners: {
            beforerender: {
                fn: 'setConfigGridsStore',
                config: {
                    pageSize: 1000,
                    storeId: 'productimagesUploadsStr',
                    groupField: 'document_type_id',
                    proxy: {
                        url: 'documentmanagement/onLoadOnlineProductImagesUploads',
                    }
                },
                isLoad: true
            }
        }
    }]
});