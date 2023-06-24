Ext.define('Admin.view.registers.views.clinicaltrialregister.grid.ClinicalTrialRegisterGrid', {
    extend: 'Ext.grid.Panel',
    controller: 'registerctr',
    xtype: 'clinicaltrialregistergrid',
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
                storeId: 'clinicaltrialregistergridstr',
                remoteFilter:true,
                proxy: {
                    url: 'registers/getClinicalTrialRegister',
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
    columns: [   {
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
        dataIndex: 'study_title',
        name: 'study_title',
        text: 'Study Title',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'protocol_no',
        name: 'protocol_no',
        text: 'Protocol No',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },
      {
        xtype: 'gridcolumn',
        dataIndex: 'version_no',
        name: 'version_no',
        text: 'Version No Name',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'datecolumn',
        dataIndex: 'study_start_date',
        name: 'study_start_date',
        text: 'Study Start Date',
        width: 250, 
        format: 'Y-m-d',
        filter: {
                        xtype: 'datefield',
                        format: 'Y-m-d'
                    }
    },{
        xtype: 'datecolumn',
        dataIndex: 'study_end_date',
        name: 'study_end_date',
        text: 'Study End Date',
        width: 250, 
        format: 'Y-m-d',
        filter: {
                        xtype: 'datefield',
                        format: 'Y-m-d'
                    }
    },
     {
        xtype: 'datecolumn',
        dataIndex: 'date_of_protocol',
        name: 'date_of_protocol',
        text: 'Protocol Date',
        width: 250, 
        format: 'Y-m-d',
        filter: {
                        xtype: 'datefield',
                        format: 'Y-m-d'
                    }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'study_duration',
        name: 'study_duration',
       text: 'Duration of Study',
       width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'investigator',
        name: 'investigator',
        text: 'Principal Investigator',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Iphysical_address',
        name: 'Iphysical_address',
        text: 'Investigator PhysicalAddress',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Iemail_address',
        name: 'Iemail_address',
        text: 'Investigator Email',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Icountry',
        name: 'Icountry',
        text: 'Investigator Country',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant',
        name: 'applicant',
        text: 'Applicant',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_physical_address',
        name: 'applicant_physical_address',
        text: 'Applicant PhysicalAddress',
        width: 200, 
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_email_address',
        name: 'applicant_email_address',
        text: 'Applicant Email',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'applicant_country',
        name: 'applicant_country',
        text: 'Applicant Country',
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
                                        approved_from = panel.down('datefield[name=approved_from]').getValue(),
                                        approved_to = panel.down('datefield[name=approved_to]').getValue();
                                        module_id=panel.down('hiddenfield[name=module_id]').getValue();

                                  
                                  store.getProxy().extraParams = {
                                      limit:range,
                                      sub_module_id:sub_module_id,
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
