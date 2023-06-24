/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.grids.SystemDashboardsGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'usermanagementvctr',
    xtype: 'systemdashboardsgrid',
    cls: 'dashboard-todo-list',
    header: false,
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_enabled = record.get('is_enabled');
            if (is_enabled == 0 || is_enabled === 0) {
                return 'invalid-row';
            }
        }
    },
    tbar: [{
        xtype: 'button',
        text: 'Add System Dashboard',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        winTitle: 'System Dashboard',
        ui: 'soft-green',
        childXtype: 'systemdashboardsfrm',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins:[
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Gender',
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
                storeId: 'systemdashboardsgridstr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                        table_name: 'par_system_dashboards'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'viewtype',
        text: 'View Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
    }, {
        text: 'Options',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            textAlign: 'left',
            xtype: 'splitbutton',
            iconCls: 'x-fa fa-th-list',
            ui: 'gray',
            menu: {
                xtype: 'menu',
                items: [{
                    text: 'Edit',
                    iconCls: 'x-fa fa-edit',
                    tooltip: 'Edit Record',
                    action: 'edit',
                    winTitle: 'System Dashboard',
                    childXtype: 'systemdashboardsfrm',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_system_dashboards',
                    storeID: 'systemdashboardsgridstr',
                    action_url: 'usermanagement/softDeleteUserRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteUserWidgetParam'
                }]
            }
        }
    }]
});
