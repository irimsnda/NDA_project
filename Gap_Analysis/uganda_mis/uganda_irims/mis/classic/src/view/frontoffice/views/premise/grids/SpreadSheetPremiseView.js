 Ext.define('Admin.view.frontoffice.premise.grids.SpreadSheetPremiseView', {
    extend: 'Ext.grid.Panel',  
    scroll: true,
    width: '100%',
    xtype: 'spreadsheetpremiseview',
    layout: 'fit',
    store: 'spreadsheetpremiseapplicationcolumnsstr',
    title: 'Premise Application SpreadSheet',
    referenceHolder: true,
    reference:'premisegridpanel',
   
    plugins: [{
            ptype: 'filterfield'
        }],
        listeners: {
         //   beforerender: 'funcReloadspreadSheetStrs'
        },
         viewConfig: {
            emptyText: 'No products information found under this creteria'
        },
    columns: [ {
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
        dataIndex: 'premise_id',
        name: 'id',
        hidden: true
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'name',
        name: 'name',
        text: 'Name',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        name: 'postal_address',
        text: 'Postal Address',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },
      {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        name: 'physical_address',
        text: 'Physical Address',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'PremiseCategory',
        name: 'PremiseCategory',
        text: 'Category',
        width: 200, hidden: true,
         filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'Category_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_premise_types'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetpremiseapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
    
    {
        xtype: 'gridcolumn',
        dataIndex: 'email',
        name: 'email',
        text: 'Email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },  {
        xtype: 'gridcolumn',
        dataIndex: 'telephone',
        name: 'telephone',
        text: 'Telephone No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'mobile_no',
        name: 'mobile_no',
        text: 'Mobile No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'Precountry',
        name: 'Precountry',
       text: 'Premise Country',
       width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'PreRegion',
        name: 'PreRegion',
        text: 'Premise Region',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'PreDistrict',
        name: 'PreDistrict',
        text: 'Premise District',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'BsnType',
        name: 'BsnType',
        text: 'Business Type',
        width: 200, hidden: true,
         filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'BsnType_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
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
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetpremiseapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'BsnCategory',
        name: 'BsnCategory',
        text: 'Business Category',
        width: 200, hidden: true,
         filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'BsnCategory_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_business_categories'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetpremiseapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'BsnScale',
        name: 'BsnScale',
        text: 'Business Scale',
        width: 200, hidden: true,
         filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'BsnScale_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_business_scales'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetpremiseapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'BsnTypeDetails',
        name: 'BsnTypeDetails',
        text: 'Business Type Details',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ContactPerson',
        name: 'ContactPerson',
        text: 'Contact Person',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ContactTell',
        name: 'ContactTell',
        text: 'Contact Telephone',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ContactEmail',
        name: 'ContactEmail',
        text: 'Contact Mobile No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'contact_person_startdate',
        name: 'contact_person_startdate',
        text: 'contact Startdate',
        submitFormat: 'Y-m-d',
        width: 200, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d',
                altFormats: 'Y-m-d',
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'contact_person_enddate',
        name: 'contact_person_enddate',
        text: 'Contact EndDate',
        format: 'Y-m-d',
        width: 200, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d',
                altFormats: 'Y-m-d',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Trader',
        name: 'Trader',
        text: 'Trader',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPostalA',
        name: 'TraderPostalA',
        text: 'Trader Postal Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPhysicalA',
        name: 'TraderPhysicalA',
        text: 'Trader Physical Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderTell',
        name: 'TraderTell',
        text: 'Trader Telephone',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderMobile',
        name: 'TraderMobile',
        text: 'Trader Mobile No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderEmail',
        name: 'TraderEmail',
        text: 'Trader Email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderCountry',
        name: 'TraderCountry',
        text: 'Trader Country',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderRegion',
        name: 'TraderRegion',
        text: 'Trader Region',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'gps_coordinate',
        name: 'gps_coordinate',
        text: 'Premise Geo Coordinates',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'issueplace',
        name: 'issueplace',
        text: 'Place of Issue',
        width: 200, hidden: true,
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
                        Ext.data.StoreManager.lookup('spreadsheetpremiseapplicationcolumnsstr').reload();
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
        width: 200, 
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
                        Ext.data.StoreManager.lookup('spreadsheetpremiseapplicationcolumnsstr').reload();
                     }
                 }                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'validity_status',
        name: 'validity_status',
        text: 'validity Status',
        width: 200,
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
     },{
        xtype: 'gridcolumn',
        dataIndex: 'application_status',
        name: 'application_status',
        text: 'Application Status',
        width: 200,
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
     }
    ],bbar: [{
        xtype: 'pagingtoolbar',
        store: 'spreadsheetpremiseapplicationcolumnsstr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
         beforeLoad: function () {
                    var store = this.getStore(),
                     range = this.down('combo[name=Range]').getValue();
                     var grid=this.up('grid'),
                      BsnCategory_id=grid.down('combo[name=BsnCategory_id]').getValue(),
                      BsnType_id=grid.down('combo[name=BsnType_id]').getValue(),
                      Category_id=grid.down('combo[name=Category_id]').getValue(),
                      BsnScale_id=grid.down('combo[name=BsnScale_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      validity_status=grid.down('combo[name=validity_status]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue();

                     
               //acquire original filters
               var filter = {'t1.section_id':sectionid,'t1.sub_module_id':sub_module};
              var   filters = JSON.stringify(filter);

              //pass to store
                store.getProxy().extraParams = {
                    pageSize:range,
                    BsnCategory: BsnCategory_id,
                    BsnType: BsnType_id,
                    Category: Category_id,
                    BsnScale: BsnScale_id,
                    issueplace:zone_id,
                    registration_status:registration_status,
                    validity_status: validity_status,
                    filters: filters
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
    }],
     listeners:{
       select: 'loadadditionalinfo'
         }
});