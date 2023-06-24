Ext.define('Admin.view.configurations.views.panels.System_modulespnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'system_modulespnl',
    title: 'System Modules',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'system_modulesgrid'
        }
    ]
});
