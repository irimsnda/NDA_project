/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.toolbars.InvoiceCancellationTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'invoicecancellationtb',
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
            dashwrapper :'#invoicecancellationdashwrapper',
            name: 'invoicecancellationtbBtn'
        },
        {
            text: 'Invoice Cancellation Request',
            iconCls: 'x-fa fa-plus-square',
            app_type: 42,
            dashwrapper :'#invoicecancellationdashwrapper',
            handler: 'onInvoiceCancellationRequest'
        },
        '->',
       
    ]
});