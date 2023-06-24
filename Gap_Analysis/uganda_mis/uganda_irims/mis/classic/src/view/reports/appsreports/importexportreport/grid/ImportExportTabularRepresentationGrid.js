Ext.define('Admin.view.reports.appsreports.importexportreport.grid.ImportExportTabularRepresentationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productreportctr',
    xtype: 'importexporttabularrepresentationgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    export_title:'Import & Export Summary',
    viewConfig: {
    deferEmptyText: false,
        emptyText: 'Nothing to display'
    },

   
              listeners: {
                    beforerender: {
                        fn: 'setConfigGridsStore',
                        config: {
                            pageSize: 1000,
                            groupField: 'SubModule',
                            storeId: 'importtabularrepresentationgridstr',
                            proxy: {
                                url: 'newreports/getImportExportSummaryReport',
                                extraParams: {
                                        module_id: 4
                                    }
                            }
                        },
                        isLoad: false
                      }
                   },
            plugins: [{
                    ptype: 'gridexporter'
                }
                ],
            features: [{
                 startCollapsed: true,
                 ftype: 'groupingsummary'
            }],
    columns: [{
                text: 'Product Type',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'section_name',
                summaryRenderer: function(){
                        return '<b>Grand Total:</b>';
                    }
            },{
                text: 'Permit Type',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'permit_name',
                summaryRenderer: function(){
                        return '<b>Grand Total:</b>';
                    }
            },
            {
                text: 'Permit Category',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'permit_category',
                summaryRenderer: function(){
                        return '<b>Grand Total:</b>';
                    }
            },
            {
                text: 'Brought Forward',
                flex: 1,
                dataIndex: 'brought_forward',
                        summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },

            }, {
                text: 'Received Applications',
                flex: 1,
                dataIndex: 'received_applications',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },{
                text: 'Total',
                flex: 1,
                dataIndex: 'total',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            }, {
                text: 'Screened',
                flex: 1,
                dataIndex: 'screened_applications',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
             {
                text: 'Queried',
                flex: 1,
                dataIndex: 'requested_for_additional_information',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
              {
                text: 'Query Response',
                flex: 1,
                dataIndex: 'query_responses',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
            {
                text: 'Permits Reviewed',
                flex: 1,
                dataIndex: 'permit_reviewed',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
             {
                text: 'Permits Released',
                flex: 1,
                dataIndex: 'permit_release',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
            {
                text: 'Permits Rejected',
                flex: 1,
                dataIndex: 'permit_rejection',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
           
            {
                text: 'Carried Forward',
                flex: 1,
                dataIndex: 'carried_forward',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            }
        ],
          bbar: [ 
         {
                    xtype:'exportbtn',
                    ui: 'soft-green',
                    text: 'Export',
                    iconCls: 'x-fa fa-file'
           
          },{
                    xtype: 'pagingtoolbar',
                    width: '80%',
                    displayInfo: true,
                    hidden: false,
                    displayMsg: 'Showing {0} - {1} out of {2}',
                    emptyMsg: 'No Records',
                    beforeLoad: function() {
                        var store=this.getStore();
                        var grid=this.up('grid'),
                        tab = grid.up('tabpanel'),
                        panel = tab.up('panel'),
                        filter=panel.down('form'),
                                
                                   sub_module_id = panel.down('combo[name=sub_module_id]').getValue(), 
                                    section_id = panel.down('combo[name=section_id]').getValue(),  
                                   from_date = panel.down('datefield[name=from_date]').getValue(),
                                   to_date = panel.down('textfield[name=to_date]').getValue(),
                                   permit_type = panel.down('combo[name=permit_type]').getValue(),  
                                   module_id=panel.down('hiddenfield[name=module_id]').getValue();
                              
                              frm = filter.getForm();
                              if (frm.isValid()) {
                             store.getProxy().extraParams = {

                                module_id: module_id,
                                sub_module_id: sub_module_id,
                                section_id:section_id,
                                permit_type: permit_type,
                                from_date: from_date,
                                to_date: to_date
                        
                            }
                            } else {
                        toastr.error('Please select all Filters first ', 'Failure Response');
                         return false;
                     }
                            
                        },
                      
                    
                }]
    
});
