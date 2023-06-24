
Ext.define('Admin.view.data_migration.views.panels.PremisesMigratedDatasetsRpt', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisesmigrateddatasetsrpt',
    layout: 'fit',
    region: 'center',
    module_id: 2,
    controller: 'applicationdatmigrationvctr',
    title: 'Premises Applications Data Migrations',
    margin: 2,
    table_name: 'tra_premisesapps_datamigration',
    listeners:{
        beforerender: 'renderDataMigrationsReportsPanelConfig'
    }
});