 Ext.define('Admin.view.frontoffice.survelliance.grids.SurvellianceSampleProductSpreadSheetView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
    xtype: 'survelliancesampleproductspreadsheetview',
    layout: 'fit',
    //store: 'survelliancespreadsheetStr',
    title: 'Survelliance Application SpreadSheet',
    referenceHolder: true,
   reference:'survelliancesampleproductgridpanel',
   plugins: [{
            ptype: 'filterfield'
        }],
    viewConfig: {
            emptyText: 'No products information found under this creteria'
        },
    // listeners: {
    //     beforerender: {
    //         fn: 'setConfigGridsStore',
    //         config: {
    //             pageSize: 1000,
    //             storeId: 'survelliancesampleproductspreadsheetStr',
    //             proxy: {
    //                 url: 'openoffice/getSurvellianceSampleSpreadsheetApplications',
    //             }
    //         },
    //         isLoad: true
    //     }
    // },
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
            dataIndex: 'sample_refno',
            name: 'sample_refno',
            text: 'Sample Reference No',
            width: 200
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sample_name',
            name: 'sample_name',
            text: 'Sample Name',
            width: 100,
            tdCls: 'wrap-text',
            filter: {
             xtype: 'textfield' 
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sample_code',
            name: 'sample_code',
            text: 'Sample Code',
            width: 100,
            filter: {
             xtype: 'textfield' 
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'dosage_form',
            name: 'dosage_form',
            text: 'Dosage Form',
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'product_form',
            name: 'product_form',
            text: 'Product Form',
            width: 100
        },{
            xtype: 'gridcolumn',
            dataIndex: 'device_type',
            name: 'device_type',
            text: 'Device Type',
            width: 100
        },{
            xtype: 'gridcolumn',
            dataIndex: 'common_name',
            name: 'common_name',
            text: 'Common Name',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'date_collected',
            name: 'date_collected',
            text: 'Collection Date',
            hidden: true,
            width: 100,
            filter: {
             xtype: 'datefield' 
            }
        }, {
            xtype: 'gridcolumn',
            name: 'Classification',
            dataIndex: 'classification',
            text: 'Classification',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'packaging_size',
            name: 'packaging_size',
            text: 'Packaging Size',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'packaging_unit',
            name: 'packaging_unit',
            text: 'Packaging Units',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'collected_samples',
            name: 'collected_samples',
            text: 'Number of Collected Samples',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'batch_no',
            name: 'batch_no',
            text: 'Batch No',
            hidden: true,
            width: 100,
            filter: {
             xtype: 'textfield' 
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'manufacturer',
            name: 'manufacturer',
            text: 'Manufacturer',
            width: 100,
            hidden: true,
            filter: {
             xtype: 'textfield' 
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'manufacturing_date',
            name: 'manufacturing_date',
            text: 'Manufacturing Date',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'expiry_date',
            name: 'expiry_date',
            text: 'Expiry Date',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'storage',
            name: 'storage',
            text: 'Product Storage',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'collectionsite_storage_condition',
            name: 'collectionsite_storage_condition',
            text: 'Collection Site Storage Condition',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'seal_condition',
             name: 'seal_condition',
            text: 'Seal Pack Condition',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'shelf_life',
            name: 'shelf_life',
            text: 'Shelf Life',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'shelf_lifeafter_opening',
            name: 'shelf_lifeafter_opening',
            text: 'Shelf life after opening',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sampling_reason',
            name: 'sampling_reason',
            text: 'Reason for Sampling',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'collector',
            name: 'collector',
            text: 'Sample Collector',
            hidden: true,
            width: 100
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'sample_type',
            name: 'sample_type',
            text: 'Sample Application Type',
            hidden: true,
            width: 100
        },
        
    {
        xtype: 'gridcolumn',
        dataIndex: 'program_name',
        name: 'program_name',
        text: 'Program Name',
        hidden: true,
        width: 200,
        filter: {
             xtype: 'textfield' 
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'program_start_date',
        name: 'program_start_date',
        text: 'Program Start Date',
        hidden: true,
        width: 200,
        filter: {
             xtype: 'datefield' 
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'program_end_date',
        name: 'program_end_date',
        text: 'Program End Date',
        hidden: true,
        width: 200,
        filter: {
             xtype: 'datefield' 
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'program_description',
        name: 'program_description',
        text: 'Program Description',
        width: 200,
        hidden: true,
        filter: {
             xtype: 'textfield' 
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'product_name',
        name: 'product_name',
        text: 'PMS Product',
        width: 200,
        hidden: true,
        filter: {
             xtype: 'textfield' 
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'pms_region_name',
        name: 'pms_region_name',
        text: 'PMS Region',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'pms_region_name',
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
                            var grid = cmb.up('grid');
                            grid.getStore().reload();
                     }
                 }
                
            }
    }
    ,{
        xtype: 'gridcolumn',
        dataIndex: 'pms_district',
        name: 'pms_district',
        text: 'PMS District',
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
    }
    ,{
        xtype: 'gridcolumn',
        dataIndex: 'site_name',
        name: 'site_name',
        text: 'Site Name',
        hidden: true,
        width: 200,
        filter: {
            xtype: 'textfield', 
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'sampling_site_category',
        name: 'sampling_site_category',
        text: 'Sampling Site Category',hidden: true,
        width: 200,
        filter: {
            xtype: 'textfield', 
            }
    },
      {
        xtype: 'gridcolumn',
        dataIndex: 'site_email',
        name: 'site_email',
        text: 'Site Email',
        width: 200,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'site_country',
        name: 'site_country',
        text: 'Site Country',
        width: 200, 
        hidden: true,
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
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'implementation_identity',
        name: 'implementation_identity',
        text: 'Implementation Identity',hidden: true,
        width: 200,
        filter: {
             xtype: 'textfield' 
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'implementation_year',
        name: 'implementation_year',
        text: 'Implementation Year',hidden: true,
        width: 200,
        filter: {
             xtype: 'textfield',
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
    }
    ,{
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
        xtype: 'gridcolumn',
        dataIndex: 'site_level',
        name: 'site_level',
        text: 'Site Level',
        width: 150,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'pir_recommendation',
        name: 'pir_recommendation',
        text: 'PIR Recommendation',
        width: 150,
        hidden: true,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'pir_recommendation_id',
            listeners:
             {
                 beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_pmsevaluation_decisions'
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
        dataIndex: 'pir_date',
        name: 'pir_date',
        text: 'PIR Date',
        format: 'Y-m-d',
        width: 150,
        hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'pir_comment',
        name: 'pir_comment',
        text: 'PIR Comment',
        width: 150,
        hidden: true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'analysis_type',
        name: 'analysis_type',
        text: 'Analysis Type',
        width: 250,
        hidden: true,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'analysis_type_id',
            listeners:
             {
                 beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_survsample_analysis_types'
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
        dataIndex: 'limsreference_no',
        name: 'limsreference_no',
        text: 'LIMS Reference',
        width: 150,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'requested_on',
        name: 'requested_on',
        text: 'Analysis Request Date',
        width: 250,
        hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'request_by',
        name: 'request_by',
        text: 'Analysis Requested By',
        width: 250,
        hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'sample_analysis_status',
        name: 'sample_analysis_status',
        text: 'Analysis Status',
        width: 250,
        hidden: true,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'sample_analysis_status_id',
            listeners:
             {
                 beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_sampleanalysis_status'
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
        dataIndex: 'screening_recommendation',
        name: 'screening_recommendation',
        text: 'Screening Recommendation',
        width: 250,
        hidden: true,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'screening_recommendation_id',
            listeners:
             {
                 beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_pmsscreening_decisions'
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
        dataIndex: 'conformatory_recommendation',
        name: 'conformatory_recommendation',
        text: 'Conformatory Recommendation',
        width: 250,
        hidden: true,
        filter: {
            xtype: 'combobox',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            name: 'conformatory_recommendation_id',
            listeners:
             {
                 beforerender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 100,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_pmsanalysis_decisions'
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
    }
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
                      pms_region_name=grid.down('combo[name=pms_region_name]').getValue(),
                      district_id=grid.down('combo[name=district_id]').getValue(),
                      site_country_id=grid.down('combo[name=site_country_id]').getValue(),
                      site_region_id=grid.down('combo[name=site_region_id]').getValue(),
                      pir_recommendation_id=grid.down('combo[name=pir_recommendation_id]').getValue(),
                      screening_recommendation_id=grid.down('combo[name=screening_recommendation_id]').getValue(),
                      conformatory_recommendation_id=grid.down('combo[name=conformatory_recommendation_id]').getValue(),
                      analysis_type_id=grid.down('combo[name=analysis_type_id]').getValue(),
                      sample_analysis_status_id=grid.down('combo[name=sample_analysis_status_id]').getValue(),
                      site_district_id=grid.down('combo[name=site_district_id]').getValue();
                     
               //acquire original filters
               var filter = {'section_id':survelliance_sectionid,'sub_module_id':survelliance_sub_module};
               var   filters = JSON.stringify(filter);

              //pass to store
                store.getProxy().extraParams = {
                    pageSize:range,
                    pms_region_name: pms_region_name,
                    district_id: district_id,
                    site_country_id: site_country_id,
                    site_region_id:site_region_id,
                    pir_recommendation_id:pir_recommendation_id,
                    screening_recommendation_id: screening_recommendation_id,
                    conformatory_recommendation_id: conformatory_recommendation_id,
                    site_district_id:site_district_id,
                    analysis_type_id: analysis_type_id,
                    sample_analysis_status_id: sample_analysis_status_id,
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
       select: 'loadadditionalSampleApplicationinfo'
         }
});