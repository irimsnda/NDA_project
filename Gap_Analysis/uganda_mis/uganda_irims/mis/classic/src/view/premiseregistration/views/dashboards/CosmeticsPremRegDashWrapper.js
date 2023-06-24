/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.CosmeticsPremRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'cosmeticspremregdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'cosmeticspremregdash'
        }
    ]
});