Ext.define('Admin.view.configurations.views.panels.ApplicationInvoiceGenerationQueries', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationinvoicegenerationqueries',
    title: 'Cost Items',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'applicationinvoicegenerationqueriesgrid'
        }
    ],

});