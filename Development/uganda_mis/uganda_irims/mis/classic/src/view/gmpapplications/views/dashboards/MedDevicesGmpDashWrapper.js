/**
 * Created by Kip on 1/6/2019.
 */
Ext.define('Admin.view.gmpapplications.views.dashboards.MedDevicesGmpDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'meddevicesgmpdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'meddevicesgmpdash'
        }
    ]
});