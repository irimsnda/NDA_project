Ext.define('Admin.view.configurations.views.grids.AddDocDirectiveUsersGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'addDocdirectiveusersGrid',
    cls: 'dashboard-todo-list',
    header: false,
    controller: 'configurationsvctr',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'docdirective_id'
    }],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function() {
            var grid = this.up('grid'),
                store= grid.getStore(),
                docdirective_id = grid.down('hiddenfield[name=docdirective_id]').getValue();

                store.removeAll();
                store.getProxy().extraParams = {
                    docdirective_id: docdirective_id
                };
            }
    },'->',{
        xtype: 'button',
        text: 'Sync',
        action: 'sync',
        disabled: true,
        ui: 'soft-purple',
        handler: 'sysncUserDirective'
    }
    ],

    selModel:{
        selType: 'checkboxmodel'
    },
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
                proxy: {
                    url: 'controldocumentsmng/getDocDirectiveBasedUsersList',
                }
            },
            isLoad: true
        },
        select: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount > 0) {
                grid.down('button[action=sync]').setDisabled(false);
            }
        },
        afterrender: function () {
            var grid = this,
                docdirective_id = grid.down('hiddenfield[name=docdirective_id]').getValue(),
                sm = grid.getSelectionModel();
                
            grid.store.on('load', function (store, records, options) {
                Ext.each(records, function (record) {
                    var rowIndex = store.indexOf(record);
                    if (record.data.docdirective_id == docdirective_id || record.data.docdirective_id === docdirective_id) {
                        sm.select(rowIndex, true);
                    }
                });
            })
        },
        deselect: function (sel, record, index, eOpts) {
            var me = this,
                grid = sel.view.grid,
                selCount = grid.getSelectionModel().getCount();
            if (selCount < 1) {
                grid.down('button[action=sync]').setDisabled(true);
            }
        }
    },
    columns: [
    {
        xtype: 'gridcolumn',
        dataIndex: 'id',
        hidden: true,
        text: 'user_ID',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'fullnames',
        text: 'Full Names',
        flex: 1,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'username',
        text: 'Username',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email Address',
        flex: 1,
        renderer: function (value) {
            return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
        }
    }]
});
