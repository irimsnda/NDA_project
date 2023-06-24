/**
 * Created by Kip on 6/29/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialManagerQueryResponsePnl', {
    extend: 'Ext.panel.Panel',
    title: 'Pending Applications',
    xtype: 'clinicaltrialmanagerqueryresponsepnl',
    layout: 'fit',
    items: [
        {
            xtype: 'clinicaltrialmanagerqueryresponsegrid'
        }
    ]
});