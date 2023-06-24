
Ext.define('Admin.view.configurations.views.grids.ControlledDrugsAnnualCeilingConfigGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'controlleddrugsannualceilingconfiggrid',
    cls: 'dashboard-todo-list',
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
        xtype: 'button',bind: {
            disabled: '{isReadOnly}'
        },
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'controlleddrugsannualceilingconfigfrm',
        winTitle: 'Controlled Drugs Annual Ceiling Configuration',
        winWidth: '50%',
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
    export_title: 'appealTypes',
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
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'controlleddrugsannualceilingconfigstr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                    	is_config: 1,
                        table_name: 'par_controlleddrugsannual_ceilingconfig'
                    }
                }
            },
            isLoad: true
        }
    },
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 100
    },{
        xtype: 'gridcolumn',
        dataIndex: 'controlleddrugs_type',
        text: 'Controlled Drugs Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'controlled_drugssubstances',
        text: 'Controlled Drugs Substances',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'annual_perioddefination',
        text: 'Annual Period',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'annual_extimated_ceiling',
        text: 'Annual Extimated Ceiling',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'created_on',
        text: 'Created On',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'dola',
        text: 'last_update_date',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'is_other_config',
        text: 'Is Other Config',
        flex: 1,
        renderer: function (value, metaData) {
            if (value) {
                metaData.tdStyle = 'color:white;background-color:green';
                return "True";
            }

            metaData.tdStyle = 'color:white;background-color:red';
            return "False";
        }
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
                    childXtype: 'controlleddrugsannualceilingconfigfrm',  winTitle: 'Controlled Drugs Annual Ceiling Configuration',
                    winWidth: '50%',
                    handler: 'showEditConfigParamWinFrm',
                    bind: {
                        disabled: '{isReadOnly}'
                    },
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_controlleddrugsannual_ceilingconfig',
                    storeID: 'controlleddrugsannualceilingconfigstr',
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
                    table_name: 'par_controlleddrugsannual_ceilingconfig',
                    storeID: 'controlleddrugsannualceilingconfigstr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    bind: {
                        disabled: '{hideDeleteButton}'
                    },
                    handler: 'doDeleteConfigWidgetParam',
                    bind: {
                        disabled: '{hideDeleteButton}'
                    },
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_controlleddrugsannual_ceilingconfig',
                    storeID: 'controlleddrugsannualceilingconfigstr',
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
    }]
});
