/**
 * Created by Kip on 7/10/2018.
 */
Ext.define('Admin.view.administration.views.grids.SystemAccessLevelsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'systemaccesslevelsgrid',
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
    requires: [
        'Ext.grid.*'
    ],
    tbar: [{
        xtype: 'button',
        text: 'Add Access Level',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'systemaccesslevelsfrm',
        handler: 'showSimpleAdminModuleGridForm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    export_title: 'System Access Levels',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        store: 'systemaccesslevelsstr',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records'
    }],
    plugins:[
        {
            ptype: 'gridexporter'
        }
    ],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        afterrender: function () {
            var store = this.store;
            store.removeAll();
            store.load();
        }
    },
    store: 'systemaccesslevelsstr',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'name',
        text: 'Name',
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
                    form: 'systemaccesslevelsfrm',
                    handler: 'showEditAdminParamGridFrm',
                    stores: '[]'
                }, {
                    text: 'Disabled',
                    iconCls: 'x-fa fa-repeat',
                    tooltip: 'Delete Record',
                    table_name: 'par_accesslevels',
                    storeID: 'systemaccesslevelsstr',
                    action_url: 'administration/softDeleteAdminRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteAdminWidgetParam'
                },{
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_accesslevels',
                    storeID: 'systemaccesslevelsstr',
                    action_url: 'administration/deleteAdminRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteAdminWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                },{
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_accesslevels',
                    storeID: 'systemaccesslevelsstr',
                    action_url: 'administration/undoAdminSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteAdminWidgetParam'
                }
                ]
            }
        },onWidgetAttach: function (col, widget, rec) {
            var is_enabled = rec.get('is_enabled');
            if (is_enabled === 0||is_enabled==0) {
                widget.down('menu menuitem[action=enable]').setDisabled(false);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(true);
            } else {
                widget.down('menu menuitem[action=enable]').setDisabled(true);
                widget.down('menu menuitem[action=soft_delete]').setDisabled(false);
            }
        }
    }]
});
