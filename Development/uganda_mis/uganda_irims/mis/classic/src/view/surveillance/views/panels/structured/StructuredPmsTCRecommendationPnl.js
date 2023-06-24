/**
 * Created by Kip on 5/30/2019.
 */
/*Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsTCRecommendationPnl', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.panels.PmsTCRecommendationPanel',
    xtype: 'structuredpmstcrecommendationpnl'
});*/

Ext.define('Admin.view.surveillance.views.panels.structured.StructuredPmsTCRecommendationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'structuredpmstcrecommendationpnl',
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
            xtype: 'tcrecommendationsampledetailsgrid'
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