 Ext.define('Admin.view.frontoffice.gmp.grids.GmpSpreadSheetView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
   xtype: 'gmpspreadsheetview',
   layout: 'fit',
   store: 'spreadsheetgmpapplicationcolumnsstr',
   title: 'Gmp Application SpreadSheet',
   referenceHolder: true,
   reference:'gmpgridpanel',
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
        dataIndex: 'manufacturing_site_id',
        name: 'id',
        hidden: true
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
                    name: 'assessment_type_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_gmp_assessment_types'
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
        dataIndex: 'FacilityLocation',
        name: 'FacilityLocation',
        text: 'Facility Location',
        width: 200,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'gmp_type_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                     extraParams: {
                                        table_name: 'par_facility_location'
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
    },
      {
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
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'country',
        name: 'country',
        text: 'Manufacturer country',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'region',
        name: 'region',
        text: 'Manufacturer Region',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'district',
        name: 'district',
       text: 'Manufacturer District',
       width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'email_address',
        name: 'email_address',
        text: 'Manufacturer email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'postal_address',
        name: 'postal_address',
        text: 'Manufacturer Postal Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'physical_address',
        name: 'physical_address',
        text: 'Manufacturer Physical Address',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'telephone_no',
        name: 'telephone_no',
        text: 'Manufacturer Telephone No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'mobile_no',
        name: 'mobile_no',
        text: 'Manufacturer Mobile No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'business_type',
        name: 'business_type',
        text: 'Business Type',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'business_type_id',
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
                            isLoad: true,
                        },
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetgmpapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'DeviceType',
        name: 'DeviceType',
        text: 'Device Type',
        width: 210, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'device_type_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_device_types'
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
        dataIndex: 'gps_coordinate',
        name: 'gps_coordinate',
        text: 'Gps Coordinate',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'premise_reg_no',
        name: 'premise_reg_no',
        text: 'Premise Registration No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Applicant',
        name: 'Applicant',
        text: 'Applicant',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantPostalA',
        name: 'ApplicantPostalA',
        text: 'Applicant Postal Adress',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantPhysicalA',
        name: 'ApplicantPhysicalA',
        text: 'Applicant PhysicalAddress',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantTell',
        name: 'ApplicantTell',
        text: 'Applicant Tell',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantMobile',
        name: 'ApplicantMobile',
        text: 'Applicant Mobile No.',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantEmail',
        name: 'ApplicantEmail',
        text: 'Applicant Email',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantCountry',
        name: 'ApplicantCountry',
        text: 'Applicant Country',
        width:200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantRegion',
        name: 'ApplicantRegion',
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
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentPostalA',
        name: 'LocalAgentPostalA',
        text: 'Local Agent PostalAddress',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentPhysicalA',
        name: 'LocalAgentPhysicalA',
        text: 'Local Agent PhysicalAddress',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'LocalAgentTell',
        name: 'LocalAgentTell',
        text: 'Local Agent Tell',
        width: 200, hidden: true,
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
        width: 200, hidden: true,
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
        dataIndex: 'contact_person',
        name: 'contact_person',
        text: 'Contact Person',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'contact_personPostalA',
        name: 'contact_personPostalA',
        text: 'Contact Person PostalAddress',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'contact_personTell',
        name: 'contact_personTell',
        text: 'Contact Person Tell',
        width: 200, hidden: true,
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
                     change: function() {
                        Ext.data.StoreManager.lookup('spreadsheetgmpapplicationcolumnsstr').reload();
                     }
                 }
                
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'CertIssueDate',
        name: 'CertIssueDate',
         format: 'Y-m-d',
        text: 'Certificate Issue Date',
        width: 210, hidden: true
        
    }, {
        xtype: 'datecolumn',
        dataIndex: 'CertExpiryDate',
        name: 'CertExpiryDate',
         format: 'Y-m-d',
        text: 'Certificate Expiry Date',
        width: 210, hidden: true
        
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
        dataIndex: 'BsnTypeDetails',
        name: 'BsnTypeDetails',
        text: 'Business Type Details',
        width: 200
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'registration_status',
        name: 'registration_status',
        text: 'Registration/Inspection Status',
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
                                   
                     
                     change: function(cmb, newValue, oldValue, eopts) {
                        var grid = cmb.up('grid');
                            grid.getStore().reload();
                     }
                 }                
            }
    },
    {
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
                    name: 'application_status',
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'approval_recommendation',
        name: 'approval_recommendation',
        text: 'Approval Recommendation',
        width: 200,
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
    }
    ],bbar: [{
        xtype: 'pagingtoolbar',
        store: 'spreadsheetgmpapplicationcolumnsstr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function () {
                    var store = this.getStore(),
                     range = this.down('combo[name=Range]').getValue();
                     var grid=this.up('grid'),
                      assessment_type_id=grid.down('combo[name=assessment_type_id]').getValue(),
                      gmp_type_id=grid.down('combo[name=gmp_type_id]').getValue(),
                      device_type_id=grid.down('combo[name=device_type_id]').getValue(),
                      business_type_id=grid.down('combo[name=business_type_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      validity_status=grid.down('combo[name=validity_status]').getValue(),
                      application_status=grid.down('combo[name=application_status]').getValue(),
                      approval_recommendation=grid.down('combo[name=approval_recommendation]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue();

                     
               //acquire original filters
               var filter = {'t1.section_id':gmp_sectionid,'t1.sub_module_id':gmp_sub_module};
               var   filters = JSON.stringify(filter);

              //pass to store
                store.getProxy().extraParams = {
                    pageSize:range,
                    assessment_type: assessment_type_id,
                    gmp_type: gmp_type_id,
                    business_type_id: business_type_id,
                    device_type_id:device_type_id,
                    issueplace:zone_id,
                    registration_status:registration_status,
                    validity_status: validity_status,
                    application_status: application_status,
                    approval_recommendation: approval_recommendation,
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