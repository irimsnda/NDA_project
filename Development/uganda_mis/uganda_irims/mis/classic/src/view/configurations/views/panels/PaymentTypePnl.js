Ext.define('Admin.view.configurations.views.panels.PaymentTypePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'paymenttypes',
    title: 'paymenttypes',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'paymenttypeGrid'
        }
    ]
});
