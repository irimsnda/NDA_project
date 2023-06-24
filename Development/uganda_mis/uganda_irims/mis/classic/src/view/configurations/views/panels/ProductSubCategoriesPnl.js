/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.ProductSubCategoriesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productSubCategoriesPnl',
    title: 'Product Category',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'productSubCategoriesGrid'
        }
    ]
});
