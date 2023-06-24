
Ext.define('Admin.view.reports.appsreport.applicationprocessingreport.grids.ProcessingAlertingApplicationsGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'processingalertingapplicationsgrid',
    controller: 'applicationprocessingreportctr',
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available'
    },
    margin: 3,
     tbar: [
      {
        xtype: 'hiddenfield',
        name: 'section_id',
      },{
        xtype: 'hiddenfield',
        name: 'module_id',
      },{
        xtype: 'hiddenfield',
        name: 'sub_module_id',
      },{
        xtype: 'hiddenfield',
        name: 'from_date',
      },{
        xtype: 'hiddenfield',
        name: 'to_date',
      },

     ],
    
    bbar: [{
        xtype: 'pagingtoolbar',
            displayInfo: true,
            width: '60%',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    section_id = grid.down('hiddenfield[name=section_id]').getValue(),
                    module_id = grid.down('hiddenfield[name=module_id]').getValue(),
                    sub_module_id = grid.down('hiddenfield[name=sub_module_id]').getValue(),
                    from_date = grid.down('hiddenfield[name=from_date]').getValue(),
                    to_date = grid.down('hiddenfield[name=to_date]').getValue();
                    
                    
                store.getProxy().extraParams = {
                    section_id: section_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    from_date: from_date,
                    to_date: to_date
                   
                };
            }
        },  
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Print Report',
            iconCls: 'x-fa fa-print',
            handler: 'printalarmingProcessingReport',
           
        },
        
        {
            xtype:'button',
            ui: 'soft-green',
            text: 'Export Report',
            iconCls: 'x-fa fa-file',
            handler: 'exportalarmingProcessingReport'
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
                storeId: 'processingalertingapplicationsgridstr',
                proxy: {
                    url: 'newreports/getProcessingAlertingApplications'
                }
            },
            isLoad: true
        }
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
        ptype: 'gridexporter'
    }],
    export_title: 'Application Processing Details(Alerting Processing)',
    columns: [
           {
            header: 'Processing Status (Day)',
            dataIndex: 'date_received',
            width: 150,tbCls: 'wrap',
            renderer: function (value, metaData,record) {
                var date_received = new Date(record.get('date_received')),
                current_date=new Date(new Date());
                Ext.Date.format(current_date ,'Y-m-d H:i:s.u');

                var diff = Ext.Date.diff(date_received, current_date, 'd');

                  metaData.tdStyle = 'color:white;background-color:red';
                 return diff +' Day(s)';
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
            tdCls: 'wrap-text',
            renderer: Ext.util.Format.dateRenderer('Y-m-d')
        }
       
    ]
});