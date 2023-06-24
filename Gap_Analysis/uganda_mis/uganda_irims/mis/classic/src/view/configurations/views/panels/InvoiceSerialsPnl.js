Ext.define('Admin.view.configurations.views.panels.InvoiceSerialsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'invoiceserials',
    title: 'Invoice Serials',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'invoiceserialsGrid'
        }
    ],

});
