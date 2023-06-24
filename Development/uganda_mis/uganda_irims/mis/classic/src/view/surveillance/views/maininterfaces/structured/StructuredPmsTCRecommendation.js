/**
 * Created by Kip on 5/30/2019.
 */
Ext.define('Admin.view.surveillance.views.maininterfaces.structured.StructuredPmsTCRecommendation', {
    extend: 'Admin.view.surveillance.views.sharedinterfaces.main.PmsTCRecommendation',
    xtype: 'structuredpmstcrecommendation',

    items: [
        {
            xtype: 'structuredpmstcrecommendationpnl'
        }
    ]
});