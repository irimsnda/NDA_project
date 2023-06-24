/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.document_management.views.dashboard.DirectorateSectionsDocDefination', {
    extend: 'Ext.container.Container',
    xtype: 'directorateSectionsDocDefination',
    controller: 'documentsManagementvctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'directorateSectionsDocDefinationpnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
