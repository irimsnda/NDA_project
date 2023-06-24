
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.food.FoodProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'foodproductsdetailspnl',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
    listeners: {
        tabchange: 'funcActiveProductsOtherInformationTab' 
    },
    items: [{
        xtype: 'foodproductdetailsfrm',
        title: 'Product Details'
    }, {
        xtype: 'foodproductsotherinformationfrm',//foodproductsotherinformationfrm
        title: 'Product Other Details',
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});