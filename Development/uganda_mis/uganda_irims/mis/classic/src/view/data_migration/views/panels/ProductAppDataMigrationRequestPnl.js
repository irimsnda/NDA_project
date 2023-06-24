
Ext.define('Admin.view.data_migration.views.panels.ProductAppDataMigrationRequestPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'productappdatamigrationrequestpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'productappdatamigrationrequestgrid',
            region: 'center',
            module_id: 1,
            title: 'Product Applications Data Migration Requests',
            margin: 2
        }
    ]
});