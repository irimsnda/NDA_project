Ext.define('Admin.view.registers.views.gmpregister.grid.GmpRegisterGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registerctr',
    xtype: 'gmpregistergrid',
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
                storeId: 'gmpregistergridstr', remoteFilter:true,
                proxy: {
                    url: 'registers/getGmpRegister',
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
    },{
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'manufacturer_name',
        name: 'manufacturer_name',
        text: 'Manufacturer Name',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'manufacturing_site',
        name: 'manufacturing_site',
        text: 'Manufacturing Site',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'country',
        name: 'country',
        text: 'Manufacturer country',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },
    
    {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        name: 'email_address',
        text: 'Manufacturer email',
        width: 200, 
        filter: {
                xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        name: 'postal_address',
        text: 'Manufacturer Postal Address',
        width: 200, 
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        name: 'physical_address',
        text: 'Manufacturer Physical Address',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        name: 'business_type',
        text: 'Business Type',
        width: 250, 
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'business_type_id',
                    listeners:
                     {
                         beforerender: {
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_business_types'
                                    } 
                                }
                            },
                            isLoad: true,
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetgmpapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'premise_reg_no',
        name: 'premise_reg_no',
        text: 'Premise Registration No',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Trader',
        name: 'Trader',
        text: 'Applicant',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPostalA',
        name: 'TraderPostalA',
        text: 'Applicant Postal Adress',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPhysicalA',
        name: 'TraderPhysicalA',
        text: 'Applicant PhysicalAddress',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderEmail',
        name: 'TraderEmail',
        text: 'Applicant Email',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderCountry',
        name: 'TraderCountry',
        text: 'Applicant Country',
        width:200, 
        filter: {
                xtype: 'textfield',
            }
    },

 {
        xtype: 'gridcolumn',
        dataIndex: 'approval_recommendation',
        name: 'approval_recommendation',
        text: 'Approval Recommendation',
        width: 250,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'approval_recommendation',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_gmpapproval_decisions'
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
    {
        xtype: 'gridcolumn',
        dataIndex: 'validity_status',
        name: 'validity_status',
        text: 'validity Status',
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
                                   
                     
                     change: function(cmb, newValue, oldValue, eopts) {
                        var grid = cmb.up('grid');
                            grid.getStore().reload();
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
                                        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
                                        section_id = panel.down('combo[name=section_id]').getValue(),  
                                        gmp_location=panel.down('combo[name=gmp_location]').getValue(); 
                                        approved_from = panel.down('datefield[name=approved_from]').getValue(),
                                        approved_to = panel.down('datefield[name=approved_to]').getValue();
                                        module_id=panel.down('hiddenfield[name=module_id]').getValue();
                                      

                                  
                                  store.getProxy().extraParams = {
                                      limit:range,
                                      sub_module_id:sub_module_id,
                                      section_id:section_id,
                                      module_id: module_id,
                                      gmp_location: gmp_location,
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
