/**
 * Created by Kip on 9/18/2018.
 */
Ext.define('Admin.view.usermanagement.views.panels.ActiveUsersPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'activeuserspnl',
    title: 'Active Users',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    itemId: 'ActiveUsersDashboard',
    items: [
        {
            xtype: 'activeusersgrid'
        }
    ]
});
