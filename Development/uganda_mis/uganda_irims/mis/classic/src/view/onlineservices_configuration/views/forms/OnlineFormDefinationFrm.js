Ext.define('Admin.view.administration.views.forms.OnlineFormDefinationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'onlineFormDefinationFrm',
    controller: 'onlineservicesconfVctr',
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
        value: 'wb_app_formsdefination',
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
        xtype: 'textfield',
        fieldLabel: 'Form Name',
        margin: '0 20 20 0',
        name: 'form_name',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Module',
        margin: '0 20 20 0',
        name: 'module_id',
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
                        url: 'onlineservices/getOnlineFormsParams',
                        extraParams: {
                            table_name: 'modules'
                        }
                    }
                   },
              isLoad: true
            },
            change: function(combo, newVal, oldval, eopts){
                var form = combo.up('form'),
                    sub_moduleStr = form.down('combo[name=sub_module_id]').getStore(),
                    prodclass_category_id = form.down('combo[name=prodclass_category_id]'),
                    filters = JSON.stringify({'module_id': newVal});
                    sub_moduleStr.removeAll();
                    sub_moduleStr.load({params: {filters: filters}});
                if(newVal != ''){
                    prodclass_category_id.setVisible(true);
                    prodclass_category_id.validate();
                    //------//
                    prodclass_category_id.allowBlank = false;
                    }
               
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Sub Module',
        margin: '0 20 20 0',
        name: 'sub_module_id',
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
                        url: 'onlineservices/getOnlineFormsParams',
                        extraParams: {
                            table_name: 'sub_modules'
                        }
                    }
                   },
              isLoad: false
            }
           
        }
    },{
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
                        url: 'onlineservices/getOnlineFormsParams',
                        extraParams: {
                            table_name: 'par_sections'
                        }
                    }
                   },
              isLoad: true
            },
            change: function(combo, newVal, oldval, eopts){
                var form = combo.up('form'),
                    prodclassStr = form.down('combo[name=prodclass_category_id]').getStore(),
                    filters = JSON.stringify({'section_id': newVal});
                    prodclassStr.removeAll();
                    prodclassStr.load({params: {filters: filters}});
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Product Class Category',
        margin: '0 20 20 0',
        name: 'prodclass_category_id',
        valueField: 'id',
        allowBlank: true,
        displayField: 'prodclass_category_name',
        hidden: true,
        forceSelection: true,
        queryMode: 'local',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    proxy: {
                        url: 'onlineservices/getOnlineFormsParams',
                        extraParams: {
                            table_name: 'wb_app_formsdefination'
                        }
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
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        uncheckedValue: 0,
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
                    table_name: 'wb_app_formsdefination',
                    storeID: 'formCategoryStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});