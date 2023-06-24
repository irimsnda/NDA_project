/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.DrugsGmpDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'drugsgmpdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugsgmpdash'
        }
    ]
});