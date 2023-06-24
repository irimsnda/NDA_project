Ext.define('Admin.view.configurations.views.panels.DestructionSitePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'destructionSitePnl',
    title: 'Disposal Destruction Site',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'destructionSiteGrid'
        }
    ]
});
