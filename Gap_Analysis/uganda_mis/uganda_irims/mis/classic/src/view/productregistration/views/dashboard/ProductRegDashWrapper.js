/**
 * Created by Softclans
 * User Robinson Odhiambo
 * on 9/23/2018.
 */
Ext.define('Admin.view.productregistration.views.dashboards.ProductRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'productRegDashWrapper',
	itemId:'productRegDashWrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'productregdash'
        }
    ]
});