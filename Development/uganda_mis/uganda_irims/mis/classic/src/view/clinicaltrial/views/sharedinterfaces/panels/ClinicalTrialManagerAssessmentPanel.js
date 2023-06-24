/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialManagerAssessmentPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'clinicaltrialmanagerassessmentpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'clinicaltrialmanagerassessmentgrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'clinicaltrialappmoredetailswizard',
        }
    ]
});