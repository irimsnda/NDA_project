
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.MedDevProductDataAmmendPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'meddevproductdataammendpnl',
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
        xtype: 'medicaldevicesProductsDetailsFrm',
        title: 'Product Details'
    }, {
        xtype: 'medicaldevicesProductsOtherInformationFrm',
        title: 'Medical Devices Other Details',
    }, {
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});