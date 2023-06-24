/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.panels.OnlineProcessTransitionPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlineprocesstransitionpnl',
    title: 'Online Processes Transition',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'onlineprocesstransitiongrid'
        }
    ]
});
