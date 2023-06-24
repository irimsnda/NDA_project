/**
 * Created by Kip on 11/20/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.MedicalDevicesImportExportOnlineAppsDash', {
    extend: 'Ext.Container',
    xtype: 'medicaldevicesimportexportonlineappsdash',
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
            xtype: 'onlineimportexportappsgrid',
            region: 'center',
            title: 'Online Application Submission',
            wizard_pnl: 'importexportonlinereceivingwizard',
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