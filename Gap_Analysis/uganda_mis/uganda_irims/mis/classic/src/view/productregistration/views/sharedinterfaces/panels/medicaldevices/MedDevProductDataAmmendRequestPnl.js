
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.MedDevProductDataAmmendRequestPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'meddevproductdataammendrequestpnl',
    layout: {//
        type: 'fit'
    },
    defaults: {
        margin: 3
    }, viewModel: {
        type: 'productregistrationvm'
    },
    itemId:'product_panel',
    listeners: {
        tabchange: 'funcActiveProductsOtherInformationTab'
    },
    items: [{
        xtype: 'searchmedicaldevicesproductsdetailsfrm',
        title: 'Product Details'
    }, {
        xtype: 'medicaldevicesProductsOtherInformationFrm',
        title: 'Medical Device Other Details',
    }, {
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});