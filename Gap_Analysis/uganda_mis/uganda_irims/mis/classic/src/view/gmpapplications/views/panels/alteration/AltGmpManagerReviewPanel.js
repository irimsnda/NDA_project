/**
 * Created by Kip on 5/27/2019.
 */
Ext.define('Admin.view.gmpapplications.views.panels.alteration.AltGmpManagerReviewPanel', {
    extend: 'Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpManagersGenericPanel',
    xtype: 'altgmpmanagerreviewpanel',
    items: [
        {
            xtype: 'gmpaltmanagerreviewgrid'
        }
    ]
});