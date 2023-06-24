Ext.define('Admin.view.configurations.views.forms.PremiseRegChargesConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'premiseregChargesConfigFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'column',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        columnWidth: 0.33
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'tra_premiseregcharge_config',
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
        fieldLabel: 'Sub Module',
        margin: '0 20 20 0',
        name: 'sub_module_id',
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
                            table_name: 'sub_modules',
                            filters: JSON.stringify({'module_id':2}),
                        }
                    }
                },
                isLoad: true
            }
           
        }
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
            },           
        }
    },{
        xtype: 'numberfield',
        name: 'min_investment_capital',
        fieldLabel: 'Minimum Investment Capital(Amount)'
    },{
        xtype: 'numberfield',
        name: 'max_investment_capital',
        fieldLabel: 'Maximum Investment Capital(Amount)'
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
             change: function(cb, newVal, oldVal, eopts) {
                var frm = cb.up('form'),
                    element_costsStr = frm.down('combo[name = element_costs_id]').getStore(),
                    filters = JSON.stringify({'feetype_id': newVal});

                element_costsStr.removeAll();
                element_costsStr.load({params:{'filters':filters}});
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Element Cost',
        margin: '0 20 20 0',
        name: 'element_costs_id',
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
                            table_name: 'element_costs'
                        }
                    }
                },
                isLoad: false
            },
            select: function(combo, record, eopts) {
                var frm = combo.up('form'),
                    cost = frm.down('displayfield[name = cost]');
                  
                cost.setValue(record.get('cost')+" "+record.get('currency_name'));
            },
           
        }
    },{
        xtype: 'displayfield',
        name: 'cost',
        fieldLabel: 'Cost Amount',
        fieldStyle: {
            'color': 'green',
            'font-weight': 'bold',
            'font-size': '12px'
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
                    table_name: 'tra_premiseregcharge_config',
                    storeID: 'premiseregChargesConfigStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});