Ext.define('Admin.view.configurations.views.panels.ManufacturerConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'manufacturerConfig',
    title: 'Manufacturer Config',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'manufacturerConfigGrid'
        }
    ],

});

