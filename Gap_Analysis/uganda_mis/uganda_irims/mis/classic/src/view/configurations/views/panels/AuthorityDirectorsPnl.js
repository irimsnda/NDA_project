Ext.define('Admin.view.configurations.views.panels.AuthorityDirectorsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'authoritydirectors',
    title: 'Authority Directors',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'authoritydirectorsGrid'
        }
    ]
});
