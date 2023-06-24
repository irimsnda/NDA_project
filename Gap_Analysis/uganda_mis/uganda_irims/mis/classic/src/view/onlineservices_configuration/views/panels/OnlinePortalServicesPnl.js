/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.panels.OnlinePortalServicesPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineportalservicespnl',
    title: 'Online Portal Services',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'onlineportalservicesgrid'
        }
    ]
});
