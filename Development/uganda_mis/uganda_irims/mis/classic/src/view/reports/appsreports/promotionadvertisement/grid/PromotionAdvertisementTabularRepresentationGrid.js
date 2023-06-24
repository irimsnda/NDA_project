Ext.define('Admin.view.reports.appsreports.promotionadvertisementreport.grid.PromotionAdvertisementTabularRepresentationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productreportctr',
    xtype: 'promotionadvertisementtabularrepresentationgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    export_title:'Promotion & Advertisement Summary',
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
                storeId: 'promotionadvertisementttabularrepresentationgridstr',
                proxy: {
                    url: 'newreports/getPromotionAdvertisementSummaryReport',
                    extraParams: {
                        module_id: 14
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
       columns: [
            {
                text: 'Product Type',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'section_name',
                summaryRenderer: function(){
                        return '<b>Grand Total:</b>';
                    }
            },{
                text: 'Advertisement Type',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'advertisement_type',
                summaryRenderer: function(){
                        return '<b>Grand Total:</b>';
                    }
            },{
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
                text: 'Evaluated',
                flex: 1,
                dataIndex: 'evaluated_applications',
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
           
          },
           {
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
                        advertisement_type_id = panel.down('combo[name=advertisement_type_id]').getValue(),  
                        from_date = panel.down('datefield[name=from_date]').getValue(),
                        to_date = panel.down('textfield[name=to_date]').getValue(),
                        module_id=panel.down('hiddenfield[name=module_id]').getValue();

                    // var grid=this.up('grid'),
                    //  panel=grid.up('panel'),
                    //  filter=panel.down('form'),
                     frm = filter.getForm();
                     if (frm.isValid()) {
                    store.getProxy().extraParams = {
                        module_id: module_id,
                        sub_module_id: sub_module_id,
                        section_id:section_id,
                        advertisement_type_id: advertisement_type_id,
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
