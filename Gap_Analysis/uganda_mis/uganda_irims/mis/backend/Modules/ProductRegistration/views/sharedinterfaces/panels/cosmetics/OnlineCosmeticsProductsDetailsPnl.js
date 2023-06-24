
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.medicaldevices.OnlineCosmeticsProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinecosmeticsproductsdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
    items: [{
        xtype: 'cosmeticsproductdetailsfrm',
        autoScroll: true,
        title: 'Product Details'
    }, {
        xtype: 'onlinecosmeticsproductsotherinformationfrm',//foodproductsotherinformationfrm
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