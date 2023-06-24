Ext.define('Admin.view.revenuemanagement.views.panel.AdhocApplicationInvoiceCertificateRelease', {
    extend: 'Ext.panel.Panel',
    xtype: 'adhocapplicationInvoicecertificaterelease',
    controller: 'revenuemanagementvctr',
    layout: 'fit',
    items: [
        {
            xtype: 'adhocinvoicecertificatereleasepnl',
        }
    ]
});