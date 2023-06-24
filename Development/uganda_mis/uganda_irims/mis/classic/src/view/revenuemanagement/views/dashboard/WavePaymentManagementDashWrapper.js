/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.revenuemanagement.views.dashboards.WavePaymentManagementDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'wavepaymentmanagementdashwrapper',
	itemId:'wavepaymentmanagementdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'wavepaymentmanagementdash'
        }
    ]
});