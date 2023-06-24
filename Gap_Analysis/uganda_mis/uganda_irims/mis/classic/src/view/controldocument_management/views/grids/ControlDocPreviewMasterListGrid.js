
Ext.define('Admin.view.controldocument_management.views.grids.ControlDocPreviewMasterListGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'controldocpreviewmasterlistgrid',
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
    },{
        text:'Double click to select control Document Details'
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
    },{
        ftype: 'grouping',
        startCollapsed: false,
        groupHeaderTpl: 'Document Type: {[values.rows[0].data.controldocument_type_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        hideGroupedHeader: true,
        enableGroupingMenu: false
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'controldocumentmasterlistStr',
                grouper: {
                    groupFn: function (item) {
                        return item.get('controldocument_type_name');
                    }
                },
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
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
        hidden: true,
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
        dataIndex: 'code',
        text: 'Document Number',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'doc_serial_number',
        text: 'Doc Serial Number',
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
            }metaData.tdStyle = 'color:white;background-color:red';
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
                }
                ]
            }
        }
    }]
});
