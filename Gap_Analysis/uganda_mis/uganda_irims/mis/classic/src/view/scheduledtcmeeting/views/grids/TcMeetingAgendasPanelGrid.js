/**
 * Created by Kip on 1/25/2019.
 */
Ext.define('Admin.view.productregistration.views.grids.common_grids.TcMeetingAgendasPanelGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'tcmeetingagendaspanelgrid',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'tcmeetingagendassstr',
                proxy: {
                    url: 'clinicaltrial/getTcMeetingAgendas'
                }
            },
            isLoad: true
        }
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
            text: 'Agenda',
            dataIndex: 'agenda',
            flex: 1
        }
        
    ]
});