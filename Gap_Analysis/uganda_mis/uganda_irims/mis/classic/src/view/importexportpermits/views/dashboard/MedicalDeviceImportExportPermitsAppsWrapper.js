Ext.define('Admin.view.productregistration.views.dashboards.MedicalDeviceImportExportPermitsAppsWrapper', {
    extend: 'Ext.Container',
    xtype: 'medicaldeviceimportexportpermitsappsWrapper',
	itemId:'importexportpermitsappswrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'medicaldevimportexportpermitsapps'
        }
    ]
});