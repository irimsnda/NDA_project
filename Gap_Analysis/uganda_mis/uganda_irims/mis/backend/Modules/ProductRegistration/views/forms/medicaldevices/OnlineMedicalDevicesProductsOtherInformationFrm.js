
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.medicaldevices.OnlineMedicalDevicesProductsOtherInformationFrm', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinemedicaldevicesproductsotherinformationfrm',
    layout: {
        // layout-specific configs go here
        type: 'fit'
    },
    defaults:{
        margin: 3
    },
    items: [  {
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