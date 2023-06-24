Ext.define('Admin.view.importexportpermits.views.dashboard.MedicalDeviceImportExportDash', {
    extend: 'Ext.Container',
    xtype: 'medicaldeviceimportexportdashWrapper',
	itemId:'medicaldeviceimportexportdashId',
    layout: 'border',
    items: [
          {
            xtype: 'medicaldevimportexportpermitsdashgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2
        }, {
            xtype: 'dashboardguidelinesgrid',
            region: 'south',
            collapsible: true,
            collapsed: true,
            titleCollapse: true
        }
    ]
});