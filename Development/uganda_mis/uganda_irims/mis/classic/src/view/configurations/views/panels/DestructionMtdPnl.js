Ext.define('Admin.view.configurations.views.panels.DestructionMtdPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'destructionMtdPnl',
    title: 'Destruction Methods',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'destructionMtdGrid'
        }
    ]
});
