Ext.define('Admin.view.dashboard.grids.AssaingmentApplicationsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'assaingmentapplicationsgrid',
    controller: 'dashboardvctr',
    height: Ext.Element.getViewportHeight() - 118,
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
                storeId: 'assaingmentapplicationsgridstr',
                proxy: {
                    url: 'dashboard/getAssaignmentApplications'
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
            var grid = this.up('grid'),
                store = grid.getStore(),
                process_id = grid.down('hiddenfield[name=process_id]').getValue(),
                stage_id = grid.down('hiddenfield[name=stage_id]').getValue(),
                user_id = grid.down('hiddenfield[name=user_id]').getValue();

            store.getProxy().extraParams = {
                        process_id: process_id,
                        stage_id: stage_id,
                        user_id: user_id
                    };
        }
    },
    {
        xtype: 'exportbtn'
    }],
    tbar: [{
        xtype: 'hiddenfield',
        name: 'stage_id'
    },{
        xtype: 'hiddenfield',
        name: 'process_id'
    },{
        xtype: 'hiddenfield',
        name: 'user_id'
    }],
    columns: [{
        text: 'Options',
            xtype: 'widgetcolumn',
            width: 150,
            widget: {
                width: 100,
                textAlign: 'left',
                xtype: 'button',
                ui: 'soft-green',
                text: 'Reassign',
                childXtype: 'taskreassingmentfrm',
                winTitle: 'Reassign Application',
                winWidth: '40%',
                stores: '[]',
                handler: 'reAssaignpplications'
            }
    },
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
            text: 'Tracking No',
            dataIndex: 'tracking_no',
            flex: 1,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Reference',
            dataIndex: 'reference_no',
            flex: 1,
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
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
        },{
            xtype: 'gridcolumn',
            text: 'Expected Start Date',
            dataIndex: 'expected_start_date',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },{
            xtype: 'gridcolumn',
            text: 'Expected End Date',
            dataIndex: 'expected_end_date',
            flex: 1,
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        },
        {
            xtype: 'gridcolumn',
            text: 'App Status',
            dataIndex: 'application_status',
            flex: 1,
            tdCls: 'wrap'
        },{
            xtype: 'gridcolumn',
            text: 'Time Span',
            dataIndex: 'time_span',
            flex: 0.5,
            tdCls: 'wrap',
            renderer: function (val, meta, record) {
                var time_spanexpected = record.get('time_spanexpected'),
                time_span = record.get('time_span');
               
                    return time_span;
              
            }
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