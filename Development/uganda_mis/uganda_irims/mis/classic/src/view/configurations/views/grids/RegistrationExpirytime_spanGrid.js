/**
 * Created by Kip on 9/27/2018.
 */
Ext.define('Admin.view.configurations.views.grids.RegistrationExpirytime_spanGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'registrationexpirytime_spangrid',
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
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'registrationexpirytime_spanfrm',
        childXtype: 'registrationexpirytime_spanfrm',
        winTitle: 'Registration Times Span',
        winWidth: '35%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    export_title: 'Registration Times Span',
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
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                storeId: 'registrationexpirytime_spanstr',
                proxy: {
                    url: 'configurations/getregistrationexpirytime_span'

                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'sub_module_name',
        text: 'Sub Module Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'section_name',
        text: 'Section Name',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'time_span',
        text: 'Time Span',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'timespan_defination',
        text: 'Time Span Defination',
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
                    childXtype: 'registrationexpirytime_spanfrm',
                    winTitle: 'Registration Times Span',
                    winWidth: '35%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_registration_expirytime_span',
                    storeID: 'registrationexpirytime_spanstr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_registration_expirytime_span',
                    storeID: 'registrationexpirytime_spanstr',
                    action_url: 'configurations/deleteConfigRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_registration_expirytime_span',
                    storeID: 'registrationexpirytime_spanstr',
                    action_url: 'configurations/undoConfigSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteConfigWidgetParam'
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
