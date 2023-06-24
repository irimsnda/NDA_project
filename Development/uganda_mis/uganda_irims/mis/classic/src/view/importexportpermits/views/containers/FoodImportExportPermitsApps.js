/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.FoodImportExportPermitsApps', {
    extend: 'Ext.Container',
    xtype: 'foodimportexportpermitsapps',
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
            value: 1
        },
        {
            xtype: 'foodimportexportpermitsdashwrapper',
            region: 'center'
        },
        {
            xtype: 'foodimportexportpermitstb',
            region: 'south'
        }
    ]
});

