
Ext.define('Admin.view.data_migration.views.panels.PrmotionMigratedDatasetsRpt', {
    extend: 'Ext.panel.Panel',
    xtype: 'prmotionmigrateddatasetsrpt',
    layout: 'fit',
    region: 'center',
    module_id: 14,
    controller: 'applicationdatmigrationvctr',
    title: 'Promotional & Advertisement Data Migrations',
    margin: 2,
    table_name: 'tra_prmotionaladvertapps_datamigration',
    listeners:{
        beforerender: 'renderDataMigrationsReportsPanelConfig'
    }
});