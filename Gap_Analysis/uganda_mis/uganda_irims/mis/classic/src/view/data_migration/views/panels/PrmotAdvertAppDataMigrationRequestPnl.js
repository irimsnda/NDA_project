
Ext.define('Admin.view.data_migration.views.panels.PrmotAdvertAppDataMigrationRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'prmotadvertappdatamigrationrequestpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'prmotadvertappdatamigrationrequestgrid',
            region: 'center',
            module_id: 14,
            title: 'Promotional & Advertisements Data Migration Requests',
            margin: 2
        }
    ]
});