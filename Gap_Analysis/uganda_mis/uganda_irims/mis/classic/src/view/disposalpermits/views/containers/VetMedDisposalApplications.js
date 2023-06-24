/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.disposalpermits.views.containers.VetMedDisposalApplications', {
    extend: 'Ext.Container',
    xtype: 'vetmeddisposalapplications',
    controller: 'disposalpermitsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 15
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 7
        },
        {
            xtype: 'disposalapplicationsdashwrapper',
            region: 'center'
        },
        {
            xtype: 'disposalpermitstb',
            region: 'south'
        }
    ]
});

