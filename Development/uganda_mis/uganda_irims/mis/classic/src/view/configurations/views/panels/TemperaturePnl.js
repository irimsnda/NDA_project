Ext.define('Admin.view.configurations.views.panels.TemperaturePnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'temperature',
    title: 'Temperature',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'temperaturegrid'
        }
    ]
});
