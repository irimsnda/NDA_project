/**
 * Created by Kip on 9/28/2018.
 */
Ext.define('Admin.view.document_management.views.dashboard.DirectoratesUnits', {
    extend: 'Ext.container.Container',
    xtype: 'directoratesunits',
    controller: 'documentsManagementvctr',
    padding: '2 0 0 0',
    layout: {
        type: 'fit'
    },
    items: [{
            xtype: 'directoratesunitspnl',
            flex: 0.8,
            resizable: true,
            split: true
     }]
});
