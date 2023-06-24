/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.alteration.NewGmpManagerEvaluationPanel', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagersGenericPanel',
    xtype: 'newgmpmanagerevaluationpanel',
    items: [
        {
            xtype: 'gmpaltmanagerevaluationgrid'
        }
    ]
});