/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.configurations.views.document_management.Documentsdefinationrequirement', {
    extend: 'Ext.container.Container',
    xtype: 'documentsdefinationrequirement',
    controller: 'documentsManagementvctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'documentsdefinationrequirementpnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});//