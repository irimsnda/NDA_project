

Ext.define('Admin.view.trader_accounts.views.forms.TraderAccountApprovalFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'traderAccountApprovalFrm',
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
        fieldLabel: 'Account Status',
        name: 'status_id',
        xtype: 'combo',
        valueField: 'id',
        queryMode: 'local',
        displayField: 'name',
        readOnly: true,
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
        fieldLabel: 'Remarks',
        emptyText: 'Remarks',
        xtype:'textarea',
        name: 'remarks'
    },{
        xtype: 'hiddenfield',
        name: 'identification_no'
    }],
    buttons: [{
        text: 'Update Account Status',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        storeID: 'traderAccountsManagementStr',
        handler: 'funcUpdateAccountStatus'
    }]
});