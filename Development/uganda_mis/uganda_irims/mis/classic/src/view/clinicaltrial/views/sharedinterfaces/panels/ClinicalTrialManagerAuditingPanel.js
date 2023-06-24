/**
 * Created by Kip on 2/1/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialManagerAuditingPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'clinicaltrialmanagerauditingpanel',
    layout: 'fit',
    items: [
        {
            xtype: 'clinicaltrialmanagerauditinggrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'clinicaltrialappmoredetailswizard',
        }
    ]
});