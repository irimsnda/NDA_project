/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.toolbars.WavePaymentManagementTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'wavepaymentmanagementtb',
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
            sec_dashboard:'wavepaymentmanagementdash',
            dashwrapper:'#wavepaymentmanagementdashwrapper',
            name: 'paymentcancellationrequeststb'
        },
        {
            text: 'Payment Waiver Request(Credit Note Request)',
            iconCls: 'x-fa fa-plus-square',
            app_type: 44,
            dashwrapper :'#wavepaymentmanagementdashwrapper',
            handler: 'onPaymentWaiverRequestRequest'
        },
        '->'
    ]
});