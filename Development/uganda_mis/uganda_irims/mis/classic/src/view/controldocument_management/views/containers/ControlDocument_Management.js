/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.controldocument_management.views.containers.ControlDocument_Management', {
    extend: 'Ext.Container',
    xtype: 'controldocument_management',
    controller: 'controldocumentmanagementvctr',
    layout: 'border',
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 18
        },
        {
            xtype: 'hiddenfield',
            name: 'section_id',
            value: 6
        },
        {
            xtype: 'controldocument_managementdashwrapper',
            region: 'center'
        },
        {
            xtype: 'controldocument_managementtb',
          
            region: 'south'
        }
    ]
});

