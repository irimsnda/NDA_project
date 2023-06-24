/**
 * Created by Kip on 9/18/2018.
 */
Ext.define('Admin.view.administration.views.panels.SystemUserGroupsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'systemusergroupspnl',
    title: 'System User Groups',
    userCls: 'big-100 small-100',
    itemId: 'SystemUserGroupsDashboard',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'systemusergroupsgrid'
        }
    ]
});
