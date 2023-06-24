/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.InspectedPoePermits', {
    extend: 'Ext.Container',
    xtype: 'inspectedpoepermits',
    controller: 'importexportpermitsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'inspectedpoepermitsdashwrapper',
            region: 'center'
        }
    ]
});

