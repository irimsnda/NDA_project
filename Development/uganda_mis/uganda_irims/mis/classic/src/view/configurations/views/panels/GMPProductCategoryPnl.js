Ext.define('Admin.view.configurations.views.panels.GMPProductCategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gMPProductCategoryPnl',
    title: 'GMP Product Description',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'gMPProductCategoryGrid'
        }
    ]
});
