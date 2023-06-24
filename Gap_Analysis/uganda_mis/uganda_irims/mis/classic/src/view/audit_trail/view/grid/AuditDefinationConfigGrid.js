
Ext.define('Admin.view.audit_trail.views.grids.AuditDefinationConfigGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'audit_trialViewCtr',
    xtype: 'auditdefinationconfigGrid',
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
        childXtype: 'auditdefinationconfigFrm',
        winTitle: 'Audit Trail Defination',
        winWidth: '40%',
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
    export_title: 'auditdefinationconfig',
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
                groupField: 'primary_table',
                storeId: 'auditdefinationconfigStr',
                proxy: {
                    url: 'commonparam/getCommonParamFromTable',
                    extraParams:{
                        table_name: 'par_audit_definations'
                    }
                }
            },
            isLoad: true
        }
    },
    features: [{
        ftype:'grouping',
        startCollapsed: true
    }],
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'id',
        text: 'Ref ID',
        width: 100
    },{
        xtype: 'gridcolumn',
        dataIndex: 'primary_table',
        text: 'Table Name',
        flex: 1,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'audit_table',
        text: 'Audit table',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'table_event',
        text: 'Table Event',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'event_time',
        text: 'Event Time',
        flex: 1
    },{
        xtype: 'gridcolumn',
        dataIndex: 'description',
        text: 'Description',
        flex: 1
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
                    text: 'Export',
                    iconCls: 'x-fa fa-export',
                    tooltip: 'Export the table audit',
                    handler: 'exportAuditLogs'
                }
                ]
            }
        }
    }]
});
