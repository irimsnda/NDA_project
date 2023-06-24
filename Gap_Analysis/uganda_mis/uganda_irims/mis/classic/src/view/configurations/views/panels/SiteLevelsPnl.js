Ext.define('Admin.view.configurations.views.panels.SiteLevelsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'sitelevels',
    title: 'Site Levels',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'sitelevelsgrid'
        }
    ]
});
