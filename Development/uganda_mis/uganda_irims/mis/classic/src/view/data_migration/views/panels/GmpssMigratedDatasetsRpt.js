
Ext.define('Admin.view.data_migration.views.panels.GmpssMigratedDatasetsRpt', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmpssmigrateddatasetsrpt',
    layout: 'fit',
    region: 'center',
    controller: 'applicationdatmigrationvctr',
    module_id: 3,
    title: 'Gmp Inspections Data Migrations',
    margin: 2,
    table_name: 'tra_gmpapps_datamigration',
    listeners:{
        beforerender: 'renderDataMigrationsReportsPanelConfig'
    }
});