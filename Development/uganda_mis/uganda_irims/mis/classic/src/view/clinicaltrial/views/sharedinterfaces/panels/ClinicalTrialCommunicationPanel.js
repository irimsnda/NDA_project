/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.sharedinterfaces.panels.ClinicalTrialCommunicationPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'clinicaltrialcommunicationpanel',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Meeting Details',
            region: 'north',
            height: 110,
            xtype: 'meetingdetailsfrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'clinicaltrialcommunicationsgrid'
        },
        {
            title: 'Participants',
            xtype: 'tcmeetingparticipantsgrid',
            region: 'west',
            width: 400,
            collapsible: true,
            titleCollapse: true,
            collapsed: true
        }
    ]
});