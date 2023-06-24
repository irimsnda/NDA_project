Ext.define('Admin.view.configurations.views.panels.TransportModesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'transportmodes',
    title: 'Transport Modes',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'transportmodesGrid'
        }
    ],

});
