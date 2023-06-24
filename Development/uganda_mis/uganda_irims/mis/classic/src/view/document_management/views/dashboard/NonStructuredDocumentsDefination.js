/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.document_management.views.dashboard.NonStructuredDocumentsDefination', {
    extend: 'Ext.container.Container',
    xtype: 'nonStructuredDocumentsDefination',
    controller: 'documentsManagementvctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'nonStructuredDocumentsDefinationpnl'
     }]
});
