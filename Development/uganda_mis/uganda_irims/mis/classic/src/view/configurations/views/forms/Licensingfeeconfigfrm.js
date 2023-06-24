Ext.define('Admin.view.configurations.views.forms.Licensingfeeconfigfrm', {
    extend: 'Ext.form.Panel',
    xtype: 'licensingfeeconfigfrm',
    controller: 'configurationsvctr',
    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 118,
    layout: 'column',
    itemId: 'licensingfeeconfigfrm',
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
        fieldLabel: 'module',
        margin:5,
        value: 2,
        name: 'module_id',
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
        items: [,{
            xtype: 'combo',
            fieldLabel: 'Sub Module',
            margin:5,
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
                                filters: JSON.stringify({'module_id':2})
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Sections',
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
                        store = form.down('combo[name=business_type_id]').getStore(),
                                         
                        filters = JSON.stringify({'section_id': newVal});
                        store.removeAll();
                        store.load({params: {filters: filters}});
                        
                    
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Business Type',
            margin:5,
            name: 'business_type_id',
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
                                table_name: 'par_business_types'
                            }
                        }
                    },
                    isLoad: false
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
                    storeID: 'licensingfeeconfigstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveModuleFeeConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});