
/**
 * Created by Kip on 10/17/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.panels.InvoiceCancellationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'invoicecancellationpnl',controller: 'revenuemanagementvctr',
    layout: 'fit',
    items: [
        {
            xtype: 'invoicecancellationpnlgrid',
            title: 'Bills/Invoicing'
        }
    ]
});