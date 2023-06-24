Ext.define('Admin.view.configurations.views.forms.ControlledDrugsPermitFeesConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'controlleddrugspermitfeesconfigfrm',
    controller: 'configurationsvctr',
    viewModel:'configurationsvm',

    autoScroll: true,
    height: Ext.Element.getViewportHeight() - 118,
    layout: 'column',
    itemId: 'controlleddrugspermitfeesconfigfrm',
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
        value: 12,
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
                                filters: JSON.stringify({'module_id':12}),
                            }
                        }
                    },
                    isLoad: true
                }
            }
        },{
            xtype: 'combo',
            fieldLabel: ' Permit Use',
            margin:5,
            name: 'permit_category_id',
            valueField: 'id',
            displayField: 'name',
            forceSelection: true,
            queryMode: 'local',
            allowBlank: true,
            listeners: {
                beforerender: {
                    fn: 'setConfigCombosStore',
                    config: {
                        pageSize: 1000,
                        proxy: {
                            url: 'commonparam/getCommonParamFromTable',
                            extraParams: {
                                table_name: 'par_permit_category'
                            }
                        }
                    },
                    isLoad: true
                }
               
            }
        },{
            xtype: 'combo',
            fieldLabel: 'Import/Export Permit Product Category',
            margin:5, anyMatch: true, selectOnFocus: true,
            name: 'permit_productscategory_id',
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
                                table_name: 'par_permitsproduct_categories'
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
        },,{
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
                    storeID: 'controlleddrugspermitfeesconfigstr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveModuleFeeConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});