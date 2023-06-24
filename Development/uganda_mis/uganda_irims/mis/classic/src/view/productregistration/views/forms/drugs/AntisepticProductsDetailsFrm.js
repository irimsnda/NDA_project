
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.AntisepticProductsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'antisepticproductsdetailsfrm',
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
        allowBlank: false,
       
    }, autoScroll: true,
    items: [
        {
            xtype: 'hiddenfield',
            name: 'product_id'
        }, {
            xtype: 'hiddenfield',
            value: 'tra_product_information',
            name: 'table_name'
        },{
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
                    width: '70%',
                    allowBlank: true,
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
                    handler:'funcAddProductApplicationParamter',
                    section_id: 2,
                    childXtype:'productcommonNamefrm',
                    width: '15%',
                    table_name: 'par_common_names',
                    storeId: 'par_commonnamesstr',
                    bind: {
                        disabled: '{isReadOnly}'  // negated
                    }
                }]

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
            }, bind: {
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Product Form',
            name: 'product_form_id',
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
                                table_name: 'par_product_forms'
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
            fieldLabel: 'Risk category (If applicable) ',
            name: 'productrisk_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: true,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_productrisk_categories'
                            }
                        }
                    },
                    isLoad: true
                }
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'numberfield',
            fieldLabel: 'Product Shelf Life',
            name: 'shelf_life', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        },{
            xtype: 'numberfield',
            fieldLabel: ' Shelf Life After Opening',
            name: 'shelf_lifeafter_opening', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
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
            }, bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        },{
            xtype: 'textarea',
            name: 'physical_description',
            allowBlank: false,
            fieldLabel: 'Physical Description(Description of Finished Product Specification)', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype:'hiddenfield',
            name: 'prodclass_category_id'
        }
    ]
});