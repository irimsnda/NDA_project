Ext.define('Admin.view.configurations.views.panels.LoginAttemptStatusPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'loginattemptstatusPnl',
    title: 'Login Attemp Status',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'loginattemptstatusGrid'
        }
    ],

});
