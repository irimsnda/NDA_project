Ext.define('Admin.view.configurations.views.panels.DateOptionsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'dateoptions',
    title: 'Date Options',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'dateoptionsGrid'
        }
    ]
});
