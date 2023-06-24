
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.DrugsProductsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'drugsProductsDetailsPnl',
    // layout: {//
    //     type: 'fit'
    // },
    controller: 'productregistrationvctr',
    autoScroll: true,
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'productregistrationvm'
    },
    listeners: {
        tabchange: 'funcActiveProductsOtherInformationTab'
    },
    items: [{
        xtype: 'panel',
        itemId:'product_detailspanel',
        title: 'Product Details',
        autoScroll: true,
        items:[{
            xtype: 'drugsProductsDetailsFrm',
            autoScroll: true,
        }]
    }, {
        xtype: 'drugsProductsOtherInformationFrm',
        title: 'Product Other Details',
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    },{
        xtype: 'hiddenfield',
        name: 'prodclass_category_id'
    },{
        xtype: 'hiddenfield',
        name: 'product_id'
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});