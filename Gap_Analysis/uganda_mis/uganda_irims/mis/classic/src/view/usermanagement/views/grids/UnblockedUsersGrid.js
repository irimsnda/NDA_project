/**
 * Created by Kip on 9/4/2018.
 */
Ext.define('Admin.view.usermanagement.views.grids.UnblockedUsersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.unblockedusersgrid',
    cls: 'dashboard-todo-list',
    header: false,
    collapseMode: 'header',
    hideHeaders: false,
    scroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No User Available'
    },
    listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'unblockedusersstr',
                proxy: {
                    url:'usermanagement/getUnBlockedSystemUsers'
                }
            },
            isLoad: true
        }
    },
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    tbar: [{
        xtype: 'exportbtn'
    }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'saved_name',
        text: 'Photo',
        width: 100,
        renderer: function (val) {
            if (val) {
                return '<img src="' + base_url + '/resources/images/user-profile/' + val + '" width="75" height="50">';
            } else {
                return '<img src="' + base_url + '/resources/images/placeholder.png" width="75" height="50">';
            }
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'fullnames',
        text: 'Full Names',
        flex: 1
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
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'gender',
        text: 'Gender',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'access_point_name',
        text: 'Access Point',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'user_role_name',
        text: 'Role/Position',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'blocked_on',
        text: 'Blocked On',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'blocked_by',
        text: 'Blocked By',
        flex: 1,
        renderer:function (val,meta,rec) {
            return rec.get('first_name2')+' '+rec.get('last_name2');
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reason',
        text: 'Block Reason',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unblock_date',
        text: 'Unblocked On',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    },{
        xtype: 'gridcolumn',
        dataIndex: 'unblocked_by',
        text: 'Unblocked By',
        flex: 1,
        renderer:function (val,meta,rec) {
            return rec.get('first_name3')+' '+rec.get('last_name3');
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'unblock_reason',
        text: 'Unblock Reason',
        flex: 1
    }
    ]
});
