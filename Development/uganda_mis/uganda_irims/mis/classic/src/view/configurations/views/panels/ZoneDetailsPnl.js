Ext.define('Admin.view.configurations.views.panels.ZoneDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'zones_details',
    title: 'Zone Details',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'zonesdetailsGrid'
        }
    ]
});
