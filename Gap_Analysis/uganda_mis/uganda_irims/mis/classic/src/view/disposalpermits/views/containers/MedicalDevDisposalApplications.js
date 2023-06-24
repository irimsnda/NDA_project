/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.disposalpermits.views.containers.MedicalDevDisposalApplications', {
    extend: 'Ext.Container',
    xtype: 'medicaldevdisposalapplications',
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
            value: 4
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

