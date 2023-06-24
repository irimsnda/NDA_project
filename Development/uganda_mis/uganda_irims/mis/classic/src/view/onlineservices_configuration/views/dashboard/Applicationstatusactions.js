/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.onlineservices_configuration.views.dashboard.Applicationstatusactions', {
    extend: 'Ext.container.Container',
    xtype: 'applicationstatusactions',
    controller: 'onlineservicesconfVctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'applicationstatusactionspnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
