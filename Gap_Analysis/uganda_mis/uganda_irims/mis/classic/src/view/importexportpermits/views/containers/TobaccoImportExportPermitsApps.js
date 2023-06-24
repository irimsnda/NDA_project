/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.TobaccoImportExportPermitsApps', {
    extend: 'Ext.Container',
    xtype: 'tobaccoimportexportpermitsapps',
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
            value: 8
        },
        {
            xtype: 'foodimportexportpermitsdashwrapper',
            region: 'center'
        },
        {
            xtype: 'foodimportexportpermitstb',
        
            region: 'south'
        }
    ]
});

