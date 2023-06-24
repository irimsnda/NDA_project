/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialRecommReviewPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialrecommreviewpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Meeting Details',
            region: 'north',
            height: 170,
            xtype: 'meetingdetailsfrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'clinicaltrialrecommreviewgrid',
            itemId:'main_processpanel',
            applicationdetails_panel: 'clinicaltrialappmoredetailswizard',
        },
        {
            title: 'Participants',
            xtype: 'tcmeetingparticipantsgrid',
            region: 'west',
            width: 400,
            collapsed: true,
            collapsible: true,
            titleCollapse: true
        }
    ]
});