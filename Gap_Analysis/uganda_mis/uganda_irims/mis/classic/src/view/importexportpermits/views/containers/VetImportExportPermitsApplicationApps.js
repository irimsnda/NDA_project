/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.VetImportExportPermitsApplicationApps', {
    extend: 'Ext.Container',
    xtype: 'vetimportexportpermitsapplicationapps',
    controller: 'importexportpermitsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 4
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 7
        },
        {
            xtype: 'vetimportexportpermitsdashwrapper',
            region: 'center'
        },
        {
            xtype: 'vetimportexportpermitstb',
        
            region: 'south'
        }
    ]
});

