/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.CosmeticsGmpDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'cosmeticsgmpdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'cosmeticsgmpdash'
        }
    ]
});