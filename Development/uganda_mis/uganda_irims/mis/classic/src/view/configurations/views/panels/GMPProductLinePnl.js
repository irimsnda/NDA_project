
Ext.define('Admin.view.configurations.views.panels.GMPProductLinePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gMPProductLinePnl',
    title: 'GMP Product Line',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'gMPProductLineGrid'
        }
    ]
});
