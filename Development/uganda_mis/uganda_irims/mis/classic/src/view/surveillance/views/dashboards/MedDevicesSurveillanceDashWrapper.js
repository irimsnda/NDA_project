/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.MedDevicesSurveillanceDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'meddevicessurveillancedashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'meddevicessurveillancedash'
        }
    ]
});