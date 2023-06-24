/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.toolbars.PaymentCancellationRequestsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'paymentcancellationrequeststb',
    ui: 'footer',
    defaults: {
        ui: 'soft-green',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            sec_dashboard:'invoicecancellationdash',
            dashwrapper:'#paymentcancellationrequestsdashwrapper',
            name: 'paymentcancellationrequeststb'
        },
        {
            text: 'Payment Cancellation/Reversal Request',
            iconCls: 'x-fa fa-plus-square',
            app_type: 43,
            dashwrapper:'#paymentcancellationrequestsdashwrapper',
            handler: 'onPaymentCancellationRequest'
        },
        '->',
        
    ]
});