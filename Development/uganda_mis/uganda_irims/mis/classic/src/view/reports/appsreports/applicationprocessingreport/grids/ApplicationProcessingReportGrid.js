
Ext.define('Admin.view.reports.appsreport.applicationprocessingreport.grids.ApplicationProcessingReportGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'applicationprocessingreportgrid',
    itemId:'applicationprocessingreportgrid',
    controller: 'applicationprocessingreportctr',
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 100000,
                storeId: 'applicationprocessingreportgridstr',
                 remoteFilter:true,
                 grouper: {
                        groupFn: function (item) {
                            return item.get('process_id') + item.get('workflow_stage_id');
                        }
                    },
                proxy: {
                    url: 'newreports/getApplicationProcessingReport',
                      reader: {
                         type: 'json',
                         rootProperty: 'results',
                         totalProperty: 'totalResults'
                        }
                    }
            },
            isLoad: true
            },
        afterrender:function(){
            var view = this.getView();
            var groupingFeature = view.findFeature("grouping");

            }
        },

  plugins: [{
            ptype: 'filterfield'
        }],
    viewConfig: {
        deferEmptyText: false,
        preserveScrollOnReload: true,
        enableTextSelection: true,
        emptyText: 'No Details Available',
        getRowClass: function (record, rowIndex, rowParams, store) {
            var is_receipting_stage =  record.get('is_receipting_stage'),
                application_status_id =  record.get('application_status_id');
          // if (is_receipting_stage == 1) {
                if(application_status_id == 10) {
                    return 'invalid-row';
                } else if(application_status_id == 11) {
                    return 'valid-row';
                }
          // }
        }
    },
    margin: 3,
   
    bbar: [
        {
            xtype: 'pagingtoolbar',
            displayInfo: true,
            width: '60%',
            beforeLoad: function () {
                var store = this.getStore(),
                    grid = this.up('grid'),
                    tabpanel = grid.up('panel'),
                    panel = tabpanel.up('panel'),
                    section_id = panel.down('combo[name=section_id]').getValue(),
                    module_id = panel.down('combo[name=module_id]').getValue(),
                    sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
                    from_date = panel.down('datefield[name=from_date]').getValue(),
                    to_date = panel.down('datefield[name=to_date]').getValue();
                    
                    
                store.getProxy().extraParams = {
                    section_id: section_id,
                    module_id: module_id,
                    sub_module_id: sub_module_id,
                    from_date: from_date,
                    to_date: to_date
                   
                };
            }
        },
        '->','->',{
          xtype: 'checkbox',
          name:'enable_grouping',
          boxLabel:'Enable Grouping',
          listeners:{
                change:function(chk,value){
                        var grid = chk.up('grid');
                            grouping = grid.getView().findFeature('grouping');
                            if(value == 1){
                                grouping.enable();
                            }
                            else{
                                grouping.disable();
                            }
                }
          }
        }
    ],
  

    features: [{
            ftype: 'grouping',
            startCollapsed: true,
            groupHeaderTpl: 'Process: {[values.rows[0].data.process_name]}, Stage: {[values.rows[0].data.workflow_stage]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],
    plugins: [{
        ptype: 'filterfield'
    },
    {
        ptype: 'gridexporter'
    }],
    export_title: 'Intray',
    store: 'intraystr',
    
    columns: [
        {
            header: 'Processing Day(S)',
            dataIndex: 'date_received',
            width: 150,tbCls: 'wrap',
            renderer: function (value, metaData,record) {
                var date_received = new Date(record.get('date_received')),
                current_date=new Date(new Date());
                Ext.Date.format(current_date ,'Y-m-d H:i:s.u');

                var diff = Ext.Date.diff(date_received, current_date, 'd');

 
                if (diff<=10 ) {
                    metaData.tdStyle = 'color:white;background-color:Green ';
                    return diff+' Day(s)';
                }else if(diff>10 && diff<=30){
                  metaData.tdStyle = 'color:white;background-color:Yellow ';
                  return diff+' Day(s)';
                 
              }else{
                  metaData.tdStyle = 'color:white;background-color:red';
                  return diff +' Day(s)';
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
                  
                }
                return val;
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Tracking No',
            dataIndex: 'tracking_no',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Application No',
            dataIndex: 'reference_no',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Process',
            dataIndex: 'process_name',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap-text',
            hidden: true
        },
        {
            xtype: 'gridcolumn',
            text: 'Prev Stage',
            dataIndex: 'prev_stage',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap'
        },{
            xtype: 'gridcolumn',
            text: 'Current Stage',
            dataIndex: 'workflow_stage',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'From',
            dataIndex: 'from_user',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'To',
            dataIndex: 'to_user',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Applicant',
            dataIndex: 'applicant_name',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap',
            filter: {
                xtype: 'textfield'
            }
        },
        {
            xtype: 'gridcolumn',
            text: 'Remarks/Comment',
            dataIndex: 'remarks',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap'
        },
        {
            xtype: 'gridcolumn',
            text: 'Date Received',
            dataIndex: 'date_received',
            width: 150,tbCls: 'wrap',
            tdCls: 'wrap-text'
            
        }
    ]
});