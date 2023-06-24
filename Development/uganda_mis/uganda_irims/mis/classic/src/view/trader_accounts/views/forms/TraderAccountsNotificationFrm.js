
Ext.define('Admin.view.trader_accounts.views.forms.TraderAccountsNotificationFrm', {
    extend: 'Ext.form.Panel',
    xtype: 'traderAccountsNotificationFrm',
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
        columnWidth: 0.33,
    },
    layout: {
        type: 'vbox'
    },
    layout: 'column',
    items: [{
        fieldLabel: 'Subject',
        emptyText: 'Enter Nofication Subject',

        name: 'name'
    }, {
        fieldLabel: 'Message',
        emptyText: 'Nofication Message',
        name: 'message'
    }, {
        fieldLabel: 'trader_id',
        xtype: 'hiddenfield',
        name: 'portal_id'
    }],
    buttons: [{
        text: 'Notify Trader',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        handler: 'funcBackToDashboardPnl'
    }]

});