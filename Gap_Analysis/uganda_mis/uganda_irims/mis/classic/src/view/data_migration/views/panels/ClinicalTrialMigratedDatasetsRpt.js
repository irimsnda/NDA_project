
Ext.define('Admin.view.data_migration.views.panels.ClinicalTrialMigratedDatasetsRpt', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialmigrateddatasetsrpt',
    layout: 'fit',
    region: 'center',
    module_id: 7,
    controller: 'applicationdatmigrationvctr',
    title: 'Clinical Trial Data Migrations',
    margin: 2,
    table_name: 'tra_clinicaltrialapps_datamigration',
    listeners:{
        beforerender: 'renderDataMigrationsReportsPanelConfig'
    }
});