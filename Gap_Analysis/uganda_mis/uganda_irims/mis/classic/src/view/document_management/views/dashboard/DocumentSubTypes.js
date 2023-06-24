/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.document_management.views.dashboard.DocumentSubTypes', {
    extend: 'Ext.container.Container',
    xtype: 'documentsubtypes',
    controller: 'documentsManagementvctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'documentsubtypespnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
