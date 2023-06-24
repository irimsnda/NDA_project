/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.promotionmaterials.views.maininterfaces.panels.PromotionalDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'promotionaldetailspnl',
    layout: {//
        type: 'fit'
    },autoScroll: true,
    defaults:{
        margin: 3
    },viewModel: {
        type: 'productregistrationvm'
    },
   
    items: [{
        xtype: 'promotionalappdetailsfrm',
        autoScroll: true,
        title: 'Promotion Material Applications'
    }, {
        xtype: 'promotionsotherinformationpnl',
        title: 'Promotional Other Details',
    }, {
        xtype: 'hiddenfield',
        name: '_token',
        value: token
    }]
});