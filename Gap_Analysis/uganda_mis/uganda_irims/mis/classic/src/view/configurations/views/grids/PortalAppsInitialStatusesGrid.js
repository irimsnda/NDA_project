/**
 * Created by Kip on 8/15/2019.
 */
Ext.define('Admin.view.configurations.views.grids.PortalAppsInitialStatusesGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'portalappsinitialstatusesgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    height: Ext.Element.getViewportHeight() - 118,
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
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'portalappsinitialstatusesfrm',
        winTitle: 'Portal Application Initial Status on MIS',
        winWidth: '40%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }, {
        xtype: 'combo',
        fieldLabel: 'Module',
        name: 'module_id',
        valueField: 'id',
        labelWidth: 80,
        width: 290,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        triggers: {
            clear: {
                type: 'clear',
                hideWhenEmpty: true,
                hideWhenMouseOut: false,
                clearOnEscape: true
            }
        },
        listeners: {
            afterrender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        extraParams: {
                            model_name: 'Module'
                        }
                    }
                },
                isLoad: true
            },
            change: function (cmbo, newVal) {
                var grid = cmbo.up('grid');
                grid.getStore().load();
            }
        }
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Application statuses',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            var grid = this.up('grid'),
                store = this.getStore(),
                module_id = grid.down('combo[name=module_id]').getValue();
            store.getProxy().extraParams = {
                module_id: module_id
            }
        }
    }],
    features: [{
        ftype: 'searching',
        minChars: 2,
        mode: 'local'
    } /*{
        ftype: 'grouping',
        startCollapsed: true,
        groupHeaderTpl: 'Module: {[values.rows[0].data.module_name]}[{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }*/],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'portalappsinitialstatusesstr',
                //groupField: 'module_id',
                proxy: {
                    url: 'configurations/getPortalAppsInitialStatuses'
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'module_name',
        text: 'Module',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'portal_status_type',
        text: 'Portal Status Type',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'status_name',
        text: 'MIS Status(On Receiving)',
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
                    childXtype: 'portalappsinitialstatusesfrm',
                    winTitle: 'Portal Application Initial Status on MIS',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_portalapps_initialmis_statuses',
                    storeID: 'portalappsinitialstatusesstr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_portalapps_initialmis_statuses',
                    storeID: 'portalappsinitialstatusesstr',
                    action_url: 'configurations/deleteConfigRecord',
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_portalapps_initialmis_statuses',
                    storeID: 'portalappsinitialstatusesstr',
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
