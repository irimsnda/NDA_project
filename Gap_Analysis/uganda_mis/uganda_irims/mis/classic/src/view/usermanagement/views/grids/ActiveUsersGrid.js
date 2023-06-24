
Ext.define('Admin.view.usermanagement.views.grids.ActiveUsersGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'usermanagementvctr',
    xtype: 'activeusersgrid',
    cls: 'dashboard-todo-list',
    header: false,
    store: 'usersstr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        // getRowClass: function (record, rowIndex, rowParams, store) {
        //     var is_expiring = record.get('is_expiring');
        //     if (is_expiring == 0 || is_expiring === 0) {
        //         return 'invalid-row';
        //     }
        // }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add User',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'userspnl',
        handler: 'showSimpleUserModuleGridForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'tbspacer',
        width: 60
    }, {
        xtype: 'displayfield',
        value: 'Double click to view details!!',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Active System Users',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        store: 'usersstr',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        },
        itemdblclick: 'showEditSystemUser'
    },
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
        text: 'Division',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'zone_name',
        text: 'Zone',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'user_role_name',
        text: 'Role/Position',
        flex: 1,
        hidden: true
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'last_login_time',
        text: 'Last Login Time',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    },{
        xtype: 'gridcolumn',
        dataIndex: 'last_login_time',
        text: 'Active Since(Days)',
        flex: 1,
        renderer: function(value, metaData, record, rowIndex){
            if(record.get('has_expiry_exemption')){
                return "Permanent Ac";
            }
            var days =  Ext.Date.diff(new Date(value),new Date(),Ext.Date.DAY);
            if(days > 90){
                metaData.tdStyle = 'color:white;background-color:red';
            }
            return days;
        }
    }, {
        xtype: 'widgetcolumn',
        text: 'Options',
        //hidden: true,
        width: 100,
        widget: {
            textAlign: 'left',
            xtype: 'splitbutton',
            ui: 'gray',
            width: 75,
            iconCls: 'x-fa fa-th-list',
            // text: 'Action',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Detail Changes',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Changes made to account',
                    handler: 'showUserPasswordResetLogs',
                    childXtype: 'userdetailsupdatelogsgrid',
                    winTitle: 'Details Update Logs',
                    winWidth: '60%',
                }, {
                    text: 'Password Change',
                    iconCls: 'x-fa fa-eye',
                    childXtype: 'passwordresetlogsgrid',
                    tooltip: 'View password change logs',
                    stores: '[]',
                    winTitle: 'Password Reset Logs',
                    winWidth: '60%',
                    handler: 'showUserPasswordResetLogs'
                }, {
                    text: 'User Logins',
                    iconCls: 'x-fa fa-sign-in',
                    tooltip: 'Show loging logs for the user',
                    action_url: 'usermanagement/deleteUser',
                    handler: 'showUserLoginLogs'
                }
                ]
            }
        }

    }]
});
