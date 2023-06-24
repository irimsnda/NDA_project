/**
 * Created by Kip on 11/12/2018.
 */
Ext.define('Admin.view.premiseregistration.views.maininterfaces.premisesinspection.PremisesInspectionScheduleApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'premisesinspectionscheduleapproval',
    layout:'fit',
    items: [
        {
            xtype: 'premisesinspectionscheduling'
        }
    ]
});