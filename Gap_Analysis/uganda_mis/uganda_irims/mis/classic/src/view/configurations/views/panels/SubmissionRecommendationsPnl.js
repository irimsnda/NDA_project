Ext.define('Admin.view.configurations.views.panels.SubmissionRecommendationsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'submissionrecommendations',
    title: 'Submission Recommendations',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'submissionrecommendationsGrid'
        }
    ],

});
