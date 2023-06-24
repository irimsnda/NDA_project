/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.BatchApplicationInvoicesDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'batchapplicationinvoicesdashwrapper',
	itemId:'batchapplicationinvoicesdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'batchapplicationinvoicesdash'
        }
    ]
});