
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productnotification.views.sharedinterfaces.panels.products.AuthorisedProdNotificationDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'authorisedprodnotificationdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productnotificationsvm'
    },
    items: [{
        xtype: 'authorisedprodnotificationdetailsfrm',
        autoScroll: true,
        title: 'Product Details'
    },{
      xtype: 'productnotificationnanuctureringgrid',
      title: 'Product Manufacturing Site Details',
       
    },{
        xtype: 'productImagesUploadsGrid',
        title: 'Product Images',
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
        },
    },{
        xtype: 'productDocUploadsGrid',
        title: 'Product Application Documents Submission',
        height: 350
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});