/**
 * Created by onesmas on 09/07/2019.
 */
Ext.define('Admin.view.configurations.views.panels.ProductIngredientsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productIngredientsPnl',
    title: 'Product Ingredients Names',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'productIngredientsGrid'
        }
    ]
});
