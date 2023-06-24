/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.InspectedApprovedPremisesInspectionDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'inspectedapprovedpremisesinspectiondashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'inspectedapprovedpremisesinspectiondash'
        }
    ]
});