/**
 * Created by Kip on 10/14/2018.
 */
Ext.define('Admin.view.productregistration.views.sharedinterfaces.panels.common_panels.ProductTcRecommendationPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'producttcrecommendationpnl',
    layout:'fit',
    items:[{
        title: 'Peer Review Recommendations',
        xtype: 'productTcRecommendationFrm'
    },{
        title: 'Product Information Final Recommendation Reports',
        xtype: 'productEvaluationUploadsGrid'
    }]
});