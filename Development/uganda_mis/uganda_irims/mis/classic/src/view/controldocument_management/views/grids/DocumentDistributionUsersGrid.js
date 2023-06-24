Ext.define('Admin.view.controldocument_management.views.grids.DocumentDistributionUsersGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'controldocumentmanagementvctr',
    xtype: 'documentdistributionusersGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    height: Ext.Element.getViewportHeight() - 118,
    width: '50%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'application_id'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    selModel:{
        selType: 'checkboxmodel'
    },
    export_title: 'documentdistributionusersGrid',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '90%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
                var grid=this.up('grid'),
                       application_id = grid.down('hiddenfield[name=application_id]').getValue();
                
                var store=this.getStore();
                 store.getProxy().extraParams = {
                        application_id:application_id,
                        table_name: 'par_groups'
                }
            }
    },
    '->', {
        xtype: 'button',
        name: 'sync',
        text: 'Sync',
        ui: 'soft-green',
        handler: 'saveDocumentDistributionUserList'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'documentdistributionstr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams: {
                        table_name: 'par_groups'
                    }
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[name=sync]').setDisabled(false);
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Group',
        tdCls:'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        tdCls:'wrap-text',
        flex: 1
    }]
});