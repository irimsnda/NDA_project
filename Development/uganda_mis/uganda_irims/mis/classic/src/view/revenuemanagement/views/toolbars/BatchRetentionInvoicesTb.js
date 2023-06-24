/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.toolbars.BatchRetentionInvoicesTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'batchretentioninvoicestb',
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
            sec_dashboard:'batchretentioninvoicesdash',
            dashwrapper:'#batchretentioninvoicesdashwrapper',
            name: 'batchretentioninvoicestb'
        },
        {
            text: 'Payment Invoice Batch Request',
            iconCls: 'x-fa fa-plus-square',
            app_type: 63,
            dashwrapper:'#batchretentioninvoicesdashwrapper',
            handler: 'onInvoiceBatchAppRequest'
        },
        '->',
       
    ]
});