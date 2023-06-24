
Ext.define('Admin.view.data_migration.views.panels.GmpAppDataMigrationRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpappdatamigrationrequestpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'gmpappdatamigrationrequestgrid',
            region: 'center',
            module_id: 3,
            title: 'GMP Applications Data Migration Requests',
            margin: 2
        }
    ]
});