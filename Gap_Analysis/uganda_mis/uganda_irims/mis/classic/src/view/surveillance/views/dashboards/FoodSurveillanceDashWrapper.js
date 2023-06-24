/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.FoodSurveillanceDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'foodsurveillancedashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'foodsurveillancedash'
        }
    ]
});