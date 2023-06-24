/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.dashboard.grids.ExternalUserOutTrayGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'externaluserouttraygrid',
    controller: 'dashboardvctr',
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    tbar: [],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            store: 'externaluserouttraystr'
        },'->',
        {
            xtype: 'button',
            text: 'Export outTray',
            type: 2,
            is_internaluser: 0,
            ui:'soft-green',
            iconCls: 'x-fa fa-print',
            handler: 'exportDashboardnoFilters'
        }
    ],
    listeners: {
        beforerender: function () {
            var store = this.getStore();
            store.removeAll();
            store.load();
        }
    },
    features: [
        {
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, Stage: {[values.rows[0].data.workflow_stage]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],
    store: 'externaluserouttraystr',
    columns: [
        {
            xtype: 'gridcolumn',
            text: 'Urgency',
            dataIndex: 'urgency_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Reference',
            dataIndex: 'reference_no',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Process',
            dataIndex: 'process_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Stage',
            dataIndex: 'workflow_stage',
            flex: 1,
            tdCls: 'wrap',
            hidden: true
        },
        {
            xtype: 'gridcolumn',
            text: 'From',
            dataIndex: 'from_user',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'To',
            dataIndex: 'to_user',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Applicant',
            dataIndex: 'applicant_name',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Remarks/Comment',
            dataIndex: 'remarks',
            flex: 1,
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            flex: 1,
            tdCls: 'wrap',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
        },
        {
            xtype: 'gridcolumn',
            text: 'Date Released',
            dataIndex: 'date_released',
            flex: 1,
            tdCls: 'wrap',
            renderer: Ext.util.Format.dateRenderer('d/m/Y H:i:s')
        },
        {
            xtype: 'gridcolumn',
            text: 'App Status',
            dataIndex: 'application_status',
            flex: 1,
            tdCls: 'wrap'
        }
    ]
});