
Ext.define('Admin.view.data_migration.views.panels.PremisesAppDataMigrationRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisesappdatamigrationrequestpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'premisesappdatamigrationrequestgrid',
            region: 'center',
            module_id: 2,
            title: 'Premises Applications Data Migration Requests',
            margin: 2
        }
    ]
});