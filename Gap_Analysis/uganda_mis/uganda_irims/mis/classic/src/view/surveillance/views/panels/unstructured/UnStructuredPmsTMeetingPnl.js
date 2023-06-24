/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.unstructured.UnStructuredPmsTMeetingPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'unstructuredpmstmeetingpnl',
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