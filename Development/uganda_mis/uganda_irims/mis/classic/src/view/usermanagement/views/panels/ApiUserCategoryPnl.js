Ext.define('Admin.view.usermanagement.views.panels.ApiUserCategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'apiCategories',
    title: 'Api User Category',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'apiCategoryGrid'

        }
    ]
});
