/**
 * created by softclans
 * user robinson odhiambo
 */
Ext.define('Admin.view.importexportpermits.views.containers.PermitInspectionBookingDashboard', {
    extend: 'Ext.Container',
    xtype: 'permitinspectionbookingdashboard',
    controller: 'importexportpermitsvctr',
    layout: 'border',
   
    items: [
        {
            xtype: 'hiddenfield',
            name: 'module_id',
            value: 20
        },
        
        {
            xtype: 'permitinspectionbookingdashboardwrapper',
            region: 'center'
        }
    ]
});

