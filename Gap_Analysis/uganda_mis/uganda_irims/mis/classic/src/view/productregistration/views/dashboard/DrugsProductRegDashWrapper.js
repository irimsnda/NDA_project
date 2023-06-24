/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.productregistration.views.dashboards.DrugsProductRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'drugsproductRegDashWrapper',
	itemId:'productRegDashWrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugsproductregdash'
        }
    ]
});