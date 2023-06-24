/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.AnimalFeedsImportExportPermitsApps', {
    extend: 'Ext.Container',
    xtype: 'animalfeedsimportexportpermitsapps',
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
            value: 9
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

