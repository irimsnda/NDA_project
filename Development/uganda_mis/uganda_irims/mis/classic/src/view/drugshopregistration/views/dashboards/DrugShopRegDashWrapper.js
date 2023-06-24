/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.dashboards.DrugShopRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'drugshopregdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugshopregdash'
        }
    ]
});