
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.GepgBillInvoicePostingPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'gepgbillinvoicepostingpnl',
    layout: 'fit',
    items: [
        {
            xtype: 'gepgbillinvoicepostinggrid',
            title: 'Bills/Invoicing'
        },{
            xtype: 'gepgbillpaymentspostinggrid',
            title: 'Payments Remittances'
        },
    ]
});