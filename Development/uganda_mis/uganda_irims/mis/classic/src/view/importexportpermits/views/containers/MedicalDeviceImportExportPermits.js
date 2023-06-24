Ext.define('Admin.view.importexportpermits.views.containers.MedicalDeviceImportExportPermits', {
    extend: 'Ext.Container',
    xtype: 'medicaldeviceimportExportPermits',
    itemId: 'medicaldeviceimportExportPermitsId',
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
            value: 4
        },
        {
            xtype: 'medicaldeviceimportexportpermitsappsWrapper',
            region: 'center'
        },
        {
            xtype: 'medicaldevimportexportpermitstb',
            region: 'south'
        }
    ]
});
