/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpManagerInspection', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpManagerInspection',
    xtype: 'renewgmpmanagerinspection',
    items: [
        {
            xtype: 'renewgmpmanagerinspectionpanel'
        }
    ]
});