/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.MedicalDevImportExportPermitsApps', {
    extend: 'Ext.Container',
    xtype: 'medicaldevimportexportpermitsapps', 
    controller: 'importexportpermitsvctr',
    layout: 'border',
    items: [{
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