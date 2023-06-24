/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.MedicalDevImportExportPermits', {
    extend: 'Ext.Container',
    xtype: 'medicaldevimportexportpermits',
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
            xtype: 'medicaldevimportexportpermitsappsWrapper',
            region: 'center'
        },
        {
            xtype: 'medicaldevimportexportpermitstb',
            region: 'south'
        }
    ]
});

