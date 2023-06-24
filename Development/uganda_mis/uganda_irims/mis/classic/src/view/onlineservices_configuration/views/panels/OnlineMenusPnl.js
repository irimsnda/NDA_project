/**
 * Created by Kip on 9/18/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.panels.Onlinemenuspnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'onlinemenuspnl',
    title: 'Online Portal Menus',
    userCls: 'big-100 small-100',
    controller: 'onlineservicesconfVctr',
    viewModel: 'administrationvm',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'onlinemenusgrid'
        }
    ]
});
