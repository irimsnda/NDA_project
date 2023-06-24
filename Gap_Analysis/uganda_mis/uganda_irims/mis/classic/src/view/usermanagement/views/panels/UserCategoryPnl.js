Ext.define('Admin.view.usermanagement.views.panels.UserCategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'UserCategories',
    title: 'Users Category',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'userCategoryGrid'

        }
    ]
});
