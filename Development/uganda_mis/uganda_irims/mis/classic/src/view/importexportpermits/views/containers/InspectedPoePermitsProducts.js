/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.InspectedPoePermitsProducts', {
    extend: 'Ext.Container',
    xtype: 'inspectedpoepermitsproducts',
    controller: 'importexportpermitsvctr',
    layout: 'border',
    items: [
        {
            xtype: 'inspectedpoepermitsproductsdashwrapper',
            region: 'center'
        }
    ]
});

