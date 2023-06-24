Ext.define('Admin.view.configurations.views.forms.Product_Class_RulesFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'product_class_rulesFrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    layout: 'form',
    frame: true,
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false
    },
    
    items: [{
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: 'table_name',
        value: 'par_product_classificationrules',
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
    },
    {
        xtype: 'combo',
        fieldLabel: 'Section',
        margin: '0 20 20 0',
        name: 'section_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_sections'
                        }
                    }
                   },
              isLoad: true
            },
            change: function(combo,newValue,oldValue,eopts) {
                var frm=combo.up('form'),
                    str=frm.down('combo[name=classification_id]').getStore()
                    filters=JSON.stringify({'section_id':newValue});
                    str.removeAll();
                    str.load({params:{ filters:filters }});
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Classification',
        margin: '0 20 20 0',
        name: 'classification_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_classifications',
                        }
                    }
                   },
              isLoad: false
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Device Type',
        margin: '0 20 20 0',
        name: 'device_type_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_device_types',
                        }
                    }
                   },
              isLoad: true
            },
            change: function(combo,newValue,oldValue,eopts) {
                  var frm=combo.up('form'),
                      str=frm.down('combo[name=class_rule_id]').getStore()
                      filters=JSON.stringify({"device_type_id":newValue});

                    str.removeAll();
                    str.load({params:{filters:filters}});

                 },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Classification Rule',
        margin: '0 20 0 0',
        name: 'class_rule_id',
        valueField: 'id',
        allowBlank: false,
        displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_classification_rules'
                        }
                    }
                   },
              isLoad: false
            },
            change: 'loadRule'
           
        }
    },{
        xtype: 'htmleditor',
        fieldLabel: 'Rules',
        border: 5,
        style: {
            borderColor: 'black',
            borderStyle: 'dashed'
        },
        margin: '0 20 20 0',
        name: 'ruleField',
        value: '...Rules',
        enableFormat: false,
        enableAlignments: false,
        enableColors: false,
        enableFont: false,
        enableFontSize: false,
        enableFormat: false,
        enableLinks: false,
        enableLists: false,
        enableSourceEdit: false,
        width: 360,
        height: 150,
        readOnly: true,
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
                    table_name: 'par_product_classificationrules',
                    storeID: 'product_class_rulesStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveEditedConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});