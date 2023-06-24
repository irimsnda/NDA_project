Ext.define('Admin.view.registers.views.productregister.grid.ProductRegisterGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registerctr',
    xtype: 'productregistergrid',
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
                //groupField: 'SubModule',
                storeId: 'productregistergridstr', remoteFilter:true,
                proxy: {
                    url: 'registers/getProductRegister',
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
     features: [
        {
            ftype: 'grouping',
            startCollapsed: false,
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }
    ],
    columns: [{
        text: 'Product Type',
        sortable: false,
        width: 150,
        dataIndex: 'section_name',
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'reference_no',
        name: 'reference_no',
        text: 'Reference No',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        name: 'certificate_no',
        text: 'MA No',
        width: 150,
        filter: {
            xtype: 'textfield',
        }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'brand_name',
        name: 'brand_name',
        text: 'Brand Name',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'commonName',
        name: 'commonName',
        text: 'CommonName',
        width: 200,
         filter: {
                xtype: 'textfield',
            }
    },
      {
        xtype: 'gridcolumn',
        dataIndex: 'Classification',
        name: 'Classification',
        text: 'Classification',
        width:200,
        growToLongestValue : true,
        filter: {
           xtype: 'textfield',
         }
    },
        {
        xtype: 'gridcolumn',
        dataIndex: 'product_strength',
        name: 'product_strength',
        text: 'Product Strength',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'active_api',
        name: 'active_api',
        text: 'Active API',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ProductForm',
        name: 'ProductForm',
        text: 'Dosage Form',
        width: 150,
        filter: {
           xtype: 'textfield',
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'Applicant',
        name: 'Applicant',
        text: 'MA Holder',
        width: 150, 
         filter: {
                    xtype: 'textfield'                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantPhysicalA',
        name: 'ApplicantPhysicalA',
        text: 'MAH Physical Address',
        width: 210,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantEmail',
        name: 'ApplicantEmail',
        text: 'MA Email',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantCountry',
        name: 'ApplicantCountry',
        text: 'MAH Country',
        width:200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgent',
        name: 'LocalAgent',
        text: 'Local Agent',
        width: 200, 
        filter: {
                    xtype: 'textfield'
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentPhysicalA',
        name: 'LocalAgentPhysicalA',
        text: 'Local Agent Physical Address',
        width: 210,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentEmail',
        name: 'LocalAgentEmail',
        text: 'Local Agent Email',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'AgentCountry',
        name: 'AgentCountry',
        text: 'Local Agent Country',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Manufacturer',
        name: 'Manufacturer',
        text: 'Manufacturer',
        width: 150, 
         filter: {
                    xtype: 'textfield'                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerPhysicalA',
        name: 'ManufacturerPhysicalA',
        text: 'Manufacturer Physical Address',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerEmail',
        name: 'ManufacturerEmail',
        text: 'Manufacturer Email',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerCountry',
        name: 'ManufacturerCountry',
        text: 'Manufacturer Country',
        width:200,
        filter: {
                xtype: 'textfield',
            },
        },{
        xtype: 'datecolumn',
        dataIndex: 'IssueFrom',
        name: 'IssueFrom',
        format: 'Y-m-d',
        text: 'Issue From',
        width: 250,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'registration_status',
        name: 'registration_status',
        text: 'Registration Status',
        width: 250,
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
                                        table_name: 'par_registration_statuses'
                                    }
                                }
                            },
                           isLoad: true
                        },
                                   
                     
                     change: function(combo, newval, oldVal, eopts) {
                        var store = combo.up('grid').getStore();
                        store.reload();
                     }
                 }                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'validity_status',
        name: 'validity_status',
        text: 'Validity Status',
        width: 250,
       filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'validity_status',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_validity_statuses'
                                    }
                                }
                            },
                           isLoad: true
                        },
                                   
                     
                     change: function(combo, newval, oldVal, eopts) {
                        var store = combo.up('grid').getStore();
                        store.reload();
                     }
                 }                
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
                                        filter=panel.down('form'), 
                                        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
                                        prodclass_category = panel.down('combo[name=prodclass_category]').getValue(),
                                        section_id = panel.down('combo[name=section_id]').getValue(),
                                        classification_category = panel.down('combo[name=classification_category]').getValue(),
                                        approved_from = panel.down('datefield[name=approved_from]').getValue(),
                                        approved_to = panel.down('datefield[name=approved_to]').getValue();

                                        module_id=panel.down('hiddenfield[name=module_id]').getValue();

                                  store.getProxy().extraParams = {
                                        limit:range,
                                        sub_module_id:sub_module_id,
                                        module_id: module_id,
                                        section_id: section_id,
                                        classification_category: classification_category,
                                        approved_from: approved_from,
                                        approved_to: approved_to,
                                        prodclass_category: prodclass_category
        
                                     
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
