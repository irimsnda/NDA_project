/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.CosmeticsImportExportPermitsApps', {
    extend: 'Ext.Container',
    xtype: 'cosmeticsimportexportpermitsapps',
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
            value: 3
        },
        {
            xtype: 'cosmeticsimportexportpermitsdashwrapper',
            region: 'center'
        },
        {
            xtype: 'cosmeticsimportexportpermitstb',
        
            region: 'south'
        }
    ]
});

