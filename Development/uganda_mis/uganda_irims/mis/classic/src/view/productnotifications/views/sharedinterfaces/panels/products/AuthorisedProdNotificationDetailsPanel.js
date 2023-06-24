
/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.productnotification.views.sharedinterfaces.panels.products.AuthorisedProdNotificationDetailsPanel', {
    extend: 'Admin.view.productnotification.views.sharedinterfaces.panels.products.AuthorisedProdNotificationDetailsPnl',
    xtype: 'authorisedprodnotificationdetailspanel',
    layout: {//
        type: 'fit'
    },
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productnotificationsvm'
    },
    controller:'productnotificationsvctr',
    bbar:[{
        text: 'Update Product Application Details',
        ui: 'soft-purple',
        iconCls: 'fa fa-save',
        name: 'save_btn',
        action_url: 'productnotification/onSaveProductNotificationinformation',
        handler: 'saveProductInformation'
    }]
});