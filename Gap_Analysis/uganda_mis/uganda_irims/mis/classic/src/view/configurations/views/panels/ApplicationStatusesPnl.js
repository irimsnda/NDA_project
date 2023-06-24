/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.configurations.views.panels.ApplicationStatusesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationstatusespnl',
    title: 'Application Statuses',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'applicationstatusesgrid'
        }
    ]
});
