/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpInspection', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpInspection',
    xtype: 'newgmpinspection',
    items: [
        {
            xtype: 'newgmpinspectionpanel'
        }
    ]
});