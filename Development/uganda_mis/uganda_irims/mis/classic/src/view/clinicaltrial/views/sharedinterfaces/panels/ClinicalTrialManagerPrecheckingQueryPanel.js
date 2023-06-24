/**
 * Created by Kip on 7/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialManagerPrecheckingQueryPanel', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'clinicaltrialmanagerprecheckingquerypanel',
    layout: 'fit',
    items: [
        {
            xtype: 'clinicaltrialmanagerprecheckingquerygrid'
        }
    ]
});