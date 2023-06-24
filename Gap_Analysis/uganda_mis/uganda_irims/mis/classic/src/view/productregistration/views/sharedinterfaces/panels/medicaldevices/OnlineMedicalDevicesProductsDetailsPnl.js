
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.OnlineMedicalDevicesProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinemedicaldevicesdroductsdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
    items: [{
        xtype: 'medicaldevicesProductsDetailsFrm',
        autoScroll: true,
        title: 'Product Details'
    }, {
        xtype: 'onlinemedicaldevicesproductsotherinformationfrm',//foodproductsotherinformationfrm
        title: 'Product Other Details',
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});