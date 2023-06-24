
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.cosmetics.CosmeticsProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'cosmeticsproductsdetailspnl',
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
        xtype: 'cosmeticsproductdetailsfrm',
        title: 'Product Details'
    }, {
        xtype: 'cosmeticsproductsotherinformationfrm',//foodproductsotherinformationfrm
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