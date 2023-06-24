Ext.define('Admin.view.revenuemanagement.views.grids.RetentionChargeReportGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'revenuemanagementvctr',
    xtype: 'retentionchargereportGrid',
    cls: 'dashboard-todo-list',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'Nothing to display',
    },
    tbar: [{
            fieldLabel: 'Retention Year From',
            xtype:'combo',
            store: 'year_store',
            labelAlign: 'top',
            
            width: 150, valueField:'years',
            displayField:'years',
            name: 'retention_yearfrom'
        },{
            fieldLabel: 'Retention Year To',
            xtype:'combo',
            store: 'year_store',
            labelAlign: 'top',
            valueField:'years',
            displayField:'years',
            width: 150,
            name: 'retention_yearto'
        },{
            fieldLabel: 'Section',
            xtype:'combo',
            labelAlign: 'top',
            width: 150, 
            valueField:'id',
            displayField:'name',
            name: 'section_id',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_sections'
                        }
                       }
                    },
                    isLoad: true
                },
                beforequery: function() {
                    var store=this.getStore();
                    
                    var all={name: 'All',id:0};
                      store.insert(0, all);
                    },
                afterrender: function(combo) {
                            combo.select(combo.getStore().getAt(0));    
                        }
    
            }
        },{
            fieldLabel: 'Retention Status',
            xtype:'combo',
            valueField:'id',
            displayField:'name',
            labelAlign: 'top',
            width: 150,
            name: 'retention_status_id',
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setOrgConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_retention_statuses'
                        }
                       }
                    },
                    isLoad: true
                },beforequery: function() {
                    var store=this.getStore();
                    
                    var all={name: 'All',id:0};
                      store.insert(0, all);
                    },
                afterrender: function(combo) {
                            combo.select(combo.getStore().getAt(0));    
                }
    
            }
        },{
            text: 'Filter',
            iconCls:'x-fa fa-search',
            margin: 5,ui:'soft-green',
            handler: 'funcFIlterRetentionInvoicesDetails'
        },{
            text: 'Clear',
            iconCls:'x-fa fa-cancel',
            margin: 5,
            ui:'soft-red',
            handler: 'funcClearPayentFIlterBillsDetails'
        }],
    plugins: [
        {
            ptype: 'gridexporter'
        },
        {
            ptype: 'filterfield'
        }
    ],
    features: [{
        ftype: 'groupingsummary',
        groupHeaderTpl: 'Retention Year: {[values.rows[0].data.retention_year]} [{rows.length} {[values.rows.length > 1 ? "Items" : "Item"]}]',
        startCollapsed: true,//hideGroupedHeader: true,
        enableGroupingMenu: true
    }],
    export_title: 'Retention Report',
    bbar: [{
        xtype: 'pagingtoolbar',
        width: '80%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} of {2} total records',
        emptyMsg: 'No Records',
        beforeLoad:function(){
              var grid = this.up('grid'),
                retention_yearfrom = grid.down('combo[name=retention_yearfrom]').getValue(),
                retention_yearto = grid.down('combo[name=retention_yearto]').getValue(),
                section_id = grid.down('combo[name=section_id]').getValue(),
                retention_status_id  = grid.down('combo[name=retention_status_id]').getValue(),
                store = grid.getStore(); 
              store.removeAll();
              store.getProxy().extraParams = {
                    'retention_yearfrom': retention_yearfrom,
                    'retention_yearto': retention_yearto,
                    'section_id': section_id,
                    'retention_status_id': retention_status_id
              }
        }

    },{
        xtype: 'button',
        text: 'Summary Report',
        handler: 'print_retention_report',
        ui: 'soft-green'
    }],
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 200,
                storeId: 'retentionchargereportStr',
                groupField: 'retention_year',
                remoteFilter: true,
                proxy: {
                    url: 'retentionmanagement/getRetentionReport',
                    reader: {
                        type: 'json',
                        rootProperty: 'results',
                        totalProperty: 'totals'
                    }

            },
            isLoad: true
        }
    },
},
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        text: 'Brand Name',
        filter: {
            xtype: 'textfield'
        },
        width: 150,
        tbCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'common_name',
        text: 'Common Name',
        filter: {
            xtype: 'textfield'
        },
        width: 150,
        tbCls: 'wrap'
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        text: 'Reference No',
        filter: {
            xtype: 'textfield'
        },
        width: 150,
        tbCls: 'wrap'
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        text: 'Certificate No',
        filter: {
            xtype: 'textfield'
        },
        width: 150,
        tbCls: 'wrap'
      
    },{
        xtype: 'gridcolumn',
        dataIndex: 'identification_no',
        text: 'Trader Number',
        filter: {
            xtype: 'numberfield'
        },
        width: 150,
        tbCls: 'wrap'
 }, {
        xtype: 'gridcolumn',
        dataIndex: 'trader_name',
        text: 'Trader Name',
        filter: {
            xtype: 'textfield'
        },
        width: 150,
        tbCls: 'wrap'
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        text: 'Trader Tell',
        tbCls: 'wrap',
        width: 150,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'email',
        text: 'Trader Email',
        tbCls: 'wrap',
        width: 150,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        text: 'Trader Postal Address',
        tbCls: 'wrap',
        width: 150,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        text: 'Trader Physical Address',
        tbCls: 'wrap',
        width: 150,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'retention_year',
        text: 'Retention Year',
        tbCls: 'wrap',
        width: 150,
        
    },{
        xtype: 'gridcolumn',
        dataIndex: 'nextretention_year',
        text: 'Next Retention Year',
        tbCls: 'wrap',
        width: 150,
        
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        text: 'Invoice No',
        tbCls: 'wrap',
        width: 150,
        filter: {
            xtype: 'textfield'
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'PayCntrNum',
        text: 'PayCntrNum',
        tbCls: 'wrap',
        width: 150,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'date_of_invoicing',
        text: 'Date Of Invoicing',
        tbCls: 'wrap',
        width: 150,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amount',
        text: 'Invoice Amount',
        tbCls: 'wrap',
        width: 150,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        text: 'Currency',
        tbCls: 'wrap',
        width: 150,
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amounttshs',
        text: 'Invoice Amount(Converted)',
        tbCls: 'wrap',
        width: 150,
        summaryRenderer: function(value){
             return "Total Received";
          },
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'paid_amounttshs',
        text: 'Paid Amount(Converted)',
        tbCls: 'wrap',
        width: 150,
        summaryType: 'sum',
        summaryRenderer: function(value){
             return(value);
          },
    },{
        xtype: 'gridcolumn',
        dataIndex: 'retention_status',
        text: 'Retention Status',
        width: 150,
        tbCls: 'wrap',
        renderer: function (value, metaData,record) {
            var retention_status_id = record.get('retention_status_id')
            if (retention_status_id ==2) {
                metaData.tdStyle = 'color:white;background-color:green';
                return value;
            }
            metaData.tdStyle = 'color:white;background-color:red';
            return value;
        }
    }]
});
