/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.dashboard.OnlinePortalServices', {
    extend: 'Ext.container.Container',
    xtype: 'onlineportalservices',
    controller: 'onlineservicesconfVctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'onlineportalservicespnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
