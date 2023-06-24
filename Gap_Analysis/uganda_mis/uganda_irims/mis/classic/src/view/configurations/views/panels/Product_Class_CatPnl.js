Ext.define('Admin.view.configurations.views.panels.Product_Class_CatPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'product_class_cat',
    title: 'Product Classification Category',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'product_class_catGrid'
        }
    ]
});
