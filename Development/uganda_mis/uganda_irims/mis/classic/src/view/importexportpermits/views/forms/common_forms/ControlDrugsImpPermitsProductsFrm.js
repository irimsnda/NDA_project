

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.importexportpermits.views.forms.common_forms.ControlDrugsImpPermitsProductsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'controldrugsimppermitsproductsfrm',
    itemId: 'importexportpermitsproductsfrm',
    layout: {
        type: 'column',
        columns: 3
    },
    bodyPadding: 5,

    autoScroll: true,
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
        name: 'product_id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'conversion_unit',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        name: 'table_name',
        value: 'tra_permits_products'
    },{
        xtype: 'combo',
        fieldLabel: 'Controlled Drug Type',
        name: 'controlleddrugs_type_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_controlleddrugs_types',
                            is_enabled:1
                        }
                    }
                },
                isLoad: true
            },
            change:'onChangeControlledDrugType'
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Is a Registered Drug',
        name: 'is_registered_product',
        forceSelection: true,
        queryMode: 'local',
        allowBlank: true,
        hidden: true,
        valueField: 'id',
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_confirmations',
                            is_enabled:1
                        }
                    }
                },
                isLoad: true
            },
            change:'onChangeIsRegisteredDrug'
        }
    },  {
        xtype: 'fieldcontainer',
        layout: 'column', 
        hidden: true,
        defaults: {
            labelAlign: 'top'
        },
        items: [{
                xtype:'textfield',
                readOnly: true,
                columnWidth: 0.9,
                allowBlank: true,
                fieldLabel:'Market Authorisation No.',
                name:'product_registration_no'
            },{
                xtype:'button',
                iconCls:'fa fa-search',
                text:'Search Product',
                name:'search_registeredprod',
                handler:'funcSearchRegisteredProducts'
            }
        ]
    },{
        xtype: 'textfield',
        name: 'permitbrand_name',
        fieldLabel: 'Drug Name',
    }, {
        xtype: 'combo',
        fieldLabel: 'Controlled Drugs Substance',
        name: 'controlled_drugssubstances_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_controlled_drugssubstances',
                            is_enabled:1
                        }
                    }
                },
                isLoad: false
            },
            change:'funcDrugsContentsCalculations'
        }
    }, {
        xtype: 'combo',
        fieldLabel: 'Esther/Salt(Optional)',
        name: 'controlleddrugs_basesalt_id',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_controlleddrugs_basesalts',
                            is_enabled:1
                        }
                    }
                },
                isLoad: true
            },
            change:'funcDrugsContentsCalculations'
        }
    },{
        xtype: 'numberfield',
        name: 'drugs_content',
        readOnly: true,
        fieldLabel: 'Drug Contents(%)',
        listeners: {
            change:'baseStrengthCalculation'
        }
        
    }, {
        xtype: 'combo',
        fieldLabel: 'Dosage Form',
        name: 'dosage_form_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_dosage_forms',
                            is_enabled:1
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        name: 'purpose_of_drugsuse',
        fieldLabel: 'Purpose of Drug Use',
    }, {
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
            xtype: 'numberfield',
            name: 'product_strength',
            
            columnWidth: 0.49,
            fieldLabel: 'Product Strength',
            listeners: {
                change:'funcChangeProductStrength'
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Select Units',
            name: 'gramsbasesiunit_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: true,
            columnWidth: 0.49,
            displayField: 'name',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_gramsbasesiunits_configs',
                                is_enabled:1
                            }
                        }
                    },
                    isLoad: true
                },
                select: 'funcChangeProductStrengthUnits'

            }
        }]
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
            xtype: 'numberfield',
            name: 'pack_unit',
            columnWidth: 0.49,
            fieldLabel: 'Packaging Unit(in ml)',
        },{
            xtype: 'combo',
            fieldLabel: 'Select Packaging Type',
            emptyText: 'Select Packaging Type',
            name: 'drugspackaging_type_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            columnWidth: 0.49,
            allowBlank: true,
            displayField: 'name',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_drugspackaging_types',
                                is_enabled:1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
            
        ]
    },{
        xtype: 'numberfield',
        name: 'strength_asgrams',
        fieldLabel: 'Strength(g)', 
        listeners: {
            change:'baseStrengthCalculation'
        }
    },{
        xtype: 'numberfield',
        name: 'quantity',
        fieldLabel: 'Item Quantity',
        listeners: {
            change:'baseStrengthCalculation'
        }
    },{
        xtype: 'numberfield',readOnly: true,
        name: 'controlleddrug_base',
        fieldLabel: 'Base(g)',
    },{
        xtype: 'combo',
        fieldLabel: 'Country of Origin',
        name: 'country_oforigin_id',
        forceSelection: true,
        queryMode: 'local',
        valueField: 'id',
        displayField: 'name',
        bind: {
            readOnly: '{isReadOnly}'
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getRegistrationApplicationParameters',
                        extraParams: {
                            table_name: 'par_countries',
                            is_enabled:1
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'fieldcontainer',
        layout: 'column',
        defaults: {
            labelAlign: 'top'
        },
        items: [{
            fieldLabel:'Unit Price',
            name:'unit_price',columnWidth: 0.48,
            xtype:'textfield',bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Currency',
            name: 'currency_id',
            forceSelection: true,
            queryMode: 'local',columnWidth: 0.48,
            valueField: 'id',allowBlank: true,
            displayField: 'name',bind: {
                readOnly: '{isReadOnly}'
            },
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getNonrefParameter',
                            extraParams: {
                                table_name: 'par_currencies',
                                is_enabled:1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }]
    }],
    buttons:[{
        text:'Save Permit Product Details',
        iconCls: 'fa fa-save',
        margin: 5,
        store:'controldrugsimppermitsproductsstr',
        action_url: 'importexportpermits/onSaveControlledDrugsPermitProductsDetails',
        action:'btn_savepermitproducts'
    },{
        text:'Close',
        iconCls: 'fa fa-window-close',
        handler:function(btn){
                var win = btn.up('window');
                    win.close();
        }
    }]
});