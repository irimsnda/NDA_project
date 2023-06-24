/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.containers.InspectedApprovedPremisesInspection', {
    extend: 'Ext.Container',
    xtype: 'inspectedapprovedpremisesinspection',
    controller: 'premiseregistrationvctr',
    layout: 'border',
    items: [
        {
            xtype: 'inspectedapprovedpremisesinspectiondashwrapper',
            region: 'center'
        }
    ]
});