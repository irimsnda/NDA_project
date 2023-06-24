Ext.define('Admin.view.configurations.views.grids.DocDistributionDirectiveUsersGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'docdistributiondirectiveusersGrid',
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
        name: 'docdirective_id'
    },'->',
    {
        xtype:'button',
        text: 'Add Users',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-user',
        childXtype: 'addDocdirectiveusersGrid',
        winTitle: 'Add Users',
        winWidth: '70%',
        stores: [],
        handler: 'showAddDirectiveUsersWinFrm'
    },
    {
        xtype: 'button',
        text: 'Remove Selected',
        action: 'remove_selected',
        ui: 'soft-purple',
        disabled: true,
        iconCls: 'x-fa fa-remove',
        handler: 'removeSelectedUsersFromDirective'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    selModel:{
        selType: 'checkboxmodel'
    },
    export_title: 'docdistributiondirective',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '90%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
                var grid=this.up('grid'),
                       docdirective_id = grid.down('hiddenfield[name=docdirective_id]').getValue();
                
                var store=this.getStore();
                 store.getProxy().extraParams = {
                        docdirective_id:docdirective_id
                }
            }
    },
    '->', {
        xtype: 'exportbtn'
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
                storeId: 'docdistributiondirectivestr',
                proxy: {
                    url: 'controldocumentsmng/getDocDirectiveUsers',
                }
            },
            isLoad: false
        },
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[action=remove_selected]').setDisabled(false);
            }
        },
        deselect: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[action=remove_selected]').setDisabled(true);
            }
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Full Name',
        tdCls:'wrap-text',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email',
        flex: 1
    }]
});

