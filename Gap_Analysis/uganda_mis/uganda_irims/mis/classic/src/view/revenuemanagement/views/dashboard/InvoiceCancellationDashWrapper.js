/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.InvoiceCancellationDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'invoicecancellationdashwrapper',
	itemId:'invoicecancellationdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'invoicecancellationdash'
        }
    ]
});