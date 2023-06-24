Ext.define('Admin.view.usermanagement.views.panels.ExternalUserCategoryPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'externalUsersCategories',
    title: 'External User Category',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'externalCategoryGrid'

        }
    ]
});
