
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.SearchdrugsProductsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'searchdrugsProductsDetailsFrm',
    itemId: 'productsDetailsFrm',
    layout: {
        type: 'column'
    },
    viewModel: {
        type: 'productregistrationvm'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: true,
        readOnly: true,
        bind: {
            // readOnly: '{isReadOnly}'  // negated
        }
    },
    items: [{
            xtype: 'hiddenfield',
            name: 'reg_product_id'
        },{
            xtype: 'hiddenfield',
            name: 'tra_product_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'product_id'
        }, {
            xtype: 'hiddenfield',
            value: 'tra_product_information',
            name: 'table_name'
        }, {
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            margin: 5,
            fieldLabel: 'Brand Name',
            readOnly: false,
            items: [{
                xtype: 'textfield',
                name: 'brand_name',
                readOnly: false,
                labelAlign: 'top',
                  allowBlank: false,
                width: '80%'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-link',
                childXtype: 'registeredproductsgrid',
                winTitle: 'Registered Products',
                winWidth: '89%',
                handler: 'searchregisteredProducts'
            }]
        }, {
            xtype: 'combo',
            fieldLabel: 'Product Type',
            name: 'product_type_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_product_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        },{
                xtype:'fieldcontainer',
                layout: {
                    type: 'hbox'
                },
                items:[{
                    xtype: 'combo',
                    fieldLabel: 'Generic Names',
                    name: 'common_name_id',
                    forceSelection: true,
                   
                    queryMode: 'local',
                    valueField: 'id',
                    width: '80%',
                    allowBlank: false,
                    labelAlign: 'top',
                    displayField: 'name'
                    ,
                    listeners: {
                        afterrender: {
                            fn: 'setConfigCombosSectionfilterStore',
                            config: {
                              
                                storeId: 'par_commonnamesstr',
                                proxy: {
                                    url: 'configurations/getproductApplicationParameters',
                                    extraParams: {
                                        table_name: 'par_common_names'
                                    }
                                }
                            },
                            isLoad: true
                        }, change: function (cmbo, newVal) {
                            var form = cmbo.up('form'),
                            atc_codesStore = form.down('combo[name=atc_code_id]').getStore();
                            atc_codesStore.removeAll();
                            atc_codesStore.load({params: {common_name_id: newVal}});
                        }
        
                    }
                },{
                    xtype: 'button',
                    iconCls:'x-fa fa-plus',
                    handler:'funcAddProductApplicationParamter',
                    section_id: 2,
                    childXtype:'productcommonNamefrm',
                    width: '15%', margin:'28 0 0',
                    table_name: 'par_common_names',
                    storeId: 'par_commonnamesstr',
                  
                }]

        },{
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            items:[{
                xtype: 'combo',
                fieldLabel: 'ATC Codes',
                name: 'atc_code_id',
                forceSelection: true,width: '80%',
                queryMode: 'local',
                valueField: 'id', labelAlign: 'top',
                
                allowBlank: false,
                displayField: 'name',
                listeners: {
                    afterrender: {
                        fn: 'setConfigCombosSectionfilterStore',
                        config: {
                            pageSize: 10000,
                            storeId: 'par_atc_codesstr',
                            proxy: {
                                url: 'configurations/getGenericNamesAtcCodes',
                                extraParams: {
                                    table_name: 'par_atc_codes'
                                }
                            }
                        },
                        isLoad: false
                    },select: function (cmbo, record) {
                        var form = cmbo.up('form'),
                            description = record.get('description');
                        form.down('textfield[name=atc_code_description]').setValue(description);
                    }
                }
            },{
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                handler:'funcAddATCProductApplicationParamter',
                section_id: 2,
                margin:'28 0 0',
                childXtype:'commonNameatccodesfrm',
                width: '15%',
                table_name: 'par_common_names',
                storeId: 'par_commonnamesstr',
            }]
        },{
            xtype:'textfield',
            name:'atc_code_description',
            fieldLabel:'ATC Code Description',
            allowBlank: true,
            readOnly: true
        },{
            xtype:'textfield',
            name:'product_strength',
            fieldLabel:'Product Strength',
            
            allowBlank: false,
        }, {
            xtype: 'combo',
            fieldLabel: 'SI-Units',
            name: 'si_unit_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_si_units'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Classification',
            name: 'classification_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_classifications'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Distribution Category',
            name: 'distribution_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: false,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_distribution_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Product category',
            name: 'product_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_product_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Storage Condition',
            name: 'storage_condition_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: false,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_storage_conditions'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Dosage Form',
            name: 'dosage_form_id',
            store: 'dosageformstr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_dosage_forms'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Route of Administration',
            name: 'route_of_administration_id',
            store: 'routeofAdministrationStr',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: false,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_route_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'numberfield',
            fieldLabel: 'Product Shelf Life',
            name: 'shelf_life',
        },{
            xtype: 'combo',
            fieldLabel: 'Shelf Life Duration Description',
            name: 'shelflifeduration_desc',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_timespan_defination'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        },{
            xtype: 'numberfield',
            fieldLabel: ' Shelf Life After Opening',
            name: 'shelf_lifeafter_opening',
        },{
            xtype: 'combo',
            fieldLabel: 'Shelf Life After Opening Description',
            name: 'shelflifeafteropeningduration_desc',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_timespan_defination'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        },{
            xtype: 'textfield',
            name: 'contraindication',
            allowBlank: false,
            fieldLabel: 'Indication',
        },{
            xtype: 'textarea',
            name: 'physical_description',
            allowBlank: false,
            fieldLabel: 'Physical Description',
        },{
            xtype:'hiddenfield',
            name: 'prodclass_category_id'
        }
    ]
});