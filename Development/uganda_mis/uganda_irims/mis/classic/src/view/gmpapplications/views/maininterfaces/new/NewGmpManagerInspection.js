/**
 * Created by Kip on 12/30/2018.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGmpManagerInspection', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.main.GmpManagerInspection',
    xtype: 'newgmpmanagerinspection',
    items: [
        {
            xtype: 'newgmpmanagerinspectionpanel'
        }
    ]
});