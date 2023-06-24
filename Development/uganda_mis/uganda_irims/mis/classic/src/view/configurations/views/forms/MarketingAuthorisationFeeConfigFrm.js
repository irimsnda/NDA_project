Ext.define('Admin.view.configurations.views.forms.MarketingAuthorisationFeeConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'marketingauthorisationfeeconfigfrm',
    controller: 'configurationsvctr',
    viewModel:'configurationsvm',

    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 118,
    layout: 'column',
    itemId: 'marketingauthorisationfeeconfigfrm',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        columnWidth: 1,
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin:5,
        name: 'table_name',
        value: 'tra_appmodules_feesconfigurations',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin:5,
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin:5,
        name: 'id',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'module_id',
        margin:5,
        name: 'module_id',
        value: 1,
        allowBlank: true
    },{
        xtype: 'fieldset',
        title: 'Application Details',
        collapsible: true,
        layout: 'column',
        defaults: {
            labelAlign: 'top',
            allowBlank: false,
            columnWidth: 0.5,
        },
        items: [{
            xtype: 'combo',
            fieldLabel: 'Sub Module',
            margin:5,
            name: 'sub_module_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
			allowBlank:true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'sub_modules',
                                filters: JSON.stringify({'module_id':1}),
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Product Types',
            margin:5,
            name: 'section_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_sections'
                            }
                        }
                    },
                    isLoad: true
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        store = form.down('combo[name=prodclass_category_id]').getStore(),
                        prodcategoryStr = form.down('combo[name=product_category_id]').getStore(),

                        
                        filters = JSON.stringify({'section_id': newVal});
                    store.removeAll();
                    store.load({params: {filters: filters}});
                    
                    prodcategoryStr.removeAll();
                    prodcategoryStr.load({params: {filters: filters}});
                    
                    if(newVal == 2){
                        form.getViewModel().set('isOptionalField', false);
                    }
                    else{
                        form.getViewModel().set('isOptionalField', true);
                    }

                    if(newVal == 1){
                        form.down('combo[name=product_category_id]').setVisible(true);
                        form.down('combo[name=is_manufactureredin_eastafrica]').setVisible(true);
                        
                    }
                    else if(newVal == 7){
                        form.down('combo[name=vetmedicines_registrationtype_id]').setVisible(true);
                    }else if(newVal == 4 || newVal == 18){
                        form.down('combo[name=device_type_id]').setVisible(true);
                    }else{
                        form.down('combo[name=product_category_id]').setVisible(false);
                        form.down('combo[name=vetmedicines_registrationtype_id]').setVisible(false); form.down('combo[name=is_manufactureredin_eastafrica]').setVisible(false);
                        

                    }
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Assessment Procedure(Optional)',
            margin:5,
            name: 'assessmentprocedure_type_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_assessmentprocedure_types'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Product Class Category',
            margin:5, allowBlank: true,
            name: 'prodclass_category_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true, 
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_prodclass_categories'
                            }
                        }
                    },
                    isLoad: false
                },
                change: function(combo, newVal, oldVal, eopts){
                    var form = combo.up('form'),
                        store = form.down('combo[name=classification_id]').getStore(),
                        filters = JSON.stringify({'prodclass_category_id': newVal});
                    store.removeAll();
                    store.load({params: {filters: filters}});
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Classification',
            margin:5, allowBlank: true,
            name: 'classification_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_classifications'
                            }
                        }
                    },
                    isLoad: false
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Product Categories(Mandatory for food Products)',
            margin:5, allowBlank: true,
            name: 'product_category_id',
            hidden: true,
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_product_categories'
                            }
                        }
                    },
                    isLoad: false
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Veterinary Medicines Registration Type',
            margin:5, allowBlank: true,
            name: 'vetmedicines_registrationtype_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_vetmedicines_registrationtypes'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Is Manufacturered In East Africa',
            margin:5, allowBlank: true,
            name: 'is_manufactureredin_eastafrica',
            valueField: 'id',
            displayField: 'name',
            hidden: true,
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Device Type(Mandatory for Medical devices)',
            margin:5,
            name: 'device_type_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true, hidden: true,
            allowBlank: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_device_types'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Product Origin',
            margin:5,
            name: 'product_origin_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_product_origins'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Fee Type',
            margin:5,
            name: 'application_feetype_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_applicationfee_types'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Variation Type(Mandatory for Variation)',
            margin:5,
            name: 'variation_type_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            allowBlank: true,
            queryMode: 'local',
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_typeof_variations'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'checkbox',
            inputValue: 1,
            fieldLabel: 'Is Enabled',
            margin:5,
            name: 'is_enabled',
            allowBlank: true
        },{
            xtype: 'combobox',
            fieldLabel: 'Elements Costs ',
            forceSelection: true,
            allowBlank: false,
            margin:5, columnWidth: 1,
            name: 'element_costs_id',
            store:'elementscoststr',
            queryMode: 'local',
            displayField: 'element_desc',
            valueField: 'id',
            editable : true,
            forceSelection : true,
            mode : 'local',
            triggerAction : 'all',
           caseSensitive:false,
             minChars:0,
              anyMatch: true,
           
            listeners:{
                 afterrender: function(cbo){
                        var cbo = cbo.getStore();
                        cbo.removeAll();
                        cbo.load();
                 },
                 select: function(combo, records){
                      var frm = combo.up('form');
                      frmelementcosts = frm.down('form[name=frmelementcosts]');
                      console.log(records);
                      frmelementcosts.loadRecord(records);
                }
             }
        }]
    },{
        xtype: 'frmelementcosts',
        name:'frmelementcosts'
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            layout: 'vbox',
            items:['->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_appmodules_feesconfigurations',
                    storeID: 'marketingauthorisationfeeconfigstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveModuleFeeConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});