/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.sharedinterfaces.panels.ManagerAssigningafetyAlertReportsPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'managerassigningafetyalertreportspanel',
    layout: 'fit',
    items: [
        {
            xtype: 'managerassigningafetyalertreportsgrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'safetyalertreportsassessmentappmoredetailswizard',
        }
    ]
});