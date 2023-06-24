Ext.define('Admin.view.configurations.views.panels.OnlineStatuesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlinestatuses',
    title: 'Online Statuses',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'onlinestatusesgrid'
        }
    ],

});
