
/**
 * Created by Softclans
 * User robinson odhiambo
 * on 9/24/2018.
 */
Ext.define('Admin.view.productregistration.views.forms.drugs.SearchMedicalDevicesProductsDetailsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'searchmedicaldevicesproductsdetailsfrm',
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
        },
        {
            xtype: 'combo',
            fieldLabel: 'Medical Devices Type',
            name: 'device_type_id',
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
                                table_name: 'par_device_types'
                            }
                        }
                    },
                    isLoad: true
                }, change:'funcChangeDevTypeClass'
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
                    isLoad: true
                },change:'funcChangeDevTypeClass'
            }
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
            }

        },
        {
            xtype: 'combo',
            fieldLabel: 'Common Name',
            name: 'common_name_id',
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
                                table_name: 'par_common_names'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'Intended Use',
            name: 'intended_use',
            allowBlank: true,
            readOnly: true

        },{
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
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'medical_systemmodel_series',
                    fieldLabel: 'System/Model/Series',columnWidth: 0.5,
                    allowBlank: true,
                    disabled: true,
                    readOnly: true

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
                    }
                },
                {
                    xtype: 'textfield',
                    name: 'medical_family',columnWidth: 0.5,
                    fieldLabel: 'Family',
                    allowBlank: true,
                    readOnly: true

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
                }
            ]
        },
        {
            xtype: 'combo',
            name: 'gmdn_code',
            fieldLabel: 'GMDN Code',
            forceSelection: true,
            queryMode: 'local',
            valueField: 'id',
            allowBlank:true,
            displayField: 'name',
            listeners: {
                afterrender: {
                    fn: 'setConfigCombosSectionfilterStore',
                    config: {
                        pageSize: 10000,
                        storeId: 'gmdn_codesstr',
                        proxy: {
                            url: 'configurations/getproductApplicationParameters',
                            extraParams: {
                                table_name: 'par_gmdn_codes'
                            }
                        }
                    },
                    isLoad: false
                },select: function (cmbo, record) {
                    var form = cmbo.up('form'),
                        description = record.get('description');
                    form.down('textfield[name=gmdn_term]').setValue(description);
                }
            }
        }, {
            xtype: 'textfield',
            fieldLabel: 'GMDN Term',
            name: 'gmdn_term'
        },  {
            xtype: 'combo',
            fieldLabel: 'GMDN Category',
            name: 'gmdn_category',
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
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Shelf Life Duration Description',
            name: 'shelflifeduration_desc',
            forceSelection: true,
            hidden:true,
            allowBlank: true,
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
            },

        }, {
            xtype: 'numberfield',
            fieldLabel: 'Shelf Life(Monts)',
            name: 'shelf_life',
        },{
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
            }
        },{
            xtype: 'htmleditor',
            name: 'rule_description',
            readOnly: true,colspan: 1, columnWidth: 0.5,
            fieldLabel:'Classification Rule'

        },
        {
            xtype: 'htmleditor',
            name: 'physical_description',
            colspan: 1,
            allowBlank: false,
            columnWidth: 0.5,
            fieldLabel: 'Commercial Prepresenation',
        },{
            xtype:'hiddenfield',
            name: 'prodclass_category_id'
        }
    ]
});