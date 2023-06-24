Ext.define('Admin.view.registers.views.disposalregister.grid.DisposalRegisterGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registerctr',
    xtype: 'disposalregistergrid',
    autoScroll: true,
    autoHeight: true,
    width: '100%',
    viewConfig: {
    deferEmptyText: false,
        emptyText: 'Nothing to display'
    },
    
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 25,
                storeId: 'disposalregistergridstr', remoteFilter:true,
                proxy: {
                    url: 'registers/getDisposalRegister',
                      reader: {
                         type: 'json',
                         rootProperty: 'results',
                         totalProperty: 'totalResults'
                        }
                    }
            },
            isLoad: true
                      }
        },
         plugins: [{
            ptype: 'filterfield'
        }],
    columns: [{
        text: 'Product Type',
        sortable: false,
        width: 150,
        dataIndex: 'section_name',
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference Number',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        name: 'certificate_no',
        text: 'Certificate Number',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'destruction_site',
        name: 'destruction_site',
        text: 'Destruction Site',
        forceSelection: true,
        queryMode: 'local',
        width: 250,
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
        width: 250,
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
        dataIndex: 'reason_for_disposal',
        name: 'reason_for_disposal',
        text: 'Reason For Disposal',
        width: 200,
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
        filter: {
                xtype: 'textfield',
            }
    }
   ,{
        xtype: 'gridcolumn',
        dataIndex: 'packaging_unit',
        name: 'packaging_unit',
        text: 'Packaging Unit',
        width: 250,
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
        dataIndex: 'market_value',
        name: 'market_value',
        text: 'Market Value',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'inspector_name',
        name: 'inspector_name',
        text: 'Inspector Name',
        width: 200, 
        filter: {
                xtype: 'textfield',
                }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'inpsector_title',
        name: 'inspector_title',
        text: 'Inspector Title',
        width: 200, 
        filter: {
                xtype: 'textfield',
                }
    },
     
     {
        xtype: 'gridcolumn',
        dataIndex: 'inpsector_organisation',
        name: 'inpsector_organisation',
        text: 'Inspector Organisation',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_name',
        name: 'trader_name',
        text: 'Trader',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_physical_address',
        name: 'trader_physical_address',
        text: 'Trader PhysicalAddress',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_email_address',
        name: 'trader_email_address',
        text: 'Trader Email',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'trader_country',
        name: 'trader_country',
        text: 'Trader Country',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'CertIssueDate',
        name: 'CertIssueDate',
         format: 'Y-m-d',
        text: 'Certificate Issue Date',
        width: 250, 
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
        width: 250, 
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },
    
    ],
         bbar: [


         {
                          xtype: 'pagingtoolbar',
                          width: '100%',
                          displayInfo: true,
                          displayMsg: 'Showing {0} - {1} out of {2}',
                          emptyMsg: 'No Records',


                          //filter
                            beforeLoad: function () {
                                      var store = this.getStore(),
                                      range = this.down('combo[name=Range]').getValue();
                                       var store=this.getStore();
                                       var grid=this.up('grid'),
                                        panel = grid.up('panel'),
                                        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
                                        section_id = panel.down('combo[name=section_id]').getValue(),    
                                        approved_from = panel.down('datefield[name=approved_from]').getValue(),
                                        approved_to = panel.down('datefield[name=approved_to]').getValue();
                                        module_id=panel.down('hiddenfield[name=module_id]').getValue();

                                  
                                  store.getProxy().extraParams = {
                                      limit:range,
                                      sub_module_id:sub_module_id,
                                      section_id:section_id,
                                      module_id: module_id,
                                      approved_from: approved_from,
                                      approved_to: approved_to
                                     
                                            };
                                           
                                    },



                              items:[{
                                   xtype: 'combobox',
                                   forceSelection: true,
                                   fieldLabel: 'Range',
                                   displayField: 'size',
                                   valueField: 'size',
                                   name: 'Range',
                                   queryMode: 'local',
                                   value: 25,
                                   listeners:{
                                      afterrender: {//getConfigParamFromTable
                                               fn: 'setConfigCombosStore',
                                              config: {
                                                  proxy: {
                                                      url: 'commonparam/getCommonParamFromTable',
                                                      extraParams: {
                                                          table_name: 'par_page_sizes'
                                                      }
                                                  }
                                              },
                                              isLoad: true
                                          },
                                      select: 'setPageSize'
                                     }
                              }]                  
                      }
                      ]
    
});
