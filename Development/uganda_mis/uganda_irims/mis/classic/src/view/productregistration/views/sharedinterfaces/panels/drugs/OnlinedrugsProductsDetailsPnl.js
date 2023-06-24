/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.OnlinedrugsProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinedrugsproductsdetailspnl',
    layout: {//
        //type: 'fit'
    },autoScroll: true,
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
   
    items: [{
        xtype: 'drugsProductsDetailsFrm',
        autoScroll: true,
        title: 'Product Details'
    }, {
        xtype: 'onlinedrugsproductsotherinformationfrm',
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