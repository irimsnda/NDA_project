/**
 * Created by Kip on 9/18/2018.
 */
Ext.define('Admin.view.usermanagement.views.panels.UserTitlesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'usertitlespnl',
    title: 'User Titles',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'usertitlesgrid'
        }
    ]
});
