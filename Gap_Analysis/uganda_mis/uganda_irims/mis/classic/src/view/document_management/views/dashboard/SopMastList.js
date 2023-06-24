/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.document_management.views.dashboard.SopMastList', {
    extend: 'Ext.container.Container',
    xtype: 'sopMastList',
    controller: 'documentsManagementvctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'sopMastListpnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
