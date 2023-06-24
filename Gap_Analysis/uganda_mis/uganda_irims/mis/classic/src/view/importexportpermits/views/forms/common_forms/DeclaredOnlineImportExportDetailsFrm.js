

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.DeclaredOnlineImportExportDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'declaredonlineimportexportdetailsfrm',
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
    },{
        xtype: 'hiddenfield',
        name: 'section_id'
    }, {
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'wb_importexport_applications'
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        fieldLabel:'Previous Application Permit Number',
        items: [
            {
                xtype:'textfield',
                name:'previous_permit_no',
                allowBlank: true,
                readOnly: true,
                readOnly: true,bind: {
                    readOnly: '{isReadOnly}'
                },
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                text:'Preview',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.1,
                tooltip: 'View Preview Permit Details',
                name: 'view_previewpermitdetails',
                handler: 'funcPreviewPreviousPermitDetails'
            }
        ]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        fieldLabel:'Previous Payment Control Number',
        items: [
            {
                xtype:'textfield',
                name:'prev_paycntrnum',
                allowBlank: true,
                readOnly: true,
                readOnly: true,bind: {
                    readOnly: '{isReadOnly}'
                },
                columnWidth: 0.6
            },
            {
                xtype: 'button',
                text:'Invoice',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.2,
                margin:0.1,
                tooltip: 'View Permits Invoice',
                handler: 'funcPreviewPreviousPermitInvoice'
            },{
                xtype: 'button',
                text:'Receipt',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.2,margin:0.1,
                tooltip: 'View Permits Receipt',
                gridXtype: 'systemgeneratedreportsGrid',
                handler: 'funcPreviewPreviousPermitReceipt'
            }
        ]
    },{
        xtype:'textfield',
        name:'tansadNumber',
        allowBlank: true,
        readOnly: true,
        readOnly: true,
        emptyText:'No Tansad Number',
      
    },{
        xtype: 'combo',
        fieldLabel: 'Sub Module',
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
                        url: 'workflow/getSystemSubModules',
                        extraParams: {
                            model_name: 'SubModule',
                            module_id: 20
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Permit Category',
        name: 'permit_category_id',
        forceSelection: true,hidden:true,
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
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Permit Type',
        name: 'permit_type_id',
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
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_teswspermit_types'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Permit Type Category',
        name: 'import_typecategory_id',
        forceSelection: true,
        queryMode: 'local',hidden:true,
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
        displayField: 'name',
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
        }
    },{
        xtype: 'textfield',
        name: 'proforma_invoice_no',
        fieldLabel: 'Proform Invoice No',
    }, {
        xtype: 'textfield',
        name: 'proforma_invoice_date',
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
        queryMode: 'local',bind: {
            readOnly: '{isReadOnly}'
        },
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
                readOnly: true,bind: {
                    readOnly: '{isReadOnly}'
                },
                columnWidth: 0.9
            },
            {
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                columnWidth: 0.1,
                tooltip: 'Link Consignee',
                name: 'link_consignee',
                bind: 
                {
                    disabled: '{isReadOnly}'
                },
                handler: 'showConsigneeDetails'
            },{
                xtype: 'hiddenfield',
                name:'consignee_id'
            }
        ]
    }]
   
});