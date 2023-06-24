Ext.define('Admin.view.configurations.views.forms.OrgBanksAccountFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'orgBanksAccountFrm',
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
        value: 'tra_orgbank_accounts',
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
        fieldLabel: 'Account Name',
        margin: '0 20 20 0',
        name: 'account_name',
        allowBlank: false
    },{
        xtype: 'textfield',
        fieldLabel: 'Account Number',
        margin: '0 20 20 0',
        name: 'account_no',
        allowBlank: false
    },{
        xtype: 'combo',
        fieldLabel: 'Bank',
        margin: '0 20 20 0',
        name: 'bank_id',
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
                            table_name: 'par_banks'
                        }
                    }
                },
                isLoad: true
            },
            change: function(combo, newVal, oldVal, eopts) {
                var form = this.up('form'),
                    store = form.down('combo[name=branch_id]').getStore()
                    filters = JSON.stringify({bank_id: newVal});
                store.removeAll();
                store.load({params:{filters:filters}});  
            },
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Bank Branch',
        margin: '0 20 20 0',
        name: 'branch_id',
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
                            table_name: 'par_bankbranches'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Intermediate Bank',
        margin: '0 20 20 0',
        name: 'intermediate_bank_id',
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
                            table_name: 'par_banks'
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Currency',
        margin: '0 20 20 0',
        name: 'currency_id',
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
                            table_name: 'par_currencies',
                            filters: JSON.stringify({"is_paying_currency":1})
                        }
                    }
                },
                isLoad: true
            }
           
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'SWFT Code',
        margin: '0 20 20 0',
        name: 'swft_code',
        allowBlank: true
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
                    table_name: 'tra_orgbank_accounts',
                    storeID: 'orgBanksAccountStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateConfigParamWin'
                }
            ]
        }
    ]
});