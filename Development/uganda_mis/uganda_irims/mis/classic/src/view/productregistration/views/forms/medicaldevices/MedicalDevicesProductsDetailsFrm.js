

/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.medicaldevices.MedicalDevicesProductsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'medicaldevicesProductsDetailsFrm',
    itemId: 'productsDetailsFrm',
    layout: {
        type: 'column'
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
        },{
            xtype: 'hiddenfield',
            name: 'reg_product_id'
        },  {
            xtype: 'hiddenfield',
            value: 'tra_product_information',
            name: 'table_name',

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

        }, {
            xtype: 'textfield',
            name: 'brand_name',
            fieldLabel: 'Proprietary / brand name',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'combo',
            fieldLabel: 'Surgical Instrument Type',
            name: 'device_type_id',
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
            xtype: 'combo',
            fieldLabel: 'Medical Specialty',
            name: 'product_usecategory_id',
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
                                table_name: 'par_product_usecategory'
                            }
                        }
                    },
                    isLoad: true
                }, 
            },
            bind: {
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
                },change:'funcChangeDevTypeClass'
            },
            bind: {
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
            },
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        },
        {
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
        },
        // {
        //     xtype:'textfield',
        //     name:'product_strength',
        //     fieldLabel:'Product Strength',
            
        //     allowBlank: false, bind: {
        //         readOnly: '{isReadOnly}'  // negated
        //     }
        // }, 


        {
            xtype: 'textfield',
            fieldLabel: 'Intended Use',
            name: 'intended_use',
            allowBlank: true,
            readOnly: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }

        },/*{
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Has Medical/System/Model',
                    name: 'has_medical_systemmodel_series',
                    forceSelection: true,
                    queryMode: 'local',
                    valueField: 'id',
                    allowBlank: false,
                    columnWidth: 0.5,
                    displayField: 'name',
                    listeners: {
                        afterrender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_confirmations'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change:function(cbo,value){
                                var form = cbo.up('form'),
                                medical_systemmodel_series = form.down('textfield[name=medical_systemmodel_series]');
                                if(value == 1){
                                    medical_systemmodel_series.setDisabled(false);
                                }
                                else{
                                    medical_systemmodel_series.setDisabled(true);
                                }

                        }
                    },
                    bind: {
                        readOnly: '{isReadOnly}'  // negated
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'medical_systemmodel_series',
                    fieldLabel: 'System/Model/Series',columnWidth: 0.5,
                    allowBlank: true,
                    disabled: true,
                    readOnly: true,
                    bind: {
                        readOnly: '{isReadOnly}'  // negated
                    }

                }
            ]
        },{
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Has Medical Family',
                    name: 'has_medical_family',
                    forceSelection: true,
                    queryMode: 'local',
                    allowBlank: false,
                    valueField: 'id',columnWidth: 0.5,
                    displayField: 'name',
                    listeners: {
                        afterrender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_confirmations'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change:function(cbo,value){
                                var form = cbo.up('form'),
                                medical_family = form.down('textfield[name=medical_family]');
                                if(value == 1){
                                    medical_family.setDisabled(false);
                                }
                                else{
                                    medical_family.setDisabled(true);
                                }

                        }
                    },
                    bind: {
                        readOnly: '{isReadOnly}'  // negated
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'medical_family',columnWidth: 0.5,
                    fieldLabel: 'Family',
                    allowBlank: true,
                    readOnly: true,
                    bind: {
                        readOnly: '{isReadOnly}'  // negated
                    }

                }
            ]
        },{
            xtype: 'fieldcontainer',
            layout: 'column',
            defaults: {
                labelAlign: 'top'
            },
            items: [
                {
                    xtype: 'combo',
                    fieldLabel: 'Has Reagents/Accessories',
                    name: 'has_reagents_accessories',
                    forceSelection: true,
                    queryMode: 'local',columnWidth: 0.5,
                    valueField: 'id',
                    allowBlank: false,
                    displayField: 'name',
                    listeners: {
                        afterrender: {
                            fn: 'setWorkflowCombosStore',
                            config: {
                                pageSize: 10000,
                                proxy: {
                                    url: 'configurations/getNonrefParameter',
                                    extraParams: {
                                        table_name: 'par_confirmations'
                                    }
                                }
                            },
                            isLoad: true
                        },
                        change:function(cbo,value){
                                var form = cbo.up('form'),
                                medical_family = form.down('textfield[name=medical_family]');
                                if(value == 1){
                                    medical_family.setDisabled(false);
                                }
                                else{
                                    medical_family.setDisabled(true);
                                }
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'reagents_accessories',
                    fieldLabel: 'Reagents/Accessories',
                    allowBlank: true,
                    readOnly: true,columnWidth: 0.5,
                    bind: {
                        readOnly: '{isReadOnly}'  // negated
                    }
                }
            ]
        },*/
        {
            xtype: 'textfield',
            name: 'gmdn_code',
            fieldLabel: 'GMDN Code',
            allowBlank:true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'GMDN Term',
            name: 'gmdn_term',
            allowBlank: false,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },  {
            xtype: 'combo',
            fieldLabel: 'GMDN Category',
            name: 'gmdn_category',
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
        }, 
        // {
        //     xtype: 'numberfield',
        //     fieldLabel: 'Shelf Life(Monts)',
        //     name: 'shelf_life',
        //     bind: {
        //         readOnly: '{isReadOnly}'  // negated
        //     }
        // },

         {
            xtype: 'textarea',
            name: 'indication', columnWidth: 0.99,
            allowBlank: false,
            fieldLabel: 'Contraindications, warnings, precautions, potential adverse effects', bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },

        {
            xtype: 'textfield',
            fieldLabel: 'Storage Condition',
            name: 'storage_condition',
            allowBlank: true,
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },/*{
            xtype: 'combo',
            fieldLabel: 'Rules for Classification',
            name: 'reason_for_classification_id',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',colspan: 2,
            valueField: 'class_rule_id',
            displayField: 'class_rule',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getRegistrationApplicationParameters',
                            extraParams: {
                                table_name: 'par_product_classificationrules'
                            }
                        }
                    },
                    isLoad: false
                },
                select:function(cbo, record){
                    var rule_description = record.get('rule_description');
                        form = cbo.up('form');
                        form.down('htmleditor[name=rule_description]').setValue(rule_description);
                        
                }
            },
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        },{
            xtype: 'htmleditor',
            name: 'rule_description',
            readOnly: true,colspan: 1, columnWidth: 0.5,
            fieldLabel:'Classification Rule'

        },*/
        {
            xtype: 'htmleditor',
            name: 'physical_description',
            colspan: 1,
            allowBlank: false,
            columnWidth: 0.5,
            fieldLabel: 'Variations in shape, style or size of the appliance, if applicable',
            bind: {
                readOnly: '{isReadOnly}'  // negated
            }
        }
    ]
});