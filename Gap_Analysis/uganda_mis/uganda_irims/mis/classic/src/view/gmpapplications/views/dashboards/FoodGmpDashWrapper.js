/**
 * Created by Kip on 12/17/2018.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.FoodGmpDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'foodgmpdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'foodgmpdash'
        }
    ]
});