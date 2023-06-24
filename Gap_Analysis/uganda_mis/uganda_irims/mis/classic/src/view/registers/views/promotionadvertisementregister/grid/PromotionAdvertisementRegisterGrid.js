Ext.define('Admin.view.registers.views.promotionadvertisementregister.grid.PromotionAdvertisementRegisterGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registerctr',
    xtype: 'promotionadvertisementregistergrid',
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
                storeId: 'promotionadvertisementregistergridstr', remoteFilter:true,
                proxy: {
                    url: 'registers/getPromotionAdvertisementRegister',
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
        text: 'Reference No',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        name: 'certificate_no',
        text: 'MA Number',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Trader',
        name: 'Trader',
        text: 'Trader',
        width: 200, 
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'TraderPhysicalA',
        name: 'TraderPhysicalA',
        text: 'Trader Physical Address',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderEmail',
        name: 'TraderEmail',
        text: 'Trader Email Address',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderCountry',
        name: 'TraderCountry',
        text: 'Trader Country',
        width: 210, 
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
  
    {
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
                                        advertisement_type_id = panel.down('combo[name=advertisement_type_id]').getValue(),  
                                        approved_from = panel.down('datefield[name=approved_from]').getValue(),
                                        approved_to = panel.down('datefield[name=approved_to]').getValue();
                                        module_id=panel.down('hiddenfield[name=module_id]').getValue();
                                    

                                  
                                  store.getProxy().extraParams = {
                                      limit:range,
                                      sub_module_id:sub_module_id,
                                      section_id:section_id,
                                      advertisement_type_id:advertisement_type_id,
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
