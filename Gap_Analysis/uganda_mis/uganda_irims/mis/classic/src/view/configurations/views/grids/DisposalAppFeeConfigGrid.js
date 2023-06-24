
Ext.define('Admin.view.configurations.views.grids.DisposalAppFeeConfigGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'disposalappfeeconfiggrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    layout: 'fit',
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
        xtype: 'button',bind: {
            disabled: '{isReadOnly}'
        },
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'disposalappfeeconfigfrm',
        winTitle: 'Disposal Fee Configurations',
        winWidth: '70%',
        handler: 'showAddConfigParamWinFrm',
        stores: '[]'
    }, {
        xtype: 'exportbtn'
    }],
    plugins: [
        {
            ptype: 'gridexporter'
        }
    ],
    export_title: 'Module Fee Configurations',
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
    },{
        ftype: 'grouping',
        startCollapsed: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100,
                storeId: 'disposalappfeeconfigstr',
                groupField:'fee_type',
                proxy: {
                    url: 'configurations/getAppModuleFeeConfig',
                    extraParams:{
                    	is_config: 1,
                        module_id: 15,
                        table_name: 'tra_appmodules_feesconfigurations'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'rownumberer'
    },{
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
                    childXtype: 'disposalappfeeconfigfrm',
                 winTitle: 'Inspection of Disposal Fee Configurations',
                    winWidth: '70%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'tra_appmodules_feesconfigurations',
                    storeID: 'disposalappfeeconfigstr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'tra_appmodules_feesconfigurations',
                    storeID: 'disposalappfeeconfigstr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',bind: {
                        disabled: '{hideDeleteButton}'
                    },
                    handler: 'doDeleteConfigWidgetParam',bind: {
                        disabled: '{hideDeleteButton}'
                    },
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'tra_appmodules_feesconfigurations',
                    storeID: 'disposalappfeeconfigstr',
                    action_url: 'configurations/undoConfigSoftDeletes',
                    action: 'enable',
                    disabled: true,
                    bind: {
                        disabled: '{isReadOnly}'
                    },
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'module',
        text: 'Module',
        tdCls: 'wrap',
         flex:1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sub_module',
        text: 'Sub Module',
        tdCls: 'wrap',
         flex:1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicationfeetype',
        text: 'Application Fee Type',
        tdCls: 'wrap',
         flex:1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'fee_type',
        text: 'Fee Type',
        tdCls: 'wrap',
         flex:1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cost_category',
        text: 'Cost Category',
        tdCls: 'wrap',
         flex:1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cost_sub_category',
        text: 'Cost Sub Category',
        tdCls: 'wrap',
         flex:1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'cost_element',
        text: 'Cost Element',
        tdCls: 'wrap',
         flex:1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'element_cost',
        text: 'Element Cost',
        tdCls: 'wrap',
         flex:1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        tdCls: 'wrap',
         flex:1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_enabled',
        text: 'Enable',
        flex: 1,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
    }]
});
