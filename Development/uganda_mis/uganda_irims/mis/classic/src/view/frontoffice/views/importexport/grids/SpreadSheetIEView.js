 Ext.define('Admin.view.frontoffice.importexport.grids.SpreadSheetIEView', {
 extend: 'Ext.grid.Panel',  
   scroll: true,
   width: '100%',
    xtype: 'spreadsheetieview',
   layout: 'fit',
   store: 'spreadsheetieapplicationcolumnsstr',
    title: 'Import/Export Application SpreadSheet',
    referenceHolder: true,
   reference:'iegridpanel',
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
        dataIndex: 'application_code',
        name: 'application_code',
        hidden: true
    },
      {
        xtype: 'gridcolumn',
        dataIndex: 'category',
        name: 'category',
        text: 'Application Category',
        width: 200,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'permit_category_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_permit_category',
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
        dataIndex: 'typecategory',
        name: 'typecategory',
        text: 'Application Type Category',
        width: 210,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'import_typecategory_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_permit_typecategories',
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
        dataIndex: 'permitreason',
        name: 'permitreason',
        text: 'Permit Reason',
        width: 200,
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
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Cpostal_address',
        name: 'Cpostal_address',
        text: 'Consignee Postal Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'Cphysical_address',
        name: 'Cphysical_address',
        text: 'Consignee Physical Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Ctelephone_no',
        name: 'Ctelephone_no',
        text: 'Consignee Telephone No',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'Cmobile_no',
        name: 'Cmobile_no',
        text: 'Consignee Mobile No',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Cemail_address',
        name: 'Cemail_address',
        text: 'Consignee Email Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Ccountry',
        name: 'Ccountry',
        text: 'Consignee Country',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'Cregion',
        name: 'Cregion',
        text: 'ConsigneeRegion',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },
    {
        xtype: 'gridcolumn',
        dataIndex: 'consigneeoption',
        name: 'consigneeoption',
       text: 'Consignee Options',
       width: 200, hidden: true,
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
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'SRpostal_address',
        name: 'SRpostal_address',
        text: 'Sender/Receiver Postal Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'SRphysical_address',
        name: 'SRphysical_address',
        text: 'Sender/Receiver Physical Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'SRtelephone_no',
        name: 'SRtelephone_no',
        text: 'Sender/Receiver Telephone No',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'SRmobile_no',
        name: 'SRmobile_no',
        text: 'Sender/Receiver Mobile No',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'SRemail_address',
        name: 'SRemail_address',
        text: 'Sender/Receiver Email Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'SRcountry',
        name: 'SRcountry',
        text: 'Sender/Receiver Country',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'SRregion',
        name: 'SRregion',
        text: 'Sender/Receiver Region',
        width: 210, hidden: true,
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
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'premisePostalA',
            name: 'premisePostalA',
            text: 'Premises Postal Address',
            width: 210,
            hidden: true,
            filter: {
                xtype: 'textfield',
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'premisePhysicalA',
            name: 'premisePhysicalA',
            text: 'Premises Physical Address',
            width: 210, hidden: true,
            filter: {
                xtype: 'textfield',
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'premiseTell',
            name: 'premiseTell',
            text: 'Premises Telephone',
            width: 200,
            hidden: true,
            filter: {
                xtype: 'textfield',
            }
        }, {
            xtype: 'gridcolumn',
            dataIndex: 'premiseMobile',
            name: 'premiseMobile',
            text: 'Premises Mobile',
            width: 200, hidden: true,
            filter: {
                xtype: 'textfield',
            }
        }, {
            xtype: 'datecolumn',
            dataIndex: 'premiseExpiryDate',
            name: 'premiseExpiryDate',
            text: 'Premises Expiry Date',
            format: 'Y-m-d',
            width: 200, hidden: true,
            filter: {
                xtype: 'datefield',
                format: 'Y-m-d'
            }
        }, {
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
        text: 'Applicant Postal Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    },
     {
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantPhysicalA',
        name: 'ApplicantPhysicalA',
        text: 'Applicant Physical Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantTell',
        name: 'ApplicantTell',
        text: 'Applicant Telephone No',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
                }
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantMobile',
        name: 'ApplicantMobile',
        text: 'Applicant Mobile No',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantEmail',
        name: 'ApplicantEmail',
        text: 'Applicant Email Address',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantCountry',
        name: 'ApplicantCountry',
        text: 'Applicant Country',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'ApplicantRegion',
        name: 'ApplicantRegion',
        text: 'Applicant Region',
        width: 210, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'port',
        name: 'port',
        text: 'Port of Entry/Exit',
        width: 200, hidden: true,
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
        xtype: 'gridcolumn',
        dataIndex: 'issueplace',
        name: 'issueplace',
        text: 'Certificate/Permit Issue Place',
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
                                        table_name: 'par_zones',
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
        xtype: 'gridcolumn',
        dataIndex: 'currency',
        name: 'currency',
        text: 'Payment Currency',
        width: 200, hidden: true,
        filter: {
            xtype: 'combobox',
                    queryMode: 'local',
                    displayField: 'name',
                    valueField: 'id',
                    name: 'currency_id',
                    listeners:
                     {
                         beforerender: {//getConfigParamFromTable
                            fn: 'setConfigCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getConfigParamFromTable',
                                    extraParams: {
                                        table_name: 'par_currencies',
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
        xtype: 'gridcolumn',
        dataIndex: 'proforma_invoice_no',
        name: 'proforma_invoice_no',
        text: 'Proforma Invoice No',
        width: 200, hidden: true,
        filter: {
                xtype: 'textfield',
            }
    },{
        xtype: 'datecolumn',
        dataIndex: 'proforma_invoice_date',
        name: 'proforma_invoice_date',
        text: 'Proforma Invoice Date',
        format: 'Y-m-d',
        width: 200, hidden: true,
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
        text: 'Permit No',
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
        dataIndex: 'receipt_no',
        name: 'receipt_no',
        text: 'Receipt No',
        width: 150,hidden:true,
        // filter: {
        //         xtype: 'textfield',
        //     }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_no',
        name: 'invoice_no',
        text: 'Invoice No',
        width: 150,hidden:true,
        // filter: {
        //         xtype: 'textfield',
        //     }
    },{
        xtype: 'gridcolumn',
        dataIndex: 'invoice_amount',
        name: 'invoice_amount',
        text: 'Invoice Amount',
        width: 150,hidden:true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'amount_paid',
        name: 'amount_paid',
        text: 'Amount Paid',
        width: 150,hidden:true,
    },{
        xtype: 'gridcolumn',
        dataIndex: 'pay_currency',
        name: 'pay_currency',
        text: 'Pay Currency',
        width: 100,hidden:true,
    }
    ],bbar: [{
        xtype: 'pagingtoolbar',
        store: 'spreadsheetieapplicationcolumnsstr',
        width: '100%',
        displayInfo: true,
        displayMsg: 'Showing {0} - {1} out of {2}',
        emptyMsg: 'No Records',
        beforeLoad: function () {
                    var store = this.getStore(),
                     range = this.down('combo[name=Range]').getValue();
                     var grid=this.up('grid'),
                      permit_category_id=grid.down('combo[name=permit_category_id]').getValue(),
                      import_typecategory_id=grid.down('combo[name=import_typecategory_id]').getValue(),
                      permit_reason_id=grid.down('combo[name=permit_reason_id]').getValue(),
                      port_id=grid.down('combo[name=port_id]').getValue(),
                      currency_id=grid.down('combo[name=currency_id]').getValue(),
                      consignee_options_id=grid.down('combo[name=consignee_options_id]').getValue(),
                      registration_status=grid.down('combo[name=registration_status]').getValue(),
                      validity_status=grid.down('combo[name=validity_status]').getValue(),
                      zone_id=grid.down('combo[name=zone_id]').getValue();

                     
               //acquire original filters
               var filter = {'t1.section_id':IE_sectionid,'t1.sub_module_id':IE_sub_module};
               var   filters = JSON.stringify(filter);

              //pass to store
                store.getProxy().extraParams = {
                    pageSize:range,
                    permit_category: permit_category_id,
                    import_typecategory: import_typecategory_id,
                    permit_reason: permit_reason_id,
                    port: port_id,
                    currency: currency_id,
                    consignee_options:consignee_options_id,
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