Ext.define('Admin.view.configurations.views.panels.ApplicationRecommendationPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationRecommendation',
    title: 'Application Recommendation',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout:{
        type: 'fit'
    },

    items: [
        {
            xtype: 'applicationrecommendationGrid'
        }
    ],

});
