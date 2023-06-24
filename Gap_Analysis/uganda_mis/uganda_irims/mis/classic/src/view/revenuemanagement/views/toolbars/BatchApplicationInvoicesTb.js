/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.toolbars.BatchApplicationInvoicesTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'batchapplicationinvoicestb',
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
            sec_dashboard:'batchapplicationinvoicesdash',
            dashwrapper:'#batchapplicationinvoicesdashwrapper',
            name: 'batchapplicationinvoicestb'
        },
        {
            text: 'Payment Invoice Batch Request',
            iconCls: 'x-fa fa-plus-square',
            app_type: 62,
            dashwrapper:'#batchapplicationinvoicesdashwrapper',
            handler: 'onInvoiceBatchAppRequest'
        },
        '->',
       
    ]
});