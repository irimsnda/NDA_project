/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.CosmeticsSurveillanceDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'cosmeticssurveillancedashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'cosmeticssurveillancedash'
        }
    ]
});