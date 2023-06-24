
Ext.define('Admin.view.registration_cancellation.grids.CancelledApplicationDetailsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registrationcancellationVctr',
    xtype: 'cancelledapplicationdetailsGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
    },
    tbar: [
     {
            xtype: 'displayfield',
            name: 'module_name',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px',
            }
        }, {
            xtype: 'tbseparator'
        }, {
            xtype: 'displayfield',
            name: 'reference_no',
            labelAlign: 'top',
            fieldLabel: 'Reference No',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px',
            }
        },{
            xtype: 'tbseparator'
        }, {
            xtype: 'displayfield',
            name: 'tracking_no',
            labelAlign: 'top',
            fieldLabel: 'Tracking No',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold',
                'font-size': '12px',
            }
        },{
            xtype: 'hiddenfield',
            name: 'can_id'
    },'->',{
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'cancelledApplicationDetails',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                can_id = grid.down('hiddenfield[name=can_id]').getValue(),
                store = grid.getStore();
            store.getProxy().extraParams = {
                'can_id':can_id

            }
        },  
    }],
    listeners: {
        beforerender: {
            fn: 'setReportGlobalStoreWithTBar',
            config: {
                pageSize: 1000,
                storeId: 'cancelledApplicationDetailsStr',
                proxy: {
                    url: 'workflow/getCancelledRegistrationApplicationDetails'
                }
            },
            isLoad: false
        },
        afterRender: 'doCreateCancellationDetailsGrid'
    },
    columns: []
});
