

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.ImportExportDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'importexportdetailsfrm',
    itemId: 'importexportdetailsfrm',
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,
    controller: 'importexportpermitsvctr',
    defaults: {
        margin: 5,
        labelAlign: 'right',
        width: '100%',
        columnWidth: 0.33,
        labelAlign: 'top',
        allowBlank: false,
       
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    }, {
        xtype: 'combo',
        fieldLabel: 'Application Type',
        labelWidth: 80,
        readOnly: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        },
        readOnly: true,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 4
                        }
                    }
                },
                isLoad: true
            }

        }
    },{
        xtype: 'combo',
        fieldLabel: 'Application Category/Reason',
        name: 'permit_category_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_permit_category'
                        }
                    }
                },
                isLoad: true
            },
            change:'funcOnChangePermitCategory'
        },bind: {
            readOnly: '{isReadOnly}'
        },
    }, {
        xtype: 'combo',
        fieldLabel: 'Permit Product Categories',
        name: 'permit_productscategory_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_permitsproduct_categories'
                        }
                    }
                },
                isLoad: false
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },{
        xtype: 'combo',
        fieldLabel: 'Port Of Entry/Exit',
        labelWidth: 80,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'port_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_ports_information',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },{
        xtype: 'combo',
        fieldLabel: 'Mode of Transport',
        labelWidth: 80,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'mode_oftransport_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_modesof_transport'
                        }
                    }
                },
                isLoad: true
            }
        },bind: {
            readOnly: '{isReadOnly}'
        },
    },{
        xtype: 'textfield',
        name: 'proforma_invoice_no',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Invoice No',
    }, {
        xtype: 'datefield',
        name: 'proforma_invoice_date',bind: {
            readOnly: '{isReadOnly}'
        },
        format:'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Invoice Date',
    }, {
        xtype: 'combo',
        fieldLabel: 'Paying Currency',
        labelWidth: 80,
        allowBlank: true,
        valueField: 'id',
        displayField: 'name',bind: {
            readOnly: '{isReadOnly}',
            hidden: 'isVisaApplication'
        },
        forceSelection: true,
        name: 'paying_currency_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getPayingCurrency',
                        extraParams: {
                            table_name: 'par_currencies',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Consignee Options',
        labelWidth: 80,
         allowBlank: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'consignee_options_id',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        hidden: true,
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_consignee_options',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
            change: function(cbo, value){
                    var form = cbo.up('form'),
                    consignee_name = form.down('textfield[name=consignee_name]'),
                    link_consignee = form.down('button[name=link_consignee]');
                    if(value == 1){
                        consignee_name.setVisible(false);
                        link_consignee.setVisible(false)

                    }
                    else{
                        consignee_name.setVisible(true);
                        link_consignee.setVisible(true);
                    }


            }
        }
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        hidden: true,
        fieldLabel: 'Consignee Name',
        items: [
            {
                xtype: 'textfield',
                name: 'consignee_name',
                hidden: true,
                readOnly: true,bind: {
                    readOnly: '{isReadOnly}'
                },allowBlank: true,
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.1,
                tooltip: 'Link Consignee',
                name: 'link_consignee',  
                hidden: true,
                bind: 
                {
                    disabled: '{isReadOnly}'
                },
                handler: 'showConsigneeDetails'
            },{
                xtype: 'hiddenfield',allowBlank: true,
                name:'consignee_id'
            }
        ]
    },{
        xtype: 'combo',
        fieldLabel: 'Has Registered/Licensed Premises Outlet',
        labelWidth: 80,
   
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'has_registered_outlets',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_confirmations',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },
            change: function(cbo, value){
                    var form = cbo.up('form'),
                    eligible_importerscategory_id = form.down('combo[name=eligible_importerscategory_id]');
                    if(value != 1){
                        eligible_importerscategory_id.setVisible(false);
                    }
                    else{
                        eligible_importerscategory_id.setVisible(true);
                    }


            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Select Importer Category(Eligible Importers)',
        labelWidth: 80,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'eligible_importerscategory_id',
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setProductRegCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_eligible_importerscategories',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }]   
});