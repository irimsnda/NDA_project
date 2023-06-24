

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.EditImportExportDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'editimportexportdetailsfrm',
    itemId: 'permitsdetailsfrm',
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
        allowBlank: true,
        readOnly: true
       
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
        width: 320,
        readOnly: true,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'sub_module_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }, bind: {
            readOnly: '{isReadOnly}'
        },
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
        fieldLabel: 'Application Category',
        name: 'permit_category_id',
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
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_permit_category'
                        }
                    }
                },
                isLoad: true
            }
        },
        readOnly: true
    }, {
        xtype: 'combo',
        fieldLabel: 'Permit Type Category(on Special Case)',
        name: 'import_typecategory_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        readOnly: true,
        
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_permit_typecategories'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Permit Reason',
        name: 'permit_reason_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        readOnly: true,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getproductApplicationParameters',
                        extraParams: {
                            table_name: 'par_permit_reasons'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Port Of Entry/Exit',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        readOnly: false,
        displayField: 'name',
        forceSelection: true,
        name: 'port_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
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
        },
    },{
        xtype: 'textfield',
        name: 'proforma_invoice_no',
        readOnly: false,
        fieldLabel: 'Proform Invoice No',
    }, {
        xtype: 'datefield',
        name: 'proforma_invoice_date',
        format:'Y-m-d',
        readOnly: false,
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Proform Invoice Date',
    }, {
        xtype: 'combo',
        fieldLabel: 'Paying Currency',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
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
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'consignee_options_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
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
            }
        }
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        fieldLabel: 'Consignee Name',
        items: [
            {
                xtype: 'textfield',
                name: 'consignee_name',
                readOnly: true,
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.1,
                tooltip: 'Link Consignee',
                name: 'link_consignee',
                handler: 'showConsigneeDetails'
            },{
                xtype: 'hiddenfield',
                name:'consignee_id'
            }
        ]
    }]
   
});