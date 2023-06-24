Ext.define('Admin.view.configurations.views.panels.ReceiptSerialPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'receiptserial',
    title: 'Receipt Serial',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'receiptserialGrid'
        }
    ],

});
