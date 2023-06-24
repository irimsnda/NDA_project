/**
 * Created by Kip on 5/20/2019.
 */
Ext.define('Admin.view.gmpapplications.views.sharedinterfaces.panels.GmpTCMeetingSchedulingPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'gmptcmeetingschedulingpanel',
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
            xtype: 'gmpmeetingschedulinggrid'
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
                xtype: 'tcmeetingparticipantsgrid',
                region: 'west',
                width: 400,
                collapsible: true,
                titleCollapse: true
            },{
                xtype: 'tcmeetingagendasgrid',
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
                    },
                    {
                        xtype: 'button',
                        text: 'Add',
                        name: 'add_agendas',
                        iconCls: 'x-fa fa-plus',
                        ui: 'soft-green',
                        handler: 'showAddTcMeetingParticipants',
                        childXtype: 'tcmeetingagendasfrm',
                        storeId: 'tcmeetingagendasfrm',
                        winTitle: 'Meeting Agendas',
                        winWidth: '50%',
                        stores: '[]'
                    }
                ],
            }]

        }
        
    ]
});