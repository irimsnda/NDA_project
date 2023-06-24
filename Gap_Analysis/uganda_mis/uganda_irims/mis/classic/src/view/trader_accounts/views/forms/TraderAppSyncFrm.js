Ext.define('Admin.view.trader_accounts.views.forms.TraderAppSyncFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'traderappsyncFrm',
    controller: 'traderaccountsvctr',
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
        value: 'tra_trader_applications_synchronization',
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
    }, {
        xtype: 'hiddenfield',
        fieldLabel: 'trader_id',
        margin: '0 20 20 0',
        name: 'trader_id',
        allowBlank: true
    },{
        xtype: 'combo',
        fieldLabel: 'Module',
        margin: '0 20 20 0',
        name: 'module_id',
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
                            table_name: 'modules'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'combo',
        fieldLabel: 'Status',
        margin: '0 20 20 0',
        name: 'status_id',
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
                            table_name: 'par_trader_applications_synchronization_status'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'Registration No(semicolon separated)',
        emptyText: 'Multiple entries should be separated by semi-colon',
        margin: '0 20 20 0',
        vtype: 'semiColonList',
        name: 'registration_no',
        allowBlank: true
    },{
        xtype: 'textfield',
        fieldLabel: 'Reference No(semicolon separated)',
        emptyText: 'Multiple entries should be separated by semi-colon',
        margin: '0 20 20 0',
        name: 'reference_no',
        vtype: 'semiColonList',
        allowBlank: true
    },{
        xtype: 'datefield',
        fieldLabel: 'year_of_registration',
        margin: '0 20 20 0',
        format: 'Y',
        name: 'year_of_registration',
        allowBlank: false
    },{
        xtype: 'textarea',
        fieldLabel: 'Remarks',
        margin: '0 20 20 0',
        name: 'remarks',
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
                    table_name: 'tra_trader_applications_synchronization',
                    storeID: 'traderappsyncStr',
                    requeststoreID: 'traderapprequestsyncStr',
                    formBind: true,
                    ui: 'soft-purple',
                    action_url: 'configurations/saveConfigCommonData',
                    handler: 'doCreateTraderSyncAppWin'
                }
            ]
        }
    ]
});