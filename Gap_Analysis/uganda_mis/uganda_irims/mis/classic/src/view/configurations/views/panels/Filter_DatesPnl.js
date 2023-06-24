Ext.define('Admin.view.configurations.views.panels.Filter_DatesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'filter_dates',
    title: 'Clinical Trial Personnel',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'filter_datesGrid'
        }
    ]
});
