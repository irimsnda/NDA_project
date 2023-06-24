/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.MedicalDevicesPremisesInspectionDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'medicaldevicespremisesinspectiondashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'medicaldevicespremisesinspectiondash'
        }
    ]
});