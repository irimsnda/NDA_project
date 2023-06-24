/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.panels.OnlineApplicationStatusPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineapplicationstatuspnl',
    title: 'Application Statuses Actions',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'onlineapplicationstatusgrid'
        }
    ]
});
