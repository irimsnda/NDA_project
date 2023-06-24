Ext.define('Admin.view.configurations.views.panels.EvaluationRecommendationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'evaluationRecommendation',
    title: 'Evaluation Recommendation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },
    items: [
        {
            xtype: 'evaluationRecommendationGrid'
        }
    ]
});
