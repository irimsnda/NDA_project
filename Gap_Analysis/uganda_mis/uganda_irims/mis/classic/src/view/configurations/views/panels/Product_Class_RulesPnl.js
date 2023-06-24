Ext.define('Admin.view.configurations.views.panels.Product_Class_RulesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'product_class_rules',
    title: 'Product Classification Rules',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'product_class_rulesGrid'
        }
    ]
});
