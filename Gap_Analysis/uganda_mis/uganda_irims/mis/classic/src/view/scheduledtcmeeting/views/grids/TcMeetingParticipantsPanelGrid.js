/**
 * Created by Kip on 1/25/2019.
 */
Ext.define('Admin.view.scheduledtcmeeting.views.grids.TcMeetingParticipantsPanelGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'tcmeetingparticipantspanelgrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'tcmeetingparticipantsstr',
                proxy: {
                    url: 'clinicaltrial/getTcMeetingParticipants'
                }
            },
            isLoad: false
        },
        
    },
    dockedItems: [
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items: [{
                xtype: 'pagingtoolbar',
                displayInfo: true,
                emptyMsg: 'No Records',
                table_name: 'tra_product_applications',
                beforeLoad: function () {
                    var store = this.getStore(),
                        grid = this.up('grid'),
                        window = grid.up('window'),
                        meeting_id = window.down('hiddenfield[name=meeting_id]').getValue();
                        store.getProxy().extraParams = {
                            meeting_id: meeting_id
                        }
                }
            }
            ]
        }
    ],
    columns: [
        {
            text: 'Participant Name',
            dataIndex: 'participant_name',
            flex: 1
        }
    ]
});