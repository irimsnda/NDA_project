Ext.define('Admin.view.configurations.views.panels.ProductRegChargesConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productregChargesConfig',
    title: 'Product Invoice Charges Config',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'productregChargesConfigGrid'
        }
    ]
});
