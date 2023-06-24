/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpInspectionScheduling', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInspectionScheduling',
    xtype: 'renewgmpinspectionscheduling',
    items: [
        {
            xtype: 'renewgmpinspectionschedulingpanel'
        }
    ]
});