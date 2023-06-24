/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.AdhocInvoicingProcessDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'adhocinvoicingprocessdashwrapper',
	itemId:'adhocinvoicingprocessdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'adhocinvoicingprocessdash'
        }
    ]
});