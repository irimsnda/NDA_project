/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.MedicinesPremisesInspectionDashwrapper', {
    extend: 'Ext.Container',
    xtype: 'medicinespremisesinspectiondashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'medicinespremisesinspectiondash'
        }
    ]
});