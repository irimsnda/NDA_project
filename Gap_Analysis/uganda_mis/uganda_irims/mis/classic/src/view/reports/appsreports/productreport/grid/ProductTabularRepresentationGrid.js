Ext.define('Admin.view.reports.appsreports.productreport.grid.ProductTabularRepresentationGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'productreportctr',
    xtype: 'producttabularrepresentationgrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    export_title:'Product Summary',
    viewConfig: {
    deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'producttabularrepresentationgridstr',
                grouper: {
                    groupFn: function (item) {
                        
                            return item.get('SubModule') + item.get('section_name') + item.get('product_category_name');
                        
                    }
                },
                proxy: {
                    url: 'newreports/getProductSummaryReport',
                    extraParams: {
                        module_id: 1
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
                groupHeaderTpl: '{[values.rows[0].data.SubModule]}, Product Type: {[values.rows[0].data.section_name]}, Product Category: {[values.rows[0].data.product_category_name]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
                hideGroupedHeader: true,
                enableGroupingMenu: false
            }
        ],
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
                text: 'Product Category',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'product_category_name'
            },{
                text: 'Product Classification',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'product_class_name'
            },{
                text: 'Product Origin',
                sortable: false,
                flex: 1,
                tdCls:'wrap-text',
                dataIndex: 'product_origin'
            },{
                text: 'Brought Forward',
                flex: 1,
                dataIndex: 'brought_forward',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                }
            }, {
                text: 'Received Applications',
                flex: 1,
                dataIndex: 'received_applications',
                summaryType: 'sum',
                summaryRenderer: function(value){
                             return(value);
                  }
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
                        section_id = panel.down('combo[name=section_id]').getValue(), 
                        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),  
                        from_date = panel.down('datefield[name=from_date]').getValue(),
                        to_date = panel.down('textfield[name=to_date]').getValue(),
                        classification_category = panel.down('combo[name=classification_category]').getValue(),
                        prodclass_category = panel.down('combo[name=prodclass_category]').getValue(), 
                        product_origin_id = panel.down('combo[name=product_origin_id]').getValue(), 
                        module_id=panel.down('hiddenfield[name=module_id]').getValue();

                    // var grid=this.up('grid'),
                    //  panel=grid.up('panel'),
                    //  filter=panel.down('form'),
                     frm = filter.getForm();
                     if (frm.isValid()) {
                    store.getProxy().extraParams = {
                        module_id: module_id,
                        sub_module_id: sub_module_id,
                        section_id: section_id,
                        classification_category: classification_category,
                        prodclass_category: prodclass_category,
                        product_origin_id: product_origin_id,
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
