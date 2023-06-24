Ext.define('Admin.view.configurations.views.grids.AuditedTableGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'configurationsvctr',
    xtype: 'auditedTableGrid',
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
        childXtype: 'auditedTableFrm',
        winTitle: 'Audited Tables',
        winWidth: '60%',
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
    export_title: 'auditedTableGrid',
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
        ftype:'grouping',
        groupHeaderTpl: 'Type: {[values.rows[0].data.table_type]}, [{rows.length} {[values.rows.length > 1 ? "Tables" : "Table"]}]',
        startCollapsed: true
    }],
   
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'auditedTablesStr',
                groupField: 'table_type',
                remoteFilter: true,
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                    	is_config: 1,
                        table_name: 'par_audited_tables'
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
        width: 100,
        tdCls: 'wrap-text',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'table_type',
        text: 'Table Type',
        width: 100,
        tdCls: 'wrap-text',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'audited_table_name',
        text: 'Table Name',
        width: 100,
        tdCls: 'wrap-text',
    },{
        xtype: 'gridcolumn',
        dataIndex: 'logging_query',
        text: 'Logging Query',
        flex: 1,
        tdCls: 'wrap-text',
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
                    childXtype: 'auditedTableFrm',
                    winTitle: 'Audited Tables',
                    winWidth: '40%',
                    handler: 'showEditConfigParamWinFrm',bind: {
            disabled: '{isReadOnly}'
        },
                    stores: '[]'
                },  {
                    text: 'Delete',
                    iconCls: 'x-fa fa-trash',
                    tooltip: 'Delete Record',
                    table_name: 'par_audited_tables',
                    storeID: 'auditedTablesStr',
                    action_url: 'configurations/deleteAuditedTableLogger',  
                    action: 'actual_delete',bind: {
                        disabled: '{hideDeleteButton}'
                    },
                    handler: 'doDeleteConfigWidgetParam',
                    hidden: Admin.global.GlobalVars.checkForProcessVisibility('actual_delete')
                }
                ]
            }
        }
    }]
});
