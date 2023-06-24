/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.usermanagement.views.grids.GenderGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'usermanagementvctr',
    xtype: 'gendergrid',
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
        text: 'Add Gender',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        form: 'genderfrm',
        handler: 'showSimpleUserModuleGridForm',
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
                pageSize: 100,
                storeId: 'genderstr',
                proxy: {
                    extraParams: {
                        model_name: 'Gender'
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
                    form: 'genderfrm',
                    handler: 'showEditUserParamGridFrm',
                    stores: '[]'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_gender',
                    storeID: 'genderstr',
                    action_url: 'usermanagement/softDeleteUserRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteUserWidgetParam'
                },{
                    text: 'Delete (Actual)',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_gender',
                    storeID: 'genderstr',
                    action_url: 'usermanagement/deleteUserRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteUserWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                },{
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_gender',
                    storeID: 'genderstr',
                    action_url: 'usermanagement/undoUserSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    handler: 'doDeleteUserWidgetParam'
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
