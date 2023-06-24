
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.drugs.DrugsProductsDetailsPanel', {
    extend: 'Admin.view.productregistration.views.sharedinterfaces.panels.drugs.DrugsProductsDetailsPnl',
    xtype: 'drugsProductsDetailsPanel',
    controller: 'productregistrationvctr',
    itemId:'product_detailspanel',
    autoScroll: true,
    // layout: {
    //     type: 'fit'
    // },
    defaults:{
        margin: 3
    },
    viewModel: {
        type: 'productregistrationvm'
    },
    height: 550,
    bbar:['->',{
        text: 'Update Product Application Details',
        ui: 'soft-purple',
        iconCls: 'fa fa-save',
        name: 'save_btn',
        action_url: 'productregistration/onSaveProductinformation',
        handler: 'saveProductInformation'
    }]
});