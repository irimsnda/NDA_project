Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.EditMedicalDevicesProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'editmedicaldevicesProductsDetailsPnl',
    layout: {//
        type: 'fit'
    },
    defaults: {
        margin: 3
    }, viewModel: {
        type: 'productregistrationvm'
    },
    autoScroll: true,
    listeners: {
        tabchange: 'funcActiveProductsOtherInformationTab'
    },
    items: [{
        xtype: 'editmedicaldevicesproductsdetailsfrm',
        autoScroll: true,
        title: 'Product Details'
    }, {
        xtype: 'drugsProductsOtherInformationFrm',
        title: 'Product Other Details',
    }, {
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});