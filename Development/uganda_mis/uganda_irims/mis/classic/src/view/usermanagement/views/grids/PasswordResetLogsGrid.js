Ext.define('Admin.view.usermanagement.views.grids.PasswordResetLogsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'usermanagementvctr',
    xtype: 'passwordresetlogsgrid',
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
    },'->',{
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'passwordresetlogs',
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
                storeId: 'userpasswordresetlogStr',
                proxy: {
                    url: 'usermanagement/getUserPasswordResetLogs',
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 100
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reset_by',
        text: 'Reset By',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reset_date',
        text: 'Reset Date',
        flex: 1
    }]
});
