/**
 * Created by Kip on 8/24/2018.
 */
Ext.define('Admin.view.administration.views.grids.MenuProcessesGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'menuprocessesgrid',
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
        text: 'Add Permission',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'menuprocessesfrm',
        winTitle: 'System Permission',
        winWidth: '35%',
        handler: 'showAddAdminParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
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
    export_title: 'Permissions',
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setAdminGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'menuprocessesstr',
                proxy: {
                    extraParams: {
                        model_name: 'ComponentPermission'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Permission Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'identifier',
        text: 'Permission Identifier',
        flex: 1
    }, {
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
                    childXtype: 'menuprocessesfrm',
                    winTitle: 'Edit System Permission',
                    winWidth: '35%',
                    handler: 'showEditAdminParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Delete (Soft)',
                    iconCls: 'x-fa fa-trash-o',
                    tooltip: 'Delete Record',
                    table_name: 'par_menuitems_processes',
                    storeID: 'menuprocessesstr',
                    action_url: 'administration/softDeleteAdminRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteAdminWidgetParam'
                }, {
                    text: 'Delete (Actual)',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_menuitems_processes',
                    storeID: 'menuprocessesstr',
                    action_url: 'administration/deleteAdminRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteAdminWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_menuitems_processes',
                    storeID: 'menuprocessesstr',
                    action_url: 'administration/undoAdminSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteAdminWidgetParam'
                }
                ]
            }
        }, onWidgetAttach: function (col, widget, rec) {
            var is_enabled = rec.get('is_enabled');
            if (is_enabled === 0 || is_enabled == 0) {
                widget.down('menu menuitem[action=enable]').setDisabled(false);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=enable]').setDisabled(true);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
            }
        }
    }]
});
