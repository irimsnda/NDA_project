

Ext.define('Admin.view.trader_accounts.views.forms.TraderAccountsUserFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'traderaccountsuserfrm',
    autoScroll: true,
    controller: 'traderaccountsvctr',
    //layout: 'form',
    bodyPadding: 8,
    defaults: {
        labelAlign: 'top',
        allowBlank: false,
        labelAlign: 'top',
        margin: 5,
        xtype: 'textfield',
        allowBlank: false,
        width: '100%',
        margin: 5
    },
    layout: {
        type: 'vbox'
    },
    layout: 'vbox',
    items: [{
        xtype: 'hiddenfield',
        name: 'id'
    } ,{
        fieldLabel: 'Email Address',
        emptyText: 'Email',
        xtype: 'textfield',
        name: 'email',
        vtype:'email'
    }, {
        fieldLabel: 'Telephone No',
        emptyText: 'Telephone',
        name: 'telephone_no',
        xtype:'textfield'
    },{
        xtype: 'combo',
        fieldLabel: 'Country',
        margin: '0 20 20 0',
        name: 'country_id',
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
                            table_name: 'par_countries'
                        }
                    }
                },
                isLoad: true
            }
        }
    },{
        fieldLabel: 'Account Status',
        name: 'status_id',
        xtype: 'combo',
        valueField: 'id',
        displayField: 'name',
        listeners: {
            beforerender: {
                fn: 'setConfigCombosStore',
                config: {
                    pageSize: 1000,
                    proxy: {
                        extraParams: {
                            model_name: 'AccountStatuses'
                        }
                    }
                },
                isLoad: true
            }
        }
    }, {
        xtype: 'hiddenfield',
        name: 'trader_id'
    },],
    buttons: [{
        text: 'Save Account User',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        storeID:'traderUsersAccountsManagementStr',
        storeID: 'traderUsersAccountsManagementStr',
        handler: 'funcSaveTraderAccountUsers'
    }]
});