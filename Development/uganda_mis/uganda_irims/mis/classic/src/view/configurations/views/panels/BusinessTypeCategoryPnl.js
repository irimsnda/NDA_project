Ext.define('Admin.view.configurations.views.panels.BusinessTypeCategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'businessTypeCategory',
    title: 'BusinessTypeCategory',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'businessTypeCategoryGrid'
        }
    ]
});
