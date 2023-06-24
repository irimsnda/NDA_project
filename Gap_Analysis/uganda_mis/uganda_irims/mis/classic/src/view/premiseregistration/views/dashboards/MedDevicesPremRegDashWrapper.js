/**
 * Created by Kip on 11/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.dashboards.MedDevicesPremRegDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'meddevicespremregdashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'meddevicespremregdash'
        }
    ]
});