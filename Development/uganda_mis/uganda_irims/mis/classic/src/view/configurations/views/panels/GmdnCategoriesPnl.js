Ext.define('Admin.view.configurations.views.panels.GmdnCategoriesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmdnCategoriesPnl',
    title: 'GMDN Category',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'gmdnCategoriesGrid'
        }
    ]
});
