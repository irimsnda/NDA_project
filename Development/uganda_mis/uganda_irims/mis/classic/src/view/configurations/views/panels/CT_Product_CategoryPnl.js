Ext.define('Admin.view.configurations.views.panels.CT_Product_CategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'ct_product_category',
    title: 'Investigators Category',
    userCls: 'big-100 small-100',
    padding: 2,
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'ct_product_categoryGrid'
        }
    ]
});
