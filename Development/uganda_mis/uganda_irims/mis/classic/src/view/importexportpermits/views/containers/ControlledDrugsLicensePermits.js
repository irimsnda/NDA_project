/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.ControlledDrugsLicensePermits', {
    extend: 'Ext.Container',
    xtype: 'controlleddrugslicensepermits',
    controller: 'importexportpermitsvctr',
    layout: 'border',
   
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 12
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 14
        },
        {
            xtype: 'controlleddrugslicensepermitsdashwrapper',
            region: 'center'
        },
        {
            xtype: 'controlleddrugslicensepermitstb',
            region: 'south'
        }
    ]
});

