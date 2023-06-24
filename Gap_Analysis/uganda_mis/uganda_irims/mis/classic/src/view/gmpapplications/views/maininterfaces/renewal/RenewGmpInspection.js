/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.renewal.RenewGmpInspection', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInspection',
    xtype: 'renewgmpinspection',
    items: [
        {
            xtype: 'renewgmpinspectionpanel'
        }
    ]
});