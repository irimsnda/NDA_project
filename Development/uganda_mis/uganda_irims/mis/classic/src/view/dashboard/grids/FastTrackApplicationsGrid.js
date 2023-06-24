Ext.define('Admin.view.dashboard.grids.FastTrackApplicationsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'fasttrackapplicationsgrid',
    controller: 'dashboardvctr',
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    margin: 3,
    
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            width: '60%',
            
        },
        
        {
            xtype: 'exportbtn'
        }
    ],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 500,
                enablePagination: true,
                remoteFilter: true,
                grouper: {
                    groupFn: function (item) {
                        return item.get('process_id') + item.get('workflow_stage_id');
                    }
                },
                storeId: 'fasttrackapplicationsgridstr',
                proxy: {
                    url: 'dashboard/getAssignedFasttrackApplications'
                }
            },
            isLoad: true
        },
        afterrender:function(){
            // var view = this.getView();
            // var groupingFeature = view.findFeature("grouping");
            // groupingFeature.enable();
        },
    },
    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, Stage: {[values.rows[0].data.workflow_stage]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false,
            startCollapsed: false
        }
    ],
    plugins: [{
        ptype: 'filterfield'
    },{
        ptype: 'gridexporter'
    }],
    export_title: 'Application Assignments Details',
    columns: [
        {
            xtype: 'gridcolumn',
            width: 50,
            renderer: function (val, meta, record) {
                var isRead = record.get('isRead');
                if (isRead == 1 || isRead === 1) {
                    //return '<img src="' + base_url + '/resources/images/new3.jpg">';
                } else {
                    return '<img src="' + base_url + '/resources/images/new3.jpg">';
                }
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Urgency',
            dataIndex: 'urgency_name',
            width: 150,tbCls: 'wrap',
            renderer: function (val, meta, record) {
                var fasttrack_option_id = record.get('fasttrack_option_id');

                if (fasttrack_option_id ==1) {
                    return '<img src="' + base_url + '/resources/images/fasttrack.jpg">';
                   // metaData.tdStyle = 'color:white;background-color:red';
                   // return "True";
                }
                return val;
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Tracking No',
            dataIndex: 'tracking_no',
            flex: 1,
            tdCls: 'wrap',
            
        },
        {
            xtype: 'gridcolumn',
            text: 'Application No',
            dataIndex: 'reference_no',
            flex: 1,
            tdCls: 'wrap',
           
        },
        {
            xtype: 'gridcolumn',
            text: 'Process',
            dataIndex: 'process_name',
            flex: 1,
            tdCls: 'wrap-text',
            hidden: true
        },
        {
            xtype: 'gridcolumn',
            text: 'Prev Stage',
            dataIndex: 'prev_stage',
            flex: 1,
            tdCls: 'wrap'
        },{
            xtype: 'gridcolumn',
            text: 'Current Stage',
            dataIndex: 'workflow_stage',
            flex: 1,
            tdCls: 'wrap'
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
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
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
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },
        {
            xtype: 'gridcolumn',
            width: 50,
            renderer: function (val, meta, record) {
                var is_fast_track = record.get('is_fast_track');
                if (is_fast_track == 1 || is_fast_track === 1) {
                    return '<img src="' + base_url + '/resources/images/fasttrack.jpg">';
                } else {
                    //return '<img src="' + base_url + '/resources/images/fasttrack.jpg">';
                }
            }
        }
    ]
});