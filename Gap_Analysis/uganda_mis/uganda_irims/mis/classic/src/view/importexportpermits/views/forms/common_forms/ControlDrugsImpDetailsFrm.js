

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.ControlDrugsImpDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'controldrugsimpdetailsfrm',
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
        allowBlank: false
    },
    items: [{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_importexport_applications'
    },{
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
        }, 
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'sub_modules',
                            module_id:12
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Has Applied Controlled Drugs License ',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'has_apppliedctrdrugs_license',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }, 
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_confirmations'
                        }
                    }
                },
                isLoad: true
            },
            change:'funcChangeHasApppliedctrdrugs'
        }
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        fieldLabel: 'License Number',
        items: [
            {
                xtype: 'textfield',
                name: 'controlled_drugslicense_no',
                readOnly: true,bind: {
                    readOnly: '{isReadOnly}'
                },
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.1,
                tooltip: 'Link Controlled Drugs License',
                name: 'link_controldruglicens',
                handler: 'showControlDrugsLicnDetails'
            },{
                xtype: 'hiddenfield',
                name:'license_application_code'
            }
        ]
    }, {
        xtype: 'combo',
        fieldLabel: ' Permit Type',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'importexport_permittype_id',
        queryMode: 'local',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold'
        }, 
        listeners: {
            beforerender: {
                fn: 'setWorkflowCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_importexport_permittypes'
                        }
                    }
                },
                isLoad: true
            }
        }
    },
    {
        xtype: 'combo',
        fieldLabel: 'Permit Reason',
        name: 'permit_reason_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',bind: {
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
                            table_name: 'par_permit_reasons'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype:'textfield',
        name:'otherpermit_reason',
        fieldLabel:'Other Reasons for Permit Application',
        allowBlank: true
    }, {
        xtype: 'combo',
        fieldLabel: 'Port Of Entry/Exit',
        labelWidth: 80,
        width: 320,
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
                            table_name: 'par_ports_information'
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
        width: 320,
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
        name: 'proforma_invoice_no',
        bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Proform Invoice No',
    }, {
        xtype: 'datefield',
        name: 'proforma_invoice_date',bind: {
            readOnly: '{isReadOnly}'
        },
        format:'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Proform Invoice Date',
    }, {
        xtype: 'combo',
        fieldLabel: 'Proforma Invoice Currency',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',bind: {
            readOnly: '{isReadOnly}'
        },
        forceSelection: true,
        name: 'proforma_currency_id',
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
    },{
        xtype: 'combo',
        fieldLabel: 'Zone',
        labelWidth: 50,
        width: 400,
        name: 'zone_id',
        valueField: 'id',
        displayField: 'name',
        queryMode: 'local',
        forceSelection: true,
        listeners: {
            beforerender: {
                fn: 'setOrgConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'Zone'
                        }
                    }
                },
                isLoad: true
            }
        },
        labelStyle: 'font-weight:bold'
    }]
   
});