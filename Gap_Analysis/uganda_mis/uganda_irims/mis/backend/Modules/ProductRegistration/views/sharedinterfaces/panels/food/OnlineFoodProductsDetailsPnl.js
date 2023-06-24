
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.food.OnlineFoodProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'onlinefoodproductsdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
    items: [{
        xtype: 'foodproductdetailsfrm',
        autoScroll: true,
        title: 'Product Details'
    }, {
        xtype: 'onlinefoodproductsotherinformationfrm',//foodproductsotherinformationfrm
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