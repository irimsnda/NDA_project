/**
 * Created by Kip on 11/22/2018.
 */
Ext.define('Admin.view.configurations.views.forms.ControlledDrugsAnnualCeilingConfigFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'controlleddrugsannualceilingconfigfrm',
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
        value: 'par_controlleddrugsannual_ceilingconfig',
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
                    controlleddrug_type_id: value
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
        fieldLabel: 'Year',
        margin: '0 20 20 0',
        valueField: 'years',
        displayField: 'years',
        store:'year_store',
        name: 'annual_perioddefination',
        allowBlank: false
    },{
        xtype: 'numberfield',
        fieldLabel: 'Annual Estimated Ceiling ',
        margin: '0 20 20 0',
        name: 'annual_extimated_ceiling',
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
                    table_name: 'par_controlleddrugsannual_ceilingconfig',
                    storeID: 'controlleddrugsannualceilingconfigstr',
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