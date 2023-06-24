/**
 * Created by Kip on 8/15/2019.
 */
Ext.define('Admin.view.configurations.views.panels.PortalAppsInitialStatusesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'portalappsinitialstatusespnl',
    title: 'Portal Applications Initial Statuses on MIS',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'portalappsinitialstatusesgrid'
        }
    ]
});
