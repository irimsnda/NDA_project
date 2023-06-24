

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productnotifications.views.forms.AuthorisedProdNotificationDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'authorisedprodnotificationdetailsfrm',
    itemId: 'productsDetailsFrm',
    layout: {
        type: 'column'
    },
    viewModel: {
        type: 'productnotificationsvm'
    },
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: true,
        bind: {
            readOnly: '{isReadOnly}'  // negated
        }
    }, autoScroll: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'product_id'
        }, {
            xtype: 'hiddenfield',
            value: 'tra_product_notifications',
            name: 'table_name'
        }, {
            xtype: 'textfield',
            name: 'brand_name',
            fieldLabel: 'Device Name'
        }, {
            xtype: 'combo',
            fieldLabel: 'Product Type',
            name: 'section_id',
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
                                table_name: 'par_sections'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combo',
            fieldLabel: 'Product Class Category',
            name: 'prodclass_category_id',
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
                                table_name: 'par_prodclass_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        },{
            xtype: 'combo',
            fieldLabel: 'Product Origin',
            name: 'product_origin_id',
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
                                table_name: 'par_product_origins'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        }, {
            xtype: 'textfield',
            name: 'brand_name',
            fieldLabel: 'Brand Name', bind: {
                readOnly: '{isReadOnly}'  // negated
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
                , bind: {
                    readOnly: '{isReadOnly}'  // negated
                },
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
                    }
                }
            },{
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                name: 'btn_addcommonnames',
                childXtype:'productcommonNamefrm',
                width: '15%', margin:'28 0 0',
                table_name: 'par_common_names',
                storeId: 'par_commonnamesstr',
                bind: {
                    disabled: '{isReadOnly}'  // negated
                }
            }]
        }, {
            xtype: 'textfield',
            name: 'therapeutic_group',
            fieldLabel: 'Therapeutic Group ', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            name: 'therapeutic_code',
            fieldLabel: 'Therapeutic Code', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype:'textfield',
            name:'product_strength',
            fieldLabel:'Product Strength',
            
            allowBlank: false, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'combo',
            fieldLabel: 'Classification',
            name: 'classification_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'par_classificationsstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_classifications'
                            }
                        }
                    },
                    isLoad: false
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Medical Devices Type',
            name: 'device_type_id',
            forceSelection: true,
            allowBlank: true, 
            hidden: true,
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
                                table_name: 'par_device_types'
                            }
                        }
                    },
                    isLoad: true
                }, change:'funcChangeDevTypeClass'
            },
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'textfield',
            name: 'gmdn_code',hidden: true,
            allowBlank: true,
            fieldLabel: 'GMDN Code',
            allowBlank:true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'GMDN Term',
            name: 'gmdn_term',hidden: true,
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },  {
            xtype: 'combo',
            fieldLabel: 'GMDN Category',
            name: 'gmdn_category',
            allowBlank: true,hidden: true,
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
                                table_name: 'par_gmdn_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            },
            bind: {
                readOnly: '{isReadOnly}'  // negated
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
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_distribution_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            items:[{
                xtype: 'combo',
                fieldLabel: 'Storage Condition',
                name: 'storage_condition_id',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                labelAlign: 'top',width: '80%',
                allowBlank: false,
                displayField: 'name',
                listeners: {
                    afterrender: {
                        fn: 'setConfigCombosStore',
                        config: {
                            pageSize: 10000,
                            storeId: 'par_storage_conditionsstr',
                            proxy: {
                                url: 'configurations/getRegistrationApplicationParameters',
                                extraParams: {
                                    table_name: 'par_storage_conditions'
                                }
                            }
                        },
                        isLoad: true
                    }
                }, bind: {
                    readOnly: '{isReadOnly}'  // negated
                }
            },{
                xtype: 'button',
                iconCls:'x-fa fa-plus',
                handler:'funcAddProductApplicationParamter',
                 width: '15%', margin:'28 0 0',
                childXtype:'productStorageCondfrm',
                width: '15%', margin:'28 0 0',
                table_name: 'par_storage_conditions',
                storeId: 'par_storage_conditionsstr',
                bind: {
                    disabled: '{isReadOnly}'  // negated
                }
            }]
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
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_dosage_forms'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
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
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_route_of_administration'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Target Species(Vet)',
            name: 'target_species_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: true,
            hidden: true,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_target_species'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'numberfield',
            fieldLabel: 'Product Shelf Life(Months)',
            name: 'shelf_life', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textarea',
            name: 'indication', columnWidth: 0.99,
            allowBlank: false,
            fieldLabel: 'Indication', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textarea',
            name: 'physical_description',
            allowBlank: false,
            columnWidth: 0.99,
            fieldLabel: 'Visual appearance including colour (example, clear, light yellow oily solution)', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype:'combo',
            allowBlank: true,
            fieldLabel:'Do all active substances have the appropriate Maximum Residue Limits (MRLs) set in the species and for the route of administration(s) for which they are indicated? For example, from Codex, EU or other.(Vet) ',
            name:'has_maximum_residue_limits',
            valueField:'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'par_confirmationsStr',
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: false
                },select: function (cmbo, record) {
                    var form = cmbo.up('form'),
                        id = record.get('id');
                        if(id ==1){
                            form.down('combo[name=obtaining_appropriate_mrls]').setVisible(true)

                        }
                        else{
                            form.down('combo[name=obtaining_appropriate_mrls]').setVisible(false)
                        }
                    form.down('textfield[name=atc_code_description]').setValue(description);
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },
        {
            xtype: 'textarea',
            name: 'obtaining_appropriate_mrls',
            allowBlank: true,
            columnWidth: 0.99,
            fieldLabel: ' If no, please tell us what you are doing to obtain the appropriate MRL(s): ', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            name: 'gtin_number',
            fieldLabel: 'Global Trade Item number', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            name: 'glocation_number',
            fieldLabel: 'Global Location Number', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }
    ]
});