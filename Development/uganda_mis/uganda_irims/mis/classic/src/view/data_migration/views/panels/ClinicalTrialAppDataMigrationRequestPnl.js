
Ext.define('Admin.view.data_migration.views.panels.ClinicalTrialAppDataMigrationRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialappdatamigrationrequestpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'clinicaltrialappdatamigrationrequestgrid',
            region: 'center',
            module_id: 7,
            title: 'Clinical trials Data Migration Requests',
            margin: 2
        }
    ]
});