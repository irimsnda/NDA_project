/**
 * Created by Kip on 6/21/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialManagerReviewPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'clinicaltrialmanagerreviewpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'clinicaltrialmanagerreviewgrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'clinicaltrialappmoredetailswizard',
        }
    ]
});