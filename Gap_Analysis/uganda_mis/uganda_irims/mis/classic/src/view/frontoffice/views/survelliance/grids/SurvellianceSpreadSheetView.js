 Ext.define('Admin.view.frontoffice.survelliance.grids.SurvellianceSpreadSheetView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
    xtype: 'survelliancespreadsheetview',
    layout: 'fit',
    title: 'Survelliance Application SpreadSheet',
    referenceHolder: true,
   reference:'survelliancegridpanel',
   plugins: [{
            ptype: 'filterfield'
        }],
    viewConfig: {
            emptyText: 'No products information found under this creteria'
        },
    listeners: {
        beforerender: {
            fn: 'setConfigGridsStore',
            config: {
                pageSize: 1000,
                storeId: 'survelliancespreadsheetStr',
                proxy: {
                    url: 'openoffice/getSurvellianceSpreadsheetApplications',
                }
            },
            isLoad: true
        }
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
        dataIndex: 'program_implementation_id',
        name: 'program_implementation_id',
        hidden: true
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'annual_plan_implementation',
        name: 'annual_plan_implementation',
        text: 'Annual Plan implementation',
        width: 200,
        filter: {
             xtype: 'textfield' 
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'program_name',
        name: 'program_name',
        text: 'Program Name',
        width: 200,
        filter: {
             xtype: 'textfield' 
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'program_description',
        name: 'program_description',
        text: 'Program Description',
        width: 200,
        filter: {
             xtype: 'textfield' 
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'implementation_start_date',
        name: 'implementation_start_date',
        text: 'Implementation Start Date',hidden: true,
        width: 200,
        filter: {
             xtype: 'datefield' 
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'implementation_end_date',
        name: 'implementation_end_date',
        text: 'Implementation End Date',hidden: true,
        width: 200,
        filter: {
             xtype: 'datefield' 
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sampling_site_category',
        name: 'sampling_site_category',
        text: 'Sampling Site Category',hidden: true,
        width: 200,
        filter: {
            xtype: 'textfield', 
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'region_name',
        name: 'region_name',
        text: 'Region',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'region_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_regions'
                                    } 
                                }
                            },
                            isLoad: true,
                        },
                     change: function(cmb, newValue, oldValue, eopts) {
                         var grid = cmb.up('grid'),
                             districtStr = grid.down('combo[name=district_id]').getStore(),
                             filters = JSON.stringify({'region_id':newValue});
                         districtStr.removeAll();
                         districtStr.load({params:{filters:filters}});
                        grid.getStore().reload();
                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'district',
        name: 'district',
        text: 'District',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'district_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_districts'
                                    } 
                                }
                            },
                            isLoad: true,
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
        dataIndex: 'site_name',
        name: 'site_name',
        text: 'Site Name',
        width: 200,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'site_country',
        name: 'site_country',
        text: 'Site Country',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'site_country_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_countries'
                                    } 
                                }
                            },
                            isLoad: true,
                        },
                     change: function(cmb, newValue, oldValue, eopts) {
                         var grid = cmb.up('grid'),
                             regionStr = grid.down('combo[name=site_region_id]').getStore(),
                             filters = JSON.stringify({'country_id':newValue});
                         regionStr.removeAll();
                         regionStr.load({params:{filters:filters}});

                        grid.getStore().reload();

                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'site_region_name',
        name: 'site_region_name',
        text: 'Site Region',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'site_region_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_regions'
                                    } 
                                }
                            },
                            isLoad: true,
                        },
                     change: function(cmb, newValue, oldValue, eopts) {
                         var grid = cmb.up('grid'),
                             districtStr = grid.down('combo[name=site_district_id]').getStore(),
                             filters = JSON.stringify({'region_id':newValue});
                         districtStr.removeAll();
                         districtStr.load({params:{filters:filters}});

                        grid.getStore().reload();

                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'site_district',
        name: 'site_district',
        text: 'Site District',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'site_district_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_districts'
                                    } 
                                }
                            },
                            isLoad: true,
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
        dataIndex: 'email_address',
        name: 'email_address',
        text: 'Site Email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        name: 'postal_address',
        text: 'Site Postal Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        name: 'physical_address',
        text: 'Site Physical Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        name: 'telephone_no',
        text: 'Site Telephone No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'fax',
        name: 'fax',
        text: 'Site fax',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'website',
        name: 'website',
        text: 'Site website',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'street',
        name: 'street',
        text: 'Site Street',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_scale',
        name: 'business_scale',
        text: 'Business Scale',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'business_scale_id',
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
                            isLoad: true,
                        },
                      change: function(cmb, newValue, oldValue, eopts) {
                            var grid = cmb.up('grid');
                            grid.getStore().reload();
                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'gps_coordinate',
        name: 'gps_coordinate',
        text: 'Gps Coordinate',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
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
        text: 'Trader Postal Adress',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPhysicalA',
        name: 'TraderPhysicalA',
        text: 'Trader PhysicalAddress',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderTell',
        name: 'TraderTell',
        text: 'Trader Tell',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderMobile',
        name: 'TraderMobile',
        text: 'Trader Mobile No.',
        width:200, hidden: true,
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
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderRegion',
        name: 'TraderRegion',
        text: 'Trader Region',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'issueplace',
        name: 'issueplace',
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
                          isLoad: true,
                        },
                    change: function(cmb, newValue, oldValue, eopts) {
                            var grid = cmb.up('grid');
                            grid.getStore().reload();
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
        dataIndex: 'certiface_no',
        name: 'certiface_no',
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
                                        table_name: 'par_approval_decisions'
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
    ],bbar: [{
        xtype: 'pagingtoolbar',
        width: '100%',
        //store: 'survelliancespreadsheetStr',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function () {
                    var store = this.getStore(),
                     range = this.down('combo[name=Range]').getValue();
                     var grid=this.up('grid'),
                      region_id=grid.down('combo[name=region_id]').getValue(),
                      district_id=grid.down('combo[name=district_id]').getValue(),
                      site_country_id=grid.down('combo[name=site_country_id]').getValue(),
                      site_region_id=grid.down('combo[name=site_region_id]').getValue(),
                      site_district_id=grid.down('combo[name=site_district_id]').getValue(),
                      business_scale_id=grid.down('combo[name=business_scale_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue();

                     
               //acquire original filters
               var filter = {'section_id':survelliance_sectionid,'sub_module_id':survelliance_sub_module};
               var   filters = JSON.stringify(filter);

              //pass to store
                store.getProxy().extraParams = {
                    pageSize:range,
                    region_id: region_id,
                    district_id: district_id,
                    site_country_id: site_country_id,
                    site_region_id:site_region_id,
                    site_district_id:site_district_id,
                    business_scale_id:business_scale_id,
                    issueplace:zone_id,
                    registration_status:registration_status,
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