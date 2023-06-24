/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.PaymentCancellationRequestsDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'paymentcancellationrequestsdashwrapper',
	itemId:'paymentcancellationrequestsdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'paymentcancellationrequestsdash'
        }
    ]
});