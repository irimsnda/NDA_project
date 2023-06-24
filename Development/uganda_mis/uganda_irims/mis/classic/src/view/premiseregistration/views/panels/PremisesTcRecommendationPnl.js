/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.productregistration.views.panels.common_panels.PremisesTcRecommendationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'premisestcrecommendationpnl',
    layout:'fit',
    items:[{
        title: 'Peer/TC Review Recommendations',
        xtype: 'premiseTcRecommendationFrm'
    },{
        title: 'Premises Information Final Recommendation Reports',
        xtype: 'productEvaluationUploadsGrid'
    }]
});