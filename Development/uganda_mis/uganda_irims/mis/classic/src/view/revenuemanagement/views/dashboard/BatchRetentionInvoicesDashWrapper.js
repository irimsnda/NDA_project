/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.BatchRetentionInvoicesDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'batchretentioninvoicesdashwrapper',
	itemId:'batchretentioninvoicesdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'batchretentioninvoicesdash'
        }
    ]
});