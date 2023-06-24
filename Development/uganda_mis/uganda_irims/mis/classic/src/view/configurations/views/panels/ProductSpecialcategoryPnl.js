/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.ProductSpecialcategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productSpecialcategoryPnl',
    title: 'Product Category',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'productSpecialcategoryGrid'
        }
    ]
});
