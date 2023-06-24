Ext.define('Admin.view.configurations.views.panels.ProcessSerialPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'processserial',
    title: 'Process Serial',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'processserialGrid'
        }
    ],

});
