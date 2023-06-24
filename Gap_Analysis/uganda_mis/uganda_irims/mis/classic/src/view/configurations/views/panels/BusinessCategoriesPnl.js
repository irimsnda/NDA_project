Ext.define('Admin.view.configurations.views.panels.BusinessCategoriesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'businesscategories',
    title: 'Business Categories',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'bsnCategryGrid'
        }
    ]
});
