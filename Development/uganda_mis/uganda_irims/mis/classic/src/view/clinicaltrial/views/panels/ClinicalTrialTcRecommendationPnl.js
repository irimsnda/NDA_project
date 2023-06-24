/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.productregistration.views.panels.ClinicalTrialTcRecommendationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'clinicaltrialtcrecommendationpnl',
    layout:'fit',
    items:[{
        title: 'Peer Review Recommendations',
        xtype: 'tcrecommendationfrm'
    },{
        title: 'Product Information Final Recommendation Reports',
        xtype: 'productEvaluationUploadsGrid'
    }]
});