/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.ImportExportPersonalUserPermits', {
    extend: 'Ext.Container',
    xtype: 'importexportpersonaluserpermits',
    controller: 'importexportpermitsvctr',
    layout: 'border',
   
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 4
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 2
        },
        {
            xtype: 'importexportpersonaluserpermitsdashwrapper',
            region: 'center'
        },
        {
            xtype: 'importexportpersonaluserpermitstb',
            region: 'south'
        }
    ]
});

