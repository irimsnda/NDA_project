
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.MedicalDevicesProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'medicaldevicesProductsDetailsPnl',
    // layout: {//
    //     type: 'fit'
    // },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
    listeners: {
        tabchange: 'funcActiveProductsOtherInformationTab' 
    },
    items: [{
        xtype: 'medicaldevicesProductsDetailsFrm',
        title: 'Product Details'
    }, {
        xtype: 'medicaldevicesProductsOtherInformationFrm',
        title: 'Product Other Details',
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});