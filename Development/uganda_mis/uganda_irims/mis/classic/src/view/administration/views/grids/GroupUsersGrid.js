/**
 * Created by Kip on 10/3/2018.
 */
Ext.define('Admin.view.administration.views.grids.GroupUsersGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'administrationvctr',
    xtype: 'groupusersgrid',
    cls: 'dashboard-todo-list',
    header: false,
    //store: 'usersstr',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    tbar: [{
        xtype: 'exportbtn'
    }],
    selModel:{
        selType: 'checkboxmodel'
    },
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Active System Users',
    bbar: [
        {
            xtype: 'button',
            text: 'Back',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-backward',
            handler: 'backFromGroupAllDetails'
        },
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            displayMsg: 'Showing {0} - {1} of {2} total records',
            emptyMsg: 'No Records',
            beforeLoad: function () {
                var store = this.store,
                    grid = this.up('grid'),
                    tabPnl = grid.up('tabpanel'),
                    group_id = tabPnl.down('hiddenfield[name=active_group_id]').getValue();
                store.getProxy().extraParams = {
                    group_id: group_id
                };
            }
        },
        '->',
        {
            xtype:'button',
            text: 'Add Group Users',
            ui: 'soft-purple',
            iconCls: 'x-fa fa-user',
            passedGroup: 1,
            childXtype: 'addgroupusersgrid',
            winTitle: 'Add Group Users',
            winWidth: '70%',
            stores: [],
            handler: 'showAddAdminParamWinFrm'
        },
        {
            xtype: 'button',
            text: 'Remove Selected',
            action: 'remove_selected',
            ui: 'soft-purple',
            disabled: true,
            iconCls: 'x-fa fa-remove',
            handler: 'removeSelectedUsersFromGroup'
        }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setAdminGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'setAdminGridsStore',
                proxy: {
                    url: 'usermanagement/getActiveSystemUsers',
                }
            },
            isLoad: true
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
    }]
});
