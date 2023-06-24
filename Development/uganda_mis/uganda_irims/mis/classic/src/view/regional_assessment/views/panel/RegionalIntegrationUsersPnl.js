Ext.define('Admin.view.regional_assessment.views.panel.RegionalIntegrationUsersPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'regionalintegrationusers',
    title: 'Regional Integration Users',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'regionalintegrationusersGrid'
        }
    ]
});
