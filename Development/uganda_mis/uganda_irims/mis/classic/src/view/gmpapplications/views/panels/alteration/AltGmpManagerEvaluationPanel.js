/**
 * Created by Kip on 5/24/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.alteration.AltGmpManagerEvaluationPanel', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagersGenericPanel',
    xtype: 'altgmpmanagerevaluationpanel',
    items: [
        {
            xtype: 'gmpaltmanagerevaluationgrid'
        }
    ]
});