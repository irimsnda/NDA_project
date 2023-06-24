/**
 * Created by Kip on 9/3/2018.
 */
Ext.define('Admin.view.usermanagement.views.grids.BlockedUsersGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.blockedusersgrid',
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
                storeId: 'blockedusersstr',
                proxy: {
                    url:'usermanagement/getBlockedSystemUsers'
                }
            },
            isLoad: true
        },
        itemdblclick: 'unblockSystemUser'
    },
    tbar: [{
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 60
    }, {
        xtype: 'displayfield',
        value: 'Double click to unblock/activate!!',
        fieldStyle: {
            'color': 'green',
            'font-style': 'italic'
        }
    }
    ],
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Blocked Users',
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
        dataIndex: 'department_name',
        text: 'Department',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'zone_name',
        text: 'Zone',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'last_login_time',
        text: 'Last Login Time',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
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
        renderer: function (val, meta, rec) {
            return rec.get('first_name2') + ' ' + rec.get('last_name2');
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reason',
        text: 'Reason',
        flex: 1
    }
    ]

});
