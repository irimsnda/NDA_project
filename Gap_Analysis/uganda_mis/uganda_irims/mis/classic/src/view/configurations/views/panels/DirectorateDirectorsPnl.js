Ext.define('Admin.view.configurations.views.panels.DirectorateDirectorsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'directoratedirectors',
    title: 'Directorate Directors',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'directoratedirectorsGrid'
        }
    ]
});
