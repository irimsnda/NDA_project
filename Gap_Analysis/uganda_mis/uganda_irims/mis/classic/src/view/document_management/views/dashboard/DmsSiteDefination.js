/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.document_management.views.dashboard.DmsSiteDefination', {
    extend: 'Ext.container.Container',
    xtype: 'dmsSiteDefination',
    controller: 'documentsManagementvctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'dmssitedefinationpnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
