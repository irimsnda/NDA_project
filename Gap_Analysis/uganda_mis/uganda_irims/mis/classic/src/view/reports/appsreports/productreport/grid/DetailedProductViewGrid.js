Ext.define('Admin.view.reports.appsreports.productreport.grid.DetailedProductViewGrid', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '150%',
   xtype: 'detailedproductviewgrid',
   itemId:'spreadsheetgrid',
   layout: 'fit',
   store: 'spreadsheetproductapplicationcolumnsstr',
   title: 'Detailed Products Summary ',
   referenceHolder: true,
   reference:'gridpanel',
   plugins: [{
            ptype: 'filterfield'
        }],
        listeners: {
            beforerender: 'funcReloadspreadSheetStrs'
        },
         viewConfig: {
            emptyText: 'No products information found under this creteria'
        },
    columns: [ {
        text: 'Action',
        xtype: 'widgetcolumn',
        name: 'action',
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
        dataIndex: 'product_id',
        name: 'id',
        text: 'Product ID',
        hidden: true,
         filter: {
                xtype: 'textfield',
            }         
    },
    {
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
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'Classification_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_classifications'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetproductapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'Category',
        name: 'Category',
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
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_product_subcategories'
                                    }
                                }
                            },
                           isLoad: true
                        },
                                   
                     
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetproductapplicationcolumnsstr').reload();
                     }
                 }                
            }
    },
    
    {
        xtype: 'gridcolumn',
        dataIndex: 'SubCategory',
        name: 'SubCategory',
        text: 'SubCategory',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'SubCategory_id',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_subproduct_categories'
                                    }
                                }
                            },
                            isLoad: true
                         },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetproductapplicationcolumnsstr').reload();
                     }
                 }
               }

     },
     {
        xtype: 'gridcolumn',
        dataIndex: 'SpecialCategory',
        name: 'SpecialCategory',
        text: 'SpecialCategory',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'SpecialCategory_id',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_productspecial_categories'
                                    }
                                }
                            },
                             isLoad: true
                         },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetproductapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'ProductType',
        name: 'ProductType',
        text: 'ProductType',
        width: 200, hidden: true,
         filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'ProductType_id',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_product_types'
                                    }
                                }
                            },
                            isLoad: true
                         },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetproductapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'ProductForm',
        name: 'ProductForm',
        text: 'ProductForm',
        width: 150, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    name: 'ProductForm_id',
                    valueField: 'id',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                           fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_dosage_forms'
                                    }
                                }
                            },
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetproductapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'physical_description',
        name: 'physical_description',
        text: 'Physical Description',
        width: 150, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'StorageCondition',
        name: 'StorageCondition',
        text: 'Storage Condition',
        width: 150, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'shelf_life',
        name: 'shelf_life',
        text: 'shelf life(Months)',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'shelf_lifeafter_opening',
        name: 'shelf_lifeafter_opening',
        text: 'Shelf Life After Open',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'shelflifeduration_desc',
        name: 'shelflifeduration_desc',
        text: 'Duration Description',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'instructions_of_use',
        name: 'instructions_of_use',
        text: 'Instruction of use',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'warnings',
        name: 'warnings',
        text: 'warnings',
        width: 150, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'IntendedUsers',
        name: 'IntendedUsers',
        text: 'Intended End Users',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Trader',
        name: 'Trader',
        text: 'Applicant',
        width: 150, hidden: true,
         filter: {
                    xtype: 'textfield'                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPostalA',
        name: 'TraderPostalA',
        text: 'Applicant Postal Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderPhysicalA',
        name: 'TraderPhysicalA',
        text: 'Applicant Physical Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderTell',
        name: 'TraderTell',
        text: 'Applicant Tell',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderMobile',
        name: 'TraderMobile',
        text: 'Applicant Mobile No.',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderEmail',
        name: 'TraderEmail',
        text: 'Applicant Email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderCountry',
        name: 'TraderCountry',
        text: 'Applicant Country',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'TraderRegion',
        name: 'TraderRegion',
        text: 'Applicant Region',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgent',
        name: 'LocalAgent',
        text: 'Local Agent',
        width: 200, hidden: true,
        filter: {
                    xtype: 'textfield'
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentPostalA',
        name: 'LocalAgentPostalA',
        text: 'Local AgentPostalAddress',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentPhysicalA',
        name: 'LocalAgentPhysicalA',
        text: 'Local AgentPhysical Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentTell',
        name: 'LocalAgentTell',
        text: 'Local Agent Tell',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'AgentMobile',
        name: 'AgentMobile',
        text: 'Agent Mobile NO',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentEmail',
        name: 'LocalAgentEmail',
        text: 'Local Agent Email',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'AgentCountry',
        name: 'AgentCountry',
        text: 'Local Agent Country',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'AgentRegion',
        name: 'AgentRegion',
        text: 'Local Agent Region',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },  {
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
                            isLoad: true
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetproductapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'submission_date',
        name: 'submission_date',
         format: 'Y-m-d',
        text: 'Application Date',
        width: 210, hidden: true,
        filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
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
        text: 'Application No',
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
    }
    ,{
        xtype: 'gridcolumn',
        dataIndex: 'Manufacturer',
        name: 'Manufacturer',
        text: 'Manufacturer',
        width: 150, hidden: true,
         filter: {
                    xtype: 'textfield'                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerPostalA',
        name: 'ManufacturerPostalA',
        text: 'Manufacturer Postal Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerPhysicalA',
        name: 'ManufacturerPhysicalA',
        text: 'Manufacturer Physical Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerTell',
        name: 'ManufacturerTell',
        text: 'Manufacturer Tell',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerMobile',
        name: 'ManufacturerMobile',
        text: 'Manufacturer Mobile No.',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerEmail',
        name: 'ManufacturerEmail',
        text: 'Manufacturer Email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerCountry',
        name: 'ManufacturerCountry',
        text: 'Manufacturer Country',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ManufacturerRegion',
        name: 'ManufacturerRegion',
        text: 'Manufacturer Region',
        width:200, hidden: true,
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
    },
  
    {
        xtype: 'gridcolumn',
        dataIndex: 'therapeutic_code',
        name: 'therapeutic_code',
        text: 'Therapeutic  Code',
        width: 150,
        filter: {
            xtype: 'textfield',
        }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'therapeutic_group',
        name: 'therapeutic_group',
        text: 'Therapeutic Group',
        width: 150,
        filter: {
            xtype: 'textfield',
        }
    },
   
   
    {
        xtype: 'gridcolumn',
        dataIndex: 'assessment_procedure',
        name: 'assessment_procedure',
        text: 'Assessment Procedure',
        width: 200,
        filter: {
                    xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'assessment_procedure',
                    listeners:
                     {
                         afterrender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_assessment_procedures'
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
    ],

     listeners:{
       select: 'loadadditionalinfo'
         }
});