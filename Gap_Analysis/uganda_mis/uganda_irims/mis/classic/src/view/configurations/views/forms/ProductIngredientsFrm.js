/**
 * Created by onesmas on 07/09/2019.
 */
Ext.define('Admin.view.configurations.views.forms.ProductIngredientsFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'productIngredientsFrm',
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
        value: 'par_ingredients_details',
        allowBlank: true
    }, {
        xtype: 'hiddenfield',
        margin: '0 20 20 0',
        name: '_token',
        value: token,
        allowBlank: true
    },{
        xtype: 'hiddenfield',
        fieldLabel: 'id',
        margin: '0 20 20 0',
        name: 'id',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Section Name',
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
                        extraParams: {
                            model_name: 'Sections'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Name',
        margin: '0 20 20 0',
        name: 'name',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'EAC Code',allowBlank: true,
        margin: '0 20 20 0',
        name: 'eacCode',
        valueField: 'eacCode',
        displayField: 'name',
        forceSelection: true,
        allowBlank: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'eac_ingredients'
                        }
                    }
                   },
              isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'ATC Code',
        margin: '0 20 20 0',
        name: 'atc_code_id',
        valueField: 'name',
        tpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '<div class="x-boundlist-item">{name} - {description}</div>',
                '</tpl>'
            ),
            // template for the content inside text field
        displayTpl: Ext.create('Ext.XTemplate',
                '<tpl for=".">',
                    '{name} - {description}',
                '</tpl>'
            ),
        //displayField: 'name',
        forceSelection: true,
        queryMode: 'local',
        allowBlank: true,
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'commonparam/getCommonParamFromTable',
                        extraParams: {
                            table_name: 'par_atc_codes'
                        }
                    }
                   },
              isLoad: true
            }
            
           
        }
    },{
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        fieldLabel: 'Is Enabled',
        margin: '0 20 20 0',
        name: 'is_enabled',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        fieldLabel: 'Is Prohibited',
        margin: '0 20 20 0',
        name: 'is_prohibited',
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
                    table_name: 'par_ingredients_details',
                    storeID: 'productIngredientsStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                },{
                    text: 'Reset',
                    iconCls: 'x-fa fa-close',
                    ui: 'soft-purple',
                    handler: function (btn) {
                        btn.up('form').getForm().reset();
                    }
                }
            ]
        }
    ]
});