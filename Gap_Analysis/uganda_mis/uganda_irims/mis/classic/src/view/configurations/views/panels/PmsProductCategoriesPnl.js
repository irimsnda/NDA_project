Ext.define('Admin.view.configurations.views.panels.PmsProductCategoriesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'pmsproductcategories',
    title: 'PMS Product Categories',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'pmsproductcategoriesGrid'
        }
    ]
});