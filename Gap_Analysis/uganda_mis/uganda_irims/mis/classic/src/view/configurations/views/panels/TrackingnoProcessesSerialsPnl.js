Ext.define('Admin.view.configurations.views.panels.TrackingnoProcessesSerialsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'trackingnoprocessesserials',
    title: 'Trackingno Processes Serials',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'trackingnoprocessesserialsGrid'
        }
    ],

});
