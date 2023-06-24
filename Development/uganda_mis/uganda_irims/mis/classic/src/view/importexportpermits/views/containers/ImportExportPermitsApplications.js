/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.ImportExportPermitsApplications', {
    extend: 'Ext.Container',
    xtype: 'importexportpermitsapplications',
    itemId: 'importexportpermitsapplications',
    controller: 'importexportpermitsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 4
        },
        
        {
            xtype: 'importexportpermitsappswrapper',
            region: 'center'
        },
        {
            xtype: 'importexportpermitstb',
            region: 'south'
        }
    ]
});

