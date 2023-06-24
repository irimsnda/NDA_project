

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.PersonalUsePermitsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'personalusepermitsdetailsfrm',
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
        value: 'tra_personaluserpermits_applications'
    },{
        xtype: 'combo',
        fieldLabel: 'Product Types',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'section_id',
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_sections',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            },change:'funcPersonelUserProductSelect'
        }
    } , {
        xtype: 'textfield',
        name: 'applicant_name',
        fieldLabel: 'Applicant Name',
        bind: {
            readOnly: '{isReadOnly}'
        }
    },{
        xtype: 'textarea',
        name: 'applicant_address', columnWidth: 0.99,
        fieldLabel: 'Applicant Physical Address',
        bind: {
            readOnly: '{isReadOnly}'
        }
    },{
        xtype: 'textfield',
        name: 'applicant_contact',
        fieldLabel: 'Applicant Contact Details',
        bind: {
            readOnly: '{isReadOnly}'
        }
    },  {
        xtype: 'textfield',
        name: 'prescribling_hospital',
        allowBlank: true,
        fieldLabel: 'Prescribing Hospital',
        bind: {
            readOnly: '{isReadOnly}'
        }
    },  {
        xtype: 'textfield',
        name: 'hospital_address',
        allowBlank: true,
        fieldLabel: 'Hospital Address',
        bind: {
            readOnly: '{isReadOnly}'
        }
    }, {
        xtype: 'textfield',
        name: 'prescribing_doctor',
        allowBlank: true,
        fieldLabel: 'Prescribing Doctor',
        bind: {
            readOnly: '{isReadOnly}'
        }
    }, {
        xtype: 'textfield',
        name: 'prescription_no',
        allowBlank: true,
        fieldLabel: 'Prescription Number/Reference',
        bind: {
            readOnly: '{isReadOnly}'
        }
    },{
        xtype: 'textfield',
        allowBlank: true,
        name: 'proforma_invoice_no',bind: {
            readOnly: '{isReadOnly}'
        },
        fieldLabel: 'Proform Invoice No',
    }, {
        xtype: 'datefield',
        name: 'proforma_invoice_date',bind: {
            readOnly: '{isReadOnly}'
        },allowBlank: true,
        format:'Y-m-d',
        altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        fieldLabel: 'Proform Invoice Date',
    },{
        xtype:'datefield',allowBlank: true,
        fieldLabel:'Date of Inspection',
        format: 'Y-m-d',
        maxValue: new Date(), altFormats: 'd,m,Y|d.m.Y|Y-m-d|d/m/Y/d-m-Y|d,m,Y 00:00:00|Y-m-d 00:00:00|d.m.Y 00:00:00|d/m/Y 00:00:00',
        name: 'inspected_on'
    } ,{
        xtype: 'fieldcontainer',
        layout: 'column',
        width: 320,
        items:[{
            xtype: 'combo',
            fieldLabel: 'Clearing Agent',
            labelWidth: 80,allowBlank: true,
            columnWidth: 0.9,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            labelAlign:'top',
            name: 'clearing_agent_id',
            queryMode: 'local',
            fieldStyle: {
                'color': 'green',
                'font-weight': 'bold'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 1000,
                        storeId:'clearingagentsStr',
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                           
                            extraParams: {
                                table_name: 'par_clearing_agents',
                                has_filter: 0
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'button',
            text: 'add',
            width: '50px',
            iconCls: 'x-fa fa-plus',
            columnWidth: 0.082,
            form: 'clearingAgentfrm',
            title: 'Add Agent',
            handler: 'showAddFormWin'
        }
        ]
    }, {
        xtype: 'combo',
        fieldLabel: 'Inspection Port Of Entry/Exit',
        labelWidth: 80,
        width: 320,
        valueField: 'id',
        displayField: 'name',
        forceSelection: true,
        name: 'poeport_id',
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
    } ,{
        xtype: 'combo',
        queryMode: 'local',
        forceSelection: true,
        valueField: 'id',
        displayField: 'name',
        allowBlank: true,
        fieldLabel: 'Inspection Recommendation',
        name: 'inspection_recommendation_id',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosSectionfilterStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getNonrefParameter',
                        extraParams: {
                            table_name: 'par_poeinspection_recommendation',
                            has_filter: 0
                        }
                    }
                },
                isLoad: true
            }
        }
    }, 
    {
        xtype: 'textarea',
        fieldLabel: 'Inspection Remarks',
        name: 'remarks',
        columnWidth: 0.99,
        allowBlank: true
    }]
   
});