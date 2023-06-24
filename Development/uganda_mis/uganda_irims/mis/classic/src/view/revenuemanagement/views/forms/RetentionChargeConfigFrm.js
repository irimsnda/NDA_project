Ext.define('Admin.view.revenuemanagement.views.forms.RetentionChargeConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'retentionchargeconfigFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'column',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        columnWidth: 0.5
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_retentioncharge_config',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Section',
        margin: '0 20 20 0',
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
            },change: function(cmb, valnew, valOld, eopts) {
                var form = cmb.up('form'),
                    fee_type_id = form.down('combo[name=fee_type_id]').getValue(),
                    section_id = form.down('combo[name=section_id]').getValue(),
                    
                    element_id = form.down('combo[name=element_id]').getValue();
                    element_costStr = form.down('combo[name=element_costs_id]').getStore();
                element_costStr.removeAll();
                element_costStr.load({params:{'fee_type_id': fee_type_id, 'section_id':section_id, 'element_id':element_id}});
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Fee Type',
        margin: '0 20 20 0',
        name: 'fee_type_id',
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
                            table_name: 'par_fee_types'
                        }
                    }
                },
                isLoad: true
            },
            change: function(cmb, valnew, valOld, eopts) {
                var form = cmb.up('form'),
                    fee_type_id = form.down('combo[name=fee_type_id]').getValue(),
                    section_id = form.down('combo[name=section_id]').getValue(),
                    
                    element_id = form.down('combo[name=element_id]').getValue();
                    element_costStr = form.down('combo[name=element_costs_id]').getStore();
                element_costStr.removeAll();
                element_costStr.load({params:{'fee_type_id': fee_type_id, 'section_id':section_id, 'element_id':element_id}});

                var prodclass_categoryStr = form.down('combo[name=prodclass_category_id]').getStore();
                    prodclass_categoryStr.removeAll();
                    prodclass_categoryStr.load({params:{'section_id': section_id}});
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Product Class Category',
        margin: '0 20 20 0',
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
                isLoad: true
            },
            change: function(cmb, valnew, valOld, eopts) {
                var form = cmb.up('form'),
                    classificationStr = form.down('combo[name=classification_id]').getStore();
                    classificationStr.removeAll();
                    classificationStr.load({params:{'prodclass_category_id': valnew}});
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Classification',
        margin: '0 20 20 0',
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
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Product Type',
        margin: '0 20 20 0',
        name: 'product_type_id',
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
                            table_name: 'par_product_types'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Device Type(for Medicines Device Products)',
        margin: '0 20 20 0',
        name: 'device_type_id',
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
                            table_name: 'par_device_types'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Cost Elements',
        margin: '0 20 20 0',
        name: 'element_id',
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
                            table_name: 'cost_elements'
                        }
                    }
                },
                isLoad: true
            },
            change: function(cmb, valnew, valOld, eopts) {
                var form = cmb.up('form'),
                    fee_type_id = form.down('combo[name=fee_type_id]').getValue(),
                    section_id = form.down('combo[name=section_id]').getValue(),
                    element_id = form.down('combo[name=element_id]').getValue();
                    element_costStr = form.down('combo[name=element_costs_id]').getStore();

                    element_costStr.removeAll();
                    element_costStr.load({params:{'fee_type_id': fee_type_id, 'section_id':section_id, 'element_id':element_id}});
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Element Cost',
        margin: '0 20 20 0',
        name: 'element_costs_id',
        valueField: 'element_costs_id',
        displayField: 'cost',
        forceSelection: true,
        queryMode: 'local',
        listConfig : {
           getInnerTpl: function(){ 
               return '{element} {category} {sub_category} - {cost} {currency}'; 
            
            }
        },
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        url: 'commonparam/getelementcost'
                    }
                },
                isLoad: false
            }
           
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        columnWidth: 1,
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
        allowBlank: true
    }],
    dockedItems:[
        {
            xtype: 'toolbar',
            ui: 'footer',
            dock: 'bottom',
            items:[
                '->',{
                    text: 'Save Details',
                    iconCls: 'x-fa fa-save',
                    action: 'save',
                    table_name: 'tra_retentioncharge_config',
                    storeID: 'retentionchargeconfigStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});