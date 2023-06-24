Ext.define('Admin.view.reports.appsreports.premisesreport.grid.PremisesTabularRepresentationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productreportctr',
    xtype: 'premisestabularrepresentationgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    export_title:'Premise Summary',
    viewConfig: {
    deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
   
              listeners: {
                    beforerender: {
                        fn: 'setConfigGridsStore',
                        config: {
                            pageSize: 1000,
                            grouper: {
                                groupFn: function (item) {
                                    
                                        return item.get('SubModule') + item.get('section_name');
                                    
                                }
                            },
                            //storeId: 'producttabularrepresentationgridstr',
                            proxy: {
                                url: 'newreports/getPremiseSummaryReport',
                                extraParams: {
                                        module_id: 2
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
                features: [
                    {
                        ftype: 'grouping',
                        startCollapsed: false,
                        groupHeaderTpl: '{[values.rows[0].data.SubModule]}, Type: {[values.rows[0].data.section_name]}, [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
                        hideGroupedHeader: true,
                        enableGroupingMenu: false
                    }
                ],
    columns: [{
                text: 'Premises Type',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'section_name',
                summaryRenderer: function(){
                        return '<b>Grand Total:</b>';
                    }
            },{
                text: 'Business Type Details',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'business_name',
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
            },{
                text: 'Inspected',
                flex: 1,
                dataIndex: 'inspected_applications',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
             {
                text: 'Request for Additional Information',
                flex: 1,
                dataIndex: 'requested_for_additional_information',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
              {
                text: 'Response of Request',
                flex: 1,
                dataIndex: 'query_responses',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
            {
                text: 'Approved',
                flex: 1,
                dataIndex: 'approved_applications',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  },
            },
            {
                text: 'Rejected',
                flex: 1,
                dataIndex: 'rejected_applications',
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
                                   from_date = panel.down('datefield[name=from_date]').getValue(),
                                    section_id = panel.down('combo[name=section_id]').getValue(), 
                                   to_date = panel.down('textfield[name=to_date]').getValue(),
                                   business_type_details = panel.down('combo[name=business_type_details]').getValue(),  
                                   module_id=panel.down('hiddenfield[name=module_id]').getValue();
                              
                              frm = filter.getForm();
                              if (frm.isValid()) {
                             store.getProxy().extraParams = {

                                module_id: module_id,
                                section_id:section_id,
                                sub_module_id: sub_module_id,
                                business_type_details: business_type_details,
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
