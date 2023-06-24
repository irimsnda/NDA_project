/**
 * Created by Kip on 9/23/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.FoodPremRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'foodpremregdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'foodpremregdash'
        }
    ]
});