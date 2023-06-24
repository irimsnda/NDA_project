Ext.define('Admin.view.configurations.views.panels.OnlineAppInvoiceGenerationQueries', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineappinvoicegenerationqueries',
    title: 'Cost Items',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'onlineappinvoicegenerationqueriesgrid'
        }
    ],

});