
Ext.define('Admin.view.trader_accounts.views.forms.NewTraderAccountsManagementFrm', {
    extend: 'Admin.view.trader_accounts.views.forms.AbstractAccountsManagementFrm',
    xtype: 'newtraderaccountsmanagementFrm',
    autoScroll: true,
    controller: 'traderaccountsvctr',
    buttons: [ {
        text: 'Save Trader Information',
        iconCls: 'x-fa fa-save',
        ui: 'soft-purple',
        storeID: 'applicantselectioncmngridstr',
        handler: 'funcWinTraderAccountRegistration'
    }]
});