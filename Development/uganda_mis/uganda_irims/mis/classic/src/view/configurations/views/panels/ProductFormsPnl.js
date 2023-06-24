
/**
 * Created by Kip on 10/2/2018.
 */
Ext.define('Admin.view.configurations.views.panels.ProductFormsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productFormsPnl',
    title: 'Product Forms',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'productFormsGrid'

        }
    ]
});
