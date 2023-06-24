/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.toolbars.AdhocInvoicingProcessTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'adhocinvoicingprocesstb',
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
            sec_dashboard:'adhocinvoicingprocessdash',
            dashwrapper :'#adhocinvoicingprocessdashwrapper',
            name: 'invoicecancellationtbBtn',
            handler: 'backHome',
        },
        {
            text: 'Adhoc Invoices Applications',
            iconCls: 'x-fa fa-plus-square',
            menu: { //showNewProductRegistration
                xtype: 'menu',
                items: [
                    {
                        text: 'Inspection At Owners Premises',
                        iconCls: 'x-fa fa-check',
                        
                        dashwrapper :'#adhocinvoicingprocessdashwrapper',
                        handler: 'onAdhocInvoiceApplicationsRequest',
                        app_type: 45
                    },
                    '-',
                    {
                        text: 'Adhoc Invoices',
                        iconCls: 'x-fa fa-check',
                        
                        dashwrapper :'#adhocinvoicingprocessdashwrapper',
                        handler: 'onAdhocInvoiceApplicationsRequest',
                        app_type: 46
                    },
                    '-',
                    {
                        text: 'Analysis of Perishable Goods',
                        iconCls: 'x-fa fa-check',
                        dashwrapper :'#adhocinvoicingprocessdashwrapper',
                        handler: 'onAdhocInvoiceApplicationsRequest',
                        app_type: 47
                    }, '-',
                    {
                                    text: 'Non-Regulated Payments',
                                    iconCls: 'x-fa fa-check',
                        
                                    dashwrapper :'#adhocinvoicingprocessdashwrapper',
                                    handler: 'onAdhocInvoiceApplicationsRequest',
                                     app_type: 48
                   }

                ]
            }

        },
        '->',
        
    ]
});