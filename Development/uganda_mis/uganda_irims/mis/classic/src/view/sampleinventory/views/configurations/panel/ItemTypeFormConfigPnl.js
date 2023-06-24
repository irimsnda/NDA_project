Ext.define('Admin.view.sampleinventory.views.configurations.panel.ItemTypeFormConfigPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'itemtypeformconfig',
    title: 'Item Type Form Configs',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'itemtypeformconfigGrid'
        }
    ]
});
