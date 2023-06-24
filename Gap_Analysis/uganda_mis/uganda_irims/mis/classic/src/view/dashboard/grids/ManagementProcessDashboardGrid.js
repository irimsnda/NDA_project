/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.dashboard.grids.ManagementProcessDashboardGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'managementprocessdashboardgrid',
    controller: 'dashboardvctr',
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    margin: 3,
    
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],plugins: [{
        ptype: 'gridexporter'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 10000,
                groupField: 'module',
                storeId: 'managementprocessdashboardgridstr',
                proxy: {
                    url: 'dashboard/getDashApplicationSummaryDetails'//getClinicalTrialManagerMeetingApplications
                }
            },
            isLoad: true
        },
      
    },
    export_title: 'Intray',
    bbar:[{
        xtype: 'pagingtoolbar',
        displayInfo: true,
        width: '85%',
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad: function () {
            return;
        }
    },
    {
        xtype: 'exportbtn'
    }],
    features: [{
            startCollapsed: false,
            groupHeaderTpl: 'Process: {[values.rows[0].data.module]},  {[values.rows.length > 1 ? "Items" : "Item"]}]',
            ftype: 'groupingsummary'
    }],
    columns: [{
            xtype: 'gridcolumn',
            text: 'Process',
            dataIndex: 'module',
            flex: 1,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            text: 'Sub-Process',
            dataIndex: 'sub_module',
            flex: 1,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            text: 'Section',
            dataIndex: 'section',
            flex: 1,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            text: 'Received Applications',
            dataIndex: 'received',
            flex: 0.5,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            text: 'Approved Applications',
            dataIndex: 'approved',
            flex: 0.5,
            tdCls: 'wrap-text'
        },{
            xtype: 'gridcolumn',
            text: 'Rejected Applications',
            dataIndex: 'rejected',
            flex: 0.5,
            tdCls: 'wrap-text'
        }
    ]
});