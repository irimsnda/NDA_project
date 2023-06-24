Ext.define('Admin.view.reports.appsreports.disposalreport.grid.DetailedDisposalViewGrid', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
    xtype: 'detaileddisposalviewgrid',
   layout: 'fit',
   store: 'spreadsheetdisposaltapplicationcolumnsstr',
   title: 'Disposal Application SpreadSheet',
   referenceHolder: true,
   reference:'disposalgridpanel',
  
    plugins: [{
            ptype: 'filterfield'
        }],
    viewConfig: {
            emptyText: 'No products information found under this creteria'
        },
    columns: [
     {
        text: 'Action',
        xtype: 'widgetcolumn',
        width: 90,
        widget: {
            width: 75,
            ui: 'gray',
            iconCls: 'x-fa fa-th-list',
            textAlign: 'left',
            xtype: 'splitbutton',
            menu: {
                xtype: 'menu',
                items: [{
                        text: 'Documents',
                        iconCls: 'x-fa fa-edit',
                        tooltip: 'View Documents',
                        handler: 'func_viewUploadedDocs'
                       }]
              }
            }
         },
        
    {
        xtype: 'gridcolumn',
        dataIndex: 'application_code',
        name: 'application_code',
        hidden: true
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'destruction_site',
        name: 'destruction_site',
        text: 'Destruction Site',
        width: 200,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'destruction_site',
                    listeners:
                     {
                         beforerender: {
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                       table_name:'par_disposaldestruction_sites'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'destruction_method',
        name: 'destruction_method',
        text: 'Destruction Method',
        width: 200,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'destruction_method',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                       table_name:'par_destruction_methods'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
      {
        xtype: 'gridcolumn',
        dataIndex: 'product_type',
        name: 'product_type',
        text: 'Product Type',
        width: 200,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'product_type',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                       table_name:'par_sections'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'reason_for_disposal',
        name: 'reason_for_disposal',
        text: 'Reason For Disposal',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'quantity',
        name: 'quantity',
        text: 'Quantity',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    }
   ,{
        xtype: 'gridcolumn',
        dataIndex: 'packaging_unit',
        name: 'packaging_unit',
        text: 'Packaging Unit',
        width: 200,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'packaging_unit',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                       table_name:'par_packaging_units'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'total_weight',
        name: 'total_weight',
        text: 'Total Weight',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'weight_unit',
        name: 'weight_unit',
        text: 'Weight Unit',
        width: 200,
        hidden: true, 
        filter: {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'weight_unit',
                listeners:
                 {
                     beforerender: {//getConfigParamFromTable
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                   table_name:'par_weights_units'
                                }
                            }
                        },
                        isLoad: true
                    },
                 change: function() {
                    Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                 }
             }
            
        }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'market_value',
        name: 'market_value',
        text: 'Market Value',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'currency',
        name: 'currency',
        text: 'Currency',
        width: 200, hidden: true,
        format: 'Y-m-d',
         filter: {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'currency',
                listeners:
                 {
                     beforerender: {//getConfigParamFromTable
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                   table_name:'par_currencies'
                                }
                            }
                        },
                        isLoad: true
                    },
                 change: function() {
                    Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                 }
             }
            
        }
    }
    ,{
        xtype: 'gridcolumn',
        dataIndex: 'premise_name',
        name: 'premise_name',
        text: 'Premise Name',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'premise_reg_no',
        name: 'premise_reg_no',
        text: 'Premise Registration No',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'premise_email',
        name: 'premise_email',
        text: 'Premise Email',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'premise_tell',
        name: 'premise_tell',
        text: 'Premise Tell',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'premise_physical_address',
        name: 'premise_physical_address',
        text: 'Premise Physical Address',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'premise_postal_address',
        name: 'premise_postal_address',
        text: 'Premise Postal Address',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inpsector_name',
        name: 'inpsector_name',
        text: 'Inpsector Name',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'inpsector_title',
        name: 'inpsector_title',
        text: 'Inpsector Title',
        width: 200, hidden: true,
        filter: {
                xtype: 'combobox',
                queryMode: 'local',
                displayField: 'name',
                valueField: 'id',
                name: 'inpsector_title',
                listeners:
                 {
                     beforerender: {//getConfigParamFromTable
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            proxy: {
                                url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                   table_name:'par_disposal_inspectors_titles'
                                }
                            }
                        },
                        isLoad: true
                    },
                 change: function() {
                    Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                 }
             }
            
        }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'inpsector_organisation',
        name: 'inpsector_organisation',
        text: 'Inpsector Organisation',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_name',
        name: 'trader_name',
        text: 'Trader',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_postal_address',
        name: 'trader_postal_address',
        text: 'Trader Postal Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_physical_address',
        name: 'trader_physical_address',
        text: 'Trader PhysicalAddress',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_telephone',
        name: 'trader_telephone',
        text: 'Trader Tell',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_mobile_no',
        name: 'trader_mobile_no',
        text: 'Trader Mobile',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_email_address',
        name: 'trader_email_address',
        text: 'Trader Email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_country',
        name: 'trader_country',
        text: 'Trader Country',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_region',
        name: 'trader_region',
        text: 'Trader Region',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'CertIssuePlace',
        name: 'CertIssuePlace',
        text: 'Place of Issue',
        width: 210, hidden: true,
         filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'zone_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_zones'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetdisposaltapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'CertIssueDate',
        name: 'CertIssueDate',
         format: 'Y-m-d',
        text: 'Certificate Issue Date',
        width: 210, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    }, {
        xtype: 'datecolumn',
        dataIndex: 'CertExpiryDate',
        name: 'CertExpiryDate',
         format: 'Y-m-d',
        text: 'Certificate Expiry Date',
        width: 210, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'tracking_no',
        name: 'tracking_no',
        text: 'Tracking No',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'ReceivedFrom',
        name: 'ReceivedFrom',
        format: 'Y-m-d',
        text: 'Received From',
        width: 210, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    }, {
        xtype: 'datecolumn',
        dataIndex: 'ReceivedTo',
        name: 'ReceivedTo',
         format: 'Y-m-d',
        text: 'Received To',
        width: 210, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'IssueFrom',
        name: 'IssueFrom',
        format: 'Y-m-d',
        text: 'Issue From',
        width: 210, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    }, {
        xtype: 'datecolumn',
        dataIndex: 'IssueTo',
        name: 'IssueTo',
         format: 'Y-m-d',
        text: 'Issue To',
        width: 210, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        name: 'certificate_no',
        text: 'Certificate No',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'registration_status',
        name: 'registration_status',
        text: 'Registration Status',
        width: 200, hidden: true,
       filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'registration_status',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_system_statuses'
                                    }
                                }
                            },
                           isLoad: true
                        },
                                   
                     
                     change: function(cmb, newValue, oldValue, eopts) {
                        var grid = cmb.up('grid');
                            grid.getStore().reload();
                     }
                 }                
            }
    },
      ],
     listeners:{
       select: 'loadadditionalinfo'
         }
});