
Ext.define('Admin.view.data_migration.views.panels.ProductsMigratedDatasetsRpt', {
    extend: 'Ext.panel.Panel',
    xtype: 'productsmigrateddatasetsrpt',
    layout: 'fit',
    region: 'center',
    controller: 'applicationdatmigrationvctr',
    module_id: 1,
    title: 'Product Applications Data Migrations',
    margin: 2,
    table_name: 'tra_productapps_datamigration',
    listeners:{
        beforerender: 'renderDataMigrationsReportsPanelConfig'
    }
});