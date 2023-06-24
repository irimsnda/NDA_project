/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.dashboards.DrugsSurveillanceDashWrapper', {
    extend: 'Ext.Container',
    xtype: 'drugssurveillancedashwrapper',
    layout: 'fit',
    items: [
        {
            xtype: 'drugssurveillancedash'
        }
    ]
});