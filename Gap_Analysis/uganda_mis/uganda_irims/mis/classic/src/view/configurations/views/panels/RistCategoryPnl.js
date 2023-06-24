Ext.define('Admin.view.configurations.views.panels.RistCategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'riskCategory',
    title: 'Risk Category',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'riskCategoryGrid'
        }
    ]
});
