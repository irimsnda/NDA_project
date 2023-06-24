//deplicated
Ext.define('Admin.view.usermanagement.views.grids.ExternalUsersGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'usermanagementvctr',
    xtype: 'externalusersgrid',
    cls: 'dashboard-todo-list',
    header: false,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_active = record.get('is_active');
            if (is_active == 0 || is_active === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add User',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'externalusersFrmpnl',
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
    export_title: 'External Users',
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
     listeners: {
        beforerender: {
            fn: 'setUserGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'externalusersstr',
                proxy: {
                    url: 'usermanagement/getExternalSystemUsers',
                }
            },
            isLoad: true,

        },
        itemdblclick: 'showEditExternalSystemUser'
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Email Address',
        flex: 1,
        renderer: function (value) {
            return Ext.String.format('<a href="mailto:{0}">{1}</a>', value, value);
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'phone',
        text: 'Phone No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'mobile',
        text: 'Mobile No',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'category_name',
        text: 'External User Category',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'last_login_time',
        text: 'Last Login Time',
        flex: 1,
        renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
    }, {
        xtype: 'widgetcolumn',
        text: 'Options',
        hidden: false,
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
                    text: 'Activate',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Activate user',
                    action_url: 'usermanagement/activateSystemExternalUser',
                    action: 'activate',
                    handler: 'activateApiUser',
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var is_active = rec.get('is_active');
            if (is_active === 0 || is_active == 0) {
                widget.down('menu menuitem[action=activate]').setDisabled(false);
            } else {
                widget.down('menu menuitem[action=activate]').setDisabled(true);
            }
        }

    }]
});
