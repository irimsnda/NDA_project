
Ext.define('Admin.view.configurations.views.grids.ControlDocumentMasterListGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'controldocumentmasterlistGrid',
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
        xtype: 'button',
        text: 'Add',
        iconCls: 'x-fa fa-plus',
        action: 'add',
        ui: 'soft-green',
        childXtype: 'controldocumentmasterlistFrm',
        winTitle: 'Control Document Master List',
        winWidth: '45%',
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
    export_title: 'controldocumentmasterlist',
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
                storeId: 'controldocumentmasterlistStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                    	is_config: 1,
                        table_name: 'par_controldocument_masterlist'
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
        dataIndex: 'name',
        text: 'Name',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'controldocument_type_name',
        text: 'Control Document Type',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'directorate_name',
        text: 'Directorate',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'directorate_unit_name',
        text: 'Directorate Unit',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'doc_serial_number',
        text: 'Doc Serial Number',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ref_format',
        text: 'Ref Format',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'code',
        text: 'Code',
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
                    childXtype: 'controldocumentmasterlistFrm',
                    winTitle: 'Control Document Master List',
                    winWidth: '45%',
                    handler: 'showEditConfigParamWinFrm',
                    stores: '[]'
                }, {
                    text: 'Disable',
                    iconCls: 'x-fa fa-repeat',
                    table_name: 'par_controldocument_masterlist',
                    storeID: 'controldocumentmasterlistStr',
                    action_url: 'configurations/softDeleteConfigRecord',
                    action: 'soft_delete',
                    handler: 'doDeleteConfigWidgetParam'
                }, {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_controldocument_masterlist',
                    storeID: 'controldocumentmasterlistStr',
                    action_url: 'configurations/deleteConfigRecord',  
                    action: 'actual_delete',
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }, {
                    text: 'Enable',
                    iconCls: 'x-fa fa-undo',
                    tooltip: 'Enable Record',
                    table_name: 'par_controldocument_masterlist',
                    storeID: 'controldocumentmasterlistStr',
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
