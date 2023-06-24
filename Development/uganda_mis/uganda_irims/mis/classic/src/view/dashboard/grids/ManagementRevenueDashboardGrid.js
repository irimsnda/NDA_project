/**
 * Created by Kip on 8/15/2018.
 */
Ext.define('Admin.view.dashboard.grids.ManagementRevenueDashboardGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'managementrevenuedashboardgrid',
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
                
                storeId: 'managementrevenuedashboardgridstr',
                proxy: {
                    url: 'dashboard/getDashRevenueSummaryDetails'//getClinicalTrialManagerMeetingApplications
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
    },{
        ftype: 'summary'
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
            tdCls: 'wrap-text', summaryRenderer: function(){
                return '<b>Totals:</b>';
            }
        },{
            xtype: 'gridcolumn',
            text: 'Medicines',
            dataIndex: '2',
            flex: 0.5,
            tdCls: 'wrap-text',
            summaryType: 'sum',
            summaryRenderer: function(value){
                       return('Amount. '+addCommas(value));
             },
             renderer: Ext.util.Format.numberRenderer('0,000.00')
        },{
            xtype: 'gridcolumn',
            text: 'Medical Devices',
            dataIndex: '4',
            flex: 0.5,
            tdCls: 'wrap-text',
            summaryType: 'sum',
            summaryRenderer: function(value){
                            return('Amount. '+addCommas(value));
             },
             renderer: Ext.util.Format.numberRenderer('0,000.00')
        },{
            xtype: 'gridcolumn',
            text: 'Clinical Trial',
            dataIndex: '5',
            flex: 0.5,
            tdCls: 'wrap-text',
            summaryType: 'sum',
            summaryRenderer: function(value){
                            return('Amount. '+addCommas(value));
             },
             renderer: Ext.util.Format.numberRenderer('0,000.00')
        }
    ]
});