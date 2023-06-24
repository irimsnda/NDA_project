/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.productregistration.views.dashboards.CosmeticsProductRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'cosmeticsproductRegDashWrapper',
	itemId:'productRegDashWrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'cosmeticsproductregdash'
        }
    ]
});