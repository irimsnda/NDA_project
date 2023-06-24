Ext.define('Admin.view.configurations.views.panels.FormCategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'formCategoryPnl',
    title: 'Forms Categories',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'formCategoryGrid'
        }
    ]
});
