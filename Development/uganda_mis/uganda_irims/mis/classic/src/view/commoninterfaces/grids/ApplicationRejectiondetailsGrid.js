/**
 * Created by sotclans.
 */
Ext.define('Admin.view.commoninterfaces.grids.ApplicationRejectiondetailsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationrejectiondetailsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true, controller: 'commoninterfacesVctr',
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    selType: 'cellmodel',
    plugins: [{
        ptype: 'gridexporter'
    },{
        ptype: 'filterfield'
    }],
    export_title: 'Reason for Rejection',
    listeners: {
        beforerender: {
            fn: 'setPremiseRegGridsStore',
            config: {
                pageSize: 100,
                storeId: 'applicationrejectiondetailsstr',
                proxy: {
                    url: 'api/getApplicationRejectiondetails'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'reason_of_rejection',
        text: 'Reason for Rejection',
        tdCls: 'wrap-text', 
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_section',
        text: 'REference Section',
        tdCls: 'wrap-text', 
        flex: 1
    },  {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    panelXtype: 'applicationrejectiondetailsfrm',
                    handler: 'onEditRasonforREjections',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    table_name: 'tra_applicationrejections_reasons',
                    handler: 'onDeleteRasonforREjections',
                    stores: '[]'
                }
                ]
            }
        }
    }],
    tbar:[{
           text:'Add New Reason',
            ui: 'soft-green',
            iconCls: 'x-fa fa-plus',
            margin:5,
            storeID: 'applicationrejectiondetailsstr',
            handler: 'onAddRasonforREjections',//showAddReInspectionchecklistitemsfrm
    },{
        xtype: 'hiddenfield',
        name: 'application_code'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '60%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {

            var grid = this.up('grid'),
                store= grid.getStore(),
                application_code = grid.down('hiddenfield[name=application_code]').getValue();
                store.removeAll();
                
                store.getProxy().extraParams = {
                     application_code: application_code
                };

        }
    }]
});
