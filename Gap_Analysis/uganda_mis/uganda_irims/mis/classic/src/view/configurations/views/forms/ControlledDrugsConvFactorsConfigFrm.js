/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.configurations.views.forms.ControlledDrugsConvFactorsConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'controlleddrugsconvfactorsconfigfrm',
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
        value: 'par_controlleddrugsconv_factorsconfig',
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
        fieldLabel: 'Controlled Drugs Type',
        margin: '0 20 20 0',
        name: 'controlleddrugs_type_id',
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
                            table_name: 'par_controlleddrugs_types'
                        }
                    }
                },
                isLoad: true
            },
            change:function(cbo,value){
                var frm = cbo.up('form'),
                controlled_drugssubstancesstr = frm.down('combo[name=controlled_drugssubstances_id]').getStore();
                filter = {
                    controlleddrugs_type_id: value
                };
                filter = JSON.stringify(filter);
                controlled_drugssubstancesstr.removeAll();
                controlled_drugssubstancesstr.load({
                    params:{
                        filters:filter
                    }
                })
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Controlled Drugs Substance',
        margin: '0 20 20 0',
        name: 'controlled_drugssubstances_id',
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
                            table_name: 'par_controlled_drugssubstances'
                        }
                    }
                },
                isLoad: false
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Controlled Drugs Base Salt',
        margin: '0 20 20 0',
        name: 'controlleddrugs_basesalt_id',
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
                            table_name: 'par_controlleddrugs_basesalts'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'CAS Number',
        margin: '0 20 20 0',
        name: 'cas_number',
        allowBlank: false
    },{
        xtype: 'numberfield',
        fieldLabel: 'Appr Pure Anhydrous Drug',
        margin: '0 20 20 0',
        name: 'appr_pureanhydrousdrug_contents',
        allowBlank: false
    },
   
    {
        xtype: 'textarea',
        fieldLabel: 'Description',
        margin: '0 20 20 0',
        name: 'description',
        allowBlank: true
    },{
        xtype: 'checkbox',
        inputValue: 1,
        fieldLabel: 'Is Other Config',
        margin: '0 20 20 0',
        name: 'is_other_config',
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
                    table_name: 'par_controlleddrugsconv_factorsconfig',
                    storeID: 'controlleddrugsconvfactorsconfigStr',
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