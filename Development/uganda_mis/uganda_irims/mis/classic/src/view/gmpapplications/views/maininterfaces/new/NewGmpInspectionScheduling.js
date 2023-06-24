/**
 * Created by Kip on 5/11/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpInspectionScheduling', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInspectionScheduling',
    xtype: 'newgmpinspectionscheduling',
    items: [
        {
            xtype: 'newgmpinspectionschedulingpanel'
        }
    ]
});