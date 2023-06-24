/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.DrugImportExportPermits', {
    extend: 'Ext.Container',
    xtype: 'drugimportExportPermits',
    itemId: 'drugimportExportPermits',
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
            value: 2
        },
        {
            xtype: 'drugsimportexportpermitsappsWrapper',
            region: 'center'
        },
        {
            xtype: 'drugsimportexportpermitstb',
            region: 'south'
        }
    ]
});

