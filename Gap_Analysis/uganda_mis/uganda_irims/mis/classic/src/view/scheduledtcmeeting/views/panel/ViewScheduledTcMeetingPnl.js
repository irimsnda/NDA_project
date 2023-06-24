/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.scheduledtcmeeting.views.panels.ViewScheduledTcMeetingPnl', {
    extend: 'Ext.panel.Panel',
    title: 'Scheduled Meeting',
    
    controller: 'scheduledtcmeetingsvctr',
    xtype: 'viewscheduledtcMeetingpnl',
    layout: 'border',
    defaults: {
        split: true,
    },
    items: [
        {
            title: 'Meeting Details',
            region: 'north',
            height: 170,
            collapsible: true,
            xtype: 'productMeetingDetailsFrm'
        },
        {
            title: 'Applications',
            region: 'center',
            xtype: 'fit',
            xtype:'panel',
            name:'viewscheduledtcmeetingapplications'
        },{
            xtype: 'panel',
            layout:'accordion', region: 'west',
            width: 400,collapsed: false,
            titleCollapse: true,
            title:'Meeting Participants & Agendas',
            layout: {
                type: 'accordion',
                titleCollapse: false,
                animate: true,
                activeOnTop: true
            },
            items:[{
                title: 'Participants',
                xtype: 'tcmeetingparticipantspanelgrid',
                listeners: {
                    afterrender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                },
                tbar: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isReadOnly'
                    }
                ],
            },{
                xtype: 'tcmeetingagendaspanelgrid',
                title:'Agendas',
                 listeners: {
                    afterrender: function () {
                        var store = this.getStore();
                        store.removeAll();
                        store.load();
                    }
                },
                tbar: [
                    {
                        xtype: 'hiddenfield',
                        name: 'isReadOnly'
                    }
                ],
            }]
        },{
            xtype:'hiddenfield',
            name:'meeting_id'
        }
    ]
});