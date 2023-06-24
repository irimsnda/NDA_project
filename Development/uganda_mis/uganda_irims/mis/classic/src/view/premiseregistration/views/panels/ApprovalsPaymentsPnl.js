/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.ApprovalsPaymentsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'approvalspaymentspnl',

    items: [
        {
            xtype: 'paymentinvoicingcostdetailsgrid'
        },
        {
            xtype: 'applicationpaymentsgrid'
        }
    ]
});