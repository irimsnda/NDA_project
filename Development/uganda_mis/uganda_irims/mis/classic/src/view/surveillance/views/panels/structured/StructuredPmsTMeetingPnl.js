/**
 * Created by Kip on 3/20/2019.
 */
/*Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsTMeetingPnl', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.panels.PmsTechnicalMeetingPanel',
    xtype: 'structuredpmstmeetingpnl'
});*/

Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsTMeetingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'structuredpmstmeetingpnl',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Meeting Details',
            region: 'north',
            height: 170,
            layout: 'column',
            items: [
                {
                    xtype: 'meetingdetailsfrm',
                    columnWidth: 0.9
                },
                {
                    xtype: 'button',
                    text: 'Save Details',
                    margin: '35 0 0 0',
                    iconCls: 'x-fa fa-save',
                    ui: 'soft-purple',
                    name: 'save_btn',
                    toaster: 1,
                    columnWidth: 0.1
                }
            ]
        },
        {
            title: 'Sample Details',
            region: 'center',
            xtype: 'tmeetingsampledetailsgrid'
        },
        {
            title: 'Participants',
            xtype: 'tcmeetingparticipantsgrid',
            region: 'west',
            width: 400,
            collapsible: true,
            titleCollapse: true
        }
    ]
});