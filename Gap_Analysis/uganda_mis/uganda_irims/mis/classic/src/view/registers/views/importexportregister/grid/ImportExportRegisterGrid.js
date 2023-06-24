Ext.define('Admin.view.registers.views.importexportregister.grid.ImportExportRegisterGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registerctr',
    xtype: 'importexportregistergrid',
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
                storeId: 'importexportregistergridstr', remoteFilter:true,
                proxy: {
                    url: 'registers/getImportExportRegister',
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
    columns: [ {
        text: 'Product Type',
        sortable: false,
        width: 150,
        dataIndex: 'section_name',
        },{
        xtype: 'gridcolumn',
        dataIndex: 'permit_type',
        name: 'permit_type',
        text: 'Permit Type ',
        width: 250,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'permit_type',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_importexport_permittypes',
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetieapplicationcolumnsstr').reload();
                     }
                 }
                
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
    },
       {
        xtype: 'gridcolumn',
        dataIndex: 'certificate_no',
        name: 'certificate_no',
        text: 'Permit No',
        width: 150,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'permitreason',
        name: 'permitreason',
        text: 'Permit Reason',
        width: 250,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'permit_reason_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_permit_reasons',
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetieapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'consignee',
        name: 'consignee',
        text: 'Consignee',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'Cemail_address',
        name: 'Cemail_address',
        text: 'Consignee Email Address',
        width: 210,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Ccountry',
        name: 'Ccountry',
        text: 'Consignee Country',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'consigneeoption',
        name: 'consigneeoption',
       text: 'Consignee Options',
       width: 250, 
       filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'consignee_options_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_consignee_options',
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetieapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'senderreceiver',
        name: 'senderreceiver',
        text: 'Sender/Receiver',
        width: 200, 
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'SRphysical_address',
        name: 'SRphysical_address',
        text: 'Sender/Receiver Physical Address',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'SRemail_address',
        name: 'SRemail_address',
        text: 'Sender/Receiver Email Address',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'SRcountry',
        name: 'SRcountry',
        text: 'Sender/Receiver Country',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },
        {
            xtype: 'gridcolumn',
            dataIndex: 'premisename',
            name: 'premisename',
            text: 'Premises Name',
            width: 200,
            hidden: true,
            filter: {
                xtype: 'textfield',
            }
        },  {
            xtype: 'gridcolumn',
            dataIndex: 'premisePhysicalA',
            name: 'premisePhysicalA',
            text: 'Premises Physical Address',
            width: 210, 
            filter: {
                xtype: 'textfield',
            }
        },  {
        xtype: 'gridcolumn',
        dataIndex: 'Trader',
        name: 'Trader',
        text: 'Applicant',
        width: 200, 
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'TraderPhysicalA',
        name: 'TraderPhysicalA',
        text: 'Applicant Physical Address',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderEmail',
        name: 'TraderEmail',
        text: 'Applicant Email Address',
        width: 210, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderCountry',
        name: 'TraderCountry',
        text: 'Applicant Country',
        width: 210,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'port',
        name: 'port',
        text: 'Port of Entry/Exit',
        width: 250,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'port_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                extraParams: {
                                        table_name: 'par_ports_information',
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetieapplicationcolumnsstr').reload();
                     }
                 }
                
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
                                   
                     
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetieapplicationcolumnsstr').reload();
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
                                        filter=panel.down('form'), 
                                        permit_type = panel.down('combo[name=permit_type]').getValue(), 
                                        sub_module_id = panel.down('combo[name=sub_module_id]').getValue(),
                                        section_id = panel.down('combo[name=section_id]').getValue(),    
                                        released_from = panel.down('datefield[name=released_from]').getValue(),
                                        released_to = panel.down('datefield[name=released_to]').getValue();

                                        module_id=panel.down('hiddenfield[name=module_id]').getValue();

                                
                                  store.getProxy().extraParams = {
                                      limit:range,
                                      sub_module_id:sub_module_id,
                                      section_id:section_id,
                                      module_id: module_id,
                                      permit_type: permit_type,
                                      released_from: released_from,
                                      released_to: released_to
                                     
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
