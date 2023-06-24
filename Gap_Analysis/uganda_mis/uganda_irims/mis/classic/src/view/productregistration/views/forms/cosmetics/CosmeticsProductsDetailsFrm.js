
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.cosmetics.CosmeticsProductsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'cosmeticsproductdetailsfrm',
    itemId: 'productsDetailsFrm',
    layout: {
        type: 'column'
    },
    viewModel: {
        type: 'productregistrationvm'
    }, autoScroll: true,
    bodyPadding: 5,
    defaults: {
        columnWidth: 0.33,
        margin: 5,
        labelAlign: 'top',
        allowBlank: false,
        
    },
    items: [
        {
            xtype: 'hiddenfield',
            name: 'product_id'
        },{
            xtype: 'hiddenfield',
            name: 'reg_product_id'
        }, {
            xtype: 'hiddenfield',
            value: 'tra_product_information',
            name: 'table_name'
        },{
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

        },  {
            xtype: 'textfield',
            name: 'brand_name',
            fieldLabel: 'Trade/Proprietary Name/'
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
                    isLoad: false
                },  change: function (cmbo, newVal) {
                        var form = cmbo.up('form');
                      /*  if(newVal == 113 || newVal == 383){
                                
                            form.down('textfield[name=specific_gravity]').setVisible(false);
                            form.down('textarea[name=flashpoint_flame_extension]').setVisible(false);
                            form.down('combo[name=has_childresistant_packaging]').setVisible(false);
                            form.down('combo[name=formulation_type_id]').setVisible(false);
                            form.down('combo[name=product_applicationarea_id]').setVisible(false);
                            
                            form.down('combo[name=pesticide_type_id]').setVisible(false);
                            
                            form.down('combo[name=who_hazard_class_id]').setVisible(false);
                            
                            form.down('textfield[name=specific_density]').setVisible(false);
                            
                        }
                        else{
                            form.down('textfield[name=specific_gravity]').setVisible(true);
                            form.down('textarea[name=flashpoint_flame_extension]').setVisible(true);
                            form.down('combo[name=has_childresistant_packaging]').setVisible(true);
                            form.down('combo[name=formulation_type_id]').setVisible(true);
                            form.down('combo[name=product_applicationarea_id]').setVisible(true);
                            
                            form.down('combo[name=pesticide_type_id]').setVisible(true);
                            
                            form.down('combo[name=who_hazard_class_id]').setVisible(true);
                            
                            form.down('textfield[name=specific_density]').setVisible(true);
                            
                        }*/
                }
            }
        }, {
            xtype:'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            items:[{
                xtype: 'combo',
                fieldLabel: 'Common Name',
                name: 'common_name_id',
                forceSelection: true,
                queryMode: 'local',
                valueField: 'id',
                width: '80%',
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
                name: 'btn_addcommonnames',
                childXtype:'productcommonNamefrm',
                width: '15%', margin:'28 0 0',
                table_name: 'par_common_names',
                storeId: 'par_commonnamesstr',
                bind: {
                    disabled: '{isReadOnly}'  // negated
                }
            }]
        },{
            xtype:'textfield',
            name:'product_strength',
            fieldLabel:'Product Strength(Active Ingredients)',
            hidden: true,
            allowBlank: true, bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'tagfield',
            fieldLabel: 'Product Form',
            name: 'product_form_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Select Product Form',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
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
            xtype: 'textarea',
            name: 'physical_description',
            allowBlank: false,
            columnWidth: 0.99,
            fieldLabel: 'Product Physical/Visual Description', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'tagfield',
            fieldLabel: 'Area of application of cosmetic',
            name: 'method_ofuse_id',
            allowBlank: true,
            forceSelection: true,
            filterPickList: true,
            encodeSubmitValue: true,
            emptyText: 'Select Area of application of cosmetic',
            growMax: 100,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_methodof_use'
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
            name: 'contraindication', columnWidth: 0.99,
            allowBlank: true,
            fieldLabel: 'Contraindication/', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textarea',
            name: 'indication', columnWidth: 0.99,
            allowBlank: true,
            hidden: true,
            fieldLabel: 'indication/', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textarea',
            name: 'application_method', columnWidth: 0.99,
            allowBlank: true,
            fieldLabel: 'Application method:/', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'textfield',
            name: 'pack_sizes', 
            columnWidth: 0.99,
            allowBlank: false,
            fieldLabel: 'Pack size(s):', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Recommended/Proposed Storage Condition',
            name: 'storage_condition',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'Proposed storage conditions after first opening',
            name: 'storage_conditionafter_opening',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Distribution category:',
            name: 'distribution_category_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            displayField: 'name', allowBlank: true,
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
            }

        }, {
            xtype: 'textfield',
            name: 'intended_use', 
            columnWidth: 0.99,
            allowBlank: true,
            fieldLabel: 'Intended use:', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },  {
            xtype: 'textarea',
            fieldLabel: "Brief description of the type and properties of packaging material and the seal and its liner if any and provide justification for the suitability of the packaging material and the seal and its liner used.",columnWidth: 0.99, allowBlank: true,
            name: 'description_ofpackagingmaterial'
        },{
            xtype: 'textarea',
            fieldLabel: "Brief description of the method used to determine the shelf life.:.",columnWidth: 0.99, allowBlank: true,
            name: 'descriptionofmethod_ofshelflife'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Product Shelf Life(Months)',
            allowBlank: true,
            name: 'shelf_life'
        }, {
            xtype: 'textfield',
            fieldLabel: 'Proposed shelf life (after reconstitution or dilution) (Months)', allowBlank: true,
            name: 'shelf_lifeafter_reconstitution'
        },{
            xtype: 'textfield',
            fieldLabel: 'Proposed shelf life (after first opening container) (Months) ', allowBlank: true,
            name: 'shelf_lifeafter_opening'
        },{
            xtype: 'textfield',
            fieldLabel: 'Liquid product only specific Gravity', allowBlank: true, allowBlank: true,
            name: 'liquid_gravity'
        },{
            xtype: 'textfield',
            fieldLabel: 'Solid product only Density', allowBlank: true, allowBlank: true,
            name: 'solid_product_density'
        }, {
            xtype: 'combo',
            fieldLabel: 'WHO Hazard class',
            name: 'who_class_id',
            forceSelection: true,
            queryMode: 'local', allowBlank: true,
            valueField: 'id',
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
                                table_name: 'par_who_hazardclass'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        }, {
            xtype: 'combo',
            fieldLabel: 'Is this Product applied',
            name: 'applied_product_id',
            forceSelection: true,hidden: true,
            queryMode: 'local', allowBlank: true,
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
                                table_name: 'par_product_applicationareas'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        },{
            xtype: 'combo',
            fieldLabel: 'Select Formulation',
            name: 'formulation_id',
            forceSelection: true,
            queryMode: 'local', allowBlank: true,
            valueField: 'id',hidden: true,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_formulation_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        },{
            xtype: 'combo',
            fieldLabel: 'Label Signal Word',
            name: 'label_signal_id',
            forceSelection: true,hidden: true,
            queryMode: 'local', allowBlank: true,
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
                                table_name: 'par_label_signals'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        },{
            xtype: 'combo',
            fieldLabel: 'Does this product require child-resistant packaging',
            name: 'require_child_resistant',
            forceSelection: true,hidden: true,
            queryMode: 'local', allowBlank: true,
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
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            }

        },{
            xtype: 'textarea',
            fieldLabel: "Flash flame form extension of product containing more than 70% petroleum distillates ",columnWidth: 0.99,
            allowBlank: true,hidden: true,
            name: 'flash_flame_form'
        },
        {
            xtype: 'combo',
            fieldLabel: 'Intended End User',
            name: 'intended_enduser_id',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank: true,hidden: true,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_intended_enduser'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Liquid Products Only Specific Gravity:',
            allowBlank: true,
            hidden: true,
            name: 'specific_gravity'
        },{
            xtype: 'textfield',
            fieldLabel: '.Solid Products Only Density:',allowBlank: true, hidden: true,
            name: 'specific_density' 
        }, {
            xtype: 'combo',
            fieldLabel: 'Type of Formulation,',
            name: 'formulation_type_id', hidden: true,
            forceSelection: true,allowBlank: true,
            queryMode: 'local',
            valueField: 'id', hidden: true,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_formulation_types'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'textarea',
            fieldLabel: 'Flash point flame extension of products containing more than 70% petroleum distillates:',columnWidth: 0.99,
            allowBlank: true, hidden: true,
            name: 'flashpoint_flame_extension'
        }, {
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
            }

        }, 
    ]
});