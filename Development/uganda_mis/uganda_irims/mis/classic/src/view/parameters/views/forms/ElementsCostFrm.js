Ext.define('Admin.view.parameters.views.forms.ElementsCostFrm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.elementscostfrm',
    frame: false,
    bodyPadding: 10,
   controller: 'parametervctr',
    
    require : [
        'Ext.form.field.VTypes'
    ],
    layout: {
        type: 'column'
    },
    defaults: {
        labelAlign: 'top',
        labelStyle: {
            'font-weight': 'bold'
        },
        labelCls: '',
        allowBlank: false,
       columnWidth: 0.5
    },
    fieldDefaults: {
        xtype: 'textfield',
        cls: ''
    },
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_element_costs',
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id'
    }, {
        xtype: 'textfield',
        value: token,
        name: '_token',
        hidden: true
    }, {
        xtype: 'combobox',
        fieldLabel: 'Section',
        forceSelection: true,
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'section_id',
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id',
        listeners:
         {
             afterrender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_sections'
                        }
                    }
                },
                isLoad: true
            },
            change:function(cbo,value){
                   var form = cbo.up('form'),
                       section_id = form.down('combo[name=section_id]').getValue(),
                       feetype_id = form.down('combo[name=feetype_id]').getValue();
                       cost_category = form.down('combo[name=cost_category_id]').store;
   
                       var filter = {section_id:section_id, fee_type_id:feetype_id};
                       filter = JSON.stringify(filter);
                       cost_category.removeAll();
                       cost_category.load({params:{filters: filter}})
   
            }
           
         }
    },{
        xtype: 'combobox',
        fieldLabel: 'Fee Type',
        forceSelection: true,
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'feetype_id',
        queryMode: 'local',
        displayField: 'name',
        valueField: 'id',
        listeners:
         {
             afterrender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_fee_types'
                        }
                    }
                },
                isLoad: true
            },
            change:function(cbo,value){
                   var form = cbo.up('form'),
                       section_id = form.down('combo[name=section_id]').getValue(),
                       feetype_id = form.down('combo[name=feetype_id]').getValue();
                       cost_category = form.down('combo[name=cost_category_id]').store;
   
                       var filter = {section_id:section_id, fee_type_id:feetype_id};
                       filter = JSON.stringify(filter);
                       cost_category.removeAll();
                       cost_category.load({params:{filters: filter}})
   
            }
           
         }
    },{
        xtype: 'combobox',
        fieldLabel: 'Category',
        forceSelection: true,
        allowBlank: false,
        margin: '0 20 20 0',
        queryMode: 'local',
        displayField: 'name',
       valueField: 'id',
       name: 'cost_category_id',
       listeners:{

        afterrender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_cost_categories'
                        }
                    }
                },
                isLoad: true
            },
        change: function(combo, newValue, oldValue, eOpts){
            var form=combo.up('form'),
             filters = { cost_category_id:newValue },
             filters = JSON.stringify(filters),
            subcategorystore=form.down('combo[name=sub_cat_id]').getStore();
            subcategorystore.removeAll();
            subcategorystore.load({params:{filters:filters}});
        }
       }
    },
    {
        xtype: 'combobox',
        fieldLabel: 'Sub Category',
        forceSelection: true,
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'sub_cat_id',
        queryMode: 'local',
        displayField: 'name',
        queryMode: 'local',
        listeners:
         {
             afterrender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_cost_sub_categories'
                        }
                    }
                },
                isLoad: false
            }
           
         },
           valueField: 'id'
    },{
        
        xtype: 'combobox',
        fieldLabel: 'Cost Element',
        forceSelection: true,
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'element_id',
       queryMode: 'local',
        displayField: 'name',
      
        listeners:
         {
             afterrender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_cost_elements'
                        }
                    }
                },
                isLoad: true
            }
           
         },
           valueField: 'id'
     },{
        
        xtype: 'combobox',
        fieldLabel: 'Cost Type',
        forceSelection: true,
        allowBlank: true,
        margin: '0 20 20 0',
        name: 'cost_type_id',
       queryMode: 'local',
        displayField: 'name',
      hidden: true,
        listeners:
         {
             afterrender: {//getConfigParamFromTable
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 10000,
                    proxy: {
                        url: 'configurations/getConfigParamFromTable',
                        extraParams: {
                            table_name: 'par_cost_types'
                        }
                    }
                },
                isLoad: true
            }
           
         },
           valueField: 'id'
     },
    {
        xtype: 'textfield',
        fieldLabel: 'Cost',
        allowBlank: false,
        margin: '0 20 20 0',
        name: 'cost'
    }, {
            xtype: 'combobox',
           forceSelection: true,
            allowBlank: false,
            margin: '0 20 20 0',
            name: 'currency_id',
            fieldLabel: 'Currency',
           queryMode: 'local',
            displayField: 'name',
            listeners:
             {
                 afterrender: {//getConfigParamFromTable
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_currencies'
                            }
                        }
                    },
                    isLoad: true
                },
               
             },
           valueField: 'id'
        },
        {
            xtype:'combobox',
            forceSelection: true,
            allowBlank: false,
            name: 'optional',
            fieldLabel: 'Optional',
            displayField: 'name',
            margin: '0 20 20 0',
            queryMode: 'local',
            listeners:{
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 10000,
                        proxy: {
                            url: 'configurations/getConfigParamFromTable',
                            extraParams: {
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            },
            valueField: 'flag'
        },
        {
            xtype: 'combobox',
            forceSelection: true,
            name: 'formula',
            displayField: 'name',
            allowBlank: false,
            fieldLabel: 'Formula',
            margin: '0 20 0 0',
            valueField: 'flag',
            queryMode: 'local',
            listeners:{
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config:{
                        pageSize: 10000,
                        proxy:{
                            url: 'configurations/getConfigParamFromTable',
                            extraParams:{
                                table_name: 'par_confirmations'
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combobox',
            forceSelection: true,
            name: 'gl_code_id',
            displayField: 'name',
            allowBlank: true,
            fieldLabel: 'GL Code',
            margin: '0 20 0 0',
            valueField: 'id',
            queryMode: 'local',
            listeners:{
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config:{
                        pageSize: 10000,
                        proxy:{
                            url: 'configurations/getConfigParamFromTable',
                            extraParams:{
                                table_name: 'par_gl_accounts',
                                is_enabled: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combobox',
            forceSelection: true,
            name: 'irembo_feescode_id',
            displayField: 'product_name',
            allowBlank: true,
            fieldLabel: 'Irembo Product details',
            margin: '0 20 0 0',
            valueField: 'id',
            queryMode: 'local',
            listeners:{
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config:{
                        proxy:{
                            url: 'configurations/getConfigParamFromTable',
                            extraParams:{
                                table_name: 'irembo_feescode_details',
                                is_enabled: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },
        {
            xtype: 'combobox',
            forceSelection: true,
            name: 'technique_id',
            displayField: 'name',
            allowBlank: true,hidden: true,
            fieldLabel: 'Analysis Technique',
            margin: '0 20 0 0',
            valueField: 'id',
            queryMode: 'local',
            listeners:{
                afterrender: {
                    fn: 'setConfigCombosStore',
                    config:{
                        pageSize: 10000,
                        proxy:{
                            url: 'configurations/getConfigParamFromTable',
                            extraParams:{
                                table_name: 'analysis_techniques',
                                is_enabled: 1
                            }
                        }
                    },
                    isLoad: true
                }
            }
        }
    ],
    action_url: 'parameters/elementscost',
    store: 'elementscoststr',
    buttons: [{
        text: 'Back',
        iconCls: 'x-fa fa-backward',
        width: 150,
        height: 35,
        padding: '5 5 5 5',
        action: 'back',
        grid: 'elementscostgrid',
        form: 'elementscostfrm',
        handler: 'paramBackToGrid',
        ui: 'soft-purple'
    }, '->', {        

        text: 'Save Details',
        iconCls: 'x-fa fa-save',
        action: 'save',
        table_name: 'tra_element_costs',
        storeID: 'elementscoststr',
        formBind: true,width: 150,
        height: 35,
        padding: '5 5 5 5',
        ui: 'soft-purple',
        action_url: 'configurations/saveConfigCommonData',
        handler: 'doCreateConfigParamWin'

    }, {
        text: 'Reset',
        ui: 'soft-purple',
        iconCls: 'x-fa fa-close',
        width: 15,
        height: 35,
        padding: '5 5 5 5',
        handler: function (btn) {
            btn.up('form').getForm().reset();
        }
    }]
});