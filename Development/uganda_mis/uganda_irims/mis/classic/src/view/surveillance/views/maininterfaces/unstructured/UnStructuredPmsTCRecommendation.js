/**
 * Created by Kip on 6/24/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.unstructured.UnStructuredPmsTCRecommendation', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsTCRecommendation',
    xtype: 'unstructuredpmstcrecommendation',

    items: [
        {
            xtype: 'unstructuredpmstcrecommendationpnl'
        }
    ]
});