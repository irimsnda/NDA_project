Ext.define('Admin.view.configurations.views.panels.ManTypesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'man_types',
    title: 'Manufacturer Types',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'mantypeGrid'
        }
    ]
});
