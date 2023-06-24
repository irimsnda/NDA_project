/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.document_management.views.dashboard.Documenttypes', {
    extend: 'Ext.container.Container',
    xtype: 'documenttypes',
    controller: 'documentsManagementvctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'documenttypespnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
