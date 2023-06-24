Ext.define('Admin.view.usermanagement.views.grids.UserDetailsUpdateLogsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'usermanagementvctr',
    xtype: 'userdetailsupdatelogsgrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'hiddenfield',
        name: 'user_id'
    },{
        xtype: 'displayfield',
        name: 'user_name',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px'
        }
    }, {
        xtype: 'tbseparator',
        width: 20
    }, {
        xtype: 'displayfield',
        value: 'Double click to view updated details!!',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    },'->',{
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'userdetailsupdatelogs',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
            var store = this.getStore(),
                grid = this.up('grid'),
                user_id = grid.down('hiddenfield[name=user_id]').getValue();
                store.getProxy().extraParams = {
                    user_id: user_id,
                };
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 100,
                storeId: 'userdetailupdateslogStr',
                proxy: {
                    url: 'usermanagement/getUserDetailsUpdateLogs',
                }
            },
            isLoad: true
        },
        itemdblclick: 'showPreviewUpdatedUserDetails'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 100
    },{
        xtype: 'gridcolumn',
        dataIndex: 'updated_by',
        text: 'Updated By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'updated_at',
        text: 'Updated On',
        flex: 1
    }]
});
