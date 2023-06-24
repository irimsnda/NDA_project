/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.importexportpermits.views.dashboard.PermitInspectionBookingDashboardWrapper', {
    extend: 'Ext.Container',
    xtype: 'permitinspectionbookingdashboardwrapper',
	itemId:'permitsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'permitinspectionbookinggrid'
        }
    ]
});